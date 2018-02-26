define(["require", "exports", "../../common/app/main.app", "./alarmTrend/alarmTrend.controller", "./areaAlarm/areaAlarm.controller", "./deviceAlarm/deviceAlarm.controller", "./libAlarm/libAlarm.controller"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalAlarmController = (function () {
        function TotalAlarmController($scope) {
            console.log("进入报警页面");
            var vm = this;
            vm.areaAlarmHtmlUrl = "/module/total/alarm/areaAlarm/areaAlarm.html?v=" + new Date().getTime();
            vm.alarmTrendHtmlUrl = "/module/total/alarm/alarmTrend/alarmTrend.html?v=" + new Date().getTime();
            vm.deviceAlarmHtmlUrl = "/module/total/alarm/deviceAlarm/deviceAlarm.html?v=" + new Date().getTime();
            vm.libAlarmHtmlUrl = "/module/total/alarm/libAlarm/libAlarm.html?v=" + new Date().getTime();
        }
        TotalAlarmController.$inject = ['$scope'];
        return TotalAlarmController;
    }());
    main_app_1.app.controller('totalAlarmController', TotalAlarmController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvYWxhcm0vdG90YWwuYWxhcm0uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFXQTtRQVFJLDhCQUFZLE1BQVc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFFZCxFQUFFLENBQUUsZ0JBQWdCLEdBQUcsaURBQWlELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNoRyxFQUFFLENBQUUsaUJBQWlCLEdBQUcsbURBQW1ELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuRyxFQUFFLENBQUUsa0JBQWtCLEdBQUcscURBQXFELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RyxFQUFFLENBQUUsZUFBZSxHQUFHLCtDQUErQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakcsQ0FBQztRQWZNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWdCaEMsMkJBQUM7S0FqQkQsQUFpQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG90YWwvYWxhcm0vdG90YWwuYWxhcm0uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IFwiLi9hbGFybVRyZW5kL2FsYXJtVHJlbmQuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vYXJlYUFsYXJtL2FyZWFBbGFybS5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi9kZXZpY2VBbGFybS9kZXZpY2VBbGFybS5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi9saWJBbGFybS9saWJBbGFybS5jb250cm9sbGVyXCJcclxuXHJcbmNsYXNzIFRvdGFsQWxhcm1Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnXTtcclxuXHJcbiAgICBhcmVhQWxhcm1IdG1sVXJsOnN0cmluZztcclxuICAgIGFsYXJtVHJlbmRIdG1sVXJsOnN0cmluZztcclxuICAgIGRldmljZUFsYXJtSHRtbFVybDpzdHJpbmc7XHJcbiAgICBsaWJBbGFybUh0bWxVcmw6c3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLov5vlhaXmiqXorabpobXpnaJcIik7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uIGFyZWFBbGFybUh0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvYWxhcm0vYXJlYUFsYXJtL2FyZWFBbGFybS5odG1sP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2bS4gYWxhcm1UcmVuZEh0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvYWxhcm0vYWxhcm1UcmVuZC9hbGFybVRyZW5kLmh0bWw/dj1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHZtLiBkZXZpY2VBbGFybUh0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvYWxhcm0vZGV2aWNlQWxhcm0vZGV2aWNlQWxhcm0uaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0uIGxpYkFsYXJtSHRtbFVybCA9IFwiL21vZHVsZS90b3RhbC9hbGFybS9saWJBbGFybS9saWJBbGFybS5odG1sP3Y9XCIgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ3RvdGFsQWxhcm1Db250cm9sbGVyJywgVG90YWxBbGFybUNvbnRyb2xsZXIpOyJdfQ==
