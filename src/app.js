/* eslint-disable no-console */

/**
 * @package Healthera Jokes API entry point
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

// Importing Dependencies
const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { errorHandler } = require('./controllers/jokeController');
const { getError } = require('./helpers/validations');

// defining the express app
const app = express();

// creating connection to database
mongoose.connect('mongodb://joke-api:joke-api123@ds119085.mlab.com:19085/joke', { useNewUrlParser: true });

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

// logger middleware implementation
app.use(logger('dev'));

// json parser middleware implementation
app.use(jsonParser());

// welcome page
app.use('/', (req, res) => {
  res.end(`
    <!DOCTYPE html>
    <html>
     <head>
       <title>Healthera Jokes API</title>
     </head>
     <body>
       <h1>Healthera Jokes API</h1>
       <h3>
         Interview Test for Mohammed Odunayo <i>factman60@gmail.com</i>
       </h3>
       <p>Entry Routes:</p>
       <ul>
         <li>
           <a href="https://health-jokes-api.herokuapp.com/api">
             api - Api entry point
           </a>
         </li>
         <li>
           <a href="https://health-jokes-api.herokuapp.com/api/jokes">
             api/jokes - Returns Jokes
           </a>
         </li>
         <li>
           <code>...</code>
         </li>
       </ul>
     </body>
    </html>
  `);
});

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
