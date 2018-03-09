//setter
angular.module('mi_alumni_directory', ['angularModalService', 'ngBootbox', 'toastersService']);

'use strict';

(function () {
  angular.module('mi_alumni_directory')
    .controller('miAlumniDirectoryController', miAlumniDirectoryController);

  miAlumniDirectoryController.$inject = ['$scope', '$ngBootbox', 'toasterService', 'miAlumniDirectoryFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'ModalService'];

  function miAlumniDirectoryController($scope, $ngBootbox, toasterService, miAlumniDirectoryFactory, customsDataTables, $routeParams, $window, $location, ModalService) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.miAlumniDirectory = [];

    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getMiAlumniDirectory = function () {
      miAlumniDirectoryFactory.getMiAlumniDirectory(null)
        .then(function (res) {
          $scope.miAlumniDirectory = res.data;
        });
    }
  }
})();