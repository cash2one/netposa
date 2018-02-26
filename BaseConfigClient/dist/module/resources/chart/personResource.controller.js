define(["require", "exports", "text!./enlarge.html", "../../common/app/main.app", "../../common/enum/EchartConfig", "../../../core/entity/Resource", "./echartFactory"], function (require, exports, enlargeHtml, main_app_1, ChartOptions, Resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var noMessage = {
        PersonStatistics: false,
        AreaPersonStatistics: false,
        AreaPersonAlarmStatistics: false,
        PersonTypeStatistics: false,
        PersonColorStatistics: false
    };
    var personResourceController = (function () {
        function personResourceController($scope, $timeout, layer, i18nFactory, $q, echartFactory) {
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
            $scope.$on("Face", function (event, data) {
                that.init(data, true);
            });
            this.init();
            that.echartFactory.getInitRequire().then(function (res) {
                that.init(res);
            });
        }
        personResourceController.prototype.init = function (chartData) {
            var arr = ["PersonStatistics", "AreaPersonStatistics", "AreaPersonAlarmStatistics", "PersonTypeStatistics", "PersonColorStatistics"];
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
                this.setData("AllRankList", chartData["PersonAllRankList"]);
            }
        };
        personResourceController.prototype.enlarge = function (name) {
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
        personResourceController.prototype.hiddenLeftRightChart = function (target) {
            if (target == "left") {
                this.leftChartHidden = !this.leftChartHidden;
            }
            else {
                this.rightChartHidden = !this.rightChartHidden;
            }
        };
        personResourceController.prototype.PersonStatistics = function (data, flag) {
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
        personResourceController.prototype.AreaPersonStatistics = function (data, flag) {
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
        personResourceController.prototype.AreaPersonAlarmStatistics = function (data, flag) {
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
            option.legend.top = 5;
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.data = xData;
            option.xAxis.scale = true;
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
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
        personResourceController.prototype.PersonTypeStatistics = function (data, flag) {
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
        personResourceController.prototype.PersonColorStatistics = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            option.color = ["#FFFF00", "#5B9BD5", "#00B050", "#D9D9D9", "#000000"];
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
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.show = true;
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.lineStyle.interval = false;
            option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
            option.xAxis.axisLine.show = true;
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.xAxis.axisLabel.interval = 0;
            option.xAxis.axisLabel.rotate = 15;
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
            seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);
            option.series = [seriesD];
            delete option.legend;
            return option;
        };
        personResourceController.prototype.AllRankList = function (data, flag) {
            if (data) {
                if (flag && data.series.length) {
                    return angular.copy(data.series).slice(0, 5);
                }
                else {
                    return angular.copy(data.series);
                }
            }
        };
        personResourceController.prototype.setData = function (title, data) {
            switch (title) {
                case "PersonStatistics": {
                    var option = {
                        title: "人员统计总量",
                        name: "PersonStatistics",
                        path: "personResource/PersonStatistics.json",
                        config: this.PersonStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.PersonStatistics(data, false);
                    this.personStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaPersonStatistics": {
                    var option = {
                        title: "区域人员统计总量(TOP5)",
                        name: "AreaPersonStatistics",
                        path: "personResource/AreaPersonStatistics.json",
                        config: this.AreaPersonStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaPersonStatistics(data, false);
                    this.areaPersonStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AreaPersonAlarmStatistics": {
                    var option = {
                        title: "区域人员报警统计趋势",
                        name: "AreaPersonAlarmStatistics",
                        path: "personResource/AreaPersonAlarmStatistics.json",
                        config: this.AreaPersonAlarmStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaPersonAlarmStatistics(data, false);
                    this.areaPersonAlarmStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "PersonTypeStatistics": {
                    var option = {
                        title: "人员检索服务统计",
                        name: "PersonTypeStatistics",
                        path: "personResource/PersonTypeStatistics.json",
                        config: this.PersonTypeStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.PersonTypeStatistics(data, false);
                    this.personTypeStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "PersonColorStatistics": {
                    var option = {
                        title: "人员分析服务统计",
                        name: "PersonColorStatistics",
                        path: "personResource/PersonColorStatistics.json",
                        config: this.PersonColorStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.PersonColorStatistics(data, false);
                    this.personColorStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "AllRankList": {
                    var option = {
                        title: "高频检索关键字",
                        name: "AllRankList",
                        path: "",
                        config: this.AllRankList(data, true)
                    };
                    this.AllRankListConfig = angular.copy(option);
                    var option2 = angular.copy(option);
                    option2.config = this.AllRankList(data, false);
                    this.AllRankListForEnlarge = angular.copy(option2);
                    return option;
                }
            }
        };
        personResourceController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
        return personResourceController;
    }());
    main_app_1.app.controller('personResourceController', personResourceController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L3BlcnNvblJlc291cmNlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZUEsSUFBTSxTQUFTLEdBQWU7UUFDMUIsZ0JBQWdCLEVBQUUsS0FBSztRQUN2QixvQkFBb0IsRUFBRSxLQUFLO1FBQzNCLHlCQUF5QixFQUFFLEtBQUs7UUFDaEMsb0JBQW9CLEVBQUUsS0FBSztRQUMzQixxQkFBcUIsRUFBRSxLQUFLO0tBQy9CLENBQUM7SUFFRjtRQWtCSSxrQ0FBb0IsTUFBVyxFQUNuQixRQUFrQixFQUNsQixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsRUFBTyxFQUNQLGFBQTZCO1lBTHJCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQWJ6QyxrQkFBYSxHQUFrQixDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUMvRyxvQkFBZSxHQUFZLEtBQUssQ0FBQztZQUNqQyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7WUFHbEMsY0FBUyxHQUFlLFNBQVMsQ0FBQztZQUVsQyxvQkFBZSxHQUFRLDBCQUFlLENBQUM7WUFRbkMsSUFBSSxJQUFJLEdBQUcsSUFBVyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBVSxFQUFFLElBQVM7Z0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFRO2dCQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVPLHVDQUFJLEdBQVosVUFBYSxTQUFlO1lBQ3hCLElBQUksR0FBRyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLEVBQUUsMkJBQTJCLEVBQUUsc0JBQXNCLEVBQUUsdUJBQXVCLENBQWtCLENBQUM7WUFDdEosSUFBSSxVQUFVLEdBQStCLElBQUksQ0FBQyxTQUFnQixDQUFDO1lBQ25FLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUM7b0JBQ0QsSUFBSSxXQUFXLEdBQVEsU0FBUyxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBRWpGLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDcEUsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFBO29CQUM3QixDQUFDO2dCQUNMLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBaUIsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDaEUsQ0FBQztRQUNMLENBQUM7UUFHTSwwQ0FBTyxHQUFkLFVBQWUsSUFBWTtZQUN2QixJQUFJLElBQUksR0FBRyxJQUFXLENBQUM7WUFDdkIsSUFBSSxLQUFLLEdBQWlFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0YsSUFBSSxVQUFVLEdBQWdDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6RCxLQUFLLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUUzQixFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksSUFBSSxHQUFXLHlCQUF5QixDQUFDO2dCQUM3QyxJQUFJLElBQUksR0FBa0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbkMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLEtBQUs7b0JBRVosS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxxQ0FBcUMsQ0FBQztvQkFDaEUsSUFBSSxFQUFFLElBQUk7b0JBQ1YsR0FBRyxFQUFFO3dCQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDckIsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDMUIsQ0FBQztRQUNMLENBQUM7UUFFRCx1REFBb0IsR0FBcEIsVUFBcUIsTUFBYztZQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUE7WUFDaEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQTtZQUNsRCxDQUFDO1FBQ0wsQ0FBQztRQUVPLG1EQUFnQixHQUF4QixVQUF5QixJQUFVLEVBQUUsSUFBYztZQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFTLENBQUM7WUFDM0IsSUFBSSxLQUFLLEdBQUcsRUFBbUIsQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNQLElBQUksWUFBWSxHQUFrQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUMxRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkcsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osVUFBVSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hDLENBQUM7WUFDTCxDQUFDO1lBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFN0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUc1QyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBR3RDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQVMsQ0FBQztZQUcvQixNQUFNLENBQUMsS0FBSyxHQUFHLEVBQStCLENBQUM7WUFDL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUMsVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDN0IsVUFBVSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDeEIsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsRCxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BELFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25ELFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDaEQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNoRCxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUVqRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUM5QixXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUcvQixNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBR3RDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBK0IsQ0FBQztZQUMvQyxJQUFJLFVBQVUsR0FBTyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM5QyxVQUFVLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEMsVUFBVSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDMUIsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFakMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFOUIsSUFBSSxXQUFXLEdBQU8sSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0MsV0FBVyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3ZDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBRTNCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLFdBQVcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRS9CLElBQUksVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBa0IsQ0FBQztZQUNuRCxNQUFNLENBQUMsTUFBTSxHQUFHLEVBQWdCLENBQUM7WUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBRXpDLElBQUksZUFBZSxHQUFHLEVBQTJCLENBQUM7Z0JBQ2xELGVBQWUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUM3RCxlQUFlLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEMsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNULE9BQU8sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBO2dCQUN6QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNyQixPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztvQkFDdkIsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7Z0JBQ3pCLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQy9CLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2pCLENBQUM7UUFFTyx1REFBb0IsR0FBNUIsVUFBNkIsSUFBVSxFQUFFLElBQWM7WUFNbkQsSUFBSSxVQUFVLEdBQUcsRUFBUyxDQUFDO1lBQzNCLElBQUksS0FBSyxHQUFHLEVBQW1CLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNqSCxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLFVBQVUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0wsQ0FBQztZQUNELElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRTdDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFNUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUd0QyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFTLENBQUM7WUFHL0IsTUFBTSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFFaEQsTUFBTSxDQUFDLEtBQUssR0FBRyxFQUErQixDQUFDO1lBRS9DLElBQUksVUFBVSxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEQsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNwRCxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3BELFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQyxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRCxVQUFVLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2hELFVBQVUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDaEQsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFHakQsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0MsV0FBVyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDOUIsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFFekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFHL0IsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUd0QyxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQStCLENBQUM7WUFDL0MsSUFBSSxVQUFVLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDMUMsVUFBVSxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3RDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO1lBRTFCLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkQsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTlCLElBQUksV0FBVyxHQUFPLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQy9DLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN2QyxXQUFXLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUUzQixXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNwQixXQUFXLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUvQixJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQWtCLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFnQixDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUV6QyxJQUFJLGVBQWUsR0FBRyxFQUEyQixDQUFDO2dCQUNsRCxlQUFlLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsZUFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDN0QsZUFBZSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDVCxPQUFPLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQTtnQkFDekIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztvQkFDckIsT0FBTyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO2dCQUN6QixDQUFDO2dCQUNELE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU3QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMvQixDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtRQUNqQixDQUFDO1FBRU8sNERBQXlCLEdBQWpDLFVBQWtDLElBQVUsRUFBRSxJQUFjO1lBQ3hELElBQUksVUFBVSxHQUFHLEVBQW1CLENBQUM7WUFDckMsSUFBSSxVQUFVLEdBQUcsRUFBUyxDQUFDO1lBQzNCLElBQUksS0FBSyxHQUFHLEVBQW1CLENBQUM7WUFFaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDUCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xELFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMzQyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0MsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUU3QyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBRTVDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFFdkUsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUV0QyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFHdEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUVsQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZ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VSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlcy9jaGFydC9wZXJzb25SZXNvdXJjZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2VubGFyZ2UuaHRtbFwiIG5hbWU9XCJlbmxhcmdlSHRtbFwiIC8+XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4vZWNoYXJ0RmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBJRWNoYXJ0RmFjdG9yeSB9IGZyb20gXCIuL2VjaGFydEZhY3RvcnlcIjtcclxuaW1wb3J0ICogYXMgQ2hhcnRPcHRpb25zIGZyb20gXCIuLi8uLi9jb21tb24vZW51bS9FY2hhcnRDb25maWdcIjtcclxuaW1wb3J0IHsgUmVzb3VyY2VOYW1lQXJyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1Jlc291cmNlXCI7XHJcbmRlY2xhcmUgbGV0IGVubGFyZ2VIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgJDogYW55O1xyXG5pbnRlcmZhY2UgSU5vTWVzc2FnZSB7XHJcbiAgICBQZXJzb25TdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgQXJlYVBlcnNvblN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzOiBib29sZWFuLFxyXG4gICAgUGVyc29uVHlwZVN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbiAgICBQZXJzb25Db2xvclN0YXRpc3RpY3M6IGJvb2xlYW4sXHJcbn1cclxuXHJcbmNvbnN0IG5vTWVzc2FnZTogSU5vTWVzc2FnZSA9IHtcclxuICAgIFBlcnNvblN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgQXJlYVBlcnNvblN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBQZXJzb25UeXBlU3RhdGlzdGljczogZmFsc2UsXHJcbiAgICBQZXJzb25Db2xvclN0YXRpc3RpY3M6IGZhbHNlXHJcbn07XHJcblxyXG5jbGFzcyBwZXJzb25SZXNvdXJjZUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICdpMThuRmFjdG9yeScsICckcScsICdlY2hhcnRGYWN0b3J5J107XHJcblxyXG4gICAgcGVyc29uU3RhdGlzdGljc0NvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgYXJlYVBlcnNvblN0YXRpc3RpY3NDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIGFyZWFQZXJzb25BbGFybVN0YXRpc3RpY3NDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIHBlcnNvblR5cGVTdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBwZXJzb25Db2xvclN0YXRpc3RpY3NDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIEFsbFJhbmtMaXN0Q29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBBbGxSYW5rTGlzdEZvckVubGFyZ2U6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIHJhbmtDbGFzc05hbWU6IEFycmF5PHN0cmluZz4gPSBbXCJpLXJhbmstZmlyc3RcIiwgXCJpLXJhbmstc2Vjb25kXCIsIFwiaS1yYW5rLXRoaXJkXCIsIFwiaS1yYW5rLWZvdXJcIiwgXCJpLXJhbmstZml2ZVwiXTtcclxuICAgIGxlZnRDaGFydEhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcmlnaHRDaGFydEhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBub01lc3NhZ2U6IElOb01lc3NhZ2UgPSBub01lc3NhZ2U7XHJcblxyXG4gICAgUmVzb3VyY2VOYW1lQXJyOiBhbnkgPSBSZXNvdXJjZU5hbWVBcnI7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IEZ1bmN0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgZWNoYXJ0RmFjdG9yeTogSUVjaGFydEZhY3RvcnlcclxuICAgICkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIkZhY2VcIiwgZnVuY3Rpb24gKGV2ZW50OiBhbnksIGRhdGE6IGFueSkge1xyXG4gICAgICAgICAgICB0aGF0LmluaXQoZGF0YSwgdHJ1ZSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5nZXRJbml0UmVxdWlyZSgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KGNoYXJ0RGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXCJQZXJzb25TdGF0aXN0aWNzXCIsIFwiQXJlYVBlcnNvblN0YXRpc3RpY3NcIiwgXCJBcmVhUGVyc29uQWxhcm1TdGF0aXN0aWNzXCIsIFwiUGVyc29uVHlwZVN0YXRpc3RpY3NcIiwgXCJQZXJzb25Db2xvclN0YXRpc3RpY3NcIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgX25vTWVzc2FnZTogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB0aGlzLm5vTWVzc2FnZSBhcyBhbnk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVyeUVjaGFydDogYW55ID0gY2hhcnREYXRhICYmIGNoYXJ0RGF0YVthcnJbaV1dID8gY2hhcnREYXRhW2FycltpXV0gOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChldmVyeUVjaGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWNoYXJ0RmFjdG9yeS5pbml0Q2hhcnQodGhpcy5zZXREYXRhKGFycltpXSwgZXZlcnlFY2hhcnQpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8v5rKh5pyJ5pWw5o2uIOaYvuekuuaaguaXoOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgICAgIF9ub01lc3NhZ2VbYXJyW2ldXSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub01lc3NhZ2UgPSBfbm9NZXNzYWdlIGFzIGFueTtcclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0RGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoXCJBbGxSYW5rTGlzdFwiLCBjaGFydERhdGFbXCJQZXJzb25BbGxSYW5rTGlzdFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS9v+eUqOe8k+WtmOeahOmFjee9ruaWh+S7tuWunueOsOaUvuWkp+aViOaenFxyXG4gICAgcHVibGljIGVubGFyZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZW5sYXJnZTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhLCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBsZXQgZW5sYXJnZUtleTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhID0gdGhhdFtuYW1lXTtcclxuXHJcbiAgICAgICAgc2NvcGUuZW5sYXJnZSA9IGVubGFyZ2VLZXk7XHJcblxyXG4gICAgICAgIGlmIChlbmxhcmdlS2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBza2luOiBzdHJpbmcgPSAnZW5sYXJnZUVjaGFydCBuby1zY3JvbGwnO1xyXG4gICAgICAgICAgICBsZXQgYXJlYTogQXJyYXk8c3RyaW5nPiA9IFtcIjEyMDBweFwiLCBcIjcwMHB4XCJdO1xyXG4gICAgICAgICAgICBpZiAoZW5sYXJnZUtleS5uYW1lID09IFwiQWxsUmFua0xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZW5sYXJnZSA9IGFuZ3VsYXIuY29weSh0aGlzLkFsbFJhbmtMaXN0Rm9yRW5sYXJnZSk7XHJcbiAgICAgICAgICAgICAgICBhcmVhID0gW1wiNzUxcHhcIiwgXCI1MTFweFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBza2luOiBza2luLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZW5sYXJnZUh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAvLyB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSh0aXRsZSksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogW2VubGFyZ2VLZXkudGl0bGUsIFwiYmFja2dyb3VuZC1jb2xvcjojMkQ4N0Y5O2NvbG9yOiNmZmZcIl0sXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLmmoLml6DmlbDmja5cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZGVuTGVmdFJpZ2h0Q2hhcnQodGFyZ2V0OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENoYXJ0SGlkZGVuID0gIXRoaXMubGVmdENoYXJ0SGlkZGVuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENoYXJ0SGlkZGVuID0gIXRoaXMucmlnaHRDaGFydEhpZGRlblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFBlcnNvblN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhTGlzdERhdGE6IEFycmF5PHN0cmluZz4gPSBkYXRhLnhEYXRhID8gZGF0YS54RGF0YSA6IGRhdGEuZGF0ZUxpc3Q7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gW2FuZ3VsYXIuY29weShkYXRhLnNlcmllcy5mbG93KS5zbGljZSgtNSksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSkuc2xpY2UoLTUpXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGFMaXN0RGF0YSkuc2xpY2UoLTUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFthbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuZmxvdyksIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5hbGFybSldO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM2RTkxQzZcIiwgXCIjQjc1MkY4XCJdO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gNTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBbXSBhcyBBcnJheTxDaGFydE9wdGlvbnMueEF4aXM+O1xyXG4gICAgICAgIGxldCBsZWZ0X3hBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBsZWZ0X3hBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gbGVmdF94QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnB1c2gobGVmdF94QXhpcyk7XHJcbiAgICAgICAgbGV0IHJpZ2h0X3hBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3hBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMuc2hvdyA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5wdXNoKHJpZ2h0X3hBeGlzKTtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy55QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeUF4aXM6YW55ID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIGxlZnRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIGxlZnRfeUF4aXMuYm91bmRhcnlHYXAgPSBbMC4yLCAwLjJdO1xyXG4gICAgICAgIGxlZnRfeUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgbGVmdF95QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgLy8gbGVmdF95QXhpcy5tYXggPSA0MDAwMDtcclxuICAgICAgICBsZWZ0X3lBeGlzLm1pbiA9IDA7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnB1c2gobGVmdF95QXhpcyk7XHJcblxyXG4gICAgICAgIGxldCByaWdodF95QXhpczphbnkgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICAvLyByaWdodF95QXhpcy5tYXggPSA3MDA7XHJcbiAgICAgICAgcmlnaHRfeUF4aXMubWluID0gMDtcclxuICAgICAgICByaWdodF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChyaWdodF95QXhpcyk7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW1wi5rWB6YeP5oC76YePXCIsIFwi5oql6K2m5oC76YePXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC55QXhpc0luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQXJlYVBlcnNvblN0YXRpc3RpY3MoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICAvLyBsZXQgeERhdGEgPSBNb2NrQXJlYVN0YXRpc3RpY0xpc3QoMSlbMF0uYXJlYS5zbGljZSgwLDUpIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgLy8gbGV0IHNlcmllc0RhdGEgPSBbXHJcbiAgICAgICAgLy8gICAgIFsxMDAwMCwzMTAwMCwyMDAwMCwzMzAwMCwyODAwMF0sXHJcbiAgICAgICAgLy8gICAgIFs1MDAsNDEwLDEyMCw1NTAsMjAwXVxyXG4gICAgICAgIC8vIF0gYXMgYW55O1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMuZmxvdyksIHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzLmFsYXJtKV07XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLmZsb3cpLCBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuYWxhcm0pXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzczRENBM1wiLCBcIiNGODc5NTJcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuXHJcbiAgICAgICAgLy9kYXRhWm9vbVxyXG4gICAgICAgIG9wdGlvbi5kYXRhWm9vbSA9IFtuZXcgQ2hhcnRPcHRpb25zLmRhdGFab29tKCldO1xyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBbXSBhcyBBcnJheTxDaGFydE9wdGlvbnMueEF4aXM+O1xyXG5cclxuICAgICAgICBsZXQgbGVmdF94QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgbGVmdF94QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgbGVmdF94QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgbGVmdF94QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBsZWZ0X3hBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIGxlZnRfeEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG5cclxuICAgICAgICAvLyBsZWZ0X3hBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCJcclxuICAgICAgICBvcHRpb24ueEF4aXMucHVzaChsZWZ0X3hBeGlzKTtcclxuICAgICAgICBsZXQgcmlnaHRfeEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgcmlnaHRfeEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICByaWdodF94QXhpcy5zaG93ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIG9wdGlvbi54QXhpcy5wdXNoKHJpZ2h0X3hBeGlzKTtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IFtdIGFzIEFycmF5PENoYXJ0T3B0aW9ucy55QXhpcz47XHJcbiAgICAgICAgbGV0IGxlZnRfeUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgbGVmdF95QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gbGVmdF95QXhpcy5tYXggPSA0MDAwMFxyXG4gICAgICAgIGxlZnRfeUF4aXMubWluID0gMDtcclxuICAgICAgICBsZWZ0X3lBeGlzLmJvdW5kYXJ5R2FwID0gWzAuMiwgMC4yXTtcclxuICAgICAgICBsZWZ0X3lBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIGxlZnRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5wdXNoKGxlZnRfeUF4aXMpO1xyXG5cclxuICAgICAgICBsZXQgcmlnaHRfeUF4aXM6YW55ID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIHJpZ2h0X3lBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgLy8gcmlnaHRfeUF4aXMubWF4ID0gNzAwXHJcbiAgICAgICAgcmlnaHRfeUF4aXMubWluID0gMDtcclxuICAgICAgICByaWdodF95QXhpcy5ib3VuZGFyeUdhcCA9IFswLjIsIDAuMl07XHJcbiAgICAgICAgcmlnaHRfeUF4aXMuc3BsaXRMaW5lLnNob3cgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMucHVzaChyaWdodF95QXhpcyk7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW1wi5rWB6YeP5oC76YePXCIsIFwi5oql6K2m5oC76YePXCJdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRC55QXhpc0luZGV4ID0gMTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgbGVnZW5kRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEubGVnZW5kRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlZ2VuZERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEueERhdGEpO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnNlcmllcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0VFODc0MVwiLCBcIiNGRkM4MjBcIiwgXCIjNkFBNEQ4XCIsIFwiI0Q4RDhEOFwiLCBcIiM0NDcyQzRcIl07XHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IGxlZ2VuZERhdGE7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA1O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNjYWxlID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYm91bmRhcnlHYXAgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBQZXJzb25UeXBlU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG5cclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiMwMEFBRkZcIl07XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEubGVnZW5kRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEubGVnZW5kRGF0YSA9IFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGRhdGEueERhdGEgPyBkYXRhLnhEYXRhIDogdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5kYXRlTGlzdCk7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzVGljayA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1RpY2soKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC5pbnRlcnZhbCA9MDtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnJvdGF0ZSA9IDE1O1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcblxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gMjA7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXROdW1iZXIgPSA4O1xyXG5cclxuICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgc2VyaWVzRC50eXBlID0gXCJiYXJcIjtcclxuICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhO1xyXG4gICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAyMDtcclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9wdGlvbikpXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUGVyc29uQ29sb3JTdGF0aXN0aWNzKGRhdGE/OiBhbnksIGZsYWc/OiBib29sZWFuKTogQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbiB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiNGRkZGMDBcIiwgXCIjNUI5QkQ1XCIsIFwiIzAwQjA1MFwiLCBcIiNEOUQ5RDlcIiwgXCIjMDAwMDAwXCJdO1xyXG4gICAgICAgIC8vIGxldCBzZXJpZXNEYXRhID0gTW9ja051bWJlcig1MDAwMCw1LDEpIGFzIEFycmF5PEFycmF5PG51bWJlcj4+O1xyXG4gICAgICAgIC8vIGxldCB4RGF0YSA9IFsnMeaciCcsJzLmnIgnLCcz5pyIJywnNOaciCcsJzXmnIgnXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgQXJyYXk8QXJyYXk8bnVtYmVyPj47XHJcbiAgICAgICAgbGV0IHhEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLnNlcmllcykuc2xpY2UoMCwgNSk7XHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhLmxlZ2VuZERhdGEpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEubGVnZW5kRGF0YSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSAyMDtcclxuXHJcbiAgICAgICAgLy8gbGV0IHhEYXRhID0gW1wi5Lq65ZGY6L2o6L+5XCIsXCLkurrohLjnorDmkp5cIiwgXCLkvLTpmo/liIbmnpBcIiwgXCLkurrohLgxOjFcIiwgXCLkurrohLgxOk5cIl0gYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLmludGVydmFsID0gMDtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnJvdGF0ZSA9IDE1O1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiXHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YTtcclxuICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMjA7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsKCk7XHJcblxyXG4gICAgICAgIGxldCBhcmVhU3R5bGVDb2xvcjogYW55ID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGVDb2xvcihbXCIjRjhBMzExXCIsIFwiI0FCRDRFRlwiLCBcIiMwMEQ1RTJcIiwgXCIjRkI3MDYxXCIsIFwiIzZDOENFNFwiLCBcIiM3Q0NDRjJcIl0pO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9ICQuZXh0ZW5kKGFyZWFTdHlsZUNvbG9yLmNvbG9yRGlmZigpLCBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwpO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW3Nlcmllc0RdO1xyXG5cclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZDtcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBbGxSYW5rTGlzdChkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGZsYWcgJiYgZGF0YS5zZXJpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzKS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEodGl0bGU6IHN0cmluZywgZGF0YT86IGFueSkge1xyXG4gICAgICAgIHN3aXRjaCAodGl0bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIlBlcnNvblN0YXRpc3RpY3NcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLkurrlkZjnu5/orqHmgLvph49cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBlcnNvblN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInBlcnNvblJlc291cmNlL1BlcnNvblN0YXRpc3RpY3MuanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8v5ZCM5q+U5YiG5p6Q5YiH5o2iXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLlBlcnNvblN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuUGVyc29uU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25TdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcmVhUGVyc29uU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWMuuWfn+S6uuWRmOe7n+iuoeaAu+mHjyhUT1A1KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJlYVBlcnNvblN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInBlcnNvblJlc291cmNlL0FyZWFQZXJzb25TdGF0aXN0aWNzLmpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuQXJlYVBlcnNvblN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuQXJlYVBlcnNvblN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhUGVyc29uU3RhdGlzdGljc0NvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuWMuuWfn+S6uuWRmOaKpeitpue7n+iuoei2i+WKv1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwicGVyc29uUmVzb3VyY2UvQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljcy5qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkFyZWFQZXJzb25BbGFybVN0YXRpc3RpY3MoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuQXJlYVBlcnNvbkFsYXJtU3RhdGlzdGljcyhkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyZWFQZXJzb25BbGFybVN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIlBlcnNvblR5cGVTdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5Lq65ZGY5qOA57Si5pyN5Yqh57uf6K6hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJQZXJzb25UeXBlU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwicGVyc29uUmVzb3VyY2UvUGVyc29uVHlwZVN0YXRpc3RpY3MuanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5QZXJzb25UeXBlU3RhdGlzdGljcyhkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uMiA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uMi5jb25maWcgPSB0aGlzLlBlcnNvblR5cGVTdGF0aXN0aWNzKGRhdGEsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblR5cGVTdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJQZXJzb25Db2xvclN0YXRpc3RpY3NcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLkurrlkZjliIbmnpDmnI3liqHnu5/orqFcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlBlcnNvbkNvbG9yU3RhdGlzdGljc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwicGVyc29uUmVzb3VyY2UvUGVyc29uQ29sb3JTdGF0aXN0aWNzLmpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuUGVyc29uQ29sb3JTdGF0aXN0aWNzKGRhdGEsIHRydWUpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuUGVyc29uQ29sb3JTdGF0aXN0aWNzKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uQ29sb3JTdGF0aXN0aWNzQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYXNlIFwiQWxsUmFua0xpc3RcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLpq5jpopHmo4DntKLlhbPplK7lrZdcIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkFsbFJhbmtMaXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuQWxsUmFua0xpc3QoZGF0YSwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxSYW5rTGlzdENvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24yID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24yLmNvbmZpZyA9IHRoaXMuQWxsUmFua0xpc3QoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGxSYW5rTGlzdEZvckVubGFyZ2UgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdwZXJzb25SZXNvdXJjZUNvbnRyb2xsZXInLCBwZXJzb25SZXNvdXJjZUNvbnRyb2xsZXIpOyJdfQ==
