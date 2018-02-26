define(["require", "exports", "text!../../mapPoint/wifiResourcePoint/tpl.html", "text!../../mapPoint/cameraMapPoint/cameraMapPoint.html", "text!../../mapPoint/efResourcePoint/efResourcePoint.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "text!../../mapPoint/cameraCarMapPoint/cameraMapPoint.html", "text!../../mapPoint/lampPostPoint/lampPostPoint.html", "text!../../mapPoint/videoMapPoint/tpl.html", "../../common/app/main.app", "../../common/map/map.main", "../../common/enum/MapConfigJsonEnum", "../../../core/enum/LayerType", "../../../core/enum/ObjectType", "lodash", "es6-promise", "npgis2", "../../common/services/map.service", "../../mapPoint/cameraMapPoint/cameraMapPoint.controller", "../../mapPoint/wifiResourcePoint/wifiResourcePoint.controller", "../../mapPoint/cameraCarMapPoint/cameraMapPoint.controller", "../../mapPoint/efResourcePoint/efResourcePoint.controller", "../../mapPoint/lampPostPoint/lampPostPoint.controller", "../../mapPoint/videoMapPoint/videoMapPoint.controller", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../../common/factory/layerMsg.factory"], function (require, exports, populWifi, populCamera, efResourcePointHtml, PopupHtml, populCarCamera, populLampPostPoint, videoMapPointHtml, main_app_1, map_main_1, MapConfigJsonEnum_1, LayerType_1, ObjectType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceSearchMapController = (function () {
        function ResourceSearchMapController($scope, $timeout, mylayer, layer, i18nFactory, mapService, $q, resourceRetrievalService, layerDec) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.mapService = mapService;
            this.$q = $q;
            this.resourceRetrievalService = resourceRetrievalService;
            this.layerDec = layerDec;
            this.mapId = "resourceSearchMap";
            this.mapConfigName = MapConfigJsonEnum_1.MapConfigJsonEnum.MAPCONFIG;
            this.map = null;
            this.showAllDevice = true;
            this.showVideo = true;
            this.showfacebayonet = true;
            this.showcarvoideo = true;
            this.showpersonbayonet = true;
            this.showcarbayonet = true;
            this.showWifi = true;
            this.showLamp = true;
            this.showElectronicfence = true;
            this.static2D = true;
            this.selectType = "All";
            this.selectDeviceCb = "close.device.popup";
            this.selectDeviceIds = [];
            var self = this;
            this.map = null;
            this.initMap();
            this.$scope.$on("$destroy", function () {
                if (_this.map) {
                    _this.map.destroy();
                }
                _this.mylayer.destroy();
            });
            this.$scope.$on('device_popup_layer', function (event, item, type) {
                _this.getDeviceInfo(item, 3);
            });
            self.$scope.$on("search-device-type", function (event, type) {
                switch (type) {
                    case "Camera":
                        self.selectType = ObjectType_1.ObjectType.Camera.value;
                        break;
                    case "RmpGate":
                        self.selectType = ObjectType_1.ObjectType.RmpGate.value;
                        break;
                    case "EFENCE":
                        self.selectType = ObjectType_1.ObjectType.ElectronicFence.value;
                        break;
                    case "WiFi":
                        self.selectType = ObjectType_1.ObjectType.Wifi.value;
                        break;
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, deviceIds, status, geometry) {
                if (status) {
                    if (deviceIds.length === 0) {
                        self.layerDec.warnInfo('框选区域不存在摄像机设备！');
                        self.map.removeOverlay(geometry);
                    }
                    else {
                        if (self.selectType === "All") {
                            self.$scope.$broadcast("search-device-id", deviceIds, self.selectType);
                        }
                        else {
                            var arrDeviceIds = angular.copy(self.selectDeviceIds);
                            arrDeviceIds = _.concat(deviceIds, arrDeviceIds);
                            arrDeviceIds = _.uniq(arrDeviceIds);
                            self.selectDeviceIds = arrDeviceIds;
                        }
                    }
                }
                else {
                    self.map.removeOverlay(geometry);
                }
                self.layer.close(self.currentLayerIndex);
            });
            self.$scope.$on("map-clear-draw", function (event, data) {
                self.map.clearDraw();
                self.selectDeviceIds = [];
            });
            self.$scope.$on("map-peripheral-information", function (event, data, callback) {
                self.map.addCircleSearchControl(data, callback, 5000, 5000);
            });
        }
        ResourceSearchMapController.prototype.initMap = function () {
            var _this = this;
            this.mapService.getMapConfig(this.mapConfigName).then(function (data) {
                _this.map = new map_main_1.NPGisMapMain();
                _this.map.init(_this.mapId, data);
                _this.initSystemPoint();
                _this.centerPoint = _this.map.getCenter();
                _this.initZoom = _this.map.getZoom();
                _this.$scope.map = _this.map;
                _this.$timeout(function () {
                    if (!!_this.map) {
                        _this.$scope.$broadcast('map.resourceRetrieval', _this.map);
                    }
                }, 3000);
            });
        };
        ResourceSearchMapController.prototype.checkLayerItem = function (layerName) {
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
                    }
                    else {
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
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.HighCamera.value, this.showVideo);
                    break;
                case "showfacebayonet":
                    this.showfacebayonet = !this.showfacebayonet;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.FaceCamera.value, this.showfacebayonet);
                    break;
                case "showcarvoideo":
                    this.showcarvoideo = !this.showcarvoideo;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.CarCamera.value, this.showcarvoideo);
                    break;
                case "showpersonbayonet":
                    this.showpersonbayonet = !this.showpersonbayonet;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.PortraitCamera.value, this.showpersonbayonet);
                    break;
                case "showcarbayonet":
                    this.showcarbayonet = !this.showcarbayonet;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.RmpGate.value, this.showcarbayonet);
                    break;
                case "showWifi":
                    this.showWifi = !this.showWifi;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.WiFi.value, this.showWifi);
                    break;
                case "showLamp":
                    this.showLamp = !this.showLamp;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.LampPost.value, this.showLamp);
                    break;
                case "showElectronicfence":
                    this.showElectronicfence = !this.showElectronicfence;
                    this.setLayerStyleByDeviceType(LayerType_1.LayerType.ElectronicFence.value, this.showElectronicfence);
                    break;
            }
        };
        ResourceSearchMapController.prototype.setLayerStyleByDeviceType = function (layerName, style) {
            this.map.setOverlayShowByLayerType(layerName, style);
        };
        ResourceSearchMapController.prototype.initSystemPoint = function () {
            var _this = this;
            this.getSystemPoint().then(function (res) {
                _this.map.renderMarkers(res, _this.bindMapPoinitEvent());
            });
        };
        ResourceSearchMapController.prototype.DrawCallBackMethod = function (points, geometry) {
            var self = this;
            var arr = [];
            points.forEach(function (item) {
                if ((self.selectType === "All") || (item.ObjectType === self.selectType)) {
                    arr.push(item);
                }
            });
            if (arr.length === 0) {
                self.map.removeOverlay(geometry);
                self.layer.msg("框选区域不存在设备！");
                return;
            }
            else {
                self.checkArea(arr, geometry);
            }
        };
        ResourceSearchMapController.prototype.checkArea = function (deviceList, geometry) {
            var scope = this.$scope.$new();
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
            });
        };
        ResourceSearchMapController.prototype.addHeatMapLayer = function () {
            var arr = this.totalDevice;
            if (arr.length > 0) {
                this.map.addheatlayer(arr);
            }
        };
        ResourceSearchMapController.prototype.setSatellite = function () {
            var _this = this;
            this.mapService.getMapConfig(this.mapConfigName).then(function (data) {
                _this.static2D = false;
                _this.map.setBaseMapLayer(data, "baseMapSatellite");
            });
        };
        ResourceSearchMapController.prototype.set2D = function () {
            var _this = this;
            this.mapService.getMapConfig(this.mapConfigName).then(function (data) {
                _this.static2D = true;
                _this.map.setBaseMapLayer(data, "baseMap2D");
            });
        };
        ResourceSearchMapController.prototype.getSystemPoint = function () {
            var _this = this;
            return this.mapService.getSystemPoints().then(function (res) {
                var arr = [];
                _this.totalDevice = arr;
                if (!!res && !!res.data) {
                    res.data.forEach(function (item) {
                        if (item.LayerType && item.Lat && item.Lon) {
                            arr.push(item);
                        }
                    });
                    _this.$scope.systemPoint = arr;
                    return arr;
                }
                else {
                    _this.layer.msg("获取点位失败");
                }
            });
        };
        ResourceSearchMapController.prototype.MakerClick = function (markers) {
            var self = this;
            var point = markers.getPosition();
            this.map.setCenter(point, this.map.getZoom());
        };
        ResourceSearchMapController.prototype.DrawRect = function () {
            var _this = this;
            this.RemoveMoveHand();
            this.map.selectRectangle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        ResourceSearchMapController.prototype.DrawCircle = function () {
            var _this = this;
            this.RemoveMoveHand();
            this.map.selectCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        ResourceSearchMapController.prototype.DrawPolygon = function () {
            var _this = this;
            this.RemoveMoveHand();
            this.map.selectPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        ResourceSearchMapController.prototype.DrawLine = function () {
            this.RemoveMoveHand();
            this.map.drawLine(function (points) {
            });
        };
        ResourceSearchMapController.prototype.ClearDraw = function () {
            this.RemoveMoveHand();
            this.map.clearDraw();
            this.selectDeviceIds = [];
        };
        ResourceSearchMapController.prototype.MoveMap = function () {
            this.RemoveMoveHand();
            this.map.handMoveMap();
        };
        ResourceSearchMapController.prototype.reset = function () {
            var point = {
                lon: this.centerPoint.lon,
                lat: this.centerPoint.lat
            };
            this.map.setCenter(point, this.initZoom);
        };
        ResourceSearchMapController.prototype.measureDistance = function () {
            this.RemoveMoveHand();
            this.map.measureDistance();
        };
        ResourceSearchMapController.prototype.RemoveMoveHand = function () {
            this.map.removeMoveStyle();
        };
        ResourceSearchMapController.prototype.changeMapLayer = function (type) {
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
        };
        ResourceSearchMapController.prototype.mapTools = function (type) {
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
        };
        ResourceSearchMapController.prototype.poupsTypeAction = function (marker, info) {
            var cameraLayerId = "mapWifiPopul";
            var mapPoint;
            if (marker) {
                mapPoint = marker.getPosition();
            }
            else {
                mapPoint = {
                    lon: info.Lon,
                    lat: info.Lat
                };
            }
            var pagePoint = this.map.pointToPixel(mapPoint);
            pagePoint.y -= 300;
            var p = this.map.pixelToPoint(pagePoint);
            this.map.setCenter(p, this.map.getZoom());
            var p2 = this.map.pointToPixel(this.map.getCenter());
            p2.y += 300;
            var scope = this.$scope.$new();
            scope.layerId = cameraLayerId;
            scope.PointDeTail = info;
            scope.position = p2;
            scope.marker = marker;
            if (marker) {
                switch (marker.markType) {
                    case "camera":
                    case LayerType_1.LayerType.Camera.value:
                    case "PortraitCamera":
                    case "FaceCamera":
                    case "HighCamera":
                        this.mylayer.open({
                            content: populCamera,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    case "WiFi":
                    case "wifi":
                    case LayerType_1.LayerType.WiFi.value:
                        this.mylayer.open({
                            content: populWifi,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    case "CarCamera":
                    case LayerType_1.LayerType.CarCamera.value:
                        this.mylayer.open({
                            content: populCarCamera,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    case "efence":
                    case "ElectronicFence":
                    case LayerType_1.LayerType.ElectronicFence.value:
                        this.mylayer.open({
                            content: efResourcePointHtml,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    default:
                        this.layerDec.warnInfo("未找到对应设备");
                        break;
                }
            }
            else {
                switch (info.ObjectType) {
                    case "camera":
                    case "PortraitCamera":
                    case "FaceCamera":
                    case "HighCamera":
                    case ObjectType_1.ObjectType.Camera.value:
                        this.mylayer.open({
                            content: populCamera,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    case "wifi":
                    case ObjectType_1.ObjectType.Wifi.value:
                        this.mylayer.open({
                            content: populWifi,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    case "CarCamera":
                        this.layerDec.warnInfo("暂未实现车辆信息");
                        break;
                    case "efence":
                    case ObjectType_1.ObjectType.ElectronicFence.value:
                    case "ElectronicFence":
                        this.mylayer.open({
                            content: efResourcePointHtml,
                            scope: scope,
                            ID: cameraLayerId,
                            AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                            end: function () {
                                scope.$destroy();
                            }
                        });
                        break;
                    default:
                        this.layerDec.warnInfo("未找到设备信息");
                        break;
                }
            }
        };
        ResourceSearchMapController.prototype.bindMapPoinitEvent = function () {
            var _this = this;
            return {
                click: function (marker) {
                    _this.pointClick(marker);
                },
            };
        };
        ResourceSearchMapController.prototype.pointMouseout = function (marker) {
            var self = this;
        };
        ResourceSearchMapController.prototype.pointMouseover = function (marker) {
            var _this = this;
            var self = this;
            if (marker.LayerType === LayerType_1.LayerType.LampPost.value) {
                var params = {
                    id: marker.ObjectID
                };
                self.resourceRetrievalService.findLampDeviceChildrenById(params)
                    .then(function (res) {
                    if (res.code === 200) {
                        self.setLampPostData(res.data, marker);
                    }
                    else {
                        _this.layerDec.warnInfo("立杆设备查询失败");
                    }
                });
            }
        };
        ResourceSearchMapController.prototype.setLampPostData = function (data, marker) {
            var self = this;
            var deviceList = [];
            var i = 0;
            for (i = 0; i < data.Camera.length; i++) {
                if (deviceList.length >= 8) {
                    break;
                }
                if (data.Camera[i].CameraType === "FaceCamera") {
                    data.Camera[i].iconType = "faceCamera";
                }
                else if (data.Camera[i].CameraType === "CarCamera") {
                    data.Camera[i].iconType = "carCamera";
                }
                else if (data.Camera[i].CameraType === "HighCamera") {
                    data.Camera[i].iconType = "hd";
                }
                else if (data.Camera[i].CameraType === "PortraitCamera") {
                    data.Camera[i].iconType = "face";
                }
                else if (data.Camera[i].CameraType === "NormalCamera") {
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
            var lampPostLayerId = "lampPostPopul";
            var mapPoint;
            mapPoint = marker.getPosition();
            var pagePoint = this.map.pointToPixel(mapPoint);
            var p = self.map.pixelToPoint(pagePoint);
            var p2 = self.map.pointToPixel(self.map.getCenter());
            var scope = self.$scope.$new();
            scope.layerId = lampPostLayerId;
            scope.position = p2;
            scope.deviceList = deviceList;
            scope.marker = marker;
            scope.childClick = function (info) {
                self.getDeviceInfo(info, 2);
            };
            self.mylayer.open({
                content: populLampPostPoint,
                scope: scope,
                ID: lampPostLayerId,
                AreaAndPosition: { left: (pagePoint.x - 103), top: (pagePoint.y - 31), width: 206, height: 170 },
                end: function () {
                    scope.$destroy();
                }
            });
        };
        ResourceSearchMapController.prototype.mapWifiPopulClose = function () {
            var _this = this;
            this.$scope.$on("$destroy", function () {
                _this.mylayer.destroy();
            });
        };
        ResourceSearchMapController.prototype.getAroundDivice = function () {
            var point = {
                lon: 114.2655434,
                lat: 30.4744138
            };
            function compiler(res) {
            }
            this.map.addCircleSearchControl(point, compiler, 0, 1000);
        };
        ResourceSearchMapController.prototype.getDeviceInfo = function (info, num) {
            var self = this;
            var deviceInfo = {
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
            }
            else if (num === 2) {
                deviceInfo.Name = info.Name;
                deviceInfo.ID = info.ID;
                deviceInfo.position = {
                    Lat: info.Lat,
                    Lon: info.Lon,
                };
                deviceInfo.ObjectType = info.ObjectType;
                deviceInfo.LayerType = info.LayerType;
                deviceInfo.ObjectID = info.ID;
            }
            else if (num === 3) {
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
                .then(function (res) {
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
                        }
                        else {
                            deviceInfo.status = false;
                        }
                    }
                    self.showPoupsAction(deviceInfo);
                }
                else {
                    self.layerDec.warnInfo("请求失败");
                }
            });
        };
        ResourceSearchMapController.prototype.pointClick = function (marker) {
            if (marker.LayerType === LayerType_1.LayerType.LampPost.value) {
                this.pointMouseover(marker);
            }
            else {
                this.getDeviceInfo(marker, 1);
            }
        };
        ResourceSearchMapController.prototype.showPoupsAction = function (deviceInfo) {
            var self = this;
            var cameraLayerId = "mapPoupsBox";
            var mapPoint;
            mapPoint = {
                lon: deviceInfo.position.Lon,
                lat: deviceInfo.position.Lat
            };
            var pagePoint = self.map.pointToPixel(mapPoint);
            pagePoint.y -= 300;
            var p = self.map.pixelToPoint(pagePoint);
            self.map.setCenter(p, self.map.getZoom());
            var p2 = self.map.pointToPixel(self.map.getCenter());
            p2.y += 300;
            var scope = self.$scope.$new();
            scope.layerId = cameraLayerId;
            scope.PointDeTail = deviceInfo;
            scope.position = p2;
            switch (deviceInfo.LayerType) {
                case LayerType_1.LayerType.Camera.value:
                case LayerType_1.LayerType.HighCamera.value:
                case LayerType_1.LayerType.NormalCamera.value:
                    self.mylayer.open({
                        content: videoMapPointHtml,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 310), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case LayerType_1.LayerType.PortraitCamera.value:
                case LayerType_1.LayerType.FaceCamera.value:
                    self.mylayer.open({
                        content: populCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case LayerType_1.LayerType.CarCamera.value:
                case LayerType_1.LayerType.RmpGate.value:
                    self.mylayer.open({
                        content: populCarCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case LayerType_1.LayerType.WiFi.value:
                    self.mylayer.open({
                        content: populWifi,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 300), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case LayerType_1.LayerType.ElectronicFence.value:
                    self.mylayer.open({
                        content: efResourcePointHtml,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2) - 100), top: (p2.y - 300), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case LayerType_1.LayerType.LampPost.value:
                    self.layerDec.warnInfo("未找到对应设备");
                    break;
            }
        };
        ResourceSearchMapController.prototype.backAdvanced = function () {
            this.$scope.$broadcast("search-device-id", this.selectDeviceIds, this.selectType);
        };
        ResourceSearchMapController.$inject = ["$scope", "$timeout", "mylayer", "layer", "i18nFactory", "mapService", "$q", "resourceRetrievalService", "layerDec"];
        return ResourceSearchMapController;
    }());
    main_app_1.app.controller("ResourceSearchMapController", ResourceSearchMapController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvcmVzb3VyY2VSZXRyaWV2YWxNYXAvbWFwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBMENBO1FBd0JJLHFDQUFvQixNQUFXLEVBQ1gsUUFBa0IsRUFDbEIsT0FBWSxFQUNaLEtBQVUsRUFDVixXQUFnQixFQUNoQixVQUF1QixFQUN2QixFQUFPLEVBQ1Asd0JBQW1ELEVBQ25ELFFBQWE7WUFSakMsaUJBb0VDO1lBcEVtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFLO1lBQ1osVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBQ2hCLGVBQVUsR0FBVixVQUFVLENBQWE7WUFDdkIsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUNQLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQTdCakMsVUFBSyxHQUFXLG1CQUFtQixDQUFDO1lBQ3BDLGtCQUFhLEdBQVcscUNBQWlCLENBQUMsU0FBUyxDQUFDO1lBQ3BELFFBQUcsR0FBaUIsSUFBSSxDQUFDO1lBSXpCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1lBQzlCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFDMUIsb0JBQWUsR0FBWSxJQUFJLENBQUM7WUFDaEMsa0JBQWEsR0FBWSxJQUFJLENBQUM7WUFDOUIsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1lBQ2xDLG1CQUFjLEdBQVksSUFBSSxDQUFDO1lBQy9CLGFBQVEsR0FBWSxJQUFJLENBQUM7WUFDekIsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6Qix3QkFBbUIsR0FBWSxJQUFJLENBQUM7WUFFcEMsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1lBQzNCLG1CQUFjLEdBQVcsb0JBQW9CLENB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Q0FBQyxDQUFDO1FBcTFCM0ksa0NBQUM7S0F0MUJELEFBczFCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9yZXNvdXJjZVJldHJpZXZhbE1hcC9tYXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvdHBsLmh0bWxcIiBuYW1lPVwicG9wdWxXaWZpXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9tYXBQb2ludC9jYW1lcmFNYXBQb2ludC9jYW1lcmFNYXBQb2ludC5odG1sXCIgbmFtZT1cInBvcHVsQ2FtZXJhXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9tYXBQb2ludC9lZlJlc291cmNlUG9pbnQvZWZSZXNvdXJjZVBvaW50Lmh0bWxcIiBuYW1lPVwiZWZSZXNvdXJjZVBvaW50SHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5odG1sXCIgbmFtZT1cIlBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQuaHRtbFwiIG5hbWU9XCJwb3B1bENhckNhbWVyYVwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vbWFwUG9pbnQvbGFtcFBvc3RQb2ludC9sYW1wUG9zdFBvaW50Lmh0bWxcIiBuYW1lPVwicG9wdWxMYW1wUG9zdFBvaW50XCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9tYXBQb2ludC92aWRlb01hcFBvaW50L3RwbC5odG1sXCIgbmFtZT1cInZpZGVvTWFwUG9pbnRIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImVzNi1wcm9taXNlXCI7XHJcbmltcG9ydCBcIm5wZ2lzMlwiO1xyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW5cIjtcclxuaW1wb3J0IHtNYXBDb25maWdKc29uRW51bX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL01hcENvbmZpZ0pzb25FbnVtXCI7XHJcbmltcG9ydCB7TWFwQ29uZmlnTW9kZWx9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL2NvcmUvbW9kZWwvbWFwLmNvbmZpZy5tb2RlbFwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge0lNYXBTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlXCI7XHJcblxyXG4vLyDlvLnmoYZcclxuaW1wb3J0IFwiLi4vLi4vbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuLi8uLi9tYXBQb2ludC93aWZpUmVzb3VyY2VQb2ludC93aWZpUmVzb3VyY2VQb2ludC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL21hcFBvaW50L2NhbWVyYUNhck1hcFBvaW50L2NhbWVyYU1hcFBvaW50LmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vbWFwUG9pbnQvZWZSZXNvdXJjZVBvaW50L2VmUmVzb3VyY2VQb2ludC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL21hcFBvaW50L2xhbXBQb3N0UG9pbnQvbGFtcFBvc3RQb2ludC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCBcIi4uLy4uL21hcFBvaW50L3ZpZGVvTWFwUG9pbnQvdmlkZW9NYXBQb2ludC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCAnLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5jb250cm9sbGVyJztcclxuXHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQgT3ZlcmxheUxheWVyID0gTlBNYXBMaWIuTGF5ZXJzLk92ZXJsYXlMYXllcjtcclxuaW1wb3J0IE92ZXJsYXlMYXllck9wdHMgPSBOUE1hcExpYi5MYXllcnMuT3ZlcmxheUxheWVyT3B0cztcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG4vLyDorr7lpIfnsbvlnosg5p6a5Li+XHJcbmltcG9ydCBEZXZpY2VFbnVtIGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9EZXZpY2VFbnVtJztcclxuaW1wb3J0IHtMYXllclR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9MYXllclR5cGUnO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7TGFtcFdpdGhEZXZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9MYW1wV2l0aERldmljZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgcG9wdWxXaWZpOiBhbnksIHBvcHVsQ2FtZXJhOiBhbnksIFBvcHVwSHRtbDogYW55LCBlZlJlc291cmNlUG9pbnRIdG1sOiBhbnksIHBvcHVsQ2FyQ2FtZXJhOiBhbnksIHBvcHVsTGFtcFBvc3RQb2ludDogYW55LCB2aWRlb01hcFBvaW50SHRtbDogYW55LCBhbmd1bGFyOmFueTtcclxuXHJcbmNsYXNzIFJlc291cmNlU2VhcmNoTWFwQ29udHJvbGxlciAge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcIm15bGF5ZXJcIiwgXCJsYXllclwiLCBcImkxOG5GYWN0b3J5XCIsIFwibWFwU2VydmljZVwiLCBcIiRxXCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsIFwibGF5ZXJEZWNcIl07XHJcblxyXG4gICAgbWFwSWQ6IHN0cmluZyA9IFwicmVzb3VyY2VTZWFyY2hNYXBcIjtcclxuICAgIG1hcENvbmZpZ05hbWU6IHN0cmluZyA9IE1hcENvbmZpZ0pzb25FbnVtLk1BUENPTkZJRztcclxuICAgIG1hcDogTlBHaXNNYXBNYWluID0gbnVsbDtcclxuICAgIGNlbnRlclBvaW50OiBhbnk7IC8vIOWtmOWCqOWcsOWbvuWIneWni+WMlueCueS9jeWkjeS9jeS9v+eUqFxyXG4gICAgaW5pdFpvb206IG51bWJlcjsgLy8g5a2Y5YKo5Zyw5Zu+5Yid5aeL5YyW5bGC57qn5aSN5L2N5L2/55SoXHJcbiAgICB0b3RhbERldmljZTogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgc2hvd0FsbERldmljZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzaG93VmlkZW86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd2ZhY2ViYXlvbmV0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3djYXJ2b2lkZW86IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd3BlcnNvbmJheW9uZXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd2NhcmJheW9uZXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd1dpZmk6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0xhbXA6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd0VsZWN0cm9uaWNmZW5jZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgc3RhdGljMkQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2VsZWN0VHlwZTogc3RyaW5nID0gXCJBbGxcIjtcclxuICAgIHNlbGVjdERldmljZUNiOiBzdHJpbmcgPSBcImNsb3NlLmRldmljZS5wb3B1cFwiO1xyXG4gICAgc2VsZWN0RGV2aWNlSWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IEZ1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBteWxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG1hcFNlcnZpY2U6IElNYXBTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkcTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gbnVsbDtcclxuICAgICAgICB0aGlzLmluaXRNYXAoKTtcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tYXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm15bGF5ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2RldmljZV9wb3B1cF9sYXllcicsIChldmVudDogYW55LCBpdGVtOiBhbnksIHR5cGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldERldmljZUluZm8oaXRlbSwgMyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIOebkeWQrOW5v+aSreS6i+S7ti0t5qGG6YCJ6K6+5aSH57G75Z6LXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwic2VhcmNoLWRldmljZS10eXBlXCIsIGZ1bmN0aW9uIChldmVudDogYW55LCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiQ2FtZXJhXCI6IHNlbGYuc2VsZWN0VHlwZSA9IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJSbXBHYXRlXCI6IHNlbGYuc2VsZWN0VHlwZSA9IE9iamVjdFR5cGUuUm1wR2F0ZS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRUZFTkNFXCI6IHNlbGYuc2VsZWN0VHlwZSA9IE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJXaUZpXCI6IHNlbGYuc2VsZWN0VHlwZSA9IE9iamVjdFR5cGUuV2lmaS52YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g55uR5ZCs5bm/5pKt5LqL5Lu2LS3ov5Tlm57moYbpgInorr7lpIdpZFxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihzZWxmLnNlbGVjdERldmljZUNiLCAoZXZlbnQ6IGFueSwgZGV2aWNlSWRzOiBBcnJheTxzdHJpbmc+LCBzdGF0dXM6Ym9vbGVhbiwgZ2VvbWV0cnk/OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0dXMpIHsvLyDpgInkuK1cclxuICAgICAgICAgICAgICAgIC8vIOWIpOaWreiuvuWkh+aVsOmHj1xyXG4gICAgICAgICAgICAgICAgaWYgKGRldmljZUlkcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjmkYTlg4/mnLrorr7lpIfvvIEnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLm1hcC5yZW1vdmVPdmVybGF5KGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWxlY3RUeXBlID09PSBcIkFsbFwiKSB7IC8vIOW/q+mAn+ajgOe0olxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiRzY29wZS4kYnJvYWRjYXN0KFwic2VhcmNoLWRldmljZS1pZFwiLCBkZXZpY2VJZHMsIHNlbGYuc2VsZWN0VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgeyAvLyDpq5jnuqfmo4DntKJcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFyckRldmljZUlkczogQXJyYXk8c3RyaW5nPiA9IGFuZ3VsYXIuY29weShzZWxmLnNlbGVjdERldmljZUlkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyckRldmljZUlkcyA9IF8uY29uY2F0KGRldmljZUlkcywgYXJyRGV2aWNlSWRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyRGV2aWNlSWRzID0gXy51bmlxKGFyckRldmljZUlkcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0RGV2aWNlSWRzID0gYXJyRGV2aWNlSWRzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHsvLyAg5Y+W5raIXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1hcC5yZW1vdmVPdmVybGF5KGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLmxheWVyLmNsb3NlKHNlbGYuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzlub/mkq3kuovku7YtLea4hemZpOahhumAiVxyXG4gICAgICAgIHNlbGYuJHNjb3BlLiRvbihcIm1hcC1jbGVhci1kcmF3XCIsIChldmVudDogYW55LCBkYXRhOnN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLm1hcC5jbGVhckRyYXcoKTtcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3REZXZpY2VJZHMgPSBbXTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8g5Zyw5Zu+5ZGo6L656K6+5aSHXHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKFwibWFwLXBlcmlwaGVyYWwtaW5mb3JtYXRpb25cIiwgKGV2ZW50OiBhbnksIGRhdGE6c3RyaW5nLCBjYWxsYmFjazogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHNlbGYubWFwLmFkZENpcmNsZVNlYXJjaENvbnRyb2woZGF0YSxjYWxsYmFjayw1MDAwLDUwMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5Zyw5Zu+LOe7meWQhOe6p+WcsOWbvuWPkeWcsOWbvuaVsOaNrlxyXG4gICAgICovXHJcbiAgICBpbml0TWFwKCkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXBDb25maWcodGhpcy5tYXBDb25maWdOYW1lKS50aGVuKChkYXRhOiBNYXBDb25maWdNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBOUEdpc01hcE1haW4oKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuaW5pdCh0aGlzLm1hcElkLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0U3lzdGVtUG9pbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jZW50ZXJQb2ludCA9IHRoaXMubWFwLmdldENlbnRlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRab29tID0gdGhpcy5tYXAuZ2V0Wm9vbSgpO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS5tYXAgPSB0aGlzLm1hcDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhdGhpcy5tYXApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KCdtYXAucmVzb3VyY2VSZXRyaWV2YWwnLCB0aGlzLm1hcCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDMwMDApO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tMYXllckl0ZW0obGF5ZXJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKGxheWVyTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvd0FsbERldmljZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWxsRGV2aWNlID0gIXRoaXMuc2hvd0FsbERldmljZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dBbGxEZXZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dWaWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93ZmFjZWJheW9uZXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd2NhcnZvaWRlbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93cGVyc29uYmF5b25ldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93Y2FyYmF5b25ldCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93V2lmaSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TGFtcCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93RWxlY3Ryb25pY2ZlbmNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93VmlkZW8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dmYWNlYmF5b25ldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd2NhcnZvaWRlbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd3BlcnNvbmJheW9uZXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3djYXJiYXlvbmV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93V2lmaSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xhbXAgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFbGVjdHJvbmljZmVuY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5ZXJTdHlsZUJ5RGV2aWNlVHlwZShcImFsbFwiLCB0aGlzLnNob3dBbGxEZXZpY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaG93VmlkZW9cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvID0gIXRoaXMuc2hvd1ZpZGVvO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMYXllclN0eWxlQnlEZXZpY2VUeXBlKExheWVyVHlwZS5IaWdoQ2FtZXJhLnZhbHVlLCB0aGlzLnNob3dWaWRlbyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNob3dmYWNlYmF5b25ldFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93ZmFjZWJheW9uZXQgPSAhdGhpcy5zaG93ZmFjZWJheW9uZXQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExheWVyU3R5bGVCeURldmljZVR5cGUoTGF5ZXJUeXBlLkZhY2VDYW1lcmEudmFsdWUsIHRoaXMuc2hvd2ZhY2ViYXlvbmV0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBcInNob3djYXJ2b2lkZW9cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd2NhcnZvaWRlbyA9ICF0aGlzLnNob3djYXJ2b2lkZW87XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExheWVyU3R5bGVCeURldmljZVR5cGUoTGF5ZXJUeXBlLkNhckNhbWVyYS52YWx1ZSwgdGhpcy5zaG93Y2Fydm9pZGVvKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvd3BlcnNvbmJheW9uZXRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd3BlcnNvbmJheW9uZXQgPSAhdGhpcy5zaG93cGVyc29uYmF5b25ldDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5ZXJTdHlsZUJ5RGV2aWNlVHlwZShMYXllclR5cGUuUG9ydHJhaXRDYW1lcmEudmFsdWUsIHRoaXMuc2hvd3BlcnNvbmJheW9uZXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzaG93Y2FyYmF5b25ldFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Y2FyYmF5b25ldCA9ICF0aGlzLnNob3djYXJiYXlvbmV0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRMYXllclN0eWxlQnlEZXZpY2VUeXBlKExheWVyVHlwZS5SbXBHYXRlLnZhbHVlLCB0aGlzLnNob3djYXJiYXlvbmV0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvd1dpZmlcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1dpZmkgPSAhdGhpcy5zaG93V2lmaTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5ZXJTdHlsZUJ5RGV2aWNlVHlwZShMYXllclR5cGUuV2lGaS52YWx1ZSwgdGhpcy5zaG93V2lmaSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInNob3dMYW1wXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dMYW1wID0gIXRoaXMuc2hvd0xhbXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldExheWVyU3R5bGVCeURldmljZVR5cGUoTGF5ZXJUeXBlLkxhbXBQb3N0LnZhbHVlLCB0aGlzLnNob3dMYW1wKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2hvd0VsZWN0cm9uaWNmZW5jZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RWxlY3Ryb25pY2ZlbmNlID0gIXRoaXMuc2hvd0VsZWN0cm9uaWNmZW5jZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TGF5ZXJTdHlsZUJ5RGV2aWNlVHlwZShMYXllclR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlLCB0aGlzLnNob3dFbGVjdHJvbmljZmVuY2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0TGF5ZXJTdHlsZUJ5RGV2aWNlVHlwZShsYXllck5hbWU6IHN0cmluZywgc3R5bGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm1hcC5zZXRPdmVybGF5U2hvd0J5TGF5ZXJUeXBlKGxheWVyTmFtZSwgc3R5bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFN5c3RlbVBvaW50KCkge1xyXG4gICAgICAgIHRoaXMuZ2V0U3lzdGVtUG9pbnQoKS50aGVuKChyZXM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW5kZXJNYXJrZXJzKHJlcywgdGhpcy5iaW5kTWFwUG9pbml0RXZlbnQoKSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIERyYXdDYWxsQmFja01ldGhvZChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgoc2VsZi5zZWxlY3RUeXBlID09PSBcIkFsbFwiKXx8KGl0ZW0uT2JqZWN0VHlwZSA9PT0gc2VsZi5zZWxlY3RUeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzZWxmLm1hcC5yZW1vdmVPdmVybGF5KGdlb21ldHJ5KTtcclxuICAgICAgICAgICAgc2VsZi5sYXllci5tc2coXCLmoYbpgInljLrln5/kuI3lrZjlnKjorr7lpIfvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmNoZWNrQXJlYShhcnIsIGdlb21ldHJ5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVja0FyZWEoZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBkZXZpY2VMaXN0OiBhbnksIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uIHwgTlBNYXBMaWIuR2VvbWV0cnkuQ2lyY2xlLCAkZGVzdHJveTogRnVuY3Rpb24sIHNlbGVjdENoZWNrQXJlYUNiOnN0cmluZyB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmRldmljZUxpc3QgPSBkZXZpY2VMaXN0O1xyXG4gICAgICAgIHNjb3BlLmdlb21ldHJ5ID0gZ2VvbWV0cnk7XHJcbiAgICAgICAgc2NvcGUuc2VsZWN0Q2hlY2tBcmVhQ2IgPSB0aGlzLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBjbG9zZUJ0bjogMCxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgYXJlYTogW1wiMzAwcHhcIiwgXCIzMDBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBhZGRIZWF0TWFwTGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMudG90YWxEZXZpY2UgYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRoZWF0bGF5ZXIoYXJyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTYXRlbGxpdGUoKSB7XHJcbiAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmdldE1hcENvbmZpZyh0aGlzLm1hcENvbmZpZ05hbWUpLnRoZW4oKGRhdGE6IE1hcENvbmZpZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGljMkQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0QmFzZU1hcExheWVyKGRhdGEsIFwiYmFzZU1hcFNhdGVsbGl0ZVwiKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzZXQyRCgpIHtcclxuICAgICAgICB0aGlzLm1hcFNlcnZpY2UuZ2V0TWFwQ29uZmlnKHRoaXMubWFwQ29uZmlnTmFtZSkudGhlbigoZGF0YTogTWFwQ29uZmlnTW9kZWwpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdGF0aWMyRCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldEJhc2VNYXBMYXllcihkYXRhLCBcImJhc2VNYXAyRFwiKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbVBvaW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcFNlcnZpY2UuZ2V0U3lzdGVtUG9pbnRzKCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxTeXN0ZW1Qb2ludD4+KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxEZXZpY2UgPSBhcnI7XHJcbiAgICAgICAgICAgIGlmICghIXJlcyAmJiAhIXJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKChpdGVtOiBTeXN0ZW1Qb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLkxheWVyVHlwZSAmJiBpdGVtLkxhdCAmJiBpdGVtLkxvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLnN5c3RlbVBvaW50ID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi6I635Y+W54K55L2N5aSx6LSlXCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBNYWtlckNsaWNrKG1hcmtlcnM6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcG9pbnQgPSBtYXJrZXJzLmdldFBvc2l0aW9uKCkgYXMgTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHBvaW50LCB0aGlzLm1hcC5nZXRab29tKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIERyYXdSZWN0KCkge1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlTW92ZUhhbmQoKTtcclxuICAgICAgICB0aGlzLm1hcC5zZWxlY3RSZWN0YW5nbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLlJlbW92ZU1vdmVIYW5kKCk7XHJcbiAgICAgICAgdGhpcy5tYXAuc2VsZWN0Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1BvbHlnb24oKSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVNb3ZlSGFuZCgpO1xyXG4gICAgICAgIHRoaXMubWFwLnNlbGVjdFBvbHlnb24oKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0xpbmUoKSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVNb3ZlSGFuZCgpO1xyXG4gICAgICAgIHRoaXMubWFwLmRyYXdMaW5lKChwb2ludHM6IEFycmF5PE5QTWFwTGliLkdlb21ldHJ5LlBvaW50PikgPT4ge1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgQ2xlYXJEcmF3KCkge1xyXG4gICAgICAgIHRoaXMuUmVtb3ZlTW92ZUhhbmQoKTtcclxuICAgICAgICB0aGlzLm1hcC5jbGVhckRyYXcoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdERldmljZUlkcyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIE1vdmVNYXAoKSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVNb3ZlSGFuZCgpO1xyXG4gICAgICAgIHRoaXMubWFwLmhhbmRNb3ZlTWFwKClcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpIHtcclxuICAgICAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgICAgICAgIGxvbjogdGhpcy5jZW50ZXJQb2ludC5sb24sXHJcbiAgICAgICAgICAgIGxhdDogdGhpcy5jZW50ZXJQb2ludC5sYXRcclxuICAgICAgICB9IGFzIE5QTWFwTGliLkdlb21ldHJ5LlBvaW50O1xyXG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihwb2ludCwgdGhpcy5pbml0Wm9vbSlcclxuICAgIH1cclxuXHJcbiAgICBtZWFzdXJlRGlzdGFuY2UoKSB7XHJcbiAgICAgICAgdGhpcy5SZW1vdmVNb3ZlSGFuZCgpO1xyXG4gICAgICAgIHRoaXMubWFwLm1lYXN1cmVEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlbW92ZU1vdmVIYW5kKCkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU1vdmVTdHlsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU1hcExheWVyKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidGhlcm1hbENoYXJ0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEhlYXRNYXBMYXllcigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzYXRlbGxpdGVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2F0ZWxsaXRlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVhcnRoXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldDJEKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtYXBUb29scyh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcIm1vdmVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuTW92ZU1hcCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzcXVhcmVcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd1JlY3QoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2lyY2xlXCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDaXJjbGUoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwicG9seWxnb25cIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd1BvbHlnb24oKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY2xlYXJcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMuQ2xlYXJEcmF3KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInJlc2V0XCI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIm1pblwiOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtYXhcIjpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwibWVhc3VyZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tZWFzdXJlRGlzdGFuY2UoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwic2F2ZVwiOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJwb2x5bGluZVwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5EcmF3TGluZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3Vwc1R5cGVBY3Rpb24obWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIsIGluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBjYW1lcmFMYXllcklkID0gXCJtYXBXaWZpUG9wdWxcIjtcclxuICAgICAgICBsZXQgbWFwUG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50O1xyXG4gICAgICAgIGlmIChtYXJrZXIpIHtcclxuICAgICAgICAgICAgbWFwUG9pbnQgPSBtYXJrZXIuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXBQb2ludCA9IHtcclxuICAgICAgICAgICAgICAgIGxvbjogaW5mby5Mb24sXHJcbiAgICAgICAgICAgICAgICBsYXQ6IGluZm8uTGF0XHJcbiAgICAgICAgICAgIH0gYXMgTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwYWdlUG9pbnQgPSB0aGlzLm1hcC5wb2ludFRvUGl4ZWwobWFwUG9pbnQpO1xyXG4gICAgICAgIHBhZ2VQb2ludC55IC09IDMwMDtcclxuICAgICAgICBsZXQgcCA9IHRoaXMubWFwLnBpeGVsVG9Qb2ludChwYWdlUG9pbnQpO1xyXG4gICAgICAgIHRoaXMubWFwLnNldENlbnRlcihwLCB0aGlzLm1hcC5nZXRab29tKCkpO1xyXG4gICAgICAgIGxldCBwMiA9IHRoaXMubWFwLnBvaW50VG9QaXhlbCh0aGlzLm1hcC5nZXRDZW50ZXIoKSk7XHJcbiAgICAgICAgcDIueSArPSAzMDA7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IFBvaW50RGVUYWlsOiBhbnksIGxheWVySWQ6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBwb3NpdGlvbjogbnVtYmVyLCBtYXJrZXI6IGFueSB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmxheWVySWQgPSBjYW1lcmFMYXllcklkO1xyXG4gICAgICAgIHNjb3BlLlBvaW50RGVUYWlsID0gaW5mbztcclxuICAgICAgICBzY29wZS5wb3NpdGlvbiA9IHAyO1xyXG4gICAgICAgIHNjb3BlLm1hcmtlciA9IG1hcmtlcjtcclxuICAgICAgICBpZiAobWFya2VyKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAobWFya2VyLm1hcmtUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2FtZXJhXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIExheWVyVHlwZS5DYW1lcmEudmFsdWU6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiUG9ydHJhaXRDYW1lcmFcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJGYWNlQ2FtZXJhXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiSGlnaENhbWVyYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcG9wdWxDYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJXaUZpXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwid2lmaVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuV2lGaS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVsV2lmaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogY2FtZXJhTGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7bGVmdDogKHAyLnggLSAoNTQwIC8gMikpLCB0b3A6IChwMi55IC0gMzEwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkNhckNhbWVyYVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuQ2FyQ2FtZXJhLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcG9wdWxDYXJDYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJlZmVuY2VcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJFbGVjdHJvbmljRmVuY2VcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGVmUmVzb3VyY2VQb2ludEh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbyhcIuacquaJvuWIsOWvueW6lOiuvuWkh1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChpbmZvLk9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjYW1lcmFcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJQb3J0cmFpdENhbWVyYVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkZhY2VDYW1lcmFcIjpcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJIaWdoQ2FtZXJhXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogcG9wdWxDYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3aWZpXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuV2lmaS52YWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVsV2lmaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogY2FtZXJhTGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7bGVmdDogKHAyLnggLSAoNTQwIC8gMikpLCB0b3A6IChwMi55IC0gMzEwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkNhckNhbWVyYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oXCLmmoLmnKrlrp7njrDovabovobkv6Hmga9cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWZlbmNlXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIE9iamVjdFR5cGUuRWxlY3Ryb25pY0ZlbmNlLnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVsZWN0cm9uaWNGZW5jZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogZWZSZXNvdXJjZVBvaW50SHRtbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogY2FtZXJhTGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7bGVmdDogKHAyLnggLSAoNTQwIC8gMikpLCB0b3A6IChwMi55IC0gMzEwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKFwi5pyq5om+5Yiw6K6+5aSH5L+h5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29udGVudDogcG9wdWxXaWZpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIElEOiBcInBvcHVsV2lmaVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBBcmVhQW5kUG9zaXRpb246IHtsZWZ0OiAocDIueCAtICg1MzUgLyAyKSksIHRvcDogKHAyLnkgLSAzODApLCB3aWR0aDogNTM1LCBoZWlnaHQ6IDQwMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIChpbmZvLk9iamVjdFR5cGUgPT0gJ2NhbWVyYScpIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb250ZW50OiBwb3B1bENhbWVyYSxcclxuICAgICAgICAgICAgLy8gICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7IGxlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwIH0sXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KClcclxuICAgICAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vICAgICB9KTtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgLy8gICAgICAgICBjb250ZW50OiBwb3B1bFdpZmksXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIElEOiBjYW1lcmFMYXllcklkLFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjogeyBsZWZ0OiAocDIueCAtICg1NDAgLyAyKSksIHRvcDogKHAyLnkgLSAzMTApLCB3aWR0aDogNTQwLCBoZWlnaHQ6IDMzMCB9LFxyXG4gICAgICAgICAgICAvLyAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYmluZE1hcFBvaW5pdEV2ZW50KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNsaWNrOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRDbGljayhtYXJrZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBtb3VzZW91dDogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnBvaW50TW91c2VvdXQobWFya2VyKTtcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgLy8gbW91c2VvdmVyOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9pbnRNb3VzZW92ZXIobWFya2VyKTtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0gYXMgT3ZlcmxheUxheWVyT3B0c1xyXG4gICAgfVxyXG5cclxuICAgIHBvaW50TW91c2VvdXQobWFya2VyOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcG9pbnRNb3VzZW92ZXIobWFya2VyOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKG1hcmtlci5MYXllclR5cGUgPT09IExheWVyVHlwZS5MYW1wUG9zdC52YWx1ZSkge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IG1hcmtlci5PYmplY3RJRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5maW5kTGFtcERldmljZUNoaWxkcmVuQnlJZChwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldExhbXBQb3N0RGF0YShyZXMuZGF0YSwgbWFya2VyKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKFwi56uL5p2G6K6+5aSH5p+l6K+i5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlpITnkIbnq4vmnYbmlbDmja5cclxuICAgIHNldExhbXBQb3N0RGF0YShkYXRhOiBhbnksIG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkZXZpY2VMaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBkYXRhLkNhbWVyYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGV2aWNlTGlzdC5sZW5ndGggPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGEuQ2FtZXJhW2ldLkNhbWVyYVR5cGUgPT09IFwiRmFjZUNhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLkNhbWVyYVtpXS5pY29uVHlwZSA9IFwiZmFjZUNhbWVyYVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuQ2FtZXJhW2ldLkNhbWVyYVR5cGUgPT09IFwiQ2FyQ2FtZXJhXCIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuQ2FtZXJhW2ldLmljb25UeXBlID0gXCJjYXJDYW1lcmFcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLkNhbWVyYVtpXS5DYW1lcmFUeXBlID09PSBcIkhpZ2hDYW1lcmFcIikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5DYW1lcmFbaV0uaWNvblR5cGUgPSBcImhkXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5DYW1lcmFbaV0uQ2FtZXJhVHlwZSA9PT0gXCJQb3J0cmFpdENhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLkNhbWVyYVtpXS5pY29uVHlwZSA9IFwiZmFjZVwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEuQ2FtZXJhW2ldLkNhbWVyYVR5cGUgPT09IFwiTm9ybWFsQ2FtZXJhXCIpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEuQ2FtZXJhW2ldLmljb25UeXBlID0gXCJjYW1lcmFcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGV2aWNlTGlzdC5wdXNoKGRhdGEuQ2FtZXJhW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEuV2lGaS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGV2aWNlTGlzdC5sZW5ndGggPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5XaUZpW2ldLmljb25UeXBlID0gXCJ3aWZpXCI7XHJcbiAgICAgICAgICAgIGRldmljZUxpc3QucHVzaChkYXRhLldpRmlbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGF0YS5FbGVjdHJvbmljRmVuY2UubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGRldmljZUxpc3QubGVuZ3RoID49IDgpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGEuRWxlY3Ryb25pY0ZlbmNlW2ldLmljb25UeXBlID0gXCJlZmVuY2VcIjtcclxuICAgICAgICAgICAgZGV2aWNlTGlzdC5wdXNoKGRhdGEuRWxlY3Ryb25pY0ZlbmNlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGRhdGEuUm1wR2F0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZGV2aWNlTGlzdC5sZW5ndGggPj0gOCkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5SbXBHYXRlW2ldLmljb25UeXBlID0gXCJjYXJcIjtcclxuICAgICAgICAgICAgZGV2aWNlTGlzdC5wdXNoKGRhdGEuUm1wR2F0ZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYW1wUG9zdExheWVySWQgPSBcImxhbXBQb3N0UG9wdWxcIjtcclxuICAgICAgICBsZXQgbWFwUG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50O1xyXG4gICAgICAgIG1hcFBvaW50ID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHBhZ2VQb2ludCA9IHRoaXMubWFwLnBvaW50VG9QaXhlbChtYXBQb2ludCk7XHJcbiAgICAgICAgbGV0IHAgPSBzZWxmLm1hcC5waXhlbFRvUG9pbnQocGFnZVBvaW50KTtcclxuICAgICAgICBsZXQgcDIgPSBzZWxmLm1hcC5wb2ludFRvUGl4ZWwoc2VsZi5tYXAuZ2V0Q2VudGVyKCkpO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcklkOiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgcG9zaXRpb246IG51bWJlciwgZGV2aWNlTGlzdDogQXJyYXk8YW55PiwgbWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIsIGNoaWxkQ2xpY2s6IGFueSB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmxheWVySWQgPSBsYW1wUG9zdExheWVySWQ7XHJcbiAgICAgICAgc2NvcGUucG9zaXRpb24gPSBwMjtcclxuICAgICAgICBzY29wZS5kZXZpY2VMaXN0ID0gZGV2aWNlTGlzdDtcclxuICAgICAgICBzY29wZS5tYXJrZXIgPSBtYXJrZXI7XHJcbiAgICAgICAgc2NvcGUuY2hpbGRDbGljayA9IChpbmZvOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5nZXREZXZpY2VJbmZvKGluZm8sIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVsTGFtcFBvc3RQb2ludCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBJRDogbGFtcFBvc3RMYXllcklkLFxyXG4gICAgICAgICAgICBBcmVhQW5kUG9zaXRpb246IHtsZWZ0OiAocGFnZVBvaW50LnggLSAxMDMpLCB0b3A6IChwYWdlUG9pbnQueSAtIDMxKSwgd2lkdGg6IDIwNiwgaGVpZ2h0OiAxNzB9LFxyXG4gICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG1hcFdpZmlQb3B1bENsb3NlKCkge1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oXCIkZGVzdHJveVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubXlsYXllci5kZXN0cm95KClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFyb3VuZERpdmljZSgpIHtcclxuICAgICAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgICAgICAgIGxvbjogMTE0LjI2NTU0MzQsXHJcbiAgICAgICAgICAgIGxhdDogMzAuNDc0NDEzOFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBpbGVyKHJlczogYW55KSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm1hcC5hZGRDaXJjbGVTZWFyY2hDb250cm9sKHBvaW50LCBjb21waWxlciwgMCwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27op6blj5HlnLDlm77lvLnmoYbliKTmlq3orr7lpIfnsbvlnotcclxuICAgICAqIEBwYXJhbSBpbmZvXHJcbiAgICAgKiBAcGFyYW0gbnVtIDE6IOWcsOWbvueCueS9jeeCueWHuyAyOueri+adhueCueWHuyAzOuajgOe0oue7k+aenFxyXG4gICAgICovXHJcbiAgICBnZXREZXZpY2VJbmZvKGluZm86IGFueSwgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRldmljZUluZm86IGFueSA9IHtcclxuICAgICAgICAgICAgTmFtZTogXCJcIixcclxuICAgICAgICAgICAgSUQ6IFwiXCIsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBMYXQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBMb246IFwiXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICBPYmplY3RUeXBlOiBcIlwiLFxyXG4gICAgICAgICAgICBMYXllclR5cGU6IFwiXCIsXHJcbiAgICAgICAgICAgIE9iamVjdElEOiBcIlwiLFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAobnVtID09PSAxKSB7XHJcbiAgICAgICAgICAgIGRldmljZUluZm8uTmFtZSA9IGluZm8uT2JqZWN0TmFtZTtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5JRCA9IGluZm8uT2JqZWN0SUQ7XHJcbiAgICAgICAgICAgIGRldmljZUluZm8ucG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBMYXQ6IGluZm8ubG9jYXRpb24ubGF0LFxyXG4gICAgICAgICAgICAgICAgTG9uOiBpbmZvLmxvY2F0aW9uLmxvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5PYmplY3RUeXBlID0gaW5mby5PYmplY3RUeXBlO1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLkxheWVyVHlwZSA9IGluZm8uTGF5ZXJUeXBlO1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLk9iamVjdElEID0gaW5mby5PYmplY3RJRDtcclxuICAgICAgICB9IGVsc2UgaWYgKG51bSA9PT0gMikge1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLk5hbWUgPSBpbmZvLk5hbWU7XHJcbiAgICAgICAgICAgIGRldmljZUluZm8uSUQgPSBpbmZvLklEO1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLnBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgTGF0OiBpbmZvLkxhdCxcclxuICAgICAgICAgICAgICAgIExvbjogaW5mby5Mb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGRldmljZUluZm8uT2JqZWN0VHlwZSA9IGluZm8uT2JqZWN0VHlwZTtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5MYXllclR5cGUgPSBpbmZvLkxheWVyVHlwZTtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5PYmplY3RJRCA9IGluZm8uSUQ7XHJcbiAgICAgICAgfSBlbHNlIGlmIChudW0gPT09IDMpIHtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5OYW1lID0gaW5mby5OYW1lO1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLklEID0gaW5mby5JZDtcclxuICAgICAgICAgICAgZGV2aWNlSW5mby5wb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIExhdDogaW5mby5MYXQsXHJcbiAgICAgICAgICAgICAgICBMb246IGluZm8uTG9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBkZXZpY2VJbmZvLk9iamVjdFR5cGUgPSBpbmZvLk9iamVjdFR5cGU7XHJcbiAgICAgICAgICAgIGRldmljZUluZm8uTGF5ZXJUeXBlID0gaW5mby5MYXllclR5cGU7XHJcbiAgICAgICAgICAgIGRldmljZUluZm8uT2JqZWN0SUQgPSBpbmZvLklkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5nZXREZXZpY2VCeUlkKGRldmljZUluZm8uT2JqZWN0SUQsIGRldmljZUluZm8uT2JqZWN0VHlwZSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIHJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mby5OYW1lID0gcmVzLmRhdGEuTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGV2aWNlSW5mby5PYmplY3RUeXBlID09PSBcIkNhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXJlcy5kYXRhLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mby5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mby5kYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvZGU6IHJlcy5kYXRhLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlci5Db2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElwQWRkcmVzczogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLklwQWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQb3J0OiByZXMuZGF0YS5Kc29uVXNlckRhdGEuVmlkZW9TZXJ2ZXIuUG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQd2Q6IHJlcy5kYXRhLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlci5Qd2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVWlkOiByZXMuZGF0YS5Kc29uVXNlckRhdGEuVmlkZW9TZXJ2ZXIuVWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFZpZGVvU2VydmVyVHlwZTogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLlZpZGVvU2VydmVyVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcm94eVNlcnZlcklEOiByZXMuZGF0YS5Kc29uVXNlckRhdGEuVmlkZW9TZXJ2ZXIuUHJveHlTZXJ2ZXJJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGF5TmFtZTogcmVzLmRhdGEuUGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUFlDb2RlOiByZXMuZGF0YS5QWUNvZGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VJbmZvLnN0YXR1cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1BvdXBzQWN0aW9uKGRldmljZUluZm8pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKFwi6K+35rGC5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwb2ludENsaWNrKG1hcmtlcjogYW55KSB7XHJcbiAgICAgICAgaWYgKG1hcmtlci5MYXllclR5cGUgPT09IExheWVyVHlwZS5MYW1wUG9zdC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50TW91c2VvdmVyKG1hcmtlcik7XHJcbiAgICAgICAgICAgIC8vIG1vdXNlb3V0OiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMucG9pbnRNb3VzZW91dChtYXJrZXIpO1xyXG4gICAgICAgICAgICAvLyB9LFxyXG4gICAgICAgICAgICAvLyBtb3VzZW92ZXI6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAvLyAgICAgdGhpcy5wb2ludE1vdXNlb3ZlcihtYXJrZXIpO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmdldERldmljZUluZm8obWFya2VyLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BvdXBzQWN0aW9uKGRldmljZUluZm86IGFueSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgY2FtZXJhTGF5ZXJJZCA9IFwibWFwUG91cHNCb3hcIjtcclxuICAgICAgICBsZXQgbWFwUG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50O1xyXG4gICAgICAgIG1hcFBvaW50ID0ge1xyXG4gICAgICAgICAgICBsb246IGRldmljZUluZm8ucG9zaXRpb24uTG9uLFxyXG4gICAgICAgICAgICBsYXQ6IGRldmljZUluZm8ucG9zaXRpb24uTGF0XHJcbiAgICAgICAgfSBhcyBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludDtcclxuICAgICAgICBsZXQgcGFnZVBvaW50ID0gc2VsZi5tYXAucG9pbnRUb1BpeGVsKG1hcFBvaW50KTtcclxuICAgICAgICBwYWdlUG9pbnQueSAtPSAzMDA7XHJcbiAgICAgICAgbGV0IHAgPSBzZWxmLm1hcC5waXhlbFRvUG9pbnQocGFnZVBvaW50KTtcclxuICAgICAgICBzZWxmLm1hcC5zZXRDZW50ZXIocCwgc2VsZi5tYXAuZ2V0Wm9vbSgpKTtcclxuICAgICAgICBsZXQgcDIgPSBzZWxmLm1hcC5wb2ludFRvUGl4ZWwoc2VsZi5tYXAuZ2V0Q2VudGVyKCkpO1xyXG4gICAgICAgIHAyLnkgKz0gMzAwO1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcklkOiBzdHJpbmcsICRkZXN0cm95OiBGdW5jdGlvbiwgUG9pbnREZVRhaWw6IGFueSwgcG9zaXRpb246IGFueSB9ID0gc2VsZi4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmxheWVySWQgPSBjYW1lcmFMYXllcklkO1xyXG4gICAgICAgIHNjb3BlLlBvaW50RGVUYWlsID0gZGV2aWNlSW5mbztcclxuICAgICAgICBzY29wZS5wb3NpdGlvbiA9IHAyO1xyXG5cclxuICAgICAgICAvLyBzZWxmLm15bGF5ZXIuY2xvc2UoY2FtZXJhTGF5ZXJJZCk7XHJcbiAgICAgICAgc3dpdGNoIChkZXZpY2VJbmZvLkxheWVyVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5DYW1lcmEudmFsdWU6IC8vIOWPquaSreaUvuinhumikVxyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5IaWdoQ2FtZXJhLnZhbHVlOlxyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5Ob3JtYWxDYW1lcmEudmFsdWU6XHJcbiAgICAgICAgICAgICAgICBzZWxmLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdmlkZW9NYXBQb2ludEh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIElEOiBjYW1lcmFMYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMxMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLlBvcnRyYWl0Q2FtZXJhLnZhbHVlOlxyXG4gICAgICAgICAgICBjYXNlIExheWVyVHlwZS5GYWNlQ2FtZXJhLnZhbHVlOiAvLyDkurrlg49cclxuICAgICAgICAgICAgICAgIHNlbGYubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBwb3B1bENhbWVyYSxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7bGVmdDogKHAyLnggLSAoNTQwIC8gMikpLCB0b3A6IChwMi55IC0gMzAwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuQ2FyQ2FtZXJhLnZhbHVlOiAvLyDovabovoZcclxuICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuUm1wR2F0ZS52YWx1ZTogLy8g5Y2h5Y+jXHJcbiAgICAgICAgICAgICAgICBzZWxmLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogcG9wdWxDYXJDYW1lcmEsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIElEOiBjYW1lcmFMYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMwMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLldpRmkudmFsdWU6IC8vIFdpRmlcclxuICAgICAgICAgICAgICAgIHNlbGYubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBwb3B1bFdpZmksXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIElEOiBjYW1lcmFMYXllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IChwMi54IC0gKDU0MCAvIDIpKSwgdG9wOiAocDIueSAtIDMwMCksIHdpZHRoOiA1NDAsIGhlaWdodDogMzMwfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgTGF5ZXJUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZTogLy8g55S15a2Q5Zu05qCPXHJcbiAgICAgICAgICAgICAgICBzZWxmLm15bGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZWZSZXNvdXJjZVBvaW50SHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6IGNhbWVyYUxheWVySWQsXHJcbiAgICAgICAgICAgICAgICAgICAgQXJlYUFuZFBvc2l0aW9uOiB7bGVmdDogKHAyLnggLSAoNTQwIC8gMikgLSAxMDApLCB0b3A6IChwMi55IC0gMzAwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBMYXllclR5cGUuTGFtcFBvc3QudmFsdWU6IC8vIOeri+adhlxyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbyhcIuacquaJvuWIsOWvueW6lOiuvuWkh1wiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDov5Tlm57pq5jnuqfmo4DntKJcclxuICAgIGJhY2tBZHZhbmNlZCgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kYnJvYWRjYXN0KFwic2VhcmNoLWRldmljZS1pZFwiLCB0aGlzLnNlbGVjdERldmljZUlkcywgdGhpcy5zZWxlY3RUeXBlKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJSZXNvdXJjZVNlYXJjaE1hcENvbnRyb2xsZXJcIiwgUmVzb3VyY2VTZWFyY2hNYXBDb250cm9sbGVyKTsiXX0=
