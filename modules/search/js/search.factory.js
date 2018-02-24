(function () {
	angular.module('search')
		.factory('searchFactory', searchFactory);

	searchFactory.$inject = ['$http'];

	function searchFactory($http) {
		let urlBase = baseUrls();

		let searchFactory = {};

		searchFactory.getSearch = function () {
			return $http.get(urlBase + '/alumni/latest');
		}
		
		return searchFactory;
	}

})();