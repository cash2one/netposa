define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacCollisionAnalysisParams = (function () {
        function MacCollisionAnalysisParams() {
        }
        return MacCollisionAnalysisParams;
    }());
    exports.MacCollisionAnalysisParams = MacCollisionAnalysisParams;
    var MacImpact = (function () {
        function MacImpact() {
        }
        return MacImpact;
    }());
    exports.MacImpact = MacImpact;
    var DeviceType = (function () {
        function DeviceType() {
        }
        return DeviceType;
    }());
    exports.DeviceType = DeviceType;
    var MacCollisionAnalysisResult = (function () {
        function MacCollisionAnalysisResult() {
        }
        return MacCollisionAnalysisResult;
    }());
    exports.MacCollisionAnalysisResult = MacCollisionAnalysisResult;
    var PerceiveCollideEntitiesResult = (function () {
        function PerceiveCollideEntitiesResult() {
        }
        return PerceiveCollideEntitiesResult;
    }());
    exports.PerceiveCollideEntitiesResult = PerceiveCollideEntitiesResult;
    var PerceiveCollideAccessesModel = (function () {
        function PerceiveCollideAccessesModel() {
        }
        return PerceiveCollideAccessesModel;
    }());
    exports.PerceiveCollideAccessesModel = PerceiveCollideAccessesModel;
    var WifiLogModel = (function () {
        function WifiLogModel() {
        }
        return WifiLogModel;
    }());
    exports.WifiLogModel = WifiLogModel;
    var EFenceLogModel = (function () {
        function EFenceLogModel() {
        }
        return EFenceLogModel;
    }());
    exports.EFenceLogModel = EFenceLogModel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBSUEsQ0FBQztRQUFELGlDQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxnRUFBMEI7SUFLdkM7UUFBQTtRQUtBLENBQUM7UUFBRCxnQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksOEJBQVM7SUFNdEI7UUFBQTtRQUdBLENBQUM7UUFBRCxpQkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksZ0NBQVU7SUFNdkI7UUFBQTtRQUdBLENBQUM7UUFBRCxpQ0FBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksZ0VBQTBCO0lBS3ZDO1FBQUE7UUFJQSxDQUFDO1FBQUQsb0NBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLHNFQUE2QjtJQU0xQztRQUFBO1FBSUEsQ0FBQztRQUFELG1DQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSxvRUFBNEI7SUFNekM7UUFBQTtRQXNCQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQXRCQSxBQXNCQyxJQUFBO0lBdEJZLG9DQUFZO0lBd0J6QjtRQUFBO1FBZUEsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FmQSxBQWVDLElBQUE7SUFmWSx3Q0FBYyIsImZpbGUiOiJtb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy9NYWNDb2xsaXNpb25BbmFseXNpcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNYWNDb2xsaXNpb25BbmFseXNpc1BhcmFtc3tcclxuICAgIG1hY0ltcGFjdExpc3Q6QXJyYXk8TWFjSW1wYWN0PjtcclxuICAgIHRhc2tJZDpzdHJpbmc7XHJcbiAgICB0YXNrTmFtZTpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1hY0ltcGFjdHtcclxuICAgIGFyZWFObzpzdHJpbmc7XHJcbiAgICBkZXZpY2VUeXBlOkRldmljZVR5cGU7XHJcbiAgICBzdGFydFRpbWU6c3RyaW5nO1xyXG4gICAgZW5kVGltZTpzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIERldmljZVR5cGV7XHJcbiAgICBFRkVOQ0U6QXJyYXk8c3RyaW5nPjtcclxuICAgIFdJRkk6QXJyYXk8c3RyaW5nPlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIE1hY0NvbGxpc2lvbkFuYWx5c2lzUmVzdWx0e1xyXG4gICAgUGVyY2VpdmVDb2xsaWRlRW50aXRpZXM6QXJyYXk8UGVyY2VpdmVDb2xsaWRlRW50aXRpZXNSZXN1bHQ+XHJcbiAgICBUYXNrSWQ6c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGVyY2VpdmVDb2xsaWRlRW50aXRpZXNSZXN1bHR7XHJcbiAgICBudW06bnVtYmVyO1xyXG4gICAgUGVyY2VpdmVDb2xsaWRlQWNjZXNzZXM6QXJyYXk8UGVyY2VpdmVDb2xsaWRlQWNjZXNzZXNNb2RlbD47XHJcbiAgICBUeXBlOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBlcmNlaXZlQ29sbGlkZUFjY2Vzc2VzTW9kZWx7XHJcbiAgICBBcmVhTm86c3RyaW5nO1xyXG4gICAgV2lGaUxvZz86V2lmaUxvZ01vZGVsO1xyXG4gICAgRUZlbmNlTG9nPzpFRmVuY2VMb2dNb2RlbDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdpZmlMb2dNb2RlbHtcclxuICAgIEFudGVubmE6c3RyaW5nO1xyXG4gICAgQXBNYWM6c3RyaW5nO1xyXG4gICAgQXBTc2lkOnN0cmluZztcclxuICAgIEFyZWFJZDpzdHJpbmc7XHJcbiAgICBCcmFuZDpzdHJpbmc7XHJcbiAgICBDaGFubmVsOnN0cmluZztcclxuICAgIEVuY3J5cHRpb25UeXBlOnN0cmluZztcclxuICAgIEZyZXF1ZW5jeTpzdHJpbmc7XHJcbiAgICBJRDpzdHJpbmc7XHJcbiAgICBJZGVudGl0eUNvbnRlbnQ6c3RyaW5nO1xyXG4gICAgSWRlbnRpdHlUeXBlOnN0cmluZztcclxuICAgIE1hYzpzdHJpbmc7XHJcbiAgICBNYWNEZXZpY2VJZDpzdHJpbmc7XHJcbiAgICBQb2ludFg6c3RyaW5nO1xyXG4gICAgUG9pbnRZOnN0cmluZztcclxuICAgIFJzc2k6c3RyaW5nO1xyXG4gICAgU25yOnN0cmluZztcclxuICAgIFNvdXJjZTpzdHJpbmc7XHJcbiAgICBTc2lkTGlzdDpzdHJpbmc7XHJcbiAgICBUYXNrSWQ6c3RyaW5nO1xyXG4gICAgQWNxVGltZTpzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFRmVuY2VMb2dNb2RlbHtcclxuICAgIEFyZWFJZDpzdHJpbmc7XHJcbiAgICBJRDpzdHJpbmc7XHJcbiAgICBJTUVJOnN0cmluZztcclxuICAgIElNU0k6c3RyaW5nO1xyXG4gICAgSU1TSTI6c3RyaW5nO1xyXG4gICAgSnpiaDpzdHJpbmc7XHJcbiAgICBMQUM6c3RyaW5nO1xyXG4gICAgTWFjOnN0cmluZztcclxuICAgIE1vYmlsZURldmljZUlkOnN0cmluZztcclxuICAgIE5yc3NpOnN0cmluZztcclxuICAgIFNtc1NlbmRTdGF0dXM6c3RyaW5nO1xyXG4gICAgVE1TSTpzdHJpbmc7XHJcbiAgICBUYXNrSWQ6c3RyaW5nO1xyXG4gICAgQWNxVGltZTpzdHJpbmc7XHJcbn0iXX0=
