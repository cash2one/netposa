/// <amd-dependency path="text!../loading/loading.html" name="loadingAnalysisHtml" />
/// <amd-dependency path="text!../../AlarmInfoPopup/alarm.detail.tpl.html" name="AlarmDetail" />
/// <amd-dependency path="text!../../selectPopup/treeCamera/Tree.camera.popup.html" name="cameraTreePopupHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
import {app} from "../../common/app/main.app";
import 'css!../style/PersonAlarm.css';

// 弹框
import '../../selectPopup/treeCamera/Tree.camera.popup'
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';
import "../../AlarmInfoPopup/alarm.detail.poup"

// 服务
import "../../common/services/analysis.service";
import {IAnalysisService} from "../../common/services/analysis.service";
import "../../common/factory/layerMsg.factory";
import {ILayerDec} from "../../common/factory/layerMsg.factory";
import "../main/analysisMmap.server";
import {IAnalysisMmapServer} from "../main/analysisMmap.server";
import '../../common/factory/HandleStorage.factory';
import {IHandleStorage} from '../../common/factory/HandleStorage.factory';

// 参数
import {SystemPoint} from "../../../core/entity/SystemPoint";
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import {AlarmResultInfo, PersonAlarmParams, PersonAlarmResult} from "../../../core/entity/PersonAlarmEnum";
import { FastData, getFastDataList, Enum, TimeLength, getWidowSize } from '../AnalysisEnum';
import PageParams  from '../../common/directive/page/page-params'
import {ObjectType} from '../../../core/enum/ObjectType';
import {AnalysisDataType, AnalysisStorageParams, AnalysisGoToType} from "../../../core/server/enum/AnalysisDataType";
import * as _ from "lodash";

declare let $:any,cameraTreePopupHtml:any,loadingAnalysisHtml:any,AlarmDetail:any, PopupHtml: any;

class PersonAlarmController{
    $inject:Array<string> = ['$scope', '$rootScope', '$timeout', 'layer', 'layerDec', 'analysisService', 'analysisMmapServer', 'handleStorage'];
    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    FastDate: Enum<TimeLength> = FastData.today;
    PersonAlarmParams:PersonAlarmParams = new PersonAlarmParams();
    isShowDetail:boolean = false;
    detailLayerWidth:number = getWidowSize().width - 60 - 320;
    personAlarmResult:PersonAlarmResult;
    currentLayerIndex:number;
    pageParams:PageParams = new PageParams();

    arrCameraId: Array<string> = [];
    selectDeviceCb: string = "close.device.popup";
    analysisGoTo = AnalysisGoToType;

    constructor(private $scope:any,
                private $timeout:any,
                private layer:any,
                private layerDec:ILayerDec,
                private analysisService:IAnalysisService,
                private analysisMmapServer: IAnalysisMmapServer,
                private handleStorage: IHandleStorage){
        let self = this;

        self.PersonAlarmParams = self.initParams();

        self.$timeout(()=>{
            self.$scope.$emit('showItemPage',true);
        });

        self.$scope.$on('$destroy', () => {
            try {
                self.analysisMmapServer.clearDraw();
            } catch (e) {
                console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
            }
        });

        // 监听设备返回事件
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status:boolean, geometry?: NPMapLib.Geometry.Polygon, type?: string) => {
            if(status && Array.isArray(deviceIds)) {
                self.deviceIdFilter(deviceIds, type);
            } else if (geometry) {
                self.analysisMmapServer.removeDrawShape(geometry);
            }
            self.layer.close(self.currentLayerIndex);
        });
    }

    private initParams(): PersonAlarmParams {
        let self = this;

        self.FastDate = FastData.today;

        let params = new PersonAlarmParams();

        params.arrCameraId = [];
        params.startTime = self.FastDate.value.startTime;
        params.endTime = self.FastDate.value.endTime;
        params.alarmType = "Camera";
        params.pageSize = 18;

        return params;
    }

    // 设备id去重
    private deviceIdFilter(ids: Array<string>, type?: string) {
        let self = this;
        let arrCameraId: Array<string> =  [];
        if (type === "tree") {
            arrCameraId = ids;
        } else {
            arrCameraId =  _.concat(ids, self.arrCameraId);
        }
        arrCameraId = _.sortedUniq(arrCameraId);
        self.arrCameraId = arrCameraId;
    }

    showDetailPopup(item:any,index:number){
        let scope: { allAlarmData: Array<AlarmResultInfo>,alarmData: AlarmResultInfo, index:number,$destroy: Function } = this.$scope.$new();
        scope.alarmData = item;
        scope.allAlarmData = this.personAlarmResult.Result;
        scope.index = index;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: AlarmDetail,
            scope: scope,
            title: "报警详情",
            area: ["560px", "470px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.PersonAlarmParams.startTime = item.value.startTime;
        this.PersonAlarmParams.endTime = item.value.endTime;
    }

    goBack(){
        this.$timeout(()=>{
            this.$scope.$emit('showItemPage',false);
        })
    }

    DrawRect() {
        this.analysisMmapServer.drawRect((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawCircle() {
        this.analysisMmapServer.drawCircle((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawPolygon() {
        this.analysisMmapServer.drawPolygon((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    ClearDraw() {
        this.arrCameraId = [];
        this.PersonAlarmParams.arrCameraId = [];
        this.analysisMmapServer.clearDraw();
    }

    private DrawCallBackMethod(points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        if (points.length === 0) {
            this.analysisMmapServer.removeDrawShape(geometry);
            return this.layerDec.warnInfo('框选区域不存在设备！');
        }
        let arr: Array<SystemPoint> = [];
        points.forEach((item: SystemPoint) => {
            if (item.ObjectType === ObjectType.Camera.value) {
                arr.push(item);
            }
        });
        this.checkArea(arr, geometry);
    }

    private checkArea(deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let scope: { deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle, $destroy: Function, selectCheckAreaCb: string } = this.$scope.$new();
        scope.deviceList = deviceList;
        scope.geometry = geometry;
        scope.selectCheckAreaCb = this.selectDeviceCb;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: PopupHtml,
            scope: scope,
            title: false,
            closeBtn: 0,
            skin: "no-scroll",
            area: ["300px", "300px"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    submitSearch(){
        let self = this;
        // 判断时间
        if (self.PersonAlarmParams.endTime < self.PersonAlarmParams.startTime) {
            self.layerDec.warnInfo('开始时间不能晚于结束时间!');
            return false;
        }
        // 设置查询设备id
        if(self.arrCameraId.length>0) {
            self.PersonAlarmParams.arrCameraId = self.arrCameraId;
        } else {
            let systemPointList:Array<any> = self.analysisMmapServer.getSystemPoint();
            let cameraList:Array<string> = [];
            _(systemPointList).forEach(function(value) {
                if (ObjectType.Camera.value === value.ObjectType) {
                    cameraList.push(value.ObjectID);
                }
            });
            self.PersonAlarmParams.arrCameraId = cameraList;
        }

        this.initLoadingPop();
        this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then((res:ResponseResult<any>)=>{
            if(res.code === 200){
                if(res.data.Result.length > 0) {
                    this.isShowDetail = true;
                    this.pageParams.currentPage = this.PersonAlarmParams.currentPage;
                    this.pageParams.pageCount = Math.ceil(res.count/this.PersonAlarmParams.pageSize);
                    this.pageParams.totalCount = res.count;
                    this.pageParams.pageSize = this.PersonAlarmParams.pageSize;
                    this.personAlarmResult = res.data as PersonAlarmResult;
                } else {
                    this.layerDec.info('没有报警');
                }
                this.ClearDraw();
            } else {
                this.layerDec.info('查询报警失败');
            }
            this.layer.close(this.currentLayerIndex);
        });

    }

    selectCamera(){
        let scope: { selectCameraList: Array<string>, $destroy: Function, selectCtrlCb: string } = this.$scope.$new();
        scope.selectCameraList = this.arrCameraId;
        scope.selectCtrlCb = this.selectDeviceCb;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: cameraTreePopupHtml,
            scope: scope,
            title: "摄像机选择",
            closeBtn:false,
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }

    closeResult(){
        this.isShowDetail = false;
    }
    initLoadingPop() {
        let scope: { $destroy: Function } = this.$scope.$new();
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: loadingAnalysisHtml,
            scope: scope,
            title: false,
            area: ['500px', "280px"],
            end: () => {
                scope.$destroy();
            }
        })
    }

    changeResultPage(i:number){
        this.PersonAlarmParams.currentPage = i;
        this.submitSearch();
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
     * @description 分析
     * @param item
     */
    clickAnalysisByFace(event:any, item:any, type:string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.Face;
        item.FacePath = item.CapFacePicUrl;
        storageParams.data = {
            AccessLog: item
        };
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
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }

    /**
     * @description 分析
     * @param item
     */
    clickAnalysisByFaceLibrary(event:any, item:any, type:string) {
        if (event) {
            event.stopPropagation();
        }
        let storageParams: AnalysisStorageParams = AnalysisDataType.FaceLibrary;
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
        this.$timeout(() => {
            this.handleStorage.removeSessionStorageData(storageParams.key);
        }, 3000);
    }
}

app.controller('PersonAlarmController',PersonAlarmController);