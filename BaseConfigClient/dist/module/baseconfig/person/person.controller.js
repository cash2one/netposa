define(["require", "exports", "text!./person.updateModal.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/directive/tree/tree-params", "../../../core/params/PersonParams", "../../common/services/casecade.service", "../../../core/server/enum/GenderType", "css!../css/baseconfig-person.css", "css!../style/swith-toggle.css", "css!../style/baseconfig-area.css", "../../common/services/area.service", "../../common/services/person.service", "../../common/services/unit.service", "../../common/services/role.service", "angular", "./person.updateModal.controller"], function (require, exports, personUpdateModalHtml, main_app_1, page_params_1, tree_params_1, PersonParams_1, casecade_service_1, GenderType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigPersonController = (function () {
        function BaseConfigPersonController($scope, $timeout, layer, areaService, personService, casCadeService, roleService, i18nFactory, unitService, userInfoCacheFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.layer = layer;
            this.areaService = areaService;
            this.personService = personService;
            this.casCadeService = casCadeService;
            this.roleService = roleService;
            this.i18nFactory = i18nFactory;
            this.unitService = unitService;
            this.userInfoCacheFactory = userInfoCacheFactory;
            this.searchParams = { name: null, unitId: null, roleId: null };
            this.updateLayerIndex = 0;
            this.areaTreeSearchInputStr = "";
            this.tableNoData = false;
            this.isSelectAll = false;
            this.openSaveOrUpdateModal = function (isUpdate, data) {
                var scope = _this.$scope.$new();
                var titleStr = '';
                if (isUpdate) {
                    scope.isUpdate = true;
                    scope.updateData = data;
                    titleStr = _this.i18nFactory('DP_CONFIG_COMMON_38');
                }
                else {
                    scope.isUpdate = false;
                    scope.currentSelectAreaId = _this.finListParams.areaID;
                    scope.currentSelectUnitId = _this.finListParams.unitID;
                    titleStr = _this.i18nFactory('DP_CONFIG_COMMON_40');
                }
                _this.layer.open({
                    type: 1,
                    title: titleStr,
                    content: personUpdateModalHtml,
                    skin: 'no-scroll',
                    scope: scope,
                    area: ["auto", "482px"],
                    end: function () {
                        scope.$destroy();
                    }
                }).then(function (index) {
                    _this.openCloseLayerWatch();
                    _this.setUpdateLayerIndex(index);
                });
            };
            this.pageParams = new page_params_1.default();
            this.finListParams = this.initFindPersonListParams();
            this.tBodyList = [];
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_PERSON_10" },
                { field: "CallNo", title: "DP_CONFIG_PERSON_11" },
                { field: "EMail", title: "DP_CONFIG_PERSON_12" },
                { field: "Name", title: "DP_CONFIG_PERSON_13" },
                { field: "Port", title: "DP_CONFIG_PERSON_14" },
                { field: "Port", title: "DP_CONFIG_PERSON_15" },
                { field: "Description", title: "DP_CONFIG_PERSON_16" },
                { field: "", title: "DP_CONFIG_PERSON_17" },
            ];
            this.initEnums();
            var vm_this = this;
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaPerson';
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            function treeSelectNode(event, treeId, treeNode) {
                if (treeNode.ID == vm_this.finListParams.areaID) {
                    if (vm_this.tBodyList) {
                        return;
                    }
                }
                vm_this.finListParams.areaID = treeNode.ID;
                vm_this.getListByParams(vm_this.finListParams);
                vm_this.getUniListByArea(treeNode.ID);
            }
            function treeInitComplete() {
            }
            this.getAreaTreeList();
            this.getRoleList();
        }
        BaseConfigPersonController.prototype.initEnums = function () {
            this.genderTypeObj = {};
            var item;
            for (var k in GenderType_1.GenderType) {
                item = GenderType_1.GenderType[k];
                this.genderTypeObj[item.value] = item.text;
            }
        };
        BaseConfigPersonController.prototype.getRoleList = function () {
            var _this = this;
            var req_params = {
                keyword: ""
            };
            this.finishedRoleList = false;
            this.roleService.findListByParams(req_params).then(function (resp) {
                if (resp.code == 200) {
                    _this.roleList = resp.data;
                    _this.finishedRoleList = true;
                }
                else {
                    _this.finishedRoleList = false;
                }
            });
        };
        ;
        BaseConfigPersonController.prototype.getUniListByArea = function (areaId) {
            var _this = this;
            this.unitList = null;
            this.unitService.findUnitTreeList(areaId).then(function (datas) {
                if (datas && datas.length > 0) {
                    _this.$timeout(function () {
                        _this.unitList = datas;
                    });
                }
            });
        };
        BaseConfigPersonController.prototype.clickRoleList = function () {
            if (!this.finishedRoleList && !this.roleList) {
                this.getRoleList();
            }
        };
        BaseConfigPersonController.prototype.getAreaTreeList = function (keyword) {
            var _this = this;
            var params = this.areaTreeDatas.reqParams;
            params.keyword = keyword;
            this.areaService.findListTree(params).then(function (resp) {
                if (resp) {
                    _this.areaTreeDatas.finishedNoData = false;
                }
                else {
                    _this.areaTreeDatas.finishedNoData = true;
                }
                _this.$timeout(function () {
                    _this.setAreaTreeDatas(resp);
                });
            });
        };
        ;
        BaseConfigPersonController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        BaseConfigPersonController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        BaseConfigPersonController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        BaseConfigPersonController.prototype.getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.areaID;
            result.isAsc = tableParams.isAsc;
            result.name = this.searchParams.name;
            result.roleId = this.searchParams.roleId;
            result.unitId = this.searchParams.unitId;
            return result;
        };
        ;
        BaseConfigPersonController.prototype.getListByParams = function (req_params) {
            var vm_this = this;
            var uid = this.userInfoCacheFactory.getCurrentUid();
            this.currentUid = uid;
            this.casCadeService.findUserList(this.getCasCadeSearchParams(req_params)).then(function (resp) {
                if (resp.code == 200) {
                    vm_this.$timeout(function () {
                        if (resp.data && resp.data.length > 0) {
                            vm_this.tBodyList = resp.data;
                            vm_this.tableNoData = false;
                        }
                        else {
                            vm_this.tBodyList = [];
                            vm_this.tableNoData = true;
                        }
                        var pageParams = new page_params_1.default();
                        pageParams.currentPage = req_params.currentPage;
                        pageParams.pageSize = req_params.pageSize;
                        pageParams.setTotalCount(resp.count);
                        vm_this.pageParams = pageParams;
                    });
                }
            });
        };
        BaseConfigPersonController.prototype.initFindPersonListParams = function () {
            var newParams = new PersonParams_1.PersonListParams();
            newParams.areaID = '';
            newParams.unitID = '';
            newParams.name = '';
            newParams.pageSize = this.pageParams.pageSize;
            newParams.currentPage = 1;
            return newParams;
        };
        BaseConfigPersonController.prototype.initSearchParams = function () {
        };
        BaseConfigPersonController.prototype.getListBySearch = function () {
            if (!this.areaTreeDatas.treeDatas) {
                return;
            }
            if (this.searchParams.name == this.finListParams.name) {
            }
            this.finListParams.currentPage = 1;
            this.finListParams.name = this.searchParams.name;
            this.getListByParams(this.finListParams);
        };
        BaseConfigPersonController.prototype.findById = function (id) {
            return this.personService.findDetailById(id);
        };
        BaseConfigPersonController.prototype.update = function (model) {
            var _this = this;
            this.findById(model.PersonID).then(function (resp) {
                if (resp.code == 200) {
                    _this.openSaveOrUpdateModal(true, resp.data);
                }
            });
        };
        ;
        BaseConfigPersonController.prototype.setUpdateLayerIndex = function (index) {
            this.updateLayerIndex = index;
        };
        ;
        BaseConfigPersonController.prototype.getUpdateLayerIndex = function () {
            return this.updateLayerIndex;
        };
        ;
        BaseConfigPersonController.prototype.openCloseLayerWatch = function () {
            if (!this.updateLayerIndex) {
                var self_this_1 = this;
                this.$scope.$on('closeUserUpdateModel', function (even, data) {
                    if (data.isCommit) {
                        self_this_1.finListParams.name = '';
                        self_this_1.initSearchParams();
                        self_this_1.$timeout(function () {
                            self_this_1.getListByParams(self_this_1.finListParams);
                        }, 1000);
                    }
                    self_this_1.closeLayer();
                });
            }
        };
        BaseConfigPersonController.prototype.closeLayer = function () {
            var index = this.getUpdateLayerIndex();
            return this.layer.close(index);
        };
        BaseConfigPersonController.prototype.delete = function (id) {
            var _this = this;
            this.layer.confirm(this.i18nFactory('DP_CONFIG_COMMON_43'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.personService.deleteById(id).then(function (resp) {
                    if (resp.code === 200) {
                        _this.finListParams.currentPage = 1;
                        _this.getListByParams(_this.finListParams);
                    }
                });
            });
        };
        ;
        BaseConfigPersonController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        BaseConfigPersonController.prototype.getSelectedList = function () {
            var _this = this;
            var personList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (person, index) {
                    if (_this.selectedList[index]) {
                        personList.push(person);
                    }
                });
            }
            return personList;
        };
        ;
        BaseConfigPersonController.prototype.deleteByIds = function () {
            var _this = this;
            var personList = this.getSelectedList();
            if (!personList || personList.length == 0) {
                this.layer.msg(this.i18nFactory('DP_CONFIG_COMMON_84'));
                return;
            }
            var ids = [];
            this.getSelectedList().forEach(function (persons) {
                ids.push(persons.ID);
            });
            this.layer.confirm(this.i18nFactory('DP_CONFIG_IODSERVER_12', { value: ids.length }), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.personService.deleteByIds(ids).then(function (resp) {
                    if (resp.code == 200) {
                        _this.finListParams.currentPage = 1;
                        _this.getListByParams(_this.finListParams);
                    }
                });
            });
        };
        BaseConfigPersonController.prototype.changePage = function (num) {
            this.finListParams.currentPage = num;
            this.initSearchParams();
            this.getListByParams(this.finListParams);
        };
        BaseConfigPersonController.prototype.changePageSize = function (num) {
            this.finListParams.pageSize = num;
            this.initSearchParams();
            this.getListByParams(this.finListParams);
        };
        BaseConfigPersonController.prototype.exportTempalte = function () {
            this.layer.msg("导出模版功能未实现");
        };
        BaseConfigPersonController.prototype.batchAdd = function () {
            this.layer.msg("批量导入用户功能未实现");
        };
        BaseConfigPersonController.prototype.setIsSelectItems = function (items) {
            var result = false;
            if (items && items.length > 0) {
                var i = void 0, len = void 0;
                for (i = 0, len = items.length; i < len; i++) {
                    if (items[i]) {
                        result = true;
                        break;
                    }
                }
            }
            if (this.isSelectItems !== result) {
                this.isSelectItems = result;
            }
        };
        BaseConfigPersonController.prototype.changeUserStatusTd = function (checked, item) {
            this.personService.changeUserStatus({
                "userIds": item.ID,
                "status": checked
            }).then(function (res) {
                if (res.code !== 200) {
                    item.IsDisable = false;
                }
            });
        };
        BaseConfigPersonController.prototype.changeUserStatus = function (flag) {
            var _this = this;
            var personList = this.getSelectedList();
            console.error(personList);
            if (!personList || personList.length == 0) {
                this.layer.msg(this.i18nFactory('DP_CONFIG_COMMON_84'));
                return;
            }
            var ids = [];
            personList.forEach(function (person) {
                ids.push(person.ID);
            });
            return this.personService.changeUserStatus({ userIds: ids.join(","), status: flag })
                .then(function (res) {
                if (res.code == 200) {
                    _this.$timeout(function () {
                        _this.getListByParams(_this.finListParams);
                    }, 1000);
                }
            });
        };
        BaseConfigPersonController.$inject = ['$scope', '$timeout', 'layer', 'areaService', 'personService', 'casCadeService', 'roleService', 'i18nFactory', 'unitService', 'userInfoCacheFactory'];
        return BaseConfigPersonController;
    }());
    main_app_1.app
        .controller('baseConfigPersonController', BaseConfigPersonController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9wZXJzb24vcGVyc29uLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0NBO1FBa0NJLG9DQUFvQixNQUFXLEVBQVUsUUFBYSxFQUFVLEtBQVUsRUFBVSxXQUF5QixFQUN6RixhQUE2QixFQUFVLGNBQStCLEVBQ3RFLFdBQXlCLEVBQVUsV0FBZ0IsRUFBVSxXQUF5QixFQUN0RixvQkFBMkM7WUFIL0QsaUJBa0RDO1lBbERtQixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUFVLFVBQUssR0FBTCxLQUFLLENBQUs7WUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6RixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7WUFDdEUsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3RGLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBdUI7WUE5Qi9ELGlCQUFZLEdBQXFELEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztZQUUxRyxxQkFBZ0IsR0FBWSxDQUFDLENBQUM7WUFLOUIsMkJBQXNCLEdBQVcsRUFBRSxDQUFDO1lBS3BDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBRzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBa1E3QiwwQkFBcUIsR0FBRyxVQUFDLFFBQWtCLEVBQUUsSUFBZTtnQkFFeEQsSUFBSSxLQUFLLEdBQVEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUNYLEtBQUssQ0FBQyxRQUFR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SUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVsQixLQUFJLENBQUMsUUFBUSxDQUFDO3dCQUNWLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUM3QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7Z0JBQ1osQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQTllTSxrQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBK2UzSyxpQ0FBQztLQWhmRCxBQWdmQyxJQUFBO0lBRUQsY0FBRztTQUNFLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3BlcnNvbi9wZXJzb24uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGRlbGwgb24gMjAxNy8zLzIzLlxyXG4gKi9cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3BlcnNvbi51cGRhdGVNb2RhbC5odG1sXCIgbmFtZT1cInBlcnNvblVwZGF0ZU1vZGFsSHRtbFwiIC8+XHJcblxyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL2Jhc2Vjb25maWctcGVyc29uLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi4vc3R5bGUvc3dpdGgtdG9nZ2xlLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi4vc3R5bGUvYmFzZWNvbmZpZy1hcmVhLmNzc1wiO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtQZXJzb259IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9QZXJzb25cIjtcclxuaW1wb3J0IHtQZXJzb25FeCwgRmluZFBlcnNvbk1vZGVsfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUGVyc29uRXhcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtSZXNwb25zZVJlc3VsdCwgUGFnZVJlc3VsdH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQge0lQZXJzb25TZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3BlcnNvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVJvbGVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3JvbGUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wZXJzb24uc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvdW5pdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9yb2xlLnNlcnZpY2VcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCAnLi9wZXJzb24udXBkYXRlTW9kYWwuY29udHJvbGxlcidcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7UGVyc29uTGlzdFBhcmFtcywgUGVyc29uQ2hhbmdlU3RhdHVzUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvUGVyc29uUGFyYW1zXCI7XHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge0lDYXNDYWRlU2VydmljZSwgQ2FzQ2FkZVNlYXJjaFBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYXNlY2FkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBSb2xlIGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Sb2xlXCI7XHJcbmltcG9ydCB7R2VuZGVyVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvc2VydmVyL2VudW0vR2VuZGVyVHlwZVwiO1xyXG5pbXBvcnQge1VuaXR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Vbml0XCI7XHJcbmltcG9ydCB7SVVuaXRTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3VuaXQuc2VydmljZVwiO1xyXG5pbXBvcnQge1VzZXJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1VzZXJFeFwiO1xyXG5pbXBvcnQgeyBJVXNlckluZm9DYWNoZUZhY3RvcnkgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2ZhY3RvcnkvdXNlcmluZm8uY2FjaGUuZmFjdG9yeVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5kZWNsYXJlIGxldCBwZXJzb25VcGRhdGVNb2RhbEh0bWw6IGFueTtcclxuXHJcbmNsYXNzIEJhc2VDb25maWdQZXJzb25Db250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbGF5ZXInLCAnYXJlYVNlcnZpY2UnLCAncGVyc29uU2VydmljZScsICdjYXNDYWRlU2VydmljZScsICdyb2xlU2VydmljZScsICdpMThuRmFjdG9yeScsICd1bml0U2VydmljZScsJ3VzZXJJbmZvQ2FjaGVGYWN0b3J5J107XHJcblxyXG4gICAgcGFnZVBhcmFtczogUGFnZVBhcmFtczsgIC8vLS0tLS0tZGlyZWN0aXZlIHBhZ2VzIHBhcmFtc1xyXG4gICAgLy/nu7zlkIjmn6Xor6LmnaHku7ZcclxuICAgIGZpbkxpc3RQYXJhbXM6IFBlcnNvbkxpc3RQYXJhbXM7XHJcbiAgICAvLyDmjInpkq7mn6Xor6LmnaHku7YgKOWQjeensO+8jOinkuiJsuexu+WeiylcclxuICAgIHNlYXJjaFBhcmFtczogeyBuYW1lOiBzdHJpbmcsIHVuaXRJZDogc3RyaW5nLCByb2xlSWQ6IHN0cmluZyB9ID0ge25hbWU6IG51bGwsIHVuaXRJZDogbnVsbCwgcm9sZUlkOiBudWxsfTtcclxuICAgIC8v5re75Yqg5pu05paw5pON5L2cXHJcbiAgICB1cGRhdGVMYXllckluZGV4PzogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvLyDpgInmi6nooYzmlL/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YXM6IElUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY3VycmVudEFyZWE6IEFyZWFFeDtcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAvLyB0YWJsZSDliJfooajmlbDmja5cclxuICAgIHRIZWFkTGlzdDogQXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDogQXJyYXk8RmluZFBlcnNvbk1vZGVsPjtcclxuXHJcbiAgICB0YWJsZU5vRGF0YTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIOaYr+WQpuWFqOmAieagh+ivhlxyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIC8vIOmAieaLqee7k+aenOWIl+ihqFxyXG4gICAgc2VsZWN0ZWRMaXN0OiBBcnJheTxib29sZWFuPjtcclxuICAgIC8v6KeS6Imy5YiX6KGoXHJcbiAgICByb2xlTGlzdDogQXJyYXk8Um9sZT47XHJcbiAgICBmaW5pc2hlZFJvbGVMaXN0OiBib29sZWFuO1xyXG4gICAgLy8gYWx0ZXIgd3lyOiDnlKjkuo7liKTmlq3lvZPliY3nlYzpnaLkuIrnmoTliJfooajmmK/lkKbooqvpgInkuK1cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcbiAgICBnZW5kZXJUeXBlT2JqOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG4gICAgdW5pdExpc3Q6IEFycmF5PFVuaXQ+O1xyXG4gICAgY3VycmVudFVpZDpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkdGltZW91dDogYW55LCBwcml2YXRlIGxheWVyOiBhbnksIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcGVyc29uU2VydmljZTogSVBlcnNvblNlcnZpY2UsIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm9sZVNlcnZpY2U6IElSb2xlU2VydmljZSwgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LCBwcml2YXRlIHVuaXRTZXJ2aWNlOiBJVW5pdFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHVzZXJJbmZvQ2FjaGVGYWN0b3J5OiBJVXNlckluZm9DYWNoZUZhY3RvcnkpIHtcclxuXHJcbiAgICAgICAgLy8gZGF0YUxJc3RcclxuICAgICAgICB0aGlzLnBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluTGlzdFBhcmFtcyA9IHRoaXMuaW5pdEZpbmRQZXJzb25MaXN0UGFyYW1zKCk7XHJcblxyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgdGhpcy50SGVhZExpc3QgPSBbXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTBcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJDYWxsTm9cIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BFUlNPTl8xMVwifSxcclxuICAgICAgICAgICAge2ZpZWxkOiBcIkVNYWlsXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTJcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTNcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTRcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTVcIn0sXHJcbiAgICAgICAgICAgIHtmaWVsZDogXCJEZXNjcmlwdGlvblwiLCB0aXRsZTogXCJEUF9DT05GSUdfUEVSU09OXzE2XCJ9LFxyXG4gICAgICAgICAgICB7ZmllbGQ6IFwiXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QRVJTT05fMTdcIn0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICAvLyDliJ3lp4vljJbnlYzpnaLkuK3pnIDopoHkvb/nlKjliLDnmoTmnprkuL5cclxuICAgICAgICB0aGlzLmluaXRFbnVtcygpO1xyXG5cclxuICAgICAgICBsZXQgdm1fdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8g5qCR5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgLy/liJ3lp4vljJYgYXJlYSDmoJHmlbDmja5cclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnYXJlYVBlcnNvbic7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcblxyXG4gICAgICAgIC8vIOiKgueCuemAieaLqVxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHRyZWVOb2RlLklEID09IHZtX3RoaXMuZmluTGlzdFBhcmFtcy5hcmVhSUQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2bV90aGlzLnRCb2R5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2bV90aGlzLmZpbkxpc3RQYXJhbXMuYXJlYUlEID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHZtX3RoaXMuZ2V0TGlzdEJ5UGFyYW1zKHZtX3RoaXMuZmluTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIHZtX3RoaXMuZ2V0VW5pTGlzdEJ5QXJlYSh0cmVlTm9kZS5JRCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QoKTtcclxuICAgICAgICB0aGlzLmdldFJvbGVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEVudW1zKCkge1xyXG4gICAgICAgIHRoaXMuZ2VuZGVyVHlwZU9iaiA9IHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgICAgICAgbGV0IGl0ZW07XHJcbiAgICAgICAgZm9yIChsZXQgayBpbiBHZW5kZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIGl0ZW0gPSBHZW5kZXJUeXBlW2tdO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmRlclR5cGVPYmpbaXRlbS52YWx1ZV0gPSBpdGVtLnRleHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6KeS6Imy5YiX6KGo5pON5L2cXHJcbiAgICBnZXRSb2xlTGlzdCgpIHtcclxuICAgICAgICAvKlRPRE8g6LCD55So6I635Y+W6KeS6Imy5YiX6KGo5L2/55So6KeS6Imy566h55CG5pCc57Si5ZCM5LiA5o6l5Y+jKi9cclxuICAgICAgICBsZXQgcmVxX3BhcmFtcyA9IHtcclxuICAgICAgICAgICAga2V5d29yZDogXCJcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5maW5pc2hlZFJvbGVMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5yb2xlU2VydmljZS5maW5kTGlzdEJ5UGFyYW1zKHJlcV9wYXJhbXMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEFycmF5PFJvbGU+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb2xlTGlzdCA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoZWRSb2xlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaGVkUm9sZUxpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbi8vIOWNleS9jeWIl+ihqFxyXG4gICAgZ2V0VW5pTGlzdEJ5QXJlYShhcmVhSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudW5pdExpc3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudW5pdFNlcnZpY2UuZmluZFVuaXRUcmVlTGlzdChhcmVhSWQpLnRoZW4oKGRhdGFzOiBBcnJheTxVbml0PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YXMgJiYgZGF0YXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bml0TGlzdCA9IGRhdGFzO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v54K55Ye76KeS6Imy5YiX6KGo5pyq6I635Y+W5YiX6KGo5pWw5o2uIOmHjeaWsOiOt+WPllxyXG4gICAgY2xpY2tSb2xlTGlzdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZmluaXNoZWRSb2xlTGlzdCAmJiAhdGhpcy5yb2xlTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLmdldFJvbGVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLS0tLS0tLS0tLS0g5qCR5YiXIOaTjeS9nOWHveaVsFxyXG4gICAgLy8g5pWw5o2u6I635Y+WXHJcbiAgICBnZXRBcmVhVHJlZUxpc3Qoa2V5d29yZD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJlYVRyZWVEYXRhcyhyZXNwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmoJHotYvlgLxcclxuICAgIHNldEFyZWFUcmVlRGF0YXModHJlZURhdGFzPzogQXJyYXk8QXJlYUV4Pikge1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMgPSB0cmVlRGF0YXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGdldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IFBlcnNvbkxpc3RQYXJhbXMpIHtcclxuICAgICAgICBpZiAoIXRhYmxlUGFyYW1zKSByZXR1cm4ge30gYXMgQ2FzQ2FkZVNlYXJjaFBhcmFtcztcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VJbmRleCA9IHRhYmxlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHJlc3VsdC5vcmRlckZpZWxkID0gdGFibGVQYXJhbXMuc29ydE5hbWU7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VTaXplID0gdGFibGVQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgcmVzdWx0LmFyZWFJZCA9IHRhYmxlUGFyYW1zLmFyZWFJRDtcclxuICAgICAgICByZXN1bHQuaXNBc2MgPSB0YWJsZVBhcmFtcy5pc0FzYztcclxuICAgICAgICByZXN1bHQubmFtZSA9IHRoaXMuc2VhcmNoUGFyYW1zLm5hbWU7XHJcbiAgICAgICAgcmVzdWx0LnJvbGVJZCA9IHRoaXMuc2VhcmNoUGFyYW1zLnJvbGVJZDtcclxuICAgICAgICByZXN1bHQudW5pdElkID0gdGhpcy5zZWFyY2hQYXJhbXMudW5pdElkO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiBUT0RPIOacqumZkOWItuafpeivoumHjeWkjeeCueWHuyDooYzmlL/ljLrln5/mnaHku7YqL1xyXG4gICAgLyoqXHJcbiAgICAgKiAg5qC55o2u5p2h5Lu25p+l6K+iXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0yMCAyMDo0Mjo0MVxyXG4gICAgICogQHBhcmFtczogcmVxX3BhcmFtcyDlhoXpmaTkuoblgZrliIbpobVcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGdldExpc3RCeVBhcmFtcyhyZXFfcGFyYW1zOiBQZXJzb25MaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IHZtX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGxldCB1aWQgPSB0aGlzLnVzZXJJbmZvQ2FjaGVGYWN0b3J5LmdldEN1cnJlbnRVaWQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRVaWQgPSB1aWQ7XHJcbiAgICAgICAgdGhpcy5jYXNDYWRlU2VydmljZS5maW5kVXNlckxpc3QodGhpcy5nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHJlcV9wYXJhbXMpKS50aGVuKGZ1bmN0aW9uIChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcnJheTxGaW5kUGVyc29uTW9kZWw+Pikge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdm1fdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YSAmJiByZXNwLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2bV90aGlzLnRCb2R5TGlzdCA9IHJlc3AuZGF0YTsvL3ZtX3RoaXMuZGVsZXRlQWRtaW4ocmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdm1fdGhpcy50YWJsZU5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtX3RoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtX3RoaXMudGFibGVOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5jdXJyZW50UGFnZSA9IHJlcV9wYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5wYWdlU2l6ZSA9IHJlcV9wYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZtX3RoaXMucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGRlbGV0ZUFkbWluKG9sZERhdGE6QXJyYXk8RmluZFBlcnNvbk1vZGVsPik6QXJyYXk8RmluZFBlcnNvbk1vZGVsPntcclxuICAgIC8vICAgICBhbmd1bGFyLmZvckVhY2gob2xkRGF0YSwgKHZhbDogRmluZFBlcnNvbk1vZGVsLGluZGV4Om51bWJlcikgPT4ge1xyXG4gICAgLy8gICAgICAgICBkZWJ1Z2dlclxyXG4gICAgLy8gICAgICAgICBpZih2YWwuVWlkID0gXCJhZG1pblwiKXtcclxuICAgIC8vICAgICAgICAgICAgIG9sZERhdGEuc2xpY2UoaW5kZXgsMSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICByZXR1cm4gb2xkRGF0YTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBpbml0RmluZFBlcnNvbkxpc3RQYXJhbXMoKTogUGVyc29uTGlzdFBhcmFtcyB7XHJcbiAgICAgICAgbGV0IG5ld1BhcmFtcyA9IG5ldyBQZXJzb25MaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgbmV3UGFyYW1zLmFyZWFJRCA9ICcnO1xyXG4gICAgICAgIG5ld1BhcmFtcy51bml0SUQgPSAnJztcclxuICAgICAgICBuZXdQYXJhbXMubmFtZSA9ICcnO1xyXG4gICAgICAgIG5ld1BhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICBuZXdQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHJldHVybiBuZXdQYXJhbXM7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdFNlYXJjaFBhcmFtcygpIHtcclxuICAgICAgICAvLyAgdGhpcy5zZWFyY2hQYXJhbXMubmFtZSA9IHRoaXMuZmluTGlzdFBhcmFtcy5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldExpc3RCeVNlYXJjaCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMpIHtcclxuICAgICAgICAgICAgLypUT0RPIOihjOaUv+WMuuWfn+aVsOaNruS4uuepuuacquWBmumHjeafpeWkhOeQhiovXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUGFyYW1zLm5hbWUgPT0gdGhpcy5maW5MaXN0UGFyYW1zLm5hbWUpIHtcclxuICAgICAgICAgICAgLy9cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maW5MaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICB0aGlzLmZpbkxpc3RQYXJhbXMubmFtZSA9IHRoaXMuc2VhcmNoUGFyYW1zLm5hbWU7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5MaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tIOabtOaWsOOAgea3u+WKoOaWsCB1c2VyIG1vZGFvIOaTjeS9nFxyXG4gICAgLyoqXHJcbiAgICAgKiBpZCDojrflj5bor6bmg4VcclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTE5IDE2OjQ2OjA2XHJcbiAgICAgKiBAcGFyYW1zOiBpZDpzdHJpbmdcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGZpbmRCeUlkKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wZXJzb25TZXJ2aWNlLmZpbmREZXRhaWxCeUlkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe8lui+keaTjeS9nFxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMTkgMTc6MDQ6MzRcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICB1cGRhdGUobW9kZWw/OiBQZXJzb25FeCkge1xyXG4gICAgICAgIHRoaXMuZmluZEJ5SWQobW9kZWwuUGVyc29uSUQpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PFBlcnNvbkV4PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2F2ZU9yVXBkYXRlTW9kYWwodHJ1ZSwgcmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDmt7vliqDjgIHnvJbovpHnlKjmiLfotYTmlpnnqpflj6NcclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTE5IDE3OjAzOjMwXHJcbiAgICAgKiBAcGFyYW1zOiBpc1VwZGF0ZeOAgWRhdGEg5LiN5Lyg5YiZ6buY6K6k5re75Yqg5pON5L2cXHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBvcGVuU2F2ZU9yVXBkYXRlTW9kYWwgPSAoaXNVcGRhdGU/OiBib29sZWFuLCBkYXRhPzogUGVyc29uRXgpID0+IHtcclxuXHJcbiAgICAgICAgbGV0IHNjb3BlOiBhbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gJyc7XHJcbiAgICAgICAgaWYgKGlzVXBkYXRlKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmlzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2NvcGUudXBkYXRlRGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHRpdGxlU3RyID0gdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl8zOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNjb3BlLmN1cnJlbnRTZWxlY3RBcmVhSWQgPSB0aGlzLmZpbkxpc3RQYXJhbXMuYXJlYUlEO1xyXG4gICAgICAgICAgICBzY29wZS5jdXJyZW50U2VsZWN0VW5pdElkID0gdGhpcy5maW5MaXN0UGFyYW1zLnVuaXRJRDtcclxuICAgICAgICAgICAgdGl0bGVTdHIgPSB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQwJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVTdHIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IHBlcnNvblVwZGF0ZU1vZGFsSHRtbCxcclxuICAgICAgICAgICAgc2tpbjogJ25vLXNjcm9sbCcsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiYXV0b1wiLFwiNDgycHhcIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuQ2xvc2VMYXllcldhdGNoKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VXBkYXRlTGF5ZXJJbmRleChpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagh+ivhuW9k+WJjSDnvJbovpFsYXllciBtb2RhbFxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMTkgMTc6MDY6NDhcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBzZXRVcGRhdGVMYXllckluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVySW5kZXggPSBpbmRleDtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0VXBkYXRlTGF5ZXJJbmRleCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVMYXllckluZGV4O1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuQ2xvc2VMYXllcldhdGNoKCkge1xyXG4gICAgICAgIGlmICghdGhpcy51cGRhdGVMYXllckluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlVXNlclVwZGF0ZU1vZGVsJywgZnVuY3Rpb24gKGV2ZW46IGFueSwgZGF0YTogeyBpc0NvbW1pdDogYm9vbGVhbiB9KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaXNDb21taXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmX3RoaXMuZmluTGlzdFBhcmFtcy5uYW1lID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZl90aGlzLmluaXRTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmX3RoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmX3RoaXMuZ2V0TGlzdEJ5UGFyYW1zKHNlbGZfdGhpcy5maW5MaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmNsb3NlTGF5ZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOWFs+mXreW9k+WJjee8lui+keeahG1vZGFsXHJcbiAgICBjbG9zZUxheWVyKCk6IGFueSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRVcGRhdGVMYXllckluZGV4KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y2V5Liq5Yig6ZmkXHJcbiAgICBkZWxldGUoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIC8vIOW8ueWHuuWIoOmZpOehruiupOaPkOekuuahhlxyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQzJyksXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblNlcnZpY2UuZGVsZXRlQnlJZChpZCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbkxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbkxpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmn5DkuIDmnaHmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTIxIDE5OjQzOjA3XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8RmluZFBlcnNvbk1vZGVsPiB7XHJcbiAgICAgICAgbGV0IHBlcnNvbkxpc3Q6IEFycmF5PEZpbmRQZXJzb25Nb2RlbD4gPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QuZm9yRWFjaCgocGVyc29uOiBGaW5kUGVyc29uTW9kZWwsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25MaXN0LnB1c2gocGVyc29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwZXJzb25MaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+WkmuS4quWIoOmZpFxyXG4gICAgZGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgbGV0IHBlcnNvbkxpc3Q6IEFycmF5PEZpbmRQZXJzb25Nb2RlbD4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGlmICghcGVyc29uTGlzdCB8fCBwZXJzb25MaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fODQnKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCkuZm9yRWFjaCgocGVyc29uczogRmluZFBlcnNvbk1vZGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKHBlcnNvbnMuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIOW8ueWHuuWIoOmZpOehruiupOaPkOekuuahhlxyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfSU9EU0VSVkVSXzEyJywge3ZhbHVlOiBpZHMubGVuZ3RofSksXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBlcnNvblNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5MaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5MaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hYm91dCBwYWdlIGNsaWNrXHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5MaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuaW5pdFNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFnZVNpemUobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbkxpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5pbml0U2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5MaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnRUZW1wYWx0ZSgpIHtcclxuICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuWvvOWHuuaooeeJiOWKn+iDveacquWunueOsFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBiYXRjaEFkZCgpIHtcclxuICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuaJuemHj+WvvOWFpeeUqOaIt+WKn+iDveacquWunueOsFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPikge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBsZXQgaSwgbGVuO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlnKjooajmoLzkuK3nm7TmjqXngrnlh7vovazmjaLnlKjmiLfnmoTlkK/nlKjlhbPpl63nirbmgIFcclxuICAgIGNoYW5nZVVzZXJTdGF0dXNUZChjaGVja2VkOiBib29sZWFuLCBpdGVtOiBVc2VyRXgpIHtcclxuICAgICAgICB0aGlzLnBlcnNvblNlcnZpY2UuY2hhbmdlVXNlclN0YXR1cyh7XHJcbiAgICAgICAgICAgIFwidXNlcklkc1wiOiBpdGVtLklELFxyXG4gICAgICAgICAgICBcInN0YXR1c1wiOiBjaGVja2VkXHJcbiAgICAgICAgfSBhcyBQZXJzb25DaGFuZ2VTdGF0dXNQYXJhbXMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uSXNEaXNhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY2hhbmdlVXNlclN0YXR1cyhmbGFnOiBib29sZWFuKSB7XHJcbiAgICAgICAgbGV0IHBlcnNvbkxpc3Q6IEFycmF5PEZpbmRQZXJzb25Nb2RlbD4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IocGVyc29uTGlzdCk7XHJcbiAgICAgICAgaWYgKCFwZXJzb25MaXN0IHx8IHBlcnNvbkxpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5tc2codGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl84NCcpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgcGVyc29uTGlzdC5mb3JFYWNoKChwZXJzb246IEZpbmRQZXJzb25Nb2RlbCkgPT4ge1xyXG4gICAgICAgICAgICBpZHMucHVzaChwZXJzb24uSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBlcnNvblNlcnZpY2UuY2hhbmdlVXNlclN0YXR1cyh7dXNlcklkczogaWRzLmpvaW4oXCIsXCIpLCBzdGF0dXM6IGZsYWd9IGFzIFBlcnNvbkNoYW5nZVN0YXR1c1BhcmFtcylcclxuICAgICAgICAgICAgLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g6K+35rGC5oiQ5YqfLCDliLfmlrDliJfooahcclxuICAgICAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDliLfmlrDliJfooahcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5MaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ1BlcnNvbkNvbnRyb2xsZXInLCBCYXNlQ29uZmlnUGVyc29uQ29udHJvbGxlcik7XHJcbiJdfQ==
