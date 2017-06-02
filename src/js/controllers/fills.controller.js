angular
  .module('collabApp')
  .controller('FillsIndexCtrl', FillsIndexCtrl);

FillsIndexCtrl.$inject = ['$resource', 'Fill'];
function FillsIndexCtrl($resource, Fill) {
  const vm = this;
  vm.all = Fill.query();
}
