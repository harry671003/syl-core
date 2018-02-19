const bluebird = require('bluebird');
const MessageProcessor = require('./message-processor');

const ErrorHandler = baseRequire('/jobs/common/error-handler');
const Queue = baseRequire('/jobs/common/storage/queue');
const actions = baseRequire('/jobs/common/actions');
const IntentParser = baseRequire('/jobs/common/intent-parser');
const SylConnector = baseRequire('/jobs/common/services/syl-connector');

const listenToQueue = async (queue, processor) => {
  const messages = await queue.getMessages();
  console.info(`[+] Found ${messages.length} messages.`);
  bluebird.map(messages, async (m) => {
    await processor.processMessage(m);
    await queue.deleteMessage(m);
  });
};

const run = async (config) => {
  const errorHandler = new ErrorHandler();
  process.on('uncaughtException', errorHandler.handleError);

  const intentParser = new IntentParser(config.wit.token);
  const sylConnector = new SylConnector(
    config.connections.sylInterface.url,
    config.connections.sylInterface.token,
  );
  const messageProcessor = new MessageProcessor(
    intentParser,
    actions,
    sylConnector,
  );

  const queue = new Queue(
    config.brain.connStr,
    config.brain.sensoryInputQueue.name,
  );

  await queue.initialize();

  setInterval(
    async () => {
      await listenToQueue(queue, messageProcessor);
    },
    config.jobs.sensoryInputProcessor.pollingInterval,
  );
};

module.exports = {
  run,
};
