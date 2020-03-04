const mangaService = require('./service'); 
const logger = require('../../common/logger');
const http = require('../../constants/http');

exports.getById = async (req, res) => {
    try {   
        const manga = await mangaService.getById(req.params);

        if(manga) {
            res.send(manga);
        }

    } catch (error) {
        logger.error('Error getting Manga: ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR); 
    }
}