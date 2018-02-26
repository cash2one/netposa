/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service"
import "../../../common/services/total.service"

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"

import {ResponseResult} from "../../../../core/params/result/ResponseResult"
import {FlowResponse,FlowGroupByArea} from "../../totalFactory/totalResponse"

import "echarts";
declare let require: any;
let echarts = require("echarts");


class SearchParams {
    duration: string;
    startTime:string;
    endTime:string;
    groupType:string;
}

class AreaFlowController{
    static $inject = ["$scope", "totalService","echartService",'$timeout'];

    //格式化数据
    formatDataList:Function;

    //切换不同时间按钮
    changeTimeBtn:Function;

    //展示自定义时间段数据
    showCustomTime:Function;


    //开始时间
    startTime:string;
    //结束时间
    endTime:string;
    //区域名
    areaName:string;
    //区域code
    areaCode:string;
    //时间段
    duration:string;

    //无数据时展示
    isNoData:boolean;

    constructor($scope: any, totalService: ITotalService, echartService:IEchartService,$timeout:any) {
        let vm = this;

        vm.formatDataList = formatDataList;
        vm.changeTimeBtn = changeTimeBtn;
        vm.showCustomTime = showCustomTime;


            //默认值
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
            totalService.getFlowDataList(_getSearchParams()).then(complete);
            function complete(rep:ResponseResult<FlowResponse>){
                console.log('区域流量请求成功',rep);
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
            console.log('按钮',vm.duration);
            getDataList();
        }

        //自定义时间
        function showCustomTime(){
            console.log('自定义时间开始',vm.startTime);
            console.log('自定义时间结束',vm.endTime);
            vm.duration = "CUSTOMIZE";
            getDataList();
        }

        //各区分布流量数图表渲染
        function formatDataList(originalData:FlowResponse) {
            let xAxisData:Array<any> = [];
            let userNum:Array<any> = [];

            originalData.GROUP_BY_AREA.forEach(function (item:FlowGroupByArea, index:number) {
                xAxisData.push(item.areaName);
                userNum.push(item.flowNum);
            });

            let formatData:object ={
                seriesName:'流量数',
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '区域',
                yAxisName: '流量数',
                labelShow: true,
                color:['#269dfa','#269dfa'],
                //x轴数据
                xAxisData:xAxisData,
                //数据
                showData:userNum
            };

            echartService.drawEchart(echartService.echartBarOption(formatData),'flow-1');
        };

    }
}

app.controller('areaFlowController', AreaFlowController);