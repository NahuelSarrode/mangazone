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
        const [ row ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (!row || !row.length) {
            return null;
        }

        return row[0];
    } catch (error) {
        logger.error('cant execute query: ', error);
        throw error;
    }
}

exports.getAll = async () => {
    try {
        const query = squel.select()
            .from('genre')
            .field('id')
            .field('name')

        const preparedQuery = query.toParam();
        const [ rows ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (!rows || !rows.length) {
            return null; 
        }

        return rows;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }   
}

exports.addGenre = async (params) => {
    try {
        const query = squel.insert()
            .into('genre')
            .set('name', params.name)
        
        const preparedQuery = query.toParam();
        const [ row ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (!row) {
            return null;
        }

        return row.insertId;
    } catch (error) {
        logger.error('Cant execute query ', error); 
        throw error; 
    }
}

exports.updateGenre = async (params) => {
    try {
        console.log(params);
        const query = squel.update()
            .table('genre')
            .set('name', params.name)
            .where('id = ?', params.genre_id)

        const preparedQuery = query.toParam();
        const [ updated ] = await pool.query(preparedQuery.text, preparedQuery.values); 

        if (updated.affectedRows <= 0) {
            return null;
        }
        
        return updated;
    } catch (error) {
        logger.error('Cant execute query ', error); 
        throw error; 
    }
}

exports.deleteGenre = async (params) => {
    try {
        const query = squel.delete()
            .from('genre')
            .where('id = ?', params.genre_id)

        const preparedQuery = query.toParam();
        const [ deleted ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (deleted.affectedRows <= 0) {
            return null;
        }
    
        return deleted;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}