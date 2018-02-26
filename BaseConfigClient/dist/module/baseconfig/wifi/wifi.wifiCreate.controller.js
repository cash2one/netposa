define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var WifiCreateController = (function () {
        function WifiCreateController($scope, connectTreeService, $timeout, wifiService, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.wifiService = wifiService;
            this.treeService = treeService;
            this.layer = layer;
            this.isShowIodTree = false;
            this.isShowAreaTree = false;
            this.isRootIod = false;
            this.deviceData = angular.copy(this.$scope.WifiData);
            if (!this.deviceData.JsonUserData.lampPost) {
                this.deviceData.JsonUserData.lampPost = {};
            }
            this.getLampTree();
        }
        WifiCreateController.prototype.getLampTree = function () {
            var _this = this;
            this.connectTreeService.findLampTreeWithWifi().then(function (datas) {
                _this.$timeout(function () {
                    _this.lampAreaParams = new tree_params_1.TreeDataParams(true);
                    _this.lampAreaParams.treeDatas = datas;
                    _this.lampAreaParams.treeId = "wifiPopupTree";
                    _this.lampAreaParams.isDefaultSelected = true;
                    _this.lampAreaParams.onClick = function (event, treeId, treeNode) {
                        _this.$timeout(function () {
                            if (treeNode.treeType === "lamp") {
                                var lampPost = {
                                    ID: treeNode.ID,
                                    Name: treeNode.Name
                                };
                                _this.deviceData.JsonUserData.lampPost = lampPost;
                                _this.isShowAreaTree = false;
                            }
                        });
                    };
                });
            });
        };
        WifiCreateController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        WifiCreateController.prototype.submit = function () {
            var _this = this;
            this.submitData = this.deviceData;
            this.wifiService.edit(this.submitData).then(function (res) {
                if (res.data && res.code === 200) {
                    _this.layer.msg("更新成功");
                    _this.cancel(true);
                }
                else {
                    _this.layer.msg("更新失败");
                }
            });
        };
        WifiCreateController.$inject = ['$scope', 'connectTreeService', '$timeout', 'wifiService', 'treeDirectiveService', 'layer'];
        return WifiCreateController;
    }());
    main_app_1.app.controller("WifiCreateController", WifiCreateController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy93aWZpL3dpZmkud2lmaUNyZWF0ZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW1CQTtRQVdJLDhCQUFvQixNQUFXLEVBQ25CLGtCQUF1QyxFQUN2QyxRQUFhLEVBQ2IsV0FBeUIsRUFDekIsV0FBa0MsRUFDbEMsS0FBVTtZQUxGLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDbkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBQ2IsZ0JBQVcsR0FBWCxXQUFXLENBQWM7WUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQXVCO1lBQ2xDLFVBQUssR0FBTCxLQUFLLENBQUs7WUFYdEIsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFDL0IsbUJBQWMsR0FBWSxLQUFLLENBQUM7WUFDaEMsY0FBUyxHQUFZLEtBQUssQ0FBQztZQVV2QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFZLENBQUM7WUFDekQsQ0FBQztZQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ08sMENBQVcsR0FBbkI7WUFBQSxpQkFxQkM7WUFwQkcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBc0M7Z0JBQ3ZGLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDRCQUFjLENBQTJCLElBQUksQ0FBQyxDQUFDO29CQUN6RSxLQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQ3RDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztvQkFDN0MsS0FBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7b0JBQzdDLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLFVBQUMsS0FBaUIsRUFBRSxNQUFjLEVBQUUsUUFBZ0I7d0JBQzlFLEtBQUksQ0FBQyxRQUFRLENBQUM7NEJBQ1YsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dDQUMvQixJQUFJLFFBQVEsR0FBRztvQ0FDWCxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUU7b0NBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2lDQUN0QixDQUFBO2dDQUNELEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0NBQ2pELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDOzRCQUNoQyxDQUFDO3dCQUNMLENBQUMsQ0FBQyxDQUFBO29CQUNOLENBQUMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELHFDQUFNLEdBQU4sVUFBTyxJQUFjO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCxxQ0FBTSxHQUFOO1lBQUEsaUJBVUM7WUFURyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTRCO2dCQUNyRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3ZCLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUF6RE0sNEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBMERsSCwyQkFBQztLQTNERCxBQTJEQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL3dpZmkvd2lmaS53aWZpQ3JlYXRlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IElXaWZpU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvd2lmaS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLmRpcmVjdGl2ZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUcmVlRGlyZWN0aXZlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgV2lmaUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L1dpZmlFeFwiO1xyXG5pbXBvcnQgeyBBcmVhRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7IExhbXBFeCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeCc7XHJcbmltcG9ydCB7IFdpZmkgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvV2lmaVwiO1xyXG5pbXBvcnQgeyBXaWZpQ2hhbmdlQXJlYUlETW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvV2lmaVBhcmFtc1wiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgVHJlZVR5cGUgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL1RyZWVUeXBlXCI7XHJcbmltcG9ydCB7IElDb25uZWN0VHJlZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcbmNsYXNzIFdpZmlDcmVhdGVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnY29ubmVjdFRyZWVTZXJ2aWNlJywgJyR0aW1lb3V0JywgJ3dpZmlTZXJ2aWNlJywgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJywgJ2xheWVyJ107XHJcbiAgICBhcmVhVHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgV2lmaUV4PjtcclxuICAgIGxhbXBBcmVhUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBMYW1wRXggfCBXaWZpRXg+O1xyXG4gICAgTGFtcDogc3RyaW5nO1xyXG4gICAgaXNTaG93SW9kVHJlZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNTaG93QXJlYVRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzUm9vdElvZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZGV2aWNlRGF0YTogV2lmaTsgLy/lvZPliY3nvJbovpHmlbDmja5cclxuICAgIExhbXBJRDogc3RyaW5nO1xyXG4gICAgc3VibWl0RGF0YTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSB3aWZpU2VydmljZTogSVdpZmlTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgdHJlZVNlcnZpY2U6IElUcmVlRGlyZWN0aXZlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRldmljZURhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy4kc2NvcGUuV2lmaURhdGEpO1xyXG4gICAgICAgIGlmICghdGhpcy5kZXZpY2VEYXRhLkpzb25Vc2VyRGF0YS5sYW1wUG9zdCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0ID0ge30gYXMgTGFtcEV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldExhbXBUcmVlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldExhbXBUcmVlKCkge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFRyZWVTZXJ2aWNlLmZpbmRMYW1wVHJlZVdpdGhXaWZpKCkudGhlbigoZGF0YXM6IEFycmF5PEFyZWFFeCB8IExhbXBFeCB8IFdpZmlFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbXBBcmVhUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IExhbXBFeCB8IFdpZmlFeD4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbXBBcmVhUGFyYW1zLnRyZWVEYXRhcyA9IGRhdGFzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW1wQXJlYVBhcmFtcy50cmVlSWQgPSBcIndpZmlQb3B1cFRyZWVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFtcEFyZWFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW1wQXJlYVBhcmFtcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZU5vZGUudHJlZVR5cGUgPT09IFwibGFtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFtcFBvc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHRyZWVOb2RlLklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IHRyZWVOb2RlLk5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlRGF0YS5Kc29uVXNlckRhdGEubGFtcFBvc3QgPSBsYW1wUG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93QXJlYVRyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZS5jbG9zZVBvcHVwJywgZmxhZyk7XHJcbiAgICB9XHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJtaXREYXRhID0gdGhpcy5kZXZpY2VEYXRhO1xyXG4gICAgICAgIHRoaXMud2lmaVNlcnZpY2UuZWRpdCh0aGlzLnN1Ym1pdERhdGEpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4pPT57XHJcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YSAmJiByZXMuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuabtOaWsOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLmm7TmlrDlpLHotKVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIldpZmlDcmVhdGVDb250cm9sbGVyXCIsIFdpZmlDcmVhdGVDb250cm9sbGVyKTsiXX0=
