define(["require", "exports", "text!./proxyServer.updateModal.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../../core/params/ProxyServerParams", "css!../css/baseconfig-serve.css", "css!../style/baseconfig-area.css", "angular", "../../common/services/proxyServer.service", "../server/main/serverType.filter", "./proxyServer.updateModal.controller"], function (require, exports, proxyServerUpdateModalHtml, main_app_1, page_params_1, ProxyServerParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProxyServerController = (function () {
        function ProxyServerController($scope, $timeout, $controller, proxyServerService, layer, $filter, i18nFactory) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.$controller = $controller;
            this.proxyServerService = proxyServerService;
            this.layer = layer;
            this.$filter = $filter;
            this.i18nFactory = i18nFactory;
            this.isSelectItems = false;
            this.pageParams = new page_params_1.default();
            this.findListParams = new ProxyServerParams_1.ProxyServerListParams();
            this.findListParams.currentPage = this.pageParams.currentPage;
            this.findListParams.pageSize = this.pageParams.pageSize;
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_COMMON_03" },
                { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03" },
                { field: "Port", title: "DP_CONFIG_COMMON_11" },
                { field: "ProxyServerType", title: "DP_CONFIG_PROXYSERVER_04" },
                { field: "Description", title: "DP_CONFIG_COMMON_34" },
                { field: "buttons", title: "DP_CONFIG_COMMON_15" },
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
            this.layer.confirm(this.i18nFactory('DP_CONFIG_PROXYSERVER_05'), {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
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
            this.setIsSelectItems(resultList);
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
            var titleStr = '新建代理服务';
            this.layer.open({
                type: 1,
                title: titleStr,
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
            this.findById(model.ID).then(function (resp) {
                if (resp.code == 200) {
                    _this.openUpdateVideoServer(true, resp.data);
                }
            });
        };
        ;
        ProxyServerController.prototype.openUpdateVideoServer = function (isUpdate, data) {
            var _this = this;
            var scope = this.$scope.$new();
            scope.isUpdate = isUpdate;
            scope.updateData = data;
            var titleStr = isUpdate ? '编辑代理服务' : '新建代理服务';
            this.layer.open({
                type: 1,
                title: titleStr,
                content: proxyServerUpdateModalHtml,
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
            this.tBodyList = result;
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
            this.findListParams.pageSize = num;
            this.findListParams.currentPage = 1;
            this.getListByParams(this.findListParams);
        };
        ProxyServerController.prototype.setIsSelectItems = function (items) {
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
        ProxyServerController.$inject = ['$scope', '$timeout', '$controller', 'proxyServerService', 'layer', '$filter', 'i18nFactory'];
        return ProxyServerController;
    }());
    main_app_1.app
        .controller('baseConfigProxyServerController', ProxyServerController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9wcm94eVNlcnZlci9wcm94eVNlcnZlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXdCQTtRQWtCSSwrQkFBb0IsTUFBVSxFQUFTLFFBQWlCLEVBQVMsV0FBZSxFQUFVLGtCQUFzQyxFQUFVLEtBQVMsRUFBVSxPQUFXLEVBQVMsV0FBZTtZQUE1SyxXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUztZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFJO1lBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQUk7WUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUk7WUFFNUwsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHFCQUFVLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUkseUNBQXFCLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztZQUM5RCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUV4RCxJQUFJLENBQUMsU0FBUyxHQUFFO2dCQUNaLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUM7Z0JBQzlDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsMEJBQTBCLEVBQUM7Z0JBQ3hELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUM7Z0JBQzlDLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEtBQUssRUFBRSwwQkFBMEIsRUFBQztnQkFDOUQsRUFB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LEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxvQkFBb0IsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBdVA5Ryw0QkFBQztLQXhRRCxBQXdRQyxJQUFBO0lBQ0QsY0FBRztTQUNFLFVBQVUsQ0FBQyxpQ0FBaUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3Byb3h5U2VydmVyL3Byb3h5U2VydmVyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vcHJveHlTZXJ2ZXIudXBkYXRlTW9kYWwuaHRtbFwiIG5hbWU9XCJwcm94eVNlcnZlclVwZGF0ZU1vZGFsSHRtbFwiIC8+XHJcbmltcG9ydCBcImNzcyEuLi9jc3MvYmFzZWNvbmZpZy1zZXJ2ZS5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IHtJVGFibGVIZWFkZXJ9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6YW55O1xyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQge0lQcm94eVNlcnZlclNlcnZpY2V9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9wcm94eVNlcnZlci5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgXCIuLi9zZXJ2ZXIvbWFpbi9zZXJ2ZXJUeXBlLmZpbHRlclwiXHJcbmltcG9ydCAnLi9wcm94eVNlcnZlci51cGRhdGVNb2RhbC5jb250cm9sbGVyJztcclxuaW1wb3J0IFBhZ2VQYXJhbXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvcGFnZS9wYWdlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyTGlzdFBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL1Byb3h5U2VydmVyUGFyYW1zXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Qcm94eVNlcnZlclwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0LCBQYWdlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1Byb3h5U2VydmVyRXhcIjtcclxuXHJcbmRlY2xhcmUgbGV0IHByb3h5U2VydmVyVXBkYXRlTW9kYWxIdG1sOiBhbnk7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBQcm94eVNlcnZlckNvbnRyb2xsZXJ7XHJcbiAgICB0SGVhZExpc3Q6QXJyYXk8SVRhYmxlSGVhZGVyPjtcclxuICAgIHRCb2R5TGlzdDpBcnJheTxQcm94eVNlcnZlcj47XHJcbiAgICBmaW5kTGlzdFBhcmFtczpQcm94eVNlcnZlckxpc3RQYXJhbXM7XHJcblxyXG4gICAgY3VycmVudExheWVyPzpudW1iZXI7XHJcblxyXG4gICAgLy9zZXJ2ZXJUeXBlRW51bTp7W2tleTpzdHJpbmddOntrZXk6c3RyaW5nLHZhbHVlOnN0cmluZ319ID0gU2VydmVyVHlwZUVudW07XHJcbiAgICAvLy0tLS0tLS0t5YiG6aG15oyH5LukXHJcbiAgICBwYWdlUGFyYW1zIDpQYWdlUGFyYW1zO1xyXG4gICAgLy8tLS0tLS0tLS1cclxuICAgIC8v5aSa6YCJ55u45YWzXHJcbiAgICBzZWxlY3RlZExpc3Q6QXJyYXk8Ym9vbGVhbj47XHJcbiAgICBpc1NlbGVjdEFsbDpib29sZWFuO1xyXG4gICAgLy8gYWx0ZXIgd3lyOiDnlKjkuo7liKTmlq3lvZPliY3nlYzpnaLkuIrnmoTliJfooajmmK/lkKbooqvpgInkuK1cclxuICAgIGlzU2VsZWN0SXRlbXM6IGJvb2xlYW47XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJyR0aW1lb3V0JywnJGNvbnRyb2xsZXInLCdwcm94eVNlcnZlclNlcnZpY2UnLCdsYXllcicsJyRmaWx0ZXInLCdpMThuRmFjdG9yeSddO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6YW55LHByaXZhdGUgJHRpbWVvdXQ6RnVuY3Rpb24scHJpdmF0ZSAkY29udHJvbGxlcjphbnksIHByaXZhdGUgcHJveHlTZXJ2ZXJTZXJ2aWNlOklQcm94eVNlcnZlclNlcnZpY2UsIHByaXZhdGUgbGF5ZXI6YW55LCBwcml2YXRlICRmaWx0ZXI6YW55LHByaXZhdGUgaTE4bkZhY3Rvcnk6YW55KXtcclxuXHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wYWdlUGFyYW1zID0gbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zID0gbmV3IFByb3h5U2VydmVyTGlzdFBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSB0aGlzLnBhZ2VQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5wYWdlU2l6ZSA9IHRoaXMucGFnZVBhcmFtcy5wYWdlU2l6ZTtcclxuXHJcbiAgICAgICAgdGhpcy50SGVhZExpc3QgPVtcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMDNcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiSXBBZGRyZXNzXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QUk9YWVNFUlZFUl8wM1wifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJQb3J0XCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMTFcIn0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiUHJveHlTZXJ2ZXJUeXBlXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QUk9YWVNFUlZFUl8wNFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJEZXNjcmlwdGlvblwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzM0XCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcImJ1dHRvbnNcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8xNVwifSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCdjbG9zZVByb3h5U2VydmVyVXBkYXRlTW9kZWwnLCBmdW5jdGlvbiAoZXZlbjphbnksZGF0YTp7aXNDb21taXQ6Ym9vbGVhbn0pIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5pc0NvbW1pdCl7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZl90aGlzLmdldExpc3RCeVBhcmFtcyhzZWxmX3RoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy5jbG9zZUxheWVyKHNlbGZfdGhpcy5nZXRDdXJyZW50TGF5ZXIoKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHNlbGZfdGhpcy5sYXllcil7XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLy/ljZXliKDpmaRcclxuICAgIGRlbGV0ZUJ5SWQoX2luZGV4OlByb3h5U2VydmVyKXtcclxuXHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19QUk9YWVNFUlZFUl8wNScpLCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcIjIwMHB4XCJdXHJcbiAgICAgICAgfSwoaW5kZXg6IG51bWJlcik9PntcclxuICAgICAgICAgICAgdGhpcy5sYXllci5jbG9zZShpbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZShfaW5kZXguSUQsaW5kZXgpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgc3VibWl0RGVsZXRlKGlkOnN0cmluZyxsYXllck51bTpudW1iZXIpe1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmRlbGV0ZUJ5SWQoaWQpLnRoZW4oKHJlc3A6UmVzcG9uc2VSZXN1bHQ8YW55Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UobGF5ZXJOdW0pO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6YCJ5oup5p+Q5LiA5p2h5pWw5o2uXHJcbiAgICAgKiBAdGltZTogMjAxNy0wNC0yMSAxOTo0MzowN1xyXG4gICAgICogQHBhcmFtczpcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGFmdGVyQ2hhbmdlQ2hlY2socmVzdWx0TGlzdDpBcnJheTxib29sZWFuPixpc0NoZWNrQWxsOmJvb2xlYW4pOnZvaWR7XHJcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdEl0ZW1zKHJlc3VsdExpc3QpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gcmVzdWx0TGlzdDtcclxuICAgICAgICB0aGlzLmlzU2VsZWN0QWxsID0gaXNDaGVja0FsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOkFycmF5PFByb3h5U2VydmVyPntcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDpBcnJheTxQcm94eVNlcnZlcj4gPSBbXTtcclxuICAgICAgICBpZih0aGlzLnNlbGVjdGVkTGlzdCl7XHJcbiAgICAgICAgICAgIHRoaXMudEJvZHlMaXN0LmZvckVhY2goKGRhdGE6UHJveHlTZXJ2ZXIsaW5kZXg6bnVtYmVyKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZExpc3RbaW5kZXhdKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZWN0ZWREYXRhTGlzdDtcclxuICAgIH07XHJcblxyXG4gICAgLy/lpJrkuKrliKDpmaRcclxuICAgIGRlbGV0ZUJ5SWRzKCl7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6QXJyYXk8UHJveHlTZXJ2ZXI+ID0gdGhpcy5nZXRTZWxlY3RlZExpc3QoKTtcclxuICAgICAgICBpZighc2VsZWN0ZWREYXRhTGlzdCB8fCBzZWxlY3RlZERhdGFMaXN0Lmxlbmd0aCA9PTApe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgICAgICBzZWxlY3RlZERhdGFMaXN0LmZvckVhY2goKHNlcnZlcjpQcm94eVNlcnZlcik9PntcclxuICAgICAgICAgICAgaWRzLnB1c2goc2VydmVyLklEKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgc2hvd1RleHQgPSAn56Gu5a6a5Yig6Zmk5b2T5YmN6YCJ5Lit55qEICcgKyBpZHMubGVuZ3RoICsgJyDmnaHku6PnkIbmnI3liqHphY3nva7lkJc/JztcclxuICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0oc2hvd1RleHQsIHtcclxuICAgICAgICAgICAgaWNvbjogMCxcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiLFwiMjAwcHhcIl1cclxuICAgICAgICB9LChpbmRleDogbnVtYmVyKT0+e1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGVCeUlkcyhpZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzdWJtaXREZWxldGVCeUlkcyhpZHM6QXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgdGhpcy5wcm94eVNlcnZlclNlcnZpY2UuZGVsZXRlQnlJZHMoaWRzKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9MTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgYWRkVmlkZW9TZXJ2ZXIoKXtcclxuICAgICAgICBsZXQgc2NvcGU6YW55ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmlzVXBkYXRlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGxldCB0aXRsZVN0ciA9ICfmlrDlu7rku6PnkIbmnI3liqEnO1xyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZVN0cixcclxuICAgICAgICAgICAgY29udGVudDogcHJveHlTZXJ2ZXJVcGRhdGVNb2RhbEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICB9KS50aGVuKChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudExheWVyKGluZGV4KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZpbmRCeUlkKGlkOnN0cmluZyl7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3h5U2VydmVyU2VydmljZS5maW5kQnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VydmVyKG1vZGVsPzpQcm94eVNlcnZlcik6dm9pZHtcclxuICAgICAgICB0aGlzLmZpbmRCeUlkKG1vZGVsLklEKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PFByb3h5U2VydmVyRXg+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlblVwZGF0ZVZpZGVvU2VydmVyKHRydWUscmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBvcGVuVXBkYXRlVmlkZW9TZXJ2ZXIoaXNVcGRhdGU6Ym9vbGVhbixkYXRhPzpQcm94eVNlcnZlcil7XHJcbiAgICAgICAgbGV0IHNjb3BlOmFueSA9IHRoaXMuJHNjb3BlLiRuZXcoKTtcclxuICAgICAgICBzY29wZS5pc1VwZGF0ZSA9IGlzVXBkYXRlO1xyXG4gICAgICAgIHNjb3BlLnVwZGF0ZURhdGEgPSBkYXRhO1xyXG5cclxuICAgICAgICBsZXQgdGl0bGVTdHIgPSBpc1VwZGF0ZT8n57yW6L6R5Luj55CG5pyN5YqhJzon5paw5bu65Luj55CG5pyN5YqhJztcclxuICAgICAgICAgICAgdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTp0aXRsZVN0cixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHByb3h5U2VydmVyVXBkYXRlTW9kYWxIdG1sLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICAgICAgYXJlYTpbXCI1MDBweFwiXSxcclxuICAgICAgICAgICAgICAgIGVuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS50aGVuKChpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRMYXllcihpbmRleCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbG9zZUxheWVyKGluZGV4Om51bWJlcik6YW55e1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRDdXJyZW50TGF5ZXIoaW5kZXg6bnVtYmVyKTp2b2lke1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVyID0gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q3VycmVudExheWVyKCk6bnVtYmVye1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRMYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUQm9keUxpc3QocmVzdWx0OkFycmF5PFByb3h5U2VydmVyPikge1xyXG4gICAgICAgIC8vIHRoaXMudEJvZHlMaXN0ID0gdGhpcy4kZmlsdGVyKCdwcm94eVNlcnZlclR5cGVGaWx0ZXInKShyZXN1bHQsJ1Byb3h5U2VydmVyVHlwZScpO1xyXG4gICAgICAgIHRoaXMudEJvZHlMaXN0ID0gcmVzdWx0O1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgZ2V0TGlzdEJ5UGFyYW1zKHBhcmFtczpQcm94eVNlcnZlckxpc3RQYXJhbXMpOnZvaWR7XHJcblxyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXMocGFyYW1zKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PFBhZ2VSZXN1bHQ8UHJveHlTZXJ2ZXI+Pik9PntcclxuICAgICAgICAgICAgaWYocmVzcC5jb2RlID09IDIwMCAmJiByZXNwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYWdlUGFyYW1zLnNldEN1cnJlbnRQYWdlKHBhcmFtcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2VQYXJhbXMuc2V0VG90YWxDb3VudChyZXNwLmRhdGEuVG90YWxDb3VudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFRCb2R5TGlzdChyZXNwLmRhdGEuUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMgPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfTtcclxuXHJcbiAgICBzb3J0QnlGaWVsZChfaW5kZXg6bnVtYmVyLGZpZWxkOnN0cmluZyxzb3J0U3RhdHVzOmJvb2xlYW4pe1xyXG5cclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLmlzQXNjID0gc29ydFN0YXR1cztcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnNvcnROYW1lID0gZmllbGQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIHRoaXMudEhlYWRMaXN0W19pbmRleF0uaXNBc2MgPSBzb3J0U3RhdHVzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2Fib3V0IHBhZ2UgY2xpY2tcclxuICAgIGNoYW5nZVBhZ2UobnVtOm51bWJlcil7XHJcbiAgICAgICAgdGhpcy5maW5kTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IG51bTtcclxuICAgICAgICB0aGlzLmdldExpc3RCeVBhcmFtcyh0aGlzLmZpbmRMaXN0UGFyYW1zKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGFuZ2VQYWdlU2l6ZShudW06bnVtYmVyKXtcclxuICAgICAgICB0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZmluZExpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdEJ5UGFyYW1zKHRoaXMuZmluZExpc3RQYXJhbXMpO1xyXG4gICAgICAgIC8vIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXModGhpcy5maW5kTGlzdFBhcmFtcykudGhlbigocmVzcDpSZXNwb25zZVJlc3VsdDxhbnk+KT0+e1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXNwKVxyXG4gICAgICAgIC8vICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRQYWdlU2l6ZSh0aGlzLmZpbmRMaXN0UGFyYW1zLnBhZ2VTaXplKTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMucGFnZVBhcmFtcy5zZXRUb3RhbENvdW50KHJlc3AuZGF0YS5Ub3RhbENvdW50KTtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2V0VEJvZHlMaXN0KHJlc3AuZGF0YS5SZXN1bHQpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0b3Igd3lyOiDliKTmlq3lkozorr7nva7lvZPliY3liJfooajmmK/lkKbmnInpgInkuK3nmoTlhYPntKBcclxuICAgICAqIEBwYXJhbSBpdGVtc1xyXG4gICAgICovXHJcbiAgICBzZXRJc1NlbGVjdEl0ZW1zKGl0ZW1zOiBBcnJheTxib29sZWFuPil7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICBsZXQgaSxsZW47XHJcbiAgICAgICAgICAgIGZvcihpPTAsbGVuPWl0ZW1zLmxlbmd0aDtpPGxlbjtpKyspe1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbXNbaV0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5pc1NlbGVjdEl0ZW1zICE9PSByZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLmlzU2VsZWN0SXRlbXMgPSByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5hcHBcclxuICAgIC5jb250cm9sbGVyKCdiYXNlQ29uZmlnUHJveHlTZXJ2ZXJDb250cm9sbGVyJywgUHJveHlTZXJ2ZXJDb250cm9sbGVyKTsiXX0=
