/**
 * Created by dell on 2017/3/16.
 */
import {app} from "../../common/app/main.app";
import 'css!module/log/css/log.css';

class LogPassController {
    static $inject = ['$scope'];

    constructor($scope :any) {
        $scope.export = exportFunc;

        $scope.dataRemote = "初始化一些文字信息aaaaaaaaaaaaaa";

        function exportFunc() {
        }
    }
}

app
    .controller('logPassController', LogPassController);