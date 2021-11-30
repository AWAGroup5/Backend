const dotenv = require('dotenv');

dotenv.config();

const mysql = require('mysql');
const connection = mysql.createPool({
  host: process.env.DB_HOST,       
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'heroku_7bc01a9cd72ea84'
});
module.exports = connection;
