const createUserModel = (db) => {
    return {
        async findOne() {
            const queryResult = await db.query('SELECT * FROM users LIMIT 1;');

            return queryResult.rows[0];
        },

        async create(user) {
            const queryResult = await db.query(`INSERT INTO users(username) VALUES ($1) RETURNING *`, [user.username]);

            return queryResult.rows[0];
        },
    };
};

module.exports = createUserModel;
