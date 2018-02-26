/**
 * Created by dell on 2017/3/23.
 */
import "angular";
import {app} from "../../common/app/main.app";
import 'css!module/baseconfig/css/baseconfig.css';

declare let angular: any;
import routerService from '../../common/router/router.service';
import {IRouterConfig} from "../../common/router/router";

class BaseConfigMainController {
    static $inject: Array<string> = ['$scope', '$state'];

    moduleItems: Array<any>;
    others: Array<any>;
    isCollapse: boolean;
    testItems: any;
    currentRouter: string;
    expanderTitle: string;

    constructor($scope: any, private $state: any) {
        let vm = this;
        let moduleItems = routerService.getInstance().getModuleItemsWithGroup('baseconfig');
        let others: Array<IRouterConfig> = [];
        let i, len;
        for (i = 0, len = moduleItems.length; i < len; i++) {
            if (!moduleItems[i].children) {
                others = others.concat(moduleItems.splice(i, 1));
                i--;
                len--;
            }
        }
        vm.others = others;
        vm.moduleItems = moduleItems;
        vm.currentRouter = $state.$current.name;
        vm.isCollapse = false;
    }

    private resetItems(list: Array<IRouterConfig>) {

    }
}

app.controller('baseConfigMainController', BaseConfigMainController);