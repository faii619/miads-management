//setter
angular.module('images_slide', ['angularModalService','ngBootbox', 'toastersService', 'ngFileUpload']);

(function () {
	angular.module('images_slide')
		.factory('imagesSlideFactory', imagesSlideFactory);

	imagesSlideFactory.$inject = ['$http', 'Upload'];

	function imagesSlideFactory($http, Upload) {
		let urlBase = baseUrls();

		let imagesSlideFactory = {};

		imagesSlideFactory.getImagesSlide = function () {
			return $http.get(urlBase + '/images_slide');
		}

		imagesSlideFactory.setImagesSlideProfile = function (params) {
			let endpoint = (params.id == 0 ? 'create' : 'edit');
			return Upload.upload({
				url: urlBase + '/images_slide/' + endpoint,
				data: params
			});
		}

		imagesSlideFactory.setImagesSlideStatusInActive = function (id, file_id) {
			return $http.delete(urlBase + '/images_slide/delete/' + id + '/' + file_id);
		}

		return imagesSlideFactory;
	}

})();