var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "text!./iod.popup.html", "../../common/app/main.app", "../../common/directive/page/page-params", "../../common/directive/tree/tree-params", "../../../core/params/IodParams", "../../../core/entity/Area", "../../common/services/casecade.service", "css!../css/baseconfig-iod.css", "css!../style/baseconfig-area.css", "./iod.popup.controller", "../../common/services/iod.service", "../../common/services/proxyServer.service", "../../common/services/casecade.service", "es6-promise"], function (require, exports, popupHtml, main_app_1, page_params_1, tree_params_1, IodParams_1, Area_1, casecade_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TableListParams = (function (_super) {
        __extends(TableListParams, _super);
        function TableListParams() {
            var _this = _super.call(this) || this;
            _this.sortName = 'Code';
            _this.isAsc = true;
            _this.pageSize = new page_params_1.default().pageSize;
            _this.currentPage = new page_params_1.default().currentPage;
            return _this;
        }
        ;
        return TableListParams;
    }(IodParams_1.IodTableParams));
    var iodController = (function () {
        function iodController($scope, $timeout, casCadeService, iodService, layer, proxyServerService, i18nFactory) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.casCadeService = casCadeService;
            this.iodService = iodService;
            this.layer = layer;
            this.proxyServerService = proxyServerService;
            this.i18nFactory = i18nFactory;
            this.treeSearchInput = null;
            this.currentArea = new Area_1.Area();
            this.tableListParams = new TableListParams();
            this.pageParams = new page_params_1.default();
            this.tBodyList = [];
            this.tableNoData = false;
            this.areaTreeDataParams = new tree_params_1.TreeDataParams();
            this.treeNoData = false;
            this.selectedList = [];
            this.isSelectAll = false;
            this.isSelectItems = false;
            this.proxyListForIod = [];
            this.tHeadList = [
                { field: "Name", title: "DP_CONFIG_IODSERVER_03" },
                { field: "AreaName", title: "DP_CONFIG_COMMON_09" },
                { field: "IpAddress", title: "DP_CONFIG_PROXYSERVER_03" },
                { field: "Port", title: "DP_CONFIG_COMMON_11" },
                { field: "DeviceType", title: "DP_CONFIG_PROXYSERVER_04" },
                { field: "Description", title: "DP_CONFIG_COMMON_34" },
                { field: "bottoms", title: "DP_CONFIG_COMMON_35" }
            ];
            this.$scope.$on("iod.closePopup", function (event, isRefresh) {
                event.preventDefault();
                _this.layer.close(_this.currentLayerIndex);
                if (isRefresh) {
                    _this.$timeout(function () {
                        _this.getTableList();
                    }, 1000);
                }
            });
            this.initTreeAndTableParams();
            this.getTreeList();
            this.initProxyList();
        }
        iodController.prototype.initProxyList = function () {
            var _this = this;
            var params = {};
            params.type = 'Iod';
            params.currentPage = 1;
            params.pageSize = 100;
            this.proxyServerService.findListByParams(params).then(function (res) {
                _this.proxyListForIod = res.data.Result;
            });
        };
        iodController.prototype.initTreeAndTableParams = function () {
            var _this = this;
            this.areaTreeDataParams.treeId = 'iodTreeIod';
            this.areaTreeDataParams.isDefaultSelected = true;
            this.areaTreeDataParams.onClick = function (event, treeId, treeNode) {
                _this.areaTreeDataParams.defaultSelectTreeId = treeNode.ID;
                _this.tableListParams.currentPage = 1;
                _this.tableListParams.parentId = treeNode.ID;
                _this.tableListParams.sortName = 'Code';
                _this.tableListParams.isAsc = true;
                _this.$timeout(function () {
                    _this.currentArea = treeNode;
                    _this.getTableList();
                });
            };
            this.areaTreeDataParams.treeInitComplete = function () { };
        };
        iodController.prototype.addIod = function (area) {
            var scope = this.$scope.$new();
            scope.curdType = 'add';
            scope.currentArea = area;
            scope.treeDatas = this.areaTreeDataParams.treeDatas;
            scope.proxyListForIod = this.proxyListForIod;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                skin: "no-scroll",
                title: this.i18nFactory('DP_CONFIG_COMMON_40'),
                area: ["500px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        iodController.prototype.editIod = function (area, iod) {
            var scope = this.$scope.$new();
            scope.curdType = 'edit';
            scope.currentArea = area;
            scope.currentIod = iod;
            scope.treeDatas = this.areaTreeDataParams.treeDatas;
            scope.proxyListForIod = this.proxyListForIod;
            this.currentLayerIndex = this.layer.open({
                type: 1,
                content: popupHtml,
                scope: scope,
                skin: "no-scroll",
                closeBtn: 1,
                title: this.i18nFactory('DP_CONFIG_COMMON_38'),
                area: ["500px", "auto"],
                end: function () {
                    scope.$destroy();
                }
            });
        };
        iodController.prototype.deleteIod = function (iod) {
            var _this = this;
            this.layer.confirm(this.i18nFactory('DP_CONFIG_COMMON_43'), { icon: 0, title: this.i18nFactory('DP_CONFIG_COMMON_42'), iod: ["500px", "200px"] }, function (index) {
                _this.layer.close(index);
                _this.submitDeleteIod(iod);
            });
        };
        iodController.prototype.submitDeleteIod = function (iod) {
            var _this = this;
            this.iodService.deleteById(iod).then(function (res) {
                if (res.code === 200) {
                    _this.tableListParams.currentPage = 1;
                    _this.$timeout(function () {
                        _this.getTableList();
                    }, 1000);
                }
            });
        };
        iodController.prototype.getTableList = function () {
            var _this = this;
            var params = new casecade_service_1.CasCadeSearchParams();
            params.pageIndex = this.tableListParams.currentPage;
            params.orderField = this.tableListParams.sortName;
            params.pageSize = this.tableListParams.pageSize;
            params.areaId = this.tableListParams.parentId;
            params.isAsc = this.tableListParams.isAsc;
            params.name = this.tableListParams.areaName;
            this.casCadeService.findIodServerList(params).then(function (res) {
                if (res.code === 200) {
                    var pageParams = new page_params_1.default();
                    pageParams.pageSize = _this.tableListParams.pageSize;
                    pageParams.currentPage = _this.tableListParams.currentPage;
                    pageParams.totalCount = res.count;
                    _this.tBodyList = res.data || [];
                    _this.pageParams = pageParams;
                    _this.tableDatas = res.data;
                    _this.$timeout(function () {
                        _this.tableNoData = !(_this.tBodyList && _this.tBodyList.length > 0);
                    });
                }
                else {
                    _this.$timeout(function () {
                        _this.tableNoData = true;
                    });
                }
            });
        };
        iodController.prototype.getTreeList = function () {
            var _this = this;
            this.iodService.findListTree({ keyword: this.treeSearchInput }).then(function (result) {
                _this.$timeout(function () {
                    _this.areaTreeDataParams.treeDatas = result;
                    _this.treeNoData = !(result && result.length > 0);
                });
            });
        };
        iodController.prototype.changePage = function (num) {
            this.tableListParams.currentPage = num;
            this.getTableList();
        };
        iodController.prototype.changePageSize = function (num) {
            this.tableListParams.currentPage = 1;
            this.tableListParams.pageSize = num;
            this.getTableList();
        };
        iodController.prototype.afterChangeCheck = function (resultList, isCheckAll) {
            this.setIsSelectItems(resultList);
            this.selectedList = resultList;
            this.isSelectAll = isCheckAll;
        };
        iodController.prototype.getSelectedList = function () {
            var _this = this;
            var selectedDataList = [];
            if (this.selectedList) {
                this.tBodyList.forEach(function (_data, _index) {
                    if (_this.selectedList[_index]) {
                        selectedDataList.push(_data);
                    }
                });
            }
            return selectedDataList;
        };
        iodController.prototype.deleteByIds = function () {
            var _this = this;
            var selectedDataList = this.getSelectedList();
            if (!selectedDataList || selectedDataList.length == 0) {
                this.layer.msg(this.i18nFactory("DP_CONFIG_COMMON_84"));
                return;
            }
            var ids = [];
            selectedDataList.forEach(function (_data) {
                ids.push(_data.ID);
            });
            var showText = this.i18nFactory('DP_CONFIG_IODSERVER_12', { value: ids.length });
            this.layer.confirm(showText, {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                iod: ["500px", "200px"]
            }, function (index) {
                _this.layer.close(index);
                _this.layer.confirm(_this.i18nFactory('DP_CONFIG_COMMON_43'), { icon: 0, title: _this.i18nFactory('DP_CONFIG_COMMON_42'), iod: ["500px", "200px"] }, function (index) {
                    _this.layer.close(index);
                    _this.submitDeleteByIds(ids);
                });
            });
        };
        iodController.prototype.submitDeleteByIds = function (ids) {
            var _this = this;
            this.iodService.deleteByIds(ids).then(function (res) {
                if (res.code == 200) {
                    _this.tableListParams.currentPage = 1;
                    _this.$timeout(function () {
                        _this.getTableList();
                    }, 1000);
                }
            });
        };
        iodController.prototype.setIsSelectItems = function (items) {
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
        iodController.prototype.treeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getTreeList();
            }
        };
        iodController.prototype.synchronize = function (item) {
            var _this = this;
            console.log(item);
            this.layer.confirm("\u786E\u5B9A\u540C\u6B65\u6B64\u670D\u52A1\u5668" + item.Name + "?", {
                icon: 0,
                title: this.i18nFactory('DP_CONFIG_COMMON_42'),
                iod: ["500px", "200px"]
            }, function (index) {
                _this.iodService.synchronize(item.ID).then(function (res) {
                    console.log(res);
                });
                _this.layer.close(index);
            });
        };
        iodController.prototype.treeSearchInputFunc = function () {
            this.getTreeList();
        };
        iodController.$inject = ['$scope', '$timeout', 'casCadeService', 'iodService', 'layer', 'proxyServerService', 'i18nFactory'];
        return iodController;
    }());
    main_app_1.app.controller('iodController', iodController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9pb2QvaW9kLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQWlDQTtRQUE4QixtQ0FBYztRQUV4QztZQUFBLFlBQ0ksaUJBQU8sU0FLVjtZQUpHLEtBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUMsUUFBUSxDQUFDO1lBQzFDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxxQkFBVSxFQUFFLENBQUMsV0FBVyxDQUFDOztRQUNwRCxDQUFDO1FBQUEsQ0FBQztRQUNOLHNCQUFDO0lBQUQsQ0FUQSxBQVNDLENBVDZCLDBCQUFjLEdBUzNDO0lBRUQ7UUFtQkksdUJBQ1ksTUFBVyxFQUNYLFFBQWtCLEVBQ2xCLGNBQStCLEVBQy9CLFVBQXVCLEVBQ3ZCLEtBQVUsRUFDVixrQkFBc0MsRUFDdEMsV0FBZ0I7WUFQNUIsaUJBK0JDO1lBOUJXLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtZQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFhO1lBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQUs7WUFDVix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1lBQ3RDLGdCQUFXLEdBQVgsV0FBVyxDQUFLO1lBeEI1QixvQkFBZSxHQUFXLElBQUksQ0FBQztZQUMvQixnQkFBVyxHQUFTLElBQUksV0FBSSxFQUFFLENBQUM7WUFDL0Isb0JBQWUsR0FBb0IsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUN6RCxlQUFVLEdBQWdCLElBQUkscUJBQVUsRUFBRSxDQUFDO1lBSzNDLGNBQVMsR0FBYyxFQUFFLENBQUM7WUFDMUIsZ0JBQVcsR0FBVyxLQUFLLENBQUM7WUFFNUIsdUJB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QUUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBbVJ2SCxvQkFBQztLQXBSRCxBQW9SQyxJQUFBO0lBQ0QsY0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvaW9kL2lvZC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzMvMjMuXHJcbiAqL1xyXG4vLy8gPGFtZC1kZXBlbmRlbmN5IHBhdGg9XCJ0ZXh0IS4vaW9kLnBvcHVwLmh0bWxcIiBuYW1lPVwicG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLWlvZC5jc3NcIjtcclxuaW1wb3J0IFwiY3NzIS4uL3N0eWxlL2Jhc2Vjb25maWctYXJlYS5jc3NcIjtcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi9pb2QucG9wdXAuY29udHJvbGxlcic7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2lvZC5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcHJveHlTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7SVByb3h5U2VydmVyU2VydmljZX0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3Byb3h5U2VydmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY2FzZWNhZGUuc2VydmljZVwiO1xyXG5pbXBvcnQgUGFnZVBhcmFtcyBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS9wYWdlL3BhZ2UtcGFyYW1zXCI7XHJcbmltcG9ydCB7SUlvZFNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvaW9kLnNlcnZpY2VcIjtcclxuLy9pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVGFibGVIZWFkZXJ9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3VuaXQtdGFibGUvdGFibGUtcGFyYW1zXCI7XHJcbmltcG9ydCB7SVRyZWVEYXRhUGFyYW1zLCBUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lvZFRhYmxlUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvSW9kUGFyYW1zXCI7XHJcbmltcG9ydCB7SW9kfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvSW9kXCI7XHJcbi8vIGltcG9ydCB7SW9kRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9Jb2RFeFwiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJQ2FzQ2FkZVNlcnZpY2UsIENhc0NhZGVTZWFyY2hQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY2FzZWNhZGUuc2VydmljZVwiO1xyXG5pbXBvcnQge1Byb3h5U2VydmVyfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvUHJveHlTZXJ2ZXJcIjtcclxuaW1wb3J0IHtQcm94eVNlcnZlckxpc3RQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9Qcm94eVNlcnZlclBhcmFtc1wiO1xyXG5pbXBvcnQgJ2VzNi1wcm9taXNlJztcclxuZGVjbGFyZSBsZXQgcmVxdWlyZSA6YW55O1xyXG4vL2xldCBQcm9taXNlID0gcmVxdWlyZSgnZXM2LXByb21pc2UnKTtcclxuXHJcblxyXG5kZWNsYXJlIGxldCBwb3B1cEh0bWw6IGFueTtcclxuXHJcbmNsYXNzIFRhYmxlTGlzdFBhcmFtcyBleHRlbmRzIElvZFRhYmxlUGFyYW1zICB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNvcnROYW1lID0gJ0NvZGUnO1xyXG4gICAgICAgIHRoaXMuaXNBc2MgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGFnZVNpemUgPSBuZXcgUGFnZVBhcmFtcygpLnBhZ2VTaXplO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBuZXcgUGFnZVBhcmFtcygpLmN1cnJlbnRQYWdlO1xyXG4gICAgfTtcclxufVxyXG5cclxuY2xhc3MgaW9kQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJyR0aW1lb3V0JywnY2FzQ2FkZVNlcnZpY2UnLCdpb2RTZXJ2aWNlJywgJ2xheWVyJywncHJveHlTZXJ2ZXJTZXJ2aWNlJywgJ2kxOG5GYWN0b3J5J107XHJcbiAgICB0cmVlU2VhcmNoSW5wdXQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICBjdXJyZW50QXJlYTogQXJlYSA9IG5ldyBBcmVhKCk7XHJcbiAgICB0YWJsZUxpc3RQYXJhbXM6IFRhYmxlTGlzdFBhcmFtcyA9IG5ldyBUYWJsZUxpc3RQYXJhbXMoKTtcclxuICAgIHBhZ2VQYXJhbXM6IFBhZ2VQYXJhbXMgPSAgbmV3IFBhZ2VQYXJhbXMoKTtcclxuICAgIGN1cnJlbnRMYXllckluZGV4OiBudW1iZXI7XHJcbiAgICB0YWJsZURhdGFzOiBBcnJheTxhbnk+O1xyXG4gICAgZGVmYXVsdFNlbGVjdFRyZWVJZDogc3RyaW5nO1xyXG4gICAgdEhlYWRMaXN0OkFycmF5PElUYWJsZUhlYWRlcj47XHJcbiAgICB0Qm9keUxpc3Q6QXJyYXk8SW9kPiA9IFtdO1xyXG4gICAgdGFibGVOb0RhdGE6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLy8gLy8g6YCJ5oup6KGM5pS/5Yy65Z+f5qCRXHJcbiAgICBhcmVhVHJlZURhdGFQYXJhbXM6SVRyZWVEYXRhUGFyYW1zPEFyZWFFeD4gPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgdHJlZU5vRGF0YTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBzZWxlY3RlZExpc3Q6QXJyYXk8Ym9vbGVhbj4gPSBbXTtcclxuICAgIGlzU2VsZWN0QWxsOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzU2VsZWN0SXRlbXM6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJveHlMaXN0Rm9ySW9kOkFycmF5PFByb3h5U2VydmVyPiA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIGNhc0NhZGVTZXJ2aWNlOiBJQ2FzQ2FkZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBpb2RTZXJ2aWNlOiBJSW9kU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBwcm94eVNlcnZlclNlcnZpY2U6SVByb3h5U2VydmVyU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGkxOG5GYWN0b3J5OiBhbnkpIHtcclxuICAgICAgICB0aGlzLnRIZWFkTGlzdCA9ICBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTmFtZVwiLCB0aXRsZTogXCJEUF9DT05GSUdfSU9EU0VSVkVSXzAzXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIkFyZWFOYW1lXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19DT01NT05fMDlcIiAvKiwgaXNTb3J0OnRydWUsaXNBc2M6dHJ1ZSovfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJJcEFkZHJlc3NcIiwgdGl0bGU6IFwiRFBfQ09ORklHX1BST1hZU0VSVkVSXzAzXCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcIlBvcnRcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8xMVwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJEZXZpY2VUeXBlXCIsIHRpdGxlOiBcIkRQX0NPTkZJR19QUk9YWVNFUlZFUl8wNFwifSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJEZXNjcmlwdGlvblwiLCB0aXRsZTogXCJEUF9DT05GSUdfQ09NTU9OXzM0XCJ9LFxyXG4gICAgICAgICAgICB7IGZpZWxkOiBcImJvdHRvbXNcIiwgdGl0bGU6IFwiRFBfQ09ORklHX0NPTU1PTl8zNVwifVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgLy8g5by55Ye65qGG55u45YWzXHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwiaW9kLmNsb3NlUG9wdXBcIiwgKGV2ZW50OiBhbnksIGlzUmVmcmVzaD86IGJvb2xlYW4pID0+e1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKHRoaXMuY3VycmVudExheWVySW5kZXgpO1xyXG4gICAgICAgICAgICBpZiAoaXNSZWZyZXNoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKVxyXG4gICAgICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmluaXRUcmVlQW5kVGFibGVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0UHJveHlMaXN0KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRQcm94eUxpc3QoKXtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge30gYXMgIFByb3h5U2VydmVyTGlzdFBhcmFtcztcclxuICAgICAgICBwYXJhbXMudHlwZSA9ICdJb2QnO1xyXG4gICAgICAgIHBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VTaXplID0gMTAwO1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRMaXN0QnlQYXJhbXMocGFyYW1zKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgIHRoaXMucHJveHlMaXN0Rm9ySW9kID0gcmVzLmRhdGEuUmVzdWx0IGFzIEFycmF5PFByb3h5U2VydmVyPjtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZUFuZFRhYmxlUGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUlkID0gJ2lvZFRyZWVJb2QnO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhUGFyYW1zLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWEpPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy5kZWZhdWx0U2VsZWN0VHJlZUlkID0gdHJlZU5vZGUuSUQ7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMucGFyZW50SWQgPSB0cmVlTm9kZS5JRDtcclxuICAgICAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuc29ydE5hbWUgPSAnQ29kZSc7XHJcbiAgICAgICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLmlzQXNjID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFyZWEgPSB0cmVlTm9kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFQYXJhbXMudHJlZUluaXRDb21wbGV0ZSA9ICgpPT57fVxyXG4gICAgfVxyXG5cclxuICAgIGFkZElvZChhcmVhOkFyZWFFeCkge1xyXG4gICAgICAgIC8vIOeUseS6jmxheWVy6ZyA6KaB5Lygc2NvcGXlr7nosaEsIOS9hueOsOWcqOWRveWQjeWPguaVsOmDveaUvuWcqHZt5LitLCDmlYXkvb/nlKhzY29wZS4kbmV35paw5bu65LiA5Liqc2NvcGXkvKDlhaVcclxuICAgICAgICBsZXQgc2NvcGU6IHtjdXJkVHlwZTogc3RyaW5nLHRyZWVEYXRhczpBcnJheTxBcmVhRXg+LCBjdXJyZW50QXJlYTogQXJlYUV4LHByb3h5TGlzdEZvcklvZDpBcnJheTxQcm94eVNlcnZlcj4sICRkZXN0cm95OiBGdW5jdGlvbn0gPSB0aGlzLiRzY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuY3VyZFR5cGUgPSAnYWRkJztcclxuICAgICAgICBzY29wZS5jdXJyZW50QXJlYSA9IGFyZWEgYXMgQXJlYUV4IDtcclxuICAgICAgICBzY29wZS50cmVlRGF0YXMgPSB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlRGF0YXMgYXMgQXJyYXk8QXJlYUV4PjtcclxuICAgICAgICBzY29wZS5wcm94eUxpc3RGb3JJb2QgPSB0aGlzLnByb3h5TGlzdEZvcklvZDtcclxuICAgICAgICAvLyDov5nph4zlr7lzY29wZei/m+ihjOS4gOasoeaWsOW7ulxyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRMYXllckluZGV4ID0gdGhpcy5sYXllci5vcGVuKHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgY29udGVudDogcG9wdXBIdG1sLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIHNraW46IFwibm8tc2Nyb2xsXCIsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQwJyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBlZGl0SW9kKGFyZWE6QXJlYUV4LGlvZDogSW9kKSB7XHJcbiAgICAgICAgbGV0IHNjb3BlOiB7Y3VyZFR5cGU6IHN0cmluZywgdHJlZURhdGFzOkFycmF5PEFyZWFFeD4sY3VycmVudElvZDpJb2QsY3VycmVudEFyZWE6IEFyZWFFeCxwcm94eUxpc3RGb3JJb2Q6QXJyYXk8UHJveHlTZXJ2ZXI+LCAkZGVzdHJveTogRnVuY3Rpb259ID0gdGhpcy4kc2NvcGUuJG5ldygpO1xyXG4gICAgICAgIHNjb3BlLmN1cmRUeXBlID0gJ2VkaXQnO1xyXG4gICAgICAgIHNjb3BlLmN1cnJlbnRBcmVhID0gYXJlYSBhcyBBcmVhRXggO1xyXG4gICAgICAgIHNjb3BlLmN1cnJlbnRJb2QgPSBpb2QgYXMgSW9kO1xyXG4gICAgICAgIHNjb3BlLnRyZWVEYXRhcyA9IHRoaXMuYXJlYVRyZWVEYXRhUGFyYW1zLnRyZWVEYXRhcyBhcyBBcnJheTxBcmVhRXg+O1xyXG4gICAgICAgIHNjb3BlLnByb3h5TGlzdEZvcklvZCA9IHRoaXMucHJveHlMaXN0Rm9ySW9kO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExheWVySW5kZXggPSB0aGlzLmxheWVyLm9wZW4oe1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBjb250ZW50OiBwb3B1cEh0bWwsXHJcbiAgICAgICAgICAgIHNjb3BlOiBzY29wZSxcclxuICAgICAgICAgICAgc2tpbjogXCJuby1zY3JvbGxcIixcclxuICAgICAgICAgICAgY2xvc2VCdG46IDEsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzM4JyksXHJcbiAgICAgICAgICAgIGFyZWE6W1wiNTAwcHhcIixcImF1dG9cIl0sXHJcbiAgICAgICAgICAgIGVuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcGUuJGRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGVsZXRlSW9kKGlvZDogSW9kKSB7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDMnKSwge2ljb246IDAsIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksaW9kOltcIjUwMHB4XCIsXCIyMDBweFwiXX0sICAoaW5kZXg6IG51bWJlcik9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnN1Ym1pdERlbGV0ZUlvZChpb2QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3VibWl0RGVsZXRlSW9kKGlvZDogSW9kKSB7XHJcbiAgICAgICAgdGhpcy5pb2RTZXJ2aWNlLmRlbGV0ZUJ5SWQoaW9kKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KClcclxuICAgICAgICAgICAgICAgIH0sMTAwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRUYWJsZUxpc3QoKSB7XHJcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBDYXNDYWRlU2VhcmNoUGFyYW1zKCk7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VJbmRleCA9IHRoaXMudGFibGVMaXN0UGFyYW1zLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIHBhcmFtcy5vcmRlckZpZWxkID0gdGhpcy50YWJsZUxpc3RQYXJhbXMuc29ydE5hbWU7XHJcbiAgICAgICAgcGFyYW1zLnBhZ2VTaXplID0gdGhpcy50YWJsZUxpc3RQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgcGFyYW1zLmFyZWFJZCA9IHRoaXMudGFibGVMaXN0UGFyYW1zLnBhcmVudElkO1xyXG4gICAgICAgIHBhcmFtcy5pc0FzYyA9IHRoaXMudGFibGVMaXN0UGFyYW1zLmlzQXNjO1xyXG4gICAgICAgIHBhcmFtcy5uYW1lID0gdGhpcy50YWJsZUxpc3RQYXJhbXMuYXJlYU5hbWU7XHJcbiAgICAgICAgdGhpcy5jYXNDYWRlU2VydmljZS5maW5kSW9kU2VydmVyTGlzdChwYXJhbXMpLnRoZW4oKHJlczpSZXNwb25zZVJlc3VsdDxBcnJheTxJb2Q+Pik9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFnZVBhcmFtcyA9IG5ldyBQYWdlUGFyYW1zKCk7XHJcbiAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLnBhZ2VTaXplID0gdGhpcy50YWJsZUxpc3RQYXJhbXMucGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLmN1cnJlbnRQYWdlID0gdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgICAgICAgICBwYWdlUGFyYW1zLnRvdGFsQ291bnQgPSByZXMuY291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy50Qm9keUxpc3QgPSByZXMuZGF0YSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFnZVBhcmFtcyA9IHBhZ2VQYXJhbXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlRGF0YXMgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFibGVOb0RhdGEgPSAhKHRoaXMudEJvZHlMaXN0ICYmIHRoaXMudEJvZHlMaXN0Lmxlbmd0aCA+IDApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWJsZU5vRGF0YSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIGdldFRyZWVMaXN0KCkge1xyXG4gICAgICAgIHRoaXMuaW9kU2VydmljZS5maW5kTGlzdFRyZWUoe2tleXdvcmQ6IHRoaXMudHJlZVNlYXJjaElucHV0fSkudGhlbigocmVzdWx0OiBBcnJheTxBcmVhRXg+KT0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCggKCk9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlRGF0YXMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVOb0RhdGEgPSAhKHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoPjApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbiAgICBjaGFuZ2VQYWdlKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSBudW07XHJcbiAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKTtcclxuICAgIH1cclxuICAgIGNoYW5nZVBhZ2VTaXplKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy50YWJsZUxpc3RQYXJhbXMuY3VycmVudFBhZ2UgPSAxO1xyXG4gICAgICAgIHRoaXMudGFibGVMaXN0UGFyYW1zLnBhZ2VTaXplID0gbnVtO1xyXG4gICAgICAgIHRoaXMuZ2V0VGFibGVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZ0ZXJDaGFuZ2VDaGVjayhyZXN1bHRMaXN0OiBBcnJheTxib29sZWFuPiwgaXNDaGVja0FsbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXNTZWxlY3RJdGVtcyhyZXN1bHRMaXN0KTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkTGlzdCA9IHJlc3VsdExpc3Q7XHJcbiAgICAgICAgdGhpcy5pc1NlbGVjdEFsbCA9IGlzQ2hlY2tBbGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5blvZPliY3lt7LooqvpgInkuK3liJfooahcclxuICAgIGdldFNlbGVjdGVkTGlzdCgpOiBBcnJheTxJb2Q+IHtcclxuICAgICAgICBsZXQgc2VsZWN0ZWREYXRhTGlzdDogQXJyYXk8SW9kPiA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgICAgICB0aGlzLnRCb2R5TGlzdC5mb3JFYWNoKChfZGF0YTogSW9kLCBfaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRMaXN0W19pbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGFMaXN0LnB1c2goX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkRGF0YUxpc3Q7XHJcbiAgICB9XHJcbiAgICAvL+WkmuS4quWIoOmZpFxyXG4gICAgZGVsZXRlQnlJZHMoKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkRGF0YUxpc3Q6IEFycmF5PElvZD4gPSB0aGlzLmdldFNlbGVjdGVkTGlzdCgpO1xyXG4gICAgICAgIGlmICghc2VsZWN0ZWREYXRhTGlzdCB8fCBzZWxlY3RlZERhdGFMaXN0Lmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKHRoaXMuaTE4bkZhY3RvcnkoXCJEUF9DT05GSUdfQ09NTU9OXzg0XCIpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaWRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRGF0YUxpc3QuZm9yRWFjaCgoX2RhdGE6IElvZCkgPT4ge1xyXG4gICAgICAgICAgICBpZHMucHVzaChfZGF0YS5JRCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IHNob3dUZXh0ID0gdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0lPRFNFUlZFUl8xMicse3ZhbHVlOiBpZHMubGVuZ3RofSk7XHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKHNob3dUZXh0LCB7XHJcbiAgICAgICAgICAgIGljb246IDAsXHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLmkxOG5GYWN0b3J5KCdEUF9DT05GSUdfQ09NTU9OXzQyJyksXHJcbiAgICAgICAgICAgIGlvZDogW1wiNTAwcHhcIiwgXCIyMDBweFwiXVxyXG4gICAgICAgIH0sIChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNvbmZpcm0odGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MycpLCB7aWNvbjogMCwgdGl0bGU6IHRoaXMuaTE4bkZhY3RvcnkoJ0RQX0NPTkZJR19DT01NT05fNDInKSxpb2Q6W1wiNTAwcHhcIixcIjIwMHB4XCJdfSwgIChpbmRleDogbnVtYmVyKT0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIuY2xvc2UoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWJtaXREZWxldGVCeUlkcyhpZHMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG4gICAgLy/mj5DkuqTliKDpmaRcclxuICAgIHN1Ym1pdERlbGV0ZUJ5SWRzKGlkczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIHRoaXMuaW9kU2VydmljZS5kZWxldGVCeUlkcyhpZHMpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhYmxlTGlzdFBhcmFtcy5jdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRUYWJsZUxpc3QoKVxyXG4gICAgICAgICAgICAgICAgfSwxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2V0SXNTZWxlY3RJdGVtcyhpdGVtczogQXJyYXk8Ym9vbGVhbj4pe1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICBpZihpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgbGV0IGksbGVuO1xyXG4gICAgICAgICAgICBmb3IoaT0wLGxlbj1pdGVtcy5sZW5ndGg7aTxsZW47aSsrKXtcclxuICAgICAgICAgICAgICAgIGlmKGl0ZW1zW2ldKXtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuaXNTZWxlY3RJdGVtcyAhPT0gcmVzdWx0KXtcclxuICAgICAgICAgICAgdGhpcy5pc1NlbGVjdEl0ZW1zID0gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRyZWVTZWFyY2hJbnB1dEtleVVwKGU6IGFueSkge1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xyXG4gICAgICAgICAgICB0aGlzLmdldFRyZWVMaXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3luY2hyb25pemUoaXRlbTpJb2Qpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGl0ZW0pXHJcbiAgICAgICAgdGhpcy5sYXllci5jb25maXJtKGDnoa7lrprlkIzmraXmraTmnI3liqHlmagke2l0ZW0uTmFtZX0/YCwge1xyXG4gICAgICAgICAgICBpY29uOiAwLFxyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5pMThuRmFjdG9yeSgnRFBfQ09ORklHX0NPTU1PTl80MicpLFxyXG4gICAgICAgICAgICBpb2Q6IFtcIjUwMHB4XCIsIFwiMjAwcHhcIl1cclxuICAgICAgICB9LCAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmlvZFNlcnZpY2Uuc3luY2hyb25pemUoaXRlbS5JRCkudGhlbigocmVzOmFueSk9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLmNsb3NlKGluZGV4KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0cmVlU2VhcmNoSW5wdXRGdW5jKCl7XHJcbiAgICAgICAgdGhpcy5nZXRUcmVlTGlzdCgpO1xyXG4gICAgfVxyXG59XHJcbmFwcC5jb250cm9sbGVyKCdpb2RDb250cm9sbGVyJywgaW9kQ29udHJvbGxlcik7XHJcblxyXG4iXX0=
