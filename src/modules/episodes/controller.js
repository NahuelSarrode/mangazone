const episodeService = require('./service');
const http = require('../../constants/http');
const logger = require('../../common/logger');
const titleService = require('../titles').service; 

exports.getAll = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });
        
        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const episodes = await episodeService.getAll({
            title_id: title.id
        });

        if (!episodes) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(episodes);
    } catch (error) {
        logger.error('Error Getting episodes ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.getByNumber = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const episode = await episodeService.getByNumber({
            number: req.params.episode_number,
            title_id: title.id
        });

        console.log(episode);

        if (!episode) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(episode);
    } catch (error) {
        logger.error('Error gettin episode ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.addEpisode = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });
        
        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const episode = await episodeService.addEpisode({
            number: req.body.number,
            duration: req.body.duration,
            state: req.body.state,
            date: req.body.date,
            description: req.body.description,
            title_id: title.id
        });
        
        res.send({
            episode,
            ...req.body
        });
    } catch (error) {
        logger.error('Error adding episode ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.editEpisode = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });
    
        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const updated = await episodeService.editEpisode({
            number: req.body.number,
            duration: req.body.duration,
            state: req.body.state,
            date: req.body.date,
            description: req.body.description,
            title_id: title.id,
            episode_number: req.params.episode_number
        });
        
        res.sendStatus(http.status.OK);
    } catch (error) {
        logger.error('Error editing the episode ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        await episodeService.deleteEpisode({
            episode_number: req.params.episode_number,
            title_id: req.params.title_id
        });

        res.sendStatus(http.status.OK);
    } catch (error) {
        logger.error('Error deleting episode');
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};