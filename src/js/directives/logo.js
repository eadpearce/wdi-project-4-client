angular
  .module('collabApp')
  .directive('logo', logo);

logo.$inject = [];
function logo() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/logo.html';
  return directive;
}
