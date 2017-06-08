angular
  .module('collabApp')
  .controller('CommentsShowCtrl', CommentsShowCtrl);

CommentsShowCtrl.$inject = ['spinnerService', '$stateParams', '$timeout', 'Comment'];
function CommentsShowCtrl(spinnerService, $stateParams, $timeout, Comment) {
  const vm = this;
  // vm.fill = Fill.get({ id: $stateParams.id });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Comment
    .get({id: $stateParams.id})
    .$promise
    .then(data => {
      $timeout(() => {
        vm.hidden = false;
        vm.comment = data;
        spinnerService.hide('spinner');
      }, 200);
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  };
}
