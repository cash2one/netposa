define(["require", "exports", "text!./enlarge.html", "../../common/app/main.app", "../../common/enum/EchartConfig", "lodash", "../../common/enum/EchartConfig", "../../../core/entity/Resource", "./echartFactory"], function (require, exports, enlargeHtml, main_app_1, ChartOptions, _, EchartConfig_1, Resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var noMessage = {
        carStatistics: false,
        areaCarStatistics: false,
        areaCarAlarmStatistics: false,
        carTypeStatistics: false,
        carColorStatistics: false
    };
    var carResourceController = (function () {
        function carResourceController($scope, $timeout, layer, i18nFactory, $q, echartFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$q = $q;
            this.echartFactory = echartFactory;
            this.rankClassName = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"];
            this.carStatisticsModuleName = EchartConfig_1.carStatisticsName;
            this.parseSwitch = true;
            this.leftChartHidden = false;
            this.rightChartHidden = false;
            this.noMessage = noMessage;
            this.carFirstModuleName = "车辆统计总量";
            this.carFirstModulebutton = "同比分析";
            this.ResourceNameArr = Resource_1.ResourceNameArr;
            var that = this;
            $scope.$on(Resource_1.ResourcePageType.Vehicle.value, function (event, data) {
                that.init(data);
            });
            this.init();
            that.echartFactory.getInitRequire().then(function (res) {
                that.init(res);
            });
        }
        carResourceController.prototype.init = function (chartData) {
            var arr = Object.keys(this.carStatisticsModuleName);
            var _noMessage = this.noMessage;
            var superData;
            if (!_.isEmpty(chartData)) {
                superData = {
                    carStatistics: chartData.VehicleStatistics,
                    areaCarStatistics: chartData.AreaVehicleStatistics,
                    areaCarAlarmStatistics: chartData.AreaVehicleAlarmStatistics,
                    carTypeStatistics: chartData.VehicleColorStatistics,
                    carColorStatistics: chartData.VehicleTypeStatistics,
                    AllRankList: chartData.VehicleAllRankList
                };
            }
            for (var i = 0; i < arr.length; i++) {
                if (chartData) {
                    var getConfigData = this.setData(arr[i], superData[arr[i]]);
                    if (getConfigData) {
                        this.echartFactory.initChart(getConfigData);
                    }
                }
                else {
                    _noMessage[arr[i]] = true;
                }
            }
            this.noMessage = _noMessage;
            if (chartData) {
                this.setData("AllRankList", chartData.VehicleAllRankList);
            }
        };
        carResourceController.prototype.hiddenLeftRightChart = function (target) {
            if (target == "left") {
                this.leftChartHidden = !this.leftChartHidden;
            }
            else {
                this.rightChartHidden = !this.rightChartHidden;
            }
        };
        carResourceController.prototype.enlarge = function (name) {
            var that = this;
            var scope = this.$scope.$new();
            var enlargeKey = that[name];
            scope.enlarge = enlargeKey;
            if (enlargeKey) {
                var skin = 'enlargeEchart no-scroll';
                var area = ["1200px", "700px"];
                if (enlargeKey.name == "AllRankList") {
                    scope.enlarge = angular.copy(this.AllRankListForEnlarge);
                    area = ["751px", "511px"];
                }
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    skin: skin,
                    content: enlargeHtml,
                    scope: scope,
                    title: [enlargeKey.title, "background-color:#2D87F9;color:#fff"],
                    area: area,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.layer.msg("暂无数据");
            }
        };
        carResourceController.prototype.carStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data && !_.isEmpty(data.series)) {
                if (flag) {
                    seriesData = [angular.copy(data.series.flow).slice(-5), angular.copy(data.series.alarm).slice(-5)];
                    xData = angular.copy(data.legendData).slice(-5);
                }
                else {
                    seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                    xData = angular.copy(data.legendData);
                }
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#6E91C6", "#B752F8"];
            option.legend = new ChartOptions.legend();
            option.legend.top = 5;
            option.legend.data = [];
            option.xAxis = [];
            var left_xAxis = new ChartOptions.xAxis();
            left_xAxis.type = "category";
            left_xAxis.data = xData;
            left_xAxis.axisLine = new ChartOptions.axisLine();
            left_xAxis.axisLabel = new ChartOptions.axisLabel();
            left_xAxis.splitLine = new ChartOptions.splitLine();
            left_xAxis.splitLine.show = true;
            left_xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            left_xAxis.splitLine.lineStyle.interval = false;
            left_xAxis.axisLine.lineStyle.color = "#C9C9C9";
            left_xAxis.axisLine.show = true;
            left_xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.xAxis.push(left_xAxis);
            var right_xAxis = new ChartOptions.xAxis();
            right_xAxis.type = "category";
            right_xAxis.show = false;
            option.xAxis.push(right_xAxis);
            option.grid = new ChartOptions.grid();
            option.yAxis = [];
            var left_yAxis = new ChartOptions.yAxis();
            left_yAxis = new ChartOptions.yAxis();
            left_yAxis.type = "value";
            left_yAxis.boundaryGap = [0.2, 0.2];
            left_yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            left_yAxis.splitLine.show = true;
            left_yAxis.min = 0;
            option.yAxis.push(left_yAxis);
            var right_yAxis = new ChartOptions.yAxis();
            right_yAxis = new ChartOptions.yAxis();
            right_yAxis.type = "value";
            right_yAxis.min = 0;
            right_yAxis.boundaryGap = [0.2, 0.2];
            right_yAxis.splitLine.show = false;
            option.yAxis.push(right_yAxis);
            var legendData = ["流量总量", "报警总量"];
            option.series = [];
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                if (i == 0) {
                    seriesD.type = "line";
                }
                else {
                    seriesD.type = "bar";
                    seriesD.yAxisIndex = 1;
                    seriesD.barWidth = 20;
                }
                seriesD.data = seriesData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        carResourceController.prototype.areaCarStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data && data.series && data.series.flow && data.series.alarm) {
                if (flag) {
                    seriesData = [angular.copy(data.series.flow).slice(0, 5), angular.copy(data.series.alarm).slice(0, 5)];
                    xData = angular.copy(data.legendData).slice(0, 5);
                }
                else {
                    seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                    xData = angular.copy(data.legendData);
                }
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#73DCA3", "#F87952"];
            option.legend = new ChartOptions.legend();
            option.legend.top = 5;
            option.legend.data = [];
            option.dataZoom = [new ChartOptions.dataZoom()];
            option.xAxis = [];
            var left_xAxis = new ChartOptions.xAxis();
            left_xAxis.type = "category";
            left_xAxis.data = xData;
            left_xAxis.axisLine = new ChartOptions.axisLine();
            left_xAxis.axisLabel = new ChartOptions.axisLabel();
            left_xAxis.splitLine = new ChartOptions.splitLine();
            left_xAxis.splitLine.show = true;
            left_xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            left_xAxis.splitLine.lineStyle.interval = false;
            left_xAxis.axisLine.lineStyle.color = "#C9C9C9";
            left_xAxis.axisLine.show = true;
            left_xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.xAxis.push(left_xAxis);
            var right_xAxis = new ChartOptions.xAxis();
            right_xAxis.type = "category";
            right_xAxis.show = false;
            option.xAxis.push(right_xAxis);
            option.grid = new ChartOptions.grid();
            option.yAxis = [];
            var left_yAxis = new ChartOptions.yAxis();
            left_yAxis = new ChartOptions.yAxis();
            left_yAxis.type = "value";
            left_yAxis.min = 0;
            left_yAxis.boundaryGap = [0.2, 0.2];
            left_yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            left_yAxis.splitLine.show = true;
            option.yAxis.push(left_yAxis);
            var right_yAxis = new ChartOptions.yAxis();
            right_yAxis = new ChartOptions.yAxis();
            right_yAxis.type = "value";
            right_yAxis.min = 0;
            right_yAxis.boundaryGap = [0.2, 0.2];
            right_yAxis.splitLine.show = false;
            option.yAxis.push(right_yAxis);
            var legendData = ["流量总量", "报警总量"];
            option.series = [];
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                if (i == 0) {
                    seriesD.type = "line";
                }
                else {
                    seriesD.type = "bar";
                    seriesD.yAxisIndex = 1;
                    seriesD.barWidth = 20;
                }
                seriesD.data = seriesData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        carResourceController.prototype.areaCarAlarmStatistics = function (data, flag) {
            var legendData = [];
            var seriesData = [];
            var xData = [];
            var option = new ChartOptions.EChartOption();
            if (data && !_.isEmpty(data.series)) {
                if (flag) {
                    legendData = this.echartFactory.sliceArray(data.legendData);
                    xData = this.echartFactory.sliceArray(data.xData);
                    seriesData = this.echartFactory.sliceArray(data.series);
                }
                else {
                    legendData = angular.copy(data.legendData);
                    xData = angular.copy(data.xData);
                    seriesData = angular.copy(data.series);
                }
            }
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#EE8741", "#FFC820", "#6AA4D8", "#D8D8D8", "#4472C4"];
            option.grid = new ChartOptions.grid();
            option.grid.top = 40;
            option.legend = new ChartOptions.legend();
            option.legend.data = legendData;
            option.legend.itemWidth = 10;
            option.legend.itemHeight = 10;
            option.legend.top = 5;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.xAxis.type = "category";
            option.xAxis.data = xData;
            option.xAxis.scale = true;
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.show = true;
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.lineStyle.interval = false;
            option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
            option.xAxis.axisLine.show = true;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            option.yAxis.splitNumber = 6;
            option.series = [];
            for (var i = 0; i < legendData.length; i++) {
                var seriesD = new ChartOptions.series();
                seriesD.name = legendData[i];
                seriesD.type = "line";
                seriesD.data = seriesData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        carResourceController.prototype.carTypeStatistics = function (data, flag) {
            var legendData = [];
            var seriesData = [];
            var option = new ChartOptions.EChartOption();
            var colors = [];
            if (data && data.xData && data.seriesData) {
                EchartConfig_1.colorEnumArr.forEach(function (color, index) {
                    data.xData.forEach(function (colorItem, i) {
                        if (color.name == colorItem) {
                            colors[index] = color.value;
                            legendData[index] = color.name;
                            seriesData[index] = data.seriesData[i];
                        }
                    });
                });
            }
            option.color = colors;
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = 'item';
            option.tooltip.position = function (pos, params, dom, rect, size) {
                var obj = { top: 60 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            };
            option.grid = new ChartOptions.grid();
            option.grid.top = 60;
            option.legend.data = legendData;
            option.legend.orient = "horizontal";
            option.legend.itemWidth = 10;
            option.legend.itemHeight = 10;
            option.legend.x = "left";
            option.legend.top = 5;
            option.series = [];
            var series_right = new ChartOptions.series();
            series_right.type = "pie";
            series_right.radius = ["35%", "70%"];
            series_right.center = ["50%", "55%"];
            series_right.selectedMode = "single";
            series_right.label = new ChartOptions.label();
            series_right.label.normal = new ChartOptions.normal();
            series_right.label.normal.position = "outside";
            series_right.label.normal.show = false;
            series_right.labelLine = new ChartOptions.labelLine();
            series_right.labelLine.normal = new ChartOptions.normal();
            series_right.labelLine.normal.show = false;
            series_right.itemStyle = new ChartOptions.itemStyle();
            series_right.itemStyle.normal = new ChartOptions.normal();
            series_right.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
            series_right.itemStyle.normal.shadowOffsetY = 10;
            series_right.itemStyle.normal.shadowBlur = 7;
            series_right.data = [];
            for (var i = 0; i < legendData.length; i++) {
                var seriesDataA = {};
                seriesDataA.value = seriesData[i];
                seriesDataA.name = legendData[i];
                series_right.data.push(seriesDataA);
            }
            option.series.push(series_right);
            return option;
        };
        carResourceController.prototype.carColorStatistics = function (data, flag) {
            var xData = [];
            var seriesData = [];
            if (data && !_.isEmpty(data.seriesData)) {
                if (flag) {
                    xData = angular.copy(data.xData).slice(0, 5);
                    seriesData = angular.copy(data.seriesData).slice(0, 5);
                }
                else {
                    xData = angular.copy(data.xData).slice(0, 10);
                    seriesData = angular.copy(data.seriesData).slice(0, 10);
                }
            }
            else {
                return;
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#00AAFF"];
            option.series = [];
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.axisTick = new ChartOptions.axisTick();
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.show = true;
            option.xAxis.data = xData;
            option.grid = new ChartOptions.grid();
            option.grid.top = 20;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            var seriesD = new ChartOptions.series();
            seriesD.type = "bar";
            seriesD.data = seriesData;
            seriesD.barWidth = 20;
            option.series.push(seriesD);
            return option;
        };
        carResourceController.AllRankList = function (data, flag) {
            if (data) {
                var Ranklist = data.series || [];
                if (flag) {
                    return angular.copy(Ranklist).slice(0, 5);
                }
                else {
                    return angular.copy(Ranklist);
                }
            }
        };
        carResourceController.prototype.setData = function (title, data) {
            switch (title) {
                case "carStatistics": {
                    var option = {
                        title: "车辆统计总量",
                        name: "carStatistics",
                        config: this.carStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.carStatistics(data, false);
                    this.carStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "areaCarStatistics": {
                    var option = {
                        title: "区域车辆统计总量(TOP5)",
                        name: "areaCarStatistics",
                        config: this.areaCarStatistics(data, false)
                    };
                    this.areaCarStatisticsConfig = option;
                    return option;
                }
                case "areaCarAlarmStatistics": {
                    var option = {
                        title: "区域车辆报警统计趋势",
                        name: "areaCarAlarmStatistics",
                        config: this.areaCarAlarmStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.areaCarAlarmStatistics(data, false);
                    this.areaCarAlarmStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "carTypeStatistics": {
                    var option = {
                        title: "车牌颜色统计",
                        name: "carTypeStatistics",
                        config: this.carTypeStatistics(data, true)
                    };
                    this.carTypeStatisticsConfig = option;
                    return option;
                }
                case "carColorStatistics": {
                    var option = {
                        title: "车辆类型统计",
                        name: "carColorStatistics",
                        config: this.carColorStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.carColorStatistics(data, false);
                    this.carColorStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AllRankList": {
                    var option = {
                        title: "高频检索关键字",
                        name: "AllRankList",
                        config: carResourceController.AllRankList(data, true)
                    };
                    this.AllRankListConfig = angular.copy(option);
                    var option2 = angular.copy(option);
                    option2.config = carResourceController.AllRankList(data, false);
                    this.AllRankListForEnlarge = option2;
                    return option;
                }
            }
        };
        carResourceController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
        return carResourceController;
    }());
    main_app_1.app.controller('carResourceController', carResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L2NhclJlc291cmNlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0JBLElBQU0sU0FBUyxHQUFlO1FBQzFCLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLGlCQUFpQixFQUFFLEtBQUs7UUFDeEIsc0JBQXNCLEVBQUUsS0FBSztRQUM3QixpQkFBaUIsRUFBRSxLQUFLO1FBQ3hCLGtCQUFrQixFQUFFLEtBQUs7S0FDNUIsQ0FBQztJQUVGO1FBeUJJLCtCQUFvQixNQUFXLEVBQ25CLFFBQWtCLEVBQ2xCLEtBQVUsRUFDVixXQUFnQixFQUNoQixFQUFPLEVBQ1AsYUFBNkI7WUFMckIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQ1Asa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBbkJ6QyxrQkFBYSxHQUFrQixDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvRyw0QkFBdUIsR0FBUSxnQ0FBaUIsQ0FBQztZQUNqRCxnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixvQkFBZSxHQUFZLEtBQUssQ0FBQztZQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFHbEMsY0FBUyxHQUFlLFNBQVMsQ0FBQztZQUdsQyx1QkFBa0IsR0FBVyxRQUFRLENBQUM7WUFDdEMseUJBQW9CLEdBQVcsTUFBTSxDQUFDO1lBRXRDLG9CQUFlLEdBQVEsMEJBQWUsQ0FBQztZQVFuQyxJQUFJLElBQUksR0FBRyxJQUFXLENBQUM7WUFFdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQVUsS0FBVSxFQUFFLElBQVM7Z0JB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QztZQUMxQixZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckMsWUFBWSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7WUFFckMsWUFBWSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QyxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQy9DLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFdkMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRCxZQUFZLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBRTNDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDO1lBQ3BFLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7WUFDakQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUU3QyxZQUFZLENBQUMsSUFBSSxHQUFHLEVBQWdCLENBQUM7WUFFckMsR0FB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O29CQUN0RCxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUNqQixDQUFDO2dCQUNELEtBQUssYUFBYSxFQUFFLENBQUM7b0JBQ2pCLElBQUksTUFBTSxHQUFHO3dCQUNULEtBQUssRUFBRSxTQUFTO3dCQUNoQixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsTUFBTSxFQUFFLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3FCQUN6QixDQUFDO29CQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFFOUMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNoRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDO29CQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUE5a0JNLDZCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBK2tCM0YsNEJBQUM7S0FobEJELEFBZ2xCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZXMvY2hhcnQvY2FyUmVzb3VyY2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbmxhcmdlLmh0bWxcIiBuYW1lPVwiZW5sYXJnZUh0bWxcIiAvPlxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCIuL2VjaGFydEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUVjaGFydEZhY3RvcnkgfSBmcm9tIFwiLi9lY2hhcnRGYWN0b3J5XCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgY2FyU3RhdGlzdGljc05hbWUsIGNvbG9yRW51bUFyciB9IGZyb20gXCIuLi8uLi9jb21tb24vZW51bS9FY2hhcnRDb25maWdcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VOYW1lQXJyLCBSZXNvdXJjZVBhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1Jlc291cmNlXCI7XHJcbmRlY2xhcmUgbGV0IGVubGFyZ2VIdG1sOiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcbmludGVyZmFjZSBJTm9NZXNzYWdlIHtcclxuICAgIGNhclN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBhcmVhQ2FyU3RhdGlzdGljczogYm9vbGVhbixcclxuICAgIGFyZWFDYXJBbGFybVN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBjYXJUeXBlU3RhdGlzdGljczogYm9vbGVhbixcclxuICAgIGNhckNvbG9yU3RhdGlzdGljczogYm9vbGVhbixcclxufVxyXG5cclxuY29uc3Qgbm9NZXNzYWdlOiBJTm9NZXNzYWdlID0ge1xyXG4gICAgY2FyU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBhcmVhQ2FyU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBhcmVhQ2FyQWxhcm1TdGF0aXN0aWNzOiBmYWxzZSxcclxuICAgIGNhclR5cGVTdGF0aXN0aWNzOiBmYWxzZSxcclxuICAgIGNhckNvbG9yU3RhdGlzdGljczogZmFsc2VcclxufTtcclxuXHJcbmNsYXNzIGNhclJlc291cmNlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2xheWVyJywgJ2kxOG5GYWN0b3J5JywgJyRxJywgJ2VjaGFydEZhY3RvcnknXTtcclxuXHJcbiAgICBjYXJTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBhcmVhQ2FyU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgYXJlYUNhckFsYXJtU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgY2FyVHlwZVN0YXRpc3RpY3NDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIGNhckNvbG9yU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQWxsUmFua0xpc3RDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIEFsbFJhbmtMaXN0Rm9yRW5sYXJnZTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgcmVzb3VyY2VQYXJzZUNvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgcmFua0NsYXNzTmFtZTogQXJyYXk8c3RyaW5nPiA9IFtcImktcmFuay1maXJzdFwiLCBcImktcmFuay1zZWNvbmRcIiwgXCJpLXJhbmstdGhpcmRcIiwgXCJpLXJhbmstZm91clwiLCBcImktcmFuay1maXZlXCJdO1xyXG4gICAgY2FyU3RhdGlzdGljc01vZHVsZU5hbWU6IGFueSA9IGNhclN0YXRpc3RpY3NOYW1lO1xyXG4gICAgcGFyc2VTd2l0Y2g6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgbGVmdENoYXJ0SGlkZGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByaWdodENoYXJ0SGlkZGVuOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIG5vTWVzc2FnZTogSU5vTWVzc2FnZSA9IG5vTWVzc2FnZTtcclxuXHJcbiAgICAvLyDlkIzmr5TliIbmnpBcclxuICAgIGNhckZpcnN0TW9kdWxlTmFtZTogc3RyaW5nID0gXCLovabovobnu5/orqHmgLvph49cIjtcclxuICAgIGNhckZpcnN0TW9kdWxlYnV0dG9uOiBzdHJpbmcgPSBcIuWQjOavlOWIhuaekFwiO1xyXG5cclxuICAgIFJlc291cmNlTmFtZUFycjogYW55ID0gUmVzb3VyY2VOYW1lQXJyO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHE6IGFueSxcclxuICAgICAgICBwcml2YXRlIGVjaGFydEZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgYW55O1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFJlc291cmNlUGFnZVR5cGUuVmVoaWNsZS52YWx1ZSwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGF0LmluaXQoZGF0YSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5nZXRJbml0UmVxdWlyZSgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KGNoYXJ0RGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBhcnIgPSBPYmplY3Qua2V5cyh0aGlzLmNhclN0YXRpc3RpY3NNb2R1bGVOYW1lKSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBfbm9NZXNzYWdlOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHRoaXMubm9NZXNzYWdlIGFzIGFueTtcclxuXHJcbiAgICAgICAgbGV0IHN1cGVyRGF0YTogYW55O1xyXG4gICAgICAgIGlmICghXy5pc0VtcHR5KGNoYXJ0RGF0YSkpIHtcclxuICAgICAgICAgICAgc3VwZXJEYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY2FyU3RhdGlzdGljczogY2hhcnREYXRhLlZlaGljbGVTdGF0aXN0aWNzLFxyXG4gICAgICAgICAgICAgICAgYXJlYUNhclN0YXRpc3RpY3M6IGNoYXJ0RGF0YS5BcmVhVmVoaWNsZVN0YXRpc3RpY3MsXHJcbiAgICAgICAgICAgICAgICBhcmVhQ2FyQWxhcm1TdGF0aXN0aWNzOiBjaGFydERhdGEuQXJlYVZlaGljbGVBbGFybVN0YXRpc3RpY3MsXHJcbiAgICAgICAgICAgICAgICBjYXJUeXBlU3RhdGlzdGljczogY2hhcnREYXRhLlZlaGljbGVDb2xvclN0YXRpc3RpY3MsXHJcbiAgICAgICAgICAgICAgICBjYXJDb2xvclN0YXRpc3RpY3M6IGNoYXJ0RGF0YS5WZWhpY2xlVHlwZVN0YXRpc3RpY3MsXHJcbiAgICAgICAgICAgICAgICBBbGxSYW5rTGlzdDogY2hhcnREYXRhLlZlaGljbGVBbGxSYW5rTGlzdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoY2hhcnREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ2V0Q29uZmlnRGF0YTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhID0gdGhpcy5zZXREYXRhKGFycltpXSwgc3VwZXJEYXRhW2FycltpXV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbmZpZ0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVjaGFydEZhY3RvcnkuaW5pdENoYXJ0KGdldENvbmZpZ0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX25vTWVzc2FnZVthcnJbaV1dID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vTWVzc2FnZSA9IF9ub01lc3NhZ2UgYXMgYW55O1xyXG5cclxuICAgICAgICBpZiAoY2hhcnREYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShcIkFsbFJhbmtMaXN0XCIsIGNoYXJ0RGF0YS5WZWhpY2xlQWxsUmFua0xpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGhpZGRlbkxlZnRSaWdodENoYXJ0KHRhcmdldDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmxlZnRDaGFydEhpZGRlbiA9ICF0aGlzLmxlZnRDaGFydEhpZGRlblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmlnaHRDaGFydEhpZGRlbiA9ICF0aGlzLnJpZ2h0Q2hhcnRIaWRkZW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5L2/55So57yT5a2Y55qE6YWN572u5paH5Lu25a6e546w5pS+5aSn5pWI5p6cXHJcbiAgICBwdWJsaWMgZW5sYXJnZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIGxldCBzY29wZTogeyBlbmxhcmdlOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCBlbmxhcmdlS2V5OiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEgPSB0aGF0W25hbWVdO1xyXG5cclxuICAgICAgICBzY29wZS5lbmxhcmdlID0gZW5sYXJnZUtleTtcclxuXHJcbiAgICAgICAgaWYgKGVubGFyZ2VLZXkpIHtcclxuICAgICAgICAgICAgbGV0IHNraW46IHN0cmluZyA9ICdlbmxhcmdlRWNoYXJ0IG5vLXNjcm9sbCc7XHJcbiAgICAgICAgICAgIGxldCBhcmVhOiBBcnJheTxzdHJpbmc+ID0gW1wiMTIwMHB4XCIsIFwiNzAwcHhcIl07XHJcbiAgICAgICAgICAgIGlmIChlbmxhcmdlS2V5Lm5hbWUgPT0gXCJBbGxSYW5rTGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5lbmxhcmdlID0gYW5ndWxhci5jb3B5KHRoaXMuQWxsUmFua0xpc3RGb3JFbmxhcmdlKTtcclxuICAgICAgICAgICAgICAgIGFyZWEgPSBbXCI3NTFweFwiLCBcIjUxMXB4XCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHNraW46IHNraW4sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBlbmxhcmdlSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KHRpdGxlKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBbZW5sYXJnZUtleS50aXRsZSwgXCJiYWNrZ3JvdW5kLWNvbG9yOiMyRDg3Rjk7Y29sb3I6I2ZmZlwiXSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuaaguaXoOaVsOaNrlwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNhclN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmIChkYXRhICYmICFfLmlzRW1wdHkoZGF0YS5zZXJpZXMpKSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gW2FuZ3VsYXIuY29weShkYXRhLnNlcmllcy5mbG93KS5zbGljZSgtNSksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSkuc2xpY2UoLTUpXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSkuc2xpY2UoLTUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdyksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzZFOTFDNlwiLCBcIiNCNzUyRjhcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy54QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gocmlnaHRfeEF4aXMpO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gW10gYXMgQXJyYXk8Q2hhcnRPcHRpb25zLnlBeGlzPjtcclxuICAgICAgICBsZXQgbGVmdF95QXhpczphbnkgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgbGVmdF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAvLyBsZWZ0X3lBeGlzLm1heCA9IDQwMDAwO1xyXG4gICAgICAgIGxlZnRfeUF4aXMubWluID0gMDtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChsZWZ0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0X3lBeGlzOmFueSA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICByaWdodF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICByaWdodF95QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIC8vIHJpZ2h0X3lBeGlzLm1heCA9IDcwMDtcclxuICAgICAgICByaWdodF95QXhpcy5taW4gPSAwO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLmJvdW5kYXJ5R2FwID0gWzAuMiwgMC4yXTtcclxuICAgICAgICByaWdodF95QXhpcy5zcGxpdExpbmUuc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5wdXNoKHJpZ2h0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBbXCLmtYHph4/mgLvph49cIiwgXCLmiqXorabmgLvph49cIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEuaWNvbiA9IFwic3RhY2tcIjtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJsaW5lXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnlBeGlzSW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcmVhQ2FyU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5zZXJpZXMgJiYgZGF0YS5zZXJpZXMuZmxvdyAmJiBkYXRhLnNlcmllcy5hbGFybSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdykuc2xpY2UoMCwgNSksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSkuc2xpY2UoMCwgNSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdyksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNzNEQ0EzXCIsIFwiI0Y4Nzk1MlwiXTtcclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gNTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgLy9kYXRhWm9vbVxyXG4gICAgICAgIG9wdGlvbi5kYXRhWm9vbSA9IFtuZXcgQ2hhcnRPcHRpb25zLmRhdGFab29tKCldO1xyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBbXSBhcyBBcnJheTxDaGFydE9wdGlvbnMueEF4aXM+O1xyXG5cclxuICAgICAgICBsZXQgbGVmdF94QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG5cclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIG9wdGlvbi54QXhpcy5wdXNoKHJpZ2h0X3hBeGlzKTtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy55QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeUF4aXM6YW55ID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIGxlZnRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIC8vIGxlZnRfeUF4aXMubWF4ID0gNDAwMDBcclxuICAgICAgICBsZWZ0X3lBeGlzLm1pbiA9IDA7XHJcbiAgICAgICAgbGVmdF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChsZWZ0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gcmlnaHRfeUF4aXMubWF4ID0gNzAwXHJcbiAgICAgICAgcmlnaHRfeUF4aXMubWluID0gMDtcclxuICAgICAgICByaWdodF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChyaWdodF95QXhpcyk7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW1wi5rWB6YeP5oC76YePXCIsIFwi5oql6K2m5oC76YePXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC55QXhpc0luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXJlYUNhckFsYXJtU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG5cclxuICAgICAgICBpZiAoZGF0YSAmJiAhXy5pc0VtcHR5KGRhdGEuc2VyaWVzKSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0VFODc0MVwiLCBcIiNGRkM4MjBcIiwgXCIjNkFBNEQ4XCIsIFwiI0Q4RDhEOFwiLCBcIiM0NDcyQzRcIl07XHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA0MDtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBsZWdlbmREYXRhO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTA7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLmludGVydmFsID0gMDtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnJvdGF0ZSA9IDE1O1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNjYWxlID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYm91bmRhcnlHYXAgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXROdW1iZXIgPSA2O1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJsaW5lXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2FyVHlwZVN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIGxldCBjb2xvcnMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnhEYXRhICYmIGRhdGEuc2VyaWVzRGF0YSkge1xyXG4gICAgICAgICAgICBjb2xvckVudW1BcnIuZm9yRWFjaCgoY29sb3I6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS54RGF0YS5mb3JFYWNoKChjb2xvckl0ZW06IHN0cmluZywgaTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yLm5hbWUgPT0gY29sb3JJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yc1tpbmRleF0gPSBjb2xvci52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVnZW5kRGF0YVtpbmRleF0gPSBjb2xvci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNEYXRhW2luZGV4XSA9IGRhdGEuc2VyaWVzRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IGNvbG9ycztcclxuXHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gJ2l0ZW0nO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLnBvc2l0aW9uID0gZnVuY3Rpb24gKHBvczogQXJyYXk8bnVtYmVyPiwgcGFyYW1zOiBzdHJpbmcsIGRvbTogYW55LCByZWN0OiBhbnksIHNpemU6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0geyB0b3A6IDYwIH07XHJcbiAgICAgICAgICAgIG9ialtbJ2xlZnQnLCAncmlnaHQnXVsrKHBvc1swXSA8IHNpemUudmlld1NpemVbMF0gLyAyKV1dID0gNTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDYwO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IGxlZ2VuZERhdGE7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5vcmllbnQgPSBcImhvcml6b250YWxcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1XaWR0aCA9IDEwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUhlaWdodCA9IDEwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQueCA9IFwibGVmdFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gNTtcclxuXHJcbiAgICAgICAgLy9zZXJpZXNcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcbiAgICAgICAgbGV0IHNlcmllc19yaWdodCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0LnR5cGUgPSBcInBpZVwiO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5yYWRpdXMgPSBbXCIzNSVcIiwgXCI3MCVcIl07XHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0LmNlbnRlciA9IFtcIjUwJVwiLCBcIjU1JVwiXTtcclxuICAgICAgICBzZXJpZXNfcmlnaHQuc2VsZWN0ZWRNb2RlID0gXCJzaW5nbGVcIjtcclxuXHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0LmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbCgpO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5sYWJlbC5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcIm91dHNpZGVcIjtcclxuICAgICAgICBzZXJpZXNfcmlnaHQubGFiZWwubm9ybWFsLnNob3cgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0LmxhYmVsTGluZSA9IG5ldyBDaGFydE9wdGlvbnMubGFiZWxMaW5lKCk7XHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0LmxhYmVsTGluZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5sYWJlbExpbmUubm9ybWFsLnNob3cgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0Lml0ZW1TdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuaXRlbVN0eWxlKCk7XHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0Lml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd0NvbG9yID0gJ3JnYmEoMiwgNTIsIDEyMywgMC4yKSc7XHJcbiAgICAgICAgc2VyaWVzX3JpZ2h0Lml0ZW1TdHlsZS5ub3JtYWwuc2hhZG93T2Zmc2V0WSA9IDEwO1xyXG4gICAgICAgIHNlcmllc19yaWdodC5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd0JsdXIgPSA3O1xyXG5cclxuICAgICAgICBzZXJpZXNfcmlnaHQuZGF0YSA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRGF0YUEgPSB7fSBhcyBDaGFydE9wdGlvbnMuc2VyaWVzRGF0YUE7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGFBLnZhbHVlID0gc2VyaWVzRGF0YVtpXTtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YUEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc19yaWdodC5kYXRhLnB1c2goc2VyaWVzRGF0YUEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzX3JpZ2h0KTtcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjYXJDb2xvclN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGlmIChkYXRhICYmICFfLmlzRW1wdHkoZGF0YS5zZXJpZXNEYXRhKSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS54RGF0YSkuc2xpY2UoMCwgNSk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzRGF0YSkuc2xpY2UoMCwgNSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnhEYXRhKS5zbGljZSgwLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzRGF0YSkuc2xpY2UoMCwgMTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjMDBBQUZGXCJdO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzVGljayA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1RpY2soKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSAyMDtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhO1xyXG4gICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMDtcclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBBbGxSYW5rTGlzdChkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IFJhbmtsaXN0ID0gZGF0YS5zZXJpZXMgfHwgW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkoUmFua2xpc3QpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KFJhbmtsaXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RGF0YSh0aXRsZTogc3RyaW5nLCBkYXRhPzogYW55KTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhIHtcclxuICAgICAgICBzd2l0Y2ggKHRpdGxlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYXJTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6L2m6L6G57uf6K6h5oC76YePXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXJTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLmNhclN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuY2FyU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhclN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcImFyZWFDYXJTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yy65Z+f6L2m6L6G57uf6K6h5oC76YePKFRPUDUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhcmVhQ2FyU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5hcmVhQ2FyU3RhdGlzdGljcyhkYXRhLCBmYWxzZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhQ2FyU3RhdGlzdGljc0NvbmZpZyA9IG9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiYXJlYUNhckFsYXJtU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWMuuWfn+i9pui+huaKpeitpue7n+iuoei2i+WKv1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiYXJlYUNhckFsYXJtU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5hcmVhQ2FyQWxhcm1TdGF0aXN0aWNzKGRhdGEsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLmFyZWFDYXJBbGFybVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhQ2FyQWxhcm1TdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJjYXJUeXBlU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIui9pueJjOminOiJsue7n+iuoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiY2FyVHlwZVN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuY2FyVHlwZVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJUeXBlU3RhdGlzdGljc0NvbmZpZyA9IG9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiY2FyQ29sb3JTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6L2m6L6G57G75Z6L57uf6K6hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJjYXJDb2xvclN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuY2FyQ29sb3JTdGF0aXN0aWNzKGRhdGEsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLmNhckNvbG9yU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhckNvbG9yU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQWxsUmFua0xpc3RcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLpq5jpopHmo4DntKLlhbPplK7lrZdcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFsbFJhbmtMaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBjYXJSZXNvdXJjZUNvbnRyb2xsZXIuQWxsUmFua0xpc3QoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxSYW5rTGlzdENvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IGNhclJlc291cmNlQ29udHJvbGxlci5BbGxSYW5rTGlzdChkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFJhbmtMaXN0Rm9yRW5sYXJnZSA9IG9wdGlvbjI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdjYXJSZXNvdXJjZUNvbnRyb2xsZXInLCBjYXJSZXNvdXJjZUNvbnRyb2xsZXIpOyJdfQ==
