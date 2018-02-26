define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CasCadeSearchParams = (function () {
        function CasCadeSearchParams() {
        }
        return CasCadeSearchParams;
    }());
    exports.CasCadeSearchParams = CasCadeSearchParams;
    var userInfoResult = (function () {
        function userInfoResult() {
        }
        return userInfoResult;
    }());
    exports.userInfoResult = userInfoResult;
    var intelligentAnalysisRequireParams = (function () {
        function intelligentAnalysisRequireParams() {
        }
        return intelligentAnalysisRequireParams;
    }());
    exports.intelligentAnalysisRequireParams = intelligentAnalysisRequireParams;
    ;
    exports.analysisStatisticsParams = {
        beginDate: "",
        endDate: "",
        moduleNames: "",
        statisticModuleLevel: 3,
    };
    var alarmTrafficReqEnum = (function () {
        function alarmTrafficReqEnum() {
        }
        return alarmTrafficReqEnum;
    }());
    exports.alarmTrafficReqEnum = alarmTrafficReqEnum;
    exports.alarmTrafficReqParams = {
        beginDate: "",
        endDate: "2017-11-16 23:59:59",
        resourceType: "ALL",
        timeType: "Day"
    };
    var analysisStatisticsResult = (function () {
        function analysisStatisticsResult() {
        }
        return analysisStatisticsResult;
    }());
    exports.analysisStatisticsResult = analysisStatisticsResult;
    var echartSuperData = (function () {
        function echartSuperData() {
        }
        return echartSuperData;
    }());
    exports.echartSuperData = echartSuperData;
    var StatisticsOverview = (function () {
        function StatisticsOverview() {
        }
        return StatisticsOverview;
    }());
    exports.StatisticsOverview = StatisticsOverview;
    exports.StatisticsOverviewArr = [
        { title: "FDS_02_02_29", type: "Face", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/item-camera.png" },
        { title: "FDS_02_02_30", type: "WiFi", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/Wi-Fi.png" },
        { title: "FDS_02_02_31", type: "EFENCE", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/electronicfence.png" },
        { title: "FDS_02_02_32", type: "RmpGate", total: 0, online: 0, alarm: 0, imagesPath: "../../../images/maintain/rmpgate.png" }
    ];
    var areaColor = (function () {
        function areaColor() {
        }
        return areaColor;
    }());
    exports.areaColor = areaColor;
    exports.areaDropList = [
        { color: '#6c8ce4' },
        { color: '#7cccf2' },
        { color: '#dcbe99' },
        { color: '#F8F0E9' },
        { color: '#C9C9C9' },
        { color: '#6F6E6E' },
        { color: '#7CCCF2' },
        { color: '#53c68c' },
        { color: '#9ad941' },
        { color: '#fbd15a' },
        { color: '#9cdcee' },
        { color: '#e98371' }
    ];
    function changeTheModuleName(modules, type, modulesEnum) {
        var moduleEnum = Object.keys(modulesEnum);
        modules.forEach(function (module, index) {
            moduleEnum.forEach(function (Enum) {
                if (module[type]) {
                    if (module[type].trim() === Enum) {
                        modules[index][type] = modulesEnum[Enum].name;
                    }
                }
            });
        });
        return modules;
    }
    exports.changeTheModuleName = changeTheModuleName;
    var deviceInfoEnum = (function () {
        function deviceInfoEnum() {
            this.alarm = 0;
            this.flow = 0;
        }
        return deviceInfoEnum;
    }());
    exports.deviceInfoEnum = deviceInfoEnum;
    var topSearchResult = (function () {
        function topSearchResult() {
        }
        return topSearchResult;
    }());
    exports.topSearchResult = topSearchResult;
    var AlarmObjectEnum = (function () {
        function AlarmObjectEnum() {
        }
        return AlarmObjectEnum;
    }());
    exports.AlarmObjectEnum = AlarmObjectEnum;
    exports.AlarmObjectType = {
        ALL: { value: "ALL", text: "全部", alarm: 0, flow: 0 },
        Camera: { value: "Camera", text: "摄像机", alarm: 0, flow: 0 },
        WiFi: { value: "WiFi", text: "Wi-Fi", alarm: 0, flow: 0 },
        RmpGate: { value: "RmpGate", text: "卡口", alarm: 0, flow: 0 },
        EFENCE: { value: "EFENCE", text: "电子围栏", alarm: 0, flow: 0 },
        Face: { value: "Face", text: "人像", alarm: 0, flow: 0 },
        Vehicle: { value: "Vehicle", text: "车辆", alarm: 0, flow: 0 },
        Device: { value: "Device", text: "设备", alarm: 0, flow: 0 },
        LOCATION: { value: "LOCATION", text: "位置", alarm: 0, flow: 0 }
    };
    var dropEnum = (function () {
        function dropEnum() {
            this.isSelected = false;
        }
        return dropEnum;
    }());
    exports.dropEnum = dropEnum;
    var deviceStatisticsEnum = (function () {
        function deviceStatisticsEnum() {
            this.seriesData = [];
            this.yData = [];
        }
        return deviceStatisticsEnum;
    }());
    exports.deviceStatisticsEnum = deviceStatisticsEnum;
    var deviceItemResponseResult = (function () {
        function deviceItemResponseResult() {
        }
        return deviceItemResponseResult;
    }());
    exports.deviceItemResponseResult = deviceItemResponseResult;
    var alarmTrafficTrend = (function () {
        function alarmTrafficTrend() {
        }
        return alarmTrafficTrend;
    }());
    exports.alarmTrafficTrend = alarmTrafficTrend;
    ;
    var alarmTrafficTrendAreaInfo = (function () {
        function alarmTrafficTrendAreaInfo() {
        }
        return alarmTrafficTrendAreaInfo;
    }());
    exports.alarmTrafficTrendAreaInfo = alarmTrafficTrendAreaInfo;
    var alarmTrafficTrendData = (function () {
        function alarmTrafficTrendData() {
        }
        return alarmTrafficTrendData;
    }());
    exports.alarmTrafficTrendData = alarmTrafficTrendData;
    var alarmTrafficTimeFormat = (function () {
        function alarmTrafficTimeFormat() {
        }
        return alarmTrafficTimeFormat;
    }());
    exports.alarmTrafficTimeFormat = alarmTrafficTimeFormat;
    var dataFilterParam = (function () {
        function dataFilterParam() {
        }
        return dataFilterParam;
    }());
    exports.dataFilterParam = dataFilterParam;
    exports.initParam = {
        module: "alarm",
        AreaName: "ALL",
        deviceName: "EFENCE",
        timeType: "month",
    };
    var selectDataEnum = (function () {
        function selectDataEnum() {
        }
        return selectDataEnum;
    }());
    exports.selectDataEnum = selectDataEnum;
    exports.SelectData = [
        { value: 'ALL', text: "全部" },
        { value: 'Day', text: "近一天" },
        { value: 'Week', text: "近一周" },
        { value: 'Month', text: "近一月" },
        { value: 'Year', text: "近一年" },
        { value: 'Custom', text: "自定义" }
    ];
    var echartEnum = (function () {
        function echartEnum() {
        }
        return echartEnum;
    }());
    exports.echartEnum = echartEnum;
    var AlarmSuperData = (function () {
        function AlarmSuperData() {
            this.dispatchedAboutAlarm = {
                seriesData: MockNumber(100, 10, 4),
                yData: ['车辆黑名单', '在逃库', '涉毒库', '涉稳库', '沉迷游戏库', '杀人库', '抢劫库', 'MAC黑名单', '涉黑库', '涉黄库'],
                legendData: ['有效', '无效', '待定', '未处理']
            };
        }
        return AlarmSuperData;
    }());
    exports.AlarmSuperData = AlarmSuperData;
    ;
    var FlowSuperData = (function () {
        function FlowSuperData() {
        }
        return FlowSuperData;
    }());
    exports.FlowSuperData = FlowSuperData;
    ;
    function MockNumber(x, y, z) {
        function Arr(x, y) {
            var result = [];
            for (var i = 0; i < y; i++) {
                var MockNum = Math.round(Math.random() * x);
                result.push(MockNum);
            }
            return result;
        }
        if (!z) {
            return Arr(x, y);
        }
        else {
            var MockArr = [];
            for (var i = 0; i < z; i++) {
                MockArr.push(Arr(x, y));
            }
            return MockArr;
        }
    }
    exports.MockNumber = MockNumber;
    var AlarmResultEnum = (function () {
        function AlarmResultEnum() {
        }
        return AlarmResultEnum;
    }());
    exports.AlarmResultEnum = AlarmResultEnum;
    ;
    var AreaInfo = (function () {
        function AreaInfo() {
            this.Name = "";
            this.ID = "";
        }
        return AreaInfo;
    }());
    exports.AreaInfo = AreaInfo;
    ;
    exports.AlarmStatusType = {
        Unknow: { value: "Unknow", text: "未知" },
        Valid: { value: "Valid", text: "有效" },
        Invalid: { value: "Invalid", text: "无效" },
        Indeterminate: { value: "Indeterminate", text: "待定" },
        Undisposed: { value: "Undisposed", text: "未处理" }
    };
    var dispatchedResult = (function () {
        function dispatchedResult() {
        }
        return dispatchedResult;
    }());
    exports.dispatchedResult = dispatchedResult;
    var devicestausbarEnum = (function () {
        function devicestausbarEnum() {
        }
        return devicestausbarEnum;
    }());
    exports.devicestausbarEnum = devicestausbarEnum;
    var statisticalAnalysisModuleName = (function () {
        function statisticalAnalysisModuleName() {
        }
        statisticalAnalysisModuleName.taskStatistics = "taskStatistics";
        statisticalAnalysisModuleName.alarmStatistics = "alarmStatistics";
        statisticalAnalysisModuleName.trafficStatistics = "trafficStatistics";
        statisticalAnalysisModuleName.retrievalStatistics = "retrievalStatistics";
        statisticalAnalysisModuleName.analysissTatistics = "analysissTatistics";
        return statisticalAnalysisModuleName;
    }());
    exports.statisticalAnalysisModuleName = statisticalAnalysisModuleName;
    var taskStatisticsModuleName = (function () {
        function taskStatisticsModuleName() {
        }
        taskStatisticsModuleName.areaTaskStatistics = "areaTaskStatistics";
        taskStatisticsModuleName.areaDispatchedTaskStatistics = "areaDispatchedTaskStatistics";
        taskStatisticsModuleName.dispatchedAboutTaskStatistics = "dispatchedAboutTaskStatistics";
        return taskStatisticsModuleName;
    }());
    exports.taskStatisticsModuleName = taskStatisticsModuleName;
    var AlarmStatisticsModuleName = (function () {
        function AlarmStatisticsModuleName() {
        }
        AlarmStatisticsModuleName.areaAlarm = "areaAlarm";
        AlarmStatisticsModuleName.areaAlarmTrend = "areaAlarmTrend";
        AlarmStatisticsModuleName.deviceAlarmStatistics = "deviceAlarmStatistics";
        AlarmStatisticsModuleName.dispatchedAboutAlarm = "dispatchedAboutAlarm";
        return AlarmStatisticsModuleName;
    }());
    exports.AlarmStatisticsModuleName = AlarmStatisticsModuleName;
    var TrafficStatisticsModuleName = (function () {
        function TrafficStatisticsModuleName() {
        }
        TrafficStatisticsModuleName.areaTrafficStatistics = "areaTrafficStatistics";
        TrafficStatisticsModuleName.areaTrafficTrend = "areaTrafficTrend";
        TrafficStatisticsModuleName.deviceTrafficStatistics = "deviceTrafficStatistics";
        return TrafficStatisticsModuleName;
    }());
    exports.TrafficStatisticsModuleName = TrafficStatisticsModuleName;
    var RetrievalStatisticModuleName = (function () {
        function RetrievalStatisticModuleName() {
        }
        RetrievalStatisticModuleName.retrievalStatistic = "retrievalStatistic";
        RetrievalStatisticModuleName.retrievalTrafficTrend = "retrievalTrafficTrend";
        RetrievalStatisticModuleName.rankStatistics = "rankStatistics";
        return RetrievalStatisticModuleName;
    }());
    exports.RetrievalStatisticModuleName = RetrievalStatisticModuleName;
    var analysisStatisticModuleNames = (function () {
        function analysisStatisticModuleNames() {
        }
        analysisStatisticModuleNames.IntelligentAnalysis_Vehicle = "IntelligentAnalysis_Vehicle";
        analysisStatisticModuleNames.IntelligentAnalysis_Face = "IntelligentAnalysis_Face";
        analysisStatisticModuleNames.IntelligentAnalysis_Mac = "IntelligentAnalysis_Mac";
        analysisStatisticModuleNames.IntelligentAnalysis_Crash = "IntelligentAnalysis_Crash";
        return analysisStatisticModuleNames;
    }());
    exports.analysisStatisticModuleNames = analysisStatisticModuleNames;
    var RetrievalStatisticParamModuleNames = (function () {
        function RetrievalStatisticParamModuleNames() {
        }
        RetrievalStatisticParamModuleNames.ResourceRetrieval_FullSearch = "ResourceRetrieval_FullSearch";
        RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_Vehicle = "ResourceRetrieval_AdvanceSearch_Vehicle";
        RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_Face = "ResourceRetrieval_AdvanceSearch_Face";
        RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_WiFi = "ResourceRetrieval_AdvanceSearch_WiFi";
        RetrievalStatisticParamModuleNames.ResourceRetrieval_AdvanceSearch_EFence = "ResourceRetrieval_AdvanceSearch_EFence";
        return RetrievalStatisticParamModuleNames;
    }());
    exports.RetrievalStatisticParamModuleNames = RetrievalStatisticParamModuleNames;
    exports.echartNameArr = {
        taskStatistics: "任务统计",
        alarmStatistics: "报警统计",
        trafficStatistics: "流量统计",
        retrievalStatistics: "统计检索",
        analysissTatistics: "分析统计",
        areaTaskStatistics: "区域结构化任务统计",
        areaDispatchedTaskStatistics: "区域布控任务统计",
        dispatchedAboutTaskStatistics: "布控库关联任务统计",
        areaAlarm: "区域报警数",
        areaAlarmTrend: "区域报警趋势",
        deviceAlarmStatistics: "设备报警统计(TOP10)",
        dispatchedAboutAlarm: "布控库关联报警统计(TOP10)",
        areaTrafficStatistics: "区域流量统计",
        areaTrafficTrend: "区域流量趋势",
        deviceTrafficStatistics: "设备流量统计(TOP10)",
        retrievalStatistic: "检索统计",
        retrievalTrafficTrend: "检索趋势统计",
        rankStatistics: "高频检索关键字排行",
        IntelligentAnalysis_Vehicle: "车辆分析统计",
        IntelligentAnalysis_Face: "人员分析统计",
        IntelligentAnalysis_Mac: "感知数据分析统计",
        IntelligentAnalysis_Crash: "多元碰撞分析统计"
    };
    var intelligentAnalysisDataEnum = (function () {
        function intelligentAnalysisDataEnum() {
        }
        return intelligentAnalysisDataEnum;
    }());
    exports.intelligentAnalysisDataEnum = intelligentAnalysisDataEnum;
    exports.intelligentAnalysisData = {
        areaTaskStatistics: "areaTaskStatistics",
        areaDispatchedTaskStatistics: "areaDispatchedTaskStatistics",
        dispatchedAboutTaskStatistics: "dispatchedAboutTaskStatistics",
        areaAlarm: "areaAlarm",
        areaAlarmTrend: "areaAlarmTrend",
        deviceAlarmStatistics: "deviceAlarmStatistics",
        dispatchedAboutAlarm: "dispatchedAboutAlarm",
        areaTrafficStatistics: "areaTrafficStatistics",
        areaTrafficTrend: "areaTrafficTrend",
        deviceTrafficStatistics: "deviceTrafficStatistics",
        Maintain_StatisOverview_Retrival: "retrievalStatistic",
        Maintain_StatisOverview_Retrival_Trend: "retrievalTrafficTrend",
        Maintain_StatisOverview_Retrival_Rank: "rankStatistics",
        IntelligentAnalysis_Vehicle: "IntelligentAnalysis_Vehicle",
        IntelligentAnalysis_Face: "IntelligentAnalysis_Face",
        IntelligentAnalysis_Mac: "IntelligentAnalysis_Mac",
        IntelligentAnalysis_Crash: "IntelligentAnalysis_Crash",
        AllRankList: "AllRankList",
    };
    var ExcelTableEnum = (function () {
        function ExcelTableEnum() {
        }
        return ExcelTableEnum;
    }());
    exports.ExcelTableEnum = ExcelTableEnum;
    var exportExcelParamEnum = (function () {
        function exportExcelParamEnum() {
        }
        return exportExcelParamEnum;
    }());
    exports.exportExcelParamEnum = exportExcelParamEnum;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9tYWludGFpbkVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQ0E7UUFBQTtRQVFBLENBQUM7UUFBRCwwQkFBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksa0RBQW1CO0lBVWhDO1FBQUE7UUFRQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLHdDQUFjO0lBVzNCO1FBQUE7UUFNQSxDQUFDO1FBQUQsdUNBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLDRFQUFnQztJQU01QyxDQUFDO0lBRVcsUUFBQSx3QkFBd0IsR0FBcUM7UUFDdEUsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUUsRUFBRTtRQUNYLFdBQVcsRUFBRSxFQUFFO1FBQ2Ysb0JBQW9CLEVBQUUsQ0FBQztLQUMxQixDQUFDO0lBRUY7UUFBQTtRQVNBLENBQUM7UUFBRCwwQkFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksa0RBQW1CO0lBV25CLFFBQUEscUJBQXFCLEdBQVE7UUFDdEMsU0FBUyxFQUFFLEVBQUU7UUFDYixPQUFPLEVBQUUscUJBQXFCO1FBQzlCLFlBQVksRUFBRSxLQUFLO1FBQ25CLFFBQVEsRUFBRSxLQUFLO0tBQ2xCLENBQUM7SUFHRjtRQUFBO1FBSUEsQ0FBQztRQUFELCtCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw0REFBd0I7SUFNckM7UUFBQTtRQUtBLENBQUM7UUFBRCxzQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksMENBQWU7SUFRNUI7UUFBQTtRQU9BLENBQUM7UUFBRCx5QkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksZ0RBQWtCO0lBU2xCLFFBQUEscUJBQXFCLEdBQThCO1FBQzVELEVBQUUsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUs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QUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQzNELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDekQsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUM1RCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQzVELElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDdEQsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUM1RCxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQzFELFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUU7S0FDakUsQ0FBQztJQUVGO1FBQUE7WUFJSSxlQUFVLEdBQVksS0FBSyxDQUFBO1FBQy9CLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSw0QkFBUTtJQU9yQjtRQUFBO1lBQ0ks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UTtRQUMvQixjQUFjLEVBQUUsV0FBVztRQUUzQiwyQkFBMkIsRUFBRSxRQUFRO1FBQ3JDLHdCQUF3QixFQUFFLFFBQVE7UUFDbEMsdUJBQXVCLEVBQUUsVUFBVTtRQUNuQyx5QkFBeUIsRUFBRSxVQUFVO0tBQ3hDLENBQUE7SUFFRDtRQUFBO1FBeUJBLENBQUM7UUFBRCxrQ0FBQztJQUFELENBekJBLEFBeUJDLElBQUE7SUF6Qlksa0VBQTJCO0lBMkIzQixRQUFBLHVCQUF1QixHQUFnQztRQUVoRSxrQkFBa0IsRUFBRSxvQkFBb0I7UUFDeEMsNEJBQTRCLEVBQUUsOEJBQThCO1FBQzVELDZCQUE2QixFQUFFLCtCQUErQjtRQUU5RCxTQUFTLEVBQUUsV0FBVztRQUN0QixjQUFjLEVBQUUsZ0JBQWdCO1FBQ2hDLHFCQUFxQixFQUFFLHVCQUF1QjtRQUM5QyxvQkFBb0IsRUFBRSxzQkFBc0I7UUFFNUMscUJBQXFCLEVBQUUsdUJBQXVCO1FBQzlDLGdCQUFnQixFQUFFLGtCQUFrQjtRQUNwQyx1QkFBdUIsRUFBRSx5QkFBeUI7UUFFbEQsZ0NBQWdDLEVBQUUsb0JBQW9CO1FBQ3RELHNDQUFzQyxFQUFFLHVCQUF1QjtRQUMvRCxxQ0FBcUMsRUFBRSxnQkFBZ0I7UUFFdkQsMkJBQTJCLEVBQUUsNkJBQTZCO1FBQzFELHdCQUF3QixFQUFFLDBCQUEwQjtRQUNwRCx1QkFBdUIsRUFBRSx5QkFBeUI7UUFDbEQseUJBQXlCLEVBQUUsMkJBQTJCO1FBRXRELFdBQVcsRUFBRSxhQUFhO0tBQzdCLENBQUM7SUFFRjtRQUFBO1FBSUEsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSx3Q0FBYztJQU0zQjtRQUFBO1FBR0EsQ0FBQztRQUFELDJCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxvREFBb0IiLCJmaWxlIjoiY29yZS9lbnRpdHkvbWFpbnRhaW5FbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy/nlKjmiLfnirbmgIFcclxuZXhwb3J0IGNsYXNzIENhc0NhZGVTZWFyY2hQYXJhbXMge1xyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcbiAgICBhcmVhTmFtZTogc3RyaW5nO1xyXG4gICAgdXNlck5hbWU6IHN0cmluZztcclxuICAgIG9yZGVyVHlwZTogc3RyaW5nO1xyXG4gICAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyB1c2VySW5mb1Jlc3VsdCB7XHJcbiAgICB1c2VyTmFtZTogc3RyaW5nO1xyXG4gICAgYXJlYU5hbWU6IHN0cmluZztcclxuICAgIHVuaXQ6IHN0cmluZztcclxuICAgIHJvbGU6IHN0cmluZztcclxuICAgIElQOiBzdHJpbmc7XHJcbiAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICBtb2R1bGU6IG51bWJlcjtcclxufVxyXG5cclxuLy8g5Zu+6KGoXHJcbmV4cG9ydCBjbGFzcyBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcyB7XHJcbiAgICBiZWdpbkRhdGU6IHN0cmluZztcclxuICAgIGVuZERhdGU6IHN0cmluZztcclxuICAgIG1vZHVsZU5hbWVzOiBzdHJpbmc7XHJcbiAgICBzdGF0aXN0aWNNb2R1bGVMZXZlbDogbnVtYmVyO1xyXG4gICAgdGltZVR5cGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYW5hbHlzaXNTdGF0aXN0aWNzUGFyYW1zOiBpbnRlbGxpZ2VudEFuYWx5c2lzUmVxdWlyZVBhcmFtcyA9IHtcclxuICAgIGJlZ2luRGF0ZTogXCJcIixcclxuICAgIGVuZERhdGU6IFwiXCIsXHJcbiAgICBtb2R1bGVOYW1lczogXCJcIixcclxuICAgIHN0YXRpc3RpY01vZHVsZUxldmVsOiAzLFxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIGFsYXJtVHJhZmZpY1JlcUVudW0ge1xyXG4gICAgQXJlYU5hbWU/OiBzdHJpbmc7XHJcbiAgICBtb2R1bGU/OiBzdHJpbmc7XHJcbiAgICBncm91cFR5cGU/OiBzdHJpbmc7XHJcblxyXG4gICAgYmVnaW5EYXRlOiBzdHJpbmc7XHJcbiAgICBlbmREYXRlOiBzdHJpbmc7XHJcbiAgICByZXNvdXJjZVR5cGU/OiBzdHJpbmc7XHJcbiAgICB0aW1lVHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYWxhcm1UcmFmZmljUmVxUGFyYW1zOiBhbnkgPSB7XHJcbiAgICBiZWdpbkRhdGU6IFwiXCIsXHJcbiAgICBlbmREYXRlOiBcIjIwMTctMTEtMTYgMjM6NTk6NTlcIixcclxuICAgIHJlc291cmNlVHlwZTogXCJBTExcIixcclxuICAgIHRpbWVUeXBlOiBcIkRheVwiXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIGFuYWx5c2lzU3RhdGlzdGljc1Jlc3VsdCB7XHJcbiAgICBudW06IHN0cmluZztcclxuICAgIHRpbWVJdGVtOiBzdHJpbmc7XHJcbiAgICBmdW5jdGlvblR5cGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGVjaGFydFN1cGVyRGF0YSB7XHJcbiAgICBzZXJpZXNEYXRhPzogQXJyYXk8YW55PjtcclxuICAgIHhEYXRhPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIHlEYXRhPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIGxlZ2VuZERhdGE/OiBBcnJheTxzdHJpbmc+XHJcbn1cclxuXHJcbi8vIOe7n+iuoeWIhuaekFxyXG5leHBvcnQgY2xhc3MgU3RhdGlzdGljc092ZXJ2aWV3IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICB0b3RhbDogbnVtYmVyO1xyXG4gICAgb25saW5lOiBudW1iZXI7XHJcbiAgICBhbGFybTogbnVtYmVyO1xyXG4gICAgaW1hZ2VzUGF0aDogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU3RhdGlzdGljc092ZXJ2aWV3QXJyOiBBcnJheTxTdGF0aXN0aWNzT3ZlcnZpZXc+ID0gW1xyXG4gICAgeyB0aXRsZTogXCJGRFNfMDJfMDJfMjlcIiwgdHlwZTogXCJGYWNlXCIsIHRvdGFsOiAwLCBvbmxpbmU6IDAsIGFsYXJtOiAwLCBpbWFnZXNQYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9tYWludGFpbi9pdGVtLWNhbWVyYS5wbmdcIiB9LFxyXG4gICAgeyB0aXRsZTogXCJGRFNfMDJfMDJfMzBcIiwgdHlwZTogXCJXaUZpXCIsIHRvdGFsOiAwLCBvbmxpbmU6IDAsIGFsYXJtOiAwLCBpbWFnZXNQYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9tYWludGFpbi9XaS1GaS5wbmdcIiB9LFxyXG4gICAgeyB0aXRsZTogXCJGRFNfMDJfMDJfMzFcIiwgdHlwZTogXCJFRkVOQ0VcIiwgdG90YWw6IDAsIG9ubGluZTogMCwgYWxhcm06IDAsIGltYWdlc1BhdGg6IFwiLi4vLi4vLi4vaW1hZ2VzL21haW50YWluL2VsZWN0cm9uaWNmZW5jZS5wbmdcIiB9LFxyXG4gICAgeyB0aXRsZTogXCJGRFNfMDJfMDJfMzJcIiwgdHlwZTogXCJSbXBHYXRlXCIsIHRvdGFsOiAwLCBvbmxpbmU6IDAsIGFsYXJtOiAwLCBpbWFnZXNQYXRoOiBcIi4uLy4uLy4uL2ltYWdlcy9tYWludGFpbi9ybXBnYXRlLnBuZ1wiIH1cclxuXTtcclxuXHJcbi8v5oql6K2m57uf6K6hXHJcbmV4cG9ydCBjbGFzcyBhcmVhQ29sb3Ige1xyXG4gICAgY29sb3I6IHN0cmluZztcclxufVxyXG5cclxuLy8gZXhwb3J0IGNvbnN0IGFyZWFEcm9wTGlzdDogQXJyYXk8YXJlYUNvbG9yPiA9IFtcclxuLy8gICAgIHsgdGV4dDogJ+atpuaYjOWMuicsIHZhbHVlOiAnYWFhJywgY29sb3I6ICcjNmM4Y2U0Jywgc2VsZWN0ZWQ6IGZhbHNlIH0sXHJcbi8vICAgICB7IHRleHQ6ICfmsZ/lsrjljLonLCB2YWx1ZTogJ2JiYicsIGNvbG9yOiAnIzdjY2NmMicsIHNlbGVjdGVkOiBmYWxzZSB9LFxyXG4vLyAgICAgeyB0ZXh0OiAn5rGf5rGJ5Yy6JywgdmFsdWU6ICdjY2MnLCBjb2xvcjogJyNkY2JlOTknLCBzZWxlY3RlZDogZmFsc2UgfSxcclxuLy8gICAgIHsgdGV4dDogJ+ehmuWPo+WMuicsIHZhbHVlOiAnZGRkJywgY29sb3I6ICcjRjhGMEU5Jywgc2VsZWN0ZWQ6IGZhbHNlIH0sXHJcbi8vICAgICB7IHRleHQ6ICfmsYnpmLPljLonLCB2YWx1ZTogJ2VlZScsIGNvbG9yOiAnI0M5QzlDOScsIHNlbGVjdGVkOiBmYWxzZSB9LFxyXG4vLyAgICAgeyB0ZXh0OiAn6Z2S5bGx5Yy6JywgdmFsdWU6ICdmZmYnLCBjb2xvcjogJyM2RjZFNkUnLCBzZWxlY3RlZDogZmFsc2UgfSxcclxuLy8gICAgIHsgdGV4dDogJ+a0quWxseWMuicsIHZhbHVlOiAnZ2dnJywgY29sb3I6ICcjN0NDQ0YyJywgc2VsZWN0ZWQ6IGZhbHNlIH0sXHJcbi8vICAgICB7IHRleHQ6ICfolKHnlLjljLonLCB2YWx1ZTogJ2hoaCcsIGNvbG9yOiAnIzUzYzY4YycsIHNlbGVjdGVkOiBmYWxzZSB9LFxyXG4vLyAgICAgeyB0ZXh0OiAn5rGf5aSP5Yy6JywgdmFsdWU6ICdpaWknLCBjb2xvcjogJyM5YWQ5NDEnLCBzZWxlY3RlZDogZmFsc2UgfSxcclxuLy8gICAgIHsgdGV4dDogJ+m7hOmZguWMuicsIHZhbHVlOiAnampqJywgY29sb3I6ICcjZmJkMTVhJywgc2VsZWN0ZWQ6IGZhbHNlIH0sXHJcbi8vICAgICB7IHRleHQ6ICfmlrDmtLLljLonLCB2YWx1ZTogJ2traycsIGNvbG9yOiAnIzljZGNlZScsIHNlbGVjdGVkOiBmYWxzZSB9LFxyXG4vLyAgICAgeyB0ZXh0OiAn5Lic6KW/5rmW5Yy6JywgdmFsdWU6ICdsbGwnLCBjb2xvcjogJyNlOTgzNzEnLCBzZWxlY3RlZDogZmFsc2UgfVxyXG4vLyBdO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFyZWFEcm9wTGlzdDogQXJyYXk8YXJlYUNvbG9yPiA9IFtcclxuICAgIHsgY29sb3I6ICcjNmM4Y2U0JyB9LFxyXG4gICAgeyBjb2xvcjogJyM3Y2NjZjInIH0sXHJcbiAgICB7IGNvbG9yOiAnI2RjYmU5OScgfSxcclxuICAgIHsgY29sb3I6ICcjRjhGMEU5JyB9LFxyXG4gICAgeyBjb2xvcjogJyNDOUM5QzknIH0sXHJcbiAgICB7IGNvbG9yOiAnIzZGNkU2RScgfSxcclxuICAgIHsgY29sb3I6ICcjN0NDQ0YyJyB9LFxyXG4gICAgeyBjb2xvcjogJyM1M2M2OGMnIH0sXHJcbiAgICB7IGNvbG9yOiAnIzlhZDk0MScgfSxcclxuICAgIHsgY29sb3I6ICcjZmJkMTVhJyB9LFxyXG4gICAgeyBjb2xvcjogJyM5Y2RjZWUnIH0sXHJcbiAgICB7IGNvbG9yOiAnI2U5ODM3MScgfVxyXG5dO1xyXG4vKipcclxuICpcclxuICogQHBhcmFtIG1vZHVsZXMg6ZyA6KaB6L2s5o2i5qih5Z2X5ZCN5Li65Lit5paH5ZCN55qE5qih5Z2XXHJcbiAqIEBwYXJhbSB0eXBlIOaooeWdl+WGheaooeWdl+WQjeeahGtleVxyXG4gKiBAcGFyYW0gbW9kdWxlc0VudW0g5p6a5Li+5a+56LGhXHJcbiAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVRoZU1vZHVsZU5hbWUobW9kdWxlczogQXJyYXk8YW55PiwgdHlwZTogc3RyaW5nLCBtb2R1bGVzRW51bTogYW55KSB7XHJcbiAgICBsZXQgbW9kdWxlRW51bSA9IE9iamVjdC5rZXlzKG1vZHVsZXNFbnVtKTtcclxuICAgIG1vZHVsZXMuZm9yRWFjaCgobW9kdWxlOiBhbnksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgbW9kdWxlRW51bS5mb3JFYWNoKChFbnVtOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1vZHVsZVt0eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZVt0eXBlXS50cmltKCkgPT09IEVudW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBtb2R1bGVzW2luZGV4XVt0eXBlXSA9IG1vZHVsZXNFbnVtW0VudW1dLm5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbW9kdWxlc1xyXG59XHJcblxyXG4vL+WFrOWFseaemuS4vlxyXG5leHBvcnQgY2xhc3MgZGV2aWNlSW5mb0VudW0ge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGFsYXJtOiBudW1iZXIgPSAwO1xyXG4gICAgZmxvdzogbnVtYmVyID0gMDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIHRvcFNlYXJjaFJlc3VsdCB7XHJcbiAgICBudW06IG51bWJlcjtcclxuICAgIG9iamVjdFR5cGU6IHN0cmluZztcclxuICAgIHN0YXRpc3RpY3NJdGVtOiBzdHJpbmc7XHJcbiAgICB0aW1lSXRlbTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEFsYXJtT2JqZWN0RW51bSB7XHJcbiAgICBDYW1lcmE6IGRldmljZUluZm9FbnVtO1xyXG4gICAgV2lGaTogZGV2aWNlSW5mb0VudW07XHJcbiAgICBSbXBHYXRlOiBkZXZpY2VJbmZvRW51bTtcclxuICAgIEVGRU5DRTogZGV2aWNlSW5mb0VudW07XHJcbiAgICBGYWNlOiBkZXZpY2VJbmZvRW51bTtcclxuICAgIFZlaGljbGU6IGRldmljZUluZm9FbnVtO1xyXG4gICAgRGV2aWNlOiBkZXZpY2VJbmZvRW51bTtcclxuICAgIExPQ0FUSU9OOiBkZXZpY2VJbmZvRW51bTtcclxuICAgIEFMTDogZGV2aWNlSW5mb0VudW07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBbGFybU9iamVjdFR5cGU6IEFsYXJtT2JqZWN0RW51bSA9IHtcclxuICAgIEFMTDogeyB2YWx1ZTogXCJBTExcIiwgdGV4dDogXCLlhajpg6hcIiwgYWxhcm06IDAsIGZsb3c6IDAgfSxcclxuICAgIENhbWVyYTogeyB2YWx1ZTogXCJDYW1lcmFcIiwgdGV4dDogXCLmkYTlg4/mnLpcIiwgYWxhcm06IDAsIGZsb3c6IDAgfSxcclxuICAgIFdpRmk6IHsgdmFsdWU6IFwiV2lGaVwiLCB0ZXh0OiBcIldpLUZpXCIsIGFsYXJtOiAwLCBmbG93OiAwIH0sXHJcbiAgICBSbXBHYXRlOiB7IHZhbHVlOiBcIlJtcEdhdGVcIiwgdGV4dDogXCLljaHlj6NcIiwgYWxhcm06IDAsIGZsb3c6IDAgfSxcclxuICAgIEVGRU5DRTogeyB2YWx1ZTogXCJFRkVOQ0VcIiwgdGV4dDogXCLnlLXlrZDlm7TmoI9cIiwgYWxhcm06IDAsIGZsb3c6IDAgfSxcclxuICAgIEZhY2U6IHsgdmFsdWU6IFwiRmFjZVwiLCB0ZXh0OiBcIuS6uuWDj1wiLCBhbGFybTogMCwgZmxvdzogMCB9LFxyXG4gICAgVmVoaWNsZTogeyB2YWx1ZTogXCJWZWhpY2xlXCIsIHRleHQ6IFwi6L2m6L6GXCIsIGFsYXJtOiAwLCBmbG93OiAwIH0sXHJcbiAgICBEZXZpY2U6IHsgdmFsdWU6IFwiRGV2aWNlXCIsIHRleHQ6IFwi6K6+5aSHXCIsIGFsYXJtOiAwLCBmbG93OiAwIH0sXHJcbiAgICBMT0NBVElPTjogeyB2YWx1ZTogXCJMT0NBVElPTlwiLCB0ZXh0OiBcIuS9jee9rlwiLCBhbGFybTogMCwgZmxvdzogMCB9XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgZHJvcEVudW0ge1xyXG4gICAgdmFsdWU/OiBzdHJpbmc7XHJcbiAgICBjb2xvcj86IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZztcclxuICAgIGlzU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGV2aWNlU3RhdGlzdGljc0VudW0ge1xyXG4gICAgc2VyaWVzRGF0YTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgeURhdGE6IEFycmF5PHN0cmluZz4gPSBbXTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBkZXZpY2VJdGVtUmVzcG9uc2VSZXN1bHQge1xyXG4gICAgYWxhcm06IG51bWJlcjtcclxuICAgIGRldmljZUlEOiBzdHJpbmc7XHJcbiAgICBmbG93OiBudW1iZXI7XHJcbiAgICBsYXRpdHVkZTogbnVtYmVyO1xyXG4gICAgbG9uZ2l0dWRlOiBudW1iZXI7XHJcbiAgICBvYmplY3RUeXBlOiBzdHJpbmc7XHJcbiAgICB0aW1lSXRlbTogc3RyaW5nO1xyXG59XHJcblxyXG4vL+aKpeitpua1gemHj+i2i+WKv1xyXG5leHBvcnQgY2xhc3MgYWxhcm1UcmFmZmljVHJlbmQge1xyXG4gICAgYXJlYUluZm86IEFycmF5PGFsYXJtVHJhZmZpY1RyZW5kQXJlYUluZm8+O1xyXG4gICAgdHJlbmRTdGF0aXN0aWNzOiBBcnJheTxhbGFybVRyYWZmaWNUcmVuZERhdGE+O1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIGFsYXJtVHJhZmZpY1RyZW5kQXJlYUluZm8ge1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgSUQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGFsYXJtVHJhZmZpY1RyZW5kRGF0YSB7XHJcbiAgICBhbGFybTogbnVtYmVyO1xyXG4gICAgYXJlYUlEOiBzdHJpbmc7XHJcbiAgICBhcmVhTmFtZTogc3RyaW5nO1xyXG4gICAgZmxvdzogbnVtYmVyO1xyXG4gICAgb2JqZWN0VHlwZTogc3RyaW5nO1xyXG4gICAgdGltZUl0ZW06IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGFsYXJtVHJhZmZpY1RpbWVGb3JtYXQge1xyXG4gICAgdGltZUl0ZW06IHN0cmluZztcclxuICAgIEFsYXJtTm06IG51bWJlcjtcclxuICAgIEZsb3dObTogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGF0YUZpbHRlclBhcmFtIHtcclxuICAgIG1vZHVsZTogc3RyaW5nO1xyXG4gICAgQXJlYU5hbWU6IHN0cmluZztcclxuICAgIGRldmljZU5hbWU6IHN0cmluZztcclxuICAgIHRpbWVUeXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpbml0UGFyYW06IGRhdGFGaWx0ZXJQYXJhbSA9IHtcclxuICAgIG1vZHVsZTogXCJhbGFybVwiLFxyXG4gICAgQXJlYU5hbWU6IFwiQUxMXCIsXHJcbiAgICBkZXZpY2VOYW1lOiBcIkVGRU5DRVwiLFxyXG4gICAgdGltZVR5cGU6IFwibW9udGhcIixcclxufTtcclxuXHJcblxyXG4vLyDml7bpl7Tmjqfku7ZcclxuZXhwb3J0IGNsYXNzIHNlbGVjdERhdGFFbnVtIHtcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICB0ZXh0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBTZWxlY3REYXRhID0gW1xyXG4gICAgeyB2YWx1ZTogJ0FMTCcsIHRleHQ6IFwi5YWo6YOoXCIgfSxcclxuICAgIHsgdmFsdWU6ICdEYXknLCB0ZXh0OiBcIui/keS4gOWkqVwiIH0sXHJcbiAgICB7IHZhbHVlOiAnV2VlaycsIHRleHQ6IFwi6L+R5LiA5ZGoXCIgfSxcclxuICAgIHsgdmFsdWU6ICdNb250aCcsIHRleHQ6IFwi6L+R5LiA5pyIXCIgfSxcclxuICAgIHsgdmFsdWU6ICdZZWFyJywgdGV4dDogXCLov5HkuIDlubRcIiB9LFxyXG4gICAgeyB2YWx1ZTogJ0N1c3RvbScsIHRleHQ6IFwi6Ieq5a6a5LmJXCIgfVxyXG5dIGFzIEFycmF5PHNlbGVjdERhdGFFbnVtPjtcclxuXHJcbi8vIGVjaGFydOagvOW8j1xyXG5leHBvcnQgY2xhc3MgZWNoYXJ0RW51bSB7XHJcbiAgICBzZXJpZXNEYXRhOiBBcnJheTxBcnJheTxudW1iZXI+PiB8IEFycmF5PG51bWJlcj47XHJcbiAgICB4RGF0YT86IEFycmF5PHN0cmluZz47XHJcbiAgICBsZWdlbmREYXRhPzogQXJyYXk8c3RyaW5nPjtcclxuICAgIHlEYXRhPzogQXJyYXk8c3RyaW5nPjtcclxufVxyXG5cclxuLy8g5oql6K2m57uf6K6hXHJcbmV4cG9ydCBjbGFzcyBBbGFybVN1cGVyRGF0YSB7XHJcbiAgICBkcm9wTGlzdEFyZWE6IEFycmF5PHN0cmluZz47XHJcbiAgICBkcm9wTGlzdFR5cGU6IEFycmF5PHN0cmluZz47XHJcbiAgICBhcmVhQWxhcm06IGVjaGFydEVudW07XHJcbiAgICBhcmVhQWxhcm1UcmVuZDogZWNoYXJ0RW51bTtcclxuICAgIGRldmljZUFsYXJtU3RhdGlzdGljczogZWNoYXJ0RW51bTtcclxuICAgIGRpc3BhdGNoZWRBYm91dEFsYXJtOiBlY2hhcnRFbnVtID0ge1xyXG4gICAgICAgIHNlcmllc0RhdGE6IE1vY2tOdW1iZXIoMTAwLCAxMCwgNCksXHJcbiAgICAgICAgeURhdGE6IFsn6L2m6L6G6buR5ZCN5Y2VJywgJ+WcqOmAg+W6kycsICfmtonmr5LlupMnLCAn5raJ56iz5bqTJywgJ+ayiei/t+a4uOaIj+W6kycsICfmnYDkurrlupMnLCAn5oqi5Yqr5bqTJywgJ01BQ+m7keWQjeWNlScsICfmtonpu5HlupMnLCAn5raJ6buE5bqTJ10sXHJcbiAgICAgICAgbGVnZW5kRGF0YTogWyfmnInmlYgnLCAn5peg5pWIJywgJ+W+heWumicsICfmnKrlpITnkIYnXVxyXG4gICAgfTtcclxufTtcclxuXHJcbi8vIOa1gemHj+e7n+iuoVxyXG5leHBvcnQgY2xhc3MgRmxvd1N1cGVyRGF0YSB7XHJcbiAgICBkcm9wTGlzdEFyZWE6IEFycmF5PHN0cmluZz47XHJcbiAgICBkcm9wTGlzdFR5cGU6IEFycmF5PHN0cmluZz47XHJcbiAgICBhcmVhVHJhZmZpY1N0YXRpc3RpY3M6IGVjaGFydEVudW07XHJcbiAgICBhcmVhVHJhZmZpY1RyZW5kOiBlY2hhcnRFbnVtO1xyXG4gICAgZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3M6IGVjaGFydEVudW07XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja051bWJlcih4OiBudW1iZXIsIHk6IG51bWJlciwgej86IG51bWJlcikge1xyXG4gICAgZnVuY3Rpb24gQXJyKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBNb2NrTnVtOiBudW1iZXIgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiB4KTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goTW9ja051bSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfVxyXG4gICAgaWYgKCF6KSB7XHJcbiAgICAgICAgcmV0dXJuIEFycih4LCB5KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgTW9ja0FycjogQXJyYXk8QXJyYXk8bnVtYmVyPj4gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHo7IGkrKykge1xyXG4gICAgICAgICAgICBNb2NrQXJyLnB1c2goQXJyKHgsIHkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIE1vY2tBcnJcclxuICAgIH1cclxufVxyXG5cclxuLy8gTk9ERVxyXG5leHBvcnQgY2xhc3MgQWxhcm1SZXN1bHRFbnVtIHtcclxuICAgIGFsYXJtOiBudW1iZXI7XHJcbiAgICBhcmVhSUQ6IHN0cmluZztcclxuICAgIGRldmljZUlEOiBzdHJpbmc7XHJcbiAgICBkZXZpY2VOYW1lPzogc3RyaW5nO1xyXG4gICAgYXJlYU5hbWU6IHN0cmluZztcclxuICAgIGZsb3c6IG51bWJlcjtcclxuICAgIG9iamVjdFR5cGU6IHN0cmluZztcclxuICAgIHRpbWVJdGVtOiBzdHJpbmc7XHJcbiAgICBsYXRpdHVkZTogbnVtYmVyO1xyXG4gICAgbG9uZ2l0dWRlOiBudW1iZXI7XHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgQXJlYUluZm8ge1xyXG4gICAgTmFtZTogc3RyaW5nID0gXCJcIjtcclxuICAgIElEOiBzdHJpbmcgPSBcIlwiO1xyXG59O1xyXG5cclxuLy8g5biD5o6n5bqT54q25oCB5p6a5Li+XHJcbmludGVyZmFjZSBJQWxhcm1TdGF0dXNUeXBlIHtcclxuICAgIFVua25vdzogc2VsZWN0RGF0YUVudW07XHJcbiAgICBWYWxpZDogc2VsZWN0RGF0YUVudW07XHJcbiAgICBJbnZhbGlkOiBzZWxlY3REYXRhRW51bTtcclxuICAgIEluZGV0ZXJtaW5hdGU6IHNlbGVjdERhdGFFbnVtO1xyXG4gICAgVW5kaXNwb3NlZDogc2VsZWN0RGF0YUVudW07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBBbGFybVN0YXR1c1R5cGU6IHsgW2tleTogc3RyaW5nXTogc2VsZWN0RGF0YUVudW0gfSAmIElBbGFybVN0YXR1c1R5cGUgPSB7XHJcbiAgICBVbmtub3c6IHsgdmFsdWU6IFwiVW5rbm93XCIsIHRleHQ6IFwi5pyq55+lXCIgfSxcclxuICAgIFZhbGlkOiB7IHZhbHVlOiBcIlZhbGlkXCIsIHRleHQ6IFwi5pyJ5pWIXCIgfSxcclxuICAgIEludmFsaWQ6IHsgdmFsdWU6IFwiSW52YWxpZFwiLCB0ZXh0OiBcIuaXoOaViFwiIH0sXHJcbiAgICBJbmRldGVybWluYXRlOiB7IHZhbHVlOiBcIkluZGV0ZXJtaW5hdGVcIiwgdGV4dDogXCLlvoXlrppcIiB9LFxyXG4gICAgVW5kaXNwb3NlZDogeyB2YWx1ZTogXCJVbmRpc3Bvc2VkXCIsIHRleHQ6IFwi5pyq5aSE55CGXCIgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGlzcGF0Y2hlZFJlc3VsdCB7XHJcbiAgICBDb3VudDogbnVtYmVyO1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIFN0YXR1czogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGV2aWNlc3RhdXNiYXJFbnVtIHtcclxuICAgIFJtcENvdW50OiBudW1iZXI7XHJcbiAgICBSbXBPbkxpbmU6IG51bWJlcjtcclxuICAgIENhbWVyYUNvdW50OiBudW1iZXI7XHJcbiAgICBDYW1lcmFPbkxpbmU6IG51bWJlcjtcclxuICAgIEVGRU5DRUNvdW50OiBudW1iZXI7XHJcbiAgICBFRkVOQ0VPbkxpbmU6IG51bWJlcjtcclxuICAgIFdJRklDb3VudDogbnVtYmVyO1xyXG4gICAgV0lGSU9uTGluZTogbnVtYmVyXHJcbn1cclxuZXhwb3J0IGNsYXNzIHN0YXRpc3RpY2FsQW5hbHlzaXNNb2R1bGVOYW1lIHtcclxuICAgIHN0YXRpYyB0YXNrU3RhdGlzdGljcyA9IFwidGFza1N0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBhbGFybVN0YXRpc3RpY3MgPSBcImFsYXJtU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIHRyYWZmaWNTdGF0aXN0aWNzID0gXCJ0cmFmZmljU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIHJldHJpZXZhbFN0YXRpc3RpY3MgPSBcInJldHJpZXZhbFN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBhbmFseXNpc3NUYXRpc3RpY3MgPSBcImFuYWx5c2lzc1RhdGlzdGljc1wiO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgdGFza1N0YXRpc3RpY3NNb2R1bGVOYW1lIHtcclxuICAgIHN0YXRpYyBhcmVhVGFza1N0YXRpc3RpY3MgPSBcImFyZWFUYXNrU3RhdGlzdGljc1wiO1xyXG4gICAgc3RhdGljIGFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3MgPSBcImFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljcyA9IFwiZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3NcIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFsYXJtU3RhdGlzdGljc01vZHVsZU5hbWUge1xyXG4gICAgc3RhdGljIGFyZWFBbGFybSA9IFwiYXJlYUFsYXJtXCI7XHJcbiAgICBzdGF0aWMgYXJlYUFsYXJtVHJlbmQgPSBcImFyZWFBbGFybVRyZW5kXCI7XHJcbiAgICBzdGF0aWMgZGV2aWNlQWxhcm1TdGF0aXN0aWNzID0gXCJkZXZpY2VBbGFybVN0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBkaXNwYXRjaGVkQWJvdXRBbGFybSA9IFwiZGlzcGF0Y2hlZEFib3V0QWxhcm1cIjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWZmaWNTdGF0aXN0aWNzTW9kdWxlTmFtZSB7XHJcbiAgICBzdGF0aWMgYXJlYVRyYWZmaWNTdGF0aXN0aWNzID0gXCJhcmVhVHJhZmZpY1N0YXRpc3RpY3NcIjtcclxuICAgIHN0YXRpYyBhcmVhVHJhZmZpY1RyZW5kID0gXCJhcmVhVHJhZmZpY1RyZW5kXCI7XHJcbiAgICBzdGF0aWMgZGV2aWNlVHJhZmZpY1N0YXRpc3RpY3MgPSBcImRldmljZVRyYWZmaWNTdGF0aXN0aWNzXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXRyaWV2YWxTdGF0aXN0aWNNb2R1bGVOYW1lIHtcclxuICAgIHN0YXRpYyByZXRyaWV2YWxTdGF0aXN0aWMgPSBcInJldHJpZXZhbFN0YXRpc3RpY1wiO1xyXG4gICAgc3RhdGljIHJldHJpZXZhbFRyYWZmaWNUcmVuZCA9IFwicmV0cmlldmFsVHJhZmZpY1RyZW5kXCI7XHJcbiAgICBzdGF0aWMgcmFua1N0YXRpc3RpY3MgPSBcInJhbmtTdGF0aXN0aWNzXCI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBhbmFseXNpc1N0YXRpc3RpY01vZHVsZU5hbWVzIHtcclxuICAgIHN0YXRpYyBJbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGUgPSBcIkludGVsbGlnZW50QW5hbHlzaXNfVmVoaWNsZVwiO1xyXG4gICAgc3RhdGljIEludGVsbGlnZW50QW5hbHlzaXNfRmFjZSA9IFwiSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlXCI7XHJcbiAgICBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19NYWMgPSBcIkludGVsbGlnZW50QW5hbHlzaXNfTWFjXCI7XHJcbiAgICBzdGF0aWMgSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaCA9IFwiSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaFwiO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmV0cmlldmFsU3RhdGlzdGljUGFyYW1Nb2R1bGVOYW1lcyB7XHJcbiAgICBzdGF0aWMgUmVzb3VyY2VSZXRyaWV2YWxfRnVsbFNlYXJjaCA9IFwiUmVzb3VyY2VSZXRyaWV2YWxfRnVsbFNlYXJjaFwiO1xyXG4gICAgc3RhdGljIFJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfVmVoaWNsZSA9IFwiUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9WZWhpY2xlXCI7XHJcbiAgICBzdGF0aWMgUmVzb3VyY2VSZXRyaWV2YWxfQWR2YW5jZVNlYXJjaF9GYWNlID0gXCJSZXNvdXJjZVJldHJpZXZhbF9BZHZhbmNlU2VhcmNoX0ZhY2VcIjtcclxuICAgIHN0YXRpYyBSZXNvdXJjZVJldHJpZXZhbF9BZHZhbmNlU2VhcmNoX1dpRmkgPSBcIlJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfV2lGaVwiO1xyXG4gICAgc3RhdGljIFJlc291cmNlUmV0cmlldmFsX0FkdmFuY2VTZWFyY2hfRUZlbmNlID0gXCJSZXNvdXJjZVJldHJpZXZhbF9BZHZhbmNlU2VhcmNoX0VGZW5jZVwiO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZWNoYXJ0TmFtZUFycjogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgIHRhc2tTdGF0aXN0aWNzOiBcIuS7u+WKoee7n+iuoVwiLFxyXG4gICAgYWxhcm1TdGF0aXN0aWNzOiBcIuaKpeitpue7n+iuoVwiLFxyXG4gICAgdHJhZmZpY1N0YXRpc3RpY3M6IFwi5rWB6YeP57uf6K6hXCIsXHJcbiAgICByZXRyaWV2YWxTdGF0aXN0aWNzOiBcIue7n+iuoeajgOe0olwiLFxyXG4gICAgYW5hbHlzaXNzVGF0aXN0aWNzOiBcIuWIhuaekOe7n+iuoVwiLFxyXG5cclxuICAgIGFyZWFUYXNrU3RhdGlzdGljczogXCLljLrln5/nu5PmnoTljJbku7vliqHnu5/orqFcIixcclxuICAgIGFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3M6IFwi5Yy65Z+f5biD5o6n5Lu75Yqh57uf6K6hXCIsXHJcbiAgICBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljczogXCLluIPmjqflupPlhbPogZTku7vliqHnu5/orqFcIixcclxuXHJcbiAgICBhcmVhQWxhcm06IFwi5Yy65Z+f5oql6K2m5pWwXCIsXHJcbiAgICBhcmVhQWxhcm1UcmVuZDogXCLljLrln5/miqXorabotovlir9cIixcclxuICAgIGRldmljZUFsYXJtU3RhdGlzdGljczogXCLorr7lpIfmiqXorabnu5/orqEoVE9QMTApXCIsXHJcbiAgICBkaXNwYXRjaGVkQWJvdXRBbGFybTogXCLluIPmjqflupPlhbPogZTmiqXorabnu5/orqEoVE9QMTApXCIsXHJcblxyXG4gICAgYXJlYVRyYWZmaWNTdGF0aXN0aWNzOiBcIuWMuuWfn+a1gemHj+e7n+iuoVwiLFxyXG4gICAgYXJlYVRyYWZmaWNUcmVuZDogXCLljLrln5/mtYHph4/otovlir9cIixcclxuICAgIGRldmljZVRyYWZmaWNTdGF0aXN0aWNzOiBcIuiuvuWkh+a1gemHj+e7n+iuoShUT1AxMClcIixcclxuXHJcbiAgICByZXRyaWV2YWxTdGF0aXN0aWM6IFwi5qOA57Si57uf6K6hXCIsXHJcbiAgICByZXRyaWV2YWxUcmFmZmljVHJlbmQ6IFwi5qOA57Si6LaL5Yq/57uf6K6hXCIsXHJcbiAgICByYW5rU3RhdGlzdGljczogXCLpq5jpopHmo4DntKLlhbPplK7lrZfmjpLooYxcIixcclxuXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGU6IFwi6L2m6L6G5YiG5p6Q57uf6K6hXCIsXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2U6IFwi5Lq65ZGY5YiG5p6Q57uf6K6hXCIsXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX01hYzogXCLmhJ/nn6XmlbDmja7liIbmnpDnu5/orqFcIixcclxuICAgIEludGVsbGlnZW50QW5hbHlzaXNfQ3Jhc2g6IFwi5aSa5YWD56Kw5pKe5YiG5p6Q57uf6K6hXCJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIGludGVsbGlnZW50QW5hbHlzaXNEYXRhRW51bSB7XHJcbiAgICAvL+S7u+WKoee7n+iuoVxyXG4gICAgYXJlYVRhc2tTdGF0aXN0aWNzOiBzdHJpbmc7XHJcbiAgICBhcmVhRGlzcGF0Y2hlZFRhc2tTdGF0aXN0aWNzOiBzdHJpbmc7XHJcbiAgICBkaXNwYXRjaGVkQWJvdXRUYXNrU3RhdGlzdGljczogc3RyaW5nO1xyXG4gICAgLy/miqXorabnu5/orqFcclxuICAgIGFyZWFBbGFybTogc3RyaW5nO1xyXG4gICAgYXJlYUFsYXJtVHJlbmQ6IHN0cmluZztcclxuICAgIGRldmljZUFsYXJtU3RhdGlzdGljczogc3RyaW5nO1xyXG4gICAgZGlzcGF0Y2hlZEFib3V0QWxhcm06IHN0cmluZztcclxuICAgIC8v5rWB6YeP57uf6K6hXHJcbiAgICBhcmVhVHJhZmZpY1N0YXRpc3RpY3M6IHN0cmluZztcclxuICAgIGFyZWFUcmFmZmljVHJlbmQ6IHN0cmluZztcclxuICAgIGRldmljZVRyYWZmaWNTdGF0aXN0aWNzOiBzdHJpbmc7XHJcbiAgICAvL+ajgOe0oue7n+iuoVxyXG4gICAgTWFpbnRhaW5fU3RhdGlzT3ZlcnZpZXdfUmV0cml2YWw6IHN0cmluZztcclxuICAgIE1haW50YWluX1N0YXRpc092ZXJ2aWV3X1JldHJpdmFsX1RyZW5kOiBzdHJpbmc7XHJcbiAgICBNYWludGFpbl9TdGF0aXNPdmVydmlld19SZXRyaXZhbF9SYW5rOiBzdHJpbmc7XHJcbiAgICAvL+WIhuaekOe7n+iuoVxyXG4gICAgSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlOiBzdHJpbmc7XHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2U6IHN0cmluZztcclxuICAgIEludGVsbGlnZW50QW5hbHlzaXNfTWFjOiBzdHJpbmc7XHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX0NyYXNoOiBzdHJpbmc7XHJcbiAgICAvLyDmjpLooYxcclxuICAgIEFsbFJhbmtMaXN0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBpbnRlbGxpZ2VudEFuYWx5c2lzRGF0YTogaW50ZWxsaWdlbnRBbmFseXNpc0RhdGFFbnVtID0ge1xyXG4gICAgLy/ku7vliqHnu5/orqFcclxuICAgIGFyZWFUYXNrU3RhdGlzdGljczogXCJhcmVhVGFza1N0YXRpc3RpY3NcIixcclxuICAgIGFyZWFEaXNwYXRjaGVkVGFza1N0YXRpc3RpY3M6IFwiYXJlYURpc3BhdGNoZWRUYXNrU3RhdGlzdGljc1wiLFxyXG4gICAgZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3M6IFwiZGlzcGF0Y2hlZEFib3V0VGFza1N0YXRpc3RpY3NcIixcclxuICAgIC8v5oql6K2m57uf6K6hXHJcbiAgICBhcmVhQWxhcm06IFwiYXJlYUFsYXJtXCIsXHJcbiAgICBhcmVhQWxhcm1UcmVuZDogXCJhcmVhQWxhcm1UcmVuZFwiLFxyXG4gICAgZGV2aWNlQWxhcm1TdGF0aXN0aWNzOiBcImRldmljZUFsYXJtU3RhdGlzdGljc1wiLFxyXG4gICAgZGlzcGF0Y2hlZEFib3V0QWxhcm06IFwiZGlzcGF0Y2hlZEFib3V0QWxhcm1cIixcclxuICAgIC8v5rWB6YeP57uf6K6hXHJcbiAgICBhcmVhVHJhZmZpY1N0YXRpc3RpY3M6IFwiYXJlYVRyYWZmaWNTdGF0aXN0aWNzXCIsXHJcbiAgICBhcmVhVHJhZmZpY1RyZW5kOiBcImFyZWFUcmFmZmljVHJlbmRcIixcclxuICAgIGRldmljZVRyYWZmaWNTdGF0aXN0aWNzOiBcImRldmljZVRyYWZmaWNTdGF0aXN0aWNzXCIsXHJcbiAgICAvL+ajgOe0oue7n+iuoVxyXG4gICAgTWFpbnRhaW5fU3RhdGlzT3ZlcnZpZXdfUmV0cml2YWw6IFwicmV0cmlldmFsU3RhdGlzdGljXCIsXHJcbiAgICBNYWludGFpbl9TdGF0aXNPdmVydmlld19SZXRyaXZhbF9UcmVuZDogXCJyZXRyaWV2YWxUcmFmZmljVHJlbmRcIixcclxuICAgIE1haW50YWluX1N0YXRpc092ZXJ2aWV3X1JldHJpdmFsX1Jhbms6IFwicmFua1N0YXRpc3RpY3NcIixcclxuICAgIC8v5YiG5p6Q57uf6K6hXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX1ZlaGljbGU6IFwiSW50ZWxsaWdlbnRBbmFseXNpc19WZWhpY2xlXCIsXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX0ZhY2U6IFwiSW50ZWxsaWdlbnRBbmFseXNpc19GYWNlXCIsXHJcbiAgICBJbnRlbGxpZ2VudEFuYWx5c2lzX01hYzogXCJJbnRlbGxpZ2VudEFuYWx5c2lzX01hY1wiLFxyXG4gICAgSW50ZWxsaWdlbnRBbmFseXNpc19DcmFzaDogXCJJbnRlbGxpZ2VudEFuYWx5c2lzX0NyYXNoXCIsXHJcbiAgICAvLyDmjpLooYxcclxuICAgIEFsbFJhbmtMaXN0OiBcIkFsbFJhbmtMaXN0XCIsXHJcbn07XHJcblxyXG5leHBvcnQgY2xhc3MgRXhjZWxUYWJsZUVudW0ge1xyXG4gICAgc2hlZXROYW1lPzogc3RyaW5nO1xyXG4gICAgc2hlZXREYXRhOiBBcnJheTxBcnJheTxzdHJpbmcgfCBudW1iZXI+PjtcclxuICAgIHNoZWV0SGVhZGVyOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBleHBvcnRFeGNlbFBhcmFtRW51bSB7XHJcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gICAgZGF0YXM6IEFycmF5PEV4Y2VsVGFibGVFbnVtPlxyXG59Il19
