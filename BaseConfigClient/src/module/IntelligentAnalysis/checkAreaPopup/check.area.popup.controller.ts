import {app} from "../../common/app/main.app";
import 'css!./check.area.css';
import {SystemPoint} from "../../../core/entity/SystemPoint";

class CheckAreaPopupController {
    static $inject: Array<string> = ['$scope', '$timeout'];
    deviceList: Array<any>;
    geometry: NPMapLib.Geometry.Polygon;

    constructor(private $scope: any, $timeout: any) {
        this.deviceList = $scope.deviceList;
        this.geometry = $scope.geometry;
        console.log(this.deviceList)
    }

    submitCheck() {
        this.$scope.$emit('close.check.area', this.geometry, true, this.deviceList)
    }
    deleteDevice(i:number){
        this.deviceList.splice(i,1);
    }
    cancel() {
        this.$scope.$emit('close.check.area', this.geometry)
    }
}

app.controller('CheckAreaPopupController', CheckAreaPopupController);