angular.module('alumni')
  .controller('alumniModalController', alumniModalController);

alumniModalController.$inject = ['$scope', '$ngBootbox', 'alumniFactory', 'params', 'close'];

function alumniModalController($scope, $ngBootbox, alumniFactory, params, close) {
  // initialize param to object
  $scope.params = {};
  $scope.params.txt_id = params.id;
  $scope.params.txt_name = params.name;

  $scope.submit = function () {
    let params = {
      id: $scope.params.txt_id,
      alumni: $scope.params.txt_name,
    }

    var options = {
      message: 'Do you want to save ?',
      // title: 'The title!',
      className: 'test-class',
      buttons: {
        warning: {
          label: "<i class=\"glyph-icon icon-times\"></i> Cancel",
          className: "btn-warning",
          callback: function () {
            return;
          }
        },
        success: {
          label: "<i class=\"glyph-icon icon-save\"></i> save",
          className: "btn-success",
          callback: function () {
            console.log('test');
            // alumniFactory.setalumniProfile(params)
            // .then(function (res) {
            //   close(res.data, 200);
            // });
          }
        }
      }
    };

    $ngBootbox.customDialog(options);

    // $ngBootbox.confirm('Do you want to save ?')
    // .then(function () {
    //   alumniFactory.setalumniProfile(params)
    //   .then(function (res) {
    //     close(res.data, 200);
    //   });
    // }
    // , function () {
    //   console.log('cancel');
    // });
  }

}