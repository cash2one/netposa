define(["require", "exports", "text!./enlarge.html", "../../common/app/main.app", "../../common/enum/EchartConfig", "../../../core/entity/Resource", "./echartFactory"], function (require, exports, enlargeHtml, main_app_1, ChartOptions, Resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var noMessage = {
        EFStatistics: false,
        AreaEFStatistics: false,
        AreaEFAlarmStatistics: false,
        EFTypeStatistics: false,
        EFColorStatistics: false
    };
    var EFResourceController = (function () {
        function EFResourceController($scope, $timeout, layer, i18nFactory, $q, echartFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.$q = $q;
            this.echartFactory = echartFactory;
            this.rankClassName = ["i-rank-first", "i-rank-second", "i-rank-third", "i-rank-four", "i-rank-five"];
            this.leftChartHidden = false;
            this.rightChartHidden = false;
            this.noMessage = noMessage;
            this.ResourceNameArr = Resource_1.ResourceNameArr;
            var that = this;
            $scope.$on(Resource_1.ResourcePageType.EFENCE.value, function (event, data) {
                that.init(data);
            });
            this.init();
            that.echartFactory.getInitRequire().then(function (res) {
                that.init(res);
            });
        }
        EFResourceController.prototype.init = function (chartData) {
            var arr = ["EFStatistics", "AreaEFStatistics", "AreaEFAlarmStatistics", "EFTypeStatistics", "EFColorStatistics"];
            var _noMessage = this.noMessage;
            for (var i = 0; i < arr.length; i++) {
                try {
                    var everyChart = chartData && chartData[arr[i]] ? chartData[arr[i]] : null;
                    if (everyChart) {
                        this.echartFactory.initChart(this.setData(arr[i], everyChart));
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
                this.setData("EFAllRankList", chartData["EFAllRankList"]);
            }
        };
        EFResourceController.prototype.hiddenLeftRightChart = function (target) {
            if (target == "left") {
                this.leftChartHidden = !this.leftChartHidden;
            }
            else {
                this.rightChartHidden = !this.rightChartHidden;
            }
        };
        EFResourceController.prototype.enlarge = function (name) {
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
        EFResourceController.prototype.EFStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data) {
                var dataListData = data.xData ? data.xData : data.dateList;
                if (flag) {
                    seriesData = [angular.copy(data.series.flow).splice(-5), angular.copy(data.series.alarm).splice(-5)];
                    xData = angular.copy(dataListData).splice(-5);
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
        EFResourceController.prototype.AreaEFStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data) {
                if (flag) {
                    seriesData = [angular.copy(data.series.flow).splice(0, 5), angular.copy(data.series.alarm).splice(0, 5)];
                    xData = angular.copy(data.legendData).splice(0, 5);
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
        EFResourceController.prototype.AreaEFAlarmStatistics = function (data, flag) {
            var legendData = [];
            var seriesData = [];
            var xData = [];
            if (data) {
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
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#EE8741", "#FFC820", "#6AA4D8", "#D8D8D8", "#4472C4"];
            option.grid = new ChartOptions.grid();
            option.legend = new ChartOptions.legend();
            option.legend.data = legendData;
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
                if (legendData[i]) {
                    var seriesD = new ChartOptions.series();
                    seriesD.name = legendData[i];
                    seriesD.type = "line";
                    seriesD.data = seriesData[i];
                    option.series.push(seriesD);
                }
                else {
                    delete legendData[i];
                }
            }
            return option;
        };
        EFResourceController.prototype.EFTypeStatistics = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#00AAFF"];
            option.series = [];
            var xData = [];
            var seriesData = [];
            if (data) {
                if (flag) {
                    if (!data.legendData) {
                        data.legendData = [];
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
        EFResourceController.prototype.EFColorStatistics = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            var seriesData = [];
            var xData = [];
            if (data) {
                if (flag) {
                    seriesData = angular.copy(data.series).slice(0, 5);
                    xData = angular.copy(data.legendData).slice(0, 5);
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
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
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
            return option;
        };
        EFResourceController.prototype.EFAllRankList = function (data, flag) {
            if (data) {
                if (flag) {
                    return angular.copy(data.series).splice(0, 5);
                }
                else {
                    return angular.copy(data.series);
                }
            }
        };
        EFResourceController.prototype.setData = function (title, data) {
            switch (title) {
                case "EFStatistics": {
                    var option = {
                        title: "电围统计总量",
                        name: "EFStatistics",
                        config: this.EFStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.EFStatistics(data, false);
                    this.EFStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaEFStatistics": {
                    var option = {
                        title: "区域电围统计总量(TOP5)",
                        name: "AreaEFStatistics",
                        config: this.AreaEFStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaEFStatistics(data, false);
                    this.areaEFStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaEFAlarmStatistics": {
                    var option = {
                        title: "区域电围报警统计趋势",
                        name: "AreaEFAlarmStatistics",
                        config: this.AreaEFAlarmStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaEFAlarmStatistics(data, false);
                    this.areaEFAlarmStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "EFTypeStatistics": {
                    var option = {
                        title: "电围检索服务统计",
                        name: "EFTypeStatistics",
                        config: this.EFTypeStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.EFTypeStatistics(data, false);
                    this.EFTypeStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "EFColorStatistics": {
                    var option = {
                        title: "电围设备报警统计",
                        name: "EFColorStatistics",
                        config: this.EFColorStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.EFColorStatistics(data, false);
                    this.EFColorStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "EFAllRankList": {
                    var option = {
                        title: "高频检索关键字",
                        name: "AllRankList",
                        config: this.EFAllRankList(data, true)
                    };
                    this.AllRankListConfig = angular.copy(option);
                    var option2 = angular.copy(option);
                    option2.config = this.EFAllRankList(data, false);
                    this.AllRankListForEnlarge = option2;
                    return option;
                }
            }
        };
        EFResourceController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
        return EFResourceController;
    }());
    main_app_1.app.controller('EFResourceController', EFResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L0VGUmVzb3VyY2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFlQSxJQUFNLFNBQVMsR0FBZTtRQUMxQixZQUFZLEVBQUUsS0FBSztRQUNuQixnQkFBZ0IsRUFBRSxLQUFLO1FBQ3ZCLHFCQUFxQixFQUFFLEtBQUs7UUFDNUIsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixpQkFBaUIsRUFBRSxLQUFLO0tBQzNCLENBQUM7SUFFRjtRQWtCSSw4QkFBb0IsTUFBVyxFQUNuQixRQUFrQixFQUNsQixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsRUFBTyxFQUNQLGFBQTZCO1lBTHJCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQWJ6QyxrQkFBYSxHQUFrQixDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvRyxvQkFBZSxHQUFZLEtBQUssQ0FBQztZQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFHbEMsY0FBUyxHQUFlLFNBQVMsQ0FBQztZQUVsQyxvQkFBZSxHQUFRLDBCQUFlLENBQUM7WUFRbkMsSUFBSSxJQUFJLEdBQUcsSUFBVyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLEtBQVUsRUFBRSxJQUFTO2dCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLGFBQWEsQ0FBQyxj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QUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUVuRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxT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LEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBR25ELE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBR25DLElBQUksT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FB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QUFpQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sQ0FBQyxNQUFNLENBQUE7Z0JBQ2pCLENBQUM7Z0JBQ0QsS0FBSyxlQUFlLEVBQUUsQ0FBQztvQkFDbkIsSUFBSSxNQUFNLEdBQUc7d0JBQ1QsS0FBSyxFQUFFLFNBQVM7d0JBQ2hCLElBQUksRUFBRSxhQUFhO3dCQUNuQixNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3FCQUNWLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUU5QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDO29CQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFuakJNLDRCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBb2pCM0YsMkJBQUM7S0FyakJELEFBcWpCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZXMvY2hhcnQvRUZSZXNvdXJjZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2VubGFyZ2UuaHRtbFwiIG5hbWU9XCJlbmxhcmdlSHRtbFwiIC8+XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vZWNoYXJ0RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJRWNoYXJ0RmFjdG9yeSB9IGZyb20gXCIuL2VjaGFydEZhY3RvcnlcIjtcclxuaW1wb3J0ICogYXMgQ2hhcnRPcHRpb25zIGZyb20gXCIuLi8uLi9jb21tb24vZW51bS9FY2hhcnRDb25maWdcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VOYW1lQXJyLCBSZXNvdXJjZVBhZ2VUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1Jlc291cmNlXCI7XHJcbmRlY2xhcmUgbGV0IGVubGFyZ2VIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgJDogYW55O1xyXG5pbnRlcmZhY2UgSU5vTWVzc2FnZSB7XHJcbiAgICBFRlN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBBcmVhRUZTdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgQXJlYUVGQWxhcm1TdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgRUZUeXBlU3RhdGlzdGljczogYm9vbGVhbixcclxuICAgIEVGQ29sb3JTdGF0aXN0aWNzOiBib29sZWFuLFxyXG59XHJcblxyXG5jb25zdCBub01lc3NhZ2U6IElOb01lc3NhZ2UgPSB7XHJcbiAgICBFRlN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgQXJlYUVGU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBBcmVhRUZBbGFybVN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgRUZUeXBlU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBFRkNvbG9yU3RhdGlzdGljczogZmFsc2VcclxufTtcclxuXHJcbmNsYXNzIEVGUmVzb3VyY2VDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAnaTE4bkZhY3RvcnknLCAnJHEnLCAnZWNoYXJ0RmFjdG9yeSddO1xyXG5cclxuICAgIEVGU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgYXJlYUVGU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgYXJlYUVGQWxhcm1TdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBFRlR5cGVTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBFRkNvbG9yU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQWxsUmFua0xpc3RDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIEFsbFJhbmtMaXN0Rm9yRW5sYXJnZTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgcmFua0NsYXNzTmFtZTogQXJyYXk8c3RyaW5nPiA9IFtcImktcmFuay1maXJzdFwiLCBcImktcmFuay1zZWNvbmRcIiwgXCJpLXJhbmstdGhpcmRcIiwgXCJpLXJhbmstZm91clwiLCBcImktcmFuay1maXZlXCJdO1xyXG4gICAgbGVmdENoYXJ0SGlkZGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICByaWdodENoYXJ0SGlkZGVuOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIG5vTWVzc2FnZTogSU5vTWVzc2FnZSA9IG5vTWVzc2FnZTtcclxuXHJcbiAgICBSZXNvdXJjZU5hbWVBcnI6IGFueSA9IFJlc291cmNlTmFtZUFycjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBlY2hhcnRGYWN0b3J5OiBJRWNoYXJ0RmFjdG9yeVxyXG4gICAgKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICAkc2NvcGUuJG9uKFJlc291cmNlUGFnZVR5cGUuRUZFTkNFLnZhbHVlLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5nZXRJbml0UmVxdWlyZSgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KGNoYXJ0RGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXCJFRlN0YXRpc3RpY3NcIiwgXCJBcmVhRUZTdGF0aXN0aWNzXCIsIFwiQXJlYUVGQWxhcm1TdGF0aXN0aWNzXCIsIFwiRUZUeXBlU3RhdGlzdGljc1wiLCBcIkVGQ29sb3JTdGF0aXN0aWNzXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IF9ub01lc3NhZ2U6IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9ID0gdGhpcy5ub01lc3NhZ2UgYXMgYW55O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlcnlDaGFydDogYW55ID0gY2hhcnREYXRhICYmIGNoYXJ0RGF0YVthcnJbaV1dID8gY2hhcnREYXRhW2FycltpXV0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5lY2hhcnRGYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoYXJyW2ldLCBldmVyeUNoYXJ0KSlcclxuICAgICAgICAgICAgICAgIGlmIChldmVyeUNoYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lY2hhcnRGYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoYXJyW2ldLCBldmVyeUNoYXJ0KSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8v5rKh5pyJ5pWw5o2uIOaYvuekuuaaguaXoOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIF9ub01lc3NhZ2VbYXJyW2ldXSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vTWVzc2FnZSA9IF9ub01lc3NhZ2UgYXMgYW55O1xyXG4gICAgICAgIC8vIHRoaXMuc2V0RGF0YShcIkVGQWxsUmFua0xpc3RcIiwgW10pO1xyXG4gICAgICAgIGlmIChjaGFydERhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKFwiRUZBbGxSYW5rTGlzdFwiLCBjaGFydERhdGFbXCJFRkFsbFJhbmtMaXN0XCJdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZGVuTGVmdFJpZ2h0Q2hhcnQodGFyZ2V0OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENoYXJ0SGlkZGVuID0gIXRoaXMubGVmdENoYXJ0SGlkZGVuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENoYXJ0SGlkZGVuID0gIXRoaXMucmlnaHRDaGFydEhpZGRlblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDkvb/nlKjnvJPlrZjnmoTphY3nva7mlofku7blrp7njrDmlL7lpKfmlYjmnpxcclxuICAgIHB1YmxpYyBlbmxhcmdlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGVubGFyZ2U6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IGVubGFyZ2VLZXk6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSA9IHRoYXRbbmFtZV07XHJcblxyXG4gICAgICAgIHNjb3BlLmVubGFyZ2UgPSBlbmxhcmdlS2V5O1xyXG5cclxuICAgICAgICBpZiAoZW5sYXJnZUtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2tpbjogc3RyaW5nID0gJ2VubGFyZ2VFY2hhcnQgbm8tc2Nyb2xsJztcclxuICAgICAgICAgICAgbGV0IGFyZWE6IEFycmF5PHN0cmluZz4gPSBbXCIxMjAwcHhcIiwgXCI3MDBweFwiXTtcclxuICAgICAgICAgICAgaWYgKGVubGFyZ2VLZXkubmFtZSA9PSBcIkFsbFJhbmtMaXN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmVubGFyZ2UgPSBhbmd1bGFyLmNvcHkodGhpcy5BbGxSYW5rTGlzdEZvckVubGFyZ2UpO1xyXG4gICAgICAgICAgICAgICAgYXJlYSA9IFtcIjc1MXB4XCIsIFwiNTExcHhcIl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogc2tpbixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVubGFyZ2VIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgLy8gdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkodGl0bGUpLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFtlbmxhcmdlS2V5LnRpdGxlLCBcImJhY2tncm91bmQtY29sb3I6IzJEODdGOTtjb2xvcjojZmZmXCJdLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogYXJlYSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi5pqC5peg5pWw5o2uXCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRUZTdGF0aXN0aWNzKGRhdGE/OiBhbnksIGZsYWc/OiBib29sZWFuKTogQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbiB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgZGF0YUxpc3REYXRhOiBBcnJheTxzdHJpbmc+ID0gZGF0YS54RGF0YSA/IGRhdGEueERhdGEgOiBkYXRhLmRhdGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdykuc3BsaWNlKC01KSwgYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLmFsYXJtKS5zcGxpY2UoLTUpXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGFMaXN0RGF0YSkuc3BsaWNlKC01KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLmZsb3cpLCBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuYWxhcm0pXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuZGF0ZUxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNkU5MUM2XCIsIFwiI0I3NTJGOFwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IDU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG5cclxuICAgICAgICAvLyBsZXQgeERhdGEgPSBbXCIwOC0wMVwiLFwiMDgtMDJcIixcIjA4LTAzXCIsXCIwOC0wNFwiLFwiMDgtMDVcIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAvLyBsZXQgc2VyaWVzRGF0YSA9IFtcclxuICAgICAgICAvLyAgICAgWzEwMDAwLDMxMDAwLDIwMDAsMzMwMDAsMjgwMDBdLFxyXG4gICAgICAgIC8vICAgICBbNTAwLDQxMCwxMjAsNTUwLDIwMF1cclxuICAgICAgICAvLyBdIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy54QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gocmlnaHRfeEF4aXMpO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gW10gYXMgQXJyYXk8Q2hhcnRPcHRpb25zLnlBeGlzPjtcclxuICAgICAgICBsZXQgbGVmdF95QXhpczphbnkgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgbGVmdF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAvLyBsZWZ0X3lBeGlzLm1heCA9IDQwMDAwO1xyXG4gICAgICAgIGxlZnRfeUF4aXMubWluID0gMDtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChsZWZ0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gcmlnaHRfeUF4aXMubWF4ID0gNzAwO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLm1pbiA9IDA7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuYm91bmRhcnlHYXAgPSBbMC4yLCAwLjJdO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnNwbGl0TGluZS5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnB1c2gocmlnaHRfeUF4aXMpO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtcIua1gemHj+aAu+mHj1wiLCBcIuaKpeitpuaAu+mHj1wiXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBsZWdlbmRcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEucHVzaChsZWdlbmRBcnJheURhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImxpbmVcIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QueUF4aXNJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMjBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEFyZWFFRlN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICAvLyBsZXQgeERhdGEgPSBbXCLmtKrlsbFcIixcIuatpuaYjFwiLFwi5rGJ5Y+jXCIsXCLmsYnpmLNcIixcIuaxn+Wkj1wiXSBhcyBBcnJheTxzdHJpbmc+XHJcbiAgICAgICAgLy8gbGV0IHNlcmllc0RhdGEgPSBbXHJcbiAgICAgICAgLy8gICAgIFsyMzAwMCwzMDAwMCwyNTAwMCwzNTAwMCwyODAwMF0sXHJcbiAgICAgICAgLy8gICAgIFs0MDAsNTUwLDUwMCw1ODAsNDAwXVxyXG4gICAgICAgIC8vIF0gYXMgYW55XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdykuc3BsaWNlKDAsIDUpLCBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuYWxhcm0pLnNwbGljZSgwLCA1KV07XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLmxlZ2VuZERhdGEpLnNwbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdyksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNzNEQ0EzXCIsIFwiI0Y4Nzk1MlwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IDU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG5cclxuICAgICAgICAvL2RhdGFab29tXHJcbiAgICAgICAgb3B0aW9uLmRhdGFab29tID0gW25ldyBDaGFydE9wdGlvbnMuZGF0YVpvb20oKV07XHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy54QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gocmlnaHRfeEF4aXMpO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gW10gYXMgQXJyYXk8Q2hhcnRPcHRpb25zLnlBeGlzPjtcclxuICAgICAgICBsZXQgbGVmdF95QXhpczphbnkgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gbGVmdF95QXhpcy5tYXggPSA0MDAwMFxyXG4gICAgICAgIGxlZnRfeUF4aXMubWluID0gMDtcclxuICAgICAgICBsZWZ0X3lBeGlzLmJvdW5kYXJ5R2FwID0gWzAuMiwgMC4yXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5wdXNoKGxlZnRfeUF4aXMpO1xyXG5cclxuICAgICAgICBsZXQgcmlnaHRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICAvLyByaWdodF95QXhpcy5tYXggPSA3MDBcclxuICAgICAgICByaWdodF95QXhpcy5taW4gPSAwO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLmJvdW5kYXJ5R2FwID0gWzAuMiwgMC4yXTtcclxuICAgICAgICByaWdodF95QXhpcy5zcGxpdExpbmUuc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5wdXNoKHJpZ2h0X3lBeGlzKTtcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBbXCLmtYHph4/mgLvph49cIiwgXCLmiqXorabmgLvph49cIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEuaWNvbiA9IFwic3RhY2tcIjtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuICAgICAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJsaW5lXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnlBeGlzSW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBcmVhRUZBbGFybVN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0VFODc0MVwiLCBcIiNGRkM4MjBcIiwgXCIjNkFBNEQ4XCIsIFwiI0Q4RDhEOFwiLCBcIiM0NDcyQzRcIl07XHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IGxlZ2VuZERhdGE7XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc2NhbGUgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5ib3VuZGFyeUdhcCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxlZ2VuZERhdGFbaV0pIHtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YVtpXTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBFRlR5cGVTdGF0aXN0aWNzKGRhdGE/OiBhbnksIGZsYWc/OiBib29sZWFuKTogQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbiB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcblxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzAwQUFGRlwiXTtcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcbiAgICAgICAgLy8gbGV0IHhEYXRhID0gW1wiMeaciFwiLCBcIjLmnIhcIiwgXCIz5pyIXCIsIFwiNOaciFwiLCBcIjXmnIhcIiwgXCI25pyIXCJdIGFzIEFycmF5PHN0cmluZz5cclxuICAgICAgICAvLyBsZXQgc2VyaWVzRGF0YSA9IFsxMjAwLCAxNTAwLCAyNTAwLCA0NTAwLCAzNTAwLCAxNjAwXSBhcyBhbnlcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubGVnZW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubGVnZW5kRGF0YSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGRhdGEueERhdGEgPyBkYXRhLnhEYXRhIDogdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzVGljayA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1RpY2soKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSAyMDtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdE51bWJlciA9IDg7XHJcblxyXG4gICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRUZDb2xvclN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBBcnJheTxBcnJheTxudW1iZXI+PjtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKS5zbGljZSgwLCA1KTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSkuc2xpY2UoMCwgNSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDIwO1xyXG4gICAgICAgIC8vIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDQwO1xyXG5cclxuICAgICAgICAvLyBsZXQgeERhdGEgPSBbXCLkurrlkZjovajov7lcIixcIuS6uuiEuOeisOaSnlwiLCBcIuS8tOmaj+WIhuaekFwiLCBcIuS6uuiEuDE6MVwiLCBcIuS6uuiEuDE6TlwiXSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YTtcclxuICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMjA7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsKCk7XHJcblxyXG4gICAgICAgIGxldCBhcmVhU3R5bGVDb2xvcjogYW55ID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGVDb2xvcihbXCIjRjhBMzExXCIsIFwiI0FCRDRFRlwiLCBcIiMwMEQ1RTJcIiwgXCIjRkI3MDYxXCIsIFwiIzZDOENFNFwiLCBcIiM3Q0NDRjJcIl0pO1xyXG4gICAgICAgIGxldCBvYmplY3Q6IGFueSA9IE9iamVjdDtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwgPSAkLmV4dGVuZChhcmVhU3R5bGVDb2xvci5jb2xvckRpZmYoKSwgc2VyaWVzRC5pdGVtU3R5bGUubm9ybWFsKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtzZXJpZXNEXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRUZBbGxSYW5rTGlzdChkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMpLnNwbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEodGl0bGU6IHN0cmluZywgZGF0YT86IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAodGl0bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkVGU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIueUteWbtOe7n+iuoeaAu+mHj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRUZTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkVGU3RhdGlzdGljcyhkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLkVGU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkVGU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQXJlYUVGU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWMuuWfn+eUteWbtOe7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJlYUVGU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5BcmVhRUZTdGF0aXN0aWNzKGRhdGEsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLkFyZWFFRlN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhRUZTdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcmVhRUZBbGFybVN0YXRpc3RpY3NcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLljLrln5/nlLXlm7TmiqXorabnu5/orqHotovlir9cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFyZWFFRkFsYXJtU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5BcmVhRUZBbGFybVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuQXJlYUVGQWxhcm1TdGF0aXN0aWNzKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYUVGQWxhcm1TdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJFRlR5cGVTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi55S15Zu05qOA57Si5pyN5Yqh57uf6K6hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJFRlR5cGVTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkVGVHlwZVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5FRlR5cGVTdGF0aXN0aWNzKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRUZUeXBlU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiRUZDb2xvclN0YXRpc3RpY3NcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLnlLXlm7Torr7lpIfmiqXorabnu5/orqFcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkVGQ29sb3JTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkVGQ29sb3JTdGF0aXN0aWNzKGRhdGEsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLkVGQ29sb3JTdGF0aXN0aWNzKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRUZDb2xvclN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkVGQWxsUmFua0xpc3RcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLpq5jpopHmo4DntKLlhbPplK7lrZdcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFsbFJhbmtMaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkVGQWxsUmFua0xpc3QoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxSYW5rTGlzdENvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuRUZBbGxSYW5rTGlzdChkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFJhbmtMaXN0Rm9yRW5sYXJnZSA9IG9wdGlvbjI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdFRlJlc291cmNlQ29udHJvbGxlcicsIEVGUmVzb3VyY2VDb250cm9sbGVyKTsiXX0=
