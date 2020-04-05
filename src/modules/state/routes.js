const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/states/',
    handler: 'getAll',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.POST,
    path: '/states/',
    handler: 'addState',
    middlewares: ['auth', 'isAdmin']
}, 
{
    method: http.verbs.PUT,
    path: '/states/:state_id',
    handler: 'editState',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/states/:state_id',
    handler: 'deleteState',
    middlewares: ['auth', 'isAdmin']
}]