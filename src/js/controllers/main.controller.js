angular
.module('collabApp')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [
  '$rootScope',
  'CurrentUserService',
  '$state',
  '$stateParams',
  '$timeout',
  '$http',
  'API',
  'spinnerService',
  'User',
  'Comment'
];
function MainCtrl(
  $rootScope,
  CurrentUserService,
  $state,
  $stateParams,
  $timeout,
  $http,
  API,
  spinnerService,
  User,
  Comment
) {
  const vm = this;
  // save the tachyons classes in one place
  vm.container = 'ph2 ph4-ns mb0-ns mt0-ns mt5 pt2';
  vm.showpage  = 'w-75-l w-100 center ph2 ph4-ns mb0-ns pb5 mt0-ns mt5 pt2';
  vm.loginform = 'w-third-l w-50-m w-100 ph2 ph0-ns center mv5 pt2 pt0-ns';
  vm.form      = 'w-75-l w-100 center ph2 ph4-ns mb0-ns mt0-ns mt5 pt2';
  vm.input     = 'db w-100 br-pill ph2 ba b--black';
  vm.link      = 'link underline dark-green hover-green';
  vm.indexpage = 'mb0 mt5 mt0-ns bt b--moon-gray bg-white bb w-100 ph2 ph4-ns pv2';
  vm.button    = 'bg-white ba b--black br-pill ph2';
  vm.textarea  = 'bg-white ph3 lh-copy br3 b--moon-gray ba';

  // stop landing page flashing when logged in
  vm.hidden = true;
  vm.load = function() {
    // spinnerService.hide('spinner');
    vm.hidden = false;
    if (!vm.user.about) vm.user.about = 'Nothing here yet.';
    vm.editedUser = {};
    vm.editedUser.about = vm.user.about;
    vm.editedUser.image = vm.user.image;
    // console.log('load', vm.user);
  };
  // logout/in functions
  $rootScope.loggedIn = false;
  $rootScope.$on('loggedOut', () => {
    $rootScope.currentUser = null;
    $rootScope.loggedIn = false;
  });

  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
    $rootScope.currentUser = CurrentUserService.currentUser;
    $rootScope.loggedIn = true;
    vm.load();
  });

  vm.logout = () => {
    vm.menuIsHidden = true;
    CurrentUserService.removeUser();
    $rootScope.user = null;
    vm.user = null;
    $state.go('home');
  };
  // navbar menu
  vm.menuIsHidden = true;
  vm.showMenu = function showMenu() {
    if (vm.menuIsHidden) vm.menuIsHidden = false;
    else vm.menuIsHidden = true;
  };
  // edit user
  vm.showImageEdit = false;
  vm.imageEdit = function() {
    if (!vm.showImageEdit) vm.showImageEdit = true;
    else {
      vm.showImageEdit = false; vm.editedUser.image = vm.user.image;
    }
  };
  vm.aboutEdit = function() {
    if (vm.user.about === 'Nothing here yet.') vm.editedUser.about = '';
    if (!vm.showAboutEdit) vm.showAboutEdit = true;
    else {
      vm.showAboutEdit = false; vm.editedUser.about = vm.user.about;
    }
  };

  vm.updateUser = function() {
    spinnerService.show('spinner');
    if (!vm.user.about) vm.user.about = 'Nothing here yet.';
    vm.user.image = vm.editedUser.image;
    vm.user.about = vm.editedUser.about;
    User
      .update({ id: vm.user.username }, vm.editedUser)
      .$promise
      .then(() => {
        spinnerService.hide('spinner');
        vm.showImageEdit = false;
        vm.showAboutEdit = false;
        vm.saved = true;
        $timeout(() => {
          vm.saved = false;
        }, 1000);
      });
  };
}
