const router = require('express').Router();
const {
	getUserController,
	signUpUserController,
	patchUserController,
	loginUserController,
	updateUserCartController,
} = require('../controllers/usersController');
const auth  = require('../middleware/auth');

//GET
router.get('/', auth, getUserController);

//POST
router.post('/login', loginUserController);
router.post('/signup', signUpUserController);
router.post('/update-cart', auth, updateUserCartController);

//PATCH
router.patch('/update-user', auth, patchUserController);

module.exports = router;
