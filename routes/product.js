const express = require('express');
const router = express.Router();
const product = require('../models/product_model');

router.get('/',
  function(request, response) {
    var name = request.query.name;
    product.getByName(name, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult[0]);
        response.json(dbResult[0]);
      }
    }); 
});


router.post('/', 
function(request, response) {
  product.add(request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      console.log(dbResult);
      response.json(dbResult);
    }
  });
});


router.delete('/:id', 
function(request, response) {
  product.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(request, response) {
  product.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;