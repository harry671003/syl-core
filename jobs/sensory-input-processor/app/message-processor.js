function MessageProcessor(intentParser, actions, sylConnector) {
  this.intentParser = intentParser;
  this.actions = actions;
  this.sylConnector = sylConnector;
}

MessageProcessor.prototype.processMessage = async function processMessage(message) {
  const input = JSON.parse(message.messageText);

  // Step1: Identify the intent.
  const intent = await this.intentParser.parse(input.body.message.text);

  // Step2: Execute the action for the intent.
  const responseText = await this.actions.execute(intent);

  // Step3: Respond with the response for the action.
  await this.sylConnector.sendMessage({
    target: input.source,
    body: {
      chat_id: input.body.message.chat.id,
      text: responseText,
    },
  });
};

module.exports = MessageProcessor;
