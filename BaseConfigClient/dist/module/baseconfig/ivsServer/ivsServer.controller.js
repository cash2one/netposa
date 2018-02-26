define(["require", "exports", "text!./ivsServer.updateModal.html", "../../common/types/serverUpdateModal.params", "../../common/directive/page/page-params", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/params/IvsServerParams", "../../common/services/casecade.service", "../../../core/enum/IvsServerType", "css!../css/baseconfig-serve.css", "css!../style/baseconfig-area.css", "angular", "../../common/services/ivsServer.service", "../../common/services/area.service", "./ivsServer.updateModal.controller", "./../../common/factory/layerMsg.factory"], function (require, exports, ivsServerUpdateModalHtml, serverUpdateModal_params_1, page_params_1, main_app_1, tree_params_1, IvsServerParams_1, casecade_service_1, IvsServerType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigIvsServerController = (function () {
        function BaseConfigIvsServerController($scope, $filter, $timeout, $controller, ivsServerService, layer, areaService, casCadeService, i18nFactory, layerDec) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.ivsServerService = ivsServerService;
            this.layer = layer;
            this.areaService = areaService;
            this.casCadeService = casCadeService;
            this.i18nFactory = i18nFactory;
            this.layerDec = layerDec;
            this.areaTreeSearchInputStr = "";
            this.ivsServerTypeObj = {};
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeIvs';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            this.initListParams();
            function treeSelectNode(event, treeId, treeNode) {
                if (treeNode.ID == self_this.findListParams.areaId) {
                    if (self_this.tBodyList) {
                        return;
                    }
                }
                var req_params = self_this.findListParams;
                req_params.areaId = treeNode.ID;
                req_params.currentPage = 1;
                self_this.getListByParams(req_params);
            }
            function treeInitComplete() {
            }
            this.getAreaTreeList();
            var self_this = this;
            this.$scope.$on('closeServerUpdateModel', function (even, data) {
                self_this.closeLayer(self_this.getCurrentLayer());
                if (data.isCommit) {
                    $timeout(function () {
                        self_this.getListByParams(self_this.findListParams);
                    }, 1000);
                }
            });
            $scope.$on("$destroy", function () {
                if (self_this.layer) {
                    self_this.layer.closeAll();
                }
            });
        }
        ;
        BaseConfigIvsServerController.prototype.getAreaTreeList = function (keyword) {
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
        BaseConfigIvsServerController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        BaseConfigIvsServerController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        BaseConfigIvsServerController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        BaseConfigIvsServerController.prototype.initListParams = function () {
            this.pageParams = new page_params_1.default();
            this.findListParams = new IvsServerParams_1.IvsServerListParams();
            this.findListParams.areaId = '';
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.tBodyList = [];
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_COMMON_03" },
                { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03" },
                { field: "Port", title: "DP_CONFIG_COMMON_11" },
                { field: "ServerType", title: "DP_CONFIG_PROXYSERVER_04" },
                { field: "Description", title: "DP_CONFIG_COMMON_34" },
                { field: "buttons", title: "DP_CONFIG_COMMON_15" }
            ];
            this.findListParams.sortName = 'ServerType';
            this.isSelectItems = false;
            for (var key in IvsServerType_1.IvsServerType) {
                this.ivsServerTypeObj[IvsServerType_1.IvsServerType[key].value] = IvsServerType_1.IvsServerType[key].text;
            }
        };
        ;
        BaseConfigIvsServerController.prototype._getCasCadeSearchParams = function (tableParams) {
            if (!tableParams)
                return {};
            var result = new casecade_service_1.CasCadeSearchParams();
            result.pageIndex = tableParams.currentPage;
            result.orderField = tableParams.sortName;
            result.pageSize = tableParams.pageSize;
            result.areaId = tableParams.areaId;
            result.isAsc = tableParams.isAsc;
            return result;
        };
        ;
        BaseConfigIvsServerController.prototype.getListByParams = function (params) {
            var _this = this;
            this.casCadeService.findIvsServerList(this._getCasCadeSearchParams(params))
                .then(function (resp) {
                if (resp.code == 200) {
                    var pageParams = new page_params_1.default();
                    pageParams.setCurrentPage(params.currentPage);
                    pageParams.setPageSize(params.pageSize);
                    pageParams.setTotalCount(resp.count);
                    _this.pageParams = pageParams;
                    _this.findListParams = params;
                    _this.setTBodyList(resp.data);
                }
            });
        };
        BaseConfigIvsServerController.prototype.deleteById = function (_index) {
            var _this = this;
            this.layer.confirm(this.i18nFactory('DP_CONFIG_IVSSERVER_03'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.validDelete(_index.ID, index);
            });
        };
        BaseConfigIvsServerController.prototype.validDelete = function (ids, layerNum) {
            var _this = this;
            var isSingle, aId, ids2;
            if (Array.isArray(ids)) {
                isSingle = false;
                ids2 = ids;
            }
            else {
                isSingle = true;
                aId = ids;
            }
            return this.ivsServerService.validDelete(isSingle ? [aId] : ids2).then(function (res) {
                _this.layer.close(layerNum);
                if (res.code === 200 && res.data) {
                    if (res.data.hasTaskRun == true) {
                        _this.layerDec.failInfo('不能删除有任务的服务器！');
                    }
                    else {
                        isSingle ? _this.submitDelete(aId, layerNum) : _this.submitDeleteByIds(ids2);
                    }
                }
            });
        };
        BaseConfigIvsServerController.prototype.submitDelete = function (id, layerNum) {
            var _this = this;
            this.ivsServerService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                    _this.layer.close(layerNum);
                }
            });
        };
        BaseConfigIvsServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        BaseConfigIvsServerController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (ivsServer, index) {
                    if (_this.selectedList[index]) {
                        selectedDataList.push(ivsServer);
                    }
                });
            }
            return selectedDataList;
        };
        ;
        BaseConfigIvsServerController.prototype.deleteByIds = function () {
            var _this = this;
            var selectedDataList = this.getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                console.error("============", "当前未选择数据");
                return;
            }
            var ids = [];
            selectedDataList.forEach(function (server) {
                ids.push(server.ID);
            });
            var showText = '确定删除当前选中的 ' + ids.length + ' 条视频结构化服务器配置吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.validDelete(ids, index);
            });
        };
        BaseConfigIvsServerController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.ivsServerService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.findListParams.currentPage = 1;
                    _this.getListByParams(_this.findListParams);
                }
            });
        };
        ;
        BaseConfigIvsServerController.prototype.addIvsServer = function () {
            var _this = this;
            var scope = this.$scope.$new();
            var updateModalParams = new serverUpdateModal_params_1.UpdateModalParams();
            updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
            updateModalParams.isUpdate = false;
            scope.updateModalParams = updateModalParams;
            var titleStr = '新建服务器';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: ivsServerUpdateModalHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        BaseConfigIvsServerController.prototype.findById = function (id) {
            return this.ivsServerService.findById(id);
        };
        BaseConfigIvsServerController.prototype.updateIvsServer = function (model) {
            var _this = this;
            console.log(model);
            this.findById(model.ID).then(function (resp) {
                if (resp.code == 200) {
                    _this.openUpdate(true, resp.data);
                }
                else {
                }
            });
        };
        ;
        BaseConfigIvsServerController.prototype.openUpdate = function (isUpdate, data) {
            var _this = this;
            var scope = this.$scope.$new();
            var updateModalParams = new serverUpdateModal_params_1.UpdateModalParams();
            updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
            updateModalParams.isUpdate = true;
            updateModalParams.updateModel = data;
            scope.updateModalParams = updateModalParams;
            var titleStr = isUpdate ? '编辑服务器' : '新建服务器';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: ivsServerUpdateModalHtml,
                scope: scope,
                area: ["500px"],
                end: function () {
                    scope.$destroy();
                }
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        ;
        BaseConfigIvsServerController.prototype.closeLayer = function (index) {
            return this.layer.close(index);
        };
        BaseConfigIvsServerController.prototype.setCurrentLayer = function (index) {
            this.currentLayer = index;
        };
        BaseConfigIvsServerController.prototype.getCurrentLayer = function () {
            return this.currentLayer;
        };
        BaseConfigIvsServerController.prototype.setTBodyList = function (result) {
            this.tBodyList = result;
        };
        ;
        BaseConfigIvsServerController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        BaseConfigIvsServerController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigIvsServerController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigIvsServerController.prototype.setIsSelectItems = function (items) {
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
        BaseConfigIvsServerController.$inject = ['$scope', '$filter', '$timeout', '$controller', 'ivsServerService', 'layer', 'areaService', 'casCadeService', 'i18nFactory', 'layerDec'];
        return BaseConfigIvsServerController;
    }());
    main_app_1.app
        .controller('baseConfigIvsServerController', BaseConfigIvsServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9pdnNTZXJ2ZXIvaXZzU2VydmVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBa0NBO1FBc0JJLHVDQUFvQixNQUFXLEVBQVUsT0FBWSxFQUFVLFFBQWtCLEVBQVUsV0FBZ0IsRUFDL0YsZ0JBQW1DLEVBQVUsS0FBVSxFQUN2RCxXQUF5QixFQUFVLGNBQStCLEVBQVUsV0FBZ0IsRUFBVSxRQUFtQjtZQUZqSCxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUFVLGFBQVEsR0FBUixRQUFRLENBQVU7WUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBSztZQUMvRixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW1CO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUN2RCxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtZQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVztZQWRySSwyQkFBc0IsR0FBVyxFQUFFLENBQUM7WUFTcEMscUJBQWdCLEdBQThCLEVBQStCLENBQUM7WUFTMUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLHdCQUF3QixLQUFpQixFQUFFLE1BQWMsRUFBRSxRQUFnQjtnQkFFdkUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUs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QztZQUNMLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDO1FBNVZNLHFDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7UUE2Vi9KLG9DQUFDO0tBbFhELEFBa1hDLElBQUE7SUFDRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLCtCQUErQixFQUFFLDZCQUE2QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvaXZzU2VydmVyL2l2c1NlcnZlci5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2l2c1NlcnZlci51cGRhdGVNb2RhbC5odG1sXCIgbmFtZT1cIml2c1NlcnZlclVwZGF0ZU1vZGFsSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1zZXJ2ZS5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IHsgVXBkYXRlTW9kYWxQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3R5cGVzL3NlcnZlclVwZGF0ZU1vZGFsLnBhcmFtc1wiO1xyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuXHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2l2c1NlcnZlci5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAnLi9pdnNTZXJ2ZXIudXBkYXRlTW9kYWwuY29udHJvbGxlcic7XHJcbi8vaW1wb3J0IFwiLi4vbWFpbi9zZXJ2ZXJUeXBlLmZpbHRlclwiXHJcblxyXG5pbXBvcnQgeyBJQXJlYVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJVGFibGVIZWFkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5pbXBvcnQgeyBJSXZzU2VydmVyU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvaXZzU2VydmVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSVRyZWVEYXRhUGFyYW1zLCBUcmVlRGF0YVBhcmFtcyB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHsgSXZzU2VydmVyIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0l2c1NlcnZlclwiO1xyXG5pbXBvcnQgeyBBcmVhRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7IEl2c1NlcnZlckxpc3RQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvSXZzU2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCB7IFRyZWVQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgeyBJdnNTZXJ2ZXJFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9JdnNTZXJ2ZXJFeFwiO1xyXG5pbXBvcnQgeyBJQ2FzQ2FkZVNlcnZpY2UsIENhc0NhZGVTZWFyY2hQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSXZzU2VydmVyVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vSXZzU2VydmVyVHlwZVwiO1xyXG5pbXBvcnQgeyBJTGF5ZXJEZWMgfSBmcm9tICcuLy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG5pbXBvcnQgJy4vLi4vLi4vY29tbW9uL2ZhY3RvcnkvbGF5ZXJNc2cuZmFjdG9yeSc7XHJcbmltcG9ydCB7IEJhY2tSZXNwb25zZUJvZHkgfSBmcm9tICcuLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdCc7XHJcblxyXG5kZWNsYXJlIHZhciBpdnNTZXJ2ZXJVcGRhdGVNb2RhbEh0bWw6IGFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgQmFzZUNvbmZpZ0l2c1NlcnZlckNvbnRyb2xsZXIge1xyXG4gICAgdEhlYWRMaXN0OiBBcnJheTxJVGFibGVIZWFkZXI+O1xyXG4gICAgdEJvZHlMaXN0OiBBcnJheTxJdnNTZXJ2ZXI+O1xyXG4gICAgY3VycmVudExheWVyPzogbnVtYmVyO1xyXG5cclxuICAgIC8vLS0tLS0tLS3liIbpobXmjIfku6RcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXM7XHJcbiAgICAvLy0tLS0tLS0tLVxyXG4gICAgLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBhcmVhVHJlZURhdGFzOiBJVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy8g5YiX6KGo6I635Y+W5Y+C5pWwXHJcbiAgICBmaW5kTGlzdFBhcmFtczogSXZzU2VydmVyTGlzdFBhcmFtcztcclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6IEFycmF5PGJvb2xlYW4+O1xyXG4gICAgaXNTZWxlY3RBbGw6IGJvb2xlYW47XHJcbiAgICAvLyBhbHRlciB3eXI6IOeUqOS6juWIpOaWreW9k+WJjeeVjOmdouS4iueahOWIl+ihqOaYr+WQpuiiq+mAieS4rVxyXG4gICAgaXNTZWxlY3RJdGVtczogYm9vbGVhbjtcclxuICAgIGl2c1NlcnZlclR5cGVPYmo6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSBhcyB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9O1xyXG5cclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJGZpbHRlcicsICckdGltZW91dCcsICckY29udHJvbGxlcicsICdpdnNTZXJ2ZXJTZXJ2aWNlJywgJ2xheWVyJywgJ2FyZWFTZXJ2aWNlJywgJ2Nhc0NhZGVTZXJ2aWNlJywgJ2kxOG5GYWN0b3J5JywgJ2xheWVyRGVjJ107XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCBwcml2YXRlICRmaWx0ZXI6IGFueSwgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sIHByaXZhdGUgJGNvbnRyb2xsZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGl2c1NlcnZlclNlcnZpY2U6IElJdnNTZXJ2ZXJTZXJ2aWNlLCBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlLCBwcml2YXRlIGNhc0NhZGVTZXJ2aWNlOiBJQ2FzQ2FkZVNlcnZpY2UsIHByaXZhdGUgaTE4bkZhY3Rvcnk6IGFueSwgcHJpdmF0ZSBsYXllckRlYzogSUxheWVyRGVjKSB7XHJcblxyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIC8v5Yid5aeL5YyWIGFyZWEg5qCR5pWw5o2uXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlSXZzJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5vbkNsaWNrID0gdHJlZVNlbGVjdE5vZGU7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVJbml0Q29tcGxldGUgPSB0cmVlSW5pdENvbXBsZXRlO1xyXG4gICAgICAgIHRoaXMuaW5pdExpc3RQYXJhbXMoKTtcclxuICAgICAgICAvLyDoioLngrnpgInmi6lcclxuICAgICAgICBmdW5jdGlvbiB0cmVlU2VsZWN0Tm9kZShldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhRXgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0cmVlTm9kZS5JRCA9PSBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZl90aGlzLnRCb2R5TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2luaXQgcmVxX3BhcmFtc1xyXG4gICAgICAgICAgICBsZXQgcmVxX3BhcmFtczogSXZzU2VydmVyTGlzdFBhcmFtcyA9IHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcztcclxuICAgICAgICAgICAgcmVxX3BhcmFtcy5hcmVhSWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgcmVxX3BhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMocmVxX3BhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCgpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZVNlcnZlclVwZGF0ZU1vZGVsJywgZnVuY3Rpb24gKGV2ZW46IGFueSwgZGF0YTogeyBpc0NvbW1pdDogYm9vbGVhbiB9KSB7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZUxheWVyKHNlbGZfdGhpcy5nZXRDdXJyZW50TGF5ZXIoKSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmlzQ29tbWl0KSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGZfdGhpcy5sYXllcikge1xyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLSDmoJHliJcg5pON5L2c5Ye95pWwXHJcbiAgICAvLyDmlbDmja7ojrflj5ZcclxuICAgIGdldEFyZWFUcmVlTGlzdChrZXl3b3JkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtczogVHJlZVBhcmFtcyA9IHRoaXMuYXJlYVRyZWVEYXRhcy5yZXFQYXJhbXM7XHJcbiAgICAgICAgcGFyYW1zLmtleXdvcmQgPSBrZXl3b3JkO1xyXG4gICAgICAgIHRoaXMuYXJlYVNlcnZpY2UuZmluZExpc3RUcmVlKHBhcmFtcykudGhlbigocmVzcDogQXJyYXk8QXJlYUV4PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuZmluaXNoZWROb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmVhVHJlZURhdGFzKHJlc3ApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dEtleVVwKGU6IGFueSkge1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KHRoaXMuYXJlYVRyZWVTZWFyY2hJbnB1dFN0cik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dCgpIHtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuICAgIC8vIOagkei1i+WAvFxyXG4gICAgc2V0QXJlYVRyZWVEYXRhcyh0cmVlRGF0YXM6IEFycmF5PEFyZWFFeD4pIHtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZURhdGFzID0gdHJlZURhdGFzO1xyXG4gICAgfTtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8g5Yid5aeL5YyW5YiX6KGo5pWw5o2uXHJcbiAgICBpbml0TGlzdFBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLnBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBuZXcgSXZzU2VydmVyTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5wYWdlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy50SGVhZExpc3QgPSBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTmFtZVwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzAzXCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJJcEFkZHJlc3NcIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BST1hZU0VSVkVSXzAzXCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTFcIiB9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIlNlcnZlclR5cGVcIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BST1hZU0VSVkVSXzA0XCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJEZXNjcmlwdGlvblwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzM0XCIgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJidXR0b25zXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTVcIiB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gJ1NlcnZlclR5cGUnO1xyXG4gICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyDliJ3lp4vljJYg57G75Z6L6YCJ5oupXHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIEl2c1NlcnZlclR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5pdnNTZXJ2ZXJUeXBlT2JqW0l2c1NlcnZlclR5cGVba2V5XS52YWx1ZV0gPSBJdnNTZXJ2ZXJUeXBlW2tleV0udGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHRhYmxlUGFyYW1zOiBJdnNTZXJ2ZXJMaXN0UGFyYW1zKSB7XHJcbiAgICAgICAgaWYgKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgcmVzdWx0LmlzQXNjID0gdGFibGVQYXJhbXMuaXNBc2M7XHJcbiAgICAgICAgLy8gcmVzdWx0Lm5hbWUgPSB0YWJsZVBhcmFtcy5hcmVhTmFtZTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDmoLnmja5maW5MaXN0UGFyYW1zOklGaW5kSXZzU2VydmVyTGlzdFBhcmFtcyDojrflj5bliJfooahcclxuICAgIGdldExpc3RCeVBhcmFtcyhwYXJhbXM6IEl2c1NlcnZlckxpc3RQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgdGhpcy5jYXNDYWRlU2VydmljZS5maW5kSXZzU2VydmVyTGlzdCh0aGlzLl9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHBhcmFtcykpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcnJheTxJdnNTZXJ2ZXI+PikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRDdXJyZW50UGFnZShwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXJhbXMuc2V0UGFnZVNpemUocGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLnNldFRvdGFsQ291bnQocmVzcC5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gcGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VEJvZHlMaXN0KHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Y2V5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkKF9pbmRleDogSXZzU2VydmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfSVZTU0VSVkVSXzAzJyksIHtcclxuICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxcclxuICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkRGVsZXRlKF9pbmRleC5JRCwgaW5kZXgpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZERlbGV0ZShpZHM6IEFycmF5PHN0cmluZz58c3RyaW5nLCBsYXllck51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGlzU2luZ2xlOiBib29sZWFuLCBhSWQ6IHN0cmluZyxpZHMyOkFycmF5PHN0cmluZz47XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaWRzKSkge1xyXG4gICAgICAgICAgICBpc1NpbmdsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZHMyID0gaWRzIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaXNTaW5nbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBhSWQgPSBpZHMgYXMgc3RyaW5nO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5pdnNTZXJ2ZXJTZXJ2aWNlLnZhbGlkRGVsZXRlKGlzU2luZ2xlID8gW2FJZF0gOiBpZHMyKS50aGVuKChyZXM6IEJhY2tSZXNwb25zZUJvZHk8eyBoYXNUYXNrUnVuOiBib29sZWFuIH0+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UobGF5ZXJOdW0pO1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5kYXRhLmhhc1Rhc2tSdW4gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMuZmFpbEluZm8oJ+S4jeiDveWIoOmZpOacieS7u+WKoeeahOacjeWKoeWZqO+8gScpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzU2luZ2xlID8gdGhpcy5zdWJtaXREZWxldGUoYUlkLCBsYXllck51bSkgOiB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkczIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgc3VibWl0RGVsZXRlKGlkOiBzdHJpbmcsIGxheWVyTnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLml2c1NlcnZlclNlcnZpY2UuZGVsZXRlQnlJZChpZCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8YW55PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGxheWVyTnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmn5DkuIDmnaHmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTIxIDE5OjQzOjA3XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTogQXJyYXk8SXZzU2VydmVyPiB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PEl2c1NlcnZlcj4gPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZExpc3QpIHtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QuZm9yRWFjaCgoaXZzU2VydmVyOiBJdnNTZXJ2ZXIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goaXZzU2VydmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxlY3RlZERhdGFMaXN0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+WkmuS4quWIoOmZpFxyXG4gICAgZGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PEl2c1NlcnZlcj4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRhTGlzdCB8fCBzZWxlY3RlZERhdGFMaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCI9PT09PT09PT09PT1cIiwgXCLlvZPliY3mnKrpgInmi6nmlbDmja5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICBzZWxlY3RlZERhdGFMaXN0LmZvckVhY2goKHNlcnZlcjogSXZzU2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKHNlcnZlci5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNob3dUZXh0ID0gJ+ehruWumuWIoOmZpOW9k+WJjemAieS4reeahCAnICsgaWRzLmxlbmd0aCArICcg5p2h6KeG6aKR57uT5p6E5YyW5pyN5Yqh5Zmo6YWN572u5ZCXPyc7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkRGVsZXRlKGlkcyxpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuaXZzU2VydmVyU2VydmljZS5kZWxldGVCeUlkcyhpZHMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3AuY29kZSA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGFkZEl2c1NlcnZlcigpIHtcclxuICAgICAgICBsZXQgc2NvcGU6IGFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBsZXQgdXBkYXRlTW9kYWxQYXJhbXM6IFVwZGF0ZU1vZGFsUGFyYW1zPEl2c1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8SXZzU2VydmVyPigpO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmRlZmF1bHREYXRhcy5hcmVhSWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zID0gdXBkYXRlTW9kYWxQYXJhbXM7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gJ+aWsOW7uuacjeWKoeWZqCc7XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlU3RyLFxyXG4gICAgICAgICAgICBjb250ZW50OiBpdnNTZXJ2ZXJVcGRhdGVNb2RhbEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTogW1wiNTAwcHhcIl0sXHJcbiAgICAgICAgfSkudGhlbigoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYXllcihpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5pdnNTZXJ2ZXJTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJdnNTZXJ2ZXIobW9kZWw/OiBJdnNTZXJ2ZXIpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhtb2RlbCk7XHJcbiAgICAgICAgdGhpcy5maW5kQnlJZChtb2RlbC5JRCkudGhlbigocmVzcDogUmVzcG9uc2VSZXN1bHQ8SXZzU2VydmVyRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5VcGRhdGUodHJ1ZSwgcmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9wZW5VcGRhdGUoaXNVcGRhdGU6IGJvb2xlYW4sIGRhdGE/OiBJdnNTZXJ2ZXJFeCkge1xyXG4gICAgICAgIGxldCBzY29wZTogYW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG5cclxuICAgICAgICBsZXQgdXBkYXRlTW9kYWxQYXJhbXM6IFVwZGF0ZU1vZGFsUGFyYW1zPEl2c1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8SXZzU2VydmVyPigpO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmRlZmF1bHREYXRhcy5hcmVhSWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMudXBkYXRlTW9kZWwgPSBkYXRhO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zID0gdXBkYXRlTW9kYWxQYXJhbXM7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gaXNVcGRhdGUgPyAn57yW6L6R5pyN5Yqh5ZmoJyA6ICfmlrDlu7rmnI3liqHlmagnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogaXZzU2VydmVyVXBkYXRlTW9kYWxIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFyZWE6IFtcIjUwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExheWVyKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VMYXllcihpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudExheWVyKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllciA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRMYXllcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUQm9keUxpc3QocmVzdWx0OiBBcnJheTxJdnNTZXJ2ZXI+KSB7XHJcbiAgICAgICAgLy8gdGhpcy50Qm9keUxpc3QgPSB0aGlzLiRmaWx0ZXIoJ2l2c1NlcnZlclR5cGVGaWx0ZXInKShyZXN1bHQsJ1NlcnZlclR5cGUnKTtcclxuICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5Y2V5qCP6YCJ5oup5o6S5bqPXHJcbiAgICBzb3J0QnlGaWVsZChfaW5kZXg6IG51bWJlciwgZmllbGQ6IHN0cmluZywgc29ydFN0YXR1czogYm9vbGVhbikge1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vYWJvdXQgcGFnZSBjbGlja1xyXG4gICAgY2hhbmdlUGFnZShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdG9yIHd5cjog5Yik5pat5ZKM6K6+572u5b2T5YmN5YiX6KGo5piv5ZCm5pyJ6YCJ5Lit55qE5YWD57SgXHJcbiAgICAgKiBAcGFyYW0gaXRlbXNcclxuICAgICAqL1xyXG4gICAgc2V0SXNTZWxlY3RJdGVtcyhpdGVtczogQXJyYXk8Ym9vbGVhbj4pIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGksIGxlbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtc1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RJdGVtcyAhPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ0l2c1NlcnZlckNvbnRyb2xsZXInLCBCYXNlQ29uZmlnSXZzU2VydmVyQ29udHJvbGxlcik7Il19
