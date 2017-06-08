angular
  .module('collabApp')
  .controller('FillsIndexCtrl', FillsIndexCtrl);

FillsIndexCtrl.$inject = ['Fill'];
function FillsIndexCtrl(Fill) {
  const vm = this;
  vm.all = Fill.query();
}
