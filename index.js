//Execute this with node index in node.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = "4000"; 
var tempData = require('./restaurantdata.json');

var indexRouter = require ('./routes/index');
var restaurantRouter = require ('./routes/restaurant');
var orderRouter = require ('./routes/order');
var productRouter = require ('./routes/product');
var managerRouter = require ('./routes/manager');
var customerRouter = require ('./routes/customer');

var app = express(); 
const cors = require("cors")
app.use(cors({
  origin: 'https://awaproject5db.herokuapp.com/'
}))

app.get('/', (req, res) => {
  res.send('Food App API!')
})

app.get("/restaurants", (req, res) => {
  res.json(tempData.data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); 
app.use('/manager', managerRouter); 
app.use('/order', orderRouter); 
app.use('/product', productRouter); 
app.use('/restaurant', restaurantRouter); 
app.use('/customer', customerRouter); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});

module.exports = app;