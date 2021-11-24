const db = require('../database');

const category = {
  get: function(callback) {
    return db.query('select * from category', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from category where idcategory=?', [id], callback); //Select a category based on the ID
  },
  add: function(category, callback) {
    return db.query(
      'insert into category (idcategory,idrestaurant,name) values(?,?,?)',
      [null, category.idrestaurant, category.name],
      callback
    );
  },
  delete: function(id, callback) { //delete a category based on the ID
    return db.query('delete from category where idcategory=?', [id], callback);
  },
  update: function(id, category, callback) {  //update category information
    return db.query( 
      'update category set name=?, where idcategory=?',
      [category.name, id],
      callback
    );
  }
};
module.exports = category;