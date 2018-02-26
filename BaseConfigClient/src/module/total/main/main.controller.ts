/**
 * Created by dell on 2017/3/21.
 */
import 'css!module/total/css/total.css';

import {app} from "../../common/app/main.app";
import {IRouterConfig} from "../../common/router/router";
import RouterService from "../../common/router/router.service";

class TotalMainController {
    static $inject = ["$scope"];

    moduleItems: Array<any>;
    isCollapse: boolean;

    constructor($scope: any) {
        let vm = this;
        vm.isCollapse = false;
        let moduleItems = RouterService.getInstance().getModuleItems('total');
        console.error("进入total页面", moduleItems);
        vm.moduleItems = moduleItems;
    }

}

app
    .controller('totalMainController', TotalMainController);