/// <amd-dependency path="text!./layout.directive.button.html" name='layoutDirectiveButtonHtml' />
import {app} from "../../app/main.app";
import "css!./layout.button.css";
declare var layoutDirectiveButtonHtml:any;

/**
 * layout布局指令, 主要用于按钮指令触发后, 联动其他对应的content进行状态的变化
 */

const LayoutToggleTypeEnum = {
    expand: "expand", // 展开
    unExpand: "unExpand" // 收起
};

const LayoutPositionTypeEnum = {
    left: "left", // 左侧
    right: "right", // 右侧
    top: "top", // 上方
    bottom: "bottom" // 下方
};

class LayoutContainerDirective{
    static $inject = ['$scope'];

    static instance = function(){
        return new LayoutContainerDirective();
    };

    initContent: Function;
    toggle: (toggleType: string, position: string)=>void;

    scope = {};
    controllerAs = "layoutContainerCtrl";
    controller = function($scope: any){
        let vm = this as LayoutContainerDirective;
        let _cacheContentScope: LayoutContentDirective;
        $scope.$on("$destroy", ()=>{
            console.log("销毁LayoutContainerDirective");
            _cacheContentScope = null;
        });
        vm.initContent = initContent;
        vm.toggle = toggle;

        function initContent(scope: LayoutContentDirective){
            _cacheContentScope = scope;
        }

        /**
         * 展开或收起触发事件
         * @param toggleType
         */
        function toggle(toggleType: string, position: string){
            if(_cacheContentScope){
                // 侧边栏(按钮)展开就相当于content收缩, 侧边栏(按钮)收缩就相当于content展开
                if(toggleType === LayoutToggleTypeEnum.expand){
                    _cacheContentScope.toggle(LayoutToggleTypeEnum.unExpand, position);
                }else if(toggleType === LayoutToggleTypeEnum.unExpand){
                    _cacheContentScope.toggle(LayoutToggleTypeEnum.expand, position);
                }else{
                    console.error("toggle.toggleType param is not match!");
                }
            }
        }

    };
}
/**
 * 布局展开收起按钮指令
 */

class LayoutButtonDirective{
    static $inject = ['$scope','$compile','$timeout'];

    static instance = function(){
        return new LayoutButtonDirective();
    };

    restrict = "A";
    scope = {
        layoutPosition: '@', // 当前指令layout所属方位, left, right, bottom, top;
        defaultStatus: '@', // expander, unExpander
    };
    require = '^utilLayoutContainer';
    controller = function($scope: any, $compile: any, $timeout: any){
        $scope.$compile = $compile;
        $scope.$timeout = $timeout;
    };
    controllerAs = "layoutButtonDirectiveCtrl";
    link = function(scope: any, element: any, attrs: any, controller: LayoutContainerDirective){

        // 初始化样式
        _init();
        scope.change = change;
        scope.$timeout(()=>{
            // 根据初始化配置主动改变实际内容栏的样式
            controller.toggle(scope.defaultStatus, scope.layoutPosition);
        });

        function _init(){
            element.addClass("u-layout-button-mn");
            element.append(scope.$compile(layoutDirectiveButtonHtml)(scope));
            // 先初始化改变自身的样式
            scope.$timeout(()=>{
                _changeSelfContainer(scope.defaultStatus, scope.layoutPosition);
            });
        }

        function change(){

            if(scope.defaultStatus === LayoutToggleTypeEnum.expand){
                scope.defaultStatus = LayoutToggleTypeEnum.unExpand;
            }else{
                scope.defaultStatus = LayoutToggleTypeEnum.expand;
            }
            _changeSelfContainer(scope.defaultStatus, scope.layoutPosition);
            controller.toggle(scope.defaultStatus, scope.layoutPosition);
        }

        /**
         * 改变自身样式
         * @private
         */
        function _changeSelfContainer(status: string, position: string){
            switch(status){
                case LayoutToggleTypeEnum.expand:
                    // 展开操作
                    element.removeClass("z-" + position + "-hide");
                    element.children(".u-layout-button").removeClass("z-"+position+"-hide");
                    break;
                case LayoutToggleTypeEnum.unExpand:
                    // 收起操作
                    element.addClass("z-" + position + "-hide");
                    element.children(".u-layout-button").addClass("z-"+position+"-hide");
                    break;
                default:
                    console.error("default-status params value is not match!");
                    break;
            }
        }

    }

}
class LayoutContentDirective{
    static $inject = ['$scope'];
    static instance = function(){
        return new LayoutContentDirective();
    };
    toggle: (toggleType: string, positionType: string)=>void;
    restrict = "A";
    scope = {};
    require = '^utilLayoutContainer';
    controllerAs: "layoutContentDirectiveCtrl";
    link = function(scope: any, element: any, attrs: any, controller: LayoutContainerDirective){
        element.addClass("u-layout-content");
        scope.toggle = toggle;
        controller.initContent(scope);

        function toggle(toggleType: string, positionType: string){
            console.log("content.toggle", toggleType, positionType,"z-"+positionType+"-show");
            if(toggleType === LayoutToggleTypeEnum.expand){
                element.addClass("z-"+positionType+"-show");
            }else{
                element.removeClass("z-"+positionType+"-show");
            }
        }
    }
}

app.directive("utilLayoutContainer",LayoutContainerDirective.instance);
app.directive("utilLayoutButton",LayoutButtonDirective.instance);
app.directive("utilLayoutContent",LayoutContentDirective.instance);
