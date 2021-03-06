const express = require('express');
const category = require('../models/category_model');
const product = require('../models/product_model');
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
  function(req, res) {
    restaurant.getById(req.params.id, function(err, dbResult) {
      if (err) {
        res.json(err);
      } else {
        console.log(dbResult);
        res.json(dbResult);
      }
    });
});

router.get('/single/:id',
  function(req, res) {
    restaurant.getByRestaurantId(req.params.id, function(err, dbResult) {
      if (err) {
        res.json(err);
      } else {
        console.log(dbResult[0]);
        res.json(dbResult[0]);
      }
    });
});

router.get('/:id/menu', function(req, res) {
  console.log("restaurantId: " + req.params.id)
  let categories = new Array();
  category.getById(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err)
    } else {
      for (let i=0; i<dbResult.length ; i++) {
        product.getById(dbResult[i].idcategory, function(err, productResult) {
          if (err) {
            res.json(err)
          } else {
            categories.push({ categoryName: dbResult[i].name, categoryId: dbResult[i].idcategory, products: productResult })
            if (i === dbResult.length - 1) {
              console.log("iffissä")
              console.log(categories)
              res.send(categories)
            }
          }
        })
      }
    }
  })
})

router.post('/', 
function(req, res) {
  restaurant.add(req.body, function(err, dbResult) {
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
  restaurant.delete(req.params.id, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult.affectedRows);
    }
  });
});


router.put('/:id', 
function(req, res) {
  restaurant.update(req.params.id, req.body, function(err, dbResult) {
    if (err) {
      res.json(err);
    } else {
      res.json(dbResult);
    }
  });
});

module.exports = router;