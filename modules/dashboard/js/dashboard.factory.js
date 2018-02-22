(function () {
	angular.module('dashboard')
		.factory('dashboardFactory', dashboardFactory);

	dashboardFactory.$inject = ['$http'];

	function dashboardFactory($http) {
		let urlBase = baseUrls();

		let dashboardFactory = {};

		dashboardFactory.getDashboard = function () {
			return $http.get(urlBase + '/alumni/latest');
		}
		
		return dashboardFactory;
	}

})();