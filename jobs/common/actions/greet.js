const salutations = [
  'Hi',
  'Hey',
  'Hey {firstName}',
  'Hello',
  'Yo!',
  'Yes Boss!',
  'Hi, how can I help you?',
];

const greet = async (intent) => {
  if (!intent) {
    throw new Error('`intent` is required');
  }

  return {
    type: 'text',
    value: salutations[Math.floor(Math.random() * salutations.length)],
  };
};

module.exports = greet;
