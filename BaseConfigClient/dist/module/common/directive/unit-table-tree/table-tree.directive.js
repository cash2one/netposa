define(["require", "exports", "text!./table-tree.html", "../../app/main.app", "angular", "css!./table-tree.css"], function (require, exports, tableTreeHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilTabledTreeDirective = (function () {
        function UtilTabledTreeDirective() {
            this.restrict = 'E';
            this.replace = true;
            this.transclude = true;
            this.scope = {
                treeChild: '=',
                treeChildLevel: '@',
                treeChildIndex: '=',
                treeChildParentName: '@',
                treeChildParent: '=',
                treeChildCheck: '=',
                treeChildCheckBtn: '&',
                treeChildClick: "&",
                treeChildUpdateBtn: "&",
                treeChildDeleteBtn: "&",
                treeChildAddPersonBtn: '&'
            };
            this.controllerAs = 'tableTreeCtrl';
            this.template = tableTreeHtml;
            this.controller = function ($scope, $compile, $timeout) {
                var _this = this;
                $scope.$compile = $compile;
                if ($scope.treeChildLevel) {
                    this.currentLevel = parseInt($scope.treeChildLevel) + 1;
                }
                else {
                    this.currentLevel = 1;
                }
                this.initFromParent = function () {
                    var _this = this;
                    if ($scope.treeChildParent.length > 0) {
                        console.log("%c table tree 当前 头部行数据名称 " + $scope.treeChildParent.length, "color:green");
                        this.dataChild = [];
                        $timeout(function () {
                            _this.dataChild = angular.copy($scope.treeChildParent);
                        });
                        this.dataChild.isCheckBox = false;
                    }
                    else {
                        console.error("tree-child-parent 数据格式出错，需要带{{}} 且为数组");
                        $timeout(function () {
                            _this.dataChild = [];
                        });
                    }
                    this.isTreeTop = true;
                };
                if ($scope.treeChildParent) {
                    if ($scope.treeChildParent.length > 0) {
                        console.log("%c table tree 当前 头部行数据名称 " + $scope.treeChildParent.length, "color:green");
                        this.dataChild = [];
                        $timeout(function () {
                            _this.dataChild = angular.copy($scope.treeChildParent);
                        });
                        this.dataChild.isCheckBox = false;
                        if ($scope.treeChildIndex || $scope.treeChildIndex == 0) {
                            this.treeChildIndex = $scope.treeChildIndex;
                            if (!$scope.treeChildCheck) {
                                this.currentCheckBox = false;
                            }
                        }
                    }
                    else {
                        console.error("tree-child-parent 数据格式出错，需要带{{}} 且为数组");
                        $timeout(function () {
                            _this.dataChild = [];
                        });
                    }
                    this.isTreeTop = true;
                }
                else {
                    this.isTreeTop = false;
                    console.log("%c table tree 当前行数据名称 " + $scope.treeChild.Name, "color:green");
                    this.treeChildIndex = $scope.treeChildIndex;
                    if ($scope.treeChild) {
                        this.dataChild = $scope.treeChild;
                        if ($scope.treeChildParentName) {
                            this.treeChildParentName = $scope.treeChildParentName;
                        }
                        else {
                            if (this.dataChild.JsonUserData && this.dataChild.JsonUserData.Area) {
                                this.treeChildParentName = this.dataChild.JsonUserData.Area.Name;
                            }
                        }
                    }
                    if (!$scope.treeChildCheck) {
                        this.dataChild.isCheckBox = false;
                    }
                    else {
                        this.dataChild.isCheckBox = $scope.treeChildCheck;
                    }
                }
                this.changeChildShow = function () {
                    console.log("改变子显示状态，当前 下标---名称：", $scope.treeChildIndex + "---" + this.dataChild.name);
                    this.dataChild.isShowChild = !this.dataChild.isShowChild;
                };
                this.changeCheckBox = function () {
                    this.dataChild.isCheckBox = !this.dataChild.isCheckBox;
                    $scope.treeChildCheckBtn({ checkResult: this.dataChild, preStatus: this.dataChild.isCheckBox });
                    this.afterCheckBoxToChild(this.dataChild.isCheckBox);
                };
                this.afterCheckBoxToChild = function (newStatus) {
                    console.log("打钩当前改变 关联 通知子 ： ", this.dataChild.children || "无子");
                    if (this.dataChild.children && this.dataChild.children.length > 0) {
                        this.dataChild.children.forEach(function (val) {
                            val.isCheckBox = newStatus;
                        });
                    }
                };
                this.childCheckBtnCallBack = function (checkResult, preStatus) {
                    console.log("子向父冒泡后 收到子的状态：", preStatus);
                    console.log("子向父冒泡后 父当前状态：", this.dataChild.isCheckBox);
                    var flag = preStatus;
                    if (this.dataChild.isCheckBox) {
                        if (preStatus == false) {
                        }
                        $scope.treeChildCheckBtn({ checkResult: checkResult, preStatus: false });
                    }
                    else {
                        $scope.treeChildCheckBtn({ checkResult: checkResult, preStatus: false });
                    }
                };
                this.changeTopChildShow = function () {
                    var _this = this;
                    this.dataChild.isCheckBox = !this.dataChild.isCheckBox;
                    console.log("最上级关联子");
                    this.dataChild.forEach(function (val) {
                        console.log(_this.dataChild.isCheckBox);
                        val.isCheckBox = _this.dataChild.isCheckBox;
                    });
                    this.mainCheckBtnCallBack(false, this.dataChild.isCheckBox);
                };
                this.mainCheckBtnCallBack = function (_result, preStatus) {
                    var _this = this;
                    console.log("最终返回", _result, preStatus);
                    console.log("最终返回========", this.dataChild);
                    if (_result) {
                        if (this.dataChild.isCheckBox) {
                            this.dataChild.forEach(function (val) {
                                if (val.isCheckBox == false) {
                                    console.log("最终改变全部xuan========", _this.dataChild.isCheckBox);
                                    _this.dataChild.isCheckBox = false;
                                    return;
                                }
                            });
                            console.log("最终改变全部xuan========", this.dataChild.isCheckBox);
                        }
                        else {
                            var flag_1 = true;
                            this.dataChild.forEach(function (val) {
                                if (val.isCheckBox == false) {
                                    flag_1 = false;
                                    return;
                                }
                            });
                            console.log("最终改变全部xuan========", flag_1);
                            this.dataChild.isCheckBox = flag_1;
                        }
                    }
                    if (!this.paramsIsFunction($scope.treeChildCheckBtn)) {
                        return;
                    }
                    $timeout(function () {
                        var resultList = getTreeIsCheckList(_this.dataChild, []);
                        console.log("最终 多选后接收到ID结果集合：：：：", resultList);
                        console.log("最终 多选后 当前操作：：：：", _result);
                        console.log("最终 多选后 操作后状态：：：：", preStatus);
                        $scope.treeChildCheckBtn({ checkResult: resultList, checkIndex: _result, preStatus: preStatus });
                    });
                };
                this.childUpdateBtnCallBack = function (itemData, parentName) {
                    if (this.paramsIsFunction($scope.treeChildDeleteBtn)) {
                        $scope.treeChildUpdateBtn({ itemData: itemData, parentName: parentName });
                    }
                };
                this.childDeleteBtnCallBack = function (data) {
                    if (this.paramsIsFunction($scope.treeChildDeleteBtn)) {
                        $scope.treeChildDeleteBtn({ itemData: data });
                    }
                };
                this.childAddPersonBtnCallBack = function (itemData, parentName) {
                    if ($scope.treeChildAddPersonBtn) {
                        $scope.treeChildAddPersonBtn({ itemData: itemData, parentName: parentName });
                    }
                };
                this.paramsIsFunction = function (param) {
                    if (typeof param === "function") {
                        return true;
                    }
                    return false;
                };
                function getTreeIsCheckList(data, resultList) {
                    var Deep, T, F;
                    for (F = data.length; F;) {
                        T = data[--F];
                        if (T.isCheckBox)
                            resultList.push(T.ID);
                        if (T.children) {
                            Deep = getTreeIsCheckList(T.children, resultList);
                            if (Deep) {
                            }
                        }
                    }
                    return resultList;
                }
            };
            this.compile = function (element) {
                return directiveHelper(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
                    scope.$watch('treeChildCheck', watchChildCheck, true);
                    function watchChildCheck(newData, oldData) {
                        controller.afterCheckBoxToChild(newData);
                    }
                    scope.$watch('treeChildParent', function (newVal, oldVal) {
                        console.log("数据链改变。。。", oldVal, newVal, oldVal === newVal);
                        if (oldVal === newVal) {
                        }
                        else {
                            console.log("数据链改变。。。重新初始化");
                            controller.initFromParent();
                        }
                    }, true);
                    console.log(controller);
                });
                function directiveHelper(element, link) {
                    if (angular.isFunction(link)) {
                        link = { post: link };
                    }
                    var contents = element.contents().remove();
                    var compiledContents;
                    return {
                        pre: (link && link.pre) ? link.pre : null,
                        post: function (scope, element) {
                            if (!compiledContents) {
                                compiledContents = scope.$compile(contents);
                            }
                            compiledContents(scope, function (clone) {
                                element.append(clone);
                            });
                            if (link && link.post) {
                                link.post.apply(null, arguments);
                                console.log("%c 渲染完成", "color:orange");
                            }
                        }
                    };
                }
            };
        }
        UtilTabledTreeDirective.instance = function () {
            return new UtilTabledTreeDirective();
        };
        UtilTabledTreeDirective.$inject = ['$compile', '$timeout'];
        return UtilTabledTreeDirective;
    }());
    main_app_1.app
        .directive('utilTableTree', UtilTabledTreeDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlLXRyZWUvdGFibGUtdHJlZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBU0E7UUFHSTtZQVFBLGFBQVEsR0FBVyxHQUFHLENBQUM7WUFDdkIsWUFBTyxHQUFZLElBQUksQ0FBQztZQUN4QixlQUFVLEdBQVksSUFBSSxDQUFDO1lBQzNCLFVBQUssR0FBRztnQkFDSixTQUFTLEVBQUMsR0FBRztnQkFDYixjQUFjLEVBQUMsR0FBRztnQkFFbEIsY0FBYyxFQUFDLEdBQUc7Z0JBQ2xCLG1CQUFtQixFQUFDLEdBQUc7Z0JBSXZCLGVBQWUsRUFBQyxHQUFHO2dCQUVuQixjQUFjLEVBQUMsR0FBRztnQkFDbEIsaUJBQWlCLEVBQUMsR0FBRztnQkFFckIsY0FBYyxFQUFDLEdBQUc7Z0JBQ2xCLGtCQUFrQixFQUFDLEdBQUc7Z0JBQ3RCLGtCQUFrQixFQUFDLEdBQUc7Z0JBQ3RCLHFCQUFxQixFQUFDLEdBQUc7YUFDNUIsQ0FBQztZQUVGLGlCQUFZLEdBQUcsZUFBZSxDQUFDO1lBQy9CLGFBQVEsR0FBRyxhQUFhLENBQUM7WUFFekIsZUFBVSxHQUFHLFVBQVUsTUFBVSxFQUFDLFFBQVksRUFBQyxRQUFpQjtnQkFBbkQsaUJBcVBaO2dCQXBQRyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQzFCLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRztvQkFBQSxpQkFlckI7b0JBZEcsRUFBRSxDQUFBLENBQUMs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Z0JBQWdCLENBQUMsQ0FBQSxDQUFDO2dDQUNsQixnQkFBZ0IsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzRCQUNoRCxDQUFDOzRCQUVELGdCQUFnQixDQUFDLEtBQUssRUFBRSxVQUFTLEtBQVM7Z0NBQ3RDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQzFCLENBQUMsQ0FBQyxDQUFDOzRCQUdILEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztnQ0FDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dDQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBQyxjQUFjLENBQUMsQ0FBQzs0QkFDMUMsQ0FBQzt3QkFDTCxDQUFDO3FCQUNKLENBQUM7Z0JBQ04sQ0FBQztZQUNMLENBQUMsQ0FBQTtRQTFWRCxDQUFDO1FBRU0sZ0NBQVEsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixFQUFFLENBQUM7UUFDekMsQ0FBQztRQVJNLCtCQUFPLEdBQWtCLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBZ1c1RCw4QkFBQztLQWpXRCxBQWlXQyxJQUFBO0lBRUQsY0FBRztTQUVFLFNBQVMsQ0FBQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQ2hFIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUtdHJlZS90YWJsZS10cmVlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi90YWJsZS10cmVlLmh0bWxcIiBuYW1lPVwidGFibGVUcmVlSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vYXBwL21haW4uYXBwJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0ICdjc3MhLi90YWJsZS10cmVlLmNzcyc7XHJcblxyXG5kZWNsYXJlIGNvbnN0IHRhYmxlVHJlZUh0bWw6IGFueTtcclxuZGVjbGFyZSBjb25zdCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBVdGlsVGFibGVkVHJlZURpcmVjdGl2ZSB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogQXJyYXk8c3RyaW5nPiA9IFsnJGNvbXBpbGUnLCckdGltZW91dCddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsVGFibGVkVHJlZURpcmVjdGl2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3RyaWN0OiBzdHJpbmcgPSAnRSc7XHJcbiAgICByZXBsYWNlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHRyYW5zY2x1ZGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgc2NvcGUgPSB7XHJcbiAgICAgICAgdHJlZUNoaWxkOic9JyxcclxuICAgICAgICB0cmVlQ2hpbGRMZXZlbDonQCcsXHJcblxyXG4gICAgICAgIHRyZWVDaGlsZEluZGV4Oic9JyxcclxuICAgICAgICB0cmVlQ2hpbGRQYXJlbnROYW1lOidAJyxcclxuXHJcblxyXG5cclxuICAgICAgICB0cmVlQ2hpbGRQYXJlbnQ6Jz0nLFxyXG5cclxuICAgICAgICB0cmVlQ2hpbGRDaGVjazonPScsXHJcbiAgICAgICAgdHJlZUNoaWxkQ2hlY2tCdG46JyYnLFxyXG5cclxuICAgICAgICB0cmVlQ2hpbGRDbGljazpcIiZcIixcclxuICAgICAgICB0cmVlQ2hpbGRVcGRhdGVCdG46XCImXCIsLy9pdGVtRGF0YVxyXG4gICAgICAgIHRyZWVDaGlsZERlbGV0ZUJ0bjpcIiZcIiwvL2l0ZW1EYXRhXHJcbiAgICAgICAgdHJlZUNoaWxkQWRkUGVyc29uQnRuOicmJy8vaXRlbURhdGFcclxuICAgIH07XHJcbiAgLy8gIHJlcXVpcmU6IHN0cmluZyA9ICc/XnV0aWxUYWJsZVRyZWVIZWFkJztcclxuICAgIGNvbnRyb2xsZXJBcyA9ICd0YWJsZVRyZWVDdHJsJztcclxuICAgIHRlbXBsYXRlID0gdGFibGVUcmVlSHRtbDtcclxuXHJcbiAgICBjb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZTphbnksJGNvbXBpbGU6YW55LCR0aW1lb3V0OkZ1bmN0aW9uKSB7XHJcbiAgICAgICAgJHNjb3BlLiRjb21waWxlID0gJGNvbXBpbGU7XHJcbiAgICAgICAgaWYoJHNjb3BlLnRyZWVDaGlsZExldmVsKXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSBwYXJzZUludCgkc2NvcGUudHJlZUNoaWxkTGV2ZWwpICsgMTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRGcm9tUGFyZW50ID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoJHNjb3BlLnRyZWVDaGlsZFBhcmVudC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIHRhYmxlIHRyZWUg5b2T5YmNIOWktOmDqOihjOaVsOaNruWQjeensCBcIiArICRzY29wZS50cmVlQ2hpbGRQYXJlbnQubGVuZ3RoLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IGFuZ3VsYXIuY29weSgkc2NvcGUudHJlZUNoaWxkUGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ0cmVlLWNoaWxkLXBhcmVudCDmlbDmja7moLzlvI/lh7rplJnvvIzpnIDopoHluKZ7e319IOS4lOS4uuaVsOe7hFwiKTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXNUcmVlVG9wID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkUGFyZW50KXtcclxuXHJcbiAgICAgICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGRQYXJlbnQubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyB0YWJsZSB0cmVlIOW9k+WJjSDlpLTpg6jooYzmlbDmja7lkI3np7AgXCIgKyAkc2NvcGUudHJlZUNoaWxkUGFyZW50Lmxlbmd0aCxcImNvbG9yOmdyZWVuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQgPSBbXTtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQgPSBhbmd1bGFyLmNvcHkoJHNjb3BlLnRyZWVDaGlsZFBhcmVudCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGRJbmRleCB8fCAkc2NvcGUudHJlZUNoaWxkSW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlQ2hpbGRJbmRleCA9ICRzY29wZS50cmVlQ2hpbGRJbmRleDtcclxuICAgICAgICAgICAgICAgICAgICBpZighJHNjb3BlLnRyZWVDaGlsZENoZWNrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50Q2hlY2tCb3ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRyZWUtY2hpbGQtcGFyZW50IOaVsOaNruagvOW8j+WHuumUme+8jOmcgOimgeW4pnt7fX0g5LiU5Li65pWw57uEXCIpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1RyZWVUb3AgPSB0cnVlO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmlzVHJlZVRvcCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyB0YWJsZSB0cmVlIOW9k+WJjeihjOaVsOaNruWQjeensCBcIiArICRzY29wZS50cmVlQ2hpbGQuTmFtZSxcImNvbG9yOmdyZWVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVDaGlsZEluZGV4ID0gJHNjb3BlLnRyZWVDaGlsZEluZGV4O1xyXG4gICAgICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkID0gJHNjb3BlLnRyZWVDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkUGFyZW50TmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlQ2hpbGRQYXJlbnROYW1lID0gJHNjb3BlLnRyZWVDaGlsZFBhcmVudE5hbWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRhdGFDaGlsZC5Kc29uVXNlckRhdGEgJiYgdGhpcy5kYXRhQ2hpbGQuSnNvblVzZXJEYXRhLkFyZWEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVDaGlsZFBhcmVudE5hbWUgPSB0aGlzLmRhdGFDaGlsZC5Kc29uVXNlckRhdGEuQXJlYS5OYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighJHNjb3BlLnRyZWVDaGlsZENoZWNrKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gJHNjb3BlLnRyZWVDaGlsZENoZWNrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VDaGlsZFNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pS55Y+Y5a2Q5pi+56S654q25oCB77yM5b2T5YmNIOS4i+aghy0tLeWQjeensO+8mlwiLCRzY29wZS50cmVlQ2hpbGRJbmRleCArIFwiLS0tXCIgKyB0aGlzLmRhdGFDaGlsZC5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNTaG93Q2hpbGQgPSAhdGhpcy5kYXRhQ2hpbGQuaXNTaG93Q2hpbGQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+aUueWPmCDmiZPpkqnnirbmgIFcclxuICAgICAgICB0aGlzLmNoYW5nZUNoZWNrQm94ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gISB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94O1xyXG4gICAgICAgICAgICAvL+S4i+e6p+aJk+mSqeWbnuiwg++8jOWQkeS4iuWGkuazoemAmuefpSDlvZPliY0g5pS55Y+Y5ZCO55qE54q25oCBXHJcbiAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGRDaGVja0J0bih7Y2hlY2tSZXN1bHQ6dGhpcy5kYXRhQ2hpbGQscHJlU3RhdHVzOnRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3h9KTtcclxuICAgICAgICAgICAgLy/mlLnlj5gg5omT6ZKp54q25oCBIOWFs+iBlOWtkFxyXG4gICAgICAgICAgICB0aGlzLmFmdGVyQ2hlY2tCb3hUb0NoaWxkKHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3gpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/mlLnlj5gg5omT6ZKp54q25oCBIOWFs+iBlOWtkFxyXG4gICAgICAgIHRoaXMuYWZ0ZXJDaGVja0JveFRvQ2hpbGQgPSBmdW5jdGlvbiAobmV3U3RhdHVzOmJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmiZPpkqnlvZPliY3mlLnlj5gg5YWz6IGUIOmAmuefpeWtkCDvvJogXCIsdGhpcy5kYXRhQ2hpbGQuY2hpbGRyZW4gfHxcIuaXoOWtkFwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhQ2hpbGQuY2hpbGRyZW4gJiYgdGhpcy5kYXRhQ2hpbGQuY2hpbGRyZW4ubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuY2hpbGRyZW4uZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICB2YWwuaXNDaGVja0JveCA9IG5ld1N0YXR1cztcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5a2Q5pS25Yiw54i25omT6ZKp5pS55Y+YIOmAmuefpeWtkFxyXG5cclxuXHJcbiAgICAgICAgLy/kuIvnuqfmiZPpkqnlm57osIPvvIzlkJHkuIrlhpLms6HpgJrnn6VcclxuICAgICAgICB0aGlzLmNoaWxkQ2hlY2tCdG5DYWxsQmFjayA9IGZ1bmN0aW9uIChjaGVja1Jlc3VsdDphbnkscHJlU3RhdHVzOmJvb2xlYW4pIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZDlkJHniLblhpLms6HlkI4g5pS25Yiw5a2Q55qE54q25oCB77yaXCIscHJlU3RhdHVzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlrZDlkJHniLblhpLms6HlkI4g54i25b2T5YmN54q25oCB77yaXCIsdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCk7XHJcbiAgICAgICAgICAgIGxldCBmbGFnID0gcHJlU3RhdHVzO1xyXG4gICAgICAgICAgICAvL+W9k+WJjSDpgInkuK1cclxuICAgICAgICAgICAgaWYodGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCl7XHJcbiAgICAgICAgICAgICAgICAvL+WtkOW3suS4jemAiVxyXG4gICAgICAgICAgICAgICAgaWYocHJlU3RhdHVzID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlvZPliY0g5pS5IOS4jemAiVxyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5ZCR5LiK5YaS5rOh6YCa55+lIOW9k+WJjSDmlLnlj5jlkI7nmoTnirbmgIFcclxuICAgICAgICAgICAgICAgICAvLyAgICRzY29wZS50cmVlQ2hpbGRDaGVja0J0bih7Y2hlY2tSZXN1bHQ6Y2hlY2tSZXN1bHQscHJlU3RhdHVzOmZhbHNlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQ2hlY2tCdG4oe2NoZWNrUmVzdWx0OmNoZWNrUmVzdWx0LHByZVN0YXR1czpmYWxzZX0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIC8v5b2T5YmNIOS4jemAieS4rVxyXG5cclxuICAgICAgICAgICAgICAgIC8v5a2Q6YCJIOS4jeWFs+iBlOeItlxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVDaGlsZENoZWNrQnRuKHtjaGVja1Jlc3VsdDpjaGVja1Jlc3VsdCxwcmVTdGF0dXM6ZmFsc2V9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgLyogICBjb25zb2xlLmxvZyhjaGVja1Jlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudENoZWNrQm94ID09IGNoZWNrUmVzdWx0LmNoZWNrQm94KXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkQ2hlY2tCdG4pe1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVDaGlsZENoZWNrQnRuKHtjaGVja1Jlc3VsdDpjaGVja1Jlc3VsdCxwcmVJbmRleDoodGhpcy50cmVlQ2hpbGRJbmRleCArIFwiLS1cIitwcmVJbmRleCl9KTtcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL1RPRE8g5pyJ6Zeu6aKY77yM5pqC5pS+IOS4i+e6p+aJk+mSqeWbnuiwgyDmnIDnu4jlkJHmjIfku6TlpJYg5Zue6LCD6YCa55+lXHJcbiAgICAgICAvKiB0aGlzLnRvcENoZWNrQnRuQ2FsbEJhY2sgPSBmdW5jdGlvbiAoZGF0YTphbnkscHJlSW5kZXg6YW55KSB7XHJcbiAgICAgICAgICAgIGxldCB0b3BSZXN1bHRDb3VudDpudW1iZXIgPSB0aGlzLmRhdGFDaGlsZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5yZXN1bHRMaXN0Lmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZXN1bHRMaXN0W2ldLmtleSAgPT0gcHJlSW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuY2hlY2tCb3gpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdExpc3RbaV0ucmVzdWx0LmNoZWNrQm94ID10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aYr+WQpuenu+mZpFxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3VsdExpc3RbaV0ucmVzdWx0LmNoZWNrQm94ID1mYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYWluQ2hlY2tCdG5DYWxsQmFjayh0aGlzLnJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVzdWx0TGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGtleTpwcmVJbmRleCxcclxuICAgICAgICAgICAgICAgIHJlc3VsdDpkYXRhXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLm1haW5DaGVja0J0bkNhbGxCYWNrKHRoaXMucmVzdWx0TGlzdCk7XHJcbiAgICAgICAgfTsqL1xyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZVRvcENoaWxkU2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9ICEgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDkuIrnuqflhbPogZTlrZBcIik7XHJcbiAgICAgICAgICAgIC8v5pS55Y+YIOaJk+mSqeeKtuaAgSDlhbPogZTlrZBcclxuICAgICAgICAgICAgLy/mlLnlj5gg5qCR5qC56IqC54K5XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmZvckVhY2goKHZhbDphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KTtcclxuICAgICAgICAgICAgICAgIHZhbC5pc0NoZWNrQm94ID0gdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNoZWNrQnRuQ2FsbEJhY2soZmFsc2UsdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8v5pyA57uI6YCa55+l5pq06ZyyXHJcbiAgICAgICAgdGhpcy5tYWluQ2hlY2tCdG5DYWxsQmFjayA9IGZ1bmN0aW9uIChfcmVzdWx0OmFueSxwcmVTdGF0dXM6Ym9vbGVhbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iOi/lOWbnlwiLF9yZXN1bHQscHJlU3RhdHVzKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyA57uI6L+U5ZuePT09PT09PT1cIix0aGlzLmRhdGFDaGlsZCk7XHJcbiAgICAgICAgICAgIGlmKF9yZXN1bHQpe1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsLmlzQ2hlY2tCb3ggPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4jmlLnlj5jlhajpg6h4dWFuPT09PT09PT1cIix0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyA57uI5pS55Y+Y5YWo6YOoeHVhbj09PT09PT09XCIsdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsLmlzQ2hlY2tCb3ggPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4jmlLnlj5jlhajpg6h4dWFuPT09PT09PT1cIixmbGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gZmxhZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZighdGhpcy5wYXJhbXNJc0Z1bmN0aW9uKCRzY29wZS50cmVlQ2hpbGRDaGVja0J0bikpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0TGlzdCA9IGdldFRyZWVJc0NoZWNrTGlzdCh0aGlzLmRhdGFDaGlsZCxbXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iCDlpJrpgInlkI7mjqXmlLbliLBJROe7k+aenOmbhuWQiO+8mu+8mu+8mu+8mlwiLHJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4gg5aSa6YCJ5ZCOIOW9k+WJjeaTjeS9nO+8mu+8mu+8mu+8mlwiLF9yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4gg5aSa6YCJ5ZCOIOaTjeS9nOWQjueKtuaAge+8mu+8mu+8mu+8mlwiLHByZVN0YXR1cyk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQ2hlY2tCdG4oe2NoZWNrUmVzdWx0OnJlc3VsdExpc3QsY2hlY2tJbmRleDpfcmVzdWx0LHByZVN0YXR1czpwcmVTdGF0dXN9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZFVwZGF0ZUJ0bkNhbGxCYWNrID0gZnVuY3Rpb24gKGl0ZW1EYXRhOmFueSxwYXJlbnROYW1lOnN0cmluZykge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBhcmFtc0lzRnVuY3Rpb24oJHNjb3BlLnRyZWVDaGlsZERlbGV0ZUJ0bikpe1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVDaGlsZFVwZGF0ZUJ0bih7aXRlbURhdGE6aXRlbURhdGEscGFyZW50TmFtZTpwYXJlbnROYW1lfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkRGVsZXRlQnRuQ2FsbEJhY2sgPSBmdW5jdGlvbiAoZGF0YTphbnkpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wYXJhbXNJc0Z1bmN0aW9uKCRzY29wZS50cmVlQ2hpbGREZWxldGVCdG4pKXtcclxuICAgICAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGREZWxldGVCdG4oe2l0ZW1EYXRhOmRhdGF9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGRBZGRQZXJzb25CdG5DYWxsQmFjayA9IGZ1bmN0aW9uIChpdGVtRGF0YTphbnkscGFyZW50TmFtZTpzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYoJHNjb3BlLnRyZWVDaGlsZEFkZFBlcnNvbkJ0bil7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQWRkUGVyc29uQnRuKHtpdGVtRGF0YTppdGVtRGF0YSxwYXJlbnROYW1lOnBhcmVudE5hbWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/liKTmlq3lj4LmlbAg5piv5ZCm5Li65Ye95pWwXHJcbiAgICAgICAgdGhpcy5wYXJhbXNJc0Z1bmN0aW9uID0gZnVuY3Rpb24ocGFyYW06c3RyaW5nKXtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHBhcmFtICA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/pgY3ljobojrflj5blt7LpgIlJRCDpm4blkIhcclxuICAgICAgICBmdW5jdGlvbiBnZXRUcmVlSXNDaGVja0xpc3QoZGF0YTphbnkscmVzdWx0TGlzdDphbnkpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgdmFyIERlZXA6YW55LFQ6YW55LEY6YW55O1xyXG4gICAgICAgICAgICBmb3IgKEYgPSBkYXRhLmxlbmd0aDtGOylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVCA9IGRhdGFbLS1GXTtcclxuICAgICAgICAgICAgICAgIGlmIChULmlzQ2hlY2tCb3gpIHJlc3VsdExpc3QucHVzaChULklEKTtcclxuICAgICAgICAgICAgICAgIGlmIChULmNoaWxkcmVuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERlZXAgPSBnZXRUcmVlSXNDaGVja0xpc3QoVC5jaGlsZHJlbixyZXN1bHRMaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoRGVlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc3VsdExpc3QucHVzaChEZWVwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZXR1cm4gRGVlcDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdExpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIE1hbnVhbGx5IGNvbXBpbGVzIHRoZSBlbGVtZW50LCBmaXhpbmcgdGhlIHJlY3Vyc2lvbiBsb29wLlxyXG4gICAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgICAqIEBwYXJhbSBbbGlua10gQSBwb3N0LWxpbmsgZnVuY3Rpb24sIG9yIGFuIG9iamVjdCB3aXRoIGZ1bmN0aW9uKHMpIHJlZ2lzdGVyZWQgdmlhIHByZSBhbmQgcG9zdCBwcm9wZXJ0aWVzLlxyXG4gICAgICogQHJldHVybnMgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGxpbmtpbmcgZnVuY3Rpb25zLlxyXG4gICAgICovXHJcbiAgICBjb21waWxlID0gZnVuY3Rpb24oZWxlbWVudDphbnkpIHtcclxuICAgICAgICByZXR1cm4gZGlyZWN0aXZlSGVscGVyKGVsZW1lbnQsZnVuY3Rpb24oc2NvcGU6YW55LCBpRWxlbWVudDphbnksIGlBdHRyczphbnksIGNvbnRyb2xsZXI6YW55LCB0cmFuc2NsdWRlRm46YW55KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDov5nph4zlj6/ku6XlvoBzY29wZeS4ree7keWumuS4gOS6m+WPmOmHj1xyXG4gICAgICAgICAgICAgICAgICAgIC8v54i25pS55Y+YXHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCd0cmVlQ2hpbGRDaGVjaycsIHdhdGNoQ2hpbGRDaGVjaywgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHdhdGNoQ2hpbGRDaGVjayhuZXdEYXRhOmJvb2xlYW4sb2xkRGF0YTpib29sZWFuKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/niLbmlLnlj5hcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9pZihuZXdEYXRhID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5hZnRlckNoZWNrQm94VG9DaGlsZChuZXdEYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3RyZWVDaGlsZFBhcmVudCcsIGZ1bmN0aW9uIChuZXdWYWw6YW55LG9sZFZhbDphbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlbDmja7pk77mlLnlj5jjgILjgILjgIJcIixvbGRWYWwsbmV3VmFsLG9sZFZhbD09PW5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9sZFZhbCA9PT0gbmV3VmFsKXtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlbDmja7pk77mlLnlj5jjgILjgILjgILph43mlrDliJ3lp4vljJZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmluaXRGcm9tUGFyZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGNvbnRyb2xsZXIuZGF0YUNoaWxkID0gYW5ndWxhci5jb3B5KG5ld1ZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb250cm9sbGVyKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGZ1bmN0aW9uIGRpcmVjdGl2ZUhlbHBlcihlbGVtZW50OmFueSwgbGluazphbnkpe1xyXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGxpbmsgcGFyYW1ldGVyXHJcbiAgICAgICAgICAgIC8vIOWmguaenGxpbmvlj4LmlbDmmK/lr7nosaHnsbvlnotsaW5rOntwcmU6IGZ1bmN0aW9uKC4uLil7fSwgcG9zdDogZnVuY3Rpb24oLi4uKXt9feWImeS4jeWBmuWkhOeQhlxyXG4gICAgICAgICAgICAvLyDlpoLmnpxsaW5r5Y+C5pWw5piv5Ye95pWw57G75Z6L5YiZ5bCG5YW25L2c5Li6cG9zdC1saW5r5Ye95pWw5ZyoJGNvbXBpbGXkuYvlkI7osIPnlKhcclxuICAgICAgICAgICAgaWYoYW5ndWxhci5pc0Z1bmN0aW9uKGxpbmspKXtcclxuICAgICAgICAgICAgICAgIGxpbmsgPSB7IHBvc3Q6IGxpbmsgfTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQnJlYWsgdGhlIHJlY3Vyc2lvbiBsb29wIGJ5IHJlbW92aW5nIHRoZSBjb250ZW50c1xyXG4gICAgICAgICAgICAvLyDojrflj5blubbmuIXnqbrlvZPliY3lhYPntKDnmoTlhoXlrrnvvIzlkI7pnaLov5vooYznvJbor5FcclxuICAgICAgICAgICAgdmFyIGNvbnRlbnRzOmFueSA9IGVsZW1lbnQuY29udGVudHMoKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgdmFyIGNvbXBpbGVkQ29udGVudHM6YW55O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogKGxpbmsgJiYgbGluay5wcmUpID8gbGluay5wcmUgOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBDb21waWxlcyBhbmQgcmUtYWRkcyB0aGUgY29udGVudHNcclxuICAgICAgICAgICAgICAgICAqIOe8luivkeWSjOmHjeaWsOa3u+WKoOWGheWuueWIsOW9k+WJjeWFg+e0oFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBwb3N0OiBmdW5jdGlvbihzY29wZTphbnksIGVsZW1lbnQ6YW55KXtcclxuICAgICAgICAgICAgICAgICAgICAvLyBDb21waWxlIHRoZSBjb250ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFjb21waWxlZENvbnRlbnRzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGlsZWRDb250ZW50cyA9IHNjb3BlLiRjb21waWxlKGNvbnRlbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmUtYWRkIHRoZSBjb21waWxlZCBjb250ZW50cyB0byB0aGUgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29udGVudHMoc2NvcGUsIGZ1bmN0aW9uKGNsb25lOmFueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kKGNsb25lKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2FsbCB0aGUgcG9zdC1saW5raW5nIGZ1bmN0aW9uLCBpZiBhbnlcclxuICAgICAgICAgICAgICAgICAgICBpZihsaW5rICYmIGxpbmsucG9zdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmsucG9zdC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIOa4suafk+WujOaIkFwiLFwiY29sb3I6b3JhbmdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hcHBcclxuXHJcbiAgICAuZGlyZWN0aXZlKCd1dGlsVGFibGVUcmVlJywgVXRpbFRhYmxlZFRyZWVEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbjtcclxuXHJcblxyXG4iXX0=
