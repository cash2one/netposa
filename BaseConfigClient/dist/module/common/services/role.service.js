define(["require", "exports", "../app/main.app", "../../../core/enum/ObjectType", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "angular", "../factory/response.notify.factory", "../factory/SystemLog.factory"], function (require, exports, main_app_1, ObjectType_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RoleService = (function () {
        function RoleService($http, $q, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.$q = $q;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        RoleService.prototype.findDetail = function (roleID) {
            return this.$http({
                method: 'get',
                params: { roleId: roleID },
                url: '/db/role/detail',
            });
        };
        RoleService.prototype.getAllFunModule = function () {
            return this.$http({
                method: 'post',
                url: '/pdp/userrole/find/modules',
            });
        };
        ;
        RoleService.prototype.getValidRoleDataListList = function (id) {
            var _params = {
                roleId: id,
            };
            var deferred = this.$q.defer();
            this.$http({
                method: 'post',
                params: _params,
                url: "/pdp/userrole/find/userroledata",
            })
                .then(function (resp) {
                if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                    resp.data.forEach(function (val) {
                        var _operateList;
                        try {
                            _operateList = JSON.parse(val.ObjectData);
                        }
                        catch (e) {
                            _operateList = {};
                        }
                        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                            val.operateList = _operateList.RoleCommandList;
                        }
                        else {
                            val.operateList = [];
                        }
                    });
                }
                deferred.resolve(resp);
            });
            return deferred.promise;
        };
        ;
        RoleService.prototype.getValidModuleList = function (id) {
            var _params = {
                roleId: id,
                objectType: ObjectType_1.ObjectType.Module.value
            };
            var deferred = this.$q.defer();
            this.$http({
                method: 'post',
                params: _params,
                url: "/pdp/userrole/find/userroledata",
            }).then(function (resp) {
                if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                    resp.data.forEach(function (val) {
                        var _operateList = JSON.parse(val.ObjectData);
                        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                            val.operateList = _operateList.RoleCommandList;
                        }
                        else {
                            val.operateList = new Array();
                        }
                    });
                }
                deferred.resolve(resp);
            });
            return deferred.promise;
        };
        ;
        RoleService.prototype.getCameraRoleDataList = function (id) {
            var _params = {
                roleId: id,
                objectType: ObjectType_1.ObjectType.Camera.value
            };
            return this.$http({
                method: 'post',
                params: _params,
                url: "/pdp/userrole/find/userroledata",
            });
        };
        ;
        RoleService.prototype.getBusinessLibRoleDataList = function (id) {
            var _params = {
                roleId: id,
                objectType: ObjectType_1.ObjectType.BusinessLib.value
            };
            var deferred = this.$q.defer();
            this.$http({
                method: 'post',
                params: _params,
                url: "/pdp/userrole/find/userroledata",
            }).then(function (resp) {
                if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                    resp.data.forEach(function (val) {
                        var _operateList = JSON.parse(val.ObjectData);
                        if (_operateList && _operateList.RoleCommandList && _operateList.RoleCommandList.length > 0) {
                            val.operateList = _operateList.RoleCommandList;
                        }
                        else {
                            val.operateList = new Array();
                        }
                    });
                }
                deferred.resolve(resp);
            });
            return deferred.promise;
        };
        ;
        RoleService.prototype.getDetail = function (id) {
            var _params = {
                roleId: id,
                objectType: ObjectType_1.ObjectType.Module.value
            };
            return this.$http({
                method: 'post',
                params: _params,
                url: "/pdp/userrole/find/userroledata",
            });
        };
        ;
        RoleService.prototype.findListByParams = function (params) {
            return this.$http({
                method: "get",
                params: params,
                url: "/db/role/list",
            });
        };
        ;
        RoleService.prototype.addRole = function (params) {
            return this.$http({
                method: "post",
                data: params,
                showLoad: true,
                url: "/db/role/save",
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Role.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        RoleService.prototype.updateRole = function (params) {
            return this.$http({
                method: "post",
                data: params,
                showLoad: true,
                url: "/db/role/update",
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Role.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        RoleService.prototype.deleteById = function (id) {
            var params = {
                id: id
            };
            return this.$http({
                method: "post",
                data: params,
                url: "/db/role/delete",
            }).then(this.notifyFunc).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Base.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Base_Role.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        RoleService.$inject = ['$http', '$q', 'notifyFactory', 'systemLogFactory'];
        return RoleService;
    }());
    main_app_1.app
        .service('roleService', RoleService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3JvbGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvREE7UUFLSSxxQkFBb0IsS0FBVSxFQUFVLEVBQU8sRUFBVSxhQUFxQyxFQUFVLGdCQUFtQztZQUF2SCxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBSztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7WUFDdkksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxnQ0FBVSxHQUFWLFVBQVcsTUFBYTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDO2dCQUN2QixHQUFHLEVBQUUsaUJBQWlCO2FBQ3pCLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFHRCxxQ0FBZSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBRWQsR0FBRyxFQUFFLDRCQUE0QjthQUNwQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLDhDQUF3QixHQUF4QixVQUEwQixFQUFVO1lBQ2hDLElBQUksT0FBTyxHQUFHO2dCQUNWLE1BQU0sRUFBRSxFQUFFO2FBQ2IsQ0FBQztZQUNGLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFL0IsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDUCxNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsT0FBTztnQkFDZixHQUFHLEVBQUUsaUNBQWlDO2FBQ3pD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QUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQzdELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSTtnQkFDdkQsZUFBZSxFQUFFLGlDQUFlLENBQUMsb0JBQW9CLENBQUMsSUFBSTtnQkFDMUQsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQXRMSyxtQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUF3THpGLGtCQUFDO0tBMUxELEFBMExDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL3JvbGUuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Um9sZVBhcmFtcywgUm9sZURldGFpbFJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1JvbGVQYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHtJRGVsZXRlQnlJZH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3JlcXVlc3QvUmVxdWVzdFBhcmFtc1wiO1xyXG5pbXBvcnQge09iamVjdFR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vT2JqZWN0VHlwZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7VXNlclJvbGVEYXRhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Vc2VyUm9sZURhdGFFeFwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuXHJcbmltcG9ydCB7T3BlckZpdHN0TW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyRmlyc3RNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJTZWNvbmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJTZWNvbmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJUaGlyZE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlclRoaXJkTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyQWN0aW9uVHlwZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckFjdGlvblR5cGUnO1xyXG5pbXBvcnQge0lTeXN0ZW1Mb2dGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUm9sZVNlcnZpY2Uge1xyXG4gICAgZ2V0QWxsRnVuTW9kdWxlKCk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgLyoqIGNyZWF0ZSBieSB6eHFcclxuICAgICAqIEB0aW1lOiAyMDE3LTA2LTA5IDEwOjU5OjEwXHJcbiAgICAgKiBAcGFyYW1zOiByb2xlSWQ6c3RyaW5nXHJcbiAgICAgKiBAcmV0dXJuOiBBcnJheTxVc2VyUm9sZURhdGFMaXN0PlxyXG4gICAgICovXHJcbiAgICBnZXRWYWxpZFJvbGVEYXRhTGlzdExpc3QoaWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgZ2V0VmFsaWRNb2R1bGVMaXN0KGlkOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGdldENhbWVyYVJvbGVEYXRhTGlzdChpZDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBnZXRCdXNpbmVzc0xpYlJvbGVEYXRhTGlzdChpZDogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICBmaW5kTGlzdEJ5UGFyYW1zKHBhcmFtczogUm9sZVBhcmFtcyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgZmluZERldGFpbChyb2xlSUQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8Um9sZURldGFpbFJlc3VsdD4+O1xyXG5cclxuICAgIGFkZFJvbGUocGFyYW1zOiBSb2xlRGV0YWlsUmVzdWx0KTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxuXHJcbiAgICB1cGRhdGVSb2xlKHBhcmFtczogUm9sZURldGFpbFJlc3VsdCk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgZ2V0RGV0YWlsKGlkOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbn1cclxuXHJcblxyXG5jbGFzcyBSb2xlU2VydmljZSBpbXBsZW1lbnRzIElSb2xlU2VydmljZSB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywgJyRxJywgJ25vdGlmeUZhY3RvcnknLCAnc3lzdGVtTG9nRmFjdG9yeSddO1xyXG4gICAgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBhbnksIHByaXZhdGUgJHE6IGFueSwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5LCBwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6IElTeXN0ZW1Mb2dGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuICAgIGZpbmREZXRhaWwocm9sZUlEOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHtyb2xlSWQ6cm9sZUlEfSxcclxuICAgICAgICAgICAgdXJsOiAnL2RiL3JvbGUvZGV0YWlsJyxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/ojrflj5blhajpg6jlip/og73mnYPpmZBcclxuICAgIC8vbW9kdWxlS2V5XHJcbiAgICBnZXRBbGxGdW5Nb2R1bGUgKCkgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICAvLyAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiAnL3BkcC91c2Vycm9sZS9maW5kL21vZHVsZXMnLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGdldFZhbGlkUm9sZURhdGFMaXN0TGlzdCAoaWQ6IHN0cmluZykgIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgcm9sZUlkOiBpZCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL3VzZXJyb2xlL2ZpbmQvdXNlcnJvbGVkYXRhXCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvL+aVsOaNruagvOW8j+WMllxyXG4gICAgICAgICAgICAudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VXNlclJvbGVEYXRhRXg+PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEgJiYgcmVzcC5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNwLmRhdGEuZm9yRWFjaCgodmFsOiBVc2VyUm9sZURhdGFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgX29wZXJhdGVMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX29wZXJhdGVMaXN0ID0gSlNPTi5wYXJzZSh2YWwuT2JqZWN0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9vcGVyYXRlTGlzdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9vcGVyYXRlTGlzdCAmJiBfb3BlcmF0ZUxpc3QuUm9sZUNvbW1hbmRMaXN0ICYmIF9vcGVyYXRlTGlzdC5Sb2xlQ29tbWFuZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm9wZXJhdGVMaXN0ID0gX29wZXJhdGVMaXN0LlJvbGVDb21tYW5kTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5vcGVyYXRlTGlzdCA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldFZhbGlkTW9kdWxlTGlzdCAoaWQ6IHN0cmluZykgIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgcm9sZUlkOiBpZCxcclxuICAgICAgICAgICAgb2JqZWN0VHlwZTogT2JqZWN0VHlwZS5Nb2R1bGUudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBkZWZlcnJlZCA9IHRoaXMuJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogXCIvcGRwL3VzZXJyb2xlL2ZpbmQvdXNlcnJvbGVkYXRhXCIsXHJcbiAgICAgICAgfSkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QXJyYXk8VXNlclJvbGVEYXRhRXg+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT0gMjAwICYmIHJlc3AuZGF0YSAmJiByZXNwLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzcC5kYXRhLmZvckVhY2goKHZhbDogVXNlclJvbGVEYXRhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgX29wZXJhdGVMaXN0ID0gSlNPTi5wYXJzZSh2YWwuT2JqZWN0RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9vcGVyYXRlTGlzdCAmJiBfb3BlcmF0ZUxpc3QuUm9sZUNvbW1hbmRMaXN0ICYmIF9vcGVyYXRlTGlzdC5Sb2xlQ29tbWFuZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwub3BlcmF0ZUxpc3QgPSBfb3BlcmF0ZUxpc3QuUm9sZUNvbW1hbmRMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbC5vcGVyYXRlTGlzdCA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3ApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgfTtcclxuICAgIGdldENhbWVyYVJvbGVEYXRhTGlzdCAoaWQ6IHN0cmluZykgIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgcm9sZUlkOiBpZCxcclxuICAgICAgICAgICAgb2JqZWN0VHlwZTogT2JqZWN0VHlwZS5DYW1lcmEudmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHBhcmFtczogX3BhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiBcIi9wZHAvdXNlcnJvbGUvZmluZC91c2Vycm9sZWRhdGFcIixcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBnZXRCdXNpbmVzc0xpYlJvbGVEYXRhTGlzdCAoaWQ6IHN0cmluZykgIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgcm9sZUlkOiBpZCxcclxuICAgICAgICAgICAgb2JqZWN0VHlwZTogT2JqZWN0VHlwZS5CdXNpbmVzc0xpYi52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGRlZmVycmVkID0gdGhpcy4kcS5kZWZlcigpO1xyXG4gICAgICAgIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL3BkcC91c2Vycm9sZS9maW5kL3VzZXJyb2xlZGF0YVwiLFxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEFycmF5PFVzZXJSb2xlRGF0YUV4Pj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEgJiYgcmVzcC5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3AuZGF0YS5mb3JFYWNoKCh2YWw6IFVzZXJSb2xlRGF0YUV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IF9vcGVyYXRlTGlzdCA9IEpTT04ucGFyc2UodmFsLk9iamVjdERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfb3BlcmF0ZUxpc3QgJiYgX29wZXJhdGVMaXN0LlJvbGVDb21tYW5kTGlzdCAmJiBfb3BlcmF0ZUxpc3QuUm9sZUNvbW1hbmRMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsLm9wZXJhdGVMaXN0ID0gX29wZXJhdGVMaXN0LlJvbGVDb21tYW5kTGlzdDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwub3BlcmF0ZUxpc3QgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0RGV0YWlsIChpZDogc3RyaW5nKSAge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0ge1xyXG4gICAgICAgICAgICByb2xlSWQ6IGlkLFxyXG4gICAgICAgICAgICBvYmplY3RUeXBlOiBPYmplY3RUeXBlLk1vZHVsZS52YWx1ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBfcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL3BkcC91c2Vycm9sZS9maW5kL3VzZXJyb2xlZGF0YVwiLFxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGZpbmRMaXN0QnlQYXJhbXMgKHBhcmFtczogUm9sZVBhcmFtcykgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJnZXRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvcm9sZS9saXN0XCIsXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgYWRkUm9sZSAocGFyYW1zOiBSb2xlRGV0YWlsUmVzdWx0KSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICBzaG93TG9hZDp0cnVlLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3JvbGUvc2F2ZVwiLFxyXG4gICAgICAgIH0pLnRoZW4odGhpcy5ub3RpZnlGdW5jKS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfQmFzZV9Sb2xlLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkFkZC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGVSb2xlIChwYXJhbXM6IFJvbGVEZXRhaWxSZXN1bHQpICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOnRydWUsXHJcbiAgICAgICAgICAgIHVybDogXCIvZGIvcm9sZS91cGRhdGVcIixcclxuICAgICAgICB9KS50aGVuKHRoaXMubm90aWZ5RnVuYykudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfQmFzZS5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2VfUm9sZS5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5Nb2RpZnkuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlQnlJZCAoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IElEZWxldGVCeUlkID0ge1xyXG4gICAgICAgICAgICBpZDogaWRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL3JvbGUvZGVsZXRlXCIsXHJcbiAgICAgICAgfSkudGhlbih0aGlzLm5vdGlmeUZ1bmMpLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX0Jhc2UuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19CYXNlX1JvbGUuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgncm9sZVNlcnZpY2UnLCBSb2xlU2VydmljZSk7Il19
