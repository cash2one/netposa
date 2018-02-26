define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoServerService = (function () {
        function VideoServerService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        VideoServerService.prototype.findListByParams = function (params) {
            var _params = params;
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/VideoServer/findListByParams',
            });
        };
        ;
        VideoServerService.prototype.findById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/VideoServer/findById',
            });
        };
        ;
        VideoServerService.prototype.update = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/VideoServer/update',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        VideoServerService.prototype.save = function (params) {
            console.log(params);
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/VideoServer/save',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        VideoServerService.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/VideoServer/deleteById',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        VideoServerService.prototype.deleteByIds = function (ids) {
            var _params = {
                ids: ids
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/VideoServer/deleteByIds',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        VideoServerService.prototype.isHasTask = function (ids) {
            var _params = {
                ids: ids
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/VideoServer/isHasTask',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.View.code
            }));
        };
        ;
        VideoServerService.prototype.synchronize = function (id) {
            return this.$http({
                method: "post",
                url: "/bcs/video/syncVideoServer",
                params: { videoServerId: id },
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoServer.code,
                ActionType: OperActionType_1.OperActionType.Sync.code
            }));
        };
        VideoServerService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return VideoServerService;
    }());
    main_app_1.app
        .service('videoServerService', VideoServerService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3ZpZGVvU2VydmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUNBO1FBS0ksNEJBQW9CLEtBQVUsRUFBVSxhQUFxQyxFQUFTLGdCQUFrQztZQUFwRyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUNwSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELDZDQUFnQixHQUFoQixVQUFrQixNQUE2QjtZQUMzQyxJQUFJLE9BQU8sR0FBSSxNQUFNLENBQUM7WUFDdEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE9BQU87Z0JBQ2YsR0FBRyxFQUFDLGtDQUFrQzthQUN6QyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLHFDQUFRLEdBQVIsVUFBVSxFQUFVO1lBQ2hCLElBQUksT0FBTyxHQUFtQjtnQkFDMUIsRUFBRSxFQUFDLEVBQUU7YUFDUixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE9BQU87Z0JBQ2YsR0FBRyxFQUFDLDBCQUEwQjthQUNqQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLG1DQUFNLEdBQU4sVUFBUSxNQUFxQjtZQUN6QixJQUFJLE9BQU8sR0FBRztnQkFDVixLQUFLLEVBQUMsTUFBTTthQUNmLENBQUM7WUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztn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QUMsRUFBRSxFQUFDO2FBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDZCQUE2QixDQUFDLElBQUk7Z0JBQ25FLFVBQVUsRUFBRSwrQkFBYyxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQTNITSwwQkFBTyxHQUFpQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQTRIaEYseUJBQUM7S0E5SEQsQUE4SEMsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3ZpZGVvU2VydmVyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1ZpZGVvU2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1ZpZGVvU2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1ZpZGVvU2VydmVyfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvVmlkZW9TZXJ2ZXJcIjtcclxuaW1wb3J0IHtcclxuICAgIElGaW5kQnlJZFBhcmFtcywgSURlbGV0ZUJ5SWQsXHJcbiAgICBJRGVsZXRlQnlJZHNcclxufSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVxdWVzdC9SZXF1ZXN0UGFyYW1zXCI7XHJcblxyXG5pbXBvcnQge1ZpZGVvU2VydmVyRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9WaWRlb1NlcnZlckV4XCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueSxyZXF1aXJlOmFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpZGVvU2VydmVyU2VydmljZSB7XHJcbiAgICBmaW5kTGlzdEJ5UGFyYW1zKHBhcmFtczogVmlkZW9TZXJ2ZXJMaXN0UGFyYW1zKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgZmluZEJ5SWQoaWQ6IHN0cmluZyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHVwZGF0ZShwYXJhbXM6IFZpZGVvU2VydmVyRXgpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkKGlkOiBzdHJpbmcpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBzYXZlKHBhcmFtczogVmlkZW9TZXJ2ZXIpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBzeW5jaHJvbml6ZTooaWQ6c3RyaW5nKT0+UHJvbWlzZTxhbnk+O1xyXG4gICAgaXNIYXNUYXNrKGlkczogQXJyYXk8c3RyaW5nPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbn1cclxuY2xhc3MgVmlkZW9TZXJ2ZXJTZXJ2aWNlIGltcGxlbWVudHMgSVZpZGVvU2VydmVyU2VydmljZXtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDpBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsJ25vdGlmeUZhY3RvcnknLCdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnkscHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OklTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZExpc3RCeVBhcmFtcyAocGFyYW1zOiBWaWRlb1NlcnZlckxpc3RQYXJhbXMpIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9ICBwYXJhbXM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvZGIvVmlkZW9TZXJ2ZXIvZmluZExpc3RCeVBhcmFtcycsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgZmluZEJ5SWQgKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRmluZEJ5SWRQYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGlkOmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9WaWRlb1NlcnZlci9maW5kQnlJZCcsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlIChwYXJhbXM6IFZpZGVvU2VydmVyRXgpIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgbW9kZWw6cGFyYW1zXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9WaWRlb1NlcnZlci91cGRhdGUnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9WaWRlb1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZSAocGFyYW1zOiBWaWRlb1NlcnZlcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcyk7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG1vZGVsOnBhcmFtc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvVmlkZW9TZXJ2ZXIvc2F2ZScsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcyksXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1ZpZGVvU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkIChpZDogc3RyaW5nKXtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZCA9IHtcclxuICAgICAgICAgICAgaWQ6aWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL1ZpZGVvU2VydmVyL2RlbGV0ZUJ5SWQnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9WaWRlb1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZHMgKGlkczogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgbGV0IF9wYXJhbXM6SURlbGV0ZUJ5SWRzID0ge1xyXG4gICAgICAgICAgICBpZHM6aWRzXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9WaWRlb1NlcnZlci9kZWxldGVCeUlkcycsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcyksXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1ZpZGVvU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuICAgIGlzSGFzVGFzayAoaWRzOiBBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAgICAgICAgIGlkczppZHNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL1ZpZGVvU2VydmVyL2lzSGFzVGFzaycsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcyksXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1ZpZGVvU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlZpZXcuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcbiAgICBzeW5jaHJvbml6ZShpZDpzdHJpbmcpOlByb21pc2U8YW55PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvYmNzL3ZpZGVvL3N5bmNWaWRlb1NlcnZlclwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHt2aWRlb1NlcnZlcklkOmlkfSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfVmlkZW9TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuU3luYy5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCd2aWRlb1NlcnZlclNlcnZpY2UnLCBWaWRlb1NlcnZlclNlcnZpY2UpOyJdfQ==
