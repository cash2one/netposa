
/// <amd-dependency path="text!./secondaryNav.html" name="secondaryNav" />
declare let secondaryNav: any;

declare const angular: any;

import {app} from '../../app/main.app';
import 'css!./secondaryNav.css';
/**
 * @ngdoc directive
 * @name utilToggle
 * @module common
 * @restrict E
 *
 * @description
 * 开关选择动作，返回改变 参数boolean 值
 * @param toggle-open  : boolean 设置默认选择，boolean类型，若不传默认 false 关闭
 *          toggle-disable :boolean 设置是否有效 开关，boolean类型，若不传默认 false 有效
 *          toggle-change  :function 点击改变 开关触发回调函数。 返回当前 状态
 * ```html
 * <util-toggle toggle-open="booleanParam" toggle-disable="booleanParam" toggle-change="callBackFun(isOpen)"></util-toggle>
 * ```
 */
class UtilSecNavDirective {
    constructor(){

    }
    static instance() {
        return new UtilSecNavDirective();
    }

    restrict: string = 'E';
    replace: boolean = true;
    transclude: boolean = true;
    template:string = secondaryNav;
    scope = {
        current:'@',
    };

    controllerAs: 'secNavCtrl';
    controller = function ($scope: any, $element: any, $attrs: any,$compile: any) {

    };
    link = function($scope: any,$element: any, attr: any,ngModelController:any) {
        $scope.items = [
            {url:"intelligentretrieval.trailanalysis",className:'nav-ico-trail',title:'轨迹分析'},
            {url:"intelligentretrieval.faceretrieval",className:'nav-ico-face',title:'人脸检索'},
            {url:"intelligentretrieval.alarmretrieval",className:'nav-ico-alarm',title:'报警检索'},
            {url:"intelligentretrieval.retrievalrecord",className:'nav-ico-record',title:'检索记录'}
            //{url:"intelligentretrieval.trailanalysis",className:'nav-ico-trail'},
            //{url:"intelligentretrieval.faceretrieval",className:'nav-ico-face'},
            //{url:"intelligentretrieval.alarmretrieval",className:'nav-ico-alarm'},
            //{url:"intelligentretrieval.retrievalrecord",className:'nav-ico-record'}
        ]
    }
}

app.directive('utilSecNav', UtilSecNavDirective.instance);