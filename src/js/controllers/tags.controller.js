angular
  .module('collabApp')
  .controller('TagsIndexCtrl', TagsIndexCtrl);

TagsIndexCtrl.$inject = ['Tag'];
function TagsIndexCtrl(Tag) {
  const vm = this;
  vm.all = Tag.query();
}
