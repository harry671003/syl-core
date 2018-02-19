const { Wit, log } = require('node-wit');

const createClient = (token) => {
  const client = new Wit({
    accessToken: token,
    logger: new log.Logger(log.ERROR),
  });

  return client;
};

module.exports = {
  createClient,
};
