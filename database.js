const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'eu-cdbr-west-01.cleardb.com',       
  user: 'b1ea308d13f6db',
  password: '55b0df08',
  database: 'heroku_7bc01a9cd72ea84'
});
module.exports = connection;
