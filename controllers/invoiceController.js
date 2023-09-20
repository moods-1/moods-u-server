const { OK } = require('../helpers/constants');
const { responseFormatter } = require('../helpers/helperFunctions');
const Course = require('../models/Course');
const Order = require('../models/Order');
const moment = require('moment-timezone');
const PDFDocument = require('pdfkit');

const { invoiceMaker } = require('../utilities/pdfInvoiceMaker');
const { tryCatch } = require('../utilities/tryCatch');

exports.invoiceMakerController = tryCatch(async (req, res, next) => {
	const { orderId } = req.params;
	const order = await Order.findOne({ orderId });
	if (order) {
		const { products, createdAt, userFullname, email } = order;
		const date = moment(createdAt).format('DD-MMM-YYYY');
		const items = await Course.find({ _id: { $in: products } });
		if (items) {
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment;filename=invoice.pdf'
			})
			invoiceMaker(res, items, date, orderId, userFullname,email);
		}
	} else {
		let message = 'No order was found.';
		res.json(responseFormatter(400, message, message));
	}
});
