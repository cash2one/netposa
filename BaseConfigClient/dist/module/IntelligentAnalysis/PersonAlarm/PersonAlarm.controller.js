define(["require", "exports", "text!../loading/loading.html", "text!../../AlarmInfoPopup/alarm.detail.tpl.html", "text!../../selectPopup/treeCamera/Tree.camera.popup.html", "text!../../selectPopup/checkAreaPopup/check.area.popup.html", "../../common/app/main.app", "../../../core/entity/PersonAlarmEnum", "../AnalysisEnum", "../../common/directive/page/page-params", "../../../core/enum/ObjectType", "lodash", "css!../style/PersonAlarm.css", "../../selectPopup/treeCamera/Tree.camera.popup", "../../selectPopup/checkAreaPopup/check.area.popup.controller", "../../AlarmInfoPopup/alarm.detail.poup", "../../common/services/analysis.service", "../../common/factory/layerMsg.factory", "../main/analysisMmap.server"], function (require, exports, loadingAnalysisHtml, AlarmDetail, cameraTreePopupHtml, PopupHtml, main_app_1, PersonAlarmEnum_1, AnalysisEnum_1, page_params_1, ObjectType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonAlarmController = (function () {
        function PersonAlarmController($scope, $timeout, analysisService, layer, layerDec, analysisMmapServer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.analysisService = analysisService;
            this.layer = layer;
            this.layerDec = layerDec;
            this.analysisMmapServer = analysisMmapServer;
            this.$inject = ['$scope', '$rootScope', '$timeout', 'analysisService', 'layer', 'layerDec', 'analysisMmapServer'];
            this.FastDateList = AnalysisEnum_1.getFastDataList();
            this.FastDate = AnalysisEnum_1.FastData.today;
            this.PersonAlarmParams = new PersonAlarmEnum_1.PersonAlarmParams();
            this.isShowDetail = false;
            this.detailLayerWidth = AnalysisEnum_1.getWidowSize().width - 60 - 320;
            this.pageParams = new page_params_1.default();
            this.arrCameraId = [];
            this.selectDeviceCb = "close.device.popup";
            var self = this;
            self.PersonAlarmParams = self.initParams();
            self.$timeout(function () {
                self.$scope.$emit('showItemPage', true);
            });
            self.$scope.$on('$destroy', function () {
                try {
                    self.analysisMmapServer.clearDraw();
                }
                catch (e) {
                    console.error('触发直接销毁Map事件，导致map对象被销毁，轨迹触发自身的销毁事件中无法获取map对象导致的报错，可以忽略！', e);
                }
            });
            self.$scope.$on(self.selectDeviceCb, function (event, deviceIds, status, geometry, type) {
                if (status && Array.isArray(deviceIds)) {
                    self.deviceIdFilter(deviceIds, type);
                }
                else if (geometry) {
                    self.analysisMmapServer.removeDrawShape(geometry);
                }
                self.layer.close(self.currentLayerIndex);
            });
        }
        PersonAlarmController.prototype.initParams = function () {
            var self = this;
            self.FastDate = AnalysisEnum_1.FastData.today;
            var params = new PersonAlarmEnum_1.PersonAlarmParams();
            params.arrCameraId = [];
            params.startTime = self.FastDate.value.startTime;
            params.endTime = self.FastDate.value.endTime;
            params.alarmType = "Camera";
            return params;
        };
        PersonAlarmController.prototype.deviceIdFilter = function (ids, type) {
            var self = this;
            var arrCameraId = [];
            if (type === "tree") {
                arrCameraId = ids;
            }
            else {
                arrCameraId = _.concat(ids, self.arrCameraId);
            }
            arrCameraId = _.sortedUniq(arrCameraId);
            self.arrCameraId = arrCameraId;
            self.PersonAlarmParams.arrCameraId = arrCameraId;
        };
        PersonAlarmController.prototype.showDetailPopup = function (item, index) {
            var scope = this.$scope.$new();
            scope.alarmData = item;
            scope.allAlarmData = this.personAlarmResult.Result;
            scope.index = index;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: AlarmDetail,
                scope: scope,
                title: "报警详情",
                area: ["560px", "470px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        PersonAlarmController.prototype.setFastDate = function (item) {
            this.FastDate = item;
            this.PersonAlarmParams.startTime = item.value.startTime;
            this.PersonAlarmParams.endTime = item.value.endTime;
        };
        PersonAlarmController.prototype.goBack = function () {
            var _this = this;
            this.$timeout(function () {
                _this.$scope.$emit('showItemPage', false);
            });
        };
        PersonAlarmController.prototype.DrawRect = function () {
            var _this = this;
            this.analysisMmapServer.drawRect(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        PersonAlarmController.prototype.DrawCircle = function () {
            var _this = this;
            this.analysisMmapServer.drawCircle(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        PersonAlarmController.prototype.DrawPolygon = function () {
            var _this = this;
            this.analysisMmapServer.drawPolygon(function (points, geometry) {
                _this.$timeout(function () {
                    _this.DrawCallBackMethod(points, geometry);
                });
            });
        };
        PersonAlarmController.prototype.ClearDraw = function () {
            this.arrCameraId = [];
            this.PersonAlarmParams.arrCameraId = [];
            this.analysisMmapServer.clearDraw();
        };
        PersonAlarmController.prototype.DrawCallBackMethod = function (points, geometry) {
            if (points.length === 0) {
                this.analysisMmapServer.removeDrawShape(geometry);
                return this.layerDec.warnInfo('框选区域不存在设备！');
            }
            var arr = [];
            points.forEach(function (item) {
                if (item.ObjectType === ObjectType_1.ObjectType.Camera.value) {
                    arr.push(item);
                }
            });
            this.checkArea(arr, geometry);
        };
        PersonAlarmController.prototype.checkArea = function (deviceList, geometry) {
            var scope = this.$scope.$new();
            scope.deviceList = deviceList;
            scope.geometry = geometry;
            scope.selectCheckAreaCb = this.selectDeviceCb;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: PopupHtml,
                scope: scope,
                title: false,
                closeBtn: 0,
                skin: "no-scroll",
                area: ["300px", "300px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        PersonAlarmController.prototype.submitSearch = function () {
            var _this = this;
            var self = this;
            if (self.PersonAlarmParams.endTime < self.PersonAlarmParams.startTime) {
                self.layerDec.warnInfo('开始时间不能晚于结束时间!');
                return false;
            }
            if (self.arrCameraId.length > 0) {
                self.PersonAlarmParams.arrCameraId = self.arrCameraId;
            }
            else {
                var systemPointList = self.analysisMmapServer.getSystemPoint();
                var cameraList_1 = [];
                _(systemPointList).forEach(function (value) {
                    if (ObjectType_1.ObjectType.Camera.value === value.ObjectType) {
                        cameraList_1.push(value.ObjectID);
                    }
                });
                self.PersonAlarmParams.arrCameraId = cameraList_1;
            }
            this.initLoadingPop();
            this.analysisService.searchPersonAlarm(this.PersonAlarmParams).then(function (res) {
                if (res.code === 200) {
                    if (res.data.Result.length > 0) {
                        _this.isShowDetail = true;
                        _this.pageParams.currentPage = _this.PersonAlarmParams.currentPage;
                        _this.pageParams.pageCount = Math.ceil(res.count / _this.PersonAlarmParams.pageSize);
                        _this.pageParams.totalCount = res.count;
                        _this.pageParams.pageSize = _this.PersonAlarmParams.pageSize;
                        _this.personAlarmResult = res.data;
                    }
                    else {
                        _this.layerDec.info('没有报警');
                    }
                }
                else {
                    _this.layerDec.info('查询报警失败');
                }
                _this.layer.close(_this.currentLayerIndex);
            });
        };
        PersonAlarmController.prototype.selectCamera = function () {
            var scope = this.$scope.$new();
            scope.selectCameraList = this.PersonAlarmParams.arrCameraId;
            scope.selectCtrlCb = this.selectDeviceCb;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: cameraTreePopupHtml,
                scope: scope,
                title: "摄像机选择",
                closeBtn: false,
                area: ["710px", "620px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        PersonAlarmController.prototype.closeResult = function () {
            this.isShowDetail = false;
        };
        PersonAlarmController.prototype.initLoadingPop = function () {
            var scope = this.$scope.$new();
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: loadingAnalysisHtml,
                scope: scope,
                title: false,
                area: ['500px', "280px"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        PersonAlarmController.prototype.changeResultPage = function (i) {
            this.PersonAlarmParams.currentPage = i;
            this.submitSearch();
        };
        return PersonAlarmController;
    }());
    main_app_1.app.controller('PersonAlarmController', PersonAlarmController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9QZXJzb25BbGFybS9QZXJzb25BbGFybS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQStCQTtRQWNJLCtCQUFvQixNQUFVLEVBQ1YsUUFBWSxFQUNaLGVBQWdDLEVBQ2hDLEtBQVMsRUFDVCxRQUFrQixFQUNsQixrQkFBdUM7WUFMdkMsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUNWLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7WUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBSTtZQUNULGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQWxCM0QsWUFBTyxHQUFpQixDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLGlCQUFpQixFQUFDLE9BQU8sRUFBQyxVQUFVLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUN0SCxpQkFBWSxHQUE0Qiw4QkFBZSxFQUFFLENBQUM7WUFDMUQsYUFBUSxHQUFxQix1QkFBUSxDQUFDLEtBQUssQ0FBQztZQUM1QyxzQkFBaUIsR0FBcUIsSUFBSSxtQ0FBaUIsRUFBRSxDQUFDO1lBQzlELGlCQUFZLEdBQVcsS0FBSyxDQUFDO1lBQzdCLHFCQUFnQixHQUFVLDJCQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUcxRCxlQUFVLEdBQWMsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFFekMsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1lBQ2hDLG1CQUFjLEdBQVcsb0JBQW9CLENBQUM7WUFRMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRWhCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLEtB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RUFBRSxPQUFPO2dCQUNkLFFBQVEsRUFBQyxLQUFLO2dCQUNkLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQ3hCLEdBQUcsRUFBRTtvQkFDRCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3JCLENBQUM7YUFDSixDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsMkNBQVcsR0FBWDtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7UUFDRCw4Q0FBYyxHQUFkO1lBQ0ksSUFBSSxLQUFLLEdBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2dCQUNyQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsbUJBQW1CO2dCQUM1QixLQUFLLEVBQUUsS0FBSztnQkFDWixLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUN4QixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQixDQUFDO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELGdEQUFnQixHQUFoQixVQUFpQixDQUFRO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUwsNEJBQUM7SUFBRCxDQXhQQSxBQXdQQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBQyxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL1BlcnNvbkFsYXJtL1BlcnNvbkFsYXJtLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uL2xvYWRpbmcvbG9hZGluZy5odG1sXCIgbmFtZT1cImxvYWRpbmdBbmFseXNpc0h0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL0FsYXJtSW5mb1BvcHVwL2FsYXJtLmRldGFpbC50cGwuaHRtbFwiIG5hbWU9XCJBbGFybURldGFpbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vc2VsZWN0UG9wdXAvdHJlZUNhbWVyYS9UcmVlLmNhbWVyYS5wb3B1cC5odG1sXCIgbmFtZT1cImNhbWVyYVRyZWVQb3B1cEh0bWxcIiAvPlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4uLy4uL3NlbGVjdFBvcHVwL2NoZWNrQXJlYVBvcHVwL2NoZWNrLmFyZWEucG9wdXAuaHRtbFwiIG5hbWU9XCJQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvUGVyc29uQWxhcm0uY3NzJztcclxuXHJcbi8vIOW8ueahhlxyXG5pbXBvcnQgJy4uLy4uL3NlbGVjdFBvcHVwL3RyZWVDYW1lcmEvVHJlZS5jYW1lcmEucG9wdXAnXHJcbmltcG9ydCAnLi4vLi4vc2VsZWN0UG9wdXAvY2hlY2tBcmVhUG9wdXAvY2hlY2suYXJlYS5wb3B1cC5jb250cm9sbGVyJztcclxuaW1wb3J0IFwiLi4vLi4vQWxhcm1JbmZvUG9wdXAvYWxhcm0uZGV0YWlsLnBvdXBcIlxyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUFuYWx5c2lzU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hbmFseXNpcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtJTGF5ZXJEZWN9IGZyb20gXCIuLi8uLi9jb21tb24vZmFjdG9yeS9sYXllck1zZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL21haW4vYW5hbHlzaXNNbWFwLnNlcnZlclwiO1xyXG5pbXBvcnQge0lBbmFseXNpc01tYXBTZXJ2ZXJ9IGZyb20gXCIuLi9tYWluL2FuYWx5c2lzTW1hcC5zZXJ2ZXJcIjtcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0FsYXJtUmVzdWx0SW5mbywgUGVyc29uQWxhcm1QYXJhbXMsIFBlcnNvbkFsYXJtUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uQWxhcm1FbnVtXCI7XHJcbmltcG9ydCB7IEZhc3REYXRhLCBnZXRGYXN0RGF0YUxpc3QsIEVudW0sIFRpbWVMZW5ndGgsIGdldFdpZG93U2l6ZSB9IGZyb20gJy4uL0FuYWx5c2lzRW51bSc7XHJcbmltcG9ydCBQYWdlUGFyYW1zICBmcm9tICcuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXMnXHJcbmltcG9ydCB7T2JqZWN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnVtL09iamVjdFR5cGUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcclxuXHJcbmRlY2xhcmUgbGV0ICQ6YW55LGNhbWVyYVRyZWVQb3B1cEh0bWw6YW55LGxvYWRpbmdBbmFseXNpc0h0bWw6YW55LEFsYXJtRGV0YWlsOmFueSwgUG9wdXBIdG1sOiBhbnk7XHJcblxyXG5jbGFzcyBQZXJzb25BbGFybUNvbnRyb2xsZXJ7XHJcbiAgICAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsJyRyb290U2NvcGUnLCckdGltZW91dCcsJ2FuYWx5c2lzU2VydmljZScsJ2xheWVyJywnbGF5ZXJEZWMnLCAnYW5hbHlzaXNNbWFwU2VydmVyJ107XHJcbiAgICBGYXN0RGF0ZUxpc3Q6IEFycmF5PEVudW08VGltZUxlbmd0aD4+ID0gZ2V0RmFzdERhdGFMaXN0KCk7XHJcbiAgICBGYXN0RGF0ZTogRW51bTxUaW1lTGVuZ3RoPiA9IEZhc3REYXRhLnRvZGF5O1xyXG4gICAgUGVyc29uQWxhcm1QYXJhbXM6UGVyc29uQWxhcm1QYXJhbXMgPSBuZXcgUGVyc29uQWxhcm1QYXJhbXMoKTtcclxuICAgIGlzU2hvd0RldGFpbDpib29sZWFuID0gZmFsc2U7XHJcbiAgICBkZXRhaWxMYXllcldpZHRoOm51bWJlciA9IGdldFdpZG93U2l6ZSgpLndpZHRoIC0gNjAgLSAzMjA7XHJcbiAgICBwZXJzb25BbGFybVJlc3VsdDpQZXJzb25BbGFybVJlc3VsdDtcclxuICAgIGN1cnJlbnRMYXllckluZGV4Om51bWJlcjtcclxuICAgIHBhZ2VQYXJhbXM6UGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcblxyXG4gICAgYXJyQ2FtZXJhSWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHNlbGVjdERldmljZUNiOiBzdHJpbmcgPSBcImNsb3NlLmRldmljZS5wb3B1cFwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhbmFseXNpc1NlcnZpY2U6SUFuYWx5c2lzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllckRlYzpJTGF5ZXJEZWMsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFuYWx5c2lzTW1hcFNlcnZlcjogSUFuYWx5c2lzTW1hcFNlcnZlcil7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLlBlcnNvbkFsYXJtUGFyYW1zID0gc2VsZi5pbml0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgc2VsZi4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi4kc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfop6blj5Hnm7TmjqXplIDmr4FNYXDkuovku7bvvIzlr7zoh7RtYXDlr7nosaHooqvplIDmr4HvvIzovajov7nop6blj5Hoh6rouqvnmoTplIDmr4Hkuovku7bkuK3ml6Dms5Xojrflj5ZtYXDlr7nosaHlr7zoh7TnmoTmiqXplJnvvIzlj6/ku6Xlv73nlaXvvIEnLCBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDnm5HlkKzorr7lpIfov5Tlm57kuovku7ZcclxuICAgICAgICBzZWxmLiRzY29wZS4kb24oc2VsZi5zZWxlY3REZXZpY2VDYiwgKGV2ZW50OiBhbnksIGRldmljZUlkczogQXJyYXk8c3RyaW5nPiwgc3RhdHVzOmJvb2xlYW4sIGdlb21ldHJ5PzogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiwgdHlwZT86IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgJiYgQXJyYXkuaXNBcnJheShkZXZpY2VJZHMpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRldmljZUlkRmlsdGVyKGRldmljZUlkcywgdHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2VvbWV0cnkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi5sYXllci5jbG9zZShzZWxmLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQYXJhbXMoKTogUGVyc29uQWxhcm1QYXJhbXMge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgc2VsZi5GYXN0RGF0ZSA9IEZhc3REYXRhLnRvZGF5O1xyXG5cclxuICAgICAgICBsZXQgcGFyYW1zID0gbmV3IFBlcnNvbkFsYXJtUGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHBhcmFtcy5zdGFydFRpbWUgPSBzZWxmLkZhc3REYXRlLnZhbHVlLnN0YXJ0VGltZTtcclxuICAgICAgICBwYXJhbXMuZW5kVGltZSA9IHNlbGYuRmFzdERhdGUudmFsdWUuZW5kVGltZTtcclxuICAgICAgICBwYXJhbXMuYWxhcm1UeXBlID0gXCJDYW1lcmFcIjtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICAvLyDorr7lpIdpZOWOu+mHjVxyXG4gICAgcHJpdmF0ZSBkZXZpY2VJZEZpbHRlcihpZHM6IEFycmF5PHN0cmluZz4sIHR5cGU/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gIFtdO1xyXG4gICAgICAgIGlmICh0eXBlID09PSBcInRyZWVcIikge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9IGlkcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhcnJDYW1lcmFJZCA9ICBfLmNvbmNhdChpZHMsIHNlbGYuYXJyQ2FtZXJhSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcnJDYW1lcmFJZCA9IF8uc29ydGVkVW5pcShhcnJDYW1lcmFJZCk7XHJcbiAgICAgICAgc2VsZi5hcnJDYW1lcmFJZCA9IGFyckNhbWVyYUlkO1xyXG4gICAgICAgIHNlbGYuUGVyc29uQWxhcm1QYXJhbXMuYXJyQ2FtZXJhSWQgPSBhcnJDYW1lcmFJZDtcclxuICAgIH1cclxuXHJcbiAgICBzaG93RGV0YWlsUG9wdXAoaXRlbTphbnksaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgYWxsQWxhcm1EYXRhOiBBcnJheTxBbGFybVJlc3VsdEluZm8+LGFsYXJtRGF0YTogQWxhcm1SZXN1bHRJbmZvLCBpbmRleDpudW1iZXIsJGRlc3Ryb3k6IEZ1bmN0aW9uIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuYWxhcm1EYXRhID0gaXRlbTtcclxuICAgICAgICBzY29wZS5hbGxBbGFybURhdGEgPSB0aGlzLnBlcnNvbkFsYXJtUmVzdWx0LlJlc3VsdDtcclxuICAgICAgICBzY29wZS5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBBbGFybURldGFpbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogXCLmiqXorabor6bmg4VcIixcclxuICAgICAgICAgICAgYXJlYTogW1wiNTYwcHhcIiwgXCI0NzBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RmFzdERhdGUoaXRlbTogRW51bTxUaW1lTGVuZ3RoPikge1xyXG4gICAgICAgIHRoaXMuRmFzdERhdGUgPSBpdGVtO1xyXG4gICAgICAgIHRoaXMuUGVyc29uQWxhcm1QYXJhbXMuc3RhcnRUaW1lID0gaXRlbS52YWx1ZS5zdGFydFRpbWU7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lID0gaXRlbS52YWx1ZS5lbmRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdvQmFjaygpe1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3Nob3dJdGVtUGFnZScsZmFsc2UpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd1JlY3QoKSB7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc01tYXBTZXJ2ZXIuZHJhd1JlY3QoKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50cywgZ2VvbWV0cnkpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgRHJhd0NpcmNsZSgpIHtcclxuICAgICAgICB0aGlzLmFuYWx5c2lzTW1hcFNlcnZlci5kcmF3Q2lyY2xlKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIERyYXdQb2x5Z29uKCkge1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmRyYXdQb2x5Z29uKChwb2ludHM6IEFycmF5PFN5c3RlbVBvaW50PiwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkRyYXdDYWxsQmFja01ldGhvZChwb2ludHMsIGdlb21ldHJ5KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIENsZWFyRHJhdygpIHtcclxuICAgICAgICB0aGlzLmFyckNhbWVyYUlkID0gW107XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5hcnJDYW1lcmFJZCA9IFtdO1xyXG4gICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLmNsZWFyRHJhdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgRHJhd0NhbGxCYWNrTWV0aG9kKHBvaW50czogQXJyYXk8U3lzdGVtUG9pbnQ+LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSkge1xyXG4gICAgICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5hbHlzaXNNbWFwU2VydmVyLnJlbW92ZURyYXdTaGFwZShnZW9tZXRyeSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCfmoYbpgInljLrln5/kuI3lrZjlnKjorr7lpIfvvIEnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycjogQXJyYXk8U3lzdGVtUG9pbnQ+ID0gW107XHJcbiAgICAgICAgcG9pbnRzLmZvckVhY2goKGl0ZW06IFN5c3RlbVBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLk9iamVjdFR5cGUgPT09IE9iamVjdFR5cGUuQ2FtZXJhLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tBcmVhKGFyciwgZ2VvbWV0cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2tBcmVhKGRldmljZUxpc3Q6IGFueSwgZ2VvbWV0cnk6IE5QTWFwTGliLkdlb21ldHJ5LlBvbHlnb24gfCBOUE1hcExpYi5HZW9tZXRyeS5DaXJjbGUpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IHsgZGV2aWNlTGlzdDogYW55LCBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbiB8IE5QTWFwTGliLkdlb21ldHJ5LkNpcmNsZSwgJGRlc3Ryb3k6IEZ1bmN0aW9uLCBzZWxlY3RDaGVja0FyZWFDYjogc3RyaW5nIH0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZGV2aWNlTGlzdCA9IGRldmljZUxpc3Q7XHJcbiAgICAgICAgc2NvcGUuZ2VvbWV0cnkgPSBnZW9tZXRyeTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDaGVja0FyZWFDYiA9IHRoaXMuc2VsZWN0RGV2aWNlQ2I7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXJJbmRleCA9IHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IFBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICB0aXRsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQnRuOiAwLFxyXG4gICAgICAgICAgICBza2luOiBcIm5vLXNjcm9sbFwiLFxyXG4gICAgICAgICAgICBhcmVhOiBbXCIzMDBweFwiLCBcIjMwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdFNlYXJjaCgpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyDliKTmlq3ml7bpl7RcclxuICAgICAgICBpZiAoc2VsZi5QZXJzb25BbGFybVBhcmFtcy5lbmRUaW1lIDwgc2VsZi5QZXJzb25BbGFybVBhcmFtcy5zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgc2VsZi5sYXllckRlYy53YXJuSW5mbygn5byA5aeL5pe26Ze05LiN6IO95pma5LqO57uT5p2f5pe26Ze0IScpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOiuvue9ruafpeivouiuvuWkh2lkXHJcbiAgICAgICAgaWYoc2VsZi5hcnJDYW1lcmFJZC5sZW5ndGg+MCkge1xyXG4gICAgICAgICAgICBzZWxmLlBlcnNvbkFsYXJtUGFyYW1zLmFyckNhbWVyYUlkID0gc2VsZi5hcnJDYW1lcmFJZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgc3lzdGVtUG9pbnRMaXN0OkFycmF5PGFueT4gPSBzZWxmLmFuYWx5c2lzTW1hcFNlcnZlci5nZXRTeXN0ZW1Qb2ludCgpO1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhTGlzdDpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgICAgIF8oc3lzdGVtUG9pbnRMaXN0KS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0VHlwZS5DYW1lcmEudmFsdWUgPT09IHZhbHVlLk9iamVjdFR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFMaXN0LnB1c2godmFsdWUuT2JqZWN0SUQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5QZXJzb25BbGFybVBhcmFtcy5hcnJDYW1lcmFJZCA9IGNhbWVyYUxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmluaXRMb2FkaW5nUG9wKCk7XHJcbiAgICAgICAgdGhpcy5hbmFseXNpc1NlcnZpY2Uuc2VhcmNoUGVyc29uQWxhcm0odGhpcy5QZXJzb25BbGFybVBhcmFtcykudGhlbigocmVzOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlcy5jb2RlID09PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuUmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd0RldGFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5QZXJzb25BbGFybVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMucGFnZUNvdW50ID0gTWF0aC5jZWlsKHJlcy5jb3VudC90aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHJlcy5jb3VudDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemUgPSB0aGlzLlBlcnNvbkFsYXJtUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGVyc29uQWxhcm1SZXN1bHQgPSByZXMuZGF0YSBhcyBQZXJzb25BbGFybVJlc3VsdDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllckRlYy5pbmZvKCfmsqHmnInmiqXoraYnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuaW5mbygn5p+l6K+i5oql6K2m5aSx6LSlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZSh0aGlzLmN1cnJlbnRMYXllckluZGV4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Q2FtZXJhKCl7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7IHNlbGVjdENhbWVyYUxpc3Q6IEFycmF5PHN0cmluZz4sICRkZXN0cm95OiBGdW5jdGlvbiwgc2VsZWN0Q3RybENiOiBzdHJpbmcgfSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5zZWxlY3RDYW1lcmFMaXN0ID0gdGhpcy5QZXJzb25BbGFybVBhcmFtcy5hcnJDYW1lcmFJZDtcclxuICAgICAgICBzY29wZS5zZWxlY3RDdHJsQ2IgPSB0aGlzLnNlbGVjdERldmljZUNiO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjYW1lcmFUcmVlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuaRhOWDj+acuumAieaLqVwiLFxyXG4gICAgICAgICAgICBjbG9zZUJ0bjpmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiNzEwcHhcIiwgXCI2MjBweFwiXSxcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VSZXN1bHQoKXtcclxuICAgICAgICB0aGlzLmlzU2hvd0RldGFpbCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaW5pdExvYWRpbmdQb3AoKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7ICRkZXN0cm95OiBGdW5jdGlvbiB9ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBsb2FkaW5nQW5hbHlzaXNIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXJlYTogWyc1MDBweCcsIFwiMjgwcHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUmVzdWx0UGFnZShpOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5QZXJzb25BbGFybVBhcmFtcy5jdXJyZW50UGFnZSA9IGk7XHJcbiAgICAgICAgdGhpcy5zdWJtaXRTZWFyY2goKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdQZXJzb25BbGFybUNvbnRyb2xsZXInLFBlcnNvbkFsYXJtQ29udHJvbGxlcik7Il19
