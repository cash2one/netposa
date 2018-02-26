import {app} from "../../common/app/main.app";
import {MapLayerIcon, MapLayerIconEnum} from "../../../core/enum/MapLayerIcon";

declare let angular: any;

class MaplayerController {
    static $inject = ['$scope', '$timeout'];
    layerList: Array<MapLayerIconEnum> = [];

    constructor(private $scope: any, private $timeout: any) {
        this.resetLayerList()
    }

    resetLayerList() {
        let arr = [] as Array<MapLayerIconEnum>;
        let layerMap = angular.copy(MapLayerIcon);
        for (let k in layerMap) {
            arr.push(layerMap[k])
        }
        this.$timeout(() => {
            this.layerList = arr;
        })

    }
}

app.controller("maplayerController", MaplayerController);