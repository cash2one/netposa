/// <amd-dependency path="text!./tplAlarmDetail.html" name="alarmDetailHtml" />
import {app} from "../../common/app/main.app";
import 'css!./style/tplAlarmList.css';
import './alarmDetail.controller';
import {PageParamsAndResult, Pagination, IPagination} from '../../common/Pagination';
import "../../common/services/analysis.service";
import { IAnalysisService } from "../../common/services/analysis.service";
import { AlarmResultInfo, PersonAlarmParams, PersonAlarmResult } from "../../../core/entity/PersonAlarmEnum";
// 参数
import PageParams from "../../common/directive/page/page-params";
// 提示框
import { ILayerDec } from "../../common/factory/layerMsg.factory";
// wifi历史检索数据
import {
    wifi,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
// 公共方法 时间格式化
import { AttributeFactory } from "../../common/factory/attribute.factory";
// 请求地址
import '../../common/services/resourceRetrieval.service';
import { IResourceRetrievalService } from '../../common/services/resourceRetrieval.service';
declare let $: any, alarmDetailHtml:any;

class AlarmListController {
    static $inject = ['$scope', '$timeout', 'layer', 'analysisService', 'layerDec','resourceRetrievalService'];
    ShowAlarmStatus: boolean = false;
    startTime: string;
    endTime: string;
    MockWifiAlarmList:any;
    resultParams: PageParamsAndResult = new PageParamsAndResult();
    Pagination: IPagination = new Pagination();
    index:any;
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    isSearchAlarmParams:boolean = true;
    alarmdataListTotal:number = 0;
    name: string = '';
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    constructor(
        private $scope:any,
        private $timeout: Function,
        private layer:any,
        private analysisService: IAnalysisService,
        private layerDec: ILayerDec,
        private resourceRetrievalService: IResourceRetrievalService,
    ) {
        this.name = this.$scope.name;
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(1);
        this.startTime = time.startTime;
        this.endTime = time.endTime;
        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
        // this.PersonAlarmParams.arrCameraId = ['00071605121518288356'];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'WiFi';
        this.getServerAlarmMessage(this.PersonAlarmParams);
        
        // 监听事件
        let self = this;
        this.$scope.$on('clickCollect', (a: any, item: any, index: number) => {
            self.clickCollect(item);
        })
        this.$scope.$on('clickSurveillance', (a: any, item: any, index: number) => {
            self.clickSurveillance(item);
        })
        this.$scope.$on('clickAnalysis', (a: any, item: any, index: number) => {
            self.clickAnalysis(item);
        })
    }
    public changeTime(){
        // 时间检测
        let starttime = new Date(this.startTime.replace(/-/g,'.')).getTime(),
            endtime   = new Date(this.endTime.replace(/-/g,'.')).getTime();
        // 时间输入错误终止检索
        if(starttime > endtime){
            this.layerDec.warnInfo("开始时间不能大于结束时间！");
            return 
        }
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.isSearchAlarmParams=true;
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    public closePopup(){
        // this.mylayer.close(this.$scope.index);
    }

    // 显示wifi详情
    public lookCollectDetail(actIndex:number){
        let scope: { layer: any; index: string, $destroy: Function, activeIndex: number, dataList: Array<any>,name:string} = this.$scope.$new();
        // 当前点击的索引
        scope.activeIndex = actIndex;
        scope.dataList = this.MockWifiAlarmList;
        scope.name  =this.name;

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
            pageParams.totalCount = this.alarmdataListTotal;
            this.resultParams = pageParams;
        }
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

    public changePage(num:number){
        this.resultParams.currentPage = num;
        this.PersonAlarmParams.currentPage = num;
        this.getServerAlarmMessage(this.PersonAlarmParams);
        return this.resultParams
    }

    /**
     *
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(item: wifi) {
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: JSON.stringify(item),
                objectID: item.wifiLog.ID,
                objectType: "WiFi"
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
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(item: wifi) {
        item.surveillanceStatus = !item.surveillanceStatus;
    }

    /**
     * @description 分析
     * @param item
     */
    public clickAnalysis(item: wifi) {
    }
}

app.controller('alarmListController', AlarmListController);