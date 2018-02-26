define(["require", "exports", "../../common/app/main.app", "css!module/log/css/log"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogPersonController = (function () {
        function LogPersonController($scope) {
            $scope.export = exportFunc;
            $scope.dataRemote = "这是人员日志界面";
            function exportFunc() {
            }
        }
        LogPersonController.$inject = ['$scope'];
        return LogPersonController;
    }());
    main_app_1.app
        .controller('logPersonController', LogPersonController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9nL3BlcnNvbi9wZXJzb24uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQUdJLDZCQUFZLE1BQVc7WUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFFM0IsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFFL0I7WUFDQSxDQUFDO1FBQ0wsQ0FBQztRQVRNLDJCQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQVVoQywwQkFBQztLQVhELEFBV0MsSUFBQTtJQUVELGNBQUc7U0FDRSxVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbG9nL3BlcnNvbi9wZXJzb24uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzE2LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIW1vZHVsZS9sb2cvY3NzL2xvZyc7IC8vIOi/memHjOW6lOivpeWcqCRyb3V0ZXJQcm92aWRlcueahGNvbmZpZ+mHjOiuvue9rlxyXG5cclxuY2xhc3MgTG9nUGVyc29uQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpIHtcclxuICAgICAgICAkc2NvcGUuZXhwb3J0ID0gZXhwb3J0RnVuYztcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGFSZW1vdGUgPSBcIui/meaYr+S6uuWRmOaXpeW/l+eVjOmdolwiO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBleHBvcnRGdW5jKCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignbG9nUGVyc29uQ29udHJvbGxlcicsIExvZ1BlcnNvbkNvbnRyb2xsZXIpO1xyXG4iXX0=
