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
define(["require", "exports", "../../common/app/main.app", "echarts", "lodash", "../../../core/entity/maintainEnum", "../../common/factory/dataSelect.factory", "../../../core/entity/OperThirdModule", "../../../core/entity/OperSecondModule", "../../common/services/maintain.service", "../../common/factory/dataSelect.factory", "JsonExportExcel", "moment"], function (require, exports, main_app_1, echarts, _, maintainEnum_1, dataSelect_factory_1, OperThirdModule_1, OperSecondModule_1) {
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
    var IEchartFactory = (function () {
        function IEchartFactory() {
        }
        return IEchartFactory;
    }());
    exports.IEchartFactory = IEchartFactory;
    function ChartOptionObject(name) {
        var conf = {};
        conf.name = name;
        conf.title = maintainEnum_1.echartNameArr[name];
        conf.config = {};
        return conf;
    }
    exports.ChartOptionObject = ChartOptionObject;
    ;
    var maintainFactory = (function () {
        function maintainFactory(i18nFactory, maintainService, dataSelectServer) {
            this.i18nFactory = i18nFactory;
            this.maintainService = maintainService;
            this.dataSelectServer = dataSelectServer;
            this.charts = {};
            this.chartsImage = {};
            this.ModuleNameArr = angular.copy(maintainEnum_1.intelligentAnalysisData);
        }
        maintainFactory.prototype.initChart = function (option) {
            if (!!option && !!option.config && !_.isEmpty(echarts)) {
                var domString = "#" + option.name + " canvas";
                var canvas = $(domString)[0];
                var dom = document.getElementById(option.name);
                if (!!this.charts && this.charts[option.name] && canvas) {
                    this.charts[option.name].setOption(option.config);
                    this.charts[option.name].resize({
                        width: 'auto',
                        height: 'auto'
                    });
                }
                else if (dom) {
                    this.charts[option.name] = echarts.init(dom);
                    this.charts[option.name].setOption(option.config);
                }
            }
        };
        maintainFactory.prototype.exportImage = function (id) {
            var sampleImage = $("#" + id + " canvas")[0];
            var url = sampleImage.toDataURL("image/png");
            var triggerDownload = $("#download").attr("href", url).attr("download", maintainEnum_1.echartNameArr[id] + ".png");
            triggerDownload[0].click();
        };
        maintainFactory.prototype.getTimeParams = function (modelParam, value) {
            var params = maintainEnum_1.alarmTrafficReqParams;
            params.endDate = moment().format("YYYY-MM-DD hh:mm:ss");
            var result = this.dataSelectServer.getParamsTime(modelParam);
            if (modelParam.module == dataSelect_factory_1.moduleString.ALL) {
                result.module = dataSelect_factory_1.moduleString.Month;
            }
            if (modelParam.module == dataSelect_factory_1.moduleString.Custom && value) {
                console.log(value);
                var valueArr = value.split(" - ");
                params.beginDate = valueArr[0];
                params.endDate = valueArr[1];
            }
            else {
                params.beginDate = result.startTime;
                params.endDate = result.endTime;
            }
            if (params.beginDate && params.endDate && modelParam.module && params.beginDate !== params.endDate) {
                params.timeType = result.module == dataSelect_factory_1.moduleString.Custom ? dataSelect_factory_1.moduleString.Day : result.module;
                params.resourceType = modelParam.DeviceName || dataSelect_factory_1.moduleString.ALL;
                return params;
            }
        };
        maintainFactory.prototype.AlarmTrafficStatistics = function (dataFilterParam) {
            var _this = this;
            var that = this;
            this.dispatchedAboutAlarmFun();
            return this.maintainService.alarmStatisticsModule(dataFilterParam).then(function (res) {
                if (res && res.data) {
                    _this.AlarmTrafficTrendData = res;
                    _this.AlarmTrafficModule = dataFilterParam.resourceType;
                    return that.diffModuleData(res, dataFilterParam);
                }
            });
        };
        maintainFactory.prototype.destroyChart = function () {
            var _this = this;
            Object.keys(this.charts).forEach(function (item, index) {
                _this.charts[item] = null;
            });
        };
        maintainFactory.prototype.Areafilter = function (seraie) {
            var xData = [];
            seraie.forEach(function (item) {
                if (xData.indexOf(item.Name) == -1) {
                    if (item.Name) {
                        xData.push(item.Name);
                    }
                }
            });
            return xData;
        };
        maintainFactory.prototype.TypeEnum = function (type) {
            var AlarmObject = angular.copy(maintainEnum_1.AlarmObjectType);
            var legendData = Object.keys(AlarmObject);
            var chineseLegend = [];
            legendData.forEach(function (type) {
                chineseLegend.push(AlarmObject[type].text);
            });
            return type == "ch" ? chineseLegend : legendData;
        };
        maintainFactory.prototype.areaTrafficAlarm = function (res, Tabletype) {
            var _this = this;
            var seraie = res.data.seraie;
            this.xData = this.Areafilter(seraie);
            this.legendData = this.TypeEnum();
            var seraieData = [];
            this.legendData.forEach(function (type, index) {
                _this.xData.forEach(function (area, i) {
                    seraie.forEach(function (data) {
                        if (data.Name === area) {
                            if (!Array.isArray(seraieData[index])) {
                                seraieData[index] = [];
                            }
                            seraieData[index][i] = data.device[type] ? data.device[type][Tabletype] : 0;
                        }
                    });
                });
            });
            return {
                seriesData: seraieData,
                xData: this.xData,
                legendData: this.TypeEnum('ch')
            };
        };
        maintainFactory.prototype.deviceAlarmTraffic = function (data, module) {
            switch (module) {
                case "alarm": {
                    return this.deviceTypeData(data.Top10DeviceMap.alarmTop10Device, module);
                }
                case "flow": {
                    return this.deviceTypeData(data.Top10DeviceMap.trafficTop10Device, module);
                }
            }
        };
        maintainFactory.prototype.deviceTypeData = function (data, module) {
            var result = angular.copy(data);
            var AlarmObject = angular.copy(maintainEnum_1.AlarmObjectType);
            var switchResult = {};
            if (AlarmObject && result) {
                Object.keys(AlarmObject).forEach(function (type) {
                    Object.keys(result).forEach(function (item) {
                        if (type == item) {
                            if (!switchResult[item]) {
                                switchResult[item] = {};
                                switchResult[item].seriesData = [];
                                switchResult[item].yData = [];
                            }
                            result[item].forEach(function (resu) {
                                if (resu[module] && resu.deviceID) {
                                    switchResult[item].seriesData.push(resu[module]);
                                    switchResult[item].yData.push(resu.deviceID);
                                }
                            });
                        }
                    });
                });
            }
            return switchResult;
        };
        maintainFactory.prototype.dispatchedAboutAlarmFun = function () {
            var _this = this;
            var params = {
                beginDate: "",
                endDate: "2017-11-28 23:59:59",
                groupType: "ByLib",
                timeType: "Day"
            };
            this.maintainService.dispatchedAboutAlarm(params).then(function (res) {
                _this.dispatchedAboutAlarmData = res.data;
            });
        };
        maintainFactory.prototype.diffModuleData = function (res, dataFilterParam) {
            var superData;
            var resultData = this.areaTrafficAlarm(res, dataFilterParam.module);
            if (dataFilterParam.module == "alarm") {
                superData = new maintainEnum_1.AlarmSuperData();
                superData.dropListArea = this.DropListData(resultData.xData);
                superData.dropListType = this.DropListData(resultData.legendData);
                superData.areaAlarm = resultData;
                superData.deviceAlarmStatistics = this.deviceAlarmTraffic(res.data, dataFilterParam.module);
                superData.areaAlarmTrend = this.AlarmTraffeicTrend(res.data.trendStatistics, dataFilterParam);
                superData.dispatchedAboutAlarm = this.dispatchedAboutAlarmData;
            }
            else if (dataFilterParam.module == 'flow') {
                superData = new maintainEnum_1.FlowSuperData();
                superData.dropListArea = this.DropListData(resultData.xData);
                superData.dropListType = this.DropListData(resultData.legendData);
                superData.areaTrafficStatistics = resultData;
                superData.deviceTrafficStatistics = this.deviceAlarmTraffic(res.data, dataFilterParam.module);
                superData.areaTrafficTrend = this.AlarmTraffeicTrend(res.data.trendStatistics, dataFilterParam);
            }
            return Promise.resolve(superData);
        };
        maintainFactory.prototype.AlarmTraffeicTrend = function (alarmTrafficTrend, dataFilterParam) {
            var xData = this.timeFiler(dataFilterParam.timeType);
            if (dataFilterParam.timeType == "Day") {
                var infoArr_1 = [];
                xData.forEach(function (x) {
                    var lastDay = moment().subtract(1, 'days').format('YYYY-MM-DD ') + x;
                    var info = {
                        AlarmNm: 0,
                        FlowNm: 0,
                        timeItem: lastDay
                    };
                    var _a = moment(new Date(lastDay)).format('YYYY-MM-DD hh');
                    alarmTrafficTrend.trendStatistics.forEach(function (item) {
                        var _b = moment(new Date(item.timeItem)).format('YYYY-MM-DD hh');
                        if (_a == _b && item.areaName == dataFilterParam.AreaName) {
                            info.AlarmNm += item.alarm;
                            info.FlowNm += item.flow;
                        }
                    });
                    infoArr_1.push(info);
                });
                console.log(infoArr_1);
                return this.changeChartDataForThird(dataFilterParam, xData, infoArr_1);
            }
        };
        maintainFactory.prototype.changeChartDataForThird = function (dataFilterParam, xData, infoArr) {
            var chartData = {
                seriesData: [],
                xData: xData,
                legendData: [dataFilterParam.module]
            };
            var timeInfo = [];
            xData.forEach(function (xItem) {
                var _a = moment().subtract(1, 'days').format('YYYY-MM-DD ') + xItem;
                infoArr.forEach(function (item) {
                    var _b = moment(item.timeItem).format('YYYY-MM-DD HH:mm');
                    if (_a == _b) {
                        if (dataFilterParam.module == "alarm") {
                            timeInfo.push(item.AlarmNm);
                        }
                        else if (dataFilterParam.module == "flow") {
                            timeInfo.push(item.FlowNm);
                        }
                    }
                });
            });
            chartData.seriesData.push(timeInfo);
            return chartData;
        };
        ;
        maintainFactory.timeMatchArr = function (timeString) {
            if (timeString == "month") {
                var Arr = [];
                for (var i = 0; i < moment().format('DD'); i++) {
                    if (i) {
                        Arr.push(moment().format('YYYY-MM-') + i);
                    }
                }
                return Arr;
            }
            else if (timeString == "Day") {
                var Arr = [];
                return Arr;
            }
        };
        maintainFactory.prototype.DropListData = function (xData) {
            var result = [];
            var AlarmObject = angular.copy(maintainEnum_1.AlarmObjectType);
            var Alarmkey = Object.keys(AlarmObject);
            xData.forEach(function (item) {
                var resultChild = {};
                resultChild.text = item;
                Alarmkey.forEach(function (info) {
                    if (item == AlarmObject[info].text) {
                        resultChild.value = info;
                    }
                });
                result.push(resultChild);
            });
            return result;
        };
        maintainFactory.prototype.timeFiler = function (type) {
            switch (type) {
                case "Day": {
                    var x = [];
                    for (var i = 0; i < 24; i++) {
                        var hh = i < 10 ? '0' + i : i;
                        x.push(hh + ":00");
                    }
                    return x;
                }
                case "Week": {
                    return this.getTimeX(7);
                }
                case "Month": {
                    return this.getTimeX(30);
                }
            }
        };
        maintainFactory.prototype.getTimeX = function (time) {
            var x = [];
            for (var i = 0; i < time; i++) {
                x.unshift(moment().subtract(i + 1, 'days').format('YYYY-MM-DD'));
            }
            return x;
        };
        maintainFactory.prototype.exportExcel = function (module, data) {
            var option = {};
            console.log(module);
            console.log(data);
            switch (module) {
                case this.ModuleNameArr.areaAlarmTrend:
                case this.ModuleNameArr.deviceAlarmStatistics:
                case this.ModuleNameArr.deviceTrafficStatistics:
                case this.ModuleNameArr.dispatchedAboutTaskStatistics: {
                    option = this.changeTheDataFormatOne(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
                case this.ModuleNameArr.dispatchedAboutAlarm: {
                    option = this.changeTheDataFormatTwo(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
                case this.ModuleNameArr.Maintain_StatisOverview_Retrival: {
                    option = this.changeTheDataFormatThird(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
                case this.ModuleNameArr.IntelligentAnalysis_Vehicle:
                case this.ModuleNameArr.IntelligentAnalysis_Face:
                case this.ModuleNameArr.IntelligentAnalysis_Mac:
                case this.ModuleNameArr.IntelligentAnalysis_Crash: {
                    option = this.changeTheDataFormatFour(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
                case this.ModuleNameArr.Maintain_StatisOverview_Retrival_Rank: {
                    option = this.changeTheDataFormatFive(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
                default: {
                    option = this.changeTheDataFormat(maintainEnum_1.echartNameArr[module], data);
                    break;
                }
            }
            if (option && !_.isEmpty(option)) {
                var toExcel = new ExportJsonExcel(option);
                toExcel.saveExcel();
            }
        };
        maintainFactory.prototype.changeTheDataFormat = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: newData.legendData,
                sheetData: newData.seriesData
            };
            var newseries = [];
            newData.xData.forEach(function (area, index) {
                newseries[index] = [];
                data.seriesData.forEach(function (data, idx) {
                    newseries[index][idx] = data[index];
                });
            });
            tableData.sheetData = newseries;
            newseries.forEach(function (item, index) {
                tableData.sheetData[index].unshift(newData.xData[index]);
            });
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.changeTheDataFormatOne = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: data.legendData,
                sheetData: []
            };
            newData.seriesData.forEach(function (item, index) {
                var content = [newData.seriesData[index]];
                content.unshift(newData.yData[index]);
                tableData.sheetData.push(content);
            });
            console.log(tableData);
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.changeTheDataFormatTwo = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: newData.legendData,
                sheetData: newData.seriesData
            };
            var newseries = [];
            newData.yData.forEach(function (area, index) {
                newseries[index] = [];
                data.seriesData.forEach(function (data, idx) {
                    newseries[index][idx] = data[index];
                });
            });
            tableData.sheetData = newseries;
            newseries.forEach(function (item, index) {
                tableData.sheetData[index].unshift(newData.yData[index]);
            });
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.changeTheDataFormatThird = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: newData.xData,
                sheetData: [newData.seriesData]
            };
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.changeTheDataFormatFour = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: newData.legendData,
                sheetData: []
            };
            newData.seriesData.forEach(function (item, index) {
                var content = [newData.xData[index]];
                content.push(item);
                tableData.sheetData.push(content);
            });
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.changeTheDataFormatFive = function (title, data) {
            var newData = angular.copy(data);
            var option = {};
            option.fileName = title;
            option.datas = [];
            var tableData = {
                sheetHeader: ['排行', '设备名称', '类别', "搜索次数", "搜索时间"],
                sheetData: []
            };
            newData.legendData.forEach(function (title, index) {
                if (newData.seriesData[index]) {
                    newData.seriesData[index].forEach(function (item, idx) {
                        var content = [];
                        content[0] = idx + 1;
                        content[1] = item.statisticsItem;
                        content[2] = data.legendData[index];
                        content[3] = item.num;
                        content[4] = item.timeItem;
                        tableData.sheetData.push(content);
                    });
                }
            });
            option.datas.push(tableData);
            return option;
        };
        maintainFactory.prototype.exportTableXls = function (url, params) {
            console.log(params);
            var form = $("<form>");
            form.attr('name', 'dowmloadStatus');
            form.attr('target', '_blank');
            form.attr('method', "post");
            form.attr('action', url);
            $('body').append(form);
            Object.keys(params).forEach(function (item) {
                var input = $('<input>');
                input.attr('type', 'hidden');
                input.attr('name', item);
                input.attr('value', params[item]);
                $("form[name='dowmloadStatus']").append(input);
            });
            $("form[name='dowmloadStatus']").submit();
            $("form[name='dowmloadStatus']").remove();
        };
        maintainFactory.prototype.getModuleName = function (dateType, value) {
            if (!dateType.module || dateType.module == dataSelect_factory_1.moduleString.ALL) {
                dateType.module = dataSelect_factory_1.moduleString.Month;
            }
            else if (dateType.module == dataSelect_factory_1.moduleString.Custom && value) {
                var valueArr = value.split(" - ");
                dateType.startTime = valueArr[0];
                dateType.endTime = valueArr[1];
                dateType.module = dataSelect_factory_1.moduleString.Day;
            }
            return dateType;
        };
        maintainFactory.prototype.RetrievalParams = function (dataTime) {
            var dateType = {};
            dateType.module = dataTime ? dataTime : dataSelect_factory_1.moduleString.Month;
            var dateModule = this.dataSelectServer.getParamsTime(dateType);
            var params = {};
            params.beginDate = dateModule.startTime;
            params.endDate = dateModule.endTime;
            params.moduleNames = maintainFactory.RetrievalmoduleNames.map(function (item) { return item.code; }).join(',');
            params.statisticModuleLevel = 3;
            return params;
        };
        maintainFactory.prototype.RetrievalRankParam = function (dateType, resourceType, value) {
            var dataTypeParams = this.getModuleName(dateType, value);
            var dateModule = this.dataSelectServer.getParamsTime(dataTypeParams);
            var params = {};
            params.resourceType = resourceType ? resourceType : maintainEnum_1.AlarmObjectType.ALL.value;
            params.timeType = dateModule.module;
            params.beginDate = dateModule.startTime;
            params.endDate = dateModule.endTime;
            return params;
        };
        maintainFactory.prototype.alarmParams = function (dataTime, resourceType) {
            var dateType = {};
            dateType.module = dataTime ? dataTime : dataSelect_factory_1.moduleString.Month;
            var dateModule = this.dataSelectServer.getParamsTime(dateType);
            var params = {};
            params.resourceType = resourceType ? resourceType : maintainEnum_1.AlarmObjectType.ALL.value;
            params.timeType = dateType.module;
            params.beginDate = dateModule.startTime;
            params.endDate = dateModule.endTime;
            return params;
        };
        maintainFactory.prototype.RankParams = function (dataTime, resourceType) {
            var dateType = {};
            dateType.module = dataTime ? dataTime : dataSelect_factory_1.moduleString.Month;
            var dateModule = this.dataSelectServer.getParamsTime(dateType);
            var params = {};
            params.resourceType = resourceType ? resourceType : maintainEnum_1.AlarmObjectType.ALL.value;
            params.timeType = dateType.module;
            params.beginDate = dateModule.startTime;
            params.endDate = dateModule.endTime;
            params.topNum = '10';
            return params;
        };
        maintainFactory.$inject = ['i18nFactory', "maintainService", "dataSelectServer"];
        maintainFactory.RetrievalmoduleNames = [
            OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch,
            OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle,
            OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face,
            OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi,
            OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence
        ];
        return maintainFactory;
    }());
    main_app_1.app.service('maintainFactory', maintainFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vbWFpbi9tYWludGFpbkZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQXFDQTtRQUErQiw2QkFBZ0I7UUFJM0MsbUJBQVksVUFBa0I7WUFBOUIsWUFDSSxpQkFBTyxTQUVWO1lBTkQsY0FBUSxHQUFXLEtBQUssQ0FBQztZQUN6QixnQkFBVSxHQUFXLEtBQUssQ0FBQztZQUl2QixLQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQTs7UUFDNUIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FSQSxBQVFDLENBUjhCLHFDQUFnQixHQVE5QztJQVJZLDhCQUFTO0lBVXRCO1FBQUE7UUFXQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLHdDQUFjO0lBYTNCLDJCQUFrQyxJQUFZO1FBQzFDLElBQUksSUFBSSxHQUFHLEVBQW9CLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyw0QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBa0IsQ0FBQTtRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFBO0lBQ2YsQ0FBQztJQU5ELDhDQU1DO0lBQUEsQ0FBQztJQUlGO1FBV0kseUJBQ1ksV0FBZ0IsRUFDaEIsZUFBaUMsRUFDakMsZ0JBQWtDO1lBRmxDLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBQ2hCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1lBWDlDLFdBQU0sR0FBMkIsRUFBRSxDQUFDO1lBQ3BDLGdCQUFXLEdBQThCLEVBQUUsQ0FBQztZQU01QyxrQkFBYSxHQUFnQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUF1QixDQUFDLENBQUM7UUFNbkYsQ0FBQztRQUdNLG1DQUFTLEdBQWhCLFVBQWlCLE1BQW1D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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAqIGFzIENoYXJ0T3B0aW9ucyBmcm9tIFwiLi4vLi4vY29tbW9uL2VudW0vRWNoYXJ0Q29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIGVjaGFydHMgZnJvbSBcImVjaGFydHNcIlxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvbWFpbnRhaW4uc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2RhdGFTZWxlY3QuZmFjdG9yeVwiXHJcbmltcG9ydCB7IElNYWludGFpblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21haW50YWluLnNlcnZpY2VcIlxyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0IFwiSnNvbkV4cG9ydEV4Y2VsXCJcclxuaW1wb3J0IHtcclxuICAgIEFsYXJtT2JqZWN0VHlwZSxcclxuICAgIGRyb3BFbnVtLFxyXG4gICAgZGV2aWNlU3RhdGlzdGljc0VudW0sXHJcbiAgICBhbGFybVRyYWZmaWNUcmVuZCxcclxuICAgIGFsYXJtVHJhZmZpY1RyZW5kRGF0YSxcclxuICAgIGFsYXJtVHJhZmZpY1RpbWVGb3JtYXQsXHJcbiAgICBhbGFybVRyYWZmaWNSZXFFbnVtLFxyXG4gICAgYWxhcm1UcmFmZmljUmVxUGFyYW1zLFxyXG4gICAgQWxhcm1TdXBlckRhdGEsXHJcbiAgICBGbG93U3VwZXJEYXRhLFxyXG4gICAgQWxhcm1TdGF0dXNUeXBlLFxyXG4gICAgZGlzcGF0Y2hlZFJlc3VsdCxcclxuICAgIGVjaGFydE5hbWVBcnIsXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YUVudW0sXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YSxcclxuICAgIGV4cG9ydEV4Y2VsUGFyYW1FbnVtLFxyXG4gICAgRXhjZWxUYWJsZUVudW0sXHJcbiAgICBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9tYWludGFpbkVudW1cIjtcclxuaW1wb3J0ICdtb21lbnQnXHJcbmltcG9ydCB7IHNldEVubGFyZ2VEYXRhLCBFQ2hhcnRPcHRpb24sIGRhdGFUZXh0IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL0VjaGFydENvbmZpZ1wiO1xyXG5pbXBvcnQgeyBkYXRhU2VsZWN0UmVzdWx0LCBtb2R1bGVTdHJpbmcsIGRhdGFTZWxlY3RTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvZGF0YVNlbGVjdC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7IE9wZXJUaGlyZE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGVcIjtcclxuaW1wb3J0IHsgT3BlclNlY29uZE1vZHVsZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlXCI7XHJcbmltcG9ydCBSZXNvdXJjZVBhcmFtcyBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvUmVzb3VyY2VQYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgbGV0IG1vbWVudDogYW55LCBhbmd1bGFyOiBhbnksIFByb21pc2U6IGFueSwgJDogYW55LCBFeHBvcnRKc29uRXhjZWw6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBhbGxQYXJhbXMgZXh0ZW5kcyBkYXRhU2VsZWN0UmVzdWx0IHtcclxuICAgIEFyZWFOYW1lOiBzdHJpbmcgPSBcIkFMTFwiOyAvLyDlnLDljLrlkI3np7BcclxuICAgIERldmljZU5hbWU6IHN0cmluZyA9IFwiQUxMXCI7Ly8g6K6+5aSH5ZCN56ewXHJcbiAgICBtb2R1bGU6IHN0cmluZzsgLy8g5Zu+6KGo5ZCN56ewXHJcbiAgICBjb25zdHJ1Y3Rvcihtb2R1bGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubW9kdWxlID0gbW9kdWxlTmFtZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSUVjaGFydEZhY3Rvcnkge1xyXG4gICAgaW5pdENoYXJ0OiAoY29uZmlnOiBDaGFydE9wdGlvbnMuc2V0RW5sYXJnZURhdGEpID0+IHZvaWQ7XHJcbiAgICBkZXN0cm95Q2hhcnQ6ICgpID0+IHZvaWQ7XHJcbiAgICBBbGFybVRyYWZmaWNTdGF0aXN0aWNzOiAoZGF0YUZpbHRlclBhcmFtPzogYWxhcm1UcmFmZmljUmVxRW51bSkgPT4gYW55O1xyXG4gICAgZXhwb3J0SW1hZ2U6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgZXhwb3J0RXhjZWw6IChtb2R1bGU6IGFueSwgZGF0YTogYW55KSA9PiB2b2lkO1xyXG4gICAgZXhwb3J0VGFibGVYbHM6ICh1cmw6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHZvaWQ7XHJcbiAgICBnZXRUaW1lUGFyYW1zOiAobW9kZWxQYXJhbTogYWxsUGFyYW1zLCB2YWx1ZT86IHN0cmluZykgPT4gYWxhcm1UcmFmZmljUmVxRW51bTtcclxuICAgIFJldHJpZXZhbFBhcmFtczogKGRhdGFUaW1lPzogc3RyaW5nKSA9PiBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcztcclxuICAgIGFsYXJtUGFyYW1zOiAoZGF0YVRpbWU/OiBzdHJpbmcsIHJlc291cmNlVHlwZT86IHN0cmluZykgPT4gUmVzb3VyY2VQYXJhbXM7XHJcbiAgICBSZXRyaWV2YWxSYW5rUGFyYW06IChkYXRlVHlwZTogZGF0YVNlbGVjdFJlc3VsdCwgcmVzb3VyY2VUeXBlPzogc3RyaW5nLCB2YWx1ZT86IHN0cmluZykgPT4gYW55O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2hhcnRPcHRpb25PYmplY3QobmFtZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgY29uZiA9IHt9IGFzIHNldEVubGFyZ2VEYXRhO1xyXG4gICAgY29uZi5uYW1lID0gbmFtZTtcclxuICAgIGNvbmYudGl0bGUgPSBlY2hhcnROYW1lQXJyW25hbWVdO1xyXG4gICAgY29uZi5jb25maWcgPSB7fSBhcyBFQ2hhcnRPcHRpb25cclxuICAgIHJldHVybiBjb25mXHJcbn07XHJcblxyXG5cclxuXHJcbmNsYXNzIG1haW50YWluRmFjdG9yeSBpbXBsZW1lbnRzIElFY2hhcnRGYWN0b3J5IHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWydpMThuRmFjdG9yeScsIFwibWFpbnRhaW5TZXJ2aWNlXCIsIFwiZGF0YVNlbGVjdFNlcnZlclwiXTtcclxuXHJcbiAgICBjaGFydHM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuICAgIGNoYXJ0c0ltYWdlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XHJcbiAgICB4RGF0YTogQXJyYXk8c3RyaW5nPjtcclxuICAgIGxlZ2VuZERhdGE6IEFycmF5PHN0cmluZz47XHJcbiAgICBBbGFybVRyYWZmaWNUcmVuZERhdGE6IGFueTtcclxuICAgIEFsYXJtVHJhZmZpY01vZHVsZTogc3RyaW5nO1xyXG4gICAgZGlzcGF0Y2hlZEFib3V0QWxhcm1EYXRhOiBhbnk7XHJcbiAgICBNb2R1bGVOYW1lQXJyOiBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YUVudW0gPSBhbmd1bGFyLmNvcHkoaW50ZWxsaWdlbnRBbmFseXNpc0RhdGEpO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbWFpbnRhaW5TZXJ2aWNlOiBJTWFpbnRhaW5TZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgZGF0YVNlbGVjdFNlcnZlcjogZGF0YVNlbGVjdFNlcnZlclxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCa6L+HdHlwZXNjcmlwdOaemuS4vuW9ouaIkOmFjee9ruaWh+S7tlxyXG4gICAgcHVibGljIGluaXRDaGFydChvcHRpb246IENoYXJ0T3B0aW9ucy5zZXRFbmxhcmdlRGF0YSkge1xyXG4gICAgICAgIGlmICghIW9wdGlvbiAmJiAhIW9wdGlvbi5jb25maWcgJiYgIV8uaXNFbXB0eShlY2hhcnRzKSkge1xyXG4gICAgICAgICAgICBsZXQgZG9tU3RyaW5nOiBzdHJpbmcgPSBgIyR7b3B0aW9uLm5hbWV9IGNhbnZhc2A7XHJcbiAgICAgICAgICAgIGxldCBjYW52YXM6IGFueSA9ICQoZG9tU3RyaW5nKVswXTtcclxuICAgICAgICAgICAgbGV0IGRvbTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0aW9uLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoISF0aGlzLmNoYXJ0cyAmJiB0aGlzLmNoYXJ0c1tvcHRpb24ubmFtZV0gJiYgY2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0c1tvcHRpb24ubmFtZV0uc2V0T3B0aW9uKG9wdGlvbi5jb25maWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFydHNbb3B0aW9uLm5hbWVdLnJlc2l6ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9tKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJ0c1tvcHRpb24ubmFtZV0gPSBlY2hhcnRzLmluaXQoZG9tKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hhcnRzW29wdGlvbi5uYW1lXS5zZXRPcHRpb24ob3B0aW9uLmNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGV4cG9ydEltYWdlKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2FtcGxlSW1hZ2U6IGFueSA9ICQoYCMke2lkfSBjYW52YXNgKVswXTtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBzYW1wbGVJbWFnZS50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbiAgICAgICAgbGV0IHRyaWdnZXJEb3dubG9hZCA9ICQoXCIjZG93bmxvYWRcIikuYXR0cihcImhyZWZcIiwgdXJsKS5hdHRyKFwiZG93bmxvYWRcIiwgZWNoYXJ0TmFtZUFycltpZF0gKyBcIi5wbmdcIik7XHJcbiAgICAgICAgdHJpZ2dlckRvd25sb2FkWzBdLmNsaWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5b6X5Yiw5pe26Ze05Y+C5pWw5Yid5aeL5YyW5Zu+6KGoXHJcbiAgICBwdWJsaWMgZ2V0VGltZVBhcmFtcyhtb2RlbFBhcmFtOiBhbGxQYXJhbXMsIHZhbHVlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYWxhcm1UcmFmZmljUmVxRW51bSA9IGFsYXJtVHJhZmZpY1JlcVBhcmFtcztcclxuICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IG1vbWVudCgpLmZvcm1hdChcIllZWVktTU0tREQgaGg6bW06c3NcIik7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQ6IGRhdGFTZWxlY3RSZXN1bHQgPSB0aGlzLmRhdGFTZWxlY3RTZXJ2ZXIuZ2V0UGFyYW1zVGltZShtb2RlbFBhcmFtKTtcclxuICAgICAgICBpZiAobW9kZWxQYXJhbS5tb2R1bGUgPT0gbW9kdWxlU3RyaW5nLkFMTCkgeyByZXN1bHQubW9kdWxlID0gbW9kdWxlU3RyaW5nLk1vbnRoIH1cclxuXHJcbiAgICAgICAgaWYgKG1vZGVsUGFyYW0ubW9kdWxlID09IG1vZHVsZVN0cmluZy5DdXN0b20gJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVBcnI6IEFycmF5PHN0cmluZz4gPSB2YWx1ZS5zcGxpdChcIiAtIFwiKTtcclxuICAgICAgICAgICAgcGFyYW1zLmJlZ2luRGF0ZSA9IHZhbHVlQXJyWzBdO1xyXG4gICAgICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IHZhbHVlQXJyWzFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBhcmFtcy5iZWdpbkRhdGUgPSByZXN1bHQuc3RhcnRUaW1lO1xyXG4gICAgICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IHJlc3VsdC5lbmRUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy5iZWdpbkRhdGUgJiYgcGFyYW1zLmVuZERhdGUgJiYgbW9kZWxQYXJhbS5tb2R1bGUgJiYgcGFyYW1zLmJlZ2luRGF0ZSAhPT0gcGFyYW1zLmVuZERhdGUpIHtcclxuICAgICAgICAgICAgcGFyYW1zLnRpbWVUeXBlID0gcmVzdWx0Lm1vZHVsZSA9PSBtb2R1bGVTdHJpbmcuQ3VzdG9tID8gbW9kdWxlU3RyaW5nLkRheSA6IHJlc3VsdC5tb2R1bGU7XHJcbiAgICAgICAgICAgIHBhcmFtcy5yZXNvdXJjZVR5cGUgPSBtb2RlbFBhcmFtLkRldmljZU5hbWUgfHwgbW9kdWxlU3RyaW5nLkFMTDtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLypcclxuICAgICAqIOaKpeitpua1gemHj+ivt+axguWQjuWPsFxyXG4gICAgICogQHBhcmFtIHtkYXRhRmlsdGVyUGFyYW19IOaMieexu+Wei+i/h+a7pOadoeS7tuWPguaVsFxyXG4gICAgICogQHBhcmFtIHthbGFybVRyYWZmaWNSZXFFbnVtfSDor7fmsYLlkI7lj7Dlj4LmlbBcclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuXHJcbiAgICBwdWJsaWMgQWxhcm1UcmFmZmljU3RhdGlzdGljcyhkYXRhRmlsdGVyUGFyYW0/OiBhbGFybVRyYWZmaWNSZXFFbnVtKSB7XHJcbiAgICAgICAgbGV0IHRoYXQ6IGFueSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVkQWJvdXRBbGFybUZ1bigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1haW50YWluU2VydmljZS5hbGFybVN0YXRpc3RpY3NNb2R1bGUoZGF0YUZpbHRlclBhcmFtKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFsYXJtVHJhZmZpY1RyZW5kRGF0YSA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMuQWxhcm1UcmFmZmljTW9kdWxlID0gZGF0YUZpbHRlclBhcmFtLnJlc291cmNlVHlwZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGF0LmRpZmZNb2R1bGVEYXRhKHJlcywgZGF0YUZpbHRlclBhcmFtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDplIDmr4FlY2hhdOWbvuihqFxyXG4gICAgcHVibGljIGRlc3Ryb3lDaGFydCgpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXJ0cykuZm9yRWFjaCgoaXRlbTogc3RyaW5nLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJ0c1tpdGVtXSA9IG51bGw7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDov4fmu6TlkI7lj7Dov5Tlm57mlbDmja7lhoXnmoTmiYDmnInljLrln59cclxuICAgIHB1YmxpYyBBcmVhZmlsdGVyKHNlcmFpZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGxldCB4RGF0YSA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgc2VyYWllLmZvckVhY2goKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoeERhdGEuaW5kZXhPZihpdGVtLk5hbWUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeERhdGEucHVzaChpdGVtLk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHhEYXRhXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6I635Y+W57G75Z6LXHJcbiAgICBwdWJsaWMgVHlwZUVudW0odHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBBbGFybU9iamVjdDogYW55ID0gYW5ndWxhci5jb3B5KEFsYXJtT2JqZWN0VHlwZSk7XHJcbiAgICAgICAgbGV0IGxlZ2VuZERhdGEgPSBPYmplY3Qua2V5cyhBbGFybU9iamVjdCkgYXMgQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICAgICAgLy8g5ou/5Yiw5Lit5paHbGVnZW5kXHJcbiAgICAgICAgbGV0IGNoaW5lc2VMZWdlbmQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBsZWdlbmREYXRhLmZvckVhY2goKHR5cGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBjaGluZXNlTGVnZW5kLnB1c2goQWxhcm1PYmplY3RbdHlwZV0udGV4dClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGUgPT0gXCJjaFwiID8gY2hpbmVzZUxlZ2VuZCA6IGxlZ2VuZERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yy65Z+f5oql6K2m5rWB6YeP57uf6K6h5Zu+6KGo5pa55rOVXHJcbiAgICBwcml2YXRlIGFyZWFUcmFmZmljQWxhcm0ocmVzOiBhbnksIFRhYmxldHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlcmFpZTogYW55ID0gcmVzLmRhdGEuc2VyYWllO1xyXG5cclxuICAgICAgICB0aGlzLnhEYXRhID0gdGhpcy5BcmVhZmlsdGVyKHNlcmFpZSk7XHJcbiAgICAgICAgdGhpcy5sZWdlbmREYXRhID0gdGhpcy5UeXBlRW51bSgpO1xyXG5cclxuICAgICAgICBsZXQgc2VyYWllRGF0YTogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuICAgICAgICAvLyDmi7/liLDorr7lpIfmiYDlnKjnmoTljLrln5/miqXorabmlbBcclxuICAgICAgICB0aGlzLmxlZ2VuZERhdGEuZm9yRWFjaCgodHlwZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy54RGF0YS5mb3JFYWNoKChhcmVhLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZXJhaWUuZm9yRWFjaCgoZGF0YTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuTmFtZSA9PT0gYXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2VyYWllRGF0YVtpbmRleF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJhaWVEYXRhW2luZGV4XSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcmFpZURhdGFbaW5kZXhdW2ldID0gZGF0YS5kZXZpY2VbdHlwZV0gPyBkYXRhLmRldmljZVt0eXBlXVtUYWJsZXR5cGVdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZXJpZXNEYXRhOiBzZXJhaWVEYXRhLFxyXG4gICAgICAgICAgICB4RGF0YTogdGhpcy54RGF0YSxcclxuICAgICAgICAgICAgbGVnZW5kRGF0YTogdGhpcy5UeXBlRW51bSgnY2gnKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6K6+5aSH57uf6K6hKFRPUDEwKeWbvuihqOaWueazlVxyXG4gICAgcHJpdmF0ZSBkZXZpY2VBbGFybVRyYWZmaWMoZGF0YTogYW55LCBtb2R1bGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAobW9kdWxlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJhbGFybVwiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2VUeXBlRGF0YShkYXRhLlRvcDEwRGV2aWNlTWFwLmFsYXJtVG9wMTBEZXZpY2UsIG1vZHVsZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiZmxvd1wiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXZpY2VUeXBlRGF0YShkYXRhLlRvcDEwRGV2aWNlTWFwLnRyYWZmaWNUb3AxMERldmljZSwgbW9kdWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDmjInmqKHlnZfmjInorr7lpIfnsbvlnovovazmjaLkuLpFY2hhcnTmlbDmja5cclxuICAgIHByaXZhdGUgZGV2aWNlVHlwZURhdGEoZGF0YTogYW55LCBtb2R1bGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICBsZXQgQWxhcm1PYmplY3Q6IGFueSA9IGFuZ3VsYXIuY29weShBbGFybU9iamVjdFR5cGUpO1xyXG4gICAgICAgIGxldCBzd2l0Y2hSZXN1bHQ6IGFueSA9IHt9O1xyXG4gICAgICAgIGlmIChBbGFybU9iamVjdCAmJiByZXN1bHQpIHtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMoQWxhcm1PYmplY3QpLmZvckVhY2goKHR5cGUpID0+IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHJlc3VsdCkuZm9yRWFjaCgoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN3aXRjaFJlc3VsdFtpdGVtXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoUmVzdWx0W2l0ZW1dID0ge30gYXMgZGV2aWNlU3RhdGlzdGljc0VudW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hSZXN1bHRbaXRlbV0uc2VyaWVzRGF0YSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoUmVzdWx0W2l0ZW1dLnlEYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2l0ZW1dLmZvckVhY2goKHJlc3U6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VbbW9kdWxlXSAmJiByZXN1LmRldmljZUlEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoUmVzdWx0W2l0ZW1dLnNlcmllc0RhdGEucHVzaChyZXN1W21vZHVsZV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaFJlc3VsdFtpdGVtXS55RGF0YS5wdXNoKHJlc3UuZGV2aWNlSUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzd2l0Y2hSZXN1bHRcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpc3BhdGNoZWRBYm91dEFsYXJtRnVuKCkge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IGFsYXJtVHJhZmZpY1JlcUVudW0gPSB7XHJcbiAgICAgICAgICAgIGJlZ2luRGF0ZTogXCJcIixcclxuICAgICAgICAgICAgZW5kRGF0ZTogXCIyMDE3LTExLTI4IDIzOjU5OjU5XCIsXHJcbiAgICAgICAgICAgIGdyb3VwVHlwZTogXCJCeUxpYlwiLFxyXG4gICAgICAgICAgICB0aW1lVHlwZTogXCJEYXlcIlxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubWFpbnRhaW5TZXJ2aWNlLmRpc3BhdGNoZWRBYm91dEFsYXJtKHBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaGVkQWJvdXRBbGFybURhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOafpeivouS4jeWQjOaooeWdl+eahOaVsOaNrlxyXG4gICAgcHJpdmF0ZSBkaWZmTW9kdWxlRGF0YShyZXM6IGFueSwgZGF0YUZpbHRlclBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtKSB7XHJcbiAgICAgICAgbGV0IHN1cGVyRGF0YTogYW55O1xyXG4gICAgICAgIGxldCByZXN1bHREYXRhOiBhbnkgPSB0aGlzLmFyZWFUcmFmZmljQWxhcm0ocmVzLCBkYXRhRmlsdGVyUGFyYW0ubW9kdWxlKTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFGaWx0ZXJQYXJhbS5tb2R1bGUgPT0gXCJhbGFybVwiKSB7XHJcbiAgICAgICAgICAgIHN1cGVyRGF0YSA9IG5ldyBBbGFybVN1cGVyRGF0YSgpO1xyXG4gICAgICAgICAgICBzdXBlckRhdGEuZHJvcExpc3RBcmVhID0gdGhpcy5Ecm9wTGlzdERhdGEocmVzdWx0RGF0YS54RGF0YSk7XHJcbiAgICAgICAgICAgIHN1cGVyRGF0YS5kcm9wTGlzdFR5cGUgPSB0aGlzLkRyb3BMaXN0RGF0YShyZXN1bHREYXRhLmxlZ2VuZERhdGEpO1xyXG4gICAgICAgICAgICBzdXBlckRhdGEuYXJlYUFsYXJtID0gcmVzdWx0RGF0YTtcclxuICAgICAgICAgICAgc3VwZXJEYXRhLmRldmljZUFsYXJtU3RhdGlzdGljcyA9IHRoaXMuZGV2aWNlQWxhcm1UcmFmZmljKHJlcy5kYXRhLCBkYXRhRmlsdGVyUGFyYW0ubW9kdWxlKTtcclxuICAgICAgICAgICAgc3VwZXJEYXRhLmFyZWFBbGFybVRyZW5kID0gdGhpcy5BbGFybVRyYWZmZWljVHJlbmQocmVzLmRhdGEudHJlbmRTdGF0aXN0aWNzLCBkYXRhRmlsdGVyUGFyYW0pO1xyXG4gICAgICAgICAgICBzdXBlckRhdGEuZGlzcGF0Y2hlZEFib3V0QWxhcm0gPSB0aGlzLmRpc3BhdGNoZWRBYm91dEFsYXJtRGF0YVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YUZpbHRlclBhcmFtLm1vZHVsZSA9PSAnZmxvdycpIHtcclxuICAgICAgICAgICAgc3VwZXJEYXRhID0gbmV3IEZsb3dTdXBlckRhdGEoKTtcclxuICAgICAgICAgICAgc3VwZXJEYXRhLmRyb3BMaXN0QXJlYSA9IHRoaXMuRHJvcExpc3REYXRhKHJlc3VsdERhdGEueERhdGEpO1xyXG4gICAgICAgICAgICBzdXBlckRhdGEuZHJvcExpc3RUeXBlID0gdGhpcy5Ecm9wTGlzdERhdGEocmVzdWx0RGF0YS5sZWdlbmREYXRhKTtcclxuICAgICAgICAgICAgc3VwZXJEYXRhLmFyZWFUcmFmZmljU3RhdGlzdGljcyA9IHJlc3VsdERhdGE7XHJcbiAgICAgICAgICAgIHN1cGVyRGF0YS5kZXZpY2VUcmFmZmljU3RhdGlzdGljcyA9IHRoaXMuZGV2aWNlQWxhcm1UcmFmZmljKHJlcy5kYXRhLCBkYXRhRmlsdGVyUGFyYW0ubW9kdWxlKTtcclxuICAgICAgICAgICAgc3VwZXJEYXRhLmFyZWFUcmFmZmljVHJlbmQgPSB0aGlzLkFsYXJtVHJhZmZlaWNUcmVuZChyZXMuZGF0YS50cmVuZFN0YXRpc3RpY3MsIGRhdGFGaWx0ZXJQYXJhbSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3VwZXJEYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOaKpeitpua1gemHj+i2i+WKv1xyXG4gICAgcHJpdmF0ZSBBbGFybVRyYWZmZWljVHJlbmQoYWxhcm1UcmFmZmljVHJlbmQ6IGFsYXJtVHJhZmZpY1RyZW5kLCBkYXRhRmlsdGVyUGFyYW06IGFsYXJtVHJhZmZpY1JlcUVudW0pIHtcclxuICAgICAgICBsZXQgeERhdGEgPSB0aGlzLnRpbWVGaWxlcihkYXRhRmlsdGVyUGFyYW0udGltZVR5cGUpO1xyXG4gICAgICAgIGlmIChkYXRhRmlsdGVyUGFyYW0udGltZVR5cGUgPT0gXCJEYXlcIikge1xyXG4gICAgICAgICAgICBsZXQgaW5mb0FycjogQXJyYXk8YWxhcm1UcmFmZmljVGltZUZvcm1hdD4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHhEYXRhLmZvckVhY2goKHg6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhc3REYXkgPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCAnKSArIHg7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBBbGFybU5tOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIEZsb3dObTogMCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lSXRlbTogbGFzdERheVxyXG4gICAgICAgICAgICAgICAgfSBhcyBhbGFybVRyYWZmaWNUaW1lRm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgbGV0IF9hOiBzdHJpbmcgPSBtb21lbnQobmV3IERhdGUobGFzdERheSkpLmZvcm1hdCgnWVlZWS1NTS1ERCBoaCcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGFsYXJtVHJhZmZpY1RyZW5kLnRyZW5kU3RhdGlzdGljcy5mb3JFYWNoKChpdGVtOiBhbGFybVRyYWZmaWNUcmVuZERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX2I6IHN0cmluZyA9IG1vbWVudChuZXcgRGF0ZShpdGVtLnRpbWVJdGVtKSkuZm9ybWF0KCdZWVlZLU1NLUREIGhoJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pe26Ze06L+H5rukIOWMuuWfn+i/h+a7pFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX2EgPT0gX2IgJiYgaXRlbS5hcmVhTmFtZSA9PSBkYXRhRmlsdGVyUGFyYW0uQXJlYU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5BbGFybU5tICs9IGl0ZW0uYWxhcm07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uRmxvd05tICs9IGl0ZW0uZmxvdztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGluZm9BcnIucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZm9BcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VDaGFydERhdGFGb3JUaGlyZChkYXRhRmlsdGVyUGFyYW0sIHhEYXRhLCBpbmZvQXJyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDovazmjaLmiJDlm77ooajmiYDpnIDmoLzlvI9cclxuICAgIHByaXZhdGUgY2hhbmdlQ2hhcnREYXRhRm9yVGhpcmQoZGF0YUZpbHRlclBhcmFtOiBhbGFybVRyYWZmaWNSZXFFbnVtLCB4RGF0YTogQXJyYXk8c3RyaW5nPiwgaW5mb0FycjogQXJyYXk8YWxhcm1UcmFmZmljVGltZUZvcm1hdD4pIHtcclxuICAgICAgICBsZXQgY2hhcnREYXRhOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIHNlcmllc0RhdGE6IFtdLFxyXG4gICAgICAgICAgICB4RGF0YTogeERhdGEsXHJcbiAgICAgICAgICAgIGxlZ2VuZERhdGE6IFtkYXRhRmlsdGVyUGFyYW0ubW9kdWxlXVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCB0aW1lSW5mbzogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHhEYXRhLmZvckVhY2goKHhJdGVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgbGV0IF9hOiBzdHJpbmcgPSBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnZGF5cycpLmZvcm1hdCgnWVlZWS1NTS1ERCAnKSArIHhJdGVtO1xyXG5cclxuICAgICAgICAgICAgaW5mb0Fyci5mb3JFYWNoKChpdGVtOiBhbGFybVRyYWZmaWNUaW1lRm9ybWF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgX2I6IHN0cmluZyA9IG1vbWVudChpdGVtLnRpbWVJdGVtKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW0nKTtcclxuICAgICAgICAgICAgICAgIGlmIChfYSA9PSBfYikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhRmlsdGVyUGFyYW0ubW9kdWxlID09IFwiYWxhcm1cIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lSW5mby5wdXNoKGl0ZW0uQWxhcm1ObSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGFGaWx0ZXJQYXJhbS5tb2R1bGUgPT0gXCJmbG93XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUluZm8ucHVzaChpdGVtLkZsb3dObSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNoYXJ0RGF0YS5zZXJpZXNEYXRhLnB1c2godGltZUluZm8pO1xyXG4gICAgICAgIHJldHVybiBjaGFydERhdGFcclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdGltZU1hdGNoQXJyKHRpbWVTdHJpbmc6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aW1lU3RyaW5nID09IFwibW9udGhcIikge1xyXG4gICAgICAgICAgICBsZXQgQXJyID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9tZW50KCkuZm9ybWF0KCdERCcpOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXJyLnB1c2gobW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLScpICsgaSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXJyXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lU3RyaW5nID09IFwiRGF5XCIpIHtcclxuICAgICAgICAgICAgbGV0IEFycjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOi9rOaNouS4uuS4i+aLieiPnOWNleaMh+S7pOaJgOmcgOagvOW8j1xyXG4gICAgcHJpdmF0ZSBEcm9wTGlzdERhdGEoeERhdGE6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxkcm9wRW51bT4gPSBbXTtcclxuICAgICAgICBsZXQgQWxhcm1PYmplY3Q6IGFueSA9IGFuZ3VsYXIuY29weShBbGFybU9iamVjdFR5cGUpO1xyXG4gICAgICAgIGxldCBBbGFybWtleTogQXJyYXk8c3RyaW5nPiA9IE9iamVjdC5rZXlzKEFsYXJtT2JqZWN0KTtcclxuXHJcbiAgICAgICAgeERhdGEuZm9yRWFjaCgoaXRlbTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHRDaGlsZCA9IHt9IGFzIGRyb3BFbnVtO1xyXG4gICAgICAgICAgICByZXN1bHRDaGlsZC50ZXh0ID0gaXRlbTtcclxuICAgICAgICAgICAgQWxhcm1rZXkuZm9yRWFjaCgoaW5mbzogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PSBBbGFybU9iamVjdFtpbmZvXS50ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q2hpbGQudmFsdWUgPSBpbmZvO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gocmVzdWx0Q2hpbGQpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG4gICAgLy/ml7bpl7TkvZzkuLrmqKrlnZDmoIdcclxuICAgIHB1YmxpYyB0aW1lRmlsZXIodHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEYXlcIjoge1xyXG4gICAgICAgICAgICAgICAgbGV0IHggPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaGg6IHN0cmluZyB8IG51bWJlciA9IGkgPCAxMCA/ICcwJyArIGkgOiBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHgucHVzaChgJHtoaH06MDBgKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFwiV2Vla1wiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW1lWCg3KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgXCJNb250aFwiOiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUaW1lWCgzMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVYKHRpbWU6IG51bWJlcikge1xyXG4gICAgICAgIGxldCB4ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWU7IGkrKykge1xyXG4gICAgICAgICAgICB4LnVuc2hpZnQobW9tZW50KCkuc3VidHJhY3QoaSArIDEsICdkYXlzJykuZm9ybWF0KCdZWVlZLU1NLUREJykpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB4XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PeS4i+i9veWbvuihqGV4Y2Vs5pWw5o2uXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBvcHRpb25zIFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZmlsZU5hbWUg5LiL6L295paH5Lu2LeaWh+S7tuWQjSjlrZfnrKbkuLIpXHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYXRhcyDkuIvovb3mlofku7bmlbDmja4o5pWw57uEKeavj+S4quaVsOaNruS7o+ihqOS4gOS4qnNoZWV0XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYXRhc1skaW5kZXhdLnNoZWV0TmFtZSBzaGVldOWQjeensFxyXG4gICAgICogQHBhcmFtIG9wdGlvbnMuZGF0YXNbJGluZGV4XS5zaGVldERhdGEg5pWw5o2uQXJyYXk8QXJyYXk8bnVtYmVyfHN0cmluZz4+XHJcbiAgICAgKiBAcGFyYW0gb3B0aW9ucy5kYXRhc1skaW5kZXhdLnNoZWV0SGVhZGVyIGV4Y2Vs5paH5Lu256ys5LiA6KGMXHJcbiAgICAgKiAgICAgICAgICBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGV4cG9ydEV4Y2VsKG1vZHVsZTogYW55LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgb3B0aW9uID0ge30gYXMgZXhwb3J0RXhjZWxQYXJhbUVudW07XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9kdWxlKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBzd2l0Y2ggKG1vZHVsZSkge1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuTW9kdWxlTmFtZUFyci5hcmVhQWxhcm1UcmVuZDpcclxuICAgICAgICAgICAgY2FzZSB0aGlzLk1vZHVsZU5hbWVBcnIuZGV2aWNlQWxhcm1TdGF0aXN0aWNzOlxyXG4gICAgICAgICAgICBjYXNlIHRoaXMuTW9kdWxlTmFtZUFyci5kZXZpY2VUcmFmZmljU3RhdGlzdGljczpcclxuICAgICAgICAgICAgY2FzZSB0aGlzLk1vZHVsZU5hbWVBcnIuZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3M6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdE9uZShlY2hhcnROYW1lQXJyW21vZHVsZV0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSB0aGlzLk1vZHVsZU5hbWVBcnIuZGlzcGF0Y2hlZEFib3V0QWxhcm06IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdFR3byhlY2hhcnROYW1lQXJyW21vZHVsZV0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSB0aGlzLk1vZHVsZU5hbWVBcnIuTWFpbnRhaW5fU3RhdGlzT3ZlcnZpZXdfUmV0cml2YWw6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdFRoaXJkKGVjaGFydE5hbWVBcnJbbW9kdWxlXSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIHRoaXMuTW9kdWxlTmFtZUFyci5JbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGU6XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5Nb2R1bGVOYW1lQXJyLkludGVsbGlnZW50QW5hbHlzaXNfRmFjZTpcclxuICAgICAgICAgICAgY2FzZSB0aGlzLk1vZHVsZU5hbWVBcnIuSW50ZWxsaWdlbnRBbmFseXNpc19NYWM6XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5Nb2R1bGVOYW1lQXJyLkludGVsbGlnZW50QW5hbHlzaXNfQ3Jhc2g6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdEZvdXIoZWNoYXJ0TmFtZUFyclttb2R1bGVdLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgdGhpcy5Nb2R1bGVOYW1lQXJyLk1haW50YWluX1N0YXRpc092ZXJ2aWV3X1JldHJpdmFsX1Jhbms6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdEZpdmUoZWNoYXJ0TmFtZUFyclttb2R1bGVdLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMuY2hhbmdlVGhlRGF0YUZvcm1hdChlY2hhcnROYW1lQXJyW21vZHVsZV0sIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9wdGlvbiAmJiAhXy5pc0VtcHR5KG9wdGlvbikpIHtcclxuICAgICAgICAgICAgdmFyIHRvRXhjZWwgPSBuZXcgRXhwb3J0SnNvbkV4Y2VsKG9wdGlvbik7XHJcbiAgICAgICAgICAgIHRvRXhjZWwuc2F2ZUV4Y2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOm7mOiupOaVsOaNrui9rOaNolxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaGVEYXRhRm9ybWF0KHRpdGxlOiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gYW5ndWxhci5jb3B5KGRhdGEpO1xyXG4gICAgICAgIGxldCBvcHRpb24gPSB7fSBhcyBleHBvcnRFeGNlbFBhcmFtRW51bTtcclxuICAgICAgICBvcHRpb24uZmlsZU5hbWUgPSB0aXRsZTtcclxuICAgICAgICBvcHRpb24uZGF0YXMgPSBbXTtcclxuXHJcbiAgICAgICAgbGV0IHRhYmxlRGF0YSA9IHtcclxuICAgICAgICAgICAgc2hlZXRIZWFkZXI6IG5ld0RhdGEubGVnZW5kRGF0YSxcclxuICAgICAgICAgICAgc2hlZXREYXRhOiBuZXdEYXRhLnNlcmllc0RhdGFcclxuICAgICAgICB9IGFzIEV4Y2VsVGFibGVFbnVtO1xyXG5cclxuICAgICAgICBsZXQgbmV3c2VyaWVzOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG4gICAgICAgIG5ld0RhdGEueERhdGEuZm9yRWFjaCgoYXJlYTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG5ld3Nlcmllc1tpbmRleF0gPSBbXTtcclxuICAgICAgICAgICAgZGF0YS5zZXJpZXNEYXRhLmZvckVhY2goKGRhdGE6IEFycmF5PG51bWJlcj4sIGlkeDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuZXdzZXJpZXNbaW5kZXhdW2lkeF0gPSBkYXRhW2luZGV4XVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0YWJsZURhdGEuc2hlZXREYXRhID0gbmV3c2VyaWVzO1xyXG5cclxuICAgICAgICBuZXdzZXJpZXMuZm9yRWFjaCgoaXRlbTogQXJyYXk8YW55PiwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0YWJsZURhdGEuc2hlZXREYXRhW2luZGV4XS51bnNoaWZ0KG5ld0RhdGEueERhdGFbaW5kZXhdKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBvcHRpb24uZGF0YXMucHVzaCh0YWJsZURhdGEpO1xyXG4gICAgICAgIHJldHVybiBvcHRpb25cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZVRoZURhdGFGb3JtYXRPbmUodGl0bGU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IHt9IGFzIGV4cG9ydEV4Y2VsUGFyYW1FbnVtO1xyXG4gICAgICAgIG9wdGlvbi5maWxlTmFtZSA9IHRpdGxlO1xyXG4gICAgICAgIG9wdGlvbi5kYXRhcyA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgdGFibGVEYXRhID0ge1xyXG4gICAgICAgICAgICBzaGVldEhlYWRlcjogZGF0YS5sZWdlbmREYXRhLFxyXG4gICAgICAgICAgICBzaGVldERhdGE6IFtdXHJcbiAgICAgICAgfSBhcyBFeGNlbFRhYmxlRW51bTtcclxuXHJcbiAgICAgICAgbmV3RGF0YS5zZXJpZXNEYXRhLmZvckVhY2goKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29udGVudDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IFtuZXdEYXRhLnNlcmllc0RhdGFbaW5kZXhdXTtcclxuICAgICAgICAgICAgY29udGVudC51bnNoaWZ0KG5ld0RhdGEueURhdGFbaW5kZXhdKTtcclxuICAgICAgICAgICAgdGFibGVEYXRhLnNoZWV0RGF0YS5wdXNoKGNvbnRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0YWJsZURhdGEpO1xyXG4gICAgICAgIG9wdGlvbi5kYXRhcy5wdXNoKHRhYmxlRGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlVGhlRGF0YUZvcm1hdFR3byh0aXRsZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICBsZXQgb3B0aW9uID0ge30gYXMgZXhwb3J0RXhjZWxQYXJhbUVudW07XHJcbiAgICAgICAgb3B0aW9uLmZpbGVOYW1lID0gdGl0bGU7XHJcbiAgICAgICAgb3B0aW9uLmRhdGFzID0gW107XHJcblxyXG4gICAgICAgIGxldCB0YWJsZURhdGEgPSB7XHJcbiAgICAgICAgICAgIHNoZWV0SGVhZGVyOiBuZXdEYXRhLmxlZ2VuZERhdGEsXHJcbiAgICAgICAgICAgIHNoZWV0RGF0YTogbmV3RGF0YS5zZXJpZXNEYXRhXHJcbiAgICAgICAgfSBhcyBFeGNlbFRhYmxlRW51bTtcclxuXHJcbiAgICAgICAgbGV0IG5ld3NlcmllczogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuICAgICAgICBuZXdEYXRhLnlEYXRhLmZvckVhY2goKGFyZWE6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBuZXdzZXJpZXNbaW5kZXhdID0gW107XHJcbiAgICAgICAgICAgIGRhdGEuc2VyaWVzRGF0YS5mb3JFYWNoKChkYXRhOiBBcnJheTxudW1iZXI+LCBpZHg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmV3c2VyaWVzW2luZGV4XVtpZHhdID0gZGF0YVtpbmRleF1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0YWJsZURhdGEuc2hlZXREYXRhID0gbmV3c2VyaWVzO1xyXG5cclxuICAgICAgICBuZXdzZXJpZXMuZm9yRWFjaCgoaXRlbTogQXJyYXk8YW55PiwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0YWJsZURhdGEuc2hlZXREYXRhW2luZGV4XS51bnNoaWZ0KG5ld0RhdGEueURhdGFbaW5kZXhdKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG9wdGlvbi5kYXRhcy5wdXNoKHRhYmxlRGF0YSlcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaGVEYXRhRm9ybWF0VGhpcmQodGl0bGU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgbGV0IG5ld0RhdGEgPSBhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbiA9IHt9IGFzIGV4cG9ydEV4Y2VsUGFyYW1FbnVtO1xyXG4gICAgICAgIG9wdGlvbi5maWxlTmFtZSA9IHRpdGxlO1xyXG4gICAgICAgIG9wdGlvbi5kYXRhcyA9IFtdO1xyXG5cclxuICAgICAgICBsZXQgdGFibGVEYXRhID0ge1xyXG4gICAgICAgICAgICBzaGVldEhlYWRlcjogbmV3RGF0YS54RGF0YSxcclxuICAgICAgICAgICAgc2hlZXREYXRhOiBbbmV3RGF0YS5zZXJpZXNEYXRhXVxyXG4gICAgICAgIH0gYXMgRXhjZWxUYWJsZUVudW07XHJcblxyXG4gICAgICAgIG9wdGlvbi5kYXRhcy5wdXNoKHRhYmxlRGF0YSlcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaGVEYXRhRm9ybWF0Rm91cih0aXRsZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICBsZXQgb3B0aW9uID0ge30gYXMgZXhwb3J0RXhjZWxQYXJhbUVudW07XHJcbiAgICAgICAgb3B0aW9uLmZpbGVOYW1lID0gdGl0bGU7XHJcbiAgICAgICAgb3B0aW9uLmRhdGFzID0gW107XHJcblxyXG4gICAgICAgIGxldCB0YWJsZURhdGEgPSB7XHJcbiAgICAgICAgICAgIHNoZWV0SGVhZGVyOiBuZXdEYXRhLmxlZ2VuZERhdGEsXHJcbiAgICAgICAgICAgIHNoZWV0RGF0YTogW11cclxuICAgICAgICB9IGFzIEV4Y2VsVGFibGVFbnVtO1xyXG5cclxuICAgICAgICBuZXdEYXRhLnNlcmllc0RhdGEuZm9yRWFjaCgoaXRlbTogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb250ZW50OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gW25ld0RhdGEueERhdGFbaW5kZXhdXTtcclxuICAgICAgICAgICAgY29udGVudC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgIHRhYmxlRGF0YS5zaGVldERhdGEucHVzaChjb250ZW50KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG9wdGlvbi5kYXRhcy5wdXNoKHRhYmxlRGF0YSlcclxuICAgICAgICByZXR1cm4gb3B0aW9uXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VUaGVEYXRhRm9ybWF0Rml2ZSh0aXRsZTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgbmV3RGF0YSA9IGFuZ3VsYXIuY29weShkYXRhKTtcclxuICAgICAgICBsZXQgb3B0aW9uID0ge30gYXMgZXhwb3J0RXhjZWxQYXJhbUVudW07XHJcbiAgICAgICAgb3B0aW9uLmZpbGVOYW1lID0gdGl0bGU7XHJcbiAgICAgICAgb3B0aW9uLmRhdGFzID0gW107XHJcblxyXG4gICAgICAgIGxldCB0YWJsZURhdGEgPSB7XHJcbiAgICAgICAgICAgIHNoZWV0SGVhZGVyOiBbJ+aOkuihjCcsICforr7lpIflkI3np7AnLCAn57G75YirJywgXCLmkJzntKLmrKHmlbBcIiwgXCLmkJzntKLml7bpl7RcIl0sXHJcbiAgICAgICAgICAgIHNoZWV0RGF0YTogW11cclxuICAgICAgICB9IGFzIEV4Y2VsVGFibGVFbnVtO1xyXG5cclxuICAgICAgICBuZXdEYXRhLmxlZ2VuZERhdGEuZm9yRWFjaCgodGl0bGU6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmV3RGF0YS5zZXJpZXNEYXRhW2luZGV4XSkge1xyXG4gICAgICAgICAgICAgICAgbmV3RGF0YS5zZXJpZXNEYXRhW2luZGV4XS5mb3JFYWNoKChpdGVtOiBhbnksIGlkeDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRlbnQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WzBdID0gaWR4ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WzFdID0gaXRlbS5zdGF0aXN0aWNzSXRlbTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WzJdID0gZGF0YS5sZWdlbmREYXRhW2luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50WzNdID0gaXRlbS5udW07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFs0XSA9IGl0ZW0udGltZUl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVEYXRhLnNoZWV0RGF0YS5wdXNoKGNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBvcHRpb24uZGF0YXMucHVzaCh0YWJsZURhdGEpXHJcbiAgICAgICAgcmV0dXJuIG9wdGlvblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gcGFyYW1zIOWvvOWHuua1geaWh+S7tlxyXG4gICAgICovXHJcblxyXG4gICAgcHVibGljIGV4cG9ydFRhYmxlWGxzKHVybDogc3RyaW5nLCBwYXJhbXM6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcclxuICAgICAgICAvLyB3aW5kb3cub3BlbignYWJvdXQ6YmxhbmsnLCBcIl9ibGFua1wiKTtcclxuICAgICAgICBsZXQgZm9ybSA9ICQoXCI8Zm9ybT5cIik7XHJcbiAgICAgICAgZm9ybS5hdHRyKCduYW1lJywgJ2Rvd21sb2FkU3RhdHVzJyk7XHJcbiAgICAgICAgZm9ybS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgZm9ybS5hdHRyKCdtZXRob2QnLCBcInBvc3RcIik7XHJcbiAgICAgICAgZm9ybS5hdHRyKCdhY3Rpb24nLCB1cmwpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoZm9ybSlcclxuXHJcbiAgICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChpdGVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gJCgnPGlucHV0PicpO1xyXG4gICAgICAgICAgICBpbnB1dC5hdHRyKCd0eXBlJywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICBpbnB1dC5hdHRyKCduYW1lJywgaXRlbSk7XHJcbiAgICAgICAgICAgIGlucHV0LmF0dHIoJ3ZhbHVlJywgcGFyYW1zW2l0ZW1dKTtcclxuICAgICAgICAgICAgJChcImZvcm1bbmFtZT0nZG93bWxvYWRTdGF0dXMnXVwiKS5hcHBlbmQoaW5wdXQpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJChcImZvcm1bbmFtZT0nZG93bWxvYWRTdGF0dXMnXVwiKS5zdWJtaXQoKTtcclxuICAgICAgICAkKFwiZm9ybVtuYW1lPSdkb3dtbG9hZFN0YXR1cyddXCIpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0TW9kdWxlTmFtZShkYXRlVHlwZTogZGF0YVNlbGVjdFJlc3VsdCwgdmFsdWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWRhdGVUeXBlLm1vZHVsZSB8fCBkYXRlVHlwZS5tb2R1bGUgPT0gbW9kdWxlU3RyaW5nLkFMTCkge1xyXG4gICAgICAgICAgICBkYXRlVHlwZS5tb2R1bGUgPSBtb2R1bGVTdHJpbmcuTW9udGhcclxuICAgICAgICB9IGVsc2UgaWYgKGRhdGVUeXBlLm1vZHVsZSA9PSBtb2R1bGVTdHJpbmcuQ3VzdG9tICYmIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZUFycjogQXJyYXk8c3RyaW5nPiA9IHZhbHVlLnNwbGl0KFwiIC0gXCIpO1xyXG4gICAgICAgICAgICBkYXRlVHlwZS5zdGFydFRpbWUgPSB2YWx1ZUFyclswXTtcclxuICAgICAgICAgICAgZGF0ZVR5cGUuZW5kVGltZSA9IHZhbHVlQXJyWzFdO1xyXG4gICAgICAgICAgICBkYXRlVHlwZS5tb2R1bGUgPSBtb2R1bGVTdHJpbmcuRGF5O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0ZVR5cGVcclxuICAgIH1cclxuICAgIC8v6LWE5rqQ5qOA57Si5Y+C5pWw6I635Y+WXHJcbiAgICBzdGF0aWMgUmV0cmlldmFsbW9kdWxlTmFtZXM6IEFycmF5PHsgY29kZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcgfT4gPSBbXHJcbiAgICAgICAgT3BlclNlY29uZE1vZHVsZS5SZXNvdXJjZVJldHJpZXZhbF9GdWxsU2VhcmNoLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5SZXNvdXJjZVJldHJpZXZhbF9BZHZhbmNlU2VhcmNoX1ZlaGljbGUsXHJcbiAgICAgICAgT3BlclRoaXJkTW9kdWxlLlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfRmFjZSxcclxuICAgICAgICBPcGVyVGhpcmRNb2R1bGUuUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9XaUZpLFxyXG4gICAgICAgIE9wZXJUaGlyZE1vZHVsZS5SZXNvdXJjZVJldHJpZXZhbF9BZHZhbmNlU2VhcmNoX0VGZW5jZVxyXG4gICAgXTtcclxuICAgIHB1YmxpYyBSZXRyaWV2YWxQYXJhbXMoZGF0YVRpbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICAvLyDojrflj5bml7bpl7RcclxuICAgICAgICBsZXQgZGF0ZVR5cGUgPSB7fSBhcyBkYXRhU2VsZWN0UmVzdWx0O1xyXG4gICAgICAgIGRhdGVUeXBlLm1vZHVsZSA9IGRhdGFUaW1lID8gZGF0YVRpbWUgOiBtb2R1bGVTdHJpbmcuTW9udGg7XHJcbiAgICAgICAgbGV0IGRhdGVNb2R1bGUgPSB0aGlzLmRhdGFTZWxlY3RTZXJ2ZXIuZ2V0UGFyYW1zVGltZShkYXRlVHlwZSk7XHJcbiAgICAgICAgLy8g6I635Y+W5Y+C5pWwXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9IGFzIGludGVsbGlnZW50QW5hbHlzaXNSZXF1aXJlUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5iZWdpbkRhdGUgPSBkYXRlTW9kdWxlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IGRhdGVNb2R1bGUuZW5kVGltZTtcclxuICAgICAgICBwYXJhbXMubW9kdWxlTmFtZXMgPSBtYWludGFpbkZhY3RvcnkuUmV0cmlldmFsbW9kdWxlTmFtZXMubWFwKChpdGVtOiB7IGNvZGU6IHN0cmluZywgbmFtZTogc3RyaW5nIH0pID0+IGl0ZW0uY29kZSkuam9pbignLCcpO1xyXG4gICAgICAgIHBhcmFtcy5zdGF0aXN0aWNNb2R1bGVMZXZlbCA9IDM7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOajgOe0ouaOkuihjOamnOWPguaVsOiOt+WPllxyXG4gICAgcHVibGljIFJldHJpZXZhbFJhbmtQYXJhbShkYXRlVHlwZTogZGF0YVNlbGVjdFJlc3VsdCwgcmVzb3VyY2VUeXBlPzogc3RyaW5nLCB2YWx1ZT86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhVHlwZVBhcmFtczogZGF0YVNlbGVjdFJlc3VsdCA9IHRoaXMuZ2V0TW9kdWxlTmFtZShkYXRlVHlwZSwgdmFsdWUpXHJcbiAgICAgICAgbGV0IGRhdGVNb2R1bGUgPSB0aGlzLmRhdGFTZWxlY3RTZXJ2ZXIuZ2V0UGFyYW1zVGltZShkYXRhVHlwZVBhcmFtcyk7XHJcbiAgICAgICAgLy8g6I635Y+W5Y+C5pWwXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHt9IGFzIFJlc291cmNlUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5yZXNvdXJjZVR5cGUgPSByZXNvdXJjZVR5cGUgPyByZXNvdXJjZVR5cGUgOiBBbGFybU9iamVjdFR5cGUuQUxMLnZhbHVlO1xyXG4gICAgICAgIHBhcmFtcy50aW1lVHlwZSA9IGRhdGVNb2R1bGUubW9kdWxlO1xyXG4gICAgICAgIHBhcmFtcy5iZWdpbkRhdGUgPSBkYXRlTW9kdWxlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IGRhdGVNb2R1bGUuZW5kVGltZTtcclxuICAgICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5oql6K2m57uf6K6h5Y+C5pWw6I635Y+WXHJcbiAgICBwdWJsaWMgYWxhcm1QYXJhbXMoZGF0YVRpbWU/OiBzdHJpbmcsIHJlc291cmNlVHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIC8vIOiOt+WPluaXtumXtFxyXG4gICAgICAgIGxldCBkYXRlVHlwZSA9IHt9IGFzIGRhdGFTZWxlY3RSZXN1bHQ7XHJcbiAgICAgICAgZGF0ZVR5cGUubW9kdWxlID0gZGF0YVRpbWUgPyBkYXRhVGltZSA6IG1vZHVsZVN0cmluZy5Nb250aDtcclxuICAgICAgICBsZXQgZGF0ZU1vZHVsZSA9IHRoaXMuZGF0YVNlbGVjdFNlcnZlci5nZXRQYXJhbXNUaW1lKGRhdGVUeXBlKTtcclxuICAgICAgICAvLyDojrflj5blj4LmlbBcclxuICAgICAgICBsZXQgcGFyYW1zID0ge30gYXMgUmVzb3VyY2VQYXJhbXM7XHJcbiAgICAgICAgcGFyYW1zLnJlc291cmNlVHlwZSA9IHJlc291cmNlVHlwZSA/IHJlc291cmNlVHlwZSA6IEFsYXJtT2JqZWN0VHlwZS5BTEwudmFsdWU7XHJcbiAgICAgICAgcGFyYW1zLnRpbWVUeXBlID0gZGF0ZVR5cGUubW9kdWxlO1xyXG4gICAgICAgIHBhcmFtcy5iZWdpbkRhdGUgPSBkYXRlTW9kdWxlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kRGF0ZSA9IGRhdGVNb2R1bGUuZW5kVGltZTtcclxuICAgICAgICByZXR1cm4gcGFyYW1zXHJcbiAgICB9XHJcblxyXG4gICAgLy8g5o6S6KGM5Y+C5pWw6I635Y+WXHJcbiAgICBwdWJsaWMgUmFua1BhcmFtcyhkYXRhVGltZT86IHN0cmluZywgcmVzb3VyY2VUeXBlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5pe26Ze0XHJcbiAgICAgICAgbGV0IGRhdGVUeXBlID0ge30gYXMgZGF0YVNlbGVjdFJlc3VsdDtcclxuICAgICAgICBkYXRlVHlwZS5tb2R1bGUgPSBkYXRhVGltZSA/IGRhdGFUaW1lIDogbW9kdWxlU3RyaW5nLk1vbnRoO1xyXG4gICAgICAgIGxldCBkYXRlTW9kdWxlID0gdGhpcy5kYXRhU2VsZWN0U2VydmVyLmdldFBhcmFtc1RpbWUoZGF0ZVR5cGUpO1xyXG4gICAgICAgIC8vIOiOt+WPluWPguaVsFxyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7fSBhcyBSZXNvdXJjZVBhcmFtcztcclxuICAgICAgICBwYXJhbXMucmVzb3VyY2VUeXBlID0gcmVzb3VyY2VUeXBlID8gcmVzb3VyY2VUeXBlIDogQWxhcm1PYmplY3RUeXBlLkFMTC52YWx1ZTtcclxuICAgICAgICBwYXJhbXMudGltZVR5cGUgPSBkYXRlVHlwZS5tb2R1bGU7XHJcbiAgICAgICAgcGFyYW1zLmJlZ2luRGF0ZSA9IGRhdGVNb2R1bGUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5lbmREYXRlID0gZGF0ZU1vZHVsZS5lbmRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy50b3BOdW0gPSAnMTAnXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtc1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnbWFpbnRhaW5GYWN0b3J5JywgbWFpbnRhaW5GYWN0b3J5KTsiXX0=
