define(["require", "exports", "../../common/app/main.app", "./areaTask/areaTask.controller", "./libTask/libTask.controller"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalTaskController = (function () {
        function TotalTaskController($scope) {
            var vm = this;
            console.error("任务统计页面");
            vm.areaTaskHtmlUrl = "/module/total/task/areaTask/areaTask.html?v=" + new Date().getTime();
            vm.libTaskHtmlUrl = "/module/total/task/libTask/libTask.html?v=" + new Date().getTime();
        }
        TotalTaskController.$inject = ["$scope"];
        return TotalTaskController;
    }());
    main_app_1.app.controller('totalTaskController', TotalTaskController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvdGFzay90b3RhbC50YXNrLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFNSSw2QkFBWSxNQUFXO1lBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEIsRUFBRSxDQUFDLGVBQWUsR0FBRyw4Q0FBOEMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNGLEVBQUUsQ0FBQyxjQUFjLEdBQUcsNENBQTRDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM1RixDQUFDO1FBWE0sMkJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBWWhDLDBCQUFDO0tBYkQsQUFhQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b3RhbC90YXNrL3RvdGFsLnRhc2suY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNC8yMS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmltcG9ydCBcIi4vYXJlYVRhc2svYXJlYVRhc2suY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4vbGliVGFzay9saWJUYXNrLmNvbnRyb2xsZXJcIlxyXG5cclxuY2xhc3MgVG90YWxUYXNrQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCJdO1xyXG5cclxuICAgIGFyZWFUYXNrSHRtbFVybDpzdHJpbmc7XHJcbiAgICBsaWJUYXNrSHRtbFVybDpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpe1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIuS7u+WKoee7n+iuoemhtemdolwiKTtcclxuXHJcbiAgICAgICAgdm0uYXJlYVRhc2tIdG1sVXJsID0gXCIvbW9kdWxlL3RvdGFsL3Rhc2svYXJlYVRhc2svYXJlYVRhc2suaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0ubGliVGFza0h0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvdGFzay9saWJUYXNrL2xpYlRhc2suaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0b3RhbFRhc2tDb250cm9sbGVyJywgVG90YWxUYXNrQ29udHJvbGxlcik7Il19
