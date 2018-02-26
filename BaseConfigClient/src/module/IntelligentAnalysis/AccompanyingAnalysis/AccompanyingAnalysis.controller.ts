/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
import {app} from "../../common/app/main.app";
// import 'css!../style/AccompanyingAnalysis.css';

import {SystemPoint} from "../../../core/entity/SystemPoint";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";

import {
    AccompanyingAnalysis,
    AccompanyingAnalysisResult,
    Result
} from '../../../core/entity/AccompanyingAnalysisEnum'
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {
    MarkersIcon,
    OverlayName,
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
    SexData,
    ArrayUnique,
    data,
    timeLength,
    getdataList,
    getHours,
    dataLists
} from '../AnalysisEnum';



// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';
import "../TrackPopup/track.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"

//  服务
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";

// 分页方法
import {PageParamsAndResult, Pagination, IPagination} from '../../common/Pagination'
import {InteligentTaskInfo} from '../../../core/entity/InteligentTaskInfo';

// 参数
import {AnalyseTaskType, OfflineTaskType} from "../../../core/server/enum/AnalyseTaskOffLine";
import {ObjectType} from '../../../core/enum/ObjectType';
import {CollectDataType} from '../../../core/server/enum/CollectDataType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

class CacheResult extends Result {
    resultIndex: number;
}

declare let cameraTreePopupHtml: any, angular: any, $: any, loadingAnalysisHtml: any, selectFacePopupHtml: any, demarcatePopupHtml: any, PopupHtml: any;

class AccompanyingAnalysisController {
    $inject: Array<string> = ['$scope', '$rootScope', '$timeout', 'analysisService', 'analysisMmapServer', 'layerDec', 'layer', 'userInfoCacheFactory', "resourceRetrievalService", 'handleStorage', 'uploadImageService', '$interval'];

    FastDateList: Array<data<timeLength>> = getdataList();
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
    windowWidth: number = getWidowSize().width;

    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    showResult: boolean = false;
    showForm: boolean = true;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    showAllAccompanyResult: boolean = false;
    checkRightResult: Array<boolean> = [false];
    isSortLetter: boolean = false;

    AccompanyingAnalysisParams: AccompanyingAnalysis = new AccompanyingAnalysis();

    resultParams: PageParamsAndResult = new PageParamsAndResult();
    ResultPagination: IPagination = new Pagination();
    allTrackResult: Array<Result>;
    trackResultForMap: { [key: string]: Result | CacheResult };

    accpResultParams: PageParamsAndResult = new PageParamsAndResult();
    AccpPagination: IPagination = new Pagination();
    allAccpTrackResult: Array<Result>;
    accpTrackResultForMap: { [key: string]: Result | CacheResult };

    AccompOffLine: Array<InteligentTaskInfo> = [];
    currentLayerIndex: number;
    accpResultIndex: number;

    arrCameraId: Array<string> = [];
    selectDeviceCb: string = "close.device.popup";
    selectFaceCtrl: string = "get-face-info-quick";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private analysisMmapServer: IAnalysisMmapServer,
                private layerDec: ILayerDec,
                private layer: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private resourceRetrievalService: IResourceRetrievalService,
                private handleStorage: IHandleStorage,
                private uploadImageService: IUploadImageService,
                private $interval:any) {
        let self = this;

        self.AccompanyingAnalysisParams = self.initParams();

        self.$timeout(() => {
            self.$scope.$emit('showItemPage', true);
        });

        self.$scope.$on('$destroy', () => {
            try {
                self.analysisMmapServer.clearDraw();
                self.destoryForMapMarker();
                self.analysisMmapServer.renderSystemPoint();
            } catch (e) {
                console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
            }
            $interval.cancel(self.setInterval);
        });

        // 监听人脸选择事件
        self.$scope.$on(self.selectFaceCtrl, function (event: any, data: any) {
            self.$timeout(() => {
                self.AccompanyingAnalysisParams.imagePath = data.data.imageurl;
                self.AccompanyingAnalysisParams.taskId = data.data.key;
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

    private destoryForMapMarker() {
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTrackInfoWindow();
        this.analysisMmapServer.clearAccpTrackInfoWindow();
    }

    private initParams(): AccompanyingAnalysis {
        let self = this;

        self.FastDate = dataLists.today;
        self.SexDate = SexData.all;
        self.GlassDate = GlassesData.all;
        self.MaskDate = MaskData.all;

        let params = new AccompanyingAnalysis();

        params.arrCameraId = [];
        params.imagePathList = [];
        params.arrEyeGlasses = [];
        params.arrMask = [];
        params.arrGender = [];
        params.startTime = this.FastDate.value.startTime;
        params.endTime = this.FastDate.value.endTime;
        params.taskName = "";
        params.taskId = "";
        params.agofollowTime = 5;
        params.afterfollowTime = 5;
        params.threshold = 90;
        params.followNum = 3;

        // 判断是否有通行记录快速检索
        let AnalysisData:AnalysisStorageParams = this.handleStorage.getSessionStorageData(AnalysisDataType.Face.key);
        if (AnalysisData) {
            params.featureType = "AccessFeature";
            params.imagePath = AnalysisData.data.AccessLog.FacePath;
            params.accessLogId = AnalysisData.data.AccessLog.ID;
            this.handleStorage.removeSessionStorageData(AnalysisDataType.Face.key);
        }
        // 判断是否有人脸分析快速检索
        AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType.FaceLibrary.key);
        if (AnalysisData) {
            params.featureType = "FaceFeature";
            params.imagePath = AnalysisData.data.PersonInfo.FacePicPath[0];
            params.ImgUrl = AnalysisData.data.PersonInfo.FacePicPath[0];
            params.LibId = AnalysisData.data.LibId;
            params.PersonId = AnalysisData.data.PersonInfo.ID;
            this.handleStorage.removeSessionStorageData(AnalysisDataType.FaceLibrary.key);
        }
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

    setFastDate(item: Enum<TimeLength>) {
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
        this.AccompanyingAnalysisParams.startTime = time.startTime;
        this.AccompanyingAnalysisParams.endTime = time.endTime;
    }

    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.AccompanyingAnalysisParams.maxAge = age.value.maxAge;
            this.AccompanyingAnalysisParams.minAge = age.value.minAge;
        } else {
            this.AccompanyingAnalysisParams.maxAge = null;
            this.AccompanyingAnalysisParams.minAge = null;
        }
    }

    slideRightResult(i: number) {
        this.setCheckRightResult(this.resultParams.pageSize, i);
    }

    // 创建离线任务
    submitSearch() {
        let self = this;
        if (self.AccompanyingAnalysisParams.taskName === "") {
            return self.layerDec.warnInfo('请输入任务名称');
        }
        if (!self.AccompanyingAnalysisParams.taskId && !self.AccompanyingAnalysisParams.accessLogId && !self.AccompanyingAnalysisParams.PersonId) {
            return self.layerDec.warnInfo('请上传图片');
        }
        // 判断时间
        if (self.AccompanyingAnalysisParams.endTime < self.AccompanyingAnalysisParams.startTime) {
            this.layerDec.warnInfo('开始时间不能晚于结束时间!');
            return false;
        }
        // 设置查询设备id
        if(self.arrCameraId.length>0) {
            self.AccompanyingAnalysisParams.arrCameraId = self.arrCameraId;
        } else {
            let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
            let cameraList:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    cameraList.push(value.ObjectID);
                }
            });
            self.AccompanyingAnalysisParams.arrCameraId = cameraList;
        }

        // 设置性别
        if (self.SexDate.key !== "all") {
            self.AccompanyingAnalysisParams.arrGender.push(self.SexDate.key);
        }
        // 设置眼镜
        if (self.GlassDate.value !== null) {
            self.AccompanyingAnalysisParams.arrEyeGlasses.push(self.GlassDate.value);
        }
        // 设置口罩
        if (self.MaskDate.value !== null) {
            self.AccompanyingAnalysisParams.arrMask.push(self.MaskDate.value);
        }
        self.analysisService.searchAccompanying( self.AccompanyingAnalysisParams).then((res: ResponseResult<AccompanyingAnalysisResult>) => {
            if (res.code === 200) {
                self.showAnalysisList = true;
                self.getAccompOffLineList();
                self.AccompanyingAnalysisParams = self.initParams();
                self.ClearDraw();
            } else {
                self.layerDec.warnInfo('分析任务创建失败');
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
        self.accpResultIndex = traget;
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
        _.forEach(self.accpResultParams.data[traget].SearchAccessResults,function (value) {
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
            _.forEach(self.accpResultParams.data[traget].SearchAccessResults,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderAccpMarkers()
            });
        });
    }

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
        this.AccompanyingAnalysisParams.arrCameraId = [];
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

    setAccpTrack(i: number) {
        if (!this.checkRightResult[i]) {
            this.slideRightResult(i);
        }
        let arr = this.analysisMmapServer.getSystemPointForParams(this.allAccpTrackResult);
        this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
    }

    clearResultMarkersInfo() {
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearTrackInfoWindow();
    }

    openDetailPopup(item: any, index: number, groupName: string) {
        let self = this;
        let objectType:string ="";
        let newItem: any = {};
        let newList:Array<any> = [];

        objectType = ObjectType.Camera.value;
        newItem = item;
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
        scope.showFooter = true;
        scope.index = "";
        scope.allList = newList;
        scope.collectFunction = (item: any) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: any, type: string) => {
            self.clickAnalysis(null, item, type);
        };
        scope.surveillanceFunction = (item: any) => {
            self.clickSurveillance(null, item);
            self.layer.close(scope.index);
        };
        scope.closePopup = () => {
            self.layer.close(scope.index);
        };
        self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
    }

    // 根据结果显示地图对应的点位
    resultToMap(item: Result, index: number, type?: string) {
        this.analysisMmapServer.resultToMap(item, type);
    }

    // 取消结果显示地图对应的点位
    unResultToMap(item: Result, index: number, type?: string) {
        this.analysisMmapServer.unResultToMap(item, type ? this.accpTrackResultForMap : this.trackResultForMap, type);
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
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    goAllResult() {
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
        this.accpResultParams.pageSize = 15;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
    }

    closeAllAccompanyResult() {
        this.showResult = true;
        this.showAllAccompanyResult = false;
        this.accpResultParams.pageSize = 6;
        this.accpResultParams.currentPage = 1;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
    }

    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.ResultPagination.getByPage(this.resultParams);
        if (this.isSortLetter) {
            this.$timeout(() => {
                this.analysisMmapServer.renderMakers(
                    OverlayName.MapForResultLayer,
                    OverlayName.MapForResultGroup,
                    true,
                    this.analysisMmapServer.getSystemPointForParams(this.resultParams.data),
                    this.trackResultForMap,
                    this.isSortLetter,
                    this.sortLetter)
            })
        }

    }

    changeAccpResultPage(i: number) {
        this.accpResultParams.currentPage = i;
        this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        this.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
    }

    private setResultForMap(result: Array<Result | CacheResult>) {
        let obj = {} as { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.trackResultForMap = obj;
    }

    private renderAccpMarkers() {
        let self = this;
        let accpArr = self.accpResultParams.data[self.accpResultIndex].SearchAccessResults;
        let obj = {} as { [key: string]: CacheResult };
        accpArr.forEach((item: CacheResult, index: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = index;
        });

        self.accpTrackResultForMap = obj;
        self.allAccpTrackResult = accpArr;
        let arr = self.analysisMmapServer.getSystemPointForParams(self.allAccpTrackResult);
        self.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForAccpGroup,
            true,
            arr,
            self.accpTrackResultForMap,
            false,
            null,
            MarkersIcon.NormalGreenIcon
        );
    }

    // 显示离线任务列表
    showAnalysisListFn(flag: boolean) {
        this.showAnalysisList = flag;
        if (flag) {
            this.getAccompOffLineList()
        }
    }

    /**
     * @description 获取离线任务详情
     * @param {AccompOffLine} item
     */
    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            "analyseTaskType": AnalyseTaskType.SearchAnalyseTaskResult,
            "taskId": item.TaskId,
            "TaskType": item.TaskType
        };
        self.analysisService.getOffLineDetail(params).then((res: any) => {
            if (res.code === 200 && res.data) {
                if (res.data && (res.data.SearchAccessResults.length > 0) && (res.data.FaceAccompanyEntities.length > 0)) {
                    self.analysisMmapServer.removeSystemPoint();
                    let params:any = {
                        deviceIds: [],
                        deviceType: '',
                        ids: [],
                        userId: self.userInfoCacheFactory.getCurrentUserId()
                    };
                    params.deviceType = ObjectType.Camera.value;
                    let resultList: any = _.sortBy(res.data.SearchAccessResults, function (item: any) {
                        return -item.Score;
                    });
                    let trackResultList: any = _.sortBy(res.data.FaceAccompanyEntities, function (item: any) {
                        return -item.Num;
                    });
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
                        self.$timeout(() => {
                            self.ResultPagination.set(resultList);
                            self.AccpPagination.set(trackResultList);
                        }).then(() => {
                            self.resultParams.pageSize = 6;
                            self.resultParams.currentPage = 1;
                            self.resultParams = self.ResultPagination.getByPage(self.resultParams);
                            self.allTrackResult = self.ResultPagination.get();
                            self.setResultForMap(self.allTrackResult);

                            self.accpResultParams.pageSize = 6;
                            self.accpResultParams.currentPage = 1;
                            self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                            self.allAccpTrackResult = self.AccpPagination.get();
                        }).then(() => {
                            self.showForm = false;
                            self.showResult = true;
                            self.isSortLetter = true;
                            let arr = self.analysisMmapServer.getSystemPointForParams(self.resultParams.data);
                            self.analysisMmapServer.renderMakers(
                                OverlayName.MapForResultLayer,
                                OverlayName.MapForResultGroup,
                                true,
                                arr,
                                self.trackResultForMap,
                                self.isSortLetter,
                                self.sortLetter);
                            self.setCheckRightResult(this.accpResultParams.pageSize, 0, true);
                        })
                    });
                } else {
                    self.layerDec.info('没有查询到伴随结果');
                }
            }else {
                self.layerDec.warnInfo('查询结果失败');
            }
        })
    }

    // 获取离线任务列表
    private getAccompOffLineList() {
        let self = this;
        let params = {
            "id": self.userInfoCacheFactory.getCurrentUserId(),
            "taskType": OfflineTaskType.SearchFaceAccompany
        };
        self.analysisService.getOffLineList(params).then((res: any) => {
            if (res.code === 200 && Array.isArray(res.data)) {
                let List: Array<InteligentTaskInfo> = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].Ext = JSON.parse(res.data[i].Ext);
                    List.push(res.data[i]);
                }
                self.AccompOffLine = List;
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
                self.layerDec.info('删除成功');
                self.getAccompOffLineList();
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    deleteImage() {
        if (this.AccompanyingAnalysisParams.taskId) {
            this.AccompanyingAnalysisParams.imagePath = "";
            this.AccompanyingAnalysisParams.taskId = "";
        }
        if (this.AccompanyingAnalysisParams.accessLogId) {
            this.AccompanyingAnalysisParams.featureType = "";
            this.AccompanyingAnalysisParams.accessLogId = "";

        }
        if (this.AccompanyingAnalysisParams.PersonId) {
            this.AccompanyingAnalysisParams.featureType = "";
            this.AccompanyingAnalysisParams.ImgUrl = "";
            this.AccompanyingAnalysisParams.LibId = "";
            this.AccompanyingAnalysisParams.PersonId = "";
        }
    }

    //上传图片
    uploadImage(event: any) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchFaceAccompany",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                self.$timeout(() => {
                    self.AccompanyingAnalysisParams.imagePath = res.data.imageurl;
                    self.AccompanyingAnalysisParams.taskId = res.data.key;
                })
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
            let params: any = {
                json: angular.toJson(item),
                objectID: item.AccessLog.ID,
                objectType: "Face"
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: any = {
                ids: item.AccessLog.ID
            };
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
        localStorage.setItem("AnalysisType", "Face");
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
}

app.controller('AccompanyingAnalysisController', AccompanyingAnalysisController);
