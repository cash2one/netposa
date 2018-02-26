/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
import {app} from "../../common/app/main.app";

// 服务
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';

// 弹框
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

// 参数
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {FastData, getFastDataList, Enum, TimeLength, getWidowSize, OverlayName, MarkersIcon,  data, timeLength, getdataList, getHours, dataLists} from '../AnalysisEnum';
import {
    FaceCollisionAnalysisParams,
    QueryAnalysisItem,
    QueryAnalysisParams,
    FaceCollisionOffLine
} from './FaceCollisionAnalysis';
import {Pagination, IPagination, PageParamsAndResult} from "../../common/Pagination";
import {InteligentTaskInfo} from "../../../core/entity/InteligentTaskInfo";
import {AnalyseTaskType, OfflineTaskType} from "../../../core/server/enum/AnalyseTaskOffLine";
import {ObjectType} from '../../../core/enum/ObjectType';
import {CollectDataType} from "../../../core/server/enum/CollectDataType";
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

declare let PopupHtml: any, $: any, loadingAnalysisHtml: any, angular: any;

class FaceCollisionAnalysisController {
    static $inject: Array<string> = ['$scope', '$timeout', 'analysisService', 'layer', 'analysisMmapServer', 'layerDec', 'userInfoCacheFactory', "resourceRetrievalService", '$interval', 'handleStorage'];

    systemPointList: Array<SystemPoint>;
    FaceCollisionAnalysisParams: Array<QueryAnalysisItem> = [];
    FastDateList: Array<data<timeLength>> = getdataList();
    FastDate: Array<data<timeLength>>  = [];
    showForm: boolean = true;
    showResult: boolean = false;
    showAnalysisList: boolean = false;
    FaceCollisionOffLine: Array<InteligentTaskInfo>;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    selectDrawArr: Array<NPMapLib.Overlay> = [];
    windowHeight: number = getWidowSize().height;
    currentLayerIndex: number;
    Similarity: number = 90;
    allResult: Array<any>;
    showAllResult: boolean = false;
    checkResult: Array<boolean> = [];
    resultIndex: number;
    resultForMap: { [key: string]: any } = {};
    pagination: IPagination = new Pagination();
    QueryAnalysisParams: QueryAnalysisParams = new QueryAnalysisParams();
    minValue: number = 80;
    maxValue: number = 100;
    windowWidth: number = getWidowSize().width - 60;
    selectDeviceCb: string = "close.device.popup";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private layer: any,
                private analysisMmapServer: IAnalysisMmapServer,
                private layerDec: ILayerDec,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private resourceRetrievalService: IResourceRetrievalService,
                private $interval:any,
                private handleStorage: IHandleStorage) {
        let self = this;

        self.QueryAnalysisParams = self.initParams();

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

        self.getAccompOffLineList();

        // 监听设备返回事件
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status:boolean, geometry?: NPMapLib.Geometry.Polygon, type?: string) => {
            if (status) {
                // 判断设备数量
                if (deviceIds.length === 0) {
                    self.layerDec.warnInfo('框选区域不存在摄像机设备！');
                    self.analysisMmapServer.removeDrawShape(geometry);
                }else {
                    self.addArea();
                    self.selectDrawArr.push(geometry);
                    self.$timeout(() => {
                        self.FaceCollisionAnalysisParams[self.FaceCollisionAnalysisParams.length - 1].arrCameraId = deviceIds;
                        self.setFastDate(FastData.today, self.FaceCollisionAnalysisParams.length - 1);
                    });
                }
            } else {
                self.analysisMmapServer.removeDrawShape(geometry);
            }
            self.layer.close(self.currentLayerIndex);
        });
        // 定时请求离线任务
        self.setInterval  = $interval(function(){
            self.getAccompOffLineList();
        }, 10000);
    }

    private initParams() {
        if (this.FaceCollisionAnalysisParams.length) {
            this.analysisMmapServer.clearDraw();
        }
        this.FaceCollisionAnalysisParams = [];
        let params: QueryAnalysisParams = new QueryAnalysisParams();
        params.taskName = "";
        params.threshold = 90;
        params.impactArr = [];
        return params;
    }

    private destoryForMapMarker() {
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTrackInfoWindow();
    }

    DrawRect() {
        this.analysisMmapServer.drawRect((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawCircle() {
        this.analysisMmapServer.drawCircle((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Circle) => {
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

    private DrawCallBackMethod(points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let self = this;
        if (self.FaceCollisionAnalysisParams.length < 5) {
            let arr: Array<SystemPoint> = [];
            points.forEach((item: SystemPoint) => {
                if (item.ObjectType === ObjectType.Camera.value) {
                    arr.push(item);
                }
            });
            if (arr.length === 0) {
                self.analysisMmapServer.removeDrawShape(geometry);
                return self.layerDec.warnInfo('框选区域不存在摄像机设备！');
            }
            self.checkArea(arr, geometry);
        } else {
            self.analysisMmapServer.removeDrawShape(geometry);
            return self.layerDec.warnInfo('碰撞区域最大只能有5个！')
        }
    }

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

    setFastDate(item: Enum<TimeLength>, index: number) {
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
        this.FaceCollisionAnalysisParams[index].startTime = time.startTime;
        this.FaceCollisionAnalysisParams[index].endTime = time.endTime;
        this.FastDate[index] = item;
    }

    setCheckResult(size: number, traget: number, isFirst?: boolean) {
        let self = this;
        let arr = [] as Array<boolean>;
        for (let i = 0; i < size; i++) {
            if (i === traget) {
                arr.push(!self.checkResult[traget])
            } else {
                arr.push(false)
            }
        }
        self.resultIndex = traget;
        if (isFirst) {
            arr[traget] = true
        }
        self.checkResult = arr;

        // 处理设备与收藏状态数据
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Camera.value;
        _.forEach(self.resultParams.data[traget].FaceCollideAccesses,function (value) {
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
            _.forEach(self.resultParams.data[traget].FaceCollideAccesses,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderMarkersForResult();
            });
        });
    }

    slideResult(i: number) {
        this.setCheckResult(this.resultParams.pageSize, i);
    }

    private checkArea(deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let scope: { deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle, $destroy: Function, selectCheckAreaCb:string } = this.$scope.$new();
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

    private renderMarkersForResult() {
        let accpArr = this.resultParams.data[this.resultIndex].FaceCollideAccesses;
        let obj = {} as { [key: string]: any };
        accpArr.forEach((item: any, index: number) => {
            obj[item.AccessLog.ID] = item;
            obj[item.AccessLog.ID].resultIndex = index;
        });
        this.resultForMap = obj;
        this.allResult = accpArr;
        this.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer, OverlayName.MapForAccpGroup,
            true, this.analysisMmapServer.getSystemPointForParams(this.allResult), this.resultForMap,
            false, null, MarkersIcon.NormalGreenIcon);
    }

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
        scope.analysisFunction = (item: any, type) => {
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
    resultToMap(item: any, index: number, type: string) {
        this.analysisMmapServer.resultToMap(item, type)
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: any, index: number, type: string) {
        this.analysisMmapServer.unResultToMap(item, this.resultForMap, type);
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
            this.showAnalysisList = false;
            this.destoryForMapMarker();
            this.analysisMmapServer.renderSystemPoint();
        });
    }

    goAllResult() {
        this.showForm = false;
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckResult(this.resultParams.pageSize, 0, true);
    }

    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckResult(this.resultParams.pageSize, 0, true);
    }

    addArea() {
        let arr = new FaceCollisionAnalysisParams();
        this.FaceCollisionAnalysisParams.push(arr);
        this.FastDate.push(FastData.today);
    }

    delArea(i: number) {
        let geometry = this.selectDrawArr[i];
        this.analysisMmapServer.removeDrawShape(geometry);
        this.FaceCollisionAnalysisParams.splice(i, 1);
        this.selectDrawArr.splice(i, 1);
    }

    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        self.initLoadingPop();
        let params = {
            "analyseTaskType": AnalyseTaskType.SearchAnalyseTaskResult,
            "taskId": item.TaskId,
            "TaskType": item.TaskType
        };
        self.analysisService.getOffLineDetail(params).then((res: any) => {
            self.layer.close(self.currentLayerIndex);
            if (res.code === 200) {
                if (res.data && res.data.FaceCollideEntities && res.data.FaceCollideEntities.length) {
                    self.destoryForMapMarker();
                    self.$timeout(() => {
                        self.pagination.set(res.data.FaceCollideEntities);
                    }).then(() => {
                        self.resultParams.pageSize = 6;
                        self.resultParams.currentPage = 1;
                        self.resultParams = self.pagination.getByPage(this.resultParams);
                        self.allResult = self.pagination.get();
                    }).then(() => {
                        self.showForm = false;
                        self.showResult = true;
                        self.analysisMmapServer.removeSystemPoint();
                        self.setCheckResult(self.resultParams.pageSize, 0, true);
                    })
                }else {
                    self.layerDec.info('没有查询到结果');
                }
                self.analysisMmapServer.clearDraw();
            } else {
                self.layerDec.warnInfo('查询结果失败');
            }
        });
    }

    submitSearch() {
        let self = this;
        let params: QueryAnalysisParams = new QueryAnalysisParams();
        params.taskName = self.QueryAnalysisParams.taskName;
        params.threshold = self.QueryAnalysisParams.threshold;
        params.impactArr = [];
        let item: QueryAnalysisItem;
        for (let i = 0; i < self.FaceCollisionAnalysisParams.length; i++) {
            item = this.FaceCollisionAnalysisParams[i];
            item.areaNo = "areaNo" + i;
            params.impactArr.push(item);
        }
        if (params.taskName === "") {
            self.layerDec.warnInfo('请输入任务名称');
            return false;
        }
        if (params.impactArr.length < 2) {
            self.layerDec.warnInfo('最少选择两个区域');
            return false;
        }
        for(let y = 0; y < params.impactArr.length; y++){
            // 判断时间
            if (params.impactArr[0].endTime < params.impactArr[0].startTime) {
                this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
        }
        self.initLoadingPop();
        self.analysisService.FaceCollisionAccompanying(params).then((res: ResponseResult<any>) => {
            self.layer.close(self.currentLayerIndex);
            if (res.code === 200) {
                self.showAnalysisList = true;
                self.getAccompOffLineList();
                // 清除查询参数
                self.QueryAnalysisParams = self.initParams();
            } else {
                self.layerDec.warnInfo('任务创建失败');
            }
        })
    }

    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckResult(this.resultParams.pageSize, 0, true);
    }

    // 获取离线任务列表
    private getAccompOffLineList() {
        let self = this;
        let params = {
            "id": self.userInfoCacheFactory.getCurrentUserId(),
            "taskType": OfflineTaskType.SearchFaceCollision
        };
        self.analysisService.getOffLineList(params).then((res: any) => {
            if (res.code === 200 && Array.isArray(res.data)) {
                let List: Array<InteligentTaskInfo> = [];
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].Ext = JSON.parse(res.data[i].Ext);
                    List.push(res.data[i]);
                }
                self.FaceCollisionOffLine = List;
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
            }
        })
    }

    setShowAnalysisList(status: boolean) {
        this.showAnalysisList = status;
        if (status) {
            this.getAccompOffLineList();
        }
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
}

app.controller('FaceCollisionAnalysisController', FaceCollisionAnalysisController);