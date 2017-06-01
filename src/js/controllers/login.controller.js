angular
  .module('collabApp')
  .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {
  const vm = this;

  vm.login = login;
  function login() {
    User
      .login(vm.user)
      .$promise
      .then(data => {
        console.log('LOGGED IN: ', data.message);
        CurrentUserService.getUser();
        $state.go('home');
      }, err => {
        console.log('ERROR: ',err);
      });
  }
}
