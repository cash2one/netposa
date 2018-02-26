define(["require", "exports", "../../../common/app/main.app", "../../../common/directive/tree/tree-params", "css!../../../IntelligentAnalysis/style/cameraPopup.css", "../../../common/services/connectTree.service", "../../../common/directive/tree/tree.directive.service"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AdvancedCameraPopup = (function () {
        function AdvancedCameraPopup($scope, $timeout, connectTreeService, treeService, layer) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.connectTreeService = connectTreeService;
            this.treeService = treeService;
            this.layer = layer;
            this.cacheSelCam = [];
            this.selNum = 0;
            this.initTreeParams();
            this.initTreeData();
        }
        AdvancedCameraPopup.prototype.initTreeData = function () {
            var _this = this;
            this.connectTreeService.findAreaCamera().then(function (datas) {
                _this.treeParams.treeDatas = datas;
            });
        };
        AdvancedCameraPopup.prototype.initTreeParams = function () {
            var _this = this;
            this.treeParams = new tree_params_1.TreeDataParams();
            this.treeParams.treeId = "cameraTree";
            this.searchStr = "";
            this.treeParams.onCheck = function (event, treeId, treeNode) {
                var checkedNodeList = _this.treeService.getCheckedNodes(_this.treeParams.treeId, true);
                _this.cacheSelCam = [];
                _this.$timeout(function () {
                    angular.forEach(checkedNodeList, function (node) {
                        node.treeType === 'camera' && _this.cacheSelCam.push(node);
                    });
                    _this.selNum = _this.cacheSelCam.length;
                });
            };
        };
        AdvancedCameraPopup.prototype.saveCamera = function () {
            var arr = [];
            this.cacheSelCam.forEach(function (item) {
                arr.push(item.ID);
            });
            this.$scope.$emit('close.camera.popup', arr);
        };
        ;
        AdvancedCameraPopup.prototype.addCache = function () {
            var _this = this;
            var paramsList = [];
            angular.forEach(this.$scope.selectCameraList, function (id, index) {
                paramsList.push({ key: 'ID', value: id });
            });
            this.treeService.checkNodesByParamsList(this.treeParams.treeId, paramsList, true);
            var checkedNodeList = this.treeService.getCheckedNodes(this.treeParams.treeId, true);
            this.$timeout(function () {
                angular.forEach(checkedNodeList, function (node) {
                    node.treeType === 'camera' && _this.cacheSelCam.push(node);
                });
                _this.selNum = _this.cacheSelCam.length;
            });
        };
        ;
        AdvancedCameraPopup.prototype.clearAll = function () {
            this.cacheSelCam = [];
            this.selNum = 0;
            this.treeService.checkAllNodes(this.treeParams.treeId, false);
        };
        ;
        AdvancedCameraPopup.prototype.cancelCamPop = function () {
            this.cacheSelCam = [];
            this.layer.closeAll();
        };
        ;
        AdvancedCameraPopup.prototype.removeChecked = function (node) {
            var _this = this;
            angular.forEach(this.cacheSelCam, function (camera, index) {
                camera.ID === node.ID && _this.cacheSelCam.splice(index, 1);
            });
            this.selNum > 0 && (this.selNum = this.selNum - 1);
        };
        ;
        AdvancedCameraPopup.prototype.onChangeSearch = function () {
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
        AdvancedCameraPopup.$inject = ['$scope', '$timeout', 'connectTreeService', 'treeDirectiveService', 'layer'];
        return AdvancedCameraPopup;
    }());
    main_app_1.app.controller("AdvancedCameraPopup", AdvancedCameraPopup);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkLmNhbWVyYS5wb3B1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFvQkE7UUFRSSw2QkFBb0IsTUFBVyxFQUNYLFFBQVksRUFDWixrQkFBdUMsRUFDdkMsV0FBa0MsRUFDbEMsS0FBVTtZQUpWLFdBQU0sR0FBTixNQUFNLENBQUs7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFJO1lBQ1osdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFxQjtZQUN2QyxnQkFBVyxHQUFYLFdBQVcsQ0FBdUI7WUFDbEMsVUFBSyxHQUFMLEtBQUssQ0FBSztZQVI5QixnQkFBVyxHQUFtQixFQUFFLENBQUM7WUFHakMsV0FBTSxHQUFVLENBQUMsQ0FBQztZQU1kLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUNPLDBDQUFZLEdBQXBCO1lBQUEsaUJBSUM7WUFIRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBeUI7Z0JBQ3BFLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFDTyw0Q0FBYyxHQUF0QjtZQUFBLGlCQWNDO1lBYkcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDRCQUFjLEVBQVUsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7WUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsVUFBQyxLQUFZLEVBQUUsTUFBYyxFQUFFLFFBQWE7Z0JBQ2xFLElBQUksZUFBZSxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFD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QUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFBLENBQUM7UUFHRiw0Q0FBYyxHQUFkO1lBQUEsaUJBTUM7WUFMRyxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUEsQ0FBQztnQkFBQSxNQUFNLENBQUE7WUFBQSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRixDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFBLENBQUM7UUFqRkssMkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsb0JBQW9CLEVBQUMsc0JBQXNCLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFrRi9GLDBCQUFDO0tBbkZELEFBbUZDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLG1CQUFtQixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL3Jlc291cmNlUmV0cmlldmFsL3NlYXJjaC9hZHZhbmNlZFNlYXJjaC9hZHZhbmNlZC5jYW1lcmEucG9wdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBrZXkgb24gMjAxNy82LzE1LlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4uLy4uLy4uL0ludGVsbGlnZW50QW5hbHlzaXMvc3R5bGUvY2FtZXJhUG9wdXAuY3NzJztcclxuXHJcbmltcG9ydCB7QXJlYUV4fSBmcm9tIFwiLi4vLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7Q2FtZXJhRXh9IGZyb20gXCIuLi8uLi8uLi8uLi9jb3JlL2VudGl0eS9leC9DYW1lcmFFeFwiO1xyXG5pbXBvcnQge1RyZWVEYXRhUGFyYW1zfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUtcGFyYW1zXCI7XHJcblxyXG4vLyDmnI3liqFcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ29ubmVjdFRyZWVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2Nvbm5lY3RUcmVlLnNlcnZpY2VcIjtcclxuaW1wb3J0IFwiLi4vLi4vLi4vY29tbW9uL2RpcmVjdGl2ZS90cmVlL3RyZWUuZGlyZWN0aXZlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHtJVHJlZURpcmVjdGl2ZVNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb21tb24vZGlyZWN0aXZlL3RyZWUvdHJlZS5kaXJlY3RpdmUuc2VydmljZVwiO1xyXG5cclxuZGVjbGFyZSBsZXQgYW5ndWxhcjogYW55O1xyXG5cclxudHlwZSBBcmVhQ2FtZXJhRXggPSBBcmVhRXggJiBDYW1lcmFFeDtcclxuXHJcbmNsYXNzIEFkdmFuY2VkQ2FtZXJhUG9wdXB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJywnJHRpbWVvdXQnLCdjb25uZWN0VHJlZVNlcnZpY2UnLCd0cmVlRGlyZWN0aXZlU2VydmljZScsJ2xheWVyJ107XHJcblxyXG4gICAgdHJlZVBhcmFtczogVHJlZURhdGFQYXJhbXM8QXJlYUV4PjtcclxuICAgIGNhY2hlU2VsQ2FtOkFycmF5PENhbWVyYUV4PiA9IFtdO1xyXG4gICAgY2FtZXJhVHJlZVBhcmFtczpUcmVlRGF0YVBhcmFtczxBcmVhQ2FtZXJhRXg+O1xyXG4gICAgc2VhcmNoU3RyOnN0cmluZztcclxuICAgIHNlbE51bTpudW1iZXIgPSAwO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc2NvcGU6IGFueSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6YW55LFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjb25uZWN0VHJlZVNlcnZpY2U6IElDb25uZWN0VHJlZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHRyZWVTZXJ2aWNlOiBJVHJlZURpcmVjdGl2ZVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGxheWVyOiBhbnkpe1xyXG4gICAgICAgIHRoaXMuaW5pdFRyZWVQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmluaXRUcmVlRGF0YSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0VHJlZURhdGEoKXtcclxuICAgICAgICB0aGlzLmNvbm5lY3RUcmVlU2VydmljZS5maW5kQXJlYUNhbWVyYSgpLnRoZW4oKGRhdGFzOkFycmF5PEFyZWFDYW1lcmFFeD4pPT57XHJcbiAgICAgICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlRGF0YXMgPSBkYXRhcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdFRyZWVQYXJhbXMoKXtcclxuICAgICAgICB0aGlzLnRyZWVQYXJhbXMgPSBuZXcgVHJlZURhdGFQYXJhbXM8QXJlYUV4PigpO1xyXG4gICAgICAgIHRoaXMudHJlZVBhcmFtcy50cmVlSWQgPSBcImNhbWVyYVRyZWVcIjtcclxuICAgICAgICB0aGlzLnNlYXJjaFN0ciA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50cmVlUGFyYW1zLm9uQ2hlY2sgPSAoZXZlbnQ6IEV2ZW50LCB0cmVlSWQ6IHN0cmluZywgdHJlZU5vZGU6IGFueSkgPT57XHJcbiAgICAgICAgICAgIGxldCBjaGVja2VkTm9kZUxpc3QgPSB0aGlzLnRyZWVTZXJ2aWNlLmdldENoZWNrZWROb2Rlcyh0aGlzLnRyZWVQYXJhbXMudHJlZUlkLHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjaGVja2VkTm9kZUxpc3QsKG5vZGU6YW55KT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudHJlZVR5cGUgPT09ICdjYW1lcmEnICYmIHRoaXMuY2FjaGVTZWxDYW0ucHVzaChub2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxOdW0gPSB0aGlzLmNhY2hlU2VsQ2FtLmxlbmd0aDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHNhdmVDYW1lcmEoKXtcclxuICAgICAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtLmZvckVhY2goKGl0ZW06Q2FtZXJhRXgpPT57XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0uSUQpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoJ2Nsb3NlLmNhbWVyYS5wb3B1cCcsYXJyKVxyXG4gICAgfTtcclxuICAgIGFkZENhY2hlKCl7XHJcbiAgICAgICAgbGV0IHBhcmFtc0xpc3QgPSBbXSBhcyBBcnJheTx7a2V5OnN0cmluZyx2YWx1ZTpzdHJpbmd9PjtcclxuICAgICAgICBhbmd1bGFyLmZvckVhY2godGhpcy4kc2NvcGUuc2VsZWN0Q2FtZXJhTGlzdCwoaWQ6c3RyaW5nLGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgcGFyYW1zTGlzdC5wdXNoKHtrZXk6J0lEJyx2YWx1ZTppZH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50cmVlU2VydmljZS5jaGVja05vZGVzQnlQYXJhbXNMaXN0KHRoaXMudHJlZVBhcmFtcy50cmVlSWQscGFyYW1zTGlzdCx0cnVlKTtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrZWROb2RlTGlzdCA9IHRoaXMudHJlZVNlcnZpY2UuZ2V0Q2hlY2tlZE5vZGVzKHRoaXMudHJlZVBhcmFtcy50cmVlSWQsdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNoZWNrZWROb2RlTGlzdCwobm9kZTphbnkpPT57XHJcbiAgICAgICAgICAgICAgICBub2RlLnRyZWVUeXBlID09PSAnY2FtZXJhJyAmJiB0aGlzLmNhY2hlU2VsQ2FtLnB1c2gobm9kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnNlbE51bSA9IHRoaXMuY2FjaGVTZWxDYW0ubGVuZ3RoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNsZWFyQWxsKCl7XHJcbiAgICAgICAgdGhpcy5jYWNoZVNlbENhbSA9IFtdO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID0gMDtcclxuICAgICAgICB0aGlzLnRyZWVTZXJ2aWNlLmNoZWNrQWxsTm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCxmYWxzZSlcclxuICAgIH07XHJcbiAgICBjYW5jZWxDYW1Qb3AoKXtcclxuICAgICAgICB0aGlzLmNhY2hlU2VsQ2FtID0gW107XHJcbiAgICAgICAgdGhpcy5sYXllci5jbG9zZUFsbCgpO1xyXG4gICAgfTtcclxuICAgIHJlbW92ZUNoZWNrZWQgKG5vZGU6Q2FtZXJhRXgpe1xyXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh0aGlzLmNhY2hlU2VsQ2FtLChjYW1lcmE6YW55LGluZGV4Om51bWJlcik9PntcclxuICAgICAgICAgICAgY2FtZXJhLklEID09PSBub2RlLklEICYmIHRoaXMuY2FjaGVTZWxDYW0uc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2VsTnVtID4gMCAmJiAodGhpcy5zZWxOdW0gPSB0aGlzLnNlbE51bS0xKTtcclxuICAgIH07XHJcbiAgICAvL+aQnOe0ouahhuaUueWPmFxyXG5cclxuICAgIG9uQ2hhbmdlU2VhcmNoKCk6Ym9vbGVhbntcclxuICAgICAgICBpZighdGhpcy50cmVlUGFyYW1zLnRyZWVEYXRhcyl7cmV0dXJufVxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgdGhpcy50cmVlU2VydmljZS5maWx0ZXJTaG93Tm9kZXModGhpcy50cmVlUGFyYW1zLnRyZWVJZCxcIk5hbWVcIix0aGlzLnNlYXJjaFN0cik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9O1xyXG59XHJcblxyXG5hcHAuY29udHJvbGxlcihcIkFkdmFuY2VkQ2FtZXJhUG9wdXBcIiwgQWR2YW5jZWRDYW1lcmFQb3B1cCk7Il19
