const express = require('express');
const router = express.Router();
const category = require('../models/category_model');

router.get('/:id?',
 function(req, res) {
  if (req.params.id) {
    category.getById(req.params.id, function(err, dbResult) {
      if (err) {
        res.json(err);
        res.send("No user on that id")
      } else {
        console.log(dbResult[0]);
        res.json(dbResult[0]);
      }
    });
  } else {
    category.get(function(err, dbResult) {
      if (err) {
        res.json(err);
      } else {
        res.json(dbResult);
      }
    });
  }
});

router.post('/', 
function(request, response) {
  category.add(request.body, function(err, dbResult) {
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
  category.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.affectedRows);
    }
  });
});

module.exports = router;