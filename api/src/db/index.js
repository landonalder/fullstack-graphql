const createPetModel = require('./pet');
const createUserModel = require('./user');
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
        User: createUserModel(db),
    },
    db,
};
