const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config/config');
const logger = require('../../common/logger');

exports.createToken = async (params) => {
    try {
        console.log(params);
        if (params.password) {
            delete params.password;
        }        

        const token = await jsonwebtoken.sign({
            data: params,  
        }, config.secret, {
            expiresIn: '12h'
        });

        return token;
    } catch (error) {
        logger.error('Cant verify credentials', error);
        throw error; 
    }
}