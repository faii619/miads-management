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
    $scope.content = [];

    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getMiAlumniDirectory = function () {
      miAlumniDirectoryFactory.getMiAlumniDirectory(null)
        .then(function (res) {
          $scope.miAlumniDirectory = res.data;
          $scope.content = res.data[0]['content'];
        });
    }

    $scope.submit = function () {
      let params = {
        id: 0,
        content: $scope.content,
      }

      $ngBootbox.confirm('Do you want to save ?')
        .then(function () {
          miAlumniDirectoryFactory.setMiAlumniDirectoryContent(params)
            .then(function (res) {
              if (res.data.status == 1) {
                toasterService.toaster_success();
                $scope.miAlumniDirectory = res.data;
                // $scope.getMiAlumniDirectory();
              }
            });
        }, function () {
          console.log('cancel');
        });
    }
  }
})();