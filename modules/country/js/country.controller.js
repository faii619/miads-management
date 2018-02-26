//setter
angular.module('country', ['angularModalService','ngBootbox', 'toastersService', 'ngFileUpload']);

'use strict';

(function () {
  angular.module('country')
    .controller('countryController', countryController);

    countryController.$inject = ['$scope', '$ngBootbox', 'toasterService','countryFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'ModalService'];

  function countryController($scope, $ngBootbox, toasterService, countryFactory, customsDataTables, $routeParams, $window, $location, ModalService) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.country = [];

    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getCountry = function () {
      countryFactory.getCountry(null)
        .then(function (res) {
          $scope.country = res.data;
        });
    };

    $scope.Removecountry = function (id) {
      $ngBootbox.confirm('Do you want to remove?')
      .then(function () {
        countryFactory.setcountryStatusInActive(id)
        .then(function (res) {
          if (res.data.status == 1) {
            toasterService.toaster_remove();
            $scope.getCountry();
          }
        });
      }
      , function () {
        console.log('cancel');
      });
    }

    $scope.showAModal = function (value='') {
      let params = {
        id: (typeof value !='undefined' && typeof value.id !='undefined'? value.id : 0),
        caption: (typeof value !='undefined' && typeof value.caption !='undefined'? value.caption : ''),
        image_url: (typeof value !='undefined' && typeof value.flagImage_url !='undefined'? value.flagImage_url : 0),
        old_image: (typeof value !='undefined' && typeof value.flagImage !='undefined'? value.flagImage : 0),
      }

      ModalService.showModal({
          templateUrl: "modules/country/views/form.country.modal.tpl.html",
          controller: "countryModalController",
          preClose: (modal) => {
            modal.element.modal('hide');
          },
          inputs: {
            params: params
          }
        })
        .then(function (modal) {
          modal.element.modal();
          modal.close.then(function (result) {
            if (result.status == 1) {
              toasterService.toaster_success();
              $scope.getCountry();
            }
          });
        });
    }
  }
})();