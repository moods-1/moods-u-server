const { OK, SUCCESS } = require('../helpers/constants');
const { tryCatch } = require('../utilities/tryCatch');
const { responseFormatter } = require('../helpers/helperFunctions');
const Course = require('../models/Course');
const Order = require('../models/Order');

exports.getOrdersByUserIdController = tryCatch(async (req, res, next) => {
	const { userId } = req.params;
	const orders = await Order.find({ userId });
	res.json(responseFormatter(OK, SUCCESS, orders));
});
