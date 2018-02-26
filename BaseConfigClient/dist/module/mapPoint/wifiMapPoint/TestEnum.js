define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Capture = (function () {
        function Capture() {
        }
        return Capture;
    }());
    exports.Capture = Capture;
    var wifiInfo = (function () {
        function wifiInfo() {
        }
        return wifiInfo;
    }());
    exports.wifiInfo = wifiInfo;
    var wifiAlarm = (function () {
        function wifiAlarm() {
        }
        return wifiAlarm;
    }());
    exports.wifiAlarm = wifiAlarm;
    var Alarm = (function () {
        function Alarm() {
        }
        return Alarm;
    }());
    exports.Alarm = Alarm;
    function MockCaptureList(num, imageUrl) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                sex: Math.round(Math.random()),
                time: '2017-03-02 12:30:48',
                info: '青年，黑色短发',
                isCollection: Math.round(Math.random()),
                image: imageUrl,
                isMonitor: Math.round(Math.random())
            });
        }
        return arr;
    }
    exports.MockCaptureList = MockCaptureList;
    function MockWifiList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            var info = {
                macAddress: '00-90-e0-45-84',
                time: '2017-03-02 12:30:48',
                Address: '武汉市洪山区保利国际中心'
            };
            arr.push(info);
        }
        return arr;
    }
    exports.MockWifiList = MockWifiList;
    function MockWifiAlarm(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            var info = {
                macAddress: '00-E0-FI-09-88-25',
                time: '2017-08-22 11:48:30',
                devece: '邮科院户心桥与南望山1',
                person: 'snface',
                status: '有效'
            };
            arr.push(info);
        }
        return arr;
    }
    exports.MockWifiAlarm = MockWifiAlarm;
    function MockAlarmList(num, imageUrl) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            var j = {
                captrueImage: imageUrl,
                matchNum: '99%',
                alarmImage: imageUrl,
                cameraAddress: '邮科院湖心桥与南山路1号',
                alarmTime: '2017-08-22 11:48:30',
                createUserName: 'snface',
                libName: '在逃库',
                name: 'Avril Lavigne',
                status: Math.round(Math.random()),
                isCollection: Math.round(Math.random()),
                sex: Math.round(Math.random()),
                cardNum: '420198125422044445',
                isHandle: Math.round(Math.random()),
            };
            arr.push(j);
        }
        return arr;
    }
    exports.MockAlarmList = MockAlarmList;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFwUG9pbnQvd2lmaU1hcFBvaW50L1Rlc3RFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUFPQSxDQUFDO1FBQUQsY0FBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksMEJBQU87SUFRcEI7UUFBQTtRQUlBLENBQUM7UUFBRCxlQUFDO0lBQUQsQ0FKQSxBQUlDLElBQUE7SUFKWSw0QkFBUTtJQUtyQjtRQUFBO1FBTUEsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FOQSxBQU1DLElBQUE7SUFOWSw4QkFBUztJQU90QjtRQUFBO1FBY0EsQ0FBQztRQUFELFlBQUM7SUFBRCxDQWRBLEFBY0MsSUFBQTtJQWRZLHNCQUFLO0lBZ0JsQix5QkFBZ0MsR0FBVSxFQUFDLFFBQWU7UUFDdEQsSUFBSSxHQUFHLEdBQUcsRUFBb0IsQ0FBQztRQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3QixJQUFJLEVBQUMscUJBQXFCO2dCQUMxQixJQUFJLEVBQUMsU0FBUztnQkFDZCxZQUFZLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3RDLEtBQUssRUFBQyxRQUFRO2dCQUNkLFNBQVMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUMzQixDQUFDLENBQUE7UUFDakIsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUE7SUFDZCxDQUFDO0lBYkQsMENBYUM7SUFFRCxzQkFBNkIsR0FBVTtRQUNuQyxJQUFJLEdBQUcsR0FBRyxFQUFxQixDQUFDO1FBQ2hDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUUsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDeEIsSUFBSSxJQUFJLEdBQUc7Z0JBQ1AsVUFBVSxFQUFDLGdCQUFnQjtnQkFDM0IsSUFBSSxFQUFDLHFCQUFxQjtnQkFDMUIsT0FBTyxFQUFDLGNBQWM7YUFDYixDQUFBO1lBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFYRCxvQ0FXQztJQUVELHVCQUE4QixHQUFVO1FBQ3BDLElBQUksR0FBRyxHQUFHLEVBQXNCLENBQUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixJQUFJLElBQUksR0FBRztnQkFDUCxVQUFVLEVBQUMsbUJBQW1CO2dCQUM5QixJQUFJLEVBQUMscUJBQXFCO2dCQUMxQixNQUFNLEVBQUMsYUFBYTtnQkFDcEIsTUFBTSxFQUFDLFFBQVE7Z0JBQ2YsTUFBTSxFQUFDLElBQUk7YUFDRCxDQUFBO1lBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNsQixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFiRCxzQ0FhQztJQUVELHVCQUE4QixHQUFVLEVBQUMsUUFBZTtRQUNwRCxJQUFJLEdBQUcsR0FBRyxFQUFrQixDQUFDO1FBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUUsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLEdBQUc7Z0JBQ0osWUFBWSxFQUFDLFFBQVE7Z0JBQ3JCLFFBQVEsRUFBQyxLQUFLO2dCQUNkLFVBQVUsRUFBQyxRQUFRO2dCQUNuQixhQUFhLEVBQUMsY0FBYztnQkFDNUIsU0FBUyxFQUFDLHFCQUFxQjtnQkFDL0IsY0FBYyxFQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBQyxLQUFLO2dCQUNiLElBQUksRUFBQyxlQUFlO2dCQUNwQixNQUFNLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2hDLFlBQVksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDdEMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM3QixPQUFPLEVBQUMsb0JBQW9CO2dCQUM1QixRQUFRLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDNUIsQ0FBQztZQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFyQkQsc0NBcUJDIiwiZmlsZSI6Im1vZHVsZS9tYXBQb2ludC93aWZpTWFwUG9pbnQvVGVzdEVudW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2FwdHVyZXtcclxuICAgIHNleDpudW1iZXI7Ly8wIOeUtyAx5aWzXHJcbiAgICB0aW1lOnN0cmluZztcclxuICAgIGluZm86c3RyaW5nO1xyXG4gICAgaW1hZ2U6c3RyaW5nO1xyXG4gICAgaXNDb2xsZWN0aW9uOm51bWJlcjsvLzAg5bey5pS26JePIDHmnKrmlLbol49cclxuICAgIGlzTW9uaXRvcjpudW1iZXI7XHJcbn1cclxuZXhwb3J0IGNsYXNzIHdpZmlJbmZve1xyXG4gICAgbWFjQWRkcmVzczpzdHJpbmc7XHJcbiAgICB0aW1lOnN0cmluZztcclxuICAgIEFkZHJlc3M6c3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyB3aWZpQWxhcm17XHJcbiAgICBtYWNBZGRyZXNzOnN0cmluZztcclxuICAgIHRpbWU6c3RyaW5nO1xyXG4gICAgZGV2ZWNlOnN0cmluZztcclxuICAgIHBlcnNvbjpzdHJpbmc7XHJcbiAgICBzdGF0dXM6c3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBBbGFybXtcclxuICAgIGNhcHRydWVJbWFnZTpzdHJpbmc7XHJcbiAgICBtYXRjaE51bTpzdHJpbmc7XHJcbiAgICBhbGFybUltYWdlOnN0cmluZztcclxuICAgIGNhbWVyYUFkZHJlc3M6c3RyaW5nO1xyXG4gICAgYWxhcm1UaW1lOnN0cmluZztcclxuICAgIGNyZWF0ZVVzZXJOYW1lOnN0cmluZztcclxuICAgIGxpYk5hbWU6c3RyaW5nO1xyXG4gICAgc3RhdHVzOm51bWJlcjsvLzAg5pyJ5pWIIDHml6DmlYhcclxuICAgIGlzQ29sbGVjdGlvbjpudW1iZXI7Ly8wIOW3suaUtuiXjyAx5pyq5pS26JePXHJcbiAgICBzZXg6bnVtYmVyOy8vMCDnlLcgMeWls1xyXG4gICAgY2FyZE51bTpzdHJpbmc7XHJcbiAgICBpc0hhbmRsZTpudW1iZXI7Ly8w5bey5aSE55CGIDEg5pyq5aSE55CGXHJcbiAgICBuYW1lOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tDYXB0dXJlTGlzdChudW06bnVtYmVyLGltYWdlVXJsOnN0cmluZyk6QXJyYXk8Q2FwdHVyZT57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8Q2FwdHVyZT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBzZXg6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICAgICAgdGltZTonMjAxNy0wMy0wMiAxMjozMDo0OCcsXHJcbiAgICAgICAgICAgIGluZm86J+mdkuW5tO+8jOm7keiJsuefreWPkScsXHJcbiAgICAgICAgICAgIGlzQ29sbGVjdGlvbjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgICAgICBpbWFnZTppbWFnZVVybCxcclxuICAgICAgICAgICAgaXNNb25pdG9yOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSlcclxuICAgICAgICB9IGFzIENhcHR1cmUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBNb2NrV2lmaUxpc3QobnVtOm51bWJlcik6QXJyYXk8d2lmaUluZm8+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PHdpZmlJbmZvPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBsZXQgaW5mbyA9IHtcclxuICAgICAgICAgICAgbWFjQWRkcmVzczonMDAtOTAtZTAtNDUtODQnLFxyXG4gICAgICAgICAgICB0aW1lOicyMDE3LTAzLTAyIDEyOjMwOjQ4JyxcclxuICAgICAgICAgICAgQWRkcmVzczon5q2m5rGJ5biC5rSq5bGx5Yy65L+d5Yip5Zu96ZmF5Lit5b+DJ1xyXG4gICAgICAgIH0gYXMgd2lmaUluZm9cclxuICAgICAgICBhcnIucHVzaChpbmZvKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja1dpZmlBbGFybShudW06bnVtYmVyKTpBcnJheTx3aWZpQWxhcm0+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PHdpZmlBbGFybT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgbGV0IGluZm8gPSB7XHJcbiAgICAgICAgICAgIG1hY0FkZHJlc3M6JzAwLUUwLUZJLTA5LTg4LTI1JyxcclxuICAgICAgICAgICAgdGltZTonMjAxNy0wOC0yMiAxMTo0ODozMCcsXHJcbiAgICAgICAgICAgIGRldmVjZTon6YKu56eR6Zmi5oi35b+D5qGl5LiO5Y2X5pyb5bGxMScsXHJcbiAgICAgICAgICAgIHBlcnNvbjonc25mYWNlJyxcclxuICAgICAgICAgICAgc3RhdHVzOifmnInmlYgnXHJcbiAgICAgICAgfSBhcyB3aWZpQWxhcm1cclxuICAgICAgICBhcnIucHVzaChpbmZvKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja0FsYXJtTGlzdChudW06bnVtYmVyLGltYWdlVXJsOnN0cmluZyk6QXJyYXk8QWxhcm0+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PEFsYXJtPjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpPD1udW07aSsrKXtcclxuICAgICAgICBsZXQgaiA9IHtcclxuICAgICAgICAgICAgY2FwdHJ1ZUltYWdlOmltYWdlVXJsLFxyXG4gICAgICAgICAgICBtYXRjaE51bTonOTklJyxcclxuICAgICAgICAgICAgYWxhcm1JbWFnZTppbWFnZVVybCxcclxuICAgICAgICAgICAgY2FtZXJhQWRkcmVzczon6YKu56eR6Zmi5rmW5b+D5qGl5LiO5Y2X5bGx6LevMeWPtycsXHJcbiAgICAgICAgICAgIGFsYXJtVGltZTonMjAxNy0wOC0yMiAxMTo0ODozMCcsXHJcbiAgICAgICAgICAgIGNyZWF0ZVVzZXJOYW1lOidzbmZhY2UnLFxyXG4gICAgICAgICAgICBsaWJOYW1lOiflnKjpgIPlupMnLFxyXG4gICAgICAgICAgICBuYW1lOidBdnJpbCBMYXZpZ25lJyxcclxuICAgICAgICAgICAgc3RhdHVzOk1hdGgucm91bmQoTWF0aC5yYW5kb20oKSksXHJcbiAgICAgICAgICAgIGlzQ29sbGVjdGlvbjpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpLFxyXG4gICAgICAgICAgICBzZXg6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICAgICAgY2FyZE51bTonNDIwMTk4MTI1NDIyMDQ0NDQ1JyxcclxuICAgICAgICAgICAgaXNIYW5kbGU6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSxcclxuICAgICAgICB9IGFzIEFsYXJtO1xyXG4gICAgICAgIGFyci5wdXNoKGopXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn0iXX0=
