//setter
angular.module('search', ['localytics.directives', 'angularModalService']);

'use strict';

(function () {
  angular.module('search')
    .controller('searchController', searchController);

  searchController.$inject = ['$scope', 'alumniFactory', 'searchFactory', 'customsDataTables', '$routeParams', '$window', '$location', 'ModalService'];

  function searchController($scope, alumniFactory, searchFactory, customsDataTables, $routeParams, $window, $location, ModalService) {
    // initialize param to object
    $scope.params = {};
    $scope.params.txt_id = (typeof $routeParams.param != 'undefined' ? $routeParams.param : 0);
    $scope.search = [];
    $scope.data_user = [{}];
    
    // DataTables configurable options
    $scope.dtOptions = customsDataTables.dataTables();

    let logged_profile = localStorage.getItem('logged_profile');
    $scope.data_user = JSON.parse(logged_profile);
    
    // $scope.getSearch = function () {
    //   searchFactory.getSearch(null)
    //     .then(function (res) {
    //       // console.log(res);
    //       $scope.search = res.data;
    //     });
    // }

    $scope.getAlumni = function () {
      let countryId = (typeof $scope.params.national_id != 'undefined' && typeof $scope.params.national_id.id != 'undefined' ? $scope.params.national_id.id : 0);
      let programId = (typeof $scope.params.program_id != 'undefined' && typeof $scope.params.program_id.id != 'undefined' ? $scope.params.program_id.id : 0);
      let year = (typeof $scope.params.txt_year != 'undefined' && typeof $scope.params.txt_year.year != 'undefined' ? $scope.params.txt_year.year : 0);

      let param = {
        txt_code: 0,
        txt_name: (typeof $scope.params.txt_name != 'undefined' ? $scope.params.txt_name : '0'),
        txt_email: 0,
        txt_year: 0,
        countryId: 0,
        programId: programId
      }
      alumniFactory.getAlumni(param)
        .then(function (res) {
          $scope.alumni = res.data;
        });
    }
  }
})();