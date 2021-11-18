//Execute this with node index in node.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cloudinary = require('cloudinary');
var multer = require('multer');
var { CloudinaryStorage } = require('multer-storage-cloudinary');
var tempData = require('./restaurantdata.json');
var PORT = (process.env.PORT || 80);

var indexRouter = require ('./routes/index');
var restaurantRouter = require ('./routes/restaurant');
var orderRouter = require ('./routes/order');
var productRouter = require ('./routes/product');
var managerRouter = require ('./routes/manager');
var customerRouter = require ('./routes/customer');

var storage = new CloudinaryStorage ({
  cloudinary: cloudinary,
  folder: '',
  allowedFormats: ['jpeg', 'png']
});

var parser = multer({ storage: storage });

var app = express(); 
const cors = require("cors")
app.use(cors({
  origin: '*'
}))

app.get('/', (req, res) => {
  res.send('Food App API!')
})

app.post('/upload', parser.single('image'), function (res, req) {
  console-log(req.file);
  res.status(201);
  res.json(req.file);
});

app.get("/restaurants", (req, res) => {
  res.json(tempData.data)
})

app.listen(PORT, () => {
  console.log('Example app listening at' ,PORT);
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