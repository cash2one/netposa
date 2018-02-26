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
    var ToolOptionParams = (function () {
        function ToolOptionParams() {
        }
        return ToolOptionParams;
    }());
    exports.ToolOptionParams = ToolOptionParams;
    var CheckFaceParams = (function (_super) {
        __extends(CheckFaceParams, _super);
        function CheckFaceParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CheckFaceParams;
    }(ToolOptionParams));
    exports.CheckFaceParams = CheckFaceParams;
    var DetectFaceParams = (function (_super) {
        __extends(DetectFaceParams, _super);
        function DetectFaceParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return DetectFaceParams;
    }(ToolOptionParams));
    exports.DetectFaceParams = DetectFaceParams;
    var MarkInfo = (function () {
        function MarkInfo() {
        }
        return MarkInfo;
    }());
    exports.MarkInfo = MarkInfo;
    var Point = (function () {
        function Point() {
        }
        return Point;
    }());
    exports.Point = Point;
    var FaceverifyParams = (function () {
        function FaceverifyParams() {
        }
        return FaceverifyParams;
    }());
    exports.FaceverifyParams = FaceverifyParams;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9Ub29sT3B0aW9uUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFDQTtRQUFBO1FBR0EsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSw0Q0FBZ0I7SUFNN0I7UUFBcUMsbUNBQWdCO1FBQXJEOztRQUdBLENBQUM7UUFBRCxzQkFBQztJQUFELENBSEEsQUFHQyxDQUhvQyxnQkFBZ0IsR0FHcEQ7SUFIWSwwQ0FBZTtJQU01QjtRQUFzQyxvQ0FBZ0I7UUFBdEQ7O1FBT0EsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUHFDLGdCQUFnQixHQU9yRDtJQVBZLDRDQUFnQjtJQVM3QjtRQUFBO1FBVUEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDRCQUFRO0lBWXJCO1FBQUE7UUFHQSxDQUFDO1FBQUQsWUFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksc0JBQUs7SUFNbEI7UUFBQTtRQUdBLENBQUM7UUFBRCx1QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksNENBQWdCIiwiZmlsZSI6ImNvcmUvcGFyYW1zL1Rvb2xPcHRpb25QYXJhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNsYXNzIFRvb2xPcHRpb25QYXJhbXMge1xyXG4gICAgY29tbWFuZFR5cGU6c3RyaW5nO1xyXG4gICAgZGV0ZWN0VHlwZTpzdHJpbmc7XHJcbn1cclxuXHJcbi8v5Lq66IS45qOA57SiXHJcbmV4cG9ydCBjbGFzcyBDaGVja0ZhY2VQYXJhbXMgZXh0ZW5kcyBUb29sT3B0aW9uUGFyYW1ze1xyXG4gICAgLy/kuIrkvKDnmoTlm77niYfmlbDmja5cclxuICAgIGltYWdlOnN0cmluZztcclxufVxyXG5cclxuLy/nibnlvoHmj5Dlj5ZcclxuZXhwb3J0IGNsYXNzIERldGVjdEZhY2VQYXJhbXMgZXh0ZW5kcyBUb29sT3B0aW9uUGFyYW1ze1xyXG4gICAgLy/lm77niYfmlbDmja5cclxuICAgIGltYWdlZGF0YTpzdHJpbmc7XHJcbiAgICAvL+WbvueJh3VybFxyXG4gICAgaW1hZ2V1cmw6c3RyaW5nO1xyXG4gICAgLy/moIflrprnmoTkupTlrpjngrnkvY3lkozmiKrlj5bkurrohLjnmoTkvY3nva5cclxuICAgIG1hcmtJbmZvOk1hcmtJbmZvO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFya0luZm97XHJcbiAgICBsZWZ0Om51bWJlcjtcclxuICAgIHJpZ2h0Om51bWJlcjtcclxuICAgIHRvcDpudW1iZXI7XHJcbiAgICBib3R0b206bnVtYmVyO1xyXG4gICAgbGVmdGV5ZTpQb2ludDtcclxuICAgIHJpZ2h0ZXllOlBvaW50O1xyXG4gICAgbm9zZTpQb2ludDtcclxuICAgIG1vdXRobGVmdDpQb2ludDtcclxuICAgIG1vdXRocmlnaHQ6UG9pbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQb2ludHtcclxuICAgIHg6bnVtYmVyO1xyXG4gICAgeTpudW1iZXI7XHJcbn1cclxuXHJcbi8v5Lq66IS45q+U5a+5XHJcbmV4cG9ydCBjbGFzcyBGYWNldmVyaWZ5UGFyYW1ze1xyXG4gICAga2V5MDpzdHJpbmc7XHJcbiAgICBrZXkxOnN0cmluZztcclxufVxyXG4iXX0=
