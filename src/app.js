/* eslint-disable no-console */

/**
 * @package Healthera Jokes API entry point
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

// Importing Dependencies
const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const routes = require('./routes/routes');
const { errorHandler } = require('./controllers/jokeController');
const { getError } = require('./helpers/validations');
// defining the express app
const app = express();

// logger middleware implementation
app.use(logger('dev'));
// json parser middleware implementation
app.use(jsonParser());

/**
 * GET /api
 * @description API route middleware.
 */
app.use('/api', routes);

/**
 * @description catch 404 error and forward to error handler.
 */
app.use((req, res, next) => {
  next(getError('Not Found', 404));
});

/**
 * @description Error Handler.
 */
app.use(errorHandler);

// defining Port number
const port = process.env.PORT || 5000;

// Raising the app to listen to port
app.listen(port, () => {
  console.log('Joke API is listening on Port:', port);
});
