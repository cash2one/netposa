define(["require", "exports", "text!../../mapPoint/wifiMapPoint/popul.wifi.html", "text!../../mapPoint/cameraMapPoint/cameraMapPoint.html", "../../common/app/main.app", "../../common/map/map.main", "../../common/enum/MapConfigJsonEnum", "css!../../mapPoint/wifiMapPoint/style/wifiPopul.css", "../../common/services/map.service", "../../mapPoint/wifiMapPoint/popul.wifi.controller", "es6-promise", "../../common/services/resource.service", "../../mapPoint/cameraMapPoint/cameraMapPoint.controller"], function (require, exports, populWifi, populCamera, main_app_1, map_main_1, MapConfigJsonEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResourceMapController = (function () {
        function ResourceMapController($scope, $timeout, mylayer, i18nFactory, mapService, $q, resourceService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.i18nFactory = i18nFactory;
            this.mapService = mapService;
            this.$q = $q;
            this.resourceService = resourceService;
            this.mapId = "ResourceMap";
            this.mapConfigName = MapConfigJsonEnum_1.MapConfigJsonEnum.MAPCONFIG;
            this.map = null;
            this.map = null;
            this.$scope.$on("$destroy", function () {
                if (_this.map) {
                    console.log(_this.map.destroy);
                    _this.map.destroy();
                }
            });
            this.initMap();
            $scope.$emit('getMapResource');
            $scope.$on('drawMap', function (event, res) {
                var data = res.series ? res.series : res;
                if (data.length) {
                    _this.mapPointData = [];
                    data.forEach(function (i) {
                        if (i && i.flow) {
                            var data_1 = {
                                count: i && i.flow ? i.flow : 0,
                                lon: i && i.longitude ? i.longitude : 0,
                                lat: i && i.latitude ? i.latitude : 0
                            };
                            if (data_1 && data_1.lon && data_1.lat) {
                                _this.mapPointData.push(data_1);
                            }
                        }
                    });
                    _this.addHeatMapLayer();
                }
            });
        }
        ResourceMapController.prototype.initMap = function () {
            var _this = this;
            this.mapService.getMapConfig(this.mapConfigName).then(function (data) {
                _this.map = new map_main_1.NPGisMapMain();
                _this.map.init(_this.mapId, data);
                _this.getLayer();
                _this.addHeatMapLayer();
            });
        };
        ResourceMapController.prototype.drawRect = function () {
            this.map.selectRectangle(function (points) {
                console.log(points);
            });
        };
        ResourceMapController.prototype.addHeatMapLayer = function () {
            var arr = this.mapPointData;
            if (this.map && Array.isArray(arr) && arr.length > 0) {
                this.map.addheatlayer(arr);
            }
        };
        ResourceMapController.prototype.getLayer = function () {
            var arr = this.map.getLayers();
        };
        ResourceMapController.prototype.drawMark = function () {
            var arr = this.mapPointData;
            if (arr.length >= 1) {
                this.map.renderMarkers(arr, this.bindMapPoinitEvent());
                this.getLayer();
            }
        };
        ResourceMapController.prototype.getDevicedata = function (marker) {
            marker.markType = (marker.markType).toLowerCase();
            return this.resourceService.getDeviceById(marker.deviceID, marker.markType);
        };
        ResourceMapController.prototype.pointClick = function (marker) {
            var _this = this;
            this.getDevicedata(marker).then(function (res) {
                _this.poupsTypeAction(marker, res.data[0]);
            });
        };
        ResourceMapController.prototype.poupsTypeAction = function (marker, info) {
            var cameraLayerId = 'populCamera';
            var mapPoint = marker.getPosition();
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
            switch (marker.markType) {
                case 'camera':
                    this.mylayer.open({
                        content: populCamera,
                        scope: scope,
                        ID: cameraLayerId,
                        AreaAndPosition: { left: (p2.x - (540 / 2)), top: (p2.y - 330), width: 540, height: 330 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
                case 'wifi':
                    this.mylayer.open({
                        content: populWifi,
                        scope: scope,
                        ID: 'populWifi',
                        AreaAndPosition: { left: 100, top: 100, width: 853, height: 502 },
                        end: function () {
                            scope.$destroy();
                        }
                    });
                    break;
            }
        };
        ResourceMapController.prototype.bindMapPoinitEvent = function () {
            var _this = this;
            return {
                click: function (marker) {
                    _this.pointClick(marker);
                }
            };
        };
        ResourceMapController.prototype.FCcheckItem = function (type) {
            console.log(type);
        };
        ResourceMapController.$inject = ['$scope', '$timeout', 'mylayer', 'i18nFactory', 'mapService', '$q', 'resourceService'];
        return ResourceMapController;
    }());
    main_app_1.app.controller('ResourceMapController', ResourceMapController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VzL21hcC9tYXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkE7UUFPSSwrQkFBb0IsTUFBVyxFQUNuQixRQUFrQixFQUNsQixPQUFZLEVBQ1osV0FBZ0IsRUFDaEIsVUFBdUIsRUFDdkIsRUFBTyxFQUNQLGVBQWlDO1lBTjdDLGlCQW9DQztZQXBDbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQUs7WUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLE9BQUUsR0FBRixFQUFFLENBQUs7WUFDUCxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFYN0MsVUFBSyxHQUFXLGFBQWEsQ0FBQztZQUM5QixrQkFBYSxHQUFXLHFDQUFpQixDQUFDLFNBQVMsQ0FBQztZQUNwRCxRQUFHLEdBQWlCLElBQUksQ0FBQztZQVVyQixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDdkIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQUMsS0FBVSxFQUFFLEdBQVE7Z0JBQ3ZDLElBQUksSUFBSSxHQUFHLEdBQUcs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Q0FBQyxRQUFRLEVBQUUsQ0FBQTt3QkFDcEIsQ0FBQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsS0FBSyxDQUFBO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFFRCxrREFBa0IsR0FBbEI7WUFBQSxpQkFNQztZQUxHLE1BQU0sQ0FBQztnQkFDSCxLQUFLLEVBQUUsVUFBQyxNQUFzQztvQkFDMUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDM0IsQ0FBQzthQUNnQixDQUFBO1FBQ3pCLENBQUM7UUFPRCwyQ0FBVyxHQUFYLFVBQVksSUFBWTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRCLENBQUM7UUFsSk0sNkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFtSjdHLDRCQUFDO0tBcEpELEFBb0pDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLHFCQUFxQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlcy9tYXAvbWFwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL21hcFBvaW50L3dpZmlNYXBQb2ludC9wb3B1bC53aWZpLmh0bWxcIiBuYW1lPVwicG9wdWxXaWZpXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi8uLi9tYXBQb2ludC9jYW1lcmFNYXBQb2ludC9jYW1lcmFNYXBQb2ludC5odG1sXCIgbmFtZT1cInBvcHVsQ2FtZXJhXCIgLz5cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vLi4vbWFwUG9pbnQvd2lmaU1hcFBvaW50L3N0eWxlL3dpZmlQb3B1bC5jc3MnXHJcblxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYXAuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vbWFwUG9pbnQvd2lmaU1hcFBvaW50L3BvcHVsLndpZmkuY29udHJvbGxlcic7XHJcbmltcG9ydCBcImVzNi1wcm9taXNlXCI7XHJcbmltcG9ydCB7IE5QR2lzTWFwTWFpbiB9IGZyb20gJy4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW4nO1xyXG5pbXBvcnQgeyBNYXBDb25maWdKc29uRW51bSB9IGZyb20gXCIuLi8uLi9jb21tb24vZW51bS9NYXBDb25maWdKc29uRW51bVwiO1xyXG5pbXBvcnQgeyBNYXBDb25maWdNb2RlbCB9IGZyb20gJy4uLy4uL2NvbW1vbi9tYXAvY29yZS9tb2RlbC9tYXAuY29uZmlnLm1vZGVsJztcclxuaW1wb3J0IHsgSU1hcFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvbWFwLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTeXN0ZW1Qb2ludCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZS5zZXJ2aWNlJ1xyXG5pbXBvcnQgeyBJUmVzb3VyY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlLnNlcnZpY2UnXHJcbmltcG9ydCBPdmVybGF5TGF5ZXIgPSBOUE1hcExpYi5MYXllcnMuT3ZlcmxheUxheWVyO1xyXG5pbXBvcnQgT3ZlcmxheUxheWVyT3B0cyA9IE5QTWFwTGliLkxheWVycy5PdmVybGF5TGF5ZXJPcHRzO1xyXG5cclxuZGVjbGFyZSBsZXQgcG9wdWxXaWZpOiBhbnksIHBvcHVsQ2FtZXJhOiBhbnk7XHJcbmltcG9ydCAnLi4vLi4vbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQuY29udHJvbGxlcic7XHJcblxyXG4vL2ltcG9ydCB7TnVtfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vLi4vQmFzZUNvbmZpZ05vZGUvQmFzZUNvbmZpZ05vZGUvc3JjL21vY2svUmVzb3VyY2VUZXN0RGF0YVwiO1xyXG5jbGFzcyBSZXNvdXJjZU1hcENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdteWxheWVyJywgJ2kxOG5GYWN0b3J5JywgJ21hcFNlcnZpY2UnLCAnJHEnLCAncmVzb3VyY2VTZXJ2aWNlJ107XHJcbiAgICBtYXBJZDogc3RyaW5nID0gXCJSZXNvdXJjZU1hcFwiO1xyXG4gICAgbWFwQ29uZmlnTmFtZTogc3RyaW5nID0gTWFwQ29uZmlnSnNvbkVudW0uTUFQQ09ORklHO1xyXG4gICAgbWFwOiBOUEdpc01hcE1haW4gPSBudWxsO1xyXG4gICAgbWFwUG9pbnREYXRhOiBBcnJheTxhbnk+O1xyXG4gICAgbWFwTGF5ZXI6IGFueTsgLy/lm77lsYJcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBteWxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbWFwU2VydmljZTogSU1hcFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkcTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgcmVzb3VyY2VTZXJ2aWNlOiBJUmVzb3VyY2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1hcC5kZXN0cm95KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaW5pdE1hcCgpO1xyXG4gICAgICAgICRzY29wZS4kZW1pdCgnZ2V0TWFwUmVzb3VyY2UnKTtcclxuICAgICAgICAkc2NvcGUuJG9uKCdkcmF3TWFwJywgKGV2ZW50OiBhbnksIHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhID0gcmVzLnNlcmllcyA/IHJlcy5zZXJpZXMgOiByZXM7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXBQb2ludERhdGEgPSBbXTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaCgoaTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgJiYgaS5mbG93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBhbnkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogaSAmJiBpLmZsb3cgPyBpLmZsb3cgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9uOiBpICYmIGkubG9uZ2l0dWRlID8gaS5sb25naXR1ZGUgOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiBpICYmIGkubGF0aXR1ZGUgPyBpLmxhdGl0dWRlIDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEubG9uICYmIGRhdGEubGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcFBvaW50RGF0YS5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1hcFBvaW50RGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEhlYXRNYXBMYXllcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbml0TWFwKCkge1xyXG4gICAgICAgIHRoaXMubWFwU2VydmljZS5nZXRNYXBDb25maWcodGhpcy5tYXBDb25maWdOYW1lKS50aGVuKChkYXRhOiBNYXBDb25maWdNb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG5ldyBOUEdpc01hcE1haW4oKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuaW5pdCh0aGlzLm1hcElkLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEhlYXRNYXBMYXllcigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5qGG6YCJXHJcbiAgICBkcmF3UmVjdCgpIHtcclxuICAgICAgICB0aGlzLm1hcC5zZWxlY3RSZWN0YW5nbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBvaW50cylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGFkZEhlYXRNYXBMYXllcigpIHtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5tYXBQb2ludERhdGEgYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBpZiAodGhpcy5tYXAgJiYgQXJyYXkuaXNBcnJheShhcnIpICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZGhlYXRsYXllcihhcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluWbvuWxguS/oeaBr1xyXG4gICAgZ2V0TGF5ZXIoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMubWFwLmdldExheWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdNYXJrKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLm1hcFBvaW50RGF0YTtcclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCA+PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbmRlck1hcmtlcnMoYXJyLCB0aGlzLmJpbmRNYXBQb2luaXRFdmVudCgpKTtcclxuICAgICAgICAgICAgdGhpcy5nZXRMYXllcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldERldmljZWRhdGEobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICBtYXJrZXIubWFya1R5cGUgPSAobWFya2VyLm1hcmtUeXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc291cmNlU2VydmljZS5nZXREZXZpY2VCeUlkKG1hcmtlci5kZXZpY2VJRCwgbWFya2VyLm1hcmtUeXBlKVxyXG4gICAgfVxyXG5cclxuICAgIHBvaW50Q2xpY2sobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICB0aGlzLmdldERldmljZWRhdGEobWFya2VyKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb3Vwc1R5cGVBY3Rpb24obWFya2VyLCByZXMuZGF0YVswXSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG91cHNUeXBlQWN0aW9uKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5DbHVzdGVyTWFya2VyLCBpbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgY2FtZXJhTGF5ZXJJZCA9ICdwb3B1bENhbWVyYSc7XHJcbiAgICAgICAgbGV0IG1hcFBvaW50ID0gbWFya2VyLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IHBhZ2VQb2ludCA9IHRoaXMubWFwLnBvaW50VG9QaXhlbChtYXBQb2ludCk7XHJcbiAgICAgICAgcGFnZVBvaW50LnkgLT0gMzAwO1xyXG4gICAgICAgIGxldCBwID0gdGhpcy5tYXAucGl4ZWxUb1BvaW50KHBhZ2VQb2ludCk7XHJcbiAgICAgICAgdGhpcy5tYXAuc2V0Q2VudGVyKHAsIHRoaXMubWFwLmdldFpvb20oKSk7XHJcbiAgICAgICAgbGV0IHAyID0gdGhpcy5tYXAucG9pbnRUb1BpeGVsKHRoaXMubWFwLmdldENlbnRlcigpKTtcclxuICAgICAgICBwMi55ICs9IDMwMDtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgUG9pbnREZVRhaWw6IGFueSwgbGF5ZXJJZDogc3RyaW5nLCAkZGVzdHJveTogRnVuY3Rpb24sIHBvc2l0aW9uOiBudW1iZXIgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5sYXllcklkID0gY2FtZXJhTGF5ZXJJZDtcclxuICAgICAgICBzY29wZS5Qb2ludERlVGFpbCA9IGluZm87XHJcbiAgICAgICAgc2NvcGUucG9zaXRpb24gPSBwMjtcclxuICAgICAgICBzd2l0Y2ggKG1hcmtlci5tYXJrVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdjYW1lcmEnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5teWxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVsQ2FtZXJhLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBJRDogY2FtZXJhTGF5ZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICBBcmVhQW5kUG9zaXRpb246IHsgbGVmdDogKHAyLnggLSAoNTQwIC8gMikpLCB0b3A6IChwMi55IC0gMzMwKSwgd2lkdGg6IDU0MCwgaGVpZ2h0OiAzMzAgfSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3dpZmknOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5teWxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHBvcHVsV2lmaSxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgSUQ6ICdwb3B1bFdpZmknLFxyXG4gICAgICAgICAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjogeyBsZWZ0OiAxMDAsIHRvcDogMTAwLCB3aWR0aDogODUzLCBoZWlnaHQ6IDUwMiB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiaW5kTWFwUG9pbml0RXZlbnQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY2xpY2s6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludENsaWNrKG1hcmtlcilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gYXMgT3ZlcmxheUxheWVyT3B0c1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWbvuWxgueuoeeQhuaTjeS9nFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBGQ2NoZWNrSXRlbSh0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0eXBlKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdSZXNvdXJjZU1hcENvbnRyb2xsZXInLCBSZXNvdXJjZU1hcENvbnRyb2xsZXIpOyJdfQ==
