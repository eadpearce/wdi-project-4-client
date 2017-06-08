angular
  .module('collabApp')
  .controller('PromptsShowCtrl', PromptsShowCtrl);

PromptsShowCtrl.$inject = ['Prompt', '$stateParams', 'spinnerService', 'Comment', '$rootScope', '$state'];
function PromptsShowCtrl(Prompt, $stateParams, spinnerService, Comment, $rootScope, $state) {
  const vm = this;
  // vm.prompt = Prompt.get({ id: $stateParams.id });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    Prompt
      .get({id: $stateParams.id})
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.prompt = data;
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
    vm.comment.prompt_id = vm.prompt.id;
    Comment
      .save(vm.comment)
      .$promise
      .then(comment => {
        vm.prompt.comments.push(comment);
        vm.showCommentForm = false;
        vm.comment = {};
        // $state.go('promptsShow', { id: vm.comment.prompt_id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
