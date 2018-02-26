//setter
angular.module('authen', ['localytics.directives', 'ngBootbox', 'toastersService', 'ngFileUpload', 'programs', 'country']);

'use strict';

(function () {
  angular.module('authen')
    .controller('authenController', authenController);

  authenController.$inject = ['$scope', 'authenFactory', '$window'];

  function authenController($scope, authenFactory, $window) {
    // initialize param to object
    $scope.params = {};
    console.log($window)
    $scope.authen = function () {
      let params = {
        username: $scope.params.username || 0,
        passwords: $scope.params.passwords || 0,
      };


      authenFactory.authen(params)
        .then(function (res) {

          if (res.data.authen_status == 0) return;
          let logged_profile = JSON.stringify(res.data);

          localStorage.setItem('logged_profile', logged_profile);

          let landingUrl = "http://" + $window.location.host + "/miads-management-admin";
          $window.location.href = landingUrl;
        });
    }

  }

})();