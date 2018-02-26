define(["require", "exports", "../../../common/app/main.app", "../mockEnum", "../../../common/enum/EchartConfig", "../../../../core/entity/maintainEnum", "../../../../core/entity/OperThirdModule", "../../main/maintainFactory", "../../../common/factory/dataSelect.factory", "css!module/maintain/css/analysisStatistics.css", "../../main/maintainFactory", "../../../common/factory/dataSelect.factory", "moment"], function (require, exports, main_app_1, mockEnum_1, ChartOptions, maintainEnum_1, OperThirdModule_1, maintainFactory_1, dataSelect_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var analysisStatisticsController = (function () {
        function analysisStatisticsController($scope, $timeout, maintainFactory, maintainService, dataSelectServer) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.maintainFactory = maintainFactory;
            this.maintainService = maintainService;
            this.dataSelectServer = dataSelectServer;
            this.mockAreaStatistic = mockEnum_1.MockAreaStatisticList(1);
            this.MockStatisticsOverview = mockEnum_1.MockStatisticsOverviewList(4);
            this.MockNumber = mockEnum_1.MockNumber;
            this.carAnalysisStatisticsList = true;
            this.personAnalysisStatisticsList = true;
            this.macAnalysisStatisticsList = true;
            this.crashAnalysisStatisticsList = true;
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
            this.Vehicle_Date_Model = new maintainFactory_1.allParams(this.ModuleNameArr.IntelligentAnalysis_Vehicle);
            this.Face_Date_Model = new maintainFactory_1.allParams(this.ModuleNameArr.IntelligentAnalysis_Face);
            this.Mac_Date_Model = new maintainFactory_1.allParams(this.ModuleNameArr.IntelligentAnalysis_Mac);
            this.Crash_Date_Model = new maintainFactory_1.allParams(this.ModuleNameArr.IntelligentAnalysis_Crash);
            this.timeItem = angular.copy(maintainEnum_1.SelectData);
            this.IntelligentAnalysis_Face_Time = { module: "", startTime: "", endTime: "" };
            this.echartNameArr = maintainEnum_1.echartNameArr;
            this.CrashModuleName = "IntelligentAnalysis_More_FaceMacCrash, IntelligentAnalysis_More_VehicleMacCrash";
            this.initChart();
            $scope.$on('initChart', function (evt, opt) {
                _this.initChart();
            });
            $scope.$on('$destroy', function () {
                _this.maintainFactory.destroyChart();
            });
        }
        analysisStatisticsController.prototype.initVehicleAnalysis = function (value) {
            var params = this.getTimeParams(this.Vehicle_Date_Model, value);
            if (!params) {
                return;
            }
            params.moduleNames = maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Vehicle;
            this.findDataFun(params, maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Vehicle);
        };
        analysisStatisticsController.prototype.initFaceAnalysis = function (value) {
            var params = this.getTimeParams(this.Face_Date_Model, value);
            if (!params) {
                return;
            }
            params.moduleNames = maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Face;
            this.findDataFun(params, maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Face);
        };
        analysisStatisticsController.prototype.initMacAnalysis = function (value) {
            var params = this.getTimeParams(this.Mac_Date_Model, value);
            if (!params) {
                return;
            }
            params.moduleNames = maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Mac;
            this.findDataFun(params, maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Mac);
        };
        analysisStatisticsController.prototype.initCrashAnalysis = function (value) {
            var params = this.getTimeParams(this.Crash_Date_Model, value);
            if (!params) {
                return;
            }
            params.moduleNames = angular.copy(this.CrashModuleName);
            this.findDataFun(params, maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Crash);
        };
        analysisStatisticsController.prototype.getTimeParams = function (modelParam, value) {
            var params = {};
            params.endDate = moment().format("YYYY-MM-DD hh:mm:ss");
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
                params.statisticModuleLevel = 3;
                return params;
            }
        };
        analysisStatisticsController.prototype.findDataFun = function (params, module) {
            var _this = this;
            var that = this;
            that.maintainService.intelligentAnalysis(params).then(function (res) {
                if (res && res.data) {
                    that.maintainFactory.initChart(_this.setData(module, res.data));
                }
            });
        };
        analysisStatisticsController.prototype.initChart = function (module) {
            var _this = this;
            var arr = Object.keys(maintainEnum_1.analysisStatisticModuleNames);
            var params = this.initParams(module);
            params.forEach(function (param, index) {
                _this.findDataFun(param, arr[index]);
            });
        };
        analysisStatisticsController.prototype.initParams = function (module) {
            var _this = this;
            var results = [];
            var allCode = Object.keys(maintainEnum_1.analysisStatisticModuleNames);
            if (!module) {
                allCode.forEach(function (code) {
                    var result = angular.copy(maintainEnum_1.analysisStatisticsParams);
                    result.moduleNames = code;
                    result.beginDate = moment().subtract(1, 'year').format("YYYY-MM-DD 00:00:00");
                    result.endDate = moment().format("YYYY-MM-DD 23:59:59");
                    if (code == maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Crash) {
                        result.moduleNames = angular.copy(_this.CrashModuleName);
                    }
                    results.push(result);
                });
            }
            else {
                var result = module;
                results.push(result);
            }
            return results;
        };
        analysisStatisticsController.IntelligentAnalysis_Vehicle = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
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
        analysisStatisticsController.IntelligentAnalysis_Face = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#7cccf2"];
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
        analysisStatisticsController.IntelligentAnalysis_Mac = function (data) {
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#dcbe99"];
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
        analysisStatisticsController.IntelligentAnalysis_Crash = function (data) {
            console.log(data);
            var seriesData = data.seriesData;
            var xData = data.xData;
            var option = new ChartOptions.EChartOption();
            option.tooltip = new ChartOptions.tooltip();
            option.color = ["#dcbe99"];
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
        analysisStatisticsController.prototype.setData = function (name, data) {
            var option = maintainFactory_1.ChartOptionObject(name);
            var listDataXData = ["分析统计", "统计次数"];
            switch (name) {
                case maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Vehicle: {
                    data = this.getXData(analysisStatisticsController.ModelListOne, data);
                    this.VehicleTableList = angular.copy(data);
                    this.VehicleTableList.legendData = listDataXData;
                    option.config = analysisStatisticsController.IntelligentAnalysis_Vehicle(data);
                    return option;
                }
                case maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Face: {
                    data = this.getXData(analysisStatisticsController.ModelListTwo, data);
                    this.FaceTableList = angular.copy(data);
                    this.FaceTableList.legendData = listDataXData;
                    option.config = analysisStatisticsController.IntelligentAnalysis_Face(data);
                    return option;
                }
                case maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Mac: {
                    data = this.getXData(analysisStatisticsController.ModelListThird, data);
                    this.MacTableList = angular.copy(data);
                    this.MacTableList.legendData = listDataXData;
                    option.config = analysisStatisticsController.IntelligentAnalysis_Mac(data);
                    return option;
                }
                case maintainEnum_1.intelligentAnalysisData.IntelligentAnalysis_Crash: {
                    this.CrashTableList = angular.copy(data);
                    this.CrashTableList.legendData = listDataXData;
                    option.config = analysisStatisticsController.IntelligentAnalysis_Crash(data);
                    return option;
                }
            }
        };
        analysisStatisticsController.prototype.getXData = function (xDataModule, data) {
            var newData = {
                seriesData: [],
                xData: []
            };
            xDataModule.forEach(function (Module, index) {
                newData.seriesData[index] = 0;
                newData.xData[index] = Module.name;
                data.xData.forEach(function (xData, idx) {
                    if (Module.name == xData) {
                        newData.seriesData[index] = data.seriesData[idx];
                    }
                });
            });
            return newData;
        };
        analysisStatisticsController.prototype.analysisSwitch = function (switchString) {
            var that = this;
            switch (switchString) {
                case 'carAnalysisHistogram': {
                    that.carAnalysisStatisticsList = true;
                    break;
                }
                case 'carAnalysisList': {
                    that.carAnalysisStatisticsList = false;
                    break;
                }
                case 'personAnalysisHistogram': {
                    that.personAnalysisStatisticsList = true;
                    break;
                }
                case 'personAnalysisList': {
                    that.personAnalysisStatisticsList = false;
                    break;
                }
                case 'macAnalysisHistogram': {
                    that.macAnalysisStatisticsList = true;
                    break;
                }
                case 'macAnalysisList': {
                    that.macAnalysisStatisticsList = false;
                    break;
                }
                case 'CrashAnalysisHistogram': {
                    that.crashAnalysisStatisticsList = true;
                    break;
                }
                case 'CrashAnalysisList': {
                    that.crashAnalysisStatisticsList = false;
                    break;
                }
            }
        };
        analysisStatisticsController.prototype.exportImage = function (id) {
            this.maintainFactory.exportImage(id);
        };
        analysisStatisticsController.prototype.exportExcel = function (module, data) {
            this.maintainFactory.exportExcel(module, data);
        };
        analysisStatisticsController.$inject = ["$scope", "$timeout", "maintainFactory", "maintainService", "dataSelectServer"];
        analysisStatisticsController.ModelListOne = [
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_Track,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_FollowAnalysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_HideDig,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_CrashAnalysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_FakePlate,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Vehicle_FrequentCrose
        ];
        analysisStatisticsController.ModelListTwo = [
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Track,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_Analysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AccompanyAnalysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAnalysis,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_FrequencyAppear,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_More_FaceMacCrash,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Face_AlarmAnalysis
        ];
        analysisStatisticsController.ModelListThird = [
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Track,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Accompany,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Frequency,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Alarm,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_Mac_Crash,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_More_FaceMacCrash,
            OperThirdModule_1.OperThirdModule.IntelligentAnalysis_More_VehicleMacCrash
        ];
        return analysisStatisticsController;
    }());
    main_app_1.app.controller("analysisStatisticsController", analysisStatisticsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vc3RhdGlzdGljc092ZXJ2aWV3L2FuYWx5c2lzU3RhdGlzdGljcy9hbmFseXNpc1N0YXRpc3RpY3MuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUErQkE7UUFnQ0ksc0NBQW9CLE1BQVcsRUFDbkIsUUFBYSxFQUNiLGVBQStCLEVBQy9CLGVBQWlDLEVBQ2pDLGdCQUFrQztZQUo5QyxpQkFlQztZQWZtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ25CLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7WUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFoQzlDLHNCQUFpQixHQUE2QixnQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSwyQkFBc0IsR0FBa0MscUNBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsZUFBVSxHQUFRLHFCQUFVLENBQUM7WUFFN0IsOEJBQXlCLEdBQVksSUFBSSxDQUFDO1lBQzFDLGlDQUE0QixHQUFZLElBQUksQ0FBQztZQUM3Qyw4QkFBeUIsR0FBWSxJQUFJLENBQUM7WUFDMUMsZ0NBQTJCLEdBQVksSUFBSSxDQUFDO1lBSTVDLGtCQUFhLEdBQWdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0NBQXVCLENBQUMsQ0FBQztZQUNuRix1QkFBa0IsR0FBYyxJQUFJLDJCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzlGLG9CQUFlLEdBQWMsSUFBSSwyQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN4RixtQkFBYyxHQUFjLElBQUksMkJBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdEYscUJBQWdCLEdBQWMsSUFBSSwyQkFBUyxDQUFDLElB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UyxHQUFHLEVBQUUsQ0FBQztZQUM3QixNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFLOUIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFJbkQsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFD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LE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUMzQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFTLENBQUM7WUFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUs5QixNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFB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QU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztZQUMvQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDbEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUduRCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFeEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLElB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Q0FBcUM7WUFDckQsaUNBQWUsQ0FBQyx3Q0FBd0M7U0FDM0QsQ0FBQztRQWdETixtQ0FBQztLQXBpQkQsQUFvaUJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLDRCQUE0QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21haW50YWluL3N0YXRpc3RpY3NPdmVydmlldy9hbmFseXNpc1N0YXRpc3RpY3MvYW5hbHlzaXNTdGF0aXN0aWNzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhbW9kdWxlL21haW50YWluL2Nzcy9hbmFseXNpc1N0YXRpc3RpY3MuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL21haW4vbWFpbnRhaW5GYWN0b3J5XCJcclxuaW1wb3J0IHtcclxuICAgIE1vY2tBcmVhU3RhdGlzdGljLFxyXG4gICAgTW9ja0FyZWFTdGF0aXN0aWNMaXN0LFxyXG4gICAgTW9ja051bWJlcixcclxuICAgIE1vY2tTdGF0aXN0aWNzT3ZlcnZpZXcsXHJcbiAgICBNb2NrU3RhdGlzdGljc092ZXJ2aWV3TGlzdFxyXG59IGZyb20gXCIuLi9tb2NrRW51bVwiO1xyXG5pbXBvcnQgKiBhcyBDaGFydE9wdGlvbnMgZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBJTWFpbnRhaW5TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWludGFpbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcyxcclxuICAgIGFuYWx5c2lzU3RhdGlzdGljc1BhcmFtcyxcclxuICAgIGludGVsbGlnZW50QW5hbHlzaXNEYXRhLFxyXG4gICAgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtLFxyXG4gICAgYW5hbHlzaXNTdGF0aXN0aWNzUmVzdWx0LFxyXG4gICAgU2VsZWN0RGF0YSxcclxuICAgIHNlbGVjdERhdGFFbnVtLFxyXG4gICAgZWNoYXJ0TmFtZUFycixcclxuICAgIGFuYWx5c2lzU3RhdGlzdGljTW9kdWxlTmFtZXNcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvbWFpbnRhaW5FbnVtXCI7XHJcbmltcG9ydCB7IEJhY2tSZXNwb25zZUJvZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IE9wZXJUaGlyZE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGVcIjtcclxuaW1wb3J0IHsgSUVjaGFydEZhY3RvcnksIENoYXJ0T3B0aW9uT2JqZWN0LCBhbGxQYXJhbXMgfSBmcm9tIFwiLi4vLi4vbWFpbi9tYWludGFpbkZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGF0YVNlbGVjdC5mYWN0b3J5XCJcclxuaW1wb3J0IHsgZGF0YVNlbGVjdFNlcnZlciwgZGF0YVNlbGVjdFJlc3VsdCwgbW9kdWxlU3RyaW5nIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2RhdGFTZWxlY3QuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCJtb21lbnRcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCBtb21lbnQ6IGFueTtcclxuXHJcbmNsYXNzIGFuYWx5c2lzU3RhdGlzdGljc0NvbnRyb2xsZXIge1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJtYWludGFpbkZhY3RvcnlcIiwgXCJtYWludGFpblNlcnZpY2VcIiwgXCJkYXRhU2VsZWN0U2VydmVyXCJdO1xyXG4gICAgLy9tb2NrXHJcbiAgICBtb2NrQXJlYVN0YXRpc3RpYzogQXJyYXk8TW9ja0FyZWFTdGF0aXN0aWM+ID0gTW9ja0FyZWFTdGF0aXN0aWNMaXN0KDEpO1xyXG4gICAgTW9ja1N0YXRpc3RpY3NPdmVydmlldzogQXJyYXk8TW9ja1N0YXRpc3RpY3NPdmVydmlldz4gPSBNb2NrU3RhdGlzdGljc092ZXJ2aWV3TGlzdCg0KTtcclxuICAgIE1vY2tOdW1iZXI6IGFueSA9IE1vY2tOdW1iZXI7XHJcbiAgICAvLyDliIfmjaLmjInpkq5cclxuICAgIGNhckFuYWx5c2lzU3RhdGlzdGljc0xpc3Q6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcGVyc29uQW5hbHlzaXNTdGF0aXN0aWNzTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBtYWNBbmFseXNpc1N0YXRpc3RpY3NMaXN0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGNyYXNoQW5hbHlzaXNTdGF0aXN0aWNzTGlzdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAvLyDojrflj5blkI7nq6/kv6Hmga9cclxuICAgIHN1cGVyRGF0YTogYW55O1xyXG4gICAgLy/ml7bpl7Tmjqfku7ZcclxuICAgIE1vZHVsZU5hbWVBcnI6IGludGVsbGlnZW50QW5hbHlzaXNEYXRhRW51bSA9IGFuZ3VsYXIuY29weShpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YSk7XHJcbiAgICBWZWhpY2xlX0RhdGVfTW9kZWw6IGFsbFBhcmFtcyA9IG5ldyBhbGxQYXJhbXModGhpcy5Nb2R1bGVOYW1lQXJyLkludGVsbGlnZW50QW5hbHlzaXNfVmVoaWNsZSk7XHJcbiAgICBGYWNlX0RhdGVfTW9kZWw6IGFsbFBhcmFtcyA9IG5ldyBhbGxQYXJhbXModGhpcy5Nb2R1bGVOYW1lQXJyLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZSk7XHJcbiAgICBNYWNfRGF0ZV9Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuSW50ZWxsaWdlbnRBbmFseXNpc19NYWMpO1xyXG4gICAgQ3Jhc2hfRGF0ZV9Nb2RlbDogYWxsUGFyYW1zID0gbmV3IGFsbFBhcmFtcyh0aGlzLk1vZHVsZU5hbWVBcnIuSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaCk7XHJcblxyXG4gICAgdGltZUl0ZW06IEFycmF5PHNlbGVjdERhdGFFbnVtPiA9IGFuZ3VsYXIuY29weShTZWxlY3REYXRhKTtcclxuICAgIEludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9UaW1lOiBhbnkgPSB7IG1vZHVsZTogXCJcIiwgc3RhcnRUaW1lOiBcIlwiLCBlbmRUaW1lOiBcIlwiIH07XHJcblxyXG4gICAgZWNoYXJ0TmFtZUFycjogYW55ID0gZWNoYXJ0TmFtZUFycjtcclxuICAgIENyYXNoTW9kdWxlTmFtZTogc3RyaW5nID0gXCJJbnRlbGxpZ2VudEFuYWx5c2lzX01vcmVfRmFjZU1hY0NyYXNoLCBJbnRlbGxpZ2VudEFuYWx5c2lzX01vcmVfVmVoaWNsZU1hY0NyYXNoXCI7XHJcbiAgICAvL+WIl+ihqOinhuWbvlxyXG4gICAgVmVoaWNsZVRhYmxlTGlzdDogYW55O1xyXG4gICAgRmFjZVRhYmxlTGlzdDogYW55O1xyXG4gICAgTWFjVGFibGVMaXN0OiBhbnk7XHJcbiAgICBDcmFzaFRhYmxlTGlzdDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbWFpbnRhaW5GYWN0b3J5OiBJRWNoYXJ0RmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIG1haW50YWluU2VydmljZTogSU1haW50YWluU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGRhdGFTZWxlY3RTZXJ2ZXI6IGRhdGFTZWxlY3RTZXJ2ZXJcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuaW5pdENoYXJ0KCk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oJ2luaXRDaGFydCcsIChldnQ6IGFueSwgb3B0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbml0Q2hhcnQoKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYWludGFpbkZhY3RvcnkuZGVzdHJveUNoYXJ0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW6L2m6L6G5YiG5p6Q57uf6K6hXHJcbiAgICBpbml0VmVoaWNsZUFuYWx5c2lzKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0VGltZVBhcmFtcyh0aGlzLlZlaGljbGVfRGF0ZV9Nb2RlbCwgdmFsdWUpIGFzIGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zO1xyXG4gICAgICAgIGlmICghcGFyYW1zKSB7IHJldHVybiB9XHJcbiAgICAgICAgcGFyYW1zLm1vZHVsZU5hbWVzID0gaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEuSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlO1xyXG5cclxuICAgICAgICB0aGlzLmZpbmREYXRhRnVuKHBhcmFtcywgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEuSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluS6uuWRmOWIhuaekOe7n+iuoVxyXG4gICAgaW5pdEZhY2VBbmFseXNpcyh2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFRpbWVQYXJhbXModGhpcy5GYWNlX0RhdGVfTW9kZWwsIHZhbHVlKSBhcyBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcztcclxuICAgICAgICBpZiAoIXBhcmFtcykgeyByZXR1cm4gfVxyXG4gICAgICAgIHBhcmFtcy5tb2R1bGVOYW1lcyA9IGludGVsbGlnZW50QW5hbHlzaXNEYXRhLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZTtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kRGF0YUZ1bihwYXJhbXMsIGludGVsbGlnZW50QW5hbHlzaXNEYXRhLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJbmhJ/nn6XmlbDmja7liIbmnpDnu5/orqFcclxuICAgIGluaXRNYWNBbmFseXNpcyh2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFRpbWVQYXJhbXModGhpcy5NYWNfRGF0ZV9Nb2RlbCwgdmFsdWUpIGFzIGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zO1xyXG4gICAgICAgIGlmICghcGFyYW1zKSB7IHJldHVybiB9XHJcbiAgICAgICAgcGFyYW1zLm1vZHVsZU5hbWVzID0gaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEuSW50ZWxsaWdlbnRBbmFseXNpc19NYWM7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZERhdGFGdW4ocGFyYW1zLCBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hYylcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vnorDmkp7liIbmnpDnu5/orqFcclxuICAgIGluaXRDcmFzaEFuYWx5c2lzKHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0VGltZVBhcmFtcyh0aGlzLkNyYXNoX0RhdGVfTW9kZWwsIHZhbHVlKSBhcyBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcztcclxuICAgICAgICBpZiAoIXBhcmFtcykgeyByZXR1cm4gfVxyXG5cclxuICAgICAgICBwYXJhbXMubW9kdWxlTmFtZXMgPSBhbmd1bGFyLmNvcHkodGhpcy5DcmFzaE1vZHVsZU5hbWUpO1xyXG4gICAgICAgIHRoaXMuZmluZERhdGFGdW4ocGFyYW1zLCBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YS5JbnRlbGxpZ2VudEFuYWx5c2lzX0NyYXNoKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOW+l+WIsOaXtumXtOWPguaVsOWIneWni+WMluWbvuihqFxyXG4gICAgcHJpdmF0ZSBnZXRUaW1lUGFyYW1zKG1vZGVsUGFyYW06IGFsbFBhcmFtcywgdmFsdWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge30gYXMgaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXM7XHJcbiAgICAgICAgcGFyYW1zLmVuZERhdGUgPSBtb21lbnQoKS5mb3JtYXQoXCJZWVlZLU1NLUREIGhoOm1tOnNzXCIpO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0OiBkYXRhU2VsZWN0UmVzdWx0ID0gdGhpcy5kYXRhU2VsZWN0U2VydmVyLmdldFBhcmFtc1RpbWUobW9kZWxQYXJhbSk7XHJcblxyXG4gICAgICAgIGlmIChtb2RlbFBhcmFtLm1vZHVsZSA9PSBtb2R1bGVTdHJpbmcuQ3VzdG9tICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZUFycjogQXJyYXk8c3RyaW5nPiA9IHZhbHVlLnNwbGl0KFwiIC0gXCIpO1xyXG4gICAgICAgICAgICBwYXJhbXMuYmVnaW5EYXRlID0gdmFsdWVBcnJbMF07XHJcbiAgICAgICAgICAgIHBhcmFtcy5lbmREYXRlID0gdmFsdWVBcnJbMV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGFyYW1zLmJlZ2luRGF0ZSA9IHJlc3VsdC5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHBhcmFtcy5lbmREYXRlID0gcmVzdWx0LmVuZFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1zLmJlZ2luRGF0ZSAmJiBwYXJhbXMuZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICBwYXJhbXMuc3RhdGlzdGljTW9kdWxlTGV2ZWwgPSAzO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlkI7lj7Dor7fmsYJcclxuICAgIHByaXZhdGUgZmluZERhdGFGdW4ocGFyYW1zOiBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcywgbW9kdWxlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW5hbHlzaXNTdGF0aXN0aWNzQ29udHJvbGxlciA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC5tYWludGFpblNlcnZpY2UuaW50ZWxsaWdlbnRBbmFseXNpcyhwYXJhbXMpLnRoZW4oKHJlczogQmFja1Jlc3BvbnNlQm9keTxBcnJheTxhbmFseXNpc1N0YXRpc3RpY3NSZXN1bHQ+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1haW50YWluRmFjdG9yeS5pbml0Q2hhcnQodGhpcy5zZXREYXRhKG1vZHVsZSwgcmVzLmRhdGEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluWbvuihqFxyXG4gICAgcHJpdmF0ZSBpbml0Q2hhcnQobW9kdWxlPzogaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXMpIHtcclxuICAgICAgICBsZXQgYXJyID0gT2JqZWN0LmtleXMoYW5hbHlzaXNTdGF0aXN0aWNNb2R1bGVOYW1lcykgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBsZXQgcGFyYW1zOiBBcnJheTxpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcz4gPSB0aGlzLmluaXRQYXJhbXMobW9kdWxlKTtcclxuXHJcbiAgICAgICAgcGFyYW1zLmZvckVhY2goKHBhcmFtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmZpbmREYXRhRnVuKHBhcmFtLCBhcnJbaW5kZXhdKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluWPguaVsOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKG1vZHVsZT86IGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSBbXSBhcyBBcnJheTxpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcz47XHJcbiAgICAgICAgbGV0IGFsbENvZGUgPSBPYmplY3Qua2V5cyhhbmFseXNpc1N0YXRpc3RpY01vZHVsZU5hbWVzKSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGlmICghbW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGFsbENvZGUuZm9yRWFjaCgoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGFuZ3VsYXIuY29weShhbmFseXNpc1N0YXRpc3RpY3NQYXJhbXMpIGFzIGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1vZHVsZU5hbWVzID0gY29kZTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5iZWdpbkRhdGUgPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAneWVhcicpLmZvcm1hdChcIllZWVktTU0tREQgMDA6MDA6MDBcIik7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuZW5kRGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tREQgMjM6NTk6NTlcIilcclxuICAgICAgICAgICAgICAgIGlmIChjb2RlID09IGludGVsbGlnZW50QW5hbHlzaXNEYXRhLkludGVsbGlnZW50QW5hbHlzaXNfQ3Jhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQubW9kdWxlTmFtZXMgPSBhbmd1bGFyLmNvcHkodGhpcy5DcmFzaE1vZHVsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBtb2R1bGUgYXMgaW50ZWxsaWdlbnRBbmFseXNpc1JlcXVpcmVQYXJhbXM7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0c1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOi9pui+huWIhuaekOe7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGRhdGEuc2VyaWVzRGF0YSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gZGF0YS54RGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzZjOGNlNFwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZC5sZWZ0O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQucmlnaHQgPSBcIjIwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IFwiMTBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1XaWR0aCA9IDE1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUhlaWdodCA9IDEwO1xyXG5cclxuICAgICAgICAvLyBsZXQgbGVnZW5kRGF0YSA9IHRoaXMubW9ja0FyZWFTdGF0aXN0aWNbMF0ucmV0cmlldmFsU3RhdGlzdGljcyBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDUwO1xyXG5cclxuICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsO1xyXG4gICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsLnBvc2l0aW9uID0gXCJpbnNpZGVSaWdodFwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS6uuWRmOWIhuaekOe7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlKGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VyaWVzRGF0YSA9IGRhdGEuc2VyaWVzRGF0YSBhcyBhbnk7XHJcbiAgICAgICAgbGV0IHhEYXRhID0gZGF0YS54RGF0YSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICBsZXQgb3B0aW9uID0gbmV3IENoYXJ0T3B0aW9ucy5FQ2hhcnRPcHRpb24oKTtcclxuICAgICAgICAvL3Rvb2x0aXBcclxuICAgICAgICBvcHRpb24udG9vbHRpcCA9IG5ldyBDaGFydE9wdGlvbnMudG9vbHRpcCgpO1xyXG5cclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiIzdjY2NmMlwiXTtcclxuXHJcbiAgICAgICAgLy9sZWdlbmRcclxuICAgICAgICBvcHRpb24ubGVnZW5kID0gbmV3IENoYXJ0T3B0aW9ucy5sZWdlbmQoKTtcclxuICAgICAgICBkZWxldGUgb3B0aW9uLmxlZ2VuZC5sZWZ0O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQucmlnaHQgPSBcIjIwcHhcIjtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLnRvcCA9IFwiMTBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YSA9IFtdIGFzIGFueTtcclxuICAgICAgICBvcHRpb24ubGVnZW5kLml0ZW1XaWR0aCA9IDE1O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbUhlaWdodCA9IDEwO1xyXG5cclxuICAgICAgICAvLyBsZXQgbGVnZW5kRGF0YSA9IHRoaXMubW9ja0FyZWFTdGF0aXN0aWNbMF0ucmV0cmlldmFsU3RhdGlzdGljcyBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgICAgICAvL3hBeGlzXHJcbiAgICAgICAgb3B0aW9uLnhBeGlzID0gbmV3IENoYXJ0T3B0aW9ucy54QXhpcygpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy50eXBlID0gXCJjYXRlZ29yeVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5kYXRhID0geERhdGE7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMYWJlbCgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLnNwbGl0TGluZSgpO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmludGVydmFsID0gZmFsc2U7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFwiI0M5QzlDOVwiO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5jb2xvciA9IFwiIzZGNkU2RVwiO1xyXG4gICAgICAgIC8vIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmZvbnRTaXplID0gXCIxMFwiO1xyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDUwO1xyXG5cclxuICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsO1xyXG4gICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsLnBvc2l0aW9uID0gXCJpbnNpZGVSaWdodFwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIE1BQ+WIhuaekOe7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19NYWMoZGF0YT86IGFueSkge1xyXG4gICAgICAgIGxldCBzZXJpZXNEYXRhID0gZGF0YS5zZXJpZXNEYXRhIGFzIGFueTtcclxuICAgICAgICBsZXQgeERhdGEgPSBkYXRhLnhEYXRhIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIGxldCBvcHRpb24gPSBuZXcgQ2hhcnRPcHRpb25zLkVDaGFydE9wdGlvbigpO1xyXG4gICAgICAgIC8vdG9vbHRpcFxyXG4gICAgICAgIG9wdGlvbi50b29sdGlwID0gbmV3IENoYXJ0T3B0aW9ucy50b29sdGlwKCk7XHJcblxyXG4gICAgICAgIC8vY29sb3JcclxuICAgICAgICBvcHRpb24uY29sb3IgPSBbXCIjZGNiZTk5XCJdO1xyXG5cclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIxMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcblxyXG4gICAgICAgIC8vIGxldCBsZWdlbmREYXRhID0gdGhpcy5tb2NrQXJlYVN0YXRpc3RpY1swXS5yZXRyaWV2YWxTdGF0aXN0aWNzIGFzIEFycmF5PHN0cmluZz47XHJcblxyXG4gICAgICAgIC8veEF4aXNcclxuICAgICAgICBvcHRpb24ueEF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnhBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnR5cGUgPSBcImNhdGVnb3J5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmRhdGEgPSB4RGF0YTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUgPSBuZXcgQ2hhcnRPcHRpb25zLmF4aXNMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbCA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xhYmVsKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZSA9IG5ldyBDaGFydE9wdGlvbnMuc3BsaXRMaW5lKCk7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5zaG93ID0gdHJ1ZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5jb2xvciA9IFtcIiNGOEYwRTlcIl07XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuaW50ZXJ2YWwgPSBmYWxzZTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUubGluZVN0eWxlLmNvbG9yID0gXCIjQzlDOUM5XCI7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGFiZWwudGV4dFN0eWxlLmNvbG9yID0gXCIjNkY2RTZFXCI7XHJcbiAgICAgICAgLy8gb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuZm9udFNpemUgPSBcIjEwXCI7ZFxyXG5cclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDUwO1xyXG5cclxuICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsO1xyXG4gICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsLnBvc2l0aW9uID0gXCJpbnNpZGVSaWdodFwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOeisOaSnuWIhuaekOe7n+iuoVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaChkYXRhPzogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgbGV0IHNlcmllc0RhdGEgPSBkYXRhLnNlcmllc0RhdGEgYXMgYW55O1xyXG4gICAgICAgIGxldCB4RGF0YSA9IGRhdGEueERhdGEgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IG5ldyBDaGFydE9wdGlvbnMuRUNoYXJ0T3B0aW9uKCk7XHJcbiAgICAgICAgLy90b29sdGlwXHJcbiAgICAgICAgb3B0aW9uLnRvb2x0aXAgPSBuZXcgQ2hhcnRPcHRpb25zLnRvb2x0aXAoKTtcclxuICAgICAgICAvL2NvbG9yXHJcbiAgICAgICAgb3B0aW9uLmNvbG9yID0gW1wiI2RjYmU5OVwiXTtcclxuICAgICAgICAvL2xlZ2VuZFxyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQgPSBuZXcgQ2hhcnRPcHRpb25zLmxlZ2VuZCgpO1xyXG4gICAgICAgIGRlbGV0ZSBvcHRpb24ubGVnZW5kLmxlZnQ7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5yaWdodCA9IFwiMjBweFwiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQudG9wID0gXCIxMHB4XCI7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5kYXRhID0gW10gYXMgYW55O1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuaXRlbVdpZHRoID0gMTU7XHJcbiAgICAgICAgb3B0aW9uLmxlZ2VuZC5pdGVtSGVpZ2h0ID0gMTA7XHJcbiAgICAgICAgLy94QXhpc1xyXG4gICAgICAgIG9wdGlvbi54QXhpcyA9IG5ldyBDaGFydE9wdGlvbnMueEF4aXMoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMudHlwZSA9IFwiY2F0ZWdvcnlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuZGF0YSA9IHhEYXRhO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZSA9IG5ldyBDaGFydE9wdGlvbnMuYXhpc0xpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5heGlzTGFiZWwoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lID0gbmV3IENoYXJ0T3B0aW9ucy5zcGxpdExpbmUoKTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLnNob3cgPSB0cnVlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5zcGxpdExpbmUubGluZVN0eWxlLmNvbG9yID0gW1wiI0Y4RjBFOVwiXTtcclxuICAgICAgICBvcHRpb24ueEF4aXMuc3BsaXRMaW5lLmxpbmVTdHlsZS5pbnRlcnZhbCA9IGZhbHNlO1xyXG4gICAgICAgIG9wdGlvbi54QXhpcy5heGlzTGluZS5saW5lU3R5bGUuY29sb3IgPSBcIiNDOUM5QzlcIjtcclxuICAgICAgICBvcHRpb24ueEF4aXMuYXhpc0xpbmUuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgb3B0aW9uLnhBeGlzLmF4aXNMYWJlbC50ZXh0U3R5bGUuY29sb3IgPSBcIiM2RjZFNkVcIjtcclxuICAgICAgICAvLyBvcHRpb24ueEF4aXMuYXhpc0xhYmVsLnRleHRTdHlsZS5mb250U2l6ZSA9IFwiMTBcIjtcclxuICAgICAgICAvL2dyaWRcclxuICAgICAgICBvcHRpb24uZ3JpZCA9IG5ldyBDaGFydE9wdGlvbnMuZ3JpZCgpO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLnRvcCA9IDUwO1xyXG4gICAgICAgIG9wdGlvbi5ncmlkLmJvdHRvbSA9IDIwO1xyXG5cclxuICAgICAgICBvcHRpb24ueUF4aXMgPSBuZXcgQ2hhcnRPcHRpb25zLnlBeGlzKCk7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnR5cGUgPSBcInZhbHVlXCI7XHJcbiAgICAgICAgb3B0aW9uLnlBeGlzLnNwbGl0TGluZS5saW5lU3R5bGUuY29sb3IgPSBbXCIjRjhGMEU5XCJdO1xyXG4gICAgICAgIG9wdGlvbi55QXhpcy5zcGxpdExpbmUuc2hvdyA9IHRydWU7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMgPSBbXSBhcyBBcnJheTxhbnk+O1xyXG4gICAgICAgIC8vIGxlZ2VuZFxyXG4gICAgICAgIGxldCBsZWdlbmRBcnJheURhdGEgPSB7fSBhcyBDaGFydE9wdGlvbnMuZGF0YVRleHQ7XHJcbiAgICAgICAgbGVnZW5kQXJyYXlEYXRhLnRleHRTdHlsZSA9IG5ldyBDaGFydE9wdGlvbnMuZGF0YVN0eWxlVGV4dCgpO1xyXG4gICAgICAgIGxlZ2VuZEFycmF5RGF0YS5pY29uID0gXCJzdGFja1wiO1xyXG4gICAgICAgIG9wdGlvbi5sZWdlbmQuZGF0YS5wdXNoKGxlZ2VuZEFycmF5RGF0YSk7XHJcbiAgICAgICAgLy8gc2VyaWVzXHJcbiAgICAgICAgbGV0IHNlcmllc0QgPSBuZXcgQ2hhcnRPcHRpb25zLnNlcmllcygpO1xyXG4gICAgICAgIHNlcmllc0QudHlwZSA9IFwiYmFyXCI7XHJcbiAgICAgICAgc2VyaWVzRC5iYXJXaWR0aCA9IDUwO1xyXG5cclxuICAgICAgICBzZXJpZXNELmxhYmVsID0gbmV3IENoYXJ0T3B0aW9ucy5sYWJlbDtcclxuICAgICAgICBzZXJpZXNELmxhYmVsLm5vcm1hbCA9IG5ldyBDaGFydE9wdGlvbnMubm9ybWFsO1xyXG4gICAgICAgIHNlcmllc0QubGFiZWwubm9ybWFsLnBvc2l0aW9uID0gXCJpbnNpZGVSaWdodFwiO1xyXG4gICAgICAgIHNlcmllc0QuZGF0YSA9IHNlcmllc0RhdGE7XHJcblxyXG4gICAgICAgIG9wdGlvbi5zZXJpZXMucHVzaChzZXJpZXNEKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0RGF0YShuYW1lOiBzdHJpbmcsIGRhdGE/OiBhbnkpIHtcclxuICAgICAgICBsZXQgb3B0aW9uOiBhbnkgPSBDaGFydE9wdGlvbk9iamVjdChuYW1lKTtcclxuICAgICAgICBsZXQgbGlzdERhdGFYRGF0YTogQXJyYXk8c3RyaW5nPiA9IFtcIuWIhuaekOe7n+iuoVwiLCBcIue7n+iuoeasoeaVsFwiXTtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YS5JbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGU6IHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldFhEYXRhKGFuYWx5c2lzU3RhdGlzdGljc0NvbnRyb2xsZXIuTW9kZWxMaXN0T25lLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVmVoaWNsZVRhYmxlTGlzdCA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuVmVoaWNsZVRhYmxlTGlzdC5sZWdlbmREYXRhID0gbGlzdERhdGFYRGF0YTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSBhbmFseXNpc1N0YXRpc3RpY3NDb250cm9sbGVyLkludGVsbGlnZW50QW5hbHlzaXNfVmVoaWNsZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIGludGVsbGlnZW50QW5hbHlzaXNEYXRhLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuZ2V0WERhdGEoYW5hbHlzaXNTdGF0aXN0aWNzQ29udHJvbGxlci5Nb2RlbExpc3RUd28sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GYWNlVGFibGVMaXN0ID0gYW5ndWxhci5jb3B5KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5GYWNlVGFibGVMaXN0LmxlZ2VuZERhdGEgPSBsaXN0RGF0YVhEYXRhO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLmNvbmZpZyA9IGFuYWx5c2lzU3RhdGlzdGljc0NvbnRyb2xsZXIuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEuSW50ZWxsaWdlbnRBbmFseXNpc19NYWM6IHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmdldFhEYXRhKGFuYWx5c2lzU3RhdGlzdGljc0NvbnRyb2xsZXIuTW9kZWxMaXN0VGhpcmQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5NYWNUYWJsZUxpc3QgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1hY1RhYmxlTGlzdC5sZWdlbmREYXRhID0gbGlzdERhdGFYRGF0YTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi5jb25maWcgPSBhbmFseXNpc1N0YXRpc3RpY3NDb250cm9sbGVyLkludGVsbGlnZW50QW5hbHlzaXNfTWFjKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEuSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaDoge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DcmFzaFRhYmxlTGlzdCA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3Jhc2hUYWJsZUxpc3QubGVnZW5kRGF0YSA9IGxpc3REYXRhWERhdGE7XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uY29uZmlnID0gYW5hbHlzaXNTdGF0aXN0aWNzQ29udHJvbGxlci5JbnRlbGxpZ2VudEFuYWx5c2lzX0NyYXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0WERhdGEoeERhdGFNb2R1bGU6IEFycmF5PHsgY29kZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfT4sIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBuZXdEYXRhOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGE6IFtdLFxyXG4gICAgICAgICAgICB4RGF0YTogW11cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhEYXRhTW9kdWxlLmZvckVhY2goKE1vZHVsZTogeyBjb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld0RhdGEuc2VyaWVzRGF0YVtpbmRleF0gPSAwO1xyXG4gICAgICAgICAgICBuZXdEYXRhLnhEYXRhW2luZGV4XSA9IE1vZHVsZS5uYW1lO1xyXG4gICAgICAgICAgICBkYXRhLnhEYXRhLmZvckVhY2goKHhEYXRhOiBhbnksIGlkeDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTW9kdWxlLm5hbWUgPT0geERhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhLnNlcmllc0RhdGFbaW5kZXhdID0gZGF0YS5zZXJpZXNEYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0RhdGFcclxuICAgIH1cclxuXHJcbiAgICAvL+WbvuihqOaoquWdkOagh1xyXG4gICAgc3RhdGljIE1vZGVsTGlzdE9uZTogQXJyYXk8eyBjb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9PiA9IFtcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlX1RyYWNrLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGVfRm9sbG93QW5hbHlzaXMsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfVmVoaWNsZV9IaWRlRGlnLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGVfQ3Jhc2hBbmFseXNpcyxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlX0Zha2VQbGF0ZSxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlX0ZyZXF1ZW5jeUFuYWx5c2lzLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGVfRnJlcXVlbnRDcm9zZVxyXG4gICAgXTtcclxuXHJcbiAgICBzdGF0aWMgTW9kZWxMaXN0VHdvOiBBcnJheTx7IGNvZGU6IHN0cmluZywgbmFtZTogc3RyaW5nIH0+ID0gW1xyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfVHJhY2ssXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9BbmFseXNpcyxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlX0FjY29tcGFueUFuYWx5c2lzLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2VfRnJlcXVlbmN5QW5hbHlzaXMsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9GcmVxdWVuY3lBcHBlYXIsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTW9yZV9GYWNlTWFjQ3Jhc2gsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZV9BbGFybUFuYWx5c2lzXHJcbiAgICBdO1xyXG5cclxuICAgIHN0YXRpYyBNb2RlbExpc3RUaGlyZDogQXJyYXk8eyBjb2RlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyB9PiA9IFtcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19NYWNfVHJhY2ssXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTWFjX0FjY29tcGFueSxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19NYWNfRnJlcXVlbmN5LFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5JbnRlbGxpZ2VudEFuYWx5c2lzX01hY19BbGFybSxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuSW50ZWxsaWdlbnRBbmFseXNpc19NYWNfQ3Jhc2gsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTW9yZV9GYWNlTWFjQ3Jhc2gsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLkludGVsbGlnZW50QW5hbHlzaXNfTW9yZV9WZWhpY2xlTWFjQ3Jhc2hcclxuICAgIF07XHJcblxyXG4gICAgLy8g5YiX6KGo6KeG5Zu+5YiH5o2iXHJcbiAgICBwdWJsaWMgYW5hbHlzaXNTd2l0Y2goc3dpdGNoU3RyaW5nOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgdGhhdDogYW55ID0gdGhpcztcclxuICAgICAgICBzd2l0Y2ggKHN3aXRjaFN0cmluZykge1xyXG4gICAgICAgICAgICBjYXNlICdjYXJBbmFseXNpc0hpc3RvZ3JhbSc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQuY2FyQW5hbHlzaXNTdGF0aXN0aWNzTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdjYXJBbmFseXNpc0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNhckFuYWx5c2lzU3RhdGlzdGljc0xpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3BlcnNvbkFuYWx5c2lzSGlzdG9ncmFtJzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5wZXJzb25BbmFseXNpc1N0YXRpc3RpY3NMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJ3BlcnNvbkFuYWx5c2lzTGlzdCc6IHtcclxuICAgICAgICAgICAgICAgIHRoYXQucGVyc29uQW5hbHlzaXNTdGF0aXN0aWNzTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnbWFjQW5hbHlzaXNIaXN0b2dyYW0nOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1hY0FuYWx5c2lzU3RhdGlzdGljc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnbWFjQW5hbHlzaXNMaXN0Jzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tYWNBbmFseXNpc1N0YXRpc3RpY3NMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlICdDcmFzaEFuYWx5c2lzSGlzdG9ncmFtJzoge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5jcmFzaEFuYWx5c2lzU3RhdGlzdGljc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnQ3Jhc2hBbmFseXNpc0xpc3QnOiB7XHJcbiAgICAgICAgICAgICAgICB0aGF0LmNyYXNoQW5hbHlzaXNTdGF0aXN0aWNzTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydEltYWdlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm1haW50YWluRmFjdG9yeS5leHBvcnRJbWFnZShpZClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwb3J0RXhjZWwobW9kdWxlOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHRoaXMubWFpbnRhaW5GYWN0b3J5LmV4cG9ydEV4Y2VsKG1vZHVsZSwgZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYW5hbHlzaXNTdGF0aXN0aWNzQ29udHJvbGxlclwiLCBhbmFseXNpc1N0YXRpc3RpY3NDb250cm9sbGVyKTsiXX0=
