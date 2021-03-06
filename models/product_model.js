const db = require('../database');

const product = {
  get: function(callback) {
    return db.query('select * from product', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from product where idcategory=?', [id], callback); //Select a products based on the category
  },
  getByProductId: function(id, callback) {
    return db.query('select * from product where idproduct=?', [id], callback);
  },
  getByName: function(name, callback) {
    return db.query('select * from product where name=?', [name], callback); //Select a product based on the name
  },
  add: function(product, callback) {
    return db.query(
      'insert into product (idproduct,idcategory,name,description,price,imageUrl) values(?,?,?,?,?,?)',
      [null, product.idcategory, product.name, product.description, product.price, product.imageUrl],
      callback
    );
  },
  delete: function(id, callback) { //delete a product based on the ID
    return db.query('delete from product where idproduct=?', [id], callback);
  },
  update: function(id, product, callback) {  //update product information
    return db.query( 
      'update product set name=?,description=?, price=?, where idproduct=?',
      [product.name, product.description, product.price, id],
      callback
    );
  }
};
module.exports = product;
