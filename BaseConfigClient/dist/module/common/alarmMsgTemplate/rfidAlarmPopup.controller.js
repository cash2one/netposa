define(["require", "exports", "../app/main.app", "css!./macTaskPopup.css", "../factory/alarmDisposePopupCache.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RfidAlarmPopupController = (function () {
        function RfidAlarmPopupController($scope, $rootScope, $timeout, alarmPopupCache) {
            this.$scope = $scope;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.alarmPopupCache = alarmPopupCache;
            this.model = this.$scope.data;
            this.task = this.$scope.task;
        }
        RfidAlarmPopupController.prototype.closeAlarmPopup = function () {
            this.$rootScope.$emit('closeAlarmPopup');
        };
        RfidAlarmPopupController.prototype.changeAlarmPopupStatus = function (flag) {
            this.alarmPopupCache.setAlarmPopupState(flag);
        };
        RfidAlarmPopupController.$inject = ['$scope', '$rootScope', '$timeout', 'alarmPopupCache'];
        return RfidAlarmPopupController;
    }());
    main_app_1.app.controller('rfidAlarmPopupController', RfidAlarmPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvcmZpZEFsYXJtUG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFTQTtRQUlJLGtDQUNZLE1BQVcsRUFDWCxVQUFjLEVBQ2QsUUFBa0IsRUFDbEIsZUFBaUM7WUFIakMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGVBQVUsR0FBVixVQUFVLENBQUk7WUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUV6QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUNELGtEQUFlLEdBQWY7WUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFDRCx5REFBc0IsR0FBdEIsVUFBdUIsSUFBWTtZQUMvQixJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFqQk0sZ0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFrQjVFLCtCQUFDO0tBbkJELEFBbUJDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9hbGFybU1zZ1RlbXBsYXRlL3JmaWRBbGFybVBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgTGl1Ym8gb24gMjAxNy85LzIyIDAwMjIuXHJcbiAqL1xyXG5pbXBvcnQgJ2NzcyEuL21hY1Rhc2tQb3B1cC5jc3MnO1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7IElBbGFybVBvcHVwQ2FjaGUgfSBmcm9tICcuLi9mYWN0b3J5L2FsYXJtRGlzcG9zZVBvcHVwQ2FjaGUuZmFjdG9yeSc7XHJcbmltcG9ydCAnLi4vZmFjdG9yeS9hbGFybURpc3Bvc2VQb3B1cENhY2hlLmZhY3RvcnknO1xyXG5pbXBvcnQge01hY01vbml0b3J9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9UYXNrTW9kZWxcIjtcclxuY2xhc3MgUmZpZEFsYXJtUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCckcm9vdFNjb3BlJywgJyR0aW1lb3V0JywgJ2FsYXJtUG9wdXBDYWNoZSddO1xyXG4gICAgbW9kZWw6IGFueTtcclxuICAgIHRhc2s6TWFjTW9uaXRvcjtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkcm9vdFNjb3BlOmFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGFsYXJtUG9wdXBDYWNoZTogSUFsYXJtUG9wdXBDYWNoZVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbCA9IHRoaXMuJHNjb3BlLmRhdGE7XHJcbiAgICAgICAgdGhpcy50YXNrID0gdGhpcy4kc2NvcGUudGFzaztcclxuICAgIH1cclxuICAgIGNsb3NlQWxhcm1Qb3B1cCgpe1xyXG4gICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdCgnY2xvc2VBbGFybVBvcHVwJylcclxuICAgIH1cclxuICAgIGNoYW5nZUFsYXJtUG9wdXBTdGF0dXMoZmxhZzpib29sZWFuKXtcclxuICAgICAgICB0aGlzLmFsYXJtUG9wdXBDYWNoZS5zZXRBbGFybVBvcHVwU3RhdGUoZmxhZylcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ3JmaWRBbGFybVBvcHVwQ29udHJvbGxlcicsIFJmaWRBbGFybVBvcHVwQ29udHJvbGxlcik7Il19
