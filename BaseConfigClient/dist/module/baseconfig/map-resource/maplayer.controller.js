define(["require", "exports", "../../common/app/main.app", "../../../core/enum/MapLayerIcon"], function (require, exports, main_app_1, MapLayerIcon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MaplayerController = (function () {
        function MaplayerController($scope, $timeout) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layerList = [];
            this.resetLayerList();
        }
        MaplayerController.prototype.resetLayerList = function () {
            var _this = this;
            var arr = [];
            var layerMap = angular.copy(MapLayerIcon_1.MapLayerIcon);
            for (var k in layerMap) {
                arr.push(layerMap[k]);
            }
            this.$timeout(function () {
                _this.layerList = arr;
            });
        };
        MaplayerController.$inject = ['$scope', '$timeout'];
        return MaplayerController;
    }());
    main_app_1.app.controller("maplayerController", MaplayerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9tYXAtcmVzb3VyY2UvbWFwbGF5ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUlJLDRCQUFvQixNQUFXLEVBQVUsUUFBYTtZQUFsQyxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUZ0RCxjQUFTLEdBQTRCLEVBQUUsQ0FBQztZQUdwQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDekIsQ0FBQztRQUVELDJDQUFjLEdBQWQ7WUFBQSxpQkFVQztZQVRHLElBQUksR0FBRyxHQUFHLEVBQTZCLENBQUM7WUFDeEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQywyQkFBWSxDQUFDLENBQUM7WUFDMUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN6QixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUM7UUFqQk0sMEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQWtCNUMseUJBQUM7S0FuQkQsQUFtQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9tYXAtcmVzb3VyY2UvbWFwbGF5ZXIuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge01hcExheWVySWNvbiwgTWFwTGF5ZXJJY29uRW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9NYXBMYXllckljb25cIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIE1hcGxheWVyQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0J107XHJcbiAgICBsYXllckxpc3Q6IEFycmF5PE1hcExheWVySWNvbkVudW0+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkdGltZW91dDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yZXNldExheWVyTGlzdCgpXHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRMYXllckxpc3QoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1hcExheWVySWNvbkVudW0+O1xyXG4gICAgICAgIGxldCBsYXllck1hcCA9IGFuZ3VsYXIuY29weShNYXBMYXllckljb24pO1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gbGF5ZXJNYXApIHtcclxuICAgICAgICAgICAgYXJyLnB1c2gobGF5ZXJNYXBba10pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyTGlzdCA9IGFycjtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJtYXBsYXllckNvbnRyb2xsZXJcIiwgTWFwbGF5ZXJDb250cm9sbGVyKTsiXX0=
