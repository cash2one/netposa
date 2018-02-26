/**
 * Created by dell on 2017/5/31.
 */

/// <amd-dependency path="text!../../technology-stack/map/technology.stack.map.popup.html" name="popupHtml" />
/// <amd-dependency path="text!./facePush.html" name="facePushHtml" />


import {app} from "../../common/app/main.app";
import "es6-promise";
//地图相关
import {NPGisMapMain} from "../../common/map/map.main";
import {IMapService} from "../../common/services/map.service";
import "../../common/services/map.service";
import {MapConfigJsonEnum} from "../../common/enum/MapConfigJsonEnum";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import {MapConfigModel} from "../../common/map/core/model/map.config.model";
import {INPGisMapMain, InfoWindowEvent} from "../../common/map/map.interface";

import "css!../../technology-stack/map/technology.stack.map.css"
import "../../technology-stack/map/technology.stack.map.popup.controller";

//OCX
import {
    IVideoOcxControlFunc, VideoOcxRealTimeOpt,
    VideoOcxRtspOpt, VideoOcxRtspMultipleOpt
} from "../../common/directive/ocx/video.ocx.directive";

//service
import "../dynamicControl.cache.factory";
import {IDynamicControlCacheFactory} from "../dynamicControl.cache.factory";

import 'angular';
//websocket
import  "../../common/factory/socket.factory";
import {ISocketFactory} from "../../common/factory/socket.factory";
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";

declare var require:any;
declare var angular:any;
let Promise = require("es6-promise");
declare let popupHtml : string;
declare let facePushHtml : string;

class MainCenterController {
    //地图
    map:INPGisMapMain;
    mapConfig:MapConfigModel;
    mapId:string;
    mapConfigName:string;
    showCamera : Function;
    hideCamera : Function;
    clearAllLayer : Function;
    clearAllLayerIsShow : Boolean = true;


    //模式切换按钮
    patternState : Boolean = true;

    //列表模式布局选择
    layoutMouseOver : Function;
    layoutShow : Boolean = false;//布局选择是否显示
    layoutState : string = 'one';//布局状态
    videoLayoutNums : any[] = new Array(1);//视频布局网格矩阵


    //左右模块收展、全屏模式
    leftFoldBtn : string = 'FDS_04_01_10';
    leftIsFold : Boolean = true;
    leftFoldClick : Function;
    rightFoldBtn : string = 'FDS_04_01_09';
    rightFoldClick : Function;
    rightIsFold : Boolean = false;
    fullScreenClick : Function;
    patternMap : Function;
    patternList : Function;
    layerClick : Function;

    //OCX
    videoOcx: IVideoOcxControlFunc;
    //OCX初始化
    initComplete : Function = (ocxControlFunc: IVideoOcxControlFunc) => {
        console.log("ocx初始化完成", ocxControlFunc);
        this.videoOcx = ocxControlFunc;
    };

    //播放
    playRtsp : Function = () => {
        if(this.videoOcx){
            let opts = new VideoOcxRtspOpt();
            opts.url = "rtsp://10.0.10.200:8557/H264";
            this.videoOcx.playRtsp(opts, 0);
        }
    };

    //改变布局
    changeLayoutType : Function = (layoutType: number ,state : string) => {
        if(this.videoOcx){
            this.videoOcx.setLayout(layoutType);

            this.layoutState = state;
            //暂时播放某个测试视频
            this.playRtsp();
        }
    };

    //关闭所有
    stopAll : Function = ()=>{
        if(this.videoOcx){
            this.videoOcx.stopAll();
        }
    };

    //人脸抓拍推送
    facePicData : Array<any> = [];
    facePicReceive : Function;
    facePickMore : Function;

    //初始化按钮状态值，用于指令数据绑定
    btnParams : {isOpen : boolean} = {isOpen : true};

    static $inject = ['$scope', 'mapService','dynamicControlCacheFactory','$timeout','$compile' ,'socketFactory' ];

    constructor(private $scope : any, private mapService : IMapService,private dynamicControlCacheFactory:IDynamicControlCacheFactory,$timeout:any ,$compile : any ,private socketFactory : ISocketFactory ) {
        let vm = this;



        //清楚图层测试
        vm.clearAllLayer = () => {
            console.log('点击了清除图层按钮');

        };


        //接收websocket消息
        (() => {
            vm.socketFactory.subscribe(SocketResultTypeEnum.DeployControl, (data: any)=>{
                console.log("收到的人脸抓拍推送数据", data);
                //调用追加数据
                if(!vm.btnParams.isOpen){
                    vm.facePicReceive();
                }
            });
        })();


        //模拟人脸抓拍数据
        vm.facePicReceive = () => {
            let scope = $scope.$new();
            scope.data = {
                imgUrl : "",
                id : "face1568465",
                name : "测试",
                time : "2017-07-03",
                sequence : vm.facePicData.length + 1,
            }
            vm.facePicData.unshift(scope.data);
            //动态计算ul宽度
            angular.element('ol.pics').width(vm.facePicData.length * 100);

            if(!angular.element('ol.pics').children().length){
                angular.element('ol.pics').append($compile(facePushHtml)(scope)[0]);
            }else{
                angular.element('ol.pics').find('li:first-child').before($compile(facePushHtml)(scope)[0]);
            }
            //动画
            angular.element('ol.pics').find('li:first-child').animate({
                width:"90px",
                opacity : 1,
            } ,200);
        };

        //人脸抓拍推送列表--更多
        vm.facePickMore = () => {
            window.location.hash = '/intelligentretrieval/faceretrieval';
        };

        //通过服务初始化服务内的值
        vm.dynamicControlCacheFactory.updateBtnParams(true);
        vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();


        //OCX 销毁
        $scope.$on('$destory' ,() => {
           vm.videoOcx = null;
        });

        //折叠布控控制
        vm.leftFoldClick = () => {
            let dom = angular.element('.g-dynamicControl-left');
            if(vm.leftIsFold){
                //显示左侧
                vm.leftIsFold = false;
                dom.show();
                //更改提示为收起
                vm.leftFoldBtn = 'FDS_04_01_09';
            }else{
                //显示左侧
                vm.leftIsFold = true;
                dom.hide();
                //更改提示为收起
                vm.leftFoldBtn = 'FDS_04_01_10';
            }
        }
        vm.rightFoldClick = () => {
            let dom = angular.element('.g-dynamicControl-right');
            if(vm.rightIsFold){
                vm.rightIsFold = false;
                dom.show();
                vm.rightFoldBtn = 'FDS_04_01_09';
            }else{
                vm.rightIsFold = true;
                dom.hide();
                vm.rightFoldBtn = 'FDS_04_01_10';
            }
        }

        //全屏回调
        vm.fullScreenClick = (state:any) => {
            console.log(state);
            let leftEle = angular.element('.g-dynamicControl-left');
            let rightEle = angular.element('.g-dynamicControl-right');
            if(state === "full"){
                //列表模式默认显示左右两侧
                vm.leftIsFold = true;
                vm.rightIsFold = true;
                leftEle.hide();
                rightEle.hide();
                vm.leftFoldBtn = 'FDS_04_01_10';
                vm.rightFoldBtn = 'FDS_04_01_10';
            }else if(state === "unfull"){
                //列表模式默认显示左右两侧
                vm.leftIsFold = false;
                vm.rightIsFold = false;
                leftEle.show();
                rightEle.show();
                vm.leftFoldBtn = 'FDS_04_01_09';
                vm.rightFoldBtn = 'FDS_04_01_09';
            };
        };

        //列表模式
        vm.patternList = () => {
            console.log('列表模式');

            vm.patternState = false;
            vm.dynamicControlCacheFactory.updateBtnParams(false);
            vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();
        };

        //地图模式
        vm.patternMap = () => {
            console.log('地图模式');

            vm.patternState = true;
            vm.dynamicControlCacheFactory.updateBtnParams(true);
            vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();

            vm.videoOcx = null;
        };

        //图层点击
        vm.layerClick = (checked:any) => {
          console.log('图层按钮');
          console.log(checked);
            if(checked.type === "camera" && checked.check){
                //显示摄像机
                vm.map.setClusterMarkerVisibleByLayerType("camera", true);
            }else if(checked.type === "camera" && !checked.check){
                //隐藏摄像机
                vm.map.setClusterMarkerVisibleByLayerType("camera", false);
            }
        };



        //列表模式布局选择
        vm.layoutMouseOver = function (state:number) {
            if (state) {
                vm.layoutShow = true;
            } else {
                vm.layoutShow = false;
            }
        }


        //地图
        vm.map;
        vm.mapId = "mapInit";
        vm.mapConfigName = MapConfigJsonEnum.SHEN_ZHEN_MAP;

        $scope.$on("$destroy", function () {
            console.log("销毁了MapResourceController");
            // 在这里销毁地图
            if (vm.map) {
                vm.map.destroy();
                vm.map = undefined;
            }
        });


        //初始化 存储地图地位方法到中间服务层恶搞
        dynamicControlCacheFactory.setCameraLocate(_locateCamera);

        //摄像机定位
        function _locateCamera(pointsData : any){
            let id = pointsData.ID;
            console.log('调用测试ID定位·································');
            vm.map.locationMarker("bb9d69d53e6443848e75a7543cc3c5d2");
        }

        // 初始化地图, 加载点位数据, 将点位数据加载到地图上
        _startInitMap().then(_getSystemPoints).then(_initSystemPoints2Map);

        function _startInitMap() {
            return mapService.getMapConfig(vm.mapConfigName).then(_initMap);
        }

        function _initMap(data:MapConfigModel) {
            vm.map = new NPGisMapMain();
            vm.map.init(vm.mapId, data);
        }


        function _initSystemPoints2Map(points:Array<SystemPoint>) {
            if (vm.map) {
                vm.map.renderMarkers(points, getMapEvents());
            }
        }

        function getMapEvents() {
            console.log('点击了 209 行,get map events');
            return {
                click: (marker: NPMapLib.Symbols.ClusterMarker)=> {
                    openInitInfoWindow(marker);
                }
            } as OverlayLayerOpts;
        }

        /**
         * 在地图总弹出信息窗口
         * @param marker
         */
        function openInitInfoWindow(marker: NPMapLib.Symbols.ClusterMarker) {
            console.log('288 行,open');

            let scope = $scope.$new();
            scope.$on("$destroy", ()=> {
                console.log("销毁地图弹出框scope");
            });
            // 弹出框步骤
            // 1. 创建一个空弹出框
            // 2. 使用$compile渲染html
            // 3. 调用oepnInfoWindow, 将创建的弹出框和html一起作为参数传入, 并打开地图
            // 4. 关闭弹出框, 在html中手动触发$emit事件, 在$scope中通过$on来监听关闭事件, 调用closeInfoWindow方法

            let winId = vm.map.createInfoWindow(marker.getPosition().lon, marker.getPosition().lat);
            // 当前弹出的infowWindow框ID
            scope.winId = winId;
            // 当前监听的关闭infowWindow事件方法
            scope.closeEventName = "aaa";
            let html = $compile(popupHtml)(scope);
            $timeout(()=> {
                vm.map.openInfoWindow(winId, html[0], {
                    close: ()=> {
                        scope.$destroy();
                    }
                } as InfoWindowEvent);
            });
        }

        /**
         * 监听infoWindow关闭事件
         */
        function initCloseInfoWindowEvent() {
            console.log(' 319 行,关闭infowindow');

            $scope.$on("aaa", (event: Event, winId: string)=> {
                closeInfoWindow(winId);
            });
        };
        initCloseInfoWindowEvent();

        /**
         * 关闭在地图中弹出的窗口
         * @param winId
         */
        function closeInfoWindow(winId: string) {
            console.log('332 行,关闭infowindow');

            vm.map.closeInfoWindow(winId);
        }

        function _getSystemPoints() {
            return mapService.getSystemPoints()
                .then((data: ResponseResult<Array<SystemPoint>>)=> {
                    if (data && data.code == 200) {
                        let points = data.data || [];
                        return points;
                    } else {
                        return Promise.reject(null);
                    }
                });
        }
    }
}

app.controller("mainCenterController", MainCenterController);
