angular
  .module('collabApp')
  .controller('PromptsShowCtrl', PromptsShowCtrl);

PromptsShowCtrl.$inject = [
  'Prompt',
  '$stateParams',
  'spinnerService',
  'Comment',
  '$rootScope',
  '$state',
  '$timeout'
];
function PromptsShowCtrl(
  Prompt,
  $stateParams,
  spinnerService,
  Comment,
  $rootScope,
  $state,
  $timeout
) {
  const vm = this;
  // vm.prompt = Prompt.get({ id: $stateParams.id });
  vm.hidden = true;
  vm.load = function () {
    spinnerService.show('spinner');
    vm.editedPrompt = {};
    Prompt
      .get({id: $stateParams.id})
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.prompt = data;
        vm.editedPrompt.body = vm.prompt.body;
        vm.editedPrompt.title = vm.prompt.title;
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
  vm.showEdit = function() {
    if (!vm.showEditForm) vm.showEditForm = true;
    else {
      vm.showEditForm = false;
      vm.editedPrompt.body = vm.prompt.body;
      vm.editedPrompt.title = vm.prompt.title;
    }
  };
  vm.edit = function() {
    vm.showEditForm = false;
    spinnerService.show('spinner');
    vm.prompt.title = vm.editedPrompt.title;
    vm.prompt.body = vm.editedPrompt.body;
    Prompt
      .update({ id: vm.prompt.id }, vm.editedPrompt)
      .$promise
      .then(() => {
        spinnerService.hide('spinner');
        vm.saved = true;
        $timeout(() => {
          vm.saved = false;
        }, 1000);
      });
  };
  vm.deleteConfirm = function() {
    vm.showDeleteConfirm = true;
  };
  vm.deleteCancel = function() {
    vm.showDeleteConfirm = false;
    vm.showEditForm = false;
  };
  vm.delete = function() {
    Prompt.delete({ id: vm.prompt.id }).$promise
      .then(() => {
        spinnerService.hide('spinner');
        $state.go('home');
      });
  };
}
