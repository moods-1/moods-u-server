const router = require('express').Router();
const {
	getEmployeesByDepartmentController,
	addManyEmployeesController,
} = require('../controllers/employeesController');
const auth  = require('../middleware/auth');

//GET
router.get('/by-department/:department', getEmployeesByDepartmentController);

//POST
router.post('/add-many', addManyEmployeesController);


module.exports = router;