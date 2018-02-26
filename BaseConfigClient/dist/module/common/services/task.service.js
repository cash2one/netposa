define(["require", "exports", "../app/main.app", "../../../core/server/enum/DataOperType", "../../../core/server/TaskModel", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/SystemLog.factory"], function (require, exports, main_app_1, DataOperType_1, TaskModel_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var TaskService = (function () {
        function TaskService($http, $q, notifyFactory, userInfoCacheFactory, systemLogFactory) {
            var _this = this;
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.systemLogFactory = systemLogFactory;
            this.findMacListByParams = function (params) {
                return _this.$http({
                    method: "get",
                    params: params,
                    url: "/db/taskconfig/mactask/search",
                });
            };
            this.findCarListByParams = function (params) {
                return _this.$http({
                    method: "get",
                    params: params,
                    url: "/db/taskconfig/cartask/search",
                });
            };
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        TaskService.prototype.addOrUpdateFaceTask = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/taskconfig/facetask/addOrUpdate"
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            })).then(this.notifyFunc);
        };
        TaskService.prototype.getTaskByDeviceID = function (id, type) {
            return this.$http({
                method: "post",
                params: { ID: id, type: type },
                url: "/db/taskconfig/facetask/getFaceTaskIDs"
            });
        };
        ;
        TaskService.prototype.findFaceListByParams = function (params) {
            return this.$http({
                method: "get",
                params: params,
                url: "/db/taskconfig/facetask/search",
            });
        };
        ;
        TaskService.prototype.findFaceById = function (ID) {
            return this.$http({
                method: "get",
                params: { ID: ID },
                url: "/db/taskconfig/facetask/detail"
            });
        };
        ;
        TaskService.prototype.findFaceByTaskId = function (ID) {
            return this.$http({
                method: "get",
                params: { ID: ID },
                url: "/db/taskconfig/task/findFaceByTaskId"
            });
        };
        ;
        TaskService.prototype.findCarById = function (ID) {
            return this.$http({
                method: "get",
                params: { ID: ID },
                url: "/db/taskconfig/cartask/detail"
            });
        };
        ;
        TaskService.prototype.findRfidById = function (ID) {
            return this.$http({
                method: "get",
                params: { ID: ID },
                url: "/db/taskconfig/rfidtask/detail"
            });
        };
        ;
        TaskService.prototype.deleteCarTaskForIDS = function (ids) {
            return this.$http({
                method: "post",
                params: { taskGroupIds: ids.toString() },
                url: "/pdp/vehicleTask/delete",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        TaskService.prototype.deleteFaceTaskForIDS = function (ids) {
            return this.$http({
                method: "post",
                params: { taskGroupIds: ids.toString() },
                url: "/pdp/videoTask/delete",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        TaskService.prototype.deleteMacTaskForIDS = function (ids) {
            return this.$http({
                method: "post",
                params: { taskIds: ids.toString() },
                url: "/pdp/macTask/delete",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        TaskService.prototype.updateAuditStatus = function (id, auditStatusValue) {
            var _params = new TaskModel_1.TaskModel();
            _params.ID = id;
            _params.AuditStatus = auditStatusValue;
            _params.OperateType = DataOperType_1.DataOperType.Update.value;
            return this.$http({
                method: "post",
                data: _params,
                url: "/pdp/videoTask/auditTask",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.auditMacStatus = function (id, auditStatus) {
            var params = {
                taskId: id,
                verifyState: auditStatus
            };
            return this.$http({
                url: "/pdp/rfidCtrl/macTask/audit",
                method: "post",
                params: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.auditVehicleStatus = function (id, auditStatus) {
            var params = {};
            params.id = id;
            params.auditStatus = auditStatus;
            return this.$http({
                url: "/pdp/vehicleTask/auditTask",
                method: "post",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.updateFaceRunStatus = function (ids, isStart) {
            var params = {
                taskGroupIds: ids,
                isStart: isStart
            };
            return this.$http({
                method: "post",
                params: params,
                url: "/pdp/videoTask/updateTaskStatus",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.updateCarRunStatus = function (ids, isStart) {
            var params = {
                taskGroupIds: ids,
                isStart: isStart
            };
            return this.$http({
                method: "post",
                params: params,
                url: "/pdp/vehicleTask/updateTaskStatus",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.updateMacRunStatus = function (ids, isStart) {
            var params = {
                taskGroupIds: ids,
                isStart: isStart
            };
            return this.$http({
                method: "post",
                params: params,
                url: "/pdp/macTask/updateTaskStatus",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        TaskService.prototype.addOrUpdateRfidTask = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/taskconfig/rfidtask/addOrUpdate",
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            })).then(this.notifyFunc);
        };
        TaskService.prototype.addOrUpdateCarTask = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/taskconfig/cartask/addOrUpdate"
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Business.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Business_MonitorTask.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            })).then(this.notifyFunc);
        };
        TaskService.prototype.uploadCarPhoto = function (params) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/db/upload/image', true);
                xhr.onreadystatechange = function (ev) {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        console.log(JSON.parse(xhr.responseText));
                        resolve(JSON.parse(xhr.responseText));
                    }
                };
                xhr.onerror = function (err) {
                    reject(err);
                };
                xhr.send(params);
            });
        };
        TaskService.prototype.getAlarmTaskIds = function () {
            var userId = this.userInfoCacheFactory.getCurrentUserId();
            var params = {
                userId: userId
            };
            return this.$http({
                method: 'get',
                url: "/db/taskconfig/getTaskIdsByUserId",
                params: params
            });
        };
        TaskService.prototype.getUserIdByPersonId = function (IDs) {
            console.log(IDs);
            var params = {
                IDs: IDs
            };
            return this.$http({
                method: 'post',
                url: "/db/taskconfig/getUserIdByPersonId",
                params: params
            });
        };
        TaskService.$inject = ['$http', '$q', 'notifyFactory', 'userInfoCacheFactory', 'systemLogFactory'];
        return TaskService;
    }());
    main_app_1.app
        .service('taskService', TaskService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFpQkEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBZ0RyQztRQUlJLHFCQUFvQixLQUFVLEVBQVMsRUFBTyxFQUFTLGFBQXFDLEVBQVUsb0JBQTJDLEVBQVMsZ0JBQWtDO1lBQTVMLGlCQUVDO1lBRm1CLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBUyxPQUFFLEdBQUYsRUFBRSxDQUFLO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFnRTVMLHdCQUFtQixHQUFHLFVBQUMsTUFBdUI7Z0JBQzFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxLQUFLO29CQUNaLE1BQU0sRUFBRSxNQUFNO29CQUNkLEdBQUcsRUFBQywrQkFBK0I7aUJBQ3RDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQUNGLHdCQUFtQixHQUFHLFVBQUMsTUFBdUI7Z0JBQzFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDO29CQUNkLE1BQU0sRUFBQyxLQUFLO29CQUNaLE1BQU0sRUFBRSxNQUFNO29CQUNkLEdBQUcsRUFBQywrQkFBK0I7aUJBQ3RDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQztZQTVFRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELHlDQUFtQixHQUFuQixVQUFvQixNQUFVO1lBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxNQUFNO2dC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QyxPQUFPLEdBQUcsVUFBQyxHQUFPO29CQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2YsQ0FBQyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQscUNBQWUsR0FBZjtZQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzFELElBQUksTUFBTSxHQUFtQztnQkFDekMsTUFBTSxFQUFFLE1BQU07YUFDakIsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLEdBQUcsRUFBRSxtQ0FBbUM7Z0JBQ3hDLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCx5Q0FBbUIsR0FBbkIsVUFBb0IsR0FBaUI7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLE1BQU0sR0FBUTtnQkFDZCxHQUFHLEVBQUUsR0FBRzthQUNYLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxHQUFHLEVBQUUsb0NBQW9DO2dCQUN6QyxNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7UUFDUCxDQUFDO1FBbFNNLG1CQUFPLEdBQWlCLENBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxlQUFlLEVBQUMsc0JBQXNCLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQW1TNUcsa0JBQUM7S0FyU0QsQUFxU0MsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUN2QyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Rhc2suc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1Rhc2tMaXN0UGFyYW1zLCBkZXZpY2VJbmZvLCBUYXNrQ29uZmlnR2V0QWxhcm1UYXNrSWRzUGFyYW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9UYXNrQ29uZmlnUGFyYW1zXCI7XHJcbmltcG9ydCB7RGF0YU9wZXJUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9EYXRhT3BlclR5cGVcIjtcclxuaW1wb3J0IHtCYWNrUmVzcG9uc2VCb2R5LCBSZXNwb25zZVJlc3VsdH0gZnJvbSAnLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1Rhc2tTZWFyY2hQYXJhbXMsVGFza01vZGVsLE1hY01vbml0b3IsQ2FyTW9uaXRvcn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL1Rhc2tNb2RlbFwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tICcuLi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnknO1xyXG5cclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IHt2ZWhpY2xlQXVkaXRQYXJhbX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L015Q2hlY2tcIjtcclxubGV0IFByb21pc2UgPSByZXF1aXJlKCdlczYtcHJvbWlzZScpO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksJDphbnkscmVxdWlyZTphbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElUYXNrU2VydmljZSB7XHJcblxyXG4gICAgLy8g5pu05paw5a6h5qC454q25oCBXHJcbiAgICAvLyDlrqHmoLjkurrlg4/luIPmjqflkozkurrlg4/nu5PmnoTljJbku7vliqFcclxuICAgIHVwZGF0ZUF1ZGl0U3RhdHVzKGlkOnN0cmluZyxhdWRpdFN0YXR1c1ZhbHVlOnN0cmluZyk6YW55O1xyXG4gICAgYXVkaXRWZWhpY2xlU3RhdHVzKGlkOnN0cmluZyxhdWRpdFN0YXR1c1ZhbHVlOnN0cmluZyk6YW55O1xyXG4gICAgLy8g5a6h5qC4bWFj55u45YWz55qEIOWMheWQqyBtYWPku7vliqEgaW1zaeS7u+WKoSBpbWVp5Lu75YqhXHJcbiAgICBhdWRpdE1hY1N0YXR1cyhpZDogc3RyaW5nLCBhdWRpdFN0YXR1czogc3RyaW5nKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxuICAgIGZpbmRGYWNlQnlUYXNrSWQoSUQ6c3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxUYXNrTW9kZWw+PjtcclxuICAgIGZpbmRGYWNlQnlJZChJRDpzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PFRhc2tNb2RlbD4+O1xyXG4gICAgZmluZEZhY2VMaXN0QnlQYXJhbXMocGFyYW1zOlRhc2tTZWFyY2hQYXJhbXMpOmFueTtcclxuICAgIGZpbmRNYWNMaXN0QnlQYXJhbXMocGFyYW1zOlRhc2tTZWFyY2hQYXJhbXMpOmFueTtcclxuICAgIGZpbmRDYXJMaXN0QnlQYXJhbXMocGFyYW1zOlRhc2tTZWFyY2hQYXJhbXMpOmFueTtcclxuICAgIGRlbGV0ZUNhclRhc2tGb3JJRFMocGFyYW1zOkFycmF5PHN0cmluZz4pOmFueTtcclxuICAgIGRlbGV0ZUZhY2VUYXNrRm9ySURTKHBhcmFtczpBcnJheTxzdHJpbmc+KTphbnk7XHJcbiAgICBkZWxldGVNYWNUYXNrRm9ySURTKHBhcmFtczpBcnJheTxzdHJpbmc+KTphbnk7XHJcblxyXG4gICAgYWRkT3JVcGRhdGVGYWNlVGFzayhwYXJhbXM6YW55KTpQcm9taXNlPEJhY2tSZXNwb25zZUJvZHk8c3RyaW5nPj47XHJcbiAgICBmaW5kQ2FyQnlJZChpZDpzdHJpbmcpOlByb21pc2U8QmFja1Jlc3BvbnNlQm9keTxDYXJNb25pdG9yPj47XHJcblxyXG5cclxuICAgIHVwZGF0ZUZhY2VSdW5TdGF0dXMoaWRzOnN0cmluZyxpc1N0YXJ0OmJvb2xlYW4pOmFueTtcclxuICAgIHVwZGF0ZUNhclJ1blN0YXR1cyhpZHM6c3RyaW5nLGlzU3RhcnQ6Ym9vbGVhbik6YW55O1xyXG4gICAgdXBkYXRlTWFjUnVuU3RhdHVzKGlkczpzdHJpbmcsaXNTdGFydDpib29sZWFuKTphbnk7XHJcblxyXG4gICAgYWRkT3JVcGRhdGVSZmlkVGFzayhwYXJhbXM6YW55KSA6IGFueTtcclxuICAgIGZpbmRSZmlkQnlJZChpZDpzdHJpbmcpOlByb21pc2U8QmFja1Jlc3BvbnNlQm9keTxNYWNNb25pdG9yPj47XHJcblxyXG4gICAgYWRkT3JVcGRhdGVDYXJUYXNrKHBhcmFtczphbnkpOmFueTtcclxuXHJcbiAgICB1cGxvYWRDYXJQaG90byhwYXJhbXM6Rm9ybURhdGEpOiBhbnk7XHJcbiAgICAvLyDpgJrov4fmkYTlg4/mnLpJROaLv+WIsOS7u+WKoXRhc2tJRFxyXG4gICAgZ2V0VGFza0J5RGV2aWNlSUQoaWQ6c3RyaW5nLHR5cGU6c3RyaW5nKTogYW55XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeeUqOaIt+WPr+S7peafpeeci+eahOaJgOacieaKpeitpuS7u+WKoWlkXHJcbiAgICAgKi9cclxuICAgIGdldEFsYXJtVGFza0lkcygpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PEFycmF5PHN0cmluZz4+PjtcclxuICAgIGdldFVzZXJJZEJ5UGVyc29uSWQoSUQ6QXJyYXk8c3RyaW5nPik6IGFueTtcclxufVxyXG4vKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg5Lu75Yqh566h55CGIOWinuWIoOaUueafpSDor7fmsYJcclxuICogQHRpbWU6IDIwMTctMDYtMTQgMTE6MjQ6MDFcclxuICogQHBhcmFtczpcclxuICogQHJldHVybjpcclxuICovXHJcbmNsYXNzIFRhc2tTZXJ2aWNlIGltcGxlbWVudHMgSVRhc2tTZXJ2aWNle1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnJHEnLCdub3RpZnlGYWN0b3J5JywndXNlckluZm9DYWNoZUZhY3RvcnknLCdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnkscHJpdmF0ZSAkcTogYW55LHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5LHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTpJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcbiAgICBhZGRPclVwZGF0ZUZhY2VUYXNrKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3Rhc2tjb25maWcvZmFjZXRhc2svYWRkT3JVcGRhdGVcIlxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpXHJcbiAgICB9XHJcbiAgICBnZXRUYXNrQnlEZXZpY2VJRCAoaWQ6c3RyaW5nLHR5cGU6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge0lEOiBpZCx0eXBlOnR5cGV9LFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3Rhc2tjb25maWcvZmFjZXRhc2svZ2V0RmFjZVRhc2tJRHNcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGZpbmRGYWNlTGlzdEJ5UGFyYW1zICAocGFyYW1zOlRhc2tTZWFyY2hQYXJhbXMpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwiZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvZGIvdGFza2NvbmZpZy9mYWNldGFzay9zZWFyY2hcIixcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIGZpbmRGYWNlQnlJZCAoSUQ6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtJRDpJRH0sXHJcbiAgICAgICAgICAgIHVybDpcIi9kYi90YXNrY29uZmlnL2ZhY2V0YXNrL2RldGFpbFwiXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9O1xyXG4gICAgZmluZEZhY2VCeVRhc2tJZChJRDpzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwiZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge0lEOklEfSxcclxuICAgICAgICAgICAgdXJsOlwiL2RiL3Rhc2tjb25maWcvdGFzay9maW5kRmFjZUJ5VGFza0lkXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgIH07XHJcbiAgICBmaW5kQ2FyQnlJZCAoSUQ6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtJRDpJRH0sXHJcbiAgICAgICAgICAgIHVybDpcIi9kYi90YXNrY29uZmlnL2NhcnRhc2svZGV0YWlsXCJcclxuICAgICAgICB9KVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgZmluZFJmaWRCeUlkKElEOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJnZXRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7SUQ6SUR9LFxyXG4gICAgICAgICAgICB1cmw6XCIvZGIvdGFza2NvbmZpZy9yZmlkdGFzay9kZXRhaWxcIlxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBmaW5kTWFjTGlzdEJ5UGFyYW1zID0gKHBhcmFtczpUYXNrU2VhcmNoUGFyYW1zKT0+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwiZ2V0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvZGIvdGFza2NvbmZpZy9tYWN0YXNrL3NlYXJjaFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgZmluZENhckxpc3RCeVBhcmFtcyA9IChwYXJhbXM6VGFza1NlYXJjaFBhcmFtcyk9PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOlwiL2RiL3Rhc2tjb25maWcvY2FydGFzay9zZWFyY2hcIixcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcblxyXG5cclxuICAgIGRlbGV0ZUNhclRhc2tGb3JJRFMoaWRzOkFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHt0YXNrR3JvdXBJZHM6aWRzLnRvU3RyaW5nKCl9LFxyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL3ZlaGljbGVUYXNrL2RlbGV0ZVwiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVGYWNlVGFza0ZvcklEUyhpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczoge3Rhc2tHcm91cElkczppZHMudG9TdHJpbmcoKX0sXHJcbiAgICAgICAgICAgIHVybDpcIi9wZHAvdmlkZW9UYXNrL2RlbGV0ZVwiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuICAgIGRlbGV0ZU1hY1Rhc2tGb3JJRFMoaWRzOkFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHt0YXNrSWRzOmlkcy50b1N0cmluZygpfSxcclxuICAgICAgICAgICAgdXJsOlwiL3BkcC9tYWNUYXNrL2RlbGV0ZVwiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBdWRpdFN0YXR1cyAgKGlkOnN0cmluZyxhdWRpdFN0YXR1c1ZhbHVlOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSBuZXcgVGFza01vZGVsKCk7XHJcbiAgICAgICAgX3BhcmFtcy5JRCA9IGlkO1xyXG4gICAgICAgIF9wYXJhbXMuQXVkaXRTdGF0dXMgPSBhdWRpdFN0YXR1c1ZhbHVlO1xyXG4gICAgICAgIF9wYXJhbXMuT3BlcmF0ZVR5cGUgPSAgRGF0YU9wZXJUeXBlLlVwZGF0ZS52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDpcIi9wZHAvdmlkZW9UYXNrL2F1ZGl0VGFza1wiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGF1ZGl0TWFjU3RhdHVzICAoaWQ6IHN0cmluZywgYXVkaXRTdGF0dXM6IHN0cmluZyl7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgdGFza0lkOiBpZCxcclxuICAgICAgICAgICAgdmVyaWZ5U3RhdGU6IGF1ZGl0U3RhdHVzXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL3JmaWRDdHJsL21hY1Rhc2svYXVkaXRcIixcclxuICAgICAgICAgICAgbWV0aG9kOlwicG9zdFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGF1ZGl0VmVoaWNsZVN0YXR1cyAgKGlkOiBzdHJpbmcsIGF1ZGl0U3RhdHVzOiBzdHJpbmcpe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSB7fSBhcyB2ZWhpY2xlQXVkaXRQYXJhbTtcclxuICAgICAgICBwYXJhbXMuaWQgPSBpZDtcclxuICAgICAgICBwYXJhbXMuYXVkaXRTdGF0dXMgPSBhdWRpdFN0YXR1cztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL3ZlaGljbGVUYXNrL2F1ZGl0VGFza1wiLFxyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZUZhY2VSdW5TdGF0dXMgIChpZHM6c3RyaW5nLGlzU3RhcnQ6Ym9vbGVhbil7XHJcbiAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgIHRhc2tHcm91cElkczppZHMsXHJcbiAgICAgICAgICAgaXNTdGFydDppc1N0YXJ0XHJcbiAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDpcInBvc3RcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDpcIi9wZHAvdmlkZW9UYXNrL3VwZGF0ZVRhc2tTdGF0dXNcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX01vbml0b3JUYXNrLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpXHJcbiAgICB9O1xyXG4gICAgdXBkYXRlQ2FyUnVuU3RhdHVzIChpZHM6c3RyaW5nLGlzU3RhcnQ6Ym9vbGVhbil7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgdGFza0dyb3VwSWRzOmlkcyxcclxuICAgICAgICAgICAgaXNTdGFydDppc1N0YXJ0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL3ZlaGljbGVUYXNrL3VwZGF0ZVRhc2tTdGF0dXNcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX01vbml0b3JUYXNrLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpXHJcbiAgICB9O1xyXG4gICAgdXBkYXRlTWFjUnVuU3RhdHVzIChpZHM6c3RyaW5nLGlzU3RhcnQ6Ym9vbGVhbil7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgdGFza0dyb3VwSWRzOmlkcyxcclxuICAgICAgICAgICAgaXNTdGFydDppc1N0YXJ0XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHBhcmFtczogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6XCIvcGRwL21hY1Rhc2svdXBkYXRlVGFza1N0YXR1c1wiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3NfTW9uaXRvclRhc2suY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSlcclxuICAgIH07XHJcblxyXG5cclxuICAgIGFkZE9yVXBkYXRlUmZpZFRhc2socGFyYW1zOmFueSl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6XCJwb3N0XCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOlwiL2RiL3Rhc2tjb25maWcvcmZpZHRhc2svYWRkT3JVcGRhdGVcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzcy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0J1c2luZXNzX01vbml0b3JUYXNrLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpLnRoZW4odGhpcy5ub3RpZnlGdW5jKVxyXG4gICAgfVxyXG4gICAgYWRkT3JVcGRhdGVDYXJUYXNrKHBhcmFtczphbnkpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3Rhc2tjb25maWcvY2FydGFzay9hZGRPclVwZGF0ZVwiXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQnVzaW5lc3MuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CdXNpbmVzc19Nb25pdG9yVGFzay5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKS50aGVuKHRoaXMubm90aWZ5RnVuYylcclxuICAgIH1cclxuICAgIHVwbG9hZENhclBob3RvKHBhcmFtczpGb3JtRGF0YSl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlOmFueSxyZWplY3Q6YW55KT0+e1xyXG4gICAgICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHhoci5vcGVuKCdQT1NUJywnL2RiL3VwbG9hZC9pbWFnZScsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoZXYpPT57XHJcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGU9PTQgJiYgeGhyLnN0YXR1cz09MjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlcnI6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycilcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgeGhyLnNlbmQocGFyYW1zKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxhcm1UYXNrSWRzKCl7XHJcbiAgICAgICAgbGV0IHVzZXJJZCA9IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpO1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRhc2tDb25maWdHZXRBbGFybVRhc2tJZHNQYXJhbSA9IHtcclxuICAgICAgICAgICAgdXNlcklkOiB1c2VySWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnZ2V0JyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi90YXNrY29uZmlnL2dldFRhc2tJZHNCeVVzZXJJZFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJZEJ5UGVyc29uSWQoSURzOkFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKElEcyk7XHJcbiAgICAgICAgbGV0IHBhcmFtczogYW55ID0ge1xyXG4gICAgICAgICAgICBJRHM6IElEc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi90YXNrY29uZmlnL2dldFVzZXJJZEJ5UGVyc29uSWRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXNcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgndGFza1NlcnZpY2UnLCBUYXNrU2VydmljZSlcclxuOyJdfQ==
