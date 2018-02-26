/**
 * Created by dell on 2017/4/21.
 */

import {app} from "../../common/app/main.app";

import "./areaFlow/areaFlow.controller"
import "./deviceFlow/deviceFlow.controller"

class TotalFlowController{
    static $inject = ["$scope"];
    moduleName:string;

    areaFlowHtmlUrl:string;
    deviceFlowHtmlUrl:string;



    constructor($scope: any){
        let vm = this;
        vm.moduleName = "流量统计页面";
        console.error(vm.moduleName);

        vm.areaFlowHtmlUrl = "/module/total/flow/areaFlow/areaFlow.html?v=" + new Date().getTime();
        vm.deviceFlowHtmlUrl = "/module/total/flow/deviceFlow/deviceFlow.html?v=" + new Date().getTime();
    }
}

app.controller('totalFlowController', TotalFlowController);