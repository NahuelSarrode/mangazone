const squel = require('squel');
const pool = require('../../common/pool');
const logger = require('../../common/logger');

exports.getById = async(params) => {
    try {
        console.log(params);
        const query = squel.select()
            .from('title')
            .field('id')
            .field('name')
            .field('sinopsis')
            .field('genre_id')
            .field('manga_id')
            .field('emition')
            .field('date')
            .where('id = ?', params.title_id)

        const prepareQuery = query.toParam();    
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!rows || !rows.length) {
            return null;
        }
        
        return rows;
    } catch (error) {
        logger.error('Cant execute query error: ', error);
        throw error; 
    }
};

exports.getAll = async () => {
    try {
        const query = squel.select()
            .from('title')
            .field('id')
            .field('name')
            .field('sinopsis')
            .field('genre_id')
            .field('manga_id')
            .field('emition')
            .field('date')
        
        const prepareQuery = query.toParam();
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        return rows;
    } catch (error) {
        logger.error('can\'t execute query', error);
        throw error;
    }
};

exports.addTitle = async (params) => {
    try {
        console.log(params);
        const query = squel.insert()
            .into('title')
            .set('name', params.name)
            .set('sinopsis', params.sinopsis)
            .set('genre_id', params.genre_id)
            .set('manga_id', params.manga_id)
            .set('emition', params.emition)
            .set('date', params.date) 

        const prepareQuery = query.toParam(); 
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        return rows.insertId;
    } catch (error) {
        logger.error('Cant execute query: ', error);
        throw error; 
    }
};