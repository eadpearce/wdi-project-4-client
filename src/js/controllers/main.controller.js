angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API', '$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($http, API, $rootScope, CurrentUserService, $state) {
  const vm = this;
  if (vm.user) {
    $http
    .get(`${API}/users`)
    .then(response => {
      vm.all = response.data;
    });
  }

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    // $state.go('home');
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    console.log('logged out')
    $state.go('home');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };
}
