define(["require", "exports", "text!./table.html", "text!./table-tr-td.html", "text!./table-tr-tdd.html", "../../app/main.app", "css!./table.css", "angular"], function (require, exports, tableHtml, tableTrTdHtml, tableTrTddHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilTabledHeadDirective = (function () {
        function UtilTabledHeadDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                tableHeaders: '=',
                tableHasSerial: '=',
                tableHasCheck: '=',
                tableSortFun: '&',
                tableAfterCheck: '&',
            };
            this.controllerAs = 'tablectrl';
            this.template = tableHtml;
            this.controller = function ($scope) {
                var vm = this;
                vm.init = function () {
                    vm.checkBoxAll = false;
                    if ((typeof ($scope.tableHasSerial) != "undefined" && ($scope.tableHasSerial == false))) {
                        vm.hasSerial = false;
                    }
                    else {
                        vm.hasSerial = true;
                    }
                    vm.hasCheck = $scope.tableHasCheck || false;
                    vm.bodyTrList = [];
                    vm.changeCheckBoxCallBack();
                };
                vm.changeTrCheckBoxStatus = function (index) {
                    if (index == -1) {
                        if (vm.bodyTrList && vm.bodyTrList.length > 0) {
                            vm.checkBoxAll = !vm.checkBoxAll;
                            var i = void 0, len = void 0, flag = vm.checkBoxAll;
                            for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                                vm.bodyTrList[i].trCheckBoxStatus = flag;
                            }
                        }
                    }
                    else {
                        vm.bodyTrList[index].trCheckBoxStatus = !vm.bodyTrList[index].trCheckBoxStatus;
                        if (vm.checkBoxAll) {
                            vm.checkBoxAll = false;
                        }
                        else {
                            var i = void 0, len = void 0, flag = true;
                            for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                                if (!vm.bodyTrList[i].trCheckBoxStatus) {
                                    flag = false;
                                    i = len;
                                }
                            }
                            vm.checkBoxAll = flag;
                        }
                    }
                    vm.changeCheckBoxCallBack();
                    return;
                };
                vm.changeCheckBoxCallBack = function () {
                    if (typeof $scope.tableAfterCheck === "function") {
                        var i = void 0, len = void 0;
                        var resultList = [];
                        for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                            resultList.push(vm.bodyTrList[i].trCheckBoxStatus);
                        }
                        $scope.tableAfterCheck({ checkList: resultList, isCheckAll: vm.checkBoxAll });
                    }
                };
                vm.changeTdShowStatus = function (index, showStatus) {
                    vm.headDataList[index].isShow = !showStatus;
                };
                vm.changeTdInTrShowStatus = function (index, showStatus) {
                    var i, len;
                    for (i = 0, len = vm.bodyTrList.length; i < len; i++) {
                        if (vm.bodyTrList[i].tdInTrList[index]) {
                            vm.bodyTrList[i].tdInTrList[index].setTdInTrStatus(showStatus);
                        }
                    }
                };
                vm.initUnitTableTr = function (tableBodyTr) {
                    var _index = vm.bodyTrList.length;
                    var i, len;
                    if (vm.headDataList && (vm.headDataList.length == tableBodyTr.tdInTrList.length)) {
                        for (i = 0, len = tableBodyTr.tdInTrList.length; i < len; i++) {
                            tableBodyTr.tdInTrList[i].setTdInTrStatus(vm.headDataList[i].isShow);
                        }
                    }
                    vm.bodyTrList.push(tableBodyTr);
                    return _index;
                };
                vm.initTrTd = function (tableBodyTr) {
                    var _index = vm.bodyTrList.length;
                    vm.bodyTrList.push(tableBodyTr);
                    return _index;
                };
                vm.tableBySort = function (header_index) {
                    if (vm.headDataList[header_index].isSort) {
                        var isAsc = -1;
                        if (vm.headDataList[header_index].isAsc == true) {
                            isAsc = false;
                        }
                        else {
                            isAsc = true;
                        }
                        var fieldName = vm.headDataList[header_index].field;
                        $scope.tableSortFun({ sortIndex: header_index, fieldName: fieldName, sortStatus: isAsc });
                        vm.headDataList[header_index].isAsc = isAsc;
                        angular.forEach(vm.headDataList, function (data, index) {
                            if (data.isSort && index != header_index) {
                                vm.headDataList[index].isAsc = -1;
                            }
                        });
                    }
                };
                $scope.$watch('tableHasCheck', watchTableHasCheck, true);
                function watchTableHasCheck(newData, oldData) {
                    vm.hasCheck = newData;
                }
                $scope.$watch('tableHeaders', watchHeaderDatasParams, true);
                function watchHeaderDatasParams(newVal, oldVal) {
                    if (newVal) {
                        var i = void 0, len = void 0;
                        for (i = 0, len = oldVal.length; i < len; i++) {
                            if (oldVal[i] && newVal[i]) {
                                if (oldVal[i].isShow != newVal[i].isShow) {
                                    vm.changeTdInTrShowStatus(i, newVal[i].isShow);
                                    vm.headDataList[i] = newVal[i].isShow;
                                }
                            }
                        }
                        vm.headDataList = headDataFormat(newVal);
                    }
                }
                function headDataFormat(dataList) {
                    var resultList = new Array();
                    angular.forEach(dataList, function (data) {
                        var result = angular.copy(data);
                        if (typeof result.isShow == 'undefined') {
                            result.isShow = true;
                        }
                        if (typeof data.isSort == 'undefined') {
                            result.isSort = false;
                        }
                        resultList.push(result);
                    });
                    return resultList;
                }
            };
            this.link = function (scope, element, attrs, controller) {
                controller.init();
            };
        }
        UtilTabledHeadDirective.instance = function () {
            return new UtilTabledHeadDirective();
        };
        UtilTabledHeadDirective.$inject = [];
        return UtilTabledHeadDirective;
    }());
    var UtilTableTrDirective = (function () {
        function UtilTableTrDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = true;
            this.require = '?^utilTableHead';
            this.scope = true;
            this.controller = function ($scope, $element, $attrs, $compile) {
                $scope.$compile = $compile;
                var vm = this;
                $scope.tdInTrList = [];
                vm.initTdInTr = function (tdInTrData) {
                    tdInTrData.setTdInTrIndex = $scope.tdInTrList.length;
                    $scope.tdInTrList.push(tdInTrData);
                };
            };
            this.template = '<tr  class="" ng-transclude>';
            this.link = function (scope, $element, attrs, tableCtrl) {
                var vm = scope;
                vm.init = function () {
                    vm.trInTableIndex = tableCtrl.initUnitTableTr(vm);
                    vm.trCheckBoxStatus = false;
                    if (tableCtrl.hasSerial) {
                        var temStr = '';
                        if (tableCtrl.hasCheck) {
                            temStr = tableTrTdHtml;
                        }
                        else {
                            temStr = tableTrTddHtml;
                        }
                        var _element = vm.$compile(temStr)(vm);
                        $element.prepend(_element);
                    }
                };
                vm.changeCheckBoxStatus = function (index) {
                    tableCtrl.changeTrCheckBoxStatus(index);
                };
                vm.init();
                scope.$on("$destroy", function () {
                    if (vm.trInTableIndex == 0) {
                        tableCtrl.init();
                    }
                });
            };
        }
        UtilTableTrDirective.instance = function () {
            return new UtilTableTrDirective();
        };
        UtilTableTrDirective.$inject = ['$compile'];
        return UtilTableTrDirective;
    }());
    var UtilTableTrTdDirective = (function () {
        function UtilTableTrTdDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = true;
            this.template = '<td ng-show="tdInTrStatus" ng-transclude></td>';
            this.require = '^?utilTableTr';
            this.scope = true;
            this.link = function (scope, element, attrs, trCtrl) {
                var vm = scope;
                vm.setTdInTrStatus = function (status) {
                    vm.tdInTrStatus = status;
                };
                vm.setTdInTrIndex = function (index) {
                    vm.tdInTrIndex = index;
                };
                trCtrl.initTdInTr(vm);
            };
        }
        UtilTableTrTdDirective.instance = function () {
            return new UtilTableTrTdDirective();
        };
        UtilTableTrTdDirective.$inject = [];
        return UtilTableTrTdDirective;
    }());
    main_app_1.app
        .directive('utilTableHead', UtilTabledHeadDirective.instance)
        .directive('utilTableTr', UtilTableTrDirective.instance)
        .directive('utilTableTrTd', UtilTableTrTdDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFrQkE7UUFnQkk7WUFPQSxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsZUFBVSxHQUFZLElBQUksQ0FBQztZQUMzQixVQUFLLEdBQUc7Z0JBRUosWUFBWSxFQUFDLEdBQUc7Z0JBRWhCLGNBQWMsRUFBQyxHQUFHO2dCQUVsQixhQUFhLEVBQUMsR0FBRztnQkFTakIsWUFBWSxFQUFFLEdBQUc7Z0JBUWpCLGVBQWUsRUFBRSxHQUFHO2FBQ3ZCLENBQUM7WUFFRixpQkFBWSxHQUFHLFdBQVcsQ0FBQztZQUMzQixhQUFRLEdBQUcsU0FBUyxDQUFDO1lBRXJCLGVBQVUsR0FBRyxVQUFVLE1BQVU7Z0JBQzdCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztnQkFFZCxFQUFFLENBQUMsSUFBSSxHQUFHO29CQUNOLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUN2QixFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUUsV0FBVyxJQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQzt3QkFDN0UsRUFBRSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLENBQUM7b0JBQUEsSUFBSSxDQUFBLENBQUM7d0JBQ0YsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLENBQUM7b0JBQ0QsRUFBRSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsYUFBYSxJQUFJLEtBQUssQ0FBQztvQkFFNUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7b0JBRW5CLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUNoQyxDQUFDLENBQUM7Z0JB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Q3BFLFlBQU8sR0FBVyxlQUFlLENBQUM7WUFDbEMsVUFBSyxHQUFZLElBQUksQ0FBQztZQUV0QixTQUFJLEdBQUcsVUFBVSxLQUFVLEVBQUUsT0FBWSxFQUFFLEtBQVUsRUFBRSxNQUFXO2dCQUM5RCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUM7Z0JBQ2YsRUFBRSxDQUFDLGVBQWUsR0FBRyxVQUFVLE1BQWM7b0JBQ3pDLEVBQUUsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2dCQUM3QixDQUFDLENBQUM7Z0JBRUYsRUFBRSxDQUFDLGNBQWMsR0FBRyxVQUFVLEtBQVk7b0JBQ3RDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMzQixDQUFDLENBQUM7Z0JBRUYsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUE7UUE1QkQsQ0FBQztRQUVNLCtCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQ3hDLENBQUM7UUFQTSw4QkFBTyxHQUFrQixFQUFFLENBQUM7UUFnQ3ZDLDZCQUFDO0tBakNELEFBaUNDLElBQUE7SUFFRCxjQUFHO1NBQ0UsU0FBUyxDQUFDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxRQUFRLENBQUM7U0FDNUQsU0FBUyxDQUFDLGFBQWEsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRLENBQUM7U0FDdkQsU0FBUyxDQUFDLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FDL0QiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RhYmxlLmh0bWxcIiBuYW1lPVwidGFibGVIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RhYmxlLXRyLXRkLmh0bWxcIiBuYW1lPVwidGFibGVUclRkSHRtbFwiIC8+XHJcbi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90YWJsZS10ci10ZGQuaHRtbFwiIG5hbWU9XCJ0YWJsZVRyVGRkSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4vdGFibGUtcGFyYW1zXCI7XHJcbmRlY2xhcmUgY29uc3QgdGFibGVIdG1sOiBhbnk7XHJcblxyXG5kZWNsYXJlIGNvbnN0IHRhYmxlVHJUZEh0bWw6IGFueTtcclxuZGVjbGFyZSBjb25zdCB0YWJsZVRyVGRkSHRtbDogYW55O1xyXG5cclxuXHJcbmRlY2xhcmUgY29uc3QgYW5ndWxhcjogYW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCAnY3NzIS4vdGFibGUuY3NzJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmNsYXNzIFV0aWxUYWJsZWRIZWFkRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgaGFzU2VyaWFsOmJvb2xlYW47XHJcbiAgICBoYXNDaGVjazpib29sZWFuO1xyXG5cclxuICAgIGhlYWREYXRhTGlzdDpBcnJheTxJVGFibGVIZWFkZXI+O1xyXG5cclxuICAgIGJvZHlUckxpc3Q6QXJyYXk8YW55PjtcclxuICAgIGluaXRVbml0VGFibGVUcjpGdW5jdGlvbjtcclxuXHJcbiAgICBpbml0OkZ1bmN0aW9uO1xyXG5cclxuICAgIGNoZWNrQm94QWxsOmJvb2xlYW47XHJcbiAgICBjaGFuZ2VUZEluVHJTaG93U3RhdHVzOkZ1bmN0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxUYWJsZWRIZWFkRGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICAvLyDlpLTpg6jkv6Hmga/liJfooaggOkFycmF5PElUYWJsZUhlYWRlcj7moLzlvI8g5b+F5LygXHJcbiAgICAgICAgdGFibGVIZWFkZXJzOic9JywgLy8g6KGo5qC85pWw5o2uXHJcbiAgICAgICAgLy/mmK/lkKYg5pi+56S6IOW6j+WPt+WIl1xyXG4gICAgICAgIHRhYmxlSGFzU2VyaWFsOic9JyxcclxuICAgICAgICAvL+aYr+WQpiDlj6/lgZog5omT6ZKp6YCJ5oupXHJcbiAgICAgICAgdGFibGVIYXNDaGVjazonPScsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIOeCueWHu+aOkuW6j+WbnuiwgyBleCA6IHRhYmxlLXNvcnQtZnVuID0gXCIgWFhYRnVuKHNvcnRJbmRleCxmaWVsZE5hbWUsc29ydFN0YXR1cylcIlxyXG4gICAgICAgICAqIEB0aW1lOiAyMDE3LTA1LTAzIDE0OjMwOjM0XHJcbiAgICAgICAgICogQHBhcmFtczogc29ydEluZGV4Om51bWJlciDmjpLluo/liJfkuIvmoIdcclxuICAgICAgICAgKiBAcGFyYW1zOiBmaWVsZE5hbWU6c3RyaW5nIOaOkuW6j+WIl+S4i+aghyDlr7nlupTmjpLluo/lsZ7mgKflkI3np7AgPSBmaWVsZFxyXG4gICAgICAgICAqIEBwYXJhbXM6IHNvcnRTdGF0dXM6bnVtYmVyIDEg5q2j5bqP44CBMCDlgJLluo9cclxuICAgICAgICAgKiBAcmV0dXJuOlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRhYmxlU29ydEZ1bjogJyYnLC8vIOeCueWHu3NvcnQg77yMdGFibGUg5pWw5o2u5pS55Y+YXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogIOeCueWHu2NoZWNrYm94IOWbnuiwgyAgZXgg77yadGFibGUtYWZ0ZXItY2hlY2sgPSBcIiBYWFhGdW4oY2hlY2tMaXN0LGlzQ2hlY2tBbGwpXCJcclxuICAgICAgICAgKiBAdGltZTogMjAxNy0wNS0wMyAxNDozMDozNFxyXG4gICAgICAgICAqIEBwYXJhbXM6IGNoZWNrTGlzdDpBcnJheTxib29sZWFuPiDliJfpgInmi6nnu5Pmnpzpm4blkIhcclxuICAgICAgICAgKiBAcGFyYW1zOiBpc0NoZWNrQWxsOmJvb2xlYW4g5piv5ZCm5YWo6YCJ5qCH6K+G6L+U5ZueXHJcbiAgICAgICAgICogQHJldHVybjpcclxuICAgICAgICAgKi9cclxuICAgICAgICB0YWJsZUFmdGVyQ2hlY2s6ICcmJywvLyDngrnlh7sg6YCJ5oupIOaJk+mSqeWQjui/lOWbnlxyXG4gICAgfTtcclxuXHJcbiAgICBjb250cm9sbGVyQXMgPSAndGFibGVjdHJsJztcclxuICAgIHRlbXBsYXRlID0gdGFibGVIdG1sO1xyXG5cclxuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlOmFueSkge1xyXG4gICAgICAgIGxldCB2bSAgPXRoaXM7XHJcbiAgICAgICAgLy92bS5oZWFkRGF0YUxpc3QgPSBoZWFkRGF0YUZvcm1hdCgkc2NvcGUudGFibGVIZWFkZXJzKTtcclxuICAgICAgICB2bS5pbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2bS5jaGVja0JveEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZigodHlwZW9mKCRzY29wZS50YWJsZUhhc1NlcmlhbCkhPVwidW5kZWZpbmVkXCImJigkc2NvcGUudGFibGVIYXNTZXJpYWw9PWZhbHNlKSkpe1xyXG4gICAgICAgICAgICAgICAgdm0uaGFzU2VyaWFsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0uaGFzU2VyaWFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2bS5oYXNDaGVjayA9ICRzY29wZS50YWJsZUhhc0NoZWNrIHx8IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdm0uYm9keVRyTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAvLyDliJ3lp4vljJbkvb/nlKjlm57osIPnmoTlj4LmlbBcclxuICAgICAgICAgICAgdm0uY2hhbmdlQ2hlY2tCb3hDYWxsQmFjaygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogdHIgY2hlY2tCb3gg54q25oCB5pS55Y+YIOWtkOWbnuiwg+inpuWPkeeItuaUueWPmO+8jOeItuaUueWPmCDlrZDot5/pmo/niLbmlLnlj5hcclxuICAgICAgICAgKiBAdGltZTogMjAxNy0wNS0wMiAxMDo1NzoyMVxyXG4gICAgICAgICAqIEBwYXJhbXM6IGluZGV477ya5a2QdHLkuIvmoIfvvIwtMeihqOW9k+WJjeWFqOmAieagj+aTjeS9nFxyXG4gICAgICAgICAqIEByZXR1cm46XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdm0uY2hhbmdlVHJDaGVja0JveFN0YXR1cyA9IGZ1bmN0aW9uIChpbmRleDpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKXtcclxuICAgICAgICAgICAgICAgIGlmKHZtLmJvZHlUckxpc3QgJiYgdm0uYm9keVRyTGlzdC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uY2hlY2tCb3hBbGwgPSAhdm0uY2hlY2tCb3hBbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBpOm51bWJlcixsZW46bnVtYmVyLGZsYWc6Ym9vbGVhbiA9IHZtLmNoZWNrQm94QWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHZtLmJvZHlUckxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uYm9keVRyTGlzdFtpXS50ckNoZWNrQm94U3RhdHVzID0gZmxhZztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdm0uYm9keVRyTGlzdFtpbmRleF0udHJDaGVja0JveFN0YXR1cyA9ICF2bS5ib2R5VHJMaXN0W2luZGV4XS50ckNoZWNrQm94U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYodm0uY2hlY2tCb3hBbGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIHZtLmNoZWNrQm94QWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaTpudW1iZXIsbGVuOm51bWJlcixmbGFnOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSB2bS5ib2R5VHJMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF2bS5ib2R5VHJMaXN0W2ldLnRyQ2hlY2tCb3hTdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGxlbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2bS5jaGVja0JveEFsbCA9IGZsYWc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZtLmNoYW5nZUNoZWNrQm94Q2FsbEJhY2soKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/mlLnlj5hjaGVja2JveCDlm57osINcclxuICAgICAgICB2bS5jaGFuZ2VDaGVja0JveENhbGxCYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgJHNjb3BlLnRhYmxlQWZ0ZXJDaGVjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaTpudW1iZXIsbGVuOm51bWJlcjtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRMaXN0OkFycmF5PGJvb2xlYW4+ID1bXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHZtLmJvZHlUckxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRMaXN0LnB1c2godm0uYm9keVRyTGlzdFtpXS50ckNoZWNrQm94U3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZUFmdGVyQ2hlY2soe2NoZWNrTGlzdDpyZXN1bHRMaXN0LGlzQ2hlY2tBbGw6dm0uY2hlY2tCb3hBbGx9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmNoYW5nZVRkU2hvd1N0YXR1cyA9IGZ1bmN0aW9uIChpbmRleDpudW1iZXIsc2hvd1N0YXR1czpib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZtLmhlYWREYXRhTGlzdFtpbmRleF0uaXNTaG93ICA9ICFzaG93U3RhdHVzO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmNoYW5nZVRkSW5UclNob3dTdGF0dXMgPSBmdW5jdGlvbiAoaW5kZXg6bnVtYmVyLHNob3dTdGF0dXM6Ym9vbGVhbikge1xyXG4gICAgICAgICAgICBsZXQgaTpudW1iZXIsbGVuOm51bWJlcjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdm0uYm9keVRyTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYodm0uYm9keVRyTGlzdFtpXS50ZEluVHJMaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdm0uYm9keVRyTGlzdFtpXS50ZEluVHJMaXN0W2luZGV4XS5zZXRUZEluVHJTdGF0dXMoc2hvd1N0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uaW5pdFVuaXRUYWJsZVRyID0gZnVuY3Rpb24odGFibGVCb2R5VHI6VXRpbFRhYmxlVHJEaXJlY3RpdmUpOm51bWJlcntcclxuICAgICAgICAgICAgbGV0IF9pbmRleCA9IHZtLmJvZHlUckxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgaTpudW1iZXIsbGVuOm51bWJlcjtcclxuXHJcbiAgICAgICAgICAgIGlmKHZtLmhlYWREYXRhTGlzdCAmJiAodm0uaGVhZERhdGFMaXN0Lmxlbmd0aCA9PSB0YWJsZUJvZHlUci50ZEluVHJMaXN0Lmxlbmd0aCkpe1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gdGFibGVCb2R5VHIudGRJblRyTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhYmxlQm9keVRyLnRkSW5Uckxpc3RbaV0uc2V0VGRJblRyU3RhdHVzKHZtLmhlYWREYXRhTGlzdFtpXS5pc1Nob3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZtLmJvZHlUckxpc3QucHVzaCh0YWJsZUJvZHlUcik7XHJcbiAgICAgICAgICAgIHJldHVybiBfaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdm0uaW5pdFRyVGQgPSBmdW5jdGlvbih0YWJsZUJvZHlUcjpVdGlsVGFibGVUckRpcmVjdGl2ZSk6bnVtYmVye1xyXG4gICAgICAgICAgICBsZXQgX2luZGV4ID0gdm0uYm9keVRyTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZtLmJvZHlUckxpc3QucHVzaCh0YWJsZUJvZHlUcik7XHJcbiAgICAgICAgICAgIHJldHVybiBfaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8g5Y2V5qCPIOaOkuW6j1xyXG4gICAgICAgIHZtLnRhYmxlQnlTb3J0ID0gZnVuY3Rpb24gKGhlYWRlcl9pbmRleDpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHZtLmhlYWREYXRhTGlzdFtoZWFkZXJfaW5kZXhdLmlzU29ydCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNBc2M6Ym9vbGVhbnxudW1iZXIgPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmKHZtLmhlYWREYXRhTGlzdFtoZWFkZXJfaW5kZXhdLmlzQXNjID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzQXNjID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpc0FzYyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGZpZWxkTmFtZSA9IHZtLmhlYWREYXRhTGlzdFtoZWFkZXJfaW5kZXhdLmZpZWxkO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZVNvcnRGdW4oe3NvcnRJbmRleDpoZWFkZXJfaW5kZXgsZmllbGROYW1lOmZpZWxkTmFtZSxzb3J0U3RhdHVzOmlzQXNjfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdm0uaGVhZERhdGFMaXN0W2hlYWRlcl9pbmRleF0uaXNBc2MgPSBpc0FzYztcclxuXHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godm0uaGVhZERhdGFMaXN0LCBmdW5jdGlvbihkYXRhOklUYWJsZUhlYWRlcixpbmRleDpudW1iZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuaXNTb3J0ICYmIGluZGV4ICE9IGhlYWRlcl9pbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmhlYWREYXRhTGlzdFtpbmRleF0uaXNBc2MgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgndGFibGVIYXNDaGVjaycsIHdhdGNoVGFibGVIYXNDaGVjaywgdHJ1ZSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoVGFibGVIYXNDaGVjayhuZXdEYXRhOmJvb2xlYW4sb2xkRGF0YTpib29sZWFuKXtcclxuICAgICAgICAgICAgdm0uaGFzQ2hlY2sgPSBuZXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDmmoLlj6rlr7kgaXNTaG93IOWxnuaApyDmlLnlj5jlupTor6XotbfmlYhcclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCd0YWJsZUhlYWRlcnMnLCB3YXRjaEhlYWRlckRhdGFzUGFyYW1zLCB0cnVlKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gd2F0Y2hIZWFkZXJEYXRhc1BhcmFtcyhuZXdWYWw6QXJyYXk8SVRhYmxlSGVhZGVyPiwgb2xkVmFsOkFycmF5PElUYWJsZUhlYWRlcj4pIHtcclxuICAgICAgICAgICAgaWYobmV3VmFsKXtcclxuICAgICAgICAgICAgICAgIGxldCBpOm51bWJlcixsZW46bnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gb2xkVmFsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYob2xkVmFsW2ldJiZuZXdWYWxbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRWYWxbaV0uaXNTaG93ICE9IG5ld1ZhbFtpXS5pc1Nob3cgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmNoYW5nZVRkSW5UclNob3dTdGF0dXMoaSxuZXdWYWxbaV0uaXNTaG93KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmhlYWREYXRhTGlzdFtpXSA9IG5ld1ZhbFtpXS5pc1Nob3c7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2bS5oZWFkRGF0YUxpc3QgPSBoZWFkRGF0YUZvcm1hdChuZXdWYWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoZWFkRGF0YUZvcm1hdChkYXRhTGlzdDpBcnJheTxJVGFibGVIZWFkZXI+KTpBcnJheTxJVGFibGVIZWFkZXI+e1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdExpc3QgPSBuZXcgQXJyYXk8SVRhYmxlSGVhZGVyPigpO1xyXG4gICAgICAgICAgICAvLyDpu5jorqTmnKrmjIflrpog5Li6IGlzU2hvdyA9IHRydWUgaXNTb3J0PSBmYWxzZTtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGFMaXN0LCBmdW5jdGlvbihkYXRhOklUYWJsZUhlYWRlcil7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gYW5ndWxhci5jb3B5KGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiByZXN1bHQuaXNTaG93ID09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuaXNTaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgZGF0YS5pc1NvcnQgPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5pc1NvcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHRMaXN0LnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBlbGVtZW50OiBhbnksIGF0dHJzOiBhbnksIGNvbnRyb2xsZXI6IFV0aWxUYWJsZWRIZWFkRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5pbml0KCk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBVdGlsVGFibGVUckRpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGNvbXBpbGUnXTtcclxuXHJcbiAgICAkY29tcGlsZTphbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxUYWJsZVRyRGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJJblRhYmxlSW5kZXg6bnVtYmVyO1xyXG4gICAgdHJDaGVja0JveFN0YXR1czpib29sZWFuO1xyXG5cclxuXHJcbiAgICB0ZEluVHJMaXN0OkFycmF5PFV0aWxUYWJsZVRyVGREaXJlY3RpdmU+O1xyXG5cclxuICAgIGluaXRUZEluVHI6RnVuY3Rpb247XHJcblxyXG4gICAgaW5pdDpGdW5jdGlvbjtcclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0FFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICByZXF1aXJlOiBzdHJpbmcgPSAnP151dGlsVGFibGVIZWFkJztcclxuICAgIHNjb3BlOmJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGU6IGFueSwgJGVsZW1lbnQ6IGFueSwgJGF0dHJzOiBhbnksJGNvbXBpbGU6IGFueSkge1xyXG4gICAgICAgICRzY29wZS4kY29tcGlsZSA9ICRjb21waWxlO1xyXG4gICAgICAgIGxldCB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS50ZEluVHJMaXN0ID0gW107XHJcblxyXG4gICAgICAgIHZtLmluaXRUZEluVHIgPSBmdW5jdGlvbiAodGRJblRyRGF0YTpVdGlsVGFibGVUclRkRGlyZWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRkSW5UckRhdGEuc2V0VGRJblRySW5kZXggPSAkc2NvcGUudGRJblRyTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgICRzY29wZS50ZEluVHJMaXN0LnB1c2godGRJblRyRGF0YSk7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgY29udHJvbGxlckFzOiAndGFibGVUckN0cmwnO1xyXG4gICAgdGVtcGxhdGU6IHN0cmluZyA9Jzx0ciAgY2xhc3M9XCJcIiBuZy10cmFuc2NsdWRlPic7XHJcblxyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCAkZWxlbWVudDogYW55LCBhdHRyczogYW55LCB0YWJsZUN0cmw6IGFueSkge1xyXG5cclxuICAgICAgICBsZXQgdm0gPXNjb3BlO1xyXG4gICAgICAgIC8vICDlhrPlrprmmK/lkKbmmL7npLogY2hlY2sgYm94XHJcbiAgICAgICAgdm0uaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZtLnRySW5UYWJsZUluZGV4ID0gdGFibGVDdHJsLmluaXRVbml0VGFibGVUcih2bSk7XHJcbiAgICAgICAgICAgIHZtLnRyQ2hlY2tCb3hTdGF0dXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYodGFibGVDdHJsLmhhc1NlcmlhbCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtU3RyID0gJyc7XHJcbiAgICAgICAgICAgICAgICBpZih0YWJsZUN0cmwuaGFzQ2hlY2spe1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbVN0ciA9IHRhYmxlVHJUZEh0bWw7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1TdHIgPSB0YWJsZVRyVGRkSHRtbDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgX2VsZW1lbnQgPSB2bS4kY29tcGlsZSh0ZW1TdHIpKHZtKTtcclxuICAgICAgICAgICAgICAgICRlbGVtZW50LnByZXBlbmQoX2VsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/mlLnlj5jpgInmi6kgY2hhY2tib3hcclxuICAgICAgICB2bS5jaGFuZ2VDaGVja0JveFN0YXR1cyA9IGZ1bmN0aW9uIChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgdGFibGVDdHJsLmNoYW5nZVRyQ2hlY2tCb3hTdGF0dXMoaW5kZXgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZtLmluaXQoKTtcclxuXHJcbiAgICAgICAgc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy/plIDmr4Eg5Yid5aeL5YyW5LiA5qyhIOeItlxyXG4gICAgICAgICAgICBpZih2bS50ckluVGFibGVJbmRleCA9PSAwKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJsZUN0cmwuaW5pdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XHJcblxyXG5jbGFzcyBVdGlsVGFibGVUclRkRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGluc3RhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgVXRpbFRhYmxlVHJUZERpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRkSW5UclN0YXR1czpGdW5jdGlvbjtcclxuXHJcbiAgICBzZXRUZEluVHJJbmRleDpGdW5jdGlvbjtcclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0FFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0ZW1wbGF0ZTogc3RyaW5nID0gJzx0ZCBuZy1zaG93PVwidGRJblRyU3RhdHVzXCIgbmctdHJhbnNjbHVkZT48L3RkPic7XHJcbiAgICByZXF1aXJlOiBzdHJpbmcgPSAnXj91dGlsVGFibGVUcic7XHJcbiAgICBzY29wZSA6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgbGluayA9IGZ1bmN0aW9uIChzY29wZTogYW55LCBlbGVtZW50OiBhbnksIGF0dHJzOiBhbnksIHRyQ3RybDogYW55KSB7XHJcbiAgICAgICAgbGV0IHZtID0gc2NvcGU7XHJcbiAgICAgICAgdm0uc2V0VGRJblRyU3RhdHVzID0gZnVuY3Rpb24gKHN0YXR1czpib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHZtLnRkSW5UclN0YXR1cyA9IHN0YXR1cztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2bS5zZXRUZEluVHJJbmRleCA9IGZ1bmN0aW9uIChpbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgdm0udGRJblRySW5kZXggPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0ckN0cmwuaW5pdFRkSW5Ucih2bSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLmRpcmVjdGl2ZSgndXRpbFRhYmxlSGVhZCcsIFV0aWxUYWJsZWRIZWFkRGlyZWN0aXZlLmluc3RhbmNlKVxyXG4gICAgLmRpcmVjdGl2ZSgndXRpbFRhYmxlVHInLCBVdGlsVGFibGVUckRpcmVjdGl2ZS5pbnN0YW5jZSlcclxuICAgIC5kaXJlY3RpdmUoJ3V0aWxUYWJsZVRyVGQnLCBVdGlsVGFibGVUclRkRGlyZWN0aXZlLmluc3RhbmNlKVxyXG47Il19