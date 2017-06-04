angular
  .module('collabApp')
  .controller('PromptsIndexCtrl', PromptsIndexCtrl)
  .controller('PromptsShowCtrl', PromptsShowCtrl)
  .controller('PromptsNewCtrl', PromptsNewCtrl)
  .controller('PromptsIndexTagCtrl', PromptsIndexTagCtrl)
  .controller('PromptsIndexUserCtrl', PromptsIndexUserCtrl)
  .filter('filterByTags', filterByTags);

filterByTags.$inject = [];
function filterByTags() {
  return function (items, q) {
    const filtered = [];
    let tagFound;
    items.forEach(item => {
      item.tags.forEach(tag => {
        tagFound = tag.name === q;
      });
      if (tagFound) filtered.push(item);
    });
    return filtered;
  };
}

PromptsIndexCtrl.$inject = ['Prompt', 'filterFilter', '$scope'];
function PromptsIndexCtrl(Prompt, filterFilter, $scope) {
  const vm = this;
  vm.limit = 10;
  vm.clearSearch = function clearSearch() {
    if (!vm.clearedSearch) vm.clearedSearch = true;
    else vm.clearedSearch = false;
  };
  vm.isFilteredByFilled = false;
  vm.isFilteredByUnfilled = false;
  vm.all = Prompt.query();
  vm.showSearchOpts = false;
  vm.searchOptions = function searchOptions() {
    if (vm.showSearchOpts) vm.showSearchOpts = false;
    else vm.showSearchOpts = true;
  };

  function filterPrompts() {
    const params = { title: vm.q };
    // if (vm.useStrength) params.strength = vm.strength;
    // if (vm.useRoast) params.roast = vm.roast;
    vm.filtered = filterFilter(vm.all, params);
  }

  // filterCoffee();
  // watch multiple different values
  $scope.$watchGroup([
    () => vm.q
    // () => vm.strength,
    // () => vm.useStrength,
    // () => vm.roast,
    // () => vm.useRoast
  ], filterPrompts);
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
