import "css!./util-selects.css";
import { app } from "../../app/main.app";


declare let angular: any, $: any, require: any;


/**
 * @selectData 待选择数据
 * @selectRepeatByKey 数据中唯一标识的key
 * @selectNameKey 数据中用于显示的name key
 * @selectVal 当前选择的对象 用于回显，多选是对象集合
 * @selectClick function 选择后的回调多选是集合，但是是对象
 * @placeholder 提示语
 * @isMutile 是否多选 默认false
 * @isColor 是否颜色 运维模块使用 默认false
 */
class utilSelectsDirective {
    static $inject: Array<string> = [];

    constructor() {
    };

    static instance() {
        return new utilSelectsDirective()
    }

    restrict: string = 'AE';
    replace: Boolean = true;
    transclude: Boolean = true;
    scope: any = {
        selectData: "=",       //初始下拉数据 []
        selectRepeatByKey: "@",//循环输出值对应的key
        selectNameKey: '@',
        selectVal: "=",      //初始选中的值
        selectClick: "&",      //点击事件  function(selected){}  必传同名参数：即 返回值为选中值
    };
    controllerAs = 'utilSelectsDirective';      //控制器
    template = function (element: any, attrs: any) {
        return `
        <span class="util-selects-directive ${attrs.class ? attrs.class : ''}">
            <span class="util-selects-droplist" ng-class="{placeholder:utilSelectsDirective.isNoSelect,activeSelect:utilSelectsDirective.showDropList}" ng-click="utilSelectsDirective.showDropListFn()">
                {{utilSelectsDirective.selectValText}}
            </span>
            <ul class="dropBoxList" ng-show="utilSelectsDirective.showDropList" ng-scrollbars>
                <li ng-repeat="item in utilSelectsDirective.selectDataList" ng-class="{selected:item.isChecked}">
                    <span class="checkboxStyle"  ng-click="utilSelectsDirective.selectItem(item)">
                        <i ng-if="utilSelectsDirective.isMutile" class="inputCheck" ng-class="{checked:item.isChecked}"></i>
                        <span class="checkboxTitle">{{item.text}}</span>
                        <span ng-if="utilSelectsDirective.isColor" class="areaColor" ng-style="{'background':'{{item.color}}'}"></span>
                    </span>
                </li>
            </ul>
        </span>
        `
    };         //html模板
    showDropList: boolean; //下拉开关
    selectDataList: Array<{ [key: string]: any }>; //下拉列表数据
    selectedVal: Array<{ [key: string]: any }>;  //当前选中的值
    selectValText: string;
    key: string;
    name: string;
    selectItem: Function;
    showDropListFn: Function;
    isNoSelect: boolean;
    isMutile: boolean;
    isColor: boolean;
    controller = function ($scope: any, $element: any, $attrs: any) {
        let vm = this as utilSelectsDirective;
        vm.isMutile = $attrs.isMutile ? $scope.$eval($attrs.isMutile) : false;
        vm.isColor = $attrs.isColor ? $scope.$eval($attrs.isColor) : false;
        vm.selectItem = function (item: { [key: string]: any }) {
            if (vm.isMutile) {
                item.isChecked = !item.isChecked;
                if (item.isChecked) {
                    vm.selectedVal.push(item)
                } else {
                    for (let i = 0; i < vm.selectedVal.length; i++) {
                        let item2 = vm.selectedVal[i];
                        if (item[vm.key] === item2[vm.key]) {
                            vm.selectedVal.splice(i, 1);
                            break;
                        }
                    }
                }
            } else {
                vm.selectedVal = [item];
                vm.showDropList = false;
            }
            vm.selectValText = setSelectValText();
            if (vm.isMutile) {
                $scope.selectClick({ selectVal: vm.selectedVal })
            } else {
                $scope.selectClick({ selectVal: vm.selectedVal[0] })
            }
        };
        vm.showDropListFn = function () {
            vm.showDropList = !vm.showDropList;
        };
        init();
        function init() {
            if (!Array.isArray($scope.selectData)) {
                console.warn('selectData type error');
                return false;
            } else {
                vm.selectDataList = $scope.selectData
            }
            if (!$scope.selectRepeatByKey) {
                vm.key = 'ID'
            } else {
                vm.key = $scope.selectRepeatByKey
            }
            if (!$scope.selectNameKey) {
                vm.name = 'Name'
            } else {
                vm.name = $scope.selectNameKey
            }
            // console.log(vm.isMutile, $scope)
            if (!$scope.selectVal) {
                vm.selectedVal = [];
            } else {
                if (vm.isMutile) {
                    vm.selectedVal = $scope.selectVal;

                } else {
                    vm.selectedVal = [$scope.selectVal]
                }
            }
            vm.selectValText = setSelectValText();

            vm.selectDataList.forEach((item: { [key: string]: any }) => {
                for (let i = 0; i < vm.selectedVal.length; i++) {
                    let item2 = vm.selectedVal[i] as { [key: string]: any };
                    if (item[vm.key] === item2[vm.key]) {
                        item.isChecked = true;
                        break;
                    }
                }
                if (!item.isChecked) {
                    item.isChecked = false;
                }
            });


            vm.showDropList = false;
        }

        function setSelectValText() {
            if (vm.selectedVal.length === 0) {
                vm.isNoSelect = true;
                return $attrs.placeholder || ''
            } else {
                vm.isNoSelect = false;
            }
            if (vm.selectedVal.length <= 3) {
                return vm.selectedVal.map((item: any) => item[vm.name]).join(',')
            }
            if (vm.selectedVal.length > 3) {
                return '当前已选中' + vm.selectedVal.length + '项'
            }
        }

        $scope.$watch('selectData', (val: any) => {
            console.warn(val, "select data is changed");
            init();
        })
    };

    link = function (scope: any, element: Element, attr: any) {

    }
}

app.directive('utilSelects', utilSelectsDirective.instance);