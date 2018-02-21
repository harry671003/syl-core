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
  const personsMatched = await this.db(this.collection).find({
    personId
  });

  if (personsMatched.length == 0) {
    return null;
  }

  return personsMatched[0];
};

module.exports = PeopleManager;
