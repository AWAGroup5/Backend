const db = require('../database');

const managers = {
  get: function(callback) {
    return db.query('select * from manager', callback); //To get from the managers based on the name 
  },
  getById: function(id, callback) {
    return db.query('select * from manager where idmanager=?', [id], callback); //To search within the managers based on the ID
  },
  add: function(managers, callback) {
    return db.query(
      'insert into manager (idmanager,userName,password) values(?,?,?)',
      [null, managers.username, managers.password],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from manager where idmanager=?', [id], callback); //Delete based on the ID 
  },
  update: function(id, managers, callback) {        //Modification on the account information 
    return db.query(
      'update manager set userName=?,password=?, where idmanagers=?',
      [managers.idcustomer, managers.userName, managers.password],
      callback
    );
  }
};
module.exports = managers;
