const perform = (z, bundle) => {
  return [bundle.cleanedRequest];
};

module.exports = {
  operation: {
    perform: perform,
    type: 'hook',
    performSubscribe: {
      url: '{{process.env.BACKEND_URL}}/api/zapier',
      method: 'POST',
      params: { api_key: '{{bundle.authData.api_key}}' },
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-KEY': '{{bundle.authData.api_key}}',
      },
      body: {
        hookUrl: '{{bundle.targetUrl}}',
        userApiKey: '{{bundle.authData.api_key}}',
        yggioDeviceId: '{{bundle.inputData.device}}',
      },
      removeMissingValuesFrom: {},
    },
    performUnsubscribe: {
      url: '{{process.env.BACKEND_URL}}/api/zapier',
      method: 'DELETE',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: {
        hookUrl: '{{bundle.targetUrl}}',
        userApiKey: '{{bundle.authData.api_key}}',
        yggioDeviceId: '{{bundle.inputData.device}}',
      },
      removeMissingValuesFrom: {},
    },
    sample: { id: '12345abcd', name: 'Cool IoT Thermometer' },
    outputFields: [
      { key: 'id', label: 'Yggio ID' },
      { key: 'name', label: 'Name' },
    ],
    inputFields: [
      {
        key: 'device',
        type: 'string',
        dynamic: 'fetch_devices.yggioId.name',
        label: 'Device',
        helpText:
          'Which of your subscriced devices do you want to use in this Zap?',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    performList: {
      url: '{{process.env.BACKEND_URL}}/api/zapier/device',
      method: 'GET',
      params: {
        userApiKey: '{{bundle.authData.api_key}}',
        yggioDeviceId: '{{bundle.inputData.device}}',
      },
      headers: { Accept: 'application/json' },
      body: {},
      removeMissingValuesFrom: {},
    },
  },
  key: 'new_data',
  noun: 'Sensor Data',
  display: {
    label: 'Sensor data received from Yggio',
    description:
      'Triggers when data from an IoT device connected to Yggio is pushed to Zapier.',
    directions:
      'You must first activate and enable a sensor in our dashboard before it will send any data.',
    hidden: false,
    important: true,
  },
};
