define(["require", "exports", "../../common/app/main.app", "../../common/services/total.service", "../totalFactory/doEcharts", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var echarts = require("echarts");
    var TotalGeneralController = (function () {
        function TotalGeneralController($scope, totalService, echartService) {
            console.log("进入genernal界面");
            var vm = this;
            vm.formatTaskDataList = formatTaskDataList;
            vm.formatAlarmDataList = formatAlarmDataList;
            vm.formatFlowDataList = formatFlowDataList;
            vm.formatUserDataList = formatUserDataList;
            vm.formatSearchDataList = formatSearchDataList;
            vm.allTaskNum = 0;
            vm.onlineTaskNum = 0;
            vm.verifingTaskNum = 0;
            vm.overdueTaskNum = 0;
            vm.allAlarmNum = 0;
            vm.onlineAlarmNum = 0;
            vm.invalidAlarmNum = 0;
            vm.undisposedAlarmNum = 0;
            vm.allFlowNum = 0;
            vm.areaFlowArr = [];
            vm.allUserNum = 0;
            vm.onlineUserNum = 0;
            vm.unlineUserNum = 0;
            vm.allSearchNum = 0;
            vm.taskNoData = false;
            vm.alarmNoData = false;
            vm.flowNoData = false;
            vm.userNoData = false;
            vm.searchNoData = false;
            function getCameraData() {
                totalService.getCameraDataList([
                    {
                        "captureType": "ALL",
                        "groupType": "GROUP_BY_TYPE"
                    }
                ]).then(complete);
                function complete(rep) {
                    console.log('摄像机', rep);
                    if (rep.code === 200 && rep.data) {
                        rep.data.GROUP_BY_TYPE.forEach(function (item) {
                            if (item.captureType === '摄像机总数') {
                                vm.allCamera = item;
                            }
                            else if (item.captureType === '普通') {
                                vm.normalCamera = item;
                            }
                            else if (item.captureType === '人像') {
                                vm.videoCamera = item;
                            }
                            else if (item.captureType === 'body') {
                                vm.bodyCamera = item;
                            }
                            else if (item.captureType === '') {
                                vm.faceCamera = item;
                            }
                        });
                    }
                }
            }
            getCameraData();
            function getTaskData() {
                totalService.getTaskDataList([
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_AREA"
                    },
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_STATUS"
                    }
                ]).then(complete);
                function complete(rep) {
                    if (rep.code === 200 && rep.data) {
                        console.error('任务统计获取数据成功', rep);
                        formatTaskDataList(rep.data);
                        rep.data.GROUP_BY_STATUS.forEach(function (item) {
                            vm.allTaskNum += item.allTaskNum;
                            vm.onlineTaskNum += item.onlineTaskNum;
                            vm.verifingTaskNum += item.verifingTaskNum;
                            vm.overdueTaskNum += item.overdueTaskNum;
                        });
                        vm.taskNoData = false;
                    }
                    else {
                        vm.taskNoData = true;
                    }
                }
            }
            getTaskData();
            function getAlarmData() {
                totalService.getAlarmDataList([
                    {
                        "alarmType": "ALL",
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_AREA"
                    }
                ]).then(complete);
                function complete(rep) {
                    if (rep.code === 200 && rep.data) {
                        console.error('报警统计获取数据成功', rep);
                        formatAlarmDataList(rep.data);
                        rep.data.GROUP_BY_AREA.forEach(function (item) {
                            vm.allAlarmNum += item.allAlarmNum;
                            vm.onlineAlarmNum += item.validAlarmNum;
                            vm.invalidAlarmNum += item.invalidAlarmNum;
                            vm.undisposedAlarmNum += item.undisposedAlarmNum;
                        });
                        vm.alarmNoData = false;
                    }
                    else {
                        vm.alarmNoData = true;
                    }
                }
            }
            getAlarmData();
            function getFlowData() {
                totalService.getFlowDataList([
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_ONEDAY"
                    },
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_AREA"
                    }
                ]).then(complete);
                function complete(rep) {
                    if (rep.code === 200 && rep.data) {
                        formatFlowDataList(rep.data);
                        var i_1 = 0;
                        rep.data.GROUP_BY_AREA.forEach(function (item) {
                            vm.allFlowNum += item.flowNum;
                            if (i_1 < 10) {
                                vm.areaFlowArr.push(item);
                            }
                            i_1++;
                        });
                        vm.flowNoData = false;
                    }
                    else {
                        vm.flowNoData = true;
                    }
                }
            }
            getFlowData();
            function getUserData() {
                totalService.getUserDataList([
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_AREA"
                    }
                ]).then(complete);
                function complete(rep) {
                    if (rep.code === 200 && rep.data) {
                        formatUserDataList(rep.data);
                        rep.data.GROUP_BY_AREA.forEach(function (item) {
                            vm.allUserNum += item.allUserNum;
                            vm.onlineUserNum += item.onlineUserNum;
                        });
                        vm.unlineUserNum = vm.allUserNum - vm.onlineUserNum;
                        vm.userNoData = false;
                    }
                    else {
                        vm.userNoData = true;
                    }
                }
            }
            getUserData();
            function getSearchData() {
                totalService.getSearchDataList([
                    {
                        "duration": 'ALL',
                        "groupType": "GROUP_BY_AREA"
                    }
                ]).then(complete);
                function complete(rep) {
                    if (rep.code === 200 && rep.data) {
                        formatSearchDataList(rep.data);
                        rep.data.GROUP_BY_AREA.forEach(function (item) {
                            vm.allSearchNum += item.retrievalNum;
                        });
                        vm.searchNoData = false;
                    }
                    else {
                        vm.searchNoData = true;
                    }
                }
            }
            getSearchData();
            function formatTaskDataList(originalData) {
                var xAxisData = [];
                var taskNum = [];
                var i = 0;
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    if (i <= 7) {
                        xAxisData.push(item.areaName);
                        taskNum.push({ name: item.areaName, value: item.allTaskNum });
                    }
                    i++;
                });
                var formatData = {
                    seriesName: '任务数',
                    xAxisData: xAxisData,
                    showData: taskNum
                };
                echartService.drawEchart(echartService.echartPieOption(formatData), 'general-1');
            }
            ;
            function formatAlarmDataList(originalData) {
                var areaName = [];
                var allAreaNum = [];
                var onlineAreaNum = [];
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    areaName.push(item.areaName);
                    allAreaNum.push(item.allAlarmNum);
                    onlineAreaNum.push(item.validAlarmNum);
                });
                var formatData = {
                    seriesNameOne: '全部',
                    seriesNameTwo: '有效',
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '',
                    yAxisName: '',
                    colorTwo: ['#7dc4fb'],
                    colorOne: ['#269dfa'],
                    xAxisData: areaName,
                    allNum: allAreaNum,
                    onlineNum: onlineAreaNum
                };
                echartService.drawEchart(echartService.echartPileBarOption(formatData), 'general-2');
            }
            ;
            function formatFlowDataList(originalData) {
                var areaName = [];
                var flowNum = [];
                originalData.GROUP_BY_ONEDAY.forEach(function (item, index) {
                    areaName.push(item.strHour);
                    flowNum.push(item.flowNum);
                });
                var formatData = {
                    gridLeft: '3%',
                    gridRight: '4%',
                    xAxisName: '今天',
                    yAxisName: '',
                    xAxisType: 'category',
                    color: ['#269dfa'],
                    xAxisData: areaName,
                    showData: flowNum
                };
                echartService.drawEchart(echartService.echartLineOption(formatData), 'general-3');
            }
            ;
            function formatUserDataList(originalData) {
                var xAxisData = [];
                var userNum = [];
                var i = 0;
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    if (i < 7) {
                        xAxisData.push(item.areaName);
                        userNum.push({ name: item.areaName, value: item.allUserNum });
                    }
                    i++;
                });
                var formatData = {
                    seriesName: '用户数',
                    xAxisData: xAxisData,
                    showData: userNum
                };
                echartService.drawEchart(echartService.echartPieOption(formatData), 'general-4');
            }
            ;
            function formatSearchDataList(originalData) {
                var xAxisData = [];
                var searchNum = [];
                originalData.GROUP_BY_AREA.forEach(function (item, index) {
                    xAxisData.push(item.areaName);
                    searchNum.push(item.retrievalNum);
                });
                var formatData = {
                    gridLeft: '5%',
                    gridRight: '5%',
                    xAxisName: '',
                    yAxisName: '',
                    labelShow: false,
                    color: ['#269dfa', '#269dfa'],
                    xAxisData: xAxisData,
                    showData: searchNum
                };
                echartService.drawEchart(echartService.echartBarOption(formatData), 'general-5');
            }
            ;
        }
        TotalGeneralController.$inject = ["$scope", "totalService", "echartService"];
        return TotalGeneralController;
    }());
    main_app_1.app.controller('totalGeneralController', TotalGeneralController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG90YWwvZ2VuZXJhbC90b3RhbC5nZW5lcmFsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBcUNBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVqQztRQWdFSSxnQ0FBWSxNQUFXLEVBQUUsWUFBMkIsRUFBRSxhQUE2QjtZQUMvRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUVkLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztZQUMzQyxFQUFFLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7WUFDN0MsRUFBRSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1lBQzNDLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztZQUMzQyxFQUFFLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7WUFFL0MsRUFBRSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDckIsRUFBRSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDbkIsRUFBRSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDdkIsRUFBRSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztZQUMxQixFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUNwQixFQUFFLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FB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QUMsQ0FBQztRQTJZakUsNkJBQUM7S0E1WUQsQUE0WUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG90YWwvZ2VuZXJhbC90b3RhbC5nZW5lcmFsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBkZWxsIG9uIDIwMTcvNC8yMS5cclxuICovXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFJvdXRlclNlcnZpY2UgZnJvbSBcIi4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7SVJvdXRlckNvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQge0lUb3RhbFNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvdG90YWwuc2VydmljZVwiXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90b3RhbC5zZXJ2aWNlXCJcclxuXHJcbmltcG9ydCB7SUVjaGFydFNlcnZpY2V9IGZyb20gXCIuLi90b3RhbEZhY3RvcnkvZG9FY2hhcnRzXCJcclxuaW1wb3J0IFwiLi4vdG90YWxGYWN0b3J5L2RvRWNoYXJ0c1wiXHJcblxyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgRGV2aWNlUmVzcG9uc2UsXHJcbiAgICBUYXNrUmVzcG9uc2UsXHJcbiAgICBUYXNrR3JvdXBCeUFyZWEsXHJcbiAgICBUYXNrR3JvdXBCeVNyYXR1cyxcclxuICAgIEFsYXJtUmVzcG9uc2UsXHJcbiAgICBBbGFybUdyb3VwQnlBcmVhLFxyXG4gICAgRmxvd1Jlc3BvbnNlLFxyXG4gICAgRmxvd0dyb3VwQnlPbmVEYXksXHJcbiAgICBGbG93R3JvdXBCeUFyZWEsXHJcbiAgICBVc2VyUmVzcG9uc2UsXHJcbiAgICBVc2VyR3JvdXBCeUFyZWEsXHJcbiAgICBTZWFyY2hSZXNwb25zZSxcclxuICAgIFNlYXJjaEdyb3VwQnlBcmVhLFxyXG4gICAgRGV2aWNlR3JvdXBCeVR5cGVcclxufSBmcm9tIFwiLi4vdG90YWxGYWN0b3J5L3RvdGFsUmVzcG9uc2VcIlxyXG5cclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxubGV0IGVjaGFydHMgPSByZXF1aXJlKFwiZWNoYXJ0c1wiKTtcclxuXHJcbmNsYXNzIFRvdGFsR2VuZXJhbENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJ0b3RhbFNlcnZpY2VcIiwgXCJlY2hhcnRTZXJ2aWNlXCJdO1xyXG5cclxuICAgIG1vZHVsZUl0ZW1zOiBBcnJheTxJUm91dGVyQ29uZmlnPjtcclxuXHJcbiAgICAvL+S7u+WKoee7n+iuoVxyXG4gICAgZm9ybWF0VGFza0RhdGFMaXN0OiBGdW5jdGlvbjtcclxuICAgIC8v5oql6K2m57uf6K6hXHJcbiAgICBmb3JtYXRBbGFybURhdGFMaXN0OiBGdW5jdGlvbjtcclxuICAgIC8v5rWB6YeP57uf6K6hXHJcbiAgICBmb3JtYXRGbG93RGF0YUxpc3Q6IEZ1bmN0aW9uO1xyXG4gICAgLy/nlKjmiLfnu5/orqFcclxuICAgIGZvcm1hdFVzZXJEYXRhTGlzdDogRnVuY3Rpb247XHJcbiAgICAvL+WMuuWfn+ajgOe0oue7n+iuoVxyXG4gICAgZm9ybWF0U2VhcmNoRGF0YUxpc3Q6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5oC75pGE5YOP5py6XHJcbiAgICBhbGxDYW1lcmE6IERldmljZUdyb3VwQnlUeXBlO1xyXG4gICAgLy/mma7pgJrmkYTlg4/mnLpcclxuICAgIG5vcm1hbENhbWVyYTogRGV2aWNlR3JvdXBCeVR5cGU7XHJcbiAgICAvL+S6uuS9k+aRhOWDj+aculxyXG4gICAgYm9keUNhbWVyYTogRGV2aWNlR3JvdXBCeVR5cGU7XHJcbiAgICAvL+S6uuiEuOaRhOWDj+aculxyXG4gICAgZmFjZUNhbWVyYTogRGV2aWNlR3JvdXBCeVR5cGU7XHJcbiAgICAvL+S6uuWDj+aRhOWDj+aculxyXG4gICAgdmlkZW9DYW1lcmE6IERldmljZUdyb3VwQnlUeXBlO1xyXG5cclxuXHJcbiAgICAvL+aAu+S7u+WKoeaVsFxyXG4gICAgYWxsVGFza051bTogbnVtYmVyO1xyXG4gICAgLy/lnKjnur9cclxuICAgIG9ubGluZVRhc2tOdW06IG51bWJlcjtcclxuICAgIC8v5a6h5qC45LitXHJcbiAgICB2ZXJpZmluZ1Rhc2tOdW06IG51bWJlcjtcclxuICAgIC8v5bey6L+H5pyfXHJcbiAgICBvdmVyZHVlVGFza051bTogbnVtYmVyO1xyXG4gICAgLy/mgLvmiqXorabmlbBcclxuICAgIGFsbEFsYXJtTnVtOiBudW1iZXI7XHJcbiAgICAvL+acieaViOaKpeitpuaVsFxyXG4gICAgb25saW5lQWxhcm1OdW06IG51bWJlcjtcclxuICAgIC8v5peg5pWI5oql6K2m5pWwXHJcbiAgICBpbnZhbGlkQWxhcm1OdW06IG51bWJlcjtcclxuICAgIC8v5pyq5aSE55CGXHJcbiAgICB1bmRpc3Bvc2VkQWxhcm1OdW06IG51bWJlcjtcclxuICAgIC8v5rWB6YeP5oC76K6hXHJcbiAgICBhbGxGbG93TnVtOiBudW1iZXI7XHJcbiAgICAvL+WQhOWMuuWfn+a1gemHj+aVsOe7hFxyXG4gICAgYXJlYUZsb3dBcnI6IEFycmF5PG9iamVjdD47XHJcbiAgICAvL+eUqOaIt+aAu+iuoVxyXG4gICAgYWxsVXNlck51bTogbnVtYmVyO1xyXG4gICAgLy/nlKjmiLflnKjnur9cclxuICAgIG9ubGluZVVzZXJOdW06IG51bWJlcjtcclxuICAgIC8v55So5oi356a757q/XHJcbiAgICB1bmxpbmVVc2VyTnVtOiBudW1iZXI7XHJcbiAgICAvL+aAu+ajgOe0ouaVsFxyXG4gICAgYWxsU2VhcmNoTnVtOiBudW1iZXI7XHJcblxyXG4gICAgLy/ml6DmlbDmja7ml7blsZXnpLpcclxuICAgIHRhc2tOb0RhdGE6Ym9vbGVhbjtcclxuICAgIGFsYXJtTm9EYXRhOmJvb2xlYW47XHJcbiAgICBmbG93Tm9EYXRhOmJvb2xlYW47XHJcbiAgICB1c2VyTm9EYXRhOmJvb2xlYW47XHJcbiAgICBzZWFyY2hOb0RhdGE6Ym9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSwgdG90YWxTZXJ2aWNlOiBJVG90YWxTZXJ2aWNlLCBlY2hhcnRTZXJ2aWNlOiBJRWNoYXJ0U2VydmljZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi6L+b5YWlZ2VuZXJuYWznlYzpnaJcIik7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgdm0uZm9ybWF0VGFza0RhdGFMaXN0ID0gZm9ybWF0VGFza0RhdGFMaXN0O1xyXG4gICAgICAgIHZtLmZvcm1hdEFsYXJtRGF0YUxpc3QgPSBmb3JtYXRBbGFybURhdGFMaXN0O1xyXG4gICAgICAgIHZtLmZvcm1hdEZsb3dEYXRhTGlzdCA9IGZvcm1hdEZsb3dEYXRhTGlzdDtcclxuICAgICAgICB2bS5mb3JtYXRVc2VyRGF0YUxpc3QgPSBmb3JtYXRVc2VyRGF0YUxpc3Q7XHJcbiAgICAgICAgdm0uZm9ybWF0U2VhcmNoRGF0YUxpc3QgPSBmb3JtYXRTZWFyY2hEYXRhTGlzdDtcclxuXHJcbiAgICAgICAgdm0uYWxsVGFza051bSA9IDA7XHJcbiAgICAgICAgdm0ub25saW5lVGFza051bSA9IDA7XHJcbiAgICAgICAgdm0udmVyaWZpbmdUYXNrTnVtID0gMDtcclxuICAgICAgICB2bS5vdmVyZHVlVGFza051bSA9IDA7XHJcbiAgICAgICAgdm0uYWxsQWxhcm1OdW0gPSAwO1xyXG4gICAgICAgIHZtLm9ubGluZUFsYXJtTnVtID0gMDtcclxuICAgICAgICB2bS5pbnZhbGlkQWxhcm1OdW0gPSAwO1xyXG4gICAgICAgIHZtLnVuZGlzcG9zZWRBbGFybU51bSA9IDA7XHJcbiAgICAgICAgdm0uYWxsRmxvd051bSA9IDA7XHJcbiAgICAgICAgdm0uYXJlYUZsb3dBcnIgPSBbXTtcclxuICAgICAgICB2bS5hbGxVc2VyTnVtID0gMDtcclxuICAgICAgICB2bS5vbmxpbmVVc2VyTnVtID0gMDtcclxuICAgICAgICB2bS51bmxpbmVVc2VyTnVtID0gMDtcclxuICAgICAgICB2bS5hbGxTZWFyY2hOdW0gPSAwO1xyXG5cclxuICAgICAgICB2bS50YXNrTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdm0uYWxhcm1Ob0RhdGEgPSBmYWxzZTtcclxuICAgICAgICB2bS5mbG93Tm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgdm0udXNlck5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgIHZtLnNlYXJjaE5vRGF0YSA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICAgICAgLy/orr7lpIfnu5/orqFcclxuICAgICAgICBmdW5jdGlvbiBnZXRDYW1lcmFEYXRhKCkge1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0Q2FtZXJhRGF0YUxpc3QoW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiY2FwdHVyZVR5cGVcIjogXCJBTExcIixcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwVHlwZVwiOiBcIkdST1VQX0JZX1RZUEVcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOiBSZXNwb25zZVJlc3VsdDxEZXZpY2VSZXNwb25zZT4pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmkYTlg4/mnLonLHJlcClcclxuICAgICAgICAgICAgICAgIGlmIChyZXAuY29kZSA9PT0gMjAwICYmIHJlcC5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmRhdGEuR1JPVVBfQllfVFlQRS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBEZXZpY2VHcm91cEJ5VHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jYXB0dXJlVHlwZSA9PT0gJ+aRhOWDj+acuuaAu+aVsCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5oC75pGE5YOP5py6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5hbGxDYW1lcmEgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2FwdHVyZVR5cGUgPT09ICfmma7pgJonKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5ub3JtYWxDYW1lcmEgPSBpdGVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0uY2FwdHVyZVR5cGUgPT09ICfkurrlg48nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS52aWRlb0NhbWVyYSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5jYXB0dXJlVHlwZSA9PT0gJ2JvZHknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5ib2R5Q2FtZXJhID0gaXRlbTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmNhcHR1cmVUeXBlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZmFjZUNhbWVyYSA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldENhbWVyYURhdGEoKTtcclxuXHJcbiAgICAgICAgLy/ku7vliqHnu5/orqFcclxuICAgICAgICBmdW5jdGlvbiBnZXRUYXNrRGF0YSgpIHtcclxuICAgICAgICAgICAgdG90YWxTZXJ2aWNlLmdldFRhc2tEYXRhTGlzdChbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkdXJhdGlvblwiOiAnQUxMJyxcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwVHlwZVwiOiBcIkdST1VQX0JZX0FSRUFcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uXCI6ICdBTEwnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBUeXBlXCI6IFwiR1JPVVBfQllfU1RBVFVTXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSkudGhlbihjb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKHJlcDogUmVzcG9uc2VSZXN1bHQ8VGFza1Jlc3BvbnNlPikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfku7vliqHnu5/orqHojrflj5bmlbDmja7miJDlip8nLCByZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFRhc2tEYXRhTGlzdChyZXAuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmRhdGEuR1JPVVBfQllfU1RBVFVTLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IFRhc2tHcm91cEJ5U3JhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmFsbFRhc2tOdW0gKz0gaXRlbS5hbGxUYXNrTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5vbmxpbmVUYXNrTnVtICs9IGl0ZW0ub25saW5lVGFza051bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0udmVyaWZpbmdUYXNrTnVtICs9IGl0ZW0udmVyaWZpbmdUYXNrTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5vdmVyZHVlVGFza051bSArPSBpdGVtLm92ZXJkdWVUYXNrTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhc2tOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnRhc2tOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldFRhc2tEYXRhKCk7XHJcblxyXG4gICAgICAgIC8v5oql6K2m57uf6K6hXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWxhcm1EYXRhKCkge1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0QWxhcm1EYXRhTGlzdChbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhbGFybVR5cGVcIjogXCJBTExcIixcclxuICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uXCI6ICdBTEwnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBUeXBlXCI6IFwiR1JPVVBfQllfQVJFQVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXA6IFJlc3BvbnNlUmVzdWx0PEFsYXJtUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwLmNvZGUgPT09IDIwMCAmJiByZXAuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aKpeitpue7n+iuoeiOt+WPluaVsOaNruaIkOWKnycsIHJlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0QWxhcm1EYXRhTGlzdChyZXAuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liJ3lp4vljJbmgLvmiqXorabmlbDjgIHmnInmlYjmiqXorabmlbBcclxuICAgICAgICAgICAgICAgICAgICByZXAuZGF0YS5HUk9VUF9CWV9BUkVBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IEFsYXJtR3JvdXBCeUFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsQWxhcm1OdW0gKz0gaXRlbS5hbGxBbGFybU51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ub25saW5lQWxhcm1OdW0gKz0gaXRlbS52YWxpZEFsYXJtTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5pbnZhbGlkQWxhcm1OdW0gKz0gaXRlbS5pbnZhbGlkQWxhcm1OdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLnVuZGlzcG9zZWRBbGFybU51bSArPSBpdGVtLnVuZGlzcG9zZWRBbGFybU51bTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2bS5hbGFybU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uYWxhcm1Ob0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldEFsYXJtRGF0YSgpO1xyXG5cclxuICAgICAgICAvL+a1gemHj+e7n+iuoVxyXG4gICAgICAgIGZ1bmN0aW9uIGdldEZsb3dEYXRhKCkge1xyXG4gICAgICAgICAgICB0b3RhbFNlcnZpY2UuZ2V0Rmxvd0RhdGFMaXN0KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uXCI6ICdBTEwnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBUeXBlXCI6IFwiR1JPVVBfQllfT05FREFZXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkdXJhdGlvblwiOiAnQUxMJyxcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwVHlwZVwiOiBcIkdST1VQX0JZX0FSRUFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOiBSZXNwb25zZVJlc3VsdDxGbG93UmVzcG9uc2U+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwLmNvZGUgPT09IDIwMCAmJiByZXAuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ+a1gemHj+e7n+iuoeiOt+WPluaVsOaNruaIkOWKnycsIHJlcC5EYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXRGbG93RGF0YUxpc3QocmVwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5oC75oql6K2m5pWw44CB5pyJ5pWI5oql6K2m5pWwXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwLmRhdGEuR1JPVVBfQllfQVJFQS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtOiBGbG93R3JvdXBCeUFyZWEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYWxsRmxvd051bSArPSBpdGVtLmZsb3dOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgMTApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmFyZWFGbG93QXJyLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZmxvd05vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZmxvd05vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0Rmxvd0RhdGEoKTtcclxuXHJcbiAgICAgICAgLy/nlKjmiLfnu5/orqFcclxuICAgICAgICBmdW5jdGlvbiBnZXRVc2VyRGF0YSgpIHtcclxuICAgICAgICAgICAgdG90YWxTZXJ2aWNlLmdldFVzZXJEYXRhTGlzdChbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJkdXJhdGlvblwiOiAnQUxMJyxcclxuICAgICAgICAgICAgICAgICAgICBcImdyb3VwVHlwZVwiOiBcIkdST1VQX0JZX0FSRUFcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdKS50aGVuKGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVwOiBSZXNwb25zZVJlc3VsdDxVc2VyUmVzcG9uc2U+KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwLmNvZGUgPT09IDIwMCAmJiByZXAuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ+eUqOaIt+e7n+iuoeiOt+WPluaVsOaNruaIkOWKnycsIHJlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0VXNlckRhdGFMaXN0KHJlcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAuZGF0YS5HUk9VUF9CWV9BUkVBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IFVzZXJHcm91cEJ5QXJlYSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5hbGxVc2VyTnVtICs9IGl0ZW0uYWxsVXNlck51bTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0ub25saW5lVXNlck51bSArPSBpdGVtLm9ubGluZVVzZXJOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0udW5saW5lVXNlck51bSA9IHZtLmFsbFVzZXJOdW0gLSB2bS5vbmxpbmVVc2VyTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXJOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnVzZXJOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldFVzZXJEYXRhKCk7XHJcblxyXG4gICAgICAgIC8v5qOA57Si57uf6K6hXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2VhcmNoRGF0YSgpIHtcclxuICAgICAgICAgICAgdG90YWxTZXJ2aWNlLmdldFNlYXJjaERhdGFMaXN0KFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcImR1cmF0aW9uXCI6ICdBTEwnLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ3JvdXBUeXBlXCI6IFwiR1JPVVBfQllfQVJFQVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0pLnRoZW4oY29tcGxldGUpO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZShyZXA6IFJlc3BvbnNlUmVzdWx0PFNlYXJjaFJlc3BvbnNlPikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcC5jb2RlID09PSAyMDAgJiYgcmVwLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCfmo4DntKLnu5/orqHojrflj5bmlbDmja7miJDlip8nLCByZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdFNlYXJjaERhdGFMaXN0KHJlcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXAuZGF0YS5HUk9VUF9CWV9BUkVBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IFNlYXJjaEdyb3VwQnlBcmVhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmFsbFNlYXJjaE51bSArPSBpdGVtLnJldHJpZXZhbE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB2bS5zZWFyY2hOb0RhdGEgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnNlYXJjaE5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0U2VhcmNoRGF0YSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/ku7vliqHnu5/orqHlnIbnjq/lm77muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRUYXNrRGF0YUxpc3Qob3JpZ2luYWxEYXRhOiBUYXNrUmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgbGV0IHhBeGlzRGF0YTogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgdGFza051bTogQXJyYXk8b2JqZWN0PiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0FSRUEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogVGFza0dyb3VwQnlBcmVhLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WkluahhuWkquWwj++8jOmZkOWItuWxleekuuaVsOmHj1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPD0gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHhBeGlzRGF0YS5wdXNoKGl0ZW0uYXJlYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2tOdW0ucHVzaCh7bmFtZTogaXRlbS5hcmVhTmFtZSwgdmFsdWU6IGl0ZW0uYWxsVGFza051bX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOiBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNOYW1lOiAn5Lu75Yqh5pWwJyxcclxuICAgICAgICAgICAgICAgIC8veOi9tOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgeEF4aXNEYXRhOiB4QXhpc0RhdGEsXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2hvd0RhdGE6IHRhc2tOdW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0UGllT3B0aW9uKGZvcm1hdERhdGEpLCAnZ2VuZXJhbC0xJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/miqXorabnu5/orqHloIblj6Dmn7HlvaLlm77muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRBbGFybURhdGFMaXN0KG9yaWdpbmFsRGF0YTogQWxhcm1SZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYU5hbWU6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGFsbEFyZWFOdW06IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IG9ubGluZUFyZWFOdW06IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIG9yaWdpbmFsRGF0YS5HUk9VUF9CWV9BUkVBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW06IEFsYXJtR3JvdXBCeUFyZWEsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGFyZWFOYW1lLnB1c2goaXRlbS5hcmVhTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBhbGxBcmVhTnVtLnB1c2goaXRlbS5hbGxBbGFybU51bSk7XHJcbiAgICAgICAgICAgICAgICBvbmxpbmVBcmVhTnVtLnB1c2goaXRlbS52YWxpZEFsYXJtTnVtKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZm9ybWF0RGF0YTogb2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgc2VyaWVzTmFtZU9uZTogJ+WFqOmDqCcsXHJcbiAgICAgICAgICAgICAgICBzZXJpZXNOYW1lVHdvOiAn5pyJ5pWIJyxcclxuICAgICAgICAgICAgICAgIGdyaWRMZWZ0OiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgZ3JpZFJpZ2h0OiAnNSUnLFxyXG4gICAgICAgICAgICAgICAgeEF4aXNOYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgIHlBeGlzTmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICBjb2xvclR3bzogWycjN2RjNGZiJ10sXHJcbiAgICAgICAgICAgICAgICBjb2xvck9uZTogWycjMjY5ZGZhJ10sXHJcbiAgICAgICAgICAgICAgICAvL3jovbTmlbDmja5cclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YTogYXJlYU5hbWUsXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgYWxsTnVtOiBhbGxBcmVhTnVtLFxyXG4gICAgICAgICAgICAgICAgb25saW5lTnVtOiBvbmxpbmVBcmVhTnVtXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVjaGFydFNlcnZpY2UuZHJhd0VjaGFydChlY2hhcnRTZXJ2aWNlLmVjaGFydFBpbGVCYXJPcHRpb24oZm9ybWF0RGF0YSksICdnZW5lcmFsLTInKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+a1gemHj+e7n+iuoeaKmOe6v+Wbvua4suafk1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdEZsb3dEYXRhTGlzdChvcmlnaW5hbERhdGE6IEZsb3dSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgYXJlYU5hbWU6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IGZsb3dOdW06IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIG9yaWdpbmFsRGF0YS5HUk9VUF9CWV9PTkVEQVkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogRmxvd0dyb3VwQnlPbmVEYXksIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIGFyZWFOYW1lLnB1c2goaXRlbS5zdHJIb3VyKTtcclxuICAgICAgICAgICAgICAgIGZsb3dOdW0ucHVzaChpdGVtLmZsb3dOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOiBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzMlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzQlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJ+S7iuWkqScsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgeEF4aXNUeXBlOiAnY2F0ZWdvcnknLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IFsnIzI2OWRmYSddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6IGFyZWFOYW1lLFxyXG4gICAgICAgICAgICAgICAgLy/mlbDmja5cclxuICAgICAgICAgICAgICAgIHNob3dEYXRhOiBmbG93TnVtXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVjaGFydFNlcnZpY2UuZHJhd0VjaGFydChlY2hhcnRTZXJ2aWNlLmVjaGFydExpbmVPcHRpb24oZm9ybWF0RGF0YSksICdnZW5lcmFsLTMnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+eUqOaIt+e7n+iuoeWchueOr+Wbvua4suafk1xyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdFVzZXJEYXRhTGlzdChvcmlnaW5hbERhdGE6IFVzZXJSZXNwb25zZSkge1xyXG4gICAgICAgICAgICBsZXQgeEF4aXNEYXRhOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgICAgIGxldCB1c2VyTnVtOiBBcnJheTxvYmplY3Q+ID0gW107XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0FSRUEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogVXNlckdyb3VwQnlBcmVhLCBpbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeEF4aXNEYXRhLnB1c2goaXRlbS5hcmVhTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlck51bS5wdXNoKHtuYW1lOiBpdGVtLmFyZWFOYW1lLCB2YWx1ZTogaXRlbS5hbGxVc2VyTnVtfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOiBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBzZXJpZXNOYW1lOiAn55So5oi35pWwJyxcclxuICAgICAgICAgICAgICAgIC8veOi9tOaVsOaNrlxyXG4gICAgICAgICAgICAgICAgeEF4aXNEYXRhOiB4QXhpc0RhdGEsXHJcbiAgICAgICAgICAgICAgICAvL+aVsOaNrlxyXG4gICAgICAgICAgICAgICAgc2hvd0RhdGE6IHVzZXJOdW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWNoYXJ0U2VydmljZS5kcmF3RWNoYXJ0KGVjaGFydFNlcnZpY2UuZWNoYXJ0UGllT3B0aW9uKGZvcm1hdERhdGEpLCAnZ2VuZXJhbC00Jyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/ljLrln5/mo4DntKLnu5/orqHlnIbmn7Hlm77muLLmn5NcclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRTZWFyY2hEYXRhTGlzdChvcmlnaW5hbERhdGE6IFNlYXJjaFJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGxldCB4QXhpc0RhdGE6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgICAgbGV0IHNlYXJjaE51bTogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgb3JpZ2luYWxEYXRhLkdST1VQX0JZX0FSRUEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbTogU2VhcmNoR3JvdXBCeUFyZWEsIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgIHhBeGlzRGF0YS5wdXNoKGl0ZW0uYXJlYU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoTnVtLnB1c2goaXRlbS5yZXRyaWV2YWxOdW0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmb3JtYXREYXRhOiBvYmplY3QgPSB7XHJcbiAgICAgICAgICAgICAgICBncmlkTGVmdDogJzUlJyxcclxuICAgICAgICAgICAgICAgIGdyaWRSaWdodDogJzUlJyxcclxuICAgICAgICAgICAgICAgIHhBeGlzTmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICB5QXhpc05hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgbGFiZWxTaG93OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBbJyMyNjlkZmEnLCAnIzI2OWRmYSddLFxyXG4gICAgICAgICAgICAgICAgLy946L205pWw5o2uXHJcbiAgICAgICAgICAgICAgICB4QXhpc0RhdGE6IHhBeGlzRGF0YSxcclxuICAgICAgICAgICAgICAgIC8v5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBzaG93RGF0YTogc2VhcmNoTnVtXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVjaGFydFNlcnZpY2UuZHJhd0VjaGFydChlY2hhcnRTZXJ2aWNlLmVjaGFydEJhck9wdGlvbihmb3JtYXREYXRhKSwgJ2dlbmVyYWwtNScpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0b3RhbEdlbmVyYWxDb250cm9sbGVyJywgVG90YWxHZW5lcmFsQ29udHJvbGxlcik7Il19
