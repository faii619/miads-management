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

		dashboardFactory.country_summary_by_country_id = function () {
			return $http.get(urlBase + '/country/country_summary_by_country_id');
		}
		
		return dashboardFactory;
	}

})();