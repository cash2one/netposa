define(["require", "exports", "../../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var mouseOverLeaveDirective = (function () {
        function mouseOverLeaveDirective() {
            this.restrict = 'A';
            this.link = function (scope, elem, attrs) {
                elem.bind('mouseover', function () {
                    elem.css("cursor", "pointer");
                    scope.$apply(function () {
                        scope.hover = true;
                    });
                });
                elem.bind('mouseleave', function () {
                    scope.$apply(function () {
                        scope.hover = false;
                    });
                });
            };
        }
        mouseOverLeaveDirective.instance = function () {
            return new mouseOverLeaveDirective();
        };
        mouseOverLeaveDirective.$inject = ['$compile', '$timeout'];
        return mouseOverLeaveDirective;
    }());
    main_app_1.app
        .directive('mouseOverLeave', mouseOverLeaveDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0L21vdXNlLW92ZXItbGVhdmUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBRUk7WUFLQSxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFNBQUksR0FBRyxVQUFVLEtBQVUsRUFBRSxJQUFTLEVBQUUsS0FBVTtnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM5QixLQUFLLENBQUMsTUFBTSxDQUFDO3dCQUNULEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO29CQUN2QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtvQkFDcEIsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDVCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7UUFqQkYsQ0FBQztRQUNNLGdDQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQ3pDLENBQUM7UUFMTSwrQkFBTyxHQUFrQixDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQW9CNUQsOEJBQUM7S0FyQkQsQUFxQkMsSUFBQTtJQUNELGNBQUc7U0FDQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQ2hFIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3VuaXQvbW91c2Utb3Zlci1sZWF2ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vYXBwL21haW4uYXBwJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuZGVjbGFyZSB2YXIgJDphbnk7XHJcbmRlY2xhcmUgdmFyIHdpbmRvdzphbnlcclxuXHJcbmNsYXNzIG1vdXNlT3ZlckxlYXZlRGlyZWN0aXZle1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRjb21waWxlJywnJHRpbWVvdXQnXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgbW91c2VPdmVyTGVhdmVEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnQSc7XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW06IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGVsZW0uYmluZCgnbW91c2VvdmVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZWxlbS5jc3MoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpO1xyXG4gICAgICAgICAgICBzY29wZS4kYXBwbHkoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHNjb3BlLmhvdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxlbS5iaW5kKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgc2NvcGUuJGFwcGx5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5ob3ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuYXBwXHJcbiAgIC5kaXJlY3RpdmUoJ21vdXNlT3ZlckxlYXZlJywgbW91c2VPdmVyTGVhdmVEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbjtcclxuXHJcblxyXG4iXX0=
