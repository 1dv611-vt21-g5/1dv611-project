'use strict'

const User = require('../../../models/User')

const {
  provider: {
    getDetails,
    redeemCode
  }
} = require('yggio-connect')

const { yggio: { provider: { redirectUris } } } = require('../../../config')

// const { updateUser } = require('../../../components/db')

// Get your providerDetails from yggio after registering your
// service in Yggio (in this example that is already done in src/index.js)
const info = (req, res) => {
  const clientId = getDetails().provider.client_id

  return res.json({
    redirectUris,
    clientId
  })
}

// Send code to oauthCode route, along with redirectUri
// Receive accessToken and refreshToken, destroy the session
// and regenerate a new one along with the fresh user
// Remove accessToken and refreshToken before sending it back
// uncomment updateUser and its associated function to save the user
// to json in /db/users.json

const code = async (req, res, next) => {
  try {
    const redirectUri = redirectUris[req.query.redirect_uri]
    const freshUser = await redeemCode(req.query.code, redirectUri)
    // updateUser(freshUser);
    // console.log(freshUser)

    // creates new user if none exists
    const user = await User.findOneAndUpdate({ username: freshUser.username }, {
      username: freshUser.username,
      yggioId: freshUser._id,
      yggioAccessToken: freshUser.accessToken,
      yggioRefreshToken: freshUser.refreshToken,
      yggioExpiresAt: freshUser.expiresAt
    }, {
      upsert: true,
      setDefaultsOnInsert: true
    })

    await user.save() // kanske?

    return req.sessionStore.regenerate(req, regenErr => {
      if (regenErr) return next(regenErr)

      req.session.user = freshUser
      const resUser = unsetProps(freshUser)

      return res.json(resUser)
    })

    // return req.session.destroy(destroyErr => {
    //   if (destroyErr) return next(destroyErr)
    //   })
    } catch (e) {
       next(e)
     }
}

// used by Zapier to confirm that a new user is valid
const testApiKey = async (req, res, next) => {
  try {
    const userApiKey = req.query.key || req.header('X-API-KEY')

    const user = await User.findOne({ api_key_zapier: userApiKey })

    if (user) {
      return res.json(user)
    } else {
      return res.status(401).send({ message: 'Invalid/No API key.' })
    }
  } catch (e) {
    res.status(401).send({ message: 'Invalid/No API key.' })
  }
}

// create a copy of freshUser and format, removing access/refreshToken
const unsetProps = user => {
  const resUser = Object.assign({}, user)
  delete resUser.accessToken
  delete resUser.refreshToken
  delete resUser.expiresAt
  return resUser
}

// Exports.
module.exports = {
  code,
  info,
  testApiKey
}
