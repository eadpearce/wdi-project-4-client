angular
  .module('collabApp')
  .controller('PromptsIndexCtrl', PromptsIndexCtrl)
  .controller('PromptsShowCtrl', PromptsShowCtrl)
  .controller('PromptsNewCtrl', PromptsNewCtrl)
  .controller('PromptsIndexTagCtrl', PromptsIndexTagCtrl)
  .controller('PromptsIndexUserCtrl', PromptsIndexUserCtrl);

PromptsIndexCtrl.$inject = ['Prompt'];
function PromptsIndexCtrl(Prompt) {
  const vm = this;
  vm.all = Prompt.query();
}

PromptsNewCtrl.$inject = ['Prompt', '$state'];
function PromptsNewCtrl(Prompt, $state) {
  const vm = this;
  vm.create = promptsCreate;
  vm.prompt = {};
  function promptsCreate() {
    // console.log(vm.prompt)
    Prompt
      .save(vm.prompt)
      .$promise
      .then(prompt => {
        // console.log(prompt)
        $state.go('promptsShow', { id: prompt.id });
      });
  }
}

PromptsShowCtrl.$inject = ['Prompt', '$stateParams'];
function PromptsShowCtrl(Prompt, $stateParams) {
  const vm = this;
  vm.prompt = Prompt.get({ id: $stateParams.id });
}

PromptsIndexUserCtrl.$inject = ['Prompt', '$stateParams'];
function PromptsIndexUserCtrl(Prompt, $stateParams) {
  const vm = this;
  vm.all = Prompt.query({ user_id: $stateParams.userId });
}

PromptsIndexTagCtrl.$inject = ['Prompt', '$stateParams', '$http', 'API'];
function PromptsIndexTagCtrl(Prompt, $stateParams, $http, API) {
  const vm = this;
  $http
    .get(`${API}/tags/${$stateParams.tag}/prompts`)
    .then(response => {
      vm.all = response.data;
    });
}
