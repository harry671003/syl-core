const greet = require('./greet');

const intents = baseRequire('/jobs/common/intent-parser/intents');

const actions = {};

actions[intents.GREETING] = greet;

module.exports = actions;
