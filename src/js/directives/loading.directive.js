angular
  .module('collabApp')
  .directive('loading', loading);

loading.$inject = [];
function loading() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/loading.html';
  directive.scope = {
    hide: '=',
    loadfunc: '='
  };
  return directive;
}
