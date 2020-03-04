const squel = require('squel');
const pool = require('../../common/pool'); 
const logger = require('../../common/logger'); 

exports.getById = async (params) =>  {
    try {
        const query = squel.select()
            .field('id')
            .field('name')
            .field('language')
            .field('state_id')
            .field('date')
            .field('title_id')
            .from('manga')
            .where('id = ?', params.manga_id) 

        const prepareQuery = query.toParam();  
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values); 
        
        if (!rows || !rows.length) {
            return null;
        }

        return rows; 
    } catch (error) {
        logger.error('can\'t execute query', error);
        throw error; 
    }
}