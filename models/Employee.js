const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DEFAULT_IMAGES, EMPLOYEE_ROLES, COMPANY_DEPARTMENTS } = require('../helpers/constants');

const EmployeeSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			minlength: 2,
			unique: false,
		},
		lastName: {
			type: String,
			required: true,
			minlength: 2,
			unique: false,
		},
		email: {
			type: String,
			required: true,
			minlength: 6,
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: false,
		},
		image: {
			type: String,
			default: DEFAULT_IMAGES.AVATAR,
		},
		joinDate: {
			type: Date,
			default: Date.now,
		},
		roles: [
			{
				type: String,
				default: EMPLOYEE_ROLES.DEFAULT,
			},
		],
		token: {
			type: String,
		},
		department: {
			type: String,
			default: COMPANY_DEPARTMENTS.SUPPORT,
		},
		city: {
			type: String,
			required: true,
		},
		province: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			minlength: 10,
		},
		slogan: {
			type: String,
			minlength: 10,			
		}
	},
	{ collection: 'Employee' }
);

// Create new employee
EmployeeSchema.statics.addEmployee = function (employeeObject) {
	const newEmployee = new Employee(employeeObject);
	newEmployee.save();
	return newEmployee;
};

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
