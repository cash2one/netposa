define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "../../../common/services/area.service", "../../../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SelectArea = (function () {
        function SelectArea($scope, areaService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.areaService = areaService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.initTreeParams();
            this.initTreeData();
        }
        SelectArea.prototype.initTreeData = function () {
            var _this = this;
            this.areaService.findListTree().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        SelectArea.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "faceLibTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelFaceLib = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        _this.cacheSelFaceLib.push(node);
                    });
                    _this.selNum = _this.cacheSelFaceLib.length;
                });
            };
        };
        SelectArea.prototype.saveFacelib = function () {
            var arr = [];
            this.cacheSelFaceLib.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit('close.area.popup', arr);
        };
        ;
        SelectArea.prototype.addCache = function () {
            var _this = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectCameraList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === 'businessLib' && _this.cacheSelFaceLib.push(node);
                });
                _this.selNum = _this.cacheSelFaceLib.length;
            });
        };
        ;
        SelectArea.prototype.clearAll = function () {
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        SelectArea.prototype.cancelFacelibPop = function () {
            this.cacheSelFaceLib = [];
            this.layer.closeAll();
        };
        ;
        SelectArea.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelFaceLib, function (businessLib, index) {
                businessLib.ID === node.ID && _this.cacheSelFaceLib.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        SelectArea.prototype.onChangeSearch = function () {
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
        SelectArea.$inject = ['$scope', 'areaService', '$timeout', 'treeDirectiveService', 'layer'];
        return SelectArea;
    }());
    main_app_1.app.controller("SelectAreaPupup", SelectArea);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvcG9wdXBQYWdlL3NlbGVjdEFyZWEvU2VsZWN0QXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFnQkE7UUFPSSxvQkFBb0IsTUFBVyxFQUNYLFdBQXlCLEVBQ3pCLFFBQVksRUFDWixXQUFrQyxFQUNsQyxLQUFVO1lBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBQ3pCLGFBQVEsR0FBUixRQUFRLENBQUk7WUFDWixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQVA5QixvQkFBZSxHQUF3QixFQUFFLENBQUM7WUFFMUMsV0FBTSxHQUFVLENBQUMsQ0FBQztZQU1kLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNPLGlDQUFZLEdBQXBCO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQW9CO2dCQUN0RCxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ08sbUNBQWMsR0FBdEI7WUFBQSxpQkFjQztZQWJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQUMsS0FBWSxFQUFFLE1BQWMsRUFBRSxRQUFhO2dCQUNsRSxJQUFJLGVBQWUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFD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QUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFBQSxDQUFDO1FBRUYsbUNBQWMsR0FBZDtZQUFBLGlCQU1DO1lBTEcsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7Z0JBQUEsTUFBTSxDQUFBO1lBQUEsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkYsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQSxDQUFDO1FBL0VLLGtCQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLENBQUMsQ0FBQztRQWdGeEYsaUJBQUM7S0FqRkQsQUFpRkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3BvcHVwUGFnZS9zZWxlY3RBcmVhL1NlbGVjdEFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBsYiBvbiAyMDE3LzEwLzMwIDAwMzAuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJQXJlYVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7QnVzaW5lc3NMaWJFeH0gZnJvbSBcIi4uLy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbnR5cGUgQXJlYUZhY2VMaWJFeCA9IEFyZWFFeCAmIEJ1c2luZXNzTGliRXg7XHJcblxyXG5jbGFzcyBTZWxlY3RBcmVhe1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ2FyZWFTZXJ2aWNlJywnJHRpbWVvdXQnLCd0cmVlRGlyZWN0aXZlU2VydmljZScsJ2xheWVyJ107XHJcblxyXG4gICAgdHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGNhY2hlU2VsRmFjZUxpYjpBcnJheTxCdXNpbmVzc0xpYkV4PiA9IFtdO1xyXG4gICAgc2VhcmNoU3RyOnN0cmluZztcclxuICAgIHNlbE51bTpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KXtcclxuICAgICAgICB0aGlzLmluaXRUcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGEoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVEYXRhKCl7XHJcbiAgICAgICAgdGhpcy5hcmVhU2VydmljZS5maW5kTGlzdFRyZWUoKS50aGVuKChkYXRhczogQXJyYXk8QXJlYUV4PikgPT57XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSBkYXRhcztcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZVBhcmFtcygpe1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KCk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwiZmFjZUxpYlRyZWVcIjtcclxuICAgICAgICB0aGlzLnNlYXJjaFN0ciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkgPT57XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2hlY2tlZE5vZGVMaXN0LChub2RlOmFueSk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYi5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxGYWNlTGliLmxlbmd0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHNhdmVGYWNlbGliKCl7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbEZhY2VMaWIuZm9yRWFjaCgoaXRlbTphbnkpPT57XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0uSUQpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLmFyZWEucG9wdXAnLGFycilcclxuICAgIH07XHJcbiAgICBhZGRDYWNoZSgpe1xyXG4gICAgICAgIGxldCBwYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8e2tleTpzdHJpbmcsdmFsdWU6c3RyaW5nfT47XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHRoaXMuJHNjb3BlLnNlbGVjdENhbWVyYUxpc3QsKGlkOnN0cmluZyxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIHBhcmFtc0xpc3QucHVzaCh7a2V5OidJRCcsdmFsdWU6aWR9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tOb2Rlc0J5UGFyYW1zTGlzdCh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHBhcmFtc0xpc3QsdHJ1ZSk7XHJcblxyXG4gICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHRydWUpO1xyXG5cclxuICAgICAgICB0aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsKG5vZGU6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgbm9kZS50cmVlVHlwZSA9PT0gJ2J1c2luZXNzTGliJyAmJiB0aGlzLmNhY2hlU2VsRmFjZUxpYi5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsRmFjZUxpYi5sZW5ndGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY2xlYXJBbGwoKXtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYiA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID0gMDtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCxmYWxzZSlcclxuICAgIH07XHJcbiAgICBjYW5jZWxGYWNlbGliUG9wKCl7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbEZhY2VMaWIgPSBbXTtcclxuICAgICAgICB0aGlzLmxheWVyLmNsb3NlQWxsKCk7XHJcbiAgICB9O1xyXG4gICAgcmVtb3ZlQ2hlY2tlZCAobm9kZTpCdXNpbmVzc0xpYkV4KXtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy5jYWNoZVNlbEZhY2VMaWIsKGJ1c2luZXNzTGliOmFueSxpbmRleDpudW1iZXIpPT57XHJcbiAgICAgICAgICAgIGJ1c2luZXNzTGliLklEID09PSBub2RlLklEICYmIHRoaXMuY2FjaGVTZWxGYWNlTGliLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0tMSk7XHJcbiAgICB9O1xyXG4gICAgLy/mkJzntKLmoYbmlLnlj5hcclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6Ym9vbGVhbntcclxuICAgICAgICBpZighdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyl7cmV0dXJufVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCxcIk5hbWVcIix0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIlNlbGVjdEFyZWFQdXB1cFwiLCBTZWxlY3RBcmVhKTsiXX0=
