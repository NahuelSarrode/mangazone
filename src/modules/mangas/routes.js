const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/mangas/',
    handler: 'getAll',
    middlewares: ['auth']
},
{
    method: http.verbs.GET,
    path: '/mangas/:manga_name',
    handler: 'getByName',
    middlewares: ['auth']
}, 
{
    method: http.verbs.POST,
    path: '/titles/:title_id/mangas/',
    handler: 'addManga', 
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.PUT,
    path: '/titles/:title_id/mangas/:manga_name',
    handler: 'updateManga',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id/mangas/:manga_name',
    handler: 'deleteManga',
    middlewares: ['auth', 'isAdmin']
}]