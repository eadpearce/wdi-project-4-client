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
        vm.editedPrompt.rating = vm.prompt.rating;
        const tags = [];
        vm.prompt.tags.forEach(tag => {
          tags.push(tag.name);
        });
        vm.editedPrompt.tagged_as = tags.join(', ');
        console.log(vm.prompt);
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        if (err.status === 401) $state.go('login');
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
        if (err.status === 401) $state.go('login');
        vm.error = err;
      });
  };
  vm.showEdit = function() {
    if (!vm.showEditForm) vm.showEditForm = true;
    else {
      vm.showEditForm = false;
      vm.editedPrompt.body = vm.prompt.body;
      vm.editedPrompt.title = vm.prompt.title;
      vm.editedPrompt.rating = vm.prompt.rating;
    }
  };
  vm.edit = function() {
    vm.showEditForm = false;
    spinnerService.show('spinner');
    vm.prompt.title = vm.editedPrompt.title;
    vm.prompt.body = vm.editedPrompt.body;
    vm.prompt.rating = vm.editedPrompt.rating;
    vm.prompt.tagged_as = vm.editedPrompt.tagged_as;
    console.log(vm.prompt);

    Prompt
      .update({ id: vm.prompt.id }, vm.editedPrompt)
      .$promise
      .then(prompt => {
        spinnerService.hide('spinner');
        vm.saved = true;
        vm.prompt = prompt;
        const tags = [];
        vm.prompt.tags.forEach(tag => {
          tags.push(tag.name);
        });
        vm.editedPrompt.tagged_as = tags.join(', ');
        $timeout(() => {
          vm.saved = false;
        }, 1000);
      });
  };
  vm.deleteConfirm = function() {
    if (!vm.showDeleteConfirm) vm.showDeleteConfirm = true;
    else vm.showDeleteConfirm = false;
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
