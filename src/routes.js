const { postCaptionHandler, getCaptionHandler, deleteCaptionsHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/caption',
    handler: postCaptionHandler,
  },
  {
    method: 'GET',
    path: '/caption',
    handler: getCaptionHandler,
  },
  {
    method: 'DELETE',
    path: '/captions',
    handler: deleteCaptionsHandler,
  },
];

module.exports = routes;