define(["require", "exports", "../../common/app/main.app", "./areaFlow/areaFlow.controller", "./deviceFlow/deviceFlow.controller"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalFlowController = (function () {
        function TotalFlowController($scope) {
            var vm = this;
            vm.moduleName = "流量统计页面";
            console.error(vm.moduleName);
            vm.areaFlowHtmlUrl = "/module/total/flow/areaFlow/areaFlow.html?v=" + new Date().getTime();
            vm.deviceFlowHtmlUrl = "/module/total/flow/deviceFlow/deviceFlow.html?v=" + new Date().getTime();
        }
        TotalFlowController.$inject = ["$scope"];
        return TotalFlowController;
    }());
    main_app_1.app.controller('totalFlowController', TotalFlowController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvZmxvdy90b3RhbC5mbG93LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFTSSw2QkFBWSxNQUFXO1lBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLEVBQUUsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTdCLEVBQUUsQ0FBQyxlQUFlLEdBQUcsOENBQThDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzRixFQUFFLENBQUMsaUJBQWlCLEdBQUcsa0RBQWtELEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyRyxDQUFDO1FBZk0sMkJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBZ0JoQywwQkFBQztLQWpCRCxBQWlCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b3RhbC9mbG93L3RvdGFsLmZsb3cuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzIxLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IFwiLi9hcmVhRmxvdy9hcmVhRmxvdy5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi9kZXZpY2VGbG93L2RldmljZUZsb3cuY29udHJvbGxlclwiXHJcblxyXG5jbGFzcyBUb3RhbEZsb3dDb250cm9sbGVye1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIl07XHJcbiAgICBtb2R1bGVOYW1lOnN0cmluZztcclxuXHJcbiAgICBhcmVhRmxvd0h0bWxVcmw6c3RyaW5nO1xyXG4gICAgZGV2aWNlRmxvd0h0bWxVcmw6c3RyaW5nO1xyXG5cclxuXHJcblxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBhbnkpe1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0ubW9kdWxlTmFtZSA9IFwi5rWB6YeP57uf6K6h6aG16Z2iXCI7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcih2bS5tb2R1bGVOYW1lKTtcclxuXHJcbiAgICAgICAgdm0uYXJlYUZsb3dIdG1sVXJsID0gXCIvbW9kdWxlL3RvdGFsL2Zsb3cvYXJlYUZsb3cvYXJlYUZsb3cuaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdm0uZGV2aWNlRmxvd0h0bWxVcmwgPSBcIi9tb2R1bGUvdG90YWwvZmxvdy9kZXZpY2VGbG93L2RldmljZUZsb3cuaHRtbD92PVwiICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0b3RhbEZsb3dDb250cm9sbGVyJywgVG90YWxGbG93Q29udHJvbGxlcik7Il19
