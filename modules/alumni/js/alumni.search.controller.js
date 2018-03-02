// setter
angular.module('alumni', ['localytics.directives', 'programs', 'country']);

'use strict';

(function () {
  angular.module('alumni')
    .controller('alumniSearchController', alumniSearchController);

  alumniSearchController.$inject = ['$scope', 'alumniFactory', 'customsDataTables', 'programsFactory', 'countryFactory'];

  function alumniSearchController($scope, alumniFactory, customsDataTables, programsFactory, countryFactory) {
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

    $scope.getAllCountry = function () {
      countryFactory.getCountry()
        .then(function (res) {
          $scope.country = res.data;
        });
    }

    $scope.searchAlumni = function () {

    }

  }
})();