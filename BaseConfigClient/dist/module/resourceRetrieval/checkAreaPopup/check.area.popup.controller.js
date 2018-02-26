define(["require", "exports", "../../common/app/main.app", "css!./check.area.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CheckAreaPopupController = /** @class */ (function () {
        function CheckAreaPopupController($scope, $timeout) {
            this.$scope = $scope;
            this.deviceList = $scope.deviceList;
            this.geometry = $scope.geometry;
        }
        CheckAreaPopupController.prototype.submitCheck = function () {
            var arr = [];
            this.deviceList.forEach(function (point) {
                arr.push(point.ObjectID);
            });
            this.$scope.$emit('close.check.area', this.geometry, true, arr);
        };
        CheckAreaPopupController.prototype.deleteDevice = function (i) {
            this.deviceList.splice(i, 1);
        };
        CheckAreaPopupController.prototype.cancel = function () {
            this.$scope.$emit('close.check.area', this.geometry);
        };
        CheckAreaPopupController.$inject = ['$scope', '$timeout'];
        return CheckAreaPopupController;
    }());
    main_app_1.app.controller('CheckAreaPopupController', CheckAreaPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoZWNrLmFyZWEucG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFJQTtRQUtJLGtDQUFvQixNQUFXLEVBQUUsUUFBYTtZQUExQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEMsQ0FBQztRQUVELDhDQUFXLEdBQVg7WUFDSSxJQUFJLEdBQUcsR0FBaUIsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBaUI7Z0JBQ3ZDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUNELCtDQUFZLEdBQVosVUFBYSxDQUFRO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0QseUNBQU0sR0FBTjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4RCxDQUFDO1FBckJNLGdDQUFPLEdBQWtCLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBc0IzRCwrQkFBQztLQXZCRCxBQXVCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDIiwiZmlsZSI6ImNoZWNrLmFyZWEucG9wdXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuL2NoZWNrLmFyZWEuY3NzJztcclxuaW1wb3J0IHtTeXN0ZW1Qb2ludH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L1N5c3RlbVBvaW50XCI7XHJcblxyXG5jbGFzcyBDaGVja0FyZWFQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckdGltZW91dCddO1xyXG4gICAgZGV2aWNlTGlzdDogQXJyYXk8YW55PjtcclxuICAgIGdlb21ldHJ5OiBOUE1hcExpYi5HZW9tZXRyeS5Qb2x5Z29uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksICR0aW1lb3V0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRldmljZUxpc3QgPSAkc2NvcGUuZGV2aWNlTGlzdDtcclxuICAgICAgICB0aGlzLmdlb21ldHJ5ID0gJHNjb3BlLmdlb21ldHJ5O1xyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdENoZWNrKCkge1xyXG4gICAgICAgIGxldCBhcnI6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGV2aWNlTGlzdC5mb3JFYWNoKChwb2ludDpTeXN0ZW1Qb2ludCk9PntcclxuICAgICAgICAgICBhcnIucHVzaChwb2ludC5PYmplY3RJRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLmNoZWNrLmFyZWEnLCB0aGlzLmdlb21ldHJ5LCB0cnVlLCBhcnIpXHJcbiAgICB9XHJcbiAgICBkZWxldGVEZXZpY2UoaTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZGV2aWNlTGlzdC5zcGxpY2UoaSwxKTtcclxuICAgIH1cclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UuY2hlY2suYXJlYScsIHRoaXMuZ2VvbWV0cnkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdDaGVja0FyZWFQb3B1cENvbnRyb2xsZXInLCBDaGVja0FyZWFQb3B1cENvbnRyb2xsZXIpOyJdfQ==
