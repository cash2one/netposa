define(["require", "exports", "../../common/app/main.app", "css!./mac.popup.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacPopupController = (function () {
        function MacPopupController($scope) {
            this.$scope = $scope;
            this.traceData = $scope.traceData;
            console.log($scope.traceData);
        }
        MacPopupController.$inject = ['$scope'];
        return MacPopupController;
    }());
    main_app_1.app.controller('MacPopupController', MacPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNUcmFja1BvcHVwL21hYy5wb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBR0ksNEJBQW9CLE1BQVU7WUFBVixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNqQyxDQUFDO1FBTE0sMEJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBTWhDLHlCQUFDO0tBUEQsQUFPQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBQyxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY1RyYWNrUG9wdXAvbWFjLnBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2NzcyEuL21hYy5wb3B1cC5jc3MnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9GYWNlVHJhY2tFbnVtXCI7XHJcbmNsYXNzIE1hY1BvcHVwQ29udHJvbGxlcntcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnXTtcclxuICAgIHRyYWNlRGF0YTpSZXN1bHQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTphbnkpe1xyXG4gICAgICAgIHRoaXMudHJhY2VEYXRhID0gJHNjb3BlLnRyYWNlRGF0YTtcclxuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudHJhY2VEYXRhKVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignTWFjUG9wdXBDb250cm9sbGVyJyxNYWNQb3B1cENvbnRyb2xsZXIpOyJdfQ==
