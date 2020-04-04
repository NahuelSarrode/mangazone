const movieService = require('./service'); 
const titleService = require('../titles/service');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const movies = await movieService.getAll({
            title_id: title.id
        });

        if (!movies) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.send(movies);
    } catch (error) {
        logger.error('Error getting movies ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.addMovie = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const inserted = await movieService.addMovie({
            name: req.body.name,
            date: req.body.date,
            duration: req.body.duration,
            title_id: title.id
        });

        if (!inserted) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.CREATED);
    } catch (error) {
        logger.error('Error inserting movie ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.getByName = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const movie = await movieService.getByName({
            name: req.params.movie_name,
            title_id: title.id
        });
        
        if (!movie) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.send(movie);
    } catch (error) {
        logger.error('Error getting a movie for name', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.editMovie = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        const movie = await movieService.getByName({
            name: req.params.movie_name,
            title_id: title.id
        });
        
        if (!movie) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        const updated = await movieService.editMovie({
            movie_id: movie.id,
            name: req.body.name,
            date: req.body.date,
            duration: req.body.duration,
            title_id: req.body.title_id
        });

        if (!updated) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error Updating the movie ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        const movie = await movieService.getByName({
            name: req.params.movie_name,
            title_id: title.id
        });
        
        if (!movie) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const deleted = await movieService.deleteMovie({
            movie_id: movie.id,
            title_id: movie.title_id
        });

        if (!deleted) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error deleting the movie ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}