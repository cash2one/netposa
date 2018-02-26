/// <amd-dependency path="text!../../fullPlayPopup/fullPlayPopup.html" name="fullPlayPopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/personPopup.css';

// 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import {SystemConfigParams} from "../../../core/entity/SystemConfigParams";
import '../../common/factory/CheckIntelligentAnalysis.factory';
import {ICheckIntelligentAnalysis} from '../../common/factory/CheckIntelligentAnalysis.factory';
// 获取系统配置服务
import "../../common/factory/systemInfo.cache.factory";
import {ISystemInfoCacheProvider} from "../../common/factory/systemInfo.cache.factory";
// layerMsg弹框
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../../common/factory/layerMsg.factory";
// socket服务
import {ISocketFactory} from "../../common/factory/socket.factory";
import "../../common/factory/socket.factory";
import {SocketResultTypeEnum} from "../../../core/server/enum/SocketResultTypeEnum";

// 弹框
import "../../fullPlayPopup/fullPlayPopup.controller"

// 参数
import {face, persionLience} from "../../../core/enum/QueryRecord";
import {multipleChoice, AmbitusList, QueryPersionLibraryParams} from "../../../core/enum/QueryParams";
import { AnalysisGoToType } from "../../../core/server/enum/AnalysisDataType";
import {ResourceTypeEnum} from "../../../core/server/enum/ResourceType";
import {ObjectType} from '../../../core/enum/ObjectType';

declare let fullPlayPopupHtml: any, $: any;

class personPopupController {
    static $inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "analysisService", 'systemInfoCacheFactory', 'layerDec', 'socketFactory', 'checkIntelligentAnalysis'];

    switchButton: boolean = true;

    activeRank: number;
    totalRank: number;
    accessRecords: face;
    detailRecords: any;
    accessRecordsList: Array<face>;

    persionLibraryList: Array<persionLience> = [];

    windowPopul: string;
    showTitle: boolean = false;

    loopTotal: number = 3;
    loopIndex: number = 1;
    loopInfo: any;
    loopStatus: boolean = false; // 人员档案查询状态 fals:查询中 true: 查询结束

    quickSearchAgainText: string = "";
    ambitusText: string = "All";
    ambitusInfo: Array<multipleChoice>;
    showFooter: boolean = false;
    analysisGoTo = AnalysisGoToType;
    checkFaceTrack: boolean;
    checkAccompanyingAnalysis: boolean;
    checkFrequencyAnalysis: boolean;
    checkAnalysis: boolean;

    constructor(private $scope: any,
                private $timeout: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private analysisService: IAnalysisService,
                private systemInfoCacheFactory: ISystemInfoCacheProvider,
                private layerDec: ILayerDec,
                private socketFactory: ISocketFactory,
                private checkIntelligentAnalysis: ICheckIntelligentAnalysis) {
        let self = this;
        self.activeRank = $scope.rank + 1;
        self.totalRank = $scope.allList.length;
        self.accessRecords = $scope.allList[$scope.rank];
        self.accessRecordsList = $scope.allList;

        self.showFooter = $scope.showFooter || false;

        self.windowPopul = $scope.windowPopul;
        self.showTitle = $scope.showTitle;
        self.initParams();
        self.getPersionLibrary();
        self.getSearchDetailLog();
        self.$scope.$on('$destroy', () => {
            self.unbindSocket();
        });

        self.checkFaceTrack = self.checkIntelligentAnalysis.checkFaceTrack();
        self.checkAccompanyingAnalysis = self.checkIntelligentAnalysis.checkAccompanyingAnalysis();
        self.checkFrequencyAnalysis = self.checkIntelligentAnalysis.checkFrequencyAnalysis();
        self.checkAnalysis = self.checkIntelligentAnalysis.checkAnalysis();
    }

    initParams() {
        let self = this;
        self.ambitusInfo = AmbitusList();// 周边
    }

    // 初始化查询数据
    private initData(num: number) {
        this.accessRecords = this.accessRecordsList[num];
    }

    private getPersionLibrary() {
        let self = this;
        self.unbindSocket();
        self.loopStatus = false;
        let params = new QueryPersionLibraryParams();
        // 初始化系统配置
        let systemData: SystemConfigParams = self.systemInfoCacheFactory.getSystemInfo();
        params = {
            imagePath: self.accessRecords.AccessLog.FacePath, // 上传图片识别人脸
            arrLibId: ["000001"],// 选中人像库
            threshold: systemData.IdentityValue, // 相似度
            retrievalReason: "人员档案查看", // 检索事由
            taskId: self.accessRecords.AccessLog.ID,
            featureSearchExt: {
                accessLogId: self.accessRecords.AccessLog.ID,
                featureType: "AccessFeature",
                imgUrl: self.accessRecords.AccessLog.FacePath,
                libId: "000001"
            }
        };
        self.analysisService.faceAnalysis(params).then((res: ResponseResult<any>) => {
            if (res.code === 200) {
                self.bindSocketToResult()
            } else {
                self.loopStatus = true;
                self.layerDec.failInfo('人员档案查询失败！')
            }
        })
    }

    bindSocketToResult() {
        let self = this;
        self.socketFactory.subscribe(SocketResultTypeEnum.SearchFace, (res: Array<any>) => {
            self.$timeout(function () {
                self.loopStatus = true;
            });
            if (Array.isArray(res) && res[0].code === 200 && res[0].data && Array.isArray(res[0].data.Result)) {
                let persionLibraryList: Array<persionLience> = [];
                for (let i = 0; i < 10 && i < res[0].data.Result.length; i++) {
                    persionLibraryList.push(res[0].data.Result[i]);
                }
                self.persionLibraryList = persionLibraryList;
                self.loopTotal = persionLibraryList.length;
                self.loopIndex = 1;
                self.loopInfo = persionLibraryList[0];
            } else {
                self.layerDec.warnInfo('未获取到结果！');
            }
            self.unbindSocket();
        });
    }

    unbindSocket() {
        this.socketFactory.unSubscribe(SocketResultTypeEnum.SearchFace);
    }

    // 查看全图
    public fullScreen(path: string) {
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

    // 查看视频
    public fullPlay() {
        let self = this;
        let deviceInfo: any = {
            Name: "",
            ID: self.accessRecords.AccessLog.CameraID,
            position: {
                Lat: "",
                Lon: "",
            },
            data: {

            },
            time: self.accessRecords.AccessLog.LogTime,
            type: 2,
            ObjectType: "Camera",
            LayerType: "",
            ObjectID: self.accessRecords.AccessLog.CameraID
        };
        if (deviceInfo.ObjectID) {
            this.resourceRetrievalService.getDeviceById(deviceInfo.ObjectID, deviceInfo.ObjectType)
                .then((res: any) => {
                    if ((res.code === 200) && res.data) {
                        if (deviceInfo.ObjectType === "Camera") {
                            deviceInfo.Name = res.data.Name;
                            if (!!res.data.JsonUserData.VideoServer) {
                                deviceInfo.status = true;
                                deviceInfo.data = {
                                    Code: res.data.JsonUserData.VideoServer.Code,
                                    IpAddress: res.data.JsonUserData.VideoServer.IpAddress,
                                    Port: res.data.JsonUserData.VideoServer.Port,
                                    Pwd: res.data.JsonUserData.VideoServer.Pwd,
                                    Uid: res.data.JsonUserData.VideoServer.Uid,
                                    VideoServerType: res.data.JsonUserData.VideoServer.VideoServerType,
                                    ProxyServerID: res.data.JsonUserData.VideoServer.ProxyServerID,
                                    PlayName: res.data.PlayName,
                                    PYCode: res.data.PYCode
                                };
                            } else {
                                deviceInfo.status = false;
                            }
                        }
                        self.showFullPlay(deviceInfo);
                    } else {
                        self.layerDec.warnInfo("没查询到摄像机信息");
                    }
                });
        } else {
            self.layerDec.warnInfo('没查询到摄像机信息！')
        }
    }

    showFullPlay(deviceInfo: any) {
        let self = this;
        let scope: { layer: any; layerId: string, $destroy: Function, PointDeTail: any } = self.$scope.$new();
        scope.layerId = "fullPlayPopup";
        scope.PointDeTail = deviceInfo;
        self.layer.open({
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

    // 上一条数据
    public popupUp() {
        let self = this;
        this.initData(self.activeRank - 2);
        self.activeRank = self.activeRank - 1;
    }

    // 下一条数据
    public popupDown() {
        let self = this;
        this.initData(self.activeRank);
        self.activeRank = self.activeRank + 1;
    }

    // 关闭弹框
    closeLayer() {
        this.$scope.closePopup();
    }

    clickCollect() {
        this.$scope.collectFunction(this.accessRecords);
    }

    clickAnalysis(item: face, type: string) {
        this.$scope.analysisFunction(item, type);
    }

    clickSurveillance() {
        this.$scope.surveillanceFunction(this.accessRecords);
    }

    //获取设备坐标
    public findSystemPointById(id: string) {
        this.resourceRetrievalService.findSystemPointById(id).then((res: ResponseResult<any>) => {
        })
    }

    /**
     * @description 选择周边数据
     * @param {QueryItem} item
     */
    public selectAmbitusInfo(item: multipleChoice) {
        let self = this;

        self.ambitusInfo.forEach(function (value, index, array) {
            if (value.id === item.id) {
                value.status = true;
                self.ambitusText = value.key;
            } else {
                value.status = false;
            }
        });
    };

    // 二次检索
    public quickSearchAgain() {
        let self = this;
        let params: any = {
            "keyword": self.quickSearchAgainText,
            "objectType": self.ambitusText,
            "deviceArrId": []
        };
        let arrObjectID: Array<string> = [];
        if (self.accessRecords.deviceInfo && self.accessRecords.deviceInfo.JsonUserData) {
            let point = {
                lat: self.accessRecords.deviceInfo.JsonUserData.Point.Lat,
                lon: self.accessRecords.deviceInfo.JsonUserData.Point.Lon
            };
            self.$scope.$emit('map-peripheral-information', point,function(res:any) {
                res.forEach(function (value, index) {
                    if (self.ambitusText === "All") {
                        arrObjectID.push(value.ObjectID);

                    } else if (self.ambitusText === ResourceTypeEnum[2].value) {
                        if (value.ObjectType === ObjectType.Vehicle.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[1].value) {
                        if (value.ObjectType === ObjectType.Camera.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[5].value) {
                        if (value.ObjectType === ObjectType.Wifi.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    } else if (self.ambitusText === ResourceTypeEnum[7].value) {
                        if (value.ObjectType === ObjectType.ElectronicFence.value) {
                            arrObjectID.push(value.ObjectID);
                        }
                    }
                });
                params.deviceArrId = arrObjectID;
                self.$scope.$emit('quickSearchAgain', params);
                self.$scope.closePopup();
            });
        } else {
            self.$scope.$emit('quickSearchAgain', params);
            self.$scope.closePopup();
        }
    }

    goto(num: number) {
        this.loopIndex = this.loopIndex + num;
    }

    loopSelect(num: number) {
        this.loopInfo = this.persionLibraryList[num];
        this.loopIndex = num + 1;
    }

    getSearchDetailLog() {
        let self = this;
        let params = {
            "arrID": [],
            "logType": "AccessLog"
        };
        params.arrID.push(self.accessRecords.AccessLog.ID);
        self.resourceRetrievalService.searchLogById(params).then((res: ResponseResult<any>) => {
            if ((res.code === 200) && res.data && res.data.length) {
                self.$timeout(function () {
                    self.detailRecords = res.data[0];
                });
            } else {
                self.layerDec.warnInfo('查询检索记录详情失败！')
            }
        })
    }

}

app.controller("personPopupController", personPopupController);