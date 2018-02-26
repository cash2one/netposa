define(["require", "exports", "../../../common/app/main.app", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "../../../../core/entity/OperThirdModule", "../../../common/factory/dataSelect.factory", "../../main/maintainFactory", "css!module/maintain/css/retrievalStatistics.css", "../../main/maintainFactory", "moment"], function (require, exports, main_app_1, ChartOptions, maintainEnum_1, OperThirdModule_1, dataSelect_factory_1, maintainFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.retrievalRequireParam = {
        beginDate: "",
        endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
        moduleNames: Object.keys(maintainEnum_1.RetrievalStatisticParamModuleNames).join(','),
        statisticModuleLevel: 3
    };
    var RankKeyWordEnum = (function () {
        function RankKeyWordEnum() {
        }
        return RankKeyWordEnum;
    }());
    var RankKeyWord = [
        { value: "Vehicle", name: "车辆检索排行", class: "VehicleRetrieval" },
        { value: "Face", name: "人像检索排行", class: "FaceRetrieval" },
        { value: "WiFi", name: "Wi-Fi检索排行", class: "WiFiRetrieval" },
        { value: "EFENCE", name: "电围检索排行", class: "EFENCERetrieval" },
        { value: "Device", name: "设备检索排行", class: "DeviceRetrieval" },
        { value: "Position", name: "位置检索排行", class: "PositionRetrieval" }
    ];
    var retrievalStatisticsController = (function () {
        function retrievalStatisticsController($scope, $timeout, maintainFactory, maintainService, dataSelectServer) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.maintainFactory = maintainFactory;
            this.maintainService = maintainService;
            this.dataSelectServer = dataSelectServer;
            this.retrievalStatisticsList = true;
            this.retrievalTrafficTrendList = true;
            this.rankStatisticsList = true;
            this.rankClassName = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"];
            this.Retrieval_Model = new dataSelect_factory_1.dataSelectResult();
            this.Retrieval_Trend_Model = new dataSelect_factory_1.dataSelectResult();
            this.RankStatistics_Model = new dataSelect_factory_1.dataSelectResult();
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
            this.timeItem = angular.copy(maintainEnum_1.SelectData);
            this.OperThirdModule = OperThirdModule_1.OperThirdModule;
            this.RankKeyWords = RankKeyWord;
            this.deviceModuleArr = [];
            this.deviceModuleObj = {};
            this.echartNameArr = angular.copy(maintainEnum_1.echartNameArr);
            this.init();
            $scope.$on('initChart', function (evt, opt) {
                _this.init();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        retrievalStatisticsController.prototype.init = function () {
            this.initRetrievalStatistics();
            this.initRetrievalTrafficTrend();
            this.rankStatistics();
        };
        retrievalStatisticsController.prototype.initRetrievalStatistics = function (value) {
            var _this = this;
            var params = this.timeRequireParam(this.Retrieval_Model, value);
            var RetrievalParams = this.maintainFactory.RetrievalParams(this.Retrieval_Model.module);
            if (this.RankStatistics_Model.module == maintainEnum_1.AlarmObjectType.ALL.value || value) {
                RetrievalParams.beginDate = params.beginDate;
                RetrievalParams.endDate = params.endDate;
            }
            if (!RetrievalParams)
                return;
            this.maintainService.retrievalStatistics(RetrievalParams).then(function (res) {
                if (res && res.data) {
                    _this.maintainFactory.initChart(_this.setData(maintainEnum_1.RetrievalStatisticModuleName.retrievalStatistic, res.data));
                }
            });
        };
        retrievalStatisticsController.prototype.initRetrievalTrafficTrend = function (value) {
            var _this = this;
            var params = this.timeRequireParam(this.Retrieval_Trend_Model, value);
            if (!params)
                return;
            if (!this.Retrieval_Trend_Model.module || this.Retrieval_Trend_Model.module == dataSelect_factory_1.moduleString.ALL) {
                params.timeType = dataSelect_factory_1.moduleString.Month;
            }
            else {
                params.timeType = this.Retrieval_Trend_Model.module;
            }
            this.maintainService.retrievalTrendStatistics(params).then(function (res) {
                if (res && res.data) {
                    _this.maintainFactory.initChart(_this.setData(maintainEnum_1.RetrievalStatisticModuleName.retrievalTrafficTrend, res.data));
                }
            });
        };
        retrievalStatisticsController.prototype.rankStatistics = function (value) {
            var that = this;
            var params = that.maintainFactory.RetrievalRankParam(that.RankStatistics_Model, maintainEnum_1.AlarmObjectType.ALL.value, value);
            if (that.RankStatistics_Model.module == dataSelect_factory_1.moduleString.Custom && !value) {
                return;
            }
            that.maintainService.retrievalKeyWordRank(params).then(function (res) {
                if (res && res.data) {
                    that.deviceModuleObj = res.data;
                    that.deviceModuleArr = Object.keys(res.data);
                    that.rankStatisticsTableList = angular.copy(res.data);
                    that.rankStatisticsTableList.legendData = [];
                    that.rankStatisticsTableList.seriesData = [];
                    RankKeyWord.forEach(function (item) {
                        that.rankStatisticsTableList.legendData.push(item.name);
                        that.rankStatisticsTableList.seriesData.push(res.data[item.value]);
                    });
                }
            });
        };
        retrievalStatisticsController.prototype.timeRequireParam = function (modelParam, value) {
            var params = exports.retrievalRequireParam;
            var result = this.dataSelectServer.getParamsTime(modelParam);
            if (modelParam.module == dataSelect_factory_1.moduleString.Custom && value) {
                var valueArr = value.split(" - ");
                params.beginDate = valueArr[0];
                params.endDate = valueArr[1];
            }
            else {
                params.beginDate = result.startTime;
                params.endDate = result.endTime;
            }
            if (params.beginDate && params.endDate) {
                return params;
            }
        };
        retrievalStatisticsController.retrievalStatistic = function (data) {
            var seriesData = data.seriesData;
            var xData = data.yData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#6c8ce4"];
            option.legend = new ChartOptions.legend();
            delete option.legend.left;
            option.legend.right = "20px";
            option.legend.top = "10px";
            option.legend.data = [];
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 10;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.data = xData;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.show = true;
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.lineStyle.interval = false;
            option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
            option.xAxis.axisLine.show = true;
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.grid = new ChartOptions.grid();
            option.grid.top = 50;
            option.grid.bottom = 20;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            option.series = [];
            var legendArrayData = {};
            legendArrayData.textStyle = new ChartOptions.dataStyleText();
            legendArrayData.icon = "stack";
            option.legend.data.push(legendArrayData);
            var seriesD = new ChartOptions.series();
            seriesD.type = "bar";
            seriesD.barWidth = 50;
            seriesD.label = new ChartOptions.label;
            seriesD.label.normal = new ChartOptions.normal;
            seriesD.label.normal.position = "insideRight";
            seriesD.data = seriesData;
            option.series.push(seriesD);
            return option;
        };
        retrievalStatisticsController.retrievalTrafficTrend = function (data) {
            var seriesData = data.series;
            var xData = data.dateList;
            var legendData = data.legendData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.color = ["#7CCCF2", "#6C8CE4", "#f8a619", "#00d5e2"];
            option.legend.data = [];
            option.legend.top = "20px";
            delete option.legend.left;
            option.legend.right = "20px";
            option.legend.itemWidth = 20;
            option.legend.itemHeight = 10;
            option.legend.itemGap = 30;
            option.legend.icon = null;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.data = xData;
            option.grid = new ChartOptions.grid();
            option.grid.top = 50;
            option.grid.bottom = 20;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            option.series = [];
            var areaColor = ["124,204,242", "108,140,228", "248,166,25", "0,213,226"];
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.type = "line";
                seriesD.name = legendData[i];
                var areaStyleColor = new ChartOptions.areaStyleColor(areaColor[i]);
                seriesD.areaStyle = new ChartOptions.areaStyle();
                seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
                seriesD.areaStyle.normal = areaStyleColor.getColor();
                var key = Object.keys(seriesData)[i];
                seriesD.data = seriesData[key];
                option.series.push(seriesD);
            }
            return option;
        };
        retrievalStatisticsController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            switch (name) {
                case 'retrievalStatistic': {
                    this.retrievalStatisticTableList = angular.copy(data);
                    this.retrievalStatisticTableList.legendData = ['设备名', '设备数'];
                    option.config = retrievalStatisticsController.retrievalStatistic(data);
                    return option;
                }
                case 'retrievalTrafficTrend': {
                    this.retrievalTrafficTrendTableList = angular.copy(data);
                    this.retrievalTrafficTrendTableList.xData = angular.copy(data.dateList);
                    this.retrievalTrafficTrendTableList.legendData.unshift('日期');
                    this.retrievalTrafficTrendTableList.seriesData = [data.series.camera, data.series.electronicfence, data.series.rmpgate, data.series.wifi];
                    option.config = retrievalStatisticsController.retrievalTrafficTrend(data);
                    return option;
                }
                case 'rankStatistics': {
                    option.config = this.rankStatistics(data);
                    return option;
                }
            }
        };
        retrievalStatisticsController.prototype.retrievalSwitch = function (switchString) {
            var that = this;
            switch (switchString) {
                case 'retrievalStatisticsHistogram': {
                    that.retrievalStatisticsList = true;
                    break;
                }
                case 'retrievalStatisticsList': {
                    that.retrievalStatisticsList = false;
                    break;
                }
                case 'retrievalTrafficTrendHistogram': {
                    that.retrievalTrafficTrendList = true;
                    break;
                }
                case 'retrievalTrafficTrendList': {
                    that.retrievalTrafficTrendList = false;
                    break;
                }
            }
        };
        retrievalStatisticsController.prototype.exportImage = function (id) {
            this.maintainFactory.exportImage(id);
        };
        retrievalStatisticsController.prototype.exportExcel = function (module, data) {
            this.maintainFactory.exportExcel(module, data);
        };
        retrievalStatisticsController.$inject = ["$scope", "$timeout", "maintainFactory", "maintainService", "dataSelectServer"];
        return retrievalStatisticsController;
    }());
    main_app_1.app.controller("retrievalStatisticsController", retrievalStatisticsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3JldHJpZXZhbFN0YXRpc3RpY3MvcmV0cmlldmFsU3RhdGlzdGljcy5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXdCYSxRQUFBLHFCQUFxQixHQUFRO1FBQ3RDLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztRQUMvQyxXQUFXLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpREFBa0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDdEUsb0JBQW9CLEVBQUUsQ0FBQztLQUMxQixDQUFDO0lBRUY7UUFBQTtRQUlBLENBQUM7UUFBRCxzQkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBRUQsSUFBTSxXQUFXLEdBQTJCO1FBQ3hDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRTtRQUMvRCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFO1FBQ3pELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUU7UUFDNUQsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFO1FBQzdELEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRTtRQUM3RCxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUU7S0FDcEUsQ0FBQztJQUVGO1FBK0JJLHVDQUNZLE1BQVcsRUFDWCxRQUFhLEVB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Q0FBQztRQUdNLG1EQUFXLEdBQWxCLFVBQW1CLEVBQVU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVNLG1EQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxJQUFTO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBdFVNLHFDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUF1VXRHLG9DQUFDO0tBelVELEFBeVVDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLCtCQUErQixFQUFFLDZCQUE2QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9yZXRyaWV2YWxTdGF0aXN0aWNzL3JldHJpZXZhbFN0YXRpc3RpY3MuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyFtb2R1bGUvbWFpbnRhaW4vY3NzL3JldHJpZXZhbFN0YXRpc3RpY3MuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCB7IEJhY2tSZXNwb25zZUJvZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtcclxuICAgIGFuYWx5c2lzU3RhdGlzdGljc1Jlc3VsdCxcclxuICAgIGludGVsbGlnZW50QW5hbHlzaXNEYXRhLFxyXG4gICAgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtLFxyXG4gICAgaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXMsXHJcbiAgICBTZWxlY3REYXRhLFxyXG4gICAgc2VsZWN0RGF0YUVudW0sXHJcbiAgICBlY2hhcnROYW1lQXJyLFxyXG4gICAgUmV0cmlldmFsU3RhdGlzdGljTW9kdWxlTmFtZSxcclxuICAgIFJldHJpZXZhbFN0YXRpc3RpY1BhcmFtTW9kdWxlTmFtZXMsXHJcbiAgICBBbGFybU9iamVjdFR5cGVcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvbWFpbnRhaW5FbnVtXCI7XHJcbmltcG9ydCB7IE9wZXJUaGlyZE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGVcIjtcclxuaW1wb3J0IHsgZGF0YVNlbGVjdFNlcnZlciwgZGF0YVNlbGVjdFJlc3VsdCwgbW9kdWxlU3RyaW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2RhdGFTZWxlY3QuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCJtb21lbnRcIjtcclxuaW1wb3J0IHsgQ2hhcnRPcHRpb25PYmplY3QsIElFY2hhcnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgbW9tZW50OiBhbnk7XHJcblxyXG5leHBvcnQgY29uc3QgcmV0cmlldmFsUmVxdWlyZVBhcmFtOiBhbnkgPSB7XHJcbiAgICBiZWdpbkRhdGU6IFwiXCIsXHJcbiAgICBlbmREYXRlOiBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgbW9kdWxlTmFtZXM6IE9iamVjdC5rZXlzKFJldHJpZXZhbFN0YXRpc3RpY1BhcmFtTW9kdWxlTmFtZXMpLmpvaW4oJywnKSxcclxuICAgIHN0YXRpc3RpY01vZHVsZUxldmVsOiAzXHJcbn07XHJcblxyXG5jbGFzcyBSYW5rS2V5V29yZEVudW0ge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGNsYXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IFJhbmtLZXlXb3JkOiBBcnJheTxSYW5rS2V5V29yZEVudW0+ID0gW1xyXG4gICAgeyB2YWx1ZTogXCJWZWhpY2xlXCIsIG5hbWU6IFwi6L2m6L6G5qOA57Si5o6S6KGMXCIsIGNsYXNzOiBcIlZlaGljbGVSZXRyaWV2YWxcIiB9LFxyXG4gICAgeyB2YWx1ZTogXCJGYWNlXCIsIG5hbWU6IFwi5Lq65YOP5qOA57Si5o6S6KGMXCIsIGNsYXNzOiBcIkZhY2VSZXRyaWV2YWxcIiB9LFxyXG4gICAgeyB2YWx1ZTogXCJXaUZpXCIsIG5hbWU6IFwiV2ktRmnmo4DntKLmjpLooYxcIiwgY2xhc3M6IFwiV2lGaVJldHJpZXZhbFwiIH0sXHJcbiAgICB7IHZhbHVlOiBcIkVGRU5DRVwiLCBuYW1lOiBcIueUteWbtOajgOe0ouaOkuihjFwiLCBjbGFzczogXCJFRkVOQ0VSZXRyaWV2YWxcIiB9LFxyXG4gICAgeyB2YWx1ZTogXCJEZXZpY2VcIiwgbmFtZTogXCLorr7lpIfmo4DntKLmjpLooYxcIiwgY2xhc3M6IFwiRGV2aWNlUmV0cmlldmFsXCIgfSxcclxuICAgIHsgdmFsdWU6IFwiUG9zaXRpb25cIiwgbmFtZTogXCLkvY3nva7mo4DntKLmjpLooYxcIiwgY2xhc3M6IFwiUG9zaXRpb25SZXRyaWV2YWxcIiB9XHJcbl07XHJcblxyXG5jbGFzcyByZXRyaWV2YWxTdGF0aXN0aWNzQ29udHJvbGxlciB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcIm1haW50YWluRmFjdG9yeVwiLCBcIm1haW50YWluU2VydmljZVwiLCBcImRhdGFTZWxlY3RTZXJ2ZXJcIl07XHJcbiAgICAvLyDliIfmjaLmjInpkq5cclxuICAgIHJldHJpZXZhbFN0YXRpc3RpY3NMaXN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHJldHJpZXZhbFRyYWZmaWNUcmVuZExpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcmFua1N0YXRpc3RpY3NMaXN0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICAvLyDkuIvmi4noj5zljZUg5pe26Ze05o6n5Lu2XHJcbiAgICByYW5rQ2xhc3NOYW1lOiBBcnJheTxzdHJpbmc+ID0gW1wiaS1yYW5rLWZpcnN0XCIsIFwiaS1yYW5rLXNlY29uZFwiLCBcImktcmFuay10aGlyZFwiLCBcImktcmFuay1mb3VyXCIsIFwiaS1yYW5rLWZpdmVcIl07XHJcbiAgICByZXRyaWV2YWxLZXlXb3JkUmFuazogQXJyYXk8YW55PjtcclxuXHJcbiAgICBSZXRyaWV2YWxfTW9kZWw6IGRhdGFTZWxlY3RSZXN1bHQgPSBuZXcgZGF0YVNlbGVjdFJlc3VsdCgpO1xyXG4gICAgUmV0cmlldmFsX1RyZW5kX01vZGVsOiBkYXRhU2VsZWN0UmVzdWx0ID0gbmV3IGRhdGFTZWxlY3RSZXN1bHQoKTtcclxuICAgIFJhbmtTdGF0aXN0aWNzX01vZGVsOiBkYXRhU2VsZWN0UmVzdWx0ID0gbmV3IGRhdGFTZWxlY3RSZXN1bHQoKTtcclxuICAgIE1vZHVsZU5hbWVBcnI6IGludGVsbGlnZW50QW5hbHlzaXNEYXRhRW51bSA9IGFuZ3VsYXIuY29weShpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YSk7XHJcbiAgICB0aW1lSXRlbTogQXJyYXk8c2VsZWN0RGF0YUVudW0+ID0gYW5ndWxhci5jb3B5KFNlbGVjdERhdGEpO1xyXG5cclxuICAgIC8vUmFua1xyXG4gICAgT3BlclRoaXJkTW9kdWxlOiBhbnkgPSBPcGVyVGhpcmRNb2R1bGU7XHJcbiAgICBSYW5rS2V5V29yZHM6IEFycmF5PFJhbmtLZXlXb3JkRW51bT4gPSBSYW5rS2V5V29yZDtcclxuICAgIGRldmljZU1vZHVsZUFycjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgZGV2aWNlTW9kdWxlT2JqOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PGFueT4gfSA9IHt9O1xyXG5cclxuICAgIGVjaGFydE5hbWVBcnI6IGFueSA9IGFuZ3VsYXIuY29weShlY2hhcnROYW1lQXJyKTtcclxuXHJcbiAgICAvL+inhuWbvuWIl+ihqFxyXG4gICAgcmV0cmlldmFsU3RhdGlzdGljVGFibGVMaXN0OiBhbnk7XHJcbiAgICByZXRyaWV2YWxUcmFmZmljVHJlbmRUYWJsZUxpc3Q6IGFueTtcclxuICAgIHJhbmtTdGF0aXN0aWNzVGFibGVMaXN0OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpbkZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgbWFpbnRhaW5TZXJ2aWNlOiBJTWFpbnRhaW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlcikge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICRzY29wZS4kb24oJ2luaXRDaGFydCcsIChldnQ6IGFueSwgb3B0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZGVzdHJveUNoYXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFJldHJpZXZhbFN0YXRpc3RpY3MoKTtcclxuICAgICAgICB0aGlzLmluaXRSZXRyaWV2YWxUcmFmZmljVHJlbmQoKTtcclxuICAgICAgICB0aGlzLnJhbmtTdGF0aXN0aWNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA57Si57uf6K6hXHJcbiAgICBpbml0UmV0cmlldmFsU3RhdGlzdGljcyh2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLnRpbWVSZXF1aXJlUGFyYW0odGhpcy5SZXRyaWV2YWxfTW9kZWwsIHZhbHVlKTtcclxuICAgICAgICBsZXQgUmV0cmlldmFsUGFyYW1zOiBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcyA9IHRoaXMubWFpbnRhaW5GYWN0b3J5LlJldHJpZXZhbFBhcmFtcyh0aGlzLlJldHJpZXZhbF9Nb2RlbC5tb2R1bGUpO1xyXG4gICAgICAgIGlmICh0aGlzLlJhbmtTdGF0aXN0aWNzX01vZGVsLm1vZHVsZSA9PSBBbGFybU9iamVjdFR5cGUuQUxMLnZhbHVlIHx8IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIFJldHJpZXZhbFBhcmFtcy5iZWdpbkRhdGUgPSBwYXJhbXMuYmVnaW5EYXRlO1xyXG4gICAgICAgICAgICBSZXRyaWV2YWxQYXJhbXMuZW5kRGF0ZSA9IHBhcmFtcy5lbmREYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIVJldHJpZXZhbFBhcmFtcykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5TZXJ2aWNlLnJldHJpZXZhbFN0YXRpc3RpY3MoUmV0cmlldmFsUGFyYW1zKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8YW5hbHlzaXNTdGF0aXN0aWNzUmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5pbml0Q2hhcnQodGhpcy5zZXREYXRhKFJldHJpZXZhbFN0YXRpc3RpY01vZHVsZU5hbWUucmV0cmlldmFsU3RhdGlzdGljLCByZXMuZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA57Si57uf6K6h6LaL5Yq/XHJcbiAgICBpbml0UmV0cmlldmFsVHJhZmZpY1RyZW5kKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0gdGhpcy50aW1lUmVxdWlyZVBhcmFtKHRoaXMuUmV0cmlldmFsX1RyZW5kX01vZGVsLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICghcGFyYW1zKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLlJldHJpZXZhbF9UcmVuZF9Nb2RlbC5tb2R1bGUgfHwgdGhpcy5SZXRyaWV2YWxfVHJlbmRfTW9kZWwubW9kdWxlID09IG1vZHVsZVN0cmluZy5BTEwpIHtcclxuICAgICAgICAgICAgcGFyYW1zLnRpbWVUeXBlID0gbW9kdWxlU3RyaW5nLk1vbnRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy50aW1lVHlwZSA9IHRoaXMuUmV0cmlldmFsX1RyZW5kX01vZGVsLm1vZHVsZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5tYWludGFpblNlcnZpY2UucmV0cmlldmFsVHJlbmRTdGF0aXN0aWNzKHBhcmFtcykudGhlbigocmVzOiBCYWNrUmVzcG9uc2VCb2R5PGFuYWx5c2lzU3RhdGlzdGljc1Jlc3VsdD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuaW5pdENoYXJ0KHRoaXMuc2V0RGF0YShSZXRyaWV2YWxTdGF0aXN0aWNNb2R1bGVOYW1lLnJldHJpZXZhbFRyYWZmaWNUcmVuZCwgcmVzLmRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWFs+mUruWtl+aOkuihjOamnFxyXG4gICAgcmFua1N0YXRpc3RpY3ModmFsdWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGhhdDogcmV0cmlldmFsU3RhdGlzdGljc0NvbnRyb2xsZXIgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IGFueSA9IHRoYXQubWFpbnRhaW5GYWN0b3J5LlJldHJpZXZhbFJhbmtQYXJhbSh0aGF0LlJhbmtTdGF0aXN0aWNzX01vZGVsLCBBbGFybU9iamVjdFR5cGUuQUxMLnZhbHVlLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgIGlmICh0aGF0LlJhbmtTdGF0aXN0aWNzX01vZGVsLm1vZHVsZSA9PSBtb2R1bGVTdHJpbmcuQ3VzdG9tICYmICF2YWx1ZSkgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICB0aGF0Lm1haW50YWluU2VydmljZS5yZXRyaWV2YWxLZXlXb3JkUmFuayhwYXJhbXMpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGV2aWNlTW9kdWxlT2JqID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldmljZU1vZHVsZUFyciA9IE9iamVjdC5rZXlzKHJlcy5kYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LnJhbmtTdGF0aXN0aWNzVGFibGVMaXN0ID0gYW5ndWxhci5jb3B5KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoYXQucmFua1N0YXRpc3RpY3NUYWJsZUxpc3QubGVnZW5kRGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5yYW5rU3RhdGlzdGljc1RhYmxlTGlzdC5zZXJpZXNEYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICBSYW5rS2V5V29yZC5mb3JFYWNoKChpdGVtOiBSYW5rS2V5V29yZEVudW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnJhbmtTdGF0aXN0aWNzVGFibGVMaXN0LmxlZ2VuZERhdGEucHVzaChpdGVtLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmFua1N0YXRpc3RpY3NUYWJsZUxpc3Quc2VyaWVzRGF0YS5wdXNoKHJlcy5kYXRhW2l0ZW0udmFsdWVdKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluivt+axguWPguaVsFxyXG4gICAgdGltZVJlcXVpcmVQYXJhbShtb2RlbFBhcmFtOiBhbnksIHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0gcmV0cmlldmFsUmVxdWlyZVBhcmFtO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGRhdGFTZWxlY3RSZXN1bHQgPSB0aGlzLmRhdGFTZWxlY3RTZXJ2ZXIuZ2V0UGFyYW1zVGltZShtb2RlbFBhcmFtKTtcclxuICAgICAgICBpZiAobW9kZWxQYXJhbS5tb2R1bGUgPT0gbW9kdWxlU3RyaW5nLkN1c3RvbSAmJiB2YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVBcnI6IEFycmF5PHN0cmluZz4gPSB2YWx1ZS5zcGxpdChcIiAtIFwiKTtcclxuICAgICAgICAgICAgcGFyYW1zLmJlZ2luRGF0ZSA9IHZhbHVlQXJyWzBdO1xyXG4gICAgICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IHZhbHVlQXJyWzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5iZWdpbkRhdGUgPSByZXN1bHQuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IHJlc3VsdC5lbmRUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFyYW1zLmJlZ2luRGF0ZSAmJiBwYXJhbXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOajgOe0oue7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmV0cmlldmFsU3RhdGlzdGljKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGRhdGEuc2VyaWVzRGF0YSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gZGF0YS55RGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIC8vIGxldCBsZWdlbmREYXRhID0gZGF0YS5sZWdlbmREYXRhIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNmM4Y2U0XCJdO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIxMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCI7XHJcblxyXG4gICAgICAgIC8vZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gNTA7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQuYm90dG9tID0gMjA7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gNTA7XHJcblxyXG4gICAgICAgIHNlcmllc0QubGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsO1xyXG4gICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWw7XHJcbiAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImluc2lkZVJpZ2h0XCI7XHJcbiAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA57Si6LaL5Yq/57uf6K6hXHJcbiAgICBwcml2YXRlIHN0YXRpYyByZXRyaWV2YWxUcmFmZmljVHJlbmQoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXMgYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IGRhdGEuZGF0ZUxpc3QgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IGRhdGEubGVnZW5kRGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgLy90b29sdG9wXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gXCJheGlzXCI7XHJcblxyXG4gICAgICAgIC8vIGNvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzdDQ0NGMlwiLCBcIiM2QzhDRTRcIiwgXCIjZjhhNjE5XCIsIFwiIzAwZDVlMlwiXTtcclxuXHJcbiAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIyMHB4XCI7XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbi5sZWdlbmQubGVmdDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnJpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtV2lkdGggPSAyMDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1IZWlnaHQgPSAxMDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1HYXAgPSAzMDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmljb24gPSBudWxsO1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5ib3VuZGFyeUdhcCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuXHJcbiAgICAgICAgLy8gZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gNTA7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQuYm90dG9tID0gMjA7XHJcblxyXG4gICAgICAgIC8veUF4aXNcclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIC8vIG9wdGlvbi55QXhpcy5taW4gPSAwXHJcbiAgICAgICAgLy8gb3B0aW9uLnlBeGlzLm1heCA9IDQwMDAwXHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICBsZXQgYXJlYUNvbG9yOiBBcnJheTxzdHJpbmc+ID0gW1wiMTI0LDIwNCwyNDJcIiwgXCIxMDgsMTQwLDIyOFwiLCBcIjI0OCwxNjYsMjVcIiwgXCIwLDIxMywyMjZcIl07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgLy9jb2xvclxyXG4gICAgICAgICAgICBsZXQgYXJlYVN0eWxlQ29sb3I6IGFueSA9IG5ldyBDaGFydE9wdGlvbnMuYXJlYVN0eWxlQ29sb3IoYXJlYUNvbG9yW2ldKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5hcmVhU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmFyZWFTdHlsZSgpO1xyXG4gICAgICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLk9iamVjdE5vcm1hbCgpO1xyXG4gICAgICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBhcmVhU3R5bGVDb2xvci5nZXRDb2xvcigpO1xyXG5cclxuICAgICAgICAgICAgLy9kYXRhXHJcbiAgICAgICAgICAgIGxldCBrZXk6IGFueSA9IE9iamVjdC5rZXlzKHNlcmllc0RhdGEpW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2tleV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEobmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogYW55ID0gQ2hhcnRPcHRpb25PYmplY3QobmFtZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyZXRyaWV2YWxTdGF0aXN0aWMnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJpZXZhbFN0YXRpc3RpY1RhYmxlTGlzdCA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV0cmlldmFsU3RhdGlzdGljVGFibGVMaXN0LmxlZ2VuZERhdGEgPSBbJ+iuvuWkh+WQjScsICforr7lpIfmlbAnXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSByZXRyaWV2YWxTdGF0aXN0aWNzQ29udHJvbGxlci5yZXRyaWV2YWxTdGF0aXN0aWMoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmV0cmlldmFsVHJhZmZpY1RyZW5kJzoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXRyaWV2YWxUcmFmZmljVHJlbmRUYWJsZUxpc3QgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJpZXZhbFRyYWZmaWNUcmVuZFRhYmxlTGlzdC54RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLmRhdGVMaXN0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmV0cmlldmFsVHJhZmZpY1RyZW5kVGFibGVMaXN0LmxlZ2VuZERhdGEudW5zaGlmdCgn5pel5pyfJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJpZXZhbFRyYWZmaWNUcmVuZFRhYmxlTGlzdC5zZXJpZXNEYXRhID0gW2RhdGEuc2VyaWVzLmNhbWVyYSwgZGF0YS5zZXJpZXMuZWxlY3Ryb25pY2ZlbmNlLCBkYXRhLnNlcmllcy5ybXBnYXRlLCBkYXRhLnNlcmllcy53aWZpXTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSByZXRyaWV2YWxTdGF0aXN0aWNzQ29udHJvbGxlci5yZXRyaWV2YWxUcmFmZmljVHJlbmQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmFua1N0YXRpc3RpY3MnOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29uZmlnID0gdGhpcy5yYW5rU3RhdGlzdGljcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmV0cmlldmFsU3dpdGNoKHN3aXRjaFN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgc3dpdGNoIChzd2l0Y2hTdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FzZSAncmV0cmlldmFsU3RhdGlzdGljc0hpc3RvZ3JhbSc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQucmV0cmlldmFsU3RhdGlzdGljc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmV0cmlldmFsU3RhdGlzdGljc0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJldHJpZXZhbFN0YXRpc3RpY3NMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdyZXRyaWV2YWxUcmFmZmljVHJlbmRIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LnJldHJpZXZhbFRyYWZmaWNUcmVuZExpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAncmV0cmlldmFsVHJhZmZpY1RyZW5kTGlzdCc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQucmV0cmlldmFsVHJhZmZpY1RyZW5kTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRJbWFnZShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZXhwb3J0SW1hZ2UoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRFeGNlbChtb2R1bGU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZXhwb3J0RXhjZWwobW9kdWxlLCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJyZXRyaWV2YWxTdGF0aXN0aWNzQ29udHJvbGxlclwiLCByZXRyaWV2YWxTdGF0aXN0aWNzQ29udHJvbGxlcik7Il19
