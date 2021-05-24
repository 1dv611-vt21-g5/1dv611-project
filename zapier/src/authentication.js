module.exports = {
  type: 'custom',
  test: {
    url: '{{process.env.BACKEND_URL}}/api/auth/apikey',
    method: 'GET',
    params: { key: '{{bundle.authData.api_key}}' },
    headers: { 'X-API-KEY': '{{bundle.authData.api_key}}' },
    body: {},
    removeMissingValuesFrom: {},
  },
  fields: [
    {
      computed: false,
      key: 'api_key',
      required: true,
      label: 'Yggio-to-Zapier API Key',
      type: 'password',
      helpText: 'Can be found when logged in to Yggio-to-Zapier.',
    },
  ],
  customConfig: {},
  connectionLabel: '{{bundle.inputData.username}}',
};
