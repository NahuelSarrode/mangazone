const squel = require('squel');
const pool = require('../../common/pool');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async () => {
    try {
        const query = squel.select()
            .from('state')
            .field('id')
            .field('name')

        const prepareQuery = query.toParam();
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!rows || !rows.length) {
            return null; 
        }

        return rows; 
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}

exports.getById = async (params) => {
    try {
        const query = squel.select()
            .from('state')
            .field('id')
            .field('name')
            .where('id = ?', params.state_id)

        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!row || !row.length) {
            return null;
        }

        return row[0];
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}

exports.addState = async (params) => {
    try {
        const query = squel.insert()
            .into('state')
            .set('name', params.name)

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

exports.editState = async (params) => {
    try {
        const query = squel.update()
            .table('state')
            .set('name', params.name)
            .where('id = ?', params.state_id)

        const prepareQuery = query.toParam();
        const [ updated ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (updated.affectedRows <= 0) {
            return null;
        }

        return updated;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}

exports.deleteState = async (params) => {
    try {
        console.log(params);
        const query = squel.delete()
            .from('state')
            .where('id = ?', params.state_id)

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