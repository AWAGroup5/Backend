const express = require('express');
const router = express.Router();
const product = require('../models/product_model');

router.get('/',
  function(req, res) {
    var id = req.query.id;
    if (id) {
      product.getById(id, function(err, dbResult) {
        if (err) {
          res.json(err);
        } else {
          console.log(dbResult[0]);
          res.json(dbResult[0]);
        }
      }); 
    } else {
      product.get(function(err, dbResult) {
        if (err) {
          res.json(err);
        } else {
          res.json(dbResult);
        }
      });
    }
});


router.post('/', 
function(req, res) {
  product.add(req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
      res.json(dbResult);
    }
  });
});


router.delete('/:id', 
function(req, res) {
  product.delete(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(req, res) {
  product.update(req.params.id, req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
});

module.exports = router;