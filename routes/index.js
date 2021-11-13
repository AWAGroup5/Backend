var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food App API' });
});
//Retaurants information first frontend page
module.exports = router;