// models/task-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Product = require('./product-model');

const altaSchema = new Schema({
  name: String,
  specification: String,
  measure: String,
  packing: String,
  product: {type: Schema.Types.ObjectId, ref: 'Product'}
});

const Alta = mongoose.model('Alta', altaSchema);

module.exports = Alta;
