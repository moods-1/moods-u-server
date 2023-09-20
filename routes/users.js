const router = require('express').Router();
const {
	getUserController,
	signUpUserController,
	patchUserController,
	loginUserController,
	updateUserCartController,
	checkoutController,
	getUserByIdController,
} = require('../controllers/usersController');
const auth  = require('../middleware/auth');

//GET
router.get('/', auth, getUserController);
router.get('/by-id/:id', auth, getUserByIdController);

//POST
router.post('/login', loginUserController);
router.post('/signup', signUpUserController);
router.post('/update-cart', auth, updateUserCartController);
router.post('/checkout', auth, checkoutController);

//PATCH
router.patch('/update-user', auth, patchUserController);

module.exports = router;
