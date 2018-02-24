const axios = require('axios');

const convSchema = baseRequire('/jobs/common/schemas/conv-schema');

function SylConnector(url, token) {
  this.serviceUrl = url;
  this.serviceToken = token;
}

SylConnector.prototype.sendMessage = async function sendMessage(message) {
  const { error } = convSchema.validate(message);
  if (error) {
    // Validation failed
    throw error;
  }

  return axios.post(
    `${this.serviceUrl}/connectors/send?token=${this.serviceToken}`,
    message,
  );
};

module.exports = SylConnector;
