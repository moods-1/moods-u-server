require('dotenv').config();
const stripe = require('stripe')('sk_test_...');
const express = require('express');
const cors = require('cors');
const { join } = require('path');
const logger = require('morgan');
const { json, urlencoded } = express;
const app = express();
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorHandler');

// Set routes
const userRouter = require('./routes/users.js');
const courseRouter = require('./routes/course.js');

// Connect to DB
require('./db')();

// Setup middleware
app.use(cors());
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));