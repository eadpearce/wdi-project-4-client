angular
  .module('collabApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', '$http', 'API', 'spinnerService', '$timeout', '$state', '$rootScope'];
function UsersShowCtrl(User, $stateParams, $http, API, spinnerService, $timeout, $state, $rootScope) {
  const vm = this;

  vm.hidden = true;
  vm.loadUser = function () {
    spinnerService.show('spinner');
    $http.get(`${API}/users/${$stateParams.id}`)
    .then(response => {
      $timeout(() => {
        vm.hidden = false;
        spinnerService.hide('spinner');
        vm.user = response.data;
        if (!vm.user.about) {
          vm.user.about = 'Nothing here yet';
        }
      }, 200);
    });
  };
  // EDIT FORM
  vm.showEditForm = false;
  vm.editUser = function() {
    if (!vm.showEditForm) vm.showEditForm = true;
    else vm.showEditForm = false;
  };
  vm.update = function() {
    if (vm.user.about === 'Nothing here yet') vm.user.about = '';
    vm.showEditForm = false;
    vm.editedUser = {};
    vm.editedUser.about = vm.user.about;
    console.log('VM.USER',vm.user.username);
    console.log('LOGGED IN USER', $rootScope.currentUser.username);
    User
      .update({ id: vm.user.username }, vm.editedUser)
      .$promise
      .then(() => {
        $state.go('usersShow', { id: vm.user.username });
        vm.editedUser = {};
      });
  };
}
