angular.module('country')
  .controller('countryModalController', countryModalController);

countryModalController.$inject = ['$scope', '$ngBootbox', 'Upload', 'countryFactory', 'params', 'close'];

function countryModalController($scope, $ngBootbox, Upload, countryFactory, params, close) {
  // initialize param to object
  $scope.params = {};
  $scope.params.txt_id = params.id;
  $scope.params.txt_name = params.caption;
  $scope.params.old_image = params.old_image;
  $scope.params.image = params.image_url;
  // console.log(params.image_url)

  $scope.submit = function () {
   
    let params = {
      id: $scope.params.txt_id,
      caption: $scope.params.txt_name,
      image: (typeof $scope.params.image != 'undefined' ? $scope.params.image : '0'),
      old_image: (typeof $scope.params.old_image != 'undefined' ? $scope.params.old_image : '0'),
      ordinal: 0
    }

    // console.log(params);

    $ngBootbox.confirm('Do you want to save ?')
      .then(function () {
        countryFactory.setCountryProfile(params)
          .then(function (res) {
            close(res.data, 200);
          });
      }, function () {
        console.log('cancel');
      });
  }

}