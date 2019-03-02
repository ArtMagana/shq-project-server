// routes/alta-routes.js

const express = require('express');
const mongoose = require('mongoose');
const Alta = require('../models/alta-model');
const Product = require('../models/product-model');

const router  = express.Router();

// POST route => to create a new alta
router.post('/altas', (req, res, next)=>{

  Alta.create({
      name: req.body.name,
      specification: req.body.specification,
      product: req.body.productID
  })
    .then(response => {
        Product.findByIdAndUpdate(req.body.productID, { $push:{ altas: response._id } })
        .then(theResponse => {
            res.json(theResponse);
        })
        .catch(err => {
          res.json(err);
      })
    })
    .catch(err => {
      res.json(err);
    })
})

// PUT route => to update a specific alta
router.put('/altas/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Alta.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Alta with ${req.params.id} is updated successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

// DELETE route => to delete a specific alta
router.delete('/altas/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Alta.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Alta with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    })
})

module.exports = router;
