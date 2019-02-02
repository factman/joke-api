/**
 * @package Healthera Jokes API Joke Model
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const { Schema } = mongoose;

// Creating the Joke Schema object
const JokeSchema = new Schema({
  title: { type: String, default: '' },
  joke: String,
  category: { type: String, default: 'Generic' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

JokeSchema.index({
  title: 'text',
  joke: 'text',
  category: 'text',
});

JokeSchema.methods.update = ($this, updates, callback) => {
  Object.assign($this, updates, { updatedAt: new Date() });
  $this.save(callback);
};

// Creating the Joke model
const Joke = mongoose.model('Joke', JokeSchema);

module.exports = { Joke };
