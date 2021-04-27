const axios = require('axios')

const Node = require('../../../models/Node')
const User = require('../../../models/User')
const ZapierHook = require('../../../models/ZapierHook')

const { routes: { getNode } } = require('yggio-connect')

const receiveData = async (req, res, next) => {
  try {
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
      const { username,
        yggioAccessToken: accessToken,
        yggioRefreshToken: refreshToken,
        yggioExpiresAt: expiresAt } = await User.findById(node.owner)
      // 4b. Fetch the latest device data from Yggio
      const deviceData = await getNode({
        username,
        accessToken,
        refreshToken,
        expiresAt
      }, deviceId)

      // 5. Parse data - See comment in models/Node for what this is doing
      const data = {}
      for (const property in node.dataValues) {
        data[property] = getNestedValue(deviceData, property.path)
      }

      // 6. Send it to Zapier
      const zapierHook = await ZapierHook.find({ owner: node.owner })
      await axios.post(zapierHook.targetUrl, {
        deviceName: node.name,
        data
      })
    }))

    // 7. Tell yggio everything worked (maybe not needed)
    return res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

const getNestedValue = (object, pathsArray) => {
  if (pathsArray.length === 1) {
    return object[pathsArray[0]]
  }

  const innerObject = object[pathsArray[0]]
  const innerArray = [...pathsArray.slice(1)] // returns prev array with first item removed
  getNestedValue(innerObject, innerArray)
}


module.exports = {
  receiveData
}