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
define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/services/connectTree.service", "css!./tree.css", "../../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _ITreeDataParams = (function (_super) {
        __extends(_ITreeDataParams, _super);
        function _ITreeDataParams() {
            return _super.call(this) || this;
        }
        return _ITreeDataParams;
    }(tree_params_1.TreeDataParams));
    var TreeController = (function () {
        function TreeController($scope, $timeout, connectTreeService, treeDirectiveService) {
            var _this = this;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.connectTreeService = connectTreeService;
            this.treeDirectiveService = treeDirectiveService;
            this.treeInitComplete = function (treeId) {
                console.log(treeId, "树加载完成");
            };
            this.getTreeList = function () {
                _this.connectTreeService.findLampTreeWithCamera().then(function (result) {
                    _this.$timeout(function () {
                        _this.areaTreeDataParams.treeDatas = result;
                    });
                });
            };
            this.diyDomFunc1 = function (treeId, treeNode) {
                console.log("点击了定位按钮", treeId, treeNode);
                layer.msg("点击了定位按钮");
            };
            this.diyDomFunc2 = function (treeId, treeNode) {
                console.log("点击了关注按钮", treeId, treeNode);
                layer.msg("点击了关注按钮");
                setTimeout(function () {
                    _this.treeDirectiveService.changeLocateAndAttentionDiyDom(treeId, "ID", treeNode.ID, !treeNode.isAttention);
                });
            };
            var vm = this;
            vm.areaTreeDataParams = new _ITreeDataParams();
            vm.areaTreeDataParams.treeId = 'areaTreeDemo';
            vm.areaTreeDataParams.isDefaultSelected = true;
            vm.areaTreeDataParams.treeInitComplete = this.treeInitComplete;
            vm.areaTreeDataParams.diyDomFunc1 = this.diyDomFunc1;
            vm.areaTreeDataParams.diyDomFunc2 = this.diyDomFunc2;
            this.getTreeList();
        }
        TreeController.$inject = ["$scope", '$timeout', 'connectTreeService', 'treeDirectiveService'];
        return TreeController;
    }());
    main_app_1.app.controller("technologyStackTreeController", TreeController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdGVjaG5vbG9neS1zdGFjay90cmVlL3RyZWUuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBV0E7UUFBa0Msb0NBQWlCO1FBQy9DO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUdMLHVCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTmlDLDRCQUFjLEdBTS9DO0lBRUQ7UUFNSSx3QkFBb0IsTUFBVyxFQUFVLFFBQWEsRUFBVSxrQkFBdUMsRUFBVSxvQkFBMkM7WUFBNUosaUJBVUM7WUFWbUIsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGFBQVEsR0FBUixRQUFRLENBQUs7WUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQVUseUJBQW9CLEdBQXBCLG9CQUFvQixDQUF1QjtZQVlwSixxQkFBZ0IsR0FBRyxVQUFDLE1BQWM7Z0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLENBQUMsQ0FBQztZQUVNLGdCQUFXLEdBQUc7Z0JBQ2xCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQWdDO29CQUNuRixLQUFJLENBQUMsUUFBUSxDQUFDO3dCQUNWLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO29CQUMvQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQTtZQUVPLGdCQUFXLEdBQUcsVUFBQyxNQUFjLEVBQUUsUUFBMkI7Z0JBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQUE7WUFFTyxnQkFBVyxHQUFHLFVBQUMsTUFBYyxFQUFFLFFBQWE7Z0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDekMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckIsVUFBVSxDQUFDO29CQUlQLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9HLENBQUMsQ0FBQyxDQUFBO1lBRU4sQ0FBQyxDQUFBO1lBdENHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNkLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGdCQUFnQixFQUFxQixDQUFDO1lBQ2xFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDL0MsRUFBRSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvRCxFQUFFLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDckQsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBRXJELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBZE0sc0JBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztRQTRDdkYscUJBQUM7S0E5Q0QsQUE4Q0MsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsK0JBQStCLEVBQUUsY0FBYyxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3RlY2hub2xvZ3ktc3RhY2svdHJlZS90cmVlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtJQ29ubmVjdFRyZWVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtBcmVhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9BcmVhRXhcIjtcclxuaW1wb3J0IHtUcmVlRGF0YVBhcmFtcywgSVRyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCBcImNzcyEuL3RyZWUuY3NzXCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge0lUcmVlRGlyZWN0aXZlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmRlY2xhcmUgbGV0IGxheWVyOmFueTtcclxuXHJcbmNsYXNzIF9JVHJlZURhdGFQYXJhbXM8VD4gZXh0ZW5kcyBUcmVlRGF0YVBhcmFtczxUPntcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIGRpeURvbUZ1bmMxOiAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBUKT0+dm9pZDtcclxuICAgIGRpeURvbUZ1bmMyOiAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBUKT0+dm9pZDtcclxufVxyXG5cclxuY2xhc3MgVHJlZUNvbnRyb2xsZXJ7XHJcblxyXG4gICAgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwnJHRpbWVvdXQnLCdjb25uZWN0VHJlZVNlcnZpY2UnLCd0cmVlRGlyZWN0aXZlU2VydmljZSddO1xyXG5cclxuICAgIGFyZWFUcmVlRGF0YVBhcmFtcyA6X0lUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBDYW1lcmFFeD47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSAkdGltZW91dDogYW55LCBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSwgcHJpdmF0ZSB0cmVlRGlyZWN0aXZlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlKXtcclxuICAgICAgICBsZXQgdm0gPSB0aGlzO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcyA9IG5ldyBfSVRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IENhbWVyYUV4PigpO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSWQgPSAnYXJlYVRyZWVEZW1vJztcclxuICAgICAgICB2bS5hcmVhVHJlZURhdGFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy50cmVlSW5pdENvbXBsZXRlID0gdGhpcy50cmVlSW5pdENvbXBsZXRlO1xyXG4gICAgICAgIHZtLmFyZWFUcmVlRGF0YVBhcmFtcy5kaXlEb21GdW5jMSA9IHRoaXMuZGl5RG9tRnVuYzE7XHJcbiAgICAgICAgdm0uYXJlYVRyZWVEYXRhUGFyYW1zLmRpeURvbUZ1bmMyID0gdGhpcy5kaXlEb21GdW5jMjtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRUcmVlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJlZUluaXRDb21wbGV0ZSA9ICh0cmVlSWQ6IHN0cmluZyk9PntcclxuICAgICAgICBjb25zb2xlLmxvZyh0cmVlSWQsXCLmoJHliqDovb3lrozmiJBcIik7XHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgZ2V0VHJlZUxpc3QgPSAoKT0+e1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRMYW1wVHJlZVdpdGhDYW1lcmEoKS50aGVuKChyZXN1bHQ6IEFycmF5PEFyZWFFeCB8IENhbWVyYUV4Pik9PntcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFQYXJhbXMudHJlZURhdGFzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRpeURvbUZ1bmMxID0gKHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4IHwgQ2FtZXJhRXgpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnlh7vkuoblrprkvY3mjInpkq5cIiwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgbGF5ZXIubXNnKFwi54K55Ye75LqG5a6a5L2N5oyJ6ZKuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGl5RG9tRnVuYzIgPSAodHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBhbnkpPT57XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLngrnlh7vkuoblhbPms6jmjInpkq5cIiwgdHJlZUlkLCB0cmVlTm9kZSk7XHJcbiAgICAgICAgbGF5ZXIubXNnKFwi54K55Ye75LqG5YWz5rOo5oyJ6ZKuXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgLy8g5qih5ouf5bey57uP5Y675ZCO5Y+w6K+35rGC5LqG5pWw5o2uLCDlhbPms6jkuobmraTmkYTlg4/mnLpcclxuICAgICAgICAgICAgLy8g5pu05paw5qCR57uT54K5XHJcblxyXG4gICAgICAgICAgICB0aGlzLnRyZWVEaXJlY3RpdmVTZXJ2aWNlLmNoYW5nZUxvY2F0ZUFuZEF0dGVudGlvbkRpeURvbSh0cmVlSWQsIFwiSURcIiwgdHJlZU5vZGUuSUQsICF0cmVlTm9kZS5pc0F0dGVudGlvbik7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwidGVjaG5vbG9neVN0YWNrVHJlZUNvbnRyb2xsZXJcIiwgVHJlZUNvbnRyb2xsZXIpOyJdfQ==
