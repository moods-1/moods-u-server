const router = require('express').Router();
const auth = require('../middleware/auth');
const { invoiceMakerController } = require('../controllers/invoiceController');

router.get('/:orderId', auth, invoiceMakerController);

module.exports = router;
