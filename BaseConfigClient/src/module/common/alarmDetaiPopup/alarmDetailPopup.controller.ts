import {app} from "../../common/app/main.app";
import {CommonAlarmDetailPopupParams} from "./alarmDetailPopup.factory";
import {VehicleAlarmLog} from "../../../core/server/AlarmModule";
class AlarmDetailPopupController {
    static $inject = ['$scope'];

    vehicleAlarmLog:VehicleAlarmLog;
    constructor(private $scope: CommonAlarmDetailPopupParams) {
        this.vehicleAlarmLog = $scope.popupDatas;
    }

    /**
     *  报警处理点击
     * @time: 2017-11-30 15:22:20
     * @params: dealType 处理结果，有无效果
     * @return:
     */
    dealAlarm = (dealType:boolean)=>{
        console.log(dealType?"有效":"无效");
        this.$scope.closePopup(dealType);
    }
}


app.controller('alarmDetailPopupController', AlarmDetailPopupController);
