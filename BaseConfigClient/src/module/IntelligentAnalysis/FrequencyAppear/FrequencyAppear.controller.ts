/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/FrequencyAppear.css';

// 服务
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';

// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

// 参数
import {SystemPoint} from "../../../core/entity/SystemPoint";
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
import {FrequencyAppearParams, FrequencyAppearResult, SearchAccessResul} from "./FrequencyAppearEnum";
import {ObjectType} from '../../../core/enum/ObjectType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";


declare let angular: any, $: any, loadingAnalysisHtml: any, cameraTreePopupHtml: any, PopupHtml: any;

class CacheResult extends SearchAccessResul {
    resultIndex: number;
}

class FrequencyAppearController {
    $inject: Array<string> = ['$scope', '$timeout', 'analysisService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer', '$interval', "resourceRetrievalService", "handleStorage"];
    FrequencyAppearParams: FrequencyAppearParams = new FrequencyAppearParams();
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
    resultDetail: FrequencyAppearResult;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    pagination: IPagination = new Pagination();
    resultForMap: { [key: string]: SearchAccessResul | CacheResult };
    allResult: Array<any>;
    FrequencyOffLine: Array<InteligentTaskInfo> = [];
    windowWidth: number = getWidowSize().width - 60;
    windowHeight: number = getWidowSize().height - 53;
    currentLayerIndex: number;
    sortLetter: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F'];
    isSortLetter: boolean = true;
    isSlideResult: Array<boolean> = [];
    resultIndex: number;
    nowOffLineInfo: InteligentTaskInfo;
    arrCameraId: Array<string> = [];
    selectDeviceCb: string = "close.device.popup";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private layer: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private analysisMmapServer: IAnalysisMmapServer,
                private $interval:any,
                private resourceRetrievalService: IResourceRetrievalService,
                private handleStorage: IHandleStorage) {
        let self = this;

        self.FrequencyAppearParams = self.initParams();

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

        // 监听设备返回事件
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status: boolean, geometry?: NPMapLib.Geometry.Polygon, type?: string) => {
            if (status && Array.isArray(deviceIds)) {
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

    private initParams(): FrequencyAppearParams {
        let self = this;

        self.FastDate = FastData.today;
        self.SexDate = SexData.all;
        self.GlassDate = GlassesData.all;
        self.MaskDate = MaskData.all;

        let params = new FrequencyAppearParams();
        params.taskName = "";
        params.taskId = "";
        params.hauntNum = 3;
        params.imagePathList = [];
        params.startTime = self.FastDate.value.startTime;
        params.endTime = self.FastDate.value.endTime;
        params.arrCameraId = [];
        params.threshold = 90;
        params.arrGender = [];
        params.arrEyeGlasses = [];
        params.arrMask = [];
        return params;
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

    //TODO 设置日期
    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.FrequencyAppearParams.startTime = item.value.startTime;
        this.FrequencyAppearParams.endTime = item.value.endTime;
    }

    //TODO 删除图片
    deleteImage() {
        this.FrequencyAppearParams.imagePath = null;
        this.FrequencyAppearParams.taskId = null;
    }

    //TODO 删除年龄
    selectAge(age: Enum<Age>) {
        if (typeof age !== 'string') {
            this.FrequencyAppearParams.maxAge = age.value.maxAge;
            this.FrequencyAppearParams.minAge = age.value.minAge;
        } else {
            this.FrequencyAppearParams.maxAge = null;
            this.FrequencyAppearParams.minAge = null;
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
        _.forEach(self.resultParams.data[traget].SearchAccessResultList,function (value) {
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
            _.forEach(self.resultParams.data[traget].SearchAccessResultList,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderAccpMarkers()
            });
        });
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
            closeBtn:false,
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    private renderAccpMarkers() {
        let self = this;

        self.allResult = self.resultParams.data[self.resultIndex].SearchAccessResultList;
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


    // 绘制结果集点位
    private setResultForMap(result: any) {
        let obj = {} as  { [key: string]: CacheResult };
        result.forEach((item: CacheResult, i: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = i;
        });
        this.resultForMap = obj;
    }

    //TODO 打开结果详情
    /**
     * @param {Result | CacheResult} item 当前结果对象
     * @param {number} index 当前结果索引
     */
    openDetailPopup(item: any, index: number) {
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
        scope.analysisFunction = (item: any, type:string) => {
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

    //TODO 根据结果显示地图对应的点位
    resultToMap(item: SearchAccessResul, index: number) {
        this.analysisMmapServer.resultToMap(item)
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: SearchAccessResul, index: number) {
        this.analysisMmapServer.unResultToMap(item, this.resultForMap)
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
        this.FrequencyAppearParams.arrCameraId = [];
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


    //TODO 提交离线任务
    submitSearch() {
        let self = this;
        if (self.FrequencyAppearParams.taskName === "") {
            return self.layerDec.warnInfo('请输入任务名称');
        }
        // 判断时间
        if (self.FrequencyAppearParams.endTime < self.FrequencyAppearParams.startTime) {
            self.layerDec.warnInfo('开始时间不能晚于结束时间!');
            return false;
        }
        // 设置查询设备id
        if(self.arrCameraId.length>0) {
            self.FrequencyAppearParams.arrCameraId = self.arrCameraId;
        } else {
            let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
            let cameraList:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    cameraList.push(value.ObjectID);
                }
            });
            self.FrequencyAppearParams.arrCameraId = cameraList;
        }

        // 设置性别
        if (self.SexDate.key !== "all") {
            self.FrequencyAppearParams.arrGender.push(self.SexDate.key);
        }
        // 设置眼镜
        if (self.GlassDate.value !== null) {
            self.FrequencyAppearParams.arrEyeGlasses.push(self.GlassDate.value);
        }
        // 设置口罩
        if (self.MaskDate.value !== null) {
            self.FrequencyAppearParams.arrMask.push(self.MaskDate.value);
        }

        self.initLoadingPop();
        self.analysisService.faceFrequencyAppear(self.FrequencyAppearParams).then((res: ResponseResult<any>) => {
            if (res.code === 200) {
                self.showAnalysisList = true;
                self.getAccompOffLineList();
                self.FrequencyAppearParams = self.initParams();
                self.ClearDraw();
            } else {
                self.layerDec.warnInfo('分析任务创建失败');
            }
            self.layer.close(self.currentLayerIndex);
        })
    }

    //TODO 显示离线任务列表
    showAnalysisListFn(flag: boolean) {
        this.showAnalysisList = flag;
        if (flag) {
            this.getAccompOffLineList()
        }
    }

    //TODO 获取离线任务列表
    getAccompOffLineList() {
        let params = {
            id: this.userInfoCacheFactory.getCurrentUserId(),
            taskType: OfflineTaskType.SearchFaceFrequenceHaunt
        };
        this.analysisService.getOffLineList(params).then((res: BackResponseBody<Array<InteligentTaskInfo>>) => {
            if (res.code === 200) {
                this.FrequencyOffLine = res.data ? res.data : [];
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
                self.getAccompOffLineList();
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    //TODO 分页功能
    changeResultPage(i: number) {
        // this.resultParams.currentPage = i;
        // this.getOffLineDetail(this.nowOffLineInfo)
        this.resultParams.currentPage = i;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        // this.setCheckRightResult(this.resultParams.data.length, i, true);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
        this.$timeout(() => {
            this.analysisMmapServer.renderMakers(
                OverlayName.MapForResultLayer,
                OverlayName.MapForResultGroup,
                true,
                this.analysisMmapServer.getSystemPointForParams(this.resultParams.data),
                this.resultForMap)
        })
    }

    //TODO 关闭全部结果展示页面
    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    }

    //TODO 打开全部结果展示页面
    goAllResult() {
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    }

    /**
     * @description 获取离线任务详情
     * @param {InteligentTaskInfo} item
     */
    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            analyseTaskType: AnalyseTaskType.SearchAnalyseTaskResult,
            taskId: item.TaskId,
            TaskType: item.TaskType,
            pageSize: this.resultParams.pageSize,
            currentPage: this.resultParams.currentPage
        };
        self.initLoadingPop();
        self.analysisService.getOffLineDetail(params).then((res: BackResponseBody<any>) => {
            if (res.code === 200) {
                if (res.data) {
                    self.$timeout(() => {
                        self.pagination.set( res.data.Result);
                    }).then(() => {
                        self.resultParams.currentPage = 1;
                        self.resultParams.pageSize = 6;
                        self.analysisMmapServer.removeSystemPoint();
                        self.resultParams = self.pagination.getByPage(self.resultParams);
                    }).then(() => {
                        self.showResult = true;
                        self.showForm = false;
                        self.nowOffLineInfo = item;
                        self.setCheckRightResult(self.resultParams.pageSize, 0, true);
                    }).then(() => {
                        self.layer.close(self.currentLayerIndex);
                    });
                } else {
                    self.layer.close(self.currentLayerIndex);
                    self.layerDec.info('没有查询到结果');
                }
            } else {
                self.layer.close(self.currentLayerIndex);
                self.layerDec.warnInfo('查询结果失败');
            }
        });
    }

    // /**
    //  * @description 获取离线任务详情
    //  * @param {InteligentTaskInfo} item
    //  * @returns {Promise<ResponseResult<any>>}
    //  */
    // getOffLineDetail(item: InteligentTaskInfo) {
    //     let params = {
    //         analyseTaskType: AnalyseTaskType.SearchAnalyseTaskResult,
    //         taskId: item.TaskId,
    //         TaskType: item.TaskType,
    //         pageSize: this.resultParams.pageSize,
    //         currentPage: this.resultParams.currentPage
    //     };
    //     return this.analysisService.getOffLineDetail(params).then((res: BackResponseBody<FrequencyAppearResult>) => {
    //         if (res.code === 200) {
    //             if (res.data) {
    //                 this.resultParams.totalCount = res.data.TotalCount
    //                 if (this.resultParams.totalCount % this.resultParams.pageSize === 0) {
    //                     this.resultParams.pageCount = Math.round(this.resultParams.totalCount / this.resultParams.pageSize);
    //                 } else {
    //                     this.resultParams.pageCount = Math.ceil(this.resultParams.totalCount / this.resultParams.pageSize);
    //                 }
    //                 this.$timeout(() => {
    //                     this.resultDetail = res.data;
    //                 }).then(() => {
    //                     this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    //                 })
    //             } else {
    //                 this.layerDec.info('没有查询到结果');
    //             }
    //         } else {
    //             this.layerDec.warnInfo('查询结果失败');
    //         }
    //     });
    // }

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

app.controller('FrequencyAppearController', FrequencyAppearController);