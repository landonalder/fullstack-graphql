const createPetModel = require('./pet');
const createUserModel = require('./user');
const createToyModel = require('./toy');
const { Client } = require('pg');

const db = new Client({
    connectionString: 'postgresql://postgres:password@localhost:5432/postgres',
});

db.connect().then(() => {
    console.log('Connected to DB!');
});

module.exports = {
    models: {
        Pet: createPetModel(db),
        Toy: createToyModel(db),
        User: createUserModel(db),
    },
    db,
};
