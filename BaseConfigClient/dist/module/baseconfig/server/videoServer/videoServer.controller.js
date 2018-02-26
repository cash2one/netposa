define(["require", "exports", "text!./videoServer.updatePopup.html", "../../../common/directive/page/page-params", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../../core/params/VideoServerParams", "../main/serverUpdateModal.params", "../../../common/services/casecade.service", "../../../../core/params/ProxyServerParams", "angular", "../../../common/services/videoServer.service", "../../../common/services/area.service", "./videoServer.updatePopup.controller", "../main/serverType.filter", "../../../common/services/proxyServer.service"], function (require, exports, videoServerUpdatePopupHtml, page_params_1, main_app_1, tree_params_1, VideoServerParams_1, serverUpdateModal_params_1, casecade_service_1, ProxyServerParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigVideoServerController = (function () {
        function BaseConfigVideoServerController($scope, $filter, $timeout, $controller, serverService, layer, areaService, casCadeService, proxyServerService) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.serverService = serverService;
            this.layer = layer;
            this.areaService = areaService;
            this.casCadeService = casCadeService;
            this.proxyServerService = proxyServerService;
            this.areaTreeSearchInputStr = "";
            this.proxyListForVideo = [];
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeVideo';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = function () {
            };
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
            this.initProxyList();
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
        BaseConfigVideoServerController.prototype.initProxyList = function () {
            var _this = this;
            var params = new ProxyServerParams_1.ProxyServerListParams();
            params.type = 'IodServer';
            params.currentPage = 1;
            params.pageSize = 100;
            this.proxyServerService.findListByParams(params).then(function (res) {
                _this.proxyListForVideo = res.data.Result;
            });
        };
        BaseConfigVideoServerController.prototype.getAreaTreeList = function (keyword) {
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
        BaseConfigVideoServerController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        BaseConfigVideoServerController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        BaseConfigVideoServerController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        BaseConfigVideoServerController.prototype.initListParams = function () {
            this.pageParams = new page_params_1.default();
            this.findListParams = new VideoServerParams_1.VideoServerListParams();
            this.findListParams.areaId = '';
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.tBodyList = [];
            this.tHeadList = [
                { field: "Name", title: "名称" },
                { field: "IpAddress", title: "IP地址" },
                { field: "Port", title: "端口" },
                { field: "VideoServerType", title: "服务器类型" },
                { field: "Description", title: "描述" },
                { field: "buttons", title: "操作" },
            ];
            this.findListParams.sortName = 'VideoServerType';
        };
        ;
        BaseConfigVideoServerController.prototype._getCasCadeSearchParams = function (tableParams) {
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
        BaseConfigVideoServerController.prototype.getListByParams = function (params) {
            var _this = this;
            console.log(params);
            this.casCadeService.findVideoServerList(this._getCasCadeSearchParams(params)).then(function (resp) {
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
        BaseConfigVideoServerController.prototype.deleteById = function (_index) {
            var _this = this;
            this.layer.confirm("确定删除该条音频代理配置吗?", {
                icon: 0,
                title: '警告',
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(_index.ID, index);
            });
        };
        BaseConfigVideoServerController.prototype.submitDelete = function (id, layerNum) {
            var _this = this;
            this.serverService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                    _this.layer.close(layerNum);
                }
                else {
                }
            });
        };
        BaseConfigVideoServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            console.log(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        BaseConfigVideoServerController.prototype.getSelectedList = function () {
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
        BaseConfigVideoServerController.prototype.deleteByIds = function () {
            var _this = this;
            var personList = this.getSelectedList();
            if (!personList || personList.length == 0) {
                console.error("============", "当前未选择数据");
                return;
            }
            var ids = [];
            personList.forEach(function (server) {
                ids.push(server.ID);
            });
            var showText = '确定删除当前选中的 ' + ids.length + ' 条音频代理配置吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: '警告',
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids);
            });
        };
        BaseConfigVideoServerController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.serverService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.findListParams.currentPage = 1;
                    _this.getListByParams(_this.findListParams);
                }
                else {
                }
            });
        };
        ;
        BaseConfigVideoServerController.prototype.addVideoServer = function () {
            var _this = this;
            var scope = this.$scope.$new();
            var updateModalParams = new serverUpdateModal_params_1.UpdateModalParams();
            updateModalParams.defaultDatas.areaId = this.findListParams.areaId;
            updateModalParams.isUpdate = false;
            scope.updateModalParams = updateModalParams;
            scope.proxyListForVideo = this.proxyListForVideo;
            var titleStr = '新建服务器';
            this.layer.open({
                type: 1,
                title: [titleStr, 'text-align: center;'],
                content: videoServerUpdatePopupHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        BaseConfigVideoServerController.prototype.findById = function (id) {
            return this.serverService.findById(id);
        };
        BaseConfigVideoServerController.prototype.updateServer = function (model) {
            var _this = this;
            console.log(model);
            this.findById(model.ID).then(function (resp) {
                if (resp.code == 200) {
                    _this.openUpdateVideoServer(true, resp.data);
                }
                else {
                }
            });
        };
        ;
        BaseConfigVideoServerController.prototype.openUpdateVideoServer = function (isUpdate, data) {
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
                content: videoServerUpdatePopupHtml,
                scope: scope,
                area: ["500px"],
                end: function () {
                    scope.$destroy();
                    console.log("%c ==========start==============", "color:orange");
                    console.log('this.layer scope.$destroy();');
                    console.log("=========end===============");
                }
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        ;
        BaseConfigVideoServerController.prototype.closeLayer = function (index) {
            this.layer.close(index);
            return;
        };
        BaseConfigVideoServerController.prototype.setCurrentLayer = function (index) {
            this.currentLayer = index;
        };
        BaseConfigVideoServerController.prototype.getCurrentLayer = function () {
            return this.currentLayer;
        };
        BaseConfigVideoServerController.prototype.setTBodyList = function (result) {
            this.tBodyList = this.$filter('videoServerTypeFilter')(result, 'VideoServerType');
        };
        ;
        BaseConfigVideoServerController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
        };
        BaseConfigVideoServerController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigVideoServerController.prototype.changePageSize = function (num) {
            this.findListParams.currentPage = 1;
            this.findListParams.pageSize = num;
            this.getListByParams(this.findListParams);
        };
        BaseConfigVideoServerController.$inject = ['$scope', '$filter', '$timeout', '$controller', 'videoServerService', 'layer', 'areaService', 'casCadeService', 'proxyServerService'];
        return BaseConfigVideoServerController;
    }());
    main_app_1.app
        .controller('baseConfigVideoServerController', BaseConfigVideoServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvdmlkZW9TZXJ2ZXIvdmlkZW9TZXJ2ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUErQkE7UUFxQkkseUNBQW9CLE1BQVUsRUFBUyxPQUFXLEVBQVMsUUFBaUIsRUFBUyxXQUFlLEVBQ2hGLGFBQWlDLEVBQVUsS0FBUyxFQUFTLFdBQXdCLEVBQ3JGLGNBQStCLEVBQVMsa0JBQXNDO1lBRjlFLFdBQU0sR0FBTixNQUFNLENBQUk7WUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1lBQ2hGLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtZQUNyRixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7WUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1lBWmxHLDJCQUFzQixHQUFVLEVBQUUsQ0FBQztZQVFuQyxzQkFBaUIsR0FBc0IsRUFBRSxDQUFDO1lBUXRDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFDbEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHO1lBRXRDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUV0Qix3QkFBd0IsS0FBaUIsRUFBRSxNQUFhLEVBQUUsUUFBZTtnQkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBQyxjQUFjLENBQUMsQ0FBQztnQkFDL0Qs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WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBOVRNLHVDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxnQkFBZ0IsRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBK1RwSixzQ0FBQztLQW5WRCxBQW1WQyxJQUFBO0lBQ0QsY0FBRztTQUNFLFVBQVUsQ0FBQyxpQ0FBaUMsRUFBRSwrQkFBK0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3NlcnZlci92aWRlb1NlcnZlci92aWRlb1NlcnZlci5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3ZpZGVvU2VydmVyLnVwZGF0ZVBvcHVwLmh0bWxcIiBuYW1lPVwidmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3ZpZGVvU2VydmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgJy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2UnO1xyXG5cclxuaW1wb3J0ICcuL3ZpZGVvU2VydmVyLnVwZGF0ZVBvcHVwLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgXCIuLi9tYWluL3NlcnZlclR5cGUuZmlsdGVyXCJcclxuXHJcbmltcG9ydCB7SUFyZWFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUYWJsZUhlYWRlcn0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdW5pdC10YWJsZS90YWJsZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVmlkZW9TZXJ2ZXJTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3ZpZGVvU2VydmVyLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVHJlZURhdGFQYXJhbXMsIFRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7VmlkZW9TZXJ2ZXJMaXN0UGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvVmlkZW9TZXJ2ZXJQYXJhbXNcIjtcclxuaW1wb3J0IHtWaWRlb1NlcnZlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1ZpZGVvU2VydmVyXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtWaWRlb1NlcnZlckV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvVmlkZW9TZXJ2ZXJFeFwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge1RyZWVQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy90cmVlL1RyZWVQYXJhbXNcIjtcclxuaW1wb3J0IHtVcGRhdGVNb2RhbFBhcmFtc30gZnJvbSBcIi4uL21haW4vc2VydmVyVXBkYXRlTW9kYWwucGFyYW1zXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1Byb3h5U2VydmVyXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJMaXN0UGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvUHJveHlTZXJ2ZXJQYXJhbXNcIjtcclxuaW1wb3J0ICcuLi8uLi8uLi9jb21tb24vc2VydmljZXMvcHJveHlTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7SVByb3h5U2VydmVyU2VydmljZX0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5kZWNsYXJlIHZhciB2aWRlb1NlcnZlclVwZGF0ZVBvcHVwSHRtbDogYW55O1xyXG5kZWNsYXJlIHZhciBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBCYXNlQ29uZmlnVmlkZW9TZXJ2ZXJDb250cm9sbGVye1xyXG4gICAgdEhlYWRMaXN0OkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6QXJyYXk8VmlkZW9TZXJ2ZXI+O1xyXG4gICAgY3VycmVudExheWVyPzpudW1iZXI7XHJcblxyXG4gICAgLy8tLS0tLS0tLeWIhumhteaMh+S7pFxyXG4gICAgcGFnZVBhcmFtcyA6UGFnZVBhcmFtcztcclxuICAgIC8vLS0tLS0tLS0tXHJcbiAgICAvLyDpgInmi6nooYzmlL/ljLrln5/moJFcclxuICAgIGFyZWFUcmVlRGF0YXM6SVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcblxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dFN0cjpzdHJpbmcgPSBcIlwiO1xyXG4gICAgLy9hcmVhVHJlZVNlYXJjaElucHV0S2V5VXA6IEZ1bmN0aW9uO1xyXG5cclxuICAgIC8vIOWIl+ihqOiOt+WPluWPguaVsFxyXG4gICAgZmluZExpc3RQYXJhbXM6VmlkZW9TZXJ2ZXJMaXN0UGFyYW1zO1xyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDpBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0QWxsOmJvb2xlYW47XHJcbiAgICBwcm94eUxpc3RGb3JWaWRlbzpBcnJheTxQcm94eVNlcnZlcj4gPSBbXTtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCckZmlsdGVyJywnJHRpbWVvdXQnLCckY29udHJvbGxlcicsJ3ZpZGVvU2VydmVyU2VydmljZScsJ2xheWVyJywnYXJlYVNlcnZpY2UnLCdjYXNDYWRlU2VydmljZScsJ3Byb3h5U2VydmVyU2VydmljZSddO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6YW55LHByaXZhdGUgJGZpbHRlcjphbnkscHJpdmF0ZSAkdGltZW91dDpGdW5jdGlvbixwcml2YXRlICRjb250cm9sbGVyOmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc2VydmVyU2VydmljZTpJVmlkZW9TZXJ2ZXJTZXJ2aWNlLCBwcml2YXRlIGxheWVyOmFueSxwcml2YXRlIGFyZWFTZXJ2aWNlOklBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FzQ2FkZVNlcnZpY2U6IElDYXNDYWRlU2VydmljZSxwcml2YXRlIHByb3h5U2VydmVyU2VydmljZTpJUHJveHlTZXJ2ZXJTZXJ2aWNlKXtcclxuXHJcbiAgICAgICAgLy8g5qCR5YiX6KGo5pWw5o2uXHJcbiAgICAgICAgLy/liJ3lp4vljJYgYXJlYSDmoJHmlbDmja5cclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnYXJlYVRyZWVWaWRlbyc7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMub25DbGljayA9IHRyZWVTZWxlY3ROb2RlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSW5pdENvbXBsZXRlID0gKCkgPT57XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0TGlzdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOiKgueCuemAieaLqVxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTpBcmVhRXgpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiVjID09PT09PT09PT1zdGFydD09PT09PT09PT09PT09XCIsJ2NvbG9yOm9yYW5nZScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlSWQsIHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCI9PT09PT09PT1lbmQ9PT09PT09PT09PT09PT1cIiwpO1xyXG5cclxuICAgICAgICAgICAgaWYodHJlZU5vZGUuSUQgPT0gc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZCl7XHJcbiAgICAgICAgICAgICAgICBpZihzZWxmX3RoaXMudEJvZHlMaXN0KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9pbml0IHJlcV9wYXJhbXNcclxuICAgICAgICAgICAgbGV0IHJlcV9wYXJhbXM6VmlkZW9TZXJ2ZXJMaXN0UGFyYW1zID0gc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zO1xyXG4gICAgICAgICAgICByZXFfcGFyYW1zLmFyZWFJZCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICByZXFfcGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhyZXFfcGFyYW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFByb3h5TGlzdCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0QXJlYVRyZWVMaXN0KCk7XHJcblxyXG4gICAgICAgIGxldCBzZWxmX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignY2xvc2VTZXJ2ZXJVcGRhdGVNb2RlbCcsIGZ1bmN0aW9uIChldmVuOmFueSxkYXRhOntpc0NvbW1pdDpib29sZWFufSkge1xyXG4gICAgICAgICAgICBpZihkYXRhLmlzQ29tbWl0KXtcclxuICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMoc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmX3RoaXMuY2xvc2VMYXllcihzZWxmX3RoaXMuZ2V0Q3VycmVudExheWVyKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoc2VsZl90aGlzLmxheWVyKXtcclxuICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgcHJpdmF0ZSBpbml0UHJveHlMaXN0KCl7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBQcm94eVNlcnZlckxpc3RQYXJhbXMoKTtcclxuICAgICAgICBwYXJhbXMudHlwZSA9ICdJb2RTZXJ2ZXInO1xyXG4gICAgICAgIHBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VTaXplID0gMTAwO1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXMocGFyYW1zKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlMaXN0Rm9yVmlkZW8gPSByZXMuZGF0YS5SZXN1bHQgYXMgQXJyYXk8UHJveHlTZXJ2ZXI+O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tIOagkeWIlyDmk43kvZzlh73mlbBcclxuICAgIC8vIOaVsOaNruiOt+WPllxyXG4gICAgZ2V0QXJlYVRyZWVMaXN0KGtleXdvcmQ/OnN0cmluZyl7XHJcbiAgICAgICAgbGV0IHBhcmFtczpUcmVlUGFyYW1zID0gdGhpcy5hcmVhVHJlZURhdGFzLnJlcVBhcmFtcztcclxuICAgICAgICBwYXJhbXMua2V5d29yZCA9IGtleXdvcmQ7XHJcbiAgICAgICAgdGhpcy5hcmVhU2VydmljZS5maW5kTGlzdFRyZWUocGFyYW1zKS50aGVuKChyZXNwOkFycmF5PEFyZWFFeD4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3Ape1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyZWFUcmVlRGF0YXMocmVzcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTphbnkpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xyXG4gICAgICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXQoKXtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuICAgIC8vIOagkei1i+WAvFxyXG4gICAgc2V0QXJlYVRyZWVEYXRhcyh0cmVlRGF0YXM6IEFycmF5PEFyZWFFeD4pe1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMgPSB0cmVlRGF0YXM7XHJcbiAgICB9O1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyDliJ3lp4vljJbliJfooajmlbDmja5cclxuICAgIGluaXRMaXN0UGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IFZpZGVvU2VydmVyTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5wYWdlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy50SGVhZExpc3QgPSAgW1xyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIk5hbWVcIiwgdGl0bGU6IFwi5ZCN56ewXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIklwQWRkcmVzc1wiLCB0aXRsZTogXCJJUOWcsOWdgFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIuerr+WPo1wifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJWaWRlb1NlcnZlclR5cGVcIiwgdGl0bGU6IFwi5pyN5Yqh5Zmo57G75Z6LXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIuaPj+i/sFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJidXR0b25zXCIsIHRpdGxlOiBcIuaTjeS9nFwifSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSAnVmlkZW9TZXJ2ZXJUeXBlJztcclxuICAgIH07XHJcblxyXG4gICAgX2dldENhc0NhZGVTZWFyY2hQYXJhbXModGFibGVQYXJhbXM6IFZpZGVvU2VydmVyTGlzdFBhcmFtcyl7XHJcbiAgICAgICAgaWYoIXRhYmxlUGFyYW1zKSByZXR1cm4ge30gYXMgQ2FzQ2FkZVNlYXJjaFBhcmFtcztcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VJbmRleCA9IHRhYmxlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHJlc3VsdC5vcmRlckZpZWxkID0gdGFibGVQYXJhbXMuc29ydE5hbWU7XHJcbiAgICAgICAgcmVzdWx0LnBhZ2VTaXplID0gdGFibGVQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgcmVzdWx0LmFyZWFJZCA9IHRhYmxlUGFyYW1zLmFyZWFJZDtcclxuICAgICAgICByZXN1bHQuaXNBc2MgPSB0YWJsZVBhcmFtcy5pc0FzYztcclxuICAgICAgICAvLyByZXN1bHQubmFtZSA9IHRhYmxlUGFyYW1zLmFyZWFOYW1lO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOagueaNrmZpbkxpc3RQYXJhbXM6SUZpbmRWaWRlb1NlcnZlckxpc3RQYXJhbXMg6I635Y+W5YiX6KGoXHJcbiAgICBnZXRMaXN0QnlQYXJhbXMocGFyYW1zOlZpZGVvU2VydmVyTGlzdFBhcmFtcyl7XHJcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcclxuICAgICAgICB0aGlzLmNhc0NhZGVTZXJ2aWNlLmZpbmRWaWRlb1NlcnZlckxpc3QodGhpcy5fZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyhwYXJhbXMpKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEFycmF5PFZpZGVvU2VydmVyPj4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRDdXJyZW50UGFnZShwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRQYWdlU2l6ZShwYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRCb2R5TGlzdChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5Y2V5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkKF9pbmRleDpWaWRlb1NlcnZlcil7XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShcIuehruWumuWIoOmZpOivpeadoemfs+mikeS7o+eQhumFjee9ruWQlz9cIiwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwoaW5kZXg6IG51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZShfaW5kZXguSUQsaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGVsZXRlKGlkOnN0cmluZyxsYXllck51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5kZWxldGVCeUlkKGlkKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGxheWVyTnVtKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeafkOS4gOadoeaVsOaNrlxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMjEgMTk6NDM6MDdcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBhZnRlckNoYW5nZUNoZWNrKHJlc3VsdExpc3Q6QXJyYXk8Ym9vbGVhbj4saXNDaGVja0FsbDpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOkFycmF5PFZpZGVvU2VydmVyPntcclxuICAgICAgICBsZXQgcGVyc29uTGlzdDpBcnJheTxWaWRlb1NlcnZlcj4gPSBbXTtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdCl7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0LmZvckVhY2goKHBlcnNvbjpWaWRlb1NlcnZlcixpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbkxpc3QucHVzaChwZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBlcnNvbkxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5aSa5Liq5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkcygpe1xyXG4gICAgICAgIGxldCBwZXJzb25MaXN0OkFycmF5PFZpZGVvU2VydmVyPiA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgaWYoISBwZXJzb25MaXN0IHx8IHBlcnNvbkxpc3QubGVuZ3RoID09MCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCI9PT09PT09PT09PT1cIixcIuW9k+WJjeacqumAieaLqeaVsOaNrlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAgICAgcGVyc29uTGlzdC5mb3JFYWNoKChzZXJ2ZXI6VmlkZW9TZXJ2ZXIpPT57XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKHNlcnZlci5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNob3dUZXh0ID0gJ+ehruWumuWIoOmZpOW9k+WJjemAieS4reeahCAnICsgaWRzLmxlbmd0aCArICcg5p2h6Z+z6aKR5Luj55CG6YWN572u5ZCXPyc7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICB9LChpbmRleDogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGVCeUlkcyhpZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXREZWxldGVCeUlkcyhpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLmRlbGV0ZUJ5SWRzKGlkcykudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxzdHJpbmc+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPTE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZFZpZGVvU2VydmVyKCl7XHJcblxyXG4gICAgICAgIGxldCBzY29wZTphbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgbGV0IHVwZGF0ZU1vZGFsUGFyYW1zOlVwZGF0ZU1vZGFsUGFyYW1zPFZpZGVvU2VydmVyPiA9IG5ldyBVcGRhdGVNb2RhbFBhcmFtczxWaWRlb1NlcnZlcj4oKTtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5kZWZhdWx0RGF0YXMuYXJlYUlkID0gdGhpcy5maW5kTGlzdFBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMuaXNVcGRhdGUgPSBmYWxzZTtcclxuICAgICAgICBzY29wZS51cGRhdGVNb2RhbFBhcmFtcyA9IHVwZGF0ZU1vZGFsUGFyYW1zO1xyXG4gICAgICAgIHNjb3BlLnByb3h5TGlzdEZvclZpZGVvID0gdGhpcy5wcm94eUxpc3RGb3JWaWRlbztcclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSAn5paw5bu65pyN5Yqh5ZmoJztcclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTpbdGl0bGVTdHIsJ3RleHQtYWxpZ246IGNlbnRlcjsnXSxcclxuICAgICAgICAgICAgY29udGVudDogdmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICB9KS50aGVuKChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExheWVyKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZpbmRCeUlkKGlkOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZlclNlcnZpY2UuZmluZEJ5SWQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlcnZlcihtb2RlbD86VmlkZW9TZXJ2ZXIpOnZvaWR7XHJcbiAgICAgICAgY29uc29sZS5sb2cobW9kZWwpO1xyXG4gICAgICAgIHRoaXMuZmluZEJ5SWQobW9kZWwuSUQpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8VmlkZW9TZXJ2ZXJFeD4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuVXBkYXRlVmlkZW9TZXJ2ZXIodHJ1ZSxyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG9wZW5VcGRhdGVWaWRlb1NlcnZlcihpc1VwZGF0ZTpib29sZWFuLGRhdGE/OlZpZGVvU2VydmVyKXtcclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCB1cGRhdGVNb2RhbFBhcmFtczpVcGRhdGVNb2RhbFBhcmFtczxWaWRlb1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8VmlkZW9TZXJ2ZXI+KCk7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMuZGVmYXVsdERhdGFzLmFyZWFJZCA9IHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmlzVXBkYXRlID0gdHJ1ZTtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy51cGRhdGVNb2RlbCA9IGRhdGE7XHJcbiAgICAgICAgc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMgPSB1cGRhdGVNb2RhbFBhcmFtcztcclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSBpc1VwZGF0ZT8n57yW6L6R5pyN5Yqh5ZmoJzon5paw5bu65pyN5Yqh5ZmoJztcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTpbdGl0bGVTdHIsJ3RleHQtYWxpZ246IGNlbnRlcjsnXSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHZpZGVvU2VydmVyVXBkYXRlUG9wdXBIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgPT09PT09PT09PXN0YXJ0PT09PT09PT09PT09PT1cIixcImNvbG9yOm9yYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5sYXllciBzY29wZS4kZGVzdHJveSgpOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09ZW5kPT09PT09PT09PT09PT09XCIsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbigoaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGF5ZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VMYXllcihpbmRleDpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgIHJldHVybiA7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudExheWVyKGluZGV4Om51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllciA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRMYXllcigpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VEJvZHlMaXN0KHJlc3VsdDpBcnJheTxWaWRlb1NlcnZlcj4pIHtcclxuICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IHRoaXMuJGZpbHRlcigndmlkZW9TZXJ2ZXJUeXBlRmlsdGVyJykocmVzdWx0LCdWaWRlb1NlcnZlclR5cGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5Y2V5qCP6YCJ5oup5o6S5bqPXHJcbiAgICBzb3J0QnlGaWVsZChfaW5kZXg6bnVtYmVyLGZpZWxkOnN0cmluZyxzb3J0U3RhdHVzOmJvb2xlYW4pe1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9hYm91dCBwYWdlIGNsaWNrXHJcbiAgICBjaGFuZ2VQYWdlKG51bTpudW1iZXIpe1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcbn1cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ1ZpZGVvU2VydmVyQ29udHJvbGxlcicsIEJhc2VDb25maWdWaWRlb1NlcnZlckNvbnRyb2xsZXIpOyJdfQ==
