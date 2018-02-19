const axios = require('axios');

function SylConnector(url, token) {
  this.serviceUrl = url;
  this.serviceToken = token;
}

SylConnector.prototype.sendMessage = async function sendMessage(message) {
  return axios.post(
    `${this.serviceUrl}/connectors/send?token=${this.serviceToken}`,
    message,
  );
};

module.exports = SylConnector;
