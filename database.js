const mysql = require('mysql');
const connection = mysql.createPool({
  host: 'my_localhost',         //Replace with the online host integration? AWS?
  user: 'cook',
  password: 'cook',
  database: 'restaurant'
});
module.exports = connection;