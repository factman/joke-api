/**
 * @package Healthera Jokes API router
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const express = require('express');
const { validateFileType } = require('../helpers/validations');
const {
  welcome,
  getJokes,
  createJokes,
  getJokeById,
  getJokeByIdParam,
  editJoke,
  deleteJoke,
  likeJoke,
  filterJokesByCategory,
} = require('../controllers/jokeController');

const router = express.Router();

/**
 * @description Get Joke object when :id is present in the route
 */
router.param('id', getJokeByIdParam);

/**
 * GET /api
 * @description Return API name and version.
 */
router.get('/', welcome);

/**
 * GET /api/jokes
 * @description Return all the jokes.
 */
router.get('/jokes', getJokes);

/**
 * POST /api/jokes
 * @description Create a joke or multiple jokes.
 */
router.post('/jokes', createJokes);

/**
 * GET /api/jokes/:id
 * @description Return a specific joke.
 */
router.get('/jokes/:id', getJokeById);

/**
 * PUT /api/jokes/:id
 * @description Edit a specific joke.
 */
router.put('/jokes/:id', editJoke);

/**
 * DELETE /api/jokes/:id
 * @description Delete a specific joke.
 */
router.delete('/jokes/:id', deleteJoke);

/**
 * POST /api/jokes/:id/funny
 * @description Like a specific joke.
 */
router.post('/jokes/:id/like', likeJoke);

/**
 * POST /api/jokes/import/:type
 * @description Import Jokes from a CSV or JSON file.
 */
router.post('/jokes/import/:type', validateFileType, (req, res) => {
  res.status(201).json({
    success: true,
    data: [],
    message: 'Jokes imported successfully.',
  });
});

/**
 * GET /api/jokes/export/:type
 * @description Export Jokes as CSV or JSON.
 */
router.get('/jokes/export/:type', validateFileType, (req, res) => {
  res.json({
    success: true,
    data: '',
    message: 'Jokes exported successfully.',
  });
});

/**
 * GET /api/jokes/filter/:category
 * @description Filter Jokes by category.
 */
router.get('/jokes/filter/:category', filterJokesByCategory);

/**
 * GET /api/jokes/search/:keywords
 * @description Search and return Jokes matching the :keywords.
 */
router.get('/jokes/search/:keywords', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Matched Jokes returned successfully.',
  });
});

module.exports = router;
