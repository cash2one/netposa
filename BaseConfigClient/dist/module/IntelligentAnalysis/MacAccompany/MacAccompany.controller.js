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
define(["require", "exports", "text!../Analysis.camera.popup.html", "text!../TrackPopup/track.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "../../common/app/main.app", "./Mac.accomp.service", "../../../core/entity/AccompanyingAnalysisEnum", "../AnalysisEnum", "./MacAccompanyEnum", "../TrackPopup/track.popup.controller", "../TrackPopupDetail/track.popup.detail.controller", "./Mac.accomp.service", "css!../style/MacAccompany.css", "../../common/services/analysis.service", "../../common/factory/userinfo.cache.factory", "../../common/factory/layerMsg.factory"], function (require, exports, popupHtml, trackPopupHtml, detailPopupHtml, main_app_1, Mac_accomp_service_1, AccompanyingAnalysisEnum_1, AnalysisEnum_1, MacAccompanyEnum_1) {
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
    var MacAccompanyController = (function () {
        function MacAccompanyController($scope, $timeout, analysisService, macAccompService, layer, $compile, userInfoCacheFactory, layerDec) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.macAccompService = macAccompService;
            this.layer = layer;
            this.$compile = $compile;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'analysisService', 'macAccompService', 'layer', 'userInfoCacheFactory', 'layerDec'];
            this.AccompOffLine = [];
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.SexDateList = AnalysisEnum_1.getSexDataList();
            this.GlassDateList = AnalysisEnum_1.getGlassesDataList();
            this.AgeDataList = AnalysisEnum_1.getAgeList();
            this.MaskDateList = AnalysisEnum_1.getMaskDataList();
            this.FastDate = AnalysisEnum_1.FastData.today;
            this.SexDate = AnalysisEnum_1.SexData.all;
            this.GlassDate = AnalysisEnum_1.GlassesData.all;
            this.MaskDate = AnalysisEnum_1.MaskData.all;
            this.similarityMax = 100;
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.showAnalysisList = false;
            this.showAllAccompanyResult = false;
            this.resultParams = new Mac_accomp_service_1.PageParams();
            this.resultToSystemPoints = [];
            this.checkRightResult = [false];
            this.windowWidth = AnalysisEnum_1.getWidowSize().width;
            this.isSortLetter = true;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.accpResultParams = new Mac_accomp_service_1.PageParams();
            var self = this;
            self.AccompanyingAnalysisParams = self.initParams();
            self.getAccompOffLineList();
            this.map = this.$scope.$parent.map;
            if (this.map) {
                this.initForMapLayer();
            }
            this.systemPointList = this.$scope.$parent.systemPoint;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', true);
            });
            this.$scope.$on('map.ready', function (event, map) {
                _this.map = map;
                _this.initForMapLayer();
            });
            this.$scope.$on('points.ready', function (event, points) {
                _this.systemPointList = points;
            });
            this.$scope.$on('close.camera.popup', function (event, cameraIds) {
                if (Array.isArray(cameraIds)) {
                    _this.AccompanyingAnalysisParams.arrCameraId = cameraIds;
                }
                _this.layer.close(_this.currentLayerIndex);
            });
            this.$scope.$on('$destroy', function () {
                _this.destoryForMapMarker();
                _this.map.renderMarkers(_this.systemPointList);
            });
            this.queryPattern = [
                { name: "MAC", value: "MAC", key: 0 },
                { name: "IMEI", value: "IMEI", key: 1 },
                { name: "IMSI", value: "IMSI", key: 2 }
            ];
        }
        MacAccompanyController.prototype.initForMapLayer = function () {
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForResultLayer);
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForTrackLineLayer);
        };
        MacAccompanyController.prototype.destoryForMapMarker = function () {
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup);
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup);
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForResultLineGroup);
            this.map.removeOverlaysByName(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForAccpLineGroup);
            if (this.mapTrackID) {
                this.map.clearTraceAnalyze(this.mapTrackID);
            }
            if (this.mapAccpTrackID) {
                this.map.clearTraceAnalyze(this.mapAccpTrackID);
            }
            var trackWinInfo = this.map.getInfoWindowByID(this.trackWinInfo);
            if (trackWinInfo) {
                trackWinInfo.close();
            }
            var accpTrackWinInfo = this.map.getInfoWindowByID(this.accpTrackWinInfo);
            if (accpTrackWinInfo) {
                accpTrackWinInfo.close();
            }
        };
        MacAccompanyController.prototype.initParams = function () {
            var params = new MacAccompanyEnum_1.MacAccompanyingAnalysis();
            params.taskName = "";
            params.taskType = "";
            params.startTime = "2017-09-27 00:00:00" || this.FastDate.value.startTime;
            params.endTime = "2017-09-28 23:59:59" || this.FastDate.value.endTime;
            params.arrCameraId = [];
            params.followNum = 3;
            params.agofollowTime = 10;
            params.afterfollowTime = 10;
            params.type = "IMEI";
            params.value = "";
            return params;
        };
        MacAccompanyController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.AccompanyingAnalysisParams.startTime = item.value.startTime;
            this.AccompanyingAnalysisParams.endTime = item.value.endTime;
        };
        MacAccompanyController.prototype.deleteImage = function () {
        };
        MacAccompanyController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        MacAccompanyController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
        MacAccompanyController.prototype.getSystemPointForParams = function (points) {
            var _this = this;
            var arr = [];
            points.forEach(function (item) {
                var CameraID = item.AccessLog.CameraID;
                var s = false;
                for (var index = 0; index < _this.systemPointList.length; index++) {
                    var point = _this.systemPointList[index];
                    if (CameraID === point.ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.AccessLog.ID
                        });
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        MacAccompanyController.prototype.setReultTrack = function () {
            var _this = this;
            if (Array.isArray(this.allTrackResult) && this.allTrackResult.length > 0) {
                this.isSortLetter = false;
                this.map.clearTraceAnalyze(this.mapTrackID);
                var arr = this.getSystemPointForParams(this.allTrackResult);
                var style = {
                    color: AnalysisEnum_1.TrackConfig.TrackColorViolet,
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    speed: AnalysisEnum_1.TrackConfig.TrackSpeed,
                    moveUrl: AnalysisEnum_1.TrackConfig.PersonTrackBlueHandle,
                    afterDraw: function (evt) {
                        var data = _this.allTrackResult[evt.index];
                        var info = _this.map.getInfoWindowByID(_this.trackWinInfo);
                        if (info)
                            info.close();
                        _this.trackWinInfo = _this.createMapPopup(evt.point, data, WinPopupType.Track);
                    },
                    stop: function () {
                        _this.$timeout(function () {
                            _this.map.getInfoWindowByID(_this.trackWinInfo).close();
                            _this.trackWinInfo = null;
                        }, 3000);
                    }
                };
                this.map.addOverlaysForLine(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForResultLineGroup, arr, {
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    color: AnalysisEnum_1.TrackConfig.LineColorForViolet
                });
                this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, arr);
                this.mapTrackID = this.map.createTraceAnalyze(arr, style);
                this.map.startTraceAnalyze(this.mapTrackID);
            }
        };
        MacAccompanyController.prototype.setAccpTrack = function (i) {
            var _this = this;
            if (!this.checkRightResult[i]) {
                this.slideRightResult(i);
            }
            if (Array.isArray(this.allAccpTrackResult) && this.allAccpTrackResult.length > 0) {
                this.map.clearTraceAnalyze(this.mapAccpTrackID);
                var arr = this.getSystemPointForParams(this.allAccpTrackResult);
                var style = {
                    color: AnalysisEnum_1.TrackConfig.TrackColorBlue,
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    speed: AnalysisEnum_1.TrackConfig.TrackSpeed,
                    moveUrl: AnalysisEnum_1.TrackConfig.PersonTrackGreenHandle,
                    afterDraw: function (evt) {
                        var data = _this.allAccpTrackResult[evt.index];
                        var info = _this.map.getInfoWindowByID(_this.accpTrackWinInfo);
                        if (info)
                            info.close();
                        _this.accpTrackWinInfo = _this.createMapPopup(evt.point, data, WinPopupType.Track);
                    },
                    stop: function () {
                        _this.$timeout(function () {
                            _this.map.getInfoWindowByID(_this.accpTrackWinInfo).close();
                            _this.accpTrackWinInfo = null;
                        }, 3000);
                    }
                };
                this.map.addOverlaysForLine(AnalysisEnum_1.OverlayName.MapForTrackLineLayer, AnalysisEnum_1.OverlayName.MapForAccpLineGroup, arr, {
                    weight: AnalysisEnum_1.TrackConfig.TrackWeight,
                    color: AnalysisEnum_1.TrackConfig.LineColorForBlue
                });
                this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, arr, false, [], AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
                this.mapAccpTrackID = this.map.createTraceAnalyze(arr, style);
                this.map.startTraceAnalyze(this.mapAccpTrackID);
            }
        };
        MacAccompanyController.prototype.createMapPopup = function (point, data, type) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        MacAccompanyController.prototype.createTrackPopup = function (point, data) {
            var _this = this;
            var WinInfo = this.map.createInfoWindow(point.lon, point.lat, {
                iscommon: true,
                offset: new NPMapLib.Geometry.Size(-82, -248)
            });
            var scope = this.$scope.$new();
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
        MacAccompanyController.prototype.createMarkerPopup = function (point, data) {
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
        MacAccompanyController.prototype.openDetailPopup = function (item, index, groupName) {
            var scope = this.$scope.$new();
            if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                scope.allResult = this.allTrackResult;
            }
            else {
                scope.allResult = this.allAccpTrackResult;
            }
            scope.result = item;
            scope.index = index;
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
        };
        MacAccompanyController.prototype.renderMakers = function (layerName, groupName, isClear, result, flag, lables, icon) {
            var _this = this;
            if (isClear) {
                this.map.removeOverlaysByName(layerName, groupName);
            }
            this.resultToSystemPoints = result;
            this.map.addOverlaysForMakers(layerName, groupName, result, {
                iconURL: icon || AnalysisEnum_1.MarkersIcon.NormalBlueIcon,
                click: function (marker) {
                    var data = marker.getData();
                    var result;
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
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
                    if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
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
        MacAccompanyController.prototype.resultToMap = function (item, index, type) {
            if (type) {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
            else {
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
        };
        MacAccompanyController.prototype.unResultToMap = function (item, index, type) {
            if (type) {
                var res = this.accpTrackResultForMap[item.AccessLog.ID];
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
            }
            else {
                var res = this.trackResultForMap[item.AccessLog.ID];
                this.map.setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.AccessLog.ID, AnalysisEnum_1.MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
            }
        };
        MacAccompanyController.prototype.getKey = function (item) {
            return new Date().getTime() * Math.random();
        };
        MacAccompanyController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.showAllAccompanyResult = false;
            this.resultParams.currentPage = 1;
            this.resultParams.pageSize = 6;
            this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0);
        };
        MacAccompanyController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacAccompanyController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAllResult = false;
                _this.showAllAccompanyResult = false;
                _this.destoryForMapMarker();
                _this.map.renderMarkers(_this.systemPointList);
                _this.isSortLetter = true;
            });
        };
        MacAccompanyController.prototype.goAllResult = function () {
            this.showForm = false;
            this.showResult = false;
            this.showAllResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
            console.log(this.resultParams);
        };
        MacAccompanyController.prototype.goAccompanyAllResult = function () {
            this.showForm = false;
            this.showResult = false;
            this.showAllAccompanyResult = true;
            this.resultParams.pageSize = 40;
            this.resultParams.currentPage = 1;
            this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
            console.log(this.resultParams);
        };
        MacAccompanyController.prototype.changeResultPage = function (i) {
            var _this = this;
            this.resultParams.currentPage = i;
            this.resultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
            if (this.isSortLetter) {
                this.$timeout(function () {
                    _this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, true, _this.getSystemPointForParams(_this.resultParams.data.result), _this.isSortLetter, _this.sortLetter);
                });
            }
        };
        MacAccompanyController.prototype.changeAccpResultPage = function (i) {
            this.accpResultParams.currentPage = i;
            this.accpResultParams = this.macAccompService.getFaceAccompDataByPage(this.resultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0);
        };
        MacAccompanyController.prototype.setResultForMap = function (result) {
            var obj = {};
            result.forEach(function (item, i) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = i;
            });
            this.trackResultForMap = obj;
        };
        MacAccompanyController.prototype.renderAccpMarkers = function () {
            var accpArr = this.accpResultParams.data.result[this.accpResultIndex].AccessLog.AccompanyingRes;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.AccessLog.ID] = item;
                obj[item.AccessLog.ID].resultIndex = index;
            });
            this.accpTrackResultForMap = obj;
            this.allAccpTrackResult = accpArr;
            this.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, this.getSystemPointForParams(this.allAccpTrackResult), false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        MacAccompanyController.prototype.showAnalysisResult = function (item) {
        };
        MacAccompanyController.prototype.submitSearch = function () {
            var self = this;
            if (!self.AccompanyingAnalysisParams.startTime || !self.AccompanyingAnalysisParams.endTime || self.AccompanyingAnalysisParams.endTime < self.AccompanyingAnalysisParams.startTime) {
                self.AccompanyingAnalysisParams.startTime = self.FastDate.value.startTime;
                self.AccompanyingAnalysisParams.endTime = self.FastDate.value.endTime;
            }
            var params = self.initParams();
            params.taskName = self.AccompanyingAnalysisParams.taskName;
            params.taskType = "";
            params.startTime = "2017-09-27 00:00:00" || this.FastDate.value.startTime;
            params.endTime = "2017-09-28 23:59:59" || this.FastDate.value.endTime;
            params.arrCameraId = null;
            params.followNum = self.AccompanyingAnalysisParams.followNum;
            params.agofollowTime = self.AccompanyingAnalysisParams.agofollowTime;
            params.afterfollowTime = self.AccompanyingAnalysisParams.afterfollowTime;
            params.type = self.AccompanyingAnalysisParams.type;
            params.value = self.AccompanyingAnalysisParams.value;
            if (params.taskName === "") {
                return self.layerDec.warnInfo('请输入任务名称');
            }
            if (params.value === "") {
                return self.layerDec.warnInfo('请输入查询内容');
            }
            self.analysisService.searchMacAccompanying(params).then(function (res) {
                self.showAnalysisList = true;
                self.getAccompOffLineList();
            });
        };
        MacAccompanyController.prototype.getAccompOffLineList = function () {
            var self = this;
            var params = {
                "id": self.userInfoCacheFactory.getCurrentUserId(),
                "taskType": "SearchPerceiveAccompany"
            };
            self.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200 && Array.isArray(res.data)) {
                    var List = [];
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].Ext = JSON.parse(res.data[i].Ext);
                        List.push(res.data[i]);
                    }
                    self.AccompOffLine = List;
                }
            });
        };
        MacAccompanyController.prototype.getAccompOffLineDetail = function (item) {
            var self = this;
            var params = {
                "analyseTaskType": "SearchAnalyseTaskResult",
                "taskId": item.TaskId,
                "TaskType": "SearchPerceiveAccompany",
                "PerceiveType": item.Ext.type
            };
            self.analysisService.getOffLineDetail(params).then(function (res) {
                console.log(res);
            });
        };
        MacAccompanyController.prototype.selectQueryType = function (sel) {
            this.AccompanyingAnalysisParams.type = sel.value;
        };
        MacAccompanyController.prototype.deleteAccompOffLine = function (item) {
            var self = this;
            var params = {
                "taskId": item.TaskId,
                "taskType": item.TaskType
            };
            self.analysisService.deleteOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    self.layerDec.warnInfo('删除成功');
                    self.getAccompOffLineList();
                }
                else {
                    self.layerDec.warnInfo('删除失败');
                }
            });
        };
        return MacAccompanyController;
    }());
    main_app_1.app.controller('MacAccompanyController', MacAccompanyController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBY2NvbXBhbnkvTWFjQWNjb21wYW55LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQXlEQTtRQUFBO1FBSUEsQ0FBQztRQUhVLGtCQUFLLEdBQVcsT0FBTyxDQUFDO1FBQ3hCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQzFCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQ3JDLG1CQUFDO0tBSkQsQUFJQyxJQUFBO0lBRUQ7UUFBMEIsK0JBQU07UUFBaEM7O1FBRUEsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FGQSxBQUVDLENBRnlCLGlDQUFNLEdBRS9CO0lBS0Q7UUE4Q0ksZ0NBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsZUFBaUMsRUFDakMsZ0JBQW1DLEVBQ25DLEtBQVUsRUFDVixRQUFhLEVBQ2Isb0JBQTJDLEVBQzNDLFFBQW1CO1lBUHZDLGlCQThDQztZQTlDbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtZQUNuQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDM0MsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQXBEdkMsWUFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUdsSixrQkFBYSxHQUE4QixFQUFFLENBQUM7WUFJOUMsaUJBQVksR0FBNEIsOEJBQWUsRUFBRSxDQUFDO1lBQzFELGdCQUFXLEdBQXdCLDZCQUFjLEVBQUUsQ0FBQztZQUNwRCxrQkFBYSxHQUF3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SSxDQUFDLDBCQUEwQixDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3JELENBQUM7UUFNTyxvREFBbUIsR0FBM0IsVUFBNEIsSUFBd0I7WUFDaEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksTUFBTSxHQUFHO2dCQUNULFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQzVCLENBQUM7WUFDRixJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQy9CLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUNoQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0wsNkJBQUM7SUFBRCxDQTFtQkEsQUEwbUJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL0ludGVsbGlnZW50QW5hbHlzaXMvTWFjQWNjb21wYW55L01hY0FjY29tcGFueS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9BbmFseXNpcy5jYW1lcmEucG9wdXAuaHRtbFwiIG5hbWU9XCJwb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL1RyYWNrUG9wdXAvdHJhY2sucG9wdXAuaHRtbFwiIG5hbWU9XCJ0cmFja1BvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuaHRtbFwiIG5hbWU9XCJkZXRhaWxQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgXCIuLi9UcmFja1BvcHVwL3RyYWNrLnBvcHVwLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgXCIuLi9UcmFja1BvcHVwRGV0YWlsL3RyYWNrLnBvcHVwLmRldGFpbC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi9NYWMuYWNjb21wLnNlcnZpY2VcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvTWFjQWNjb21wYW55LmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge05QR2lzTWFwTWFpbn0gZnJvbSAnLi4vLi4vY29tbW9uL21hcC9tYXAubWFpbic7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge1RyYWNlQW5hbHl6ZU9wdHMsIFBvbHlsaW5lU3R5bGV9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL21hcC5pbnRlcmZhY2VcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQge0lBbmFseXNpc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQge0lNYWNBY2NvbXBTZXJ2aWNlLCBQYWdlUGFyYW1zfSBmcm9tIFwiLi9NYWMuYWNjb21wLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuLy8g5raI5oGv5by55qGGXHJcbmltcG9ydCB7SUxheWVyRGVjfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtcclxuICAgIEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0LFxyXG4gICAgUmVzdWx0XHJcbn0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvQWNjb21wYW55aW5nQW5hbHlzaXNFbnVtJztcclxuaW1wb3J0IHsgSW50ZWxpZ2VudFRhc2tJbmZvIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvSW50ZWxpZ2VudFRhc2tJbmZvJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBNYXJrZXJzSWNvbixcclxuICAgIFRyYWNrQ29uZmlnLFxyXG4gICAgT3ZlcmxheU5hbWUsXHJcbiAgICBHZXRORGF5VGltZSxcclxuICAgIEZhc3REYXRhLFxyXG4gICAgZ2V0RmFzdERhdGFMaXN0LFxyXG4gICAgQWdlLFxyXG4gICAgRW51bSxcclxuICAgIFRpbWVMZW5ndGgsXHJcbiAgICBnZXRHbGFzc2VzRGF0YUxpc3QsXHJcbiAgICBnZXRNYXNrRGF0YUxpc3QsXHJcbiAgICBHbGFzc2VzRGF0YSxcclxuICAgIGdldEFnZUxpc3QsXHJcbiAgICBNYXNrRGF0YSxcclxuICAgIGdldFNleERhdGFMaXN0LFxyXG4gICAgZ2V0V2lkb3dTaXplLFxyXG4gICAgU2V4RGF0YSwgQ2FwdHVyZSwgTW9ja0NhcHR1cmVMaXN0XHJcbn0gZnJvbSAnLi4vQW5hbHlzaXNFbnVtJztcclxuXHJcbmltcG9ydCB7XHJcbiAgICBNYWNBY2NvbXBhbnlpbmdBbmFseXNpcyxcclxuICAgIE1hY0FjY29tcE9mZkxpbmVcclxufSBmcm9tICcuL01hY0FjY29tcGFueUVudW0nO1xyXG5cclxuXHJcbmNsYXNzIFdpblBvcHVwVHlwZSB7XHJcbiAgICBzdGF0aWMgVHJhY2s6IHN0cmluZyA9ICdUcmFjayc7XHJcbiAgICBzdGF0aWMgTWFya2VyOiBzdHJpbmcgPSAnTWFya2VyJztcclxuICAgIHN0YXRpYyBEZXRhaWw6IHN0cmluZyA9ICdEZXRhaWwnO1xyXG59XHJcblxyXG5jbGFzcyBDYWNoZVJlc3VsdCBleHRlbmRzIFJlc3VsdCB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5kZWNsYXJlIGxldCBwb3B1cEh0bWw6IGFueSwgYW5ndWxhcjogYW55LCB0cmFja1BvcHVwSHRtbDogYW55LCAkOiBhbnksIGRldGFpbFBvcHVwSHRtbDogYW55O1xyXG5cclxuXHJcbmNsYXNzIE1hY0FjY29tcGFueUNvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ21hY0FjY29tcFNlcnZpY2UnLCAnbGF5ZXInLCAndXNlckluZm9DYWNoZUZhY3RvcnknLCAnbGF5ZXJEZWMnXTtcclxuXHJcbiAgICBBY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtczogTWFjQWNjb21wYW55aW5nQW5hbHlzaXM7IC8vIOWumuS5iW1hY+S8tOmaj+WPguaVsFxyXG4gICAgQWNjb21wT2ZmTGluZTogQXJyYXk8SW50ZWxpZ2VudFRhc2tJbmZvPiA9IFtdOyAvLyBtYWPkvLTpmo/nprvnur/ku7vliqFcclxuXHJcbiAgICBtYXA6IE5QR2lzTWFwTWFpbjtcclxuICAgIHN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgRmFzdERhdGVMaXN0OiBBcnJheTxFbnVtPFRpbWVMZW5ndGg+PiA9IGdldEZhc3REYXRhTGlzdCgpO1xyXG4gICAgU2V4RGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRTZXhEYXRhTGlzdCgpO1xyXG4gICAgR2xhc3NEYXRlTGlzdDogQXJyYXk8RW51bTxudW1iZXI+PiA9IGdldEdsYXNzZXNEYXRhTGlzdCgpO1xyXG4gICAgQWdlRGF0YUxpc3Q6IEFycmF5PEVudW08QWdlPj4gPSBnZXRBZ2VMaXN0KCk7XHJcbiAgICBNYXNrRGF0ZUxpc3Q6IEFycmF5PEVudW08bnVtYmVyPj4gPSBnZXRNYXNrRGF0YUxpc3QoKTtcclxuICAgIEZhc3REYXRlOiBFbnVtPFRpbWVMZW5ndGg+ID0gRmFzdERhdGEudG9kYXk7XHJcbiAgICBTZXhEYXRlOiBFbnVtPG51bWJlcj4gPSBTZXhEYXRhLmFsbDtcclxuICAgIEdsYXNzRGF0ZTogRW51bTxudW1iZXI+ID0gR2xhc3Nlc0RhdGEuYWxsO1xyXG4gICAgTWFza0RhdGU6IEVudW08bnVtYmVyPiA9IE1hc2tEYXRhLmFsbDtcclxuICAgIHNpbWlsYXJpdHlNYXg6IG51bWJlciA9IDEwMDtcclxuICAgIHNob3dSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dGb3JtOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3dBbGxSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dBbmFseXNpc0xpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dBbGxBY2NvbXBhbnlSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlc3VsdFBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICByZXN1bHRNYXJrZXJzOiBBcnJheTxOUE1hcExpYi5TeW1ib2xzLk1hcmtlcj47XHJcbiAgICByZXN1bHRUb1N5c3RlbVBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICBhY2NvbXBJbWFnZVBhdGg6IHN0cmluZztcclxuICAgIG1hcFRyYWNrSUQ6IHN0cmluZztcclxuICAgIG1hcEFjY3BUcmFja0lEOiBzdHJpbmc7XHJcbiAgICBjaGVja1JpZ2h0UmVzdWx0OiBBcnJheTxib29sZWFuPiA9IFtmYWxzZV07XHJcbiAgICB3aW5kb3dXaWR0aDogbnVtYmVyID0gZ2V0V2lkb3dTaXplKCkud2lkdGg7XHJcbiAgICBhbGxUcmFja1Jlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIGlzU29ydExldHRlcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzb3J0TGV0dGVyOiBBcnJheTxzdHJpbmc+ID0gWydBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRiddO1xyXG4gICAgdHJhY2tXaW5JbmZvOiBzdHJpbmc7XHJcbiAgICBhY2NwVHJhY2tXaW5JbmZvOiBzdHJpbmc7XHJcbiAgICBtYXJrZXJXaW5pbmZvOiBzdHJpbmc7XHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgdHJhY2tSZXN1bHRGb3JNYXA6IHsgW2tleTogc3RyaW5nXTogUmVzdWx0IHwgQ2FjaGVSZXN1bHQgfTtcclxuICAgIGFjY3BUcmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgYWNjcFJlc3VsdFBhcmFtczogUGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICBhY2NwUmVzdWx0SW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBhbGxBY2NwVHJhY2tSZXN1bHQ6IEFycmF5PFJlc3VsdD47XHJcbiAgICBxdWVyeVBhdHRlcm46IEFycmF5PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYW5hbHlzaXNTZXJ2aWNlOiBJQW5hbHlzaXNTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBtYWNBY2NvbXBTZXJ2aWNlOiBJTWFjQWNjb21wU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJGNvbXBpbGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDliJ3lp4vljJblj4LmlbBcclxuICAgICAgICBzZWxmLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXAgPSB0aGlzLiRzY29wZS4kcGFyZW50Lm1hcDtcclxuICAgICAgICBpZiAodGhpcy5tYXApIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0Rm9yTWFwTGF5ZXIoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN5c3RlbVBvaW50TGlzdCA9IHRoaXMuJHNjb3BlLiRwYXJlbnQuc3lzdGVtUG9pbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdtYXAucmVhZHknLCAoZXZlbnQ6IGFueSwgbWFwOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXAgPSBtYXA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdEZvck1hcExheWVyKClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ3BvaW50cy5yZWFkeScsIChldmVudDogYW55LCBwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN5c3RlbVBvaW50TGlzdCA9IHBvaW50cztcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlLmNhbWVyYS5wb3B1cCcsIChldmVudDogYW55LCBjYW1lcmFJZHM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2FtZXJhSWRzKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5hcnJDYW1lcmFJZCA9IGNhbWVyYUlkcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW5kZXJNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICB0aGlzLnF1ZXJ5UGF0dGVybiA9IFtcclxuICAgICAgICAgICAge25hbWU6IFwiTUFDXCIsIHZhbHVlOiBcIk1BQ1wiLCBrZXk6IDB9LFxyXG4gICAgICAgICAgICB7bmFtZTogXCJJTUVJXCIsIHZhbHVlOiBcIklNRUlcIiwga2V5OiAxfSxcclxuICAgICAgICAgICAge25hbWU6IFwiSU1TSVwiLCB2YWx1ZTogXCJJTVNJXCIsIGtleTogMn1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdEZvck1hcExheWVyKCkge1xyXG4gICAgICAgIHRoaXMubWFwLnJlbmRlck92ZXJsYXlMYXllcihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllcik7XHJcbiAgICAgICAgdGhpcy5tYXAucmVuZGVyT3ZlcmxheUxheWVyKE92ZXJsYXlOYW1lLk1hcEZvclRyYWNrTGluZUxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3RvcnlGb3JNYXBNYXJrZXIoKSB7XHJcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlT3ZlcmxheXNCeU5hbWUoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKTtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcEdyb3VwKTtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGluZUdyb3VwKTtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcExpbmVHcm91cCk7XHJcbiAgICAgICAgaWYgKHRoaXMubWFwVHJhY2tJRCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5jbGVhclRyYWNlQW5hbHl6ZSh0aGlzLm1hcFRyYWNrSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXBBY2NwVHJhY2tJRCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5jbGVhclRyYWNlQW5hbHl6ZSh0aGlzLm1hcEFjY3BUcmFja0lEKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRyYWNrV2luSW5mbyA9IHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMudHJhY2tXaW5JbmZvKTtcclxuICAgICAgICBpZiAodHJhY2tXaW5JbmZvKSB7XHJcbiAgICAgICAgICAgIHRyYWNrV2luSW5mby5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWNjcFRyYWNrV2luSW5mbyA9IHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMuYWNjcFRyYWNrV2luSW5mbyk7XHJcbiAgICAgICAgaWYgKGFjY3BUcmFja1dpbkluZm8pIHtcclxuICAgICAgICAgICAgYWNjcFRyYWNrV2luSW5mby5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCk6IE1hY0FjY29tcGFueWluZ0FuYWx5c2lzIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IE1hY0FjY29tcGFueWluZ0FuYWx5c2lzKCk7XHJcbiAgICAgICAgcGFyYW1zLnRhc2tOYW1lID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMudGFza1R5cGUgPSBcIlwiO1xyXG4gICAgICAgIHBhcmFtcy5zdGFydFRpbWUgPSBcIjIwMTctMDktMjcgMDA6MDA6MDBcIiB8fCB0aGlzLkZhc3REYXRlLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kVGltZSA9IFwiMjAxNy0wOS0yOCAyMzo1OTo1OVwiIHx8IHRoaXMuRmFzdERhdGUudmFsdWUuZW5kVGltZTtcclxuICAgICAgICBwYXJhbXMuYXJyQ2FtZXJhSWQgPSBbXTtcclxuICAgICAgICBwYXJhbXMuZm9sbG93TnVtID0gMztcclxuICAgICAgICBwYXJhbXMuYWdvZm9sbG93VGltZSA9IDEwO1xyXG4gICAgICAgIHBhcmFtcy5hZnRlcmZvbGxvd1RpbWUgPSAxMDtcclxuICAgICAgICBwYXJhbXMudHlwZSA9IFwiSU1FSVwiO1xyXG4gICAgICAgIHBhcmFtcy52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBzZXRGYXN0RGF0ZShpdGVtOiBFbnVtPFRpbWVMZW5ndGg+KSB7XHJcbiAgICAgICAgdGhpcy5GYXN0RGF0ZSA9IGl0ZW07XHJcbiAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5zdGFydFRpbWUgPSBpdGVtLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLmVuZFRpbWUgPSBpdGVtLnZhbHVlLmVuZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlSW1hZ2UoKSB7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgaSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2hlY2tSaWdodFJlc3VsdChzaXplOiBudW1iZXIsIHRyYWdldDogbnVtYmVyLCBpc0ZpcnN0PzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxib29sZWFuPjtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gdHJhZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaCghdGhpcy5jaGVja1JpZ2h0UmVzdWx0W3RyYWdldF0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChmYWxzZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRJbmRleCA9IHRyYWdldDtcclxuICAgICAgICBpZiAoaXNGaXJzdCkge1xyXG4gICAgICAgICAgICBhcnJbdHJhZ2V0XSA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGVja1JpZ2h0UmVzdWx0ID0gYXJyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQWNjcE1hcmtlcnMoKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMocG9pbnRzOiBBcnJheTxSZXN1bHQ+KTogQXJyYXk8U3lzdGVtUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIHBvaW50cy5mb3JFYWNoKChpdGVtOiBSZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgbGV0IENhbWVyYUlEID0gaXRlbS5BY2Nlc3NMb2cuQ2FtZXJhSUQ7XHJcbiAgICAgICAgICAgIGxldCBzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnN5c3RlbVBvaW50TGlzdC5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IHRoaXMuc3lzdGVtUG9pbnRMaXN0W2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChDYW1lcmFJRCA9PT0gcG9pbnQuT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhdDogcG9pbnQuTGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb246IHBvaW50LkxvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHBvaW50LklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RJRDogcG9pbnQuT2JqZWN0SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdElEOiBpdGVtLkFjY2Vzc0xvZy5JRFxyXG4gICAgICAgICAgICAgICAgICAgIH1hcyBTeXN0ZW1Qb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFzKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSZXVsdFRyYWNrKCkge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYWxsVHJhY2tSZXN1bHQpICYmIHRoaXMuYWxsVHJhY2tSZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzU29ydExldHRlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5jbGVhclRyYWNlQW5hbHl6ZSh0aGlzLm1hcFRyYWNrSUQpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLmFsbFRyYWNrUmVzdWx0KTtcclxuICAgICAgICAgICAgbGV0IHN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IFRyYWNrQ29uZmlnLlRyYWNrQ29sb3JWaW9sZXQsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IFRyYWNrQ29uZmlnLlRyYWNrV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgc3BlZWQ6IFRyYWNrQ29uZmlnLlRyYWNrU3BlZWQsXHJcbiAgICAgICAgICAgICAgICBtb3ZlVXJsOiBUcmFja0NvbmZpZy5QZXJzb25UcmFja0JsdWVIYW5kbGUsXHJcbiAgICAgICAgICAgICAgICBhZnRlckRyYXc6IChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5hbGxUcmFja1Jlc3VsdFtldnQuaW5kZXhdIGFzIFJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMudHJhY2tXaW5JbmZvKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvKSBpbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja1dpbkluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKGV2dC5wb2ludCwgZGF0YSwgV2luUG9wdXBUeXBlLlRyYWNrKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdG9wOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmdldEluZm9XaW5kb3dCeUlEKHRoaXMudHJhY2tXaW5JbmZvKS5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrV2luSW5mbyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBUcmFjZUFuYWx5emVPcHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRPdmVybGF5c0ZvckxpbmUoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExpbmVHcm91cCwgYXJyLCB7XHJcbiAgICAgICAgICAgICAgICB3ZWlnaHQ6IFRyYWNrQ29uZmlnLlRyYWNrV2VpZ2h0LFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IFRyYWNrQ29uZmlnLkxpbmVDb2xvckZvclZpb2xldFxyXG4gICAgICAgICAgICB9IGFzIFBvbHlsaW5lU3R5bGUpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlck1ha2VycyhPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIHRydWUsIGFycik7XHJcbiAgICAgICAgICAgIHRoaXMubWFwVHJhY2tJRCA9IHRoaXMubWFwLmNyZWF0ZVRyYWNlQW5hbHl6ZShhcnIsIHN0eWxlKTtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc3RhcnRUcmFjZUFuYWx5emUodGhpcy5tYXBUcmFja0lEKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldEFjY3BUcmFjayhpOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tSaWdodFJlc3VsdFtpXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlUmlnaHRSZXN1bHQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0KSAmJiB0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwQWNjcFRyYWNrSUQpO1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBUcmFja0NvbmZpZy5UcmFja0NvbG9yQmx1ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodDogVHJhY2tDb25maWcuVHJhY2tXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzcGVlZDogVHJhY2tDb25maWcuVHJhY2tTcGVlZCxcclxuICAgICAgICAgICAgICAgIG1vdmVVcmw6IFRyYWNrQ29uZmlnLlBlcnNvblRyYWNrR3JlZW5IYW5kbGUsXHJcbiAgICAgICAgICAgICAgICBhZnRlckRyYXc6IChldnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5hbGxBY2NwVHJhY2tSZXN1bHRbZXZ0LmluZGV4XSBhcyBSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLm1hcC5nZXRJbmZvV2luZG93QnlJRCh0aGlzLmFjY3BUcmFja1dpbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvKSBpbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hY2NwVHJhY2tXaW5JbmZvID0gdGhpcy5jcmVhdGVNYXBQb3B1cChldnQucG9pbnQsIGRhdGEsIFdpblBvcHVwVHlwZS5UcmFjayk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3RvcDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5nZXRJbmZvV2luZG93QnlJRCh0aGlzLmFjY3BUcmFja1dpbkluZm8pLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWNjcFRyYWNrV2luSW5mbyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBhcyBUcmFjZUFuYWx5emVPcHRzO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5hZGRPdmVybGF5c0ZvckxpbmUoT3ZlcmxheU5hbWUuTWFwRm9yVHJhY2tMaW5lTGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BMaW5lR3JvdXAsIGFyciwge1xyXG4gICAgICAgICAgICAgICAgd2VpZ2h0OiBUcmFja0NvbmZpZy5UcmFja1dlaWdodCxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBUcmFja0NvbmZpZy5MaW5lQ29sb3JGb3JCbHVlXHJcbiAgICAgICAgICAgIH0gYXMgUG9seWxpbmVTdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFrZXJzKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsIHRydWUsIGFyciwgZmFsc2UsIFtdLCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24pO1xyXG4gICAgICAgICAgICB0aGlzLm1hcEFjY3BUcmFja0lEID0gdGhpcy5tYXAuY3JlYXRlVHJhY2VBbmFseXplKGFyciwgc3R5bGUpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zdGFydFRyYWNlQW5hbHl6ZSh0aGlzLm1hcEFjY3BUcmFja0lEKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDliJvlu7rlnLDlm77lvLnmoYZcclxuICAgIGNyZWF0ZU1hcFBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0LCB0eXBlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlID09PSBXaW5Qb3B1cFR5cGUuVHJhY2spIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVHJhY2tQb3B1cChwb2ludCwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBXaW5Qb3B1cFR5cGUuTWFya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1hcmtlclBvcHVwKHBvaW50LCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRyYWNrUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQpIHtcclxuICAgICAgICBsZXQgV2luSW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgIGRvbSA9IHRoaXMuJGNvbXBpbGUoZG9tLm91dGVySFRNTCkoc2NvcGUpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5vcGVuSW5mb1dpbmRvdyhXaW5JbmZvLCBkb21bMF0sIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5jbG9zZUluZm9XaW5kb3coV2luSW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBXaW5JbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZU1hcmtlclBvcHVwKHBvaW50OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2ludCwgZGF0YTogUmVzdWx0KSB7XHJcbiAgICAgICAgbGV0IFdpbmluZm8gPSB0aGlzLm1hcC5jcmVhdGVJbmZvV2luZG93KHBvaW50LmxvbiwgcG9pbnQubGF0LCB7XHJcbiAgICAgICAgICAgIGlzY29tbW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBvZmZzZXQ6IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTI0OClcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgdHJhY2VEYXRhOiBSZXN1bHQsICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnRyYWNlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgbGV0IGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICBkb20gPSB0aGlzLiRjb21waWxlKGRvbS5vdXRlckhUTUwpKHNjb3BlKTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXAub3BlbkluZm9XaW5kb3coV2luaW5mbywgZG9tWzBdLCB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuY2xvc2VJbmZvV2luZG93KFdpbmluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gV2luaW5mb1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5EZXRhaWxQb3B1cChpdGVtOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCwgaW5kZXg6IG51bWJlciwgZ3JvdXBOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgcmVzdWx0OiBSZXN1bHQsIGFsbFJlc3VsdDogQXJyYXk8UmVzdWx0PiwgaW5kZXg6IG51bWJlciwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgc2NvcGUuYWxsUmVzdWx0ID0gdGhpcy5hbGxUcmFja1Jlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzY29wZS5hbGxSZXN1bHQgPSB0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNjb3BlLnJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBpbmRleDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogZGV0YWlsUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn5Lq65ZGY6K+m5oOFJyxcclxuICAgICAgICAgICAgYXJlYTogW1wiNTg4cHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmuLLmn5PlnLDlm77ngrnkvY1cclxuICAgIHByaXZhdGUgcmVuZGVyTWFrZXJzKGxheWVyTmFtZTogc3RyaW5nLCBncm91cE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYXI6IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IEFycmF5PFN5c3RlbVBvaW50PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGZsYWc/OiBib29sZWFuLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgbGFibGVzPzogQXJyYXk8YW55PixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIGljb24/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoaXNDbGVhcikge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShsYXllck5hbWUsIGdyb3VwTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVzdWx0VG9TeXN0ZW1Qb2ludHMgPSByZXN1bHQ7XHJcbiAgICAgICAgdGhpcy5tYXAuYWRkT3ZlcmxheXNGb3JNYWtlcnMobGF5ZXJOYW1lLCBncm91cE5hbWUsIHJlc3VsdCwge1xyXG4gICAgICAgICAgICBpY29uVVJMOiBpY29uIHx8IE1hcmtlcnNJY29uLk5vcm1hbEJsdWVJY29uLFxyXG4gICAgICAgICAgICBjbGljazogKG1hcmtlcjogTlBNYXBMaWIuU3ltYm9scy5NYXJrZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5EZXRhaWxQb3B1cChyZXN1bHQsIHJlc3VsdC5yZXN1bHRJbmRleCwgZ3JvdXBOYW1lKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbW91c2VPdmVyOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLk1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gbWFya2VyLmdldERhdGEoKSBhcyBhbnk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChncm91cE5hbWUgPT09IE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy50cmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlcldpbmluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKG1hcmtlci5nZXRQb3NpdGlvbigpLCByZXN1bHQsIFdpblBvcHVwVHlwZS5NYXJrZXIpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG1vdXNlT3V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5nZXRJbmZvV2luZG93QnlJRCh0aGlzLm1hcmtlcldpbmluZm8pLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCBmbGFnLCBsYWJsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyDmoLnmja7nu5PmnpzmmL7npLrlnLDlm77lr7nlupTnmoTngrnkvY1cclxuICAgIHJlc3VsdFRvTWFwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlciwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaXRlbS5BY2Nlc3NMb2cuSUQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCBpdGVtLkFjY2Vzc0xvZy5JRCwgTWFya2Vyc0ljb24uSG92ZXJSZWRJY29uLCA5OTkpXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IFJlc3VsdCwgaW5kZXg6IG51bWJlciwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcFtpdGVtLkFjY2Vzc0xvZy5JRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaXRlbS5BY2Nlc3NMb2cuSUQsIE1hcmtlcnNJY29uLk5vcm1hbEdyZWVuSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2l0ZW0uQWNjZXNzTG9nLklEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5tYXAuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIGl0ZW0uQWNjZXNzTG9nLklELCBNYXJrZXJzSWNvbi5Ob3JtYWxCbHVlSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRLZXkoaXRlbTogUmVzdWx0KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpICogTWF0aC5yYW5kb20oKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUFsbFJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbEFjY29tcGFueVJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLm1hY0FjY29tcFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnc2hvd0l0ZW1QYWdlJywgZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrRm9ybSgpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93Rm9ybSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWxsQWNjb21wYW55UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW5kZXJNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5pc1NvcnRMZXR0ZXIgPSB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ29BbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbFJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLm1hY0FjY29tcFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5yZXN1bHRQYXJhbXMpXHJcbiAgICB9XHJcblxyXG4gICAgZ29BY2NvbXBhbnlBbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93Rm9ybSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0FsbEFjY29tcGFueVJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5yZXN1bHRQYXJhbXMgPSB0aGlzLm1hY0FjY29tcFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVzdWx0UGFyYW1zKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjaGFuZ2VSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMucmVzdWx0UGFyYW1zLmN1cnJlbnRQYWdlID0gaTtcclxuICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMubWFjQWNjb21wU2VydmljZS5nZXRGYWNlQWNjb21wRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTb3J0TGV0dGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJNYWtlcnMoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCB0cnVlLCB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMucmVzdWx0UGFyYW1zLmRhdGEucmVzdWx0KSwgdGhpcy5pc1NvcnRMZXR0ZXIsIHRoaXMuc29ydExldHRlcilcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUFjY3BSZXN1bHRQYWdlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zID0gdGhpcy5tYWNBY2NvbXBTZXJ2aWNlLmdldEZhY2VBY2NvbXBEYXRhQnlQYWdlKHRoaXMucmVzdWx0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnNldENoZWNrUmlnaHRSZXN1bHQodGhpcy5yZXN1bHRQYXJhbXMucGFnZVNpemUsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0UmVzdWx0Rm9yTWFwKHJlc3VsdDogQXJyYXk8UmVzdWx0IHwgQ2FjaGVSZXN1bHQ+KSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9IGFzICB7IFtrZXk6IHN0cmluZ106IENhY2hlUmVzdWx0IH07XHJcbiAgICAgICAgcmVzdWx0LmZvckVhY2goKGl0ZW06IENhY2hlUmVzdWx0LCBpOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgb2JqW2l0ZW0uQWNjZXNzTG9nLklEXSA9IGl0ZW07XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0ucmVzdWx0SW5kZXggPSBpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHJhY2tSZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJBY2NwTWFya2VycygpIHtcclxuICAgICAgICBsZXQgYWNjcEFyciA9IHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5kYXRhLnJlc3VsdFt0aGlzLmFjY3BSZXN1bHRJbmRleF0uQWNjZXNzTG9nLkFjY29tcGFueWluZ1JlcztcclxuICAgICAgICBsZXQgb2JqID0ge30gYXMgIHsgW2tleTogc3RyaW5nXTogQ2FjaGVSZXN1bHQgfTtcclxuICAgICAgICBhY2NwQXJyLmZvckVhY2goKGl0ZW06IENhY2hlUmVzdWx0LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG9ialtpdGVtLkFjY2Vzc0xvZy5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5BY2Nlc3NMb2cuSURdLnJlc3VsdEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXAgPSBvYmo7XHJcbiAgICAgICAgdGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQgPSBhY2NwQXJyO1xyXG4gICAgICAgIHRoaXMucmVuZGVyTWFrZXJzKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsIHRydWUsIHRoaXMuZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXModGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQpLCBmYWxzZSwgbnVsbCwgTWFya2Vyc0ljb24uTm9ybWFsR3JlZW5JY29uKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93QW5hbHlzaXNSZXN1bHQoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcblxyXG4gICAgICAgIC8vIHRoaXMubWFjQ2FyQ3Jhc2hNb2NrU2VydmljZS5zZWFyY2hBY2NvbXBhbnlpbmcoaXRlbSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdD4pID0+IHtcclxuICAgICAgICAvLyAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1hY0FjY29tcFNlcnZpY2Uuc2V0RmFjZUFjY29tcERhdGFMaXN0KHJlcy5kYXRhKTtcclxuICAgICAgICAvLyAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSA9IDY7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlc3VsdFBhcmFtcyA9IHRoaXMubWFjQWNjb21wU2VydmljZS5nZXRGYWNlQWNjb21wRGF0YUJ5UGFnZSh0aGlzLnJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFsbFRyYWNrUmVzdWx0ID0gdGhpcy5tYWNBY2NvbXBTZXJ2aWNlLmdldEFsbEZhY2VUcmFja0RhdGEoKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zLnBhZ2VTaXplID0gNjtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMgPSB0aGlzLm1hY0FjY29tcFNlcnZpY2UuZ2V0RmFjZUFjY29tcERhdGFCeVBhZ2UodGhpcy5yZXN1bHRQYXJhbXMpO1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZXRSZXN1bHRGb3JNYXAodGhpcy5hbGxUcmFja1Jlc3VsdCk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyAgICAgfSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm1hcC5yZW1vdmVNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2hvd1Jlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgYXJyID0gdGhpcy5nZXRTeXN0ZW1Qb2ludEZvclBhcmFtcyh0aGlzLnJlc3VsdFBhcmFtcy5kYXRhLnJlc3VsdCk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlbmRlck1ha2VycyhPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIHRydWUsIGFyciwgdHJ1ZSwgdGhpcy5zb3J0TGV0dGVyKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0Q2hlY2tSaWdodFJlc3VsdCh0aGlzLnJlc3VsdFBhcmFtcy5wYWdlU2l6ZSwgMCwgdHJ1ZSk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnJlbmRlckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgLy8gICAgIH0pXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyDliJvlu7ptYWPliIbmnpDnprvnur/ku7vliqFcclxuICAgIHN1Ym1pdFNlYXJjaCgpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCFzZWxmLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLnN0YXJ0VGltZSB8fCAhc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5lbmRUaW1lIHx8IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuZW5kVGltZSA8IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lID0gc2VsZi5GYXN0RGF0ZS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgICAgIHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuZW5kVGltZSA9IHNlbGYuRmFzdERhdGUudmFsdWUuZW5kVGltZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHNlbGYuaW5pdFBhcmFtcygpO1xyXG4gICAgICAgIHBhcmFtcy50YXNrTmFtZSA9IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMudGFza05hbWU7XHJcbiAgICAgICAgcGFyYW1zLnRhc2tUeXBlID0gXCJcIjtcclxuICAgICAgICBwYXJhbXMuc3RhcnRUaW1lID0gXCIyMDE3LTA5LTI3IDAwOjAwOjAwXCIgfHwgdGhpcy5GYXN0RGF0ZS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLmVuZFRpbWUgPSBcIjIwMTctMDktMjggMjM6NTk6NTlcIiB8fCB0aGlzLkZhc3REYXRlLnZhbHVlLmVuZFRpbWU7XHJcbiAgICAgICAgcGFyYW1zLmFyckNhbWVyYUlkID0gbnVsbDtcclxuICAgICAgICBwYXJhbXMuZm9sbG93TnVtID0gc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy5mb2xsb3dOdW07XHJcbiAgICAgICAgcGFyYW1zLmFnb2ZvbGxvd1RpbWUgPSBzZWxmLkFjY29tcGFueWluZ0FuYWx5c2lzUGFyYW1zLmFnb2ZvbGxvd1RpbWU7XHJcbiAgICAgICAgcGFyYW1zLmFmdGVyZm9sbG93VGltZSA9IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMuYWZ0ZXJmb2xsb3dUaW1lO1xyXG4gICAgICAgIHBhcmFtcy50eXBlID0gc2VsZi5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy50eXBlO1xyXG4gICAgICAgIHBhcmFtcy52YWx1ZSA9IHNlbGYuQWNjb21wYW55aW5nQW5hbHlzaXNQYXJhbXMudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChwYXJhbXMudGFza05hbWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeS7u+WKoeWQjeensCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtcy52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5sYXllckRlYy53YXJuSW5mbygn6K+36L6T5YWl5p+l6K+i5YaF5a65Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5zZWFyY2hNYWNBY2NvbXBhbnlpbmcocGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFjY29tcGFueWluZ0FuYWx5c2lzUmVzdWx0PikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLnNob3dBbmFseXNpc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnprvnur/ku7vliqHliJfooahcclxuICAgIHByaXZhdGUgZ2V0QWNjb21wT2ZmTGluZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIFwidGFza1R5cGVcIjogXCJTZWFyY2hQZXJjZWl2ZUFjY29tcGFueVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lTGlzdChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwICYmIEFycmF5LmlzQXJyYXkocmVzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgTGlzdDpBcnJheTxJbnRlbGlnZW50VGFza0luZm8+ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uRXh0ID0gSlNPTi5wYXJzZShyZXMuZGF0YVtpXS5FeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIExpc3QucHVzaChyZXMuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkFjY29tcE9mZkxpbmUgPSBMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDojrflj5bnprvnur/ku7vliqHor6bmg4VcclxuICAgICAqIEBwYXJhbSB7TWFjQWNjb21wT2ZmTGluZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFjY29tcE9mZkxpbmVEZXRhaWwoaXRlbTogTWFjQWNjb21wT2ZmTGluZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImFuYWx5c2VUYXNrVHlwZVwiOiBcIlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0XCIsXHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcIlRhc2tUeXBlXCI6IFwiU2VhcmNoUGVyY2VpdmVBY2NvbXBhbnlcIixcclxuICAgICAgICAgICAgXCJQZXJjZWl2ZVR5cGVcIjogaXRlbS5FeHQudHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6nmn6Xor6LnsbvlnotcclxuICAgICAqIEBwYXJhbSBzZWxcclxuICAgICAqL1xyXG4gICAgc2VsZWN0UXVlcnlUeXBlIChzZWw6YW55KSB7XHJcbiAgICAgICAgdGhpcy5BY2NvbXBhbnlpbmdBbmFseXNpc1BhcmFtcy50eXBlID0gc2VsLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOWIoOmZpOemu+e6v+S7u+WKoVxyXG4gICAgICogQHBhcmFtIHtBY2NvbXBPZmZMaW5lfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVsZXRlQWNjb21wT2ZmTGluZShpdGVtOiBJbnRlbGlnZW50VGFza0luZm8pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgXCJ0YXNrSWRcIjogaXRlbS5UYXNrSWQsXHJcbiAgICAgICAgICAgIFwidGFza1R5cGVcIjogaXRlbS5UYXNrVHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZGVsZXRlT2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTmiJDlip8nKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+WIoOmZpOWksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ01hY0FjY29tcGFueUNvbnRyb2xsZXInLCBNYWNBY2NvbXBhbnlDb250cm9sbGVyKTsiXX0=
