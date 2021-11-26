const db = require('../database');

const restaurant = {
  get: function(callback) {
    return db.query('select * from restaurant', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from restaurant where idrestaurant=?', [id], callback); //to select a Name based on the restaurant ID
  },

  getProductsByCategory: function(id, callback) {
    return db.query('SELECT * FROM category INNER JOIN product ON category.idcategory = product.idcategory WHERE idrestaurant=?' [id], callback);
  },


  add: function(restaurant, callback) {  //Adding a new restaurant 
    return db.query(
      'insert into restaurant (idrestaurant,idmanager,name,type,openInfo,priceLevel) values(?,?,?,?,?,?)',
      [null, restaurant.idmanager, restaurant.name, restaurant.type, restaurant.openInfo, restaurant.priceLevel],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from restaurant where idrestaurant=?', [id], callback); //Delete a restaurant 
  },
  update: function(id, restaurant, callback) { //updating a restaurant based on ID 
    return db.query(
      'update restaurant set idrestaurant=?,idmanager=?, name=?, type=?, openInfo=?, priceLevel=?, where idrestaurant=?',
      [restaurant.idrestaurant, restaurant.idmanager, restaurant.name, restaurant.type, restaurant.openInfo, restaurant.priceLevel, id],
      callback
    );
  }
};
module.exports = restaurant;
