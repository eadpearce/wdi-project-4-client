angular
  .module('collabApp')
  .controller('FillsIndexTagCtrl', FillsIndexTagCtrl);

FillsIndexTagCtrl.$inject = ['Fill', 'Tag', '$stateParams', 'spinnerService', '$http', 'API'];
function FillsIndexTagCtrl(Fill, Tag, $stateParams, spinnerService, $http, API) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    Tag
      .get({id: $stateParams.tag})
      .$promise
      .then(tag => vm.tag = tag)
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
    $http
      .get(`${API}/tags/${$stateParams.tag}/fills`)
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
