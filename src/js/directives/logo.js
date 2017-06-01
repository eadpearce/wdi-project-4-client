angular
  .module('collabApp')
  .directive('logo', logo);

logo.$inject = [];
function logo() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/logo.html';
  directive.scope = {
    height: '@',
    width: '@'
  };
  // <logo question="">
  // '@' = get string val from attr -> <logo question="this value">
  // haha bc it's pronounced 'at' get it
  // '=' = take ng-model val and assign it to question
  // <logo ng-model="users.user"> question = users.user
  // '&' = pass returning val from a method [rarely used]
  // <logo ng-click="ctrl.method()"></logo> question = ctrl.method()

  return directive;
}
