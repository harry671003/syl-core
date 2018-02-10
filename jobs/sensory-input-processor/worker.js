const appRootPath = require('app-root-path');

global.baseRequire = appRootPath.require;

const app = require('./app');

const config = baseRequire('/config');

app.run(config);
