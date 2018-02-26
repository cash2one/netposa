define(["require", "exports", "text!./videoServer.updatePopup.html", "../../common/directive/page/page-params", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/params/VideoServerParams", "../../common/types/serverUpdateModal.params", "../../common/services/casecade.service", "../../../core/enum/VideoServerType", "../../../core/params/ProxyServerParams", "css!../css/baseconfig-serve.css", "css!../style/baseconfig-area.css", "angular", "../../common/services/videoServer.service", "../../common/services/area.service", "./videoServer.updatePopup.controller", "../../common/services/proxyServer.service"], function (require, exports, videoServerUpdatePopupHtml, page_params_1, main_app_1, tree_params_1, VideoServerParams_1, serverUpdateModal_params_1, casecade_service_1, VideoServerType_1, ProxyServerParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigVideoServerController = (function () {
        function BaseConfigVideoServerController($scope, $filter, $timeout, $controller, serverService, layer, areaService, casCadeService, proxyServerService, i18nFactory) {
            this.$scope = $scope;
            this.$filter = $filter;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.serverService = serverService;
            this.layer = layer;
            this.areaService = areaService;
            this.casCadeService = casCadeService;
            this.proxyServerService = proxyServerService;
            this.i18nFactory = i18nFactory;
            this.areaTreeSearchInputStr = "";
            this.proxyListForVideo = [];
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeVideo';
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
            this.initProxyList();
            function treeInitComplete() {
            }
            this.getAreaTreeList();
            var self_this = this;
            this.$scope.$on('closeServerUpdateModel', function (even, isCommit) {
                self_this.closeLayer(self_this.getCurrentLayer());
                console.log(isCommit);
                if (isCommit) {
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
        BaseConfigVideoServerController.prototype.initProxyList = function () {
            var _this = this;
            var params = new ProxyServerParams_1.ProxyServerListParams();
            params.type = 'VideoServer';
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
                { field: "Name", title: "DP_CONFIG_COMMON_03" },
                { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03" },
                { field: "Port", title: "DP_CONFIG_COMMON_11" },
                { field: "VideoServerType", title: "DP_CONFIG_PROXYSERVER_04" },
                { field: "Description", title: "DP_CONFIG_COMMON_34" },
                { field: "buttons", title: "DP_CONFIG_COMMON_35" },
            ];
            this.findListParams.sortName = 'VideoServerType';
            this.isSelectItems = false;
            this.videoServerTypeObj = {};
            for (var key in VideoServerType_1.VideoServerType) {
                this.videoServerTypeObj[VideoServerType_1.VideoServerType[key].value] = VideoServerType_1.VideoServerType[key].text;
            }
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
            this.layer.confirm(this.i18nFactory('DP_CONFIG_VIDEOSERVER_01'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(_index.ID, index, _index.VideoServerType, _index);
            });
        };
        BaseConfigVideoServerController.prototype.submitDelete = function (id, layerNum, type, pvgJSON) {
            var _this = this;
            if (type == "PVG") {
                this.serverService.isHasTask([id]).then(function (resp) {
                    if (resp.code == 200 && resp.status == "SUCCESS") {
                        var respData = resp.data;
                        var falseName = "";
                        if (respData.hasOwnProperty(id) && respData[id]) {
                            falseName = pvgJSON[respData].Name;
                            _this.layer.open({
                                title: '提示',
                                content: '服务器:<strong>' + falseName + '</strong>有任务正在运行,不能删除!'
                            });
                            return;
                        }
                        _this.deleteVideo(id, layerNum);
                    }
                    else {
                        _this.layer.open({
                            title: '警告',
                            content: '系统异常，请联系管理员!'
                        });
                    }
                });
            }
            else {
                this.deleteVideo(id, layerNum);
            }
        };
        BaseConfigVideoServerController.prototype.deleteVideo = function (id, layerNum) {
            var _this = this;
            this.serverService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.$timeout(function () {
                        _this.getListByParams(_this.findListParams);
                    }, 1000);
                    _this.layer.close(layerNum);
                }
            });
        };
        BaseConfigVideoServerController.prototype.synchronize = function (item) {
            var _this = this;
            this.layer.confirm("\u786E\u5B9A\u540C\u6B65\u6B64\u670D\u52A1\u5668" + item.Name + "?", {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                iod: ["500px", "200px"]
            }, function (index) {
                console.log(item, "同步服务器");
                _this.serverService.synchronize(item.ID).then(function (res) {
                    console.log(res);
                });
                _this.layer.close(index);
            });
        };
        BaseConfigVideoServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
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
                return;
            }
            var ids = [];
            var pvgIds = [];
            var pvgJSON = {};
            personList.forEach(function (server) {
                ids.push(server.ID);
                if (server.VideoServerType == "PVG") {
                    pvgIds.push(server.ID);
                    pvgJSON[server.ID] = server;
                }
            });
            var showText = '确定删除当前选中的 ' + ids.length + ' 条视频服务器配置吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids, pvgIds, pvgJSON);
            });
        };
        BaseConfigVideoServerController.prototype.submitDeleteByIds = function (ids, pvgIds, pvgJSON) {
            var _this = this;
            if (pvgIds.length != 0) {
                this.serverService.isHasTask(pvgIds).then(function (resp) {
                    if (resp.code == 200 && resp.status == "SUCCESS") {
                        var respData = resp.data;
                        if (respData) {
                            var falseName = "";
                            for (var index = 0; index < pvgIds.length; index++) {
                                var pvgId = pvgIds[index];
                                if (respData.hasOwnProperty(pvgId) && respData[pvgId]) {
                                    falseName = falseName + pvgJSON[pvgId].Name + "、";
                                }
                            }
                            if (falseName == "") {
                                _this.deleteVideos(ids);
                            }
                            else {
                                falseName = falseName.substring(0, falseName.length - 1);
                                _this.layer.open({
                                    title: '提示',
                                    content: '服务器:<strong>' + falseName + '</strong>有任务正在运行,不能删除!'
                                });
                            }
                        }
                    }
                    else {
                        _this.layer.open({
                            title: '警告',
                            content: '服务器发生异常，请联系管理员!'
                        });
                    }
                });
            }
            else {
                this.deleteVideos(ids);
            }
        };
        ;
        BaseConfigVideoServerController.prototype.deleteVideos = function (ids) {
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
                title: titleStr,
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
            scope.proxyListForVideo = this.proxyListForVideo;
            var titleStr = isUpdate ? '编辑服务器' : '新建服务器';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: videoServerUpdatePopupHtml,
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
            this.tBodyList = result;
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
        BaseConfigVideoServerController.prototype.setIsSelectItems = function (items) {
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
        BaseConfigVideoServerController.$inject = ['$scope', '$filter', '$timeout', '$controller', 'videoServerService', 'layer', 'areaService', 'casCadeService', 'proxyServerService', 'i18nFactory'];
        return BaseConfigVideoServerController;
    }());
    main_app_1.app
        .controller('baseConfigVideoServerController', BaseConfigVideoServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1NlcnZlci92aWRlb1NlcnZlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlDQTtRQXVCSSx5Q0FBb0IsTUFBVSxFQUFTLE9BQVcsRUFBUyxRQUFpQixFQUFTLFdBQWUsRUFDaEYsYUFBaUMsRUFBVSxLQUFTLEVBQVMsV0FBd0IsRUFDckYsY0FBK0IsRUFBUyxrQkFBc0MsRUFBUyxXQUFlO1lBRnRHLFdBQU0sR0FBTixNQUFNLENBQUk7WUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1lBQ2hGLGtCQUFhLEdBQWIsYUFBYSxDQUFvQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtZQUNyRixtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7WUFBUyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUk7WUFkMUgsMkJBQXNCLEdBQVUsRUFBRSxDQUFDO1lBVW5DLHNCQUFpQixHQUFzQixFQUFFLENBQUM7WUFRdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRXRCLHdCQUF3QixLQUFpQixFQUFFLE1BQWEsRUFBRSxRQUFlO2dCQUNyRSxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsRUFB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QUFDLENBQUMsQ0FBQSxDQUFDO3dCQUNULE1BQU0sR0FBRyxJQUFJLENBQUM7d0JBQ2QsS0FBSyxDQUFDO29CQUNWLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDO1FBcmFNLHVDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsb0JBQW9CLEVBQUMsT0FBTyxFQUFDLGFBQWEsRUFBQyxnQkFBZ0IsRUFBQyxvQkFBb0IsRUFBQyxhQUFhLENBQUMsQ0FBQztRQXNhbEssc0NBQUM7S0E1YkQsQUE0YkMsSUFBQTtJQUNELGNBQUc7U0FDRSxVQUFVLENBQUMsaUNBQWlDLEVBQUUsK0JBQStCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy92aWRlb1NlcnZlci92aWRlb1NlcnZlci5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL3ZpZGVvU2VydmVyLnVwZGF0ZVBvcHVwLmh0bWxcIiBuYW1lPVwidmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cEh0bWxcIiAvPlxyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL2Jhc2Vjb25maWctc2VydmUuY3NzXCI7XHJcbmltcG9ydCBcImNzcyEuLi9zdHlsZS9iYXNlY29uZmlnLWFyZWEuY3NzXCI7XHJcbmltcG9ydCBQYWdlUGFyYW1zIGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3BhZ2UvcGFnZS1wYXJhbXNcIjtcclxuZGVjbGFyZSB2YXIgcmVxdWlyZTphbnk7XHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvdmlkZW9TZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcblxyXG5pbXBvcnQgJy4vdmlkZW9TZXJ2ZXIudXBkYXRlUG9wdXAuY29udHJvbGxlcic7XHJcblxyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVGFibGVIZWFkZXJ9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmltcG9ydCB7SVZpZGVvU2VydmVyU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy92aWRlb1NlcnZlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEYXRhUGFyYW1zLCBUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1ZpZGVvU2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1ZpZGVvU2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCB7VmlkZW9TZXJ2ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9WaWRlb1NlcnZlclwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7VmlkZW9TZXJ2ZXJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1ZpZGVvU2VydmVyRXhcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtUcmVlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcbmltcG9ydCB7VXBkYXRlTW9kYWxQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vdHlwZXMvc2VydmVyVXBkYXRlTW9kYWwucGFyYW1zXCI7XHJcbmltcG9ydCB7SUNhc0NhZGVTZXJ2aWNlLCBDYXNDYWRlU2VhcmNoUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nhc2VjYWRlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtWaWRlb1NlcnZlclR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVmlkZW9TZXJ2ZXJUeXBlXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Qcm94eVNlcnZlclwiO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1Byb3h5U2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQge0lQcm94eVNlcnZlclNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wcm94eVNlcnZlci5zZXJ2aWNlJztcclxuZGVjbGFyZSB2YXIgdmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cEh0bWw6IGFueTtcclxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgQmFzZUNvbmZpZ1ZpZGVvU2VydmVyQ29udHJvbGxlcntcclxuICAgIHRIZWFkTGlzdDpBcnJheTxJVGFibGVIZWFkZXI+O1xyXG4gICAgdEJvZHlMaXN0OkFycmF5PFZpZGVvU2VydmVyPjtcclxuICAgIGN1cnJlbnRMYXllcj86bnVtYmVyO1xyXG5cclxuICAgIC8vLS0tLS0tLS3liIbpobXmjIfku6RcclxuICAgIHBhZ2VQYXJhbXMgOlBhZ2VQYXJhbXM7XHJcbiAgICAvLy0tLS0tLS0tLVxyXG4gICAgLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBhcmVhVHJlZURhdGFzOklUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG5cclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRTdHI6c3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAvLyDliJfooajojrflj5blj4LmlbBcclxuICAgIGZpbmRMaXN0UGFyYW1zOlZpZGVvU2VydmVyTGlzdFBhcmFtcztcclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6QXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDpib29sZWFuO1xyXG4gICAgLy8gYWx0ZXIgd3lyOiDnlKjkuo7liKTmlq3lvZPliY3nlYzpnaLkuIrnmoTliJfooajmmK/lkKbooqvpgInkuK1cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcbiAgICB2aWRlb1NlcnZlclR5cGVPYmo6IHtba2V5OnN0cmluZ106c3RyaW5nfTtcclxuICAgIHByb3h5TGlzdEZvclZpZGVvOkFycmF5PFByb3h5U2VydmVyPiA9IFtdO1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJyRmaWx0ZXInLCckdGltZW91dCcsJyRjb250cm9sbGVyJywndmlkZW9TZXJ2ZXJTZXJ2aWNlJywnbGF5ZXInLCdhcmVhU2VydmljZScsJ2Nhc0NhZGVTZXJ2aWNlJywncHJveHlTZXJ2ZXJTZXJ2aWNlJywnaTE4bkZhY3RvcnknXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxwcml2YXRlICRmaWx0ZXI6YW55LHByaXZhdGUgJHRpbWVvdXQ6RnVuY3Rpb24scHJpdmF0ZSAkY29udHJvbGxlcjphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHNlcnZlclNlcnZpY2U6SVZpZGVvU2VydmVyU2VydmljZSwgcHJpdmF0ZSBsYXllcjphbnkscHJpdmF0ZSBhcmVhU2VydmljZTpJQXJlYVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNhc0NhZGVTZXJ2aWNlOiBJQ2FzQ2FkZVNlcnZpY2UscHJpdmF0ZSBwcm94eVNlcnZlclNlcnZpY2U6SVByb3h5U2VydmVyU2VydmljZSxwcml2YXRlIGkxOG5GYWN0b3J5OmFueSl7XHJcblxyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIC8v5Yid5aeL5YyWIGFyZWEg5qCR5pWw5o2uXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlVmlkZW8nO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLm9uQ2xpY2sgPSB0cmVlU2VsZWN0Tm9kZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUluaXRDb21wbGV0ZSA9IHRyZWVJbml0Q29tcGxldGU7XHJcbiAgICAgICAgdGhpcy5pbml0TGlzdFBhcmFtcygpO1xyXG4gICAgICAgIC8vIOiKgueCuemAieaLqVxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6c3RyaW5nLCB0cmVlTm9kZTpBcmVhRXgpe1xyXG4gICAgICAgICAgICBpZih0cmVlTm9kZS5JRCA9PSBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkKXtcclxuICAgICAgICAgICAgICAgIGlmKHNlbGZfdGhpcy50Qm9keUxpc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVxX3BhcmFtczpWaWRlb1NlcnZlckxpc3RQYXJhbXMgPSBzZWxmX3RoaXMuZmluZExpc3RQYXJhbXM7XHJcbiAgICAgICAgICAgIHJlcV9wYXJhbXMuYXJlYUlkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHJlcV9wYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICBzZWxmX3RoaXMuZ2V0TGlzdEJ5UGFyYW1zKHJlcV9wYXJhbXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRQcm94eUxpc3QoKTtcclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKCl7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCgpO1xyXG5cclxuICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlU2VydmVyVXBkYXRlTW9kZWwnLCBmdW5jdGlvbiAoZXZlbjphbnksIGlzQ29tbWl0OiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZUxheWVyKHNlbGZfdGhpcy5nZXRDdXJyZW50TGF5ZXIoKSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlzQ29tbWl0KVxyXG4gICAgICAgICAgICBpZihpc0NvbW1pdCl7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5nZXRMaXN0QnlQYXJhbXMoc2VsZl90aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH0sMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHNlbGZfdGhpcy5sYXllcil7XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgaW5pdFByb3h5TGlzdCgpe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgUHJveHlTZXJ2ZXJMaXN0UGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLnR5cGUgPSAnVmlkZW9TZXJ2ZXInO1xyXG4gICAgICAgIHBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VTaXplID0gMTAwO1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXMocGFyYW1zKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlMaXN0Rm9yVmlkZW8gPSByZXMuZGF0YS5SZXN1bHQgYXMgQXJyYXk8UHJveHlTZXJ2ZXI+O1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tIOagkeWIlyDmk43kvZzlh73mlbBcclxuICAgIC8vIOaVsOaNruiOt+WPllxyXG4gICAgZ2V0QXJlYVRyZWVMaXN0KGtleXdvcmQ/OnN0cmluZyl7XHJcbiAgICAgICAgbGV0IHBhcmFtczpUcmVlUGFyYW1zID0gdGhpcy5hcmVhVHJlZURhdGFzLnJlcVBhcmFtcztcclxuICAgICAgICBwYXJhbXMua2V5d29yZCA9IGtleXdvcmQ7XHJcbiAgICAgICAgdGhpcy5hcmVhU2VydmljZS5maW5kTGlzdFRyZWUocGFyYW1zKS50aGVuKChyZXNwOkFycmF5PEFyZWFFeD4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3Ape1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFyZWFUcmVlRGF0YXMocmVzcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9O1xyXG4gICAgLy8g5qCR5pCc57SiXHJcbiAgICBhcmVhVHJlZVNlYXJjaElucHV0S2V5VXAoZTphbnkpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xyXG4gICAgICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXQoKXtcclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgfTtcclxuICAgIC8vIOagkei1i+WAvFxyXG4gICAgc2V0QXJlYVRyZWVEYXRhcyh0cmVlRGF0YXM6IEFycmF5PEFyZWFFeD4pe1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlRGF0YXMgPSB0cmVlRGF0YXM7XHJcbiAgICB9O1xyXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyDliJ3lp4vljJbliJfooajmlbDmja5cclxuICAgIGluaXRMaXN0UGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IFZpZGVvU2VydmVyTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkID0gJyc7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gdGhpcy5wYWdlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy50SGVhZExpc3QgPSAgW1xyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIk5hbWVcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8wM1wifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJJcEFkZHJlc3NcIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BST1hZU0VSVkVSXzAzXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIlBvcnRcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8xMVwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJWaWRlb1NlcnZlclR5cGVcIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BST1hZU0VSVkVSXzA0XCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMzRcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiYnV0dG9uc1wiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzM1XCJ9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9ICdWaWRlb1NlcnZlclR5cGUnO1xyXG5cclxuICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy52aWRlb1NlcnZlclR5cGVPYmogPSB7fSBhcyB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcclxuICAgICAgICAvLyDliJ3lp4vljJYg57G75Z6L6YCJ5oupXHJcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gVmlkZW9TZXJ2ZXJUeXBlKXtcclxuICAgICAgICAgICAgdGhpcy52aWRlb1NlcnZlclR5cGVPYmpbVmlkZW9TZXJ2ZXJUeXBlW2tleV0udmFsdWVdID0gVmlkZW9TZXJ2ZXJUeXBlW2tleV0udGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIF9nZXRDYXNDYWRlU2VhcmNoUGFyYW1zKHRhYmxlUGFyYW1zOiBWaWRlb1NlcnZlckxpc3RQYXJhbXMpe1xyXG4gICAgICAgIGlmKCF0YWJsZVBhcmFtcykgcmV0dXJuIHt9IGFzIENhc0NhZGVTZWFyY2hQYXJhbXM7XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSBuZXcgQ2FzQ2FkZVNlYXJjaFBhcmFtcygpO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlSW5kZXggPSB0YWJsZVBhcmFtcy5jdXJyZW50UGFnZTtcclxuICAgICAgICByZXN1bHQub3JkZXJGaWVsZCA9IHRhYmxlUGFyYW1zLnNvcnROYW1lO1xyXG4gICAgICAgIHJlc3VsdC5wYWdlU2l6ZSA9IHRhYmxlUGFyYW1zLnBhZ2VTaXplO1xyXG4gICAgICAgIHJlc3VsdC5hcmVhSWQgPSB0YWJsZVBhcmFtcy5hcmVhSWQ7XHJcbiAgICAgICAgcmVzdWx0LmlzQXNjID0gdGFibGVQYXJhbXMuaXNBc2M7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcblxyXG4gICAgLy8g5qC55o2uZmluTGlzdFBhcmFtczpJRmluZFZpZGVvU2VydmVyTGlzdFBhcmFtcyDojrflj5bliJfooahcclxuICAgIGdldExpc3RCeVBhcmFtcyhwYXJhbXM6VmlkZW9TZXJ2ZXJMaXN0UGFyYW1zKXtcclxuICAgICAgICB0aGlzLmNhc0NhZGVTZXJ2aWNlLmZpbmRWaWRlb1NlcnZlckxpc3QodGhpcy5fZ2V0Q2FzQ2FkZVNlYXJjaFBhcmFtcyhwYXJhbXMpKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEFycmF5PFZpZGVvU2VydmVyPj4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VQYXJhbXMgPSBuZXcgUGFnZVBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRDdXJyZW50UGFnZShwYXJhbXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRQYWdlU2l6ZShwYXJhbXMucGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgcGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gcGFnZVBhcmFtcztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRCb2R5TGlzdChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIC8v5Y2V5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkKF9pbmRleDpWaWRlb1NlcnZlcil7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19WSURFT1NFUlZFUl8wMScpLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwoaW5kZXg6IG51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlKF9pbmRleC5JRCxpbmRleCxfaW5kZXguVmlkZW9TZXJ2ZXJUeXBlLF9pbmRleCApO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGVsZXRlKGlkOnN0cmluZyxsYXllck51bTpudW1iZXIsdHlwZTpzdHJpbmcscHZnSlNPTjpWaWRlb1NlcnZlcil7XHJcbiAgICAgICAgaWYodHlwZT09XCJQVkdcIil7XHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5pc0hhc1Rhc2soW2lkXSkudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCYmcmVzcC5zdGF0dXMgPT1cIlNVQ0NFU1NcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3BEYXRhID0gcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWxzZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BEYXRhLmhhc093blByb3BlcnR5KGlkKSYmcmVzcERhdGFbaWRdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2VOYW1lID0gcHZnSlNPTltyZXNwRGF0YV0uTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmnI3liqHlmag6PHN0cm9uZz4nK2ZhbHNlTmFtZSsnPC9zdHJvbmc+5pyJ5Lu75Yqh5q2j5Zyo6L+Q6KGMLOS4jeiDveWIoOmZpCEnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVZpZGVvKGlkLGxheWVyTnVtKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJ+ezu+e7n+W8guW4uO+8jOivt+iBlOezu+euoeeQhuWRmCEnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7ICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlVmlkZW8oaWQsbGF5ZXJOdW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkZWxldGVWaWRlbyhpZDpzdHJpbmcsbGF5ZXJOdW06bnVtYmVyKXtcclxuICAgICAgICAvL3B2Z+eahOacjeWKoe+8jOayoeacieato+WcqOaJp+ihjOeahOS7u+WKoeWQju+8jOaJjeiDveWIoOmZpFxyXG4gICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5kZWxldGVCeUlkKGlkKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UobGF5ZXJOdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3luY2hyb25pemUoaXRlbTpWaWRlb1NlcnZlcil7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKGDnoa7lrprlkIzmraXmraTmnI3liqHlmagke2l0ZW0uTmFtZX0/YCwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBpb2Q6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtLFwi5ZCM5q2l5pyN5Yqh5ZmoXCIpXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5zeW5jaHJvbml6ZShpdGVtLklEKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5p+Q5LiA5p2h5pWw5o2uXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0yMSAxOTo0MzowN1xyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDpBcnJheTxib29sZWFuPixpc0NoZWNrQWxsOmJvb2xlYW4pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdEl0ZW1zKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOkFycmF5PFZpZGVvU2VydmVyPntcclxuICAgICAgICBsZXQgcGVyc29uTGlzdDpBcnJheTxWaWRlb1NlcnZlcj4gPSBbXTtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdCl7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0LmZvckVhY2goKHBlcnNvbjpWaWRlb1NlcnZlcixpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdFtpbmRleF0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbkxpc3QucHVzaChwZXJzb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBlcnNvbkxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5aSa5Liq5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkcygpe1xyXG4gICAgICAgIGxldCBwZXJzb25MaXN0OkFycmF5PFZpZGVvU2VydmVyPiA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgaWYoISBwZXJzb25MaXN0IHx8IHBlcnNvbkxpc3QubGVuZ3RoID09MCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGlkczpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgbGV0IHB2Z0lkczpBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICAgICAgbGV0IHB2Z0pTT04gPSB7fVxyXG4gICAgICAgIHBlcnNvbkxpc3QuZm9yRWFjaCgoc2VydmVyOlZpZGVvU2VydmVyKT0+e1xyXG4gICAgICAgICAgICBpZHMucHVzaChzZXJ2ZXIuSUQpO1xyXG4gICAgICAgICAgICBpZihzZXJ2ZXIuVmlkZW9TZXJ2ZXJUeXBlID09IFwiUFZHXCIpe1xyXG4gICAgICAgICAgICAgICAgcHZnSWRzLnB1c2goc2VydmVyLklEKTtcclxuICAgICAgICAgICAgICAgIHB2Z0pTT05bc2VydmVyLklEXSA9IHNlcnZlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzaG93VGV4dCA9ICfnoa7lrprliKDpmaTlvZPliY3pgInkuK3nmoQgJyArIGlkcy5sZW5ndGggKyAnIOadoeinhumikeacjeWKoeWZqOmFjee9ruWQlz8nO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShzaG93VGV4dCwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCIsXCIyMDBweFwiXVxyXG4gICAgICAgIH0sKGluZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkcyxwdmdJZHMscHZnSlNPTik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGVsZXRlQnlJZHMoaWRzOkFycmF5PHN0cmluZz4scHZnSWRzOkFycmF5PHN0cmluZz4scHZnSlNPTjp7fSl7XHJcbiAgICAgICAgaWYocHZnSWRzLmxlbmd0aCE9MCl7XHJcbiAgICAgICAgICAgIC8vcHZn55qE5pyN5Yqh77yM5rKh5pyJ5q2j5Zyo5omn6KGM55qE5Lu75Yqh5ZCO77yM5omN6IO95Yig6ZmkXHJcbiAgICAgICAgICAgIHRoaXMuc2VydmVyU2VydmljZS5pc0hhc1Rhc2socHZnSWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEpTT04+KT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCYmcmVzcC5zdGF0dXMgPT1cIlNVQ0NFU1NcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3BEYXRhICA9IHJlc3AuZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXNwRGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmYWxzZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHZnSWRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHZnSWQgPSBwdmdJZHNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzcERhdGEuaGFzT3duUHJvcGVydHkocHZnSWQpJiZyZXNwRGF0YVtwdmdJZF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlTmFtZSA9IGZhbHNlTmFtZSArIHB2Z0pTT05bcHZnSWRdLk5hbWUgKyBcIuOAgVwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWxzZU5hbWUgPT1cIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVZpZGVvcyhpZHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlTmFtZSA9IGZhbHNlTmFtZS5zdWJzdHJpbmcoMCxmYWxzZU5hbWUubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50OiAn5pyN5Yqh5ZmoOjxzdHJvbmc+JytmYWxzZU5hbWUrJzwvc3Ryb25nPuacieS7u+WKoeato+WcqOi/kOihjCzkuI3og73liKDpmaQhJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+itpuWRiicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICfmnI3liqHlmajlj5HnlJ/lvILluLjvvIzor7fogZTns7vnrqHnkIblkZghJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pOyAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmRlbGV0ZVZpZGVvcyhpZHMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZGVsZXRlVmlkZW9zKGlkczpBcnJheTxzdHJpbmc+KXtcclxuICAgICAgICB0aGlzLnNlcnZlclNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRWaWRlb1NlcnZlcigpe1xyXG5cclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIGxldCB1cGRhdGVNb2RhbFBhcmFtczpVcGRhdGVNb2RhbFBhcmFtczxWaWRlb1NlcnZlcj4gPSBuZXcgVXBkYXRlTW9kYWxQYXJhbXM8VmlkZW9TZXJ2ZXI+KCk7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMuZGVmYXVsdERhdGFzLmFyZWFJZCA9IHRoaXMuZmluZExpc3RQYXJhbXMuYXJlYUlkO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMgPSB1cGRhdGVNb2RhbFBhcmFtcztcclxuICAgICAgICBzY29wZS5wcm94eUxpc3RGb3JWaWRlbyA9IHRoaXMucHJveHlMaXN0Rm9yVmlkZW87XHJcbiAgICAgICAgbGV0IHRpdGxlU3RyID0gJ+aWsOW7uuacjeWKoeWZqCc7XHJcbiAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlU3RyLFxyXG4gICAgICAgICAgICBjb250ZW50OiB2aWRlb1NlcnZlclVwZGF0ZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCJdLFxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGF5ZXIoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmluZEJ5SWQoaWQ6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmVyU2VydmljZS5maW5kQnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VydmVyKG1vZGVsPzpWaWRlb1NlcnZlcik6dm9pZHtcclxuICAgICAgICB0aGlzLmZpbmRCeUlkKG1vZGVsLklEKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PFZpZGVvU2VydmVyRXg+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblVwZGF0ZVZpZGVvU2VydmVyKHRydWUscmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuVXBkYXRlVmlkZW9TZXJ2ZXIoaXNVcGRhdGU6Ym9vbGVhbixkYXRhPzpWaWRlb1NlcnZlcil7XHJcbiAgICAgICAgbGV0IHNjb3BlOmFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBsZXQgdXBkYXRlTW9kYWxQYXJhbXM6VXBkYXRlTW9kYWxQYXJhbXM8VmlkZW9TZXJ2ZXI+ID0gbmV3IFVwZGF0ZU1vZGFsUGFyYW1zPFZpZGVvU2VydmVyPigpO1xyXG4gICAgICAgIHVwZGF0ZU1vZGFsUGFyYW1zLmRlZmF1bHREYXRhcy5hcmVhSWQgPSB0aGlzLmZpbmRMaXN0UGFyYW1zLmFyZWFJZDtcclxuICAgICAgICB1cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSA9IHRydWU7XHJcbiAgICAgICAgdXBkYXRlTW9kYWxQYXJhbXMudXBkYXRlTW9kZWwgPSBkYXRhO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zID0gdXBkYXRlTW9kYWxQYXJhbXM7XHJcbiAgICAgICAgc2NvcGUucHJveHlMaXN0Rm9yVmlkZW8gPSB0aGlzLnByb3h5TGlzdEZvclZpZGVvO1xyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9IGlzVXBkYXRlPyfnvJbovpHmnI3liqHlmagnOifmlrDlu7rmnI3liqHlmagnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOnRpdGxlU3RyLFxyXG4gICAgICAgICAgICBjb250ZW50OiB2aWRlb1NlcnZlclVwZGF0ZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCJdLFxyXG4gICAgICAgICAgICBlbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkudGhlbigoaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYXllcihpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlTGF5ZXIoaW5kZXg6bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICByZXR1cm4gO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnJlbnRMYXllcihpbmRleDpudW1iZXIpOnZvaWR7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGF5ZXIgPSBpbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDdXJyZW50TGF5ZXIoKTpudW1iZXJ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudExheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRCb2R5TGlzdChyZXN1bHQ6QXJyYXk8VmlkZW9TZXJ2ZXI+KSB7XHJcbiAgICAgICAgLy8gdGhpcy50Qm9keUxpc3QgPSB0aGlzLiRmaWx0ZXIoJ3ZpZGVvU2VydmVyVHlwZUZpbHRlcicpKHJlc3VsdCwnVmlkZW9TZXJ2ZXJUeXBlJyk7XHJcbiAgICAgICAgdGhpcy50Qm9keUxpc3QgPSByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvLyDljZXmoI/pgInmi6nmjpLluo9cclxuICAgIHNvcnRCeUZpZWxkKF9pbmRleDpudW1iZXIsZmllbGQ6c3RyaW5nLHNvcnRTdGF0dXM6Ym9vbGVhbil7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuc29ydE5hbWUgPSBmaWVsZDtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcblxyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlUGFnZVNpemUobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPil7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgaSxsZW47XHJcbiAgICAgICAgICAgIGZvcihpPTAsbGVuPWl0ZW1zLmxlbmd0aDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ2Jhc2VDb25maWdWaWRlb1NlcnZlckNvbnRyb2xsZXInLCBCYXNlQ29uZmlnVmlkZW9TZXJ2ZXJDb250cm9sbGVyKTsiXX0=
