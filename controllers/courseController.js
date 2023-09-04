const Course = require('../models/Course');
const { tryCatch } = require('../utilities/tryCatch');
const { OK, SUCCESS } = require('../helpers/constants');
const {
	responseFormatter,
	responseCacher,
	storeImage,
} = require('../helpers/helperFunctions');

exports.getAllCoursesController = tryCatch(async (req, res, next) => {
    const result = await Course.find();
    const response = responseFormatter(OK, SUCCESS, result);
	res.json(response);
})

exports.addManyCoursesController = tryCatch(async (req, res, next) => {
    const { body} = req;
    const result = await Course.insertMany([...body]);
    const response = responseFormatter(OK, SUCCESS, result);
	res.json(response);
})