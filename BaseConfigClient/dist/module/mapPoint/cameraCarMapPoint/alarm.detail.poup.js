define(["require", "exports", "../../common/app/main.app", "./TestEnum", "../../common/directive/page/page-params"], function (require, exports, main_app_1, TestEnum_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var image64x64 = 'http://temp.im/64x64/ccc/fff';
    var image120x90 = 'http://temp.im/120x90/ccc/fff';
    var image120x120 = 'http://temp.im/120x120/ccc/fff';
    var image45x45 = 'http://temp.im/45x45/ccc/fff';
    var AlarmDetailPoupController = (function () {
        function AlarmDetailPoupController($scope, mylayer) {
            this.$scope = $scope;
            this.mylayer = mylayer;
            this.alarmNowInfo = TestEnum_1.MockAlarmList(1, image120x120)[0];
            this.historyCaptrueParams = new page_params_1.default(1, 10);
            this.topCaptrueList = TestEnum_1.MockCaptureList(5, image64x64);
            this.historyCaptrueList = TestEnum_1.MockCaptureList(12, image120x90);
            this.historyAlarmList = TestEnum_1.MockAlarmList(5, image45x45);
            this.alarmInfoList = TestEnum_1.MockAlarmList(6, image120x120);
            this.isShowHistory = false;
            this.historyIsShowAlarm = false;
            console.log(this.topCaptrueList);
            this.historyCaptrueParams.totalCount = 210;
            this.historyCaptrueParams.currentPage = 1;
            this.historyCaptrueParams.pageCount = 10;
            this.historyCaptrueParams.pageSize = 21;
        }
        AlarmDetailPoupController.prototype.closeMyLayer = function () {
            this.mylayer.close('huangjingjing');
        };
        AlarmDetailPoupController.$inject = ['$scope', 'mylayer'];
        return AlarmDetailPoupController;
    }());
    main_app_1.app.controller('alarmDetailPoupController', AlarmDetailPoupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvYWxhcm0uZGV0YWlsLnBvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0EsSUFBTSxVQUFVLEdBQVUsOEJBQThCLENBQUM7SUFDekQsSUFBTSxXQUFXLEdBQVUsK0JBQStCLENBQUM7SUFDM0QsSUFBTSxZQUFZLEdBQVUsZ0NBQWdDLENBQUM7SUFDN0QsSUFBTSxVQUFVLEdBQVUsOEJBQThCLENBQUM7SUFDekQ7UUFhSSxtQ0FBb0IsTUFBVyxFQUFTLE9BQVc7WUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFTLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFWbkQsaUJBQVksR0FBUyx3QkFBYSxDQUFDLENBQUMsRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCx5QkFBb0IsR0FBYyxJQUFJLHFCQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELG1CQUFjLEdBQWtCLDBCQUFlLENBQUMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELHVCQUFrQixHQUFrQiwwQkFBZSxDQUFDLEVBQUUsRUFBQyxXQUFXLENBQUMsQ0FBQztZQUNwRSxxQkFBZ0IsR0FBZ0Isd0JBQWEsQ0FBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsa0JBQWEsR0FBZ0Isd0JBQWEsQ0FBQyxDQUFDLEVBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0Qsa0JBQWEsR0FBVyxLQUFLLENBQUM7WUFDOUIsdUJBQWtCLEdBQVcsS0FBSyxDQUFDO1lBRy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFDRCxnREFBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQXJCTSxpQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBdUIxQyxnQ0FBQztLQXhCRCxBQXdCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9jYW1lcmFDYXJNYXBQb2ludC9hbGFybS5kZXRhaWwucG91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtDYXB0dXJlLE1vY2tDYXB0dXJlTGlzdCxBbGFybSxNb2NrQWxhcm1MaXN0fSBmcm9tIFwiLi9UZXN0RW51bVwiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuY29uc3QgaW1hZ2U2NHg2NDpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNjR4NjQvY2NjL2ZmZic7XHJcbmNvbnN0IGltYWdlMTIweDkwOnN0cmluZyA9ICdodHRwOi8vdGVtcC5pbS8xMjB4OTAvY2NjL2ZmZic7XHJcbmNvbnN0IGltYWdlMTIweDEyMDpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vMTIweDEyMC9jY2MvZmZmJztcclxuY29uc3QgaW1hZ2U0NXg0NTpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNDV4NDUvY2NjL2ZmZic7XHJcbmNsYXNzIEFsYXJtRGV0YWlsUG91cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ215bGF5ZXInXTtcclxuXHJcbiAgICBhbGFybU5vd0luZm86QWxhcm0gPSBNb2NrQWxhcm1MaXN0KDEsaW1hZ2UxMjB4MTIwKVswXTtcclxuICAgIGhpc3RvcnlDYXB0cnVlUGFyYW1zOlBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygxLDEwKTtcclxuICAgIHRvcENhcHRydWVMaXN0OkFycmF5PENhcHR1cmU+ID0gTW9ja0NhcHR1cmVMaXN0KDUsaW1hZ2U2NHg2NCk7XHJcbiAgICBoaXN0b3J5Q2FwdHJ1ZUxpc3Q6QXJyYXk8Q2FwdHVyZT4gPSBNb2NrQ2FwdHVyZUxpc3QoMTIsaW1hZ2UxMjB4OTApO1xyXG4gICAgaGlzdG9yeUFsYXJtTGlzdDpBcnJheTxBbGFybT4gPSBNb2NrQWxhcm1MaXN0KDUsaW1hZ2U0NXg0NSk7XHJcbiAgICBhbGFybUluZm9MaXN0OkFycmF5PEFsYXJtPiA9IE1vY2tBbGFybUxpc3QoNixpbWFnZTEyMHgxMjApO1xyXG5cclxuICAgIGlzU2hvd0hpc3Rvcnk6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaGlzdG9yeUlzU2hvd0FsYXJtOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LHByaXZhdGUgbXlsYXllcjphbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvcENhcHRydWVMaXN0KTtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLnRvdGFsQ291bnQgPSAyMTA7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy5wYWdlQ291bnQgPSAxMDtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLnBhZ2VTaXplID0gMjE7XHJcbiAgICB9XHJcbiAgICBjbG9zZU15TGF5ZXIoKXtcclxuICAgICAgICB0aGlzLm15bGF5ZXIuY2xvc2UoJ2h1YW5namluZ2ppbmcnKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2FsYXJtRGV0YWlsUG91cENvbnRyb2xsZXInLCBBbGFybURldGFpbFBvdXBDb250cm9sbGVyKTsiXX0=
