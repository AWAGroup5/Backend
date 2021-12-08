const express = require('express');
const router = express.Router();
const order = require('../models/order_model');

router.get('/restaurant/:id?',
  function(req, res) {
  order.getByRestaurantId(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
      res.json(dbResult);
    }
  });
});

router.get('/customer/:id?',
  function(req, res) {
  order.getByCustomerId(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
      res.json(dbResult);
    }
  });
});

router.get('/products/:id?',
  function(req, res) {
  order.getByOrderId(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
      res.json(dbResult);
    }
  });
});

router.get('/', function(req, res) {
  order.get(function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
})

router.post('/',      //post the order
function(req, res) {
  order.add(req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      console.log(dbResult);
      res.json(dbResult);
    }
  });
});

router.post('/product/',      //post the orders products
function(req, res) {
  order.addProduct(req.body, function(err, dbResult) {
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
  order.delete(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(req, res) {
  console.log(req.params.id)
  order.update(req.params.id, req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
});

module.exports = router;