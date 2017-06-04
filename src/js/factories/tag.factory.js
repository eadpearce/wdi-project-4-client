angular
  .module('collabApp')
  .factory('Tag', Tag);

Tag.$inject = ['$resource', 'API'];
function Tag($resource, API) {
  return $resource(`${API}/tags/:id`,
    { id: '@_id' },
    { 'update': { method: 'PUT' }
    });
}
