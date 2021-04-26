'use strict'

const {
  provider,
  routes: { getChannels }
} = require('yggio-connect')

const { subscription } = require('../../../config')

const subscribe = async (req, res, next) => {
  try {
    const { user } = req.session
    const { name, nodeId, protocol } = req.body
    // TODO: name is plucked from frontend somehow, msaybe generate it here

    // TODO: change protocolData to the right URL (backendUrl + /api/nodes/:device-id)
    const protocolData = subscription.http

    const sub = await provider.subscribe(user, nodeId, protocol, protocolData, name)
    // TODO: after sub create Node object in db
    console.log(sub)
    return res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

const unsubscribe = async (req, res, next) => {
  const { user } = req.session
  const { nodeId } = req.query
  res.sendStatus(404)
  // provider.subscribe(user, nodeId)
  // .then(() => res.sendStatus(200))
  // .catch(next);
}

const getSubscriptions = async (req, res, next) => {
  try {
    const { user } = req.session
    const subs = await getChannels(user, req.query.iotnode)

    res.json(subs)
  } catch (e) {
    res.status(400).send()
  }
}

module.exports = {
  subscribe,
  unsubscribe,
  getSubscriptions
}
