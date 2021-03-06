angular
  .module('collabApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = [
  'User',
  '$stateParams',
  '$http',
  'API',
  'spinnerService',
  '$timeout'
];
function UsersShowCtrl(
  User,
  $stateParams,
  $http,
  API,
  spinnerService,
  $timeout
) {
  const vm = this;

  vm.hidden = true;
  vm.loadUser = function () {
    spinnerService.show('spinner');
    $http.get(`${API}/users/${$stateParams.id}`)
    .then(response => {
      if (!vm.user) console.log('nope');
      console.log('user', response);
      vm.hidden = false;
      spinnerService.hide('spinner');
      vm.user = response.data;
      if (!vm.user.about) {
        vm.user.about = 'Nothing here yet';
      }
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  };
}
