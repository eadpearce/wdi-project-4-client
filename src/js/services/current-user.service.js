angular
  .module('collabApp')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', '$rootScope', '$http', 'API'];
function CurrentUserService(TokenService, User, $rootScope, $http, API) {
  const self = this;

  self.getUser = function() {
    const decoded = TokenService.decodeToken();
    console.log('get user', decoded, Date.now())
    if (decoded) {
      $http
        .get(`${API}/users/${decoded.username}`)
        .then(user => {
          self.currentUser = user.data;
        })
        .finally(() => {
          $rootScope.$broadcast('loggedIn');
        })
        .catch(err => {
          console.log(err);
        });
    } else return;
  };

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
