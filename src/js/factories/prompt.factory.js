angular
  .module('collabApp')
  .factory('Prompt', Prompt);

Prompt.$inject = ['$resource', 'API'];
function Prompt($resource, API) {
  return $resource(`${API}/prompts/:id`,
    { id: '@_id' },
    { 'update': { method: 'PUT' }
    });
}
