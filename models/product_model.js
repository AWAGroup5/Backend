const db = require('../database');

const users = {
  get: function(callback) {
    return db.query('select * from product', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from product where idUsers=?', [id], callback); //Select a product based on the ID
  },
  add: function(users, callback) {
    return db.query(
      'insert into product (idproduct,idcategory,name,description,price) values(?,?,?,?,?)',
      [users.idproduct, users.idcategory, users.name, users.description, users.price],
      callback
    );
  },
  delete: function(id, callback) { //delete a product based on the ID
    return db.query('delete from Users where idproduct=?', [id], callback);
  },
  update: function(id, users, callback) {  //update product information
    return db.query( 
      'update product set name=?,description=?, price=?, where idUsers=?',
      [users.name, users.description, users.price, id],
      callback
    );
  }
};
module.exports = users;
