/// <amd-dependency path="text!./efResourcePointMore.html" name="efResourcePointMore" />
import {app} from "../../common/app/main.app";
import 'css!./style/efResourcePoint.css';
import   '../../common/services/task.service';
import {ITaskService} from '../../common/services/task.service';
// 弹框
import './efResourcePointMore.controller';
import { IdeviceSocket } from '../../common/services/deviceSocket.service';
import { IUserInfoCacheFactory } from '../../common/factory/userinfo.cache.factory';
import { ISocketFactory } from '../../common/factory/socket.factory';
// mock
// import { MockList, MockAlarmList} from "./TestEnum"

// 检索参数
import { ElectronicSearchParams, MaskList } from '../../resourceRetrieval/search/advancedSearch/adVanceSearchEnum';
import { AlarmResultInfo, PersonAlarmParams, PersonAlarmResult } from "../../../core/entity/PersonAlarmEnum";
import "../../common/services/analysis.service";
import { AttributeFactory } from "../../common/factory/attribute.factory";
// 请求地址
import '../../common/services/resourceRetrieval.service';
import {AlarmType, SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";
let Promise = require('es6-promise');

declare let $: any, efResourcePointMore: any,require:any;

class EFResourcePointController {
    static $inject = ['$scope', '$timeout', 'mylayer', 'deviceSocketServer', 'userInfoCacheFactory', 'socketFactory', 'taskService', 'layer', 'resourceRetrievalService','analysisService'];
    ShowAlarmStatus: boolean = false;
    deviceName:string;
    deviceInfo:any;
    deviceId:string;
    dataList: Array<any> =  [];//MockList(20);
    alarmdataList: Array<any> = [];// MockAlarmList(20);
    // scoket 参数
    wifiCollectParam:any;
    wifiAlarmParam:any;
    // 是否订阅
    isSubcribeEFenceLog:boolean = false;
    isSubcribeAlarmLog:boolean = false;
    // 历史抓拍总数
    dataListTotal = 0;
    // 报警总数
    alarmdataListTotal = 0;
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
        isFirstSearch: true,
        userId: '',
    }// 查询参数
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
    // 日期插件 时间
    startTime: string;
    endTime: string;

    constructor(private $scope: any,
                private $timeout: Function,
                private mylayer: any,
                private deviceSocketServer: IdeviceSocket,
                private userInfoCacheFactory:IUserInfoCacheFactory,
                private socketFactory: ISocketFactory,
                private taskService: ITaskService,
                private layer:any,
                private resourceRetrievalService:any,
                private analysisService:any) {
        this.deviceInfo = this.$scope.PointDeTail;
        this.deviceName = this.$scope.PointDeTail.Name;
        this.deviceId = this.$scope.PointDeTail.ID;
        let marker:any = this.$scope.marker;

        this.subscribeEleCollect();
        this.subscribeWifiAlarm();

        $scope.$on('$destroy' ,() => {
            this.wifiCollectParam.isCancel = true;
            this.wifiAlarmParam.isCancel = true;
            var self = this;
            // 取消订阅
            if (this.isSubcribeEFenceLog) {
                this.deviceSocketServer.getWifiInfo(this.wifiCollectParam).then((res) => {
                    if (!!res) {
                        console.log("close EFenceLog sokit");
                        self.socketFactory.unSubscribe('SubcribeEFenceLog');
                        this.isSubcribeEFenceLog = false;
                    }
                })
            }
            if (this.isSubcribeAlarmLog) {
                this.deviceSocketServer.getWifiInfo(this.wifiAlarmParam).then((res) => {
                    if (!!res) {
                        console.log("close EFenceAlaLog sokit");
                        self.socketFactory.unSubscribe('SubcribeAlarmLog');
                        this.isSubcribeAlarmLog = false;
                    }
                })
            }

        });
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(0);
        this.startTime = time.startTime;
        this.endTime = time.endTime;
        //初始化默认请求数据
        this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.ArObjectID.push(this.deviceId);
        this.getServerMessage(this.searchParams);
        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.deviceId];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'EFENCE';
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    /**
     * @description请求电围历史数据
     * @param {ElectronicSearchParams} ElectronicSearchParams 请求参数
     */
    public getServerMessage(searchParams: ElectronicSearchParams) {
        let self = this;
        this.resourceRetrievalService.advancedSearchByEFence(searchParams)
            .then((res: any) => {
                if ((res.code === 200) && (typeof res.data.EFENCE !== 'undefined') && (res.data.EFENCE.TotalCount > 0)) {
                    self.dataListTotal = res.data.EFENCE.TotalCount;
                    let arr: Array<any> = [], data: any = res.data.EFENCE.Result;
                    for(let i = 0;i<data.length;i++){
                        let obj:any={};
                        obj.IMSI = data[i].eFenceLog.IMSI;
                        obj.IMEI = data[i].eFenceLog.IMEI;
                        obj.AcqTime = data[i].eFenceLog.AcqTime;
                        arr.push(obj);
                    }
                    self.dataList = arr;
                }
            })
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
                for (let i = 0; i < res.data.Result.length; i++) {
                    let dataarr = res.data.Result[i].AlarmLog.Notes.split("_");
                    res.data.Result[i].AlarmLog.IMEI = dataarr[0];
                    res.data.Result[i].AlarmLog.IMSI = dataarr[1];
                }
                self.alarmdataList = res.data.Result;
            }
        });
    }

    //电围采集
    private subscribeEleCollect(){
        this.wifiCollectParam = {
            userID:this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType:SocketResultTypeEnum.SubscribeEFenceLog
        };
        this.deviceSocketServer.getWifiInfo(this.wifiCollectParam).then((res)=>{
            if (!!res) {
                this.isSubcribeEFenceLog = true;
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeEFenceLog,(data:any)=>{
                    this.$timeout(() => {
                        this.dataList = data.concat(this.dataList);
                        this.dataListTotal +=data.length;
                        console.log('SubcribeEFenceLog', data,this.dataList.length);
                    })
                })
            }
        });
    }

    //电围报警
    private subscribeWifiAlarm(){
        this.wifiAlarmParam = {
            userID:this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType:SocketResultTypeEnum.SubscribeAlarmLog,
            alarmType:AlarmType.Efence
        };
        this.deviceSocketServer.getWifiInfo(this.wifiAlarmParam).then((res) => {
            if (!!res) {
                this.isSubcribeAlarmLog = true;
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeAlarmLog, (data: any) => {
                    if (this.deviceId != data[0].AlarmLog.ObjectID){
                        return 
                    }
                    this.$timeout(() => {
                        this.alarmdataList = data.concat(this.alarmdataList);
                        this.alarmdataListTotal +=data.length;
                    })
                })
            }
        })
    }
    public showAlarm() {
        this.ShowAlarmStatus = !this.ShowAlarmStatus;
    }

    public lookMoreCollect() {
        // 默认显示弹框
        let scope: { layer: any; index: string, $destroy: Function, ID: any, switchStatus: boolean, name: string, deviceInfo: any} = this.$scope.$new();
        scope.index = "efResourcePointMore";
        scope.ID=this.deviceId;
        scope.switchStatus=true;
        scope.name = this.deviceName;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['历史信息', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['955px', '535px'],          
            content: efResourcePointMore,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    public lookMoreAlarm() {
        // 默认显示弹框
        let scope: { layer: any; index: string, $destroy: Function, ID: any, switchStatus: boolean, name:string} = this.$scope.$new();
        scope.index = "efResourcePointMore";
        scope.switchStatus = false;
        scope.ID = this.deviceId;
        scope.name = this.deviceName;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['历史信息', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['955px', '535px'], 
            content: efResourcePointMore,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    public mapWifiPopulClose() {
        console.log('exit efres popup');
    }

}

app.controller('efResourcePointController', EFResourcePointController);