/**
 * created by Zyh 2017 06 03  动态布控-左侧边栏
 */

/// <amd-dependency path="text!../mainRight/alarmVideoPopup.html" name="alarmVideoHtml" />

import {app} from "../../common/app/main.app";
import "angular";

//引入预处理模板TS文件
import "../mainRight/alarmVideo.controller";

//区域树
import '../../common/services/area.service';
import {IAreaService} from "../../common/services/area.service";
//枚举
import {enumData} from "../dynamicControlEnum";
import {AreaEx} from "../../../core/entity/ex/AreaEx";
import {CameraEx} from "../../../core/entity/ex/CameraEx";

//任务接口
import "../../common/services/dynamicControl.service";

//中间传值服务
import "../dynamicControl.cache.factory";
import {IDynamicControlCacheFactory} from "../dynamicControl.cache.factory";


declare  var angular : any;
declare let alarmVideoHtml : any;


//2个类型合成一个新类型
type AreaCameraEx = AreaEx & CameraEx;


class MainLeftController {

    //左侧栏-顶部tab切换
    moduleState : string = 'resource';
    tabsChange : Function;

    //任务状态栏筛选条件选择
    pickWay : Function;
    pickState : string = "area";
    //missionData : any;

    //资源模块 警力-摄像机
    resourcesType : Object  = enumData.resources;
    typeChecked : string;
    resourcesTypeClick : Function;

    //请求摄像机树结构数据
    camerasData : any;
    camerasId : string;



    //资源搜索
    resourcesSearch : Function;
    rSearchKey : string;
    //tree click
    treeClick : Function;
    //tree dblClick
    treeDblClick : Function;
    // tree location
    diyLocation : Function;
    // tree attention
    diyAttention : Function;

    //任务搜索
    missionSerach : Function;
    mSerachKey : string;

    static $inject : Array<string> = ['$scope' ,'$http' ,'areaService' ,'$timeout' ,'dynamicControlCacheFactory' ,'layer'];

    constructor($scope : any,  $http : any, areaService : IAreaService, $timeout : any ,private dynamicControlCacheFactory:IDynamicControlCacheFactory ,layer : any) {
        let vm = this;

       $http({
            method : "get",
            url : "/fds/videoTask/search"
        }).then(function(data:any){
            console.log(data);
        })

       // console.log("55555555555555555555");
        //console.log(missionDatas.getMission());
        //请求摄像机树结构数据
        vm.camerasId = 'cameras';
        areaService.findAreaCameraTree().then((data : Array<AreaCameraEx> )=>{
            vm.camerasData = data;
            console.log(data);
        });


        //click 左侧栏-顶部tab切换
        vm.tabsChange = (state : string) => {
            vm.moduleState = state;

        };

        /*暂无警力 //click 资源模块 警力-摄像机
        vm.resourcesTypeClick = () => {
            //vm.typeChecked
            console.log(vm.typeChecked);
        };*/

        //资源模块-搜索
        vm.resourcesSearch = () => {
            console.log(vm.rSearchKey);
        };


        //任务状态栏帅选条件选择
        vm.pickWay = (state : string) => {
            vm.pickState = state;
        };

        //任务模块-搜索
        vm.missionSerach = () => {
            console.log(vm.mSerachKey);
        };



        //tree click
        vm.treeClick = (event:any, treeId:string, treeNode:{}) => {
            console.log('摄像机---单击');
            console.log(event);
            console.log(treeId);
            console.log(treeNode);
            //angular.element('#'+treeNode.tId)
        };

        //tree DblClick
        vm.treeDblClick = (event:any, treeId:any, treeNode:any) => {
            console.log('摄像机---双击');
            console.log(event);
            console.log(treeId);
            console.log(treeNode);


            let scope = $scope.$new();
            scope.data = treeNode;
            layer.open({
                type : 1,
                resize : false,
                title : false,
                closeBtn : false,
                scope : scope,
                content : alarmVideoHtml,
                area : ['720px', '465px'],
                success : function () {
                    angular.element('.layui-layer-content').css('overflow',"hidden");
                    console.log('打开成功');
                },
                end : function(){
                    scope.$destroy();
                }
            });
        };

        //tree diyLocation
        vm.diyLocation = (treeId:string, treeNode:{}) => {
            console.log('摄像机---定位');
            console.log(treeId);
            console.log(treeNode);
            console.log(treeNode);
            //调用center 控制器地图方法
            dynamicControlCacheFactory.getCameraLocate(treeNode);
        };

        //tree diyAttention
        vm.diyAttention = (treeId:string, treeNode:{}) => {
            console.log('摄像机---关注');
            console.log(treeId);
            console.log(treeNode);
        };

    };

}

app.controller("mainLeftController", MainLeftController);