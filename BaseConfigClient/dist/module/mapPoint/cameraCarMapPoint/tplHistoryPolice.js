define(["require", "exports", "../../common/app/main.app", "./camera.paging", "css!./style/cameraMapPoint.css", "./camera.paging"], function (require, exports, main_app_1, camera_paging_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cameraPointHistoryPolice = (function () {
        function cameraPointHistoryPolice($scope, $timeout, cameraPagingService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.cameraPagingService = cameraPagingService;
            this.historyIsShowAlarm = false;
            this.resultParams = new camera_paging_1.PageParams();
            console.log("报警拉======================");
            console.log(this.$scope.SubcribeAlarmList);
            this.$timeout(function () {
                _this.cameraPagingService.setDataList($scope.SubcribeAlarmList);
            }).then(function () {
                if (!!$scope.SubcribeAlarmList && $scope.SubcribeAlarmList.length) {
                    _this.resultParams.totalCount = $scope.SubcribeAlarmList.length;
                    _this.resultParams.currentPage = 1;
                    _this.resultParams.pageCount = 10;
                    _this.resultParams.pageSize = 10;
                    _this.resultParams = _this.cameraPagingService.getDataByPage(_this.resultParams);
                    _this.SubcribeAlarmList = _this.resultParams.data;
                }
            });
        }
        cameraPointHistoryPolice.$inject = ['$scope', '$timeout', 'cameraPagingService'];
        return cameraPointHistoryPolice;
    }());
    main_app_1.app.controller('cameraPointHistoryPolice', cameraPointHistoryPolice);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvdHBsSGlzdG9yeVBvbGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTtRQVVFLGtDQUNZLE1BQVcsRUFDWCxRQUFZLEVBQ1osbUJBQXdDO1lBSHBELGlCQXFCQztZQXBCVyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7WUFScEQsdUJBQWtCLEdBQVcsS0FBSyxDQUFDO1lBQ25DLGlCQUFZLEdBQWUsSUFBSSwwQkFBVSxFQUFFLENBQUM7WUFTeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ0osRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsSUFBRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDNUQsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztvQkFDL0QsS0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO29CQUNsQyxLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFFaEMsS0FBSSxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDOUUsS0FBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFBO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBOUJPLGdDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLHFCQUFxQixDQUFDLENBQUM7UUErQmhFLCtCQUFDO0tBaENELEFBZ0NDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L2NhbWVyYUNhck1hcFBvaW50L3RwbEhpc3RvcnlQb2xpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NzcyEuL3N0eWxlL2NhbWVyYU1hcFBvaW50LmNzcydcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7SUNhbWVyYVBhZ2luZ1NlcnZpY2UsIFBhZ2VQYXJhbXN9IGZyb20gXCIuL2NhbWVyYS5wYWdpbmdcIjtcclxuaW1wb3J0IFwiLi9jYW1lcmEucGFnaW5nXCJcclxuXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmNsYXNzIGNhbWVyYVBvaW50SGlzdG9yeVBvbGljZSB7XHJcbiAgc3RhdGljICAkaW5qZWN0ID0gWyckc2NvcGUnLCckdGltZW91dCcsJ2NhbWVyYVBhZ2luZ1NlcnZpY2UnXTtcclxuICBzdGFydFRpbWU6c3RyaW5nO1xyXG4gIGVtZFRpbWU6c3RyaW5nO1xyXG4gIE1vY2tBbGFybUxpc3QxOiBBcnJheTxhbnk+O1xyXG4gIGhpc3RvcnlJc1Nob3dBbGFybTpib29sZWFuID0gZmFsc2U7XHJcbiAgcmVzdWx0UGFyYW1zOiBQYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuXHJcbiAgU3ViY3JpYmVBbGFybUxpc3Q6IEFycmF5PGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yIChcclxuICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgcHJpdmF0ZSAkdGltZW91dDphbnksXHJcbiAgICAgIHByaXZhdGUgY2FtZXJhUGFnaW5nU2VydmljZTpJQ2FtZXJhUGFnaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIuaKpeitpuaLiT09PT09PT09PT09PT09PT09PT09PT1cIilcclxuICAgICAgY29uc29sZS5sb2codGhpcy4kc2NvcGUuU3ViY3JpYmVBbGFybUxpc3QpO1xyXG4gICAgICAvLyDlrZjlhaXnvJPlrZhcclxuICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmNhbWVyYVBhZ2luZ1NlcnZpY2Uuc2V0RGF0YUxpc3QoJHNjb3BlLlN1YmNyaWJlQWxhcm1MaXN0KTtcclxuICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBpZighISRzY29wZS5TdWJjcmliZUFsYXJtTGlzdCYmJHNjb3BlLlN1YmNyaWJlQWxhcm1MaXN0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMudG90YWxDb3VudCA9ICRzY29wZS5TdWJjcmliZUFsYXJtTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VDb3VudCA9IDEwO1xyXG4gICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gMTA7XHJcblxyXG4gICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5jYW1lcmFQYWdpbmdTZXJ2aWNlLmdldERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICAgIHRoaXMuU3ViY3JpYmVBbGFybUxpc3QgPSB0aGlzLnJlc3VsdFBhcmFtcy5kYXRhXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2NhbWVyYVBvaW50SGlzdG9yeVBvbGljZScsIGNhbWVyYVBvaW50SGlzdG9yeVBvbGljZSk7Il19
