const authentication = require('./authentication');
const newDataTrigger = require('./triggers/new_data.js');
const fetchDevicesTrigger = require('./triggers/fetch_devices.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: {
    [newDataTrigger.key]: newDataTrigger,
    [fetchDevicesTrigger.key]: fetchDevicesTrigger,
  },
};
