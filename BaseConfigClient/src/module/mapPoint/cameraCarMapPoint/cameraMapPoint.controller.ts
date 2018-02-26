/// <amd-dependency path="text!./tplHistoryAll.html" name="popupAll" />
import {app} from "../../common/app/main.app";
import 'css!./style/cameraMapPoint.css';

// 弹框
import './tplHistoryAll';

// 服务
import '../../common/factory/socket.factory';
import {ISocketFactory} from '../../common/factory/socket.factory';
import '../../common/services/deviceSocket.service';
import {IdeviceSocket} from '../../common/services/deviceSocket.service';
import '../../common/services/task.service';
import {ITaskService} from '../../common/services/task.service';
import "../../common/services/camera.service";
import {ICameraService} from "../../common/services/camera.service";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/factory/layerMsg.factory';
import { ILayerDec } from "../../common/factory/layerMsg.factory";

// 参数
import { CollectDataType } from "../../../core/server/enum/CollectDataType";
import {AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import {SocketResultTypeEnum, AlarmType} from '../../../core/server/enum/SocketResultTypeEnum';
import {Car} from "./TestEnum";
import {ResponseResult, PageResult} from "../../../core/params/result/ResponseResult";
import {AttributeFactory} from "../../common/factory/attribute.factory";
import {MockAlarmList4} from "./TestEnum";
import {SearchVehicleModel} from '../../../core/params/SearchVehicleParams';
import {car, CollectAddParams, CollectDeleteParams} from '../../resourceRetrieval/resourceRetrievalEnum';
import {AlarmResultInfo, PersonAlarmParams, PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
import {PVDVehicleListModel} from '../../../core/server/PVDVehicleListModel';
import PageParams from "../../common/directive/page/page-params";
import {personAlarm} from "../../../core/server/AlarmModule";
import {AccessLog} from "../../../core/server/AccessLog";
import {VideoOcxAttr} from '../../common/directive/ocx/video.ocx.model';
import {IVideoOcxControlFunc, VideoOcxRealTimeOpt} from "../../common/directive/ocx/video.ocx.directive";


declare let popupAll: any, $: any, require: any, angular: any;

import "es6-promise";

let Promise = require("es6-promise");

class CamCarMapPointController {
    static $inject = ['$scope', '$timeout', 'mylayer', 'socketFactory', 'deviceSocketServer', 'layer', 'userInfoCacheFactory', 'taskService', "cameraService", "resourceRetrievalService", 'analysisService', 'layerDec'];

    topCarList: Array<Car> = [] as Array<Car>;

    // true
    SubcribeAccessList: Array<any> = MockAlarmList4(10, 10).Result;
    SubcribeAlarmList: Array<any> = [];

    historyIsShowAlarm: boolean = false;
    showFaceInformation: boolean = false;
    videoOcx: IVideoOcxControlFunc;
    layerClassName: string = 'mylayerMin';
    layerSizeClassName: string = 'layer-max';
    layerSizeIsMax: boolean = false;
    cameraInfo: { [key: string]: any };
    cameraName: string;
    //OCX初始化
    // initComplete:(ocxControlFunc: IVideoOcxControlFunc) => void;
    //播放成功
    isPlaying: boolean = false;
    //当前播放视频的摄像机的信息
    currentFocusCameraIvsTaskID: string;
    //当前订阅的socket的id
    currentCameraSocket: string;
    //OCX init  让OCX 首次进入列表模式初始化一次
    ocxInitOnce: boolean = false;
    // 设备id
    deviceId: string;
    // 订阅参数
    carCollectParam: any;
    carAlarmParam: any;
    // 是否订阅
    issubscribeAccessInfo: boolean = false;
    issubscribeAlarmInfo: boolean = false;
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();

    iframe: string = '';

    //历史查询条件
    searchParams: SearchVehicleModel = {} as SearchVehicleModel;
    // 历史抓拍总条数
    dataListTotal: number = 0;
    // 历史报警查询参数
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    // 历史报警总条数
    alarmdataListTotal: number = 0;

    constructor(private $scope: any,
                private $timeout: any,
                private mylayer: any,
                private socketFactory: ISocketFactory,
                private deviceSocketServer: IdeviceSocket,
                private layer: any,
                private userInfoCacheFactory: any,
                private taskService: ITaskService,
                private cameraService: ICameraService,
                private resourceRetrievalService: IResourceRetrievalService,
                private analysisService: IAnalysisService,
                private layerDec: ILayerDec) {
        let self = this;
        this.cameraName = this.$scope.PointDeTail.Name;
        this.cameraInfo = this.$scope.PointDeTail;
        this.deviceId = this.$scope.PointDeTail.ID;

        // 获取车辆抓拍历史记录
        let time = this.attributeFactory.getCrossTrainTime(1);
        this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.searchParams.endTime = time.endTime;
        this.searchParams.arrObjectID = [this.deviceId];
        this.searchParams.currentPage = 1;
        this.searchParams.pageSize = 5;
        this.search2Server();

        // 获取车辆报警历史记录
        this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.PersonAlarmParams.endTime = time.endTime;
        this.PersonAlarmParams.arrCameraId = [this.deviceId];
        this.PersonAlarmParams.pageSize = 10;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'Car';
        this.getServerAlarmMessage(this.PersonAlarmParams);

        // 订阅
        this.carCollectParam = {
            userID: this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType: SocketResultTypeEnum.SubscribeVehicleLog,
        };

        this.carAlarmParam = {
            userID: this.userInfoCacheFactory.getCurrentUserId(),
            objectID: [this.deviceId],
            isCancel: false,
            socketType: SocketResultTypeEnum.SubscribeAlarmLog,
            alarmType: AlarmType.Vehicle
        };
        this.subscribeAccessInfo(this.carCollectParam);
        this.subscribeAlarmInfo(this.carAlarmParam);

        $scope.$on('closeiframe', () => {
            self.iframe = '';
            self.$scope.$apply();
        });

        $scope.$on('$destroy', () => {
            this.videoOcx = null;
            this.carCollectParam.isCancel = true;
            this.carAlarmParam.isCancel = true;
            if (this.issubscribeAccessInfo) {
                this.deviceSocketServer.getCameraInfo(this.carCollectParam).then((res: ResponseResult<any>) => {
                    if (!!res) {
                        this.socketFactory.unSubscribe(this.carCollectParam.socketType);
                    }
                })
            }
            if (this.issubscribeAlarmInfo) {
                this.deviceSocketServer.getCameraInfo(this.carAlarmParam).then((res: ResponseResult<any>) => {
                    if (!!res) {
                        this.socketFactory.unSubscribe(this.carAlarmParam.socketType);
                    }
                })
            }
        });
    }

    //订阅报警信息
    private subscribeAlarmInfo(taskAlarm: any) {
        let self = this;
        this.deviceSocketServer.getCameraInfo(taskAlarm).then((res: any) => {
            if (!!res) {

                this.issubscribeAlarmInfo = true;
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeAlarmLog, (data: any) => {
                    if (!!data) {
                        console.log('alarmTopic', data);
                        self.alarmdataListTotal++;
                        this.$timeout(() => {
                            this.SubcribeAlarmList.unshift(data[0]);
                            $(".toptransitiona").eq(0).slideDown();
                        })

                    }
                });
            } else {
                self.layer.msg('订阅摄像机报警信息失败');
            }
        });
    }

    //订阅抓拍信息
    private subscribeAccessInfo(taskInfo: any) {
        let self = this;
        this.deviceSocketServer.getCameraInfo(taskInfo).then((res: any) => {
            if (!!res) {
                this.issubscribeAccessInfo = true;
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeVehicleLog, (data: any) => {
                    if (Array.isArray(data)) {
                        let item:car;
                        for (let i = 0; i < data.length; i++) {
                            item = data[i];
                            item.deviceInfo = self.cameraInfo;
                            item.collectStatus = false;
                            if (self.cameraInfo.ID === data[i].monitorId) {
                                self.$timeout(() => {
                                    self.dataListTotal += 1;
                                    self.SubcribeAccessList = [].concat([item], self.SubcribeAccessList);
                                })
                            } else {
                                return;
                            }
                        }
                    }
                });
            } else {
                this.layer.msg('订阅摄像机抓拍信息失败');
            }
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
                    self.SubcribeAccessList = res.data.Vehicle.Result;
                    self.dataListTotal = res.data.Vehicle.TotalCount;
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

    /**
     * @description请求历史报警数据
     * @param {PersonAlarmParams} PersonAlarmParams 请求参数
     */
    public getServerAlarmMessage(searchParams: PersonAlarmParams) {
        let self = this;
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res: any) => {
            if (res.code === 200) {
                if((typeof res.data !== 'undefined') && (res.data.TotalCount > 0)) {
                    self.alarmdataListTotal = res.data.TotalCount;
                    let arr: Array<any> = [], data = res.data.Result;
                    for (let i = 0; i < data.length; i++) {
                        let obj: any = {};
                        obj.detail.imageURLs = data[i].AlarmLog.JsonUserData.detail.imageURLs;
                        obj.alarmObjName = data[i].AlarmLog.JsonUserData.alarmObjName;
                        obj.alarmType = data[i].AlarmLog.JsonUserData.alarmType;
                        obj.detail.passTime = data[i].AlarmLog.JsonUserData.detail.passTime;
                        arr.push(obj);
                    }
                    self.SubcribeAlarmList = arr;
                }else {
                    self.SubcribeAlarmList = [];
                    self.alarmdataListTotal = 0;
                    self.layerDec.info("没有检索到数据");
                }
            } else {
                self.layerDec.warnInfo("查询失败！");
            }
        });
    }

    showMoreFace(flag: boolean) {
        this.iframe = 'iframe';
        let scope: { $destroy: Function, showStatus: boolean, ID: number | string, cameraInfo: any } = this.$scope.$new();
        scope.showStatus = flag;
        scope.ID = this.deviceId;
        scope.cameraInfo = this.cameraInfo;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['历史信息', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['853px', '575px'],
            content: popupAll,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }

    resizeLayer() {
        if (this.layerSizeIsMax) {
            this.layerSizeClassName = 'layer-max';
            this.showMin()
        } else {
            this.layerSizeClassName = 'layer-min';
            this.showMax()
        }
        this.layerSizeIsMax = !this.layerSizeIsMax;
    }

    showMin() {
        let self = this as any;
        this.showFaceInformation = false;
        this.layerClassName = 'mylayerMin';
        this.mylayer.resize({
            left: (self.$scope.position.x - (540 / 2)),
            top: (self.$scope.position.y - 300),
            width: 540,
            height: 330
        }, self.$scope.layerId)
    }

    showMax() {
        let self = this as any;
        this.showFaceInformation = true;
        this.layerClassName = 'mylayerMax';
        this.mylayer.resize({
            left: (self.$scope.position.x - (814 / 2)),
            top: (self.$scope.position.y - 480),
            width: 814,
            height: 508
        }, self.$scope.layerId)
    }

    showFace() {

    }

    initComplete(ocxControlFunc: IVideoOcxControlFunc) {
        this.videoOcx = ocxControlFunc;
        // console.log($('object').length);
        window.setTimeout(() => {
            this.playRealTime()
        }, 0);
    }

    playRealTime() {
        if (this.videoOcx) {
            let opts = new VideoOcxRealTimeOpt();
            if (!this.cameraInfo.status) {
                return
            }
            if (this.cameraInfo.data.IpAddress && this.cameraInfo.data.Port && this.cameraInfo.data.Uid) {
                /*--正式生产环境应放开----[start]--*/

                opts.ip = this.cameraInfo.data.IpAddress; //|| "172.16.90.151";
                opts.port = this.cameraInfo.data.Port; //|| 2100;
                opts.path = this.cameraInfo.data.PlayName;  //"av/1/3";
                opts.user = this.cameraInfo.data.Uid;  //|| 'admin';
                opts.passwd = this.cameraInfo.data.Pwd; //||"admin";

                /*-----------------------[end]---*/

                /*--测试数据-------------[start]--*/

                // opts.ip = "172.16.90.151";
                // opts.port = 2100;
                // opts.path = "av/1/3";
                // opts.user = 'admin';
                // opts.passwd = "admin";

                /*-----------------------[end]---*/
                console.log(opts)
                this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
            } else {
                this.layer.msg("该设备没有信息")
            }
        }
    }

    changeOCX(flag: boolean) {
        if (flag) {
            this.iframe = 'iframe';
        } else {
            this.iframe = '';
        }

    }

    stop() {
        if (this.videoOcx) {
            this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
        }
    }

    closeMyLayer() {
        this.stop();
        console.log('exit car popup');
    }

    clickCollect(event: any, item: car) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        if (!item.collectStatus) {
            item.deviceInfo = self.cameraInfo;
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
        window.open(AnalysisGoToType.More.data);
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
            let windowW: any = $(window).width() * 0.8;
            let windowH: any = $(window).height() * 0.8;
            let contentHTML = `<img ng-src=${path} style='width:${windowW}px;height:${windowH}px;'>`;
            this.layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                skin: 'layui-layer-nobg no-scroll',
                shadeClose: true,
                shade: 0.6,
                area: [windowW + 'px', windowH + 'px'],
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
}

app.controller('camCarMapPointController', CamCarMapPointController);