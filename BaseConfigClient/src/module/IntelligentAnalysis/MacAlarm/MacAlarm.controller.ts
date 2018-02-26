/// <amd-dependency path="text!../Analysis.camera.popup.html" name="popupHtml" />

import { app } from "../../common/app/main.app";
import 'css!../style/MacAlarm.css';
import { NPGisMapMain } from '../../common/map/map.main';
import { SystemPoint } from "../../../core/entity/SystemPoint";
import "../../common/services/analysis.service";
import { IAnalysisService } from "../../common/services/analysis.service";
import { IFaceAnalysisService, PageParams } from "../FaceAnalysis/Face.analysis.service";
import "../FaceAnalysis/Face.analysis.service";
import { ResponseResult } from "../../../core/params/result/ResponseResult";
import { PersonAlarmResult } from "../../../core/entity/PersonAlarmEnum";
import { IAnalysisMmapServer } from './../main/analysisMmap.server';
import './../main/analysisMmap.server';
import { FastData, getFastDataList, Enum, TimeLength, getWidowSize, ArrayUnique } from '../AnalysisEnum';
import { MacAlarmParams } from "./MacAlarmEnum";
import { init } from 'gulp-sourcemaps';
declare let $: any, popupHtml: any;
class MacAlarmController {
    $inject: Array<string> = ['$scope', '$rootScope', '$timeout', 'faceAnalysisService', 'analysisService', 'layer', 'analysisMmapServer'];
    FastDateList: Array<Enum<TimeLength>> = getFastDataList();
    FastDate: Enum<TimeLength> = FastData.today;
    systemPointList: Array<SystemPoint>;
    macAlarmParams: MacAlarmParams = new MacAlarmParams();
    isShowDetail: boolean = false;
    detailLayerWidth: number = getWidowSize().width - 60 - 300;
    personAlarmResult: PageParams = new PageParams();
    currentLayerIndex: number;
    constructor(private $scope: any,
        private $timeout: any,
        private faceAnalysisService: IFaceAnalysisService,
        private analysisService: IAnalysisService,
        private layer: any,
        private analysisMmapServer: IAnalysisMmapServer) {

        this.initParams()

        this.$timeout(() => {
            this.$scope.$emit('showItemPage', true);
        });
        this.$scope.$on('close.camera.popup', (event: any, cameraIds: Array<string>) => {
            if (Array.isArray(cameraIds)) {
                this.macAlarmParams.arrObjectId = cameraIds;
            }
            this.layer.close(this.currentLayerIndex);
        });

    }
    private initParams(){
        this.macAlarmParams.arrObjectId = [];
        this.macAlarmParams.startTime = FastData.today.value.startTime;
        this.macAlarmParams.endTime = FastData.today.value.endTime;
    }
    setFastDate(item: Enum<TimeLength>) {
        this.FastDate = item;
        this.macAlarmParams.startTime = item.value.startTime;
        this.macAlarmParams.endTime = item.value.endTime;
       
    }

    goBack() {
        this.$timeout(() => {
            this.$scope.$emit('showItemPage', false);
        })
    }

    //TODO 公共获取摄像机ID方法（地图框选）
    getCameraListForMap(points: Array<SystemPoint>) {
        points.forEach((point: SystemPoint) => {
            let type = point.ObjectType.toLocaleLowerCase();
            if (type=== 'wifi' || type === 'electronicfence' ) {
                this.macAlarmParams.arrObjectId.push(point.ObjectID)
            }
        });
        this.macAlarmParams.arrObjectId = ArrayUnique(this.macAlarmParams.arrObjectId);
        //this.selectCamera();
    }

    //TODO 矩形框选
    DrawRect() {
        this.ClearDraw();
        this.analysisMmapServer.drawRect((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }


    //TODO 圆形框选
    DrawCircle() {
        this.ClearDraw();
        this.analysisMmapServer.drawCircle((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }

    //TODO 多边形框选
    DrawPolygon() {
        this.ClearDraw();
        this.analysisMmapServer.drawPolygon((points: Array<SystemPoint>) => {
            this.getCameraListForMap(points)
        })
    }

    //TODO 清楚地图弹框
    ClearDraw() {
        this.analysisMmapServer.clearDraw();
    }
    getAllResult() {
        this.analysisService.macAlarm(this.macAlarmParams).then((res: ResponseResult<any>) => {
            if (res.code === 200) {
                this.faceAnalysisService.setFaceAnalysisDataList(res.data);
                this.$timeout(() => {
                    this.personAlarmResult.currentPage = 1;
                    this.personAlarmResult.pageSize = 36;
                    this.personAlarmResult = this.faceAnalysisService.getFaceAnalysisDataByPage(this.personAlarmResult);
                    this.isShowDetail = true;
                });
            }
        });

    }
    selectCamera() {
        let scope: { selectCameraList: Array<string>, $destroy: Function } = this.$scope.$new();
        scope.selectCameraList = this.macAlarmParams.arrObjectId;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: popupHtml,
            scope: scope,
            title: "摄像机选择",
            area: ["710px", "620px"],
            end: function () {
                scope.$destroy();
            }
        });
    }
    closeResult() {
        this.isShowDetail = false;
    }
    changeResultPage(i: number) {
        this.personAlarmResult.currentPage = i;
        this.$timeout(() => {
            this.personAlarmResult = this.faceAnalysisService.getFaceAnalysisDataByPage(this.personAlarmResult);
        })
    }

}

app.controller('MacAlarmController', MacAlarmController);