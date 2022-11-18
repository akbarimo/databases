const mysql = require('mysql2');

exports.dbConnection = mysql.createConnection({
  user: 'momo',
  password: 'BosphorusBaklava69',
  database: 'chat',
});