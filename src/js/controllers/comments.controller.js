angular
  .module('collabApp')
  .controller('CommentsShowCtrl', CommentsShowCtrl)
  .controller('CommentsNewPromptCtrl', CommentsNewPromptCtrl)
  .controller('CommentsNewFillCtrl', CommentsNewFillCtrl);

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

CommentsNewPromptCtrl.$inject = ['Prompt', 'Comment', '$state', '$stateParams'];
function CommentsNewPromptCtrl(Prompt, Comment, $state, $stateParams) {
  const vm = this;
  Prompt
    .get({id: $stateParams.prompt})
    .$promise
    .then(data => {
      vm.parent = data;
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  vm.comment = {};
  vm.create = function() {
    vm.comment.prompt_id = vm.parent.id;
    Comment
      .save(vm.comment)
      .$promise
      .then(comment => {
        console.log(comment);
        $state.go('promptsShow', { id: vm.comment.prompt_id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
CommentsNewFillCtrl.$inject = ['Fill', 'Comment', '$state', '$stateParams'];
function CommentsNewFillCtrl(Fill, Comment, $state, $stateParams) {
  const vm = this;
  Fill
    .get({id: $stateParams.fill})
    .$promise
    .then(data => {
      vm.parent = data;
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
  vm.comment = {};
  vm.create = function() {
    vm.comment.fill_id = vm.parent.id;
    Comment
      .save(vm.comment)
      .$promise
      .then(comment => {
        console.log(comment);
        $state.go('fillsShow', { id: vm.comment.fill_id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}
