angular
  .module('collabApp')
  .directive('logosmall', logosmall);

logosmall.$inject = [];
function logosmall() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/logo_small.html';
  return directive;
}
