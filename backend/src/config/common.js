'use strict'

// The host of yggio-service-example backend
// Will be localhost if backend is run locally
const BACKEND_HOST = 'localhost'

// The port used by the yggio-service-example backend
// Should be the same as in frontend/src/constants/index.js
// Set to 9999 as default
const BACKEND_PORT = '9999'

const BACKEND_URI = 'localhost:9999'

// The URL to the yggio-service-example frontend
// Will be http://localhost if frontend is run locally
const FRONTEND_URL = 'http://localhost'

// The port used by the yggio-service-example frontend
// Should be the same as in frontend/.env
// Set to 9492 as default
const FRONTEND_PORT = '3000'

// The URL of the REST API of the Yggio you want to use
// Should be the same as in frontend/src/constants/index.js
// https://api.yggio-sandbox.sensative.net is a suitable test server and is set as default
const YGGIO_API_URL = 'https://api.yggio-beta.sensative.net'

// The name of the provider that is created
// Can be set to anything
const PROVIDER_NAME = 'Studentprojekt - Zapierintegration'

// Username of the user that creates the provider
// Can be set to anything
const YGGIO_ACCOUNT_USERNAME = 'ak222ye@student.lnu.se'

// Password of the user that creates the provider
// Can be set to anything
const YGGIO_ACCOUNT_PASSWORD = 'studentprojekt'

// Connection string to MongoDB
const DB_CONNECTION_STRING = 'mongodb+srv://dbUser:studentprojekt@cluster0.oyqrg.mongodb.net/ZapierIntegrations?retryWrites=true&w=majority'

module.exports = {
  BACKEND_HOST,
  BACKEND_PORT,
  BACKEND_URI,
  FRONTEND_URL,
  FRONTEND_PORT,
  YGGIO_API_URL,
  PROVIDER_NAME,
  YGGIO_ACCOUNT_USERNAME,
  YGGIO_ACCOUNT_PASSWORD,
  DB_CONNECTION_STRING
}
