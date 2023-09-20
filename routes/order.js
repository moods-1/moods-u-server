const router = require('express').Router();
const auth = require('../middleware/auth');
const { getOrdersByUserIdController } = require('../controllers/orderController');

// GET
router.get('/:userId', getOrdersByUserIdController);

module.exports = router;