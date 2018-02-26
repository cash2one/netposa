define(["require", "exports", "../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MaintainService = (function () {
        function MaintainService($http, $q) {
            this.$http = $http;
            this.$q = $q;
            this.$http = $http;
            this.$q = $q;
        }
        MaintainService.prototype.exportServerStatus = function (params) {
            return this.$http({
                method: "post",
                url: "/pdp/netManagerCtrl/severState/export",
                params: params
            });
        };
        MaintainService.prototype.exportDeviceStatus = function (params) {
            return this.$http({
                method: "post",
                url: "/pdp/netManagerCtrl/deviceState/export",
                params: params
            });
        };
        MaintainService.prototype.getDevicesStatus = function (params) {
            return this.$http({
                method: "get",
                url: "/db/OperationsController/getDevicesStatus",
                params: params
            });
        };
        MaintainService.prototype.getDevicesStatusModule = function (params) {
            return this.$http({
                method: "get",
                url: "/db/OperationsController/getDevicesStatusModule",
                params: params,
            });
        };
        ;
        MaintainService.prototype.getServerStatusModule = function (params) {
            return this.$http({
                method: "get",
                url: "/db/OperationsController/getServerStatusModule",
                params: params,
            });
        };
        ;
        MaintainService.prototype.taskStatistic = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/areaTaskStatistic"
            });
        };
        ;
        MaintainService.prototype.statisticalanalysis = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/statisticalanalysis",
                params: params,
            });
        };
        ;
        MaintainService.prototype.logManagement = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/logManagement",
                params: params,
            });
        };
        ;
        MaintainService.prototype.alarmStatistics = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/OperationsController/alarmStatistics",
                params: params
            });
        };
        MaintainService.prototype.alarmStatisticsModule = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/alarmStatisticsModule",
                params: params,
            });
        };
        MaintainService.prototype.trafficStatisticsModule = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/trafficStatisticsModule",
                params: params,
            });
        };
        MaintainService.prototype.deveceAlarmStatisticsTop = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/OperationsController/deveceAlarmStatisticsTop",
                params: params
            });
        };
        MaintainService.prototype.deveceTrafficStatisticsTop = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/OperationsController/deveceTrafficStatisticsTop",
                params: params
            });
        };
        MaintainService.prototype.trafficStatistics = function () {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/trafficStatistics"
            });
        };
        MaintainService.prototype.areaTrafficStatistics = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/OperationsController/areaTrafficStatistics",
                params: params
            });
        };
        MaintainService.prototype.retrievalStatistics = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/OperationsController/retrievalStatistics"
            });
        };
        MaintainService.prototype.taskStatisticsTotal = function () {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/taskStatisticsTotal"
            });
        };
        MaintainService.prototype.analysissTatistics = function () {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/analysissTatistics"
            });
        };
        MaintainService.prototype.allStatisticalanalysis = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/OperationsController/allStatisticalanalysis",
                params: params,
            });
        };
        MaintainService.prototype.getAreaTreeData = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/area/findAreaListTree",
                params: params,
            });
        };
        ;
        MaintainService.prototype.getUserDataList = function (_params) {
            return this.$http({
                method: 'post',
                data: _params,
                url: '/db/OperationsController/userStatus'
            });
        };
        MaintainService.prototype.getRunLogDataList = function (_params) {
            return this.$http({
                method: 'post',
                data: _params,
                url: '/db/OperationsController/exceptionlog'
            });
        };
        MaintainService.prototype.intelligentAnalysis = function (_params) {
            return this.$http({
                method: 'post',
                data: _params,
                url: '/db/OperationsController/intelligentAnalysis'
            });
        };
        MaintainService.prototype.dispatchedAboutAlarm = function (_params) {
            return this.$http({
                method: 'post',
                data: _params,
                url: '/db/OperationsController/dispatchedAboutAlarm'
            });
        };
        MaintainService.prototype.retrievalTrendStatistics = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/retrievalTrendStatistics",
                params: params,
            });
        };
        MaintainService.prototype.retrievalKeyWordRank = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/retrievalKeyWordRank",
                params: params,
            });
        };
        MaintainService.prototype.areaAlarmTrend = function (params) {
            return this.$http({
                method: "post",
                url: "/db/OperationsController/areaAlarmTrend",
                params: params,
            });
        };
        MaintainService.$inject = ['$http', '$q'];
        return MaintainService;
    }());
    main_app_1.app.service('maintainService', MaintainService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0RBO1FBSUkseUJBQW9CLEtBQVUsRUFBVSxFQUFPO1lBQTNCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFFRCw0Q0FBa0IsR0FBbEIsVUFBbUIsTUFBWTtZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsdUNBQXVDO2dCQUM1QyxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7UUFDTixDQUFDO1FBR0QsNENBQWtCLEdBQWxCLFVBQW1CLE1BQVk7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHdDQUF3QztnQkFDN0MsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUdELDBDQUFnQixHQUFoQixVQUFpQixNQUFZO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSwyQ0FBMkM7Z0JBQ2hELE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFHRCxnREFBc0IsR0FBdEIsVUFBdUIsTUFBWTtZQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixHQUFHLEVBQUUsaURBQWlEO2dCQUN0RCxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEs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QUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvbWFpbnRhaW4uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvNi8yMy5cclxuICovXHJcbmltcG9ydCB7IGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L21haW50YWluRW51bVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgcmVxdWlyZTogYW55O1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWludGFpbi5zZXJ2aWNlXCJcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1haW50YWluU2VydmljZSB7XHJcbiAgICBnZXREZXZpY2VzU3RhdHVzOiBGdW5jdGlvbjtcclxuXHJcbiAgICBnZXRTZXJ2ZXJTdGF0dXNNb2R1bGU6IEZ1bmN0aW9uO1xyXG4gICAgZ2V0RGV2aWNlc1N0YXR1c01vZHVsZTogRnVuY3Rpb247XHJcblxyXG4gICAgZ2V0QXJlYVRyZWVEYXRhOiBGdW5jdGlvbjtcclxuICAgIGdldFVzZXJEYXRhTGlzdDogRnVuY3Rpb247XHJcbiAgICBnZXRSdW5Mb2dEYXRhTGlzdDogRnVuY3Rpb247XHJcblxyXG4gICAgdGFza1N0YXRpc3RpYzogRnVuY3Rpb247XHJcbiAgICBzdGF0aXN0aWNhbGFuYWx5c2lzOiBGdW5jdGlvbjtcclxuICAgIGFsbFN0YXRpc3RpY2FsYW5hbHlzaXM6IEZ1bmN0aW9uO1xyXG5cclxuICAgIGFsYXJtU3RhdGlzdGljczogRnVuY3Rpb247XHJcbiAgICB0cmFmZmljU3RhdGlzdGljczogRnVuY3Rpb247XHJcbiAgICBhcmVhVHJhZmZpY1N0YXRpc3RpY3M6IEZ1bmN0aW9uO1xyXG4gICAgcmV0cmlldmFsU3RhdGlzdGljczogRnVuY3Rpb247XHJcbiAgICB0YXNrU3RhdGlzdGljc1RvdGFsOiBGdW5jdGlvbjtcclxuICAgIGFuYWx5c2lzc1RhdGlzdGljczogRnVuY3Rpb247XHJcbiAgICBsb2dNYW5hZ2VtZW50OiBGdW5jdGlvbjtcclxuICAgIGFsYXJtU3RhdGlzdGljc01vZHVsZTogRnVuY3Rpb247XHJcbiAgICB0cmFmZmljU3RhdGlzdGljc01vZHVsZTogRnVuY3Rpb247XHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzOiBGdW5jdGlvbjtcclxuICAgIGRpc3BhdGNoZWRBYm91dEFsYXJtOiBGdW5jdGlvbjtcclxuICAgIGRldmVjZUFsYXJtU3RhdGlzdGljc1RvcDogRnVuY3Rpb247XHJcbiAgICBkZXZlY2VUcmFmZmljU3RhdGlzdGljc1RvcDogRnVuY3Rpb247XHJcblxyXG4gICAgcmV0cmlldmFsVHJlbmRTdGF0aXN0aWNzOiBGdW5jdGlvbjtcclxuICAgIHJldHJpZXZhbEtleVdvcmRSYW5rOiBGdW5jdGlvbjtcclxuICAgIGFyZWFBbGFybVRyZW5kOiBGdW5jdGlvbjtcclxuICAgIC8v5a+85Ye6XHJcbiAgICBleHBvcnRTZXJ2ZXJTdGF0dXM6IEZ1bmN0aW9uO1xyXG4gICAgZXhwb3J0RGV2aWNlU3RhdHVzOiBGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgTWFpbnRhaW5TZXJ2aWNlIGltcGxlbWVudHMgSU1haW50YWluU2VydmljZSB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywgJyRxJ107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlICRxOiBhbnkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgfVxyXG4gICAgLy/mnI3liqHlmajnirbmgIHlr7zlh7pcclxuICAgIGV4cG9ydFNlcnZlclN0YXR1cyhwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL25ldE1hbmFnZXJDdHJsL3NldmVyU3RhdGUvZXhwb3J0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuWkh+eKtuaAgeWvvOWHulxyXG4gICAgZXhwb3J0RGV2aWNlU3RhdHVzKHBhcmFtcz86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9wZHAvbmV0TWFuYWdlckN0cmwvZGV2aWNlU3RhdGUvZXhwb3J0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluiuvuWkh+eKtuaAgeS/oeaBr1xyXG4gICAgZ2V0RGV2aWNlc1N0YXR1cyhwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJnZXRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9nZXREZXZpY2VzU3RhdHVzXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluiuvuWkh+eKtuaAgeaooeWdl+S/oeaBr1xyXG4gICAgZ2V0RGV2aWNlc1N0YXR1c01vZHVsZShwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJnZXRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9nZXREZXZpY2VzU3RhdHVzTW9kdWxlXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGdldFNlcnZlclN0YXR1c01vZHVsZShwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJnZXRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9nZXRTZXJ2ZXJTdGF0dXNNb2R1bGVcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5bku7vliqHmgLvop4jmlbDmja5cclxuICAgIHRhc2tTdGF0aXN0aWMocGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL09wZXJhdGlvbnNDb250cm9sbGVyL2FyZWFUYXNrU3RhdGlzdGljXCJcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+iOt+WPlue7n+iuoeWIhuaekOaVsOaNrlxyXG4gICAgc3RhdGlzdGljYWxhbmFseXNpcyhwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvc3RhdGlzdGljYWxhbmFseXNpc1wiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+iOt+WPluaXpeW/l+euoeeQhlxyXG4gICAgbG9nTWFuYWdlbWVudChwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvbG9nTWFuYWdlbWVudFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICAvL+aKpeitpue7n+iuoVxyXG4gICAgYWxhcm1TdGF0aXN0aWNzKHBhcmFtcz86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9hbGFybVN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5oql6K2m57uf6K6hXHJcbiAgICBhbGFybVN0YXRpc3RpY3NNb2R1bGUocGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvYWxhcm1TdGF0aXN0aWNzTW9kdWxlXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/mtYHph4/nu5/orqFcclxuICAgIHRyYWZmaWNTdGF0aXN0aWNzTW9kdWxlKHBhcmFtcz86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL09wZXJhdGlvbnNDb250cm9sbGVyL3RyYWZmaWNTdGF0aXN0aWNzTW9kdWxlXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/miqXorabnu5/orqFUb3AxMFxyXG4gICAgZGV2ZWNlQWxhcm1TdGF0aXN0aWNzVG9wKHBhcmFtczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL09wZXJhdGlvbnNDb250cm9sbGVyL2RldmVjZUFsYXJtU3RhdGlzdGljc1RvcFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZGV2ZWNlVHJhZmZpY1N0YXRpc3RpY3NUb3AocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvZGV2ZWNlVHJhZmZpY1N0YXRpc3RpY3NUb3BcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5rWB6YeP57uf6K6hXHJcbiAgICB0cmFmZmljU3RhdGlzdGljcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci90cmFmZmljU3RhdGlzdGljc1wiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhcmVhVHJhZmZpY1N0YXRpc3RpY3MocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvYXJlYVRyYWZmaWNTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5qOA57Si57uf6K6hXHJcbiAgICByZXRyaWV2YWxTdGF0aXN0aWNzKHBhcmFtczogaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9yZXRyaWV2YWxTdGF0aXN0aWNzXCJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Lu75Yqh57uf6K6hXHJcbiAgICB0YXNrU3RhdGlzdGljc1RvdGFsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL09wZXJhdGlvbnNDb250cm9sbGVyL3Rhc2tTdGF0aXN0aWNzVG90YWxcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/liIbmnpDnu5/orqFcclxuICAgIGFuYWx5c2lzc1RhdGlzdGljcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9hbmFseXNpc3NUYXRpc3RpY3NcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/nu5/orqHmgLvop4hcclxuICAgIGFsbFN0YXRpc3RpY2FsYW5hbHlzaXMocGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvYWxsU3RhdGlzdGljYWxhbmFseXNpc1wiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5Yy65Z+f5qCR5pWw5o2uXHJcbiAgICBnZXRBcmVhVHJlZURhdGEocGFyYW1zOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9hcmVhL2ZpbmRBcmVhTGlzdFRyZWVcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy/nlKjmiLfliJfooahcclxuICAgIGdldFVzZXJEYXRhTGlzdChfcGFyYW1zOiBvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvdXNlclN0YXR1cydcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+Q6KGM5pel5b+X5YiX6KGoXHJcbiAgICBnZXRSdW5Mb2dEYXRhTGlzdChfcGFyYW1zOiBvYmplY3QpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvZXhjZXB0aW9ubG9nJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy/liIbmnpDnu5/orqFcclxuICAgIGludGVsbGlnZW50QW5hbHlzaXMoX3BhcmFtczogaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvaW50ZWxsaWdlbnRBbmFseXNpcydcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8v5biD5o6n5bqTXHJcbiAgICBkaXNwYXRjaGVkQWJvdXRBbGFybShfcGFyYW1zOiBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9kaXNwYXRjaGVkQWJvdXRBbGFybSdcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+ajgOe0oue7n+iuoei2i+WKv1xyXG4gICAgcmV0cmlldmFsVHJlbmRTdGF0aXN0aWNzKHBhcmFtcz86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9PcGVyYXRpb25zQ29udHJvbGxlci9yZXRyaWV2YWxUcmVuZFN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICByZXRyaWV2YWxLZXlXb3JkUmFuayhwYXJhbXM/OiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvT3BlcmF0aW9uc0NvbnRyb2xsZXIvcmV0cmlldmFsS2V5V29yZFJhbmtcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgYXJlYUFsYXJtVHJlbmQocGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL09wZXJhdGlvbnNDb250cm9sbGVyL2FyZWFBbGFybVRyZW5kXCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdtYWludGFpblNlcnZpY2UnLCBNYWludGFpblNlcnZpY2UpOyJdfQ==
