(function () {
	angular.module('alumni')
		.factory('alumniFactory', alumniFactory);

	alumniFactory.$inject = ['$http', 'Upload'];

	function alumniFactory($http, Upload) {
		let urlBase = baseUrls();

		let alumniFactory = {};

		alumniFactory.getAlumniProfile = function (id) {
			return $http.get(urlBase + '/alumni/' + id);
		}

		alumniFactory.changePassword = function (params) {
			return $http.post(urlBase + '/alumni/change_passwod', params);
		}

		//--------------------------------------------

		alumniFactory.getAlumni = function (params) {
			return $http.post(urlBase + '/alumni/sort', params);
		}

		alumniFactory.getPersonTitle = function () {
			return $http.get(urlBase + '/persontitle');
		}

		alumniFactory.getGender = function () {
			return $http.get(urlBase + '/gender');
		}

		alumniFactory.getCareerOrganizationType = function () {
			return $http.get(urlBase + '/careerorganizationtype');
		}

		alumniFactory.setAlumni = function (params) {
			let endpoint = (params.id == 0 ? 'create' : 'edit');
			return Upload.upload({
				url: urlBase + '/alumni/' + endpoint,
				data: params
			});
		}

		alumniFactory.deleteAlumni = function (id) {
			return $http.delete(urlBase + '/alumni/delete/' + id);
		}
		
		return alumniFactory;
	}

})();