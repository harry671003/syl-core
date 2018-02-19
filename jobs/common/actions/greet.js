const salutations = ['Hi', 'Hey', 'Hey {name}', 'Hey, wassup??'];

const greet = async (intent) => {
  if (!intent) {
    throw new Error('`intent` is required');
  }

  return salutations[Math.floor(Math.random() * salutations.length)];
};

module.exports = greet;
