define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "../../../core/entity/ex/IvsServerEx", "../../../core/entity/Area", "../../../core/enum/IvsServerType", "../../common/services/area.service", "../../common/services/ivsServer.service", "../../common/services/proxyServer.service", "angular"], function (require, exports, main_app_1, tree_params_1, IvsServerEx_1, Area_1, IvsServerType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IvsServerUpdateModalController = (function () {
        function IvsServerUpdateModalController($scope, proxyServerService, ivsServerService, $timeout, areaService) {
            this.$scope = $scope;
            this.proxyServerService = proxyServerService;
            this.ivsServerService = ivsServerService;
            this.$timeout = $timeout;
            this.areaService = areaService;
            this.isUpdate = false;
            this.ivsServerTypeList = [];
            this.proxyServerList = [];
            for (var key in IvsServerType_1.IvsServerType) {
                this.ivsServerTypeList.push(IvsServerType_1.IvsServerType[key]);
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
                this.currentServe = new IvsServerEx_1.IvsServerEx();
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
            this.getProxyServerList();
            this.getAreaTree();
            function treeInitComplete(treeId) {
            }
            function treeSelectNode(event, treeId, treeNode) {
                self_this.$timeout(function () {
                    self_this.setIvsServerArea(treeNode);
                });
            }
        }
        IvsServerUpdateModalController.prototype.changeTypeSelect = function () {
            var _this = this;
            angular.forEach(this.proxyServerList, function (val) {
                if (!_this.currentServe.ProxyServerID) {
                    _this.currentServe.Port = null;
                }
                if (val.ID === _this.currentServe.ProxyServerID) {
                    _this.currentServe.Port = val.Port;
                }
            });
        };
        IvsServerUpdateModalController.prototype.setIvsServerArea = function (area) {
            this.currentServe.AreaModel = new Area_1.Area();
            this.currentServe.AreaModel.ID = area.ID;
            this.currentServe.AreaModel.Name = area.Name;
            this.currentServe.AreaID = area.ID;
        };
        ;
        IvsServerUpdateModalController.prototype.commitSaveOrUpdate = function () {
            var _this = this;
            var checkStr = this.validateParams(this.currentServe);
            if (checkStr) {
                return;
            }
            else {
            }
            if (this.currentServe.ID) {
                this.ivsServerService.update(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
            else {
                this.ivsServerService.save(this.currentServe).then(function (resp) {
                    if (resp.code == 200) {
                        _this.closeUpdateModel(true);
                    }
                });
            }
        };
        ;
        IvsServerUpdateModalController.prototype.closeUpdateModel = function (isCommit) {
            this.$scope.$emit('closeServerUpdateModel', { isCommit: isCommit });
        };
        IvsServerUpdateModalController.prototype.getAreaTree = function (keyword) {
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
        IvsServerUpdateModalController.prototype.changeIsShowAreaTree = function () {
            this.areaTreeDatas.isShow = !this.areaTreeDatas.isShow;
            console.log(this.currentServe);
        };
        ;
        IvsServerUpdateModalController.prototype.setModalAreaTree = function (data) {
            this.areaTreeDatas.treeDatas = data;
        };
        IvsServerUpdateModalController.prototype.getProxyServerList = function () {
            var _this = this;
            this.proxyServerService.findAll().then(function (resp) {
                if (resp.code == 200) {
                    _this.proxyServerList = resp.data;
                }
            });
        };
        IvsServerUpdateModalController.prototype.validateParams = function (model) {
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
            if (!model.ServerType) {
                return 'ServerType';
            }
            return '';
        };
        IvsServerUpdateModalController.$inject = ['$scope', 'proxyServerService', 'ivsServerService', '$timeout', 'areaService'];
        return IvsServerUpdateModalController;
    }());
    main_app_1.app
        .controller('ivsServerUpdateModalController', IvsServerUpdateModalController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9pdnNTZXJ2ZXIvaXZzU2VydmVyLnVwZGF0ZU1vZGFsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBdUJBO1FBWUksd0NBQW9CLE1BQVUsRUFBVSxrQkFBc0MsRUFBVSxnQkFBa0MsRUFBUyxRQUFZLEVBQVMsV0FBd0I7WUFBNUosV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7WUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1lBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1lBWGhMLGFBQVEsR0FBVyxLQUFLLENBQUM7WUFNekIsc0JBQWlCLEdBQWUsRUFBRSxDQUFDO1lBQ25DLG9CQUFlLEdBQXNCLEVBQUUsQ0FBQztZQU9wQyxHQUFHLENBQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSw2QkFBYSxDQUFDLENBQUEsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEQsQ0FBQztZQUdELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0QkFBYyxDQUFTLElBQUksQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7WUFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUd2RCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7Z0JBQzlELElBQUks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QSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7Z0JBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDWCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFDRCxFQUFFLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDakIsQ0FBQztZQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDeEIsQ0FBQztZQUVELE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFDZCxDQUFDO1FBMUpNLHNDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUMsb0JBQW9CLEVBQUMsa0JBQWtCLEVBQUMsVUFBVSxFQUFDLGFBQWEsQ0FBQyxDQUFDO1FBMkpqRyxxQ0FBQztLQXJLRCxBQXFLQyxJQUFBO0lBQ0QsY0FBRztTQUNFLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRSw4QkFBOEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL2l2c1NlcnZlci9pdnNTZXJ2ZXIudXBkYXRlTW9kYWwuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2FyZWEuc2VydmljZSc7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL2l2c1NlcnZlci5zZXJ2aWNlJztcclxuaW1wb3J0ICcuLi8uLi9jb21tb24vc2VydmljZXMvcHJveHlTZXJ2ZXIuc2VydmljZSc7XHJcbmltcG9ydCAnYW5ndWxhcic7XHJcblxyXG5pbXBvcnQge0lBcmVhU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJSXZzU2VydmVyU2VydmljZX0gZnJvbSBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9pdnNTZXJ2ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQge0lQcm94eVNlcnZlclNlcnZpY2V9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvcHJveHlTZXJ2ZXIuc2VydmljZVwiO1xyXG5pbXBvcnQge0lUcmVlRGF0YVBhcmFtcywgVHJlZURhdGFQYXJhbXN9IGZyb20gXCIuLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS1wYXJhbXNcIjtcclxuaW1wb3J0IHtJdnNTZXJ2ZXJFeH0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW50aXR5L2V4L0l2c1NlcnZlckV4XCI7XHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uLy4uL2NvcmUvZW51bS9FbnVtXCI7XHJcbmltcG9ydCB7UHJveHlTZXJ2ZXJ9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9Qcm94eVNlcnZlclwiO1xyXG5pbXBvcnQge0FyZWF9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2VudGl0eS9BcmVhXCI7XHJcbmltcG9ydCB7UmVzcG9uc2VSZXN1bHR9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3BhcmFtcy9yZXN1bHQvUmVzcG9uc2VSZXN1bHRcIjtcclxuaW1wb3J0IHtJdnNTZXJ2ZXJUeXBlfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnVtL0l2c1NlcnZlclR5cGVcIjtcclxuXHJcbmRlY2xhcmUgbGV0IGFuZ3VsYXI6IGFueTtcclxuXHJcblxyXG5jbGFzcyBJdnNTZXJ2ZXJVcGRhdGVNb2RhbENvbnRyb2xsZXJ7XHJcbiAgICBpc1VwZGF0ZTpib29sZWFuID0gZmFsc2U7XHJcbiAgICBjdXJyZW50U2VydmU6SXZzU2VydmVyRXg7XHJcblxyXG4gICAgLy8tLS0tLS0tc3RhcnQtLS0t5qCRIOe7k+aehCDmjqfku7Yg5Y+C5pWwXHJcbiAgICBhcmVhVHJlZURhdGFzOklUcmVlRGF0YVBhcmFtczxBcmVhRXg+O1xyXG5cclxuICAgIGl2c1NlcnZlclR5cGVMaXN0OkFycmF5PEVudW0+ID0gW107XHJcbiAgICBwcm94eVNlcnZlckxpc3Q6QXJyYXk8UHJveHlTZXJ2ZXI+ID0gW107XHJcbiAgICAvLy0tLS0tLS1lbmRcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCdwcm94eVNlcnZlclNlcnZpY2UnLCdpdnNTZXJ2ZXJTZXJ2aWNlJywnJHRpbWVvdXQnLCdhcmVhU2VydmljZSddO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOmFueSwgcHJpdmF0ZSBwcm94eVNlcnZlclNlcnZpY2U6SVByb3h5U2VydmVyU2VydmljZSwgcHJpdmF0ZSBpdnNTZXJ2ZXJTZXJ2aWNlOklJdnNTZXJ2ZXJTZXJ2aWNlLHByaXZhdGUgJHRpbWVvdXQ6YW55LHByaXZhdGUgYXJlYVNlcnZpY2U6SUFyZWFTZXJ2aWNlKXtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIOexu+Wei+mAieaLqVxyXG4gICAgICAgIGZvcihsZXQga2V5IGluIEl2c1NlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICB0aGlzLml2c1NlcnZlclR5cGVMaXN0LnB1c2goSXZzU2VydmVyVHlwZVtrZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/moJHnu5PmnoTlj4LmlbDliJ3lp4vljJZcclxuICAgICAgICAvL+WIneWni+WMliBhcmVhIOagkeaVsOaNrlxyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcyA9IG5ldyBUcmVlRGF0YVBhcmFtczxBcmVhRXg+KHRydWUpO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSWQgPSAnbW9kYWxBcmVhJztcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMub25DbGljayA9IHRyZWVTZWxlY3ROb2RlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSW5pdENvbXBsZXRlID0gdHJlZUluaXRDb21wbGV0ZTtcclxuXHJcbiAgICAgICAgLy8g5Yid5aeL5YyWIGN0cmwg5Lyg6L+H5p2l55qE5Y+C5pWwXHJcbiAgICAgICAgaWYodGhpcy4kc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMuaXNVcGRhdGUpe1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZSA9IHRoaXMuJHNjb3BlLnVwZGF0ZU1vZGFsUGFyYW1zLnVwZGF0ZU1vZGVsO1xyXG4gICAgICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMuZGVmYXVsdFNlbGVjdFRyZWVJZCA9IHRoaXMuY3VycmVudFNlcnZlLkFyZWFJRDtcclxuICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUgPSBuZXcgSXZzU2VydmVyRXgoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuQXJlYU1vZGVsID0gbmV3IEFyZWEoKTtcclxuICAgICAgICAgICAgaWYodGhpcy4kc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMuZGVmYXVsdERhdGFzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5kZWZhdWx0U2VsZWN0VHJlZUlkID0gdGhpcy4kc2NvcGUudXBkYXRlTW9kYWxQYXJhbXMuZGVmYXVsdERhdGFzLmFyZWFJZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5pc0RlZmF1bHRTZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBsZXQgc2VsZl90aGlzID0gdGhpcztcclxuICAgICAgICAkc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLplIDmr4HkuoblvLnlh7rmoYZcIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UHJveHlTZXJ2ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZSgpO1xyXG4gICAgICAgIC8vLS0tLS0tLS0tZW5kIC0tLS0tLVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0cmVlSW5pdENvbXBsZXRlKHRyZWVJZDpzdHJpbmcpe1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlbGVjdE5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYSkgIHtcclxuICAgICAgICAgICAgc2VsZl90aGlzLiR0aW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICBzZWxmX3RoaXMuc2V0SXZzU2VydmVyQXJlYSh0cmVlTm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlVHlwZVNlbGVjdCgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLnByb3h5U2VydmVyTGlzdCwodmFsOlByb3h5U2VydmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmN1cnJlbnRTZXJ2ZS5Qcm94eVNlcnZlcklEKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFNlcnZlLlBvcnQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHZhbC5JRCA9PT0gdGhpcy5jdXJyZW50U2VydmUuUHJveHlTZXJ2ZXJJRCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZS5Qb3J0ID0gdmFsLlBvcnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SXZzU2VydmVyQXJlYShhcmVhOkFyZWEpe1xyXG4gICAgICAgIHRoaXMuY3VycmVudFNlcnZlLkFyZWFNb2RlbCA9IG5ldyBBcmVhKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuQXJlYU1vZGVsLklEID0gYXJlYS5JRDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRTZXJ2ZS5BcmVhTW9kZWwuTmFtZSA9IGFyZWEuTmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5jdXJyZW50U2VydmUuQXJlYUlEID0gYXJlYS5JRDtcclxuICAgIH07XHJcblxyXG4gICAgY29tbWl0U2F2ZU9yVXBkYXRlKCl7XHJcbiAgICAgICAgbGV0IGNoZWNrU3RyID0gdGhpcy52YWxpZGF0ZVBhcmFtcyh0aGlzLmN1cnJlbnRTZXJ2ZSk7XHJcbiAgICAgICAgaWYoY2hlY2tTdHIpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFNlcnZlLklEKXtcclxuICAgICAgICAgICAgdGhpcy5pdnNTZXJ2ZXJTZXJ2aWNlLnVwZGF0ZSh0aGlzLmN1cnJlbnRTZXJ2ZSkudGhlbigocmVzcDphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVXBkYXRlTW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLml2c1NlcnZlclNlcnZpY2Uuc2F2ZSh0aGlzLmN1cnJlbnRTZXJ2ZSkudGhlbigocmVzcDphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwLmNvZGUgPT0gMjAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVXBkYXRlTW9kZWwodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG4gICAgY2xvc2VVcGRhdGVNb2RlbChpc0NvbW1pdDpib29sZWFuKXtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdCgnY2xvc2VTZXJ2ZXJVcGRhdGVNb2RlbCcse2lzQ29tbWl0OmlzQ29tbWl0fSk7XHJcbiAgICB9XHJcbiAgICAvLy0tLS0tLS0tLS0tLSBhcmVhVHJlZSBkYXRhXHJcbiAgICBnZXRBcmVhVHJlZShrZXl3b3JkPzpzdHJpbmcpe1xyXG4gICAgICAgIGxldCByZXFQYXJhbXMgPXtcclxuICAgICAgICAgIGtleXdvcmQ6JydcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmKGtleXdvcmQpe1xyXG4gICAgICAgICAgICByZXFQYXJhbXMua2V5d29yZCA9IGtleXdvcmQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzZWxmX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYXJlYVNlcnZpY2UuZmluZExpc3RUcmVlKHJlcVBhcmFtcykudGhlbigocmVzcDpBcnJheTxBcmVhRXg+KT0+e1xyXG4gICAgICAgICAgICBzZWxmX3RoaXMuc2V0TW9kYWxBcmVhVHJlZShyZXNwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmlLnlj5jmmL7npLogYXJlYVRyZWVcclxuICAgIGNoYW5nZUlzU2hvd0FyZWFUcmVlKCl7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmlzU2hvdyA9ICF0aGlzLmFyZWFUcmVlRGF0YXMuaXNTaG93O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFNlcnZlKTtcclxuICAgIH07XHJcbiAgICAvLy0tLS0tLS0tLS0tLSBhcmVhVHJlZSBkYXRhXHJcbiAgICBzZXRNb2RhbEFyZWFUcmVlKGRhdGE6QXJyYXk8QXJlYUV4Pil7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcyAgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFByb3h5U2VydmVyTGlzdCgpe1xyXG4gICAgICAgIHRoaXMucHJveHlTZXJ2ZXJTZXJ2aWNlLmZpbmRBbGwoKS50aGVuKChyZXNwOlJlc3BvbnNlUmVzdWx0PEFycmF5PFByb3h5U2VydmVyPj4pPT57XHJcbiAgICAgICAgICAgIGlmKHJlc3AuY29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm94eVNlcnZlckxpc3QgPSAgcmVzcC5kYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvL+mqjOivgeWtl+autemZkOWItu+8jOi/lOWbnuaPkOekuuivrVxyXG4gICAgdmFsaWRhdGVQYXJhbXMobW9kZWw6SXZzU2VydmVyRXgpOnN0cmluZ3tcclxuXHJcbiAgICAgICAgaWYoIW1vZGVsLkFyZWFNb2RlbCl7XHJcbiAgICAgICAgICAgIHJldHVybiAnQXJlYU1vZGVsJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLkNvZGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ0NvZGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuSXBBZGRyZXNzKXtcclxuICAgICAgICAgICAgcmV0dXJuICdJcEFkZHJlc3MnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbW9kZWwuTmFtZSl7XHJcbiAgICAgICAgICAgIHJldHVybiAnTmFtZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFtb2RlbC5Qb3J0KXtcclxuICAgICAgICAgICAgcmV0dXJuICdQb3J0JztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLlB3ZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAnUHdkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLlVpZCl7XHJcbiAgICAgICAgICAgIHJldHVybiAnVWlkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIW1vZGVsLlNlcnZlclR5cGUpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ1NlcnZlclR5cGUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG59XHJcbmFwcFxyXG4gICAgLmNvbnRyb2xsZXIoJ2l2c1NlcnZlclVwZGF0ZU1vZGFsQ29udHJvbGxlcicsIEl2c1NlcnZlclVwZGF0ZU1vZGFsQ29udHJvbGxlcik7Il19
