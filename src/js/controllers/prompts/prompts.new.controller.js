angular
  .module('collabApp')
  .controller('PromptsNewCtrl', PromptsNewCtrl);

PromptsNewCtrl.$inject = ['Prompt', '$state'];
function PromptsNewCtrl(Prompt, $state) {
  const vm = this;
  vm.create = promptsCreate;
  vm.prompt = {};
  function promptsCreate() {
    Prompt
      .save(vm.prompt)
      .$promise
      .then(prompt => {
        $state.go('promptsShow', { id: prompt.id });
        console.log(vm.prompt);
      })
      .catch(err => {
        console.log(err);
        if (err.status === 401) $state.go('login');
        vm.error = err;
      });
  }
}
