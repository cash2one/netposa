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
    var FindTaskListParams = (function (_super) {
        __extends(FindTaskListParams, _super);
        function FindTaskListParams() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FindTaskListParams;
    }(TableParams_1.TableParams));
    exports.FindTaskListParams = FindTaskListParams;
    exports.VideoTaskProceNames = {
        FaceStructTaskProceName: { value: "PROC_GET_FACE_TASK(?,?,?,?,?,?)" },
        VehicleStructTaskProceName: { value: "PROC_GET_VEHICLE_STRUCT_TASK(?,?,?,?,?)" }
    };
    exports.ClassNames = {
        SearchTaskResultClass: { value: "com.np.posadp.services.model.response.SearchTaskResult" }
    };
    exports.FieldNames = {
        IvsTaskGroupID: { value: "IvsTaskGroupID" }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3BhcmFtcy9WaWRlb1N0cnVjdFRhc2tQYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQU9BO1FBQXdDLHNDQUFXO1FBQW5EOztRQW9CQSxDQUFDO1FBQUQseUJBQUM7SUFBRCxDQXBCQSxBQW9CQyxDQXBCdUMseUJBQVcsR0FvQmxEO0lBcEJZLGdEQUFrQjtJQXNCbEIsUUFBQSxtQkFBbUIsR0FBRztRQUUvQix1QkFBdUIsRUFBRSxFQUFDLEtBQUssRUFBRSxpQ0FBaUMsRUFBQztRQUduRSwwQkFBMEIsRUFBRSxFQUFDLEtBQUssRUFBRSx5Q0FBeUMsRUFBQztLQUNqRixDQUFBO0lBRVksUUFBQSxVQUFVLEdBQUc7UUFFdEIscUJBQXFCLEVBQUUsRUFBQyxLQUFLLEVBQUUsd0RBQXdELEVBQUM7S0FDM0YsQ0FBQTtJQUVZLFFBQUEsVUFBVSxHQUFHO1FBQ3RCLGNBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBQztLQUM1QyxDQUFBIiwiZmlsZSI6ImNvcmUvcGFyYW1zL1ZpZGVvU3RydWN0VGFza1BhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VGFibGVQYXJhbXN9IGZyb20gXCIuL3RhYmxlL1RhYmxlUGFyYW1zXCI7XHJcblxyXG4vKipcclxuICog5Lu75Yqh6L+Q6KGM54q25oCBLlxyXG4gKiBjcmVhdGUgYnkgem1wLlxyXG4gKiBAdGltZTogMjAxNy0wOC0xMVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEZpbmRUYXNrTGlzdFBhcmFtcyBleHRlbmRzIFRhYmxlUGFyYW1zIHtcclxuICAgIC8vIOWMuuWfn0lEXHJcbiAgICBhcmVhSWQ6IHN0cmluZztcclxuXHJcbiAgICAvLyDku7vliqHlkI3np7BcclxuICAgIG5hbWU6IHN0cmluZztcclxuXHJcbiAgICAvLyDku7vliqHov5DooYznirbmgIFcclxuICAgIHRhc2tTdGF1czogc3RyaW5nO1xyXG5cclxuICAgIC8vIOS7u+WKoeWuoeaguOeKtuaAgVxyXG4gICAgLy8gdGFza0F1ZGl0U3RhdHVzOiBzdHJpbmc7XHJcblxyXG4gICAgLy8g5Lu75Yqh5Yib5bu65byA5aeL5pel5pyfXHJcbiAgICBzdGFydFRpbWU6IERhdGU7XHJcblxyXG4gICAgLy8g5Lu75Yqh5Yib5bu657uT5p2f5pel5pyfXHJcbiAgICBlbmRUaW1lOiBEYXRlO1xyXG5cclxuICAgIHVzZXJJRD86IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFZpZGVvVGFza1Byb2NlTmFtZXMgPSB7XHJcbiAgICAvLyDkurrohLjnu5PmnoTljJbmn6Xor6LlrZjlgqjov4fnqIvlkI3np7BcclxuICAgIEZhY2VTdHJ1Y3RUYXNrUHJvY2VOYW1lOiB7dmFsdWU6IFwiUFJPQ19HRVRfRkFDRV9UQVNLKD8sPyw/LD8sPyw/KVwifSxcclxuXHJcbiAgICAvLyDovabovobnu5PmnoTljJbmn6Xor6Lov4fnqIvlkI3np7BcclxuICAgIFZlaGljbGVTdHJ1Y3RUYXNrUHJvY2VOYW1lOiB7dmFsdWU6IFwiUFJPQ19HRVRfVkVISUNMRV9TVFJVQ1RfVEFTSyg/LD8sPyw/LD8pXCJ9XHJcbn0gXHJcblxyXG5leHBvcnQgY29uc3QgQ2xhc3NOYW1lcyA9IHtcclxuICAgIC8vIOinhumikee7k+aehOWMluS7u+WKoeWIl+ihqOafpeivouexu+WQjVxyXG4gICAgU2VhcmNoVGFza1Jlc3VsdENsYXNzOiB7dmFsdWU6IFwiY29tLm5wLnBvc2FkcC5zZXJ2aWNlcy5tb2RlbC5yZXNwb25zZS5TZWFyY2hUYXNrUmVzdWx0XCJ9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBGaWVsZE5hbWVzID0ge1xyXG4gICAgSXZzVGFza0dyb3VwSUQ6IHt2YWx1ZTogXCJJdnNUYXNrR3JvdXBJRFwifVxyXG59Il19
