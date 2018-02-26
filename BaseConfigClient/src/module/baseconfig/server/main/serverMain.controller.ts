/**
 * Created by dell on 2017/3/23.
 */
declare var require: any;
import {app} from "../../../common/app/main.app";
import 'css!module/baseconfig/css/baseconfig.css';

import routerService from '../../../common/router/router.service';

class BaseConfigServerMainController {
    static $inject:Array<string> = ['$scope'];
    serverModuleItems:any;
    constructor($scope: any) {
        let vm =this;
        vm.serverModuleItems = routerService.getInstance().getModuleItems('baseconfig.server');
        console.log($scope.moduleItems);
    }
}

app.controller('baseConfigServerMainController', BaseConfigServerMainController);