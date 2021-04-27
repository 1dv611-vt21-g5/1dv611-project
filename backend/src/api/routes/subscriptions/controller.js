'use strict'

const Node = require('../../../models/Node')
const common = require('../../../config/common')

const {
  provider,
  routes: { getChannels }
} = require('yggio-connect')

const { subscription } = require('../../../config')

const subscribe = async (req, res, next) => {
  try {
    const { user } = req.session
    const { name, nodeId, protocol, data } = req.body

    // TODO: change protocolData to the right URL (backendUrl + /api/nodes/:device-id)
    const protocolData = `${common.BACKEND_URI}/api/updates/${nodeId}`
    const subscriptionName = `${nodeId}/${user._id}`

    const sub = await provider.subscribe(user, nodeId, protocol, protocolData, subscriptionName)
    // TODO: after sub create Node object in db

    const node = new Node({
      yggioId: nodeId,
      name: name,
      subscriptionId: sub._id,
      owner: user._id,
      dataValues: {
        // TODO: add these dynamically later
        data: {
          path: ['values']
        }
      },
      minInterval: undefined, // TODO: add from frontend later
      maxInterval: undefined // TODO: add from frontend later
    })

    await node.save()

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
