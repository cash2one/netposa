define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemLogService = (function () {
        function SystemLogService($http) {
            this.$http = $http;
        }
        SystemLogService.prototype.save = function (log) {
            var config = {
                method: "post",
                url: "/db/systemlog/save",
                data: log
            };
            return this.$http(config);
        };
        SystemLogService.$inject = ['$http'];
        return SystemLogService;
    }());
    main_app_1.app.service('systemLogService', SystemLogService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL1N5c3RlbUxvZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BO1FBSUksMEJBQW9CLEtBQVU7WUFBVixVQUFLLEdBQUwsS0FBSyxDQUFLO1FBRTlCLENBQUM7UUFFRCwrQkFBSSxHQUFKLFVBQUssR0FBUTtZQUNULElBQUksTUFBTSxHQUEwQjtnQkFDaEMsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLG9CQUFvQjtnQkFDekIsSUFBSSxFQUFFLEdBQUc7YUFDWixDQUFDO1lBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQWJNLHdCQUFPLEdBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFjOUMsdUJBQUM7S0FoQkQsQUFnQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL1N5c3RlbUxvZy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJUG9ydHJhaXRSZXF1ZXN0Q29uZmlnfSBmcm9tIFwiLi4vaW50ZXJjZXB0b3JzL2h0dHBcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5c3RlbUxvZ1NlcnZpY2V7XHJcbiAgICBzYXZlKGxvZzogYW55KTogUHJvbWlzZTxhbnk+O1xyXG59XHJcblxyXG5jbGFzcyBTeXN0ZW1Mb2dTZXJ2aWNle1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckaHR0cCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzYXZlKGxvZzogYW55KTogUHJvbWlzZTxhbnk+e1xyXG4gICAgICAgIGxldCBjb25maWc6SVBvcnRyYWl0UmVxdWVzdENvbmZpZyA9IHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9zeXN0ZW1sb2cvc2F2ZVwiLFxyXG4gICAgICAgICAgICBkYXRhOiBsb2dcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKGNvbmZpZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKCdzeXN0ZW1Mb2dTZXJ2aWNlJywgU3lzdGVtTG9nU2VydmljZSk7Il19
