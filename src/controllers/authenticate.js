/**   
* Authenticate controller.
*
* @author
* @version 1.0.0
*/

const createError = require('http-errors')
const fetch = require('node-fetch')

/**
 * Authenticates a user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports = (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.send('Add username and password in body as JSON')
            res.status(404)
            return
        }
    
        const body = {
            username: req.body.username,
            password: req.body.password
        }
    
        fetch('https://api.ygg.io/auth/local', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => res.send(json))
     
        req.body.token = res.req.headers.bearer

        res.status(201)
    } catch (error) {
        // If authentication fails
        const err = createError(401)
        err.innerException = errors
        next(err)
    }
}