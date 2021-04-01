/**   
* Controller for getting iot nodes.
*
* @author
* @version 1.0.0
*/

const fetch = require('node-fetch')

/**
 * Fetch iot nodes if token in body.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
 module.exports = (req, res, next) => {
    try {
        if (!req.body.token) {
            res.status(400)
            res.send('Not authenticated')
            return
        }

        fetch('https://api.ygg.io/api/iotnodes', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + req.body.token 
            }
        })
        .then(res => res.json())
        // .then(json => console.log(json))
        .then(json => res.send(json))

        res.status(201)

    } catch (error) {
        next(error)
    }
}