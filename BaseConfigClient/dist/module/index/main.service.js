define(["require", "exports", "../common/app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainService = (function () {
        function MainService($http) {
            this.$http = $http;
        }
        MainService.prototype.loginOut = function (userKey) {
            console.debug(userKey);
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/fds/user/logout',
                params: { userKey: userKey }
            });
        };
        MainService.prototype.checkLogin = function (userName) {
            return this.$http({
                method: 'post',
                headers: { 'Content-Type': 'application/json ;charset=utf-8' },
                url: '/pdp/user/check-login',
                params: { username: userName }
            });
        };
        MainService.prototype.updatePwdToFcs = function (params) {
            return this.$http({
                method: 'post',
                url: '/pdp/user/changeUser',
                params: params
            });
        };
        MainService.prototype.updatePwdToBcs = function (params) {
            return this.$http({
                method: 'post',
                url: '/db/user/updatePwd',
                data: params
            });
        };
        MainService.prototype.updateSystemData = function () {
            return this.$http({
                method: 'get',
                url: '/db/param/findSystemConfig'
            });
        };
        MainService.$inject = ['$http'];
        return MainService;
    }());
    main_app_1.app
        .service('mainService', MainService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvaW5kZXgvbWFpbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQThCQTtRQUVJLHFCQUFvQixLQUFTO1lBQVQsVUFBSyxHQUFMLEtBQUssQ0FBSTtRQUU3QixDQUFDO1FBQ0QsOEJBQVEsR0FBUixVQUFTLE9BQWU7WUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixPQUFPLEVBQUMsRUFBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUM7Z0JBQzNELEdBQUcsRUFBQyxrQkFBa0I7Z0JBQ3RCLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUM7YUFDN0IsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELGdDQUFVLEdBQVYsVUFBVyxRQUFnQjtZQUd2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixPQUFPLEVBQUMsRUFBQyxjQUFjLEVBQUUsaUNBQWlDLEVBQUM7Z0JBQzNELEdBQUcsRUFBQyx1QkFBdUI7Z0JBQzNCLE1BQU0sRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUM7YUFDL0IsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELG9DQUFjLEdBQWQsVUFBZSxNQUF3QjtZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDZCxNQUFNLEVBQUMsTUFBTTtnQkFDYixHQUFHLEVBQUMsc0JBQXNCO2dCQUMxQixNQUFNLEVBQUMsTUFBTTthQUNoQixDQUFDLENBQUE7UUFDTixDQUFDO1FBRUQsb0NBQWMsR0FBZCxVQUFlLE1BQXdCO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxNQUFNO2dCQUNiLEdBQUcsRUFBQyxvQkFBb0I7Z0JBQ3hCLElBQUksRUFBQyxNQUFNO2FBQ2QsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELHNDQUFnQixHQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBQyxLQUFLO2dCQUNaLEdBQUcsRUFBQyw0QkFBNEI7YUFDbkMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQTlDTSxtQkFBTyxHQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBK0M3QyxrQkFBQztLQWhERCxBQWdEQyxJQUFBO0lBQ0QsY0FBRztTQUNFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2luZGV4L21haW4uc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuLyoqXHJcbiAqIOWFqOWxgOivt+axguaTjeS9nFxyXG4gKiBAdGltZTogMjAxNy0wNS0xMSAxMDoxMDo0OVxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5cclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHthcHB9IGZyb20gJy4uL2NvbW1vbi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQge0lVcGRhdGVQd2RQYXJhbXN9IGZyb20gXCIuLi8uLi9jb3JlL3BhcmFtcy9Vc2VyUGFyYW1zXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYWluU2VydmljZXtcclxuICAgIGxvZ2luT3V0KHVzZXJLZXk6IHN0cmluZyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbiAgICBjaGVja0xvZ2luKHVzZXJOYW1lOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlUmVzdWx0PGFueT4+O1xyXG5cclxuICAgIHVwZGF0ZVB3ZFRvRmNzKHBhcmFtczogSVVwZGF0ZVB3ZFBhcmFtcyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg5L+u5pS55a+G56CB5ZCOIOWQjOatpeWIsCDln7rnoYBkYlxyXG4gICAgICogQHRpbWU6IDIwMTctMDgtMTggMDk6Mzk6MDlcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHdkVG9CY3MocGFyYW1zOiBJVXBkYXRlUHdkUGFyYW1zKTogUHJvbWlzZTxSZXNwb25zZVJlc3VsdDxib29sZWFuPj47XHJcbiAgICAvKipcclxuICAgICAqIOivt+axguezu+e7n+mFjee9rlxyXG4gICAgICovXHJcbiAgICB1cGRhdGVTeXN0ZW1EYXRhKCk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbn1cclxuXHJcbmNsYXNzIE1haW5TZXJ2aWNlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OkFycmF5PHN0cmluZz4gPSBbJyRodHRwJ107XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOmFueSl7XHJcblxyXG4gICAgfVxyXG4gICAgbG9naW5PdXQodXNlcktleTogc3RyaW5nKXtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKHVzZXJLZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcclxuICAgICAgICAgICAgaGVhZGVyczp7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uIDtjaGFyc2V0PXV0Zi04J30sXHJcbiAgICAgICAgICAgIHVybDonL2Zkcy91c2VyL2xvZ291dCcsXHJcbiAgICAgICAgICAgIHBhcmFtczoge3VzZXJLZXk6IHVzZXJLZXl9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0xvZ2luKHVzZXJOYW1lOiBzdHJpbmcpe1xyXG4gICAgICAgIC8vIOWtmOacrOWcsOaVsOaNruOAguOAguOAguOAglxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6eydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbiA7Y2hhcnNldD11dGYtOCd9LFxyXG4gICAgICAgICAgICB1cmw6Jy9wZHAvdXNlci9jaGVjay1sb2dpbicsXHJcbiAgICAgICAgICAgIHBhcmFtczoge3VzZXJuYW1lOiB1c2VyTmFtZX1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVB3ZFRvRmNzKHBhcmFtczogSVVwZGF0ZVB3ZFBhcmFtcyl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6Jy9wZHAvdXNlci9jaGFuZ2VVc2VyJyxcclxuICAgICAgICAgICAgcGFyYW1zOnBhcmFtc1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUHdkVG9CY3MocGFyYW1zOiBJVXBkYXRlUHdkUGFyYW1zKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDonL2RiL3VzZXIvdXBkYXRlUHdkJyxcclxuICAgICAgICAgICAgZGF0YTpwYXJhbXNcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVN5c3RlbURhdGEoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cCh7XHJcbiAgICAgICAgICAgIG1ldGhvZDonZ2V0JyxcclxuICAgICAgICAgICAgdXJsOicvZGIvcGFyYW0vZmluZFN5c3RlbUNvbmZpZydcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ21haW5TZXJ2aWNlJywgTWFpblNlcnZpY2UpOyJdfQ==
