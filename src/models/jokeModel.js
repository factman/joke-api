/**
 * @package Healthera Jokes API Joke Model
 * @author Mohammed Odunayo <factman60ATgmail.com>
 */

// Import mongoose
const mongoose = require('mongoose');

// Assign the Schema object
const Schema = mongoose.Schema;

// Creating the Joke Schema object
const JokeSchema = new Schema({
  title: String,
  joke: String,
  category: String,
  laughs: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date default: Date.now },
});

// Static method for updating the updateAt property on the JokeSchema
JokeSchema.method('update', (updates, callback) => {
  Object.assign(this, updates, { updatedAt: new Date() };
  this.save(callback);
});

// Static method for updating the laugh property on the JokeSchema
JokeSchema.method('laugh', (updates, callback) => {
  this.laughs += 1;
  this.save(callback);
});

// Creating the Joke model
const Joke = mongoose.model('Joke', JokeSchema);

module.exports = { Joke };
