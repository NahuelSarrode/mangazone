const userService = require('./service');
const http = require('../../constants/http');
const logger = require('../../common/logger');

exports.getAll = async (req, res) => {
    try {
        const users = await userService.getAll();

        res.send(users);
    } catch (error) {
        logger.error('Error getting users', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);        
    }
};