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
define(["require", "exports", "text!../Analysis.camera.popup.html", "text!../TrackPopup/track.popup.html", "text!../MacTrackPopup/mac.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "text!../MacTrackPopupDetail/mac.popup.detail.html", "../../common/app/main.app", "./MacTrack.store", "./MacTrackEnum", "../../../core/entity/AccompanyingAnalysisEnum", "css!../style/MacTrack.css", "./MacTrack.store", "../../common/services/macTrack.service", "../main/analysisMmap.server"], function (require, exports, popupHtml, trackPopupHtml, macPopupHtml, detailPopupHtml, detailMacPopupHtml, main_app_1, MacTrack_store_1, MacTrackEnum_1, AccompanyingAnalysisEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(AccompanyingAnalysisEnum_1.Result));
    var WinPopupType = (function () {
        function WinPopupType() {
        }
        WinPopupType.Track = 'Track';
        WinPopupType.Marker = 'Marker';
        WinPopupType.Detail = 'Detail';
        return WinPopupType;
    }());
    var MacTrackController = (function () {
        function MacTrackController($scope, $timeout, macTrackService, macTrackStore, layer, $compile, macCarCrashMockService, analysisMmapServer) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.macTrackService = macTrackService;
            this.macTrackStore = macTrackStore;
            this.layer = layer;
            this.$compile = $compile;
            this.macCarCrashMockService = macCarCrashMockService;
            this.analysisMmapServer = analysisMmapServer;
            this.$inject = ['$scope', '$timeout', 'macTrackService', 'macTrackStore', 'layer', '$compile', 'macCarCrashMockService', 'analysisMmapServer'];
            this.showIndex = true;
            this.isShowList = false;
            this.isShowDetail = false;
            this.macFrenquencyTime = false;
            this.showTrackdetail = false;
            this.addType = [];
            this.dataAllLists = MacTrackEnum_1.getdataList();
            this.dataList = [];
            this.macCrashList = MacTrackEnum_1.getMacCrashData(5, 10);
            this.macDetail = [];
            this.MacTrackIndexParams = [];
            this.resultParams = new MacTrack_store_1.PageParams();
            this.accpResultParams = new MacTrack_store_1.PageParams();
            this.resultRightType = 'Mac';
            this.resultLeftType = 'Mac';
            this.showForm = true;
            this.showResult = false;
            this.resultToSystemPoints = [];
            this.checkRightResult = [false];
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.isSortLetter = true;
            this.width = $(window).width() - 60;
            this.alarmDetail = document.getElementById("result-track-detail");
            this.map = this.$scope.$parent.map;
            this.systemPointList = this.$scope.$parent.systemPoint;
            console.log(this.systemPointList);
            this.addType = [
                { 'typeId': 0, 'name': 'Mac', placeholder: '请输入Mac地址' },
                { 'typeId': 1, 'name': 'IMEI', placeholder: '请输入设备识别码IMEI' },
                { 'typeId': 2, 'name': 'IMSI', placeholder: '请输入用户识别码IMSI' }
            ];
            this.defaultName = this.addType[0].name;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', true);
            });
            this.addMacAddress();
        }
        MacTrackController.prototype.changeAddType = function (id) {
            var _this = this;
            console.log(id);
            this.addType.forEach(function (val, idx, array) {
                if (id == val.id) {
                    _this.placeHolder = val.placeholder;
                }
            });
        };
        MacTrackController.prototype.foldMacTrack = function (item, idx) {
            console.log(item);
            console.log(this.macCrashList);
            console.log(idx);
            this.currentMacIP = item.macAddress;
            this.macDetail = item.showDetail;
            this.isShowList = false;
            this.macFrenquencyTime = true;
        };
        MacTrackController.prototype.goResultRecords = function () {
            this.showTrackdetail = false;
            this.alarmDetail.style.width = '0';
        };
        MacTrackController.prototype.goMacIpList = function () {
            this.isShowList = true;
            this.macFrenquencyTime = false;
        };
        MacTrackController.prototype.addMacAddress = function () {
            this.MacTrackIndexParams.push({
                macAddress: '',
                name: 'mac',
                startTime: '',
                endTime: ''
            });
        };
        MacTrackController.prototype.gotoIndex = function () {
            this.showIndex = true;
            this.isShowList = false;
        };
        MacTrackController.prototype.swatchDateRange = function (item) {
            console.log(item);
            this.dataList[0] = item;
        };
        MacTrackController.prototype.goBack = function () {
            var _this = this;
            this.showResult = false;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacTrackController.prototype.getKey = function (item) {
            return new Date().getTime() * Math.random();
        };
        MacTrackController.prototype.deleteMacAddress = function (index) {
            this.MacTrackIndexParams.splice(index, 1);
        };
        MacTrackController.prototype.goBackIndex = function () {
            this.isShowList = false;
            this.showIndex = true;
        };
        MacTrackController.prototype.toggleFold = function (idx) {
            console.log(idx);
            console.log(this.MacTrackList);
            this.macCrashList[idx].fold = !this.macCrashList[idx].fold;
        };
        MacTrackController.prototype.ShowAlarmDetail = function () {
            this.showTrackdetail = true;
            this.alarmDetail.style.width = this.width + 'px';
        };
        MacTrackController.prototype.gotoList = function () {
            this.isShowList = true;
            this.isShowDetail = false;
        };
        MacTrackController.prototype.unfold = function (index) {
            console.log(index);
            this.MacTrackList[index].fold = false;
        };
        MacTrackController.prototype.requireList = function () {
            this.showIndex = false;
            this.isShowList = true;
            this.showResult = false;
            this.macTrackService.searchAllInfo(this.MacTrackIndexParams);
        };
        MacTrackController.prototype.findResult = function (item) {
            var _this = this;
            this.showIndex = false;
            this.isShowList = false;
            this.showResult = true;
            this.macCarCrashMockService.searchAccompanying(item).then(function (res) {
                console.log(res.data);
                _this.$timeout(function () {
                    _this.macTrackStore.setFaceAccompDataList(res.data);
                }).then(function () {
                    _this.resultParams.pageSize = 6;
                    _this.resultParams.currentPage = 1;
                    _this.resultParams = _this.macTrackStore.getFaceAccompDataByPage(_this.resultParams);
                    _this.allTrackResult = _this.macTrackStore.getAllFaceTrackData();
                    _this.accpResultParams.pageSize = 6;
                    _this.accpResultParams.currentPage = 1;
                    _this.accpResultParams = _this.macTrackStore.getFaceAccompDataByPage(_this.resultParams);
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
                    _this.renderMakers(MacTrackEnum_1.OverlayName.MapForResultLayer, MacTrackEnum_1.OverlayName.MapForResultGroup, true, arr, true, _this.sortLetter);
                    _this.setCheckRightResult(_this.resultParams.pageSize, 0, true);
                    _this.renderAccpMarkers();
                });
            });
        };
        MacTrackController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        MacTrackController.prototype.getSystemPointForParams = function (points) {
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
        MacTrackController.prototype.renderMakers = function (layerName, groupName, isClear, result, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.map.removeOverlaysByName(layerName, groupName);
            }
            this.resultToSystemPoints = result;
            this.map.addOverlaysForMakers(layerName, groupName, result, {
                iconURL: icon || MacTrackEnum_1.MarkersIcon.NormalBlueIcon,
                click: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === MacTrackEnum_1.OverlayName.MapForResultGroup) {
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
                    if (groupName === MacTrackEnum_1.OverlayName.MapForResultGroup) {
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
        MacTrackController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
        MacTrackController.prototype.renderAccpMarkers = function () {
            var accpArr = this.accpResultParams.data.result[this.accpResultIndex].AccessLog.AccompanyingRes;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = index;
            });
            this.accpTrackResultForMap = obj;
            this.allAccpTrackResult = accpArr;
            this.renderMakers(MacTrackEnum_1.OverlayName.MapForResultLayer, MacTrackEnum_1.OverlayName.MapForAccpGroup, true, this.getSystemPointForParams(this.allAccpTrackResult), false, null, MacTrackEnum_1.MarkersIcon.NormalGreenIcon);
        };
        MacTrackController.prototype.openDetailPopup = function (item, index, groupName) {
            var scope = this.$scope.$new();
            scope.result = item;
            scope.index = index;
            if (groupName === MacTrackEnum_1.OverlayName.MapForResultGroup) {
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
        MacTrackController.prototype.createMapPopup = function (point, data, type, location) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data, location);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        MacTrackController.prototype.createTrackPopup = function (point, data, location) {
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
        MacTrackController.prototype.createMarkerPopup = function (point, data) {
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
        MacTrackController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.macTrackStore.getFaceAccompDataByPage(this.resultParams);
            if (this.isSortLetter) {
                this.$timeout(function () {
                    _this.renderMakers(MacTrackEnum_1.OverlayName.MapForResultLayer, MacTrackEnum_1.OverlayName.MapForResultGroup, true, _this.getSystemPointForParams(_this.resultParams.data.result), _this.isSortLetter, _this.sortLetter);
                });
            }
        };
        MacTrackController.prototype.getCameraListForMap = function (points) {
            var rfidPoints = [];
            points.forEach(function (point) {
                if (point.ObjectType === 'rfidCollect') {
                    rfidPoints.push(point.ObjectID);
                }
            });
            this.MacTrackIndexParams.forEach(function (item, index) {
                item.deviceId = rfidPoints;
            });
            console.log(JSON.stringify(this.MacTrackIndexParams));
        };
        MacTrackController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacTrackController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacTrackController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points) {
                _this.getCameraListForMap(points);
            });
        };
        MacTrackController.prototype.ClearDraw = function () {
            this.analysisMmapServer.clearDraw();
        };
        return MacTrackController;
    }());
    main_app_1.app.controller('MacTrackController', MacTrackController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNUcmFjay9NYWNUcmFjay5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFxQ0E7UUFBMEIsK0JBQU07UUFBaEM7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLGlDQUFNLEdBRS9CO0lBU0Q7UUFBQTtRQUlBLENBQUM7UUFIVSxrQkFBSyxHQUFXLE9BQU8sQ0FBQztRQUN4QixtQkFBTSxHQUFXLFFBQVEsQ0FBQztRQUMxQixtQkFBTSxHQUFXLFFBQVEsQ0FBQztRQUNyQyxtQkFBQztLQUpELEFBSUMsSUFBQTtJQUVEO1FBOENJLDRCQUNZLE1BQVUsRUFDVixRQUFZLEVBQ1osZUFBZ0MsRUFDaEMsYUFBbUMsRUFDbkMsS0FBUyxFQUNULFFBQVksRUFDWixzQkFBK0MsRUFDL0Msa0JBQXVDO1lBUm5ELGlCQTRCQztZQTNCVyxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7WUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBSTtZQUNULGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1lBQy9DLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFyRG5ELFlBQU8sR0FBaUIsQ0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLGVBQWUsRUFBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLG9CQUFvQixDQUFDLENBQUM7WUFLakosY0FBUyxHQUFXLElBQUksQ0FBQztZQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1lBQzNCLGlCQUFZLEdBQVcsS0FBSyxDQUFDO1lBQzdCLHNCQUFpQixHQUFXLEtBQUssQ0FBQztZQUNsQyxvQkFBZSxH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QUFBO1lBQ3BDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELHNDQUFTLEdBQVQ7WUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEMsQ0FBQztRQUNMLHlCQUFDO0lBQUQsQ0F0ZUEsQUFzZUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUMsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNUcmFjay9NYWNUcmFjay5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9BbmFseXNpcy5jYW1lcmEucG9wdXAuaHRtbFwiIG5hbWU9XCJwb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL1RyYWNrUG9wdXAvdHJhY2sucG9wdXAuaHRtbFwiIG5hbWU9XCJ0cmFja1BvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vTWFjVHJhY2tQb3B1cC9tYWMucG9wdXAuaHRtbFwiIG5hbWU9XCJtYWNQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL1RyYWNrUG9wdXBEZXRhaWwvdHJhY2sucG9wdXAuZGV0YWlsLmh0bWxcIiBuYW1lPVwiZGV0YWlsUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9NYWNUcmFja1BvcHVwRGV0YWlsL21hYy5wb3B1cC5kZXRhaWwuaHRtbFwiIG5hbWU9XCJkZXRhaWxNYWNQb3B1cEh0bWxcIiAvPlxyXG5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG4vLyBpbXBvcnQgJ2NzcyEuLi9zdHlsZS9iYXNlLmNzcyc7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL01hY1RyYWNrLmNzcyc7XHJcbmltcG9ydCAnLi9NYWNUcmFjay5zdG9yZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hY1RyYWNrLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lNYWNDYXJDcmFzaE1vY2tTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hY0NhckNyYXNoTW9jay5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBOUEdpc01hcE1haW4gfSBmcm9tICcuLi8uLi9jb21tb24vbWFwL21hcC5tYWluJztcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcbmltcG9ydCB7SU1hY1RyYWNrU2VydmljZVN0b3JlLFBhZ2VQYXJhbXN9IGZyb20gXCIuL01hY1RyYWNrLnN0b3JlXCJcclxuaW1wb3J0IHtJTWFjVHJhY2tTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL21hY1RyYWNrLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lBbmFseXNpc01tYXBTZXJ2ZXJ9IGZyb20gXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0IFwiLi4vbWFpbi9hbmFseXNpc01tYXAuc2VydmVyXCI7XHJcbmltcG9ydCB7XHJcbiAgICBNYXJrZXJzSWNvbixcclxuICAgIHRpbWVMZW5ndGgsXHJcbiAgICBkYXRhLFxyXG4gICAgZGF0YUxpc3RzLFxyXG4gICAgZ2V0ZGF0YUxpc3QsXHJcbiAgICBNYWNUcmFja0luZGV4UGFyYW0sXHJcbiAgICBzaW5nbGVNYWNEZXRhaWxQYXJhbSxcclxuICAgIG1hY0NyYXNoUmVjb3JkUGFyYW0sXHJcbiAgICBnZXRNYWNDcmFzaERhdGEsXHJcbiAgICBPdmVybGF5TmFtZSxcclxuICAgIEFycmF5VW5pcXVlXHJcbn0gZnJvbSBcIi4vTWFjVHJhY2tFbnVtXCJcclxuXHJcbmRlY2xhcmUgbGV0IHBvcHVwSHRtbDogYW55LCBhbmd1bGFyOiBhbnksIHRyYWNrUG9wdXBIdG1sOiBhbnksICQ6IGFueSwgZGV0YWlsUG9wdXBIdG1sOiBhbnksIG1hY1BvcHVwSHRtbDogYW55LGRldGFpbE1hY1BvcHVwSHRtbDphbnksIHRyYW5zaXRpb246YW55O1xyXG5cclxuY2xhc3MgQ2FjaGVSZXN1bHQgZXh0ZW5kcyBSZXN1bHQge1xyXG4gICAgcmVzdWx0SW5kZXg6IG51bWJlcjtcclxufVxyXG5cclxuaW1wb3J0IHtcclxuICAgIEFjY29tcGFueWluZ0FuYWx5c2lzLFxyXG4gICAgQWNjb21wYW55aW5nQW5hbHlzaXNSZXN1bHQsXHJcbiAgICBBY2Nlc3NMb2dNb2RlbCxcclxuICAgIFJlc3VsdFxyXG59IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0FjY29tcGFueWluZ0FuYWx5c2lzRW51bSc7XHJcblxyXG5jbGFzcyBXaW5Qb3B1cFR5cGUge1xyXG4gICAgc3RhdGljIFRyYWNrOiBzdHJpbmcgPSAnVHJhY2snO1xyXG4gICAgc3RhdGljIE1hcmtlcjogc3RyaW5nID0gJ01hcmtlcic7XHJcbiAgICBzdGF0aWMgRGV0YWlsOiBzdHJpbmcgPSAnRGV0YWlsJztcclxufVxyXG5cclxuY2xhc3MgTWFjVHJhY2tDb250cm9sbGVye1xyXG4gICAgJGluamVjdDpBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCckdGltZW91dCcsJ21hY1RyYWNrU2VydmljZScsJ21hY1RyYWNrU3RvcmUnLCdsYXllcicsJyRjb21waWxlJywnbWFjQ2FyQ3Jhc2hNb2NrU2VydmljZScsJ2FuYWx5c2lzTW1hcFNlcnZlciddO1xyXG4gICAgbWFwOk5QR2lzTWFwTWFpbjtcclxuICAgIHN5c3RlbVBvaW50TGlzdDpBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAvL2RhdGFSYW5nZTpBcnJheTxhbnk+O1xyXG4gICAgTWFjVHJhY2tMaXN0OkFycmF5PGFueT47XHJcbiAgICBzaG93SW5kZXg6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBpc1Nob3dMaXN0OmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzU2hvd0RldGFpbDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBtYWNGcmVucXVlbmN5VGltZTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBzaG93VHJhY2tkZXRhaWw6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgYWRkVHlwZTpBcnJheTxhbnk+ID0gW107XHJcbiAgICBkZWZhdWx0TmFtZTpudW1iZXI7XHJcbiAgICBjdXJyZW50TWFjSVA6c3RyaW5nO1xyXG4gICAgYWxhcm1MaXN0OkFycmF5PGFueT47XHJcbiAgICBkYXRhQWxsTGlzdHM6QXJyYXk8ZGF0YTx0aW1lTGVuZ3RoPj4gPSBnZXRkYXRhTGlzdCgpO1xyXG4gICAgZGF0YUxpc3Q6QXJyYXk8ZGF0YTx0aW1lTGVuZ3RoPj4gPSBbXTtcclxuICAgIG1hY0NyYXNoTGlzdDpBcnJheTxtYWNDcmFzaFJlY29yZFBhcmFtPiA9IGdldE1hY0NyYXNoRGF0YSg1LDEwKTtcclxuICAgIG1hY0RldGFpbDpBcnJheTxzaW5nbGVNYWNEZXRhaWxQYXJhbT4gPSBbXTtcclxuICAgIC8vIGRhdGFEZWZhdWx0OmRhdGFMaXN0cztcclxuICAgIE1hY1RyYWNrSW5kZXhQYXJhbXM6QXJyYXk8TWFjVHJhY2tJbmRleFBhcmFtPj1bXTtcclxuICAgIG1hY0luZGV4SXA6c3RyaW5nO1xyXG4gICAgd2lkdGg6YW55O1xyXG4gICAgYWxhcm1EZXRhaWw6YW55O1xyXG4gICAgbWFjQWRkcmVzczpBcnJheTxhbnk+O1xyXG4gICAgbWFjRmlsbGluOkFycmF5PGFueT47XHJcbiAgICBwbGFjZUhvbGRlcjpzdHJpbmc7XHJcbiAgICByZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgYWxsVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICBhY2NwUmVzdWx0UGFyYW1zOiBQYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIHJlc3VsdFJpZ2h0VHlwZTpzdHJpbmcgPSAnTWFjJztcclxuICAgIHJlc3VsdExlZnRUeXBlOnN0cmluZyA9ICdNYWMnO1xyXG4gICAgc2hvd0Zvcm06IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2hvd1Jlc3VsdDpib29sZWFuPWZhbHNlO1xyXG4gICAgYWNjb21wSW1hZ2VQYXRoOiBzdHJpbmc7XHJcbiAgICB0cmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgcmVzdWx0VG9TeXN0ZW1Qb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiA9IFtdO1xyXG4gICAgYWNjcFRyYWNrUmVzdWx0Rm9yTWFwOiB7IFtrZXk6IHN0cmluZ106IFJlc3VsdCB8IENhY2hlUmVzdWx0IH07XHJcbiAgICBtYXJrZXJXaW5pbmZvOiBzdHJpbmc7XHJcbiAgICBjaGVja1JpZ2h0UmVzdWx0OiBBcnJheTxib29sZWFuPiA9IFtmYWxzZV07XHJcbiAgICBhY2NwUmVzdWx0SW5kZXg6IG51bWJlcjtcclxuICAgIGFsbEFjY3BUcmFja1Jlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICBzb3J0TGV0dGVyOiBBcnJheTxzdHJpbmc+ID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRiddO1xyXG4gICAgaXNTb3J0TGV0dGVyOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTphbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBtYWNUcmFja1NlcnZpY2U6SU1hY1RyYWNrU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIG1hY1RyYWNrU3RvcmU6SU1hY1RyYWNrU2VydmljZVN0b3JlLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJGNvbXBpbGU6YW55LFxyXG4gICAgICAgIHByaXZhdGUgbWFjQ2FyQ3Jhc2hNb2NrU2VydmljZTogSU1hY0NhckNyYXNoTW9ja1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBhbmFseXNpc01tYXBTZXJ2ZXI6IElBbmFseXNpc01tYXBTZXJ2ZXJcclxuICAgICl7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9ICQod2luZG93KS53aWR0aCgpIC02MCBhcyBudW1iZXI7XHJcbiAgICAgICAgdGhpcy5hbGFybURldGFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0LXRyYWNrLWRldGFpbFwiKTtcclxuICAgICAgICB0aGlzLm1hcCA9IHRoaXMuJHNjb3BlLiRwYXJlbnQubWFwO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtUG9pbnRMaXN0ID0gdGhpcy4kc2NvcGUuJHBhcmVudC5zeXN0ZW1Qb2ludDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN5c3RlbVBvaW50TGlzdCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkVHlwZSA9IFtcclxuICAgICAgICAgICAgeyd0eXBlSWQnOjAsJ25hbWUnOidNYWMnLHBsYWNlaG9sZGVyOifor7fovpPlhaVNYWPlnLDlnYAnfSxcclxuICAgICAgICAgICAgeyd0eXBlSWQnOjEsJ25hbWUnOidJTUVJJyxwbGFjZWhvbGRlcjon6K+36L6T5YWl6K6+5aSH6K+G5Yir56CBSU1FSSd9LFxyXG4gICAgICAgICAgICB7J3R5cGVJZCc6MiwnbmFtZSc6J0lNU0knLHBsYWNlaG9sZGVyOifor7fovpPlhaXnlKjmiLfor4bliKvnoIFJTVNJJ31cclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdE5hbWUgPSB0aGlzLmFkZFR5cGVbMF0ubmFtZTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdzaG93SXRlbVBhZ2UnLHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDpu5jorqTliqDlhaXkuIDkuKpNQUPlnLDlnYBcclxuICAgICAgICB0aGlzLmFkZE1hY0FkZHJlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNoYW5nZUFkZFR5cGUoaWQ6bnVtYmVyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICAgICAgdGhpcy5hZGRUeXBlLmZvckVhY2goKHZhbCxpZHgsYXJyYXkpPT57XHJcbiAgICAgICAgICAgIGlmKGlkID09dmFsLmlkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VIb2xkZXIgPSB2YWwucGxhY2Vob2xkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGZvbGRNYWNUcmFjayhpdGVtOmFueSxpZHg6bnVtYmVyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1hY0NyYXNoTGlzdCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWR4KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRNYWNJUCA9IGl0ZW0ubWFjQWRkcmVzcztcclxuICAgICAgICB0aGlzLm1hY0RldGFpbCA9IGl0ZW0uc2hvd0RldGFpbDtcclxuICAgICAgICB0aGlzLmlzU2hvd0xpc3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1hY0ZyZW5xdWVuY3lUaW1lID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAgTWFj6L2o6L+5LeivpuaDheaUtuWbnlxyXG4gICAgcHJpdmF0ZSBnb1Jlc3VsdFJlY29yZHMoKXtcclxuICAgICAgICB0aGlzLnNob3dUcmFja2RldGFpbCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWxhcm1EZXRhaWwuc3R5bGUud2lkdGggPSAnMCc7IFxyXG4gICAgfVxyXG4gICAgZ29NYWNJcExpc3QoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0xpc3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubWFjRnJlbnF1ZW5jeVRpbWUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgICAgLy/mt7vliqBNYWPlnLDlnYBcclxuICAgIGFkZE1hY0FkZHJlc3MoKXtcclxuICAgICAgICB0aGlzLk1hY1RyYWNrSW5kZXhQYXJhbXMucHVzaCh7XHJcbiAgICAgICAgICAgIG1hY0FkZHJlc3M6JycsXHJcbiAgICAgICAgICAgIG5hbWU6ICdtYWMnLFxyXG4gICAgICAgICAgICBzdGFydFRpbWU6ICcnLFxyXG4gICAgICAgICAgICBlbmRUaW1lOiAnJ1xyXG4gICAgICAgIH1hcyBNYWNUcmFja0luZGV4UGFyYW0pO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgZ290b0luZGV4KCl7XHJcbiAgICAgICAgdGhpcy5zaG93SW5kZXggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMuYWxhcm1EZXRhaWwuc3R5bGUud2lkdGggPSAnMCc7XHJcbiAgICB9XHJcblxyXG4gICAgc3dhdGNoRGF0ZVJhbmdlKGl0ZW06ZGF0YTx0aW1lTGVuZ3RoPil7XHJcbiAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICAgICAgdGhpcy5kYXRhTGlzdFswXSA9IGl0ZW07XHJcbiAgICAgICAgLy8gdGhpcy5NYWNUcmFja0luZGV4UGFyYW0uc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgLy8gdGhpcy5NYWNUcmFja0luZGV4UGFyYW0uZW5kVGltZSA9IGl0ZW0udmFsdWUuZW5kVGltZTtcclxuICAgIH1cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZ2V0S2V5KGl0ZW06IFJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICB9XHJcbiAgICAvL+WIoOmZpE1hY+WcsOWdgFxyXG4gICAgZGVsZXRlTWFjQWRkcmVzcyhpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuTWFjVHJhY2tJbmRleFBhcmFtcy5zcGxpY2UoaW5kZXgsMSlcclxuICAgIH1cclxuICAgIC8v6L+U5ZueSW5kZXhcclxuICAgIGdvQmFja0luZGV4KCl7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93SW5kZXggPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdG9nZ2xlRm9sZChpZHg6bnVtYmVyKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZHgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTWFjVHJhY2tMaXN0KTtcclxuICAgICAgICB0aGlzLm1hY0NyYXNoTGlzdFtpZHhdLmZvbGQgPSAhdGhpcy5tYWNDcmFzaExpc3RbaWR4XS5mb2xkXHJcbiAgICB9XHJcbiAgICAvL+ivpuaDheWxleW8gFxyXG4gICAgU2hvd0FsYXJtRGV0YWlsKCl7XHJcbiAgICAgICAgLy8gdGhpcy5pc1Nob3dMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93VHJhY2tkZXRhaWwgPSB0cnVlOyAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuYWxhcm1EZXRhaWwuc3R5bGUud2lkdGggPSB0aGlzLndpZHRoKydweCc7IFxyXG4gICAgfVxyXG4gICAgZ290b0xpc3QoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0xpc3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93RGV0YWlsID0gZmFsc2U7IFxyXG4gICAgfVxyXG4gICAgdW5mb2xkKGluZGV4Om51bWJlcil7XHJcbiAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KTtcclxuICAgICAgICAgdGhpcy5NYWNUcmFja0xpc3RbaW5kZXhdLmZvbGQgPSBmYWxzZVxyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXliJfooahcclxuICAgIHJlcXVpcmVMaXN0KCl7XHJcbiAgICAgICAgdGhpcy5zaG93SW5kZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzU2hvd0xpc3QgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubWFjVHJhY2tTZXJ2aWNlLnNlYXJjaEFsbEluZm8odGhpcy5NYWNUcmFja0luZGV4UGFyYW1zKVxyXG4gICAgfVxyXG4gICAgLy/pgJrov4fliIbmnpDnu5Pmnpzmn6Xor6LmlbDmja5cclxuICAgIGZpbmRSZXN1bHQoaXRlbTogYW55KXtcclxuICAgICAgICB0aGlzLnNob3dJbmRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNTaG93TGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubWFjQ2FyQ3Jhc2hNb2NrU2VydmljZS5zZWFyY2hBY2NvbXBhbnlpbmcoaXRlbSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hY1RyYWNrU3RvcmUuc2V0RmFjZUFjY29tcERhdGFMaXN0KHJlcy5kYXRhKTtcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMubWFjVHJhY2tTdG9yZS5nZXRGYWNlQWNjb21wRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbFRyYWNrUmVzdWx0ID0gdGhpcy5tYWNUcmFja1N0b3JlLmdldEFsbEZhY2VUcmFja0RhdGEoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMubWFjVHJhY2tTdG9yZS5nZXRGYWNlQWNjb21wRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFJlc3VsdEZvck1hcCh0aGlzLmFsbFRyYWNrUmVzdWx0KTtcclxuICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLlR5cGUgPT09ICdDYXJUb01hYycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdExlZnRUeXBlID0gJ21hY0NhckNyYXNoJztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdFJpZ2h0VHlwZSA9ICdjYXJNYWNDcmFzaCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5UeXBlID09PSAnTWFjVG9DYXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRMZWZ0VHlwZSA9ICdjYXJNYWNDcmFzaCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXN1bHRSaWdodFR5cGUgPSAnbWFjQ2FyQ3Jhc2gnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWNjb21wSW1hZ2VQYXRoID0gaXRlbS5QYXRoO1xyXG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5yZXN1bHRQYXJhbXMuZGF0YS5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJNYWtlcnMoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCB0cnVlLCBhcnIsIHRydWUsIHRoaXMuc29ydExldHRlcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDAsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBY2NwTWFya2VycygpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0UmVzdWx0Rm9yTWFwKHJlc3VsdDogQXJyYXk8UmVzdWx0IHwgQ2FjaGVSZXN1bHQ+KSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9IGFzICB7IFtrZXk6IHN0cmluZ106IENhY2hlUmVzdWx0IH07XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW06IENhY2hlUmVzdWx0LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0ucmVzdWx0SW5kZXggPSBpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICB9XHJcbiAgICBnZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyhwb2ludHM6IEFycmF5PFJlc3VsdD4pOiBBcnJheTxTeXN0ZW1Qb2ludD4ge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxTeXN0ZW1Qb2ludD47XHJcbiAgICAgICAgbGV0IHRlbXBBcnIgPSBhbmd1bGFyLmNvcHkodGhpcy5zeXN0ZW1Qb2ludExpc3QpIHx8IFtdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBDYW1lcmFJRCA9IGl0ZW0uQWNjZXNzTG9nLkNhbWVyYUlEO1xyXG4gICAgICAgICAgICBsZXQgcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGVtcEFyci5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChDYW1lcmFJRCA9PT0gdGVtcEFycltpbmRleF0uT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh0ZW1wQXJyW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90ZW1wQXJyLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXMpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfVxyXG4gICAgLy9UT0RPIOa4suafk+WcsOWbvueCueS9jVxyXG4gICAgcHJpdmF0ZSByZW5kZXJNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsIGdyb3VwTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGVhcjogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogQXJyYXk8U3lzdGVtUG9pbnQ+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZmxhZz86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBsYWJsZXM/OiBBcnJheTxhbnk+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChpc0NsZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKGxheWVyTmFtZSwgZ3JvdXBOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXN1bHRUb1N5c3RlbVBvaW50cyA9IHJlc3VsdDtcclxuICAgICAgICB0aGlzLm1hcC5hZGRPdmVybGF5c0Zvck1ha2VycyhsYXllck5hbWUsIGdyb3VwTmFtZSwgcmVzdWx0LCB7XHJcbiAgICAgICAgICAgIGljb25VUkw6IGljb24gfHwgTWFya2Vyc0ljb24uTm9ybWFsQmx1ZUljb24sXHJcbiAgICAgICAgICAgIGNsaWNrOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLk1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtYXJrZXIuZ2V0RGF0YSgpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbFBvcHVwKHJlc3VsdCwgcmVzdWx0LnJlc3VsdEluZGV4LCBncm91cE5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3VzZU92ZXI6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtYXJrZXIpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtYXJrZXIuZ2V0RGF0YSgpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2VyV2luaW5mbyA9IHRoaXMuY3JlYXRlTWFwUG9wdXAobWFya2VyLmdldFBvc2l0aW9uKCksIHJlc3VsdCwgV2luUG9wdXBUeXBlLk1hcmtlcilcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMubWFya2VyV2luaW5mbykuY2xvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIGZsYWcsIGxhYmxlcyk7XHJcbiAgICB9XHJcbiAgICBzZXRDaGVja1JpZ2h0UmVzdWx0KHNpemU6IG51bWJlciwgdHJhZ2V0OiBudW1iZXIsIGlzRmlyc3Q/OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGJvb2xlYW4+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0cmFnZXQpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKCF0aGlzLmNoZWNrUmlnaHRSZXN1bHRbdHJhZ2V0XSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdEluZGV4ID0gdHJhZ2V0O1xyXG4gICAgICAgIGlmIChpc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGFyclt0cmFnZXRdID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrUmlnaHRSZXN1bHQgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBY2NwTWFya2VycygpXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlbmRlckFjY3BNYXJrZXJzKCkge1xyXG4gICAgICAgIGxldCBhY2NwQXJyID0gdGhpcy5hY2NwUmVzdWx0UGFyYW1zLmRhdGEucmVzdWx0W3RoaXMuYWNjcFJlc3VsdEluZGV4XS5BY2Nlc3NMb2cuQWNjb21wYW55aW5nUmVzO1xyXG4gICAgICAgIGxldCBvYmogPSB7fSBhcyAgeyBba2V5OiBzdHJpbmddOiBDYWNoZVJlc3VsdCB9O1xyXG4gICAgICAgIGFjY3BBcnIuZm9yRWFjaCgoaXRlbTogQ2FjaGVSZXN1bHQsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0ucmVzdWx0SW5kZXggPSBpbmRleDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcCA9IG9iajtcclxuICAgICAgICB0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdCA9IGFjY3BBcnI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJNYWtlcnMoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgdHJ1ZSwgdGhpcy5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdCksIGZhbHNlLCBudWxsLCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCwgaW5kZXg6IG51bWJlciwgZ3JvdXBOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgcmVzdWx0OiBSZXN1bHQsIGFsbFJlc3VsdDogQXJyYXk8UmVzdWx0PiwgaW5kZXg6IG51bWJlciwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLnJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoZ3JvdXBOYW1lID09PSBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCkge1xyXG4gICAgICAgICAgICBzY29wZS5hbGxSZXN1bHQgPSB0aGlzLmFsbFRyYWNrUmVzdWx0O1xyXG4gICAgICAgICAgICBpZih0aGlzLnJlc3VsdExlZnRUeXBlID09PSAnRmFjZScpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkZXRhaWxQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkurrlkZjor6bmg4UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IFtcIjU4OHB4XCIsIFwiYXV0b1wiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZGV0YWlsTWFjUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTWFj6K+m5oOFJyxcclxuICAgICAgICAgICAgICAgICAgICBhcmVhOiBbXCI0OThweFwiLCBcIjIzMHB4XCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzY29wZS5hbGxSZXN1bHQgPSB0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdDtcclxuICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRSaWdodFR5cGUgPT09ICdGYWNlJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRldGFpbFBvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S6uuWRmOivpuaDhScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNTg4cHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBkZXRhaWxNYWNQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdNYWPor6bmg4UnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IFtcIjQ5OHB4XCIsIFwiMjMwcHhcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vVE9ETyDliJvlu7rlnLDlm77lvLnmoYZcclxuICAgIGNyZWF0ZU1hcFBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0LCB0eXBlOiBzdHJpbmcsIGxvY2F0aW9uPzogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZSA9PT0gV2luUG9wdXBUeXBlLlRyYWNrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVRyYWNrUG9wdXAocG9pbnQsIGRhdGEsIGxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFdpblBvcHVwVHlwZS5NYXJrZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlTWFya2VyUG9wdXAocG9pbnQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNyZWF0ZVRyYWNrUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQsIGxvY2F0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZG9tOiBFbGVtZW50O1xyXG4gICAgICAgIGxldCBzaXplOiBOUE1hcExpYi5HZW9tZXRyeS5TaXplO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0TGVmdFR5cGUsdGhpcy5yZXN1bHRSaWdodFR5cGUsIGxvY2F0aW9uKTtcclxuICAgICAgICBpZihsb2NhdGlvbiA9PT0gJ0xlZnQnKXtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmVzdWx0TGVmdFR5cGUgPT09ICdGYWNlJykge1xyXG4gICAgICAgICAgICAgICAgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTI0OClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRvbSA9ICQobWFjUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMTI4KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihsb2NhdGlvbiA9PT0gJ1JpZ2h0Jyl7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdFJpZ2h0VHlwZSA9PT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKHRyYWNrUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tID0gJChtYWNQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0xMjgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgV2luSW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogc2l6ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgZG9tID0gdGhpcy4kY29tcGlsZShkb20ub3V0ZXJIVE1MKShzY29wZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLm9wZW5JbmZvV2luZG93KFdpbkluZm8sIGRvbVswXSwge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmNsb3NlSW5mb1dpbmRvdyhXaW5JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFdpbkluZm87XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFya2VyUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQpIHtcclxuICAgICAgICBsZXQgV2luaW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgIGRvbSA9IHRoaXMuJGNvbXBpbGUoZG9tLm91dGVySFRNTCkoc2NvcGUpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5vcGVuSW5mb1dpbmRvdyhXaW5pbmZvLCBkb21bMF0sIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5jbG9zZUluZm9XaW5kb3coV2luaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBXaW5pbmZvXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMubWFjVHJhY2tTdG9yZS5nZXRGYWNlQWNjb21wRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTb3J0TGV0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJNYWtlcnMoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCB0cnVlLCB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMucmVzdWx0UGFyYW1zLmRhdGEucmVzdWx0KSwgdGhpcy5pc1NvcnRMZXR0ZXIsIHRoaXMuc29ydExldHRlcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyDlnLDlm77mk43kvZxcclxuICAgIC8vVE9ETyDlhazlhbHojrflj5bmkYTlg4/mnLpJROaWueazle+8iOWcsOWbvuahhumAie+8iVxyXG4gICAgZ2V0Q2FtZXJhTGlzdEZvck1hcChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50Pikge1xyXG4gICAgICAgIGxldCByZmlkUG9pbnRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQ6IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChwb2ludC5PYmplY3RUeXBlID09PSAncmZpZENvbGxlY3QnKSB7XHJcbiAgICAgICAgICAgICAgICByZmlkUG9pbnRzLnB1c2gocG9pbnQuT2JqZWN0SUQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL3JmaWRQb2ludHMgPSBBcnJheVVuaXF1ZSh0aGlzLk1hY1RyYWNrSW5kZXhQYXJhbXMuYXJyQ2FtZXJhSWQpO1xyXG4gICAgICAgIHRoaXMuTWFjVHJhY2tJbmRleFBhcmFtcy5mb3JFYWNoKChpdGVtOmFueSxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGl0ZW0uZGV2aWNlSWQgPSByZmlkUG9pbnRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuTWFjVHJhY2tJbmRleFBhcmFtcykpO1xyXG4gICAgICAgIC8vIHRoaXMuc2VsZWN0Q2FtZXJhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1JlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1JlY3QoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FtZXJhTGlzdEZvck1hcChwb2ludHMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3Q2lyY2xlKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdDaXJjbGUoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FtZXJhTGlzdEZvck1hcChwb2ludHMpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBEcmF3UG9seWdvbigpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3UG9seWdvbigocG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRDYW1lcmFMaXN0Rm9yTWFwKHBvaW50cylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIENsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5jbGVhckRyYXcoKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ01hY1RyYWNrQ29udHJvbGxlcicsTWFjVHJhY2tDb250cm9sbGVyKTsiXX0=
