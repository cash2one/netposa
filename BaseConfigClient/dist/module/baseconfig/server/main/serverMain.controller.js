define(["require", "exports", "../../../common/app/main.app", "../../../common/router/router.service", "css!module/baseconfig/css/baseconfig.css"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigServerMainController = (function () {
        function BaseConfigServerMainController($scope) {
            var vm = this;
            vm.serverModuleItems = router_service_1.default.getInstance().getModuleItems('baseconfig.server');
            console.log($scope.moduleItems);
        }
        BaseConfigServerMainController.$inject = ['$scope'];
        return BaseConfigServerMainController;
    }());
    main_app_1.app.controller('baseConfigServerMainController', BaseConfigServerMainController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvbWFpbi9zZXJ2ZXJNYWluLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFHSSx3Q0FBWSxNQUFXO1lBQ25CLElBQUksRUFBRSxHQUFFLElBQUksQ0FBQztZQUNiLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyx3QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFOTSxzQ0FBTyxHQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBTzlDLHFDQUFDO0tBUkQsQUFRQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3NlcnZlci9tYWluL3NlcnZlck1haW4uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIzLlxyXG4gKi9cclxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhbW9kdWxlL2Jhc2Vjb25maWcvY3NzL2Jhc2Vjb25maWcuY3NzJztcclxuXHJcbmltcG9ydCByb3V0ZXJTZXJ2aWNlIGZyb20gJy4uLy4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgQmFzZUNvbmZpZ1NlcnZlck1haW5Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRzY29wZSddO1xyXG4gICAgc2VydmVyTW9kdWxlSXRlbXM6YW55O1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpIHtcclxuICAgICAgICBsZXQgdm0gPXRoaXM7XHJcbiAgICAgICAgdm0uc2VydmVyTW9kdWxlSXRlbXMgPSByb3V0ZXJTZXJ2aWNlLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlSXRlbXMoJ2Jhc2Vjb25maWcuc2VydmVyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLm1vZHVsZUl0ZW1zKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jhc2VDb25maWdTZXJ2ZXJNYWluQ29udHJvbGxlcicsIEJhc2VDb25maWdTZXJ2ZXJNYWluQ29udHJvbGxlcik7Il19
