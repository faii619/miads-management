//setter
angular.module('search', ['localytics.directives', 'angularModalService']);

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
    $scope.data_user = [{}];
    
    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    let logged_profile = localStorage.getItem('logged_profile');
    $scope.data_user = JSON.parse(logged_profile);
    
    $scope.getSearch = function () {
      searchFactory.getSearch(null)
        .then(function (res) {
          // console.log(res);
          $scope.search = res.data;
        });
    }
  }
})();