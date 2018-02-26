/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
import {app} from "../../common/app/main.app";

// 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/socket.factory";
import {ISocketFactory} from "../../common/factory/socket.factory";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";

// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';
import "../TrackPopup/track.popup.controller"
import "../TrackPopupDetail/track.popup.detail.controller"

// 参数
import {
    OverlayName,
    Enum,
    TimeLength,
    Age,
    getAgeList,
    getGlassesDataList,
    getMaskDataList,
    GlassesData,
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
import {PageParamsAndResult, Pagination, IPagination} from "../../common/Pagination";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {FaceTrackParams, ResultTrack, Result} from '../../../core/entity/FaceTrackEnum';
import {BackResponseBody} from "../../../core/params/result/ResponseResult";
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";
import {ObjectType} from '../../../core/enum/ObjectType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

declare let cameraTreePopupHtml: any, angular: any, $: any, loadingAnalysisHtml: any, selectFacePopupHtml: any, demarcatePopupHtml: any, PopupHtml: any;

class CacheResult extends Result {
    resultIndex: number;
}

class FaceTrackController {
    $inject: Array<string> = ['$scope', 'analysisMmapServer', '$timeout', 'analysisService', 'layer', 'socketFactory', 'layerDec', "resourceRetrievalService", 'handleStorage', 'uploadImageService', 'userInfoCacheFactory'];

    FastDateList: Array<data<timeLength>> = getdataList();
    SexDateList: Array<Enum<number>> = getSexDataList();
    GlassDateList: Array<Enum<number>> = getGlassesDataList();
    MaskDateList: Array<Enum<number>> = getMaskDataList();
    AgeDataList: Array<Enum<Age>> = getAgeList();
    FastDate: data<timeLength> = dataLists.today;
    SexDate: Enum<number> = SexData.all;
    GlassDate: Enum<number> = GlassesData.all;
    MaskDate: Enum<number> = MaskData.all;
    minSacle: number = 80;
    Sacle: number = 100;
    windowWidth: number = getWidowSize().width - 60;

    showForm: boolean = true;// true:显示form表单内容
    showImageRes: boolean = false; // true:显示socket结果列表
    showTrackRes: boolean = false; // true:显示较少人脸轨迹
    showAllResult: boolean = false; // true:显示更多人脸轨迹
    resultSort: boolean = true; // true:按相似度排序 false:按时间排序
    isSortLetter: boolean = true; // true:点位按字母显示 false:点位按数字显示

    FaceTrackParams: FaceTrackParams;
    currentLayerIndex: number;
    trackImagePath: string; // 查看较少结果是显示图片
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    trackResult: PageParamsAndResult = new PageParamsAndResult();
    pagination: IPagination = new Pagination();
    allTrackResult: Array<Result>;
    trackResultForMap: { [key: string]: Result | CacheResult };

    arrCameraId: Array<string> = []; // 设备id列表
    socketNum: number = 0;
    socketQueryList: Array<any> = [];
    socketResultList: Array<any> = [];
    selectDeviceCb: string = "close.device.popup";
    selectFaceCtrl: string = "get-face-info-quick";
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private analysisMmapServer: IAnalysisMmapServer,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private layer: any,
                private socketFactory: ISocketFactory,
                private layerDec: ILayerDec,
                private resourceRetrievalService: IResourceRetrievalService,
                private handleStorage: IHandleStorage,
                private uploadImageService: IUploadImageService,
                private userInfoCacheFactory: IUserInfoCacheFactory) {
        let self = this;

        self.initParams();

        self.$timeout(() => {
            self.$scope.$emit('showItemPage', true);
        });

        // 监听页面销毁事件
        self.$scope.$on('$destroy', () => {
            try {
                self.analysisMmapServer.clearDraw();
                self.destoryForMapMarker();
                self.analysisMmapServer.renderSystemPoint();
            } catch (e) {
                console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
            }
            self.unbindSocket();
        });

        // 监听人脸选择事件
        self.$scope.$on(self.selectFaceCtrl, function (event: any, data: any) {
            let item: any = {
                id: data.data.key,
                path: data.data.imageurl
            };
            self.$timeout(() => {
                self.FaceTrackParams.imagePathList.push(item);
                self.FaceTrackParams.imagePath = item.path;
                self.FaceTrackParams.taskId = item.id;
            })
        });

        // 监听设备返回事件
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status: boolean, geometry?: NPMapLib.Geometry.Polygon, type?: string) => {
            if (status && Array.isArray(deviceIds)) {
                self.deviceIdFilter(deviceIds, type);
            } else if (geometry) {
                self.analysisMmapServer.removeDrawShape(geometry);
            }
            self.layer.close(self.currentLayerIndex);
        });
    }

    // 初始化参数
    private initParams() {
        let self = this;

        self.FastDate = dataLists.today;
        self.SexDate = SexData.all;
        self.GlassDate = GlassesData.all;
        self.MaskDate = MaskData.all;
        self.arrCameraId = [];

        let params = new FaceTrackParams();

        params.arrCameraId = [];
        params.imagePathList = [];
        params.arrEyeGlasses = [];
        params.arrMask = [];
        params.arrGender = [];
        params.startTime = this.FastDate.value.startTime;
        params.endTime = this.FastDate.value.endTime;
        if (typeof self.FaceTrackParams === 'undefined') {
            params.threshold = 90;
        } else {
            params.threshold = self.FaceTrackParams.threshold;
        }
        // 判断是否有通行记录快速检索
        let AnalysisData: AnalysisStorageParams = this.handleStorage.getSessionStorageData(AnalysisDataType.Face.key);
        let item: any;
        if (AnalysisData) {
            item = {
                id: AnalysisData.data.AccessLog.ID,
                path: AnalysisData.data.AccessLog.FacePath,
                featureType: "AccessFeature",
                imagePath: AnalysisData.data.AccessLog.FacePath,
                accessLogId: AnalysisData.data.AccessLog.ID
            };
            params.imagePathList.push(item);
            this.handleStorage.removeSessionStorageData(AnalysisDataType.Face.key);

        }
        // 判断是否有人脸分析快速检索
         AnalysisData = this.handleStorage.getSessionStorageData(AnalysisDataType.FaceLibrary.key);
        if (AnalysisData) {
            item = {
                id: AnalysisData.data.PersonInfo.ID,
                path: AnalysisData.data.PersonInfo.FacePicPath[0],
                featureType: "FaceFeature",
                imagePath: AnalysisData.data.PersonInfo.FacePicPath,
                ImgUrl: AnalysisData.data.PersonInfo.FacePicPath[0],
                LibId: AnalysisData.data.LibId,
                PersonId: AnalysisData.data.PersonInfo.ID
            };
            params.imagePathList.push(item);
            this.handleStorage.removeSessionStorageData(AnalysisDataType.FaceLibrary.key);
        }

        self.FaceTrackParams = params;
    }

    // 快速选择时间
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
        this.FaceTrackParams.startTime = time.startTime;
        this.FaceTrackParams.endTime = time.endTime;
    }

    // 快速选择年龄
    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.FaceTrackParams.maxAge = age.value.maxAge;
            this.FaceTrackParams.minAge = age.value.minAge;
        } else {
            this.FaceTrackParams.maxAge = null;
            this.FaceTrackParams.minAge = null;
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
        this.analysisMmapServer.clearDraw();
    }

    private DrawCallBackMethod(points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let arr: Array<SystemPoint> = [];
        points.forEach((item: SystemPoint) => {
            if (item.ObjectType === ObjectType.Camera.value) {
                arr.push(item);
            }
        });
        if (arr.length === 0) {
            this.analysisMmapServer.removeDrawShape(geometry);
            return this.layerDec.info('框选区域不存在摄像机设备！');
        } else {
            this.checkArea(arr, geometry);
        }
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

    // 设备id去重
    private deviceIdFilter(ids: Array<string>, type?: string) {
        let self = this;
        let arrCameraId: Array<string> = [];
        if (type === "tree") {
            arrCameraId = ids;
        } else {
            arrCameraId = _.concat(ids, self.arrCameraId);
        }
        arrCameraId = _.sortedUniq(arrCameraId);
        self.arrCameraId = arrCameraId;
    }

    // 查询人脸轨迹
    submitSearch() {
        let self = this;
        if (self.FaceTrackParams.imagePathList.length === 0) {
            self.layerDec.warnInfo('请上传图片!');
            return false;
        }
        // 判断时间
        if (self.FaceTrackParams.endTime < self.FaceTrackParams.startTime) {
            self.layerDec.warnInfo('开始时间不能晚于结束时间!');
            return false;
        }
        // 设置查询设备id
        if(self.arrCameraId.length>0) {
            self.FaceTrackParams.arrCameraId = self.arrCameraId;
        } else {
            let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
            let cameraList:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    cameraList.push(value.ObjectID);
                }
            });
            self.FaceTrackParams.arrCameraId = cameraList;
        }

        // 设置性别
        if (self.SexDate.key !== "all") {
            self.FaceTrackParams.arrGender.push(self.SexDate.key);
        }
        // 设置眼镜
        if (self.GlassDate.value !== null) {
            self.FaceTrackParams.arrEyeGlasses.push(self.GlassDate.value);
        }
        // 设置口罩
        if (self.MaskDate.value !== null) {
            self.FaceTrackParams.arrMask.push(self.MaskDate.value);
        }

        // 绑定推送
        self.unbindSocket();
        self.socketResultList = [];
        self.socketQueryList = self.FaceTrackParams.imagePathList;
        self.socketNum = self.FaceTrackParams.imagePathList.length;
        self.bindSocketToResult();
        let par;
        // 循环查询轨迹
        for (let i = 0; i < self.FaceTrackParams.imagePathList.length; i++) {
            par = angular.copy(self.FaceTrackParams);
            if (typeof self.FaceTrackParams.imagePathList[i].featureType === "undefined") {
                par.imagePath = self.FaceTrackParams.imagePathList[i].path;
                par.taskId = self.FaceTrackParams.imagePathList[i].id;
            }else if (self.FaceTrackParams.imagePathList[i].featureType === "AccessFeature"){
                par.featureType = self.FaceTrackParams.imagePathList[i].featureType;
                par.accessLogId = self.FaceTrackParams.imagePathList[i].accessLogId;
                par.imagePath = null;
                par.taskId = self.FaceTrackParams.imagePathList[i].taskId;
            }else if (self.FaceTrackParams.imagePathList[i].featureType === "FaceFeature") {
                par.featureType = self.FaceTrackParams.imagePathList[i].featureType;
                par.ImgUrl = self.FaceTrackParams.imagePathList[i].ImgUrl;
                par.LibId = self.FaceTrackParams.imagePathList[i].LibId;
                par.PersonId = self.FaceTrackParams.imagePathList[i].PersonId;
                par.imagePath = null;
                par.taskId = self.FaceTrackParams.imagePathList[i].taskId;
            }
            self.analysisService.searchFaceTrack(par).then((res: BackResponseBody<ResultTrack>) => {
                if (res.code !== 200) {
                    self.layerDec.warnInfo('服务请求失败!');
                }
            })
        }
        // 重置查询参数
        self.initParams();
    }

    // 取消sokect订阅
    unbindSocket() {
        this.socketFactory.unSubscribe(SocketResultTypeEnum.Track);
    }

    // 绑定socket订阅
    bindSocketToResult() {
        let self = this;
        self.initLoadingPop();
        self.socketFactory.subscribe(SocketResultTypeEnum.Track, (res: Array<any>) => {
            self.layer.close(self.currentLayerIndex);
            if (Array.isArray(res)) {
                for (let i = 0; i < self.socketQueryList.length; i++) {
                    for (let x = 0; x < res.length; x++) {
                        if ((res[x].code === 200 ) && ((self.socketQueryList[i].id === res[x].data.TaskId)||(self.socketQueryList[i].featureType !== ""))) {
                            res[x].data.path = self.socketQueryList[i].path;
                            self.socketResultList.push(res[x].data);
                            self.socketNum = self.socketNum - 1;
                        }
                    }
                }
                if (self.socketNum < 1) {
                    self.unbindSocket();
                }
            }
        });
        self.goImageResult();
    }

    // 进入socket图片结果页
    goImageResult() {
        this.$timeout(() => {
            this.showAllResult = false;
            this.showForm = false;
            this.showImageRes = true;
            this.showTrackRes = false;
            this.isSortLetter = true;
        });
        // 清除页面框选
        this.ClearDraw();
    }

    //关闭全部结果（大）
    closeAllResult() {
        this.showTrackRes = true;
        this.showAllResult = false;
        this.trackResult.currentPage = 1;
        this.trackResult.pageSize = 6;
        this.trackResult = this.pagination.getByPage(this.trackResult);
    }

    // 显示所有结果（大）
    goAllResult() {
        this.showTrackRes = false;
        this.showAllResult = true;
        this.trackResult.pageSize = 40;
        this.trackResult.currentPage = 1;
        this.trackResult = this.pagination.getByPage(this.trackResult);
    }

    // 返回父级页面
    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    // 返回到表单
    goBackForm() {
        this.$timeout(() => {
            this.showImageRes = false;
            this.showImageRes = false;
            this.showForm = true;
            this.destoryForMapMarker();
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    // 返回socket结果页
    backImageResult() {
        this.$timeout(() => {
            this.showAllResult = false;
            this.showForm = false;
            this.showImageRes = true;
            this.showTrackRes = false;
            this.isSortLetter = true;
            this.destoryForMapMarker();
            this.analysisMmapServer.removeSystemPoint();
        })
    }

    // 根据ID删除结果
    delResult(ID: string) {
        if (this.pagination.delByPageId(ID)) {
            this.trackResult = this.pagination.getByPage(this.trackResult);
            this.analysisMmapServer.renderMakers(
                OverlayName.MapForResultLayer, OverlayName.MapForResultGroup,
                true,
                this.analysisMmapServer.getSystemPointForParams(this.trackResult.data),
                this.trackResultForMap
            );
            this.$timeout(() => {
                this.allTrackResult = this.trackResult.allData;
                this.setResultForMap(this.allTrackResult);
            });
        }
    }

    // 查看结果
    showTrackDetail(i: number, data: any) {
        let self = this;
        self.isSortLetter = true;
        if (data && data.Result && (data.Result.length > 0)) {
            self.destoryForMapMarker();
            self.analysisMmapServer.removeSystemPoint();

            let params:any = {
                deviceIds: [],
                deviceType: '',
                ids: [],
                userId: self.userInfoCacheFactory.getCurrentUserId()
            };
            params.deviceType = ObjectType.Camera.value;
            _.forEach(data.Result,function (value) {
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
                _.forEach(data.Result,function (item, index) {
                    item.deviceInfo = res.data.deviceInfo[index];
                    item.collectStatus = res.data.collectStatus[index];
                });
                self.$timeout(() => {
                    self.trackImagePath = data.path;
                    self.pagination.set(data.Result);
                }).then(() => {
                    self.trackResult.currentPage = 1;
                    self.trackResult.pageSize = 6;
                    self.trackResult = self.pagination.getByPage(self.trackResult);
                    self.allTrackResult = self.trackResult.allData;
                    self.setResultForMap(self.allTrackResult);
                }).then(() => {
                    self.showForm = false;
                    self.showImageRes = false;
                    self.showTrackRes = true;
                    self.showAllResult = false;
                    self.resultSort = true;
                    let arr = self.analysisMmapServer.getSystemPointForParams(this.trackResult.data);
                    self.analysisMmapServer.renderMakers(
                        OverlayName.MapForResultLayer,
                        OverlayName.MapForResultGroup,
                        true,
                        arr,
                        this.trackResultForMap,
                        this.isSortLetter,
                        this.sortLetter
                    );
                });
            });
        } else {
            this.layerDec.info('没有查询到结果');
        }
    }

    // 查看轨迹
    setFaceTrackDetail(data: any) {
        if (data && data.Result && (data.Result.length > 0)) {
            let self = this;
            self.analysisMmapServer.removeSystemPoint();
            self.allTrackResult = data.Result;
            self.setFaceTrack();
        } else {
            this.layerDec.info('没有查询到轨迹结果');
        }
    }

    // 创建轨迹
    setFaceTrack() {
        let self = this;
        self.$timeout(() => {
            self.isSortLetter = false;
            let allResultList = _.sortBy(self.allTrackResult, function (item: any) {
                return (Date.parse(item.AccessLog.LogTime));
            });
            self.pagination.set(allResultList);
            self.trackResult.currentPage = 1;
            self.trackResult.pageSize = 6;
            self.trackResult = self.pagination.getByPage(self.trackResult);
            self.allTrackResult = self.trackResult.allData;
            self.setResultForMap(self.allTrackResult);
        }).then(() => {
            let points = self.analysisMmapServer.getSystemPointForParams(self.allTrackResult) ;
            self.analysisMmapServer.setTrackAnimation(self.allTrackResult, points, self.trackResultForMap);
        });
    }

    // 设置地图点位记录
    private setResultForMap(result: Array<Result | CacheResult>) {
        let obj = {} as  { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.trackResultForMap = obj;
    }

    // 根据结果显示地图对应的点位
    resultToMap(item: Result, index: number) {
        this.analysisMmapServer.resultToMap(item)
    }

    // 取消结果显示地图对应的点位
    unResultToMap(item: Result, index: number) {
        this.analysisMmapServer.unResultToMap(item, this.trackResultForMap);
    }

    // 切换页数
    changeResultPage(i: number) {
        this.trackResult.currentPage = i;
        this.trackResult = this.pagination.getByPage(this.trackResult);
        if (this.isSortLetter) {
            this.$timeout(() => {
                this.analysisMmapServer.renderMakers(
                    OverlayName.MapForResultLayer,
                    OverlayName.MapForResultGroup,
                    true,
                    this.analysisMmapServer.getSystemPointForParams(this.trackResult.data),
                    this.trackResultForMap,
                    this.isSortLetter, this.sortLetter)
            })
        }
    }

    /**
     * @description 排序方式
     * @param {string} type //排序方式
     */
    sortReult(type: string) {
        let self = this;
        let allResultList: any = self.pagination.get();
        self.isSortLetter = true;
        self.destoryForMapMarker();
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
        self.pagination.set(allResultList);
        if (self.showTrackRes) {
            self.trackResult.pageSize = 6;
            self.trackResult.currentPage = 1;
        } else {
            self.trackResult.pageSize = 40;
            self.trackResult.currentPage = 1;
        }
        self.trackResult = self.pagination.getByPage(self.trackResult);
        self.allTrackResult = self.trackResult.allData;
        self.setResultForMap(self.allTrackResult);
        let arr = self.analysisMmapServer.getSystemPointForParams(this.trackResult.data);
        self.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForResultGroup,
            true,
            arr,
            this.trackResultForMap,
            this.isSortLetter,
            this.sortLetter
        );
    }

    // 上传图片
    uploadImage(event: any) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchAccessLog",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                let item: any = {
                    id: res.data.key,
                    path: res.data.imageurl
                };
                self.$timeout(() => {
                    self.FaceTrackParams.imagePathList.push(item);
                    self.FaceTrackParams.imagePath = item.path;
                    self.FaceTrackParams.taskId = item.id;
                })
            } else if ((res.code === 200) && (res.data.faceInfo)) {// 人脸选择
                let image = new Image();
                image.src = 'data:image/jpeg;base64,' + res.data.image;
                image.onload = () => {
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
                image.src = 'data:image/jpeg;base64,' + res.data.image;
                image.onload = () => {
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

    // 删除图片
    deleteImage(i: number) {
        this.FaceTrackParams.imagePathList.splice(i, 1)
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

    // 查看详情
    openDetailPopup(item: Result, index: number) {
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
            index: any
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
            self.layer.close(scope.index);
        };
        scope.surveillanceFunction = (item: any) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(scope.index);
        };
        self.analysisMmapServer.openDetailPopup(newItem, index, newList, objectType, scope);
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

    // 销毁地图图层
    private destoryForMapMarker() {
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTrackInfoWindow();
        this.analysisMmapServer.clearAccpTrackInfoWindow();
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
}

app.controller('FaceTrackController', FaceTrackController);