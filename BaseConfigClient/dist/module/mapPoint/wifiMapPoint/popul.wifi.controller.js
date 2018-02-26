define(["require", "exports", "../../common/app/main.app", "./TestEnum", "../../common/directive/page/page-params"], function (require, exports, main_app_1, TestEnum_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var image64x64 = 'http://temp.im/64x64/ccc/fff';
    var image120x90 = 'http://temp.im/120x90/ccc/fff';
    var image78x78 = 'http://temp.im/78x78/ccc/fff';
    var image45x45 = 'http://temp.im/45x45/ccc/fff';
    var TestController = (function () {
        function TestController($scope) {
            this.$scope = $scope;
            this.alarmNowInfo = TestEnum_1.MockAlarmList(1, image78x78)[0];
            this.historyCaptrueParams = new page_params_1.default(1, 10);
            this.topCaptrueList = TestEnum_1.MockCaptureList(5, image64x64);
            this.historyCaptrueList = TestEnum_1.MockCaptureList(12, image120x90);
            this.historyAlarmList = TestEnum_1.MockAlarmList(5, image45x45);
            this.MockWifiList = TestEnum_1.MockWifiList(12);
            this.MockWifiAlarm = TestEnum_1.MockWifiAlarm(8);
            this.isShowHistory = true;
            this.historyIsShowAlarm = false;
            this.historyCaptrueParams.totalCount = 210;
            this.historyCaptrueParams.currentPage = 1;
            this.historyCaptrueParams.pageCount = 10;
            this.historyCaptrueParams.pageSize = 21;
        }
        TestController.$inject = ['$scope'];
        return TestController;
    }());
    main_app_1.app.controller('testController', TestController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaU1hcFBvaW50L3BvcHVsLndpZmkuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQSxJQUFNLFVBQVUsR0FBVSw4QkFBOEIsQ0FBQztJQUN6RCxJQUFNLFdBQVcsR0FBVSwrQkFBK0IsQ0FBQztJQUMzRCxJQUFNLFVBQVUsR0FBVSw4QkFBOEIsQ0FBQztJQUN6RCxJQUFNLFVBQVUsR0FBVSw4QkFBOEIsQ0FBQztJQUN6RDtRQWNJLHdCQUFvQixNQUFXO1lBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQVgvQixpQkFBWSxHQUFTLHdCQUFhLENBQUMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELHlCQUFvQixHQUFjLElBQUkscUJBQVUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkQsbUJBQWMsR0FBa0IsMEJBQWUsQ0FBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUQsdUJBQWtCLEdBQWtCLDBCQUFlLENBQUMsRUFBRSxFQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BFLHFCQUFnQixHQUFnQix3QkFBYSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RCxpQkFBWSxHQUFtQix1QkFBWSxDQUFFLEVBQUUsQ0FBRSxDQUFDO1lBQ2xELGtCQUFhLEdBQW9CLHdCQUFhLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFFcEQsa0JBQWEsR0FBVyxJQUFJLENBQUM7WUFDN0IsdUJBQWtCLEdBQVcsS0FBSyxDQUFDO1lBRy9CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFsQk0sc0JBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBcUJoQyxxQkFBQztLQXRCRCxBQXNCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFwUG9pbnQvd2lmaU1hcFBvaW50L3BvcHVsLndpZmkuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0NhcHR1cmUsTW9ja0NhcHR1cmVMaXN0LEFsYXJtLE1vY2tBbGFybUxpc3QsIHdpZmlJbmZvLE1vY2tXaWZpTGlzdCwgd2lmaUFsYXJtLE1vY2tXaWZpQWxhcm19IGZyb20gXCIuL1Rlc3RFbnVtXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5jb25zdCBpbWFnZTY0eDY0OnN0cmluZyA9ICdodHRwOi8vdGVtcC5pbS82NHg2NC9jY2MvZmZmJztcclxuY29uc3QgaW1hZ2UxMjB4OTA6c3RyaW5nID0gJ2h0dHA6Ly90ZW1wLmltLzEyMHg5MC9jY2MvZmZmJztcclxuY29uc3QgaW1hZ2U3OHg3ODpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNzh4NzgvY2NjL2ZmZic7XHJcbmNvbnN0IGltYWdlNDV4NDU6c3RyaW5nID0gJ2h0dHA6Ly90ZW1wLmltLzQ1eDQ1L2NjYy9mZmYnO1xyXG5jbGFzcyBUZXN0Q29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgYWxhcm1Ob3dJbmZvOkFsYXJtID0gTW9ja0FsYXJtTGlzdCgxLGltYWdlNzh4NzgpWzBdO1xyXG4gICAgaGlzdG9yeUNhcHRydWVQYXJhbXM6UGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKDEsMTApO1xyXG4gICAgdG9wQ2FwdHJ1ZUxpc3Q6QXJyYXk8Q2FwdHVyZT4gPSBNb2NrQ2FwdHVyZUxpc3QoNSxpbWFnZTY0eDY0KTtcclxuICAgIGhpc3RvcnlDYXB0cnVlTGlzdDpBcnJheTxDYXB0dXJlPiA9IE1vY2tDYXB0dXJlTGlzdCgxMixpbWFnZTEyMHg5MCk7XHJcbiAgICBoaXN0b3J5QWxhcm1MaXN0OkFycmF5PEFsYXJtPiA9IE1vY2tBbGFybUxpc3QoNSwgaW1hZ2U0NXg0NSk7XHJcbiAgICBNb2NrV2lmaUxpc3Q6QXJyYXk8d2lmaUluZm8+ID0gTW9ja1dpZmlMaXN0KCAxMiApO1xyXG4gICAgTW9ja1dpZmlBbGFybTpBcnJheTx3aWZpQWxhcm0+ID0gTW9ja1dpZmlBbGFybSggOCApO1xyXG5cclxuICAgIGlzU2hvd0hpc3Rvcnk6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBoaXN0b3J5SXNTaG93QWxhcm06Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLnRvdGFsQ291bnQgPSAyMTA7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy5wYWdlQ291bnQgPSAxMDtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLnBhZ2VTaXplID0gMjE7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ3Rlc3RDb250cm9sbGVyJywgVGVzdENvbnRyb2xsZXIpOyJdfQ==
