define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/enum/TreeType", "css!../style/person-select.css", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1, TreeType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PersonSelectController = (function () {
        function PersonSelectController($scope, $timeout, treeService, connectTreeService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.connectTreeService = connectTreeService;
            this.personTreeId = "personSelectModelTree";
            this.personSelectedList = [];
            this.personSelectedIdList = [];
            this.searchPersonStr = "";
            this.defaultCheckTreeByIds = function (treeType, treeId, ids, paramName) {
                if (!paramName) {
                    paramName = "ID";
                }
                if (ids.length > 0) {
                    var checkParamsList_1 = [];
                    angular.forEach(ids, function (val) {
                        checkParamsList_1.push({ key: paramName, value: val });
                    });
                    if (_this.treeService.checkNodesByParamsList(treeId, checkParamsList_1, true)) {
                        _this.personSelectedList = _this.getCheckedList(treeType, treeId);
                    }
                }
                else {
                    _this.personSelectedList = [];
                }
            };
            this.personSelectedIdList = this.$scope.selectPersonID;
            this.initPersonTreeParams();
        }
        PersonSelectController.prototype.onChangeSearch = function (searchStr) {
            var _this = this;
            this.$timeout(function () {
                _this.treeService.filterShowNodes(_this.personTreeId, 'Name', searchStr);
            });
        };
        ;
        PersonSelectController.prototype.initPersonTreeParams = function () {
            var _this = this;
            this.personTreeParams = new tree_params_1.TreeDataParams(true);
            this.personTreeParams.treeId = this.personTreeId;
            this.personTreeParams.isShowIcon = true;
            this.personTreeParams.isShowLine = false;
            this.personTreeParams.checkEnable = true;
            this.personTreeParams.isSingleSelect = false;
            this.personTreeParams.isSimpleData = true;
            this.personTreeParams.onCheck = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.personSelectedList = _this.getCheckedList(TreeType_1.TreeType.person.value, treeId);
                });
            };
            this.personTreeParams.treeInitComplete = function (treeId) {
                if (_this.personSelectedIdList.length > 0) {
                    _this.defaultCheckTreeByIds(TreeType_1.TreeType.person.value, _this.personTreeId, _this.personSelectedIdList);
                }
            };
            this.connectTreeService.findAreaWithPerson().then(function (res) {
                _this.personTreeParams.treeDatas = res;
            });
        };
        ;
        PersonSelectController.prototype.getCheckedList = function (treeType, treeId) {
            var treeCheckedNodes = this.treeService.getCheckedNodes(treeId, true);
            var result = [];
            if (treeCheckedNodes) {
                angular.forEach(treeCheckedNodes, function (val) {
                    if (val.treeType === treeType) {
                        result.push(val);
                    }
                });
            }
            return result;
        };
        PersonSelectController.prototype.removeSelected = function (pItem, isRemoveAll) {
            if (pItem) {
                this.treeService.updateNodeChecked(this.personTreeId, pItem.tId, false);
                this.personSelectedList = this.getCheckedList(TreeType_1.TreeType.person.value, this.personTreeId);
            }
            if (isRemoveAll) {
                if (this.treeService.checkAllNodes(this.personTreeId, false)) {
                    this.personSelectedList = [];
                }
            }
        };
        PersonSelectController.prototype.closeUpdateModel = function () {
            this.$scope.$emit('person.select.popup');
        };
        PersonSelectController.prototype.commitPersonSelect = function () {
            if (this.personSelectedList.length == 0) {
                return;
            }
            var resultIdList = [];
            angular.forEach(this.personSelectedList, function (val) {
                resultIdList.push(val.ID);
            });
            this.$scope.$emit('person.select.popup', resultIdList);
        };
        PersonSelectController.$inject = ['$scope', '$timeout', "treeDirectiveService", 'connectTreeService'];
        return PersonSelectController;
    }());
    main_app_1.app.controller('personSelectController', PersonSelectController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvc2VsZWN0UG9wdXAvcGVyc29uU2VsZWN0L3BlcnNvbi5zZWxlY3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFpQkE7UUFTSSxnQ0FBb0IsTUFBVyxFQUNYLFFBQWEsRUFDYixXQUFrQyxFQUNsQyxrQkFBc0M7WUFIMUQsaUJBT0M7WUFQbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtZQVQxRCxpQkFBWSxHQUFXLHVCQUF1QixDQUFDO1lBQy9DLHVCQUFrQixHQUF3QixFQUF5QixDQUFDO1lBQ3BFLHlCQUFvQixHQUFrQixFQUFtQixDQUFDO1lBQzFELG9CQUFlLEdBQVcsRUFBRSxDQUFDO1lBdURyQiwwQkFBcUIsR0FBRyxVQUFDLFFBQWdCLEVBQUUsTUFBYyxFQUFFLEdBQWtCLEVBQUUsU0FBa0I7Z0JBQ3JHLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDYixTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakIsSUFBSSxpQkFBZSxHQUFHLEVBQTJDLENBQUM7b0JBQ2xFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBVzt3QkFDN0IsaUJBQWUsQ0FBQyxJQUFJLENBQUMsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO29CQUN2RCxDQUFDLENBQUMsQ0FBQztvQkFDSCxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxpQkFBZSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMs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VUFBQyxHQUFpQjtnQkFDdkQsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBckhNLDhCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFDLG9CQUFvQixDQUFDLENBQUM7UUFzSHpGLDZCQUFDO0tBN0hELEFBNkhDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3NlbGVjdFBvcHVwL3BlcnNvblNlbGVjdC9wZXJzb24uc2VsZWN0LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg6YCJ5oupIOmDqOWIhuS6uuWPr+ingSBwZXJzb24g56qX5Y+j5by55Ye65L6b6YCJ5oupXHJcbiAqIEB0aW1lOiAyMDE3LTA2LTEzIDE0OjAxOjMyXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL3BlcnNvbi1zZWxlY3QuY3NzXCI7XHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtQZXJzb25UcmVlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9QZXJzb25UcmVlRXhcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtUcmVlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5pbXBvcnQge0lDb25uZWN0VHJlZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBQZXJzb25TZWxlY3RDb250cm9sbGVyIHtcclxuXHJcbiAgICBwZXJzb25UcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxQZXJzb25UcmVlRXggfCBBcmVhRXg+O1xyXG4gICAgcGVyc29uVHJlZUlkOiBzdHJpbmcgPSBcInBlcnNvblNlbGVjdE1vZGVsVHJlZVwiO1xyXG4gICAgcGVyc29uU2VsZWN0ZWRMaXN0OiBBcnJheTxQZXJzb25UcmVlRXg+ID0gW10gYXMgQXJyYXk8UGVyc29uVHJlZUV4PjtcclxuICAgIHBlcnNvblNlbGVjdGVkSWRMaXN0OiBBcnJheTxzdHJpbmc+ID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgIHNlYXJjaFBlcnNvblN0cjogc3RyaW5nID0gXCJcIjtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCBcInRyZWVEaXJlY3RpdmVTZXJ2aWNlXCIsJ2Nvbm5lY3RUcmVlU2VydmljZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTpJQ29ubmVjdFRyZWVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5wZXJzb25TZWxlY3RlZElkTGlzdCA9IHRoaXMuJHNjb3BlLnNlbGVjdFBlcnNvbklEO1xyXG4gICAgICAgIHRoaXMuaW5pdFBlcnNvblRyZWVQYXJhbXMoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuICAgIG9uQ2hhbmdlU2VhcmNoKHNlYXJjaFN0cjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMucGVyc29uVHJlZUlkLCAnTmFtZScsIHNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5Yid5aeL5YyWIOaRhOWDj+acuiDmoJHnm7jlhbPlj4LmlbBcclxuICAgIHByaXZhdGUgaW5pdFBlcnNvblRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5wZXJzb25UcmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPFBlcnNvblRyZWVFeCB8IEFyZWFFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5wZXJzb25UcmVlUGFyYW1zLnRyZWVJZCA9IHRoaXMucGVyc29uVHJlZUlkO1xyXG4gICAgICAgIHRoaXMucGVyc29uVHJlZVBhcmFtcy5pc1Nob3dJY29uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnBlcnNvblRyZWVQYXJhbXMuaXNTaG93TGluZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnBlcnNvblRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLnBlcnNvblRyZWVQYXJhbXMuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlcnNvblRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5wZXJzb25UcmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uU2VsZWN0ZWRMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdChUcmVlVHlwZS5wZXJzb24udmFsdWUsIHRyZWVJZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wZXJzb25UcmVlUGFyYW1zLnRyZWVJbml0Q29tcGxldGUgPSAodHJlZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGVyc29uU2VsZWN0ZWRJZExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWZhdWx0Q2hlY2tUcmVlQnlJZHMoVHJlZVR5cGUucGVyc29uLnZhbHVlLCB0aGlzLnBlcnNvblRyZWVJZCwgdGhpcy5wZXJzb25TZWxlY3RlZElkTGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhV2l0aFBlcnNvbigpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgUGVyc29uVHJlZUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBlcnNvblRyZWVQYXJhbXMudHJlZURhdGFzID0gcmVzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBjcmVhdGUgYnkgenhxXHJcbiAgICAgKiDmoLnmja4g5pWw5o2u6ZuG5ZCIIOWLvumAiSDlr7nlupTnmoTmoJHoioLngrlcclxuICAgICAqIEB0aW1lOiAyMDE3LTA2LTEyIDEyOjAyOjMyXHJcbiAgICAgKiBAcGFyYW1zOiB0cmVlVHlwZSDli77pgInoioLngrkg5qCR57G75Z6L5qCH6K+GXHJcbiAgICAgKiBAcGFyYW1zOiB0cmVlSWQg5Yu+6YCJ6IqC54K5IOagkUlEXHJcbiAgICAgKiBAcGFyYW1zOiBpZHMg57uT5ZCIXHJcbiAgICAgKiBAcGFyYW1zOiBwYXJhbU5hbWUg5Yy56YWN5Y+C5pWw5ZCN56ewIOm7mOiupCBcIklEXCJcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGVmYXVsdENoZWNrVHJlZUJ5SWRzID0gKHRyZWVUeXBlOiBzdHJpbmcsIHRyZWVJZDogc3RyaW5nLCBpZHM6IEFycmF5PHN0cmluZz4sIHBhcmFtTmFtZT86IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgIGlmICghcGFyYW1OYW1lKSB7XHJcbiAgICAgICAgICAgIHBhcmFtTmFtZSA9IFwiSURcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja1BhcmFtc0xpc3QgPSBbXSBhcyBBcnJheTx7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH0+O1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goaWRzLCAodmFsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNoZWNrUGFyYW1zTGlzdC5wdXNoKHtrZXk6IHBhcmFtTmFtZSwgdmFsdWU6IHZhbH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0cmVlSWQsIGNoZWNrUGFyYW1zTGlzdCwgdHJ1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGVyc29uU2VsZWN0ZWRMaXN0ID0gdGhpcy5nZXRDaGVja2VkTGlzdCh0cmVlVHlwZSwgdHJlZUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGVyc29uU2VsZWN0ZWRMaXN0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICog6I635Y+W5bey6YCJ5oup55qEIOagkeiKgueCuembhuWQiFxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMTIgMTI6MDI6MzJcclxuICAgICAqIEBwYXJhbXM6IHRyZWVUeXBlIOWLvumAieiKgueCuSDmoJHnsbvlnovmoIfor4ZcclxuICAgICAqIEBwYXJhbXM6IHRyZWVJZCDli77pgInoioLngrkg5qCRSURcclxuICAgICAqIEByZXR1cm46IEFycmF5PENhbWVyYUV4PiZBcnJheTxCdXNpbmVzc0xpYkV4PiDoioLngrnpm4blkIgg57G75Z6L5LiOIHRyZWVUeXBlIOebuOWvueW6lFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldENoZWNrZWRMaXN0KHRyZWVUeXBlOiBzdHJpbmcsIHRyZWVJZDogc3RyaW5nKTogQXJyYXk8UGVyc29uVHJlZUV4ICYgQXJlYUV4PiB7XHJcbiAgICAgICAgbGV0IHRyZWVDaGVja2VkTm9kZXMgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0cmVlSWQsIHRydWUpO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IEFycmF5PFBlcnNvblRyZWVFeCAmIEFyZWFFeD4gPSBbXSBhcyBBcnJheTxQZXJzb25UcmVlRXggJiBBcmVhRXg+O1xyXG4gICAgICAgIGlmICh0cmVlQ2hlY2tlZE5vZGVzKSB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0cmVlQ2hlY2tlZE5vZGVzLCAodmFsOiBQZXJzb25UcmVlRXggJiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWwudHJlZVR5cGUgPT09IHRyZWVUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v56e76ZmkIOW3sumAiSDnm67nmoTpoblcclxuICAgIHJlbW92ZVNlbGVjdGVkKHBJdGVtOiBhbnksIGlzUmVtb3ZlQWxsPzogYm9vbGVhbikge1xyXG4gICAgICAgIGlmIChwSXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMucGVyc29uVHJlZUlkLCBwSXRlbS50SWQsIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5wZXJzb25TZWxlY3RlZExpc3QgPSB0aGlzLmdldENoZWNrZWRMaXN0KFRyZWVUeXBlLnBlcnNvbi52YWx1ZSwgdGhpcy5wZXJzb25UcmVlSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSZW1vdmVBbGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHJlZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLnBlcnNvblRyZWVJZCwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblNlbGVjdGVkTGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xvc2VVcGRhdGVNb2RlbCgpe1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdwZXJzb24uc2VsZWN0LnBvcHVwJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tbWl0UGVyc29uU2VsZWN0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBlcnNvblNlbGVjdGVkTGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCByZXN1bHRJZExpc3QgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnBlcnNvblNlbGVjdGVkTGlzdCwgKHZhbDogUGVyc29uVHJlZUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdElkTGlzdC5wdXNoKHZhbC5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ3BlcnNvbi5zZWxlY3QucG9wdXAnLCByZXN1bHRJZExpc3QpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcigncGVyc29uU2VsZWN0Q29udHJvbGxlcicsIFBlcnNvblNlbGVjdENvbnRyb2xsZXIpOyJdfQ==
