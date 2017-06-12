angular
  .module('collabApp')
  .controller('FillsShowCtrl', FillsShowCtrl);

FillsShowCtrl.$inject = [
  'Fill',
  '$stateParams',
  'spinnerService',
  'Comment',
  '$rootScope',
  '$state',
  '$timeout'
];
function FillsShowCtrl(
  Fill,
  $stateParams,
  spinnerService,
  Comment,
  $rootScope,
  $state,
  $timeout
) {
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
        if (vm.fill.rating === 'mature' || vm.fill.rating === 'explicit') vm.hideWork = true;
        else vm.hideWork = false;
        vm.editedFill = {};
        vm.editedFill.body = vm.fill.body;
        vm.editedFill.title = vm.fill.title;
        vm.general = false;
        vm.mature = false;
        vm.explicit = false;
        vm.teen = false;
        switch (vm.fill.rating) {
          case 'general': vm.general = true;
            break;
          case 'teen': vm.teen = true;
            break;
          case 'mature': vm.mature = true;
            break;
          case 'explicit': vm.explicit = true;
            break;
          default:
        }
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
        if (err.status === 401) $state.go('login');
        vm.error = err;
      });
  };
  vm.showEdit = function() {
    if (!vm.showEditForm) vm.showEditForm = true;
    else {
      vm.showEditForm = false;
      vm.editedFill.body = vm.fill.body;
      vm.editedFill.title = vm.fill.title;
    }
  };
  vm.edit = function() {
    if (vm.general) vm.editedFill.rating = 'general'; vm.general = false;
    if (vm.teen) vm.editedFill.rating = 'teen'; vm.teen = false;
    if (vm.mature) vm.editedFill.rating = 'mature'; vm.mature = false;
    if (vm.explicit) vm.editedFill.rating = 'explicit'; vm.explicit = false;
    vm.showEditForm = false;
    spinnerService.show('spinner');
    vm.fill.title = vm.editedFill.title;
    vm.fill.body = vm.editedFill.body;
    vm.fill.rating = vm.editedFill.rating;
    Fill
      .update({ id: vm.fill.id }, vm.editedFill)
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
    if (!vm.showDeleteConfirm) vm.showDeleteConfirm = true;
    else vm.showDeleteConfirm = false;
  };
  vm.deleteCancel = function() {
    vm.showDeleteConfirm = false;
    vm.showEditForm = false;
  };
  vm.delete = function() {
    Fill.delete({ id: vm.fill.id }).$promise
      .then(() => {
        spinnerService.hide('spinner');
        $state.go('home');
      });
  };
  vm.show = function() {
    vm.hideWork = false;
  };
}
