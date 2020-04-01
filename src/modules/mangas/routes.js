const http = require('../../constants/http');

module.exports = [{
    method: http.verbs.GET,
    path: '/mangas/',
    handler: 'getAll'
},
{
    method: http.verbs.GET,
    path: '/mangas/:manga_name',
    handler: 'getByName'
}, 
{
    method: http.verbs.POST,
    path: '/titles/:title_id/mangas/',
    handler: 'addManga'
},
{
    method: http.verbs.PUT,
    path: '/titles/:title_id/mangas/:manga_name',
    handler: 'updateManga'
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id/mangas/:manga_name',
    handler: 'deleteManga'
}]