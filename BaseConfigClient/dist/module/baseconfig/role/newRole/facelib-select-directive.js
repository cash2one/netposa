define(["require", "exports", "../../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FacelibSelectDirective = (function () {
        function FacelibSelectDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                slideData: "=",
                slideClick: "&",
            };
            this.controllerAs = 'facelibSelectDirective';
            this.template = function (element, attrs) {
                return "\n            <span \n            style=\"position: relative;width: 108px;height: 26px;display:block;margin-top: 12px;padding:0;line-height: 26px;text-align: center\" \n            ng-class=\"{'isEnable':slideData.IsEnabled}\">\n                {{slideData.SlideIndex>=0?slideData.SlideList[slideData.SlideIndex].text:slideData.text}}\n                <ul>\n                    <li \n                    ng-repeat=\"(index,item) in slideData.SlideList\" ng-click=\"facelibSelectDirective.slideClick($event,item,index)\">\n                    {{item.text}}</li>\n                </ul>\n            </span>\n        ";
            };
            this.isShowSlide = false;
            this.controller = function ($scope) {
                var vm = this;
                vm.slideClick = function (event, item, index) {
                    event.stopPropagation();
                    $scope.slideClick({ result: item, index: index });
                };
                vm.showSlideFn = function () {
                    vm.isShowSlide = true;
                };
                vm.hideSlideFn = function () {
                    vm.isShowSlide = false;
                };
            };
            this.link = function (scope, element, attrs) {
                element.on('mouseover', function () {
                    element.find('ul').show();
                });
                element.on('click', function (event) {
                    event.stopPropagation();
                    scope.slideClick({ result: null, index: -1 });
                });
                element.on('mouseout', function () {
                    element.find('ul').hide();
                });
                element.find('ul').on('mouseover', function () {
                    element.find('ul').show();
                });
            };
        }
        FacelibSelectDirective.instance = function () {
            return new FacelibSelectDirective();
        };
        FacelibSelectDirective.$inject = [];
        return FacelibSelectDirective;
    }());
    main_app_1.app.directive("facelibSelect", FacelibSelectDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9yb2xlL25ld1JvbGUvZmFjZWxpYi1zZWxlY3QtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7WUFPSSxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsZUFBVSxHQUFZLElBQUksQ0FBQztZQUMzQixVQUFLLEdBQVE7Z0JBQ1QsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsVUFBVSxFQUFFLEdBQUc7YUFDbEIsQ0FBQztZQUNGLGlCQUFZLEdBQUcsd0JBQXdCLENBQUM7WUFDeEMsYUFBUSxHQUFHLFVBQVUsT0FBWSxFQUFFLEtBQVU7Z0JBQ3pDLE1BQU0sQ0FBQyx3bUJBV04sQ0FBQTtZQUNMLENBQUMsQ0FBQztZQUlGLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBQzdCLGVBQVUsR0FBRyxVQUFVLE1BQVc7Z0JBQzlCLElBQUksRUFBRSxHQUFHLElBQThCLENBQUM7Z0JBQ3hDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxLQUFnQixFQUFDLElBQTJCLEVBQUUsS0FBYTtvQkFDakYsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTtnQkFDbkQsQ0FBQyxDQUFDO2dCQUNGLEVBQUUsQ0FBQyxXQUFXLEdBQUc7b0JBQ2IsRUFBRSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLENBQUMsQ0FBQztnQkFDRixFQUFFLENBQUMsV0FBVyxHQUFHO29CQUNiLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixDQUFDLENBQUE7WUFDTCxDQUFDLENBQUM7WUFDRixTQUFJLEdBQUcsVUFBVSxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVU7Z0JBQ2pELE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFO29CQUNwQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEtBQWdCO29CQUMxQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO29CQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUM3QixDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFBO1FBQ0wsQ0FBQztRQTFEVSwrQkFBUSxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBSk0sOEJBQU8sR0FBa0IsRUFBRSxDQUFDO1FBNER2Qyw2QkFBQztLQTdERCxBQTZEQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvcm9sZS9uZXdSb2xlL2ZhY2VsaWItc2VsZWN0LWRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge09wZXJhdGVGb3JGYWNlTGliRW51bX0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1VzZXJSb2xlRGF0YUV4XCI7XHJcblxyXG5jbGFzcyBGYWNlbGliU2VsZWN0RGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRmFjZWxpYlNlbGVjdERpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnRSc7XHJcbiAgICByZXBsYWNlOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHRyYW5zY2x1ZGU6IEJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGU6IGFueSA9IHtcclxuICAgICAgICBzbGlkZURhdGE6IFwiPVwiLCAgICAgICAvL+WIneWni+S4i+aLieaVsOaNriBbXVxyXG4gICAgICAgIHNsaWRlQ2xpY2s6IFwiJlwiLCAgICAgIC8v54K55Ye75LqL5Lu2ICBmdW5jdGlvbihzZWxlY3RlZCl7fSAg5b+F5Lyg5ZCM5ZCN5Y+C5pWw77ya5Y2zIOi/lOWbnuWAvOS4uumAieS4reWAvFxyXG4gICAgfTtcclxuICAgIGNvbnRyb2xsZXJBcyA9ICdmYWNlbGliU2VsZWN0RGlyZWN0aXZlJzsgICAgICAvL+aOp+WItuWZqFxyXG4gICAgdGVtcGxhdGUgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55LCBhdHRyczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPHNwYW4gXHJcbiAgICAgICAgICAgIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlO3dpZHRoOiAxMDhweDtoZWlnaHQ6IDI2cHg7ZGlzcGxheTpibG9jazttYXJnaW4tdG9wOiAxMnB4O3BhZGRpbmc6MDtsaW5lLWhlaWdodDogMjZweDt0ZXh0LWFsaWduOiBjZW50ZXJcIiBcclxuICAgICAgICAgICAgbmctY2xhc3M9XCJ7J2lzRW5hYmxlJzpzbGlkZURhdGEuSXNFbmFibGVkfVwiPlxyXG4gICAgICAgICAgICAgICAge3tzbGlkZURhdGEuU2xpZGVJbmRleD49MD9zbGlkZURhdGEuU2xpZGVMaXN0W3NsaWRlRGF0YS5TbGlkZUluZGV4XS50ZXh0OnNsaWRlRGF0YS50ZXh0fX1cclxuICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICA8bGkgXHJcbiAgICAgICAgICAgICAgICAgICAgbmctcmVwZWF0PVwiKGluZGV4LGl0ZW0pIGluIHNsaWRlRGF0YS5TbGlkZUxpc3RcIiBuZy1jbGljaz1cImZhY2VsaWJTZWxlY3REaXJlY3RpdmUuc2xpZGVDbGljaygkZXZlbnQsaXRlbSxpbmRleClcIj5cclxuICAgICAgICAgICAgICAgICAgICB7e2l0ZW0udGV4dH19PC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICBgXHJcbiAgICB9O1xyXG4gICAgc2xpZGVDbGljazogRnVuY3Rpb247XHJcbiAgICBzaG93U2xpZGVGbjogRnVuY3Rpb247XHJcbiAgICBoaWRlU2xpZGVGbjogRnVuY3Rpb247XHJcbiAgICBpc1Nob3dTbGlkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXMgYXMgRmFjZWxpYlNlbGVjdERpcmVjdGl2ZTtcclxuICAgICAgICB2bS5zbGlkZUNsaWNrID0gZnVuY3Rpb24gKGV2ZW50Ok1vdXNlRXZlbnQsaXRlbTogT3BlcmF0ZUZvckZhY2VMaWJFbnVtLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2xpZGVDbGljayh7cmVzdWx0OiBpdGVtLCBpbmRleDogaW5kZXh9KVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdm0uc2hvd1NsaWRlRm4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZtLmlzU2hvd1NsaWRlID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZtLmhpZGVTbGlkZUZuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dTbGlkZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGVsZW1lbnQ6IGFueSwgYXR0cnM6IGFueSkge1xyXG4gICAgICAgIGVsZW1lbnQub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCd1bCcpLnNob3coKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50Ok1vdXNlRXZlbnQpIHtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHNjb3BlLnNsaWRlQ2xpY2soe3Jlc3VsdDogbnVsbCwgaW5kZXg6IC0xfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbGVtZW50Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5maW5kKCd1bCcpLmhpZGUoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsZW1lbnQuZmluZCgndWwnKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LmZpbmQoJ3VsJykuc2hvdygpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5kaXJlY3RpdmUoXCJmYWNlbGliU2VsZWN0XCIsIEZhY2VsaWJTZWxlY3REaXJlY3RpdmUuaW5zdGFuY2UpOyJdfQ==
