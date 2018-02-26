define(["require", "exports", "../../common/app/main.app", "css!module/log/css/log.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogPassController = (function () {
        function LogPassController($scope) {
            $scope.export = exportFunc;
            $scope.dataRemote = "初始化一些文字信息aaaaaaaaaaaaaa";
            function exportFunc() {
            }
        }
        LogPassController.$inject = ['$scope'];
        return LogPassController;
    }());
    main_app_1.app
        .controller('logPassController', LogPassController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9nL3Bhc3MvcGFzcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBR0ksMkJBQVksTUFBVztZQUNuQixNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQztZQUUzQixNQUFNLENBQUMsVUFBVSxHQUFHLHlCQUF5QixDQUFDO1lBRTlDO1lBQ0EsQ0FBQztRQUNMLENBQUM7UUFUTSx5QkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFVaEMsd0JBQUM7S0FYRCxBQVdDLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2xvZy9wYXNzL3Bhc3MuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzE2LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIW1vZHVsZS9sb2cvY3NzL2xvZy5jc3MnO1xyXG5cclxuY2xhc3MgTG9nUGFzc0NvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZSA6YW55KSB7XHJcbiAgICAgICAgJHNjb3BlLmV4cG9ydCA9IGV4cG9ydEZ1bmM7XHJcblxyXG4gICAgICAgICRzY29wZS5kYXRhUmVtb3RlID0gXCLliJ3lp4vljJbkuIDkupvmloflrZfkv6Hmga9hYWFhYWFhYWFhYWFhYVwiO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBleHBvcnRGdW5jKCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignbG9nUGFzc0NvbnRyb2xsZXInLCBMb2dQYXNzQ29udHJvbGxlcik7Il19
