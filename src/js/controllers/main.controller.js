angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', 'CurrentUserService', '$state', '$stateParams', '$timeout', 'spinnerService'];
function MainCtrl($rootScope, CurrentUserService, $state, $stateParams, $timeout, spinnerService) {
  const vm = this;
  // save the tachyons classes in one place
  vm.container = 'ph2 ph4-ns mb0-ns mt0-ns mt5 pt2';
  vm.showpage  = 'w-75-l w-100 center ph2 ph4-ns mb0-ns mt0-ns mt5 pt2';
  vm.loginform = 'w-third-l w-50-m w-100 ph2 ph0-ns center mv5 pt2 pt0-ns';
  vm.form      = 'w-75-l w-100 center ph2 ph4-ns mb0-ns mt0-ns mt5 pt2';
  vm.link      = 'link underline dark-green hover-green';
  vm.indexpage = 'mb0 mt5 mt0-ns bt b--moon-gray bg-white bb w-100 ph2 ph4-ns pv2';
  vm.button    = 'bg-white ba b--black br-pill ph2';
  vm.textarea  = 'bg-white ph2 pv3 lh-copy br3 b--moon-gray ba';

  // stop landing page flashing when logged in
  vm.loaded = false;
  vm.load = function() {
    if (vm.loaded === false)
      $timeout(() => {
        vm.loaded = true;
        console.log(vm.loaded);
      }, 200);
  };
  // logout/in functions
  $rootScope.$on('loggedOut', () => {
    $rootScope.currentUser = null;
    $rootScope.loggedIn = false;
  });
  $rootScope.$on('loggedIn', () => {
    $rootScope.currentUser = CurrentUserService.currentUser;
    $rootScope.loggedIn = true;
  });
  vm.logout = () => {
    vm.menuIsHidden = true;
    CurrentUserService.removeUser();
    $rootScope.user = null;
    $state.go('home');
  };
  // navbar menu
  vm.menuIsHidden = true;
  vm.showMenu = function showMenu() {
    if (vm.menuIsHidden) vm.menuIsHidden = false;
    else vm.menuIsHidden = true;
  };
}
