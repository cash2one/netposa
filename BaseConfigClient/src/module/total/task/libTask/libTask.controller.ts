/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../../common/app/main.app";

import {ITotalService} from "../../../common/services/total.service";
import "../../../common/services/total.service";

import {IEchartService} from "../../totalFactory/doEcharts"
import "../../totalFactory/doEcharts"

import {ResponseResult} from "../../../../core/params/result/ResponseResult";
import {TaskGroupByBizLib, TaskResponse} from "../../totalFactory/totalResponse"

import {ITreeDataParams, TreeDataParams} from "../../../common/directive/tree/tree-params";
import {AreaEx} from "../../../../core/entity/ex/AreaEx";
import {IAreaService} from "../../../common/services/area.service";
import '../../../common/services/area.service';

import "echarts";
declare let require: any;
let echarts = require("echarts");

class SearchParams {
    areaCode: string;
    groupType:string;
}

class LibTaskController{
    static $inject = ["$scope","totalService","echartService",'areaService','$timeout'];

    //格式化数据
    formatDataList:Function;

    //区域树
    areaTreeDataParams:ITreeDataParams<AreaEx>;
    //展示区域树
    isShowAreaTree:boolean;

    //区域名
    areaName:string;
    //区域code
    areaCode:string;

    //无数据时展示
    isNoData:boolean;

    constructor($scope: any, totalService:ITotalService, echartService:IEchartService,areaService:IAreaService, $timeout:any){
        var vm = this;

        vm.formatDataList = formatDataList;

        //默认值
        vm.areaCode = '';
        vm.isNoData = true;

        // 向后台传的参数
        function _getSearchParams():Array<SearchParams>{
            let result = new SearchParams();

            result.areaCode = vm.areaCode;
            result.groupType = "GROUP_BY_BIZLIB";
            console.log('传参',result);
            return [result];
        }

        //获取数据列表
        function getDataList(){
            totalService.getAlarmDataList(_getSearchParams()).then(complete);
            function complete(rep:ResponseResult<TaskResponse>){
                console.log('库任务请求成功',rep);
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
        vm.areaTreeDataParams.treeId = 'areaTreeLibTask';
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
            getDataList();
            //为了触发脏检查 更新视图
            $timeout(()=> {
                $scope.$apply();
            });
        }

        // 布控库任务数图表配置渲染
        function formatDataList(originalData:TaskResponse) {
            let xAxisData:Array<any> = [];
            let allNum:Array<any> = [];
            let onlineNum:Array<any> = [];

            originalData.GROUP_BY_BIZLIB.forEach(function (item:TaskGroupByBizLib, index:number) {
                xAxisData.push(item.bizLib);
                allNum.push(item.allTaskNum);
                onlineNum.push(item.onlineTaskNum);
            });

            let formatData:object ={
                seriesNameOne:'全部',
                seriesNameTwo:'运行',
                gridLeft: '5%',
                gridRight: '5%',
                xAxisName: '库',
                yAxisName: '任务数',
                colorTwo: ['#7cc3fb'],
                colorOne: [ '#269cf9'],
                //x轴数据
                xAxisData:xAxisData,
                //全部数据
                allNum:allNum,
                //有效或运行数据
                onlineNum:onlineNum
            };
            echartService.drawEchart(echartService.echartPileBarOption(formatData),'task-2');
        }
    }
}

app.controller('libTaskController', LibTaskController);