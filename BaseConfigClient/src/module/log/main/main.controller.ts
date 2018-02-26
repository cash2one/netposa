/**
 * Created by dell on 2017/3/20.
 */
import {app} from "../../common/app/main.app";
import RouterService from '../../common/router/router.service';

class LogMainController {
    static $inject = ['$scope'];

    constructor($scope: any) {
        $scope.moduleItems = RouterService.getInstance().getModuleItems('log');
    }
}

app
    .controller('logMainController', LogMainController);