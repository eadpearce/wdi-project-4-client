angular
  .module('collabApp')
  .config(Router);

Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/views/home.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/js/views/register.html',
      controller: 'RegisterCtrl',
      controllerAs: 'register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/js/views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/js/views/users/show.html',
      controller: 'UsersShowCtrl',
      controllerAs: 'users'
    })
    .state('promptsIndex', {
      url: '/prompts',
      templateUrl: '/js/views/prompts/index.html',
      controller: 'PromptsIndexCtrl',
      controllerAs: 'prompts'
    })
    .state('promptsIndexUser', {
      url: '/users/:userId/prompts',
      templateUrl: '/js/views/prompts/index.html',
      controller: 'PromptsIndexUserCtrl',
      controllerAs: 'prompts'
    })
    .state('promptsShow', {
      url: '/prompts/{id:int}',
      templateUrl: '/js/views/prompts/show.html',
      controller: 'PromptsShowCtrl',
      controllerAs: 'prompts'
    })
    .state('promptsNew', {
      url: '/prompts/new',
      templateUrl: '/js/views/prompts/new.html',
      controller: 'PromptsNewCtrl',
      controllerAs: 'prompts'
    })
    .state('fillsIndexUser', {
      url: '/users/:author/fills',
      templateUrl: '/js/views/fills/index.html',
      controller: 'FillsIndexUserCtrl',
      controllerAs: 'fills'
    })
    .state('fillsIndex', {
      url: '/fills',
      templateUrl: '/js/views/fills/index.html',
      controller: 'FillsIndexCtrl',
      controllerAs: 'fills'
    })
    .state('fillsShow', {
      url: '/fills/{id:int}',
      templateUrl: '/js/views/fills/show.html',
      controller: 'FillsShowCtrl',
      controllerAs: 'fills'
    })
    .state('fillsNew', {
      url: '/fills/new',
      templateUrl: '/js/views/fills/new.html',
      controller: 'FillsNewCtrl',
      controllerAs: 'fills'
    });

  $urlRouterProvider.otherwise('/');
}
