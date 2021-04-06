'use strict';

const notification = (req, res, next) => {
  console.log('Incoming device update:', req.body);
  res.sendStatus(200);
};

module.exports = {
  notification
};
