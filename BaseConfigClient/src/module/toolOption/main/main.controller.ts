/**
 * Created by tj on 2017/7/1.
 */

import "css!../css/toolOption.css";
import {app} from "../../common/app/main.app";
import {IRouterConfig} from "../../common/router/router";
import RouterService from "../../common/router/router.service";

class ToolOptionController {
    static $inject = ['$scope'];

    moduleItems: Array<any>;
    isCollapse: boolean;

    constructor($scope: any) {
        let vm = this;
        vm.isCollapse = false;

        let moduleItems = RouterService.getInstance().getModuleItems('toolOption');
        console.log(moduleItems, "==========================================");
        console.error("进入选项模块名", moduleItems);
        // 取出不包含children的
        vm.moduleItems = moduleItems;
    }
}

app.controller('toolOptionController', ToolOptionController);