define(["require", "exports", "text!../../../common/faceLibUpdateModal/faceLibUpdateModal.html", "../../../common/app/main.app", "../../../../core/params/BusinessLibParams", "../../../common/directive/page/page-params", "../../../common/services/casecade.service", "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory", "../../../common/portrait-tool", "../../../common/system-config", "angular", "../../../common/services/area.service", "../../../common/services/businessLib.service", "../../../common/services/businessLibPerson.service", "../../../common/faceLibUpdateModal/faceLibUpdateModal.factory", "../businessLibPerson.factory", "../../../common/factory/layerMsg.factory", "../../../common/filter/app.filter", "WdatePicker"], function (require, exports, htmlStr, main_app_1, BusinessLibParams_1, page_params_1, casecade_service_1, faceLibUpdateModal_factory_1, portrait_tool_1, system_config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceLibLibController = (function () {
        function FaceLibLibController($scope, $location, $state, $timeout, layer, layerDec, i18nFactory, faceLibUpdateModalFactory, areaService, businessLibService, casCadeService, businessLibPersonService, businessLibPersonFactory) {
            this.$scope = $scope;
            this.$location = $location;
            this.$state = $state;
            this.$timeout = $timeout;
            this.layer = layer;
            this.layerDec = layerDec;
            this.i18nFactory = i18nFactory;
            this.faceLibUpdateModalFactory = faceLibUpdateModalFactory;
            this.areaService = areaService;
            this.businessLibService = businessLibService;
            this.casCadeService = casCadeService;
            this.businessLibPersonService = businessLibPersonService;
            this.businessLibPersonFactory = businessLibPersonFactory;
            this.watchUpdateModalName = "watchUpdateModalName";
            this.constLibItem = system_config_1.SystemConfig.CONST_LIB;
            this.faceLibItemTemplUrl = "../../module/baseconfig/facelib/library/facelib.lib-item-template.html?v=" + new Date().getTime();
            this.initParams();
            var self_this = this;
            if ($scope.areaTreeSelectedData) {
                self_this.findListParams.areaId = $scope.areaTreeSelectedData.ID;
                self_this.findListParams.currentPage = 1;
                self_this.getListByParams(self_this.findListParams);
            }
            $scope.$on("parentAreaSelectChange", function (even, data) {
                self_this.findListParams.areaId = data.ID;
                self_this.findListParams.currentPage = 1;
                self_this.getListByParams(self_this.findListParams);
            });
        }
        FaceLibLibController.prototype.initParams = function () {
            this.pageParams = new page_params_1.default();
            this.findListParams = new BusinessLibParams_1.BusinessLibListParams();
            this.findListParams.startTime = null;
            this.findListParams.endTime = null;
            this.findListParams.keyword = null;
            this.findListParams.areaId = "";
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.findListParams.sortName = "ID";
            this.findListParams.isAsc = true;
            this.tBodyList = [];
            this.selectedList = [];
            this.tableCurrentCount = 0;
        };
        FaceLibLibController.prototype._getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.orderField = tableParams.sortName;
            result.areaId = tableParams.areaId;
            result.isAsc = tableParams.isAsc;
            result.name = tableParams.keyword;
            return result;
        };
        FaceLibLibController.prototype.getListByParams = function (params) {
            var _this = this;
            var _params = this._getCasCadeSearchParams(params);
            this.casCadeService.findAllBusinessLibList(_params).then(function (resp) {
                if (resp && resp.code == 200 && resp.data && resp.data.length > 0) {
                    _this.setTableBody(resp.data);
                    console.log("getListByParams");
                    _this.getPersonCount(resp.data);
                }
                else {
                    _this.setTableBody([]);
                }
                _this.findListParams = params;
            });
        };
        FaceLibLibController.prototype.setTableBody = function (dataList) {
            dataList = this.filterByTimeRange(dataList);
            angular.forEach(dataList, function (dataItem) {
                dataItem.isShowChild = false;
                dataItem.isCheckBox = false;
            });
            this.tBodyList = dataList;
            this.tableNoData = (this.tBodyList.length === 0);
            this.tBodyList = portrait_tool_1.default.convert2Ztree(dataList, "ID", "ParentID", "children");
            this.tableCurrentCount = this.getTableCount(this.tBodyList);
            this.selectedList = [];
        };
        FaceLibLibController.prototype.getPersonCount = function (libs) {
            var _this = this;
            var ids = [];
            angular.forEach(libs, function (val) {
                ids.push(val.ID);
            });
            this.businessLibService.findPersonCount(ids).then(function (resp) {
                if (resp.code === 200 && resp.data && resp.data.length > 0) {
                    var dateMap = {};
                    var respItem = null;
                    for (var i = 0; i < resp.data.length; i++) {
                        respItem = resp.data[i];
                        if (respItem.LibID) {
                            if (dateMap[respItem.LibID]) {
                                dateMap[respItem.LibID].TotalCount += respItem.TotalCount;
                            }
                            else {
                                dateMap[respItem.LibID] = respItem;
                            }
                        }
                    }
                    for (var ii = 0; ii < libs.length; ii++) {
                        if (dateMap[libs[ii].ID] && dateMap[libs[ii].ID].TotalCount) {
                            libs[ii].PersonCount = dateMap[libs[ii].ID].TotalCount;
                        }
                    }
                }
                _this.setTableBody(libs);
            });
        };
        ;
        FaceLibLibController.prototype.filterByTimeRange = function (dataList) {
            var _this = this;
            if (!!this.findListParams.startTime || !!this.findListParams.endTime) {
                if (!!this.findListParams.startTime && !!this.findListParams.endTime) {
                    dataList = dataList.filter(function (val) {
                        return (val.CreateTime >= _this.findListParams.startTime) && val.CreateTime <= _this.findListParams.endTime;
                    });
                }
                else if (!!this.findListParams.startTime) {
                    dataList = dataList.filter(function (val) {
                        return (val.CreateTime >= _this.findListParams.startTime);
                    });
                }
                else if (!!this.findListParams.endTime) {
                    dataList = dataList.filter(function (val) {
                        return val.CreateTime <= _this.findListParams.endTime;
                    });
                }
            }
            return dataList;
        };
        ;
        FaceLibLibController.prototype.searchLibListByParams = function () {
            if (this.findListParams.startTime && this.findListParams.endTime && this.findListParams.startTime >= this.findListParams.endTime) {
                this.layerDec.warnInfo(this.i18nFactory('DP_CONFIG_COMMON_85'));
                return;
            }
            this.getListByParams(this.findListParams);
        };
        ;
        FaceLibLibController.prototype.tableSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.searchLibListByParams();
            }
        };
        ;
        FaceLibLibController.prototype.addByParentId = function (parentId) {
            if (!parentId) {
                parentId = this.findListParams.areaId;
            }
            this.openUpdateModel(false, null, parentId, "");
        };
        FaceLibLibController.prototype.updateFaceLib = function (data, parentName) {
            var _this = this;
            var parentId = data.AreaID || data.ParentID;
            this.businessLibService.findById(data.ID).then(function (resp) {
                if (resp && resp.code == 200 && resp.data) {
                    _this.openUpdateModel(true, resp.data, parentId, parentName);
                }
            });
        };
        FaceLibLibController.prototype.openUpdateModel = function (isUpdate, data, parentId, parentName) {
            var _this = this;
            var scope = this.$scope.$new();
            var updateParams = new faceLibUpdateModal_factory_1.FaceUpdateParams();
            updateParams.isUpdate = isUpdate;
            updateParams.updateModalData = data;
            updateParams.parentID = parentId;
            updateParams.parentName = parentName;
            var titleStr = isUpdate ? this.i18nFactory('DP_CONFIG_FACELIB_37') : this.i18nFactory('DP_CONFIG_FACELIB_42');
            this.faceLibUpdateModalFactory.setUpdateParams(updateParams);
            this.layer.open({
                type: 1,
                title: titleStr,
                content: htmlStr,
                scope: scope,
                area: ["450px", "auto"],
                skin: "overflow-visible",
                end: function () {
                    scope.$destroy();
                }
            }).then(function (index) {
                _this.watchUpdateModalName = _this.faceLibUpdateModalFactory.getModalClosedWatchName();
                _this.openCloseLayerWatch();
                _this.setUpdateLayerIndex(index);
            });
        };
        ;
        FaceLibLibController.prototype.setUpdateLayerIndex = function (index) {
            this.updateLayerIndex = index;
        };
        FaceLibLibController.prototype.closeUpdateModel = function () {
            this.layer.close(this.updateLayerIndex);
        };
        FaceLibLibController.prototype.openCloseLayerWatch = function () {
            if (!this.updateLayerIndex) {
                var self_this_1 = this;
                this.$scope.$on(this.watchUpdateModalName, function (even, data) {
                    if (data.isCommit) {
                        self_this_1.getListByParams(self_this_1.findListParams);
                        if (data.isAdd) {
                            self_this_1.afterAdd(data.modelData);
                        }
                    }
                    self_this_1.closeUpdateModel();
                });
            }
        };
        FaceLibLibController.prototype.getSelectedList = function () {
            if (this.tBodyList && this.tBodyList.length > 0) {
                return this._getSelectedList(this.tBodyList);
            }
            return [];
        };
        ;
        FaceLibLibController.prototype._getSelectedList = function (srcList) {
            var result = [];
            var tNode, tIndex = 0, tLen = srcList.length;
            for (; tIndex < tLen; tIndex++) {
                tNode = srcList[tIndex];
                if (tNode.isCheckBox) {
                    result.push(tNode);
                }
                if (tNode.children) {
                    result = result.concat(this._getSelectedList(tNode.children));
                }
            }
            return result;
        };
        FaceLibLibController.prototype.getTableCount = function (srcList) {
            var _count = 0;
            if (!srcList || srcList.length == 0) {
                return 0;
            }
            _count = srcList.length;
            var tNode, tIndex = 0, tLen = srcList.length;
            for (; tIndex < tLen; tIndex++) {
                tNode = srcList[tIndex];
                if (tNode.children && tNode.children.length > 0) {
                    _count += this.getTableCount(tNode.children);
                }
            }
            return _count;
        };
        FaceLibLibController.prototype.changeChildShow = function (bItem) {
            bItem.isShowChild = !bItem.isShowChild;
        };
        ;
        FaceLibLibController.prototype.clickCheckbox = function (bItem) {
            if (!this.tBodyList || this.tBodyList.length == 0) {
                return false;
            }
            if (bItem) {
                var flag = !bItem.isCheckBox;
                this.changeCheckboxStatus(this.tBodyList, flag, bItem.ID);
            }
            else {
                var flag = true;
                if (this.selectedList.length === this.tableCurrentCount) {
                    flag = false;
                }
                this.changeCheckboxStatus(this.tBodyList, flag);
            }
            this.selectedList = this.getSelectedList();
            return true;
        };
        ;
        FaceLibLibController.prototype.changeCheckboxStatus = function (srcList, status, changeNodeId) {
            var tNode, tIndex = 0, tLen = srcList.length;
            for (; tIndex < tLen; tIndex++) {
                tNode = srcList[tIndex];
                if (changeNodeId) {
                    if (tNode.ID == changeNodeId) {
                        tNode.isCheckBox = status;
                        if (tNode.children && tNode.children.length > 0) {
                            this.changeCheckboxStatus(tNode.children, status);
                        }
                        return true;
                    }
                    else {
                        if (tNode.children) {
                            var flag = this.changeCheckboxStatus(tNode.children, status, changeNodeId);
                            if (flag) {
                                return true;
                            }
                        }
                    }
                }
                else {
                    tNode.isCheckBox = status;
                    if (tNode.children && tNode.children.length > 0) {
                        this.changeCheckboxStatus(tNode.children, status);
                    }
                }
            }
        };
        ;
        FaceLibLibController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        FaceLibLibController.prototype.deleteById = function (_index) {
            var _this = this;
            var titleStr = this.i18nFactory("DP_CONFIG_COMMON_47");
            var contentStr = this.i18nFactory("DP_CONFIG_COMMON_43", { value: _index.Name });
            this.layer.confirm(contentStr, {
                icon: 0,
                title: titleStr,
                area: ["500px", "200px"],
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds([_index.ID]);
            });
        };
        FaceLibLibController.prototype.deleteByIds = function () {
            var _this = this;
            var selectedList = this.getSelectedList();
            if (!selectedList || selectedList.length == 0) {
                return;
            }
            var ids = [];
            var hasConstLib;
            angular.forEach(selectedList, function (val) {
                if (_this.constLibItem === val.ID) {
                    hasConstLib = val.Name;
                }
                else {
                    ids.push(val.ID);
                }
            });
            if (hasConstLib) {
                this.layerDec.warnInfo(this.i18nFactory("DP_CONFIG_FACELIB_43", { value: hasConstLib }));
                if (ids.length === 0) {
                    return;
                }
            }
            var titleStr = this.i18nFactory("DP_CONFIG_COMMON_47");
            var showText = this.i18nFactory("DP_CONFIG_FACELIB_44", { value: ids.length });
            this.layer.confirm(showText, {
                icon: 0,
                title: titleStr,
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids);
            });
        };
        FaceLibLibController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.businessLibService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.$timeout(function () {
                        _this.findListParams.currentPage = 1;
                        _this.getListByParams(_this.findListParams);
                    }, 500);
                }
            });
        };
        ;
        FaceLibLibController.prototype.afterAdd = function (modelData) {
            var _this = this;
            var showStr = this.i18nFactory('DP_CONFIG_FACELIB_45', { value: modelData.Name });
            var titleStr = this.i18nFactory('DP_CONFIG_COMMON_47');
            this.layer.confirm(showStr, {
                icon: 0,
                title: titleStr,
                area: ["200px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.goToAddPerson(modelData, modelData.ParentModel.Name, true);
            });
        };
        FaceLibLibController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibLibController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        FaceLibLibController.prototype.goToAddPerson = function (params, parentName, isOpenModal) {
            params.ParentModel = {
                Name: parentName
            };
            console.log(isOpenModal);
            console.log(params);
            this.businessLibPersonFactory.updateIsOpenModal(isOpenModal);
            this.businessLibPersonFactory.setCurrentFaceLib(params);
            this.$state.go("baseconfig.facelib.person");
        };
        FaceLibLibController.$inject = ['$scope', '$location', '$state', '$timeout', 'layer', 'layerDec', 'i18nFactory',
            'faceLibUpdateModalFactory',
            'areaService',
            'businessLibService',
            'casCadeService',
            'businessLibPersonService',
            'businessLibPersonFactory'];
        return FaceLibLibController;
    }());
    main_app_1.app.controller('bcFaceLibLibController', FaceLibLibController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL2xpYnJhcnkvZmFjZWxpYi5saWJyYXJ5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0NBO1FBK0JJLDhCQUFvQixNQUFXLEVBQVUsU0FBYyxFQUFVLE1BQVcsRUFBVSxRQUFhLEVBQVUsS0FBVSxFQUMzRyxRQUFtQixFQUNuQixXQUFnQixFQUNoQix5QkFBcUQsRUFDckQsV0FBeUIsRUFDekIsa0JBQXVDLEVBQ3ZDLGNBQStCLEVBQy9CLHdCQUFtRCxFQUNuRCx3QkFBbUQ7WUFSM0MsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGNBQVMsR0FBVCxTQUFTLENBQUs7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUFVLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDM0csYUFBUSxHQUFSLFFBQVEsQ0FBVztZQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUNoQiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTRCO1lBQ3JELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1lBQy9CLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMkI7WUFDbkQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEyQjtZQXBCL0QseUJBQW9CLEdBQVcsc0JBQXNCLENBQUM7WUFzQmxELElBQUksQ0FBQyxZQUFZLEdBQUcsNEJBQVksQ0FBQyxTQUFTLENBQUM7WUFDM0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLDJFQUEyRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUgsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWxCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztZQUNyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQW9C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QUFDO1FBQ2hELENBQUM7UUFuYk0sNEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWE7WUFDN0YsMkJBQTJCO1lBQzNCLGFBQWE7WUFDYixvQkFBb0I7WUFDcEIsZ0JBQWdCO1lBQ2hCLDBCQUEwQjtZQUMxQiwwQkFBMEIsQ0FBQyxDQUFDO1FBK2FwQywyQkFBQztLQTVjRCxBQTRjQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvbGlicmFyeS9mYWNlbGliLmxpYnJhcnkuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi4vLi4vLi4vY29tbW9uL2ZhY2VMaWJVcGRhdGVNb2RhbC9mYWNlTGliVXBkYXRlTW9kYWwuaHRtbFwiIG5hbWU9XCJodG1sU3RyXCIgLz5cclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiYW5ndWxhclwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWIuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWJQZXJzb24uc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vZmFjZUxpYlVwZGF0ZU1vZGFsL2ZhY2VMaWJVcGRhdGVNb2RhbC5mYWN0b3J5XCI7XHJcbmltcG9ydCBcIi4uL2J1c2luZXNzTGliUGVyc29uLmZhY3RvcnlcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeVwiO1xyXG5pbXBvcnQgJy4uLy4uLy4uL2NvbW1vbi9maWx0ZXIvYXBwLmZpbHRlcidcclxuaW1wb3J0IFwiV2RhdGVQaWNrZXJcIjtcclxuXHJcbmltcG9ydCB7IEFyZWFFeCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHsgSUFyZWFTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQnVzaW5lc3NMaWJMaXN0UGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL0J1c2luZXNzTGliUGFyYW1zXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgSUJ1c2luZXNzTGliU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYnVzaW5lc3NMaWIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCdXNpbmVzc0xpYiB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9CdXNpbmVzc0xpYlwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYXNlY2FkZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJ1c2luZXNzTGliRXggfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQnVzaW5lc3NMaWJFeFwiO1xyXG5pbXBvcnQgeyBJQnVzaW5lc3NMaWJQZXJzb25TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYlBlcnNvbi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJRmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeSxcclxuICAgIEZhY2VVcGRhdGVQYXJhbXNcclxufSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2ZhY2VMaWJVcGRhdGVNb2RhbC9mYWNlTGliVXBkYXRlTW9kYWwuZmFjdG9yeVwiO1xyXG5pbXBvcnQgUG9ydHJhaXRUb29sIGZyb20gXCIuLi8uLi8uLi9jb21tb24vcG9ydHJhaXQtdG9vbFwiO1xyXG5pbXBvcnQgeyBJQnVzaW5lc3NMaWJQZXJzb25GYWN0b3J5IH0gZnJvbSBcIi4uL2J1c2luZXNzTGliUGVyc29uLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgSUxheWVyRGVjIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnlcIjtcclxuaW1wb3J0IHsgU3lzdGVtQ29uZmlnIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zeXN0ZW0tY29uZmlnXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnksIGh0bWxTdHI6IGFueTtcclxuXHJcbmNsYXNzIEZhY2VMaWJMaWJDb250cm9sbGVyIHtcclxuICAgIGNvbnN0TGliSXRlbTogc3RyaW5nO1xyXG4gICAgZmluZExpc3RQYXJhbXM6IEJ1c2luZXNzTGliTGlzdFBhcmFtcztcclxuXHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG5cclxuICAgIC8vLS0tdGFibGVcclxuICAgIC8vIHRhYmxlIOWIl+ihqOaVsOaNrlxyXG5cclxuICAgIHRCb2R5TGlzdDogQXJyYXk8QnVzaW5lc3NMaWJFeD47XHJcbiAgICB0YWJsZU5vRGF0YTogYm9vbGVhbjtcclxuXHJcbiAgICAvL+WkmumAieebuOWFs1xyXG4gICAgc2VsZWN0ZWRMaXN0OiBBcnJheTxCdXNpbmVzc0xpYkV4PjtcclxuXHJcbiAgICB0YWJsZUN1cnJlbnRDb3VudDogbnVtYmVyO1xyXG4gICAgdXBkYXRlTGF5ZXJJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8v57yW6L6R56qX5Y+jIOW5v+aSreOAgeaOpeaUtuWQjeensFxyXG4gICAgd2F0Y2hVcGRhdGVNb2RhbE5hbWU6IHN0cmluZyA9IFwid2F0Y2hVcGRhdGVNb2RhbE5hbWVcIjtcclxuXHJcbiAgICAvL1xyXG4gICAgZmFjZUxpYkl0ZW1UZW1wbFVybDogc3RyaW5nO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICckbG9jYXRpb24nLCAnJHN0YXRlJywgJyR0aW1lb3V0JywgJ2xheWVyJywgJ2xheWVyRGVjJywgJ2kxOG5GYWN0b3J5JyxcclxuICAgICAgICAnZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeScsXHJcbiAgICAgICAgJ2FyZWFTZXJ2aWNlJyxcclxuICAgICAgICAnYnVzaW5lc3NMaWJTZXJ2aWNlJyxcclxuICAgICAgICAnY2FzQ2FkZVNlcnZpY2UnLFxyXG4gICAgICAgICdidXNpbmVzc0xpYlBlcnNvblNlcnZpY2UnLFxyXG4gICAgICAgICdidXNpbmVzc0xpYlBlcnNvbkZhY3RvcnknXTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCBwcml2YXRlICRsb2NhdGlvbjogYW55LCBwcml2YXRlICRzdGF0ZTogYW55LCBwcml2YXRlICR0aW1lb3V0OiBhbnksIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBJTGF5ZXJEZWMsXHJcbiAgICAgICAgcHJpdmF0ZSBpMThuRmFjdG9yeTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgZmFjZUxpYlVwZGF0ZU1vZGFsRmFjdG9yeTogSUZhY2VMaWJVcGRhdGVNb2RhbEZhY3RvcnksXHJcbiAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYnVzaW5lc3NMaWJTZXJ2aWNlOiBJQnVzaW5lc3NMaWJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliUGVyc29uU2VydmljZTogSUJ1c2luZXNzTGliUGVyc29uU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzTGliUGVyc29uRmFjdG9yeTogSUJ1c2luZXNzTGliUGVyc29uRmFjdG9yeSxcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuY29uc3RMaWJJdGVtID0gU3lzdGVtQ29uZmlnLkNPTlNUX0xJQjtcclxuICAgICAgICB0aGlzLmZhY2VMaWJJdGVtVGVtcGxVcmwgPSBcIi4uLy4uL21vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvbGlicmFyeS9mYWNlbGliLmxpYi1pdGVtLXRlbXBsYXRlLmh0bWw/dj1cIiArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFBhcmFtcygpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuICAgICAgICBpZiAoJHNjb3BlLmFyZWFUcmVlU2VsZWN0ZWREYXRhKSB7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSAkc2NvcGUuYXJlYVRyZWVTZWxlY3RlZERhdGEuSUQ7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMoc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCJwYXJlbnRBcmVhU2VsZWN0Q2hhbmdlXCIsIGZ1bmN0aW9uIChldmVuOiBhbnksIGRhdGE6IEFyZWFFeCkge1xyXG4gICAgICAgICAgICBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gZGF0YS5JRDtcclxuICAgICAgICAgICAgc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IEJ1c2luZXNzTGliTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc3RhcnRUaW1lID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmVuZFRpbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMua2V5d29yZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9IFwiSURcIjtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy50Qm9keUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IFtdIGFzIEFycmF5PEJ1c2luZXNzTGliRXg+O1xyXG4gICAgICAgIHRoaXMudGFibGVDdXJyZW50Q291bnQgPSAwO1xyXG4gICAgfVxyXG4gICAgLy8g55u05o6l6K6/6Zeu57yT5a2YIOWPguaVsOagvOW8j+WMllxyXG4gICAgX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IEJ1c2luZXNzTGliTGlzdFBhcmFtcykge1xyXG4gICAgICAgIGlmICghdGFibGVQYXJhbXMpIHJldHVybiB7fSBhcyBDYXNDYWRlU2VhcmNoUGFyYW1zO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgcmVzdWx0LmlzQXNjID0gdGFibGVQYXJhbXMuaXNBc2M7XHJcbiAgICAgICAgcmVzdWx0Lm5hbWUgPSB0YWJsZVBhcmFtcy5rZXl3b3JkO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczogQnVzaW5lc3NMaWJMaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgbGV0IF9wYXJhbXMgPSB0aGlzLl9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHBhcmFtcyk7XHJcbiAgICAgICAgdGhpcy5jYXNDYWRlU2VydmljZS5maW5kQWxsQnVzaW5lc3NMaWJMaXN0KF9wYXJhbXMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PEFycmF5PEJ1c2luZXNzTGliRXg+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcCAmJiByZXNwLmNvZGUgPT0gMjAwICYmIHJlc3AuZGF0YSAmJiByZXNwLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUJvZHkocmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0TGlzdEJ5UGFyYW1zXCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJz09PT09PT09PT09PT09PT09PT09PT09PT1mYWNlbGliLmxpYnJhcnkuY29udHJvbGxlcicpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQZXJzb25Db3VudChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUJvZHkoW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5YiX6KGo6L+95Yqg5omT6ZKpIOaOp+WItuWPguaVsFxyXG4gICAgc2V0VGFibGVCb2R5KGRhdGFMaXN0OiBBcnJheTxCdXNpbmVzc0xpYkV4Pikge1xyXG4gICAgICAgIGRhdGFMaXN0ID0gdGhpcy5maWx0ZXJCeVRpbWVSYW5nZShkYXRhTGlzdCk7XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGRhdGFMaXN0LCAoZGF0YUl0ZW06IEJ1c2luZXNzTGliRXgpID0+IHtcclxuICAgICAgICAgICAgZGF0YUl0ZW0uaXNTaG93Q2hpbGQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZGF0YUl0ZW0uaXNDaGVja0JveCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9ICh0aGlzLnRCb2R5TGlzdC5sZW5ndGggPT09IDApO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gUG9ydHJhaXRUb29sLmNvbnZlcnQyWnRyZWUoZGF0YUxpc3QsIFwiSURcIiwgXCJQYXJlbnRJRFwiLCBcImNoaWxkcmVuXCIpO1xyXG4gICAgICAgIHRoaXMudGFibGVDdXJyZW50Q291bnQgPSB0aGlzLmdldFRhYmxlQ291bnQodGhpcy50Qm9keUxpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gW10gYXMgQXJyYXk8QnVzaW5lc3NMaWJFeD47XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vIOiOt+WPluS6uuWDj+W6k+S6uuWRmOaVsOebrlxyXG4gICAgZ2V0UGVyc29uQ291bnQobGliczogQXJyYXk8QnVzaW5lc3NMaWJFeD4pIHtcclxuICAgICAgICBsZXQgaWRzID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2gobGlicywgKHZhbDogQnVzaW5lc3NMaWJFeCkgPT4ge1xyXG4gICAgICAgICAgICBpZHMucHVzaCh2YWwuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJTZXJ2aWNlLmZpbmRQZXJzb25Db3VudChpZHMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PGFueT4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PT0gMjAwICYmIHJlc3AuZGF0YSAmJiByZXNwLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGVNYXA6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCByZXNwSXRlbTogYW55ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVzcC5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcEl0ZW0gPSByZXNwLmRhdGFbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BJdGVtLkxpYklEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRlTWFwW3Jlc3BJdGVtLkxpYklEXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSa5p2h5ZCMIGxpYklEIOeahOW6k+aVsOmHj+i/m+ihjOWPoOWKoCDjgIJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVNYXBbcmVzcEl0ZW0uTGliSURdLlRvdGFsQ291bnQgKz0gcmVzcEl0ZW0uVG90YWxDb3VudDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVNYXBbcmVzcEl0ZW0uTGliSURdID0gcmVzcEl0ZW07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgbGlicy5sZW5ndGg7IGlpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0ZU1hcFtsaWJzW2lpXS5JRF0gJiYgZGF0ZU1hcFtsaWJzW2lpXS5JRF0uVG90YWxDb3VudCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlic1tpaV0uUGVyc29uQ291bnQgPSBkYXRlTWFwW2xpYnNbaWldLklEXS5Ub3RhbENvdW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRUYWJsZUJvZHkobGlicyk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbiAgICAvLyDmoLnmja7ml7bpl7TmnaHku7bov4fmu6RcclxuICAgIGZpbHRlckJ5VGltZVJhbmdlKGRhdGFMaXN0OiBBcnJheTxCdXNpbmVzc0xpYkV4Pik6IEFycmF5PEJ1c2luZXNzTGliRXg+IHtcclxuICAgICAgICBpZiAoISF0aGlzLmZpbmRMaXN0UGFyYW1zLnN0YXJ0VGltZSB8fCAhIXRoaXMuZmluZExpc3RQYXJhbXMuZW5kVGltZSkge1xyXG4gICAgICAgICAgICBpZiAoISF0aGlzLmZpbmRMaXN0UGFyYW1zLnN0YXJ0VGltZSAmJiAhIXRoaXMuZmluZExpc3RQYXJhbXMuZW5kVGltZSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YUxpc3QgPSBkYXRhTGlzdC5maWx0ZXIoKHZhbDogQnVzaW5lc3NMaWJFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAodmFsLkNyZWF0ZVRpbWUgPj0gdGhpcy5maW5kTGlzdFBhcmFtcy5zdGFydFRpbWUpICYmIHZhbC5DcmVhdGVUaW1lIDw9IHRoaXMuZmluZExpc3RQYXJhbXMuZW5kVGltZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEhdGhpcy5maW5kTGlzdFBhcmFtcy5zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFMaXN0ID0gZGF0YUxpc3QuZmlsdGVyKCh2YWw6IEJ1c2luZXNzTGliRXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHZhbC5DcmVhdGVUaW1lID49IHRoaXMuZmluZExpc3RQYXJhbXMuc3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCEhdGhpcy5maW5kTGlzdFBhcmFtcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhTGlzdCA9IGRhdGFMaXN0LmZpbHRlcigodmFsOiBCdXNpbmVzc0xpYkV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5DcmVhdGVUaW1lIDw9IHRoaXMuZmluZExpc3RQYXJhbXMuZW5kVGltZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRhTGlzdDtcclxuICAgIH07XHJcbiAgICAvL+aQnOe0ouOAguOAguOAglxyXG4gICAgc2VhcmNoTGliTGlzdEJ5UGFyYW1zKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZpbmRMaXN0UGFyYW1zLnN0YXJ0VGltZSAmJiB0aGlzLmZpbmRMaXN0UGFyYW1zLmVuZFRpbWUgJiYgdGhpcy5maW5kTGlzdFBhcmFtcy5zdGFydFRpbWUgPj0gdGhpcy5maW5kTGlzdFBhcmFtcy5lbmRUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8odGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl84NScpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH07XHJcbiAgICB0YWJsZVNlYXJjaElucHV0S2V5VXAoZTogYW55KSB7XHJcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWFyY2hMaWJMaXN0QnlQYXJhbXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy/mlrDlop5cclxuICAgIGFkZEJ5UGFyZW50SWQocGFyZW50SWQ6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghcGFyZW50SWQpIHtcclxuICAgICAgICAgICAgcGFyZW50SWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcGVuVXBkYXRlTW9kZWwoZmFsc2UsIG51bGwsIHBhcmVudElkLFwiXCIpO1xyXG4gICAgfVxyXG4gICAgLy/kv67mlLlcclxuICAgIHVwZGF0ZUZhY2VMaWIoZGF0YTogQnVzaW5lc3NMaWIsIHBhcmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBwYXJlbnRJZCA9IGRhdGEuQXJlYUlEIHx8IGRhdGEuUGFyZW50SUQ7XHJcbiAgICAgICAgdGhpcy5idXNpbmVzc0xpYlNlcnZpY2UuZmluZEJ5SWQoZGF0YS5JRCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8QnVzaW5lc3NMaWJFeD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AgJiYgcmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblVwZGF0ZU1vZGVsKHRydWUsIHJlc3AuZGF0YSwgcGFyZW50SWQscGFyZW50TmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8v5omT5byAIOaWsOWinuOAgeS/ruaUueeql+WPo1xyXG4gICAgb3BlblVwZGF0ZU1vZGVsKGlzVXBkYXRlOiBib29sZWFuLCBkYXRhOiBCdXNpbmVzc0xpYkV4LCBwYXJlbnRJZDogc3RyaW5nLHBhcmVudE5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBzY29wZTogYW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCB1cGRhdGVQYXJhbXMgPSBuZXcgRmFjZVVwZGF0ZVBhcmFtcygpO1xyXG4gICAgICAgIHVwZGF0ZVBhcmFtcy5pc1VwZGF0ZSA9IGlzVXBkYXRlO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbXMudXBkYXRlTW9kYWxEYXRhID0gZGF0YTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYW1zLnBhcmVudElEID0gcGFyZW50SWQ7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFtcy5wYXJlbnROYW1lID0gcGFyZW50TmFtZTtcclxuXHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gaXNVcGRhdGUgPyB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfRkFDRUxJQl8zNycpIDogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0ZBQ0VMSUJfNDInKTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5LnNldFVwZGF0ZVBhcmFtcyh1cGRhdGVQYXJhbXMpO1xyXG4gICAgICAgIC8vIGxldCBodG1sU3RyID0gdGhpcy5mYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5LmdldE1vZGFsSHRtbCgpO1xyXG5cclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVTdHIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGh0bWxTdHIsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiNDUwcHhcIiwgXCJhdXRvXCJdLFxyXG4gICAgICAgICAgICBza2luOiBcIm92ZXJmbG93LXZpc2libGVcIixcclxuICAgICAgICAgICAgZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLndhdGNoVXBkYXRlTW9kYWxOYW1lID0gdGhpcy5mYWNlTGliVXBkYXRlTW9kYWxGYWN0b3J5LmdldE1vZGFsQ2xvc2VkV2F0Y2hOYW1lKCk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkNsb3NlTGF5ZXJXYXRjaCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFVwZGF0ZUxheWVySW5kZXgoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIC8v6K6w5b2V5b2T5YmN57yW6L6R56qX5Y+j5LiL5qCHXHJcbiAgICBzZXRVcGRhdGVMYXllckluZGV4KGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxheWVySW5kZXggPSBpbmRleDtcclxuICAgIH1cclxuICAgIC8vIOWFs+mXreW9k+WJjeaJk+W8gOeahOe8lui+keeql+WPo1xyXG4gICAgY2xvc2VVcGRhdGVNb2RlbCgpIHtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMudXBkYXRlTGF5ZXJJbmRleCk7XHJcbiAgICB9XHJcbiAgICAvLyDmt7vliqAg5L+u5pS5TW9kZWwg5YWz6Zet55uR5ZCsXHJcbiAgICBvcGVuQ2xvc2VMYXllcldhdGNoKCkge1xyXG4gICAgICAgIGlmICghdGhpcy51cGRhdGVMYXllckluZGV4KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kb24odGhpcy53YXRjaFVwZGF0ZU1vZGFsTmFtZSwgKGV2ZW46IGFueSwgZGF0YTogeyBpc0NvbW1pdDogYm9vbGVhbiwgaXNBZGQ6IGJvb2xlYW4sIG1vZGVsRGF0YTogQnVzaW5lc3NMaWJFeCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc0NvbW1pdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMoc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5pc0FkZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmX3RoaXMuYWZ0ZXJBZGQoZGF0YS5tb2RlbERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPluW9k+WJjeW3suiiq+mAieS4reWIl+ihqFxyXG4gICAgcHJpdmF0ZSBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8QnVzaW5lc3NMaWJFeD4ge1xyXG4gICAgICAgIGlmICh0aGlzLnRCb2R5TGlzdCAmJiB0aGlzLnRCb2R5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTZWxlY3RlZExpc3QodGhpcy50Qm9keUxpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFtdIGFzIEFycmF5PEJ1c2luZXNzTGliRXg+O1xyXG4gICAgfTtcclxuICAgIC8vIOmAkuW9kuagkeiOt+WPlue7k+aenFxyXG4gICAgcHJpdmF0ZSBfZ2V0U2VsZWN0ZWRMaXN0KHNyY0xpc3Q6IEFycmF5PEJ1c2luZXNzTGliRXg+KTogQXJyYXk8QnVzaW5lc3NMaWJFeD4ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXSBhcyBBcnJheTxCdXNpbmVzc0xpYkV4PjtcclxuICAgICAgICBsZXQgdE5vZGU6IEJ1c2luZXNzTGliRXgsXHJcbiAgICAgICAgICAgIHRJbmRleDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgdExlbiA9IHNyY0xpc3QubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoOyB0SW5kZXggPCB0TGVuOyB0SW5kZXgrKykge1xyXG4gICAgICAgICAgICB0Tm9kZSA9IHNyY0xpc3RbdEluZGV4XTtcclxuICAgICAgICAgICAgaWYgKHROb2RlLmlzQ2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHROb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodE5vZGUuY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQodGhpcy5fZ2V0U2VsZWN0ZWRMaXN0KHROb2RlLmNoaWxkcmVuKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIC8vIOiOt+WPliDmoJEg5pWw5o2u5oC75p2h5pWwXHJcbiAgICBwcml2YXRlIGdldFRhYmxlQ291bnQoc3JjTGlzdDogQXJyYXk8QnVzaW5lc3NMaWJFeD4pOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgaWYgKCFzcmNMaXN0IHx8IHNyY0xpc3QubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9jb3VudCA9IHNyY0xpc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICBsZXQgdE5vZGU6IEJ1c2luZXNzTGliRXgsXHJcbiAgICAgICAgICAgIHRJbmRleDogbnVtYmVyID0gMCxcclxuICAgICAgICAgICAgdExlbiA9IHNyY0xpc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICBmb3IgKDsgdEluZGV4IDwgdExlbjsgdEluZGV4KyspIHtcclxuICAgICAgICAgICAgdE5vZGUgPSBzcmNMaXN0W3RJbmRleF07XHJcbiAgICAgICAgICAgIGlmICh0Tm9kZS5jaGlsZHJlbiAmJiB0Tm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBfY291bnQgKz0gdGhpcy5nZXRUYWJsZUNvdW50KHROb2RlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2NvdW50O1xyXG4gICAgfVxyXG4gICAgLy/mlLnlj5jlrZDliJfooajliqDovb3mmL7npLpcclxuICAgIGNoYW5nZUNoaWxkU2hvdyhiSXRlbTogQnVzaW5lc3NMaWJFeCkge1xyXG4gICAgICAgIGJJdGVtLmlzU2hvd0NoaWxkID0gIWJJdGVtLmlzU2hvd0NoaWxkO1xyXG4gICAgfTtcclxuICAgIC8v54K55Ye75omT6ZKpXHJcbiAgICBjbGlja0NoZWNrYm94KGJJdGVtOiBCdXNpbmVzc0xpYkV4KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRCb2R5TGlzdCB8fCB0aGlzLnRCb2R5TGlzdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChiSXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgZmxhZyA9ICFiSXRlbS5pc0NoZWNrQm94O1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZUNoZWNrYm94U3RhdHVzKHRoaXMudEJvZHlMaXN0LCBmbGFnLCBiSXRlbS5JRCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZExpc3QubGVuZ3RoID09PSB0aGlzLnRhYmxlQ3VycmVudENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBmbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VDaGVja2JveFN0YXR1cyh0aGlzLnRCb2R5TGlzdCwgZmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gdGhpcy5nZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvLyDmiZPpkqnmlLnlj5jvvIzniLblhbPogZTlrZDvvIzlrZDkuI3lhbPogZTniLZcclxuICAgIGNoYW5nZUNoZWNrYm94U3RhdHVzKHNyY0xpc3Q6IEFycmF5PEJ1c2luZXNzTGliRXg+LCBzdGF0dXM6IGJvb2xlYW4sIGNoYW5nZU5vZGVJZD86IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB0Tm9kZTogQnVzaW5lc3NMaWJFeCxcclxuICAgICAgICAgICAgdEluZGV4OiBudW1iZXIgPSAwLFxyXG4gICAgICAgICAgICB0TGVuID0gc3JjTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yICg7IHRJbmRleCA8IHRMZW47IHRJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHROb2RlID0gc3JjTGlzdFt0SW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlTm9kZUlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodE5vZGUuSUQgPT0gY2hhbmdlTm9kZUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdE5vZGUuaXNDaGVja0JveCA9IHN0YXR1cztcclxuICAgICAgICAgICAgICAgICAgICBpZiAodE5vZGUuY2hpbGRyZW4gJiYgdE5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUNoZWNrYm94U3RhdHVzKHROb2RlLmNoaWxkcmVuLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHROb2RlLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmbGFnID0gdGhpcy5jaGFuZ2VDaGVja2JveFN0YXR1cyh0Tm9kZS5jaGlsZHJlbiwgc3RhdHVzLCBjaGFuZ2VOb2RlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0Tm9kZS5pc0NoZWNrQm94ID0gc3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHROb2RlLmNoaWxkcmVuICYmIHROb2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZUNoZWNrYm94U3RhdHVzKHROb2RlLmNoaWxkcmVuLCBzdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIOWNleagj+mAieaLqeaOkuW6j1xyXG4gICAgc29ydEJ5RmllbGQoX2luZGV4OiBudW1iZXIsIGZpZWxkOiBzdHJpbmcsIHNvcnRTdGF0dXM6IGJvb2xlYW4pIHtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9IGZpZWxkO1xyXG5cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuICAgIC8v5Y2V5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkKF9pbmRleDogQnVzaW5lc3NMaWIpIHtcclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSB0aGlzLmkxOG5GYWN0b3J5KFwiRFBfQ09ORklHX0NPTU1PTl80N1wiKTtcclxuICAgICAgICBsZXQgY29udGVudFN0ciA9IHRoaXMuaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzQzXCIsIHsgdmFsdWU6IF9pbmRleC5OYW1lIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0oY29udGVudFN0ciwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVTdHIsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl0sXHJcbiAgICAgICAgfSwgKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlQnlJZHMoW19pbmRleC5JRF0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvL+WkmuS4quWIoOmZpFxyXG4gICAgZGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkTGlzdCA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZExpc3QgfHwgc2VsZWN0ZWRMaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpZHMgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBoYXNDb25zdExpYjogc3RyaW5nO1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzZWxlY3RlZExpc3QsICh2YWw6IEJ1c2luZXNzTGliKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbnN0TGliSXRlbSA9PT0gdmFsLklEKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNDb25zdExpYiA9IHZhbC5OYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWRzLnB1c2godmFsLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChoYXNDb25zdExpYikge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKHRoaXMuaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfRkFDRUxJQl80M1wiLCB7IHZhbHVlOiBoYXNDb25zdExpYiB9KSk7XHJcbiAgICAgICAgICAgIGlmIChpZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19DT01NT05fNDdcIik7XHJcbiAgICAgICAgbGV0IHNob3dUZXh0ID0gdGhpcy5pMThuRmFjdG9yeShcIkRQX0NPTkZJR19GQUNFTElCXzQ0XCIsIHsgdmFsdWU6IGlkcy5sZW5ndGggfSk7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/noa7orqTlpJrkuKrliKDpmaRcclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJTZXJ2aWNlLmRlbGV0ZUJ5SWRzKGlkcykudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5re75Yqg5oiQ5Yqf5ZCOXHJcbiAgICBhZnRlckFkZChtb2RlbERhdGE6IEJ1c2luZXNzTGliRXgpIHtcclxuICAgICAgICBsZXQgc2hvd1N0ciA9IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19GQUNFTElCXzQ1JywgeyB2YWx1ZTogbW9kZWxEYXRhLk5hbWUgfSk7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80NycpO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShzaG93U3RyLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgYXJlYTogW1wiMjAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmdvVG9BZGRQZXJzb24obW9kZWxEYXRhLCBtb2RlbERhdGEuUGFyZW50TW9kZWwuTmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WJjeW+gOW6k+S6uuWRmOWIl+ihqOeuoeeQhlxyXG4gICAgZ29Ub0FkZFBlcnNvbihwYXJhbXM6IEJ1c2luZXNzTGliRXgsIHBhcmVudE5hbWU6IHN0cmluZywgaXNPcGVuTW9kYWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBwYXJhbXMuUGFyZW50TW9kZWwgPSB7XHJcbiAgICAgICAgICAgIE5hbWU6IHBhcmVudE5hbWVcclxuICAgICAgICB9IGFzIEJ1c2luZXNzTGliO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhpc09wZW5Nb2RhbCk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuXHJcbiAgICAgICAgdGhpcy5idXNpbmVzc0xpYlBlcnNvbkZhY3RvcnkudXBkYXRlSXNPcGVuTW9kYWwoaXNPcGVuTW9kYWwpO1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJQZXJzb25GYWN0b3J5LnNldEN1cnJlbnRGYWNlTGliKHBhcmFtcyk7XHJcblxyXG4gICAgICAgIHRoaXMuJHN0YXRlLmdvKFwiYmFzZWNvbmZpZy5mYWNlbGliLnBlcnNvblwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdiY0ZhY2VMaWJMaWJDb250cm9sbGVyJywgRmFjZUxpYkxpYkNvbnRyb2xsZXIpOyJdfQ==
