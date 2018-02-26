/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
import "../TrackPopup/track.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"
import "./Mac.accomp.service";
import 'css!../style/MacAccompany.css';
import {app} from "../../common/app/main.app";
import {NPGisMapMain} from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {TraceAnalyzeOpts, PolylineStyle} from "../../common/map/map.interface";

// 服务
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import {IMacAccompService, PageParams} from "./Mac.accomp.service";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";

// 消息弹框
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

// 参数
import {
    AccompanyingAnalysisResult,
    Result
} from '../../../core/entity/AccompanyingAnalysisEnum';
import { InteligentTaskInfo } from '../../../core/entity/InteligentTaskInfo';

import {
    MarkersIcon,
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
    SexData, Capture, MockCaptureList
} from '../AnalysisEnum';

import {
    MacAccompanyingAnalysis,
    MacAccompOffLine
} from './MacAccompanyEnum';


class WinPopupType {
    static Track: string = 'Track';
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
}

class CacheResult extends Result {
    resultIndex: number;
}

declare let popupHtml: any, angular: any, trackPopupHtml: any, $: any, detailPopupHtml: any;


class MacAccompanyController {
    $inject: Array<string> = ['$scope', '$rootScope', '$timeout', 'analysisService', 'macAccompService', 'layer', 'userInfoCacheFactory', 'layerDec'];

    AccompanyingAnalysisParams: MacAccompanyingAnalysis; // 定义mac伴随参数
    AccompOffLine: Array<InteligentTaskInfo> = []; // mac伴随离线任务

    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;
    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    SexDateList: Array<Enum<number>> = getSexDataList();
    GlassDateList: Array<Enum<number>> = getGlassesDataList();
    AgeDataList: Array<Enum<Age>> = getAgeList();
    MaskDateList: Array<Enum<number>> = getMaskDataList();
    FastDate: Enum<TimeLength> = FastData.today;
    SexDate: Enum<number> = SexData.all;
    GlassDate: Enum<number> = GlassesData.all;
    MaskDate: Enum<number> = MaskData.all;
    similarityMax: number = 100;
    showResult: boolean = false;
    showForm: boolean = true;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    showAllAccompanyResult: boolean = false;
    resultParams: PageParams = new PageParams();
    resultMarkers: Array<NPMapLib.Symbols.Marker>;
    resultToSystemPoints: Array<SystemPoint> = [];
    accompImagePath: string;
    mapTrackID: string;
    mapAccpTrackID: string;
    checkRightResult: Array<boolean> = [false];
    windowWidth: number = getWidowSize().width;
    allTrackResult: Array<Result>;
    isSortLetter: boolean = true;
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    trackWinInfo: string;
    accpTrackWinInfo: string;
    markerWininfo: string;
    currentLayerIndex: number;
    trackResultForMap: { [key: string]: Result | CacheResult };
    accpTrackResultForMap: { [key: string]: Result | CacheResult };
    accpResultParams: PageParams = new PageParams();
    accpResultIndex: number;

    allAccpTrackResult: Array<Result>;
    queryPattern: Array<any>;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private macAccompService: IMacAccompService,
                private layer: any,
                private $compile: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec) {
        let self = this;
        // 初始化参数
        self.AccompanyingAnalysisParams = self.initParams();

        self.getAccompOffLineList();

        this.map = this.$scope.$parent.map;
        if (this.map) {
            this.initForMapLayer()
        }
        this.systemPointList = this.$scope.$parent.systemPoint;

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
        this.$scope.$on('close.camera.popup', (event: any, cameraIds: Array<string>) => {
            if (Array.isArray(cameraIds)) {
                this.AccompanyingAnalysisParams.arrCameraId = cameraIds;
            }
            this.layer.close(this.currentLayerIndex);
        });
        this.$scope.$on('$destroy', () => {
            this.destoryForMapMarker();
            this.map.renderMarkers(this.systemPointList);
        })

        this.queryPattern = [
            {name: "MAC", value: "MAC", key: 0},
            {name: "IMEI", value: "IMEI", key: 1},
            {name: "IMSI", value: "IMSI", key: 2}
        ];
    }

    private initForMapLayer() {
        this.map.renderOverlayLayer(OverlayName.MapForResultLayer);
        this.map.renderOverlayLayer(OverlayName.MapForTrackLineLayer);
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

    private initParams(): MacAccompanyingAnalysis {
        let params = new MacAccompanyingAnalysis();
        params.taskName = "";
        params.taskType = "";
        params.startTime = "2017-09-27 00:00:00" || this.FastDate.value.startTime;
        params.endTime = "2017-09-28 23:59:59" || this.FastDate.value.endTime;
        params.arrCameraId = [];
        params.followNum = 3;
        params.agofollowTime = 10;
        params.afterfollowTime = 10;
        params.type = "IMEI";
        params.value = "";
        return params;
    }

    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.AccompanyingAnalysisParams.startTime = item.value.startTime;
        this.AccompanyingAnalysisParams.endTime = item.value.endTime;
    }

    deleteImage() {
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

    private getSystemPointForParams(points: Array<Result>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        points.forEach((item: Result) => {
            let CameraID = item.AccessLog.CameraID;
            let s = false;
            for (let index = 0; index < this.systemPointList.length; index++) {
                let point = this.systemPointList[index];
                if (CameraID === point.ObjectID) {
                    s = true;
                    arr.push({
                        Lat: point.Lat,
                        Lon: point.Lon,
                        ID: point.ID,
                        ObjectID: point.ObjectID,
                        resultID: item.AccessLog.ID
                    }as SystemPoint);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
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
                    let info = this.map.getInfoWindowByID(this.trackWinInfo)
                    if (info) info.close();
                    this.trackWinInfo = this.createMapPopup(evt.point, data, WinPopupType.Track);
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

    setAccpTrack(i: number) {
        if (!this.checkRightResult[i]) {
            this.slideRightResult(i);
        }
        if (Array.isArray(this.allAccpTrackResult) && this.allAccpTrackResult.length > 0) {
            this.map.clearTraceAnalyze(this.mapAccpTrackID);
            let arr = this.getSystemPointForParams(this.allAccpTrackResult);
            let style = {
                color: TrackConfig.TrackColorBlue,
                weight: TrackConfig.TrackWeight,
                speed: TrackConfig.TrackSpeed,
                moveUrl: TrackConfig.PersonTrackGreenHandle,
                afterDraw: (evt: any) => {
                    let data = this.allAccpTrackResult[evt.index] as Result;
                    let info = this.map.getInfoWindowByID(this.accpTrackWinInfo);
                    if (info) info.close();
                    this.accpTrackWinInfo = this.createMapPopup(evt.point, data, WinPopupType.Track);
                },
                stop: () => {
                    this.$timeout(() => {
                        this.map.getInfoWindowByID(this.accpTrackWinInfo).close();
                        this.accpTrackWinInfo = null;
                    }, 3000)
                }
            } as TraceAnalyzeOpts;
            this.map.addOverlaysForLine(OverlayName.MapForTrackLineLayer, OverlayName.MapForAccpLineGroup, arr, {
                weight: TrackConfig.TrackWeight,
                color: TrackConfig.LineColorForBlue
            } as PolylineStyle);
            this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, true, arr, false, [], MarkersIcon.NormalGreenIcon);
            this.mapAccpTrackID = this.map.createTraceAnalyze(arr, style);
            this.map.startTraceAnalyze(this.mapAccpTrackID);

        }
    }

    //TODO 创建地图弹框
    createMapPopup(point: NPMapLib.Geometry.Point, data: Result, type: string): string {
        if (type === WinPopupType.Track) {
            return this.createTrackPopup(point, data);
        }
        if (type === WinPopupType.Marker) {
            return this.createMarkerPopup(point, data);
        }

    }

    createTrackPopup(point: NPMapLib.Geometry.Point, data: Result) {
        let WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: new NPMapLib.Geometry.Size(-82, -248)
        });
        let scope: { traceData: Result, $destroy: Function } = this.$scope.$new();
        scope.traceData = data;
        let dom = $(trackPopupHtml).get(0);
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

    openDetailPopup(item: Result | CacheResult, index: number, groupName: string) {
        let scope: { result: Result, allResult: Array<Result>, index: number, $destroy: Function } = this.$scope.$new();
        if (groupName === OverlayName.MapForResultGroup) {
            scope.allResult = this.allTrackResult;
        } else {
            scope.allResult = this.allAccpTrackResult;
        }

        scope.result = item;
        scope.index = index;
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

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: Result, index: number, type?: string) {
        if (type) {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)
        } else {
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)

        }
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: Result, index: number, type?: string) {
        if (type) {
            let res = this.accpTrackResultForMap[item.AccessLog.ID] as CacheResult;
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);

        } else {
            let res = this.trackResultForMap[item.AccessLog.ID] as CacheResult;
            this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.NormalBlueIcon, res.resultIndex + 1);

        }
    }

    getKey(item: Result) {
        return new Date().getTime() * Math.random();
    }

    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.showAllAccompanyResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0);
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
            this.showAllAccompanyResult = false;
            this.destoryForMapMarker();
            this.map.renderMarkers(this.systemPointList);
            this.isSortLetter = true;
        })
    }

    goAllResult() {
        this.showForm = false;
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams)
        console.log(this.resultParams)
    }

    goAccompanyAllResult() {
        this.showForm = false;
        this.showResult = false;
        this.showAllAccompanyResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        console.log(this.resultParams)
    }


    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        if (this.isSortLetter) {
            this.$timeout(() => {
                this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, this.getSystemPointForParams(this.resultParams.data.result), this.isSortLetter, this.sortLetter)
            })
        }

    }

    changeAccpResultPage(i: number) {
        this.accpResultParams.currentPage = i;
        this.accpResultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0);
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

    showAnalysisResult(item: InteligentTaskInfo) {

        // this.macCarCrashMockService.searchAccompanying(item).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
        //     this.$timeout(() => {
        //         this.macAccompService.setFaceAccompDataList(res.data);
        //     }).then(() => {
        //         this.resultParams.pageSize = 6;
        //         this.resultParams.currentPage = 1;
        //         this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        //         this.allTrackResult = this.macAccompService.getAllFaceTrackData();
        //
        //         this.accpResultParams.pageSize = 6;
        //         this.accpResultParams.currentPage = 1;
        //         this.accpResultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
        //         this.setResultForMap(this.allTrackResult);
        //
        //     }).then(() => {
        //         this.map.removeMarkers(this.systemPointList);
        //         this.showForm = false;
        //         this.showResult = true;
        //         let arr = this.getSystemPointForParams(this.resultParams.data.result);
        //         this.renderMakers(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, true, arr, true, this.sortLetter);
        //         this.setCheckRightResult(this.resultParams.pageSize, 0, true);
        //         this.renderAccpMarkers();
        //     })
        //
        // })

    }

    // 创建mac分析离线任务
    submitSearch() {
        let self = this;
        if (!self.AccompanyingAnalysisParams.startTime || !self.AccompanyingAnalysisParams.endTime || self.AccompanyingAnalysisParams.endTime < self.AccompanyingAnalysisParams.startTime) {
            self.AccompanyingAnalysisParams.startTime = self.FastDate.value.startTime;
            self.AccompanyingAnalysisParams.endTime = self.FastDate.value.endTime
        }

        let params = self.initParams();
        params.taskName = self.AccompanyingAnalysisParams.taskName;
        params.taskType = "";
        params.startTime = "2017-09-27 00:00:00" || this.FastDate.value.startTime;
        params.endTime = "2017-09-28 23:59:59" || this.FastDate.value.endTime;
        params.arrCameraId = null;
        params.followNum = self.AccompanyingAnalysisParams.followNum;
        params.agofollowTime = self.AccompanyingAnalysisParams.agofollowTime;
        params.afterfollowTime = self.AccompanyingAnalysisParams.afterfollowTime;
        params.type = self.AccompanyingAnalysisParams.type;
        params.value = self.AccompanyingAnalysisParams.value;

        if (params.taskName === "") {
            return self.layerDec.warnInfo('请输入任务名称');
        }

        if (params.value === "") {
            return self.layerDec.warnInfo('请输入查询内容');
        }

        self.analysisService.searchMacAccompanying(params).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
            self.showAnalysisList = true;
            self.getAccompOffLineList();
        })
    }

    // 获取离线任务列表
    private getAccompOffLineList() {
        let self = this;
        let params = {
            "id": self.userInfoCacheFactory.getCurrentUserId(),
            "taskType": "SearchPerceiveAccompany"
        };
        self.analysisService.getOffLineList(params).then((res: any) => {
            if (res.code === 200 && Array.isArray(res.data)) {
                let List:Array<InteligentTaskInfo> = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].Ext = JSON.parse(res.data[i].Ext);
                    List.push(res.data[i]);
                }
                self.AccompOffLine = List;
            }
        })
    }

    /**
     * @description 获取离线任务详情
     * @param {MacAccompOffLine} item
     */
    private getAccompOffLineDetail(item: MacAccompOffLine) {
        let self = this;
        let params = {
            "analyseTaskType": "SearchAnalyseTaskResult",
            "taskId": item.TaskId,
            "TaskType": "SearchPerceiveAccompany",
            "PerceiveType": item.Ext.type
        };
        self.analysisService.getOffLineDetail(params).then((res: any) => {
            console.log(res);
        })
    }

    /**
     * @description 选择查询类型
     * @param sel
     */
    selectQueryType (sel:any) {
        this.AccompanyingAnalysisParams.type = sel.value;
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
}

app.controller('MacAccompanyController', MacAccompanyController);