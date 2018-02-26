/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopup/mac.popup.html" name="macPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopupDetail/mac.popup.detail.html" name="detailMacPopupHtml" />


import {app} from "../../common/app/main.app";
// import 'css!../style/base.css';
import 'css!../style/MacTrack.css';
import './MacTrack.store';
import '../../common/services/macTrack.service';
import {IMacCarCrashMockService} from "../../common/services/macCarCrashMock.service";

import { NPGisMapMain } from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {IMacTrackServiceStore,PageParams} from "./MacTrack.store"
import {IMacTrackService} from "../../common/services/macTrack.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../main/analysisMmap.server";
import {
    MarkersIcon,
    timeLength,
    data,
    dataLists,
    getdataList,
    MacTrackIndexParam,
    singleMacDetailParam,
    macCrashRecordParam,
    getMacCrashData,
    OverlayName,
    ArrayUnique
} from "./MacTrackEnum"

declare let popupHtml: any, angular: any, trackPopupHtml: any, $: any, detailPopupHtml: any, macPopupHtml: any,detailMacPopupHtml:any, transition:any;

class CacheResult extends Result {
    resultIndex: number;
}

import {
    AccompanyingAnalysis,
    AccompanyingAnalysisResult,
    AccessLogModel,
    Result
} from '../../../core/entity/AccompanyingAnalysisEnum';

class WinPopupType {
    static Track: string = 'Track';
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
}

class MacTrackController{
    $inject:Array<string> = ['$scope','$timeout','macTrackService','macTrackStore','layer','$compile','macCarCrashMockService','analysisMmapServer'];
    map:NPGisMapMain;
    systemPointList:Array<SystemPoint>;
    //dataRange:Array<any>;
    MacTrackList:Array<any>;
    showIndex:boolean = true;
    isShowList:boolean = false;
    isShowDetail:boolean = false;
    macFrenquencyTime:boolean = false;
    showTrackdetail:boolean = false;
    addType:Array<any> = [];
    defaultName:number;
    currentMacIP:string;
    alarmList:Array<any>;
    dataAllLists:Array<data<timeLength>> = getdataList();
    dataList:Array<data<timeLength>> = [];
    macCrashList:Array<macCrashRecordParam> = getMacCrashData(5,10);
    macDetail:Array<singleMacDetailParam> = [];
    // dataDefault:dataLists;
    MacTrackIndexParams:Array<MacTrackIndexParam>=[];
    macIndexIp:string;
    width:any;
    alarmDetail:any;
    macAddress:Array<any>;
    macFillin:Array<any>;
    placeHolder:string;
    resultParams: PageParams = new PageParams();
    allTrackResult: Array<Result>;
    accpResultParams: PageParams = new PageParams();
    resultRightType:string = 'Mac';
    resultLeftType:string = 'Mac';
    showForm: boolean = true;
    showResult:boolean=false;
    accompImagePath: string;
    trackResultForMap: { [key: string]: Result | CacheResult };
    resultToSystemPoints: Array<SystemPoint> = [];
    accpTrackResultForMap: { [key: string]: Result | CacheResult };
    markerWininfo: string;
    checkRightResult: Array<boolean> = [false];
    accpResultIndex: number;
    allAccpTrackResult: Array<Result>;
    currentLayerIndex: number;
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    isSortLetter: boolean = true;

    constructor(
        private $scope:any,
        private $timeout:any,
        private macTrackService:IMacTrackService,
        private macTrackStore:IMacTrackServiceStore,
        private layer:any,
        private $compile:any,
        private macCarCrashMockService: IMacCarCrashMockService,
        private analysisMmapServer: IAnalysisMmapServer
    ){
        this.width = $(window).width() -60 as number;
        this.alarmDetail = document.getElementById("result-track-detail");
        this.map = this.$scope.$parent.map;
        this.systemPointList = this.$scope.$parent.systemPoint;
        console.log(this.systemPointList);

        this.addType = [
            {'typeId':0,'name':'Mac',placeholder:'请输入Mac地址'},
            {'typeId':1,'name':'IMEI',placeholder:'请输入设备识别码IMEI'},
            {'typeId':2,'name':'IMSI',placeholder:'请输入用户识别码IMSI'}
        ];
        this.defaultName = this.addType[0].name;
        this.$timeout(()=>{
            this.$scope.$emit('showItemPage',true);
        });

        // 默认加入一个MAC地址
        this.addMacAddress();
    }

    private changeAddType(id:number){
        console.log(id);
        this.addType.forEach((val,idx,array)=>{
            if(id ==val.id){
                this.placeHolder = val.placeholder
            }
        })
    }
    private foldMacTrack(item:any,idx:number){
        console.log(item);
        console.log(this.macCrashList);
        console.log(idx);
        this.currentMacIP = item.macAddress;
        this.macDetail = item.showDetail;
        this.isShowList = false;
        this.macFrenquencyTime = true;
    }

    //  Mac轨迹-详情收回
    private goResultRecords(){
        this.showTrackdetail = false;
        this.alarmDetail.style.width = '0'; 
    }
    goMacIpList(){
        this.isShowList = true;
        this.macFrenquencyTime = false;
    }
      //添加Mac地址
    addMacAddress(){
        this.MacTrackIndexParams.push({
            macAddress:'',
            name: 'mac',
            startTime: '',
            endTime: ''
        }as MacTrackIndexParam);
    }
     
    gotoIndex(){
        this.showIndex = true;
        this.isShowList = false;
        // this.alarmDetail.style.width = '0';
    }

    swatchDateRange(item:data<timeLength>){
        console.log(item);
        this.dataList[0] = item;
        // this.MacTrackIndexParam.startTime = item.value.startTime;
        // this.MacTrackIndexParam.endTime = item.value.endTime;
    }
    goBack() {
        this.showResult = false;
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }
    getKey(item: Result) {
        return new Date().getTime() * Math.random();
    }
    //删除Mac地址
    deleteMacAddress(index:number){
        this.MacTrackIndexParams.splice(index,1)
    }
    //返回Index
    goBackIndex(){
        this.isShowList = false;
        this.showIndex = true;
    }
    toggleFold(idx:number){
        console.log(idx);
        console.log(this.MacTrackList);
        this.macCrashList[idx].fold = !this.macCrashList[idx].fold
    }
    //详情展开
    ShowAlarmDetail(){
        // this.isShowList = false;
        this.showTrackdetail = true;         
        this.alarmDetail.style.width = this.width+'px'; 
    }
    gotoList(){
        this.isShowList = true;
        this.isShowDetail = false; 
    }
    unfold(index:number){
         console.log(index);
         this.MacTrackList[index].fold = false
    }
    //进入列表
    requireList(){
        this.showIndex = false;
        this.isShowList = true;
        this.showResult = false;
        this.macTrackService.searchAllInfo(this.MacTrackIndexParams)
    }
    //通过分析结果查询数据
    findResult(item: any){
        this.showIndex = false;
        this.isShowList = false;
        this.showResult = true;

        this.macCarCrashMockService.searchAccompanying(item).then((res: ResponseResult<any>) => {
            console.log(res.data);
            this.$timeout(() => {
                this.macTrackStore.setFaceAccompDataList(res.data);
            }).then(() => {
                this.resultParams.pageSize = 6;
                this.resultParams.currentPage = 1;
                this.resultParams = this.macTrackStore.getFaceAccompDataByPage(this.resultParams);
                this.allTrackResult = this.macTrackStore.getAllFaceTrackData();

                this.accpResultParams.pageSize = 6;
                this.accpResultParams.currentPage = 1;
                this.accpResultParams = this.macTrackStore.getFaceAccompDataByPage(this.resultParams);
                this.setResultForMap(this.allTrackResult);
            }).then(() => {
                this.map.removeMarkers(this.systemPointList);
                if (item.Type === 'CarToMac') {
                    this.resultLeftType = 'macCarCrash';
                    this.resultRightType = 'carMacCrash';
                }
                if (item.Type === 'MacToCar') {
                    this.resultLeftType = 'carMacCrash';
                    this.resultRightType = 'macCarCrash';
                }
                this.showForm = false;
                this.showResult = true;
                this.accompImagePath = item.Path;
                let arr = this.getSystemPointForParams(this.resultParams.data.result);
                this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, arr, true, this.sortLetter);
                this.setCheckRightResult(this.resultParams.pageSize, 0, true);
                this.renderAccpMarkers();
            })

        })

    }
    private setResultForMap(result: Array<Result | CacheResult>) {
        let obj = {} as  { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.trackResultForMap = obj;
    }
    getSystemPointForParams(points: Array<Result>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        let tempArr = angular.copy(this.systemPointList) || [];
        // console.log(this.systemPointList);
        points.forEach((item: Result) => {
            let CameraID = item.AccessLog.CameraID;
            let s = false;
            for (let index = 0; index < tempArr.length; index++) {
                if (CameraID === tempArr[index].ObjectID) {
                    s = true;
                    arr.push(tempArr[index]);
                    //tempArr.splice(index,1);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }
    //TODO 渲染地图点位
    private renderMakers(layerName: string, groupName: string,
                         isClear: boolean,
                         result: Array<SystemPoint>,
                         flag?: boolean,
                         lables?: Array<any>,
                         icon?: string) {
        if (isClear) {
            this.map.removeOverlaysByName(layerName, groupName);
        }
        this.resultToSystemPoints = result;
        this.map.addOverlaysForMakers(layerName, groupName, result, {
            iconURL: icon || MarkersIcon.NormalBlueIcon,
            click: (marker: NPMapLib.Symbols.Marker) => {
                let data = marker.getData() as any;
                let result: CacheResult;
                if (groupName === OverlayName.MapForResultGroup) {
                    result = this.trackResultForMap[data.resultID] as CacheResult;
                } else {
                    result = this.accpTrackResultForMap[data.resultID] as CacheResult;
                }
                this.openDetailPopup(result, result.resultIndex, groupName);
            },
            mouseOver: (marker: NPMapLib.Symbols.Marker) => {
                console.log(marker);
                let data = marker.getData() as any;
                let result: CacheResult;
                if (groupName === OverlayName.MapForResultGroup) {
                    result = this.trackResultForMap[data.resultID] as CacheResult;
                } else {
                    result = this.accpTrackResultForMap[data.resultID] as CacheResult;
                }
                this.markerWininfo = this.createMapPopup(marker.getPosition(), result, WinPopupType.Marker)
            },
            mouseOut: () => {
                this.map.getInfoWindowByID(this.markerWininfo).close();
            }
        }, flag, lables);
    }
    setCheckRightResult(size: number, traget: number, isFirst?: boolean) {
        let arr = [] as Array<boolean>;
        for (let i = 0; i < size; i++) {
            if (i === traget) {
                arr.push(!this.checkRightResult[traget])
            } else {
                arr.push(false)
            }
        }
        this.accpResultIndex = traget;
        if (isFirst) {
            arr[traget] = true
        }
        this.checkRightResult = arr;
        this.renderAccpMarkers()
    }
    private renderAccpMarkers() {
        let accpArr = this.accpResultParams.data.result[this.accpResultIndex].AccessLog.AccompanyingRes;
        let obj = {} as  { [key: string]: CacheResult };
        accpArr.forEach((item: CacheResult, index: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = index;
        });
        this.accpTrackResultForMap = obj;
        this.allAccpTrackResult = accpArr;
        this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, true, this.getSystemPointForParams(this.allAccpTrackResult), false, null, MarkersIcon.NormalGreenIcon);
    }

    openDetailPopup(item: Result | CacheResult, index: number, groupName: string) {
        let scope: { result: Result, allResult: Array<Result>, index: number, $destroy: Function } = this.$scope.$new();

        scope.result = item;
        scope.index = index;
        if (groupName === OverlayName.MapForResultGroup) {
            scope.allResult = this.allTrackResult;
            if(this.resultLeftType === 'Face'){
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: detailPopupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: '人员详情',
                    area: ["588px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                })
            }else{
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: detailMacPopupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: 'Mac详情',
                    area: ["498px", "230px"],
                    end: function () {
                        scope.$destroy();
                    }
                })
            }
        } else {
            scope.allResult = this.allAccpTrackResult;
            if(this.resultRightType === 'Face'){
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: detailPopupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: '人员详情',
                    area: ["588px", "auto"],
                    end: function () {
                        scope.$destroy();
                    }
                })
            }else{
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: detailMacPopupHtml,
                    scope: scope,
                    skin: "no-scroll",
                    title: 'Mac详情',
                    area: ["498px", "230px"],
                    end: function () {
                        scope.$destroy();
                    }
                })
            }
        }
    }
    //TODO 创建地图弹框
    createMapPopup(point: NPMapLib.Geometry.Point, data: Result, type: string, location?: string): string {
        if (type === WinPopupType.Track) {
            return this.createTrackPopup(point, data, location);
        }
        if (type === WinPopupType.Marker) {
            return this.createMarkerPopup(point, data);
        }
    }
    createTrackPopup(point: NPMapLib.Geometry.Point, data: Result, location: string) {
        let dom: Element;
        let size: NPMapLib.Geometry.Size;
        console.log(this.resultLeftType,this.resultRightType, location);
        if(location === 'Left'){
            if (this.resultLeftType === 'Face') {
                dom = $(trackPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -248)
            } else {
                dom = $(macPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -128)
            }
        }

        if(location === 'Right'){
            if (this.resultRightType === 'Face') {
                dom = $(trackPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -248)
            } else {
                dom = $(macPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -128)
            }
        }


        let WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: size
        });
        let scope: { traceData: Result, $destroy: Function } = this.$scope.$new();
        scope.traceData = data;

        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.map.openInfoWindow(WinInfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.map.closeInfoWindow(WinInfo);
                }
            });
        });
        return WinInfo;
    }

    createMarkerPopup(point: NPMapLib.Geometry.Point, data: Result) {
        let Wininfo = this.map.createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: new NPMapLib.Geometry.Size(-82, -248)
        });
        let scope: { traceData: Result, $destroy: Function } = this.$scope.$new();
        scope.traceData = data;
        let dom = $(trackPopupHtml).get(0);
        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.map.openInfoWindow(Wininfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.map.closeInfoWindow(Wininfo);
                }
            });
        });
        return Wininfo
    }
    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.macTrackStore.getFaceAccompDataByPage(this.resultParams);
        if (this.isSortLetter) {
            this.$timeout(() => {
                this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, this.getSystemPointForParams(this.resultParams.data.result), this.isSortLetter, this.sortLetter)
            })
        }
    }
    // 地图操作
    //TODO 公共获取摄像机ID方法（地图框选）
    getCameraListForMap(points: Array<SystemPoint>) {
        let rfidPoints:Array<string> = [];
        points.forEach((point: SystemPoint) => {
            if (point.ObjectType === 'rfidCollect') {
                rfidPoints.push(point.ObjectID)
            }
        });
        //rfidPoints = ArrayUnique(this.MacTrackIndexParams.arrCameraId);
        this.MacTrackIndexParams.forEach((item:any,index:number)=>{
            item.deviceId = rfidPoints;
        });
        console.log(JSON.stringify(this.MacTrackIndexParams));
        // this.selectCamera();
    }

    DrawRect() {
        this.analysisMmapServer.drawRect((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }

    DrawCircle() {
        this.analysisMmapServer.drawCircle((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }

    DrawPolygon() {
        this.analysisMmapServer.drawPolygon((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }

    ClearDraw() {
        this.analysisMmapServer.clearDraw();
    }
}

app.controller('MacTrackController',MacTrackController);