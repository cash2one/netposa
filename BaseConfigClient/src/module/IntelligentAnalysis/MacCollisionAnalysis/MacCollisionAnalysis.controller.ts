/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
import {app} from '../../common/app/main.app';
import 'css!../style/MacCrash.css';

// 弹框
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

// 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/factory/userinfo.cache.factory';
import {IUserInfoCacheFactory} from '../../common/factory/userinfo.cache.factory';
import '../../common/services/analysis.service';
import {IAnalysisService} from '../../common/services/analysis.service';
import '../../common/factory/layerMsg.factory';
import {ILayerDec} from '../../common/factory/layerMsg.factory';

// 参数
import {AnalyseTaskType, OfflineTaskType} from '../../../core/server/enum/AnalyseTaskOffLine';
import {BackResponseBody} from '../../../core/params/result/ResponseResult';
import {
    DeviceType,
    MacCollisionAnalysisParams,
    MacCollisionAnalysisResult,
    MacImpact,
    PerceiveCollideAccessesModel
} from './MacCollisionAnalysis';
import {IAnalysisMmapServer} from '../main/analysisMmap.server';
import {InteligentTaskInfo} from '../../../core/entity/InteligentTaskInfo';
import {IPagination, PageParamsAndResult, Pagination} from '../../common/Pagination';
import {SystemPoint} from '../../../core/entity/SystemPoint';
import {FastData, getFastDataList, Enum, TimeLength, getWidowSize, OverlayName, MarkersIcon,} from '../AnalysisEnum';
import {ObjectType} from '../../../core/enum/ObjectType';
import {CollectDataType} from '../../../core/server/enum/CollectDataType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";


declare let PopupHtml: any, angular: any, loadingAnalysisHtml: any;

export class CacheResult extends PerceiveCollideAccessesModel {
    resultIndex: number;
}

class MacCollisionAnalysisController {
    $inject: Array<string> = ['$scope', '$timeout', 'analysisService', 'layer', 'analysisMmapServer', 'layerDec', '$interval', 'resourceRetrievalService'];
    systemPointList: Array<SystemPoint>;
    MacImpact: Array<MacImpact> = [];
    requsetParams: MacCollisionAnalysisParams;
    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    FastDate: Array<Enum<TimeLength>> = [];
    showForm: boolean = true;
    showResult: boolean = false;
    showAllResult: boolean = false;
    showAnalysisList: boolean = false;
    MacCollisionOffLine: Array<InteligentTaskInfo> = [];
    offLineResult: MacCollisionAnalysisResult;
    windowHeight: number = getWidowSize().height;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    allTrackResult: Array<any>;
    trackResultForMap: { [key: string]: any };
    currentLayerIndex: number;
    selectDrawArr: Array<NPMapLib.Overlay> = [];
    isSlideResult: Array<boolean> = [false];
    pagination: IPagination = new Pagination();
    resultIndex: number;
    resultForMap: { [key: string]: CacheResult };
    allResult: Array<PerceiveCollideAccessesModel>;
    selectDeviceCb: string = "close.device.popup";
    setInterval:any;
    analysisGoTo = AnalysisGoToType;
    windowWidth: number = getWidowSize().width - 60;

    constructor(private $scope: any,
                private $timeout: any,
                private analysisService: IAnalysisService,
                private layer: any,
                private analysisMmapServer: IAnalysisMmapServer,
                private layerDec: ILayerDec,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private $interval:any,
                private resourceRetrievalService: IResourceRetrievalService) {
        let self = this;

        self.initParams();

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
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: any, status:boolean, geometry?: NPMapLib.Geometry.Polygon) => {
            if (status) {
                self.addArea();
                self.selectDrawArr.push(geometry);
                self.$timeout(() => {
                    self.MacImpact[self.MacImpact.length - 1].deviceType = deviceIds;
                    self.setFastDate(FastData.today, self.MacImpact.length - 1);
                });
            } else {
                self.analysisMmapServer.removeDrawShape(geometry);
            }
            self.layer.close(self.currentLayerIndex)
        });
        // 定时请求离线任务
        self.setInterval  = $interval(function(){
            self.findOffLineList();
        }, 10000);
    }

    private initParams() {
        this.MacImpact = [];
        this.selectDrawArr = [];
        let params: MacCollisionAnalysisParams = new MacCollisionAnalysisParams();
        params.taskName = "";
        params.macImpactList = [];

        this.requsetParams = params;
    }

    /**
     * @description 删除离线任务
     * @param {AccompOffLine} item
     */
    private delOffLineTask(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            "taskId": item.TaskId,
            "taskType": item.TaskType
        };
        self.analysisService.deleteOffLineDetail(params).then((res: any) => {
            if (res.code === 200) {
                self.layerDec.info('删除成功');
                self.findOffLineList();
            } else {
                self.layerDec.warnInfo('删除失败');
            }
        })
    }

    setFastDate(item: Enum<TimeLength>, index: number) {
        this.FastDate[index] = item;
        this.MacImpact[index].startTime = item.value.startTime;
        this.MacImpact[index].endTime = item.value.endTime;
    }

    setTime(item: Enum<TimeLength>, index: number, i: number) {
        this.FastDate[index] = item;
    }

    private destoryForMapMarker() {
        this.analysisMmapServer.clearTraceAnalyze();
        this.analysisMmapServer.clearResultMarkers();
        this.analysisMmapServer.clearAccpMarkers();
        this.analysisMmapServer.clearTrackInfoWindow();
        this.analysisMmapServer.clearAccpTrackInfoWindow();
    }

    openDetailPopup(item: any, index: number) {
        let self = this;
        let objectType:string ="";
        let newItem: any = {};
        let newList:Array<any> = [];
        if (item.WiFiLog) {
            objectType = CollectDataType.WiFi.value;
            newItem.wifiLog = {};
            newItem.deviceInfo = {};
            newItem.AreaNo = item.AreaNo;
            newItem.wifiLog = item.WiFiLog;
            newItem.deviceInfo = item.deviceInfo;
            newItem.collectStatus = item.collectStatus;
            newList.push(newItem);
        } else if (item.EFenceLog) {
            objectType = CollectDataType.EFENCE.value;
            newItem.eFenceLog = {};
            newItem.deviceInfo = {};
            newItem.AreaNo = item.AreaNo;
            newItem.eFenceLog = item.EFenceLog;
            newItem.deviceInfo = item.deviceInfo;
            newItem.collectStatus = item.collectStatus;
            newList.push(newItem);
        }
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
        scope.allList =  newList;
        scope.showFooter = true;
        scope.index = "";
        scope.collectFunction = (item: any) => {
            self.clickCollect(null, item, true);
        };
        scope.analysisFunction = (item: any) => {
            self.clickAnalysis(null, item);
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
    resultToMap(item: CacheResult, index: number) {
        let ID = "";
        if (item.WiFiLog) {
            ID = item.AreaNo + item.WiFiLog.ID;
        } else if (item.EFenceLog) {
            ID = item.AreaNo + item.EFenceLog.ID;
        }
        this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, ID, MarkersIcon.HoverRedIcon, 999)
    }

    //TODO 取消结果显示地图对应的点位
    unResultToMap(item: CacheResult, index: number) {
        let ID = "";
        if (item.WiFiLog) {
            ID = item.AreaNo + item.WiFiLog.ID;
        } else if (item.EFenceLog) {
            ID = item.AreaNo + item.EFenceLog.ID;
        }
        let res = this.resultForMap[ID];
        this.analysisMmapServer.getMap().setMarkerIcon(OverlayName.MapForResultLayer, OverlayName.MapForResultGroup, ID, MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
    }

    addArea() {
        let arr = new MacImpact();
        this.FastDate.push(FastData.today);
        this.MacImpact.push(arr);
    }

    delArea(i: number) {
        let geometry = this.selectDrawArr[i];
        this.analysisMmapServer.removeDrawShape(geometry);
        this.MacImpact.splice(i, 1);
        this.selectDrawArr.splice(i, 1);
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
            taskType: OfflineTaskType.SearchPerceiveCollision
        };
        this.analysisService.getOffLineList(params).then((res: BackResponseBody<Array<InteligentTaskInfo>>) => {
            if (res.code === 200) {
                this.MacCollisionOffLine = res.data ? res.data : [];
            }
        })
    }

    submitSearch() {
        let self = this;
        let params: MacCollisionAnalysisParams = new MacCollisionAnalysisParams();
        params.taskName = self.requsetParams.taskName;
        params.macImpactList = [];
        let item: MacImpact;
        for (let i = 0; i < self.MacImpact.length; i++) {
            item = this.MacImpact[i];
            item.areaNo = "areaNo" + i;
            params.macImpactList.push(item);
        }
        if (params.taskName === "") {
            self.layerDec.warnInfo('请输入任务名称');
            return false;
        }
        if (params.macImpactList.length < 2) {
            self.layerDec.warnInfo('最少选择两个区域');
            return false;
        }
        for(let y = 0; y < params.macImpactList.length; y++){
            // 判断时间
            if (params.macImpactList[0].endTime < params.macImpactList[0].startTime) {
                this.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
        }
        self.analysisService.macCollision(params).then((res: BackResponseBody<MacCollisionAnalysisResult>) => {
            if (res.code === 200) {
                self.findOffLineList();
                self.showAnalysisList = true;
                self.initParams();
                self.analysisMmapServer.clearDraw();
            } else {
                self.layerDec.warnInfo('任务创建失败');
            }
        });
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
        _.forEach(self.resultParams.data[traget].PerceiveCollideAccesses,function (value) {
            if (value.WiFiLog) {
                params.deviceIds.push(value.WiFiLog.MacDeviceId);
                params.ids.push(value.WiFiLog.ID);
                params.deviceType = ObjectType.Wifi.value;
            } else if (value.EFenceLog) {
                params.deviceIds.push(value.EFenceLog.MobileDeviceId);
                params.ids.push(value.EFenceLog.ID);
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
            _.forEach(self.resultParams.data[traget].PerceiveCollideAccesses,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.renderAccpMarkers();
            });
        });
    }

    private renderAccpMarkers() {
        let accpArr = this.resultParams.data[this.resultIndex].PerceiveCollideAccesses;
        let obj = {} as { [key: string]: CacheResult };
        accpArr.forEach((item: CacheResult, index: number) => {
            let ID = "";
            if (item.WiFiLog) {
                ID = item.AreaNo + item.WiFiLog.ID;
            } else if (item.EFenceLog) {
                ID = item.AreaNo + item.EFenceLog.ID;
            }
            obj[ID] = item;
            obj[ID].resultIndex = index;
        });
        this.resultForMap = obj;
        this.allResult = accpArr;
        this.analysisMmapServer.renderMakers(
            OverlayName.MapForResultLayer,
            OverlayName.MapForResultGroup,
            true,
            this.getSystemPointForParams(this.allResult),
            this.resultForMap,
            false, null, MarkersIcon.NormalGreenIcon);
    }

    //TODO 根据点位集合获取对应的设备集合
    getSystemPointForParams(points: Array<PerceiveCollideAccessesModel>): Array<SystemPoint> {
        let arr = [] as Array<SystemPoint>;
        points.forEach((item: PerceiveCollideAccessesModel) => {
            let ID = "";
            if (item.WiFiLog) {
                ID = item.WiFiLog.MacDeviceId;
            } else if (item.EFenceLog) {
                ID = item.EFenceLog.MobileDeviceId;
            }
            let s = false;
            for (let index = 0; index < this.analysisMmapServer.getSystemPoint().length; index++) {
                let point = this.analysisMmapServer.getSystemPoint()[index];
                if (ID === point.ObjectID) {
                    s = true;
                    let arrItem = {
                        Lat: point.Lat,
                        Lon: point.Lon,
                        ID: point.ID,
                        ObjectID: point.ObjectID,
                        resultID: "",
                        Descrption: point.Descrption,
                        LayerType: point.LayerType,
                        ObjectType: point.ObjectType,
                        TaskStatus: point.TaskStatus,
                        ObjectState: point.ObjectState,
                        ObjectName: point.ObjectName
                    } as SystemPoint;
                    if (item.WiFiLog) {
                        arrItem.resultID = item.AreaNo + item.WiFiLog.ID;
                    } else if (item.EFenceLog) {
                        arrItem.resultID = item.AreaNo + item.EFenceLog.ID;
                    }

                    arr.push(arrItem);
                }
            }
            if (!s) {
                arr.push(null)
            }
        });
        return arr;
    }

    slideRightResult(i: number) {
        this.setCheckRightResult(this.resultParams.pageSize, i);
    }

    // 获取离线任务详情
    showAnalysisResult(item: InteligentTaskInfo) {
        let self = this;
        let params = {
            analyseTaskType: AnalyseTaskType.SearchAnalyseTaskResult,
            taskId: item.TaskId,
            TaskType: item.TaskType
        };
        self.destoryForMapMarker();
        self.initParams();
        self.initLoadingPop();
        self.analysisService.getOffLineDetail(params).then((res: BackResponseBody<MacCollisionAnalysisResult>) => {
            if (res.code === 200) {
                if (res.data && res.data.PerceiveCollideEntities && (res.data.PerceiveCollideEntities.length > 0)){
                    self.offLineResult = res.data;
                    self.pagination.set(res.data.PerceiveCollideEntities);
                    self.showResult = true;
                    self.showForm = false;
                    self.resultParams.currentPage = 1;
                    self.resultParams.pageSize = 6;
                    self.$timeout(() => {
                        self.analysisMmapServer.removeSystemPoint();
                        self.resultParams = self.pagination.getByPage(self.resultParams);
                        self.allResult = self.resultParams.allData;
                        self.setCheckRightResult(self.resultParams.pageSize, 0, true);
                    }).then(() => {
                        self.layer.close(self.currentLayerIndex);
                    });
                }else {
                    self.layer.close(self.currentLayerIndex);
                    self.layerDec.info('没有查询到结果');
                }
            }else {
                self.layer.close(self.currentLayerIndex);
                self.layerDec.warnInfo('查询结果失败');
            }
        });
    }

    // 选择区域
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
        if (self.requsetParams.macImpactList.length < 5) {
            let arr: Array<SystemPoint> = [];
            points.forEach((item: SystemPoint) => {
                if (item.ObjectType === ObjectType.Wifi.value) {
                    arr.push(item);
                } else if (item.ObjectType === ObjectType.ElectronicFence.value) {
                    arr.push(item);
                }
            });
            if (arr.length === 0) {
                self.analysisMmapServer.removeDrawShape(geometry);
                return self.layerDec.warnInfo('框选区域不存在设备！');
            } else {
                self.checkArea(arr, geometry);
            }
        } else {
            self.analysisMmapServer.removeDrawShape(geometry);
            return self.layerDec.warnInfo('碰撞区域最大只能有5个！')
        }
    }

    private checkArea(deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let scope: { deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle, $destroy: Function,cbDataList: Array<string>, selectCheckAreaCb:string } = this.$scope.$new();
        scope.deviceList = deviceList;
        scope.geometry = geometry;
        scope.selectCheckAreaCb = this.selectDeviceCb;
        scope.cbDataList = [ObjectType.Wifi.value,ObjectType.ElectronicFence.value];
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

    changeResultPage(i: number) {
        this.resultParams.currentPage = i;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    clickCollect(event: any, item: any, status:boolean) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        let ID:string ="";
        let objectType:string ="";
        let newItem:any = {};
        if (status) {
            if (item.wifiLog) {
                ID = item.wifiLog.ID;
            } else if (item.eFenceLog) {
                ID = item.wifiLog.ID;
            }
            newItem = item;
        }else{
            if (item.WiFiLog) {
                ID = item.WiFiLog.ID;
                newItem.wifiLog = item.WiFiLog;
                newItem.AreaNo = item.AreaNo;
                newItem.deviceInfo = item.deviceInfo;
                objectType = CollectDataType.WiFi.value;
            } else if (item.EFenceLog) {
                ID = item.EFenceLog.ID;
                newItem.eFenceLog = item.EFenceLog;
                newItem.AreaNo = item.AreaNo;
                newItem.deviceInfo = item.deviceInfo;
                objectType = CollectDataType.EFENCE.value;
            }
        }
        if (!item.collectStatus) {
            let params: any = {
                json: JSON.stringify(newItem),
                objectID: ID,
                objectType: objectType
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: any = {
                ids: ID
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
    clickAnalysis(event: any, item: any) {
        if (event) {
            event.stopPropagation();
        }

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

    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    goBackForm() {
        this.$timeout(() => {
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.destoryForMapMarker();
            this.analysisMmapServer.renderSystemPoint();
        })
    }

    goAllResult() {
        this.showForm = false;
        this.showResult = false;
        this.showAllResult = true;
        this.resultParams.pageSize = 40;
        this.resultParams.currentPage = 1;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    }

    closeAllResult() {
        this.showResult = true;
        this.showAllResult = false;
        this.resultParams.currentPage = 1;
        this.resultParams.pageSize = 6;
        this.resultParams = this.pagination.getByPage(this.resultParams);
        this.setCheckRightResult(this.resultParams.pageSize, 0, true);
    }
}

app.controller('macCollisionAnalysisController', MacCollisionAnalysisController);
