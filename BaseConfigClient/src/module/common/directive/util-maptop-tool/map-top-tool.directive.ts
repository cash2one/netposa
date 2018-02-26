/**
 * Created by zyh on 2017/6/21.
 */

/// <amd-dependency path="text!./map-top-tool.html" name='mapTopTool' />

import {app} from '../../app/main.app';
import 'css!./map-top-tool.css';

import 'angular';


declare let mapTopTool : any;
declare  let angular : any;
declare let document : any;

/*
    !! z-index： 999
    回调方法，要使用回调参数是，须带同名参数

 <util-map-top-tool
    full-screen-change=" function(pattern) ">       @ pattern : any  =>  full  全屏   unfull 非全屏
    layer-click=" function(checked) "               @ checked : []   =>
 </util-map-top-tool>

 */

class mapTopToolDirective {
    static $inject = ['$scope'];
    constructor (){};

    fullScreenState : string;   //全屏状态language
    isMapOfPattern : Boolean;   //是地图模式
    isFullScreen : Boolean;     //是全屏模式
    fullScreenChange : Function;//全屏模式按钮
    patternList : Function;     //列表模式
    patternMap : Function;      //地图模式

    layerCheck : Function;      //图层选择
    layerCheckData : {
        camera : boolean,
        police : boolean
    }&{[key:string]:boolean};

    layerListIsShow : Boolean;  //显示图层选择列表
    layerShow : Function;       //显示图层下拉列表
    layerHide : Function;       //显示图层下拉列表

    isShowClearTool : Boolean; //清除按钮是否显示
    clearAllLayer : Function;      //清除图层按钮


    restrict : string = 'E';
    scope = {
        fullScreenChange : "&",   //全屏模式回调
        patternList : "&",        //列表模式回调
        patternMap : "&",         //地图模式回调
        layerCheck : "&",         //图层选择回调
        isMapOfPattern :"=",      //对外提供服务所需的变量，用于改变指令内部状态
        clearAllLayer : "&",      //清除所有图层    （和 clearAllLayer 一起使用）
        isShowClearTool : "=",    //是否显示清除按钮 （和 clearAllLayer 一起使用）
    };
    template : string = mapTopTool;
    replace : Boolean = true;
    transclude : Boolean = true;
    controllerAs = 'mapTopToolDirective';

    controller = function($scope : any){
       let vm = this as mapTopToolDirective;

        //默认选中摄像机
        vm.layerCheckData = {
            camera : true,
            police : false
        };

        //初始配置按钮组
        if(!!$scope.isShowClearTool){
            vm.isShowClearTool = true;
            vm.clearAllLayer = $scope.clearAllLayer;
            //console.log('初始加载');
        }else{
            vm.isShowClearTool = false;
            //console.log('初始隐藏');
        }


        vm.layerListIsShow = false;
        vm.fullScreenState = 'FDS_04_03_03';
        vm.isFullScreen = false;
        vm.isMapOfPattern = !!$scope.isMapOfPattern?$scope.isMapOfPattern:true;

        $scope.$watch('isMapOfPattern', function (newData:boolean,oldData:boolean){
            //console.log("%c ==========tableHasCheck 改变 ==============","color:green");
            //console.log("新" + newData,"旧" +oldData);
            vm.isMapOfPattern = newData;
        }, true);

        //显示图层按钮下拉列表
        vm.layerShow = () => {
            vm.layerListIsShow = true;
        };

        //隐藏图层按钮下拉列表
        vm.layerHide = () => {
            vm.layerListIsShow = false;
        };

        //全屏控制
        vm.fullScreenChange = () => {
           let currentState = "";
           if(vm.isFullScreen){
               vm.fullScreenState = 'FDS_04_03_03';
               vm.isFullScreen = false;
               currentState = 'unfull';
           }else{
               vm.isFullScreen = true;
               currentState = 'full';
               vm.fullScreenState = 'FDS_04_03_14';
           }
            //回调
            screenControll(currentState);
            $scope.fullScreenChange({pattern : currentState});
        };

        //全屏控制 兼容webkit \ 火狐
        function screenControll(state : string){
            if(state === "full"){
                if(!!document.body.webkitRequestFullScreen){
                    document.body.webkitRequestFullScreen();
                }else if(!!document.body.mozRequestFullScreen){
                    document.body.mozRequestFullScreen();
                };
                angular.element('div.g-head').hide();
                angular.element('div.g-main').css('top',"0");
            }else{
                if(!!document.webkitCancelFullScreen){
                    document.webkitCancelFullScreen();
                }else if(!!document.mozCancelFullScreen){
                    document.mozCancelFullScreen();
                };
                angular.element('div.g-head').show();
                angular.element('div.g-main').css('top',"48px");
            }
        };
        //列表模式
       vm.patternList = () => {
            vm.isMapOfPattern = false;

            //回调
            !!$scope.patternList && $scope.patternList();
        };

        //地图模式
        vm.patternMap = () => {
            vm.isMapOfPattern = true;

            //回调
            !!$scope.patternMap && $scope.patternMap();
        };


        //图层按钮
        vm.layerCheck = (type : string) => {
            if(type === "camera"){
                vm.layerCheckData.camera = !vm.layerCheckData.camera;
            }else if(type === "police"){
                vm.layerCheckData.police = !vm.layerCheckData.police;
            };
            //回调
            !!$scope.layerCheck && $scope.layerCheck({checked : {type : type , check : vm.layerCheckData[type] }});
        };

        $scope.$on('$destory', function(){

           console.log("销毁指令作用域");
        });

    };

    link = function(scope : any , element : any ,attr : any ,controller : any){
       /* scope.fullScreenChange = () => {
            console.log('全屏')
        }*/

    };

    static instance(){
        return new mapTopToolDirective();
    }

}

app.directive('utilMapTopTool', mapTopToolDirective.instance);