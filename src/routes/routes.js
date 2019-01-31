/**
 * @package Healthera Jokes API router
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const express = require('express');
const { validateId, validateFileType } = require('../helpers/validations');

const router = express.Router();
const version = process.env.VERSION || '1.0.0';

/**
 * GET /api
 * @description Return API name and version.
 */
router.get('/', (req, res) => {
  res.json(
    {
      message: `Welcome to Healthera Jokes API (version ${version})`,
    },
  );
});

/**
 * GET /api/jokes
 * @description Return all the jokes.
 */
router.get('/jokes', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Jokes returned successfully.',
  });
});

/**
 * POST /api/jokes
 * @description Create a joke or multiple jokes.
 */
router.post('/jokes', (req, res) => {
  res.status(201).json({
    success: true,
    data: [],
    message: 'Jokes created successfully.',
  });
});

/**
 * GET /api/jokes/:id
 * @description Return a specific joke.
 */
router.get('/jokes/:id', validateId, (req, res) => {
  res.json({
    success: true,
    data: {},
    message: 'Joke returned successfully.',
  });
});

/**
 * PUT /api/jokes/:id
 * @description Edit a specific joke.
 */
router.put('/jokes/:id', validateId, (req, res) => {
  res.json({
    success: true,
    data: {},
    message: 'Joke edited successfully.',
  });
});

/**
 * DELETE /api/jokes/:id
 * @description Delete a specific joke.
 */
router.delete('/jokes/:id', validateId, (req, res) => {
  res.json({
    success: true,
    data: null,
    message: 'Joke deleted successfully.',
  });
});

/**
 * POST /api/jokes/:id/funny
 * @description Rate a specific joke as funny.
 */
router.post('/jokes/:id/funny', validateId, (req, res) => {
  res.json({
    success: true,
    data: {},
    message: 'This joke is funny.',
  });
});

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
router.get('/jokes/filter/:category', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Filtered Jokes returned successfully.',
  });
});

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
