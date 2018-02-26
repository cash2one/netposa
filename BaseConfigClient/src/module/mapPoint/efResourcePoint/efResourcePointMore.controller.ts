/// <amd-dependency path="text!./efResourceAlarmDetail.html" name="efResourceAlarmDetail" />
/// <amd-dependency path="text!../../detailPopup/efPopup/efPopup.html" name="efPopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!./style/efResourcePointMore.css';

// 弹框
import './efResourceAlarmDetail.controller';
import '../../detailPopup/efPopup/efPopup.controller';

// 参数
import PageParams from "../../common/directive/page/page-params";

// 请求地址
import '../../common/services/resourceRetrieval.service';
import { IResourceRetrievalService } from '../../common/services/resourceRetrieval.service';
// 检索参数
import { ElectronicSearchParams, MaskList } from '../../resourceRetrieval/search/advancedSearch/adVanceSearchEnum';
// 用户名
import "../../common/factory/userinfo.cache.factory";
import { IUserInfoCacheFactory } from "../../common/factory/userinfo.cache.factory";
// 公共方法 时间格式化
import { AttributeFactory } from "../../common/factory/attribute.factory";

// 电围历史检索数据
import {
    electronic,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
import { SearchAlarmParams } from "../../../core/params/SearchAlarmParams";
// 提示框
import {ILayerDec} from "../../common/factory/layerMsg.factory";
// // mock
// import { MockList1, MockList } from "./TestEnum";
import "../../common/services/analysis.service";
import { IAnalysisService } from "../../common/services/analysis.service";
import { AlarmResultInfo, PersonAlarmParams, PersonAlarmResult } from "../../../core/entity/PersonAlarmEnum";
import {CollectDataType} from "../../../core/server/enum/CollectDataType";
import {ObjectType} from '../../../core/enum/ObjectType';
import * as _ from "lodash";

declare let $: any, efResourceAlarmDetail: any, angular: any, efPopupHtml: any;

class EfResourcePointMoreController {
    static $inject = ['$scope', '$timeout', 'layer', 'resourceRetrievalService', 'userInfoCacheFactory', 'layerDec','analysisService'];
    ShowAlarmStatus: boolean = false;
    // 日期插件 时间
    startTime: string;
    endTime: string;
    // 模块状态
    switchStatus: boolean = true;
    // 分页参数
    pageParams: PageParams;
    pageParamsAlarm:PageParams;

    renderDataList: Array<any> = [];
    renderAlarmdataList: Array<any> = [];

    index:any;//mylayer 打开的index
    // 历史抓拍总数
    dataListTotal = 0; 
    // 报警总数
    alarmdataListTotal = 0;
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    name:string ='';

    searchParams: ElectronicSearchParams = {
        currentPage: 1,
        keyWord: '',
        orderBy: {
            isAsc: false,
        },
        pageSize: 10,
        taskId: '',
        startTime: '',
        endTime: '',
        ArObjectID: [],
        isFirstSearch:true,
        userId: '',
    }; // 查询参数
    isSearchAlarmParams:boolean = true;
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    layerIndex: number;

    constructor(private $scope: any,
                private $timeout: Function,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private layerDec: ILayerDec,
                private analysisService: IAnalysisService) {
        this.name = this.$scope.name;
        this.switchStatus = this.$scope.switchStatus;
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(0);
        this.startTime = time.startTime;
        this.endTime = time.endTime;
        //初始化默认请求数据
        this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.ArObjectID.push(this.$scope.ID);
        this.getServerMessage(this.searchParams);
        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
        this.PersonAlarmParams.pageSize=10;
        this.PersonAlarmParams.currentPage=1;
        this.PersonAlarmParams.alarmType = 'EFENCE';
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    /**
     * @description初始化分页器
     * @param {number} type 
     * type = 1;抓拍记录分页
     * type = 2;报警记录分页
     */
    private initPagagion(type:number){
        if(type == 1){
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.dataListTotal;
            this.pageParams = pageParams;
        }
        if(type == 2){
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.alarmdataListTotal;
            this.pageParamsAlarm = pageParams;
        }
    }

    /**
     * @description分页器，点击事件
     * @param {number} num
     */
    public changePage(num: number) {
        if(this.switchStatus){
            this.pageParams.currentPage = num;
            this.searchParams.currentPage = num;
            this.getServerMessage(this.searchParams);
            return this.pageParams;
        }
        if(!this.switchStatus){
            this.pageParamsAlarm.currentPage = num;
            this.PersonAlarmParams.currentPage = num;
            this.getServerAlarmMessage(this.PersonAlarmParams);
            return this.pageParamsAlarm;
        }
    };

    /**
     * @description请求电围历史数据
     * @param {ElectronicSearchParams} ElectronicSearchParams 请求参数
     */
    public getServerMessage(searchParams: ElectronicSearchParams) {
        let self = this;
        this.resourceRetrievalService.advancedSearchByEFence(searchParams).then((res: any) => {
            if (res.code === 200) {
                if((typeof res.data.EFENCE !== 'undefined') && (res.data.EFENCE.TotalCount > 0)) {
                    let params:any = {
                        deviceIds: [],
                        deviceType: '',
                        ids: [],
                        userId: self.userInfoCacheFactory.getCurrentUserId()
                    };
                    params.deviceType = ObjectType.ElectronicFence.value;
                    _.forEach(res.data.EFENCE.Result,function (value) {
                        params.deviceIds.push(value.eFenceLog.MobileDeviceId);
                        params.ids.push(value.eFenceLog.ID);
                    });
                    if (params.deviceIds.length === 0) {
                        params.deviceIds.push("000001");
                    }
                    if (params.ids.length === 0) {
                        params.ids.push("000001");
                    }
                    self.resourceRetrievalService.getDeviceInfoPromise(params).then((res1:any)=>{
                        _.forEach(res.data.EFENCE.Result,function (item, index) {
                            item.deviceInfo = res1.data.deviceInfo[index];
                            item.collectStatus = res1.data.collectStatus[index];
                        });
                        self.$timeout(() => {
                            self.dataListTotal = res.data.EFENCE.TotalCount;
                            if (self.searchParams.isFirstSearch){
                                self.initPagagion(1);
                            }
                            self.searchParams.isFirstSearch = false;
                            self.searchParams.taskId = res.data.EFENCE.TaskId;
                            self.renderDataList = res.data.EFENCE.Result;
                        });
                    });
                }else {
                    self.layerDec.info('没有查询到电围历史数据');
                }
            }else {
                self.layerDec.warnInfo('查询电围历史数据失败！');
            }
        });
    }

    /**
     * @description请求电围历史报警数据
     * @param {PersonAlarmParams} PersonAlarmParams 请求参数
     */
    public getServerAlarmMessage(searchParams: PersonAlarmParams) {
        let self = this;
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res:any) => {
            if (res.code === 200) {
                self.alarmdataListTotal = res.data.TotalCount;
                for (let i = 0; i < res.data.Result.length;i++){
                    let dataarr = res.data.Result[i].AlarmLog.Notes.split("_");
                    res.data.Result[i].AlarmLog.IMEI = dataarr[0];
                    res.data.Result[i].AlarmLog.IMSI = dataarr[1];
                }
                if (self.isSearchAlarmParams) {
                    self.initPagagion(2);
                }
                self.isSearchAlarmParams = false;
                self.renderAlarmdataList = res.data.Result;
            }
        });
    }

    /**
     * @description 历史信息和报警信息切换
     * @param {boolean} status
     */
    public switchChange(status: boolean) {
        this.switchStatus = status;
    }

    /**
     * @description 改变时间
     * @param {Date} value 当前点选择的时间
     */
    public changeTime() {
        // 时间检测
        let starttime = new Date(this.startTime.replace(/-/g,'.')).getTime(),
            endtime   = new Date(this.endTime.replace(/-/g,'.')).getTime();
        // 时间输入错误终止检索
        if(starttime > endtime){
            this.layerDec.warnInfo("开始时间不能大于结束时间！");
            return 
        }
        // 时间改变，重置搜索参数 and 搜索状态
        this.searchParams.isFirstSearch = true;
        this.searchParams.currentPage = 1;
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.getServerMessage(this.searchParams);

        this.isSearchAlarmParams = true;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    /**
     * @description 关闭
     */
    public closePopup() {
        // this.mylayer.close(this.$scope.index);
    }

    /**
     * @description 查看电子围栏报警详情
     * @param {number} actIndex 当前点击的索引
     */
    public lookAlarmDetail(actIndex: number) {
        let scope: { layer: any; index: string, $destroy: Function, activeIndex: number, alarmdataList: Array<any> ,name:string} = this.$scope.$new();
        scope.index = "efResourceAlarmDetail";
        scope.alarmdataList = this.renderAlarmdataList;
        scope.activeIndex = actIndex;
        if(this.index){
            this.layer.close(this.index);
        }
        scope.name=this.name
        this.index = this.layer.open({
            content: efResourceAlarmDetail,
            type: 1,
            skin: 'no-scroll',
            title: ['电子围栏报警详情', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['560px', '255px'],
            shade :0,
            offset:['200px','700px'],
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: electronic) {
        if (event) {
            event.stopPropagation();
        }
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
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: electronic) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(event: any, item: electronic) {
        if (event) {
            event.stopPropagation();
        }
    }

    /**
     * 显示详情弹框
     * @param {wifi} item
     */
    public detailPopup(event: any, item: electronic) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<electronic>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function, showFooter: boolean } = self.$scope.$new();
        scope.rank = 0;
        scope.allList = [item];
        scope.showFooter = true;
        scope.collectFunction = (item: electronic) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: electronic) => {
            self.clickAnalysis(null, item);
        };
        scope.surveillanceFunction = (item: electronic) => {
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
            content: efPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }
}

app.controller('efResourcePointMoreController', EfResourcePointMoreController);