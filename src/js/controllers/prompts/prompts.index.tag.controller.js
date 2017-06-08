angular
  .module('collabApp')
  .controller('PromptsIndexTagCtrl', PromptsIndexTagCtrl);

PromptsIndexTagCtrl.$inject = ['Prompt', '$stateParams', 'Tag', 'spinnerService', '$http', 'API'];
function PromptsIndexTagCtrl(Prompt, $stateParams, Tag, spinnerService, $http, API) {
  const vm = this;
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Tag
      .get({ id: $stateParams.tag })
      .$promise
      .then(tag => {
        vm.tag = tag;
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
    $http
      .get(`${API}/tags/${$stateParams.tag}/prompts`)
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
