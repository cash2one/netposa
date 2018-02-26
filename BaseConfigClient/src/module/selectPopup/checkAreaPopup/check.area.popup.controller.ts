import {app} from "../../common/app/main.app";
import 'css!./check.area.css';
import {SystemPoint} from "../../../core/entity/SystemPoint";
import OverlayLayer = NPMapLib.Layers.OverlayLayer;
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;

class CheckAreaPopupController {
    static $inject: Array<string> = ['$scope', '$timeout'];
    deviceList: Array<any>;
    geometry: NPMapLib.Geometry.Polygon;
    selectCheckAreaCb: string;
    cbDataList: Array<string>  = [];

    constructor(private $scope: any, $timeout: any) {
        this.selectCheckAreaCb = $scope.selectCheckAreaCb || "close.check.area";
        this.deviceList = $scope.deviceList;
        this.geometry = $scope.geometry;
        this.cbDataList = $scope.cbDataList || [];
    }

    submitCheck() {
        let self = this;

        if (self.cbDataList.length > 0) {// 框选多种设备返回对象集合
            let listObj:any = {};
            for (let i = 0; i < self.cbDataList.length; i++) {
                listObj[self.cbDataList[i]] = [];
            }
            self.deviceList.forEach((point: SystemPoint) => {
                listObj[point.ObjectType].push(point.ObjectID);
            });
            self.$scope.$emit(self.selectCheckAreaCb, listObj, true, self.geometry)
        } else {
            let arr: Array<string> = [];
            self.deviceList.forEach((point: SystemPoint) => {
                arr.push(point.ObjectID);
            });
            self.$scope.$emit(self.selectCheckAreaCb, arr, true, self.geometry)
        }
    }

    deleteDevice(i: number) {
        this.deviceList.splice(i, 1);
    }

    cancel() {
        this.$scope.$emit(this.selectCheckAreaCb, [], false, this.geometry)
    }
}

app.controller('CheckAreaPopupController', CheckAreaPopupController);