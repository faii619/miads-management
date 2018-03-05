// setter
angular.module('alumni', ['angularModalService', 'localytics.directives', 'programs', 'country']);

'use strict';

(function () {
  angular.module('alumni')
    .controller('alumniSearchController', alumniSearchController);

  alumniSearchController.$inject = ['$scope', 'alumniFactory', 'customsDataTables', 'programsFactory', 'countryFactory', 'ModalService'];

  function alumniSearchController($scope, alumniFactory, customsDataTables, programsFactory, countryFactory, ModalService) {
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
      let code = (typeof $scope.params.txt_code != 'undefined' ? $scope.params.txt_code : 0);
      let start_date = (typeof $scope.params.txt_start_date != 'undefined' ? $scope.params.txt_start_date : 0);
      let end_date = (typeof $scope.params.txt_end_date != 'undefined' ? $scope.params.txt_end_date : 0);
      let program_id = (typeof $scope.params.ddl_program != 'undefined' && typeof $scope.params.ddl_program.id != 'undefined' ? $scope.params.ddl_program.id : 0);
      let mi_department = (typeof $scope.params.mi_department != 'undefined' ? $scope.params.mi_department : 0);
      let organize_type_id = (typeof $scope.params.ddl_organize_type != 'undefined' && typeof $scope.params.ddl_organize_type.id != 'undefined' ? $scope.params.ddl_organize_type.id : 0);
      let alumni_organization_name = (typeof $scope.params.alumni_organization_name != 'undefined' ? $scope.params.alumni_organization_name : 0);
      let country_id = (typeof $scope.params.ddl_country != 'undefined' && typeof $scope.params.ddl_country.id != 'undefined' ? $scope.params.ddl_country.id : 0);
      let alumni_area_of_expertise = (typeof $scope.params.alumni_area_of_expertise != 'undefined' ? $scope.params.alumni_area_of_expertise : 0);
      let name = (typeof $scope.params.txt_name != 'undefined' ? $scope.params.txt_name : 0);

      let params = {
        code: code,
        start_date: start_date,
        end_date: end_date,
        program_id: program_id,
        mi_department: mi_department,
        organize_type_id: organize_type_id,
        alumni_organization_name,
        country_id: country_id,
        alumni_area_of_expertise: alumni_area_of_expertise,
        name: name
      }

      // console.log(params)
      alumniFactory.searchAlumni(params)
      .then(function(res) {
        $scope.alumni = res.data;
      });
    }

    $scope.showAModal = function (id = 0, name = '') {
      let params = {
        id: id,
        name: name
      }
      ModalService.showModal({
        templateUrl: "modules/alumni/views/form.profile.modal.tpl.html",
        controller: "alumniModalController",
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
            $scope.getDivision();
          }
        });
      });
    }

  }
})();