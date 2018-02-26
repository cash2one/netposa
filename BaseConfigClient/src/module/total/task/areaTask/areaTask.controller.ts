/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service";
import "../../../common/services/total.service";

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"

import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {TaskGroupByArea, TaskResponse} from "../../totalFactory/totalResponse"

import "echarts";
declare let require: any;
let echarts = require("echarts");

class SearchParams {
    duration: string;
    startTime:string;
    endTime:string;
    groupType:string;
}

class AreaTaskController{
    static $inject = ["$scope","totalService","echartService",'$timeout'];

    //格式化数据
    formatDataList:Function;

    //切换报警类型展示对应数据
    changeAlarmType:Function;

    //切换不同时间按钮
    changeTimeBtn:Function;

    //展示自定义时间段数据
    showCustomTime:Function;

    //开始时间
    startTime:string;
    //结束时间
    endTime:string;
    //报警类型
    alarmType:string;
    //时间段
    duration:string;

    //无数据时展示
    isNoData:boolean;


    constructor($scope: any, totalService:ITotalService, echartService:IEchartService,$timeout:any){
        let vm = this;

        vm.formatDataList = formatDataList;

        vm.changeTimeBtn = changeTimeBtn;
        vm.showCustomTime = showCustomTime;

        //默认值
        vm.alarmType = 'ALL';
        vm.duration = 'THIRY_DAYS';
        vm.startTime = '';
        vm.endTime = '';
        vm.isNoData = true;

        // 向后台传的参数
        function _getSearchParams():Array<SearchParams>{
            let result = new SearchParams();

            result.duration = vm.duration;
            result.startTime = vm.startTime;
            result.endTime = vm.endTime;
            result.groupType = "GROUP_BY_AREA";
            console.log('传参',result);
            return [result];
        }

        //获取数据列表
        function getDataList(){
            totalService.getTaskDataList(_getSearchParams()).then(complete);
            function complete(rep:ResponseResult<TaskResponse>){
                console.log('区域任务请求成功',rep);
                if(rep.code === 200 && rep.data){
                    vm.isNoData = false;
                    formatDataList(rep.data);
                }else{
                    vm.isNoData = true;
                }
            }
        }

        getDataList();

        //点击不同时间段按钮
        function changeTimeBtn(duration:string){
            vm.duration = duration;
            console.log('按钮',vm.duration)
            getDataList();
        }

        //自定义时间
        function showCustomTime(){
            console.log('自定义时间开始',vm.startTime);
            console.log('自定义时间结束',vm.endTime);
            vm.duration = "CUSTOMIZE";
            getDataList();
        }

        //区域分布任务数图表配置渲染
        function formatDataList(originalData:TaskResponse) {
            let xAxisData:Array<any> = [];
            let allNum:Array<any> = [];
            let onlineNum:Array<any> = [];

            originalData.GROUP_BY_AREA.forEach(function (item:TaskGroupByArea, index:number) {
                xAxisData.push(item.areaName);
                allNum.push(item.allTaskNum);
                onlineNum.push(item.onlineTaskNum);
            });

            let formatData:object ={
                seriesNameOne:'全部',
                seriesNameTwo:'运行',
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '区域',
                yAxisName: '任务数',
                colorTwo: ['#bac5ff', '#8cdcff', '#fddc68', '#ffa765', '#c5a7fa', '#bfe66d', '#6ae4d9'],
                colorOne: ['#8c9eff', '#40c4ff', '#f8c304', '#ff6d00', '#9f6cf7', '#95d60b', '#06cfbe'],
                //x轴数据
                xAxisData:xAxisData,
                //全部数据
                allNum:allNum,
                //有效或运行数据
                onlineNum:onlineNum
            };
            echartService.drawEchart(echartService.echartPileBarOption(formatData),'task-1');
        }

    }
}

app.controller('areaTaskController', AreaTaskController);