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
        const [ row ] = await pool.query(prepareQuery.text, prepareQuery.values); 
        
        if (!row || !row.length) {
            return null;
        }

        return row; 
    } catch (error) {
        logger.error('can\'t execute query', error);
        throw error;  
    }
}

exports.getAll = async (params) => {
    try {
        const query = squel.select()
            .from('manga', 'm')
            .field('m.id')
            .field('m.name')
            .field('m.language')
            .field('m.state_id')
            .field('m.date')
            .field('m.title_id')
            .field('t.name', 'title name')
            .join('title', 't', 'm.title_id = t.id')

        const prepareQuery = query.toParam();
        const [ rows ] = await pool.query(prepareQuery.text, prepareQuery.values);

        if (!rows || !rows.length) {
            return null;
        }

        return rows;
    } catch (error) {
        logger.error('Cant excute query ', error);
        throw error; 
    }
}

exports.getByName = async (params) => {
    try {
        const query = squel.select()
            .from('manga')
            .field('id')
            .field('name')
            .field('language')
            .field('state_id')
            .field('date')
            .field('title_id')
            .where('name = ?', params.manga_name);

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

exports.addManga = async (params) => {
    try {
        const query = squel.insert()
            .into('manga')
            .set('name', params.name)
            .set('language', params.language)
            .set('state_id', params.state)
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

exports.updateManga = async (params) => {
    try {
        console.log('into service');
        console.log(params);
        const query = squel.update()
            .table('manga')
            .set('name', params.name)
            .set('language', params.language)
            .set('state_id', params.state_id) 
            .set('date', params.date)
            .set('title_id', params.title_id)
            .where('id = ?', params.manga_id)
// verificar title_id ya que estoy usando dos veces el mismo valor y no se como lo interpreta. 
        const prepareQuery = query.toParam();
        await pool.query(prepareQuery.text, prepareQuery.values);
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error;
    }
}

exports.deleteManga = async (params) => {
    try {   
        console.log(params);
        const query = squel.delete()
            .from('manga')
            .where('id = ?', params.manga_id) 
            .where('title_id = ?', params.title_id)

        const prepareQuery = query.toParam();
        await pool.query(prepareQuery.text, prepareQuery.values); 
    } catch (error) {
        logger.error('Cant execute query ', error);
        throw error; 
    }
}