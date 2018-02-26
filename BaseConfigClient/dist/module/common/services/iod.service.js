define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IodService = (function () {
        function IodService($http, notifyFactory, systemLogFactory) {
            this.systemLogFactory = systemLogFactory;
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        IodService.prototype.save = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/iod/add",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_IodServer.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        IodService.prototype.edit = function (params) {
            return this.$http({
                method: "POST",
                url: "/db/iod/update",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_IodServer.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        IodService.prototype.deleteById = function (iod) {
            return this.$http({
                method: "POST",
                url: "/db/iod/deleteById",
                data: { id: iod.ID }
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_IodServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        IodService.prototype.deleteByIds = function (ids) {
            var params = {
                ids: ids
            };
            return this.$http({
                method: "POST",
                url: "/db/iod/deleteByIds",
                data: params
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_IodServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        IodService.prototype.get = function (id) {
            return this.$http({
                method: "GET",
                url: "/db/iod/get",
                params: { id: id }
            });
        };
        ;
        IodService.prototype.findListTree = function (params) {
            return this.$http({
                method: "GET",
                url: "/db/iod/findAreaListTree",
                params: params,
            }).then(complete);
            function complete(res) {
                var datas = [];
                if (res && res.code === 200) {
                    datas = res.data;
                }
                return datas;
            }
        };
        ;
        IodService.prototype.synchronize = function (id) {
            return this.$http({
                method: "post",
                url: "/pdp/config/iod/syncIOD",
                params: { iodServerID: id },
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_IodServer.code,
                ActionType: OperActionType_1.OperActionType.Sync.code
            }));
        };
        IodService.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return IodService;
    }());
    main_app_1.app
        .service('iodService', IodService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2lvZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWdDQTtRQXFISSxvQkFBWSxLQUFVLEVBQUUsYUFBcUMsRUFBVSxnQkFBbUM7WUFBbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFtQjtZQUN0RyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBbkhELHlCQUFJLEdBQUosVUFBSyxNQUFXO1lBRVosTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGFBQWE7Z0JBQ2xCLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMsMkJBQTJCLENBQUMsSUFBSTtnQkFDakUsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQUVGLHlCQUFJLEdBQUosVUFBSyxNQUFXO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLGdCQUFnQjtnQkFDckIsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUs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LEVBQUUsRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFDO2FBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDJCQUEyQixDQUFDLElBQUk7Z0JBQ2pFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLElBQUksQ0FBQyxJQUFJO2FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQztRQUVNLGtCQUFPLEdBQWtCLENBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBT25GLGlCQUFDO0tBekhELEFBeUhDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2lvZC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjkuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0lvZEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvSW9kRXhcIjtcclxuaW1wb3J0IHtJb2R9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Jb2RcIjtcclxuXHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtUcmVlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcblxyXG5pbXBvcnQge0lEZWxldGVCeUlkc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3JlcXVlc3QvUmVxdWVzdFBhcmFtc1wiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJUaGlyZE1vZHVsZSc7XHJcbmltcG9ydCB7T3BlckFjdGlvblR5cGV9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L09wZXJBY3Rpb25UeXBlJztcclxuaW1wb3J0IHtJU3lzdGVtTG9nRmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9TeXN0ZW1Mb2cuZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJSW9kU2VydmljZSB7XHJcbiAgICBzYXZlOiAocGFyYW1zPzogSW9kKSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBlZGl0OiAocGFyYW1zPzogSW9kKSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBkZWxldGVCeUlkOiAoaW9kOiBJb2QpID0+IFByb21pc2U8YW55PjtcclxuICAgIGRlbGV0ZUJ5SWRzOiAoaWRzOiBBcnJheTxzdHJpbmc+KSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBnZXQ6IChpZDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBmaW5kTGlzdFRyZWU6IChwYXJhbXM/OiBUcmVlUGFyYW1zKSA9PiBQcm9taXNlPGFueT47XHJcbiAgICBzeW5jaHJvbml6ZTogKGlkOiBzdHJpbmcpID0+IFByb21pc2U8YW55PjtcclxuICAgIC8vIGZpbmRUYWJsZUxpc3Q6IEZ1bmN0aW9uOyAvLyBUT0RPIOW3suS4jeWGjeS9v+eUqFxyXG4gICAgLy9maW5kSW9kQ2FtZXJhVHJlZTogKHNlYXJjaElucHV0Pzogc3RyaW5nKT0+IFByb21pc2U8QXJyYXk8SW9kRXggfCBDYW1lcmFFeD4+O1xyXG59XHJcblxyXG5jbGFzcyBJb2RTZXJ2aWNlIGltcGxlbWVudHMgSUlvZFNlcnZpY2Uge1xyXG5cclxuXHJcbiAgICBwcml2YXRlICRodHRwOiBhbnk7XHJcblxyXG4gICAgc2F2ZShwYXJhbXM6IElvZCk6IFByb21pc2U8YW55PiB7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9pb2QvYWRkXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9Jb2RTZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuQWRkLmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVkaXQocGFyYW1zOiBJb2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9pb2QvdXBkYXRlXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtc1xyXG4gICAgICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9Jb2RTZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuTW9kaWZ5LmNvZGVcclxuICAgICAgICB9KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoaW9kOiBJb2QpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9pb2QvZGVsZXRlQnlJZFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7aWQ6IGlvZC5JRH1cclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfSW9kU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLkRlbC5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWxldGVCeUlkcyhpZHM6IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IElEZWxldGVCeUlkcyA9IHtcclxuICAgICAgICAgICAgaWRzOiBpZHNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9pb2QvZGVsZXRlQnlJZHNcIixcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX0lvZFNlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0KGlkOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL2RiL2lvZC9nZXRcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7aWQ6IGlkfVxyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAqIEByZXR1cm4gQXJyYXk8SUlvZEV4PjtcclxuICAgICAqIEBleGNlcHRpb24gW107XHJcbiAgICAgKi9cclxuICAgIGZpbmRMaXN0VHJlZShwYXJhbXM/OiBUcmVlUGFyYW1zKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9pb2QvZmluZEFyZWFMaXN0VHJlZVwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICB9KS50aGVuKGNvbXBsZXRlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY29tcGxldGUocmVzOiBSZXNwb25zZVJlc3VsdDxBcnJheTxJb2RFeD4+KSB7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOi/m+ihjOaVsOaNrui9rOWMliwg6LWL5YC8aWNvblNraW7lsZ7mgKdcclxuICAgICAgICAgICAgbGV0IGRhdGFzOiBBcnJheTxJb2RFeD4gPSBbXTsgLy8g6buY6K6k5Li656m6XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgcmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgZGF0YXMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YXM7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBUT0RPIOayoeacieS7u+S9lemhtemdouS9v+eUqFxyXG4gICAgLy8gZmluZFRhYmxlTGlzdDogRnVuY3Rpb24gPSBmdW5jdGlvbiAocGFyYW1zOiBJb2RUYWJsZVBhcmFtcykge1xyXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiZmluZFRhYmxlTGlzdCBwYXJhbXNcIiwgcGFyYW1zKTtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAvLyAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIC8vICAgICAgICAgdXJsOiBcIi9kYi9pb2QvZmluZElvZExpc3RCeVBhcmFtc1wiLFxyXG4gICAgLy8gICAgICAgICBwYXJhbXM6IHBhcmFtc1xyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9O1xyXG4gICAgc3luY2hyb25pemUoaWQ6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL3BkcC9jb25maWcvaW9kL3N5bmNJT0RcIixcclxuICAgICAgICAgICAgcGFyYW1zOiB7aW9kU2VydmVySUQ6IGlkfSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfSW9kU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLlN5bmMuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsICdzeXN0ZW1Mb2dGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6IChyZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IFJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFueSwgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSwgcHJpdmF0ZSBzeXN0ZW1Mb2dGYWN0b3J5OiBJU3lzdGVtTG9nRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnaW9kU2VydmljZScsIElvZFNlcnZpY2UpOyJdfQ==
