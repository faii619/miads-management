//setter
angular.module('programs', ['angularModalService', 'localytics.directives', 'ngBootbox', 'toastersService']);

'use strict';

(function () {
  angular.module('programs')
    .controller('programsController', programsController);

  programsController.$inject = ['$scope', '$ngBootbox', 'ModalService', 'toasterService', 'programParticipantsFactory', 'programsFactory', 'programDepartmentsFactory', 'customsDataTables', '$routeParams', '$window', '$location'];

  function programsController($scope, $ngBootbox, ModalService, toasterService, programParticipantsFactory, programsFactory, programDepartmentsFactory, customsDataTables, $routeParams, $window, $location) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.programs = [];
    $scope.program_departments = [];
    $scope.program_participants = [];

    $scope.params.txt_head_form = ($scope.params.txt_id != 0) ? 'Update' : 'Add';

    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getParticipantByProgramId = function (id) {
      programParticipantsFactory.getParticipantByProgramId(id)
        .then(function (res) {
          $scope.program_participants = res.data;
        });
    }

    $scope.getProgramDepartments = function (programDepartmentId = 0) {
      programDepartmentsFactory.getProgramDepartments()
        .then(function (res) {
          $scope.program_departments = res.data;
          if (programDepartmentId > 0) {
            let index = $scope.program_departments.findIndex(value => value.id == programDepartmentId);
            $scope.params.ddl_dept = $scope.program_departments[index];
          }

        });
    }

    $scope.getPrograms = function () {
      let programDepartmentId = (typeof $scope.params.ddl_dept != 'undefined' && typeof $scope.params.ddl_dept.id != 'undefined' ? $scope.params.ddl_dept.id : 0);
      let params = {
        txt_code: (typeof $scope.params.txt_code != 'undefined' ? $scope.params.txt_code : '0'),
        txt_title: (typeof $scope.params.txt_title != 'undefined' ? $scope.params.txt_title : '0'),
        programDepartmentId: programDepartmentId
        // startDate: (typeof $scope.params.txt_start_date != 'undefined' ? $scope.params.txt_start_date : '0000-00-00'),
        // endDate: (typeof $scope.params.txt_end_date != 'undefined' ? $scope.params.txt_end_date : '0000-00-00'),
      }
      
      programsFactory.getPrograms(params)
        .then(function (res) {
          $scope.programs = res.data;
        });
    }

    $scope.getProgramProfile = function () {
      if ($scope.params.txt_id == 0) {
        return false;
      }

      programsFactory.getProgramProfile($scope.params.txt_id)
        .then(function (res) {
          let data = res.data;
          $scope.params.txt_code = data.code;
          $scope.params.txt_title = data.title;
          $scope.params.txt_start_date = data.startDate;
          $scope.params.txt_end_date = data.endDate;

          $scope.getProgramDepartments(res.data.programDepartmentId);
          $scope.getParticipantByProgramId(res.data.id);

        });
    }

    $scope.submit = function () {
      let params = {
        id: $scope.params.txt_id,
        code: (typeof $scope.params.txt_code != 'undefined' ? $scope.params.txt_code : '0'),
        title: (typeof $scope.params.txt_title != 'undefined' ? $scope.params.txt_title : '0'),
        programDepartmentId: (typeof $scope.params.ddl_dept != 'undefined' && typeof $scope.params.ddl_dept.id != 'undefined' ? $scope.params.ddl_dept.id : 1),
        startDate: (typeof $scope.params.txt_start_date != 'undefined' ? $scope.params.txt_start_date : '0000-00-00'),
        endDate: (typeof $scope.params.txt_end_date != 'undefined' ? $scope.params.txt_end_date : '0000-00-00'),
      }

      // console.log(params);/program/participants

      $ngBootbox.confirm('Do you want to save ?')
        .then(function () {
          programsFactory.setProgramProfile(params)
            .then(function (res) {
              if (res.data.status == 1) {
                toasterService.toaster_success();
                // $window.location.href = '#/programs';
                let lastId = res.data.lastId;
                if (params.id == 0) {
                  $window.location.href = $location.$$absUrl + "/" + lastId;
                }

              }
            });
        }, function () {
          console.log('cancel');
        });
    }

    $scope.RemoveProgram = function (id) {

      $ngBootbox.confirm('Do you want to delete ?')
        .then(function () {
          programsFactory.setProgramStatusInActive(id)
            .then(function (res) {
              if (res.data.status == 1) {
                toasterService.toaster_remove();
                $window.location.href = '#/programs';
              }
            });
        }, function () {
          console.log('cancel');
        });
    }

    $scope.showAModal = function (id = 0) {
      let params = {
        id: id
      }

      ModalService.showModal({
          templateUrl: "modules/program-participants/views/form.participants.modal.tpl.html",
          controller: "programParticipantsModalController",
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
              $scope.getParticipantByProgramId(params.id);
            }

          });
        });
    }

    $scope.RemoveParticipant = function (programId, alumniId) {
      let params = {
        programId: programId,
        alumniId: alumniId,
      }
      $ngBootbox.confirm('Do you want to remove ?')
        .then(function () {
          programParticipantsFactory.setParticipantInActive(params)
            .then(function (res) {
              console.log(res.data)
              if (res.data.status == 1) {
                toasterService.toaster_remove();
                $scope.getParticipantByProgramId(params.programId);
              }
            });
        }, function () {
          console.log('cancel');
        });
    }

  }

})();