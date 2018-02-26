define(["require", "exports", "text!./tplHistoryPolice.html", "text!./tplHistoryFace.html", "text!./tpldetail.html", "text!./tplHistoryAll.html", "../../common/app/main.app", "../../common/directive/ocx/video.ocx.directive", "../../../core/server/enum/SocketResultTypeEnum", "../../common/factory/attribute.factory", "./TestEnum", "css!./style/cameraMapPoint.css", "../../common/factory/socket.factory", "../../common/services/deviceSocket.service", "../../common/services/task.service", "./tplHistoryAll", "../../common/services/camera.service", "../../common/factory/socket.factory", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service", "es6-promise"], function (require, exports, populPolice, populFace, poppupdetail, popupAll, main_app_1, video_ocx_directive_1, SocketResultTypeEnum_1, attribute_factory_1, TestEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require("es6-promise");
    var CamCarMapPointController = (function () {
        function CamCarMapPointController($scope, $timeout, mylayer, socketFactory, deviceSocketServer, layer, userInfoCacheFactory, taskService, cameraService, resourceRetrievalService, analysisService) {
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
            this.topCarList = [];
            this.SubcribeAccessList = TestEnum_1.MockAlarmList4(10, 10).Result;
            this.SubcribeAlarmList = [];
            this.historyIsShowAlarm = false;
            this.showFaceInformation = false;
            this.layerClassName = 'mylayerMin';
            this.layerSizeClassName = 'layer-max';
            this.layerSizeIsMax = false;
            this.isPlaying = false;
            this.ocxInitOnce = false;
            this.issubscribeAccessInfo = false;
            this.issubscribeAlarmInfo = false;
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.iframe = '';
            this.searchParams = {};
            this.dataListTotal = 0;
            this.PersonAlarmParams = {};
            this.alarmdataListTotal = 0;
            var self = this;
            $scope.$on('closeiframe', function () {
                self.iframe = '';
                self.$scope.$apply();
            });
            $scope.$on('clickCollect', function (a, e, item) {
                self.clickCollect(e, item);
            });
            $scope.$on('$destroy', function () {
                _this.videoOcx = null;
                _this.carCollectParam.isCancel = true;
                _this.carAlarmParam.isCancel = true;
                if (_this.issubscribeAccessInfo) {
                    _this.deviceSocketServer.getCameraInfo(_this.carCollectParam).then(function (res) {
                        if (!!res) {
                            console.warn("close sokit");
                            _this.socketFactory.unSubscribe(_this.carCollectParam.socketType);
                        }
                    });
                }
                if (_this.issubscribeAlarmInfo) {
                    _this.deviceSocketServer.getCameraInfo(_this.carAlarmParam).then(function (res) {
                        if (!!res) {
                            console.warn("close sokit");
                            _this.socketFactory.unSubscribe(_this.carAlarmParam.socketType);
                        }
                    });
                }
            });
            this.cameraName = this.$scope.PointDeTail.Name;
            this.cameraInfo = this.$scope.PointDeTail;
            this.deviceId = this.$scope.PointDeTail.ID;
            this.carCollectParam = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: [this.deviceId],
                isCancel: false,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeVehicleLog,
            };
            this.carAlarmParam = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: [this.deviceId],
                isCancel: false,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog,
                alarmType: SocketResultTypeEnum_1.AlarmType.Vehicle
            };
            this.subscribeAccessInfo(this.carCollectParam);
            this.subscribeAlarmInfo(this.carAlarmParam);
            var time = this.attributeFactory.getCrossTrainTime(1);
            this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.searchParams.endTime = time.endTime;
            this.searchParams.arrObjectID = [this.deviceId];
            this.searchParams.currentPage = 1;
            this.searchParams.pageSize = 10;
            this.search2Server();
            this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.PersonAlarmParams.endTime = time.endTime;
            this.PersonAlarmParams.arrCameraId = [this.deviceId];
            this.PersonAlarmParams.pageSize = 10;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'Car';
            this.getServerAlarmMessage(this.PersonAlarmParams);
        }
        CamCarMapPointController.prototype.subscribeAlarmInfo = function (taskAlarm) {
            var _this = this;
            var self = this;
            this.deviceSocketServer.getCameraInfo(taskAlarm).then(function (res) {
                if (!!res) {
                    _this.issubscribeAlarmInfo = true;
                    _this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog, function (data) {
                        if (!!data) {
                            console.log('alarmTopic', data);
                            self.alarmdataListTotal++;
                            _this.$timeout(function () {
                                _this.SubcribeAlarmList.unshift(data[0]);
                                $(".toptransitiona").eq(0).slideDown();
                            });
                        }
                    });
                }
                else {
                    self.layer.msg('订阅摄像机报警信息失败');
                }
            });
        };
        CamCarMapPointController.prototype.subscribeAccessInfo = function (taskInfo) {
            var _this = this;
            var self = this;
            this.deviceSocketServer.getCameraInfo(taskInfo).then(function (res) {
                if (!!res) {
                    _this.issubscribeAccessInfo = true;
                    _this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeVehicleLog, function (data) {
                        if (!!data) {
                            console.log('monitorTopic', data);
                            self.dataListTotal++;
                            _this.$timeout(function () {
                                self.SubcribeAccessList.unshift(data[0]);
                                $(".toptransition").eq(0).slideDown();
                            });
                        }
                    });
                }
                else {
                    _this.layer.msg('订阅摄像机抓拍信息失败');
                }
            });
        };
        CamCarMapPointController.prototype.showAlarm = function () {
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
        CamCarMapPointController.prototype.search2Server = function () {
            var _this = this;
            this.resourceRetrievalService.advancedSearchByCarEx(this.searchParams).then(function (datas) {
                if (datas && datas.Result && datas.Result.length > 0) {
                    _this.SubcribeAccessList = datas.Result;
                    _this.dataListTotal = datas.TotalCount;
                }
                else {
                    _this.SubcribeAccessList = [];
                    _this.dataListTotal = 0;
                }
            });
        };
        CamCarMapPointController.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.alarmdataListTotal = res.data.TotalCount;
                    var arr = [], data = res.data.Result;
                    for (var i = 0; i < data.length; i++) {
                        var obj = {};
                        obj.detail.imageURLs = data[i].AlarmLog.JsonUserData.detail.imageURLs;
                        obj.alarmObjName = data[i].AlarmLog.JsonUserData.alarmObjName;
                        obj.alarmType = data[i].AlarmLog.JsonUserData.alarmType;
                        obj.detail.passTime = data[i].AlarmLog.JsonUserData.detail.passTime;
                        arr.push(obj);
                    }
                    self.SubcribeAlarmList = arr;
                }
            });
        };
        CamCarMapPointController.prototype.showMoreFace = function (flag) {
            this.iframe = 'iframe';
            var scope = this.$scope.$new();
            scope.showStatus = flag;
            scope.ID = this.deviceId;
            scope.cameraInfo = this.cameraInfo;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['历史信息', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['853px', '575px'],
                content: popupAll,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        CamCarMapPointController.prototype.resizeLayer = function () {
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
        CamCarMapPointController.prototype.showMin = function () {
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
        CamCarMapPointController.prototype.showMax = function () {
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
        CamCarMapPointController.prototype.showFace = function () {
        };
        CamCarMapPointController.prototype.initComplete = function (ocxControlFunc) {
            var _this = this;
            this.videoOcx = ocxControlFunc;
            window.setTimeout(function () { _this.playRealTime(); }, 0);
        };
        CamCarMapPointController.prototype.playRealTime = function () {
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
        CamCarMapPointController.prototype.changeOCX = function (flag) {
            if (flag) {
                this.iframe = 'iframe';
            }
            else {
                this.iframe = '';
            }
        };
        CamCarMapPointController.prototype.stop = function () {
            if (this.videoOcx) {
                this.videoOcx.stop(this.videoOcx.getFocusWindowIndex());
            }
        };
        CamCarMapPointController.prototype.closeMyLayer = function () {
            this.stop();
            console.log('exit car popup');
        };
        CamCarMapPointController.prototype.clickCollect = function (event, item) {
            event.stopPropagation();
            var self = this;
            if (!item.collectStatus) {
                var params = {
                    json: JSON.stringify(item),
                    objectID: item.id,
                    objectType: "Car"
                };
                self.resourceRetrievalService.collectAddInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            else {
                var params = {
                    ids: item.id
                };
                self.resourceRetrievalService.collectDeleteInfo(params)
                    .then(function (res) {
                    if (res) {
                    }
                });
            }
            item.collectStatus = !item.collectStatus;
        };
        CamCarMapPointController.$inject = ['$scope', '$timeout', 'mylayer', 'socketFactory', 'deviceSocketServer', 'layer', 'userInfoCacheFactory', 'taskService', "cameraService", "resourceRetrievalService", 'analysisService'];
        return CamCarMapPointController;
    }());
    main_app_1.app.controller('camCarMapPointController', CamCarMapPointController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvY2FtZXJhQ2FyTWFwUG9pbnQvY2FtZXJhTWFwUG9pbnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE4REEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDO1FBZ0RJLGtDQUNZLE1BQVcsRUFDWCxRQUFhLEVBQ2IsT0FBWSxFQUNaLGFBQTZCLEVBQzdCLGtCQUFpQyxFQUNqQyxLQUFVLEVBQ1Ysb0JBQXlCLEVBQ3pCLFdBQXlCLEVBQ3pCLGFBQTZCLEVBQzdCLHdCQUFtRCxFQUNuRCxlQUFtQjtZQVgvQixpQkErRUM7WUE5RVcsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixZQUFPLEdBQVAsT0FBTyxDQUFLO1lBQ1osa0JBQWEsR0FBYixhQUFhLENBQWdCO1lBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBZTtZQUNqQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFLO1lBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELG9CQUFlLEdBQWYsZUFBZSxDQUFJO1lBeEQvQixlQUFVLEdBQWUsRUFBZ0IsQ0FBQztZQUcxQyx1QkFBa0IsR0FBZSx5QkFBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDL0Qsc0JBQWlCLEdBQWUsRUFBRSxDQUFDO1lBRW5DLHVCQUFrQixHQUFZLEtBQUssQ0FBQztZQUNwQyx3QkFBbUIsR0FBWSxLQUFLLENBQUM7WUFFckMsbUJBQWMsR0FBVyxZQUFZLENBQUM7WUFDdEMsdUJBQWtCLEdBQVcsV0FBVyxDQUFDO1lBQ3pDLG1CQUFjLEdBQVksS0FBSyxDQUFDO1lBTWhDLGNBQVMsR0FBWSxLQUFL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QUFRLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsRUFBRSxLQUFLO2lCQUNwQixDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMvQyxJQUFJLENBQUMsVUFBQyxHQUFRO29CQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRVYsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLE1BQU0sR0FBd0I7b0JBQzlCLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRTtpQkFDZixDQUFDO2dCQUNGLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7cUJBQ2xELElBQUksQ0FBQyxVQUFDLEdBQVE7b0JBQ1gsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFFVixDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdDLENBQUM7UUF4WE0sZ0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSwwQkFBMEIsRUFBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBeVg3TSwrQkFBQztLQTFYRCxBQTBYQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9jYW1lcmFDYXJNYXBQb2ludC9jYW1lcmFNYXBQb2ludC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RwbEhpc3RvcnlQb2xpY2UuaHRtbFwiIG5hbWU9XCJwb3B1bFBvbGljZVwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxIaXN0b3J5RmFjZS5odG1sXCIgbmFtZT1cInBvcHVsRmFjZVwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxkZXRhaWwuaHRtbFwiIG5hbWU9XCJwb3BwdXBkZXRhaWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vdHBsSGlzdG9yeUFsbC5odG1sXCIgbmFtZT1cInBvcHVwQWxsXCIgLz5cclxuXHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvY2FtZXJhTWFwUG9pbnQuY3NzJ1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L3NvY2tldC5mYWN0b3J5JztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvZGV2aWNlU29ja2V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy90YXNrLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4vdHBsSGlzdG9yeUFsbCc7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuLy8g5Y+C5pWwXHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuL1Rlc3RFbnVtXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgcGVyc29uQWxhcm0gfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGVcIjtcclxuXHJcbi8vICDop4bpopHmkq3mlL5cclxuaW1wb3J0IHsgVmlkZW9PY3hBdHRyIH0gZnJvbSAnLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4Lm1vZGVsJztcclxuaW1wb3J0IHsgSVZpZGVvT2N4Q29udHJvbEZ1bmMsIFZpZGVvT2N4UmVhbFRpbWVPcHQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9vY3gvdmlkZW8ub2N4LmRpcmVjdGl2ZVwiO1xyXG5cclxuLy9zb2NrZXRcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeSc7XHJcbmltcG9ydCB7IElTb2NrZXRGYWN0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnknO1xyXG5pbXBvcnQgeyBTb2NrZXRSZXN1bHRUeXBlRW51bSxBbGFybVR5cGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtJ1xyXG5pbXBvcnQgeyBJZGV2aWNlU29ja2V0IH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlJztcclxuLy8g5by55qGGXHJcbi8vIGltcG9ydCAnLi9hbGFybS5kZXRhaWwucG91cCc7XHJcbi8vIGltcG9ydCAnLi90cGxIaXN0b3J5UG9saWNlJztcclxuLy8gaW1wb3J0ICcuL3RwbC5oaXN0b3J5RmFjZSc7XHJcblxyXG5pbXBvcnQgeyBBY2Nlc3NMb2cgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWNjZXNzTG9nXCI7XHJcblxyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSVRhc2tTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZSc7XHJcbmltcG9ydCB7IElDYW1lcmFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYW1lcmEuc2VydmljZVwiO1xyXG4vLyDlhazlhbHmlrnms5Ug5pe26Ze05qC85byP5YyWXHJcbmltcG9ydCB7IEF0dHJpYnV0ZUZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvYXR0cmlidXRlLmZhY3RvcnlcIjtcclxuXHJcbi8vIOaUtuiXj1xyXG5pbXBvcnQge1xyXG4gICAgY2FyLFxyXG4gICAgZmFjZUl0ZW0sXHJcbiAgICBpbml0RmFjZVJlc3VsdCxcclxuICAgIFF1ZXJ5SXRlbSxcclxuICAgIENvbGxlY3RBZGRQYXJhbXMsXHJcbiAgICBDb2xsZWN0RGVsZXRlUGFyYW1zXHJcbn0gZnJvbSAnLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWwvcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcmVzb3VyY2VSZXRyaWV2YWwuc2VydmljZSc7XHJcbmltcG9ydCB7IE1vY2tBbGFybUxpc3Q0IH0gZnJvbSBcIi4vVGVzdEVudW1cIjtcclxuLy8g6L2m6L6G5p+l6K+i5Y+C5pWwXHJcbmltcG9ydCB7IFNlYXJjaFZlaGljbGVNb2RlbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL1NlYXJjaFZlaGljbGVQYXJhbXMnO1xyXG5pbXBvcnQgeyBQYWdlUmVzdWx0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0IHsgUFZEVmVoaWNsZUxpc3RNb2RlbCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL1BWRFZlaGljbGVMaXN0TW9kZWwnO1xyXG5pbXBvcnQgeyBJUmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBBbGFybVJlc3VsdEluZm8sIFBlcnNvbkFsYXJtUGFyYW1zLCBQZXJzb25BbGFybVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25BbGFybUVudW1cIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiZXM2LXByb21pc2VcIjtcclxuZGVjbGFyZSBsZXQgcG9wdWxQb2xpY2U6IGFueSwgcG9wdWxGYWNlOiBhbnksIHBvcHB1cGRldGFpbDogYW55LCBwb3B1cEFsbDogYW55O1xyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcbmRlY2xhcmUgbGV0IHJlcXVpcmU6IGFueTtcclxubGV0IFByb21pc2UgPSByZXF1aXJlKFwiZXM2LXByb21pc2VcIik7XHJcblxyXG5jbGFzcyBDYW1DYXJNYXBQb2ludENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdteWxheWVyJywgJ3NvY2tldEZhY3RvcnknLCAnZGV2aWNlU29ja2V0U2VydmVyJywgJ2xheWVyJywgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JywgJ3Rhc2tTZXJ2aWNlJywgXCJjYW1lcmFTZXJ2aWNlXCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCIsJ2FuYWx5c2lzU2VydmljZSddO1xyXG5cclxuICAgIHRvcENhckxpc3Q6IEFycmF5PENhcj4gPSBbXSBhcyBBcnJheTxDYXI+O1xyXG5cclxuICAgIC8vIHRydWVcclxuICAgIFN1YmNyaWJlQWNjZXNzTGlzdDogQXJyYXk8YW55PiA9IE1vY2tBbGFybUxpc3Q0KDEwLCAxMCkuUmVzdWx0O1xyXG4gICAgU3ViY3JpYmVBbGFybUxpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICBoaXN0b3J5SXNTaG93QWxhcm06IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNob3dGYWNlSW5mb3JtYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHZpZGVvT2N4OiBJVmlkZW9PY3hDb250cm9sRnVuYztcclxuICAgIGxheWVyQ2xhc3NOYW1lOiBzdHJpbmcgPSAnbXlsYXllck1pbic7XHJcbiAgICBsYXllclNpemVDbGFzc05hbWU6IHN0cmluZyA9ICdsYXllci1tYXgnO1xyXG4gICAgbGF5ZXJTaXplSXNNYXg6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNhbWVyYUluZm86IHsgW2tleTogc3RyaW5nXTogYW55IH07XHJcbiAgICBjYW1lcmFOYW1lOiBzdHJpbmc7XHJcbiAgICAvL09DWOWIneWni+WMllxyXG4gICAgLy8gaW5pdENvbXBsZXRlOihvY3hDb250cm9sRnVuYzogSVZpZGVvT2N4Q29udHJvbEZ1bmMpID0+IHZvaWQ7XHJcbiAgICAvL+aSreaUvuaIkOWKn1xyXG4gICAgaXNQbGF5aW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+W9k+WJjeaSreaUvuinhumikeeahOaRhOWDj+acuueahOS/oeaBr1xyXG4gICAgY3VycmVudEZvY3VzQ2FtZXJhSXZzVGFza0lEOiBzdHJpbmc7XHJcbiAgICAvL+W9k+WJjeiuoumYheeahHNvY2tldOeahGlkXHJcbiAgICBjdXJyZW50Q2FtZXJhU29ja2V0OiBzdHJpbmc7XHJcbiAgICAvL09DWCBpbml0ICDorqlPQ1gg6aaW5qyh6L+b5YWl5YiX6KGo5qih5byP5Yid5aeL5YyW5LiA5qyhXHJcbiAgICBvY3hJbml0T25jZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8g6K6+5aSHaWRcclxuICAgIGRldmljZUlkOiBzdHJpbmc7XHJcbiAgICAvLyDorqLpmIXlj4LmlbBcclxuICAgIGNhckNvbGxlY3RQYXJhbTogYW55O1xyXG4gICAgY2FyQWxhcm1QYXJhbTogYW55O1xyXG4gICAgLy8g5piv5ZCm6K6i6ZiFXHJcbiAgICBpc3N1YnNjcmliZUFjY2Vzc0luZm86IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzc3Vic2NyaWJlQWxhcm1JbmZvOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvLyDlhaznlKjmlrnms5VcclxuICAgIGF0dHJpYnV0ZUZhY3Rvcnk6IEF0dHJpYnV0ZUZhY3RvcnkgPSBuZXcgQXR0cmlidXRlRmFjdG9yeSgpO1xyXG5cclxuICAgIGlmcmFtZTogc3RyaW5nID0gJyc7XHJcblxyXG4gICAgLy/ljoblj7Lmn6Xor6LmnaHku7ZcclxuICAgIHNlYXJjaFBhcmFtczogU2VhcmNoVmVoaWNsZU1vZGVsID0ge30gYXMgU2VhcmNoVmVoaWNsZU1vZGVsO1xyXG4gICAgLy8g5Y6G5Y+y5oqT5ouN5oC75p2h5pWwXHJcbiAgICBkYXRhTGlzdFRvdGFsOm51bWJlciA9IDA7XHJcbiAgICAvLyDljoblj7LmiqXorabmn6Xor6Llj4LmlbBcclxuICAgIFBlcnNvbkFsYXJtUGFyYW1zOiBQZXJzb25BbGFybVBhcmFtcyA9IHt9IGFzIFBlcnNvbkFsYXJtUGFyYW1zO1xyXG4gICAgLy8g5Y6G5Y+y5oql6K2m5oC75p2h5pWwXHJcbiAgICBhbGFybWRhdGFMaXN0VG90YWw6bnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbXlsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgc29ja2V0RmFjdG9yeTogSVNvY2tldEZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBkZXZpY2VTb2NrZXRTZXJ2ZXI6IElkZXZpY2VTb2NrZXQsXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IGFueSxcclxuICAgICAgICBwcml2YXRlIHRhc2tTZXJ2aWNlOiBJVGFza1NlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjYW1lcmFTZXJ2aWNlOiBJQ2FtZXJhU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHJlc291cmNlUmV0cmlldmFsU2VydmljZTogSVJlc291cmNlUmV0cmlldmFsU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGFuYWx5c2lzU2VydmljZTphbnlcclxuICAgICkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAkc2NvcGUuJG9uKCdjbG9zZWlmcmFtZScsICgpID0+IHtcclxuICAgICAgICAgICAgc2VsZi5pZnJhbWUgPSAnJztcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGFwcGx5KCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbignY2xpY2tDb2xsZWN0JywgKGE6IGFueSwgZTogYW55LCBpdGVtOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHNlbGYuY2xpY2tDb2xsZWN0KGUsIGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiBcclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb09jeCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuY2FyQ29sbGVjdFBhcmFtLmlzQ2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5jYXJBbGFybVBhcmFtLmlzQ2FuY2VsID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNzdWJzY3JpYmVBY2Nlc3NJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZVNvY2tldFNlcnZlci5nZXRDYW1lcmFJbmZvKHRoaXMuY2FyQ29sbGVjdFBhcmFtKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2xvc2Ugc29raXRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKHRoaXMuY2FyQ29sbGVjdFBhcmFtLnNvY2tldFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNzdWJzY3JpYmVBbGFybUluZm8pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlU29ja2V0U2VydmVyLmdldENhbWVyYUluZm8odGhpcy5jYXJBbGFybVBhcmFtKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiY2xvc2Ugc29raXRcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb2NrZXRGYWN0b3J5LnVuU3Vic2NyaWJlKHRoaXMuY2FyQWxhcm1QYXJhbS5zb2NrZXRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFOYW1lID0gdGhpcy4kc2NvcGUuUG9pbnREZVRhaWwuTmFtZTtcclxuICAgICAgICB0aGlzLmNhbWVyYUluZm8gPSB0aGlzLiRzY29wZS5Qb2ludERlVGFpbDtcclxuICAgICAgICB0aGlzLmRldmljZUlkID0gdGhpcy4kc2NvcGUuUG9pbnREZVRhaWwuSUQ7XHJcbiAgICAgICAgLy8g6K6i6ZiFXHJcbiAgICAgICAgdGhpcy5jYXJDb2xsZWN0UGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHVzZXJJRDogdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIG9iamVjdElEOiBbdGhpcy5kZXZpY2VJZF0sXHJcbiAgICAgICAgICAgIGlzQ2FuY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ja2V0VHlwZTogU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlVmVoaWNsZUxvZywvL1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2FyQWxhcm1QYXJhbSA9IHtcclxuICAgICAgICAgICAgdXNlcklEOiB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKSxcclxuICAgICAgICAgICAgb2JqZWN0SUQ6IFt0aGlzLmRldmljZUlkXSxcclxuICAgICAgICAgICAgaXNDYW5jZWw6IGZhbHNlLFxyXG4gICAgICAgICAgICBzb2NrZXRUeXBlOiBTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGFybUxvZywvL1wiU3ViY3JpYmVBbGFybUxvZ1wiXHJcbiAgICAgICAgICAgIGFsYXJtVHlwZTogQWxhcm1UeXBlLlZlaGljbGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlQWNjZXNzSW5mbyh0aGlzLmNhckNvbGxlY3RQYXJhbSk7XHJcbiAgICAgICAgdGhpcy5zdWJzY3JpYmVBbGFybUluZm8odGhpcy5jYXJBbGFybVBhcmFtKTtcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgxKTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLmVuZFRpbWUuc3BsaXQoXCIgXCIpWzBdK1wiIDAwOjAwOjAwXCI7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5hcnJPYmplY3RJRCA9IFt0aGlzLmRldmljZUlkXTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hQYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLnNlYXJjaDJTZXJ2ZXIoKTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnN0YXJ0VGltZSA9IHRpbWUuZW5kVGltZS5zcGxpdChcIiBcIilbMF0gKyBcIiAwMDowMDowMFwiO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuZW5kVGltZSA9IHRpbWUuZW5kVGltZTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFyckNhbWVyYUlkID0gW3RoaXMuZGV2aWNlSWRdO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMucGFnZVNpemUgPSAxMDtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLmFsYXJtVHlwZSA9ICdDYXInO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy/orqLpmIXmiqXorabkv6Hmga9cclxuICAgIHByaXZhdGUgc3Vic2NyaWJlQWxhcm1JbmZvKHRhc2tBbGFybTogYW55KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlU29ja2V0U2VydmVyLmdldENhbWVyYUluZm8odGFza0FsYXJtKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISFyZXMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzc3Vic2NyaWJlQWxhcm1JbmZvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxhcm1Mb2csIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdhbGFybVRvcGljJywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYWxhcm1kYXRhTGlzdFRvdGFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuU3ViY3JpYmVBbGFybUxpc3QudW5zaGlmdChkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIudG9wdHJhbnNpdGlvbmFcIikuZXEoMCkuc2xpZGVEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXllci5tc2coJ+iuoumYheaRhOWDj+acuuaKpeitpuS/oeaBr+Wksei0pScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvL+iuoumYheaKk+aLjeS/oeaBr1xyXG4gICAgcHJpdmF0ZSBzdWJzY3JpYmVBY2Nlc3NJbmZvKHRhc2tJbmZvOiBhbnkpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VTb2NrZXRTZXJ2ZXIuZ2V0Q2FtZXJhSW5mbyh0YXNrSW5mbykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKCEhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzc3Vic2NyaWJlQWNjZXNzSW5mbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvY2tldEZhY3Rvcnkuc3Vic2NyaWJlKFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZVZlaGljbGVMb2csIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb25pdG9yVG9waWMnLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhTGlzdFRvdGFsKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFjY2Vzc0xpc3QudW5zaGlmdChkYXRhWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIudG9wdHJhbnNpdGlvblwiKS5lcSgwKS5zbGlkZURvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZygn6K6i6ZiF5pGE5YOP5py65oqT5ouN5L+h5oGv5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0FsYXJtKCkge1xyXG4gICAgICAgIGxldCBzY29wZTogeyAkZGVzdHJveTogRnVuY3Rpb24gfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgLy8gdGhpcy5jaGFuZ2VPQ1godHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMubXlsYXllci5vcGVuKHtcclxuICAgICAgICAgICAgY29udGVudDogcG9wcHVwZGV0YWlsLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIElEOiAncG9wdWxEZXRhaWwnLFxyXG4gICAgICAgICAgICBBcmVhQW5kUG9zaXRpb246IHsgbGVmdDogMjAwLCB0b3A6IDIwMCwgd2lkdGg6IDg1MywgaGVpZ2h0OiA1MDIgfSxcclxuICAgICAgICAgICAgZW5kOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDlkJHlkI7lj7Dmn6Xor6Lljoblj7LorrDlvZXvvIjmipPmi43vvIlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZWFyY2gyU2VydmVyKCkge1xyXG4gICAgICAgIC8vIOmYsuatouW8guatpeW8lei1t+eahOWPmOWMliwg5pWF5bCG5piv5ZCm5Li65pyJ5Zu+5qOA57Si55qE5qCH5b+X5Y+Y6YeP5pS+5Zyo5aSW6YOoXHJcbiAgICAgICAgdGhpcy5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuYWR2YW5jZWRTZWFyY2hCeUNhckV4KHRoaXMuc2VhcmNoUGFyYW1zKS50aGVuKChkYXRhczogUGFnZVJlc3VsdDxQVkRWZWhpY2xlTGlzdE1vZGVsPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YXMgJiYgZGF0YXMuUmVzdWx0ICYmIGRhdGFzLlJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN1YmNyaWJlQWNjZXNzTGlzdCA9IGRhdGFzLlJlc3VsdDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUxpc3RUb3RhbCA9IGRhdGFzLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN1YmNyaWJlQWNjZXNzTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhTGlzdFRvdGFsID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9u6K+35rGC5Y6G5Y+y5oql6K2m5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0ge1BlcnNvbkFsYXJtUGFyYW1zfSBQZXJzb25BbGFybVBhcmFtcyDor7fmsYLlj4LmlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcnZlckFsYXJtTWVzc2FnZShzZWFyY2hQYXJhbXM6IFBlcnNvbkFsYXJtUGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNTZXJ2aWNlLnNlYXJjaFBlcnNvbkFsYXJtKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmFsYXJtZGF0YUxpc3RUb3RhbCA9IHJlcy5kYXRhLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyOiBBcnJheTxhbnk+ID0gW10sIGRhdGEgPSByZXMuZGF0YS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iajphbnk9e307XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmRldGFpbC5pbWFnZVVSTHMgPSBkYXRhW2ldLkFsYXJtTG9nLkpzb25Vc2VyRGF0YS5kZXRhaWwuaW1hZ2VVUkxzO1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5hbGFybU9iak5hbWUgPSBkYXRhW2ldLkFsYXJtTG9nLkpzb25Vc2VyRGF0YS5hbGFybU9iak5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmFsYXJtVHlwZSA9IGRhdGFbaV0uQWxhcm1Mb2cuSnNvblVzZXJEYXRhLmFsYXJtVHlwZTtcclxuICAgICAgICAgICAgICAgICAgICBvYmouZGV0YWlsLnBhc3NUaW1lID0gZGF0YVtpXS5BbGFybUxvZy5Kc29uVXNlckRhdGEuZGV0YWlsLnBhc3NUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9iai5kZXRhaWwudmVoaWNsZVR5cGUgPSBcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5TdWJjcmliZUFsYXJtTGlzdCA9IGFycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dNb3JlRmFjZShmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pZnJhbWUgPSAnaWZyYW1lJztcclxuICAgICAgICBsZXQgc2NvcGU6IHsgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzaG93U3RhdHVzOiBib29sZWFuLCBJRDogbnVtYmVyIHwgc3RyaW5nLCBjYW1lcmFJbmZvOiBhbnl9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLnNob3dTdGF0dXMgPSBmbGFnO1xyXG4gICAgICAgIHNjb3BlLklEID0gdGhpcy5kZXZpY2VJZDtcclxuICAgICAgICBzY29wZS5jYW1lcmFJbmZvID0gdGhpcy5jYW1lcmFJbmZvO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfljoblj7Lkv6Hmga8nLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnODUzcHgnLCAnNTc1cHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBBbGwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzaXplTGF5ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubGF5ZXJTaXplSXNNYXgpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllclNpemVDbGFzc05hbWUgPSAnbGF5ZXItbWF4JztcclxuICAgICAgICAgICAgdGhpcy5zaG93TWluKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyU2l6ZUNsYXNzTmFtZSA9ICdsYXllci1taW4nO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dNYXgoKVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxheWVyU2l6ZUlzTWF4ID0gIXRoaXMubGF5ZXJTaXplSXNNYXg7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd01pbigpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXMgYXMgYW55O1xyXG4gICAgICAgIHRoaXMuc2hvd0ZhY2VJbmZvcm1hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGF5ZXJDbGFzc05hbWUgPSAnbXlsYXllck1pbic7XHJcbiAgICAgICAgdGhpcy5teWxheWVyLnJlc2l6ZSh7XHJcbiAgICAgICAgICAgIGxlZnQ6IChzZWxmLiRzY29wZS5wb3NpdGlvbi54IC0gKDU0MCAvIDIpKSxcclxuICAgICAgICAgICAgdG9wOiAoc2VsZi4kc2NvcGUucG9zaXRpb24ueSAtIDMwMCksXHJcbiAgICAgICAgICAgIHdpZHRoOiA1NDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMzMwXHJcbiAgICAgICAgfSwgc2VsZi4kc2NvcGUubGF5ZXJJZClcclxuICAgIH1cclxuXHJcbiAgICBzaG93TWF4KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcyBhcyBhbnk7XHJcbiAgICAgICAgdGhpcy5zaG93RmFjZUluZm9ybWF0aW9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxheWVyQ2xhc3NOYW1lID0gJ215bGF5ZXJNYXgnO1xyXG4gICAgICAgIHRoaXMubXlsYXllci5yZXNpemUoe1xyXG4gICAgICAgICAgICBsZWZ0OiAoc2VsZi4kc2NvcGUucG9zaXRpb24ueCAtICg4MTQgLyAyKSksXHJcbiAgICAgICAgICAgIHRvcDogKHNlbGYuJHNjb3BlLnBvc2l0aW9uLnkgLSA0ODApLFxyXG4gICAgICAgICAgICB3aWR0aDogODE0LFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDUwOFxyXG4gICAgICAgIH0sIHNlbGYuJHNjb3BlLmxheWVySWQpXHJcbiAgICB9XHJcblxyXG4gICAgc2hvd0ZhY2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGluaXRDb21wbGV0ZShvY3hDb250cm9sRnVuYzogSVZpZGVvT2N4Q29udHJvbEZ1bmMpIHtcclxuICAgICAgICB0aGlzLnZpZGVvT2N4ID0gb2N4Q29udHJvbEZ1bmM7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJCgnb2JqZWN0JykubGVuZ3RoKTtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7IHRoaXMucGxheVJlYWxUaW1lKCkgfSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheVJlYWxUaW1lKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvT2N4KSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRzID0gbmV3IFZpZGVvT2N4UmVhbFRpbWVPcHQoKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhbWVyYUluZm8uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jYW1lcmFJbmZvLmRhdGEuSXBBZGRyZXNzICYmIHRoaXMuY2FtZXJhSW5mby5kYXRhLlBvcnQgJiYgdGhpcy5jYW1lcmFJbmZvLmRhdGEuVWlkKSB7XHJcbiAgICAgICAgICAgICAgICAvKi0t5q2j5byP55Sf5Lqn546v5aKD5bqU5pS+5byALS0tLVtzdGFydF0tLSovXHJcblxyXG4gICAgICAgICAgICAgICAgb3B0cy5pcCA9IHRoaXMuY2FtZXJhSW5mby5kYXRhLklwQWRkcmVzczsgLy98fCBcIjE3Mi4xNi45MC4xNTFcIjtcclxuICAgICAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuY2FtZXJhSW5mby5kYXRhLlBvcnQ7IC8vfHwgMjEwMDtcclxuICAgICAgICAgICAgICAgIG9wdHMucGF0aCA9IHRoaXMuY2FtZXJhSW5mby5kYXRhLlBsYXlOYW1lOyAgLy9cImF2LzEvM1wiO1xyXG4gICAgICAgICAgICAgICAgb3B0cy51c2VyID0gdGhpcy5jYW1lcmFJbmZvLmRhdGEuVWlkOyAgLy98fCAnYWRtaW4nO1xyXG4gICAgICAgICAgICAgICAgb3B0cy5wYXNzd2QgPSB0aGlzLmNhbWVyYUluZm8uZGF0YS5Qd2Q7IC8vfHxcImFkbWluXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtlbmRdLS0tKi9cclxuXHJcbiAgICAgICAgICAgICAgICAvKi0t5rWL6K+V5pWw5o2uLS0tLS0tLS0tLS0tLVtzdGFydF0tLSovXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb3B0cy5pcCA9IFwiMTcyLjE2LjkwLjE1MVwiO1xyXG4gICAgICAgICAgICAgICAgLy8gb3B0cy5wb3J0ID0gMjEwMDtcclxuICAgICAgICAgICAgICAgIC8vIG9wdHMucGF0aCA9IFwiYXYvMS8zXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBvcHRzLnVzZXIgPSAnYWRtaW4nO1xyXG4gICAgICAgICAgICAgICAgLy8gb3B0cy5wYXNzd2QgPSBcImFkbWluXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVtlbmRdLS0tKi9cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wdHMpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnBsYXlSZWFsVGltZShvcHRzLCB0aGlzLnZpZGVvT2N4LmdldEZvY3VzV2luZG93SW5kZXgoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuivpeiuvuWkh+ayoeacieS/oeaBr1wiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZU9DWChmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSAnaWZyYW1lJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmlmcmFtZSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RvcCgpIHtcclxuICAgICAgICBpZiAodGhpcy52aWRlb09jeCkge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvT2N4LnN0b3AodGhpcy52aWRlb09jeC5nZXRGb2N1c1dpbmRvd0luZGV4KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbG9zZU15TGF5ZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2V4aXQgY2FyIHBvcHVwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xpY2tDb2xsZWN0KGV2ZW50OiBhbnksIGl0ZW06IGNhcikge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoIWl0ZW0uY29sbGVjdFN0YXR1cykge1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zOiBDb2xsZWN0QWRkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICAganNvbjogSlNPTi5zdHJpbmdpZnkoaXRlbSksXHJcbiAgICAgICAgICAgICAgICBvYmplY3RJRDogaXRlbS5pZCxcclxuICAgICAgICAgICAgICAgIG9iamVjdFR5cGU6IFwiQ2FyXCJcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdEFkZEluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXM6IENvbGxlY3REZWxldGVQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICBpZHM6IGl0ZW0uaWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UuY29sbGVjdERlbGV0ZUluZm8ocGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLmNvbGxlY3RTdGF0dXMgPSAhaXRlbS5jb2xsZWN0U3RhdHVzO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignY2FtQ2FyTWFwUG9pbnRDb250cm9sbGVyJywgQ2FtQ2FyTWFwUG9pbnRDb250cm9sbGVyKTsiXX0=
