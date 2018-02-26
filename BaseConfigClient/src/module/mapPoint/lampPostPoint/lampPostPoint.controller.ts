import {app} from "../../common/app/main.app";
import 'css!./style/index.css';
import {LayerType} from '../../../core/enum/LayerType';
import {ObjectType} from '../../../core/enum/ObjectType';

declare let $: any;

class LampPostPointController {
    static $inject = ['$scope', '$timeout', 'mylayer'];

    deviceList: Array<any>;
    position: any;

    constructor(private $scope: any,
                private $timeout: Function,
                private mylayer: any) {
        this.position = this.$scope.position;
        this.deviceList = this.$scope.deviceList;
    }

    close() {
        this.mylayer.close(this.$scope.layerId);
    }

    selectChild(item: any) {
        // 伪造marker
        let marker = this.$scope.marker;
        let info: any = item;
        switch(item.iconType) {
            case "carCamera": item.LayerType=LayerType.CarCamera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "car": item.LayerType=LayerType.CarCamera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "face": item.LayerType=LayerType.PortraitCamera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "faceCamera": item.LayerType=LayerType.FaceCamera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "camera": item.LayerType=LayerType.Camera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "hd": item.LayerType=LayerType.HighCamera.value,item.ObjectType=ObjectType.Camera.value; break;
            case "wifi": item.LayerType=LayerType.WiFi.value,item.ObjectType=ObjectType.Wifi.value; break;
            case "efence": item.LayerType=LayerType.ElectronicFence.value,item.ObjectType=ObjectType.ElectronicFence.value; break;
        }
        item.ObjectID = item.ID;
        item.Lon = marker.location.lon;
        item.Lat = marker.location.lat;
        this.mylayer.close(this.$scope.layerId);
        this.$scope.childClick(item);
    }

}

app.controller('lampPostPointController', LampPostPointController);