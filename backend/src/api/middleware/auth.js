'use strict';

const isUserAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  return next({
    status: 401,
    message: 'No session.'
  });
};

module.exports = {
  isUserAuthenticated
};
