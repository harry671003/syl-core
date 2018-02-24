const intentActionMappings = require('./intent-action-mappings');

const execute = async (intent) => {
  const action = intentActionMappings[intent.value];

  if (action) {
    return action(intent);
  }

  return {
    type: 'text',
    value: 'Sorry, I didn\'t understand.',
  };
};

module.exports = {
  execute,
};
