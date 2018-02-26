define(["require", "exports", "text!./uniquebutton.html", "../../app/main.app", "css!./uniquebutton.css"], function (require, exports, uniquebuttonHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UniquebuttonDirective = (function () {
        function UniquebuttonDirective() {
            this.restrict = "E";
            this.scope = {
                items: "=",
                buttonClick: "&",
                isResize: '@',
                isMultiple: '@',
                isShowAll: '@',
                defaultSelectByIndex: '@',
                defaultSelectByValue: '@',
                defaultSelectByText: '@',
                valueLink: '@',
                textLink: '@',
                needTranslate: '@',
                initComplete: '&',
                initNoClick: "@"
            };
            this.require = ["uniqueButton", "^ngModel"];
            this.template = uniquebuttonHtml;
            this.controllerAs = "uniqueBtnDirective";
            this.controller = function ($scope, $timeout) {
                var vm = this;
                vm.init = init;
                vm.initNgModelController = initNgModelController;
                vm.select = select;
                vm.ngModelController = null;
                vm.visualItems;
                vm.items;
                vm.$timeout = $timeout;
                vm.resetSelect = resetSelect;
                function resetSelect() {
                    init();
                }
                function init() {
                    var valueLink = vm.valueLink;
                    var textLink = vm.textLink;
                    var defaultSelectByIndex = vm.defaultSelectByIndex;
                    var defaultSelectByValue = vm.defaultSelectByValue;
                    var defaultSelectByText = vm.defaultSelectByText;
                    var initNoClick = vm.initNoClick;
                    vm.visualItems = new Array();
                    angular.forEach(vm.items, function (data) {
                        vm.visualItems.push({ value: data[valueLink], text: data[textLink] });
                    });
                    if (vm.isShowAll) {
                        vm.visualItems.splice(0, 0, { value: "selectAll", text: "全选" });
                    }
                    if (defaultSelectByIndex != null) {
                        select(_selectByDefault(vm.visualItems, defaultSelectByIndex, "index"));
                    }
                    else if (defaultSelectByValue) {
                        select(_selectByDefault(vm.visualItems, defaultSelectByValue, "value"));
                    }
                    else if (defaultSelectByText) {
                        select(_selectByDefault(vm.visualItems, defaultSelectByText, "text"));
                    }
                }
                function _selectByDefault(items, target, type) {
                    var result = new Array();
                    var targetArr = (target + "").split(",");
                    angular.element.each(items, function (index, data) {
                        angular.element.each(targetArr, function (num, targetItem) {
                            if (type === "index" && targetItem == index) {
                                result.push(data);
                                return false;
                            }
                            else if (type === "value" && targetItem == data[type]) {
                                result.push(data);
                                return false;
                            }
                            else if (type === "text" && targetItem == data[type]) {
                                result.push(data);
                                return false;
                            }
                        });
                    });
                    return result;
                }
                function initNgModelController() {
                    var valueLink = vm.valueLink;
                    vm.ngModelController.$parsers.push(function (viewValue) {
                        if (!angular.isArray(viewValue)) {
                            return viewValue[valueLink];
                        }
                        else {
                            var arr_1 = new Array();
                            angular.forEach(viewValue, function (value) {
                                arr_1.push(value[valueLink]);
                            });
                            return arr_1;
                        }
                    });
                }
                function select(items) {
                    if (!items || items.length <= 0) {
                        console.error("uniquebutton.directive select error: items is null");
                        return;
                    }
                    angular.forEach(items, function (item) {
                        if (vm.isShowAll) {
                            if (item.value === "selectAll") {
                                _resizeOtherItem(item);
                                item.isSelect = !item.isSelect;
                                setValue([]);
                            }
                            else {
                                item.isSelect = !item.isSelect;
                                var selectAll_1 = true;
                                var allButton_1;
                                angular.forEach(vm.visualItems, function (item) {
                                    if (item.value !== "selectAll") {
                                        if (!item.isSelect) {
                                            selectAll_1 = false;
                                        }
                                    }
                                    else {
                                        allButton_1 = item;
                                    }
                                });
                                if (selectAll_1 && allButton_1) {
                                    _resizeOtherItem(allButton_1);
                                    allButton_1.isSelect = true;
                                    setValue([]);
                                }
                                else if (allButton_1) {
                                    allButton_1.isSelect = false;
                                    setValue(_getSelectItems());
                                }
                            }
                        }
                        else {
                            if (vm.isMultiple) {
                                item.isSelect = !item.isSelect;
                                setValue(_getSelectItems());
                            }
                            else {
                                if (!vm.isResize && item.isSelect) {
                                }
                                else if (item.isSelect) {
                                    item.isSelect = !item.isSelect;
                                    setValue({});
                                }
                                else {
                                    _resizeOtherItem(item);
                                    item.isSelect = !item.isSelect;
                                    setValue(item);
                                }
                            }
                        }
                    });
                    if (!vm.initNoClick) {
                        vm.buttonClick();
                    }
                    else {
                        vm.initNoClick = false;
                    }
                }
                function _resizeOtherItem(origin) {
                    angular.forEach(vm.visualItems, function (item) {
                        if (origin !== item) {
                            item.isSelect = false;
                        }
                    });
                }
                function _getSelectItems() {
                    var result = new Array();
                    angular.forEach(vm.visualItems, function (item) {
                        if (item && item.isSelect) {
                            result.push(item);
                        }
                    });
                    return result;
                }
                function setValue(item) {
                    vm.ngModelController.$setViewValue(item);
                }
            };
            this.link = function (scope, element, attrs, controller) {
                var parentController = controller[0];
                var ngModelController = controller[1];
                var vm = parentController;
                vm.ngModelController = ngModelController;
                attrs.$observe("isMultiple", function () {
                    vm.isMultiple = scope.$eval(attrs.isMultiple) || false;
                });
                attrs.$observe("isShowAll", function () {
                    vm.isShowAll = scope.$eval(attrs.isShowAll) || false;
                });
                attrs.$observe("isResize", function () {
                    vm.isResize = scope.$eval(attrs.isResize) || false;
                });
                attrs.$observe("needTranslate", function () {
                    vm.needTranslate = scope.$eval(attrs.needTranslate) || false;
                });
                attrs.$observe("initNoClick", function () {
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
                scope.$watch('items', function (newVal, oldVal) {
                    if (newVal === oldVal)
                        return;
                    vm.init();
                }, true);
                scope.$on("$destroy", function () {
                    vm.resetSelect = null;
                    vm.initComplete = null;
                    vm = null;
                });
                vm.$timeout(function () {
                    vm.init();
                    if (vm.initComplete) {
                        vm.initComplete({
                            resetFunc: vm.resetSelect
                        });
                    }
                });
            };
        }
        UniquebuttonDirective.instance = function () {
            return new UniquebuttonDirective();
        };
        UniquebuttonDirective.$inject = ["$scope", "$timeout"];
        return UniquebuttonDirective;
    }());
    main_app_1.app.directive("uniqueButton", UniquebuttonDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bmlxdWVidXR0b24vdW5pcXVlYnV0dG9uLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFhQTtRQUlJO1lBK0JBLGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIsVUFBSyxHQUFHO2dCQUNKLEtBQUssRUFBRSxHQUFHO2dCQUNWLFdBQVcsRUFBRSxHQUFHO2dCQUNoQixRQUFRLEVBQUUsR0FBRztnQkFDYixVQUFVLEVBQUUsR0FBRztnQkFDZixTQUFTLEVBQUUsR0FBRztnQkFDZCxvQkFBb0IsRUFBRSxHQUFHO2dCQUN6QixvQkFBb0IsRUFBRSxHQUFHO2dCQUN6QixtQkFBbUIsRUFBRSxHQUFHO2dCQUN4QixTQUFTLEVBQUUsR0FBRztnQkFDZCxRQUFRLEVBQUUsR0FBRztnQkFDYixhQUFhLEVBQUUsR0FBRztnQkFDbEIsWUFBWSxFQUFFLEdBQUc7Z0JBQ2pCLFdBQVcsRUFBRSxHQUFHO2FBQ25CLENBQUM7WUFDRixZQUFPLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDdkMsYUFBUSxHQUFHLGdCQUFnQixDQUFDO1lBQzVCLGlCQUFZLEdBQUcsb0JBQW9CLENBQUM7WUFDcEMsZUFBVSxHQUFHLFVBQVUsTUFBVyxFQUFFLFFBQWE7Z0JBQzdDLElBQUksRUFBRSxHQUFHLElBQTZCLENBQUM7Z0JBRXZDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNmLEVBQUUsQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztnQkFDakQsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDVCxFQUFFLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFFdkIsRUFBRSxDQUFDLFdB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QyxJQUFJLHFCQUFxQixFQUFFLENBQUM7UUFDdkMsQ0FBQztRQVJNLDZCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFnVDVDLDRCQUFDO0tBbFRELEFBa1RDLElBQUE7SUFFRCxjQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bmlxdWVidXR0b24vdW5pcXVlYnV0dG9uLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi91bmlxdWVidXR0b24uaHRtbFwiIG5hbWU9J3VuaXF1ZWJ1dHRvbkh0bWwnIC8+XHJcblxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCBcImNzcyEuL3VuaXF1ZWJ1dHRvbi5jc3NcIjtcclxuZGVjbGFyZSB2YXIgdW5pcXVlYnV0dG9uSHRtbDogc3RyaW5nO1xyXG5kZWNsYXJlIHZhciBhbmd1bGFyOiBhbnk7XHJcblxyXG4vKipcclxuICog5oyJ6ZKu6YCJ5oup5o+S5Lu2XHJcbiAqIOWNlemAieaooeW8j+S4iywg6YCJ5Lit55qE5pWw5o2u5Li6dmFsdWXlr7nlupTnmoTmlbDmja5cclxuICog5aSa6YCJ5qih5byP5LiLLCDpgInkuK3nmoTmlbDmja7mlL7lnKjkuIDkuKrmlbDnu4TkuK1cclxuICog5YWo6YCJ5oyJ6ZKu54K55Ye75ZCOLCDov5Tlm57nmoTmlbDmja7pu5jorqTkuLrnqbrmlbDnu4RbXVxyXG4gKi9cclxuY2xhc3MgVW5pcXVlYnV0dG9uRGlyZWN0aXZlIHtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiR0aW1lb3V0XCJdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVbmlxdWVidXR0b25EaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0OiBGdW5jdGlvbjtcclxuICAgIC8vIOWPquiDveaJp+ihjOS4gOasoVxyXG4gICAgaW5pdENvbXBsZXRlOiBGdW5jdGlvbjtcclxuICAgIC8vIOmHjee9rum7mOiupOmAiemhuVxyXG4gICAgcmVzZXRTZWxlY3Q6IEZ1bmN0aW9uO1xyXG4gICAgLy8g57uR5a6abmdtb2RlbCwg5LiA5Liq5oyH5Luk5Y+q5omn6KGM5LiA5qyhXHJcbiAgICBpbml0TmdNb2RlbENvbnRyb2xsZXI6IEZ1bmN0aW9uO1xyXG4gICAgc2VsZWN0OiAoaXRlbXM6IEFycmF5PGFueT4pID0+IHZvaWQ7XHJcbiAgICBidXR0b25DbGljazogRnVuY3Rpb247XHJcbiAgICAkdGltZW91dDogYW55O1xyXG4gICAgdmFsdWVMaW5rOiBzdHJpbmc7XHJcbiAgICB0ZXh0TGluazogc3RyaW5nO1xyXG4gICAgaXNNdWx0aXBsZTogYm9vbGVhbjtcclxuICAgIGlzU2hvd0FsbDogYm9vbGVhbjtcclxuICAgIGlzUmVzaXplOiBib29sZWFuO1xyXG4gICAgaW5pdE5vQ2xpY2s6IGJvb2xlYW47XHJcbiAgICBpdGVtczogQXJyYXk8YW55PjtcclxuICAgIHZpc3VhbEl0ZW1zOiBBcnJheTxhbnk+OyAvLyDnlLHkuo7kuI3mg7PmlLnlj5jljp/mnaXnmoRpdGVtc+WAvCwg5pWF5ZyoZGlyZWNpdHZl5Lit6YeN5paw5a6a5LmJ5LiA5Lu95o+S5Lu25a6e5L6LLCDnlKjkuo7mjqfliLbnlYzpnaLpgInkuK0v5LiN6YCJ5Lit5bGV56S65pWI5p6cXHJcbiAgICBuZ01vZGVsQ29udHJvbGxlcjogYW55O1xyXG4gICAgZGVmYXVsdFNlbGVjdEJ5SW5kZXg6IG51bWJlcjtcclxuICAgIGRlZmF1bHRTZWxlY3RCeVZhbHVlOiBhbnk7XHJcbiAgICBkZWZhdWx0U2VsZWN0QnlUZXh0OiBzdHJpbmc7XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9IFwiRVwiO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgaXRlbXM6IFwiPVwiLFxyXG4gICAgICAgIGJ1dHRvbkNsaWNrOiBcIiZcIixcclxuICAgICAgICBpc1Jlc2l6ZTogJ0AnLCAvLyDmmK/lkKblhYHorrjngrnlh7voh6rouqvov5jljp/pgInkuK3nirbmgIFcclxuICAgICAgICBpc011bHRpcGxlOiAnQCcsIC8vIOaYr+WQpuaYr+WkmumAiSwg5Li6ZmFsc2XliJnkuLrljZXpgIlcclxuICAgICAgICBpc1Nob3dBbGw6ICdAJywgLy8g5piv5ZCm5Ye6546w5YWo6YCJ5oyJ6ZKuXHJcbiAgICAgICAgZGVmYXVsdFNlbGVjdEJ5SW5kZXg6ICdAJywgLy8g6buY6K6k6YCJ5Lit55qEaW5kZXgsIOaUr+aMgeWkmumAiSwg5aSa6YCJ5Y+C5pWw6K6+572u5pa55byP5Li6IOWPguaVsDEs5Y+C5pWwMizlj4LmlbAzXHJcbiAgICAgICAgZGVmYXVsdFNlbGVjdEJ5VmFsdWU6ICdAJywgLy8g6buY6K6k6YCJ5Lit55qEdmFsdWUsIOaUr+aMgeWkmumAiSwg5aSa6YCJ5Y+C5pWw6K6+572u5pa55byP5Li6IOWPguaVsDEs5Y+C5pWwMizlj4LmlbAzXHJcbiAgICAgICAgZGVmYXVsdFNlbGVjdEJ5VGV4dDogJ0AnLCAvLyDpu5jorqTpgInkuK3nmoR0ZXh0LCDmlK/mjIHlpJrpgIksIOWkmumAieWPguaVsOiuvue9ruaWueW8j+S4uiDlj4LmlbAxLOWPguaVsDIs5Y+C5pWwM1xyXG4gICAgICAgIHZhbHVlTGluazogJ0AnLCAvLyB2YWx1ZeWvueW6lOeahGl0ZW3ph4znmoTlrZfmrrVcclxuICAgICAgICB0ZXh0TGluazogJ0AnLCAvLyB0ZXh05a+55bqU55qEaXRlbemHjOeahOWtl+autVxyXG4gICAgICAgIG5lZWRUcmFuc2xhdGU6ICdAJywgLy8g5Lyg5YWl55qE5a2X5q615piv5ZCm6ZyA6KaB6L+b6KGM5Zu96ZmF5YyW6L2s5o2iXHJcbiAgICAgICAgaW5pdENvbXBsZXRlOiAnJicsIC8vIOWIneWni+WMluWujOaIkOaJp+ihjOWHveaVsFxyXG4gICAgICAgIGluaXROb0NsaWNrOiBcIkBcIlxyXG4gICAgfTtcclxuICAgIHJlcXVpcmUgPSBbXCJ1bmlxdWVCdXR0b25cIiwgXCJebmdNb2RlbFwiXTtcclxuICAgIHRlbXBsYXRlID0gdW5pcXVlYnV0dG9uSHRtbDtcclxuICAgIGNvbnRyb2xsZXJBcyA9IFwidW5pcXVlQnRuRGlyZWN0aXZlXCI7XHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZTogYW55LCAkdGltZW91dDogYW55KSB7XHJcbiAgICAgICAgdmFyIHZtID0gdGhpcyBhcyBVbmlxdWVidXR0b25EaXJlY3RpdmU7XHJcblxyXG4gICAgICAgIHZtLmluaXQgPSBpbml0O1xyXG4gICAgICAgIHZtLmluaXROZ01vZGVsQ29udHJvbGxlciA9IGluaXROZ01vZGVsQ29udHJvbGxlcjtcclxuICAgICAgICB2bS5zZWxlY3QgPSBzZWxlY3Q7XHJcbiAgICAgICAgdm0ubmdNb2RlbENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICAgIHZtLnZpc3VhbEl0ZW1zO1xyXG4gICAgICAgIHZtLml0ZW1zO1xyXG4gICAgICAgIHZtLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcblxyXG4gICAgICAgIHZtLnJlc2V0U2VsZWN0ID0gcmVzZXRTZWxlY3Q7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmHjee9rumAiemhuVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0KCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIOi/memHjOWFiOeugOWNleWkhOeQhuS4uuWIneWni+WMluS4gOasoeaMh+S7pCzku6XlkI7nnIvmmK/lkKbpnIDopoHlho3kv67mlLksIHJlc29sdmU6IHd5clxyXG4gICAgICAgICAgICBpbml0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVMaW5rID0gdm0udmFsdWVMaW5rO1xyXG4gICAgICAgICAgICBsZXQgdGV4dExpbmsgPSB2bS50ZXh0TGluaztcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHRTZWxlY3RCeUluZGV4ID0gdm0uZGVmYXVsdFNlbGVjdEJ5SW5kZXg7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0U2VsZWN0QnlWYWx1ZSA9IHZtLmRlZmF1bHRTZWxlY3RCeVZhbHVlO1xyXG4gICAgICAgICAgICBsZXQgZGVmYXVsdFNlbGVjdEJ5VGV4dCA9IHZtLmRlZmF1bHRTZWxlY3RCeVRleHQ7XHJcbiAgICAgICAgICAgIGxldCBpbml0Tm9DbGljayA9IHZtLmluaXROb0NsaWNrO1xyXG4gICAgICAgICAgICB2bS52aXN1YWxJdGVtcyA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS5pdGVtcywgKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdm0udmlzdWFsSXRlbXMucHVzaCh7IHZhbHVlOiBkYXRhW3ZhbHVlTGlua10sIHRleHQ6IGRhdGFbdGV4dExpbmtdIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHZtLmlzU2hvd0FsbCkge1xyXG4gICAgICAgICAgICAgICAgdm0udmlzdWFsSXRlbXMuc3BsaWNlKDAsIDAsIHsgdmFsdWU6IFwic2VsZWN0QWxsXCIsIHRleHQ6IFwi5YWo6YCJXCIgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFNlbGVjdEJ5SW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0KF9zZWxlY3RCeURlZmF1bHQodm0udmlzdWFsSXRlbXMsIGRlZmF1bHRTZWxlY3RCeUluZGV4LCBcImluZGV4XCIpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0U2VsZWN0QnlWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0KF9zZWxlY3RCeURlZmF1bHQodm0udmlzdWFsSXRlbXMsIGRlZmF1bHRTZWxlY3RCeVZhbHVlLCBcInZhbHVlXCIpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkZWZhdWx0U2VsZWN0QnlUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3QoX3NlbGVjdEJ5RGVmYXVsdCh2bS52aXN1YWxJdGVtcywgZGVmYXVsdFNlbGVjdEJ5VGV4dCwgXCJ0ZXh0XCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zZWxlY3RCeURlZmF1bHQoaXRlbXM6IEFycmF5PGFueT4sIHRhcmdldDogYW55LCB0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbXMsIHRhcmdldClcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8YW55PiA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRBcnIgPSAodGFyZ2V0ICsgXCJcIikuc3BsaXQoXCIsXCIpOyAvLyArIFwiXCIg5Li65LqG5bCGaW506L2s5Li6c3RyaW5nXHJcbiAgICAgICAgICAgIC8vIOS9v+eUqOeahGpxdWVyeeeahGVhY2hcclxuICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50LmVhY2goaXRlbXMsIChpbmRleDogbnVtYmVyLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOW+queOr+WIpOaWreaYr+WQpuacieebuOetieeahOWAvFxyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5lbGVtZW50LmVhY2godGFyZ2V0QXJyLCAobnVtOiBudW1iZXIsIHRhcmdldEl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImluZGV4XCIgJiYgdGFyZ2V0SXRlbSA9PSBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ2YWx1ZVwiICYmIHRhcmdldEl0ZW0gPT0gZGF0YVt0eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJ0ZXh0XCIgJiYgdGFyZ2V0SXRlbSA9PSBkYXRhW3R5cGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5Yid5aeL5YyWbmdNb2RlbENvbnRyb2xsZXIsIOWPquaJp+ihjOS4gOasoVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdE5nTW9kZWxDb250cm9sbGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWVMaW5rID0gdm0udmFsdWVMaW5rO1xyXG4gICAgICAgICAgICB2bS5uZ01vZGVsQ29udHJvbGxlci4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uICh2aWV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkodmlld1ZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWVbdmFsdWVMaW5rXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IG5ldyBBcnJheTxhbnk+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZpZXdWYWx1ZSwgKHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godmFsdWVbdmFsdWVMaW5rXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmjInpkq7pgInkuK3op6blj5Hkuovku7ZcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBzZWxlY3QoaXRlbXM6IEFycmF5PGFueT4pIHtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ1bmlxdWVidXR0b24uZGlyZWN0aXZlIHNlbGVjdCBlcnJvcjogaXRlbXMgaXMgbnVsbFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGl0ZW1zLCAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodm0uaXNTaG93QWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5pi+56S65YWo6YCJ5oyJ6ZKu55qE5rWB56iLLCBpc1Jlc2l6ZeaXoOaViCwgaXNNdWx0aXBsZeWxnuaAp+m7mOiupOS4unRydWVcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSA9PT0gXCJzZWxlY3RBbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzaXplT3RoZXJJdGVtKGl0ZW0pOyAvLyDov5jljp/lhbbku5bmjInpkq5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1NlbGVjdCA9ICFpdGVtLmlzU2VsZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZShbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8g5qC55o2u6YCJ5Lit54q25oCB5Yik5pat5piv5ZCm6ZyA6KaB6K6+572u5YWo6YCJ5oyJ6ZKu54q25oCBXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSAhaXRlbS5pc1NlbGVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhbGxCdXR0b246IGFueTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZtLnZpc3VhbEl0ZW1zLCAoaXRlbTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS52YWx1ZSAhPT0gXCJzZWxlY3RBbGxcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXRlbS5pc1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbEJ1dHRvbiA9IGl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0QWxsICYmIGFsbEJ1dHRvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc2l6ZU90aGVySXRlbShhbGxCdXR0b24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsQnV0dG9uLmlzU2VsZWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlKFtdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxCdXR0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsbEJ1dHRvbi5pc1NlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWUoX2dldFNlbGVjdEl0ZW1zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodm0uaXNNdWx0aXBsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyDlpJrpgInmg4XlhrUsIGlzUmVzaXpl5bGe5oCn5peg5pWIXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSAhaXRlbS5pc1NlbGVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWUoX2dldFNlbGVjdEl0ZW1zKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmdnuWkmumAieaDheWGteS4i1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZtLmlzUmVzaXplICYmIGl0ZW0uaXNTZWxlY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaMiemSruacrOi6q+aYr+mAieS4reeKtuaAgSwg5LiU6K6+572u5LqG5LiN5YWB6K646Ieq5Yqo6L+Y5Y6fLCDliJnkuI3ov5vooYzku7vkvZXlpITnkIZcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLmlzU2VsZWN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDov5jljp9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSAhaXRlbS5pc1NlbGVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlKHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOmAieS4rVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3Jlc2l6ZU90aGVySXRlbShpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSAhaXRlbS5pc1NlbGVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdm0uaW5pdE5vQ2xpY2spIHtcclxuICAgICAgICAgICAgICAgIHZtLmJ1dHRvbkNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pbml0Tm9DbGljayA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOmHjee9ruWFtuS7luWFs+iBlOaMiemSrueahOmAieS4reeKtuaAgVxyXG4gICAgICAgICAqIEBwYXJhbSBvcmlnaW5cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfcmVzaXplT3RoZXJJdGVtKG9yaWdpbjogYW55KSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2bS52aXN1YWxJdGVtcywgKGl0ZW06IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbiAhPT0gaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bpgInkuK3nmoTnu5PngrlcclxuICAgICAgICAgKiBAcmV0dXJucyB7YW55W119XHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZ2V0U2VsZWN0SXRlbXMoKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godm0udmlzdWFsSXRlbXMsIChpdGVtOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIOS4jeWMheWQq+WFqOmAieaMiemSrlxyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5pc1NlbGVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rm5nTW9kZWznmoTlgLxcclxuICAgICAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHNldFZhbHVlKGl0ZW06IGFueSkge1xyXG4gICAgICAgICAgICB2bS5uZ01vZGVsQ29udHJvbGxlci4kc2V0Vmlld1ZhbHVlKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBlbGVtZW50OiBhbnksIGF0dHJzOiBhbnksIGNvbnRyb2xsZXI6IGFueSkge1xyXG4gICAgICAgIGxldCBwYXJlbnRDb250cm9sbGVyID0gY29udHJvbGxlclswXTtcclxuICAgICAgICBsZXQgbmdNb2RlbENvbnRyb2xsZXIgPSBjb250cm9sbGVyWzFdO1xyXG4gICAgICAgIHZhciB2bSA9IHBhcmVudENvbnRyb2xsZXI7XHJcbiAgICAgICAgdm0ubmdNb2RlbENvbnRyb2xsZXIgPSBuZ01vZGVsQ29udHJvbGxlcjtcclxuICAgICAgICBhdHRycy4kb2JzZXJ2ZShcImlzTXVsdGlwbGVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5pc011bHRpcGxlID0gc2NvcGUuJGV2YWwoYXR0cnMuaXNNdWx0aXBsZSkgfHwgZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoXCJpc1Nob3dBbGxcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5pc1Nob3dBbGwgPSBzY29wZS4kZXZhbChhdHRycy5pc1Nob3dBbGwpIHx8IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKFwiaXNSZXNpemVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5pc1Jlc2l6ZSA9IHNjb3BlLiRldmFsKGF0dHJzLmlzUmVzaXplKSB8fCBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBhdHRycy4kb2JzZXJ2ZShcIm5lZWRUcmFuc2xhdGVcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICB2bS5uZWVkVHJhbnNsYXRlID0gc2NvcGUuJGV2YWwoYXR0cnMubmVlZFRyYW5zbGF0ZSkgfHwgZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoXCJpbml0Tm9DbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZtLmluaXROb0NsaWNrID0gc2NvcGUuJGV2YWwoYXR0cnMuaW5pdE5vQ2xpY2spIHx8IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2bS52YWx1ZUxpbmsgPSBzY29wZS52YWx1ZUxpbmsgfHwgXCJ2YWx1ZVwiO1xyXG4gICAgICAgIHZtLnRleHRMaW5rID0gc2NvcGUudGV4dExpbmsgfHwgXCJ0ZXh0XCI7XHJcbiAgICAgICAgdm0uaXRlbXMgPSBzY29wZS5pdGVtcztcclxuICAgICAgICB2bS5idXR0b25DbGljayA9IHNjb3BlLmJ1dHRvbkNsaWNrO1xyXG4gICAgICAgIHZtLmluaXRDb21wbGV0ZSA9IHNjb3BlLmluaXRDb21wbGV0ZTtcclxuICAgICAgICB2bS5pbml0Tm9DbGljayA9IHNjb3BlLmluaXROb0NsaWNrO1xyXG4gICAgICAgIHZtLmRlZmF1bHRTZWxlY3RCeUluZGV4ID0gYXR0cnMuZGVmYXVsdFNlbGVjdEJ5SW5kZXg7XHJcbiAgICAgICAgdm0uZGVmYXVsdFNlbGVjdEJ5VmFsdWUgPSBzY29wZS5kZWZhdWx0U2VsZWN0QnlWYWx1ZTtcclxuICAgICAgICB2bS5kZWZhdWx0U2VsZWN0QnlUZXh0ID0gc2NvcGUuZGVmYXVsdFNlbGVjdEJ5VGV4dDtcclxuXHJcbiAgICAgICAgdm0uaW5pdE5nTW9kZWxDb250cm9sbGVyKCk7XHJcblxyXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnaXRlbXMnLCAobmV3VmFsOiBhbnksIG9sZFZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChuZXdWYWwgPT09IG9sZFZhbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB2bS5pbml0KCk7XHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHNjb3BlLiRvbihcIiRkZXN0cm95XCIsICgpID0+IHtcclxuICAgICAgICAgICAgLy8g6ZSA5q+B55qE5pe25YCZ56e76Zmk5Yeg5Liq5Y+v6IO95byV6LW357yT5a2Y55qE5Lic6KW/XHJcbiAgICAgICAgICAgIHZtLnJlc2V0U2VsZWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgdm0uaW5pdENvbXBsZXRlID0gbnVsbDtcclxuICAgICAgICAgICAgdm0gPSBudWxsO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2bS4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIOWIneWni+WMllxyXG4gICAgICAgICAgICB2bS5pbml0KCk7XHJcbiAgICAgICAgICAgIC8vIOinpuWPkeWIneWni+WMluWujOaIkOWHveaVsFxyXG4gICAgICAgICAgICBpZiAodm0uaW5pdENvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pbml0Q29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc2V0RnVuYzogdm0ucmVzZXRTZWxlY3RcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5kaXJlY3RpdmUoXCJ1bmlxdWVCdXR0b25cIiwgVW5pcXVlYnV0dG9uRGlyZWN0aXZlLmluc3RhbmNlKTtcclxuXHJcbiJdfQ==
