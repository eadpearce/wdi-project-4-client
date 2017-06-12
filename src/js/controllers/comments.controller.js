angular
  .module('collabApp')
  .controller('CommentsShowCtrl', CommentsShowCtrl);

CommentsShowCtrl.$inject = [
  'spinnerService',
  '$stateParams',
  '$timeout',
  'Comment'
];
function CommentsShowCtrl(
  spinnerService,
  $stateParams,
  $timeout,
  Comment
) {
  const vm = this;
  // vm.fill = Fill.get({ id: $stateParams.id });

  vm.showCommentEdit = function() {
    if (!vm.showCommentEditForm) vm.showCommentEditForm = true;
    else {
      vm.showCommentEditForm = false; vm.editedComment.body = vm.comment.body;
    }
  };
  vm.saved = false;
  vm.editedComment = {};
  vm.edit = function() {
    spinnerService.show('spinner');
    vm.comment.body = vm.editedComment.body;
    Comment
      .update({ id: vm.comment.id }, vm.editedComment)
      .$promise
      .then(() => {
        spinnerService.hide('spinner');
        vm.showCommentEditForm = false;
        vm.saved = true;
        $timeout(() => {
          vm.saved = false;
        }, 1000);
      });
  };
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
        vm.editedComment.body = vm.comment.body;
        spinnerService.hide('spinner');
      }, 200);
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  };
}
