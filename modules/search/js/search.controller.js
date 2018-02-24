//setter
angular.module('search', ['angularModalService']);

'use strict';

(function () {
  angular.module('search')
    .controller('searchController', searchController);

  searchController.$inject = ['$scope', 'searchFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'ModalService'];

  function searchController($scope, searchFactory, customsDataTables, $routeParams, $window, $location, ModalService) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.search = [];
    
    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getSearch = function () {
      searchFactory.getSearch(null)
        .then(function (res) {
          console.log(res);
          $scope.search = res.data;
        });
    }
  }
})();