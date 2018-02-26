/// <amd-dependency path="text!../../fullPlayPopup/fullPlayPopup.html" name="fullPlayPopupHtml" />
/// <amd-dependency path="text!../../detailPopup/personPopup/personPopup.html" name="personPopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!./style/cameraMapPoint.css';

// 弹框
import '../../fullPlayPopup/fullPlayPopup.controller';
import '../../detailPopup/personPopup/personPopup.controller';

 // 服务
import '../../common/services/resourceRetrieval.service';
import {IResourceRetrievalService} from '../../common/services/resourceRetrieval.service';
import '../../common/services/analysis.service';
import {IAnalysisService} from '../../common/services/analysis.service';
import "../../common/factory/userinfo.cache.factory";
import {IUserInfoCacheFactory} from "../../common/factory/userinfo.cache.factory";
import '../../common/factory/CheckIntelligentAnalysis.factory';
import {ICheckIntelligentAnalysis} from '../../common/factory/CheckIntelligentAnalysis.factory';
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';
// 参数
import {ICameraPagingService, PageParams} from "./camera.paging";
import "./camera.paging"
import {AccessLog} from "../../../core/server/AccessLog";
import "../../../core/server/AlarmModule"
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
import {AttributeFactory} from "../../common/factory/attribute.factory";
import {
    face,
    faceItem,
    initFaceResult,
    QueryItem,
    CollectAddParams,
    CollectDeleteParams
} from '../../resourceRetrieval/resourceRetrievalEnum';
import {AlarmResultInfo, PersonAlarmParams, PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
import {ObjectType} from '../../../core/enum/ObjectType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import {CollectDataType} from "../../../core/server/enum/CollectDataType";
import * as _ from "lodash";

declare let $: any, angular: any, fullPlayPopupHtml: any, personPopupHtml: any;

class cameraPointHistoryAll {
    static $inject = ['$scope', '$timeout', 'layerDec', 'layer', 'resourceRetrievalService', 'analysisService', 'userInfoCacheFactory', 'checkIntelligentAnalysis', 'handleStorage'];

    //报警、抓拍切换
    historyIsShowAlarm: boolean = false;
    showStatus: boolean = true;
    //摄像头数据
    SubcribeAccessList: Array<AccessLog>;
    SubcribeAlarmList: Array<any>;
    // 时间
    startTime: string;
    endTime: string;
    //分页条件
    resultParams: PageParams = new PageParams();
    resultAlarmParams: PageParams = new PageParams();
    //抓拍参数
    searchParams: FaceSearchParams = {} as FaceSearchParams;
    // 公用方法
    attributeFactory: AttributeFactory = new AttributeFactory();
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
    currentLayerIndex: number;

    constructor(private $scope: any,
                private $timeout: any,
                private layerDec: any,
                private layer: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private analysisService: IAnalysisService,
                private userInfoCacheFactory: IUserInfoCacheFactory,
                private checkIntelligentAnalysis: ICheckIntelligentAnalysis,
                private handleStorage: IHandleStorage){
        this.showStatus = $scope.showStatus;
        // this.showCameraStatus(this.showStatus);
        //初始化抓拍 查询数据
        //设置时间插件默认时间 
        let time = this.attributeFactory.getCrossTrainTime(0);
        this.startTime = time.startTime;
        this.endTime = time.endTime;
        //初始化默认请求数据
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.searchParams.arrCameraId = [this.$scope.ID];
        // this.searchParams.arrCameraId = ["935961601944483151"];
        this.searchParams.currentPage = 1;
        this.searchParams.pageSize = 10;
        this.searchParams.orderBy = {
            isAsc: false,
        };
        this.searchParams.isFirstSearch = true;
        this.getServerMessage(this.searchParams);

        // 报警请求参数
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.arrCameraId = [this.$scope.ID];
        // this.searchParams.arrCameraId = ["935961601944483151"];
        this.PersonAlarmParams.pageSize = 6;
        this.PersonAlarmParams.currentPage = 1;
        this.PersonAlarmParams.alarmType = 'Camera';
        this.getServerAlarmMessage(this.PersonAlarmParams);

        this.$scope.$on('$destroy', () => {
            $scope.$emit('closeiframe');
            this.layer.close(this.currentLayerIndex);
        });

        this.checkFaceTrack = this.checkIntelligentAnalysis.checkFaceTrack();
        this.checkAccompanyingAnalysis = this.checkIntelligentAnalysis.checkAccompanyingAnalysis();
        this.checkFrequencyAnalysis = this.checkIntelligentAnalysis.checkFrequencyAnalysis();
        this.checkAnalysis = this.checkIntelligentAnalysis.checkAnalysis();
    }

    showCameraStatus(flag: boolean) {
        this.showStatus = flag;
    }

    // 分页获取
    changePage(num: number) {
        if (this.showStatus) {
            this.resultAlarmParams.currentPage = num;
            this.PersonAlarmParams.currentPage = num;
            this.getServerAlarmMessage(this.PersonAlarmParams);
            // 查询历史
            return this.resultAlarmParams;
        }
        if (!this.showStatus) {
            this.resultParams.currentPage = num;
            this.searchParams.currentPage = num;
            this.getServerMessage(this.searchParams);
            return this.resultParams;
        }
    }

    /**
     * @description获取数据
     * @param {FaceSearchParams} searchParams
     */
    private getServerMessage(searchParams: FaceSearchParams) {
        let self = this;
        self.resourceRetrievalService.advancedSearchByFace(searchParams)
            .then((res: any) => {
                if(res.code === 200) {
                    if ((typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                        self.disposeCommonData(res.data.Face);
                    }else {
                        self.layerDec.info("没有检索到数据");
                    }
                }else {
                    self.layerDec.warnInfo("查询结果失败");
                }
            })
    }


    /**
     * @description处理查询数据
     * @param data
     */
    private disposeCommonData(data: any) {
        let self = this;
        let params:any = {
            deviceIds: [],
            deviceType: '',
            ids: [],
            userId: self.userInfoCacheFactory.getCurrentUserId()
        };
        params.deviceType = ObjectType.Camera.value;
        _.forEach(data.Result,function (value) {
            params.deviceIds.push(value.AccessLog.CameraID);
            params.ids.push(value.AccessLog.ID);
        });
        if (params.deviceIds.length === 0) {
            params.deviceIds.push("000001");
        }
        if (params.ids.length === 0) {
            params.ids.push("000001");
        }
        self.resourceRetrievalService.getDeviceInfoPromise(params).then((res:any)=>{
            _.forEach(data.Result,function (item, index) {
                item.deviceInfo = res.data.deviceInfo[index];
                item.collectStatus = res.data.collectStatus[index];
            });
            self.$timeout(() => {
                self.SubcribeAccessListTotal = data.TotalCount;
                self.SubcribeAccessList = data.Result;
                if (self.searchParams.isFirstSearch) {
                    self.initPagagion(1);
                }
                self.searchParams.isFirstSearch = false;
                self.searchParams.taskId = data.TaskId;
            });
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
                self.SubcribeAlarmListTotal = res.data.TotalCount;
                if (self.isSearchAlarmParams) {
                    self.initPagagion(2);
                }
                self.isSearchAlarmParams = false;
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
            pageParams.totalCount = this.SubcribeAccessListTotal;
            this.resultParams = pageParams;
        }
        if (type == 2) {
            let pageParams = new PageParams();
            pageParams.pageSize = 10;
            pageParams.currentPage = 1;
            pageParams.totalCount = this.SubcribeAlarmListTotal;
            this.resultAlarmParams = pageParams;
        }
    }

    /**
     * @description 改变时间
     * @param {Date} value 当前点选择的时间
     */
    private changeTime() {
        // 时间检测
        let starttime = new Date(this.startTime.replace(/-/g, '.')).getTime(),
            endtime = new Date(this.endTime.replace(/-/g, '.')).getTime();
        // 时间输入错误终止检索
        if (starttime > endtime) {
            this.layerDec.warnInfo("开始时间不能大于结束时间！");
            return
        }
        // 时间改变，重置搜索参数 and 搜索状态
        this.searchParams.isFirstSearch = true;
        this.searchParams.currentPage = 1;
        this.searchParams.startTime = this.startTime;
        this.searchParams.endTime = this.endTime;
        this.getServerMessage(this.searchParams);
        this.PersonAlarmParams.startTime = this.startTime;
        this.PersonAlarmParams.endTime = this.endTime;
        this.PersonAlarmParams.currentPage = 1;
        this.isSearchAlarmParams = true;
        this.getServerAlarmMessage(this.PersonAlarmParams);
    }

    /**
     * @description 收藏与取消收藏
     * @param item
     */
    public clickCollect(event: any, item: face) {
        if (event) {
            event.stopPropagation();
        }
        let self = this, data = item.AccessLog || item.AlarmLog;
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
                ids: data.ID
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
        if (type === AnalysisGoToType.Track.key) {
            window.open(AnalysisGoToType.Track.data);
        } else if (type === AnalysisGoToType.Accompanying.key) {
            window.open(AnalysisGoToType.Accompanying.data);
        } else if (type === AnalysisGoToType.Frequency.key) {
            window.open(AnalysisGoToType.Frequency.data);
        } else if (type === AnalysisGoToType.More.key) {
            window.open(AnalysisGoToType.More.data);
        }
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

    // 查看视频
    public fullPlay(item: any) {
        let scope: { layer: any; index: string, $destroy: Function, PointDeTail: any } = this.$scope.$new();
        scope.index = "fullPlayPopup";
        scope.PointDeTail = this.$scope.cameraInfo;
        scope.PointDeTail.type = 2;
        scope.PointDeTail.time = item.AlarmLog.AlarmTime;
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

    /**
     * @description显示详情弹框
     * @param {number} rank
     * @param {Array<face>} list
     */
    public detailPopup(rank: number,allList:Array<face>) {
        let self = this;
        let scope: { $destroy: Function, rank: number, allList: Array<face>, collectFunction: Function, analysisFunction: Function, surveillanceFunction: Function, closePopup: Function, showFooter: boolean } = self.$scope.$new();
        scope.rank = rank;
        scope.allList = allList;
        scope.showFooter = true;
        scope.collectFunction = (item: face) => {
            self.clickCollect(null, item);
        };
        scope.analysisFunction = (item: face, type: string) => {
            self.clickAnalysis(null, item, type);
        };
        scope.surveillanceFunction = (item: face) => {
            self.clickSurveillance(null, item);
        };
        scope.closePopup = () => {
            self.layer.close(self.currentLayerIndex);
        };
        self.currentLayerIndex = self.layer.open({
            type: 1,
            skin: 'detail-popup-box',
            title: false,
            area: ['600px', '440px'],
            content: personPopupHtml,
            scope: scope,
            end: function () {
                scope.$destroy();
            }
        });
    }
}

app.controller('cameraPointHistoryAll', cameraPointHistoryAll);