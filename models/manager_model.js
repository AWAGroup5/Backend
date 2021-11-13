const db = require('../database');

const users = {
  get: function(callback) {
    return db.query('select * from userName', callback); //To get from the users based on the name 
  },
  getById: function(id, callback) {
    return db.query('select * from userName where idmanager=?', [id], callback); //To search within the users based on the ID
  },
  add: function(users, callback) {
    return db.query(
      'insert into Users (idmanager,userName,password) values(?,?,?)',
      [users.idmanager, users.userName, users.idmanager],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from Users where idmanager=?', [id], callback); //Delete based on the ID 
  },
  update: function(id, users, callback) {        //Modification on the account information 
    return db.query(
      'update Users set userName=?,password=?, where idUsers=?',
      [users.idcustomer, users.userName, users.password],
      callback
    );
  }
};
module.exports = users;