angular
  .module('collabApp')
  .controller('PromptsIndexUserCtrl', PromptsIndexUserCtrl);

PromptsIndexUserCtrl.$inject = ['$http', '$stateParams', 'User', 'API', 'spinnerService'];
function PromptsIndexUserCtrl($http, $stateParams, User, API, spinnerService) {
  const vm = this;
  vm.user = User.get({ id: $stateParams.user });
  // vm.all = Prompt.query({ user_id: $stateParams.userId });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    $http
      .get(`${API}/users/${$stateParams.user}/prompts`)
      .then(response => {
        vm.hidden = false;
        vm.all = response.data;
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
