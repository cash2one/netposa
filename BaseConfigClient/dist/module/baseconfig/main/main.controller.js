define(["require", "exports", "../../common/app/main.app", "../../common/router/router.service", "angular", "css!module/baseconfig/css/baseconfig.css"], function (require, exports, main_app_1, router_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigMainController = (function () {
        function BaseConfigMainController($scope, $state) {
            this.$state = $state;
            var vm = this;
            var moduleItems = router_service_1.default.getInstance().getModuleItemsWithGroup('baseconfig');
            var others = [];
            var i, len;
            for (i = 0, len = moduleItems.length; i < len; i++) {
                if (!moduleItems[i].children) {
                    others = others.concat(moduleItems.splice(i, 1));
                    i--;
                    len--;
                }
            }
            vm.others = others;
            vm.moduleItems = moduleItems;
            vm.currentRouter = $state.$current.name;
            vm.isCollapse = false;
        }
        BaseConfigMainController.prototype.resetItems = function (list) {
        };
        BaseConfigMainController.$inject = ['$scope', '$state'];
        return BaseConfigMainController;
    }());
    main_app_1.app.controller('baseConfigMainController', BaseConfigMainController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9tYWluL21haW4uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFXQTtRQVVJLGtDQUFZLE1BQVcsRUFBVSxNQUFXO1lBQVgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUN4QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7WUFDZCxJQUFJLFdBQVcsR0FBRyx3QkFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BGLElBQUksTUFBTSxHQUF5QixFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDO1lBQ1gsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELENBQUMsRUFBRSxDQUFDO29CQUNKLEdBQUcsRUFBRSxDQUFDO2dCQUNWLENBQUM7WUFDTCxDQUFDO1lBQ0QsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDbkIsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7WUFDN0IsRUFBRSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUN4QyxFQUFFLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO1FBRU8sNkNBQVUsR0FBbEIsVUFBbUIsSUFBMEI7UUFFN0MsQ0FBQztRQTdCTSxnQ0FBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQThCekQsK0JBQUM7S0EvQkQsQUErQkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9tYWluL21haW4uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIzLlxyXG4gKi9cclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhbW9kdWxlL2Jhc2Vjb25maWcvY3NzL2Jhc2Vjb25maWcuY3NzJztcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuaW1wb3J0IHJvdXRlclNlcnZpY2UgZnJvbSAnLi4vLi4vY29tbW9uL3JvdXRlci9yb3V0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7SVJvdXRlckNvbmZpZ30gZnJvbSBcIi4uLy4uL2NvbW1vbi9yb3V0ZXIvcm91dGVyXCI7XHJcblxyXG5jbGFzcyBCYXNlQ29uZmlnTWFpbkNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckc3RhdGUnXTtcclxuXHJcbiAgICBtb2R1bGVJdGVtczogQXJyYXk8YW55PjtcclxuICAgIG90aGVyczogQXJyYXk8YW55PjtcclxuICAgIGlzQ29sbGFwc2U6IGJvb2xlYW47XHJcbiAgICB0ZXN0SXRlbXM6IGFueTtcclxuICAgIGN1cnJlbnRSb3V0ZXI6IHN0cmluZztcclxuICAgIGV4cGFuZGVyVGl0bGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IGFueSwgcHJpdmF0ZSAkc3RhdGU6IGFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcbiAgICAgICAgbGV0IG1vZHVsZUl0ZW1zID0gcm91dGVyU2VydmljZS5nZXRJbnN0YW5jZSgpLmdldE1vZHVsZUl0ZW1zV2l0aEdyb3VwKCdiYXNlY29uZmlnJyk7XHJcbiAgICAgICAgbGV0IG90aGVyczogQXJyYXk8SVJvdXRlckNvbmZpZz4gPSBbXTtcclxuICAgICAgICBsZXQgaSwgbGVuO1xyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IG1vZHVsZUl0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9kdWxlSXRlbXNbaV0uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIG90aGVycyA9IG90aGVycy5jb25jYXQobW9kdWxlSXRlbXMuc3BsaWNlKGksIDEpKTtcclxuICAgICAgICAgICAgICAgIGktLTtcclxuICAgICAgICAgICAgICAgIGxlbi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZtLm90aGVycyA9IG90aGVycztcclxuICAgICAgICB2bS5tb2R1bGVJdGVtcyA9IG1vZHVsZUl0ZW1zO1xyXG4gICAgICAgIHZtLmN1cnJlbnRSb3V0ZXIgPSAkc3RhdGUuJGN1cnJlbnQubmFtZTtcclxuICAgICAgICB2bS5pc0NvbGxhcHNlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldEl0ZW1zKGxpc3Q6IEFycmF5PElSb3V0ZXJDb25maWc+KSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcignYmFzZUNvbmZpZ01haW5Db250cm9sbGVyJywgQmFzZUNvbmZpZ01haW5Db250cm9sbGVyKTsiXX0=
