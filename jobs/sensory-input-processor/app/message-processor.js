const axios = require('axios');

function MessageProcessor(config) {
  this.serviceUrl = config.connections.sylInterface.url;
  this.serviceToken = config.connections.sylInterface.token;
}

MessageProcessor.prototype.processMessage = function processMessage(err, msg, completeFn) {
  if (err) {
    throw err;
  }

  const input = JSON.parse(msg.messageText);

  axios.post(`${this.serviceUrl}/connectors/send?token=${this.serviceToken}`, {
    target: input.source,
    body: {
      chat_id: input.body.message.chat.id,
      text: input.body.message.text,
    },
  }).then((response) => {
    console.log(response.data);
    completeFn();
  }).catch((error) => {
    throw error;
  });
};

module.exports = MessageProcessor;
