define(["require", "exports", "../common/app/main.app", "../common/directive/tree/tree-params", "css!./style/cameraPopup.css", "../common/directive/tree/tree.directive.service", "../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnalysisCameraPopup = (function () {
        function AnalysisCameraPopup($scope, connectTreeService, $timeout, treeService, layer) {
            var _this = this;
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.$scope.$on('$destory', function () {
                _this.$scope.$emit('close.camera.popup', [], false);
            });
            this.initTreeParams();
        }
        AnalysisCameraPopup.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaCamera().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        AnalysisCameraPopup.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "cameraTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelCam = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        node.treeType === 'camera' && _this.cacheSelCam.push(node);
                    });
                    _this.selNum = _this.cacheSelCam.length;
                });
            };
            this.initTreeData();
        };
        AnalysisCameraPopup.prototype.saveCamera = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit('close.camera.popup', arr, true);
        };
        ;
        AnalysisCameraPopup.prototype.addCache = function () {
            var _this = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectCameraList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === 'camera' && _this.cacheSelCam.push(node);
                });
                _this.selNum = _this.cacheSelCam.length;
            });
        };
        ;
        AnalysisCameraPopup.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        AnalysisCameraPopup.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.$scope.$emit('close.camera.popup', [], false);
        };
        ;
        AnalysisCameraPopup.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelCam, function (camera, index) {
                camera.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        AnalysisCameraPopup.prototype.onChangeSearch = function () {
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
        AnalysisCameraPopup.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return AnalysisCameraPopup;
    }());
    main_app_1.app.controller("AnalysisCameraPopup", AnalysisCameraPopup);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9BbmFseXNpcy5jYW1lcmEucG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBbUJBO1FBUUksNkJBQW9CLE1BQVcsRUFDWCxrQkFBdUMsRUFDdkMsUUFBYSxFQUNiLFdBQWtDLEVBQ2xDLEtBQVU7WUFKOUIsaUJBVUM7WUFWbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUNiLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBVDlCLGdCQUFXLEdBQW9CLEVBQUUsQ0FBQztZQUdsQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1lBT2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUE7WUFDdEQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFMUIsQ0FBQztRQUVPLDBDQUFZLEdBQXBCO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBMEI7Z0JBQ3JFLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyw0Q0FBYyxHQUF0QjtZQUFBLGlCQWVDO1lBZEcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFD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R0FBYixVQUFjLElBQWM7WUFBNUIsaUJBS0M7WUFKRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxNQUFXLEVBQUUsS0FBYTtnQkFDekQsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsRUFBRSxJQUFJLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQSxDQUFDO1FBSUYsNENBQWMsR0FBZDtZQUFBLGlCQVFDO1lBUEcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQSxDQUFDO1FBL0ZLLDJCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBZ0duRywwQkFBQztLQWpHRCxBQWlHQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0FuYWx5c2lzLmNhbWVyYS5wb3B1cC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGtleSBvbiAyMDE3LzYvMTUuXHJcbiAqL1xyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL2NhbWVyYVBvcHVwLmNzcyc7XHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtDYW1lcmFFeH0gZnJvbSBcIi4uLy4uL2NvcmUvZW50aXR5L2V4L0NhbWVyYUV4XCI7XHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVHJlZURpcmVjdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtJQ29ubmVjdFRyZWVTZXJ2aWNlfSBmcm9tIFwiLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbnR5cGUgQXJlYUNhbWVyYUV4ID0gQXJlYUV4ICYgQ2FtZXJhRXg7XHJcblxyXG5jbGFzcyBBbmFseXNpc0NhbWVyYVBvcHVwIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnY29ubmVjdFRyZWVTZXJ2aWNlJywgJyR0aW1lb3V0JywgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJywgJ2xheWVyJ107XHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY2FjaGVTZWxDYW06IEFycmF5PENhbWVyYUV4PiA9IFtdO1xyXG4gICAgY2FtZXJhVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUNhbWVyYUV4PjtcclxuICAgIHNlYXJjaFN0cjogc3RyaW5nO1xyXG4gICAgc2VsTnVtOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbignJGRlc3RvcnknLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbG9zZS5jYW1lcmEucG9wdXAnLCBbXSwgZmFsc2UpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmVlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYUNhbWVyYSgpLnRoZW4oKGRhdGFzOiBBcnJheTxBcmVhQ2FtZXJhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSBkYXRhcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmVlUGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwiY2FtZXJhVHJlZVwiO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnY2FtZXJhJyAmJiB0aGlzLmNhY2hlU2VsQ2FtLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsTnVtID0gdGhpcy5jYWNoZVNlbENhbS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlQ2FtZXJhKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0uZm9yRWFjaCgoaXRlbTogQ2FtZXJhRXgpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UuY2FtZXJhLnBvcHVwJywgYXJyLCB0cnVlKVxyXG4gICAgfTtcclxuXHJcbiAgICBhZGRDYWNoZSgpIHtcclxuICAgICAgICBsZXQgcGFyYW1zTGlzdCA9IFtdIGFzIEFycmF5PHsga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfT47XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJHNjb3BlLnNlbGVjdENhbWVyYUxpc3QsIChpZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgIHBhcmFtc0xpc3QucHVzaCh7a2V5OiAnSUQnLCB2YWx1ZTogaWR9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCBwYXJhbXNMaXN0LCB0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwgKG5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm9kZS50cmVlVHlwZSA9PT0gJ2NhbWVyYScgJiYgdGhpcy5jYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgY2xlYXJBbGwoKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID0gMDtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgZmFsc2UpXHJcbiAgICB9O1xyXG5cclxuICAgIGNhbmNlbENhbVBvcCgpIHtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtID0gW107XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLmNhbWVyYS5wb3B1cCcsIFtdLCBmYWxzZSlcclxuICAgIH07XHJcblxyXG4gICAgcmVtb3ZlQ2hlY2tlZChub2RlOiBDYW1lcmFFeCkge1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsQ2FtLCAoY2FtZXJhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY2FtZXJhLklEID09PSBub2RlLklEICYmIHRoaXMuY2FjaGVTZWxDYW0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0gLSAxKTtcclxuICAgIH07XHJcblxyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuXHJcbiAgICBvbkNoYW5nZVNlYXJjaCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmZpbHRlclNob3dOb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCBcIk5hbWVcIiwgdGhpcy5zZWFyY2hTdHIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJBbmFseXNpc0NhbWVyYVBvcHVwXCIsIEFuYWx5c2lzQ2FtZXJhUG9wdXApOyJdfQ==
