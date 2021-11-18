const db = require('../database');

const orders = {
  get: function(callback) {
    return db.query('select * from orders', callback); //Select all orderss based on ID 
  },
  getById: function(id, callback) {
    return db.query('select * from orders where idorders=?', [id], callback); //selec the orders specifically based on ID 
  },
  add: function(orderss, callback) {
    return db.query(
      'insert into orders (idorders,idcustomer,status,cost,idrestaurant) values(?,?,?,?,?)',  //Adding a new orders with needed information 
      [orderss.idorders, orderss.idcustomer, orderss.status, orderss.cost, orderss.idrestaurant],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from orders where idorders=?', [id], callback); //delete the orders based on the ID 
  },
  update: function(id, orders, callback) {   //updating an orders based on its ID 
    return db.query(
      'update orderss set idrestaurant=?,idcustomer=?, status=?, cost=?, where idorders=?', 
      [orders.idrestaurant, orders.idcustomer, orders.status, orders.cost, id],
      callback
    );
  }
};
module.exports = orders;
