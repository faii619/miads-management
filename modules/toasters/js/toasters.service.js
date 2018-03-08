(function () {
  //setter
  angular.module('toastersService', ['toaster']);

  //getter
  angular.module('toastersService')
    .service('toasterService', ['toaster', function (toaster) {
      this.toaster_success = function () {
        toaster.pop({
          type: 'success',
          title: 'System',
          body: 'Process Completed',
          timeout: 3000,
          showCloseButton: true
        });
      }

      this.toaster_remove = function () {
        toaster.pop({
          type: 'error',
          title: 'System',
          body: 'Remove Completed',
          timeout: 3000,
          showCloseButton: true
        });
      }

      this.toaster_fail = function (type, body) {
        toaster.pop({
          type: type,
          title: 'System',
          body: body,
          timeout: 3000,
          showCloseButton: true
        });
      }

    }]);

})();