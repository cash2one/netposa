/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../common/app/main.app";

import "./areaTask/areaTask.controller"
import "./libTask/libTask.controller"

class TotalTaskController{
    static $inject = ["$scope"];

    areaTaskHtmlUrl:string;
    libTaskHtmlUrl:string;

    constructor($scope: any){
        var vm = this;
        console.error("任务统计页面");

        vm.areaTaskHtmlUrl = "/module/total/task/areaTask/areaTask.html?v=" + new Date().getTime();
        vm.libTaskHtmlUrl = "/module/total/task/libTask/libTask.html?v=" + new Date().getTime();
    }
}

app.controller('totalTaskController', TotalTaskController);