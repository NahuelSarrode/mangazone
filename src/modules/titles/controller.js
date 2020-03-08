const titleService = require('./service'); 
const http = require('../../constants/http');
const logger = require('../../common/logger');
const genreService = require('../../modules/genres/service'); 
const mangaService = require('../../modules/mangas/service'); 

exports.getById = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
    
        res.send(title);
    } catch (error) {
        logger.error('Error getting title: ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

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
        const genre = await genreService.getById({
            genre_id: req.body.genre_id
        });
        const manga = await mangaService.getById({
            manga_id: req.body.manga_id
        }) 

        if (!genre && !manga) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        const title = await titleService.addTitle({
            name: req.body.name,
            sinopsis: req.body.sinopsis,
            genre_id: req.body.genre_id, 
            manga_id: req.body.manga_id, 
            emition: req.body.emition,
            date: req.body.date
        });        
        
        res.send({
            title,
            ...req.body
        });
    } catch (error) {
        logger.error('Error adding title', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR); 
    }
};

exports.editTitle = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }    
        await titleService.editTitle({
            title_id: title.id,
            name: req.body.name, 
            sinopsis: req.body.sinopsis, 
            genre_id: req.body.genre, 
            manga_id: req.body.manga, 
            emition: req.body.emition,
            date: req.body.date
        });
    
        res.send({
            ...req.body
        });        
    } catch (error) {
        logger.error('Error editing title', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.deleteTitle = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        }); 

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
    
        await titleService.deleteTitle({
            title_id: title.id
        });

        res.sendStatus(http.status.OK);        
    } catch (error) {
        logger.error('Error deleting title', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};