const router = require('express').Router();
const {
	getAllCoursesController,
	addManyCoursesController
} = require('../controllers/courseController');
const auth  = require('../middleware/auth');

//GET
router.get('/', getAllCoursesController);

//POST
router.post('/add-many', addManyCoursesController);

module.exports = router;
