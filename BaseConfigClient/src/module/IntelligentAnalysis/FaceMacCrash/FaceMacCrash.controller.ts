/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />
/// <amd-dependency path="text!../TrackPopup/track.popup.html" name="trackPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopup/mac.popup.html" name="macPopupHtml" />
/// <amd-dependency path="text!../TrackPopupDetail/track.popup.detail.html" name="detailPopupHtml" />
/// <amd-dependency path="text!../MacTrackPopupDetail/mac.popup.detail.html" name="detailMacPopupHtml" />
/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/FaceMacCrash.css';


// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

import "../Analysis.camera.popup"
import "../TrackPopup/track.popup.controller"
import "../MacTrackPopup/mac.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"
import "../MacTrackPopupDetail/mac.popup.detail.controller"


import {NPGisMapMain} from '../../common/map/map.main';
import {SystemPoint} from "../../../core/entity/SystemPoint";

import {
    AccompanyingAnalysis,
    AccompanyingAnalysisResult,
    Result,
    wifiResult
} from '../../../core/entity/AccompanyingAnalysisEnum'

import {IMacCarCrashMockService} from "../../common/services/macCarCrashMock.service";
import "../../common/services/macCarCrashMock.service";

import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {TraceAnalyzeOpts, PolylineStyle} from "../../common/map/map.interface";

// 服务
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../main/macAnalysisMap.service";
import {IMacAnalysisMapService} from "../main/macAnalysisMap.service";
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';

import {InteligentTaskInfo} from '../../../core/entity/InteligentTaskInfo';
import {SystemConfigParams} from "../../../core/entity/SystemConfigParams";
import {
    MarkersIcon,
    TrackConfig,
    OverlayName,
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
    SexData,
    Capture,
    MockCaptureList,
    ArrayUnique,
    data,
    timeLength,
    getdataList,
    getHours,
    dataLists,
    QueryPattern
} from '../AnalysisEnum';

// 分页方法
import {PageParamsAndResult, Pagination, IPagination} from '../../common/Pagination'
// 任务类型参数
import {AnalyseTaskType, OfflineTaskType} from "../../../core/server/enum/AnalyseTaskOffLine";
import {ObjectType} from '../../../core/enum/ObjectType';
import {CollectDataType} from '../../../core/server/enum/CollectDataType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

class WinPopupType {
    static Track: string = 'Track';
    static Marker: string = 'Marker';
    static Detail: string = 'Detail';
}
class CacheResult extends Result {
    resultIndex: number;
}
const TypeList: Array<{ key: string, text: string }> = [
    {key: 'FaceToMac', text: '人脸碰感知数据'},
    {key: 'MacToFace', text: '感知数据碰人脸'}
];
declare let popupHtml: any, angular: any, trackPopupHtml: any, $: any, detailPopupHtml: any, macPopupHtml: any, detailMacPopupHtml: any, loadingAnalysisHtml: any, selectFacePopupHtml: any, demarcatePopupHtml: any, PopupHtml: any, cameraTreePopupHtml: any;


class FaceMacCrashController {
    $inject: Array<string> = ['$scope', '$rootScope', '$timeout', 'macCarCrashMockService', 'layer', 'analysisService', 'layerDec', 'userInfoCacheFactory', 'analysisMmapServer', 'macAnalysisMapService', 'resourceRetrievalService', 'uploadImageService', '$interval', 'handleStorage', '$state'];

    map: NPGisMapMain;
    systemPointList: Array<SystemPoint>;

    FastDateList: Array<data<timeLength>> = getdataList();// 一天时间筛选
    FastDate: data<timeLength> = dataLists.today;
    SexDateList: Array<Enum<number>> = getSexDataList();
    GlassDateList: Array<Enum<number>> = getGlassesDataList();
    AgeDataList: Array<Enum<Age>> = getAgeList();
    MaskDateList: Array<Enum<number>> = getMaskDataList();
    SexDate: Enum<number> = SexData.all;
    GlassDate: Enum<number> = GlassesData.all;
    MaskDate: Enum<number> = MaskData.all;
    similarityMax: number = 100;
    similarityMin: number = 80;

    showResult: boolean = false;
    showForm: boolean = true;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    showAllAccompanyResult: boolean = false;
    isSortLetter: boolean = true;
    resultSort: boolean = true; // 排序方式
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];

    AccompanyingAnalysisParams: AccompanyingAnalysis = new AccompanyingAnalysis();// 创建离线任务参数

    resultParams: PageParamsAndResult = new PageParamsAndResult();
    accpResultParams: PageParamsAndResult = new PageParamsAndResult();
    ResultPagination: IPagination = new Pagination();
    AccpPagination: IPagination = new Pagination();
    allTrackResult: Array<Result>;
    allAccpTrackResult: Array<Result>;
    trackResultForMap: { [key: string]: Result | CacheResult };
    accpTrackResultForMap: { [key: string]: Result | CacheResult };
    accpResultIndex: number;

    AccompOffLine: Array<any> = [];
    resultToSystemPoints: Array<SystemPoint> = [];

    checkRightResult: Array<boolean> = [false];
    windowWidth: number = getWidowSize().width;

    resultMarkers: Array<NPMapLib.Symbols.Marker>;
    accompImagePath: string;
    mapTrackID: string;
    mapAccpTrackID: string;
    trackWinInfo: string;
    accpTrackWinInfo: string;

    markerWininfo: string;
    currentLayerIndex: number;

    typeList: Array<{ key: string, text: string }> = TypeList;
    currentType: { key: string, text: string } = {key: 'FaceToMac', text: '人脸碰MAC'};
    resultRightType: string = 'Mac';
    resultLeftType: string = 'Mac';

    queryParams: any;
    queryPattern: Array<any> = QueryPattern; // 查询类型
    selectDeviceCb: string = "close.device.popup";
    selectFaceCtrl: string = "get-face-info-quick";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;
    arrCameraId: Array<string> = [];

    constructor(private $scope: any,
                private $timeout: any,
                private macCarCrashMockService: IMacCarCrashMockService,
                private layer: any,
                private $compile: any,
                private analysisService: IAnalysisService,
                private layerDec: ILayerDec,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private analysisMmapServer: IAnalysisMmapServer,
                private macAnalysisMapService: IMacAnalysisMapService,
                private resourceRetrievalService: IResourceRetrievalService,
                private uploadImageService: IUploadImageService,
                private $interval:any,
                private handleStorage: IHandleStorage,
                private $state: any) {
        let self = this;
        self.initQueryParams();

        self.map = self.$scope.$parent.map;
        if (self.map) {
            self.initForMapLayer()
        }
        self.systemPointList = self.$scope.$parent.systemPoint;
        self.AccompanyingAnalysisParams = self.initParams();
        self.$timeout(() => {
            self.$scope.$emit('showItemPage', true);
        });
        self.$scope.$on('map.ready', (event: any, map: any) => {
            self.map = map;
            self.initForMapLayer()
        });
        self.$scope.$on('points.ready', (event: any, points: Array<SystemPoint>) => {
            self.systemPointList = points;
        });
        self.$scope.$on('$destroy', () => {
            try {
                self.analysisMmapServer.clearDraw();
                self.destoryForMapMarker();
                self.analysisMmapServer.getMap().renderMarkers(this.systemPointList);
            } catch (e) {
                console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
            }
            $interval.cancel(self.setInterval);
        });

        // 监听人脸选择事件
        self.$scope.$on(self.selectFaceCtrl, function (event: any, data: any) {
            self.$timeout(() => {
                self.queryParams.imagePath = data.data.imageurl;
                self.queryParams.taskId = data.data.key;
            })
        });

        // 监听设备返回事件
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status:boolean, geometry?: NPMapLib.Geometry.Polygon, type?: string) => {
            if(status && Array.isArray(deviceIds)) {
                self.deviceIdFilter(deviceIds, type);
            } else if (geometry) {
                self.analysisMmapServer.removeDrawShape(geometry);
            }
            self.layer.close(self.currentLayerIndex);
        });

        // 定时请求离线任务
        self.setInterval  = $interval(function(){
            self.getAccompOffLineList();
        }, 10000);
    }

    // 初始化查询参数
    private initQueryParams() {
        this.FastDate = dataLists.today;
        this.SexDate = SexData.all;
        this.GlassDate = GlassesData.all;
        this.MaskDate = MaskData.all;
        this.arrCameraId = [];

        this.queryParams = {
            imagePath: "",
            taskId: "",
            taskName: "",
            deviceVal: "",
            startTime: this.FastDate.value.startTime,
            endTime: this.FastDate.value.endTime,
            followNum: 3,
            agofollowTime: 5,
            afterfollowTime: 5,
            threshold: 90,
            maxAge: null,
            minAge: null,
            arrCameraId: [],
            arrEyeGlasses: [],
            arrGender: [],
            arrMask: [],
            queryMacType: "MAC"
        };
    }

    private initParams(): AccompanyingAnalysis {
        let params = new AccompanyingAnalysis();
        params.arrCameraId = [];
        params.imagePathList = [];
        params.arrEyeGlasses = [];
        params.arrMask = [];
        params.arrGender = [];
        params.startTime = ""
        params.endTime = "";
        return params;
    }

    // 设备id去重
    private deviceIdFilter(ids: Array<string>, type?: string) {
        let self = this;
        let arrCameraId: Array<string> =  [];
        if (type === "tree") {
            arrCameraId = ids;
        } else {
            arrCameraId =  _.concat(ids, self.arrCameraId);
        }
        arrCameraId = _.sortedUniq(arrCameraId);
        self.arrCameraId = arrCameraId;
    }

    private initForMapLayer() {
        this.map.renderOverlayLayer(OverlayName.MapForResultLayer);
        this.map.renderOverlayLayer(OverlayName.MapForTrackLineLayer);
    }

    // 清除地图点位以外信息
    private destoryForMapMarker() {
        this.analysisMmapServer.clearAccpMarkers();
        // this.map.removeOverlaysByName(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup);
        // this.map.removeOverlaysByName(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup);
        // this.map.removeOverlaysByName(OverlayName.MapForTrackLineLayer, OverlayName.MapForResultLineGroup);
        // this.map.removeOverlaysByName(OverlayName.MapForTrackLineLayer, OverlayName.MapForAccpLineGroup);
        // if (this.mapTrackID) {
        //     this.map.clearTraceAnalyze(this.mapTrackID);
        // }
        // if (this.mapAccpTrackID) {
        //     this.map.clearTraceAnalyze(this.mapAccpTrackID);
        // }
        // let trackWinInfo = this.map.getInfoWindowByID(this.trackWinInfo);
        // if (trackWinInfo) {
        //     trackWinInfo.close();
        // }
        // let accpTrackWinInfo = this.map.getInfoWindowByID(this.accpTrackWinInfo);
        // if (accpTrackWinInfo) {
        //     accpTrackWinInfo.close();
        // }
    }

    setFastDate(item: data<timeLength>) {
        this.FastDate = item;
        let time: timeLength;
        switch (item.key) {
            case "today":
                time = getHours(0);
                break;
            case "lasthour":
                time = getHours(1);
                break;
            case "lastFourHour":
                time = getHours(6);
                break;
            case "lastThreeDay":
                time = getHours(12);
                break;
        }
        this.queryParams.startTime = time.startTime;
        this.queryParams.endTime = time.endTime;
    }

    selectType(item: { key: string, text: string }) {
        this.currentType = item;
    }

    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.queryParams.maxAge = age.value.maxAge;
            this.queryParams.minAge = age.value.minAge;
        } else {
            this.queryParams.maxAge = null;
            this.queryParams.minAge = null;
        }
    }

    slideRightResult(i: number) {
        this.setCheckRightResult(this.accpResultParams.pageSize, i);
    }

    submitSearch() {
        let self = this;
        if (self.queryParams.taskName === "") {
            this.layer.msg('请输入任务名称');
            return false;
        }
        if (self.currentType.key === "MacToFace") {
            let macCrashParams: any = {
                "afterfollowTime": self.queryParams.afterfollowTime||5,
                "agofollowTime": self.queryParams.agofollowTime||5,
                "endTime": self.queryParams.endTime,
                "startTime": self.queryParams.startTime,
                "followNum": self.queryParams.followNum||3,
                "TaskName": self.queryParams.taskName,
                "threshold": self.queryParams.threshold,
                "type": self.queryParams.queryMacType,
                "value": self.queryParams.deviceVal
            };
            // 判断时间
            if (macCrashParams.endTime < macCrashParams.startTime) {
                this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            self.analysisService.macToFace(macCrashParams).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                    self.ClearDraw();
                    self.initQueryParams();
                } else {
                    self.layer.msg('离线任务创建失败');
                }
            })
        } else if (self.currentType.key === "FaceToMac") {
            if (self.queryParams.taskId === "") {
                this.layer.msg('请上传图片');
                return false;
            }
            // 设置查询设备id
            if(self.arrCameraId.length>0) {
                self.queryParams.arrCameraId = self.arrCameraId;
            } else {
                let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
                let cameraList:Array<string> = [];
                _(systemPointList).forEach(function(value) {
                    if (ObjectType.Camera.value === value.ObjectType) {
                        cameraList.push(value.ObjectID);
                    }
                });
                self.queryParams.arrCameraId = cameraList;
            }

            // 设置性别
            if (self.SexDate.key !== "all") {
                self.queryParams.arrGender.push(self.SexDate.key);
            }
            // 设置眼镜
            if (self.GlassDate.value !== null) {
                self.queryParams.arrEyeGlasses.push(self.GlassDate.value);
            }
            // 设置口罩
            if (self.MaskDate.value !== null) {
                self.queryParams.arrMask.push(self.MaskDate.value);
            }
            let faceCrashParams: any = {
                "afterfollowTime": self.queryParams.afterfollowTime||5,
                "agofollowTime": self.queryParams.agofollowTime||5,
                "endTime": self.queryParams.endTime,
                "startTime": self.queryParams.startTime,
                "followNum": self.queryParams.followNum||3,
                "threshold": self.queryParams.threshold,
                "taskId": self.queryParams.taskId,
                "imagePath": self.queryParams.imagePath,
                "taskName": self.queryParams.taskName,
                "arrCameraId": self.queryParams.arrCameraId,
                "arrGender": self.queryParams.arrGender,
                "arrEyeGlasses": self.queryParams.arrEyeGlasses,
                "arrMask": self.queryParams.arrMask
            };
            // 判断时间
            if (faceCrashParams.endTime < faceCrashParams.startTime) {
                this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            self.analysisService.faceToMac(faceCrashParams).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                    self.ClearDraw();
                    self.initQueryParams();
                } else {
                    self.layer.msg('离线任务创建失败');
                }
            })
        }
    }

    // 获取离线任务列表
    private getAccompOffLineList() {
        let self = this;
        let params = {
            "id": self.userInfoCacheFactory.getCurrentUserId(),
            "taskTypeList": [OfflineTaskType.SearchFacePerceiveCollision, OfflineTaskType.SearchPerceiveFaceCollision]
        };
        self.analysisService.getOffLineList(params).then((res: any) => {
            let List: Array<InteligentTaskInfo> = [];
            if (res.code === 200 && Array.isArray(res.data)) {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].Ext = JSON.parse(res.data[i].Ext);
                    List.push(res.data[i]);
                }
            }
            let AccompOffLineList: any  = _.sortBy(List, function (item: any) {
                return -(Date.parse(item.CreateTime));
            });
            self.AccompOffLine = AccompOffLineList;
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
                self.layerDec.info('删除成功');
                self.getAccompOffLineList();
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    setCheckRightResult(size: number, traget: number, isFirst?: boolean) {
        let self = this;
        let arr = [] as Array<boolean>;
        for (let i = 0; i < size; i++) {
            if (i === traget) {
                arr.push(!self.checkRightResult[traget])
            } else {
                arr.push(false)
            }
        }
        this.accpResultIndex = traget;
        if (isFirst) {
            arr[traget] = true
        }
        self.checkRightResult = arr;
        // 处理伴随设备与收藏状态数据
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Camera.value;
        _.forEach(self.accpResultParams.data[traget].PerceiveAccompanyLogs,function (value) {
            if (value.MacDeviceId) {
                params.deviceIds.push(value.MacDeviceId);
                params.ids.push(value.ID);
                params.deviceType = ObjectType.Wifi.value;
            } else if (value.MobileDeviceId) {
                params.deviceIds.push(value.MobileDeviceId);
                params.ids.push(value.ID);
                params.deviceType = ObjectType.ElectronicFence.value;
            }
        });
        if (params.deviceIds.length === 0) {
            params.deviceIds.push("000001");
        }
        if (params.ids.length === 0) {
            params.ids.push("000001");
        }
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(self.accpResultParams.data[traget].PerceiveAccompanyLogs,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderAccpMarkers()
            });
        });
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
                    } as SystemPoint);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }

    private getSystemPointByWifi(points: Array<any>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        points.forEach((item: wifiResult) => {
            let CameraID = item.MobileDeviceId || item.MacDeviceId;
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
                        resultID: item.ID
                    } as SystemPoint);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }

    // 绘制轨迹信息
    setReultTrack() {
        let self = this;
        self.clearResultMarkersInfo();
        self.$timeout(() => {
            self.isSortLetter = false;
            let allResultList = _.sortBy(self.allTrackResult, function (item: any) {
                return (Date.parse(item.AccessLog.LogTime));
            });
            self.ResultPagination.set(allResultList);
            self.resultParams.pageSize = 6;
            self.resultParams.currentPage = 1;
            self.resultParams = self.ResultPagination.getByPage(self.resultParams);
            self.allTrackResult = self.resultParams.allData;
            self.setResultForMap(self.allTrackResult);
        }).then(() => {
            let points = self.analysisMmapServer.getSystemPointForParams(self.allTrackResult);
            self.analysisMmapServer.setTrackAnimation(self.allTrackResult, points, self.trackResultForMap);
        });
    }

    // 绘制伴随轨迹
    setAccpTrack(i: number) {
        this.clearAccpMarkersInfo();
        if (!this.checkRightResult[i]) {
            this.slideRightResult(i);
        }
        let arr = this.getSystemPointByWifi(this.allAccpTrackResult);
        this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
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
                size = new NPMapLib.Geometry.Size(-87, -248)
            } else {
                dom = $(macPopupHtml).get(0);
                size = new NPMapLib.Geometry.Size(-87, -128)
            }
        }


        let WinInfo = this.analysisMmapServer.getMap().createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: size
        });
        let scope: { traceData: Result, $destroy: Function } = this.$scope.$new();
        scope.traceData = data;

        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.analysisMmapServer.getMap().openInfoWindow(WinInfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.analysisMmapServer.getMap().closeInfoWindow(WinInfo);
                }
            });
        });
        return WinInfo;
    }

    createMarkerPopup(point: NPMapLib.Geometry.Point, data: Result) {
        let Wininfo = this.analysisMmapServer.getMap().createInfoWindow(point.lon, point.lat, {
            iscommon: true,
            offset: new NPMapLib.Geometry.Size(-82, -248)
        });
        let scope: { traceData: Result, $destroy: Function } = this.$scope.$new();
        scope.traceData = data;
        let dom = $(trackPopupHtml).get(0);
        dom = this.$compile(dom.outerHTML)(scope);
        this.$timeout(() => {
            this.analysisMmapServer.getMap().openInfoWindow(Wininfo, dom[0], {
                close: () => {
                    scope.$destroy();
                    this.analysisMmapServer.getMap().closeInfoWindow(Wininfo);
                }
            });
        });
        return Wininfo
    }

    openDetailPopup(item: any, index: number, groupName: string) {
        let self = this;
        let objectType:string ="";
        let newItem: any = {};
        let newList:Array<any> = [];
        if (groupName === 'Face') {
            objectType = ObjectType.Camera.value;
            newItem = item;
        }
        if (groupName === 'Mac') {
            if (item.Mac) {
                objectType = ObjectType.Wifi.value;
                newItem.wifiLog = {};
                newItem.wifiLog = item;
                newItem.deviceInfo = item.deviceInfo;
            } else if (item.IMEI) {
                objectType = ObjectType.ElectronicFence.value;
                newItem.eFenceLog = {};
                newItem.eFenceLog = item;
                newItem.deviceInfo = item.deviceInfo;
            }
        }
        newList.push(newItem);

        let scope: {
            $destroy: Function,
            rank: number,
            allList: Array<any>,
            collectFunction: Function,
            analysisFunction: Function,
            surveillanceFunction: Function,
            closePopup: Function,
            showFooter: boolean
            index:any
        } = self.$scope.$new();
        scope.rank = index;
        scope.allList = newList;
        scope.showFooter = true;
        scope.index = "";
        scope.collectFunction = (item: any) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: any,type:string) => {
            self.clickAnalysis(null, item, type);
        };
        scope.surveillanceFunction = (item: any) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(scope.index);
        };

        self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
    }

    //TODO 渲染地图点位
    private renderMakers(layerName: string,
                         groupName: string,
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

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: any, index: number, type?: string) {
        let id: string;
        if (type === "Mac") {
            id = item.ID;
        }
        if (type === "Mac") {
            this.macAnalysisMapService.resultToMap(id, type);
            // this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)
        } else {
            this.analysisMmapServer.resultToMap(item, type);
            // this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.HoverRedIcon, 999)
        }
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: any, index: number, type?: string) {
        let id: string;
        if (type === "Mac") {
            id = item.ID;
        }
        if (type === "Mac") {
            this.macAnalysisMapService.unResultToMap(id, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
        } else {
            this.analysisMmapServer.unResultToMap(item, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
        }
        // if (type) {
        //     let res = this.accpTrackResultForMap[item.AccessLog.ID] as CacheResult;
        //     this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup, item.AccessLog.ID, MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
        //
        // } else {
        //     let res = this.trackResultForMap[item.AccessLog.ID] as CacheResult;
        //     this.map.setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, item.AccessLog.ID, MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
        //
        // }
    }

    goBack() {
        this.ClearDraw(); // 清除框选区域内容
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    goBackForm() {
        this.$timeout(() => {
            this.showForm = true;
            this.showResult = false;
            this.showAnalysisList = false;
            this.isSortLetter = true;
            this.destoryForMapMarker();
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    goAllResult() {
        this.isSortLetter = true;
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.ResultPagination.getByPage(this.resultParams);
    }

    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.ResultPagination.getByPage(this.resultParams);
        this.allTrackResult = this.resultParams.allData;
        let arr = this.analysisMmapServer.getSystemPointForParams(this.resultParams.data);
        this.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForResultGroup,
            true,
            arr,
            this.trackResultForMap,
            this.isSortLetter,
            this.sortLetter);
    }

    goAccompanyAllResult() {
        this.showResult = false;
        this.showAllAccompanyResult = true;
        this.accpResultParams.pageSize = 40;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
    }

    closeAccompanyAllResult() {
        this.showResult = true;
        this.showAllAccompanyResult = false;
        this.accpResultParams.pageSize = 6;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
    }

    changeResultPage(i: number) {
        let self = this;
        self.resultParams.currentPage = i;
        self.resultParams = self.ResultPagination.getByPage(self.resultParams);
        self.allTrackResult = self.resultParams.allData;

        if (self.isSortLetter) {
            self.$timeout(() => {
                self.setResultForMap(self.allTrackResult);
                let arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                self.analysisMmapServer.renderMakers(
                    OverlayName.MapForResultLayer,
                    OverlayName.MapForResultGroup,
                    true,
                    arr,
                    self.trackResultForMap,
                    self.isSortLetter,
                    self.sortLetter);
            })
        }
    }

    changeAccpResultPage(i: number) {
        this.accpResultParams.currentPage = i;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
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
        let self = this;
        let accpArr = self.accpResultParams.data[self.accpResultIndex].PerceiveAccompanyLogs;
        let obj = {} as  { [key: string]: CacheResult };
        accpArr.forEach((item: any, index: number) => {
            obj[item.ID] = item;
            obj[item.ID].resultIndex = index;
        });
        self.accpTrackResultForMap = obj;
        self.allAccpTrackResult = accpArr;
        let resultList = self.getSystemPointByWifi(self.allAccpTrackResult);
        self.renderWifiMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForAccpGroup,
            true,
            resultList,
            self.accpTrackResultForMap,
            false,
            null,
            MarkersIcon.NormalGreenIcon
        );
    }

    showAnalysisResult(item: { [key: string]: any }) {
        let self = this;
        let params = {
            "analyseTaskType": AnalyseTaskType.SearchAnalyseTaskResult,
            "taskId": item.TaskId,
            "TaskType":  item.TaskType
        };
        self.initLoadingPop();
        self.analysisMmapServer.clearDraw(); // 清除框选区域内容

        if (item.TaskType === "SearchFacePerceiveCollision") {// 人脸碰感知数据
            self.analysisService.getOffLineDetail(params).then((res: any) => {
                if (res.code !== 200) {
                    self.layer.close(self.currentLayerIndex);
                    self.layerDec.warnInfo('查询结果失败');
                }else if (res.data&&res.data.SearchAccessResults&&(res.data.SearchAccessResults.length>0)) {
                    let resultList: any = _.sortBy(res.data.SearchAccessResults, function (item: any) {
                        return -item.Score;
                    });
                    let EFenceLogAccompanyEntities = res.data.EFenceLogAccompanyEntities || [];
                    let WiFiLogAccompanyEntitites = res.data.WiFiLogAccompanyEntitites || [];
                    let trackResultList: any = _.concat(EFenceLogAccompanyEntities, WiFiLogAccompanyEntitites);
                    trackResultList = _.sortBy(trackResultList, function (item: any) {
                        return -item.Num;
                    });
                    if (trackResultList.length > 0){
                        let params:any = {
                            deviceIds: [],
                            deviceType: '',
                            ids: [],
                            userId: self.userInfoCacheFactory.getCurrentUserId()
                        };
                        params.deviceType = ObjectType.Camera.value;
                        _.forEach(resultList,function (value) {
                            params.deviceIds.push(value.AccessLog.CameraID);
                            params.ids.push(value.AccessLog.ID);
                        });
                        if (params.deviceIds.length === 0) {
                            params.deviceIds.push("000001");
                        }
                        if (params.ids.length === 0) {
                            params.ids.push("000001");
                        }
                        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
                            _.forEach(resultList,function (item, index) {
                                item.deviceInfo = res.data.deviceInfo[index];
                                item.collectStatus = res.data.collectStatus[index];
                            });
                            self.analysisMmapServer.removeSystemPoint();
                            self.$timeout(() => {
                                self.ResultPagination.set(resultList);
                                self.AccpPagination.set(trackResultList);
                            }).then(() => {
                                self.resultParams.pageSize = 6;
                                self.resultParams.currentPage = 1;
                                self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                                self.allTrackResult = self.resultParams.allData;
                                self.setResultForMap(self.allTrackResult);

                                self.accpResultParams.pageSize = 6;
                                self.accpResultParams.currentPage = 1;
                                self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                            }).then(() => {
                                self.showForm = false;
                                self.showResult = true;
                                self.resultLeftType = 'Face';
                                self.resultRightType = 'Mac';

                                let arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                                self.analysisMmapServer.renderMakers(
                                    OverlayName.MapForResultLayer,
                                    OverlayName.MapForResultGroup,
                                    true,
                                    arr,
                                    self.trackResultForMap,
                                    self.isSortLetter,
                                    self.sortLetter);
                                self.setCheckRightResult(self.accpResultParams.pageSize, 0, true);
                            }).then(() => {
                                self.layer.close(self.currentLayerIndex);
                            })
                        });
                    } else {
                        self.layer.close(self.currentLayerIndex);
                        self.layerDec.info('没有查询到结果');
                    }
                } else {
                    self.layer.close(self.currentLayerIndex);
                    self.layerDec.info('没有查询到结果');
                }
            })
        } else {// 感知数据碰人脸
            self.analysisService.getOffLineDetail(params).then((res: any) => {
                if (res.code === 200 && res.data) {
                    self.clearOtherInfo();
                    self.$timeout(() => {
                        let resultList: any = _.sortBy(res.data.PerceiveLogs, function (item: any) {
                            return -(Date.parse(item.AcqTime));
                        });
                        let trackResultList: any = _.sortBy(res.data.FaceAccompanyEntities, function (item: any) {
                            return -item.Num;
                        });
                        self.ResultPagination.set(resultList);
                        self.AccpPagination.set(trackResultList);
                    }).then(() => {
                        this.resultParams.pageSize = 6;
                        this.resultParams.currentPage = 1;
                        this.resultParams = this.ResultPagination.getByPage(this.resultParams);
                        this.allTrackResult = self.ResultPagination.get();
                        this.accpResultParams.pageSize = 6;
                        this.accpResultParams.currentPage = 1;
                        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
                        this.setResultForMap(this.allTrackResult);
                    }).then(() => {
                        this.analysisMmapServer.removeSystemPoint();
                        this.showForm = false;
                        this.showResult = true;
                        this.resultLeftType = 'Mac';
                        this.resultRightType = 'Face';
                        let arr = this.analysisMmapServer.getSystemPointForParams(this.resultParams.data);
                        this.analysisMmapServer.renderMakers(
                            OverlayName.MapForResultLayer,
                            OverlayName.MapForResultGroup,
                            true,
                            arr,
                            this.trackResultForMap,
                            true,
                            this.sortLetter);
                        // this.setCheckRightResult(this.resultParams.pageSize, 0, true);
                    })
                }
            })
        }
    }

    showAnalysisListFn(flag: boolean) {
        this.showAnalysisList = flag;
        if (flag) {
            this.getAccompOffLineList()
        }
    }

    // 弹框选择摄像机
    selectCamera() {
        let scope: { selectCameraList: Array<string>, $destroy: Function, selectCtrlCb: string } = this.$scope.$new();
        scope.selectCameraList = this.arrCameraId;
        scope.selectCtrlCb = this.selectDeviceCb;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: cameraTreePopupHtml,
            scope: scope,
            title: "摄像机选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 框选设备
    DrawRect() {
        this.analysisMmapServer.drawRect((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawCircle() {
        this.analysisMmapServer.drawCircle((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawPolygon() {
        this.analysisMmapServer.drawPolygon((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    ClearDraw() {
        this.arrCameraId = [];
        this.queryParams.arrCameraId = [];
        this.analysisMmapServer.clearDraw();
    }

    private DrawCallBackMethod(points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        if (points.length === 0) {
            this.analysisMmapServer.removeDrawShape(geometry);
            return this.layerDec.warnInfo('框选区域不存在设备！');
        }
        let arr: Array<SystemPoint> = [];
        points.forEach((item: SystemPoint) => {
            if (item.ObjectType === ObjectType.Camera.value) {
                arr.push(item);
            }
        });
        this.checkArea(arr, geometry);
    }


    private checkArea(deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let scope: { deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle, $destroy: Function, selectCheckAreaCb: string } = this.$scope.$new();
        scope.deviceList = deviceList;
        scope.geometry = geometry;
        scope.selectCheckAreaCb = this.selectDeviceCb;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: PopupHtml,
            scope: scope,
            title: false,
            closeBtn: 0,
            skin: "no-scroll",
            area: ["300px", "300px"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    //TODO 公共获取摄像机ID方法（地图框选）
    getCameraListForMap(points: Array<SystemPoint>) {
        points.forEach((point: SystemPoint) => {
            if (point.ObjectType === 'camera') {
                this.AccompanyingAnalysisParams.arrCameraId.push(point.ObjectID)
            }
        });
        this.AccompanyingAnalysisParams.arrCameraId = ArrayUnique(this.AccompanyingAnalysisParams.arrCameraId);
        this.selectCamera();
    }

    /**
     * @description 选择查询类型
     * @param sel
     */
    selectQueryType(sel: any) {
        this.queryParams.queryMacType = sel.value;
    }

    /**
     * @description 排序方式
     * @param {string} type //排序方式
     */
    sortReult(type: string) {
        let self = this;
        self.isSortLetter = true;

        self.clearResultMarkersInfo();
        let allResultList: any = self.ResultPagination.get();
        if (type === "score") {
            self.resultSort = true;
            allResultList = _.sortBy(allResultList, function (item: any) {
                return -item.Score;
            });
        } else if (type === "time") {
            self.resultSort = false;
            allResultList = _.sortBy(allResultList, function (item: any) {
                return -(Date.parse(item.AccessLog.LogTime));
            });
        }
        self.ResultPagination.set(allResultList);
        if (self.showAllResult) {
            self.resultParams.pageSize = 40;
            self.resultParams.currentPage = 1;
            self.resultParams = self.ResultPagination.getByPage(self.resultParams);
            self.allTrackResult = self.resultParams.allData;
        } else {
            self.resultParams.pageSize = 6;
            self.resultParams.currentPage = 1;
            self.resultParams = self.ResultPagination.getByPage(self.resultParams);
            self.allTrackResult = self.resultParams.allData;
            self.setResultForMap(self.allTrackResult);
            let arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
            self.analysisMmapServer.renderMakers(
                OverlayName.MapForResultLayer,
                OverlayName.MapForResultGroup,
                true,
                arr,
                self.trackResultForMap,
                self.isSortLetter,
                self.sortLetter);
        }
    }

    /**
     *
     * @description 渲染wifi makers
     * @param {string} layerName 图层名称
     * @param {string} groupName 点位组名称
     * @param {boolean} isClear 是否清楚之前的Maker
     * @param {Array<SystemPoint>} result 点位信息
     * @param {MapResult} resultForMap 结果Map对象
     * @param {boolean} flag 是否自定义文字 不穿未数组index下标
     * @param {Array<string>} lables 现在地图结果文字
     * @param {string} icon 显示体贴Maker 图标
     */
    private renderWifiMakers(layerName: string,
                             groupName: string,
                             isClear: boolean,
                             result: Array<SystemPoint>,
                             resultForMap: any,
                             flag?: boolean,
                             lables?: Array<string>,
                             icon?: string) {
        if (isClear) {
            this.analysisMmapServer.getMap().removeOverlaysByName(layerName, groupName);
        }
        this.analysisMmapServer.getMap().addOverlaysForMakers(layerName, groupName, result, {
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
                this.markerWininfo = this.createMapPopup(marker.getPosition(), result, WinPopupType.Track, "Right");
            },
            mouseOut: () => {
                this.analysisMmapServer.getMap().getInfoWindowByID(this.markerWininfo).close();
            },
            iconURL: icon
        }, flag, lables);
        // this.resultToSystemPoints = result;
    }


    /**
     * @description 清除地图上图层信息
     */
    private clearOtherInfo() {
        this.ClearDraw(); // 清除框选区域内容
        this.analysisMmapServer.clearResultMarkers();

        this.analysisMmapServer.clearDraw();
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearTrackInfoWindow();
    }

    clearResultMarkersInfo() {
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearTrackInfoWindow();
    }

    clearAccpMarkersInfo() {
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearAccpTrackInfoWindow();
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    clickCollect(event: any, item: any) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        if (!item.collectStatus) {
            let params: any;
            let newItem: any;
            if (item.AccessLog) {
                newItem = item;
                params = {
                    json: angular.toJson(item),
                    objectID: item.AccessLog.ID,
                    objectType: "Face"
                };
            } else if (item.Mac) {
                newItem = {
                    wifiLog: item,
                    deviceInfo: item.deviceInfo
                };
                params = {
                    json: JSON.stringify(newItem),
                    objectID: item.ID,
                    objectType: "Face"
                };
            } else if (item.IMEI) {
                newItem = {
                    eFenceLog: item,
                    deviceInfo: item.deviceInfo
                };
                params = {
                    json: JSON.stringify(newItem),
                    objectID: item.ID,
                    objectType: "Face"
                };
            }
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: any;
            if (item.AccessLog) {
                params = {
                    ids: item.AccessLog.ID
                };
            } else if (item.Mac) {
                params = {
                    ids: item.ID
                };
            } else if (item.IMEI) {
                params = {
                    ids: item.ID
                };
            }
            self.resourceRetrievalService.collectDeleteInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        }
        item.collectStatus = !item.collectStatus;
    }

    /**
     * @description 分析
     * @param item
     */
    clickAnalysis(event:any, item:any, type:string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.Face;
        storageParams.data = item;
        this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
        if (type === AnalysisGoToType.Track.key) {
            window.open(AnalysisGoToType.Track.data);
        } else if (type === AnalysisGoToType.Accompanying.key) {
            window.open(AnalysisGoToType.Accompanying.data);
        } else if (type === AnalysisGoToType.Frequency.key) {
            window.open(AnalysisGoToType.Frequency.data);
        } else if (type === AnalysisGoToType.More.key) {
            window.open(AnalysisGoToType.More.data);
        }
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    clickSurveillance(event: any, item: any) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    // 加载中动画
    initLoadingPop() {
        let scope: { $destroy: Function } = this.$scope.$new();
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: loadingAnalysisHtml,
            scope: scope,
            title: false,
            area: ['500px', "280px"],
            end: () => {
                scope.$destroy();
            }
        })
    }

    /**
     * @description多人脸选择
     * @param faceInfo
     * @param file
     */
    public multiUserSelect(faceInfo: any, file: any) {
        let self = this;
        let scope: { layer: any; index: string, $destroy: Function, data: any, file: any, commandType: string, detectType: string, layerIndex: any, fromSelectFaceCtrl: string } = self.$scope.$new();

        scope.index = null;
        scope.data = faceInfo;
        scope.file = file;
        scope.commandType = "SearchAccessLog";
        scope.detectType = "Face";
        scope.fromSelectFaceCtrl = self.selectFaceCtrl;

        scope.layerIndex = self.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['人脸选择', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['400px', '310px'],
            content: selectFacePopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });

    }

    /**
     * @description人脸标注
     * @param faceInfo
     * @param file
     */
    public faceDemarcate(faceInfo: any, file: any) {
        let self = this;
        let scope: { layer: any; index: string, $destroy: Function, data: any, file: any, commandType: string, detectType: string, layerIndex: any, fromDemarcateFaceCtrl: string, flag: boolean } = self.$scope.$new();

        scope.index = null;
        scope.data = faceInfo;
        scope.file = file;
        scope.commandType = "SearchAccessLog";
        scope.detectType = "Face";
        scope.fromDemarcateFaceCtrl = self.selectFaceCtrl;
        scope.flag = false;

        scope.layerIndex = self.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['人脸标注', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['650px', '555px'],
            content: demarcatePopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 查看全图
    public fullScreen(event: any, path: string) {
        if (event) {
            event.stopPropagation();
        }
        let scope: { layer: any; index: string, path: any, $destroy: Function } = this.$scope.$new();
        scope.index = "fullScreenPopup";
        scope.path = path;
        if (path) {
            let windowW: any = $(window).width() * 0.8;
            let windowH: any = $(window).height() * 0.8;
            let contentHTML = `<img ng-src=${path} style='width:${windowW}px;height:${windowH}px;'>`;
            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: [windowW + 'px', windowH + 'px'],
                content: contentHTML,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        } else {
            this.layer.msg("图片地址不存在")
        }
    }

    deleteImage() {
        this.queryParams.imagePath = "";
        this.queryParams.taskId = "";
    }

    uploadImage(event: any) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchFacePerceiveCollision",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                self.$timeout(() => {
                    self.queryParams.imagePath = res.data.imageurl;
                    self.queryParams.taskId = res.data.key;
                });
            } else if ((res.code === 200) && (res.data.faceInfo)) {// 人脸选择
                let image = new Image();
                image.src = 'data:image/jpeg;base64,'+res.data.image;
                image.onload = ()=>{
                    let file = {
                        "_info": {
                            "width": image.width,
                            "height": image.height
                        }
                    };
                    self.multiUserSelect(res.data, file);
                }
            } else if ((res.code === 200) && (res.data.image)) { // 人脸识别失败待标定
                let image = new Image();
                image.src = 'data:image/jpeg;base64,'+res.data.image;
                image.onload = ()=>{
                    let file = {
                        "_info": {
                            "width": image.width,
                            "height": image.height
                        }
                    };
                    self.faceDemarcate(res.data, file);
                }
            } else {
                self.layerDec.warnInfo('人脸识别失败');
            }
        });
    }
}

app.controller('FaceMacCrashController', FaceMacCrashController);
