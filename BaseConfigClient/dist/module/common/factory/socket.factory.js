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
define(["require", "exports", "../app/main.app", "../portrait-tool", "../../../core/server/SocketPushModel", "../../../core/server/enum/SocketResultTypeEnum", "../../../config", "../../../core/enum/ObjectType", "socket.io", "./userinfo.cache.factory", "config", "../services/deviceSocket.service"], function (require, exports, main_app_1, portrait_tool_1, SocketPushModel_1, SocketResultTypeEnum_1, config_1, ObjectType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var io = require("socket.io");
    var NEED_BACK_SOCKET_TYPE = (function () {
        var result = {};
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.SubcribeAccessLog] = true;
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog] = true;
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.UserOnLine] = true;
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.CameraOnLine] = true;
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.ServerOnLine] = true;
        result[SocketResultTypeEnum_1.SocketResultTypeEnum.SearchFace] = true;
        return result;
    })();
    var SocketSubModel = (function (_super) {
        __extends(SocketSubModel, _super);
        function SocketSubModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.needExtraSub = false;
            return _this;
        }
        return SocketSubModel;
    }(SocketPushModel_1.default));
    var SocketFactory = (function () {
        function SocketFactory(userInfoCacheFactory, deviceSocketServer) {
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.deviceSocketServer = deviceSocketServer;
            this.subModels = {};
            this.init();
        }
        SocketFactory.prototype.unSubscribe = function (type, id) {
            var arr = this.subModels[type];
            if (arr && arr.length > 0 && id != null) {
                var i = void 0, len = void 0;
                for (i = 0, len = arr.length; i < len; i++) {
                    if (arr[i].id === id) {
                        this._unSubscribe(arr[i]);
                        arr.splice(i, 1);
                        i--;
                        len--;
                        break;
                    }
                }
                if (arr.length === 0) {
                    this.subModels[type] = null;
                }
            }
            else if (arr && arr.length > 0) {
                var i = void 0, len = void 0;
                for (i = 0, len = arr.length; i < len; i++) {
                    this._unSubscribe(arr[i]);
                    arr.splice(i, 1);
                    i--;
                    len--;
                }
            }
            if (arr && arr.length === 0) {
                this.subModels[type] = null;
            }
        };
        SocketFactory.prototype.one = function (type, callback, objectId) {
            var model = new SocketSubModel();
            model.callback = callback;
            model.socketType = type;
            model.id = portrait_tool_1.default.getUUID();
            model.isOne = true;
            if (objectId) {
                model.objectID = objectId;
            }
            if (NEED_BACK_SOCKET_TYPE[model.socketType]) {
                model.needExtraSub = true;
            }
            return this._subscribe(model);
        };
        SocketFactory.prototype.destroy = function () {
            this.subModels = null;
            this.socket.close();
            this.socket = null;
        };
        SocketFactory.prototype.subscribe = function (type, callback, objectId, alarmType) {
            var model = new SocketSubModel();
            model.callback = callback;
            model.socketType = type;
            model.id = portrait_tool_1.default.getUUID();
            if (objectId) {
                model.objectID = objectId;
            }
            if (alarmType) {
                model.alarmType = alarmType;
            }
            if (NEED_BACK_SOCKET_TYPE[model.socketType]) {
                model.needExtraSub = true;
            }
            return this._subscribe(model);
        };
        SocketFactory.prototype.init = function () {
            this.socket = io(SocketFactory.URL, this.getSocketConfig());
            this.userId = this.userInfoCacheFactory.getCurrentUserId();
            if (this.userId == null) {
                console.error("socket init error: userId is null!");
            }
            this.bindEvent();
        };
        SocketFactory.prototype.handleMessage = function (dataStr) {
            var datas = JSON.parse(dataStr);
            var _map = {};
            if (datas && angular.isArray(datas) && datas.length > 0) {
                var i = void 0, len = void 0, temp = void 0;
                for (i = 0, len = datas.length; i < len; i++) {
                    temp = datas[i];
                    if (!_map[temp.resultType]) {
                        _map[temp.resultType] = [];
                    }
                    _map[temp.resultType].push(temp.result);
                }
            }
            else if (datas) {
                if (!_map[datas.resultType]) {
                    _map[datas.resultType] = [];
                }
                _map[datas.resultType].push(datas.result);
            }
            var key;
            for (key in _map) {
                this.messageDistribution(key, _map[key]);
            }
            _map = null;
        };
        SocketFactory.prototype.handleMessageByAlarm = function (data) {
            console.log(data);
            console.log('dadadasdadasda');
        };
        SocketFactory.prototype.messageDistribution = function (resultType, datas) {
            var i, len, arr = this.subModels[resultType], j = 0;
            if (arr && arr.length > 0) {
                for (i = 0, len = arr.length; i < len; i++, j++) {
                    (function (model, result, index) {
                        setTimeout(function () {
                            console.debug("执行推送", result, index);
                            model.callback(result);
                        }, 10);
                    })(arr[i], datas, j);
                    if (arr[i].isOne) {
                        this._unSubscribe(arr[i]);
                        arr.splice(i, 1);
                        i--;
                        len--;
                    }
                }
            }
            else {
                console.log(resultType, '推送数据没有模块使用!即将取消订阅');
            }
        };
        SocketFactory.prototype.unSubInvalidBusiness = function (resultType, data) {
            if (resultType !== SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAllAlarmData) {
                var params = {
                    userID: this.userInfoCacheFactory.getCurrentUserId(),
                    isCancel: true,
                    socketType: resultType,
                };
                if (resultType === SocketResultTypeEnum_1.SocketResultTypeEnum.SubscribeAlarmLog) {
                    if (data.oriId) {
                        params.alarmType = SocketResultTypeEnum_1.AlarmType.Vehicle;
                    }
                    if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                        params.alarmType = SocketResultTypeEnum_1.AlarmType.Face;
                    }
                    else if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType_1.ObjectType.ElectronicFence.value) {
                        params.alarmType = SocketResultTypeEnum_1.AlarmType.Efence;
                    }
                    else if (data.AlarmLog && data.AlarmLog.ObjectType === ObjectType_1.ObjectType.Wifi.value) {
                        params.alarmType = SocketResultTypeEnum_1.AlarmType.Wifi;
                    }
                }
            }
        };
        SocketFactory.prototype.getSocketConfig = function () {
            return {
                reconnectionAttempts: 20
            };
        };
        SocketFactory.prototype.bindEvent = function () {
            var _this = this;
            var userId = this.userId;
            this.socket.on('connect', function (data) {
                console.log("socket connect" + SocketFactory.URL + "-success!");
                _this._reSubscribe();
            });
            this.socket.on(userId, function (data) {
                console.log("从服务器返回来的消息", data);
                _this.handleMessage(data);
            });
            this.socket.on('message', function (data) {
                console.log("从服务器返回来的消息 -- message");
                _this.handleMessageByAlarm(data);
            });
            this.socket.on("reconnect_failed", function () {
                console.error("socket test reconnect many-times but all failed!");
            });
            this.socket.on('disconnect', function () {
                console.error("socket is disconnect with server!");
            });
            this.socket.on('reconnect', function (attempt) {
                console.debug("socket trigger reconnect", attempt);
                _this._reSubscribe();
            });
            this.socket.on('error', function (error) {
                console.error("socket trigger error!", error);
            });
        };
        SocketFactory.prototype._subscribe = function (subModel) {
            if (!this.subModels[subModel.socketType]) {
                this.subModels[subModel.socketType] = new Array();
            }
            this.subModels[subModel.socketType].push(subModel);
            if (subModel.needExtraSub) {
                this._subscribe2Server(subModel);
            }
            return subModel.id;
        };
        SocketFactory.prototype._subscribe2Server = function (model) {
            if (this.socket) {
                this.socket.emit("NettyCallBackListener", this.getPushModel(model, false));
            }
            else {
                console.error("subscribe2Server error: this.socket is null");
            }
        };
        SocketFactory.prototype._unSubscribe = function (model) {
            if (model && model.needExtraSub) {
                this._unSubscribe2Server(model);
            }
        };
        SocketFactory.prototype._unSubscribe2Server = function (model) {
            if (this.socket) {
                this.socket.emit("NettyCallBackListener", this.getPushModel(model, true));
            }
            else {
                console.error("subscribe2Server error: this.socket is null");
            }
        };
        SocketFactory.prototype._reSubscribe = function () {
            this._reSubscribeMain();
            this._reSubscribeExtra();
        };
        SocketFactory.prototype._reSubscribeMain = function () {
            var pushModel = new SocketPushModel_1.default();
            pushModel.userID = this.userId;
            pushModel.socketType = SocketResultTypeEnum_1.SocketResultTypeEnum.SubcribeAccessLog;
            pushModel.alarmType = 'Face';
            this.socket.emit("NettyCallBackListener", pushModel);
        };
        SocketFactory.prototype._reSubscribeExtra = function () {
            var needExtra = NEED_BACK_SOCKET_TYPE;
            var subModels = this.subModels;
            var key, arr, i, len;
            for (key in needExtra) {
                arr = subModels[key];
                if (arr && arr.length > 0) {
                    for (i = 0, len = arr.length; i < len; i++) {
                        this._subscribe2Server(arr[i]);
                    }
                }
            }
        };
        SocketFactory.prototype.getPushModel = function (model, isCancel) {
            var pushModel = new SocketPushModel_1.default();
            pushModel.userID = this.userId;
            pushModel.socketType = model.socketType;
            if (isCancel) {
                pushModel.isCancel = true;
            }
            if (model.objectID) {
                pushModel.objectID = model.objectID;
            }
            if (model.alarmType) {
                pushModel.alarmType = model.alarmType;
            }
            return pushModel;
        };
        SocketFactory.URL = config_1.default.SOCKET_URL;
        SocketFactory.$inject = ["userInfoCacheFactory", 'deviceSocketServer'];
        return SocketFactory;
    }());
    main_app_1.app.service("socketFactory", SocketFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3Rvcnkvc29ja2V0LmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQWdCQSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFNOUIsSUFBTSxxQkFBcUIsR0FBRyxDQUFDO1FBQzNCLElBQUksTUFBTSxHQUFHLEVBQWdDLENBQUM7UUFDOUMsTUFBTSxDQUFDLDJDQUFvQixDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3RELE1BQU0sQ0FBQywyQ0FBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0RCxNQUFNLENBQUMsMkNBQW9CLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9DLE1BQU0sQ0FBQywyQ0FBb0IsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDakQsTUFBTSxDQUFDLDJDQUFvQixDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNqRCxNQUFNLENBQUMsMkNBQW9CLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQThCTDtRQUE2QixrQ0FBZTtRQUE1QztZQUFBLHFFQU9DO1lBRkcsa0JBQVksR0FBWSxLQUFLLENBQUM7O1FBRWxDLENBQUM7UUFBRCxxQkFBQztJQUFELENBUEEsQUFPQyxDQVA0Qix5QkFBZSxHQU8zQztJQXVCRDtRQXFISSx1QkFBb0Isb0JBQTJDLEVBQVUsa0JBQWlDO1lBQXRGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWU7WUFDdEcsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUE4QyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBL0dELG1DQUFXLEdBQVgs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b3J5L3NvY2tldC5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwic29ja2V0LmlvXCI7XHJcbmltcG9ydCBQb3J0cmFpdFRvb2wgZnJvbSBcIi4uL3BvcnRyYWl0LXRvb2xcIjtcclxuaW1wb3J0IHtJVXNlckluZm9DYWNoZUZhY3Rvcnl9IGZyb20gXCIuL3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCBTb2NrZXRQdXNoTW9kZWwgZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL1NvY2tldFB1c2hNb2RlbFwiO1xyXG5pbXBvcnQge0FsYXJtVHlwZSwgU29ja2V0UmVzdWx0VHlwZUVudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL1NvY2tldFJlc3VsdFR5cGVFbnVtXCI7XHJcbmltcG9ydCBcImNvbmZpZ1wiO1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gXCIuLi8uLi8uLi9jb25maWdcIjtcclxuaW1wb3J0IHtJZGV2aWNlU29ja2V0fSBmcm9tICcuLi9zZXJ2aWNlcy9kZXZpY2VTb2NrZXQuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vc2VydmljZXMvZGV2aWNlU29ja2V0LnNlcnZpY2UnO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZVwiO1xyXG5cclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5sZXQgaW8gPSByZXF1aXJlKFwic29ja2V0LmlvXCIpO1xyXG5cclxuLyoqXHJcbiAqIOWcqOi/memHjOmFjee9rumcgOimgeWQkeWQjuWPsOmineWkluiuoumYheeahOaVsOaNruexu+Wei1xyXG4gKiBAdHlwZSB7e319XHJcbiAqL1xyXG5jb25zdCBORUVEX0JBQ0tfU09DS0VUX1RZUEUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gICAgcmVzdWx0W1NvY2tldFJlc3VsdFR5cGVFbnVtLlN1YmNyaWJlQWNjZXNzTG9nXSA9IHRydWU7XHJcbiAgICByZXN1bHRbU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxhcm1Mb2ddID0gdHJ1ZTtcclxuICAgIHJlc3VsdFtTb2NrZXRSZXN1bHRUeXBlRW51bS5Vc2VyT25MaW5lXSA9IHRydWU7XHJcbiAgICByZXN1bHRbU29ja2V0UmVzdWx0VHlwZUVudW0uQ2FtZXJhT25MaW5lXSA9IHRydWU7XHJcbiAgICByZXN1bHRbU29ja2V0UmVzdWx0VHlwZUVudW0uU2VydmVyT25MaW5lXSA9IHRydWU7XHJcbiAgICByZXN1bHRbU29ja2V0UmVzdWx0VHlwZUVudW0uU2VhcmNoRmFjZV0gPSB0cnVlO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufSkoKTtcclxuXHJcbi8vIGh0dHBzOi8vc29ja2V0LmlvL2RvY3MvY2xpZW50LWFwaS9cclxuaW50ZXJmYWNlIFNvY2tldENvbmZpZyB7XHJcbiAgICByZWNvbm5lY3Rpb25BdHRlbXB0cz86IG51bWJlcjsgLy8g5bCd6K+V6YeN6L+e55qE5qyh5pWwICBudW1iZXIgb2YgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXAgKEluZmluaXR5KVxyXG4gICAgcmVjb25uZWN0aW9uPzogYm9vbGVhbjsgLy8gd2hldGhlciB0byByZWNvbm5lY3QgYXV0b21hdGljYWxseSAodHJ1ZSlcclxuICAgIHJlY29ubmVjdGlvbkRlbGF5PzogbnVtYmVyOyAvLyBob3cgbG9uZyB0byBpbml0aWFsbHkgd2FpdCBiZWZvcmUgYXR0ZW1wdGluZyBhIG5ldyByZWNvbm5lY3Rpb24gKDEwMDApLiBBZmZlY3RlZCBieSArLy0gcmFuZG9taXphdGlvbkZhY3RvcixcclxuICAgIHJlY29ubmVjdGlvbkRlbGF5TWF4PzogbnVtYmVyOyAvLyBtYXhpbXVtIGFtb3VudCBvZiB0aW1lIHRvIHdhaXQgYmV0d2VlbiByZWNvbm5lY3Rpb25zICg1MDAwKS4gRWFjaCBhdHRlbXB0IGluY3JlYXNlcyB0aGUgcmVjb25uZWN0aW9uIGRlbGF5IGJ5IDJ4IGFsb25nIHdpdGggYSByYW5kb21pemF0aW9uIGFzIGFib3ZlXHJcbiAgICByYW5kb21pemF0aW9uRmFjdG9yPzogbnVtYmVyOyAvLyAgKDAuNSksIDAgPD0gcmFuZG9taXphdGlvbkZhY3RvciA8PSAxXHJcbiAgICB0aW1lb3V0PzogbnVtYmVyOyAvLyBjb25uZWN0aW9uIHRpbWVvdXQgYmVmb3JlIGEgY29ubmVjdF9lcnJvciBhbmQgY29ubmVjdF90aW1lb3V0IGV2ZW50cyBhcmUgZW1pdHRlZCAoMjAwMDApXHJcbiAgICBhdXRvQ29ubmVjdD86IGJvb2xlYW47IC8vIGJ5IHNldHRpbmcgdGhpcyBmYWxzZSwgeW91IGhhdmUgdG8gY2FsbCBtYW5hZ2VyLm9wZW4gd2hlbmV2ZXIgeW91IGRlY2lkZSBpdCdzIGFwcHJvcHJpYXRlXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNvY2tldEZhY3Rvcnkge1xyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Hlrprkuovku7ZcclxuICAgICAqIEBwYXJhbSB0eXBlIOe7keWumueahHJlc3VsdFR5cGXnsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayDop6blj5HnmoTlm57osIPmlrnms5VcclxuICAgICAqIEByZXR1cm4g57uR5a6a55qE5ZSv5LiAaWQo55So5LqO6Kej57uRKVxyXG4gICAgICovXHJcbiAgICBzdWJzY3JpYmUodHlwZTogc3RyaW5nLCBjYWxsYmFjazogRnVuY3Rpb24sIG9iamVjdElkPzogc3RyaW5nLCBhbGFybVR5cGU/OiBzdHJpbmcpOiBzdHJpbmc7IC8vIOe7keWumuS6i+S7tlxyXG4gICAgdW5TdWJzY3JpYmUodHlwZTogc3RyaW5nLCBpZD86IHN0cmluZyk6IHZvaWQ7IC8vIOino+e7keS6i+S7tlxyXG4gICAgb25lKHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKTogdm9pZDsgLy8g6K6i6ZiF5LiA5qyh5oCn55qE5LqL5Lu2LCDlvZPkuovku7bov5Tlm57mtojmga/ml7YsIOiHquWKqOino+e7kVxyXG4gICAgZGVzdHJveSgpOiB2b2lkOyAvLyDplIDmr4Fzb2NrZXTlrp7kvotcclxufVxyXG5cclxuLyoqXHJcbiAqIOavj+S4quazqOWGjOeahFNvY2tldFN1Yk1vZGVs5a+56LGhXHJcbiAqIOe7p+aJv+S6jlNvY2tldFB1c2hNb2RlbFxyXG4gKi9cclxuY2xhc3MgU29ja2V0U3ViTW9kZWwgZXh0ZW5kcyBTb2NrZXRQdXNoTW9kZWwge1xyXG4gICAgaWQ6IHN0cmluZzsgLy8g5q+P5LiA5LiqbW9kZWznmoR1dWlkXHJcbiAgICB0eXBlOiBzdHJpbmc7IC8vIOaOpeWPl+eahOaVsOaNruexu+Wei1xyXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uOyAvLyDojrflvpfmlbDmja7nmoTlm57osIPlh73mlbBcclxuICAgIGlzT25lOiBib29sZWFuOyAvLyDmmK/lkKbmmK/ljZXmrKHnu5HlrprlsLHnu5PmnZ/orqLpmIXnmoTlr7nosaFcclxuICAgIG5lZWRFeHRyYVN1YjogYm9vbGVhbiA9IGZhbHNlOyAvLyDmmK/lkKbpnIDopoHpop3lpJblkJHlkI7lj7DorqLpmIXkuIDmrKFcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDlkI7lj7DkvKDmnaXnmoTmlbDmja7nsbvlnotcclxuICovXHJcbmludGVyZmFjZSBEYXRhTW9kZWwge1xyXG4gICAgLy8g57uT5p6c57G75Z6LXHJcbiAgICByZXN1bHRUeXBlOiBzdHJpbmc7XHJcbiAgICAvLyDnu5PmnpxcclxuICAgIHJlc3VsdDogYW55O1xyXG59XHJcblxyXG50eXBlIERhdGFNb2RlbFJlc3VsdCA9IGFueTtcclxuXHJcbi8qKlxyXG4gKiB3ZWJzb2NrZXTnu5/kuIDmlbDmja7nu5Hlrprlt6XljoJcclxuICog5omA5pyJ5raI5oGv5o6o6YCB5Yid5aeL5YyW6YO95Zyo5q2k5aSE5a6M5oiQXHJcbiAqIOaJgOacieWKn+iDveaooeWdl+mDveW6lOivpemAmui/h+azqOWGjGZhY3RvcnnmnaXnm5HlkKx3ZWJzb2NrZXTmjqjpgIHov4fmnaXnmoTmtojmga9cclxuICog6K6i6ZiF5qih5byP5YyF5ZCr5Lik56eNLFxyXG4gKiAx44CB5LiA56eN5piv5pyA5Z+65pys55qE5YaF6YOo55qE6K6i6ZiFLCDkuI3lkJHlkI7lj7Dor7fmsYLmlrDnmoTorqLpmIUo5aaC5p6c5pm66IO95qOA57Si55u45YWz55qE5Yqf6IO9LCDov5jmnInlhajlsYDnmoTmiqXoraYpXHJcbiAqIDLjgIHlj6bkuIDnp43mmK/pnIDopoHlkJHlkI7lj7Dor7fmsYLmlrDnmoTorqLpmIUo6I635Y+W5oyH5a6a5pGE5YOP5py655qE5oql6K2m5L+h5oGvLOaKk+aLjeS/oeaBr+etiSlcclxuICog5b2Td2Vic29ja2V05byC5bi45pat57q/5ZCOLCDpnIDopoHph43mlrDorqLpmIXpop3lpJborqLpmIXor7fmsYLnmoTlj4LmlbBcclxuICovXHJcbmNsYXNzIFNvY2tldEZhY3RvcnkgaW1wbGVtZW50cyBJU29ja2V0RmFjdG9yeSB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgVVJMID0gQ29uZmlnLlNPQ0tFVF9VUkw7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5bmtojorqLpmIVcclxuICAgICAqIEBwYXJhbSB0eXBlXHJcbiAgICAgKiBAcGFyYW0gaWRcclxuICAgICAqL1xyXG4gICAgdW5TdWJzY3JpYmUodHlwZTogc3RyaW5nLCBpZD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhcnIgPSB0aGlzLnN1Yk1vZGVsc1t0eXBlXTtcclxuICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPiAwICYmIGlkICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gaWTkuI3kuLrnqbpcclxuICAgICAgICAgICAgbGV0IGksIGxlbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyW2ldLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWPlua2iOiuoumYhVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VuU3Vic2NyaWJlKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5bCG6K6i6ZiF5a+56LGh5LuO57yT5a2Y5pWw57uE5Lit56e76ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFyci5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIOW9k+aVsOe7hOS4uuepuuaXtiDmuIXnqbrnvJPlrZjlr7nosaFcclxuICAgICAgICAgICAgICAgIHRoaXMuc3ViTW9kZWxzW3R5cGVdID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIOa4heepuuW9k+WJjXR5cGXnmoTmiYDmnIlcclxuICAgICAgICAgICAgbGV0IGksIGxlbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDlj5bmtojorqLpmIVcclxuICAgICAgICAgICAgICAgIHRoaXMuX3VuU3Vic2NyaWJlKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICAvLyDlsIborqLpmIXlr7nosaHku47nvJPlrZjmlbDnu4TkuK3np7vpmaRcclxuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICBsZW4tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1Yk1vZGVsc1t0eXBlXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uZSh0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb2JqZWN0SWQ/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBtb2RlbDogU29ja2V0U3ViTW9kZWwgPSBuZXcgU29ja2V0U3ViTW9kZWwoKTtcclxuICAgICAgICBtb2RlbC5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIG1vZGVsLnNvY2tldFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIG1vZGVsLmlkID0gUG9ydHJhaXRUb29sLmdldFVVSUQoKTtcclxuICAgICAgICBtb2RlbC5pc09uZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKG9iamVjdElkKSB7XHJcbiAgICAgICAgICAgIG1vZGVsLm9iamVjdElEID0gb2JqZWN0SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChORUVEX0JBQ0tfU09DS0VUX1RZUEVbbW9kZWwuc29ja2V0VHlwZV0pIHtcclxuICAgICAgICAgICAgbW9kZWwubmVlZEV4dHJhU3ViID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETyDplIDmr4Fzb2NrZXTlr7nosaEsIOi/mOacquWujOaIkCByZXNvbHZlOiB3eXJcclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdWJNb2RlbHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6i6ZiF5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gdHlwZVxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXHJcbiAgICAgKiBAcGFyYW0gb2JqZWN0SWQg5Y+v6YCJLCDlkI7lj7DpnIDopoHmjqXmlLbnmoTkuIDkupvpop3lpJblj4LmlbBcclxuICAgICAqIEBwYXJhbSBhbGFybVR5cGVcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHN1YnNjcmliZSh0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgb2JqZWN0SWQ/OiBzdHJpbmcsIGFsYXJtVHlwZT86IHN0cmluZyk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGxldCBtb2RlbDogU29ja2V0U3ViTW9kZWwgPSBuZXcgU29ja2V0U3ViTW9kZWwoKTtcclxuICAgICAgICBtb2RlbC5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIG1vZGVsLnNvY2tldFR5cGUgPSB0eXBlO1xyXG4gICAgICAgIG1vZGVsLmlkID0gUG9ydHJhaXRUb29sLmdldFVVSUQoKTtcclxuICAgICAgICBpZiAob2JqZWN0SWQpIHtcclxuICAgICAgICAgICAgbW9kZWwub2JqZWN0SUQgPSBvYmplY3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFsYXJtVHlwZSkge1xyXG4gICAgICAgICAgICBtb2RlbC5hbGFybVR5cGUgPSBhbGFybVR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOWIpOaWreW9k+WJjeiuoumYheexu+Wei+aYr+WQpumcgOimgeWQkeWQjuWPsOmineWkluiuoumYhVxyXG4gICAgICAgIGlmIChORUVEX0JBQ0tfU09DS0VUX1RZUEVbbW9kZWwuc29ja2V0VHlwZV0pIHtcclxuICAgICAgICAgICAgbW9kZWwubmVlZEV4dHJhU3ViID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N1YnNjcmliZShtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj6rmiafooYzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8oU29ja2V0RmFjdG9yeS5VUkwsIHRoaXMuZ2V0U29ja2V0Q29uZmlnKCkpO1xyXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy51c2VySW5mb0NhY2hlRmFjdG9yeS5nZXRDdXJyZW50VXNlcklkKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlcklkID09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNvY2tldCBpbml0IGVycm9yOiB1c2VySWQgaXMgbnVsbCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCJ1c2VySW5mb0NhY2hlRmFjdG9yeVwiLCAnZGV2aWNlU29ja2V0U2VydmVyJ107XHJcblxyXG4gICAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIHN1Yk1vZGVsczogeyBba2V5OiBzdHJpbmddOiBBcnJheTxTb2NrZXRTdWJNb2RlbD4gfTtcclxuICAgIC8vIOW9k+WJjeeZu+W9leeahOeUqOaIt2lkXHJcbiAgICBwcml2YXRlIHVzZXJJZDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSwgcHJpdmF0ZSBkZXZpY2VTb2NrZXRTZXJ2ZXI6IElkZXZpY2VTb2NrZXQpIHtcclxuICAgICAgICB0aGlzLnN1Yk1vZGVscyA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogQXJyYXk8U29ja2V0U3ViTW9kZWw+IH07XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpITnkIbkv6Hmga9cclxuICAgICAqIEBwYXJhbSBkYXRhU3RyXHJcbiAgICAgKi9cclxuICAgIC8vQXJyYXk8RGF0YU1vZGVsPiAmIERhdGFNb2RlbFxyXG4gICAgcHJpdmF0ZSBoYW5kbGVNZXNzYWdlKGRhdGFTdHI6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhczogQXJyYXk8RGF0YU1vZGVsPiAmIERhdGFNb2RlbCA9IEpTT04ucGFyc2UoZGF0YVN0cik7Ly91cERhdGVCeSBrZXkg5ZCO5Y+w546w5Zyo57uf5LiA5Lyg5a2X56ym5Liy6L+H5p2lXHJcbiAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcIuS7juacjeWKoeWZqOi/lOWbnuadpeeahOa2iOaBr1wiKTtcclxuICAgICAgICAvLyBlZGl0IDIwMTcuOC4xMCDnlLHkuo5BcnJheTxEYXRhTW9kZWw+5Y+v6IO95pyJ5aSa5p2h5pWw5o2uLCDmr4/mnaFEYXRhTW9kZWzpg73kvJrop6blj5HkuIDmrKHkuJrliqHlsYLnmoTmjqjpgIFcclxuICAgICAgICAvLyDov5nkvJrlvJXotbfnlYzpnaLmuLLmn5PpopHnjofov4flv6vnmoTpl67popgsIOaVhei/memHjOWFiOW+queOr+S4gOmBjeaVsOaNriwg5YaN57uf5LiA6Kem5Y+R5LiA5qyh5Lia5Yqh5bGC5o6o6YCBXHJcbiAgICAgICAgbGV0IF9tYXAgPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IEFycmF5PERhdGFNb2RlbFJlc3VsdD4gfTtcclxuXHJcbiAgICAgICAgaWYgKGRhdGFzICYmIGFuZ3VsYXIuaXNBcnJheShkYXRhcykgJiYgZGF0YXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaSwgbGVuLCB0ZW1wO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBkYXRhcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGVtcCA9IGRhdGFzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfbWFwW3RlbXAucmVzdWx0VHlwZV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWFwW3RlbXAucmVzdWx0VHlwZV0gPSBbXSBhcyBBcnJheTxEYXRhTW9kZWxSZXN1bHQ+O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX21hcFt0ZW1wLnJlc3VsdFR5cGVdLnB1c2godGVtcC5yZXN1bHQgYXMgRGF0YU1vZGVsUmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YXMpIHtcclxuICAgICAgICAgICAgaWYgKCFfbWFwW2RhdGFzLnJlc3VsdFR5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICBfbWFwW2RhdGFzLnJlc3VsdFR5cGVdID0gW10gYXMgQXJyYXk8RGF0YU1vZGVsUmVzdWx0PjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfbWFwW2RhdGFzLnJlc3VsdFR5cGVdLnB1c2goZGF0YXMucmVzdWx0IGFzIERhdGFNb2RlbFJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDlvqrnjq9tYXAsIOagueaNruexu+Wei+aOqOmAgeS/oeaBr1xyXG4gICAgICAgIGxldCBrZXk7XHJcbiAgICAgICAgZm9yIChrZXkgaW4gX21hcCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VEaXN0cmlidXRpb24oa2V5LCBfbWFwW2tleV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX21hcCA9IG51bGwgYXMgYW55O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZU1lc3NhZ2VCeUFsYXJtKGRhdGE6IGFueSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYWRhZGFzZGFkYXNkYScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u57uT5p6c57G75Z6LLOmAieaLqeimgeaOqOmAgeeahOWvueixoSzlubbmjqjpgIFcclxuICAgICAqIEBwYXJhbSByZXN1bHRUeXBlIOe7k+aenOa2iOaBr+exu+Wei1xyXG4gICAgICogQHBhcmFtIGRhdGFzIOe7k+aenOaVsOe7hFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VEaXN0cmlidXRpb24ocmVzdWx0VHlwZTogc3RyaW5nLCBkYXRhczogQXJyYXk8RGF0YU1vZGVsUmVzdWx0Pikge1xyXG4gICAgICAgIGxldCBpLCBsZW4sIGFyciA9IHRoaXMuc3ViTW9kZWxzW3Jlc3VsdFR5cGVdLCBqID0gMDtcclxuICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKywgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDov5nph4zkvb/nlKjlvILmraXov5vooYzosIPnlKgsIOS4jemYu+WhnuWFtuS7lueVjOmdolxyXG4gICAgICAgICAgICAgICAgLy8g55So6Zet5YyFLCDpmLLmraLlj5jph4/lj5jljJZcclxuICAgICAgICAgICAgICAgIChmdW5jdGlvbiAobW9kZWw6IFNvY2tldFN1Yk1vZGVsLCByZXN1bHQ6IEFycmF5PERhdGFNb2RlbFJlc3VsdD4sIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIuaJp+ihjOaOqOmAgVwiLCByZXN1bHQsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5o6o6YCB57uZ5Lia5Yqh5bGC55qE5pWw5o2u5LiA5a6a5piv5pWw57uE5qC85byPXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsLmNhbGxiYWNrKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgICAgICAgICAgfSkoYXJyW2ldLCBkYXRhcywgaik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFycltpXS5pc09uZSkgeyAvLyDlpoLmnpzmmK/lj6rnu5HlrprkuIDmrKHnmoQsIOWImeS4u+WKqOino+e7kVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VuU3Vic2NyaWJlKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBpLS07XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRUeXBlLCAn5o6o6YCB5pWw5o2u5rKh5pyJ5qih5Z2X5L2/55SoIeWNs+WwhuWPlua2iOiuoumYhScpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdW5TdWJJbnZhbGlkQnVzaW5lc3MocmVzdWx0VHlwZTogc3RyaW5nLCBkYXRhOiBEYXRhTW9kZWxSZXN1bHQpIHtcclxuICAgICAgICBpZiAocmVzdWx0VHlwZSAhPT0gU29ja2V0UmVzdWx0VHlwZUVudW0uU3Vic2NyaWJlQWxsQWxhcm1EYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VySUQ6IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpLFxyXG4gICAgICAgICAgICAgICAgaXNDYW5jZWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzb2NrZXRUeXBlOiByZXN1bHRUeXBlLFxyXG4gICAgICAgICAgICB9IGFzIGFueTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdFR5cGUgPT09IFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YnNjcmliZUFsYXJtTG9nKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5vcmlJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5hbGFybVR5cGUgPSBBbGFybVR5cGUuVmVoaWNsZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuQWxhcm1Mb2cgJiYgZGF0YS5BbGFybUxvZy5PYmplY3RUeXBlID09PSBPYmplY3RUeXBlLkNhbWVyYS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5hbGFybVR5cGUgPSBBbGFybVR5cGUuRmFjZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLkFsYXJtTG9nICYmIGRhdGEuQWxhcm1Mb2cuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMuYWxhcm1UeXBlID0gQWxhcm1UeXBlLkVmZW5jZVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLkFsYXJtTG9nICYmIGRhdGEuQWxhcm1Mb2cuT2JqZWN0VHlwZSA9PT0gT2JqZWN0VHlwZS5XaWZpLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmFsYXJtVHlwZSA9IEFsYXJtVHlwZS5XaWZpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0U29ja2V0Q29uZmlnKCk6IFNvY2tldENvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVjb25uZWN0aW9uQXR0ZW1wdHM6IDIwXHJcbiAgICAgICAgfSBhcyBTb2NrZXRDb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBiaW5kRXZlbnQoKSB7XHJcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMudXNlcklkO1xyXG4gICAgICAgIC8vIOiuoumYheS4gOS4quacgOWIneeahG1vZGVsLCDmraRtb2RlbOWSjOWFtuS7lm1vZGVs5LiN5ZCMLCDmsLjov5zlrZjlnKgsIOS4jea4hemZpFxyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdCcsIChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb2NrZXQgY29ubmVjdFwiICsgU29ja2V0RmFjdG9yeS5VUkwgKyBcIi1zdWNjZXNzIVwiKTtcclxuICAgICAgICAgICAgLy8g5Yid5qyh6K6i6ZiFXHJcbiAgICAgICAgICAgIHRoaXMuX3JlU3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKHVzZXJJZCwgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS7juacjeWKoeWZqOi/lOWbnuadpeeahOa2iOaBr1wiLCBkYXRhKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5kZWJ1ZyhcInNvY2tldCBnZXQgdG9waWMgaGVsbG8gcHVzaCBmcm9tIHNlcnZlclwiLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdtZXNzYWdlJywgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuS7juacjeWKoeWZqOi/lOWbnuadpeeahOa2iOaBryAtLSBtZXNzYWdlXCIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvY2tldCBnZXQgdG9waWMgaGVsbG8gcHVzaCBmcm9tIHNlcnZlclwiLCBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlQnlBbGFybShkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbihcInJlY29ubmVjdF9mYWlsZWRcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic29ja2V0IHRlc3QgcmVjb25uZWN0IG1hbnktdGltZXMgYnV0IGFsbCBmYWlsZWQhXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnNvY2tldC5vbignZGlzY29ubmVjdCcsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNvY2tldCBpcyBkaXNjb25uZWN0IHdpdGggc2VydmVyIVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ3JlY29ubmVjdCcsIChhdHRlbXB0OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcInNvY2tldCB0cmlnZ2VyIHJlY29ubmVjdFwiLCBhdHRlbXB0KTtcclxuICAgICAgICAgICAgLy8g6YeN5paw6K6i6ZiFXHJcbiAgICAgICAgICAgIHRoaXMuX3JlU3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdlcnJvcicsIChlcnJvcjogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJzb2NrZXQgdHJpZ2dlciBlcnJvciFcIiwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3N1YnNjcmliZShzdWJNb2RlbDogU29ja2V0U3ViTW9kZWwpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghdGhpcy5zdWJNb2RlbHNbc3ViTW9kZWwuc29ja2V0VHlwZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJNb2RlbHNbc3ViTW9kZWwuc29ja2V0VHlwZV0gPSBuZXcgQXJyYXk8U29ja2V0U3ViTW9kZWw+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3ViTW9kZWxzW3N1Yk1vZGVsLnNvY2tldFR5cGVdLnB1c2goc3ViTW9kZWwpO1xyXG4gICAgICAgIGlmIChzdWJNb2RlbC5uZWVkRXh0cmFTdWIpIHtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaWJlMlNlcnZlcihzdWJNb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJNb2RlbC5pZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWQjuWPsOacjeWKoeWPkemAgeiuoumYheivt+axglxyXG4gICAgICog5rWB56iL5pS55YqoLCDnjrDlnKjnmoTorqLpmIXov5jpgJrnn6XlkI7lj7BcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3N1YnNjcmliZTJTZXJ2ZXIobW9kZWw6IFNvY2tldFN1Yk1vZGVsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc29ja2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoXCJOZXR0eUNhbGxCYWNrTGlzdGVuZXJcIiwgdGhpcy5nZXRQdXNoTW9kZWwobW9kZWwsIGZhbHNlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN1YnNjcmliZTJTZXJ2ZXIgZXJyb3I6IHRoaXMuc29ja2V0IGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX3VuU3Vic2NyaWJlKG1vZGVsOiBTb2NrZXRTdWJNb2RlbCkge1xyXG4gICAgICAgIGlmIChtb2RlbCAmJiBtb2RlbC5uZWVkRXh0cmFTdWIpIHtcclxuICAgICAgICAgICAgLy8g5aaC5p6c5piv6aKd5aSW5ZCR5ZCO5Y+w6K6i6ZiF55qELCDpnIDopoHkuLvliqjlkJHlkI7lj7Dlj5bmtojorqLpmIVcclxuICAgICAgICAgICAgdGhpcy5fdW5TdWJzY3JpYmUyU2VydmVyKG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdW5TdWJzY3JpYmUyU2VydmVyKG1vZGVsOiBTb2NrZXRTdWJNb2RlbCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNvY2tldCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KFwiTmV0dHlDYWxsQmFja0xpc3RlbmVyXCIsIHRoaXMuZ2V0UHVzaE1vZGVsKG1vZGVsLCB0cnVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInN1YnNjcmliZTJTZXJ2ZXIgZXJyb3I6IHRoaXMuc29ja2V0IGlzIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW6K6i6ZiF5oiW6ICF5pat57q/5ZCO55qE6YeN5paw6K6i6ZiFXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZVN1YnNjcmliZSgpIHtcclxuICAgICAgICB0aGlzLl9yZVN1YnNjcmliZU1haW4oKTtcclxuICAgICAgICB0aGlzLl9yZVN1YnNjcmliZUV4dHJhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDph43mlrDorqLpmIXkuLvmjqjpgIFcclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3JlU3Vic2NyaWJlTWFpbigpIHtcclxuICAgICAgICBsZXQgcHVzaE1vZGVsID0gbmV3IFNvY2tldFB1c2hNb2RlbCgpO1xyXG4gICAgICAgIHB1c2hNb2RlbC51c2VySUQgPSB0aGlzLnVzZXJJZDtcclxuICAgICAgICBwdXNoTW9kZWwuc29ja2V0VHlwZSA9IFNvY2tldFJlc3VsdFR5cGVFbnVtLlN1YmNyaWJlQWNjZXNzTG9nO1xyXG4gICAgICAgIHB1c2hNb2RlbC5hbGFybVR5cGUgPSAnRmFjZSc7XHJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdChcIk5ldHR5Q2FsbEJhY2tMaXN0ZW5lclwiLCBwdXNoTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YeN5paw6K6i6ZiF6aKd5aSW5o6o6YCBXHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZVN1YnNjcmliZUV4dHJhKCkge1xyXG4gICAgICAgIC8vIOmBjeWOhumineWkluaOqOmAgeaemuS4vlxyXG4gICAgICAgIC8vIOWGjeasoeiuoumYheS4gOasoVxyXG4gICAgICAgIC8vIOato+W4uOaDheWGteS4iywg5Yid5aeL5YyW55qE6K6i6ZiF6LCD55SoLCDpg73kuLrnqbosIOWImeS4jeS8mui/m+ihjOWIpOaWrVxyXG4gICAgICAgIC8vIOatpOaWueazleS4u+imgeaYr+aWree6v+mHjei/nuaXtuiwg+eUqC5cclxuICAgICAgICBsZXQgbmVlZEV4dHJhID0gTkVFRF9CQUNLX1NPQ0tFVF9UWVBFIGFzIHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gICAgICAgIGxldCBzdWJNb2RlbHMgPSB0aGlzLnN1Yk1vZGVscztcclxuICAgICAgICBsZXQga2V5LCBhcnIsIGksIGxlbjtcclxuXHJcbiAgICAgICAgZm9yIChrZXkgaW4gbmVlZEV4dHJhKSB7XHJcbiAgICAgICAgICAgIGFyciA9IHN1Yk1vZGVsc1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYXJyICYmIGFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDph43mlrDorqLpmIVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zdWJzY3JpYmUyU2VydmVyKGFycltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blj5HpgIHnu5nlkI7lj7DnmoTorqLpmIVtb2RlbFxyXG4gICAgICogQHBhcmFtIG1vZGVsXHJcbiAgICAgKiBAcGFyYW0gaXNDYW5jZWwg5piv5ZCm5piv5Y+W5raI6K6i6ZiF5pON5L2cXHJcbiAgICAgKiBAcmV0dXJucyB7U29ja2V0UHVzaE1vZGVsfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFB1c2hNb2RlbChtb2RlbDogU29ja2V0U3ViTW9kZWwsIGlzQ2FuY2VsOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHB1c2hNb2RlbCA9IG5ldyBTb2NrZXRQdXNoTW9kZWwoKTtcclxuICAgICAgICBwdXNoTW9kZWwudXNlcklEID0gdGhpcy51c2VySWQ7XHJcbiAgICAgICAgcHVzaE1vZGVsLnNvY2tldFR5cGUgPSBtb2RlbC5zb2NrZXRUeXBlO1xyXG4gICAgICAgIGlmIChpc0NhbmNlbCkge1xyXG4gICAgICAgICAgICBwdXNoTW9kZWwuaXNDYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobW9kZWwub2JqZWN0SUQpIHtcclxuICAgICAgICAgICAgcHVzaE1vZGVsLm9iamVjdElEID0gbW9kZWwub2JqZWN0SUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtb2RlbC5hbGFybVR5cGUpIHtcclxuICAgICAgICAgICAgcHVzaE1vZGVsLmFsYXJtVHlwZSA9IG1vZGVsLmFsYXJtVHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHB1c2hNb2RlbDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKFwic29ja2V0RmFjdG9yeVwiLCBTb2NrZXRGYWN0b3J5KTsiXX0=
