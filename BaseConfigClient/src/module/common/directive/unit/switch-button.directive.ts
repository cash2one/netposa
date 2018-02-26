import {app} from '../../app/main.app';
import 'angular';
import "css!./switch-button";

declare let $: any;
declare let window: any;

class switchButtonDirective {
    static $inject: Array<string> = ['$scope', '$timeout'];

    constructor() {
    }

    static instance() {
        return new switchButtonDirective();
    }

    restrict: string = 'AE';
    replace: true;
    require = "^ngModel";
    scope: any = {
        disabled: '=',
        changeStatus:'&'
    };
    controllerAs = "switchButtonDirective";
    transclude: false;
    template = (element: any, attrs: any) => {
        return `
            <i class="switch ${attrs.class ? ' ' + attrs.class : ''}" 
            ng-class="{checked:ngModelValue, disabled:${attrs.disabled}}"
            ng-click="changeVal($event)">
                <small></small>
                <input style="visibility: hidden" type="checkbox" ng-checked="ngModelValue" name="${attrs.name ? attrs.name : ''}"
            </i>
        `;
    };
    controller = ($scope:any,$timeout:any)=>{
        $scope.changeVal = () => {
            if($scope.disabled !== true){
                $scope.ngModelValue = !$scope.ngModelValue;
                $scope.ngModelController.$setViewValue($scope.ngModelValue);
                if($scope.changeStatus){
                    $timeout(()=>{
                        $scope.changeStatus({checked:$scope.ngModelValue })
                    })
                }
            }
        };
    };
    link = (scope: any, element: any, attrs: any, controller: any) => {
        scope.ngModelController = controller;
        scope.ngModelController.$parsers.push(function(viewValue: string){
            return viewValue;
        });
        scope.ngModelController.$formatters.push((modelValue: string) => {
            scope.ngModelValue = modelValue;
            return modelValue;
        });
        scope.$on('$destory',()=>{
            scope.ngModelController = null
        })
    }

}

app
    .directive('switchButton', switchButtonDirective.instance)
;


