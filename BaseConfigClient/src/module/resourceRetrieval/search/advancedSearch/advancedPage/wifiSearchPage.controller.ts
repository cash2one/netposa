/// <amd-dependency path="text!../../../../detailPopup/wifiPopup/wifiPopup.html" name="wifiPopupHtml" />
/// <amd-dependency path="text!../../../../selectPopup/treeWiFi/Tree.wifi.popup.html" name="wifiTreePopupHtml" />
import {app} from '../../../../common/app/main.app';

// 弹框
import "../../../../selectPopup/treeWiFi/Tree.wifi.popup";

// 高级检索参数
import {WifiSearchParams, multipleChoice, CrossTrainTimeList} from '../adVanceSearchEnum';
import {wifi, wifiItem, initWifiResult, CollectAddParams, CollectDeleteParams} from '../../../resourceRetrievalEnum';

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';
import "../../../../common/factory/deviceCache.factory";
import {IdeviceCaacheService} from "../../../../common/factory/deviceCache.factory";
import "../../../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../../../common/factory/userinfo.cache.factory";
import { ILayerDec } from "../../../../common/factory/layerMsg.factory";
import "../../../../common/factory/layerMsg.factory";

// 公用方法
import {AttributeFactory} from "../../../../common/factory/attribute.factory";
import {ObjectType} from '../../../../../core/enum/ObjectType';
import {SystemPoint} from "../../../../../core/entity/SystemPoint";
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";
import * as _ from "lodash";

declare let wifiPopupHtml: any, angular: any, wifiTreePopupHtml: any;

class WifiSearchPageController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "deviceCacheServer", "userInfoCacheFactory", "layerDec"];

    maxSacle: number = 100; //  相似度最大值
    selectTimeAcitve: number = 3;//时间段参数
    showMore: boolean = false;//是否显示更多
    searchParams: WifiSearchParams;// 查询参数
    wifiResult: wifiItem = initWifiResult(0); // 查询结果
    crossTrainTimeList: Array<multipleChoice>;//  时间段
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    // 设备选择弹框
    currentLayerIndex: number;
    // 设备信息
    wifiListInfo: any;
    layerIndex:any;
    queryStatus: number = 1; // 查询状态  1: 初始状态 2：查询中  3：查询结束
    selectDeviceCb: string = "close.wifi.popup";

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private deviceCacheServer: IdeviceCaacheService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec) {
        let self = this;
        self.initParams();

        // 监听广播事件--设备id
        self.$scope.$on("search-device-id", function (event: any, data: any, dataType: string) {
            if (dataType === ObjectType.Wifi.value) {
                let arrCameraId: Array<string> = angular.copy(self.searchParams.ArObjectID);
                arrCameraId =  _.concat(data, arrCameraId);
                arrCameraId = _.uniq(arrCameraId);
                self.searchParams.ArObjectID = arrCameraId;
            }
        });
        // 监听设备选择树
        self.$scope.$on(self.selectDeviceCb, (event: any, wifiIds: Array<string>, status:boolean) => {
            if (status) {
                if (Array.isArray(wifiIds)) {
                    self.$timeout(() => {
                        self.searchParams.ArObjectID = wifiIds;
                    });
                }
            }
            self.layer.close(self.currentLayerIndex);
        });

        // 监听广播事件--导航切换--重置数据
        self.$scope.$on("advancedSearch-change", function (event: any, data: any) {
            if ((data === "wifi")||(data === "all")) {
                self.initParams();
            }
        });
    }

    // 初始化参数
    public initParams() {
        let self = this;
        // 设置筛选数据
        self.crossTrainTimeList = CrossTrainTimeList();//  时间段
        self.selectTimeAcitve = 3;
        // 设置查询参数
        self.wifiResult.pageParams.pageSize = 32;
        self.searchParams = {
            keyWord: "",
            currentPage: 1,
            pageSize: 32,
            userId: self.userInfoCacheFactory.getCurrentUserId(),
            orderBy: {
                isAsc: false
            },
            isFirstSearch: true,
            ArObjectID: []
        };
        self.queryStatus = 1;

        // 设置默认查询时段
        let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
        self.searchParams.startTime = time.startTime;
        self.searchParams.endTime = time.endTime;

        // 销毁清除弹框
        self.$scope.$on('$destroy', () => {
            self.layer.close()
        })

        // 初始化获取设备信息
        self.wifiListInfo = self.deviceCacheServer.getAllWifiList();
    }

    // 查询数据
    public searchAdvancedSubmit() {
        let self = this;
        if (self.searchParams.keyWord === "") {
            return self.layerDec.warnInfo('请输入关键词');
        }
        self.searchParams.currentPage = 1;
        self.searchParams.pageSize = self.wifiResult.pageParams.pageSize;
        self.searchParams.taskId = "";
        self.wifiResult.pageParams.currentPage = 1;
        self.searchParams.isFirstSearch = true;
        self.queryStatus = 2;

        let searchParams: WifiSearchParams = {} as WifiSearchParams;
        searchParams = angular.copy(self.searchParams);
        // 设置查询设备id
        if(self.searchParams.ArObjectID.length === 0) {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Wifi.value === value.ObjectType) {
                    deviceIds.push(value.ObjectID);
                }
            });
            searchParams.ArObjectID = deviceIds;
        }
        self.getServerMessage(searchParams);
    }

    /**
     *
     * @description 切换页数
     * @param {number} num
     * @returns {PageParams}
     */
    public changePage(num: number) {
        let self = this;
        self.searchParams.currentPage = num;
        self.searchParams.taskId = self.wifiResult.taskId;
        self.searchParams.isFirstSearch = false;
        self.wifiResult.pageParams.currentPage = num;
        self.queryStatus = 2;
        self.getServerMessage(self.searchParams);

        return self.wifiResult.pageParams;
    };

    /**
     * @description获取数据
     * @param {WifiSearchParams} searchParams
     */
    private getServerMessage(searchParams: WifiSearchParams) {
        let self = this;

        // 设置最新时间
        if (self.selectTimeAcitve !== 4) {
            let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            searchParams.startTime = time.startTime;
            searchParams.endTime = time.endTime;
        }
        self.resourceRetrievalService.advancedSearchByWifi(searchParams).then((res: any) => {
            if ((res.code === 200)&&(typeof res.data.WiFi !== 'undefined') && (res.data.WiFi.TotalCount > 0)) {
                self.disposeCommonData(res.data.WiFi);
            } else {
                self.wifiResult.pageParams.totalCount = 0;
                self.wifiResult.pageParams.pageCount = 0;
                self.wifiResult.data = [];
                self.wifiResult.taskId = null;
                self.queryStatus = 3;
            }
        });
    }

    /**
     * @description处理查询数据
     * @param data
     */
    private disposeCommonData(data: any) {
        let self = this;
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Wifi.value;
        _.forEach(data.Result,function (value) {
            params.deviceIds.push(value.wifiLog.MacDeviceId);
            params.ids.push(value.wifiLog.ID);
        });
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(data.Result,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.wifiResult.pageParams.totalCount = data.TotalCount;
                self.wifiResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.wifiResult.pageParams.pageSize);
                self.wifiResult.data = data.Result;
                self.wifiResult.taskId = data.TaskId;
            }).then(() => {
                self.queryStatus = 3;
            });
        });
    }

    /**
     * 显示详情弹框
     * @param {wifi} item
     */
    public detailPopup(rank: number, allList: Array<wifi>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<wifi>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: wifi) => {
            self.clickCollect(item);
        };
        scope.analysisFunction = (item: wifi) => {
            self.clickAnalysis(item);
        };
        scope.surveillanceFunction = (item: wifi) => {
            self.clickSurveillance(item);
        };
        scope.closePopup = () => {
            self.layer.close(self.layerIndex);
        };
        self.layerIndex = self.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['575px', '220px'],
            content: wifiPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     *
     * @description 选择时间段
     * @param {multipleChoice} item
     */
    public selectTime(item: multipleChoice) {
        let self = this;
        let time: any;

        // 时段
        if (item.val === 1) {
            time = self.attributeFactory.getCrossTrainTime(1);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        } else if (item.val === 2) {
            time = self.attributeFactory.getCrossTrainTime(2);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        } else if ((item.val === 3) || (item.val === "all")) {
            time = self.attributeFactory.getCrossTrainTime(3);
            self.searchParams.startTime = time.startTime;
            self.searchParams.endTime = time.endTime;
        }

        self.selectTimeAcitve = item.val;
        self.crossTrainTimeList.forEach(function (value, index, array) {
            if (value.val === item.val) {
                value.status = true;
            } else {
                value.status = false;
            }
        });
    };

    /**
     *
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: wifi) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.wifiLog.ID,
                objectType: CollectDataType.WiFi.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.wifiLog.ID
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
     *
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: wifi) {
    }

    /**
     *
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: wifi) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    public selectWifi() {
        let self = this;
        let scope: { selectWifiList: Array<string>, $destroy: Function, selectCtrlCb: string } = self.$scope.$new();
        scope.selectWifiList = self.searchParams.ArObjectID;
        scope.selectCtrlCb = self.selectDeviceCb;
        self.currentLayerIndex = self.layer.open({
            type: 1,
            content: wifiTreePopupHtml,
            scope: scope,
            title: "Wi-Fi选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    public selectDevice(type: string) {
        this.$scope.$emit("search-device-type", type);
        this.$scope.$emit("search-pattern", "advanced");
    }
}

app.controller('WifiSearchPageController', WifiSearchPageController);