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
                imgPath: "http://temp.im/185x140/eee/fff",
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
                imgPath: "http://temp.im/115x115/eee/fff",
                similarity: "98%"
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
                address: "关山大道与新竹路交叉口西北20米",
                long: 19.2345687,
                lat: 23.2564668
            });
        }
        return arr;
    }
    exports.MockPositionList = MockPositionList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvdG9vbE9wdGlvbi9teUNvbGxlY3QvY29sbGVjdEVudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7UUFBQTtRQU1BLENBQUM7UUFBRCxjQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSwwQkFBTztJQVFwQjtRQUFBO1FBTUEsQ0FBQztRQUFELGlCQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSxnQ0FBVTtJQU92QjtRQUFBO1FBSUEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQUpBLEFBSUMsSUFBQTtJQUpZLDRCQUFRO0lBTXJCO1FBQUE7UUFNQSxDQUFDO1FBQUQsaUJBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLGdDQUFVO0lBUXZCO1FBQUE7UUFLQSxDQUFDO1FBQUQsbUJBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUxZLG9DQUFZO0lBT3pCLHFCQUE0QixHQUFVO1FBQ2xDLElBQUksR0FBRyxHQUFHLEVBQW9CLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFlBQVksRUFBRSxTQUFTO2dCQUN2QixLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLHFCQUFxQjtnQkFDM0IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLFVBQVUsRUFBRSxLQUFLO2FBQ1QsQ0FBQyxDQUFBO1FBQ2pCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQWJELGtDQWFDO0lBRUQsd0JBQStCLEdBQVU7UUFDckMsSUFBSSxHQUFHLEdBQUcsRUFBdUIsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFD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LEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEdBQUcsRUFBQyxVQUFVO2FBQ0QsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFBO0lBQ2QsQ0FBQztJQVhELDRDQVdDIiwiZmlsZSI6Im1vZHVsZS90b29sT3B0aW9uL215Q29sbGVjdC9jb2xsZWN0RW51bS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBNb2NrQ2Fye1xyXG4gICAgTGljZW5zZVBsYXRlOnN0cmluZztcclxuICAgIHNwZWVrOiBzdHJpbmc7XHJcbiAgICB0aW1lOnN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHNpbWlsYXJpdHk6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tQZXJzb257XHJcbiAgICBzZXg6IHN0cmluZztcclxuICAgIHRpbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIGltZ1BhdGg6IHN0cmluZztcclxuICAgIHNpbWlsYXJpdHk6IHN0cmluZztcclxufVxyXG5leHBvcnQgY2xhc3MgTW9ja1dpZml7XHJcbiAgICBtYWM6IHN0cmluZztcclxuICAgIHRpbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1vY2tEZXZpY2V7XHJcbiAgICBjb2RlOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBwb3NpdGlvbjogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja1Bvc2l0aW9ue1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgbG9uZzogbnVtYmVyO1xyXG4gICAgbGF0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrQ2FyTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrQ2FyPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrQ2FyPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIExpY2Vuc2VQbGF0ZTogXCLoi49CRURWMjVcIixcclxuICAgICAgICAgICAgc3BlZWs6IFwiODAga20vaFwiLFxyXG4gICAgICAgICAgICB0aW1lOiBcIjIwMTctMDgtMDggMTI6MDA6MTNcIixcclxuICAgICAgICAgICAgYWRkcmVzczogXCLmu6jmtbflpKfpgZMyOOexs+WQkeilvzLovabpgZNcIixcclxuICAgICAgICAgICAgaW1nUGF0aDogXCJodHRwOi8vdGVtcC5pbS8xODV4MTQwL2VlZS9mZmZcIixcclxuICAgICAgICAgICAgc2ltaWxhcml0eTogXCI5OCVcIlxyXG4gICAgICAgIH0gYXMgTW9ja0NhcilcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tQZXJzb25MaXN0KG51bTpudW1iZXIpOkFycmF5PE1vY2tQZXJzb24+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2tQZXJzb24+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgc2V4Olwi5aWzXCIsXHJcbiAgICAgICAgICAgIHRpbWU6IFwiMjAxNy0wOC0wOCAxMjowMDoxM1wiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBcIuatpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICBmZWF0cnVlczogXCLpu5HoibLplb/lj5EsIOeyieiJsuefreiillwiLFxyXG4gICAgICAgICAgICBpbWdQYXRoOiBcImh0dHA6Ly90ZW1wLmltLzExNXgxMTUvZWVlL2ZmZlwiLFxyXG4gICAgICAgICAgICBzaW1pbGFyaXR5OiBcIjk4JVwiXHJcbiAgICAgICAgfSBhcyBNb2NrUGVyc29uKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja1dpZmlMaXN0KG51bTpudW1iZXIpOkFycmF5PE1vY2tXaWZpPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrV2lmaT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBtYWM6IFwiMDAtZTAtZmMtMTItMzQtNTZcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA3LTAxIDEyOjAyOjIzXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5Lit6KeC5Y2B5a6H5YyX5aSn6KGX6IKv5b635Z+6MuWxglwiXHJcbiAgICAgICAgfSBhcyBNb2NrV2lmaSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tEZXZpY2VMaXN0KG51bTpudW1iZXIsIHR5cGU6c3RyaW5nKTpBcnJheTxNb2NrRGV2aWNlPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrRGV2aWNlPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBpZih0eXBlPT0nY2FtZXJhJyl7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFwiMTIzNDU2NzhcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6L2m6L6G5pGE5YOP5py6XCIraSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwi5pGE5YOP5py6XCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBcIuatpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiMTAwLjIzMTM0LCAxOC43Mjg3OVwiXHJcbiAgICAgICAgICAgIH0gYXMgTW9ja0RldmljZSlcclxuICAgICAgICB9ZWxzZSBpZih0eXBlPT0ncm1wZ2F0ZScpe1xyXG4gICAgICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBcIjEyMzQ1Njc4XCIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcIui9pui+huaRhOWDj+aculwiK2ksXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIuWNoeWPo1wiLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogXCLmrabmmIzljLrlhbPlsbHlpKfpgZPkv53liKnlm73pmYVcIixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcIjEwMC4yMzEzNCwgMTguNzI4NzlcIlxyXG4gICAgICAgICAgICB9IGFzIE1vY2tEZXZpY2UpXHJcbiAgICAgICAgfWVsc2UgaWYodHlwZT09J3dpZmknKXtcclxuICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgY29kZTogXCIxMjM0NTY3OFwiLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogXCLovabovobmkYTlg4/mnLpcIitpLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ3aWZpXCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBcIuatpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiMTAwLjIzMTM0LCAxOC43Mjg3OVwiXHJcbiAgICAgICAgICAgIH0gYXMgTW9ja0RldmljZSlcclxuICAgICAgICB9ZWxzZSBpZih0eXBlPT0nZWxlY3Ryb25pY2ZlbmNlJyl7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IFwiMTIzNDU2NzhcIixcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwi6L2m6L6G5pGE5YOP5py6XCIraSxcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwi55S15Zu0XCIsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBcIuatpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhVwiLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiMTAwLjIzMTM0LCAxOC43Mjg3OVwiXHJcbiAgICAgICAgICAgIH0gYXMgTW9ja0RldmljZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrUG9zaXRpb25MaXN0KG51bTpudW1iZXIpOkFycmF5PE1vY2tQb3NpdGlvbj57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja1Bvc2l0aW9uPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIG5hbWU6IFwi5L+d5Yip5Zu96ZmF5Lit5b+DXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5YWz5bGx5aSn6YGT5LiO5paw56u56Lev5Lqk5Y+J5Y+j6KW/5YyXMjDnsbNcIixcclxuICAgICAgICAgICAgbG9uZzogMTkuMjM0NTY4NyxcclxuICAgICAgICAgICAgbGF0OjIzLjI1NjQ2NjhcclxuICAgICAgICB9IGFzIE1vY2tQb3NpdGlvbilcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufSJdfQ==
