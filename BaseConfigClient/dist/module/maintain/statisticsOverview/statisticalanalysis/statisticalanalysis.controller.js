define(["require", "exports", "../../../common/app/main.app", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "../../main/maintainFactory", "css!module/maintain/css/statisticalanalysis.css", "../../main/maintainFactory", "../../../common/services/maintain.service", "moment"], function (require, exports, main_app_1, ChartOptions, maintainEnum_1, maintainFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var statisticAlanalysisController = /** @class */ (function () {
        function statisticAlanalysisController($scope, $timeout, maintainFactory, maintainService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.maintainFactory = maintainFactory;
            this.maintainService = maintainService;
            this.StatisticsOverview = maintainEnum_1.StatisticsOverviewArr;
            this.getAllData();
            $scope.$on('initChart', function (evt, opt) {
                _this.getAllData();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        statisticAlanalysisController.prototype.getAllData = function (chartData) {
            var that = this;
            // 获取设备数据
            this.deviceStatistics();
            // 任务统计
            this.maintainService.taskStatisticsTotal().then(function (res) {
                var chartConfig = that.setData(maintainEnum_1.statisticalAnalysisModuleName.taskStatistics, res.data);
                that.maintainFactory.initChart(chartConfig);
            });
            // 报警统计
            var paramsSecond = this.maintainFactory.alarmParams();
            this.maintainService.alarmStatistics(paramsSecond).then(function (res) {
                var chartConfig = that.setData(maintainEnum_1.statisticalAnalysisModuleName.alarmStatistics, res.data);
                that.maintainFactory.initChart(chartConfig);
            });
            // 流量统计
            this.maintainService.trafficStatistics().then(function (res) {
                var chartConfig = that.setData(maintainEnum_1.statisticalAnalysisModuleName.trafficStatistics, res.data);
                that.maintainFactory.initChart(chartConfig);
            });
            // 检索统计
            var RetrievalParams = this.maintainFactory.RetrievalParams();
            this.maintainService.retrievalStatistics(RetrievalParams).then(function (res) {
                var chartConfig = that.setData(maintainEnum_1.statisticalAnalysisModuleName.retrievalStatistics, res.data);
                that.maintainFactory.initChart(chartConfig);
            });
            // 分析统计
            this.maintainService.analysissTatistics().then(function (res) {
                var chartConfig = that.setData(maintainEnum_1.statisticalAnalysisModuleName.analysissTatistics, res.data);
                that.maintainFactory.initChart(chartConfig);
            });
        };
        ;
        // 设备统计
        statisticAlanalysisController.prototype.deviceStatistics = function () {
            var that = this;
            var statisticsOverview = maintainEnum_1.StatisticsOverviewArr;
            that.maintainService.getDevicesStatus().then(function (res) {
                if (res && res.data) {
                    statisticsOverview.forEach(function (item, index) {
                        res.data.forEach(function (itemChild) {
                            if (item.type == itemChild.title) {
                                statisticsOverview[index].online = itemChild.online;
                                statisticsOverview[index].alarm = itemChild.alarm;
                                statisticsOverview[index].total = itemChild.total;
                            }
                        });
                    });
                    that.StatisticsOverview = statisticsOverview;
                }
            });
        };
        // 任务统计
        statisticAlanalysisController.prototype.taskStatistics = function (data) {
            var option = new ChartOptions.EChartOption();
            //title
            option.title = new ChartOptions.title();
            option.title.text = this.getTotel(data.seriesData);
            option.title.subtext = '任务总数';
            option.title.top = '8';
            option.title.left = '15';
            //tooltip
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = 'item';
            option.tooltip.position = ['0%', '50%'];
            //color
            option.color = ["#7CCCF2", "#6C8CE4", "#DCBE99", "#FB7061"];
            // 合并感知数据//legend
            var legendData = [data.legendData[0], data.legendData[1], data.legendData[2], data.legendData[5]];
            var seriesData = [data.seriesData[0], data.seriesData[1], data.seriesData[2] + data.seriesData[3] + data.seriesData[4], data.seriesData[5]];
            option.legend.data = legendData;
            option.legend.orient = "vertical";
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 10;
            option.legend.top = 70;
            delete option.legend.left;
            option.legend.right = "100px";
            option.legend.itemGap = 20;
            //series
            option.series = [];
            var series_todo = new ChartOptions.series();
            series_todo.type = "pie";
            series_todo.radius = ['35%', '55%'];
            series_todo.center = ['15%', '50%'];
            series_todo.label = new ChartOptions.label();
            series_todo.label.normal = new ChartOptions.normal();
            series_todo.label.normal.position = "left";
            series_todo.label.normal.show = false;
            series_todo.labelLine = new ChartOptions.labelLine();
            series_todo.labelLine.normal = new ChartOptions.normal();
            series_todo.labelLine.normal.show = false;
            series_todo.itemStyle = new ChartOptions.itemStyle();
            series_todo.itemStyle.normal = new ChartOptions.normal();
            series_todo.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
            series_todo.itemStyle.normal.shadowOffsetY = 10;
            series_todo.itemStyle.normal.shadowBlur = 7;
            series_todo.data = [];
            for (var i = 0; i < legendData.length; i++) {
                var seriesDataA = {};
                seriesDataA.value = seriesData[i];
                seriesDataA.name = legendData[i];
                series_todo.data.push(seriesDataA);
            }
            option.series.push(series_todo);
            return option;
        };
        // 报警统计
        statisticAlanalysisController.prototype.alarmStatistics = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            //tooltip
            option.tooltip = new ChartOptions.tooltip();
            //color
            option.color = ["#6c8ce4", "#7cccf2", "#dcbe99"];
            //legend
            option.legend = new ChartOptions.legend();
            option.legend.top = "10px";
            delete option.legend.left;
            option.legend.right = "20px";
            option.legend.data = [];
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 10;
            option.legend.itemGap = 40;
            var legendData = data.legendData;
            //xAxis
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
            // option.xAxis.axisLabel.textStyle.fontSize = "10";
            //grid
            option.grid = new ChartOptions.grid();
            option.grid.top = 45;
            option.grid.bottom = 20;
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = ["#F8F0E9"];
            option.yAxis.splitLine.show = true;
            option.series = [];
            for (var i = 0; i < legendData.length; i++) {
                // legend
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                legendArrayData.icon = "stack";
                option.legend.data.push(legendArrayData);
                // series
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
            // console.log(JSON.stringify(option))
            return option;
        };
        // 流量统计
        statisticAlanalysisController.prototype.trafficStatistics = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            var text = data.totalNum || 0;
            // title
            option.title = new ChartOptions.title();
            option.title.text = text;
            option.title.subtext = "流量统计";
            option.title.top = '8';
            option.title.left = '15';
            //tooltop
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            // color
            option.color = ["#7CCCF2", "#6C8CE4", "#f8a619", "#00d5e2"];
            // legend
            var legendData = data.legendData;
            option.legend.data = [];
            option.legend.top = "20px";
            delete option.legend.left;
            option.legend.right = "20px";
            option.legend.itemWidth = 20;
            option.legend.itemHeight = 10;
            option.legend.itemGap = 30;
            option.legend.icon = null;
            // let xData = ["08-01","08-02","08-03","08-04","08-05"] as Array<string>
            //xAxis
            option.xAxis = new ChartOptions.xAxis();
            option.xAxis.type = "category";
            option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.data = xData;
            // grid
            option.grid = new ChartOptions.grid();
            option.grid.top = 80;
            option.grid.bottom = 20;
            //yAxis
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.type = "value";
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            // option.yAxis.min = 0
            // option.yAxis.max = 40000
            option.series = [];
            //渐变颜色
            var areaColor = ["124,204,242", "108,140,228", "248,166,25", "0,213,226"];
            for (var i = 0; i < legendData.length; i++) {
                // legend
                var legendArrayData = {};
                legendArrayData.name = legendData[i];
                legendArrayData.textStyle = new ChartOptions.dataStyleText();
                option.legend.data.push(legendArrayData);
                // series
                var seriesD = new ChartOptions.series();
                seriesD.type = "line";
                seriesD.data = seriesData[i];
                seriesD.name = legendData[i];
                var areaStyleColor = new ChartOptions.areaStyleColor(areaColor[i]);
                seriesD.areaStyle = new ChartOptions.areaStyle();
                seriesD.areaStyle.normal = new ChartOptions.ObjectNormal();
                seriesD.areaStyle.normal = areaStyleColor.getColor();
                option.series.push(seriesD);
            }
            return option;
        };
        // 检索统计 
        statisticAlanalysisController.prototype.retrievalStatistics = function (data) {
            var option = new ChartOptions.EChartOption();
            var seriesData = data.seriesData;
            var yData = data.yData;
            //tooltip
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.tooltip.axisPointer = new ChartOptions.axisPointer();
            option.tooltip.axisPointer.type = "line";
            // option.tooltip.axisPointer.type = "cross";
            //color
            option.color = ["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"];
            //grid
            option.grid = new ChartOptions.grid();
            option.grid.right = 30;
            option.grid.bottom = 20;
            //xAxis
            option.xAxis = new ChartOptions.xAxis();
            // option.xAxis.boundaryGap = false;
            option.xAxis.axisLine = new ChartOptions.axisLine();
            option.xAxis.axisLabel = new ChartOptions.axisLabel();
            option.xAxis.splitLine = new ChartOptions.splitLine();
            option.xAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.xAxis.splitLine.show = true;
            option.xAxis.type = "value";
            //yAxis
            option.yAxis = new ChartOptions.yAxis();
            option.yAxis.splitLine.lineStyle.color = "#F8F0E9";
            option.yAxis.splitLine.show = true;
            option.yAxis.type = "category";
            option.yAxis.data = yData;
            //series
            option.series = [];
            var seriesD = new ChartOptions.series();
            seriesD.type = 'bar';
            seriesD.data = seriesData;
            seriesD.barWidth = 12;
            seriesD.itemStyle = new ChartOptions.itemStyle();
            seriesD.itemStyle.normal = new ChartOptions.normal();
            seriesD.itemStyle.normal.barBorderRadius = [0, 50, 50, 0];
            var areaStyleColor = new ChartOptions.areaStyleColor(["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"]);
            seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);
            option.series.push(seriesD);
            delete option.legend;
            return option;
        };
        // 分析统计
        statisticAlanalysisController.prototype.analysissTatistics = function (data) {
            var option = new ChartOptions.EChartOption();
            var seriesData = data.seriesData;
            var legendData = data.legendData;
            //tooltip
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = 'item';
            option.tooltip.position = ['0%', '50%'];
            //color
            option.color = ["#7CCCF2", "#6C8CE4", "#DCBE99"];
            //legend
            option.legend.data = legendData;
            option.legend.orient = "vertical";
            option.legend.itemWidth = 15;
            option.legend.itemHeight = 10;
            option.legend.top = "95px";
            option.legend.left = "550px";
            option.legend.itemGap = 25;
            //series
            option.series = [];
            var series_todo = new ChartOptions.series();
            series_todo.type = "pie";
            series_todo.radius = ['30%', '50%'];
            series_todo.center = ['15%', '40%'];
            series_todo.label = new ChartOptions.label();
            series_todo.label.normal = new ChartOptions.normal();
            series_todo.label.normal.position = "left";
            series_todo.label.normal.show = false;
            series_todo.labelLine = new ChartOptions.labelLine();
            series_todo.labelLine.normal = new ChartOptions.normal();
            series_todo.labelLine.normal.show = false;
            series_todo.itemStyle = new ChartOptions.itemStyle();
            series_todo.itemStyle.normal = new ChartOptions.normal();
            series_todo.itemStyle.normal.shadowColor = 'rgba(2, 52, 123, 0.2)';
            series_todo.itemStyle.normal.shadowOffsetY = 10;
            series_todo.itemStyle.normal.shadowBlur = 7;
            series_todo.data = [];
            if (legendData) {
                for (var i = 0; i < legendData.length; i++) {
                    var seriesDataA = {};
                    seriesDataA.value = seriesData[i];
                    seriesDataA.name = legendData[i];
                    series_todo.data.push(seriesDataA);
                }
            }
            option.series.push(series_todo);
            // console.log(JSON.stringify(option));
            return option;
        };
        statisticAlanalysisController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            switch (name) {
                case 'taskStatistics': {
                    option.config = this.taskStatistics(data);
                    return option;
                }
                case 'alarmStatistics': {
                    option.config = this.alarmStatistics(data);
                    return option;
                }
                case 'trafficStatistics': {
                    option.config = this.trafficStatistics(data);
                    return option;
                }
                case 'retrievalStatistics': {
                    option.config = this.retrievalStatistics(data);
                    return option;
                }
                case 'analysissTatistics': {
                    option.config = this.analysissTatistics(data);
                    return option;
                }
            }
        };
        statisticAlanalysisController.prototype.getTotel = function (data) {
            var newArr = [];
            var getString = function (list) {
                if (Array.isArray(list)) {
                    list.forEach(function (result) {
                        getString(result);
                    });
                }
                else {
                    newArr.push(list);
                }
            };
            getString(data);
            return newArr.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        };
        statisticAlanalysisController.$inject = ["$scope", "$timeout", "maintainFactory", "maintainService"];
        return statisticAlanalysisController;
    }());
    main_app_1.app.controller('statisticalAnalysisController', statisticAlanalysisController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXRpc3RpY2FsYW5hbHlzaXMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnQkE7UUFNSSx1Q0FBb0IsTUFBVyxFQUNuQixRQUFhLEVBQ2IsZUFBb0IsRUFDcEIsZUFBaUM7WUFIN0MsaUJBYUM7WUFibUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isb0JBQWUsR0FBZixlQUFlLENBQUs7WUFDcEIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBTjdDLHVCQUFrQixHQUE4QixvQ0FBcUIsQ0FBQztZQU9sRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFRLEVBQUUsR0FBUTtnQkFDdkMsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ25CLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFHUCxDQUFDO1FBRU8sa0RBQVUsR0FBbEIsVUFBbUIsU0FBZTtZQUM5QixJQUFJLElBQUksR0FBUSxJQUFJLENBQUM7WUFFckIsU0FBUztZQUNULElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLE9BQU87WUFDUCxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUTtnQkFDckQsSUFBSSxXQUFXLEdBQWdDLElBQUksQ0FBQyxPQUFPLENBQUMsNENBQTZCLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPO1lBQ1AsSUFBSSxZ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LEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQXVkbEYsb0NBQUM7S0F6ZEQsQUF5ZEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsK0JBQStCLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyIsImZpbGUiOiJzdGF0aXN0aWNhbGFuYWx5c2lzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhbW9kdWxlL21haW50YWluL2Nzcy9zdGF0aXN0aWNhbGFuYWx5c2lzLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi8uLi9tYWluL21haW50YWluRmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvbWFpbnRhaW4uc2VydmljZVwiO1xyXG5pbXBvcnQgKiBhcyBDaGFydE9wdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJTWFpbnRhaW5TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWludGFpbi5zZXJ2aWNlXCJcclxuaW1wb3J0IHtcclxuICAgIHN0YXRpc3RpY2FsQW5hbHlzaXNNb2R1bGVOYW1lLCBTdGF0aXN0aWNzT3ZlcnZpZXcsXHJcbiAgICBTdGF0aXN0aWNzT3ZlcnZpZXdBcnIsXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtc1xyXG59IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9tYWludGFpbkVudW1cIjtcclxuaW1wb3J0IFwibW9tZW50XCI7XHJcbmltcG9ydCBSZXNvdXJjZVBhcmFtcyBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvUmVzb3VyY2VQYXJhbXNcIjtcclxuaW1wb3J0IHsgQ2hhcnRPcHRpb25PYmplY3QgfSBmcm9tIFwiLi4vLi4vbWFpbi9tYWludGFpbkZhY3RvcnlcIjtcclxuZGVjbGFyZSBsZXQgbW9tZW50OiBhbnksIGFuZ3VsYXI6IGFueSwgJDogYW55O1xyXG5cclxuY2xhc3Mgc3RhdGlzdGljQWxhbmFseXNpc0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJtYWludGFpbkZhY3RvcnlcIiwgXCJtYWludGFpblNlcnZpY2VcIl07XHJcbiAgICBTdGF0aXN0aWNzT3ZlcnZpZXc6IEFycmF5PFN0YXRpc3RpY3NPdmVydmlldz4gPSBTdGF0aXN0aWNzT3ZlcnZpZXdBcnI7XHJcbiAgICBzdXBlckRhdGE6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIG1haW50YWluRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbWFpbnRhaW5TZXJ2aWNlOiBJTWFpbnRhaW5TZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBbGxEYXRhKCk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignaW5pdENoYXJ0JywgKGV2dDogYW55LCBvcHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldEFsbERhdGEoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5kZXN0cm95Q2hhcnQoKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QWxsRGF0YShjaGFydERhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8g6I635Y+W6K6+5aSH5pWw5o2uXHJcbiAgICAgICAgdGhpcy5kZXZpY2VTdGF0aXN0aWNzKCk7XHJcbiAgICAgICAgLy8g5Lu75Yqh57uf6K6hXHJcbiAgICAgICAgdGhpcy5tYWludGFpblNlcnZpY2UudGFza1N0YXRpc3RpY3NUb3RhbCgpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydENvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhID0gdGhhdC5zZXREYXRhKHN0YXRpc3RpY2FsQW5hbHlzaXNNb2R1bGVOYW1lLnRhc2tTdGF0aXN0aWNzLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQubWFpbnRhaW5GYWN0b3J5LmluaXRDaGFydChjaGFydENvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5oql6K2m57uf6K6hXHJcbiAgICAgICAgbGV0IHBhcmFtc1NlY29uZDogUmVzb3VyY2VQYXJhbXMgPSB0aGlzLm1haW50YWluRmFjdG9yeS5hbGFybVBhcmFtcygpXHJcbiAgICAgICAgdGhpcy5tYWludGFpblNlcnZpY2UuYWxhcm1TdGF0aXN0aWNzKHBhcmFtc1NlY29uZCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNoYXJ0Q29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEgPSB0aGF0LnNldERhdGEoc3RhdGlzdGljYWxBbmFseXNpc01vZHVsZU5hbWUuYWxhcm1TdGF0aXN0aWNzLCByZXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoYXQubWFpbnRhaW5GYWN0b3J5LmluaXRDaGFydChjaGFydENvbmZpZyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8g5rWB6YeP57uf6K6hXHJcbiAgICAgICAgdGhpcy5tYWludGFpblNlcnZpY2UudHJhZmZpY1N0YXRpc3RpY3MoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSA9IHRoYXQuc2V0RGF0YShzdGF0aXN0aWNhbEFuYWx5c2lzTW9kdWxlTmFtZS50cmFmZmljU3RhdGlzdGljcywgcmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGF0Lm1haW50YWluRmFjdG9yeS5pbml0Q2hhcnQoY2hhcnRDb25maWcpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOajgOe0oue7n+iuoVxyXG4gICAgICAgIGxldCBSZXRyaWV2YWxQYXJhbXM6IGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zID0gdGhpcy5tYWludGFpbkZhY3RvcnkuUmV0cmlldmFsUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5tYWludGFpblNlcnZpY2UucmV0cmlldmFsU3RhdGlzdGljcyhSZXRyaWV2YWxQYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGFydENvbmZpZzogQ2hhcnRPcHRpb25zLnNldEVubGFyZ2VEYXRhID0gdGhhdC5zZXREYXRhKHN0YXRpc3RpY2FsQW5hbHlzaXNNb2R1bGVOYW1lLnJldHJpZXZhbFN0YXRpc3RpY3MsIHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC5tYWludGFpbkZhY3RvcnkuaW5pdENoYXJ0KGNoYXJ0Q29uZmlnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyDliIbmnpDnu5/orqFcclxuICAgICAgICB0aGlzLm1haW50YWluU2VydmljZS5hbmFseXNpc3NUYXRpc3RpY3MoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hhcnRDb25maWc6IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSA9IHRoYXQuc2V0RGF0YShzdGF0aXN0aWNhbEFuYWx5c2lzTW9kdWxlTmFtZS5hbmFseXNpc3NUYXRpc3RpY3MsIHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhhdC5tYWludGFpbkZhY3RvcnkuaW5pdENoYXJ0KGNoYXJ0Q29uZmlnKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g6K6+5aSH57uf6K6hXHJcbiAgICBwcml2YXRlIGRldmljZVN0YXRpc3RpY3MoKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHN0YXRpc3RpY3NPdmVydmlldzogQXJyYXk8U3RhdGlzdGljc092ZXJ2aWV3PiA9IFN0YXRpc3RpY3NPdmVydmlld0FycjtcclxuICAgICAgICB0aGF0Lm1haW50YWluU2VydmljZS5nZXREZXZpY2VzU3RhdHVzKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGlzdGljc092ZXJ2aWV3LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaCgoaXRlbUNoaWxkOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PSBpdGVtQ2hpbGQudGl0bGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpc3RpY3NPdmVydmlld1tpbmRleF0ub25saW5lID0gaXRlbUNoaWxkLm9ubGluZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpc3RpY3NPdmVydmlld1tpbmRleF0uYWxhcm0gPSBpdGVtQ2hpbGQuYWxhcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aXN0aWNzT3ZlcnZpZXdbaW5kZXhdLnRvdGFsID0gaXRlbUNoaWxkLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5TdGF0aXN0aWNzT3ZlcnZpZXcgPSBzdGF0aXN0aWNzT3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS7u+WKoee7n+iuoVxyXG4gICAgcHJpdmF0ZSB0YXNrU3RhdGlzdGljcyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcblxyXG4gICAgICAgIC8vdGl0bGVcclxuICAgICAgICBvcHRpb24udGl0bGUgPSBuZXcgQ2hhcnRPcHRpb25zLnRpdGxlKCk7XHJcbiAgICAgICAgb3B0aW9uLnRpdGxlLnRleHQgPSB0aGlzLmdldFRvdGVsKGRhdGEuc2VyaWVzRGF0YSk7XHJcbiAgICAgICAgb3B0aW9uLnRpdGxlLnN1YnRleHQgPSAn5Lu75Yqh5oC75pWwJztcclxuICAgICAgICBvcHRpb24udGl0bGUudG9wID0gJzgnO1xyXG4gICAgICAgIG9wdGlvbi50aXRsZS5sZWZ0ID0gJzE1JztcclxuXHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gJ2l0ZW0nO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLnBvc2l0aW9uID0gWycwJScsICc1MCUnXTtcclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM3Q0NDRjJcIiwgXCIjNkM4Q0U0XCIsIFwiI0RDQkU5OVwiLCBcIiNGQjcwNjFcIl07XHJcblxyXG4gICAgICAgIC8vIOWQiOW5tuaEn+efpeaVsOaNri8vbGVnZW5kXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBbZGF0YS5sZWdlbmREYXRhWzBdLCBkYXRhLmxlZ2VuZERhdGFbMV0sIGRhdGEubGVnZW5kRGF0YVsyXSwgZGF0YS5sZWdlbmREYXRhWzVdXTtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IFtkYXRhLnNlcmllc0RhdGFbMF0sIGRhdGEuc2VyaWVzRGF0YVsxXSwgZGF0YS5zZXJpZXNEYXRhWzJdICsgZGF0YS5zZXJpZXNEYXRhWzNdICsgZGF0YS5zZXJpZXNEYXRhWzRdLCBkYXRhLnNlcmllc0RhdGFbNV1dO1xyXG5cclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBsZWdlbmREYXRhO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQub3JpZW50ID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSA3MDtcclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZC5sZWZ0O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQucmlnaHQgPSBcIjEwMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtR2FwID0gMjA7XHJcblxyXG4gICAgICAgIC8vc2VyaWVzXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgbGV0IHNlcmllc190b2RvID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNfdG9kby50eXBlID0gXCJwaWVcIjtcclxuICAgICAgICBzZXJpZXNfdG9kby5yYWRpdXMgPSBbJzM1JScsICc1NSUnXTtcclxuICAgICAgICBzZXJpZXNfdG9kby5jZW50ZXIgPSBbJzE1JScsICc1MCUnXTtcclxuXHJcbiAgICAgICAgc2VyaWVzX3RvZG8ubGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsKCk7XHJcbiAgICAgICAgc2VyaWVzX3RvZG8ubGFiZWwubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWwoKTtcclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImxlZnRcIjtcclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbC5ub3JtYWwuc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsTGluZSgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLmxhYmVsTGluZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLmxhYmVsTGluZS5ub3JtYWwuc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLml0ZW1TdHlsZS5ub3JtYWwuc2hhZG93Q29sb3IgPSAncmdiYSgyLCA1MiwgMTIzLCAwLjIpJztcclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd09mZnNldFkgPSAxMDtcclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd0JsdXIgPSA3O1xyXG5cclxuXHJcbiAgICAgICAgc2VyaWVzX3RvZG8uZGF0YSA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ2VuZERhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHNlcmllc0RhdGFBID0ge30gYXMgQ2hhcnRPcHRpb25zLnNlcmllc0RhdGFBO1xyXG4gICAgICAgICAgICBzZXJpZXNEYXRhQS52YWx1ZSA9IHNlcmllc0RhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGFBLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNfdG9kby5kYXRhLnB1c2goc2VyaWVzRGF0YUEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzX3RvZG8pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5oql6K2m57uf6K6hXHJcbiAgICBwcml2YXRlIGFsYXJtU3RhdGlzdGljcyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBkYXRhLnNlcmllc0RhdGEgYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IGRhdGEueERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM2YzhjZTRcIiwgXCIjN2NjY2YyXCIsIFwiI2RjYmU5OVwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IFwiMTBweFwiO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1XaWR0aCA9IDE1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUhlaWdodCA9IDEwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUdhcCA9IDQwO1xyXG5cclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IGRhdGEubGVnZW5kRGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDQ1O1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBsZWdlbmRcclxuICAgICAgICAgICAgbGV0IGxlZ2VuZEFycmF5RGF0YSA9IHt9IGFzIENoYXJ0T3B0aW9ucy5kYXRhVGV4dDtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEudGV4dFN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5kYXRhU3R5bGVUZXh0KCk7XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEucHVzaChsZWdlbmRBcnJheURhdGEpO1xyXG4gICAgICAgICAgICAvLyBzZXJpZXNcclxuICAgICAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNELnR5cGUgPSBcImJhclwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELnN0YWNrID0gXCLmgLvph49cIjtcclxuICAgICAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDM1O1xyXG5cclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMubGFiZWw7XHJcbiAgICAgICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWw7XHJcbiAgICAgICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsLnBvc2l0aW9uID0gXCJpbnNpZGVSaWdodFwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShvcHRpb24pKVxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICAvLyDmtYHph4/nu5/orqFcclxuICAgIHByaXZhdGUgdHJhZmZpY1N0YXRpc3RpY3MoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBkYXRhLnhEYXRhIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgbGV0IHRleHQgPSBkYXRhLnRvdGFsTnVtIHx8IDA7XHJcbiAgICAgICAgLy8gdGl0bGVcclxuICAgICAgICBvcHRpb24udGl0bGUgPSBuZXcgQ2hhcnRPcHRpb25zLnRpdGxlKCk7XHJcbiAgICAgICAgb3B0aW9uLnRpdGxlLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIG9wdGlvbi50aXRsZS5zdWJ0ZXh0ID0gXCLmtYHph4/nu5/orqFcIjtcclxuICAgICAgICBvcHRpb24udGl0bGUudG9wID0gJzgnO1xyXG4gICAgICAgIG9wdGlvbi50aXRsZS5sZWZ0ID0gJzE1JztcclxuXHJcbiAgICAgICAgLy90b29sdG9wXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gXCJheGlzXCI7XHJcblxyXG4gICAgICAgIC8vIGNvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzdDQ0NGMlwiLCBcIiM2QzhDRTRcIiwgXCIjZjhhNjE5XCIsIFwiIzAwZDVlMlwiXTtcclxuXHJcbiAgICAgICAgLy8gbGVnZW5kXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBkYXRhLmxlZ2VuZERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSBcIjIwcHhcIjtcclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZC5sZWZ0O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQucmlnaHQgPSBcIjIwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1XaWR0aCA9IDIwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUhlaWdodCA9IDEwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUdhcCA9IDMwO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaWNvbiA9IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IHhEYXRhID0gW1wiMDgtMDFcIixcIjA4LTAyXCIsXCIwOC0wM1wiLFwiMDgtMDRcIixcIjA4LTA1XCJdIGFzIEFycmF5PHN0cmluZz5cclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYm91bmRhcnlHYXAgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcblxyXG4gICAgICAgIC8vIGdyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDgwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICAvL3lBeGlzXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICAvLyBvcHRpb24ueUF4aXMubWluID0gMFxyXG4gICAgICAgIC8vIG9wdGlvbi55QXhpcy5tYXggPSA0MDAwMFxyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcbiAgICAgICAgLy/muJDlj5jpopzoibJcclxuICAgICAgICBsZXQgYXJlYUNvbG9yOiBBcnJheTxzdHJpbmc+ID0gW1wiMTI0LDIwNCwyNDJcIiwgXCIxMDgsMTQwLDIyOFwiLCBcIjI0OCwxNjYsMjVcIiwgXCIwLDIxMywyMjZcIl07XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhLnB1c2gobGVnZW5kQXJyYXlEYXRhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwibGluZVwiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhW2ldO1xyXG4gICAgICAgICAgICBzZXJpZXNELm5hbWUgPSBsZWdlbmREYXRhW2ldO1xyXG4gICAgICAgICAgICBsZXQgYXJlYVN0eWxlQ29sb3I6IGFueSA9IG5ldyBDaGFydE9wdGlvbnMuYXJlYVN0eWxlQ29sb3IoYXJlYUNvbG9yW2ldKTtcclxuICAgICAgICAgICAgc2VyaWVzRC5hcmVhU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmFyZWFTdHlsZSgpO1xyXG4gICAgICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLk9iamVjdE5vcm1hbCgpO1xyXG4gICAgICAgICAgICBzZXJpZXNELmFyZWFTdHlsZS5ub3JtYWwgPSBhcmVhU3R5bGVDb2xvci5nZXRDb2xvcigpO1xyXG5cclxuICAgICAgICAgICAgb3B0aW9uLnNlcmllcy5wdXNoKHNlcmllc0QpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qOA57Si57uf6K6hIFxyXG4gICAgcHJpdmF0ZSByZXRyaWV2YWxTdGF0aXN0aWNzKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGRhdGEuc2VyaWVzRGF0YSBhcyBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGxldCB5RGF0YSA9IGRhdGEueURhdGE7XHJcblxyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiYXhpc1wiO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzUG9pbnRlcigpO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyLnR5cGUgPSBcImxpbmVcIjtcclxuICAgICAgICAvLyBvcHRpb24udG9vbHRpcC5heGlzUG9pbnRlci50eXBlID0gXCJjcm9zc1wiO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI0Y4QTMxMVwiLCBcIiNBQkQ0RUZcIiwgXCIjMDBENUUyXCIsIFwiI0ZCNzA2MVwiLCBcIiM2QzhDRTRcIiwgXCIjN0NDQ0YyXCJdO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnJpZ2h0ID0gMzA7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQuYm90dG9tID0gMjA7XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmJvdW5kYXJ5R2FwID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjRjhGMEU5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuXHJcbiAgICAgICAgLy95QXhpc1xyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcy5kYXRhID0geURhdGE7XHJcblxyXG4gICAgICAgIC8vc2VyaWVzXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcblxyXG4gICAgICAgIGxldCBzZXJpZXNEID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNELnR5cGUgPSAnYmFyJztcclxuICAgICAgICBzZXJpZXNELmRhdGEgPSBzZXJpZXNEYXRhO1xyXG4gICAgICAgIHNlcmllc0QuYmFyV2lkdGggPSAxMjtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuaXRlbVN0eWxlKCk7XHJcbiAgICAgICAgc2VyaWVzRC5pdGVtU3R5bGUubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWwoKTtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwuYmFyQm9yZGVyUmFkaXVzID0gWzAsIDUwLCA1MCwgMF07XHJcblxyXG4gICAgICAgIGxldCBhcmVhU3R5bGVDb2xvcjogYW55ID0gbmV3IENoYXJ0T3B0aW9ucy5hcmVhU3R5bGVDb2xvcihbXCIjRjhBMzExXCIsIFwiI0FCRDRFRlwiLCBcIiMwMEQ1RTJcIiwgXCIjRkI3MDYxXCIsIFwiIzZDOENFNFwiLCBcIiM3Q0NDRjJcIl0pO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9ICQuZXh0ZW5kKGFyZWFTdHlsZUNvbG9yLmNvbG9yRGlmZigpLCBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwpO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5YiG5p6Q57uf6K6hXHJcbiAgICBwcml2YXRlIGFuYWx5c2lzc1RhdGlzdGljcyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBkYXRhLnNlcmllc0RhdGEgYXMgQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBsZXQgbGVnZW5kRGF0YSA9IGRhdGEubGVnZW5kRGF0YTtcclxuXHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICBvcHRpb24udG9vbHRpcC50cmlnZ2VyID0gJ2l0ZW0nO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLnBvc2l0aW9uID0gWycwJScsICc1MCUnXTtcclxuXHJcbiAgICAgICAgLy9jb2xvclxyXG4gICAgICAgIG9wdGlvbi5jb2xvciA9IFtcIiM3Q0NDRjJcIiwgXCIjNkM4Q0U0XCIsIFwiI0RDQkU5OVwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBsZWdlbmREYXRhO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQub3JpZW50ID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSBcIjk1cHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmxlZnQgPSBcIjU1MHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtR2FwID0gMjU7XHJcblxyXG4gICAgICAgIC8vc2VyaWVzXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgbGV0IHNlcmllc190b2RvID0gbmV3IENoYXJ0T3B0aW9ucy5zZXJpZXMoKTtcclxuICAgICAgICBzZXJpZXNfdG9kby50eXBlID0gXCJwaWVcIjtcclxuICAgICAgICBzZXJpZXNfdG9kby5yYWRpdXMgPSBbJzMwJScsICc1MCUnXTtcclxuICAgICAgICBzZXJpZXNfdG9kby5jZW50ZXIgPSBbJzE1JScsICc0MCUnXTtcclxuXHJcbiAgICAgICAgc2VyaWVzX3RvZG8ubGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsKCk7XHJcbiAgICAgICAgc2VyaWVzX3RvZG8ubGFiZWwubm9ybWFsID0gbmV3IENoYXJ0T3B0aW9ucy5ub3JtYWwoKTtcclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImxlZnRcIjtcclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbC5ub3JtYWwuc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXJpZXNfdG9kby5sYWJlbExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmxhYmVsTGluZSgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLmxhYmVsTGluZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLmxhYmVsTGluZS5ub3JtYWwuc2hvdyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLml0ZW1TdHlsZSgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc190b2RvLml0ZW1TdHlsZS5ub3JtYWwuc2hhZG93Q29sb3IgPSAncmdiYSgyLCA1MiwgMTIzLCAwLjIpJztcclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd09mZnNldFkgPSAxMDtcclxuICAgICAgICBzZXJpZXNfdG9kby5pdGVtU3R5bGUubm9ybWFsLnNoYWRvd0JsdXIgPSA3O1xyXG5cclxuICAgICAgICBzZXJpZXNfdG9kby5kYXRhID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcblxyXG4gICAgICAgIGlmIChsZWdlbmREYXRhKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVnZW5kRGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcmllc0RhdGFBID0ge30gYXMgQ2hhcnRPcHRpb25zLnNlcmllc0RhdGFBO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YUEudmFsdWUgPSBzZXJpZXNEYXRhW2ldO1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzRGF0YUEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgc2VyaWVzX3RvZG8uZGF0YS5wdXNoKHNlcmllc0RhdGFBKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzX3RvZG8pO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShvcHRpb24pKTtcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXREYXRhKG5hbWU6IHN0cmluZywgZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBvcHRpb246IGFueSA9IENoYXJ0T3B0aW9uT2JqZWN0KG5hbWUpO1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICd0YXNrU3RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0aGlzLnRhc2tTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsYXJtU3RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0aGlzLmFsYXJtU3RhdGlzdGljcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICd0cmFmZmljU3RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0aGlzLnRyYWZmaWNTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3JldHJpZXZhbFN0YXRpc3RpY3MnOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29uZmlnID0gdGhpcy5yZXRyaWV2YWxTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2FuYWx5c2lzc1RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0aGlzLmFuYWx5c2lzc1RhdGlzdGljcyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRvdGVsKGRhdGE6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBsZXQgbmV3QXJyOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICAgIGxldCBnZXRTdHJpbmc6IEZ1bmN0aW9uID0gKGxpc3Q6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaXN0KSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRTdHJpbmcocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdBcnIucHVzaChsaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGdldFN0cmluZyhkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0Fyci5yZWR1Y2UoZnVuY3Rpb24gKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlICsgY3VycmVudFZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignc3RhdGlzdGljYWxBbmFseXNpc0NvbnRyb2xsZXInLCBzdGF0aXN0aWNBbGFuYWx5c2lzQ29udHJvbGxlcik7Il19
