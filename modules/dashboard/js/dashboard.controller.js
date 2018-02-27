//setter
angular.module('dashboard', ['angularModalService', 'authen']);

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
          // console.log(res);
          $scope.dashboard = res.data;
        });
    }

    $scope.country_summary_by_country_id = function () {
      dashboardFactory.country_summary_by_country_id(null)
        .then(function (res) {
          $scope.countrys_count_by_country_id = res.data;
        });
    }

    $scope.countAlumni = function () {
      dashboardFactory.countAlumni(null)
        .then(function (res) {
          $scope.countAlumni = res.data;
        });
    }

    $scope.countCourtry = function () {
      dashboardFactory.countCourtry(null)
        .then(function (res) {
          $scope.countCourtry = res.data;
        });
    }
  }
})();