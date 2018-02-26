"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseResult_1 = require("../core/params/result/ResponseResult");
const ChildWhere_1 = require("../common/ChildWhere");
const Where_1 = require("../common/Where");
const ResourceParams_1 = require("../core/params/ResourceParams");
const CommonUtils_1 = require("../utils/CommonUtils");
const moment = require("moment");
const _ = require("lodash");
const maintainEnum_1 = require("../core/entity/maintainEnum");
const BeanHelper_1 = require("../common/help/BeanHelper");
const DaoType_1 = require("../dao/enum/DaoType");
const OperThirdModule_1 = require("../core/entity/OperThirdModule");
const OperSecondModule_1 = require("../core/entity/OperSecondModule");
const ResourceTools_1 = require("../extend/ResourceTools");
const Operations_1 = require("../extend/Operations");
const TaskType = {
    FaceMonitor: { value: "FaceMonitor", text: "人像布控任务" },
    VehicleMonitor: { value: "VehicleMonitor", text: "车辆布控任务" },
    MacMonitor: { value: "MacMonitor", text: "感知数据布控任务" },
    IMEIMonitor: { value: "IMEIMonitor", text: "IMEI布控任务" },
    IMSIMonitor: { value: "IMSIMonitor", text: "IMSI布控任务" },
    FaceStruct: { value: "FaceStruct", text: "人像结构化任务" },
    VehicleStruct: { value: "VehicleStruct", text: "车辆结构化任务" }
};
class OperationEnum {
}
OperationEnum.carAlarm = "车辆报警";
OperationEnum.macAlarm = "感知数据报警";
OperationEnum.personAlarm = "人像报警";
OperationEnum.carFlow = "车辆流量";
OperationEnum.macFlow = "感知数据流量";
OperationEnum.personFlow = "人像流量";
OperationEnum.alarm = "alarm";
OperationEnum.flow = "flow";
OperationEnum.WiFi = "WiFi";
OperationEnum.EFENCE = "EFENCE";
OperationEnum.Vehicle = "Vehicle";
OperationEnum.Face = "Face";
class areaStructTaskResultParam {
}
exports.areaStructTaskResultParam = areaStructTaskResultParam;
class OperationsService {
    constructor() {
        this.AlarmObjectType = maintainEnum_1.AlarmObjectType;
    }
    retrievalTrendStatistics(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield OperationsService.ResourceServerExt.requestMonthAll(params, maintainEnum_1.intelligentAnalysisData.Maintain_StatisOverview_Retrival_Trend);
            return result;
        });
    }
    retrievalKeyWordRank(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield OperationsService.ResourceServerExt.requestMonthAll(params, maintainEnum_1.intelligentAnalysisData.AllRankList);
            return result || [];
        });
    }
    userStatus(params) {
        if (params) {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).userStatus(params);
        }
        else {
            return Promise.resolve(null);
        }
    }
    logManagement(params) {
        if (params) {
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).logManagement(params);
        }
        else {
            return Promise.resolve(null);
        }
    }
    exceptionlog(params) {
        if (params) {
            let arrWhereJson = OperationsService.exceptionlogWhereJson(params.arrWhereJson) || [];
            return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ExceptionLogDao).findListByPage(arrWhereJson, params.currentPage, params.pageSize);
        }
        else {
            return Promise.resolve(null);
        }
    }
    static exceptionlogWhereJson(arg) {
        console.log(arg);
        let where = new Where_1.default();
        where.JType = "And";
        let whereChild = new ChildWhere_1.default();
        whereChild.FieldName = "F_Exception_Time";
        whereChild.FieldType = "DateTime";
        whereChild.FieldValue = arg.startTime;
        whereChild.MType = "GreaterEqual";
        whereChild.JType = "And";
        where.Childs.push(whereChild);
        let whereChild1 = new ChildWhere_1.default();
        whereChild1.FieldName = "F_Exception_Time";
        whereChild1.FieldType = "DateTime";
        whereChild1.FieldValue = arg.endTime;
        whereChild1.MType = "LessEqual";
        whereChild1.JType = "And";
        where.Childs.push(whereChild1);
        console.log(where);
        return [where];
    }
    getChartData(areas, chart, typeEnum) {
        let superData = {
            seriesData: [],
            xData: [],
            legendData: []
        };
        typeEnum.forEach((type, index) => {
            superData.legendData[index] = TaskType[type].text;
        });
        superData.xData = areas;
        typeEnum.forEach((type, index) => {
            let series = [];
            areas.forEach((area, idx) => {
                series[idx] = 0;
                chart.forEach((item) => {
                    if (item.areaName == area && item.taskType == type) {
                        series[idx] += Number(item.number);
                    }
                });
            });
            superData.seriesData[index] = series;
        });
        return superData;
    }
    taskStatistics(areaId) {
        return Promise.resolve(null)
            .then(() => {
            let arr = [BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).areaTaskStatistic(), BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).controlTaskStatistic(areaId || '')];
            return Promise.all(arr);
        })
            .then((res) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            result.count = res[0].count + res[1].count;
            let data = {
                areaTaskStatistics: {
                    seriesData: [],
                    xData: [],
                    legendData: []
                },
                areaDispatchedTaskStatistics: {
                    seriesData: [],
                    xData: [],
                    legendData: []
                },
                dispatchedAboutTaskStatistics: []
            };
            if (res[0].data && res[0].data.length > 0) {
                let someData = [];
                res[0].data.forEach((item) => {
                    if (item.taskType) {
                        someData.push(item);
                    }
                });
                let areas = [];
                someData.forEach((item) => {
                    if (areas.indexOf(item.areaName) == -1) {
                        areas.push(item.areaName);
                    }
                });
                let TaskTypeItem = {};
                Object.keys(TaskType).forEach((type, index) => {
                    TaskTypeItem[type] = [];
                    someData.forEach((item) => {
                        if (type == item.taskType) {
                            TaskTypeItem[type].push(item);
                        }
                    });
                });
                let chart1TypeEnum1 = [TaskType.FaceStruct.value, TaskType.VehicleStruct.value];
                let chart1 = [].concat(TaskTypeItem.FaceStruct, TaskTypeItem.VehicleStruct);
                data.areaTaskStatistics = this.getChartData(areas, chart1, chart1TypeEnum1);
                let chart1TypeEnum2 = [TaskType.FaceMonitor.value, TaskType.VehicleMonitor.value, TaskType.MacMonitor.value];
                let chart2 = [].concat(TaskTypeItem.FaceMonitor, TaskTypeItem.VehicleMonitor, TaskTypeItem.MacMonitor);
                data.areaDispatchedTaskStatistics = this.getChartData(areas, chart2, chart1TypeEnum2);
            }
            if (res[1].data && res[1].data.length > 0) {
                res[1].data.forEach((item, index) => {
                    data.dispatchedAboutTaskStatistics.push({
                        seriesData: item.number,
                        yData: item.libName,
                        area: item.areaName
                    });
                });
            }
            result.data = data;
            return result;
        });
    }
    DeviceStatusObj(data) {
        let deviceType = [
            maintainEnum_1.AlarmObjectType.Face.value,
            maintainEnum_1.AlarmObjectType.WiFi.value,
            maintainEnum_1.AlarmObjectType.RmpGate.value,
            maintainEnum_1.AlarmObjectType.EFENCE.value
        ];
        let arr = [];
        deviceType.forEach((item) => {
            let StatisticsOverviewObj = {};
            switch (item) {
                case maintainEnum_1.AlarmObjectType.Face.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['CameraCount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['CameraOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
                case maintainEnum_1.AlarmObjectType.WiFi.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['WIFICount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['WIFIOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
                case maintainEnum_1.AlarmObjectType.RmpGate.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['RmpCount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['RmpOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
                case maintainEnum_1.AlarmObjectType.EFENCE.value: {
                    StatisticsOverviewObj.title = item;
                    StatisticsOverviewObj.total = data['EFENCECount'] || 0;
                    StatisticsOverviewObj.alarm = 0;
                    StatisticsOverviewObj.online = data['EFENCEOnLine'] || 0;
                    arr.push(StatisticsOverviewObj);
                    break;
                }
            }
        });
        return arr;
    }
    getDevicesStatus() {
        let deviceList = [BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).getDeviceStatus({}), BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).getDeviceAlarmStatus({ objectType: 'ALL' })];
        return Promise.all(deviceList).then((res) => {
            let arr = [];
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            if (res[0] && res[0].data && res[1] && res[1].data) {
                arr = this.DeviceStatusObj(res[0].data);
                arr.forEach((item, index) => {
                    res[1].data.forEach((item2) => {
                        if (item2.objectType == item.title) {
                            arr[index].alarm = item2.totalAlarm;
                        }
                    });
                });
                result.data = arr;
                return result;
            }
        });
    }
    getDevicesStatusModule(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).getDevicesStatusModule(params);
    }
    getServerStatusModule(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).getServerStatusModule(params);
    }
    taskStatisticsTotal() {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).areaTaskStatistic().then((res) => {
            let resultData = {
                seriesData: [],
                legendData: []
            };
            Object.keys(TaskType).forEach((key) => {
                resultData.legendData.push(TaskType[key].value);
            });
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            if (res && res.data) {
                resultData.legendData.forEach((type, index) => {
                    resultData.seriesData[index] = 0;
                    res.data.forEach((item) => {
                        if (type == item.taskType) {
                            resultData.seriesData[index] += Number(item.number);
                        }
                    });
                    resultData.legendData[index] = type;
                });
                let MACINDEX = resultData.legendData.indexOf('MAC');
                let IMEIINDEX = resultData.legendData.indexOf('IMSI');
                let IMSIINDEX = resultData.legendData.indexOf('IMSI');
                let macTotal = resultData.seriesData[MACINDEX] + resultData.seriesData[IMEIINDEX] + resultData.seriesData[IMSIINDEX];
                resultData.seriesData[MACINDEX] = macTotal;
                resultData.legendData.forEach((key, index) => {
                    if (TaskType[key] && TaskType[key].text) {
                        resultData.legendData[index] = TaskType[key].text;
                    }
                    else if (key == TaskType.CarMonitor.value) {
                        resultData.legendData[index] = TaskType.CarMonitor.text;
                    }
                    else {
                        resultData.legendData[index] = key;
                    }
                });
                result.data = resultData;
                return result;
            }
        });
    }
    alarmStatistics(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(params).then((res) => {
            if (res && res.data) {
                return this.alarmTrafficData(res, "alarm");
            }
        });
    }
    ;
    areaTrafficStatistics(params) {
        let param = new ResourceParams_1.default();
        param.resourceType = 'ALL';
        param.timeType = 'Day';
        param.beginDate = moment().subtract(12, 'month').format('YYYY-MM-DD hh:mm:ss');
        param.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(param).then((res) => {
            if (res && res.data) {
                return this.alarmTrafficData(res, "flow");
            }
        });
    }
    ;
    alarmTrafficData(res, type) {
        let resourceData = {
            seriesData: [],
            xData: [],
            legendData: []
        };
        if (type == OperationEnum.alarm) {
            resourceData.legendData = [OperationEnum.carAlarm, OperationEnum.personAlarm, OperationEnum.macAlarm];
        }
        else if (type == OperationEnum.flow) {
            resourceData.legendData = [OperationEnum.carFlow, OperationEnum.personFlow, OperationEnum.macFlow];
        }
        let MacArr = [];
        let FaceArr = [];
        let VehicleArr = [];
        res.data.forEach((item) => {
            if (item.areaName && resourceData.xData.indexOf(item.areaName) == -1) {
                resourceData.xData.push(item.areaName);
            }
            if (item.objectType == OperationEnum.WiFi || item.objectType == OperationEnum.EFENCE) {
                MacArr.push(item);
            }
            else if (item.objectType == OperationEnum.Face) {
                FaceArr.push(item);
            }
            else if (item.objectType == OperationEnum.Vehicle) {
                VehicleArr.push(item);
            }
        });
        let getAreaDeviceData = (newData) => {
            let areaArr = [];
            resourceData.xData.forEach((areName, index) => {
                areaArr[index] = 0;
                newData.forEach((item) => {
                    if (item.areaName == areName) {
                        areaArr[index] += Number(item[type]);
                    }
                });
            });
            return areaArr;
        };
        resourceData.seriesData.push(getAreaDeviceData(VehicleArr));
        resourceData.seriesData.push(getAreaDeviceData(FaceArr));
        resourceData.seriesData.push(getAreaDeviceData(MacArr));
        let result = new ResponseResult_1.ResponseResult();
        result.code = 200;
        result.data = resourceData;
        return result;
    }
    trafficStatistics() {
        let params = new ResourceParams_1.default();
        params.resourceType = 'ALL';
        params.timeType = 'Day';
        params.beginDate = moment().subtract(12, 'month').format('YYYY-MM-DD hh:mm:ss');
        params.endDate = moment().format('YYYY-MM-DD hh:mm:ss');
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(params).then((res) => {
            if (res && res.data) {
                let result = new ResponseResult_1.ResponseResult();
                result.code = 200;
                let resourceData = {
                    seriesData: [],
                    totalNum: 0,
                    xData: ResourceTools_1.ResourceTools.createMonthTimeLine(),
                    legendData: ["人像", "车辆", "Wi-Fi", "电子围栏"]
                };
                let WiFiArr = [];
                let EFENCEArr = [];
                let FaceArr = [];
                let VehicleArr = [];
                res.data.forEach((item) => {
                    resourceData.totalNum += item.flow;
                    item.timeItem = moment(item.timeItem).format("DD") + "日";
                    if (item.objectType == maintainEnum_1.AlarmObjectType.Face.value) {
                        FaceArr.push(item);
                    }
                    else if (item.objectType == maintainEnum_1.AlarmObjectType.Vehicle.value) {
                        VehicleArr.push(item);
                    }
                    else if (item.objectType == maintainEnum_1.AlarmObjectType.WiFi.value) {
                        WiFiArr.push(item);
                    }
                    else if (item.objectType == maintainEnum_1.AlarmObjectType.EFENCE.value) {
                        EFENCEArr.push(item);
                    }
                });
                let getDateData = (newData) => {
                    let result = [];
                    resourceData.xData.forEach((timer, index) => {
                        result[index] = 0;
                        newData.forEach((item) => {
                            if (item.timeItem == timer) {
                                result[index] += Number(item.flow);
                            }
                        });
                    });
                    return result;
                };
                resourceData.seriesData.push(getDateData(FaceArr));
                resourceData.seriesData.push(getDateData(VehicleArr));
                resourceData.seriesData.push(getDateData(WiFiArr));
                resourceData.seriesData.push(getDateData(EFENCEArr));
                result.data = resourceData;
                return result;
            }
        });
    }
    retrievalStatistics(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params).then((res) => {
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            let resData = {
                yData: [],
                seriesData: []
            };
            let timeItem = [];
            let functionType = [
                OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Vehicle.code,
                OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_Face.code,
                OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_WiFi.code,
                OperThirdModule_1.OperThirdModule.ResourceRetrieval_AdvanceSearch_EFence.code,
                OperSecondModule_1.OperSecondModule.ResourceRetrieval_FullSearch.code,
                ""
            ];
            res.data.forEach((item) => {
                if (timeItem.indexOf(item.timeItem) == -1) {
                    timeItem.push(item.timeItem);
                }
            });
            functionType.forEach((type, index) => {
                resData.seriesData[index] = 0;
                res.data.forEach((item) => {
                    if (item.functionType == type) {
                        if (!item.num) {
                            item.num = '0';
                        }
                        resData.seriesData[index] += Number(item.num);
                    }
                });
                if (type && OperThirdModule_1.OperThirdModule[type]) {
                    functionType[index] = OperThirdModule_1.OperThirdModule[type].name.trim();
                }
            });
            functionType[4] = "设备";
            functionType[5] = "位置";
            resData.seriesData[4] = resData.seriesData[5];
            resData.yData = functionType;
            result.data = resData;
            return result;
        });
    }
    analysissTatistics() {
        let params = {};
        params.beginDate = '';
        params.endDate = CommonUtils_1.default.formatDate(new Date());
        params.moduleNames = 'IntelligentAnalysis';
        params.statisticModuleLevel = 2;
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params).then((res) => {
            if (res && res.data) {
                let result = new ResponseResult_1.ResponseResult();
                result.code = 200;
                let resourceData = {
                    totalNum: 0,
                    seriesData: [],
                    legendData: ['人员分析', '车辆分析', '感知数据分析']
                };
                let IntelligentType = [OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Face.code, OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Vehicle.code, OperSecondModule_1.OperSecondModule.IntelligentAnalysis_Mac.code];
                res.data.forEach((item) => {
                    resourceData.totalNum += item.num;
                    IntelligentType.forEach((type) => {
                        if (item.functionType == type) {
                            resourceData.seriesData.push(item.num);
                        }
                    });
                });
                result.data = resourceData;
                return result;
            }
        });
    }
    intelligentAnalysis(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).searchOperCountByModule(params).then((res) => {
            if (res && res.data) {
                let result = new ResponseResult_1.ResponseResult();
                result.code = 200;
                let OperThirdEnum = _.cloneDeep(OperThirdModule_1.OperThirdModule);
                let results = {
                    seriesData: [],
                    xData: []
                };
                Object.keys(OperThirdEnum).forEach((cate, index) => {
                    let num = 0;
                    res.data.forEach((item) => {
                        if (item.functionType && item.functionType == cate) {
                            num += Number(item.num);
                        }
                    });
                    if (num) {
                        results.seriesData.push(num);
                        results.xData.push(OperThirdEnum[cate].name);
                    }
                });
                if (results.seriesData && results.xData) {
                    result.data = results;
                    return result;
                }
            }
        });
    }
    deveceAlarmStatisticsTop(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(params).then((res) => {
            if (res && res.data) {
                let result = new ResponseResult_1.ResponseResult();
                result.code = 200;
                result.data = this.alarmTrafficDevice(res, "alarm");
                return result;
            }
        });
    }
    deveceTrafficStatisticsTop(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getAlarmDeviceNum(params).then((res) => {
            if (res && res.data) {
                let result = new ResponseResult_1.ResponseResult();
                result.code = 200;
                result.data = this.alarmTrafficDevice(res, "flow");
                return result;
            }
        });
    }
    alarmTrafficDevice(res, type) {
        let deviceObj = { ALL: [] };
        let areaObj = {};
        let allDeviceAlarmNum = res.data.sort(function (a, b) {
            return b[type] - a[type];
        });
        allDeviceAlarmNum.forEach((item) => {
            if (deviceObj.ALL.length > 10) {
                return;
            }
            if (deviceObj.ALL.length <= 10 && item.deviceName) {
                deviceObj.ALL.push(item);
            }
        });
        res.data.forEach((item) => {
            if (item.objectType && !deviceObj[item.objectType]) {
                deviceObj[item.objectType] = [];
            }
            if (item.areaName && !areaObj[item.areaName]) {
                areaObj[item.areaName] = [];
            }
            if (!!item.deviceName && item.objectType != "ALL") {
                deviceObj[item.objectType].push(item);
                areaObj[item.areaName].push(item);
            }
        });
        let dropListMenu = this.SortAndGetTop10(deviceObj, type);
        let dropListAreaMenu = this.SortAndGetTop10(areaObj, type);
        deviceObj = this.changeTheChartData(deviceObj, type);
        areaObj = this.changeTheChartData(areaObj, type);
        deviceObj.dropListMenu = dropListMenu;
        areaObj.dropListMenu = dropListAreaMenu;
        return {
            deviceObj: deviceObj,
            areaObj: areaObj
        };
    }
    changeTheChartData(Obj, type) {
        Object.keys(Obj).forEach((key) => {
            let chartNeedConstruct = {
                yData: [],
                seriesData: []
            };
            Obj[key].forEach((item) => {
                chartNeedConstruct.yData.push(item.deviceName);
                chartNeedConstruct.seriesData.push(item[type]);
            });
            Obj[key] = chartNeedConstruct;
        });
        return Obj;
    }
    SortAndGetTop10(Obj, type) {
        let dropListMenu = [];
        Object.keys(Obj).forEach((key, index) => {
            if (key) {
                Obj[key] = Obj[key].sort(function (a, b) {
                    return b[type] - a[type];
                });
                Obj[key] = Obj[key].slice(0, 10);
                let dropData = {};
                let alarmObjectType = maintainEnum_1.AlarmObjectType;
                if (alarmObjectType[key]) {
                    dropData.text = alarmObjectType[key].text;
                    dropData.value = alarmObjectType[key].value;
                }
                else {
                    dropData.text = key;
                    dropData.value = `area${index + 1}`;
                }
                dropListMenu.push(dropData);
            }
        });
        return dropListMenu;
    }
    alarmTrafficResult(param, res, type) {
        let that = this;
        let AreaIDTypeUniq = this.getAlarmTrendDropList(res);
        let areasDrop = AreaIDTypeUniq[0];
        let deviceDrop = AreaIDTypeUniq[1];
        let alarmStatisticsTrend = {
            seriesData: [],
            xData: ResourceTools_1.ResourceTools.getGroudByTime(param.timeType),
            areaDropMenu: areasDrop,
            deviceDropMenu: deviceDrop
        };
        let newData = _.cloneDeep(res.data);
        areasDrop.forEach((info, idx) => {
            alarmStatisticsTrend.seriesData[idx] = [];
            alarmStatisticsTrend.xData.forEach((time, index) => {
                alarmStatisticsTrend.seriesData[idx][index] = 0;
                newData.forEach((item) => {
                    if (ResourceTools_1.ResourceTools.FormatTimeByType(param.timeType, item.timeItem) == time && info.value == item.areaID) {
                        alarmStatisticsTrend.seriesData[idx][index] += item[type];
                    }
                });
            });
        });
        return Promise.resolve(alarmStatisticsTrend);
    }
    trafficStatisticsModule(params) {
        let param = maintainEnum_1.alarmTrafficReqParams;
        param.beginDate = params.beginDate;
        param.endDate = params.endDate;
        param.resourceType = params.resourceType;
        param.timeType = params.timeType || "Month";
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(param).then((res) => {
            if (res && res.data) {
                return this.alarmTrafficResult(param, res, "flow").then((data) => {
                    let result = new ResponseResult_1.ResponseResult();
                    result.code = 200;
                    result.data = data;
                    return result;
                });
            }
        });
    }
    alarmStatisticsModule(params) {
        let param = maintainEnum_1.alarmTrafficReqParams;
        param.beginDate = params.beginDate;
        param.endDate = params.endDate;
        param.resourceType = params.resourceType;
        param.timeType = params.timeType || "Month";
        console.log(param);
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.ResourceDao).getResourceNumByArea(param).then((res) => {
            if (res && res.data) {
                return this.alarmTrafficResult(param, res, "alarm").then((data) => {
                    let result = new ResponseResult_1.ResponseResult();
                    result.code = 200;
                    result.data = data;
                    return result;
                });
            }
        });
    }
    dispatchedAboutAlarm(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).dispatchedAboutAlarm(params).then((res) => {
            let results = {
                seriesData: [],
                yData: [],
                legendData: []
            };
            res.data.forEach((item) => {
                if (results.yData.indexOf(item.name) == "-1") {
                    results.yData.push(item.name);
                }
            });
            Object.keys(maintainEnum_1.AlarmStatusType).forEach((value) => {
                let cate = [];
                results.yData.forEach((data, index) => {
                    if (results.legendData.indexOf(maintainEnum_1.AlarmStatusType[value].text) == "-1") {
                        results.legendData.push(maintainEnum_1.AlarmStatusType[value].text);
                    }
                    res.data.forEach((item) => {
                        if (value == item.Status && data == item.name) {
                            cate[index] = item.Count;
                        }
                        else {
                            if (!cate[index]) {
                                cate[index] = 0;
                            }
                        }
                    });
                });
                results.seriesData.push(cate);
            });
            let result = new ResponseResult_1.ResponseResult();
            result.code = 200;
            result.data = results;
            return result;
        });
    }
    highFrequencyRetrieval(params) {
        return BeanHelper_1.BeanHelper.getDao(DaoType_1.DaoType.OperationsDao).dispatchedAboutAlarm(params);
    }
    getAlarmTrendDropList(res) {
        let types = [];
        let deviceDrop = [{ text: '全部', value: 'ALL', isSelected: true }];
        let areasDrop = [];
        let diffAreas = [];
        let AlarmObjectType = this.AlarmObjectType;
        res.data.forEach((item) => {
            if (!diffAreas.filter((area) => area.areaID == item.areaID).length && item.areaID && item.areaName) {
                diffAreas.push(item);
            }
            if (types.indexOf(item.objectType) === -1) {
                types.push(item.objectType);
            }
        });
        types.forEach((type) => {
            let dropM = {};
            dropM.text = AlarmObjectType[type].text;
            dropM.value = type;
            deviceDrop.push(dropM);
        });
        diffAreas.forEach((item) => {
            let areaInfo = {};
            areaInfo.text = item.areaName;
            areaInfo.value = item.areaID;
            areaInfo.color = maintainEnum_1.areaDropList[areasDrop.length].color;
            areasDrop.push(areaInfo);
        });
        return [areasDrop, deviceDrop];
    }
    deviceSort(allData, deviceObj, types, module) {
        let deviceSortObj = {};
        types.forEach((type) => {
            if (!deviceObj || !deviceObj[type]) {
                deviceObj[type] = [];
            }
            deviceSortObj[type] = this.sortTheArrByModule(deviceObj[type], module).slice(0, 10);
        });
        deviceSortObj.ALL = this.sortTheArrByModule(allData, module).slice(0, 10);
        return deviceSortObj;
    }
    sortTheArrByModule(Arr, module) {
        Arr = Arr.sort((a, b) => {
            let n1 = a[module];
            let n2 = b[module];
            if (a && b && typeof n1 == 'number' && typeof n2 == 'number') {
                return b[module] - a[module];
            }
        });
        return Arr;
    }
}
OperationsService.ResourceServerExt = new Operations_1.OperationsServerExt();
exports.OperationsService = OperationsService;
