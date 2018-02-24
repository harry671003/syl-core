const uuidv5 = require('uuid/v5');

const NAMESPACE = 'syl.harryjohn.io';

const newId = () => uuidv5(NAMESPACE, uuidv5.DNS);

module.exports = {
  newId,
};
