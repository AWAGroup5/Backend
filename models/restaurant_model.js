const db = require('../database');

const users = {
  get: function(callback) {
    return db.query('select * from idrestaurant', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from name where idrestaurant=?', [id], callback); //to select a Name based on the restaurant ID
  },
  add: function(users, callback) {  //Adding a new restaurant 
    return db.query(
      'insert into restaurant (idrestaurant,idmanager,name,type,openInfo,priceLevel) values(?,?,?,?,?,?)',
      [users.idrestaurant, users.idmanager, users.name, users.type, users.openInfo, users.priceLevel],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from restaurant where idrestaurant=?', [id], callback); //Delete a restaurant 
  },
  
  
  update: function(id, users, callback) { //updating a restaurant based on ID 
    return db.query(
      'update Users set idrestaurant=?,idmanager=?, name=?, type=?, openInfo=?, priceLevel=?, where idrestaurant=?',
      [users.idrestaurant, users.idmanager, users.name, users.type, users.openInfo, users.priceLevel, id],
      callback
    );
  }
};
module.exports = users;
