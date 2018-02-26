var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../../../common/app/main.app", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "../../../common/factory/dataSelect.factory", "../../main/maintainFactory", "css!module/maintain/css/trafficStatistics.css", "../../main/maintainFactory", "moment"], function (require, exports, main_app_1, ChartOptions, maintainEnum_1, dataSelect_factory_1, maintainFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var allParams = (function (_super) {
        __extends(allParams, _super);
        function allParams(moduleName) {
            var _this = _super.call(this) || this;
            _this.AreaName = "ALL";
            _this.DeviceName = "ALL";
            _this.module = moduleName;
            return _this;
        }
        return allParams;
    }(dataSelect_factory_1.dataSelectResult));
    exports.allParams = allParams;
    var trafficStatisticsController = (function () {
        function trafficStatisticsController($scope, maintainFactory, dataSelectServer, maintainService) {
            var _this = this;
            this.$scope = $scope;
            this.maintainFactory = maintainFactory;
            this.dataSelectServer = dataSelectServer;
            this.maintainService = maintainService;
            this.areaTrafficStatisticsList = true;
            this.areaTrafficTrendList = true;
            this.deviceTrafficStatisticsList = true;
            this.superData = new maintainEnum_1.FlowSuperData();
            this.pageType = "flow";
            this.TrendDeviceDropList = [];
            this.TrendAreaDropList = [];
            this.defaultDropListType = maintainEnum_1.AlarmObjectType.ALL.text;
            this.dataFilterParam = new maintainEnum_1.alarmTrafficReqEnum();
            this.timeItem = angular.copy(maintainEnum_1.SelectData);
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
            this.Area_Traffic_Model = new allParams(this.ModuleNameArr.areaTrafficStatistics);
            this.Area_Traffic_Trend_Model = new allParams(this.ModuleNameArr.areaTrafficTrend);
            this.Device_Traffic_Model = new allParams(this.ModuleNameArr.deviceTrafficStatistics);
            this.deviceTrafficData = [];
            this.areaTrafficData = [];
            this.TrafficDeviceDropDefault = maintainEnum_1.AlarmObjectType.ALL.text;
            this.TrafficAreaDropDefault = maintainEnum_1.AlarmObjectType.ALL.text;
            this.echartNameArr = angular.copy(maintainEnum_1.echartNameArr);
            this.DropListMore = [];
            this.init();
            $scope.$on('initChart', function (evt, opt) {
                _this.init();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        trafficStatisticsController.prototype.init = function (dataFilterParam) {
            var that = this;
            var arr = ["areaTrafficStatistics", "areaTrafficTrend", "deviceTrafficStatistics"];
            that.superData = new maintainEnum_1.FlowSuperData();
            if (!dataFilterParam) {
                dataFilterParam = {
                    beginDate: "",
                    endDate: moment().format("YYYY-MM-DD hh:mm:ss"),
                    resourceType: "ALL",
                    timeType: "Month",
                };
            }
            this.initAreaTrafficStatictis(dataFilterParam);
            this.initAreaTrafficTrend(dataFilterParam);
            this.initDeviceTrafficTop(dataFilterParam);
        };
        trafficStatisticsController.prototype.initChart = function (dataFilterParam, module) {
            var _this = this;
            this.maintainFactory.AlarmTrafficStatistics(dataFilterParam).then(function (res) {
                _this.getDataAndInitChart(module, _this.superData[module]);
            });
        };
        trafficStatisticsController.prototype.deviceStatusType = function (selected) {
            var superData = angular.copy(this.superData);
            superData.deviceTrafficStatistics = this.singleDeviceTop10(this.deviceTrafficData, selected.value);
            this.maintainFactory.initChart(this.setData('deviceTrafficStatistics', superData['deviceTrafficStatistics']));
        };
        trafficStatisticsController.prototype.allDataMap = function (data, module) {
            if (module === void 0) { module = "ALL"; }
            var superData = angular.copy(this.superData);
            if (data) {
                this.deviceTrafficData = angular.copy(data.deviceTrafficStatistics);
                superData.deviceTrafficStatistics = this.singleDeviceTop10(data.deviceTrafficStatistics, module);
                Object.keys(data).forEach(function (key) {
                    if (data[key] && data[key].seriesData && key != "dropListArea" && key != "dropListType") {
                        superData[key] = data[key];
                    }
                });
                return superData;
            }
        };
        trafficStatisticsController.prototype.singleDeviceTop10 = function (obj, type) {
            var result = {};
            Object.keys(obj).forEach(function (key) {
                if (key == type) {
                    result = obj[key];
                }
            });
            return result;
        };
        trafficStatisticsController.areaTrafficStatistics = function (data) {
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
        trafficStatisticsController.areaTrafficTrend = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var legendData = data.legendData;
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
            option.yAxis.min = 0;
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
        trafficStatisticsController.deviceTrafficStatistics = function (data) {
            if (!data) {
                return false;
            }
            var option = new ChartOptions.EChartOption();
            var seriesData = data.seriesData;
            var yData = data.yData;
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.tooltip.axisPointer = new ChartOptions.axisPointer();
            option.tooltip.axisPointer.type = "line";
            option.color = ["#53c68c"];
            option.grid = new ChartOptions.grid();
            option.grid.top = 50;
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
        trafficStatisticsController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            switch (name) {
                case 'areaTrafficStatistics': {
                    option.config = trafficStatisticsController.areaTrafficStatistics(data);
                    return option;
                }
                case 'areaTrafficTrend': {
                    option.config = trafficStatisticsController.areaTrafficTrend(data);
                    return option;
                }
                case 'deviceTrafficStatistics': {
                    option.config = trafficStatisticsController.deviceTrafficStatistics(data);
                    return option;
                }
            }
        };
        trafficStatisticsController.prototype.trafficSwitch = function (switchString) {
            var that = this;
            switch (switchString) {
                case 'areaTrafficHistogram': {
                    that.areaTrafficStatisticsList = true;
                    break;
                }
                case 'areaTrafficList': {
                    that.areaTrafficStatisticsList = false;
                    break;
                }
                case 'areaTrafficTrendHistogram': {
                    that.areaTrafficTrendList = true;
                    break;
                }
                case 'areaTrendList': {
                    that.areaTrafficTrendList = false;
                    break;
                }
                case 'trafficStatisticsHistogram': {
                    that.deviceTrafficStatisticsList = true;
                    break;
                }
                case 'trafficStatisticsList': {
                    that.deviceTrafficStatisticsList = false;
                    break;
                }
            }
        };
        trafficStatisticsController.prototype.initAreaTrafficStatictis = function (dataFilterParam) {
            var that = this;
            that.maintainService.areaTrafficStatistics(dataFilterParam).then(function (res) {
                that.areaTrafficStatisticsTableList = angular.copy(res.data);
                that.areaTrafficStatisticsTableList.legendData.unshift('行政区域');
                that.getDataAndInitChart(maintainEnum_1.TrafficStatisticsModuleName.areaTrafficStatistics, res.data);
            });
        };
        trafficStatisticsController.prototype.TrafficTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Area_Traffic_Model, value);
            if (param) {
                this.initAreaTrafficStatictis(param);
            }
        };
        trafficStatisticsController.prototype.initAreaTrafficTrend = function (dataFilterParam) {
            var that = this;
            that.maintainService.trafficStatisticsModule(dataFilterParam).then(function (res) {
                that.TrendDeviceDropList = res.data.deviceDropMenu;
                that.TrendAreaDropList = res.data.areaDropMenu;
                that.DropListMore.push(that.TrendAreaDropList[0].text);
                that.areaTrafficTrendTableList = res.data;
                that.areaTrafficTrendTableList.legendData = ["日期"];
                that.areaTrafficTrendTableList.areaDropMenu.forEach(function (area) {
                    that.areaTrafficTrendTableList.legendData.push(area.text);
                });
                that.getDataAndInitChart(maintainEnum_1.TrafficStatisticsModuleName.areaTrafficTrend, res.data);
            });
        };
        trafficStatisticsController.prototype.TrendStatusType = function (selected) {
            console.log(selected);
            console.log(this.Area_Traffic_Trend_Model);
        };
        trafficStatisticsController.prototype.TrendStatusArea = function (selected) {
            console.log(this.TrendAreaDropList);
            console.log(this.Area_Traffic_Trend_Model);
            console.log(selected);
            console.log(this.DropListMore);
        };
        trafficStatisticsController.prototype.AreaTrafficTrendTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Area_Traffic_Trend_Model, value);
            if (param) {
                this.initAreaTrafficTrend(param);
            }
        };
        trafficStatisticsController.prototype.initDeviceTrafficTop = function (dataFilterParam) {
            var that = this;
            that.maintainService.deveceTrafficStatisticsTop(dataFilterParam).then(function (res) {
                that.deviceTrafficData = res.data.deviceObj;
                that.areaTrafficData = res.data.areaObj;
                that.deviceTrafficStatisticsTableList = that.deviceTrafficData[maintainEnum_1.AlarmObjectType.ALL.value];
                that.deviceTrafficStatisticsTableList.legendData = ['报警设备', '流量数'];
                that.getDataAndInitChart(maintainEnum_1.TrafficStatisticsModuleName.deviceTrafficStatistics, that.deviceTrafficData[maintainEnum_1.AlarmObjectType.ALL.value]);
            });
        };
        trafficStatisticsController.prototype.TrafficDeviceDrop = function (selected) {
            var data = this.deviceTrafficData[selected.value];
            this.getDataAndInitChart(maintainEnum_1.TrafficStatisticsModuleName.deviceTrafficStatistics, data);
        };
        trafficStatisticsController.prototype.TrafficAreaDrop = function (selected) {
            var data = this.areaTrafficData[selected.text];
            this.getDataAndInitChart(maintainEnum_1.TrafficStatisticsModuleName.deviceTrafficStatistics, data);
        };
        trafficStatisticsController.prototype.getDataAndInitChart = function (chartName, data) {
            var chartConfig = this.setData(chartName, data);
            if (chartConfig) {
                this.maintainFactory.initChart(chartConfig);
            }
        };
        trafficStatisticsController.prototype.DeviceTrafficTimeButtonClick = function (value) {
            var param = this.maintainFactory.getTimeParams(this.Device_Traffic_Model, value);
            if (param) {
                this.initDeviceTrafficTop(param);
            }
        };
        trafficStatisticsController.prototype.exportImage = function (id) {
            this.maintainFactory.exportImage(id);
        };
        trafficStatisticsController.prototype.exportExcel = function (module, data) {
            this.maintainFactory.exportExcel(module, data);
        };
        trafficStatisticsController.$inject = ["$scope", "maintainFactory", "dataSelectServer", "maintainService"];
        return trafficStatisticsController;
    }());
    main_app_1.app.controller("trafficStatisticsController", trafficStatisticsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3RyYWZmaWNTdGF0aXN0aWNzL3RyYWZmaWNTdGF0aXN0aWNzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQXVCQTtRQUErQiw2QkFBZ0I7UUFJM0MsbUJBQVksVUFBa0I7WUFBOUIsWUFDSSxpQkFBTyxTQUVWO1lBTkQsY0FBUSxHQUFXLEtBQUssQ0FBQztZQUN6QixnQkFBVSxHQUFXLEtBQUssQ0FBQztZQUl2QixLQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTs7UUFDNUIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FSQSxBQVFDLENBUjhCLHFDQUFnQixHQVE5QztJQVJZLDhCQUFTO0lBVXRCO1FBeUNJLHFDQUNZLE1BQVcsRUFDWCxlQUErQixFQUMvQixnQkFBa0MsRUFDbEMsZUFBaUM7WUFKN0MsaUJBZUM7WUFkVyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsb0JBQWUsR0FBZixlQUFlLENBQWdCO1lBQy9CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBekM3Qyw4QkFBeUIsR0FBWSxJQUFJLENBQUM7WUFDMUMseUJBQW9CLEdBQVksSUFBSSxDQUFDO1lBQ3JDLGdDQUEyQixHQUFZLElBQUksQ0FBQztZQUU1QyxjQUFTLEdBQVEsSUFBSSw0QkFBYSxFQUFFLENBQUM7WUFDckMsYUFBUSxHQUFXLE1BQU0sQ0FBQztZQUcxQix3QkFBbUIsR0FBb0IsRUFBRSxDQUFDO1lBQzFDLHNCQUFpQixHQUFvQixFQUFFLENBQUM7WUFDeEMsd0JBQW1CLEdBQVcsOEJBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBR3ZELG9CQUFlLEdBQXdCLElBQUksa0NBQW1CLEVBQUUsQ0FBQztZQUdqRSxhQUFRLEdBQTBCLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQVUsQ0FBQyxDQUFDO1lB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QUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUluRCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxD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LEdBQW5DLFVBQW9DLEtBQWM7WUFDOUMsSUFBSSxLQUFLLEdBQXdCLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxDQUFDO1FBQ0wsQ0FBQztRQUVNLGlEQUFXLEdBQWxCLFVBQW1CLEVBQVU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUVNLGlEQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxJQUFTO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBNWNNLG1DQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQTZjMUYsa0NBQUM7S0EvY0QsQUErY0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3RyYWZmaWNTdGF0aXN0aWNzL3RyYWZmaWNTdGF0aXN0aWNzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhbW9kdWxlL21haW50YWluL2Nzcy90cmFmZmljU3RhdGlzdGljcy5jc3NcIjtcclxuaW1wb3J0IFwiLi4vLi4vbWFpbi9tYWludGFpbkZhY3RvcnlcIjtcclxuaW1wb3J0ICogYXMgQ2hhcnRPcHRpb25zIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZW51bS9FY2hhcnRDb25maWdcIjtcclxuLy8gSUVjaGFydEZhY3RvcnlcclxuaW1wb3J0IHtcclxuICAgIGRyb3BFbnVtLFxyXG4gICAgYWxhcm1UcmFmZmljUmVxRW51bSxcclxuICAgIHNlbGVjdERhdGFFbnVtLFxyXG4gICAgU2VsZWN0RGF0YSxcclxuICAgIGludGVsbGlnZW50QW5hbHlzaXNEYXRhRW51bSxcclxuICAgIGludGVsbGlnZW50QW5hbHlzaXNEYXRhLFxyXG4gICAgRmxvd1N1cGVyRGF0YSxcclxuICAgIFRyYWZmaWNTdGF0aXN0aWNzTW9kdWxlTmFtZSxcclxuICAgIEFsYXJtT2JqZWN0VHlwZSxcclxuICAgIGVjaGFydE5hbWVBcnJcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvbWFpbnRhaW5FbnVtXCI7XHJcbmltcG9ydCB7IGRhdGFTZWxlY3RTZXJ2ZXIsIGRhdGFTZWxlY3RSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGF0YVNlbGVjdC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIm1vbWVudFwiXHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ2hhcnRPcHRpb25PYmplY3QsIElFY2hhcnRGYWN0b3J5IH0gZnJvbSBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSwgbW9tZW50OiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgYWxsUGFyYW1zIGV4dGVuZHMgZGF0YVNlbGVjdFJlc3VsdCB7XHJcbiAgICBBcmVhTmFtZTogc3RyaW5nID0gXCJBTExcIjsgLy8g5Zyw5Yy65ZCN56ewXHJcbiAgICBEZXZpY2VOYW1lOiBzdHJpbmcgPSBcIkFMTFwiOy8vIOiuvuWkh+WQjeensFxyXG4gICAgbW9kdWxlOiBzdHJpbmc7Ly8g5Zu+6KGo5ZCN56ewXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlTmFtZVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyB0cmFmZmljU3RhdGlzdGljc0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwibWFpbnRhaW5GYWN0b3J5XCIsIFwiZGF0YVNlbGVjdFNlcnZlclwiLCBcIm1haW50YWluU2VydmljZVwiXTtcclxuICAgIC8vIOWIh+aNouaMiemSrlxyXG4gICAgYXJlYVRyYWZmaWNTdGF0aXN0aWNzTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBhcmVhVHJhZmZpY1RyZW5kTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBkZXZpY2VUcmFmZmljU3RhdGlzdGljc0xpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgLy8g6I635Y+W5ZCO56uv5L+h5oGvXHJcbiAgICBzdXBlckRhdGE6IGFueSA9IG5ldyBGbG93U3VwZXJEYXRhKCk7XHJcbiAgICBwYWdlVHlwZTogc3RyaW5nID0gXCJmbG93XCI7XHJcblxyXG4gICAgLy8g5LiL5ouJ6I+c5Y2VXHJcbiAgICBUcmVuZERldmljZURyb3BMaXN0OiBBcnJheTxkcm9wRW51bT4gPSBbXTtcclxuICAgIFRyZW5kQXJlYURyb3BMaXN0OiBBcnJheTxkcm9wRW51bT4gPSBbXTtcclxuICAgIGRlZmF1bHREcm9wTGlzdFR5cGU6IHN0cmluZyA9IEFsYXJtT2JqZWN0VHlwZS5BTEwudGV4dDtcclxuXHJcbiAgICAvLyDor7fmsYLlj4LmlbBcclxuICAgIGRhdGFGaWx0ZXJQYXJhbTogYWxhcm1UcmFmZmljUmVxRW51bSA9IG5ldyBhbGFybVRyYWZmaWNSZXFFbnVtKCk7XHJcblxyXG4gICAgLy8g5pe26Ze05o6n5Lu2XHJcbiAgICB0aW1lSXRlbTogQXJyYXk8c2VsZWN0RGF0YUVudW0+ID0gYW5ndWxhci5jb3B5KFNlbGVjdERhdGEpO1xyXG4gICAgTW9kdWxlTmFtZUFycjogaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtID0gYW5ndWxhci5jb3B5KGludGVsbGlnZW50QW5hbHlzaXNEYXRhKTtcclxuICAgIEFyZWFfVHJhZmZpY19Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuYXJlYVRyYWZmaWNTdGF0aXN0aWNzKTtcclxuICAgIEFyZWFfVHJhZmZpY19UcmVuZF9Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuYXJlYVRyYWZmaWNUcmVuZCk7XHJcbiAgICBEZXZpY2VfVHJhZmZpY19Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MpO1xyXG5cclxuICAgIC8vIOiuvuWkh+ebuOWFs1xyXG4gICAgZGV2aWNlVHJhZmZpY0RhdGE6IGFueSA9IFtdOyAvL+iuvuWkh+WIh+aNouaVsOaNrlxyXG4gICAgYXJlYVRyYWZmaWNEYXRhOiBhbnkgPSBbXTsgLy/lnLDljLrliIfmjaLmlbDmja5cclxuICAgIFRyYWZmaWNEZXZpY2VEcm9wRGVmYXVsdDogc3RyaW5nID0gQWxhcm1PYmplY3RUeXBlLkFMTC50ZXh0O1xyXG4gICAgVHJhZmZpY0FyZWFEcm9wRGVmYXVsdDogc3RyaW5nID0gQWxhcm1PYmplY3RUeXBlLkFMTC50ZXh0O1xyXG5cclxuICAgIGVjaGFydE5hbWVBcnI6IGFueSA9IGFuZ3VsYXIuY29weShlY2hhcnROYW1lQXJyKTtcclxuXHJcbiAgICBEcm9wTGlzdE1vcmU6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAvL+inhuWbvuWIl+ihqFxyXG4gICAgYXJlYVRyYWZmaWNTdGF0aXN0aWNzVGFibGVMaXN0OiBhbnk7XHJcbiAgICBhcmVhVHJhZmZpY1RyZW5kVGFibGVMaXN0OiBhbnk7XHJcbiAgICBkZXZpY2VUcmFmZmljU3RhdGlzdGljc1RhYmxlTGlzdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpbkZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlcixcclxuICAgICAgICBwcml2YXRlIG1haW50YWluU2VydmljZTogSU1haW50YWluU2VydmljZVxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgICRzY29wZS4kb24oJ2luaXRDaGFydCcsIChldnQ6IGFueSwgb3B0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KClcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZGVzdHJveUNoYXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMlua1gemHj+e7n+iuoeWbvuihqFxyXG4gICAgcHJpdmF0ZSBpbml0KGRhdGFGaWx0ZXJQYXJhbT86IGFsYXJtVHJhZmZpY1JlcUVudW0pIHtcclxuICAgICAgICBsZXQgdGhhdDogdHJhZmZpY1N0YXRpc3RpY3NDb250cm9sbGVyID0gdGhpcztcclxuICAgICAgICBsZXQgYXJyID0gW1wiYXJlYVRyYWZmaWNTdGF0aXN0aWNzXCIsIFwiYXJlYVRyYWZmaWNUcmVuZFwiLCBcImRldmljZVRyYWZmaWNTdGF0aXN0aWNzXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgLy8g5pWw5o2u5pW05ZCIXHJcbiAgICAgICAgdGhhdC5zdXBlckRhdGEgPSBuZXcgRmxvd1N1cGVyRGF0YSgpO1xyXG5cclxuICAgICAgICBpZiAoIWRhdGFGaWx0ZXJQYXJhbSkge1xyXG4gICAgICAgICAgICBkYXRhRmlsdGVyUGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICBiZWdpbkRhdGU6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlOiBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpLFxyXG4gICAgICAgICAgICAgICAgcmVzb3VyY2VUeXBlOiBcIkFMTFwiLFxyXG4gICAgICAgICAgICAgICAgdGltZVR5cGU6IFwiTW9udGhcIixcclxuICAgICAgICAgICAgfSBhcyBhbGFybVRyYWZmaWNSZXFFbnVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJlYVRyYWZmaWNTdGF0aWN0aXMoZGF0YUZpbHRlclBhcmFtKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0QXJlYVRyYWZmaWNUcmVuZChkYXRhRmlsdGVyUGFyYW0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXREZXZpY2VUcmFmZmljVG9wKGRhdGFGaWx0ZXJQYXJhbSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluWNleS4quWbvuihqFxyXG4gICAgcHVibGljIGluaXRDaGFydChkYXRhRmlsdGVyUGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0sIG1vZHVsZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuQWxhcm1UcmFmZmljU3RhdGlzdGljcyhkYXRhRmlsdGVyUGFyYW0pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0RGF0YUFuZEluaXRDaGFydChtb2R1bGUsIHRoaXMuc3VwZXJEYXRhW21vZHVsZV0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDorr7lpIfliIfmjaLnsbvlnotcclxuICAgIHB1YmxpYyBkZXZpY2VTdGF0dXNUeXBlKHNlbGVjdGVkOiBhbnkpIHtcclxuICAgICAgICBsZXQgc3VwZXJEYXRhOiBhbnkgPSBhbmd1bGFyLmNvcHkodGhpcy5zdXBlckRhdGEpO1xyXG4gICAgICAgIHN1cGVyRGF0YS5kZXZpY2VUcmFmZmljU3RhdGlzdGljcyA9IHRoaXMuc2luZ2xlRGV2aWNlVG9wMTAodGhpcy5kZXZpY2VUcmFmZmljRGF0YSwgc2VsZWN0ZWQudmFsdWUpO1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoJ2RldmljZVRyYWZmaWNTdGF0aXN0aWNzJywgc3VwZXJEYXRhWydkZXZpY2VUcmFmZmljU3RhdGlzdGljcyddKSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDliIfmjaLorr7lpIflm77ooajnsbvlnotcclxuICAgIHByaXZhdGUgYWxsRGF0YU1hcChkYXRhOiBhbnksIG1vZHVsZTogc3RyaW5nID0gXCJBTExcIikge1xyXG4gICAgICAgIGxldCBzdXBlckRhdGE6IGFueSA9IGFuZ3VsYXIuY29weSh0aGlzLnN1cGVyRGF0YSk7XHJcbiAgICAgICAgLy8g5omA5pyJ6K6+5aSH5YmNMTBcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmRldmljZVRyYWZmaWNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MpO1xyXG4gICAgICAgICAgICBzdXBlckRhdGEuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MgPSB0aGlzLnNpbmdsZURldmljZVRvcDEwKGRhdGEuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MsIG1vZHVsZSk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XSAmJiBkYXRhW2tleV0uc2VyaWVzRGF0YSAmJiBrZXkgIT0gXCJkcm9wTGlzdEFyZWFcIiAmJiBrZXkgIT0gXCJkcm9wTGlzdFR5cGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyRGF0YVtrZXldID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VwZXJEYXRhXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOi/lOWbnuWNleS4quiuvuWkh+aOkuWQjeWJjeWNgeeahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBzaW5nbGVEZXZpY2VUb3AxMChvYmo6IGFueSwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogYW55ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICAvLyDljLrln5/mtYHph4/nu5/orqFcclxuICAgIHByaXZhdGUgc3RhdGljIGFyZWFUcmFmZmljU3RhdGlzdGljcyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBkYXRhLnNlcmllc0RhdGEgYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IGRhdGEueERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IGRhdGEubGVnZW5kRGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzZjOGNlNFwiLCBcIiM3Y2NjZjJcIiwgXCIjZGNiZTk5XCJdO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIxMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCI7XHJcblxyXG4gICAgICAgIC8vZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gNTA7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQuYm90dG9tID0gMjA7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMzU7XHJcblxyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImluc2lkZVJpZ2h0XCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICAvLyDljLrln5/mtYHph4/otovlir9cclxuICAgIHByaXZhdGUgc3RhdGljIGFyZWFUcmFmZmljVHJlbmQoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBkYXRhLnhEYXRhIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBkYXRhLmxlZ2VuZERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vdG9vbHRvcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiYXhpc1wiO1xyXG5cclxuICAgICAgICAvLyBjb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM3Q0NDRjJcIl07XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmJvdW5kYXJ5R2FwID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG5cclxuICAgICAgICAvLyBncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA1MDtcclxuICAgICAgICBvcHRpb24uZ3JpZC5ib3R0b20gPSAyMDtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLm1pbiA9IDBcclxuICAgICAgICAvLyBvcHRpb24ueUF4aXMubWF4ID0gNDAwMDBcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgbGV0IGFyZWFDb2xvcjogYW55ID0gXCIxMjQsMjA0LDI0MlwiO1xyXG4gICAgICAgIGxldCBhcmVhU3R5bGVDb2xvcjogYW55ID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGVDb2xvcihhcmVhQ29sb3IpO1xyXG4gICAgICAgIHNlcmllc0QuYXJlYVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLk9iamVjdE5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc0QuYXJlYVN0eWxlLm5vcm1hbCA9IGFyZWFTdHlsZUNvbG9yLmdldENvbG9yKCk7XHJcblxyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbMF07XHJcbiAgICAgICAgLy8gc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YTtcclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvuWkh+a1gemHj+e7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhO1xyXG4gICAgICAgIGxldCB5RGF0YSA9IGRhdGEueURhdGE7XHJcblxyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiYXhpc1wiO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzUG9pbnRlcigpO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyLnR5cGUgPSBcImxpbmVcIjtcclxuICAgICAgICAvLyBvcHRpb24udG9vbHRpcC5heGlzUG9pbnRlci50eXBlID0gXCJjcm9zc1wiO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzUzYzY4Y1wiXTtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA1MDtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYm91bmRhcnlHYXAgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLmRhdGEgPSB5RGF0YTtcclxuXHJcbiAgICAgICAgLy9zZXJpZXNcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgLy8gc2VyaWVzRC5uYW1lID0geURhdGFbaV07XHJcbiAgICAgICAgc2VyaWVzRC50eXBlID0gJ2Jhcic7XHJcbiAgICAgICAgc2VyaWVzRC5zdGFjayA9ICfmgLvph48nO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDE1O1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5pdGVtU3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbC5iYXJCb3JkZXJSYWRpdXMgPSBbMCwgMjAsIDIwLCAwXTtcclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kO1xyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEobmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogYW55ID0gQ2hhcnRPcHRpb25PYmplY3QobmFtZSk7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FyZWFUcmFmZmljU3RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0cmFmZmljU3RhdGlzdGljc0NvbnRyb2xsZXIuYXJlYVRyYWZmaWNTdGF0aXN0aWNzKGRhdGEpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYXJlYVRyYWZmaWNUcmVuZCc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0cmFmZmljU3RhdGlzdGljc0NvbnRyb2xsZXIuYXJlYVRyYWZmaWNUcmVuZChkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2RldmljZVRyYWZmaWNTdGF0aXN0aWNzJzoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbmZpZyA9IHRyYWZmaWNTdGF0aXN0aWNzQ29udHJvbGxlci5kZXZpY2VUcmFmZmljU3RhdGlzdGljcyhkYXRhKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0cmFmZmljU3dpdGNoKHN3aXRjaFN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IHRyYWZmaWNTdGF0aXN0aWNzQ29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgc3dpdGNoIChzd2l0Y2hTdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXJlYVRyYWZmaWNIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFUcmFmZmljU3RhdGlzdGljc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYXJlYVRyYWZmaWNMaXN0Jzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1N0YXRpc3RpY3NMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhcmVhVHJhZmZpY1RyZW5kSGlzdG9ncmFtJzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1RyZW5kTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhcmVhVHJlbmRMaXN0Jzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1RyZW5kTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAndHJhZmZpY1N0YXRpc3RpY3NIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldmljZVRyYWZmaWNTdGF0aXN0aWNzTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd0cmFmZmljU3RhdGlzdGljc0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRldmljZVRyYWZmaWNTdGF0aXN0aWNzTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yy65Z+f5rWB6YeP57uf6K6hID09PT09PT09PT09PT09PT09PT09PT09PT5cclxuICAgIHByaXZhdGUgaW5pdEFyZWFUcmFmZmljU3RhdGljdGlzKGRhdGFGaWx0ZXJQYXJhbTogYW55KSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IHRyYWZmaWNTdGF0aXN0aWNzQ29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5tYWludGFpblNlcnZpY2UuYXJlYVRyYWZmaWNTdGF0aXN0aWNzKGRhdGFGaWx0ZXJQYXJhbSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1N0YXRpc3RpY3NUYWJsZUxpc3QgPSBhbmd1bGFyLmNvcHkocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0LmFyZWFUcmFmZmljU3RhdGlzdGljc1RhYmxlTGlzdC5sZWdlbmREYXRhLnVuc2hpZnQoJ+ihjOaUv+WMuuWfnycpO1xyXG4gICAgICAgICAgICB0aGF0LmdldERhdGFBbmRJbml0Q2hhcnQoVHJhZmZpY1N0YXRpc3RpY3NNb2R1bGVOYW1lLmFyZWFUcmFmZmljU3RhdGlzdGljcywgcmVzLmRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaXtumXtOaOp+S7tlxyXG4gICAgcHVibGljIFRyYWZmaWNUaW1lQnV0dG9uQ2xpY2sodmFsdWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0gPSB0aGlzLm1haW50YWluRmFjdG9yeS5nZXRUaW1lUGFyYW1zKHRoaXMuQXJlYV9UcmFmZmljX01vZGVsLCB2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEFyZWFUcmFmZmljU3RhdGljdGlzKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yy65Z+f5rWB6YeP6LaL5Yq/ID09PT09PT09PT09PT09PT09PT09PT09PT0+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj5cclxuICAgIHByaXZhdGUgaW5pdEFyZWFUcmFmZmljVHJlbmQoZGF0YUZpbHRlclBhcmFtPzogYWxhcm1UcmFmZmljUmVxRW51bSkge1xyXG4gICAgICAgIGxldCB0aGF0OiB0cmFmZmljU3RhdGlzdGljc0NvbnRyb2xsZXIgPSB0aGlzO1xyXG4gICAgICAgIHRoYXQubWFpbnRhaW5TZXJ2aWNlLnRyYWZmaWNTdGF0aXN0aWNzTW9kdWxlKGRhdGFGaWx0ZXJQYXJhbSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhhdC5UcmVuZERldmljZURyb3BMaXN0ID0gcmVzLmRhdGEuZGV2aWNlRHJvcE1lbnU7XHJcbiAgICAgICAgICAgIHRoYXQuVHJlbmRBcmVhRHJvcExpc3QgPSByZXMuZGF0YS5hcmVhRHJvcE1lbnU7XHJcbiAgICAgICAgICAgIHRoYXQuRHJvcExpc3RNb3JlLnB1c2godGhhdC5UcmVuZEFyZWFEcm9wTGlzdFswXS50ZXh0KTtcclxuICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1RyZW5kVGFibGVMaXN0ID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIHRoYXQuYXJlYVRyYWZmaWNUcmVuZFRhYmxlTGlzdC5sZWdlbmREYXRhID0gW1wi5pel5pyfXCJdO1xyXG4gICAgICAgICAgICB0aGF0LmFyZWFUcmFmZmljVHJlbmRUYWJsZUxpc3QuYXJlYURyb3BNZW51LmZvckVhY2goKGFyZWE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hcmVhVHJhZmZpY1RyZW5kVGFibGVMaXN0LmxlZ2VuZERhdGEucHVzaChhcmVhLnRleHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhhdC5nZXREYXRhQW5kSW5pdENoYXJ0KFRyYWZmaWNTdGF0aXN0aWNzTW9kdWxlTmFtZS5hcmVhVHJhZmZpY1RyZW5kLCByZXMuZGF0YSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YiH5o2i6K6+5aSH57G75Z6LXHJcbiAgICBwdWJsaWMgVHJlbmRTdGF0dXNUeXBlKHNlbGVjdGVkOiBkcm9wRW51bSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLkFyZWFfVHJhZmZpY19UcmVuZF9Nb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRyZW5kU3RhdHVzQXJlYShzZWxlY3RlZDogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuVHJlbmRBcmVhRHJvcExpc3QpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5BcmVhX1RyYWZmaWNfVHJlbmRfTW9kZWwpXHJcbiAgICAgICAgY29uc29sZS5sb2coc2VsZWN0ZWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuRHJvcExpc3RNb3JlKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDml7bpl7Tmjqfku7ZcclxuICAgIHB1YmxpYyBBcmVhVHJhZmZpY1RyZW5kVGltZUJ1dHRvbkNsaWNrKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtID0gdGhpcy5tYWludGFpbkZhY3RvcnkuZ2V0VGltZVBhcmFtcyh0aGlzLkFyZWFfVHJhZmZpY19UcmVuZF9Nb2RlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXRBcmVhVHJhZmZpY1RyZW5kKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSH5rWB6YePVE9QMTAgID09PT09PT09PT09PT09PT09PT09PT09PT5cclxuICAgIHByaXZhdGUgaW5pdERldmljZVRyYWZmaWNUb3AoZGF0YUZpbHRlclBhcmFtPzogYWxhcm1UcmFmZmljUmVxRW51bSkge1xyXG4gICAgICAgIGxldCB0aGF0OiB0cmFmZmljU3RhdGlzdGljc0NvbnRyb2xsZXIgPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGF0Lm1haW50YWluU2VydmljZS5kZXZlY2VUcmFmZmljU3RhdGlzdGljc1RvcChkYXRhRmlsdGVyUGFyYW0pLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuZGV2aWNlVHJhZmZpY0RhdGEgPSByZXMuZGF0YS5kZXZpY2VPYmo7XHJcbiAgICAgICAgICAgIHRoYXQuYXJlYVRyYWZmaWNEYXRhID0gcmVzLmRhdGEuYXJlYU9iajtcclxuICAgICAgICAgICAgdGhhdC5kZXZpY2VUcmFmZmljU3RhdGlzdGljc1RhYmxlTGlzdCA9IHRoYXQuZGV2aWNlVHJhZmZpY0RhdGFbQWxhcm1PYmplY3RUeXBlLkFMTC52YWx1ZV07XHJcbiAgICAgICAgICAgIHRoYXQuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3NUYWJsZUxpc3QubGVnZW5kRGF0YSA9IFsn5oql6K2m6K6+5aSHJywgJ+a1gemHj+aVsCddO1xyXG4gICAgICAgICAgICB0aGF0LmdldERhdGFBbmRJbml0Q2hhcnQoVHJhZmZpY1N0YXRpc3RpY3NNb2R1bGVOYW1lLmRldmljZVRyYWZmaWNTdGF0aXN0aWNzLCB0aGF0LmRldmljZVRyYWZmaWNEYXRhW0FsYXJtT2JqZWN0VHlwZS5BTEwudmFsdWVdKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaKpeitpuiuvuWkh+exu+Wei+WIh+aNolxyXG4gICAgcHVibGljIFRyYWZmaWNEZXZpY2VEcm9wKHNlbGVjdGVkOiBkcm9wRW51bSkge1xyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSB0aGlzLmRldmljZVRyYWZmaWNEYXRhW3NlbGVjdGVkLnZhbHVlXTtcclxuICAgICAgICB0aGlzLmdldERhdGFBbmRJbml0Q2hhcnQoVHJhZmZpY1N0YXRpc3RpY3NNb2R1bGVOYW1lLmRldmljZVRyYWZmaWNTdGF0aXN0aWNzLCBkYXRhKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmiqXorabljLrln5/liIfmjaJcclxuICAgIHB1YmxpYyBUcmFmZmljQXJlYURyb3Aoc2VsZWN0ZWQ6IGRyb3BFbnVtKSB7XHJcbiAgICAgICAgbGV0IGRhdGE6IGFueSA9IHRoaXMuYXJlYVRyYWZmaWNEYXRhW3NlbGVjdGVkLnRleHRdO1xyXG4gICAgICAgIHRoaXMuZ2V0RGF0YUFuZEluaXRDaGFydChUcmFmZmljU3RhdGlzdGljc01vZHVsZU5hbWUuZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGF0YUFuZEluaXRDaGFydChjaGFydE5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IGNoYXJ0Q29uZmlnOiBhbnkgPSB0aGlzLnNldERhdGEoY2hhcnROYW1lLCBkYXRhKTtcclxuICAgICAgICBpZiAoY2hhcnRDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuaW5pdENoYXJ0KGNoYXJ0Q29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pe26Ze05o6n5Lu2XHJcbiAgICBwdWJsaWMgRGV2aWNlVHJhZmZpY1RpbWVCdXR0b25DbGljayh2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbTogYWxhcm1UcmFmZmljUmVxRW51bSA9IHRoaXMubWFpbnRhaW5GYWN0b3J5LmdldFRpbWVQYXJhbXModGhpcy5EZXZpY2VfVHJhZmZpY19Nb2RlbCwgdmFsdWUpO1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXREZXZpY2VUcmFmZmljVG9wKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydEltYWdlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5leHBvcnRJbWFnZShpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0RXhjZWwobW9kdWxlOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmV4cG9ydEV4Y2VsKG1vZHVsZSwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidHJhZmZpY1N0YXRpc3RpY3NDb250cm9sbGVyXCIsIHRyYWZmaWNTdGF0aXN0aWNzQ29udHJvbGxlcik7Il19
