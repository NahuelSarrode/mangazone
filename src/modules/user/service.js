const squel = require('squel');
const pool = require('../../common/pool');
const logger = require('../../common/logger');

exports.getAll = async () => {
    try {
        const query = squel.select()
            .from('user')
            .field('id')
            .field('name')
            .field('username')
            .field('email')
            .field('password')
            .field('role_id')

        const prepareQuery = query.toParam();
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!rows || !rows.length) {
            return null;
        }

        return rows;
    } catch (error) {
        logger.error('Cant execute query', error);
        throw error;
    }
}; 

exports.checkCredentials = async (params) => {
    try {
        const query = squel.select()
            .field('u.id')
            .field('u.name')
            .field('u.username')
            .field('u.email')
            .field('u.password')
            .field('r.name', 'role')
            .from('user', 'u')
            .where('u.email = ?', params.email)
            .left_join('role', 'r', 'u.role_id = r.id') 
            
        const prepareQuery = query.toParam();
        const [ credentials ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!credentials) {
            return null;
        }

        return credentials[0];
    } catch (error) {
        logger.error('Cant execute query', error);
        throw error;
    }
};