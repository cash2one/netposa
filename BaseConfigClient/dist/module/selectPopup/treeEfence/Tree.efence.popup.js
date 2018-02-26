define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/enum/TreeType", "lodash", "css!../style/tree.css", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1, TreeType_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TreeEfencePopupController = (function () {
        function TreeEfencePopupController($scope, connectTreeService, $timeout, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.selectEfenceList = [];
            this.selectCtrlCb = $scope.selectCtrlCb || "close.efence.popup";
            this.selectEfenceList = $scope.selectCameraList;
            this.initTreeParams();
        }
        TreeEfencePopupController.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaWithElectronicfence().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        TreeEfencePopupController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "ElectronicFenceTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.checkedUpdate(checkedNodeList);
            };
            this.initTreeData();
        };
        TreeEfencePopupController.prototype.saveElectronicFence = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit(this.selectCtrlCb, arr, true, null, "tree");
        };
        TreeEfencePopupController.prototype.addCache = function () {
            var self = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectElectronicFenceList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.ElectronicFence.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        ;
        TreeEfencePopupController.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        TreeEfencePopupController.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.$scope.$emit(this.selectCtrlCb, [], false);
        };
        ;
        TreeEfencePopupController.prototype.removeChecked = function (node) {
            var _this = this;
            var selectEfenceList = _.pull(this.selectEfenceList, node.ID);
            this.selectEfenceList = selectEfenceList;
            angular.forEach(this.cacheSelCam, function (camera, index) {
                camera.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
            this.treeService.updateNodeChecked(this.treeParams.treeId, node.tId, false);
        };
        ;
        TreeEfencePopupController.prototype.onChangeSearch = function () {
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
        TreeEfencePopupController.prototype.checkedUpdate = function (checkedNodeList) {
            var self = this;
            var cacheSelCam = [];
            self.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === TreeType_1.TreeType.ElectronicFence.value && cacheSelCam.push(node);
                });
                self.cacheSelCam = cacheSelCam;
                self.selNum = cacheSelCam.length;
            });
        };
        TreeEfencePopupController.$inject = ['$scope', 'connectTreeService', '$timeout', 'treeDirectiveService', 'layer'];
        return TreeEfencePopupController;
    }());
    main_app_1.app.controller("treeEfencePopupController", TreeEfencePopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvc2VsZWN0UG9wdXAvdHJlZUVmZW5jZS9UcmVlLmVmZW5jZS5wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQkE7UUFXSSxtQ0FBb0IsTUFBVyxFQUNYLGtCQUF1QyxFQUN2QyxRQUFhLEVBQ2IsV0FBa0MsRUFDbEMsS0FBVTtZQUpWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQVg5QixnQkFBVyxHQUE2QixFQUFFLENBQUM7WUFHM0MsV0FBTSxHQUFXLENBQUMsQ0FBQztZQUVuQixxQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO1lBT2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksSUFBSSxvQkFBb0IsQ0FBQztZQUNoRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDO1lBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUUxQixDQUFDO1FBRU8sZ0RBQVksR0FBcEI7WUFBQSxpQkFJQztZQUhHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQW1DO2dCQUMzRixLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU8sa0RBQWMsR0FBdEI7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw0QkFBYyxFQUFVLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUM7WUFDL0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFZLEVBQUUsTUFBYyxFQUFFLFFBQWE7Z0JBQ2xFLElBQUksZUFBZSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyRixLQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsdURBQW1CLEdBQW5CO1lBQ0ksSUFBSSxHQUFHLEdBQUcsRUFBbUIsQ0FBQztZQUM5QixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQXVCO2dCQUM3QyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNyQixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELDRDQUFRLEdBQVI7WUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxVQUFVLEdBQUcsRUFBMkMsQ0FBQztZQUM3RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsVUFBQyxFQUFVLEVBQUUsS0FBYTtnQkFDN0UsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUE7WUFDM0MsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNsRixJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRixJQUFJLFdBQVcsR0FBNkIsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsVUFBQyxJQUFTO29CQUN2QyxJQUFJLENBQUMsUUFBUSxLQUFLLG1CQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUFBLENBQUM7UUFFRiw0Q0FBUSxHQUFSO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDakUsQ0FBQztRQUFBLENBQUM7UUFFRixnREFBWSxHQUFaO1lBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUFBLENBQUM7UUFFRixpREFBYSxHQUFiLFVBQWMsSUFBdUI7WUFBckMsaUJBWUM7WUFYRyxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQUMsTUFBVyxFQUFFLEtBQWE7Z0JBQ3pELE1BQU0sQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsSUFBSSxLQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFLaEYsQ0FBQztRQUFBLENBQUM7UUFJRixrREFBYyxHQUFkO1lBQUEsaUJBUUM7WUFQRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFBLENBQUM7UUFFRixpREFBYSxHQUFiLFVBQWMsZUFBZTtZQUN6QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxXQUFXLEdBQTZCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFVBQUMsSUFBUztvQkFDdkMsSUFBSSxDQUFDLFFBQVEsS0FBSyxtQkFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUEvR00saUNBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFnSG5HLGdDQUFDO0tBakhELEFBaUhDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLDJCQUEyQixFQUFFLHlCQUF5QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3NlbGVjdFBvcHVwL3RyZWVFZmVuY2UvVHJlZS5lZmVuY2UucG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0ICdjc3MhLi4vc3R5bGUvdHJlZS5jc3MnO1xyXG5cclxuLy8g5pyN5YqhXHJcbmltcG9ydCB7SVRyZWVEaXJlY3RpdmVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ29ubmVjdFRyZWVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuXHJcbi8vIOWPguaVsFxyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0VsZWN0cm9uaWNGZW5jZUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvRWxlY3Ryb25pY0ZlbmNlRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtc30gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQge1RyZWVUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxudHlwZSBBcmVhRWxlY3Ryb25pY0ZlbmNlRXggPSBBcmVhRXggJiBFbGVjdHJvbmljRmVuY2VFeDtcclxuXHJcbmNsYXNzIFRyZWVFZmVuY2VQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdjb25uZWN0VHJlZVNlcnZpY2UnLCAnJHRpbWVvdXQnLCAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLCAnbGF5ZXInXTtcclxuXHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG4gICAgY2FjaGVTZWxDYW06IEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4PiA9IFtdO1xyXG4gICAgZWxlY3Ryb25pY0ZlbmNlVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUVsZWN0cm9uaWNGZW5jZUV4PjtcclxuICAgIHNlYXJjaFN0cjogc3RyaW5nO1xyXG4gICAgc2VsTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgc2VsZWN0Q3RybENiOiBzdHJpbmc7XHJcbiAgICBzZWxlY3RFZmVuY2VMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY29ubmVjdFRyZWVTZXJ2aWNlOiBJQ29ubmVjdFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RDdHJsQ2IgPSAkc2NvcGUuc2VsZWN0Q3RybENiIHx8IFwiY2xvc2UuZWZlbmNlLnBvcHVwXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RFZmVuY2VMaXN0ID0gJHNjb3BlLnNlbGVjdENhbWVyYUxpc3Q7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRUcmVlRGF0YSgpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYVdpdGhFbGVjdHJvbmljZmVuY2UoKS50aGVuKChkYXRhczogQXJyYXk8QXJlYUVsZWN0cm9uaWNGZW5jZUV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gZGF0YXM7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZVBhcmFtcygpIHtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSWQgPSBcIkVsZWN0cm9uaWNGZW5jZVRyZWVcIjtcclxuICAgICAgICB0aGlzLnNlYXJjaFN0ciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY2hlY2tlZE5vZGVMaXN0ID0gdGhpcy50cmVlU2VydmljZS5nZXRDaGVja2VkTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZFVwZGF0ZShjaGVja2VkTm9kZUxpc3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlRWxlY3Ryb25pY0ZlbmNlKCkge1xyXG4gICAgICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxzdHJpbmc+O1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0uZm9yRWFjaCgoaXRlbTogRWxlY3Ryb25pY0ZlbmNlRXgpID0+IHtcclxuICAgICAgICAgICAgYXJyLnB1c2goaXRlbS5JRClcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCh0aGlzLnNlbGVjdEN0cmxDYiwgYXJyLCB0cnVlLCBudWxsLCBcInRyZWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQ2FjaGUoKSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBwYXJhbXNMaXN0ID0gW10gYXMgQXJyYXk8eyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9PjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy4kc2NvcGUuc2VsZWN0RWxlY3Ryb25pY0ZlbmNlTGlzdCwgKGlkOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6ICdJRCcsIHZhbHVlOiBpZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIHBhcmFtc0xpc3QsIHRydWUpO1xyXG4gICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLCB0cnVlKTtcclxuICAgICAgICBsZXQgY2FjaGVTZWxDYW06IEFycmF5PEVsZWN0cm9uaWNGZW5jZUV4PiA9IFtdO1xyXG4gICAgICAgIHNlbGYuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY2hlY2tlZE5vZGVMaXN0LCAobm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSBUcmVlVHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWUgJiYgY2FjaGVTZWxDYW0ucHVzaChub2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNlbGYuY2FjaGVTZWxDYW0gPSBjYWNoZVNlbENhbTtcclxuICAgICAgICAgICAgc2VsZi5zZWxOdW0gPSBjYWNoZVNlbENhbS5sZW5ndGg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNsZWFyQWxsKCkge1xyXG4gICAgICAgIHRoaXMuY2FjaGVTZWxDYW0gPSBbXTtcclxuICAgICAgICB0aGlzLnNlbE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja0FsbE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIGZhbHNlKVxyXG4gICAgfTtcclxuXHJcbiAgICBjYW5jZWxDYW1Qb3AoKSB7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KHRoaXMuc2VsZWN0Q3RybENiLCBbXSwgZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICByZW1vdmVDaGVja2VkKG5vZGU6IEVsZWN0cm9uaWNGZW5jZUV4KSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdEVmZW5jZUxpc3QgPSBfLnB1bGwodGhpcy5zZWxlY3RFZmVuY2VMaXN0LCBub2RlLklEKTtcclxuICAgICAgICB0aGlzLnNlbGVjdEVmZW5jZUxpc3QgPSBzZWxlY3RFZmVuY2VMaXN0O1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsQ2FtLCAoY2FtZXJhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgY2FtZXJhLklEID09PSBub2RlLklEICYmIHRoaXMuY2FjaGVTZWxDYW0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNlbE51bSA+IDAgJiYgKHRoaXMuc2VsTnVtID0gdGhpcy5zZWxOdW0gLSAxKTtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLnVwZGF0ZU5vZGVDaGVja2VkKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIG5vZGUudElkLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gYW5ndWxhci5mb3JFYWNoKHRoaXMuY2FjaGVTZWxDYW0sIChFbGVjdHJvbmljRmVuY2U6IGFueSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIC8vICAgICBFbGVjdHJvbmljRmVuY2UuSUQgPT09IG5vZGUuSUQgJiYgdGhpcy5jYWNoZVNlbENhbS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8vIHRoaXMuc2VsTnVtID4gMCAmJiAodGhpcy5zZWxOdW0gPSB0aGlzLnNlbE51bSAtIDEpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+aQnOe0ouahhuaUueWPmFxyXG5cclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcykge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVNlcnZpY2UuZmlsdGVyU2hvd05vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsIFwiTmFtZVwiLCB0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGNoZWNrZWRVcGRhdGUoY2hlY2tlZE5vZGVMaXN0KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBjYWNoZVNlbENhbTogQXJyYXk8RWxlY3Ryb25pY0ZlbmNlRXg+ID0gW107XHJcbiAgICAgICAgc2VsZi4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsIChub2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vZGUudHJlZVR5cGUgPT09IFRyZWVUeXBlLkVsZWN0cm9uaWNGZW5jZS52YWx1ZSAmJiBjYWNoZVNlbENhbS5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2VsZi5jYWNoZVNlbENhbSA9IGNhY2hlU2VsQ2FtO1xyXG4gICAgICAgICAgICBzZWxmLnNlbE51bSA9IGNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJ0cmVlRWZlbmNlUG9wdXBDb250cm9sbGVyXCIsIFRyZWVFZmVuY2VQb3B1cENvbnRyb2xsZXIpOyJdfQ==
