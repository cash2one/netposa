/**
 * Created by dell on 2017/3/16.
 */
import {app} from "../../common/app/main.app";
import 'css!module/log/css/log';

class LogAlarmController {
    static $inject = ['$scope'];

    constructor($scope: any) {
        $scope.export = exportFunc;

        $scope.dataRemote = "这是报警管理页面";

        function exportFunc() {
        }
    }
}

app
    .controller('logAlarmController', LogAlarmController);