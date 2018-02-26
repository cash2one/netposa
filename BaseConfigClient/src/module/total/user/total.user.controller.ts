/**
 * Created by tj on 2017/4/21.
 */

import {app} from "../../common/app/main.app";

import "./areaUser/areaUser.controller"
import "./unitUser/unitUser.controller"
import "./trendUser/trendUser.controller"


class TotalUserController{
    static $inject = ["$scope"];

    areaUserHtmlUrl:string;
    unitUserHtmlUrl:string;
    trendUserHtmlUrl:string;

    constructor($scope: any){
        let vm = this;
        console.log("用户统计页面");

        vm.areaUserHtmlUrl = "/module/total/user/areaUser/areaUser.html?v=" + new Date().getTime();
        vm.unitUserHtmlUrl = "/module/total/user/unitUser/unitUser.html?v=" + new Date().getTime();
        vm.trendUserHtmlUrl = "/module/total/user/trendUser/trendUser.html?v=" + new Date().getTime();
    }
}

app.controller('totalUserController', TotalUserController);