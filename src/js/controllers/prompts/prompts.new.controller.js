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
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  }
}
