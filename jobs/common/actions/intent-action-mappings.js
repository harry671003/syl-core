const greet = require('./greet');
const welcome = require('./welcome');

const intents = baseRequire('/jobs/common/intent-parser/intents');

const actions = {};

actions[intents.GREETING] = greet;
actions[intents.FIRST_USE] = welcome;

module.exports = actions;
