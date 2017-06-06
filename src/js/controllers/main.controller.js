angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$http', 'API', '$rootScope', 'CurrentUserService', '$state', '$stateParams'];
function MainCtrl($http, API, $rootScope, CurrentUserService, $state, $stateParams) {
  const vm = this;

  // save the classes in one place
  vm.container = 'ph2 ph4-ns mb0-ns';

  // logout/in functions
  $rootScope.$on('loggedOut', () => {
    $rootScope.user = null;
    $rootScope.loggedIn = false;
  });
  $rootScope.$on('loggedIn', () => {
    $rootScope.user = CurrentUserService.currentUser;
    $rootScope.loggedIn = true;
  });
  vm.logout = () => {
    vm.menuIsHidden = true;
    CurrentUserService.removeUser();
    $rootScope.user = null;
  };
  // navbar menu
  vm.menuIsHidden = true;
  vm.showMenu = function showMenu() {
    if (vm.menuIsHidden) vm.menuIsHidden = false;
    else vm.menuIsHidden = true;
  };

  if ($stateParams === { id: 'new' }) console.log($stateParams);// $state.go('home');
}
