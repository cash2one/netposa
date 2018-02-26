/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service"
import "../../../common/services/total.service"

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"

import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {SearchResponse,SearchGroupByRetrievalReason} from "../../totalFactory/totalResponse"

import {ITreeDataParams, TreeDataParams} from "../../../common/directive/tree/tree-params";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {IAreaService} from "../../../common/services/area.service";
import '../../../common/services/area.service';

import "angular";
import "echarts";
declare let require: any;
let echarts = require("echarts");

class SearchParams {
    areaCode: string;
    duration: string;
    startTime:string;
    endTime:string;
    groupType:string;
}

class CauseSearchController{
    static $inject = ['$scope', 'totalService','echartService','areaService','$timeout'];

    //格式化数据
    formatDataList:Function;

    //切换不同时间按钮
    changeTimeBtn:Function;

    //展示自定义时间段数据
    showCustomTime:Function;

    //区域树
    areaTreeDataParams:ITreeDataParams<AreaEx>;
    //展示区域树
    isShowAreaTree:boolean;

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

    constructor($scope: any, totalService: ITotalService, echartService:IEchartService,areaService:IAreaService, $timeout:any) {
        let vm = this;

        vm.formatDataList = formatDataList;
        vm.changeTimeBtn = changeTimeBtn;
        vm.showCustomTime = showCustomTime;

        //默认值
        vm.areaCode = '';
        vm.duration = 'THIRY_DAYS';
        vm.startTime = '';
        vm.endTime = '';
        vm.isNoData = true;

        // 向后台传的参数
        function _getSearchParams():Array<SearchParams>{
            let result = new SearchParams();

            result.areaCode = vm.areaCode;
            result.duration = vm.duration;
            result.startTime = vm.startTime;
            result.endTime = vm.endTime;
            result.groupType = "GROUP_BY_RETRIEVAL_REASON";
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

        // 初始化区域树
        vm.areaTreeDataParams = new TreeDataParams<AreaEx>();
        vm.areaTreeDataParams.treeId = 'areaTreeCauseSearch';
        vm.areaTreeDataParams.isDefaultSelected = true;
        vm.areaTreeDataParams.onClick = treeSelectNode;

        // 获取区域树数据
        function getTreeList(){
            areaService.findListTree().then(complete);
            function complete(result: Array<AreaEx>) {
                $timeout(function () {
                    vm.areaTreeDataParams.treeDatas = result;
                });
            }
        }

        getTreeList();


        // 点击当前节点时获取节点信息
        function treeSelectNode(event: MouseEvent, treeId: string, treeNode: any) {
            //区域Code
            vm.areaCode = treeNode.Code;
            //区域名
            vm.areaName = treeNode.Name;
            vm.isShowAreaTree = false;
            vm.duration = 'THIRY_DAYS';
            getDataList();
            //为了触发脏检查 更新视图
            $timeout(()=> {
                $scope.$apply();
            });
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



        //不同事由检索数图表配置渲染
        function formatDataList(originalData:SearchResponse) {
            let searchNum:Array<any> = [];
            let Cause:Array<any> = [];

            originalData.GROUP_BY_RETRIEVAL_REASON.forEach(function (item:SearchGroupByRetrievalReason, index:number) {
                Cause.push(item.retrievalReason);
                searchNum.push(item.retrievalNum);
            });

            let formatData:object ={
                seriesName:'检索数',
                gridLeft: '25%',
                gridRight: '25%',
                xAxisName: '事由',
                yAxisName: '检索数',
                labelShow: false,
                color: ['#8c9eff', '#40c4ff', '#f8c304', '#ff6d00', '#9f6cf7', '#95d60b', '#06cfbe'],
                //x轴数据
                xAxisData:Cause,
                //数据
                showData:searchNum
            };

            echartService.drawEchart(echartService.echartBarOption(formatData),'search-1');
        }
    }
}

app.controller('causeSearchController', CauseSearchController);
