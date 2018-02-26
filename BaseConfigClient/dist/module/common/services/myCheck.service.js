define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MyCheckService = (function () {
        function MyCheckService($http) {
            this.$http = $http;
        }
        MyCheckService.prototype.findListByPage = function (params) {
            return this.$http({
                method: "get",
                params: params,
                url: "/db/check/findListByPage"
            }).then(function (res) {
                console.debug("check/findListByPage", res);
                return (res && res.data) || {};
            });
        };
        MyCheckService.$inject = ["$http"];
        return MyCheckService;
    }());
    exports.MyCheckService = MyCheckService;
    main_app_1.app.service("myCheckService", MyCheckService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL215Q2hlY2suc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTtRQUlJLHdCQUFvQixLQUFtQjtZQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBRXZDLENBQUM7UUFFRCx1Q0FBYyxHQUFkLFVBQWUsTUFBMEI7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsR0FBRyxFQUFFLDBCQUEwQjthQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUTtnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQThCLENBQUE7WUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBZk0sc0JBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBZ0IvQixxQkFBQztLQWxCRCxBQWtCQyxJQUFBO0lBbEJZLHdDQUFjO0lBb0IzQixjQUFHLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vc2VydmljZXMvbXlDaGVjay5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJQW5ndWxhckh0dHB9IGZyb20gXCIuLi9pbnRlcmNlcHRvcnMvaHR0cFwiO1xyXG5pbXBvcnQge0NoZWNrR2V0TGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0NoZWNrUGFyYW1zXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdH0gZnJvbSAnLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0JztcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtNeUNoZWNrTW9kZWx9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9NeUNoZWNrTW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNeUNoZWNrU2VydmljZSB7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkaHR0cFwiXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBJQW5ndWxhckh0dHApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZmluZExpc3RCeVBhZ2UocGFyYW1zOiBDaGVja0dldExpc3RQYXJhbXMpOiBQcm9taXNlPFBhZ2VSZXN1bHQ8TXlDaGVja01vZGVsPj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcImdldFwiLFxyXG4gICAgICAgICAgICBwYXJhbXM6IHBhcmFtcyxcclxuICAgICAgICAgICAgdXJsOiBcIi9kYi9jaGVjay9maW5kTGlzdEJ5UGFnZVwiXHJcbiAgICAgICAgfSkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcImNoZWNrL2ZpbmRMaXN0QnlQYWdlXCIsIHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiAocmVzICYmIHJlcy5kYXRhKSB8fCB7fSBhcyBQYWdlUmVzdWx0PE15Q2hlY2tNb2RlbD5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLnNlcnZpY2UoXCJteUNoZWNrU2VydmljZVwiLCBNeUNoZWNrU2VydmljZSk7Il19
