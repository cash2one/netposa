import 'css!./track.popup.css';
import {app} from "../../common/app/main.app";
import {Result} from "../../../core/entity/FaceTrackEnum";
class TrackPopupController{
    static $inject = ['$scope'];
    traceData:Result;
    constructor(private $scope:any){
        this.traceData = $scope.traceData;
        console.log($scope.traceData)
    }
}

app.controller('TrackPopupController',TrackPopupController);