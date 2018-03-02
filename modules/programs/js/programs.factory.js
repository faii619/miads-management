(function () {
	angular.module('programs')
		.factory('programsFactory', programsFactory);

	programsFactory.$inject = ['$http'];

	function programsFactory($http) {
		let urlBase = baseUrls();

		let programsFactory = {};

		programsFactory.getPrograms = function (params) {
			return $http.post(urlBase + '/program/programs_by_conditions', params);
		}

		programsFactory.getAllPrograms = function () {
			return $http.get(urlBase + '/programs');
		}

		programsFactory.getProgramProfile = function (id) {
			return $http.get(urlBase + '/program/' + id);
		}

		programsFactory.setProgramProfile = function (params) {
			let endpoint = (params.id == 0 ? 'create' : 'edit');
			return $http.post(urlBase + '/program/' + endpoint, params);
		}

		programsFactory.setProgramStatusInActive = function (id) {
			return $http.delete(urlBase + '/program/delete/' + id);
		}

		return programsFactory;
	}

})();