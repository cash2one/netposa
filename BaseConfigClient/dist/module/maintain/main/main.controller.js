define(["require", "exports", "../../common/app/main.app", "../../common/router/router.service", "css!../css/maintain.css"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MainTainController = (function () {
        function MainTainController($scope, $state) {
            this.$scope = $scope;
            this.$state = $state;
            var moduleItems = router_service_1.default.getInstance().getModuleItemsWithGroup('maintain');
            var others = [];
            var i, len;
            for (i = 0, len = moduleItems.length; i < len; i++) {
                if (!moduleItems[i].children) {
                    others = others.concat(moduleItems.splice(i, 1));
                    i--;
                    len--;
                }
            }
            this.others = others;
            this.moduleItems = moduleItems;
            this.currentRouter = this.$state.$current.name;
            this.isCollapse = false;
            $scope.isCollapse = this.isCollapse;
        }
        MainTainController.prototype.initPage = function () {
            this.$scope.$broadcast('initChart', true);
        };
        MainTainController.$inject = ['$scope', '$state'];
        return MainTainController;
    }());
    main_app_1.app.controller('maintainController', MainTainController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vbWFpbi9tYWluLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBUUE7UUFRSSw0QkFDWSxNQUFXLEVBQ1gsTUFBVztZQURYLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ25CLElBQUksV0FBVyxHQUFHLHdCQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFJbEYsSUFBSSxNQUFNLEdBQXlCLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDWCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsQ0FBQyxFQUFFLENBQUM7b0JBQ0osR0FBRyxFQUFFLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFLeEMsQ0FBQztRQUNNLHFDQUFRLEdBQWY7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDN0MsQ0FBQztRQW5DTSwwQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBb0MxQyx5QkFBQztLQXJDRCxBQXFDQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYWludGFpbi9tYWluL21haW4uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy80LzI0LlxyXG4gKi9cclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9tYWludGFpbi5jc3NcIjtcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgSVJvdXRlckNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vcm91dGVyL3JvdXRlclwiO1xyXG5pbXBvcnQgUm91dGVyU2VydmljZSBmcm9tIFwiLi4vLi4vY29tbW9uL3JvdXRlci9yb3V0ZXIuc2VydmljZVwiO1xyXG5cclxuY2xhc3MgTWFpblRhaW5Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgbW9kdWxlSXRlbXM6IEFycmF5PGFueT47XHJcbiAgICBvdGhlcnM6IEFycmF5PGFueT47XHJcbiAgICBpc0NvbGxhcHNlOiBib29sZWFuO1xyXG4gICAgY3VycmVudFJvdXRlcjogc3RyaW5nO1xyXG4gICAgZXhwYW5kZXJUaXRsZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICRzdGF0ZTogYW55KSB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUl0ZW1zID0gUm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zV2l0aEdyb3VwKCdtYWludGFpbicpO1xyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2R1bGVJdGVtcyk7XHJcbiAgICAgICAgLy8g5Y+W5Ye65LiN5YyF5ZCrY2hpbGRyZW7nmoRcclxuICAgICAgICBsZXQgb3RoZXJzOiBBcnJheTxJUm91dGVyQ29uZmlnPiA9IFtdO1xyXG4gICAgICAgIGxldCBpLCBsZW47XHJcbiAgICAgICAgZm9yIChpID0gMCwgbGVuID0gbW9kdWxlSXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFtb2R1bGVJdGVtc1tpXS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgb3RoZXJzID0gb3RoZXJzLmNvbmNhdChtb2R1bGVJdGVtcy5zcGxpY2UoaSwgMSkpO1xyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICAgICAgbGVuLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vdGhlcnMgPSBvdGhlcnM7XHJcbiAgICAgICAgdGhpcy5tb2R1bGVJdGVtcyA9IG1vZHVsZUl0ZW1zO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFJvdXRlciA9IHRoaXMuJHN0YXRlLiRjdXJyZW50Lm5hbWU7XHJcbiAgICAgICAgdGhpcy5pc0NvbGxhcHNlID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2UgPSB0aGlzLmlzQ29sbGFwc2U7XHJcblxyXG4gICAgICAgIC8vICRzY29wZS4kd2F0Y2goJ2lzQ29sbGFwc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5pdFBhZ2UoKTtcclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG4gICAgcHVibGljIGluaXRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRicm9hZGNhc3QoJ2luaXRDaGFydCcsIHRydWUpXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdtYWludGFpbkNvbnRyb2xsZXInLCBNYWluVGFpbkNvbnRyb2xsZXIpOyJdfQ==
