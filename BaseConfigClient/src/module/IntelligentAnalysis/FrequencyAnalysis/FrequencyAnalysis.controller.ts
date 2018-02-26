/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/selectFace.popup.html" name="selectFacePopupHtml" />
/// <amd-dependency path="text!../../common/faceHandlePopup/demarcate.popup.html" name="demarcatePopupHtml" />
import {app} from "../../common/app/main.app";

// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

// 服务
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
import "../../common/services/uploadImage.service";
import {IUploadImageService} from "../../common/services/uploadImage.service";


// 参数
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {FrequencyAnalysisParams, FrequencyAnalysisReult} from '../../../core/server/FrequencyAnalysisParams';
import {InteligentTaskInfo} from '../../../core/entity/InteligentTaskInfo';
import {BackResponseBody, ResponseResult} from "../../../core/params/result/ResponseResult";
import {
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
    SexData, ArrayUnique, OverlayName
} from '../AnalysisEnum';
import {AnalyseTaskType, OfflineTaskType} from "../../../core/server/enum/AnalyseTaskOffLine";
import {Pagination, IPagination, PageParamsAndResult} from "../../common/Pagination";
import {Result} from "../../../core/entity/FaceTrackEnum";
import {ObjectType} from '../../../core/enum/ObjectType';
import {CollectDataType} from "../../../core/server/enum/CollectDataType"
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

declare let angular: any, $: any, cameraTreePopupHtml: any, loadingAnalysisHtml: any, selectFacePopupHtml: any, demarcatePopupHtml: any, PopupHtml: any;

class CacheResult extends Result {
    resultIndex: number;
}

class FrequencyAnalysisController {
    $inject: Array<string> = ['$scope', '$timeout', 'analysisService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer', "resourceRetrievalService", 'handleStorage', 'uploadImageService', '$interval'];
    FrequencyAnalysisParams: FrequencyAnalysisParams = new FrequencyAnalysisParams();
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
    similarityMin: number = 80;
    showResult: boolean = false;
    showForm: boolean = true;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    resultDetail: FrequencyAnalysisReult;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    pagination: IPagination = new Pagination();
    resultForMap: { [key: string]: Result | CacheResult };
    allResult: Array<Result | CacheResult>;
    FrequencyOffLine: Array<InteligentTaskInfo>;
    windowWidth: number = getWidowSize().width - 60;
    windowHeight: number = getWidowSize().height - 53;
    currentLayerIndex: number;
    isSlideResult: Array<boolean> = [];
    resultIndex: number;
    arrCameraId: Array<string> = [];
    selectDeviceCb: string = "close.device.popup";
    selectFaceCtrl: string = "get-face-info-quick";
    FrequencyAnalysisImage: string = "";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private layer: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private analysisMmapServer: IAnalysisMmapServer,
                private resourceRetrievalService: IResourceRetrievalService,
                private handleStorage: IHandleStorage,
                private uploadImageService: IUploadImageService,
                private $interval:any) {
        let self = this;

        self.FrequencyAnalysisParams = self.initParams();

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
                self.FrequencyAnalysisParams.imagePath = data.data.imageurl;
                self.FrequencyAnalysisParams.taskId = data.data.key;
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
            self.findOffLineList();
        }, 10000);

    }

    private initParams(): FrequencyAnalysisParams {
        let self = this;

        self.FastDate = FastData.today;
        self.SexDate = SexData.all;
        self.GlassDate = GlassesData.all;
        self.MaskDate = MaskData.all;

        let params = new FrequencyAnalysisParams();
        params.taskName = "";
        params.taskId = "";
        params.startTime = self.FastDate.value.startTime;
        params.endTime = self.FastDate.value.endTime;
        params.arrCameraId = [];
        params.threshold = 90;
        params.arrGender = [];
        params.arrEyeGlasses = [];
        params.arrMask = [];

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

    //TODO 设置日期
    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.FrequencyAnalysisParams.startTime = item.value.startTime;
        this.FrequencyAnalysisParams.endTime = item.value.endTime;
    }

    //TODO 删除图片
    deleteImage() {
        this.FrequencyAnalysisParams.imagePath = null;
        this.FrequencyAnalysisParams.taskId = null;
    }

    //TODO 删除年龄
    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.FrequencyAnalysisParams.maxAge = age.value.maxAge;
            this.FrequencyAnalysisParams.minAge = age.value.minAge;
        } else {
            this.FrequencyAnalysisParams.maxAge = null;
            this.FrequencyAnalysisParams.minAge = null;
        }
    }

    //TODO 返回主目录
    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    //TODO 返回表单
    goBackForm() {
        this.analysisMmapServer.clearResultMarkers();
        this.$timeout(() => {
            this.showForm = true;
            this.showResult = false;
            this.showAllResult = false;
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    slideRightResult(i: number) {
        this.setCheckRightResult(this.resultParams.pageSize, i);
    }

    setCheckRightResult(size: number, traget: number, isFirst?: boolean) {
        let self = this;
        let arr = [] as Array<boolean>;
        for (let i = 0; i < size; i++) {
            if (i === traget) {
                arr.push(!self.isSlideResult[traget])
            } else {
                arr.push(false)
            }
        }
        self.resultIndex = traget;
        if (isFirst) {
            arr[traget] = true
        }
        self.isSlideResult = arr;

        // 处理设备与收藏状态数据
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Camera.value;
        _.forEach(self.resultParams.data[traget].FaceFrequencyInfos,function (value) {
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
            _.forEach(self.resultParams.data[traget].FaceFrequencyInfos,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderAccpMarkers()
            });
        });
    }

    private renderAccpMarkers() {
        let self = this;

        self.allResult = self.resultParams.data[self.resultIndex].FaceFrequencyInfos;
        self.$timeout(() => {
            self.setResultForMap(self.allResult);
        }).then(() => {
            let arr = self.analysisMmapServer.getSystemPointForParams(self.allResult);
            self.analysisMmapServer.renderMakers(
                OverlayName.MapForResultLayer,
                OverlayName.MapForResultGroup,
                true,
                arr,
                self.resultForMap);
        });
    }

    //TODO 打开结果详情
    /**
     * @param {Result | CacheResult} item 当前结果对象
     * @param {number} index 当前结果索引
     */
    openDetailPopup(item: any, index: number, groupList:any) {
        let self = this;
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
        scope.allList =  groupList;
        scope.collectFunction = (item: any) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: any, type:string) => {
            self.clickAnalysis(null, item, type);
        };
        scope.surveillanceFunction = (item: any) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(scope.index);
        };
        self.analysisMmapServer.openDetailPopup(item, index, self.allResult, ObjectType.Camera.value, scope);
    }

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: Result, index: number) {
        this.analysisMmapServer.resultToMap(item)
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: Result, index: number) {
        this.analysisMmapServer.unResultToMap(item, this.resultForMap)
    }

    //TODO 选择摄像机
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

    //TODO 清楚地图弹框
    ClearDraw() {
        this.arrCameraId = [];
        this.FrequencyAnalysisParams.arrCameraId = [];
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

    //TODO 删除地图离线任务
    delOffLineTask(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            "taskId": item.TaskId,
            "taskType": item.TaskType
        };
        self.analysisService.deleteOffLineDetail(params).then((res: any) => {
            if (res.code === 200) {
                self.layerDec.info('删除成功');
                self.findOffLineList()
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    //TODO 提交离线任务
    submitSearch() {
        let self = this;
        if (!self.FrequencyAnalysisParams.taskName) {
            return self.layerDec.warnInfo('请输入任务名称');
        }
        if (!self.FrequencyAnalysisParams.taskId && !self.FrequencyAnalysisParams.accessLogId && !self.FrequencyAnalysisParams.PersonId) {
            return self.layerDec.warnInfo('请上传图片');
        }
        // 判断时间
        if (self.FrequencyAnalysisParams.endTime < self.FrequencyAnalysisParams.startTime) {
            self.layerDec.warnInfo('开始时间不能晚于结束时间!');
            return false;
        }
        // 设置查询设备id
        if(self.arrCameraId.length>0) {
            self.FrequencyAnalysisParams.arrCameraId = self.arrCameraId;
        } else {
            let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
            let cameraList:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    cameraList.push(value.ObjectID);
                }
            });
            self.FrequencyAnalysisParams.arrCameraId = cameraList;
        }

        // 设置性别
        if (self.SexDate.key !== "all") {
            self.FrequencyAnalysisParams.arrGender.push(self.SexDate.key);
        }
        // 设置眼镜
        if (self.GlassDate.value !== null) {
            self.FrequencyAnalysisParams.arrEyeGlasses.push(self.GlassDate.value);
        }
        // 设置口罩
        if (self.MaskDate.value !== null) {
            self.FrequencyAnalysisParams.arrMask.push(self.MaskDate.value);
        }

        self.initLoadingPop();
        self.analysisService.faceFrequencyAnalysis(self.FrequencyAnalysisParams).then((res: ResponseResult<any>) => {
            self.layer.close(self.currentLayerIndex);
            if (res.code === 200) {
                self.showAnalysisList = true;
                self.findOffLineList();
                self.FrequencyAnalysisParams = self.initParams();
                self.ClearDraw();
            } else {
                self.layerDec.warnInfo('离线任务创建失败');
            }
        })
    }

    //TODO 显示离线任务列表
    showAnalysisListFn(flag: boolean) {
        this.showAnalysisList = flag;
        if (flag) {
            this.findOffLineList()
        }
    }

    //TODO 获取离线任务列表
    findOffLineList() {
        let params = {
            id: this.userInfoCacheFactory.getCurrentUserId(),
            taskType: OfflineTaskType.SearchFaceFrequency
        };
        this.analysisService.getOffLineList(params).then((res: BackResponseBody<Array<InteligentTaskInfo>>) => {
            if (res.code === 200) {
                this.FrequencyOffLine = res.data ? res.data : [];
            }
        })
    }

    //TODO 分页功能
    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.data.length, i, true);
        this.$timeout(() => {
            this.analysisMmapServer.renderMakers(
                OverlayName.MapForResultLayer,
                OverlayName.MapForResultGroup,
                true,
                this.analysisMmapServer.getSystemPointForParams(this.resultParams.data),
                this.resultForMap)
        })
    }

    // 绘制结果集点位
    private setResultForMap(result: Array<Result | CacheResult>) {
        let obj = {} as  { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.resultForMap = obj;
    }

    //TODO 关闭全部结果展示页面
    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.pagination.getByPage(this.resultParams);
    }

    //TODO 打开全部结果展示页面
    goAllResult() {
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.pagination.getByPage(this.resultParams);
    }

    //TODO 显示当前页下结果页 获取数据然后缓存，利用缓存方法分页查询数据，然后渲染结果点位
    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            analyseTaskType: AnalyseTaskType.SearchAnalyseTaskResult,
            taskId: item.TaskId,
            TaskType: item.TaskType
        };
        self.initLoadingPop();
        self.analysisService.getOffLineDetail(params).then((res: BackResponseBody<any>) => {
            if (res.code === 200) {
                if (res.data && res.data.Result && res.data.Result.length && res.data.Result[0].FaceFrequencys.length) {
                    self.$timeout(() => {
                        self.pagination.set(res.data.Result[0].FaceFrequencys);
                    }).then(() => {
                        self.resultParams.currentPage = 1;
                        self.resultParams.pageSize = 6;
                        self.analysisMmapServer.removeSystemPoint();
                        self.FrequencyAnalysisImage = res.data.Result[0].imgUrl;
                        self.resultParams = self.pagination.getByPage(self.resultParams);
                    }).then(() => {
                        self.showResult = true;
                        self.showForm = false;
                        self.setCheckRightResult(self.resultParams.pageSize, 0, true);
                        self.layer.close(self.currentLayerIndex);
                    });
                } else {
                    self.layerDec.info('没有查询到结果');
                }
            } else {
                self.layerDec.warnInfo('查询结果失败');
            }
            self.layer.close(self.currentLayerIndex);
        });
    }

    //TODO 上传图片
    uploadImage(event: any) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        let data = {
            storeType: "LOC",
            imageCategory: "CaptureImage",
            commandType: "SearchFaceFrequency",
            detectType: "Face"
        };
        this.uploadImageService.uploadImageForFace(from, data).then((res: any) => {
            if ((res.code === 200) && (res.data && res.data.key)) { // 人脸识别成功
                self.$timeout(() => {
                    self.FrequencyAnalysisParams.imagePath = res.data.imageurl;
                    self.FrequencyAnalysisParams.taskId = res.data.key;
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
                objectType: CollectDataType.Face.value
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

    private destoryForMapMarker() {
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTrackInfoWindow();
        this.analysisMmapServer.clearAccpTrackInfoWindow();
    }
}

app.controller('FrequencyAnalysisController', FrequencyAnalysisController);