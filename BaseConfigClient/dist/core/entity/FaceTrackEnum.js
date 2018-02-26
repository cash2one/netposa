define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceTrackParams = (function () {
        function FaceTrackParams() {
            this.arrGender = [];
            this.imagePathList = [];
            this.arrCameraId = [];
            this.arrEyeGlasses = [];
            this.arrSunGlasses = [];
            this.arrSmile = [];
            this.arrMask = [];
            this.arrIsPants = [];
            this.arrIsSleeve = [];
        }
        return FaceTrackParams;
    }());
    exports.FaceTrackParams = FaceTrackParams;
    var Result = (function () {
        function Result() {
        }
        return Result;
    }());
    exports.Result = Result;
    var ResultTrack = (function () {
        function ResultTrack() {
        }
        return ResultTrack;
    }());
    exports.ResultTrack = ResultTrack;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9GYWNlVHJhY2tFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUdBO1FBQUE7WUFXSSxjQUFTLEdBQWtCLEVBQUUsQ0FBQztZQUM5QixrQkFBYSxHQUFtQyxFQUFFLENBQUM7WUFDbkQsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1lBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztZQUNsQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7WUFDbEMsYUFBUSxHQUFrQixFQUFFLENBQUM7WUFDN0IsWUFBTyxHQUFrQixFQUFFLENBQUM7WUFDNUIsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFDL0IsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBRXBDLENBQUM7UUFBRCxzQkFBQztJQUFELENBckJBLEFBcUJDLElBQUE7SUFyQlksMENBQWU7SUF1QjVCO1FBQUE7UUFJQSxDQUFDO1FBQUQsYUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksd0JBQU07SUFNbkI7UUFBQTtRQUlBLENBQUM7UUFBRCxrQkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksa0NBQVciLCJmaWxlIjoiY29yZS9lbnRpdHkvRmFjZVRyYWNrRW51bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2FtZXJhfSBmcm9tIFwiLi9DYW1lcmFcIjtcclxuaW1wb3J0IHtBY2Nlc3NMb2dNb2RlbH0gZnJvbSBcIi4vQWNjZXNzTG9nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFjZVRyYWNrUGFyYW1zIHtcclxuICAgIHN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgZW5kVGltZTogc3RyaW5nO1xyXG4gICAgYWdlOiBudW1iZXI7XHJcbiAgICBzZXg6IG51bWJlcjtcclxuICAgIHRocmVzaG9sZDogbnVtYmVyO1xyXG4gICAgd2VhckdsYXNzZXM6IG51bWJlcjtcclxuICAgIHdlYXJNYXNrOiBudW1iZXI7XHJcbiAgICBpbWFnZVBhdGg6IHN0cmluZztcclxuICAgIG1heEFnZTogbnVtYmVyO1xyXG4gICAgbWluQWdlOiBudW1iZXI7XHJcbiAgICBhcnJHZW5kZXI6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGltYWdlUGF0aExpc3Q6IEFycmF5PHtpZDpzdHJpbmcscGF0aDpzdHJpbmd9PiA9IFtdO1xyXG4gICAgYXJyQ2FtZXJhSWQ6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIGFyckV5ZUdsYXNzZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGFyclN1bkdsYXNzZXM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGFyclNtaWxlOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJNYXNrOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJJc1BhbnRzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJJc1NsZWV2ZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgdGFza0lkOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdCB7XHJcbiAgICBBY2Nlc3NMb2c6IEFjY2Vzc0xvZ01vZGVsO1xyXG4gICAgQ2FtZXJhOiBDYW1lcmE7XHJcbiAgICBTY29yZTpudW1iZXI7Ly/nm7jkvLzluqZcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlc3VsdFRyYWNrIHtcclxuICAgIFJlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIFRhc2tJZDogc3RyaW5nO1xyXG4gICAgVG90YWxDb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5cclxuIl19
