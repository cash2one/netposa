define(["require", "exports", "../enum/RouteKeyEnum", "../enum/RouteGroupEnum"], function (require, exports, RouteKeyEnum_1, RouteGroupEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainTain = {
        key: RouteKeyEnum_1.RouteKeyEnum.MainTain,
        url: '/maintain',
        moduleName: 'FDS_02',
        controllerName: 'maintainController',
        controllerUrl: 'module/maintain/main/main.controller',
        controllerAs: 'maintainCtrl',
        templateUrl: '/module/maintain/main/maintain.html',
        redirectTo: RouteKeyEnum_1.RouteKeyEnum.statisticalAnalysis
    };
    var StatisticalAnalysis = {
        key: RouteKeyEnum_1.RouteKeyEnum.statisticalAnalysis,
        url: '/statisticalanalysis',
        moduleName: 'FDS_02_02_09',
        controllerUrl: 'module/maintain/statisticsOverview/statisticalanalysis/statisticalanalysis.controller',
        views: {
            "maintain": {
                controllerName: 'statisticalAnalysisController',
                controllerAs: 'statisticalAnalysisCtrl',
                templateUrl: '/module/maintain/statisticsOverview/statisticalanalysis/statisticalanalysis.html'
            }
        },
        icon: 'statisticalAnalysis',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var TaskStatistics = {
        key: RouteKeyEnum_1.RouteKeyEnum.taskStatistics,
        url: '/taskStatistics',
        moduleName: 'FDS_02_02_11',
        controllerUrl: 'module/maintain/statisticsOverview/taskStatistics/taskStatistics.controller',
        views: {
            "maintain": {
                controllerName: 'taskStatisticsController',
                controllerAs: 'taskStatisticsCtrl',
                templateUrl: '/module/maintain/statisticsOverview/taskStatistics/taskStatistics.html'
            }
        },
        icon: 'taskStatistics',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var AlarmStatistics = {
        key: RouteKeyEnum_1.RouteKeyEnum.alarmStatistics,
        url: '/alarmStatistics',
        moduleName: 'FDS_02_02_12',
        controllerUrl: 'module/maintain/statisticsOverview/alarmStatistics/alarmStatistics.controller',
        views: {
            "maintain": {
                controllerName: 'alarmStatisticsController',
                controllerAs: 'alarmStatisticsCtrl',
                templateUrl: '/module/maintain/statisticsOverview/alarmStatistics/alarmStatistics.html'
            }
        },
        icon: 'alarmStatistics',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var TrafficStatistics = {
        key: RouteKeyEnum_1.RouteKeyEnum.trafficStatistics,
        url: '/trafficStatistics',
        moduleName: 'FDS_02_02_13',
        controllerUrl: 'module/maintain/statisticsOverview/trafficStatistics/trafficStatistics.controller',
        views: {
            "maintain": {
                controllerName: 'trafficStatisticsController',
                controllerAs: 'trafficStatisticsCtrl',
                templateUrl: '/module/maintain/statisticsOverview/trafficStatistics/trafficStatistics.html'
            }
        },
        icon: 'trafficStatistics',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var RetrievalStatistics = {
        key: RouteKeyEnum_1.RouteKeyEnum.retrievalStatistics,
        url: '/retrievalStatistics',
        moduleName: 'FDS_02_02_14',
        controllerUrl: 'module/maintain/statisticsOverview/retrievalStatistics/retrievalStatistics.controller',
        views: {
            "maintain": {
                controllerName: 'retrievalStatisticsController',
                controllerAs: 'retrievalStatisticsCtrl',
                templateUrl: '/module/maintain/statisticsOverview/retrievalStatistics/retrievalStatistics.html'
            }
        },
        icon: 'retrievalStatistics',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var AnalysisStatistics = {
        key: RouteKeyEnum_1.RouteKeyEnum.analysisStatistics,
        url: '/analysisStatistics',
        moduleName: 'FDS_02_02_15',
        controllerUrl: 'module/maintain/statisticsOverview/analysisStatistics/analysisStatistics.controller',
        views: {
            "maintain": {
                controllerName: 'analysisStatisticsController',
                controllerAs: 'analysisStatisticsCtrl',
                templateUrl: '/module/maintain/statisticsOverview/analysisStatistics/analysisStatistics.html'
            }
        },
        icon: 'analysisStatistics',
        group: RouteGroupEnum_1.MaintainGroupEnum.StatisticsOverview,
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var DeviceStatus = {
        key: RouteKeyEnum_1.RouteKeyEnum.DeviceStatus,
        url: '/devicestatus',
        moduleName: 'FDS_02_00',
        controllerUrl: 'module/maintain/deviceStatus/device.status.controller',
        views: {
            "maintain": {
                controllerName: 'deviceStatusController',
                controllerAs: 'deviceStatusCtrl',
                templateUrl: '/module/maintain/deviceStatus/device.status.html'
            }
        },
        icon: 'devicestatus',
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain
    };
    var UserStatus = {
        key: RouteKeyEnum_1.RouteKeyEnum.UserStatus,
        url: '/userstatus',
        moduleName: 'FDS_02_01',
        controllerUrl: 'module/maintain/userStatus/user.status.controller',
        views: {
            "maintain": {
                controllerName: 'userStatusController',
                controllerAs: 'userStatusCtrl',
                templateUrl: '/module/maintain/userStatus/user.status.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain,
        icon: 'userstatus'
    };
    var OperateLog = {
        key: RouteKeyEnum_1.RouteKeyEnum.OperateLog,
        url: '/operatelog',
        moduleName: 'FDS_02_02',
        controllerUrl: 'module/maintain/operateLog/operate.log.controller',
        views: {
            "maintain": {
                controllerName: 'operateLogController',
                controllerAs: 'operateLogCtrl',
                templateUrl: '/module/maintain/operateLog/operate.log.html'
            }
        },
        parent: RouteKeyEnum_1.RouteKeyEnum.MainTain,
        icon: 'operatelog'
    };
    exports.MainTainMap = [
        MainTain, StatisticalAnalysis, TaskStatistics, AlarmStatistics, TrafficStatistics, RetrievalStatistics, AnalysisStatistics,
        DeviceStatus, UserStatus, OperateLog
    ];
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvbWFpbnRhaW4ubWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BLElBQU0sUUFBUSxHQUFpQjtRQUMzQixHQUFHLEVBQUUsMkJBQVksQ0FBQyxRQUFRO1FBQzFCLEdBQUcsRUFBRSxXQUFXO1FBQ2hCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLGNBQWMsRUFBRSxvQkFBb0I7UUFDcEMsYUFBYSxFQUFFLHNDQUFzQztRQUNyRCxZQUFZLEVBQUUsY0FBYztRQUM1QixXQUFXLEVBQUUscUNBQXFDO1FBQ2xELFVBQVUsRUFBRSwyQkFBWSxDQUFDLG1CQUFtQjtLQUMvQyxDQUFDO0lBR0YsSUFBTSxtQkFBbUIsR0FBaUI7UUFDdEMsR0FBRyxFQUFFLDJCQUFZLENBQUMsbUJBQW1CO1FBQ3JDLEdBQUcsRUFBRSxzQkFBc0I7UUFDM0IsVUFBVSxFQUFFLGNBQWM7UUFDMUIsYUFBYSxFQUFFLHVGQUF1RjtRQUN0RyxLQUFLLEVBQUU7WUFDSCxVQUFVLEVBQUM7Z0JBQ1AsY0FBYyxFQUFFLCtCQUErQjtnQkFDL0MsWUFBWSxFQUFFLHlCQUF5QjtnQkFDdkMsV0FBVyxFQUFFLGtGQUFrRjthQUNsRztTQUNKO1FBQ0QsSUFBSSxFQUFFLHFCQUFxQjtRQUMzQixLQUFLLEVBQUUsa0NBQWlCLENBQUMsa0JBQWtCO1FBQzNDLE1BQU0sRUFBRSwyQkFBWSxDQUFDLFFBQVE7S0FDaEMsQ0FBQztJQUdGLElBQU0sY0FBYyxHQUFpQjtRQUNqQyxHQUFHLEVBQUUsMkJBQVksQ0FBQyxjQUFjO1FBQ2hDLEdBQUcsRUFBRSxpQkFBaUI7UUFDdEIsVUFBVSxFQUFFLGNBQWM7UUFDMUIsYUFBYSxFQUFFLDZFQUE2RTtRQUM1RixLQUFLLEVBQUU7WUFDSCxVQUFVLEVBQUM7Z0JBQ1AsY0FBYyxFQUFFLDBCQUEwQjtnQkFDMUMsWUFBWSxFQUFFLG9CQUFvQjtnQkFDbEMsV0FBVyxFQUFFLHdFQUF3RTthQUN4RjtTQUNKO1FB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RUFBRSxhQUFhO1FBQ2xCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLGFBQWEsRUFBRSxtREFBbUQ7UUFDbEUsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxzQkFBc0I7Z0JBQ3RDLFlBQVksRUFBRSxnQkFBZ0I7Z0JBQzlCLFdBQVcsRUFBRSw4Q0FBOEM7YUFDOUQ7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLFFBQVE7UUFDN0IsSUFBSSxFQUFFLFlBQVk7S0FDckIsQ0FBQztJQUVGLElBQU0sVUFBVSxHQUFpQjtRQUM3QixHQUFHLEVBQUUsMkJBQVksQ0FBQyxVQUFVO1FBQzVCLEdBQUcsRUFBRSxhQUFhO1FBQ2xCLFVBQVUsRUFBRSxXQUFXO1FBQ3ZCLGFBQWEsRUFBRSxtREFBbUQ7UUFDbEUsS0FBSyxFQUFFO1lBQ0gsVUFBVSxFQUFFO2dCQUNSLGNBQWMsRUFBRSxzQkFBc0I7Z0JBQ3RDLFlBQVksRUFBRSxnQkFBZ0I7Z0JBQzlCLFdBQVcsRUFBRSw4Q0FBOEM7YUFDOUQ7U0FDSjtRQUNELE1BQU0sRUFBRSwyQkFBWSxDQUFDLFFBQVE7UUFDN0IsSUFBSSxFQUFFLFlBQVk7S0FDckIsQ0FBQztJQWtDVyxRQUFBLFdBQVcsR0FBRztRQUN2QixRQUFRLEVBQUMsbUJBQW1CLEVBQUMsY0FBYyxFQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0I7UUFDcEgsWUFBWSxFQUFDLFVBQVUsRUFBQyxVQUFVO0tBQ2IsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3JvdXRlci9tYXAvbWFpbnRhaW4ubWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjQuXHJcbiAqL1xyXG5pbXBvcnQge0lSb3V0ZXJDb25maWd9IGZyb20gXCIuLi9yb3V0ZXJcIjtcclxuaW1wb3J0IHtSb3V0ZUtleUVudW19IGZyb20gXCIuLi9lbnVtL1JvdXRlS2V5RW51bVwiO1xyXG5pbXBvcnQge01haW50YWluR3JvdXBFbnVtfSBmcm9tIFwiLi4vZW51bS9Sb3V0ZUdyb3VwRW51bVwiO1xyXG5cclxuY29uc3QgTWFpblRhaW46SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLk1haW5UYWluLFxyXG4gICAgdXJsOiAnL21haW50YWluJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDInLFxyXG4gICAgY29udHJvbGxlck5hbWU6ICdtYWludGFpbkNvbnRyb2xsZXInLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9tYWludGFpbi9tYWluL21haW4uY29udHJvbGxlcicsXHJcbiAgICBjb250cm9sbGVyQXM6ICdtYWludGFpbkN0cmwnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL21haW50YWluL21haW4vbWFpbnRhaW4uaHRtbCcsXHJcbiAgICByZWRpcmVjdFRvOiBSb3V0ZUtleUVudW0uc3RhdGlzdGljYWxBbmFseXNpc1xyXG59O1xyXG5cclxuLy/nu5/orqHliIbmnpBcclxuY29uc3QgU3RhdGlzdGljYWxBbmFseXNpczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0uc3RhdGlzdGljYWxBbmFseXNpcyxcclxuICAgIHVybDogJy9zdGF0aXN0aWNhbGFuYWx5c2lzJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDJfMDJfMDknLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9tYWludGFpbi9zdGF0aXN0aWNzT3ZlcnZpZXcvc3RhdGlzdGljYWxhbmFseXNpcy9zdGF0aXN0aWNhbGFuYWx5c2lzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcIm1haW50YWluXCI6e1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3N0YXRpc3RpY2FsQW5hbHlzaXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnc3RhdGlzdGljYWxBbmFseXNpc0N0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3N0YXRpc3RpY2FsYW5hbHlzaXMvc3RhdGlzdGljYWxhbmFseXNpcy5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiAnc3RhdGlzdGljYWxBbmFseXNpcycsXHJcbiAgICBncm91cDogTWFpbnRhaW5Hcm91cEVudW0uU3RhdGlzdGljc092ZXJ2aWV3LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uTWFpblRhaW5cclxufTtcclxuXHJcbi8vIOS7u+WKoee7n+iuoVxyXG5jb25zdCBUYXNrU3RhdGlzdGljczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0udGFza1N0YXRpc3RpY3MsXHJcbiAgICB1cmw6ICcvdGFza1N0YXRpc3RpY3MnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wMl8xMScsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy90YXNrU3RhdGlzdGljcy90YXNrU3RhdGlzdGljcy5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJtYWludGFpblwiOntcclxuICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICd0YXNrU3RhdGlzdGljc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd0YXNrU3RhdGlzdGljc0N0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3Rhc2tTdGF0aXN0aWNzL3Rhc2tTdGF0aXN0aWNzLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGljb246ICd0YXNrU3RhdGlzdGljcycsXHJcbiAgICBncm91cDogTWFpbnRhaW5Hcm91cEVudW0uU3RhdGlzdGljc092ZXJ2aWV3LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uTWFpblRhaW5cclxufTtcclxuXHJcbi8vIOaKpeitpue7n+iuoVxyXG5jb25zdCBBbGFybVN0YXRpc3RpY3M6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLmFsYXJtU3RhdGlzdGljcyxcclxuICAgIHVybDogJy9hbGFybVN0YXRpc3RpY3MnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wMl8xMicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbGFybVN0YXRpc3RpY3MvYWxhcm1TdGF0aXN0aWNzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcIm1haW50YWluXCI6e1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2FsYXJtU3RhdGlzdGljc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdhbGFybVN0YXRpc3RpY3NDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbGFybVN0YXRpc3RpY3MvYWxhcm1TdGF0aXN0aWNzLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGljb246ICdhbGFybVN0YXRpc3RpY3MnLFxyXG4gICAgZ3JvdXA6IE1haW50YWluR3JvdXBFbnVtLlN0YXRpc3RpY3NPdmVydmlldyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLk1haW5UYWluXHJcbn07XHJcblxyXG4vLyDmtYHph4/nu5/orqFcclxuY29uc3QgVHJhZmZpY1N0YXRpc3RpY3M6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLnRyYWZmaWNTdGF0aXN0aWNzLFxyXG4gICAgdXJsOiAnL3RyYWZmaWNTdGF0aXN0aWNzJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDJfMDJfMTMnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9tYWludGFpbi9zdGF0aXN0aWNzT3ZlcnZpZXcvdHJhZmZpY1N0YXRpc3RpY3MvdHJhZmZpY1N0YXRpc3RpY3MuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwibWFpbnRhaW5cIjp7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAndHJhZmZpY1N0YXRpc3RpY3NDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndHJhZmZpY1N0YXRpc3RpY3NDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy90cmFmZmljU3RhdGlzdGljcy90cmFmZmljU3RhdGlzdGljcy5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiAndHJhZmZpY1N0YXRpc3RpY3MnLFxyXG4gICAgZ3JvdXA6IE1haW50YWluR3JvdXBFbnVtLlN0YXRpc3RpY3NPdmVydmlldyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLk1haW5UYWluXHJcbn07XHJcblxyXG4vLyDmo4DntKLnu5/orqFcclxuY29uc3QgUmV0cmlldmFsU3RhdGlzdGljczpJUm91dGVyQ29uZmlnID0ge1xyXG4gICAga2V5OiBSb3V0ZUtleUVudW0ucmV0cmlldmFsU3RhdGlzdGljcyxcclxuICAgIHVybDogJy9yZXRyaWV2YWxTdGF0aXN0aWNzJyxcclxuICAgIG1vZHVsZU5hbWU6ICdGRFNfMDJfMDJfMTQnLFxyXG4gICAgY29udHJvbGxlclVybDogJ21vZHVsZS9tYWludGFpbi9zdGF0aXN0aWNzT3ZlcnZpZXcvcmV0cmlldmFsU3RhdGlzdGljcy9yZXRyaWV2YWxTdGF0aXN0aWNzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcIm1haW50YWluXCI6e1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ3JldHJpZXZhbFN0YXRpc3RpY3NDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAncmV0cmlldmFsU3RhdGlzdGljc0N0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3JldHJpZXZhbFN0YXRpc3RpY3MvcmV0cmlldmFsU3RhdGlzdGljcy5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpY29uOiAncmV0cmlldmFsU3RhdGlzdGljcycsXHJcbiAgICBncm91cDogTWFpbnRhaW5Hcm91cEVudW0uU3RhdGlzdGljc092ZXJ2aWV3LFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uTWFpblRhaW5cclxufTtcclxuXHJcbi8vIOWIhuaekOe7n+iuoVxyXG5jb25zdCBBbmFseXNpc1N0YXRpc3RpY3M6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLmFuYWx5c2lzU3RhdGlzdGljcyxcclxuICAgIHVybDogJy9hbmFseXNpc1N0YXRpc3RpY3MnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wMl8xNScsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbmFseXNpc1N0YXRpc3RpY3MvYW5hbHlzaXNTdGF0aXN0aWNzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcIm1haW50YWluXCI6e1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2FuYWx5c2lzU3RhdGlzdGljc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdhbmFseXNpc1N0YXRpc3RpY3NDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbmFseXNpc1N0YXRpc3RpY3MvYW5hbHlzaXNTdGF0aXN0aWNzLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGljb246ICdhbmFseXNpc1N0YXRpc3RpY3MnLFxyXG4gICAgZ3JvdXA6IE1haW50YWluR3JvdXBFbnVtLlN0YXRpc3RpY3NPdmVydmlldyxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLk1haW5UYWluXHJcbn07XHJcblxyXG5jb25zdCBEZXZpY2VTdGF0dXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLkRldmljZVN0YXR1cyxcclxuICAgIHVybDogJy9kZXZpY2VzdGF0dXMnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wMCcsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL2RldmljZVN0YXR1cy9kZXZpY2Uuc3RhdHVzLmNvbnRyb2xsZXInLFxyXG4gICAgdmlld3M6IHtcclxuICAgICAgICBcIm1haW50YWluXCI6e1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ2RldmljZVN0YXR1c0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdkZXZpY2VTdGF0dXNDdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvbW9kdWxlL21haW50YWluL2RldmljZVN0YXR1cy9kZXZpY2Uuc3RhdHVzLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGljb246ICdkZXZpY2VzdGF0dXMnLFxyXG4gICAgcGFyZW50OiBSb3V0ZUtleUVudW0uTWFpblRhaW5cclxufTtcclxuXHJcbmNvbnN0IFVzZXJTdGF0dXM6SVJvdXRlckNvbmZpZyA9IHtcclxuICAgIGtleTogUm91dGVLZXlFbnVtLlVzZXJTdGF0dXMsXHJcbiAgICB1cmw6ICcvdXNlcnN0YXR1cycsXHJcbiAgICBtb2R1bGVOYW1lOiAnRkRTXzAyXzAxJyxcclxuICAgIGNvbnRyb2xsZXJVcmw6ICdtb2R1bGUvbWFpbnRhaW4vdXNlclN0YXR1cy91c2VyLnN0YXR1cy5jb250cm9sbGVyJyxcclxuICAgIHZpZXdzOiB7XHJcbiAgICAgICAgXCJtYWludGFpblwiOiB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAndXNlclN0YXR1c0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VyU3RhdHVzQ3RybCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9tYWludGFpbi91c2VyU3RhdHVzL3VzZXIuc3RhdHVzLmh0bWwnXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBhcmVudDogUm91dGVLZXlFbnVtLk1haW5UYWluLFxyXG4gICAgaWNvbjogJ3VzZXJzdGF0dXMnXHJcbn07XHJcblxyXG5jb25zdCBPcGVyYXRlTG9nOklSb3V0ZXJDb25maWcgPSB7XHJcbiAgICBrZXk6IFJvdXRlS2V5RW51bS5PcGVyYXRlTG9nLFxyXG4gICAgdXJsOiAnL29wZXJhdGVsb2cnLFxyXG4gICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wMicsXHJcbiAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL29wZXJhdGVMb2cvb3BlcmF0ZS5sb2cuY29udHJvbGxlcicsXHJcbiAgICB2aWV3czoge1xyXG4gICAgICAgIFwibWFpbnRhaW5cIjoge1xyXG4gICAgICAgICAgICBjb250cm9sbGVyTmFtZTogJ29wZXJhdGVMb2dDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnb3BlcmF0ZUxvZ0N0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbWFpbnRhaW4vb3BlcmF0ZUxvZy9vcGVyYXRlLmxvZy5odG1sJ1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5NYWluVGFpbixcclxuICAgIGljb246ICdvcGVyYXRlbG9nJ1xyXG59O1xyXG5cclxuLy8gY29uc3QgTGljZW5jZVN0YXR1czpJUm91dGVyQ29uZmlnID0ge1xyXG4vLyAgICAga2V5OiBSb3V0ZUtleUVudW0uTGljZW5jZVN0YXR1cyxcclxuLy8gICAgIHVybDogJy9saWNlbmNlc3RhdHVzJyxcclxuLy8gICAgIG1vZHVsZU5hbWU6ICdGRFNfMDJfMDMnLFxyXG4vLyAgICAgY29udHJvbGxlclVybDogJ21vZHVsZS9tYWludGFpbi9saWNlbmNlLXN0YXR1cy9saWNlbmNlLnN0YXR1cy5jb250cm9sbGVyJyxcclxuLy8gICAgIHZpZXdzOiB7XHJcbi8vICAgICAgICAgXCJtYWludGFpblwiOiB7XHJcbi8vICAgICAgICAgICAgIGNvbnRyb2xsZXJOYW1lOiAnbGljZW5jZVN0YXR1c0NvbnRyb2xsZXInLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdsaWNlbmNlU3RhdHVzQ3RybCcsXHJcbi8vICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL21vZHVsZS9tYWludGFpbi9saWNlbmNlLXN0YXR1cy9saWNlbmNlLnN0YXR1cy5odG1sJ1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH0sXHJcbi8vICAgICBwYXJlbnQ6IFJvdXRlS2V5RW51bS5NYWluVGFpbixcclxuLy8gICAgIGljb246ICdsaWNlbmNlc3RhdHVzJ1xyXG4vLyB9O1xyXG4vL1xyXG4vLyBjb25zdCBGZWVkYmFjazpJUm91dGVyQ29uZmlnID0ge1xyXG4vLyAgICAga2V5OiBSb3V0ZUtleUVudW0uRmVlZGJhY2ssXHJcbi8vICAgICB1cmw6ICcvZmVlZGJhY2snLFxyXG4vLyAgICAgbW9kdWxlTmFtZTogJ0ZEU18wMl8wNCcsXHJcbi8vICAgICBjb250cm9sbGVyVXJsOiAnbW9kdWxlL21haW50YWluL2ZlZWRiYWNrL2ZlZWRiYWNrLmNvbnRyb2xsZXInLFxyXG4vLyAgICAgdmlld3M6IHtcclxuLy8gICAgICAgICBcIm1haW50YWluXCI6IHtcclxuLy8gICAgICAgICAgICAgY29udHJvbGxlck5hbWU6ICdmZWVkYmFja0NvbnRyb2xsZXInLFxyXG4vLyAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdmZWVkYmFja0N0cmwnLFxyXG4vLyAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9tb2R1bGUvbWFpbnRhaW4vZmVlZGJhY2svZmVlZGJhY2suaHRtbCdcclxuLy8gICAgICAgICB9XHJcbi8vICAgICB9LFxyXG4vLyAgICAgcGFyZW50OiBSb3V0ZUtleUVudW0uTWFpblRhaW4sXHJcbi8vICAgICBpY29uOiAnZmVlZGJhY2snXHJcbi8vIH07XHJcblxyXG5leHBvcnQgY29uc3QgTWFpblRhaW5NYXAgPSBbXHJcbiAgICBNYWluVGFpbixTdGF0aXN0aWNhbEFuYWx5c2lzLFRhc2tTdGF0aXN0aWNzLEFsYXJtU3RhdGlzdGljcyxUcmFmZmljU3RhdGlzdGljcyxSZXRyaWV2YWxTdGF0aXN0aWNzLEFuYWx5c2lzU3RhdGlzdGljcyxcclxuICAgIERldmljZVN0YXR1cyxVc2VyU3RhdHVzLE9wZXJhdGVMb2dcclxuXSBhcyBBcnJheTxJUm91dGVyQ29uZmlnPjsiXX0=
