angular
  .module('collabApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = [
  'User',
  '$stateParams',
  '$http',
  'API',
  'spinnerService',
  '$timeout',
  '$state',
  '$rootScope'
];
function UsersShowCtrl(
  User,
  $stateParams,
  $http,
  API,
  spinnerService,
  $timeout,
  $state,
  $rootScope
) {
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
}
