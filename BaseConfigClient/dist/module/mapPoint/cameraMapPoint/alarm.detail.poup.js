define(["require", "exports", "../../common/app/main.app", "../../common/directive/page/page-params"], function (require, exports, main_app_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var image64x64 = 'http://temp.im/64x64/ccc/fff';
    var image120x90 = 'http://temp.im/120x90/ccc/fff';
    var image120x120 = 'http://temp.im/120x120/ccc/fff';
    var image45x45 = 'http://temp.im/45x45/ccc/fff';
    var AlarmDetailPoupController = (function () {
        function AlarmDetailPoupController($scope, mylayer) {
            var _this = this;
            this.$scope = $scope;
            this.mylayer = mylayer;
            this.historyCaptrueParams = new page_params_1.default(1, 10);
            this.isShowHistory = false;
            this.historyIsShowAlarm = false;
            console.log(this.topCaptrueList);
            this.historyCaptrueParams.totalCount = 210;
            this.historyCaptrueParams.currentPage = 1;
            this.historyCaptrueParams.pageCount = 10;
            this.historyCaptrueParams.pageSize = 21;
            this.$scope.$on('$destroy', function () {
                _this.$scope.$emit('closeiframe');
            });
        }
        AlarmDetailPoupController.prototype.closeMyLayer = function () {
            this.mylayer.close('huangjingjing');
        };
        AlarmDetailPoupController.$inject = ['$scope', 'mylayer'];
        return AlarmDetailPoupController;
    }());
    main_app_1.app.controller('alarmDetailPoupController', AlarmDetailPoupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvYWxhcm0uZGV0YWlsLnBvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBS0EsSUFBTSxVQUFVLEdBQVUsOEJBQThCLENBQUM7SUFDekQsSUFBTSxXQUFXLEdBQVUsK0JBQStCLENBQUM7SUFDM0QsSUFBTSxZQUFZLEdBQVUsZ0NBQWdDLENBQUM7SUFDN0QsSUFBTSxVQUFVLEdBQVUsOEJBQThCLENBQUM7SUFDekQ7UUFhSSxtQ0FBb0IsTUFBVyxFQUFTLE9BQVc7WUFBbkQsaUJBU0M7WUFUbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFTLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFUbkQseUJBQW9CLEdBQWMsSUFBSSxxQkFBVSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztZQU12RCxrQkFBYSxHQUFXLEtBQUssQ0FBQztZQUM5Qix1QkFBa0IsR0FBVyxLQUFLLENBQUM7WUFHL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNwQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxnREFBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDdkMsQ0FBQztRQXhCTSxpQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBMEIxQyxnQ0FBQztLQTNCRCxBQTJCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9jYW1lcmFNYXBQb2ludC9hbGFybS5kZXRhaWwucG91cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtDYXB0dXJlLEFsYXJtfSBmcm9tIFwiLi9UZXN0RW51bVwiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuY29uc3QgaW1hZ2U2NHg2NDpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNjR4NjQvY2NjL2ZmZic7XHJcbmNvbnN0IGltYWdlMTIweDkwOnN0cmluZyA9ICdodHRwOi8vdGVtcC5pbS8xMjB4OTAvY2NjL2ZmZic7XHJcbmNvbnN0IGltYWdlMTIweDEyMDpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vMTIweDEyMC9jY2MvZmZmJztcclxuY29uc3QgaW1hZ2U0NXg0NTpzdHJpbmcgPSAnaHR0cDovL3RlbXAuaW0vNDV4NDUvY2NjL2ZmZic7XHJcbmNsYXNzIEFsYXJtRGV0YWlsUG91cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ215bGF5ZXInXTtcclxuXHJcbiAgICBhbGFybU5vd0luZm86QWxhcm0gO1xyXG4gICAgaGlzdG9yeUNhcHRydWVQYXJhbXM6UGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKDEsMTApO1xyXG4gICAgdG9wQ2FwdHJ1ZUxpc3Q6QXJyYXk8Q2FwdHVyZT47XHJcbiAgICBoaXN0b3J5Q2FwdHJ1ZUxpc3Q6QXJyYXk8Q2FwdHVyZT4gO1xyXG4gICAgaGlzdG9yeUFsYXJtTGlzdDpBcnJheTxBbGFybT47XHJcbiAgICBhbGFybUluZm9MaXN0OkFycmF5PEFsYXJtPjtcclxuXHJcbiAgICBpc1Nob3dIaXN0b3J5OmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGhpc3RvcnlJc1Nob3dBbGFybTpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxwcml2YXRlIG15bGF5ZXI6YW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50b3BDYXB0cnVlTGlzdCk7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy50b3RhbENvdW50ID0gMjEwO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUNhcHRydWVQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuaGlzdG9yeUNhcHRydWVQYXJhbXMucGFnZUNvdW50ID0gMTA7XHJcbiAgICAgICAgdGhpcy5oaXN0b3J5Q2FwdHJ1ZVBhcmFtcy5wYWdlU2l6ZSA9IDIxO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbG9zZWlmcmFtZScpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGNsb3NlTXlMYXllcigpe1xyXG4gICAgICAgIHRoaXMubXlsYXllci5jbG9zZSgnaHVhbmdqaW5namluZycpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYWxhcm1EZXRhaWxQb3VwQ29udHJvbGxlcicsIEFsYXJtRGV0YWlsUG91cENvbnRyb2xsZXIpOyJdfQ==
