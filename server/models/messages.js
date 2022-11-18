const {dbConnection} = require('../db');
module.exports = {
  getAll: (callback) => {
    dbConnection.query(
      'SELECT * FROM Messages;',
      (err, results) => {
        if (err) {
          console.log('You fucked up bro');
          return;
        }
        callback(results);
      }
    );
  },
  create: ({username, message}) => {
    dbConnection.query(
      `INSERT INTO Messages (message, user_id) values ("${message}", (SELECT user_id from Users WHERE username = "${username}" LIMIT 1));`,
      (err, results) => {
        if (err) {
          throw new Error(err);
        }
      }
    );
  }
};