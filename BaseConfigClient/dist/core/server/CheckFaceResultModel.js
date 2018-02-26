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
    var DBMatchFaceRect = (function () {
        function DBMatchFaceRect() {
        }
        return DBMatchFaceRect;
    }());
    exports.DBMatchFaceRect = DBMatchFaceRect;
    var FacePostion = (function () {
        function FacePostion() {
        }
        return FacePostion;
    }());
    exports.FacePostion = FacePostion;
    var DetectFaceResult = (function () {
        function DetectFaceResult() {
        }
        return DetectFaceResult;
    }());
    exports.DetectFaceResult = DetectFaceResult;
    var CheckFaceResult = (function (_super) {
        __extends(CheckFaceResult, _super);
        function CheckFaceResult() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CheckFaceResult;
    }(DetectFaceResult));
    exports.CheckFaceResult = CheckFaceResult;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9DaGVja0ZhY2VSZXN1bHRNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBT0M7UUFBQTtRQVdBLENBQUM7UUFBRCxzQkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksMENBQWU7SUFnQjVCO1FBQUE7UUFLQSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGtDQUFXO0lBVXhCO1FBQUE7UUFhQSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQWJBLEFBYUMsSUFBQTtJQWJZLDRDQUFnQjtJQWtCN0I7UUFBcUMsbUNBQWdCO1FBQXJEOztRQU9BLENBQUM7UUFBRCxzQkFBQztJQUFELENBUEEsQUFPQyxDQVBvQyxnQkFBZ0IsR0FPcEQ7SUFQWSwwQ0FBZSIsImZpbGUiOiJjb3JlL3NlcnZlci9DaGVja0ZhY2VSZXN1bHRNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7REJNYXRjaEZhY2VQb2ludH0gZnJvbSBcIi4uL3BhcmFtcy9TZWFyY2hGYWNlUGFyYW1zXCI7XHJcbi8qKlxyXG4gKiDkurrohLjmo4DmtYvnu5PmnpzmqKHlnosuXHJcbiAqIGNyZWF0ZSBieSB6bXAuXHJcbiAqIEB0aW1lOiAyMDE3LTA5LTAyXHJcbiAqL1xyXG5cclxuIGV4cG9ydCBjbGFzcyBEQk1hdGNoRmFjZVJlY3Qge1xyXG5cclxuICAgIGxlZnQ6IG51bWJlcjtcclxuXHJcbiAgICB0b3A6IG51bWJlcjtcclxuXHJcbiAgICByaWdodDogbnVtYmVyO1xyXG5cclxuICAgIGJvdHRvbTogbnVtYmVyO1xyXG5cclxuICAgIGNvbmZpZGVuY2U6IG51bWJlcjtcclxuIH1cclxuXHJcbiAvKipcclxuICAqIOS6uuiEuOS9jee9ruS/oeaBr1xyXG4gICovXHJcbiBleHBvcnQgY2xhc3MgRmFjZVBvc3Rpb24ge1xyXG5cclxuICAgIHJlY3Q6IERCTWF0Y2hGYWNlUmVjdDtcclxuXHJcbiAgICBwb2ludHM6IEFycmF5PERCTWF0Y2hGYWNlUG9pbnQ+XHJcbiB9XHJcblxyXG4gLyoqXHJcbiAgKiDkurrohLjnibnlvoHmj5Dlj5bnu5PmnpxcclxuICAqL1xyXG4gZXhwb3J0IGNsYXNzIERldGVjdEZhY2VSZXN1bHQge1xyXG5cclxuICAgIC8vIHRhc2tJZFxyXG4gICAga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5Zu+54mHdXJs5Zyw5Z2AXHJcbiAgICBpbWFnZXVybDogc3RyaW5nO1xyXG5cclxuICAgIC8vIOaXtumXtOaIs1xyXG4gICAgdGltZVN0YW1wOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5pyJ5pWI5pe26ZW/XHJcbiAgICBlZmZpY2FjeVRpbWU6IHN0cmluZztcclxuIH1cclxuXHJcbiAvKipcclxuICAqIOS6uuiEuOajgOa1i+e7k+aenCjkuI3miJDlip/lkI7nmoTnu5PmnpwpXHJcbiAgKi9cclxuIGV4cG9ydCBjbGFzcyBDaGVja0ZhY2VSZXN1bHQgZXh0ZW5kcyBEZXRlY3RGYWNlUmVzdWx0IHtcclxuXHJcbiAgICAvLyDlm77niYfmlbDmja4oYmFzZTY057yW56CB5ZCOKVxyXG4gICAgaW1hZ2U6IHN0cmluZztcclxuXHJcbiAgICAvLyDkurrohLjkvY3nva7kv6Hmga/pm4blkIhcclxuICAgIGZhY2VJbmZvOiBBcnJheTxGYWNlUG9zdGlvbj5cclxuIH1cclxuXHJcbiJdfQ==
