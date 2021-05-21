'use strict'

const axios = require('axios')

const Node = require('../../../models/Node')

const {
  provider,
  routes: { getChannels }
} = require('yggio-connect')

const { subscription } = require('../../../config')

/**
 * Subscribe to a device.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const subscribe = async (req, res, next) => {
  try {
    const { user } = req.session
    const { name, displayName: rawDisplayName, nodeId, protocol, dataPaths } = req.body

    // where we want yggio to send updates
    const protocolData = { url: `${process.env.BACKEND_URI}/api/updates/${nodeId}` }
    // just a name for the subscription, probably not important
    const subscriptionName = `${nodeId}/${user._id}`

    // create the sub at Yggio
    // TODO: fix to get correct return values // ??? 
    // NOTE: This route seems to be idempotent, it wont create extra subscriptions if the input is the same, we thus dont have to check if one already exists.
    const sub = await provider.subscribe(user, nodeId, protocol, protocolData, subscriptionName)

    const displayName = rawDisplayName ?? name

    const newNode = await Node.findOneAndUpdate({ owner: user._id, yggioId: nodeId }, {
      yggioId: nodeId,
      name: name,
      displayName: displayName,
      subscriptionId: sub._id,
      owner: user._id, // TODO: not same as in db // this user._id is yggioId in User schema
      dataValues: dataPaths,
      minInterval: undefined, // TODO: add from frontend later
      maxInterval: undefined // TODO: add from frontend later
    }, { new: true, upsert: true })

    return res.status(200).send()
  } catch (e) {
    return res.status(400).send()
  }
}

/**
 * Unsubscribe a device.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const unsubscribe = async (req, res, next) => {
  // 1. Delete from Yggio channels (with iot ID or subscription ID?)
  try {
    const { nodeId } = req.params
    const { user } = req.session

    const node = await Node.findOne({ owner: user._id, yggioId: nodeId })


    // // Remove channel from Yggio
    // // TODO: this fails due to permissions @ Yggio - intended?
    // // IMPORTANT NOTE: If this is enabled to work in the future, subscriptions must be changed to be 'per user and device' and not just 'per device' - 
    // // we dont want one user unsubscribing causing all subscriptions to that device (from other users) to also be removed
    // const url = process.env.YGGIO_API_URL + '/api/channels/' + node.subscriptionId
    // try {
    //   const response = await axios.delete(url, {
    //     auth: { bearer: user.accessToken }
    //   })
    //   console.log(response.body)
    // } catch (e) {
    //   console.log(e.message)
    // }

    // 2. Delete from Ysocial database
    await Node.findByIdAndDelete(node._id)

    return res.status(200).send()
  } catch (error) {
    return res.sendStatus(400).send()
  }
}

/**
 * Get subscription of user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const getSubscriptions = async (req, res, next) => {
  try {
    const { user } = req.session
    const sub = await Node.findOne({ owner: user._id, yggioId: req.query.iotnode })

    if (sub) {
      return res.json({ subscribed: true, data: sub })
    } else {
      return res.json({ subscribed: false })
    }
  } catch (e) {
    return res.status(400).send()
  }
}

// Exports.
module.exports = {
  subscribe,
  unsubscribe,
  getSubscriptions
}
