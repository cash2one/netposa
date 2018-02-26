define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CollectService = (function () {
        function CollectService($http, notifyFactory, userInfoCacheFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        CollectService.prototype.findListByPage = function (params) {
            var _params = angular.copy(params);
            _params.userID = this.userInfoCacheFactory.getCurrentUserId();
            return this.$http({
                method: 'post',
                url: '/db/collect/findListByPage',
                data: _params
            });
        };
        CollectService.$inject = ['$http', 'notifyFactory', 'userInfoCacheFactory'];
        return CollectService;
    }());
    main_app_1.app
        .service('collectService', CollectService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2NvbGxlY3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFjQTtRQUlJLHdCQUFvQixLQUFlLEVBQVUsYUFBcUMsRUFBVSxvQkFBMkM7WUFBbkgsVUFBSyxHQUFMLEtBQUssQ0FBVTtZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUF3QjtZQUFVLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUFDbkksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFFRCx1Q0FBYyxHQUFkLFVBQWUsTUFBMkI7WUFDdEMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSw0QkFBNEI7Z0JBQ2pDLElBQUksRUFBRSxPQUFPO2FBQ2hCLENBQUMsQ0FBQztRQUNQLENBQUM7UUFmTSxzQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQWdCdkYscUJBQUM7S0FqQkQsQUFpQkMsSUFBQTtJQUVELGNBQUc7U0FDRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9jb2xsZWN0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SVJlc3BvbnNlTm90aWZ5RmFjdG9yeX0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IHtDb2xsZWN0fSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9Db2xsZWN0J1xyXG5pbXBvcnQge1NlYXJjaENvbGxlY3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Db2xsZWN0UGFyYW1zXCI7XHJcbmltcG9ydCB7SVVzZXJJbmZvQ2FjaGVGYWN0b3J5fSBmcm9tIFwiLi4vZmFjdG9yeS91c2VyaW5mby5jYWNoZS5mYWN0b3J5XCI7XHJcbmltcG9ydCB7Q29sbGVjdEV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQ29sbGVjdEV4XCI7XHJcblxyXG5kZWNsYXJlIGxldCAkOiBhbnksIGFuZ3VsYXI6IGFueTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbGxlY3RTZXJ2aWNlIHtcclxuICAgIGZpbmRMaXN0QnlQYWdlKHBhcmFtczogU2VhcmNoQ29sbGVjdFBhcmFtcyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8QXJyYXk8Q29sbGVjdEV4Pj4+O1xyXG59XHJcblxyXG5jbGFzcyBDb2xsZWN0U2VydmljZSBpbXBsZW1lbnRzIElDb2xsZWN0U2VydmljZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGh0dHAnLCAnbm90aWZ5RmFjdG9yeScsICd1c2VySW5mb0NhY2hlRmFjdG9yeSddO1xyXG4gICAgcHJpdmF0ZSBub3RpZnlGdW5jOiAocmVzOiBSZXNwb25zZVJlc3VsdDxhbnk+KSA9PiBSZXNwb25zZVJlc3VsdDxhbnk+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IEZ1bmN0aW9uLCBwcml2YXRlIG5vdGlmeUZhY3Rvcnk6IElSZXNwb25zZU5vdGlmeUZhY3RvcnksIHByaXZhdGUgdXNlckluZm9DYWNoZUZhY3Rvcnk6IElVc2VySW5mb0NhY2hlRmFjdG9yeSkge1xyXG4gICAgICAgIHRoaXMubm90aWZ5RnVuYyA9IHRoaXMubm90aWZ5RmFjdG9yeS5tc2coe29ubHlTdWNjZXNzOiB0cnVlfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZExpc3RCeVBhZ2UocGFyYW1zOiBTZWFyY2hDb2xsZWN0UGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSBhbmd1bGFyLmNvcHkocGFyYW1zKTtcclxuICAgICAgICBfcGFyYW1zLnVzZXJJRCA9IHRoaXMudXNlckluZm9DYWNoZUZhY3RvcnkuZ2V0Q3VycmVudFVzZXJJZCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLiRodHRwKHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9jb2xsZWN0L2ZpbmRMaXN0QnlQYWdlJyxcclxuICAgICAgICAgICAgZGF0YTogX3BhcmFtc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdjb2xsZWN0U2VydmljZScsIENvbGxlY3RTZXJ2aWNlKTsiXX0=
