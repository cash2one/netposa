
/**
 * Created by Liubo on 2017/9/22 0022.
 */
import 'css!./macTaskPopup.css';
import { app } from "../app/main.app";
import { IAlarmPopupCache } from '../factory/alarmDisposePopupCache.factory';
import '../factory/alarmDisposePopupCache.factory';
import {MacMonitor} from "../../../core/server/TaskModel";
class RfidAlarmPopupController {
    static $inject = ['$scope','$rootScope', '$timeout', 'alarmPopupCache'];
    model: any;
    task:MacMonitor;
    constructor(
        private $scope: any,
        private $rootScope:any,
        private $timeout: Function,
        private alarmPopupCache: IAlarmPopupCache
    ) {
        this.model = this.$scope.data;
        this.task = this.$scope.task;
    }
    closeAlarmPopup(){
        this.$rootScope.$emit('closeAlarmPopup')
    }
    changeAlarmPopupStatus(flag:boolean){
        this.alarmPopupCache.setAlarmPopupState(flag)
    }
}

app.controller('rfidAlarmPopupController', RfidAlarmPopupController);