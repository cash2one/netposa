define(["require", "exports", "../../common/app/main.app", "css!./style/efResourceAlarmDetail.css"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EfResourceAlarmDetailController = (function () {
        function EfResourceAlarmDetailController($scope, $timeout, mylayer, layerDec) {
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.mylayer = mylayer;
            this.layerDec = layerDec;
            this.ShowAlarmStatus = false;
            this.actIndex = this.$scope.activeIndex;
            this.alarmdataList = this.$scope.alarmdataList;
            this.renderData = this.alarmdataList[this.actIndex];
            this.name = this.$scope.name;
        }
        EfResourceAlarmDetailController.prototype.changeTime = function () {
        };
        EfResourceAlarmDetailController.prototype.closePopup = function () {
            this.mylayer.close(this.$scope.index);
        };
        EfResourceAlarmDetailController.prototype.propeUp = function () {
            if (this.actIndex == 0) {
                this.layerDec.warnInfo("已是第一条数据！");
                return;
            }
            this.actIndex--;
            this.renderData = this.alarmdataList[this.actIndex];
        };
        EfResourceAlarmDetailController.prototype.propeDown = function () {
            if (this.actIndex == this.alarmdataList.length - 1) {
                this.layerDec.warnInfo('已是最后一条数据！');
                return;
            }
            this.actIndex++;
            this.renderData = this.alarmdataList[this.actIndex];
        };
        EfResourceAlarmDetailController.prototype.clickCollect = function (item) {
            this.$scope.$emit("clickCollect", item, this.actIndex);
        };
        EfResourceAlarmDetailController.prototype.clickSurveillance = function (item) {
            this.$scope.$emit("clickSurveillance", item, this.actIndex);
        };
        EfResourceAlarmDetailController.prototype.clickAnalysis = function (item) {
            this.$scope.$emit("clickAnalysis", item, this.actIndex);
        };
        EfResourceAlarmDetailController.$inject = ['$scope', '$timeout', 'mylayer', 'layerDec'];
        return EfResourceAlarmDetailController;
    }());
    main_app_1.app.controller('efResourceAlarmDetailController', EfResourceAlarmDetailController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvZWZSZXNvdXJjZVBvaW50L2VmUmVzb3VyY2VBbGFybURldGFpbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBVUkseUNBQ1ksTUFBVSxFQUNWLFFBQWtCLEVBQ2xCLE9BQVcsRUFDWCxRQUFZO1lBSFosV0FBTSxHQUFOLE1BQU0sQ0FBSTtZQUNWLGFBQVEsR0FBUixRQUFRLENBQVU7WUFDbEIsWUFBTyxHQUFQLE9BQU8sQ0FBSTtZQUNYLGFBQVEsR0FBUixRQUFRLENBQUk7WUFaeEIsb0JBQWUsR0FBWSxLQUFLLENBQUM7WUFjN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDO1FBRU0sb0RBQVUsR0FBakI7UUFFQSxDQUFDO1FBRU0sb0RBQVUsR0FBakI7WUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFNTSxpREFBTyxHQUFkO1lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxDQUFBO1lBQ1YsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFTSxtREFBUyxHQUFoQjtZQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQTtZQUNWLENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBTU0sc0RBQVksR0FBbkIsVUFBb0IsSUFBZ0I7WUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQU1NLDJEQUFpQixHQUF4QixVQUF5QixJQUFnQjtZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFNTSx1REFBYSxHQUFwQixVQUFxQixJQUFnQjtZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RCxDQUFDO1FBekVNLHVDQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxVQUFVLENBQUMsQ0FBQztRQTBFbEUsc0NBQUM7S0EzRUQsQUEyRUMsSUFBQTtJQUVELGNBQUcsQ0FBQyxVQUFVLENBQUMsaUNBQWlDLEVBQUUsK0JBQStCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvbWFwUG9pbnQvZWZSZXNvdXJjZVBvaW50L2VmUmVzb3VyY2VBbGFybURldGFpbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcbmltcG9ydCAnY3NzIS4vc3R5bGUvZWZSZXNvdXJjZUFsYXJtRGV0YWlsLmNzcyc7XHJcbmltcG9ydCB7IGVsZWN0cm9uaWMgfSBmcm9tICcuLi8uLi9yZXNvdXJjZVJldHJpZXZhbC9yZXNvdXJjZVJldHJpZXZhbEVudW0nO1xyXG5kZWNsYXJlIGxldCAkOiBhbnk7XHJcblxyXG5jbGFzcyBFZlJlc291cmNlQWxhcm1EZXRhaWxDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gWyckc2NvcGUnLCAnJHRpbWVvdXQnLCAnbXlsYXllcicsJ2xheWVyRGVjJ107XHJcbiAgICBTaG93QWxhcm1TdGF0dXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG5cclxuICAgIGFjdEluZGV4OiBudW1iZXI7XHJcbiAgICBhbGFybWRhdGFMaXN0OiBhbnk7XHJcbiAgICByZW5kZXJEYXRhOiBhbnk7XHJcbiAgICBuYW1lOnN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgJHNjb3BlOmFueSxcclxuICAgICAgICBwcml2YXRlICR0aW1lb3V0OiBGdW5jdGlvbixcclxuICAgICAgICBwcml2YXRlIG15bGF5ZXI6YW55LFxyXG4gICAgICAgIHByaXZhdGUgbGF5ZXJEZWM6YW55XHJcbiAgICApIHtcclxuICAgICAgICB0aGlzLmFjdEluZGV4ID0gdGhpcy4kc2NvcGUuYWN0aXZlSW5kZXg7XHJcbiAgICAgICAgdGhpcy5hbGFybWRhdGFMaXN0ID0gdGhpcy4kc2NvcGUuYWxhcm1kYXRhTGlzdDtcclxuICAgICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLmFsYXJtZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICAgICAgdGhpcy5uYW1lPXRoaXMuJHNjb3BlLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVRpbWUoKXtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUG9wdXAoKXtcclxuICAgICAgICB0aGlzLm15bGF5ZXIuY2xvc2UodGhpcy4kc2NvcGUuaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uIOS4iuS4gOadoe+8jOS4i+S4gOadoVxyXG4gICAgICogXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwcm9wZVVwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmFjdEluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5sYXllckRlYy53YXJuSW5mbyhcIuW3suaYr+esrOS4gOadoeaVsOaNru+8gVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWN0SW5kZXgtLTtcclxuICAgICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLmFsYXJtZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHByb3BlRG93bigpIHtcclxuICAgICAgICBpZiAodGhpcy5hY3RJbmRleCA9PSB0aGlzLmFsYXJtZGF0YUxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmxheWVyRGVjLndhcm5JbmZvKCflt7LmmK/mnIDlkI7kuIDmnaHmlbDmja7vvIEnKTtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWN0SW5kZXgrKztcclxuICAgICAgICB0aGlzLnJlbmRlckRhdGEgPSB0aGlzLmFsYXJtZGF0YUxpc3RbdGhpcy5hY3RJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb24g5pS26JeP5LiO5Y+W5raI5pS26JePXHJcbiAgICAgKiBAcGFyYW0gaXRlbVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2tDb2xsZWN0KGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQ29sbGVjdFwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDluIPmjqfkuI7lj5bmtojluIPmjqdcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja1N1cnZlaWxsYW5jZShpdGVtOiBlbGVjdHJvbmljKSB7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuJGVtaXQoXCJjbGlja1N1cnZlaWxsYW5jZVwiLCBpdGVtLCB0aGlzLmFjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjcmlwdGlvbiDliIbmnpBcclxuICAgICAqIEBwYXJhbSBpdGVtXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGlja0FuYWx5c2lzKGl0ZW06IGVsZWN0cm9uaWMpIHtcclxuICAgICAgICB0aGlzLiRzY29wZS4kZW1pdChcImNsaWNrQW5hbHlzaXNcIiwgaXRlbSwgdGhpcy5hY3RJbmRleCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcC5jb250cm9sbGVyKCdlZlJlc291cmNlQWxhcm1EZXRhaWxDb250cm9sbGVyJywgRWZSZXNvdXJjZUFsYXJtRGV0YWlsQ29udHJvbGxlcik7Il19
