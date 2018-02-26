define(["require", "exports", "text!./tplHistoryPolice.html", "text!./tplHistoryFace.html", "text!./tpldetail.html", "text!./tplHistoryAll.html", "../../common/app/main.app", "./TestEnum", "../../common/directive/ocx/video.ocx.directive", "../../../core/server/enum/SocketResultTypeEnum", "../../common/factory/attribute.factory", "css!./style/cameraMapPoint.css", "../../common/factory/socket.factory", "../../common/services/deviceSocket.service", "../../common/services/task.service", "./tplHistoryAll", "../../common/services/camera.service", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service"], function (require, exports, populPolice, populFace, poppupdetail, popupAll, main_app_1, TestEnum_1, video_ocx_directive_1, SocketResultTypeEnum_1, attribute_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var CameraMapPointController = (function () {
        function CameraMapPointController($scope, $timeout, mylayer, socketFactory, deviceSocketServer, layer, userInfoCacheFactory, taskService, cameraService, resourceRetrievalService, analysisService, layerDec) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.socketFactory = socketFactory;
            this.deviceSocketServer = deviceSocketServer;
            this.layer = layer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.taskService = taskService;
            this.cameraService = cameraService;
            this.resourceRetrievalService = resourceRetrievalService;
            this.analysisService = analysisService;
            this.layerDec = layerDec;
            this.topCarList = [];
            this.SubcribeAccessList = [];
            this.SubcribeAlarmList = [];
            this.historyIsShowAlarm = false;
            this.showFaceInformation = false;
            this.layerClassName = 'mylayerMin';
            this.layerSizeClassName = 'layer-max';
            this.layerSizeIsMax = false;
            this.taskIds = [];
            this.isPlaying = false;
            this.ocxInitOnce = false;
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.iframe = '';
            this.searchParams = {};
            this.SubcribeAccessListTotal = 0;
            this.SubcribeAlarmListTotal = 0;
            this.isSearchAlarmParams = true;
            this.PersonAlarmParams = {};
            $scope.$on('closeiframe', function () {
                _this.iframe = '';
                _this.$scope.$apply();
            });
            $scope.$on('$destroy', function () {
                _this.videoOcx = null;
                _this.unSubscribe();
            });
            this.cameraName = this.$scope.PointDeTail.Name;
            this.cameraInfo = this.$scope.PointDeTail;
            this.getTaskIds(this.cameraInfo.ID).then(function (results) {
                if (!results) {
                    return false;
                }
                results.forEach(function (val) {
                    _this.taskIds.push(val.ID);
                });
                var taskInfo, taskAlarm;
                taskInfo = {
                    userID: _this.userInfoCacheFactory.getCurrentUserId(),
                    objectID: _this.taskIds,
                    isCancel: false,
                    socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeFaceLog,
                };
                taskAlarm = {
                    userID: _this.userInfoCacheFactory.getCurrentUserId(),
                    objectID: _this.taskIds,
                    isCancel: false,
                    socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog,
                    alarmType: SocketResultTypeEnum_1.AlarmType.Face
                };
                _this.subscribeAlarmInfo(taskAlarm);
                _this.subscribeAccessInfo(taskInfo);
            });
            var time = this.attributeFactory.getCrossTrainTime(0);
            this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.searchParams.endTime = time.endTime;
            this.searchParams.arrCameraId = [this.cameraInfo.ID];
            this.searchParams.currentPage = 1;
            this.searchParams.pageSize = 10;
            this.getServerMessage(this.searchParams);
            this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.PersonAlarmParams.endTime = time.endTime;
            this.PersonAlarmParams.arrCameraId = [this.cameraInfo.ID];
            this.PersonAlarmParams.pageSize = 5;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'Camera';
            this.getServerAlarmMessage(this.PersonAlarmParams);
        }
        CameraMapPointController.prototype.getServerMessage = function (searchParams) {
            var _this = this;
            var self = this;
            self.resourceRetrievalService.advancedSearchByFace(searchParams)
                .then(function (res) {
                if ((res.code === 200) && (typeof res.data !== 'undefined') && (res.data.Face.TotalCount > 0)) {
                    self.SubcribeAccessListTotal = res.data.Face.TotalCount;
                    var arr = [], data = res.data.Face.Result;
                    for (var i = 0; i < data.length; i++) {
                        data[i].AccessLog.Gender = data[i].Gender == 1 ? "Men" : data[i].Gender;
                        data[i].AccessLog.SaveTime = data[i].AccessLog.LogTime;
                        arr.push(data[i].AccessLog);
                    }
                    self.SubcribeAccessList = arr;
                }
                else {
                    _this.layerDec.warnInfo("没有检索到数据！");
                }
            });
        };
        CameraMapPointController.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.SubcribeAlarmListTotal = res.data.TotalCount;
                    var arr = [], data = res.data.Result;
                    for (var i = 0; i < data.length; i++) {
                        var data1 = data[i].AlarmLogInfoArr;
                        for (var n = 0; n < data1.length; n++) {
                            data1[n].AlarmLogInfo = data1[n];
                        }
                        arr.push(data[i]);
                        console.log(data[i]);
                    }
                    self.SubcribeAlarmList = arr;
                }
            });
        };
        CameraMapPointController.prototype.subscribeAlarmInfo = function (taskAlarm) {
            var _this = this;
            var self = this;
            this.deviceSocketServer.getCameraInfo(taskAlarm).then(function (res) {
                if (!!res) {
                    self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog, function (data) {
                        if (!!data) {
                            for (var i = 0; i < data.length; i++) {
                                if (self.cameraInfo.ID != data[i].AlarmLog.ObjectID) {
                                    console.log(self.cameraInfo.ID, data[i].AlarmLog.ObjectID);
                                    return;
                                }
                                (function (data) {
                                    self.$timeout(function () {
                                        console.log('ready', data);
                                        self.SubcribeAlarmList = [].concat([data], self.SubcribeAlarmList);
                                        self.SubcribeAccessListTotal++;
                                    });
                                })(data[i]);
                            }
                        }
                    });
                }
                else {
                    _this.layer.msg('订阅摄像机报警信息失败');
                }
            });
        };
        CameraMapPointController.prototype.subscribeAccessInfo = function (taskInfo) {
            var _this = this;
            var self = this;
            this.deviceSocketServer.getCameraInfo(taskInfo).then(function (res) {
                if (!!res) {
                    _this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeFaceLog, function (data) {
                        if (!!data) {
                            for (var i = 0; i < data.length; i++) {
                                if (self.cameraInfo.ID != data[i].CameraID) {
                                    console.log(self.cameraInfo.ID, data[i].AlarmLog.ObjectID);
                                    return;
                                }
                                (function (data) {
                                    self.$timeout(function () {
                                        console.log('ready', data);
                                        self.SubcribeAccessList = [].concat([data], self.SubcribeAccessList);
                                    });
                                })(data[i]);
                            }
                        }
                    });
                }
                else {
                    _this.layer.msg('订阅摄像机抓拍信息失败');
                }
            });
        };
        CameraMapPointController.prototype.unSubscribe = function () {
            var _this = this;
            var _self = this;
            if (this.taskIds.length > 0) {
                Promise.all([
                    _self.deviceSocketServer.getCameraInfo({
                        userID: _self.userInfoCacheFactory.getCurrentUserId(),
                        objectID: _self.taskIds,
                        isCancel: true,
                        socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog,
                        alarmType: SocketResultTypeEnum_1.AlarmType.Face
                    }),
                    _self.deviceSocketServer.getCameraInfo({
                        userID: _self.userInfoCacheFactory.getCurrentUserId(),
                        objectID: _self.taskIds,
                        isCancel: true,
                        socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeFaceLog
                    }),
                ]).then(function (res) {
                    _this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog);
                    _this.socketFactory.unSubscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeFaceLog);
                    console.log('退订成功', res);
                });
            }
        };
        CameraMapPointController.prototype.getTaskIds = function (deviceId) {
            var _this = this;
            return this.taskService.getTaskByDeviceID(deviceId, 'FaceMonitor').then(function (res) {
                if (!!res && !!res.data) {
                    res = res.data;
                    return Promise.resolve(res.data);
                }
                else {
                    _this.layer.msg('设备查询布控任务失败');
                }
            });
        };
        CameraMapPointController.prototype.initCarList = function () {
            var timeArr = [3000, 6000, 9000, 11000, 16000, 17500, 22500, 24500, 31500, 33500];
            var that = this;
            that.topCarList.unshift(TestEnum_1.MockCarList()[5]);
            that.topCarList.unshift(TestEnum_1.MockCarList()[6]);
            that.topCarList.unshift(TestEnum_1.MockCarList()[7]);
            that.topCarList.unshift(TestEnum_1.MockCarList()[8]);
            that.topCarList.unshift(TestEnum_1.MockCarList()[9]);
            timeArr.forEach(function (item, index) {
                (function (item, index) {
                    window.setTimeout(function () {
                        that.topCarList.unshift(TestEnum_1.MockCarList()[index]);
                        that.$scope.$apply();
                    }, 1 * timeArr[index]);
                })(item, index);
            });
        };
        CameraMapPointController.prototype.showAlarm = function () {
            this.iframe = 'iframe';
            var scope = this.$scope.$new();
            this.mylayer.open({
                content: poppupdetail,
                scope: scope,
                ID: 'populDetail',
                AreaAndPosition: { left: 200, top: 200, width: 853, height: 502 },
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CameraMapPointController.prototype.showMoreFace = function (flag) {
            this.iframe = 'iframe';
            var scope = this.$scope.$new();
            scope.showStatus = flag;
            scope.SubcribeAccessList = this.SubcribeAccessList;
            scope.SubcribeAlarmList = this.SubcribeAlarmList;
            scope.ID = this.cameraInfo.ID;
            scope.cameraInfo = this.cameraInfo;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['人脸抓拍', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['853px', '635px'],
                content: popupAll,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CameraMapPointController.prototype.resizeLayer = function () {
            if (this.layerSizeIsMax) {
                this.layerSizeClassName = 'layer-max';
                this.showMin();
            }
            else {
                this.layerSizeClassName = 'layer-min';
                this.showMax();
            }
            this.layerSizeIsMax = !this.layerSizeIsMax;
        };
        CameraMapPointController.prototype.showMin = function () {
            var self = this;
            this.showFaceInformation = false;
            this.layerClassName = 'mylayerMin';
            this.mylayer.resize({
                left: (self.$scope.position.x - (540 / 2)),
                top: (self.$scope.position.y - 300),
                width: 540,
                height: 330
            }, self.$scope.layerId);
        };
        CameraMapPointController.prototype.showMax = function () {
            var self = this;
            this.showFaceInformation = true;
            this.layerClassName = 'mylayerMax';
            this.mylayer.resize({
                left: (self.$scope.position.x - (814 / 2)),
                top: (self.$scope.position.y - 480),
                width: 814,
                height: 508
            }, self.$scope.layerId);
        };
        CameraMapPointController.prototype.showFace = function () {
        };
        CameraMapPointController.prototype.initComplete = function (ocxControlFunc) {
            var _this = this;
            this.videoOcx = ocxControlFunc;
            window.setTimeout(function () {
                _this.playRealTime();
            }, 0);
        };
        CameraMapPointController.prototype.playRealTime = function () {
            if (this.videoOcx) {
                var opts = new video_ocx_directive_1.VideoOcxRealTimeOpt();
                if (!this.cameraInfo.status) {
                    return;
                }
                if (this.cameraInfo.data.IpAddress && this.cameraInfo.data.Port && this.cameraInfo.data.Uid) {
                    opts.ip = this.cameraInfo.data.IpAddress;
                    opts.port = this.cameraInfo.data.Port;
                    opts.path = this.cameraInfo.data.PlayName;
                    opts.user = this.cameraInfo.data.Uid;
                    opts.passwd = this.cameraInfo.data.Pwd;
                    console.log(opts);
                    this.videoOcx.playRealTime(opts, this.videoOcx.getFocusWindowIndex());
                }
                else {
                    this.layer.msg("该设备没有信息");
                }
            }
        };
        CameraMapPointController.prototype.stop = function () {
            if (this.videoOcx) {
                this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
            }
        };
        CameraMapPointController.prototype.closeMyLayer = function () {
            this.stop();
        };
        CameraMapPointController.prototype.clickCollect = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            var self = this, data = item;
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(data),
                    objectID: data.CameraID,
                    objectType: "Face"
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: data.CameraID
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        CameraMapPointController.prototype.clickAnalysis = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
        };
        CameraMapPointController.prototype.clickSurveillance = function (event, item) {
            if (event) {
                event.stopPropagation();
            }
            item.surveillanceStatus = !item.surveillanceStatus;
        };
        CameraMapPointController.$inject = ['$scope', '$timeout', 'mylayer', 'socketFactory', 'deviceSocketServer', 'layer', 'userInfoCacheFactory', 'taskService', "cameraService", 'resourceRetrievalService', 'analysisService', 'layerDec'];
        return CameraMapPointController;
    }());
    main_app_1.app.controller('cameraMapPointController', CameraMapPointController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUEwRUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDO1FBMkNJLGtDQUFvQixNQUFXLEVBQ1gsUUFBYSxFQUNiLE9BQVksRUFDWixhQUE2QixFQUM3QixrQkFBaUMsRUFDakMsS0FBVSxFQUNWLG9CQUF5QixFQUN6QixXQUF5QixFQUN6QixhQUE2QixFQUM3Qix3QkFBbUQsRUFDbkQsZUFBaUMsRUFDakMsUUFBYTtZQVhqQyxpQkFzRUM7WUF0RW1CLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUNaLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWU7WUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBSztZQUN6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFDN0IsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQUNuRCxvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakMsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQW5EakMsZUFBVSxHQUFlLEVBQWdCLENBQUM7WUFHMUMsdUJBQWtCLEdBQWUsRUFBRSxDQUFDO1lBQ3BDLHNCQUFpQixHQUFlLEVBQUUsQ0FBQztZQUVuQyx1QkFBa0IsR0FBWSxLQUFLLENBQUM7WUFDcEMsd0JBQW1CLEdBQVksS0FBSyxDQUFDO1lBRXJDLG1CQUFjLEdBQVcsWUFBWSxDQUFDO1lBQ3RDLHVCQUFrQixHQUFXLFdBQVcsQ0FBQztZQUN6QyxtQkFBYyxHQUFZLEtBQUssQ0FBQztZQUdoQyxZQUFPLEdBQWtCLEVB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LEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFzYzFOLCtCQUFDO0tBdmNELEFBdWNDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L2NhbWVyYU1hcFBvaW50L2NhbWVyYU1hcFBvaW50LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vdHBsSGlzdG9yeVBvbGljZS5odG1sXCIgbmFtZT1cInBvcHVsUG9saWNlXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RwbEhpc3RvcnlGYWNlLmh0bWxcIiBuYW1lPVwicG9wdWxGYWNlXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RwbGRldGFpbC5odG1sXCIgbmFtZT1cInBvcHB1cGRldGFpbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxIaXN0b3J5QWxsLmh0bWxcIiBuYW1lPVwicG9wdXBBbGxcIiAvPlxyXG5cclxuaW1wb3J0ICdjc3MhLi9zdHlsZS9jYW1lcmFNYXBQb2ludC5jc3MnXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9kZXZpY2VTb2NrZXQuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZSc7XHJcbmltcG9ydCAnLi90cGxIaXN0b3J5QWxsJztcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7Q2FwdHVyZSwgTW9ja0NhcHR1cmVMaXN0LCBBbGFybSwgTW9ja0FsYXJtTGlzdCwgQ2FyLCBNb2NrQ2FyTGlzdCwgTW9ja0FsYXJtTGlzdDF9IGZyb20gXCIuL1Rlc3RFbnVtXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtwZXJzb25BbGFybX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL0FsYXJtTW9kdWxlXCI7XHJcblxyXG4vLyAg6KeG6aKR5pKt5pS+XHJcbmltcG9ydCB7VmlkZW9PY3hBdHRyfSBmcm9tICcuLi8uLi9jb21tb24vZGlyZWN0aXZlL29jeC92aWRlby5vY3gubW9kZWwnO1xyXG5pbXBvcnQge0lWaWRlb09jeENvbnRyb2xGdW5jLCBWaWRlb09jeFJlYWxUaW1lT3B0fSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZVwiO1xyXG5cclxuLy9zb2NrZXRcclxuaW1wb3J0IHtJU29ja2V0RmFjdG9yeX0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnknO1xyXG5pbXBvcnQge1NvY2tldFJlc3VsdFR5cGVFbnVtLCBBbGFybVR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vU29ja2V0UmVzdWx0VHlwZUVudW0nXHJcbmltcG9ydCB7SWRldmljZVNvY2tldH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlJztcclxuLy8g5by55qGGXHJcbi8vIGltcG9ydCAnLi9hbGFybS5kZXRhaWwucG91cCc7XHJcbi8vIGltcG9ydCAnLi90cGxIaXN0b3J5UG9saWNlJztcclxuLy8gaW1wb3J0ICcuL3RwbC5oaXN0b3J5RmFjZSc7XHJcblxyXG5pbXBvcnQge0FjY2Vzc0xvZ30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL0FjY2Vzc0xvZ1wiO1xyXG5cclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lUYXNrU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZSc7XHJcbmltcG9ydCB7SUNhbWVyYVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY2FtZXJhLnNlcnZpY2VcIjtcclxuLy8g6K+35rGC5Zyw5Z2AXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlJztcclxuaW1wb3J0IHtJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2UnO1xyXG4vLyDlhazlhbHmlrnms5Ug5pe26Ze05qC85byP5YyWXHJcbmltcG9ydCB7QXR0cmlidXRlRmFjdG9yeX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2F0dHJpYnV0ZS5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQge0FsYXJtUmVzdWx0SW5mbywgUGVyc29uQWxhcm1QYXJhbXMsIFBlcnNvbkFsYXJtUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uQWxhcm1FbnVtXCI7XHJcbi8vIOmrmOe6p+ajgOe0ouWPguaVsFxyXG5pbXBvcnQge1xyXG4gICAgRmFjZVNlYXJjaFBhcmFtcyxcclxuICAgIG11bHRpcGxlQ2hvaWNlLFxyXG4gICAgU2V4TGlzdCxcclxuICAgIENyb3NzVHJhaW5UaW1lTGlzdCxcclxuICAgIFBhdHRlcm5MaXN0LFxyXG4gICAgRXF1aXBtZW50TGlzdCxcclxuICAgIEFnZUxpc3QsXHJcbiAgICBDbG90aGVzTGlzdCxcclxuICAgIEhhaXJMaXN0LFxyXG4gICAgU2hvZUxpc3QsXHJcbiAgICBHbGFzc2VzTGlzdCxcclxuICAgIE1hc2tMaXN0LFxyXG4gICAgQ2FwTGlzdFxyXG59IGZyb20gJy4uLy4uL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9hZHZhbmNlZFNlYXJjaC9hZFZhbmNlU2VhcmNoRW51bSc7XHJcblxyXG4vLyBcclxuaW1wb3J0IHtcclxuICAgIGZhY2UsXHJcbiAgICBmYWNlSXRlbSxcclxuICAgIGluaXRGYWNlUmVzdWx0LFxyXG4gICAgUXVlcnlJdGVtLFxyXG4gICAgQ29sbGVjdEFkZFBhcmFtcyxcclxuICAgIENvbGxlY3REZWxldGVQYXJhbXNcclxufSBmcm9tICcuLi8uLi9yZXNvdXJjZVJldHJpZXZhbC9yZXNvdXJjZVJldHJpZXZhbEVudW0nO1xyXG5cclxuZGVjbGFyZSBsZXQgcG9wdWxQb2xpY2U6IGFueSwgcG9wdWxGYWNlOiBhbnksIHBvcHB1cGRldGFpbDogYW55LCBwb3B1cEFsbDogYW55LCByZXF1aXJlOiBhbnk7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxubGV0IFByb21pc2UgPSByZXF1aXJlKFwiZXM2LXByb21pc2VcIik7XHJcblxyXG5jbGFzcyBDYW1lcmFNYXBQb2ludENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdteWxheWVyJywgJ3NvY2tldEZhY3RvcnknLCAnZGV2aWNlU29ja2V0U2VydmVyJywgJ2xheWVyJywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JywgJ3Rhc2tTZXJ2aWNlJywgXCJjYW1lcmFTZXJ2aWNlXCIsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnLCAnYW5hbHlzaXNTZXJ2aWNlJywgJ2xheWVyRGVjJ107XHJcblxyXG4gICAgdG9wQ2FyTGlzdDogQXJyYXk8Q2FyPiA9IFtdIGFzIEFycmF5PENhcj47XHJcblxyXG4gICAgLy8gdHJ1ZVxyXG4gICAgU3ViY3JpYmVBY2Nlc3NMaXN0OiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBTdWJjcmliZUFsYXJtTGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgIGhpc3RvcnlJc1Nob3dBbGFybTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgc2hvd0ZhY2VJbmZvcm1hdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmlkZW9PY3g6IElWaWRlb09jeENvbnRyb2xGdW5jO1xyXG4gICAgbGF5ZXJDbGFzc05hbWU6IHN0cmluZyA9ICdteWxheWVyTWluJztcclxuICAgIGxheWVyU2l6ZUNsYXNzTmFtZTogc3RyaW5nID0gJ2xheWVyLW1heCc7XHJcbiAgICBsYXllclNpemVJc01heDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY2FtZXJhSW5mbzogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxuICAgIGNhbWVyYU5hbWU6IHN0cmluZztcclxuICAgIHRhc2tJZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIC8vT0NY5Yid5aeL5YyWXHJcbiAgICAvLyBpbml0Q29tcGxldGU6KG9jeENvbnRyb2xGdW5jOiBJVmlkZW9PY3hDb250cm9sRnVuYykgPT4gdm9pZDtcclxuICAgIC8v5pKt5pS+5oiQ5YqfXHJcbiAgICBpc1BsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5b2T5YmN5pKt5pS+6KeG6aKR55qE5pGE5YOP5py655qE5L+h5oGvXHJcbiAgICBjdXJyZW50Rm9jdXNDYW1lcmFJdnNUYXNrSUQ6IHN0cmluZztcclxuICAgIC8v5b2T5YmN6K6i6ZiF55qEc29ja2V055qEaWRcclxuICAgIGN1cnJlbnRDYW1lcmFTb2NrZXQ6IHN0cmluZztcclxuICAgIC8vT0NYIGluaXQgIOiuqU9DWCDpppbmrKHov5vlhaXliJfooajmqKHlvI/liJ3lp4vljJbkuIDmrKFcclxuICAgIG9jeEluaXRPbmNlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyDlhaznlKjmlrnms5VcclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG5cclxuICAgIGlmcmFtZTogc3RyaW5nID0gJyc7XHJcbiAgICAvLyDml7bpl7RcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgLy/mipPmi43lj4LmlbBcclxuICAgIHNlYXJjaFBhcmFtczogRmFjZVNlYXJjaFBhcmFtcyA9IHt9IGFzIEZhY2VTZWFyY2hQYXJhbXMvLyDmn6Xor6Llj4LmlbBcclxuICAgIC8vIOajgOe0ouaVsOaNruadoeaVsFxyXG4gICAgU3ViY3JpYmVBY2Nlc3NMaXN0VG90YWw6IG51bWJlciA9IDA7XHJcbiAgICBTdWJjcmliZUFsYXJtTGlzdFRvdGFsOiBudW1iZXIgPSAwO1xyXG4gICAgaXNTZWFyY2hBbGFybVBhcmFtczogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBQZXJzb25BbGFybVBhcmFtczogUGVyc29uQWxhcm1QYXJhbXMgPSB7fSBhcyBQZXJzb25BbGFybVBhcmFtcztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBteWxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNvY2tldEZhY3Rvcnk6IElTb2NrZXRGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBkZXZpY2VTb2NrZXRTZXJ2ZXI6IElkZXZpY2VTb2NrZXQsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRhc2tTZXJ2aWNlOiBJVGFza1NlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhbWVyYVNlcnZpY2U6IElDYW1lcmFTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTogSUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6IGFueSkge1xyXG4gICAgICAgICRzY29wZS4kb24oJ2Nsb3NlaWZyYW1lJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZSA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3ggPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnVuU3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2FtZXJhTmFtZSA9IHRoaXMuJHNjb3BlLlBvaW50RGVUYWlsLk5hbWU7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFJbmZvID0gdGhpcy4kc2NvcGUuUG9pbnREZVRhaWw7XHJcbiAgICAgICAgLy8gbGV0IG1hcmtlcjphbnkgPSB0aGlzLiRzY29wZS5tYXJrZXI7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VGFza0lkcyh0aGlzLmNhbWVyYUluZm8uSUQpLnRoZW4oKHJlc3VsdHM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlc3VsdHMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tJZHMucHVzaCh2YWwuSUQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbGV0IHRhc2tJbmZvOiBhbnksIHRhc2tBbGFybTogYW55O1xyXG4gICAgICAgICAgICB0YXNrSW5mbyA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJRDogdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogdGhpcy50YXNrSWRzLFxyXG4gICAgICAgICAgICAgICAgaXNDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc29ja2V0VHlwZTogU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlRmFjZUxvZyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRhc2tBbGFybSA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJJRDogdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogdGhpcy50YXNrSWRzLFxyXG4gICAgICAgICAgICAgICAgaXNDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc29ja2V0VHlwZTogU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxhcm1Mb2csXHJcbiAgICAgICAgICAgICAgICBhbGFybVR5cGU6IEFsYXJtVHlwZS5GYWNlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlQWxhcm1JbmZvKHRhc2tBbGFybSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlQWNjZXNzSW5mbyh0YXNrSW5mbyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gdGhpcy5zaG93Q2FtZXJhU3RhdHVzKHRoaXMuc2hvd1N0YXR1cyk7XHJcbiAgICAgICAgLy/liJ3lp4vljJbmipPmi40g5p+l6K+i5pWw5o2uXHJcbiAgICAgICAgLy/orr7nva7ml7bpl7Tmj5Lku7bpu5jorqTml7bpl7QgXHJcbiAgICAgICAgbGV0IHRpbWUgPSB0aGlzLmF0dHJpYnV0ZUZhY3RvcnkuZ2V0Q3Jvc3NUcmFpblRpbWUoMCk7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuc3RhcnRUaW1lID0gdGltZS5lbmRUaW1lLnNwbGl0KFwiIFwiKVswXSArIFwiIDAwOjAwOjAwXCI7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5hcnJDYW1lcmFJZCA9IFt0aGlzLmNhbWVyYUluZm8uSURdO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyTWVzc2FnZSh0aGlzLnNlYXJjaFBhcmFtcyk7XHJcblxyXG4gICAgICAgIC8vIOaKpeitpuivt+axguWPguaVsFxyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gdGltZS5lbmRUaW1lLnNwbGl0KFwiIFwiKVswXSArIFwiIDAwOjAwOjAwXCI7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuYXJyQ2FtZXJhSWQgPSBbdGhpcy5jYW1lcmFJbmZvLklEXTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnBhZ2VTaXplID0gNTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFsYXJtVHlwZSA9ICdDYW1lcmEnO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6I635Y+W5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge0ZhY2VTZWFyY2hQYXJhbXN9IHNlYXJjaFBhcmFtc1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNlcnZlck1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBGYWNlU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHNlbGYucmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlLmFkdmFuY2VkU2VhcmNoQnlGYWNlKHNlYXJjaFBhcmFtcylcclxuICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHJlcy5jb2RlID09PSAyMDApICYmICh0eXBlb2YgcmVzLmRhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuRmFjZS5Ub3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLlN1YmNyaWJlQWNjZXNzTGlzdFRvdGFsID0gcmVzLmRhdGEuRmFjZS5Ub3RhbENvdW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBbXSwgZGF0YTogYW55ID0gcmVzLmRhdGEuRmFjZS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uQWNjZXNzTG9nLkdlbmRlciA9IGRhdGFbaV0uR2VuZGVyID09IDEgPyBcIk1lblwiIDogZGF0YVtpXS5HZW5kZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaV0uQWNjZXNzTG9nLlNhdmVUaW1lID0gZGF0YVtpXS5BY2Nlc3NMb2cuTG9nVGltZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChkYXRhW2ldLkFjY2Vzc0xvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuU3ViY3JpYmVBY2Nlc3NMaXN0ID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKFwi5rKh5pyJ5qOA57Si5Yiw5pWw5o2u77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOivt+axgueUteWbtOWOhuWPsuaKpeitpuaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtQZXJzb25BbGFybVBhcmFtc30gUGVyc29uQWxhcm1QYXJhbXMg6K+35rGC5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRTZXJ2ZXJBbGFybU1lc3NhZ2Uoc2VhcmNoUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcykge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmFuYWx5c2lzU2VydmljZS5zZWFyY2hQZXJzb25BbGFybSh0aGlzLlBlcnNvbkFsYXJtUGFyYW1zKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFsYXJtTGlzdFRvdGFsID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBbXSwgZGF0YTogYW55ID0gcmVzLmRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGExID0gZGF0YVtpXS5BbGFybUxvZ0luZm9BcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBkYXRhMS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhMVtuXS5BbGFybUxvZ0luZm8gPSBkYXRhMVtuXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLlN1YmNyaWJlQWxhcm1MaXN0ID0gYXJyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqLpmIXmiqXorabkv6Hmga9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlQWxhcm1JbmZvKHRhc2tBbGFybTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlU29ja2V0U2VydmVyLmdldENhbWVyYUluZm8odGFza0FsYXJtKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsYXJtTG9nLCAoZGF0YTogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jYW1lcmFJbmZvLklEICE9IGRhdGFbaV0uQWxhcm1Mb2cuT2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmNhbWVyYUluZm8uSUQsIGRhdGFbaV0uQWxhcm1Mb2cuT2JqZWN0SUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlYWR5JywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU3ViY3JpYmVBbGFybUxpc3QgPSBbXS5jb25jYXQoW2RhdGFdLCBzZWxmLlN1YmNyaWJlQWxhcm1MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFjY2Vzc0xpc3RUb3RhbCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KShkYXRhW2ldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn6K6i6ZiF5pGE5YOP5py65oql6K2m5L+h5oGv5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoumYheaKk+aLjeS/oeaBr1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVBY2Nlc3NJbmZvKHRhc2tJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VTb2NrZXRTZXJ2ZXIuZ2V0Q2FtZXJhSW5mbyh0YXNrSW5mbykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghIXJlcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVGYWNlTG9nLCAoZGF0YTogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIWRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5jYW1lcmFJbmZvLklEICE9IGRhdGFbaV0uQ2FtZXJhSUQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzZWxmLmNhbWVyYUluZm8uSUQsIGRhdGFbaV0uQWxhcm1Mb2cuT2JqZWN0SUQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlYWR5JywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuU3ViY3JpYmVBY2Nlc3NMaXN0ID0gW10uY29uY2F0KFtkYXRhXSwgc2VsZi5TdWJjcmliZUFjY2Vzc0xpc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKGRhdGFbaV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKCforqLpmIXmkYTlg4/mnLrmipPmi43kv6Hmga/lpLHotKUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVuU3Vic2NyaWJlKCkge1xyXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXMgYXMgQ2FtZXJhTWFwUG9pbnRDb250cm9sbGVyO1xyXG4gICAgICAgIGlmKHRoaXMudGFza0lkcy5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgIF9zZWxmLmRldmljZVNvY2tldFNlcnZlci5nZXRDYW1lcmFJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySUQ6IF9zZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RJRDogX3NlbGYudGFza0lkcyxcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb2NrZXRUeXBlOiBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGFybUxvZyxcclxuICAgICAgICAgICAgICAgICAgICBhbGFybVR5cGU6IEFsYXJtVHlwZS5GYWNlXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICAgIF9zZWxmLmRldmljZVNvY2tldFNlcnZlci5nZXRDYW1lcmFJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VySUQ6IF9zZWxmLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RJRDogX3NlbGYudGFza0lkcyxcclxuICAgICAgICAgICAgICAgICAgICBpc0NhbmNlbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzb2NrZXRUeXBlOiBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVGYWNlTG9nXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgXSkudGhlbigocmVzOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxhcm1Mb2cpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUZhY2VMb2cpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+mAgOiuouaIkOWKnycsIHJlcylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VGFza0lkcyhkZXZpY2VJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgLy8gVGFza1R5cGUg5p6a5Li+IOeahFRhc2tUeXBlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza1NlcnZpY2UuZ2V0VGFza0J5RGV2aWNlSUQoZGV2aWNlSWQsICdGYWNlTW9uaXRvcicpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghIXJlcyAmJiAhIXJlcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzLmRhdGEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn6K6+5aSH5p+l6K+i5biD5o6n5Lu75Yqh5aSx6LSlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDYXJMaXN0KCkge1xyXG4gICAgICAgIGxldCB0aW1lQXJyID0gWzMwMDAsIDYwMDAsIDkwMDAsIDExMDAwLCAxNjAwMCwgMTc1MDAsIDIyNTAwLCAyNDUwMCwgMzE1MDAsIDMzNTAwXTtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVs1XSk7XHJcbiAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVs2XSk7XHJcbiAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVs3XSk7XHJcbiAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVs4XSk7XHJcbiAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVs5XSk7XHJcbiAgICAgICAgdGltZUFyci5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC50b3BDYXJMaXN0LnVuc2hpZnQoTW9ja0Nhckxpc3QoKVtpbmRleF0gYXMgQ2FyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LiRzY29wZS4kYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEgKiB0aW1lQXJyW2luZGV4XSlcclxuICAgICAgICAgICAgfSkoaXRlbSwgaW5kZXgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzaG93QWxhcm0oKSB7XHJcbiAgICAgICAgdGhpcy5pZnJhbWUgPSAnaWZyYW1lJztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgdGhpcy5teWxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICBjb250ZW50OiBwb3BwdXBkZXRhaWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgSUQ6ICdwb3B1bERldGFpbCcsXHJcbiAgICAgICAgICAgIEFyZWFBbmRQb3NpdGlvbjoge2xlZnQ6IDIwMCwgdG9wOiAyMDAsIHdpZHRoOiA4NTMsIGhlaWdodDogNTAyfSxcclxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TW9yZUZhY2UoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaWZyYW1lID0gJ2lmcmFtZSc7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiwgc2hvd1N0YXR1czogYm9vbGVhbiwgU3ViY3JpYmVBY2Nlc3NMaXN0OiBBcnJheTxhbnk+LCBTdWJjcmliZUFsYXJtTGlzdDogQXJyYXk8YW55PiwgSUQ6IHN0cmluZywgY2FtZXJhSW5mbzogYW55IH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuc2hvd1N0YXR1cyA9IGZsYWc7XHJcbiAgICAgICAgc2NvcGUuU3ViY3JpYmVBY2Nlc3NMaXN0ID0gdGhpcy5TdWJjcmliZUFjY2Vzc0xpc3Q7XHJcbiAgICAgICAgc2NvcGUuU3ViY3JpYmVBbGFybUxpc3QgPSB0aGlzLlN1YmNyaWJlQWxhcm1MaXN0O1xyXG4gICAgICAgIHNjb3BlLklEID0gdGhpcy5jYW1lcmFJbmZvLklEO1xyXG4gICAgICAgIHNjb3BlLmNhbWVyYUluZm8gPSB0aGlzLmNhbWVyYUluZm87XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHRpdGxlOiBbJ+S6uuiEuOaKk+aLjScsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc4NTNweCcsICc2MzVweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwb3B1cEFsbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXNpemVMYXllcigpIHtcclxuICAgICAgICBpZiAodGhpcy5sYXllclNpemVJc01heCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyU2l6ZUNsYXNzTmFtZSA9ICdsYXllci1tYXgnO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNaW4oKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJTaXplQ2xhc3NOYW1lID0gJ2xheWVyLW1pbic7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd01heCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGF5ZXJTaXplSXNNYXggPSAhdGhpcy5sYXllclNpemVJc01heDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93TWluKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgdGhpcy5zaG93RmFjZUluZm9ybWF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5sYXllckNsYXNzTmFtZSA9ICdteWxheWVyTWluJztcclxuICAgICAgICB0aGlzLm15bGF5ZXIucmVzaXplKHtcclxuICAgICAgICAgICAgbGVmdDogKHNlbGYuJHNjb3BlLnBvc2l0aW9uLnggLSAoNTQwIC8gMikpLFxyXG4gICAgICAgICAgICB0b3A6IChzZWxmLiRzY29wZS5wb3NpdGlvbi55IC0gMzAwKSxcclxuICAgICAgICAgICAgd2lkdGg6IDU0MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAzMzBcclxuICAgICAgICB9LCBzZWxmLiRzY29wZS5sYXllcklkKVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dNYXgoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzIGFzIGFueTtcclxuICAgICAgICB0aGlzLnNob3dGYWNlSW5mb3JtYXRpb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGF5ZXJDbGFzc05hbWUgPSAnbXlsYXllck1heCc7XHJcbiAgICAgICAgdGhpcy5teWxheWVyLnJlc2l6ZSh7XHJcbiAgICAgICAgICAgIGxlZnQ6IChzZWxmLiRzY29wZS5wb3NpdGlvbi54IC0gKDgxNCAvIDIpKSxcclxuICAgICAgICAgICAgdG9wOiAoc2VsZi4kc2NvcGUucG9zaXRpb24ueSAtIDQ4MCksXHJcbiAgICAgICAgICAgIHdpZHRoOiA4MTQsXHJcbiAgICAgICAgICAgIGhlaWdodDogNTA4XHJcbiAgICAgICAgfSwgc2VsZi4kc2NvcGUubGF5ZXJJZClcclxuICAgIH1cclxuXHJcbiAgICBzaG93RmFjZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENvbXBsZXRlKG9jeENvbnRyb2xGdW5jOiBJVmlkZW9PY3hDb250cm9sRnVuYykge1xyXG4gICAgICAgIHRoaXMudmlkZW9PY3ggPSBvY3hDb250cm9sRnVuYztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygkKCdvYmplY3QnKS5sZW5ndGgpO1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5UmVhbFRpbWUoKVxyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlSZWFsVGltZSgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlb09jeCkge1xyXG4gICAgICAgICAgICBsZXQgb3B0cyA9IG5ldyBWaWRlb09jeFJlYWxUaW1lT3B0KCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jYW1lcmFJbmZvLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FtZXJhSW5mby5kYXRhLklwQWRkcmVzcyAmJiB0aGlzLmNhbWVyYUluZm8uZGF0YS5Qb3J0ICYmIHRoaXMuY2FtZXJhSW5mby5kYXRhLlVpZCkge1xyXG4gICAgICAgICAgICAgICAgLyotLeato+W8j+eUn+S6p+eOr+Wig+W6lOaUvuW8gC0tLS1bc3RhcnRdLS0qL1xyXG5cclxuICAgICAgICAgICAgICAgIG9wdHMuaXAgPSB0aGlzLmNhbWVyYUluZm8uZGF0YS5JcEFkZHJlc3M7IC8vfHwgXCIxNzIuMTYuOTAuMTUxXCI7XHJcbiAgICAgICAgICAgICAgICBvcHRzLnBvcnQgPSB0aGlzLmNhbWVyYUluZm8uZGF0YS5Qb3J0OyAvL3x8IDIxMDA7XHJcbiAgICAgICAgICAgICAgICBvcHRzLnBhdGggPSB0aGlzLmNhbWVyYUluZm8uZGF0YS5QbGF5TmFtZTsgIC8vXCJhdi8xLzNcIjtcclxuICAgICAgICAgICAgICAgIG9wdHMudXNlciA9IHRoaXMuY2FtZXJhSW5mby5kYXRhLlVpZDsgIC8vfHwgJ2FkbWluJztcclxuICAgICAgICAgICAgICAgIG9wdHMucGFzc3dkID0gdGhpcy5jYW1lcmFJbmZvLmRhdGEuUHdkOyAvL3x8XCJhZG1pblwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bZW5kXS0tLSovXHJcblxyXG4gICAgICAgICAgICAgICAgLyotLea1i+ivleaVsOaNri0tLS0tLS0tLS0tLS1bc3RhcnRdLS0qL1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIG9wdHMuaXAgPSBcIjE3Mi4xNi45MC4xNTFcIjtcclxuICAgICAgICAgICAgICAgIC8vIG9wdHMucG9ydCA9IDIxMDA7XHJcbiAgICAgICAgICAgICAgICAvLyBvcHRzLnBhdGggPSBcImF2LzEvM1wiO1xyXG4gICAgICAgICAgICAgICAgLy8gb3B0cy51c2VyID0gJ2FkbWluJztcclxuICAgICAgICAgICAgICAgIC8vIG9wdHMucGFzc3dkID0gXCJhZG1pblwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1bZW5kXS0tLSovXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvcHRzKVxyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb09jeC5wbGF5UmVhbFRpbWUob3B0cywgdGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLor6Xorr7lpIfmsqHmnInkv6Hmga9cIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvT2N4KSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9PY3guc3RvcCh0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlTXlMYXllcigpIHtcclxuICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDmlLbol4/kuI7lj5bmtojmlLbol49cclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0NvbGxlY3QoZXZlbnQ6IGFueSwgaXRlbTogZmFjZSkge1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcywgZGF0YSA9IGl0ZW07XHJcbiAgICAgICAgaWYgKCFpdGVtLmNvbGxlY3RTdGF0dXMpIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdEFkZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGpzb246IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG4gICAgICAgICAgICAgICAgb2JqZWN0SUQ6IGRhdGEuQ2FtZXJhSUQsXHJcbiAgICAgICAgICAgICAgICBvYmplY3RUeXBlOiBcIkZhY2VcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0QWRkSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHBhcmFtczogQ29sbGVjdERlbGV0ZVBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGlkczogZGF0YS5DYW1lcmFJRFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzZWxmLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5jb2xsZWN0RGVsZXRlSW5mbyhwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uY29sbGVjdFN0YXR1cyA9ICFpdGVtLmNvbGxlY3RTdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tBbmFseXNpcyhldmVudDogYW55LCBpdGVtOiBmYWNlKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShldmVudDogYW55LCBpdGVtOiBmYWNlKSB7XHJcbiAgICAgICAgaWYgKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cyA9ICFpdGVtLnN1cnZlaWxsYW5jZVN0YXR1cztcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2NhbWVyYU1hcFBvaW50Q29udHJvbGxlcicsIENhbWVyYU1hcFBvaW50Q29udHJvbGxlcik7Il19
