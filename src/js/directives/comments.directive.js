angular
  .module('collabApp')
  .directive('comments', comments);

comments.$inject = [];
function comments() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/comments.html';
  directive.scope = {
    content: '='
  };
  return directive;
}
