define(["require", "exports", "../app/main.app", "angular", "../factory/response.notify.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemParamConfigService = (function () {
        function SystemParamConfigService($http, notifyFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        SystemParamConfigService.prototype.getSystemParamsList = function () {
            return this.$http({
                method: 'get',
                url: '/db/parameter/getSystemParamsList'
            });
        };
        ;
        SystemParamConfigService.prototype.updateSystemParams = function (params) {
            return this.$http({
                method: 'post',
                data: params,
                showLoad: true,
                url: '/db/parameter/updateSystemParams'
            }).then(this.notifyFunc);
        };
        SystemParamConfigService.$inject = ['$http', 'notifyFactory'];
        return SystemParamConfigService;
    }());
    main_app_1.app.service('systemParamConfigService', SystemParamConfigService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3N5c3RlbVBhcmFtQ29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBZ0JBO1FBS0ksa0NBQW9CLEtBQVMsRUFBUyxhQUFxQztZQUF2RCxVQUFLLEdBQUwsS0FBSyxDQUFJO1lBQVMsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsc0RBQW1CLEdBQW5CO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFFLG1DQUFtQzthQUMzQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLHFEQUFrQixHQUFsQixVQUFtQixNQUF5QjtZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxJQUFJLEVBQUMsTUFBTTtnQkFDWCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxHQUFHLEVBQUUsa0NBQWtDO2FBQzFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUF0Qk0sZ0NBQU8sR0FBaUIsQ0FBQyxPQUFPLEVBQUMsZUFBZSxDQUFDLENBQUM7UUF3QjdELCtCQUFDO0tBMUJELEFBMEJDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9zeXN0ZW1QYXJhbUNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQge1VzZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Vc2VyXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHQsIEJhY2tSZXNwb25zZUJvZHl9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7UGFyYW1ldGVyRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9QYXJhbWV0ZXJFeFwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeXN0ZW1QYXJhbUNvbmZpZ1NlcnZpY2V7XHJcbiAgICBnZXRTeXN0ZW1QYXJhbXNMaXN0OigpPT5Qcm9taXNlPFJlc3BvbnNlUmVzdWx0PEFycmF5PFBhcmFtZXRlckV4Pj4+O1xyXG4gICAgdXBkYXRlU3lzdGVtUGFyYW1zOihwYXJhbXM6QXJyYXk8UGFyYW1ldGVyRXg+KT0+UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxufVxyXG5cclxuY2xhc3MgU3lzdGVtUGFyYW1Db25maWdTZXJ2aWNlIGltcGxlbWVudHMgSVN5c3RlbVBhcmFtQ29uZmlnU2VydmljZXtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDpBcnJheTxzdHJpbmc+ID0gWyckaHR0cCcsJ25vdGlmeUZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOmFueSxwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3Rvcnkpe1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN5c3RlbVBhcmFtc0xpc3QoKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxBcnJheTxQYXJhbWV0ZXJFeD4+PntcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ2dldCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9wYXJhbWV0ZXIvZ2V0U3lzdGVtUGFyYW1zTGlzdCdcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVTeXN0ZW1QYXJhbXMocGFyYW1zOkFycmF5PFBhcmFtZXRlckV4Pik6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgZGF0YTpwYXJhbXMsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlLFxyXG4gICAgICAgICAgICB1cmw6ICcvZGIvcGFyYW1ldGVyL3VwZGF0ZVN5c3RlbVBhcmFtcydcclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnc3lzdGVtUGFyYW1Db25maWdTZXJ2aWNlJywgU3lzdGVtUGFyYW1Db25maWdTZXJ2aWNlKTsiXX0=
