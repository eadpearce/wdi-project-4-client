angular
  .module('collabApp')
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersShowCtrl.$inject = ['User', '$stateParams', '$http', 'API'];
function UsersShowCtrl(User, $stateParams, $http, API) {
  const vm = this;
  $http.get(`${API}/users/${$stateParams.id}`)
  .then(response => {
    vm.user = response.data;
    if (!vm.user.about) {
      vm.user.about = 'Nothing here yet';
    }
  });

}
