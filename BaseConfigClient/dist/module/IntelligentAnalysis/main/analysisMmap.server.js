define(["require", "exports", "text!../TrackPopup/track.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "text!../../detailPopup/personPopup/personPopup.html", "text!../../detailPopup/efPopup/efPopup.html", "text!../../detailPopup/wifiPopup/wifiPopup.html", "../../common/map/map.main", "../../common/app/main.app", "../../common/enum/MapConfigJsonEnum", "../AnalysisEnum", "../../../core/enum/ObjectType", "../TrackPopup/track.popup.controller", "../TrackPopupDetail/track.popup.detail.controller", "../../common/services/map.service", "../../detailPopup/personPopup/personPopup.controller", "../../detailPopup/efPopup/efPopup.controller", "../../detailPopup/wifiPopup/wifiPopup.controller", "../../common/faceHandlePopup/selectFace.popup.controller", "../../common/faceHandlePopup/demarcate.popup.controller"], function (require, exports, trackPopupHtml, detailPopupHtml, personPopupHtml, efPopupHtml, wifiPopupHtml, map_main_1, main_app_1, MapConfigJsonEnum_1, AnalysisEnum_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WinPopupType = (function () {
        function WinPopupType() {
        }
        WinPopupType.Marker = 'Marker';
        WinPopupType.Detail = 'Detail';
        WinPopupType.Track = 'Track';
        return WinPopupType;
    }());
    var AnalysisMmapServer = (function () {
        function AnalysisMmapServer($rootScope, $compile, $timeout, layer, mapService) {
            this.$rootScope = $rootScope;
            this.$compile = $compile;
            this.$timeout = $timeout;
            this.layer = layer;
            this.mapService = mapService;
            this.mapId = "AnalysisMap";
            this.mapConfigName = MapConfigJsonEnum_1.MapConfigJsonEnum.MAPCONFIG;
            this.systemPoint = [];
        }
        AnalysisMmapServer.prototype.initMap = function () {
            var _this = this;
            return this.mapService.getMapConfig(this.mapConfigName).then(function (data) {
                _this.map = new map_main_1.NPGisMapMain();
                _this.map.init(_this.mapId, data);
                _this.initForMapLayer();
            });
        };
        AnalysisMmapServer.prototype.getMap = function () {
            return this.map;
        };
        AnalysisMmapServer.prototype.getSystemPoint = function () {
            return this.systemPoint;
        };
        AnalysisMmapServer.prototype.clearResultMarkers = function () {
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup);
        };
        AnalysisMmapServer.prototype.clearAccpMarkers = function () {
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup);
        };
        AnalysisMmapServer.prototype.initForMapLayer = function () {
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForResultLayer);
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForTrackLineLayer);
        };
        AnalysisMmapServer.prototype.renderSystemPoint = function (Points, isReset) {
            if (isReset)
                this.systemPoint = Points;
            this.map.renderMarkers(this.systemPoint, { click: this.MarkerClick });
        };
        AnalysisMmapServer.prototype.removeSystemPoint = function () {
            this.map.removeMarkers(this.systemPoint);
        };
        AnalysisMmapServer.prototype.clearTraceAnalyze = function () {
            if (this.mapTrackID) {
                this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForResultLineGroup);
                this.map.clearTraceAnalyze(this.mapTrackID);
            }
        };
        AnalysisMmapServer.prototype.clearTrackInfoWindow = function () {
            if (this.trackWinInfo) {
                this.map.getInfoWindowByID(this.trackWinInfo).close();
                this.trackWinInfo = null;
            }
        };
        AnalysisMmapServer.prototype.clearAccpTrackInfoWindow = function () {
            if (this.accpTrackWinInfo) {
                this.map.getInfoWindowByID(this.accpTrackWinInfo).close();
                this.accpTrackWinInfo = null;
            }
        };
        AnalysisMmapServer.prototype.resultToMap = function (item, type) {
            if (type) {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
            else {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
        };
        AnalysisMmapServer.prototype.unResultToMap = function (item, resultForMap, type) {
            var res = resultForMap[item.AccessLog.ID];
            if (type) {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
            }
            else {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
            }
        };
        AnalysisMmapServer.prototype.MarkerClick = function (markers) {
            console.log(markers);
        };
        AnalysisMmapServer.prototype.drawRect = function (callback) {
            this.map.selectRectangle(function (points, geometry) {
                callback(points, geometry);
            });
        };
        AnalysisMmapServer.prototype.drawPolygon = function (callback) {
            this.map.selectPolygon(function (points, geometry) {
                callback(points, geometry);
            });
        };
        AnalysisMmapServer.prototype.drawCircle = function (callback) {
            this.map.selectCircle(function (points, geometry) {
                callback(points, geometry);
            });
        };
        AnalysisMmapServer.prototype.removeDrawShape = function (geometry) {
            this.map.removeOverlay(geometry);
        };
        AnalysisMmapServer.prototype.clearDraw = function () {
            this.map.clearDraw();
        };
        AnalysisMmapServer.prototype.renderMakers = function (layerName, groupName, isClear, result, resultForMap, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.map.removeOverlaysByName(layerName, groupName);
            }
            this.map.addOverlaysForMakers(layerName, groupName, result, {
                click: function (marker) {
                    var data = marker.getData();
                    var result = resultForMap[data.resultID];
                    _this.openDetailPopup(result, result.resultIndex);
                },
                mouseOver: function (marker) {
                    var data = marker.getData();
                    var result = resultForMap[data.resultID];
                    _this.createMapPopup(marker.getPosition(), result, WinPopupType.Marker);
                },
                mouseOut: function () {
                    _this.map.getInfoWindowByID(_this.markerWininfo).close();
                },
                iconURL: icon
            }, flag, lables);
        };
        AnalysisMmapServer.prototype.setTrackAnimation = function (trackResult, points, trackResultMap) {
            var _this = this;
            if (Array.isArray(trackResult) && trackResult.length > 0) {
                this.clearTraceAnalyze();
                var style = {
                    color: AnalysisEnum_1.TrackConfig.TrackColorBlue,
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    speed: AnalysisEnum_1.TrackConfig.TrackSpeed,
                    startMarkUrl: AnalysisEnum_1.MarkersIcon.StartBlueIcon,
                    endMarkUrl: AnalysisEnum_1.MarkersIcon.EndIcon,
                    normalMarkUrl: AnalysisEnum_1.MarkersIcon.NormalBlueIcon,
                    moveUrl: AnalysisEnum_1.TrackConfig.PersonTrackBlueHandle,
                    afterDraw: function (evt) {
                        var data = trackResult[evt.index];
                        _this.clearTrackInfoWindow();
                        _this.trackWinInfo = _this.createMapPopup(evt.point, data, WinPopupType.Track);
                    },
                    stop: function () {
                        _this.$timeout(function () {
                            _this.clearTrackInfoWindow();
                        }, 3000);
                    }
                };
                this.map.addOverlaysForLine(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForResultLineGroup, points, {
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    color: AnalysisEnum_1.TrackConfig.LineColorForBlue
                });
                this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, points, trackResultMap);
                this.mapTrackID = this.map.createTraceAnalyze(points, style);
                this.map.startTraceAnalyze(this.mapTrackID);
            }
        };
        AnalysisMmapServer.prototype.setAccpTrackAnimation = function (allAccpTrackResult, points, allAccpTrackResultForMap) {
            var _this = this;
            if (Array.isArray(allAccpTrackResult) && allAccpTrackResult.length > 0) {
                this.map.clearTraceAnalyze(this.mapAccpTrackID);
                var style = {
                    color: AnalysisEnum_1.TrackConfig.TrackColorBlue,
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    speed: AnalysisEnum_1.TrackConfig.TrackSpeed,
                    moveUrl: AnalysisEnum_1.TrackConfig.PersonTrackGreenHandle,
                    afterDraw: function (evt) {
                        var data = allAccpTrackResult[evt.index];
                        _this.clearAccpTrackInfoWindow();
                        _this.accpTrackWinInfo = _this.createMapPopup(evt.point, data, WinPopupType.Track);
                    },
                    stop: function () {
                        _this.$timeout(function () {
                            _this.clearAccpTrackInfoWindow();
                        }, 3000);
                    }
                };
                this.map.addOverlaysForLine(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForAccpLineGroup, points, {
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    color: AnalysisEnum_1.TrackConfig.LineColorForBlue
                });
                this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, points, allAccpTrackResultForMap, false, [], AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
                this.mapAccpTrackID = this.map.createTraceAnalyze(points, style);
                this.map.startTraceAnalyze(this.mapAccpTrackID);
            }
        };
        AnalysisMmapServer.prototype.openDetailPopup = function (item, rank, allList, type, scope) {
            scope.rank = 0;
            if (type === ObjectType_1.ObjectType.Camera.value) {
                scope.index = this.layer.open({
                    type: 1,
                    skin: 'detail-popup-box',
                    title: false,
                    area: ['600px', '390px'],
                    content: personPopupHtml,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else if (type === ObjectType_1.ObjectType.Wifi.value) {
                scope.index = this.layer.open({
                    type: 1,
                    skin: 'detail-popup-box',
                    title: false,
                    area: ['575px', '220px'],
                    content: wifiPopupHtml,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else if (type === ObjectType_1.ObjectType.ElectronicFence.value) {
                scope.index = this.layer.open({
                    type: 1,
                    skin: 'detail-popup-box',
                    title: false,
                    area: ['575px', '220px'],
                    content: efPopupHtml,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
        };
        AnalysisMmapServer.prototype.createMapPopup = function (point, data, type) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        AnalysisMmapServer.prototype.createTrackPopup = function (point, data) {
            var _this = this;
            var WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
            var scope = this.$rootScope.$new();
            scope.traceData = data;
            var dom = $(trackPopupHtml).get(0);
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.map.openInfoWindow(WinInfo, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.map.closeInfoWindow(WinInfo);
                    }
                });
            });
            return WinInfo;
        };
        AnalysisMmapServer.prototype.createMarkerPopup = function (point, data) {
            var _this = this;
            if (data.AccessLog) {
                this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                    iscommon: true,
                    offset: new NPMapLib.Geometry.Size(-82, -248)
                });
            }
            else if (data.EFenceLog) {
                this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                    iscommon: true,
                    offset: new NPMapLib.Geometry.Size(-82, -140)
                });
            }
            else if (data.WiFiLog) {
                this.markerWininfo = this.map.createInfoWindow(point.lon, point.lat, {
                    iscommon: true,
                    offset: new NPMapLib.Geometry.Size(-82, -125)
                });
            }
            var scope = this.$rootScope.$new();
            scope.traceData = data;
            var dom = $(trackPopupHtml).get(0);
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.map.openInfoWindow(_this.markerWininfo, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.map.closeInfoWindow(_this.markerWininfo);
                        _this.markerWininfo = null;
                    }
                });
            });
            return this.markerWininfo;
        };
        AnalysisMmapServer.prototype.getSystemPointForParams = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var CameraID = item.AccessLog.CameraID;
                var s = false;
                for (var index = 0; index < _this.systemPoint.length; index++) {
                    var point = _this.systemPoint[index];
                    if (CameraID === point.ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.AccessLog.ID,
                            Descrption: point.Descrption,
                            LayerType: point.LayerType,
                            ObjectType: point.ObjectType,
                            TaskStatus: point.TaskStatus,
                            ObjectState: point.ObjectState,
                            ObjectName: point.ObjectName
                        });
                        break;
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        AnalysisMmapServer.prototype.destory = function () {
            if (this.map) {
                this.map.destroy();
            }
        };
        AnalysisMmapServer.$inject = ['$rootScope', '$compile', '$timeout', 'layer', 'mapService'];
        return AnalysisMmapServer;
    }());
    main_app_1.app.service('analysisMmapServer', AnalysisMmapServer);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBK0JBO1FBQUE7UUFJQSxDQUFDO1FBSFUsbUJBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsbUJBQU0sR0FBVyxRQUFRLENBQUM7UUFDMUIsa0JBQUssR0FBVyxPQUFPLENBQUM7UUFDbkMsbUJBQUM7S0FKRCxBQUlDLElBQUE7SUEyREQ7UUFhSSw0QkFBb0IsVUFBZSxFQUNmLFFBQWEsRUFDYixRQUFhLEVBQ2IsS0FBVSxFQUNWLFVBQXVCO1lBSnZCLGVBQVUsR0FBVixVQUFVLENBQUs7WUFDZixhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixlQUFVLEdBQVYsVUFBVSxDQUFhO1lBZDNDLFVBQUssR0FBVyxhQUFhLENBQUM7WUFDOUIsa0JBQWEsR0FBVyxxQ0FBaUIsQ0FBQyxTQUFTLENBQUM7WUFJcEQsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO1FBV3JDLENBQUM7UUFPRCxvQ0FBTyxHQUFQO1lBQUEsaUJBTUM7WUFMRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQW9CO2dCQUM5RSxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksdUJBQVksRUFBRSxDQUFDO2dCQUM5QixLQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBTUQsbUNBQU0sR0FBTjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3BCLENBQUM7UUFH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ZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cC90cmFjay5wb3B1cC5odG1sXCIgbmFtZT1cInRyYWNrUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9UcmFja1BvcHVwRGV0YWlsL3RyYWNrLnBvcHVwLmRldGFpbC5odG1sXCIgbmFtZT1cImRldGFpbFBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vZGV0YWlsUG9wdXAvcGVyc29uUG9wdXAvcGVyc29uUG9wdXAuaHRtbFwiIG5hbWU9XCJwZXJzb25Qb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2RldGFpbFBvcHVwL2VmUG9wdXAvZWZQb3B1cC5odG1sXCIgbmFtZT1cImVmUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9kZXRhaWxQb3B1cC93aWZpUG9wdXAvd2lmaVBvcHVwLmh0bWxcIiBuYW1lPVwid2lmaVBvcHVwSHRtbFwiIC8+XHJcbmltcG9ydCBcIi4uL1RyYWNrUG9wdXAvdHJhY2sucG9wdXAuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4uL1RyYWNrUG9wdXBEZXRhaWwvdHJhY2sucG9wdXAuZGV0YWlsLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW5cIjtcclxuaW1wb3J0IHtNYXBDb25maWdNb2RlbH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvY29yZS9tb2RlbC9tYXAuY29uZmlnLm1vZGVsXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0lNYXBTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hcC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQge01hcENvbmZpZ0pzb25FbnVtfSBmcm9tIFwiLi4vLi4vY29tbW9uL2VudW0vTWFwQ29uZmlnSnNvbkVudW1cIjtcclxuaW1wb3J0IHtNYXJrZXJzSWNvbiwgT3ZlcmxheU5hbWUsIFRyYWNrQ29uZmlnfSBmcm9tIFwiLi4vQW5hbHlzaXNFbnVtXCI7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge1BvbHlsaW5lU3R5bGUsIFRyYWNlQW5hbHl6ZU9wdHN9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL21hcC5pbnRlcmZhY2VcIjtcclxuXHJcbi8vIOW8ueahhmNvbnRyb2xsZXJcclxuaW1wb3J0ICcuLi8uLi9kZXRhaWxQb3B1cC9wZXJzb25Qb3B1cC9wZXJzb25Qb3B1cC5jb250cm9sbGVyJztcclxuaW1wb3J0ICcuLi8uLi9kZXRhaWxQb3B1cC9lZlBvcHVwL2VmUG9wdXAuY29udHJvbGxlcic7XHJcbmltcG9ydCAnLi4vLi4vZGV0YWlsUG9wdXAvd2lmaVBvcHVwL3dpZmlQb3B1cC5jb250cm9sbGVyJztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9zZWxlY3RGYWNlLnBvcHVwLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9kZW1hcmNhdGUucG9wdXAuY29udHJvbGxlclwiO1xyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCAkOiBhbnksIHBvcHVwSHRtbDogYW55LCB0cmFja1BvcHVwSHRtbDogYW55LCBwZXJzb25Qb3B1cEh0bWw6IGFueSwgZWZQb3B1cEh0bWw6IGFueSwgd2lmaVBvcHVwSHRtbDogYW55O1xyXG5cclxudHlwZSBNYXBSZXN1bHQgPSB7IFtrZXk6IHN0cmluZ106IGFueSB9XHJcblxyXG5jbGFzcyBXaW5Qb3B1cFR5cGUge1xyXG4gICAgc3RhdGljIE1hcmtlcjogc3RyaW5nID0gJ01hcmtlcic7XHJcbiAgICBzdGF0aWMgRGV0YWlsOiBzdHJpbmcgPSAnRGV0YWlsJztcclxuICAgIHN0YXRpYyBUcmFjazogc3RyaW5nID0gJ1RyYWNrJztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQW5hbHlzaXNNbWFwU2VydmVyIHtcclxuXHJcbiAgICBnZXRNYXAoKTpOUEdpc01hcE1haW5cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludCgpOkFycmF5PFN5c3RlbVBvaW50PjtcclxuXHJcbiAgICBpbml0TWFwKCk6IFByb21pc2U8YW55PjtcclxuXHJcbiAgICByZW5kZXJNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsIGdyb3VwTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgIGlzQ2xlYXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgcmVzdWx0OiBBcnJheTxTeXN0ZW1Qb2ludD4sXHJcbiAgICAgICAgICAgICAgICAgcmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IGFueSB9LFxyXG4gICAgICAgICAgICAgICAgIGZsYWc/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgIGxhYmxlcz86IEFycmF5PGFueT4sXHJcbiAgICAgICAgICAgICAgICAgaWNvbj86IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgb3BlbkRldGFpbFBvcHVwKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgYWxsUmVzdWx0OiBBcnJheTxhbnk+LCB0eXBlPzogc3RyaW5nLCBzY29wZT86IGFueSk6IHZvaWQ7XHJcblxyXG4gICAgY3JlYXRlTWFwUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBhbnksIHR5cGU6IHN0cmluZyk6IHZvaWQ7XHJcblxyXG4gICAgZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMocG9pbnRzOiBBcnJheTxhbnk+KTogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG5cclxuICAgIHJlbmRlclN5c3RlbVBvaW50KFBvaW50cz86IEFycmF5PFN5c3RlbVBvaW50PiwgaXNSZXNldD86IGJvb2xlYW4pOnZvaWRcclxuXHJcbiAgICByZW1vdmVTeXN0ZW1Qb2ludCgpOiB2b2lkXHJcblxyXG4gICAgcmVzdWx0VG9NYXAoaXRlbTogYW55LCB0eXBlPzogc3RyaW5nKTp2b2lkXHJcblxyXG4gICAgdW5SZXN1bHRUb01hcChpdGVtOiBhbnksIHJlc3VsdEZvck1hcDogTWFwUmVzdWx0LCB0eXBlPzogc3RyaW5nKTp2b2lkXHJcblxyXG4gICAgZHJhd1JlY3QoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZFxyXG5cclxuICAgIGRyYXdDaXJjbGUoY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZFxyXG5cclxuICAgIGRyYXdQb2x5Z29uKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWRcclxuXHJcbiAgICBzZXRUcmFja0FuaW1hdGlvbih0cmFja1Jlc3VsdDogQXJyYXk8YW55PiwgcG9pbnRzOkFycmF5PFN5c3RlbVBvaW50PiwgdHJhY2tSZXN1bHRNYXA6IE1hcFJlc3VsdCk6dm9pZFxyXG5cclxuICAgIHNldEFjY3BUcmFja0FuaW1hdGlvbihhbGxBY2NwVHJhY2tSZXN1bHQ6IEFycmF5PGFueT4sIHBvaW50czpBcnJheTxTeXN0ZW1Qb2ludD4sIGFsbEFjY3BUcmFja1Jlc3VsdEZvck1hcDogTWFwUmVzdWx0KTp2b2lkXHJcblxyXG4gICAgY2xlYXJEcmF3KCk6IHZvaWRcclxuXHJcbiAgICBjbGVhclRyYWNlQW5hbHl6ZSgpOiB2b2lkXHJcblxyXG4gICAgY2xlYXJUcmFja0luZm9XaW5kb3coKTogdm9pZFxyXG5cclxuICAgIGNsZWFyQWNjcFRyYWNrSW5mb1dpbmRvdygpOiB2b2lkXHJcblxyXG4gICAgY2xlYXJSZXN1bHRNYXJrZXJzKCk6dm9pZFxyXG5cclxuICAgIGNsZWFyQWNjcE1hcmtlcnMoKTp2b2lkXHJcblxyXG4gICAgZGVzdG9yeSgpOiB2b2lkXHJcblxyXG4gICAgcmVtb3ZlRHJhd1NoYXBlKGdlb21ldHJ5OiBOUE1hcExpYi5PdmVybGF5KTp2b2lkXHJcbn1cclxuXHJcbmNsYXNzIEFuYWx5c2lzTW1hcFNlcnZlciBpbXBsZW1lbnRzIElBbmFseXNpc01tYXBTZXJ2ZXIge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRyb290U2NvcGUnLCAnJGNvbXBpbGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAnbWFwU2VydmljZSddO1xyXG4gICAgbWFwOiBOUEdpc01hcE1haW47XHJcbiAgICBtYXBJZDogc3RyaW5nID0gXCJBbmFseXNpc01hcFwiO1xyXG4gICAgbWFwQ29uZmlnTmFtZTogc3RyaW5nID0gTWFwQ29uZmlnSnNvbkVudW0uTUFQQ09ORklHO1xyXG4gICAgbWFya2VyV2luaW5mbzogc3RyaW5nO1xyXG4gICAgY3VycmVudExheWVySW5kZXg6IG51bWJlcjtcclxuICAgIHRyYWNrV2luSW5mbzogc3RyaW5nO1xyXG4gICAgc3lzdGVtUG9pbnQ6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgbWFwVHJhY2tJRDogc3RyaW5nO1xyXG4gICAgbWFwQWNjcFRyYWNrSUQ6IHN0cmluZztcclxuICAgIGFjY3BUcmFja1dpbkluZm86IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRyb290U2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbWFwU2VydmljZTogSU1hcFNlcnZpY2UpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDliJ3lp4vljJbmmbrog73liIbmnpDlnLDlm75cclxuICAgICAqL1xyXG4gICAgaW5pdE1hcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXBTZXJ2aWNlLmdldE1hcENvbmZpZyh0aGlzLm1hcENvbmZpZ05hbWUpLnRoZW4oKGRhdGE6IE1hcENvbmZpZ01vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbmV3IE5QR2lzTWFwTWFpbigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5pbml0KHRoaXMubWFwSWQsIGRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGb3JNYXBMYXllcigpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGl0bGUg5pq06Zyy5b2T5YmN5Zyw5Zu+5a+56LGhXHJcbiAgICAgKiBAcmV0dXJuIHtOUEdpc01hcE1haW59XHJcbiAgICAgKi9cclxuICAgIGdldE1hcCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hcDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZ2V0U3lzdGVtUG9pbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zeXN0ZW1Qb2ludDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmraPluLjnu5PmnpxtYXJrZXJcclxuICAgICAqL1xyXG4gICAgY2xlYXJSZXN1bHRNYXJrZXJzKCl7XHJcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlT3ZlcmxheXNCeU5hbWUoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5Ly06ZqP57uT5p6cbWFrZXJcclxuICAgICAqL1xyXG4gICAgY2xlYXJBY2NwTWFya2Vycygpe1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaZuuiDveWIhuaekOWbvuWxglxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRGb3JNYXBMYXllcigpIHtcclxuICAgICAgICB0aGlzLm1hcC5yZW5kZXJPdmVybGF5TGF5ZXIoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbmRlck92ZXJsYXlMYXllcihPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGl0bGUg5riy5p+T5Zyw5Zu+6K6+5aSH54K55L2NXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN5c3RlbVBvaW50Pn0gUG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUmVzZXRcclxuICAgICAqL1xyXG4gICAgcmVuZGVyU3lzdGVtUG9pbnQoUG9pbnRzPzogQXJyYXk8U3lzdGVtUG9pbnQ+LCBpc1Jlc2V0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChpc1Jlc2V0KSB0aGlzLnN5c3RlbVBvaW50ID0gUG9pbnRzO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbmRlck1hcmtlcnModGhpcy5zeXN0ZW1Qb2ludCwge2NsaWNrOiB0aGlzLk1hcmtlckNsaWNrfSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVTeXN0ZW1Qb2ludCgpIHtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnQpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDmuIXmpZrovajov7lcclxuICAgICAqL1xyXG4gICAgY2xlYXJUcmFjZUFuYWx5emUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1hcFRyYWNrSUQpIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAucmVtb3ZlT3ZlcmxheXNCeU5hbWUoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExpbmVHcm91cCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwVHJhY2tJRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGVhclRyYWNrSW5mb1dpbmRvdygpIHtcclxuICAgICAgICBpZiAodGhpcy50cmFja1dpbkluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy50cmFja1dpbkluZm8pLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tXaW5JbmZvID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWNjcFRyYWNrSW5mb1dpbmRvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5hY2NwVHJhY2tXaW5JbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMuYWNjcFRyYWNrV2luSW5mbykuY2xvc2UoKTtcclxuICAgICAgICAgICAgdGhpcy5hY2NwVHJhY2tXaW5JbmZvID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmoLnmja7nu5PmnpzmmL7npLrlnLDlm77lr7nlupTnmoTngrnkvY1cclxuICAgIHJlc3VsdFRvTWFwKGl0ZW06IGFueSwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaXRlbS5BY2Nlc3NMb2cuSUQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCBpdGVtLkFjY2Vzc0xvZy5JRCwgTWFya2Vyc0ljb24uSG92ZXJSZWRJY29uLCA5OTkpXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IGFueSwgcmVzdWx0Rm9yTWFwOiBNYXBSZXN1bHQsIHR5cGU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gcmVzdWx0Rm9yTWFwW2l0ZW0uQWNjZXNzTG9nLklEXTtcclxuICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zZXRNYXJrZXJJY29uKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsIGl0ZW0uQWNjZXNzTG9nLklELCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24sIHJlcy5yZXN1bHRJbmRleCArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCBpdGVtLkFjY2Vzc0xvZy5JRCwgTWFya2Vyc0ljb24uTm9ybWFsQmx1ZUljb24sIHJlcy5yZXN1bHRJbmRleCArIDEpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBNYXJrZXJDbGljayhtYXJrZXJzOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtYXJrZXJzKTtcclxuICAgICAgICAvLyBsZXQgcG9pbnQgPSBtYXJrZXJzLmdldFBvc2l0aW9uKCkgYXMgTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQ7XHJcbiAgICAgICAgLy8gdGhpcy5tYXAuc2V0Q2VudGVyKHBvaW50LHRoaXMubWFwLmdldFpvb20oKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vVE9ETyDnn6nlvaLmoYbpgIlcclxuICAgIGRyYXdSZWN0KGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIHRoaXMubWFwLnNlbGVjdFJlY3RhbmdsZSgocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4sIGdlb21ldHJ5OiBOUE1hcExpYi5PdmVybGF5KSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5aSa6L655b2i5qGG6YCJXHJcbiAgICBkcmF3UG9seWdvbihjYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgICAgICB0aGlzLm1hcC5zZWxlY3RQb2x5Z29uKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLk92ZXJsYXkpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2socG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDlnIblvaLmoYbpgIlcclxuICAgIGRyYXdDaXJjbGUoY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5tYXAuc2VsZWN0Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLk92ZXJsYXkpID0+IHtcclxuICAgICAgICAgICAgY2FsbGJhY2socG9pbnRzLCBnZW9tZXRyeSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZURyYXdTaGFwZShnZW9tZXRyeTogTlBNYXBMaWIuT3ZlcmxheSkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXkoZ2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmuIXmpZrlnLDlm77lvLnmoYZcclxuICAgIGNsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLm1hcC5jbGVhckRyYXcoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5riy5p+T5Zyw5Zu+TWFya2VyXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJOYW1lIOWbvuWxguWQjeensFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGdyb3VwTmFtZSDngrnkvY3nu4TlkI3np7BcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNDbGVhciDmmK/lkKbmuIXmpZrkuYvliY3nmoRNYWtlclxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTeXN0ZW1Qb2ludD59IHJlc3VsdCDngrnkvY3kv6Hmga9cclxuICAgICAqIEBwYXJhbSB7TWFwUmVzdWx0fSByZXN1bHRGb3JNYXAg57uT5p6cTWFw5a+56LGhXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZsYWcg5piv5ZCm6Ieq5a6a5LmJ5paH5a2XIOS4jeepv+acquaVsOe7hGluZGV45LiL5qCHXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PHN0cmluZz59IGxhYmxlcyDnjrDlnKjlnLDlm77nu5PmnpzmloflrZdcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpY29uIOaYvuekuuS9k+i0tE1ha2VyIOWbvuagh1xyXG4gICAgICovXHJcbiAgICByZW5kZXJNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgZ3JvdXBOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICAgaXNDbGVhcjogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PixcclxuICAgICAgICAgICAgICAgICByZXN1bHRGb3JNYXA6IE1hcFJlc3VsdCxcclxuICAgICAgICAgICAgICAgICBmbGFnPzogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICBsYWJsZXM/OiBBcnJheTxzdHJpbmc+LFxyXG4gICAgICAgICAgICAgICAgIGljb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWUsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFwLmFkZE92ZXJsYXlzRm9yTWFrZXJzKGxheWVyTmFtZSwgZ3JvdXBOYW1lLCByZXN1bHQsIHtcclxuICAgICAgICAgICAgY2xpY2s6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG1hcmtlci5nZXREYXRhKCkgYXMgYW55O1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSByZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxQb3B1cChyZXN1bHQsIHJlc3VsdC5yZXN1bHRJbmRleCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlT3ZlcjogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXBQb3B1cChtYXJrZXIuZ2V0UG9zaXRpb24oKSwgcmVzdWx0LCBXaW5Qb3B1cFR5cGUuTWFya2VyKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3VzZU91dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy5tYXJrZXJXaW5pbmZvKS5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpY29uVVJMOiBpY29uXHJcbiAgICAgICAgfSwgZmxhZywgbGFibGVzKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9UT0RPIOWIm+W7uui9qOi/uVxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGl0bGUg5Yib5bu657uT5p6cTWFya2VyIOeUu+e6vyDovajov7nliqjnlLtcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gdHJhY2tSZXN1bHRcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3lzdGVtUG9pbnQ+fSBwb2ludHNcclxuICAgICAqIEBwYXJhbSB7TWFwUmVzdWx0fSB0cmFja1Jlc3VsdE1hcFxyXG4gICAgICovXHJcbiAgICBzZXRUcmFja0FuaW1hdGlvbih0cmFja1Jlc3VsdDogQXJyYXk8YW55Pixwb2ludHM6QXJyYXk8U3lzdGVtUG9pbnQ+LCB0cmFja1Jlc3VsdE1hcDogTWFwUmVzdWx0KSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodHJhY2tSZXN1bHQpICYmIHRyYWNrUmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRyYWNlQW5hbHl6ZSgpO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogVHJhY2tDb25maWcuVHJhY2tDb2xvckJsdWUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IFRyYWNrQ29uZmlnLlRyYWNrV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IFRyYWNrQ29uZmlnLlRyYWNrU3BlZWQsXHJcbiAgICAgICAgICAgICAgICBzdGFydE1hcmtVcmw6IE1hcmtlcnNJY29uLlN0YXJ0Qmx1ZUljb24sXHJcbiAgICAgICAgICAgICAgICBlbmRNYXJrVXJsOiBNYXJrZXJzSWNvbi5FbmRJY29uLFxyXG4gICAgICAgICAgICAgICAgbm9ybWFsTWFya1VybDogTWFya2Vyc0ljb24uTm9ybWFsQmx1ZUljb24sXHJcbiAgICAgICAgICAgICAgICBtb3ZlVXJsOiBUcmFja0NvbmZpZy5QZXJzb25UcmFja0JsdWVIYW5kbGUsXHJcbiAgICAgICAgICAgICAgICBhZnRlckRyYXc6IChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdHJhY2tSZXN1bHRbZXZ0LmluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVHJhY2tJbmZvV2luZG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja1dpbkluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKGV2dC5wb2ludCwgZGF0YSwgV2luUG9wdXBUeXBlLlRyYWNrKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdG9wOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUcmFja0luZm9XaW5kb3coKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGFzIFRyYWNlQW5hbHl6ZU9wdHM7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE92ZXJsYXlzRm9yTGluZShPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGluZUdyb3VwLCBwb2ludHMsIHtcclxuICAgICAgICAgICAgICAgIHdlaWdodDogVHJhY2tDb25maWcuVHJhY2tXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogVHJhY2tDb25maWcuTGluZUNvbG9yRm9yQmx1ZVxyXG4gICAgICAgICAgICB9IGFzIFBvbHlsaW5lU3R5bGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck1ha2VycyhPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIHRydWUsIHBvaW50cywgdHJhY2tSZXN1bHRNYXApO1xyXG4gICAgICAgICAgICB0aGlzLm1hcFRyYWNrSUQgPSB0aGlzLm1hcC5jcmVhdGVUcmFjZUFuYWx5emUocG9pbnRzLCBzdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnN0YXJ0VHJhY2VBbmFseXplKHRoaXMubWFwVHJhY2tJRCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDkvLTpmo/ovajov7lcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYWxsQWNjcFRyYWNrUmVzdWx0XHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN5c3RlbVBvaW50Pn0gcG9pbnRzXHJcbiAgICAgKiBAcGFyYW0ge01hcFJlc3VsdH0gYWxsQWNjcFRyYWNrUmVzdWx0Rm9yTWFwXHJcbiAgICAgKi9cclxuICAgIHNldEFjY3BUcmFja0FuaW1hdGlvbihhbGxBY2NwVHJhY2tSZXN1bHQ6IEFycmF5PGFueT4sIHBvaW50czpBcnJheTxTeXN0ZW1Qb2ludD4sYWxsQWNjcFRyYWNrUmVzdWx0Rm9yTWFwOiBNYXBSZXN1bHQpIHtcclxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhbGxBY2NwVHJhY2tSZXN1bHQpICYmIGFsbEFjY3BUcmFja1Jlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwQWNjcFRyYWNrSUQpO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogVHJhY2tDb25maWcuVHJhY2tDb2xvckJsdWUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IFRyYWNrQ29uZmlnLlRyYWNrV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IFRyYWNrQ29uZmlnLlRyYWNrU3BlZWQsXHJcbiAgICAgICAgICAgICAgICBtb3ZlVXJsOiBUcmFja0NvbmZpZy5QZXJzb25UcmFja0dyZWVuSGFuZGxlLFxyXG4gICAgICAgICAgICAgICAgYWZ0ZXJEcmF3OiAoZXZ0OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IGFsbEFjY3BUcmFja1Jlc3VsdFtldnQuaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJBY2NwVHJhY2tJbmZvV2luZG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NwVHJhY2tXaW5JbmZvID0gdGhpcy5jcmVhdGVNYXBQb3B1cChldnQucG9pbnQsIGRhdGEsIFdpblBvcHVwVHlwZS5UcmFjayk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQWNjcFRyYWNrSW5mb1dpbmRvdygpXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBUcmFjZUFuYWx5emVPcHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRPdmVybGF5c0ZvckxpbmUoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BMaW5lR3JvdXAsIHBvaW50cywge1xyXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiBUcmFja0NvbmZpZy5UcmFja1dlaWdodCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBUcmFja0NvbmZpZy5MaW5lQ29sb3JGb3JCbHVlXHJcbiAgICAgICAgICAgIH0gYXMgUG9seWxpbmVTdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFrZXJzKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsIHRydWUsIHBvaW50cywgYWxsQWNjcFRyYWNrUmVzdWx0Rm9yTWFwLCBmYWxzZSwgW10sIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbik7XHJcbiAgICAgICAgICAgIHRoaXMubWFwQWNjcFRyYWNrSUQgPSB0aGlzLm1hcC5jcmVhdGVUcmFjZUFuYWx5emUocG9pbnRzLCBzdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnN0YXJ0VHJhY2VBbmFseXplKHRoaXMubWFwQWNjcFRyYWNrSUQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vVE9ETyDmiZPlvIDnu5Pmnpzor6bmg4VcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtSZXN1bHQgfCBDYWNoZVJlc3VsdH0gaXRlbSDlvZPliY3nu5Pmnpzlr7nosaFcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCDlvZPliY3nu5PmnpzntKLlvJVcclxuICAgICAqIEBwYXJhbSBhbGxSZXN1bHQgQXJyYXk8YW55PlxyXG4gICAgICovXHJcbiAgICBvcGVuRGV0YWlsUG9wdXAoaXRlbTogYW55LCByYW5rOiBudW1iZXIsIGFsbExpc3Q/OiBBcnJheTxhbnk+LCB0eXBlPzogc3RyaW5nLCBzY29wZT86IGFueSkge1xyXG4gICAgICAgIHNjb3BlLnJhbmsgPSAwO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICBzY29wZS5pbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogWyc2MDBweCcsICczOTBweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogcGVyc29uUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2UgaWYgKHR5cGUgPT09IE9iamVjdFR5cGUuV2lmaS52YWx1ZSkge1xyXG4gICAgICAgICAgICBzY29wZS5pbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogWyc1NzVweCcsICcyMjBweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogd2lmaVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlIGlmICh0eXBlID09PSBPYmplY3RUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSkge1xyXG4gICAgICAgICAgICBzY29wZS5pbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogJ2RldGFpbC1wb3B1cC1ib3gnLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogWyc1NzVweCcsICcyMjBweCddLFxyXG4gICAgICAgICAgICAgICAgY29udGVudDogZWZQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOWIm+W7uuWcsOWbvuW8ueahhlxyXG4gICAgLyoqXHJcbiAgICAgKiBAdGl0bGUg5Yib5bu65Zyw5Zu+54K55L2N5pe255qE5by55qGG5Z+65LqOIOS8oOWFpeexu+Wei1xyXG4gICAgICogQHBhcmFtIHtOUE1hcExpYi5HZW9tZXRyeS5Qb2ludH0gcG9pbnRcclxuICAgICAqIEBwYXJhbSB7UmVzdWx0fSBkYXRhXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVNYXBQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIGRhdGE6IGFueSwgdHlwZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gV2luUG9wdXBUeXBlLlRyYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyYWNrUG9wdXAocG9pbnQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PT0gV2luUG9wdXBUeXBlLk1hcmtlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVNYXJrZXJQb3B1cChwb2ludCwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDliJvlu7rlnLDlm77ovajov7nml7bmmL7npLrnmoTnvKnnlaXlm77lvLnmoYZcclxuICAgICAqIEBwYXJhbSB7TlBNYXBMaWIuR2VvbWV0cnkuUG9pbnR9IHBvaW50XHJcbiAgICAgKiBAcGFyYW0ge1Jlc3VsdH0gZGF0YVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRyYWNrUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgV2luSW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IGFueSwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRyb290U2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnRyYWNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICBkb20gPSB0aGlzLiRjb21waWxlKGRvbS5vdXRlckhUTUwpKHNjb3BlKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXAub3BlbkluZm9XaW5kb3coV2luSW5mbywgZG9tWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuY2xvc2VJbmZvV2luZG93KFdpbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gV2luSW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0aXRsZSDngrnkvY3np7vlhaXmmL7npLrnmoTnvKnnlaXlm77lvLnmoYZcclxuICAgICAqIEBwYXJhbSB7TlBNYXBMaWIuR2VvbWV0cnkuUG9pbnR9IHBvaW50XHJcbiAgICAgKiBAcGFyYW0ge1Jlc3VsdH0gZGF0YVxyXG4gICAgICovXHJcbiAgICBjcmVhdGVNYXJrZXJQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGlmIChkYXRhLkFjY2Vzc0xvZykge1xyXG4gICAgICAgICAgICB0aGlzLm1hcmtlcldpbmluZm8gPSB0aGlzLm1hcC5jcmVhdGVJbmZvV2luZG93KHBvaW50LmxvbiwgcG9pbnQubGF0LCB7XHJcbiAgICAgICAgICAgICAgICBpc2NvbW1vbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9ZWxzZSBpZihkYXRhLkVGZW5jZUxvZyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyV2luaW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0xNDApXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNlIGlmKGRhdGEuV2lGaUxvZyl7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2VyV2luaW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0xMjUpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHJhY2VEYXRhOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kcm9vdFNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS50cmFjZURhdGEgPSBkYXRhO1xyXG4gICAgICAgIGxldCBkb20gPSAkKHRyYWNrUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgZG9tID0gdGhpcy4kY29tcGlsZShkb20ub3V0ZXJIVE1MKShzY29wZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLm9wZW5JbmZvV2luZG93KHRoaXMubWFya2VyV2luaW5mbywgZG9tWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuY2xvc2VJbmZvV2luZG93KHRoaXMubWFya2VyV2luaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJXaW5pbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFya2VyV2luaW5mb1xyXG4gICAgfVxyXG5cclxuLy9UT0RPIOagueaNrueCueS9jembhuWQiOiOt+WPluWvueW6lOeahOiuvuWkh+mbhuWQiFxyXG4gICAgZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMocG9pbnRzOiBBcnJheTxhbnk+KTogQXJyYXk8U3lzdGVtUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgbGV0IENhbWVyYUlEID0gaXRlbS5BY2Nlc3NMb2cuQ2FtZXJhSUQ7XHJcbiAgICAgICAgICAgIGxldCBzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN5c3RlbVBvaW50Lmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBvaW50ID0gdGhpcy5zeXN0ZW1Qb2ludFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICBpZiAoQ2FtZXJhSUQgPT09IHBvaW50Lk9iamVjdElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXQ6IHBvaW50LkxhdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9uOiBwb2ludC5Mb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiBwb2ludC5JRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0SUQ6IHBvaW50Lk9iamVjdElELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRJRDogaXRlbS5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIERlc2NycHRpb246IHBvaW50LkRlc2NycHRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExheWVyVHlwZTogcG9pbnQuTGF5ZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RUeXBlOiBwb2ludC5PYmplY3RUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBUYXNrU3RhdHVzOiBwb2ludC5UYXNrU3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RTdGF0ZTogcG9pbnQuT2JqZWN0U3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdE5hbWU6IHBvaW50Lk9iamVjdE5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9YXMgU3lzdGVtUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdG9yeSgpIHtcclxuICAgICAgICBpZih0aGlzLm1hcCl7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdhbmFseXNpc01tYXBTZXJ2ZXInLCBBbmFseXNpc01tYXBTZXJ2ZXIpOyJdfQ==
