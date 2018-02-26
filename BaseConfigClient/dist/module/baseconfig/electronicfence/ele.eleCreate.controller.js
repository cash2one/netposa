define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../common/services/connectTree.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ElectroninfenceCreateController = (function () {
        function ElectroninfenceCreateController($scope, connectTreeService, $timeout, electronicfenceService) {
            this.$scope = $scope;
            this.connectTreeService = connectTreeService;
            this.$timeout = $timeout;
            this.electronicfenceService = electronicfenceService;
            this.isShowIodTree = false;
            this.isShowAreaTree = false;
            this.isRootIod = false;
            this.deviceData = angular.copy(this.$scope.ElectronicFenceData);
            this.initParams();
            if (!this.deviceData.JsonUserData.lampPost) {
                this.deviceData.JsonUserData.lampPost = {};
            }
            this.getLampTree();
            this.$scope.$on('$destory', function () {
                console.log("$destory action");
            });
        }
        ElectroninfenceCreateController.prototype.initParams = function () {
            var _this = this;
            this.areaTreeParams = new tree_params_1.TreeDataParams(true);
            this.areaTreeParams.treeId = "elePopupTree";
            this.areaTreeParams.isDefaultSelected = true;
            this.areaTreeParams.onClick = function (event, treeId, treeNode) {
                _this.$timeout(function () {
                    _this.deviceData.AreaID = treeNode.ID;
                    _this.deviceData.JsonUserData.Area.Name = treeNode.Name;
                    _this.isShowIodTree = false;
                });
            };
        };
        ElectroninfenceCreateController.prototype.getLampTree = function () {
            var _this = this;
            this.connectTreeService.findLampTreeWithElectronicfence().then(function (datas) {
                _this.$timeout(function () {
                    _this.lampAreaParams = new tree_params_1.TreeDataParams(true);
                    _this.lampAreaParams.treeDatas = datas;
                    _this.lampAreaParams.treeId = "lampAreaPopupTree";
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
        ElectroninfenceCreateController.prototype.cancel = function (flag) {
            this.$scope.$emit('device.closePopup', flag);
        };
        ElectroninfenceCreateController.prototype.submit = function () {
            var _this = this;
            this.submitData = this.deviceData;
            this.electronicfenceService.edit(this.submitData).then(function (res) {
                console.log(res);
                if (res.data && res.code === 200) {
                    _this.cancel(true);
                }
            });
        };
        ElectroninfenceCreateController.$inject = ['$scope', 'connectTreeService', '$timeout', 'electronicfenceService', 'treeDirectiveService'];
        return ElectroninfenceCreateController;
    }());
    main_app_1.app.controller("DeviceElectroninfenceCreateController", ElectroninfenceCreateController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9lbGVjdHJvbmljZmVuY2UvZWxlLmVsZUNyZWF0ZS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWFBO1FBWUkseUNBQW9CLE1BQVcsRUFDbkIsa0JBQXVDLEVBQ3ZDLFFBQWEsRUFDYixzQkFBK0M7WUFIdkMsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUNuQix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1lBQ3ZDLGFBQVEsR0FBUixRQUFRLENBQUs7WUFDYiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXlCO1lBVjNELGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBQy9CLG1CQUFjLEdBQVksS0FBSyxDQUFDO1lBQ2hDLGNBQVMsR0FBWSxLQUFLLENBQUM7WUFTdkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsRUFBWSxDQUFDO1lBQ3pELENBQUM7WUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFDO2dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7WUFDbEMsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQ08sb0RBQVUsR0FBbEI7WUFBQSxpQkFXQztZQVZHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSw0QkFBYyxDQUE2QixJQUFJLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FB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L2VsZWN0cm9uaWNmZW5jZS9lbGUuZWxlQ3JlYXRlLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgeyBUcmVlRGF0YVBhcmFtcyB9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJRWxlY3Ryb25pY0ZlbmNlU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9lbGVjdHJvbmljZmVuY2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgRWxlY3Ryb25pY0ZlbmNlRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvRWxlY3Ryb25pY0ZlbmNlRXhcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBMYW1wRXggfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudGl0eS9leC9MYW1wRXgnO1xyXG5pbXBvcnQge0VsZWN0cm9uaWNGZW5jZX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0VsZWN0cm9uaWNGZW5jZVwiO1xyXG5pbXBvcnQgeyBSZXNwb25zZVJlc3VsdCB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHsgSUNvbm5lY3RUcmVlU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5pbXBvcnQgXCIuLi8uLi9jb21tb24vc2VydmljZXMvY29ubmVjdFRyZWUuc2VydmljZVwiO1xyXG5kZWNsYXJlIGxldCBhbmd1bGFyOiBhbnk7XHJcblxyXG5jbGFzcyBFbGVjdHJvbmluZmVuY2VDcmVhdGVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnY29ubmVjdFRyZWVTZXJ2aWNlJywgJyR0aW1lb3V0JywgJ2VsZWN0cm9uaWNmZW5jZVNlcnZpY2UnLCAndHJlZURpcmVjdGl2ZVNlcnZpY2UnXTtcclxuICAgIGFyZWFUcmVlUGFyYW1zOiBUcmVlRGF0YVBhcmFtczxBcmVhRXggfCBFbGVjdHJvbmljRmVuY2VFeD47XHJcbiAgICBsYW1wQXJlYVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgTGFtcEV4IHwgRWxlY3Ryb25pY0ZlbmNlRXg+O1xyXG4gICAgTGFtcDogc3RyaW5nO1xyXG4gICAgaXNTaG93SW9kVHJlZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgaXNTaG93QXJlYVRyZWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGlzUm9vdElvZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICBkZXZpY2VEYXRhOiBFbGVjdHJvbmljRmVuY2U7IC8v5b2T5YmN57yW6L6R5pWw5o2uXHJcbiAgICBMYW1wSUQ6IHN0cmluZztcclxuICAgIHN1Ym1pdERhdGE6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgZWxlY3Ryb25pY2ZlbmNlU2VydmljZTogSUVsZWN0cm9uaWNGZW5jZVNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmRldmljZURhdGEgPSBhbmd1bGFyLmNvcHkodGhpcy4kc2NvcGUuRWxlY3Ryb25pY0ZlbmNlRGF0YSk7XHJcbiAgICAgICAgdGhpcy5pbml0UGFyYW1zKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRldmljZURhdGEuSnNvblVzZXJEYXRhLmxhbXBQb3N0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGV2aWNlRGF0YS5Kc29uVXNlckRhdGEubGFtcFBvc3QgPSB7fSBhcyBMYW1wRXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0TGFtcFRyZWUoKTtcclxuICAgICAgICB0aGlzLiRzY29wZS4kb24oJyRkZXN0b3J5JywoKT0+e1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgJGRlc3RvcnkgYWN0aW9uYClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0UGFyYW1zKCkge1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4IHwgRWxlY3Ryb25pY0ZlbmNlRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVQYXJhbXMudHJlZUlkID0gXCJlbGVQb3B1cFRyZWVcIjtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlUGFyYW1zLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlUGFyYW1zLm9uQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2VEYXRhLkFyZWFJRCA9IHRyZWVOb2RlLklEO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kZXZpY2VEYXRhLkpzb25Vc2VyRGF0YS5BcmVhLk5hbWUgPSB0cmVlTm9kZS5OYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Nob3dJb2RUcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0TGFtcFRyZWUoKSB7XHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHJlZVNlcnZpY2UuZmluZExhbXBUcmVlV2l0aEVsZWN0cm9uaWNmZW5jZSgpLnRoZW4oKGRhdGFzOiBBcnJheTxBcmVhRXggfCBMYW1wRXggfCBFbGVjdHJvbmljRmVuY2VFeD4pID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbXBBcmVhUGFyYW1zID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeCB8IExhbXBFeCB8IEVsZWN0cm9uaWNGZW5jZUV4Pih0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFtcEFyZWFQYXJhbXMudHJlZURhdGFzID0gZGF0YXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhbXBBcmVhUGFyYW1zLnRyZWVJZCA9IFwibGFtcEFyZWFQb3B1cFRyZWVcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMubGFtcEFyZWFQYXJhbXMuaXNEZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYW1wQXJlYVBhcmFtcy5vbkNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWFFeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJlZU5vZGUudHJlZVR5cGUgPT09IFwibGFtcFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGFtcFBvc3QgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSUQ6IHRyZWVOb2RlLklELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE5hbWU6IHRyZWVOb2RlLk5hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlRGF0YS5Kc29uVXNlckRhdGEubGFtcFBvc3QgPSBsYW1wUG9zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXNTaG93QXJlYVRyZWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgY2FuY2VsKGZsYWc/OiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2RldmljZS5jbG9zZVBvcHVwJywgZmxhZyk7XHJcbiAgICB9XHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zdWJtaXREYXRhID0gdGhpcy5kZXZpY2VEYXRhO1xyXG4gICAgICAgIHRoaXMuZWxlY3Ryb25pY2ZlbmNlU2VydmljZS5lZGl0KHRoaXMuc3VibWl0RGF0YSkudGhlbigocmVzOiBSZXNwb25zZVJlc3VsdDxib29sZWFuPik9PntcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICBpZiAocmVzLmRhdGEgJiYgcmVzLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW5jZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIkRldmljZUVsZWN0cm9uaW5mZW5jZUNyZWF0ZUNvbnRyb2xsZXJcIiwgRWxlY3Ryb25pbmZlbmNlQ3JlYXRlQ29udHJvbGxlcik7Il19
