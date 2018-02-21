const MongoClient = require('mongodb').MongoClient;

const connect =  async function connect(url, dbName, auth) {
    const client =  await MongoClient.connect(url, {
      auth,
    });
    return client.db(dbName);
};

module.exports = {
  connect,
};
