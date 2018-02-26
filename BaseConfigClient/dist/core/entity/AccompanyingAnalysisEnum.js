var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AccompanyingAnalysis = (function () {
        function AccompanyingAnalysis() {
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
        return AccompanyingAnalysis;
    }());
    exports.AccompanyingAnalysis = AccompanyingAnalysis;
    var Result = (function () {
        function Result() {
        }
        return Result;
    }());
    exports.Result = Result;
    var AccompanyingAnalysisResult = (function () {
        function AccompanyingAnalysisResult() {
        }
        return AccompanyingAnalysisResult;
    }());
    exports.AccompanyingAnalysisResult = AccompanyingAnalysisResult;
    var AccessLogOrderModel = (function () {
        function AccessLogOrderModel() {
        }
        return AccessLogOrderModel;
    }());
    exports.AccessLogOrderModel = AccessLogOrderModel;
    var ModelRes = (function () {
        function ModelRes() {
        }
        return ModelRes;
    }());
    exports.ModelRes = ModelRes;
    var AccessLogModel = (function (_super) {
        __extends(AccessLogModel, _super);
        function AccessLogModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AccessLogModel;
    }(ModelRes));
    exports.AccessLogModel = AccessLogModel;
    var wifiResult = (function () {
        function wifiResult() {
        }
        return wifiResult;
    }());
    exports.wifiResult = wifiResult;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9BY2NvbXBhbnlpbmdBbmFseXNpc0VudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUNBO1FBQUE7WUFXSSxjQUFTLEdBQWtCLEVBQUUsQ0FBQztZQUM5QixrQkFBYSxHQUFtQyxFQUFFLENBQUM7WUFDbkQsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1lBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztZQUNsQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7WUFDbEMsYUFBUSxHQUFrQixFQUFFLENBQUM7WUFDN0IsWUFBTyxHQUFrQixFQUFFLENBQUM7WUFDNUIsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFDL0IsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBTXBDLENBQUM7UUFBRCwyQkFBQztJQUFELENBekJBLEFBeUJDLElBQUE7SUF6Qlksb0RBQW9CO0lBNEJqQztRQUFBO1FBR0EsQ0FBQztRQUFELGFBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLHdCQUFNO0lBSW5CO1FBQUE7UUFLQSxDQUFDO1FBQUQsaUNBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGdFQUEwQjtJQU92QztRQUFBO1FBS0EsQ0FBQztRQUFELDBCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSxrREFBbUI7SUFPaEM7UUFBQTtRQXFDQSxDQUFDO1FBQUQsZUFBQztJQUFELENBckNBLEFBcUNDLElBQUE7SUFyQ1ksNEJBQVE7SUF1Q3JCO1FBQW9DLGtDQUFRO1FBQTVDOztRQUVBLENBQUM7UUFBRCxxQkFBQztJQUFELENBRkEsQUFFQyxDQUZtQyxRQUFRLEdBRTNDO0lBRlksd0NBQWM7SUFJM0I7UUFBQTtRQVVBLENBQUM7UUFBRCxpQkFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksZ0NBQVUiLCJmaWxlIjoiY29yZS9lbnRpdHkvQWNjb21wYW55aW5nQW5hbHlzaXNFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYW1lcmF9IGZyb20gJy4vQ2FtZXJhJ1xyXG5leHBvcnQgY2xhc3MgQWNjb21wYW55aW5nQW5hbHlzaXN7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIGFnZTogbnVtYmVyO1xyXG4gICAgc2V4OiBudW1iZXI7XHJcbiAgICB0aHJlc2hvbGQ6IG51bWJlcjtcclxuICAgIHdlYXJHbGFzc2VzOiBudW1iZXI7XHJcbiAgICB3ZWFyTWFzazogbnVtYmVyO1xyXG4gICAgaW1hZ2VQYXRoOiBzdHJpbmc7XHJcbiAgICBtYXhBZ2U6IG51bWJlcjtcclxuICAgIG1pbkFnZTogbnVtYmVyO1xyXG4gICAgYXJyR2VuZGVyOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBpbWFnZVBhdGhMaXN0OiBBcnJheTx7aWQ6c3RyaW5nLHBhdGg6c3RyaW5nfT4gPSBbXTtcclxuICAgIGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcnJFeWVHbGFzc2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJTdW5HbGFzc2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJTbWlsZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJyTWFzazogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJySXNQYW50czogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJySXNTbGVldmU6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHRhc2tOYW1lOiBzdHJpbmc7XHJcbiAgICB0YXNrSWQ6IHN0cmluZztcclxuICAgIGFnb2ZvbGxvd1RpbWU6IG51bWJlcjtcclxuICAgIGFmdGVyZm9sbG93VGltZTogbnVtYmVyO1xyXG4gICAgZm9sbG93TnVtOiBudW1iZXI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdWx0IHtcclxuICAgIEFjY2Vzc0xvZzogQWNjZXNzTG9nTW9kZWw7XHJcbiAgICBjYW1lcmE6IENhbWVyYVxyXG59XHJcbmV4cG9ydCBjbGFzcyBBY2NvbXBhbnlpbmdBbmFseXNpc1Jlc3VsdHtcclxuICAgIHJlc3VsdDogQXJyYXk8UmVzdWx0PjtcclxuICAgIHRhc2tJZDogc3RyaW5nO1xyXG4gICAgdG90YWxDb3VudDogbnVtYmVyO1xyXG4gICAgY2FtZXJhT3JkZXJMaXN0OiBBcnJheTxBY2Nlc3NMb2dPcmRlck1vZGVsPjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY2Vzc0xvZ09yZGVyTW9kZWwge1xyXG4gICAgc2VyaWFsVmVyc2lvblVJRDogc3RyaW5nO1xyXG4gICAgQ2FtZXJhOiBhbnk7XHJcbiAgICByZWNvcmRDb3VudDogbnVtYmVyO1xyXG4gICAgYWNjZXNzTG9nTGlzdDogQXJyYXk8QWNjZXNzTG9nTW9kZWw+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RlbFJlcyB7XHJcbiAgICBJRDogc3RyaW5nO1xyXG4gICAgQWdlOiBudW1iZXI7XHJcbiAgICBBcmVhSUQ6IHN0cmluZztcclxuICAgIEF0dHJhY3RpdmU6IG51bWJlcjtcclxuICAgIENhbWVyYUlEOiBzdHJpbmc7XHJcbiAgICBHbGFzczogbnVtYmVyO1xyXG4gICAgUmFjZTogbnVtYmVyO1xyXG4gICAgRmFjZUNvbmZpZGVuY2U6IG51bWJlcjtcclxuICAgIEZhY2VGZWF0dXJlOiBzdHJpbmc7XHJcbiAgICBGYWNlUGF0aDogc3RyaW5nO1xyXG4gICAgRmFjZVJlY3Q6IHN0cmluZztcclxuICAgIEdlbmRlcjogc3RyaW5nO1xyXG4gICAgSGFzZXh0cmFjdEF0dHJpYnV0ZTogYm9vbGVhbjtcclxuICAgIEhhc2V4dHJhY3RGZWF0dXJlOiBib29sZWFuO1xyXG4gICAgSGFzZmFjZUZlYXR1cmU6IGJvb2xlYW47XHJcbiAgICBJc1BhbnRzOiBudW1iZXI7XHJcbiAgICBJc1NsZWV2ZTogbnVtYmVyO1xyXG4gICAgTG9nVGltZTogc3RyaW5nO1xyXG4gICAgTWFzazogbnVtYmVyO1xyXG4gICAgT3JpZW50YXRpb246IG51bWJlcjtcclxuICAgIFBlcnNvbkNvbmZpZGVuY2U6IG51bWJlcjtcclxuICAgIFBlcnNvbkZlYXR1cmU6IHN0cmluZztcclxuICAgIFBlcnNvblBhdGg6IHN0cmluZztcclxuICAgIFBlcnNvblJlY3Q6IHN0cmluZztcclxuICAgIFNhdmVUaW1lOiBzdHJpbmc7XHJcbiAgICBTY2VuZVBhdGg6IHN0cmluZztcclxuICAgIFNtaWxlOiBudW1iZXI7XHJcbiAgICBTdW5HbGFzc2VzOiBudW1iZXI7XHJcbiAgICBUYXNrSUQ6IHN0cmluZztcclxuICAgIFRleHR1cmU6IG51bWJlcjtcclxuICAgIFVwcGVyQ29sb3I6IG51bWJlcjtcclxuICAgIEJvdHRvbUNvbG9yOiBudW1iZXI7XHJcbiAgICBzaW1pbGFyOnN0cmluZztcclxuICAgIGFkZHJlc3M6c3RyaW5nO1xyXG4gICAgbGljZW5jZVBsYXRlOnN0cmluZztcclxuICAgIHNwZWVkOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFjY2Vzc0xvZ01vZGVsIGV4dGVuZHMgTW9kZWxSZXN7XHJcbiAgICBBY2NvbXBhbnlpbmdSZXM6QXJyYXk8UmVzdWx0PlxyXG59XHJcblxyXG5leHBvcnQgY2xhc3Mgd2lmaVJlc3VsdCB7XHJcblx0QWNxVGltZTogc3RyaW5nO1xyXG5cdElEOiBzdHJpbmc7XHJcblx0SU1FSTogc3RyaW5nO1xyXG5cdElNU0k6IHN0cmluZztcclxuXHRJTVNJMjogc3RyaW5nO1xyXG5cdE1hYzogc3RyaW5nO1xyXG5cdE1vYmlsZURldmljZUlkPzogc3RyaW5nO1xyXG5cdE1hY0RldmljZUlkPzogc3RyaW5nO1xyXG5cdHJlc3VsdEluZGV4Om51bWJlcjtcclxufVxyXG4iXX0=
