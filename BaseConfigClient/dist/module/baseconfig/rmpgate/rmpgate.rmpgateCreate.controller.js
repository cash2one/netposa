define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/directive/tree/tree.directive.service", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeviceRmpGateCreateController = (function () {
        function DeviceRmpGateCreateController($scope, connectTreeService, $timeout, rmpgateService, treeService, layer) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.rmpgateService = rmpgateService;
            this.treeService = treeService;
            this.layer = layer;
            this.Rmpgate = angular.copy(this.$scope.RmpGate);
            if (!this.Rmpgate.JsonUserData.lampPost) {
                this.Rmpgate.JsonUserData.lampPost = {};
            }
            this.initTreeDatas();
            this.getTreeDatas();
        }
        DeviceRmpGateCreateController.prototype.initTreeDatas = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "areaPopupAreaTree";
            this.treeParams.isDefaultSelected = true;
            this.treeParams.onClick = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    if (treeNode.treeType === "lamp") {
                        var lampPost = {
                            ID: treeNode.ID,
                            Name: treeNode.Name
                        };
                        _this.Rmpgate.JsonUserData.lampPost = lampPost;
                        _this.isShowAreaTree = false;
                    }
                });
            };
        };
        DeviceRmpGateCreateController.prototype.getTreeDatas = function () {
            var _this = this;
            this.connectTreeService.findLampTreeWithRmpGate().then(function (res) {
                _this.$timeout(function () {
                    _this.treeParams.treeDatas = res;
                });
            });
        };
        DeviceRmpGateCreateController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        DeviceRmpGateCreateController.prototype.submit = function () {
            var _this = this;
            this.rmpgateService.edit(this.Rmpgate).then(function (res) {
                if (res.data && res.code === 200) {
                    _this.layer.msg("更新成功");
                    _this.cancel(true);
                }
                else {
                    _this.layer.msg("更新失败");
                }
            });
        };
        DeviceRmpGateCreateController.$inject = ['$scope', 'connectTreeService', '$timeout', 'rmpgateService', 'treeDirectiveService', 'layer'];
        return DeviceRmpGateCreateController;
    }());
    main_app_1.app.controller("DeviceRmpGateCreateController", DeviceRmpGateCreateController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9ybXBnYXRlL3JtcGdhdGUucm1wZ2F0ZUNyZWF0ZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQW1CQTtRQU1JLHVDQUFvQixNQUFXLEVBQVUsa0JBQXVDLEVBQ3BFLFFBQWEsRUFBVSxjQUErQixFQUN0RCxXQUFrQyxFQUNsQyxLQUFVO1lBSEYsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBcUI7WUFDcEUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtZQUN0RCxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFZLENBQUM7WUFDdEQsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNPLHFEQUFhLEdBQXJCO1lBQUEsaUJBZ0JDO1lBZkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQWlCLEVBQUUsTUFBYyxFQUFFLFFBQWdCO2dCQUMxRSxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsSUFBSSxRQUFRLEdBQUc7NEJBQ1gsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFOzRCQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTt5QkFDdEIsQ0FBQTt3QkFDRCxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO3dCQUM5QyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztvQkFDaEMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQTtZQUNOLENBQUMsQ0FBQTtRQUNMLENBQUM7UUFDTyxvREFBWSxHQUFwQjtZQUFBLGlCQU1DO1lBTEcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHVCQUF1QixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBdUM7Z0JBQzNGLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNELDhDQUFNLEdBQU4sVUFBTyxJQUFjO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFDRCw4Q0FBTSxHQUFOO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBNEI7Z0JBQ3JFLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQSxDQUFDO29CQUM3QixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztnQkFBQSxJQUFJLENBQUEsQ0FBQztvQkFDRixLQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQXBETSxxQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQXFEckgsb0NBQUM7S0F0REQsQUFzREMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsK0JBQStCLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9ybXBnYXRlL3JtcGdhdGUucm1wZ2F0ZUNyZWF0ZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHsgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IFJtcEdhdGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9SbXBHYXRlJztcclxuXHJcbmltcG9ydCB7IFJtcEdhdGVFeCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9SbXBHYXRlRXhcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBJUm1wR2F0ZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL3JtcGdhdGUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJVHJlZURpcmVjdGl2ZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUmVzcG9uc2VSZXN1bHQgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvcmVzdWx0L1Jlc3BvbnNlUmVzdWx0XCI7XHJcbmltcG9ydCB7IFRyZWVUeXBlIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9UcmVlVHlwZVwiO1xyXG5cclxuaW1wb3J0IHsgQ2FtZXJhVHlwZUVudW0gfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZlci9lbnVtL0NhbWVyYVR5cGVFbnVtJztcclxuaW1wb3J0IHsgTGFtcEV4IH0gZnJvbSAnLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvTGFtcEV4JztcclxuaW1wb3J0IHsgSUNvbm5lY3RUcmVlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgRGV2aWNlUm1wR2F0ZUNyZWF0ZUNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICdjb25uZWN0VHJlZVNlcnZpY2UnLCAnJHRpbWVvdXQnLCAncm1wZ2F0ZVNlcnZpY2UnLCAndHJlZURpcmVjdGl2ZVNlcnZpY2UnLCAnbGF5ZXInXTtcclxuICAgIHRyZWVQYXJhbXM6IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IFJtcEdhdGVFeCB8IExhbXBFeD47XHJcbiAgICBSbXBnYXRlOiBSbXBHYXRlO1xyXG4gICAgaXNTaG93QXJlYVRyZWU6IGJvb2xlYW47XHJcbiAgICBpc1Jvb3RBcmVhOiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LCBwcml2YXRlIHJtcGdhdGVTZXJ2aWNlOiBJUm1wR2F0ZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB0cmVlU2VydmljZTogSVRyZWVEaXJlY3RpdmVTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXI6IGFueSkge1xyXG4gICAgICAgIHRoaXMuUm1wZ2F0ZSA9IGFuZ3VsYXIuY29weSh0aGlzLiRzY29wZS5SbXBHYXRlKTtcclxuICAgICAgICBpZiAoIXRoaXMuUm1wZ2F0ZS5Kc29uVXNlckRhdGEubGFtcFBvc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5SbXBnYXRlLkpzb25Vc2VyRGF0YS5sYW1wUG9zdCA9IHt9IGFzIExhbXBFeDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0VHJlZURhdGFzKCk7XHJcbiAgICAgICAgdGhpcy5nZXRUcmVlRGF0YXMoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVEYXRhcygpIHtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSWQgPSBcImFyZWFQb3B1cEFyZWFUcmVlXCI7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMub25DbGljayA9IChldmVudDogTW91c2VFdmVudCwgdHJlZUlkOiBzdHJpbmcsIHRyZWVOb2RlOiBBcmVhRXgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHJlZU5vZGUudHJlZVR5cGUgPT09IFwibGFtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhbXBQb3N0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBJRDogdHJlZU5vZGUuSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IHRyZWVOb2RlLk5hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SbXBnYXRlLkpzb25Vc2VyRGF0YS5sYW1wUG9zdCA9IGxhbXBQb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93QXJlYVRyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFRyZWVEYXRhcygpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kTGFtcFRyZWVXaXRoUm1wR2F0ZSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgUm1wR2F0ZUV4IHwgTGFtcEV4PikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSByZXM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZS5jbG9zZVBvcHVwJywgZmxhZyk7XHJcbiAgICB9XHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgdGhpcy5ybXBnYXRlU2VydmljZS5lZGl0KHRoaXMuUm1wZ2F0ZSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxib29sZWFuPik9PntcclxuICAgICAgICAgICAgaWYocmVzLmRhdGEgJiYgcmVzLmNvZGUgPT09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxheWVyLm1zZyhcIuabtOaWsOaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuY2VsKHRydWUpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGF5ZXIubXNnKFwi5pu05paw5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuYXBwLmNvbnRyb2xsZXIoXCJEZXZpY2VSbXBHYXRlQ3JlYXRlQ29udHJvbGxlclwiLCBEZXZpY2VSbXBHYXRlQ3JlYXRlQ29udHJvbGxlcik7Il19
