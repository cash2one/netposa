define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/enum/TreeType", "lodash", "css!../style/tree.css", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1, TreeType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeWifiPopupController = (function () {
        function TreeWifiPopupController($scope, connectTreeService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.selectWifiList = [];
            this.selectCtrlCb = $scope.selectCtrlCb || "close.wifi.popup";
            this.selectWifiList = $scope.selectCameraList;
            this.initTreeParams();
        }
        TreeWifiPopupController.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithWifi().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        TreeWifiPopupController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "wifiTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.checkedUpdate(checkedNodeList);
            };
            this.initTreeData();
        };
        TreeWifiPopupController.prototype.saveWifi = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                console.log(item);
                arr.push(item.ID);
            });
            this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree");
        };
        ;
        TreeWifiPopupController.prototype.addCache = function () {
            var self = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectWifiList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.wifi.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        ;
        TreeWifiPopupController.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        TreeWifiPopupController.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.$scope.$emit(this.selectCtrlCb, [], false);
        };
        ;
        TreeWifiPopupController.prototype.removeChecked = function (node) {
            var _this = this;
            var selectWifiList = _.pull(this.selectWifiList, node.ID);
            this.selectWifiList = selectWifiList;
            angular.forEach(this.cacheSelCam, function (camera, index) {
                camera.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
            this.treeService.updateNodeChecked(this.treeParams.treeId, node.tId, false);
        };
        ;
        TreeWifiPopupController.prototype.onChangeSearch = function () {
            var _this = this;
            if (!this.treeParams.treeDatas) {
                return;
            }
            this.$timeout(function () {
                _this.treeService.filterShowNodes(_this.treeParams.treeId, "Name", _this.searchStr);
            });
            return true;
        };
        ;
        TreeWifiPopupController.prototype.checkedUpdate = function (checkedNodeList) {
            var self = this;
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.wifi.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        TreeWifiPopupController.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return TreeWifiPopupController;
    }());
    main_app_1.app.controller("treeWifiPopupController", TreeWifiPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvc2VsZWN0UG9wdXAvdHJlZVdpRmkvVHJlZS53aWZpLnBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW9CQTtRQVdJLGlDQUFvQixNQUFXLEVBQ1gsa0JBQXVDLEVBQ3ZDLFFBQWEsRUFDYixXQUFrQyxFQUNsQyxLQUFVO1lBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBWDlCLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztZQUdoQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1lBRW5CLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztZQU8vQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksa0JBQWtCLENBQUM7WUFDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTFCLENBQUM7UUFFTyw4Q0FBWSxHQUFwQjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBd0I7Z0JBQ3JFLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxnREFBYyxHQUF0QjtZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcs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Q0FBQyxlQUFlLEVBQUUsVUFBQyxJQUFTO29CQUN2QyxJQUFJLENBQUMsUUFBUSxLQUFLLG1CQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQWhITSwrQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQWlIbkcsOEJBQUM7S0FsSEQsQUFrSEMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvc2VsZWN0UG9wdXAvdHJlZVdpRmkvVHJlZS53aWZpLnBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uL3N0eWxlL3RyZWUuY3NzJztcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcblxyXG4vLyDlj4LmlbBcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtXaWZpRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9XaWZpRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxudHlwZSBBcmVhV2lmaUV4ID0gQXJlYUV4ICYgV2lmaUV4O1xyXG5cclxuY2xhc3MgVHJlZVdpZmlQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdjb25uZWN0VHJlZVNlcnZpY2UnLCAnJHRpbWVvdXQnLCAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLCAnbGF5ZXInXTtcclxuXHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY2FjaGVTZWxDYW06IEFycmF5PFdpZmlFeD4gPSBbXTtcclxuICAgIHdpZmlUcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhV2lmaUV4PjtcclxuICAgIHNlYXJjaFN0cjogc3RyaW5nO1xyXG4gICAgc2VsTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgc2VsZWN0Q3RybENiOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RXaWZpTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0Q3RybENiID0gJHNjb3BlLnNlbGVjdEN0cmxDYiB8fCBcImNsb3NlLndpZmkucG9wdXBcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdFdpZmlMaXN0ID0gJHNjb3BlLnNlbGVjdENhbWVyYUxpc3Q7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmVlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYVdpdGhXaWZpKCkudGhlbigoZGF0YXM6IEFycmF5PEFyZWFXaWZpRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSBkYXRhcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwid2lmaVRyZWVcIjtcclxuICAgICAgICB0aGlzLnNlYXJjaFN0ciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZE5vZGVMaXN0ID0gdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZFVwZGF0ZShjaGVja2VkTm9kZUxpc3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlV2lmaSgpIHtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtLmZvckVhY2goKGl0ZW06IFdpZmlFeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpdGVtKTtcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnNlbGVjdEN0cmxDYiwgYXJyLCB0cnVlLCBudWxsLCBcInRyZWVcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIGFkZENhY2hlKCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgcGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT47XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJHNjb3BlLnNlbGVjdFdpZmlMaXN0LCAoaWQ6IHN0cmluZywgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBwYXJhbXNMaXN0LnB1c2goe2tleTogJ0lEJywgdmFsdWU6IGlkfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrTm9kZXNCeVBhcmFtc0xpc3QodGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgcGFyYW1zTGlzdCwgdHJ1ZSk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIHRydWUpO1xyXG4gICAgICAgIGxldCBjYWNoZVNlbENhbTogQXJyYXk8V2lmaUV4PiA9IFtdO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2hlY2tlZE5vZGVMaXN0LCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSBUcmVlVHlwZS53aWZpLnZhbHVlICYmIGNhY2hlU2VsQ2FtLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmNhY2hlU2VsQ2FtID0gY2FjaGVTZWxDYW07XHJcbiAgICAgICAgICAgIHNlbGYuc2VsTnVtID0gY2FjaGVTZWxDYW0ubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBjbGVhckFsbCgpIHtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxOdW0gPSAwO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCBmYWxzZSlcclxuICAgIH07XHJcblxyXG4gICAgY2FuY2VsQ2FtUG9wKCkge1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnNlbGVjdEN0cmxDYiwgW10sIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgcmVtb3ZlQ2hlY2tlZChub2RlOiBXaWZpRXgpIHtcclxuICAgICAgICBsZXQgc2VsZWN0V2lmaUxpc3QgPSBfLnB1bGwodGhpcy5zZWxlY3RXaWZpTGlzdCwgbm9kZS5JRCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RXaWZpTGlzdCA9IHNlbGVjdFdpZmlMaXN0O1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsQ2FtLCAoY2FtZXJhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY2FtZXJhLklEID09PSBub2RlLklEICYmIHRoaXMuY2FjaGVTZWxDYW0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0gLSAxKTtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIG5vZGUudElkLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gYW5ndWxhci5mb3JFYWNoKHRoaXMuY2FjaGVTZWxDYW0sICh3aWZpOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAvLyAgICAgd2lmaS5JRCA9PT0gbm9kZS5JRCAmJiB0aGlzLmNhY2hlU2VsQ2FtLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy8gdGhpcy5zZWxOdW0gPiAwICYmICh0aGlzLnNlbE51bSA9IHRoaXMuc2VsTnVtIC0gMSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8v5pCc57Si5qGG5pS55Y+YXHJcblxyXG4gICAgb25DaGFuZ2VTZWFyY2goKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgXCJOYW1lXCIsIHRoaXMuc2VhcmNoU3RyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgY2hlY2tlZFVwZGF0ZShjaGVja2VkTm9kZUxpc3QpIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGNhY2hlU2VsQ2FtOiBBcnJheTxXaWZpRXg+ID0gW107XHJcbiAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUudHJlZVR5cGUgPT09IFRyZWVUeXBlLndpZmkudmFsdWUgJiYgY2FjaGVTZWxDYW0ucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuY2FjaGVTZWxDYW0gPSBjYWNoZVNlbENhbTtcclxuICAgICAgICAgICAgc2VsZi5zZWxOdW0gPSBjYWNoZVNlbENhbS5sZW5ndGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidHJlZVdpZmlQb3B1cENvbnRyb2xsZXJcIiwgVHJlZVdpZmlQb3B1cENvbnRyb2xsZXIpOyJdfQ==
