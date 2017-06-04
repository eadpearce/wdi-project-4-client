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

FillsShowCtrl.$inject = ['Fill', '$stateParams'];
function FillsShowCtrl(Fill, $stateParams) {
  const vm = this;
  vm.fill = Fill.get({ id: $stateParams.id });
}

FillsNewCtrl.$inject = ['Fill', '$state'];
function FillsNewCtrl(Fill, $state) {
  const vm = this;
  vm.create = fillsCreate;
  function fillsCreate() {
    Fill
      .save(vm.fill)
      .$promise
      .then(fill => {
        console.log(fill);
        $state.go('fillsShow', { id: fill.id });
      });
  }
}

FillsIndexUserCtrl.$inject = ['Fill', '$stateParams', '$http', 'API'];
function FillsIndexUserCtrl(Fill, $stateParams, $http, API) {
  const vm = this;
  // console.log('FILL PARAMS: ',$stateParams.author);
  $http
    .get(`${API}/users/${$stateParams.author}/fills`)
    .then(fills => {
      vm.all = fills.data;
      // console.log('FILLS: ', vm.all);
    });
}
