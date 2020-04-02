const mangaService = require('./service'); 
const titleService = require('../titles/service');
const logger = require('../../common/logger');
const http = require('../../constants/http');

exports.getAll = async (req, res) => {
    try {
        const mangas = await mangaService.getAll();

        if (!mangas) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(mangas);
    } catch (error) {
        logger.error('Error getting mangas', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.getByName = async (req, res) => {
    try {
        console.log('into controller');
        const manga = await mangaService.getByName({
            manga_name: req.params.manga_name
        });
        
        if (!manga) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(manga);
    } catch (error) {
        logger.error('Error gettin a manga for name');
        res.sendStatus(http.sendStatus.INTERNAL_SERVER_ERROR);
    }
}

exports.addManga = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        if (!title) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const manga = await mangaService.addManga({
            name: req.body.name, 
            language: req.body.language, 
            state: req.body.state_id, 
            date: req.body.date, 
            title_id: title.id
        });

        if (!manga) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.send({
            manga,
            ...req.body
        });
    } catch (error) {
        logger.error('Error Adding manga ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.updateManga = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });        

        const manga = await mangaService.getByName({
            manga_name: req.params.manga_name
        });

        if (!title || !manga) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
 
        const updated = await mangaService.updateManga({
            manga_id: manga.id,
            name: req.body.name,
            language: req.body.language,
            state_id: req.body.state_id,
            date: req.body.date, 
            title_id: req.body.title_id
        });

        if (!updated) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error updating manga ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteManga = async (req, res) => {
    try {
        const title = await titleService.getById({
            title_id: req.params.title_id
        });

        const manga = await mangaService.getByName({
            manga_name: req.params.manga_name
        });

        if (!title || !manga) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
    
        const deleted = await mangaService.deleteManga({
            manga_id: manga.id,
            title_id: title.id
        });

        if (!deleted) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error deleting Manga ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}