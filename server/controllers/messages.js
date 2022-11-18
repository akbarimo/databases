const {messages} = require('../models');

module.exports = {
  get: (req, res) => {
    res.statusCode = 200;
    messages.getAll((result) => {
      res.end(JSON.stringify(result));
    });
  },
  post: (req, res) => {
    res.statusCode = 201;
    messages.create(req.body);
    res.end();
  }
};
