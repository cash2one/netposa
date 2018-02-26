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
    var RetrievalRecordModule = (function () {
        function RetrievalRecordModule() {
        }
        return RetrievalRecordModule;
    }());
    exports.RetrievalRecordModule = RetrievalRecordModule;
    var PersonInfo = (function () {
        function PersonInfo() {
        }
        return PersonInfo;
    }());
    exports.PersonInfo = PersonInfo;
    var RetrievalInfoLog = (function () {
        function RetrievalInfoLog() {
        }
        return RetrievalInfoLog;
    }());
    exports.RetrievalInfoLog = RetrievalInfoLog;
    var RetrievalLogList = (function () {
        function RetrievalLogList() {
        }
        return RetrievalLogList;
    }());
    exports.RetrievalLogList = RetrievalLogList;
    var RetrievalLogCom = (function () {
        function RetrievalLogCom() {
        }
        return RetrievalLogCom;
    }());
    exports.RetrievalLogCom = RetrievalLogCom;
    var RetrievalLog = (function (_super) {
        __extends(RetrievalLog, _super);
        function RetrievalLog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RetrievalLog;
    }(RetrievalLogCom));
    exports.RetrievalLog = RetrievalLog;
    var BusinessLib = (function () {
        function BusinessLib() {
        }
        return BusinessLib;
    }());
    exports.BusinessLib = BusinessLib;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9SZXRyaWV2YWxSZWNvcmRNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUlBO1FBQUE7UUFLQSxDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLHNEQUFxQjtJQU9sQztRQUFBO1FBWUEsQ0FBQztRQUFELGlCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxnQ0FBVTtJQWN2QjtRQUFBO1FBSUEsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw0Q0FBZ0I7SUFNN0I7UUFBQTtRQUdBLENBQUM7UUFBRCx1QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksNENBQWdCO0lBSzdCO1FBQUE7UUFRQSxDQUFDO1FBQUQsc0JBQUM7SUFBRCxDQVJBLEFBUUMsSUFBQTtJQVJZLDBDQUFlO0lBVTVCO1FBQWtDLGdDQUFlO1FBQWpEOztRQU1BLENBQUM7UUFBRCxtQkFBQztJQUFELENBTkEsQUFNQyxDQU5pQyxlQUFlLEdBTWhEO0lBTlksb0NBQVk7SUFRekI7UUFBQTtRQVlBLENBQUM7UUFBRCxrQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksa0NBQVciLCJmaWxlIjoiY29yZS9zZXJ2ZXIvUmV0cmlldmFsUmVjb3JkTW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkga2V5IG9uIDIwMTcvNy80LlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXRyaWV2YWxSZWNvcmRNb2R1bGV7XHJcbiAgICByZXRyaWV2YWxJbmZvTG9nTGlzdDpBcnJheTxSZXRyaWV2YWxJbmZvTG9nPjtcclxuICAgIHRhc2tJZDpzdHJpbmc7XHJcbiAgICB0b3RhbENvdW50Om51bWJlcjtcclxuICAgIHJldHJpZXZhbExvZ0xpc3Q6QXJyYXk8YW55PjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBlcnNvbkluZm97XHJcbiAgICBCaXJ0aDpzdHJpbmc7XHJcbiAgICBDZXJ0aWZ5aW5nQXV0aG9yaXR5OnN0cmluZztcclxuICAgIENyZWF0ZVRpbWU6c3RyaW5nO1xyXG4gICAgRmFjZVBpY1BhdGg6QXJyYXk8c3RyaW5nPjtcclxuICAgIEdlbmRlcjpzdHJpbmc7XHJcbiAgICBIb21lQWRkcmVzczpzdHJpbmc7XHJcbiAgICBJRDpzdHJpbmc7XHJcbiAgICBJRENhcmROdW1iZXI6c3RyaW5nO1xyXG4gICAgTmFtZTpzdHJpbmc7XHJcbiAgICBOYXRpb246c3RyaW5nO1xyXG4gICAgVXBkYXRlVGltZTpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXRyaWV2YWxJbmZvTG9ne1xyXG4gICAgYnVzaW5lc3NMaWI6QnVzaW5lc3NMaWI7XHJcbiAgICBwZXJzb25JbmZvOlBlcnNvbkluZm87XHJcbiAgICByZXRyaWV2YWxMb2dMaXN0OkFycmF5PFJldHJpZXZhbExvZ0xpc3Q+O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmV0cmlldmFsTG9nTGlzdHtcclxuICAgIFJldHJpZXZhbExvZzpBcnJheTxSZXRyaWV2YWxMb2c+O1xyXG4gICAgUmV0cmlldmFsUGVyc29uTmFtZTpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXRyaWV2YWxMb2dDb217XHJcbiAgICBBZGRyZXNzOnN0cmluZztcclxuICAgIEFyZWFJRDpzdHJpbmc7XHJcbiAgICBJRDpzdHJpbmc7XHJcbiAgICBJbWFnZVVybDpzdHJpbmc7XHJcbiAgICBSZXRyaWV2YWxOdW06bnVtYmVyO1xyXG4gICAgUmV0cmlldmFsUGVyc29uOnN0cmluZztcclxuICAgIFJldHJpZXZhbFRpbWU6c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmV0cmlldmFsTG9nIGV4dGVuZHMgUmV0cmlldmFsTG9nQ29te1xyXG4gICAgQ2FzZU51bWJlcjpzdHJpbmc7XHJcbiAgICBMYXRpdHVkZTpzdHJpbmc7XHJcbiAgICBMb25naXR1ZGU6c3RyaW5nO1xyXG4gICAgUmVxdWVzdEZyb206c3RyaW5nO1xyXG4gICAgUmV0cmlldmFsUmVhc29uOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJ1c2luZXNzTGlie1xyXG4gICAgQXJlYUlEOnN0cmluZztcclxuICAgIENyZWF0ZVRpbWU6c3RyaW5nO1xyXG4gICAgQ3JlYXRvcjpzdHJpbmc7XHJcbiAgICBFeHQ6c3RyaW5nO1xyXG4gICAgSUQ6c3RyaW5nO1xyXG4gICAgSnNvbkV4dERhdGE6YW55O1xyXG4gICAgSnNvblVzZXJEYXRhOmFueTtcclxuICAgIE5hbWU6c3RyaW5nO1xyXG4gICAgUGFyZW50SUQ6c3RyaW5nO1xyXG4gICAgUGVyc29uQ291bnQ6bnVtYmVyO1xyXG4gICAgU3RySnNvblVzZXJEYXRhYW55OmFueTtcclxufSJdfQ==
