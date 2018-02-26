define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FaceAnalysisParams = (function () {
        function FaceAnalysisParams() {
        }
        return FaceAnalysisParams;
    }());
    exports.FaceAnalysisParams = FaceAnalysisParams;
    var PersionFace = (function () {
        function PersionFace() {
        }
        return PersionFace;
    }());
    exports.PersionFace = PersionFace;
    function MockPersionFaceList(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push({
                imgPath: '/images/analysis/human-default.png',
                name: '谢春全' + i,
                libraryName: '谢春全库',
                similarity: Math.round(Math.random() * 100)
            });
        }
        return arr;
    }
    exports.MockPersionFaceList = MockPersionFaceList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9GYWNlQW5hbHlzaXMvRmFjZUFuYWx5c2lzRW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBV0EsQ0FBQztRQUFELHlCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSxnREFBa0I7SUFjL0I7UUFBQTtRQUtBLENBQUM7UUFBRCxrQkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksa0NBQVc7SUFPeEIsNkJBQW9DLEdBQVU7UUFDMUMsSUFBSSxHQUFHLEdBQUcsRUFBd0IsQ0FBQztRQUNuQyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLG9DQUFvQztnQkFDN0MsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUFDO2dCQUNmLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO2FBQzVDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQVhELGtEQVdDIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL0ZhY2VBbmFseXNpcy9GYWNlQW5hbHlzaXNFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEZhY2VBbmFseXNpc1BhcmFtcyB7XHJcbiAgICBpbWFnZVBhdGg6IHN0cmluZzsgLy8g5LiK5Lyg5Zu+54mH6K+G5Yir5Lq66IS4XHJcbiAgICBpZENhcmROdW1iZXI6IHN0cmluZzsgLy8g6Lqr5Lu95L+h5oGvXHJcbiAgICBhcnJMaWJJZDogQXJyYXk8bnVtYmVyPjsgLy8g6YCJ5Lit5Lq65YOP5bqTXHJcbiAgICB0aHJlc2hvbGQ6IG51bWJlcjsgLy8g55u45Ly85bqmXHJcbiAgICBhcnJHZW5kZXI6IEFycmF5PG51bWJlcj47IC8vIOaAp+WIqyAwIOWFqOmDqCAxIOeUtyAgMiDlpbNcclxuICAgIG5hdGlvbjogc3RyaW5nOyAvLyDmsJHml49cclxuICAgIHJldHJpZXZhbFJlYXNvbjogbnVtYmVyOyAvLyDmo4DntKLkuovnlLFcclxuICAgIG1heEFnZTpudW1iZXI7XHJcbiAgICBtaW5BZ2U6bnVtYmVyO1xyXG4gICAgYWRkcmVzczpzdHJpbmc7XHJcbn1cclxuXHJcbi8v5Lq66IS45qOA57Si5Y2V5Liq5a+56LGhXHJcbmV4cG9ydCBjbGFzcyBQZXJzaW9uRmFjZXtcclxuICAgIGltZ1BhdGg6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxpYnJhcnlOYW1lOiBzdHJpbmc7XHJcbiAgICBzaW1pbGFyaXR5OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrUGVyc2lvbkZhY2VMaXN0KG51bTpudW1iZXIpOkFycmF5PFBlcnNpb25GYWNlPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxQZXJzaW9uRmFjZT47XHJcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBudW07IGkrKykge1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgaW1nUGF0aDogJy9pbWFnZXMvYW5hbHlzaXMvaHVtYW4tZGVmYXVsdC5wbmcnLFxyXG4gICAgICAgICAgICBuYW1lOiAn6LCi5pil5YWoJyArIGksXHJcbiAgICAgICAgICAgIGxpYnJhcnlOYW1lOiAn6LCi5pil5YWo5bqTJyxcclxuICAgICAgICAgICAgc2ltaWxhcml0eTogTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwMClcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59Il19
