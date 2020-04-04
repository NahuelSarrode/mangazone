const http = require('../../constants').http;

module.exports = [{
    method:  http.verbs.GET, 
    path: '/titles/:title_id/movies/',
    handler: 'getAll',
    middlewares: ['auth']
},
{
    method: http.verbs.POST,
    path: '/titles/:title_id/movies/',
    handler: 'addMovie',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.GET,
    path: '/titles/:title_id/movies/:movie_name',
    handler: 'getByName',
    middlewares: ['auth']
},
{
    method: http.verbs.PUT,
    path: '/titles/:title_id/movies/:movie_name',
    handler: 'editMovie',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id/movies/:movie_name',
    handler: 'deleteMovie',
    middlewares: ['auth', 'isAdmin']
}]; 