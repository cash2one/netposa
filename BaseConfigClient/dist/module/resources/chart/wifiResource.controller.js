define(["require", "exports", "text!./enlarge.html", "../../common/app/main.app", "../../common/enum/EchartConfig", "../../../core/entity/Resource", "../../common/enum/EchartConfig", "./echartFactory"], function (require, exports, enlargeHtml, main_app_1, ChartOptions, Resource_1, EchartConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var noMessage = {
        WifiStatistics: false,
        AreaWifiStatistics: false,
        AreaWifiAlarmStatistics: false,
        WifiTypeStatistics: false,
        WifiColorStatistics: false
    };
    var wifiResourceController = (function () {
        function wifiResourceController($scope, $timeout, layer, i18nFactory, $q, echartFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$q = $q;
            this.echartFactory = echartFactory;
            this.rankClassName = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"];
            this.parseSwitch = true;
            this.leftChartHidden = false;
            this.rightChartHidden = false;
            this.noMessage = noMessage;
            this.ResourceNameArr = Resource_1.ResourceNameArr;
            var that = this;
            $scope.$on(Resource_1.ResourcePageType.WiFi.value, function (event, data) {
                that.init(data, true);
            });
            this.init();
            that.echartFactory.getInitRequire().then(function (res) {
                that.init(res);
            });
        }
        wifiResourceController.prototype.hiddenLeftRightChart = function (target) {
            if (target == "left") {
                this.leftChartHidden = !this.leftChartHidden;
            }
            else {
                this.rightChartHidden = !this.rightChartHidden;
            }
        };
        wifiResourceController.prototype.init = function (chartData) {
            var arr = Object.keys(EchartConfig_1.WiFiStatisticsName);
            var _noMessage = this.noMessage;
            for (var i = 0; i < arr.length; i++) {
                try {
                    var everyEchart = chartData && chartData[arr[i]] ? chartData[arr[i]] : null;
                    if (everyEchart) {
                        this.echartFactory.initChart(this.setData(arr[i], everyEchart));
                    }
                    else {
                        _noMessage[arr[i]] = true;
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            this.noMessage = _noMessage;
            if (chartData) {
                this.setData(EchartConfig_1.otherStatisticsName.WifiAllRankList, chartData[EchartConfig_1.otherStatisticsName.WifiAllRankList]);
            }
        };
        wifiResourceController.prototype.enlarge = function (name) {
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
        wifiResourceController.prototype.WifiStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data) {
                var dataListData = data.xData ? data.xData : data.dateList;
                if (flag) {
                    seriesData = [angular.copy(data.series.flow).slice(-5), angular.copy(data.series.alarm).slice(-5)];
                    xData = angular.copy(dataListData).slice(-5);
                }
                else {
                    seriesData = [angular.copy(data.series.flow), angular.copy(data.series.alarm)];
                    xData = angular.copy(data.dateList);
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
        wifiResourceController.prototype.AreaWifiStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data) {
                if (flag) {
                    seriesData = [this.echartFactory.sliceArray(data.series.flow), this.echartFactory.sliceArray(data.series.alarm)];
                    xData = this.echartFactory.sliceArray(data.legendData);
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
        wifiResourceController.prototype.AreaWifiAlarmStatistics = function (data, flag) {
            var legendData = [];
            var seriesData = [];
            var xData = [];
            if (data) {
                if (flag) {
                    legendData = this.echartFactory.sliceArray(data.legendData);
                    xData = this.echartFactory.sliceArray(data.xData);
                    seriesData = this.echartFactory.sliceArray(data.series);
                    console.log(seriesData);
                }
                else {
                    legendData = angular.copy(data.legendData);
                    xData = angular.copy(data.xData);
                    seriesData = angular.copy(data.series);
                }
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#EE8741", "#FFC820", "#6AA4D8", "#D8D8D8", "#4472C4"];
            option.grid = new ChartOptions.grid();
            option.legend = new ChartOptions.legend();
            option.legend.data = legendData;
            option.legend.top = 5;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.data = xData;
            option.xAxis.scale = true;
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.show = true;
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.lineStyle.interval = false;
            option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
            option.xAxis.axisLine.show = true;
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
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
        wifiResourceController.prototype.WifiTypeStatistics = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#00AAFF"];
            option.series = [];
            var xData = [];
            var seriesData = [];
            if (data) {
                if (flag) {
                    if (!data.LegendData) {
                        data.LegendData = [];
                    }
                    xData = data.xData ? data.xData : this.echartFactory.sliceArray(data.dateList);
                    seriesData = this.echartFactory.sliceArray(data.series);
                }
                else {
                    xData = angular.copy(data.dateList);
                    seriesData = angular.copy(data.series);
                }
            }
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
            option.yAxis.splitNumber = 8;
            var seriesD = new ChartOptions.series();
            seriesD.type = "bar";
            seriesD.data = seriesData;
            seriesD.barWidth = 20;
            option.series.push(seriesD);
            return option;
        };
        wifiResourceController.prototype.WifiColorStatistics = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            var seriesData = [];
            var xData = [];
            if (data) {
                if (flag) {
                    seriesData = this.echartFactory.sliceArray(data.series);
                    xData = this.echartFactory.sliceArray(data.legendData);
                }
                else {
                    seriesData = angular.copy(data.series);
                    xData = angular.copy(data.legendData);
                }
            }
            option.grid = new ChartOptions.grid();
            option.grid.top = 20;
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
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.xAxis.axisLabel.interval = 0;
            option.xAxis.axisLabel.rotate = 10;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            var seriesD = new ChartOptions.series();
            seriesD.type = "bar";
            seriesD.data = seriesData;
            seriesD.barWidth = 20;
            seriesD.itemStyle = new ChartOptions.itemStyle();
            seriesD.itemStyle.normal = new ChartOptions.normal();
            var areaStyleColor = new ChartOptions.areaStyleColor(["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"]);
            var object = Object;
            seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);
            option.series = [seriesD];
            delete option.legend;
            return option;
        };
        wifiResourceController.prototype.WifiAllRankList = function (data, flag) {
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
        wifiResourceController.prototype.setData = function (title, data) {
            switch (title) {
                case "WifiStatistics": {
                    var option = {
                        title: "WiFi统计总量",
                        name: "WifiStatistics",
                        config: this.WifiStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.WifiStatistics(data, false);
                    this.wifiStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaWifiStatistics": {
                    var option = {
                        title: "区域WiFi统计总量(TOP5)",
                        name: "AreaWifiStatistics",
                        config: this.AreaWifiStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaWifiStatistics(data, false);
                    this.areaWifiStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaWifiAlarmStatistics": {
                    var option = {
                        title: "区域WiFi报警统计趋势",
                        name: "AreaWifiAlarmStatistics",
                        config: this.AreaWifiAlarmStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaWifiAlarmStatistics(data, false);
                    this.areaWifiAlarmStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "WifiTypeStatistics": {
                    var option = {
                        title: "WiFi检索服务统计",
                        name: "WifiTypeStatistics",
                        config: this.WifiTypeStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.WifiTypeStatistics(data, false);
                    this.wifiTypeStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "WifiColorStatistics": {
                    var option = {
                        title: "WiFi设备报警统计",
                        name: "WifiColorStatistics",
                        config: this.WifiColorStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.WifiColorStatistics(data, false);
                    this.wifiColorStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "WifiAllRankList": {
                    var option = {
                        title: "高频检索WiFi关键字",
                        name: "AllRankList",
                        config: this.WifiAllRankList(data, true)
                    };
                    this.AllRankListConfig = angular.copy(option);
                    var option2 = angular.copy(option);
                    option2.config = this.WifiAllRankList(data, false);
                    this.AllRankListForEnlarge = angular.copy(option2);
                    return option;
                }
            }
        };
        wifiResourceController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
        return wifiResourceController;
    }());
    main_app_1.app.controller('wifiResourceController', wifiResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L3dpZmlSZXNvdXJjZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCQSxJQUFNLFNBQVMsR0FBZTtRQUMxQixjQUFjLEVBQUUsS0FBSztRQUNyQixrQkFBa0IsRUFBRSxLQUFLO1FBQ3pCLHVCQUF1QixFQUFFLEtBQUs7UUFDOUIsa0JBQWtCLEVBQUUsS0FBSztRQUN6QixtQkFBbUIsRUFBRSxLQUFLO0tBQzdCLENBQUM7SUFHRjtRQW1CSSxnQ0FBb0IsTUFBVyxFQUNuQixRQUFrQixFQUNsQixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsRUFBTyxFQUNQLGFBQTZCO1lBTHJCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQWR6QyxrQkFBYSxHQUFrQixDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvRyxnQkFBVyxHQUFZLElBQUksQ0FBQztZQUM1QixvQkFBZSxHQUFZLEtBQUssQ0FBQztZQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFHbEMsY0FBUyxHQUFlLFNBQVMsQ0FBQztZQUVsQyxvQkFBZSxHQUFRLDBCQUFlLENBQUM7WUFRbkMsSUFBSSxJQUFJLEdBQUcsSUFBVyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLEtBQVUsRUFBRSxJQUFTO2dCQUNuRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJ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aWxlIjoibW9kdWxlL3Jlc291cmNlcy9jaGFydC93aWZpUmVzb3VyY2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbmxhcmdlLmh0bWxcIiBuYW1lPVwiZW5sYXJnZUh0bWxcIiAvPlxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCIuL2VjaGFydEZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUVjaGFydEZhY3RvcnkgfSBmcm9tIFwiLi9lY2hhcnRGYWN0b3J5XCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCB7IHJlc291cmNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSZXNvdXJjZVBhZ2VUeXBlLCBSZXNvdXJjZU5hbWVBcnIgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUmVzb3VyY2VcIjtcclxuaW1wb3J0IHsgV2lGaVN0YXRpc3RpY3NOYW1lLCBvdGhlclN0YXRpc3RpY3NOYW1lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5kZWNsYXJlIGxldCBlbmxhcmdlSHRtbDogYW55LCBhbmd1bGFyOiBhbnksICQ6IGFueTtcclxuXHJcbmludGVyZmFjZSBJTm9NZXNzYWdlIHtcclxuICAgIFdpZmlTdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgQXJlYVdpZmlTdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgQXJlYVdpZmlBbGFybVN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBXaWZpVHlwZVN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBXaWZpQ29sb3JTdGF0aXN0aWNzOiBib29sZWFuLFxyXG59XHJcblxyXG5jb25zdCBub01lc3NhZ2U6IElOb01lc3NhZ2UgPSB7XHJcbiAgICBXaWZpU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBBcmVhV2lmaVN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgQXJlYVdpZmlBbGFybVN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgV2lmaVR5cGVTdGF0aXN0aWNzOiBmYWxzZSxcclxuICAgIFdpZmlDb2xvclN0YXRpc3RpY3M6IGZhbHNlXHJcbn07XHJcblxyXG5cclxuY2xhc3Mgd2lmaVJlc291cmNlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2xheWVyJywgJ2kxOG5GYWN0b3J5JywgJyRxJywgJ2VjaGFydEZhY3RvcnknXTtcclxuXHJcbiAgICB3aWZpU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgYXJlYVdpZmlTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBhcmVhV2lmaUFsYXJtU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgd2lmaVR5cGVTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICB3aWZpQ29sb3JTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBBbGxSYW5rTGlzdENvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQWxsUmFua0xpc3RGb3JFbmxhcmdlOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICByYW5rQ2xhc3NOYW1lOiBBcnJheTxzdHJpbmc+ID0gW1wiaS1yYW5rLWZpcnN0XCIsIFwiaS1yYW5rLXNlY29uZFwiLCBcImktcmFuay10aGlyZFwiLCBcImktcmFuay1mb3VyXCIsIFwiaS1yYW5rLWZpdmVcIl07XHJcbiAgICBwYXJzZVN3aXRjaDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBsZWZ0Q2hhcnRIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJpZ2h0Q2hhcnRIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgbm9NZXNzYWdlOiBJTm9NZXNzYWdlID0gbm9NZXNzYWdlO1xyXG5cclxuICAgIFJlc291cmNlTmFtZUFycjogYW55ID0gUmVzb3VyY2VOYW1lQXJyO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHE6IGFueSxcclxuICAgICAgICBwcml2YXRlIGVjaGFydEZhY3Rvcnk6IElFY2hhcnRGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgICRzY29wZS4kb24oUmVzb3VyY2VQYWdlVHlwZS5XaUZpLnZhbHVlLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChkYXRhLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5nZXRJbml0UmVxdWlyZSgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaGlkZGVuTGVmdFJpZ2h0Q2hhcnQodGFyZ2V0OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENoYXJ0SGlkZGVuID0gIXRoaXMubGVmdENoYXJ0SGlkZGVuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENoYXJ0SGlkZGVuID0gIXRoaXMucmlnaHRDaGFydEhpZGRlblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXQoY2hhcnREYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IGFyciA9IE9iamVjdC5rZXlzKFdpRmlTdGF0aXN0aWNzTmFtZSkgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgX25vTWVzc2FnZTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB0aGlzLm5vTWVzc2FnZSBhcyBhbnk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVyeUVjaGFydDogYW55ID0gY2hhcnREYXRhICYmIGNoYXJ0RGF0YVthcnJbaV1dID8gY2hhcnREYXRhW2FycltpXV0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lY2hhcnRGYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoYXJyW2ldLCBldmVyeUVjaGFydCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZXJ5RWNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lY2hhcnRGYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoYXJyW2ldLCBldmVyeUVjaGFydCkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvL+ayoeacieaVsOaNriDmmL7npLrmmoLml6DmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBfbm9NZXNzYWdlW2FycltpXV0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub01lc3NhZ2UgPSBfbm9NZXNzYWdlIGFzIGFueTtcclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0RGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEob3RoZXJTdGF0aXN0aWNzTmFtZS5XaWZpQWxsUmFua0xpc3QsIGNoYXJ0RGF0YVtvdGhlclN0YXRpc3RpY3NOYW1lLldpZmlBbGxSYW5rTGlzdF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDkvb/nlKjnvJPlrZjnmoTphY3nva7mlofku7blrp7njrDmlL7lpKfmlYjmnpxcclxuICAgIHB1YmxpYyBlbmxhcmdlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBhbnk7XHJcblxyXG4gICAgICAgIGxldCBzY29wZTogeyBlbmxhcmdlOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCBlbmxhcmdlS2V5OiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEgPSB0aGF0W25hbWVdO1xyXG5cclxuICAgICAgICBzY29wZS5lbmxhcmdlID0gZW5sYXJnZUtleTtcclxuXHJcbiAgICAgICAgaWYgKGVubGFyZ2VLZXkpIHtcclxuICAgICAgICAgICAgbGV0IHNraW46IHN0cmluZyA9ICdlbmxhcmdlRWNoYXJ0IG5vLXNjcm9sbCc7XHJcbiAgICAgICAgICAgIGxldCBhcmVhOiBBcnJheTxzdHJpbmc+ID0gW1wiMTIwMHB4XCIsIFwiNzAwcHhcIl07XHJcbiAgICAgICAgICAgIGlmIChlbmxhcmdlS2V5Lm5hbWUgPT0gXCJBbGxSYW5rTGlzdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5lbmxhcmdlID0gYW5ndWxhci5jb3B5KHRoaXMuQWxsUmFua0xpc3RGb3JFbmxhcmdlKTtcclxuICAgICAgICAgICAgICAgIGFyZWEgPSBbXCI3NTFweFwiLCBcIjUxMXB4XCJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgIHNraW46IHNraW4sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBlbmxhcmdlSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIC8vIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KHRpdGxlKSxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBbZW5sYXJnZUtleS50aXRsZSwgXCJiYWNrZ3JvdW5kLWNvbG9yOiMyRDg3Rjk7Y29sb3I6I2ZmZlwiXSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuaaguaXoOaVsOaNrlwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFdpZmlTdGF0aXN0aWNzKGRhdGE/OiBhbnksIGZsYWc/OiBib29sZWFuKTogQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbiB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUxpc3REYXRhOiBBcnJheTxzdHJpbmc+ID0gZGF0YS54RGF0YSA/IGRhdGEueERhdGEgOiBkYXRhLmRhdGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdykuc2xpY2UoLTUpLCBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuYWxhcm0pLnNsaWNlKC01KV07XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhTGlzdERhdGEpLnNsaWNlKC01KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdyksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5kYXRlTGlzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzZFOTFDNlwiLCBcIiNCNzUyRjhcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy54QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gocmlnaHRfeEF4aXMpO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gW10gYXMgQXJyYXk8Q2hhcnRPcHRpb25zLnlBeGlzPjtcclxuICAgICAgICBsZXQgbGVmdF95QXhpczphbnkgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgbGVmdF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAvLyBsZWZ0X3lBeGlzLm1heCA9IDQwMDAwO1xyXG4gICAgICAgIGxlZnRfeUF4aXMubWluID0gMDtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChsZWZ0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gcmlnaHRfeUF4aXMubWF4ID0gNzAwO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLm1pbiA9IDA7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuYm91bmRhcnlHYXAgPSBbMC4yLCAwLjJdO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnB1c2gocmlnaHRfeUF4aXMpO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtcIua1gemHj+aAu+mHj1wiLCBcIuaKpeitpuaAu+mHj1wiXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBsZWdlbmRcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEucHVzaChsZWdlbmRBcnJheURhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImxpbmVcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QueUF4aXNJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEFyZWFXaWZpU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIC8vIGxldCB4RGF0YSA9IFtcIua0quWxsVwiLFwi5q2m5piMXCIsXCLmsYnlj6NcIixcIuaxiemYs1wiLFwi5rGf5aSPXCJdIGFzIEFycmF5PHN0cmluZz5cclxuICAgICAgICAvLyBsZXQgc2VyaWVzRGF0YSA9IFtcclxuICAgICAgICAvLyAgICAgWzIzMDAwLDMwMDAwLDI1MDAwLDM1MDAwLDI4MDAwXSxcclxuICAgICAgICAvLyAgICAgWzQwMCw1NTAsNTAwLDU4MCw0MDBdXHJcbiAgICAgICAgLy8gXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFt0aGlzLmVjaGFydEZhY3Rvcnkuc2xpY2VBcnJheShkYXRhLnNlcmllcy5mbG93KSwgdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMuYWxhcm0pXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLmZsb3cpLCBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuYWxhcm0pXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzczRENBM1wiLCBcIiNGODc5NTJcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy9kYXRhWm9vbVxyXG4gICAgICAgIG9wdGlvbi5kYXRhWm9vbSA9IFtuZXcgQ2hhcnRPcHRpb25zLmRhdGFab29tKCldO1xyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBbXSBhcyBBcnJheTxDaGFydE9wdGlvbnMueEF4aXM+O1xyXG4gICAgICAgIGxldCBsZWZ0X3hBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBsZWZ0X3hBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gbGVmdF94QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gobGVmdF94QXhpcyk7XHJcbiAgICAgICAgbGV0IHJpZ2h0X3hBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3hBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMuc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5wdXNoKHJpZ2h0X3hBeGlzKTtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy55QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeUF4aXM6YW55ID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIGxlZnRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIC8vIGxlZnRfeUF4aXMubWF4ID0gNDAwMDBcclxuICAgICAgICBsZWZ0X3lBeGlzLm1pbiA9IDA7XHJcbiAgICAgICAgbGVmdF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChsZWZ0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gcmlnaHRfeUF4aXMubWF4ID0gNzAwXHJcbiAgICAgICAgcmlnaHRfeUF4aXMubWluID0gMDtcclxuICAgICAgICByaWdodF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChyaWdodF95QXhpcyk7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW1wi5rWB6YeP5oC76YePXCIsIFwi5oql6K2m5oC76YePXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC55QXhpc0luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcmllc0RhdGEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZWdlbmREYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnhEYXRhKTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiNFRTg3NDFcIiwgXCIjRkZDODIwXCIsIFwiIzZBQTREOFwiLCBcIiNEOEQ4RDhcIiwgXCIjNDQ3MkM0XCJdO1xyXG4gICAgICAgIC8vZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBsZWdlbmREYXRhO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gNTtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zY2FsZSA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmJvdW5kYXJ5R2FwID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBXaWZpVHlwZVN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjMDBBQUZGXCJdO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuTGVnZW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuTGVnZW5kRGF0YSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGRhdGEueERhdGEgPyBkYXRhLnhEYXRhIDogdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzVGljayA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1RpY2soKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSAyMDtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdE51bWJlciA9IDg7XHJcblxyXG4gICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgV2lmaUNvbG9yU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIEFycmF5PEFycmF5PG51bWJlcj4+O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSB0aGlzLmVjaGFydEZhY3Rvcnkuc2xpY2VBcnJheShkYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSAyMDtcclxuXHJcbiAgICAgICAgLy8gbGV0IHhEYXRhID0gW1wi5Lq65ZGY6L2o6L+5XCIsXCLkurrohLjnorDmkp5cIiwgXCLkvLTpmo/liIbmnpBcIiwgXCLkurrohLgxOjFcIiwgXCLkurrohLgxOk5cIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLmludGVydmFsID0gMDtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnJvdGF0ZSA9IDEwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5pdGVtU3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG5cclxuICAgICAgICBsZXQgYXJlYVN0eWxlQ29sb3I6IGFueSA9IG5ldyBDaGFydE9wdGlvbnMuYXJlYVN0eWxlQ29sb3IoW1wiI0Y4QTMxMVwiLCBcIiNBQkQ0RUZcIiwgXCIjMDBENUUyXCIsIFwiI0ZCNzA2MVwiLCBcIiM2QzhDRTRcIiwgXCIjN0NDQ0YyXCJdKTtcclxuICAgICAgICBsZXQgb2JqZWN0OiBhbnkgPSBPYmplY3Q7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUubm9ybWFsID0gJC5leHRlbmQoYXJlYVN0eWxlQ29sb3IuY29sb3JEaWZmKCksIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCk7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbc2VyaWVzRF07XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBXaWZpQWxsUmFua0xpc3QoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBSYW5rbGlzdCA9IGRhdGEuc2VyaWVzIHx8IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KFJhbmtsaXN0KS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShSYW5rbGlzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEodGl0bGU6IHN0cmluZywgZGF0YT86IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAodGl0bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIldpZmlTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiV2lGaee7n+iuoeaAu+mHj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiV2lmaVN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuV2lmaVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuV2lmaVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWZpU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQXJlYVdpZmlTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yy65Z+fV2lGaee7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJlYVdpZmlTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkFyZWFXaWZpU3RhdGlzdGljcyhkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5BcmVhV2lmaVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhV2lmaVN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkFyZWFXaWZpQWxhcm1TdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yy65Z+fV2lGaeaKpeitpue7n+iuoei2i+WKv1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJlYVdpZmlBbGFybVN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuQXJlYVdpZmlBbGFybVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhV2lmaUFsYXJtU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiV2lmaVR5cGVTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiV2lGaeajgOe0ouacjeWKoee7n+iuoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiV2lmaVR5cGVTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLldpZmlUeXBlU3RhdGlzdGljcyhkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5XaWZpVHlwZVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWZpVHlwZVN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIldpZmlDb2xvclN0YXRpc3RpY3NcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJXaUZp6K6+5aSH5oql6K2m57uf6K6hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJXaWZpQ29sb3JTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLldpZmlDb2xvclN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuV2lmaUNvbG9yU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZmlDb2xvclN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIldpZmlBbGxSYW5rTGlzdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIumrmOmikeajgOe0oldpRmnlhbPplK7lrZdcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFsbFJhbmtMaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLldpZmlBbGxSYW5rTGlzdChkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFJhbmtMaXN0Q29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5XaWZpQWxsUmFua0xpc3QoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxSYW5rTGlzdEZvckVubGFyZ2UgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd3aWZpUmVzb3VyY2VDb250cm9sbGVyJywgd2lmaVJlc291cmNlQ29udHJvbGxlcik7Il19
