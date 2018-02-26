define(["require", "exports", "../../../common/app/main.app", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "../../main/maintainFactory", "css!module/maintain/css/taskStatistics.css", "../../main/maintainFactory", "../../../common/services/maintain.service"], function (require, exports, main_app_1, ChartOptions, maintainEnum_1, maintainFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dispatchedAboutTaskStatisticsEnum = (function () {
        function dispatchedAboutTaskStatisticsEnum() {
        }
        return dispatchedAboutTaskStatisticsEnum;
    }());
    var taskStatisticsController = (function () {
        function taskStatisticsController($scope, $timeout, maintainFactory, maintainService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.maintainFactory = maintainFactory;
            this.maintainService = maintainService;
            this.areaTaskList = true;
            this.areaDispatchedTaskList = true;
            this.dispatchedAboutTaskList = true;
            this.dropList = [];
            this.areaTaskTableTitle = ['行政区域', '人像结构化任务', '车辆结构化任务'];
            this.areaTaskTableTitleWidth = 100 / this.areaTaskTableTitle.length + '%';
            this.echartNameArr = angular.copy(maintainEnum_1.echartNameArr);
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
            this.init();
            $scope.$on('initChart', function (evt, opt) {
                _this.init();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        taskStatisticsController.prototype.getSuperData = function (superData) {
            this.areaTaskStatisticsList = angular.copy(superData.areaTaskStatistics);
            this.areaDispatchedTaskStatisticsList = angular.copy(superData.areaDispatchedTaskStatistics);
            this.dispatchedAboutTaskStatisticsList = angular.copy(superData.dispatchedAboutTaskStatistics);
            this.dispatchedAboutTaskStatisticsList.legendData = ["布控库名称", "任务数"];
            var arr = Object.keys(maintainEnum_1.taskStatisticsModuleName);
            for (var i = 0; i < arr.length; i++) {
                try {
                    this.maintainFactory.initChart(this.setData(arr[i], superData[arr[i]]));
                }
                catch (err) {
                    console.error(err);
                }
            }
        };
        taskStatisticsController.prototype.init = function (chartData) {
            var _this = this;
            var _self = this;
            if (_self.superData) {
                this.getSuperData(_self.superData);
            }
            else {
                _self.maintainService.taskStatistic().then(function (res) {
                    _self.superData = {
                        areaTaskStatistics: {
                            seriesData: res.data.areaTaskStatistics.seriesData,
                            xData: res.data.areaTaskStatistics.xData,
                            legendData: res.data.areaTaskStatistics.legendData
                        },
                        areaDispatchedTaskStatistics: {
                            seriesData: res.data.areaDispatchedTaskStatistics.seriesData,
                            xData: res.data.areaDispatchedTaskStatistics.xData,
                            legendData: res.data.areaDispatchedTaskStatistics.legendData
                        },
                        dispatchedAboutTaskStatistics: _self.dispatchedAboutTaskData(res.data.dispatchedAboutTaskStatistics)
                    };
                    _this.getSuperData(_self.superData);
                });
            }
        };
        taskStatisticsController.prototype.dispatchedAboutTaskData = function (data) {
            var _this = this;
            var dispatchedAboutTaskStatistics = {
                seriesData: [],
                yData: []
            };
            data.forEach(function (item) {
                if (!_this.dropList.length) {
                    _this.dropList.push({ text: item.area });
                }
                _this.dropList.forEach(function (dropData) {
                    if (dropData.text.indexOf(item.area) == -1) {
                        _this.dropList.push({ text: item.area });
                    }
                });
                dispatchedAboutTaskStatistics.yData.push(item.yData);
                dispatchedAboutTaskStatistics.seriesData.push(item.seriesData);
            });
            return dispatchedAboutTaskStatistics;
        };
        taskStatisticsController.areaTaskStatistics = function (data) {
            console.log(data);
            if (!data) {
                return false;
            }
            var seriesData = angular.copy(data.seriesData);
            var xData = data.xData;
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
            option.legend.itemGap = 60;
            var legendData = data.legendData;
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
        taskStatisticsController.areaDispatchedTaskStatistics = function (data) {
            if (!data) {
                return false;
            }
            var seriesData = angular.copy(data.seriesData);
            var xData = data.xData;
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
            option.legend.itemGap = 60;
            var legendData = data.legendData;
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
        taskStatisticsController.dispatchedAboutTaskStatistics = function (data) {
            var option = new ChartOptions.EChartOption();
            var seriesData = data.seriesData.slice(0, 10);
            var yData = data.yData.slice(0, 10);
            option.tooltip = new ChartOptions.tooltip();
            option.tooltip.trigger = "axis";
            option.tooltip.axisPointer = new ChartOptions.axisPointer();
            option.tooltip.axisPointer.type = "line";
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
            var colors = ["#F8A311", "#ABD4EF", "#00D5E2", "#FB7061", "#6C8CE4", "#7CCCF2"];
            var colorArr = [];
            yData.forEach(function (y, index) {
                colors[index] = colorArr[Math.ceil(Math.round(colors.length))];
            });
            var areaStyleColor = new ChartOptions.areaStyleColor(["#F8A311"]);
            seriesD.itemStyle.normal = $.extend(areaStyleColor.colorDiff(), seriesD.itemStyle.normal);
            option.series.push(seriesD);
            delete option.legend;
            return option;
        };
        taskStatisticsController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            switch (name) {
                case 'areaTaskStatistics': {
                    option.config = taskStatisticsController.areaTaskStatistics(data);
                    this.areaTaskConfig = option;
                    return option;
                }
                case 'areaDispatchedTaskStatistics': {
                    option.config = taskStatisticsController.areaDispatchedTaskStatistics(data);
                    this.areaDispatchedTaskConfig = option;
                    return option;
                }
                case 'dispatchedAboutTaskStatistics': {
                    option.config = taskStatisticsController.dispatchedAboutTaskStatistics(data);
                    this.dispatchedAboutTaskConfig = option;
                    return option;
                }
            }
        };
        taskStatisticsController.prototype.areaTaskHistogram = function (switchString) {
            var that = this;
            switch (switchString) {
                case 'areaTaskHistogram': {
                    that.areaTaskList = true;
                    break;
                }
                case 'areaTaskList': {
                    that.areaTaskList = false;
                    break;
                }
                case 'areaDispatchedTaskHistogram': {
                    that.areaDispatchedTaskList = true;
                    break;
                }
                case 'areaDispatchedTaskList': {
                    that.areaDispatchedTaskList = false;
                    break;
                }
                case 'dispatchedAboutTaskHistogram': {
                    that.dispatchedAboutTaskList = true;
                    break;
                }
                case 'dispatchedAboutList': {
                    that.dispatchedAboutTaskList = false;
                    break;
                }
            }
        };
        taskStatisticsController.prototype.exportImage = function (id) {
            this.maintainFactory.exportImage(id);
        };
        taskStatisticsController.prototype.exportExcel = function (module, data) {
            this.maintainFactory.exportExcel(module, data);
        };
        taskStatisticsController.$inject = ["$scope", "$timeout", "maintainFactory", "maintainService"];
        return taskStatisticsController;
    }());
    main_app_1.app.controller("taskStatisticsController", taskStatisticsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L3Rhc2tTdGF0aXN0aWNzL3Rhc2tTdGF0aXN0aWNzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBV0E7UUFBQTtRQUdBLENBQUM7UUFBRCx3Q0FBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBRUQ7UUEyQkksa0NBQ1ksTUFBVyxFQUNYLFFBQWEsRUFDYixlQUFvQixFQUNwQixlQUFpQztZQUo3QyxpQkFhQztZQVpXLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2Isb0JBQWUsR0FBZixlQUFlLENBQUs7WUFDcEIsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBMUI3QyxpQkFBWSxHQUFZLElBQUksQ0FBQztZQUM3QiwyQkFBc0IsR0FBWSxJQUFJLENBQUM7WUFDdkMsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1lBTXhDLGFBQVEsR0FBUSxFQUFFLENBQUM7WUFJbkIsdUJBQWtCLEdBQWtCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSw0QkFBdUIsR0FBVyxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFFN0Usa0JBQWEsR0FBUSxPQUFPLENBQUMsSUFBSSxDQUFDLDRCQUFhLENBQUMsQ0FBQztZQUNqRCxrQkFBYSxHQUFnQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUF1QixDQUFDLENBQUM7WUFZL0UsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBQyxHQUFRLEVBQUUsR0FBUTtnQkFDdkMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsS0FBSSxDQUFDLGVBQWUs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LENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUluRCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDNUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFnQixDQUFDO1lBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUV6QyxJQUFJLGVBQWUsR0FBRyxFQUEyQixDQUFDO2dCQUNsRCxlQUFlLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsZUFBZSxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDN0QsZUFBZSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Z0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFDckIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUV0QixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFDdkMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDO2dCQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO2dCQUM5QyxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDL0IsQ0FBQztZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDakIsQ0FBQztRQUdjLHNEQUE2QixHQUE1QyxVQUE2QyxJQUFVO1lBQ25ELElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQWtCLENBQUM7WUFDL0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBa0IsQ0FBQztZQUdyRCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM1RCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBSXpDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUd4QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNqQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNuRCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztZQUc1QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBRS9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUcxQixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQWdCLENBQUM7WUFFakMsSUFBSSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDckIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDckIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDMUIsT0FBTyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDdEIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNyRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUxRCxJQUFJLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDaEYsSUFBSSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztZQUNqQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBUyxFQUFFLEtBQWE7Z0JBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLGNBQWMsR0FBUSxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFMUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDakIsQ0FBQztRQUVPLDBDQUFPLEdBQWYsVUFBZ0IsSUFBWSxFQUFFLElBQVU7WUFDcEMsSUFBSSxNQUFNLEdBQVEsbUNBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDWCxLQUFLLG9CQUFvQixFQUFFLENBQUM7b0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO29CQUM3QixNQUFNLENBQUMsTUFBTSxDQUFBO2dCQUNqQixDQUFDO2dCQUNELEtBQUssOEJBQThCLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztvQkFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtnQkFDakIsQ0FBQztnQkFDRCxLQUFLLCtCQUErQixFQUFFLENBQUM7b0JBQ25DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzdFLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxNQUFNLENBQUM7b0JBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUE7Z0JBQ2pCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUdNLG9EQUFpQixHQUF4QixVQUF5QixZQUFvQjtZQUN6QyxJQUFJLElBQUksR0FBUSxJQUFJLENBQUM7WUFDckIsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsS0FBSyxtQkFBbUIsRUFBRSxDQUFDO29CQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDekIsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsS0FBSyxjQUFjLEVBQUUsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLEtBQUssQ0FBQztnQkFDVixDQUFDO2dCQUNELEtBQUssNkJBQTZCLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztvQkFDbkMsS0FBSyxDQUFDO2dCQUNWLENBQUM7Z0JBQ0QsS0FBSyx3QkFBd0IsRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO29CQUNwQyxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztnQkFDRCxLQUFLLDhCQUE4QixFQUFFLENBQUM7b0JBQ2xDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7b0JBQ3BDLEtBQUssQ0FBQztnQkFDVixDQUFDO2dCQUNELEtBQUsscUJBQXFCLEVBQUUsQ0FBQztvQkFDekIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQztvQkFDckMsS0FBSyxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVNLDhDQUFXLEdBQWxCLFVBQW1CLEVBQVU7WUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUVNLDhDQUFXLEdBQWxCLFVBQW1CLE1BQWMsRUFBRSxJQUFTO1lBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBMVhNLGdDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUEyWGxGLCtCQUFDO0tBN1hELEFBNlhDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy90YXNrU3RhdGlzdGljcy90YXNrU3RhdGlzdGljcy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIW1vZHVsZS9tYWludGFpbi9jc3MvdGFza1N0YXRpc3RpY3MuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWludGFpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIlxyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdCc7XHJcbmltcG9ydCB7IGVjaGFydE5hbWVBcnIsIHRhc2tTdGF0aXN0aWNzTW9kdWxlTmFtZSwgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtLCBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9tYWludGFpbkVudW1cIjtcclxuaW1wb3J0IHsgQ2hhcnRPcHRpb25PYmplY3QgfSBmcm9tIFwiLi4vLi4vbWFpbi9tYWludGFpbkZhY3RvcnlcIjtcclxuZGVjbGFyZSBsZXQgJDogYW55LCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljc0VudW0ge1xyXG4gICAgc2VyaWVzRGF0YTogQXJyYXk8bnVtYmVyPjtcclxuICAgIHlEYXRhOiBBcnJheTxudW1iZXI+O1xyXG59XHJcblxyXG5jbGFzcyB0YXNrU3RhdGlzdGljc0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJtYWludGFpbkZhY3RvcnlcIiwgXCJtYWludGFpblNlcnZpY2VcIl07XHJcblxyXG4gICAgLy8g5YiH5o2i5oyJ6ZKuXHJcbiAgICBhcmVhVGFza0xpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgYXJlYURpc3BhdGNoZWRUYXNrTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBkaXNwYXRjaGVkQWJvdXRUYXNrTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvLyDkv6Hmga/nvJPlrZhcclxuICAgIGFyZWFUYXNrQ29uZmlnOiBhbnk7XHJcbiAgICBhcmVhRGlzcGF0Y2hlZFRhc2tDb25maWc6IGFueTtcclxuICAgIGRpc3BhdGNoZWRBYm91dFRhc2tDb25maWc6IGFueTtcclxuICAgIC8vIOS4i+aLieiPnOWNlSDml7bpl7Tmjqfku7ZcclxuICAgIGRyb3BMaXN0OiBhbnkgPSBbXTtcclxuICAgIC8vIOiOt+WPluWQjuerr+S/oeaBr1xyXG4gICAgc3VwZXJEYXRhOiBhbnk7XHJcblxyXG4gICAgYXJlYVRhc2tUYWJsZVRpdGxlOiBBcnJheTxzdHJpbmc+ID0gWyfooYzmlL/ljLrln58nLCAn5Lq65YOP57uT5p6E5YyW5Lu75YqhJywgJ+i9pui+hue7k+aehOWMluS7u+WKoSddO1xyXG4gICAgYXJlYVRhc2tUYWJsZVRpdGxlV2lkdGg6IHN0cmluZyA9IDEwMCAvIHRoaXMuYXJlYVRhc2tUYWJsZVRpdGxlLmxlbmd0aCArICclJztcclxuXHJcbiAgICBlY2hhcnROYW1lQXJyOiBhbnkgPSBhbmd1bGFyLmNvcHkoZWNoYXJ0TmFtZUFycik7XHJcbiAgICBNb2R1bGVOYW1lQXJyOiBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YUVudW0gPSBhbmd1bGFyLmNvcHkoaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEpO1xyXG4gICAgLy8g5YiX6KGo6KeG5Zu+XHJcbiAgICBhcmVhVGFza1N0YXRpc3RpY3NMaXN0OiBhbnk7XHJcbiAgICBhcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzTGlzdDogYW55O1xyXG4gICAgZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3NMaXN0OiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWludGFpbkZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlIG1haW50YWluU2VydmljZTogSU1haW50YWluU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgJHNjb3BlLiRvbignaW5pdENoYXJ0JywgKGV2dDogYW55LCBvcHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5kZXN0cm95Q2hhcnQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFN1cGVyRGF0YShzdXBlckRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMuYXJlYVRhc2tTdGF0aXN0aWNzTGlzdCA9IGFuZ3VsYXIuY29weShzdXBlckRhdGEuYXJlYVRhc2tTdGF0aXN0aWNzKTtcclxuICAgICAgICB0aGlzLmFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3NMaXN0ID0gYW5ndWxhci5jb3B5KHN1cGVyRGF0YS5hcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZWRBYm91dFRhc2tTdGF0aXN0aWNzTGlzdCA9IGFuZ3VsYXIuY29weShzdXBlckRhdGEuZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3MpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3NMaXN0LmxlZ2VuZERhdGEgPSBbXCLluIPmjqflupPlkI3np7BcIiwgXCLku7vliqHmlbBcIl07XHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBPYmplY3Qua2V5cyh0YXNrU3RhdGlzdGljc01vZHVsZU5hbWUpIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmluaXRDaGFydCh0aGlzLnNldERhdGEoYXJyW2ldLCBzdXBlckRhdGFbYXJyW2ldXSkpXHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0KGNoYXJ0RGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXMgYXMgdGFza1N0YXRpc3RpY3NDb250cm9sbGVyO1xyXG4gICAgICAgIGlmIChfc2VsZi5zdXBlckRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRTdXBlckRhdGEoX3NlbGYuc3VwZXJEYXRhKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9zZWxmLm1haW50YWluU2VydmljZS50YXNrU3RhdGlzdGljKCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBfc2VsZi5zdXBlckRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYVRhc2tTdGF0aXN0aWNzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmllc0RhdGE6IHJlcy5kYXRhLmFyZWFUYXNrU3RhdGlzdGljcy5zZXJpZXNEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4RGF0YTogcmVzLmRhdGEuYXJlYVRhc2tTdGF0aXN0aWNzLnhEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmREYXRhOiByZXMuZGF0YS5hcmVhVGFza1N0YXRpc3RpY3MubGVnZW5kRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYURpc3BhdGNoZWRUYXNrU3RhdGlzdGljczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJpZXNEYXRhOiByZXMuZGF0YS5hcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzLnNlcmllc0RhdGEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHhEYXRhOiByZXMuZGF0YS5hcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzLnhEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWdlbmREYXRhOiByZXMuZGF0YS5hcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzLmxlZ2VuZERhdGFcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoZWRBYm91dFRhc2tTdGF0aXN0aWNzOiBfc2VsZi5kaXNwYXRjaGVkQWJvdXRUYXNrRGF0YShyZXMuZGF0YS5kaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljcylcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRTdXBlckRhdGEoX3NlbGYuc3VwZXJEYXRhKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkaXNwYXRjaGVkQWJvdXRUYXNrRGF0YShkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3M6IGRpc3BhdGNoZWRBYm91dFRhc2tTdGF0aXN0aWNzRW51bSA9IHtcclxuICAgICAgICAgICAgc2VyaWVzRGF0YTogW10sXHJcbiAgICAgICAgICAgIHlEYXRhOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRyb3BMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wTGlzdC5wdXNoKHsgdGV4dDogaXRlbS5hcmVhIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kcm9wTGlzdC5mb3JFYWNoKChkcm9wRGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHJvcERhdGEudGV4dC5pbmRleE9mKGl0ZW0uYXJlYSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BMaXN0LnB1c2goeyB0ZXh0OiBpdGVtLmFyZWEgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljcy55RGF0YS5wdXNoKGl0ZW0ueURhdGEpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljcy5zZXJpZXNEYXRhLnB1c2goaXRlbS5zZXJpZXNEYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3NcclxuICAgIH1cclxuXHJcbiAgICAvLyDljLrln5/nu5PmnoTljJbku7vliqHnu5/orqFcclxuICAgIHByaXZhdGUgc3RhdGljIGFyZWFUYXNrU3RhdGlzdGljcyhkYXRhPzogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKCFkYXRhKSB7IHJldHVybiBmYWxzZSB9XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YS5zZXJpZXNEYXRhKSBhcyBBcnJheTxBcnJheTxudW1iZXI+PjtcclxuICAgICAgICBsZXQgeERhdGEgPSBkYXRhLnhEYXRhIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjNmM4Y2U0XCIsIFwiIzdjY2NmMlwiLCBcIiNkY2JlOTlcIl07XHJcblxyXG4gICAgICAgIC8vbGVnZW5kXHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZCA9IG5ldyBDaGFydE9wdGlvbnMubGVnZW5kKCk7XHJcbiAgICAgICAgZGVsZXRlIG9wdGlvbi5sZWdlbmQubGVmdDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnJpZ2h0ID0gXCIyMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC50b3AgPSBcIjEwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLmRhdGEgPSBbXSBhcyBhbnk7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtV2lkdGggPSAxNTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1IZWlnaHQgPSAxMDtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1HYXAgPSA2MDtcclxuXHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBkYXRhLmxlZ2VuZERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5mb250U2l6ZSA9IFwiMTBcIjtcclxuXHJcbiAgICAgICAgLy9ncmlkXHJcbiAgICAgICAgb3B0aW9uLmdyaWQgPSBuZXcgQ2hhcnRPcHRpb25zLmdyaWQoKTtcclxuICAgICAgICBvcHRpb24uZ3JpZC50b3AgPSA1MDtcclxuICAgICAgICBvcHRpb24uZ3JpZC5ib3R0b20gPSAyMDtcclxuXHJcbiAgICAgICAgb3B0aW9uLnlBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy55QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzID0gW10gYXMgQXJyYXk8YW55PjtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMzU7XHJcblxyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImluc2lkZVJpZ2h0XCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICAvLyDljLrln5/luIPmjqfku7vliqHnu5/orqFcclxuICAgIHByaXZhdGUgc3RhdGljIGFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3MoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGlmICghZGF0YSkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEuc2VyaWVzRGF0YSkgYXMgQXJyYXk8QXJyYXk8bnVtYmVyPj47XHJcbiAgICAgICAgbGV0IHhEYXRhID0gZGF0YS54RGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzZjOGNlNFwiLCBcIiM3Y2NjZjJcIiwgXCIjZGNiZTk5XCJdO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIxMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtR2FwID0gNjA7XHJcblxyXG4gICAgICAgIGxldCBsZWdlbmREYXRhID0gZGF0YS5sZWdlbmREYXRhIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCI7XHJcblxyXG4gICAgICAgIC8vZ3JpZFxyXG4gICAgICAgIG9wdGlvbi5ncmlkID0gbmV3IENoYXJ0T3B0aW9ucy5ncmlkKCk7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQudG9wID0gNTA7XHJcbiAgICAgICAgb3B0aW9uLmdyaWQuYm90dG9tID0gMjA7XHJcblxyXG4gICAgICAgIG9wdGlvbi55QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueUF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueUF4aXMudHlwZSA9IFwidmFsdWVcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgb3B0aW9uLnNlcmllcyA9IFtdIGFzIEFycmF5PGFueT47XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdlbmREYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgICAgICBsZXQgbGVnZW5kQXJyYXlEYXRhID0ge30gYXMgQ2hhcnRPcHRpb25zLmRhdGFUZXh0O1xyXG4gICAgICAgICAgICBsZWdlbmRBcnJheURhdGEubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIGxlZ2VuZEFycmF5RGF0YS50ZXh0U3R5bGUgPSBuZXcgQ2hhcnRPcHRpb25zLmRhdGFTdHlsZVRleHQoKTtcclxuICAgICAgICAgICAgbGVnZW5kQXJyYXlEYXRhLmljb24gPSBcInN0YWNrXCI7XHJcbiAgICAgICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgICAgIC8vIHNlcmllc1xyXG4gICAgICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgICAgIHNlcmllc0QubmFtZSA9IGxlZ2VuZERhdGFbaV07XHJcbiAgICAgICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgICAgIHNlcmllc0Quc3RhY2sgPSBcIuaAu+mHj1wiO1xyXG4gICAgICAgICAgICBzZXJpZXNELmJhcldpZHRoID0gMzU7XHJcblxyXG4gICAgICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbDtcclxuICAgICAgICAgICAgc2VyaWVzRC5sYWJlbC5ub3JtYWwucG9zaXRpb24gPSBcImluc2lkZVJpZ2h0XCI7XHJcbiAgICAgICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRClcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkob3B0aW9uKSk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOW4g+aOp+W6k+ebuOWFs+S7u+WKoee7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3MoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhLnNsaWNlKDAsIDEwKSBhcyBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGxldCB5RGF0YSA9IGRhdGEueURhdGEuc2xpY2UoMCwgMTApIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAudHJpZ2dlciA9IFwiYXhpc1wiO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzUG9pbnRlcigpO1xyXG4gICAgICAgIG9wdGlvbi50b29sdGlwLmF4aXNQb2ludGVyLnR5cGUgPSBcImxpbmVcIjtcclxuICAgICAgICAvLyBvcHRpb24udG9vbHRpcC5heGlzUG9pbnRlci50eXBlID0gXCJjcm9zc1wiO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5ib3VuZGFyeUdhcCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0Y4RjBFOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcblxyXG4gICAgICAgIC8veUF4aXNcclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNGOEYwRTlcIjtcclxuICAgICAgICBvcHRpb24ueUF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMuZGF0YSA9IHlEYXRhO1xyXG5cclxuICAgICAgICAvL3Nlcmllc1xyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG5cclxuICAgICAgICBsZXQgc2VyaWVzRCA9IG5ldyBDaGFydE9wdGlvbnMuc2VyaWVzKCk7XHJcbiAgICAgICAgc2VyaWVzRC50eXBlID0gJ2Jhcic7XHJcbiAgICAgICAgc2VyaWVzRC5zdGFjayA9ICfmgLvph48nO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDE1O1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlID0gbmV3IENoYXJ0T3B0aW9ucy5pdGVtU3R5bGUoKTtcclxuICAgICAgICBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwgPSBuZXcgQ2hhcnRPcHRpb25zLm5vcm1hbCgpO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbC5iYXJCb3JkZXJSYWRpdXMgPSBbMCwgMjAsIDIwLCAwXTtcclxuXHJcbiAgICAgICAgbGV0IGNvbG9ycyA9IFtcIiNGOEEzMTFcIiwgXCIjQUJENEVGXCIsIFwiIzAwRDVFMlwiLCBcIiNGQjcwNjFcIiwgXCIjNkM4Q0U0XCIsIFwiIzdDQ0NGMlwiXTtcclxuICAgICAgICBsZXQgY29sb3JBcnI6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICB5RGF0YS5mb3JFYWNoKCh5OiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY29sb3JzW2luZGV4XSA9IGNvbG9yQXJyW01hdGguY2VpbChNYXRoLnJvdW5kKGNvbG9ycy5sZW5ndGgpKV1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGFyZWFTdHlsZUNvbG9yOiBhbnkgPSBuZXcgQ2hhcnRPcHRpb25zLmFyZWFTdHlsZUNvbG9yKFtcIiNGOEEzMTFcIl0pO1xyXG4gICAgICAgIHNlcmllc0QuaXRlbVN0eWxlLm5vcm1hbCA9ICQuZXh0ZW5kKGFyZWFTdHlsZUNvbG9yLmNvbG9yRGlmZigpLCBzZXJpZXNELml0ZW1TdHlsZS5ub3JtYWwpO1xyXG5cclxuICAgICAgICBvcHRpb24uc2VyaWVzLnB1c2goc2VyaWVzRCk7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG9wdGlvbikpO1xyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldERhdGEobmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XHJcbiAgICAgICAgbGV0IG9wdGlvbjogYW55ID0gQ2hhcnRPcHRpb25PYmplY3QobmFtZSk7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FyZWFUYXNrU3RhdGlzdGljcyc6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSB0YXNrU3RhdGlzdGljc0NvbnRyb2xsZXIuYXJlYVRhc2tTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVGFza0NvbmZpZyA9IG9wdGlvbjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzJzoge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbmZpZyA9IHRhc2tTdGF0aXN0aWNzQ29udHJvbGxlci5hcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhRGlzcGF0Y2hlZFRhc2tDb25maWcgPSBvcHRpb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3MnOiB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29uZmlnID0gdGFza1N0YXRpc3RpY3NDb250cm9sbGVyLmRpc3BhdGNoZWRBYm91dFRhc2tTdGF0aXN0aWNzKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaGVkQWJvdXRUYXNrQ29uZmlnID0gb3B0aW9uO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWbvuW9ouS4juWIl+ihqOinhuWbvuWIh+aNolxyXG4gICAgcHVibGljIGFyZWFUYXNrSGlzdG9ncmFtKHN3aXRjaFN0cmluZzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgc3dpdGNoIChzd2l0Y2hTdHJpbmcpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXJlYVRhc2tIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFUYXNrTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdhcmVhVGFza0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFUYXNrTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnYXJlYURpc3BhdGNoZWRUYXNrSGlzdG9ncmFtJzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5hcmVhRGlzcGF0Y2hlZFRhc2tMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2FyZWFEaXNwYXRjaGVkVGFza0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmFyZWFEaXNwYXRjaGVkVGFza0xpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc3BhdGNoZWRBYm91dFRhc2tIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpc3BhdGNoZWRBYm91dFRhc2tMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ2Rpc3BhdGNoZWRBYm91dExpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmRpc3BhdGNoZWRBYm91dFRhc2tMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0SW1hZ2UoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmV4cG9ydEltYWdlKGlkKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleHBvcnRFeGNlbChtb2R1bGU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZXhwb3J0RXhjZWwobW9kdWxlLCBkYXRhKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ0YXNrU3RhdGlzdGljc0NvbnRyb2xsZXJcIiwgdGFza1N0YXRpc3RpY3NDb250cm9sbGVyKTsiXX0=
