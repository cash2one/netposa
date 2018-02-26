/// <amd-dependency path="text!./uniquebutton.html" name='uniquebuttonHtml' />

import { app } from "../../app/main.app";
import "css!./uniquebutton.css";
declare var uniquebuttonHtml: string;
declare var angular: any;

/**
 * 按钮选择插件
 * 单选模式下, 选中的数据为value对应的数据
 * 多选模式下, 选中的数据放在一个数组中
 * 全选按钮点击后, 返回的数据默认为空数组[]
 */
class UniquebuttonDirective {

    static $inject = ["$scope", "$timeout"];

    constructor() {

    }

    static instance() {
        return new UniquebuttonDirective();
    }

    init: Function;
    // 只能执行一次
    initComplete: Function;
    // 重置默认选项
    resetSelect: Function;
    // 绑定ngmodel, 一个指令只执行一次
    initNgModelController: Function;
    select: (items: Array<any>) => void;
    buttonClick: Function;
    $timeout: any;
    valueLink: string;
    textLink: string;
    isMultiple: boolean;
    isShowAll: boolean;
    isResize: boolean;
    initNoClick: boolean;
    items: Array<any>;
    visualItems: Array<any>; // 由于不想改变原来的items值, 故在direcitve中重新定义一份插件实例, 用于控制界面选中/不选中展示效果
    ngModelController: any;
    defaultSelectByIndex: number;
    defaultSelectByValue: any;
    defaultSelectByText: string;

    restrict: string = "E";
    scope = {
        items: "=",
        buttonClick: "&",
        isResize: '@', // 是否允许点击自身还原选中状态
        isMultiple: '@', // 是否是多选, 为false则为单选
        isShowAll: '@', // 是否出现全选按钮
        defaultSelectByIndex: '@', // 默认选中的index, 支持多选, 多选参数设置方式为 参数1,参数2,参数3
        defaultSelectByValue: '@', // 默认选中的value, 支持多选, 多选参数设置方式为 参数1,参数2,参数3
        defaultSelectByText: '@', // 默认选中的text, 支持多选, 多选参数设置方式为 参数1,参数2,参数3
        valueLink: '@', // value对应的item里的字段
        textLink: '@', // text对应的item里的字段
        needTranslate: '@', // 传入的字段是否需要进行国际化转换
        initComplete: '&', // 初始化完成执行函数
        initNoClick: "@"
    };
    require = ["uniqueButton", "^ngModel"];
    template = uniquebuttonHtml;
    controllerAs = "uniqueBtnDirective";
    controller = function ($scope: any, $timeout: any) {
        var vm = this as UniquebuttonDirective;

        vm.init = init;
        vm.initNgModelController = initNgModelController;
        vm.select = select;
        vm.ngModelController = null;
        vm.visualItems;
        vm.items;
        vm.$timeout = $timeout;

        vm.resetSelect = resetSelect;

        /**
         * 重置选项
         */
        function resetSelect() {
            // TODO 这里先简单处理为初始化一次指令,以后看是否需要再修改, resolve: wyr
            init();
        }

        function init() {
            let valueLink = vm.valueLink;
            let textLink = vm.textLink;
            let defaultSelectByIndex = vm.defaultSelectByIndex;
            let defaultSelectByValue = vm.defaultSelectByValue;
            let defaultSelectByText = vm.defaultSelectByText;
            let initNoClick = vm.initNoClick;
            vm.visualItems = new Array<any>();
            angular.forEach(vm.items, (data: any) => {
                vm.visualItems.push({ value: data[valueLink], text: data[textLink] });
            });
            if (vm.isShowAll) {
                vm.visualItems.splice(0, 0, { value: "selectAll", text: "全选" });
            }


            if (defaultSelectByIndex != null) {
                select(_selectByDefault(vm.visualItems, defaultSelectByIndex, "index"));
            } else if (defaultSelectByValue) {
                select(_selectByDefault(vm.visualItems, defaultSelectByValue, "value"));
            } else if (defaultSelectByText) {
                select(_selectByDefault(vm.visualItems, defaultSelectByText, "text"));
            }

        }

        function _selectByDefault(items: Array<any>, target: any, type: string) {
            // console.log(items, target)
            let result: Array<any> = new Array<any>();
            let targetArr = (target + "").split(","); // + "" 为了将int转为string
            // 使用的jquery的each
            angular.element.each(items, (index: number, data: any) => {
                // 循环判断是否有相等的值
                angular.element.each(targetArr, (num: number, targetItem: any) => {
                    if (type === "index" && targetItem == index) {
                        result.push(data);
                        return false;
                    } else if (type === "value" && targetItem == data[type]) {
                        result.push(data);
                        return false;
                    } else if (type === "text" && targetItem == data[type]) {
                        result.push(data);
                        return false;
                    }
                });
            });
            return result;
        }

        /**
         * 初始化ngModelController, 只执行一次
         * @private
         */
        function initNgModelController() {
            let valueLink = vm.valueLink;
            vm.ngModelController.$parsers.push(function (viewValue: any) {
                if (!angular.isArray(viewValue)) {
                    return viewValue[valueLink];
                } else {
                    let arr = new Array<any>();
                    angular.forEach(viewValue, (value: any) => {
                        arr.push(value[valueLink]);
                    });
                    return arr;
                }
            });
        }

        /**
         * 按钮选中触发事件
         */
        function select(items: Array<any>) {

            if (!items || items.length <= 0) {
                console.error("uniquebutton.directive select error: items is null");
                return;
            }

            angular.forEach(items, (item: any) => {
                if (vm.isShowAll) {
                    // 显示全选按钮的流程, isResize无效, isMultiple属性默认为true
                    if (item.value === "selectAll") {
                        _resizeOtherItem(item); // 还原其他按钮
                        item.isSelect = !item.isSelect;
                        setValue([]);
                    } else {
                        // 根据选中状态判断是否需要设置全选按钮状态
                        item.isSelect = !item.isSelect;
                        let selectAll = true;
                        let allButton: any;
                        angular.forEach(vm.visualItems, (item: any) => {
                            if (item.value !== "selectAll") {
                                if (!item.isSelect) {
                                    selectAll = false;
                                }
                            } else {
                                allButton = item;
                            }
                        });
                        if (selectAll && allButton) {
                            _resizeOtherItem(allButton);
                            allButton.isSelect = true;
                            setValue([]);
                        } else if (allButton) {
                            allButton.isSelect = false;
                            setValue(_getSelectItems());
                        }
                    }
                } else {
                    if (vm.isMultiple) {
                        // 多选情况, isResize属性无效
                        item.isSelect = !item.isSelect;
                        setValue(_getSelectItems());
                    } else {
                        // 非多选情况下
                        if (!vm.isResize && item.isSelect) {
                            // 按钮本身是选中状态, 且设置了不允许自动还原, 则不进行任何处理
                        } else if (item.isSelect) {
                            // 还原
                            item.isSelect = !item.isSelect;
                            setValue({});
                        } else {
                            // 选中
                            _resizeOtherItem(item);
                            item.isSelect = !item.isSelect;
                            setValue(item);
                        }
                    }
                }
            });

            if (!vm.initNoClick) {
                vm.buttonClick();
            } else {
                vm.initNoClick = false
            }
        }

        /**
         * 重置其他关联按钮的选中状态
         * @param origin
         */
        function _resizeOtherItem(origin: any) {
            angular.forEach(vm.visualItems, (item: any) => {
                if (origin !== item) {
                    item.isSelect = false;
                }
            });
        }

        /**
         * 获取选中的结点
         * @returns {any[]}
         * @private
         */
        function _getSelectItems() {
            let result = new Array<any>();
            angular.forEach(vm.visualItems, (item: any) => {
                // 不包含全选按钮
                if (item && item.isSelect) {
                    result.push(item);
                }
            });
            return result;
        }

        /**
         * 设置ngModel的值
         * @param item
         */
        function setValue(item: any) {
            vm.ngModelController.$setViewValue(item);
        }

    };
    link = function (scope: any, element: any, attrs: any, controller: any) {
        let parentController = controller[0];
        let ngModelController = controller[1];
        var vm = parentController;
        vm.ngModelController = ngModelController;
        attrs.$observe("isMultiple", () => {
            vm.isMultiple = scope.$eval(attrs.isMultiple) || false;
        });
        attrs.$observe("isShowAll", () => {
            vm.isShowAll = scope.$eval(attrs.isShowAll) || false;
        });
        attrs.$observe("isResize", () => {
            vm.isResize = scope.$eval(attrs.isResize) || false;
        });
        attrs.$observe("needTranslate", () => {
            vm.needTranslate = scope.$eval(attrs.needTranslate) || false;
        });
        attrs.$observe("initNoClick", () => {
            vm.initNoClick = scope.$eval(attrs.initNoClick) || false;
        });

        vm.valueLink = scope.valueLink || "value";
        vm.textLink = scope.textLink || "text";
        vm.items = scope.items;
        vm.buttonClick = scope.buttonClick;
        vm.initComplete = scope.initComplete;
        vm.initNoClick = scope.initNoClick;
        vm.defaultSelectByIndex = attrs.defaultSelectByIndex;
        vm.defaultSelectByValue = scope.defaultSelectByValue;
        vm.defaultSelectByText = scope.defaultSelectByText;

        vm.initNgModelController();

        scope.$watch('items', (newVal: any, oldVal: any) => {
            if (newVal === oldVal) return;
            vm.init();
        }, true);

        scope.$on("$destroy", () => {
            // 销毁的时候移除几个可能引起缓存的东西
            vm.resetSelect = null;
            vm.initComplete = null;
            vm = null;
        });

        vm.$timeout(() => {
            // 初始化
            vm.init();
            // 触发初始化完成函数
            if (vm.initComplete) {
                vm.initComplete({
                    resetFunc: vm.resetSelect
                });
            }
        });
    }
}

app.directive("uniqueButton", UniquebuttonDirective.instance);

