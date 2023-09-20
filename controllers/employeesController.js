require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const { tryCatch } = require('../utilities/tryCatch');
const { OK, SUCCESS } = require('../helpers/constants');
const {
	responseFormatter,
	responseCacher,
	storeImage,
	hashPassword,
} = require('../helpers/helperFunctions');

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.loginEmployeeController = tryCatch(async (req, res, next) => {
	const { email: em, password } = req.body;
	const employee = await Employee.findOne({ email: em });
	let result = {};
	let response;
	let message;
	if (employee) {
		const goodPassword = await bcrypt.compare(password, user.password);
		if (goodPassword) {
			const { firstName, lastName, email, image, _id, department } = employee;
			result = {
				firstName,
				lastName,
				email,
				image,
				_id,
				department,
				token: generateToken(_id),
			};
			response = responseFormatter(OK, SUCCESS, result);
		} else {
			message = 'The password is incorrect.';
			response = responseFormatter(400, message, {});
		}
	} else {
		message = `No employee exists with this email: ${em}`;
		response = responseFormatter(400, message, {});
	}
	res.json(response);
});

exports.signUpEmployeeController = tryCatch(async (req, res) => {
	Employee.syncIndexes();
	const { body } = req;
	const { image, password, email } = body;
	if (image) {
		const imageUrl = await storeImage(image);
		body.image = imageUrl;
	}
	const employeeExists = await Employee.findOne({ email });
	if (employeeExists) {
		res.status(400);
		throw new Error('An account with that email exists already.');
	}
	body.password = await hashPassword(password);
	const result = await Employee.addUser(body);
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getAllEmployeesController = tryCatch(async (req, res) => {
	const result = await User.find({}, { password: 0, joinDate: 0 });
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getEmployeesByDepartmentController = tryCatch(async (req, res) => {
	const { department } = req.params;
	const result = await Employee.find(
		{ department },
		{ password: 0, joinDate: 0 }
	);
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.getEmployeeByIdController = tryCatch(async (req, res) => {
	const { id } = req.params;
	const result = await Employee.findById(id);
	const response = responseFormatter(OK, SUCCESS, result);
	responseCacher(req, res, response);
});

exports.patchEmployeeController = tryCatch(async (req, res) => {
	const { body } = req;
	const { password, id } = body;
	if (body.newImage) {
		const { image } = body;
		const imageUrl = await storeImage(image);
		body.image = imageUrl;
	}
	if (password) {
		body.password = await hashPassword(password);
	}
	delete body.newImage;
	const result = await Employee.findOneAndUpdate(
		{ _id: id },
		{ body },
		{ returnOriginal: false }
	);
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

exports.addManyEmployeesController = tryCatch(async (req, res, next) => {
	const { body } = req;
	const localBody = body.map((b) => {
			b.email = `${b.firstName}.${b.lastName}@moodsu.com`;
			return b		
	});
	const result = await Employee.insertMany([...localBody]);
	const response = responseFormatter(OK, SUCCESS, result);
	res.json(response);
});
