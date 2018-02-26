/// <amd-dependency path="text!./progress.html" name='progressHtml' />
import {app} from "../../app/main.app";
import 'css!./progress.css';

declare let progressHtml: string, angular: any;

class ProgressDrective {
    static $inject: Array<string> = ['$scope', 'layer'];

    static instance() {
        return new ProgressDrective();
    }

    restrict: string = 'AE';
    template: string = progressHtml;
    replace: boolean = true;
    progressWidth: number;
    maxValue: number;
    nowValue: number;
    valueScale: number;
    scope: any = {
        nowValue: '=',
        maxValue: '=',
        minValue: '=',
        lengd: '@'
    };
    controllerAs = "progressDrective";
    controller: any = function ($scope: any, $element: any, $attrs: any) {
        this.lengd = $scope.lengd;
    };
    link: any = function (scope: any, element: any, attrs: any) {
        let vm = scope;
        vm.nowValue = scope.nowValue || 1;
        vm.progressWidth = vm.lengd - 35 - 4;
        vm.maxValue = vm.maxValue || 100;
        vm.minValue = vm.minValue || 1;
        vm.valueScale = vm.maxValue / vm.progressWidth;
        vm.point = {isTarget: false, start: 0, end: 0, reset: 0};
        vm.point.reset = Math.round(vm.nowValue / vm.valueScale);
        element.find('.progress-circle').css('left', vm.point.reset - 8);
        element.find('.progress-lang-now').css('width', vm.point.reset);

        element.find('.progress-lang').on('click', function (event: MouseEvent) {
            let x = event.offsetX;
            let v = event.offsetX * vm.valueScale;
            if (x >= vm.progressWidth || v >= 100) {
                x = vm.progressWidth;
                v = 100;
            }
            if (x < vm.minValue / vm.valueScale) {
                x = vm.minValue / vm.valueScale;
                v = vm.minValue
            }
            element.find('.progress-circle').css('left', (x - 8) + 'px');
            element.find('.progress-lang-now').css('width', x);
            vm.$apply(function () {
                vm.nowValue = Math.round(v);
            });
            vm.point.reset = element.find('.progress-circle').position().left;
        });


        element.find('.progress-circle').on('mousedown', function (event: MouseEvent) {
            vm.point.isTarget = true;
            vm.point.start = event.pageX;
            bindMouseMove()
        });
        angular.element(document).on('mouseup', function (event: MouseEvent) {
            vm.point.isTarget = false;
            vm.point.reset = element.find('.progress-circle').position().left;
            offMouseMove();
        });
        scope.$on('$destroy', function () {
            angular.element(document).off('mouseup');
            offMouseMove()
        });

        function bindMouseMove() {
            element.on('mousemove', function (event: MouseEvent) {
                event.preventDefault();
                if (vm.point.isTarget) {
                    vm.point.end = event.pageX;
                    let y = vm.point.end - vm.point.start + vm.point.reset;
                    vm.$apply(function () {
                        if (y * vm.valueScale >= 100) {
                            vm.nowValue = 100;
                            y = Math.round(100 / vm.valueScale);
                        } else if (y * vm.valueScale < vm.minValue) {
                            vm.nowValue = vm.minValue;
                            y = Math.round(vm.minValue / vm.valueScale);
                        } else {
                            vm.nowValue = Math.round(y * vm.valueScale);
                        }

                    });
                    element.find('.progress-lang-now').css('width', y);
                    element.find('.progress-circle').css('left', y - 8);
                }
            });
        }

        function offMouseMove() {
            element.off('mousemove')
        }
    }
}

app.directive('progressDrag', ProgressDrective.instance);