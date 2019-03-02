// models/project-model.js

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Alta = require('./alta-model');
const User = require('./user-model');

const productSchema = new Schema({
  name: String,
  specification: String,
  altas: [{type: Schema.Types.ObjectId, ref: 'Alta'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
