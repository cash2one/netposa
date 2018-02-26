define(["require", "exports", "text!./proxyServer.updateModal.html", "../../../common/app/main.app", "../../../common/directive/page/page-params", "../../../../core/params/ProxyServerParams", "angular", "../../../common/services/proxyServer.service", "../main/serverType.filter", "./proxyServer.updateModal.controller"], function (require, exports, proxyServerUpdateModalHtml, main_app_1, page_params_1, ProxyServerParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProxyServerController = (function () {
        function ProxyServerController($scope, $timeout, $controller, proxyServerService, layer, $filter) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.proxyServerService = proxyServerService;
            this.layer = layer;
            this.$filter = $filter;
            this.pageParams = new page_params_1.default();
            this.findListParams = new ProxyServerParams_1.ProxyServerListParams();
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.tHeadList = [
                { field: "Name", title: "名称" },
                { field: "IpAddress", title: "IP地址" },
                { field: "Port", title: "端口" },
                { field: "ProxyServerType", title: "服务器类型" },
                { field: "Description", title: "描述" },
                { field: "buttons", title: "操作" },
            ];
            this.getListByParams(this.findListParams);
            var self_this = this;
            this.$scope.$on('closeProxyServerUpdateModel', function (even, data) {
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
        ProxyServerController.prototype.deleteById = function (_index) {
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
        ProxyServerController.prototype.submitDelete = function (id, layerNum) {
            var _this = this;
            this.proxyServerService.deleteById(id).then(function (resp) {
                if (resp.code == 200) {
                    _this.getListByParams(_this.findListParams);
                    _this.layer.close(layerNum);
                }
                else {
                }
            });
        };
        ProxyServerController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            console.log(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        ;
        ProxyServerController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (data, index) {
                    if (_this.selectedList[index]) {
                        selectedDataList.push(data);
                    }
                });
            }
            return selectedDataList;
        };
        ;
        ProxyServerController.prototype.deleteByIds = function () {
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
        ProxyServerController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.proxyServerService.deleteByIds(ids).then(function (resp) {
                if (resp.code == 200) {
                    _this.findListParams.currentPage = 1;
                    _this.getListByParams(_this.findListParams);
                }
                else {
                }
            });
        };
        ;
        ProxyServerController.prototype.addVideoServer = function () {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = false;
            var titleStr = '新建服务器';
            this.layer.open({
                type: 1,
                title: [titleStr, 'text-align: center;'],
                content: proxyServerUpdateModalHtml,
                scope: scope,
                area: ["500px"],
            }).then(function (index) {
                _this.setCurrentLayer(index);
            });
        };
        ProxyServerController.prototype.findById = function (id) {
            return this.proxyServerService.findById(id);
        };
        ProxyServerController.prototype.updateServer = function (model) {
            var _this = this;
            console.log(model);
            this.findById(model.ID).then(function (resp) {
                console.log(resp);
                if (resp.code == 200) {
                    _this.openUpdateVideoServer(true, resp.data);
                }
                else {
                }
            });
        };
        ;
        ProxyServerController.prototype.openUpdateVideoServer = function (isUpdate, data) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = isUpdate;
            scope.updateData = data;
            var titleStr = isUpdate ? '编辑服务器' : '新建服务器';
            this.layer.open({
                type: 1,
                title: [titleStr, 'text-align: center;'],
                content: proxyServerUpdateModalHtml,
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
        ProxyServerController.prototype.closeLayer = function (index) {
            return this.layer.close(index);
        };
        ProxyServerController.prototype.setCurrentLayer = function (index) {
            this.currentLayer = index;
        };
        ProxyServerController.prototype.getCurrentLayer = function () {
            return this.currentLayer;
        };
        ProxyServerController.prototype.setTBodyList = function (result) {
            this.tBodyList = this.$filter('proxyServerTypeFilter')(result, 'ProxyServerType');
        };
        ;
        ProxyServerController.prototype.getListByParams = function (params) {
            var _this = this;
            this.proxyServerService.findListByParams(params).then(function (resp) {
                if (resp.code == 200 && resp.data) {
                    _this.pageParams.setCurrentPage(params.currentPage);
                    _this.pageParams.setTotalCount(resp.data.TotalCount);
                    _this.setTBodyList(resp.data.Result);
                    _this.findListParams = params;
                }
            });
        };
        ;
        ProxyServerController.prototype.sortByField = function (_index, field, sortStatus) {
            this.findListParams.isAsc = sortStatus;
            this.findListParams.sortName = field;
            this.getListByParams(this.findListParams);
            this.tHeadList[_index].isAsc = sortStatus;
        };
        ProxyServerController.prototype.changePage = function (num) {
            this.findListParams.currentPage = num;
            this.getListByParams(this.findListParams);
        };
        ProxyServerController.prototype.changePageSize = function (num) {
            var _this = this;
            this.findListParams.pageSize = num;
            this.proxyServerService.findListByParams(this.findListParams).then(function (resp) {
                if (resp.code == 200) {
                    _this.pageParams.setCurrentPage(1);
                    _this.pageParams.setPageSize(_this.findListParams.pageSize);
                    _this.pageParams.setTotalCount(resp.data.TotalCount);
                    _this.setTBodyList(resp.data.Result);
                }
            });
        };
        ProxyServerController.$inject = ['$scope', '$timeout', '$controller', 'proxyServerService', 'layer', '$filter'];
        return ProxyServerController;
    }());
    main_app_1.app
        .controller('baseConfigProxyServerController', ProxyServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvcHJveHlTZXJ2ZXIvcHJveHlTZXJ2ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkE7UUFnQkksK0JBQW9CLE1BQVUsRUFBUyxRQUFpQixFQUFTLFdBQWUsRUFBVSxrQkFBc0MsRUFBVSxLQUFTLEVBQVUsT0FBVztZQUFwSixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1lBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBRXBLLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHlDQUFxQixFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7WUFDOUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFJeEQsSUFBSSxDQUFDLFNBQVMsR0FBRTtnQkFDWixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDN0IsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7Z0JBQ3BDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO2dCQUM3QixFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDO2dCQUMzQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztnQkFDcEMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFF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Z0JBQ3hDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUF0T00sNkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLG9CQUFvQixFQUFDLE9BQU8sRUFBQyxTQUFTLENBQUMsQ0FBQztRQXdPaEcsNEJBQUM7S0F2UEQsQUF1UEMsSUFBQTtJQUNELGNBQUc7U0FDRSxVQUFVLENBQUMsaUNBQWlDLEVBQUUscUJBQXFCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9zZXJ2ZXIvcHJveHlTZXJ2ZXIvcHJveHlTZXJ2ZXIuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9wcm94eVNlcnZlci51cGRhdGVNb2RhbC5odG1sXCIgbmFtZT1cInByb3h5U2VydmVyVXBkYXRlTW9kYWxIdG1sXCIgLz5cclxuaW1wb3J0IHtJVGFibGVIZWFkZXJ9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQge0lQcm94eVNlcnZlclNlcnZpY2V9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wcm94eVNlcnZlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgXCIuLi9tYWluL3NlcnZlclR5cGUuZmlsdGVyXCJcclxuaW1wb3J0ICcuL3Byb3h5U2VydmVyLnVwZGF0ZU1vZGFsLmNvbnRyb2xsZXInO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJMaXN0UGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9wYXJhbXMvUHJveHlTZXJ2ZXJQYXJhbXNcIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L1Byb3h5U2VydmVyXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHQsIFBhZ2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlckV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvUHJveHlTZXJ2ZXJFeFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgcHJveHlTZXJ2ZXJVcGRhdGVNb2RhbEh0bWw6IGFueTtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIFByb3h5U2VydmVyQ29udHJvbGxlcntcclxuICAgIHRIZWFkTGlzdDpBcnJheTxJVGFibGVIZWFkZXI+O1xyXG4gICAgdEJvZHlMaXN0OkFycmF5PFByb3h5U2VydmVyPjtcclxuICAgIGZpbmRMaXN0UGFyYW1zOlByb3h5U2VydmVyTGlzdFBhcmFtcztcclxuXHJcbiAgICBjdXJyZW50TGF5ZXI/Om51bWJlcjtcclxuXHJcbiAgICAvL3NlcnZlclR5cGVFbnVtOntba2V5OnN0cmluZ106e2tleTpzdHJpbmcsdmFsdWU6c3RyaW5nfX0gPSBTZXJ2ZXJUeXBlRW51bTtcclxuICAgIC8vLS0tLS0tLS3liIbpobXmjIfku6RcclxuICAgIHBhZ2VQYXJhbXMgOlBhZ2VQYXJhbXM7XHJcbiAgICAvLy0tLS0tLS0tLVxyXG4gICAgLy/lpJrpgInnm7jlhbNcclxuICAgIHNlbGVjdGVkTGlzdDpBcnJheTxib29sZWFuPjtcclxuICAgIGlzU2VsZWN0QWxsOmJvb2xlYW47XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJyR0aW1lb3V0JywnJGNvbnRyb2xsZXInLCdwcm94eVNlcnZlclNlcnZpY2UnLCdsYXllcicsJyRmaWx0ZXInXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSxwcml2YXRlICR0aW1lb3V0OkZ1bmN0aW9uLHByaXZhdGUgJGNvbnRyb2xsZXI6YW55LCBwcml2YXRlIHByb3h5U2VydmVyU2VydmljZTpJUHJveHlTZXJ2ZXJTZXJ2aWNlLCBwcml2YXRlIGxheWVyOmFueSwgcHJpdmF0ZSAkZmlsdGVyOmFueSl7XHJcblxyXG4gICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcyA9IG5ldyBQcm94eVNlcnZlckxpc3RQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlUGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMucGFnZVNpemUgPSB0aGlzLnBhZ2VQYXJhbXMucGFnZVNpemU7XHJcblxyXG4gICAgICAvLyAgdGhpcy50SGVhZExpc3QgPSBnZXRIZWFkTGlzdCgpO1xyXG5cclxuICAgICAgICB0aGlzLnRIZWFkTGlzdCA9W1xyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIk5hbWVcIiwgdGl0bGU6IFwi5ZCN56ewXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIklwQWRkcmVzc1wiLCB0aXRsZTogXCJJUOWcsOWdgFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIuerr+WPo1wifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJQcm94eVNlcnZlclR5cGVcIiwgdGl0bGU6IFwi5pyN5Yqh5Zmo57G75Z6LXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkRlc2NyaXB0aW9uXCIsIHRpdGxlOiBcIuaPj+i/sFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJidXR0b25zXCIsIHRpdGxlOiBcIuaTjeS9nFwifSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZVByb3h5U2VydmVyVXBkYXRlTW9kZWwnLCBmdW5jdGlvbiAoZXZlbjphbnksZGF0YTp7aXNDb21taXQ6Ym9vbGVhbn0pIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc0NvbW1pdCl7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZUxheWVyKHNlbGZfdGhpcy5nZXRDdXJyZW50TGF5ZXIoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHNlbGZfdGhpcy5sYXllcil7XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy/ljZXliKDpmaRcclxuICAgIGRlbGV0ZUJ5SWQoX2luZGV4OlByb3h5U2VydmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKFwi56Gu5a6a5Yig6Zmk6K+l5p2h5Luj55CG5Luj55CG6YWN572u5ZCXP1wiLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICB9LChpbmRleDogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0RGVsZXRlKF9pbmRleC5JRCxpbmRleCk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXREZWxldGUoaWQ6c3RyaW5nLGxheWVyTnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5wcm94eVNlcnZlclNlcnZpY2UuZGVsZXRlQnlJZChpZCkudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShsYXllck51bSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpgInmi6nmn5DkuIDmnaHmlbDmja5cclxuICAgICAqIEB0aW1lOiAyMDE3LTA0LTIxIDE5OjQzOjA3XHJcbiAgICAgKiBAcGFyYW1zOlxyXG4gICAgICogQHJldHVybjpcclxuICAgICAqL1xyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OkFycmF5PGJvb2xlYW4+LGlzQ2hlY2tBbGw6Ym9vbGVhbik6dm9pZHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5b2T5YmN5bey6KKr6YCJ5Lit5YiX6KGoXHJcbiAgICBnZXRTZWxlY3RlZExpc3QoKTpBcnJheTxQcm94eVNlcnZlcj57XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6QXJyYXk8UHJveHlTZXJ2ZXI+ID0gW107XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZExpc3Qpe1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChkYXRhOlByb3h5U2VydmVyLGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRMaXN0W2luZGV4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5aSa5Liq5Yig6ZmkXHJcbiAgICBkZWxldGVCeUlkcygpe1xyXG4gICAgICAgIGxldCBzZWxlY3RlZERhdGFMaXN0OkFycmF5PFByb3h5U2VydmVyPiA9IHRoaXMuZ2V0U2VsZWN0ZWRMaXN0KCk7XHJcbiAgICAgICAgaWYoISBzZWxlY3RlZERhdGFMaXN0IHx8IHNlbGVjdGVkRGF0YUxpc3QubGVuZ3RoID09MCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCI9PT09PT09PT09PT1cIixcIuW9k+WJjeacqumAieaLqeaVsOaNrlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRzOkFycmF5PHN0cmluZz4gPSBbXTtcclxuXHJcbiAgICAgICAgc2VsZWN0ZWREYXRhTGlzdC5mb3JFYWNoKChzZXJ2ZXI6UHJveHlTZXJ2ZXIpPT57XHJcbiAgICAgICAgICAgIGlkcy5wdXNoKHNlcnZlci5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNob3dUZXh0ID0gJ+ehruWumuWIoOmZpOW9k+WJjemAieS4reeahCAnICsgaWRzLmxlbmd0aCArICcg5p2hSXZzU2VydmVy6YWN572u5ZCXPyc7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiAn6K2m5ZGKJyxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICB9LChpbmRleDogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGVCeUlkcyhpZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXREZWxldGVCeUlkcyhpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgdGhpcy5wcm94eVNlcnZlclNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkVmlkZW9TZXJ2ZXIoKXtcclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlzVXBkYXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9ICfmlrDlu7rmnI3liqHlmagnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOlt0aXRsZVN0ciwndGV4dC1hbGlnbjogY2VudGVyOyddLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwcm94eVNlcnZlclVwZGF0ZU1vZGFsSHRtbCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBhcmVhOltcIjUwMHB4XCJdLFxyXG4gICAgICAgIH0pLnRoZW4oKGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGF5ZXIoaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmluZEJ5SWQoaWQ6c3RyaW5nKXtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZXJ2ZXIobW9kZWw/OlByb3h5U2VydmVyKTp2b2lke1xyXG4gICAgICAgIGNvbnNvbGUubG9nKG1vZGVsKTtcclxuICAgICAgICB0aGlzLmZpbmRCeUlkKG1vZGVsLklEKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PFByb3h5U2VydmVyRXg+KT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5VcGRhdGVWaWRlb1NlcnZlcih0cnVlLHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuVXBkYXRlVmlkZW9TZXJ2ZXIoaXNVcGRhdGU6Ym9vbGVhbixkYXRhPzpQcm94eVNlcnZlcil7XHJcbiAgICAgICAgbGV0IHNjb3BlOmFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pc1VwZGF0ZSA9IGlzVXBkYXRlO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZURhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSBpc1VwZGF0ZT8n57yW6L6R5pyN5Yqh5ZmoJzon5paw5bu65pyN5Yqh5ZmoJztcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTpbdGl0bGVTdHIsJ3RleHQtYWxpZ246IGNlbnRlcjsnXSxcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHByb3h5U2VydmVyVXBkYXRlTW9kYWxIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiJWMgPT09PT09PT09PXN0YXJ0PT09PT09PT09PT09PT1cIixcImNvbG9yOm9yYW5nZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5sYXllciBzY29wZS4kZGVzdHJveSgpOycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiPT09PT09PT09ZW5kPT09PT09PT09PT09PT09XCIsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkudGhlbigoaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50TGF5ZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2xvc2VMYXllcihpbmRleDpudW1iZXIpOmFueXtcclxuICAgICAgICByZXR1cm4gdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q3VycmVudExheWVyKGluZGV4Om51bWJlcik6dm9pZHtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllciA9IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRMYXllcigpOm51bWJlcntcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50TGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VEJvZHlMaXN0KHJlc3VsdDpBcnJheTxQcm94eVNlcnZlcj4pIHtcclxuICAgICAgICB0aGlzLnRCb2R5TGlzdCA9IHRoaXMuJGZpbHRlcigncHJveHlTZXJ2ZXJUeXBlRmlsdGVyJykocmVzdWx0LCdQcm94eVNlcnZlclR5cGUnKTtcclxuICAgIH07XHJcblxyXG4gICAgZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczpQcm94eVNlcnZlckxpc3RQYXJhbXMpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXMocGFyYW1zKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PFBhZ2VSZXN1bHQ8UHJveHlTZXJ2ZXI+Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zLnNldEN1cnJlbnRQYWdlKHBhcmFtcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuc2V0VG90YWxDb3VudChyZXNwLmRhdGEuVG90YWxDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRCb2R5TGlzdChyZXNwLmRhdGEuUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBzb3J0QnlGaWVsZChfaW5kZXg6bnVtYmVyLGZpZWxkOnN0cmluZyxzb3J0U3RhdHVzOmJvb2xlYW4pe1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMudEhlYWRMaXN0W19pbmRleF0uaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcykudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRDdXJyZW50UGFnZSgxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRQYWdlU2l6ZSh0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuZGF0YS5Ub3RhbENvdW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0VEJvZHlMaXN0KHJlc3AuZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbn1cclxuYXBwXHJcbiAgICAuY29udHJvbGxlcignYmFzZUNvbmZpZ1Byb3h5U2VydmVyQ29udHJvbGxlcicsIFByb3h5U2VydmVyQ29udHJvbGxlcik7Il19
