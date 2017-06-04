angular
  .module('collabApp')
  .controller('PromptsIndexCtrl', PromptsIndexCtrl)
  .controller('PromptsShowCtrl', PromptsShowCtrl)
  .controller('PromptsIndexUserCtrl', PromptsIndexUserCtrl);

PromptsIndexCtrl.$inject = ['Prompt'];
function PromptsIndexCtrl(Prompt) {
  const vm = this;
  vm.all = Prompt.query();
}

PromptsShowCtrl.$inject = ['Prompt', '$stateParams'];
function PromptsShowCtrl(Prompt, $stateParams) {
  const vm = this;
  vm.prompt = Prompt.get({ id: $stateParams.id });
}

PromptsIndexUserCtrl.$inject = ['Prompt', '$stateParams'];
function PromptsIndexUserCtrl(Prompt, $stateParams) {
  const vm = this;
  console.log('PARAMS: ', $stateParams);
  vm.all = Prompt.query({ user_id: $stateParams.userId });
}
