/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service"
import "../../../common/services/total.service"

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"

import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {SearchResponse,SearchGroupByArea} from "../../totalFactory/totalResponse"

import "angular";
import "echarts";
declare let require: any;
let echarts = require("echarts");

class SearchParams {
    retrievalType:string;
    duration: string;
    startTime:string;
    endTime:string;
    groupType:string;
}


class AreaSearchController{
    static $inject = ['$scope', 'totalService','echartService','$timeout'];

    //格式化数据
    formatDataList:Function;

    //切换不同事由检索
    changeCauseBtn:Function;

    //切换不同时间按钮
    changeTimeBtn:Function;

    //展示自定义时间段数据
    showCustomTime:Function;

    //事由
    retrievalType:string;
    //开始时间
    startTime:string;
    //结束时间
    endTime:string;
    //时间段
    duration:string;

    //无数据时展示
    isNoData:boolean;


    constructor($scope: any, totalService: ITotalService, echartService:IEchartService,$timeout:any) {
        let vm = this;

        vm.formatDataList = formatDataList;
        vm.changeCauseBtn = changeCauseBtn;
        vm.changeTimeBtn = changeTimeBtn;
        vm.showCustomTime = showCustomTime;

       //默认值
       vm.retrievalType = '';
       vm.duration = 'THIRY_DAYS';
       vm.startTime = '';
       vm.endTime = '';
       vm.isNoData = false;

        // 向后台传的参数
        function _getSearchParams():Array<SearchParams>{
            let result = new SearchParams();

            result.retrievalType = vm.retrievalType;
            result.duration = vm.duration;
            result.startTime = vm.startTime;
            result.endTime = vm.endTime;
            result.groupType = "GROUP_BY_AREA";
            console.log('传参',result);
            return [result];
        }

        //获取数据列表
        function getDataList(){
            totalService.getSearchDataList(_getSearchParams()).then(complete);
            function complete(rep:ResponseResult<SearchResponse>){
                console.log('不同事由检索请求成功',rep);
                if(rep.code === 200 && rep.data){
                    vm.isNoData = false;
                    formatDataList(rep.data);
                }else{
                    vm.isNoData = true;
                }
            }
        }

        getDataList();

        //切换不同事由检索
        function changeCauseBtn(retrievalType:string){
            console.log('事由',retrievalType);
            vm.retrievalType = retrievalType;
            getDataList();
        }

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

        //不同区域检索数图表配置渲染
        function formatDataList(originalData:SearchResponse) {
            let searchNum:Array<any> = [];
            let area:Array<any> = [];

            originalData.GROUP_BY_AREA.forEach(function (item:SearchGroupByArea, index:number) {
                area.push(item.areaName);
                searchNum.push(item.retrievalNum);
            });

            let formatData:object ={
                seriesName:'检索数',
                gridLeft: '25%',
                gridRight: '25%',
                xAxisName: '区域',
                yAxisName: '检索数',
                labelShow: false,
                color: ['#8c9eff', '#40c4ff', '#f8c304', '#ff6d00', '#9f6cf7', '#95d60b', '#06cfbe'],
                //x轴数据
                xAxisData:area,
                //数据
                showData:searchNum
            };
            echartService.drawEchart(echartService.echartBarOption(formatData),'search-2');
        }
    }
}


app.controller('areaSearchController', AreaSearchController);
