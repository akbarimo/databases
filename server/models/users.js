const {dbConnection} = require('../db');
module.exports = {
  getAll: (callback) => {
    dbConnection.query(
      'SELECT * FROM Users;',
      (err, results) => {
        if (err) {
          console.log('You fucked up bro.');
          return;
        }
        callback(results);
      }
    );
  },
  create: ({username}) => {
    dbConnection.query(
      `INSERT INTO Users (username) values ('${username}');`,
      (err, results) => {
        if (err) {
          console.log('Username Git Guud');
          return;
        }
      }
    );
  }
};