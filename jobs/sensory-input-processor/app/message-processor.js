const convSchema = baseRequire('/jobs/common/schemas/conv-schema');

function MessageProcessor(intentParser, actions, sylConnector) {
  this.intentParser = intentParser;
  this.actions = actions;
  this.sylConnector = sylConnector;
}

MessageProcessor.prototype.processMessage = async function processMessage(message) {
  const sensoryInput = JSON.parse(message.messageText);

  const { error } = convSchema.validate(sensoryInput);
  if (error) {
    // Validation failed
    throw error;
  }

  // Step1: Identify the intent.
  const intent = await this.intentParser.parse(sensoryInput.content.value);

  // Step2: Execute the action for the intent.
  const responseText = await this.actions.execute(intent);

  // Step3: Respond with the response for the action.
  await this.sylConnector.sendMessage({
    content: {
      type: 'text', // TODO: serve more types in future.
      value: responseText,
    },
    source: {
      client: sensoryInput.source.client,
      person: sensoryInput.source.person,
    },
    sourceInput: sensoryInput.sourceInput,
  });
};

module.exports = MessageProcessor;
