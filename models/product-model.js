// models/project-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Alta = require('./alta-model');
const User = require('./user-model');

const productSchema = new Schema({
  name: String,
  specification: String,
  measure: String,
  packing: String,
  code: String,
  quantity: Number,
  cost: Number,
  currency: String,
  iva: Number,
  igi: Number,
  presentation: String,
  dimensions: Number,
  altas: [{type: Schema.Types.ObjectId, ref: 'Alta'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
