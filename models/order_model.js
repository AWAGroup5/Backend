const db = require('../database');

const orders = {
  get: function(callback) {
    return db.query('select * from orders', callback); //Select all orders based on ID 
  },
  getByCustomerId: function(id, callback) {
    return db.query('select * from orders where idcustomer=?', [id], callback); //selec the orders specifically based on customer ID 
  },
  getByRestaurantId: function(id, callback) {
    return db.query('select * from orders where idrestaurant=?', [id], callback); //selec the orders specifically based on restaurant ID 
  },
  add: function(orders, callback) {
    return db.query(
      'insert into orders (idorder,idcustomer,status,cost,address,idrestaurant) values(?,?,?,?,?,?)',  //Adding a new orders with needed information 
      [null, orders.idcustomer, orders.status, orders.cost, orders.address, orders.idrestaurant],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from orders where idorder=?', [id], callback); //delete the orders based on the ID 
  },
  update: function(id, orders, callback) {   //updating an orders based on its ID 
    return db.query(
      'update orders set idrestaurant=?,idcustomer=?, status=?, cost=? where idorder=?', 
      [orders.idrestaurant, orders.idcustomer, orders.status, orders.cost, id],
      callback
    );
  }
};
module.exports = orders;
