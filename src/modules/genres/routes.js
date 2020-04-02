const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/genres/:genre_id', 
    handler: 'getById'
},
{
    method: http.verbs.GET, 
    path: '/genres/',
    handler: 'getAll'
},
{
    method: http.verbs.POST,
    path: '/genres/', 
    handler: 'addGenre' 
},
{
    method: http.verbs.PUT, 
    path: '/genres/:genre_id', 
    handler: 'updateGenre'
}, 
{
    method: http.verbs.DELETE,
    path: '/genres/:genre_id',
    handler: 'deleteGenre'
}]