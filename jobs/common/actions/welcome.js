const welcomeMessage =
`Hi {firstName},
Nice to meet you. My name is Sylphrena. Technically I'm a bot, though I have the personality of a spren.
Tell me about yourself.
`;

const welcome = async () => {
  const response = {
    type: 'text',
    value: welcomeMessage,
  };

  return response;
};

module.exports = welcome;
