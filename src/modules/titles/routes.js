const http = require('../../constants/http'); 

module.exports = [{
    method: http.verbs.GET, 
    path: '/titles', 
    handler: 'getAll'
},
{
    method: http.verbs.POST,
    path: '/title',
    handler: 'addTitle'
}];