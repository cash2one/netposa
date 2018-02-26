define(["require", "exports", "../../common/app/main.app", "css!./style/efResourceAlarmDetail.css", "../../common/factory/layerMsg.factory"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EfResourceCollectDetailController = (function () {
        function EfResourceCollectDetailController($scope, $timeout, mylayer, layerDec) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.layerDec = layerDec;
            this.ShowAlarmStatus = false;
            this.actIndex = this.$scope.activeIndex;
            this.dataList = this.$scope.dataList;
            this.renderData = this.dataList[this.actIndex];
            this.name = this.$scope.name;
        }
        EfResourceCollectDetailController.prototype.closePopup = function () {
            this.mylayer.close(this.$scope.index);
        };
        EfResourceCollectDetailController.prototype.propeUp = function () {
            if (this.actIndex == 0) {
                this.layerDec.warnInfo("已是第一条数据！");
                return;
            }
            this.actIndex--;
            this.renderData = this.dataList[this.actIndex];
        };
        EfResourceCollectDetailController.prototype.propeDown = function () {
            if (this.actIndex == this.dataList.length - 1) {
                this.layerDec.warnInfo('已是最后一条数据！');
                return;
            }
            this.actIndex++;
            this.renderData = this.dataList[this.actIndex];
        };
        EfResourceCollectDetailController.prototype.clickCollect = function (item) {
            this.$scope.$emit("clickCollect", item, this.actIndex);
        };
        EfResourceCollectDetailController.prototype.clickSurveillance = function (item) {
            this.$scope.$emit("clickSurveillance", item, this.actIndex);
        };
        EfResourceCollectDetailController.prototype.clickAnalysis = function (item) {
            this.$scope.$emit("clickAnalysis", item, this.actIndex);
        };
        EfResourceCollectDetailController.$inject = ['$scope', '$timeout', 'mylayer', 'layerDec'];
        return EfResourceCollectDetailController;
    }());
    main_app_1.app.controller('efResourceCollectDetailController', EfResourceCollectDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvZWZSZXNvdXJjZVBvaW50L2VmUmVzb3VyY2VDb2xsZWN0RGV0YWlsLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBTUE7UUFTSSwyQ0FDWSxNQUFVLEVBQ1YsUUFBa0IsRUFDbEIsT0FBVyxFQUNYLFFBQVk7WUFIWixXQUFNLEdBQU4sTUFBTSxDQUFJO1lBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBVTtZQUNsQixZQUFPLEdBQVAsT0FBTyxDQUFJO1lBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBSTtZQVh4QixvQkFBZSxHQUFZLEtBQUssQ0FBQztZQWE3QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQy9CLENBQUM7UUFHTSxzREFBVSxHQUFqQjtZQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUtNLG1EQUFPLEdBQWQ7WUFDSSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVNLHFEQUFTLEdBQWhCO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRW5ELENBQUM7UUFNTSx3REFBWSxHQUFuQixVQUFvQixJQUFnQjtZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBTU0sNkRBQWlCLEdBQXhCLFVBQXlCLElBQWdCO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQU1NLHlEQUFhLEdBQXBCLFVBQXFCLElBQWdCO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFyRU0seUNBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBc0VsRSx3Q0FBQztLQXZFRCxBQXVFQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyxtQ0FBbUMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC9lZlJlc291cmNlUG9pbnQvZWZSZXNvdXJjZUNvbGxlY3REZXRhaWwuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL2VmUmVzb3VyY2VBbGFybURldGFpbC5jc3MnO1xyXG5pbXBvcnQgJy4uLy4uL2NvbW1vbi9mYWN0b3J5L2xheWVyTXNnLmZhY3RvcnknO1xyXG5pbXBvcnQgeyBlbGVjdHJvbmljIH0gZnJvbSAnLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWwvcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5cclxuY2xhc3MgRWZSZXNvdXJjZUNvbGxlY3REZXRhaWxDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllcicsJ2xheWVyRGVjJ107XHJcbiAgICBTaG93QWxhcm1TdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyRGF0YTogYW55O1xyXG4gICAgYWN0SW5kZXg6IG51bWJlcjtcclxuICAgIGRhdGFMaXN0OmFueTtcclxuICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IEZ1bmN0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgbXlsYXllcjphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzphbnlcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWN0SW5kZXggPSB0aGlzLiRzY29wZS5hY3RpdmVJbmRleDtcclxuICAgICAgICB0aGlzLmRhdGFMaXN0ID0gdGhpcy4kc2NvcGUuZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5kYXRhTGlzdFt0aGlzLmFjdEluZGV4XTtcclxuICAgICAgICB0aGlzLm5hbWU9dGhpcy4kc2NvcGUubmFtZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGNsb3NlUG9wdXAoKXtcclxuICAgICAgICB0aGlzLm15bGF5ZXIuY2xvc2UodGhpcy4kc2NvcGUuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5LiK5LiA5p2h77yM5LiL5LiA5p2hXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByb3BlVXAoKSB7XHJcbiAgICAgICAgaWYodGhpcy5hY3RJbmRleD09MCl7XHJcbiAgICAgICAgICAgIHRoaXMubGF5ZXJEZWMud2FybkluZm8oXCLlt7LmmK/nrKzkuIDmnaHmlbDmja7vvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3RJbmRleC0tO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb3BlRG93bigpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RJbmRleCA9PSB0aGlzLmRhdGFMaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn5bey5piv5pyA5ZCO5LiA5p2h5pWw5o2u77yBJyk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjdEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5kYXRhTGlzdFt0aGlzLmFjdEluZGV4XTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQ29sbGVjdFwiLCBpdGVtLHRoaXMuYWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOW4g+aOp+S4juWPlua2iOW4g+aOp1xyXG4gICAgICogQHBhcmFtIGl0ZW1cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsaWNrU3VydmVpbGxhbmNlKGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrU3VydmVpbGxhbmNlXCIsIGl0ZW0sdGhpcy5hY3RJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5YiG5p6QXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tBbmFseXNpcyhpdGVtOiBlbGVjdHJvbmljKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJjbGlja0FuYWx5c2lzXCIsIGl0ZW0sdGhpcy5hY3RJbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdlZlJlc291cmNlQ29sbGVjdERldGFpbENvbnRyb2xsZXInLCBFZlJlc291cmNlQ29sbGVjdERldGFpbENvbnRyb2xsZXIpOyJdfQ==
