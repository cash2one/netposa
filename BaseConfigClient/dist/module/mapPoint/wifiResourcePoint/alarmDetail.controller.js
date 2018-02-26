define(["require", "exports", "../../common/app/main.app", "css!./style/tplAlarmDetail.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmDetailController = (function () {
        function AlarmDetailController($scope, $timeout, mylayer, layerDec) {
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
        AlarmDetailController.prototype.lastClick = function () {
            if (this.actIndex == 0) {
                this.layerDec.warnInfo("已是第一条数据！");
                return;
            }
            this.actIndex--;
            this.renderData = this.dataList[this.actIndex];
        };
        AlarmDetailController.prototype.nextClick = function () {
            if (this.actIndex == this.dataList - 1) {
                this.layerDec.warnInfo('已是最后一条数据！');
                return;
            }
            this.actIndex++;
            this.renderData = this.dataList[this.actIndex];
        };
        AlarmDetailController.prototype.changeTime = function () {
        };
        AlarmDetailController.prototype.closePopup = function () {
            this.mylayer.close(this.$scope.index);
        };
        AlarmDetailController.prototype.clickCollect = function (item) {
            this.$scope.$emit("clickCollect", item, this.actIndex);
        };
        AlarmDetailController.prototype.clickSurveillance = function (item) {
            this.$scope.$emit("clickSurveillance", item, this.actIndex);
        };
        AlarmDetailController.prototype.clickAnalysis = function (item) {
            this.$scope.$emit("clickAnalysis", item, this.actIndex);
        };
        AlarmDetailController.$inject = ['$scope', '$timeout', 'mylayer', 'layerDec'];
        return AlarmDetailController;
    }());
    main_app_1.app.controller('alarmDetailController', AlarmDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaVJlc291cmNlUG9pbnQvYWxhcm1EZXRhaWwuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFVQTtRQVVJLCtCQUNZLE1BQVUsRUFDVixRQUFrQixFQUNsQixPQUFXLEVBQ1gsUUFBYTtZQUhiLFdBQU0sR0FBTixNQUFNLENBQUk7WUFDVixhQUFRLEdBQVIsUUFBUSxDQUFVO1lBQ2xCLFlBQU8sR0FBUCxPQUFPLENBQUk7WUFDWCxhQUFRLEdBQVIsUUFBUSxDQUFLO1lBWnpCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1lBTWpDLFNBQUksR0FBUyxFQUFFLENBQUE7WUFRWCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRS9CLENBQUM7UUFFTSx5Q0FBUyxHQUFoQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBRTtZQUNaLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBR00seUNBQVMsR0FBaEI7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRU0sMENBQVUsR0FBakI7UUFFQSxDQUFDO1FBRU0sMENBQVUsR0FBakI7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFLTSw0Q0FBWSxHQUFuQixVQUFvQixJQUFVO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFNTSxpREFBaUIsR0FBeEIsVUFBeUIsSUFBVTtZQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFNTSw2Q0FBYSxHQUFwQixVQUFxQixJQUFVO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUF0RU0sNkJBQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1FBdUVsRSw0QkFBQztLQXhFRCxBQXdFQyxJQUFBO0lBRUQsY0FBRyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC93aWZpUmVzb3VyY2VQb2ludC9hbGFybURldGFpbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvdHBsQWxhcm1EZXRhaWwuY3NzJztcclxuLy8gd2lmaeWOhuWPsuajgOe0ouaVsOaNrlxyXG5pbXBvcnQge1xyXG4gICAgd2lmaSxcclxuICAgIENvbGxlY3RBZGRQYXJhbXMsXHJcbiAgICBDb2xsZWN0RGVsZXRlUGFyYW1zXHJcbn0gZnJvbSAnLi4vLi4vcmVzb3VyY2VSZXRyaWV2YWwvcmVzb3VyY2VSZXRyaWV2YWxFbnVtJztcclxuZGVjbGFyZSBsZXQgJDogYW55O1xyXG5cclxuY2xhc3MgQWxhcm1EZXRhaWxDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllcicsJ2xheWVyRGVjJ107XHJcbiAgICBTaG93QWxhcm1TdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgICAgIHJlbmRlckRhdGE6IGFueTtcclxuICAgIGFjdEluZGV4OiBudW1iZXI7XHJcbiAgICBkYXRhTGlzdDogYW55O1xyXG4gICAgbmFtZSA6c3RyaW5nPScnXHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6YW55LFxyXG4gICAgICAgIHByaXZhdGUgJHRpbWVvdXQ6IEZ1bmN0aW9uLFxyXG4gICAgICAgIHByaXZhdGUgbXlsYXllcjphbnksXHJcbiAgICAgICAgcHJpdmF0ZSBsYXllckRlYzogYW55XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmFjdEluZGV4ID0gdGhpcy4kc2NvcGUuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5kYXRhTGlzdCA9IHRoaXMuJHNjb3BlLmRhdGFMaXN0O1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICAgICAgdGhpcy5uYW1lPXRoaXMuJHNjb3BlLm5hbWU7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXN0Q2xpY2soKXtcclxuICAgICAgICBpZiAodGhpcy5hY3RJbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbyhcIuW3suaYr+esrOS4gOadoeaVsOaNru+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3RJbmRleC0tO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBuZXh0Q2xpY2soKXtcclxuICAgICAgICBpZiAodGhpcy5hY3RJbmRleCA9PSB0aGlzLmRhdGFMaXN0LTEpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbygn5bey5piv5pyA5ZCO5LiA5p2h5pWw5o2u77yBJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hY3RJbmRleCsrO1xyXG4gICAgICAgIHRoaXMucmVuZGVyRGF0YSA9IHRoaXMuZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVRpbWUoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUG9wdXAoKXtcclxuICAgICAgICB0aGlzLm15bGF5ZXIuY2xvc2UodGhpcy4kc2NvcGUuaW5kZXgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IHdpZmkpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQ29sbGVjdFwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiB3aWZpKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJjbGlja1N1cnZlaWxsYW5jZVwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IHdpZmkpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQW5hbHlzaXNcIiwgaXRlbSwgdGhpcy5hY3RJbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdhbGFybURldGFpbENvbnRyb2xsZXInLCBBbGFybURldGFpbENvbnRyb2xsZXIpOyJdfQ==
