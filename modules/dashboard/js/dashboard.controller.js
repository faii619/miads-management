//setter
angular.module('dashboard', ['angularModalService']);

'use strict';

(function () {
  angular.module('dashboard')
    .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'dashboardFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'ModalService'];

  function dashboardController($scope, dashboardFactory, customsDataTables, $routeParams, $window, $location, ModalService) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.dashboard = [];
    
    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getDashboard = function () {
      dashboardFactory.getDashboard(null)
        .then(function (res) {
          console.log(res);
          $scope.dashboard = res.data;
        });
    }
  }
})();