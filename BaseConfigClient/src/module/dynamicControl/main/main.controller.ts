/*
 * Update by zyh on 2017 06 03
 */

import {app} from "../../common/app/main.app";
import RouterService from '../../common/router/router.service';
import "../mainLeft/mainLeft.controller";
import "../mainCenter/mainCenter.controller";
import "../mainRight/mainRight.controller";

import 'css!module/dynamicControl/css/dynamicControl.css';
//import "css!./technology-stack-layout.css";
class DynamicControlController {
    static $inject = ['$scope'];

    moduleItems : Array<any>;
    leftHtmlUrl : string;
    centerHtmlUrl : string;
    rightHtmlUrl : string;


    constructor() {
        this.moduleItems = RouterService.getInstance().getModuleItems('DynamicControl');

        this.leftHtmlUrl = "/module/dynamicControl/mainLeft/mainLeft.html?v=" + new Date().getTime();

        this.centerHtmlUrl = "/module/dynamicControl/mainCenter/mainCenter.html?v=" + new Date().getTime();

        this.rightHtmlUrl = "/module/dynamicControl/mainRight/mainRight.html?v=" + new Date().getTime();
    }

}

app.controller('dynamicControlController', DynamicControlController);