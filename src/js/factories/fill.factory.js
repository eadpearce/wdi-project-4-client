angular
  .module('collabApp')
  .factory('Fill', Fill);

Fill.$inject = ['$resource', 'API'];
function Fill($resource, API) {
  return $resource(`${API}/fills/:id`,
    { id: '@_id' },
    { 'update': { method: 'PATCH' }
    });
}
