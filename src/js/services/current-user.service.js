angular
  .module('collabApp')
  .service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', '$rootScope', '$http', 'API'];
function CurrentUserService(TokenService, User, $rootScope, $http, API) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    if (decoded) {
      $http
        .get(`${API}/users/${decoded.username}`)
        .then(user => {
          // console.log('USERNAME: ', decoded.username);
          // console.log('USER', user);
          self.currentUser = user.data;
          $rootScope.$broadcast('loggedIn');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    TokenService.removeToken();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
