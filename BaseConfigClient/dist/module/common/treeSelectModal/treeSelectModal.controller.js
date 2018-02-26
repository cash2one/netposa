define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "css!./treeSelectModal.css", "../../common/directive/tree/tree.directive.service", "./treeSelectModal.factory"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeSelectResult = (function () {
        function TreeSelectResult() {
        }
        return TreeSelectResult;
    }());
    exports.TreeSelectResult = TreeSelectResult;
    var TreeSelectModalModalController = (function () {
        function TreeSelectModalModalController($scope, $timeout, treeSelectModalFactory, treeService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.treeSelectModalFactory = treeSelectModalFactory;
            this.treeService = treeService;
            this.currentTreeId = "personSelectModelTree";
            this.treeSelectedNodeList = [];
            this.treeSelectedIdList = [];
            this.searchTreeNodeStr = "";
            this.personTotal = 0;
            this.initModalData = function () {
                var personTreeDatas = _this.treeSelectModalFactory.getTreeBase();
                _this.baseTreeParams.treeDatas = personTreeDatas;
            };
            this.getSelectedIdList = function () {
                return _this.treeSelectModalFactory.getTreeSelectedIds();
            };
            this.defaultCheckTreeByIds = function (treeId, ids, paramName) {
                if (!paramName) {
                    paramName = _this.checkKeyName;
                }
                if (ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    if (_this.treeService.checkNodesByParamsList(treeId, checkParamsList_1, true)) {
                        _this.updateTreeSelectedList(treeId);
                    }
                }
            };
            this.checkKeyName = this.treeSelectModalFactory.getTreeKeyName();
            this.checkTreeType = this.treeSelectModalFactory.getTreeCheckType();
            console.log("权限选择列表窗口");
            this.initPersonTreeParams();
            this.initModalData();
        }
        TreeSelectModalModalController.prototype.onChangeSearch = function (treeId, searchStr, paramsName) {
            var _this = this;
            console.log(treeId, searchStr, paramsName);
            if (!treeId) {
                return;
            }
            if (!paramsName) {
                paramsName = "Name";
            }
            this.$timeout(function () {
                _this.treeService.filterShowNodes(treeId, paramsName, searchStr);
            });
        };
        ;
        TreeSelectModalModalController.prototype.initPersonTreeParams = function () {
            var _this = this;
            this.baseTreeParams = new tree_params_1.TreeDataParams(true);
            this.baseTreeParams.treeId = this.currentTreeId;
            this.baseTreeParams.isShowIcon = true;
            this.baseTreeParams.isShowLine = false;
            this.baseTreeParams.checkEnable = true;
            this.baseTreeParams.isSingleSelect = false;
            this.baseTreeParams.isSimpleData = true;
            this.baseTreeParams.treeIdKey = this.treeSelectModalFactory.getTreeKeyName();
            this.baseTreeParams.treePidKey = this.treeSelectModalFactory.getTreeParentKeyName();
            this.baseTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.updateTreeSelectedList(_this.currentTreeId);
                });
            };
            this.baseTreeParams.treeInitComplete = function (treeId) {
                var checkedIdList = _this.treeSelectModalFactory.getTreeSelectedIds();
                if (checkedIdList.length > 0) {
                    _this.defaultCheckTreeByIds(_this.currentTreeId, checkedIdList);
                }
            };
        };
        ;
        TreeSelectModalModalController.prototype.getCheckedList = function (treeId, treeType) {
            var treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
            var result = [];
            if (treeCheckedNodes) {
                if (treeType) {
                    angular.forEach(treeCheckedNodes, function (val) {
                        if (val.treeType === treeType) {
                            result.push(val);
                        }
                    });
                }
                else {
                    result = treeCheckedNodes.concat();
                }
            }
            return result;
        };
        TreeSelectModalModalController.prototype.updateTreeSelectedList = function (treeId) {
            var treeType = this.checkTreeType;
            this.treeSelectedNodeList = this.getCheckedList(treeId, treeType);
        };
        ;
        TreeSelectModalModalController.prototype.removeSelected = function (pItem) {
            if (pItem.tId) {
                this.treeService.updateNodeChecked(this.currentTreeId, pItem.tId, false);
                this.updateTreeSelectedList(this.currentTreeId);
            }
        };
        TreeSelectModalModalController.prototype.removeAllSelected = function () {
            if (this.treeSelectedNodeList && this.treeSelectedNodeList.length > 0) {
                if (this.treeService.checkAllNodes(this.currentTreeId, false)) {
                    this.treeSelectedNodeList = [];
                }
            }
        };
        TreeSelectModalModalController.prototype.commitCloseModal = function () {
            if (this.treeSelectedNodeList.length == 0) {
                console.log("选中 null ................ ");
            }
            var resultIdList = [];
            angular.forEach(this.treeSelectedNodeList, function (val) {
                resultIdList.push(val.ID);
            });
            console.log("广播回调 关闭，回传 选择结果 供使用。。。");
            console.log(resultIdList);
            var result = new TreeSelectResult();
            result.isCommit = true;
            result.treeSelectedNodeList = this.treeSelectedNodeList;
            result.treeSelectedIdList = resultIdList;
            this.$scope.$emit(this.treeSelectModalFactory.getSelectModalClosedWatchName(), result);
        };
        TreeSelectModalModalController.prototype.cancelCommit = function () {
            var result = new TreeSelectResult();
            result.isCommit = false;
            this.$scope.$emit(this.treeSelectModalFactory.getSelectModalClosedWatchName(), result);
        };
        TreeSelectModalModalController.$inject = ['$scope', '$timeout', 'treeSelectModalFactory', "treeDirectiveService"];
        return TreeSelectModalModalController;
    }());
    main_app_1.app.controller('treeSelectModalController', TreeSelectModalModalController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3RyZWVTZWxlY3RNb2RhbC90cmVlU2VsZWN0TW9kYWwuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQkE7UUFBQTtRQUlBLENBQUM7UUFBRCx1QkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksNENBQWdCO0lBTTdCO1FBa0JJLHdDQUFvQixNQUFVLEVBQVMsUUFBWSxFQUMvQixzQkFBOEMsRUFDOUMsV0FBa0M7WUFGdEQsaUJBU0M7WUFUbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUFTLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDL0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtZQUM5QyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFoQnRELGtCQUFhLEdBQVUsdUJBQXVCLENBQUM7WUFFL0MseUJBQW9CLEdBQXVCLEVBQXlCLENBQUM7WUFFN0QsdUJBQWtCLEdBQWtCLEVBQW1CLENBQUM7WUFLaEUsc0JBQWlCLEdBQVUsRUFBRSxDQUFDO1lBRTlCLGdCQUFXLEdBQVUsQ0FBQyxDQUFDO1lBY3ZCLGtCQUFhLEdBQUc7Z0JBQ1osSUFBSSxlQUFlLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUVoRSxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7WUFDcEQsQ0FBQyxDQUFDO1lBRU0sc0JBQWlCLEdBQUc7Z0JBQ3hCLE1BQU0sQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtZQUMzRCxDQUFDLENBQUM7WUFtRE0sMEJBQXFCLEdBQUcsVUFBQyxNQUFhLEVBQUMsR0FBaUIsRUFBQyxTQUFpQjtnQkFDOUUsRUFBRSxDQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO29CQUNYLFNBQVMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDO2dCQUNsQyxDQUFDO2dCQUNELEVBQUUsQ0FBQSxDQUFD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Q0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUM7WUFDeEQsTUFBTSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQztZQUV6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBRUQscURBQVksR0FBWjtZQUNJLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNwQyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsNkJBQTZCLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBekpNLHNDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsVUFBVSxFQUFDLHdCQUF3QixFQUFDLHNCQUFzQixDQUFDLENBQUM7UUEwSjNGLHFDQUFDO0tBM0tELEFBMktDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDJCQUEyQixFQUFFLDhCQUE4QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi90cmVlU2VsZWN0TW9kYWwvdHJlZVNlbGVjdE1vZGFsLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg6YCJ5oupIOmDqOWIhuS6uuWPr+ingSBwZXJzb24g56qX5Y+j5by55Ye65L6b6YCJ5oupXHJcbiAqIEB0aW1lOiAyMDE3LTA2LTEzIDE0OjAxOjMyXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4vdHJlZVNlbGVjdE1vZGFsLmNzc1wiO1xyXG5pbXBvcnQge1RyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7UGVyc29uVHJlZUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUGVyc29uVHJlZUV4XCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7UGVyc29uRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9QZXJzb25FeFwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVHJlZURpcmVjdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IFwiLi90cmVlU2VsZWN0TW9kYWwuZmFjdG9yeVwiO1xyXG5pbXBvcnQge0lUcmVlU2VsZWN0TW9kYWxGYWN0b3J5fSBmcm9tIFwiLi90cmVlU2VsZWN0TW9kYWwuZmFjdG9yeVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjphbnk7XHJcblxyXG5leHBvcnQgY2xhc3MgVHJlZVNlbGVjdFJlc3VsdDxUPntcclxuICAgIHRyZWVTZWxlY3RlZElkTGlzdDpBcnJheTxzdHJpbmc+O1xyXG4gICAgdHJlZVNlbGVjdGVkTm9kZUxpc3Q6QXJyYXk8VD47XHJcbiAgICBpc0NvbW1pdDpib29sZWFuXHJcbn1cclxuXHJcbmNsYXNzIFRyZWVTZWxlY3RNb2RhbE1vZGFsQ29udHJvbGxlcntcclxuXHJcbiAgICBwdWJsaWMgYmFzZVRyZWVQYXJhbXM6VHJlZURhdGFQYXJhbXM8YW55PjtcclxuXHJcbiAgICBjdXJyZW50VHJlZUlkOnN0cmluZyA9IFwicGVyc29uU2VsZWN0TW9kZWxUcmVlXCI7XHJcblxyXG4gICAgdHJlZVNlbGVjdGVkTm9kZUxpc3Q6QXJyYXk8UGVyc29uVHJlZUV4PiA9IFtdIGFzIEFycmF5PFBlcnNvblRyZWVFeD47XHJcblxyXG4gICAgcHJpdmF0ZSB0cmVlU2VsZWN0ZWRJZExpc3Q6QXJyYXk8c3RyaW5nPiA9ICBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHB1YmxpYyBjaGVja0tleU5hbWU6c3RyaW5nO1xyXG4gICAgcHVibGljIGNoZWNrVHJlZVR5cGU6c3RyaW5nO1xyXG4gICAgLy/mkJzntKLlhbPplK7lrZdcclxuICAgIHNlYXJjaFRyZWVOb2RlU3RyOnN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcGVyc29uVG90YWw6bnVtYmVyID0gMDtcclxuXHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywnJHRpbWVvdXQnLCd0cmVlU2VsZWN0TW9kYWxGYWN0b3J5JyxcInRyZWVEaXJlY3RpdmVTZXJ2aWNlXCJdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6YW55LHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VsZWN0TW9kYWxGYWN0b3J5OklUcmVlU2VsZWN0TW9kYWxGYWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlXHJcbiAgICApe1xyXG4gICAgICAgIHRoaXMuY2hlY2tLZXlOYW1lID0gdGhpcy50cmVlU2VsZWN0TW9kYWxGYWN0b3J5LmdldFRyZWVLZXlOYW1lKCk7XHJcbiAgICAgICAgdGhpcy5jaGVja1RyZWVUeXBlID0gdGhpcy50cmVlU2VsZWN0TW9kYWxGYWN0b3J5LmdldFRyZWVDaGVja1R5cGUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuadg+mZkOmAieaLqeWIl+ihqOeql+WPo1wiKTtcclxuICAgICAgICB0aGlzLmluaXRQZXJzb25UcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TW9kYWxEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdE1vZGFsRGF0YSA9ICgpPT57XHJcbiAgICAgICAgbGV0IHBlcnNvblRyZWVEYXRhcyA9IHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS5nZXRUcmVlQmFzZSgpO1xyXG4gICAgICAgLy8gdGhpcy5wZXJzb25Ub3RhbCA9IHBlcnNvblRyZWVEYXRhcy5wZXJzb25FeExpc3QubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMudHJlZURhdGFzID0gcGVyc29uVHJlZURhdGFzO1xyXG4gICAgfTtcclxuICAgIC8v6I635Y+W5bey6YCJIGlkcyDpm4blkIhcclxuICAgIHByaXZhdGUgZ2V0U2VsZWN0ZWRJZExpc3QgPSAoKTpBcnJheTxzdHJpbmc+PT57XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS5nZXRUcmVlU2VsZWN0ZWRJZHMoKVxyXG4gICAgfTtcclxuICAgIC8v5pCc57Si5qGG5pS55Y+YXHJcbiAgICBvbkNoYW5nZVNlYXJjaCh0cmVlSWQ6c3RyaW5nLHNlYXJjaFN0cjpzdHJpbmcscGFyYW1zTmFtZT86c3RyaW5nKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRyZWVJZCxzZWFyY2hTdHIscGFyYW1zTmFtZSk7XHJcbiAgICAgICAgaWYoIXRyZWVJZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXBhcmFtc05hbWUpe1xyXG4gICAgICAgICAgICBwYXJhbXNOYW1lID0gXCJOYW1lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModHJlZUlkLHBhcmFtc05hbWUsc2VhcmNoU3RyKTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL+WIneWni+WMliDmkYTlg4/mnLog5qCR55u45YWz5Y+C5pWwXHJcbiAgICBwcml2YXRlIGluaXRQZXJzb25UcmVlUGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxQZXJzb25UcmVlRXggJiBBcmVhRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMudHJlZUlkID0gdGhpcy5jdXJyZW50VHJlZUlkO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLmlzU2hvd0ljb24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLmNoZWNrRW5hYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy5pc1NpbmdsZVNlbGVjdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYmFzZVRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy50cmVlSWRLZXkgPSB0aGlzLnRyZWVTZWxlY3RNb2RhbEZhY3RvcnkuZ2V0VHJlZUtleU5hbWUoKTtcclxuICAgICAgICB0aGlzLmJhc2VUcmVlUGFyYW1zLnRyZWVQaWRLZXkgPSB0aGlzLnRyZWVTZWxlY3RNb2RhbEZhY3RvcnkuZ2V0VHJlZVBhcmVudEtleU5hbWUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpOnZvaWQ9PntcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KHRoaXMuY3VycmVudFRyZWVJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5iYXNlVHJlZVBhcmFtcy50cmVlSW5pdENvbXBsZXRlPSAodHJlZUlkOnN0cmluZyk6dm9pZD0+e1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZElkTGlzdCA6QXJyYXk8c3RyaW5nPiA9IHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS5nZXRUcmVlU2VsZWN0ZWRJZHMoKTtcclxuICAgICAgICAgICAgaWYoY2hlY2tlZElkTGlzdC5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENoZWNrVHJlZUJ5SWRzKHRoaXMuY3VycmVudFRyZWVJZCxjaGVja2VkSWRMaXN0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog5qC55o2uIOaVsOaNrumbhuWQiCDli77pgIkg5a+55bqU55qE5qCR6IqC54K5XHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0xMiAxMjowMjozMlxyXG4gICAgICogQHBhcmFtczogdHJlZVR5cGUg5Yu+6YCJ6IqC54K5IOagkeexu+Wei+agh+ivhlxyXG4gICAgICogQHBhcmFtczogdHJlZUlkIOWLvumAieiKgueCuSDmoJFJRFxyXG4gICAgICogQHBhcmFtczogaWRzIOe7k+WQiFxyXG4gICAgICogQHBhcmFtczogcGFyYW1OYW1lIOWMuemFjeWPguaVsOWQjeensCDpu5jorqQgXCJJRFwiXHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRlZmF1bHRDaGVja1RyZWVCeUlkcyA9ICh0cmVlSWQ6c3RyaW5nLGlkczpBcnJheTxzdHJpbmc+LHBhcmFtTmFtZT86c3RyaW5nKTp2b2lkPT57XHJcbiAgICAgICAgaWYoIXBhcmFtTmFtZSl7XHJcbiAgICAgICAgICAgIHBhcmFtTmFtZSA9IHRoaXMuY2hlY2tLZXlOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpZHMubGVuZ3RoPjApe1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tQYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8e2tleTpzdHJpbmcsdmFsdWU6c3RyaW5nfT47XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChpZHMsKHZhbDpzdHJpbmcpPT57XHJcbiAgICAgICAgICAgICAgICBjaGVja1BhcmFtc0xpc3QucHVzaCh7a2V5OnBhcmFtTmFtZSx2YWx1ZTp2YWx9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0cmVlSWQsY2hlY2tQYXJhbXNMaXN0LHRydWUpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVHJlZVNlbGVjdGVkTGlzdCh0cmVlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8qKiBjcmVhdGUgYnkgenhxXHJcbiAgICAgKiDojrflj5blt7LpgInmi6nnmoQg5qCR6IqC54K56ZuG5ZCIXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNi0xMiAxMjowMjozMlxyXG4gICAgICogQHBhcmFtczogdHJlZVR5cGUg5Yu+6YCJ6IqC54K5IOagkeexu+Wei+agh+ivhlxyXG4gICAgICogQHBhcmFtczogdHJlZUlkIOWLvumAieiKgueCuSDmoJFJRFxyXG4gICAgICogQHJldHVybjogQXJyYXk8Q2FtZXJhRXg+JkFycmF5PEJ1c2luZXNzTGliRXg+IOiKgueCuembhuWQiCDnsbvlnovkuI4gdHJlZVR5cGUg55u45a+55bqUXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0Q2hlY2tlZExpc3QodHJlZUlkOnN0cmluZyx0cmVlVHlwZTpzdHJpbmcpOkFycmF5PGFueT57XHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsdHJ1ZSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdDpBcnJheTxhbnk+ID0gW10gYXMgQXJyYXk8YW55PjtcclxuICAgICAgICBpZih0cmVlQ2hlY2tlZE5vZGVzKXtcclxuICAgICAgICAgICAgaWYodHJlZVR5cGUpe1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRyZWVDaGVja2VkTm9kZXMsKHZhbDpQZXJzb25UcmVlRXgmQXJlYUV4KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbC50cmVlVHlwZSA9PT0gdHJlZVR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyZWVDaGVja2VkTm9kZXMuY29uY2F0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIC8v5pu05pawIOW9k+WJjemAieS4reWIl+ihqOaVsOaNrlxyXG4gICAgcHJpdmF0ZSB1cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KHRyZWVJZDpzdHJpbmcpe1xyXG4gICAgICAgIGxldCB0cmVlVHlwZSA9IHRoaXMuY2hlY2tUcmVlVHlwZTtcclxuICAgICAgICB0aGlzLnRyZWVTZWxlY3RlZE5vZGVMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlSWQsdHJlZVR5cGUpO1xyXG4gICAgfTtcclxuICAgIC8v56e76ZmkIOW3sumAiSDnm67nmoTpoblcclxuICAgIHJlbW92ZVNlbGVjdGVkKHBJdGVtOmFueSl7XHJcbiAgICAgICAgaWYocEl0ZW0udElkKXtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS51cGRhdGVOb2RlQ2hlY2tlZCh0aGlzLmN1cnJlbnRUcmVlSWQscEl0ZW0udElkLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVUcmVlU2VsZWN0ZWRMaXN0KHRoaXMuY3VycmVudFRyZWVJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/muIXnqbrmiYDmnInlt7LpgInpoblcclxuICAgIHJlbW92ZUFsbFNlbGVjdGVkKCl7XHJcbiAgICAgICAgaWYodGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdCAmJiB0aGlzLnRyZWVTZWxlY3RlZE5vZGVMaXN0Lmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgaWYodGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMuY3VycmVudFRyZWVJZCxmYWxzZSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbW1pdENsb3NlTW9kYWwoKXtcclxuICAgICAgICBpZih0aGlzLnRyZWVTZWxlY3RlZE5vZGVMaXN0Lmxlbmd0aCA9PSAwKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLpgInkuK0gbnVsbCAuLi4uLi4uLi4uLi4uLi4uIFwiKTtcclxuICAgICAgICAgIC8vICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcmVzdWx0SWRMaXN0ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdCwodmFsOlBlcnNvbkV4KT0+e1xyXG4gICAgICAgICAgICByZXN1bHRJZExpc3QucHVzaCh2YWwuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5bm/5pKt5Zue6LCDIOWFs+mXre+8jOWbnuS8oCDpgInmi6nnu5Pmnpwg5L6b5L2/55So44CC44CC44CCXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdElkTGlzdCk7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgVHJlZVNlbGVjdFJlc3VsdCgpO1xyXG4gICAgICAgIHJlc3VsdC5pc0NvbW1pdCA9IHRydWU7XHJcbiAgICAgICAgcmVzdWx0LnRyZWVTZWxlY3RlZE5vZGVMaXN0ID0gdGhpcy50cmVlU2VsZWN0ZWROb2RlTGlzdDtcclxuICAgICAgICByZXN1bHQudHJlZVNlbGVjdGVkSWRMaXN0ID0gcmVzdWx0SWRMaXN0O1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnRyZWVTZWxlY3RNb2RhbEZhY3RvcnkuZ2V0U2VsZWN0TW9kYWxDbG9zZWRXYXRjaE5hbWUoKSxyZXN1bHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbENvbW1pdCgpe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgVHJlZVNlbGVjdFJlc3VsdCgpO1xyXG4gICAgICAgIHJlc3VsdC5pc0NvbW1pdCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KHRoaXMudHJlZVNlbGVjdE1vZGFsRmFjdG9yeS5nZXRTZWxlY3RNb2RhbENsb3NlZFdhdGNoTmFtZSgpLHJlc3VsdCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCd0cmVlU2VsZWN0TW9kYWxDb250cm9sbGVyJywgVHJlZVNlbGVjdE1vZGFsTW9kYWxDb250cm9sbGVyKTsiXX0=
