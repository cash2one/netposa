define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WifiPopupLampController = (function () {
        function WifiPopupLampController($scope, connectTreeService, $timeout, wifiService, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.wifiService = wifiService;
            this.treeService = treeService;
            this.layer = layer;
            this.IsCheck = false;
            this.deviceData = angular.copy(this.$scope.deviceData);
            this.initTreeParams();
            if (!this.deviceData.JsonUserData.lampPost) {
                this.deviceData.JsonUserData.lampPost = {};
            }
            this.getTreeDatas();
        }
        WifiPopupLampController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams(true);
            this.treeParams.treeId = "devicePopupRightTree";
            this.treeParams.isShowIcon = true;
            this.treeParams.isShowLine = false;
            this.treeParams.isSimpleData = true;
            this.treeParams.checkEnable = false;
            this.treeParams.isSingleSelect = false;
            this.treeParams.editEnable = true;
            this.treeParams.showRemoveBtn = false;
            this.treeParams.showRenameBtn = false;
            this.treeParams.onClick = function (event, treeId, treeNode) {
                if (treeNode.treeType === "lamp") {
                    var lampPost = {
                        ID: treeNode.ID,
                        Name: treeNode.Name
                    };
                    _this.deviceData.JsonUserData.lampPost = lampPost;
                    _this.IsCheck = true;
                }
            };
        };
        WifiPopupLampController.prototype.getTreeDatas = function () {
            var _this = this;
            this.connectTreeService.findLampTreeWithWifi().then(function (res) {
                _this.$timeout(function () {
                    _this.treeParams.treeDatas = res;
                });
            });
        };
        WifiPopupLampController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        WifiPopupLampController.prototype.submit = function () {
            var _this = this;
            if (!this.IsCheck) {
                this.layer.msg("没有选择任何立杆");
                this.cancel(false);
                return;
            }
            var models = [];
            models.push({ id: this.deviceData.ID, lampId: this.deviceData.JsonUserData.lampPost.ID, deviceReId: this.deviceData.JsonUserData.deviceReId });
            this.wifiService.updateWifiLampID(models).then(function (res) {
                if (res.data && res.code === 200) {
                    _this.layer.msg("更新成功");
                    _this.cancel(true);
                }
                else {
                    _this.layer.msg("更新失败");
                }
            });
        };
        WifiPopupLampController.$inject = ['$scope', 'connectTreeService', '$timeout', 'wifiService', 'treeDirectiveService', 'layer'];
        return WifiPopupLampController;
    }());
    main_app_1.app.controller("baseConfigWifiPopupLamp", WifiPopupLampController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkucG9wdXBMYW1wLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBaUJBO1FBS0ssaUNBQ1csTUFBVyxFQUNYLGtCQUF1QyxFQUN2QyxRQUFhLEVBQ2IsV0FBeUIsRUFDekIsV0FBa0MsRUFDbEMsS0FBVTtZQUxWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QixnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQVB0QixZQUFPLEdBQVksS0FBSyxDQUFDO1lBU3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFZLENBQUM7WUFDekQsQ0FBQztZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ08sZ0RBQWMsR0FBdEI7WUFBQSxpQkFxQkM7WUFwQkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLENBQTJCLElBQUksQ0FBQyxDQUFDO1lBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDO1lBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7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RUFBRSxhQUFhLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFvRWxILDhCQUFDO0tBckVELEFBcUVDLElBQUE7SUFDRCxjQUFHLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvd2lmaS93aWZpLnBvcHVwTGFtcC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IFdpZmkgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9XaWZpJztcclxuaW1wb3J0IHsgV2lmaUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1dpZmlFeFwiO1xyXG5pbXBvcnQgeyBBcmVhRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7IExhbXBFeCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeCc7XHJcbmltcG9ydCB7IElXaWZpU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvd2lmaS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUcmVlRGlyZWN0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBXaWZpQ2hhbmdlQXJlYUlETW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvV2lmaVBhcmFtc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgVHJlZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcbmltcG9ydCB7IElDb25uZWN0VHJlZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIFdpZmlQb3B1cExhbXBDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnY29ubmVjdFRyZWVTZXJ2aWNlJywgJyR0aW1lb3V0JywgJ3dpZmlTZXJ2aWNlJywgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJywgJ2xheWVyJ107XHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBXaWZpRXggfCBMYW1wRXg+O1xyXG4gICAgZGV2aWNlRGF0YTogV2lmaTtcclxuICAgIElzQ2hlY2s6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTogYW55LFxyXG4gICAgICAgIHByaXZhdGUgY29ubmVjdFRyZWVTZXJ2aWNlOiBJQ29ubmVjdFRyZWVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIHdpZmlTZXJ2aWNlOiBJV2lmaVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueVxyXG4gICAgKSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VEYXRhID0gYW5ndWxhci5jb3B5KHRoaXMuJHNjb3BlLmRldmljZURhdGEpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVQYXJhbXMoKTtcclxuICAgICAgICBpZiAoIXRoaXMuZGV2aWNlRGF0YS5Kc29uVXNlckRhdGEubGFtcFBvc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXZpY2VEYXRhLkpzb25Vc2VyRGF0YS5sYW1wUG9zdCA9IHt9IGFzIExhbXBFeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRUcmVlRGF0YXMoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IFdpZmlFeCB8IExhbXBFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwiZGV2aWNlUG9wdXBSaWdodFRyZWVcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLmlzU2hvd0xpbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuZWRpdEVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnNob3dSZW1vdmVCdG4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuc2hvd1JlbmFtZUJ0biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy5vbkNsaWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRyZWVOb2RlLnRyZWVUeXBlID09PSBcImxhbXBcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhbXBQb3N0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIElEOiB0cmVlTm9kZS5JRCxcclxuICAgICAgICAgICAgICAgICAgICBOYW1lOiB0cmVlTm9kZS5OYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0ID0gbGFtcFBvc3Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklzQ2hlY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VHJlZURhdGFzKCkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRMYW1wVHJlZVdpdGhXaWZpKCkudGhlbigocmVzOiBBcnJheTxBcmVhRXggfCBXaWZpRXggfCBMYW1wRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IHJlcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIGNhbmNlbChmbGFnPzogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuJHNjb3BlLiRlbWl0KCdkZXZpY2UuY2xvc2VQb3B1cCcsIGZsYWcpO1xyXG4gICAgfVxyXG4gICAgc3VibWl0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLklzQ2hlY2spe1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuayoeaciemAieaLqeS7u+S9leeri+adhlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jYW5jZWwoZmFsc2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbW9kZWxzID0gW10gYXMgQXJyYXk8V2lmaUNoYW5nZUFyZWFJRE1vZGVsPjtcclxuICAgICAgICBtb2RlbHMucHVzaCh7aWQ6IHRoaXMuZGV2aWNlRGF0YS5JRCxsYW1wSWQ6IHRoaXMuZGV2aWNlRGF0YS5Kc29uVXNlckRhdGEubGFtcFBvc3QuSUQsZGV2aWNlUmVJZDp0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmRldmljZVJlSWR9IGFzIFdpZmlDaGFuZ2VBcmVhSURNb2RlbCk7XHJcbiAgICAgICAgdGhpcy53aWZpU2VydmljZS51cGRhdGVXaWZpTGFtcElEKG1vZGVscykudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxib29sZWFuPik9PntcclxuICAgICAgICAgICAgaWYgKHJlcy5kYXRhICYmIHJlcy5jb2RlID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi5pu05paw5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuabtOaWsOWksei0pVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuYXBwLmNvbnRyb2xsZXIoXCJiYXNlQ29uZmlnV2lmaVBvcHVwTGFtcFwiLCBXaWZpUG9wdXBMYW1wQ29udHJvbGxlcik7Il19
