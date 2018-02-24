const convSchema = baseRequire('/jobs/common/schemas/conv-schema');
const intents = baseRequire('/jobs/common/intent-parser/intents');

function MessageProcessor(
  intentParser,
  actions,
  sylConnector,
  peopleManager,
) {
  this.intentParser = intentParser;
  this.actions = actions;
  this.sylConnector = sylConnector;
  this.peopleManager = peopleManager;
}

MessageProcessor.prototype.processMessage = async function processMessage(message) {
  const conv = JSON.parse(message.messageText);

  const { error } = convSchema.validate(conv);
  if (error) {
    // Validation failed
    throw error;
  }

  let intent = {};

  // Step0: Get or add person.
  const person = await this.peopleManager.getPersonById(conv.source.person.personId);

  if (!person) {
    const personToAdd = Object.assign({}, conv.source.person);
    await this.peopleManager.addNewPerson(personToAdd);
    intent.value = intents.FIRST_USE;
  } else {
    // Step1: Identify the intent.
    intent = await this.intentParser.parse(conv.content.value);
  }

  // Step2: Get context.
  const context = {
    person,
  };

  // Step3: Execute the action for the intent.
  const response = await this.actions.execute(intent, context);

  // Step4: Respond with the response for the action.
  await this.sylConnector.sendMessage({
    content: response,
    source: {
      client: conv.source.client,
      person: conv.source.person,
    },
    sourceInput: conv.sourceInput,
  });
};

module.exports = MessageProcessor;
