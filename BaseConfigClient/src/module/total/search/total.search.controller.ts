/**
 * Created by dell on 2017/4/21.
 */

import {app} from "../../common/app/main.app";

import "./causeSearch/causeSearch.controller"
import "./areaSearch/areaSearch.controller"
import "./trendSearch/trendSearch.controller"

class TotalSearchController{
    static $inject = ["$scope","totalService","echartService"];

    causeSearchHtmlUrl:string;
    areaSearchHtmlUrl:string;
    trendSearchHtmlUrl:string;

    constructor($scope: any){
        console.log("进入search界面");
        let vm = this;

        vm.causeSearchHtmlUrl = "/module/total/search/causeSearch/causeSearch.html?v=" + new Date().getTime();
        vm.areaSearchHtmlUrl = "/module/total/search/areaSearch/areaSearch.html?v=" + new Date().getTime();
        vm.trendSearchHtmlUrl = "/module/total/search/trendSearch/trendSearch.html?v=" + new Date().getTime();
    }
}


app.controller('totalSearchController', TotalSearchController);
