define(["require", "exports", "text!./layout.directive.button.html", "../../app/main.app", "css!./layout.button.css"], function (require, exports, layoutDirectiveButtonHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LayoutToggleTypeEnum = {
        expand: "expand",
        unExpand: "unExpand"
    };
    var LayoutPositionTypeEnum = {
        left: "left",
        right: "right",
        top: "top",
        bottom: "bottom"
    };
    var LayoutContainerDirective = (function () {
        function LayoutContainerDirective() {
            this.scope = {};
            this.controllerAs = "layoutContainerCtrl";
            this.controller = function ($scope) {
                var vm = this;
                var _cacheContentScope;
                $scope.$on("$destroy", function () {
                    console.log("销毁LayoutContainerDirective");
                    _cacheContentScope = null;
                });
                vm.initContent = initContent;
                vm.toggle = toggle;
                function initContent(scope) {
                    _cacheContentScope = scope;
                }
                function toggle(toggleType, position) {
                    if (_cacheContentScope) {
                        if (toggleType === LayoutToggleTypeEnum.expand) {
                            _cacheContentScope.toggle(LayoutToggleTypeEnum.unExpand, position);
                        }
                        else if (toggleType === LayoutToggleTypeEnum.unExpand) {
                            _cacheContentScope.toggle(LayoutToggleTypeEnum.expand, position);
                        }
                        else {
                            console.error("toggle.toggleType param is not match!");
                        }
                    }
                }
            };
        }
        LayoutContainerDirective.$inject = ['$scope'];
        LayoutContainerDirective.instance = function () {
            return new LayoutContainerDirective();
        };
        return LayoutContainerDirective;
    }());
    var LayoutButtonDirective = (function () {
        function LayoutButtonDirective() {
            this.restrict = "A";
            this.scope = {
                layoutPosition: '@',
                defaultStatus: '@',
            };
            this.require = '^utilLayoutContainer';
            this.controller = function ($scope, $compile, $timeout) {
                $scope.$compile = $compile;
                $scope.$timeout = $timeout;
            };
            this.controllerAs = "layoutButtonDirectiveCtrl";
            this.link = function (scope, element, attrs, controller) {
                _init();
                scope.change = change;
                scope.$timeout(function () {
                    controller.toggle(scope.defaultStatus, scope.layoutPosition);
                });
                function _init() {
                    element.addClass("u-layout-button-mn");
                    element.append(scope.$compile(layoutDirectiveButtonHtml)(scope));
                    scope.$timeout(function () {
                        _changeSelfContainer(scope.defaultStatus, scope.layoutPosition);
                    });
                }
                function change() {
                    if (scope.defaultStatus === LayoutToggleTypeEnum.expand) {
                        scope.defaultStatus = LayoutToggleTypeEnum.unExpand;
                    }
                    else {
                        scope.defaultStatus = LayoutToggleTypeEnum.expand;
                    }
                    _changeSelfContainer(scope.defaultStatus, scope.layoutPosition);
                    controller.toggle(scope.defaultStatus, scope.layoutPosition);
                }
                function _changeSelfContainer(status, position) {
                    switch (status) {
                        case LayoutToggleTypeEnum.expand:
                            element.removeClass("z-" + position + "-hide");
                            element.children(".u-layout-button").removeClass("z-" + position + "-hide");
                            break;
                        case LayoutToggleTypeEnum.unExpand:
                            element.addClass("z-" + position + "-hide");
                            element.children(".u-layout-button").addClass("z-" + position + "-hide");
                            break;
                        default:
                            console.error("default-status params value is not match!");
                            break;
                    }
                }
            };
        }
        LayoutButtonDirective.$inject = ['$scope', '$compile', '$timeout'];
        LayoutButtonDirective.instance = function () {
            return new LayoutButtonDirective();
        };
        return LayoutButtonDirective;
    }());
    var LayoutContentDirective = (function () {
        function LayoutContentDirective() {
            this.restrict = "A";
            this.scope = {};
            this.require = '^utilLayoutContainer';
            this.link = function (scope, element, attrs, controller) {
                element.addClass("u-layout-content");
                scope.toggle = toggle;
                controller.initContent(scope);
                function toggle(toggleType, positionType) {
                    console.log("content.toggle", toggleType, positionType, "z-" + positionType + "-show");
                    if (toggleType === LayoutToggleTypeEnum.expand) {
                        element.addClass("z-" + positionType + "-show");
                    }
                    else {
                        element.removeClass("z-" + positionType + "-show");
                    }
                }
            };
        }
        LayoutContentDirective.$inject = ['$scope'];
        LayoutContentDirective.instance = function () {
            return new LayoutContentDirective();
        };
        return LayoutContentDirective;
    }());
    main_app_1.app.directive("utilLayoutContainer", LayoutContainerDirective.instance);
    main_app_1.app.directive("utilLayoutButton", LayoutButtonDirective.instance);
    main_app_1.app.directive("utilLayoutContent", LayoutContentDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9sYXlvdXQvbGF5b3V0LmJ1dHRvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0EsSUFBTSxvQkFBb0IsR0FBRztRQUN6QixNQUFNLEVBQUUsUUFBUTtRQUNoQixRQUFRLEVBQUUsVUFBVTtLQUN2QixDQUFDO0lBRUYsSUFBTSxzQkFBc0IsR0FBRztRQUMzQixJQUFJLEVBQUUsTUFBTTtRQUNaLEtBQUssRUFBRSxPQUFPO1FBQ2QsR0FBRyxFQUFFLEtBQUs7UUFDVixNQUFNLEVBQUUsUUFBUTtLQUNuQixDQUFDO0lBRUY7UUFBQTtZQVVJLFVBQUssR0FBRyxFQUFFLENBQUM7WUFDWCxpQkFBWSxHQUFHLHFCQUFxQixDQUFDO1lBQ3JDLGVBQVUsR0FBRyxVQUFTLE1BQVc7Z0JBQzdCLElBQUksRUFBRSxHQUFHLElBQWdDLENBQUM7Z0JBQzFDLElBQUksa0JBQTBDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO29CQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7b0JBQzFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUVuQixxQkFBcUIsS0FBNkI7b0JBQzlDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztnQkFDL0IsQ0FBQztnQkFNRCxnQkFBZ0IsVUFBa0IsRUFBRSxRQUFnQjtvQkFDaEQsRUFBRSxDQUFBLENBQUMsa0JBQWtCLENBQUMsQ0FBQSxDQUFDO3dCQUVuQixFQUFFLENBQUEsQ0FBQyxVQUFVLEtBQUssb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQzs0QkFDM0Msa0JBQWtCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFFBQVEs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R0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEYsRUFBRSxDQUFBLENBQUMsVUFBVSxLQUFLLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7d0JBQzNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFDLFlBQVksR0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDaEQsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFDRixPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksR0FBQyxZQUFZLEdBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ25ELENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQTtRQUNMLENBQUM7UUF2QlUsOEJBQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLCtCQUFRLEdBQUc7WUFDZCxNQUFNLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQztRQW9CTiw2QkFBQztLQXhCRCxBQXdCQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxjQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pFLGNBQUcsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvbGF5b3V0L2xheW91dC5idXR0b24uZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2xheW91dC5kaXJlY3RpdmUuYnV0dG9uLmh0bWxcIiBuYW1lPSdsYXlvdXREaXJlY3RpdmVCdXR0b25IdG1sJyAvPlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgXCJjc3MhLi9sYXlvdXQuYnV0dG9uLmNzc1wiO1xyXG5kZWNsYXJlIHZhciBsYXlvdXREaXJlY3RpdmVCdXR0b25IdG1sOmFueTtcclxuXHJcbi8qKlxyXG4gKiBsYXlvdXTluIPlsYDmjIfku6QsIOS4u+imgeeUqOS6juaMiemSruaMh+S7pOinpuWPkeWQjiwg6IGU5Yqo5YW25LuW5a+55bqU55qEY29udGVudOi/m+ihjOeKtuaAgeeahOWPmOWMllxyXG4gKi9cclxuXHJcbmNvbnN0IExheW91dFRvZ2dsZVR5cGVFbnVtID0ge1xyXG4gICAgZXhwYW5kOiBcImV4cGFuZFwiLCAvLyDlsZXlvIBcclxuICAgIHVuRXhwYW5kOiBcInVuRXhwYW5kXCIgLy8g5pS26LW3XHJcbn07XHJcblxyXG5jb25zdCBMYXlvdXRQb3NpdGlvblR5cGVFbnVtID0ge1xyXG4gICAgbGVmdDogXCJsZWZ0XCIsIC8vIOW3puS+p1xyXG4gICAgcmlnaHQ6IFwicmlnaHRcIiwgLy8g5Y+z5L6nXHJcbiAgICB0b3A6IFwidG9wXCIsIC8vIOS4iuaWuVxyXG4gICAgYm90dG9tOiBcImJvdHRvbVwiIC8vIOS4i+aWuVxyXG59O1xyXG5cclxuY2xhc3MgTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZle1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMYXlvdXRDb250YWluZXJEaXJlY3RpdmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgaW5pdENvbnRlbnQ6IEZ1bmN0aW9uO1xyXG4gICAgdG9nZ2xlOiAodG9nZ2xlVHlwZTogc3RyaW5nLCBwb3NpdGlvbjogc3RyaW5nKT0+dm9pZDtcclxuXHJcbiAgICBzY29wZSA9IHt9O1xyXG4gICAgY29udHJvbGxlckFzID0gXCJsYXlvdXRDb250YWluZXJDdHJsXCI7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlOiBhbnkpe1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXMgYXMgTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZlO1xyXG4gICAgICAgIGxldCBfY2FjaGVDb250ZW50U2NvcGU6IExheW91dENvbnRlbnREaXJlY3RpdmU7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZSA5q+BTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZlXCIpO1xyXG4gICAgICAgICAgICBfY2FjaGVDb250ZW50U2NvcGUgPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZtLmluaXRDb250ZW50ID0gaW5pdENvbnRlbnQ7XHJcbiAgICAgICAgdm0udG9nZ2xlID0gdG9nZ2xlO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0Q29udGVudChzY29wZTogTGF5b3V0Q29udGVudERpcmVjdGl2ZSl7XHJcbiAgICAgICAgICAgIF9jYWNoZUNvbnRlbnRTY29wZSA9IHNjb3BlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5bGV5byA5oiW5pS26LW36Kem5Y+R5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHRvZ2dsZVR5cGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGUodG9nZ2xlVHlwZTogc3RyaW5nLCBwb3NpdGlvbjogc3RyaW5nKXtcclxuICAgICAgICAgICAgaWYoX2NhY2hlQ29udGVudFNjb3BlKXtcclxuICAgICAgICAgICAgICAgIC8vIOS+p+i+ueagjyjmjInpkq4p5bGV5byA5bCx55u45b2T5LqOY29udGVudOaUtue8qSwg5L6n6L655qCPKOaMiemSrinmlLbnvKnlsLHnm7jlvZPkuo5jb250ZW505bGV5byAXHJcbiAgICAgICAgICAgICAgICBpZih0b2dnbGVUeXBlID09PSBMYXlvdXRUb2dnbGVUeXBlRW51bS5leHBhbmQpe1xyXG4gICAgICAgICAgICAgICAgICAgIF9jYWNoZUNvbnRlbnRTY29wZS50b2dnbGUoTGF5b3V0VG9nZ2xlVHlwZUVudW0udW5FeHBhbmQsIHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHRvZ2dsZVR5cGUgPT09IExheW91dFRvZ2dsZVR5cGVFbnVtLnVuRXhwYW5kKXtcclxuICAgICAgICAgICAgICAgICAgICBfY2FjaGVDb250ZW50U2NvcGUudG9nZ2xlKExheW91dFRvZ2dsZVR5cGVFbnVtLmV4cGFuZCwgcG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRvZ2dsZS50b2dnbGVUeXBlIHBhcmFtIGlzIG5vdCBtYXRjaCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICog5biD5bGA5bGV5byA5pS26LW35oyJ6ZKu5oyH5LukXHJcbiAqL1xyXG5cclxuY2xhc3MgTGF5b3V0QnV0dG9uRGlyZWN0aXZle1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJyRjb21waWxlJywnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5b3V0QnV0dG9uRGlyZWN0aXZlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHJlc3RyaWN0ID0gXCJBXCI7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBsYXlvdXRQb3NpdGlvbjogJ0AnLCAvLyDlvZPliY3mjIfku6RsYXlvdXTmiYDlsZ7mlrnkvY0sIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcDtcclxuICAgICAgICBkZWZhdWx0U3RhdHVzOiAnQCcsIC8vIGV4cGFuZGVyLCB1bkV4cGFuZGVyXHJcbiAgICB9O1xyXG4gICAgcmVxdWlyZSA9ICdedXRpbExheW91dENvbnRhaW5lcic7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlOiBhbnksICRjb21waWxlOiBhbnksICR0aW1lb3V0OiBhbnkpe1xyXG4gICAgICAgICRzY29wZS4kY29tcGlsZSA9ICRjb21waWxlO1xyXG4gICAgICAgICRzY29wZS4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgfTtcclxuICAgIGNvbnRyb2xsZXJBcyA9IFwibGF5b3V0QnV0dG9uRGlyZWN0aXZlQ3RybFwiO1xyXG4gICAgbGluayA9IGZ1bmN0aW9uKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY29udHJvbGxlcjogTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZlKXtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyW5qC35byPXHJcbiAgICAgICAgX2luaXQoKTtcclxuICAgICAgICBzY29wZS5jaGFuZ2UgPSBjaGFuZ2U7XHJcbiAgICAgICAgc2NvcGUuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgLy8g5qC55o2u5Yid5aeL5YyW6YWN572u5Li75Yqo5pS55Y+Y5a6e6ZmF5YaF5a655qCP55qE5qC35byPXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIudG9nZ2xlKHNjb3BlLmRlZmF1bHRTdGF0dXMsIHNjb3BlLmxheW91dFBvc2l0aW9uKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gX2luaXQoKXtcclxuICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInUtbGF5b3V0LWJ1dHRvbi1tblwiKTtcclxuICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoc2NvcGUuJGNvbXBpbGUobGF5b3V0RGlyZWN0aXZlQnV0dG9uSHRtbCkoc2NvcGUpKTtcclxuICAgICAgICAgICAgLy8g5YWI5Yid5aeL5YyW5pS55Y+Y6Ieq6Lqr55qE5qC35byPXHJcbiAgICAgICAgICAgIHNjb3BlLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBfY2hhbmdlU2VsZkNvbnRhaW5lcihzY29wZS5kZWZhdWx0U3RhdHVzLCBzY29wZS5sYXlvdXRQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlKCl7XHJcblxyXG4gICAgICAgICAgICBpZihzY29wZS5kZWZhdWx0U3RhdHVzID09PSBMYXlvdXRUb2dnbGVUeXBlRW51bS5leHBhbmQpe1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuZGVmYXVsdFN0YXR1cyA9IExheW91dFRvZ2dsZVR5cGVFbnVtLnVuRXhwYW5kO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmRlZmF1bHRTdGF0dXMgPSBMYXlvdXRUb2dnbGVUeXBlRW51bS5leHBhbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2NoYW5nZVNlbGZDb250YWluZXIoc2NvcGUuZGVmYXVsdFN0YXR1cywgc2NvcGUubGF5b3V0UG9zaXRpb24pO1xyXG4gICAgICAgICAgICBjb250cm9sbGVyLnRvZ2dsZShzY29wZS5kZWZhdWx0U3RhdHVzLCBzY29wZS5sYXlvdXRQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmlLnlj5joh6rouqvmoLflvI9cclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIF9jaGFuZ2VTZWxmQ29udGFpbmVyKHN0YXR1czogc3RyaW5nLCBwb3NpdGlvbjogc3RyaW5nKXtcclxuICAgICAgICAgICAgc3dpdGNoKHN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICBjYXNlIExheW91dFRvZ2dsZVR5cGVFbnVtLmV4cGFuZDpcclxuICAgICAgICAgICAgICAgICAgICAvLyDlsZXlvIDmk43kvZxcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNsYXNzKFwiei1cIiArIHBvc2l0aW9uICsgXCItaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNoaWxkcmVuKFwiLnUtbGF5b3V0LWJ1dHRvblwiKS5yZW1vdmVDbGFzcyhcInotXCIrcG9zaXRpb24rXCItaGlkZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgTGF5b3V0VG9nZ2xlVHlwZUVudW0udW5FeHBhbmQ6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pS26LW35pON5L2cXHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInotXCIgKyBwb3NpdGlvbiArIFwiLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlbihcIi51LWxheW91dC1idXR0b25cIikuYWRkQ2xhc3MoXCJ6LVwiK3Bvc2l0aW9uK1wiLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJkZWZhdWx0LXN0YXR1cyBwYXJhbXMgdmFsdWUgaXMgbm90IG1hdGNoIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59XHJcbmNsYXNzIExheW91dENvbnRlbnREaXJlY3RpdmV7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5b3V0Q29udGVudERpcmVjdGl2ZSgpO1xyXG4gICAgfTtcclxuICAgIHRvZ2dsZTogKHRvZ2dsZVR5cGU6IHN0cmluZywgcG9zaXRpb25UeXBlOiBzdHJpbmcpPT52b2lkO1xyXG4gICAgcmVzdHJpY3QgPSBcIkFcIjtcclxuICAgIHNjb3BlID0ge307XHJcbiAgICByZXF1aXJlID0gJ151dGlsTGF5b3V0Q29udGFpbmVyJztcclxuICAgIGNvbnRyb2xsZXJBczogXCJsYXlvdXRDb250ZW50RGlyZWN0aXZlQ3RybFwiO1xyXG4gICAgbGluayA9IGZ1bmN0aW9uKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSwgY29udHJvbGxlcjogTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZlKXtcclxuICAgICAgICBlbGVtZW50LmFkZENsYXNzKFwidS1sYXlvdXQtY29udGVudFwiKTtcclxuICAgICAgICBzY29wZS50b2dnbGUgPSB0b2dnbGU7XHJcbiAgICAgICAgY29udHJvbGxlci5pbml0Q29udGVudChzY29wZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZSh0b2dnbGVUeXBlOiBzdHJpbmcsIHBvc2l0aW9uVHlwZTogc3RyaW5nKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250ZW50LnRvZ2dsZVwiLCB0b2dnbGVUeXBlLCBwb3NpdGlvblR5cGUsXCJ6LVwiK3Bvc2l0aW9uVHlwZStcIi1zaG93XCIpO1xyXG4gICAgICAgICAgICBpZih0b2dnbGVUeXBlID09PSBMYXlvdXRUb2dnbGVUeXBlRW51bS5leHBhbmQpe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcyhcInotXCIrcG9zaXRpb25UeXBlK1wiLXNob3dcIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcyhcInotXCIrcG9zaXRpb25UeXBlK1wiLXNob3dcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5kaXJlY3RpdmUoXCJ1dGlsTGF5b3V0Q29udGFpbmVyXCIsTGF5b3V0Q29udGFpbmVyRGlyZWN0aXZlLmluc3RhbmNlKTtcclxuYXBwLmRpcmVjdGl2ZShcInV0aWxMYXlvdXRCdXR0b25cIixMYXlvdXRCdXR0b25EaXJlY3RpdmUuaW5zdGFuY2UpO1xyXG5hcHAuZGlyZWN0aXZlKFwidXRpbExheW91dENvbnRlbnRcIixMYXlvdXRDb250ZW50RGlyZWN0aXZlLmluc3RhbmNlKTtcclxuIl19
