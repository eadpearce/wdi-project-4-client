angular
.module('collabApp')
.service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  const self = this;
  let decodedToken = false;

  self.decodeToken = () => {
    const token = self.getToken();
    decodedToken = true;
    console.log('decode token', token, Date.now())
    return token ? jwtHelper.decodeToken(token) : null;
  };

  self.getToken = () => {
    // stop this function running again when it doesn't need to
    if (!decodedToken) {
      console.log('token service', Date.now(), $window.localStorage.getItem('auth-token'))
      return $window.localStorage.getItem('auth-token');
    }
  };

  self.setToken = (token) => {
    return $window.localStorage.setItem('auth-token', token);
  };

  self.removeToken = () => {
    $window.localStorage.clear();
  };

}
