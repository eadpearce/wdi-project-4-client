angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API', '$rootScope', 'CurrentUserService', '$state', '$stateParams'];
function MainCtrl($http, API, $rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;

  $rootScope.$on('loggedOut', () => {
    $rootScope.user = null;
    $rootScope.loggedIn = false;
    // console.log('logged out')
  });
  $rootScope.$on('loggedIn', () => {
    $rootScope.user = CurrentUserService.currentUser;
    $rootScope.loggedIn = true;
    // console.log('logged out')
    $state.go('home');
  });

  vm.menuIsHidden = true;
  vm.showMenu = function showMenu() {
    if (vm.menuIsHidden) vm.menuIsHidden = false;
    else vm.menuIsHidden = true;
  };
  vm.logout = () => {
    vm.menuIsHidden = true;
    CurrentUserService.removeUser();
    $rootScope.user = null;
  };

  if ($stateParams === { id: 'new' }) console.log($stateParams);// $state.go('home');
}
