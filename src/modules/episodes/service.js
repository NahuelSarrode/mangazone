const squel = require('squel');
const pool = require('../../common/pool');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (params) => {
    try {
        const query = squel.select()
            .from('episode')
            .field('id')
            .field('number')
            .field('duration')
            .field('state')
            .field('date')
            .field('description')
            .field('title_id')
            .where('title_id = ?', params.title_id);

        const preparedQuery = query.toParam();
        const [ rows ] = await pool.query(preparedQuery.text, preparedQuery.values);
        
        if (!rows || !rows.length) {
            return null;
        }

        return rows;
    } catch (error) {
        logger.error('Cant execute query: ', error);
        throw error;
    }
};

exports.getByNumber = async (params) => {
    try {
        const query = squel.select()
            .from('episode', 'e')
            .field('e.number')
            .field('e.state')
            .field('e.date')
            .field('e.duration')
            .field('e.description')
            .field('t.name', 'title name')
            .left_join('title', 't', 'e.title_id = t.id')
            .where('e.number = ?', params.number )
            .where('t.id = ?', params.title_id)

        const preparedQuery = query.toParam();
        const [ row ] = await pool.query(preparedQuery.text, preparedQuery.values);
        
        if (!row || !row.length) {
            return null;
        }

        return row[0];
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error;
    }
};  

exports.addEpisode = async (params) => {
    try {
        const query = squel.insert()
            .into('episode')
            .set('number', params.number)
            .set('duration', params.duration)
            .set('state', params.state)
            .set('date', params.date)
            .set('description', params.description)
            .set('title_id', params.title_id)
        
        const preparedQuery = query.toParam();
        const [ row ] = await pool.query(preparedQuery.text, preparedQuery.values);

        if (!row) {
            return null;
        }

        return row.insertId;
    } catch (error) {
        logger.error('Cant execute Query ', error);
        throw error; 
    }
};

exports.editEpisode = async (params) => {
    try {
        const query = squel.update()
            .table('episode')
            .set('number', params.number)
            .set('duration', params.duration)
            .set('state', params.state)
            .set('date', params.date)
            .set('description', params.description)
            .set('title_id', params.title_id)
            .where('number = ?', params.episode_number)

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
};

exports.deleteEpisode = async (params) => {
    try {
        const query = squel.delete()
            .from('episode')
            .where('number = ?', params.episode_number)
            .where('title_id = ?', params.title_id)
        
        const prepareQuery = query.toParam();
        const [deleted] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (deleted.affectedRows <= 0) {
            return null;
        }
        
        return deleted;
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
};