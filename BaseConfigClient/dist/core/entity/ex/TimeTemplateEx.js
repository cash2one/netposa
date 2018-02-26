define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimeTemplateEx = (function () {
        function TimeTemplateEx() {
        }
        return TimeTemplateEx;
    }());
    exports.TimeTemplateEx = TimeTemplateEx;
    var WeekItem = (function () {
        function WeekItem() {
        }
        return WeekItem;
    }());
    exports.WeekItem = WeekItem;
    var TimeItem = (function () {
        function TimeItem() {
        }
        return TimeItem;
    }());
    exports.TimeItem = TimeItem;
    var DateItem = (function () {
        function DateItem() {
        }
        return DateItem;
    }());
    exports.DateItem = DateItem;
    var TimeTemplateType = (function () {
        function TimeTemplateType() {
            this.ALL = { code: "ALL", name: "全部" };
            this.FaceMonitor = { code: "FaceMonitor", name: "人像布控" };
            this.CarMonitor = { code: "CarMonitor", name: "车辆布控" };
            this.MacMonitor = { code: "MacMonitor", name: "MAC布控" };
            this.FaceStruct = { code: "FaceStruct", name: "人脸结构化" };
            this.CarStruct = { code: "CarStruct", name: "车辆结构化" };
        }
        return TimeTemplateType;
    }());
    exports.TimeTemplateType = TimeTemplateType;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudGl0eS9leC9UaW1lVGVtcGxhdGVFeC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQTtRQUFBO1FBYUEsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSx3Q0FBYztJQWUzQjtRQUFBO1FBR0EsQ0FBQztRQUFELGVBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLDRCQUFRO0lBSXJCO1FBQUE7UUFJQSxDQUFDO1FBQUQsZUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksNEJBQVE7SUFLckI7UUFBQTtRQUtBLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSw0QkFBUTtJQU9yQjtRQUFBO1lBQ0ksUUFBRyxHQUFHLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUM7WUFDaEMsZ0JBQVcsR0FBRyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBRWxELGVBQVUsR0FBRyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO1lBRWhELGVBQVUsR0FBRyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBRWpELGVBQVUsR0FBRyxFQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1lBRWpELGNBQVMsR0FBRyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO1FBQ25ELENBQUM7UUFBRCx1QkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksNENBQWdCIiwiZmlsZSI6ImNvcmUvZW50aXR5L2V4L1RpbWVUZW1wbGF0ZUV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJVGltZVRlbXBsYXRlfSBmcm9tIFwiLi4vVGltZVRlbXBsYXRlXCI7XHJcbi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqICDml7bpl7TmqKHmnb9cclxuICogQHRpbWU6IDIwMTctMDYtMjQgMTU6MzE6MTBcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lVGVtcGxhdGVFeCBpbXBsZW1lbnRzIElUaW1lVGVtcGxhdGV7XHJcbiAgICBJRDogc3RyaW5nO1xyXG4gICAgTmFtZTogc3RyaW5nO1xyXG4gICAgSXNGdWxsRGF5OiBib29sZWFuO1xyXG4gICAgV2Vla0NvbnRlbnQ6IHN0cmluZztcclxuICAgIERheUNvbnRlbnQ6IHN0cmluZztcclxuICAgIENyZWF0ZVRpbWU6c3RyaW5nO1xyXG4gICAgRGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIEV4dDogc3RyaW5nO1xyXG4gICAgRGF0ZUl0ZW1zOkFycmF5PERhdGVJdGVtPjtcclxuICAgIFdlZWtJdGVtczpBcnJheTxXZWVrSXRlbT47XHJcbiAgICBJc1RlbXBsYXRlOmJvb2xlYW47XHJcbiAgICBUYXNrTW9uaXRvclR5cGU6c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgV2Vla0l0ZW17XHJcbiAgICBEYXlPZldlZWs6c3RyaW5nO1xyXG4gICAgVGltZUl0ZW1zOkFycmF5PFRpbWVJdGVtPjtcclxufVxyXG5leHBvcnQgY2xhc3MgVGltZUl0ZW17XHJcbiAgICBUaHJlc2hvbGRUeXBlOnN0cmluZztcclxuICAgIFN0YXJUaW1lOnN0cmluZztcclxuICAgIEVuZFRpbWU6c3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBEYXRlSXRlbXtcclxuICAgIERhdGVOYW1lOnN0cmluZztcclxuICAgIFN0YXJ0RGF0ZU9mSXRlbTpzdHJpbmc7XHJcbiAgICBFbmREYXRlT2ZJdGVtOnN0cmluZztcclxuICAgIFRpbWVJdGVtczpBcnJheTxUaW1lSXRlbT47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lVGVtcGxhdGVUeXBlIHtcclxuICAgIEFMTCA9IHtjb2RlOiBcIkFMTFwiLCBuYW1lOiBcIuWFqOmDqFwifTtcclxuICAgIEZhY2VNb25pdG9yID0ge2NvZGU6IFwiRmFjZU1vbml0b3JcIiwgbmFtZTogXCLkurrlg4/luIPmjqdcIn07XHJcblxyXG4gICAgQ2FyTW9uaXRvciA9IHtjb2RlOiBcIkNhck1vbml0b3JcIiwgbmFtZTogXCLovabovobluIPmjqdcIn07XHJcblxyXG4gICAgTWFjTW9uaXRvciA9IHtjb2RlOiBcIk1hY01vbml0b3JcIiwgbmFtZTogXCJNQUPluIPmjqdcIn07XHJcblxyXG4gICAgRmFjZVN0cnVjdCA9IHtjb2RlOiBcIkZhY2VTdHJ1Y3RcIiwgbmFtZTogXCLkurrohLjnu5PmnoTljJZcIn07XHJcblxyXG4gICAgQ2FyU3RydWN0ID0ge2NvZGU6IFwiQ2FyU3RydWN0XCIsIG5hbWU6IFwi6L2m6L6G57uT5p6E5YyWXCJ9O1xyXG59Il19
