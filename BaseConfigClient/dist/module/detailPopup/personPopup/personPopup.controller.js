define(["require", "exports", "text!../../fullPlayPopup/fullPlayPopup.html", "../../common/app/main.app", "../../../core/server/enum/SocketResultTypeEnum", "../../../core/enum/QueryParams", "../../../core/server/enum/AnalysisDataType", "../../../core/server/enum/ResourceType", "../../../core/enum/ObjectType", "css!../style/personPopup.css", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service", "../../common/factory/CheckIntelligentAnalysis.factory", "../../common/factory/systemInfo.cache.factory", "../../common/factory/layerMsg.factory", "../../common/factory/socket.factory", "../../fullPlayPopup/fullPlayPopup.controller"], function (require, exports, fullPlayPopupHtml, main_app_1, SocketResultTypeEnum_1, QueryParams_1, AnalysisDataType_1, ResourceType_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var personPopupController = (function () {
        function personPopupController($scope, $timeout, layer, resourceRetrievalService, analysisService, systemInfoCacheFactory, layerDec, socketFactory, checkIntelligentAnalysis) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.resourceRetrievalService = resourceRetrievalService;
            this.analysisService = analysisService;
            this.systemInfoCacheFactory = systemInfoCacheFactory;
            this.layerDec = layerDec;
            this.socketFactory = socketFactory;
            this.checkIntelligentAnalysis = checkIntelligentAnalysis;
            this.switchButton = true;
            this.persionLibraryList = [];
            this.showTitle = false;
            this.loopTotal = 3;
            this.loopIndex = 1;
            this.loopStatus = false;
            this.quickSearchAgainText = "";
            this.ambitusText = "All";
            this.showFooter = false;
            this.analysisGoTo = AnalysisDataType_1.AnalysisGoToType;
            var self = this;
            self.activeRank = $scope.rank + 1;
            self.totalRank = $scope.allList.length;
            self.accessRecords = $scope.allList[$scope.rank];
            self.accessRecordsList = $scope.allList;
            self.showFooter = $scope.showFooter || false;
            self.windowPopul = $scope.windowPopul;
            self.showTitle = $scope.showTitle;
            self.initParams();
            self.getPersionLibrary();
            self.getSearchDetailLog();
            self.$scope.$on('$destroy', function () {
                self.unbindSocket();
            });
            self.checkFaceTrack = self.checkIntelligentAnalysis.checkFaceTrack();
            self.checkAccompanyingAnalysis = self.checkIntelligentAnalysis.checkAccompanyingAnalysis();
            self.checkFrequencyAnalysis = self.checkIntelligentAnalysis.checkFrequencyAnalysis();
            self.checkAnalysis = self.checkIntelligentAnalysis.checkAnalysis();
        }
        personPopupController.prototype.initParams = function () {
            var self = this;
            self.ambitusInfo = QueryParams_1.AmbitusList();
        };
        personPopupController.prototype.initData = function (num) {
            this.accessRecords = this.accessRecordsList[num];
        };
        personPopupController.prototype.getPersionLibrary = function () {
            var self = this;
            self.unbindSocket();
            self.loopStatus = false;
            var params = new QueryParams_1.QueryPersionLibraryParams();
            var systemData = self.systemInfoCacheFactory.getSystemInfo();
            params = {
                imagePath: self.accessRecords.AccessLog.FacePath,
                arrLibId: ["000001"],
                threshold: systemData.IdentityValue,
                retrievalReason: "人员档案查看",
                taskId: self.accessRecords.AccessLog.ID,
                featureSearchExt: {
                    accessLogId: self.accessRecords.AccessLog.ID,
                    featureType: "AccessFeature",
                    imgUrl: self.accessRecords.AccessLog.FacePath,
                    libId: "000001"
                }
            };
            self.analysisService.faceAnalysis(params).then(function (res) {
                if (res.code === 200) {
                    self.bindSocketToResult();
                }
                else {
                    self.loopStatus = true;
                    self.layerDec.failInfo('人员档案查询失败！');
                }
            });
        };
        personPopupController.prototype.bindSocketToResult = function () {
            var self = this;
            self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SearchFace, function (res) {
                self.$timeout(function () {
                    self.loopStatus = true;
                });
                if (Array.isArray(res) && res[0].code === 200 && res[0].data && Array.isArray(res[0].data.Result)) {
                    var persionLibraryList = [];
                    for (var i = 0; i < 10 && i < res[0].data.Result.length; i++) {
                        persionLibraryList.push(res[0].data.Result[i]);
                    }
                    self.persionLibraryList = persionLibraryList;
                    self.loopTotal = persionLibraryList.length;
                    self.loopIndex = 1;
                    self.loopInfo = persionLibraryList[0];
                }
                else {
                    self.layerDec.warnInfo('未获取到结果！');
                }
                self.unbindSocket();
            });
        };
        personPopupController.prototype.unbindSocket = function () {
            this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SearchFace);
        };
        personPopupController.prototype.fullScreen = function (path) {
            var scope = this.$scope.$new();
            scope.index = "fullScreenPopup";
            scope.path = path;
            if (path) {
                var windowW = $(window).width() * 0.8;
                var windowH = $(window).height() * 0.8;
                var contentHTML = "<img ng-src=" + path + " style='width:" + windowW + "px;height:" + windowH + "px;'>";
                this.layer.open({
                    type: 1,
                    title: false,
                    closeBtn: 0,
                    skin: 'layui-layer-nobg no-scroll',
                    shadeClose: true,
                    shade: 0.6,
                    area: [windowW + 'px', windowH + 'px'],
                    content: contentHTML,
                    scope: scope,
                    end: function () {
                        scope.$destroy();
                    }
                });
            }
            else {
                this.layer.msg("图片地址不存在");
            }
        };
        personPopupController.prototype.fullPlay = function () {
            var self = this;
            var deviceInfo = {
                Name: "",
                ID: self.accessRecords.AccessLog.CameraID,
                position: {
                    Lat: "",
                    Lon: "",
                },
                data: {},
                time: self.accessRecords.AccessLog.LogTime,
                type: 2,
                ObjectType: "Camera",
                LayerType: "",
                ObjectID: self.accessRecords.AccessLog.CameraID
            };
            if (deviceInfo.ObjectID) {
                this.resourceRetrievalService.getDeviceById(deviceInfo.ObjectID, deviceInfo.ObjectType)
                    .then(function (res) {
                    if ((res.code === 200) && res.data) {
                        if (deviceInfo.ObjectType === "Camera") {
                            deviceInfo.Name = res.data.Name;
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
                        self.showFullPlay(deviceInfo);
                    }
                    else {
                        self.layerDec.warnInfo("没查询到摄像机信息");
                    }
                });
            }
            else {
                self.layerDec.warnInfo('没查询到摄像机信息！');
            }
        };
        personPopupController.prototype.showFullPlay = function (deviceInfo) {
            var self = this;
            var scope = self.$scope.$new();
            scope.layerId = "fullPlayPopup";
            scope.PointDeTail = deviceInfo;
            self.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['查看视频', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['680px', '433px'],
                content: fullPlayPopupHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        personPopupController.prototype.popupUp = function () {
            var self = this;
            this.initData(self.activeRank - 2);
            self.activeRank = self.activeRank - 1;
        };
        personPopupController.prototype.popupDown = function () {
            var self = this;
            this.initData(self.activeRank);
            self.activeRank = self.activeRank + 1;
        };
        personPopupController.prototype.closeLayer = function () {
            this.$scope.closePopup();
        };
        personPopupController.prototype.clickCollect = function () {
            this.$scope.collectFunction(this.accessRecords);
        };
        personPopupController.prototype.clickAnalysis = function (item, type) {
            this.$scope.analysisFunction(item, type);
        };
        personPopupController.prototype.clickSurveillance = function () {
            this.$scope.surveillanceFunction(this.accessRecords);
        };
        personPopupController.prototype.findSystemPointById = function (id) {
            this.resourceRetrievalService.findSystemPointById(id).then(function (res) {
            });
        };
        personPopupController.prototype.selectAmbitusInfo = function (item) {
            var self = this;
            self.ambitusInfo.forEach(function (value, index, array) {
                if (value.id === item.id) {
                    value.status = true;
                    self.ambitusText = value.key;
                }
                else {
                    value.status = false;
                }
            });
        };
        ;
        personPopupController.prototype.quickSearchAgain = function () {
            var self = this;
            var params = {
                "keyword": self.quickSearchAgainText,
                "objectType": self.ambitusText,
                "deviceArrId": []
            };
            var arrObjectID = [];
            if (self.accessRecords.deviceInfo && self.accessRecords.deviceInfo.JsonUserData) {
                var point = {
                    lat: self.accessRecords.deviceInfo.JsonUserData.Point.Lat,
                    lon: self.accessRecords.deviceInfo.JsonUserData.Point.Lon
                };
                self.$scope.$emit('map-peripheral-information', point, function (res) {
                    res.forEach(function (value, index) {
                        if (self.ambitusText === "All") {
                            arrObjectID.push(value.ObjectID);
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[2].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Vehicle.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[1].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[5].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.Wifi.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                        else if (self.ambitusText === ResourceType_1.ResourceTypeEnum[7].value) {
                            if (value.ObjectType === ObjectType_1.ObjectType.ElectronicFence.value) {
                                arrObjectID.push(value.ObjectID);
                            }
                        }
                    });
                    params.deviceArrId = arrObjectID;
                    self.$scope.$emit('quickSearchAgain', params);
                    self.$scope.closePopup();
                });
            }
            else {
                self.$scope.$emit('quickSearchAgain', params);
                self.$scope.closePopup();
            }
        };
        personPopupController.prototype.goto = function (num) {
            this.loopIndex = this.loopIndex + num;
        };
        personPopupController.prototype.loopSelect = function (num) {
            this.loopInfo = this.persionLibraryList[num];
            this.loopIndex = num + 1;
        };
        personPopupController.prototype.getSearchDetailLog = function () {
            var self = this;
            var params = {
                "arrID": [],
                "logType": "AccessLog"
            };
            params.arrID.push(self.accessRecords.AccessLog.ID);
            self.resourceRetrievalService.searchLogById(params).then(function (res) {
                if ((res.code === 200) && res.data && res.data.length) {
                    self.$timeout(function () {
                        self.accessRecords.AccessLog = res.data[0];
                    });
                }
                else {
                    self.layerDec.warnInfo('查询检索记录详情失败！');
                }
            });
        };
        personPopupController.$inject = ["$scope", "$timeout", "layer", "resourceRetrievalService", "analysisService", 'systemInfoCacheFactory', 'layerDec', 'socketFactory', 'checkIntelligentAnalysis'];
        return personPopupController;
    }());
    main_app_1.app.controller("personPopupController", personPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvcGVyc29uUG9wdXAvcGVyc29uUG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQ0E7UUE4QkksK0JBQW9CLE1BQVcsRUFDWCxRQUFhLEVBQ2IsS0FBVSxFQUNWLHdCQUFtRCxFQUNuRCxlQUFpQyxFQUNqQyxzQkFBZ0QsRUFDaEQsUUFBbUIsRUFDbkIsYUFBNkIsRUFDN0Isd0JBQW1EO1lBUm5ELFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsb0JBQWUsR0FBZixlQUFlLENBQWtCO1lBQ2pDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBMEI7WUFDaEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDN0IsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQW5DdkUsaUJBQVksR0FBWSxJQUFJLENBQUM7WUFPN0IsdUJBQWtCLEdBQXlCLEVBQUUsQ0FBQztZQUc5QyxjQUFTLEdBQVksS0FBSyxDQUFDO1lBRTNCLGNBQVMsR0FBVyxDQUFDLENBQUM7WUFDdEIsY0FBUyxHQUFXLENBQUMsQ0FBQztZQUV0QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBRTVCLHlCQUFvQixHQUFXLEVBQUUsQ0FBQztZQUNsQyxnQkFBVyxHQUFXLEtBQUssQ0FBQztZQUU1QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLGlCQUFZLEdBQUcsbUNBQWdCLENBQUM7WUFlNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZ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LElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBd0I7Z0JBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDVixJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUN6QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBbFdNLDZCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFvV3ZMLDRCQUFDO0tBcldELEFBcVdDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLHFCQUFxQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2RldGFpbFBvcHVwL3BlcnNvblBvcHVwL3BlcnNvblBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL2Z1bGxQbGF5UG9wdXAvZnVsbFBsYXlQb3B1cC5odG1sXCIgbmFtZT1cImZ1bGxQbGF5UG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL3BlcnNvblBvcHVwLmNzcyc7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SVJlc291cmNlUmV0cmlldmFsU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7U3lzdGVtQ29uZmlnUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtQ29uZmlnUGFyYW1zXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmZhY3RvcnknO1xyXG5pbXBvcnQge0lDaGVja0ludGVsbGlnZW50QW5hbHlzaXN9IGZyb20gJy4uLy4uL2NvbW1vbi9mYWN0b3J5L0NoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5mYWN0b3J5JztcclxuLy8g6I635Y+W57O757uf6YWN572u5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lTeXN0ZW1JbmZvQ2FjaGVQcm92aWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3N5c3RlbUluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG4vLyBsYXllck1zZ+W8ueahhlxyXG5pbXBvcnQge0lMYXllckRlY30gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG4vLyBzb2NrZXTmnI3liqFcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5XCI7XHJcbmltcG9ydCB7U29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcblxyXG4vLyDlvLnmoYZcclxuaW1wb3J0IFwiLi4vLi4vZnVsbFBsYXlQb3B1cC9mdWxsUGxheVBvcHVwLmNvbnRyb2xsZXJcIlxyXG5cclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7ZmFjZSwgcGVyc2lvbkxpZW5jZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9RdWVyeVJlY29yZFwiO1xyXG5pbXBvcnQge211bHRpcGxlQ2hvaWNlLCBBbWJpdHVzTGlzdCwgUXVlcnlQZXJzaW9uTGlicmFyeVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9RdWVyeVBhcmFtc1wiO1xyXG5pbXBvcnQgeyBBbmFseXNpc0dvVG9UeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQW5hbHlzaXNEYXRhVHlwZVwiO1xyXG5pbXBvcnQge1Jlc291cmNlVHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1Jlc291cmNlVHlwZVwiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuXHJcbmRlY2xhcmUgbGV0IGZ1bGxQbGF5UG9wdXBIdG1sOiBhbnksICQ6IGFueTtcclxuXHJcbmNsYXNzIHBlcnNvblBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCIsIFwibGF5ZXJcIiwgXCJyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2VcIiwgXCJhbmFseXNpc1NlcnZpY2VcIiwgJ3N5c3RlbUluZm9DYWNoZUZhY3RvcnknLCAnbGF5ZXJEZWMnLCAnc29ja2V0RmFjdG9yeScsICdjaGVja0ludGVsbGlnZW50QW5hbHlzaXMnXTtcclxuXHJcbiAgICBzd2l0Y2hCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGFjdGl2ZVJhbms6IG51bWJlcjtcclxuICAgIHRvdGFsUmFuazogbnVtYmVyO1xyXG4gICAgYWNjZXNzUmVjb3JkczogZmFjZTtcclxuICAgIGFjY2Vzc1JlY29yZHNMaXN0OiBBcnJheTxmYWNlPjtcclxuXHJcbiAgICBwZXJzaW9uTGlicmFyeUxpc3Q6IEFycmF5PHBlcnNpb25MaWVuY2U+ID0gW107XHJcblxyXG4gICAgd2luZG93UG9wdWw6IHN0cmluZztcclxuICAgIHNob3dUaXRsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGxvb3BUb3RhbDogbnVtYmVyID0gMztcclxuICAgIGxvb3BJbmRleDogbnVtYmVyID0gMTtcclxuICAgIGxvb3BJbmZvOiBhbnk7XHJcbiAgICBsb29wU3RhdHVzOiBib29sZWFuID0gZmFsc2U7IC8vIOS6uuWRmOaho+ahiOafpeivoueKtuaAgSBmYWxzOuafpeivouS4rSB0cnVlOiDmn6Xor6Lnu5PmnZ9cclxuXHJcbiAgICBxdWlja1NlYXJjaEFnYWluVGV4dDogc3RyaW5nID0gXCJcIjtcclxuICAgIGFtYml0dXNUZXh0OiBzdHJpbmcgPSBcIkFsbFwiO1xyXG4gICAgYW1iaXR1c0luZm86IEFycmF5PG11bHRpcGxlQ2hvaWNlPjtcclxuICAgIHNob3dGb290ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGFuYWx5c2lzR29UbyA9IEFuYWx5c2lzR29Ub1R5cGU7XHJcbiAgICBjaGVja0ZhY2VUcmFjazogYm9vbGVhbjtcclxuICAgIGNoZWNrQWNjb21wYW55aW5nQW5hbHlzaXM6IGJvb2xlYW47XHJcbiAgICBjaGVja0ZyZXF1ZW5jeUFuYWx5c2lzOiBib29sZWFuO1xyXG4gICAgY2hlY2tBbmFseXNpczogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3lzdGVtSW5mb0NhY2hlRmFjdG9yeTogSVN5c3RlbUluZm9DYWNoZVByb3ZpZGVyLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBzb2NrZXRGYWN0b3J5OiBJU29ja2V0RmFjdG9yeSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzOiBJQ2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuYWN0aXZlUmFuayA9ICRzY29wZS5yYW5rICsgMTtcclxuICAgICAgICBzZWxmLnRvdGFsUmFuayA9ICRzY29wZS5hbGxMaXN0Lmxlbmd0aDtcclxuICAgICAgICBzZWxmLmFjY2Vzc1JlY29yZHMgPSAkc2NvcGUuYWxsTGlzdFskc2NvcGUucmFua107XHJcbiAgICAgICAgc2VsZi5hY2Nlc3NSZWNvcmRzTGlzdCA9ICRzY29wZS5hbGxMaXN0O1xyXG5cclxuICAgICAgICBzZWxmLnNob3dGb290ZXIgPSAkc2NvcGUuc2hvd0Zvb3RlciB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgc2VsZi53aW5kb3dQb3B1bCA9ICRzY29wZS53aW5kb3dQb3B1bDtcclxuICAgICAgICBzZWxmLnNob3dUaXRsZSA9ICRzY29wZS5zaG93VGl0bGU7XHJcbiAgICAgICAgc2VsZi5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgc2VsZi5nZXRQZXJzaW9uTGlicmFyeSgpO1xyXG4gICAgICAgIHNlbGYuZ2V0U2VhcmNoRGV0YWlsTG9nKCk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi51bmJpbmRTb2NrZXQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2VsZi5jaGVja0ZhY2VUcmFjayA9IHNlbGYuY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmNoZWNrRmFjZVRyYWNrKCk7XHJcbiAgICAgICAgc2VsZi5jaGVja0FjY29tcGFueWluZ0FuYWx5c2lzID0gc2VsZi5jaGVja0ludGVsbGlnZW50QW5hbHlzaXMuY2hlY2tBY2NvbXBhbnlpbmdBbmFseXNpcygpO1xyXG4gICAgICAgIHNlbGYuY2hlY2tGcmVxdWVuY3lBbmFseXNpcyA9IHNlbGYuY2hlY2tJbnRlbGxpZ2VudEFuYWx5c2lzLmNoZWNrRnJlcXVlbmN5QW5hbHlzaXMoKTtcclxuICAgICAgICBzZWxmLmNoZWNrQW5hbHlzaXMgPSBzZWxmLmNoZWNrSW50ZWxsaWdlbnRBbmFseXNpcy5jaGVja0FuYWx5c2lzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFBhcmFtcygpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi5hbWJpdHVzSW5mbyA9IEFtYml0dXNMaXN0KCk7Ly8g5ZGo6L65XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Yid5aeL5YyW5p+l6K+i5pWw5o2uXHJcbiAgICBwcml2YXRlIGluaXREYXRhKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5hY2Nlc3NSZWNvcmRzID0gdGhpcy5hY2Nlc3NSZWNvcmRzTGlzdFtudW1dO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UGVyc2lvbkxpYnJhcnkoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYudW5iaW5kU29ja2V0KCk7XHJcbiAgICAgICAgc2VsZi5sb29wU3RhdHVzID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBRdWVyeVBlcnNpb25MaWJyYXJ5UGFyYW1zKCk7XHJcbiAgICAgICAgLy8g5Yid5aeL5YyW57O757uf6YWN572uXHJcbiAgICAgICAgbGV0IHN5c3RlbURhdGE6IFN5c3RlbUNvbmZpZ1BhcmFtcyA9IHNlbGYuc3lzdGVtSW5mb0NhY2hlRmFjdG9yeS5nZXRTeXN0ZW1JbmZvKCk7XHJcbiAgICAgICAgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGg6IHNlbGYuYWNjZXNzUmVjb3Jkcy5BY2Nlc3NMb2cuRmFjZVBhdGgsIC8vIOS4iuS8oOWbvueJh+ivhuWIq+S6uuiEuFxyXG4gICAgICAgICAgICBhcnJMaWJJZDogW1wiMDAwMDAxXCJdLC8vIOmAieS4reS6uuWDj+W6k1xyXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IHN5c3RlbURhdGEuSWRlbnRpdHlWYWx1ZSwgLy8g55u45Ly85bqmXHJcbiAgICAgICAgICAgIHJldHJpZXZhbFJlYXNvbjogXCLkurrlkZjmoaPmoYjmn6XnnItcIiwgLy8g5qOA57Si5LqL55SxXHJcbiAgICAgICAgICAgIHRhc2tJZDogc2VsZi5hY2Nlc3NSZWNvcmRzLkFjY2Vzc0xvZy5JRCxcclxuICAgICAgICAgICAgZmVhdHVyZVNlYXJjaEV4dDoge1xyXG4gICAgICAgICAgICAgICAgYWNjZXNzTG9nSWQ6IHNlbGYuYWNjZXNzUmVjb3Jkcy5BY2Nlc3NMb2cuSUQsXHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlVHlwZTogXCJBY2Nlc3NGZWF0dXJlXCIsXHJcbiAgICAgICAgICAgICAgICBpbWdVcmw6IHNlbGYuYWNjZXNzUmVjb3Jkcy5BY2Nlc3NMb2cuRmFjZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBsaWJJZDogXCIwMDAwMDFcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZWxmLmFuYWx5c2lzU2VydmljZS5mYWNlQW5hbHlzaXMocGFyYW1zKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYmluZFNvY2tldFRvUmVzdWx0KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9vcFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLmZhaWxJbmZvKCfkurrlkZjmoaPmoYjmn6Xor6LlpLHotKXvvIEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU29ja2V0VG9SZXN1bHQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uU2VhcmNoRmFjZSwgKHJlczogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubG9vcFN0YXR1cyA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpICYmIHJlc1swXS5jb2RlID09PSAyMDAgJiYgcmVzWzBdLmRhdGEgJiYgQXJyYXkuaXNBcnJheShyZXNbMF0uZGF0YS5SZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGVyc2lvbkxpYnJhcnlMaXN0OiBBcnJheTxwZXJzaW9uTGllbmNlPiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMCAmJiBpIDwgcmVzWzBdLmRhdGEuUmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc2lvbkxpYnJhcnlMaXN0LnB1c2gocmVzWzBdLmRhdGEuUmVzdWx0W2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYucGVyc2lvbkxpYnJhcnlMaXN0ID0gcGVyc2lvbkxpYnJhcnlMaXN0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb29wVG90YWwgPSBwZXJzaW9uTGlicmFyeUxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb29wSW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sb29wSW5mbyA9IHBlcnNpb25MaWJyYXJ5TGlzdFswXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+acquiOt+WPluWIsOe7k+aenO+8gScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudW5iaW5kU29ja2V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdW5iaW5kU29ja2V0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS51blN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5TZWFyY2hGYWNlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmn6XnnIvlhajlm75cclxuICAgIHB1YmxpYyBmdWxsU2NyZWVuKHBhdGg6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogeyBsYXllcjogYW55OyBpbmRleDogc3RyaW5nLCBwYXRoOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmluZGV4ID0gXCJmdWxsU2NyZWVuUG9wdXBcIjtcclxuICAgICAgICBzY29wZS5wYXRoID0gcGF0aDtcclxuXHJcbiAgICAgICAgaWYgKHBhdGgpIHtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd1c6IGFueSA9ICQod2luZG93KS53aWR0aCgpICogMC44O1xyXG4gICAgICAgICAgICBsZXQgd2luZG93SDogYW55ID0gJCh3aW5kb3cpLmhlaWdodCgpICogMC44O1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbnRlbnRIVE1MID0gYDxpbWcgbmctc3JjPSR7cGF0aH0gc3R5bGU9J3dpZHRoOiR7d2luZG93V31weDtoZWlnaHQ6JHt3aW5kb3dIfXB4Oyc+YDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdG46IDAsXHJcbiAgICAgICAgICAgICAgICBza2luOiAnbGF5dWktbGF5ZXItbm9iZyBuby1zY3JvbGwnLFxyXG4gICAgICAgICAgICAgICAgc2hhZGVDbG9zZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNoYWRlOiAwLjYsXHJcbiAgICAgICAgICAgICAgICBhcmVhOiBbd2luZG93VyArICdweCcsIHdpbmRvd0ggKyAncHgnXSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnRIVE1MLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLlm77niYflnLDlnYDkuI3lrZjlnKhcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5p+l55yL6KeG6aKRXHJcbiAgICBwdWJsaWMgZnVsbFBsYXkoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkZXZpY2VJbmZvOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIE5hbWU6IFwiXCIsXHJcbiAgICAgICAgICAgIElEOiBzZWxmLmFjY2Vzc1JlY29yZHMuQWNjZXNzTG9nLkNhbWVyYUlELFxyXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgTGF0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgTG9uOiBcIlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aW1lOiBzZWxmLmFjY2Vzc1JlY29yZHMuQWNjZXNzTG9nLkxvZ1RpbWUsXHJcbiAgICAgICAgICAgIHR5cGU6IDIsXHJcbiAgICAgICAgICAgIE9iamVjdFR5cGU6IFwiQ2FtZXJhXCIsXHJcbiAgICAgICAgICAgIExheWVyVHlwZTogXCJcIixcclxuICAgICAgICAgICAgT2JqZWN0SUQ6IHNlbGYuYWNjZXNzUmVjb3Jkcy5BY2Nlc3NMb2cuQ2FtZXJhSURcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChkZXZpY2VJbmZvLk9iamVjdElEKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmdldERldmljZUJ5SWQoZGV2aWNlSW5mby5PYmplY3RJRCwgZGV2aWNlSW5mby5PYmplY3RUeXBlKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGV2aWNlSW5mby5PYmplY3RUeXBlID09PSBcIkNhbWVyYVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXZpY2VJbmZvLk5hbWUgPSByZXMuZGF0YS5OYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mby5zdGF0dXMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldmljZUluZm8uZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ29kZTogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLkNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIElwQWRkcmVzczogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLklwQWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9ydDogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLlBvcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFB3ZDogcmVzLmRhdGEuSnNvblVzZXJEYXRhLlZpZGVvU2VydmVyLlB3ZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVWlkOiByZXMuZGF0YS5Kc29uVXNlckRhdGEuVmlkZW9TZXJ2ZXIuVWlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBWaWRlb1NlcnZlclR5cGU6IHJlcy5kYXRhLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlci5WaWRlb1NlcnZlclR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFByb3h5U2VydmVySUQ6IHJlcy5kYXRhLkpzb25Vc2VyRGF0YS5WaWRlb1NlcnZlci5Qcm94eVNlcnZlcklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQbGF5TmFtZTogcmVzLmRhdGEuUGxheU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBZQ29kZTogcmVzLmRhdGEuUFlDb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV2aWNlSW5mby5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNob3dGdWxsUGxheShkZXZpY2VJbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKFwi5rKh5p+l6K+i5Yiw5pGE5YOP5py65L+h5oGvXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYubGF5ZXJEZWMud2FybkluZm8oJ+ayoeafpeivouWIsOaRhOWDj+acuuS/oeaBr++8gScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dGdWxsUGxheShkZXZpY2VJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnk7IGxheWVySWQ6IHN0cmluZywgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBQb2ludERlVGFpbDogYW55IH0gPSBzZWxmLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUubGF5ZXJJZCA9IFwiZnVsbFBsYXlQb3B1cFwiO1xyXG4gICAgICAgIHNjb3BlLlBvaW50RGVUYWlsID0gZGV2aWNlSW5mbztcclxuICAgICAgICBzZWxmLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBza2luOiAnbm8tc2Nyb2xsJyxcclxuICAgICAgICAgICAgdGl0bGU6IFsn5p+l55yL6KeG6aKRJywgJ2ZvbnQtd2VpZ2h0OiBib2xkO2JhY2tncm91bmQtY29sb3I6ICNGNkY4RkI7Y29sb3I6ICM2MDYwNjA7aGVpZ2h0OiA0MHB4OyddLFxyXG4gICAgICAgICAgICBhcmVhOiBbJzY4MHB4JywgJzQzM3B4J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bGxQbGF5UG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4iuS4gOadoeaVsOaNrlxyXG4gICAgcHVibGljIHBvcHVwVXAoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoc2VsZi5hY3RpdmVSYW5rIC0gMik7XHJcbiAgICAgICAgc2VsZi5hY3RpdmVSYW5rID0gc2VsZi5hY3RpdmVSYW5rIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIvkuIDmnaHmlbDmja5cclxuICAgIHB1YmxpYyBwb3B1cERvd24oKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaW5pdERhdGEoc2VsZi5hY3RpdmVSYW5rKTtcclxuICAgICAgICBzZWxmLmFjdGl2ZVJhbmsgPSBzZWxmLmFjdGl2ZVJhbmsgKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWFs+mXreW8ueahhlxyXG4gICAgY2xvc2VMYXllcigpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5jbG9zZVBvcHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDb2xsZWN0KCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLmNvbGxlY3RGdW5jdGlvbih0aGlzLmFjY2Vzc1JlY29yZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrQW5hbHlzaXMoaXRlbTogZmFjZSwgdHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuYW5hbHlzaXNGdW5jdGlvbihpdGVtLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGlja1N1cnZlaWxsYW5jZSgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS5zdXJ2ZWlsbGFuY2VGdW5jdGlvbih0aGlzLmFjY2Vzc1JlY29yZHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W6K6+5aSH5Z2Q5qCHXHJcbiAgICBwdWJsaWMgZmluZFN5c3RlbVBvaW50QnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuZmluZFN5c3RlbVBvaW50QnlJZChpZCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDpgInmi6nlkajovrnmlbDmja5cclxuICAgICAqIEBwYXJhbSB7UXVlcnlJdGVtfSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWxlY3RBbWJpdHVzSW5mbyhpdGVtOiBtdWx0aXBsZUNob2ljZSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5hbWJpdHVzSW5mby5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaW5kZXgsIGFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5pZCA9PT0gaXRlbS5pZCkge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuc3RhdHVzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW1iaXR1c1RleHQgPSB2YWx1ZS5rZXk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDkuozmrKHmo4DntKJcclxuICAgIHB1YmxpYyBxdWlja1NlYXJjaEFnYWluKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zOiBhbnkgPSB7XHJcbiAgICAgICAgICAgIFwia2V5d29yZFwiOiBzZWxmLnF1aWNrU2VhcmNoQWdhaW5UZXh0LFxyXG4gICAgICAgICAgICBcIm9iamVjdFR5cGVcIjogc2VsZi5hbWJpdHVzVGV4dCxcclxuICAgICAgICAgICAgXCJkZXZpY2VBcnJJZFwiOiBbXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGFyck9iamVjdElEOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgaWYgKHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvICYmIHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YSkge1xyXG4gICAgICAgICAgICBsZXQgcG9pbnQgPSB7XHJcbiAgICAgICAgICAgICAgICBsYXQ6IHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YS5Qb2ludC5MYXQsXHJcbiAgICAgICAgICAgICAgICBsb246IHNlbGYuYWNjZXNzUmVjb3Jkcy5kZXZpY2VJbmZvLkpzb25Vc2VyRGF0YS5Qb2ludC5Mb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ21hcC1wZXJpcGhlcmFsLWluZm9ybWF0aW9uJywgcG9pbnQsZnVuY3Rpb24ocmVzOmFueSkge1xyXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmFtYml0dXNUZXh0ID09PSBcIkFsbFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bMl0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuVmVoaWNsZS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyT2JqZWN0SUQucHVzaCh2YWx1ZS5PYmplY3RJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNlbGYuYW1iaXR1c1RleHQgPT09IFJlc291cmNlVHlwZUVudW1bMV0udmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVs1XS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnJPYmplY3RJRC5wdXNoKHZhbHVlLk9iamVjdElEKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2VsZi5hbWJpdHVzVGV4dCA9PT0gUmVzb3VyY2VUeXBlRW51bVs3XS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyck9iamVjdElELnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuZGV2aWNlQXJySWQgPSBhcnJPYmplY3RJRDtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLiRlbWl0KCdxdWlja1NlYXJjaEFnYWluJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuJHNjb3BlLmNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3F1aWNrU2VhcmNoQWdhaW4nLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICBzZWxmLiRzY29wZS5jbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdvdG8obnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmxvb3BJbmRleCA9IHRoaXMubG9vcEluZGV4ICsgbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGxvb3BTZWxlY3QobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmxvb3BJbmZvID0gdGhpcy5wZXJzaW9uTGlicmFyeUxpc3RbbnVtXTtcclxuICAgICAgICB0aGlzLmxvb3BJbmRleCA9IG51bSArIDE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2VhcmNoRGV0YWlsTG9nKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBcImFycklEXCI6IFtdLFxyXG4gICAgICAgICAgICBcImxvZ1R5cGVcIjogXCJBY2Nlc3NMb2dcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyYW1zLmFycklELnB1c2goc2VsZi5hY2Nlc3NSZWNvcmRzLkFjY2Vzc0xvZy5JRCk7XHJcbiAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2Uuc2VhcmNoTG9nQnlJZChwYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmIHJlcy5kYXRhICYmIHJlcy5kYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5hY2Nlc3NSZWNvcmRzLkFjY2Vzc0xvZyA9IHJlcy5kYXRhWzBdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxheWVyRGVjLndhcm5JbmZvKCfmn6Xor6Lmo4DntKLorrDlvZXor6bmg4XlpLHotKXvvIEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwicGVyc29uUG9wdXBDb250cm9sbGVyXCIsIHBlcnNvblBvcHVwQ29udHJvbGxlcik7Il19
