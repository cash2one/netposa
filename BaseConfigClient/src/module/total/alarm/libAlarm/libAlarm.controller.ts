/**
 * Created by dell on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service"
import "../../../common/services/total.service"

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"
import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {AlarmResponse,AlarmGroupByBizLib} from "../../totalFactory/totalResponse"

import "angular";
import "echarts";
declare let require: any;
let echarts = require("echarts");

class SearchParams {
    duration: string;
    startTime:string;
    endTime:string;
    groupType:string;
}

class LibAlarmController {
    static $inject = ['$scope', 'totalService','echartService','$timeout'];

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

    // 数据分页
    dataPaging:Function;
    //当前页数
    currentPage:number;
    //每页展示数
    pageSize:number;

    //上一个
    prePage: Function;

    //下一个
    nextPage: Function;

    constructor($scope: any, totalService: ITotalService, echartService:IEchartService,$timeout:any) {
        let vm = this;

        vm.formatDataList = formatDataList;
        vm.changeTimeBtn = changeTimeBtn;
        vm.showCustomTime = showCustomTime;

        //默认值
        vm.startTime = '';
        vm.duration = 'THIRY_DAYS';
        vm.endTime = '';
        vm.isNoData = true;

        vm.dataPaging = dataPaging;
        vm.currentPage = 1;
        vm.pageSize =15;

        vm.prePage = prePage;
        vm.nextPage = nextPage;

        // 向后台传的参数
        function _getSearchParams():Array<SearchParams>{
            let result = new SearchParams();

            result.duration = vm.duration;
            result.startTime = vm.startTime;
            result.endTime = vm.endTime;
            result.groupType = "GROUP_BY_BIZLIB";
            console.log('传参',result);
            return [result];
        }

        //获取数据列表
        function getDataList(){
            totalService.getAlarmDataList(_getSearchParams()).then(complete);
            function complete(rep:ResponseResult<AlarmResponse>){
                console.log('设备报警请求成功',rep);
                if(rep.code === 200 && rep.data){
                    vm.isNoData = false;
                    formatDataList(rep.data);
                }else{
                    vm.isNoData = true;
                }
            }
        }

        getDataList();

        // 数据分页 根据页数展示对应数据
        function dataPaging(formatData:Array<any>,currentPage:number){
            //总数据条数
            let allData:number = formatData.length;
            //数据总页数
            let pageNumber:number = Math.ceil(allData / vm.pageSize);
            //每次展示的数据
            let showArr:Array<any> = [];

            if(currentPage < 1){
                currentPage = 1;
                vm.currentPage = 1;
            } else if(currentPage > pageNumber){
                currentPage = pageNumber;
                vm.currentPage = pageNumber;
            }

            for (let i = (currentPage - 1) * vm.pageSize; i < vm.pageSize * currentPage; i++) {
                if(formatData[i] !== undefined){
                    showArr.push(formatData[i]);
                }
            }

            console.log('数据分页',showArr)
            return showArr;
        }

        // 设备报警数据切换 上一页
        function prePage(){
            vm.currentPage--;
            getDataList();
        }

        // 设备报警数据切换 下一页
        function nextPage(){
            vm.currentPage++;
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

        //库警数图表渲染
        function formatDataList(originalData:AlarmResponse){
            let xAxisData:Array<any> = [];
            let allNum:Array<any> = [];
            let onlineNum:Array<any> = [];

            let showArr:Array<object> = dataPaging(originalData.GROUP_BY_BIZLIB,vm.currentPage);
            console.log('库警数',vm.currentPage);

            showArr.forEach(function (item:AlarmGroupByBizLib, index:number) {
                xAxisData.push(item.bizLib);
                allNum.push(item.allAlarmNum);
                onlineNum.push(item.validAlarmNum);
            });

            let formatData:object ={
                seriesNameOne:'全部',
                seriesNameTwo:'有效',
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '',
                yAxisName: '',
                colorTwo: ['#8cdcff'],
                colorOne: ['#40c4ff'],
                //x轴数据
                xAxisData:xAxisData,
                //全部数据
                allNum:allNum,
                //有效或运行数据
                onlineNum:onlineNum
            };

            echartService.drawEchart(echartService.echartPileBarOption(formatData),'alarm-4');
        }
    }
}

app.controller('libAlarmController', LibAlarmController);