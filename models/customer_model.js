const db = require('../database');

const users = {
  get: function(callback) {
    return db.query('select * from customer', callback); //To get from the users based on the name 
  },
  getById: function(id, callback) {
    return db.query('select * from customer where idcustomer=?', [id], callback); //To search within the users based on the ID
  },
  getByName: function(username, callback) {
    return db.query('select * from customer where username=?', [username], callback); //To search within the users based on the username
  },
  add: function(users, callback) {
    return db.query(
      'insert into customer (idcustomer, username, password) values(?,?,?)',
      [null, users.username, users.password],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from customer where idcustomer=?', [id], callback); //Delete based on the ID 
  },
  update: function(users, users, callback) {        //Modification on the account information 
    return db.query(
      'update customer set userName=?,password=?, where idUsers=?',
      [users.idcustomer, users.userName, users.password],
      callback
    );
  }
};
module.exports = users;
