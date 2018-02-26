/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopup/mac.popup.html" name="macPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopupDetail/mac.popup.detail.html" name="detailMacPopupHtml" />

// 弹框
import "../TrackPopup/track.popup.controller"
import "../MacTrackPopup/mac.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"
import "../MacTrackPopupDetail/mac.popup.detail.controller"

import {app} from "../../common/app/main.app";
import 'css!../style/MacFrequency.css';

// 请求服务
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";

// 地图服务
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../main/analysisMmap.server";
import {NPGisMapMain} from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";

// 参数
import {
    TrackConfig,
    OverlayName,
    GetNDayTime,
    FastData,
    getFastDataList,
    Age,
    Enum,
    TimeLength,
    getGlassesDataList,
    getMaskDataList,
    GlassesData,
    getAgeList,
    MaskData,
    getSexDataList,
    getWidowSize,
    SexData, Capture, MockCaptureList,
    MarkersIcon,
    QueryPattern
} from '../AnalysisEnum';
import {FrequencyAnalysisEnum, ResultTrack, Result, PerceiveInfos} from './MacFrequencyEnum';

// 公共参数
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {InteligentTaskInfo} from '../../../core/entity/InteligentTaskInfo'; // 离线任务

// 获取用户信息方法
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../../common/factory/userinfo.cache.factory";

// 信息弹框方法
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

// 分页方法
import {PageParamsAndResult, Pagination, IPagination} from '../../common/Pagination';

// 未知待定
import {IFaceFrequencyService} from "./Mac.frequency.service";
import {TraceAnalyzeOpts, PolylineStyle} from "../../common/map/map.interface";
import "./Mac.frequency.service";

class CacheResult extends PerceiveInfos {
    resultIndex: number;
}

class WinPopupType {
    static Track: string = 'Track';
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
}

declare let popupHtml: any, angular: any, trackPopupHtml: any, $: any, detailPopupHtml: any, macPopupHtml: any,
    detailMacPopupHtml: any;

class MacFrequencyController {
    $inject: Array<string> = ['$scope', '$rootScope', '$timeout', 'analysisService', 'faceAccompService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer'];

    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;
    FrequencyAnalysisParams: FrequencyAnalysisEnum = new FrequencyAnalysisEnum(); // 创建任务参数
    FrequencyOffLine: Array<InteligentTaskInfo>; // 离线任务列表

    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    FastDate: Enum<TimeLength> = FastData.today;

    showResult: boolean = false;
    showForm: boolean = true;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    resultToSystemPoints: Array<SystemPoint> = [];
    resultMarkers: Array<NPMapLib.Symbols.Marker>;
    mapTrackID: string;
    windowWidth: number = getWidowSize().width - 60;
    resultLeftType: string = 'MAC';
    resultRightType: string = 'Mac';

    currentLayerIndex: number;
    isSortLetter: boolean = true;
    trackWinInfo: string;
    trackResultForMap: { [key: string]: Result | CacheResult };
    accpTrackResultForMap: { [key: string]: Result | CacheResult };
    markerWininfo: string;
    mapAccpTrackID: string;
    accpTrackWinInfo: string;
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    queryPattern: Array<any> = QueryPattern; // 查询类型

    resultParams: PageParamsAndResult = new PageParamsAndResult();
    allTrackResult: Array<Result>;
    accpResultParams: PageParamsAndResult = new PageParamsAndResult();

    checkRightResult: Array<boolean> = [false];
    accpResultIndex: number;

    allAccpTrackResult: Array<PerceiveInfos>;
    ResultPagination: IPagination = new Pagination();
    AccpPagination: IPagination = new Pagination();

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private faceFrequencyService: IFaceFrequencyService,
                private layer: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private analysisMmapServer: IAnalysisMmapServer,
                private $compile: any,) {
        // 初始化参数
        this.initParams();

        this.map = this.$scope.$parent.map;
        this.systemPointList = this.$scope.$parent.systemPoint || [];

        this.$timeout(() => {
            this.$scope.$emit('showItemPage', true);
        });
        this.$scope.$on('map.ready', (event: any, map: any) => {
            this.map = map;
            this.initForMapLayer()
        });
        this.$scope.$on('points.ready', (event: any, points: Array<SystemPoint>) => {
            this.systemPointList = points;
        });
        this.$scope.$on('$destroy', () => {
            this.destoryForMapMarker();
            this.map.renderMarkers(this.systemPointList);
        });
    }

    // 初始化页面参数
    private initParams() {
        let self = this;
        // 创建任务参数
        let params:FrequencyAnalysisEnum = new FrequencyAnalysisEnum();
        params.startTime = this.FastDate.value.startTime;
        params.endTime = this.FastDate.value.endTime;
        params.taskName = "";
        params.type = "MAC";
        params.value = "";
        self.FrequencyAnalysisParams = params;

        self.getAccompOffLineList();
    }

    private destoryForMapMarker() {
        this.map.removeOverlaysByName(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup);
        this.map.removeOverlaysByName(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup);
        this.map.removeOverlaysByName(OverlayName.MapForTrackLineLayer, OverlayName.MapForResultLineGroup);
        this.map.removeOverlaysByName(OverlayName.MapForTrackLineLayer, OverlayName.MapForAccpLineGroup);
        if (this.mapTrackID) {
            this.map.clearTraceAnalyze(this.mapTrackID);
        }
        if (this.mapAccpTrackID) {
            this.map.clearTraceAnalyze(this.mapAccpTrackID);
        }
        let trackWinInfo = this.map.getInfoWindowByID(this.trackWinInfo);
        if (trackWinInfo) {
            trackWinInfo.close();
        }
        let accpTrackWinInfo = this.map.getInfoWindowByID(this.accpTrackWinInfo);
        if (accpTrackWinInfo) {
            accpTrackWinInfo.close();
        }

    }

    private initForMapLayer() {
        this.map.renderOverlayLayer(OverlayName.MapForResultLayer);
        this.map.renderOverlayLayer(OverlayName.MapForTrackLineLayer);
    }

    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.FrequencyAnalysisParams.startTime = item.value.startTime;
        this.FrequencyAnalysisParams.endTime = item.value.endTime;
    }

    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    goBackForm() {
        this.$timeout(() => {
            this.showForm = true;
            this.showResult = false;
            this.showAllResult = false;
            this.destoryForMapMarker();
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    submitSearch() {
        let self = this;
        if (!self.FrequencyAnalysisParams.startTime || !self.FrequencyAnalysisParams.endTime || self.FrequencyAnalysisParams.endTime < self.FrequencyAnalysisParams.startTime) {
            self.FrequencyAnalysisParams.startTime = self.FastDate.value.startTime;
            self.FrequencyAnalysisParams.endTime = self.FastDate.value.endTime
        }
        if (self.FrequencyAnalysisParams.taskName === "") {
            return self.layerDec.warnInfo('请输入任务名称');
        }
        if (self.FrequencyAnalysisParams.value === "") {
            return self.layerDec.warnInfo('请输入查询内容');
        }
        self.analysisService.searchMacFrequency(self.FrequencyAnalysisParams).then((res: ResponseResult<any>) => {
            if (res.code === 200) {
                self.showAnalysisList = true;
                self.getAccompOffLineList();
            }else {
                self.layerDec.warnInfo('服务器请求异常');
            }
        })
    }

    getSystemPointForParams(points: Array<Result>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        let tempArr = angular.copy(this.systemPointList);
        points.forEach((item: Result) => {
            let CameraID = item.MacDeviceId;
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

    setMarksForPage() {
        let arr = this.getSystemPointForParams(this.resultParams.data);
        this.resultToSystemPoints = arr;
    }

    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.accpResultParams.pageSize = 6;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
    }

    goAllResult() {
        this.showForm = false;
        this.showResult = false;
        this.showAllResult = true;
        this.accpResultParams.pageSize = 40;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
    }

    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            "analyseTaskType": "SearchAnalyseTaskResult",
            "taskId": item.TaskId,
            "TaskType": "SearchPerceiveFrequency",
            "PerceiveType": item.Ext.type
        };
        self.analysisService.getOffLineDetail(params).then((res: ResponseResult<ResultTrack>) => {
            if (res.code === 200) {
                self.$timeout(() => {
                    self.AccpPagination.set(res.data.PerceiveFrequencyArr);
                }).then(() => {
                    self.accpResultParams.pageSize = 6;
                    self.accpResultParams.currentPage = 1;
                    self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                    self.allTrackResult = self.AccpPagination.get();
                }).then(() => {
                    this.showForm = false;
                    this.showResult = true;
                    this.analysisMmapServer.removeSystemPoint();
                    self.setCheckRightResult(this.resultParams.pageSize, 0, true);
                    self.renderAccpMarkers();
                })
            }else {
                self.layerDec.warnInfo('服务器请求异常');
            }
        })
    }

    private renderAccpMarkers() {
        let accpArr = this.accpResultParams.data[this.accpResultIndex].PerceiveInfos;
        let obj = {} as { [key: string]: CacheResult };
        accpArr.forEach((item: CacheResult, index: number) => {
            obj[item.ID] = item;
            obj[item.ID].resultIndex = index;
        });
        this.accpTrackResultForMap = obj;
        this.allAccpTrackResult = accpArr;
        let arr = this.convertLonLat(accpArr);
        this.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForAccpGroup,
            true,
            arr,
            this.accpTrackResultForMap,
            false, null, MarkersIcon.NormalGreenIcon);
    }

    // 设备信息转换地图经纬度
    convertLonLat(accpArr: Array<PerceiveInfos>): Array<SystemPoint>{
        let arr = [] as Array<SystemPoint>;
        let tempArr = angular.copy(this.systemPointList);
        accpArr.forEach((item: PerceiveInfos) => {
            let CameraID = item.MacDeviceId||item.MobileDeviceId;
            let s = false;
            for (let index = 0; index < tempArr.length; index++) {
                let point = tempArr[index];
                if (CameraID === tempArr[index].ObjectID) {
                    s = true;
                    arr.push({
                        Lat: point.Lat,
                        Lon: point.Lon,
                        ID: point.ID,
                        ObjectID: point.ObjectID,
                        resultID: item.ID,
                        Descrption: point.Descrption,
                        LayerType: point.LayerType,
                        ObjectType: point.ObjectType,
                        TaskStatus: point.TaskStatus,
                        ObjectState: point.ObjectState,
                        ObjectName: point.ObjectName
                    }as SystemPoint);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });

        return arr;
    }

    openDetailPopup(item: PerceiveInfos | CacheResult, index: number, groupName: string) {
        let scope: { result: PerceiveInfos, allResult: Array<Result>, index: number, $destroy: Function } = this.$scope.$new();

        scope.result = item;
        scope.index = index;
        if (groupName === OverlayName.MapForResultGroup) {
            scope.allResult = this.allTrackResult;
            if (this.resultLeftType !== 'Face') {
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
            if (this.resultRightType !== 'Face') {
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

    setReultTrack() {
        if (Array.isArray(this.allTrackResult) && this.allTrackResult.length > 0) {
            this.isSortLetter = false;
            this.map.clearTraceAnalyze(this.mapTrackID);
            let arr = this.getSystemPointForParams(this.allTrackResult);
            let style = {
                color: TrackConfig.TrackColorViolet,
                weight: TrackConfig.TrackWeight,
                speed: TrackConfig.TrackSpeed,
                moveUrl: TrackConfig.PersonTrackBlueHandle,
                afterDraw: (evt: any) => {
                    let data = this.allTrackResult[evt.index] as Result;
                    let info = this.map.getInfoWindowByID(this.trackWinInfo);
                    if (info) info.close();
                    this.trackWinInfo = this.createMapPopup(evt.point, data, WinPopupType.Track, 'Left');
                },
                stop: () => {
                    this.$timeout(() => {
                        this.map.getInfoWindowByID(this.trackWinInfo).close();
                        this.trackWinInfo = null;
                    }, 3000)
                }
            } as TraceAnalyzeOpts;
            this.map.addOverlaysForLine(OverlayName.MapForTrackLineLayer, OverlayName.MapForResultLineGroup, arr, {
                weight: TrackConfig.TrackWeight,
                color: TrackConfig.LineColorForViolet
            } as PolylineStyle);
            this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, arr);
            this.mapTrackID = this.map.createTraceAnalyze(arr, style);
            this.map.startTraceAnalyze(this.mapTrackID);

        }
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
        if (location === 'Left') {
            if (this.resultLeftType === 'Face') {
                dom = $(trackPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -248)
            } else {
                dom = $(macPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-82, -128)
            }
        }

        if (location === 'Right') {
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

    /**
     * @description 选择查询类型
     * @param sel
     */
    selectQueryType(sel: any) {
        this.FrequencyAnalysisParams.type = sel.value;
    }

    // 获取离线任务列表
    private getAccompOffLineList() {
        let self = this;
        let params = {
            "id": self.userInfoCacheFactory.getCurrentUserId(),
            "taskType": "SearchPerceiveFrequency"
        };
        self.analysisService.getOffLineList(params).then((res: any) => {
            if (res.code === 200 && Array.isArray(res.data)) {
                let List:Array<InteligentTaskInfo> = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].Ext = JSON.parse(res.data[i].Ext);
                    List.push(res.data[i]);
                }
                self.FrequencyOffLine = List;
            }
        })
    }

    /**
     * @description 删除离线任务
     * @param {AccompOffLine} item
     */
    private deleteAccompOffLine(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            "taskId": item.TaskId,
            "taskType": item.TaskType
        };
        self.analysisService.deleteOffLineDetail(params).then((res: any) => {
            if (res.code === 200) {
                self.layerDec.warnInfo('删除成功');
                self.getAccompOffLineList();
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: PerceiveInfos, index: number, type?: string) {
        if (type) {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.ID, MarkersIcon.HoverRedIcon, 999)
        } else {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.ID, MarkersIcon.HoverRedIcon, 999)
        }
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: PerceiveInfos, index: number, type?: string) {
        let res = this.accpTrackResultForMap[item.ID];
        if (type) {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.ID, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
        } else {
            this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.ID, MarkersIcon.NormalBlueIcon, res.resultIndex + 1);

        }
    }

    changeAccpResultPage(i: number) {
        this.accpResultParams.currentPage = i;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0);
    }

    setAccpTrack(i: number) {
        if (!this.checkRightResult[i]) {
            this.slideRightResult(i);
        }
        let arr = this.convertLonLat(this.allAccpTrackResult[this.accpResultIndex].PerceiveInfos);
        this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
    }

    slideRightResult(i: number) {
        this.setCheckRightResult(this.resultParams.pageSize, i);
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

    setShowAnalysisList(status: boolean) {
        this.showAnalysisList = status;
        if(status) {
            this.getAccompOffLineList();
        }
    }
}

app.controller('MacFrequencyController', MacFrequencyController);