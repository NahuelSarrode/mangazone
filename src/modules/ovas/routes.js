const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/ovas/',
    handler: 'getAll'
},
{
    method: http.verbs.POST,
    path: '/ovas/',
    handler: 'addOva'
},
{
    method: http.verbs.GET,
    path: '/ovas/:ova_id', 
    handler: 'getById'
},
{
    method: http.verbs.PUT,
    path: '/ovas/edit/:ova_id',
    handler: 'editOva'
},
{
    mathod: http.verbs.DELETE,
    path: '/ovas/delete/:ova_id',
    handler: 'deleteOVa'
}]