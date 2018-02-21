const deepmerge = require('deepmerge');

const settingsUndefined = () => {
  throw new Error('All required secrets are not defined');
};

const baseConfig = {
  connections: {
    sylInterface: {
      url: 'http://invalidurl',
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
  memory: {
    conn: {
      url: process.env.SYL_MEMORY_CONN_URL || settingsUndefined(),
      auth: {
        user: process.env.SYL_MEMORY_CONN_USER || settingsUndefined(),
        password: process.env.SYL_MEMORY_CONN_PWORD || settingsUndefined(),
      },
    },
    db: 'main-memory',
    collections: {
      people: 'people', // People who have interacted with Syl.
    },
  },
  wit: {
    token: process.env.SYL_WIT_TOKEN || settingsUndefined(),
  },
  jobs: {
    sensoryInputProcessor: {
      pollingInterval: 2000,
    },
  },
};

const configExtensions = {
  DEV: {
    connections: {
      sylInterface: {
        url: `http://localhost:${process.env.SYL_PORT}`,
      },
    },
  },
  PROD: {
    connections: {
      sylInterface: {
        url: 'https://sylphrena.azurewebsites.net',
      },
    },
  },
};

const buildConfig = () => {
  const environment = process.env.SYL_ENV || 'DEV';

  const configExt = configExtensions[environment];

  if (!configExt) {
    throw new Error('Invalid environemnt');
  }

  return deepmerge(baseConfig, configExt);
};

module.exports = buildConfig();
