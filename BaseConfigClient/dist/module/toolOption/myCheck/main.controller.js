define(["require", "exports", "text!./details.html", "text!./vehicleDetails.html", "text!./macDetails.html", "../../common/app/main.app", "../../../core/server/enum/TaskStatus", "../../common/directive/page/page-params", "../../../core/params/CheckParams", "../../../core/server/enum/TaskType", "../../../core/server/enum/AuditStatus", "css!./style/check.css", "css!./style/popup.css", "./details.controller", "./vehicleDetails.controller", "./macDetails.controller", "moment", "../../common/services/myCheck.service", "../../common/services/connectTree.service", "../../common/services/businessLib.service", "../../common/services/area.service", "../../common/services/task.service", "../../common/services/videoStructuredTasks.service"], function (require, exports, editHtml, vehicleDetailsPopul, macDetailsPopul, main_app_1, TaskStatus_1, page_params_1, CheckParams_1, TaskType_1, AuditStatus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentInterface = (function () {
        function CurrentInterface() {
        }
        return CurrentInterface;
    }());
    var MyCheckController = (function () {
        function MyCheckController($scope, $timeout, layer, i18nFactory, myCheckService, userInfoCacheFactory, businessLibService, $q, taskService, videoStructuredTasksService, connectTreeService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.i18nFactory = i18nFactory;
            this.myCheckService = myCheckService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.businessLibService = businessLibService;
            this.$q = $q;
            this.taskService = taskService;
            this.videoStructuredTasksService = videoStructuredTasksService;
            this.connectTreeService = connectTreeService;
            this.CurrentInfo = {};
            this.endTime = moment().format('YYYY-MM-DD');
            this.setTableHead = function () {
                _this.tHeadList = [
                    { field: '', title: '任务类型' },
                    { field: '', title: '任务名称' },
                    { field: '', title: '所属区域' },
                    { field: '', title: '创建人' },
                    { field: '', title: '布控类型' },
                    { field: '', title: '有效时间' },
                    { field: '', title: '任务状态' },
                    { field: '', title: '描述' },
                    { field: '', title: '审核状态' },
                    { field: '', title: '操作' },
                ];
            };
            this.findListParams = new CheckParams_1.CheckGetListParams();
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = 10;
            this.initStatusLib();
            this.setTableHead();
            this.search();
            $scope.$on("details.closePopup", function (event, isRefresh) {
                _this.closeMyCheckDetails(isRefresh);
            });
            $scope.$on("$destroy", function () {
                _this.areaCameraCaches = null;
                _this.businessLibCaches = null;
                _this.userCaches = null;
            });
        }
        MyCheckController.prototype.initStatusLib = function () {
            var taskStatusMap = {};
            var auditStatus = [];
            var auditStatusMap = {};
            var taskType = [];
            var taskTypeMap = {};
            taskType.push({ value: 'all', text: '全部' });
            auditStatus.push({ value: 'all', text: '全部' });
            for (var k in TaskStatus_1.TaskStatus) {
                taskStatusMap[TaskStatus_1.TaskStatus[k].value] = TaskStatus_1.TaskStatus[k].text;
            }
            for (var k in AuditStatus_1.AuditStatus) {
                auditStatus.push({ value: AuditStatus_1.AuditStatus[k].value, text: AuditStatus_1.AuditStatus[k].text });
                auditStatusMap[AuditStatus_1.AuditStatus[k].value] = AuditStatus_1.AuditStatus[k].text;
            }
            this.taskTypeArr = taskType;
            this.AuditStatusLib = auditStatus;
            this.CurrentInfo.taskType = taskType[0].value;
            this.CurrentInfo.AuditStatus = auditStatus[0].value;
            for (var k in TaskType_1.TaskType) {
                taskType.push({ value: TaskType_1.TaskType[k].value, text: TaskType_1.TaskType[k].text });
                taskTypeMap[TaskType_1.TaskType[k].value] = TaskType_1.TaskType[k].text;
            }
            this.taskTypeMap = taskTypeMap;
            this.auditStatusMap = auditStatusMap;
            this.taskStatusMap = taskStatusMap;
            console.debug("this.CurrentInfo.taskType", this.CurrentInfo.taskType, this.CurrentInfo.AuditStatus);
        };
        MyCheckController.prototype.getParams = function () {
            var params = new CheckParams_1.CheckGetListParams();
            params.currentPage = this.findListParams.currentPage;
            params.pageSize = this.findListParams.pageSize;
            params.userId = this.userInfoCacheFactory.getCurrentUserId();
            params.taskType = this.CurrentInfo.taskType == 'all' ? null : this.CurrentInfo.taskType;
            params.auditStatus = this.CurrentInfo.AuditStatus == 'all' ? null : this.CurrentInfo.AuditStatus;
            if (this.startTime) {
                params.timeStart = moment(this.startTime).format('YYYY-MM-DD');
                params.timeEnd = moment(this.endTime).format('YYYY-MM-DD');
            }
            else {
                params.timeStart = null;
                params.timeEnd = null;
            }
            return params;
        };
        MyCheckController.prototype.editCheck = function (data) {
            var _this = this;
            var arr = [this.getPopupCache(), this.getTaskDetail(data.tId, data.taskType)];
            this.$q.all(arr).then(function (res) {
                var scope = _this.$scope.$new();
                scope.MyCheck = data;
                scope.MyTaskModel = res[1];
                scope.BusinessLibDatas = _this.businessLibCaches;
                scope.CameraDatas = _this.areaCameraCaches;
                scope.UserDatas = _this.userCaches;
                scope.AuditStatusMap = _this.auditStatusMap;
                scope.TaskStatusMap = _this.taskStatusMap;
                scope.TaskTypeMap = _this.taskTypeMap;
                scope.$on("$destroy", function () {
                });
                var content;
                var area;
                switch (data.taskType) {
                    case "VehicleMonitor": {
                        content = angular.copy(vehicleDetailsPopul);
                        area = ["640px", "387px"];
                        break;
                    }
                    case "FaceMonitor": {
                        content = angular.copy(editHtml);
                        area = ["640px", "665px"];
                        break;
                    }
                    case "MAC": {
                        content = angular.copy(macDetailsPopul);
                        area = ["640px", "237px"];
                        break;
                    }
                }
                _this.currentLayerIndex = _this.layer.open({
                    type: 1,
                    content: content,
                    scope: scope,
                    closeBtn: false,
                    skin: "no-scroll",
                    title: false,
                    area: area,
                    end: function () {
                        scope.$destroy();
                    }
                });
            });
        };
        MyCheckController.prototype.getTaskDetail = function (tId, tastType) {
            var type = -1;
            switch (tastType) {
                case TaskType_1.TaskType.FaceMonitor.value:
                case TaskType_1.TaskType.FaceStruct.value:
                    type = 1;
                    break;
                case TaskType_1.TaskType.IMEIMonitor.value:
                case TaskType_1.TaskType.IMSIMonitor.value:
                case TaskType_1.TaskType.MacMonitor.value:
                    type = 2;
                    break;
                case TaskType_1.TaskType.CarMonitor.value:
                case TaskType_1.TaskType.VehicleStruct.value:
                    type = 3;
                    break;
                case TaskType_1.TaskType.VedioStruct.value:
                    type = 0;
                    break;
            }
            if (type == 1) {
                return this.taskService.findFaceById(tId).then(function (res) {
                    return res && res.data || {};
                });
            }
            else if (type == 0) {
                return this.videoStructuredTasksService.getFaceDetail(tId).then(function (res) {
                    return res && res.data || {};
                });
            }
            else if (type == 2) {
                return this.taskService.findRfidById(tId).then(function (res) {
                    return res && res.data || {};
                });
            }
            else if (type == 3) {
                return this.taskService.findCarById(tId).then(function (res) {
                    return res && res.data || {};
                });
            }
            else {
                return this.$q.defer().resolve({});
            }
        };
        MyCheckController.prototype.closeMyCheckDetails = function (flag) {
            this.layer.close(this.currentLayerIndex);
            this.currentLayerIndex = -1;
            if (!flag) {
                this.findListParams.currentPage = 1;
            }
        };
        MyCheckController.prototype.search = function () {
            var _this = this;
            this.findListParams = this.getParams();
            console.log(this.findListParams);
            this.myCheckService.findListByPage(this.findListParams).then(function (pageResultObj) {
                console.log(pageResultObj);
                var pageParams = new page_params_1.default();
                pageParams.currentPage = _this.findListParams.currentPage;
                pageParams.pageSize = _this.findListParams.pageSize;
                pageParams.totalCount = pageResultObj.TotalCount || 0;
                _this.pageParams = pageParams;
                _this.tBodyList = pageResultObj.Result;
                if (_this.tBodyList && _this.tBodyList.length > 0) {
                    _this.tableNoData = false;
                }
                else {
                    _this.tableNoData = true;
                }
            });
        };
        MyCheckController.prototype.audit = function (data) {
            var _this = this;
            if (!data || data.auditStatus != AuditStatus_1.AuditStatus.Verifing.value) {
                return;
            }
            var taskType = data.taskType;
            var taskId = data.tId;
            var result = null;
            this.layer.confirm("任务<span style='color: #faa037'>" + data.tName + "</span>是否通过?", {
                icon: 3,
                skin: 'layer-ext-moon',
                btn: ['通过', '拒绝']
            }, function (index) {
                result = AuditStatus_1.AuditStatus.Verified.value;
                _this.updateAuditStatus(taskId, taskType, result);
                _this.layer.close(index);
            }, function () {
                result = AuditStatus_1.AuditStatus.Refuse.value;
                _this.updateAuditStatus(taskId, taskType, result);
            });
        };
        MyCheckController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.search();
        };
        MyCheckController.prototype.changePageSize = function (count) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = count;
            this.search();
        };
        MyCheckController.prototype.changeStatus = function () {
            this.findListParams.currentPage = 1;
        };
        MyCheckController.prototype.isInCheck = function (status) {
            return status === AuditStatus_1.AuditStatus.Verifing.value;
        };
        MyCheckController.prototype.afterUpdateAudit = function () {
            this.search();
        };
        MyCheckController.prototype.updateAuditStatus = function (tId, taskType, auditStatus) {
            console.debug("updateAuditStatus", tId, taskType, auditStatus);
            var type = -1;
            switch (taskType) {
                case TaskType_1.TaskType.FaceMonitor.value:
                case TaskType_1.TaskType.FaceStruct.value:
                    type = 1;
                    break;
                case TaskType_1.TaskType.IMEIMonitor.value:
                case TaskType_1.TaskType.IMSIMonitor.value:
                case TaskType_1.TaskType.MacMonitor.value:
                    type = 2;
                    break;
                case TaskType_1.TaskType.CarMonitor.value:
                case TaskType_1.TaskType.VehicleStruct.value:
                    type = 3;
                    break;
                case TaskType_1.TaskType.VedioStruct.value:
                    type = 0;
                    break;
            }
            if (type === 1) {
                this.taskService.updateAuditStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
            }
            else if (type === 2) {
                this.taskService.auditMacStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
            }
            else if (type === 3) {
                this.taskService.auditVehicleStatus(tId, auditStatus).then(this.afterUpdateAudit.bind(this));
            }
            else {
                console.debug("该任务没有正确的任务类型");
            }
        };
        MyCheckController.prototype.getPopupCache = function () {
            var arr = [this.getAreaCamera(), this.getBusinessLib(), this.getUser()];
            return this.$q.all(arr).then(function (resArr) {
                return null;
            });
        };
        MyCheckController.prototype.getAreaCamera = function () {
            var _this = this;
            if (this.areaCameraCaches) {
                return this.$q.defer().resolve(this.areaCameraCaches);
            }
            else {
                return this.connectTreeService.findAreaCamera().then(function (datas) {
                    _this.areaCameraCaches = datas;
                    return _this.areaCameraCaches;
                });
            }
        };
        MyCheckController.prototype.getBusinessLib = function () {
            var _this = this;
            if (this.businessLibCaches) {
                return this.$q.defer().resolve(this.businessLibCaches);
            }
            else {
                return this.businessLibService.findHasSelfTree().then(function (res) {
                    _this.businessLibCaches = (res && res.data) || [];
                });
            }
        };
        MyCheckController.prototype.getUser = function () {
            var _this = this;
            if (this.userCaches) {
                return this.$q.defer().resolve(this.userCaches);
            }
            else {
                return this.connectTreeService.findAreaWithPerson().then(function (res) {
                    _this.userCaches = res;
                });
            }
        };
        MyCheckController.$inject = ['$scope', '$timeout', 'layer', 'i18nFactory', 'myCheckService',
            'userInfoCacheFactory', 'businessLibService', '$q', 'taskService',
            'videoStructuredTasksService', 'connectTreeService'];
        return MyCheckController;
    }());
    main_app_1.app
        .controller('MyCheckController', MyCheckController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teUNoZWNrL21haW4uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE2Q0E7UUFBQTtRQUdBLENBQUM7UUFBRCx1QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBR0Q7UUFrQ0ksMkJBQW9CLE1BQW9CLEVBQzVCLFFBQWEsRUFDYixLQUFVLEVBQ1YsV0FBZ0IsRUFDaEIsY0FBOEIsRUFDOUIsb0JBQTJDLEVBQzNDLGtCQUF1QyxFQUN2QyxFQUFPLEVBQ1AsV0FBeUIsRUFDekIsMkJBQXlELEVBQ3pELGtCQUF1QztZQVZuRCxpQkE0QkM7WUE1Qm1CLFdBQU0sR0FBTixNQUFNLENBQWM7WUFDNUIsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7WUFDOUIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUMzQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLE9BQUUsR0FBRixFQUFFLENBQUs7WUFDUCxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQThCO1lBQ3pELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUF2Qm5ELGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztZQUVuQyxZQUFPLEdBQVMsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBZ0d0QyxpQkFBWSxHQUFHO2dCQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHO29CQUNiLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO29CQUM1QixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtvQkFDNUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFN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QyxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCO1lBQzVFLHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxhQUFhO1lBQ2pFLDZCQUE2QixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUEyVjdELHdCQUFDO0tBM1hELEFBMlhDLElBQUE7SUFFRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Rvb2xPcHRpb24vbXlDaGVjay9tYWluLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vZGV0YWlscy5odG1sXCIgbmFtZT1cImVkaXRIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3ZlaGljbGVEZXRhaWxzLmh0bWxcIiBuYW1lPVwidmVoaWNsZURldGFpbHNQb3B1bFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9tYWNEZXRhaWxzLmh0bWxcIiBuYW1lPVwibWFjRGV0YWlsc1BvcHVsXCIgLz5cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4vc3R5bGUvY2hlY2suY3NzXCI7XHJcbmltcG9ydCBcImNzcyEuL3N0eWxlL3BvcHVwLmNzc1wiO1xyXG5pbXBvcnQgXCIuL2RldGFpbHMuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgXCIuL3ZlaGljbGVEZXRhaWxzLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IFwiLi9tYWNEZXRhaWxzLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgRW51bSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQgeyBUYXNrU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9UYXNrU3RhdHVzJztcclxuaW1wb3J0IHsgSVRhYmxlSGVhZGVyIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5cclxuaW1wb3J0ICdtb21lbnQnXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL215Q2hlY2suc2VydmljZSdcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZSdcclxuaW1wb3J0IHsgSUNvbm5lY3RUcmVlU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTXlDaGVja1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvbXlDaGVjay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVVzZXJJbmZvQ2FjaGVGYWN0b3J5IH0gZnJvbSAnLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCB7IENoZWNrR2V0TGlzdFBhcmFtcyB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9DaGVja1BhcmFtc1wiO1xyXG5pbXBvcnQgeyBNeUNoZWNrTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZlci9NeUNoZWNrTW9kZWwnO1xyXG5pbXBvcnQgeyBUYXNrVHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vVGFza1R5cGUnO1xyXG5pbXBvcnQgeyBNeUNoZWNrRGV0YWlsc1BhcmFtcywgQ2hlY2tUYXNrTW9kZWwgfSBmcm9tIFwiLi9kZXRhaWxzLmNvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgSUJ1c2luZXNzTGliU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWIuc2VydmljZSc7XHJcbmltcG9ydCB7IElBcmVhU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBDYW1lcmFFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYkV4IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQnVzaW5lc3NMaWJFeCc7XHJcbmltcG9ydCB7IFBlcnNvbkV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1BlcnNvbkV4XCI7XHJcbmltcG9ydCB7IEFyZWFFeCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeCc7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0IHsgUGVyc29uVHJlZUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1BlcnNvblRyZWVFeFwiO1xyXG5pbXBvcnQgeyBJVGFza1NlcnZpY2UgfSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvdGFzay5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvdGFzay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgSVZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy92aWRlb1N0cnVjdHVyZWRUYXNrcy5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TdHJ1Y3R1cmVkVGFza3Muc2VydmljZSc7XHJcbmltcG9ydCB7IFRhc2tNb2RlbCwgTWFjTW9uaXRvciwgQ2FyTW9uaXRvciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuaW1wb3J0IHsgVmlkZW9UYXNrTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvVmlkZW9TdHJ1Y3RUYXNrXCI7XHJcbmltcG9ydCB7IEF1ZGl0U3RhdHVzIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vQXVkaXRTdGF0dXNcIjtcclxuaW1wb3J0IHsgQW5ndWxhclNjb3BlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi90eXBlcy9iYXNlQW5ndWxhclNjb3BlXCI7XHJcblxyXG5kZWNsYXJlIGxldCBtb21lbnQ6IGFueSwgdmVoaWNsZURldGFpbHNQb3B1bDogYW55LCBhbmd1bGFyOiBhbnksIGVkaXRIdG1sOiBhbnksIG1hY0RldGFpbHNQb3B1bDogYW55O1xyXG5cclxuY2xhc3MgQ3VycmVudEludGVyZmFjZSB7XHJcbiAgICB0YXNrVHlwZT86IHN0cmluZztcclxuICAgIEF1ZGl0U3RhdHVzPzogc3RyaW5nXHJcbn1cclxuXHJcblxyXG5jbGFzcyBNeUNoZWNrQ29udHJvbGxlciB7XHJcbiAgICB0YXNrU3RhdHVzTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfTtcclxuICAgIGF1ZGl0U3RhdHVzTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfTtcclxuICAgIHRhc2tUeXBlTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZzsgfTtcclxuICAgIHRhc2tUeXBlQXJyOiBBcnJheTxFbnVtPjtcclxuICAgIEF1ZGl0U3RhdHVzTGliOiBBcnJheTxFbnVtPjtcclxuXHJcbiAgICAvLy0tLXRhYmxlXHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuXHJcbiAgICB0SGVhZExpc3Q6IEFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG4gICAgZmluZExpc3RQYXJhbXM6IENoZWNrR2V0TGlzdFBhcmFtcztcclxuICAgIHRhYmxlTm9EYXRhOiBib29sZWFuO1xyXG4gICAgdEJvZHlMaXN0OiBBcnJheTxNeUNoZWNrTW9kZWw+O1xyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDogQXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDogYm9vbGVhbjtcclxuXHJcbiAgICBjdXJyZW50TGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIEN1cnJlbnRJbmZvOiBDdXJyZW50SW50ZXJmYWNlID0ge307XHJcbiAgICBzdGFydFRpbWU6IERhdGU7XHJcbiAgICBlbmRUaW1lOiBEYXRlID0gbW9tZW50KCkuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcblxyXG4gICAgLy8g55So5LqO5by55Ye65qGG55qE57yT5a2YLCDlvZMkc2NvcGXkvZznlKjln5/nu5PmnZ/ml7bplIDmr4FcclxuICAgIGFyZWFDYW1lcmFDYWNoZXM6IEFycmF5PENhbWVyYUV4IHwgQXJlYUV4PjtcclxuICAgIGJ1c2luZXNzTGliQ2FjaGVzOiBBcnJheTxCdXNpbmVzc0xpYkV4PjtcclxuICAgIHVzZXJDYWNoZXM6IEFycmF5PFBlcnNvblRyZWVFeCB8IEFyZWFFeD47XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckdGltZW91dCcsICdsYXllcicsICdpMThuRmFjdG9yeScsICdteUNoZWNrU2VydmljZScsXHJcbiAgICAgICAgJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5JywgJ2J1c2luZXNzTGliU2VydmljZScsICckcScsICd0YXNrU2VydmljZScsXHJcbiAgICAgICAgJ3ZpZGVvU3RydWN0dXJlZFRhc2tzU2VydmljZScsICdjb25uZWN0VHJlZVNlcnZpY2UnXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogQW5ndWxhclNjb3BlLFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgbXlDaGVja1NlcnZpY2U6IE15Q2hlY2tTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliU2VydmljZTogSUJ1c2luZXNzTGliU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICRxOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSB0YXNrU2VydmljZTogSVRhc2tTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlOiBJVmlkZW9TdHJ1Y3R1cmVkVGFza3NTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdFRyZWVTZXJ2aWNlOiBJQ29ubmVjdFRyZWVTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBuZXcgQ2hlY2tHZXRMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IDEwO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRTdGF0dXNMaWIoKTtcclxuICAgICAgICB0aGlzLnNldFRhYmxlSGVhZCgpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgJHNjb3BlLiRvbihcImRldGFpbHMuY2xvc2VQb3B1cFwiLCAoZXZlbnQ6IGFueSwgaXNSZWZyZXNoPzogYm9vbGVhbikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlTXlDaGVja0RldGFpbHMoaXNSZWZyZXNoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFDYW1lcmFDYWNoZXMgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzTGliQ2FjaGVzID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy51c2VyQ2FjaGVzID0gbnVsbDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmnprkuL7ojrflj5bnsbvlnovliJfooahcclxuICAgIHByaXZhdGUgaW5pdFN0YXR1c0xpYigpIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB0YXNrU3RhdHVzTWFwID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICAgICAgbGV0IGF1ZGl0U3RhdHVzID0gW10gYXMgQXJyYXk8RW51bT47XHJcbiAgICAgICAgbGV0IGF1ZGl0U3RhdHVzTWFwID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICAgICAgbGV0IHRhc2tUeXBlID0gW10gYXMgQXJyYXk8RW51bT47XHJcbiAgICAgICAgbGV0IHRhc2tUeXBlTWFwID0ge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuXHJcbiAgICAgICAgdGFza1R5cGUucHVzaCh7IHZhbHVlOiAnYWxsJywgdGV4dDogJ+WFqOmDqCcgfSk7XHJcbiAgICAgICAgYXVkaXRTdGF0dXMucHVzaCh7IHZhbHVlOiAnYWxsJywgdGV4dDogJ+WFqOmDqCcgfSk7XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBUYXNrU3RhdHVzKSB7XHJcbiAgICAgICAgICAgIHRhc2tTdGF0dXNNYXBbVGFza1N0YXR1c1trXS52YWx1ZV0gPSBUYXNrU3RhdHVzW2tdLnRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGsgaW4gQXVkaXRTdGF0dXMpIHtcclxuICAgICAgICAgICAgYXVkaXRTdGF0dXMucHVzaCh7IHZhbHVlOiBBdWRpdFN0YXR1c1trXS52YWx1ZSwgdGV4dDogQXVkaXRTdGF0dXNba10udGV4dCB9KTtcclxuICAgICAgICAgICAgYXVkaXRTdGF0dXNNYXBbQXVkaXRTdGF0dXNba10udmFsdWVdID0gQXVkaXRTdGF0dXNba10udGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YXNrVHlwZUFyciA9IHRhc2tUeXBlO1xyXG4gICAgICAgIHRoaXMuQXVkaXRTdGF0dXNMaWIgPSBhdWRpdFN0YXR1cztcclxuICAgICAgICB0aGlzLkN1cnJlbnRJbmZvLnRhc2tUeXBlID0gdGFza1R5cGVbMF0udmFsdWU7XHJcbiAgICAgICAgdGhpcy5DdXJyZW50SW5mby5BdWRpdFN0YXR1cyA9IGF1ZGl0U3RhdHVzWzBdLnZhbHVlO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBrIGluIFRhc2tUeXBlKSB7XHJcbiAgICAgICAgICAgIHRhc2tUeXBlLnB1c2goeyB2YWx1ZTogVGFza1R5cGVba10udmFsdWUsIHRleHQ6IFRhc2tUeXBlW2tdLnRleHQgfSk7XHJcbiAgICAgICAgICAgIHRhc2tUeXBlTWFwW1Rhc2tUeXBlW2tdLnZhbHVlXSA9IFRhc2tUeXBlW2tdLnRleHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRhc2tUeXBlTWFwID0gdGFza1R5cGVNYXA7XHJcbiAgICAgICAgdGhpcy5hdWRpdFN0YXR1c01hcCA9IGF1ZGl0U3RhdHVzTWFwO1xyXG4gICAgICAgIHRoaXMudGFza1N0YXR1c01hcCA9IHRhc2tTdGF0dXNNYXA7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJ0aGlzLkN1cnJlbnRJbmZvLnRhc2tUeXBlXCIsIHRoaXMuQ3VycmVudEluZm8udGFza1R5cGUsIHRoaXMuQ3VycmVudEluZm8uQXVkaXRTdGF0dXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UGFyYW1zKCkge1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgQ2hlY2tHZXRMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICBwYXJhbXMucGFnZVNpemUgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHBhcmFtcy51c2VySWQgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVc2VySWQoKTtcclxuICAgICAgICBwYXJhbXMudGFza1R5cGUgPSB0aGlzLkN1cnJlbnRJbmZvLnRhc2tUeXBlID09ICdhbGwnID8gbnVsbCA6IHRoaXMuQ3VycmVudEluZm8udGFza1R5cGU7XHJcbiAgICAgICAgcGFyYW1zLmF1ZGl0U3RhdHVzID0gdGhpcy5DdXJyZW50SW5mby5BdWRpdFN0YXR1cyA9PSAnYWxsJyA/IG51bGwgOiB0aGlzLkN1cnJlbnRJbmZvLkF1ZGl0U3RhdHVzO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICBwYXJhbXMudGltZVN0YXJ0ID0gbW9tZW50KHRoaXMuc3RhcnRUaW1lKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgcGFyYW1zLnRpbWVFbmQgPSBtb21lbnQodGhpcy5lbmRUaW1lKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwYXJhbXMudGltZVN0YXJ0ID0gbnVsbDtcclxuICAgICAgICAgICAgcGFyYW1zLnRpbWVFbmQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGFyYW1zO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0VGFibGVIZWFkID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMudEhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICB7IGZpZWxkOiAnJywgdGl0bGU6ICfku7vliqHnsbvlnosnIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICcnLCB0aXRsZTogJ+S7u+WKoeWQjeensCcgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogJycsIHRpdGxlOiAn5omA5bGe5Yy65Z+fJyB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiAnJywgdGl0bGU6ICfliJvlu7rkuronIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICcnLCB0aXRsZTogJ+W4g+aOp+exu+WeiycgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogJycsIHRpdGxlOiAn5pyJ5pWI5pe26Ze0JyB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiAnJywgdGl0bGU6ICfku7vliqHnirbmgIEnIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6ICcnLCB0aXRsZTogJ+aPj+i/sCcgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogJycsIHRpdGxlOiAn5a6h5qC454q25oCBJyB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiAnJywgdGl0bGU6ICfmk43kvZwnIH0sXHJcbiAgICAgICAgXTtcclxuICAgIH07XHJcblxyXG4gICAgZWRpdENoZWNrKGRhdGE6IE15Q2hlY2tNb2RlbCkge1xyXG4gICAgICAgIC8vIOWFiOaLv+WIsOeUqOS6jnBvcHVw5bGV56S655qE57yT5a2Y5L+h5oGvXHJcbiAgICAgICAgbGV0IGFyciA9IFt0aGlzLmdldFBvcHVwQ2FjaGUoKSwgdGhpcy5nZXRUYXNrRGV0YWlsKGRhdGEudElkLCBkYXRhLnRhc2tUeXBlKV07XHJcbiAgICAgICAgdGhpcy4kcS5hbGwoYXJyKS50aGVuKChyZXM6IFtudWxsLCBDaGVja1Rhc2tNb2RlbF0pID0+IHtcclxuICAgICAgICAgICAgbGV0IHNjb3BlOiBNeUNoZWNrRGV0YWlsc1BhcmFtcyA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICAgICAgc2NvcGUuTXlDaGVjayA9IGRhdGE7XHJcbiAgICAgICAgICAgIHNjb3BlLk15VGFza01vZGVsID0gcmVzWzFdO1xyXG4gICAgICAgICAgICBzY29wZS5CdXNpbmVzc0xpYkRhdGFzID0gdGhpcy5idXNpbmVzc0xpYkNhY2hlcztcclxuICAgICAgICAgICAgc2NvcGUuQ2FtZXJhRGF0YXMgPSB0aGlzLmFyZWFDYW1lcmFDYWNoZXM7XHJcbiAgICAgICAgICAgIHNjb3BlLlVzZXJEYXRhcyA9IHRoaXMudXNlckNhY2hlcztcclxuICAgICAgICAgICAgc2NvcGUuQXVkaXRTdGF0dXNNYXAgPSB0aGlzLmF1ZGl0U3RhdHVzTWFwO1xyXG4gICAgICAgICAgICBzY29wZS5UYXNrU3RhdHVzTWFwID0gdGhpcy50YXNrU3RhdHVzTWFwO1xyXG4gICAgICAgICAgICBzY29wZS5UYXNrVHlwZU1hcCA9IHRoaXMudGFza1R5cGVNYXA7XHJcbiAgICAgICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY29udGVudDogYW55O1xyXG4gICAgICAgICAgICBsZXQgYXJlYTogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhLnRhc2tUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiVmVoaWNsZU1vbml0b3JcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBhbmd1bGFyLmNvcHkodmVoaWNsZURldGFpbHNQb3B1bCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYSA9IFtcIjY0MHB4XCIsIFwiMzg3cHhcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJGYWNlTW9uaXRvclwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudCA9IGFuZ3VsYXIuY29weShlZGl0SHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJlYSA9IFtcIjY0MHB4XCIsIFwiNjY1cHhcIl07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgXCJNQUNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBhbmd1bGFyLmNvcHkobWFjRGV0YWlsc1BvcHVsKTtcclxuICAgICAgICAgICAgICAgICAgICBhcmVhID0gW1wiNjQwcHhcIiwgXCIyMzdweFwiXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdG46IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGFyZWE6IGFyZWEsXHJcbiAgICAgICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRPRE8g5b6F56Gu5a6a57G75Z6L5p2l5pi+56S6XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0VGFza0RldGFpbCh0SWQ6IHN0cmluZywgdGFzdFR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCB0eXBlID0gLTE7XHJcbiAgICAgICAgc3dpdGNoICh0YXN0VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLkZhY2VNb25pdG9yLnZhbHVlOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLkZhY2VTdHJ1Y3QudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gMTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLklNRUlNb25pdG9yLnZhbHVlOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLklNU0lNb25pdG9yLnZhbHVlOlxyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLk1hY01vbml0b3IudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gMjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRhc2tUeXBlLkNhck1vbml0b3IudmFsdWU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuVmVoaWNsZVN0cnVjdC52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuVmVkaW9TdHJ1Y3QudmFsdWU6XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gMDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhc2tTZXJ2aWNlLmZpbmRGYWNlQnlJZCh0SWQpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8VGFza01vZGVsPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyAmJiByZXMuZGF0YSB8fCAoe30gYXMgQ2hlY2tUYXNrTW9kZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWRlb1N0cnVjdHVyZWRUYXNrc1NlcnZpY2UuZ2V0RmFjZURldGFpbCh0SWQpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8VGFza01vZGVsPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyAmJiByZXMuZGF0YSB8fCAoe30gYXMgQ2hlY2tUYXNrTW9kZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YXNrU2VydmljZS5maW5kUmZpZEJ5SWQodElkKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PE1hY01vbml0b3I+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzICYmIHJlcy5kYXRhIHx8ICh7fSBhcyBDaGVja1Rhc2tNb2RlbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRhc2tTZXJ2aWNlLmZpbmRDYXJCeUlkKHRJZCkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxDYXJNb25pdG9yPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcyAmJiByZXMuZGF0YSB8fCAoe30gYXMgQ2hlY2tUYXNrTW9kZWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcS5kZWZlcigpLnJlc29sdmUoe30gYXMgQ2hlY2tUYXNrTW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsb3NlTXlDaGVja0RldGFpbHMoZmxhZz86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSAtMTtcclxuICAgICAgICBpZiAoIWZsYWcpIHtcclxuICAgICAgICAgICAgLy8g5Yi35paw55WM6Z2iXHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VhcmNoKCkge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSB0aGlzLmdldFBhcmFtcygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIC8vIHRoaXMuZmluZExpc3RQYXJhbXMudXNlcklkID0gXCJkOTI0MGMzYzk4YjU0MWQ1YTU4NTlkMmEwNGVjZjFmMFwiO1xyXG4gICAgICAgIHRoaXMubXlDaGVja1NlcnZpY2UuZmluZExpc3RCeVBhZ2UodGhpcy5maW5kTGlzdFBhcmFtcykudGhlbigocGFnZVJlc3VsdE9iajogUGFnZVJlc3VsdDxNeUNoZWNrTW9kZWw+KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhZ2VSZXN1bHRPYmopO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgIHBhZ2VQYXJhbXMudG90YWxDb3VudCA9IHBhZ2VSZXN1bHRPYmouVG90YWxDb3VudCB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMgPSBwYWdlUGFyYW1zO1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IHBhZ2VSZXN1bHRPYmouUmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAodGhpcy50Qm9keUxpc3QgJiYgdGhpcy50Qm9keUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhdWRpdChkYXRhOiBNeUNoZWNrTW9kZWwpIHtcclxuICAgICAgICBpZiAoIWRhdGEgfHwgZGF0YS5hdWRpdFN0YXR1cyAhPSBBdWRpdFN0YXR1cy5WZXJpZmluZy52YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0YXNrVHlwZSA9IGRhdGEudGFza1R5cGU7XHJcbiAgICAgICAgbGV0IHRhc2tJZCA9IGRhdGEudElkO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0oXCLku7vliqE8c3BhbiBzdHlsZT0nY29sb3I6ICNmYWEwMzcnPlwiICsgZGF0YS50TmFtZSArIFwiPC9zcGFuPuaYr+WQpumAmui/hz9cIiwge1xyXG4gICAgICAgICAgICBpY29uOiAzLFxyXG4gICAgICAgICAgICBza2luOiAnbGF5ZXItZXh0LW1vb24nLFxyXG4gICAgICAgICAgICBidG46IFsn6YCa6L+HJywgJ+aLkue7nSddXHJcbiAgICAgICAgfSwgKGluZGV4OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gQXVkaXRTdGF0dXMuVmVyaWZpZWQudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXVkaXRTdGF0dXModGFza0lkLCB0YXNrVHlwZSwgcmVzdWx0KTtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBBdWRpdFN0YXR1cy5SZWZ1c2UudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXVkaXRTdGF0dXModGFza0lkLCB0YXNrVHlwZSwgcmVzdWx0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLnNlYXJjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VTaXplKGNvdW50OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gY291bnQ7XHJcbiAgICAgICAgdGhpcy5zZWFyY2goKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VTdGF0dXMoKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbkNoZWNrKHN0YXR1czogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXR1cyA9PT0gQXVkaXRTdGF0dXMuVmVyaWZpbmcudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZnRlclVwZGF0ZUF1ZGl0KCkge1xyXG4gICAgICAgIHRoaXMuc2VhcmNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVBdWRpdFN0YXR1cyh0SWQ6IHN0cmluZywgdGFza1R5cGU6IHN0cmluZywgYXVkaXRTdGF0dXM6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJ1cGRhdGVBdWRpdFN0YXR1c1wiLCB0SWQsIHRhc2tUeXBlLCBhdWRpdFN0YXR1cyk7XHJcbiAgICAgICAgbGV0IHR5cGUgPSAtMTtcclxuICAgICAgICBzd2l0Y2ggKHRhc2tUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuRmFjZU1vbml0b3IudmFsdWU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuRmFjZVN0cnVjdC52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAxO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuSU1FSU1vbml0b3IudmFsdWU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuSU1TSU1vbml0b3IudmFsdWU6XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuTWFjTW9uaXRvci52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVGFza1R5cGUuQ2FyTW9uaXRvci52YWx1ZTpcclxuICAgICAgICAgICAgY2FzZSBUYXNrVHlwZS5WZWhpY2xlU3RydWN0LnZhbHVlOlxyXG4gICAgICAgICAgICAgICAgdHlwZSA9IDM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUYXNrVHlwZS5WZWRpb1N0cnVjdC52YWx1ZTpcclxuICAgICAgICAgICAgICAgIHR5cGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgIC8vIOi1sOS6uuWDj+aOpeWPo1xyXG4gICAgICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLnVwZGF0ZUF1ZGl0U3RhdHVzKHRJZCwgYXVkaXRTdGF0dXMpLnRoZW4odGhpcy5hZnRlclVwZGF0ZUF1ZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gMikge1xyXG4gICAgICAgICAgICAvLyDotbDmhJ/nn6XmjqXlj6NcclxuICAgICAgICAgICAgdGhpcy50YXNrU2VydmljZS5hdWRpdE1hY1N0YXR1cyh0SWQsIGF1ZGl0U3RhdHVzKS50aGVuKHRoaXMuYWZ0ZXJVcGRhdGVBdWRpdC5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDMpIHtcclxuICAgICAgICAgICAgLy8g6LWw6L2m6L6G5o6l5Y+jXHJcbiAgICAgICAgICAgIHRoaXMudGFza1NlcnZpY2UuYXVkaXRWZWhpY2xlU3RhdHVzKHRJZCwgYXVkaXRTdGF0dXMpLnRoZW4odGhpcy5hZnRlclVwZGF0ZUF1ZGl0LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCLor6Xku7vliqHmsqHmnInmraPnoa7nmoTku7vliqHnsbvlnotcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0UG9wdXBDYWNoZSgpIHtcclxuICAgICAgICBsZXQgYXJyOiBbUHJvbWlzZTxBcnJheTxDYW1lcmFFeCB8IEFyZWFFeD4+LCBQcm9taXNlPEFycmF5PEJ1c2luZXNzTGliRXg+PiwgUHJvbWlzZTxBcnJheTxQZXJzb25FeD4+XSA9IFt0aGlzLmdldEFyZWFDYW1lcmEoKSwgdGhpcy5nZXRCdXNpbmVzc0xpYigpLCB0aGlzLmdldFVzZXIoKV0gYXMgYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRxLmFsbChhcnIpLnRoZW4oKHJlc0FycjogW0FycmF5PENhbWVyYUV4IHwgQXJlYUV4PiwgQXJyYXk8QnVzaW5lc3NMaWJFeD4sIEFycmF5PFBlcnNvbkV4Pl0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRBcmVhQ2FtZXJhKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFyZWFDYW1lcmFDYWNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEuZGVmZXIoKS5yZXNvbHZlKHRoaXMuYXJlYUNhbWVyYUNhY2hlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhQ2FtZXJhKCkudGhlbigoZGF0YXM6IEFycmF5PENhbWVyYUV4IHwgQXJlYUV4PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhQ2FtZXJhQ2FjaGVzID0gZGF0YXMgYXMgQXJyYXk8Q2FtZXJhRXggfCBBcmVhRXg+O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXJlYUNhbWVyYUNhY2hlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0QnVzaW5lc3NMaWIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYnVzaW5lc3NMaWJDYWNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEuZGVmZXIoKS5yZXNvbHZlKHRoaXMuYnVzaW5lc3NMaWJDYWNoZXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1c2luZXNzTGliU2VydmljZS5maW5kSGFzU2VsZlRyZWUoKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PEFycmF5PEJ1c2luZXNzTGliRXg+PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzc0xpYkNhY2hlcyA9IChyZXMgJiYgcmVzLmRhdGEpIHx8IFtdIGFzIEFycmF5PEJ1c2luZXNzTGliRXg+O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRVc2VyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJDYWNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEuZGVmZXIoKS5yZXNvbHZlKHRoaXMudXNlckNhY2hlcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhV2l0aFBlcnNvbigpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgUGVyc29uVHJlZUV4PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyQ2FjaGVzID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHBcclxuICAgIC5jb250cm9sbGVyKCdNeUNoZWNrQ29udHJvbGxlcicsIE15Q2hlY2tDb250cm9sbGVyKTsiXX0=
