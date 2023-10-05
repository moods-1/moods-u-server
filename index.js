require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { json, urlencoded } = express;
const app = express();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorHandler');
const socket = require('./socket');

// Set routes
const userRouter = require('./routes/users.js');
const courseRouter = require('./routes/course.js');
const testimonialRouter = require('./routes/testimonials');
const employeeRouter = require('./routes/employees');
const stripeRouter = require('./routes/stripe');
const invoiceRouter = require('./routes/invoices');
const orderRouter = require('./routes/order');

// Connect to DB
require('./db')();

// Setup middleware
app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Setup routes
app.get('/', (req, res) => {
	res.status(200).sendFile(__dirname + '/pages/BasePage.html');
});
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/orders', orderRouter);
app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Main server listening on port ${PORT}`));

// Start websocket for chat support
socket(server);
