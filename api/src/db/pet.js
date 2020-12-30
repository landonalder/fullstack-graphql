const getWhereClauseFromFilter = (filter) =>
    Object.keys(filter)
        .map((key) => `${key}=${filter[key]}`)
        .join(' AND ');

const createPetModel = (db) => {
    return {
        async findMany(filter) {
            const queryResults = await db.query(
                `SELECT * FROM pet ${filter ? `WHERE $1` : ''} ORDER BY created_at DESC;`,
                filter ? [getWhereClauseFromFilter(filter)] : []
            );

            return queryResults.rows;
        },

        async findOne(filter) {
            const queryResults = await db.query(
                `SELECT * FROM pet ${filter ? `WHERE $1` : ''} LIMIT 1;`,
                filter ? [getWhereClauseFromFilter(filter)] : []
            );

            return queryResults.rows[0];
        },

        async create(pet) {
            const queryResults = await db.query(
                `INSERT INTO pet(name, type, owner_id) VALUES ($1, $2, (SELECT id FROM users WHERE username = 'lalder')) RETURNING *;`,
                [pet.name, pet.type]
            );

            return queryResults.rows[0];
        },

        async delete(petId) {
            const queryResults = await db.query(`DELETE FROM pet WHERE id = $1 RETURNING id;`, [petId]);

            return queryResults.rows[0].id;
        },

        async update({ id, name, type }) {
            const queryResults = await db.query(`UPDATE pet SET name = $2, type = $3 WHERE id = $1 RETURNING *;`, [
                id,
                name,
                type,
            ]);

            return queryResults.rows[0];
        },
    };
};

module.exports = createPetModel;
