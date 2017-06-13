angular
  .module('collabApp')
  .controller('FillsNewCtrl', FillsNewCtrl);

FillsNewCtrl.$inject = ['Fill', 'Prompt', '$state', '$stateParams', 'spinnerService'];
function FillsNewCtrl(Fill, Prompt, $state, $stateParams, spinnerService) {
  const vm = this;
  vm.hidden = true;
  vm.ratings = [
    { name: 'General', value: 'general' },
    { name: 'Teen', value: 'teen' },
    { name: 'Mature', value: 'mature' },
    { name: 'Explicit', value: 'explicit' }
  ];
  vm.load = function() {
    spinnerService.show('spinner');
    Prompt
    .get({id: $stateParams.prompt})
    .$promise
    .then(data => {
      vm.hidden = false;
      vm.prompt = data;
      // console.log(vm.prompt.tags);
      spinnerService.hide('spinner');
    })
    .catch(err => {
      console.log(err);
      if (err.status === 401) $state.go('login');
      vm.error = err;
    });
  };
  vm.fill = {};
  vm.rating = null;
  vm.invalid = false;
  vm.create = function() {
    // console.log(vm.fill);
    if (vm.fill.rating) {
      vm.fill.prompt_id = vm.prompt.id;
      console.log(vm.fill);
      Fill
        .save(vm.fill)
        .$promise
        .then(fill => {
          $state.go('fillsShow', { id: fill.id });
        })
        .catch(err => {
          console.log(err);
          if (err.status === 401) $state.go('login');
          vm.error = err;
        });
    } else vm.invalid = true;

  };
}
