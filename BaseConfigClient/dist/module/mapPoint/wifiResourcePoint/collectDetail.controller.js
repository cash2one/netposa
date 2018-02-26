define(["require", "exports", "../../common/app/main.app", "css!./style/tplCollectDetail.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CollectDetailController = (function () {
        function CollectDetailController($scope, $timeout, mylayer, layerDec) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.layerDec = layerDec;
            this.ShowAlarmStatus = false;
            this.name = '';
            this.actIndex = this.$scope.activeIndex;
            this.dataList = this.$scope.dataList;
            this.renderData = this.dataList[this.actIndex];
            this.name = this.$scope.name;
        }
        CollectDetailController.prototype.closePopup = function () {
            this.mylayer.close(this.$scope.index);
        };
        CollectDetailController.prototype.propeUp = function () {
            if (this.actIndex == 0) {
                this.layerDec.warnInfo("已是第一条数据！");
                return;
            }
            this.actIndex--;
            this.renderData = this.dataList[this.actIndex];
        };
        CollectDetailController.prototype.propeDown = function () {
            if (this.actIndex == this.dataList.length - 1) {
                this.layerDec.warnInfo('已是最后一条数据！');
                return;
            }
            this.actIndex++;
            this.renderData = this.dataList[this.actIndex];
        };
        CollectDetailController.prototype.clickCollect = function (item) {
            this.$scope.$emit("clickCollect", item, this.actIndex);
        };
        CollectDetailController.prototype.clickSurveillance = function (item) {
            this.$scope.$emit("clickSurveillance", item, this.actIndex);
        };
        CollectDetailController.prototype.clickAnalysis = function (item) {
            this.$scope.$emit("clickAnalysis", item, this.actIndex);
        };
        CollectDetailController.$inject = ['$scope', '$timeout', 'mylayer', 'layerDec'];
        return CollectDetailController;
    }());
    main_app_1.app.controller('collectDetailController', CollectDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvY29sbGVjdERldGFpbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBU0ksaUNBQ1ksTUFBVSxFQUNWLFFBQWtCLEVBQ2xCLE9BQVcsRUFDWCxRQUFhO1lBSGIsV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUNWLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBSTtZQUNYLGFBQVEsR0FBUixRQUFRLENBQUs7WUFYekIsb0JBQWUsR0FBWSxLQUFLLENBQUM7WUFNakMsU0FBSSxHQUFTLEVBQUUsQ0FBQztZQU9aLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDL0IsQ0FBQztRQUVNLDRDQUFVLEdBQWpCO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBS00seUNBQU8sR0FBZDtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRU0sMkNBQVMsR0FBaEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUE7WUFDVixDQUFDO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkQsQ0FBQztRQU1NLDhDQUFZLEdBQW5CLFVBQW9CLElBQVU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQU1NLG1EQUFpQixHQUF4QixVQUF5QixJQUFVO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQU1NLCtDQUFhLEdBQXBCLFVBQXFCLElBQVU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQXBFTSwrQkFBTyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUM7UUFxRWxFLDhCQUFDO0tBdEVELEFBc0VDLElBQUE7SUFFRCxjQUFHLENBQUMsVUFBVSxDQUFDLHlCQUF5QixFQUFFLHVCQUF1QixDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL21hcFBvaW50L3dpZmlSZXNvdXJjZVBvaW50L2NvbGxlY3REZXRhaWwuY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vLi4vY29tbW9uL2FwcC9tYWluLmFwcFwiO1xyXG5pbXBvcnQgJ2NzcyEuL3N0eWxlL3RwbENvbGxlY3REZXRhaWwuY3NzJztcclxuaW1wb3J0IHsgd2lmaSB9IGZyb20gJy4uLy4uL3Jlc291cmNlUmV0cmlldmFsL3Jlc291cmNlUmV0cmlldmFsRW51bSc7XHJcbmRlY2xhcmUgbGV0ICQ6IGFueTtcclxuXHJcbmNsYXNzIENvbGxlY3REZXRhaWxDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllcicsJ2xheWVyRGVjJ107XHJcbiAgICBTaG93QWxhcm1TdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgcmVuZGVyRGF0YTogYW55O1xyXG4gICAgYWN0SW5kZXg6IG51bWJlcjtcclxuICAgIGRhdGFMaXN0OiBhbnk7XHJcbiAgICBuYW1lIDpzdHJpbmc9Jyc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICRzY29wZTphbnksXHJcbiAgICAgICAgcHJpdmF0ZSAkdGltZW91dDogRnVuY3Rpb24sXHJcbiAgICAgICAgcHJpdmF0ZSBteWxheWVyOmFueSxcclxuICAgICAgICBwcml2YXRlIGxheWVyRGVjOiBhbnlcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuYWN0SW5kZXggPSB0aGlzLiRzY29wZS5hY3RpdmVJbmRleDtcclxuICAgICAgICB0aGlzLmRhdGFMaXN0ID0gdGhpcy4kc2NvcGUuZGF0YUxpc3Q7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5kYXRhTGlzdFt0aGlzLmFjdEluZGV4XTtcclxuICAgICAgICB0aGlzLm5hbWU9dGhpcy4kc2NvcGUubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICB0aGlzLm15bGF5ZXIuY2xvc2UodGhpcy4kc2NvcGUuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5LiK5LiA5p2h77yM5LiL5LiA5p2hXHJcbiAgICAgKiBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHByb3BlVXAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0SW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKFwi5bey5piv56ys5LiA5p2h5pWw5o2u77yBXCIpO1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3RJbmRleC0tO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb3BlRG93bigpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RJbmRleCA9PSB0aGlzLmRhdGFMaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn5bey5piv5pyA5ZCO5LiA5p2h5pWw5o2u77yBJyk7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjdEluZGV4Kys7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJEYXRhID0gdGhpcy5kYXRhTGlzdFt0aGlzLmFjdEluZGV4XTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IHdpZmkpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQ29sbGVjdFwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiB3aWZpKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJjbGlja1N1cnZlaWxsYW5jZVwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IHdpZmkpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQW5hbHlzaXNcIiwgaXRlbSwgdGhpcy5hY3RJbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdjb2xsZWN0RGV0YWlsQ29udHJvbGxlcicsIENvbGxlY3REZXRhaWxDb250cm9sbGVyKTsiXX0=
