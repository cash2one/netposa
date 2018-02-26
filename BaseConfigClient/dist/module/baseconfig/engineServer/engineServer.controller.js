define(["require", "exports", "text!./engineServer.updateServer.html", "text!./engineNode.updateNode.html", "../../common/app/main.app", "../../../core/params/EngineNodeParams", "../../common/directive/page/page-params", "angular", "css!../css/baseconfig-engine.css", "css!../css/baseconfig-area.css", "css!../style/baseconfig-area.css", "css!../css/baseconfig-serve.css", "css!../style/baseconfig-area.css", "../../common/services/engineServerServer.service", "../../common/services/engineNodeServer.service", "./engineServer.updateServer.controller", "./engineNode.updateNode.controller"], function (require, exports, engineServerUpdateServerHtml, engineNodeUpdateNodeHtml, main_app_1, EngineNodeParams_1, page_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseConfigEngineServerController = (function () {
        function BaseConfigEngineServerController($scope, $timeout, $controller, engineServerServer, layer, $filter, i18nFactory, engineNodeServer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.engineServerServer = engineServerServer;
            this.layer = layer;
            this.$filter = $filter;
            this.i18nFactory = i18nFactory;
            this.engineNodeServer = engineNodeServer;
            this.engineServerList = new Array();
            this.engineServerNoData = false;
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_ENGINESERVER_14" },
                { field: "IpAddress", title: "DP_CONFIG_ENGINESERVER_15" },
                { field: "Port", title: "DP_CONFIG_ENGINESERVER_16" },
                { field: "Description", title: "DP_CONFIG_ENGINESERVER_17" },
                { field: "buttons", title: "DP_CONFIG_ENGINESERVER_18" }
            ];
            this.nodeHeadList = [
                { field: "IpAddress", title: "DP_CONFIG_ENGINESERVER_03" }
            ];
            this.isSelectItems = false;
            this.pageParams = new page_params_1.default();
            this.findListParams = new EngineNodeParams_1.EngineNodeParams();
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.initEngineServerListParams();
            var self_this = this;
            this.$scope.$on('closeEngineNodeUpdateModel', function (even, data) {
                if (data.isCommit) {
                    self_this.initEngineNodeListParams(self_this.findListParams);
                }
                self_this.closeLayer(self_this.getCurrentLayer());
            });
            this.$scope.$on('closeEngineServerUpdateModel', function (even, data) {
                if (data.isCommit) {
                    self_this.initEngineServerListParams();
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
        BaseConfigEngineServerController.prototype.addOrUpdateEngineServer = function (isUpdate) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = isUpdate;
            scope.updateData = isUpdate ? this.currentServer : '';
            var titleStr = isUpdate ? '编辑引擎服务' : '新建引擎服务';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: engineServerUpdateServerHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        BaseConfigEngineServerController.prototype.updateEngineNode = function (node) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = true;
            scope.updateData = node;
            var titleStr = '编辑引擎节点服务';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: engineNodeUpdateNodeHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        BaseConfigEngineServerController.prototype.addEngineNode = function () {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = false;
            scope.updateData = '';
            scope.engineServerID = this.currentServer.ID;
            var titleStr = '新建引擎节点服务';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: engineNodeUpdateNodeHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        BaseConfigEngineServerController.prototype.deleteById = function () {
            var _this = this;
            var _index = this.currentServer;
            this.layer.confirm(this.i18nFactory('DP_CONFIG_ENGINESERVER_19'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDelete(_index.ID, index);
            });
        };
        BaseConfigEngineServerController.prototype.submitDelete = function (id, layerNum) {
            var _this = this;
            this.engineServerServer.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.initEngineServerListParams();
                    _this.layer.close(layerNum);
                }
            });
        };
        BaseConfigEngineServerController.prototype.deleteNodeById = function (_index) {
            var _this = this;
            this.layer.confirm(this.i18nFactory('DP_CONFIG_ENGINESERVER_20'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteNode(_index.ID, index);
            });
        };
        BaseConfigEngineServerController.prototype.submitDeleteNode = function (id, layerNum) {
            var _this = this;
            this.engineNodeServer.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.initEngineNodeListParams(_this.findListParams);
                    _this.layer.close(layerNum);
                }
            });
        };
        BaseConfigEngineServerController.prototype.deleteByIds = function () {
            var _this = this;
            var selectedDataList = this.getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                return;
            }
            var ids = [];
            selectedDataList.forEach(function (server) {
                ids.push(server.ID);
            });
            var showText = '确定删除当前选中的 ' + ids.length + ' 条代理服务配置吗?';
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                area: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteByIds(ids);
            });
        };
        BaseConfigEngineServerController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.engineNodeList.forEach(function (data, index) {
                    if (_this.selectedList[index]) {
                        selectedDataList.push(data);
                    }
                });
            }
            return selectedDataList;
        };
        ;
        BaseConfigEngineServerController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.engineNodeServer.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.findListParams.currentPage = 1;
                    _this.initEngineNodeListParams(_this.findListParams);
                }
                else {
                }
            });
        };
        ;
        BaseConfigEngineServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        BaseConfigEngineServerController.prototype.setIsSelectItems = function (items) {
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
        BaseConfigEngineServerController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.initEngineNodeListParams(this.findListParams);
            this.tHeadList[_index].isAsc = sortStatus;
        };
        BaseConfigEngineServerController.prototype.closeLayer = function (index) {
            return this.layer.close(index);
        };
        BaseConfigEngineServerController.prototype.setCurrentLayer = function (index) {
            this.currentLayer = index;
        };
        BaseConfigEngineServerController.prototype.getCurrentLayer = function () {
            return this.currentLayer;
        };
        BaseConfigEngineServerController.prototype.initEngineServerListParams = function () {
            var _this = this;
            this.engineServerServer.findAll().then(function (resp) {
                if (resp.code == 200 && resp.data) {
                    _this.setEngineServerList(resp.data);
                    if (!resp.data || resp.data.length == 0) {
                        _this.engineServerNoData = true;
                    }
                    if (resp.data.length > 0) {
                        _this.currentServer = resp.data[0];
                        _this.findListParams.engineServerId = resp.data[0].ID;
                        _this.initEngineNodeListParams(_this.findListParams);
                    }
                }
            });
        };
        ;
        BaseConfigEngineServerController.prototype.choiceEngineServer = function (even, server) {
            this.currentServer = server;
            var divs = even.currentTarget.parentNode.parentNode.getElementsByClassName("engine-server-list-div");
            for (var index = 0; index < divs.length; index++) {
                divs[index].style.color = "#333";
                ;
            }
            even.currentTarget.parentNode.style.color = "#427bff";
        };
        BaseConfigEngineServerController.prototype.setEngineServerList = function (result) {
            this.engineServerList = result;
        };
        ;
        BaseConfigEngineServerController.prototype.setEngineNodeList = function (result) {
            this.engineNodeList = result;
        };
        ;
        BaseConfigEngineServerController.prototype.initEngineNodeListParams = function (params) {
            var _this = this;
            this.engineNodeServer.findListByParams(params).then(function (resp) {
                if (resp.code == 200 && resp.data) {
                    _this.pageParams.setCurrentPage(params.currentPage);
                    _this.pageParams.setTotalCount(resp.data.TotalCount);
                    _this.setEngineNodeList(resp.data.Result);
                    _this.findListParams = params;
                }
            });
        };
        ;
        BaseConfigEngineServerController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.initEngineNodeListParams(this.findListParams);
        };
        BaseConfigEngineServerController.prototype.changePageSize = function (num) {
            this.findListParams.pageSize = num;
            this.findListParams.currentPage = 1;
            this.initEngineNodeListParams(this.findListParams);
        };
        BaseConfigEngineServerController.$inject = ['$scope', '$timeout', '$controller', 'engineServerServer', 'layer', '$filter', 'i18nFactory', 'engineNodeServer'];
        return BaseConfigEngineServerController;
    }());
    main_app_1.app.controller('baseConfigEngineServerController', BaseConfigEngineServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbmdpbmVTZXJ2ZXIvZW5naW5lU2VydmVyLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBd0JBO1FBeUJJLDBDQUNZLE1BQVcsRUFDWCxRQUFrQixFQUNsQixXQUFnQixFQUNoQixrQkFBdUMsRUFDdkMsS0FBVSxFQUNWLE9BQVksRUFDWixXQUFnQixFQUNoQixnQkFBbUM7WUFQbkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsZ0JBQVcsR0FBWCxXQUFXLENBQUs7WUFDaEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBSztZQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7WUEvQi9DLHFCQUFnQixHQUF3QixJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUNsRSx1QkFBa0IsR0FBWSxLQUFLLENBQUM7WUFpQzVCLElBQUksQ0FBQyxTQUFTLEdBQUc7Z0JBQ2IsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtnQkFDckQsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtnQkFDMUQsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtnQkFDckQsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtnQkFDNUQsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTthQUMzRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRztnQkFDaEIsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTthQUM3RCxD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Q0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ25ELEtBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3BELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxLQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztnQkFFakMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUFBLENBQUM7UUFHRixxREFBVSxHQUFWLFVBQVcsR0FBVTtZQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7WUFDdEMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxDQUFDO1FBRUQseURBQWMsR0FBZCxVQUFlLEdBQVU7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBU3ZELENBQUM7UUE1VE0sd0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUErVHhJLHVDQUFDO0tBdlZELEFBdVZDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxFQUFFLGdDQUFnQyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvZW5naW5lU2VydmVyL2VuZ2luZVNlcnZlci5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2VuZ2luZVNlcnZlci51cGRhdGVTZXJ2ZXIuaHRtbFwiIG5hbWU9XCJlbmdpbmVTZXJ2ZXJVcGRhdGVTZXJ2ZXJIdG1sXCIgLz5cclxuLy8vIDxhbWQtZGVwZW5kZW5jeSBwYXRoPVwidGV4dCEuL2VuZ2luZU5vZGUudXBkYXRlTm9kZS5odG1sXCIgbmFtZT1cImVuZ2luZU5vZGVVcGRhdGVOb2RlSHRtbFwiIC8+XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL2Jhc2Vjb25maWctZW5naW5lLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi4vY3NzL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLXNlcnZlLmNzc1wiO1xyXG5pbXBvcnQgXCJjc3MhLi4vc3R5bGUvYmFzZWNvbmZpZy1hcmVhLmNzc1wiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvZW5naW5lU2VydmVyU2VydmVyLnNlcnZpY2VcIlxyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvZW5naW5lTm9kZVNlcnZlci5zZXJ2aWNlXCJcclxuaW1wb3J0IFwiLi9lbmdpbmVTZXJ2ZXIudXBkYXRlU2VydmVyLmNvbnRyb2xsZXJcIlxyXG5pbXBvcnQgXCIuL2VuZ2luZU5vZGUudXBkYXRlTm9kZS5jb250cm9sbGVyXCJcclxuaW1wb3J0IHsgSUVuZ2luZVNlcnZlclNlcnZlciB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9lbmdpbmVTZXJ2ZXJTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElFbmdpbmVOb2RlU2VydmVyIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2VuZ2luZU5vZGVTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgeyBFbmdpbmVTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRW5naW5lU2VydmVyXCI7XHJcbmltcG9ydCB7IEVuZ2luZU5vZGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRW5naW5lTm9kZVwiO1xyXG5pbXBvcnQgeyBFbmdpbmVOb2RlUGFyYW1zIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL0VuZ2luZU5vZGVQYXJhbXNcIjtcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQgeyBJVGFibGVIZWFkZXIgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS91bml0LXRhYmxlL3RhYmxlLXBhcmFtc1wiO1xyXG5kZWNsYXJlIGxldCBlbmdpbmVTZXJ2ZXJVcGRhdGVTZXJ2ZXJIdG1sOiBhbnk7XHJcbmRlY2xhcmUgbGV0IGVuZ2luZU5vZGVVcGRhdGVOb2RlSHRtbDogYW55O1xyXG5jbGFzcyBCYXNlQ29uZmlnRW5naW5lU2VydmVyQ29udHJvbGxlciB7XHJcbiAgICAvLyDlvJXmk47mnI3liqHliJfooahcclxuICAgIGVuZ2luZVNlcnZlckxpc3Q6IEFycmF5PEVuZ2luZVNlcnZlcj4gPSBuZXcgQXJyYXk8RW5naW5lU2VydmVyPigpO1xyXG4gICAgZW5naW5lU2VydmVyTm9EYXRhOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICAvL+i/h+a7pOadoeS7tlxyXG4gICAgZmluZExpc3RQYXJhbXM6IEVuZ2luZU5vZGVQYXJhbXM7XHJcbiAgICAvLyDlvJXmk47oioLngrnliJfooahcclxuICAgIGVuZ2luZU5vZGVMaXN0OiBBcnJheTxFbmdpbmVOb2RlPjtcclxuICAgIC8vIHRhYmxlIOWIl+ihqOaVsOaNrlxyXG4gICAgdEhlYWRMaXN0OiBBcnJheTxJVGFibGVIZWFkZXI+O1xyXG4gICAgbm9kZUhlYWRMaXN0OkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICAvLy0tLS0tLS0t5YiG6aG15oyH5LukXHJcbiAgICBwYWdlUGFyYW1zOiBQYWdlUGFyYW1zO1xyXG4gICAgLy/lvZPliY3pgInmi6nnmoRlbmdpbmXmnI3liqEgIOWIneWni+WMlumhtemdouaXtu+8jOm7mOiupOeCueWHu+esrOS4gOS4qlxyXG4gICAgY3VycmVudFNlcnZlcjpFbmdpbmVTZXJ2ZXI7XHJcbiAgICAvLy0tLS0tLS0tLVxyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDpBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0QWxsOmJvb2xlYW47XHJcbiAgICAvLyBhbHRlciB3eXI6IOeUqOS6juWIpOaWreW9k+WJjeeVjOmdouS4iueahOWIl+ihqOaYr+WQpuiiq+mAieS4rVxyXG4gICAgaXNTZWxlY3RJdGVtczogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgLy/lvLnlh7rlsYLnmoRpZFxyXG4gICAgY3VycmVudExheWVyPzpudW1iZXI7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRjb250cm9sbGVyJywgJ2VuZ2luZVNlcnZlclNlcnZlcicsICdsYXllcicsICckZmlsdGVyJywgJ2kxOG5GYWN0b3J5JywgJ2VuZ2luZU5vZGVTZXJ2ZXInXTtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSAkY29udHJvbGxlcjogYW55LFxyXG4gICAgICAgIHByaXZhdGUgZW5naW5lU2VydmVyU2VydmVyOiBJRW5naW5lU2VydmVyU2VydmVyLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlICRmaWx0ZXI6IGFueSxcclxuICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBlbmdpbmVOb2RlU2VydmVyOiBJRW5naW5lTm9kZVNlcnZlcikge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8tLS0tLS0tLS0tLS0t6KGo5qC85pWw5o2u5Yid5aeL5YyWXHJcbiAgICAgICAgICAgIHRoaXMudEhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19FTkdJTkVTRVJWRVJfMTRcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJJcEFkZHJlc3NcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0VOR0lORVNFUlZFUl8xNVwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIlBvcnRcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0VOR0lORVNFUlZFUl8xNlwiIH0sXHJcbiAgICAgICAgICAgICAgICB7IGZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19FTkdJTkVTRVJWRVJfMTdcIiB9LFxyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJidXR0b25zXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19FTkdJTkVTRVJWRVJfMThcIiB9XHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUhlYWRMaXN0ID0gW1xyXG4gICAgICAgICAgICAgICAgeyBmaWVsZDogXCJJcEFkZHJlc3NcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0VOR0lORVNFUlZFUl8wM1wiIH1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IEVuZ2luZU5vZGVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdEVuZ2luZVNlcnZlckxpc3RQYXJhbXMoKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZUVuZ2luZU5vZGVVcGRhdGVNb2RlbCcsIGZ1bmN0aW9uIChldmVuOmFueSxkYXRhOntpc0NvbW1pdDpib29sZWFufSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoZGF0YS5pc0NvbW1pdCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMuaW5pdEVuZ2luZU5vZGVMaXN0UGFyYW1zKHNlbGZfdGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZl90aGlzLmNsb3NlTGF5ZXIoc2VsZl90aGlzLmdldEN1cnJlbnRMYXllcigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJ2Nsb3NlRW5naW5lU2VydmVyVXBkYXRlTW9kZWwnLCBmdW5jdGlvbiAoZXZlbjphbnksZGF0YTp7aXNDb21taXQ6Ym9vbGVhbn0pIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGRhdGEuaXNDb21taXQpe1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5pbml0RW5naW5lU2VydmVyTGlzdFBhcmFtcygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZl90aGlzLmNsb3NlTGF5ZXIoc2VsZl90aGlzLmdldEN1cnJlbnRMYXllcigpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaWYoc2VsZl90aGlzLmxheWVyKXtcclxuICAgICAgICAgICAgICAgIHNlbGZfdGhpcy5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIGFkZE9yVXBkYXRlRW5naW5lU2VydmVyKGlzVXBkYXRlOmJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlzVXBkYXRlID0gaXNVcGRhdGU7XHJcbiAgICAgICAgc2NvcGUudXBkYXRlRGF0YSA9IGlzVXBkYXRlP3RoaXMuY3VycmVudFNlcnZlcjonJztcclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSBpc1VwZGF0ZT8n57yW6L6R5byV5pOO5pyN5YqhJzon5paw5bu65byV5pOO5pyN5YqhJztcclxuICAgICAgICB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGVTdHIsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGVuZ2luZVNlcnZlclVwZGF0ZVNlcnZlckh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICB9KS50aGVuKChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExheWVyKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVFbmdpbmVOb2RlKG5vZGU6RW5naW5lTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY29wZTphbnkgPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuaXNVcGRhdGUgPSB0cnVlO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZURhdGEgPSBub2RlO1xyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9ICfnvJbovpHlvJXmk47oioLngrnmnI3liqEnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogZW5naW5lTm9kZVVwZGF0ZU5vZGVIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIl0sXHJcbiAgICAgICAgfSkudGhlbigoaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYXllcihpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRW5naW5lTm9kZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlzVXBkYXRlID0gZmFsc2U7XHJcbiAgICAgICAgc2NvcGUudXBkYXRlRGF0YSA9ICcnO1xyXG4gICAgICAgIHNjb3BlLmVuZ2luZVNlcnZlcklEID0gdGhpcy5jdXJyZW50U2VydmVyLklEO1xyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9ICfmlrDlu7rlvJXmk47oioLngrnmnI3liqEnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogZW5naW5lTm9kZVVwZGF0ZU5vZGVIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIl0sXHJcbiAgICAgICAgfSkudGhlbigoaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYXllcihpbmRleCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ljZXliKDpmaRcclxuICAgIGRlbGV0ZUJ5SWQoKXtcclxuICAgICAgICB2YXIgX2luZGV4ID0gdGhpcy5jdXJyZW50U2VydmVyO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybSh0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfRU5HSU5FU0VSVkVSXzE5JyksIHtcclxuICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICB9LChpbmRleDogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGUoX2luZGV4LklELGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZShpZDpzdHJpbmcsbGF5ZXJOdW06bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmVuZ2luZVNlcnZlclNlcnZlci5kZWxldGVCeUlkKGlkKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PGFueT4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RW5naW5lU2VydmVyTGlzdFBhcmFtcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShsYXllck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WNleWIoOmZpG5vZGVcclxuICAgIGRlbGV0ZU5vZGVCeUlkKF9pbmRleDpFbmdpbmVOb2RlKXtcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0VOR0lORVNFUlZFUl8yMCcpLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwoaW5kZXg6IG51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZU5vZGUoX2luZGV4LklELGluZGV4KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHN1Ym1pdERlbGV0ZU5vZGUoaWQ6c3RyaW5nLGxheWVyTnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5lbmdpbmVOb2RlU2VydmVyLmRlbGV0ZUJ5SWQoaWQpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8YW55Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRFbmdpbmVOb2RlTGlzdFBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UobGF5ZXJOdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lpJrkuKrliKDpmaRub2RlXHJcbiAgICBkZWxldGVCeUlkcygpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OkFycmF5PEVuZ2luZU5vZGU+ID0gdGhpcy5nZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICBpZighc2VsZWN0ZWREYXRhTGlzdCB8fCBzZWxlY3RlZERhdGFMaXN0Lmxlbmd0aCA9PTApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICBzZWxlY3RlZERhdGFMaXN0LmZvckVhY2goKHNlcnZlcjpFbmdpbmVOb2RlKT0+e1xyXG4gICAgICAgICAgICBpZHMucHVzaChzZXJ2ZXIuSUQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzaG93VGV4dCA9ICfnoa7lrprliKDpmaTlvZPliY3pgInkuK3nmoQgJyArIGlkcy5sZW5ndGggKyAnIOadoeS7o+eQhuacjeWKoemFjee9ruWQlz8nO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY29uZmlybShzaG93VGV4dCwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCIsXCIyMDBweFwiXVxyXG4gICAgICAgIH0sKGluZGV4OiBudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUJ5SWRzKGlkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTpBcnJheTxFbmdpbmVOb2RlPntcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDpBcnJheTxFbmdpbmVOb2RlPiA9IFtdO1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRMaXN0KXtcclxuICAgICAgICAgICAgdGhpcy5lbmdpbmVOb2RlTGlzdC5mb3JFYWNoKChkYXRhOkVuZ2luZU5vZGUsaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZExpc3RbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgc3VibWl0RGVsZXRlQnlJZHMoaWRzOkFycmF5PHN0cmluZz4pe1xyXG4gICAgICAgIHRoaXMuZW5naW5lTm9kZVNlcnZlci5kZWxldGVCeUlkcyhpZHMpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8c3RyaW5nPik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0xO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0RW5naW5lTm9kZUxpc3RQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAieaLqeafkOS4gOadoeaVsOaNrlxyXG4gICAgICogQHRpbWU6IDIwMTctMDQtMjEgMTk6NDM6MDdcclxuICAgICAqIEBwYXJhbXM6XHJcbiAgICAgKiBAcmV0dXJuOlxyXG4gICAgICovXHJcbiAgICBhZnRlckNoYW5nZUNoZWNrKHJlc3VsdExpc3Q6QXJyYXk8Ym9vbGVhbj4saXNDaGVja0FsbDpib29sZWFuKTp2b2lke1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRvciB6amg6IOWIpOaWreWSjOiuvue9ruW9k+WJjeWIl+ihqOaYr+WQpuaciemAieS4reeahOWFg+e0oFxyXG4gICAgICogQHBhcmFtIGl0ZW1zXHJcbiAgICAgKi9cclxuICAgIHNldElzU2VsZWN0SXRlbXMoaXRlbXM6IEFycmF5PGJvb2xlYW4+KXtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcbiAgICAgICAgaWYoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIGxldCBpLGxlbjtcclxuICAgICAgICAgICAgZm9yKGk9MCxsZW49aXRlbXMubGVuZ3RoO2k8bGVuO2krKyl7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtc1tpXSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLmlzU2VsZWN0SXRlbXMgIT09IHJlc3VsdCl7XHJcbiAgICAgICAgICAgIHRoaXMuaXNTZWxlY3RJdGVtcyA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc29ydEJ5RmllbGQoX2luZGV4Om51bWJlcixmaWVsZDpzdHJpbmcsc29ydFN0YXR1czpib29sZWFuKXtcclxuXHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5pc0FzYyA9IHNvcnRTdGF0dXM7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5zb3J0TmFtZSA9IGZpZWxkO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRFbmdpbmVOb2RlTGlzdFBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdFtfaW5kZXhdLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZUxheWVyKGluZGV4Om51bWJlcik6YW55e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50TGF5ZXIoaW5kZXg6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVyID0gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExheWVyKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyDliJ3lp4vljJblvJXmk47mnI3liqHliJfooajmlbDmja5cclxuICAgIGluaXRFbmdpbmVTZXJ2ZXJMaXN0UGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuZW5naW5lU2VydmVyU2VydmVyLmZpbmRBbGwoKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxBcnJheTxFbmdpbmVTZXJ2ZXI+PikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RW5naW5lU2VydmVyTGlzdChyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXNwLmRhdGEgfHwgcmVzcC5kYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmdpbmVTZXJ2ZXJOb0RhdGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYocmVzcC5kYXRhLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZXIgPSByZXNwLmRhdGFbMF07Ly/pobXpnaLliJ3lp4vljJbvvIzpu5jorqTpgInmi6nnrKzkuIDkuKpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmVuZ2luZVNlcnZlcklkID0gcmVzcC5kYXRhWzBdLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdEVuZ2luZU5vZGVMaXN0UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuICAgIGNob2ljZUVuZ2luZVNlcnZlcihldmVuOmFueSxzZXJ2ZXI6RW5naW5lU2VydmVyKXtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZXIgPSBzZXJ2ZXI7XHJcbiAgICAgICAgbGV0IGRpdnMgPSBldmVuLmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlbmdpbmUtc2VydmVyLWxpc3QtZGl2XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkaXZzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBkaXZzW2luZGV4XS5zdHlsZS5jb2xvcj1cIiMzMzNcIjs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGV2ZW4uY3VycmVudFRhcmdldC5wYXJlbnROb2RlLnN0eWxlLmNvbG9yPVwiIzQyN2JmZlwiO1xyXG4gICAgfVxyXG4gICAgc2V0RW5naW5lU2VydmVyTGlzdChyZXN1bHQ6IEFycmF5PEVuZ2luZVNlcnZlcj4pIHtcclxuICAgICAgICAvLyB0aGlzLnRCb2R5TGlzdCA9IHRoaXMuJGZpbHRlcigncHJveHlTZXJ2ZXJUeXBlRmlsdGVyJykocmVzdWx0LCdQcm94eVNlcnZlclR5cGUnKTtcclxuICAgICAgICB0aGlzLmVuZ2luZVNlcnZlckxpc3QgPSByZXN1bHQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHNldEVuZ2luZU5vZGVMaXN0KHJlc3VsdDogQXJyYXk8RW5naW5lTm9kZT4pIHtcclxuICAgICAgICAvLyB0aGlzLnRCb2R5TGlzdCA9IHRoaXMuJGZpbHRlcigncHJveHlTZXJ2ZXJUeXBlRmlsdGVyJykocmVzdWx0LCdQcm94eVNlcnZlclR5cGUnKTtcclxuICAgICAgICB0aGlzLmVuZ2luZU5vZGVMaXN0ID0gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyDliJ3lp4vljJboioLngrnmnI3liqHliJfooajmlbDmja5cclxuICAgIGluaXRFbmdpbmVOb2RlTGlzdFBhcmFtcyhwYXJhbXM6IEVuZ2luZU5vZGVQYXJhbXMpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVuZ2luZU5vZGVTZXJ2ZXIuZmluZExpc3RCeVBhcmFtcyhwYXJhbXMpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PFBhZ2VSZXN1bHQ8RW5naW5lTm9kZT4+KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT0gMjAwICYmIHJlc3AuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zLnNldEN1cnJlbnRQYWdlKHBhcmFtcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuc2V0VG90YWxDb3VudChyZXNwLmRhdGEuVG90YWxDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVuZ2luZU5vZGVMaXN0KHJlc3AuZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IHBhcmFtcztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmluaXRFbmdpbmVOb2RlTGlzdFBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuaW5pdEVuZ2luZU5vZGVMaXN0UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIC8vIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcykudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXNwKVxyXG4gICAgICAgIC8vICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRQYWdlU2l6ZSh0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuZGF0YS5Ub3RhbENvdW50KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0VEJvZHlMaXN0KHJlc3AuZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoJ2Jhc2VDb25maWdFbmdpbmVTZXJ2ZXJDb250cm9sbGVyJywgQmFzZUNvbmZpZ0VuZ2luZVNlcnZlckNvbnRyb2xsZXIpOyJdfQ==
