define(["require", "exports", "../enum/RouteKeyEnum"], function (require, exports, RouteKeyEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Total = {
        key: RouteKeyEnum_1.RouteKeyEnum.Total,
        url: '/total',
        moduleName: 'FDS_05',
        controllerName: 'totalMainController',
        controllerUrl: 'module/total/main/main.controller',
        templateUrl: '/module/total/main/main.html',
        controllerAs: 'totalMainCtrl',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.TotalGeneral
    };
    var TotalGeneral = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalGeneral,
        url: '/totalgeneral',
        moduleName: 'FDS_05_00',
        controllerUrl: 'module/total/general/total.general.controller',
        views: {
            'total': {
                templateUrl: '/module/total/general/total.general.html',
                controllerAs: 'totalGeneralCtrl',
                controllerName: 'totalGeneralController'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    var TotalTask = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalTask,
        url: '/totaltask',
        moduleName: "FDS_05_01",
        controllerName: 'totalTaskController',
        controllerUrl: 'module/total/task/total.task.controller',
        views: {
            'total': {
                templateUrl: '/module/total/task/total.task.html',
                controllerName: 'totalTaskController',
                controllerAs: 'totalTaskCtrl',
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    var TotalAlarm = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalAlarm,
        url: '/totalalarm',
        moduleName: "FDS_05_02",
        controllerUrl: 'module/total/alarm/total.alarm.controller',
        views: {
            'total': {
                templateUrl: '/module/total/alarm/total.alarm.html',
                controllerAs: 'totalAlarmCtrl',
                controllerName: 'totalAlarmController'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    var TotalFlow = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalFlow,
        url: '/totalflow',
        moduleName: "FDS_05_03",
        controllerUrl: 'module/total/flow/total.flow.controller',
        views: {
            'total': {
                templateUrl: '/module/total/flow/total.flow.html',
                controllerAs: 'totalFlowCtrl',
                controllerName: 'totalFlowController'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    var TotalUser = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalUser,
        url: '/totaluser',
        moduleName: "FDS_05_04",
        controllerUrl: 'module/total/user/total.user.controller',
        views: {
            'total': {
                templateUrl: '/module/total/user/total.user.html',
                controllerAs: 'totalUserCtrl',
                controllerName: 'totalUserController'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    var TotalSearch = {
        key: RouteKeyEnum_1.RouteKeyEnum.TotalSearch,
        url: '/totalsearch',
        moduleName: "FDS_05_05",
        controllerUrl: 'module/total/search/total.search.controller',
        views: {
            'total': {
                templateUrl: '/module/total/search/total.search.html',
                controllerAs: 'totalSearchCtrl',
                controllerName: 'totalSearchController'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.Total
    };
    exports.TotalMap = [
        Total, TotalGeneral, TotalTask, TotalAlarm, TotalFlow, TotalUser, TotalSearch
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvdG90YWwubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQU0sS0FBSyxHQUFrQjtRQUN6QixHQUFHLEVBQUUsMkJBQVksQ0FBQyxLQUFLO1FBQ3ZCLEdBQUcsRUFBRSxRQUFRO1FBQ2IsVUFBVSxFQUFFLFFBQVE7UUFDcEIsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxhQUFhLEVBQUUsbUNBQW1DO1FBQ2xELFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsWUFBWSxFQUFFLGVBQWU7UUFFN0IsVUFBVSxFQUFFLDJCQUFZLENBQUMsWUFBWTtLQUN4QyxDQUFDO0lBRUYsSUFBTSxZQUFZLEdBQWtCO1FBQ2hDLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFlBQVk7UUFDOUIsR0FBRyxFQUFFLGVBQWU7UUFDcEIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsYUFBYSxFQUFFLCtDQUErQztRQUM5RCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsWUFBWSxFQUFFLGtCQUFrQjtnQkFDaEMsY0FBYyxFQUFFLHdCQUF3QjthQUMzQztTQUNKO1FBQ0QsTUFBTSxFQUFFLDJCQUFZLENBQUMsS0FBSztLQUM3QixDQUFDO0lBRUYsSUFBTSxTQUFTLEdBQWtCO1FBQzdCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFNBQVM7UUFDM0IsR0FBRyxFQUFFLFlBQVk7UUFDakIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsY0FBYyxFQUFFLHFCQUFxQjtRQUNyQyxhQUFhLEVBQUUseUNBQXlDO1FBQ3hELEtBQUssRUFBRTtZQUNILE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQUUsb0NBQW9DO2dCQUNqRCxjQUFjLEVBQUUscUJBQXFCO2dCQUNyQyxZQUFZLEVBQUUsZUFBZTthQUNoQztTQUNKO1FBQ0QsTUFBTSxFQUFFLDJCQUFZLENBQUMsS0FBSztLQUM3QixDQUFDO0lBRUYsSUFBTSxVQUFVLEdBQWtCO1FBQzlCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFVBQVU7UUFDNUIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsYUFBYSxFQUFFLDJDQUEyQztRQUMxRCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUM7Z0JBQ0osV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsWUFBWSxFQUFFLGdCQUFnQjtnQkFDOUIsY0FBYyxFQUFFLHNCQUFzQjthQUN6QztTQUNKO1FBQ0QsTUFBTSxFQUFFLDJCQUFZLENBQUMsS0FBSztLQUM3QixDQUFDO0lBR0YsSUFBTSxTQUFTLEdBQWtCO1FBQzdCLEdBQUcsRUFBRSwyQkFBWSxDQUFDLFNBQVM7UUFDM0IsR0FBRyxFQUFFLFlBQVk7UUFDakIsVUFBVSxFQUFFLFdBQVc7UUFDdkIsYUFBYSxFQUFFLHlDQUF5QztRQUN4RCxLQUFLLEVBQUU7WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsWUFBWSxFQUFFLGVBQWU7Z0JBQzdCLGNBQWMsRUFBRSxxQkFBcUI7YUFDeEM7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLEtBQUs7S0FDN0IsQ0FBQztJQUVGLElBQU0sU0FBUyxHQUFrQjtRQUM3QixHQUFHLEVBQUUsMkJBQVksQ0FBQyxTQUFTO1FBQzNCLEdBQUcsRUFBRSxZQUFZO1FBQ2pCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLGFBQWEsRUFBRSx5Q0FBeUM7UUFDeEQsS0FBSyxFQUFFO1lBQ0gsT0FBTyxFQUFDO2dCQUNKLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELFlBQVksRUFBRSxlQUFlO2dCQUM3QixjQUFjLEVBQUUscUJBQXFCO2FBQ3hDO1NBQ0o7UUFDRCxNQUFNLEVBQUUsMkJBQVksQ0FBQyxLQUFLO0tBQzdCLENBQUM7SUFFRixJQUFNLFdBQVcsR0FBa0I7UUFDL0IsR0FBRyxFQUFFLDJCQUFZLENBQUMsV0FBVztRQUM3QixHQUFHLEVBQUUsY0FBYztRQUNuQixVQUFVLEVBQUUsV0FBVztRQUN2QixhQUFhLEVBQUUsNkNBQTZDO1FBQzVELEtBQUssRUFBRTtZQUNILE9BQU8sRUFBQztnQkFDSixXQUFXLEVBQUUsd0NBQXdDO2dCQUNyRCxZQUFZLEVBQUUsaUJBQWlCO2dCQUMvQixjQUFjLEVBQUUsdUJBQXVCO2FBQzFDO1NBQ0o7UUFDRCxNQUFNLEVBQUUsMkJBQVksQ0FBQyxLQUFLO0tBQzdCLENBQUM7SUFFVyxRQUFBLFFBQVEsR0FBRztRQUNwQixLQUFLLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXO0tBQ3hELENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9yb3V0ZXIvbWFwL3RvdGFsLm1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzE5LlxyXG4gKi9cclxuaW1wb3J0IHtJUm91dGVyQ29uZmlnfSBmcm9tIFwiLi4vcm91dGVyXCI7XHJcbmltcG9ydCB7Um91dGVLZXlFbnVtfSBmcm9tIFwiLi4vZW51bS9Sb3V0ZUtleUVudW1cIjtcclxuaW1wb3J0IHtHcm91cEVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlR3JvdXBFbnVtXCI7XHJcblxyXG5jb25zdCBUb3RhbDogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRvdGFsLFxyXG4gICAgdXJsOiAnL3RvdGFsJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDUnLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICd0b3RhbE1haW5Db250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG90YWwvbWFpbi9tYWluLmNvbnRyb2xsZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL3RvdGFsL21haW4vbWFpbi5odG1sJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ3RvdGFsTWFpbkN0cmwnLFxyXG5cclxuICAgIHJlZGlyZWN0VG86IFJvdXRlS2V5RW51bS5Ub3RhbEdlbmVyYWxcclxufTtcclxuXHJcbmNvbnN0IFRvdGFsR2VuZXJhbDogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRvdGFsR2VuZXJhbCxcclxuICAgIHVybDogJy90b3RhbGdlbmVyYWwnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wNV8wMCcsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3RvdGFsL2dlbmVyYWwvdG90YWwuZ2VuZXJhbC5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RvdGFsJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG90YWwvZ2VuZXJhbC90b3RhbC5nZW5lcmFsLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd0b3RhbEdlbmVyYWxDdHJsJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICd0b3RhbEdlbmVyYWxDb250cm9sbGVyJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5Ub3RhbFxyXG59O1xyXG5cclxuY29uc3QgVG90YWxUYXNrOiBJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uVG90YWxUYXNrLFxyXG4gICAgdXJsOiAnL3RvdGFsdGFzaycsXHJcbiAgICBtb2R1bGVOYW1lOiBcIkZEU18wNV8wMVwiLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICd0b3RhbFRhc2tDb250cm9sbGVyJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG90YWwvdGFzay90b3RhbC50YXNrLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAndG90YWwnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b3RhbC90YXNrL3RvdGFsLnRhc2suaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAndG90YWxUYXNrQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RvdGFsVGFza0N0cmwnLFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5Ub3RhbFxyXG59O1xyXG5cclxuY29uc3QgVG90YWxBbGFybTogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRvdGFsQWxhcm0sXHJcbiAgICB1cmw6ICcvdG90YWxhbGFybScsXHJcbiAgICBtb2R1bGVOYW1lOiBcIkZEU18wNV8wMlwiLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS90b3RhbC9hbGFybS90b3RhbC5hbGFybS5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RvdGFsJzp7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b3RhbC9hbGFybS90b3RhbC5hbGFybS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndG90YWxBbGFybUN0cmwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3RvdGFsQWxhcm1Db250cm9sbGVyJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5Ub3RhbFxyXG59O1xyXG5cclxuXHJcbmNvbnN0IFRvdGFsRmxvdzogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRvdGFsRmxvdyxcclxuICAgIHVybDogJy90b3RhbGZsb3cnLFxyXG4gICAgbW9kdWxlTmFtZTogXCJGRFNfMDVfMDNcIixcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvdG90YWwvZmxvdy90b3RhbC5mbG93LmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICAndG90YWwnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b3RhbC9mbG93L3RvdGFsLmZsb3cuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RvdGFsRmxvd0N0cmwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3RvdGFsRmxvd0NvbnRyb2xsZXInXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRvdGFsXHJcbn07XHJcblxyXG5jb25zdCBUb3RhbFVzZXI6IElSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5Ub3RhbFVzZXIsXHJcbiAgICB1cmw6ICcvdG90YWx1c2VyJyxcclxuICAgIG1vZHVsZU5hbWU6IFwiRkRTXzA1XzA0XCIsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3RvdGFsL3VzZXIvdG90YWwudXNlci5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgJ3RvdGFsJzp7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS90b3RhbC91c2VyL3RvdGFsLnVzZXIuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3RvdGFsVXNlckN0cmwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3RvdGFsVXNlckNvbnRyb2xsZXInXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRvdGFsXHJcbn07XHJcblxyXG5jb25zdCBUb3RhbFNlYXJjaDogSVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlRvdGFsU2VhcmNoLFxyXG4gICAgdXJsOiAnL3RvdGFsc2VhcmNoJyxcclxuICAgIG1vZHVsZU5hbWU6IFwiRkRTXzA1XzA1XCIsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL3RvdGFsL3NlYXJjaC90b3RhbC5zZWFyY2guY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgICd0b3RhbCc6e1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvdG90YWwvc2VhcmNoL3RvdGFsLnNlYXJjaC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndG90YWxTZWFyY2hDdHJsJyxcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICd0b3RhbFNlYXJjaENvbnRyb2xsZXInXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLlRvdGFsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgVG90YWxNYXAgPSBbXHJcbiAgICBUb3RhbCwgVG90YWxHZW5lcmFsLCBUb3RhbFRhc2ssIFRvdGFsQWxhcm0sIFRvdGFsRmxvdywgVG90YWxVc2VyLCBUb3RhbFNlYXJjaFxyXG5dIGFzIEFycmF5PElSb3V0ZXJDb25maWc+OyJdfQ==
