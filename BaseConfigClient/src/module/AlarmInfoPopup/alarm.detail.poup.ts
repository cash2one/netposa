/// <amd-dependency path="text!../fullPlayPopup/fullPlayPopup.html" name="popupHtml" />

import "../fullPlayPopup/fullPlayPopup.controller"
import 'css!./alarm.detail.css';
import {app} from "../common/app/main.app";
import {AlarmResultInfo, PersonAlarmResult} from "../../core/entity/PersonAlarmEnum";
import {ILayerDec} from "../common/factory/layerMsg.factory";
import "../common/factory/layerMsg.factory";
import {AlarmResponseState} from "../../core/enum/AlarmResponseState";
import {AlarmLogInfo} from "../../core/entity/AlarmLog";
import {ICameraService} from "../common/services/camera.service";
import "../common/services/camera.service";
import {BackResponseBody} from "../../core/params/result/ResponseResult";

declare let $: any, angular: any, popupHtml: any;

class AlarmDetailPoupController {
    static $inject = ['$scope', 'layerDec', 'cameraService', 'layer'];
    alarmNowInfo: AlarmResultInfo;
    currentLayerIndex: number;
    libIndex: number = 0;
    resultPageIndex: number = 0;
    resultPageCount: number;
    AlarmResponseState: { [key: string]: { value: string, text: string } } = AlarmResponseState;

    constructor(private $scope: any, private layerDec: ILayerDec, private cameraService: ICameraService, private layer: any) {
        this.alarmNowInfo = this.$scope.alarmData;
        this.resultPageCount = Math.ceil(this.alarmNowInfo.AlarmLogInfoArr.length / 4);
        console.log(this.alarmNowInfo);
    }

    resetAlarmResponseState() {
        this.alarmNowInfo.AlarmLogInfoArr.forEach((item: AlarmLogInfo) => {
            //if(item.PersonInfo.)
        })
    }

    fullPlay() {
        let cameraId = this.alarmNowInfo.AlarmLog.ObjectID;
        // if (!cameraId) {
        //     return this.layerDec.failInfo('未获取到摄像机信息！')
        // }
        this.cameraService.findPlayerForID(cameraId).then((res: BackResponseBody<any>) => {
            //if (res.code === 200) {
                let scope: { playerInfo: any, alarmInfo: AlarmResultInfo, $destroy: Function } = this.$scope.$new();
                scope.playerInfo = res.data;
                scope.alarmInfo = this.alarmNowInfo;
                this.currentLayerIndex = this.layer.open({
                    type: 1,
                    content: popupHtml,
                    scope: scope,
                    title: "报警详情",
                    area: ["854px", "522px"],
                    end: function () {
                        scope.$destroy();
                    }
                });
            //}
        })

    }

    changeLibResult(i: number) {
        this.libIndex = i;
    }

    changeResultPage(type: string) {
        if (type === 'next') {
            if ((this.resultPageIndex + 1) < this.resultPageCount) {
                this.resultPageIndex++;
                console.log(this.resultPageIndex)
            }
        }
        if (type === 'prev') {
            if ((this.resultPageIndex - 1) > 1) {
                this.resultPageIndex--;
            }
        }
    }

}

app.controller('alarmDetailPoupController', AlarmDetailPoupController);