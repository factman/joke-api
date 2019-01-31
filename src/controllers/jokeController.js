/**
 * @package Healthera Jokes API Joke Controller
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const { Joke } = require('../models/jokeModel');

module.exports = {
  /**
   * @description Handle all errors and respond with error message and status code
   */
  errorHandler: (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      error: {
        message: err.message,
      },
    });
  },
};
