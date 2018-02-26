import 'css!./mac.popup.css';
import {app} from "../../common/app/main.app";
import {Result} from "../../../core/entity/FaceTrackEnum";
class MacPopupController{
    static $inject = ['$scope'];
    traceData:Result;
    constructor(private $scope:any){
        this.traceData = $scope.traceData;
        console.log($scope.traceData)
    }
}

app.controller('MacPopupController',MacPopupController);