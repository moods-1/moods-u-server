const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { tryCatch } = require('../utilities/tryCatch');

const OrderSchema = new Schema(
	{
		orderId: {
			type: String,	
		},
		email: {
			type: String,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		userFullname: {
			type: String,
		},
		paymentId: {
			type: String,
			unique: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				required: true,
			},
		],
		orderTotal: {
			type: Number,
			default: 0,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: 'Order',
	}
);

OrderSchema.statics.addOrder = async function (orderObject) {
	let response;
	console.log({ orderObject });
	try {
		response = await Order.create(orderObject);
		response.save();
	} catch (error) {
		throw new Error('Order error.');
	}
	return response;
};

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
