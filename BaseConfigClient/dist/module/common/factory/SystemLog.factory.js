define(["require", "exports", "../app/main.app", "../services/SystemLog.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemLogFactory = (function () {
        function SystemLogFactory($injector) {
            var _this = this;
            this.$injector = $injector;
            this.preSaveLogEx = function (log, callback) {
                var vm = _this;
                var _tempPreSystemLog = vm.processPreSystemLog(log);
                log = null;
                return function (origin) {
                    if (origin && origin.code === 200) {
                        if (typeof callback === "function") {
                            callback(_tempPreSystemLog, origin);
                            callback = null;
                        }
                        (function (saveLog) {
                            setTimeout(function () {
                                vm.saveLog(saveLog);
                            }, 0);
                        })(_tempPreSystemLog);
                    }
                    _tempPreSystemLog = null;
                    return origin;
                };
            };
            this.getSaveLogEx = function (log) {
                var saveSystemlog = {};
                saveSystemlog.OperFirstModule = log.OperFirstModule;
                saveSystemlog.OperSecondModule = log.OperSecondModule;
                saveSystemlog.OperThirdModule = log.OperThirdModule;
                saveSystemlog.ActionType = log.ActionType;
                saveSystemlog.ObjectID = log.ObjectID;
                saveSystemlog.ObjectType = log.ObjectType;
                saveSystemlog.ObjectName = log.ObjectName;
                if (log.ObjectIDS || log.ObjectNames) {
                    saveSystemlog.JsonExtData = {};
                    if (log.ObjectIDS) {
                        saveSystemlog.JsonExtData.ObjectID = log.ObjectIDS;
                    }
                    if (log.ObjectNames) {
                        saveSystemlog.JsonExtData.ObjectName = log.ObjectNames;
                    }
                }
                return saveSystemlog;
            };
        }
        SystemLogFactory.prototype.processPreSystemLog = function (log) {
            return log;
        };
        SystemLogFactory.prototype.saveLog = function (log) {
            console.log('-------------');
            console.log(log);
            var systemLogService = this.$injector.get("systemLogService");
            return systemLogService.save(this.getSaveLogEx(log));
        };
        SystemLogFactory.$inject = ['$injector'];
        return SystemLogFactory;
    }());
    main_app_1.app.service('systemLogFactory', SystemLogFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvU3lzdGVtTG9nLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBOEJBO1FBR0ksMEJBQXFCLFNBQWM7WUFBbkMsaUJBRUM7WUFGb0IsY0FBUyxHQUFULFNBQVMsQ0FBSztZQWFuQyxpQkFBWSxHQUFpQixVQUFDLEdBQWlCLEVBQUUsUUFBZ0M7Z0JBQzdFLElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQztnQkFDZCxJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDcEQsR0FBRyxHQUFHLElBQUksQ0FBQztnQkFFWCxNQUFNLENBQUMsVUFBUyxNQUEyQjtvQkFFdkMsRUFBRSxDQUFBLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBQzt3QkFFOUIsRUFBRSxDQUFBLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVSxDQUFDLENBQUEsQ0FBQzs0QkFDL0IsUUFBUSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNwQyxRQUFRLEdBQUcsSUFBVyxDQUFDO3dCQUMzQixDQUFDO3dCQUdELENBQUMsVUFBQyxPQUFxQjs0QkFDbkIsVUFBVSxDQUFDO2dDQUNQLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQ3hCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDVixDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUMxQixDQUFDO29CQUNELGlCQUFpQixHQUFHLElBQVcsQ0FBQztvQkFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsQ0FBQyxDQUFBO1lBQ0wsQ0FBQyxDQUFDO1lBUU0saUJBQVksR0FBRyxVQUFDLEdBQWlCO2dCQUNyQyxJQUFJLGFBQWEsR0FBRyxFQUFTLENBQUM7Z0JBQzlCLGFBQWEsQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQztnQkFDcEQsYUFBYSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztnQkFDdEQsYUFBYSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDO2dCQUNwRCxhQUFhLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQzFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDdEMsYUFBYSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO2dCQUMxQyxhQUFhLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQzFDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBLENBQUM7b0JBQ2pDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsRUFBZSxDQUFDO29CQUU1QyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQzt3QkFDZCxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO29CQUN2RCxDQUFDO29CQUNELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDO3dCQUNoQixhQUFhLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO29CQUMzRCxDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUN6QixDQUFDLENBQUM7UUFoRUYsQ0FBQztRQU9PLDhDQUFtQixHQUEzQixVQUE0QixHQUFpQjtZQUN6QyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQXlERCxrQ0FBTyxHQUFQLFVBQVEsR0FBaUI7WUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLElBQUksZ0JBQWdCLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFFaEYsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztRQTdFTSx3QkFBTyxHQUFHLENBQUUsV0FBVyxDQUFDLENBQUM7UUE4RXBDLHVCQUFDO0tBL0VELEFBK0VDLElBQUE7SUFFRCxjQUFHLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L1N5c3RlbUxvZy5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7U3lzdGVtTG9nfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtTG9nXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcIi4uL3NlcnZpY2VzL1N5c3RlbUxvZy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVN5c3RlbUxvZ1NlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9TeXN0ZW1Mb2cuc2VydmljZVwiO1xyXG5pbXBvcnQge1ByZVN5c3RlbUxvZ30gZnJvbSBcIi4uL2ludGVyY2VwdG9ycy9odHRwXCI7XHJcbi8vIGltcG9ydCB7U2F2ZVN5c3RlbUxvZ1BhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1N5c3RlbUxvZ0V4XCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuXHJcbi8qKlxyXG4gKiDns7vnu5/mk43kvZzml6Xlv5flt6XljoJcclxuICovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTeXN0ZW1Mb2dGYWN0b3J5e1xyXG4gICAgcHJlU2F2ZUxvZ0V4OiBJUHJlU2F2ZUxvZ0V4O1xyXG4gICAgLyoqXHJcbiAgICAgKiDnlLHkuo7pg6jliIbkuZ/kuI3pnIDopoHlkIzmraXov5vooYzlpITnkIYsIOaJgOS7pei/memHjOaKiuaguOW/g+aVsOaNrui9rOaNouaWueazleWwgeijheS+m+WklumDqOiwg+eUqFxyXG4gICAgICogQHBhcmFtIGxvZ1xyXG4gICAgICovXHJcbiAgICBnZXRTYXZlTG9nRXgobG9nOiBQcmVTeXN0ZW1Mb2cpOiBhbnk7XHJcblxyXG4gICAgc2F2ZUxvZyhsb2c6IGFueSk6IFByb21pc2U8YW55PjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOS/neWtmOaXpeW/l+aXtuWAmeeahOmineWkluWPguaVsFxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQWZ0ZXJSZXNwb25zZUNhbGxCYWNrID0gKGxvZzogUHJlU3lzdGVtTG9nLCByZXM6IFJlc3BvbnNlUmVzdWx0PGFueT4pPT52b2lkO1xyXG5leHBvcnQgdHlwZSBJUHJlU2F2ZUxvZ0V4ID0gKGxvZzogUHJlU3lzdGVtTG9nLCBjYWxsYmFjaz86IEFmdGVyUmVzcG9uc2VDYWxsQmFjaykgPT4gKG9yaWdpbjogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG5jbGFzcyBTeXN0ZW1Mb2dGYWN0b3J5e1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbICckaW5qZWN0b3InXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHJpdmF0ZSAkaW5qZWN0b3I6IGFueSl7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSE55CG5LiA5Lqb6YC76L6RLCDmr5TlpoLlvZPliY3nlYzpnaLmiYDlnKjmqKHlnZflkI1cclxuICAgICAqIEBwYXJhbSBsb2dcclxuICAgICAqIEByZXR1cm4ge1ByZVN5c3RlbUxvZ31cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBwcm9jZXNzUHJlU3lzdGVtTG9nKGxvZzogUHJlU3lzdGVtTG9nKXtcclxuICAgICAgICByZXR1cm4gbG9nO1xyXG4gICAgfVxyXG5cclxuICAgIHByZVNhdmVMb2dFeDpJUHJlU2F2ZUxvZ0V4ID0gKGxvZzogUHJlU3lzdGVtTG9nLCBjYWxsYmFjaz86IEFmdGVyUmVzcG9uc2VDYWxsQmFjayk9PntcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG4gICAgICAgIGxldCBfdGVtcFByZVN5c3RlbUxvZyA9IHZtLnByb2Nlc3NQcmVTeXN0ZW1Mb2cobG9nKTtcclxuICAgICAgICBsb2cgPSBudWxsO1xyXG4gICAgICAgIC8vIHRoaXMucHJlU2F2ZUxvZyh1dWlkLCBsb2cpO1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvcmlnaW46IFJlc3BvbnNlUmVzdWx0PGFueT4pOiBSZXNwb25zZVJlc3VsdDxhbnk+e1xyXG4gICAgICAgICAgICAvLyDlj6rmnInmiJDlip/nmoTmiY3kv53lrZjml6Xlv5dcclxuICAgICAgICAgICAgaWYob3JpZ2luICYmIG9yaWdpbi5jb2RlID09PSAyMDApe1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhfdGVtcFByZVN5c3RlbUxvZywgb3JpZ2luKTtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IG51bGwgYXMgYW55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8g6L+Z6YeM5Y+v6IO96L+Y6ZyA6KaB6L+b6KGM5LiA5Lqb6L2s5o2iXHJcbiAgICAgICAgICAgICAgICAvLyDnlLHkuo7mraTlgLzmmK/ku47mi6bmiKrlmajkuK3kvKDmnaUsIOS4uuS6huS4jemYu+WhnuaLpuaIquWZqCwg5pWF5Zyo6L+Z6YeM5L2/55Soc2V0VGltZW91dOadpei/m+ihjOW8guatpVxyXG4gICAgICAgICAgICAgICAgKChzYXZlTG9nOiBQcmVTeXN0ZW1Mb2cpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5zYXZlTG9nKHNhdmVMb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xyXG4gICAgICAgICAgICAgICAgfSkoX3RlbXBQcmVTeXN0ZW1Mb2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF90ZW1wUHJlU3lzdGVtTG9nID0gbnVsbCBhcyBhbnk7XHJcbiAgICAgICAgICAgIC8vIOi/lOWbnuS8oOadpeeahOWAvFxyXG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pyA57uI5Yqg5bel6KaB5L+d5a2Y55qE5pel5b+X6K6w5b2VXHJcbiAgICAgKiBAcGFyYW0gbG9nXHJcbiAgICAgKiBAcmV0dXJuIHtTYXZlU3lzdGVtTG9nUGFyYW1zfVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldFNhdmVMb2dFeCA9IChsb2c6IFByZVN5c3RlbUxvZyk9PntcclxuICAgICAgICBsZXQgc2F2ZVN5c3RlbWxvZyA9IHt9IGFzIGFueTtcclxuICAgICAgICBzYXZlU3lzdGVtbG9nLk9wZXJGaXJzdE1vZHVsZSA9IGxvZy5PcGVyRmlyc3RNb2R1bGU7XHJcbiAgICAgICAgc2F2ZVN5c3RlbWxvZy5PcGVyU2Vjb25kTW9kdWxlID0gbG9nLk9wZXJTZWNvbmRNb2R1bGU7XHJcbiAgICAgICAgc2F2ZVN5c3RlbWxvZy5PcGVyVGhpcmRNb2R1bGUgPSBsb2cuT3BlclRoaXJkTW9kdWxlO1xyXG4gICAgICAgIHNhdmVTeXN0ZW1sb2cuQWN0aW9uVHlwZSA9IGxvZy5BY3Rpb25UeXBlO1xyXG4gICAgICAgIHNhdmVTeXN0ZW1sb2cuT2JqZWN0SUQgPSBsb2cuT2JqZWN0SUQ7XHJcbiAgICAgICAgc2F2ZVN5c3RlbWxvZy5PYmplY3RUeXBlID0gbG9nLk9iamVjdFR5cGU7XHJcbiAgICAgICAgc2F2ZVN5c3RlbWxvZy5PYmplY3ROYW1lID0gbG9nLk9iamVjdE5hbWU7XHJcbiAgICAgICAgaWYobG9nLk9iamVjdElEUyB8fCBsb2cuT2JqZWN0TmFtZXMpe1xyXG4gICAgICAgICAgICBzYXZlU3lzdGVtbG9nLkpzb25FeHREYXRhID0ge30gYXMgU3lzdGVtTG9nO1xyXG4gICAgICAgICAgICAvLyDov5nph4zlj6rorrDlvZVvYmplY3RJRFMg5pS+5Zyob2JqZWN0SUTph4xcclxuICAgICAgICAgICAgaWYobG9nLk9iamVjdElEUyl7XHJcbiAgICAgICAgICAgICAgICBzYXZlU3lzdGVtbG9nLkpzb25FeHREYXRhLk9iamVjdElEID0gbG9nLk9iamVjdElEUztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihsb2cuT2JqZWN0TmFtZXMpe1xyXG4gICAgICAgICAgICAgICAgc2F2ZVN5c3RlbWxvZy5Kc29uRXh0RGF0YS5PYmplY3ROYW1lID0gbG9nLk9iamVjdE5hbWVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzYXZlU3lzdGVtbG9nO1xyXG4gICAgfTtcclxuXHJcbiAgICBzYXZlTG9nKGxvZzogUHJlU3lzdGVtTG9nKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLS0tLScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGxvZyk7XHJcbiAgICAgICAgLy8g55Sx5LqOaHR0cEludGVyY2VwdG9y5Lya5pyJ5b6q546v5L6d6LWWLCDmiYDku6XlnKjov5nph4zmr4/mrKHosIPnlKjnmoTml7blgJnojrflj5ZzeXN0ZW1Mb2dTZXJ2aWNlXHJcbiAgICAgICAgbGV0IHN5c3RlbUxvZ1NlcnZpY2U6SVN5c3RlbUxvZ1NlcnZpY2UgPSB0aGlzLiRpbmplY3Rvci5nZXQoXCJzeXN0ZW1Mb2dTZXJ2aWNlXCIpO1xyXG4gICAgICAgIC8vIOWcqOi/memHjOivt+axguWQjuWPsOS/neWtmOaXpeW/l1xyXG4gICAgICAgIHJldHVybiBzeXN0ZW1Mb2dTZXJ2aWNlLnNhdmUodGhpcy5nZXRTYXZlTG9nRXgobG9nKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdzeXN0ZW1Mb2dGYWN0b3J5JywgU3lzdGVtTG9nRmFjdG9yeSk7Il19
