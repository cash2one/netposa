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
                imgPath: "http://temp.im/133x140/eee/fff",
                similarity: "98%"
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
                imgPath: "http://temp.im/115x115/ccc/fff"
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkVGVzdEVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQU1BLENBQUM7UUFBRCxjQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSwwQkFBTztJQVFwQjtRQUFBO1FBS0EsQ0FBQztRQUFELGlCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSxnQ0FBVTtJQU12QjtRQUFBO1FBSUEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLDRCQUFRO0lBTXJCO1FBQUE7UUFNQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLGdDQUFVO0lBUXZCO1FBQUE7UUFHQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLG9DQUFZO0lBS3pCLHFCQUE0QixHQUFVO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVBQW9CLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFlBQVksRUFBRSxTQUFTO2dCQUN2QixLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLFVBQVUsRUFBRSxLQUFLO2FBQ1QsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQWJELGtDQWFDO0lBRUQsd0JBQStCLEdBQVU7UUFDckMsSUFBSSxHQUFHLEdBQUcsRUFBdUIsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUs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QUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGtCQUFrQjthQUNkLENBQUMsQ0FBQTtRQUN0QixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFURCw0Q0FTQyIsImZpbGUiOiJtb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvc2VhcmNoL2FkdmFuY2VkU2VhcmNoL2FkdmFuY2VkVGVzdEVudW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9ja0NhcntcclxuICAgIExpY2Vuc2VQbGF0ZTpzdHJpbmc7XHJcbiAgICBzcGVlazogc3RyaW5nO1xyXG4gICAgdGltZTpzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBzaW1pbGFyaXR5OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrUGVyc29ue1xyXG4gICAgc2V4OiBzdHJpbmc7XHJcbiAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBpbWdQYXRoOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIE1vY2tXaWZpe1xyXG4gICAgbWFjOiBzdHJpbmc7XHJcbiAgICB0aW1lOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNb2NrRGV2aWNle1xyXG4gICAgY29kZTogc3RyaW5nO1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgcG9zaXRpb246IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tQb3NpdGlvbntcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tDYXJMaXN0KG51bTpudW1iZXIpOkFycmF5PE1vY2tDYXI+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tDYXI+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgTGljZW5zZVBsYXRlOiBcIuiLj0JFRFYyNVwiLFxyXG4gICAgICAgICAgICBzcGVlazogXCI4MCBrbS9oXCIsXHJcbiAgICAgICAgICAgIHRpbWU6IFwiMjAxNy0wOC0wOCAxMjowMDoxM1wiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBcIua7qOa1t+Wkp+mBkzI457Gz5ZCR6KW/Mui9pumBk1wiLFxyXG4gICAgICAgICAgICBpbWdQYXRoOiBcImh0dHA6Ly90ZW1wLmltLzEzM3gxNDAvZWVlL2ZmZlwiLFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5OiBcIjk4JVwiXHJcbiAgICAgICAgfSBhcyBNb2NrQ2FyKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja1BlcnNvbkxpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja1BlcnNvbj57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja1BlcnNvbj47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBzZXg6XCLlpbNcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA4LTA4IDEyOjAwOjEzXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5piM5Yy65YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgIGZlYXRydWVzOiBcIum7keiJsumVv+WPkSwg57KJ6Imy55+t6KKWXCIsXHJcbiAgICAgICAgICAgIGltZ1BhdGg6IFwiaHR0cDovL3RlbXAuaW0vMTE1eDExNS9jY2MvZmZmXCJcclxuICAgICAgICB9IGFzIE1vY2tQZXJzb24pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrV2lmaUxpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja1dpZmk+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tXaWZpPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIG1hYzogXCIwMC1lMC1mYy0xMi0zNC01NlwiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjIwMTctMDctMDEgMTI6MDI6MjNcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLkuK3op4LljYHlrofljJflpKfooZfogq/lvrfln7oy5bGCXCJcclxuICAgICAgICB9IGFzIE1vY2tXaWZpKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja0RldmljZUxpc3QobnVtOm51bWJlciwgdHlwZTpzdHJpbmcpOkFycmF5PE1vY2tEZXZpY2U+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tEZXZpY2U+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGlmKHR5cGU9PSdjYW1lcmEnKXtcclxuICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29kZTogXCIxMjM0NTY3OFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLovabovobmkYTlg4/mnLpcIitpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCLmkYTlg4/mnLpcIixcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5piM5Yy65YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCIxMDAuMjMxMzQsIDE4LjcyODc5XCJcclxuICAgICAgICAgICAgfSBhcyBNb2NrRGV2aWNlKVxyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU9PSdybXBnYXRlJyl7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFwiMTIzNDU2NzhcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6L2m6L6G5pGE5YOP5py6XCIraSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwi5Y2h5Y+jXCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBcIuatpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiMTAwLjIzMTM0LCAxOC43Mjg3OVwiXHJcbiAgICAgICAgICAgIH0gYXMgTW9ja0RldmljZSlcclxuICAgICAgICB9ZWxzZSBpZih0eXBlPT0nd2lmaScpe1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcIjEyMzQ1Njc4XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIui9pui+huaRhOWDj+aculwiK2ksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIndpZmlcIixcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5piM5Yy65YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCIxMDAuMjMxMzQsIDE4LjcyODc5XCJcclxuICAgICAgICAgICAgfSBhcyBNb2NrRGV2aWNlKVxyXG4gICAgICAgIH1lbHNlIGlmKHR5cGU9PSdlbGVjdHJvbmljZmVuY2UnKXtcclxuICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29kZTogXCIxMjM0NTY3OFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLovabovobmkYTlg4/mnLpcIitpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCLnlLXlm7RcIixcclxuICAgICAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5piM5Yy65YWz5bGx5aSn6YGT5L+d5Yip5Zu96ZmFXCIsXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogXCIxMDAuMjMxMzQsIDE4LjcyODc5XCJcclxuICAgICAgICAgICAgfSBhcyBNb2NrRGV2aWNlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tQb3NpdGlvbkxpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja1Bvc2l0aW9uPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrUG9zaXRpb24+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogXCLkv53liKnlm73pmYXkuK3lv4NcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLlhbPlsbHlpKfpgZPkuI7mlrDnq7not6/kuqTlj4nlj6Popb/ljJcyMOexs1wiXHJcbiAgICAgICAgfSBhcyBNb2NrUG9zaXRpb24pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn0iXX0=
