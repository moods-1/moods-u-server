const router = require('express').Router();
const {
    getTestimonialsController,
    addManyTestimonialsController,
} = require('../controllers/testimonialsController');
const auth = require('../middleware/auth');

//GET
router.get('/by-size/:size', auth, getTestimonialsController);

//POST
router.post('/add-testimonials', auth, addManyTestimonialsController);

module.exports = router;
