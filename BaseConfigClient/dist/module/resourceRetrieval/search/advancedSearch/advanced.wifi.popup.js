define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "css!../../../IntelligentAnalysis/style/cameraPopup.css", "../../../common/services/connectTree.service", "../../../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdvancedWifiPopup = (function () {
        function AdvancedWifiPopup($scope, connectTreeService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.initTreeParams();
            this.initTreeData();
        }
        AdvancedWifiPopup.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithWifi().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        AdvancedWifiPopup.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "wifiTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelCam = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        node.treeType === 'wifi' && _this.cacheSelCam.push(node);
                    });
                    _this.selNum = _this.cacheSelCam.length;
                });
            };
        };
        AdvancedWifiPopup.prototype.saveWifi = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit('close.wifi.popup', arr);
        };
        ;
        AdvancedWifiPopup.prototype.addCache = function () {
            var _this = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectWifiList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === 'wifi' && _this.cacheSelCam.push(node);
                });
                _this.selNum = _this.cacheSelCam.length;
            });
        };
        ;
        AdvancedWifiPopup.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        AdvancedWifiPopup.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.layer.closeAll();
        };
        ;
        AdvancedWifiPopup.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelCam, function (wifi, index) {
                wifi.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        AdvancedWifiPopup.prototype.onChangeSearch = function () {
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
        AdvancedWifiPopup.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return AdvancedWifiPopup;
    }());
    main_app_1.app.controller("AdvancedWifiPopup", AdvancedWifiPopup);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkLndpZmkucG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0JBO1FBUUksMkJBQW9CLE1BQVcsRUFDWCxrQkFBdUMsRUFDdkMsUUFBWSxFQUNaLFdBQWtDLEVBQ2xDLEtBQVU7WUFKVixXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQ1gsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1lBQ2xDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFSOUIsZ0JBQVcsR0FBaUIsRUFBRSxDQUFDO1lBRy9CLFdBQU0sR0FBVSxDQUFDLENBQUM7WUFPZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXhCLENBQUM7UUFDTyx3Q0FBWSxHQUFwQjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBdUI7Z0JBQ3BFLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTywwQ0FBYyxHQUF0QjtZQUFBLGlCQWNDO1lBYkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFZLEVBQUUsTUFBYyxFQUFFLFFBQWE7Z0JBQ2xFLElBQUksZUFBZSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFD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QyxDQUFDLENBQUMsQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFBQSxDQUFDO1FBR0YsMENBQWMsR0FBZDtZQUFBLGlCQU1DO1lBTEcsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQUEsTUFBTSxDQUFBO1lBQUEsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkYsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQSxDQUFDO1FBbkZLLHlCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsb0JBQW9CLEVBQUMsVUFBVSxFQUFDLHNCQUFzQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBb0YvRix3QkFBQztLQXJGRCxBQXFGQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9zZWFyY2gvYWR2YW5jZWRTZWFyY2gvYWR2YW5jZWQud2lmaS5wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGtleSBvbiAyMDE3LzYvMTUuXHJcbiAqL1xyXG5pbXBvcnQgJ2NzcyEuLi8uLi8uLi9JbnRlbGxpZ2VudEFuYWx5c2lzL3N0eWxlL2NhbWVyYVBvcHVwLmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge1dpZmlFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1dpZmlFeFwiO1xyXG5pbXBvcnQge1RyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcblxyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbnR5cGUgQXJlYVdpZmlFeCA9IEFyZWFFeCAmIFdpZmlFeDtcclxuXHJcbmNsYXNzIEFkdmFuY2VkV2lmaVBvcHVwe1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ2Nvbm5lY3RUcmVlU2VydmljZScsJyR0aW1lb3V0JywndHJlZURpcmVjdGl2ZVNlcnZpY2UnLCdsYXllciddO1xyXG5cclxuICAgIHRyZWVQYXJhbXM6IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICBjYWNoZVNlbENhbTpBcnJheTxXaWZpRXg+ID0gW107XHJcbiAgICB3aWZpVHJlZVBhcmFtczpUcmVlRGF0YVBhcmFtczxBcmVhV2lmaUV4PjtcclxuICAgIHNlYXJjaFN0cjpzdHJpbmc7XHJcbiAgICBzZWxOdW06bnVtYmVyID0gMDtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KXtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVEYXRhKCk7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZURhdGEoKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYVdpdGhXaWZpKCkudGhlbigoZGF0YXM6QXJyYXk8QXJlYVdpZmlFeD4pPT57XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSBkYXRhcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKXtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSWQgPSBcIndpZmlUcmVlXCI7XHJcbiAgICAgICAgdGhpcy5zZWFyY2hTdHIgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy5vbkNoZWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpID0+e1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZE5vZGVMaXN0ID0gdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCx0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2hlY2tlZE5vZGVMaXN0LChub2RlOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnd2lmaScgJiYgdGhpcy5jYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxDYW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc2F2ZVdpZmkoKXtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtLmZvckVhY2goKGl0ZW06V2lmaUV4KT0+e1xyXG4gICAgICAgICAgICBhcnIucHVzaChpdGVtLklEKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbG9zZS53aWZpLnBvcHVwJyxhcnIpXHJcbiAgICB9O1xyXG4gICAgYWRkQ2FjaGUoKXtcclxuICAgICAgICBsZXQgcGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHtrZXk6c3RyaW5nLHZhbHVlOnN0cmluZ30+O1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLiRzY29wZS5zZWxlY3RXaWZpTGlzdCwoaWQ6c3RyaW5nLGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6J0lEJyx2YWx1ZTppZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMudHJlZVBhcmFtcy50cmVlSWQscGFyYW1zTGlzdCx0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwobm9kZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnd2lmaScgJiYgdGhpcy5jYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjbGVhckFsbCgpe1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICB0aGlzLnNlbE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsZmFsc2UpXHJcbiAgICB9O1xyXG4gICAgY2FuY2VsQ2FtUG9wKCl7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVDaGVja2VkIChub2RlOldpZmlFeCl7XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuY2FjaGVTZWxDYW0sKHdpZmk6YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgd2lmaS5JRCA9PT0gbm9kZS5JRCAmJiB0aGlzLmNhY2hlU2VsQ2FtLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0tMSk7XHJcbiAgICB9O1xyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuXHJcbiAgICBvbkNoYW5nZVNlYXJjaCgpOmJvb2xlYW57XHJcbiAgICAgICAgaWYoIXRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMpe3JldHVybn1cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsXCJOYW1lXCIsdGhpcy5zZWFyY2hTdHIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJBZHZhbmNlZFdpZmlQb3B1cFwiLCBBZHZhbmNlZFdpZmlQb3B1cCk7Il19
