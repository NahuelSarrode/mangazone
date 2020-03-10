const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config/config');
const http = require('../../constants/http');
const logger = require('../logger'); 

module.exports = async (req, res, next) => {
    try {
        const auth = req.get('Authorization'); 

        if (!auth || !auth.length) {
            return res.sendStatus(http.status.UNAUTHORIZED);
        }

        const user = jsonwebtoken.verify(auth, config.secret);

        if (!user) {
            return res.sendStatus(http.status.UNAUTHORIZED);
        }

        req.user = user.data; 
        
        return next();
    } catch (error) {
        logger.warn('Cant verify your credentials ', error);
        res.sendStatus(http.status.UNAUTHORIZED);
    }
};