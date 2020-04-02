const http = require('../../constants/http'); 

module.exports = [{
    method: http.verbs.GET, 
    path: '/titles/', 
    handler: 'getAll',
    middlewares: ['auth']    
},
{
    method: http.verbs.POST,
    path: '/title/',
    handler: 'addTitle',
    middlewares: ['auth', 'isAdmin']
}, 
{
    method: http.verbs.GET,
    path: '/titles/:title_id',
    handler: 'getById',
    middlewares: ['auth', 'isAdmin']
}, 
{
    method: http.verbs.PUT,
    path: '/titles/:title_id', 
    handler: 'editTitle',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id',
    handler: 'deleteTitle',
    middlewares: ['auth', 'isAdmin']
}];