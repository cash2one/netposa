define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FrequencyAnalysisEnum = (function () {
        function FrequencyAnalysisEnum() {
            this.type = "MAC";
        }
        return FrequencyAnalysisEnum;
    }());
    exports.FrequencyAnalysisEnum = FrequencyAnalysisEnum;
    exports.QueryPattern = [
        { name: "MAC", value: "MAC", key: 0 },
        { name: "IMEI", value: "IMEI", key: 1 },
        { name: "IMSI", value: "IMSI", key: 2 }
    ];
    var PerceiveInfos = (function () {
        function PerceiveInfos() {
        }
        return PerceiveInfos;
    }());
    exports.PerceiveInfos = PerceiveInfos;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNGcmVxdWVuY3kvTWFjRnJlcXVlbmN5RW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1lBSUksU0FBSSxHQUFXLEtBQUssQ0FBQztRQUV6QixDQUFDO1FBQUQsNEJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLHNEQUFxQjtJQVFyQixRQUFBLFlBQVksR0FBRztRQUN4QixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFDO1FBQ25DLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUM7UUFDckMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQztLQUN4QyxDQUFDO0lBRUY7UUFBQTtRQVlBLENBQUM7UUFBRCxvQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksc0NBQWE7SUFjMUI7UUFBQTtRQUdBLENBQUM7UUFBRCxhQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSx3QkFBTTtJQU1uQjtRQUFBO1FBR0EsQ0FBQztRQUFELGtCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxrQ0FBVyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNGcmVxdWVuY3kvTWFjRnJlcXVlbmN5RW51bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBGcmVxdWVuY3lBbmFseXNpc0VudW17XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIHRhc2tOYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmcgPSBcIk1BQ1wiO1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFF1ZXJ5UGF0dGVybiA9IFtcclxuICAgIHtuYW1lOiBcIk1BQ1wiLCB2YWx1ZTogXCJNQUNcIiwga2V5OiAwfSxcclxuICAgIHtuYW1lOiBcIklNRUlcIiwgdmFsdWU6IFwiSU1FSVwiLCBrZXk6IDF9LFxyXG4gICAge25hbWU6IFwiSU1TSVwiLCB2YWx1ZTogXCJJTVNJXCIsIGtleTogMn1cclxuXTtcclxuXHJcbmV4cG9ydCBjbGFzcyBQZXJjZWl2ZUluZm9zIHtcclxuICAgIEFjcVRpbWU6IHN0cmluZztcclxuICAgIEFyZWFJZDogc3RyaW5nO1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIFRhc2tJZDogc3RyaW5nO1xyXG4gICAgTWFjPzogc3RyaW5nO1xyXG4gICAgSU1TST86IHN0cmluZztcclxuICAgIElNU0kyPzogc3RyaW5nO1xyXG4gICAgSU1FST86IHN0cmluZztcclxuICAgIE1hY0RldmljZUlkOiBzdHJpbmc7XHJcbiAgICBNb2JpbGVEZXZpY2VJZD86IHN0cmluZztcclxuICAgIFtwcm9wTmFtZTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVzdWx0IHtcclxuICAgIFBlcmNlaXZlSW5mb3M6IEFycmF5PFBlcmNlaXZlSW5mb3M+O1xyXG4gICAgTWFjRGV2aWNlSWQ6IHN0cmluZztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBSZXN1bHRUcmFjayB7XHJcbiAgICBQZXJjZWl2ZUZyZXF1ZW5jeUFycjogQXJyYXk8UmVzdWx0PjtcclxuICAgIFRhc2tJZDogc3RyaW5nO1xyXG59XHJcbiJdfQ==
