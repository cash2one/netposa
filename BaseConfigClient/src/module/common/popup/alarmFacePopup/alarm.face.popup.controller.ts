import { AngularScope } from '../../types/baseAngularScope';
import { app } from '../../app/main.app';
import "css!./alarmfacepopup.css";
import { SearchAlarmLogResult, AlarmLogInfo } from '../../../../core/server/AlarmModule';

export interface AlarmFacePopupControllerParams extends AngularScope{
    faceAlarmData: SearchAlarmLogResult;
}

class AlarmFacePopupController {
    static $inject = ['$scope'];
    faceAlarmData: SearchAlarmLogResult;
    currentSelectItem: AlarmLogInfo;

    constructor(private $scope: AlarmFacePopupControllerParams,private mylayer:any) {
        this.faceAlarmData = this.$scope.faceAlarmData;
        // 默认选中第一个
        this.currentSelectItem = this.faceAlarmData.AlarmLogInfoArr[0];
    }

    chooseAlarmLogInfo(item: AlarmLogInfo){
        this.currentSelectItem = item;
    }
}

app.controller('commonAlarmFacePopupController', AlarmFacePopupController);