define(["require", "exports", "../app/main.app", "angular", "../factory/response.notify.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserService = (function () {
        function UserService($http, notifyFactory) {
            var _this = this;
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.getListByFuncAuthCode = function (funcAuthCode) {
                var _params = {
                    functionModuleKey: funcAuthCode
                };
                return _this.$http({
                    method: 'post',
                    params: _params,
                    url: '/pdp/userrole/find/function/userlist',
                });
            };
            this.$http = $http;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        UserService.$inject = ['$http', 'notifyFactory'];
        return UserService;
    }());
    main_app_1.app
        .service('userService', UserService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQkE7UUFLSSxxQkFBb0IsS0FBVSxFQUFVLGFBQXFDO1lBQTdFLGlCQUdDO1lBSG1CLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0I7WUFLN0UsMEJBQXFCLEdBQUcsVUFBQyxZQUFtQjtnQkFDeEMsSUFBSSxPQUFPLEdBQUc7b0JBQ1YsaUJBQWlCLEVBQUMsWUFBWTtpQkFDakMsQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQztvQkFDZCxNQUFNLEVBQUUsTUFBTTtvQkFDZCxNQUFNLEVBQUMsT0FBTztvQkFDZCxHQUFHLEVBQUUsc0NBQXNDO2lCQUM5QyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUE7WUFiRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQU5NLG1CQUFPLEdBQWlCLENBQUMsT0FBTyxFQUFDLGVBQWUsQ0FBQyxDQUFDO1FBa0I3RCxrQkFBQztLQXBCRCxBQW9CQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZGVjbGFyZSB2YXIgcmVxdWlyZTphbnk7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1VzZXJcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lSZXNwb25zZU5vdGlmeUZhY3Rvcnl9IGZyb20gXCIuLi9mYWN0b3J5L3Jlc3BvbnNlLm5vdGlmeS5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXNlclNlcnZpY2V7XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOagueaNriDlip/og73mnYPpmZAg5YWz6ZSu5a2XIO+8iEZ1bGxOYW1lU3BhY2VQYXRo77yJIOiOt+WPluacieWvueW6lOadg+mZkOeahOeUqOaIt1xyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTkgMTE6MjA6NTJcclxuICAgICAqIEBwYXJhbXM6IGZ1bmNDb2RlOnN0cmluZ1xyXG4gICAgICogQHJldHVybjogQXJyYXk8VXNlcj5cclxuICAgICAqL1xyXG4gICAgZ2V0TGlzdEJ5RnVuY0F1dGhDb2RlOihmdW5jQXV0aENvZGU6c3RyaW5nKT0+UHJvbWlzZTxSZXNwb25zZVJlc3VsdDxhbnk+PjtcclxufVxyXG5cclxuY2xhc3MgVXNlclNlcnZpY2UgaW1wbGVtZW50cyBJVXNlclNlcnZpY2V7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6QXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCdub3RpZnlGYWN0b3J5J107XHJcbiAgICBwcml2YXRlIG5vdGlmeUZ1bmM6KHJlczogUmVzcG9uc2VSZXN1bHQ8YW55Pik9PlJlc3BvbnNlUmVzdWx0PGFueT47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogYW55LCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnkpIHtcclxuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7b25seVN1Y2Nlc3M6IHRydWV9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRMaXN0QnlGdW5jQXV0aENvZGUgPSAoZnVuY0F1dGhDb2RlOnN0cmluZyk9PiB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uTW9kdWxlS2V5OmZ1bmNBdXRoQ29kZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgcGFyYW1zOl9wYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9wZHAvdXNlcnJvbGUvZmluZC9mdW5jdGlvbi91c2VybGlzdCcsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgndXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSk7Il19
