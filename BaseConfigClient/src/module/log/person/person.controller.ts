/**
 * Created by dell on 2017/3/16.
 */
import {app} from "../../common/app/main.app";
import 'css!module/log/css/log'; // 这里应该在$routerProvider的config里设置

class LogPersonController {
    static $inject = ['$scope'];

    constructor($scope: any) {
        $scope.export = exportFunc;

        $scope.dataRemote = "这是人员日志界面";

        function exportFunc() {
        }
    }
}

app
    .controller('logPersonController', LogPersonController);
