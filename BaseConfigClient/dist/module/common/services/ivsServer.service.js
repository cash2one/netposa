define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IvsServerService = (function () {
        function IvsServerService($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        IvsServerService.prototype.validDelete = function (ids) {
            return this.$http({
                method: 'post',
                params: { ivServerIds: ids },
                url: '/pdp/configCtrl/ivServer/status',
            });
        };
        IvsServerService.prototype.findById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/IvsServer/findByID',
            });
        };
        ;
        IvsServerService.prototype.update = function (params) {
            var _params = {
                model: params
            };
            _params.model.AreaModel = null;
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/IvsServer/update',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoStructServer.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        IvsServerService.prototype.save = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/IvsServer/save',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoStructServer.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        IvsServerService.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/IvsServer/deleteById',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoStructServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        IvsServerService.prototype.deleteByIds = function (ids) {
            var _params = {
                ids: ids
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/IvsServer/deleteByIds',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_VideoStructServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        IvsServerService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return IvsServerService;
    }());
    main_app_1.app
        .service('ivsServerService', IvsServerService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2l2c1NlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlDQTtRQU1JLDBCQUFvQixLQUFVLEVBQVUsYUFBcUMsRUFBUyxnQkFBa0M7WUFBcEcsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDcEgsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFXRCxzQ0FBVyxHQUFYLFVBQVksR0FBaUI7WUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQztnQkFDekIsR0FBRyxFQUFDLGlDQUFpQzthQUN4QyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsbUNBQVEsR0FBUixVQUFTLEVBQVU7WUFDZixJQUFJLE9BQU8sR0FBbUI7Z0JBQzFCLEVBQUUsRUFBQyxFQUFFO2FBQ1IsQ0FBQztZQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxLQUFLO2dCQUNaLE1BQU0sRUFBRSxPQUFPO2dCQUNmLEdBQUcsRUFBQyx3QkFBd0I7YUFDL0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFFRixpQ0FBTSxHQUFOLFVBQU8sTUFBbUI7WUFDdEIsSUFBSSxPQUFPLEdBQUc7Z0JBQ1YsS0FBSyxFQUFDLE1BQU07YUFDZixDQUFDO1lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJ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QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMsbUNBQW1DLENBQUMsSUFBSTtnQkFDekUsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQTNHSyx3QkFBTyxHQUFpQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQTRHaEYsdUJBQUM7S0E5R0QsQUE4R0MsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FDakQiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9pdnNTZXJ2ZXIuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXZzU2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0l2c1NlcnZlclBhcmFtc1wiO1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOmFueTtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtJdnNTZXJ2ZXJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0l2c1NlcnZlckV4XCI7XHJcbmltcG9ydCB7XHJcbiAgICBJRmluZEJ5SWRQYXJhbXMsIElEZWxldGVCeUlkcyxcclxuICAgIElEZWxldGVCeUlkXHJcbn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3JlcXVlc3QvUmVxdWVzdFBhcmFtc1wiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUl2c1NlcnZlclNlcnZpY2Uge1xyXG4gICAgLy8gVE9ETyDmsqHmnInkvb/nlKjnmoTmjqXlj6MgYWx0ZXI6IHd5clxyXG4gICAgLy9maW5kTGlzdEJ5UGFyYW1zKHBhcmFtczogSXZzU2VydmVyTGlzdFBhcmFtcyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGZpbmRCeUlkKGlkOiBzdHJpbmcpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICB1cGRhdGUocGFyYW1zOiBJdnNTZXJ2ZXJFeCk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGRlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHNhdmUocGFyYW1zOiBJdnNTZXJ2ZXJFeCk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHZhbGlkRGVsZXRlKGlkczpBcnJheTxzdHJpbmc+KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG59XHJcblxyXG5jbGFzcyBJdnNTZXJ2ZXJTZXJ2aWNlIGltcGxlbWVudHMgSUl2c1NlcnZlclNlcnZpY2V7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6QXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5Jywnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG5cclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6SVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPIOayoeacieS9v+eUqOeahOaOpeWPoyBhbHRlcjogd3lyXHJcbiAgICAvLyBmaW5kTGlzdEJ5UGFyYW1zKHBhcmFtczogSXZzU2VydmVyTGlzdFBhcmFtcykge1xyXG4gICAgLy8gICAgIGxldCBfcGFyYW1zID0gIHBhcmFtcztcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgIC8vICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgLy8gICAgICAgICB1cmw6Jy9kYi9JdnNTZXJ2ZXIvZmluZExpc3RCeVBhcmFtcycsXHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH07XHJcbiAgICB2YWxpZERlbGV0ZShpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtpdlNlcnZlcklkczppZHN9LFxyXG4gICAgICAgICAgICB1cmw6Jy9wZHAvY29uZmlnQ3RybC9pdlNlcnZlci9zdGF0dXMnLFxyXG4gICAgICAgIH0pOyBcclxuICAgIH1cclxuXHJcbiAgICBmaW5kQnlJZChpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXM6SUZpbmRCeUlkUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBpZDppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvZGIvSXZzU2VydmVyL2ZpbmRCeUlEJyxcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlKHBhcmFtczogSXZzU2VydmVyRXgpIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgbW9kZWw6cGFyYW1zXHJcbiAgICAgICAgfTtcclxuICAgICAgICBfcGFyYW1zLm1vZGVsLkFyZWFNb2RlbCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvSXZzU2VydmVyL3VwZGF0ZScsXHJcbiAgICAgICAgICAgIGRhdGE6SlNPTi5zdHJpbmdpZnkoX3BhcmFtcyksXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX1ZpZGVvU3RydWN0U2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzYXZlKHBhcmFtczogSXZzU2VydmVyRXgpIHtcclxuXHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIG1vZGVsOnBhcmFtc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL0l2c1NlcnZlci9zYXZlJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfVmlkZW9TdHJ1Y3RTZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZCA9IHtcclxuICAgICAgICAgICAgaWQ6aWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL0l2c1NlcnZlci9kZWxldGVCeUlkJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfVmlkZW9TdHJ1Y3RTZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkcyA9IHtcclxuICAgICAgICAgICAgaWRzOmlkc1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvSXZzU2VydmVyL2RlbGV0ZUJ5SWRzJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfVmlkZW9TdHJ1Y3RTZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdpdnNTZXJ2ZXJTZXJ2aWNlJywgSXZzU2VydmVyU2VydmljZSlcclxuOyJdfQ==
