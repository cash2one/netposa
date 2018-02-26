define(["require", "exports", "text!./tplCollectList.html", "text!./tplAlarmList.html", "../../common/app/main.app", "../../../core/server/enum/SocketResultTypeEnum", "../../common/factory/attribute.factory", "css!./style/wifiResourcePoint.css", "./collectList.controller", "./alarmList.controller", "../../common/factory/socket.factory", "../../common/services/deviceSocket.service", "../../common/services/resourceRetrieval.service", "../../common/services/analysis.service"], function (require, exports, collectListHtml, alarmListHtml, main_app_1, SocketResultTypeEnum_1, attribute_factory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WifiResourcePointController = (function () {
        function WifiResourcePointController($scope, $timeout, layer, socketFactory, deviceSocketServer, userInfoCacheFactory, resourceRetrievalService, analysisService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.socketFactory = socketFactory;
            this.deviceSocketServer = deviceSocketServer;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.resourceRetrievalService = resourceRetrievalService;
            this.analysisService = analysisService;
            this.ShowAlarmStatus = false;
            this.MockWifiList = [];
            this.MockWifiAlarmList = [];
            this.isSubcribeWiFiLog = false;
            this.isSubcribeAlarmLog = false;
            this.dataListTotal = 0;
            this.searchParams = {
                currentPage: 1,
                keyWord: '',
                orderBy: {
                    isAsc: false,
                },
                pageSize: 10,
                isFirstSearch: true,
                taskId: '',
                startTime: '',
                endTime: '',
                ArObjectID: [],
                userId: ''
            };
            this.attributeFactory = new attribute_factory_1.AttributeFactory();
            this.PersonAlarmParams = {};
            this.alarmdataListTotal = 0;
            this.marker = this.$scope.marker;
            console.log(this.marker);
            this.deviceName = this.$scope.PointDeTail.Name;
            this.deviceInfo = this.$scope.PointDeTail;
            this.deviceId = this.$scope.PointDeTail.ID;
            this.subscribeWifiCollect();
            this.subscribeWifiAlarm();
            var self = this;
            this.$scope.$on('$destroy', function () {
                _this.wifiCollectParam.isCancel = true;
                _this.wifiAlarmParam.isCancel = true;
                if (_this.isSubcribeWiFiLog) {
                    _this.deviceSocketServer.getWifiInfo(_this.wifiCollectParam).then(function (res) {
                        if (!!res) {
                            console.log("close sokit");
                            _this.socketFactory.unSubscribe(_this.wifiCollectParam.socketType);
                            _this.isSubcribeWiFiLog = false;
                        }
                    });
                }
                if (_this.isSubcribeAlarmLog) {
                    _this.deviceSocketServer.getWifiInfo(_this.wifiAlarmParam).then(function (res) {
                        if (!!res) {
                            console.log("close sokit");
                            _this.socketFactory.unSubscribe(_this.wifiAlarmParam.socketType);
                            _this.isSubcribeAlarmLog = false;
                        }
                    });
                }
            });
            this.searchParams.userId = this.userInfoCacheFactory.getCurrentUserId();
            var time = this.attributeFactory.getCrossTrainTime(1);
            this.searchParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.searchParams.endTime = time.endTime;
            this.searchParams.ArObjectID.push(this.deviceId);
            this.getServerMessage(this.searchParams);
            this.PersonAlarmParams.startTime = time.endTime.split(" ")[0] + " 00:00:00";
            this.PersonAlarmParams.endTime = time.endTime;
            this.PersonAlarmParams.arrCameraId = [this.deviceId];
            this.PersonAlarmParams.pageSize = 10;
            this.PersonAlarmParams.currentPage = 1;
            this.PersonAlarmParams.alarmType = 'WiFi';
            this.getServerAlarmMessage(this.PersonAlarmParams);
        }
        WifiResourcePointController.prototype.getServerMessage = function (searchParams) {
            var _this = this;
            this.resourceRetrievalService.advancedSearchByWifi(searchParams)
                .then(function (res) {
                if ((res.code === 200) && (typeof res.data.WiFi !== 'undefined') && (res.data.WiFi.TotalCount > 0)) {
                    _this.dataListTotal = res.data.WiFi.TotalCount;
                    var arr = [], data = res.data.WiFi.Result;
                    for (var i = 0; i < data.length; i++) {
                        var obj = {};
                        obj.Mac = data[i].wifiLog.Mac;
                        obj.AcqTime = data[i].wifiLog.AcqTime;
                        arr.push(obj);
                    }
                    _this.MockWifiList = arr;
                }
                else {
                }
            });
        };
        WifiResourcePointController.prototype.getServerAlarmMessage = function (searchParams) {
            var self = this;
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    self.alarmdataListTotal = res.data.TotalCount;
                    for (var i = 0; i < res.data.Result.length; i++) {
                        res.data.Result[i].AlarmLog.Mac = res.data.Result[i].AlarmLog.Notes;
                    }
                    self.MockWifiAlarmList = res.data.Result;
                }
            });
        };
        WifiResourcePointController.prototype.subscribeWifiCollect = function () {
            var _this = this;
            this.wifiCollectParam = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: [this.deviceId],
                isCancel: false,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeWiFiLog,
            };
            var self = this;
            this.deviceSocketServer.getWifiInfo(this.wifiCollectParam).then(function (res) {
                if (!!res) {
                    _this.isSubcribeWiFiLog = true;
                    _this.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeWiFiLog, function (data) {
                        _this.$timeout(function () {
                            var arr = data.concat(self.MockWifiList);
                            if (arr.length > 10) {
                                self.MockWifiList = arr.slice(0, 10);
                            }
                            else {
                                self.MockWifiList = arr;
                            }
                            self.dataListTotal += data.length;
                            console.log('socket start SubcribeWiFiLog', data, self.MockWifiList.length);
                        });
                    });
                }
            });
        };
        WifiResourcePointController.prototype.subscribeWifiAlarm = function () {
            this.wifiAlarmParam = {
                userID: this.userInfoCacheFactory.getCurrentUserId(),
                objectID: [this.deviceId],
                isCancel: false,
                socketType: SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog,
                alarmType: SocketResultTypeEnum_1.AlarmType.Wifi
            };
            var self = this;
            this.deviceSocketServer.getWifiInfo(this.wifiAlarmParam).then(function (res) {
                if (!!res) {
                    self.isSubcribeAlarmLog = true;
                    self.socketFactory.subscribe(SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog, function (data) {
                        if (self.deviceId != data[0].AlarmLog.ObjectID) {
                            return;
                        }
                        self.$timeout(function () {
                            var arr = data.concat(self.MockWifiAlarmList);
                            if (arr.length > 10) {
                                self.MockWifiAlarmList = arr.slice(0, 10);
                            }
                            else {
                                self.MockWifiAlarmList = arr;
                            }
                            self.alarmdataListTotal += data.length;
                            console.log('socket start SubcribeWiFiLog PerceiveData', data, self.MockWifiAlarmList.length);
                        });
                    });
                }
            });
        };
        WifiResourcePointController.prototype.showAlarm = function () {
            this.ShowAlarmStatus = !this.ShowAlarmStatus;
        };
        WifiResourcePointController.prototype.lookMoreCollect = function (flag) {
            var scope = this.$scope.$new();
            scope.ID = this.deviceId;
            scope.name = this.deviceName;
            scope.status = flag;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['历史Wi-Fi采集', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['810px', '500px'],
                content: collectListHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        WifiResourcePointController.prototype.lookMoreAlarm = function () {
            var scope = this.$scope.$new();
            scope.name = this.deviceName;
            scope.ID = this.deviceId;
            this.layer.open({
                type: 1,
                skin: 'no-scroll',
                title: ['历史报警信息', 'font-weight: bold;background-color: #F6F8FB;color: #606060;height: 40px;'],
                area: ['810px', '500px'],
                content: alarmListHtml,
                scope: scope,
                end: function () {
                    scope.$destroy();
                }
            });
        };
        WifiResourcePointController.prototype.mapWifiPopulClose = function () {
            console.log('exit wifi popup');
        };
        WifiResourcePointController.$inject = ['$scope', '$timeout', 'layer', 'socketFactory', 'deviceSocketServer', 'userInfoCacheFactory', 'resourceRetrievalService', 'analysisService'];
        return WifiResourcePointController;
    }());
    main_app_1.app.controller('wifiResourcePointController', WifiResourcePointController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvd2lmaVJlc291cmNlUG9pbnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUEwQkE7UUFnQ0kscUNBQ1ksTUFBVyxFQUNYLFFBQWtCLEVBQ2xCLEtBQVUsRUFDVixhQUE2QixFQUM3QixrQkFBaUMsRUFDakMsb0JBQTJDLEVBQzNDLHdCQUFtRCxFQUNuRCxlQUFpQztZQVI3QyxpQkE0REM7WUEzRFcsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtZQUM3Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWU7WUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTJCO1lBQ25ELG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQXRDN0Msb0JBQWUsR0FBWSxLQUFLLENBQUM7WUFJakMsaUJBQVksR0FBZSxFQUFFLENBQUM7WUFDOUIsc0JBQWlCLEdBQWUsRUFBRSxDQUFDO1lBSW5DLHNCQUFpQixHQUFXLEtBQUssQ0FBQztZQUNsQyx1QkFBa0IsR0FBVyxLQUFLLENBQUM7WUFFbkMsa0JBQWEsR0FBVSxDQUFDLENBQUM7WUFDekIsaUJBQVksR0FBcUI7Z0JBQzdCLFdBQVcsRUFBRSxDQUFDO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2dCQUNYLE9BQU8sRUFBRTtvQkFDTCxLQUFLLEVBQUUsS0FBSztpQkFDZjtnQkFDRCxRQUFRLEVBQUUsRUFBRTtnQkFDWixhQUFhLEVBQUUsSUFBSTtnQkFDbkIsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFLEVBQUU7YUFDYixDQUFBO1lBQ0QscUJBQWdCLEdBQXFCLElBQUksb0NBQWdCLEVBQUUsQ0FBQztZQUM1RCxzQkFBaUIsR0FBc0IsRUFBdUIsQ0FBQztZQUMvRCx1QkFBa0IsR0FBVSxDQUFDLENBQUM7WUFXMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBRTFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO1lBRTNDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTFCLElBQUksSUFBSSxHQUFDLElBQUksQ0FBQztZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO3dCQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBOzRCQUMxQixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7NEJBQ2pFLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7d0JBQ25DLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUMxQixLQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO3dCQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFBOzRCQUMxQixLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUMvRCxLQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO3dCQUNwQyxDQUFDO29CQUNMLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7WUFFTCxDQUFDLENBQUMsQ0FBQTtZQUdGLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDdkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDNUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7WUFDMUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZELENBQUM7UUFLTSxzREFBZ0IsR0FBdkIsVUFBd0IsWUFBOEI7WUFBdEQsaUJBaUJDO1lBaEJHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUM7aUJBQzNELElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ1gsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pHLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM5QyxJQUFJLEdBQUcsR0FBZSxFQUFFLEVBQUUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDdEQsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7d0JBQzdCLElBQUksR0FBRyxHQUFPLEVBQUUsQ0FBQzt3QkFDakIsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQzt3QkFDOUIsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzt3QkFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDakIsQ0FBQztvQkFDRCxLQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztnQkFDNUIsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztnQkFFUixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBTU0sMkRBQXFCLEdBQTVCLFVBQTZCLFlBQStCO1lBQ3hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO29CQUM5QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO3dCQUM1QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQ3hFLENBQUM7b0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUM3QyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR08sMERBQW9CLEdBQTVCO1lBQUEsaUJBeUJDO1lBeEJHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztnQkFDcEIsTUFBTSxFQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDbkQsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsVUFBVSxFQUFDLDJDQUFvQixDQUFDLGdCQUFnQjthQUNuRCxDQUFDO1lBQ0YsSUFBSSxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQ2QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUixLQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO29CQUM5QixLQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQywyQ0FBb0IsQ0FBQyxnQkFBZ0IsRUFBQyxVQUFDLElBQVE7d0JBQ3hFLEtBQUksQ0FBQyxRQUFRLENBQUM7NEJBQ1YsSUFBSSxHQUFHLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3JELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQztnQ0FDZixJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN4QyxDQUFDOzRCQUFBLElBQUksQ0FBQSxDQUFDO2dDQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDOzRCQUM1QixDQUFDOzRCQUNELElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs0QkFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTt3QkFDL0UsQ0FBQyxDQUFDLENBQUE7b0JBQ04sQ0FBQyxDQUFDLENBQUE7Z0JBQ04sQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdPLHdEQUFrQixHQUExQjtZQUVJLElBQUksQ0FBQyxjQUFjLEdBQUc7Z0JBQ2xCLE1BQU0sRUFBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ25ELFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBQywyQ0FBb0IsQ0FBQyxpQkFBaUI7Z0JBQ2pELFNBQVMsRUFBQyxnQ0FBUyxDQUFDLElBQUk7YUFDM0IsQ0FBQztZQUNGLElBQUksSUFBSSxHQUFFLElBQUksQ0FBQztZQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQzlELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7b0JBQy9CLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLDJDQUFvQixDQUFDLGlCQUFpQixFQUFDLFVBQUMsSUFBUTt3QkFDekUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7NEJBQzdDLE1BQU0sQ0FBQTt3QkFDVixDQUFDO3dCQUNELElBQUksQ0FBQyxRQUFRLENBQUM7NEJBQ1YsSUFBSSxHQUFHLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs0QkFDMUQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dDQUNkLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQzs0QkFDN0MsQ0FBQzs0QkFBQSxJQUFJLENBQUEsQ0FBQztnQ0FDRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDOzRCQUNqQyxDQUFDOzRCQUNELElBQUksQ0FBQyxrQkFBa0IsSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDOzRCQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2xHLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQyxDQUFBO2dCQUNOLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFTSwrQ0FBUyxHQUFoQjtZQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2pELENBQUM7UUFHTSxxREFBZSxHQUF0QixVQUF1QixJQUFZO1lBQy9CLElBQUksS0FBSyxHQUF5RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3JHLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN6QixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDN0IsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDLFdBQVcsRUFBRSwwRUFBMEUsQ0FBQztnQkFDaEcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBR00sbURBQWEsR0FBcEI7WUFDSSxJQUFJLEtBQUssR0FBcUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqRixLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDN0IsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsMEVBQTBFLENBQUM7Z0JBQzdGLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRSxhQUFhO2dCQUN0QixLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVNLHVEQUFpQixHQUF4QjtZQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBNU9NLG1DQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsb0JBQW9CLEVBQUUsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQThPbEssa0NBQUM7S0EvT0QsQUErT0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsNkJBQTZCLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvd2lmaVJlc291cmNlUG9pbnQuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxDb2xsZWN0TGlzdC5odG1sXCIgbmFtZT1cImNvbGxlY3RMaXN0SHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90cGxBbGFybUxpc3QuaHRtbFwiIG5hbWU9XCJhbGFybUxpc3RIdG1sXCIgLz5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvd2lmaVJlc291cmNlUG9pbnQuY3NzJztcclxuaW1wb3J0ICcuL2NvbGxlY3RMaXN0LmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgJy4vYWxhcm1MaXN0LmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgICcuLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2RldmljZVNvY2tldC5zZXJ2aWNlJztcclxuaW1wb3J0IHtBbGFybVR5cGUsIFNvY2tldFJlc3VsdFR5cGVFbnVtfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtJ1xyXG5pbXBvcnQge01vY2tXaWZpTGlzdCwgTW9ja1dpZmlBbGFybUxpc3R9IGZyb20gJy4vd2lmaVRlc3QnXHJcbmltcG9ydCB7IElkZXZpY2VTb2NrZXQgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvZGV2aWNlU29ja2V0LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5JztcclxuaW1wb3J0IHsgSVNvY2tldEZhY3RvcnkgfSBmcm9tICcuLi8uLi9jb21tb24vZmFjdG9yeS9zb2NrZXQuZmFjdG9yeSc7XHJcbi8vIOivt+axguWcsOWdgFxyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVJlc291cmNlUmV0cmlldmFsU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuLy8g5qOA57Si5Y+C5pWwXHJcbmltcG9ydCB7IFdpZmlTZWFyY2hQYXJhbXMgfSBmcm9tICcuLi8uLi9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvYWR2YW5jZWRTZWFyY2gvYWRWYW5jZVNlYXJjaEVudW0nO1xyXG4vLyDlhazlhbHmlrnms5Ug5pe26Ze05qC85byP5YyWXHJcbmltcG9ydCB7IEF0dHJpYnV0ZUZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvYXR0cmlidXRlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgUGVyc29uQWxhcm1QYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uQWxhcm1FbnVtXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElBbmFseXNpc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FuYWx5c2lzLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0ICQ6IGFueSwgY29sbGVjdExpc3RIdG1sOmFueSwgYWxhcm1MaXN0SHRtbDphbnk7XHJcblxyXG5jbGFzcyBXaWZpUmVzb3VyY2VQb2ludENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICdzb2NrZXRGYWN0b3J5JywgJ2RldmljZVNvY2tldFNlcnZlcicsICd1c2VySW5mb0NhY2hlRmFjdG9yeScsICdyZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UnLCdhbmFseXNpc1NlcnZpY2UnXTtcclxuICAgIFNob3dBbGFybVN0YXR1czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZGV2aWNlTmFtZTpzdHJpbmc7XHJcbiAgICBkZXZpY2VJbmZvOntba2V5OnN0cmluZ106YW55fTtcclxuICAgIGRldmljZUlkOiBzdHJpbmc7XHJcbiAgICBNb2NrV2lmaUxpc3Q6IEFycmF5PGFueT4gPSBbXTsvL01vY2tXaWZpTGlzdCgyMCk7XHJcbiAgICBNb2NrV2lmaUFsYXJtTGlzdDogQXJyYXk8YW55PiA9IFtdOy8vTW9ja1dpZmlBbGFybUxpc3QoMjkpO1xyXG4gICAgbWFya2VyOmFueTtcclxuICAgIHdpZmlDb2xsZWN0UGFyYW06YW55O1xyXG4gICAgd2lmaUFsYXJtUGFyYW06YW55O1xyXG4gICAgaXNTdWJjcmliZVdpRmlMb2c6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNTdWJjcmliZUFsYXJtTG9nOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8v5LuK5pel5Y6G5Y+yXHJcbiAgICBkYXRhTGlzdFRvdGFsOm51bWJlciA9IDA7XHJcbiAgICBzZWFyY2hQYXJhbXM6IFdpZmlTZWFyY2hQYXJhbXMgPSB7XHJcbiAgICAgICAgY3VycmVudFBhZ2U6IDEsXHJcbiAgICAgICAga2V5V29yZDogJycsXHJcbiAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICBpc0FzYzogZmFsc2UsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwYWdlU2l6ZTogMTAsXHJcbiAgICAgICAgaXNGaXJzdFNlYXJjaDogdHJ1ZSxcclxuICAgICAgICB0YXNrSWQ6ICcnLFxyXG4gICAgICAgIHN0YXJ0VGltZTogJycsXHJcbiAgICAgICAgZW5kVGltZTogJycsXHJcbiAgICAgICAgQXJPYmplY3RJRDogW10sXHJcbiAgICAgICAgdXNlcklkOiAnJ1xyXG4gICAgfS8vIOafpeivouWPguaVsFxyXG4gICAgYXR0cmlidXRlRmFjdG9yeTogQXR0cmlidXRlRmFjdG9yeSA9IG5ldyBBdHRyaWJ1dGVGYWN0b3J5KCk7XHJcbiAgICBQZXJzb25BbGFybVBhcmFtczogUGVyc29uQWxhcm1QYXJhbXMgPSB7fSBhcyBQZXJzb25BbGFybVBhcmFtcztcclxuICAgIGFsYXJtZGF0YUxpc3RUb3RhbDpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBzb2NrZXRGYWN0b3J5OiBJU29ja2V0RmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIGRldmljZVNvY2tldFNlcnZlcjogSWRldmljZVNvY2tldCxcclxuICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSByZXNvdXJjZVJldHJpZXZhbFNlcnZpY2U6IElSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6IElBbmFseXNpc1NlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMubWFya2VyID0gdGhpcy4kc2NvcGUubWFya2VyO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubWFya2VyKTtcclxuICAgICAgICB0aGlzLmRldmljZU5hbWUgPSB0aGlzLiRzY29wZS5Qb2ludERlVGFpbC5OYW1lO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlSW5mbyA9IHRoaXMuJHNjb3BlLlBvaW50RGVUYWlsO1xyXG5cclxuICAgICAgICB0aGlzLmRldmljZUlkID0gdGhpcy4kc2NvcGUuUG9pbnREZVRhaWwuSUQ7XHJcblxyXG4gICAgICAgIHRoaXMuc3Vic2NyaWJlV2lmaUNvbGxlY3QoKTtcclxuICAgICAgICB0aGlzLnN1YnNjcmliZVdpZmlBbGFybSgpO1xyXG5cclxuICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMud2lmaUNvbGxlY3RQYXJhbS5pc0NhbmNlbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMud2lmaUFsYXJtUGFyYW0uaXNDYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N1YmNyaWJlV2lGaUxvZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2VTb2NrZXRTZXJ2ZXIuZ2V0V2lmaUluZm8odGhpcy53aWZpQ29sbGVjdFBhcmFtKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISFyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbG9zZSBzb2tpdFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvY2tldEZhY3RvcnkudW5TdWJzY3JpYmUodGhpcy53aWZpQ29sbGVjdFBhcmFtLnNvY2tldFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3ViY3JpYmVXaUZpTG9nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1N1YmNyaWJlQWxhcm1Mb2cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlU29ja2V0U2VydmVyLmdldFdpZmlJbmZvKHRoaXMud2lmaUFsYXJtUGFyYW0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghIXJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsb3NlIHNva2l0XCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS51blN1YnNjcmliZSh0aGlzLndpZmlBbGFybVBhcmFtLnNvY2tldFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU3ViY3JpYmVBbGFybUxvZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy/liJ3lp4vljJbpu5jorqTor7fmsYLmlbDmja5cclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy51c2VySWQgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKTtcclxuICAgICAgICBsZXQgdGltZSA9IHRoaXMuYXR0cmlidXRlRmFjdG9yeS5nZXRDcm9zc1RyYWluVGltZSgxKTtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5zdGFydFRpbWUgPSB0aW1lLmVuZFRpbWUuc3BsaXQoXCIgXCIpWzBdICsgXCIgMDA6MDA6MDBcIjtcclxuICAgICAgICB0aGlzLnNlYXJjaFBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoUGFyYW1zLkFyT2JqZWN0SUQucHVzaCh0aGlzLmRldmljZUlkKTtcclxuICAgICAgICB0aGlzLmdldFNlcnZlck1lc3NhZ2UodGhpcy5zZWFyY2hQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gdGltZS5lbmRUaW1lLnNwbGl0KFwiIFwiKVswXSArIFwiIDAwOjAwOjAwXCI7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lID0gdGltZS5lbmRUaW1lO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuYXJyQ2FtZXJhSWQgPSBbdGhpcy5kZXZpY2VJZF07XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuYWxhcm1UeXBlID0gJ1dpRmknO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHRoaXMuUGVyc29uQWxhcm1QYXJhbXMpO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOivt+axgueUteWbtOWOhuWPsuaVsOaNrlxyXG4gICAgICogQHBhcmFtIHtXaWZpU2VhcmNoUGFyYW1zfSBXaWZpU2VhcmNoUGFyYW1zIOivt+axguWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VydmVyTWVzc2FnZShzZWFyY2hQYXJhbXM6IFdpZmlTZWFyY2hQYXJhbXMpIHtcclxuICAgICAgICB0aGlzLnJlc291cmNlUmV0cmlldmFsU2VydmljZS5hZHZhbmNlZFNlYXJjaEJ5V2lmaShzZWFyY2hQYXJhbXMpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChyZXMuY29kZSA9PT0gMjAwKSAmJiAodHlwZW9mIHJlcy5kYXRhLldpRmkgIT09ICd1bmRlZmluZWQnKSAmJiAocmVzLmRhdGEuV2lGaS5Ub3RhbENvdW50ID4gMCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFMaXN0VG90YWwgPSByZXMuZGF0YS5XaUZpLlRvdGFsQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFycjogQXJyYXk8YW55PiA9IFtdLCBkYXRhID0gcmVzLmRhdGEuV2lGaS5SZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpPGRhdGEubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvYmo6YW55ID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5NYWMgPSBkYXRhW2ldLndpZmlMb2cuTWFjO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouQWNxVGltZSA9IGRhdGFbaV0ud2lmaUxvZy5BY3FUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChvYmopXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTW9ja1dpZmlMaXN0ID0gYXJyO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb27or7fmsYLnlLXlm7Tljoblj7LmiqXorabmlbDmja5cclxuICAgICAqIEBwYXJhbSB7UGVyc29uQWxhcm1QYXJhbXN9IFBlcnNvbkFsYXJtUGFyYW1zIOivt+axguWPguaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0U2VydmVyQWxhcm1NZXNzYWdlKHNlYXJjaFBhcmFtczogUGVyc29uQWxhcm1QYXJhbXMpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc1NlcnZpY2Uuc2VhcmNoUGVyc29uQWxhcm0odGhpcy5QZXJzb25BbGFybVBhcmFtcykudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYWxhcm1kYXRhTGlzdFRvdGFsID0gcmVzLmRhdGEuVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmRhdGEuUmVzdWx0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhLlJlc3VsdFtpXS5BbGFybUxvZy5NYWMgPSByZXMuZGF0YS5SZXN1bHRbaV0uQWxhcm1Mb2cuTm90ZXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxmLk1vY2tXaWZpQWxhcm1MaXN0ID0gcmVzLmRhdGEuUmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy93aWZp6YeH6ZuGXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZVdpZmlDb2xsZWN0KCl7XHJcbiAgICAgICAgdGhpcy53aWZpQ29sbGVjdFBhcmFtID0ge1xyXG4gICAgICAgICAgICB1c2VySUQ6dGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIG9iamVjdElEOiBbdGhpcy5kZXZpY2VJZF0sXHJcbiAgICAgICAgICAgIGlzQ2FuY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ja2V0VHlwZTpTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVXaUZpTG9nLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IHNlbGY9dGhpcztcclxuICAgICAgICB0aGlzLmRldmljZVNvY2tldFNlcnZlci5nZXRXaWZpSW5mbyh0aGlzLndpZmlDb2xsZWN0UGFyYW0pLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgaWYgKCEhcmVzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU3ViY3JpYmVXaUZpTG9nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29ja2V0RmFjdG9yeS5zdWJzY3JpYmUoU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlV2lGaUxvZywoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyOiBBcnJheTxhbnk+ID0gZGF0YS5jb25jYXQoc2VsZi5Nb2NrV2lmaUxpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyLmxlbmd0aD4xMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLk1vY2tXaWZpTGlzdCA9IGFyci5zbGljZSgwLDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLk1vY2tXaWZpTGlzdCA9IGFycjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFMaXN0VG90YWwgKz0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzb2NrZXQgc3RhcnQgU3ViY3JpYmVXaUZpTG9nJywgZGF0YSwgc2VsZi5Nb2NrV2lmaUxpc3QubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy93aWZp5oql6K2mXHJcbiAgICBwcml2YXRlIHN1YnNjcmliZVdpZmlBbGFybSgpe1xyXG5cclxuICAgICAgICB0aGlzLndpZmlBbGFybVBhcmFtID0ge1xyXG4gICAgICAgICAgICB1c2VySUQ6dGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCksXHJcbiAgICAgICAgICAgIG9iamVjdElEOiBbdGhpcy5kZXZpY2VJZF0sXHJcbiAgICAgICAgICAgIGlzQ2FuY2VsOiBmYWxzZSxcclxuICAgICAgICAgICAgc29ja2V0VHlwZTpTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGFybUxvZyxcclxuICAgICAgICAgICAgYWxhcm1UeXBlOkFsYXJtVHlwZS5XaWZpXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgc2VsZiA9dGhpcztcclxuICAgICAgICB0aGlzLmRldmljZVNvY2tldFNlcnZlci5nZXRXaWZpSW5mbyh0aGlzLndpZmlBbGFybVBhcmFtKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgIGlmICghIXJlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc1N1YmNyaWJlQWxhcm1Mb2cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zb2NrZXRGYWN0b3J5LnN1YnNjcmliZShTb2NrZXRSZXN1bHRUeXBlRW51bS5TdWJzY3JpYmVBbGFybUxvZywoZGF0YTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYuZGV2aWNlSWQgIT0gZGF0YVswXS5BbGFybUxvZy5PYmplY3RJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhcnI6IEFycmF5PGFueT4gPSBkYXRhLmNvbmNhdChzZWxmLk1vY2tXaWZpQWxhcm1MaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXJyLmxlbmd0aD4xMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLk1vY2tXaWZpQWxhcm1MaXN0ID0gYXJyLnNsaWNlKDAsMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuTW9ja1dpZmlBbGFybUxpc3QgPSBhcnI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5hbGFybWRhdGFMaXN0VG90YWwgKz1kYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NvY2tldCBzdGFydCBTdWJjcmliZVdpRmlMb2cgUGVyY2VpdmVEYXRhJywgZGF0YSwgc2VsZi5Nb2NrV2lmaUFsYXJtTGlzdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd0FsYXJtKCl7XHJcbiAgICAgICAgdGhpcy5TaG93QWxhcm1TdGF0dXMgPSAhdGhpcy5TaG93QWxhcm1TdGF0dXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TlpJrph4fpm4ZcclxuICAgIHB1YmxpYyBsb29rTW9yZUNvbGxlY3QoZmxhZzpib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IGxheWVyOiBhbnksICRkZXN0cm95OiBGdW5jdGlvbiwgSUQ6YW55LG5hbWU6c3RyaW5nLHN0YXR1czpib29sZWFufSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5JRCA9IHRoaXMuZGV2aWNlSWQ7XHJcbiAgICAgICAgc2NvcGUubmFtZSA9IHRoaXMuZGV2aWNlTmFtZTtcclxuICAgICAgICBzY29wZS5zdGF0dXMgPSBmbGFnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfljoblj7JXaS1GaemHh+mbhicsICdmb250LXdlaWdodDogYm9sZDtiYWNrZ3JvdW5kLWNvbG9yOiAjRjZGOEZCO2NvbG9yOiAjNjA2MDYwO2hlaWdodDogNDBweDsnXSxcclxuICAgICAgICAgICAgYXJlYTogWyc4MTBweCcsICc1MDBweCddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb2xsZWN0TGlzdEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mm7TlpJrmiqXoraZcclxuICAgIHB1YmxpYyBsb29rTW9yZUFsYXJtKCkge1xyXG4gICAgICAgIGxldCBzY29wZTp7bGF5ZXI6YW55LCRkZXN0cm95OiBGdW5jdGlvbixJRDphbnksbmFtZTpzdHJpbmd9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLm5hbWUgPSB0aGlzLmRldmljZU5hbWU7XHJcbiAgICAgICAgc2NvcGUuSUQgPSB0aGlzLmRldmljZUlkO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHNraW46ICduby1zY3JvbGwnLFxyXG4gICAgICAgICAgICB0aXRsZTogWyfljoblj7LmiqXorabkv6Hmga8nLCAnZm9udC13ZWlnaHQ6IGJvbGQ7YmFja2dyb3VuZC1jb2xvcjogI0Y2RjhGQjtjb2xvcjogIzYwNjA2MDtoZWlnaHQ6IDQwcHg7J10sXHJcbiAgICAgICAgICAgIGFyZWE6IFsnODEwcHgnLCAnNTAwcHgnXSxcclxuICAgICAgICAgICAgY29udGVudDogYWxhcm1MaXN0SHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFwV2lmaVBvcHVsQ2xvc2UoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXhpdCB3aWZpIHBvcHVwJyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignd2lmaVJlc291cmNlUG9pbnRDb250cm9sbGVyJywgV2lmaVJlc291cmNlUG9pbnRDb250cm9sbGVyKTsiXX0=
