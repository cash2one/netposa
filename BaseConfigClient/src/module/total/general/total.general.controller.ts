/**
 * Created by dell on 2017/4/21.
 */

import {app} from "../../common/app/main.app";
import RouterService from "../../common/router/router.service";

import {IRouterConfig} from "../../common/router/router";

import {ITotalService} from "../../common/services/total.service"
import "../../common/services/total.service"

import {IEchartService} from "../totalFactory/doEcharts"
import "../totalFactory/doEcharts"

import {ResponseResult} from "../../../core/params/result/ResponseResult";

import {
    DeviceResponse,
    TaskResponse,
    TaskGroupByArea,
    TaskGroupBySratus,
    AlarmResponse,
    AlarmGroupByArea,
    FlowResponse,
    FlowGroupByOneDay,
    FlowGroupByArea,
    UserResponse,
    UserGroupByArea,
    SearchResponse,
    SearchGroupByArea,
    DeviceGroupByType
} from "../totalFactory/totalResponse"

import "angular";
declare let require: any;
declare let angular: any;
let echarts = require("echarts");

class TotalGeneralController {
    static $inject = ["$scope", "totalService", "echartService"];

    moduleItems: Array<IRouterConfig>;

    //任务统计
    formatTaskDataList: Function;
    //报警统计
    formatAlarmDataList: Function;
    //流量统计
    formatFlowDataList: Function;
    //用户统计
    formatUserDataList: Function;
    //区域检索统计
    formatSearchDataList: Function;

    //总摄像机
    allCamera: DeviceGroupByType;
    //普通摄像机
    normalCamera: DeviceGroupByType;
    //人体摄像机
    bodyCamera: DeviceGroupByType;
    //人脸摄像机
    faceCamera: DeviceGroupByType;
    //人像摄像机
    videoCamera: DeviceGroupByType;


    //总任务数
    allTaskNum: number;
    //在线
    onlineTaskNum: number;
    //审核中
    verifingTaskNum: number;
    //已过期
    overdueTaskNum: number;
    //总报警数
    allAlarmNum: number;
    //有效报警数
    onlineAlarmNum: number;
    //无效报警数
    invalidAlarmNum: number;
    //未处理
    undisposedAlarmNum: number;
    //流量总计
    allFlowNum: number;
    //各区域流量数组
    areaFlowArr: Array<object>;
    //用户总计
    allUserNum: number;
    //用户在线
    onlineUserNum: number;
    //用户离线
    unlineUserNum: number;
    //总检索数
    allSearchNum: number;

    //无数据时展示
    taskNoData:boolean;
    alarmNoData:boolean;
    flowNoData:boolean;
    userNoData:boolean;
    searchNoData:boolean;

    constructor($scope: any, totalService: ITotalService, echartService: IEchartService) {
        console.log("进入genernal界面");
        let vm = this;

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


        //设备统计
        function getCameraData() {
            totalService.getCameraDataList([
                {
                    "captureType": "ALL",
                    "groupType": "GROUP_BY_TYPE"
                }
            ]).then(complete);
            function complete(rep: ResponseResult<DeviceResponse>) {
                console.log('摄像机',rep)
                if (rep.code === 200 && rep.data) {
                    rep.data.GROUP_BY_TYPE.forEach(function (item: DeviceGroupByType) {
                        if (item.captureType === '摄像机总数') {
                            //总摄像机
                            vm.allCamera = item;
                        } else if (item.captureType === '普通') {
                            vm.normalCamera = item;
                        } else if (item.captureType === '人像') {
                            vm.videoCamera = item;
                        } else if (item.captureType === 'body') {
                            vm.bodyCamera = item;
                        } else if (item.captureType === '') {
                            vm.faceCamera = item;
                        }
                    })
                }
            }
        }
        getCameraData();

        //任务统计
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
            function complete(rep: ResponseResult<TaskResponse>) {
                if (rep.code === 200 && rep.data) {
                    console.error('任务统计获取数据成功', rep);
                    formatTaskDataList(rep.data);
                    rep.data.GROUP_BY_STATUS.forEach(function (item: TaskGroupBySratus) {
                        vm.allTaskNum += item.allTaskNum;
                        vm.onlineTaskNum += item.onlineTaskNum;
                        vm.verifingTaskNum += item.verifingTaskNum;
                        vm.overdueTaskNum += item.overdueTaskNum;
                    });
                    vm.taskNoData = false;
                }else{
                    vm.taskNoData = true;
                }
            }
        }
        getTaskData();

        //报警统计
        function getAlarmData() {
            totalService.getAlarmDataList([
                {
                    "alarmType": "ALL",
                    "duration": 'ALL',
                    "groupType": "GROUP_BY_AREA"
                }
            ]).then(complete);
            function complete(rep: ResponseResult<AlarmResponse>) {
                if (rep.code === 200 && rep.data) {
                    console.error('报警统计获取数据成功', rep);
                    formatAlarmDataList(rep.data);
                    //初始化总报警数、有效报警数
                    rep.data.GROUP_BY_AREA.forEach(function (item: AlarmGroupByArea) {
                        vm.allAlarmNum += item.allAlarmNum;
                        vm.onlineAlarmNum += item.validAlarmNum;
                        vm.invalidAlarmNum += item.invalidAlarmNum;
                        vm.undisposedAlarmNum += item.undisposedAlarmNum;
                    });
                    vm.alarmNoData = false;
                }else{
                    vm.alarmNoData = true;
                }
            }
        }
        getAlarmData();

        //流量统计
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
            function complete(rep: ResponseResult<FlowResponse>) {
                if (rep.code === 200 && rep.data) {
                    // console.error('流量统计获取数据成功', rep.Data);
                    formatFlowDataList(rep.data);
                    //初始化总报警数、有效报警数
                    let i: number = 0;
                    rep.data.GROUP_BY_AREA.forEach(function (item: FlowGroupByArea) {
                        vm.allFlowNum += item.flowNum;
                        if (i < 10) {
                            vm.areaFlowArr.push(item)
                        }
                        i++;
                    });
                    vm.flowNoData = false;
                }else{
                    vm.flowNoData = true;
                }
            }
        }
        getFlowData();

        //用户统计
        function getUserData() {
            totalService.getUserDataList([
                {
                    "duration": 'ALL',
                    "groupType": "GROUP_BY_AREA"
                }
            ]).then(complete);
            function complete(rep: ResponseResult<UserResponse>) {
                if (rep.code === 200 && rep.data) {
                    // console.error('用户统计获取数据成功', rep);
                    formatUserDataList(rep.data);
                    rep.data.GROUP_BY_AREA.forEach(function (item: UserGroupByArea) {
                        vm.allUserNum += item.allUserNum;
                        vm.onlineUserNum += item.onlineUserNum;
                    });
                    vm.unlineUserNum = vm.allUserNum - vm.onlineUserNum;
                    vm.userNoData = false;
                }else{
                    vm.userNoData = true;
                }
            }
        }
        getUserData();

        //检索统计
        function getSearchData() {
            totalService.getSearchDataList([
                {
                    "duration": 'ALL',
                    "groupType": "GROUP_BY_AREA"
                }
            ]).then(complete);
            function complete(rep: ResponseResult<SearchResponse>) {
                if (rep.code === 200 && rep.data) {
                    // console.error('检索统计获取数据成功', rep);
                    formatSearchDataList(rep.data);
                    rep.data.GROUP_BY_AREA.forEach(function (item: SearchGroupByArea) {
                        vm.allSearchNum += item.retrievalNum;
                    });
                    vm.searchNoData = false;
                }else{
                    vm.searchNoData = true;
                }
            }
        }
        getSearchData();


        //任务统计圆环图渲染
        function formatTaskDataList(originalData: TaskResponse) {
            let xAxisData: Array<any> = [];
            let taskNum: Array<object> = [];
            let i: number = 0;
            originalData.GROUP_BY_AREA.forEach(function (item: TaskGroupByArea, index: number) {
                //外框太小，限制展示数量
                if (i <= 7) {
                    xAxisData.push(item.areaName);
                    taskNum.push({name: item.areaName, value: item.allTaskNum});
                }
                i++;
            });

            let formatData: object = {
                seriesName: '任务数',
                //x轴数据
                xAxisData: xAxisData,
                //数据
                showData: taskNum
            };
            echartService.drawEchart(echartService.echartPieOption(formatData), 'general-1');
        };

        //报警统计堆叠柱形图渲染
        function formatAlarmDataList(originalData: AlarmResponse) {
            let areaName: Array<any> = [];
            let allAreaNum: Array<any> = [];
            let onlineAreaNum: Array<any> = [];

            originalData.GROUP_BY_AREA.forEach(function (item: AlarmGroupByArea, index: number) {
                areaName.push(item.areaName);
                allAreaNum.push(item.allAlarmNum);
                onlineAreaNum.push(item.validAlarmNum);
            });

            let formatData: object = {
                seriesNameOne: '全部',
                seriesNameTwo: '有效',
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '',
                yAxisName: '',
                colorTwo: ['#7dc4fb'],
                colorOne: ['#269dfa'],
                //x轴数据
                xAxisData: areaName,
                //数据
                allNum: allAreaNum,
                onlineNum: onlineAreaNum
            };
            echartService.drawEchart(echartService.echartPileBarOption(formatData), 'general-2');
        };

        //流量统计折线图渲染
        function formatFlowDataList(originalData: FlowResponse) {
            let areaName: Array<any> = [];
            let flowNum: Array<any> = [];

            originalData.GROUP_BY_ONEDAY.forEach(function (item: FlowGroupByOneDay, index: number) {
                areaName.push(item.strHour);
                flowNum.push(item.flowNum);
            });

            let formatData: object = {
                gridLeft: '3%',
                gridRight: '4%',
                xAxisName: '今天',
                yAxisName: '',
                xAxisType: 'category',
                color: ['#269dfa'],
                //x轴数据
                xAxisData: areaName,
                //数据
                showData: flowNum
            };
            echartService.drawEchart(echartService.echartLineOption(formatData), 'general-3');
        };

        //用户统计圆环图渲染
        function formatUserDataList(originalData: UserResponse) {
            let xAxisData: Array<any> = [];
            let userNum: Array<object> = [];
            let i: number = 0;

            originalData.GROUP_BY_AREA.forEach(function (item: UserGroupByArea, index: number) {

                if (i < 7) {
                    xAxisData.push(item.areaName);
                    userNum.push({name: item.areaName, value: item.allUserNum});
                }

                i++;
            });

            let formatData: object = {
                seriesName: '用户数',
                //x轴数据
                xAxisData: xAxisData,
                //数据
                showData: userNum
            };
            echartService.drawEchart(echartService.echartPieOption(formatData), 'general-4');
        };

        //区域检索统计圆柱图渲染
        function formatSearchDataList(originalData: SearchResponse) {
            let xAxisData: Array<any> = [];
            let searchNum: Array<any> = [];

            originalData.GROUP_BY_AREA.forEach(function (item: SearchGroupByArea, index: number) {
                xAxisData.push(item.areaName);
                searchNum.push(item.retrievalNum);
            });

            let formatData: object = {
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '',
                yAxisName: '',
                labelShow: false,
                color: ['#269dfa', '#269dfa'],
                //x轴数据
                xAxisData: xAxisData,
                //数据
                showData: searchNum
            };
            echartService.drawEchart(echartService.echartBarOption(formatData), 'general-5');
        };
    }
}

app.controller('totalGeneralController', TotalGeneralController);