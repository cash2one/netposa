define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "css!../style/tree.css", "../../common/directive/tree/tree.directive.service", "../../common/services/area.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeArea = (function () {
        function TreeArea($scope, areaService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.areaService = areaService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.selectCameraList = [];
            this.selectCtrlCb = $scope.selectCtrlCb || "close.area.popup";
            this.selectCameraList = $scope.selectCameraList;
            this.initTreeParams();
            this.initTreeData();
        }
        TreeArea.prototype.initTreeData = function () {
            var _this = this;
            this.areaService.findListTree().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        TreeArea.prototype.initTreeParams = function () {
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
        TreeArea.prototype.saveFacelib = function () {
            var arr = [];
            this.cacheSelFaceLib.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit(this.selectCtrlCb, arr, true);
        };
        ;
        TreeArea.prototype.addCache = function () {
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
        TreeArea.prototype.clearAll = function () {
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        TreeArea.prototype.cancelFacelibPop = function () {
            this.cacheSelFaceLib = [];
            this.$scope.$emit(this.selectCtrlCb, [], true);
        };
        ;
        TreeArea.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelFaceLib, function (businessLib, index) {
                businessLib.ID === node.ID && _this.cacheSelFaceLib.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        TreeArea.prototype.onChangeSearch = function () {
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
        TreeArea.$inject = ['$scope', 'areaService', '$timeout', 'treeDirectiveService', 'layer'];
        return TreeArea;
    }());
    main_app_1.app.controller("treeAreaPupup", TreeArea);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvc2VsZWN0UG9wdXAvdHJlZUFyZWEvVHJlZUFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBc0JBO1FBVUksa0JBQW9CLE1BQVcsRUFDWCxXQUF5QixFQUN6QixRQUFZLEVBQ1osV0FBa0MsRUFDbEMsS0FBVTtZQUpWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFJO1lBQ1osZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1lBQ2xDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFWOUIsb0JBQWUsR0FBd0IsRUFBRSxDQUFDO1lBRTFDLFdBQU0sR0FBVSxDQUFDLENBQUM7WUFFbEIscUJBQWdCLEdBQWtCLEVBQUUsQ0FBQztZQU9qQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksa0JBQWtCLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUNoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFTywrQkFBWSxHQUFwQjtZQUFBLGlCQUlDO1lBSEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFvQjtnQkFDdEQsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNPLGlDQUFjLEdBQXRCO1lBQUEsaUJBY0M7WUFiRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNEJBQWMsRUFBVSxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFB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LENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxVQUFDLFdBQWUsRUFBQyxLQUFZO2dCQUM5RCxXQUFXLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFBLENBQUM7UUFFRixpQ0FBYyxHQUFkO1lBQUEsaUJBTUM7WUFMRyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFBQSxNQUFNLENBQUE7WUFBQSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFBLENBQUM7UUFyRkssZ0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxhQUFhLEVBQUMsVUFBVSxFQUFDLHNCQUFzQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBc0Z4RixlQUFDO0tBdkZELEFBdUZDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvc2VsZWN0UG9wdXAvdHJlZUFyZWEvVHJlZUFyZWEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBsYiBvbiAyMDE3LzEwLzMwIDAwMzAuXHJcbiAqL1xyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvdHJlZS5jc3MnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZVwiO1xyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7QnVzaW5lc3NMaWJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxudHlwZSBBcmVhRmFjZUxpYkV4ID0gQXJlYUV4ICYgQnVzaW5lc3NMaWJFeDtcclxuXHJcbmNsYXNzIFRyZWVBcmVhe1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsJ2FyZWFTZXJ2aWNlJywnJHRpbWVvdXQnLCd0cmVlRGlyZWN0aXZlU2VydmljZScsJ2xheWVyJ107XHJcblxyXG4gICAgdHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGNhY2hlU2VsRmFjZUxpYjpBcnJheTxCdXNpbmVzc0xpYkV4PiA9IFtdO1xyXG4gICAgc2VhcmNoU3RyOnN0cmluZztcclxuICAgIHNlbE51bTpudW1iZXIgPSAwO1xyXG4gICAgc2VsZWN0Q3RybENiOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RDYW1lcmFMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KXtcclxuICAgICAgICB0aGlzLnNlbGVjdEN0cmxDYiA9ICRzY29wZS5zZWxlY3RDdHJsQ2IgfHwgXCJjbG9zZS5hcmVhLnBvcHVwXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDYW1lcmFMaXN0ID0gJHNjb3BlLnNlbGVjdENhbWVyYUxpc3Q7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVEYXRhKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZURhdGEoKXtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZSgpLnRoZW4oKGRhdGFzOiBBcnJheTxBcmVhRXg+KSA9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IGRhdGFzO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRUcmVlUGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZUlkID0gXCJmYWNlTGliVHJlZVwiO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PntcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsKG5vZGU6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsTnVtID0gdGhpcy5jYWNoZVNlbEZhY2VMaWIubGVuZ3RoO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc2F2ZUZhY2VsaWIoKXtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYi5mb3JFYWNoKChpdGVtOmFueSk9PntcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnNlbGVjdEN0cmxDYiwgYXJyLCB0cnVlKVxyXG4gICAgfTtcclxuICAgIGFkZENhY2hlKCl7XHJcbiAgICAgICAgbGV0IHBhcmFtc0xpc3QgPSBbXSBhcyBBcnJheTx7a2V5OnN0cmluZyx2YWx1ZTpzdHJpbmd9PjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy4kc2NvcGUuc2VsZWN0Q2FtZXJhTGlzdCwoaWQ6c3RyaW5nLGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6J0lEJyx2YWx1ZTppZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMudHJlZVBhcmFtcy50cmVlSWQscGFyYW1zTGlzdCx0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwobm9kZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnYnVzaW5lc3NMaWInICYmIHRoaXMuY2FjaGVTZWxGYWNlTGliLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxGYWNlTGliLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjbGVhckFsbCgpe1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxOdW0gPSAwO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLGZhbHNlKVxyXG4gICAgfTtcclxuICAgIGNhbmNlbEZhY2VsaWJQb3AoKXtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYiA9IFtdO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KHRoaXMuc2VsZWN0Q3RybENiLCBbXSwgdHJ1ZSlcclxuICAgIH07XHJcbiAgICByZW1vdmVDaGVja2VkIChub2RlOkJ1c2luZXNzTGliRXgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsRmFjZUxpYiwoYnVzaW5lc3NMaWI6YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgYnVzaW5lc3NMaWIuSUQgPT09IG5vZGUuSUQgJiYgdGhpcy5jYWNoZVNlbEZhY2VMaWIuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID4gMCAmJiAodGhpcy5zZWxOdW0gPSB0aGlzLnNlbE51bS0xKTtcclxuICAgIH07XHJcbiAgICAvL+aQnOe0ouahhuaUueWPmFxyXG4gICAgb25DaGFuZ2VTZWFyY2goKTpib29sZWFue1xyXG4gICAgICAgIGlmKCF0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzKXtyZXR1cm59XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmZpbHRlclNob3dOb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLFwiTmFtZVwiLHRoaXMuc2VhcmNoU3RyKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidHJlZUFyZWFQdXB1cFwiLCBUcmVlQXJlYSk7Il19
