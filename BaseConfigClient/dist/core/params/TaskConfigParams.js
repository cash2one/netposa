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
define(["require", "exports", "./table/TableParams"], function (require, exports, TableParams_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var VideoTaskListParams = (function (_super) {
        __extends(VideoTaskListParams, _super);
        function VideoTaskListParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return VideoTaskListParams;
    }(TableParams_1.TableParams));
    exports.VideoTaskListParams = VideoTaskListParams;
    var TaskListParams = (function (_super) {
        __extends(TaskListParams, _super);
        function TaskListParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TaskListParams;
    }(TableParams_1.TableParams));
    exports.TaskListParams = TaskListParams;
    var TackDetailResult = (function () {
        function TackDetailResult() {
        }
        return TackDetailResult;
    }());
    exports.TackDetailResult = TackDetailResult;
    var deviceInfo = (function () {
        function deviceInfo() {
        }
        return deviceInfo;
    }());
    exports.deviceInfo = deviceInfo;
    var TaskConfigGetAlarmTaskIdsParam = (function () {
        function TaskConfigGetAlarmTaskIdsParam() {
        }
        return TaskConfigGetAlarmTaskIdsParam;
    }());
    exports.TaskConfigGetAlarmTaskIdsParam = TaskConfigGetAlarmTaskIdsParam;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9UYXNrQ29uZmlnUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFZQTtRQUF5Qyx1Q0FBVztRQUFwRDs7UUFVQSxDQUFDO1FBQUQsMEJBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWd0MseUJBQVcsR0FVbkQ7SUFWWSxrREFBbUI7SUFXaEM7UUFBb0Msa0NBQVc7UUFBL0M7O1FBVUEsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FWQSxBQVVDLENBVm1DLHlCQUFXLEdBVTlDO0lBVlksd0NBQWM7SUFZM0I7UUFBQTtRQTRCQSxDQUFDO1FBQUQsdUJBQUM7SUFBRCxDQTVCQSxBQTRCQyxJQUFBO0lBNUJZLDRDQUFnQjtJQThCN0I7UUFBQTtRQUdBLENBQUM7UUFBRCxpQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksZ0NBQVU7SUFLdkI7UUFBQTtRQUVBLENBQUM7UUFBRCxxQ0FBQztJQUFELENBRkEsQUFFQyxJQUFBO0lBRlksd0VBQThCIiwiZmlsZSI6ImNvcmUvcGFyYW1zL1Rhc2tDb25maWdQYXJhbXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiDku7vliqHphY3nva7nm7jlhbPlj4LmlbBcclxuICogQHRpbWU6IDIwMTctMDYtMDUgMTE6MDA6MzNcclxuICovXHJcbmltcG9ydCB7VGFibGVQYXJhbXN9IGZyb20gXCIuL3RhYmxlL1RhYmxlUGFyYW1zXCI7XHJcbi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqIOiOt+WPluS7u+WKoeWIl+ihqOaVsOaNrlxyXG4gKiBAdGltZTogMjAxNy0wNi0wNSAxNDoyMjoxNVxyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBWaWRlb1Rhc2tMaXN0UGFyYW1zIGV4dGVuZHMgVGFibGVQYXJhbXN7XHJcbiAgICBhcmVhSWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHN0YXRlOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuXHRWaWRlb0F1ZGl0U3RhdHVzOnN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuXHR0YXNrVHlwZTpzdHJpbmc7XHJcbiAgICB1c2VySUQ/OiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRhc2tMaXN0UGFyYW1zIGV4dGVuZHMgVGFibGVQYXJhbXN7XHJcbiAgICBhcmVhSWQ6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHN0YXRlOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuXHRhdWRpdFN0YXR1czpzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcblx0dGFza1R5cGU6c3RyaW5nO1xyXG4gICAgdXNlcklEPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFja0RldGFpbFJlc3VsdHtcclxuICAgIGlkOnN0cmluZztcclxuICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgY3JlYXRlVGltZTpzdHJpbmc7XHJcbiAgICB2YWxpZFRpbWVTdGFydDpzdHJpbmc7XHJcbiAgICB2YWxpZFRpbWVFbmQ6c3RyaW5nO1xyXG4gICAgY29udHJvbENvbW1hbmQ6Ym9vbGVhbjtcclxuICAgIGF1ZGl0VXNlcjpzdHJpbmc7XHJcbiAgICBhdXRoVXNlcnM6QXJyYXk8c3RyaW5nPjtcclxuICAgIGF1dGhTdGF0dXM6c3RyaW5nO1xyXG4gICAgYXVkaXREZXNjcnB0aW9uOnN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOnN0cmluZztcclxuICAgIGFyckxpYklkOkFycmF5PHN0cmluZz47XHJcbiAgICBoaWdoVGhyZXNob2xkOm51bWJlcjtcclxuICAgIGxvd1RocmVzaG9sZDpudW1iZXI7XHJcbiAgICB0aW1lVGVtcGxhdGVJZDpzdHJpbmc7XHJcbiAgICBwcmFybXM6c3RyaW5nO1xyXG4gICAgcmVtb3ZlQ2FtYXJhSWRzOkFycmF5PHN0cmluZz47XHJcbiAgICBhZGRyZXNzOnN0cmluZztcclxuICAgIGFyZWFJRDpzdHJpbmc7XHJcbiAgICBjYXNlTnVtYmVyOnN0cmluZztcclxuICAgIGltYWdlVXJsOnN0cmluZztcclxuICAgIGxhdGl0dWRlOnN0cmluZztcclxuICAgIGxvbmdpdHVkZTpzdHJpbmc7XHJcbiAgICBtb2R1bGVOYW1lOnN0cmluZztcclxuICAgIHJlcXVlc3RGcm9tOnN0cmluZztcclxuICAgIHJldHJpZXZhbE51bTpzdHJpbmc7XHJcbiAgICByZXRyaWV2YWxSZWFzb246c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgZGV2aWNlSW5mb3tcclxuICAgIElEOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYXNrQ29uZmlnR2V0QWxhcm1UYXNrSWRzUGFyYW17XHJcbiAgICB1c2VySWQ6IHN0cmluZztcclxufSJdfQ==
