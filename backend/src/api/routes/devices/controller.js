'use strict'

// TODO: något verkar ev. vara fel på hanterandet av refresh tokens
// Efter ett tag får: Error handler, error message: 401 - "Failed to exchange token: Could not find refresh token"
// trots att den borde finnas med! 
const { routes: { getNodes } } = require('yggio-connect')

const fetch = (req, res, next) => {
  const { user } = req.session
  console.log(user)
  getNodes(user)
    .then(res.status(200).json.bind(res))
    .catch(next)
}

// Exports.
module.exports = {
  fetch
}
