/**
 * Created by Liubo on 2017/9/22 0022.
 */
import 'css!./carAlarmPopup.css';
import { app } from "../app/main.app";
import { IAlarmPopupCache } from '../factory/alarmDisposePopupCache.factory';
import '../factory/alarmDisposePopupCache.factory';
import {CarMonitor} from "../../../core/server/TaskModel";
declare let $: any, _: any;

class carAlarmPopupController {
    static $inject = ['$scope','$rootScope', '$timeout','alarmPopupCache'];
    model:any;
    task:CarMonitor;
    constructor(
        private $scope:any,
        private $rootScope: any,
        private $timeout: Function,
        private alarmPopupCache:IAlarmPopupCache
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

app.controller('carAlarmPopupController', carAlarmPopupController);