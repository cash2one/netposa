define(["require", "exports", "../../../common/app/main.app", "../../main/maintainFactory", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "css!module/maintain/css/alarmStatistics.css", "../../main/maintainFactory", "moment"], function (require, exports, main_app_1, maintainFactory_1, ChartOptions, maintainEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var alarmStatisticsController = (function () {
        function alarmStatisticsController($scope, maintainFactory, dataSelectServer, maintainService) {
            var _this = this;
            this.$scope = $scope;
            this.maintainFactory = maintainFactory;
            this.dataSelectServer = dataSelectServer;
            this.maintainService = maintainService;
            this.areaAlarmList = true;
            this.areaAlarmTrendList = true;
            this.deviceAlarmStatisticsList = true;
            this.dispatchedAboutAlarmList = true;
            this.superData = new maintainEnum_1.AlarmSuperData();
            this.dataFilterParam = new maintainEnum_1.alarmTrafficReqEnum();
            this.timeItem = angular.copy(maintainEnum_1.SelectData);
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
            this.Area_Alarm_Model = new maintainFactory_1.allParams(this.ModuleNameArr.areaAlarm);
            this.Area_Alarm_Trend_Model = new maintainFactory_1.allParams(this.ModuleNameArr.areaAlarmTrend);
            this.Device_Alarm_Statistics_Model = new maintainFactory_1.allParams(this.ModuleNameArr.deviceAlarmStatistics);
            this.Dispatched_About_Alarm_Model = new maintainFactory_1.allParams(this.ModuleNameArr.dispatchedAboutAlarm);
            this.TrendDeviceDropList = [];
            this.TrendAreaDropList = [];
            this.dropListArea = [];
            this.dropListType = [];
            this.deviceAlarmData = [];
            this.areaAlarmData = [];
            this.echartNameArr = angular.copy(maintainEnum_1.echartNameArr);
            this.init();
            $scope.$on('initChart', function (evt, opt) {
                _this.init();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        alarmStatisticsController.prototype.init = function (dataFilterParam) {
            if (!dataFilterParam) {
                dataFilterParam = {
                    beginDate: moment().subtract(30, 'days').format("YYYY-MM-DD hh:mm:ss"),
                    endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
                    resourceType: "ALL",
                    timeType: "Month",
                };
            }
            this.initAreaAlarmNum(angular.copy(dataFilterParam));
            this.initAreaAlarmTrend(angular.copy(dataFilterParam));
            this.initDeviceAlarmTop(angular.copy(dataFilterParam));
            this.initDispatchedAboutAlarm(angular.copy(dataFilterParam));
        };
        alarmStatisticsController.areaAlarm = function (data) {
            console.log(data);
            var seriesData = data.seriesData;
            var xData = data.xData;
            var legendData = data.legendData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#6c8ce4", "#7cccf2", "#dcbe99"];
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
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                seriesD.type = "bar";
                seriesD.stack = "总量";
                seriesD.barWidth = 35;
                seriesD.label = new ChartOptions.label;
                seriesD.label.normal = new ChartOptions.normal;
                seriesD.label.normal.position = "insideRight";
                seriesD.data = seriesData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        alarmStatisticsController.areaAlarmTrend = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.color = ["#7CCCF2"];
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
            var seriesD = new ChartOptions.series();
            var areaColor = "124,204,242";
            var areaStyleColor = new ChartOptions.areaStyleColor(areaColor);
            seriesD.areaStyle = new ChartOptions.areaStyle();
            seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
            seriesD.areaStyle.normal = areaStyleColor.getColor();
            seriesD.type = "line";
            seriesD.stack = "总量";
            seriesD.data = seriesData[0];
            option.series.push(seriesD);
            return option;
        };
        alarmStatisticsController.deviceAlarmStatistics = function (data) {
            var seriesData = angular.copy(data.seriesData);
            var yData = angular.copy(data.yData);
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.tooltip.axisPointer = new ChartOptions.axisPointer();
            option.tooltip.axisPointer.type = "line";
            option.color = ["#53c68c"];
            option.grid = new ChartOptions.grid();
            option.grid.top = 50;
            option.grid.bottom = 20;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.type = "value";
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            option.yAxis.type = "category";
            option.yAxis.data = yData;
            option.series = [];
            var seriesD = new ChartOptions.series();
            seriesD.type = 'bar';
            seriesD.stack = '总量';
            seriesD.data = seriesData;
            seriesD.barWidth = 15;
            seriesD.itemStyle = new ChartOptions.itemStyle();
            seriesD.itemStyle.normal = new ChartOptions.normal();
            seriesD.itemStyle.normal.barBorderRadius = [0, 20, 20, 0];
            option.series.push(seriesD);
            delete option.legend;
            return option;
        };
        alarmStatisticsController.dispatchedAboutAlarm = function (data) {
            var seriesData = data.seriesData;
            var yData = data.yData;
            var legendData = data.legendData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.tooltip.axisPointer = new ChartOptions.axisPointer();
            option.tooltip.axisPointer.type = "line";
            option.color = ["#9ad941", "#fbd15a", "#9cdcee", "#e98371"];
            option.legend = new ChartOptions.legend();
            delete option.legend.left;
            option.legend.right = "20px";
            option.legend.top = "10px";
            option.legend.data = [];
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 10;
            option.legend.itemGap = 60;
            option.grid = new ChartOptions.grid();
            option.grid.top = 50;
            option.grid.bottom = 20;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.type = "value";
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            option.yAxis.type = "category";
            option.yAxis.data = yData;
            option.series = [];
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                seriesD.type = 'bar';
                seriesD.stack = '总量';
                seriesD.data = seriesData[i];
                seriesD.barWidth = 15;
                if (i == legendData.length - 1) {
                    seriesD.itemStyle = new ChartOptions.itemStyle();
                    seriesD.itemStyle.normal = new ChartOptions.normal();
                    seriesD.itemStyle.normal.barBorderRadius = [0, 20, 20, 0];
                }
                option.series.push(seriesD);
            }
            return option;
        };
        alarmStatisticsController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            switch (name) {
                case 'areaAlarm': {
                    option.config = alarmStatisticsController.areaAlarm(data);
                    return option;
                }
                case 'areaAlarmTrend': {
                    option.config = alarmStatisticsController.areaAlarmTrend(data);
                    return option;
                }
                case 'deviceAlarmStatistics': {
                    option.config = alarmStatisticsController.deviceAlarmStatistics(data);
                    return option;
                }
                case 'dispatchedAboutAlarm': {
                    option.config = alarmStatisticsController.dispatchedAboutAlarm(data);
                    return option;
                }
            }
        };
        alarmStatisticsController.prototype.AlarmSwitch = function (switchString) {
            var that = this;
            switch (switchString) {
                case 'alarmStatisticsHistogram': {
                    that.areaAlarmList = true;
                    break;
                }
                case 'alarmStatisticsList': {
                    that.areaAlarmList = false;
                    break;
                }
                case 'areaAlarmTrendHistogram': {
                    that.areaAlarmTrendList = true;
                    break;
                }
                case 'areaAlarmTrendList': {
                    that.areaAlarmTrendList = false;
                    break;
                }
                case 'deviceAlarmHistogram': {
                    that.deviceAlarmStatisticsList = true;
                    break;
                }
                case 'deviceAlarmList': {
                    that.deviceAlarmStatisticsList = false;
                    break;
                }
                case 'dispatchedAboutAlarmHistogram': {
                    that.dispatchedAboutAlarmList = true;
                    break;
                }
                case 'dispatchedAboutList': {
                    that.dispatchedAboutAlarmList = false;
                    break;
                }
            }
        };
        alarmStatisticsController.prototype.initAreaAlarmNum = function (dataFilterParam) {
            var that = this;
            that.maintainService.alarmStatistics(dataFilterParam).then(function (res) {
                that.areaAlarmTableData = res.data;
                that.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.areaAlarm, res.data);
            });
        };
        alarmStatisticsController.prototype.AreaAlarmNumTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Area_Alarm_Model, value);
            if (param) {
                this.initAreaAlarmNum(param);
            }
        };
        alarmStatisticsController.prototype.initAreaAlarmTrend = function (dataFilterParam) {
            var that = this;
            that.maintainService.alarmStatisticsModule(dataFilterParam).then(function (res) {
                that.TrendDeviceDropList = res.data.deviceDropMenu;
                that.TrendAreaDropList = res.data.areaDropMenu;
                that.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.areaAlarmTrend, res.data);
            });
        };
        alarmStatisticsController.prototype.TrendStatusType = function (selected, Area_Alarm_Trend_Model) {
            console.log(selected);
            console.log(this.Area_Alarm_Trend_Model);
        };
        alarmStatisticsController.prototype.AreaTrendTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Area_Alarm_Trend_Model, value);
            console.log(param);
            if (param) {
                this.initAreaAlarmTrend(param);
            }
        };
        alarmStatisticsController.prototype.initDeviceAlarmTop = function (dataFilterParam) {
            var _this = this;
            var that = this;
            this.maintainService.deveceAlarmStatisticsTop(dataFilterParam).then(function (res) {
                if (res && res.data) {
                    _this.deviceAlarmStatisticsTableData = res.data.deviceObj.ALL;
                    _this.areaAlarmTrendTableData = res.data.deviceObj.ALL;
                    _this.areaAlarmTrendTableData.legendData = ['报警区域', '报警数'];
                    that.deviceAlarmData = res.data.deviceObj;
                    that.areaAlarmData = res.data.areaObj;
                    console.log(_this.deviceAlarmData.dropListMenu, '设备报警统计');
                    that.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.deviceAlarmStatistics, that.deviceAlarmData[maintainEnum_1.AlarmObjectType.ALL.value]);
                }
            });
        };
        alarmStatisticsController.prototype.AlarmDeviceDrop = function (selected) {
            var data = this.deviceAlarmData[selected.value];
            this.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.deviceAlarmStatistics, data);
        };
        alarmStatisticsController.prototype.AlarmAreaDrop = function (selected) {
            var data = this.areaAlarmData[selected.text];
            this.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.deviceAlarmStatistics, data);
        };
        alarmStatisticsController.prototype.AlarmTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Device_Alarm_Statistics_Model, value);
            if (param) {
                this.initDeviceAlarmTop(param);
            }
        };
        alarmStatisticsController.prototype.initDispatchedAboutAlarm = function (dataFilterParam) {
            var _this = this;
            dataFilterParam.resourceType = "ALL";
            dataFilterParam.groupType = "ByLib";
            this.maintainService.dispatchedAboutAlarm(dataFilterParam).then(function (res) {
                if (res && res.data) {
                    _this.dispatchedAboutAlarmTableData = res.data;
                    _this.dispatchedAboutAlarmTableData.legendData.unshift("布控库名称");
                    _this.getDataAndInitChart(maintainEnum_1.AlarmStatisticsModuleName.dispatchedAboutAlarm, res.data);
                }
            });
        };
        alarmStatisticsController.prototype.DispatchedTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Dispatched_About_Alarm_Model, value);
            if (param) {
                this.initDispatchedAboutAlarm(param);
            }
        };
        alarmStatisticsController.prototype.getDataAndInitChart = function (chartName, data) {
            var chartConfig = this.setData(chartName, data);
            if (chartConfig) {
                this.maintainFactory.initChart(chartConfig);
            }
        };
        alarmStatisticsController.prototype.exportImage = function (id) {
            this.maintainFactory.exportImage(id);
        };
        alarmStatisticsController.prototype.exportExcel = function (module, data) {
            this.maintainFactory.exportExcel(module, data);
        };
        alarmStatisticsController.$inject = ["$scope", "maintainFactory", "dataSelectServer", "maintainService"];
        return alarmStatisticsController;
    }());
    main_app_1.app.controller("alarmStatisticsController", alarmStatisticsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L2FsYXJtU3RhdGlzdGljcy9hbGFybVN0YXRpc3RpY3MuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUF1QkE7UUFzQ0ksbUNBQW9CLE1BQVcsRUFDbkIsZUFBK0IsRUFDL0IsZ0JBQWtDLEVBQ2xDLGVBQWlDO1lBSDdDLGlCQVlDO1lBWm1CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1lBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBdEM3QyxrQkFBYSxHQUFZLElBQUksQ0FBQztZQUM5Qix1QkFBa0IsR0FBWSxJQUFJLENBQUM7WUFDbkMsOEJBQXlCLEdBQVksSUFBSSxDQUFDO1lBQzFDLDZCQUF3QixHQUFZLElBQUksQ0FBQztZQUd6QyxjQUFTLEdBQVEsSUFBSSw2QkFBYyxFQUFFLENBQUM7WUFDdEMsb0JBQWUsR0FBd0IsSUFBSSxrQ0FBbUIsRUFBRSxDQUFDO1lBR2pFLGFBQVEsR0FBMEIsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBVSxDQUFDLENBQUM7WUFDM0Qsa0JBQWEsR0FBZ0MsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBdUIsQ0FBQyxDQUFDO1lBQ25GLHFCQUFnQixHQUFjLElBQUksMkJBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzFFLDJCQUFzQixHQUFjLElBQUksMkJBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JGLGtDQUE2QixHQUFjLElBQUksMkJBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkcsaUNBQTRCLEdBQWMsSUFBSSwyQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FB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LENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRCxDQUFDO1FBQ0wsQ0FBQztRQUVNLCtDQUFXLEdBQWxCLFVBQW1CLEVBQVU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUVNLCtDQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxJQUFTO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBL2dCTSxpQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFpaEIxRixnQ0FBQztLQWxoQkQsQUFraEJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDJCQUEyQixFQUFFLHlCQUF5QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbGFybVN0YXRpc3RpY3MvYWxhcm1TdGF0aXN0aWNzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhbW9kdWxlL21haW50YWluL2Nzcy9hbGFybVN0YXRpc3RpY3MuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmltcG9ydCB7IElFY2hhcnRGYWN0b3J5LCBDaGFydE9wdGlvbk9iamVjdCwgYWxsUGFyYW1zIH0gZnJvbSBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCB7IGRhdGFTZWxlY3RTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGF0YVNlbGVjdC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7XHJcbiAgICBkcm9wRW51bSxcclxuICAgIGFsYXJtVHJhZmZpY1JlcUVudW0sXHJcbiAgICBzZWxlY3REYXRhRW51bSxcclxuICAgIFNlbGVjdERhdGEsXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YUVudW0sXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YSxcclxuICAgIGVjaGFydE5hbWVBcnIsXHJcbiAgICBBbGFybVN1cGVyRGF0YSxcclxuICAgIEFsYXJtU3RhdGlzdGljc01vZHVsZU5hbWUsXHJcbiAgICBBbGFybU9iamVjdFR5cGVcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvbWFpbnRhaW5FbnVtXCI7XHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwibW9tZW50XCJcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgbW9tZW50OiBhbnk7XHJcblxyXG5jbGFzcyBhbGFybVN0YXRpc3RpY3NDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibWFpbnRhaW5GYWN0b3J5XCIsIFwiZGF0YVNlbGVjdFNlcnZlclwiLCBcIm1haW50YWluU2VydmljZVwiXTtcclxuICAgIC8vIOWIh+aNouaMiemSrlxyXG4gICAgYXJlYUFsYXJtTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBhcmVhQWxhcm1UcmVuZExpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZGV2aWNlQWxhcm1TdGF0aXN0aWNzTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBkaXNwYXRjaGVkQWJvdXRBbGFybUxpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8vIOiOt+WPluS/oeaBr1xyXG4gICAgc3VwZXJEYXRhOiBhbnkgPSBuZXcgQWxhcm1TdXBlckRhdGEoKTtcclxuICAgIGRhdGFGaWx0ZXJQYXJhbTogYWxhcm1UcmFmZmljUmVxRW51bSA9IG5ldyBhbGFybVRyYWZmaWNSZXFFbnVtKCk7XHJcblxyXG4gICAgLy8g5pe26Ze05o6n5Lu2XHJcbiAgICB0aW1lSXRlbTogQXJyYXk8c2VsZWN0RGF0YUVudW0+ID0gYW5ndWxhci5jb3B5KFNlbGVjdERhdGEpO1xyXG4gICAgTW9kdWxlTmFtZUFycjogaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtID0gYW5ndWxhci5jb3B5KGludGVsbGlnZW50QW5hbHlzaXNEYXRhKTtcclxuICAgIEFyZWFfQWxhcm1fTW9kZWw6IGFsbFBhcmFtcyA9IG5ldyBhbGxQYXJhbXModGhpcy5Nb2R1bGVOYW1lQXJyLmFyZWFBbGFybSk7XHJcbiAgICBBcmVhX0FsYXJtX1RyZW5kX01vZGVsOiBhbGxQYXJhbXMgPSBuZXcgYWxsUGFyYW1zKHRoaXMuTW9kdWxlTmFtZUFyci5hcmVhQWxhcm1UcmVuZCk7XHJcbiAgICBEZXZpY2VfQWxhcm1fU3RhdGlzdGljc19Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuZGV2aWNlQWxhcm1TdGF0aXN0aWNzKTtcclxuICAgIERpc3BhdGNoZWRfQWJvdXRfQWxhcm1fTW9kZWw6IGFsbFBhcmFtcyA9IG5ldyBhbGxQYXJhbXModGhpcy5Nb2R1bGVOYW1lQXJyLmRpc3BhdGNoZWRBYm91dEFsYXJtKTtcclxuXHJcbiAgICAvLyDkuIvmi4noj5zljZVcclxuICAgIFRyZW5kRGV2aWNlRHJvcExpc3Q6IEFycmF5PGRyb3BFbnVtPiA9IFtdO1xyXG4gICAgVHJlbmRBcmVhRHJvcExpc3Q6IEFycmF5PGRyb3BFbnVtPiA9IFtdO1xyXG4gICAgZHJvcExpc3RBcmVhOiBBcnJheTxkcm9wRW51bT4gPSBbXTtcclxuICAgIGRyb3BMaXN0VHlwZTogQXJyYXk8ZHJvcEVudW0+ID0gW107XHJcblxyXG4gICAgLy8g5oql6K2m6K6+5aSH55u45YWz5LiL5ouJ6I+c5Y2VXHJcbiAgICBkZXZpY2VBbGFybURhdGE6IGFueSA9IFtdOyAvL+iuvuWkh+WIh+aNouaVsOaNrlxyXG4gICAgYXJlYUFsYXJtRGF0YTogYW55ID0gW107IC8v5Zyw5Yy65YiH5o2i5pWw5o2uXHJcblxyXG4gICAgLy8g5YiX6KGo6KeG5Zu+XHJcbiAgICBhcmVhQWxhcm1UYWJsZURhdGE6IGFueTtcclxuICAgIGFyZWFBbGFybVRyZW5kVGFibGVEYXRhOiBhbnk7XHJcbiAgICBkZXZpY2VBbGFybVN0YXRpc3RpY3NUYWJsZURhdGE6IGFueTtcclxuICAgIGRpc3BhdGNoZWRBYm91dEFsYXJtVGFibGVEYXRhOiBhbnk7XHJcblxyXG4gICAgZWNoYXJ0TmFtZUFycjogYW55ID0gYW5ndWxhci5jb3B5KGVjaGFydE5hbWVBcnIpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpbkZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlcixcclxuICAgICAgICBwcml2YXRlIG1haW50YWluU2VydmljZTogSU1haW50YWluU2VydmljZSkge1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdpbml0Q2hhcnQnLCAoZXZ0OiBhbnksIG9wdDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmRlc3Ryb3lDaGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdChkYXRhRmlsdGVyUGFyYW0/OiBhbGFybVRyYWZmaWNSZXFFbnVtKSB7XHJcbiAgICAgICAgaWYgKCFkYXRhRmlsdGVyUGFyYW0pIHtcclxuICAgICAgICAgICAgZGF0YUZpbHRlclBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgYmVnaW5EYXRlOiBtb21lbnQoKS5zdWJ0cmFjdCgzMCwgJ2RheXMnKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogbW9tZW50KCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBoaDptbTpzc1wiKSxcclxuICAgICAgICAgICAgICAgIHJlc291cmNlVHlwZTogXCJBTExcIixcclxuICAgICAgICAgICAgICAgIHRpbWVUeXBlOiBcIk1vbnRoXCIsXHJcbiAgICAgICAgICAgIH0gYXMgYWxhcm1UcmFmZmljUmVxRW51bTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWMuuWfn+aKpeitpuaVsFxyXG4gICAgICAgIHRoaXMuaW5pdEFyZWFBbGFybU51bShhbmd1bGFyLmNvcHkoZGF0YUZpbHRlclBhcmFtKSk7XHJcblxyXG4gICAgICAgIC8vIOWMuuWfn+aKpeitpui2i+WKv1xyXG4gICAgICAgIHRoaXMuaW5pdEFyZWFBbGFybVRyZW5kKGFuZ3VsYXIuY29weShkYXRhRmlsdGVyUGFyYW0pKTtcclxuXHJcbiAgICAgICAgLy/orr7lpIfmiqXorabnu5/orqFUT1AxMFxyXG4gICAgICAgIHRoaXMuaW5pdERldmljZUFsYXJtVG9wKGFuZ3VsYXIuY29weShkYXRhRmlsdGVyUGFyYW0pKTtcclxuXHJcbiAgICAgICAgLy/luIPmjqflupPlhbPogZTmiqXorabnu5/orqFcclxuICAgICAgICB0aGlzLmluaXREaXNwYXRjaGVkQWJvdXRBbGFybShhbmd1bGFyLmNvcHkoZGF0YUZpbHRlclBhcmFtKSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIOWMuuWfn+aKpeitpuaVsFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXJlYUFsYXJtKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGRhdGEuc2VyaWVzRGF0YSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gZGF0YS54RGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gZGF0YS5sZWdlbmREYXRhIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNmM4Y2U0XCIsIFwiIzdjY2NmMlwiLCBcIiNkY2JlOTlcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbi5sZWdlbmQubGVmdDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnJpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSBcIjEwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtV2lkdGggPSAxNTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1IZWlnaHQgPSAxMDtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5mb250U2l6ZSA9IFwiMTBcIjtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA1MDtcclxuICAgICAgICBvcHRpb24uZ3JpZC5ib3R0b20gPSAyMDtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEuaWNvbiA9IFwic3RhY2tcIjtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICAgICAgc2VyaWVzRC5zdGFjayA9IFwi5oC76YePXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAzNTtcclxuXHJcbiAgICAgICAgICAgIHNlcmllc0QubGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsO1xyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsO1xyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbC5wb3NpdGlvbiA9IFwiaW5zaWRlUmlnaHRcIjtcclxuICAgICAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWMuuWfn+aKpeitpui2i+WKv1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgYXJlYUFsYXJtVHJlbmQoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBkYXRhLnhEYXRhIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgLy8gbGV0IGxlZ2VuZERhdGEgPSBkYXRhLmxlZ2VuZERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vdG9vbHRvcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiYXhpc1wiO1xyXG5cclxuICAgICAgICAvLyBjb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM3Q0NDRjJcIl07XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmJvdW5kYXJ5R2FwID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG5cclxuICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA1MDtcclxuICAgICAgICBvcHRpb24uZ3JpZC5ib3R0b20gPSAyMDtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgLy8gb3B0aW9uLnlBeGlzLm1pbiA9IDBcclxuICAgICAgICAvLyBvcHRpb24ueUF4aXMubWF4ID0gNDAwMDBcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgbGV0IGFyZWFDb2xvcjogYW55ID0gXCIxMjQsMjA0LDI0MlwiO1xyXG4gICAgICAgIGxldCBhcmVhU3R5bGVDb2xvcjogYW55ID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGVDb2xvcihhcmVhQ29sb3IpO1xyXG4gICAgICAgIHNlcmllc0QuYXJlYVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLk9iamVjdE5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc0QuYXJlYVN0eWxlLm5vcm1hbCA9IGFyZWFTdHlsZUNvbG9yLmdldENvbG9yKCk7XHJcblxyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbMF07XHJcbiAgICAgICAgLy8gc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YTtcclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvuWkh+aKpeitpue7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGV2aWNlQWxhcm1TdGF0aXN0aWNzKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnNlcmllc0RhdGEpO1xyXG4gICAgICAgIGxldCB5RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnlEYXRhKTtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gXCJheGlzXCI7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAuYXhpc1BvaW50ZXIgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNQb2ludGVyKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAuYXhpc1BvaW50ZXIudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyLnR5cGUgPSBcImNyb3NzXCI7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNTNjNjhjXCJdO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5ib3VuZGFyeUdhcCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcblxyXG4gICAgICAgIC8veUF4aXNcclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMuZGF0YSA9IHlEYXRhO1xyXG5cclxuICAgICAgICAvL3Nlcmllc1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAvLyBzZXJpZXNELm5hbWUgPSB5RGF0YVtpXTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSAnYmFyJztcclxuICAgICAgICBzZXJpZXNELnN0YWNrID0gJ+aAu+mHjyc7XHJcbiAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YTtcclxuICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMTU7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsKCk7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUubm9ybWFsLmJhckJvcmRlclJhZGl1cyA9IFswLCAyMCwgMjAsIDBdO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuICAgICAgICAvLyBmb3IobGV0IGk6bnVtYmVyPTA7aTw9eURhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgLy8gICAgIGlmKHlEYXRhW2ldKXtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZDtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShvcHRpb24pKTtcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5biD5o6n5bqT5YWz6IGU5oql6K2m57uf6K6hXHJcbiAgICBwcml2YXRlIHN0YXRpYyBkaXNwYXRjaGVkQWJvdXRBbGFybShkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBkYXRhLnNlcmllc0RhdGE7XHJcbiAgICAgICAgbGV0IHlEYXRhID0gZGF0YS55RGF0YTtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IGRhdGEubGVnZW5kRGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLnRyaWdnZXIgPSBcImF4aXNcIjtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC5heGlzUG9pbnRlciA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1BvaW50ZXIoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC5heGlzUG9pbnRlci50eXBlID0gXCJsaW5lXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnRvb2x0aXAuYXhpc1BvaW50ZXIudHlwZSA9IFwiY3Jvc3NcIjtcclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM5YWQ5NDFcIiwgXCIjZmJkMTVhXCIsIFwiIzljZGNlZVwiLCBcIiNlOTgzNzFcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbi5sZWdlbmQubGVmdDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnJpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSBcIjEwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcblxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUdhcCA9IDYwO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5ib3VuZGFyeUdhcCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcblxyXG4gICAgICAgIC8veUF4aXNcclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMuZGF0YSA9IHlEYXRhO1xyXG5cclxuICAgICAgICAvL3Nlcmllc1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBsZWdlbmRcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEucHVzaChsZWdlbmRBcnJheURhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy9zZXJpZXNcclxuICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNELnR5cGUgPSAnYmFyJztcclxuICAgICAgICAgICAgc2VyaWVzRC5zdGFjayA9ICfmgLvph48nO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMTU7XHJcbiAgICAgICAgICAgIGlmIChpID09IGxlZ2VuZERhdGEubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWwoKTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbC5iYXJCb3JkZXJSYWRpdXMgPSBbMCwgMjAsIDIwLCAwXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g57uY5Yi25Zu+6KGoXHJcbiAgICBwcml2YXRlIHNldERhdGEobmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogYW55ID0gQ2hhcnRPcHRpb25PYmplY3QobmFtZSk7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FyZWFBbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSBhbGFybVN0YXRpc3RpY3NDb250cm9sbGVyLmFyZWFBbGFybShkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2FyZWFBbGFybVRyZW5kJzoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbmZpZyA9IGFsYXJtU3RhdGlzdGljc0NvbnRyb2xsZXIuYXJlYUFsYXJtVHJlbmQoZGF0YSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdkZXZpY2VBbGFybVN0YXRpc3RpY3MnOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29uZmlnID0gYWxhcm1TdGF0aXN0aWNzQ29udHJvbGxlci5kZXZpY2VBbGFybVN0YXRpc3RpY3MoZGF0YSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdkaXNwYXRjaGVkQWJvdXRBbGFybSc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSBhbGFybVN0YXRpc3RpY3NDb250cm9sbGVyLmRpc3BhdGNoZWRBYm91dEFsYXJtKGRhdGEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Zu+5b2i5LiO5YiX6KGo6KeG5Zu+5YiH5o2iXHJcbiAgICBwdWJsaWMgQWxhcm1Td2l0Y2goc3dpdGNoU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICBzd2l0Y2ggKHN3aXRjaFN0cmluZykge1xyXG4gICAgICAgICAgICBjYXNlICdhbGFybVN0YXRpc3RpY3NIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFBbGFybUxpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYWxhcm1TdGF0aXN0aWNzTGlzdCc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuYXJlYUFsYXJtTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYXJlYUFsYXJtVHJlbmRIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFBbGFybVRyZW5kTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhcmVhQWxhcm1UcmVuZExpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFBbGFybVRyZW5kTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnZGV2aWNlQWxhcm1IaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldmljZUFsYXJtU3RhdGlzdGljc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnZGV2aWNlQWxhcm1MaXN0Jzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5kZXZpY2VBbGFybVN0YXRpc3RpY3NMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdkaXNwYXRjaGVkQWJvdXRBbGFybUhpc3RvZ3JhbSc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hlZEFib3V0QWxhcm1MaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc3BhdGNoZWRBYm91dExpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpc3BhdGNoZWRBYm91dEFsYXJtTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yy65Z+f5oql6K2m5pWwKFRPUDEwKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PlxyXG4gICAgcHVibGljIGluaXRBcmVhQWxhcm1OdW0oZGF0YUZpbHRlclBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5tYWludGFpblNlcnZpY2UuYWxhcm1TdGF0aXN0aWNzKGRhdGFGaWx0ZXJQYXJhbSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhhdC5hcmVhQWxhcm1UYWJsZURhdGEgPSByZXMuZGF0YVxyXG4gICAgICAgICAgICB0aGF0LmdldERhdGFBbmRJbml0Q2hhcnQoQWxhcm1TdGF0aXN0aWNzTW9kdWxlTmFtZS5hcmVhQWxhcm0sIHJlcy5kYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDml7bpl7Tmjqfku7ZcclxuICAgIHB1YmxpYyBBcmVhQWxhcm1OdW1UaW1lQnV0dG9uQ2xpY2sodmFsdWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0gPSB0aGlzLm1haW50YWluRmFjdG9yeS5nZXRUaW1lUGFyYW1zKHRoaXMuQXJlYV9BbGFybV9Nb2RlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRBcmVhQWxhcm1OdW0ocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDljLrln5/miqXorabotovlir8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PlxyXG4gICAgcHVibGljIGluaXRBcmVhQWxhcm1UcmVuZChkYXRhRmlsdGVyUGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0pIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICB0aGF0Lm1haW50YWluU2VydmljZS5hbGFybVN0YXRpc3RpY3NNb2R1bGUoZGF0YUZpbHRlclBhcmFtKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGF0LlRyZW5kRGV2aWNlRHJvcExpc3QgPSByZXMuZGF0YS5kZXZpY2VEcm9wTWVudTtcclxuICAgICAgICAgICAgdGhhdC5UcmVuZEFyZWFEcm9wTGlzdCA9IHJlcy5kYXRhLmFyZWFEcm9wTWVudTtcclxuICAgICAgICAgICAgdGhhdC5nZXREYXRhQW5kSW5pdENoYXJ0KEFsYXJtU3RhdGlzdGljc01vZHVsZU5hbWUuYXJlYUFsYXJtVHJlbmQsIHJlcy5kYXRhKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIh+aNouiuvuWkh+exu+Wei1xyXG4gICAgcHVibGljIFRyZW5kU3RhdHVzVHlwZShzZWxlY3RlZDogZHJvcEVudW0sIEFyZWFfQWxhcm1fVHJlbmRfTW9kZWw6IGFsbFBhcmFtcykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFyZWFfQWxhcm1fVHJlbmRfTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaKpeitpui2i+WKv+aXtumXtOaOp+S7tlxyXG4gICAgcHVibGljIEFyZWFUcmVuZFRpbWVCdXR0b25DbGljayh2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbTogYWxhcm1UcmFmZmljUmVxRW51bSA9IHRoaXMubWFpbnRhaW5GYWN0b3J5LmdldFRpbWVQYXJhbXModGhpcy5BcmVhX0FsYXJtX1RyZW5kX01vZGVsLCB2YWx1ZSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW0pXHJcbiAgICAgICAgaWYgKHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEFyZWFBbGFybVRyZW5kKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSH5oql6K2m57uf6K6hKFRPUDEwKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PlxyXG5cclxuICAgIC8vIOivt+axguaVsOaNrlxyXG4gICAgcHVibGljIGluaXREZXZpY2VBbGFybVRvcChkYXRhRmlsdGVyUGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0pIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICB0aGlzLm1haW50YWluU2VydmljZS5kZXZlY2VBbGFybVN0YXRpc3RpY3NUb3AoZGF0YUZpbHRlclBhcmFtKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZUFsYXJtU3RhdGlzdGljc1RhYmxlRGF0YSA9IHJlcy5kYXRhLmRldmljZU9iai5BTEw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyZWFBbGFybVRyZW5kVGFibGVEYXRhID0gcmVzLmRhdGEuZGV2aWNlT2JqLkFMTDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYUFsYXJtVHJlbmRUYWJsZURhdGEubGVnZW5kRGF0YSA9IFsn5oql6K2m5Yy65Z+fJywgJ+aKpeitpuaVsCddXHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldmljZUFsYXJtRGF0YSA9IHJlcy5kYXRhLmRldmljZU9iajtcclxuICAgICAgICAgICAgICAgIHRoYXQuYXJlYUFsYXJtRGF0YSA9IHJlcy5kYXRhLmFyZWFPYmo7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRldmljZUFsYXJtRGF0YS5kcm9wTGlzdE1lbnUsICforr7lpIfmiqXorabnu5/orqEnKVxyXG4gICAgICAgICAgICAgICAgdGhhdC5nZXREYXRhQW5kSW5pdENoYXJ0KEFsYXJtU3RhdGlzdGljc01vZHVsZU5hbWUuZGV2aWNlQWxhcm1TdGF0aXN0aWNzLCB0aGF0LmRldmljZUFsYXJtRGF0YVtBbGFybU9iamVjdFR5cGUuQUxMLnZhbHVlXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmiqXoraborr7lpIfnsbvlnovliIfmjaJcclxuICAgIHB1YmxpYyBBbGFybURldmljZURyb3Aoc2VsZWN0ZWQ6IGRyb3BFbnVtKSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuZGV2aWNlQWxhcm1EYXRhW3NlbGVjdGVkLnZhbHVlXTtcclxuICAgICAgICB0aGlzLmdldERhdGFBbmRJbml0Q2hhcnQoQWxhcm1TdGF0aXN0aWNzTW9kdWxlTmFtZS5kZXZpY2VBbGFybVN0YXRpc3RpY3MsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaKpeitpuWMuuWfn+WIh+aNolxyXG4gICAgcHVibGljIEFsYXJtQXJlYURyb3Aoc2VsZWN0ZWQ6IGRyb3BFbnVtKSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuYXJlYUFsYXJtRGF0YVtzZWxlY3RlZC50ZXh0XTtcclxuICAgICAgICB0aGlzLmdldERhdGFBbmRJbml0Q2hhcnQoQWxhcm1TdGF0aXN0aWNzTW9kdWxlTmFtZS5kZXZpY2VBbGFybVN0YXRpc3RpY3MsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaXtumXtOaOp+S7tlxyXG4gICAgcHVibGljIEFsYXJtVGltZUJ1dHRvbkNsaWNrKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtID0gdGhpcy5tYWludGFpbkZhY3RvcnkuZ2V0VGltZVBhcmFtcyh0aGlzLkRldmljZV9BbGFybV9TdGF0aXN0aWNzX01vZGVsLCB2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdERldmljZUFsYXJtVG9wKHBhcmFtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE8g5biD5o6n5bqT5YWz6IGU5oql6K2m57uf6K6hKFRPUDEwKSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PlxyXG4gICAgcHVibGljIGluaXREaXNwYXRjaGVkQWJvdXRBbGFybShkYXRhRmlsdGVyUGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0pIHtcclxuICAgICAgICBkYXRhRmlsdGVyUGFyYW0ucmVzb3VyY2VUeXBlID0gXCJBTExcIjtcclxuICAgICAgICBkYXRhRmlsdGVyUGFyYW0uZ3JvdXBUeXBlID0gXCJCeUxpYlwiO1xyXG5cclxuICAgICAgICB0aGlzLm1haW50YWluU2VydmljZS5kaXNwYXRjaGVkQWJvdXRBbGFybShkYXRhRmlsdGVyUGFyYW0pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlZEFib3V0QWxhcm1UYWJsZURhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlZEFib3V0QWxhcm1UYWJsZURhdGEubGVnZW5kRGF0YS51bnNoaWZ0KFwi5biD5o6n5bqT5ZCN56ewXCIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGFBbmRJbml0Q2hhcnQoQWxhcm1TdGF0aXN0aWNzTW9kdWxlTmFtZS5kaXNwYXRjaGVkQWJvdXRBbGFybSwgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDml7bpl7Tmjqfku7ZcclxuICAgIHB1YmxpYyBEaXNwYXRjaGVkVGltZUJ1dHRvbkNsaWNrKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtID0gdGhpcy5tYWludGFpbkZhY3RvcnkuZ2V0VGltZVBhcmFtcyh0aGlzLkRpc3BhdGNoZWRfQWJvdXRfQWxhcm1fTW9kZWwsIHZhbHVlKTtcclxuICAgICAgICBpZiAocGFyYW0pIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0RGlzcGF0Y2hlZEFib3V0QWxhcm0ocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlvpfliLBlY2hhcnTphY3nva7mlofku7YsIOe7mOWItuWbvuihqFxyXG4gICAgcHJpdmF0ZSBnZXREYXRhQW5kSW5pdENoYXJ0KGNoYXJ0TmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgY2hhcnRDb25maWc6IGFueSA9IHRoaXMuc2V0RGF0YShjaGFydE5hbWUsIGRhdGEpO1xyXG4gICAgICAgIGlmIChjaGFydENvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5pbml0Q2hhcnQoY2hhcnRDb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0SW1hZ2UoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmV4cG9ydEltYWdlKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRFeGNlbChtb2R1bGU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZXhwb3J0RXhjZWwobW9kdWxlLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYWxhcm1TdGF0aXN0aWNzQ29udHJvbGxlclwiLCBhbGFybVN0YXRpc3RpY3NDb250cm9sbGVyKTsiXX0=
