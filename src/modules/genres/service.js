const squel = require('squel');
const pool = require('../../common/pool');
const logger = require('../../common/logger');

exports.getById = async (params) => {
    try {
        const query = squel.select()
            .field('id')
            .field('name')
            .from('genre')
            .where('id = ?', params.genre_id);

        const preparedQuery = query.toParam(); 
        const [ rows ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (!rows || !rows.length) {
            return null;
        }

        return rows;
    } catch (error) {
        logger.error('cant execute query: ', error);
        throw error;
    }
}