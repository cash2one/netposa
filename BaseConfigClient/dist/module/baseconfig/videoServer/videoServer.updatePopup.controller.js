define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/entity/ex/VideoServerEx", "../../../core/entity/Area", "../../../core/enum/VideoServerType", "../../common/services/videoServer.service", "../../common/services/area.service", "angular"], function (require, exports, main_app_1, tree_params_1, VideoServerEx_1, Area_1, VideoServerType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoServerUpdatePopupController = (function () {
        function VideoServerUpdatePopupController($scope, serverService, $timeout, areaService) {
            this.$scope = $scope;
            this.serverService = serverService;
            this.$timeout = $timeout;
            this.areaService = areaService;
            this.isUpdate = false;
            this.videoServerTypeList = [];
            this.proxyListForVideo = [];
            for (var key in VideoServerType_1.VideoServerType) {
                this.videoServerTypeList.push(VideoServerType_1.VideoServerType[key]);
            }
            this.areaTreeDatas = new tree_params_1.TreeDataParams(true);
            this.areaTreeDatas.treeId = 'modalArea';
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            if (this.$scope.updateModalParams.isUpdate) {
                this.currentServe = this.$scope.updateModalParams.updateModel;
                this.areaTreeDatas.defaultSelectTreeId = this.currentServe.AreaID;
                this.areaTreeDatas.isDefaultSelected = true;
            }
            else {
                this.currentServe = new VideoServerEx_1.VideoServerEx();
                this.currentServe.AreaModel = new Area_1.Area();
                if (this.$scope.updateModalParams.defaultDatas) {
                    this.areaTreeDatas.defaultSelectTreeId = this.$scope.updateModalParams.defaultDatas.areaId;
                    this.areaTreeDatas.isDefaultSelected = true;
                }
            }
            var self_this = this;
            $scope.$on("$destroy", function () {
                console.log("销毁了弹出框");
            });
            this.getAreaTree();
            this.proxyListForVideo = this.$scope.proxyListForVideo;
            function treeInitComplete(treeId) {
            }
            function treeSelectNode(event, treeId, treeNode) {
                self_this.areaTreeDatas.isShow = false;
                self_this.$timeout(function () {
                    self_this.setVideoServerArea(treeNode);
                });
            }
        }
        VideoServerUpdatePopupController.prototype.changeTypeSelect = function () {
            var _this = this;
            angular.forEach(VideoServerType_1.VideoServerType, function (val) {
                if (!_this.currentServe.VideoServerType) {
                    _this.currentServe.Port = null;
                }
                if (val.value === _this.currentServe.VideoServerType) {
                    _this.currentServe.Port = val.index;
                }
            });
        };
        VideoServerUpdatePopupController.prototype.commitSaveOrUpdate = function () {
            var _this = this;
            var checkStr = this.validateParams(this.currentServe);
            if (checkStr) {
                return;
            }
            this.currentServe.AreaID = this.currentServe.AreaModel.ID;
            if (this.currentServe.ID) {
                this.serverService.update(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                this.serverService.save(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        VideoServerUpdatePopupController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit('closeServerUpdateModel', isCommit);
        };
        VideoServerUpdatePopupController.prototype.getAreaTree = function (keyword) {
            var reqParams = {
                keyword: ''
            };
            if (keyword) {
                reqParams.keyword = keyword;
            }
            var self_this = this;
            this.areaService.findListTree(reqParams).then(function (resp) {
                self_this.setModalAreaTree(resp);
            });
        };
        VideoServerUpdatePopupController.prototype.changeIsShowAreaTree = function () {
            this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
        };
        ;
        VideoServerUpdatePopupController.prototype.setVideoServerArea = function (area) {
            this.currentServe.AreaModel = new Area_1.Area();
            this.currentServe.AreaModel.ID = area.ID;
            this.currentServe.AreaModel.Name = area.Name;
            this.currentServe.AreaID = area.ID;
        };
        ;
        VideoServerUpdatePopupController.prototype.setModalAreaTree = function (data) {
            this.areaTreeDatas.treeDatas = data;
        };
        VideoServerUpdatePopupController.prototype.validateParams = function (model) {
            if (!model.AreaModel) {
                return 'AreaModel';
            }
            if (!model.Code) {
                return 'Code';
            }
            if (!model.IpAddress) {
                return 'IpAddress';
            }
            if (!model.Name) {
                return 'Name';
            }
            if (!model.Port) {
                return 'Port';
            }
            if (!model.Pwd) {
                return 'Pwd';
            }
            if (!model.Uid) {
                return 'Uid';
            }
            if (!model.VideoServerType) {
                return 'VideoServerType';
            }
            return '';
        };
        VideoServerUpdatePopupController.$inject = ['$scope', 'videoServerService', '$timeout', 'areaService'];
        return VideoServerUpdatePopupController;
    }());
    main_app_1.app
        .controller('videoServerUpdatePopupController', VideoServerUpdatePopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy92aWRlb1NlcnZlci92aWRlb1NlcnZlci51cGRhdGVQb3B1cC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQXFCQTtRQVlJLDBDQUFvQixNQUFXLEVBQVUsYUFBa0IsRUFBVSxRQUFhLEVBQVUsV0FBeUI7WUFBakcsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBVnJILGFBQVEsR0FBWSxLQUFLLENBQUM7WUFRMUIsd0JBQW1CLEdBQWdCLEVBQUUsQ0FBQztZQUN0QyxzQkFBaUIsR0FBdUIsRUFBRSxDQUFDO1lBSXZDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLGlDQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGlDQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDO1lBR0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFjLENBQVMsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBSXZELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsWUFBWSxD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LENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqQixDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDekIsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLENBQUM7WUFFRCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQTlKTSx3Q0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQWlLakYsdUNBQUM7S0FsS0QsQUFrS0MsSUFBQTtJQUNELGNBQUc7U0FDRSxVQUFVLENBQUMsa0NBQWtDLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvYmFzZWNvbmZpZy92aWRlb1NlcnZlci92aWRlb1NlcnZlci51cGRhdGVQb3B1cC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy92aWRlb1NlcnZlci5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlJztcclxuaW1wb3J0ICdhbmd1bGFyJztcclxuXHJcbmltcG9ydCB7IElBcmVhU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcbmltcG9ydCB7IFZpZGVvU2VydmVyRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvVmlkZW9TZXJ2ZXJFeFwiO1xyXG5pbXBvcnQgeyBBcmVhIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L0FyZWFcIjtcclxuaW1wb3J0IHsgQXJlYUV4IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0FyZWFFeFwiO1xyXG5pbXBvcnQgeyBFbnVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7IFZpZGVvU2VydmVyVHlwZSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vVmlkZW9TZXJ2ZXJUeXBlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlUmVzdWx0IH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvcGFyYW1zL3Jlc3VsdC9SZXNwb25zZVJlc3VsdFwiO1xyXG5pbXBvcnQgeyBQcm94eVNlcnZlciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Qcm94eVNlcnZlclwiO1xyXG5pbXBvcnQgeyBJUHJveHlTZXJ2ZXJUeXBlRW51bSB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudW0vUHJveHlTZXJ2ZXJUeXBlXCI7XHJcblxyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxuY2xhc3MgVmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cENvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3QgPSBbJyRzY29wZScsICd2aWRlb1NlcnZlclNlcnZpY2UnLCAnJHRpbWVvdXQnLCAnYXJlYVNlcnZpY2UnXTtcclxuICAgIGlzVXBkYXRlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgY3VycmVudFNlcnZlOiBWaWRlb1NlcnZlckV4O1xyXG5cclxuICAgIC8vLS0tLS0tLXN0YXJ0LS0tLeagkSDnu5PmnoQg5o6n5Lu2IOWPguaVsFxyXG4gICAgYXJlYVRyZWVEYXRhczogSVRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICAvLy0tLS0tLS1lbmRcclxuXHJcbiAgICB2aWRlb1NlcnZlclR5cGVMaXN0OiBBcnJheTxFbnVtPiA9IFtdO1xyXG4gICAgcHJveHlMaXN0Rm9yVmlkZW86IEFycmF5PFByb3h5U2VydmVyPiA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSwgcHJpdmF0ZSBzZXJ2ZXJTZXJ2aWNlOiBhbnksIHByaXZhdGUgJHRpbWVvdXQ6IGFueSwgcHJpdmF0ZSBhcmVhU2VydmljZTogSUFyZWFTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIC8vIOWIneWni+WMliDnsbvlnovpgInmi6lcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gVmlkZW9TZXJ2ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlkZW9TZXJ2ZXJUeXBlTGlzdC5wdXNoKFZpZGVvU2VydmVyVHlwZVtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/moJHnu5PmnoTlj4LmlbDliJ3lp4vljJZcclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnbW9kYWxBcmVhJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMub25DbGljayA9IHRyZWVTZWxlY3ROb2RlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSW5pdENvbXBsZXRlID0gdHJlZUluaXRDb21wbGV0ZTtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIGN0cmwg5Lyg6L+H5p2l55qE5Y+C5pWwXHJcblxyXG4gICAgICAgIGlmICh0aGlzLiRzY29wZS51cGRhdGVNb2RhbFBhcmFtcy5pc1VwZGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IHRoaXMuJHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zLnVwZGF0ZU1vZGVsO1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuZGVmYXVsdFNlbGVjdFRyZWVJZCA9IHRoaXMuY3VycmVudFNlcnZlLkFyZWFJRDtcclxuICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IG5ldyBWaWRlb1NlcnZlckV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNlcnZlLkFyZWFNb2RlbCA9IG5ldyBBcmVhKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRzY29wZS51cGRhdGVNb2RhbFBhcmFtcy5kZWZhdWx0RGF0YXMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5kZWZhdWx0U2VsZWN0VHJlZUlkID0gdGhpcy4kc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMuZGVmYXVsdERhdGFzLmFyZWFJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzZWxmX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICRzY29wZS4kb24oXCIkZGVzdHJveVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi6ZSA5q+B5LqG5by55Ye65qGGXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlKCk7XHJcbiAgICAgICAgdGhpcy5wcm94eUxpc3RGb3JWaWRlbyA9IHRoaXMuJHNjb3BlLnByb3h5TGlzdEZvclZpZGVvXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZUluaXRDb21wbGV0ZSh0cmVlSWQ6IHN0cmluZykge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRyZWVTZWxlY3ROb2RlKGV2ZW50OiBNb3VzZUV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IEFyZWEpIHtcclxuICAgICAgICAgICAgc2VsZl90aGlzLmFyZWFUcmVlRGF0YXMuaXNTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNlbGZfdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMuc2V0VmlkZW9TZXJ2ZXJBcmVhKHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZVR5cGVTZWxlY3QoKSB7XHJcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKFZpZGVvU2VydmVyVHlwZSwgKHZhbDogSVByb3h5U2VydmVyVHlwZUVudW0pID0+IHsvL0lQcm94eVNlcnZlclR5cGVFbnVtXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmN1cnJlbnRTZXJ2ZS5WaWRlb1NlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuUG9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHZhbC52YWx1ZSA9PT0gdGhpcy5jdXJyZW50U2VydmUuVmlkZW9TZXJ2ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZS5Qb3J0ID0gdmFsLmluZGV4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBjaGVja1N0ciA9IHRoaXMudmFsaWRhdGVQYXJhbXModGhpcy5jdXJyZW50U2VydmUpO1xyXG4gICAgICAgIGlmIChjaGVja1N0cikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZS5BcmVhSUQgPSB0aGlzLmN1cnJlbnRTZXJ2ZS5BcmVhTW9kZWwuSUQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTZXJ2ZS5JRCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlcnZlclNlcnZpY2UudXBkYXRlKHRoaXMuY3VycmVudFNlcnZlKS50aGVuKChyZXNwOiBSZXNwb25zZVJlc3VsdDxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5jb2RlID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VVcGRhdGVNb2RlbCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXJTZXJ2aWNlLnNhdmUodGhpcy5jdXJyZW50U2VydmUpLnRoZW4oKHJlc3A6IFJlc3BvbnNlUmVzdWx0PHN0cmluZz4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwLmNvZGUgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVVwZGF0ZU1vZGVsKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNsb3NlVXBkYXRlTW9kZWwoaXNDb21taXQ6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2VTZXJ2ZXJVcGRhdGVNb2RlbCcsIGlzQ29tbWl0KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBhcmVhIHRyZWVcclxuICAgIGdldEFyZWFUcmVlKGtleXdvcmQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVxUGFyYW1zID0ge1xyXG4gICAgICAgICAgICBrZXl3b3JkOiAnJ1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGtleXdvcmQpIHtcclxuICAgICAgICAgICAgcmVxUGFyYW1zLmtleXdvcmQgPSBrZXl3b3JkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShyZXFQYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgc2VsZl90aGlzLnNldE1vZGFsQXJlYVRyZWUocmVzcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5pS55Y+Y5pi+56S6IGFyZWFUcmVlXHJcbiAgICBjaGFuZ2VJc1Nob3dBcmVhVHJlZSgpIHtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuaXNTaG93ID0gIXRoaXMuYXJlYVRyZWVEYXRhcy5pc1Nob3c7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGFyZWEg6YCJ5oup5pS55Y+YXHJcbiAgICBzZXRWaWRlb1NlcnZlckFyZWEoYXJlYTogQXJlYSkge1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNlcnZlLkFyZWFNb2RlbCA9IG5ldyBBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuQXJlYU1vZGVsLklEID0gYXJlYS5JRDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZS5BcmVhTW9kZWwuTmFtZSA9IGFyZWEuTmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuQXJlYUlEID0gYXJlYS5JRDtcclxuICAgIH07XHJcblxyXG4gICAgLy9hcmVhIOaVsOaNrui1i+WAvFxyXG4gICAgc2V0TW9kYWxBcmVhVHJlZShkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZURhdGFzID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICAvL+mqjOivgeWtl+autemZkOWItu+8jOi/lOWbnuaPkOekuuivrVxyXG4gICAgdmFsaWRhdGVQYXJhbXMobW9kZWw6IFZpZGVvU2VydmVyRXgpOiBzdHJpbmcge1xyXG5cclxuICAgICAgICBpZiAoIW1vZGVsLkFyZWFNb2RlbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0FyZWFNb2RlbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbW9kZWwuQ29kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0NvZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1vZGVsLklwQWRkcmVzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0lwQWRkcmVzcyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbW9kZWwuTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ05hbWUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1vZGVsLlBvcnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdQb3J0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFtb2RlbC5Qd2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdQd2QnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1vZGVsLlVpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ1VpZCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbW9kZWwuVmlkZW9TZXJ2ZXJUeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnVmlkZW9TZXJ2ZXJUeXBlJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcblxyXG59XHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ3ZpZGVvU2VydmVyVXBkYXRlUG9wdXBDb250cm9sbGVyJywgVmlkZW9TZXJ2ZXJVcGRhdGVQb3B1cENvbnRyb2xsZXIpOyJdfQ==
