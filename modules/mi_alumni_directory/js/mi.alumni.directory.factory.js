(function () {
	angular.module('mi_alumni_directory')
		.factory('miAlumniDirectoryFactory', miAlumniDirectoryFactory);

	miAlumniDirectoryFactory.$inject = ['$http'];

	function miAlumniDirectoryFactory($http) {
		let urlBase = baseUrls();

		let miAlumniDirectoryFactory = {};

		miAlumniDirectoryFactory.getMiAlumniDirectory = function () {
			return $http.get(urlBase + '/mi_alumni_directory');
		}
		
		return miAlumniDirectoryFactory;
	}
})();