/// <amd-dependency path="text!../../../../detailPopup/efPopup/efPopup.html" name="efPopupHtml" />
/// <amd-dependency path="text!../../../../selectPopup/treeEfence/Tree.efence.popup.html" name="efenceTreePopupHtml" />
import {app} from '../../../../common/app/main.app';

// 弹框
import "../../../../selectPopup/treeEfence/Tree.efence.popup";

// 高级检索参数
import {ElectronicSearchParams, multipleChoice, CrossTrainTimeList} from '../adVanceSearchEnum';
import {
    electronic,
    electronicItem,
    initElectronicResult,
    CollectAddParams,
    CollectDeleteParams
} from '../../../resourceRetrievalEnum';

// 服务
import '../../../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../../../common/services/resourceRetrieval.service';
import "../../../../common/factory/deviceCache.factory";
import {IdeviceCaacheService} from "../../../../common/factory/deviceCache.factory";
import "../../../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../../../common/factory/userinfo.cache.factory";
import {ILayerDec} from "../../../../common/factory/layerMsg.factory";
import "../../../../common/factory/layerMsg.factory";

// 公用方法
import {AttributeFactory} from "../../../../common/factory/attribute.factory";
import {ObjectType} from '../../../../../core/enum/ObjectType';
import {SystemPoint} from "../../../../../core/entity/SystemPoint";
import {CollectDataType} from "../../../../../core/server/enum/CollectDataType";
import * as _ from "lodash";

declare let efPopupHtml: any, angular: any, efenceTreePopupHtml: any;

class EFSearchPageController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "deviceCacheServer", "userInfoCacheFactory", "layerDec"];

    maxSacle: number = 100; //  相似度最大值
    selectTimeAcitve: number = 3;//时间段参数
    showMore: boolean = false;//是否显示更多
    searchParams: ElectronicSearchParams;// 查询参数
    electronicResult: electronicItem = initElectronicResult(); // 查询结果
    crossTrainTimeList: Array<multipleChoice>;//  时间段
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    // 设备选择弹框
    currentLayerIndex: number;
    // 设备信息
    eleListInfo: any;
    layerIndex: any;
    queryStatus: number = 1; // 查询状态  1: 初始状态 2：查询中  3：查询结束
    selectDeviceCb: string = "close.efence.popup";

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
            if (dataType === ObjectType.ElectronicFence.value) {
                let arrCameraId: Array<string> =  angular.copy(self.searchParams.ArObjectID);
                arrCameraId =  _.concat(data, arrCameraId);
                arrCameraId = _.uniq(arrCameraId);
                self.searchParams.ArObjectID = arrCameraId;
            }
        });

        // 监听设备选择树
        self.$scope.$on(self.selectDeviceCb, (event: any, electronicFenceIds: Array<string>, status:boolean) => {
            if (status) {
                if (Array.isArray(electronicFenceIds)) {
                    self.$timeout(() => {
                        self.searchParams.ArObjectID = electronicFenceIds;
                    });
                }
            }
            self.layer.close(self.currentLayerIndex);
        });

        // 监听广播事件--导航切换--重置数据
        self.$scope.$on("advancedSearch-change", function (event: any, data: any) {
            if ((data === "electronicfence") || (data === "all")) {
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
        self.electronicResult.pageParams.pageSize = 32;
        self.searchParams = {
            currentPage: 1,
            pageSize: 32,
            keyWord: "",
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

        // controller 销毁清除弹框
        self.$scope.$on('$destroy', () => {
            this.layer.close()
        })

        // 初始化获取设备信息
        self.eleListInfo = self.deviceCacheServer.getAllEleList();
    }

    // 查询数据
    public searchAdvancedSubmit() {
        let self = this;
        if (self.searchParams.keyWord === "") {
            return self.layerDec.warnInfo('请输入关键词');
        }
        self.searchParams.currentPage = 1;
        self.searchParams.pageSize = self.electronicResult.pageParams.pageSize;
        self.searchParams.isFirstSearch = true;
        self.searchParams.taskId = "";
        self.electronicResult.pageParams.currentPage = 1;
        self.queryStatus = 2;

        let searchParams: ElectronicSearchParams = {} as ElectronicSearchParams;
        searchParams = angular.copy(self.searchParams);
        // 设置查询设备id
        if(self.searchParams.ArObjectID.length === 0) {
            let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
            let deviceIds:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.ElectronicFence.value === value.ObjectType) {
                    deviceIds.push(value.ObjectID);
                }
            });
            searchParams.ArObjectID = deviceIds;
        }

        self.getServerMessage(searchParams);
    }

    /**
     * @description 切换页数
     * @param {number} num
     * @returns {PageParams}
     */
    public changePage(num: number) {
        let self = this;
        self.searchParams.currentPage = num;
        self.searchParams.taskId = self.electronicResult.taskId;
        self.searchParams.isFirstSearch = false;
        self.electronicResult.pageParams.currentPage = num;
        self.queryStatus = 3;
        self.getServerMessage(self.searchParams);

        return self.electronicResult.pageParams;
    };

    /**
     * @description获取数据
     * @param {ElectronicSearchParams} searchParams
     */
    private getServerMessage(searchParams: ElectronicSearchParams) {
        let self = this;

        // 设置最新时间
        if (self.selectTimeAcitve !== 4) {
            let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            searchParams.startTime = time.startTime;
            searchParams.endTime = time.endTime;
        }
        self.resourceRetrievalService.advancedSearchByEFence(searchParams)
            .then((res: any) => {
                if ((res.code === 200) && (typeof res.data.EFENCE !== 'undefined') && (res.data.EFENCE.TotalCount > 0)) {
                    self.disposeCommonData(res.data.EFENCE);
                } else {
                    self.electronicResult.pageParams.totalCount = 0;
                    self.electronicResult.pageParams.pageCount = 0;
                    self.electronicResult.data = [];
                    self.electronicResult.taskId = '';
                    self.queryStatus = 3;
                }
            })
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
        params.deviceType = ObjectType.ElectronicFence.value;
        _.forEach(data.Result,function (value) {
            params.deviceIds.push(value.eFenceLog.MobileDeviceId);
            params.ids.push(value.eFenceLog.ID);
        });
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(data.Result,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.electronicResult.pageParams.totalCount = data.TotalCount;
                self.electronicResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.electronicResult.pageParams.pageSize);
                self.electronicResult.data = data.Result;
                self.electronicResult.taskId = data.TaskId;
            }).then(() => {
                self.queryStatus = 3;
            });
        });
    }

    /**
     * 显示详情弹框
     * @param {wifi} item
     */
    public detailPopup(rank: number, allList: Array<electronic>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<electronic>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: electronic) => {
            self.clickCollect(item);
        };
        scope.analysisFunction = (item: electronic) => {
            self.clickAnalysis(item);
        };
        scope.surveillanceFunction = (item: electronic) => {
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
            content: efPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
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
                self.selectTimeAcitve = value.val;
            } else {
                value.status = false;
            }
        });
    };

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: electronic) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.eFenceLog.ID,
                objectType: CollectDataType.EFENCE.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.eFenceLog.ID
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
    public clickAnalysis(item: electronic) {
    }

    /**
     * @description 布控与取消布控114.8064350, 31.3609228
     高级检索
     车辆
     人像
     Wi-Fi
     电围

     关键词：
     时段：全部近一天近一周近一月自定义
     资源选择：选择设备 搜索
     全选导出
     请输入检索条件检索

     * @param item
     */
    public clickSurveillance(item: electronic) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    public selectElectronicFence() {
        let self = this;
        let scope: { selectElectronicFenceList: Array<string>, $destroy: Function, selectCtrlCb: string } = self.$scope.$new();
        scope.selectElectronicFenceList = self.searchParams.ArObjectID;
        scope.selectCtrlCb = self.selectDeviceCb;
        self.currentLayerIndex = self.layer.open({
            type: 1,
            content: efenceTreePopupHtml,
            scope: scope,
            title: "电围选择",
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

app.controller('EFSearchPageController', EFSearchPageController);