/// <amd-dependency path="text!../../../../detailPopup/carPopup/carPopup.html" name="carPopupHtml" />
/// <amd-dependency path="text!../../../../selectPopup/treeBayonet/Tree.bayonet.popup.html" name="bayonetTreePopupHtml" />
import { app } from '../../../../common/app/main.app';

// 弹框
import '../../../../selectPopup/treeBayonet/Tree.bayonet.popup';

// 服务
import '../../../../common/services/resourceRetrieval.service';
import { IResourceRetrievalService } from '../../../../common/services/resourceRetrieval.service';
import '../../../../common/factory/layerMsg.factory';
import { ILayerDec } from '../../../../common/factory/layerMsg.factory';
import "../../../../common/factory/socket.factory";
import { ISocketFactory } from "../../../../common/factory/socket.factory";
import "../../../../common/services/uploadImage.service";
import { IUploadImageService } from "../../../../common/services/uploadImage.service";
import "../../../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../../../common/factory/userinfo.cache.factory";

// 高级检索参数
import {
    multipleChoice,
    LicencePlateList,
    CarColorList,
    CrossTrainTimeList
} from '../adVanceSearchEnum';

// 参数
import { CollectAddParams, CollectDeleteParams } from "../../../../../core/enum/QueryParams";
import PageParams from '../../../../common/directive/page/page-params';

// 高级检索参数
import { car, carItem, initCarResult, QueryItem, VehicleQueryItem } from '../../../resourceRetrievalEnum';
import '../../../../common/factory/datas.cache.page.factory';
import { DatasCachePageFactory, PageModel } from '../../../../common/factory/datas.cache.page.factory';
import '../../../../common/factory/dataSelect.factory';
import {
    DateSelectEnum,
    dataSelectServer,
    dataSelectResult,
    moduleString
} from '../../../../common/factory/dataSelect.factory';
import "../../../../common/factory/attribute.factory";
import { AttributeFactory } from "../../../../common/factory/attribute.factory";
import { PVDictType } from '../../../../../core/server/enum/PVDictType';
import { SearchVehicleModel } from '../../../../../core/params/SearchVehicleParams';
import { PVDVehicleListModel } from '../../../../../core/server/PVDVehicleListModel';
import { SocketResultTypeEnum } from '../../../../../core/server/enum/SocketResultTypeEnum';
import { ObjectType } from '../../../../../core/enum/ObjectType';
import { CollectDataType } from "../../../../../core/server/enum/CollectDataType";
import {AnalysisGoToType} from "../../../../../core/server/enum/AnalysisDataType";
import {ResourceTypeEnum} from "../../../../../core/server/enum/ResourceType";
import { SystemPoint } from "../../../../../core/entity/SystemPoint";
import { ResponseResult, PageResult } from '../../../../../core/params/result/ResponseResult';
import { CheckCarResultModel } from '../../../../../core/server/CheckCarResultModel';
import { VehicleSubBrandModel } from '../../../../../core/server/VehicleSubBrandModel';
import { AngularScope } from '../../../../common/types/baseAngularScope';
import * as _ from "lodash";

declare let angular: any, carPopupHtml: any, bayonetTreePopupHtml: string;

class CarSearchPageController {
    $inject: Array<string> = ['$scope', '$timeout', 'layer', '$q', 'resourceRetrievalService', 'dataSelectServer', 'layerDec', 'datasCachePageFactory', 'socketFactory', 'ResourceSearchMapController', 'uploadImageService', "userInfoCacheFactory"];

    minSacle: number = 1;
    maxSacle: number = 100; //  相似度最大值
    selectTimeAcitve: number = 3;//时间段参数
    showMore: boolean = false;//显示更多 true:隐藏 false:显示
    carImgList: Array<QueryItem> = [];//上传图片
    searchParams: SearchVehicleModel = {} as SearchVehicleModel;// 查询参数
    crossTrainTimeList: Array<multipleChoice>;//  时间段
    licencePlateList: Array<multipleChoice>;// 车牌颜色
    carColorList: Array<multipleChoice>;// 车辆颜色
    carTypeList: Array<multipleChoice> = [];
    vehicleBrandList: Array<multipleChoice> = [];
    currentVehicleSubBrandList: Array<multipleChoice> = [];
    carResult: carItem = initCarResult(0); // 查询结果
    socketData: any;

    allVehicleSubBrandList: Array<multipleChoice> = [];
    licencePlateOther: { value: string, text: string };
    carColorOther: { value: string, text: string };
    // 车牌颜色
    // 车辆颜色
    selectCrossTrainTime: string;
    startTime: string;
    endTime: string;
    currentLayerIndex: number;
    pageParams: PageParams = new PageParams();
    private socketCacheModel: PageModel<PVDVehicleListModel>;

    attributeFactory: AttributeFactory = new AttributeFactory();
    queryStatus: number = 1; // 查询状态  1: 初始状态 2：查询中  3：查询结束
    selectDeviceCb: string = "close.bayonet.popup";
    analysisGoTo: any = AnalysisGoToType;

    constructor(private $scope: any,
        private $timeout: any,
        private layer: any,
        private $q: any,
        private resourceRetrievalService: IResourceRetrievalService,
        private dataSelectServer: dataSelectServer,
        private layerDec: ILayerDec,
        private datasCachePageFactory: DatasCachePageFactory,
        private socketFactory: ISocketFactory,
        private uploadImageService: IUploadImageService,
        private userInfoCacheFactory: IUserInfoCacheFactory) {
        let self = this;

        self.initParams();

        self.initPvdInfo();

        // 监听广播事件--导航切换--重置数据
        self.$scope.$on("advancedSearch-change", function (event: any, data: any) {
            if ((data === "person") || (data === "all")) {
                self.initParams();
            }
        });

        self.$scope.$on("search-device-id", (event: any, data: any, dataType: string) => {
            if (dataType === ObjectType.RmpGate.value) {
                let arrCameraId: Array<string> = angular.copy(self.searchParams.arrObjectID);
                arrCameraId = _.concat(data, arrCameraId);
                arrCameraId = _.uniq(arrCameraId);
                self.searchParams.arrObjectID = arrCameraId;
            }
        });

        // 监听设备选择树
        self.$scope.$on(self.selectDeviceCb, (event: any, cameraIds: Array<string>, status:boolean) => {
            if (status) {
                if (Array.isArray(cameraIds)) {
                    self.$timeout(() => {
                        self.searchParams.arrObjectID = cameraIds;
                    });
                }
            }
            self.layer.close(self.currentLayerIndex);
        });

        self.$scope.$on("$destroy", () => {
            self.layer.close(self.currentLayerIndex);
            self.unbindSocket();
        });
    }

    private initParams() {
        let self = this;
        let searchParams: SearchVehicleModel = {} as SearchVehicleModel;

        // 初始化图片上传列表
        self.carImgList = [
            {
                id: 0,
                value: "",
                key: ""
            }, {
                id: 1,
                value: "",
                key: ""
            }, {
                id: 2,
                value: "",
                key: ""
            }, {
                id: 3,
                value: "",
                key: ""
            }, {
                id: 4,
                value: "",
                key: ""
            }
        ];
        // 设置筛选数据
        self.crossTrainTimeList = CrossTrainTimeList();//  时间段
        self.licencePlateList = LicencePlateList();// 车牌颜色
        self.carColorList = CarColorList();// 车辆颜色
        self.selectTimeAcitve = 3;
        self.queryStatus = 1;
        // 重置查询结果
        self.carResult.pageParams.pageSize = 40;
        self.carResult.pageParams.currentPage = 1;
        self.carResult.pageParams.totalCount = 0;
        self.carResult.pageParams.pageCount = 0;
        self.carResult.data = [];

        // 设置默认查询时段
        let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
        // 设置查询参数
        self.searchParams = {
            plateNumber: "",
            imagePath: "",
            redisId: "",
            startTime: time.startTime,
            endTime: time.endTime,
            vehicleBodyThreshold: 75,
            characterThreshold: 75,
            vehicleTypesStr: "",
            currentPage: self.carResult.pageParams.currentPage,
            pageSize: self.carResult.pageParams.pageSize,
            arrObjectID: [],
            areaId: [],
            vehicleColor: "",
            plateColor: ""
        };

        self.$timeout(() => {
            self.socketData = [];
        });
    }

    private initPvdInfo() {
        let self = this;
        self.resourceRetrievalService.getPVDType(PVDictType.VehicleType.value).then((res: any) => {
            if (res.code === 200) {
                let list: Array<any> = [];
                _.mapKeys(res.data, function (value, key) {
                    list.push({ status: false, name: value, val: key });
                });
                self.carTypeList = list;
            } else {
                self.layerDec.warnInfo("查询车辆类型失败");
            }
        });
        self.resourceRetrievalService.getPVDType(PVDictType.VehicleBrand.value).then((res: any) => {
            if (res.code === 200) {
                let list = [];
                _.mapKeys(res.data, function (value, key) {
                    list.push({ status: false, name: value, val: key });
                });
                self.vehicleBrandList = list;
            } else {
                self.layerDec.warnInfo("查询车辆品牌失败");
            }
        });
    }

    /**
     * @description 选择车牌颜色
     * @param {multipleChoice} item
     */
    selectLicencePlateList(item: multipleChoice) {
        let self = this;
        self.licencePlateList.forEach(function (value, index, array) {
            if (value.name === item.name) {
                value.status = true;
                self.searchParams.vehicleColor = value.val;
            } else {
                value.status = false;
            }
        });
    }

    /**
     * @description 选择车辆颜色
     * @param {multipleChoice} item
     */
    selectCarColorList(item: multipleChoice) {
        let self = this;
        self.carColorList.forEach(function (value, index, array) {
            if (value.name === item.name) {
                value.status = true;
                self.searchParams.vehicleColor = value.val;
            } else {
                value.status = false;
            }
        });
    }

    /**
     * @description 过车时段
     * @param {multipleChoice} item
     */
    selectTime(item: multipleChoice) {
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

    changeCarTypeSelect(select: multipleChoice) {
        if (!select) {
            this.searchParams.vehicleTypesStr = null;
        } else {
            this.searchParams.vehicleTypesStr = select.val;
        }
    }

    changeVehicleBrandTypeSelect(item: multipleChoice) {
        let self = this;

        if (!item) {
            this.searchParams.vehicleBrand = null;
            this.searchParams.vehicleSubBrand = null;
            self.currentVehicleSubBrandList = [];
            return;
        }
        self.searchParams.vehicleBrand = item.val;
        self.resourceRetrievalService.getSubGrand(item.val).then((res: any) => {
            if (res.code === 200) {
                let list = [];
                res.data.forEach(function (value, index, array) {
                    list.push({ status: false, name: value.value, val: value.key });
                });
                self.currentVehicleSubBrandList = list;
            } else {
                self.layerDec.warnInfo("查询车辆子品牌失败");
            }
        });
    }

    changeVehicleSubBrand(select: multipleChoice) {
        if (!select) {
            this.searchParams.vehicleSubBrand = null;
        } else {
            this.searchParams.vehicleSubBrand = select.val;
        }
    }

    searchAdvancedSubmit() {
        let self = this;
        let searchParams: SearchVehicleModel = {} as SearchVehicleModel;
        let featureSearchExt: Array<any> = [];
        let fetureTaskParam: Array<any> = [];

        // 重置查询结果
        self.carResult.pageParams.pageSize = 40;
        self.carResult.pageParams.currentPage = 1;
        self.carResult.pageParams.totalCount = 0;
        self.carResult.pageParams.pageCount = 0;
        self.carResult.data = [];

        searchParams = angular.copy(self.searchParams);
        searchParams.currentPage = 1;
        searchParams.redisId = "";
        searchParams.imagePath = "";

        _.forEach(self.carImgList, function (value, key) {
            if (value.featureSearchExt) { // 拖拽
                searchParams.imagePath = "Car";
                featureSearchExt.push(value.featureSearchExt);
                // 临时
                searchParams.redisId = value.featureSearchExt.accessLogId;
                searchParams.imagePath = value.featureSearchExt.imgUrl;
            } else if (value.fetureTaskParam) {
                searchParams.imagePath = "Car";
                fetureTaskParam.push(value.fetureTaskParam);
                // 临时
                searchParams.redisId = value.fetureTaskParam.arrFetureTaskId;
                searchParams.imagePath = value.fetureTaskParam.imageUrl;
            }
        });
        searchParams.featureSearchExt = featureSearchExt;
        searchParams.fetureTaskParam = fetureTaskParam;
        if (searchParams.redisId !== "") {
            searchParams.plateNumber = "";
        } else if (searchParams.plateNumber === "") {
            self.layerDec.warnInfo("请先上传车辆图片或输入车牌号进行检索");
            return;
        }
        // 设置最新时间
        if (self.selectTimeAcitve !== 4) {
            let time = self.attributeFactory.getCrossTrainTime(self.selectTimeAcitve);
            searchParams.startTime = time.startTime;
            searchParams.endTime = time.endTime;
        }
        // // 设置查询设备id
        // if(self.searchParams.arrObjectID.length === 0) {
        //     let systemPointList: Array<SystemPoint> = self.$scope.$parent.$parent.$parent.$parent.$parent.systemPoint;
        //     console.log("=============systemPointList:", systemPointList);
        //     let deviceIds:Array<string> = [];
        //     _(systemPointList).forEach(function(value) {
        //         if (ObjectType.RmpGate.value === value.ObjectType) {
        //             deviceIds.push(value.ObjectID);
        //         }
        //     });
        //     searchParams.arrObjectID = deviceIds;
        // }
        self.getServerMessage(searchParams);
    }

    getServerMessage(searchParams: SearchVehicleModel) {
        let self = this;
        self.searchParams = angular.copy(searchParams);

        searchParams.startTime = searchParams.startTime.substring(0, 10);
        searchParams.endTime = searchParams.endTime.substring(0, 10);
        self.queryStatus = 2;
        self.unbindSocket();
        self.resourceRetrievalService.advancedSearchByCarEx(searchParams).then((res: any) => {
            // 查询结束
            if (res.code === 200) {
                if (searchParams.redisId !== "") {
                    self.carResult.pageParams.totalCount = 0;
                    self.carResult.pageParams.pageCount = 0;
                    self.carResult.data = [];
                    self.bindingSocket();
                } else {
                    if ((typeof res.data !== 'undefined') && (res.data.Vehicle.TotalCount > 0)) {
                        self.disposeCommonData(res.data.Vehicle);
                    } else {
                        self.carResult.pageParams.totalCount = 0;
                        self.carResult.pageParams.pageCount = 0;
                        self.carResult.data = [];
                        self.queryStatus = 3;
                    }
                }
            } else {
                self.queryStatus = 3;
                self.layerDec.warnInfo("查询失败");
            }
        });
    }

    /**
     * @description处理查询数据
     * @param resultData
     * @param data
     * @param {string} type
     */
    private disposeCommonData(data: any) {
        let self = this;
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.RmpGate.value;
        _.forEach(data.Result,function (value) {
            params.deviceIds.push(value.deviceId);
            params.ids.push(value.id);
        });
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(data.Result,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.carResult.pageParams.totalCount = data.TotalCount;
                self.carResult.pageParams.pageCount = Math.ceil(data.TotalCount / self.carResult.pageParams.pageSize);
                self.carResult.data = data.Result;
                self.carResult.taskId = data.TaskId;
            }).then(() => {
                self.queryStatus = 3;
            });
        });
    }

    /**
     * @description 切换页数
     * @param {number} num
     * @returns {PageParams}
     */
    public changePage(num: number) {
        let self = this;
        self.searchParams.currentPage = num;
        self.carResult.pageParams.currentPage = num;
        // 非图片查询
        if ((self.searchParams.fetureTaskParam.length > 0 )||(self.searchParams.featureSearchExt.length > 0 )) {
            self.dealSocketData();
        } else {
            self.getServerMessage(self.searchParams);
        }
        return self.carResult.pageParams;
    };

    // 设置socket请求参数
    public dealSocketData() {
        let self = this;
        let carResultData: Array<car> = [];
        let min = self.carResult.pageParams.pageSize * (self.carResult.pageParams.currentPage - 1);
        let max = self.carResult.pageParams.pageSize * self.carResult.pageParams.currentPage;
        let newData:any = {
            Result: [],
            TotalCount: self.socketData.TotalCount,
            TaskId: self.socketData.TaskId
        };
        for (let i = min; i < max && i < self.socketData.TotalCount; i++) {
            newData.Result.push(self.socketData.Result[i]);
        }
        self.disposeCommonData(newData);
    }

    private bindingSocket() {
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.CarSearch, (result: Array<any>) => {
            if (result[0].code === 200) {
                self.socketData = result[0].data.Vehicle;
                self.$timeout(() => {
                    self.dealSocketData();
                });

            } else {
                self.$timeout(() => {
                    self.queryStatus = 3;
                });
            }
            self.unbindSocket();
        });
    }

    private unbindSocket() {
        this.socketFactory.unSubscribe(SocketResultTypeEnum.CarSearch);
    }

    imgUploading(event: any, item: QueryItem, index: number) {
        let self = this;
        let from = new FormData();
        from.append('image', event.target.files[0]);
        this.uploadImageService.uploadImageForCar(from).then((res: any) => {
            if (res.code === 200) {
                let obj: QueryItem = {
                    id: 0,
                    value: res.data.imageUrl,
                    key: res.data.redisId,
                    fetureTaskParam: {
                        arrFetureTaskId: res.data.redisId,
                        imageUrl: res.data.imageUrl
                    }
                };
                self.$timeout(() => {
                    self.carImgList[index] = obj;
                });
            } else {
                self.layerDec.warnInfo('车辆上传失败');
            }
        });
    }

    imgCancel(index: number) {
        let self = this;
        let item: QueryItem = {
            id: 0,
            value: "",
            key: "",
            fetureTaskParam: null,
            featureSearchExt: null
        };
        self.carImgList[index] = item;
    }

    selectCamera() {
        let self = this;
        let scope: { selectBayonetList: Array<string>, $destroy: Function, selectCtrlCb: string } = self.$scope.$new();
        scope.selectBayonetList = self.searchParams.arrObjectID;
        scope.selectCtrlCb = self.selectDeviceCb;
        self.currentLayerIndex = self.layer.open({
            type: 1,
            content: bayonetTreePopupHtml,
            scope: scope,
            title: "卡口选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: car) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.id,
                objectType: CollectDataType.Car.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.id
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
    public clickAnalysis(event: any, item: car) {
        if (event) {
            event.stopPropagation();
        }
        localStorage.setItem("AnalysisType", "Car");
        window.open(this.analysisGoTo.More.data);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: car) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    public detailPopup(rank: number, allList: Array<car>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<car>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.collectFunction = (item: car) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: car) => {
            self.clickAnalysis(null, item);
        };
        scope.surveillanceFunction = (item: car) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(self.currentLayerIndex);
        };
        self.currentLayerIndex = self.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['670px', '420px'],
            content: carPopupHtml,
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
            let contentHTML = `<img ng-src=${path} style='width:800px;height:632px;'>`;
            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: ['800px', '632px'],
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

    public onDropComplete(dragData: any, evt: Event, index: number) {
        let self = this;
        let item: any = {
            id: 0,
            value: "",
            key: ""
        };
        item.featureSearchExt = {
            accessLogId: dragData.id,
            featureType: "AccessFeature",
            imgUrl: dragData.panoramaImage
        };
        item.value = dragData.panoramaImage;
        item.key = dragData.id;

        self.carImgList[index] = item;
    }

    public selectDevice(type: string) {
        this.$scope.$emit("search-device-type", type);
        this.$scope.$emit("search-pattern", "advanced");
    }
}

app.controller('CarSearchPageController', CarSearchPageController);