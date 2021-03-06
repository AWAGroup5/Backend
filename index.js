//Execute this with node index in node.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cloudinary = require('cloudinary').v2;
var multer = require('multer');
var { CloudinaryStorage } = require('multer-storage-cloudinary');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
require("./passport")(passport);

dotenv.config();
var app = express(); 
app.use(cors());
app.use(passport.initialize());

var restaurantRouter = require ('./routes/restaurant');
var orderRouter = require ('./routes/order');
var productRouter = require ('./routes/product');
var managerRouter = require ('./routes/manager');
var customerRouter = require ('./routes/customer');
var loginRouter = require('./routes/login');
var categoryRouter = require('./routes/category');

var PORT = (process.env.PORT || 80);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

var storage = new CloudinaryStorage ({
  cloudinary: cloudinary,
  folder: '',
  allowedFormats: ['jpeg', 'png']
});

var parser = multer({ storage: storage });

app.post('/upload', parser.single('image'), async (req, res) => {
  console.log(req.file)
  const path = req.file.path
  res.send(path);
});

app.get('/', function(req,res) {
  res.send("Welcome to server side of FoodApp")
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
app.use(bodyParser.json());

app.use('/customer', customerRouter);
app.use('/manager', managerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/order', orderRouter); 
app.use('/product', productRouter);
app.use('/login', loginRouter);
app.use('/category', categoryRouter);

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