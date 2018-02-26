define(["require", "exports", "../common/app/main.app", "../common/directive/tree/tree-params", "css!./style/cameraPopup.css", "../common/services/businessLib.service", "../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AnalysisFacelibPopup = (function () {
        function AnalysisFacelibPopup($scope, businessLibService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.businessLibService = businessLibService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.initTreeParams();
            this.initTreeData();
        }
        AnalysisFacelibPopup.prototype.initTreeData = function () {
            var _this = this;
            this.businessLibService.findTreeWithArea().then(function (res) {
                _this.treeParams.treeDatas = res.data;
            });
        };
        AnalysisFacelibPopup.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "faceLibTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelFaceLib = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        node.treeType === 'businessLib' && _this.cacheSelFaceLib.push(node);
                    });
                    _this.selNum = _this.cacheSelFaceLib.length;
                });
            };
        };
        AnalysisFacelibPopup.prototype.saveFacelib = function () {
            var arr = [];
            var arrMap = [];
            this.cacheSelFaceLib.forEach(function (item) {
                arr.push(item.ID);
                arrMap.push({ ID: item.ID, value: item.Name });
            });
            this.$scope.$emit('close.facelib.popup', arr, arrMap);
        };
        ;
        AnalysisFacelibPopup.prototype.addCache = function () {
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
        AnalysisFacelibPopup.prototype.clearAll = function () {
            this.cacheSelFaceLib = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        AnalysisFacelibPopup.prototype.cancelFacelibPop = function () {
            this.cacheSelFaceLib = [];
            this.layer.closeAll();
        };
        ;
        AnalysisFacelibPopup.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelFaceLib, function (businessLib, index) {
                businessLib.ID === node.ID && _this.cacheSelFaceLib.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        AnalysisFacelibPopup.prototype.onChangeSearch = function () {
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
        AnalysisFacelibPopup.$inject = ['$scope', 'businessLibService', '$timeout', 'treeDirectiveService', 'layer'];
        return AnalysisFacelibPopup;
    }());
    main_app_1.app.controller("AnalysisFacelibPopup", AnalysisFacelibPopup);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9BbmFseXNpcy5mYWNlbGliLnBvcHVwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWlCQTtRQU9JLDhCQUFvQixNQUFXLEVBQ1gsa0JBQXVDLEVBQ3ZDLFFBQVksRUFDWixXQUFrQyxFQUNsQyxLQUFVO1lBSlYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNYLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDdkMsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBUDlCLG9CQUFlLEdBQXdCLEVBQUUsQ0FBQztZQUUxQyxXQUFNLEdBQVUsQ0FBQyxDQUFDO1lBT2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4QixDQUFDO1FBQ08sMkNBQVksR0FBcEI7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQU87Z0JBQ3BELEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ08sNkNBQWMsR0FBdEI7WUFBQSxpQkFjQztZQWJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLFVBQUMsS0FBWSxFQUFFLE1BQWMsRUFBRSxRQUFhO2dCQUNsRSxJQUFJLGVBQWUsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFJLENB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TyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFDLFVBQUMsV0FBZSxFQUFDLEtBQVk7Z0JBQzlELFdBQVcsQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQUEsQ0FBQztRQUdGLDZDQUFjLEdBQWQ7WUFBQSxpQkFNQztZQUxHLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQSxDQUFDO2dCQUFBLE1BQU0sQ0FBQTtZQUFBLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDVixLQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25GLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQUEsQ0FBQztRQXBGSyw0QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFDLG9CQUFvQixFQUFDLFVBQVUsRUFBQyxzQkFBc0IsRUFBQyxPQUFPLENBQUMsQ0FBQztRQXFGL0YsMkJBQUM7S0F0RkQsQUFzRkMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9BbmFseXNpcy5mYWNlbGliLnBvcHVwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkga2V5IG9uIDIwMTcvNi8xNS5cclxuICovXHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvY2FtZXJhUG9wdXAuY3NzJztcclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7SUJ1c2luZXNzTGliU2VydmljZX0gZnJvbSBcIi4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7QnVzaW5lc3NMaWJFeH0gZnJvbSBcIi4uLy4uL2NvcmUvZW50aXR5L2V4L0J1c2luZXNzTGliRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9zZXJ2aWNlcy9idXNpbmVzc0xpYi5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG50eXBlIEFyZWFGYWNlTGliRXggPSBBcmVhRXggJiBCdXNpbmVzc0xpYkV4O1xyXG5cclxuY2xhc3MgQW5hbHlzaXNGYWNlbGliUG9wdXB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywnYnVzaW5lc3NMaWJTZXJ2aWNlJywnJHRpbWVvdXQnLCd0cmVlRGlyZWN0aXZlU2VydmljZScsJ2xheWVyJ107XHJcblxyXG4gICAgdHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGNhY2hlU2VsRmFjZUxpYjpBcnJheTxCdXNpbmVzc0xpYkV4PiA9IFtdO1xyXG4gICAgc2VhcmNoU3RyOnN0cmluZztcclxuICAgIHNlbE51bTpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYnVzaW5lc3NMaWJTZXJ2aWNlOiBJQnVzaW5lc3NMaWJTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDphbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpe1xyXG5cclxuICAgICAgICB0aGlzLmluaXRUcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGEoKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRUcmVlRGF0YSgpe1xyXG4gICAgICAgIHRoaXMuYnVzaW5lc3NMaWJTZXJ2aWNlLmZpbmRUcmVlV2l0aEFyZWEoKS50aGVuKChyZXM6YW55KT0+e1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gcmVzLmRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGluaXRUcmVlUGFyYW1zKCl7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZUlkID0gXCJmYWNlTGliVHJlZVwiO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoU3RyID0gXCJcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DaGVjayA9IChldmVudDogRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogYW55KSA9PntcclxuICAgICAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsKG5vZGU6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudHJlZVR5cGUgPT09ICdidXNpbmVzc0xpYicgJiYgdGhpcy5jYWNoZVNlbEZhY2VMaWIucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsRmFjZUxpYi5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzYXZlRmFjZWxpYigpe1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIGxldCBhcnJNYXAgPSBbXSBhcyBBcnJheTx7SUQ6c3RyaW5nLHZhbHVlOnN0cmluZ30+O1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliLmZvckVhY2goKGl0ZW06QnVzaW5lc3NMaWJFeCk9PntcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRCk7XHJcbiAgICAgICAgICAgIGFyck1hcC5wdXNoKHtJRDppdGVtLklELHZhbHVlOml0ZW0uTmFtZX0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdjbG9zZS5mYWNlbGliLnBvcHVwJyxhcnIsYXJyTWFwKVxyXG4gICAgfTtcclxuICAgIGFkZENhY2hlKCl7XHJcbiAgICAgICAgbGV0IHBhcmFtc0xpc3QgPSBbXSBhcyBBcnJheTx7a2V5OnN0cmluZyx2YWx1ZTpzdHJpbmd9PjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy4kc2NvcGUuc2VsZWN0Q2FtZXJhTGlzdCwoaWQ6c3RyaW5nLGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6J0lEJyx2YWx1ZTppZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMudHJlZVBhcmFtcy50cmVlSWQscGFyYW1zTGlzdCx0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwobm9kZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnYnVzaW5lc3NMaWInICYmIHRoaXMuY2FjaGVTZWxGYWNlTGliLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxGYWNlTGliLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbiAgICBjbGVhckFsbCgpe1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxGYWNlTGliID0gW107XHJcbiAgICAgICAgdGhpcy5zZWxOdW0gPSAwO1xyXG4gICAgICAgIHRoaXMudHJlZVNlcnZpY2UuY2hlY2tBbGxOb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLGZhbHNlKVxyXG4gICAgfTtcclxuICAgIGNhbmNlbEZhY2VsaWJQb3AoKXtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsRmFjZUxpYiA9IFtdO1xyXG4gICAgICAgIHRoaXMubGF5ZXIuY2xvc2VBbGwoKTtcclxuICAgIH07XHJcbiAgICByZW1vdmVDaGVja2VkIChub2RlOkJ1c2luZXNzTGliRXgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsRmFjZUxpYiwoYnVzaW5lc3NMaWI6YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgYnVzaW5lc3NMaWIuSUQgPT09IG5vZGUuSUQgJiYgdGhpcy5jYWNoZVNlbEZhY2VMaWIuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID4gMCAmJiAodGhpcy5zZWxOdW0gPSB0aGlzLnNlbE51bS0xKTtcclxuICAgIH07XHJcbiAgICAvL+aQnOe0ouahhuaUueWPmFxyXG5cclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6Ym9vbGVhbntcclxuICAgICAgICBpZighdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyl7cmV0dXJufVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCxcIk5hbWVcIix0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIkFuYWx5c2lzRmFjZWxpYlBvcHVwXCIsIEFuYWx5c2lzRmFjZWxpYlBvcHVwKTsiXX0=
