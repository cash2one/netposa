define(["require", "exports", "../../common/app/main.app", "../../common/router/router.service", "css!module/total/css/total.css"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TotalMainController = (function () {
        function TotalMainController($scope) {
            var vm = this;
            vm.isCollapse = false;
            var moduleItems = router_service_1.default.getInstance().getModuleItems('total');
            console.error("进入total页面", moduleItems);
            vm.moduleItems = moduleItems;
        }
        TotalMainController.$inject = ["$scope"];
        return TotalMainController;
    }());
    main_app_1.app
        .controller('totalMainController', TotalMainController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvbWFpbi9tYWluLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFNSSw2QkFBWSxNQUFXO1lBQ25CLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLEVBQUUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksV0FBVyxHQUFHLHdCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLENBQUM7UUFYTSwyQkFBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFhaEMsMEJBQUM7S0FkRCxBQWNDLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RvdGFsL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjEuXHJcbiAqL1xyXG5pbXBvcnQgJ2NzcyFtb2R1bGUvdG90YWwvY3NzL3RvdGFsLmNzcyc7XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJUm91dGVyQ29uZmlnfSBmcm9tIFwiLi4vLi4vY29tbW9uL3JvdXRlci9yb3V0ZXJcIjtcclxuaW1wb3J0IFJvdXRlclNlcnZpY2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyLnNlcnZpY2VcIjtcclxuXHJcbmNsYXNzIFRvdGFsTWFpbkNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIl07XHJcblxyXG4gICAgbW9kdWxlSXRlbXM6IEFycmF5PGFueT47XHJcbiAgICBpc0NvbGxhcHNlOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55KSB7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICB2bS5pc0NvbGxhcHNlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG1vZHVsZUl0ZW1zID0gUm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zKCd0b3RhbCcpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCLov5vlhaV0b3RhbOmhtemdolwiLCBtb2R1bGVJdGVtcyk7XHJcbiAgICAgICAgdm0ubW9kdWxlSXRlbXMgPSBtb2R1bGVJdGVtcztcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ3RvdGFsTWFpbkNvbnRyb2xsZXInLCBUb3RhbE1haW5Db250cm9sbGVyKTsiXX0=
