angular
  .module('collabApp')
  .controller('PromptsIndexCtrl', PromptsIndexCtrl)
  .controller('PromptsShowCtrl', PromptsShowCtrl)
  .controller('PromptsNewCtrl', PromptsNewCtrl)
  .controller('PromptsIndexTagCtrl', PromptsIndexTagCtrl)
  .controller('PromptsIndexUserCtrl', PromptsIndexUserCtrl);

PromptsIndexCtrl.$inject = ['Prompt', 'filterFilter', '$scope', 'spinnerService'];
function PromptsIndexCtrl(Prompt, filterFilter, $scope, spinnerService) {
  const vm = this;
  // hide stuff until everything has loaded
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Prompt
      .query()
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.all = data;
        spinnerService.hide('spinner');
      })
      .catch(err => console.log(err));
  };

  // SEARCH OPTIONS
  vm.limit = 100;
  vm.isFilteredByFilled = false;
  vm.isFilteredByUnfilled = false;
  vm.searchIsHidden = true;
  vm.clearSearch = function clearSearch() {
    if (!vm.clearedSearch) vm.clearedSearch = true;
    else vm.clearedSearch = false;
  };
  vm.searchOptions = function searchOptions() {
    if (vm.searchIsHidden) vm.searchIsHidden = false;
    else vm.searchIsHidden = true;
  };
  function filterPrompts() {
    const params = { title: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }
  $scope.$watchGroup([
    () => vm.q
  ], filterPrompts);
}

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

PromptsShowCtrl.$inject = ['Prompt', '$stateParams', 'spinnerService'];
function PromptsShowCtrl(Prompt, $stateParams, spinnerService) {
  const vm = this;
  // vm.prompt = Prompt.get({ id: $stateParams.id });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Prompt
      .get({id: $stateParams.id})
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
}

PromptsIndexUserCtrl.$inject = ['Prompt', '$stateParams', 'User', 'API', 'spinnerService'];
function PromptsIndexUserCtrl(Prompt, $stateParams, User, API, spinnerService) {
  const vm = this;
  vm.user = User.get({ id: $stateParams.user });
  // vm.all = Prompt.query({ user_id: $stateParams.userId });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Prompt
      .query({user_id: $stateParams.user})
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.all = data;
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}

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
