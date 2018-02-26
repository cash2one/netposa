define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyAlarmService = (function () {
        function MyAlarmService($http) {
            this.$http = $http;
        }
        MyAlarmService.prototype.getMyAlarmList = function (params) {
            var _params = angular.copy(params);
            return this.$http({
                method: "post",
                url: "/pdp/myAlarm/getMyAlarmList",
                data: _params,
                timeout: 30000,
                showLoad: true
            });
        };
        MyAlarmService.$inject = ["$http"];
        return MyAlarmService;
    }());
    exports.MyAlarmService = MyAlarmService;
    main_app_1.app.service("myAlarmService", MyAlarmService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL215QWxhcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTtRQUVJLHdCQUFvQixLQUFtQjtZQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBRXZDLENBQUM7UUFDRCx1Q0FBYyxHQUFkLFVBQWUsTUFBeUI7WUFDcEMsSUFBSSxPQUFPLEdBQXNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDZCQUE2QjtnQkFFbEMsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQWRNLHNCQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQWtCOUIscUJBQUM7S0FuQkQsQUFtQkMsSUFBQTtJQW5CWSx3Q0FBYztJQXFCM0IsY0FBRyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3NlcnZpY2VzL215QWxhcm0uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgSUFuZ3VsYXJIdHRwIH0gZnJvbSAnLi4vaW50ZXJjZXB0b3JzL2h0dHAnO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgU2VhcmNoQWxhcm1Mb2dSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGVcIjtcclxuaW1wb3J0IHsgU2VhcmNoQWxhcm1QYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvU2VhcmNoQWxhcm1QYXJhbXNcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6YW55O1xyXG5cclxuZXhwb3J0IGNsYXNzIE15QWxhcm1TZXJ2aWNle1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkaHR0cFwiXVxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogSUFuZ3VsYXJIdHRwKXtcclxuXHJcbiAgICB9XHJcbiAgICBnZXRNeUFsYXJtTGlzdChwYXJhbXM6IFNlYXJjaEFsYXJtUGFyYW1zKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxQYWdlUmVzdWx0PFNlYXJjaEFsYXJtTG9nUmVzdWx0Pj4+e1xyXG4gICAgICAgIGxldCBfcGFyYW1zOiBTZWFyY2hBbGFybVBhcmFtcyA9IGFuZ3VsYXIuY29weShwYXJhbXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcclxuICAgICAgICAgICAgdXJsOiBcIi9wZHAvbXlBbGFybS9nZXRNeUFsYXJtTGlzdFwiLFxyXG4gICAgICAgICAgICAvLyB1cmw6IFwiL21vY2svbXlBbGFybS9teUFsYXJtLmpzb24/dj1cIituZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgZGF0YTogX3BhcmFtcyxcclxuICAgICAgICAgICAgdGltZW91dDogMzAwMDAsXHJcbiAgICAgICAgICAgIHNob3dMb2FkOiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcbmFwcC5zZXJ2aWNlKFwibXlBbGFybVNlcnZpY2VcIiwgTXlBbGFybVNlcnZpY2UpOyJdfQ==
