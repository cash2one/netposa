define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "css!../../../IntelligentAnalysis/style/cameraPopup.css", "../../../common/services/connectTree.service", "../../../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdvancedElectronicFencePopup = (function () {
        function AdvancedElectronicFencePopup($scope, connectTreeService, $timeout, treeService, layer) {
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
        AdvancedElectronicFencePopup.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithElectronicfence().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        AdvancedElectronicFencePopup.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "ElectronicFenceTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelCam = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        node.treeType === 'ElectronicFence' && _this.cacheSelCam.push(node);
                    });
                    _this.selNum = _this.cacheSelCam.length;
                });
            };
        };
        AdvancedElectronicFencePopup.prototype.saveElectronicFence = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit('close.electronicFence.popup', arr);
        };
        AdvancedElectronicFencePopup.prototype.addCache = function () {
            var _this = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectElectronicFenceList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === 'ElectronicFence' && _this.cacheSelCam.push(node);
                });
                _this.selNum = _this.cacheSelCam.length;
            });
        };
        ;
        AdvancedElectronicFencePopup.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        AdvancedElectronicFencePopup.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.layer.closeAll();
        };
        ;
        AdvancedElectronicFencePopup.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelCam, function (ElectronicFence, index) {
                ElectronicFence.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        AdvancedElectronicFencePopup.prototype.onChangeSearch = function () {
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
        AdvancedElectronicFencePopup.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return AdvancedElectronicFencePopup;
    }());
    main_app_1.app.controller("AdvancedElectronicFencePopup", AdvancedElectronicFencePopup);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkLmVsZWN0cm9uaWNGZW5jZS5wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFtQkE7UUFRSSxzQ0FBb0IsTUFBVyxFQUNYLGtCQUF1QyxFQUN2QyxRQUFZLEVBQ1osV0FBa0MsRUFDbEMsS0FBVTtZQUpWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQVI5QixnQkFBVyxHQUE0QixFQUFFLENBQUM7WUFHMUMsV0FBTSxHQUFVLENBQUMsQ0FBQztZQU9kLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEIsQ0FBQztRQUNPLG1EQUFZLEdBQXBCO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFrQztnQkFDMUYsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNPLHFEQUFjLEdBQXRCO1lBQUEsaUJBY0M7WUFiRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNEJBQWMsRUFBVSxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQUMsS0FBWSxFQUFFLE1BQWMsRUFBRSxRQUFhO2dCQUNsRSxJQUFJLGVBQWUsR0FBRyxLQUFJLENBQUMsV0FBVyxD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LENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFBLENBQUM7UUFHRixxREFBYyxHQUFkO1lBQUEsaUJBTUM7WUFMRyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFBQSxNQUFNLENBQUE7WUFBQSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFBLENBQUM7UUFuRkssb0NBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxvQkFBb0IsRUFBQyxVQUFVLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFvRi9GLG1DQUFDO0tBckZELEFBcUZDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLDRCQUE0QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9hZHZhbmNlZFNlYXJjaC9hZHZhbmNlZC5lbGVjdHJvbmljRmVuY2UucG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBrZXkgb24gMjAxNy82LzE1LlxyXG4gKi9cclxuaW1wb3J0ICdjc3MhLi4vLi4vLi4vSW50ZWxsaWdlbnRBbmFseXNpcy9zdHlsZS9jYW1lcmFQb3B1cC5jc3MnO1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtFbGVjdHJvbmljRmVuY2VFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0VsZWN0cm9uaWNGZW5jZUV4XCI7XHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuXHJcbi8vIOacjeWKoVxyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQge0lDb25uZWN0VHJlZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG50eXBlIEFyZWFFbGVjdHJvbmljRmVuY2VFeCA9IEFyZWFFeCAmIEVsZWN0cm9uaWNGZW5jZUV4O1xyXG5cclxuY2xhc3MgQWR2YW5jZWRFbGVjdHJvbmljRmVuY2VQb3B1cHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCdjb25uZWN0VHJlZVNlcnZpY2UnLCckdGltZW91dCcsJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJywnbGF5ZXInXTtcclxuXHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY2FjaGVTZWxDYW06QXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+ID0gW107XHJcbiAgICBlbGVjdHJvbmljRmVuY2VUcmVlUGFyYW1zOlRyZWVEYXRhUGFyYW1zPEFyZWFFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICBzZWFyY2hTdHI6c3RyaW5nO1xyXG4gICAgc2VsTnVtOm51bWJlciA9IDA7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OmFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSl7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXRUcmVlRGF0YSgpO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZEFyZWFXaXRoRWxlY3Ryb25pY2ZlbmNlKCkudGhlbigoZGF0YXM6QXJyYXk8QXJlYUVsZWN0cm9uaWNGZW5jZUV4Pik9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IGRhdGFzO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZVBhcmFtcygpe1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwiRWxlY3Ryb25pY0ZlbmNlVHJlZVwiO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PntcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwobm9kZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS50cmVlVHlwZSA9PT0gJ0VsZWN0cm9uaWNGZW5jZScgJiYgdGhpcy5jYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxDYW0ubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc2F2ZUVsZWN0cm9uaWNGZW5jZSgpe1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0uZm9yRWFjaCgoaXRlbTpFbGVjdHJvbmljRmVuY2VFeCk9PntcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2UuZWxlY3Ryb25pY0ZlbmNlLnBvcHVwJyxhcnIpXHJcbiAgICB9XHJcbiAgICBhZGRDYWNoZSgpe1xyXG4gICAgICAgIGxldCBwYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8e2tleTpzdHJpbmcsdmFsdWU6c3RyaW5nfT47XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJHNjb3BlLnNlbGVjdEVsZWN0cm9uaWNGZW5jZUxpc3QsKGlkOnN0cmluZyxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHBhcmFtc0xpc3QucHVzaCh7a2V5OidJRCcsdmFsdWU6aWR9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHBhcmFtc0xpc3QsdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsKG5vZGU6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgbm9kZS50cmVlVHlwZSA9PT0gJ0VsZWN0cm9uaWNGZW5jZScgJiYgdGhpcy5jYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjbGVhckFsbCgpe1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICB0aGlzLnNlbE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsZmFsc2UpXHJcbiAgICB9O1xyXG4gICAgY2FuY2VsQ2FtUG9wKCl7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVDaGVja2VkIChub2RlOkVsZWN0cm9uaWNGZW5jZUV4KXtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy5jYWNoZVNlbENhbSwoRWxlY3Ryb25pY0ZlbmNlOmFueSxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIEVsZWN0cm9uaWNGZW5jZS5JRCA9PT0gbm9kZS5JRCAmJiB0aGlzLmNhY2hlU2VsQ2FtLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0tMSk7XHJcbiAgICB9O1xyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuXHJcbiAgICBvbkNoYW5nZVNlYXJjaCgpOmJvb2xlYW57XHJcbiAgICAgICAgaWYoIXRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMpe3JldHVybn1cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsXCJOYW1lXCIsdGhpcy5zZWFyY2hTdHIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfTtcclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJBZHZhbmNlZEVsZWN0cm9uaWNGZW5jZVBvcHVwXCIsIEFkdmFuY2VkRWxlY3Ryb25pY0ZlbmNlUG9wdXApOyJdfQ==
