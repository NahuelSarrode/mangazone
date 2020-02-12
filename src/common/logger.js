const winston = require('winston');
//const config = require('../config/config');

// @TODO traerme el debug desde config.
module.exports = winston.createLogger({
    level: 'debug',
    transports: [ new winston.transports.Console() ]
});