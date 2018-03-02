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
    
  }
})();