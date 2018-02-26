define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FrequencyAppearParams = (function () {
        function FrequencyAppearParams() {
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
        return FrequencyAppearParams;
    }());
    exports.FrequencyAppearParams = FrequencyAppearParams;
    var FrequencyAppearResult = (function () {
        function FrequencyAppearResult() {
        }
        return FrequencyAppearResult;
    }());
    exports.FrequencyAppearResult = FrequencyAppearResult;
    var AppearResult = (function () {
        function AppearResult() {
        }
        return AppearResult;
    }());
    exports.AppearResult = AppearResult;
    var SearchAccessResul = (function () {
        function SearchAccessResul() {
        }
        return SearchAccessResul;
    }());
    exports.SearchAccessResul = SearchAccessResul;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GcmVxdWVuY3lBcHBlYXIvRnJlcXVlbmN5QXBwZWFyRW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQTtRQUFBO1lBS0ksY0FBUyxHQUFXLEVBQUUsQ0FBQztZQU12QixjQUFTLEdBQWtCLEVBQUUsQ0FBQztZQUM5QixrQkFBYSxHQUFtQyxFQUFFLENBQUM7WUFDbkQsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1lBQ2hDLGtCQUFhLEdBQWtCLEVBQUUsQ0FBQztZQUNsQyxrQkFBYSxHQUFrQixFQUFFLENBQUM7WUFDbEMsYUFBUSxHQUFrQixFQUFFLENBQUM7WUFDN0IsWUFBTyxHQUFrQixFQUFFLENBQUM7WUFDNUIsZUFBVSxHQUFrQixFQUFFLENBQUM7WUFDL0IsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBSXBDLENBQUM7UUFBRCw0QkFBQztJQUFELENBdkJBLEFBdUJDLElBQUE7SUF2Qlksc0RBQXFCO0lBMEJsQztRQUFBO1FBR0EsQ0FBQztRQUFELDRCQUFDO0lBQUQsQ0FIQSxBQUdDLElBQUE7SUFIWSxzREFBcUI7SUFLbEM7UUFBQTtRQUlBLENBQUM7UUFBRCxtQkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksb0NBQVk7SUFNekI7UUFBQTtRQUdBLENBQUM7UUFBRCx3QkFBQztJQUFELENBSEEsQUFHQyxJQUFBO0lBSFksOENBQWlCIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZyZXF1ZW5jeUFwcGVhci9GcmVxdWVuY3lBcHBlYXJFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNjZXNzTG9nTW9kZWwgfSBmcm9tIFwiLi4vLi4vLi4vY29yZS9lbnRpdHkvQWNjZXNzTG9nXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRnJlcXVlbmN5QXBwZWFyUGFyYW1ze1xyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7XHJcbiAgICBhZ2U6IG51bWJlcjtcclxuICAgIHNleDogbnVtYmVyO1xyXG4gICAgdGhyZXNob2xkOiBudW1iZXIgPSA5MDtcclxuICAgIHdlYXJHbGFzc2VzOiBudW1iZXI7XHJcbiAgICB3ZWFyTWFzazogbnVtYmVyO1xyXG4gICAgaW1hZ2VQYXRoOiBzdHJpbmc7XHJcbiAgICBtYXhBZ2U6IG51bWJlcjtcclxuICAgIG1pbkFnZTogbnVtYmVyO1xyXG4gICAgYXJyR2VuZGVyOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBpbWFnZVBhdGhMaXN0OiBBcnJheTx7aWQ6c3RyaW5nLHBhdGg6c3RyaW5nfT4gPSBbXTtcclxuICAgIGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBhcnJFeWVHbGFzc2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJTdW5HbGFzc2VzOiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICBhcnJTbWlsZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJyTWFzazogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJySXNQYW50czogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgYXJySXNTbGVldmU6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgIHRhc2tOYW1lOnN0cmluZztcclxuICAgIHRhc2tJZDpzdHJpbmc7XHJcbiAgICBoYXVudE51bTpudW1iZXI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgRnJlcXVlbmN5QXBwZWFyUmVzdWx0e1xyXG4gICAgUmVzdWx0OkFycmF5PEFwcGVhclJlc3VsdD47XHJcbiAgICBUb3RhbENvdW50Om51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFwcGVhclJlc3VsdHtcclxuICAgIEFjY2Vzc0xvZzpBY2Nlc3NMb2dNb2RlbDtcclxuICAgIENvdW50Om51bWJlcjtcclxuICAgIFNlYXJjaEFjY2Vzc1Jlc3VsdExpc3Q6QXJyYXk8U2VhcmNoQWNjZXNzUmVzdWw+XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hBY2Nlc3NSZXN1bHtcclxuICAgIFNjb3JlOm51bWJlcjtcclxuICAgIEFjY2Vzc0xvZzpBY2Nlc3NMb2dNb2RlbFxyXG59Il19
