(function () {
	angular.module('country')
		.factory('countryFactory', countryFactory);

	countryFactory.$inject = ['$http', 'Upload'];

	function countryFactory($http, Upload) {
		let urlBase = baseUrls();

		let countryFactory = {};

		countryFactory.getCountry = function () {
			return $http.get(urlBase + '/country');
		}

		countryFactory.setCountryProfile = function (params) {
			let endpoint = (params.id == 0 ? 'create' : 'edit');
			return Upload.upload({
				url: urlBase + '/country/' + endpoint,
				data: params
			});
		}

		countryFactory.setcountryStatusInActive = function (id) {
			return $http.delete(urlBase + '/country/delete/' + id);
		}

		return countryFactory;
	}

})();