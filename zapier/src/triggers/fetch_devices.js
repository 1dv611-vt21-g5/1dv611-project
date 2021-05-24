const perform = (z, bundle) => {
  const options = {
    url: `${process.env.BACKEND_URL}/api/zapier/devices`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-API-KEY': bundle.authData.api_key,
    },
    params: {
      api_key: bundle.authData.api_key,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results.map(function (node) {
      const temp = node.name;
      node.name = node.displayName;
      node.rawName = temp;
      node.id = node._id;
      delete node._id;
      return node;
    });
  });
};

module.exports = {
  operation: {
    perform: perform,
    sample: {
      yggioId: '6000519e3f93fa0006b64583',
      name: 'lux_Comfort500_CS_EU Translated',
      subscriptionId: '609511e2ff2f0a00067503e0',
      owner: '6076b42ec054220006cebbff',
      dataValues: [
        {
          path: [],
          data: { path: ['value'], _id: '609519a9d51b69084c38bb3f' },
        },
      ],
      createdAt: '2021-05-07T10:42:49.435Z',
      updatedAt: '2021-05-07T10:42:49.435Z',
      __v: 0,
      id: '609519a9d51b69084c38bb3e',
    },
    outputFields: [
      { key: 'yggioId', label: 'Yggio ID' },
      { key: 'name', label: 'Name' },
      { key: 'rawName', label: 'Raw Name', type: 'string' },
    ],
  },
  key: 'fetch_devices',
  noun: 'Devices',
  display: {
    label: 'Get Subscribed Devices',
    description: 'Fetches a users subscribed devices',
    hidden: true,
    important: false,
  },
};
