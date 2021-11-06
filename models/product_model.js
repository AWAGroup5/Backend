const db = require('../database');

const users = {
  get: function(callback) {
    return db.query('select * from users', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from Users where idUsers=?', [id], callback);
  },
  add: function(users, callback) {
    return db.query(
      'insert into Users (idUsers,FirstName_User,Country_User,Email_User,SecondName_User) values(?,?,?,?,?)',
      [users.idUsers, users.FirstName_User, users.Country_User, users.Email_User, users.SecondName_User],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from Users where idUsers=?', [id], callback);
  },
  update: function(id, users, callback) {
    return db.query(
      'update Users set FirstName_User=?,Country_User=?, Email_User=?, SecondName_User=?, where idUsers=?',
      [users.idUsers, users.FirstName_User, users.Country_User, users.Email_User, users.SecondName_User, id],
      callback
    );
  }
};
module.exports = users;