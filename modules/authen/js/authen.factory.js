(function () {
	angular.module('authen')
		.factory('authenFactory', authenFactory);

	authenFactory.$inject = ['$http'];

	function authenFactory($http) {
		let urlBase = baseUrls();

		let authenFactory = {};

		authenFactory.authen = function (params) {
			return $http.post(urlBase + '/authen', params);
		}

		authenFactory.forgotPassword = function (params) {
			return $http.post(urlBase + '/forget_password', params);
		}

		return authenFactory;
	}

})();