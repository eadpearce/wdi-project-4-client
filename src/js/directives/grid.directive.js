angular
  .module('collabApp')
  .directive('grid', grid);

grid.$inject = [];
function grid() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/grid.html';
  directive.scope = {
    type: '@',
    page: '@',
    width: '@',
    content: '=',
    search: '=',
    filled: '=',
    unfilled: '=',
    limit: '='
  };
  return directive;
}
