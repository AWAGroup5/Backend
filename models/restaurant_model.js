const db = require('../database');

const restaurant = {
  get: function(callback) {
    return db.query('select * from restaurant', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from restaurant where idmanager=?', [id], callback); //to get all restaurants based on the manager ID
  },

  getByRestaurantId: function(id, callback) {
    return db.query('select * from restaurant where idrestaurant=?', [id], callback); //get restaurant info by id
  },

  getProductsByCategory: function(id, callback) {
    return db.query('SELECT * FROM category INNER JOIN product ON category.idcategory = product.idcategory WHERE idrestaurant=?' [id], callback);
  },

  add: function(restaurant, callback) {  //Adding a new restaurant 
    return db.query(
      'insert into restaurant (idrestaurant,idmanager,name,description,type,openInfo,priceLevel,imageUrl) values(?,?,?,?,?,?,?,?)',
      [null, restaurant.idmanager, restaurant.name, restaurant.description, restaurant.type, restaurant.openInfo, restaurant.priceLevel, restaurant.imageUrl],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from restaurant where idrestaurant=?', [id], callback); //Delete a restaurant 
  },
  update: function(id, restaurant, callback) { //updating a restaurant based on ID 
    return db.query(
      'update restaurant set idrestaurant=?,idmanager=?, name=?, description=?, type=?, openInfo=?, priceLevel=?, where idrestaurant=?',
      [restaurant.idrestaurant, restaurant.idmanager, restaurant.name, restaurant.description, restaurant.type, restaurant.openInfo, restaurant.priceLevel, id],
      callback
    );
  }
};
module.exports = restaurant;
