const ovaService = require('./service');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (req, res) => {
    try {
        const ovas = await ovaService.getAll();
        
        if (!ovas) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(ovas);
    } catch (error) {
        logger.error('Error getting ovas ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.getById = async (req, res) => {
    try {
        const ova = await ovaService.getById({
            ova_id: req.params.ova_id
        });

        if (!ova) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.send(ova);
    } catch (error) {
        logger.error('Error getting ova ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.addOva = async (req, res) => {
    try {
        const ova = await ovaService.addOva({
            name: req.body.name,
            date: req.body.date, 
            duration: req.body.duration,
            title_id: req.body.title_id
        });
    
        if (!ova) {
            res.sendStatus(http.status.BAD_REQUEST);
        }            

        res.send({
            ova, 
            ...req.body
        });
    } catch (error) {
        logger.error('Error edding ova', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.editOva = async (req, res) => {
    try {        
        const ova = await ovaService.getById({
            ova_id: req.params.ova_id
        });

        await ovaService.editOva({
            ova_id: req.params.ova_id,
            name: req.body.name,
            date: req.body.date,
            duration: req.body.duration,
            title_id: req.body.title_id
        });
        
        res.send({
            ...req.body
        })
    } catch (error) {
        logger.error('Error deleting ova', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.deleteOva = async (req, res) => {
    try {
        console.log('into controller');
        const ova = await ovaService.getById({
            ova_id: req.params.ova_id
        });
            
        if (!ova) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        console.log(ova);
        await ovaService.deleteOva({
            ova_id: req.params.ova_id,
        });

        res.sendStatus(http.status.OK);
    } catch (error) {
        logger.error('Error deleting ova', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};