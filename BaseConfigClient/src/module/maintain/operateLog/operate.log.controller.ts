/**
 * Created by dell on 2017/4/24.
 */
import {app} from "../../common/app/main.app";

import "./actionLog/actionLog.controller";
import "./runLog/runLog.controller";
import "css!module/maintain/css/maintain-operateLog.css";
import "../../common/services/maintain.service"

export interface deviceObject{
    type:string;
    path:string;
    name:string;
    status:boolean;
}

export const deviceArray = [
    {type:"actionLog", name:"操作日志", path:"/module/maintain/operateLog/actionLog/actionLog.html?v=" + new Date().getTime(), status:true},
    {type:"runLog", name:"运行日志", path:"/module/maintain/operateLog/runLog/runLog.html?v=" + new Date().getTime(), status:false}
] as Array<deviceObject>;

class OperateLogController{

    static $inject = ['$scope'];

    deviceArray: Array<deviceObject> = deviceArray;
    htmlUrl:string = "/module/maintain/operateLog/actionLog/actionLog.html";

    constructor(
        private $scope:any
    ){
    }

    public switchDevicePage(deviceName:string){
        if(deviceName){
            for(let i=0;i<this.deviceArray.length;i++){
                if(this.deviceArray[i].type == deviceName){
                    this.deviceArray[i].status = true;
                    this.htmlUrl = this.deviceArray[i].path;
                }else{
                    this.deviceArray[i].status = false
                }
            }
        }
    }

}

app.controller("operateLogController", OperateLogController);