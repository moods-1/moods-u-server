const jwt = require('jsonwebtoken');
const { tryCatch } = require('../utilities/tryCatch');

module.exports = tryCatch((req, res, next) => {
	const token = req.headers.authorization;
	if (token === process.env.UNIVERSAL_TOKEN) {
		next();
	} else {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (decoded?.id) {
				next();
			} else {
				res.status(401);
				throw new Error('Your session has expired.');
			}
		});
	}
});
