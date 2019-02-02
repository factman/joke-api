/* eslint-disable consistent-return */
/**
 * @package Healthera Jokes API Joke Controller
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const fs = require('fs');
const { Joke } = require('../models/jokeModel');
const { validateJokes, getError, convertToCSV, convertToJSON } = require('../helpers/logics');
const initialJokes = require('../../jokes.json');

const version = process.env.VERSION || '1.0.0';

module.exports = {

  /**
   * @description Return welcome message
   */
  welcome: (req, res) => {
    const file = fs.readFileSync('welcome.html', 'utf8');
    res.end(file.replace('{{version}}', version));
  },

  /**
   * @description Return Specified Joke Via id parameter
   */
  getJokeByIdParam: (req, res, next, id) => {
    Joke.findById(id, (err, joke) => {
      if (err) return next(err);
      if (!joke) return next(getError('Not Found', 404));
      req.joke = joke;
      return next();
    });
  },

  /**
   * @description Return jokes from database
   */
  getJokes: (req, res, next) => {
    Joke.find({})
      .sort({ createdAt: -1, likes: -1 })
      .exec((err, jokes) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: jokes,
          message: 'Jokes returned successfully.',
        });
      });
  },

  /**
   * @description Return joke categories
   */
  getJokeCategories: (req, res, next) => {
    Joke.find({}, 'category')
      .exec((err, categories) => {
        if (err) return next(err);
        const distinctCategories = [];
        const redundantCategories = [];
        const result = [];
        categories.forEach((category) => {
          if (!distinctCategories.includes(category.category)) {
            distinctCategories.push(category.category);
          }
          redundantCategories.push(category.category);
        });
        distinctCategories.forEach((name) => {
          let count = 0;
          redundantCategories.forEach((redundantName) => {
            if (redundantName === name) count += 1;
          });
          result.push({ name, count });
        });
        res.json({
          success: true,
          data: result,
          message: 'Categories returned successfully.',
        });
      });
  },

  /**
   * @description Create a Joke or Jokes
   */
  createJokes: (req, res, next) => {
    const jokes = req.body;
    if (validateJokes(jokes)) {
      Joke.insertMany(jokes, (err, jokesArray) => {
        if (err) return next(err);
        res.status(201)
          .json({
            success: true,
            data: jokesArray,
            message: 'Jokes created successfully.',
          });
      });
    } else {
      next(getError('Invalid joke objects, "joke is required".', 500));
    }
  },

  /**
   * @description Return a specific joke from database
   */
  getJokeById: (req, res) => {
    res.json({
      success: true,
      data: req.joke,
      message: 'Joke returned successfully.',
    });
  },

  /**
   * @description Edit a specific Joke
   */
  editJoke: (req, res, next) => {
    if (validateJokes([req.body])) {
      const joke = {
        title: req.body.title || req.joke.title,
        category: req.body.category || req.joke.category,
        joke: req.body.joke || req.joke.joke,
      };
      req.joke.update(joke, (err, editedJoke) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: editedJoke,
          message: 'Joke edited successfully.',
        });
      });
    } else {
      return next(getError('Invalid joke objects, "joke is required".', 500));
    }
  },

  /**
   * @description Delete a specific Joke
   */
  deleteJoke: (req, res, next) => {
    Joke.findOneAndDelete({ id: req.params.id }, (err, data) => {
      if (err) return next(err);
      res.json({
        success: true,
        data,
        message: 'Joke deleted successfully.',
      });
    });
  },

  /**
   * @description Like a specific Joke
   */
  likeJoke: (req, res, next) => {
    const joke = {
      likes: req.joke.likes + 1,
    };
    req.joke.update(joke, (err, updatedJoke) => {
      if (err) return next(err);
      res.json({
        success: true,
        data: updatedJoke,
        message: 'Joke liked.',
      });
    });
  },

  /**
   * @description Filter jokes by category
   */
  filterJokesByCategory: (req, res, next) => {
    Joke.where('category')
      .equals(req.params.category)
      .sort({ createdAt: -1, likes: -1 })
      .exec((err, jokes) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: jokes,
          message: 'Filtered Jokes returned successfully.',
        });
      });
  },

  /**
   * @description Reset Database and initialize jokes
   */
  resetDatabase: (req, res, next) => {
    Joke.db.dropDatabase((err) => {
      if (err) return next(err);
      Joke.insertMany(initialJokes, (err2, jokesArray) => {
        if (err2) return next(err2);
        res.status(201)
          .json({
            success: true,
            data: jokesArray,
            message: 'Jokes Reset successfully.',
          });
      });
    });
  },

  /**
   * @description Searching for jokes
   */
  searchJokes: (req, res, next) => {
    const query = req.params.keywords.split(' ').join(')(?=.*');
    Joke.find({ joke: new RegExp(`(?=.*${query})`, 'i') })
      .exec((err, jokes) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: jokes,
          message: 'Matched Jokes returned successfully.',
        });
      });
  },

  /**
   * @description Import jokes as JSON | CSV
   */
  importJokes: (req, res, next) => {
    const jokes = (req.params.type === 'JSON') ? req.body : convertToJSON(req.body);
    if (validateJokes(jokes)) {
      Joke.insertMany(jokes, (err, jokesArray) => {
        if (err) return next(err);
        res.status(201)
          .json({
            success: true,
            data: jokesArray,
            message: 'Jokes created successfully.',
          });
      });
    } else {
      next(getError('Invalid joke objects, "joke is required".', 500));
    }
  },

  /**
   * @description Export jokes as JSON | CSV
   */
  exportJokes: (req, res, next) => {
    Joke.find({})
      .sort({ createdAt: 1 })
      .exec((err, jokes) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: (req.params.type === 'JSON') ? jokes : convertToCSV(jokes),
          message: 'Jokes returned successfully.',
        });
      });
  },

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
    next();
  },
};
