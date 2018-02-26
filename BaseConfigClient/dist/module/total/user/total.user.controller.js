define(["require", "exports", "../../common/app/main.app", "./areaUser/areaUser.controller", "./unitUser/unitUser.controller", "./trendUser/trendUser.controller"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalUserController = (function () {
        function TotalUserController($scope) {
            var vm = this;
            console.log("用户统计页面");
            vm.areaUserHtmlUrl = "/module/total/user/areaUser/areaUser.html?v=" + new Date().getTime();
            vm.unitUserHtmlUrl = "/module/total/user/unitUser/unitUser.html?v=" + new Date().getTime();
            vm.trendUserHtmlUrl = "/module/total/user/trendUser/trendUser.html?v=" + new Date().getTime();
        }
        TotalUserController.$inject = ["$scope"];
        return TotalUserController;
    }());
    main_app_1.app.controller('totalUserController', TotalUserController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdXNlci90b3RhbC51c2VyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0E7UUFPSSw2QkFBWSxNQUFXO1lBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFdEIsRUFBRSxDQUFDLGVBQWUsR0FBRyw4Q0FBOEMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNGLEVBQUUsQ0FBQyxlQUFlLEdBQUcsOENBQThDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzRixFQUFFLENBQUMsZ0JBQWdCLEdBQUcsZ0RBQWdELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsRyxDQUFDO1FBYk0sMkJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBY2hDLDBCQUFDO0tBZkQsQUFlQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b3RhbC91c2VyL3RvdGFsLnVzZXIuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNC8yMS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vYXJlYVVzZXIvYXJlYVVzZXIuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vdW5pdFVzZXIvdW5pdFVzZXIuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vdHJlbmRVc2VyL3RyZW5kVXNlci5jb250cm9sbGVyXCJcclxuXHJcblxyXG5jbGFzcyBUb3RhbFVzZXJDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIl07XHJcblxyXG4gICAgYXJlYVVzZXJIdG1sVXJsOnN0cmluZztcclxuICAgIHVuaXRVc2VySHRtbFVybDpzdHJpbmc7XHJcbiAgICB0cmVuZFVzZXJIdG1sVXJsOnN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSl7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICBjb25zb2xlLmxvZyhcIueUqOaIt+e7n+iuoemhtemdolwiKTtcclxuXHJcbiAgICAgICAgdm0uYXJlYVVzZXJIdG1sVXJsID0gXCIvbW9kdWxlL3RvdGFsL3VzZXIvYXJlYVVzZXIvYXJlYVVzZXIuaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0udW5pdFVzZXJIdG1sVXJsID0gXCIvbW9kdWxlL3RvdGFsL3VzZXIvdW5pdFVzZXIvdW5pdFVzZXIuaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0udHJlbmRVc2VySHRtbFVybCA9IFwiL21vZHVsZS90b3RhbC91c2VyL3RyZW5kVXNlci90cmVuZFVzZXIuaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0b3RhbFVzZXJDb250cm9sbGVyJywgVG90YWxVc2VyQ29udHJvbGxlcik7Il19
