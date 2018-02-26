define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/server/enum/CameraTypeEnum", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1, CameraTypeEnum_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DeviceCameraCreateController = (function () {
        function DeviceCameraCreateController($scope, connectTreeService, $timeout, cameraService) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.cameraService = cameraService;
            this.cameraTypeList = CameraTypeEnum_1.CameraTypeEnum;
            this.Camera = angular.copy(this.$scope.Camera);
            if (!this.Camera.JsonUserData.lampPost) {
                this.Camera.JsonUserData.lampPost = {};
            }
            this.initTreeParams();
            this.$scope.$on('$destory', function () {
                console.log("$destory action");
            });
        }
        DeviceCameraCreateController.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "LampTreeWithCamera";
            this.treeParams.isDefaultSelected = true;
            this.treeParams.onClick = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    if (treeNode.treeType === "lamp") {
                        _this.Camera.JsonUserData.lampPost.ID = treeNode.ID;
                        _this.Camera.JsonUserData.lampPost.Name = treeNode.Name;
                        _this.isShowAreaTree = false;
                    }
                });
            };
            this.connectTreeService.findLampTreeWithCamera().then(function (res) {
                _this.$timeout(function () {
                    _this.treeParams.treeDatas = res;
                    _this.treeParams.defaultSelectTreeId = _this.Camera.JsonUserData.lampPost.ID ? _this.Camera.JsonUserData.lampPost.ID : '';
                });
            });
        };
        DeviceCameraCreateController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        DeviceCameraCreateController.prototype.submit = function () {
            var _this = this;
            this.cameraService.edit(this.Camera).then(function (res) {
                if (res.code == 200 && res.data) {
                    _this.cancel(true);
                }
            });
        };
        DeviceCameraCreateController.$inject = ['$scope', 'connectTreeService', '$timeout', 'cameraService'];
        return DeviceCameraCreateController;
    }());
    main_app_1.app.controller("DeviceCameraCreateController", DeviceCameraCreateController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9jYW1lcmEvY2FtZXJhLmNhbWVyYUNyZWF0ZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWNBO1FBT0ksc0NBQW9CLE1BQVcsRUFDWCxrQkFBdUMsRUFDdkMsUUFBYSxFQUNiLGFBQTZCO1lBSDdCLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7WUFOakQsbUJBQWMsR0FBc0MsK0JBQWMsQ0FBQztZQVEvRCxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFZLENBQUM7WUFDckQsQ0FBQztZQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUNsQyxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDTyxxREFBYyxHQUF0QjtZQUFBLGlCQW9CQztZQW5CRyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNEJBQWMsRUFBOEIsQ0FBQztZQUNuRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztZQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQWlCLEVBQUUsTUFBYyxFQUFFLFFBQWdCO2dCQUMxRSxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUNuRCxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ3ZELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUNoQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBc0M7Z0JBQ3pGLEtBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO29CQUNoQyxLQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDM0gsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDRCw2Q0FBTSxHQUFOLFVBQU8sSUFBYztZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBQ0QsNkNBQU0sR0FBTjtZQUFBLGlCQU9DO1lBTkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQTRCO2dCQUNuRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdEIsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQztRQXBETSxvQ0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztRQXNEbkYsbUNBQUM7S0F2REQsQUF1REMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy9jYW1lcmEvY2FtZXJhLmNhbWVyYUNyZWF0ZS5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCB7VHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtDYW1lcmF9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW50aXR5L0NhbWVyYSc7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge0FyZWFFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQge0lDYW1lcmFTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vY29tbW9uL3NlcnZpY2VzL2NhbWVyYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtDYW1lcmFUeXBlRW51bX0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2ZXIvZW51bS9DYW1lcmFUeXBlRW51bSc7XHJcbmltcG9ydCB7TGFtcEV4fSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0lDb25uZWN0VHJlZVNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgRGV2aWNlQ2FtZXJhQ3JlYXRlQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywgJ2Nvbm5lY3RUcmVlU2VydmljZScsICckdGltZW91dCcsICdjYW1lcmFTZXJ2aWNlJ107XHJcbiAgICB0cmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBMYW1wRXggfCBDYW1lcmFFeD47XHJcbiAgICBDYW1lcmE6IENhbWVyYTtcclxuICAgIGNhbWVyYVR5cGVMaXN0OiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9W10gPSBDYW1lcmFUeXBlRW51bTtcclxuICAgIGlzU2hvd0FyZWFUcmVlOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbm5lY3RUcmVlU2VydmljZTogSUNvbm5lY3RUcmVlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgY2FtZXJhU2VydmljZTogSUNhbWVyYVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBhbmd1bGFyLmNvcHkodGhpcy4kc2NvcGUuQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLkNhbWVyYS5Kc29uVXNlckRhdGEubGFtcFBvc3QpIHtcclxuICAgICAgICAgICAgdGhpcy5DYW1lcmEuSnNvblVzZXJEYXRhLmxhbXBQb3N0ID0ge30gYXMgTGFtcEV4O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmluaXRUcmVlUGFyYW1zKCk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKCckZGVzdG9yeScsKCk9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCRkZXN0b3J5IGFjdGlvbmApXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKSB7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IExhbXBFeCB8IENhbWVyYUV4PigpO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSWQgPSBcIkxhbXBUcmVlV2l0aENhbWVyYVwiO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLm9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyZWVOb2RlLnRyZWVUeXBlID09PSBcImxhbXBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLkpzb25Vc2VyRGF0YS5sYW1wUG9zdC5JRCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuQ2FtZXJhLkpzb25Vc2VyRGF0YS5sYW1wUG9zdC5OYW1lID0gdHJlZU5vZGUuTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzU2hvd0FyZWFUcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZExhbXBUcmVlV2l0aENhbWVyYSgpLnRoZW4oKHJlczogQXJyYXk8QXJlYUV4IHwgTGFtcEV4IHwgQ2FtZXJhRXg+KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyA9IHJlcztcclxuICAgICAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy5kZWZhdWx0U2VsZWN0VHJlZUlkID0gdGhpcy5DYW1lcmEuSnNvblVzZXJEYXRhLmxhbXBQb3N0LklEID8gdGhpcy5DYW1lcmEuSnNvblVzZXJEYXRhLmxhbXBQb3N0LklEIDogJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZS5jbG9zZVBvcHVwJywgZmxhZyk7XHJcbiAgICB9XHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgdGhpcy5jYW1lcmFTZXJ2aWNlLmVkaXQodGhpcy5DYW1lcmEpLnRoZW4oKHJlczogUmVzcG9uc2VSZXN1bHQ8Ym9vbGVhbj4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5jb2RlID09IDIwMCAmJiByZXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKFwiRGV2aWNlQ2FtZXJhQ3JlYXRlQ29udHJvbGxlclwiLCBEZXZpY2VDYW1lcmFDcmVhdGVDb250cm9sbGVyKTsiXX0=
