/// <amd-dependency path="text!../../mapPoint/wifiMapPoint/popul.wifi.html" name="populWifi" />
/// <amd-dependency path="text!../../mapPoint/cameraMapPoint/cameraMapPoint.html" name="populCamera" />
import { app } from "../../common/app/main.app";
import 'css!../../mapPoint/wifiMapPoint/style/wifiPopul.css'

import '../../common/services/map.service';
import '../../mapPoint/wifiMapPoint/popul.wifi.controller';
import "es6-promise";
import { NPGisMapMain } from '../../common/map/map.main';
import { MapConfigJsonEnum } from "../../common/enum/MapConfigJsonEnum";
import { MapConfigModel } from '../../common/map/core/model/map.config.model';
import { IMapService } from '../../common/services/map.service';
import { SystemPoint } from "../../../core/entity/SystemPoint";
import '../../common/services/resource.service'
import { IResourceService } from '../../common/services/resource.service'
import OverlayLayer = NPMapLib.Layers.OverlayLayer;
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;

declare let populWifi: any, populCamera: any;
import '../../mapPoint/cameraMapPoint/cameraMapPoint.controller';

//import {Num} from "../../../../../../BaseConfigNode/BaseConfigNode/src/mock/ResourceTestData";
class ResourceMapController {
    static $inject = ['$scope', '$timeout', 'mylayer', 'i18nFactory', 'mapService', '$q', 'resourceService'];
    mapId: string = "ResourceMap";
    mapConfigName: string = MapConfigJsonEnum.MAPCONFIG;
    map: NPGisMapMain = null;
    mapPointData: Array<any>;
    mapLayer: any; //图层
    constructor(private $scope: any,
        private $timeout: Function,
        private mylayer: any,
        private i18nFactory: any,
        private mapService: IMapService,
        private $q: any,
        private resourceService: IResourceService) {
        this.map = null;
        this.$scope.$on("$destroy", () => {
            if (this.map) {
                console.log(this.map.destroy);
                this.map.destroy();
            }
        });
        this.initMap();
        $scope.$emit('getMapResource');
        $scope.$on('drawMap', (event: any, res: any) => {
            let data = res.series ? res.series : res;
            if (data.length) {
                this.mapPointData = [];
                data.forEach((i: any) => {
                    if (i && i.flow) {
                        let data: any = {
                            count: i && i.flow ? i.flow : 0,
                            lon: i && i.longitude ? i.longitude : 0,
                            lat: i && i.latitude ? i.latitude : 0
                        }
                        if (data && data.lon && data.lat) {
                            this.mapPointData.push(data);
                        }
                    }
                });
                // console.log(this.mapPointData);
                this.addHeatMapLayer();
            }
        })
    }

    initMap() {
        this.mapService.getMapConfig(this.mapConfigName).then((data: MapConfigModel) => {
            this.map = new NPGisMapMain();
            this.map.init(this.mapId, data);
            this.getLayer();
            this.addHeatMapLayer();
        });
    }

    //框选
    drawRect() {
        this.map.selectRectangle((points: Array<SystemPoint>) => {
            console.log(points)
        })
    }

    addHeatMapLayer() {
        let arr = this.mapPointData as Array<any>;
        if (this.map && Array.isArray(arr) && arr.length > 0) {
            this.map.addheatlayer(arr);
        }
    }

    //获取图层信息
    getLayer() {
        let arr = this.map.getLayers();
    }

    drawMark() {
        let arr = this.mapPointData;
        if (arr.length >= 1) {
            this.map.renderMarkers(arr, this.bindMapPoinitEvent());
            this.getLayer()
        }
    }

    getDevicedata(marker: NPMapLib.Symbols.ClusterMarker) {
        marker.markType = (marker.markType).toLowerCase();
        return this.resourceService.getDeviceById(marker.deviceID, marker.markType)
    }

    pointClick(marker: NPMapLib.Symbols.ClusterMarker) {
        this.getDevicedata(marker).then((res) => {
            this.poupsTypeAction(marker, res.data[0])
        })
    }

    private poupsTypeAction(marker: NPMapLib.Symbols.ClusterMarker, info: any) {
        let cameraLayerId = 'populCamera';
        let mapPoint = marker.getPosition();
        let pagePoint = this.map.pointToPixel(mapPoint);
        pagePoint.y -= 300;
        let p = this.map.pixelToPoint(pagePoint);
        this.map.setCenter(p, this.map.getZoom());
        let p2 = this.map.pointToPixel(this.map.getCenter());
        p2.y += 300;
        let scope: { PointDeTail: any, layerId: string, $destroy: Function, position: number } = this.$scope.$new();
        scope.layerId = cameraLayerId;
        scope.PointDeTail = info;
        scope.position = p2;
        switch (marker.markType) {
            case 'camera':
                this.mylayer.open({
                    content: populCamera,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 330), width: 540, height: 330 },
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case 'wifi':
                this.mylayer.open({
                    content: populWifi,
                    scope: scope,
                    ID: 'populWifi',
                    AreaAndPosition: { left: 100, top: 100, width: 853, height: 502 },
                    end: () => {
                        scope.$destroy()
                    }
                });
                break
        }
    }

    bindMapPoinitEvent() {
        return {
            click: (marker: NPMapLib.Symbols.ClusterMarker) => {
                this.pointClick(marker)
            }
        } as OverlayLayerOpts
    }

    /**
     * @description 图层管理操作
     * @param {string} type
     * @constructor
     */
    FCcheckItem(type: string) {
        console.log(type);

    }
}

app.controller('ResourceMapController', ResourceMapController);