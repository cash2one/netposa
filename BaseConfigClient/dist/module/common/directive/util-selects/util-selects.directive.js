define(["require", "exports", "../../app/main.app", "css!./util-selects.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utilSelectsDirective = (function () {
        function utilSelectsDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                selectData: "=",
                selectRepeatByKey: "@",
                selectNameKey: '@',
                selectVal: "=",
                selectClick: "&",
            };
            this.controllerAs = 'utilSelectsDirective';
            this.template = function (element, attrs) {
                return "\n        <span class=\"util-selects-directive " + (attrs.class ? attrs.class : '') + "\">\n            <span class=\"util-selects-droplist\" ng-class=\"{placeholder:utilSelectsDirective.isNoSelect,activeSelect:utilSelectsDirective.showDropList}\" ng-click=\"utilSelectsDirective.showDropListFn()\">\n                {{utilSelectsDirective.selectValText}}\n            </span>\n            <ul class=\"dropBoxList\" ng-show=\"utilSelectsDirective.showDropList\" ng-scrollbars>\n                <li ng-repeat=\"item in utilSelectsDirective.selectDataList\" ng-class=\"{selected:item.isChecked}\">\n                    <span class=\"checkboxStyle\"  ng-click=\"utilSelectsDirective.selectItem(item)\">\n                        <i ng-if=\"utilSelectsDirective.isMutile\" class=\"inputCheck\" ng-class=\"{checked:item.isChecked}\"></i>\n                        <span class=\"checkboxTitle\">{{item.text}}</span>\n                        <span ng-if=\"utilSelectsDirective.isColor\" class=\"areaColor\" ng-style=\"{'background':'{{item.color}}'}\"></span>\n                    </span>\n                </li>\n            </ul>\n        </span>\n        ";
            };
            this.controller = function ($scope, $element, $attrs) {
                var vm = this;
                vm.isMutile = $attrs.isMutile ? $scope.$eval($attrs.isMutile) : false;
                vm.isColor = $attrs.isColor ? $scope.$eval($attrs.isColor) : false;
                vm.selectItem = function (item) {
                    if (vm.isMutile) {
                        item.isChecked = !item.isChecked;
                        if (item.isChecked) {
                            vm.selectedVal.push(item);
                        }
                        else {
                            for (var i = 0; i < vm.selectedVal.length; i++) {
                                var item2 = vm.selectedVal[i];
                                if (item[vm.key] === item2[vm.key]) {
                                    vm.selectedVal.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        vm.selectedVal = [item];
                        vm.showDropList = false;
                    }
                    vm.selectValText = setSelectValText();
                    if (vm.isMutile) {
                        $scope.selectClick({ selectVal: vm.selectedVal });
                    }
                    else {
                        $scope.selectClick({ selectVal: vm.selectedVal[0] });
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
                    }
                    else {
                        vm.selectDataList = $scope.selectData;
                    }
                    if (!$scope.selectRepeatByKey) {
                        vm.key = 'ID';
                    }
                    else {
                        vm.key = $scope.selectRepeatByKey;
                    }
                    if (!$scope.selectNameKey) {
                        vm.name = 'Name';
                    }
                    else {
                        vm.name = $scope.selectNameKey;
                    }
                    if (!$scope.selectVal) {
                        vm.selectedVal = [];
                    }
                    else {
                        if (vm.isMutile) {
                            vm.selectedVal = $scope.selectVal;
                        }
                        else {
                            vm.selectedVal = [$scope.selectVal];
                        }
                    }
                    vm.selectValText = setSelectValText();
                    vm.selectDataList.forEach(function (item) {
                        for (var i = 0; i < vm.selectedVal.length; i++) {
                            var item2 = vm.selectedVal[i];
                            if (item[vm.key] === item2[vm.key]) {
                                item.isSelected = true;
                                break;
                            }
                        }
                        if (!item.isSelected) {
                            item.isSelected = false;
                        }
                    });
                    vm.showDropList = false;
                }
                function setSelectValText() {
                    if (vm.selectedVal.length === 0) {
                        vm.isNoSelect = true;
                        return $attrs.placeholder || '';
                    }
                    else {
                        vm.isNoSelect = false;
                    }
                    if (vm.selectedVal.length <= 3) {
                        return vm.selectedVal.map(function (item) { return item[vm.name]; }).join(',');
                    }
                    if (vm.selectedVal.length > 3) {
                        return '当前已选中' + vm.selectedVal.length + '项';
                    }
                }
                $scope.$watch('selectData', function (val) {
                    console.warn(val, "select data is changed");
                    init();
                });
            };
            this.link = function (scope, element, attr) {
            };
        }
        ;
        utilSelectsDirective.instance = function () {
            return new utilSelectsDirective();
        };
        utilSelectsDirective.$inject = [];
        return utilSelectsDirective;
    }());
    main_app_1.app.directive('utilSelects', utilSelectsDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91dGlsLXNlbGVjdHMvdXRpbC1zZWxlY3RzLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFpQkE7UUFHSTtZQU9BLGFBQVEsR0FBVyxJQUFJLENBQUM7WUFDeEIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLFVBQUssR0FBUTtnQkFDVCxVQUFVLEVBQUUsR0FBRztnQkFDZixpQkFBaUIsRUFBRSxHQUFHO2dCQUN0QixhQUFhLEVBQUUsR0FBRztnQkFDbEIsU0FBUyxFQUFFLEdBQUc7Z0JBQ2QsV0FBVyxFQUFFLEdBQUc7YUFDbkIsQ0FBQztZQUNGLGlCQUFZLEdBQUcsc0JBQXNCLENBQUM7WUFDdEMsYUFBUSxHQUFHLFVBQVUsT0FBWSxFQUFFLEtBQVU7Z0JBQ3pDLE1BQU0sQ0FBQyxxREFDK0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSwyaUNBY25FLENBQUE7WUFDTCxDQUFDLENBQUM7WUFZRixlQUFVLEdBQUcsVUFBVSxNQUFXLEVBQUUsUUFBYSxFQUFFLE1BQVc7Z0JBQzFELElBQUksRUFBRSxHQUFHLElBQTRCLENBQUM7Z0JBQ3RDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDdEUsRUFBRSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUVuRSxFQUFFLENBQUMsVUFBVSxHQUFHLFVBQVUsSUFBNEI7b0JBQ2xELEVBQUUsQ0FB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USxHQUFmO1lBQ0ksTUFBTSxDQUFDLElBQUksb0JBQW9CLEVBQUUsQ0FBQTtRQUNyQyxDQUFDO1FBUE0sNEJBQU8sR0FBa0IsRUFBRSxDQUFDO1FBeUp2QywyQkFBQztLQTFKRCxBQTBKQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdXRpbC1zZWxlY3RzL3V0aWwtc2VsZWN0cy5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJjc3MhLi91dGlsLXNlbGVjdHMuY3NzXCI7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9hcHAvbWFpbi5hcHBcIjtcclxuXHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksICQ6IGFueSwgcmVxdWlyZTogYW55O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAc2VsZWN0RGF0YSDlvoXpgInmi6nmlbDmja5cclxuICogQHNlbGVjdFJlcGVhdEJ5S2V5IOaVsOaNruS4reWUr+S4gOagh+ivhueahGtleVxyXG4gKiBAc2VsZWN0TmFtZUtleSDmlbDmja7kuK3nlKjkuo7mmL7npLrnmoRuYW1lIGtleVxyXG4gKiBAc2VsZWN0VmFsIOW9k+WJjemAieaLqeeahOWvueixoSDnlKjkuo7lm57mmL7vvIzlpJrpgInmmK/lr7nosaHpm4blkIhcclxuICogQHNlbGVjdENsaWNrIGZ1bmN0aW9uIOmAieaLqeWQjueahOWbnuiwg+WkmumAieaYr+mbhuWQiO+8jOS9huaYr+aYr+WvueixoVxyXG4gKiBAcGxhY2Vob2xkZXIg5o+Q56S66K+tXHJcbiAqIEBpc011dGlsZSDmmK/lkKblpJrpgIkg6buY6K6kZmFsc2VcclxuICogQGlzQ29sb3Ig5piv5ZCm6aKc6ImyIOi/kOe7tOaooeWdl+S9v+eUqCDpu5jorqRmYWxzZVxyXG4gKi9cclxuY2xhc3MgdXRpbFNlbGVjdHNEaXJlY3RpdmUge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgdXRpbFNlbGVjdHNEaXJlY3RpdmUoKVxyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnQUUnO1xyXG4gICAgcmVwbGFjZTogQm9vbGVhbiA9IHRydWU7XHJcbiAgICB0cmFuc2NsdWRlOiBCb29sZWFuID0gdHJ1ZTtcclxuICAgIHNjb3BlOiBhbnkgPSB7XHJcbiAgICAgICAgc2VsZWN0RGF0YTogXCI9XCIsICAgICAgIC8v5Yid5aeL5LiL5ouJ5pWw5o2uIFtdXHJcbiAgICAgICAgc2VsZWN0UmVwZWF0QnlLZXk6IFwiQFwiLC8v5b6q546v6L6T5Ye65YC85a+55bqU55qEa2V5XHJcbiAgICAgICAgc2VsZWN0TmFtZUtleTogJ0AnLFxyXG4gICAgICAgIHNlbGVjdFZhbDogXCI9XCIsICAgICAgLy/liJ3lp4vpgInkuK3nmoTlgLxcclxuICAgICAgICBzZWxlY3RDbGljazogXCImXCIsICAgICAgLy/ngrnlh7vkuovku7YgIGZ1bmN0aW9uKHNlbGVjdGVkKXt9ICDlv4XkvKDlkIzlkI3lj4LmlbDvvJrljbMg6L+U5Zue5YC85Li66YCJ5Lit5YC8XHJcbiAgICB9O1xyXG4gICAgY29udHJvbGxlckFzID0gJ3V0aWxTZWxlY3RzRGlyZWN0aXZlJzsgICAgICAvL+aOp+WItuWZqFxyXG4gICAgdGVtcGxhdGUgPSBmdW5jdGlvbiAoZWxlbWVudDogYW55LCBhdHRyczogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8c3BhbiBjbGFzcz1cInV0aWwtc2VsZWN0cy1kaXJlY3RpdmUgJHthdHRycy5jbGFzcyA/IGF0dHJzLmNsYXNzIDogJyd9XCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXRpbC1zZWxlY3RzLWRyb3BsaXN0XCIgbmctY2xhc3M9XCJ7cGxhY2Vob2xkZXI6dXRpbFNlbGVjdHNEaXJlY3RpdmUuaXNOb1NlbGVjdCxhY3RpdmVTZWxlY3Q6dXRpbFNlbGVjdHNEaXJlY3RpdmUuc2hvd0Ryb3BMaXN0fVwiIG5nLWNsaWNrPVwidXRpbFNlbGVjdHNEaXJlY3RpdmUuc2hvd0Ryb3BMaXN0Rm4oKVwiPlxyXG4gICAgICAgICAgICAgICAge3t1dGlsU2VsZWN0c0RpcmVjdGl2ZS5zZWxlY3RWYWxUZXh0fX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8dWwgY2xhc3M9XCJkcm9wQm94TGlzdFwiIG5nLXNob3c9XCJ1dGlsU2VsZWN0c0RpcmVjdGl2ZS5zaG93RHJvcExpc3RcIiBuZy1zY3JvbGxiYXJzPlxyXG4gICAgICAgICAgICAgICAgPGxpIG5nLXJlcGVhdD1cIml0ZW0gaW4gdXRpbFNlbGVjdHNEaXJlY3RpdmUuc2VsZWN0RGF0YUxpc3RcIiBuZy1jbGFzcz1cIntzZWxlY3RlZDppdGVtLmlzQ2hlY2tlZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoZWNrYm94U3R5bGVcIiAgbmctY2xpY2s9XCJ1dGlsU2VsZWN0c0RpcmVjdGl2ZS5zZWxlY3RJdGVtKGl0ZW0pXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIG5nLWlmPVwidXRpbFNlbGVjdHNEaXJlY3RpdmUuaXNNdXRpbGVcIiBjbGFzcz1cImlucHV0Q2hlY2tcIiBuZy1jbGFzcz1cIntjaGVja2VkOml0ZW0uaXNDaGVja2VkfVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGVja2JveFRpdGxlXCI+e3tpdGVtLnRleHR9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gbmctaWY9XCJ1dGlsU2VsZWN0c0RpcmVjdGl2ZS5pc0NvbG9yXCIgY2xhc3M9XCJhcmVhQ29sb3JcIiBuZy1zdHlsZT1cInsnYmFja2dyb3VuZCc6J3t7aXRlbS5jb2xvcn19J31cIj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgYFxyXG4gICAgfTsgICAgICAgICAvL2h0bWzmqKHmnb9cclxuICAgIHNob3dEcm9wTGlzdDogYm9vbGVhbjsgLy/kuIvmi4nlvIDlhbNcclxuICAgIHNlbGVjdERhdGFMaXN0OiBBcnJheTx7IFtrZXk6IHN0cmluZ106IGFueSB9PjsgLy/kuIvmi4nliJfooajmlbDmja5cclxuICAgIHNlbGVjdGVkVmFsOiBBcnJheTx7IFtrZXk6IHN0cmluZ106IGFueSB9PjsgIC8v5b2T5YmN6YCJ5Lit55qE5YC8XHJcbiAgICBzZWxlY3RWYWxUZXh0OiBzdHJpbmc7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHNlbGVjdEl0ZW06IEZ1bmN0aW9uO1xyXG4gICAgc2hvd0Ryb3BMaXN0Rm46IEZ1bmN0aW9uO1xyXG4gICAgaXNOb1NlbGVjdDogYm9vbGVhbjtcclxuICAgIGlzTXV0aWxlOiBib29sZWFuO1xyXG4gICAgaXNDb2xvcjogYm9vbGVhbjtcclxuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlOiBhbnksICRlbGVtZW50OiBhbnksICRhdHRyczogYW55KSB7XHJcbiAgICAgICAgbGV0IHZtID0gdGhpcyBhcyB1dGlsU2VsZWN0c0RpcmVjdGl2ZTtcclxuICAgICAgICB2bS5pc011dGlsZSA9ICRhdHRycy5pc011dGlsZSA/ICRzY29wZS4kZXZhbCgkYXR0cnMuaXNNdXRpbGUpIDogZmFsc2U7XHJcbiAgICAgICAgdm0uaXNDb2xvciA9ICRhdHRycy5pc0NvbG9yID8gJHNjb3BlLiRldmFsKCRhdHRycy5pc0NvbG9yKSA6IGZhbHNlO1xyXG5cclxuICAgICAgICB2bS5zZWxlY3RJdGVtID0gZnVuY3Rpb24gKGl0ZW06IHsgW2tleTogc3RyaW5nXTogYW55IH0pIHtcclxuICAgICAgICAgICAgaWYgKHZtLmlzTXV0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmlzQ2hlY2tlZCA9ICFpdGVtLmlzQ2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzQ2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLnNlbGVjdGVkVmFsLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2bS5zZWxlY3RlZFZhbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbTIgPSB2bS5zZWxlY3RlZFZhbFtpXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1bdm0ua2V5XSA9PT0gaXRlbTJbdm0ua2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uc2VsZWN0ZWRWYWwuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5zZWxlY3RlZFZhbCA9IFtpdGVtXTtcclxuICAgICAgICAgICAgICAgIHZtLnNob3dEcm9wTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZtLnNlbGVjdFZhbFRleHQgPSBzZXRTZWxlY3RWYWxUZXh0KCk7XHJcbiAgICAgICAgICAgIGlmICh2bS5pc011dGlsZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdENsaWNrKHsgc2VsZWN0VmFsOiB2bS5zZWxlY3RlZFZhbCB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdENsaWNrKHsgc2VsZWN0VmFsOiB2bS5zZWxlY3RlZFZhbFswXSB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2bS5zaG93RHJvcExpc3RGbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdm0uc2hvd0Ryb3BMaXN0ID0gIXZtLnNob3dEcm9wTGlzdDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGluaXQoKTtcclxuICAgICAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoJHNjb3BlLnNlbGVjdERhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ3NlbGVjdERhdGEgdHlwZSBlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdm0uc2VsZWN0RGF0YUxpc3QgPSAkc2NvcGUuc2VsZWN0RGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghJHNjb3BlLnNlbGVjdFJlcGVhdEJ5S2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2bS5rZXkgPSAnSUQnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5rZXkgPSAkc2NvcGUuc2VsZWN0UmVwZWF0QnlLZXlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoISRzY29wZS5zZWxlY3ROYW1lS2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2bS5uYW1lID0gJ05hbWUnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5uYW1lID0gJHNjb3BlLnNlbGVjdE5hbWVLZXlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCEkc2NvcGUuc2VsZWN0VmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2bS5zZWxlY3RlZFZhbCA9IFtdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZtLmlzTXV0aWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uc2VsZWN0ZWRWYWwgPSAkc2NvcGUuc2VsZWN0VmFsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2bS5zZWxlY3RlZFZhbCA9IFskc2NvcGUuc2VsZWN0VmFsXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZtLnNlbGVjdFZhbFRleHQgPSBzZXRTZWxlY3RWYWxUZXh0KCk7XHJcblxyXG4gICAgICAgICAgICB2bS5zZWxlY3REYXRhTGlzdC5mb3JFYWNoKChpdGVtOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZtLnNlbGVjdGVkVmFsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0yID0gdm0uc2VsZWN0ZWRWYWxbaV0gYXMgeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbVt2bS5rZXldID09PSBpdGVtMlt2bS5rZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaXNTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5pc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5pc1NlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZtLnNob3dEcm9wTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0U2VsZWN0VmFsVGV4dCgpIHtcclxuICAgICAgICAgICAgaWYgKHZtLnNlbGVjdGVkVmFsLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdm0uaXNOb1NlbGVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJGF0dHJzLnBsYWNlaG9sZGVyIHx8ICcnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2bS5pc05vU2VsZWN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZtLnNlbGVjdGVkVmFsLmxlbmd0aCA8PSAzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdm0uc2VsZWN0ZWRWYWwubWFwKChpdGVtOiBhbnkpID0+IGl0ZW1bdm0ubmFtZV0pLmpvaW4oJywnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh2bS5zZWxlY3RlZFZhbC5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ+W9k+WJjeW3sumAieS4rScgKyB2bS5zZWxlY3RlZFZhbC5sZW5ndGggKyAn6aG5J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdzZWxlY3REYXRhJywgKHZhbDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2Fybih2YWwsIFwic2VsZWN0IGRhdGEgaXMgY2hhbmdlZFwiKTtcclxuICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIGxpbmsgPSBmdW5jdGlvbiAoc2NvcGU6IGFueSwgZWxlbWVudDogRWxlbWVudCwgYXR0cjogYW55KSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuZGlyZWN0aXZlKCd1dGlsU2VsZWN0cycsIHV0aWxTZWxlY3RzRGlyZWN0aXZlLmluc3RhbmNlKTsiXX0=
