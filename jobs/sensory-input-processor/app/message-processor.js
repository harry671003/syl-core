const axios = require('axios');

function MessageProcessor(config) {
  this.serviceUrl = config.connections.sylInterface.url;
  this.serviceToken = config.connections.sylInterface.token;
}

MessageProcessor.prototype.processMessage = async function processMessage(message) {
  const input = JSON.parse(message.messageText);

  await axios.post(
    `${this.serviceUrl}/connectors/send?token=${this.serviceToken}`,
    {
      target: input.source,
      body: {
        chat_id: input.body.message.chat.id,
        text: input.body.message.text,
      },
    },
  );
};

module.exports = MessageProcessor;
