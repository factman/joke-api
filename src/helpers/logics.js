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

  /**
   * @description Return CSV formatted String
   * @param {Array} jokes Array of jokes
   */
  convertToCSV: (jokes) => {
    const CSV = ['"Title"|"Joke"|"Category"|"Likes"'];
    jokes.forEach((joke) => {
      CSV.push(`"${joke.title}"|"${joke.joke}"|"${joke.category}"|"${joke.likes}"`);
    });
    // eslint-disable-next-line quotes
    return CSV.join("\n\r");
  },

  /**
   * @description Return array of formatted jokes
   * @param {Array} jokes Array of jokes
   */
  formatJokes: (jokes) => {
    const objs = [];
    jokes.forEach((joke) => {
      objs.push({
        title: joke.title,
        category: joke.category,
        joke: joke.joke,
        likes: joke.likes,
      });
    });
    return objs;
  },

  /**
   * @description Return array of Objects
   * @param {string} CSV CSV string
   */
  convertToJSON: (CSV) => {
    const obj = [];
    // eslint-disable-next-line quotes
    const CSVLines = CSV[0].split("\n\r");
    CSVLines.shift();
    CSVLines.forEach((jokeString) => {
      const jokeData = jokeString.split('|');
      console.log(jokeData);
      obj.push({
        title: jokeData[0].substr(1, (jokeData[0].length - 2)),
        joke: jokeData[1].substr(1, (jokeData[1].length - 2)),
        category: jokeData[2].substr(1, (jokeData[2].length - 2)),
        likes: jokeData[3].substr(1, (jokeData[3].length - 2)),
      });
    });
    return obj;
  },
};
