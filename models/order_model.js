const db = require('../database');

const orders = {
  get: function(callback) {
    return db.query('select * idorder', callback); //Select all orders based on ID 
  },
  getById: function(id, callback) {
    return db.query('select * from orders where idorder=?', [id], callback); //selec the order specifically based on ID 
  },
  add: function(orders, callback) {
    return db.query(
      'insert into orders (idorder,idcustomer,status,cost,idrestaurant) values(?,?,?,?,?)',  //Adding a new order with needed information 
      [orders.idorder, orders.idcustomer, orders.status, orders.cost, orders.idrestaurant],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from orders where idorder=?', [id], callback); //delete the order based on the ID 
  },
  update: function(id, orders, callback) {   //updating an order based on its ID 
    return db.query(
      'update orders set idrestaurant=?,idcustomer=?, status=?, cost=?, where idorder=?', 
      [orders.idrestaurant, orders.idcustomer, orders.status, orders.cost, id],
      callback
    );
  }
};
module.exports = orders;