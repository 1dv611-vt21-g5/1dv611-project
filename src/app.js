/**   
* The starting point of the application.
*
* @author
* @version 1.0.0
*/

const express = require('express')
const logger = require('morgan')
const router = require('./router/mainRouter.js')
const port = process.env.PORT || 5000

// Express setup
const app = express()

// Set up a morgan logger using the dev format for log entries
app.use(logger('dev'))

// Parse requests of the content type application/json
app.use(express.json())

// Register routes
app.use('/', router)

  // Error handler
app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }
    
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

app.listen(port, () => {
  console.log('Server is running on port ' + port)
})