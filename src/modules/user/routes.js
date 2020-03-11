const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET, 
    path: '/users/',
    handler: 'getAll'
},
{
    method: http.verbs.POST,
    path: '/users/add/',
    handler: 'addUser'
},
{
    method: http.verbs.GET,
    path: '/users/:user_id',
    handler: 'getById',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.PUT,
    path: '/users/edit/:user_id',
    handler: 'editUser',
    middlewares: ['auth']
}]