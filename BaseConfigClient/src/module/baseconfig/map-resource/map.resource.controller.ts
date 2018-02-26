import {app} from "../../common/app/main.app";
import "css!../style/map-resource.css";
import "./maplayer.controller"
import "./mappoint.controller";
import {IMapService} from "../../common/services/map.service";
import "../../common/services/map.service";
import {MapConfigParameterExt} from "../../../core/entity/MapConfigParameter";
import {BackResponseBody} from "../../../core/params/result/ResponseResult";
import PortraitTool from "../../common/portrait-tool";

declare let angular: any;

class MapResourceController {
    static $inject = ['$scope', 'mapService', '$timeout'];
    selectIndex: number = 1;
    mapServerInfo: MapConfigParameterExt = new MapConfigParameterExt();

    constructor(private $scope: any, private mapService: IMapService, private $timeout: any) {
        this.getMapConfig()
    }

    setSelectTab(index: number) {
        if (index !== this.selectIndex) {
            this.selectIndex = index;
        }

    }

    getMapConfig() {
        this.mapService.getMapServerData().then((res: BackResponseBody<MapConfigParameterExt>) => {
            if (res.code === 200 && res.data) {
                this.mapServerInfo = PortraitTool.extend({}, this.mapServerInfo, res.data);
            }
            console.log(this.mapServerInfo);
        })
    }

    save() {
        this.mapService.editMapConfig(this.mapServerInfo).then((res: BackResponseBody<boolean>) => {
            if (res.code !== 200) {
                console.error('保存失败，', res)
            }
        })
    }
}

app.controller("baseConfigMapResourceController", MapResourceController);


