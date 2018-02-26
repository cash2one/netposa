define(["require", "exports", "../../common/app/main.app", "css!./check.area.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CheckAreaPopupController = (function () {
        function CheckAreaPopupController($scope, $timeout) {
            this.$scope = $scope;
            this.deviceList = $scope.deviceList;
            this.geometry = $scope.geometry;
            console.log(this.deviceList);
        }
        CheckAreaPopupController.prototype.submitCheck = function () {
            this.$scope.$emit('close.check.area', this.geometry, true, this.deviceList);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUE7UUFLSSxrQ0FBb0IsTUFBVyxFQUFFLFFBQWE7WUFBMUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFFRCw4Q0FBVyxHQUFYO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQy9FLENBQUM7UUFDRCwrQ0FBWSxHQUFaLFVBQWEsQ0FBUTtZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELHlDQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDeEQsQ0FBQztRQWxCTSxnQ0FBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQW1CM0QsK0JBQUM7S0FwQkQsQUFvQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9jaGVja0FyZWFQb3B1cC9jaGVjay5hcmVhLnBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi9jaGVjay5hcmVhLmNzcyc7XHJcbmltcG9ydCB7U3lzdGVtUG9pbnR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9TeXN0ZW1Qb2ludFwiO1xyXG5cclxuY2xhc3MgQ2hlY2tBcmVhUG9wdXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnXTtcclxuICAgIGRldmljZUxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBnZW9tZXRyeTogTlBNYXBMaWIuR2VvbWV0cnkuUG9seWdvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCAkdGltZW91dDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VMaXN0ID0gJHNjb3BlLmRldmljZUxpc3Q7XHJcbiAgICAgICAgdGhpcy5nZW9tZXRyeSA9ICRzY29wZS5nZW9tZXRyeTtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRldmljZUxpc3QpXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0Q2hlY2soKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLmNoZWNrLmFyZWEnLCB0aGlzLmdlb21ldHJ5LCB0cnVlLCB0aGlzLmRldmljZUxpc3QpXHJcbiAgICB9XHJcbiAgICBkZWxldGVEZXZpY2UoaTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZGV2aWNlTGlzdC5zcGxpY2UoaSwxKTtcclxuICAgIH1cclxuICAgIGNhbmNlbCgpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UuY2hlY2suYXJlYScsIHRoaXMuZ2VvbWV0cnkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdDaGVja0FyZWFQb3B1cENvbnRyb2xsZXInLCBDaGVja0FyZWFQb3B1cENvbnRyb2xsZXIpOyJdfQ==
