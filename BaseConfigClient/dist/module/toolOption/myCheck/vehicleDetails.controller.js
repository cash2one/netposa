define(["require", "exports", "../../common/app/main.app", "moment"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CarForColor = [
        { value: '0', text: '白色' },
        { value: '1', text: '黄色' },
        { value: '2', text: '蓝色' },
        { value: '3', text: '黑色' },
        { value: '101', text: '绿色' },
        { value: '4', text: '其他' },
    ];
    var vehicleDetailsController = (function () {
        function vehicleDetailsController($scope) {
            this.$scope = $scope;
            this.CarForColor = CarForColor;
            this.AuditStatusMap = $scope.AuditStatusMap;
            this.TaskTypeMap = $scope.TaskTypeMap;
            this.TaskStatusMap = $scope.TaskStatusMap;
            this.MyCheck = this.$scope.MyCheck;
            this.MyTaskModel = $scope.MyTaskModel;
            this.validTime = moment(this.$scope.MyCheck.ValidTimeStart).format("YYYY-MM-DD") + "-" + moment(this.$scope.MyCheck.ValidTimeEnd).format("YYYY-MM-DD");
        }
        vehicleDetailsController.prototype.cancel = function (flag) {
            this.$scope.$emit('details.closePopup', flag);
        };
        vehicleDetailsController.$inject = ['$scope'];
        return vehicleDetailsController;
    }());
    exports.vehicleDetailsController = vehicleDetailsController;
    main_app_1.app.controller('vehicleDetailsController', vehicleDetailsController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teUNoZWNrL3ZlaGljbGVEZXRhaWxzLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBT0EsSUFBTSxXQUFXLEdBQWdCO1FBQzdCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ3hCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ3hCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ3hCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ3hCLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQzFCLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO0tBQzNCLENBQUM7SUFHRjtRQVVJLGtDQUFvQixNQUFXO1lBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUgvQixnQkFBVyxHQUFnQixXQUFXLENBQUM7WUFJbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNKLENBQUM7UUFFRCx5Q0FBTSxHQUFOLFVBQU8sSUFBYztZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBcEJNLGdDQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQXFCaEMsK0JBQUM7S0F0QkQsQUFzQkMsSUFBQTtJQXRCWSw0REFBd0I7SUF3QnJDLGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdG9vbE9wdGlvbi9teUNoZWNrL3ZlaGljbGVEZXRhaWxzLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoZWNrVGFza01vZGVsLCBNeUNoZWNrRGV0YWlsc1BhcmFtc30gZnJvbSBcIi4vZGV0YWlscy5jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0VudW19IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vRW51bVwiO1xyXG5pbXBvcnQgJ21vbWVudCdcclxuXHJcbmRlY2xhcmUgbGV0IG1vbWVudDogYW55O1xyXG5cclxuY29uc3QgQ2FyRm9yQ29sb3I6IEFycmF5PEVudW0+ID0gW1xyXG4gICAge3ZhbHVlOiAnMCcsIHRleHQ6ICfnmb3oibInfSxcclxuICAgIHt2YWx1ZTogJzEnLCB0ZXh0OiAn6buE6ImyJ30sXHJcbiAgICB7dmFsdWU6ICcyJywgdGV4dDogJ+iTneiJsid9LFxyXG4gICAge3ZhbHVlOiAnMycsIHRleHQ6ICfpu5HoibInfSxcclxuICAgIHt2YWx1ZTogJzEwMScsIHRleHQ6ICfnu7/oibInfSxcclxuICAgIHt2YWx1ZTogJzQnLCB0ZXh0OiAn5YW25LuWJ30sXHJcbl07XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIHZlaGljbGVEZXRhaWxzQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcbiAgICBNeUNoZWNrOiBNeUNoZWNrRGV0YWlsc1BhcmFtcztcclxuICAgIHZhbGlkVGltZTogc3RyaW5nO1xyXG4gICAgQXVkaXRTdGF0dXNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBUYXNrVHlwZU1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICAgIFRhc2tTdGF0dXNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICBDYXJGb3JDb2xvcjogQXJyYXk8RW51bT4gPSBDYXJGb3JDb2xvcjtcclxuICAgIE15VGFza01vZGVsOiBDaGVja1Rhc2tNb2RlbDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5BdWRpdFN0YXR1c01hcCA9ICRzY29wZS5BdWRpdFN0YXR1c01hcDtcclxuICAgICAgICB0aGlzLlRhc2tUeXBlTWFwID0gJHNjb3BlLlRhc2tUeXBlTWFwO1xyXG4gICAgICAgIHRoaXMuVGFza1N0YXR1c01hcCA9ICRzY29wZS5UYXNrU3RhdHVzTWFwO1xyXG4gICAgICAgIHRoaXMuTXlDaGVjayA9IHRoaXMuJHNjb3BlLk15Q2hlY2s7XHJcbiAgICAgICAgdGhpcy5NeVRhc2tNb2RlbCA9ICRzY29wZS5NeVRhc2tNb2RlbDtcclxuICAgICAgICB0aGlzLnZhbGlkVGltZSA9IG1vbWVudCh0aGlzLiRzY29wZS5NeUNoZWNrLlZhbGlkVGltZVN0YXJ0KS5mb3JtYXQoXCJZWVlZLU1NLUREXCIpICsgXCItXCIgKyBtb21lbnQodGhpcy4kc2NvcGUuTXlDaGVjay5WYWxpZFRpbWVFbmQpLmZvcm1hdChcIllZWVktTU0tRERcIik7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldGFpbHMuY2xvc2VQb3B1cCcsIGZsYWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcigndmVoaWNsZURldGFpbHNDb250cm9sbGVyJywgdmVoaWNsZURldGFpbHNDb250cm9sbGVyKTsiXX0=
