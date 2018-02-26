define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FrequencyAnalysisParams = (function () {
        function FrequencyAnalysisParams() {
            this.threshold = 90;
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
        return FrequencyAnalysisParams;
    }());
    exports.FrequencyAnalysisParams = FrequencyAnalysisParams;
    var FrequencyAnalysisReult = (function () {
        function FrequencyAnalysisReult() {
        }
        return FrequencyAnalysisReult;
    }());
    exports.FrequencyAnalysisReult = FrequencyAnalysisReult;
    var FrequencyAnalysisModel = (function () {
        function FrequencyAnalysisModel() {
        }
        return FrequencyAnalysisModel;
    }());
    exports.FrequencyAnalysisModel = FrequencyAnalysisModel;
    var FaceFrequencyModel = (function () {
        function FaceFrequencyModel() {
        }
        return FaceFrequencyModel;
    }());
    exports.FaceFrequencyModel = FaceFrequencyModel;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1lBS0ksY0FBUyxHQUFXLEVBQUUsQ0FBQztZQU12QixjQUFTLEdBQWtCLEVBQUUsQ0FBQztZQUM5QixrQkFBYSxHQUF3QyxFQUFFLENBQUM7WUFDeEQsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1lBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztZQUNsQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7WUFDbEMsYUFBUSxHQUFrQixFQUFFLENBQUM7WUFDN0IsWUFBTyxHQUFrQixFQUFFLENBQUM7WUFDNUIsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFDL0IsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBR3BDLENBQUM7UUFBRCw4QkFBQztJQUFELENBdEJBLEFBc0JDLElBQUE7SUF0QlksMERBQXVCO0lBd0JwQztRQUFBO1FBSUEsQ0FBQztRQUFELDZCQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSx3REFBc0I7SUFNbkM7UUFBQTtRQUdBLENBQUM7UUFBRCw2QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksd0RBQXNCO0lBS25DO1FBQUE7UUFHQSxDQUFDO1FBQUQseUJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLGdEQUFrQiIsImZpbGUiOiJjb3JlL3NlcnZlci9GcmVxdWVuY3lBbmFseXNpc1BhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UmVzdWx0fSBmcm9tIFwiLi4vZW50aXR5L0ZhY2VUcmFja0VudW1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVxdWVuY3lBbmFseXNpc1BhcmFtcyB7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIGFnZTogbnVtYmVyO1xyXG4gICAgc2V4OiBudW1iZXI7XHJcbiAgICB0aHJlc2hvbGQ6IG51bWJlciA9IDkwO1xyXG4gICAgd2VhckdsYXNzZXM6IG51bWJlcjtcclxuICAgIHdlYXJNYXNrOiBudW1iZXI7XHJcbiAgICBpbWFnZVBhdGg6IHN0cmluZztcclxuICAgIG1heEFnZTogbnVtYmVyO1xyXG4gICAgbWluQWdlOiBudW1iZXI7XHJcbiAgICBhcnJHZW5kZXI6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGltYWdlUGF0aExpc3Q6IEFycmF5PHsgaWQ6IHN0cmluZywgcGF0aDogc3RyaW5nIH0+ID0gW107XHJcbiAgICBhcnJDYW1lcmFJZDogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgYXJyRXllR2xhc3NlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJyU3VuR2xhc3NlczogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJyU21pbGU6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGFyck1hc2s6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGFycklzUGFudHM6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIGFycklzU2xlZXZlOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICB0YXNrSWQ6IHN0cmluZztcclxuICAgIHRhc2tOYW1lOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVxdWVuY3lBbmFseXNpc1JldWx0IHtcclxuICAgIFJlc3VsdDpBcnJheTxGcmVxdWVuY3lBbmFseXNpc01vZGVsPjtcclxuICAgIFRhc2tJZDpzdHJpbmc7XHJcbiAgICBUb3RhbENvdW50OjA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGcmVxdWVuY3lBbmFseXNpc01vZGVsIHtcclxuICAgIEZhY2VGcmVxdWVuY3lzOkFycmF5PEZhY2VGcmVxdWVuY3lNb2RlbD47XHJcbiAgICBpbWdVcmw6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEZhY2VGcmVxdWVuY3lNb2RlbHtcclxuICAgIENhbWVyYUlEOnN0cmluZztcclxuICAgIEZhY2VGcmVxdWVuY3lJbmZvczogQXJyYXk8UmVzdWx0PlxyXG59Il19
