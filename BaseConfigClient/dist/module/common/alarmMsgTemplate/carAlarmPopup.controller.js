define(["require", "exports", "../app/main.app", "css!./carAlarmPopup.css", "../factory/alarmDisposePopupCache.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var carAlarmPopupController = (function () {
        function carAlarmPopupController($scope, $rootScope, $timeout, alarmPopupCache) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.alarmPopupCache = alarmPopupCache;
            this.model = this.$scope.data;
            this.task = this.$scope.task;
        }
        carAlarmPopupController.prototype.closeAlarmPopup = function () {
            this.$rootScope.$emit('closeAlarmPopup');
        };
        carAlarmPopupController.prototype.changeAlarmPopupStatus = function (flag) {
            this.alarmPopupCache.setAlarmPopupState(flag);
        };
        carAlarmPopupController.$inject = ['$scope', '$rootScope', '$timeout', 'alarmPopupCache'];
        return carAlarmPopupController;
    }());
    main_app_1.app.controller('carAlarmPopupController', carAlarmPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvY2FyQWxhcm1Qb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVVBO1FBSUksaUNBQ1ksTUFBVSxFQUNWLFVBQWUsRUFDZixRQUFrQixFQUNsQixlQUFnQztZQUhoQyxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQ1YsZUFBVSxHQUFWLFVBQVUsQ0FBSztZQUNmLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBRXhDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNqQyxDQUFDO1FBQ0QsaURBQWUsR0FBZjtZQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDNUMsQ0FBQztRQUNELHdEQUFzQixHQUF0QixVQUF1QixJQUFZO1lBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakQsQ0FBQztRQWpCTSwrQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUMsaUJBQWlCLENBQUMsQ0FBQztRQWtCM0UsOEJBQUM7S0FuQkQsQUFtQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvY2FyQWxhcm1Qb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgTGl1Ym8gb24gMjAxNy85LzIyIDAwMjIuXHJcbiAqL1xyXG5pbXBvcnQgJ2NzcyEuL2NhckFsYXJtUG9wdXAuY3NzJztcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgeyBJQWxhcm1Qb3B1cENhY2hlIH0gZnJvbSAnLi4vZmFjdG9yeS9hbGFybURpc3Bvc2VQb3B1cENhY2hlLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uL2ZhY3RvcnkvYWxhcm1EaXNwb3NlUG9wdXBDYWNoZS5mYWN0b3J5JztcclxuaW1wb3J0IHtDYXJNb25pdG9yfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9zZXJ2ZXIvVGFza01vZGVsXCI7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueSwgXzogYW55O1xyXG5cclxuY2xhc3MgY2FyQWxhcm1Qb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJyRyb290U2NvcGUnLCAnJHRpbWVvdXQnLCdhbGFybVBvcHVwQ2FjaGUnXTtcclxuICAgIG1vZGVsOmFueTtcclxuICAgIHRhc2s6Q2FyTW9uaXRvcjtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOmFueSxcclxuICAgICAgICBwcml2YXRlICRyb290U2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGFsYXJtUG9wdXBDYWNoZTpJQWxhcm1Qb3B1cENhY2hlXHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy4kc2NvcGUuZGF0YTtcclxuICAgICAgICB0aGlzLnRhc2sgPSB0aGlzLiRzY29wZS50YXNrO1xyXG4gICAgfVxyXG4gICAgY2xvc2VBbGFybVBvcHVwKCl7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCdjbG9zZUFsYXJtUG9wdXAnKVxyXG4gICAgfVxyXG4gICAgY2hhbmdlQWxhcm1Qb3B1cFN0YXR1cyhmbGFnOmJvb2xlYW4pe1xyXG4gICAgICAgIHRoaXMuYWxhcm1Qb3B1cENhY2hlLnNldEFsYXJtUG9wdXBTdGF0ZShmbGFnKVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignY2FyQWxhcm1Qb3B1cENvbnRyb2xsZXInLCBjYXJBbGFybVBvcHVwQ29udHJvbGxlcik7Il19
