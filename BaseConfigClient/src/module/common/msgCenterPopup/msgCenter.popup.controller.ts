/**
 * Created by tj on 2017/7/25.
 */
import {app} from "../app/main.app";
declare let angular : any;
import 'css!./msgCenter.popup.css';

class MsgCenterPopupController{
    static $inject = ['$scope','layer' ];

    //文件名
    fileName:string;
    //关闭弹窗
    closePopup:Function;

    constructor ($scope : any,layer : any){
        let vm = this;
        vm.fileName = $scope.fileName;
        vm.closePopup = closePopup;

        function closePopup(){
            layer.closeAll($scope.currentIndex);
        }
    }
}
app.controller('msgCenterPopupController' , MsgCenterPopupController);