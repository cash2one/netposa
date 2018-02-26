define(["require", "exports", "text!./alarm.face.popup.html", "../../app/main.app", "./alarm.face.popup.controller"], function (require, exports, alarmFacePopupHtml, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonAlarmFacePopupFactory = (function () {
        function CommonAlarmFacePopupFactory(layer) {
            this.layer = layer;
        }
        CommonAlarmFacePopupFactory.prototype.showPopup = function (parentScope, item) {
            var scope = parentScope.$new();
            scope.faceAlarmData = item;
            this.layer.open({
                type: 1,
                content: alarmFacePopupHtml,
                area: ["auto", "480px"],
                title: "人脸报警详情",
                scope: scope,
                end: function () {
                    scope.$destroy();
                    scope = null;
                }
            });
            parentScope = null;
        };
        CommonAlarmFacePopupFactory.$inject = ["layer"];
        return CommonAlarmFacePopupFactory;
    }());
    exports.CommonAlarmFacePopupFactory = CommonAlarmFacePopupFactory;
    main_app_1.app.service("commonAlarmFacePopup", CommonAlarmFacePopupFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL3BvcHVwL2FsYXJtRmFjZVBvcHVwL2FsYXJtLmZhY2UucG9wdXAuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQTtRQUVJLHFDQUFvQixLQUFVO1lBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUU5QixDQUFDO1FBRUQsK0NBQVMsR0FBVCxVQUFVLFdBQXlCLEVBQUUsSUFBMEI7WUFDM0QsSUFBSSxLQUFLLEdBQWtDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM5RCxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUUzQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDWixJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMzQixJQUFJLEVBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUN0QixLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLLEVBQUUsS0FBSztnQkFDWixHQUFHLEVBQUU7b0JBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUNqQixLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDO1FBckJNLG1DQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQXNCL0Isa0NBQUM7S0F2QkQsQUF1QkMsSUFBQTtJQXZCWSxrRUFBMkI7SUF3QnhDLGNBQUcsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsMkJBQTJCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvY29tbW9uL3BvcHVwL2FsYXJtRmFjZVBvcHVwL2FsYXJtLmZhY2UucG9wdXAuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8YW1kLWRlcGVuZGVuY3kgcGF0aD1cInRleHQhLi9hbGFybS5mYWNlLnBvcHVwLmh0bWxcIiBuYW1lPVwiYWxhcm1GYWNlUG9wdXBIdG1sXCIgLz5cclxuaW1wb3J0IHsgQW5ndWxhclNjb3BlIH0gZnJvbSAnLi4vLi4vdHlwZXMvYmFzZUFuZ3VsYXJTY29wZSc7XHJcbmltcG9ydCB7IGFwcCB9IGZyb20gJy4uLy4uL2FwcC9tYWluLmFwcCc7XHJcbmltcG9ydCBcIi4vYWxhcm0uZmFjZS5wb3B1cC5jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IFNlYXJjaEFsYXJtTG9nUmVzdWx0IH0gZnJvbSAnLi4vLi4vLi4vLi4vY29yZS9zZXJ2ZXIvQWxhcm1Nb2R1bGUnO1xyXG5pbXBvcnQgeyBBbGFybUZhY2VQb3B1cENvbnRyb2xsZXJQYXJhbXMgfSBmcm9tICcuL2FsYXJtLmZhY2UucG9wdXAuY29udHJvbGxlcic7XHJcbmRlY2xhcmUgbGV0IGFsYXJtRmFjZVBvcHVwSHRtbDogc3RyaW5nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbW1vbkFsYXJtRmFjZVBvcHVwRmFjdG9yeXtcclxuICAgIHN0YXRpYyAkaW5qZWN0ID0gW1wibGF5ZXJcIl07XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxheWVyOiBhbnkpe1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBzaG93UG9wdXAocGFyZW50U2NvcGU6IEFuZ3VsYXJTY29wZSwgaXRlbTogU2VhcmNoQWxhcm1Mb2dSZXN1bHQpe1xyXG4gICAgICAgIGxldCBzY29wZTpBbGFybUZhY2VQb3B1cENvbnRyb2xsZXJQYXJhbXMgPSBwYXJlbnRTY29wZS4kbmV3KCk7XHJcbiAgICAgICAgc2NvcGUuZmFjZUFsYXJtRGF0YSA9IGl0ZW07XHJcblxyXG4gICAgICAgIHRoaXMubGF5ZXIub3Blbih7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGFsYXJtRmFjZVBvcHVwSHRtbCxcclxuICAgICAgICAgICAgYXJlYTpbXCJhdXRvXCIsIFwiNDgwcHhcIl0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBcIuS6uuiEuOaKpeitpuivpuaDhVwiLFxyXG4gICAgICAgICAgICBzY29wZTogc2NvcGUsXHJcbiAgICAgICAgICAgIGVuZDogKCk9PntcclxuICAgICAgICAgICAgICAgIHNjb3BlLiRkZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICBzY29wZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBwYXJlbnRTY29wZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuYXBwLnNlcnZpY2UoXCJjb21tb25BbGFybUZhY2VQb3B1cFwiLCBDb21tb25BbGFybUZhY2VQb3B1cEZhY3RvcnkpOyJdfQ==
