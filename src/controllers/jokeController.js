/* eslint-disable consistent-return */
/**
 * @package Healthera Jokes API Joke Controller
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const { Joke } = require('../models/jokeModel');
const { validateJokes, getError } = require('../helpers/validations');

const version = process.env.VERSION || '1.0.0';

module.exports = {

   /**
   * @description Return welcome message
   */
   welcome: (req, res) => {
    res.end(`
    <!DOCTYPE html>
    <html>
     <head>
       <title>Healthera Jokes API</title>
     </head>
     <body>
       <h1>Healthera Jokes API ${version}</h1>
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
        return next();
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
        return next();
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
        updatedAt: new Date(),
      };
      Joke.findOneAndUpdate(
        { id: req.param.id }, joke, { new: true, runValidators: true },
        (err, jokeObject) => {
          if (err) return next(err);
          res.json({
            success: true,
            data: jokeObject,
            message: 'Joke edited successfully.',
          });
        },
      );
    } else {
      return next(getError('Invalid joke objects, "joke is required".', 500));
    }
  },
  
  /**
   * @description Delete a specific Joke
   */
  deleteJoke: (req, res, next) => {
    Joke.findOneAndDelete(
      { id: req.param.id }, (err) => {
        if (err) return next(err, data);
        res.json({
          success: true,
          data: data,
          message: 'Joke deleted successfully.',
        });
        return next();
      });
  },
  
  /**
   * @description Like a specific Joke
   */
  likeJoke: (req, res, next) => {
    req.joke.like += 1;
    Joke.findOneAndUpdate(
      { id: req.param.id }, req.joke, { new: true, runValidators: true },
      (err, jokeObject) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: jokeObject,
          message: 'Joke liked.',
        });
      },
    );
  },
  
  /**
   * @description Filter jokes by category
   */
  filterJokesByCategory: (req, res, next) => {
    Joke.find({ category: req.param.category })
      .sort({ createdAt: -1, likes: -1 })
      .exec((err, jokes) => {
        if (err) return next(err);
        res.json({
          success: true,
          data: jokes,
          message: 'Filtered Jokes returned successfully.',
        });
        return next();
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
