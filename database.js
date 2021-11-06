const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'my_localhost',
  user: 'cook',
  password: 'cook',
  database: 'restaurant'
});
module.exports = connection;