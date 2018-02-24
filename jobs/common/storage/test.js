/* eslint-disable */
const appRootPath = require('app-root-path');

global.baseRequire = appRootPath.require;

const config = baseRequire('/config');
const PeopleManager = baseRequire('/jobs/common/memory/people-manager');
const dbConnector = require('./db-connector');


// const run = async function() {
//   const db = await dbConnector.connect(
//     config.memory.conn.url,
//     config.memory.db,
//     config.memory.conn.auth,
//   );
//   console.log('db', db);
//   const peopleManager = new PeopleManager(db, config.memory.collections.people);
//   const person = await peopleManager.addNewPerson({
//     id: 'harry',
//     name: 'name'
//   });
//   console.log(person);
// };

// run();

const personSchema = baseRequire('/jobs/common/schemas/person-schema');

const { error } = personSchema.validate({
  personId: '1',
  firstName: 'H',
  lastName: 'J',
  kind: 'human',
});

console.log(error);
