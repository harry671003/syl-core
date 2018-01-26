const settingsUndefined = () => {
  throw new Error('All required secrets are not defined');
};

module.exports = {
  connections: {
    sylInterface: {
      url: 'http://url',
      token: process.env.SYL_SEND_WEBHOOK_TOKEN || settingsUndefined(),
    },
  },
  appInsights: {
    key: process.env.SYL_APPINSIGHTS_KEY || settingsUndefined(),
  },
  brain: { // azure storage account
    connStr: process.env.SYL_BRAIN_CONN || settingsUndefined(),
    sensoryInputQueue: {
      name: 'sensory-inputs',
    },
  },
  jobs: {
    sensoryInputProcessor: {
      pollingInterval: 5000,
    },
  },
};
