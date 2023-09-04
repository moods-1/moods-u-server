const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { USER_ROLES, DEFAULT_IMAGES } = require('../helpers/constants');

const UserSchema = new Schema(
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
		enrolledCourses: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Course',
			},
		],
		roles: [
			{
				type: String,
				default: USER_ROLES.DEFAULT,
			},
		],
		token: {
			type: String,
		},
		cart: [
			{
				type: Schema.Types.ObjectId,
			},
		],
	},
	{ collection: 'User' }
);

// Create new user
UserSchema.statics.addUser = function (userObject) {
	const newUser = new User(userObject);
	newUser.save();
	return newUser;
};

// Update user
UserSchema.statics.updateUser = async function (userObject) {
	const { id } = userObject;
	return await User.findByIdAndUpdate(
		{ _id: id },
		{ $set: { ...userObject } },
		{ returnDocument: 'after' }
	).select({ password: 0, roles: 0, joinDate: 0 });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
