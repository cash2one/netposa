define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TechnologyStackMapPopupController = (function () {
        function TechnologyStackMapPopupController($scope) {
            var vm = this;
            vm.buttonName = "按钮名称";
            vm.closePopup = function () {
                $scope.$emit(vm.closeEventName, vm.winId);
            };
            vm.init = function (winId, closeEventName) {
                vm.winId = winId;
                vm.closeEventName = closeEventName;
            };
        }
        TechnologyStackMapPopupController.$inject = ["$scope"];
        return TechnologyStackMapPopupController;
    }());
    main_app_1.app.controller("technologyStackMapPopupController", TechnologyStackMapPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay9tYXAvdGVjaG5vbG9neS5zdGFjay5tYXAucG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFDQTtRQVNJLDJDQUFZLE1BQVc7WUFFbkIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ2QsRUFBRSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDdkIsRUFBRSxDQUFDLFVBQVUsR0FBRztnQkFDWixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLENBQUMsQ0FBQztZQUNGLEVBQUUsQ0FBQyxJQUFJLEdBQUcsVUFBUyxLQUFhLEVBQUUsY0FBc0I7Z0JBQ3BELEVBQUUsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNqQixFQUFFLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztZQUN2QyxDQUFDLENBQUE7UUFDTCxDQUFDO1FBbEJNLHlDQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQW1CaEMsd0NBQUM7S0FyQkQsQUFxQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsbUNBQW1DLEVBQUUsaUNBQWlDLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvdGVjaG5vbG9neS1zdGFjay9tYXAvdGVjaG5vbG9neS5zdGFjay5tYXAucG9wdXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5jbGFzcyBUZWNobm9sb2d5U3RhY2tNYXBQb3B1cENvbnRyb2xsZXJ7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIl07XHJcbiAgICBidXR0b25OYW1lOiBzdHJpbmc7XHJcbiAgICB3aW5JZDpzdHJpbmc7XHJcbiAgICBjbG9zZUV2ZW50TmFtZTpzdHJpbmc7XHJcbiAgICBjbG9zZVBvcHVwOkZ1bmN0aW9uO1xyXG4gICAgaW5pdDood2luSWQ6c3RyaW5nLCBjbG9zZUV2ZW50TmFtZTpzdHJpbmcpPT52b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCRzY29wZTogYW55KXtcclxuXHJcbiAgICAgICAgbGV0IHZtID0gdGhpcztcclxuICAgICAgICB2bS5idXR0b25OYW1lID0gXCLmjInpkq7lkI3np7BcIjtcclxuICAgICAgICB2bS5jbG9zZVBvcHVwID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJHNjb3BlLiRlbWl0KHZtLmNsb3NlRXZlbnROYW1lLCB2bS53aW5JZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2bS5pbml0ID0gZnVuY3Rpb24od2luSWQ6IHN0cmluZywgY2xvc2VFdmVudE5hbWU6IHN0cmluZyl7XHJcbiAgICAgICAgICAgIHZtLndpbklkID0gd2luSWQ7XHJcbiAgICAgICAgICAgIHZtLmNsb3NlRXZlbnROYW1lID0gY2xvc2VFdmVudE5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcInRlY2hub2xvZ3lTdGFja01hcFBvcHVwQ29udHJvbGxlclwiLCBUZWNobm9sb2d5U3RhY2tNYXBQb3B1cENvbnRyb2xsZXIpOyJdfQ==
