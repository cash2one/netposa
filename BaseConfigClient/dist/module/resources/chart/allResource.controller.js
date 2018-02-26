define(["require", "exports", "text!./enlarge.html", "../../common/app/main.app", "../../common/enum/EchartConfig", "lodash", "../../common/enum/EchartConfig", "../../../core/entity/Resource"], function (require, exports, enlargeHtml, main_app_1, ChartOptions, _, EchartConfig_1, Resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var noMessage = {
        ResourceStatisticalTotal: false,
        AreaTotalCollection: false,
        AlarmStatistics: false,
        DataServiceStatistics: false,
        ResourcebRetrievalTrend: false
    };
    var ResourceChartController = (function () {
        function ResourceChartController($scope, $timeout, layer, i18nFactory, $q, echartFactory) {
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
            $scope.$on(Resource_1.ResourcePageType.ALL.value, function (event, data) {
                that.init(data);
            });
            this.init();
            that.echartFactory.getInitRequire().then(function (res) {
                that.init(res);
            });
        }
        ResourceChartController.prototype.init = function (chartData) {
            var that = this;
            var arr = [EchartConfig_1.ResourceStatisticalName.ResourceStatisticalTotal,
                EchartConfig_1.ResourceStatisticalName.AreaTotalCollection, EchartConfig_1.ResourceStatisticalName.AlarmStatistics,
                EchartConfig_1.ResourceStatisticalName.DataServiceStatistics, EchartConfig_1.ResourceStatisticalName.ResourcebRetrievalTrend];
            for (var i = 0; i < arr.length; i++) {
                if (chartData) {
                    var getConfigData = that.setData(arr[i], chartData[arr[i]]);
                    if (getConfigData) {
                        that.echartFactory.initChart(getConfigData);
                    }
                }
                else {
                    that.noMessage[arr[i]] = true;
                }
            }
            if (chartData && chartData["AllRankList"]) {
                that.setData("AllRankList", chartData["AllRankList"]);
            }
        };
        ResourceChartController.prototype.enlarge = function (name) {
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
        ResourceChartController.prototype.hiddenLeftRightChart = function (target) {
            if (target == "left") {
                this.leftChartHidden = !this.leftChartHidden;
            }
            else {
                this.rightChartHidden = !this.rightChartHidden;
            }
        };
        ResourceChartController.prototype.ResourceStatisticalTotal = function (data) {
            var seriesData = [];
            if (data && !_.isEmpty(data.series)) {
                seriesData = [data.series.flow, data.series.alarm];
            }
            else {
                seriesData = [0, 0];
            }
            var option = new ChartOptions.EChartOption();
            var seriesD = new ChartOptions.series();
            seriesD.data = [];
            seriesD.type = "pie";
            seriesD.radius = "65%";
            seriesD.center = ["50%", "55%"];
            seriesD.itemStyle = new ChartOptions.itemStyle();
            option.tooltip.trigger = "item";
            option.tooltip.formatter = "{b} : {c} ({d}%)";
            option.tooltip.position = function (pos, params, dom, rect, size) {
                var obj = { top: 60 };
                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                return obj;
            };
            option.color = ["#396AB1", "#FF5D9E"];
            option.legend.data = [];
            option.legend.top = 5;
            option.series = [];
            var legendData = ["流量总量", "报警总量"];
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesDataA = {};
                seriesDataA.value = seriesData[i];
                seriesDataA.name = legendData[i];
                seriesDataA.label = new ChartOptions.label();
                seriesDataA.label.normal = new ChartOptions.normal();
                seriesDataA.label.normal.formatter = String(seriesData[i]);
                seriesD.data.push(seriesDataA);
            }
            option.series.push(seriesD);
            return option;
        };
        ResourceChartController.prototype.AreaTotalCollection = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data && !_.isEmpty(data.series)) {
                if (flag) {
                    seriesData = [
                        this.echartFactory.sliceArray(data.series.camera),
                        this.echartFactory.sliceArray(data.series.electronicfence),
                        this.echartFactory.sliceArray(data.series.rmpgate),
                        this.echartFactory.sliceArray(data.series.wifi)
                    ];
                    xData = angular.copy(data.legendData).slice(0, 5);
                }
                else {
                    seriesData = [
                        data.series.camera || 0,
                        data.series.electronicfence || 0,
                        data.series.rmpgate || 0,
                        data.series.wifi || 0
                    ];
                    xData = data.legendData;
                }
            }
            else {
                seriesData = [0, 0, 0, 0];
                xData = data.legendData;
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];
            option.legend = new ChartOptions.legend();
            option.legend.top = 5;
            option.legend.data = [];
            var legendData = ["人像", "电围", "车辆", "WI-FI"];
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.data = xData;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisTick = new ChartOptions.axisTick();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.axisLabel.interval = 0;
            option.xAxis.axisLabel.rotate = 15;
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.show = true;
            option.xAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.xAxis.splitLine.lineStyle.interval = false;
            option.xAxis.axisLine.lineStyle.color = "#C9C9C9";
            option.xAxis.axisLine.show = true;
            option.xAxis.axisLabel.textStyle.color = "#6F6E6E";
            option.grid = new ChartOptions.grid();
            option.grid.top = 60;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            option.yAxis.name = "单位：万";
            option.yAxis.nameTextStyle = new ChartOptions.nameTextStyle();
            seriesData = this.echartFactory.getUnitNum(seriesData);
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
                seriesD.barWidth = 20;
                seriesD.label = new ChartOptions.label;
                seriesD.label.normal = new ChartOptions.normal;
                seriesD.label.normal.position = "insideRight";
                seriesD.data = seriesData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        ResourceChartController.prototype.AlarmStatistics = function (data, flag) {
            var seriesData = [];
            var xData = [];
            if (data) {
                var testData = data.xData ? data.xData : data.dateList;
                if (flag) {
                    seriesData = [
                        angular.copy(data.series.camera).slice(-5),
                        angular.copy(data.series.electronicfence).slice(-5),
                        angular.copy(data.series.rmpgate).slice(-5),
                        angular.copy(data.series.wifi).slice(-5)
                    ];
                    xData = angular.copy(testData).slice(-5);
                }
                else {
                    seriesData = [
                        data.series.camera,
                        data.series.electronicfence,
                        data.series.rmpgate,
                        data.series.wifi
                    ];
                    xData = angular.copy(data.dateList);
                }
            }
            else {
                seriesData = [0, 0, 0, 0];
                xData = data.xData;
            }
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];
            option.legend.data = [];
            option.series = [];
            var legendData = [Resource_1.deviceName.person, Resource_1.deviceName.EFENCE, Resource_1.deviceName.Vehicle, Resource_1.deviceName.WiFi];
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
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            option.yAxis.min = 0;
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.type = "line";
                seriesD.data = seriesData[i];
                seriesD.name = legendData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        ResourceChartController.prototype.DataServiceStatistics = function (data) {
            var xData = [];
            var seriesData = [];
            if (data) {
                xData = data.LegendData;
                seriesData = data.series;
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
            option.xAxis.axisLabel.interval = 0;
            option.xAxis.axisLabel.rotate = 15;
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
        ResourceChartController.prototype.ResourcebRetrievalTrend = function (data, flag) {
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#B752F8", "#3D5DE3", "#00A3FB", "#03FBD9"];
            option.legend.data = [];
            option.legend.top = 5;
            option.series = [];
            var legendData = [Resource_1.deviceName.Vehicle, Resource_1.deviceName.person, Resource_1.deviceName.WiFi, Resource_1.deviceName.EFENCE];
            var timeData = [];
            var seriesData = [];
            if (data.series && data.series.rmpgate && data.series.camera && data.series.wifi && data.series.electronicfence) {
                var dataListData = data.xData ? data.xData : data.dateList;
                if (flag) {
                    timeData = dataListData.slice(-5);
                    seriesData = [data.series.rmpgate.slice(-5), data.series.camera.slice(-5), data.series.wifi.slice(-5), data.series.electronicfence.slice(-5)];
                }
                else {
                    timeData = data.dateList;
                    seriesData = [data.series.rmpgate, data.series.camera, data.series.wifi, data.series.electronicfence];
                }
            }
            else {
                seriesData = [];
            }
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.data = timeData;
            option.grid = new ChartOptions.grid();
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            for (var i = 0; i < legendData.length; i++) {
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                var seriesD = new ChartOptions.series();
                seriesD.type = "line";
                seriesD.data = seriesData[i];
                seriesD.name = legendData[i];
                option.series.push(seriesD);
            }
            return option;
        };
        ResourceChartController.prototype.AllRankList = function (data, flag) {
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
        ResourceChartController.prototype.setData = function (title, data) {
            switch (title) {
                case "ResourceStatisticalTotal": {
                    var option = {
                        title: "资源统计总量",
                        name: "ResourceStatisticalTotal",
                        path: "allResource/ResourceStatisticalTotal.json",
                        config: this.ResourceStatisticalTotal(data)
                    };
                    this.ResourceStatisticalTotalConfig = option;
                    return option;
                }
                case "AreaTotalCollection": {
                    var option = {
                        title: "区域分类采集总量",
                        name: "AreaTotalCollection",
                        path: "allResource/AreaTotalCollection.json",
                        config: this.AreaTotalCollection(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AreaTotalCollection(data, false);
                    this.AreaTotalCollectionConfig = angular.copy(option2);
                    return option;
                }
                case "AlarmStatistics": {
                    var option = {
                        title: "资源类型报警统计趋势",
                        name: "AlarmStatistics",
                        path: "allResource/AlarmStatistics.json",
                        config: this.AlarmStatistics(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.AlarmStatistics(data, false);
                    this.AlarmStatisticsConfig = angular.copy(option2);
                    return option;
                }
                case "DataServiceStatistics": {
                    var option = {
                        title: "数据服务统计",
                        name: "DataServiceStatistics",
                        path: "allResource/DataServiceStatistics.json",
                        config: this.DataServiceStatistics(data)
                    };
                    this.DataServiceStatisticsConfig = option;
                    return option;
                }
                case "ResourcebRetrievalTrend": {
                    var option = {
                        title: "资源检索趋势统计",
                        name: "ResourcebRetrievalTrend",
                        path: "allResource/ResourcebRetrievalTrend.json",
                        config: this.ResourcebRetrievalTrend(data, true)
                    };
                    var option2 = angular.copy(option);
                    option2.config = this.ResourcebRetrievalTrend(data, false);
                    this.ResourcebRetrievalTrendConfig = angular.copy(option2);
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
                    this.AllRankListForEnlarge = option2;
                    return option;
                }
            }
        };
        ResourceChartController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', '$q', 'echartFactory'];
        return ResourceChartController;
    }());
    main_app_1.app.controller('ResourceChartController', ResourceChartController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL2NoYXJ0L2FsbFJlc291cmNlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBLElBQU0sU0FBUyxHQUFlO1FBQzFCLHdCQUF3QixFQUFFLEtBQUs7UUFDL0IsbUJBQW1CLEVBQUUsS0FBSztRQUMxQixlQUFlLEVBQUUsS0FBSztRQUN0QixxQkFBcUIsRUFBRSxLQUFLO1FBQzVCLHVCQUF1QixFQUFFLEtBQUs7S0FDakMsQ0FBQztJQUVGO1FBa0JJLGlDQUNZLE1BQVcsRUFDWCxRQUFrQixFQUNsQixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsRUFBTyxFQUNQLGFBQTZCO1lBTDdCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQ1Asa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBYnpDLGtCQUFhLEdBQWtCLENBQUMsY0FBYyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQy9HLG9CQUFlLEdBQVksS0FBSyxDQUFDO1lBQ2pDLHFCQUFnQixHQUFZLEtBQUssQ0FBQztZQUNsQyxjQUFTLEdBQVEsU0FBUyxDQUFDO1lBRTNCLG9CQUFlLEdBQVEsMEJBQWUsQ0FBQztZQVVuQyxJQUFJLElBQUksR0FBRyxJQUErQixDQUFDO1lBQzNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLEtBQVUsRUFBRSxJQUFTO2dCQUNsRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosSUFBSSxDQUFDLGFBQWEsQ0FBQyxj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O1lBRzVDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUc1RCxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFTLENBQUM7WUFFL0IsSUFBSSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQWtCLENBQUM7WUFHOUQsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENB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LENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUU5QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUMvQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsT0FBTyxDQUFDO29CQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUNqQixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUF6Z0JNLCtCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBMGdCM0YsOEJBQUM7S0EzZ0JELEFBMmdCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZXMvY2hhcnQvYWxsUmVzb3VyY2UuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9lbmxhcmdlLmh0bWxcIiBuYW1lPVwiZW5sYXJnZUh0bWxcIiAvPlxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgeyBJRWNoYXJ0RmFjdG9yeSB9IGZyb20gXCIuL2VjaGFydEZhY3RvcnlcIjtcclxuaW1wb3J0ICogYXMgQ2hhcnRPcHRpb25zIGZyb20gXCIuLi8uLi9jb21tb24vZW51bS9FY2hhcnRDb25maWdcIjtcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7IFJlc291cmNlU3RhdGlzdGljYWxOYW1lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBkZXZpY2VOYW1lLCBSZXNvdXJjZU5hbWVBcnIsIFJlc291cmNlUGFnZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUmVzb3VyY2VcIjtcclxuZGVjbGFyZSBsZXQgZW5sYXJnZUh0bWw6IGFueSwgYW5ndWxhcjogYW55O1xyXG5cclxuaW50ZXJmYWNlIElOb01lc3NhZ2Uge1xyXG4gICAgUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsOiBib29sZWFuLFxyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbjogYm9vbGVhbixcclxuICAgIEFsYXJtU3RhdGlzdGljczogYm9vbGVhbixcclxuICAgIERhdGFTZXJ2aWNlU3RhdGlzdGljczogYm9vbGVhbixcclxuICAgIFJlc291cmNlYlJldHJpZXZhbFRyZW5kOiBib29sZWFuLFxyXG59XHJcblxyXG5jb25zdCBub01lc3NhZ2U6IElOb01lc3NhZ2UgPSB7XHJcbiAgICBSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWw6IGZhbHNlLFxyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbjogZmFsc2UsXHJcbiAgICBBbGFybVN0YXRpc3RpY3M6IGZhbHNlLFxyXG4gICAgRGF0YVNlcnZpY2VTdGF0aXN0aWNzOiBmYWxzZSxcclxuICAgIFJlc291cmNlYlJldHJpZXZhbFRyZW5kOiBmYWxzZVxyXG59O1xyXG5cclxuY2xhc3MgUmVzb3VyY2VDaGFydENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICdpMThuRmFjdG9yeScsICckcScsICdlY2hhcnRGYWN0b3J5J107XHJcblxyXG4gICAgLy/lhajpg6hcclxuICAgIFJlc291cmNlU3RhdGlzdGljYWxUb3RhbENvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQXJlYVRvdGFsQ29sbGVjdGlvbkNvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQWxhcm1TdGF0aXN0aWNzQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBEYXRhU2VydmljZVN0YXRpc3RpY3NDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgIFJlc291cmNlYlJldHJpZXZhbFRyZW5kQ29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICBBbGxSYW5rTGlzdENvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgQWxsUmFua0xpc3RGb3JFbmxhcmdlOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcbiAgICByYW5rQ2xhc3NOYW1lOiBBcnJheTxzdHJpbmc+ID0gW1wiaS1yYW5rLWZpcnN0XCIsIFwiaS1yYW5rLXNlY29uZFwiLCBcImktcmFuay10aGlyZFwiLCBcImktcmFuay1mb3VyXCIsIFwiaS1yYW5rLWZpdmVcIl07XHJcbiAgICBsZWZ0Q2hhcnRIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJpZ2h0Q2hhcnRIaWRkZW46IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIG5vTWVzc2FnZTogYW55ID0gbm9NZXNzYWdlO1xyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIFJlc291cmNlTmFtZUFycjogYW55ID0gUmVzb3VyY2VOYW1lQXJyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBlY2hhcnRGYWN0b3J5OiBJRWNoYXJ0RmFjdG9yeSxcclxuICAgICkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcyBhcyBSZXNvdXJjZUNoYXJ0Q29udHJvbGxlcjtcclxuICAgICAgICAkc2NvcGUuJG9uKFJlc291cmNlUGFnZVR5cGUuQUxMLnZhbHVlLCBmdW5jdGlvbiAoZXZlbnQ6IGFueSwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChkYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5nZXRJbml0UmVxdWlyZSgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoYXQuaW5pdChyZXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KGNoYXJ0RGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCB0aGF0OiBSZXNvdXJjZUNoYXJ0Q29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFyciA9IFtSZXNvdXJjZVN0YXRpc3RpY2FsTmFtZS5SZXNvdXJjZVN0YXRpc3RpY2FsVG90YWwsXHJcbiAgICAgICAgUmVzb3VyY2VTdGF0aXN0aWNhbE5hbWUuQXJlYVRvdGFsQ29sbGVjdGlvbiwgUmVzb3VyY2VTdGF0aXN0aWNhbE5hbWUuQWxhcm1TdGF0aXN0aWNzLFxyXG4gICAgICAgIFJlc291cmNlU3RhdGlzdGljYWxOYW1lLkRhdGFTZXJ2aWNlU3RhdGlzdGljcywgUmVzb3VyY2VTdGF0aXN0aWNhbE5hbWUuUmVzb3VyY2ViUmV0cmlldmFsVHJlbmRdIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFydERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBnZXRDb25maWdEYXRhOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEgPSB0aGF0LnNldERhdGEoYXJyW2ldLCBjaGFydERhdGFbYXJyW2ldXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29uZmlnRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuZWNoYXJ0RmFjdG9yeS5pbml0Q2hhcnQoZ2V0Q29uZmlnRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm5vTWVzc2FnZVthcnJbaV1dID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNoYXJ0RGF0YSAmJiBjaGFydERhdGFbXCJBbGxSYW5rTGlzdFwiXSkge1xyXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoXCJBbGxSYW5rTGlzdFwiLCBjaGFydERhdGFbXCJBbGxSYW5rTGlzdFwiXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS9v+eUqOe8k+WtmOeahOmFjee9ruaWh+S7tuWunueOsOaUvuWkp+aViOaenFxyXG4gICAgcHVibGljIGVubGFyZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZW5sYXJnZTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhLCAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBsZXQgZW5sYXJnZUtleTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhID0gdGhhdFtuYW1lXTtcclxuXHJcbiAgICAgICAgc2NvcGUuZW5sYXJnZSA9IGVubGFyZ2VLZXk7XHJcblxyXG4gICAgICAgIGlmIChlbmxhcmdlS2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBza2luOiBzdHJpbmcgPSAnZW5sYXJnZUVjaGFydCBuby1zY3JvbGwnO1xyXG4gICAgICAgICAgICBsZXQgYXJlYTogQXJyYXk8c3RyaW5nPiA9IFtcIjEyMDBweFwiLCBcIjcwMHB4XCJdO1xyXG4gICAgICAgICAgICBpZiAoZW5sYXJnZUtleS5uYW1lID09IFwiQWxsUmFua0xpc3RcIikge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZW5sYXJnZSA9IGFuZ3VsYXIuY29weSh0aGlzLkFsbFJhbmtMaXN0Rm9yRW5sYXJnZSk7XHJcbiAgICAgICAgICAgICAgICBhcmVhID0gW1wiNzUxcHhcIiwgXCI1MTFweFwiXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBza2luOiBza2luLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZW5sYXJnZUh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAvLyB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSh0aXRsZSksXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogW2VubGFyZ2VLZXkudGl0bGUsIFwiYmFja2dyb3VuZC1jb2xvcjojMkQ4N0Y5O2NvbG9yOiNmZmZcIl0sXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBhcmVhLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLmmoLml6DmlbDmja5cIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGlkZGVuTGVmdFJpZ2h0Q2hhcnQodGFyZ2V0OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGFyZ2V0ID09IFwibGVmdFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdENoYXJ0SGlkZGVuID0gIXRoaXMubGVmdENoYXJ0SGlkZGVuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yaWdodENoYXJ0SGlkZGVuID0gIXRoaXMucmlnaHRDaGFydEhpZGRlblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlc291cmNlU3RhdGlzdGljYWxUb3RhbChkYXRhPzogYW55KTogQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbiB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGlmIChkYXRhICYmICFfLmlzRW1wdHkoZGF0YS5zZXJpZXMpKSB7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbZGF0YS5zZXJpZXMuZmxvdywgZGF0YS5zZXJpZXMuYWxhcm1dO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbMCwgMF1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELmRhdGEgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwicGllXCI7XHJcbiAgICAgICAgc2VyaWVzRC5yYWRpdXMgPSBcIjY1JVwiO1xyXG4gICAgICAgIHNlcmllc0QuY2VudGVyID0gW1wiNTAlXCIsIFwiNTUlXCJdO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5pdGVtU3R5bGUoKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiaXRlbVwiO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmZvcm1hdHRlciA9IFwie2J9IDoge2N9ICh7ZH0lKVwiO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLnBvc2l0aW9uID0gZnVuY3Rpb24gKHBvczogQXJyYXk8bnVtYmVyPiwgcGFyYW1zOiBzdHJpbmcsIGRvbTogYW55LCByZWN0OiBhbnksIHNpemU6IGFueSkge1xyXG4gICAgICAgICAgICBsZXQgb2JqOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0geyB0b3A6IDYwIH07XHJcbiAgICAgICAgICAgIG9ialtbJ2xlZnQnLCAncmlnaHQnXVsrKHBvc1swXSA8IHNpemUudmlld1NpemVbMF0gLyAyKV1dID0gNTtcclxuICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICB9O1xyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiMzOTZBQjFcIiwgXCIjRkY1RDlFXCJdO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IDU7XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW1wi5rWB6YeP5oC76YePXCIsIFwi5oql6K2m5oC76YePXCJdO1xyXG5cclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEuaWNvbiA9IFwic3RhY2tcIjtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEYXRhQSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5zZXJpZXNEYXRhQTtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YUEudmFsdWUgPSBzZXJpZXNEYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNEYXRhQS5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YUEubGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGFBLmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGFBLmxhYmVsLm5vcm1hbC5mb3JtYXR0ZXIgPSBTdHJpbmcoc2VyaWVzRGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YS5wdXNoKHNlcmllc0RhdGFBKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQXJlYVRvdGFsQ29sbGVjdGlvbihkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKGRhdGEgJiYgIV8uaXNFbXB0eShkYXRhLnNlcmllcykpIHtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lY2hhcnRGYWN0b3J5LnNsaWNlQXJyYXkoZGF0YS5zZXJpZXMuY2FtZXJhKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVjaGFydEZhY3Rvcnkuc2xpY2VBcnJheShkYXRhLnNlcmllcy5lbGVjdHJvbmljZmVuY2UpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzLnJtcGdhdGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWNoYXJ0RmFjdG9yeS5zbGljZUFycmF5KGRhdGEuc2VyaWVzLndpZmkpXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5sZWdlbmREYXRhKS5zbGljZSgwLCA1KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNlcmllcy5jYW1lcmEgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNlcmllcy5lbGVjdHJvbmljZmVuY2UgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNlcmllcy5ybXBnYXRlIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXJpZXMud2lmaSB8fCAwXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgeERhdGEgPSBkYXRhLmxlZ2VuZERhdGFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgICAgIHhEYXRhID0gZGF0YS5sZWdlbmREYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0I3NTJGOFwiLCBcIiMzRDVERTNcIiwgXCIjMDBBM0ZCXCIsIFwiIzAzRkJEOVwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IDU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IFtcIuS6uuWDj1wiLCBcIueUteWbtFwiLCBcIui9pui+hlwiLCBcIldJLUZJXCJdIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNUaWNrID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzVGljaygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwuaW50ZXJ2YWwgPSAwO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwucm90YXRlID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCI7XHJcblxyXG4gICAgICAgIC8vZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gNjA7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMubmFtZSA9IFwi5Y2V5L2N77ya5LiHXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLm5hbWVUZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLm5hbWVUZXh0U3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNEYXRhID0gdGhpcy5lY2hhcnRGYWN0b3J5LmdldFVuaXROdW0oc2VyaWVzRGF0YSk7XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMjA7XHJcblxyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImluc2lkZVJpZ2h0XCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEFsYXJtU3RhdGlzdGljcyhkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IHRlc3REYXRhOiBBcnJheTxzdHJpbmc+ID0gZGF0YS54RGF0YSA/IGRhdGEueERhdGEgOiBkYXRhLmRhdGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFtcclxuICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXMuY2FtZXJhKS5zbGljZSgtNSksXHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLmVsZWN0cm9uaWNmZW5jZSkuc2xpY2UoLTUpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuY29weShkYXRhLnNlcmllcy5ybXBnYXRlKS5zbGljZSgtNSksXHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzLndpZmkpLnNsaWNlKC01KVxyXG4gICAgICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgICAgICB4RGF0YSA9IGFuZ3VsYXIuY29weSh0ZXN0RGF0YSkuc2xpY2UoLTUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhLnNlcmllcy5jYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXJpZXMuZWxlY3Ryb25pY2ZlbmNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuc2VyaWVzLnJtcGdhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5zZXJpZXMud2lmaVxyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHhEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuZGF0ZUxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICAgICAgeERhdGEgPSBkYXRhLnhEYXRhXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0I3NTJGOFwiLCBcIiMzRDVERTNcIiwgXCIjMDBBM0ZCXCIsIFwiIzAzRkJEOVwiXTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gW2RldmljZU5hbWUucGVyc29uLCBkZXZpY2VOYW1lLkVGRU5DRSwgZGV2aWNlTmFtZS5WZWhpY2xlLCBkZXZpY2VOYW1lLldpRmldIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmJvdW5kYXJ5R2FwID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueUF4aXMubWluID0gMDtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImxpbmVcIjtcclxuICAgICAgICAgICAgc2VyaWVzRC5kYXRhID0gc2VyaWVzRGF0YVtpXTtcclxuICAgICAgICAgICAgc2VyaWVzRC5uYW1lID0gbGVnZW5kRGF0YVtpXTtcclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBEYXRhU2VydmljZVN0YXRpc3RpY3MoZGF0YT86IGFueSk6IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24ge1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBbXSBhcyBhbnk7XHJcblxyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHhEYXRhID0gZGF0YS5MZWdlbmREYXRhO1xyXG4gICAgICAgICAgICBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjMDBBQUZGXCJdO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzVGljayA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc1RpY2soKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC5pbnRlcnZhbCA9IDA7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC5yb3RhdGUgPSAxNTtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLm1hcmdpbiA9IDEwO1xyXG5cclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG5cclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDIwO1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVzb3VyY2ViUmV0cmlldmFsVHJlbmQoZGF0YT86IGFueSwgZmxhZz86IGJvb2xlYW4pOiBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiNCNzUyRjhcIiwgXCIjM0Q1REUzXCIsIFwiIzAwQTNGQlwiLCBcIiMwM0ZCRDlcIl07XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gNTtcclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBbZGV2aWNlTmFtZS5WZWhpY2xlLCBkZXZpY2VOYW1lLnBlcnNvbiwgZGV2aWNlTmFtZS5XaUZpLCBkZXZpY2VOYW1lLkVGRU5DRV0gYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVEYXRhID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBpZiAoZGF0YS5zZXJpZXMgJiYgZGF0YS5zZXJpZXMucm1wZ2F0ZSAmJiBkYXRhLnNlcmllcy5jYW1lcmEgJiYgZGF0YS5zZXJpZXMud2lmaSAmJiBkYXRhLnNlcmllcy5lbGVjdHJvbmljZmVuY2UpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGFMaXN0RGF0YTogQXJyYXk8c3RyaW5nPiA9IGRhdGEueERhdGEgPyBkYXRhLnhEYXRhIDogZGF0YS5kYXRlTGlzdDtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHRpbWVEYXRhID0gZGF0YUxpc3REYXRhLnNsaWNlKC01KTtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbZGF0YS5zZXJpZXMucm1wZ2F0ZS5zbGljZSgtNSksIGRhdGEuc2VyaWVzLmNhbWVyYS5zbGljZSgtNSksIGRhdGEuc2VyaWVzLndpZmkuc2xpY2UoLTUpLCBkYXRhLnNlcmllcy5lbGVjdHJvbmljZmVuY2Uuc2xpY2UoLTUpXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRpbWVEYXRhID0gZGF0YS5kYXRlTGlzdDtcclxuICAgICAgICAgICAgICAgIHNlcmllc0RhdGEgPSBbZGF0YS5zZXJpZXMucm1wZ2F0ZSwgZGF0YS5zZXJpZXMuY2FtZXJhLCBkYXRhLnNlcmllcy53aWZpLCBkYXRhLnNlcmllcy5lbGVjdHJvbmljZmVuY2VdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YSA9IFtdXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYm91bmRhcnlHYXAgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHRpbWVEYXRhO1xyXG5cclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIC8vIG9wdGlvbi55QXhpcy5tYXggPSA0MDAwMFxyXG4gICAgICAgIC8vIG9wdGlvbi55QXhpcy5taW4gPSAwXHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBsZWdlbmRcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEucHVzaChsZWdlbmRBcnJheURhdGEpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICAgICAgc2VyaWVzRC50eXBlID0gXCJsaW5lXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBBbGxSYW5rTGlzdChkYXRhPzogYW55LCBmbGFnPzogYm9vbGVhbik6IGFueSB7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgbGV0IFJhbmtsaXN0ID0gZGF0YS5zZXJpZXMgfHwgW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmNvcHkoUmFua2xpc3QpLnNsaWNlKDAsIDUpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5jb3B5KFJhbmtsaXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RGF0YSh0aXRsZTogc3RyaW5nLCBkYXRhPzogYW55KTogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhIHtcclxuICAgICAgICBzd2l0Y2ggKHRpdGxlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJSZXNvdXJjZVN0YXRpc3RpY2FsVG90YWxcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLotYTmupDnu5/orqHmgLvph49cIixcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlJlc291cmNlU3RhdGlzdGljYWxUb3RhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwiYWxsUmVzb3VyY2UvUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsLmpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9IGFzIENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVzb3VyY2VTdGF0aXN0aWNhbFRvdGFsQ29uZmlnID0gb3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcmVhVG90YWxDb2xsZWN0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yy65Z+f5YiG57G76YeH6ZuG5oC76YePXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBcmVhVG90YWxDb2xsZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJhbGxSZXNvdXJjZS9BcmVhVG90YWxDb2xsZWN0aW9uLmpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBjb25maWc6IHRoaXMuQXJlYVRvdGFsQ29sbGVjdGlvbihkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5BcmVhVG90YWxDb2xsZWN0aW9uKGRhdGEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQXJlYVRvdGFsQ29sbGVjdGlvbkNvbmZpZyA9IGFuZ3VsYXIuY29weShvcHRpb24yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiQWxhcm1TdGF0aXN0aWNzXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6LWE5rqQ57G75Z6L5oql6K2m57uf6K6h6LaL5Yq/XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJBbGFybVN0YXRpc3RpY3NcIixcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcImFsbFJlc291cmNlL0FsYXJtU3RhdGlzdGljcy5qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnOiB0aGlzLkFsYXJtU3RhdGlzdGljcyhkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5BbGFybVN0YXRpc3RpY3MoZGF0YSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BbGFybVN0YXRpc3RpY3NDb25maWcgPSBhbmd1bGFyLmNvcHkob3B0aW9uMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIkRhdGFTZXJ2aWNlU3RhdGlzdGljc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuaVsOaNruacjeWKoee7n+iuoVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRGF0YVNlcnZpY2VTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJhbGxSZXNvdXJjZS9EYXRhU2VydmljZVN0YXRpc3RpY3MuanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5EYXRhU2VydmljZVN0YXRpc3RpY3MoZGF0YSlcclxuICAgICAgICAgICAgICAgIH0gYXMgQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5EYXRhU2VydmljZVN0YXRpc3RpY3NDb25maWcgPSBvcHRpb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBcIlJlc291cmNlYlJldHJpZXZhbFRyZW5kXCI6IHtcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi6LWE5rqQ5qOA57Si6LaL5Yq/57uf6K6hXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJSZXNvdXJjZWJSZXRyaWV2YWxUcmVuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IFwiYWxsUmVzb3VyY2UvUmVzb3VyY2ViUmV0cmlldmFsVHJlbmQuanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5SZXNvdXJjZWJSZXRyaWV2YWxUcmVuZChkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5SZXNvdXJjZWJSZXRyaWV2YWxUcmVuZChkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlc291cmNlYlJldHJpZXZhbFRyZW5kQ29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbjIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJBbGxSYW5rTGlzdFwiOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIumrmOmikeajgOe0ouWFs+mUruWtl1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQWxsUmFua0xpc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBwYXRoOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZzogdGhpcy5BbGxSYW5rTGlzdChkYXRhLCB0cnVlKVxyXG4gICAgICAgICAgICAgICAgfSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFJhbmtMaXN0Q29uZmlnID0gYW5ndWxhci5jb3B5KG9wdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjIgPSBhbmd1bGFyLmNvcHkob3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbjIuY29uZmlnID0gdGhpcy5BbGxSYW5rTGlzdChkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsbFJhbmtMaXN0Rm9yRW5sYXJnZSA9IG9wdGlvbjI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdSZXNvdXJjZUNoYXJ0Q29udHJvbGxlcicsIFJlc291cmNlQ2hhcnRDb250cm9sbGVyKTsiXX0=
