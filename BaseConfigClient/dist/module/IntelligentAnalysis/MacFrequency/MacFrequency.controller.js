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
define(["require", "exports", "text!../Analysis.camera.popup.html", "text!../TrackPopup/track.popup.html", "text!../MacTrackPopup/mac.popup.html", "text!../TrackPopupDetail/track.popup.detail.html", "text!../MacTrackPopupDetail/mac.popup.detail.html", "../../common/app/main.app", "../AnalysisEnum", "./MacFrequencyEnum", "../../common/Pagination", "../TrackPopup/track.popup.controller", "../MacTrackPopup/mac.popup.controller", "../TrackPopupDetail/track.popup.detail.controller", "../MacTrackPopupDetail/mac.popup.detail.controller", "css!../style/MacFrequency.css", "../../common/services/analysis.service", "../main/analysisMmap.server", "../../common/factory/userinfo.cache.factory", "../../common/factory/layerMsg.factory", "./Mac.frequency.service"], function (require, exports, popupHtml, trackPopupHtml, macPopupHtml, detailPopupHtml, detailMacPopupHtml, main_app_1, AnalysisEnum_1, MacFrequencyEnum_1, Pagination_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CacheResult = (function (_super) {
        __extends(CacheResult, _super);
        function CacheResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CacheResult;
    }(MacFrequencyEnum_1.PerceiveInfos));
    var WinPopupType = (function () {
        function WinPopupType() {
        }
        WinPopupType.Track = 'Track';
        WinPopupType.Marker = 'Marker';
        WinPopupType.Detail = 'Detail';
        return WinPopupType;
    }());
    var MacFrequencyController = (function () {
        function MacFrequencyController($scope, $timeout, analysisService, faceFrequencyService, layer, userInfoCacheFactory, layerDec, analysisMmapServer, $compile) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.faceFrequencyService = faceFrequencyService;
            this.layer = layer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.layerDec = layerDec;
            this.analysisMmapServer = analysisMmapServer;
            this.$compile = $compile;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'analysisService', 'faceAccompService', 'layer', 'userInfoCacheFactory', 'layerDec', 'IAnalysisMmapServer'];
            this.FrequencyAnalysisParams = new MacFrequencyEnum_1.FrequencyAnalysisEnum();
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.FastDate = AnalysisEnum_1.FastData.today;
            this.showResult = false;
            this.showForm = true;
            this.showAllResult = false;
            this.showAnalysisList = false;
            this.resultToSystemPoints = [];
            this.windowWidth = AnalysisEnum_1.getWidowSize().width - 60;
            this.resultLeftType = 'MAC';
            this.resultRightType = 'Mac';
            this.isSortLetter = true;
            this.sortLetter = ['A', 'B', 'C', 'D', 'E', 'F'];
            this.queryPattern = AnalysisEnum_1.QueryPattern;
            this.resultParams = new Pagination_1.PageParamsAndResult();
            this.accpResultParams = new Pagination_1.PageParamsAndResult();
            this.checkRightResult = [false];
            this.ResultPagination = new Pagination_1.Pagination();
            this.AccpPagination = new Pagination_1.Pagination();
            this.initParams();
            this.map = this.$scope.$parent.map;
            this.systemPointList = this.$scope.$parent.systemPoint || [];
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
            this.$scope.$on('$destroy', function () {
                _this.destoryForMapMarker();
                _this.map.renderMarkers(_this.systemPointList);
            });
        }
        MacFrequencyController.prototype.initParams = function () {
            var self = this;
            var params = new MacFrequencyEnum_1.FrequencyAnalysisEnum();
            params.startTime = this.FastDate.value.startTime;
            params.endTime = this.FastDate.value.endTime;
            params.taskName = "";
            params.type = "MAC";
            params.value = "";
            self.FrequencyAnalysisParams = params;
            self.getAccompOffLineList();
        };
        MacFrequencyController.prototype.destoryForMapMarker = function () {
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
        MacFrequencyController.prototype.initForMapLayer = function () {
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForResultLayer);
            this.map.renderOverlayLayer(AnalysisEnum_1.OverlayName.MapForTrackLineLayer);
        };
        MacFrequencyController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.FrequencyAnalysisParams.startTime = item.value.startTime;
            this.FrequencyAnalysisParams.endTime = item.value.endTime;
        };
        MacFrequencyController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        MacFrequencyController.prototype.goBackForm = function () {
            var _this = this;
            this.$timeout(function () {
                _this.showForm = true;
                _this.showResult = false;
                _this.showAllResult = false;
                _this.destoryForMapMarker();
                _this.analysisMmapServer.renderSystemPoint();
            });
        };
        MacFrequencyController.prototype.submitSearch = function () {
            var self = this;
            if (!self.FrequencyAnalysisParams.startTime || !self.FrequencyAnalysisParams.endTime || self.FrequencyAnalysisParams.endTime < self.FrequencyAnalysisParams.startTime) {
                self.FrequencyAnalysisParams.startTime = self.FastDate.value.startTime;
                self.FrequencyAnalysisParams.endTime = self.FastDate.value.endTime;
            }
            if (self.FrequencyAnalysisParams.taskName === "") {
                return self.layerDec.warnInfo('请输入任务名称');
            }
            if (self.FrequencyAnalysisParams.value === "") {
                return self.layerDec.warnInfo('请输入查询内容');
            }
            self.analysisService.searchMacFrequency(self.FrequencyAnalysisParams).then(function (res) {
                if (res.code === 200) {
                    self.showAnalysisList = true;
                    self.getAccompOffLineList();
                }
                else {
                    self.layerDec.warnInfo('服务器请求异常');
                }
            });
        };
        MacFrequencyController.prototype.getSystemPointForParams = function (points) {
            var arr = [];
            var tempArr = angular.copy(this.systemPointList);
            points.forEach(function (item) {
                var CameraID = item.MacDeviceId;
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
        MacFrequencyController.prototype.getKey = function (item) {
            return new Date().getTime() * Math.random();
        };
        MacFrequencyController.prototype.setMarksForPage = function () {
            var arr = this.getSystemPointForParams(this.resultParams.data);
            this.resultToSystemPoints = arr;
        };
        MacFrequencyController.prototype.closeAllResult = function () {
            this.showResult = true;
            this.showAllResult = false;
            this.accpResultParams.pageSize = 6;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        };
        MacFrequencyController.prototype.goAllResult = function () {
            this.showForm = false;
            this.showResult = false;
            this.showAllResult = true;
            this.accpResultParams.pageSize = 40;
            this.accpResultParams.currentPage = 1;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
        };
        MacFrequencyController.prototype.showAnalysisResult = function (item) {
            var _this = this;
            var self = this;
            var params = {
                "analyseTaskType": "SearchAnalyseTaskResult",
                "taskId": item.TaskId,
                "TaskType": "SearchPerceiveFrequency",
                "PerceiveType": item.Ext.type
            };
            self.analysisService.getOffLineDetail(params).then(function (res) {
                if (res.code === 200) {
                    self.$timeout(function () {
                        self.AccpPagination.set(res.data.PerceiveFrequencyArr);
                    }).then(function () {
                        self.accpResultParams.pageSize = 6;
                        self.accpResultParams.currentPage = 1;
                        self.accpResultParams = self.AccpPagination.getByPage(self.accpResultParams);
                        self.allTrackResult = self.AccpPagination.get();
                    }).then(function () {
                        _this.showForm = false;
                        _this.showResult = true;
                        _this.analysisMmapServer.removeSystemPoint();
                        self.setCheckRightResult(_this.resultParams.pageSize, 0, true);
                        self.renderAccpMarkers();
                    });
                }
                else {
                    self.layerDec.warnInfo('服务器请求异常');
                }
            });
        };
        MacFrequencyController.prototype.renderAccpMarkers = function () {
            var accpArr = this.accpResultParams.data[this.accpResultIndex].PerceiveInfos;
            var obj = {};
            accpArr.forEach(function (item, index) {
                obj[item.ID] = item;
                obj[item.ID].resultIndex = index;
            });
            this.accpTrackResultForMap = obj;
            this.allAccpTrackResult = accpArr;
            var arr = this.convertLonLat(accpArr);
            this.analysisMmapServer.renderMakers(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, true, arr, this.accpTrackResultForMap, false, null, AnalysisEnum_1.MarkersIcon.NormalGreenIcon);
        };
        MacFrequencyController.prototype.convertLonLat = function (accpArr) {
            var arr = [];
            var tempArr = angular.copy(this.systemPointList);
            accpArr.forEach(function (item) {
                var CameraID = item.MacDeviceId || item.MobileDeviceId;
                var s = false;
                for (var index = 0; index < tempArr.length; index++) {
                    var point = tempArr[index];
                    if (CameraID === tempArr[index].ObjectID) {
                        s = true;
                        arr.push({
                            Lat: point.Lat,
                            Lon: point.Lon,
                            ID: point.ID,
                            ObjectID: point.ObjectID,
                            resultID: item.ID,
                            Descrption: point.Descrption,
                            LayerType: point.LayerType,
                            ObjectType: point.ObjectType,
                            TaskStatus: point.TaskStatus,
                            ObjectState: point.ObjectState,
                            ObjectName: point.ObjectName
                        });
                    }
                }
                if (!s) {
                    arr.push(null);
                }
            });
            return arr;
        };
        MacFrequencyController.prototype.openDetailPopup = function (item, index, groupName) {
            var scope = this.$scope.$new();
            scope.result = item;
            scope.index = index;
            if (groupName === AnalysisEnum_1.OverlayName.MapForResultGroup) {
                scope.allResult = this.allTrackResult;
                if (this.resultLeftType !== 'Face') {
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
                if (this.resultRightType !== 'Face') {
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
        MacFrequencyController.prototype.setReultTrack = function () {
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
                        _this.trackWinInfo = _this.createMapPopup(evt.point, data, WinPopupType.Track, 'Left');
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
        MacFrequencyController.prototype.renderMakers = function (layerName, groupName, isClear, result, flag, lables, icon) {
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
        MacFrequencyController.prototype.createMapPopup = function (point, data, type, location) {
            if (type === WinPopupType.Track) {
                return this.createTrackPopup(point, data, location);
            }
            if (type === WinPopupType.Marker) {
                return this.createMarkerPopup(point, data);
            }
        };
        MacFrequencyController.prototype.createTrackPopup = function (point, data, location) {
            var _this = this;
            var dom;
            var size;
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
        MacFrequencyController.prototype.createMarkerPopup = function (point, data) {
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
        MacFrequencyController.prototype.selectQueryType = function (sel) {
            this.FrequencyAnalysisParams.type = sel.value;
        };
        MacFrequencyController.prototype.getAccompOffLineList = function () {
            var self = this;
            var params = {
                "id": self.userInfoCacheFactory.getCurrentUserId(),
                "taskType": "SearchPerceiveFrequency"
            };
            self.analysisService.getOffLineList(params).then(function (res) {
                if (res.code === 200 && Array.isArray(res.data)) {
                    var List = [];
                    for (var i = 0; i < res.data.length; i++) {
                        res.data[i].Ext = JSON.parse(res.data[i].Ext);
                        List.push(res.data[i]);
                    }
                    self.FrequencyOffLine = List;
                }
            });
        };
        MacFrequencyController.prototype.deleteAccompOffLine = function (item) {
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
        MacFrequencyController.prototype.resultToMap = function (item, index, type) {
            if (type) {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
            else {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.ID, AnalysisEnum_1.MarkersIcon.HoverRedIcon, 999);
            }
        };
        MacFrequencyController.prototype.unResultToMap = function (item, index, type) {
            var res = this.accpTrackResultForMap[item.ID];
            if (type) {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForAccpGroup, item.ID, AnalysisEnum_1.MarkersIcon.NormalGreenIcon, res.resultIndex + 1);
            }
            else {
                this.analysisMmapServer.getMap().setMarkerIcon(AnalysisEnum_1.OverlayName.MapForResultLayer, AnalysisEnum_1.OverlayName.MapForResultGroup, item.ID, AnalysisEnum_1.MarkersIcon.NormalBlueIcon, res.resultIndex + 1);
            }
        };
        MacFrequencyController.prototype.changeAccpResultPage = function (i) {
            this.accpResultParams.currentPage = i;
            this.accpResultParams = this.AccpPagination.getByPage(this.accpResultParams);
            this.setCheckRightResult(this.resultParams.pageSize, 0);
        };
        MacFrequencyController.prototype.setAccpTrack = function (i) {
            if (!this.checkRightResult[i]) {
                this.slideRightResult(i);
            }
            var arr = this.convertLonLat(this.allAccpTrackResult[this.accpResultIndex].PerceiveInfos);
            this.analysisMmapServer.setAccpTrackAnimation(this.allAccpTrackResult, arr, this.accpTrackResultForMap);
        };
        MacFrequencyController.prototype.slideRightResult = function (i) {
            this.setCheckRightResult(this.resultParams.pageSize, i);
        };
        MacFrequencyController.prototype.setCheckRightResult = function (size, traget, isFirst) {
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
        MacFrequencyController.prototype.setShowAnalysisList = function (status) {
            this.showAnalysisList = status;
            if (status) {
                this.getAccompOffLineList();
            }
        };
        return MacFrequencyController;
    }());
    main_app_1.app.controller('MacFrequencyController', MacFrequencyController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNGcmVxdWVuY3kvTWFjRnJlcXVlbmN5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQW9FQTtRQUEwQiwrQkFBYTtRQUF2Qzs7UUFFQSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQUZBLEFBRUMsQ0FGeUIsZ0NBQWEsR0FFdEM7SUFFRDtRQUFBO1FBSUEsQ0FBQztRQUhVLGtCQUFLLEdBQVcsT0FBTyxDQUFDO1FBQ3hCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQzFCLG1CQUFNLEdBQVcsUUFBUSxDQUFDO1FBQ3JDLG1CQUFDO0tBSkQsQUFJQyxJQUFBO0lBS0Q7UUE0Q0ksZ0NBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsZUFBaUMsRUFDakMsb0JBQTJDLEVBQzNDLEtBQVUsRUFDVixvQkFBMkMsRUFDM0MsUUFBbUIsRUFDbkIsa0JBQXVDLEVBQ3ZDLFFBQWE7WUFSakMsaUJBNkJDO1lBN0JtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVix5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBQzNDLGFBQVEsR0FBUixRQUFRLENBQVc7WUFDbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBbkRqQyxZQUFPLEdBQWtCLENBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFVBQVUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBSTFLLDRCQUF1QixHQUEwQixJQUFJLHdDQUFxQixFQUFFLENBQUM7WUFHN0UsaUJBQVks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QyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUM1QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDZixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQzVDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDbkIsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUE7WUFDdEIsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLENBQUM7WUFDNUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUE7UUFDNUIsQ0FBQztRQUVELG9EQUFtQixHQUFuQixVQUFvQixNQUFlO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7WUFDL0IsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDUixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQztRQUNMLDZCQUFDO0lBQUQsQ0F2a0JBLEFBdWtCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0ZyZXF1ZW5jeS9NYWNGcmVxdWVuY3kuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vQW5hbHlzaXMuY2FtZXJhLnBvcHVwLmh0bWxcIiBuYW1lPVwicG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9UcmFja1BvcHVwL3RyYWNrLnBvcHVwLmh0bWxcIiBuYW1lPVwidHJhY2tQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL01hY1RyYWNrUG9wdXAvbWFjLnBvcHVwLmh0bWxcIiBuYW1lPVwibWFjUG9wdXBIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuLi9UcmFja1BvcHVwRGV0YWlsL3RyYWNrLnBvcHVwLmRldGFpbC5odG1sXCIgbmFtZT1cImRldGFpbFBvcHVwSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vTWFjVHJhY2tQb3B1cERldGFpbC9tYWMucG9wdXAuZGV0YWlsLmh0bWxcIiBuYW1lPVwiZGV0YWlsTWFjUG9wdXBIdG1sXCIgLz5cclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgXCIuLi9UcmFja1BvcHVwL3RyYWNrLnBvcHVwLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgXCIuLi9NYWNUcmFja1BvcHVwL21hYy5wb3B1cC5jb250cm9sbGVyXCJcclxuaW1wb3J0IFwiLi4vVHJhY2tQb3B1cERldGFpbC90cmFjay5wb3B1cC5kZXRhaWwuY29udHJvbGxlclwiXHJcbmltcG9ydCBcIi4uL01hY1RyYWNrUG9wdXBEZXRhaWwvbWFjLnBvcHVwLmRldGFpbC5jb250cm9sbGVyXCJcclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuLi9zdHlsZS9NYWNGcmVxdWVuY3kuY3NzJztcclxuXHJcbi8vIOivt+axguacjeWKoVxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5pbXBvcnQge0lBbmFseXNpc1NlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYW5hbHlzaXMuc2VydmljZVwiO1xyXG5cclxuLy8g5Zyw5Zu+5pyN5YqhXHJcbmltcG9ydCB7SUFuYWx5c2lzTW1hcFNlcnZlcn0gZnJvbSBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQgXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuaW1wb3J0IHtOUEdpc01hcE1haW59IGZyb20gJy4uLy4uL2NvbW1vbi9tYXAvbWFwLm1haW4nO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge1xyXG4gICAgVHJhY2tDb25maWcsXHJcbiAgICBPdmVybGF5TmFtZSxcclxuICAgIEdldE5EYXlUaW1lLFxyXG4gICAgRmFzdERhdGEsXHJcbiAgICBnZXRGYXN0RGF0YUxpc3QsXHJcbiAgICBBZ2UsXHJcbiAgICBFbnVtLFxyXG4gICAgVGltZUxlbmd0aCxcclxuICAgIGdldEdsYXNzZXNEYXRhTGlzdCxcclxuICAgIGdldE1hc2tEYXRhTGlzdCxcclxuICAgIEdsYXNzZXNEYXRhLFxyXG4gICAgZ2V0QWdlTGlzdCxcclxuICAgIE1hc2tEYXRhLFxyXG4gICAgZ2V0U2V4RGF0YUxpc3QsXHJcbiAgICBnZXRXaWRvd1NpemUsXHJcbiAgICBTZXhEYXRhLCBDYXB0dXJlLCBNb2NrQ2FwdHVyZUxpc3QsXHJcbiAgICBNYXJrZXJzSWNvbixcclxuICAgIFF1ZXJ5UGF0dGVyblxyXG59IGZyb20gJy4uL0FuYWx5c2lzRW51bSc7XHJcbmltcG9ydCB7RnJlcXVlbmN5QW5hbHlzaXNFbnVtLCBSZXN1bHRUcmFjaywgUmVzdWx0LCBQZXJjZWl2ZUluZm9zfSBmcm9tICcuL01hY0ZyZXF1ZW5jeUVudW0nO1xyXG5cclxuLy8g5YWs5YWx5Y+C5pWwXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJbnRlbGlnZW50VGFza0luZm99IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0ludGVsaWdlbnRUYXNrSW5mbyc7IC8vIOemu+e6v+S7u+WKoVxyXG5cclxuLy8g6I635Y+W55So5oi35L+h5oGv5pa55rOVXHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcblxyXG4vLyDkv6Hmga/lvLnmoYbmlrnms5VcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuXHJcbi8vIOWIhumhteaWueazlVxyXG5pbXBvcnQge1BhZ2VQYXJhbXNBbmRSZXN1bHQsIFBhZ2luYXRpb24sIElQYWdpbmF0aW9ufSBmcm9tICcuLi8uLi9jb21tb24vUGFnaW5hdGlvbic7XHJcblxyXG4vLyDmnKrnn6XlvoXlrppcclxuaW1wb3J0IHtJRmFjZUZyZXF1ZW5jeVNlcnZpY2V9IGZyb20gXCIuL01hYy5mcmVxdWVuY3kuc2VydmljZVwiO1xyXG5pbXBvcnQge1RyYWNlQW5hbHl6ZU9wdHMsIFBvbHlsaW5lU3R5bGV9IGZyb20gXCIuLi8uLi9jb21tb24vbWFwL21hcC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IFwiLi9NYWMuZnJlcXVlbmN5LnNlcnZpY2VcIjtcclxuXHJcbmNsYXNzIENhY2hlUmVzdWx0IGV4dGVuZHMgUGVyY2VpdmVJbmZvcyB7XHJcbiAgICByZXN1bHRJbmRleDogbnVtYmVyO1xyXG59XHJcblxyXG5jbGFzcyBXaW5Qb3B1cFR5cGUge1xyXG4gICAgc3RhdGljIFRyYWNrOiBzdHJpbmcgPSAnVHJhY2snO1xyXG4gICAgc3RhdGljIE1hcmtlcjogc3RyaW5nID0gJ01hcmtlcic7XHJcbiAgICBzdGF0aWMgRGV0YWlsOiBzdHJpbmcgPSAnRGV0YWlsJztcclxufVxyXG5cclxuZGVjbGFyZSBsZXQgcG9wdXBIdG1sOiBhbnksIGFuZ3VsYXI6IGFueSwgdHJhY2tQb3B1cEh0bWw6IGFueSwgJDogYW55LCBkZXRhaWxQb3B1cEh0bWw6IGFueSwgbWFjUG9wdXBIdG1sOiBhbnksXHJcbiAgICBkZXRhaWxNYWNQb3B1cEh0bWw6IGFueTtcclxuXHJcbmNsYXNzIE1hY0ZyZXF1ZW5jeUNvbnRyb2xsZXIge1xyXG4gICAgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2ZhY2VBY2NvbXBTZXJ2aWNlJywgJ2xheWVyJywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JywgJ2xheWVyRGVjJywgJ0lBbmFseXNpc01tYXBTZXJ2ZXInXTtcclxuXHJcbiAgICBtYXA6IE5QR2lzTWFwTWFpbjtcclxuICAgIHN5c3RlbVBvaW50TGlzdDogQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXM6IEZyZXF1ZW5jeUFuYWx5c2lzRW51bSA9IG5ldyBGcmVxdWVuY3lBbmFseXNpc0VudW0oKTsgLy8g5Yib5bu65Lu75Yqh5Y+C5pWwXHJcbiAgICBGcmVxdWVuY3lPZmZMaW5lOiBBcnJheTxJbnRlbGlnZW50VGFza0luZm8+OyAvLyDnprvnur/ku7vliqHliJfooahcclxuXHJcbiAgICBGYXN0RGF0ZUxpc3Q6IEFycmF5PEVudW08VGltZUxlbmd0aD4+ID0gZ2V0RmFzdERhdGFMaXN0KCk7XHJcbiAgICBGYXN0RGF0ZTogRW51bTxUaW1lTGVuZ3RoPiA9IEZhc3REYXRhLnRvZGF5O1xyXG5cclxuICAgIHNob3dSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dGb3JtOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHNob3dBbGxSZXN1bHQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dBbmFseXNpc0xpc3Q6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHJlc3VsdFRvU3lzdGVtUG9pbnRzOiBBcnJheTxTeXN0ZW1Qb2ludD4gPSBbXTtcclxuICAgIHJlc3VsdE1hcmtlcnM6IEFycmF5PE5QTWFwTGliLlN5bWJvbHMuTWFya2VyPjtcclxuICAgIG1hcFRyYWNrSUQ6IHN0cmluZztcclxuICAgIHdpbmRvd1dpZHRoOiBudW1iZXIgPSBnZXRXaWRvd1NpemUoKS53aWR0aCAtIDYwO1xyXG4gICAgcmVzdWx0TGVmdFR5cGU6IHN0cmluZyA9ICdNQUMnO1xyXG4gICAgcmVzdWx0UmlnaHRUeXBlOiBzdHJpbmcgPSAnTWFjJztcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG4gICAgaXNTb3J0TGV0dGVyOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyYWNrV2luSW5mbzogc3RyaW5nO1xyXG4gICAgdHJhY2tSZXN1bHRGb3JNYXA6IHsgW2tleTogc3RyaW5nXTogUmVzdWx0IHwgQ2FjaGVSZXN1bHQgfTtcclxuICAgIGFjY3BUcmFja1Jlc3VsdEZvck1hcDogeyBba2V5OiBzdHJpbmddOiBSZXN1bHQgfCBDYWNoZVJlc3VsdCB9O1xyXG4gICAgbWFya2VyV2luaW5mbzogc3RyaW5nO1xyXG4gICAgbWFwQWNjcFRyYWNrSUQ6IHN0cmluZztcclxuICAgIGFjY3BUcmFja1dpbkluZm86IHN0cmluZztcclxuICAgIHNvcnRMZXR0ZXI6IEFycmF5PHN0cmluZz4gPSBbJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJ107XHJcbiAgICBxdWVyeVBhdHRlcm46IEFycmF5PGFueT4gPSBRdWVyeVBhdHRlcm47IC8vIOafpeivouexu+Wei1xyXG5cclxuICAgIHJlc3VsdFBhcmFtczogUGFnZVBhcmFtc0FuZFJlc3VsdCA9IG5ldyBQYWdlUGFyYW1zQW5kUmVzdWx0KCk7XHJcbiAgICBhbGxUcmFja1Jlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIGFjY3BSZXN1bHRQYXJhbXM6IFBhZ2VQYXJhbXNBbmRSZXN1bHQgPSBuZXcgUGFnZVBhcmFtc0FuZFJlc3VsdCgpO1xyXG5cclxuICAgIGNoZWNrUmlnaHRSZXN1bHQ6IEFycmF5PGJvb2xlYW4+ID0gW2ZhbHNlXTtcclxuICAgIGFjY3BSZXN1bHRJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIGFsbEFjY3BUcmFja1Jlc3VsdDogQXJyYXk8UGVyY2VpdmVJbmZvcz47XHJcbiAgICBSZXN1bHRQYWdpbmF0aW9uOiBJUGFnaW5hdGlvbiA9IG5ldyBQYWdpbmF0aW9uKCk7XHJcbiAgICBBY2NwUGFnaW5hdGlvbjogSVBhZ2luYXRpb24gPSBuZXcgUGFnaW5hdGlvbigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgZmFjZUZyZXF1ZW5jeVNlcnZpY2U6IElGYWNlRnJlcXVlbmN5U2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IElMYXllckRlYyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYW5hbHlzaXNNbWFwU2VydmVyOiBJQW5hbHlzaXNNbWFwU2VydmVyLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkY29tcGlsZTogYW55LCkge1xyXG4gICAgICAgIC8vIOWIneWni+WMluWPguaVsFxyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG5cclxuICAgICAgICB0aGlzLm1hcCA9IHRoaXMuJHNjb3BlLiRwYXJlbnQubWFwO1xyXG4gICAgICAgIHRoaXMuc3lzdGVtUG9pbnRMaXN0ID0gdGhpcy4kc2NvcGUuJHBhcmVudC5zeXN0ZW1Qb2ludCB8fCBbXTtcclxuXHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdzaG93SXRlbVBhZ2UnLCB0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ21hcC5yZWFkeScsIChldmVudDogYW55LCBtYXA6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG1hcDtcclxuICAgICAgICAgICAgdGhpcy5pbml0Rm9yTWFwTGF5ZXIoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbigncG9pbnRzLnJlYWR5JywgKGV2ZW50OiBhbnksIHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc3lzdGVtUG9pbnRMaXN0ID0gcG9pbnRzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5yZW5kZXJNYXJrZXJzKHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJbpobXpnaLlj4LmlbBcclxuICAgIHByaXZhdGUgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8g5Yib5bu65Lu75Yqh5Y+C5pWwXHJcbiAgICAgICAgbGV0IHBhcmFtczpGcmVxdWVuY3lBbmFseXNpc0VudW0gPSBuZXcgRnJlcXVlbmN5QW5hbHlzaXNFbnVtKCk7XHJcbiAgICAgICAgcGFyYW1zLnN0YXJ0VGltZSA9IHRoaXMuRmFzdERhdGUudmFsdWUuc3RhcnRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy5lbmRUaW1lID0gdGhpcy5GYXN0RGF0ZS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgICAgIHBhcmFtcy50YXNrTmFtZSA9IFwiXCI7XHJcbiAgICAgICAgcGFyYW1zLnR5cGUgPSBcIk1BQ1wiO1xyXG4gICAgICAgIHBhcmFtcy52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcyA9IHBhcmFtcztcclxuXHJcbiAgICAgICAgc2VsZi5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGVzdG9yeUZvck1hcE1hcmtlcigpIHtcclxuICAgICAgICB0aGlzLm1hcC5yZW1vdmVPdmVybGF5c0J5TmFtZShPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXApO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclRyYWNrTGluZUxheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMaW5lR3JvdXApO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKE92ZXJsYXlOYW1lLk1hcEZvclRyYWNrTGluZUxheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JBY2NwTGluZUdyb3VwKTtcclxuICAgICAgICBpZiAodGhpcy5tYXBUcmFja0lEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwVHJhY2tJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1hcEFjY3BUcmFja0lEKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwQWNjcFRyYWNrSUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHJhY2tXaW5JbmZvID0gdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy50cmFja1dpbkluZm8pO1xyXG4gICAgICAgIGlmICh0cmFja1dpbkluZm8pIHtcclxuICAgICAgICAgICAgdHJhY2tXaW5JbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhY2NwVHJhY2tXaW5JbmZvID0gdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy5hY2NwVHJhY2tXaW5JbmZvKTtcclxuICAgICAgICBpZiAoYWNjcFRyYWNrV2luSW5mbykge1xyXG4gICAgICAgICAgICBhY2NwVHJhY2tXaW5JbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRGb3JNYXBMYXllcigpIHtcclxuICAgICAgICB0aGlzLm1hcC5yZW5kZXJPdmVybGF5TGF5ZXIoT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubWFwLnJlbmRlck92ZXJsYXlMYXllcihPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmFzdERhdGUoaXRlbTogRW51bTxUaW1lTGVuZ3RoPikge1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5lbmRUaW1lID0gaXRlbS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpIHtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsIGZhbHNlKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGdvQmFja0Zvcm0oKSB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzdG9yeUZvck1hcE1hcmtlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0U2VhcmNoKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIXNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMuc3RhcnRUaW1lIHx8ICFzZWxmLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLmVuZFRpbWUgfHwgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5lbmRUaW1lIDwgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5zdGFydFRpbWUgPSBzZWxmLkZhc3REYXRlLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICAgICAgc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5lbmRUaW1lID0gc2VsZi5GYXN0RGF0ZS52YWx1ZS5lbmRUaW1lXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLkZyZXF1ZW5jeUFuYWx5c2lzUGFyYW1zLnRhc2tOYW1lID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfor7fovpPlhaXku7vliqHlkI3np7AnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudmFsdWUgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ivt+i+k+WFpeafpeivouWGheWuuScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5zZWFyY2hNYWNGcmVxdWVuY3koc2VsZi5GcmVxdWVuY3lBbmFseXNpc1BhcmFtcykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNob3dBbmFseXNpc0xpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRBY2NvbXBPZmZMaW5lTGlzdCgpO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmnI3liqHlmajor7fmsYLlvILluLgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3lzdGVtUG9pbnRGb3JQYXJhbXMocG9pbnRzOiBBcnJheTxSZXN1bHQ+KTogQXJyYXk8U3lzdGVtUG9pbnQ+IHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIGxldCB0ZW1wQXJyID0gYW5ndWxhci5jb3B5KHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICBwb2ludHMuZm9yRWFjaCgoaXRlbTogUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBDYW1lcmFJRCA9IGl0ZW0uTWFjRGV2aWNlSWQ7XHJcbiAgICAgICAgICAgIGxldCBzID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0ZW1wQXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKENhbWVyYUlEID09PSB0ZW1wQXJyW2luZGV4XS5PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHRlbXBBcnJbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3RlbXBBcnIuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICAgICAgYXJyLnB1c2gobnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGl0ZW06IFJlc3VsdCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAqIE1hdGgucmFuZG9tKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWFya3NGb3JQYWdlKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMucmVzdWx0UGFyYW1zLmRhdGEpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0VG9TeXN0ZW1Qb2ludHMgPSBhcnI7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VBbGxSZXN1bHQoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNob3dBbGxSZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5hY2NwUmVzdWx0UGFyYW1zID0gdGhpcy5BY2NwUGFnaW5hdGlvbi5nZXRCeVBhZ2UodGhpcy5hY2NwUmVzdWx0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBnb0FsbFJlc3VsdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dGb3JtID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93UmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zaG93QWxsUmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMuQWNjcFBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMuYWNjcFJlc3VsdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FuYWx5c2lzUmVzdWx0KGl0ZW06IEludGVsaWdlbnRUYXNrSW5mbykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImFuYWx5c2VUYXNrVHlwZVwiOiBcIlNlYXJjaEFuYWx5c2VUYXNrUmVzdWx0XCIsXHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcIlRhc2tUeXBlXCI6IFwiU2VhcmNoUGVyY2VpdmVGcmVxdWVuY3lcIixcclxuICAgICAgICAgICAgXCJQZXJjZWl2ZVR5cGVcIjogaXRlbS5FeHQudHlwZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgc2VsZi5hbmFseXNpc1NlcnZpY2UuZ2V0T2ZmTGluZURldGFpbChwYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8UmVzdWx0VHJhY2s+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLkFjY3BQYWdpbmF0aW9uLnNldChyZXMuZGF0YS5QZXJjZWl2ZUZyZXF1ZW5jeUFycik7XHJcbiAgICAgICAgICAgICAgICB9KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFjY3BSZXN1bHRQYXJhbXMucGFnZVNpemUgPSA2O1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYWNjcFJlc3VsdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2NwUmVzdWx0UGFyYW1zID0gc2VsZi5BY2NwUGFnaW5hdGlvbi5nZXRCeVBhZ2Uoc2VsZi5hY2NwUmVzdWx0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmFsbFRyYWNrUmVzdWx0ID0gc2VsZi5BY2NwUGFnaW5hdGlvbi5nZXQoKTtcclxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Zvcm0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dSZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZVN5c3RlbVBvaW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbmRlckFjY3BNYXJrZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmnI3liqHlmajor7fmsYLlvILluLgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW5kZXJBY2NwTWFya2VycygpIHtcclxuICAgICAgICBsZXQgYWNjcEFyciA9IHRoaXMuYWNjcFJlc3VsdFBhcmFtcy5kYXRhW3RoaXMuYWNjcFJlc3VsdEluZGV4XS5QZXJjZWl2ZUluZm9zO1xyXG4gICAgICAgIGxldCBvYmogPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IENhY2hlUmVzdWx0IH07XHJcbiAgICAgICAgYWNjcEFyci5mb3JFYWNoKChpdGVtOiBDYWNoZVJlc3VsdCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5JRF0gPSBpdGVtO1xyXG4gICAgICAgICAgICBvYmpbaXRlbS5JRF0ucmVzdWx0SW5kZXggPSBpbmRleDtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcCA9IG9iajtcclxuICAgICAgICB0aGlzLmFsbEFjY3BUcmFja1Jlc3VsdCA9IGFjY3BBcnI7XHJcbiAgICAgICAgbGV0IGFyciA9IHRoaXMuY29udmVydExvbkxhdChhY2NwQXJyKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5yZW5kZXJNYWtlcnMoXHJcbiAgICAgICAgICAgIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLFxyXG4gICAgICAgICAgICBPdmVybGF5TmFtZS5NYXBGb3JBY2NwR3JvdXAsXHJcbiAgICAgICAgICAgIHRydWUsXHJcbiAgICAgICAgICAgIGFycixcclxuICAgICAgICAgICAgdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXAsXHJcbiAgICAgICAgICAgIGZhbHNlLCBudWxsLCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiuvuWkh+S/oeaBr+i9rOaNouWcsOWbvue7j+e6rOW6plxyXG4gICAgY29udmVydExvbkxhdChhY2NwQXJyOiBBcnJheTxQZXJjZWl2ZUluZm9zPik6IEFycmF5PFN5c3RlbVBvaW50PntcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8U3lzdGVtUG9pbnQ+O1xyXG4gICAgICAgIGxldCB0ZW1wQXJyID0gYW5ndWxhci5jb3B5KHRoaXMuc3lzdGVtUG9pbnRMaXN0KTtcclxuICAgICAgICBhY2NwQXJyLmZvckVhY2goKGl0ZW06IFBlcmNlaXZlSW5mb3MpID0+IHtcclxuICAgICAgICAgICAgbGV0IENhbWVyYUlEID0gaXRlbS5NYWNEZXZpY2VJZHx8aXRlbS5Nb2JpbGVEZXZpY2VJZDtcclxuICAgICAgICAgICAgbGV0IHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRlbXBBcnIubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcG9pbnQgPSB0ZW1wQXJyW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChDYW1lcmFJRCA9PT0gdGVtcEFycltpbmRleF0uT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExhdDogcG9pbnQuTGF0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMb246IHBvaW50LkxvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHBvaW50LklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3RJRDogcG9pbnQuT2JqZWN0SUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdElEOiBpdGVtLklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBEZXNjcnB0aW9uOiBwb2ludC5EZXNjcnB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXllclR5cGU6IHBvaW50LkxheWVyVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0VHlwZTogcG9pbnQuT2JqZWN0VHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVGFza1N0YXR1czogcG9pbnQuVGFza1N0YXR1cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0U3RhdGU6IHBvaW50Lk9iamVjdFN0YXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3ROYW1lOiBwb2ludC5PYmplY3ROYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfWFzIFN5c3RlbVBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXMpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGFycjtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuRGV0YWlsUG9wdXAoaXRlbTogUGVyY2VpdmVJbmZvcyB8IENhY2hlUmVzdWx0LCBpbmRleDogbnVtYmVyLCBncm91cE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogeyByZXN1bHQ6IFBlcmNlaXZlSW5mb3MsIGFsbFJlc3VsdDogQXJyYXk8UmVzdWx0PiwgaW5kZXg6IG51bWJlciwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcblxyXG4gICAgICAgIHNjb3BlLnJlc3VsdCA9IGl0ZW07XHJcbiAgICAgICAgc2NvcGUuaW5kZXggPSBpbmRleDtcclxuICAgICAgICBpZiAoZ3JvdXBOYW1lID09PSBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCkge1xyXG4gICAgICAgICAgICBzY29wZS5hbGxSZXN1bHQgPSB0aGlzLmFsbFRyYWNrUmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yZXN1bHRMZWZ0VHlwZSAhPT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRldGFpbE1hY1BvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ01hY+ivpuaDhScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNDk4cHhcIiwgXCIyMzBweFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2NvcGUuYWxsUmVzdWx0ID0gdGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdFJpZ2h0VHlwZSAhPT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGRldGFpbE1hY1BvcHVwSHRtbCxcclxuICAgICAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ01hY+ivpuaDhScsXHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYTogW1wiNDk4cHhcIiwgXCIyMzBweFwiXSxcclxuICAgICAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFJldWx0VHJhY2soKSB7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5hbGxUcmFja1Jlc3VsdCkgJiYgdGhpcy5hbGxUcmFja1Jlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTb3J0TGV0dGVyID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmNsZWFyVHJhY2VBbmFseXplKHRoaXMubWFwVHJhY2tJRCk7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmdldFN5c3RlbVBvaW50Rm9yUGFyYW1zKHRoaXMuYWxsVHJhY2tSZXN1bHQpO1xyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogVHJhY2tDb25maWcuVHJhY2tDb2xvclZpb2xldCxcclxuICAgICAgICAgICAgICAgIHdlaWdodDogVHJhY2tDb25maWcuVHJhY2tXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzcGVlZDogVHJhY2tDb25maWcuVHJhY2tTcGVlZCxcclxuICAgICAgICAgICAgICAgIG1vdmVVcmw6IFRyYWNrQ29uZmlnLlBlcnNvblRyYWNrQmx1ZUhhbmRsZSxcclxuICAgICAgICAgICAgICAgIGFmdGVyRHJhdzogKGV2dDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmFsbFRyYWNrUmVzdWx0W2V2dC5pbmRleF0gYXMgUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy50cmFja1dpbkluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvKSBpbmZvLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFja1dpbkluZm8gPSB0aGlzLmNyZWF0ZU1hcFBvcHVwKGV2dC5wb2ludCwgZGF0YSwgV2luUG9wdXBUeXBlLlRyYWNrLCAnTGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN0b3A6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy50cmFja1dpbkluZm8pLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2tXaW5JbmZvID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGFzIFRyYWNlQW5hbHl6ZU9wdHM7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE92ZXJsYXlzRm9yTGluZShPdmVybGF5TmFtZS5NYXBGb3JUcmFja0xpbmVMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGluZUdyb3VwLCBhcnIsIHtcclxuICAgICAgICAgICAgICAgIHdlaWdodDogVHJhY2tDb25maWcuVHJhY2tXZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogVHJhY2tDb25maWcuTGluZUNvbG9yRm9yVmlvbGV0XHJcbiAgICAgICAgICAgIH0gYXMgUG9seWxpbmVTdHlsZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyTWFrZXJzKE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdExheWVyLCBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCwgdHJ1ZSwgYXJyKTtcclxuICAgICAgICAgICAgdGhpcy5tYXBUcmFja0lEID0gdGhpcy5tYXAuY3JlYXRlVHJhY2VBbmFseXplKGFyciwgc3R5bGUpO1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5zdGFydFRyYWNlQW5hbHl6ZSh0aGlzLm1hcFRyYWNrSUQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOa4suafk+WcsOWbvueCueS9jVxyXG4gICAgcHJpdmF0ZSByZW5kZXJNYWtlcnMobGF5ZXJOYW1lOiBzdHJpbmcsIGdyb3VwTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaXNDbGVhcjogYm9vbGVhbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdDogQXJyYXk8U3lzdGVtUG9pbnQ+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgZmxhZz86IGJvb2xlYW4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBsYWJsZXM/OiBBcnJheTxhbnk+LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgaWNvbj86IHN0cmluZykge1xyXG4gICAgICAgIGlmIChpc0NsZWFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLnJlbW92ZU92ZXJsYXlzQnlOYW1lKGxheWVyTmFtZSwgZ3JvdXBOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXN1bHRUb1N5c3RlbVBvaW50cyA9IHJlc3VsdDtcclxuICAgICAgICB0aGlzLm1hcC5hZGRPdmVybGF5c0Zvck1ha2VycyhsYXllck5hbWUsIGdyb3VwTmFtZSwgcmVzdWx0LCB7XHJcbiAgICAgICAgICAgIGljb25VUkw6IGljb24gfHwgTWFya2Vyc0ljb24uTm9ybWFsQmx1ZUljb24sXHJcbiAgICAgICAgICAgIGNsaWNrOiAobWFya2VyOiBOUE1hcExpYi5TeW1ib2xzLk1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSBtYXJrZXIuZ2V0RGF0YSgpIGFzIGFueTtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQ6IENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwTmFtZSA9PT0gT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLmFjY3BUcmFja1Jlc3VsdEZvck1hcFtkYXRhLnJlc3VsdElEXSBhcyBDYWNoZVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkRldGFpbFBvcHVwKHJlc3VsdCwgcmVzdWx0LnJlc3VsdEluZGV4LCBncm91cE5hbWUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3VzZU92ZXI6IChtYXJrZXI6IE5QTWFwTGliLlN5bWJvbHMuTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IG1hcmtlci5nZXREYXRhKCkgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdDogQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ3JvdXBOYW1lID09PSBPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRHcm91cCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMudHJhY2tSZXN1bHRGb3JNYXBbZGF0YS5yZXN1bHRJRF0gYXMgQ2FjaGVSZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYWNjcFRyYWNrUmVzdWx0Rm9yTWFwW2RhdGEucmVzdWx0SURdIGFzIENhY2hlUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXJrZXJXaW5pbmZvID0gdGhpcy5jcmVhdGVNYXBQb3B1cChtYXJrZXIuZ2V0UG9zaXRpb24oKSwgcmVzdWx0LCBXaW5Qb3B1cFR5cGUuTWFya2VyKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtb3VzZU91dDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuZ2V0SW5mb1dpbmRvd0J5SUQodGhpcy5tYXJrZXJXaW5pbmZvKS5jbG9zZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgZmxhZywgbGFibGVzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Yib5bu65Zyw5Zu+5by55qGGXHJcbiAgICBjcmVhdGVNYXBQb3B1cChwb2ludDogTlBNYXBMaWIuR2VvbWV0cnkuUG9pbnQsIGRhdGE6IFJlc3VsdCwgdHlwZTogc3RyaW5nLCBsb2NhdGlvbj86IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IFdpblBvcHVwVHlwZS5UcmFjaykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVUcmFja1BvcHVwKHBvaW50LCBkYXRhLCBsb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSBXaW5Qb3B1cFR5cGUuTWFya2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZU1hcmtlclBvcHVwKHBvaW50LCBkYXRhKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVRyYWNrUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQsIGxvY2F0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZG9tOiBFbGVtZW50O1xyXG4gICAgICAgIGxldCBzaXplOiBOUE1hcExpYi5HZW9tZXRyeS5TaXplO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbiA9PT0gJ0xlZnQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdExlZnRUeXBlID09PSAnRmFjZScpIHtcclxuICAgICAgICAgICAgICAgIGRvbSA9ICQodHJhY2tQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0yNDgpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKG1hY1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IG5ldyBOUE1hcExpYi5HZW9tZXRyeS5TaXplKC04MiwgLTEyOClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxvY2F0aW9uID09PSAnUmlnaHQnKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdFJpZ2h0VHlwZSA9PT0gJ0ZhY2UnKSB7XHJcbiAgICAgICAgICAgICAgICBkb20gPSAkKHRyYWNrUG9wdXBIdG1sKS5nZXQoMCk7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZG9tID0gJChtYWNQb3B1cEh0bWwpLmdldCgwKTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBuZXcgTlBNYXBMaWIuR2VvbWV0cnkuU2l6ZSgtODIsIC0xMjgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgV2luSW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogc2l6ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgZG9tID0gdGhpcy4kY29tcGlsZShkb20ub3V0ZXJIVE1MKShzY29wZSk7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubWFwLm9wZW5JbmZvV2luZG93KFdpbkluZm8sIGRvbVswXSwge1xyXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwLmNsb3NlSW5mb1dpbmRvdyhXaW5JbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFdpbkluZm87XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTWFya2VyUG9wdXAocG9pbnQ6IE5QTWFwTGliLkdlb21ldHJ5LlBvaW50LCBkYXRhOiBSZXN1bHQpIHtcclxuICAgICAgICBsZXQgV2luaW5mbyA9IHRoaXMubWFwLmNyZWF0ZUluZm9XaW5kb3cocG9pbnQubG9uLCBwb2ludC5sYXQsIHtcclxuICAgICAgICAgICAgaXNjb21tb246IHRydWUsXHJcbiAgICAgICAgICAgIG9mZnNldDogbmV3IE5QTWFwTGliLkdlb21ldHJ5LlNpemUoLTgyLCAtMjQ4KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzY29wZTogeyB0cmFjZURhdGE6IFJlc3VsdCwgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUudHJhY2VEYXRhID0gZGF0YTtcclxuICAgICAgICBsZXQgZG9tID0gJCh0cmFja1BvcHVwSHRtbCkuZ2V0KDApO1xyXG4gICAgICAgIGRvbSA9IHRoaXMuJGNvbXBpbGUoZG9tLm91dGVySFRNTCkoc2NvcGUpO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1hcC5vcGVuSW5mb1dpbmRvdyhXaW5pbmZvLCBkb21bMF0sIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5jbG9zZUluZm9XaW5kb3coV2luaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBXaW5pbmZvXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g6YCJ5oup5p+l6K+i57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gc2VsXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFF1ZXJ5VHlwZShzZWw6IGFueSkge1xyXG4gICAgICAgIHRoaXMuRnJlcXVlbmN5QW5hbHlzaXNQYXJhbXMudHlwZSA9IHNlbC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDojrflj5bnprvnur/ku7vliqHliJfooahcclxuICAgIHByaXZhdGUgZ2V0QWNjb21wT2ZmTGluZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwiaWRcIjogc2VsZi51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIFwidGFza1R5cGVcIjogXCJTZWFyY2hQZXJjZWl2ZUZyZXF1ZW5jeVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5nZXRPZmZMaW5lTGlzdChwYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwICYmIEFycmF5LmlzQXJyYXkocmVzLmRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgTGlzdDpBcnJheTxJbnRlbGlnZW50VGFza0luZm8+ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGFbaV0uRXh0ID0gSlNPTi5wYXJzZShyZXMuZGF0YVtpXS5FeHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIExpc3QucHVzaChyZXMuZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLkZyZXF1ZW5jeU9mZkxpbmUgPSBMaXN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliKDpmaTnprvnur/ku7vliqFcclxuICAgICAqIEBwYXJhbSB7QWNjb21wT2ZmTGluZX0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlbGV0ZUFjY29tcE9mZkxpbmUoaXRlbTogSW50ZWxpZ2VudFRhc2tJbmZvKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIFwidGFza0lkXCI6IGl0ZW0uVGFza0lkLFxyXG4gICAgICAgICAgICBcInRhc2tUeXBlXCI6IGl0ZW0uVGFza1R5cGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHNlbGYuYW5hbHlzaXNTZXJ2aWNlLmRlbGV0ZU9mZkxpbmVEZXRhaWwocGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5Yig6Zmk5oiQ5YqfJyk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmdldEFjY29tcE9mZkxpbmVMaXN0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfliKDpmaTlpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy9UT0RPIOagueaNrue7k+aenOaYvuekuuWcsOWbvuWvueW6lOeahOeCueS9jVxyXG4gICAgcmVzdWx0VG9NYXAoaXRlbTogUGVyY2VpdmVJbmZvcywgaW5kZXg6IG51bWJlciwgdHlwZT86IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvckFjY3BHcm91cCwgaXRlbS5JRCwgTWFya2Vyc0ljb24uSG92ZXJSZWRJY29uLCA5OTkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0TWFwKCkuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0R3JvdXAsIGl0ZW0uSUQsIE1hcmtlcnNJY29uLkhvdmVyUmVkSWNvbiwgOTk5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL1RPRE8g5Y+W5raI57uT5p6c5pi+56S65Zyw5Zu+5a+55bqU55qE54K55L2NXHJcbiAgICB1blJlc3VsdFRvTWFwKGl0ZW06IFBlcmNlaXZlSW5mb3MsIGluZGV4OiBudW1iZXIsIHR5cGU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXBbaXRlbS5JRF07XHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZ2V0TWFwKCkuc2V0TWFya2VySWNvbihPdmVybGF5TmFtZS5NYXBGb3JSZXN1bHRMYXllciwgT3ZlcmxheU5hbWUuTWFwRm9yQWNjcEdyb3VwLCBpdGVtLklELCBNYXJrZXJzSWNvbi5Ob3JtYWxHcmVlbkljb24sIHJlcy5yZXN1bHRJbmRleCArIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmdldE1hcCgpLnNldE1hcmtlckljb24oT3ZlcmxheU5hbWUuTWFwRm9yUmVzdWx0TGF5ZXIsIE92ZXJsYXlOYW1lLk1hcEZvclJlc3VsdEdyb3VwLCBpdGVtLklELCBNYXJrZXJzSWNvbi5Ob3JtYWxCbHVlSWNvbiwgcmVzLnJlc3VsdEluZGV4ICsgMSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VBY2NwUmVzdWx0UGFnZShpOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmFjY3BSZXN1bHRQYXJhbXMuY3VycmVudFBhZ2UgPSBpO1xyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdFBhcmFtcyA9IHRoaXMuQWNjcFBhZ2luYXRpb24uZ2V0QnlQYWdlKHRoaXMuYWNjcFJlc3VsdFBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBY2NwVHJhY2soaTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrUmlnaHRSZXN1bHRbaV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZVJpZ2h0UmVzdWx0KGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5jb252ZXJ0TG9uTGF0KHRoaXMuYWxsQWNjcFRyYWNrUmVzdWx0W3RoaXMuYWNjcFJlc3VsdEluZGV4XS5QZXJjZWl2ZUluZm9zKTtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5zZXRBY2NwVHJhY2tBbmltYXRpb24odGhpcy5hbGxBY2NwVHJhY2tSZXN1bHQsIGFyciwgdGhpcy5hY2NwVHJhY2tSZXN1bHRGb3JNYXApO1xyXG4gICAgfVxyXG5cclxuICAgIHNsaWRlUmlnaHRSZXN1bHQoaTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRDaGVja1JpZ2h0UmVzdWx0KHRoaXMucmVzdWx0UGFyYW1zLnBhZ2VTaXplLCBpKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDaGVja1JpZ2h0UmVzdWx0KHNpemU6IG51bWJlciwgdHJhZ2V0OiBudW1iZXIsIGlzRmlyc3Q/OiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGJvb2xlYW4+O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0cmFnZXQpIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKCF0aGlzLmNoZWNrUmlnaHRSZXN1bHRbdHJhZ2V0XSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyci5wdXNoKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWNjcFJlc3VsdEluZGV4ID0gdHJhZ2V0O1xyXG4gICAgICAgIGlmIChpc0ZpcnN0KSB7XHJcbiAgICAgICAgICAgIGFyclt0cmFnZXRdID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNoZWNrUmlnaHRSZXN1bHQgPSBhcnI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBY2NwTWFya2VycygpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2hvd0FuYWx5c2lzTGlzdChzdGF0dXM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnNob3dBbmFseXNpc0xpc3QgPSBzdGF0dXM7XHJcbiAgICAgICAgaWYoc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QWNjb21wT2ZmTGluZUxpc3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdNYWNGcmVxdWVuY3lDb250cm9sbGVyJywgTWFjRnJlcXVlbmN5Q29udHJvbGxlcik7Il19
