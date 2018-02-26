/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopup/mac.popup.html" name="macPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopupDetail/mac.popup.detail.html" name="detailMacPopupHtml" />

import {app} from "../../common/app/main.app";
import 'css!../style/FaceTrack.css';
import 'css!../style/MacCarCrash.css';

import { NPGisMapMain } from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";

//使用人脸碰撞mac接口
import './MacCarCrash.service';
import '../../common/services/macCarCrashMock.service';
import {IMacCarCrashMockService} from "../../common/services/macCarCrashMock.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {IMacCarCrashService, PageParams} from "./MacCarCrash.service";

import {
    AccompanyingAnalysisResult,
    Result
} from '../../../core/entity/AccompanyingAnalysisEnum';

import {
    getWidowSize,
    MarkersIcon,
    OverlayName,
    MacCarCrashParams,
    carColorList,
    carTypeList,
    carBrandList,
    taskNameList,
    FaceMacCrashOffLineData
} from './MacCarCrashEnum';

class WinPopupType {
    static Track: string = 'Track';
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
}


declare let popupHtml: any, angular: any, trackPopupHtml: any, $: any, detailPopupHtml: any, macPopupHtml: any,detailMacPopupHtml:any;

class CacheResult extends Result {
    resultIndex: number;
}

class MacCarCrashController{
    $inject: Array<string> = ['$scope','$rootScope','$timeout','macCarCrashMockService','macCarCrashService','layer','$compile'];
    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;
    CarCrashParams: MacCarCrashParams;
    MacCrashParams: MacCarCrashParams;
    showTrackdetail:boolean = false;//查看轨迹-车辆
    width:number;
    checkRightResult: Array<boolean> = [false];

    // 下拉菜单
    carColorList:any= carColorList();
    carTypeList:any= carTypeList();
    carBrandList:any= carBrandList();
    taskNameList:any= taskNameList();

    resultRightType:string = 'Mac';
    resultLeftType:string = 'Mac';
    resultParams: PageParams = new PageParams();
    showAnalysisList:boolean=false;
    showResult:boolean=false;
    showForm: boolean = true;
    accompImagePath: string;
    resultToSystemPoints: Array<SystemPoint> = [];
    allTrackResult: Array<Result>;

    AccompOffLine: Array<{[key:string]:any}> = FaceMacCrashOffLineData;
    accpResultParams: PageParams = new PageParams();
    trackResultForMap: { [key: string]: Result | CacheResult };
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    accpTrackResultForMap: { [key: string]: Result | CacheResult };
    markerWininfo: string;
    accpResultIndex: number;
    allAccpTrackResult: Array<Result>;
    currentLayerIndex: number;
    isSortLetter: boolean = true;
    windowWidth: number = getWidowSize().width;

    constructor(
        private $scope:any,
        private $rootScope:any,
        private $timeout:any,
        private macCarCrashMockService:IMacCarCrashMockService,
        private macCarCrashService: IMacCarCrashService,
        private layer: any,
        private $compile:any
    ){
        this.map = this.$scope.$parent.map;
        this.systemPointList = this.$scope.$parent.systemPoint;
        this.$scope.$on('map.ready', (event: any, map: any) => {
            this.map = map;
            this.initForMapLayer()
        });
        this.$scope.$on('points.ready', (event: any, points: Array<SystemPoint>) => {
            this.systemPointList = points;
        });
        this.$timeout(()=>{
            this.$scope.$emit('showItemPage',true);
        });
    }
    private initForMapLayer(){
        this.map.renderOverlayLayer(OverlayName.MapForResultLayer);
        this.map.renderOverlayLayer(OverlayName.MapForTrackLineLayer);
    }
    selectData(arg:any){
        console.log(arg)
    }
    goBack() {
        this.$timeout(()=>{
            this.$scope.$emit('showItemPage',false);
        })
    }
    goBackForm() {
        this.$timeout(() => {
            this.showResult = false;
        })
    }
    carQuery(){
        console.log(this.CarCrashParams);
    }

    macQuery(){
        console.log(this.MacCrashParams);
    }
    delArea(i:number){
        this.AccompOffLine.splice(i,1);
    }

    submitSearch(){
        // 表单验证
        // 请求数据
        // 跳转至分析结果
        this.showAnalysisList = true;
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

    getKey(item: Result) {
        return new Date().getTime() * Math.random();
    }
    // 通过分析结果查询数据
    showAnalysisResult(item: { [key: string]: any }) {
        this.macCarCrashMockService.searchAccompanying(item).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
            this.$timeout(() => {
                this.macCarCrashService.setFaceAccompDataList(res.data);
            }).then(() => {
                this.resultParams.pageSize = 6;
                this.resultParams.currentPage = 1;
                this.resultParams = this.macCarCrashService.getFaceAccompDataByPage(this.resultParams);
                this.allTrackResult = this.macCarCrashService.getAllFaceTrackData();

                this.accpResultParams.pageSize = 6;
                this.accpResultParams.currentPage = 1;
                this.accpResultParams = this.macCarCrashService.getFaceAccompDataByPage(this.resultParams);
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
    slideRightResult(i: number) {
        this.setCheckRightResult(this.resultParams.pageSize, i);
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
    private setResultForMap(result: Array<Result | CacheResult>) {
        let obj = {} as  { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.trackResultForMap = obj;
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
        let dom: any;
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
        this.resultParams = this.macCarCrashService.getFaceAccompDataByPage(this.resultParams);
        if (this.isSortLetter) {
            this.$timeout(() => {
                this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, this.getSystemPointForParams(this.resultParams.data.result), this.isSortLetter, this.sortLetter)
            })
        }
    }
}

app.controller('MacCarCrashController', MacCarCrashController);