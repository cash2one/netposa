/**
 * Created by dell on 2017/4/20.
 */
import { app } from '../../app/main.app';
import 'angular';

declare let angular: any;

class UtilNavContainer {
    constructor() {
    }

    static instance = function () {
        return new UtilNavContainer();
    };

    public showText: Function;
    public addNav: Function;
    public gotOpened: Function;
    public addSingleNav: Function;
    public initUtilNavTool: Function;
    isCollapse: boolean;
    restrict = "ECAM";
    scope = {
        isCollapse: '=', // 是否隐藏文字信息, 此状态会与父controller中变量状态保持一直

    };
    controllerAs = 'navCntr';
    transclude = true;
    controller = function ($scope: UtilNavContainer) {
        //$scope.isCollapse = angular.isDefined($attrs.isCollapse) ? $scope.$eval($attrs.isCollapse) : false;
        let navs: Array<UtilNav> = [];
        let singleNavs: Array<UtilNavSingle> = [];
        // 统一打开导航栏组
        this.gotOpened = function (selectedNav: UtilNav) {
            angular.forEach(navs, function (nav: UtilNav) {
                if (selectedNav != nav) {
                    nav.showMe = false;
                }
            });
        };

        // 统一显示导航栏文字信息
        this.showText = function (flag: boolean) {
            $scope.isCollapse = !flag; // 保持整个isCollapse的一致
            angular.forEach(navs, function (nav: UtilNav) {
                nav.hideText = false;
                //nav.hideText = !flag;
            });
            angular.forEach(singleNavs, function (nav: UtilNav) {
                nav.hideText = false;
                //nav.hideText = !flag;
            });
        };

        // 添加导航栏到缓存中
        this.addNav = function (nav: UtilNav) {
            navs.push(nav);
            nav.hideText = $scope.isCollapse;
            // 对所有注册的nav进行初始化值的设置
        };

        // 增加简单导航栏到缓存中
        this.addSingleNav = function (nav: UtilNavSingle) {
            singleNavs.push(nav);
            nav.hideText = $scope.isCollapse;

        };

        // 初始化导航工具条
        this.initUtilNavTool = function (navTool: UtilNavTool) {
            navTool.isCollapse = $scope.isCollapse;
        }
    };
}

class UtilNavTool {
    constructor() {

    }

    static instance() {
        return new UtilNavTool();
    }

    isCollapse: boolean;
    toggle: Function;
    restrict = "ECAM";
    replace = true;
    require = '^?utilNavContainer';
    template = '<div class="u-nav-control-btn f-usn" ng-click="toggle()" ng-class="{\'is-collapse u-re-btn\': isCollapse}"></div>';
    link = function (scope: UtilNavTool, iElement: any, iAttrs: any, navController: UtilNavContainer) {
        navController.initUtilNavTool(scope);
        scope.toggle = function () {
            scope.isCollapse = !scope.isCollapse;
            navController.showText(!scope.isCollapse);
        };
    }
}

class UtilNav {
    constructor() {
    }

    static instance() {
        return new UtilNav();
    }

    public showMe: boolean;
    public hideText: boolean;
    public addContent: Function;
    public showNowTaggle: Function;

    restrict = "ECAM";
    replace = true;
    transclude = true;
    require = '^?utilNavContainer';
    scope = {
        expanderTitle: '@',

    };
    template = function () {
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
    controller = function ($scope: any) {
        let contents: Array<UtilNavContent> = [];

        $scope.showText = function (flag: boolean) {
            angular.forEach(contents, function (content: UtilNavContent) {
                content.hideText = false
                // content.hideText = flag;
            });
        };

        this.showNowTaggle = function () {
            $scope.showMe = !$scope.showMe;
        };
        this.addContent = function (content: UtilNavContent) {
            contents.push(content);
        };
    };
    link = function (scope: any, iElement: any, iAttrs: any, navController: UtilNavContainer) {
        scope.showMe = false;
        scope.$watch('hideText', function (newVal: boolean, oldVal: boolean) {
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

class UtilNavContent {
    constructor() {
    }

    static instance() {
        return new UtilNavContent();
    }

    public hideText: boolean;

    restrict = "ECAM";
    replace = true;
    require = '^?utilNav';
    transclude: true;

    scope = {
        contentIcon: '@',
        contentKey: '@',
        contentName: '@',
        currentRouter: '='
    };
    link = function (scope: any, iElement: any, iAttrs: any, navCtrl: UtilNav) {
        if (scope.currentRouter === scope.contentKey) {
            navCtrl.showNowTaggle();
        }
        navCtrl.addContent(scope);
    };
    template =
        '<a class="content i-hover" ui-sref-active="z-active" ui-sref="{{contentKey}}">' +
        '<span class="content-icon-cntr">' +
        '<i class="content-icon i-{{contentIcon}}"></i>' +
        '</span>' +
        '<span class="content-text f-toe" ng-class="{\'z-no-text\': hideText}" ng-bind="contentName"></span>' +
        '</a>';
}

class UtilNavSingle {

    constructor() {
    }

    static instance() {
        return new UtilNavSingle();
    }

    hideText: boolean;
    restrict = "ECAM";
    replace = true;
    require = '^?utilNavContainer';
    scope = {
        contentIcon: '@',
        contentKey: '@',
        contentName: '@'
    };
    link = function (scope: any, iElement: any, iAttrs: any, navController: UtilNavContainer) {
        navController.addSingleNav(scope);
    };
    template = '<div class="u-nav-content"><a class="content" ui-sref-active="z-active" ui-sref="{{contentKey}}">' +
        '<span class="content-icon-cntr">' +
        '<i class="content-icon i-{{contentIcon}}"></i>' +
        '</span>' +
        '<span class="content-text f-toe" ng-class="{\'z-no-text\': hideText}" ng-bind="contentName"></span>' +
        '</a>' +
        '</div>';
}

app.directive('utilNavContainer', UtilNavContainer.instance);
app.directive('utilNavTool', UtilNavTool.instance);
app.directive('utilNav', UtilNav.instance);
app.directive('utilNavContent', UtilNavContent.instance);
app.directive('utilNavSingle', UtilNavSingle.instance);