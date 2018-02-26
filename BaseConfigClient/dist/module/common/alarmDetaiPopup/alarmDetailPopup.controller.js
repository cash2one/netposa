define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmDetailPopupController = (function () {
        function AlarmDetailPopupController($scope) {
            var _this = this;
            this.$scope = $scope;
            this.dealAlarm = function (dealType) {
                console.log(dealType ? "有效" : "无效");
                _this.$scope.closePopup(dealType);
            };
            this.vehicleAlarmLog = $scope.popupDatas;
        }
        AlarmDetailPopupController.$inject = ['$scope'];
        return AlarmDetailPopupController;
    }());
    main_app_1.app.controller('alarmDetailPopupController', AlarmDetailPopupController);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtRGV0YWlQb3B1cC9hbGFybURldGFpbFBvcHVwLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0E7UUFJSSxvQ0FBb0IsTUFBb0M7WUFBeEQsaUJBRUM7WUFGbUIsV0FBTSxHQUFOLE1BQU0sQ0FBOEI7WUFVeEQsY0FBUyxHQUFHLFVBQUMsUUFBZ0I7Z0JBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxLQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyQyxDQUFDLENBQUE7WUFaRyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDN0MsQ0FBQztRQUxNLGtDQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQWlCaEMsaUNBQUM7S0FsQkQsQUFrQkMsSUFBQTtJQUdELGNBQUcsQ0FBQyxVQUFVLENBQUMsNEJBQTRCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2FsYXJtRGV0YWlQb3B1cC9hbGFybURldGFpbFBvcHVwLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2FwcH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hcHAvbWFpbi5hcHBcIjtcclxuaW1wb3J0IHtDb21tb25BbGFybURldGFpbFBvcHVwUGFyYW1zfSBmcm9tIFwiLi9hbGFybURldGFpbFBvcHVwLmZhY3RvcnlcIjtcclxuaW1wb3J0IHtWZWhpY2xlQWxhcm1Mb2d9IGZyb20gXCIuLi8uLi8uLi9jb3JlL3NlcnZlci9BbGFybU1vZHVsZVwiO1xyXG5jbGFzcyBBbGFybURldGFpbFBvcHVwQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgdmVoaWNsZUFsYXJtTG9nOlZlaGljbGVBbGFybUxvZztcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHNjb3BlOiBDb21tb25BbGFybURldGFpbFBvcHVwUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy52ZWhpY2xlQWxhcm1Mb2cgPSAkc2NvcGUucG9wdXBEYXRhcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmiqXorablpITnkIbngrnlh7tcclxuICAgICAqIEB0aW1lOiAyMDE3LTExLTMwIDE1OjIyOjIwXHJcbiAgICAgKiBAcGFyYW1zOiBkZWFsVHlwZSDlpITnkIbnu5PmnpzvvIzmnInml6DmlYjmnpxcclxuICAgICAqIEByZXR1cm46XHJcbiAgICAgKi9cclxuICAgIGRlYWxBbGFybSA9IChkZWFsVHlwZTpib29sZWFuKT0+e1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRlYWxUeXBlP1wi5pyJ5pWIXCI6XCLml6DmlYhcIik7XHJcbiAgICAgICAgdGhpcy4kc2NvcGUuY2xvc2VQb3B1cChkZWFsVHlwZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hcHAuY29udHJvbGxlcignYWxhcm1EZXRhaWxQb3B1cENvbnRyb2xsZXInLCBBbGFybURldGFpbFBvcHVwQ29udHJvbGxlcik7XHJcbiJdfQ==
