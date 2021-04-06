'use strict';

const {routes: {getNodes}} = require('yggio-connect');

const fetch = (req, res, next) => {
  const {user} = req.session;
  getNodes(user)
    .then(res.status(200).json.bind(res))
    .catch(next);
};

module.exports = {
  fetch
};
