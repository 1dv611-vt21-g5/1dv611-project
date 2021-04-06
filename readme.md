# Yggio Service Example

This is a small example program that showcases a simple application that uses Yggio.

It consists of a backend and a frontend. Both require [Node.js](https://nodejs.org/) to be run.

The backend uses the npm package [yggio-connect](https://www.npmjs.com/package/yggio-connect).

The application does the following:

1. Creates a provider
2. Creates two example users
3. Creates two example iotnodes
4. Allows the user to login with OAuth
5. Lists the iotnodes
6. Allow the user to subscribe to an iotnode (i.e. create a channel)
7. Logs received iotnode subscription messages

Note that in order for the app to receive iotnode subscription messages, the app must be exposed to the Internet with a public IP address.

## Configurations

Before running the app, configurations has to be made. The provided default values can be used but `PROVIDER_NAME`, `YGGIO_ACCOUNT_USERNAME` and `YGGIO_ACCOUNT_PASSWORD` need to be set.

The backend is configured in `backend/src/config/common.js`:

```js
// The host of yggio-service-example backend
// Will be localhost if backend is run locally
const BACKEND_HOST = 'localhost';

// The port used by the yggio-service-example backend
// Should be the same as in frontend/src/constants/index.js
const BACKEND_PORT = '9999';

// The URL to the yggio-service-example frontend
// Will be http://localhost if frontend is run locally
const FRONTEND_URL = 'http://localhost';

// The port used by the yggio-service-example frontend
// Should be the same as in frontend/.env
const FRONTEND_PORT = '9492';

// The URL of the REST API of the Yggio you want to use
// Should be the same as in frontend/src/constants/index.js
// https://api.yggio-sandbox.sensative.net is a suitable test server and is set as default
const YGGIO_API_URL = 'https://api.yggio-sandbox.sensative.net';

// The name of the provider that is created
// Can be set to anything
const PROVIDER_NAME = '';

// Username of the user that creates the provider
// Can be set to anything
const YGGIO_ACCOUNT_USERNAME = '';

// Password of the user that creates the provider
// Can be set to anything
const YGGIO_ACCOUNT_PASSWORD = '';
```

The frontend is configured in `frontend/src/constants/index.js`:

```js
export const statStr = {
  backendHost: 'http://localhost:9999',
  portalHost: 'https://portal.yggio-sandbox.sensative.net'
};
```

## Running the app

The backend and the frontend requires one terminal instance each. The backend should be started before the frontend.

To start the backend open a new terminal window and run:

```sh
cd backend/
npm install
npm start
```

To start the frontend open a new terminal window and run:

```sh
cd frontend/
npm install
npm start
```

## Using the app

The frontend can be viewed in a browser at the configured address, defaulted to http://localhost:9492/.

To login in with OAuth, use the credientals of the first test user, which is `testuser1` as username and `password` as password.
