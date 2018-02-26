import {app} from "../../../common/app/main.app";
import {OperateForFaceLibEnum} from "../../../../core/entity/ex/UserRoleDataEx";

class FacelibSelectDirective {
    static $inject: Array<string> = [];

    static instance() {
        return new FacelibSelectDirective();
    }

    restrict: string = 'E';
    replace: Boolean = true;
    transclude: Boolean = true;
    scope: any = {
        slideData: "=",       //初始下拉数据 []
        slideClick: "&",      //点击事件  function(selected){}  必传同名参数：即 返回值为选中值
    };
    controllerAs = 'facelibSelectDirective';      //控制器
    template = function (element: any, attrs: any) {
        return `
            <span 
            style="position: relative;width: 108px;height: 26px;display:block;margin-top: 12px;padding:0;line-height: 26px;text-align: center" 
            ng-class="{'isEnable':slideData.IsEnabled}">
                {{slideData.SlideIndex>=0?slideData.SlideList[slideData.SlideIndex].text:slideData.text}}
                <ul>
                    <li 
                    ng-repeat="(index,item) in slideData.SlideList" ng-click="facelibSelectDirective.slideClick($event,item,index)">
                    {{item.text}}</li>
                </ul>
            </span>
        `
    };
    slideClick: Function;
    showSlideFn: Function;
    hideSlideFn: Function;
    isShowSlide: boolean = false;
    controller = function ($scope: any) {
        let vm = this as FacelibSelectDirective;
        vm.slideClick = function (event:MouseEvent,item: OperateForFaceLibEnum, index: number) {
            event.stopPropagation();
            $scope.slideClick({result: item, index: index})
        };
        vm.showSlideFn = function () {
            vm.isShowSlide = true;
        };
        vm.hideSlideFn = function () {
            vm.isShowSlide = false;
        }
    };
    link = function (scope: any, element: any, attrs: any) {
        element.on('mouseover', function () {
            element.find('ul').show()
        });
        element.on('click', function (event:MouseEvent) {
            event.stopPropagation();
            scope.slideClick({result: null, index: -1})
        });
        element.on('mouseout', function () {
            element.find('ul').hide()
        });
        element.find('ul').on('mouseover', function () {
            element.find('ul').show()
        });
    }
}

app.directive("facelibSelect", FacelibSelectDirective.instance);