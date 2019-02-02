/**
 * @package Healthera Jokes API router
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const express = require('express');
const { validateFileType } = require('../helpers/logics');
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
  resetDatabase,
  searchJokes,
  getJokeCategories,
  exportJokes,
  importJokes,
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
 * POST /api/jokes/reset
 * @description Clear database and reset documents jokes.
 */
router.post('/jokes/reset', resetDatabase);

/**
 * GET /api/jokes/categories
 * @description Return joke categories.
 */
router.get('/jokes/categories', getJokeCategories);

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
router.post('/jokes/import/:type', validateFileType, importJokes);

/**
 * GET /api/jokes/export/:type
 * @description Export Jokes as CSV or JSON.
 */
router.get('/jokes/export/:type', validateFileType, exportJokes);

/**
 * GET /api/jokes/filter/:category
 * @description Filter Jokes by category.
 */
router.get('/jokes/filter/:category', filterJokesByCategory);

/**
 * GET /api/jokes/search/:keywords
 * @description Search and return Jokes matching the :keywords.
 */
router.get('/jokes/search/:keywords', searchJokes);

module.exports = router;
