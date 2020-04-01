const genreService = require('./service');
const logger = require('../../common/logger');
const http = require('../../constants/http');

exports.getById = async (req, res) => {
    try {
        const genre = await genreService.getById(req.params);
        
        if (genre) {
            res.send(genre);
        }
        
    } catch (error) {
        logger.error('Error getting genre', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);         
    }
}

exports.getAll = async (req, res) => {
 
};