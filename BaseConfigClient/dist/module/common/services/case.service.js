define(["require", "exports", "../app/main.app", "../factory/response.notify.factory", "angular", "./casecade.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CaseSearchParams = (function () {
        function CaseSearchParams() {
            this.currentPage = 1;
            this.pageSize = 10;
        }
        return CaseSearchParams;
    }());
    exports.CaseSearchParams = CaseSearchParams;
    var CaseService = (function () {
        function CaseService($http, notifyFactory) {
            this.$http = $http;
            this.notifyFactory = notifyFactory;
            this.notifyFunc = this.notifyFactory.msg({ onlySuccess: true });
        }
        CaseService.prototype.findListByPage = function (params) {
            return this.$http({
                method: 'post',
                params: params,
                url: '/db/eventRule/findListByPage'
            });
        };
        ;
        CaseService.$inject = ['$http', 'notifyFactory'];
        return CaseService;
    }());
    main_app_1.app
        .service('caseService', CaseService);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3NlcnZpY2VzL2Nhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQTtRQVdJO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FmQSxBQWVDLElBQUE7SUFmWSw0Q0FBZ0I7SUFzQjdCO1FBTUkscUJBQW9CLEtBQWUsRUFBVSxhQUFxQztZQUE5RCxVQUFLLEdBQUwsS0FBSyxDQUFVO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQXdCO1lBQzlFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQ0Qsb0NBQWMsR0FBZCxVQUFlLE1BQXdCO1lBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLEdBQUcsRUFBRSw4QkFBOEI7YUFDdEMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFBLENBQUM7UUFaSyxtQkFBTyxHQUFrQixDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsQ0FBQztRQWMvRCxrQkFBQztLQWpCRCxBQWlCQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9zZXJ2aWNlcy9jYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3RvcnkvcmVzcG9uc2Uubm90aWZ5LmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vZmFjdG9yeS9yZXNwb25zZS5ub3RpZnkuZmFjdG9yeVwiO1xyXG5kZWNsYXJlIGxldCByZXF1aXJlOiBhbnk7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0IHsgQ2FtZXJhQ2hhbmdlQXJlYUlETW9kZWwsIENhbWVyYUNoYW5nZUNhbWVyYVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvQ2FtZXJhUGFyYW1zXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgJy4vY2FzZWNhZGUuc2VydmljZSc7XHJcbmltcG9ydCB7IENhc0NhZGVTZXJ2aWNlIH0gZnJvbSAnLi9jYXNlY2FkZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUHJvbWlzZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy9lczYtcHJvbWlzZS9pbmRleCc7XHJcbmltcG9ydCB7IENhc2VUYWJsZVBhcmFtcyB9IGZyb20gJy4uLy4uLy4uL2NvcmUvcGFyYW1zL0Nhc2VQYXJhbXMnO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FzZVNlYXJjaFBhcmFtcyB7XHJcbiAgICBhcmVhSWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIG9yZGVyRmllbGQ6IHN0cmluZztcclxuICAgIGlzQXNjOiBib29sZWFuO1xyXG4gICAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICAgIHBhZ2VTaXplOiBudW1iZXI7XHJcbiAgICB0YXNrTW9uaXRvclR5cGU/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVUaW1lQmVnaW4/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVUaW1lRW5kPzogc3RyaW5nO1xyXG4gICAgcnVsZU5hbWU/OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSAxMDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQ2FzZVNlcnZpY2Uge1xyXG4gICAgLy8gVE9ETyDmsqHmnInkvb/nlKjliLDnmoTmjqXlj6NcclxuICAgIGZpbmRMaXN0QnlQYWdlKHBhcmFtczogQ2FzZVNlYXJjaFBhcmFtcyk6IFByb21pc2U8UmVzcG9uc2VSZXN1bHQ8YW55Pj47XHJcbn1cclxuXHJcbmNsYXNzIENhc2VTZXJ2aWNlIGltcGxlbWVudHMgSUNhc2VTZXJ2aWNlIHtcclxuXHJcblxyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRodHRwJywgJ25vdGlmeUZhY3RvcnknXTtcclxuICAgIHByaXZhdGUgbm90aWZ5RnVuYzogKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4gUmVzcG9uc2VSZXN1bHQ8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOiBGdW5jdGlvbiwgcHJpdmF0ZSBub3RpZnlGYWN0b3J5OiBJUmVzcG9uc2VOb3RpZnlGYWN0b3J5KSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZnlGdW5jID0gdGhpcy5ub3RpZnlGYWN0b3J5Lm1zZyh7IG9ubHlTdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZmluZExpc3RCeVBhZ2UocGFyYW1zOiBDYXNlU2VhcmNoUGFyYW1zKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgcGFyYW1zOiBwYXJhbXMsXHJcbiAgICAgICAgICAgIHVybDogJy9kYi9ldmVudFJ1bGUvZmluZExpc3RCeVBhZ2UnXHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG59XHJcblxyXG5hcHBcclxuICAgIC5zZXJ2aWNlKCdjYXNlU2VydmljZScsIENhc2VTZXJ2aWNlKTsiXX0=
