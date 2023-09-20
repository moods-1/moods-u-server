const router = require('express').Router();
const auth = require('../middleware/auth');
const {
    getConfigController,
    postPaymentIntent,
    registerPaymentController,
} = require('../controllers/stripeController');

// GET
router.get('/config', auth, getConfigController);

// POST
router.post('/create-payment-intent', auth, postPaymentIntent);
router.post('/register-payment', auth, registerPaymentController);

module.exports = router;
