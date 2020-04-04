const squel = require('squel');
const pool = require('../../common/pool');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (params) => {
    try {
        const query = squel.select()
            .from('movie', 'm')
            .field('m.id')
            .field('m.name')
            .field('m.duration')
            .field('m.date')
            .field('m.title_id')
            .field('t.name', 'anime')
            .join('title', 't', 't.id = m.title_id')
            .where('m.title_id = ?', params.title_id);

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

exports.addMovie = async (params) => {
    try {
        const query = squel.insert()
            .into('movie')
            .set('name', params.name)
            .set('duration', params.duration)
            .set('date', params.date)
            .set('title_id', params.title_id)

        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values);
        
        if (!row) {
            return null;
        }

        return row.insertId;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}

exports.getByName = async (params) => {
    try {
        const query = squel.select()
            .from('movie')
            .field('id')
            .field('name')
            .field('date')
            .field('duration')
            .field('title_id')
            .where('name = ?', params.name)
            .where('title_id = ?', params.title_id)

        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!row || !row.length) {
            return null;
        }

        return row[0];
    } catch (error) {
        logger.error('Cant execute query', error);
        throw error;
    }
}

exports.editMovie = async (params) => {
    try {
        console.log(params);
        const query = squel.update()
            .table('movie')
            .set('name', params.name)
            .set('date', params.date)
            .set('duration', params.duration)
            .set('title_id', params.title_id)
            .where('id = ?', params.movie_id)

        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values); 

        if (row.affectedRows <= 0) {
            return null; 
        } 

        return row;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
} 

exports.deleteMovie = async (params) => {
    try {
        const query = squel.delete()
            .from('movie')
            .where('id = ?', params.movie_id)
            .where('title_id = ?', params.title_id)

        const prepareQuery = query.toParam();
        const [ deleted ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (deleted.affectedRows <= 0) {
            return null; 
        } 

        return deleted;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error;
    }
}