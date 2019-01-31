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

module.exports = {
  getError,
  /**
   * @description Validate an id parameter if a string or number is passed
   */
  validateId: (req, res, next) => {
    if (!Number(req.params.id)) {
      next(getError('Not Found', 404));
    } else {
      next();
    }
  },
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
