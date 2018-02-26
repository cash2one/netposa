/// <amd-dependency path="text!../../detailPopup/carPopup/carPopup.html" name="carPopupHtml" />
/// <amd-dependency path="text!../../fullPlayPopup/fullPlayPopup.html" name="fullPlayPopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!./style/cameraMapPoint.css';

// 弹框
import '../../detailPopup/carPopup/carPopup.controller';
import '../../fullPlayPopup/fullPlayPopup.controller';

// 服务
import "./camera.paging";
import {ICameraPagingService, PageParams} from "./camera.paging";
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import '../../common/factory/layerMsg.factory';
import {ILayerDec} from "../../common/factory/layerMsg.factory";

// 参数
import { CollectDataType } from "../../../core/server/enum/CollectDataType";
import {AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import {ObjectType} from '../../../core/enum/ObjectType';
import "../../../core/server/AlarmModule";
import {SearchVehicleModel} from '../../../core/params/SearchVehicleParams';
import {ResponseResult, PageResult} from '../../../core/params/result/ResponseResult';
import {PVDVehicleListModel} from '../../../core/server/PVDVehicleListModel';
import {AttributeFactory} from "../../common/factory/attribute.factory";
import {PVDictType} from '../../../core/server/enum/PVDictType';
import {MockAlarmList4} from "./TestEnum";
import {AlarmResultInfo, PersonAlarmParams, PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
import {car, CollectAddParams, CollectDeleteParams} from '../../resourceRetrieval/resourceRetrievalEnum';
import * as _ from "lodash";

declare let require: any;
let Promise = require("es6-promise");

declare let $: any, carPopupHtml: any, fullPlayPopupHtml: any, angular: any;

class cameraCarPointHistoryAll {
    static $inject = ['$scope', '$timeout', 'cameraPagingService', 'userInfoCacheFactory', 'resourceRetrievalService', 'layerDec', 'layer', 'analysisService'];
    //报警、抓拍切换
    historyIsShowAlarm: boolean = false;
    showStatus: boolean = true;
    //摄像头数据
    SubcribeAccessList: Array<any>;
    SubcribeAlarmList: Array<any>;

    //分页条件
    resultParams: PageParams = new PageParams();
    resultAlarmParams: PageParams = new PageParams();
    isResultParams: boolean = true;
    isResultAlarmParams: boolean = true;
    //历史查询条件
    searchParams: SearchVehicleModel = {} as SearchVehicleModel;
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    // 日期插件 时间
    startTime: string;
    endTime: string;

    dataListTotal: number = 0;
    alarmdataListTotal: number = 0;
    // 车辆信息
    carTypeList: Array<{ value: string, text: string }> = [];
    licencePlateOther: { value: string, text: string };
    carColorOther: { value: string, text: string };
    licencePlateList: Array<{ value: string, text: string }> = [];
    vehicleBrandList: Array<{ value: string, text: string }> = [];
    allVehicleSubBrandList: Array<{ value: string, text: string }> = [];
    currentVehicleSubBrandList: Array<{ value: string, text: string }> = [];
    carColorList: Array<{ value: string, text: string }> = [];
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;

    layerIndex: string = '';

    constructor(private $scope: any,
                private $timeout: any,
                private cameraPagingService: ICameraPagingService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private resourceRetrievalService: IResourceRetrievalService,
                private layerDec: ILayerDec,
                private layer: any,
                private analysisService: IAnalysisService,) {
        this.showStatus = $scope.showStatus;
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(1);

        this.startTime = time.startTime;
        this.endTime = time.endTime;
        //初始化默认请求数据
        // this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.arrObjectID = [this.$scope.ID];
        // this.searchParams.arrObjectID =['727'];
        this.searchParams.currentPage = 1;
        this.searchParams.pageSize = 10;
        // 请求数据
        this.search2Server();
        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
        // this.PersonAlarmParams.arrCameraId = ['727'];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'Car';
        this.getServerAlarmMessage(this.PersonAlarmParams);
        // 监听销毁事件
        $scope.$on('$destroy', () => {
            $scope.$emit('closeiframe')
        })
    }

    /**
     * @description 初始化参数
     */
    private getTypes() {
        // 获取车辆类型
        // 车牌颜色
        // 车辆颜色
        // 车辆品牌
        // 车辆子品牌
        let arr = [
            this.resourceRetrievalService.getPVDType(PVDictType.VehicleType.value),
            this.resourceRetrievalService.getPVDType(PVDictType.PlateColor.value),
            this.resourceRetrievalService.getPVDType(PVDictType.VehicleColor.value),
            this.resourceRetrievalService.getPVDType(PVDictType.VehicleBrand.value),
            this.resourceRetrievalService.getPVDType(PVDictType.VehicleSubBrand.value)
        ];
        return Promise.all(arr).then((res: [{ [key: string]: string },
            { [key: string]: string },
            { [key: string]: string },
            { [key: string]: string },
            { [key: string]: string }]) => {
            this.carTypeList = this.getEnumArr(res[0]);
            this.licencePlateList = this.getEnumArr(res[1]);
            this.carColorList = this.getEnumArr(res[2]);
            this.vehicleBrandList = this.getEnumArr(res[3]);
            this.allVehicleSubBrandList = this.getEnumArr(res[4]);

            // 车牌颜色列表, 需要手动修改
            this.licencePlateOther = this.licencePlateList.splice(4, 1)[0];
            this.carColorOther = this.carColorList.pop();
            // this.licencePlateList.unshift({});
        });
    }

    /**
     * @description 向后台查询历史记录（抓拍）
     */
    private search2Server() {
        // 防止异步引起的变化, 故将是否为有图检索的标志变量放在外部
        let self = this;
        this.resourceRetrievalService.advancedSearchByCarEx(this.searchParams).then((res: any) => {
            if (res.code === 200) {
                if((typeof res.data !== 'undefined') && (res.data.Vehicle.TotalCount > 0)) {
                    let params:any = {
                        deviceIds: [],
                        deviceType: '',
                        ids: [],
                        userId: self.userInfoCacheFactory.getCurrentUserId()
                    };
                    params.deviceType = ObjectType.RmpGate.value;
                    _.forEach(res.data.Vehicle.Result,function (value) {
                        params.deviceIds.push(value.deviceId);
                        params.ids.push(value.id);
                    });
                    if (params.deviceIds.length === 0) {
                        params.deviceIds.push("000001");
                    }
                    if (params.ids.length === 0) {
                        params.ids.push("000001");
                    }
                    self.resourceRetrievalService.getDeviceInfoPromise(params).then((res1:any)=>{
                        _.forEach(res.data.Vehicle.Result,function (item, index) {
                            item.deviceInfo = res1.data.deviceInfo[index];
                            item.collectStatus = res1.data.collectStatus[index];
                        });
                        self.$timeout(() => {
                            self.SubcribeAccessList = res.data.Vehicle.Result;
                            self.dataListTotal = res.data.Vehicle.TotalCount;
                            if (self.isResultParams) {
                                self.initPagagion(1);
                            }
                            self.isResultParams = false;
                        });
                    });
                }else {
                    self.SubcribeAccessList = [];
                    self.dataListTotal = 0;
                    self.layerDec.info("没有检索到数据");
                }
            } else {
                self.layerDec.warnInfo("查询失败！");
            }
        });
    }

    private getEnumArr(maps: { [key: string]: string }) {
        let result = [], k;
        for (k in maps) {
            result.push({
                value: k,
                text: maps[k]
            });
        }
        return result;
    }

    /**
     * @description请求历史报警数据
     * @param {PersonAlarmParams} PersonAlarmParams 请求参数
     */
    public getServerAlarmMessage(searchParams: PersonAlarmParams) {
        let self = this;
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res: any) => {
            if (res.code === 200) {
                self.alarmdataListTotal = res.data.TotalCount;
                if (self.isResultAlarmParams) {
                    self.initPagagion(2);
                }
                self.isResultAlarmParams = false;
                self.SubcribeAlarmList = res.data.Result;
            }
        });
    }

    /**
     * @description初始化分页器
     * @param {number} type
     * type = 1;抓拍记录分页
     * type = 2;报警记录分页
     */
    private initPagagion(type: number) {
        if (type == 1) {
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.dataListTotal;
            this.resultParams = pageParams;
        }
        if (type == 2) {
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.alarmdataListTotal;
            this.resultAlarmParams = pageParams;
        }
    }

    /**
     * @description 导航切换
     * @param {boolean} flag
     */
    showCameraStatus(flag: boolean) {
        this.showStatus = flag;
    }

    /**
     * @description 分页器
     * @param {number} i 当前页面
     */
    changePage(i: number) {
        if (this.showStatus) {
            this.resultAlarmParams.currentPage = i;
            this.PersonAlarmParams.currentPage = i;
            this.getServerAlarmMessage(this.PersonAlarmParams);
            return this.resultAlarmParams;
        } else {
            this.resultParams.currentPage = i;
            this.searchParams.currentPage = i;
            this.search2Server();
            return this.resultParams;
        }
    }

    /**
     * @description 时间改变
     */
    changeTime() {
        // 时间检测
        let starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(),
            endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
        // 时间输入错误终止检索
        if (starttime > endtime) {
            this.layerDec.warnInfo("开始时间不能大于结束时间！");
            return
        }
        this.isResultParams = true;
        this.searchParams.startTime = this.startTime;
        this.searchParams.currentPage = 1;
        this.searchParams.endTime = this.endTime;
        this.search2Server();
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.currentPage = 1;
        this.isResultAlarmParams = true;
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    /**
     * @description 收藏
     * @param item
     */
    clickCollect(event: any, item: car) {
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
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: car) {
        if (event) {
            event.stopPropagation();
        }
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
        window.open(AnalysisGoToType.More.data);
    }

    /**
     * @description 显示详情弹框
     * @param event
     * @param {electronic} item
     */
    public detailPopup(event: any, item: car) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<car>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function, showFooter: boolean } = self.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
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
            self.layer.close(self.layerIndex);
        };
        self.layerIndex = self.layer.open({
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

    // 查看视频
    public fullPlay(item: any) {
        let scope: { layer: any; index: string, $destroy: Function, PointDeTail: any } = this.$scope.$new();
        scope.index = "fullPlayPopup";
        scope.PointDeTail = this.$scope.cameraInfo;
        scope.PointDeTail.type = 2;
        scope.PointDeTail.time = item.AlarmLog.JsonUserData.detail.passTime;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['680px', '433px'],
            content: fullPlayPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

}

app.controller('cameraCarPointHistoryAll', cameraCarPointHistoryAll);