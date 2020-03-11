const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET, 
    path: '/users/',
    handler: 'getAll',
    middlewares: ['isAdmin']
},
{
    method: http.verbs.POST,
    path: '/users/add/',
    handler: 'addUser',
    middlewares: ['isAdmin']
},
{
    method: http.verbs.GET,
    path: '/users/:user_id',
    handler: 'getById',
    middlewares: ['isAdmin']
},
{
    method: http.verbs.PUT,
    path: '/users/edit/:user_id',
    handler: 'editUser',
    middlewares: ['isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/users/delete/:user_id', 
    handler: 'deleteUser',
    middlewares: ['isAdmin']
}]