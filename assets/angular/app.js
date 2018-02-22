angular.module('monarchApp', [
  'ngRoute', 
  'ngAnimate',
  'datatables',
  'dashboard',
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
  }]);

  
