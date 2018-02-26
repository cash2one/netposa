define(["require", "exports", "../../common/app/main.app", "moment"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var macDetailsController = (function () {
        function macDetailsController($scope) {
            this.$scope = $scope;
            this.AuditStatusMap = $scope.AuditStatusMap;
            this.TaskTypeMap = $scope.TaskTypeMap;
            this.TaskStatusMap = $scope.TaskStatusMap;
            this.MyCheck = this.$scope.MyCheck;
            this.MyTaskModel = $scope.MyTaskModel;
            this.validTime = moment(this.$scope.MyCheck.ValidTimeStart).format("YYYY-MM-DD") + "-" + moment(this.$scope.MyCheck.ValidTimeEnd).format("YYYY-MM-DD");
        }
        macDetailsController.prototype.cancel = function (flag) {
            this.$scope.$emit('details.closePopup', flag);
        };
        macDetailsController.$inject = ['$scope'];
        return macDetailsController;
    }());
    exports.macDetailsController = macDetailsController;
    main_app_1.app.controller('macDetailsController', macDetailsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teUNoZWNrL21hY0RldGFpbHMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFPQTtRQVNJLDhCQUFvQixNQUFXO1lBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ25DLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0osQ0FBQztRQUVELHFDQUFNLEdBQU4sVUFBTyxJQUFjO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFuQk0sNEJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBb0JoQywyQkFBQztLQXJCRCxBQXFCQyxJQUFBO0lBckJZLG9EQUFvQjtJQXVCakMsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS90b29sT3B0aW9uL215Q2hlY2svbWFjRGV0YWlscy5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGVja1Rhc2tNb2RlbCwgTXlDaGVja0RldGFpbHNQYXJhbXN9IGZyb20gXCIuL2RldGFpbHMuY29udHJvbGxlclwiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0VudW1cIjtcclxuaW1wb3J0ICdtb21lbnQnXHJcblxyXG5kZWNsYXJlIGxldCBtb21lbnQ6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBtYWNEZXRhaWxzQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcbiAgICBNeUNoZWNrOiBNeUNoZWNrRGV0YWlsc1BhcmFtcztcclxuICAgIHZhbGlkVGltZTogc3RyaW5nO1xyXG4gICAgQXVkaXRTdGF0dXNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBUYXNrVHlwZU1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgIFRhc2tTdGF0dXNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBNeVRhc2tNb2RlbDogQ2hlY2tUYXNrTW9kZWw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuQXVkaXRTdGF0dXNNYXAgPSAkc2NvcGUuQXVkaXRTdGF0dXNNYXA7XHJcbiAgICAgICAgdGhpcy5UYXNrVHlwZU1hcCA9ICRzY29wZS5UYXNrVHlwZU1hcDtcclxuICAgICAgICB0aGlzLlRhc2tTdGF0dXNNYXAgPSAkc2NvcGUuVGFza1N0YXR1c01hcDtcclxuICAgICAgICB0aGlzLk15Q2hlY2sgPSB0aGlzLiRzY29wZS5NeUNoZWNrO1xyXG4gICAgICAgIHRoaXMuTXlUYXNrTW9kZWwgPSAkc2NvcGUuTXlUYXNrTW9kZWw7XHJcbiAgICAgICAgdGhpcy52YWxpZFRpbWUgPSBtb21lbnQodGhpcy4kc2NvcGUuTXlDaGVjay5WYWxpZFRpbWVTdGFydCkuZm9ybWF0KFwiWVlZWS1NTS1ERFwiKSArIFwiLVwiICsgbW9tZW50KHRoaXMuJHNjb3BlLk15Q2hlY2suVmFsaWRUaW1lRW5kKS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbChmbGFnPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdkZXRhaWxzLmNsb3NlUG9wdXAnLCBmbGFnKTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ21hY0RldGFpbHNDb250cm9sbGVyJywgbWFjRGV0YWlsc0NvbnRyb2xsZXIpOyJdfQ==
