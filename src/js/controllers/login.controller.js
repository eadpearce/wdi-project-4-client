angular
  .module('collabApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = function () {
    User
      .login(vm.user)
      .$promise
      .then(() => {
        CurrentUserService.getUser();
        $state.go('home');
      }, err => {
        console.log('ERROR: ',err);
        vm.error = err;
      });
  };
}
