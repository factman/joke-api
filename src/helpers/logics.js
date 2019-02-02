/**
 * @package Healthera Jokes API router validations
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

/**
 * @description Return an error object.
 * @param {string} message error message
 * @param {number} status HTTP status code
 * @returns {object} Error object
 */
const getError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const devDatabase = 'mongodb://localhost:27017/joke';
const prodDatabase = 'mongodb://joke-api:joke-api123@ds119085.mlab.com:19085/joke';

module.exports = {

  /**
   * @description Return mongodb connection string based on NODE environment
   */
  getConnectionString: () => (process.env.NODE_ENV ? prodDatabase : devDatabase),

  validateJokes: (jokes) => {
    let jokesStatus = true;
    jokes.forEach((joke) => {
      if ((!joke.joke) && (joke.joke.length < 1)) {
        jokesStatus = false;
      }
    });
    return jokesStatus;
  },

  getError,

  /**
   * @description Validate file type parameter if it's equal to CSV or JSON
   */
  validateFileType: (req, res, next) => {
    if (req.params.type.search(/^(CSV|JSON)$/) === -1) {
      next(getError('Not Found', 404));
    } else {
      next();
    }
  },
};
