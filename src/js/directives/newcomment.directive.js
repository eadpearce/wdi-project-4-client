angular
  .module('collabApp')
  .directive('newcomment', newcomment);

newcomment.$inject = [];
function newcomment() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/comments/new.html';
  directive.scope = {
    content: '='
  };
  return directive;
}
