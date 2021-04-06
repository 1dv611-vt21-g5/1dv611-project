'use strict';

const config = require('../config');

const apply = app => {
  // set up the session, required by OAuth2 framework
  // uncomment FileStore to and its associated sessionConfig if you
  // want to store the sessionStore visit https://www.npmjs.com/package/express-session
  // to see other supported data stores
  const session = require('express-session');

  const sessionConfig = config.session;
  // const FileStore = require('session-file-store')(session);
  // const sessionConfig = Object.assign({}, config.session, {
  //   store: new FileStore({
  //     path: config.session.path,
  //     logFn: function () {}
  //   })
  // });
  const sessionMiddleware = session(sessionConfig);

  // Logging for requests
  const morgan = require('morgan');
  app.use(morgan('dev'));

  // Enable cross origin requests, XXX WARNING! must be added before other routes
  const cors = require('cors');
  app.options('*', cors(config.cors));
  app.use(cors(config.cors));

  // Apply routes
  app.use('/api', sessionMiddleware, require('../api'));

  // Apply error handlers
  app.use((req, res, next) => {
    res.sendStatus(404);
  });
  app.use((err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }
    console.warn('Error handler, error message:', err.message);
    res.status(err.status || err.statusCode || 500).send({
      message: err.message
    });
  });
};

module.exports = {
  apply
};
