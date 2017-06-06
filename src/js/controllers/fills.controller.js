angular
  .module('collabApp')
  .controller('FillsIndexCtrl', FillsIndexCtrl)
  .controller('FillsIndexUserCtrl', FillsIndexUserCtrl)
  .controller('FillsNewCtrl', FillsNewCtrl)
  .controller('FillsShowCtrl', FillsShowCtrl);

FillsIndexCtrl.$inject = ['Fill'];
function FillsIndexCtrl(Fill) {
  const vm = this;
  vm.all = Fill.query();
}

FillsShowCtrl.$inject = ['Fill', '$stateParams', 'spinnerService', '$timeout', '$rootScope'];
function FillsShowCtrl(Fill, $stateParams, spinnerService, $timeout, $rootScope) {
  const vm = this;
  // vm.fill = Fill.get({ id: $stateParams.id });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Fill
      .get({id: $stateParams.id})
      .$promise
      .then(data => {
        $timeout(() => {
          vm.hidden = false;
          vm.fill = data;
          spinnerService.hide('spinner');
        }, 200);
      })
      .catch(err => {
        console.log(err);
        $rootScope.pageerror = err;
      });
  };
}

FillsNewCtrl.$inject = ['Fill', '$state', '$stateParams', '$http', 'API'];
function FillsNewCtrl(Fill, $state, $stateParams, $http, API) {
  const vm = this;
  console.log($stateParams.prompt);
  $http
    .get(`${API}/prompts/${$stateParams.prompt}`)
    .then(response => {
      vm.prompt = response.data;
      // console.log('FILLS: ', vm.all);
    });
  vm.fill = {};
  vm.create = function() {
    vm.fill.prompt_id = vm.prompt.id;
    Fill
      .save(vm.fill)
      .$promise
      .then(fill => {
        console.log(fill);
        $state.go('fillsShow', { id: fill.id });
      });
  };
}

FillsIndexUserCtrl.$inject = ['Fill', '$stateParams', '$http', 'API', 'User'];
function FillsIndexUserCtrl(Fill, $stateParams, $http, API, User) {
  const vm = this;
  // console.log('FILL PARAMS: ',$stateParams.author);
  vm.user = User.get({ id: $stateParams.user });
  $http
    .get(`${API}/users/${$stateParams.user}/fills`)
    .then(fills => {
      vm.all = fills.data;
      // console.log('FILLS: ', vm.all);
    });
}

FillsIndexPromptCtrl.$inject = ['Fill', '$stateParams', '$http', 'API'];
function FillsIndexPromptCtrl(Fill, $stateParams, $http, API) {
  const vm = this;
  // console.log('FILL PARAMS: ',$stateParams.author);
  $http
    .get(`${API}/prompts/${$stateParams.prompt}/fills`)
    .then(fills => {
      vm.all = fills.data;
      // console.log('FILLS: ', vm.all);
    });
}
