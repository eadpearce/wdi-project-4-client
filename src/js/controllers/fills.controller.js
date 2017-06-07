angular
  .module('collabApp')
  .controller('FillsIndexCtrl', FillsIndexCtrl)
  .controller('FillsIndexUserCtrl', FillsIndexUserCtrl)
  .controller('FillsIndexTagCtrl', FillsIndexTagCtrl)
  .controller('FillsNewCtrl', FillsNewCtrl)
  .controller('FillsShowCtrl', FillsShowCtrl);

FillsIndexCtrl.$inject = ['Fill'];
function FillsIndexCtrl(Fill) {
  const vm = this;
  vm.all = Fill.query();
}

FillsShowCtrl.$inject = ['Fill', '$stateParams', 'spinnerService', 'Comment'];
function FillsShowCtrl(Fill, $stateParams, spinnerService, Comment) {
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
  vm.showCommentForm = false;
  vm.newComment = function() {
    if (!vm.showCommentForm) vm.showCommentForm = true;
    else vm.showCommentForm = false;
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

FillsNewCtrl.$inject = ['Fill', 'Prompt', '$state', '$stateParams', 'spinnerService'];
function FillsNewCtrl(Fill, Prompt, $state, $stateParams, spinnerService) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    Prompt
    .get({id: $stateParams.prompt})
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
  vm.fill = {};
  vm.create = function() {
    vm.fill.prompt_id = vm.prompt.id;
    Fill
      .save(vm.fill)
      .$promise
      .then(fill => {
        $state.go('fillsShow', { id: fill.id });
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };
}

FillsIndexUserCtrl.$inject = ['Fill', '$stateParams', 'User', 'spinnerService'];
function FillsIndexUserCtrl(Fill, $stateParams, User, spinnerService) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    User.get({ id: $stateParams.user }).$promise
    .then(user => {
      vm.user = user;
    })
    .catch(err => {
      console.log(err);
      vm.error = err;
    });
    Fill
      .query({ user_id: $stateParams.user })
      .$promise
      .then(fills => {
        spinnerService.hide('spinner');
        vm.hidden = false;
        vm.all = fills;
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };

}

FillsIndexTagCtrl.$inject = ['Fill', 'Tag', '$stateParams', 'spinnerService', '$http', 'API'];
function FillsIndexTagCtrl(Fill, Tag, $stateParams, spinnerService, $http, API) {
  const vm = this;
  vm.hidden = true;
  vm.load = function() {
    spinnerService.show('spinner');
    Tag
      .get({id: $stateParams.tag})
      .$promise
      .then(tag => vm.tag = tag)
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
    $http
      .get(`${API}/tags/${$stateParams.tag}/fills`)
      .then(response => {
        vm.hidden = false;
        vm.all = response.data;
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };

}
