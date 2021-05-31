'use strict'

const axios = require('axios')

const Node = require('../../../models/Node')
const ZapierHook = require('../../../models/ZapierHook')


/**
 * Iterates through a nested object step-by-step to return a value
 *
 * @param {object} object A nested object to parse, f.e. `{ a: { b: { c: 25 }}}`
 * @param {string[]} pathsArray An array of field names to step through, f.e. `['a', 'b', 'c']`
 * @returns The value of the final key in pathsArray, f.e. `25`
 */
const getNestedValue = (object, pathsArray) => {
  if (pathsArray.length === 1) {
    return object[pathsArray[0]]
  }
  const innerObject = object[pathsArray[0]]
  const innerArray = [...pathsArray.slice(1)] // returns prev array with first item removed
  return getNestedValue(innerObject, innerArray)
}

/**
 * Get incoming updates from Yggio, process and send to Zapier.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object}
 */
const receiveData = async (req, res, next) => {
  try {
    // 0. Grab checksum from Yggio request
    const { checksum } = req.query

    // 1. request comes in, we grab yggio device id
    const { deviceId } = req.params

    //1b. We check that there are actual Zaps using this device before doing more processing
    const zapsExist = await ZapierHook.findOne({ deviceId: deviceId })

    if (!zapsExist) {
      return res.status(200).send()
    }

    // 1c. Throttle if too many requests
    if (zapsExist?.lastSend) {
      // get the miliseconds since epoch for both the last transmit to Zapier and the time now
      const latest = new Date(zapsExist.lastSend).getTime()
      const now = new Date().getTime()

      // If less than 1000 ms have passed, discard the request with status 429 'Too Many Requests'
      if (now - latest <= 1000) {
        return res.status(429).set('Retry-After', '1').send()
      }
    }

    // 2. we find all Nodes with this id (as each user can have their own settings) and checksum
    const nodes = await Node.find({ yggioId: deviceId, checksum: checksum })

    if (nodes.length >= 1) {
      console.log('Update received, checksum OK')
      // 3. We grab the updated device data from the request
      const updatedDevice = req.body.payload.iotnode

      matchNewDataWithNode(nodes, updatedDevice)
      return res.status(200).send()
    } else {
      console.log('Update received but checksum wrong/not included')
      return res.status(400).send()
    }
  } catch (e) {
    console.log(e)
    return res.status(400).send()
  }
}

/**
 * Iterates through a all node objects
 *
 * @param {object[]} nodes An array of node objects
 * @param {string} deviceId ID of node device from request
 * @returns {void}
 */
const matchNewDataWithNode = async (nodes, data) => {
  // 4. Iterate through all found nodes and parse them according to the saved Node schema

  // We dont want to stop processing if there is an error with some Node, so we use allSettled here
  const nodeSends = await Promise.allSettled(nodes.map(async (node) => {
    // id and name added to allow for differentiation in Zapier
    const update = {
      id: node.yggioId,
      name: node.displayName,
      data: {}
    }

    node.dataValues.forEach((dataValue, index) => {
      update.data[`${dataValue.name}-${index}`] = { displayName: dataValue.displayName, value: getNestedValue(data, dataValue.path) }
    })

    sendToZapier(node, update)
  }))

  const errors = nodeSends.filter(send => send.status === 'rejected')

  if (errors.length >= 1) {
    console.log('Unable to parse all Node objects:')
    errors.forEach(error => {
      console.log(`Error when parsing Node: ${error.value}`)
    })
  }
}

/**
 * Gets zapier hook and sends to Zapier, saves the timestamp of this transmission on the Node
 *
 * @param {object} node The node device 
 * @param {object} data New data to send to Zapier
 * @returns {void}
 */
const sendToZapier = async (node, data) => {
  const zapierHooks = await ZapierHook.find({ owner: node.owner, deviceId: node.yggioId })

  const zapierSends = await Promise.allSettled(zapierHooks.map(async (hook) => {
    await axios.post(hook.target_url, data)

    // update the hooks with the current timestamp
    hook.lastSend = new Date().toISOString()
    await hook.save()
  }))

  const errors = zapierSends.filter(send => send.status === 'rejected')

  if (errors.length >= 1) {
    console.log('Unable to transmit to all found Zapier Webhooks:')
    errors.forEach(error => {
      console.log(`Error when transmitting Zapier webhook: ${error.reason}`)
    })
  }
}

// Exports.
module.exports = {
  receiveData,
  getNestedValue,
  matchNewDataWithNode,
  sendToZapier
}
