/// <amd-dependency path="text!./tplCollectDetail.html" name="collectDetailHtml" />
/// <amd-dependency path="text!./tplAlarmDetail.html" name="alarmDetailHtml" />
/// <amd-dependency path="text!../../detailPopup/wifiPopup/wifiPopup.html" name="wifiPopupHtml" />
import { app } from "../../common/app/main.app";
import 'css!./style/tplCollectList.css';
// import 'css!./style/tplAlarmList.css';

// 弹框
import '../../detailPopup/wifiPopup/wifiPopup.controller';

// 服务
// 参数
import './alarmDetail.controller';
import './collectDetail.controller';
import PageParams from "../../common/directive/page/page-params";
// 请求地址
import '../../common/services/resourceRetrieval.service';
import { IResourceRetrievalService } from '../../common/services/resourceRetrieval.service';
// 检索参数
import { WifiSearchParams } from '../../resourceRetrieval/search/advancedSearch/adVanceSearchEnum';
// 公共方法 时间格式化
import { AttributeFactory } from "../../common/factory/attribute.factory";
// 用户名
import "../../common/factory/userinfo.cache.factory";
import { IUserInfoCacheFactory } from "../../common/factory/userinfo.cache.factory";
// 提示框
import { ILayerDec } from "../../common/factory/layerMsg.factory";
// wifi历史检索数据
import {
    wifi,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
import { AlarmResultInfo, PersonAlarmParams, PersonAlarmResult } from "../../../core/entity/PersonAlarmEnum";
import "../../common/services/analysis.service";
import { IAnalysisService } from "../../common/services/analysis.service";
import { PageParamsAndResult, Pagination, IPagination } from '../../common/Pagination';
import {CollectDataType} from "../../../core/server/enum/CollectDataType";
import {ObjectType} from '../../../core/enum/ObjectType';
import * as _ from "lodash";

declare let $: any, collectDetailHtml: any, alarmDetailHtml: any, angular: any, wifiPopupHtml: any;

class CollectListController {
    static $inject = ['$scope', '$timeout', 'layer', 'resourceRetrievalService', 'userInfoCacheFactory', 'layerDec','analysisService'];
    ShowAlarmStatus: boolean = false;
    startTime: string;
    endTime: string;
    renderDataList: Array<any> = [];
    pageParams:any;
    index:any;
    dataListTotal:number;
    searchParams: WifiSearchParams = {
        currentPage:1,
        keyWord:'',
        orderBy: {
            isAsc: false,
        },
        pageSize: 10,
        isFirstSearch: true,
        taskId: '',
        startTime: '',
        endTime: '',
        ArObjectID:[],
        userId:''
    };// 查询参数
    name:string = '';
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    showStatus:boolean =true;
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    alarmdataListTotal:number = 0;
    MockWifiAlarmList: any;
    isSearchAlarmParams: boolean = true;
    layerIndex:number;

    constructor(
        private $scope:any,
        private $timeout: Function,
        private layer:any,
        private resourceRetrievalService: IResourceRetrievalService,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private layerDec: ILayerDec,
        private analysisService: IAnalysisService) {
        this.showStatus = this.$scope.status;
        this.name=this.$scope.name;
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(3);
        this.startTime = time.startTime;
        this.endTime = time.endTime;
        //初始化默认请求数据
        this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.ArObjectID.push(this.$scope.ID);
        // this.searchParams.ArObjectID = ['30893180331511750947'];
        this.getServerMessage(this.searchParams);
        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
        // this.PersonAlarmParams.arrCameraId = ['00071605121518288356'];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'WiFi';
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }
    /**
     * @description 导航切换
     * @param {boolean} flag 
     */
    showCameraStatus(flag: boolean) {
        this.showStatus = flag;
    }
    /**
     * @description 初始化分页器
     * type = 1;抓拍记录分页
     * type = 2;报警记录分页
     */
    private initPagagion(type:number) {
        if(type==1){
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.dataListTotal;
            this.pageParams = pageParams;
        }
        if(type==2){
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.alarmdataListTotal;
            this.resultParams = pageParams;
        }
    }

    public changeTime(){
        // 时间检测
        let starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(),
            endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
        // 时间输入错误终止检索
        if (starttime > endtime) {
            this.layerDec.warnInfo("开始时间不能大于结束时间！");
            return
        }

        this.searchParams.isFirstSearch = true;
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.currentPage = 1;
        this.getServerMessage(this.searchParams);

        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.isSearchAlarmParams = true;
        this.PersonAlarmParams.currentPage = 1;
        this.getServerAlarmMessage(this.PersonAlarmParams);

    }

    /**
     * @description 请求Wi-Fi历史数据
     * @param {WifiSearchParams} WifiSearchParams 请求参数
     */
    public getServerMessage(searchParams: WifiSearchParams) {
        let self = this;
        this.resourceRetrievalService.advancedSearchByWifi(searchParams).then((res: any) => {
            if (res.code === 200) {
                if((typeof res.data.WiFi !== 'undefined') && (res.data.WiFi.TotalCount > 0)) {
                    let params:any = {
                        deviceIds: [],
                        deviceType: '',
                        ids: [],
                        userId: self.userInfoCacheFactory.getCurrentUserId()
                    };
                    params.deviceType = ObjectType.Wifi.value;
                    _.forEach(res.data.WiFi.Result,function (value) {
                        params.deviceIds.push(value.wifiLog.MacDeviceId);
                        params.ids.push(value.wifiLog.ID);
                    });
                    if (params.deviceIds.length === 0) {
                        params.deviceIds.push("000001");
                    }
                    if (params.ids.length === 0) {
                        params.ids.push("000001");
                    }
                    self.resourceRetrievalService.getDeviceInfoPromise(params).then((res1:any)=>{
                        _.forEach(res.data.WiFi.Result,function (item, index) {
                            item.deviceInfo = res1.data.deviceInfo[index];
                            item.collectStatus = res1.data.collectStatus[index];
                        });
                        self.$timeout(() => {
                            self.dataListTotal = res.data.WiFi.TotalCount;
                            if (self.searchParams.isFirstSearch) {
                                self.initPagagion(1);
                            }
                            self.searchParams.isFirstSearch = false;
                            self.searchParams.taskId = res.data.WiFi.TaskId;
                            self.renderDataList = res.data.WiFi.Result
                        });
                    });
                }else {
                    self.layerDec.info('没有查询到Wi-Fi历史数据');
                }
            }else {
                self.layerDec.warnInfo('查询Wi-Fi历史数据失败！');
            }
        });
    }
    /**
     * @description请求电围历史报警数据
     * @param {PersonAlarmParams} PersonAlarmParams 请求参数
     */
    public getServerAlarmMessage(searchParams: PersonAlarmParams) {
        let self = this;
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res: any) => {
            if (res.code === 200) {
                self.alarmdataListTotal = res.data.TotalCount;
                if (self.isSearchAlarmParams) {
                    self.initPagagion(2);
                }
                self.isSearchAlarmParams = false;
                self.MockWifiAlarmList = res.data.Result;
            }
        });
    }
    public changePage(num: number) {
        if(this.showStatus){
            this.pageParams.currentPage = num;
            // 分页数据
            this.searchParams.currentPage = num;
            this.getServerMessage(this.searchParams);
            return this.pageParams;
        } else {
            this.resultParams.currentPage = num;
            this.PersonAlarmParams.currentPage = num;
            this.getServerAlarmMessage(this.PersonAlarmParams);
            return this.resultParams
        }
    };

    public closePopup(){
        // this.layer.close(this.$scope.index);
    }

    // 显示报警详情
    public lookCollectDetailAlarm(actIndex: number) {
        let scope: { layer: any; index: string, $destroy: Function, activeIndex: number, dataList: Array<any>, name: string } = this.$scope.$new();
        // 当前点击的索引
        scope.activeIndex = actIndex;
        scope.dataList = this.MockWifiAlarmList;
        scope.name = this.name;

        scope.index = "alarmDetailHtml";

        if (this.index) {
            this.layer.close(this.index);
        }
        this.index = this.layer.open({
            content: alarmDetailHtml,
            type: 1,
            skin: 'no-scroll',
            title: ['Wi-Fi报警详情', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['500px', '260px'],
            shade: 0,
            offset: ['200px', '700px'],
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     *
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: wifi) {
        if (event) {
            event.stopPropagation();
        }
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
    public clickAnalysis(event: any, item: wifi) {
        if (event) {
            event.stopPropagation();
        }
    }

    /**
     *
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: wifi) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    /**
     * 显示详情弹框
     * @param {wifi} item
     */
    public detailPopup(event: any, item: wifi) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<wifi>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function, showFooter: boolean } = self.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.collectFunction = (item: wifi) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: wifi) => {
            self.clickAnalysis(null, item);
        };
        scope.surveillanceFunction = (item: wifi) => {
            self.clickSurveillance(null, item);
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
}

app.controller('collectListController', CollectListController);