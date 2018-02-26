define(["require", "exports", "../../common/app/main.app", "./TestEnum", "../../common/directive/page/page-params", "css!./style/cameraMapPoint.css"], function (require, exports, main_app_1, TestEnum_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var image64x64 = 'http://temp.im/64x64/ccc/fff';
    var image120x90 = 'http://temp.im/120x90/ccc/fff';
    var image78x78 = 'http://temp.im/78x78/ccc/fff';
    var image45x45 = 'http://temp.im/45x45/ccc/fff';
    var cameraPointHistoryFace = (function () {
        function cameraPointHistoryFace($scope, $timeout, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.alarmNowInfo = TestEnum_1.MockAlarmList(1, image78x78)[0];
            this.historyCaptrueParams = new page_params_1.default(1, 10);
            this.topCaptrueList = TestEnum_1.MockCaptureList(5, image64x64);
            this.historyCaptrueList = TestEnum_1.MockCaptureList(10, image120x90);
            this.historyAlarmList = TestEnum_1.MockAlarmList(5, image45x45);
            this.historyIsShowAlarm = false;
            this.historyCaptrueParams.totalCount = 210;
            this.historyCaptrueParams.currentPage = 1;
            this.historyCaptrueParams.pageCount = 10;
            this.historyCaptrueParams.pageSize = 21;
        }
        cameraPointHistoryFace.$inject = ['$scope', '$timeout', 'mylayer'];
        return cameraPointHistoryFace;
    }());
    main_app_1.app.controller('cameraPointHistoryFace', cameraPointHistoryFace);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvdHBsLmhpc3RvcnlGYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BLElBQU0sVUFBVSxHQUFVLDhCQUE4QixDQUFDO0lBQ3pELElBQU0sV0FBVyxHQUFVLCtCQUErQixDQUFDO0lBQzNELElBQU0sVUFBVSxHQUFVLDhCQUE4QixDQUFDO0lBQ3pELElBQU0sVUFBVSxHQUFVLDhCQUE4QixDQUFDO0lBRXpEO1FBWUksZ0NBQXFCLE1BQVcsRUFBUyxRQUFZLEVBQVMsT0FBVztZQUFwRCxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUFTLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFQekUsaUJBQVksR0FBUyx3QkFBYSxDQUFDLENBQUMsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCx5QkFBb0IsR0FBYyxJQUFJLHFCQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELG1CQUFjLEdBQWtCLDBCQUFlLENBQUMsQ0FBQyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELHVCQUFrQixHQUFrQiwwQkFBZSxDQUFDLEVBQUUsRUFBQyxXQUFXLENBQUMsQ0FBQztZQUNwRSxxQkFBZ0IsR0FBZ0Isd0JBQWEsQ0FBQyxDQUFDLEVBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUQsdUJBQWtCLEdBQVcsS0FBSyxDQUFDO1lBRy9CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQzNDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzVDLENBQUM7UUFoQk8sOEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsU0FBUyxDQUFDLENBQUM7UUFpQnRELDZCQUFDO0tBbEJELEFBa0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L2NhbWVyYUNhck1hcFBvaW50L3RwbC5oaXN0b3J5RmFjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL2NhbWVyYU1hcFBvaW50LmNzcydcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7Q2FwdHVyZSxNb2NrQ2FwdHVyZUxpc3QsQWxhcm0sTW9ja0FsYXJtTGlzdH0gZnJvbSBcIi4vVGVzdEVudW1cIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcbmNvbnN0IGltYWdlNjR4NjQ6c3RyaW5nID0gJ2h0dHA6Ly90ZW1wLmltLzY0eDY0L2NjYy9mZmYnO1xyXG5jb25zdCBpbWFnZTEyMHg5MDpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vMTIweDkwL2NjYy9mZmYnO1xyXG5jb25zdCBpbWFnZTc4eDc4OnN0cmluZyA9ICdodHRwOi8vdGVtcC5pbS83OHg3OC9jY2MvZmZmJztcclxuY29uc3QgaW1hZ2U0NXg0NTpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNDV4NDUvY2NjL2ZmZic7XHJcblxyXG5jbGFzcyBjYW1lcmFQb2ludEhpc3RvcnlGYWNlIHtcclxuICAgIHN0YXRpYyAgJGluamVjdCA9IFsnJHNjb3BlJywnJHRpbWVvdXQnLCdteWxheWVyJ107XHJcbiAgICBzdGFydFRpbWU6c3RyaW5nO1xyXG4gICAgZW1kVGltZTpzdHJpbmc7XHJcblxyXG4gICAgYWxhcm1Ob3dJbmZvOkFsYXJtID0gTW9ja0FsYXJtTGlzdCgxLGltYWdlNzh4NzgpWzBdO1xyXG4gICAgaGlzdG9yeUNhcHRydWVQYXJhbXM6UGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKDEsMTApO1xyXG4gICAgdG9wQ2FwdHJ1ZUxpc3Q6QXJyYXk8Q2FwdHVyZT4gPSBNb2NrQ2FwdHVyZUxpc3QoNSxpbWFnZTY0eDY0KTtcclxuICAgIGhpc3RvcnlDYXB0cnVlTGlzdDpBcnJheTxDYXB0dXJlPiA9IE1vY2tDYXB0dXJlTGlzdCgxMCxpbWFnZTEyMHg5MCk7XHJcbiAgICBoaXN0b3J5QWxhcm1MaXN0OkFycmF5PEFsYXJtPiA9IE1vY2tBbGFybUxpc3QoNSxpbWFnZTQ1eDQ1KTtcclxuICAgIGhpc3RvcnlJc1Nob3dBbGFybTpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IgKHByaXZhdGUgJHNjb3BlOiBhbnkscHJpdmF0ZSAkdGltZW91dDphbnkscHJpdmF0ZSBteWxheWVyOmFueSkge1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUNhcHRydWVQYXJhbXMudG90YWxDb3VudCA9IDIxMDtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmhpc3RvcnlDYXB0cnVlUGFyYW1zLnBhZ2VDb3VudCA9IDEwO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUNhcHRydWVQYXJhbXMucGFnZVNpemUgPSAyMTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2NhbWVyYVBvaW50SGlzdG9yeUZhY2UnLCBjYW1lcmFQb2ludEhpc3RvcnlGYWNlKTsiXX0=
