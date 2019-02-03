/* eslint-disable no-console */

/**
 * @package Healthera Jokes API entry point
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

// Importing Dependencies
const express = require('express');
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { errorHandler } = require('./controllers/jokeController');
const { getError, getConnectionString } = require('./helpers/logics');

// defining the express app
const app = express();

// creating connection to database
mongoose.connect(getConnectionString(), { useNewUrlParser: true });

// save connection object
const db = mongoose.connection;

// database error event listener
db.on('error', (err) => {
  console.log('error connecting to database', err);
});

// database open event listener
db.once('open', () => {
  console.log('db connected successfully');
});

// helmet middleware implementation
app.use(helmet());

// logger middleware implementation
app.use(logger('dev'));

// json parser middleware implementation
app.use(jsonParser({ limit: "10mb" }));

// cors middleware implementation
app.use(cors());

// compression middleware implementation
app.use(compression());

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
