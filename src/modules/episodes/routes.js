const http = require('../../constants').http;

module.exports = [{
    method: http.verbs.GET,
    path: '/episodes/:title_id',
    handler: 'get',
    //middlewares: ['auth']
}];