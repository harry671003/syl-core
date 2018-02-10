const azureStorage = require('azure-storage');

function Queue(connectionString, queueName) {
  // Queue Interface.
  this.queueSvc = azureStorage.createQueueService(connectionString);
  this.queueName = queueName;
}

Queue.prototype.initialize = function init(cb) {
  this.queueSvc.createQueueIfNotExists(
    this.queueName,
    cb,
  );
};

Queue.prototype.listen = function listen(messageProcessor, timeout) {
  setInterval(() => {
    console.log('[+] looking for messages..');
    this.queueSvc.getMessages(this.queueName, (err, messages) => {
      for (let i = 0; i < messages.length; i += 1) {
        const msg = messages[i];
        messageProcessor.processMessage(err, msg, () => {
          if (!err) {
            this.queueSvc.deleteMessage(
              this.queueName,
              msg.messageId,
              msg.popReceipt,
              () => {},
            );
          }
        });
      }
    });
  }, timeout);
};

module.exports = Queue;
