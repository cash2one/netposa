define(["require", "exports", "../../app/main.app", "angular"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilNavContainer = (function () {
        function UtilNavContainer() {
            this.restrict = "ECAM";
            this.scope = {
                isCollapse: '=',
            };
            this.controllerAs = 'navCntr';
            this.transclude = true;
            this.controller = function ($scope) {
                var navs = [];
                var singleNavs = [];
                this.gotOpened = function (selectedNav) {
                    angular.forEach(navs, function (nav) {
                        if (selectedNav != nav) {
                            nav.showMe = false;
                        }
                    });
                };
                this.showText = function (flag) {
                    $scope.isCollapse = !flag;
                    angular.forEach(navs, function (nav) {
                        nav.hideText = false;
                    });
                    angular.forEach(singleNavs, function (nav) {
                        nav.hideText = false;
                    });
                };
                this.addNav = function (nav) {
                    navs.push(nav);
                    nav.hideText = $scope.isCollapse;
                };
                this.addSingleNav = function (nav) {
                    singleNavs.push(nav);
                    nav.hideText = $scope.isCollapse;
                };
                this.initUtilNavTool = function (navTool) {
                    navTool.isCollapse = $scope.isCollapse;
                };
            };
        }
        UtilNavContainer.instance = function () {
            return new UtilNavContainer();
        };
        return UtilNavContainer;
    }());
    var UtilNavTool = (function () {
        function UtilNavTool() {
            this.restrict = "ECAM";
            this.replace = true;
            this.require = '^?utilNavContainer';
            this.template = '<div class="u-nav-control-btn f-usn" ng-click="toggle()" ng-class="{\'is-collapse u-re-btn\': isCollapse}"></div>';
            this.link = function (scope, iElement, iAttrs, navController) {
                navController.initUtilNavTool(scope);
                scope.toggle = function () {
                    scope.isCollapse = !scope.isCollapse;
                    navController.showText(!scope.isCollapse);
                };
            };
        }
        UtilNavTool.instance = function () {
            return new UtilNavTool();
        };
        return UtilNavTool;
    }());
    var UtilNav = (function () {
        function UtilNav() {
            this.restrict = "ECAM";
            this.replace = true;
            this.transclude = true;
            this.require = '^?utilNavContainer';
            this.scope = {
                expanderTitle: '@',
            };
            this.template = function () {
                return '<div>' +
                    '<div class="u-nav-header f-usn f-cfb" ng-click="toggle()">' +
                    '<span class="header-icon-cntr f-cfb">' +
                    '<i class="header-icon" ng-class="{\'z-hide\':!showMe,\'z-show\':showMe}"></i>' +
                    '</span>' +
                    '<span class="header-text" ng-class="{\'z-no-text\': hideText}" ng-bind="expanderTitle"></span>' +
                    '</div>' +
                    '<div class="u-nav-content" ng-class="{\'z-content-hidden\':!showMe}" ng-transclude></div>' +
                    '</div>';
            };
            this.controller = function ($scope) {
                var contents = [];
                $scope.showText = function (flag) {
                    angular.forEach(contents, function (content) {
                        content.hideText = false;
                    });
                };
                this.showNowTaggle = function () {
                    $scope.showMe = !$scope.showMe;
                };
                this.addContent = function (content) {
                    contents.push(content);
                };
            };
            this.link = function (scope, iElement, iAttrs, navController) {
                scope.showMe = false;
                scope.$watch('hideText', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        scope.showText(newVal);
                    }
                });
                navController.addNav(scope);
                scope.toggle = function () {
                    scope.showMe = !scope.showMe;
                    navController.gotOpened(scope);
                };
            };
        }
        UtilNav.instance = function () {
            return new UtilNav();
        };
        return UtilNav;
    }());
    var UtilNavContent = (function () {
        function UtilNavContent() {
            this.restrict = "ECAM";
            this.replace = true;
            this.require = '^?utilNav';
            this.scope = {
                contentIcon: '@',
                contentKey: '@',
                contentName: '@',
                currentRouter: '='
            };
            this.link = function (scope, iElement, iAttrs, navCtrl) {
                if (scope.currentRouter === scope.contentKey) {
                    navCtrl.showNowTaggle();
                }
                navCtrl.addContent(scope);
            };
            this.template = '<a class="content i-hover" ui-sref-active="z-active" ui-sref="{{contentKey}}">' +
                '<span class="content-icon-cntr">' +
                '<i class="content-icon i-{{contentIcon}}"></i>' +
                '</span>' +
                '<span class="content-text f-toe" ng-class="{\'z-no-text\': hideText}" ng-bind="contentName"></span>' +
                '</a>';
        }
        UtilNavContent.instance = function () {
            return new UtilNavContent();
        };
        return UtilNavContent;
    }());
    var UtilNavSingle = (function () {
        function UtilNavSingle() {
            this.restrict = "ECAM";
            this.replace = true;
            this.require = '^?utilNavContainer';
            this.scope = {
                contentIcon: '@',
                contentKey: '@',
                contentName: '@'
            };
            this.link = function (scope, iElement, iAttrs, navController) {
                navController.addSingleNav(scope);
            };
            this.template = '<div class="u-nav-content"><a class="content" ui-sref-active="z-active" ui-sref="{{contentKey}}">' +
                '<span class="content-icon-cntr">' +
                '<i class="content-icon i-{{contentIcon}}"></i>' +
                '</span>' +
                '<span class="content-text f-toe" ng-class="{\'z-no-text\': hideText}" ng-bind="contentName"></span>' +
                '</a>' +
                '</div>';
        }
        UtilNavSingle.instance = function () {
            return new UtilNavSingle();
        };
        return UtilNavSingle;
    }());
    main_app_1.app.directive('utilNavContainer', UtilNavContainer.instance);
    main_app_1.app.directive('utilNavTool', UtilNavTool.instance);
    main_app_1.app.directive('utilNav', UtilNav.instance);
    main_app_1.app.directive('utilNavContent', UtilNavContent.instance);
    main_app_1.app.directive('utilNavSingle', UtilNavSingle.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS9uYXYvbmF2LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTtRQUNJO1lBYUEsYUFBUSxHQUFHLE1BQU0sQ0FBQztZQUNsQixVQUFLLEdBQUc7Z0JBQ0osVUFBVSxFQUFFLEdBQUc7YUFFbEIsQ0FBQztZQUNGLGlCQUFZLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLGVBQVUsR0FBRyxJQUFJLENBQUM7WUFDbEIsZUFBVSxHQUFHLFVBQVUsTUFBd0I7Z0JBRTNDLElBQUksSUFBSSxHQUFtQixFQUFFLENBQUM7Z0JBQzlCLElBQUksVUFBVSxHQUF5QixFQUFFLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxXQUFvQjtvQkFDM0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsVUFBVSxHQUFZO3dCQUN4QyxFQUFFLENBQUMsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDckIsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7d0JBQ3ZCLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDO2dCQUdGLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxJQUFhO29CQUNuQyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUMxQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEdBQVk7d0JBQ3hDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUV6QixDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQVk7d0JBQzlDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO29CQUV6QixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUM7Z0JBR0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLEdBQVk7b0JBQ2hD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Y0FBRyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL25hdi9uYXYuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzQvMjAuXHJcbiAqL1xyXG5pbXBvcnQgeyBhcHAgfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgVXRpbE5hdkNvbnRhaW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsTmF2Q29udGFpbmVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBzaG93VGV4dDogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgYWRkTmF2OiBGdW5jdGlvbjtcclxuICAgIHB1YmxpYyBnb3RPcGVuZWQ6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIGFkZFNpbmdsZU5hdjogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgaW5pdFV0aWxOYXZUb29sOiBGdW5jdGlvbjtcclxuICAgIGlzQ29sbGFwc2U6IGJvb2xlYW47XHJcbiAgICByZXN0cmljdCA9IFwiRUNBTVwiO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgaXNDb2xsYXBzZTogJz0nLCAvLyDmmK/lkKbpmpDol4/mloflrZfkv6Hmga8sIOatpOeKtuaAgeS8muS4jueItmNvbnRyb2xsZXLkuK3lj5jph4/nirbmgIHkv53mjIHkuIDnm7RcclxuXHJcbiAgICB9O1xyXG4gICAgY29udHJvbGxlckFzID0gJ25hdkNudHInO1xyXG4gICAgdHJhbnNjbHVkZSA9IHRydWU7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZTogVXRpbE5hdkNvbnRhaW5lcikge1xyXG4gICAgICAgIC8vJHNjb3BlLmlzQ29sbGFwc2UgPSBhbmd1bGFyLmlzRGVmaW5lZCgkYXR0cnMuaXNDb2xsYXBzZSkgPyAkc2NvcGUuJGV2YWwoJGF0dHJzLmlzQ29sbGFwc2UpIDogZmFsc2U7XHJcbiAgICAgICAgbGV0IG5hdnM6IEFycmF5PFV0aWxOYXY+ID0gW107XHJcbiAgICAgICAgbGV0IHNpbmdsZU5hdnM6IEFycmF5PFV0aWxOYXZTaW5nbGU+ID0gW107XHJcbiAgICAgICAgLy8g57uf5LiA5omT5byA5a+86Iiq5qCP57uEXHJcbiAgICAgICAgdGhpcy5nb3RPcGVuZWQgPSBmdW5jdGlvbiAoc2VsZWN0ZWROYXY6IFV0aWxOYXYpIHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG5hdnMsIGZ1bmN0aW9uIChuYXY6IFV0aWxOYXYpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE5hdiAhPSBuYXYpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXYuc2hvd01lID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIOe7n+S4gOaYvuekuuWvvOiIquagj+aWh+Wtl+S/oeaBr1xyXG4gICAgICAgIHRoaXMuc2hvd1RleHQgPSBmdW5jdGlvbiAoZmxhZzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZSA9ICFmbGFnOyAvLyDkv53mjIHmlbTkuKppc0NvbGxhcHNl55qE5LiA6Ie0XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChuYXZzLCBmdW5jdGlvbiAobmF2OiBVdGlsTmF2KSB7XHJcbiAgICAgICAgICAgICAgICBuYXYuaGlkZVRleHQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8vbmF2LmhpZGVUZXh0ID0gIWZsYWc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc2luZ2xlTmF2cywgZnVuY3Rpb24gKG5hdjogVXRpbE5hdikge1xyXG4gICAgICAgICAgICAgICAgbmF2LmhpZGVUZXh0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL25hdi5oaWRlVGV4dCA9ICFmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDmt7vliqDlr7zoiKrmoI/liLDnvJPlrZjkuK1cclxuICAgICAgICB0aGlzLmFkZE5hdiA9IGZ1bmN0aW9uIChuYXY6IFV0aWxOYXYpIHtcclxuICAgICAgICAgICAgbmF2cy5wdXNoKG5hdik7XHJcbiAgICAgICAgICAgIG5hdi5oaWRlVGV4dCA9ICRzY29wZS5pc0NvbGxhcHNlO1xyXG4gICAgICAgICAgICAvLyDlr7nmiYDmnInms6jlhoznmoRuYXbov5vooYzliJ3lp4vljJblgLznmoTorr7nva5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDlop7liqDnroDljZXlr7zoiKrmoI/liLDnvJPlrZjkuK1cclxuICAgICAgICB0aGlzLmFkZFNpbmdsZU5hdiA9IGZ1bmN0aW9uIChuYXY6IFV0aWxOYXZTaW5nbGUpIHtcclxuICAgICAgICAgICAgc2luZ2xlTmF2cy5wdXNoKG5hdik7XHJcbiAgICAgICAgICAgIG5hdi5oaWRlVGV4dCA9ICRzY29wZS5pc0NvbGxhcHNlO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJblr7zoiKrlt6XlhbfmnaFcclxuICAgICAgICB0aGlzLmluaXRVdGlsTmF2VG9vbCA9IGZ1bmN0aW9uIChuYXZUb29sOiBVdGlsTmF2VG9vbCkge1xyXG4gICAgICAgICAgICBuYXZUb29sLmlzQ29sbGFwc2UgPSAkc2NvcGUuaXNDb2xsYXBzZTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBVdGlsTmF2VG9vbCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXRpbE5hdlRvb2woKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0NvbGxhcHNlOiBib29sZWFuO1xyXG4gICAgdG9nZ2xlOiBGdW5jdGlvbjtcclxuICAgIHJlc3RyaWN0ID0gXCJFQ0FNXCI7XHJcbiAgICByZXBsYWNlID0gdHJ1ZTtcclxuICAgIHJlcXVpcmUgPSAnXj91dGlsTmF2Q29udGFpbmVyJztcclxuICAgIHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJ1LW5hdi1jb250cm9sLWJ0biBmLXVzblwiIG5nLWNsaWNrPVwidG9nZ2xlKClcIiBuZy1jbGFzcz1cIntcXCdpcy1jb2xsYXBzZSB1LXJlLWJ0blxcJzogaXNDb2xsYXBzZX1cIj48L2Rpdj4nO1xyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogVXRpbE5hdlRvb2wsIGlFbGVtZW50OiBhbnksIGlBdHRyczogYW55LCBuYXZDb250cm9sbGVyOiBVdGlsTmF2Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmF2Q29udHJvbGxlci5pbml0VXRpbE5hdlRvb2woc2NvcGUpO1xyXG4gICAgICAgIHNjb3BlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuaXNDb2xsYXBzZSA9ICFzY29wZS5pc0NvbGxhcHNlO1xyXG4gICAgICAgICAgICBuYXZDb250cm9sbGVyLnNob3dUZXh0KCFzY29wZS5pc0NvbGxhcHNlKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBVdGlsTmF2IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxOYXYoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd01lOiBib29sZWFuO1xyXG4gICAgcHVibGljIGhpZGVUZXh0OiBib29sZWFuO1xyXG4gICAgcHVibGljIGFkZENvbnRlbnQ6IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIHNob3dOb3dUYWdnbGU6IEZ1bmN0aW9uO1xyXG5cclxuICAgIHJlc3RyaWN0ID0gXCJFQ0FNXCI7XHJcbiAgICByZXBsYWNlID0gdHJ1ZTtcclxuICAgIHRyYW5zY2x1ZGUgPSB0cnVlO1xyXG4gICAgcmVxdWlyZSA9ICdeP3V0aWxOYXZDb250YWluZXInO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgZXhwYW5kZXJUaXRsZTogJ0AnLFxyXG5cclxuICAgIH07XHJcbiAgICB0ZW1wbGF0ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJzxkaXY+JyArXHJcbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwidS1uYXYtaGVhZGVyIGYtdXNuIGYtY2ZiXCIgbmctY2xpY2s9XCJ0b2dnbGUoKVwiPicgK1xyXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJoZWFkZXItaWNvbi1jbnRyIGYtY2ZiXCI+JyArXHJcbiAgICAgICAgICAgICc8aSBjbGFzcz1cImhlYWRlci1pY29uXCIgbmctY2xhc3M9XCJ7XFwnei1oaWRlXFwnOiFzaG93TWUsXFwnei1zaG93XFwnOnNob3dNZX1cIj48L2k+JyArXHJcbiAgICAgICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImhlYWRlci10ZXh0XCIgbmctY2xhc3M9XCJ7XFwnei1uby10ZXh0XFwnOiBoaWRlVGV4dH1cIiBuZy1iaW5kPVwiZXhwYW5kZXJUaXRsZVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICAgJzwvZGl2PicgK1xyXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInUtbmF2LWNvbnRlbnRcIiBuZy1jbGFzcz1cIntcXCd6LWNvbnRlbnQtaGlkZGVuXFwnOiFzaG93TWV9XCIgbmctdHJhbnNjbHVkZT48L2Rpdj4nICtcclxuICAgICAgICAgICAgJzwvZGl2Pic7XHJcbiAgICB9O1xyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IGFueSkge1xyXG4gICAgICAgIGxldCBjb250ZW50czogQXJyYXk8VXRpbE5hdkNvbnRlbnQ+ID0gW107XHJcblxyXG4gICAgICAgICRzY29wZS5zaG93VGV4dCA9IGZ1bmN0aW9uIChmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjb250ZW50cywgZnVuY3Rpb24gKGNvbnRlbnQ6IFV0aWxOYXZDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmhpZGVUZXh0ID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIC8vIGNvbnRlbnQuaGlkZVRleHQgPSBmbGFnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnNob3dOb3dUYWdnbGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93TWUgPSAhJHNjb3BlLnNob3dNZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuYWRkQ29udGVudCA9IGZ1bmN0aW9uIChjb250ZW50OiBVdGlsTmF2Q29udGVudCkge1xyXG4gICAgICAgICAgICBjb250ZW50cy5wdXNoKGNvbnRlbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBpRWxlbWVudDogYW55LCBpQXR0cnM6IGFueSwgbmF2Q29udHJvbGxlcjogVXRpbE5hdkNvbnRhaW5lcikge1xyXG4gICAgICAgIHNjb3BlLnNob3dNZSA9IGZhbHNlO1xyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnaGlkZVRleHQnLCBmdW5jdGlvbiAobmV3VmFsOiBib29sZWFuLCBvbGRWYWw6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gb2xkVmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5zaG93VGV4dChuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbmF2Q29udHJvbGxlci5hZGROYXYoc2NvcGUpO1xyXG4gICAgICAgIHNjb3BlLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2hvd01lID0gIXNjb3BlLnNob3dNZTtcclxuICAgICAgICAgICAgbmF2Q29udHJvbGxlci5nb3RPcGVuZWQoc2NvcGUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBVdGlsTmF2Q29udGVudCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsTmF2Q29udGVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoaWRlVGV4dDogYm9vbGVhbjtcclxuXHJcbiAgICByZXN0cmljdCA9IFwiRUNBTVwiO1xyXG4gICAgcmVwbGFjZSA9IHRydWU7XHJcbiAgICByZXF1aXJlID0gJ14/dXRpbE5hdic7XHJcbiAgICB0cmFuc2NsdWRlOiB0cnVlO1xyXG5cclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGNvbnRlbnRJY29uOiAnQCcsXHJcbiAgICAgICAgY29udGVudEtleTogJ0AnLFxyXG4gICAgICAgIGNvbnRlbnROYW1lOiAnQCcsXHJcbiAgICAgICAgY3VycmVudFJvdXRlcjogJz0nXHJcbiAgICB9O1xyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBpRWxlbWVudDogYW55LCBpQXR0cnM6IGFueSwgbmF2Q3RybDogVXRpbE5hdikge1xyXG4gICAgICAgIGlmIChzY29wZS5jdXJyZW50Um91dGVyID09PSBzY29wZS5jb250ZW50S2V5KSB7XHJcbiAgICAgICAgICAgIG5hdkN0cmwuc2hvd05vd1RhZ2dsZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuYXZDdHJsLmFkZENvbnRlbnQoc2NvcGUpO1xyXG4gICAgfTtcclxuICAgIHRlbXBsYXRlID1cclxuICAgICAgICAnPGEgY2xhc3M9XCJjb250ZW50IGktaG92ZXJcIiB1aS1zcmVmLWFjdGl2ZT1cInotYWN0aXZlXCIgdWktc3JlZj1cInt7Y29udGVudEtleX19XCI+JyArXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiY29udGVudC1pY29uLWNudHJcIj4nICtcclxuICAgICAgICAnPGkgY2xhc3M9XCJjb250ZW50LWljb24gaS17e2NvbnRlbnRJY29ufX1cIj48L2k+JyArXHJcbiAgICAgICAgJzwvc3Bhbj4nICtcclxuICAgICAgICAnPHNwYW4gY2xhc3M9XCJjb250ZW50LXRleHQgZi10b2VcIiBuZy1jbGFzcz1cIntcXCd6LW5vLXRleHRcXCc6IGhpZGVUZXh0fVwiIG5nLWJpbmQ9XCJjb250ZW50TmFtZVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAnPC9hPic7XHJcbn1cclxuXHJcbmNsYXNzIFV0aWxOYXZTaW5nbGUge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxOYXZTaW5nbGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlVGV4dDogYm9vbGVhbjtcclxuICAgIHJlc3RyaWN0ID0gXCJFQ0FNXCI7XHJcbiAgICByZXBsYWNlID0gdHJ1ZTtcclxuICAgIHJlcXVpcmUgPSAnXj91dGlsTmF2Q29udGFpbmVyJztcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIGNvbnRlbnRJY29uOiAnQCcsXHJcbiAgICAgICAgY29udGVudEtleTogJ0AnLFxyXG4gICAgICAgIGNvbnRlbnROYW1lOiAnQCdcclxuICAgIH07XHJcbiAgICBsaW5rID0gZnVuY3Rpb24gKHNjb3BlOiBhbnksIGlFbGVtZW50OiBhbnksIGlBdHRyczogYW55LCBuYXZDb250cm9sbGVyOiBVdGlsTmF2Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmF2Q29udHJvbGxlci5hZGRTaW5nbGVOYXYoc2NvcGUpO1xyXG4gICAgfTtcclxuICAgIHRlbXBsYXRlID0gJzxkaXYgY2xhc3M9XCJ1LW5hdi1jb250ZW50XCI+PGEgY2xhc3M9XCJjb250ZW50XCIgdWktc3JlZi1hY3RpdmU9XCJ6LWFjdGl2ZVwiIHVpLXNyZWY9XCJ7e2NvbnRlbnRLZXl9fVwiPicgK1xyXG4gICAgICAgICc8c3BhbiBjbGFzcz1cImNvbnRlbnQtaWNvbi1jbnRyXCI+JyArXHJcbiAgICAgICAgJzxpIGNsYXNzPVwiY29udGVudC1pY29uIGkte3tjb250ZW50SWNvbn19XCI+PC9pPicgK1xyXG4gICAgICAgICc8L3NwYW4+JyArXHJcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwiY29udGVudC10ZXh0IGYtdG9lXCIgbmctY2xhc3M9XCJ7XFwnei1uby10ZXh0XFwnOiBoaWRlVGV4dH1cIiBuZy1iaW5kPVwiY29udGVudE5hbWVcIj48L3NwYW4+JyArXHJcbiAgICAgICAgJzwvYT4nICtcclxuICAgICAgICAnPC9kaXY+JztcclxufVxyXG5cclxuYXBwLmRpcmVjdGl2ZSgndXRpbE5hdkNvbnRhaW5lcicsIFV0aWxOYXZDb250YWluZXIuaW5zdGFuY2UpO1xyXG5hcHAuZGlyZWN0aXZlKCd1dGlsTmF2VG9vbCcsIFV0aWxOYXZUb29sLmluc3RhbmNlKTtcclxuYXBwLmRpcmVjdGl2ZSgndXRpbE5hdicsIFV0aWxOYXYuaW5zdGFuY2UpO1xyXG5hcHAuZGlyZWN0aXZlKCd1dGlsTmF2Q29udGVudCcsIFV0aWxOYXZDb250ZW50Lmluc3RhbmNlKTtcclxuYXBwLmRpcmVjdGl2ZSgndXRpbE5hdlNpbmdsZScsIFV0aWxOYXZTaW5nbGUuaW5zdGFuY2UpOyJdfQ==
