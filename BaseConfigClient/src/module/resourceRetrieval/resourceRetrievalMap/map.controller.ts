/// <amd-dependency path="text!../../mapPoint/wifiResourcePoint/tpl.html" name="populWifi" />
/// <amd-dependency path="text!../../mapPoint/cameraMapPoint/cameraMapPoint.html" name="populCamera" />
/// <amd-dependency path="text!../../mapPoint/efResourcePoint/efResourcePoint.html" name="efResourcePointHtml" />
/// <amd-dependency path="text!../../selectPopup/checkAreaPopup/check.area.popup.html" name="PopupHtml" />
/// <amd-dependency path="text!../../mapPoint/cameraCarMapPoint/cameraMapPoint.html" name="populCarCamera" />
/// <amd-dependency path="text!../../mapPoint/lampPostPoint/lampPostPoint.html" name="populLampPostPoint" />
/// <amd-dependency path="text!../../mapPoint/videoMapPoint/tpl.html" name="videoMapPointHtml" />
import {app} from "../../common/app/main.app";
import "es6-promise";
import "npgis2";
import {NPGisMapMain} from "../../common/map/map.main";
import {MapConfigJsonEnum} from "../../common/enum/MapConfigJsonEnum";
import {MapConfigModel} from "../../common/map/core/model/map.config.model";

// 服务
import "../../common/services/map.service";
import {IMapService} from "../../common/services/map.service";
import {IResourceRetrievalService} from "../../common/services/resourceRetrieval.service";

// 弹框
import "../../mapPoint/cameraMapPoint/cameraMapPoint.controller";
import "../../mapPoint/wifiResourcePoint/wifiResourcePoint.controller";
import "../../mapPoint/cameraCarMapPoint/cameraMapPoint.controller";
import "../../mapPoint/efResourcePoint/efResourcePoint.controller";
import "../../mapPoint/lampPostPoint/lampPostPoint.controller";
import "../../mapPoint/videoMapPoint/videoMapPoint.controller";
import '../../selectPopup/checkAreaPopup/check.area.popup.controller';

import {SystemPoint} from "../../../core/entity/SystemPoint";
import OverlayLayer = NPMapLib.Layers.OverlayLayer;
import OverlayLayerOpts = NPMapLib.Layers.OverlayLayerOpts;
import {ResponseResult} from "../../../core/params/result/ResponseResult";
import '../../common/factory/layerMsg.factory';
// 设备类型 枚举
import DeviceEnum from '../../../core/enum/DeviceEnum';
import {LayerType} from '../../../core/enum/LayerType';
import {ObjectType} from '../../../core/enum/ObjectType';
import * as _ from "lodash";
import {LampWithDevice} from "../../../core/server/LampWithDevice";

declare let populWifi: any, populCamera: any, PopupHtml: any, efResourcePointHtml: any, populCarCamera: any, populLampPostPoint: any, videoMapPointHtml: any, angular:any;

class ResourceSearchMapController  {
    static $inject = ["$scope", "$timeout", "mylayer", "layer", "i18nFactory", "mapService", "$q", "resourceRetrievalService", "layerDec"];

    mapId: string = "resourceSearchMap";
    mapConfigName: string = MapConfigJsonEnum.MAPCONFIG;
    map: NPGisMapMain = null;
    centerPoint: any; // 存储地图初始化点位复位使用
    initZoom: number; // 存储地图初始化层级复位使用
    totalDevice: Array<SystemPoint>;
    showAllDevice: boolean = true;
    showVideo: boolean = true;
    showfacebayonet: boolean = true;
    showcarvoideo: boolean = true;
    showpersonbayonet: boolean = true;
    showcarbayonet: boolean = true;
    showWifi: boolean = true;
    showLamp: boolean = true;
    showElectronicfence: boolean = true;
    currentLayerIndex: number;
    static2D: boolean = true;
    selectType: string = "All";
    selectDeviceCb: string = "close.device.popup";
    selectDeviceIds: Array<string> = [];

    constructor(private $scope: any,
                private $timeout: Function,
                private mylayer: any,
                private layer: any,
                private i18nFactory: any,
                private mapService: IMapService,
                private $q: any,
                private resourceRetrievalService: IResourceRetrievalService,
                private layerDec: any) {
        let self = this;

        this.map = null;
        this.initMap();

        this.$scope.$on("$destroy", () => {
            if (this.map) {
                this.map.destroy();
            }
            this.mylayer.destroy();
        });

        this.$scope.$on('device_popup_layer', (event: any, item: any, type: string) => {
            this.getDeviceInfo(item, 3);
        });

        // 监听广播事件--框选设备类型
        self.$scope.$on("search-device-type", function (event: any, type: string) {
            switch (type) {
                case "Camera": self.selectType = ObjectType.Camera.value; break;
                case "RmpGate": self.selectType = ObjectType.RmpGate.value; break;
                case "EFENCE": self.selectType = ObjectType.ElectronicFence.value; break;
                case "WiFi": self.selectType = ObjectType.Wifi.value; break;
                default : self.selectType = "All";
            }
        });

        // 监听广播事件--返回框选设备id
        self.$scope.$on(self.selectDeviceCb, (event: any, deviceIds: Array<string>, status:boolean, geometry?: NPMapLib.Geometry.Polygon) => {
            if (status) {// 选中
                // 判断设备数量
                if (deviceIds.length === 0) {
                    self.layerDec.warnInfo('框选区域不存在摄像机设备！');
                    self.map.removeOverlay(geometry);
                }else {
                    if (self.selectType === "All") { // 快速检索
                        self.$scope.$broadcast("search-device-id", deviceIds, self.selectType);
                    }else { // 高级检索
                        let arrDeviceIds: Array<string> = angular.copy(self.selectDeviceIds);
                        arrDeviceIds = _.concat(deviceIds, arrDeviceIds);
                        arrDeviceIds = _.uniq(arrDeviceIds);
                        self.selectDeviceIds = arrDeviceIds;
                    }
                }
            } else {//  取消
                self.map.removeOverlay(geometry);
            }
            self.layer.close(self.currentLayerIndex);
        });

        // 监听广播事件--清除框选
        self.$scope.$on("map-clear-draw", (event: any, data:string) => {
            self.map.clearDraw();
            self.selectDeviceIds = [];
        });

        // 地图周边设备
        self.$scope.$on("map-peripheral-information", (event: any, data:string, callback: any) => {
            self.map.addCircleSearchControl(data,callback,5000,5000);
        });
    }

    /**
     * 初始化地图,给各级地图发地图数据
     */
    initMap() {
        this.mapService.getMapConfig(this.mapConfigName).then((data: MapConfigModel) => {
            this.map = new NPGisMapMain();
            this.map.init(this.mapId, data);
            this.initSystemPoint();
            this.centerPoint = this.map.getCenter();
            this.initZoom = this.map.getZoom();
            this.$scope.map = this.map;

            this.$timeout(() => {
                if (!!this.map) {
                    this.$scope.$broadcast('map.resourceRetrieval', this.map);
                }
            }, 3000);
        })
    }

    checkLayerItem(layerName: string) {
        switch (layerName) {
            case "showAllDevice":
                this.showAllDevice = !this.showAllDevice;
                if (this.showAllDevice) {
                    this.showVideo = true;
                    this.showfacebayonet = true;
                    this.showcarvoideo = true;
                    this.showpersonbayonet = true;
                    this.showcarbayonet = true;
                    this.showWifi = true;
                    this.showLamp = true;
                    this.showElectronicfence = true;
                } else {
                    this.showVideo = false;
                    this.showfacebayonet = false;
                    this.showcarvoideo = false;
                    this.showpersonbayonet = false;
                    this.showcarbayonet = false;
                    this.showWifi = false;
                    this.showLamp = false;
                    this.showElectronicfence = false;
                }
                this.setLayerStyleByDeviceType("all", this.showAllDevice);
                break;
            case "showVideo":
                this.showVideo = !this.showVideo;
                this.setLayerStyleByDeviceType(LayerType.HighCamera.value, this.showVideo);
                break;
            case "showfacebayonet":
                this.showfacebayonet = !this.showfacebayonet;
                this.setLayerStyleByDeviceType(LayerType.FaceCamera.value, this.showfacebayonet);
                break;

            case "showcarvoideo":
                this.showcarvoideo = !this.showcarvoideo;
                this.setLayerStyleByDeviceType(LayerType.CarCamera.value, this.showcarvoideo);
                break;
            case "showpersonbayonet":
                this.showpersonbayonet = !this.showpersonbayonet;
                this.setLayerStyleByDeviceType(LayerType.PortraitCamera.value, this.showpersonbayonet);
                break;
            case "showcarbayonet":
                this.showcarbayonet = !this.showcarbayonet;
                this.setLayerStyleByDeviceType(LayerType.RmpGate.value, this.showcarbayonet);
                break;
            case "showWifi":
                this.showWifi = !this.showWifi;
                this.setLayerStyleByDeviceType(LayerType.WiFi.value, this.showWifi);
                break;
            case "showLamp":
                this.showLamp = !this.showLamp;
                this.setLayerStyleByDeviceType(LayerType.LampPost.value, this.showLamp);
                break;
            case "showElectronicfence":
                this.showElectronicfence = !this.showElectronicfence;
                this.setLayerStyleByDeviceType(LayerType.ElectronicFence.value, this.showElectronicfence);
                break;
        }
    }

    private setLayerStyleByDeviceType(layerName: string, style: boolean) {
        this.map.setOverlayShowByLayerType(layerName, style);
    }

    private initSystemPoint() {
        this.getSystemPoint().then((res: Array<SystemPoint>) => {
            this.map.renderMarkers(res, this.bindMapPoinitEvent());
        })
    }

    private DrawCallBackMethod(points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let self = this;
        let arr: Array<SystemPoint> = [];
        points.forEach((item: SystemPoint) => {
            if ((self.selectType === "All")||(item.ObjectType === self.selectType)) {
                arr.push(item);
            }
        });
        if (arr.length === 0) {
            self.map.removeOverlay(geometry);
            self.layer.msg("框选区域不存在设备！");
            return;
        } else {
            self.checkArea(arr, geometry);
        }
    }

    private checkArea(deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle) {
        let scope: { deviceList: any, geometry: NPMapLib.Geometry.Polygon | NPMapLib.Geometry.Circle, $destroy: Function, selectCheckAreaCb:string } = this.$scope.$new();
        scope.deviceList = deviceList;
        scope.geometry = geometry;
        scope.selectCheckAreaCb = this.selectDeviceCb;
        this.currentLayerIndex = this.layer.open({
            type: 1,
            content: PopupHtml,
            scope: scope,
            title: false,
            closeBtn: 0,
            skin: "no-scroll",
            area: ["300px", "300px"],
            end: function () {
                scope.$destroy();
            }
        })
    }

    addHeatMapLayer() {
        let arr = this.totalDevice as Array<SystemPoint>;
        if (arr.length > 0) {
            this.map.addheatlayer(arr)
        }
    }

    setSatellite() {
        this.mapService.getMapConfig(this.mapConfigName).then((data: MapConfigModel) => {
            this.static2D = false;
            this.map.setBaseMapLayer(data, "baseMapSatellite");

        })
    }

    set2D() {
        this.mapService.getMapConfig(this.mapConfigName).then((data: MapConfigModel) => {
            this.static2D = true;
            this.map.setBaseMapLayer(data, "baseMap2D");
        })
    }

    getSystemPoint() {
        return this.mapService.getSystemPoints().then((res: ResponseResult<Array<SystemPoint>>) => {
            let arr = [] as Array<SystemPoint>;
            this.totalDevice = arr;
            if (!!res && !!res.data) {
                res.data.forEach((item: SystemPoint) => {
                    if (item.LayerType && item.Lat && item.Lon) {
                        arr.push(item);
                    }
                });
                this.$scope.systemPoint = arr;
                return arr;
            } else {
                this.layer.msg("获取点位失败")
            }
        })
    }


    MakerClick(markers: NPMapLib.Symbols.ClusterMarker) {
        let self = this;
        let point = markers.getPosition() as NPMapLib.Geometry.Point;
        this.map.setCenter(point, this.map.getZoom());
    }

    DrawRect() {
        this.RemoveMoveHand();
        this.map.selectRectangle((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawCircle() {
        this.RemoveMoveHand();
        this.map.selectCircle((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Circle) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawPolygon() {
        this.RemoveMoveHand();
        this.map.selectPolygon((points: Array<SystemPoint>, geometry: NPMapLib.Geometry.Polygon) => {
            this.$timeout(() => {
                this.DrawCallBackMethod(points, geometry)
            });
        })
    }

    DrawLine() {
        this.RemoveMoveHand();
        this.map.drawLine((points: Array<NPMapLib.Geometry.Point>) => {
        })
    }

    ClearDraw() {
        this.RemoveMoveHand();
        this.map.clearDraw();
        this.selectDeviceIds = [];
    }

    MoveMap() {
        this.RemoveMoveHand();
        this.map.handMoveMap()
    }

    reset() {
        let point = {
            lon: this.centerPoint.lon,
            lat: this.centerPoint.lat
        } as NPMapLib.Geometry.Point;
        this.map.setCenter(point, this.initZoom)
    }

    measureDistance() {
        this.RemoveMoveHand();
        this.map.measureDistance();
    }

    RemoveMoveHand() {
        this.map.removeMoveStyle();
    }

    changeMapLayer(type: string) {
        switch (type) {
            case "thermalChart":
                this.addHeatMapLayer();
                break;
            case "satellite":
                this.setSatellite();
                break;
            case "earth":
                this.set2D();
                break;
            default:
                break;
        }
    }

    mapTools(type: string) {
        switch (type) {
            case "move":
                this.MoveMap();
                break;
            case "square":
                this.DrawRect();
                break;
            case "circle":
                this.DrawCircle();
                break;
            case "polylgon":
                this.DrawPolygon();
                break;
            case "clear":
                this.ClearDraw();
                break;
            case "reset":
                this.reset();
                break;
            case "min":
                break;
            case "max":
                break;
            case "measure":
                this.measureDistance();
                break;
            case "save":
                break;
            case "polyline":
                this.DrawLine();
                break;
            default:
                break;
        }
    }

    private poupsTypeAction(marker: NPMapLib.Symbols.ClusterMarker, info: any) {
        let cameraLayerId = "mapWifiPopul";
        let mapPoint: NPMapLib.Geometry.Point;
        if (marker) {
            mapPoint = marker.getPosition();
        } else {
            mapPoint = {
                lon: info.Lon,
                lat: info.Lat
            } as NPMapLib.Geometry.Point;
        }
        let pagePoint = this.map.pointToPixel(mapPoint);
        pagePoint.y -= 300;
        let p = this.map.pixelToPoint(pagePoint);
        this.map.setCenter(p, this.map.getZoom());
        let p2 = this.map.pointToPixel(this.map.getCenter());
        p2.y += 300;
        let scope: { PointDeTail: any, layerId: string, $destroy: Function, position: number, marker: any } = this.$scope.$new();
        scope.layerId = cameraLayerId;
        scope.PointDeTail = info;
        scope.position = p2;
        scope.marker = marker;
        if (marker) {
            switch (marker.markType) {
                case "camera":
                case LayerType.Camera.value:
                case "PortraitCamera":
                case "FaceCamera":
                case "HighCamera":
                    this.mylayer.open({
                        content: populCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                case "WiFi":
                case "wifi":
                case LayerType.WiFi.value:
                    this.mylayer.open({
                        content: populWifi,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                case "CarCamera":
                case LayerType.CarCamera.value:
                    this.mylayer.open({
                        content: populCarCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                case "efence":
                case "ElectronicFence":
                case LayerType.ElectronicFence.value:
                    this.mylayer.open({
                        content: efResourcePointHtml,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                default:
                    this.layerDec.warnInfo("未找到对应设备");
                    break
            }
        } else {
            switch (info.ObjectType) {
                case "camera":
                case "PortraitCamera":
                case "FaceCamera":
                case "HighCamera":
                case ObjectType.Camera.value:
                    this.mylayer.open({
                        content: populCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                case "wifi":
                case ObjectType.Wifi.value:
                    this.mylayer.open({
                        content: populWifi,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                case "CarCamera":
                    this.layerDec.warnInfo("暂未实现车辆信息");
                    break;
                case "efence":
                case ObjectType.ElectronicFence.value:
                case "ElectronicFence":
                    this.mylayer.open({
                        content: efResourcePointHtml,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                        end: () => {
                            scope.$destroy()
                        }
                    });
                    break;
                default:
                    this.layerDec.warnInfo("未找到设备信息");
                    // this.mylayer.open({
                    //     content: populWifi,
                    //     scope: scope,
                    //     ID: "populWifi",
                    //     AreaAndPosition: {left: (p2.x - (535 / 2)), top: (p2.y - 380), width: 535, height: 400},
                    //     end: () => {
                    //         scope.$destroy()
                    //     }
                    // });
                    break
            }


            // if (info.ObjectType == 'camera') {
            //     this.mylayer.open({
            //         content: populCamera,
            //         scope: scope,
            //         ID: cameraLayerId,
            //         AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
            //         end: () => {
            //             scope.$destroy()
            //         }
            //     });
            // } else {
            //     this.mylayer.open({
            //         content: populWifi,
            //         scope: scope,
            //         ID: cameraLayerId,
            //         AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
            //         end: () => {
            //             scope.$destroy()
            //         }
            //     });
            // }
        }
    }

    bindMapPoinitEvent() {
        return {
            click: (marker: NPMapLib.Symbols.ClusterMarker) => {
                this.pointClick(marker);
            },
            // mouseout: (marker: NPMapLib.Symbols.ClusterMarker) => {
            //     this.pointMouseout(marker);
            // },
            // mouseover: (marker: NPMapLib.Symbols.ClusterMarker) => {
            //     this.pointMouseover(marker);
            // }
        } as OverlayLayerOpts
    }

    pointMouseout(marker: any) {
        let self = this;
    }

    pointMouseover(marker: any) {
        let self = this;
        if (marker.LayerType === LayerType.LampPost.value) {
            let params = {
                id: marker.ObjectID
            };
            self.resourceRetrievalService.findLampDeviceChildrenById(params)
                .then((res: any) => {
                    if (res.code === 200) {
                        self.setLampPostData(res.data, marker);
                    } else {
                        this.layerDec.warnInfo("立杆设备查询失败");
                    }
                });
        }
    }

    // 处理立杆数据
    setLampPostData(data: any, marker: NPMapLib.Symbols.ClusterMarker) {
        let self = this;
        let deviceList: Array<any> = [];
        let i = 0;
        for (i = 0; i < data.Camera.length; i++) {
            if (deviceList.length >= 8) {
                break;
            }
            if (data.Camera[i].CameraType === "FaceCamera") {
                data.Camera[i].iconType = "faceCamera";
            } else if (data.Camera[i].CameraType === "CarCamera") {
                data.Camera[i].iconType = "carCamera";
            } else if (data.Camera[i].CameraType === "HighCamera") {
                data.Camera[i].iconType = "hd";
            } else if (data.Camera[i].CameraType === "PortraitCamera") {
                data.Camera[i].iconType = "face";
            } else if (data.Camera[i].CameraType === "NormalCamera") {
                data.Camera[i].iconType = "camera";
            }

            deviceList.push(data.Camera[i]);
        }
        for (i = 0; i < data.WiFi.length; i++) {
            if (deviceList.length >= 8) {
                break;
            }
            data.WiFi[i].iconType = "wifi";
            deviceList.push(data.WiFi[i]);
        }
        for (i = 0; i < data.ElectronicFence.length; i++) {
            if (deviceList.length >= 8) {
                break;
            }
            data.ElectronicFence[i].iconType = "efence";
            deviceList.push(data.ElectronicFence[i]);
        }
        for (i = 0; i < data.RmpGate.length; i++) {
            if (deviceList.length >= 8) {
                break;
            }
            data.RmpGate[i].iconType = "car";
            deviceList.push(data.RmpGate[i]);
        }
        let lampPostLayerId = "lampPostPopul";
        let mapPoint: NPMapLib.Geometry.Point;
        mapPoint = marker.getPosition();
        let pagePoint = this.map.pointToPixel(mapPoint);
        let p = self.map.pixelToPoint(pagePoint);
        let p2 = self.map.pointToPixel(self.map.getCenter());
        let scope: { layerId: string, $destroy: Function, position: number, deviceList: Array<any>, marker: NPMapLib.Symbols.ClusterMarker, childClick: any } = self.$scope.$new();
        scope.layerId = lampPostLayerId;
        scope.position = p2;
        scope.deviceList = deviceList;
        scope.marker = marker;
        scope.childClick = (info: any) => {
            self.getDeviceInfo(info, 2);
        }
        self.mylayer.open({
            content: populLampPostPoint,
            scope: scope,
            ID: lampPostLayerId,
            AreaAndPosition: {left: (pagePoint.x - 103), top: (pagePoint.y - 31), width: 206, height: 170},
            end: () => {
                scope.$destroy()
            }
        });
    }

    mapWifiPopulClose() {

        this.$scope.$on("$destroy", () => {
            this.mylayer.destroy()
        })
    }

    getAroundDivice() {
        let point = {
            lon: 114.2655434,
            lat: 30.4744138
        };

        function compiler(res: any) {
        }

        this.map.addCircleSearchControl(point, compiler, 0, 1000);
    }

    /**
     * @description触发地图弹框判断设备类型
     * @param info
     * @param num 1: 地图点位点击 2:立杆点击 3:检索结果
     */
    getDeviceInfo(info: any, num: number) {
        let self = this;
        let deviceInfo: any = {
            Name: "",
            ID: "",
            position: {
                Lat: "",
                Lon: "",
            },
            data: {},
            ObjectType: "",
            LayerType: "",
            ObjectID: "",
            type: 1
        };
        if (num === 1) {
            deviceInfo.Name = info.ObjectName;
            deviceInfo.ID = info.ObjectID;
            deviceInfo.position = {
                Lat: info.location.lat,
                Lon: info.location.lon,
            };
            deviceInfo.ObjectType = info.ObjectType;
            deviceInfo.LayerType = info.LayerType;
            deviceInfo.ObjectID = info.ObjectID;
        } else if (num === 2) {
            deviceInfo.Name = info.Name;
            deviceInfo.ID = info.ID;
            deviceInfo.position = {
                Lat: info.Lat,
                Lon: info.Lon,
            };
            deviceInfo.ObjectType = info.ObjectType;
            deviceInfo.LayerType = info.LayerType;
            deviceInfo.ObjectID = info.ID;
        } else if (num === 3) {
            deviceInfo.Name = info.Name;
            deviceInfo.ID = info.Id;
            deviceInfo.position = {
                Lat: info.Lat,
                Lon: info.Lon,
            };
            deviceInfo.ObjectType = info.ObjectType;
            deviceInfo.LayerType = info.LayerType;
            deviceInfo.ObjectID = info.Id;
        }
        this.resourceRetrievalService.getDeviceById(deviceInfo.ObjectID, deviceInfo.ObjectType)
            .then((res: any) => {
                if ((res.code === 200) && res.data) {
                    deviceInfo.Name = res.data.Name;
                    if (deviceInfo.ObjectType === "Camera") {
                        if (!!res.data.JsonUserData.VideoServer) {
                            deviceInfo.status = true;
                            deviceInfo.data = {
                                Code: res.data.JsonUserData.VideoServer.Code,
                                IpAddress: res.data.JsonUserData.VideoServer.IpAddress,
                                Port: res.data.JsonUserData.VideoServer.Port,
                                Pwd: res.data.JsonUserData.VideoServer.Pwd,
                                Uid: res.data.JsonUserData.VideoServer.Uid,
                                VideoServerType: res.data.JsonUserData.VideoServer.VideoServerType,
                                ProxyServerID: res.data.JsonUserData.VideoServer.ProxyServerID,
                                PlayName: res.data.PlayName,
                                PYCode: res.data.PYCode
                            };
                        } else {
                            deviceInfo.status = false;
                        }
                    }
                    self.showPoupsAction(deviceInfo);
                } else {
                    self.layerDec.warnInfo("请求失败");
                }
            });
    }

    pointClick(marker: any) {
        if (marker.LayerType === LayerType.LampPost.value) {
            this.pointMouseover(marker);
            // mouseout: (marker: NPMapLib.Symbols.ClusterMarker) => {
            //     this.pointMouseout(marker);
            // },
            // mouseover: (marker: NPMapLib.Symbols.ClusterMarker) => {
            //     this.pointMouseover(marker);
            // }
        }else {
            this.getDeviceInfo(marker, 1);
        }
    }

    showPoupsAction(deviceInfo: any) {
        let self = this;
        let cameraLayerId = "mapPoupsBox";
        let mapPoint: NPMapLib.Geometry.Point;
        mapPoint = {
            lon: deviceInfo.position.Lon,
            lat: deviceInfo.position.Lat
        } as NPMapLib.Geometry.Point;
        let pagePoint = self.map.pointToPixel(mapPoint);
        pagePoint.y -= 300;
        let p = self.map.pixelToPoint(pagePoint);
        self.map.setCenter(p, self.map.getZoom());
        let p2 = self.map.pointToPixel(self.map.getCenter());
        p2.y += 300;
        let scope: { layerId: string, $destroy: Function, PointDeTail: any, position: any } = self.$scope.$new();
        scope.layerId = cameraLayerId;
        scope.PointDeTail = deviceInfo;
        scope.position = p2;

        // self.mylayer.close(cameraLayerId);
        switch (deviceInfo.LayerType) {
            case LayerType.Camera.value: // 只播放视频
            case LayerType.HighCamera.value:
            case LayerType.NormalCamera.value:
                self.mylayer.open({
                    content: videoMapPointHtml,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330},
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case LayerType.PortraitCamera.value:
            case LayerType.FaceCamera.value: // 人像
                self.mylayer.open({
                    content: populCamera,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330},
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case LayerType.CarCamera.value: // 车辆
            case LayerType.RmpGate.value: // 卡口
                self.mylayer.open({
                    content: populCarCamera,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330},
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case LayerType.WiFi.value: // WiFi
                self.mylayer.open({
                    content: populWifi,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: {left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330},
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case LayerType.ElectronicFence.value: // 电子围栏
                self.mylayer.open({
                    content: efResourcePointHtml,
                    scope: scope,
                    ID: cameraLayerId,
                    AreaAndPosition: {left: (p2.x - (540 / 2) - 100), top: (p2.y - 300), width: 540, height: 330},
                    end: () => {
                        scope.$destroy()
                    }
                });
                break;
            case LayerType.LampPost.value: // 立杆
                self.layerDec.warnInfo("未找到对应设备");
                break;
        }
    }

    // 返回高级检索
    backAdvanced() {
        this.$scope.$broadcast("search-device-id", this.selectDeviceIds, this.selectType);
    }
}

app.controller("ResourceSearchMapController", ResourceSearchMapController);