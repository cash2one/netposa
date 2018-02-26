/// <amd-dependency path="text!./tplHistoryPolice.html" name="populPolice" />
/// <amd-dependency path="text!./tplHistoryFace.html" name="populFace" />
/// <amd-dependency path="text!./tpldetail.html" name="poppupdetail" />
/// <amd-dependency path="text!./tplHistoryAll.html" name="popupAll" />
import {app} from "../../common/app/main.app";
import 'css!./style/cameraMapPoint.css'

// 弹框
import './tplHistoryAll';
// import './alarm.detail.poup';
// import './tplHistoryPolice';
// import './tpl.historyFace';

// 服务
import '../../common/factory/CheckIntelligentAnalysis.factory';
import {ICheckIntelligentAnalysis} from '../../common/factory/CheckIntelligentAnalysis.factory';
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import "../../common/factory/socket.factory";
import {ISocketFactory} from "../../common/factory/socket.factory";
import '../../common/services/task.service';
import {ITaskService} from '../../common/services/task.service';
import '../../common/services/deviceSocket.service';
import {IdeviceSocket} from '../../common/services/deviceSocket.service';
import "../../common/services/camera.service";
import {ICameraService} from "../../common/services/camera.service";
import '../../common/services/analysis.service';
import {IAnalysisService} from '../../common/services/analysis.service';

//  视频播放
import {VideoOcxAttr} from '../../common/directive/ocx/video.ocx.model';
import {IVideoOcxControlFunc, VideoOcxRealTimeOpt} from "../../common/directive/ocx/video.ocx.directive";

// 参数
import {SocketResultTypeEnum, AlarmType} from '../../../core/server/enum/SocketResultTypeEnum'; // socket枚举
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {AttributeFactory} from "../../common/factory/attribute.factory";
import {AlarmResultInfo, PersonAlarmParams, PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
// 高级检索参数
import {
    FaceSearchParams,
    multipleChoice,
    SexList,
    CrossTrainTimeList,
    PatternList,
    EquipmentList,
    AgeList,
    ClothesList,
    HairList,
    ShoeList,
    GlassesList,
    MaskList,
    CapList
} from '../../resourceRetrieval/search/advancedSearch/adVanceSearchEnum';
import {
    face,
    faceItem,
    initFaceResult,
    QueryItem,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import {CollectDataType} from "../../../core/server/enum/CollectDataType";
// 没有调用参数
import PageParams from "../../common/directive/page/page-params";
import {personAlarm} from "../../../core/server/AlarmModule";
import {Capture, MockCaptureList, Alarm, MockAlarmList, Car, MockCarList, MockAlarmList1} from "./TestEnum";

declare let populPolice: any, populFace: any, poppupdetail: any, popupAll: any, require: any, $: any, angular: any;
let Promise = require("es6-promise");

class CameraMapPointController {
    static $inject = ['$scope', '$timeout', 'mylayer', 'socketFactory', 'deviceSocketServer', 'layer', 'userInfoCacheFactory', 'taskService', "cameraService", 'resourceRetrievalService', 'analysisService', 'layerDec', 'checkIntelligentAnalysis', 'handleStorage'];

    // true
    SubcribeAccessList: Array<any> = [];
    SubcribeAlarmList: Array<any> = [];

    historyIsShowAlarm: boolean = false;
    showFaceInformation: boolean = false;
    videoOcx: IVideoOcxControlFunc;
    layerClassName: string = 'mylayerMin';
    layerSizeClassName: string = 'layer-max';
    layerSizeIsMax: boolean = false;
    cameraInfo: { [key: string]: any };
    cameraName: string;
    taskIds: Array<string> = [];
    FaceStructtaskIds: Array<string> = [];
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
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();

    iframe: string = '';
    // 时间
    startTime: string;
    endTime: string;
    //抓拍参数
    searchParams: FaceSearchParams = {} as FaceSearchParams;// 查询参数
    // 检索数据条数
    SubcribeAccessListTotal: number = 0;
    SubcribeAlarmListTotal: number = 0;
    isSearchAlarmParams: boolean = true;
    PersonAlarmParams: PersonAlarmParams = {} as PersonAlarmParams;
    analysisGoTo = AnalysisGoToType;
    checkFaceTrack: boolean;
    checkAccompanyingAnalysis: boolean;
    checkFrequencyAnalysis: boolean;
    checkAnalysis: boolean;

    constructor(private $scope: any,
                private $timeout: any,
                private mylayer: any,
                private socketFactory: ISocketFactory,
                private deviceSocketServer: IdeviceSocket,
                private layer: any,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private taskService: ITaskService,
                private cameraService: ICameraService,
                private resourceRetrievalService: IResourceRetrievalService,
                private analysisService: IAnalysisService,
                private layerDec: any,
                private checkIntelligentAnalysis: ICheckIntelligentAnalysis,
                private handleStorage: IHandleStorage) {
        this.cameraName = this.$scope.PointDeTail.Name;
        this.cameraInfo = this.$scope.PointDeTail;

        //设置时间插件默认时间
        let time = this.attributeFactory.getCrossTrainTime(0);
        this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.searchParams.endTime = time.endTime;
        this.searchParams.arrCameraId = [this.cameraInfo.ID];
        this.searchParams.currentPage = 1;
        this.searchParams.pageSize = 5;
        this.getServerMessage(this.searchParams);

        // 报警请求参数
        this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
        this.PersonAlarmParams.endTime = time.endTime;
        this.PersonAlarmParams.arrCameraId = [this.cameraInfo.ID];
        this.PersonAlarmParams.pageSize = 5;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'Camera';
        this.getServerAlarmMessage(this.PersonAlarmParams);

        this.getTaskIds(this.cameraInfo.ID, 'FaceMonitor').then((results: any) => {
            if (!results) {
                return false;
            }
            results.forEach((val: any) => {
                this.taskIds.push(val.ID);
            });
            let taskAlarm: any;
            taskAlarm = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: this.taskIds,
                isCancel: false,
                socketType: SocketResultTypeEnum.SubscribeAlarmLog,
                alarmType: AlarmType.Face
            };
            this.subscribeAlarmInfo(taskAlarm);
        });

        this.getTaskIds(this.cameraInfo.ID, 'FaceStruct').then((results: any) => {
            if (!results) {
                return false;
            }
            results.forEach((val: any) => {
                this.FaceStructtaskIds.push(val.ID);
            });
            let taskInfo: any;
            taskInfo = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: this.FaceStructtaskIds,
                isCancel: false,
                socketType: SocketResultTypeEnum.SubscribeFaceLog,
            };

            this.subscribeAccessInfo(taskInfo);
        });

        // 快速分析权限
        this.checkFaceTrack = this.checkIntelligentAnalysis.checkFaceTrack();
        this.checkAccompanyingAnalysis = this.checkIntelligentAnalysis.checkAccompanyingAnalysis();
        this.checkFrequencyAnalysis = this.checkIntelligentAnalysis.checkFrequencyAnalysis();
        this.checkAnalysis = this.checkIntelligentAnalysis.checkAnalysis();

        $scope.$on('closeiframe', () => {
            this.iframe = '';
            this.$scope.$apply();
        });

        $scope.$on('$destroy', () => {
            this.videoOcx = null;
            this.unSubscribe();
        });
    }

    /**
     * @description获取数据
     * @param {FaceSearchParams} searchParams
     */
    private getServerMessage(searchParams: FaceSearchParams) {
        let self = this;
        self.resourceRetrievalService.advancedSearchByFace(searchParams)
            .then((res: any) => {
                if (res.code === 200) {
                    if((typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                        self.SubcribeAccessListTotal = res.data.Face.TotalCount;
                        self.SubcribeAccessList = res.data.Face.Result;
                    }else {
                        self.SubcribeAccessListTotal = 0;
                        self.SubcribeAccessList = [];
                        self.layerDec.info("没有检索到数据");
                    }
                } else {
                    self.layerDec.warnInfo("查询失败！");
                }
            })
    }

    /**
     * @description 请求电围历史报警数据
     * @param {PersonAlarmParams} PersonAlarmParams 请求参数
     */
    public getServerAlarmMessage(searchParams: PersonAlarmParams) {
        let self = this;
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res: any) => {
            if (res.code === 200) {
                self.SubcribeAlarmListTotal = res.data.TotalCount;
                let arr: Array<any> = [], data: any = res.data.Result;
                for (let i = 0; i < data.length; i++) {
                    let data1 = data[i].AlarmLogInfoArr;
                    for (let n = 0; n < data1.length; n++) {
                        data1[n].AlarmLogInfo = data1[n];
                    }
                    arr.push(data[i]);
                }
                self.SubcribeAlarmList = arr;
            }
        });
    }

    //订阅报警信息
    private subscribeAlarmInfo(taskAlarm: any) {
        let self = this;
        this.deviceSocketServer.getCameraInfo(taskAlarm).then((res: ResponseResult<any>) => {
            if (!!res) {
                self.socketFactory.subscribe(SocketResultTypeEnum.SubscribeAlarmLog, (data: Array<any>) => {
                    if (!!data) {
                        for (let i = 0; i < data.length; i++) {
                            if (self.cameraInfo.ID != data[i].AlarmLog.ObjectID) {
                                console.log(self.cameraInfo.ID, data[i].AlarmLog.ObjectID)
                                return
                            }
                            (function (data) {
                                self.$timeout(() => {
                                    console.log('ready', data);
                                    self.SubcribeAlarmList = [].concat([data], self.SubcribeAlarmList);
                                    self.SubcribeAccessListTotal++;
                                })
                            })(data[i])
                        }
                    }
                });
            } else {
                this.layer.msg('订阅摄像机报警信息失败');
            }
        });
    }

    //订阅抓拍信息
    private subscribeAccessInfo(taskInfo: any) {
        let self = this;
        this.deviceSocketServer.getCameraInfo(taskInfo).then((res: ResponseResult<any>) => {
            if (!!res) {
                this.socketFactory.subscribe(SocketResultTypeEnum.SubscribeFaceLog, (data: Array<any>) => {
                    if (Array.isArray(data)) {
                        let item:face;
                        for (let i = 0; i < data.length; i++) {
                            data[i].ScenePath = data[i].FacePath;
                            item = {
                                AccessLog: data[i],
                                deviceInfo: self.cameraInfo,
                                collectStatus: false
                            };
                            if (self.cameraInfo.ID === data[i].CameraID) {
                                self.SubcribeAccessListTotal += 1;
                                self.SubcribeAccessList = [].concat([item], self.SubcribeAccessList)
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

    private unSubscribe() {
        let _self = this as CameraMapPointController;
        if(this.taskIds.length>0){
            Promise.all([
                _self.deviceSocketServer.getCameraInfo({
                    userID: _self.userInfoCacheFactory.getCurrentUserId(),
                    objectID: _self.taskIds,
                    isCancel: true,
                    socketType: SocketResultTypeEnum.SubscribeAlarmLog,
                    alarmType: AlarmType.Face
                }),
                _self.deviceSocketServer.getCameraInfo({
                    userID: _self.userInfoCacheFactory.getCurrentUserId(),
                    objectID: _self.FaceStructtaskIds,
                    isCancel: true,
                    socketType: SocketResultTypeEnum.SubscribeFaceLog
                }),
            ]).then((res: Array<any>) => {
                this.socketFactory.unSubscribe(SocketResultTypeEnum.SubscribeAlarmLog);
                this.socketFactory.unSubscribe(SocketResultTypeEnum.SubscribeFaceLog);
                console.log('退订成功', res)
            })
        }

    }

    private getTaskIds(deviceId: string, type:string) {
        // TaskType 枚举 的TaskType
        return this.taskService.getTaskByDeviceID(deviceId, type).then((res: any) => {
            if (!!res && !!res.data) {
                return Promise.resolve(res.data)
            } else {
                this.layer.msg('设备查询布控任务失败')
            }
        });
    }

    showAlarm() {
        this.iframe = 'iframe';
        let scope: { $destroy: Function } = this.$scope.$new();
        this.mylayer.open({
            content: poppupdetail,
            scope: scope,
            ID: 'populDetail',
            AreaAndPosition: {left: 200, top: 200, width: 853, height: 502},
            end: () => {
                scope.$destroy()
            }
        });
    }

    showMoreFace(flag: boolean) {
        this.iframe = 'iframe';
        let scope: { $destroy: Function, showStatus: boolean, SubcribeAccessList: Array<any>, SubcribeAlarmList: Array<any>, ID: string, cameraInfo: any } = this.$scope.$new();
        scope.showStatus = flag;
        scope.SubcribeAccessList = this.SubcribeAccessList;
        scope.SubcribeAlarmList = this.SubcribeAlarmList;
        scope.ID = this.cameraInfo.ID;
        scope.cameraInfo = this.cameraInfo;
        this.layer.open({
            type: 1,
            skin: 'no-scroll',
            title: ['人脸抓拍', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
            area: ['853px', '635px'],
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

    stop() {
        if (this.videoOcx) {
            this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
        }
    }

    closeMyLayer() {
        this.stop();
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: face) {
        if (event) {
            event.stopPropagation();
        }
        let self = this;
        if (!item.collectStatus) {
            let params: CollectAddParams = {
                json: angular.toJson(item),
                objectID: item.AccessLog.ID,
                objectType: CollectDataType.Face.value
            };
            self.resourceRetrievalService.collectAddInfo(params)
                .then((res: any) => {
                    if (res) {

                    }
                })
        } else {
            let params: CollectDeleteParams = {
                ids: item.AccessLog.ID
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
    public clickAnalysis(event: any, item: face, type: string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.Face;
        storageParams.data = item;
        this.handleStorage.setSessionStorageData(storageParams.key, storageParams);
        localStorage.setItem("AnalysisType", "Face");
        if (type = AnalysisGoToType.Track.key) {
            window.open(AnalysisGoToType.Track.data);
        } else if (type = AnalysisGoToType.Accompanying.key) {
            window.open(AnalysisGoToType.Accompanying.data);
        } else if (type = AnalysisGoToType.Frequency.key) {
            window.open(AnalysisGoToType.Frequency.data);
        } else if (type = AnalysisGoToType.More.key) {
            window.open(AnalysisGoToType.More.data);
        }
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }

    /**
     * @description 布控与取消布控
     * @param item
     */
    public clickSurveillance(event: any, item: face) {
        if (event) {
            event.stopPropagation();
        }
        item.surveillanceStatus = !item.surveillanceStatus;
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

app.controller('cameraMapPointController', CameraMapPointController);