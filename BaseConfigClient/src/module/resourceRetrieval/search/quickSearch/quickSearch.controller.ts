/// <amd-dependency path="text!../../../selectPopup/treeArea/TreeArea.html" name="treeAreapopupHtml" />
import {app} from "../../../common/app/main.app";

// 弹框
import '../../../selectPopup/treeArea/TreeArea'

// 搜索结果
import "./devicePage/carSearchPage.controller";
import "./devicePage/personSearchPage.controller";
import "./devicePage/wifiSearchPage.controller";
import "./devicePage/EFSearchPage.controller";
import "./devicePage/deviceSearchPage.controller";
import "./devicePage/positionSearchPage.controller";

// 服务
import "../../../common/services/resourceRetrieval.service";
import {IResourceRetrievalService} from "../../../common/services/resourceRetrieval.service";
import "../../../common/factory/socket.factory";
import {ISocketFactory} from "../../../common/factory/socket.factory";
import "../../../common/factory/layerMsg.factory";
import { ILayerDec } from "../../../common/factory/layerMsg.factory";
import "../../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../../common/factory/userinfo.cache.factory";
import "../../../common/factory/systemInfo.cache.factory";
import {ISystemInfoCacheProvider} from "../../../common/factory/systemInfo.cache.factory";

// 公用方法
import {AttributeFactory} from "../../../common/factory/attribute.factory";
import {SystemConfigParams} from "../../../../core/entity/SystemConfigParams";
import {SystemPoint} from "../../../../core/entity/SystemPoint";
import {
    car,
    carItem,
    initCarResult,
    face,
    faceItem,
    initFaceResult,
    wifiItem,
    initWifiResult,
    electronicItem,
    initElectronicResult,
    positionItem,
    initPositionResult,
    deviceItem,
    initDeviceResult,
    QuickSearchParams,
    SetHistoryQueryRecord,
    GetLastQueryRecord
} from "../../resourceRetrievalEnum";
import {ObjectType} from '../../../../core/enum/ObjectType';
import {SocketResultTypeEnum} from "../../../../core/server/enum/SocketResultTypeEnum";
import {ResourceTypeEnum} from "../../../../core/server/enum/ResourceType";

// 分页方法
import {PageParamsAndResult, Pagination, IPagination} from '../../../common/Pagination'
import * as _ from "lodash";

declare let angular: any, treeAreapopupHtml: any;

// 查询模块切换
interface ISwitchPage {
    title: string;
    iconPath: string;
    name: string;
    visible: boolean;
}

class quickSearchController {
    static $inject = ["$scope", "$timeout", "resourceRetrievalService", "layer", "socketFactory", "userInfoCacheFactory", "layerDec", "systemInfoCacheFactory"];

    switchButton: Array<ISwitchPage>;
    switchPage: ISwitchPage;

    carResult: carItem; // 车辆查询数据
    faceResult: faceItem; // 人脸查询数据
    wifiResult: wifiItem; // wifi查询数据
    electronicResult: electronicItem; // 电围查询数据
    rfidResult: wifiItem; // rfid查询数据
    positionResult: positionItem; // 位置查询数据

    deviceRmpGateResult: PageParamsAndResult = new PageParamsAndResult();
    RmpGateResultPagination: IPagination = new Pagination();

    deviceCameraResult: PageParamsAndResult = new PageParamsAndResult();
    CameraResultPagination: IPagination = new Pagination();

    deviceWifiResult: PageParamsAndResult = new PageParamsAndResult();
    WifiResultPagination: IPagination = new Pagination();

    deviceElectronicResult: PageParamsAndResult = new PageParamsAndResult();
    ElectronicResultPagination: IPagination = new Pagination();

    hideSize: boolean = true;
    hideGopage: boolean = true;
    searchBar: boolean = true;
    deviceStatus: boolean = false;
    keyWord: string = "";
    timeList: Array<{ name: string, id: number }> = [
        {name: '一天', id: 1},
        {name: '一周', id: 2},
        {name: '一月', id: 3}
    ];
    selectTime: number = 3;
    // 查询时间与查询总数
    queryStartTime: number = 0;
    queryEndTime: number = 0;
    queryTotal: number = 0;
    seleAreaId: string;
    deviceArrId: Array<string> = [];
    selectAreaArr: Array<any> = [];
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();

    // socket缓存数据
    socketData: any;
    socketCarData: any;
    socketQueryData: any;

    // 设备信息
    activeSearchParams: any = {
        keyWord: "",
        taskId: "",
        featureSearchExt: ""
    };
    selectAreaCb: string = "close.area.popup";

    constructor(private $scope: any,
                private $timeout: Function,
                private resourceRetrievalService: IResourceRetrievalService,
                private layer: any,
                private socketFactory: ISocketFactory,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private systemInfoCacheFactory: ISystemInfoCacheProvider) {
        let self = this;
        self.initParams();

        // 监听区域选择树
        self.$scope.$on(self.selectAreaCb, function (event: any, areaIds: Array<string>, status: boolean) {
            if (status) {
                if (Array.isArray(areaIds)) {
                    self.selectAreaArr = areaIds
                } else {
                    self.selectAreaArr = [];
                }
            }
            self.layer.close(self.seleAreaId);
        });

        // 监听父页面广播参数
        self.$scope.$on("verify-keyword", function (event: any, data: any) {
            self.queryTotal = 0;
            self.queryStartTime = (new Date()).valueOf();
            self.socketQueryData = data;
            switch (data.type) {
                case "quick": self.searchByQuick(data); break;
                case "Face": self.searchByFace(data); break;
                case "Car": self.searchByCar(data); break;
                default: break;
            }
        });
    }

    private initParams() {
        let self = this;
        self.switchButton = [
            {title: "车辆", iconPath: "../../../images/resourceRetrieval/switch-car.png", name: "car", visible: true},
            {
                title: "人像",
                iconPath: "../../../images/resourceRetrieval/switch-person.png",
                name: "person",
                visible: false
            },
            {
                title: "Wi-Fi",
                iconPath: "../../../images/resourceRetrieval/switch-wifi.png",
                name: "wifi",
                visible: false
            },
            {
                title: "RFID",
                iconPath: "../../../images/resourceRetrieval/switch-rfid.png",
                name: "rfid",
                visible: false
            },
            {
                title: "电围",
                iconPath: "../../../images/resourceRetrieval/switch_electronicfence.png",
                name: "electronicfence",
                visible: false
            },
            {
                title: "设备",
                iconPath: "../../../images/resourceRetrieval/switch-device.png",
                name: "device",
                visible: false
            },
            {
                title: "位置",
                iconPath: "../../../images/resourceRetrieval/switch-position.png",
                name: "position",
                visible: false
            }
        ];
        self.switchPage = self.switchButton[0];

        self.initPageParams();
    }

    private initPageParams() {
        let self = this;
        // 初始化查询数据
        self.carResult = initCarResult(0);
        self.faceResult = initFaceResult(0);
        self.wifiResult = initWifiResult(0);
        self.electronicResult = initElectronicResult();
        self.rfidResult = initWifiResult(0);
        self.positionResult = initPositionResult();
        self.deviceStatus = true;
    }

    private monitorFaceSocket(){
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.FaceSearch, (result: Array<any>) => {
            self.queryEndTime = (new Date()).valueOf();
            if (result[0].code === 200) {
                self.queryTotal = result[0].data.Face.TotalCount;
                self.socketData = result[0].data.Face;
                self.dealSocketData();
            } else {
                // 向父页面广播--查询结束
                self.$scope.$emit("search-request-loading", false);
            }
            self.logoutFaceSocket();
        });
    }

    private logoutFaceSocket(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.FaceSearch);
    }

    private monitorCarSocket(){
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.CarSearch, (result: Array<any>) => {
            self.queryEndTime = (new Date()).valueOf();
            if (result[0].code === 200) {
                self.queryTotal = result[0].data.Vehicle.TotalCount;
                self.socketCarData = result[0].data.Vehicle;
                self.dealSocketCarData();
            } else {
                // 向父页面广播--查询结束
                self.$scope.$emit("search-request-loading", false);
            }
            self.logoutCarSocket();
        });
    }

    private logoutCarSocket(){
        this.socketFactory.unSubscribe(SocketResultTypeEnum.CarSearch);
    }

    // 全文检索
    private searchByQuick(data: any) {
        let self = this;
        // 查询内容变化重置筛选条件
        if (self.activeSearchParams.keyWord !== data.keyword) {
            self.selectAreaArr = [];
            self.selectTime = 3;
        }
        self.keyWord = data.keyword;
        let quickSearchParams: QuickSearchParams = {
            "keyWord": data.keyword,
            "keyWords": [],
            "arrObjectID": [],
            "areaId": self.selectAreaArr,
            "objectType": "All",
            "currentPage": 1,
            "pageSize": 10,
            "userId": self.userInfoCacheFactory.getCurrentUserId(),
            "orderBy": {
                "isAsc": false
            },
            "isFirstSearch": true
        };
        // 设置查询设备id
        if(data.deviceArrId.length>0) {
            quickSearchParams.arrObjectID = data.deviceArrId;
        } else {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                deviceIds.push(value.ObjectID);
            });
            quickSearchParams.arrObjectID = deviceIds;
        }
        // 是否是单类检索
        if (data.objectType) {
            quickSearchParams.objectType = data.objectType;
        }
        // 判断是多关键词检索
        let keyWordArr: Array<string> = [];
        keyWordArr = data.keyword.split(" ");
        quickSearchParams.keyWords = keyWordArr;
        quickSearchParams.RelationType = "AND";
        let crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
        quickSearchParams.startTime = crossTime.startTime;
        quickSearchParams.endTime = crossTime.endTime;
        self.activeSearchParams = quickSearchParams;
        self.getServerMessage(quickSearchParams, true);
    }

    // 人员以图检索
    private searchByFace(data: any) {
        let self = this;
        // 初始化系统配置
        let systemData: SystemConfigParams = self.systemInfoCacheFactory.getSystemInfo();
        let featureSearchExt:Array<any> = [];
        let fetureTaskParam:Array<any> = [];
        _.forEach(data.faceInfo, function(value, key) {
            if (value.featureSearchExt){ // 拖拽
                featureSearchExt.push(value.featureSearchExt);
            }else {
                fetureTaskParam.push(value.fetureTaskParam);
            }
        });
        // 查询内容变化重置筛选条件
        if ((self.activeSearchParams.featureSearchExt !== featureSearchExt)||(self.activeSearchParams.fetureTaskParam !== fetureTaskParam)) {
            self.selectAreaArr = [];
            self.selectTime = 3;
        }
        let socketSearchParams: any = {
            "featureSearchExt": featureSearchExt,
            "fetureTaskParam": fetureTaskParam,
            "orderBy": {
                "isAsc": false
            },
            "imagePath": "Face",
            "isFirstSearch": false,
            "threshold": systemData.IdentityValue || 75,
            "userId": self.userInfoCacheFactory.getCurrentUserId(),
            "arrCameraId": [],
            "arrAreaID": self.selectAreaArr
        };
        // 设置查询设备id
        if(data.deviceArrId.length>0) {
            socketSearchParams.arrObjectID = data.deviceArrId;
        } else {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    deviceIds.push(value.ObjectID);
                }
            });
            socketSearchParams.arrObjectID = deviceIds;
        }
        let crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
        socketSearchParams.startTime = crossTime.startTime;
        socketSearchParams.endTime = crossTime.endTime;
        self.activeSearchParams = socketSearchParams;
        self.websocketQuickSearch(socketSearchParams);
    }

    // 车辆以图检索
    private searchByCar(data: any) {
        let self = this;
        // 初始化系统配置
        let systemData: SystemConfigParams = self.systemInfoCacheFactory.getSystemInfo();
        let featureSearchExt:Array<any> = [];
        let fetureTaskParam:Array<any> = [];
        _.forEach(data.carInfo, function(value, key) {
            if (value.featureSearchExt){ // 拖拽
                featureSearchExt.push(value.featureSearchExt);
            }else {
                fetureTaskParam.push(value.fetureTaskParam);
            }
        });
        // 查询内容变化重置筛选条件
        if ((self.activeSearchParams.featureSearchExt !== featureSearchExt)||(self.activeSearchParams.fetureTaskParam !== fetureTaskParam)) {
            self.selectAreaArr = [];
            self.selectTime = 3;
        }
        let socketSearchParams: any = {
            "featureSearchExt": featureSearchExt,
            "fetureTaskParam": fetureTaskParam,
            "orderBy": {
                "isAsc": false
            },
            "imagePath": "Car",
            "isFirstSearch": false,
            "threshold": systemData.IdentityValue || 75,
            "userId": self.userInfoCacheFactory.getCurrentUserId(),
            "arrObjectID": [],
            "arrAreaID": self.selectAreaArr
        };
        // 设置查询设备id
        if(data.deviceArrId.length>0) {
            socketSearchParams.arrObjectID = data.deviceArrId;
        } else {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.RmpGate.value === value.ObjectType) {
                    deviceIds.push(value.ObjectID);
                }
            });
            socketSearchParams.arrObjectID = deviceIds;
        }
        let crossTime = self.attributeFactory.getCrossTrainTime(self.selectTime);
        socketSearchParams.startTime = crossTime.startTime;
        socketSearchParams.endTime = crossTime.endTime;

        self.activeSearchParams = socketSearchParams;
        self.websocketQuickSearchByCar(socketSearchParams);
    }

    /**
     * 获取快速检索结果
     * @param {QuickSearchParams} quickSearchParams
     */
    private getServerMessage(quickSearchParams: QuickSearchParams, type: boolean) {
        let self = this;

        // 首次查询
        if (type) {
            self.initPageParams();
            // 设置查询参数缓存
            SetHistoryQueryRecord(quickSearchParams);
        }
        self.resourceRetrievalService.searchQuickByPromise(quickSearchParams).then((res: any) => {
            // 设置查询结束时间
            if (quickSearchParams.objectType === "All") {
                self.queryEndTime = (new Date()).valueOf();
                if (res.count) {
                    self.queryTotal = res.count;
                }
            }
            if (res.code = 200) {
                // 处理车辆数据
                if (res.data.Vehicle && res.data.Vehicle.TotalCount > 0) {
                    self.disposeCommonData(self.carResult, res.data.Vehicle, ResourceTypeEnum[2].value);
                } else if (type) {
                    self.carResult.pageParams.totalCount = 0;
                    self.carResult.pageParams.pageCount = 0;
                    self.carResult.data = [];
                }
                // 处理人脸数据
                if (res.data.Face && res.data.Face.TotalCount > 0) {
                    self.disposeCommonData(self.faceResult, res.data.Face, ResourceTypeEnum[1].value);
                } else if (type) {
                    self.faceResult.pageParams.totalCount = 0;
                    self.faceResult.pageParams.pageCount = 0;
                    self.faceResult.data = [];
                }
                // 处理WIFI数据
                if (res.data.WiFi && res.data.WiFi.TotalCount > 0) {
                    self.disposeCommonData(self.wifiResult, res.data.WiFi, ResourceTypeEnum[5].value);
                } else if (type) {
                    self.wifiResult.pageParams.totalCount = 0;
                    self.wifiResult.pageParams.pageCount = 0;
                    self.wifiResult.data = [];
                }
                // 处理电围数据
                if (res.data.EFENCE && res.data.EFENCE.TotalCount > 0) {
                    self.disposeCommonData(self.electronicResult, res.data.EFENCE, ResourceTypeEnum[7].value);
                } else if (type) {
                    self.electronicResult.pageParams.totalCount = 0;
                    self.electronicResult.pageParams.pageCount = 0;
                    self.electronicResult.data = [];
                }
                if (type) {
                    self.deviceStatus = true;
                    // 处理设备-卡口数据
                    self.RmpGateResultPagination.set(res.data.DeviceRmpGate.Result);
                    self.deviceRmpGateResult.pageSize = 6;
                    self.deviceRmpGateResult.currentPage = 1;
                    self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
                    // 处理设备-camera数据
                    self.CameraResultPagination.set(res.data.DeviceCamera.Result);
                    self.deviceCameraResult.pageSize = 6;
                    self.deviceCameraResult.currentPage = 1;
                    self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
                    // 处理设备-wifi数据
                    self.WifiResultPagination.set(res.data.DeviceWiFi.Result);
                    self.deviceWifiResult.pageSize = 6;
                    self.deviceWifiResult.currentPage = 1;
                    self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
                    // 处理设备-电围数据
                    self.ElectronicResultPagination.set(res.data.DeviceEFENCE.Result);
                    self.deviceElectronicResult.pageSize = 6;
                    self.deviceElectronicResult.currentPage = 1;
                    self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
                }
            }
            self.$timeout(() => {
                // 向父页面广播--查询结束
                self.$scope.$emit("search-request-loading", false);
            });
        }).catch((err: any) => {
            // 向父页面广播--查询结束
            self.$scope.$emit("search-request-loading", false);
        });
        // 模拟测试数据
        self.searchBar = true
    }

    // 设置socket请求参数
    public dealSocketData() {
        let self = this;
        // 自动定位到人脸
        self.switchButton[0].visible = false;
        self.switchButton[1].visible = true;
        self.switchPage = self.switchButton[1];
        let min = self.faceResult.pageParams.pageSize * (self.faceResult.pageParams.currentPage - 1);
        let max = self.faceResult.pageParams.pageSize * self.faceResult.pageParams.currentPage;
        let newData:any = {
            Result: [],
            TotalCount: self.socketData.TotalCount,
            TaskId: self.socketData.TaskId
        };
        for (let i = min; i < max && i < self.socketData.TotalCount; i++) {
            newData.Result.push(self.socketData.Result[i]);
        }
        self.disposeCommonData(self.socketData, newData, ResourceTypeEnum[1].value);
    }

    // 设置socket请求参数
    public dealSocketCarData() {
        let self = this;
        // 自动定位到人脸
        self.switchButton[0].visible = true;
        self.switchPage = self.switchButton[0];
        let carResultData: Array<car> = [];
        let min = self.carResult.pageParams.pageSize * (self.carResult.pageParams.currentPage - 1);
        let max = self.carResult.pageParams.pageSize * self.carResult.pageParams.currentPage;
        let newData:any = {
            Result: [],
            TotalCount: self.socketCarData.TotalCount,
            TaskId: self.socketCarData.TaskId
        };
        for (let i = min; i < max && i < self.socketCarData.TotalCount; i++) {
            newData.Result.push(self.socketCarData.Result[i]);
        }
        self.disposeCommonData(self.socketCarData, newData, ResourceTypeEnum[2].value);
    }

    /**
     * @description处理查询数据
     * @param resultData
     * @param data
     * @param {string} type
     */
    private disposeCommonData(resultData: any, data: any, type: string) {
        let self = this;
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        if (type === ResourceTypeEnum[2].value) {
            params.deviceType = ObjectType.RmpGate.value;
            _.forEach(data.Result,function (value) {
                params.deviceIds.push(value.deviceId);
                params.ids.push(value.id);
            });
        }
        if (type === ResourceTypeEnum[1].value) {
            params.deviceType = ObjectType.Camera.value;
            _.forEach(data.Result,function (value) {
                params.deviceIds.push(value.AccessLog.CameraID);
                params.ids.push(value.AccessLog.ID);
            });
        }
        if (type === ResourceTypeEnum[5].value) {
            params.deviceType = ObjectType.Wifi.value;
            _.forEach(data.Result,function (value) {
                params.deviceIds.push(value.wifiLog.MacDeviceId);
                params.ids.push(value.wifiLog.ID);
            });
        }
        if (type === ResourceTypeEnum[7].value) {
            params.deviceType = ObjectType.ElectronicFence.value;
            _.forEach(data.Result,function (value) {
                params.deviceIds.push(value.eFenceLog.MobileDeviceId);
                params.ids.push(value.eFenceLog.ID);
            });
        }
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
            if (type === ResourceTypeEnum[2].value) {
                self.$timeout(() => {
                    self.carResult.pageParams.totalCount = data.TotalCount;
                    self.carResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.carResult.pageParams.pageSize);
                    self.carResult.data = data.Result;
                    self.carResult.taskId = data.TaskId;
                    // 向父页面广播--查询结束
                    self.$scope.$emit("search-request-loading", false);
                });
            }
            if (type === ResourceTypeEnum[1].value) {
                self.$timeout(() => {
                    self.faceResult.pageParams.totalCount = data.TotalCount;
                    self.faceResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.faceResult.pageParams.pageSize);
                    self.faceResult.data = data.Result;
                    self.faceResult.taskId = data.TaskId;
                    // 向父页面广播--查询结束
                    self.$scope.$emit("search-request-loading", false);
                });
            }
            if (type === ResourceTypeEnum[5].value) {
                self.$timeout(() => {
                    self.wifiResult.pageParams.totalCount = data.TotalCount;
                    self.wifiResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.wifiResult.pageParams.pageSize);
                    self.wifiResult.data = data.Result;
                    self.wifiResult.taskId = data.TaskId;
                });
            }
            if (type === ResourceTypeEnum[7].value) {
                self.$timeout(() => {
                    self.electronicResult.pageParams.totalCount = data.TotalCount;
                    self.electronicResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.electronicResult.pageParams.pageSize);
                    self.electronicResult.data = data.Result;
                    self.electronicResult.taskId = data.TaskId;
                });
            }
        });
    }

    // 置空设备数据
    private deviceEmpty() {
        let self = this;
        self.deviceStatus = false;

        // 处理设备-卡口数据
        self.RmpGateResultPagination.set([]);
        self.deviceRmpGateResult.pageSize = 6;
        self.deviceRmpGateResult.currentPage = 1;
        self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
        // 处理设备-camera数据
        self.CameraResultPagination.set([]);
        self.deviceCameraResult.pageSize = 6;
        self.deviceCameraResult.currentPage = 1;
        self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
        // 处理设备-wifi数据
        self.WifiResultPagination.set([]);
        self.deviceWifiResult.pageSize = 6;
        self.deviceWifiResult.currentPage = 1;
        self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
        // 处理设备-电围数据
        self.ElectronicResultPagination.set([]);
        self.deviceElectronicResult.pageSize = 6;
        self.deviceElectronicResult.currentPage = 1;
        self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
    }

    /**
     * @description 分页信息
     * @param {number} num
     * @returns {any}
     */
    public changePage(num: number, type: string) {
        let self = this;
        let pageParams: any;

        let keyWord: string = self.keyWord,
            currentPage: number = num,
            objectType: string,
            pageSize: number,
            taskId: string;

        switch (type) {
            case "carResult":
                self.carResult.pageParams.currentPage = num;
                pageParams = self.carResult.pageParams;
                objectType = "Vehicle";
                pageSize = self.carResult.pageParams.pageSize;
                taskId = self.carResult.taskId;
                break;
            case "faceResult":
                self.faceResult.pageParams.currentPage = num;
                pageParams = self.faceResult.pageParams;
                objectType = "Face";
                pageSize = self.faceResult.pageParams.pageSize;
                taskId = self.faceResult.taskId;
                break;
            case "wifiResult":
                self.wifiResult.pageParams.currentPage = num;
                pageParams = self.wifiResult.pageParams;
                objectType = "WiFi";
                pageSize = self.wifiResult.pageParams.pageSize;
                taskId = self.wifiResult.taskId;
                break;
            case "eleResult":
                self.electronicResult.pageParams.currentPage = num;
                pageParams = self.electronicResult.pageParams;
                objectType = "EFENCE";
                pageSize = self.electronicResult.pageParams.pageSize;
                taskId = self.electronicResult.taskId;
                break;
            case "position":
                self.positionResult.pageParams.currentPage = num;
                pageParams = self.positionResult.pageParams;
                break;
            default:
                return null;
        }
        let quickSearchParams: QuickSearchParams = {
            "keyWord": keyWord,
            "keyWords": [],
            "objectType": objectType,
            "currentPage": currentPage,
            "pageSize": pageSize,
            "userId": self.userInfoCacheFactory.getCurrentUserId(),
            "orderBy": {
                "isAsc": false
            },
            "taskId": taskId,
            "isFirstSearch": false
        };
        // 判断是多关键词检索
        let keyWordArr: Array<string> = [];
        keyWordArr = keyWord.split(" ");
        quickSearchParams.keyWords = keyWordArr;
        if (self.socketQueryData.type === "quick") {
            self.getServerMessage(quickSearchParams, false);
        } else if (self.socketQueryData.type === "Face") {
            self.dealSocketData();
        } else if (self.socketQueryData.type === "Car") {
            self.dealSocketCarData();
        }
        return pageParams;
    };

    public changePageDevice(num: number, type: string) {
        let self = this;
        switch (type) {
            case "deviceCameraResult":
                self.deviceCameraResult.currentPage = num;
                self.deviceCameraResult = self.CameraResultPagination.getByPage(self.deviceCameraResult);
                break;
            case "deviceRmpGateResult":
                self.deviceRmpGateResult.currentPage = num;
                self.deviceRmpGateResult = self.RmpGateResultPagination.getByPage(self.deviceRmpGateResult);
                break;
            case "deviceWifiResult":
                self.deviceWifiResult.currentPage = num;
                self.deviceWifiResult = self.WifiResultPagination.getByPage(self.deviceWifiResult);
                break;
            case "deviceElectronicResult":
                self.deviceElectronicResult.currentPage = num;
                self.deviceElectronicResult = self.ElectronicResultPagination.getByPage(self.deviceElectronicResult);
                break;
        }
    };

    // 导航条按钮切换
    public navigationSwitch(name: string) {
        let self = this;
        let switchNav: Array<ISwitchPage> = angular.copy(self.switchButton);

        switchNav.forEach((Title) => {
            if (Title.name === name) {
                Title.visible = true;
                self.switchPage = Title;
            } else {
                Title.visible = false;
            }
        });
        self.switchButton = switchNav;
    };

    // 选择搜索工具
    public searchSwitch() {
        this.searchBar = !this.searchBar
    };

    // 返回上次检索
    public lastQuery() {
        let self = this;
        let lastQueryRecord: any = GetLastQueryRecord();
        if (lastQueryRecord) {
            lastQueryRecord = lastQueryRecord.value;
            self.$scope.$emit('last-query', lastQueryRecord);
            if  (lastQueryRecord.keyWord !== "") {
                self.getServerMessage(lastQueryRecord, true);
            } else if  (lastQueryRecord.imagePath === "Face") {
                self.websocketQuickSearch(lastQueryRecord);
            } else if  (lastQueryRecord.imagePath === "Car") {
                self.websocketQuickSearchByCar(lastQueryRecord);
            }
        } else {
            self.layerDec.info('未找到历史查询记录');
        }

    }

    // 选择区域
    public selectArea() {
        let scope: { selectCameraList: Array<string>, $destroy: Function, selectCtrlCb: string  } = this.$scope.$new();
        scope.selectCtrlCb = this.selectAreaCb;
        scope.selectCameraList = this.selectAreaArr;
        this.seleAreaId = this.layer.open({
            type: 1,
            content: treeAreapopupHtml,
            scope: scope,
            title: "选择区域",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    // 清除搜索参数
    public searchClearParams() {
        this.selectTime = 3;
        this.selectAreaArr = [];
    }

    /**
     * @description 人脸socket查询
     * @param socketSearchParams
     */
    public websocketQuickSearch(socketSearchParams: any) {
        let self = this;
        // 向父页面广播--查询开始
        self.$scope.$emit("search-request-loading", true);

        self.initPageParams();

        // 设置查询参数缓存
        SetHistoryQueryRecord(socketSearchParams);

        // 置空其它数据
        self.initParams();
        self.resourceRetrievalService.advancedSearchByFace(socketSearchParams).then((res: any) => {
            if (res.code === 200) {
                self.monitorFaceSocket();
            }else {
                self.$scope.$emit("search-request-loading", false);
            }
        });
    }

    /**
     * @description 车辆socket查询
     * @param socketSearchParams
     */
    public websocketQuickSearchByCar(socketSearchParams: any) {
        let self = this;
        // 向父页面广播--查询开始
        self.$scope.$emit("search-request-loading", true);

        self.initPageParams();

        // 设置查询参数缓存
        SetHistoryQueryRecord(socketSearchParams);

        // 置空其它数据
        self.initParams();
        self.resourceRetrievalService.advancedSearchByCar(socketSearchParams).then((res: any) => {
            if (res.code === 200) {
                self.monitorCarSocket();
            }else {
                self.$scope.$emit("search-request-loading", false);
            }
        });
    }
}

app.controller("quickSearchController", quickSearchController);