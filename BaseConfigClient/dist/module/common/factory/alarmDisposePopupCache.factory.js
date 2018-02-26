define(["require", "exports", "../app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
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
    ;
    main_app_1.app.service('alarmPopupCache', AlarmPopupCache);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvYWxhcm1EaXNwb3NlUG9wdXBDYWNoZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWFDLENBQUM7SUFFRjtRQUFBO1lBQUEsaUJBV0M7WUFSVyxvQkFBZSxHQUFhLEtBQUssQ0FBQztZQUMxQyx1QkFBa0IsR0FBRyxVQUFDLEtBQWU7Z0JBQ2pDLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLENBQUMsQ0FBQztZQUNGLHVCQUFrQixHQUFHO2dCQUNqQixNQUFNLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDLENBQUM7UUFFTixDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQUFBLENBQUM7SUFDRixjQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFHLGVBQWUsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZS9jb21tb24vZmFjdG9yeS9hbGFybURpc3Bvc2VQb3B1cENhY2hlLmZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDIwMTcvOS8yOCAwMDI4LlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcC9tYWluLmFwcFwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFsYXJtUG9wdXBDYWNoZXtcclxuICAgIC8v5a2Y5YKo5b2T5YmN5piv5ZCm5omT5byA5oql6K2m5aSE55CG56qX5Y+jXHJcbiAgICBzZXRBbGFybVBvcHVwU3RhdGUgOiAoc3RhdGUgOiBCb29sZWFuKSA9PiB2b2lkO1xyXG4gICAgLy/ojrflj5blvZPliY3miqXorablpITnkIbnqpflj6PnmoTnirbmgIFcclxuICAgIGdldEFsYXJtUG9wdXBTdGF0ZSA6ICgpID0+IEJvb2xlYW47XHJcbn07XHJcblxyXG5jbGFzcyBBbGFybVBvcHVwQ2FjaGUgaW1wbGVtZW50cyBJQWxhcm1Qb3B1cENhY2hle1xyXG5cclxuICAgIC8v5a2Y5YKo5b2T5YmN5piv5ZCm5omT5byA5oql6K2m5aSE55CG56qX5Y+jXHJcbiAgICBwcml2YXRlIEFsYXJtUG9wdXBTdGF0ZSA6IEJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHNldEFsYXJtUG9wdXBTdGF0ZSA9IChzdGF0ZSA6IEJvb2xlYW4pID0+IHtcclxuICAgICAgICB0aGlzLkFsYXJtUG9wdXBTdGF0ZSA9IHN0YXRlO1xyXG4gICAgfTtcclxuICAgIGdldEFsYXJtUG9wdXBTdGF0ZSA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5BbGFybVBvcHVwU3RhdGU7XHJcbiAgICB9O1xyXG4gICAgLy8qKioqKioqKioqKioqXHJcbn07XHJcbmFwcC5zZXJ2aWNlKCdhbGFybVBvcHVwQ2FjaGUnICwgQWxhcm1Qb3B1cENhY2hlKTsiXX0=
