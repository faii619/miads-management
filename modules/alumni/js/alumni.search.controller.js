// setter
angular.module('alumni', ['localytics.directives', 'programs']);

'use strict';

(function () {
  angular.module('alumni')
    .controller('alumniSearchController', alumniSearchController);

  alumniSearchController.$inject = ['$scope', 'alumniFactory', 'customsDataTables', 'programsFactory'];

  function alumniSearchController($scope, alumniFactory, customsDataTables, programsFactory) {
    // initialize param to object
    $scope.params = {};
    $scope.alumni = [];
    $scope.programs = [];
    $scope.organizes = [];
    $scope.country = [];
    
    $scope.getAlumni = function () {
      alumniFactory.getAllAlumni()
        .then(function (res) {
          $scope.alumni = res.data;
        });
    }

    $scope.getAllPrograms = function () {
      programsFactory.getAllPrograms()
        .then(function (res) {
          $scope.programs = res.data;
        });
    }

    $scope.getAllOrganizationType = function () {
      alumniFactory.getCareerOrganizationType()
        .then(function (res) {
          $scope.organizes = res.data;
        });
    }

    $scope.searchAlumni = function () {

    }

  }
})();