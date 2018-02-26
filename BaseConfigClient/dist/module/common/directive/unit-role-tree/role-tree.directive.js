define(["require", "exports", "text!./role-tree.html", "../../app/main.app", "angular"], function (require, exports, roleTreeHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UtilRoleTreeDirective = (function () {
        function UtilRoleTreeDirective() {
            this.restrict = 'AE';
            this.replace = true;
            this.transclude = false;
            this.controllerAs = 'roleTreeCtrl';
            this.template = roleTreeHtml;
            this.scope = {
                treeChild: '=',
                treeParent: '=',
                treeParentCheckbox: "=",
                treeChildLevel: "@",
                treeChildChangeCheck: "&",
            };
            this.controller = function ($scope, $compile, $timeout) {
                $scope.$compile = $compile;
                this.initFromParent = function () {
                    if ($scope.treeParent) {
                        this.currentIsParent = true;
                        this.currentLevel = 1;
                        this.currentTree = $scope.treeParent;
                    }
                    else {
                        this.currentIsParent = false;
                        this.currentTree = $scope.treeChild;
                        this.currentLevel = $scope.treeChildLevel;
                    }
                };
                this.clickCheckBoxBtn = function (status) {
                    var _this = this;
                    if (status == 0 || status == 1 || status == -1) {
                        console.log("%c 改变操作权限 触发 打钩 按钮 ===" + status, "color:green");
                        this.currentTree.checkBoxStatus = status;
                    }
                    else {
                        console.log("%c 点击 改变操作权限 触发 打钩 按钮 ===" + status, "color:green");
                        if (this.currentTree.checkBoxStatus == 1) {
                            this.currentTree.checkBoxStatus = 0;
                        }
                        else {
                            this.currentTree.checkBoxStatus = 1;
                        }
                        if (this.currentTree.checkBoxStatus == 0) {
                            this.currentTree.OperateList.forEach(function (val, index) {
                                _this.changeOperateSelect(index, 0);
                            });
                        }
                        else if (this.currentTree.checkBoxStatus == 1) {
                            this.currentTree.OperateList.forEach(function (val, index) {
                                _this.changeOperateSelect(index, 1);
                            });
                        }
                    }
                    $timeout(function () {
                        $scope.treeChildChangeCheck({ childStatus: _this.currentTree.checkBoxStatus });
                    });
                };
                this.topClickCheckBoxBtn = function (status, p_index) {
                    var _this = this;
                    console.log("%c 改变操作权限 触发 打钩 按钮 ===" + status, "color:green");
                    if (status == 0 || status == 1 || status == -1) {
                        this.currentTree[p_index].checkBoxStatus = status;
                    }
                    else {
                        if (this.currentTree[p_index].checkBoxStatus == 1) {
                            this.currentTree[p_index].checkBoxStatus = 0;
                        }
                        else {
                            this.currentTree[p_index].checkBoxStatus = 1;
                        }
                    }
                    if (this.currentTree.checkBoxStatus == 0) {
                        this.currentTree.OperateList.forEach(function (val, index) {
                            _this.changeOperateSelect(index, false);
                        });
                    }
                    else if (this.currentTree.checkBoxStatus == 1) {
                        this.currentTree.OperateList.forEach(function (val, index) {
                            _this.changeOperateSelect(index, true);
                        });
                    }
                    this.treeResultCallBack();
                };
                this.changeCheckBoxCallBack = function (childStatus) {
                    console.log(this.currentTree.Name + "-----" + this.currentLevel + " 层 接收 子CheckBox 冒泡状态 " + childStatus);
                    var flag;
                    var currentStatus = this.currentTree.checkBoxStatus;
                    if (childStatus == 1) {
                        if (currentStatus == 1) {
                            flag = 1;
                        }
                        else if (currentStatus == 0) {
                            flag = -1;
                        }
                        else {
                            flag = this.getCurrentCheckBoxResult();
                        }
                    }
                    else if (childStatus == 0) {
                        if (currentStatus == 1) {
                            flag = -1;
                        }
                        else if (currentStatus == 0) {
                            flag = 0;
                        }
                        else {
                            flag = this.getCurrentCheckBoxResult();
                        }
                    }
                    else if (childStatus == -1) {
                        flag = -1;
                    }
                    this.currentTree.checkBoxStatus = flag;
                    console.log("%c 收到 打钩 按钮冒泡后向上冒泡父级结果 ===" + flag, "color:green");
                    $scope.treeChildChangeCheck({ childStatus: this.currentTree.checkBoxStatus });
                };
                this.topChangeCheckBoxCallBack = function (childStatus, p_index, c_index) {
                    var _this = this;
                    $timeout(function () {
                        _this.currentTree[p_index].checkBoxStatus = _this.getTopCheckBoxResult(p_index);
                        _this.treeResultCallBack();
                    });
                };
                this.treeResultCallBack = function () {
                    $timeout(function () {
                        console.log("%c 整理结果 ----最终通知 ===" + status, "color:red");
                    });
                };
                this.afterChangeParentCheckbox = function (status) {
                    var _this = this;
                    console.log("%c 父级打钩改变触发 下级改变 ===" + this.currentLevel + "---" + status, "color:orange");
                    this.currentTree.checkBoxStatus = status;
                    var flag;
                    if (status == 1) {
                        flag = true;
                    }
                    else {
                        flag = false;
                    }
                    var self_this = this;
                    this.currentTree.OperateList.forEach(function (val, index) {
                        _this.changeOperateSelect(index, status);
                    });
                };
                this.clickTreeChildShowBtn = function () {
                    console.log("%c 改变下级显示开关 ==== " + !this.currentTree.isShowChild, "color:green");
                    this.currentTree.isShowChild = !this.currentTree.isShowChild;
                };
                this.topClickTreeChildShowBtn = function (index) {
                    console.log("%c top改变下级显示开关 ==== " + !this.currentTree[index].isShowChild, "color:green");
                    this.currentTree[index].isShowChild = !this.currentTree[index].isShowChild;
                };
                this.changeOperateSelect = function (_index, status) {
                    var flag;
                    if (status === 1) {
                        flag = true;
                    }
                    else if (status === 0) {
                        flag = false;
                    }
                    else {
                        flag = !this.currentTree.OperateList[_index].isSelect;
                    }
                    this.currentTree.OperateList[_index].isSelect = flag;
                    return flag;
                };
                this.topChangeOperateSelect = function (p_index, _index, status) {
                    var flag;
                    if (status === 1) {
                        flag = true;
                    }
                    else if (status === 0) {
                        flag = false;
                    }
                    else {
                        flag = !this.currentTree[p_index].OperateList[_index].isSelect;
                    }
                    this.currentTree[p_index].OperateList[_index].isSelect = flag;
                    return flag;
                };
                this.clickOperateSelectBtn = function (_index) {
                    this.changeOperateSelect(_index);
                    console.log("%c 改变当前选择按钮" + this.currentLevel, "color:blue");
                    this.clickCheckBoxBtn(this.getCurrentCheckBoxResult());
                };
                this.topClickOperateSelectBtn = function (p_index, _index) {
                    this.topChangeOperateSelect(p_index, _index);
                    this.topChangeCheckBoxCallBack(-2, p_index);
                };
                this.getChildrenCheckBoxResult = function () {
                    if (this.currentTree.children && this.currentTree.children.length > 0) {
                        var trueCount_1 = 0;
                        this.currentTree.children.forEach(function (val) {
                            if (val.checkBoxStatus == 1) {
                                trueCount_1++;
                            }
                            else if (val.checkBoxStatus == -1) {
                                trueCount_1 = -1;
                                return;
                            }
                        });
                        if (trueCount_1 == this.currentTree.children.length) {
                            return 1;
                        }
                        else if (trueCount_1 == 0) {
                            return 0;
                        }
                        else {
                            return -1;
                        }
                    }
                    else {
                        return -2;
                    }
                };
                this.getOperateSelectResult = function () {
                    if (this.currentTree.OperateList) {
                        var trueCount_2 = 0;
                        this.currentTree.OperateList.forEach(function (val) {
                            if (val.isSelect) {
                                trueCount_2++;
                            }
                        });
                        console.log(this.currentLevel + " 层当前节点 操作选中 ：：" + trueCount_2);
                        if (trueCount_2 == 0) {
                            return 0;
                        }
                        else if (trueCount_2 == this.currentTree.OperateList.length) {
                            return 1;
                        }
                        else {
                            return -1;
                        }
                    }
                    else {
                        return -2;
                    }
                };
                this.getCurrentCheckBoxResult = function () {
                    var flag_1 = this.getChildrenCheckBoxResult();
                    var flag_2 = this.getOperateSelectResult();
                    var flag_result = -1;
                    if (flag_1 == 1 && flag_2 == 1) {
                        flag_result = 1;
                    }
                    else if (flag_1 == 0 && flag_2 == 0) {
                        flag_result = 0;
                    }
                    else if (flag_1 == -2) {
                        flag_result = flag_2;
                    }
                    else {
                        flag_result = -1;
                    }
                    console.log(this.currentLevel + "当前节点 综合结果：：；=== Children -- Operate ==" + flag_1 + " -- " + flag_2 + " -- " + flag_result);
                    return flag_result;
                };
                this.getTopCheckBoxResult = function (p_index) {
                    var checkCount = 0;
                    this.currentTree[p_index].children.forEach(function (val) {
                        if (val.checkBoxStatus == 1) {
                            checkCount++;
                        }
                        else if (val.checkBoxStatus == -1) {
                            checkCount = -1;
                            return;
                        }
                    });
                    var selectCount = 0;
                    this.currentTree[p_index].OperateList.forEach(function (val) {
                        if (val.isSelect) {
                            selectCount++;
                        }
                    });
                    console.error(selectCount, checkCount);
                    if (checkCount == 0 && selectCount == 0) {
                        return 0;
                    }
                    else if (checkCount == this.currentTree[p_index].children.length
                        && selectCount == this.currentTree[p_index].OperateList.length) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                };
                this.paramsIsFunction = function (param) {
                    if (typeof param === "function") {
                        return true;
                    }
                    return false;
                };
            };
            this.compile = function (element) {
                return directiveHelper(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
                    controller.initFromParent();
                    console.log("%c 渲染完成" + controller.currentTree.Name || "wu==", "color:orange", controller);
                    console.log();
                    function watchParentCheckbox(newData, oldData) {
                        console.log("%c 父级改变 新：：：" + newData, "color:orange");
                        if (newData != oldData && (newData == 0 || newData == 1)) {
                            controller.afterChangeParentCheckbox(newData);
                        }
                    }
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
                            }
                        }
                    };
                }
            };
        }
        UtilRoleTreeDirective.instance = function () {
            return new UtilRoleTreeDirective();
        };
        UtilRoleTreeDirective.$inject = ['$compile', '$timeout'];
        return UtilRoleTreeDirective;
    }());
    main_app_1.app
        .directive('utilRoleTree', UtilRoleTreeDirective.instance);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXJvbGUtdHJlZS9yb2xlLXRyZWUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVFBO1FBRUk7WUFXQSxhQUFRLEdBQVcsSUFBSSxDQUFDO1lBQ3hCLFlBQU8sR0FBWSxJQUFJLENBQUM7WUFDeEIsZUFBVSxHQUFZLEtBQUssQ0FBQztZQUM1QixpQkFBWSxHQUFHLGNBQWMsQ0FBQztZQUM5QixhQUFRLEdBQUcsWUFBWSxDQUFDO1lBQ3hCLFVBQUssR0FBRztnQkFDSixTQUFTLEVBQUMsR0FBRztnQkFFYixVQUFVLEVBQUMsR0FBRztnQkFFZCxrQkFBa0IsRUFBQyxHQUFHO2dCQUV0QixjQUFjLEVBQUMsR0FBRztnQkFFbEIsb0JBQW9CLEVBQUMsR0FBRzthQUUzQixDQUFDO1lBRUYsZUFBVSxHQUFHLFVBQVUsTUFBVSxFQUFDLFFBQVksRUFBQyxRQUFpQjtnQkFDNUQsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUc7b0JBQ2xCLEVBQUUsQ0FBQSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO3dCQUNsQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztvQkFDekMsQ0FBQztvQkFBQSxJQUFJLENBQUEsQ0FBQzt3QkFDRixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQzt3QkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO3dCQUdwQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUM7b0JBQzlDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDO2dCQUdGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxV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QkFFakMsRUFBRSxDQUFBLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBLENBQUM7Z0NBQ2xCLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7NEJBQ2hELENBQUM7NEJBRUQsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVMsS0FBUztnQ0FDdEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDMUIsQ0FBQyxDQUFDLENBQUM7NEJBR0gsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO2dDQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBRXJDLENBQUM7d0JBQ0wsQ0FBQztxQkFDSixDQUFDO2dCQUNOLENBQUM7WUFDTCxDQUFDLENBQUE7UUF6WUQsQ0FBQztRQU1NLDhCQUFRLEdBQWY7WUFDSSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO1FBQ3ZDLENBQUM7UUFWTSw2QkFBTyxHQUFrQixDQUFDLFVBQVUsRUFBQyxVQUFVLENBQUMsQ0FBQztRQTRZNUQsNEJBQUM7S0E3WUQsQUE2WUMsSUFBQTtJQUNELGNBQUc7U0FDRSxTQUFTLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUM3RCIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2RpcmVjdGl2ZS91bml0LXJvbGUtdHJlZS9yb2xlLXRyZWUuZGlyZWN0aXZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3JvbGUtdHJlZS5odG1sXCIgbmFtZT1cInJvbGVUcmVlSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSAnLi4vLi4vYXBwL21haW4uYXBwJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmRlY2xhcmUgY29uc3Qgcm9sZVRyZWVIdG1sOiBhbnk7XHJcbmRlY2xhcmUgY29uc3QgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgVXRpbFJvbGVUcmVlRGlyZWN0aXZle1xyXG4gICAgc3RhdGljICRpbmplY3Q6IEFycmF5PHN0cmluZz4gPSBbJyRjb21waWxlJywnJHRpbWVvdXQnXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJYg5pyA6aG257qn5pWw5o2uXHJcbiAgICBpbml0RnJvbVBhcmVudDpGdW5jdGlvbjtcclxuXHJcbiAgICAvL1xyXG4gICAgY3VycmVudElzUGFyZW50OmJvb2xlYW47XHJcbiAgICBzdGF0aWMgaW5zdGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBVdGlsUm9sZVRyZWVEaXJlY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXN0cmljdDogc3RyaW5nID0gJ0FFJztcclxuICAgIHJlcGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgdHJhbnNjbHVkZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29udHJvbGxlckFzID0gJ3JvbGVUcmVlQ3RybCc7XHJcbiAgICB0ZW1wbGF0ZSA9IHJvbGVUcmVlSHRtbDtcclxuICAgIHNjb3BlID0ge1xyXG4gICAgICAgIHRyZWVDaGlsZDonPScsXHJcblxyXG4gICAgICAgIHRyZWVQYXJlbnQ6Jz0nLFxyXG5cclxuICAgICAgICB0cmVlUGFyZW50Q2hlY2tib3g6XCI9XCIsXHJcblxyXG4gICAgICAgIHRyZWVDaGlsZExldmVsOlwiQFwiLFxyXG5cclxuICAgICAgICB0cmVlQ2hpbGRDaGFuZ2VDaGVjazpcIiZcIixcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlOmFueSwkY29tcGlsZTphbnksJHRpbWVvdXQ6RnVuY3Rpb24pIHtcclxuICAgICAgICAkc2NvcGUuJGNvbXBpbGUgPSAkY29tcGlsZTtcclxuICAgICAgICB0aGlzLmluaXRGcm9tUGFyZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZigkc2NvcGUudHJlZVBhcmVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJc1BhcmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlID0gJHNjb3BlLnRyZWVQYXJlbnQ7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50SXNQYXJlbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUgPSAkc2NvcGUudHJlZUNoaWxkO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIHRyZWVQYXJlbnRDaGVja2JveFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50TGV2ZWwgPSAkc2NvcGUudHJlZUNoaWxkTGV2ZWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDngrnlh7vmlLnlj5jlvZPliY3miZPpkqnlhajpgIlcclxuICAgICAgICB0aGlzLmNsaWNrQ2hlY2tCb3hCdG4gPSBmdW5jdGlvbiAoc3RhdHVzOm51bWJlcikge1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT0gMCB8fCBzdGF0dXMgPT0gMSB8fCBzdGF0dXMgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDmlLnlj5jmk43kvZzmnYPpmZAg6Kem5Y+RIOaJk+mSqSDmjInpkq4gPT09XCIgKyBzdGF0dXMsXCJjb2xvcjpncmVlblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuY2hlY2tCb3hTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDngrnlh7sg5pS55Y+Y5pON5L2c5p2D6ZmQIOinpuWPkSDmiZPpkqkg5oyJ6ZKuID09PVwiICsgc3RhdHVzLFwiY29sb3I6Z3JlZW5cIik7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRUcmVlLmNoZWNrQm94U3RhdHVzID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuY2hlY2tCb3hTdGF0dXMgPSAwO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZS5jaGVja0JveFN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50VHJlZS5jaGVja0JveFN0YXR1cyA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlLk9wZXJhdGVMaXN0LmZvckVhY2goKHZhbDphbnksaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU9wZXJhdGVTZWxlY3QoaW5kZXgsMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cnJlbnRUcmVlLmNoZWNrQm94U3RhdHVzID09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuT3BlcmF0ZUxpc3QuZm9yRWFjaCgodmFsOmFueSxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlT3BlcmF0ZVNlbGVjdChpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICAvL+WQkeS4iuWGkuazoVxyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50cmVlQ2hpbGRDaGFuZ2VDaGVjayh7Y2hpbGRTdGF0dXM6dGhpcy5jdXJyZW50VHJlZS5jaGVja0JveFN0YXR1c30pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyDmnIDpobblsYIg54K55Ye75pS55Y+Y5b2T5YmN5omT6ZKp5YWo6YCJXHJcbiAgICAgICAgdGhpcy50b3BDbGlja0NoZWNrQm94QnRuID0gZnVuY3Rpb24gKHN0YXR1czpudW1iZXIscF9pbmRleDpudW1iZXIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDmlLnlj5jmk43kvZzmnYPpmZAg6Kem5Y+RIOaJk+mSqSDmjInpkq4gPT09XCIgKyBzdGF0dXMsXCJjb2xvcjpncmVlblwiKTtcclxuICAgICAgICAgICAgaWYoc3RhdHVzID09IDAgfHwgc3RhdHVzID09IDEgfHwgc3RhdHVzID09IC0xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWVbcF9pbmRleF0uY2hlY2tCb3hTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50VHJlZVtwX2luZGV4XS5jaGVja0JveFN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlW3BfaW5kZXhdLmNoZWNrQm94U3RhdHVzID0gMFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZVtwX2luZGV4XS5jaGVja0JveFN0YXR1cyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50VHJlZS5jaGVja0JveFN0YXR1cyA9PSAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuT3BlcmF0ZUxpc3QuZm9yRWFjaCgodmFsOmFueSxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VPcGVyYXRlU2VsZWN0KGluZGV4LGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZih0aGlzLmN1cnJlbnRUcmVlLmNoZWNrQm94U3RhdHVzID09IDEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZS5PcGVyYXRlTGlzdC5mb3JFYWNoKCh2YWw6YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZU9wZXJhdGVTZWxlY3QoaW5kZXgsdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+i/lOWbnuacgOe7iOWbnuiwg1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVSZXN1bHRDYWxsQmFjaygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8g5o6l5pS25YiwIOWtkCDlm57osIPlhpLms6Hmk43kvZxcclxuICAgICAgICB0aGlzLmNoYW5nZUNoZWNrQm94Q2FsbEJhY2sgPSBmdW5jdGlvbiAoY2hpbGRTdGF0dXM6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFRyZWUuTmFtZSArIFwiLS0tLS1cIit0aGlzLmN1cnJlbnRMZXZlbCArXCIg5bGCIOaOpeaUtiDlrZBDaGVja0JveCDlhpLms6HnirbmgIEgXCIgKyBjaGlsZFN0YXR1cyk7XHJcbiAgICAgICAgICAgIGxldCBmbGFnOm51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRTdGF0dXMgPSB0aGlzLmN1cnJlbnRUcmVlLmNoZWNrQm94U3RhdHVzO1xyXG4gICAgICAgICAgICAvL+WtkOW3sue7j+WFqOmAiVxyXG4gICAgICAgICAgICBpZihjaGlsZFN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnRTdGF0dXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IDE7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihjdXJyZW50U3RhdHVzID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSAtMTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOW9k+WJjeWNiumAiSA944CLIOWNiumAiS8g5LiN6YCJXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyDliKTmlq0g5b2T5YmNIOWtkOWIl+ihqOWSjOaTjeS9nOe7hCDlhrPlrprlhajpgIkg5ZKM5Y2K6YCJXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRoaXMuZ2V0Q3VycmVudENoZWNrQm94UmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGNoaWxkU3RhdHVzID09IDApe1xyXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudFN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlvZPliY3lhajpgIkgPeOAi+WNiumAiVxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSAtMTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGN1cnJlbnRTdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlvZPliY3ljYrpgIkgPeOAiyDljYrpgIkvIOS4jemAiVxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0aGlzLmdldEN1cnJlbnRDaGVja0JveFJlc3VsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZSBpZihjaGlsZFN0YXR1cyA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZyA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlLmNoZWNrQm94U3RhdHVzID0gZmxhZztcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIOaUtuWIsCDmiZPpkqkg5oyJ6ZKu5YaS5rOh5ZCO5ZCR5LiK5YaS5rOh54i257qn57uT5p6cID09PVwiICsgZmxhZyxcImNvbG9yOmdyZWVuXCIpO1xyXG4gICAgICAgICAgICAvL+WQkeS4iiDlj5HpgIHlvZPliY3nirbmgIFcclxuICAgICAgICAgICAkc2NvcGUudHJlZUNoaWxkQ2hhbmdlQ2hlY2soe2NoaWxkU3RhdHVzOnRoaXMuY3VycmVudFRyZWUuY2hlY2tCb3hTdGF0dXN9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIOacgOmhtuWxgiDmlLbliLDlrZAgY2hlY2tib3gg5pS55Y+Y5Zue6LCDXHJcbiAgICAgICAgdGhpcy50b3BDaGFuZ2VDaGVja0JveENhbGxCYWNrID1mdW5jdGlvbiAoY2hpbGRTdGF0dXM6bnVtYmVyLHBfaW5kZXg6bnVtYmVyLGNfaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgICR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlW3BfaW5kZXhdLmNoZWNrQm94U3RhdHVzID0gdGhpcy5nZXRUb3BDaGVja0JveFJlc3VsdChwX2luZGV4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZVJlc3VsdENhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5pyA57uI5Zue6LCDIOe7k+aenFxyXG4gICAgICAgIHRoaXMudHJlZVJlc3VsdENhbGxCYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrlhpLms6EgLS0tLeacgOe7iOmAmuefpVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDmlbTnkIbnu5PmnpwgLS0tLeacgOe7iOmAmuefpSA9PT1cIiArIHN0YXR1cyxcImNvbG9yOnJlZFwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyDniLbnuqfmiZPpkqnmlLnlj5jlkI7jgILjgILjgIJcclxuICAgICAgICB0aGlzLmFmdGVyQ2hhbmdlUGFyZW50Q2hlY2tib3ggPSBmdW5jdGlvbihzdGF0dXM6bnVtYmVyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDniLbnuqfmiZPpkqnmlLnlj5jop6blj5Eg5LiL57qn5pS55Y+YID09PVwiICsgIHRoaXMuY3VycmVudExldmVsKyBcIi0tLVwiKyBzdGF0dXMsXCJjb2xvcjpvcmFuZ2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuY2hlY2tCb3hTdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIGxldCBmbGFnOmJvb2xlYW47XHJcbiAgICAgICAgICAgIGlmKHN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgc2VsZl90aGlzID10aGlzO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlLk9wZXJhdGVMaXN0LmZvckVhY2goKHZhbDphbnksaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VPcGVyYXRlU2VsZWN0KGluZGV4LHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8g6YGN5Y6G6YCJ5LiK5b2T5YmN5pON5L2c5pWw57uEXHJcblxyXG4gICAgICAgICAgICAvL+WtkCDnlLHoh6rlt7Eg55uR5ZCs6Kem5Y+RXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyDmlLnlj5jlvZPliY3kuIvnuqfmmK/lkKYg5Yqg6L29XHJcbiAgICAgICAgdGhpcy5jbGlja1RyZWVDaGlsZFNob3dCdG4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIOaUueWPmOS4i+e6p+aYvuekuuW8gOWFsyA9PT09IFwiICsgIXRoaXMuY3VycmVudFRyZWUuaXNTaG93Q2hpbGQsXCJjb2xvcjpncmVlblwiKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZS5pc1Nob3dDaGlsZCA9ICF0aGlzLmN1cnJlbnRUcmVlLmlzU2hvd0NoaWxkO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8g5pS55Y+Y5b2T5YmN5LiL57qn5piv5ZCmIOWKoOi9vVxyXG4gICAgICAgIHRoaXMudG9wQ2xpY2tUcmVlQ2hpbGRTaG93QnRuID0gZnVuY3Rpb24oaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyB0b3DmlLnlj5jkuIvnuqfmmL7npLrlvIDlhbMgPT09PSBcIiArICF0aGlzLmN1cnJlbnRUcmVlW2luZGV4XS5pc1Nob3dDaGlsZCxcImNvbG9yOmdyZWVuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlW2luZGV4XS5pc1Nob3dDaGlsZCA9ICF0aGlzLmN1cnJlbnRUcmVlW2luZGV4XS5pc1Nob3dDaGlsZDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v5pS55Y+Y5b2T5YmN6YCJ5oup5oyJ6ZKuXHJcbiAgICAgICAgdGhpcy5jaGFuZ2VPcGVyYXRlU2VsZWN0ID0gZnVuY3Rpb24gKF9pbmRleDpudW1iZXIsc3RhdHVzOm51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZmxhZzpib29sZWFuO1xyXG5cclxuICAgICAgICAgICAgaWYoc3RhdHVzID09PSAxKXtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihzdGF0dXMgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gIXRoaXMuY3VycmVudFRyZWUuT3BlcmF0ZUxpc3RbX2luZGV4XS5pc1NlbGVjdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9UT0RPIOacquWIpOaWrSDlvZPliY3mmK/lkKbkuLrmnInkuIvmi4npgInmi6lcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZS5PcGVyYXRlTGlzdFtfaW5kZXhdLmlzU2VsZWN0ID0gZmxhZztcclxuICAgICAgICAgICAgcmV0dXJuIGZsYWc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy50b3BDaGFuZ2VPcGVyYXRlU2VsZWN0ID0gZnVuY3Rpb24gKHBfaW5kZXg6bnVtYmVyLF9pbmRleDpudW1iZXIsc3RhdHVzOm51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZmxhZzpib29sZWFuO1xyXG4gICAgICAgICAgICBpZihzdGF0dXMgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKHN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgZmxhZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGZsYWcgPSAhdGhpcy5jdXJyZW50VHJlZVtwX2luZGV4XS5PcGVyYXRlTGlzdFtfaW5kZXhdLmlzU2VsZWN0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL1RPRE8g5pyq5Yik5patIOW9k+WJjeaYr+WQpuS4uuacieS4i+aLiemAieaLqVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRUcmVlW3BfaW5kZXhdLk9wZXJhdGVMaXN0W19pbmRleF0uaXNTZWxlY3QgPSBmbGFnO1xyXG4gICAgICAgICAgICByZXR1cm4gZmxhZztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyDngrnlh7vmlLnlj5jlvZPliY3lip/og73mjInpkq7pgInmi6lcclxuICAgICAgICB0aGlzLmNsaWNrT3BlcmF0ZVNlbGVjdEJ0biA9IGZ1bmN0aW9uIChfaW5kZXg6bnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlT3BlcmF0ZVNlbGVjdChfaW5kZXgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjIOaUueWPmOW9k+WJjemAieaLqeaMiemSrlwiICsgdGhpcy5jdXJyZW50TGV2ZWwsXCJjb2xvcjpibHVlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrQ2hlY2tCb3hCdG4odGhpcy5nZXRDdXJyZW50Q2hlY2tCb3hSZXN1bHQoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy50b3BDbGlja09wZXJhdGVTZWxlY3RCdG4gPSBmdW5jdGlvbiAocF9pbmRleDpudW1iZXIsX2luZGV4Om51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvcENoYW5nZU9wZXJhdGVTZWxlY3QocF9pbmRleCxfaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50b3BDaGFuZ2VDaGVja0JveENhbGxCYWNrKC0yLHBfaW5kZXgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/ojrflj5Yg5b2T5YmNIOWtkOiKgueCuSDnu7zlkIjnirbmgIEgMCDlhajkuI3pgInvvIwxIOWFqOmAiSAtMSDpg6jliIbpgIkgLTIg5peg5a2QXHJcbiAgICAgICAgdGhpcy5nZXRDaGlsZHJlbkNoZWNrQm94UmVzdWx0ID0gZnVuY3Rpb24gKCk6bnVtYmVyIHtcclxuICAgICAgICAgIGlmKHRoaXMuY3VycmVudFRyZWUuY2hpbGRyZW4gJiYgdGhpcy5jdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg+MCl7XHJcbiAgICAgICAgICAgICAgbGV0IHRydWVDb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWUuY2hpbGRyZW4uZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgICBpZih2YWwuY2hlY2tCb3hTdGF0dXMgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICB0cnVlQ291bnQgKys7XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZhbC5jaGVja0JveFN0YXR1cyA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgIHRydWVDb3VudCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICBpZih0cnVlQ291bnQgPT0gdGhpcy5jdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICB9ZWxzZSBpZih0cnVlQ291bnQgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIC0yO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy/ojrflj5Yg5b2T5YmNIOaTjeS9nOe7vOWQiOeKtuaAgVxyXG4gICAgICAgIHRoaXMuZ2V0T3BlcmF0ZVNlbGVjdFJlc3VsdCA9IGZ1bmN0aW9uICgpOm51bWJlciB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFRyZWUuT3BlcmF0ZUxpc3Qpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRydWVDb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZS5PcGVyYXRlTGlzdC5mb3JFYWNoKCh2YWw6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbC5pc1NlbGVjdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRydWVDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50TGV2ZWwgKyBcIiDlsYLlvZPliY3oioLngrkg5pON5L2c6YCJ5LitIO+8mu+8mlwiKyB0cnVlQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgaWYodHJ1ZUNvdW50ID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodHJ1ZUNvdW50ID09IHRoaXMuY3VycmVudFRyZWUuT3BlcmF0ZUxpc3QubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gLTI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldEN1cnJlbnRDaGVja0JveFJlc3VsdCA9IGZ1bmN0aW9uICgpOm51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCBmbGFnXzEgPSB0aGlzLmdldENoaWxkcmVuQ2hlY2tCb3hSZXN1bHQoKTtcclxuICAgICAgICAgICAgbGV0IGZsYWdfMiA9IHRoaXMuZ2V0T3BlcmF0ZVNlbGVjdFJlc3VsdCgpO1xyXG4gICAgICAgICAgICBsZXQgZmxhZ19yZXN1bHQgPSAtMTtcclxuXHJcbiAgICAgICAgICAgIGlmKGZsYWdfMSA9PSAxICYmIGZsYWdfMiA9PSAxKXtcclxuICAgICAgICAgICAgICAgIGZsYWdfcmVzdWx0ID0gMTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoZmxhZ18xID09IDAgJiYgZmxhZ18yID09IDApe1xyXG4gICAgICAgICAgICAgICAgZmxhZ19yZXN1bHQgPSAwO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihmbGFnXzEgPT0gLTIpe1xyXG4gICAgICAgICAgICAgICAgZmxhZ19yZXN1bHQgPSBmbGFnXzI7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgZmxhZ19yZXN1bHQgPSAgLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jdXJyZW50TGV2ZWwgK1wi5b2T5YmN6IqC54K5IOe7vOWQiOe7k+aenO+8mu+8mu+8mz09PSBDaGlsZHJlbiAtLSBPcGVyYXRlID09XCIgKyBmbGFnXzEgKyBcIiAtLSBcIisgIGZsYWdfMiArIFwiIC0tIFwiK2ZsYWdfcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGZsYWdfcmVzdWx0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0VG9wQ2hlY2tCb3hSZXN1bHQgPSBmdW5jdGlvbiAocF9pbmRleDpudW1iZXIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBjaGVja0NvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRyZWVbcF9pbmRleF0uY2hpbGRyZW4uZm9yRWFjaCgodmFsOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGlmKHZhbC5jaGVja0JveFN0YXR1cyA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvdW50KytcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZhbC5jaGVja0JveFN0YXR1cyA9PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb3VudCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2VsZWN0Q291bnQ6bnVtYmVyID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VHJlZVtwX2luZGV4XS5PcGVyYXRlTGlzdC5mb3JFYWNoKCh2YWw6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodmFsLmlzU2VsZWN0KXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb3VudCArKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3Ioc2VsZWN0Q291bnQsY2hlY2tDb3VudCk7XHJcbiAgICAgICAgICAgIGlmKGNoZWNrQ291bnQgPT0wICYmIHNlbGVjdENvdW50ID09IDApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1lbHNlIGlmKGNoZWNrQ291bnQgPT10aGlzLmN1cnJlbnRUcmVlW3BfaW5kZXhdLmNoaWxkcmVuLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiBzZWxlY3RDb3VudCA9PSB0aGlzLmN1cnJlbnRUcmVlW3BfaW5kZXhdLk9wZXJhdGVMaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgICApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/liKTmlq3lj4LmlbAg5piv5ZCm5Li65Ye95pWwXHJcbiAgICAgICAgdGhpcy5wYXJhbXNJc0Z1bmN0aW9uID0gZnVuY3Rpb24ocGFyYW06c3RyaW5nKXtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHBhcmFtICA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYW51YWxseSBjb21waWxlcyB0aGUgZWxlbWVudCwgZml4aW5nIHRoZSByZWN1cnNpb24gbG9vcC5cclxuICAgICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0gW2xpbmtdIEEgcG9zdC1saW5rIGZ1bmN0aW9uLCBvciBhbiBvYmplY3Qgd2l0aCBmdW5jdGlvbihzKSByZWdpc3RlcmVkIHZpYSBwcmUgYW5kIHBvc3QgcHJvcGVydGllcy5cclxuICAgICAqIEByZXR1cm5zIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBsaW5raW5nIGZ1bmN0aW9ucy5cclxuICAgICAqL1xyXG4gICAgY29tcGlsZSA9IGZ1bmN0aW9uKGVsZW1lbnQ6YW55KSB7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZUhlbHBlcihlbGVtZW50LGZ1bmN0aW9uKHNjb3BlOmFueSwgaUVsZW1lbnQ6YW55LCBpQXR0cnM6YW55LCBjb250cm9sbGVyOmFueSwgdHJhbnNjbHVkZUZuOmFueSl7XHJcbiAgICAgICAgICAgIC8vIOi/memHjOWPr+S7peW+gHNjb3Bl5Lit57uR5a6a5LiA5Lqb5Y+Y6YePXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdEZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgLy/niLbmlLnlj5hcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDmuLLmn5PlrozmiJBcIisgY29udHJvbGxlci5jdXJyZW50VHJlZS5OYW1lIHx8IFwid3U9PVwiLFwiY29sb3I6b3JhbmdlXCIgLGNvbnRyb2xsZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG5cclxuICAgICAgICAgICAvLyBzY29wZS4kd2F0Y2goJ3RyZWVQYXJlbnRDaGVja2JveCcsIHdhdGNoUGFyZW50Q2hlY2tib3gsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gd2F0Y2hQYXJlbnRDaGVja2JveChuZXdEYXRhOm51bWJlcixvbGREYXRhOm51bWJlcil7XHJcbiAgICAgICAgICAgICAgICAvLyDniLYg5omT6ZKpIOaUueWPmFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIlYyDniLbnuqfmlLnlj5gg5paw77ya77ya77yaXCIgK25ld0RhdGEsXCJjb2xvcjpvcmFuZ2VcIik7XHJcbiAgICAgICAgICAgICAgICBpZihuZXdEYXRhICE9IG9sZERhdGEgICYmIChuZXdEYXRhID09IDAgfHwgbmV3RGF0YSA9PSAxKSApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYWZ0ZXJDaGFuZ2VQYXJlbnRDaGVja2JveChuZXdEYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAvKiBzY29wZS4kd2F0Y2goJ3RyZWVDaGlsZFBhcmVudCcsIGZ1bmN0aW9uIChuZXdWYWw6YW55LG9sZFZhbDphbnkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pWw5o2u6ZO+5pS55Y+Y44CC44CC44CCXCIsb2xkVmFsLG5ld1ZhbCxvbGRWYWw9PT1uZXdWYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYob2xkVmFsID09PSBuZXdWYWwpe1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5pWw5o2u6ZO+5pS55Y+Y44CC44CC44CC6YeN5paw5Yid5aeL5YyWXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuaW5pdEZyb21QYXJlbnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgdHJ1ZSk7Ki9cclxuICAgICAgICB9KTtcclxuICAgICAgICBmdW5jdGlvbiBkaXJlY3RpdmVIZWxwZXIoZWxlbWVudDphbnksIGxpbms6YW55KXtcclxuICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBsaW5rIHBhcmFtZXRlclxyXG4gICAgICAgICAgICAvLyDlpoLmnpxsaW5r5Y+C5pWw5piv5a+56LGh57G75Z6LbGluazp7cHJlOiBmdW5jdGlvbiguLi4pe30sIHBvc3Q6IGZ1bmN0aW9uKC4uLil7fX3liJnkuI3lgZrlpITnkIZcclxuICAgICAgICAgICAgLy8g5aaC5p6cbGlua+WPguaVsOaYr+WHveaVsOexu+Wei+WImeWwhuWFtuS9nOS4unBvc3QtbGlua+WHveaVsOWcqCRjb21waWxl5LmL5ZCO6LCD55SoXHJcbiAgICAgICAgICAgIGlmKGFuZ3VsYXIuaXNGdW5jdGlvbihsaW5rKSl7XHJcbiAgICAgICAgICAgICAgICBsaW5rID0geyBwb3N0OiBsaW5rIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEJyZWFrIHRoZSByZWN1cnNpb24gbG9vcCBieSByZW1vdmluZyB0aGUgY29udGVudHNcclxuICAgICAgICAgICAgLy8g6I635Y+W5bm25riF56m65b2T5YmN5YWD57Sg55qE5YaF5a6577yM5ZCO6Z2i6L+b6KGM57yW6K+RXHJcbiAgICAgICAgICAgIHZhciBjb250ZW50czphbnkgPSBlbGVtZW50LmNvbnRlbnRzKCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHZhciBjb21waWxlZENvbnRlbnRzOmFueTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcmU6IChsaW5rICYmIGxpbmsucHJlKSA/IGxpbmsucHJlIDogbnVsbCxcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICogQ29tcGlsZXMgYW5kIHJlLWFkZHMgdGhlIGNvbnRlbnRzXHJcbiAgICAgICAgICAgICAgICAgKiDnvJbor5Hlkozph43mlrDmt7vliqDlhoXlrrnliLDlvZPliY3lhYPntKBcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgcG9zdDogZnVuY3Rpb24oc2NvcGU6YW55LCBlbGVtZW50OmFueSl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tcGlsZSB0aGUgY29udGVudHNcclxuICAgICAgICAgICAgICAgICAgICBpZighY29tcGlsZWRDb250ZW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBpbGVkQ29udGVudHMgPSBzY29wZS4kY29tcGlsZShjb250ZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlLWFkZCB0aGUgY29tcGlsZWQgY29udGVudHMgdG8gdGhlIGVsZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBjb21waWxlZENvbnRlbnRzKHNjb3BlLCBmdW5jdGlvbihjbG9uZTphbnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFwcGVuZChjbG9uZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIENhbGwgdGhlIHBvc3QtbGlua2luZyBmdW5jdGlvbiwgaWYgYW55XHJcbiAgICAgICAgICAgICAgICAgICAgaWYobGluayAmJiBsaW5rLnBvc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rLnBvc3QuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgIC8vICBjb25zb2xlLmxvZyhcIiVjIOa4suafk+WujOaIkFwiLFwiY29sb3I6b3JhbmdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuZGlyZWN0aXZlKCd1dGlsUm9sZVRyZWUnLCBVdGlsUm9sZVRyZWVEaXJlY3RpdmUuaW5zdGFuY2UpXHJcbjtcclxuXHJcblxyXG4iXX0=
