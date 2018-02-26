define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElePopupLampController = (function () {
        function ElePopupLampController($scope, connectTreeService, $timeout, electronicfenceService, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.electronicfenceService = electronicfenceService;
            this.treeService = treeService;
            this.layer = layer;
            this.IsCheck = false;
            this.deviceData = $scope.deviceData;
            this.initTreeParams();
            if (!this.deviceData.JsonUserData.lampPost) {
                this.deviceData.JsonUserData.lampPost = {};
            }
            this.getTreeDatas();
        }
        ElePopupLampController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams(true);
            this.treeParams.treeId = "elePopupRightTree";
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
                    _this.IsCheck = true;
                    _this.deviceData.JsonUserData.lampPost = lampPost;
                }
            };
        };
        ElePopupLampController.prototype.getTreeDatas = function () {
            var _this = this;
            this.connectTreeService.findLampTreeWithElectronicfence().then(function (res) {
                _this.$timeout(function () {
                    _this.treeParams.treeDatas = res;
                });
            });
        };
        ElePopupLampController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        ElePopupLampController.prototype.submit = function () {
            var _this = this;
            if (!this.IsCheck) {
                this.layer.msg("没有选择任何立杆");
                this.cancel(false);
                return;
            }
            var models = [];
            models.push({ id: this.deviceData.ID, lampId: this.deviceData.JsonUserData.lampPost.ID, deviceReId: this.deviceData.JsonUserData.deviceReId });
            this.electronicfenceService.updateElectronicLampID(models).then(function (res) {
                if (res.data && res.code === 200) {
                    _this.cancel(true);
                    _this.layer.msg("更新成功");
                }
                else {
                    _this.layer.msg("更新失败");
                }
            });
        };
        ElePopupLampController.$inject = ['$scope', 'connectTreeService', '$timeout', 'electronicfenceService', 'treeDirectiveService', 'layer'];
        return ElePopupLampController;
    }());
    main_app_1.app.controller("baseConfigElePopupLamp", ElePopupLampController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbGVjdHJvbmljZmVuY2UvZWxlLnBvcHVwTGFtcC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFCQTtRQUtJLGdDQUFvQixNQUFXLEVBQ1gsa0JBQXVDLEVBQ3ZDLFFBQWEsRUFDYixzQkFBK0MsRUFDL0MsV0FBa0MsRUFDbEMsS0FBVTtZQUxWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1lBQy9DLGdCQUFXLEdBQVgsV0FBVyxDQUF1QjtZQUNsQyxVQUFLLEdBQUwsS0FBSyxDQUFLO1lBTjlCLFlBQU8sR0FBVyxLQUFLLENBQUM7WUFPcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFZLENBQUM7WUFDekQsQ0FBQztZQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQ08sK0NBQWMsR0FBdEI7WUFBQSxpQkFxQkM7WUFwQkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLENBQXNDLElBQUksQ0FBQyxDQUFDO1lBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUNwQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFZLEVBQUUsTUFBYyxFQUFFLFFBQWdCO2dCQUNyRSxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBQzdCLElBQUksUUFBUSxHQUFHO3dCQUNQLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRTt3QkFDZixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7cUJBQ3RCLENBQUE7b0JBQ0wsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3BCLEtBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ3JELENBQUM7WUFDTCxDQUFDLENBQUM7UUFDTixDQUFDO1FBQ08sNkNBQVksR0FBcEI7WUFBQSxpQkFNQztZQUxHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywrQkFBK0IsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQStDO2dCQUMzRyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCx1Q0FBTSxHQUFOLFVBQU8sSUFBYztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDTCx1Q0FBTSxHQUFOO1lBQUEsaUJBZ0JDO1lBZkcsRUFBRSxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztnQkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxDQUFFO1lBQ1osQ0FBQztZQUNELElBQUksTUFBTSxHQUFHLEVBQTZDLENBQUM7WUFDM0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFxQyxDQUFDLENBQUM7WUFDOUssSUFBSSxDQUFDLHNCQUFzQixDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTRCO2dCQUN6RixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUEsQ0FBQztvQkFDN0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBQUEsSUFBSSxDQUFBLENBQUM7b0JBQ0YsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7Z0JBQzFCLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFqRU0sOEJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsd0JBQXdCLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFrRTdILDZCQUFDO0tBbkVELEFBbUVDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2Jhc2Vjb25maWcvZWxlY3Ryb25pY2ZlbmNlL2VsZS5wb3B1cExhbXAuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtUcmVlVHlwZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5pbXBvcnQge1Jlc3BvbnNlUmVzdWx0fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJVHJlZURpcmVjdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5cclxuaW1wb3J0IFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvRWxlY3Ryb25pY0ZlbmNlXCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9FbGVjdHJvbmljRmVuY2VFeFwiO1xyXG5pbXBvcnQge0lFbGVjdHJvbmljRmVuY2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2VsZWN0cm9uaWNmZW5jZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7RWxlY3Ryb25pY0ZlbmNlQ2hhbmdlQXJlYUlETW9kZWx9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9FbGVjdHJvbmljRmVuY2VQYXJhbXNcIjtcclxuaW1wb3J0IHsgT2JqZWN0VHlwZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bS9PYmplY3RUeXBlJztcclxuXHJcbmltcG9ydCB7SUNvbm5lY3RUcmVlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jb25uZWN0VHJlZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExhbXBFeCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0xhbXBFeCc7XHJcblxyXG5cclxuY2xhc3MgRWxlUG9wdXBMYW1wQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ2Nvbm5lY3RUcmVlU2VydmljZScsICckdGltZW91dCcsICdlbGVjdHJvbmljZmVuY2VTZXJ2aWNlJywgJ3RyZWVEaXJlY3RpdmVTZXJ2aWNlJywgJ2xheWVyJ107XHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBFbGVjdHJvbmljRmVuY2VFeCB8IExhbXBFeD47XHJcbiAgICBkZXZpY2VEYXRhOkVsZWN0cm9uaWNGZW5jZTtcclxuICAgIElzQ2hlY2s6Qm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBhbnksIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBlbGVjdHJvbmljZmVuY2VTZXJ2aWNlOiBJRWxlY3Ryb25pY0ZlbmNlU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBsYXllcjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5kZXZpY2VEYXRhID0gJHNjb3BlLmRldmljZURhdGE7XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZVBhcmFtcygpO1xyXG4gICAgICAgIGlmICghdGhpcy5kZXZpY2VEYXRhLkpzb25Vc2VyRGF0YS5sYW1wUG9zdCkge1xyXG4gICAgICAgICAgICB0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0ID0ge30gYXMgTGFtcEV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFRyZWVEYXRhcygpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZVBhcmFtcygpe1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBFbGVjdHJvbmljRmVuY2VFeCB8IExhbXBFeD4odHJ1ZSk7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVJZCA9IFwiZWxlUG9wdXBSaWdodFRyZWVcIjtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaG93SWNvbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLmlzU2hvd0xpbmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW1wbGVEYXRhID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuY2hlY2tFbmFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuaXNTaW5nbGVTZWxlY3QgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuZWRpdEVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLnNob3dSZW1vdmVCdG4gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMuc2hvd1JlbmFtZUJ0biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy5vbkNsaWNrID0gKGV2ZW50OiBFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhRXgpPT57XHJcbiAgICAgICAgICAgIGlmKHRyZWVOb2RlLnRyZWVUeXBlID09PSBcImxhbXBcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFtcFBvc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIElEOiB0cmVlTm9kZS5JRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTmFtZTogdHJlZU5vZGUuTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuSXNDaGVjayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0ID0gbGFtcFBvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUcmVlRGF0YXMoKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kTGFtcFRyZWVXaXRoRWxlY3Ryb25pY2ZlbmNlKCkudGhlbigocmVzOiBBcnJheTxBcmVhRXggfCBFbGVjdHJvbmljRmVuY2VFeCB8IExhbXBFeD4pPT57XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyZWVQYXJhbXMudHJlZURhdGFzID0gcmVzO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKXtcclxuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZS5jbG9zZVBvcHVwJywgZmxhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgc3VibWl0KCl7XHJcbiAgICAgICAgaWYoIXRoaXMuSXNDaGVjayl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi5rKh5pyJ6YCJ5oup5Lu75L2V56uL5p2GXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbChmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtb2RlbHMgPSBbXSBhcyBBcnJheTxFbGVjdHJvbmljRmVuY2VDaGFuZ2VBcmVhSURNb2RlbD47XHJcbiAgICAgICAgbW9kZWxzLnB1c2goe2lkOiB0aGlzLmRldmljZURhdGEuSUQsbGFtcElkOiB0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0LklELGRldmljZVJlSWQ6dGhpcy5kZXZpY2VEYXRhLkpzb25Vc2VyRGF0YS5kZXZpY2VSZUlkfSBhcyBFbGVjdHJvbmljRmVuY2VDaGFuZ2VBcmVhSURNb2RlbCk7XHJcbiAgICAgICAgdGhpcy5lbGVjdHJvbmljZmVuY2VTZXJ2aWNlLnVwZGF0ZUVsZWN0cm9uaWNMYW1wSUQobW9kZWxzKS50aGVuKChyZXM6IFJlc3BvbnNlUmVzdWx0PGJvb2xlYW4+KT0+e1xyXG4gICAgICAgICAgICBpZihyZXMuZGF0YSAmJiByZXMuY29kZSA9PT0gMjAwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLmm7TmlrDmiJDlip9cIik7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXllci5tc2coXCLmm7TmlrDlpLHotKVcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiYmFzZUNvbmZpZ0VsZVBvcHVwTGFtcFwiLCBFbGVQb3B1cExhbXBDb250cm9sbGVyKTtcclxuIl19
