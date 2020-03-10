const http = require('../../constants/http'); 

module.exports = [{
    method: http.verbs.GET, 
    path: '/titles', 
    handler: 'getAll',
    middlewares: ['auth','isAdmin']    
},
{
    method: http.verbs.POST,
    path: '/title',
    handler: 'addTitle'
}, 
{
    method: http.verbs.GET,
    path: '/titles/:title_id',
    handler: 'getById'
}, 
{
    method: http.verbs.PUT,
    path: '/titles/:title_id', 
    handler: 'editTitle'
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id',
    handler: 'deleteTitle'
}];