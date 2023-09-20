require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Order = require('../models/Order');
const { tryCatch } = require('../utilities/tryCatch');
const { OK, SUCCESS } = require('../helpers/constants');
const {
	responseFormatter,
	responseCacher,
	storeImage,
	hashPassword,
	generateToken,
} = require('../helpers/helperFunctions');

exports.loginUserController = tryCatch(async (req, res, next) => {
	const { email: em, password } = req.body;
	const userExists = await User.findOne({ email: em });
	let response;
	let message;
	if (userExists) {
		const goodPassword = await bcrypt.compare(password, userExists.password);

		if (goodPassword) {
			const { _id: id } = userExists;
			userExists.token = generateToken(id);
			const user = await User.findOneAndUpdate(
				{ _id: id },
				{ $set: { ...userExists } },
				{ returnDocument: 'after' }
			).select({ password: 0, roles: 0 });
			response = responseFormatter(OK, SUCCESS, user);
		} else {
			message = 'The password is incorrect.';
			response = responseFormatter(400, message, {});
		}
	} else {
		message = `No user exists with this email: ${em}`;
		response = responseFormatter(400, message, {});
	}
	res.json(response);
});

exports.signUpUserController = tryCatch(async (req, res) => {
	User.syncIndexes();
	const { body } = req;
	const { image, password, email } = body;
	if (image) {
		const imageUrl = await storeImage(image);
		body.image = imageUrl;
	}
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('An account with that email exists already.');
	}
	body.password = await hashPassword(password);
	const result = await User.addUser(body);
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getAllUsersController = tryCatch(async (req, res) => {
	const result = await User.find({}, { password: 0, joinDate: 0 });
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getUsersByCompanyController = tryCatch(async (req, res) => {
	const { companyId } = req.params;
	const result = await User.find({ companyId }, { password: 0, joinDate: 0 });
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getUserByIdController = tryCatch(async (req, res) => {
	const { id } = req.params;
	const result = await User.findById(id).select({ password: 0, roles: 0 });
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getUserController = tryCatch(async (req, res) => {
	const { id } = req.params;
	const result = await User.findById(id);
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.updateUserCartController = tryCatch(async (req, res, next) => {
	const { userId, itemId, type } = req.body;
	let response;
	if (type === 'add') {
		response = await User.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { cart: itemId } },
			{ returnOriginal: false }
		).select({ password: 0, roles: 0 });
	} else if (type === 'remove') {
		response = await User.findOneAndUpdate(
			{ _id: userId },
			{ $pull: { cart: itemId } },
			{ returnOriginal: false }
		).select({ password: 0, roles: 0 });
	}
	res.json(responseFormatter(OK, SUCCESS, response));
});

exports.patchUserController = tryCatch(async (req, res) => {
	const { body } = req;
	const { password } = body;
	if (body.newImage) {
		const { image } = body;
		const imageUrl = await storeImage(image);
		body.image = imageUrl;
	}
	if (password) {
		body.password = await hashPassword(password);
	}
	delete body.newImage;
	const result = await User.updateUser(body);
	let response;
	if (result) {
		if ('firstName' in result) {
			response = responseFormatter(OK, SUCCESS, result);
			responseCacher(req, res, response);
		}
	} else {
		response = responseFormatter(OK, 'No changes made.', {});
		responseCacher(req, res, response);
	}
});

exports.checkoutController = tryCatch(async (req, res) => {
	const { userId, cart, orderTotal } = req.body;
	const orderObject = { userId, products: cart, orderTotal };
	const user = await User.paymentUpdate({ userId, cart });
	console.log({ user });
	const order = await Order.addOrder(orderObject);
	const response = responseFormatter(OK, SUCCESS, user);
	res.json(response);
});
