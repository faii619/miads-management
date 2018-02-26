//setter
angular.module('authen', ['localytics.directives', 'ngBootbox', 'toastersService', 'ngFileUpload', 'programs', 'country']);

'use strict';

(function () {
  angular.module('authen')
    .controller('authenController', authenController);

  authenController.$inject = ['$scope', 'authenFactory'];

  function authenController($scope, authenFactory) {
    // initialize param to object
    $scope.params = {};

    $scope.authen = function () {
      let params = {
        username: $scope.params.username || 0,
        passwords: $scope.params.passwords || 0,
      };

      console.log(params)
    }

  }

})();