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
    var MockWifi = (function () {
        function MockWifi() {
        }
        return MockWifi;
    }());
    exports.MockWifi = MockWifi;
    var MockEF = (function (_super) {
        __extends(MockEF, _super);
        function MockEF() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MockEF;
    }(MockWifi));
    exports.MockEF = MockEF;
    var MockDevice = (function () {
        function MockDevice() {
        }
        return MockDevice;
    }());
    exports.MockDevice = MockDevice;
    var MockPosition = (function () {
        function MockPosition() {
        }
        return MockPosition;
    }());
    exports.MockPosition = MockPosition;
    function MockCarList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                LicensePlate: "苏BEDV25",
                speek: "80 km/h",
                time: "2017-08-08 12:00:13",
                address: "滨海大道28米向西2车道",
                imgPath: "http://temp.im/64x64/ccc/fff"
            });
        }
        return arr;
    }
    exports.MockCarList = MockCarList;
    function MockPersonList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                sex: "女",
                time: "2017-08-08 12:00:13",
                address: "武昌区关山大道保利国际",
                featrues: "黑色长发, 粉色短袖",
                imgPath: "http://temp.im/64x64/ccc/fff"
            });
        }
        return arr;
    }
    exports.MockPersonList = MockPersonList;
    function MockWifiList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                mac: "00-e0-fc-12-34-56",
                time: "2017-07-01 12:02:23",
                address: "中观十宇北大街肯德基2层"
            });
        }
        return arr;
    }
    exports.MockWifiList = MockWifiList;
    function MockEFList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                mac: "00-e0-fc-12-34-56",
                time: "2017-07-01 12:02:23",
                address: "中观十宇北大街肯德基2层",
                IMSI: "453422132313213",
                IMEI: "453422132313213"
            });
        }
        return arr;
    }
    exports.MockEFList = MockEFList;
    function MockDeviceList(num, type) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            if (type == 'camera') {
                arr.push({
                    code: "12345678",
                    name: "车辆摄像机" + i,
                    type: "摄像机",
                    address: "武昌区关山大道保利国际",
                    position: "100.23134, 18.72879"
                });
            }
            else if (type == 'rmpgate') {
                arr.push({
                    code: "12345678",
                    name: "车辆摄像机" + i,
                    type: "卡口",
                    address: "武昌区关山大道保利国际",
                    position: "100.23134, 18.72879"
                });
            }
            else if (type == 'wifi') {
                arr.push({
                    code: "12345678",
                    name: "车辆摄像机" + i,
                    type: "wifi",
                    address: "武昌区关山大道保利国际",
                    position: "100.23134, 18.72879"
                });
            }
            else if (type == 'electronicfence') {
                arr.push({
                    code: "12345678",
                    name: "车辆摄像机" + i,
                    type: "电围",
                    address: "武昌区关山大道保利国际",
                    position: "100.23134, 18.72879"
                });
            }
        }
        return arr;
    }
    exports.MockDeviceList = MockDeviceList;
    function MockPositionList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                name: "保利国际中心",
                address: "关山大道与新竹路交叉口西北20米"
            });
        }
        return arr;
    }
    exports.MockPositionList = MockPositionList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL1Rlc3RFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBQTtRQUFBO1FBS0EsQ0FBQztRQUFELGNBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLDBCQUFPO0lBT3BCO1FBQUE7UUFLQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLGdDQUFVO0lBT3ZCO1FBQUE7UUFJQSxDQUFDO1FBQUQsZUFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksNEJBQVE7SUFNckI7UUFBNEIsMEJBQVE7UUFBcEM7O1FBR0EsQ0FBQztRQUFELGFBQUM7SUFBRCxDQUhBLEFBR0MsQ0FIMkIsUUFBUSxHQUduQztJQUhZLHdCQUFNO0lBS25CO1FBQUE7UUFNQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLGdDQUFVO0lBUXZCO1FBQUE7UUFHQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLG9DQUFZO0lBS3pCLHFCQUE0QixHQUFVO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVBQW9CLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFlBQVksRUFBRSxTQUFTO2dCQUN2QixLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE9BQU8sRUFBRSw4QkFBOEI7YUFDL0IsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQVpELGtDQVlDO0lBRUQsd0JBQStCLEdBQVU7UUFDckMsSUFBSSxH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QixDQUFDO1lBQUEsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBRSxpQkFBaUIsQ0FBQyxDQUFBLENBQUM7Z0JBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxPQUFPLEdBQUMsQ0FBQztvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsUUFBUSxFQUFFLHFCQUFxQjtpQkFDcEIsQ0FBQyxDQUFBO1lBQ3BCLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUF0Q0Qsd0NBc0NDO0lBRUQsMEJBQWlDLEdBQVU7UUFDdkMsSUFBSSxHQUFHLEdBQUcsRUFBeUIsQ0FBQztRQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGtCQUFrQjthQUNkLENBQUMsQ0FBQTtRQUN0QixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFURCw0Q0FTQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL3F1aWNrU2VhcmNoL1Rlc3RFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1vY2tDYXJ7XHJcbiAgICBMaWNlbnNlUGxhdGU6c3RyaW5nO1xyXG4gICAgc3BlZWs6IHN0cmluZztcclxuICAgIHRpbWU6c3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja1BlcnNvbntcclxuICAgIHNleDogc3RyaW5nO1xyXG4gICAgdGltZTogc3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgaW1nUGF0aDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja1dpZml7XHJcbiAgICBtYWM6IHN0cmluZztcclxuICAgIHRpbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tFRiBleHRlbmRzIE1vY2tXaWZpe1xyXG4gICAgSU1TSTogc3RyaW5nO1xyXG4gICAgSU1FSTogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja0RldmljZXtcclxuICAgIGNvZGU6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHBvc2l0aW9uOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrUG9zaXRpb257XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrQ2FyTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrQ2FyPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrQ2FyPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49CRURWMjVcIixcclxuICAgICAgICAgICAgc3BlZWs6IFwiODAga20vaFwiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjIwMTctMDgtMDggMTI6MDA6MTNcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLmu6jmtbflpKfpgZMyOOexs+WQkeilvzLovabpgZNcIixcclxuICAgICAgICAgICAgaW1nUGF0aDogXCJodHRwOi8vdGVtcC5pbS82NHg2NC9jY2MvZmZmXCJcclxuICAgICAgICB9IGFzIE1vY2tDYXIpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrUGVyc29uTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrUGVyc29uPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrUGVyc29uPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIHNleDpcIuWls1wiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjIwMTctMDgtMDggMTI6MDA6MTNcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLmrabmmIzljLrlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgZmVhdHJ1ZXM6IFwi6buR6Imy6ZW/5Y+RLCDnsonoibLnn63oopZcIixcclxuICAgICAgICAgICAgaW1nUGF0aDogXCJodHRwOi8vdGVtcC5pbS82NHg2NC9jY2MvZmZmXCJcclxuICAgICAgICB9IGFzIE1vY2tQZXJzb24pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrV2lmaUxpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja1dpZmk+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tXaWZpPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIG1hYzogXCIwMC1lMC1mYy0xMi0zNC01NlwiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjIwMTctMDctMDEgMTI6MDI6MjNcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLkuK3op4LljYHlrofljJflpKfooZfogq/lvrfln7oy5bGCXCJcclxuICAgICAgICB9IGFzIE1vY2tXaWZpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja0VGTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrRUY+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tFRj47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBtYWM6IFwiMDAtZTAtZmMtMTItMzQtNTZcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA3LTAxIDEyOjAyOjIzXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5Lit6KeC5Y2B5a6H5YyX5aSn6KGX6IKv5b635Z+6MuWxglwiLFxyXG4gICAgICAgICAgICBJTVNJOiBcIjQ1MzQyMjEzMjMxMzIxM1wiLFxyXG4gICAgICAgICAgICBJTUVJOiBcIjQ1MzQyMjEzMjMxMzIxM1wiXHJcbiAgICAgICAgfSBhcyBNb2NrRUYpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrRGV2aWNlTGlzdChudW06bnVtYmVyLCB0eXBlOnN0cmluZyk6QXJyYXk8TW9ja0RldmljZT57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja0RldmljZT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgaWYodHlwZT09J2NhbWVyYScpe1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcIjEyMzQ1Njc4XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIui9pui+huaRhOWDj+aculwiK2ksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIuaRhOWDj+aculwiLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogXCLmrabmmIzljLrlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIjEwMC4yMzEzNCwgMTguNzI4NzlcIlxyXG4gICAgICAgICAgICB9IGFzIE1vY2tEZXZpY2UpXHJcbiAgICAgICAgfWVsc2UgaWYodHlwZT09J3JtcGdhdGUnKXtcclxuICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29kZTogXCIxMjM0NTY3OFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLovabovobmkYTlg4/mnLpcIitpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCLljaHlj6NcIixcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5piM5Yy65YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCIxMDAuMjMxMzQsIDE4LjcyODc5XCJcclxuICAgICAgICAgICAgfSBhcyBNb2NrRGV2aWNlKVxyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU9PSd3aWZpJyl7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFwiMTIzNDU2NzhcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6L2m6L6G5pGE5YOP5py6XCIraSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwid2lmaVwiLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogXCLmrabmmIzljLrlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIjEwMC4yMzEzNCwgMTguNzI4NzlcIlxyXG4gICAgICAgICAgICB9IGFzIE1vY2tEZXZpY2UpXHJcbiAgICAgICAgfWVsc2UgaWYodHlwZT09J2VsZWN0cm9uaWNmZW5jZScpe1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcIjEyMzQ1Njc4XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIui9pui+huaRhOWDj+aculwiK2ksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIueUteWbtFwiLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogXCLmrabmmIzljLrlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIjEwMC4yMzEzNCwgMTguNzI4NzlcIlxyXG4gICAgICAgICAgICB9IGFzIE1vY2tEZXZpY2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja1Bvc2l0aW9uTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrUG9zaXRpb24+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tQb3NpdGlvbj47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBcIuS/neWIqeWbvemZheS4reW/g1wiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBcIuWFs+WxseWkp+mBk+S4juaWsOeruei3r+S6pOWPieWPo+ilv+WMlzIw57GzXCJcclxuICAgICAgICB9IGFzIE1vY2tQb3NpdGlvbilcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG4iXX0=
