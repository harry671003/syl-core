const witFactory = require('./wit-factory');
const Intents = require('./intents');
const Entities = require('./entities');

const filterByConfidenceMargin = (input) => {
  const highConfidenceMargin = 0.75;
  const entitiesWithHighConfidence = [];

  input.sort((entity1, entity2) => {
    if (entity1.value.confidence > entity2.value.confidence) return 1;

    if (entity1.value.confidence < entity2.value.confidence) return -1;

    return 0;
  });

  for (let i = 0; i < input.length; i += 1) {
    if (input[i].value.confidence >= highConfidenceMargin) {
      entitiesWithHighConfidence.push(input[i]);
    }
  }

  return entitiesWithHighConfidence;
};

const identifyIntent = (response) => {
  const entities = Object.entries(response.entities);

  const possibleIntents = [];
  const possibleEntities = [];

  for (let i = 0; i < entities.length; i += 1) {
    const entity = entities[i];

    const entityName = entity[0];
    const entityValue = entity[1][0];

    if (entityValue.type === 'value') {
      // An entity
      const knownEntities = Object.keys(Entities);
      let found = false;

      for (let j = 0; j < knownEntities.length; j += 1) {
        const knownEntityName = Entities[knownEntities[i]];
        if (knownEntityName === entityName) {
          found = true;
          break;
        }
      }

      if (found) {
        possibleEntities.push({
          name: entityName,
          value: entityValue,
        });
      }
    } else {
      // An intent

      const knownIntents = Object.keys(Intents);
      let found = false;

      for (let j = 0; j < knownIntents.length; j += 1) {
        const knownIntentName = Intents[knownIntents[j]];
        if (knownIntentName === entityName) {
          found = true;
          break;
        }
      }

      if (found) {
        possibleIntents.push({
          name: entityName,
          value: entityValue,
        });
      }
    }
  }

  const intentsWithHighConfidence = filterByConfidenceMargin(possibleIntents);
  const entitiesWithHighConfidence = filterByConfidenceMargin(possibleEntities);

  return {
    value: intentsWithHighConfidence.length ? intentsWithHighConfidence[0].name : null,
    entities: entitiesWithHighConfidence,
  };
};

function IntentParser(token) {
  this.client = witFactory.createClient(token);
}

IntentParser.prototype.parse = async function parseIntent(text, context) {
  try {
    const response = await this.client.message(text, context);
    const intent = identifyIntent(response);
    return intent;
  } catch (err) {
    // TODO: Add logging code.
    return null;
  }
};

module.exports = IntentParser;
