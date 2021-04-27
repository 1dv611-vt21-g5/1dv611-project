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

    // where we want yggio to send updates
    const protocolData = { url: `${common.BACKEND_URI}/api/updates/${nodeId}` }
    // just a name for the subscription, probably not important
    const subscriptionName = `${nodeId}/${user._id}`

    // create the sub at Yggio
    // TODO: fix to get correct return values 
    const sub = await provider.subscribe(user, nodeId, protocol, protocolData, subscriptionName)

    // console.log(sub)
    // // For development and testing
    // const sub = {
    //   _id: "6080dbc105b64d15d3f3434"
    // }

    //console.log(user._id)

    // create a corresponding Node here
    const node = new Node({
      yggioId: nodeId,
      name: name,
      subscriptionId: sub._id,
      owner: user._id, // TODO : not same as in db
      dataValues: {
        // TODO: add these dynamically from frontend later
        data: {
          path: ['value']
        }
      },
      minInterval: undefined, // TODO: add from frontend later
      maxInterval: undefined // TODO: add from frontend later
    })

    console.log(node)

    await node.save()

    return res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

const unsubscribe = async (req, res, next) => {
  // TODO: implement
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
