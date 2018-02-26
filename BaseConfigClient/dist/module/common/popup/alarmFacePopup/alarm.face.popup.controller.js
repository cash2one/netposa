define(["require", "exports", "../../app/main.app", "css!./alarmfacepopup.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmFacePopupController = (function () {
        function AlarmFacePopupController($scope, mylayer) {
            this.$scope = $scope;
            this.mylayer = mylayer;
            this.faceAlarmData = this.$scope.faceAlarmData;
            this.currentSelectItem = this.faceAlarmData.AlarmLogInfoArr[0];
        }
        AlarmFacePopupController.prototype.chooseAlarmLogInfo = function (item) {
            this.currentSelectItem = item;
        };
        AlarmFacePopupController.$inject = ['$scope'];
        return AlarmFacePopupController;
    }());
    main_app_1.app.controller('commonAlarmFacePopupController', AlarmFacePopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3BvcHVwL2FsYXJtRmFjZVBvcHVwL2FsYXJtLmZhY2UucG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQUtJLGtDQUFvQixNQUFzQyxFQUFTLE9BQVc7WUFBMUQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0M7WUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQzFFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFFL0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFFRCxxREFBa0IsR0FBbEIsVUFBbUIsSUFBa0I7WUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUNsQyxDQUFDO1FBWk0sZ0NBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBYWhDLCtCQUFDO0tBZEQsQUFjQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vcG9wdXAvYWxhcm1GYWNlUG9wdXAvYWxhcm0uZmFjZS5wb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5ndWxhclNjb3BlIH0gZnJvbSAnLi4vLi4vdHlwZXMvYmFzZUFuZ3VsYXJTY29wZSc7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCBcImNzcyEuL2FsYXJtZmFjZXBvcHVwLmNzc1wiO1xyXG5pbXBvcnQgeyBTZWFyY2hBbGFybUxvZ1Jlc3VsdCwgQWxhcm1Mb2dJbmZvIH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBbGFybUZhY2VQb3B1cENvbnRyb2xsZXJQYXJhbXMgZXh0ZW5kcyBBbmd1bGFyU2NvcGV7XHJcbiAgICBmYWNlQWxhcm1EYXRhOiBTZWFyY2hBbGFybUxvZ1Jlc3VsdDtcclxufVxyXG5cclxuY2xhc3MgQWxhcm1GYWNlUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnXTtcclxuICAgIGZhY2VBbGFybURhdGE6IFNlYXJjaEFsYXJtTG9nUmVzdWx0O1xyXG4gICAgY3VycmVudFNlbGVjdEl0ZW06IEFsYXJtTG9nSW5mbztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogQWxhcm1GYWNlUG9wdXBDb250cm9sbGVyUGFyYW1zLHByaXZhdGUgbXlsYXllcjphbnkpIHtcclxuICAgICAgICB0aGlzLmZhY2VBbGFybURhdGEgPSB0aGlzLiRzY29wZS5mYWNlQWxhcm1EYXRhO1xyXG4gICAgICAgIC8vIOm7mOiupOmAieS4reesrOS4gOS4qlxyXG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdEl0ZW0gPSB0aGlzLmZhY2VBbGFybURhdGEuQWxhcm1Mb2dJbmZvQXJyWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIGNob29zZUFsYXJtTG9nSW5mbyhpdGVtOiBBbGFybUxvZ0luZm8pe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdEl0ZW0gPSBpdGVtO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignY29tbW9uQWxhcm1GYWNlUG9wdXBDb250cm9sbGVyJywgQWxhcm1GYWNlUG9wdXBDb250cm9sbGVyKTsiXX0=
