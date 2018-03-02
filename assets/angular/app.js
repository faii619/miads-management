angular.module('monarchApp', [
  'ngRoute', 
  'ngAnimate',
  'datatables',
  'dashboard',
  'alumni',
  'search'
]);

angular.module('monarchApp')
  .config(['$provide', '$routeProvider', '$locationProvider', function ($provide, $routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
      .when('/', {
        templateUrl: 'modules/dashboard/views/dashboard.html'
      })
      .when('/dashboard', {
        templateUrl: 'modules/dashboard/views/dashboard.html'
      })
      .when('/alumni', {
        templateUrl: 'modules/alumni/views/form.detail.alumni.tpl.html'
      })
      .when('/alumni_password', {
        templateUrl: 'modules/alumni/views/form.password.alumni.tpl.html'
      })
      .when('/search', {
        // templateUrl: 'modules/search/views/form.search.tpl.html'
        templateUrl: 'modules/alumni/views/form.search.alumni.tpl.html'
      })
      // .when('/alumni', {
      //   templateUrl: 'modules/alumni/views/form.search.alumni.tpl.html'
      // })
      // .when('/alumni_form', {
      //   templateUrl: 'modules/alumni/views/form.alumni.tpl.html'
      // })
      // .when('/alumni_form/:param', {
      //   templateUrl: 'modules/alumni/views/form.alumni.tpl.html'
      // })
  }]);

  