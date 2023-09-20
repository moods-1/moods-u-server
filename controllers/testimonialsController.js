require('dotenv').config();
const Testimonial = require('../models/Testimonial');
const { tryCatch } = require('../utilities/tryCatch');
const { OK, SUCCESS } = require('../helpers/constants');
const {
	responseFormatter,
	responseCacher,
	storeImage,
	hashPassword,
} = require('../helpers/helperFunctions');

exports.getTestimonialsController = tryCatch(async (req, res, next) => {
	const { size } = req.params;
	const result = await Testimonial.find().limit(size);
    const response = responseFormatter(OK, SUCCESS, result);
	res.json(response);
})

exports.addManyTestimonialsController = tryCatch(async (req, res, next) => {
    const { body} = req;
    const result = await Testimonial.insertMany([...body]);
    const response = responseFormatter(OK, SUCCESS, result);
	res.json(response);
})