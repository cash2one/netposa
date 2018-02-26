define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/enum/TreeType", "lodash", "css!../style/tree.css", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1, TreeType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeBayonetPopupController = (function () {
        function TreeBayonetPopupController($scope, connectTreeService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.selectBayonetList = [];
            this.selectCtrlCb = $scope.selectCtrlCb || "close.bayonet.popup";
            this.selectBayonetList = $scope.selectBayonetList;
            this.initTreeParams();
        }
        TreeBayonetPopupController.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithRmpgate().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        TreeBayonetPopupController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "bayonetTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.checkedUpdate(checkedNodeList);
            };
            this.initTreeData();
        };
        TreeBayonetPopupController.prototype.saveCamera = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree");
        };
        ;
        TreeBayonetPopupController.prototype.addCache = function () {
            var self = this;
            var paramsList = [];
            angular.forEach(self.selectBayonetList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            self.treeService.checkNodesByParamsList(self.treeParams.treeId, paramsList, true);
            var checkedNodeList = self.treeService.getCheckedNodes(self.treeParams.treeId, true);
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.rmpGate.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        ;
        TreeBayonetPopupController.prototype.clearAll = function () {
            this.selectBayonetList = [];
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        TreeBayonetPopupController.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.$scope.$emit(this.selectCtrlCb, [], false);
        };
        ;
        TreeBayonetPopupController.prototype.removeChecked = function (node) {
            var _this = this;
            var selectBayonetList = _.pull(this.selectBayonetList, node.ID);
            this.selectBayonetList = selectBayonetList;
            angular.forEach(this.cacheSelCam, function (camera, index) {
                camera.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
            this.treeService.updateNodeChecked(this.treeParams.treeId, node.tId, false);
        };
        ;
        TreeBayonetPopupController.prototype.onChangeSearch = function () {
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
        TreeBayonetPopupController.prototype.checkedUpdate = function (checkedNodeList) {
            var self = this;
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.rmpGate.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        TreeBayonetPopupController.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return TreeBayonetPopupController;
    }());
    main_app_1.app.controller("treeBayonetPopupController", TreeBayonetPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvc2VsZWN0UG9wdXAvdHJlZUJheW9uZXQvVHJlZS5iYXlvbmV0LnBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFCQTtRQVdJLG9DQUFvQixNQUFXLEVBQ1gsa0JBQXVDLEVBQ3ZDLFFBQWEsRUFDYixXQUFrQyxFQUNsQyxLQUFVO1lBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBWDlCLGdCQUFXLEdBQXFCLEVBQUUsQ0FBQztZQUduQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1lBRW5CLHNCQUFpQixHQUFrQixFQUFFLENBQUM7WUFPbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxJQUFJLHFCQUFxQixDQUFDO1lBQ2pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsaUJBQWlCLENBQUM7WUFDbEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFTyxpREFBWSxHQUFwQjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBMkI7Z0JBQzNFLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxtREFBYyxHQUF0QjtZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxP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T0FBTyxDQUFDLGVBQWUsRUFBRSxVQUFDLElBQVM7b0JBQ3ZDLElBQUksQ0FBQyxRQUFRLEtBQUssbUJBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO2dCQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBMUdNLGtDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBNEduRyxpQ0FBQztLQTdHRCxBQTZHQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9zZWxlY3RQb3B1cC90cmVlQmF5b25ldC9UcmVlLmJheW9uZXQucG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvdHJlZS5jc3MnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ29ubmVjdFRyZWVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge1JtcEdhdGVFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1JtcEdhdGVFeFwiO1xyXG5pbXBvcnQge1RyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7VHJlZVR5cGV9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVHJlZVR5cGVcIjtcclxuXHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxudHlwZSBBcmVhUm1wR2F0ZUV4ID0gQXJlYUV4ICYgUm1wR2F0ZUV4O1xyXG5cclxuY2xhc3MgVHJlZUJheW9uZXRQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdjb25uZWN0VHJlZVNlcnZpY2UnLCAnJHRpbWVvdXQnLCAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLCAnbGF5ZXInXTtcclxuXHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY2FjaGVTZWxDYW06IEFycmF5PFJtcEdhdGVFeD4gPSBbXTtcclxuICAgIGNhbWVyYVRyZWVQYXJhbXM6IFRyZWVEYXRhUGFyYW1zPEFyZWFSbXBHYXRlRXg+O1xyXG4gICAgc2VhcmNoU3RyOiBzdHJpbmc7XHJcbiAgICBzZWxOdW06IG51bWJlciA9IDA7XHJcbiAgICBzZWxlY3RDdHJsQ2I6IHN0cmluZztcclxuICAgIHNlbGVjdEJheW9uZXRMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdFRyZWVTZXJ2aWNlOiBJQ29ubmVjdFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdHJsQ2IgPSAkc2NvcGUuc2VsZWN0Q3RybENiIHx8IFwiY2xvc2UuYmF5b25ldC5wb3B1cFwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QmF5b25ldExpc3QgPSAkc2NvcGUuc2VsZWN0QmF5b25ldExpc3Q7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyZWVEYXRhKCkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRBcmVhV2l0aFJtcGdhdGUoKS50aGVuKChkYXRhczogQXJyYXk8QXJlYVJtcEdhdGVFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IGRhdGFzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZUlkID0gXCJiYXlvbmV0VHJlZVwiO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja2VkVXBkYXRlKGNoZWNrZWROb2RlTGlzdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmluaXRUcmVlRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNhdmVDYW1lcmEoKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbS5mb3JFYWNoKChpdGVtOiBSbXBHYXRlRXgpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnNlbGVjdEN0cmxDYiwgYXJyLCB0cnVlLCBudWxsLCBcInRyZWVcIilcclxuICAgIH07XHJcblxyXG4gICAgYWRkQ2FjaGUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9PjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2goc2VsZi5zZWxlY3RCYXlvbmV0TGlzdCwgKGlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6ICdJRCcsIHZhbHVlOiBpZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHNlbGYudHJlZVBhcmFtcy50cmVlSWQsIHBhcmFtc0xpc3QsIHRydWUpO1xyXG4gICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSBzZWxmLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2RlcyhzZWxmLnRyZWVQYXJhbXMudHJlZUlkLCB0cnVlKTtcclxuICAgICAgICBsZXQgY2FjaGVTZWxDYW06IEFycmF5PFJtcEdhdGVFeD4gPSBbXTtcclxuICAgICAgICBzZWxmLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS50cmVlVHlwZSA9PT0gVHJlZVR5cGUucm1wR2F0ZS52YWx1ZSAmJiBjYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5jYWNoZVNlbENhbSA9IGNhY2hlU2VsQ2FtO1xyXG4gICAgICAgICAgICBzZWxmLnNlbE51bSA9IGNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2xlYXJBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RCYXlvbmV0TGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICB0aGlzLnNlbE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW5jZWxDYW1Qb3AoKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KHRoaXMuc2VsZWN0Q3RybENiLCBbXSwgZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmVDaGVja2VkKG5vZGU6IFJtcEdhdGVFeCkge1xyXG4gICAgICAgIGxldCBzZWxlY3RCYXlvbmV0TGlzdCA9IF8ucHVsbCh0aGlzLnNlbGVjdEJheW9uZXRMaXN0LCBub2RlLklEKTtcclxuICAgICAgICB0aGlzLnNlbGVjdEJheW9uZXRMaXN0ID0gc2VsZWN0QmF5b25ldExpc3Q7XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuY2FjaGVTZWxDYW0sIChjYW1lcmE6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBjYW1lcmEuSUQgPT09IG5vZGUuSUQgJiYgdGhpcy5jYWNoZVNlbENhbS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID4gMCAmJiAodGhpcy5zZWxOdW0gPSB0aGlzLnNlbE51bSAtIDEpO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UudXBkYXRlTm9kZUNoZWNrZWQodGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgbm9kZS50SWQsIGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIFwiTmFtZVwiLCB0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNoZWNrZWRVcGRhdGUoY2hlY2tlZE5vZGVMaXN0KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjYWNoZVNlbENhbTogQXJyYXk8Um1wR2F0ZUV4PiA9IFtdO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2hlY2tlZE5vZGVMaXN0LCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSBUcmVlVHlwZS5ybXBHYXRlLnZhbHVlICYmIGNhY2hlU2VsQ2FtLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmNhY2hlU2VsQ2FtID0gY2FjaGVTZWxDYW07XHJcbiAgICAgICAgICAgIHNlbGYuc2VsTnVtID0gY2FjaGVTZWxDYW0ubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ0cmVlQmF5b25ldFBvcHVwQ29udHJvbGxlclwiLCBUcmVlQmF5b25ldFBvcHVwQ29udHJvbGxlcik7Il19
