define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComparisonFactory = (function () {
        function ComparisonFactory() {
        }
        ComparisonFactory.prototype.getResponse = function (data) {
            this.response = data;
        };
        ComparisonFactory.prototype.sendResponse = function () {
            return this.response;
        };
        ComparisonFactory.prototype.clearRsponse = function () {
            this.response = null;
        };
        return ComparisonFactory;
    }());
    main_app_1.app
        .service('comparisonFactory', ComparisonFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY2VIYW5kbGVQb3B1cC9jb21wYXJpc29uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBY0E7UUFBQTtRQWdCQSxDQUFDO1FBWkcsdUNBQVcsR0FBWCxVQUFZLElBQVE7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztRQUVELHdDQUFZLEdBQVo7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO1FBRUQsd0NBQVksR0FBWjtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7UUFFTCx3QkFBQztJQUFELENBaEJBLEFBZ0JDLElBQUE7SUFFRCxjQUFHO1NBQ0UsT0FBTyxDQUFDLG1CQUFtQixFQUFFLGlCQUFpQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWNlSGFuZGxlUG9wdXAvY29tcGFyaXNvbi5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdGogb24gMjAxNy82LzI5LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElDb21wYXJpc29uRmFjdG9yeXtcclxuICAgIC8v6I635Y+WXHJcbiAgICBnZXRSZXNwb25zZTpGdW5jdGlvbjtcclxuICAgIC8v5Lyg6YCSXHJcbiAgICBzZW5kUmVzcG9uc2U6RnVuY3Rpb247XHJcbiAgICAvL+a4heepuuaVsOaNrlxyXG4gICAgY2xlYXJSc3BvbnNlOkZ1bmN0aW9uO1xyXG59XHJcblxyXG5jbGFzcyBDb21wYXJpc29uRmFjdG9yeSBpbXBsZW1lbnRzIElDb21wYXJpc29uRmFjdG9yeXtcclxuXHJcbiAgICByZXNwb25zZTpzdHJpbmc7XHJcblxyXG4gICAgZ2V0UmVzcG9uc2UoZGF0YTphbnkpe1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbmRSZXNwb25zZSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc3BvbnNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyUnNwb25zZSgpe1xyXG4gICAgICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwXHJcbiAgICAuc2VydmljZSgnY29tcGFyaXNvbkZhY3RvcnknLCBDb21wYXJpc29uRmFjdG9yeSk7XHJcbiJdfQ==
