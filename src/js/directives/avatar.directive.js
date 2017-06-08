angular
  .module('collabApp')
  .directive('avatar', avatar);

avatar.$inject = [];
function avatar() {
  const directive = {};
  directive.restrict = 'E';
  directive.replace = true; // replace the directive when called with the template
  directive.templateUrl ='/js/views/templates/avatar.html';
  directive.scope = {
    image: '=',
    width: '@'
  };
  return directive;
}
