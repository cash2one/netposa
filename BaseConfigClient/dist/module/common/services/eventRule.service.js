define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = require('es6-promise');
    var EventRuleService = (function () {
        function EventRuleService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        EventRuleService.prototype.findEventRuleListByPage = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/eventRule/findList",
            });
        };
        ;
        EventRuleService.prototype.findAllEventRule = function () {
            return this.$http({
                method: "post",
                url: "/db/eventRule/findAll",
            });
        };
        EventRuleService.prototype.saveOrUpdateEventRule = function (params) {
            return this.$http({
                method: "post",
                data: params,
                url: "/db/eventRule/saveOrUpdate",
            }).then(this.notifyFunc);
        };
        ;
        EventRuleService.prototype.getDetail = function (id) {
            return this.$http({
                method: "post",
                data: { id: id },
                url: "/db/eventRule/detail",
            });
        };
        EventRuleService.prototype.deleteEventRule = function (id) {
            return this.$http({
                method: "post",
                data: { id: id },
                url: "/db/eventRule/delete",
            }).then(this.notifyFunc);
        };
        EventRuleService.prototype.deleteByIds = function (id) {
            var _params = {
                ids: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/eventRule/deleteByIds',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EventRule.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        EventRuleService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return EventRuleService;
    }());
    main_app_1.app
        .service('eventRuleService', EventRuleService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2V2ZW50UnVsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7SUF5QnJDO1FBS0ksMEJBQW9CLEtBQVUsRUFBVSxhQUFxQyxFQUFTLGdCQUFrQztZQUFwRyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUNwSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUdELGtEQUF1QixHQUF2QixVQUF3QixNQUF1QjtZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsd0JBQXdCO2FBQ2hDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxDQUFDO1FBQ0YsMkNBQWdCLEdBQWhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLHVCQUF1QjthQUMvQixDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0QsZ0RBQXFCLEdBQXJCLFVBQXNCLE1BQW1CO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEdBQUcsRUFBRSw0QkFBNEI7YUFDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUFBLENBQUM7UUFDRixvQ0FBUyxHQUFULFVBQVUsRUFBVTtZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDO2dCQUNiLEdBQUcsRUFBRSxzQkFBc0I7YUFDOUIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELDBDQUFlLEdBQWYsVUFBZ0IsRUFBVTtZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDO2dCQUNiLEdBQUcsRUFBRSxzQkFBc0I7YUFDOUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUNELHNDQUFXLEdBQVgsVUFBWSxFQUFpQjtZQUN6QixJQUFJLE9BQU8sR0FBZ0I7Z0JBQ3ZCLEdBQUcsRUFBQyxFQUFFO2FBQ1QsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLE9BQU8sRUFBQyxFQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBQztnQkFDNUMsR0FBRyxFQUFDLDJCQUEyQjtnQkFDL0IsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDJCQUEyQixDQUFDLElBQUk7Z0JBQ2pFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUFBLENBQUM7UUF6REssd0JBQU8sR0FBa0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFDLGtCQUFrQixDQUFDLENBQUM7UUEwRGxGLHVCQUFDO0tBNURELEFBNERDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQ2pEIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvZXZlbnRSdWxlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge0JhY2tSZXNwb25zZUJvZHksIFBhZ2VSZXN1bHQsIFJlc3BvbnNlUmVzdWx0fSBmcm9tICcuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHQnO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7RXZlbnRSdWxlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FdmVudFJ1bGVFeFwiO1xyXG5pbXBvcnQge0V2ZW50UnVsZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0V2ZW50UnVsZVBhcmFtc1wiO1xyXG5pbXBvcnQge0V2ZW50UnVsZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0V2ZW50UnVsZVwiO1xyXG5pbXBvcnQge1xyXG4gICAgSUZpbmRCeUlkUGFyYW1zLCBJRGVsZXRlQnlJZCxcclxuICAgIElEZWxldGVCeUlkc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXF1ZXN0L1JlcXVlc3RQYXJhbXNcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiXHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7T3BlckZpdHN0TW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJTZWNvbmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJUaGlyZE1vZHVsZX0gZnJvbSAgJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuXHJcbmxldCBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55LCAkOiBhbnksIHJlcXVpcmU6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50UnVsZVNlcnZpY2Uge1xyXG5cclxuICAgIGZpbmRFdmVudFJ1bGVMaXN0QnlQYWdlKHBhcmFtczogRXZlbnRSdWxlUGFyYW1zKTogUHJvbWlzZTxCYWNrUmVzcG9uc2VCb2R5PFBhZ2VSZXN1bHQ8RXZlbnRSdWxlRXg+Pj47XHJcblxyXG4gICAgc2F2ZU9yVXBkYXRlRXZlbnRSdWxlKHBhcmFtczogRXZlbnRSdWxlRXgpOiBQcm9taXNlPEJhY2tSZXNwb25zZUJvZHk8QXJyYXk8Ym9vbGVhbj4+PjtcclxuXHJcbiAgICBnZXREZXRhaWwoaWQ6IHN0cmluZyk6IFByb21pc2U8QmFja1Jlc3BvbnNlQm9keTxFdmVudFJ1bGVFeD4+O1xyXG5cclxuICAgIGRlbGV0ZUV2ZW50UnVsZShpZDpzdHJpbmcpOiBQcm9taXNlPEJhY2tSZXNwb25zZUJvZHk8Ym9vbGVhbj4+O1xyXG5cclxuICAgIGZpbmRBbGxFdmVudFJ1bGUoKTogUHJvbWlzZTxCYWNrUmVzcG9uc2VCb2R5PEFycmF5PEV2ZW50UnVsZT4+PjtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZDogQXJyYXk8c3RyaW5nPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbn1cclxuXHJcbi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqICDku7vliqHnrqHnkIYg5aKe5Yig5pS55p+lIOivt+axglxyXG4gKiBAdGltZTogMjAxNy0wNi0xNCAxMToyNDowMVxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuY2xhc3MgRXZlbnRSdWxlU2VydmljZSBpbXBsZW1lbnRzIElFdmVudFJ1bGVTZXJ2aWNlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6SVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmaW5kRXZlbnRSdWxlTGlzdEJ5UGFnZShwYXJhbXM6IEV2ZW50UnVsZVBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2V2ZW50UnVsZS9maW5kTGlzdFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgZmluZEFsbEV2ZW50UnVsZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9ldmVudFJ1bGUvZmluZEFsbFwiLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBzYXZlT3JVcGRhdGVFdmVudFJ1bGUocGFyYW1zOiBFdmVudFJ1bGVFeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2V2ZW50UnVsZS9zYXZlT3JVcGRhdGVcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYylcclxuICAgIH07XHJcbiAgICBnZXREZXRhaWwoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQ6aWR9LFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2V2ZW50UnVsZS9kZXRhaWxcIixcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZGVsZXRlRXZlbnRSdWxlKGlkOiBzdHJpbmcpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YToge2lkOmlkfSxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9ldmVudFJ1bGUvZGVsZXRlXCIsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpXHJcbiAgICB9XHJcbiAgICBkZWxldGVCeUlkcyhpZDogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkcyA9IHtcclxuICAgICAgICAgICAgaWRzOmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9ldmVudFJ1bGUvZGVsZXRlQnlJZHMnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX0V2ZW50UnVsZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ2V2ZW50UnVsZVNlcnZpY2UnLCBFdmVudFJ1bGVTZXJ2aWNlKVxyXG47Il19
