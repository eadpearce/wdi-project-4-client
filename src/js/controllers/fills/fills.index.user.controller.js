angular
  .module('collabApp')
  .controller('FillsIndexUserCtrl', FillsIndexUserCtrl);

FillsIndexUserCtrl.$inject = ['$http', 'API', '$stateParams', 'User', 'spinnerService'];
function FillsIndexUserCtrl($http, API, $stateParams, User, spinnerService) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    User.get({ id: $stateParams.user }).$promise
    .then(user => {
      vm.user = user;
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
    $http
      .get(`${API}/users/${$stateParams.user}/fills`)
      .then(response => {
        spinnerService.hide('spinner');
        vm.hidden = false;
        vm.all = response.data;
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
