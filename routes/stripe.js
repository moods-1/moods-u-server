const router = require('express').Router();

router.post('/', stripeOrderController);

module.exports = router;