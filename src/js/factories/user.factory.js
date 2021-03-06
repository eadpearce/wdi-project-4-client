angular
  .module('collabApp')
  .factory('User', User);

User.$inject = ['API', '$resource'];
function User(API, $resource){
  return $resource(`${API}/users/:id`, { id: '@id'}, {
    register: { method: 'POST', url: `${API}/register` },
    login: { method: 'POST', url: `${API}/login` },
    'update': { method: 'PATCH' }
  });
}
