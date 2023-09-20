const { OK, SUCCESS, USER_ERROR, FAILED } = require('../helpers/constants');
const { responseFormatter } = require('../helpers/helperFunctions');
const { tryCatch } = require('../utilities/tryCatch');
const Order = require('../models/Order');
const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
});

exports.getConfigController = tryCatch(async (req, res, next) => {
	const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
	const secretKey = process.env.STRIPE_SECRET_KEY;
	const response = responseFormatter(OK, SUCCESS, {
		publishableKey,
		secretKey,
	});
	res.json(response);
});

exports.postPaymentIntent = tryCatch(async (req, res, next) => {
	const { currency, amount, userId, cart, email, customer } = req.body;
	const cartString = cart.join();
	const paymentIntent = await stripe.paymentIntents.create({
		currency,
		metadata: {
			userId,
			customer,
			cartString,
			email,
		},
		amount: amount,
		automatic_payment_methods: { enabled: true },
	});
	const response = responseFormatter(OK, SUCCESS, {
		clientSecret: paymentIntent.client_secret,
	});
	res.json(response);
});

exports.registerPaymentController = tryCatch(async (req, res, next) => {
	const { intent } = req.body;
	const stripeSecret = process.env.STRIPE_SECRET_KEY;
	let user = {};
	let order = {};
	let errorSet = null;
	await fetch(`https://api.stripe.com/v1/payment_intents/${intent}`, {
		headers: { Authorization: `Bearer ${stripeSecret}` },
	})
		.then(async (response) => await response.json())
		.then(async (data) => {
			const { status, metadata, amount } = data;
			if (status === 'succeeded') {
				const orderTotal = amount / 100;
				const { userId, cartString, email, customer } = metadata;
				const cart = cartString.split(',');
				order = await Order.addOrder({
					email,
					userId,
					userFullname: customer,
					orderTotal,
					products: cart,
					paymentId: intent,
					orderId: `MU${Date.now()}`,
				});
				if ('userId' in order) {
					const { _id: orderId } = order;
					user = await User.paymentUpdate({ cart, userId, orderId });
				}
				// user = await User.paymentUpdate({ cart, userId });
				// if (user._id) {
				// 	order = await Order.addOrder({
				// 		email,
				// 		userId,
				// 		orderTotal,
				// 		products: cart,
				// 		paymentId: intent,
				// 	});
				// }
			}
		})
		.catch((error) => {
			errorSet = true;
			res.json(responseFormatter(500, error.message, null));
		});
	if (!errorSet) {
		res.json(responseFormatter(OK, SUCCESS, { user, order }));
	}
});
