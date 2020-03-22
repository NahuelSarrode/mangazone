const squel = require('squel');
const pool = require('../../common/pool');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async () => {
    try {
        const query = squel.select()
            .from('ova')
            .field('id')
            .field('name')
            .field('date')
            .field('duration')
            .field('title_id')
            
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
};

exports.addOva = async (params) => {
    try {
        const query = squel.insert()
            .into('ova')
            .set('name', params.name)
            .set('date', params.date)
            .set('duration', params.duration)
            .set('title_id', params.title_id)
            
        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values);

        return row.insertId;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error;
    }
};

exports.getById = async (params) => {
    try {
        const query = squel.select()
            .from('ova')
            .field('id')
            .field('name')
            .field('date')
            .field('duration')
            .field('title_id')
            .where('id = ?', params.ova_id)

        const prepareQuery = query.toParam();
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!row || !row.length) {
            return null;
        }

        return row;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error;
    }
};

exports.editOva = async (params) => {
    try {
        const query = squel.update()
            .table('ova')
            .where('id = ?', params.ova_id)
            .set('name', params.name)
            .set('date', params.date)
            .set('duration', params.duration)
            .set('title_id', params.title_id)

        const prepareQuery = query.toParam();
        await pool.query(prepareQuery.text, prepareQuery.values);
    } catch (error) {
        logger.error('Cant excute query ', error);
        throw error;
    }
};

exports.deleteOva = async (params) => {
    try {
        console.log('into service');
        const query = squel.delete()
            .from('ova')
            .where('id = ?', params.ova_id) 

        const prepareQuery = query.toParam();
        await pool.query(prepareQuery.text, prepareQuery.values);
    } catch (error) {
        logger.error('Cant excute query ', error);
        throw error;
    }
};