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
    try {
        const genres = await genreService.getAll();

        if (!genres) {
            res.sendStatus(http.status.NO_CONTENT);
        }

        res.send(genres);
    } catch (error) {
        logger.error('Error getting genres ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.addGenre = async (req, res) => {
    try {
        const genre = await genreService.addGenre({
            name: req.body.name
        });

        if (!genre) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.CREATED);
    } catch (error) {
        logger.error('Error adding the genre ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.updateGenre = async (req, res) => {
    try {
        const genre = await genreService.getById({
            genre_id: req.params.genre_id
        });

        if (!genre) {
            res.sendStatus(http.status.BAD_REQUEST);
        } 

        const updated = await genreService.updateGenre({
            name: req.body.name, 
            genre_id: genre.id
        });

        if (!updated) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error updating genre ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteGenre = async (req, res) => {
    try {
        const genre = await genreService.getById({
            genre_id: req.params.genre_id
        });
        
        if (!genre) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const deleted = await genreService.deleteGenre({
            genre_id: genre.id
        });

        if (!deleted) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error deleting genre ', error); 
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}