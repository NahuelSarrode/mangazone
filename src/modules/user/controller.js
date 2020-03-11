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

exports.getById = async (req, res) => {
    try {
        const user = await userService.getById({
            user_id: req.params.user_id
        });
    
        if (!user) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
    
        res.send(user);        
    } catch (error) {
        logger.error('Error Getting the user ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.addUser = async (req, res) => {
    try {
        const user = await userService.addUser({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_id: req.body.role_id 
        });

        if (!user) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        res.sendStatus(http.status.OK);
    } catch (error) {
        logger.error('Error making user ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.editUser = async (req, res) => {
    try { 

        const user = await userService.getById({
            user_id: req.params.user_id
        });

        if (!user) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
        
        await userService.editUser({
            user_id: user.id,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role_id: req.body.role_id
        });

        res.send({
            ...req.body
        });
    } catch (error) {
        logger.error('Error editing the user ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.getById({
            user_id: req.params.user_id
        });
    
        if (!user) {
            res.sendStatus(http.status.BAD_REQUEST);
        }
    
        await userService.deleteUser({
            user_id: user.id
        });

        res.sendStatus(http.status.OK);
    } catch (error) {
        logger.error('Error deleting user ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};