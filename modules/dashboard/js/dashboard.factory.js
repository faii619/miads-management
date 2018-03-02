(function () {
	angular.module('dashboard')
		.factory('dashboardFactory', dashboardFactory);

	dashboardFactory.$inject = ['$http'];

	function dashboardFactory($http) {
		let urlBase = baseUrls();

		let dashboardFactory = {};

		dashboardFactory.getDashboard = function () {
			return $http.get(urlBase + '/alumni/latest/9');
		}

		dashboardFactory.countAlumni = function () {
			return $http.get(urlBase + '/alumni/count');
		}

		dashboardFactory.countCourtry = function () {
			return $http.get(urlBase + '/country/count_courtry');
		}

		dashboardFactory.country_summary_by_country_id = function () {
			return $http.get(urlBase + '/dashboard/count_alumni_country');
		}
		
		return dashboardFactory;
	}

})();