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
      templateUrl: '/js/views/home.html'
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
    .state('about', {
      url: '/about',
      templateUrl: '/js/views/about.html',
      controllerAs: 'about'
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
    .state('promptsIndexTag', {
      url: '/tags/:tag/prompts',
      templateUrl: '/js/views/prompts/indexbytag.html',
      controller: 'PromptsIndexTagCtrl',
      controllerAs: 'prompts'
    })
    .state('promptsIndexUser', {
      url: '/users/:user/prompts',
      templateUrl: '/js/views/prompts/indexbyuser.html',
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
      url: '/users/:user/fills',
      templateUrl: '/js/views/fills/indexbyuser.html',
      controller: 'FillsIndexUserCtrl',
      controllerAs: 'fills'
    })
    .state('fillsIndexTag', {
      url: '/tags/:tag/fills',
      templateUrl: '/js/views/fills/indexbytag.html',
      controller: 'FillsIndexTagCtrl',
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
      url: '/prompts/:prompt/fills/new',
      templateUrl: '/js/views/fills/new.html',
      controller: 'FillsNewCtrl',
      controllerAs: 'fills'
    })
    .state('tagsIndex', {
      url: '/tags',
      templateUrl: '/js/views/tags/index.html',
      controller: 'TagsIndexCtrl',
      controllerAs: 'tags'
    })
    .state('commentsShow', {
      url: '/comments/{id:int}',
      templateUrl: '/js/views/comments/show.html',
      controller: 'CommentsShowCtrl',
      controllerAs: 'comments'
    })
    .state('commentsNewFill', {
      url: '/fills/{fill:int}/comments/new',
      templateUrl: '/js/views/comments/new.html',
      controller: 'CommentsNewFillCtrl',
      controllerAs: 'comments'
    })
    .state('commentsNewPrompt', {
      url: '/prompts/{prompt:int}/comments/new',
      templateUrl: '/js/views/comments/new.html',
      controller: 'CommentsNewPromptCtrl',
      controllerAs: 'comments'
    });

  $urlRouterProvider.otherwise('/');
}
