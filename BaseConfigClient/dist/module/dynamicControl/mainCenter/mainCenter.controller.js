define(["require", "exports", "text!../../technology-stack/map/technology.stack.map.popup.html", "text!./facePush.html", "../../common/app/main.app", "../../common/map/map.main", "../../common/enum/MapConfigJsonEnum", "../../common/directive/ocx/video.ocx.directive", "../../../core/server/enum/SocketResultTypeEnum", "es6-promise", "../../common/services/map.service", "css!../../technology-stack/map/technology.stack.map.css", "../../technology-stack/map/technology.stack.map.popup.controller", "../dynamicControl.cache.factory", "angular", "../../common/factory/socket.factory"], function (require, exports, popupHtml, facePushHtml, main_app_1, map_main_1, MapConfigJsonEnum_1, video_ocx_directive_1, SocketResultTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var MainCenterController = (function () {
        function MainCenterController($scope, mapService, dynamicControlCacheFactory, $timeout, $compile, socketFactory) {
            var _this = this;
            this.$scope = $scope;
            this.mapService = mapService;
            this.dynamicControlCacheFactory = dynamicControlCacheFactory;
            this.socketFactory = socketFactory;
            this.clearAllLayerIsShow = true;
            this.patternState = true;
            this.layoutShow = false;
            this.layoutState = 'one';
            this.videoLayoutNums = new Array(1);
            this.leftFoldBtn = 'FDS_04_01_10';
            this.leftIsFold = true;
            this.rightFoldBtn = 'FDS_04_01_09';
            this.rightIsFold = false;
            this.initComplete = function (ocxControlFunc) {
                console.log("ocx初始化完成", ocxControlFunc);
                _this.videoOcx = ocxControlFunc;
            };
            this.playRtsp = function () {
                if (_this.videoOcx) {
                    var opts = new video_ocx_directive_1.VideoOcxRtspOpt();
                    opts.url = "rtsp://10.0.10.200:8557/H264";
                    _this.videoOcx.playRtsp(opts, 0);
                }
            };
            this.changeLayoutType = function (layoutType, state) {
                if (_this.videoOcx) {
                    _this.videoOcx.setLayout(layoutType);
                    _this.layoutState = state;
                    _this.playRtsp();
                }
            };
            this.stopAll = function () {
                if (_this.videoOcx) {
                    _this.videoOcx.stopAll();
                }
            };
            this.facePicData = [];
            this.btnParams = { isOpen: true };
            var vm = this;
            vm.clearAllLayer = function () {
                console.log('点击了清除图层按钮');
            };
            (function () {
                vm.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.DeployControl, function (data) {
                    console.log("收到的人脸抓拍推送数据", data);
                    if (!vm.btnParams.isOpen) {
                        vm.facePicReceive();
                    }
                });
            })();
            vm.facePicReceive = function () {
                var scope = $scope.$new();
                scope.data = {
                    imgUrl: "",
                    id: "face1568465",
                    name: "测试",
                    time: "2017-07-03",
                    sequence: vm.facePicData.length + 1,
                };
                vm.facePicData.unshift(scope.data);
                angular.element('ol.pics').width(vm.facePicData.length * 100);
                if (!angular.element('ol.pics').children().length) {
                    angular.element('ol.pics').append($compile(facePushHtml)(scope)[0]);
                }
                else {
                    angular.element('ol.pics').find('li:first-child').before($compile(facePushHtml)(scope)[0]);
                }
                angular.element('ol.pics').find('li:first-child').animate({
                    width: "90px",
                    opacity: 1,
                }, 200);
            };
            vm.facePickMore = function () {
                window.location.hash = '/intelligentretrieval/faceretrieval';
            };
            vm.dynamicControlCacheFactory.updateBtnParams(true);
            vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();
            $scope.$on('$destory', function () {
                vm.videoOcx = null;
            });
            vm.leftFoldClick = function () {
                var dom = angular.element('.g-dynamicControl-left');
                if (vm.leftIsFold) {
                    vm.leftIsFold = false;
                    dom.show();
                    vm.leftFoldBtn = 'FDS_04_01_09';
                }
                else {
                    vm.leftIsFold = true;
                    dom.hide();
                    vm.leftFoldBtn = 'FDS_04_01_10';
                }
            };
            vm.rightFoldClick = function () {
                var dom = angular.element('.g-dynamicControl-right');
                if (vm.rightIsFold) {
                    vm.rightIsFold = false;
                    dom.show();
                    vm.rightFoldBtn = 'FDS_04_01_09';
                }
                else {
                    vm.rightIsFold = true;
                    dom.hide();
                    vm.rightFoldBtn = 'FDS_04_01_10';
                }
            };
            vm.fullScreenClick = function (state) {
                console.log(state);
                var leftEle = angular.element('.g-dynamicControl-left');
                var rightEle = angular.element('.g-dynamicControl-right');
                if (state === "full") {
                    vm.leftIsFold = true;
                    vm.rightIsFold = true;
                    leftEle.hide();
                    rightEle.hide();
                    vm.leftFoldBtn = 'FDS_04_01_10';
                    vm.rightFoldBtn = 'FDS_04_01_10';
                }
                else if (state === "unfull") {
                    vm.leftIsFold = false;
                    vm.rightIsFold = false;
                    leftEle.show();
                    rightEle.show();
                    vm.leftFoldBtn = 'FDS_04_01_09';
                    vm.rightFoldBtn = 'FDS_04_01_09';
                }
                ;
            };
            vm.patternList = function () {
                console.log('列表模式');
                vm.patternState = false;
                vm.dynamicControlCacheFactory.updateBtnParams(false);
                vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();
            };
            vm.patternMap = function () {
                console.log('地图模式');
                vm.patternState = true;
                vm.dynamicControlCacheFactory.updateBtnParams(true);
                vm.btnParams = vm.dynamicControlCacheFactory.getBtnParams();
                vm.videoOcx = null;
            };
            vm.layerClick = function (checked) {
                console.log('图层按钮');
                console.log(checked);
                if (checked.type === "camera" && checked.check) {
                    vm.map.setClusterMarkerVisibleByLayerType("camera", true);
                }
                else if (checked.type === "camera" && !checked.check) {
                    vm.map.setClusterMarkerVisibleByLayerType("camera", false);
                }
            };
            vm.layoutMouseOver = function (state) {
                if (state) {
                    vm.layoutShow = true;
                }
                else {
                    vm.layoutShow = false;
                }
            };
            vm.map;
            vm.mapId = "mapInit";
            vm.mapConfigName = MapConfigJsonEnum_1.MapConfigJsonEnum.SHEN_ZHEN_MAP;
            $scope.$on("$destroy", function () {
                console.log("销毁了MapResourceController");
                if (vm.map) {
                    vm.map.destroy();
                    vm.map = undefined;
                }
            });
            dynamicControlCacheFactory.setCameraLocate(_locateCamera);
            function _locateCamera(pointsData) {
                var id = pointsData.ID;
                console.log('调用测试ID定位·································');
                vm.map.locationMarker("bb9d69d53e6443848e75a7543cc3c5d2");
            }
            _startInitMap().then(_getSystemPoints).then(_initSystemPoints2Map);
            function _startInitMap() {
                return mapService.getMapConfig(vm.mapConfigName).then(_initMap);
            }
            function _initMap(data) {
                vm.map = new map_main_1.NPGisMapMain();
                vm.map.init(vm.mapId, data);
            }
            function _initSystemPoints2Map(points) {
                if (vm.map) {
                    vm.map.renderMarkers(points, getMapEvents());
                }
            }
            function getMapEvents() {
                console.log('点击了 209 行,get map events');
                return {
                    click: function (marker) {
                        openInitInfoWindow(marker);
                    }
                };
            }
            function openInitInfoWindow(marker) {
                console.log('288 行,open');
                var scope = $scope.$new();
                scope.$on("$destroy", function () {
                    console.log("销毁地图弹出框scope");
                });
                var winId = vm.map.createInfoWindow(marker.getPosition().lon, marker.getPosition().lat);
                scope.winId = winId;
                scope.closeEventName = "aaa";
                var html = $compile(popupHtml)(scope);
                $timeout(function () {
                    vm.map.openInfoWindow(winId, html[0], {
                        close: function () {
                            scope.$destroy();
                        }
                    });
                });
            }
            function initCloseInfoWindowEvent() {
                console.log(' 319 行,关闭infowindow');
                $scope.$on("aaa", function (event, winId) {
                    closeInfoWindow(winId);
                });
            }
            ;
            initCloseInfoWindowEvent();
            function closeInfoWindow(winId) {
                console.log('332 行,关闭infowindow');
                vm.map.closeInfoWindow(winId);
            }
            function _getSystemPoints() {
                return mapService.getSystemPoints()
                    .then(function (data) {
                    if (data && data.code == 200) {
                        var points = data.data || [];
                        return points;
                    }
                    else {
                        return Promise.reject(null);
                    }
                });
            }
        }
        MainCenterController.$inject = ['$scope', 'mapService', 'dynamicControlCacheFactory', '$timeout', '$compile', 'socketFactory'];
        return MainCenterController;
    }());
    main_app_1.app.controller("mainCenterController", MainCenterController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvbWFpbkNlbnRlci9tYWluQ2VudGVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBMENBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUlyQztRQStFSSw4QkFBb0IsTUFBWSxFQUFVLFVBQXdCLEVBQVMsMEJBQXNELEVBQUMsUUFBWSxFQUFFLFFBQWMsRUFBVSxhQUE4QjtZQUF0TSxpQkEwUkM7WUExUm1CLFdBQU0sR0FBTixNQUFNLENBQU07WUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFjO1lBQVMsK0JBQTBCLEdBQTFCLDBCQUEwQixDQUE0QjtZQUF1QyxrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7WUF0RXRNLHdCQUFtQixHQUFhLElBQUksQ0FBQztZQUlyQyxpQkFBWSxHQUFhLElBQUksQ0FBQztZQUk5QixlQUFVLEdBQWEsS0FBSyxDQUFDO1lBQzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBQzdCLG9CQUFlLEdBQVcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFJdkMsZ0JBQVcsR0FBWSxjQUFjLENBQUM7WUFDdEMsZUFBVSxHQUFhLElBQUksQ0FBQztZQUU1QixpQkFBWSxHQUFZLGNBQWMsQ0FBQztZQUV2QyxnQkFBVyxHQUFhLEtBQUssQ0FBQztZQVM5QixpQkFBWSxHQUFjLFVBQUMsY0FBb0M7Z0JBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsQ0FBQztZQUNuQyxDQUFDLENBQUM7WUFHRixhQUFRLEdBQWM7Z0JBQ2xCLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLElBQUksSUFBSSxHQUFHLElBQUkscUNBQWUsRUFBRSxDQUFDO29CQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLDhCQUE4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QUMsZUFBZSxFQUFFO3FCQUM5QixJQUFJLENBQUMsVUFBQyxJQUF3QztvQkFDM0MsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDM0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7d0JBQzdCLE1BQU0sQ0FBQyxNQUFNLENBQUM7b0JBQ2xCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1FBQ0wsQ0FBQztRQTVSTSw0QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBQyw0QkFBNEIsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBRSxDQUFDO1FBNlJuSCwyQkFBQztLQTFXRCxBQTBXQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9keW5hbWljQ29udHJvbC9tYWluQ2VudGVyL21haW5DZW50ZXIuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy81LzMxLlxyXG4gKi9cclxuXHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vdGVjaG5vbG9neS1zdGFjay9tYXAvdGVjaG5vbG9neS5zdGFjay5tYXAucG9wdXAuaHRtbFwiIG5hbWU9XCJwb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vZmFjZVB1c2guaHRtbFwiIG5hbWU9XCJmYWNlUHVzaEh0bWxcIiAvPlxyXG5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJlczYtcHJvbWlzZVwiO1xyXG4vL+WcsOWbvuebuOWFs1xyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW5cIjtcclxuaW1wb3J0IHtJTWFwU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYXAuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvbWFwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtNYXBDb25maWdKc29uRW51bX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9lbnVtL01hcENvbmZpZ0pzb25FbnVtXCI7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBPdmVybGF5TGF5ZXJPcHRzID0gTlBNYXBMaWIuTGF5ZXJzLk92ZXJsYXlMYXllck9wdHM7XHJcbmltcG9ydCB7TWFwQ29uZmlnTW9kZWx9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL2NvcmUvbW9kZWwvbWFwLmNvbmZpZy5tb2RlbFwiO1xyXG5pbXBvcnQge0lOUEdpc01hcE1haW4sIEluZm9XaW5kb3dFdmVudH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9tYXAvbWFwLmludGVyZmFjZVwiO1xyXG5cclxuaW1wb3J0IFwiY3NzIS4uLy4uL3RlY2hub2xvZ3ktc3RhY2svbWFwL3RlY2hub2xvZ3kuc3RhY2subWFwLmNzc1wiXHJcbmltcG9ydCBcIi4uLy4uL3RlY2hub2xvZ3ktc3RhY2svbWFwL3RlY2hub2xvZ3kuc3RhY2subWFwLnBvcHVwLmNvbnRyb2xsZXJcIjtcclxuXHJcbi8vT0NYXHJcbmltcG9ydCB7XHJcbiAgICBJVmlkZW9PY3hDb250cm9sRnVuYywgVmlkZW9PY3hSZWFsVGltZU9wdCxcclxuICAgIFZpZGVvT2N4UnRzcE9wdCwgVmlkZW9PY3hSdHNwTXVsdGlwbGVPcHRcclxufSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZVwiO1xyXG5cclxuLy9zZXJ2aWNlXHJcbmltcG9ydCBcIi4uL2R5bmFtaWNDb250cm9sLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3Rvcnl9IGZyb20gXCIuLi9keW5hbWljQ29udHJvbC5jYWNoZS5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG4vL3dlYnNvY2tldFxyXG5pbXBvcnQgIFwiLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOmFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjphbnk7XHJcbmxldCBQcm9taXNlID0gcmVxdWlyZShcImVzNi1wcm9taXNlXCIpO1xyXG5kZWNsYXJlIGxldCBwb3B1cEh0bWwgOiBzdHJpbmc7XHJcbmRlY2xhcmUgbGV0IGZhY2VQdXNoSHRtbCA6IHN0cmluZztcclxuXHJcbmNsYXNzIE1haW5DZW50ZXJDb250cm9sbGVyIHtcclxuICAgIC8v5Zyw5Zu+XHJcbiAgICBtYXA6SU5QR2lzTWFwTWFpbjtcclxuICAgIG1hcENvbmZpZzpNYXBDb25maWdNb2RlbDtcclxuICAgIG1hcElkOnN0cmluZztcclxuICAgIG1hcENvbmZpZ05hbWU6c3RyaW5nO1xyXG4gICAgc2hvd0NhbWVyYSA6IEZ1bmN0aW9uO1xyXG4gICAgaGlkZUNhbWVyYSA6IEZ1bmN0aW9uO1xyXG4gICAgY2xlYXJBbGxMYXllciA6IEZ1bmN0aW9uO1xyXG4gICAgY2xlYXJBbGxMYXllcklzU2hvdyA6IEJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHJcbiAgICAvL+aooeW8j+WIh+aNouaMiemSrlxyXG4gICAgcGF0dGVyblN0YXRlIDogQm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgLy/liJfooajmqKHlvI/luIPlsYDpgInmi6lcclxuICAgIGxheW91dE1vdXNlT3ZlciA6IEZ1bmN0aW9uO1xyXG4gICAgbGF5b3V0U2hvdyA6IEJvb2xlYW4gPSBmYWxzZTsvL+W4g+WxgOmAieaLqeaYr+WQpuaYvuekulxyXG4gICAgbGF5b3V0U3RhdGUgOiBzdHJpbmcgPSAnb25lJzsvL+W4g+WxgOeKtuaAgVxyXG4gICAgdmlkZW9MYXlvdXROdW1zIDogYW55W10gPSBuZXcgQXJyYXkoMSk7Ly/op4bpopHluIPlsYDnvZHmoLznn6npmLVcclxuXHJcblxyXG4gICAgLy/lt6blj7PmqKHlnZfmlLblsZXjgIHlhajlsY/mqKHlvI9cclxuICAgIGxlZnRGb2xkQnRuIDogc3RyaW5nID0gJ0ZEU18wNF8wMV8xMCc7XHJcbiAgICBsZWZ0SXNGb2xkIDogQm9vbGVhbiA9IHRydWU7XHJcbiAgICBsZWZ0Rm9sZENsaWNrIDogRnVuY3Rpb247XHJcbiAgICByaWdodEZvbGRCdG4gOiBzdHJpbmcgPSAnRkRTXzA0XzAxXzA5JztcclxuICAgIHJpZ2h0Rm9sZENsaWNrIDogRnVuY3Rpb247XHJcbiAgICByaWdodElzRm9sZCA6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGZ1bGxTY3JlZW5DbGljayA6IEZ1bmN0aW9uO1xyXG4gICAgcGF0dGVybk1hcCA6IEZ1bmN0aW9uO1xyXG4gICAgcGF0dGVybkxpc3QgOiBGdW5jdGlvbjtcclxuICAgIGxheWVyQ2xpY2sgOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL09DWFxyXG4gICAgdmlkZW9PY3g6IElWaWRlb09jeENvbnRyb2xGdW5jO1xyXG4gICAgLy9PQ1jliJ3lp4vljJZcclxuICAgIGluaXRDb21wbGV0ZSA6IEZ1bmN0aW9uID0gKG9jeENvbnRyb2xGdW5jOiBJVmlkZW9PY3hDb250cm9sRnVuYykgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwib2N45Yid5aeL5YyW5a6M5oiQXCIsIG9jeENvbnRyb2xGdW5jKTtcclxuICAgICAgICB0aGlzLnZpZGVvT2N4ID0gb2N4Q29udHJvbEZ1bmM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5pKt5pS+XHJcbiAgICBwbGF5UnRzcCA6IEZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICBsZXQgb3B0cyA9IG5ldyBWaWRlb09jeFJ0c3BPcHQoKTtcclxuICAgICAgICAgICAgb3B0cy51cmwgPSBcInJ0c3A6Ly8xMC4wLjEwLjIwMDo4NTU3L0gyNjRcIjtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UnRzcChvcHRzLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5pS55Y+Y5biD5bGAXHJcbiAgICBjaGFuZ2VMYXlvdXRUeXBlIDogRnVuY3Rpb24gPSAobGF5b3V0VHlwZTogbnVtYmVyICxzdGF0ZSA6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIGlmKHRoaXMudmlkZW9PY3gpe1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnNldExheW91dChsYXlvdXRUeXBlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGF5b3V0U3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgLy/mmoLml7bmkq3mlL7mn5DkuKrmtYvor5Xop4bpopFcclxuICAgICAgICAgICAgdGhpcy5wbGF5UnRzcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/lhbPpl63miYDmnIlcclxuICAgIHN0b3BBbGwgOiBGdW5jdGlvbiA9ICgpPT57XHJcbiAgICAgICAgaWYodGhpcy52aWRlb09jeCl7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3guc3RvcEFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLy/kurrohLjmipPmi43mjqjpgIFcclxuICAgIGZhY2VQaWNEYXRhIDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgZmFjZVBpY1JlY2VpdmUgOiBGdW5jdGlvbjtcclxuICAgIGZhY2VQaWNrTW9yZSA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8v5Yid5aeL5YyW5oyJ6ZKu54q25oCB5YC877yM55So5LqO5oyH5Luk5pWw5o2u57uR5a6aXHJcbiAgICBidG5QYXJhbXMgOiB7aXNPcGVuIDogYm9vbGVhbn0gPSB7aXNPcGVuIDogdHJ1ZX07XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdtYXBTZXJ2aWNlJywnZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnknLCckdGltZW91dCcsJyRjb21waWxlJyAsJ3NvY2tldEZhY3RvcnknIF07XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGUgOiBhbnksIHByaXZhdGUgbWFwU2VydmljZSA6IElNYXBTZXJ2aWNlLHByaXZhdGUgZHluYW1pY0NvbnRyb2xDYWNoZUZhY3Rvcnk6SUR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5LCR0aW1lb3V0OmFueSAsJGNvbXBpbGUgOiBhbnkgLHByaXZhdGUgc29ja2V0RmFjdG9yeSA6IElTb2NrZXRGYWN0b3J5ICkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/muIXmpZrlm77lsYLmtYvor5VcclxuICAgICAgICB2bS5jbGVhckFsbExheWVyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75LqG5riF6Zmk5Zu+5bGC5oyJ6ZKuJyk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL+aOpeaUtndlYnNvY2tldOa2iOaBr1xyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLkRlcGxveUNvbnRyb2wsIChkYXRhOiBhbnkpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaUtuWIsOeahOS6uuiEuOaKk+aLjeaOqOmAgeaVsOaNrlwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIC8v6LCD55So6L+95Yqg5pWw5o2uXHJcbiAgICAgICAgICAgICAgICBpZighdm0uYnRuUGFyYW1zLmlzT3Blbil7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uZmFjZVBpY1JlY2VpdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcblxyXG4gICAgICAgIC8v5qih5ouf5Lq66IS45oqT5ouN5pWw5o2uXHJcbiAgICAgICAgdm0uZmFjZVBpY1JlY2VpdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzY29wZSA9ICRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgICAgIHNjb3BlLmRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBpbWdVcmwgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgaWQgOiBcImZhY2UxNTY4NDY1XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lIDogXCLmtYvor5VcIixcclxuICAgICAgICAgICAgICAgIHRpbWUgOiBcIjIwMTctMDctMDNcIixcclxuICAgICAgICAgICAgICAgIHNlcXVlbmNlIDogdm0uZmFjZVBpY0RhdGEubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2bS5mYWNlUGljRGF0YS51bnNoaWZ0KHNjb3BlLmRhdGEpO1xyXG4gICAgICAgICAgICAvL+WKqOaAgeiuoeeul3Vs5a695bqmXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnb2wucGljcycpLndpZHRoKHZtLmZhY2VQaWNEYXRhLmxlbmd0aCAqIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBpZighYW5ndWxhci5lbGVtZW50KCdvbC5waWNzJykuY2hpbGRyZW4oKS5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCdvbC5waWNzJykuYXBwZW5kKCRjb21waWxlKGZhY2VQdXNoSHRtbCkoc2NvcGUpWzBdKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJ29sLnBpY3MnKS5maW5kKCdsaTpmaXJzdC1jaGlsZCcpLmJlZm9yZSgkY29tcGlsZShmYWNlUHVzaEh0bWwpKHNjb3BlKVswXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/liqjnlLtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KCdvbC5waWNzJykuZmluZCgnbGk6Zmlyc3QtY2hpbGQnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgICAgIHdpZHRoOlwiOTBweFwiLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eSA6IDEsXHJcbiAgICAgICAgICAgIH0gLDIwMCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/kurrohLjmipPmi43mjqjpgIHliJfooagtLeabtOWkmlxyXG4gICAgICAgIHZtLmZhY2VQaWNrTW9yZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnL2ludGVsbGlnZW50cmV0cmlldmFsL2ZhY2VyZXRyaWV2YWwnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v6YCa6L+H5pyN5Yqh5Yid5aeL5YyW5pyN5Yqh5YaF55qE5YC8XHJcbiAgICAgICAgdm0uZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkudXBkYXRlQnRuUGFyYW1zKHRydWUpO1xyXG4gICAgICAgIHZtLmJ0blBhcmFtcyA9IHZtLmR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5LmdldEJ0blBhcmFtcygpO1xyXG5cclxuXHJcbiAgICAgICAgLy9PQ1gg6ZSA5q+BXHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3RvcnknICwoKSA9PiB7XHJcbiAgICAgICAgICAgdm0udmlkZW9PY3ggPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+aKmOWPoOW4g+aOp+aOp+WItlxyXG4gICAgICAgIHZtLmxlZnRGb2xkQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBkb20gPSBhbmd1bGFyLmVsZW1lbnQoJy5nLWR5bmFtaWNDb250cm9sLWxlZnQnKTtcclxuICAgICAgICAgICAgaWYodm0ubGVmdElzRm9sZCl7XHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuW3puS+p1xyXG4gICAgICAgICAgICAgICAgdm0ubGVmdElzRm9sZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgZG9tLnNob3coKTtcclxuICAgICAgICAgICAgICAgIC8v5pu05pS55o+Q56S65Li65pS26LW3XHJcbiAgICAgICAgICAgICAgICB2bS5sZWZ0Rm9sZEJ0biA9ICdGRFNfMDRfMDFfMDknO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5pi+56S65bem5L6nXHJcbiAgICAgICAgICAgICAgICB2bS5sZWZ0SXNGb2xkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRvbS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaUueaPkOekuuS4uuaUtui1t1xyXG4gICAgICAgICAgICAgICAgdm0ubGVmdEZvbGRCdG4gPSAnRkRTXzA0XzAxXzEwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2bS5yaWdodEZvbGRDbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGRvbSA9IGFuZ3VsYXIuZWxlbWVudCgnLmctZHluYW1pY0NvbnRyb2wtcmlnaHQnKTtcclxuICAgICAgICAgICAgaWYodm0ucmlnaHRJc0ZvbGQpe1xyXG4gICAgICAgICAgICAgICAgdm0ucmlnaHRJc0ZvbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRvbS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB2bS5yaWdodEZvbGRCdG4gPSAnRkRTXzA0XzAxXzA5JztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2bS5yaWdodElzRm9sZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkb20uaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdm0ucmlnaHRGb2xkQnRuID0gJ0ZEU18wNF8wMV8xMCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5YWo5bGP5Zue6LCDXHJcbiAgICAgICAgdm0uZnVsbFNjcmVlbkNsaWNrID0gKHN0YXRlOmFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSk7XHJcbiAgICAgICAgICAgIGxldCBsZWZ0RWxlID0gYW5ndWxhci5lbGVtZW50KCcuZy1keW5hbWljQ29udHJvbC1sZWZ0Jyk7XHJcbiAgICAgICAgICAgIGxldCByaWdodEVsZSA9IGFuZ3VsYXIuZWxlbWVudCgnLmctZHluYW1pY0NvbnRyb2wtcmlnaHQnKTtcclxuICAgICAgICAgICAgaWYoc3RhdGUgPT09IFwiZnVsbFwiKXtcclxuICAgICAgICAgICAgICAgIC8v5YiX6KGo5qih5byP6buY6K6k5pi+56S65bem5Y+z5Lik5L6nXHJcbiAgICAgICAgICAgICAgICB2bS5sZWZ0SXNGb2xkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHZtLnJpZ2h0SXNGb2xkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxlZnRFbGUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRFbGUuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdm0ubGVmdEZvbGRCdG4gPSAnRkRTXzA0XzAxXzEwJztcclxuICAgICAgICAgICAgICAgIHZtLnJpZ2h0Rm9sZEJ0biA9ICdGRFNfMDRfMDFfMTAnO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzdGF0ZSA9PT0gXCJ1bmZ1bGxcIil7XHJcbiAgICAgICAgICAgICAgICAvL+WIl+ihqOaooeW8j+m7mOiupOaYvuekuuW3puWPs+S4pOS+p1xyXG4gICAgICAgICAgICAgICAgdm0ubGVmdElzRm9sZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdm0ucmlnaHRJc0ZvbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxlZnRFbGUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRFbGUuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgdm0ubGVmdEZvbGRCdG4gPSAnRkRTXzA0XzAxXzA5JztcclxuICAgICAgICAgICAgICAgIHZtLnJpZ2h0Rm9sZEJ0biA9ICdGRFNfMDRfMDFfMDknO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5YiX6KGo5qih5byPXHJcbiAgICAgICAgdm0ucGF0dGVybkxpc3QgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliJfooajmqKHlvI8nKTtcclxuXHJcbiAgICAgICAgICAgIHZtLnBhdHRlcm5TdGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5keW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS51cGRhdGVCdG5QYXJhbXMoZmFsc2UpO1xyXG4gICAgICAgICAgICB2bS5idG5QYXJhbXMgPSB2bS5keW5hbWljQ29udHJvbENhY2hlRmFjdG9yeS5nZXRCdG5QYXJhbXMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+WcsOWbvuaooeW8j1xyXG4gICAgICAgIHZtLnBhdHRlcm5NYXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflnLDlm77mqKHlvI8nKTtcclxuXHJcbiAgICAgICAgICAgIHZtLnBhdHRlcm5TdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHZtLmR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5LnVwZGF0ZUJ0blBhcmFtcyh0cnVlKTtcclxuICAgICAgICAgICAgdm0uYnRuUGFyYW1zID0gdm0uZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkuZ2V0QnRuUGFyYW1zKCk7XHJcblxyXG4gICAgICAgICAgICB2bS52aWRlb09jeCA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/lm77lsYLngrnlh7tcclxuICAgICAgICB2bS5sYXllckNsaWNrID0gKGNoZWNrZWQ6YW55KSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygn5Zu+5bGC5oyJ6ZKuJyk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhjaGVja2VkKTtcclxuICAgICAgICAgICAgaWYoY2hlY2tlZC50eXBlID09PSBcImNhbWVyYVwiICYmIGNoZWNrZWQuY2hlY2spe1xyXG4gICAgICAgICAgICAgICAgLy/mmL7npLrmkYTlg4/mnLpcclxuICAgICAgICAgICAgICAgIHZtLm1hcC5zZXRDbHVzdGVyTWFya2VyVmlzaWJsZUJ5TGF5ZXJUeXBlKFwiY2FtZXJhXCIsIHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihjaGVja2VkLnR5cGUgPT09IFwiY2FtZXJhXCIgJiYgIWNoZWNrZWQuY2hlY2spe1xyXG4gICAgICAgICAgICAgICAgLy/pmpDol4/mkYTlg4/mnLpcclxuICAgICAgICAgICAgICAgIHZtLm1hcC5zZXRDbHVzdGVyTWFya2VyVmlzaWJsZUJ5TGF5ZXJUeXBlKFwiY2FtZXJhXCIsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/liJfooajmqKHlvI/luIPlsYDpgInmi6lcclxuICAgICAgICB2bS5sYXlvdXRNb3VzZU92ZXIgPSBmdW5jdGlvbiAoc3RhdGU6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdm0ubGF5b3V0U2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5sYXlvdXRTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL+WcsOWbvlxyXG4gICAgICAgIHZtLm1hcDtcclxuICAgICAgICB2bS5tYXBJZCA9IFwibWFwSW5pdFwiO1xyXG4gICAgICAgIHZtLm1hcENvbmZpZ05hbWUgPSBNYXBDb25maWdKc29uRW51bS5TSEVOX1pIRU5fTUFQO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIumUgOavgeS6hk1hcFJlc291cmNlQ29udHJvbGxlclwiKTtcclxuICAgICAgICAgICAgLy8g5Zyo6L+Z6YeM6ZSA5q+B5Zyw5Zu+XHJcbiAgICAgICAgICAgIGlmICh2bS5tYXApIHtcclxuICAgICAgICAgICAgICAgIHZtLm1hcC5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB2bS5tYXAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8v5Yid5aeL5YyWIOWtmOWCqOWcsOWbvuWcsOS9jeaWueazleWIsOS4remXtOacjeWKoeWxguaBtuaQnlxyXG4gICAgICAgIGR5bmFtaWNDb250cm9sQ2FjaGVGYWN0b3J5LnNldENhbWVyYUxvY2F0ZShfbG9jYXRlQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgLy/mkYTlg4/mnLrlrprkvY1cclxuICAgICAgICBmdW5jdGlvbiBfbG9jYXRlQ2FtZXJhKHBvaW50c0RhdGEgOiBhbnkpe1xyXG4gICAgICAgICAgICBsZXQgaWQgPSBwb2ludHNEYXRhLklEO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6LCD55So5rWL6K+VSUTlrprkvY3Ct8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrfCt8K3wrcnKTtcclxuICAgICAgICAgICAgdm0ubWFwLmxvY2F0aW9uTWFya2VyKFwiYmI5ZDY5ZDUzZTY0NDM4NDhlNzVhNzU0M2NjM2M1ZDJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJblnLDlm74sIOWKoOi9veeCueS9jeaVsOaNriwg5bCG54K55L2N5pWw5o2u5Yqg6L295Yiw5Zyw5Zu+5LiKXHJcbiAgICAgICAgX3N0YXJ0SW5pdE1hcCgpLnRoZW4oX2dldFN5c3RlbVBvaW50cykudGhlbihfaW5pdFN5c3RlbVBvaW50czJNYXApO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBfc3RhcnRJbml0TWFwKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWFwU2VydmljZS5nZXRNYXBDb25maWcodm0ubWFwQ29uZmlnTmFtZSkudGhlbihfaW5pdE1hcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBfaW5pdE1hcChkYXRhOk1hcENvbmZpZ01vZGVsKSB7XHJcbiAgICAgICAgICAgIHZtLm1hcCA9IG5ldyBOUEdpc01hcE1haW4oKTtcclxuICAgICAgICAgICAgdm0ubWFwLmluaXQodm0ubWFwSWQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9pbml0U3lzdGVtUG9pbnRzMk1hcChwb2ludHM6QXJyYXk8U3lzdGVtUG9pbnQ+KSB7XHJcbiAgICAgICAgICAgIGlmICh2bS5tYXApIHtcclxuICAgICAgICAgICAgICAgIHZtLm1hcC5yZW5kZXJNYXJrZXJzKHBvaW50cywgZ2V0TWFwRXZlbnRzKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRNYXBFdmVudHMoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vkuoYgMjA5IOihjCxnZXQgbWFwIGV2ZW50cycpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgY2xpY2s6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuQ2x1c3Rlck1hcmtlcik9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkluaXRJbmZvV2luZG93KG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gYXMgT3ZlcmxheUxheWVyT3B0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWcqOWcsOWbvuaAu+W8ueWHuuS/oeaBr+eql+WPo1xyXG4gICAgICAgICAqIEBwYXJhbSBtYXJrZXJcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBvcGVuSW5pdEluZm9XaW5kb3cobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLkNsdXN0ZXJNYXJrZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJzI4OCDooYwsb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCk9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIumUgOavgeWcsOWbvuW8ueWHuuahhnNjb3BlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8g5by55Ye65qGG5q2l6aqkXHJcbiAgICAgICAgICAgIC8vIDEuIOWIm+W7uuS4gOS4quepuuW8ueWHuuahhlxyXG4gICAgICAgICAgICAvLyAyLiDkvb/nlKgkY29tcGlsZea4suafk2h0bWxcclxuICAgICAgICAgICAgLy8gMy4g6LCD55Sob2VwbkluZm9XaW5kb3csIOWwhuWIm+W7uueahOW8ueWHuuahhuWSjGh0bWzkuIDotbfkvZzkuLrlj4LmlbDkvKDlhaUsIOW5tuaJk+W8gOWcsOWbvlxyXG4gICAgICAgICAgICAvLyA0LiDlhbPpl63lvLnlh7rmoYYsIOWcqGh0bWzkuK3miYvliqjop6blj5EkZW1pdOS6i+S7tiwg5ZyoJHNjb3Bl5Lit6YCa6L+HJG9u5p2l55uR5ZCs5YWz6Zet5LqL5Lu2LCDosIPnlKhjbG9zZUluZm9XaW5kb3fmlrnms5VcclxuXHJcbiAgICAgICAgICAgIGxldCB3aW5JZCA9IHZtLm1hcC5jcmVhdGVJbmZvV2luZG93KG1hcmtlci5nZXRQb3NpdGlvbigpLmxvbiwgbWFya2VyLmdldFBvc2l0aW9uKCkubGF0KTtcclxuICAgICAgICAgICAgLy8g5b2T5YmN5by55Ye655qEaW5mb3dXaW5kb3fmoYZJRFxyXG4gICAgICAgICAgICBzY29wZS53aW5JZCA9IHdpbklkO1xyXG4gICAgICAgICAgICAvLyDlvZPliY3nm5HlkKznmoTlhbPpl61pbmZvd1dpbmRvd+S6i+S7tuaWueazlVxyXG4gICAgICAgICAgICBzY29wZS5jbG9zZUV2ZW50TmFtZSA9IFwiYWFhXCI7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJGNvbXBpbGUocG9wdXBIdG1sKShzY29wZSk7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpPT4ge1xyXG4gICAgICAgICAgICAgICAgdm0ubWFwLm9wZW5JbmZvV2luZG93KHdpbklkLCBodG1sWzBdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2U6ICgpPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gYXMgSW5mb1dpbmRvd0V2ZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnm5HlkKxpbmZvV2luZG935YWz6Zet5LqL5Lu2XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdENsb3NlSW5mb1dpbmRvd0V2ZW50KCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnIDMxOSDooYws5YWz6ZetaW5mb3dpbmRvdycpO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLiRvbihcImFhYVwiLCAoZXZlbnQ6IEV2ZW50LCB3aW5JZDogc3RyaW5nKT0+IHtcclxuICAgICAgICAgICAgICAgIGNsb3NlSW5mb1dpbmRvdyh3aW5JZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW5pdENsb3NlSW5mb1dpbmRvd0V2ZW50KCk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWFs+mXreWcqOWcsOWbvuS4reW8ueWHuueahOeql+WPo1xyXG4gICAgICAgICAqIEBwYXJhbSB3aW5JZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlSW5mb1dpbmRvdyh3aW5JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCczMzIg6KGMLOWFs+mXrWluZm93aW5kb3cnKTtcclxuXHJcbiAgICAgICAgICAgIHZtLm1hcC5jbG9zZUluZm9XaW5kb3cod2luSWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2dldFN5c3RlbVBvaW50cygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hcFNlcnZpY2UuZ2V0U3lzdGVtUG9pbnRzKClcclxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhOiBSZXNwb25zZVJlc3VsdDxBcnJheTxTeXN0ZW1Qb2ludD4+KT0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwb2ludHMgPSBkYXRhLmRhdGEgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwb2ludHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJtYWluQ2VudGVyQ29udHJvbGxlclwiLCBNYWluQ2VudGVyQ29udHJvbGxlcik7XHJcbiJdfQ==
