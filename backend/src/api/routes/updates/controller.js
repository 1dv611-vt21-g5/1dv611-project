'use strict'

const axios = require('axios')

const Node = require('../../../models/Node')
const User = require('../../../models/User')
const ZapierHook = require('../../../models/ZapierHook')

const { routes: { getNode } } = require('yggio-connect')

const receiveData = async (req, res, next) => {
  try {
    // 0. Check who sent the request. Comprade req.params with req.body?

    // 1. request comes in, we grab yggio device id
    const { deviceId } = req.params

    // 2. we find all Nodes with this id
    const nodes = await Node.find({ yggioId: deviceId })

    // 4 alt. Grab the data from the update itself
    // const { diff, event } = req.body
    // console.log(diff, event)

    // 3. Iterate through all found nodes
    await Promise.all(nodes.map(async (node) => {
      // 4a. Grab the users info from db and use that to authenticate a device request
      // NOTE: A user needs to be logged in for this to work, so maybe we need to remove the logout button
      const {
        username,
        yggioAccessToken: accessToken,
        yggioRefreshToken: refreshToken,
        yggioExpiresAt: expiresAt } = await User.findOne({ yggioId: node.owner })

      // 4b. Fetch the latest device data from Yggio
      const deviceData = await getNode({
        username,
        accessToken,
        refreshToken,
        expiresAt
      }, deviceId)

      console.log(deviceData)

      // 5. Parse data - See comment in models/Node for what this is doing
      console.log('trying to parse')
      const data = {}

      node.dataValues.forEach((value, key) => { // JS Maps verkar ha key och value bakofram??
        data[key] = getNestedValue(deviceData, value.path)
      })

      console.log('final data log', data)

      // 6. Send it to Zapier
      const zapierHook = await ZapierHook.findOne({owner: node.owner})
      // const zapierHook = await ZapierHook.find({owner: node.owner}) // Many possible webhooks?
      console.log(zapierHook.target_url)

      await axios.post(zapierHook.target_url, {
        deviceName: node.name,
        data
      })
    }))

    // Everything worked
    return res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

/**
 * Iterates through a nested object step-by-step to return a value
 *
 * @param {*} object - A nested object to parse, f.e. { a: { b: { c: 25 }}}
 * @param {*} pathsArray - An array of field names to step through, f.e. ['a', 'b', 'c']
 * @returns - The value of the final key in pathsArray, f.e. 25
 */
const getNestedValue = (object, pathsArray) => {
  if (pathsArray.length === 1) {
    return object[pathsArray[0]]
  }

  const innerObject = object[pathsArray[0]]
  const innerArray = [...pathsArray.slice(1)] // returns prev array with first item removed
  return getNestedValue(innerObject, innerArray)
}

// Exports.
module.exports = {
  receiveData,
  getNestedValue
}
