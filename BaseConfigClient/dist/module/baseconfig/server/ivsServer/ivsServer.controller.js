define(["require", "exports", "text!./ivsServer.updateModal.html", "../main/serverUpdateModal.params", "../../../common/directive/page/page-params", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../../core/params/IvsServerParams", "../../../common/services/casecade.service", "angular", "../../../common/services/ivsServer.service", "../../../common/services/area.service", "./ivsServer.updateModal.controller", "../main/serverType.filter"], function (require, exports, ivsServerUpdateModalHtml, serverUpdateModal_params_1, page_params_1, main_app_1, tree_params_1, IvsServerParams_1, casecade_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigIvsServerController = (function () {
        function BaseConfigIvsServerController($scope, $filter, $timeout, $controller, ivsServerService, layer, areaService, casCadeService) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.ivsServerService = ivsServerService;
            this.layer = layer;
            this.areaService = areaService;
            this.casCadeService = casCadeService;
            this.areaTreeSearchInputStr = "";
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeIvs';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            this.initListParams();
            function treeSelectNode(event, treeId, treeNode) {
                console.log("%c ==========start==============", 'color:orange');
                console.log(treeId, treeNode);
                console.log("=========end===============");
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
                if (data.isCommit) {
                    self_this.getListByParams(self_this.findListParams);
                }
                self_this.closeLayer(self_this.getCurrentLayer());
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
                { field: "Name", title: "名称" },
                { field: "IpAddress", title: "IP地址" },
                { field: "Port", title: "端口" },
                { field: "ServerType", title: "服务器类型" },
                { field: "Description", title: "描述" },
                { field: "buttons", title: "操作" },
            ];
            this.findListParams.sortName = 'ServerType';
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
            this.layer.confirm("确定删除该条代理代理配置吗?", {
                icon: 0,
                title: '警告',
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(_index.ID, index);
            });
        };
        BaseConfigIvsServerController.prototype.submitDelete = function (id, layerNum) {
            var _this = this;
            this.ivsServerService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                    _this.layer.close(layerNum);
                }
                else {
                }
            });
        };
        BaseConfigIvsServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            console.log(resultList);
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
            var showText = '确定删除当前选中的 ' + ids.length + ' 条IvsServer配置吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: '警告',
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids);
            });
        };
        BaseConfigIvsServerController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.ivsServerService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.findListParams.currentPage = 1;
                    _this.getListByParams(_this.findListParams);
                }
                else {
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
                title: [titleStr, 'text-align: center;'],
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
                title: [titleStr, 'text-align: center;'],
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
            this.tBodyList = this.$filter('ivsServerTypeFilter')(result, 'ServerType');
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
        BaseConfigIvsServerController.$inject = ['$scope', '$filter', '$timeout', '$controller', 'ivsServerService', 'layer', 'areaService', 'casCadeService'];
        return BaseConfigIvsServerController;
    }());
    main_app_1.app
        .controller('baseConfigIvsServerController', BaseConfigIvsServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvaXZzU2VydmVyL2l2c1NlcnZlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQTRCQTtRQWtCSSx1Q0FBb0IsTUFBVSxFQUFTLE9BQVcsRUFBUyxRQUFpQixFQUFTLFdBQWUsRUFDaEYsZ0JBQWtDLEVBQVUsS0FBUyxFQUFTLFdBQXdCLEVBQVUsY0FBK0I7WUFEL0gsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUFTLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUk7WUFDaEYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtZQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtZQVRuSiwyQkFBc0IsR0FBVSxFQUFFLENBQUM7WUFhL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLHdCQUF3QixLQUFpQixFQUFFLE1BQWEsRUFBRSxRQUFlO2dCQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBRSxDQUFDO2dCQUU1QyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztvQkFDL0MsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQztvQkFDWCxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsSUFBSSxVQUFVLEdBQXVCLFNBQVMsQ0FBQyxjQUFjLENBQUM7Z0JBQzlELFVBQVUsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUVEO1lBRUEsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUV2QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxJQUFRLEVBQUMsSUFBdUI7Z0JBQ2hGLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO29CQUNkLFNBQVMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUN4RCxDQUFDO2dCQUNELFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtnQkFDbkIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7b0JBQ2hCLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQy9CLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFBQSxDQUFDO1FBSUYsdURBQWUsR0FBZixVQUFnQixPQUFlO1lBQS9CLGlCQWFDO1lBWkcsSUFBSSxNQUFNLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7WUFDckQsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBa0I7Z0JBQzFELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7b0JBQ0wsS0FBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM5QyxDQUFDO2dCQUFBLElBQUksQ0FBQSxDQUFDO29CQUNGLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDN0MsQ0FBQztnQkFDRCxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFBQSxDQUFDO1FBRUYsZ0VBQXdCLEdBQXhCLFVBQXlCLENBQUs7WUFDMUIsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQSxDQUFDO2dCQUNqQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3RELENBQUM7UUFDTCxDQUFDO1FBQUEsQ0FBQztRQUVGLDJEQUFtQixHQUFuQjtZQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUFBLENBQUM7UUFFRix3REFBZ0IsR0FBaEIsVUFBaUIsU0FBd0I7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdDLENBQUM7UUFBQSxDQUFDO1FBR0Ysc0RBQWMsR0FBZDtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHFDQUFtQixFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1lBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUk7Z0JBQ2QsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7Z0JBQzdCLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO2dCQUNwQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDN0IsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7Z0JBQ3RDLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2dCQUNwQyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQzthQUNuQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1FBQ2hELENBQUM7UUFBQSxDQUFDO1FBRUYsK0RBQXVCLEdBQXZCLFVBQXdCLFdBQWdDO1lBQ3BELEVBQUUsQ0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxFQUF5QixDQUFDO1lBRWxELElBQUksTUFBTSxHQUFHLElBQUksc0NBQW1CLEVBQUUsQ0FBQztZQUN2QyxNQUFNLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDM0MsTUFBTSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQztZQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDbkMsTUFBTSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBRWpDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUFBLENBQUM7UUFHRix1REFBZSxHQUFmLFVBQWdCLE1BQTBCO1lBQTFDLGlCQWNDO1lBWkcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3RFLElBQUksQ0FBQyxVQUFDLElBQXFDO2dCQUM1QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ2pCLElBQUksVUFBVSxHQUFHLElBQUkscUJBQVUsRUFBRSxDQUFDO29CQUNsQyxVQUFVLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDOUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3hDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQyxLQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0Qsa0RBQVUsR0FBVixVQUFXLE1BQWdCO1lBQTNCLGlCQVdDO1lBVEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUM7YUFDekIsRUFBQyxVQUFDLEtBQWE7Z0JBQ1osS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCxvREFBWSxHQUFaLFVBQWEsRUFBUyxFQUFDLFFBQWU7WUFBdEMsaUJBU0M7WUFSRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQXdCO2dCQUMvRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ2pCLEtBQUksQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMxQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztnQkFFTixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBT0Qsd0RBQWdCLEdBQWhCLFVBQWlCLFVBQXlCLEVBQUMsVUFBa0I7WUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUNsQyxDQUFDO1FBQUEsQ0FBQztRQUdGLHVEQUFlLEdBQWY7WUFBQSxpQkFVQztZQVRHLElBQUksZ0JBQWdCLEdBQW9CLEVBQUUsQ0FBQztZQUMzQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUEsQ0FBQztnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxTQUFtQixFQUFDLEtBQVk7b0JBQ3BELEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO3dCQUN6QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1lBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQzVCLENBQUM7UUFBQSxDQUFDO1FBR0YsbURBQVcsR0FBWDtZQUFBLGlCQXFCQztZQXBCRyxJQUFJLGdCQUFnQixHQUFvQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDL0QsRUFBRSxDQUFBLENBQUMsQ0FBRSxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLElBQUcsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDbEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hDLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFDRCxJQUFJLEdBQUcsR0FBaUIsRUFBRSxDQUFDO1lBRTNCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQWdCO2dCQUN0QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksUUFBUSxHQUFHLFlBQVksR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1lBQzdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDekIsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFDLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQzthQUN6QixFQUFDLFVBQUMsS0FBYTtnQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUVELHlEQUFpQixHQUFqQixVQUFrQixHQUFpQjtZQUFuQyxpQkFTQztZQVJHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBMkI7Z0JBQ3BFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUEsQ0FBQztvQkFDakIsS0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUUsQ0FBQyxDQUFDO29CQUNuQyxLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztnQkFFTixDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUEsQ0FBQztRQUdGLG9EQUFZLEdBQVo7WUFBQSxpQkFnQkM7WUFmRyxJQUFJLEtBQUssR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ25DLElBQUksaUJBQWlCLEdBQWdDLElBQUksNENBQWlCLEVBQWEsQ0FBQztZQUN4RixpQkFBaUIsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ25FLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDbkMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQztZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUMsQ0FBQyxRQUFRLEVBQUMscUJBQXFCLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBQyxDQUFDLE9BQU8sQ0FBQzthQUNqQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBWTtnQkFDakIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxnREFBUSxHQUFSLFVBQVMsRUFBUztZQUVkLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFFRCx1REFBZSxHQUFmLFVBQWdCLEtBQWdCO1lBQWhDLGlCQVVDO1lBVEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFnQztnQkFDMUQsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQSxDQUFDO29CQUNqQixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BDLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7Z0JBRU4sQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUFBLENBQUM7UUFFRixrREFBVSxHQUFWLFVBQVcsUUFBZ0IsRUFBQyxJQUFpQjtZQUE3QyxpQkFxQkM7WUFwQkcsSUFBSSxLQUFLLEdBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVuQyxJQUFJLGlCQUFpQixHQUFnQyxJQUFJLDRDQUFpQixFQUFhLENBQUM7WUFDeEYsaUJBQWlCLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQztZQUNuRSxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLGlCQUFpQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDckMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1lBQzVDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQSxDQUFDLENBQUEsT0FBTyxDQUFBLENBQUMsQ0FBQSxPQUFPLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ1osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFDLENBQUMsUUFBUSxFQUFDLHFCQUFxQixDQUFDO2dCQUN0QyxPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxLQUFLLEVBQUUsS0FBSztnQkFDWixJQUFJLEVBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ2QsR0FBRyxFQUFFO29CQUNELEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDckIsQ0FBQzthQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFZO2dCQUNqQixLQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUFBLENBQUM7UUFFRixrREFBVSxHQUFWLFVBQVcsS0FBWTtZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELHVEQUFlLEdBQWYsVUFBZ0IsS0FBWTtZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDO1FBRUQsdURBQWUsR0FBZjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7UUFFRCxvREFBWSxHQUFaLFVBQWEsTUFBdUI7WUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFBQSxDQUFDO1FBR0YsbURBQVcsR0FBWCxVQUFZLE1BQWEsRUFBQyxLQUFZLEVBQUMsVUFBa0I7WUFFckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUVyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBR0Qsa0RBQVUsR0FBVixVQUFXLEdBQVU7WUFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCxzREFBYyxHQUFkLFVBQWUsR0FBVTtZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFuVE0scUNBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxrQkFBa0IsRUFBQyxPQUFPLEVBQUMsYUFBYSxFQUFDLGdCQUFnQixDQUFDLENBQUM7UUFvVDdILG9DQUFDO0tBclVELEFBcVVDLElBQUE7SUFDRCxjQUFHO1NBQ0UsVUFBVSxDQUFDLCtCQUErQixFQUFFLDZCQUE2QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvc2VydmVyL2l2c1NlcnZlci9pdnNTZXJ2ZXIuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9pdnNTZXJ2ZXIudXBkYXRlTW9kYWwuaHRtbFwiIG5hbWU9XCJpdnNTZXJ2ZXJVcGRhdGVNb2RhbEh0bWxcIiAvPlxyXG5pbXBvcnQge1VwZGF0ZU1vZGFsUGFyYW1zfSBmcm9tIFwiLi4vbWFpbi9zZXJ2ZXJVcGRhdGVNb2RhbC5wYXJhbXNcIjtcclxuZGVjbGFyZSB2YXIgcmVxdWlyZTphbnk7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2FuZ3VsYXInO1xyXG5pbXBvcnQgJy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9pdnNTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgJy4vaXZzU2VydmVyLnVwZGF0ZU1vZGFsLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgXCIuLi9tYWluL3NlcnZlclR5cGUuZmlsdGVyXCJcclxuXHJcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJSXZzU2VydmVyU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9pdnNTZXJ2ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJdnNTZXJ2ZXJ9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9JdnNTZXJ2ZXJcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtJdnNTZXJ2ZXJMaXN0UGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvSXZzU2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCB7VHJlZVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvcGFyYW1zL3RyZWUvVHJlZVBhcmFtc1wiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7SXZzU2VydmVyRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9JdnNTZXJ2ZXJFeFwiO1xyXG5pbXBvcnQge0lDYXNDYWRlU2VydmljZSwgQ2FzQ2FkZVNlYXJjaFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYXNlY2FkZS5zZXJ2aWNlXCI7XHJcblxyXG5kZWNsYXJlIHZhciBpdnNTZXJ2ZXJVcGRhdGVNb2RhbEh0bWw6IGFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgQmFzZUNvbmZpZ0l2c1NlcnZlckNvbnRyb2xsZXJ7XHJcbiAgICB0SGVhZExpc3Q6QXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDpBcnJheTxJdnNTZXJ2ZXI+O1xyXG4gICAgY3VycmVudExheWVyPzpudW1iZXI7XHJcblxyXG4gICAgLy8tLS0tLS0tLeWIhumhteaMh+S7pFxyXG4gICAgcGFnZVBhcmFtcyA6UGFnZVBhcmFtcztcclxuICAgIC8vLS0tLS0tLS0tXHJcbiAgICAvLyDpgInmi6nooYzmlL/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YXM6SVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0U3RyOnN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgLy8g5YiX6KGo6I635Y+W5Y+C5pWwXHJcbiAgICBmaW5kTGlzdFBhcmFtczpJdnNTZXJ2ZXJMaXN0UGFyYW1zO1xyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDpBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0QWxsOmJvb2xlYW47XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywnJGZpbHRlcicsJyR0aW1lb3V0JywnJGNvbnRyb2xsZXInLCdpdnNTZXJ2ZXJTZXJ2aWNlJywnbGF5ZXInLCdhcmVhU2VydmljZScsJ2Nhc0NhZGVTZXJ2aWNlJ107XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTphbnkscHJpdmF0ZSAkZmlsdGVyOmFueSxwcml2YXRlICR0aW1lb3V0OkZ1bmN0aW9uLHByaXZhdGUgJGNvbnRyb2xsZXI6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBpdnNTZXJ2ZXJTZXJ2aWNlOklJdnNTZXJ2ZXJTZXJ2aWNlLCBwcml2YXRlIGxheWVyOmFueSxwcml2YXRlIGFyZWFTZXJ2aWNlOklBcmVhU2VydmljZSwgcHJpdmF0ZSBjYXNDYWRlU2VydmljZTogSUNhc0NhZGVTZXJ2aWNlKXtcclxuXHJcbiAgICAgICAgLy8g5qCR5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgLy/liJ3lp4vljJYgYXJlYSDmoJHmlbDmja5cclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnYXJlYVRyZWVJdnMnO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcbiAgICAgICAgdGhpcy5pbml0TGlzdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOiKgueCuemAieaLqVxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTpBcmVhRXgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjID09PT09PT09PT1zdGFydD09PT09PT09PT09PT09XCIsJ2NvbG9yOm9yYW5nZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlSWQsIHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT1lbmQ9PT09PT09PT09PT09PT1cIiwpO1xyXG5cclxuICAgICAgICAgICAgaWYodHJlZU5vZGUuSUQgPT0gc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmX3RoaXMudEJvZHlMaXN0KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pbml0IHJlcV9wYXJhbXNcclxuICAgICAgICAgICAgbGV0IHJlcV9wYXJhbXM6SXZzU2VydmVyTGlzdFBhcmFtcyA9IHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcztcclxuICAgICAgICAgICAgcmVxX3BhcmFtcy5hcmVhSWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgcmVxX3BhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMocmVxX3BhcmFtcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKCl7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudHJlZURhdGFzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZVNlcnZlclVwZGF0ZU1vZGVsJywgZnVuY3Rpb24gKGV2ZW46YW55LGRhdGE6e2lzQ29tbWl0OmJvb2xlYW59KSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuaXNDb21taXQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZUxheWVyKHNlbGZfdGhpcy5nZXRDdXJyZW50TGF5ZXIoKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZihzZWxmX3RoaXMubGF5ZXIpe1xyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy8tLS0tLS0tLS0tLSDmoJHliJcg5pON5L2c5Ye95pWwXHJcbiAgICAvLyDmlbDmja7ojrflj5ZcclxuICAgIGdldEFyZWFUcmVlTGlzdChrZXl3b3JkPzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCBwYXJhbXM6VHJlZVBhcmFtcyA9IHRoaXMuYXJlYVRyZWVEYXRhcy5yZXFQYXJhbXM7XHJcbiAgICAgICAgcGFyYW1zLmtleXdvcmQgPSBrZXl3b3JkO1xyXG4gICAgICAgIHRoaXMuYXJlYVNlcnZpY2UuZmluZExpc3RUcmVlKHBhcmFtcykudGhlbigocmVzcDpBcnJheTxBcmVhRXg+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBcmVhVHJlZURhdGFzKHJlc3ApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuICAgIC8vIOagkeaQnOe0olxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dEtleVVwKGU6YW55KXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDEzKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0KCl7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgIH07XHJcbiAgICAvLyDmoJHotYvlgLxcclxuICAgIHNldEFyZWFUcmVlRGF0YXModHJlZURhdGFzOiBBcnJheTxBcmVhRXg+KXtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZURhdGFzID0gdHJlZURhdGFzO1xyXG4gICAgfTtcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgLy8g5Yid5aeL5YyW5YiX6KGo5pWw5o2uXHJcbiAgICBpbml0TGlzdFBhcmFtcygpe1xyXG4gICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IG5ldyBJdnNTZXJ2ZXJMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQgPSAnJztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgdGhpcy50Qm9keUxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdCA9ICBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTmFtZVwiLCB0aXRsZTogXCLlkI3np7BcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiSXBBZGRyZXNzXCIsIHRpdGxlOiBcIklQ5Zyw5Z2AXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIlBvcnRcIiwgdGl0bGU6IFwi56uv5Y+jXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIlNlcnZlclR5cGVcIiwgdGl0bGU6IFwi5pyN5Yqh5Zmo57G75Z6LXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIuaPj+i/sFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJidXR0b25zXCIsIHRpdGxlOiBcIuaTjeS9nFwifSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSAnU2VydmVyVHlwZSc7XHJcbiAgICB9O1xyXG5cclxuICAgIF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHRhYmxlUGFyYW1zOiBJdnNTZXJ2ZXJMaXN0UGFyYW1zKXtcclxuICAgICAgICBpZighdGFibGVQYXJhbXMpIHJldHVybiB7fSBhcyBDYXNDYWRlU2VhcmNoUGFyYW1zO1xyXG5cclxuICAgICAgICBsZXQgcmVzdWx0ID0gbmV3IENhc0NhZGVTZWFyY2hQYXJhbXMoKTtcclxuICAgICAgICByZXN1bHQucGFnZUluZGV4ID0gdGFibGVQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgcmVzdWx0Lm9yZGVyRmllbGQgPSB0YWJsZVBhcmFtcy5zb3J0TmFtZTtcclxuICAgICAgICByZXN1bHQucGFnZVNpemUgPSB0YWJsZVBhcmFtcy5wYWdlU2l6ZTtcclxuICAgICAgICByZXN1bHQuYXJlYUlkID0gdGFibGVQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgIHJlc3VsdC5pc0FzYyA9IHRhYmxlUGFyYW1zLmlzQXNjO1xyXG4gICAgICAgIC8vIHJlc3VsdC5uYW1lID0gdGFibGVQYXJhbXMuYXJlYU5hbWU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qC55o2uZmluTGlzdFBhcmFtczpJRmluZEl2c1NlcnZlckxpc3RQYXJhbXMg6I635Y+W5YiX6KGoXHJcbiAgICBnZXRMaXN0QnlQYXJhbXMocGFyYW1zOkl2c1NlcnZlckxpc3RQYXJhbXMpe1xyXG5cclxuICAgICAgICB0aGlzLmNhc0NhZGVTZXJ2aWNlLmZpbmRJdnNTZXJ2ZXJMaXN0KHRoaXMuX2dldENhc0NhZGVTZWFyY2hQYXJhbXMocGFyYW1zKSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8QXJyYXk8SXZzU2VydmVyPj4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRDdXJyZW50UGFnZShwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRQYWdlU2l6ZShwYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRCb2R5TGlzdChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ljZXliKDpmaRcclxuICAgIGRlbGV0ZUJ5SWQoX2luZGV4Okl2c1NlcnZlcil7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShcIuehruWumuWIoOmZpOivpeadoeS7o+eQhuS7o+eQhumFjee9ruWQlz9cIiwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwoaW5kZXg6IG51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZShfaW5kZXguSUQsaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGVsZXRlKGlkOnN0cmluZyxsYXllck51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuaXZzU2VydmVyU2VydmljZS5kZWxldGVCeUlkKGlkKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGxheWVyTnVtKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeafkOS4gOadoeaVsOaNrlxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMjEgMTk6NDM6MDdcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBhZnRlckNoYW5nZUNoZWNrKHJlc3VsdExpc3Q6QXJyYXk8Ym9vbGVhbj4saXNDaGVja0FsbDpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOkFycmF5PEl2c1NlcnZlcj57XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6QXJyYXk8SXZzU2VydmVyPiA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRMaXN0KXtcclxuICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QuZm9yRWFjaCgoaXZzU2VydmVyOkl2c1NlcnZlcixpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0YUxpc3QucHVzaChpdnNTZXJ2ZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5aSa5Liq5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkcygpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OkFycmF5PEl2c1NlcnZlcj4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGlmKCEgc2VsZWN0ZWREYXRhTGlzdCB8fCBzZWxlY3RlZERhdGFMaXN0Lmxlbmd0aCA9PTApe1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiPT09PT09PT09PT09XCIsXCLlvZPliY3mnKrpgInmi6nmlbDmja5cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkczpBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0YUxpc3QuZm9yRWFjaCgoc2VydmVyOkl2c1NlcnZlcik9PntcclxuICAgICAgICAgICAgaWRzLnB1c2goc2VydmVyLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hvd1RleHQgPSAn56Gu5a6a5Yig6Zmk5b2T5YmN6YCJ5Lit55qEICcgKyBpZHMubGVuZ3RoICsgJyDmnaFJdnNTZXJ2ZXLphY3nva7lkJc/JztcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0oc2hvd1RleHQsIHtcclxuICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgdGl0bGU6ICforablkYonLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCIsXCIyMDBweFwiXVxyXG4gICAgICAgIH0sKGluZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczpBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICB0aGlzLml2c1NlcnZlclNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIGFkZEl2c1NlcnZlcigpe1xyXG4gICAgICAgIGxldCBzY29wZTphbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZU1vZGFsUGFyYW1zOlVwZGF0ZU1vZGFsUGFyYW1zPEl2c1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8SXZzU2VydmVyPigpO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmRlZmF1bHREYXRhcy5hcmVhSWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zID0gdXBkYXRlTW9kYWxQYXJhbXM7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gJ+aWsOW7uuacjeWKoeWZqCc7XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgdGl0bGU6W3RpdGxlU3RyLCd0ZXh0LWFsaWduOiBjZW50ZXI7J10sXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGl2c1NlcnZlclVwZGF0ZU1vZGFsSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCJdLFxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGF5ZXIoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmRCeUlkKGlkOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLml2c1NlcnZlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUl2c1NlcnZlcihtb2RlbD86SXZzU2VydmVyKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vZGVsKTtcclxuICAgICAgICB0aGlzLmZpbmRCeUlkKG1vZGVsLklEKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEl2c1NlcnZlckV4Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5VcGRhdGUodHJ1ZSxyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9wZW5VcGRhdGUoaXNVcGRhdGU6Ym9vbGVhbixkYXRhPzpJdnNTZXJ2ZXJFeCl7XHJcbiAgICAgICAgbGV0IHNjb3BlOmFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuXHJcbiAgICAgICAgbGV0IHVwZGF0ZU1vZGFsUGFyYW1zOlVwZGF0ZU1vZGFsUGFyYW1zPEl2c1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8SXZzU2VydmVyPigpO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmRlZmF1bHREYXRhcy5hcmVhSWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMudXBkYXRlTW9kZWwgPSBkYXRhO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zID0gdXBkYXRlTW9kYWxQYXJhbXM7XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gaXNVcGRhdGU/J+e8lui+keacjeWKoeWZqCc6J+aWsOW7uuacjeWKoeWZqCc7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6W3RpdGxlU3RyLCd0ZXh0LWFsaWduOiBjZW50ZXI7J10sXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBpdnNTZXJ2ZXJVcGRhdGVNb2RhbEh0bWwsXHJcbiAgICAgICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgICAgICBhcmVhOltcIjUwMHB4XCJdLFxyXG4gICAgICAgICAgICAgICAgZW5kOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnRoZW4oKGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExheWVyKGluZGV4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlTGF5ZXIoaW5kZXg6bnVtYmVyKTphbnl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnJlbnRMYXllcihpbmRleDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50TGF5ZXIoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudExheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRCb2R5TGlzdChyZXN1bHQ6QXJyYXk8SXZzU2VydmVyPikge1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gdGhpcy4kZmlsdGVyKCdpdnNTZXJ2ZXJUeXBlRmlsdGVyJykocmVzdWx0LCdTZXJ2ZXJUeXBlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOWNleagj+mAieaLqeaOkuW6j1xyXG4gICAgc29ydEJ5RmllbGQoX2luZGV4Om51bWJlcixmaWVsZDpzdHJpbmcsc29ydFN0YXR1czpib29sZWFuKXtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9IGZpZWxkO1xyXG5cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ0l2c1NlcnZlckNvbnRyb2xsZXInLCBCYXNlQ29uZmlnSXZzU2VydmVyQ29udHJvbGxlcik7Il19
