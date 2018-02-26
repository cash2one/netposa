define(["require", "exports", "../../common/app/main.app", "../../common/router/router.service", "css!../css/toolOption.css"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ToolOptionController = (function () {
        function ToolOptionController($scope) {
            var vm = this;
            vm.isCollapse = false;
            var moduleItems = router_service_1.default.getInstance().getModuleItems('toolOption');
            console.log(moduleItems, "==========================================");
            console.error("进入选项模块名", moduleItems);
            vm.moduleItems = moduleItems;
        }
        ToolOptionController.$inject = ['$scope'];
        return ToolOptionController;
    }());
    main_app_1.app.controller('toolOptionController', ToolOptionController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9tYWluL21haW4uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQU1JLDhCQUFZLE1BQVc7WUFDbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxXQUFXLEdBQUcsd0JBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsNENBQTRDLENBQUMsQ0FBQztZQUN2RSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUV0QyxFQUFFLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUNqQyxDQUFDO1FBZE0sNEJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBZWhDLDJCQUFDO0tBaEJELEFBZ0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Rvb2xPcHRpb24vbWFpbi9tYWluLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzcvMS5cclxuICovXHJcblxyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL3Rvb2xPcHRpb24uY3NzXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0lSb3V0ZXJDb25maWd9IGZyb20gXCIuLi8uLi9jb21tb24vcm91dGVyL3JvdXRlclwiO1xyXG5pbXBvcnQgUm91dGVyU2VydmljZSBmcm9tIFwiLi4vLi4vY29tbW9uL3JvdXRlci9yb3V0ZXIuc2VydmljZVwiO1xyXG5cclxuY2xhc3MgVG9vbE9wdGlvbkNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuICAgIG1vZHVsZUl0ZW1zOiBBcnJheTxhbnk+O1xyXG4gICAgaXNDb2xsYXBzZTogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uaXNDb2xsYXBzZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBsZXQgbW9kdWxlSXRlbXMgPSBSb3V0ZXJTZXJ2aWNlLmdldEluc3RhbmNlKCkuZ2V0TW9kdWxlSXRlbXMoJ3Rvb2xPcHRpb24nKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2R1bGVJdGVtcywgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIui/m+WFpemAiemhueaooeWdl+WQjVwiLCBtb2R1bGVJdGVtcyk7XHJcbiAgICAgICAgLy8g5Y+W5Ye65LiN5YyF5ZCrY2hpbGRyZW7nmoRcclxuICAgICAgICB2bS5tb2R1bGVJdGVtcyA9IG1vZHVsZUl0ZW1zO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcigndG9vbE9wdGlvbkNvbnRyb2xsZXInLCBUb29sT3B0aW9uQ29udHJvbGxlcik7Il19
