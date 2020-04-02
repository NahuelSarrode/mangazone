const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/genres/:genre_id', 
    handler: 'getById',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.GET, 
    path: '/genres/',
    handler: 'getAll',
    middlewares: ['auth']
},
{
    method: http.verbs.POST,
    path: '/genres/', 
    handler: 'addGenre',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.PUT, 
    path: '/genres/:genre_id', 
    handler: 'updateGenre',
    middlewares: ['auth', 'isAdmin']
}, 
{
    method: http.verbs.DELETE,
    path: '/genres/:genre_id',
    handler: 'deleteGenre',
    middlewares: ['auth', 'isAdmin']
}]