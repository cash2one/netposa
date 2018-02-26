/// <amd-dependency path="text!./loading-animation.html" name="loadingAnimationHtml" />

import {app} from '../../app/main.app';
import "css!./loading-animation.css";
import 'angular';

declare let angular: any;
declare const loadingAnimationHtml: any;


class loadingAnimationDirective {
    static $inject: Array<string> = ['$compile', '$timeout'];

    isLoading: boolean;

    constructor() {
    }

    static instance() {
        return new loadingAnimationDirective();
    }

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = false;
    controllerAs = 'loadingAnimationCtrl';
    template = loadingAnimationHtml;
    scope = {
        isLoading: '=',  //控制动画显示隐藏 需要有一个有宽高的容器
        isShade: '='  //是否要遮招
    };

    controller = function ($scope: any, $element: any, $attrs: any) {
        let vm = this as loadingAnimationDirective;
        let $: any = angular.element;
        //是否需要遮罩
        if ($scope.isShade) {
            $(".m-loading").css('background', 'rgba(0,0,0,0.3)');
        }
        if ($element.parent().css('position') === 'static') {
            $element.parent().css('position', 'relative');
        }
        let _watch = $scope.$watch('isLoading', watchOption, true);

        function watchOption(newVal: any, oldVal: any) {
            vm.isLoading = !!newVal ? newVal : false;
        }

        $scope.$on('$destroy', () => {
            _watch();
        })

    };
}

app
    .directive('loadingAnimation', loadingAnimationDirective.instance);


