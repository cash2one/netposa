define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MapPopupController = (function () {
        function MapPopupController($scope, $timeout) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$timeout(function () {
                _this.model = _this.$scope.model;
                _this.ID = _this.$scope.ID;
            });
        }
        MapPopupController.prototype.submit = function () {
            this.$scope.$emit('close.map.point.popup', this.model, this.ID, true);
        };
        MapPopupController.prototype.cancel = function () {
            this.$scope.$emit('close.map.point.popup', this.model, this.ID, false);
        };
        MapPopupController.$inject = ['$scope', '$timeout'];
        return MapPopupController;
    }());
    main_app_1.app.controller('mapPopupController', MapPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9tYXAtcmVzb3VyY2UvbWFwLnBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFLSSw0QkFBb0IsTUFBVyxFQUFVLFFBQWE7WUFBdEQsaUJBS0M7WUFMbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUMvQixLQUFJLENBQUMsRUFBRSxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQzdCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUVELG1DQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDekUsQ0FBQztRQUVELG1DQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDMUUsQ0FBQztRQWpCTSwwQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBa0I1Qyx5QkFBQztLQW5CRCxBQW1CQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL21hcC1yZXNvdXJjZS9tYXAucG9wdXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge1N5c3RlbVBvaW50fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvU3lzdGVtUG9pbnRcIjtcclxuXHJcbmNsYXNzIE1hcFBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0J107XHJcbiAgICBtb2RlbDogU3lzdGVtUG9pbnQ7XHJcbiAgICBJRDogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksIHByaXZhdGUgJHRpbWVvdXQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gdGhpcy4kc2NvcGUubW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMuSUQgPSB0aGlzLiRzY29wZS5JRDtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UubWFwLnBvaW50LnBvcHVwJywgdGhpcy5tb2RlbCwgdGhpcy5JRCwgdHJ1ZSlcclxuICAgIH1cclxuXHJcbiAgICBjYW5jZWwoKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLm1hcC5wb2ludC5wb3B1cCcsIHRoaXMubW9kZWwsIHRoaXMuSUQsIGZhbHNlKVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignbWFwUG9wdXBDb250cm9sbGVyJywgTWFwUG9wdXBDb250cm9sbGVyKTsiXX0=
