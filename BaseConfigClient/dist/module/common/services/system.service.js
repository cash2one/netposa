define(["require", "exports", "../app/main.app", "../factory/response.notify.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SystemService = (function () {
        function SystemService($http, notifyFactory) {
            this.$http = $http;
            this.notifyFunc = notifyFactory.msg({ onlySuccess: true });
        }
        SystemService.prototype.getSystemData = function () {
            return this.$http({
                method: "GET",
                url: "/db/param/findSystemConfig"
            });
        };
        SystemService.prototype.editSystemData = function (model) {
            return this.$http({
                method: "POST",
                url: "/db/param/editSystemConfig",
                data: model
            });
        };
        SystemService.$inject = ["$http", 'notifyFactory'];
        return SystemService;
    }());
    main_app_1.app.service("systemService", SystemService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3N5c3RlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWNBO1FBTUksdUJBQVksS0FBVSxFQUFFLGFBQXFDO1lBQ3pELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxxQ0FBYSxHQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFDLDRCQUE0QjthQUNuQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ0Qsc0NBQWMsR0FBZCxVQUFlLEtBQXdCO1lBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNmLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBQyw0QkFBNEI7Z0JBQ2hDLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQXJCTSxxQkFBTyxHQUFHLENBQUMsT0FBTyxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBc0IvQyxvQkFBQztLQXZCRCxBQXVCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9zeXN0ZW0uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5pbXBvcnQge0h0dHBSZXNwb25zZVJlc3VsdCwgUmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydHtTeXN0ZW1Db25maWdQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Db25maWdQYXJhbXNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN5c3RlbVNlcnZpY2Uge1xyXG4gICAgLy/ojrflj5blnLDlm77mnI3liqHkv6Hmga9cclxuICAgIGdldFN5c3RlbURhdGEoKTogYW55OyBcclxuICAgIC8v57yW6L6R5Zyw5Zu+5pyN5Yqh5L+h5oGvXHJcbiAgICBlZGl0U3lzdGVtRGF0YShtb2RlbDpTeXN0ZW1Db25maWdQYXJhbXMpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+PjtcclxufVxyXG5cclxuY2xhc3MgU3lzdGVtU2VydmljZSBpbXBsZW1lbnRzIElTeXN0ZW1TZXJ2aWNlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJGh0dHBcIiwnbm90aWZ5RmFjdG9yeSddO1xyXG5cclxuICAgIHByaXZhdGUgJGh0dHA6IGFueTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IoJGh0dHA6IGFueSwgbm90aWZ5RmFjdG9yeTogSVJlc3BvbnNlTm90aWZ5RmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcclxuICAgICAgICB0aGlzLm5vdGlmeUZ1bmMgPSBub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuICAgIGdldFN5c3RlbURhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgICAgIHVybDpcIi9kYi9wYXJhbS9maW5kU3lzdGVtQ29uZmlnXCJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZWRpdFN5c3RlbURhdGEobW9kZWw6U3lzdGVtQ29uZmlnUGFyYW1zKXtcclxuICAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6XCIvZGIvcGFyYW0vZWRpdFN5c3RlbUNvbmZpZ1wiLFxyXG4gICAgICAgICAgICBkYXRhOiBtb2RlbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuc2VydmljZShcInN5c3RlbVNlcnZpY2VcIiwgU3lzdGVtU2VydmljZSk7Il19
