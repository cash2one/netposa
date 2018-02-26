define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CuteInfo = (function () {
        function CuteInfo() {
        }
        return CuteInfo;
    }());
    exports.CuteInfo = CuteInfo;
    var DBMatchFacePoint = (function () {
        function DBMatchFacePoint() {
        }
        return DBMatchFacePoint;
    }());
    exports.DBMatchFacePoint = DBMatchFacePoint;
    var MarkInfo = (function () {
        function MarkInfo() {
        }
        return MarkInfo;
    }());
    exports.MarkInfo = MarkInfo;
    var DetectFaceParams = (function () {
        function DetectFaceParams() {
        }
        return DetectFaceParams;
    }());
    exports.DetectFaceParams = DetectFaceParams;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9TZWFyY2hGYWNlUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQU1BO1FBQUE7UUFTQSxDQUFDO1FBQUQsZUFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksNEJBQVE7SUFZckI7UUFBQTtRQUtBLENBQUM7UUFBRCx1QkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksNENBQWdCO0lBUTdCO1FBQUE7UUFxQkEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQXJCQSxBQXFCQyxJQUFBO0lBckJZLDRCQUFRO0lBd0JyQjtRQUFBO1FBbUJBLENBQUM7UUFBRCx1QkFBQztJQUFELENBbkJBLEFBbUJDLElBQUE7SUFuQlksNENBQWdCIiwiZmlsZSI6ImNvcmUvcGFyYW1zL1NlYXJjaEZhY2VQYXJhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog54m55b6B5o+Q5Y+W5Y+C5pWw5a+56LGhLlxyXG4gKiBjcmVhdGUgYnkgem1wLlxyXG4gKiBAdGltZTogMjAxNy0wOS0wMVxyXG4gKi9cclxuLy8g5Zu+54mH6KOB5Ymq5L+h5oGvXHJcbmV4cG9ydCBjbGFzcyBDdXRlSW5mbyB7XHJcblxyXG4gICAgbGVmdDogbnVtYmVyO1xyXG5cclxuICAgIHRvcDogbnVtYmVyO1xyXG5cclxuICAgIHJpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgYm90dG9tOiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIOS6uuiEuOagh+WumuWdkOagh+S/oeaBr1xyXG5leHBvcnQgY2xhc3MgREJNYXRjaEZhY2VQb2ludCB7XHJcblxyXG4gICAgeDogbnVtYmVyO1xyXG5cclxuICAgIHk6IG51bWJlcjtcclxufVxyXG5cclxuLy8g5Lq66IS45qCH5a6a5a+56LGhXHJcbmV4cG9ydCBjbGFzcyBNYXJrSW5mbyB7XHJcbiAgICAvLyDnnLznnZtcclxuICAgIGxlZnRleWU6IERCTWF0Y2hGYWNlUG9pbnQ7XHJcblxyXG4gICAgcmlnaHRleWU6IERCTWF0Y2hGYWNlUG9pbnQ7XHJcblxyXG4gICAgLy8g6by75a2QXHJcbiAgICBub3NlOiBEQk1hdGNoRmFjZVBvaW50O1xyXG5cclxuICAgIC8vIOWYtOWUh1xyXG4gICAgbW91dGhsZWZ0OiBEQk1hdGNoRmFjZVBvaW50O1xyXG5cclxuICAgIG1vdXRocmlnaHQ6IERCTWF0Y2hGYWNlUG9pbnQ7XHJcblxyXG4gICAgdG9wOiBudW1iZXI7XHJcblxyXG4gICAgbGVmdDogbnVtYmVyO1xyXG5cclxuICAgIGJvdHRvbTogbnVtYmVyO1xyXG5cclxuICAgIHJpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIOS6uuiEuOeJueW+geaPkOWPluWPguaVsFxyXG5leHBvcnQgY2xhc3MgRGV0ZWN0RmFjZVBhcmFtcyB7XHJcblxyXG4gICAgLy8g5qOA57Si57G75Z6LXHJcbiAgICBkZXRlY3RUeXBlOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5ZG95Luk57G75Z6LXHJcbiAgICBjb21tYW5kVHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8vIOeFp+eJh1VSTOWcsOWdgFxyXG4gICAgaW1hZ2V1cmw6IHN0cmluZztcclxuXHJcbiAgICAvLyDnhafniYdCQVNFNjTnvJbnoIHlrZfnrKbkuLJcclxuICAgIGltYWdlZGF0YTogc3RyaW5nO1xyXG5cclxuICAgIC8vIOeFp+eJh+ijgeWJquS/oeaBr1xyXG4gICAgY3V0SW5mbzogQ3V0ZUluZm87XHJcbiAgICBcclxuICAgIC8vIOS6uuiEuOagh+WumuS/oeaBr1xyXG4gICAgbWFya0luZm86IE1hcmtJbmZvO1xyXG59Il19
