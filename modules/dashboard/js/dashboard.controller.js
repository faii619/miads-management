//setter
angular.module('dashboard', ['angularModalService', 'authen', 'mi_alumni_directory', 'ngYoutubeEmbed', 'images_slide']);

'use strict';

(function () {
  angular.module('dashboard')
    .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['$scope', 'ModalService', 'dashboardFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'imagesSlideFactory'];

  function dashboardController($scope, ModalService, dashboardFactory, customsDataTables, $routeParams, $window, $location, imagesSlideFactory) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.dashboard = [];
    $scope.get_youtube = [];

    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    $scope.getDashboard = function () {
      dashboardFactory.getDashboard(null)
        .then(function (res) {
          // console.log(res);
          $scope.dashboard = res.data;
        });
    }

    $scope.country_summary_by_country_id = function () {
      dashboardFactory.country_summary_by_country_id(null)
        .then(function (res) {
          $scope.countrys_count_by_country_id = res.data.list;
          $scope.sum_person = res.data.sum_person;
        });
    }

    $scope.countAlumni = function () {
      dashboardFactory.countAlumni(null)
        .then(function (res) {
          $scope.countAlumni = res.data;
        });
    }

    $scope.countCourtry = function () {
      dashboardFactory.countCourtry(null)
        .then(function (res) {
          $scope.countCourtry = res.data;
        });
    }

    $scope.showAModal = function (id = 0) {
      let params = {
        id: id
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
          console.log(result)
        });
      });
    }

    $scope.getYoutube = function () {
      dashboardFactory.get_youtube()
        .then(function (res) {
          $scope.get_youtube = res.data;
        });
    }

    $scope.getImagesSlide = function () {
      imagesSlideFactory.getImagesSlide(null)
        .then(function (res) {
          $scope.imagesSlide = res.data;
        });
    };

  }


})();