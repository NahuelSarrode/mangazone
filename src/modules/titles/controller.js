const titleService = require('./service'); 
const http = require('../../constants/http');
const logger = require('../../common/logger');
const genreService = require('../../modules/genres/service'); 
const mangaService = require('../../modules/mangas/service'); 

exports.getAll = async (req, res) => {
    try {
        const titles = await titleService.getAll();

        res.send(titles);
    } catch (error) {
        logger.error('Error getting titles', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR); 
    }
};

exports.addTitle = async (req, res) => {
    try {
        const genre = await genreService.getById(req.body.genre_id);
        const manga = await mangaService.getById(req.body.manga_id) 

        if (!genre && !manga) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        const title = {
            sinopsis: req.body.sinopsis,
            genre: req.body.genre, 
            emition: req.body.emition, 
            manga_id: req.body.manga_id, 
            date: req.body.date, 
            name: req.body.name 
        }

        res.send(title); 
    } catch (error) {
        logger.error('Error adding title', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR); 
    }
}