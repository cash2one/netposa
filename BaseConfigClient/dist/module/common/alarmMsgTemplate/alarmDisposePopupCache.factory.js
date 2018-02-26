define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AlarmPopupCache = (function () {
        function AlarmPopupCache() {
            var _this = this;
            this.AlarmPopupState = false;
            this.setAlarmPopupState = function (state) {
                _this.AlarmPopupState = state;
            };
            this.getAlarmPopupState = function () {
                return _this.AlarmPopupState;
            };
        }
        return AlarmPopupCache;
    }());
    main_app_1.app.service('alarmPopupCache', AlarmPopupCache);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvYWxhcm1EaXNwb3NlUG9wdXBDYWNoZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVdBO1FBQUE7WUFBQSxpQkFhQztZQVZXLG9CQUFlLEdBQWEsS0FBSyxDQUFDO1lBQzFDLHVCQUFrQixHQUFHLFVBQUMsS0FBZTtnQkFDakMsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUFDO1lBQ0YsdUJBQWtCLEdBQUc7Z0JBQ2pCLE1BQU0sQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDO1lBQ2hDLENBQUMsQ0FBQztRQUlOLENBQUM7UUFBRCxzQkFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBQ0QsY0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRyxlQUFlLENBQUMsQ0FBQSIsImZpbGUiOiJtb2R1bGUvY29tbW9uL2FsYXJtTXNnVGVtcGxhdGUvYWxhcm1EaXNwb3NlUG9wdXBDYWNoZS5mYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwL21haW4uYXBwXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWxhcm1Qb3B1cENhY2hle1xyXG4gICAgLy/lrZjlgqjlvZPliY3mmK/lkKbmiZPlvIDmiqXorablpITnkIbnqpflj6NcclxuICAgIHNldEFsYXJtUG9wdXBTdGF0ZSA6IChzdGF0ZSA6IEJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgICAvL+iOt+WPluW9k+WJjeaKpeitpuWkhOeQhueql+WPo+eahOeKtuaAgVxyXG4gICAgZ2V0QWxhcm1Qb3B1cFN0YXRlIDogKCkgPT4gQm9vbGVhbjtcclxufVxyXG5cclxuY2xhc3MgQWxhcm1Qb3B1cENhY2hlIGltcGxlbWVudHMgSUFsYXJtUG9wdXBDYWNoZXtcclxuXHJcbiAgICAvL+WtmOWCqOW9k+WJjeaYr+WQpuaJk+W8gOaKpeitpuWkhOeQhueql+WPo1xyXG4gICAgcHJpdmF0ZSBBbGFybVBvcHVwU3RhdGUgOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgICBzZXRBbGFybVBvcHVwU3RhdGUgPSAoc3RhdGUgOiBCb29sZWFuKSA9PiB7XHJcbiAgICAgICAgdGhpcy5BbGFybVBvcHVwU3RhdGUgPSBzdGF0ZTtcclxuICAgIH07XHJcbiAgICBnZXRBbGFybVBvcHVwU3RhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQWxhcm1Qb3B1cFN0YXRlO1xyXG4gICAgfTtcclxuICAgIC8vKioqKioqKioqKioqKlxyXG5cclxuXHJcbn1cclxuYXBwLnNlcnZpY2UoJ2FsYXJtUG9wdXBDYWNoZScgLCBBbGFybVBvcHVwQ2FjaGUpIl19
