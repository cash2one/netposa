define(["require", "exports", "text!./progress.html", "../../app/main.app", "css!./progress.css"], function (require, exports, progressHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProgressDrective = (function () {
        function ProgressDrective() {
            this.restrict = 'AE';
            this.template = progressHtml;
            this.replace = true;
            this.scope = {
                nowValue: '=',
                maxValue: '=',
                minValue: '=',
                lengd: '@'
            };
            this.controllerAs = "progressDrective";
            this.controller = function ($scope, $element, $attrs) {
                this.lengd = $scope.lengd;
            };
            this.link = function (scope, element, attrs) {
                var vm = scope;
                vm.nowValue = scope.nowValue || 1;
                vm.progressWidth = vm.lengd - 35 - 4;
                vm.maxValue = vm.maxValue || 100;
                vm.minValue = vm.minValue || 1;
                vm.valueScale = vm.maxValue / vm.progressWidth;
                vm.point = { isTarget: false, start: 0, end: 0, reset: 0 };
                vm.point.reset = Math.round(vm.nowValue / vm.valueScale);
                element.find('.progress-circle').css('left', vm.point.reset - 8);
                element.find('.progress-lang-now').css('width', vm.point.reset);
                element.find('.progress-lang').on('click', function (event) {
                    var x = event.offsetX;
                    var v = event.offsetX * vm.valueScale;
                    if (x >= vm.progressWidth || v >= 100) {
                        x = vm.progressWidth;
                        v = 100;
                    }
                    if (x < vm.minValue / vm.valueScale) {
                        x = vm.minValue / vm.valueScale;
                        v = vm.minValue;
                    }
                    element.find('.progress-circle').css('left', (x - 8) + 'px');
                    element.find('.progress-lang-now').css('width', x);
                    vm.$apply(function () {
                        vm.nowValue = Math.round(v);
                    });
                    vm.point.reset = element.find('.progress-circle').position().left;
                });
                element.find('.progress-circle').on('mousedown', function (event) {
                    vm.point.isTarget = true;
                    vm.point.start = event.pageX;
                    bindMouseMove();
                });
                angular.element(document).on('mouseup', function (event) {
                    vm.point.isTarget = false;
                    vm.point.reset = element.find('.progress-circle').position().left;
                    offMouseMove();
                });
                scope.$on('$destroy', function () {
                    angular.element(document).off('mouseup');
                    offMouseMove();
                });
                function bindMouseMove() {
                    element.on('mousemove', function (event) {
                        event.preventDefault();
                        if (vm.point.isTarget) {
                            vm.point.end = event.pageX;
                            var y_1 = vm.point.end - vm.point.start + vm.point.reset;
                            vm.$apply(function () {
                                if (y_1 * vm.valueScale >= 100) {
                                    vm.nowValue = 100;
                                    y_1 = Math.round(100 / vm.valueScale);
                                }
                                else if (y_1 * vm.valueScale < vm.minValue) {
                                    vm.nowValue = vm.minValue;
                                    y_1 = Math.round(vm.minValue / vm.valueScale);
                                }
                                else {
                                    vm.nowValue = Math.round(y_1 * vm.valueScale);
                                }
                            });
                            element.find('.progress-lang-now').css('width', y_1);
                            element.find('.progress-circle').css('left', y_1 - 8);
                        }
                    });
                }
                function offMouseMove() {
                    element.off('mousemove');
                }
            };
        }
        ProgressDrective.instance = function () {
            return new ProgressDrective();
        };
        ProgressDrective.$inject = ['$scope', 'layer'];
        return ProgressDrective;
    }());
    main_app_1.app.directive('progressDrag', ProgressDrective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9wcm9ncmVzcy9wcm9ncmVzcy5kcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFNQTtRQUFBO1lBT0ksYUFBUSxHQUFXLElBQUksQ0FBQztZQUN4QixhQUFRLEdBQVcsWUFBWSxDQUFDO1lBQ2hDLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFLeEIsVUFBSyxHQUFRO2dCQUNULFFBQVEsRUFBRSxHQUFHO2dCQUNiLFFBQVEsRUFBRSxHQUFHO2dCQUNiLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBRSxHQUFHO2FBQ2IsQ0FBQztZQUNGLGlCQUFZLEdBQUcsa0JBQWtCLENBQUM7WUFDbEMsZUFBVSxHQUFRLFVBQVUsTUFBVyxFQUFFLFFBQWEsRUFBRSxNQUFXO2dCQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDOUIsQ0FBQyxDQUFDO1lBQ0YsU0FBSSxHQUFRLFVBQVUsS0FBVSxFQUFFLE9BQVksRUFBRSxLQUFVO2dCQUN0RCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztnQkFDbEMsRUFBRSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7Z0JBQ2pDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMvQyxFQUFFLENBQUMsS0FBSyxHQUFHLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdB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SSxDQUFDLENBQUM7b0NBQ0osRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7Z0NBQ2hELENBQUM7NEJBRUwsQ0FBQyxDQUFDLENBQUM7NEJBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBQyxDQUFDLENBQUM7NEJBQ25ELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDeEQsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUVEO29CQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7Z0JBQzVCLENBQUM7WUFDTCxDQUFDLENBQUE7UUFDTCxDQUFDO1FBaEdVLHlCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2xDLENBQUM7UUFKTSx3QkFBTyxHQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQWtHeEQsdUJBQUM7S0FuR0QsQUFtR0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3Byb2dyZXNzL3Byb2dyZXNzLmRyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3Byb2dyZXNzLmh0bWxcIiBuYW1lPSdwcm9ncmVzc0h0bWwnIC8+XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4vcHJvZ3Jlc3MuY3NzJztcclxuXHJcbmRlY2xhcmUgbGV0IHByb2dyZXNzSHRtbDogc3RyaW5nLCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBQcm9ncmVzc0RyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckc2NvcGUnLCAnbGF5ZXInXTtcclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9ncmVzc0RyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdBRSc7XHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nID0gcHJvZ3Jlc3NIdG1sO1xyXG4gICAgcmVwbGFjZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcm9ncmVzc1dpZHRoOiBudW1iZXI7XHJcbiAgICBtYXhWYWx1ZTogbnVtYmVyO1xyXG4gICAgbm93VmFsdWU6IG51bWJlcjtcclxuICAgIHZhbHVlU2NhbGU6IG51bWJlcjtcclxuICAgIHNjb3BlOiBhbnkgPSB7XHJcbiAgICAgICAgbm93VmFsdWU6ICc9JyxcclxuICAgICAgICBtYXhWYWx1ZTogJz0nLFxyXG4gICAgICAgIG1pblZhbHVlOiAnPScsXHJcbiAgICAgICAgbGVuZ2Q6ICdAJ1xyXG4gICAgfTtcclxuICAgIGNvbnRyb2xsZXJBcyA9IFwicHJvZ3Jlc3NEcmVjdGl2ZVwiO1xyXG4gICAgY29udHJvbGxlcjogYW55ID0gZnVuY3Rpb24gKCRzY29wZTogYW55LCAkZWxlbWVudDogYW55LCAkYXR0cnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMubGVuZ2QgPSAkc2NvcGUubGVuZ2Q7XHJcbiAgICB9O1xyXG4gICAgbGluazogYW55ID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHNjb3BlO1xyXG4gICAgICAgIHZtLm5vd1ZhbHVlID0gc2NvcGUubm93VmFsdWUgfHwgMTtcclxuICAgICAgICB2bS5wcm9ncmVzc1dpZHRoID0gdm0ubGVuZ2QgLSAzNSAtIDQ7XHJcbiAgICAgICAgdm0ubWF4VmFsdWUgPSB2bS5tYXhWYWx1ZSB8fCAxMDA7XHJcbiAgICAgICAgdm0ubWluVmFsdWUgPSB2bS5taW5WYWx1ZSB8fCAxO1xyXG4gICAgICAgIHZtLnZhbHVlU2NhbGUgPSB2bS5tYXhWYWx1ZSAvIHZtLnByb2dyZXNzV2lkdGg7XHJcbiAgICAgICAgdm0ucG9pbnQgPSB7aXNUYXJnZXQ6IGZhbHNlLCBzdGFydDogMCwgZW5kOiAwLCByZXNldDogMH07XHJcbiAgICAgICAgdm0ucG9pbnQucmVzZXQgPSBNYXRoLnJvdW5kKHZtLm5vd1ZhbHVlIC8gdm0udmFsdWVTY2FsZSk7XHJcbiAgICAgICAgZWxlbWVudC5maW5kKCcucHJvZ3Jlc3MtY2lyY2xlJykuY3NzKCdsZWZ0Jywgdm0ucG9pbnQucmVzZXQgLSA4KTtcclxuICAgICAgICBlbGVtZW50LmZpbmQoJy5wcm9ncmVzcy1sYW5nLW5vdycpLmNzcygnd2lkdGgnLCB2bS5wb2ludC5yZXNldCk7XHJcblxyXG4gICAgICAgIGVsZW1lbnQuZmluZCgnLnByb2dyZXNzLWxhbmcnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgbGV0IHggPSBldmVudC5vZmZzZXRYO1xyXG4gICAgICAgICAgICBsZXQgdiA9IGV2ZW50Lm9mZnNldFggKiB2bS52YWx1ZVNjYWxlO1xyXG4gICAgICAgICAgICBpZiAoeCA+PSB2bS5wcm9ncmVzc1dpZHRoIHx8IHYgPj0gMTAwKSB7XHJcbiAgICAgICAgICAgICAgICB4ID0gdm0ucHJvZ3Jlc3NXaWR0aDtcclxuICAgICAgICAgICAgICAgIHYgPSAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHggPCB2bS5taW5WYWx1ZSAvIHZtLnZhbHVlU2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHggPSB2bS5taW5WYWx1ZSAvIHZtLnZhbHVlU2NhbGU7XHJcbiAgICAgICAgICAgICAgICB2ID0gdm0ubWluVmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJy5wcm9ncmVzcy1jaXJjbGUnKS5jc3MoJ2xlZnQnLCAoeCAtIDgpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLnByb2dyZXNzLWxhbmctbm93JykuY3NzKCd3aWR0aCcsIHgpO1xyXG4gICAgICAgICAgICB2bS4kYXBwbHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdm0ubm93VmFsdWUgPSBNYXRoLnJvdW5kKHYpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdm0ucG9pbnQucmVzZXQgPSBlbGVtZW50LmZpbmQoJy5wcm9ncmVzcy1jaXJjbGUnKS5wb3NpdGlvbigpLmxlZnQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBlbGVtZW50LmZpbmQoJy5wcm9ncmVzcy1jaXJjbGUnKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZtLnBvaW50LmlzVGFyZ2V0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdm0ucG9pbnQuc3RhcnQgPSBldmVudC5wYWdlWDtcclxuICAgICAgICAgICAgYmluZE1vdXNlTW92ZSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5vbignbW91c2V1cCcsIGZ1bmN0aW9uIChldmVudDogTW91c2VFdmVudCkge1xyXG4gICAgICAgICAgICB2bS5wb2ludC5pc1RhcmdldCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB2bS5wb2ludC5yZXNldCA9IGVsZW1lbnQuZmluZCgnLnByb2dyZXNzLWNpcmNsZScpLnBvc2l0aW9uKCkubGVmdDtcclxuICAgICAgICAgICAgb2ZmTW91c2VNb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5vZmYoJ21vdXNldXAnKTtcclxuICAgICAgICAgICAgb2ZmTW91c2VNb3ZlKClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYmluZE1vdXNlTW92ZSgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZtLnBvaW50LmlzVGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0ucG9pbnQuZW5kID0gZXZlbnQucGFnZVg7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHkgPSB2bS5wb2ludC5lbmQgLSB2bS5wb2ludC5zdGFydCArIHZtLnBvaW50LnJlc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLiRhcHBseShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ICogdm0udmFsdWVTY2FsZSA+PSAxMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLm5vd1ZhbHVlID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IE1hdGgucm91bmQoMTAwIC8gdm0udmFsdWVTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoeSAqIHZtLnZhbHVlU2NhbGUgPCB2bS5taW5WYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0ubm93VmFsdWUgPSB2bS5taW5WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKHZtLm1pblZhbHVlIC8gdm0udmFsdWVTY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5ub3dWYWx1ZSA9IE1hdGgucm91bmQoeSAqIHZtLnZhbHVlU2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLnByb2dyZXNzLWxhbmctbm93JykuY3NzKCd3aWR0aCcsIHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZmluZCgnLnByb2dyZXNzLWNpcmNsZScpLmNzcygnbGVmdCcsIHkgLSA4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvZmZNb3VzZU1vdmUoKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQub2ZmKCdtb3VzZW1vdmUnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuYXBwLmRpcmVjdGl2ZSgncHJvZ3Jlc3NEcmFnJywgUHJvZ3Jlc3NEcmVjdGl2ZS5pbnN0YW5jZSk7Il19
