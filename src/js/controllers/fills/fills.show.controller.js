angular
  .module('collabApp')
  .controller('FillsShowCtrl', FillsShowCtrl);

FillsShowCtrl.$inject = ['Fill', '$stateParams', 'spinnerService', 'Comment', '$rootScope', '$state'];
function FillsShowCtrl(Fill, $stateParams, spinnerService, Comment, $rootScope, $state) {
  const vm = this;
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Fill
      .get({id: $stateParams.id})
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.fill = data;
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };

  // NEW COMMENT FORM
  vm.showCommentForm = false;
  vm.newComment = function() {
    if ($rootScope.loggedIn) {
      if (!vm.showCommentForm) vm.showCommentForm = true;
      else vm.showCommentForm = false;
    } else $state.go('login');
  };

  vm.comment = {};
  vm.createComment = function() {
    console.log('hi');
    vm.comment.fill_id = vm.fill.id;
    Comment
      .save(vm.comment)
      .$promise
      .then(comment => {
        vm.fill.comments.push(comment);
        vm.showCommentForm = false;
        vm.comment = {};
        console.log(comment);
        // $state.go('fillsShow', { id: vm.comment.fill_id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
