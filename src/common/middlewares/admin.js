const http = require('../../constants/http'); 
const logger = require('../logger');

module.exports = async (req, res, next) => {
    try {
        const user = req.user; 

        if (user.role !== 'Admin') {
            return res.sendStatus(http.status.UNAUTHORIZED);
        }
        
        return next(); 
    } catch (error) {
        logger.error('The user must be an Administrator', error);
        res.sendStatus(http.status.UNAUTHORIZED);        
    }
};