const express = require('express');
const router = express.Router();
const restaurant = require('../models/restaurant_model');

router.get('/', function(req, res) {
  restaurant.get(function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
})

router.get('/:id',
  function(request, response) {
    restaurant.getById(request.params.id, function(err, dbResult) {
      if (err) {
        response.json(err);
      } else {
        console.log(dbResult[0]);
        response.json(dbResult[0]);
      }
    });
});

router.get('/:id/menu', function(req, res) {
  console.log(req.params.id)
  res.send("ok")
})

router.post('/', 
function(request, response) {
  restaurant.add(request.body, function(err, dbResult) {
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
  restaurant.delete(request.params.id, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(request, response) {
  restaurant.update(request.params.id, request.body, function(err, dbResult) {
    if (err) {
      response.json(err);
    } else {
      response.json(dbResult);
    }
  });
});

module.exports = router;