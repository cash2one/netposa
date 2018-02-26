define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MockCar = (function () {
        function MockCar() {
        }
        return MockCar;
    }());
    exports.MockCar = MockCar;
    var MockPerson = (function () {
        function MockPerson() {
        }
        return MockPerson;
    }());
    exports.MockPerson = MockPerson;
    var MockMac = (function () {
        function MockMac() {
        }
        return MockMac;
    }());
    exports.MockMac = MockMac;
    function MockCarList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                LicensePlate: "苏BEDV25",
                time: "2017-08-08 12:00:13",
                address: "邮科院湖心桥与南望山路望山路1",
                imgPath: "http://temp.im/140x140/eee/fff",
                name: "admin",
                isValid: "无效"
            });
        }
        return arr;
    }
    exports.MockCarList = MockCarList;
    function MockPersonList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                time: "2017-08-08 12:00:13",
                address: "邮科院湖心桥与南望山路望山路1",
                imgPath1: "http://temp.im/140x140/eee/fff",
                imgPath2: "http://temp.im/140x140/eee/fff",
                similarity: "98%",
                name: "Avril Lavigne",
                library: "测试布控库",
                credential: 420198125422044445,
                isValid: "有效"
            });
        }
        return arr;
    }
    exports.MockPersonList = MockPersonList;
    function MockMacList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                mac: "00-e0-fc-12-34-56",
                time: "2017-07-01 12:02:23",
                address: "武汉市洪山区关山大道新南路保利国际中心",
                isValid: "无效"
            });
        }
        return arr;
    }
    exports.MockMacList = MockMacList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teVJlcG9ydC9yZXBvcnRUZXN0RW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBT0EsQ0FBQztRQUFELGNBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQVBZLDBCQUFPO0lBU3BCO1FBQUE7UUFVQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLGdDQUFVO0lBV3ZCO1FBQUE7UUFLQSxDQUFDO1FBQUQsY0FBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksMEJBQU87SUFRcEIscUJBQTRCLEdBQVU7UUFDbEMsSUFBSSxHQUFHLEdBQUcsRUFBb0IsQ0FBQztRQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsWUFBWSxFQUFFLFNBQVM7Z0JBQ3ZCLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLE9BQU8sRUFBRSxpQkFBaUI7Z0JBQzFCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLElBQUksRUFBRSxPQUFPO2dCQUNiLE9BQU8sRUFBRSxJQUFJO2FBQ0wsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQWJELGtDQWFDO0lBRUQsd0JBQStCLEdBQVU7UUFDckMsSUFBSSxHQUFHLEdBQUcsRUFBdUIsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsT0FBTyxFQUFFLGlCQUFpQjtnQkFDMUIsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsT0FBTztnQkFDaEIsVUFBVSxFQUFFLGtCQUFrQjtnQkFDOUIsT0FBTyxFQUFFLElBQUk7YUFDRixDQUFDLENBQUE7UUFDcEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBaEJELHdDQWdCQztJQUVELHFCQUE0QixHQUFVO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVBQW9CLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxtQkFBbUI7Z0JBQ3hCLElBQUksRUFBRSxxQkFBcUI7Z0JBQzNCLE9BQU8sRUFBRSxxQkFBcUI7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJO2FBQ0wsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQVhELGtDQVdDIiwiZmlsZSI6Im1vZHVsZS90b29sT3B0aW9uL215UmVwb3J0L3JlcG9ydFRlc3RFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1vY2tDYXJ7XHJcbiAgICBMaWNlbnNlUGxhdGU6c3RyaW5nO1xyXG4gICAgaW1nUGF0aDogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdGltZTpzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBpc1ZhbGlkOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrUGVyc29ue1xyXG4gICAgdGltZTogc3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgaW1nUGF0aDE6IHN0cmluZztcclxuICAgIGltZ1BhdGgyOiBzdHJpbmc7XHJcbiAgICBzaW1pbGFyaXR5OiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBsaWJyYXJ5OiBzdHJpbmc7XHJcbiAgICBjcmVkZW50aWFsOiBudW1iZXI7XHJcbiAgICBpc1ZhbGlkOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1vY2tNYWN7XHJcbiAgICBtYWM6IHN0cmluZztcclxuICAgIHRpbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIGlzVmFsaWQ6IHN0cmluZztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrQ2FyTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrQ2FyPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrQ2FyPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49CRURWMjVcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA4LTA4IDEyOjAwOjEzXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi6YKu56eR6Zmi5rmW5b+D5qGl5LiO5Y2X5pyb5bGx6Lev5pyb5bGx6LevMVwiLFxyXG4gICAgICAgICAgICBpbWdQYXRoOiBcImh0dHA6Ly90ZW1wLmltLzE0MHgxNDAvZWVlL2ZmZlwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcImFkbWluXCIsXHJcbiAgICAgICAgICAgIGlzVmFsaWQ6IFwi5peg5pWIXCJcclxuICAgICAgICB9IGFzIE1vY2tDYXIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrUGVyc29uTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrUGVyc29uPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrUGVyc29uPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIHRpbWU6IFwiMjAxNy0wOC0wOCAxMjowMDoxM1wiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBcIumCruenkemZoua5luW/g+ahpeS4juWNl+acm+Wxsei3r+acm+Wxsei3rzFcIixcclxuICAgICAgICAgICAgaW1nUGF0aDE6IFwiaHR0cDovL3RlbXAuaW0vMTQweDE0MC9lZWUvZmZmXCIsXHJcbiAgICAgICAgICAgIGltZ1BhdGgyOiBcImh0dHA6Ly90ZW1wLmltLzE0MHgxNDAvZWVlL2ZmZlwiLFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5OiBcIjk4JVwiLFxyXG4gICAgICAgICAgICBuYW1lOiBcIkF2cmlsIExhdmlnbmVcIixcclxuICAgICAgICAgICAgbGlicmFyeTogXCLmtYvor5XluIPmjqflupNcIixcclxuICAgICAgICAgICAgY3JlZGVudGlhbDogNDIwMTk4MTI1NDIyMDQ0NDQ1LFxyXG4gICAgICAgICAgICBpc1ZhbGlkOiBcIuacieaViFwiXHJcbiAgICAgICAgfSBhcyBNb2NrUGVyc29uKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja01hY0xpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja01hYz57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja01hYz47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBtYWM6IFwiMDAtZTAtZmMtMTItMzQtNTZcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA3LTAxIDEyOjAyOjIzXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5rGJ5biC5rSq5bGx5Yy65YWz5bGx5aSn6YGT5paw5Y2X6Lev5L+d5Yip5Zu96ZmF5Lit5b+DXCIsXHJcbiAgICAgICAgICAgIGlzVmFsaWQ6IFwi5peg5pWIXCJcclxuICAgICAgICB9IGFzIE1vY2tNYWMpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuIl19
