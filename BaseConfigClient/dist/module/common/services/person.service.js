define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/response.notify.factory", "../factory/userinfo.cache.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonService = (function () {
        function PersonService($http, notifyFactory, systemLogFactory, userInfoCacheFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        PersonService.prototype.changeUserStatus = function (params) {
            return this.$http({
                method: 'post',
                data: params,
                url: '/db/person/changeStatusByUserIds'
            }).then(this.notifyFunc);
        };
        PersonService.prototype.findListByParams = function (params) {
            return this.$http({
                method: 'get',
                params: params,
                url: '/db/person/findListByParams',
            });
        };
        ;
        PersonService.prototype.findTreeWithArea = function () {
            return this.$http({
                method: 'get',
                url: '/db/tree/findAreaWithPersion',
            });
        };
        ;
        PersonService.prototype.findDetailById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'get',
                params: _params,
                url: '/db/person/findDetailById',
            });
        };
        ;
        PersonService.prototype.update = function (params) {
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                url: '/db/person/update',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Person.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        PersonService.prototype.save = function (params) {
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                url: '/db/person/save',
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Person.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        PersonService.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                url: '/db/person/deleteById',
                data: _params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Person.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        PersonService.prototype.deleteByIds = function (ids) {
            var _params = {
                ids: ids
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                url: '/db/person/deleteByIds',
                data: _params,
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Person.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        PersonService.$inject = ['$http', 'notifyFactory', 'systemLogFactory', 'userInfoCacheFactory'];
        return PersonService;
    }());
    main_app_1.app
        .service('personService', PersonService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3BlcnNvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFDQTtRQWFJLHVCQUNZLEtBQVUsRUFDVixhQUFxQyxFQUNyQyxnQkFBbUMsRUFDbkMsb0JBQTJDO1lBSDNDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVixrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFDckMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtZQUNuQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXVCO1lBRW5ELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBbEJELHdDQUFnQixHQUFoQixVQUFpQixNQUFnQztZQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsa0NBQWtDO2FBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFjRCx3Q0FBZ0IsR0FBaEIsVUFBa0IsTUFBd0I7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFDLDZCQUE2QjthQUNwQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUNGLHdDQUFnQixHQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxLQUFLO2dCQUNaLEdBQUcsRUFBQyw4QkFBOEI7YUFDckMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFBLENBQUM7UUFFRixzQ0FBYyxHQUFkLFVBQWdCLEVBQVU7WUFD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LE9BQU87YUFFZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSTtnQkFDdkQsZUFBZSxFQUFFLGlDQUFlLENBQUMsc0JBQXNCLENBQUMsSUFBSTtnQkFDNUQsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFFUixDQUFDO1FBQUEsQ0FBQztRQTFHSyxxQkFBTyxHQUFpQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQTJHeEcsb0JBQUM7S0FySEQsQUFxSEMsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvcGVyc29uLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BlcnNvbkxpc3RQYXJhbXMsIEFyZWFBbmRQZXJzb25MaXN0UmVzdWx0LCBQZXJzb25DaGFuZ2VTdGF0dXNQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9QZXJzb25QYXJhbXNcIjtcclxuZGVjbGFyZSB2YXIgcmVxdWlyZTphbnk7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7UGVyc29ufSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUGVyc29uXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJRmluZEJ5SWRQYXJhbXMsIElEZWxldGVCeUlkLFxyXG4gICAgSURlbGV0ZUJ5SWRzXHJcbn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3JlcXVlc3QvUmVxdWVzdFBhcmFtc1wiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5pbXBvcnQgJy4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnknO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3VzZXJpbmZvLmNhY2hlLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtPcGVyRml0c3RNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJGaXJzdE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclNlY29uZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclNlY29uZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlclRoaXJkTW9kdWxlfSBmcm9tICAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyQWN0aW9uVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQge0lTeXN0ZW1Mb2dGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQZXJzb25TZXJ2aWNle1xyXG4gICAgc2F2ZShwYXJhbXM6IFBlcnNvbik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIHVwZGF0ZShwYXJhbXM6IFBlcnNvbik6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGZpbmREZXRhaWxCeUlkKGlkOiBzdHJpbmcpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBmaW5kTGlzdEJ5UGFyYW1zKHBhcmFtczogUGVyc29uTGlzdFBhcmFtcyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuICAgIGRlbGV0ZUJ5SWRzKGlkczpBcnJheTxzdHJpbmc+KTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgZmluZFRyZWVXaXRoQXJlYSgpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8QXJlYUFuZFBlcnNvbkxpc3RSZXN1bHQ+PjtcclxuICAgIC8vIOaUueWPmOeUqOaIt+eahOWPr+eUqOeKtuaAgVxyXG4gICAgY2hhbmdlVXNlclN0YXR1cyhwYXJhbXM6IFBlcnNvbkNoYW5nZVN0YXR1c1BhcmFtcyk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxufVxyXG5cclxuXHJcbmNsYXNzIFBlcnNvblNlcnZpY2UgaW1wbGVtZW50cyBJUGVyc29uU2VydmljZXtcclxuXHJcbiAgICBjaGFuZ2VVc2VyU3RhdHVzKHBhcmFtczogUGVyc29uQ2hhbmdlU3RhdHVzUGFyYW1zKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3BlcnNvbi9jaGFuZ2VTdGF0dXNCeVVzZXJJZHMnXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknLCAndXNlckluZm9DYWNoZUZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRodHRwOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LFxyXG4gICAgICAgIHByaXZhdGUgc3lzdGVtTG9nRmFjdG9yeTogSVN5c3RlbUxvZ0ZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSB1c2VySW5mb0NhY2hlRmFjdG9yeTogSVVzZXJJbmZvQ2FjaGVGYWN0b3J5XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRMaXN0QnlQYXJhbXMgKHBhcmFtczogUGVyc29uTGlzdFBhcmFtcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidnZXQnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOicvZGIvcGVyc29uL2ZpbmRMaXN0QnlQYXJhbXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgZmluZFRyZWVXaXRoQXJlYSAoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvdHJlZS9maW5kQXJlYVdpdGhQZXJzaW9uJyxcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBmaW5kRGV0YWlsQnlJZCAoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklGaW5kQnlJZFBhcmFtcyA9IHtcclxuICAgICAgICAgICAgaWQ6aWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9wZXJzb24vZmluZERldGFpbEJ5SWQnLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSAocGFyYW1zOiBQZXJzb24pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIHVybDonL2RiL3BlcnNvbi91cGRhdGUnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQmFzZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2VfUGVyc29uLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2F2ZSAocGFyYW1zOiBQZXJzb24pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvcGVyc29uL3NhdmUnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXNcclxuXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQmFzZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2VfUGVyc29uLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZCAoaWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj4ge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkID0ge1xyXG4gICAgICAgICAgICBpZDppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9wZXJzb24vZGVsZXRlQnlJZCcsXHJcbiAgICAgICAgICAgIGRhdGE6X3BhcmFtc1xyXG5cclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9QZXJzb24uY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkcyAoaWRzOkFycmF5PHN0cmluZz4pOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+IHtcclxuICAgICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAgICAgICAgIGlkczppZHNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvcGVyc29uL2RlbGV0ZUJ5SWRzJyxcclxuICAgICAgICAgICAgZGF0YTpfcGFyYW1zLFxyXG5cclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9QZXJzb24uY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgfTtcclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgncGVyc29uU2VydmljZScsIFBlcnNvblNlcnZpY2UpOyJdfQ==
