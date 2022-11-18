const {users} = require('../models');

module.exports = {
  get: (req, res) => {
    res.statusCode = 200;
    users.getAll((result) => {
      res.end(JSON.stringify(result));
    });
  },
  post: (req, res) => {
    res.statusCode = 201;
    users.create(req.body);
    res.end();
  }
};
