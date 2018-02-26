define(["require", "exports", "../../common/app/main.app", "css!module/log/css/log"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogAlarmController = (function () {
        function LogAlarmController($scope) {
            $scope.export = exportFunc;
            $scope.dataRemote = "这是报警管理页面";
            function exportFunc() {
            }
        }
        LogAlarmController.$inject = ['$scope'];
        return LogAlarmController;
    }());
    main_app_1.app
        .controller('logAlarmController', LogAlarmController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9nL2FsYXJtL2FsYXJtLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFHSSw0QkFBWSxNQUFXO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO1lBRTNCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBRS9CO1lBQ0EsQ0FBQztRQUNMLENBQUM7UUFUTSwwQkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFVaEMseUJBQUM7S0FYRCxBQVdDLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2xvZy9hbGFybS9hbGFybS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMTYuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhbW9kdWxlL2xvZy9jc3MvbG9nJztcclxuXHJcbmNsYXNzIExvZ0FsYXJtQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpIHtcclxuICAgICAgICAkc2NvcGUuZXhwb3J0ID0gZXhwb3J0RnVuYztcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGFSZW1vdGUgPSBcIui/meaYr+aKpeitpueuoeeQhumhtemdolwiO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBleHBvcnRGdW5jKCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignbG9nQWxhcm1Db250cm9sbGVyJywgTG9nQWxhcm1Db250cm9sbGVyKTsiXX0=
