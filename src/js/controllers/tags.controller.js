angular
  .module('collabApp')
  .controller('TagsIndexCtrl', TagsIndexCtrl);

TagsIndexCtrl.$inject = [
  'Tag'
];
function TagsIndexCtrl(
  Tag
) {
  const vm = this;
  vm.fill = false;
  vm.prompt = true;
  vm.load = function() {
    Tag.query().$promise
      .then(tags => {
        vm.all = tags;
      });
  };

}
