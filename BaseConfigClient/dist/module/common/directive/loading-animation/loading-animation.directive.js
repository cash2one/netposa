define(["require", "exports", "text!./loading-animation.html", "../../app/main.app", "css!./loading-animation.css", "angular"], function (require, exports, loadingAnimationHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var loadingAnimationDirective = (function () {
        function loadingAnimationDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = false;
            this.controllerAs = 'loadingAnimationCtrl';
            this.template = loadingAnimationHtml;
            this.scope = {
                isLoading: '=',
                isShade: '='
            };
            this.controller = function ($scope, $element, $attrs) {
                var vm = this;
                var $ = angular.element;
                if ($scope.isShade) {
                    $(".m-loading").css('background', 'rgba(0,0,0,0.3)');
                }
                if ($element.parent().css('position') === 'static') {
                    $element.parent().css('position', 'relative');
                }
                var _watch = $scope.$watch('isLoading', watchOption, true);
                function watchOption(newVal, oldVal) {
                    vm.isLoading = !!newVal ? newVal : false;
                }
                $scope.$on('$destroy', function () {
                    _watch();
                });
            };
        }
        loadingAnimationDirective.instance = function () {
            return new loadingAnimationDirective();
        };
        loadingAnimationDirective.$inject = ['$compile', '$timeout'];
        return loadingAnimationDirective;
    }());
    main_app_1.app
        .directive('loadingAnimation', loadingAnimationDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9sb2FkaW5nLWFuaW1hdGlvbi9sb2FkaW5nLWFuaW1hdGlvbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBVUE7UUFLSTtZQU9BLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksS0FBSyxDQUFDO1lBQzVCLGlCQUFZLEdBQUcsc0JBQXNCLENBQUM7WUFDdEMsYUFBUSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hDLFVBQUssR0FBRztnQkFDSixTQUFTLEVBQUUsR0FBRztnQkFDZCxPQUFPLEVBQUUsR0FBRzthQUNmLENBQUM7WUFFRixlQUFVLEdBQUcsVUFBVSxNQUFXLEVBQUUsUUFBYSxFQUFFLE1BQVc7Z0JBQzFELElBQUksRUFBRSxHQUFHLElBQWlDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxHQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBRTdCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNqQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDakQsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0QsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUzRCxxQkFBcUIsTUFBVyxFQUFFLE1BQVc7b0JBQ3pDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLENBQUM7Z0JBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7b0JBQ25CLE1BQU0sRUFBRSxDQUFDO2dCQUNiLENBQUMsQ0FBQyxDQUFBO1lBRU4sQ0FBQyxDQUFDO1FBcENGLENBQUM7UUFFTSxrQ0FBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBVE0saUNBQU8sR0FBa0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUEwQzdELGdDQUFDO0tBM0NELEFBMkNDLElBQUE7SUFFRCxjQUFHO1NBQ0UsU0FBUyxDQUFDLGtCQUFrQixFQUFFLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL2xvYWRpbmctYW5pbWF0aW9uL2xvYWRpbmctYW5pbWF0aW9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9sb2FkaW5nLWFuaW1hdGlvbi5odG1sXCIgbmFtZT1cImxvYWRpbmdBbmltYXRpb25IdG1sXCIgLz5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgXCJjc3MhLi9sb2FkaW5nLWFuaW1hdGlvbi5jc3NcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuZGVjbGFyZSBjb25zdCBsb2FkaW5nQW5pbWF0aW9uSHRtbDogYW55O1xyXG5cclxuXHJcbmNsYXNzIGxvYWRpbmdBbmltYXRpb25EaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRjb21waWxlJywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgaXNMb2FkaW5nOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IGxvYWRpbmdBbmltYXRpb25EaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0FFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29udHJvbGxlckFzID0gJ2xvYWRpbmdBbmltYXRpb25DdHJsJztcclxuICAgIHRlbXBsYXRlID0gbG9hZGluZ0FuaW1hdGlvbkh0bWw7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICBpc0xvYWRpbmc6ICc9JywgIC8v5o6n5Yi25Yqo55S75pi+56S66ZqQ6JePIOmcgOimgeacieS4gOS4quacieWuvemrmOeahOWuueWZqFxyXG4gICAgICAgIGlzU2hhZGU6ICc9JyAgLy/mmK/lkKbopoHpga7mi5tcclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IGFueSwgJGVsZW1lbnQ6IGFueSwgJGF0dHJzOiBhbnkpIHtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzIGFzIGxvYWRpbmdBbmltYXRpb25EaXJlY3RpdmU7XHJcbiAgICAgICAgbGV0ICQ6IGFueSA9IGFuZ3VsYXIuZWxlbWVudDtcclxuICAgICAgICAvL+aYr+WQpumcgOimgemBrue9qVxyXG4gICAgICAgIGlmICgkc2NvcGUuaXNTaGFkZSkge1xyXG4gICAgICAgICAgICAkKFwiLm0tbG9hZGluZ1wiKS5jc3MoJ2JhY2tncm91bmQnLCAncmdiYSgwLDAsMCwwLjMpJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgkZWxlbWVudC5wYXJlbnQoKS5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgICAgICAgICRlbGVtZW50LnBhcmVudCgpLmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IF93YXRjaCA9ICRzY29wZS4kd2F0Y2goJ2lzTG9hZGluZycsIHdhdGNoT3B0aW9uLCB0cnVlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2F0Y2hPcHRpb24obmV3VmFsOiBhbnksIG9sZFZhbDogYW55KSB7XHJcbiAgICAgICAgICAgIHZtLmlzTG9hZGluZyA9ICEhbmV3VmFsID8gbmV3VmFsIDogZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgX3dhdGNoKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHBcclxuICAgIC5kaXJlY3RpdmUoJ2xvYWRpbmdBbmltYXRpb24nLCBsb2FkaW5nQW5pbWF0aW9uRGlyZWN0aXZlLmluc3RhbmNlKTtcclxuXHJcblxyXG4iXX0=
