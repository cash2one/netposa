define(["require", "exports", "text!./toggle.html", "../../app/main.app", "css!./toggle.css", "angular"], function (require, exports, toggleHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilToggleDirective = (function () {
        function UtilToggleDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = true;
            this.template = toggleHtml;
            this.require = "^?ngModel";
            this.scope = {
                isReverse: '@',
                toggleStatus: '=?',
                toggleDisable: '@',
                toggleChange: '&',
                toggleCustomData: '@'
            };
            this.controller = function ($scope, $element, $attrs, $compile, $timeout) {
                $scope._isReverse = false;
                $attrs.$observe("isReverse", function () {
                    $scope._isReverse = !!$scope.$eval($attrs.isReverse);
                });
                $attrs.$observe("toggleDisable", function () {
                    $scope._disabled = !!$scope.$eval($attrs.toggleDisable);
                });
                $scope.toggleChangeCallBack = function (flag) {
                    $scope.toggleChange({ status: flag, data: $scope.toggleCustomData });
                };
                $scope.changeUtilToggleIsOpen = function () {
                    if ($scope._disabled) {
                        return;
                    }
                    $scope.toggleStatus = !$scope.toggleStatus;
                    if ($scope.ngModelController) {
                        updateModel($scope.toggleStatus);
                    }
                    $scope.toggleChangeCallBack($scope.toggleStatus);
                };
                function updateModel(val) {
                    $scope.ngModelController.$setViewValue(val);
                }
            };
            this.link = function ($scope, $element, attr, ngModelController) {
                var $on = $scope.$on("$destroy", function () {
                    $scope.ngModelController = null;
                    $on();
                });
                $scope.ngModelController = ngModelController;
                if (ngModelController) {
                    initNgModelController();
                }
                function initNgModelController() {
                    ngModelController.$parsers.push(function (viewValue) {
                        return viewValue;
                    });
                    ngModelController.$formatters.push(function (modelValue) {
                        $scope.toggleStatus = modelValue;
                    });
                }
            };
        }
        UtilToggleDirective.instance = function () {
            return new UtilToggleDirective();
        };
        return UtilToggleDirective;
    }());
    main_app_1.app
        .directive('utilToggle', UtilToggleDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRvZ2dsZS90b2dnbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTBCQTtRQUNJO1lBc0JBLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLGFBQVEsR0FBVSxVQUFVLENBQUM7WUFDN0IsWUFBTyxHQUFHLFdBQVcsQ0FBQztZQUN0QixVQUFLLEdBQUc7Z0JBQ0osU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsWUFBWSxFQUFDLElBQUk7Z0JBQ2pCLGFBQWEsRUFBQyxHQUFHO2dCQUNqQixZQUFZLEVBQUUsR0FBRztnQkFDakIsZ0JBQWdCLEVBQUUsR0FBRzthQUN4QixDQUFDO1lBR0YsZUFBVSxHQUFHLFVBQVUsTUFBMkIsRUFBRSxRQUFhLEVBQUUsTUFBVyxFQUFDLFFBQWEsRUFBQyxRQUFZO2dCQUdyRyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7b0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtvQkFDN0IsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVELENBQUMsQ0FBQyxDQUFDO2dCQUdILE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLElBQWE7b0JBQ2pELE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO2dCQUN2RSxDQUFDLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLHNCQUFzQixHQUFHO29CQUM1QixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQzt3QkFDakIsTUFBTSxDQUFDO29CQUNYLENBQUM7b0JBQ0QsTUFBTSxDQUFDLFlBQVksR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7b0JBRTNDLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7d0JBQ3pCLFdBQVcsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ3JDLENBQUM7b0JBQ0QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDO2dCQUVGLHFCQUFxQixHQUFZO29CQUM3QixNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDO1lBQ0YsU0FBSSxHQUFHLFVBQVMsTUFBMkIsRUFBQyxRQUFhLEVBQUUsSUFBUyxFQUFDLGlCQUFxQjtnQkFDdEYsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUM7b0JBQzVCLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7b0JBQ2hDLEdBQUcsRUFBRSxDQUFDO2dCQUNWLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztnQkFFN0MsRUFBRSxDQUFBLENBQUMsaUJBQWlCLENBQUMsQ0FBQSxDQUFDO29CQUNsQixxQkFBcUIsRUFBRSxDQUFDO2dCQUM1QixDQUFDO2dCQUVEO29CQUVJLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBUyxTQUFrQjt3QkFFdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7b0JBR0gsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFTLFVBQW1CO3dCQUUzRCxNQUFNLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztvQkFDckMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztZQUVMLENBQUMsQ0FBQTtRQTFGRCxDQUFDO1FBQ00sNEJBQVEsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFDckMsQ0FBQztRQXdGTCwwQkFBQztJQUFELENBOUZBLEFBOEZDLElBQUE7SUFHRCxjQUFHO1NBQ0UsU0FBUyxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FDekQiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10b2dnbGUvdG9nZ2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vdG9nZ2xlLmh0bWxcIiBuYW1lPVwidG9nZ2xlSHRtbFwiIC8+XHJcbmRlY2xhcmUgbGV0IHRvZ2dsZUh0bWw6IGFueTtcclxuXHJcbmRlY2xhcmUgY29uc3QgYW5ndWxhcjogYW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCAnY3NzIS4vdG9nZ2xlLmNzcyc7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbi8qKlxyXG4gKiBAbmdkb2MgZGlyZWN0aXZlXHJcbiAqIEBuYW1lIHV0aWxUb2dnbGVcclxuICogQG1vZHVsZSBjb21tb25cclxuICogQHJlc3RyaWN0IEVcclxuICpcclxuICogQGRlc2NyaXB0aW9uXHJcbiAqIOW8gOWFs+mAieaLqeWKqOS9nO+8jOi/lOWbnuaUueWPmCDlj4LmlbBib29sZWFuIOWAvFxyXG4gKiBAcGFyYW0gICB0b2dnbGUtc3RhdHVzICA6IGJvb2xlYW4g6K6+572u6buY6K6k6YCJ5oup77yMYm9vbGVhbuexu+WeiyDmjqfliLblvZPliY3nlYzpnaLlvIDlhbPmjInpkq7nirbmgIEg5Y+M5ZCR57uR5a6aXHJcbiAqICAgICAgICAgIGlzLXJldmVyc2U6IGJvb2xlYW4g5piv5ZCm6L+b6KGM5bGV546w5Y+N6L2sIOS4unRydWXmg4XlhrXkuIvjgJB0b2dnbGVTdGF0dXPkuLp0cnVlIOihqOeOsOS4uuWFs+mXrSDkuLpmYWxzZSDooajnjrDkuLrlvIDlkK/jgJFcclxuICogICAgICAgICAgdG9nZ2xlLWRpc2FibGUgOmJvb2xlYW4g6K6+572u5oyJ6ZKu5piv5ZCm5Y+v5Lul6KKr54K55Ye777yMYm9vbGVhbuexu+Wei++8jOiLpeS4jeS8oOm7mOiupCBmYWxzZSDmnInmlYhcclxuICogICAgICAgICAgdG9nZ2xlLWNoYW5nZSAgOmZ1bmN0aW9uIOeCueWHu+aUueWPmCDlvIDlhbPop6blj5Hlm57osIPlh73mlbDjgIIg6L+U5Zue5b2T5YmNIOeKtuaAgSjlj5dpcy1yZXZlcnNl5b2x5ZONKVxyXG4gKiAgICAgICAgICB0b2dnbGUtY3VzdG9tLWRhdGE6IHN0cmluZyDoh6rlrprkuYnkvKDlhaXnmoTmlbDmja4sIOW9k+inpuWPkXRvZ2dsZUNoYW5nZeaXtuS8muS4gOi1t+WbnuS8oOe7mWNvbnRyb2xsZXJcclxuICogYGBgaHRtbFxyXG4gKiA8dXRpbC10b2dnbGUgdG9nZ2xlLW9wZW49XCJib29sZWFuUGFyYW1cIiB0b2dnbGUtZGlzYWJsZT1cImJvb2xlYW5QYXJhbVwiIHRvZ2dsZS1jaGFuZ2U9XCJjYWxsQmFja0Z1bihpc09wZW4pXCI+PC91dGlsLXRvZ2dsZT5cclxuICogYGBgXHJcbiAqL1xyXG5jbGFzcyBVdGlsVG9nZ2xlRGlyZWN0aXZlIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXRpbFRvZ2dsZURpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVN0YXR1czogYm9vbGVhbjtcclxuICAgIHRvZ2dsZURpc2FibGU6IGJvb2xlYW47XHJcbiAgICB0b2dnbGVDdXN0b21EYXRhOiBzdHJpbmc7XHJcbiAgICBfaXNSZXZlcnNlOiBib29sZWFuO1xyXG4gICAgaXNSZXZlcnNlOiBzdHJpbmc7XHJcbiAgICBfZGlzYWJsZWQ6IGJvb2xlYW47XHJcbiAgICB0b2dnbGVDaGFuZ2VDYWxsQmFjazogRnVuY3Rpb247XHJcbiAgICB0b2dnbGVDaGFuZ2U6IEZ1bmN0aW9uO1xyXG4gICAgY2hhbmdlVXRpbFRvZ2dsZUlzT3BlbjogRnVuY3Rpb247XHJcbiAgICAkb2JzZXJ2ZTogYW55O1xyXG4gICAgJGV2YWw6IGFueTtcclxuICAgICRvbjogYW55O1xyXG4gICAgJGFwcGx5OiBhbnk7XHJcbiAgICBuZ01vZGVsQ29udHJvbGxlcjogYW55O1xyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnQUUnO1xyXG4gICAgcmVwbGFjZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0cmFuc2NsdWRlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRlbXBsYXRlOnN0cmluZyA9IHRvZ2dsZUh0bWw7XHJcbiAgICByZXF1aXJlID0gXCJeP25nTW9kZWxcIjsgLy8g5YyF5ZCr5Lik56eN5qih5byPIOS4gOenjeaYr+aZrumAmuWxleekuuaooeW8jyDkvb/nlKjmjIfku6TnmoRodG1s5Lit5rKh5pyJ5Yqg5LiKbmctbW9kZWwg5Y+m5LiA56eN5piv5Yqg5LiKbmctbW9kZWznmoRcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGlzUmV2ZXJzZTogJ0AnLCAvLyDmmK/lkKblr7nkvKDlhaXnu5Pmnpzov5vooYzlj43ovawsIOatpOmhueS4unRydWXnmoTml7blgJksIOWmguaenOS8oOWFpeeahOS4unRydWUsIOWImXRvZ2dsZVN0YXR1c+ihqOekuuaMiemSruaYr+WFs+mXreeKtuaAgVxyXG4gICAgICAgIHRvZ2dsZVN0YXR1czonPT8nLCAvLyDmmK/lkKblvIDlkK/nmoTnirbmgIFcclxuICAgICAgICB0b2dnbGVEaXNhYmxlOidAJywgLy8g5piv5ZCm5Y+v55SoIHRydWUg56aB55SoIGZhbHNlIOWQr+eUqFxyXG4gICAgICAgIHRvZ2dsZUNoYW5nZTogJyYnLFxyXG4gICAgICAgIHRvZ2dsZUN1c3RvbURhdGE6ICdAJyAvLyDkvKDlhaXnmoTnlKjmiLfoh6rlrprkuYnnmoTmlbDmja4sIOW9k+inpuWPkXRvZ2dsZUNoYW5nZeaXtizkvJrkuIDotbfkvKDlm57nu5ljb250cm9sbGVyXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGNvbnRyb2xsZXJBczogJ3RvZ2dsZUN0cmwnOyBhbHRlcjogd3lyIOayoeacieWunumZheS9v+eUqOWIsFxyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IFV0aWxUb2dnbGVEaXJlY3RpdmUsICRlbGVtZW50OiBhbnksICRhdHRyczogYW55LCRjb21waWxlOiBhbnksJHRpbWVvdXQ6YW55KSB7XHJcblxyXG4gICAgICAgIC8vIOm7mOiupOS4jeWPjei9rFxyXG4gICAgICAgICRzY29wZS5faXNSZXZlcnNlID0gZmFsc2U7XHJcbiAgICAgICAgJGF0dHJzLiRvYnNlcnZlKFwiaXNSZXZlcnNlXCIsICgpPT57XHJcbiAgICAgICAgICAgICRzY29wZS5faXNSZXZlcnNlID0gISEkc2NvcGUuJGV2YWwoJGF0dHJzLmlzUmV2ZXJzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJGF0dHJzLiRvYnNlcnZlKFwidG9nZ2xlRGlzYWJsZVwiLCAoKT0+e1xyXG4gICAgICAgICAgICAkc2NvcGUuX2Rpc2FibGVkID0gISEkc2NvcGUuJGV2YWwoJGF0dHJzLnRvZ2dsZURpc2FibGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDpu5jorqTkuI3lvIDlkK9cclxuICAgICAgICAkc2NvcGUudG9nZ2xlQ2hhbmdlQ2FsbEJhY2sgPSBmdW5jdGlvbiAoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAkc2NvcGUudG9nZ2xlQ2hhbmdlKHtzdGF0dXM6IGZsYWcsIGRhdGE6ICRzY29wZS50b2dnbGVDdXN0b21EYXRhfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAkc2NvcGUuY2hhbmdlVXRpbFRvZ2dsZUlzT3BlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoJHNjb3BlLl9kaXNhYmxlZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLnRvZ2dsZVN0YXR1cyA9ICEkc2NvcGUudG9nZ2xlU3RhdHVzO1xyXG4gICAgICAgICAgICAvLyDoi6XlrZjlnKhuZy1tb2RlbCwg5YiZ5pS55Y+YbmctbW9kZWznmoTlgLxcclxuICAgICAgICAgICAgaWYoJHNjb3BlLm5nTW9kZWxDb250cm9sbGVyKXtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZU1vZGVsKCRzY29wZS50b2dnbGVTdGF0dXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS50b2dnbGVDaGFuZ2VDYWxsQmFjaygkc2NvcGUudG9nZ2xlU3RhdHVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVNb2RlbCh2YWw6IGJvb2xlYW4pe1xyXG4gICAgICAgICAgICAkc2NvcGUubmdNb2RlbENvbnRyb2xsZXIuJHNldFZpZXdWYWx1ZSh2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24oJHNjb3BlOiBVdGlsVG9nZ2xlRGlyZWN0aXZlLCRlbGVtZW50OiBhbnksIGF0dHI6IGFueSxuZ01vZGVsQ29udHJvbGxlcjphbnkpIHtcclxuICAgICAgICBsZXQgJG9uID0gJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJHNjb3BlLm5nTW9kZWxDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgICAgICAgJG9uKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLm5nTW9kZWxDb250cm9sbGVyID0gbmdNb2RlbENvbnRyb2xsZXI7XHJcbiAgICAgICAgLy8gbmdNb2RlbENvbnRyb2xsZXIg5Lik56eN5oOF5Ya1IG5nTW9kZWxDb250cm9sbGVy5a2Y5ZyoIG5nTW9kZWxDb250cm9sbGVy5LiN5a2Y5ZyoXHJcbiAgICAgICAgaWYobmdNb2RlbENvbnRyb2xsZXIpe1xyXG4gICAgICAgICAgICBpbml0TmdNb2RlbENvbnRyb2xsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXROZ01vZGVsQ29udHJvbGxlcigpe1xyXG4gICAgICAgICAgICAvLyDorr7lrpp2aWV3LT5tb2RlbOeahOinhOWImVxyXG4gICAgICAgICAgICBuZ01vZGVsQ29udHJvbGxlci4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKHZpZXdWYWx1ZTogYm9vbGVhbil7XHJcbiAgICAgICAgICAgICAgICAvLyBuZy1tb2RlbOaYr+S7gOS5iOWtl+espuS4suWwseaYr+S7gOS5iOWtl+espuS4siwg5omA5Lul5pqC5LiN5a+555WM6Z2i5pi+56S655qE5pWw5o2u6L+b6KGM6L2s5o2iXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1vZGVsVmFsdWUtPnZpZXdWYWx1ZVxyXG4gICAgICAgICAgICBuZ01vZGVsQ29udHJvbGxlci4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKG1vZGVsVmFsdWU6IGJvb2xlYW4pe1xyXG4gICAgICAgICAgICAgICAgLy8gbmctbW9kZWzmmK/ku4DkuYjlrZfnrKbkuLLlsLHmmK/ku4DkuYjlrZfnrKbkuLIsIOaJgOS7peaaguS4jeWvuW5nLW1vZGVs6L+b6KGM55WM6Z2i5bGV56S655qE6L2s5o2iXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG9nZ2xlU3RhdHVzID0gbW9kZWxWYWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmFwcFxyXG4gICAgLmRpcmVjdGl2ZSgndXRpbFRvZ2dsZScsIFV0aWxUb2dnbGVEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbjsiXX0=
