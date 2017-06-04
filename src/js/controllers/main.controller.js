angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API', '$rootScope', 'CurrentUserService', '$state', '$stateParams'];
function MainCtrl($http, API, $rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;
  $rootScope.user = CurrentUserService.currentUser;

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    // console.log('logged out')
    $state.go('home');
  });

  vm.logout = () => {
    CurrentUserService.removeUser();
  };

  if ($stateParams === { id: 'new' }) console.log($stateParams);// $state.go('home');
}
