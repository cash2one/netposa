define(["require", "exports", "../../common/app/main.app", "../../common/services/resourceRetrieval.service"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var carRecordController = (function () {
        function carRecordController($scope, $timeout, mylayer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.carDetailArchives = $scope.carDetailArchives;
            this.initData($scope.id);
        }
        carRecordController.prototype.initData = function (id) {
            var self = this;
        };
        carRecordController.prototype.closeLayer = function () {
            this.mylayer.close(this.$scope.index);
        };
        carRecordController.$inject = ["$scope", "$timeout", "mylayer", "resourceRetrievalService"];
        return carRecordController;
    }());
    main_app_1.app.controller("carRecordController", carRecordController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZGV0YWlsUG9wdXAvY2FyUmVjb3JkUG9wdXAvY2FyUmVjb3JkUG9wdXAuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnQkE7UUFJSSw2QkFBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixPQUFZO1lBRlosV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixZQUFPLEdBQVAsT0FBTyxDQUFLO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUdPLHNDQUFRLEdBQWhCLFVBQWlCLEVBQVU7WUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFFTSx3Q0FBVSxHQUFqQjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQWpCTSwyQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQWtCbkYsMEJBQUM7S0FuQkQsQUFtQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMscUJBQXFCLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvZGV0YWlsUG9wdXAvY2FyUmVjb3JkUG9wdXAvY2FyUmVjb3JkUG9wdXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Jlc291cmNlUmV0cmlldmFsLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lSZXNvdXJjZVJldHJpZXZhbFNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yZXNvdXJjZVJldHJpZXZhbC5zZXJ2aWNlJztcclxuXHJcbi8vIOWPguaVsFxyXG5pbnRlcmZhY2UgQ2FyRGV0YWlsQXJjaGl2ZXMge1xyXG4gICAgW3Byb3BOYW1lOiBzdHJpbmddOiBhbnk7XHJcbn1cclxuXHJcbmludGVyZmFjZSBzd2ljaFRpdGxlIHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBpY29uUGF0aDogc3RyaW5nO1xyXG59XHJcblxyXG5jbGFzcyBjYXJSZWNvcmRDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCJteWxheWVyXCIsIFwicmVzb3VyY2VSZXRyaWV2YWxTZXJ2aWNlXCJdO1xyXG4gICAgY2FyRGV0YWlsQXJjaGl2ZXM6IENhckRldGFpbEFyY2hpdmVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIG15bGF5ZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2FyRGV0YWlsQXJjaGl2ZXMgPSAkc2NvcGUuY2FyRGV0YWlsQXJjaGl2ZXM7XHJcbiAgICAgICAgdGhpcy5pbml0RGF0YSgkc2NvcGUuaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOWIneWni+WMluafpeivouaVsOaNrlxyXG4gICAgcHJpdmF0ZSBpbml0RGF0YShpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZUxheWVyKCkge1xyXG4gICAgICAgIHRoaXMubXlsYXllci5jbG9zZSh0aGlzLiRzY29wZS5pbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiY2FyUmVjb3JkQ29udHJvbGxlclwiLCBjYXJSZWNvcmRDb250cm9sbGVyKTsiXX0=
