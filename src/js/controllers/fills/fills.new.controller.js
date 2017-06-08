angular
  .module('collabApp')
  .controller('FillsNewCtrl', FillsNewCtrl);

FillsNewCtrl.$inject = ['Fill', 'Prompt', '$state', '$stateParams', 'spinnerService'];
function FillsNewCtrl(Fill, Prompt, $state, $stateParams, spinnerService) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    Prompt
    .get({id: $stateParams.prompt})
    .$promise
    .then(data => {
      vm.hidden = false;
      vm.prompt = data;
      spinnerService.hide('spinner');
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  };
  vm.fill = {};
  vm.create = function() {
    vm.fill.prompt_id = vm.prompt.id;
    Fill
      .save(vm.fill)
      .$promise
      .then(fill => {
        $state.go('fillsShow', { id: fill.id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
