// routes/product-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product-model');

const router  = express.Router();

// GET route => to get all the products
router.get('/products', (req, res, next) => {
  Product.find().populate('altas')
    .then(allTheProducts => {
      res.json(allTheProducts);
    })
    .catch(err => {
      res.json(err);
    })
});

// POST route => to create a new product
router.post('/products', (req, res, next) => {
  Product.create({
    name: req.body.name,
    specification: req.body.specification,
    altas: [],
    owner: req.user._id
  })
  .then(response => {
  res.json(response);
  })
  .catch(err => {
  res.json(err);
  })
});

// GET route => to get a specific product/detailed view
router.get('/products/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // our products have array of altas' ids and
  // we can use .populate() method to get the whole alta objects
  //                                   ^
  //                                   |
  //                                   |
  Product.findById(req.params.id).populate('altas')
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific product
router.put('/products/:id', (req, res, next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific product
router.delete('/products/:id', (req, res, next) => {

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Product with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = router;
