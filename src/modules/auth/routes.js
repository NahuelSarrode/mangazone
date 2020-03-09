const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.POST, 
    path: '/auth/signin',
    handler: 'login'
}]