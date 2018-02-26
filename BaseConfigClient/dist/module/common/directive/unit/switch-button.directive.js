define(["require", "exports", "../../app/main.app", "angular", "css!./switch-button"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var switchButtonDirective = (function () {
        function switchButtonDirective() {
            this.restrict = 'AE';
            this.require = "^ngModel";
            this.scope = {
                disabled: '=',
                changeStatus: '&'
            };
            this.controllerAs = "switchButtonDirective";
            this.template = function (element, attrs) {
                return "\n            <i class=\"switch " + (attrs.class ? ' ' + attrs.class : '') + "\" \n            ng-class=\"{checked:ngModelValue, disabled:" + attrs.disabled + "}\"\n            ng-click=\"changeVal($event)\">\n                <small></small>\n                <input style=\"visibility: hidden\" type=\"checkbox\" ng-checked=\"ngModelValue\" name=\"" + (attrs.name ? attrs.name : '') + "\"\n            </i>\n        ";
            };
            this.controller = function ($scope, $timeout) {
                $scope.changeVal = function () {
                    if ($scope.disabled !== true) {
                        $scope.ngModelValue = !$scope.ngModelValue;
                        $scope.ngModelController.$setViewValue($scope.ngModelValue);
                        if ($scope.changeStatus) {
                            $timeout(function () {
                                $scope.changeStatus({ checked: $scope.ngModelValue });
                            });
                        }
                    }
                };
            };
            this.link = function (scope, element, attrs, controller) {
                scope.ngModelController = controller;
                scope.ngModelController.$parsers.push(function (viewValue) {
                    return viewValue;
                });
                scope.ngModelController.$formatters.push(function (modelValue) {
                    scope.ngModelValue = modelValue;
                    return modelValue;
                });
                scope.$on('$destory', function () {
                    scope.ngModelController = null;
                });
            };
        }
        switchButtonDirective.instance = function () {
            return new switchButtonDirective();
        };
        switchButtonDirective.$inject = ['$scope', '$timeout'];
        return switchButtonDirective;
    }());
    main_app_1.app
        .directive('switchButton', switchButtonDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0L3N3aXRjaC1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU9BO1FBR0k7WUFPQSxhQUFRLEdBQVcsSUFBSSxDQUFDO1lBRXhCLFlBQU8sR0FBRyxVQUFVLENBQUM7WUFDckIsVUFBSyxHQUFRO2dCQUNULFFBQVEsRUFBRSxHQUFHO2dCQUNiLFlBQVksRUFBQyxHQUFHO2FBQ25CLENBQUM7WUFDRixpQkFBWSxHQUFHLHVCQUF1QixDQUFDO1lBRXZDLGFBQVEsR0FBRyxVQUFDLE9BQVksRUFBRSxLQUFVO2dCQUNoQyxNQUFNLENBQUMsc0NBQ2dCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLHFFQUNYLEtBQUssQ0FBQyxRQUFRLHFNQUc4QixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLG9DQUV2SCxDQUFDO1lBQ04sQ0FBQyxDQUFDO1lBQ0YsZUFBVSxHQUFHLFVBQUMsTUFBVSxFQUFDLFFBQVk7Z0JBQ2pDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7b0JBQ2YsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQSxDQUFDO3dCQUN6QixNQUFNLENBQUMsWUFBWSxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzt3QkFDM0MsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQzVELEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQSxDQUFDOzRCQUNwQixRQUFRLENBQUM7Z0NBQ0wsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQTs0QkFDdkQsQ0FBQyxDQUFDLENBQUE7d0JBQ04sQ0FBQztvQkFDTCxDQUFDO2dCQUNMLENBQUMsQ0FBQztZQUNOLENBQUMsQ0FBQztZQUNGLFNBQUksR0FBRyxVQUFDLEtBQVUsRUFBRSxPQUFZLEVBQUUsS0FBVSxFQUFFLFVBQWU7Z0JBQ3pELEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVMsU0FBaUI7b0JBQzVELE1BQU0sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBa0I7b0JBQ3hELEtBQUssQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO29CQUNoQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBQztvQkFDakIsS0FBSyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQTtnQkFDbEMsQ0FBQyxDQUFDLENBQUE7WUFDTixDQUFDLENBQUE7UUFsREQsQ0FBQztRQUVNLDhCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFQTSw2QkFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQXVEM0QsNEJBQUM7S0F4REQsQUF3REMsSUFBQTtJQUVELGNBQUc7U0FDRSxTQUFTLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUM3RCIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0L3N3aXRjaC1idXR0b24uZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCBcImNzcyEuL3N3aXRjaC1idXR0b25cIjtcclxuXHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuZGVjbGFyZSBsZXQgd2luZG93OiBhbnk7XHJcblxyXG5jbGFzcyBzd2l0Y2hCdXR0b25EaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRzY29wZScsICckdGltZW91dCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IHN3aXRjaEJ1dHRvbkRpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnQUUnO1xyXG4gICAgcmVwbGFjZTogdHJ1ZTtcclxuICAgIHJlcXVpcmUgPSBcIl5uZ01vZGVsXCI7XHJcbiAgICBzY29wZTogYW55ID0ge1xyXG4gICAgICAgIGRpc2FibGVkOiAnPScsXHJcbiAgICAgICAgY2hhbmdlU3RhdHVzOicmJ1xyXG4gICAgfTtcclxuICAgIGNvbnRyb2xsZXJBcyA9IFwic3dpdGNoQnV0dG9uRGlyZWN0aXZlXCI7XHJcbiAgICB0cmFuc2NsdWRlOiBmYWxzZTtcclxuICAgIHRlbXBsYXRlID0gKGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwic3dpdGNoICR7YXR0cnMuY2xhc3MgPyAnICcgKyBhdHRycy5jbGFzcyA6ICcnfVwiIFxyXG4gICAgICAgICAgICBuZy1jbGFzcz1cIntjaGVja2VkOm5nTW9kZWxWYWx1ZSwgZGlzYWJsZWQ6JHthdHRycy5kaXNhYmxlZH19XCJcclxuICAgICAgICAgICAgbmctY2xpY2s9XCJjaGFuZ2VWYWwoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPHNtYWxsPjwvc21hbGw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJ2aXNpYmlsaXR5OiBoaWRkZW5cIiB0eXBlPVwiY2hlY2tib3hcIiBuZy1jaGVja2VkPVwibmdNb2RlbFZhbHVlXCIgbmFtZT1cIiR7YXR0cnMubmFtZSA/IGF0dHJzLm5hbWUgOiAnJ31cIlxyXG4gICAgICAgICAgICA8L2k+XHJcbiAgICAgICAgYDtcclxuICAgIH07XHJcbiAgICBjb250cm9sbGVyID0gKCRzY29wZTphbnksJHRpbWVvdXQ6YW55KT0+e1xyXG4gICAgICAgICRzY29wZS5jaGFuZ2VWYWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCRzY29wZS5kaXNhYmxlZCAhPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmdNb2RlbFZhbHVlID0gISRzY29wZS5uZ01vZGVsVmFsdWU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmdNb2RlbENvbnRyb2xsZXIuJHNldFZpZXdWYWx1ZSgkc2NvcGUubmdNb2RlbFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmKCRzY29wZS5jaGFuZ2VTdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGFuZ2VTdGF0dXMoe2NoZWNrZWQ6JHNjb3BlLm5nTW9kZWxWYWx1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIGxpbmsgPSAoc2NvcGU6IGFueSwgZWxlbWVudDogYW55LCBhdHRyczogYW55LCBjb250cm9sbGVyOiBhbnkpID0+IHtcclxuICAgICAgICBzY29wZS5uZ01vZGVsQ29udHJvbGxlciA9IGNvbnRyb2xsZXI7XHJcbiAgICAgICAgc2NvcGUubmdNb2RlbENvbnRyb2xsZXIuJHBhcnNlcnMucHVzaChmdW5jdGlvbih2aWV3VmFsdWU6IHN0cmluZyl7XHJcbiAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcGUubmdNb2RlbENvbnRyb2xsZXIuJGZvcm1hdHRlcnMucHVzaCgobW9kZWxWYWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHNjb3BlLm5nTW9kZWxWYWx1ZSA9IG1vZGVsVmFsdWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2RlbFZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNjb3BlLiRvbignJGRlc3RvcnknLCgpPT57XHJcbiAgICAgICAgICAgIHNjb3BlLm5nTW9kZWxDb250cm9sbGVyID0gbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHBcclxuICAgIC5kaXJlY3RpdmUoJ3N3aXRjaEJ1dHRvbicsIHN3aXRjaEJ1dHRvbkRpcmVjdGl2ZS5pbnN0YW5jZSlcclxuO1xyXG5cclxuXHJcbiJdfQ==
