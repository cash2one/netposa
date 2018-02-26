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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlLXRyZWUvdGFibGUtdHJlZS5kaXJlY3RpdmUxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVNBO1FBR0k7WUFRQSxhQUFRLEdBQVcsR0FBRyxDQUFDO1lBQ3ZCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsZUFBVSxHQUFZLElBQUksQ0FBQztZQUMzQixVQUFLLEdBQUc7Z0JBQ0osU0FBUyxFQUFDLEdBQUc7Z0JBQ2IsY0FBYyxFQUFDLEdBQUc7Z0JBRWxCLGNBQWMsRUFBQyxHQUFHO2dCQUNsQixtQkFBbUIsRUFBQyxHQUFHO2dCQUl2QixlQUFlLEVBQUMsR0FBRztnQkFFbkIsY0FBYyxFQUFDLEdBQUc7Z0JBQ2xCLGlCQUFpQixFQUFDLEdBQUc7Z0JBRXJCLGNBQWMsRUFBQyxHQUFHO2dCQUNsQixrQkFBa0IsRUFBQyxHQUFHO2dCQUN0QixrQkFBa0IsRUFBQyxHQUFHO2dCQUN0QixxQkFBcUIsRUFBQyxHQUFHO2FBQzVCLENBQUM7WUFFRixpQkFBWSxHQUFHLGVBQWUsQ0FBQztZQUMvQixhQUFRLEdBQUcsYUFBYSxDQUFDO1lBRXpCLGVBQVUsR0FBRyxVQUFVLE1BQVUsRUFBQyxRQUFZLEVBQUMsUUFBaUI7Z0JBQW5ELGlCQXFQWjtnQkFwUEcsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQSxDQUFDO29CQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO2dCQUNELElBQUksQ0FBQyxjQUFjLEdBQUc7b0JBQUEsaUJBZXJCO29CQWRHLEVBQUUsQ0FBQSxDQUFD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LGdCQUFnQixDQUFDLENBQUEsQ0FBQztnQ0FDbEIsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDaEQsQ0FBQzs0QkFFRCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsVUFBUyxLQUFTO2dDQUN0QyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUMxQixDQUFDLENBQUMsQ0FBQzs0QkFHSCxFQUFFLENBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0NBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztnQ0FDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUMsY0FBYyxDQUFDLENBQUM7NEJBQzFDLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7WUFDTCxDQUFDLENBQUE7UUExVkQsQ0FBQztRQUVNLGdDQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSx1QkFBdUIsRUFBRSxDQUFDO1FBQ3pDLENBQUM7UUFSTSwrQkFBTyxHQUFrQixDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQWdXNUQsOEJBQUM7S0FqV0QsQUFpV0MsSUFBQTtJQUVELGNBQUc7U0FFRSxTQUFTLENBQUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUNoRSIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlLXRyZWUvdGFibGUtdHJlZS5kaXJlY3RpdmUxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3RhYmxlLXRyZWUuaHRtbFwiIG5hbWU9XCJ0YWJsZVRyZWVIdG1sXCIgLz5cclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tICcuLi8uLi9hcHAvbWFpbi5hcHAnO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJ2NzcyEuL3RhYmxlLXRyZWUuY3NzJztcclxuXHJcbmRlY2xhcmUgY29uc3QgdGFibGVUcmVlSHRtbDogYW55O1xyXG5kZWNsYXJlIGNvbnN0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIFV0aWxUYWJsZWRUcmVlRGlyZWN0aXZlIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBBcnJheTxzdHJpbmc+ID0gWyckY29tcGlsZScsJyR0aW1lb3V0J107XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBpbnN0YW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFV0aWxUYWJsZWRUcmVlRGlyZWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdHJpY3Q6IHN0cmluZyA9ICdFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBzY29wZSA9IHtcclxuICAgICAgICB0cmVlQ2hpbGQ6Jz0nLFxyXG4gICAgICAgIHRyZWVDaGlsZExldmVsOidAJyxcclxuXHJcbiAgICAgICAgdHJlZUNoaWxkSW5kZXg6Jz0nLFxyXG4gICAgICAgIHRyZWVDaGlsZFBhcmVudE5hbWU6J0AnLFxyXG5cclxuXHJcblxyXG4gICAgICAgIHRyZWVDaGlsZFBhcmVudDonPScsXHJcblxyXG4gICAgICAgIHRyZWVDaGlsZENoZWNrOic9JyxcclxuICAgICAgICB0cmVlQ2hpbGRDaGVja0J0bjonJicsXHJcblxyXG4gICAgICAgIHRyZWVDaGlsZENsaWNrOlwiJlwiLFxyXG4gICAgICAgIHRyZWVDaGlsZFVwZGF0ZUJ0bjpcIiZcIiwvL2l0ZW1EYXRhXHJcbiAgICAgICAgdHJlZUNoaWxkRGVsZXRlQnRuOlwiJlwiLC8vaXRlbURhdGFcclxuICAgICAgICB0cmVlQ2hpbGRBZGRQZXJzb25CdG46JyYnLy9pdGVtRGF0YVxyXG4gICAgfTtcclxuICAvLyAgcmVxdWlyZTogc3RyaW5nID0gJz9edXRpbFRhYmxlVHJlZUhlYWQnO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3RhYmxlVHJlZUN0cmwnO1xyXG4gICAgdGVtcGxhdGUgPSB0YWJsZVRyZWVIdG1sO1xyXG5cclxuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlOmFueSwkY29tcGlsZTphbnksJHRpbWVvdXQ6RnVuY3Rpb24pIHtcclxuICAgICAgICAkc2NvcGUuJGNvbXBpbGUgPSAkY29tcGlsZTtcclxuICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkTGV2ZWwpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IHBhcnNlSW50KCRzY29wZS50cmVlQ2hpbGRMZXZlbCkgKyAxO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdEZyb21QYXJlbnQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkUGFyZW50Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgdGFibGUgdHJlZSDlvZPliY0g5aS06YOo6KGM5pWw5o2u5ZCN56ewIFwiICsgJHNjb3BlLnRyZWVDaGlsZFBhcmVudC5sZW5ndGgsXCJjb2xvcjpncmVlblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkID0gW107XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkID0gYW5ndWxhci5jb3B5KCRzY29wZS50cmVlQ2hpbGRQYXJlbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInRyZWUtY2hpbGQtcGFyZW50IOaVsOaNruagvOW8j+WHuumUme+8jOmcgOimgeW4pnt7fX0g5LiU5Li65pWw57uEXCIpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc1RyZWVUb3AgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGRQYXJlbnQpe1xyXG5cclxuICAgICAgICAgICAgaWYoJHNjb3BlLnRyZWVDaGlsZFBhcmVudC5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIHRhYmxlIHRyZWUg5b2T5YmNIOWktOmDqOihjOaVsOaNruWQjeensCBcIiArICRzY29wZS50cmVlQ2hpbGRQYXJlbnQubGVuZ3RoLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZCA9IGFuZ3VsYXIuY29weSgkc2NvcGUudHJlZUNoaWxkUGFyZW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoJHNjb3BlLnRyZWVDaGlsZEluZGV4IHx8ICRzY29wZS50cmVlQ2hpbGRJbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVDaGlsZEluZGV4ID0gJHNjb3BlLnRyZWVDaGlsZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCEkc2NvcGUudHJlZUNoaWxkQ2hlY2spe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwidHJlZS1jaGlsZC1wYXJlbnQg5pWw5o2u5qC85byP5Ye66ZSZ77yM6ZyA6KaB5bime3t9fSDkuJTkuLrmlbDnu4RcIik7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkID0gW107XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzVHJlZVRvcCA9IHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUcmVlVG9wID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIHRhYmxlIHRyZWUg5b2T5YmN6KGM5pWw5o2u5ZCN56ewIFwiICsgJHNjb3BlLnRyZWVDaGlsZC5OYW1lLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZUNoaWxkSW5kZXggPSAkc2NvcGUudHJlZUNoaWxkSW5kZXg7XHJcbiAgICAgICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQgPSAkc2NvcGUudHJlZUNoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGRQYXJlbnROYW1lKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWVDaGlsZFBhcmVudE5hbWUgPSAkc2NvcGUudHJlZUNoaWxkUGFyZW50TmFtZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGF0YUNoaWxkLkpzb25Vc2VyRGF0YSAmJiB0aGlzLmRhdGFDaGlsZC5Kc29uVXNlckRhdGEuQXJlYSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJlZUNoaWxkUGFyZW50TmFtZSA9IHRoaXMuZGF0YUNoaWxkLkpzb25Vc2VyRGF0YS5BcmVhLk5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCEkc2NvcGUudHJlZUNoaWxkQ2hlY2spe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSAkc2NvcGUudHJlZUNoaWxkQ2hlY2s7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZUNoaWxkU2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlLnlj5jlrZDmmL7npLrnirbmgIHvvIzlvZPliY0g5LiL5qCHLS0t5ZCN56ew77yaXCIsJHNjb3BlLnRyZWVDaGlsZEluZGV4ICsgXCItLS1cIiArIHRoaXMuZGF0YUNoaWxkLm5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc1Nob3dDaGlsZCA9ICF0aGlzLmRhdGFDaGlsZC5pc1Nob3dDaGlsZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5pS55Y+YIOaJk+mSqeeKtuaAgVxyXG4gICAgICAgIHRoaXMuY2hhbmdlQ2hlY2tCb3ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSAhIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3g7XHJcbiAgICAgICAgICAgIC8v5LiL57qn5omT6ZKp5Zue6LCD77yM5ZCR5LiK5YaS5rOh6YCa55+lIOW9k+WJjSDmlLnlj5jlkI7nmoTnirbmgIFcclxuICAgICAgICAgICAgJHNjb3BlLnRyZWVDaGlsZENoZWNrQnRuKHtjaGVja1Jlc3VsdDp0aGlzLmRhdGFDaGlsZCxwcmVTdGF0dXM6dGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveH0pO1xyXG4gICAgICAgICAgICAvL+aUueWPmCDmiZPpkqnnirbmgIEg5YWz6IGU5a2QXHJcbiAgICAgICAgICAgIHRoaXMuYWZ0ZXJDaGVja0JveFRvQ2hpbGQodGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+aUueWPmCDmiZPpkqnnirbmgIEg5YWz6IGU5a2QXHJcbiAgICAgICAgdGhpcy5hZnRlckNoZWNrQm94VG9DaGlsZCA9IGZ1bmN0aW9uIChuZXdTdGF0dXM6Ym9vbGVhbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJk+mSqeW9k+WJjeaUueWPmCDlhbPogZQg6YCa55+l5a2QIO+8miBcIix0aGlzLmRhdGFDaGlsZC5jaGlsZHJlbiB8fFwi5peg5a2QXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFDaGlsZC5jaGlsZHJlbiAmJiB0aGlzLmRhdGFDaGlsZC5jaGlsZHJlbi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5jaGlsZHJlbi5mb3JFYWNoKCh2YWw6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbC5pc0NoZWNrQm94ID0gbmV3U3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/lrZDmlLbliLDniLbmiZPpkqnmlLnlj5gg6YCa55+l5a2QXHJcblxyXG5cclxuICAgICAgICAvL+S4i+e6p+aJk+mSqeWbnuiwg++8jOWQkeS4iuWGkuazoemAmuefpVxyXG4gICAgICAgIHRoaXMuY2hpbGRDaGVja0J0bkNhbGxCYWNrID0gZnVuY3Rpb24gKGNoZWNrUmVzdWx0OmFueSxwcmVTdGF0dXM6Ym9vbGVhbikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWtkOWQkeeItuWGkuazoeWQjiDmlLbliLDlrZDnmoTnirbmgIHvvJpcIixwcmVTdGF0dXMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWtkOWQkeeItuWGkuazoeWQjiDniLblvZPliY3nirbmgIHvvJpcIix0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KTtcclxuICAgICAgICAgICAgbGV0IGZsYWcgPSBwcmVTdGF0dXM7XHJcbiAgICAgICAgICAgIC8v5b2T5YmNIOmAieS4rVxyXG4gICAgICAgICAgICBpZih0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KXtcclxuICAgICAgICAgICAgICAgIC8v5a2Q5bey5LiN6YCJXHJcbiAgICAgICAgICAgICAgICBpZihwcmVTdGF0dXMgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW9k+WJjSDmlLkg5LiN6YCJXHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lkJHkuIrlhpLms6HpgJrnn6Ug5b2T5YmNIOaUueWPmOWQjueahOeKtuaAgVxyXG4gICAgICAgICAgICAgICAgIC8vICAgJHNjb3BlLnRyZWVDaGlsZENoZWNrQnRuKHtjaGVja1Jlc3VsdDpjaGVja1Jlc3VsdCxwcmVTdGF0dXM6ZmFsc2V9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGRDaGVja0J0bih7Y2hlY2tSZXN1bHQ6Y2hlY2tSZXN1bHQscHJlU3RhdHVzOmZhbHNlfSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy/lvZPliY0g5LiN6YCJ5LitXHJcblxyXG4gICAgICAgICAgICAgICAgLy/lrZDpgIkg5LiN5YWz6IGU54i2XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQ2hlY2tCdG4oe2NoZWNrUmVzdWx0OmNoZWNrUmVzdWx0LHByZVN0YXR1czpmYWxzZX0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKiAgIGNvbnNvbGUubG9nKGNoZWNrUmVzdWx0KTtcclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50Q2hlY2tCb3ggPT0gY2hlY2tSZXN1bHQuY2hlY2tCb3gpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCRzY29wZS50cmVlQ2hpbGRDaGVja0J0bil7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQ2hlY2tCdG4oe2NoZWNrUmVzdWx0OmNoZWNrUmVzdWx0LHByZUluZGV4Oih0aGlzLnRyZWVDaGlsZEluZGV4ICsgXCItLVwiK3ByZUluZGV4KX0pO1xyXG4gICAgICAgICAgICB9Ki9cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vVE9ETyDmnInpl67popjvvIzmmoLmlL4g5LiL57qn5omT6ZKp5Zue6LCDIOacgOe7iOWQkeaMh+S7pOWkliDlm57osIPpgJrnn6VcclxuICAgICAgIC8qIHRoaXMudG9wQ2hlY2tCdG5DYWxsQmFjayA9IGZ1bmN0aW9uIChkYXRhOmFueSxwcmVJbmRleDphbnkpIHtcclxuICAgICAgICAgICAgbGV0IHRvcFJlc3VsdENvdW50Om51bWJlciA9IHRoaXMuZGF0YUNoaWxkLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLnJlc3VsdExpc3QubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlc3VsdExpc3RbaV0ua2V5ICA9PSBwcmVJbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5jaGVja0JveCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0TGlzdFtpXS5yZXN1bHQuY2hlY2tCb3ggPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5piv5ZCm56e76ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzdWx0TGlzdFtpXS5yZXN1bHQuY2hlY2tCb3ggPWZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1haW5DaGVja0J0bkNhbGxCYWNrKHRoaXMucmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yZXN1bHRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAga2V5OnByZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0OmRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkNoZWNrQnRuQ2FsbEJhY2sodGhpcy5yZXN1bHRMaXN0KTtcclxuICAgICAgICB9OyovXHJcblxyXG4gICAgICAgIHRoaXMuY2hhbmdlVG9wQ2hpbGRTaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94ID0gISB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOS4iue6p+WFs+iBlOWtkFwiKTtcclxuICAgICAgICAgICAgLy/mlLnlj5gg5omT6ZKp54q25oCBIOWFs+iBlOWtkFxyXG4gICAgICAgICAgICAvL+aUueWPmCDmoJHmoLnoioLngrlcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3gpO1xyXG4gICAgICAgICAgICAgICAgdmFsLmlzQ2hlY2tCb3ggPSB0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5tYWluQ2hlY2tCdG5DYWxsQmFjayhmYWxzZSx0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/mnIDnu4jpgJrnn6XmmrTpnLJcclxuICAgICAgICB0aGlzLm1haW5DaGVja0J0bkNhbGxCYWNrID0gZnVuY3Rpb24gKF9yZXN1bHQ6YW55LHByZVN0YXR1czpib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyA57uI6L+U5ZueXCIsX3Jlc3VsdCxwcmVTdGF0dXMpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4jov5Tlm549PT09PT09PVwiLHRoaXMuZGF0YUNoaWxkKTtcclxuICAgICAgICAgICAgaWYoX3Jlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5mb3JFYWNoKCh2YWw6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YWwuaXNDaGVja0JveCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iOaUueWPmOWFqOmDqHh1YW49PT09PT09PVwiLHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3gpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hpbGQuaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLmnIDnu4jmlLnlj5jlhajpg6h4dWFuPT09PT09PT1cIix0aGlzLmRhdGFDaGlsZC5pc0NoZWNrQm94KTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmbGFnID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDaGlsZC5mb3JFYWNoKCh2YWw6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih2YWwuaXNDaGVja0JveCA9PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iOaUueWPmOWFqOmDqHh1YW49PT09PT09PVwiLGZsYWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoaWxkLmlzQ2hlY2tCb3ggPSBmbGFnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnBhcmFtc0lzRnVuY3Rpb24oJHNjb3BlLnRyZWVDaGlsZENoZWNrQnRuKSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHRMaXN0ID0gZ2V0VHJlZUlzQ2hlY2tMaXN0KHRoaXMuZGF0YUNoaWxkLFtdKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pyA57uIIOWkmumAieWQjuaOpeaUtuWIsElE57uT5p6c6ZuG5ZCI77ya77ya77ya77yaXCIscmVzdWx0TGlzdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iCDlpJrpgInlkI4g5b2T5YmN5pON5L2c77ya77ya77ya77yaXCIsX3Jlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuacgOe7iCDlpJrpgInlkI4g5pON5L2c5ZCO54q25oCB77ya77ya77ya77yaXCIscHJlU3RhdHVzKTtcclxuICAgICAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGRDaGVja0J0bih7Y2hlY2tSZXN1bHQ6cmVzdWx0TGlzdCxjaGVja0luZGV4Ol9yZXN1bHQscHJlU3RhdHVzOnByZVN0YXR1c30pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmNoaWxkVXBkYXRlQnRuQ2FsbEJhY2sgPSBmdW5jdGlvbiAoaXRlbURhdGE6YW55LHBhcmVudE5hbWU6c3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGFyYW1zSXNGdW5jdGlvbigkc2NvcGUudHJlZUNoaWxkRGVsZXRlQnRuKSl7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkVXBkYXRlQnRuKHtpdGVtRGF0YTppdGVtRGF0YSxwYXJlbnROYW1lOnBhcmVudE5hbWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuY2hpbGREZWxldGVCdG5DYWxsQmFjayA9IGZ1bmN0aW9uIChkYXRhOmFueSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBhcmFtc0lzRnVuY3Rpb24oJHNjb3BlLnRyZWVDaGlsZERlbGV0ZUJ0bikpe1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRyZWVDaGlsZERlbGV0ZUJ0bih7aXRlbURhdGE6ZGF0YX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGlsZEFkZFBlcnNvbkJ0bkNhbGxCYWNrID0gZnVuY3Rpb24gKGl0ZW1EYXRhOmFueSxwYXJlbnROYW1lOnN0cmluZykge1xyXG4gICAgICAgICAgICBpZigkc2NvcGUudHJlZUNoaWxkQWRkUGVyc29uQnRuKXtcclxuICAgICAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGRBZGRQZXJzb25CdG4oe2l0ZW1EYXRhOml0ZW1EYXRhLHBhcmVudE5hbWU6cGFyZW50TmFtZX0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+WIpOaWreWPguaVsCDmmK/lkKbkuLrlh73mlbBcclxuICAgICAgICB0aGlzLnBhcmFtc0lzRnVuY3Rpb24gPSBmdW5jdGlvbihwYXJhbTpzdHJpbmcpe1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgcGFyYW0gID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL+mBjeWOhuiOt+WPluW3sumAiUlEIOmbhuWQiFxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFRyZWVJc0NoZWNrTGlzdChkYXRhOmFueSxyZXN1bHRMaXN0OmFueSlcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgRGVlcDphbnksVDphbnksRjphbnk7XHJcbiAgICAgICAgICAgIGZvciAoRiA9IGRhdGEubGVuZ3RoO0Y7KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUID0gZGF0YVstLUZdO1xyXG4gICAgICAgICAgICAgICAgaWYgKFQuaXNDaGVja0JveCkgcmVzdWx0TGlzdC5wdXNoKFQuSUQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFQuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRGVlcCA9IGdldFRyZWVJc0NoZWNrTGlzdChULmNoaWxkcmVuLHJlc3VsdExpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChEZWVwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVzdWx0TGlzdC5wdXNoKERlZXApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JldHVybiBEZWVwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0TGlzdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuICAgIC8qKlxyXG4gICAgICogTWFudWFsbHkgY29tcGlsZXMgdGhlIGVsZW1lbnQsIGZpeGluZyB0aGUgcmVjdXJzaW9uIGxvb3AuXHJcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIFtsaW5rXSBBIHBvc3QtbGluayBmdW5jdGlvbiwgb3IgYW4gb2JqZWN0IHdpdGggZnVuY3Rpb24ocykgcmVnaXN0ZXJlZCB2aWEgcHJlIGFuZCBwb3N0IHByb3BlcnRpZXMuXHJcbiAgICAgKiBAcmV0dXJucyBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbGlua2luZyBmdW5jdGlvbnMuXHJcbiAgICAgKi9cclxuICAgIGNvbXBpbGUgPSBmdW5jdGlvbihlbGVtZW50OmFueSkge1xyXG4gICAgICAgIHJldHVybiBkaXJlY3RpdmVIZWxwZXIoZWxlbWVudCxmdW5jdGlvbihzY29wZTphbnksIGlFbGVtZW50OmFueSwgaUF0dHJzOmFueSwgY29udHJvbGxlcjphbnksIHRyYW5zY2x1ZGVGbjphbnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOi/memHjOWPr+S7peW+gHNjb3Bl5Lit57uR5a6a5LiA5Lqb5Y+Y6YePXHJcbiAgICAgICAgICAgICAgICAgICAgLy/niLbmlLnlj5hcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kd2F0Y2goJ3RyZWVDaGlsZENoZWNrJywgd2F0Y2hDaGlsZENoZWNrLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gd2F0Y2hDaGlsZENoZWNrKG5ld0RhdGE6Ym9vbGVhbixvbGREYXRhOmJvb2xlYW4pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+eItuaUueWPmFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2lmKG5ld0RhdGEgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmFmdGVyQ2hlY2tCb3hUb0NoaWxkKG5ld0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgndHJlZUNoaWxkUGFyZW50JywgZnVuY3Rpb24gKG5ld1ZhbDphbnksb2xkVmFsOmFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaVsOaNrumTvuaUueWPmOOAguOAguOAglwiLG9sZFZhbCxuZXdWYWwsb2xkVmFsPT09bmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob2xkVmFsID09PSBuZXdWYWwpe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaVsOaNrumTvuaUueWPmOOAguOAguOAgumHjeaWsOWIneWni+WMllwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdEZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgY29udHJvbGxlci5kYXRhQ2hpbGQgPSBhbmd1bGFyLmNvcHkobmV3VmFsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gZGlyZWN0aXZlSGVscGVyKGVsZW1lbnQ6YW55LCBsaW5rOmFueSl7XHJcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgbGluayBwYXJhbWV0ZXJcclxuICAgICAgICAgICAgLy8g5aaC5p6cbGlua+WPguaVsOaYr+Wvueixoeexu+Wei2xpbms6e3ByZTogZnVuY3Rpb24oLi4uKXt9LCBwb3N0OiBmdW5jdGlvbiguLi4pe3195YiZ5LiN5YGa5aSE55CGXHJcbiAgICAgICAgICAgIC8vIOWmguaenGxpbmvlj4LmlbDmmK/lh73mlbDnsbvlnovliJnlsIblhbbkvZzkuLpwb3N0LWxpbmvlh73mlbDlnKgkY29tcGlsZeS5i+WQjuiwg+eUqFxyXG4gICAgICAgICAgICBpZihhbmd1bGFyLmlzRnVuY3Rpb24obGluaykpe1xyXG4gICAgICAgICAgICAgICAgbGluayA9IHsgcG9zdDogbGluayB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBCcmVhayB0aGUgcmVjdXJzaW9uIGxvb3AgYnkgcmVtb3ZpbmcgdGhlIGNvbnRlbnRzXHJcbiAgICAgICAgICAgIC8vIOiOt+WPluW5tua4heepuuW9k+WJjeWFg+e0oOeahOWGheWuue+8jOWQjumdoui/m+ihjOe8luivkVxyXG4gICAgICAgICAgICB2YXIgY29udGVudHM6YW55ID0gZWxlbWVudC5jb250ZW50cygpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB2YXIgY29tcGlsZWRDb250ZW50czphbnk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcHJlOiAobGluayAmJiBsaW5rLnByZSkgPyBsaW5rLnByZSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICAgICAqIENvbXBpbGVzIGFuZCByZS1hZGRzIHRoZSBjb250ZW50c1xyXG4gICAgICAgICAgICAgICAgICog57yW6K+R5ZKM6YeN5paw5re75Yqg5YaF5a655Yiw5b2T5YmN5YWD57SgXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHBvc3Q6IGZ1bmN0aW9uKHNjb3BlOmFueSwgZWxlbWVudDphbnkpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIENvbXBpbGUgdGhlIGNvbnRlbnRzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNvbXBpbGVkQ29udGVudHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21waWxlZENvbnRlbnRzID0gc2NvcGUuJGNvbXBpbGUoY29udGVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBSZS1hZGQgdGhlIGNvbXBpbGVkIGNvbnRlbnRzIHRvIHRoZSBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcGlsZWRDb250ZW50cyhzY29wZSwgZnVuY3Rpb24oY2xvbmU6YW55KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmQoY2xvbmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBDYWxsIHRoZSBwb3N0LWxpbmtpbmcgZnVuY3Rpb24sIGlmIGFueVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGxpbmsgJiYgbGluay5wb3N0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGluay5wb3N0LmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMg5riy5p+T5a6M5oiQXCIsXCJjb2xvcjpvcmFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcFxyXG5cclxuICAgIC5kaXJlY3RpdmUoJ3V0aWxUYWJsZVRyZWUnLCBVdGlsVGFibGVkVHJlZURpcmVjdGl2ZS5pbnN0YW5jZSlcclxuO1xyXG5cclxuXHJcbiJdfQ==
