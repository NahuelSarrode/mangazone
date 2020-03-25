const http = require('../../constants').http;

module.exports = [{
    method: http.verbs.GET,
    path: '/titles/:title_id/episodes/',
    handler: 'getAll',
    middlewares: ['auth']
},
{
    method: http.verbs.GET,
    path: '/titles/:title_id/episodes/:episode_number',
    handler: 'getByNumber',
    middlewares: ['auth']
},
{
    method: http.verbs.POST,
    path: '/titles/:title_id/episodes/',
    handler: 'addEpisode',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.PUT,
    path: '/titles/:title_id/episodes/edit/:episode_number',
    handler: 'editEpisode',
    middlewares: ['auth', 'isAdmin']
},
{
    method: http.verbs.DELETE,
    path: '/titles/:title_id/episodes/delete/:episode_number',
    handler: 'deleteEpisode',
    middlewares: ['auth', 'isAdmin']
}];