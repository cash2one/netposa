/// <amd-dependency path="text!./tplCollectList.html" name="collectListHtml" />
import {app} from "../../common/app/main.app";
import 'css!./style/wifiResourcePoint.css';

// 弹框
import './collectList.controller';

// 服务
import '../../common/services/deviceSocket.service';
import { IdeviceSocket } from '../../common/services/deviceSocket.service';
import  '../../common/factory/socket.factory';
import { ISocketFactory } from '../../common/factory/socket.factory';
import '../../common/services/resourceRetrieval.service';
import { IResourceRetrievalService } from '../../common/services/resourceRetrieval.service';
import '../../common/factory/userinfo.cache.factory';
import { IUserInfoCacheFactory } from '../../common/factory/userinfo.cache.factory';
import "../../common/services/analysis.service";
import { IAnalysisService } from "../../common/services/analysis.service";

// 参数
import {AlarmType, SocketResultTypeEnum} from '../../../core/server/enum/SocketResultTypeEnum'
import { WifiSearchParams } from '../../resourceRetrieval/search/advancedSearch/adVanceSearchEnum';
import { AttributeFactory } from "../../common/factory/attribute.factory";
import { PersonAlarmParams } from "../../../core/entity/PersonAlarmEnum";

declare let $: any, collectListHtml:any;

class WifiResourcePointController {
    static $inject = ['$scope', '$timeout', 'layer', 'socketFactory', 'deviceSocketServer', 'userInfoCacheFactory', 'resourceRetrievalService','analysisService'];
    ShowAlarmStatus: boolean = false;
    deviceName:string;
    deviceInfo:{[key:string]:any};
    deviceId: string;
    MockWifiList: Array<any> = [];//MockWifiList(20);
    MockWifiAlarmList: Array<any> = [];//MockWifiAlarmList(29);
    marker:any;
    wifiCollectParam:any;
    wifiAlarmParam:any;
    isSubcribeWiFiLog:boolean = false;
    isSubcribeAlarmLog:boolean = false;
    //今日历史
    dataListTotal:number = 0;
    searchParams: WifiSearchParams = {
        currentPage: 1,
        keyWord: '',
        orderBy: {
            isAsc: false,
        },
        pageSize: 10,
        isFirstSearch: true,
        taskId: '',
        startTime: '',
        endTime: '',
        ArObjectID: [],
        userId: ''
    }// 查询参数
    attributeFactory: AttributeFactory = new AttributeFactory();
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    alarmdataListTotal:number = 0;
    constructor(
        private $scope: any,
        private $timeout: Function,
        private layer: any,
        private socketFactory: ISocketFactory,
        private deviceSocketServer: IdeviceSocket,
        private userInfoCacheFactory: IUserInfoCacheFactory,
        private resourceRetrievalService: IResourceRetrievalService,
        private analysisService: IAnalysisService
    ) {
        this.marker = this.$scope.marker;
        console.log(this.marker);
        this.deviceName = this.$scope.PointDeTail.Name;
        this.deviceInfo = this.$scope.PointDeTail;

        this.deviceId = this.$scope.PointDeTail.ID;

        this.subscribeWifiCollect();
        this.subscribeWifiAlarm();

        var self=this;
        this.$scope.$on('$destroy', () => {
            this.wifiCollectParam.isCancel = true;
            this.wifiAlarmParam.isCancel = true;
            if (this.isSubcribeWiFiLog) {
                this.deviceSocketServer.getWifiInfo(this.wifiCollectParam).then((res) => {
                    if (!!res) {
                        console.log("close sokit")
                        this.socketFactory.unSubscribe(this.wifiCollectParam.socketType);
                        this.isSubcribeWiFiLog = false;
                    }
                })
            }
            if (this.isSubcribeAlarmLog) {
                this.deviceSocketServer.getWifiInfo(this.wifiAlarmParam).then((res) => {
                    if (!!res) {
                        console.log("close sokit")
                        this.socketFactory.unSubscribe(this.wifiAlarmParam.socketType);
                        this.isSubcribeAlarmLog = false;
                    }
                })
            }

        })

        //初始化默认请求数据
        this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
        let time = this.attributeFactory.getCrossTrainTime(1);
        this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.searchParams.endTime = time.endTime;
        this.searchParams.ArObjectID.push(this.deviceId);
        this.getServerMessage(this.searchParams);
        this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.PersonAlarmParams.endTime = time.endTime;
        this.PersonAlarmParams.arrCameraId = [this.deviceId];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'WiFi';
        this.getServerAlarmMessage(this.PersonAlarmParams);

    }
    /**
     * @description 请求电围历史数据
     * @param {WifiSearchParams} WifiSearchParams 请求参数
     */
    public getServerMessage(searchParams: WifiSearchParams) {
        this.resourceRetrievalService.advancedSearchByWifi(searchParams)
            .then((res: any) => {
                if ((res.code === 200) && (typeof res.data.WiFi !== 'undefined') && (res.data.WiFi.TotalCount > 0)) {
                    this.dataListTotal = res.data.WiFi.TotalCount;
                    let arr: Array<any> = [], data = res.data.WiFi.Result;
                    for(let i = 0;i<data.length;i++){
                        let obj:any = {};
                        obj.Mac = data[i].wifiLog.Mac;
                        obj.AcqTime = data[i].wifiLog.AcqTime;
                        arr.push(obj)
                    }
                    this.MockWifiList = arr;
                } else {

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
                for (let i = 0; i < res.data.Result.length;i++){
                    res.data.Result[i].AlarmLog.Mac = res.data.Result[i].AlarmLog.Notes;
                }
                self.MockWifiAlarmList = res.data.Result;
            }
        });
    }

    //wifi采集
    private subscribeWifiCollect(){
        this.wifiCollectParam = {
            userID:this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType:SocketResultTypeEnum.SubscribeWiFiLog,
        };
        let self=this;
        this.deviceSocketServer.getWifiInfo(this.wifiCollectParam).then((res)=>{
            if (!!res) {
                this.isSubcribeWiFiLog = true;
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeWiFiLog,(data:any)=>{
                    this.$timeout(()=>{
                        let arr: Array<any> = data.concat(self.MockWifiList);
                        if (arr.length>10){
                            self.MockWifiList = arr.slice(0,10);
                        }else{
                            self.MockWifiList = arr;
                        }
                        self.dataListTotal += data.length;
                        console.log('socket start SubcribeWiFiLog', data, self.MockWifiList.length)
                    })
                })
            }
        });
    }

    //wifi报警
    private subscribeWifiAlarm(){

        this.wifiAlarmParam = {
            userID:this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType:SocketResultTypeEnum.SubscribeAlarmLog,
            alarmType:AlarmType.Wifi
        };
        let self =this;
        this.deviceSocketServer.getWifiInfo(this.wifiAlarmParam).then((res)=>{
            if (!!res) {
                self.isSubcribeAlarmLog = true;
                self.socketFactory.subscribe(SocketResultTypeEnum.SubscribeAlarmLog,(data:any)=>{
                    if (self.deviceId != data[0].AlarmLog.ObjectID) {
                        return
                    }
                    self.$timeout(() => {
                        let arr: Array<any> = data.concat(self.MockWifiAlarmList);
                        if(arr.length>10){
                            self.MockWifiAlarmList = arr.slice(0,10);
                        }else{
                            self.MockWifiAlarmList = arr;
                        }
                        self.alarmdataListTotal +=data.length;
                        console.log('socket start SubcribeWiFiLog PerceiveData', data, self.MockWifiAlarmList.length);
                    })
                })
            }
        })
    }

    public showAlarm(){
        this.ShowAlarmStatus = !this.ShowAlarmStatus;
    }

    //更多采集
    public lookMoreCollect(flag:boolean) {
        let scope: { layer: any, $destroy: Function, ID:any,name:string,status:boolean} = this.$scope.$new();
        scope.ID = this.deviceId;
        scope.name = this.deviceName;
        scope.status = flag;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['历史Wi-Fi采集', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['810px', '500px'],
            content: collectListHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    public mapWifiPopulClose(){
        console.log('exit wifi popup');
    }

}

app.controller('wifiResourcePointController', WifiResourcePointController);