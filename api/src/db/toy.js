const format = require('pg-format');

const getWhereClauseFromFilter = (filter) =>
    Object.keys(filter)
        .map((key) => format('%I = %L', key, filter[key]))
        .join(' AND ');

const createToyModel = (db) => {
    return {
        async findMany(filter) {
            const queryResults = await db.query(
                `SELECT * FROM toy ${
                    filter ? `WHERE ${getWhereClauseFromFilter(filter)}` : ''
                } ORDER BY created_at DESC;`
            );

            return queryResults.rows;
        },
    };
};

module.exports = createToyModel;
