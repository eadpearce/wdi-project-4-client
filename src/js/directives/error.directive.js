angular
  .module('collabApp')
  .directive('error', error);

error.$inject = [];
function error() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/error.html';
  directive.scope = {
    style: '=',
    status: '='
  };
  return directive;
}
