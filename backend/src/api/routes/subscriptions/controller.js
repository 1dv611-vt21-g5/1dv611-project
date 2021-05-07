'use strict'

const axios = require('axios')

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

    const subscriptionExists = await Node.findOne({ owner: user._id, name: name })

    if (subscriptionExists) {
      console.log('You already has a subscription on this device!')
      return
    }
    // create the sub at Yggio
    // TODO: fix to get correct return values 
    const sub = await provider.subscribe(user, nodeId, protocol, protocolData, subscriptionName)
    console.log(sub)

    // // For development and testing
    // const sub = {
    //   _id: "6080dbc105b64d15d3f3434"
    // }

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
  // 1. Delete from Yggio channels (with iot ID or subscription ID?)
  try {    
    const { user } = req.session
    const { subid } = req.query
    const url = common.YGGIO_API_URL + "/api/channels/" + subid
    const token = "085cba70-1e33-4fff-a185-69865f564e2c" // FOR DEV, change each time logged in
   // const token = user.AccessToken

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error.response.data);
    })

    // 2. Delete from Ysocial database
    await Node.deleteMany({subscriptionId: subid, owner: user._id})

    return res.status(200).send()
  } catch (error) {
    res.sendStatus(404).send()
  }
  

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

// Exports.
module.exports = {
  subscribe,
  unsubscribe,
  getSubscriptions
}
