const stateService = require('./service');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (req, res) => {
    try {
        const states = await stateService.getAll();

        if (!states) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.send(states);
    } catch (error) {
        logger.error('Error getting the states ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.addState = async (req, res) => {
    try {
        const state = stateService.addState({
            name: req.body.name
        });

        if (!state) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.CREATED);
    } catch (error) {
        logger.error('Error adding the state ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.editState = async (req, res) => {
    try {
        const state = await stateService.getById({
            state_id: req.params.state_id
        });
        
        if (!state) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const updated = await stateService.editState({
            name: req.body.name,
            state_id: state.id,
        });

        if (!updated) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error editing the state ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteState = async (req, res) => {
    try {
        const state = await stateService.getById({
            state_id: req.params.state_id
        });
       
        if (!state) {
            res.sendStatus(http.status.BAD_REQUEST)
        }
    
        const deleted = await stateService.deleteState({
            state_id: state.id
        });
        
        if (!deleted) {
            res.sendStatus(http.status.INTERNAL_SERVER_ERROR)
        }

        res.sendStatus(http.status.NO_CONTENT);
    } catch (error) {
        logger.error('Error deleting the state ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
}