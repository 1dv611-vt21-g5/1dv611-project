'use strict';

const {
  provider,
  routes: {getChannels}
} = require('yggio-connect');

const {subscription} = require('../../../config');

const subscribe = (req, res, next) => {
  const {user} = req.session;
  const {name, nodeId, protocol} = req.body;
  const protocolData = subscription.http;
  provider.subscribe(user, nodeId, protocol, protocolData, name)
    .then(() => res.sendStatus(200))
    .catch(next);
};

const unsubscribe = (req, res, next) => {
  const {user} = req.session;
  const {nodeId} = req.query;
  res.sendStatus(404);
  //provider.subscribe(user, nodeId)
   // .then(() => res.sendStatus(200))
   // .catch(next);
};

const getSubscriptions = (req, res, next) => {
  const {user} = req.session;
  getChannels(user, req.query.iotnode)
    .then(res.status(200).json.bind(res))
    .catch(next);
};

module.exports = {
  subscribe,
  unsubscribe,
  getSubscriptions
};
