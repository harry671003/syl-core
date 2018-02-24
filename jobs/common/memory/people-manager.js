const personSchema = baseRequire('/jobs/common/schemas/person-schema');

function PeopleManager(db, peopleCollection) {
  this.db = db;
  this.collection = peopleCollection;
}

PeopleManager.prototype.addNewPerson = async function addNewPerson(person) {
  const { error } = personSchema.validate(person);
  if (error) {
    // Validation failed
    throw error;
  }

  return this.db
    .collection(this.collection)
    .insertOne(person);
};

PeopleManager.prototype.getPersonById = async function getPersonById(personId) {
  return this.db
    .collection(this.collection)
    .findOne({
      personId,
    });
};

module.exports = PeopleManager;
