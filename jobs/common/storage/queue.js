const azureStorage = require('azure-storage');
const bluebird = require('bluebird');

bluebird.promisifyAll(azureStorage.QueueService.prototype);

function Queue(connectionString, queueName) {
  // Queue Interface.
  this.queueSvc = azureStorage.createQueueService(connectionString);
  this.queueName = queueName;
}

Queue.prototype.initialize = async function init() {
  await this.queueSvc.createQueueIfNotExistsAsync(this.queueName);
};

Queue.prototype.getMessages = async function getMessages() {
  return this.queueSvc.getMessagesAsync(
    this.queueName,
    {
      numOfMessages: 10,
    },
  );
};

Queue.prototype.deleteMessage = async function deleteMessage(message) {
  return this.queueSvc.deleteMessageAsync(
    this.queueName,
    message.messageId,
    message.popReceipt,
  );
};

module.exports = Queue;
