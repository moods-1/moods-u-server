const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DEFAULT_IMAGES } = require('../helpers/constants');

const TestimonialSchema = new Schema(
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
		image: {
			type: String,
			default: DEFAULT_IMAGES.AVATAR,
        },
        testimonial: {
            type: String,
            minlength: 6,
            maxlength: 400,
        }
	},
	{ collection: 'Testimonial' }
);

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);
module.exports = Testimonial;
