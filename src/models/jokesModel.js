/**
 * @package Healthera Jokes API Joke Model
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/joke');

const db = mongoose.connection;
