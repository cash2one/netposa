define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProxyServerService = (function () {
        function ProxyServerService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        ProxyServerService.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/ProxyServer/findAll'
            });
        };
        ;
        ProxyServerService.prototype.findListByParams = function (params) {
            return this.$http({
                method: 'get',
                params: params,
                url: '/db/ProxyServer/findListByParams',
            });
        };
        ;
        ProxyServerService.prototype.findById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/ProxyServer/findById',
            });
        };
        ;
        ProxyServerService.prototype.update = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/ProxyServer/update',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_ProxyServer.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        ProxyServerService.prototype.save = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/ProxyServer/save',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_ProxyServer.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        ProxyServerService.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/ProxyServer/deleteById',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_ProxyServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        ProxyServerService.prototype.deleteByIds = function (id) {
            var _params = {
                ids: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/ProxyServer/deleteByIds',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_ProxyServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        ProxyServerService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return ProxyServerService;
    }());
    main_app_1.app
        .service('proxyServerService', ProxyServerService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUNBO1FBS0ksNEJBQW9CLEtBQVUsRUFBVSxhQUFxQyxFQUFTLGdCQUFrQztZQUFwRyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQVMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUNwSCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELG9DQUFPLEdBQVA7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsS0FBSztnQkFDWixHQUFHLEVBQUMseUJBQXlCO2FBQ2hDLENBQUMsQ0FBQztRQUVQLENBQUM7UUFBQSxDQUFDO1FBQ0YsNkNBQWdCLEdBQWhCLFVBQWlCLE1BQTZCO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxLQUFLO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBQyxrQ0FBa0M7YUFDekMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFFRixxQ0FBUSxHQUFSLFVBQVMsRUFBVTtZQUNmLElBQUksT0FBTyxHQUFtQjtnQkFDMUIsRUFBRSxFQUFDLEVBQUU7YUFDUixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE9BQU87Z0JBQ2YsR0FBRyxFQUFDLDBCQUEwQjthQUNqQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUEsQ0FBQztRQUVGLG1DQUFNLEdBQU4sVUFBTyxNQUFtQjtZQUN0QixJQUFJLE9BQU8sR0FBRztnQkFD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LENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDZCQUE2QixDQUFDLElBQUk7Z0JBQ25FLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUFBLENBQUM7UUF0R0ssMEJBQU8sR0FBaUIsQ0FBQyxPQUFPLEVBQUMsZUFBZSxFQUFDLGtCQUFrQixDQUFDLENBQUM7UUF3R2hGLHlCQUFDO0tBMUdELEFBMEdDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9wcm94eVNlcnZlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm94eVNlcnZlckV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUHJveHlTZXJ2ZXJFeFwiO1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOmFueTtcclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcblxyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUHJveHlTZXJ2ZXJcIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlckxpc3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Qcm94eVNlcnZlclBhcmFtc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUZpbmRCeUlkUGFyYW1zLCBJRGVsZXRlQnlJZCxcclxuICAgIElEZWxldGVCeUlkc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXF1ZXN0L1JlcXVlc3RQYXJhbXNcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUHJveHlTZXJ2ZXJTZXJ2aWNlIHtcclxuICAgIGZpbmRBbGwoKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGZpbmRMaXN0QnlQYXJhbXMocGFyYW1zOiBQcm94eVNlcnZlckxpc3RQYXJhbXMpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBmaW5kQnlJZChpZDogc3RyaW5nKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgdXBkYXRlKHBhcmFtczogUHJveHlTZXJ2ZXIpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkKGlkOiBzdHJpbmcpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBkZWxldGVCeUlkcyhpZDogQXJyYXk8c3RyaW5nPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHNhdmUocGFyYW1zOiBQcm94eVNlcnZlckV4KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG59XHJcblxyXG5jbGFzcyBQcm94eVNlcnZlclNlcnZpY2UgaW1wbGVtZW50cyBJUHJveHlTZXJ2ZXJTZXJ2aWNle1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6SVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHVybDonL2RiL1Byb3h5U2VydmVyL2ZpbmRBbGwnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGZpbmRMaXN0QnlQYXJhbXMocGFyYW1zOiBQcm94eVNlcnZlckxpc3RQYXJhbXMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDonL2RiL1Byb3h5U2VydmVyL2ZpbmRMaXN0QnlQYXJhbXMnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBmaW5kQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXM6SUZpbmRCeUlkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpZDppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvZGIvUHJveHlTZXJ2ZXIvZmluZEJ5SWQnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUocGFyYW1zOiBQcm94eVNlcnZlcikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBtb2RlbDpwYXJhbXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9Qcm94eVNlcnZlci91cGRhdGUnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9Qcm94eVNlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgc2F2ZShwYXJhbXM6IFByb3h5U2VydmVyRXgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG1vZGVsOnBhcmFtc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL1Byb3h5U2VydmVyL3NhdmUnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1Byb3h5U2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXM6SURlbGV0ZUJ5SWQgPSB7XHJcbiAgICAgICAgICAgIGlkOmlkXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9Qcm94eVNlcnZlci9kZWxldGVCeUlkJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9Qcm94eVNlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZHMoaWQ6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAgICAgICAgIGlkczppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvUHJveHlTZXJ2ZXIvZGVsZXRlQnlJZHMnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1Byb3h5U2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ3Byb3h5U2VydmVyU2VydmljZScsIFByb3h5U2VydmVyU2VydmljZSk7Il19
