angular
  .module('collabApp')
  .controller('PromptsIndexCtrl', PromptsIndexCtrl);

PromptsIndexCtrl.$inject = ['Prompt'];
function PromptsIndexCtrl(Prompt) {
  const vm = this;
  vm.all = Prompt.query();
}
