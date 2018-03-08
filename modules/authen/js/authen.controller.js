//setter
angular.module('authen', ['localytics.directives', 'ngBootbox', 'toastersService', 'ngFileUpload', 'programs', 'country']);

'use strict';

(function () {
  angular.module('authen')
    .controller('authenController', authenController);

  authenController.$inject = ['$scope', 'authenFactory', '$window', 'toasterService'];

  function authenController($scope, authenFactory, $window, toasterService) {
    // initialize param to object
    $scope.params = {};
    $scope.authen = function () {
      let params = {
        username: $scope.params.username || 0,
        passwords: $scope.params.passwords || 0,
      };

      authenFactory.authen(params)
        .then(function (res) {
          if (res.data.authen_status == 0) {
            $message = 'Your login attempt has failed. Make sure the username and password are correct.';
            toasterService.toaster_fail('error', $message);
          } else {
            let logged_profile = JSON.stringify(res.data);

            localStorage.setItem('logged_profile', logged_profile);

            let destination = "/miads-management/#/search";
            if (res.data.person_id == null) destination = "/miads-management-admin";

            let landingUrl = "http://" + $window.location.host + destination;
            // let landingUrl = "http://" + $window.location.host + "/web" + destination;
            $window.location.href = landingUrl;
          }
        });
    }

    $scope.forgotPassword = function () {
      let param = {
        email: $scope.params.email
      };
      authenFactory.forgotPassword(param)
      .then(function (res) {
        if (res.data.status == 0) {
          toasterService.toaster_fail('warning', res.data.message);
        } else {
          toasterService.toaster_success();
        }
      });
    }

  }

})();