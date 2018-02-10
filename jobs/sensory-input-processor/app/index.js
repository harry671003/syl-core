const MessageProcessor = require('./message-processor');

const ErrorHandler = baseRequire('/jobs/common/error-handler');
const Queue = baseRequire('/jobs/common/storage/queue');

const run = (config) => {
  const errorHandler = new ErrorHandler();
  process.on('uncaughtException', errorHandler.handleError);

  const messageProcessor = new MessageProcessor(config);

  const queue = new Queue(
    config.brain.connStr,
    config.brain.sensoryInputQueue.name,
  );

  queue.initialize(() => {
    queue.listen(
      messageProcessor,
      config.jobs.sensoryInputProcessor.pollingInterval,
    );
  });
};

module.exports = {
  run,
};
