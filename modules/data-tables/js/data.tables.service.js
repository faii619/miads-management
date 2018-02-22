(function () {
  angular.module('monarchApp')
    .service('customsDataTables', ['DTOptionsBuilder', function (DTOptionsBuilder) {
      let vm = this;
      vm.dataTables = function () {
        let options = DTOptionsBuilder.newOptions()
          .withDisplayLength(50)
          .withOption('bLengthChange', true);
        // .withLanguage({
        //   "sEmptyTable":     "ไม่พบข้อมูลค่ะ",
        //   "sInfo":           "แสดงผล _START_ ถึง _END_ จาก _TOTAL_ ทั้งหมด",
        //   "sInfoEmpty":      "ไม่พบรายการค่ะ",
        //   "sInfoPostFix":    "",
        //   "sLengthMenu":     "_MENU_",
        //   "sSearch":         "ค้นหา:",
        //   "sZeroRecords":    "ไม่พบข้อมูลค่ะ",
        // 	"sInfoFiltered":   "(ฟิลเตอร์ จาก _MAX_ ทั้งหมด)",
        //   "oPaginate": {
        //       "sFirst":    "หน้าแรก",
        //       "sLast":     "สุดท้าย",
        //       "sNext":     "ต่อไป",
        //       "sPrevious": "ก่อนหน้า"
        //   }
        // });

        return options;
      };

    }]);

})();