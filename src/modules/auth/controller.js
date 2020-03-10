const authService = require('./service');
const http = require('../../constants/http');
const logger = require('../../common/logger');
const userService = require('../user/service');

exports.login = async (req, res) => {
    try {
        const user = await userService.checkCredentials({
            email: req.body.email,
            password: req.body.password
        });

        if (!user || user.password != req.body.password) {  
            res.sendStatus(http.status.BAD_REQUEST);
        }

        const token = await authService.createToken(user);

        res.send(token);
    } catch (error) {
        logger.error('Error loggin', error);
        res.sendStatus(http.status.INTERNAL_SERVER_ERROR);
    }
};