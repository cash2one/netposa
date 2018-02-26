define(["require", "exports", "../app/main.app", "css!./personAlarmPopup.css", "../factory/alarmDisposePopupCache.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var personAlarmPopupController = (function () {
        function personAlarmPopupController($scope, $rootScope, $timeout, alarmPopupCache) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.alarmPopupCache = alarmPopupCache;
            this.model = this.$scope.data;
            this.task = this.$scope.task;
        }
        personAlarmPopupController.prototype.closeAlarmPopup = function () {
            this.$rootScope.$emit('closeAlarmPopup');
        };
        personAlarmPopupController.prototype.changeAlarmPopupStatus = function (flag) {
            this.alarmPopupCache.setAlarmPopupState(flag);
        };
        personAlarmPopupController.$inject = ['$scope', '$rootScope', '$timeout', 'alarmPopupCache'];
        return personAlarmPopupController;
    }());
    main_app_1.app.controller('personAlarmPopupController', personAlarmPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvcGVyc29uQWxhcm1Qb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVlBO1FBS0ksb0NBQW9CLE1BQVcsRUFDWCxVQUFlLEVBQ2YsUUFBa0IsRUFDbEIsZUFBaUM7WUFIakMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGVBQVUsR0FBVixVQUFVLENBQUs7WUFDZixhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUdELG9EQUFlLEdBQWY7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFFRCwyREFBc0IsR0FBdEIsVUFBdUIsSUFBYTtZQUNoQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFuQk0sa0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFxQjdFLGlDQUFDO0tBdEJELEFBc0JDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDRCQUE0QixFQUFFLDBCQUEwQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL3BlcnNvbkFsYXJtUG9wdXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IExpdWJvIG9uIDIwMTcvOS8yMiAwMDIyLlxyXG4gKi9cclxuaW1wb3J0ICdjc3MhLi9wZXJzb25BbGFybVBvcHVwLmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7SUFsYXJtUG9wdXBDYWNoZX0gZnJvbSAnLi4vZmFjdG9yeS9hbGFybURpc3Bvc2VQb3B1cENhY2hlLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4uL2ZhY3RvcnkvYWxhcm1EaXNwb3NlUG9wdXBDYWNoZS5mYWN0b3J5JztcclxuaW1wb3J0IHtUYXNrTW9kZWx9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuXHJcblxyXG5kZWNsYXJlIGxldCAkOiBhbnksIF86IGFueTtcclxuXHJcbmNsYXNzIHBlcnNvbkFsYXJtUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHJvb3RTY29wZScsICckdGltZW91dCcsICdhbGFybVBvcHVwQ2FjaGUnXTtcclxuICAgIG1vZGVsOiBhbnk7XHJcbiAgICB0YXNrOiBUYXNrTW9kZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHJvb3RTY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGFsYXJtUG9wdXBDYWNoZTogSUFsYXJtUG9wdXBDYWNoZSkge1xyXG4gICAgICAgIHRoaXMubW9kZWwgPSB0aGlzLiRzY29wZS5kYXRhO1xyXG4gICAgICAgIHRoaXMudGFzayA9IHRoaXMuJHNjb3BlLnRhc2s7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNsb3NlQWxhcm1Qb3B1cCgpIHtcclxuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoJ2Nsb3NlQWxhcm1Qb3B1cCcpXHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlQWxhcm1Qb3B1cFN0YXR1cyhmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5hbGFybVBvcHVwQ2FjaGUuc2V0QWxhcm1Qb3B1cFN0YXRlKGZsYWcpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcigncGVyc29uQWxhcm1Qb3B1cENvbnRyb2xsZXInLCBwZXJzb25BbGFybVBvcHVwQ29udHJvbGxlcik7Il19
