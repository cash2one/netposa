var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "text!../Analysis.camera.popup.html", "text!../TrackPopup/track.popup.html", "text!../MacTrackPopup/mac.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "text!../MacTrackPopupDetail/mac.popup.detail.html", "../../common/app/main.app", "./MacCarCrash.service", "../../../core/entity/AccompanyingAnalysisEnum", "./MacCarCrashEnum", "css!../style/FaceTrack.css", "css!../style/MacCarCrash.css", "./MacCarCrash.service", "../../common/services/macCarCrashMock.service"], function (require, exports, popupHtml, trackPopupHtml, macPopupHtml, detailPopupHtml, detailMacPopupHtml, main_app_1, MacCarCrash_service_1, AccompanyingAnalysisEnum_1, MacCarCrashEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WinPopupType = (function () {
        function WinPopupType() {
        }
        WinPopupType.Track = 'Track';
        WinPopupType.Marker = 'Marker';
        WinPopupType.Detail = 'Detail';
        return WinPopupType;
    }());
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(AccompanyingAnalysisEnum_1.Result));
    var MacCarCrashController = (function () {
        function MacCarCrashController($scope, $rootScope, $timeout, macCarCrashMockService, macCarCrashService, layer, $compile) {
            var _this = this;
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.macCarCrashMockService = macCarCrashMockService;
            this.macCarCrashService = macCarCrashService;
            this.layer = layer;
            this.$compile = $compile;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'macCarCrashMockService', 'macCarCrashService', 'layer', '$compile'];
            this.showTrackdetail = false;
            this.checkRightResult = [false];
            this.carColorList = MacCarCrashEnum_1.carColorList();
            this.carTypeList = MacCarCrashEnum_1.carTypeList();
            this.carBrandList = MacCarCrashEnum_1.carBrandList();
            this.taskNameList = MacCarCrashEnum_1.taskNameList();
            this.resultRightType = 'Mac';
            this.resultLeftType = 'Mac';
            this.resultParams = new MacCarCrash_service_1.PageParams();
            this.showAnalysisList = false;
            this.showResult = false;
            this.showForm = true;
            this.resultToSystemPoints = [];
            this.AccompOffLine = MacCarCrashEnum_1.FaceMacCrashOffLineData;
            this.accpResultParams = new MacCarCrash_service_1.PageParams();
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.isSortLetter = true;
            this.windowWidth = MacCarCrashEnum_1.getWidowSize().width;
            this.map = this.$scope.$parent.map;
            this.systemPointList = this.$scope.$parent.systemPoint;
            this.$scope.$on('map.ready', function (event, map) {
                _this.map = map;
                _this.initForMapLayer();
            });
            this.$scope.$on('points.ready', function (event, points) {
                _this.systemPointList = points;
            });
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', true);
            });
        }
        MacCarCrashController.prototype.initForMapLayer = function () {
            this.map.renderOverlayLayer(MacCarCrashEnum_1.OverlayName.MapForResultLayer);
            this.map.renderOverlayLayer(MacCarCrashEnum_1.OverlayName.MapForTrackLineLayer);
        };
        MacCarCrashController.prototype.selectData = function (arg) {
            console.log(arg);
        };
        MacCarCrashController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacCarCrashController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showResult = false;
            });
        };
        MacCarCrashController.prototype.carQuery = function () {
            console.log(this.CarCrashParams);
        };
        MacCarCrashController.prototype.macQuery = function () {
            console.log(this.MacCrashParams);
        };
        MacCarCrashController.prototype.delArea = function (i) {
            this.AccompOffLine.splice(i, 1);
        };
        MacCarCrashController.prototype.submitSearch = function () {
            this.showAnalysisList = true;
        };
        MacCarCrashController.prototype.getSystemPointForParams = function (points) {
            var arr = [];
            var tempArr = angular.copy(this.systemPointList) || [];
            points.forEach(function (item) {
                var CameraID = item.AccessLog.CameraID;
                var s = false;
                for (var index = 0; index < tempArr.length; index++) {
                    if (CameraID === tempArr[index].ObjectID) {
                        s = true;
                        arr.push(tempArr[index]);
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        MacCarCrashController.prototype.getKey = function (item) {
            return new Date().getTime() * Math.random();
        };
        MacCarCrashController.prototype.showAnalysisResult = function (item) {
            var _this = this;
            this.macCarCrashMockService.searchAccompanying(item).then(function (res) {
                _this.$timeout(function () {
                    _this.macCarCrashService.setFaceAccompDataList(res.data);
                }).then(function () {
                    _this.resultParams.pageSize = 6;
                    _this.resultParams.currentPage = 1;
                    _this.resultParams = _this.macCarCrashService.getFaceAccompDataByPage(_this.resultParams);
                    _this.allTrackResult = _this.macCarCrashService.getAllFaceTrackData();
                    _this.accpResultParams.pageSize = 6;
                    _this.accpResultParams.currentPage = 1;
                    _this.accpResultParams = _this.macCarCrashService.getFaceAccompDataByPage(_this.resultParams);
                    _this.setResultForMap(_this.allTrackResult);
                }).then(function () {
                    _this.map.removeMarkers(_this.systemPointList);
                    if (item.Type === 'CarToMac') {
                        _this.resultLeftType = 'macCarCrash';
                        _this.resultRightType = 'carMacCrash';
                    }
                    if (item.Type === 'MacToCar') {
                        _this.resultLeftType = 'carMacCrash';
                        _this.resultRightType = 'macCarCrash';
                    }
                    _this.showForm = false;
                    _this.showResult = true;
                    _this.accompImagePath = item.Path;
                    var arr = _this.getSystemPointForParams(_this.resultParams.data.result);
                    _this.renderMakers(MacCarCrashEnum_1.OverlayName.MapForResultLayer, MacCarCrashEnum_1.OverlayName.MapForResultGroup, true, arr, true, _this.sortLetter);
                    _this.setCheckRightResult(_this.resultParams.pageSize, 0, true);
                    _this.renderAccpMarkers();
                });
            });
        };
        MacCarCrashController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        MacCarCrashController.prototype.renderMakers = function (layerName, groupName, isClear, result, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.map.removeOverlaysByName(layerName, groupName);
            }
            this.resultToSystemPoints = result;
            this.map.addOverlaysForMakers(layerName, groupName, result, {
                iconURL: icon || MacCarCrashEnum_1.MarkersIcon.NormalBlueIcon,
                click: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === MacCarCrashEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.openDetailPopup(result, result.resultIndex, groupName);
                },
                mouseOver: function (marker) {
                    console.log(marker);
                    var data = marker.getData();
                    var result;
                    if (groupName === MacCarCrashEnum_1.OverlayName.MapForResultGroup) {
                        result = _this.trackResultForMap[data.resultID];
                    }
                    else {
                        result = _this.accpTrackResultForMap[data.resultID];
                    }
                    _this.markerWininfo = _this.createMapPopup(marker.getPosition(), result, WinPopupType.Marker);
                },
                mouseOut: function () {
                    _this.map.getInfoWindowByID(_this.markerWininfo).close();
                }
            }, flag, lables);
        };
        MacCarCrashController.prototype.setCheckRightResult = function (size, traget, isFirst) {
            var arr = [];
            for (var i = 0; i < size; i++) {
                if (i === traget) {
                    arr.push(!this.checkRightResult[traget]);
                }
                else {
                    arr.push(false);
                }
            }
            this.accpResultIndex = traget;
            if (isFirst) {
                arr[traget] = true;
            }
            this.checkRightResult = arr;
            this.renderAccpMarkers();
        };
        MacCarCrashController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        MacCarCrashController.prototype.renderAccpMarkers = function () {
            var accpArr = this.accpResultParams.data.result[this.accpResultIndex].AccessLog.AccompanyingRes;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = index;
            });
            this.accpTrackResultForMap = obj;
            this.allAccpTrackResult = accpArr;
            this.renderMakers(MacCarCrashEnum_1.OverlayName.MapForResultLayer, MacCarCrashEnum_1.OverlayName.MapForAccpGroup, true, this.getSystemPointForParams(this.allAccpTrackResult), false, null, MacCarCrashEnum_1.MarkersIcon.NormalGreenIcon);
        };
        MacCarCrashController.prototype.openDetailPopup = function (item, index, groupName) {
            var scope = this.$scope.$new();
            scope.result = item;
            scope.index = index;
            if (groupName === MacCarCrashEnum_1.OverlayName.MapForResultGroup) {
                scope.allResult = this.allTrackResult;
                if (this.resultLeftType === 'Face') {
                    this.currentLayerIndex = this.layer.open({
                        type: 1,
                        content: detailPopupHtml,
                        scope: scope,
                        skin: "no-scroll",
                        title: '人员详情',
                        area: ["588px", "auto"],
                        end: function () {
                            scope.$destroy();
                        }
                    });
                }
                else {
                    this.currentLayerIndex = this.layer.open({
                        type: 1,
                        content: detailMacPopupHtml,
                        scope: scope,
                        skin: "no-scroll",
                        title: 'Mac详情',
                        area: ["498px", "230px"],
                        end: function () {
                            scope.$destroy();
                        }
                    });
                }
            }
            else {
                scope.allResult = this.allAccpTrackResult;
                if (this.resultRightType === 'Face') {
                    this.currentLayerIndex = this.layer.open({
                        type: 1,
                        content: detailPopupHtml,
                        scope: scope,
                        skin: "no-scroll",
                        title: '人员详情',
                        area: ["588px", "auto"],
                        end: function () {
                            scope.$destroy();
                        }
                    });
                }
                else {
                    this.currentLayerIndex = this.layer.open({
                        type: 1,
                        content: detailMacPopupHtml,
                        scope: scope,
                        skin: "no-scroll",
                        title: 'Mac详情',
                        area: ["498px", "230px"],
                        end: function () {
                            scope.$destroy();
                        }
                    });
                }
            }
        };
        MacCarCrashController.prototype.createMapPopup = function (point, data, type, location) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data, location);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        MacCarCrashController.prototype.createTrackPopup = function (point, data, location) {
            var _this = this;
            var dom;
            var size;
            console.log(this.resultLeftType, this.resultRightType, location);
            if (location === 'Left') {
                if (this.resultLeftType === 'Face') {
                    dom = $(trackPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -248);
                }
                else {
                    dom = $(macPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -128);
                }
            }
            if (location === 'Right') {
                if (this.resultRightType === 'Face') {
                    dom = $(trackPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -248);
                }
                else {
                    dom = $(macPopupHtml).get(0);
                    size = new NPMapLib.Geometry.Size(-82, -128);
                }
            }
            var WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: size
            });
            var scope = this.$scope.$new();
            scope.traceData = data;
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
        MacCarCrashController.prototype.createMarkerPopup = function (point, data) {
            var _this = this;
            var Wininfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
            var scope = this.$scope.$new();
            scope.traceData = data;
            var dom = $(trackPopupHtml).get(0);
            dom = this.$compile(dom.outerHTML)(scope);
            this.$timeout(function () {
                _this.map.openInfoWindow(Wininfo, dom[0], {
                    close: function () {
                        scope.$destroy();
                        _this.map.closeInfoWindow(Wininfo);
                    }
                });
            });
            return Wininfo;
        };
        MacCarCrashController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.macCarCrashService.getFaceAccompDataByPage(this.resultParams);
            if (this.isSortLetter) {
                this.$timeout(function () {
                    _this.renderMakers(MacCarCrashEnum_1.OverlayName.MapForResultLayer, MacCarCrashEnum_1.OverlayName.MapForResultGroup, true, _this.getSystemPointForParams(_this.resultParams.data.result), _this.isSortLetter, _this.sortLetter);
                });
            }
        };
        return MacCarCrashController;
    }());
    main_app_1.app.controller('MacCarCrashController', MacCarCrashController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDYXJDcmFzaC9NYWNDYXJDcmFzaC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFxQ0E7UUFBQTtRQUlBLENBQUM7UUFIVSxrQkFBSyxHQUFXLE9BQU8sQ0FBQztRQUN4QixtQkFBTSxHQUFXLFFBQVEsQ0FBQztRQUMxQixtQkFBTSxHQUFXLFFBQVEsQ0FBQztRQUNyQyxtQkFBQztLQUpELEFBSUMsSUFBQTtJQUtEO1FBQTBCLCtCQUFNO1FBQWhDOztRQUVBLENBQUM7UUFBRCxrQkFBQztJQUFELENBRkEsQUFFQyxDQUZ5QixpQ0FBTSxHQUUvQjtJQUVEO1FBc0NJLCtCQUNZLE1BQVUsRUFDVixVQUFjLEVBQ2QsUUFBWSxFQUNaLHNCQUE4QyxFQUM5QyxrQkFBdUMsRUFDdkMsS0FBVSxFQUNWLFFBQVk7WUFQeEIsaUJBcUJDO1lBcEJXLFdBQU0sR0FBTixNQUFNLENBQUk7WUFDVixlQUFVLEdBQVYsVUFBVSxDQUFJO1lBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7WUFDOUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQTVDeEIsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLG9CQUFvQixFQUFDLE9BQU8sRUFBQyxVQUFVLENBQUMsQ0FBQztZQUs3SCxvQkFBZSxHQUFXLEtBQUssQ0FBQztZQUVoQyxxQkFBZ0IsR0FBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUczQyxpQkFBWSxHQUFNLDhCQUFZLEVBQUUsQ0FBQztZQUNqQyxnQkFBVyxHQUFNLDZCQUFXLEVBQUUsQ0FBQztZQUMvQixpQkFBWSxHQUFNLDhCQUFZLEVBQUUsQ0FBQztZQUNq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R0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNyQyxLQUFLLEVBQUU7d0JBQ0gsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNqQixLQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDdEMsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxPQUFPLENBQUE7UUFDbEIsQ0FBQztRQUVELGdEQUFnQixHQUFoQixVQUFpQixDQUFTO1lBQTFCLGlCQVFDO1lBUEcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsWUFBWSxDQUFDLDZCQUFXLENBQUMsaUJBQWlCLEVBQUUsNkJBQVcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsS0FBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUMxTCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUM7UUFDTCxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQTFYQSxBQTBYQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0NhckNyYXNoL01hY0NhckNyYXNoLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL0FuYWx5c2lzLmNhbWVyYS5wb3B1cC5odG1sXCIgbmFtZT1cInBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cC90cmFjay5wb3B1cC5odG1sXCIgbmFtZT1cInRyYWNrUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9NYWNUcmFja1BvcHVwL21hYy5wb3B1cC5odG1sXCIgbmFtZT1cIm1hY1BvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuaHRtbFwiIG5hbWU9XCJkZXRhaWxQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL01hY1RyYWNrUG9wdXBEZXRhaWwvbWFjLnBvcHVwLmRldGFpbC5odG1sXCIgbmFtZT1cImRldGFpbE1hY1BvcHVwSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvRmFjZVRyYWNrLmNzcyc7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL01hY0NhckNyYXNoLmNzcyc7XHJcblxyXG5pbXBvcnQgeyBOUEdpc01hcE1haW4gfSBmcm9tICcuLi8uLi9jb21tb24vbWFwL21hcC5tYWluJztcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcblxyXG4vL+S9v+eUqOS6uuiEuOeisOaSnm1hY+aOpeWPo1xyXG5pbXBvcnQgJy4vTWFjQ2FyQ3Jhc2guc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hY0NhckNyYXNoTW9jay5zZXJ2aWNlJztcclxuaW1wb3J0IHtJTWFjQ2FyQ3Jhc2hNb2NrU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tYWNDYXJDcmFzaE1vY2suc2VydmljZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SU1hY0NhckNyYXNoU2VydmljZSwgUGFnZVBhcmFtc30gZnJvbSBcIi4vTWFjQ2FyQ3Jhc2guc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0LFxyXG4gICAgUmVzdWx0XHJcbn0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvQWNjb21wYW55aW5nQW5hbHlzaXNFbnVtJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBnZXRXaWRvd1NpemUsXHJcbiAgICBNYXJrZXJzSWNvbixcclxuICAgIE92ZXJsYXlOYW1lLFxyXG4gICAgTWFjQ2FyQ3Jhc2hQYXJhbXMsXHJcbiAgICBjYXJDb2xvckxpc3QsXHJcbiAgICBjYXJUeXBlTGlzdCxcclxuICAgIGNhckJyYW5kTGlzdCxcclxuICAgIHRhc2tOYW1lTGlzdCxcclxuICAgIEZhY2VNYWNDcmFzaE9mZkxpbmVEYXRhXHJcbn0gZnJvbSAnLi9NYWNDYXJDcmFzaEVudW0nO1xyXG5cclxuY2xhc3MgV2luUG9wdXBUeXBlIHtcclxuICAgIHN0YXRpYyBUcmFjazogc3RyaW5nID0gJ1RyYWNrJztcclxuICAgIHN0YXRpYyBNYXJrZXI6IHN0cmluZyA9ICdNYXJrZXInO1xyXG4gICAgc3RhdGljIERldGFpbDogc3RyaW5nID0gJ0RldGFpbCc7XHJcbn1cclxuXHJcblxyXG5kZWNsYXJlIGxldCBwb3B1cEh0bWw6IGFueSwgYW5ndWxhcjogYW55LCB0cmFja1BvcHVwSHRtbDogYW55LCAkOiBhbnksIGRldGFpbFBvcHVwSHRtbDogYW55LCBtYWNQb3B1cEh0bWw6IGFueSxkZXRhaWxNYWNQb3B1cEh0bWw6YW55O1xyXG5cclxuY2xhc3MgQ2FjaGVSZXN1bHQgZXh0ZW5kcyBSZXN1bHQge1xyXG4gICAgcmVzdWx0SW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgTWFjQ2FyQ3Jhc2hDb250cm9sbGVye1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywnJHJvb3RTY29wZScsJyR0aW1lb3V0JywnbWFjQ2FyQ3Jhc2hNb2NrU2VydmljZScsJ21hY0NhckNyYXNoU2VydmljZScsJ2xheWVyJywnJGNvbXBpbGUnXTtcclxuICAgIG1hcDogTlBHaXNNYXBNYWluO1xyXG4gICAgc3lzdGVtUG9pbnRMaXN0OiBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICBDYXJDcmFzaFBhcmFtczogTWFjQ2FyQ3Jhc2hQYXJhbXM7XHJcbiAgICBNYWNDcmFzaFBhcmFtczogTWFjQ2FyQ3Jhc2hQYXJhbXM7XHJcbiAgICBzaG93VHJhY2tkZXRhaWw6Ym9vbGVhbiA9IGZhbHNlOy8v5p+l55yL6L2o6L+5Lei9pui+hlxyXG4gICAgd2lkdGg6bnVtYmVyO1xyXG4gICAgY2hlY2tSaWdodFJlc3VsdDogQXJyYXk8Ym9vbGVhbj4gPSBbZmFsc2VdO1xyXG5cclxuICAgIC8vIOS4i+aLieiPnOWNlVxyXG4gICAgY2FyQ29sb3JMaXN0OmFueT0gY2FyQ29sb3JMaXN0KCk7XHJcbiAgICBjYXJUeXBlTGlzdDphbnk9IGNhclR5cGVMaXN0KCk7XHJcbiAgICBjYXJCcmFuZExpc3Q6YW55PSBjYXJCcmFuZExpc3QoKTtcclxuICAgIHRhc2tOYW1lTGlzdDphbnk9IHRhc2tOYW1lTGlzdCgpO1xyXG5cclxuICAgIHJlc3VsdFJpZ2h0VHlwZTpzdHJpbmcgPSAnTWFjJztcclxuICAgIHJlc3VsdExlZnRUeXBlOnN0cmluZyA9ICdNYWMnO1xyXG4gICAgcmVzdWx0UGFyYW1zOiBQYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHNob3dBbmFseXNpc0xpc3Q6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHNob3dSZXN1bHQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHNob3dGb3JtOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGFjY29tcEltYWdlUGF0aDogc3RyaW5nO1xyXG4gICAgcmVzdWx0VG9TeXN0ZW1Qb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgYWxsVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcblxyXG4gICAgQWNjb21wT2ZmTGluZTogQXJyYXk8e1trZXk6c3RyaW5nXTphbnl9PiA9IEZhY2VNYWNDcmFzaE9mZkxpbmVEYXRhO1xyXG4gICAgYWNjcFJlc3VsdFBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICB0cmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgc29ydExldHRlcjogQXJyYXk8c3RyaW5nPiA9IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJywgJ0YnXTtcclxuICAgIGFjY3BUcmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgbWFya2VyV2luaW5mbzogc3RyaW5nO1xyXG4gICAgYWNjcFJlc3VsdEluZGV4OiBudW1iZXI7XHJcbiAgICBhbGxBY2NwVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgaXNTb3J0TGV0dGVyOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHdpbmRvd1dpZHRoOiBudW1iZXIgPSBnZXRXaWRvd1NpemUoKS53aWR0aDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTphbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOmFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OmFueSxcclxuICAgICAgICBwcml2YXRlIG1hY0NhckNyYXNoTW9ja1NlcnZpY2U6SU1hY0NhckNyYXNoTW9ja1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBtYWNDYXJDcmFzaFNlcnZpY2U6IElNYWNDYXJDcmFzaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgJGNvbXBpbGU6YW55XHJcbiAgICApe1xyXG4gICAgICAgIHRoaXMubWFwID0gdGhpcy4kc2NvcGUuJHBhcmVudC5tYXA7XHJcbiAgICAgICAgdGhpcy5zeXN0ZW1Qb2ludExpc3QgPSB0aGlzLiRzY29wZS4kcGFyZW50LnN5c3RlbVBvaW50O1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignbWFwLnJlYWR5JywgKGV2ZW50OiBhbnksIG1hcDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwID0gbWFwO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRGb3JNYXBMYXllcigpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdwb2ludHMucmVhZHknLCAoZXZlbnQ6IGFueSwgcG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zeXN0ZW1Qb2ludExpc3QgPSBwb2ludHM7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJyx0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdEZvck1hcExheWVyKCl7XHJcbiAgICAgICAgdGhpcy5tYXAucmVuZGVyT3ZlcmxheUxheWVyKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyKTtcclxuICAgICAgICB0aGlzLm1hcC5yZW5kZXJPdmVybGF5TGF5ZXIoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgc2VsZWN0RGF0YShhcmc6YW55KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmcpXHJcbiAgICB9XHJcbiAgICBnb0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJyxmYWxzZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGdvQmFja0Zvcm0oKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBjYXJRdWVyeSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuQ2FyQ3Jhc2hQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG1hY1F1ZXJ5KCl7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5NYWNDcmFzaFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBkZWxBcmVhKGk6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLkFjY29tcE9mZkxpbmUuc3BsaWNlKGksMSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoKCl7XHJcbiAgICAgICAgLy8g6KGo5Y2V6aqM6K+BXHJcbiAgICAgICAgLy8g6K+35rGC5pWw5o2uXHJcbiAgICAgICAgLy8g6Lez6L2s6Iez5YiG5p6Q57uT5p6cXHJcbiAgICAgICAgdGhpcy5zaG93QW5hbHlzaXNMaXN0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyhwb2ludHM6IEFycmF5PFJlc3VsdD4pOiBBcnJheTxTeXN0ZW1Qb2ludD4ge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAgICAgbGV0IHRlbXBBcnIgPSBhbmd1bGFyLmNvcHkodGhpcy5zeXN0ZW1Qb2ludExpc3QpIHx8IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBDYW1lcmFJRCA9IGl0ZW0uQWNjZXNzTG9nLkNhbWVyYUlEO1xyXG4gICAgICAgICAgICBsZXQgcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGVtcEFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChDYW1lcmFJRCA9PT0gdGVtcEFycltpbmRleF0uT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0ZW1wQXJyW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZW1wQXJyLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXMpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShpdGVtOiBSZXN1bHQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCkgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgfVxyXG4gICAgLy8g6YCa6L+H5YiG5p6Q57uT5p6c5p+l6K+i5pWw5o2uXHJcbiAgICBzaG93QW5hbHlzaXNSZXN1bHQoaXRlbTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge1xyXG4gICAgICAgIHRoaXMubWFjQ2FyQ3Jhc2hNb2NrU2VydmljZS5zZWFyY2hBY2NvbXBhbnlpbmcoaXRlbSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hY0NhckNyYXNoU2VydmljZS5zZXRGYWNlQWNjb21wRGF0YUxpc3QocmVzLmRhdGEpO1xyXG4gICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5tYWNDYXJDcmFzaFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbGxUcmFja1Jlc3VsdCA9IHRoaXMubWFjQ2FyQ3Jhc2hTZXJ2aWNlLmdldEFsbEZhY2VUcmFja0RhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMubWFjQ2FyQ3Jhc2hTZXJ2aWNlLmdldEZhY2VBY2NvbXBEYXRhQnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzdWx0Rm9yTWFwKHRoaXMuYWxsVHJhY2tSZXN1bHQpO1xyXG5cclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT09ICdDYXJUb01hYycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdExlZnRUeXBlID0gJ21hY0NhckNyYXNoJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFJpZ2h0VHlwZSA9ICdjYXJNYWNDcmFzaCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09PSAnTWFjVG9DYXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRMZWZ0VHlwZSA9ICdjYXJNYWNDcmFzaCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRSaWdodFR5cGUgPSAnbWFjQ2FyQ3Jhc2gnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb21wSW1hZ2VQYXRoID0gaXRlbS5QYXRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5yZXN1bHRQYXJhbXMuZGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJNYWtlcnMoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCB0cnVlLCBhcnIsIHRydWUsIHRoaXMuc29ydExldHRlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBY2NwTWFya2VycygpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCBpKTtcclxuICAgIH1cclxuICAgIC8vVE9ETyDmuLLmn5PlnLDlm77ngrnkvY1cclxuICAgIHByaXZhdGUgcmVuZGVyTWFrZXJzKGxheWVyTmFtZTogc3RyaW5nLCBncm91cE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVzPzogQXJyYXk8YW55PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGljb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWUsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0VG9TeXN0ZW1Qb2ludHMgPSByZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkT3ZlcmxheXNGb3JNYWtlcnMobGF5ZXJOYW1lLCBncm91cE5hbWUsIHJlc3VsdCwge1xyXG4gICAgICAgICAgICBpY29uVVJMOiBpY29uIHx8IE1hcmtlcnNJY29uLk5vcm1hbEJsdWVJY29uLFxyXG4gICAgICAgICAgICBjbGljazogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxQb3B1cChyZXN1bHQsIHJlc3VsdC5yZXN1bHRJbmRleCwgZ3JvdXBOYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdmVyOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLk1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcldpbmluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKG1hcmtlci5nZXRQb3NpdGlvbigpLCByZXN1bHQsIFdpblBvcHVwVHlwZS5NYXJrZXIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlT3V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5nZXRJbmZvV2luZG93QnlJRCh0aGlzLm1hcmtlcldpbmluZm8pLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmbGFnLCBsYWJsZXMpO1xyXG4gICAgfVxyXG4gICAgc2V0Q2hlY2tSaWdodFJlc3VsdChzaXplOiBudW1iZXIsIHRyYWdldDogbnVtYmVyLCBpc0ZpcnN0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxib29sZWFuPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCghdGhpcy5jaGVja1JpZ2h0UmVzdWx0W3RyYWdldF0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRJbmRleCA9IHRyYWdldDtcclxuICAgICAgICBpZiAoaXNGaXJzdCkge1xyXG4gICAgICAgICAgICBhcnJbdHJhZ2V0XSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja1JpZ2h0UmVzdWx0ID0gYXJyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQWNjcE1hcmtlcnMoKVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRSZXN1bHRGb3JNYXAocmVzdWx0OiBBcnJheTxSZXN1bHQgfCBDYWNoZVJlc3VsdD4pIHtcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICByZXN1bHQuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGk6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXS5yZXN1bHRJbmRleCA9IGk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmFja1Jlc3VsdEZvck1hcCA9IG9iajtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVuZGVyQWNjcE1hcmtlcnMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3BBcnIgPSB0aGlzLmFjY3BSZXN1bHRQYXJhbXMuZGF0YS5yZXN1bHRbdGhpcy5hY2NwUmVzdWx0SW5kZXhdLkFjY2Vzc0xvZy5BY2NvbXBhbnlpbmdSZXM7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9IGFzICB7IFtrZXk6IHN0cmluZ106IENhY2hlUmVzdWx0IH07XHJcbiAgICAgICAgYWNjcEFyci5mb3JFYWNoKChpdGVtOiBDYWNoZVJlc3VsdCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdID0gaXRlbTtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXS5yZXN1bHRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwID0gb2JqO1xyXG4gICAgICAgIHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0ID0gYWNjcEFycjtcclxuICAgICAgICB0aGlzLnJlbmRlck1ha2VycyhPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcEdyb3VwLCB0cnVlLCB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0KSwgZmFsc2UsIG51bGwsIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbik7XHJcbiAgICB9XHJcbiAgICBvcGVuRGV0YWlsUG9wdXAoaXRlbTogUmVzdWx0IHwgQ2FjaGVSZXN1bHQsIGluZGV4OiBudW1iZXIsIGdyb3VwTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHJlc3VsdDogUmVzdWx0LCBhbGxSZXN1bHQ6IEFycmF5PFJlc3VsdD4sIGluZGV4OiBudW1iZXIsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBzY29wZS5yZXN1bHQgPSBpdGVtO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgc2NvcGUuYWxsUmVzdWx0ID0gdGhpcy5hbGxUcmFja1Jlc3VsdDtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRMZWZ0VHlwZSA9PT0gJ0ZhY2UnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZGV0YWlsUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5Lq65ZGY6K+m5oOFJyxcclxuICAgICAgICAgICAgICAgICAgICBhcmVhOiBbXCI1ODhweFwiLCBcImF1dG9cIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRldGFpbE1hY1BvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ01hY+ivpuaDhScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNDk4cHhcIiwgXCIyMzBweFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2NvcGUuYWxsUmVzdWx0ID0gdGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVzdWx0UmlnaHRUeXBlID09PSAnRmFjZScpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkZXRhaWxQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkurrlkZjor6bmg4UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IFtcIjU4OHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZGV0YWlsTWFjUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTWFj6K+m5oOFJyxcclxuICAgICAgICAgICAgICAgICAgICBhcmVhOiBbXCI0OThweFwiLCBcIjIzMHB4XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL1RPRE8g5Yib5bu65Zyw5Zu+5by55qGGXHJcbiAgICBjcmVhdGVNYXBQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIGRhdGE6IFJlc3VsdCwgdHlwZTogc3RyaW5nLCBsb2NhdGlvbj86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFdpblBvcHVwVHlwZS5UcmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUcmFja1BvcHVwKHBvaW50LCBkYXRhLCBsb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBXaW5Qb3B1cFR5cGUuTWFya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1hcmtlclBvcHVwKHBvaW50LCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlVHJhY2tQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIGRhdGE6IFJlc3VsdCwgbG9jYXRpb246IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkb206IGFueTtcclxuICAgICAgICBsZXQgc2l6ZTogTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJlc3VsdExlZnRUeXBlLHRoaXMucmVzdWx0UmlnaHRUeXBlLCBsb2NhdGlvbik7XHJcbiAgICAgICAgaWYobG9jYXRpb24gPT09ICdMZWZ0Jyl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdExlZnRUeXBlID09PSAnRmFjZScpIHtcclxuICAgICAgICAgICAgICAgIGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0yNDgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKG1hY1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTEyOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYobG9jYXRpb24gPT09ICdSaWdodCcpe1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRSaWdodFR5cGUgPT09ICdGYWNlJykge1xyXG4gICAgICAgICAgICAgICAgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTI0OClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbSA9ICQobWFjUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMTI4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgbGV0IFdpbkluZm8gPSB0aGlzLm1hcC5jcmVhdGVJbmZvV2luZG93KHBvaW50LmxvbiwgcG9pbnQubGF0LCB7XHJcbiAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IHNpemVcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHJhY2VEYXRhOiBSZXN1bHQsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnRyYWNlRGF0YSA9IGRhdGE7XHJcblxyXG4gICAgICAgIGRvbSA9IHRoaXMuJGNvbXBpbGUoZG9tLm91dGVySFRNTCkoc2NvcGUpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5vcGVuSW5mb1dpbmRvdyhXaW5JbmZvLCBkb21bMF0sIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5jbG9zZUluZm9XaW5kb3coV2luSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBXaW5JbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1hcmtlclBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IFdpbmluZm8gPSB0aGlzLm1hcC5jcmVhdGVJbmZvV2luZG93KHBvaW50LmxvbiwgcG9pbnQubGF0LCB7XHJcbiAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTI0OClcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHJhY2VEYXRhOiBSZXN1bHQsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnRyYWNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICBkb20gPSB0aGlzLiRjb21waWxlKGRvbS5vdXRlckhUTUwpKHNjb3BlKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXAub3BlbkluZm9XaW5kb3coV2luaW5mbywgZG9tWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuY2xvc2VJbmZvV2luZG93KFdpbmluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gV2luaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVJlc3VsdFBhZ2UoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zID0gdGhpcy5tYWNDYXJDcmFzaFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzU29ydExldHRlcikge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyTWFrZXJzKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCwgdHJ1ZSwgdGhpcy5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLnJlc3VsdFBhcmFtcy5kYXRhLnJlc3VsdCksIHRoaXMuaXNTb3J0TGV0dGVyLCB0aGlzLnNvcnRMZXR0ZXIpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFjQ2FyQ3Jhc2hDb250cm9sbGVyJywgTWFjQ2FyQ3Jhc2hDb250cm9sbGVyKTsiXX0=
