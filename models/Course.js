const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			minlength: 2,
			unique: true,
		},
		subtitle: {
			type: String,
			required: true,
			minlength: 2,
			unique: true,
		},
		description: {
			type: String,
			required: true,
			minlength: 5,
		},
		image: {
			type: String,
			required: true,
			default: '/images/default-profile.jpg',
		},
		icon: {
			type: String,
			required: true,
			default: '/images/default-profile.jpg',
		},
		price: {
			type: Number,
			default: 0,
			required: true,
		},
		skillLevel: {
			type: String,
			required: true,
			minlength: 3,
		},
		time: {
			type: Number,
			required: true,
			default: 0,
		},
		enrolledCourses: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Course',
			},
		],
		completionDocument: {
			type: String,
			required: true,
			minlength: 3,
		},
		prerequisites: [
			{
				type: Schema.Types.ObjectId,
			}
		],
		rating: {
			type: Number,
			default: 0,
		},
		ratingAmount: {
			type: Number,
			default: 0,
		},
		languages: [
			{
				type: String,
				minlength: 3,
			}
		],
		location: {
			type: String,
			default: 'Remote',
		}
	},
	{ collection: 'Course' }
);

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
