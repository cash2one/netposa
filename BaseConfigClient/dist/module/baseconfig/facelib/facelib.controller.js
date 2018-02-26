define(["require", "exports", "../../common/app/main.app", "../../common/directive/tree/tree-params", "css!../css/baseconfig-face.css", "../../common/services/area.service", "../../common/filter/app.filter"], function (require, exports, main_app_1, tree_params_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceLibController = (function () {
        function FaceLibController($scope, $location, $state, $timeout, areaService) {
            this.$scope = $scope;
            this.$location = $location;
            this.$state = $state;
            this.$timeout = $timeout;
            this.areaService = areaService;
            this.areaTreeSearchInputStr = "";
            this.areaTreeDatas = new tree_params_1.TreeDataParams();
            this.areaTreeDatas.treeId = 'areaTreeFaceLib';
            this.areaTreeDatas.isDefaultSelected = true;
            this.areaTreeDatas.onClick = treeSelectNode;
            this.areaTreeDatas.treeInitComplete = treeInitComplete;
            var self_this = this;
            function treeSelectNode(event, treeId, treeNode) {
                $scope.areaTreeSelectedData = null;
                $scope.areaTreeSelectedData = treeNode;
                $scope.$broadcast('parentAreaSelectChange', treeNode);
                if ($state.current.name != "baseconfig.facelib.library") {
                    $state.go("baseconfig.facelib.library", { reload: true });
                }
            }
            function treeInitComplete() {
            }
            this.getAreaTreeList();
        }
        FaceLibController.prototype.getAreaTreeList = function (keyword) {
            var _this = this;
            var params = this.areaTreeDatas.reqParams;
            params.keyword = keyword;
            this.areaService.findListTree(params).then(function (resp) {
                if (resp) {
                    _this.areaTreeDatas.finishedNoData = false;
                }
                else {
                    _this.areaTreeDatas.finishedNoData = true;
                }
                _this.$timeout(function () {
                    _this.setAreaTreeDatas(resp);
                });
            });
        };
        ;
        FaceLibController.prototype.areaTreeSearchInputKeyUp = function (e) {
            if (e.keyCode === 13) {
                this.getAreaTreeList(this.areaTreeSearchInputStr);
            }
        };
        ;
        FaceLibController.prototype.areaTreeSearchInput = function () {
            this.getAreaTreeList(this.areaTreeSearchInputStr);
        };
        ;
        FaceLibController.prototype.setAreaTreeDatas = function (treeDatas) {
            this.areaTreeDatas.treeDatas = treeDatas;
        };
        ;
        FaceLibController.$inject = ['$scope', '$location', '$state', '$timeout', 'areaService'];
        return FaceLibController;
    }());
    main_app_1.app.controller('baseConfigFaceLibController', FaceLibController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvYmFzZWNvbmZpZy9mYWNlbGliL2ZhY2VsaWIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQU9JLDJCQUFvQixNQUFXLEVBQVUsU0FBYyxFQUFVLE1BQVcsRUFBVSxRQUFhLEVBQVUsV0FBeUI7WUFBbEgsV0FBTSxHQUFOLE1BQU0sQ0FBSztZQUFVLGNBQVMsR0FBVCxTQUFTLENBQUs7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFLO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBSztZQUFVLGdCQUFXLEdBQVgsV0FBVyxDQUFjO1lBRnRJLDJCQUFzQixHQUFXLEVBQUUsQ0FBQztZQUtoQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNEJBQWMsRUFBVSxDQUFDO1lBQ2xELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUM1QyxJQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1lBRXZELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztZQUVyQix3QkFBd0IsS0FBaUIsRUFBRSxNQUFjLEVBQUUsUUFBZ0I7Z0JBQ3ZFLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7Z0JBRW5DLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxVQUFVLENBQUMsd0JBQXdCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLDRCQUE0QixDQUFDLENBQUMsQ0FBQztvQkFDdEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO1lBQ0wsQ0FBQztZQUVEO1lBRUEsQ0FBQztZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBRUQsMkNBQWUsR0FBZixVQUFnQixPQUFnQjtZQUFoQyxpQkFhQztZQVpHLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQW1CO2dCQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLEtBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztnQkFDOUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixLQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzdDLENBQUM7Z0JBQ0QsS0FBSSxDQUFDLFFBQVEsQ0FBQztvQkFDVixLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO1FBQUEsQ0FBQztRQUVGLG9EQUF3QixHQUF4QixVQUF5QixDQUFNO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQztRQUFBLENBQUM7UUFFRiwrQ0FBbUIsR0FBbkI7WUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFBQSxDQUFDO1FBRUYsNENBQWdCLEdBQWhCLFVBQWlCLFNBQXdCO1lBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUM3QyxDQUFDO1FBQUEsQ0FBQztRQTVESyx5QkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBNkRsRix3QkFBQztLQTlERCxBQThEQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9iYXNlY29uZmlnL2ZhY2VsaWIvZmFjZWxpYi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXBwIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IFwiY3NzIS4uL2Nzcy9iYXNlY29uZmlnLWZhY2UuY3NzXCI7XHJcbmltcG9ydCBcIi4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9hcmVhLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IFRyZWVEYXRhUGFyYW1zIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9kaXJlY3RpdmUvdHJlZS90cmVlLXBhcmFtc1wiO1xyXG5pbXBvcnQgeyBBcmVhRXggfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvZXgvQXJlYUV4XCI7XHJcbmltcG9ydCB7IElBcmVhU2VydmljZSB9IGZyb20gXCIuLi8uLi9jb21tb24vc2VydmljZXMvYXJlYS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFRyZWVQYXJhbXMgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9wYXJhbXMvdHJlZS9UcmVlUGFyYW1zXCI7XHJcbmltcG9ydCAnLi4vLi4vY29tbW9uL2ZpbHRlci9hcHAuZmlsdGVyJztcclxuXHJcbmNsYXNzIEZhY2VMaWJDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJGxvY2F0aW9uJywgJyRzdGF0ZScsICckdGltZW91dCcsICdhcmVhU2VydmljZSddO1xyXG4gICAgLy9hcmVhIHRyZWVcclxuICAgIGFyZWFUcmVlRGF0YXM6IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD47XHJcbiAgICAvL3NlYXJjaFxyXG4gICAgYXJlYVRyZWVTZWFyY2hJbnB1dFN0cjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzY29wZTogYW55LCBwcml2YXRlICRsb2NhdGlvbjogYW55LCBwcml2YXRlICRzdGF0ZTogYW55LCBwcml2YXRlICR0aW1lb3V0OiBhbnksIHByaXZhdGUgYXJlYVNlcnZpY2U6IElBcmVhU2VydmljZSkge1xyXG4gICAgICAgIC8vIOagkeWIl+ihqOaVsOaNrlxyXG4gICAgICAgIC8v5Yid5aeL5YyWIGFyZWEg5qCR5pWw5o2uXHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzID0gbmV3IFRyZWVEYXRhUGFyYW1zPEFyZWFFeD4oKTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMudHJlZUlkID0gJ2FyZWFUcmVlRmFjZUxpYic7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmlzRGVmYXVsdFNlbGVjdGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFyZWFUcmVlRGF0YXMub25DbGljayA9IHRyZWVTZWxlY3ROb2RlO1xyXG4gICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy50cmVlSW5pdENvbXBsZXRlID0gdHJlZUluaXRDb21wbGV0ZTtcclxuXHJcbiAgICAgICAgbGV0IHNlbGZfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8g6IqC54K56YCJ5oupXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZVNlbGVjdE5vZGUoZXZlbnQ6IE1vdXNlRXZlbnQsIHRyZWVJZDogc3RyaW5nLCB0cmVlTm9kZTogQXJlYUV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5hcmVhVHJlZVNlbGVjdGVkRGF0YSA9IG51bGw7XHJcbiAgICAgICAgICAgIC8vaW5pdCByZXFfcGFyYW1zXHJcbiAgICAgICAgICAgICRzY29wZS5hcmVhVHJlZVNlbGVjdGVkRGF0YSA9IHRyZWVOb2RlO1xyXG4gICAgICAgICAgICAkc2NvcGUuJGJyb2FkY2FzdCgncGFyZW50QXJlYVNlbGVjdENoYW5nZScsIHRyZWVOb2RlKTtcclxuICAgICAgICAgICAgaWYgKCRzdGF0ZS5jdXJyZW50Lm5hbWUgIT0gXCJiYXNlY29uZmlnLmZhY2VsaWIubGlicmFyeVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oXCJiYXNlY29uZmlnLmZhY2VsaWIubGlicmFyeVwiLCB7IHJlbG9hZDogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJlZUluaXRDb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgLy8gIGNvbnNvbGUubG9nKFwi54i257qnIOagkeWIl+ihqOWKoOi9veWujOaIkC4uLi4uXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCgpO1xyXG4gICAgfVxyXG4gICAgLy8g5pWw5o2u6I635Y+WXHJcbiAgICBnZXRBcmVhVHJlZUxpc3Qoa2V5d29yZD86IHN0cmluZykge1xyXG4gICAgICAgIGxldCBwYXJhbXM6IFRyZWVQYXJhbXMgPSB0aGlzLmFyZWFUcmVlRGF0YXMucmVxUGFyYW1zO1xyXG4gICAgICAgIHBhcmFtcy5rZXl3b3JkID0ga2V5d29yZDtcclxuICAgICAgICB0aGlzLmFyZWFTZXJ2aWNlLmZpbmRMaXN0VHJlZShwYXJhbXMpLnRoZW4oKHJlc3A6IEFycmF5PEFyZWFFeD4pID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJlYVRyZWVEYXRhcy5maW5pc2hlZE5vRGF0YSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLmZpbmlzaGVkTm9EYXRhID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QXJlYVRyZWVEYXRhcyhyZXNwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH07XHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXRLZXlVcChlOiBhbnkpIHtcclxuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICB0aGlzLmdldEFyZWFUcmVlTGlzdCh0aGlzLmFyZWFUcmVlU2VhcmNoSW5wdXRTdHIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvLyDmoJHmkJzntKJcclxuICAgIGFyZWFUcmVlU2VhcmNoSW5wdXQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRBcmVhVHJlZUxpc3QodGhpcy5hcmVhVHJlZVNlYXJjaElucHV0U3RyKTtcclxuICAgIH07XHJcbiAgICAvLyDmoJHotYvlgLxcclxuICAgIHNldEFyZWFUcmVlRGF0YXModHJlZURhdGFzOiBBcnJheTxBcmVhRXg+KSB7XHJcbiAgICAgICAgdGhpcy5hcmVhVHJlZURhdGFzLnRyZWVEYXRhcyA9IHRyZWVEYXRhcztcclxuICAgIH07XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdiYXNlQ29uZmlnRmFjZUxpYkNvbnRyb2xsZXInLCBGYWNlTGliQ29udHJvbGxlcik7Il19
