define(["require", "exports", "../app/main.app", "../../../core/entity/OperFirstModule", "../../../core/entity/OperSecondModule", "../../../core/entity/OperThirdModule", "../../../core/entity/OperActionType", "../factory/SystemLog.factory", "angular"], function (require, exports, main_app_1, OperFirstModule_1, OperSecondModule_1, OperThirdModule_1, OperActionType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EngineServerServer = (function () {
        function EngineServerServer($http, notifyFactory, systemLogFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.systemLogFactory = systemLogFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        EngineServerServer.prototype.findAll = function () {
            return this.$http({
                method: 'get',
                url: '/db/EngineServer/findAll'
            });
        };
        ;
        EngineServerServer.prototype.update = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/EngineServer/update',
                data: JSON.stringify(_params),
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineServer.code,
                ActionType: OperActionType_1.OperActionType.Modify.code
            }));
        };
        ;
        EngineServerServer.prototype.save = function (params) {
            var _params = {
                model: params
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/db/EngineServer/save',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineServer.code,
                ActionType: OperActionType_1.OperActionType.Add.code
            }));
        };
        ;
        EngineServerServer.prototype.deleteById = function (id) {
            var _params = {
                id: id
            };
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                url: '/db/EngineServer/deleteById',
                data: JSON.stringify(_params)
            }).then(this.systemLogFactory.preSaveLogEx({
                OperFirstModule: OperFirstModule_1.OperFitstModule.BaseConfig.code,
                OperSecondModule: OperSecondModule_1.OperSecondModule.BaseConfig_Server.code,
                OperThirdModule: OperThirdModule_1.OperThirdModule.BaseConfig_Server_EngineServer.code,
                ActionType: OperActionType_1.OperActionType.Del.code
            }));
        };
        ;
        EngineServerServer.$inject = ['$http', 'notifyFactory', 'systemLogFactory'];
        return EngineServerServer;
    }());
    main_app_1.app.service('engineServerServer', EngineServerServer);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VuZ2luZVNlcnZlclNlcnZlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTZCQTtRQUdJLDRCQUFvQixLQUFVLEVBQVcsYUFBcUMsRUFBUyxnQkFBa0M7WUFBckcsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUFXLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFDckgsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDRCxvQ0FBTyxHQUFQO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLEtBQUs7Z0JBQ1osR0FBRyxFQUFDLDBCQUEwQjthQUNqQyxDQUFDLENBQUM7UUFFUCxDQUFDO1FBQUEsQ0FBQztRQWFGLG1DQUFNLEdBQU4sVUFBTyxNQUFvQjtZQUN2QixJQUFJLE9BQU8sR0FBRztnQkFDVixLQUFLLEVBQUMsTUFBTTthQUNmLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixPQUFPLEVBQUMsRUFBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUM7Z0JBQzNELEdBQUcsRUFBQyx5QkFBeUI7Z0JBQzdCLElBQUksRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQzthQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZDLGVBQWUsRUFBRSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJO2dCQUNoRCxnQkFBZ0IsRUFBRSxtQ0FBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJO2dCQUN6RCxlQUFlLEVBQUUsaUNBQWUsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJO2dCQUNwRSxVQUFVLEVBQUUsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSTthQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUM7UUFBQSxDQUFDO1FBRUYsaUNBQUksR0FBSixVQUFLLE1BQXNCO1lBQ3ZCLElBQUksT0FBTyxHQUFHO2dCQUNWLEtBQUssRUFBQyxNQUFNO2FBQ2YsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLE9BQU8sRUFBQyxFQUFDLGNBQWMsRUFBRSxpQ0FBaUMsRUFBQztnQkFDM0QsR0FBRyxFQUFDLHVCQUF1QjtnQkFDM0IsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2FBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztnQkFDdkMsZUFBZSxFQUFFLGlDQUFlLENBQUMsVUFBVSxDQUFDLElBQUk7Z0JBQ2hELGdCQUFnQixFQUFFLG1DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3pELGVBQWUsRUFBRSxpQ0FBZSxDQUFDLDhCQUE4QixDQUFDLElBQUk7Z0JBQ3BFLFVBQVUsRUFBRSwrQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRVIsQ0FBQztRQUFBLENBQUM7UUFFRix1Q0FBVSxHQUFWLFVBQVcsRUFBVTtZQUNqQixJQUFJLE9BQU8sR0FBZTtnQkFDdEIsRUFBRSxFQUFDLEVBQUU7YUFDUixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFDLE1BQU07Z0JBQ2IsT0FBTyxFQUFDLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDO2dCQUM1QyxHQUFHLEVBQUMsNkJBQTZCO2dCQUNqQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7YUFDL0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO2dCQUN2QyxlQUFlLEVBQUUsaUNBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSTtnQkFDaEQsZ0JBQWdCLEVBQUUsbUNBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSTtnQkFDekQsZUFBZSxFQUFFLGlDQUFlLENBQUMsOEJBQThCLENBQUMsSUFBSTtnQkFDcEUsVUFBVSxFQUFFLCtCQUFjLENBQUMsR0FBRyxDQUFDLElBQUk7YUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDO1FBQUEsQ0FBQztRQTVFSywwQkFBTyxHQUFpQixDQUFDLE9BQU8sRUFBQyxlQUFlLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztRQThGaEYseUJBQUM7S0EvRkQsQUErRkMsSUFBQTtJQUNELGNBQUcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL2VuZ2luZVNlcnZlclNlcnZlci5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZGVjbGFyZSB2YXIgcmVxdWlyZTphbnk7XHJcblxyXG5pbXBvcnQgXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCJcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJUmVzcG9uc2VOb3RpZnlGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBCYWNrUmVzcG9uc2VCb2R5fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ0ZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5XCI7XHJcbmltcG9ydCB7RW5naW5lU2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0VuZ2luZVNlcnZlclBhcmFtc1wiO1xyXG5pbXBvcnQge0VuZ2luZVNlcnZlckV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvRW5naW5lU2VydmVyRXhcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHsgRW5naW5lU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0VuZ2luZVNlcnZlclwiO1xyXG5pbXBvcnQge1xyXG4gICAgSUZpbmRCeUlkUGFyYW1zLCBJRGVsZXRlQnlJZCxcclxuICAgIElEZWxldGVCeUlkc1xyXG59IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXF1ZXN0L1JlcXVlc3RQYXJhbXNcIjtcclxuXHJcblxyXG5pbXBvcnQge09wZXJGaXRzdE1vZHVsZX0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvT3BlckZpcnN0TW9kdWxlJztcclxuaW1wb3J0IHtPcGVyU2Vjb25kTW9kdWxlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyU2Vjb25kTW9kdWxlJztcclxuaW1wb3J0IHtPcGVyVGhpcmRNb2R1bGV9IGZyb20gICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyVGhpcmRNb2R1bGUnO1xyXG5pbXBvcnQge09wZXJBY3Rpb25UeXBlfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9PcGVyQWN0aW9uVHlwZSc7XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVuZ2luZVNlcnZlclNlcnZlciB7XHJcbiAgICBmaW5kQWxsKCk6UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxBcnJheTxFbmdpbmVTZXJ2ZXI+Pj47XHJcbiAgICAvLyBmaW5kQnlJZChpZDogc3RyaW5nKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgdXBkYXRlKHBhcmFtczogRW5naW5lU2VydmVyKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgZGVsZXRlQnlJZChpZDogc3RyaW5nKTpQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG4gICAgLy8gZGVsZXRlQnlJZHMoaWQ6IEFycmF5PHN0cmluZz4pOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBzYXZlKHBhcmFtczogRW5naW5lU2VydmVyRXgpOlByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbn1cclxuY2xhc3MgRW5naW5lU2VydmVyU2VydmVyIGltcGxlbWVudHMgSUVuZ2luZVNlcnZlclNlcnZlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJywnbm90aWZ5RmFjdG9yeScsJ3N5c3RlbUxvZ0ZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzoocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KT0+UmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSAsIHByaXZhdGUgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSxwcml2YXRlIHN5c3RlbUxvZ0ZhY3Rvcnk6SVN5c3RlbUxvZ0ZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSB0aGlzLm5vdGlmeUZhY3RvcnkubXNnKHtvbmx5U3VjY2VzczogdHJ1ZX0pO1xyXG4gICAgfVxyXG4gICAgZmluZEFsbCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J2dldCcsXHJcbiAgICAgICAgICAgIHVybDonL2RiL0VuZ2luZVNlcnZlci9maW5kQWxsJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLy8gZmluZEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgLy8gICAgIGxldCBfcGFyYW1zOklGaW5kQnlJZFBhcmFtcyA9IHtcclxuICAgIC8vICAgICAgICAgaWQ6aWRcclxuICAgIC8vICAgICB9O1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgIC8vICAgICAgICAgbWV0aG9kOidnZXQnLFxyXG4gICAgLy8gICAgICAgICBwYXJhbXM6IF9wYXJhbXMsXHJcbiAgICAvLyAgICAgICAgIHVybDonL2RiL0VuZ2luZVNlcnZlci9maW5kQnlJZCcsXHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9O1xyXG5cclxuICAgIHVwZGF0ZShwYXJhbXM6IEVuZ2luZVNlcnZlcikge1xyXG4gICAgICAgIGxldCBfcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBtb2RlbDpwYXJhbXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9kYi9FbmdpbmVTZXJ2ZXIvdXBkYXRlJyxcclxuICAgICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKSxcclxuICAgICAgICB9KS50aGVuKHRoaXMuc3lzdGVtTG9nRmFjdG9yeS5wcmVTYXZlTG9nRXgoe1xyXG4gICAgICAgICAgICBPcGVyRmlyc3RNb2R1bGU6IE9wZXJGaXRzdE1vZHVsZS5CYXNlQ29uZmlnLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJTZWNvbmRNb2R1bGU6IE9wZXJTZWNvbmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXIuY29kZSxcclxuICAgICAgICAgICAgT3BlclRoaXJkTW9kdWxlOiBPcGVyVGhpcmRNb2R1bGUuQmFzZUNvbmZpZ19TZXJ2ZXJfRW5naW5lU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIEFjdGlvblR5cGU6IE9wZXJBY3Rpb25UeXBlLk1vZGlmeS5jb2RlXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzYXZlKHBhcmFtczogRW5naW5lU2VydmVyRXgpIHtcclxuICAgICAgICBsZXQgX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAgbW9kZWw6cGFyYW1zXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24gO2NoYXJzZXQ9dXRmLTgnfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvRW5naW5lU2VydmVyL3NhdmUnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX0VuZ2luZVNlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5BZGQuY29kZVxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGRlbGV0ZUJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBfcGFyYW1zOklEZWxldGVCeUlkID0ge1xyXG4gICAgICAgICAgICBpZDppZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgdXJsOicvZGIvRW5naW5lU2VydmVyL2RlbGV0ZUJ5SWQnLFxyXG4gICAgICAgICAgICBkYXRhOkpTT04uc3RyaW5naWZ5KF9wYXJhbXMpXHJcbiAgICAgICAgfSkudGhlbih0aGlzLnN5c3RlbUxvZ0ZhY3RvcnkucHJlU2F2ZUxvZ0V4KHtcclxuICAgICAgICAgICAgT3BlckZpcnN0TW9kdWxlOiBPcGVyRml0c3RNb2R1bGUuQmFzZUNvbmZpZy5jb2RlLFxyXG4gICAgICAgICAgICBPcGVyU2Vjb25kTW9kdWxlOiBPcGVyU2Vjb25kTW9kdWxlLkJhc2VDb25maWdfU2VydmVyLmNvZGUsXHJcbiAgICAgICAgICAgIE9wZXJUaGlyZE1vZHVsZTogT3BlclRoaXJkTW9kdWxlLkJhc2VDb25maWdfU2VydmVyX0VuZ2luZVNlcnZlci5jb2RlLFxyXG4gICAgICAgICAgICBBY3Rpb25UeXBlOiBPcGVyQWN0aW9uVHlwZS5EZWwuY29kZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZGVsZXRlQnlJZHMoaWQ6IEFycmF5PHN0cmluZz4pIHtcclxuICAgIC8vICAgICBsZXQgX3BhcmFtczpJRGVsZXRlQnlJZHMgPSB7XHJcbiAgICAvLyAgICAgICAgIGlkczppZFxyXG4gICAgLy8gICAgIH07XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgLy8gICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgLy8gICAgICAgICBoZWFkZXJzOnsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgIC8vICAgICAgICAgdXJsOicvZGIvRW5naW5lU2VydmVyL2RlbGV0ZUJ5SWRzJyxcclxuICAgIC8vICAgICAgICAgZGF0YTpKU09OLnN0cmluZ2lmeShfcGFyYW1zKVxyXG4gICAgLy8gICAgIH0pLnRoZW4odGhpcy5zeXN0ZW1Mb2dGYWN0b3J5LnByZVNhdmVMb2dFeCh7XHJcbiAgICAvLyAgICAgICAgIE9wZXJGaXJzdE1vZHVsZTogT3BlckZpdHN0TW9kdWxlLkJhc2VDb25maWcuY29kZSxcclxuICAgIC8vICAgICAgICAgT3BlclNlY29uZE1vZHVsZTogT3BlclNlY29uZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlci5jb2RlLFxyXG4gICAgLy8gICAgICAgICBPcGVyVGhpcmRNb2R1bGU6IE9wZXJUaGlyZE1vZHVsZS5CYXNlQ29uZmlnX1NlcnZlcl9FbmdpbmVTZXJ2ZXIuY29kZSxcclxuICAgIC8vICAgICAgICAgQWN0aW9uVHlwZTogT3BlckFjdGlvblR5cGUuRGVsLmNvZGVcclxuICAgIC8vICAgICB9KSk7XHJcbiAgICAvLyB9O1xyXG59XHJcbmFwcC5zZXJ2aWNlKCdlbmdpbmVTZXJ2ZXJTZXJ2ZXInLCBFbmdpbmVTZXJ2ZXJTZXJ2ZXIpOyJdfQ==
