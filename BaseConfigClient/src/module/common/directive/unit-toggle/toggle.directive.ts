
/// <amd-dependency path="text!./toggle.html" name="toggleHtml" />
declare let toggleHtml: any;

declare const angular: any;

import {app} from '../../app/main.app';
import 'css!./toggle.css';
import 'angular';
/**
 * @ngdoc directive
 * @name utilToggle
 * @module common
 * @restrict E
 *
 * @description
 * 开关选择动作，返回改变 参数boolean 值
 * @param   toggle-status  : boolean 设置默认选择，boolean类型 控制当前界面开关按钮状态 双向绑定
 *          is-reverse: boolean 是否进行展现反转 为true情况下【toggleStatus为true 表现为关闭 为false 表现为开启】
 *          toggle-disable :boolean 设置按钮是否可以被点击，boolean类型，若不传默认 false 有效
 *          toggle-change  :function 点击改变 开关触发回调函数。 返回当前 状态(受is-reverse影响)
 *          toggle-custom-data: string 自定义传入的数据, 当触发toggleChange时会一起回传给controller
 * ```html
 * <util-toggle toggle-open="booleanParam" toggle-disable="booleanParam" toggle-change="callBackFun(isOpen)"></util-toggle>
 * ```
 */
class UtilToggleDirective {
    constructor(){

    }
    static instance() {
        return new UtilToggleDirective();
    }

    toggleStatus: boolean;
    toggleDisable: boolean;
    toggleCustomData: string;
    _isReverse: boolean;
    isReverse: string;
    _disabled: boolean;
    toggleChangeCallBack: Function;
    toggleChange: Function;
    changeUtilToggleIsOpen: Function;
    $observe: any;
    $eval: any;
    $on: any;
    $apply: any;
    ngModelController: any;

    restrict: string = 'AE';
    replace: boolean = true;
    transclude: boolean = true;
    template:string = toggleHtml;
    require = "^?ngModel"; // 包含两种模式 一种是普通展示模式 使用指令的html中没有加上ng-model 另一种是加上ng-model的
    scope = {
        isReverse: '@', // 是否对传入结果进行反转, 此项为true的时候, 如果传入的为true, 则toggleStatus表示按钮是关闭状态
        toggleStatus:'=?', // 是否开启的状态
        toggleDisable:'@', // 是否可用 true 禁用 false 启用
        toggleChange: '&',
        toggleCustomData: '@' // 传入的用户自定义的数据, 当触发toggleChange时,会一起传回给controller
    };

    // controllerAs: 'toggleCtrl'; alter: wyr 没有实际使用到
    controller = function ($scope: UtilToggleDirective, $element: any, $attrs: any,$compile: any,$timeout:any) {

        // 默认不反转
        $scope._isReverse = false;
        $attrs.$observe("isReverse", ()=>{
            $scope._isReverse = !!$scope.$eval($attrs.isReverse);
        });
        $attrs.$observe("toggleDisable", ()=>{
            $scope._disabled = !!$scope.$eval($attrs.toggleDisable);
        });

        // 默认不开启
        $scope.toggleChangeCallBack = function (flag: boolean) {
            $scope.toggleChange({status: flag, data: $scope.toggleCustomData});
        };
        $scope.changeUtilToggleIsOpen = function () {
            if($scope._disabled){
                return;
            }
            $scope.toggleStatus = !$scope.toggleStatus;
            // 若存在ng-model, 则改变ng-model的值
            if($scope.ngModelController){
                updateModel($scope.toggleStatus);
            }
            $scope.toggleChangeCallBack($scope.toggleStatus);
        };

        function updateModel(val: boolean){
            $scope.ngModelController.$setViewValue(val);
        }
    };
    link = function($scope: UtilToggleDirective,$element: any, attr: any,ngModelController:any) {
        let $on = $scope.$on("$destroy",function(){
            $scope.ngModelController = null;
            $on();
        });
        $scope.ngModelController = ngModelController;
        // ngModelController 两种情况 ngModelController存在 ngModelController不存在
        if(ngModelController){
            initNgModelController();
        }

        function initNgModelController(){
            // 设定view->model的规则
            ngModelController.$parsers.push(function(viewValue: boolean){
                // ng-model是什么字符串就是什么字符串, 所以暂不对界面显示的数据进行转换
                return viewValue;
            });

            // modelValue->viewValue
            ngModelController.$formatters.push(function(modelValue: boolean){
                // ng-model是什么字符串就是什么字符串, 所以暂不对ng-model进行界面展示的转换
                $scope.toggleStatus = modelValue;
            });
        }

    }
}


app
    .directive('utilToggle', UtilToggleDirective.instance)
;