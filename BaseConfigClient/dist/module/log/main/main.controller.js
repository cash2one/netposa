define(["require", "exports", "../../common/app/main.app", "../../common/router/router.service"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogMainController = (function () {
        function LogMainController($scope) {
            $scope.moduleItems = router_service_1.default.getInstance().getModuleItems('log');
        }
        LogMainController.$inject = ['$scope'];
        return LogMainController;
    }());
    main_app_1.app
        .controller('logMainController', LogMainController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbG9nL21haW4vbWFpbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBR0ksMkJBQVksTUFBVztZQUNuQixNQUFNLENBQUMsV0FBVyxHQUFHLHdCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFKTSx5QkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFLaEMsd0JBQUM7S0FORCxBQU1DLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2xvZy9tYWluL21haW4uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIwLlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBSb3V0ZXJTZXJ2aWNlIGZyb20gJy4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyLnNlcnZpY2UnO1xyXG5cclxuY2xhc3MgTG9nTWFpbkNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55KSB7XHJcbiAgICAgICAgJHNjb3BlLm1vZHVsZUl0ZW1zID0gUm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zKCdsb2cnKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignbG9nTWFpbkNvbnRyb2xsZXInLCBMb2dNYWluQ29udHJvbGxlcik7Il19
