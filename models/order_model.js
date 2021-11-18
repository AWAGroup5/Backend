const db = require('../database');

const order = {
  get: function(callback) {
    return db.query('select * from order', callback); //Select all orders based on ID 
  },
  getById: function(id, callback) {
    return db.query('select * from order where idorder=?', [id], callback); //selec the order specifically based on ID 
  },
  add: function(orders, callback) {
    return db.query(
      'insert into order (idorder,idcustomer,status,cost,idrestaurant) values(?,?,?,?,?)',  //Adding a new order with needed information 
      [orders.idorder, orders.idcustomer, orders.status, orders.cost, orders.idrestaurant],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from orders where idorder=?', [id], callback); //delete the order based on the ID 
  },
  update: function(id, order, callback) {   //updating an order based on its ID 
    return db.query(
      'update orders set idrestaurant=?,idcustomer=?, status=?, cost=?, where idorder=?', 
      [order.idrestaurant, order.idcustomer, order.status, order.cost, id],
      callback
    );
  }
};
module.exports = order;
