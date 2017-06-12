angular
  .module('collabApp')
  .controller('FillsIndexCtrl', FillsIndexCtrl);

FillsIndexCtrl.$inject = [
  'Fill',
  'filterFilter',
  '$scope',
  'spinnerService'
];
function FillsIndexCtrl(
  Fill,
  filterFilter,
  $scope,
  spinnerService
) {
  const vm = this;
  // hide stuff until everything has loaded
  vm.hidden = true;
  vm.ratings = [
    { name: 'General', value: 'general' },
    { name: 'Teen', value: 'teen'  },
    { name: 'Mature', value: 'mature'  },
    { name: 'Explicit', value: 'explicit' },
    { name: 'Any', value: '' }
  ];
  vm.load = function () {
    spinnerService.show('spinner');
    Fill
      .query()
      .$promise
      .then(data => {
        vm.hidden = false;
        vm.all = data;
        spinnerService.hide('spinner');
      })
      .catch(err => {
        console.log(err);
        vm.error = err;
      });
  };

  // SEARCH OPTIONS
  vm.rating = '';
  vm.limit = 10;
  vm.pagination = 0;
  // if (vm.limit + vm.pagination > vm.all.length) vm.maxpage = vm.all.length;
  vm.maxpage = vm.limit + vm.pagination;
  if (vm.pagination + vm.limit === vm.limit) vm.max = vm.limit;
  else vm.max = vm.all.length;
  vm.next = function() {
    vm.pagination = vm.pagination + vm.limit;
    // console.log(vm.pagination);
  };
  vm.back = function() {
    if (vm.pagination !== 0) vm.pagination = vm.pagination - vm.limit;
    // console.log(vm.pagination);
  };
  vm.isFilteredByFilled = false;
  vm.isFilteredByUnfilled = false;
  vm.searchIsHidden = true;
  vm.clearSearch = function clearSearch() {
    if (!vm.clearedSearch) vm.clearedSearch = true;
    else vm.clearedSearch = false;
  };
  vm.searchOptions = function searchOptions() {
    if (vm.searchIsHidden) vm.searchIsHidden = false;
    else vm.searchIsHidden = true;
  };
  function filterFills() {
    const params = { title: vm.q };
    vm.filtered = filterFilter(vm.all, params);
  }
  $scope.$watchGroup([
    () => vm.q
  ], filterFills);
}
