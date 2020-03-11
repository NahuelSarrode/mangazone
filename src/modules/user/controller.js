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
        console.log(user);
        const edited = await userService.editUser({
            user_id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: user.password,
            role_id: req.body.role_id
        });
        console.log('into controller');
        console.log(req.params.user_id);
        if (!edited) {
            res.sendStatus(http.status.BAD_REQUEST);
        }

        return edited;
    } catch (error) {
        logger.error('Error editing the user ', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};