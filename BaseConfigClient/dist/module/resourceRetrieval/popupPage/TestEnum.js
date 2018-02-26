define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MockCarLience = (function () {
        function MockCarLience() {
        }
        return MockCarLience;
    }());
    exports.MockCarLience = MockCarLience;
    function MockCarLienceList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                carLicense: "苏JFDQQ8",
                type: "轿车",
                speed: "30km/h",
                time: "2017-07-18 15:30:23",
                direction: "向北",
                device: "滨海大道28米向西2车道维和大道",
                brand: "别克",
                sub: "君越2010",
                color: "银色",
                featrues: "无",
                test: "无"
            });
        }
        return arr;
    }
    exports.MockCarLienceList = MockCarLienceList;
    var MockCarArchives = (function () {
        function MockCarArchives() {
        }
        return MockCarArchives;
    }());
    exports.MockCarArchives = MockCarArchives;
    function MockCarArchivesList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                carLicense: "苏JFDQQ8",
                type: "小型汽车牌照",
                code: "LS4BDB3DJDKDLDL",
                license: "别克-君越2017款",
                color: "银色",
                engineNum: "246747K",
                loginTime: "2016-7-27",
                violation: "3次违章",
                host: "张某",
                personID: "12345645612",
                phone: "150245578552",
                address: "武汉洪山区保利国际大厦保利时代3栋405"
            });
        }
        return arr;
    }
    exports.MockCarArchivesList = MockCarArchivesList;
    var MockpersonRecord = (function () {
        function MockpersonRecord() {
        }
        return MockpersonRecord;
    }());
    exports.MockpersonRecord = MockpersonRecord;
    function MockpersonRecordList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                simDegree: "90%",
                ageTime: "青年",
                hair: "长发",
                glasses: "戴眼镜",
                passTime: "2017-07-18 10:18:55",
                getDevice: "摄像机1",
                featrues: "短袖,黑色",
                hat: "不戴帽子",
                mask: "不戴口罩",
                carry: "未知",
                sheet: "未知"
            });
        }
        return arr;
    }
    exports.MockpersonRecordList = MockpersonRecordList;
    var MockpersonArchives = (function () {
        function MockpersonArchives() {
        }
        return MockpersonArchives;
    }());
    exports.MockpersonArchives = MockpersonArchives;
    function MockpersonArchivesList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                name: "杨大大",
                phone: "13986299109",
                simDegree: "90%",
                marriage: "已婚",
                familyName: "汉族",
                placeOfOrigin: "陕西西安",
                birth: "2017-07-18",
                personID: "123456544565444",
                address: "中国大陆",
                serverCompany: "东方王丽",
                escape: "否"
            });
        }
        return arr;
    }
    exports.MockpersonArchivesList = MockpersonArchivesList;
    var MockWifiRecord = (function () {
        function MockWifiRecord() {
        }
        return MockWifiRecord;
    }());
    exports.MockWifiRecord = MockWifiRecord;
    function MockWifiRecordList(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({
                mac: "00-e0-fc-12-34-56",
                time: "2017.06.06 12:00:01",
                address: "海滨大道28米向西2车道",
                device: "Wi-Fi探针1",
                ssid: "热点名称",
                hotMac: "355065655122115112155",
                wifiStrong: "-63dB"
            });
        }
        return arr;
    }
    exports.MockWifiRecordList = MockWifiRecordList;
    var CarLience = (function () {
        function CarLience() {
        }
        return CarLience;
    }());
    exports.CarLience = CarLience;
    var CarArchives = (function () {
        function CarArchives() {
        }
        return CarArchives;
    }());
    exports.CarArchives = CarArchives;
    var CarDetailArchives = (function () {
        function CarDetailArchives() {
        }
        return CarDetailArchives;
    }());
    exports.CarDetailArchives = CarDetailArchives;
    var PersonLience = (function () {
        function PersonLience() {
        }
        return PersonLience;
    }());
    exports.PersonLience = PersonLience;
    var PersonDetailArchives = (function () {
        function PersonDetailArchives() {
        }
        return PersonDetailArchives;
    }());
    exports.PersonDetailArchives = PersonDetailArchives;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvcmVzb3VyY2VSZXRyaWV2YWwvcG9wdXBQYWdlL1Rlc3RFbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBO1FBQUE7UUFZQSxDQUFDO1FBQUQsb0JBQUM7SUFBRCxDQVpBLEFBWUMsSUFBQTtJQVpZLHNDQUFhO0lBYzFCLDJCQUFrQyxHQUFVO1FBQ3hDLElBQUksR0FBRyxHQUFHLEVBQTBCLENBQUM7UUFDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBRSxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixJQUFJLEVBQUUsSUFBSTtnQkFDVixLQUFLLEVBQUUsUUFBUTtnQkFDZixJQUFJLEVBQUUscUJBQXFCO2dCQUMzQixTQUFTLEVBQUUsSUFBSTtnQkFDZixNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixLQUFLLEVBQUUsSUFBSTtnQkFDWCxHQUFHLEVBQUUsUUFBUTtnQkFDYixLQUFLLEVBQUUsSUFBSTtnQkFDWCxRQUFRLEVBQUUsR0FBRztnQkFDYixJQUFJLEVBQUUsR0FBRzthQUNLLENBQUMsQ0FBQTtRQUN2QixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNkLENBQUM7SUFsQkQsOENBa0JDO0lBRUQ7UUFBQTtRQVlBLENBQUM7UUFBRCxzQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksMENBQWU7SUFjNUIsNkJBQW9DLEdBQVU7UUFDMUMsSUFBSSxHQUFHLEdBQUcsRUFBNEIsQ0FBQztRQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFFLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLElBQUksRUFB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R0FBRyxDQUFBO0lBQ2QsQ0FBQztJQWRELGdEQWNDO0lBR0Q7UUFBQTtRQWFBLENBQUM7UUFBRCxnQkFBQztJQUFELENBYkEsQUFhQyxJQUFBO0lBYlksOEJBQVM7SUFnQnRCO1FBQUE7UUFhQSxDQUFDO1FBQUQsa0JBQUM7SUFBRCxDQWJBLEFBYUMsSUFBQTtJQWJZLGtDQUFXO0lBZ0J4QjtRQUFBO1FBdUJBLENBQUM7UUFBRCx3QkFBQztJQUFELENBdkJBLEFBdUJDLElBQUE7SUF2QlksOENBQWlCO0lBMEI5QjtRQUFBO1FBY0EsQ0FBQztRQUFELG1CQUFDO0lBQUQsQ0FkQSxBQWNDLElBQUE7SUFkWSxvQ0FBWTtJQWlCekI7UUFBQTtRQVlBLENBQUM7UUFBRCwyQkFBQztJQUFELENBWkEsQUFZQyxJQUFBO0lBWlksb0RBQW9CIiwiZmlsZSI6Im1vZHVsZS9yZXNvdXJjZVJldHJpZXZhbC9wb3B1cFBhZ2UvVGVzdEVudW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTW9ja0NhckxpZW5jZXtcclxuICAgIGNhckxpY2Vuc2U6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHNwZWVkOiBzdHJpbmc7XHJcbiAgICB0aW1lOnN0cmluZztcclxuICAgIGRpcmVjdGlvbjpzdHJpbmc7XHJcbiAgICBkZXZpY2U6IHN0cmluZztcclxuICAgIGJyYW5kOiBzdHJpbmc7XHJcbiAgICBzdWI6IHN0cmluZztcclxuICAgIGNvbG9yOiBzdHJpbmc7XHJcbiAgICBmZWF0cnVlczogc3RyaW5nO1xyXG4gICAgdGVzdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTW9ja0NhckxpZW5jZUxpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja0NhckxpZW5jZT57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja0NhckxpZW5jZT47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaTw9bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBjYXJMaWNlbnNlOiBcIuiLj0pGRFFROFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcIui9v+i9plwiLFxyXG4gICAgICAgICAgICBzcGVlZDogXCIzMGttL2hcIixcclxuICAgICAgICAgICAgdGltZTogXCIyMDE3LTA3LTE4IDE1OjMwOjIzXCIsXHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogXCLlkJHljJdcIixcclxuICAgICAgICAgICAgZGV2aWNlOiBcIua7qOa1t+Wkp+mBkzI457Gz5ZCR6KW/Mui9pumBk+e7tOWSjOWkp+mBk1wiLFxyXG4gICAgICAgICAgICBicmFuZDogXCLliKvlhYtcIixcclxuICAgICAgICAgICAgc3ViOiBcIuWQm+i2ijIwMTBcIixcclxuICAgICAgICAgICAgY29sb3I6IFwi6ZO26ImyXCIsXHJcbiAgICAgICAgICAgIGZlYXRydWVzOiBcIuaXoFwiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcIuaXoFwiXHJcbiAgICAgICAgfSBhcyBNb2NrQ2FyTGllbmNlKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja0NhckFyY2hpdmVze1xyXG4gICAgY29kZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgbGljZW5zZTogc3RyaW5nO1xyXG4gICAgY29sb3I6IHN0cmluZztcclxuICAgIGVuZ2luZU51bTpzdHJpbmc7XHJcbiAgICBsb2dpblRpbWU6c3RyaW5nO1xyXG4gICAgdmlvbGF0aW9uOiBzdHJpbmc7XHJcbiAgICBob3N0OiBzdHJpbmc7XHJcbiAgICBwZXJzb25JRDogc3RyaW5nO1xyXG4gICAgcGhvbmU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tDYXJBcmNoaXZlc0xpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja0NhckFyY2hpdmVzPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrQ2FyQXJjaGl2ZXM+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgY2FyTGljZW5zZTogXCLoi49KRkRRUThcIixcclxuICAgICAgICAgICAgdHlwZTogXCLlsI/lnovmsb3ovabniYznhadcIixcclxuICAgICAgICAgICAgY29kZTogXCJMUzRCREIzREpES0RMRExcIixcclxuICAgICAgICAgICAgbGljZW5zZTogXCLliKvlhYst5ZCb6LaKMjAxN+asvlwiLFxyXG4gICAgICAgICAgICBjb2xvcjogXCLpk7boibJcIixcclxuICAgICAgICAgICAgZW5naW5lTnVtOlwiMjQ2NzQ3S1wiLFxyXG4gICAgICAgICAgICBsb2dpblRpbWU6XCIyMDE2LTctMjdcIixcclxuICAgICAgICAgICAgdmlvbGF0aW9uOiBcIjPmrKHov53nq6BcIixcclxuICAgICAgICAgICAgaG9zdDogXCLlvKDmn5BcIixcclxuICAgICAgICAgICAgcGVyc29uSUQ6IFwiMTIzNDU2NDU2MTJcIixcclxuICAgICAgICAgICAgcGhvbmU6IFwiMTUwMjQ1NTc4NTUyXCIsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IFwi5q2m5rGJ5rSq5bGx5Yy65L+d5Yip5Zu96ZmF5aSn5Y6m5L+d5Yip5pe25LujM+agizQwNVwiXHJcbiAgICAgICAgfSBhcyBNb2NrQ2FyQXJjaGl2ZXMpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyXHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja3BlcnNvblJlY29yZHtcclxuICAgIHNpbURlZ3JlZTogc3RyaW5nO1xyXG4gICAgYWdlVGltZTogc3RyaW5nO1xyXG4gICAgaGFpcjogc3RyaW5nO1xyXG4gICAgZ2xhc3Nlczogc3RyaW5nO1xyXG4gICAgcGFzc1RpbWU6IHN0cmluZztcclxuICAgIGdldERldmljZTogc3RyaW5nO1xyXG4gICAgZmVhdHJ1ZXM6c3RyaW5nO1xyXG4gICAgaGF0OiBzdHJpbmc7XHJcbiAgICBtYXNrOiBzdHJpbmc7XHJcbiAgICBjYXJyeTogc3RyaW5nO1xyXG4gICAgc2hlZXQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2twZXJzb25SZWNvcmRMaXN0KG51bTpudW1iZXIpOkFycmF5PE1vY2twZXJzb25SZWNvcmQ+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PE1vY2twZXJzb25SZWNvcmQ+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgc2ltRGVncmVlOiBcIjkwJVwiLFxyXG4gICAgICAgICAgICBhZ2VUaW1lOiBcIumdkuW5tFwiLFxyXG4gICAgICAgICAgICBoYWlyOiBcIumVv+WPkVwiLFxyXG4gICAgICAgICAgICBnbGFzc2VzOiBcIuaItOecvOmVnFwiLFxyXG4gICAgICAgICAgICBwYXNzVGltZTogXCIyMDE3LTA3LTE4IDEwOjE4OjU1XCIsXHJcbiAgICAgICAgICAgIGdldERldmljZTogXCLmkYTlg4/mnLoxXCIsXHJcbiAgICAgICAgICAgIGZlYXRydWVzOlwi55+t6KKWLOm7keiJslwiLFxyXG4gICAgICAgICAgICBoYXQ6XCLkuI3miLTluL3lrZBcIixcclxuICAgICAgICAgICAgbWFzazogXCLkuI3miLTlj6PnvalcIixcclxuICAgICAgICAgICAgY2Fycnk6IFwi5pyq55+lXCIsXHJcbiAgICAgICAgICAgIHNoZWV0OiBcIuacquefpVwiXHJcbiAgICAgICAgfSBhcyBNb2NrcGVyc29uUmVjb3JkKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja3BlcnNvbkFyY2hpdmVze1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgcGhvbmU6IHN0cmluZztcclxuICAgIHNpbURlZ3JlZTogc3RyaW5nO1xyXG4gICAgbWFycmlhZ2U6IHN0cmluZztcclxuICAgIGZhbWlseU5hbWU6IHN0cmluZztcclxuICAgIHBsYWNlT2ZPcmlnaW46c3RyaW5nO1xyXG4gICAgYmlydGg6IHN0cmluZztcclxuICAgIHBlcnNvbklEOiBzdHJpbmc7XHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBzZXJ2ZXJDb21wYW55OiBzdHJpbmc7XHJcbiAgICBlc2NhcGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2twZXJzb25BcmNoaXZlc0xpc3QobnVtOm51bWJlcik6QXJyYXk8TW9ja3BlcnNvbkFyY2hpdmVzPntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNb2NrcGVyc29uQXJjaGl2ZXM+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgbmFtZTogXCLmnajlpKflpKdcIixcclxuICAgICAgICAgICAgcGhvbmU6IFwiMTM5ODYyOTkxMDlcIixcclxuICAgICAgICAgICAgc2ltRGVncmVlOiBcIjkwJVwiLFxyXG4gICAgICAgICAgICBtYXJyaWFnZTogXCLlt7LlqZpcIixcclxuICAgICAgICAgICAgZmFtaWx5TmFtZTogXCLmsYnml49cIixcclxuICAgICAgICAgICAgcGxhY2VPZk9yaWdpbjogXCLpmZXopb/opb/lrolcIixcclxuICAgICAgICAgICAgYmlydGg6IFwiMjAxNy0wNy0xOFwiLFxyXG4gICAgICAgICAgICBwZXJzb25JRDogXCIxMjM0NTY1NDQ1NjU0NDRcIixcclxuICAgICAgICAgICAgYWRkcmVzczpcIuS4reWbveWkp+mZhlwiLFxyXG4gICAgICAgICAgICBzZXJ2ZXJDb21wYW55Olwi5Lic5pa5546L5Li9XCIsXHJcbiAgICAgICAgICAgIGVzY2FwZTogXCLlkKZcIlxyXG4gICAgICAgIH0gYXMgTW9ja3BlcnNvbkFyY2hpdmVzKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTW9ja1dpZmlSZWNvcmR7XHJcbiAgICBtYWM6IHN0cmluZztcclxuICAgIHRpbWU6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIGRldmljZTogc3RyaW5nO1xyXG4gICAgc3NpZDogc3RyaW5nO1xyXG4gICAgaG90TWFjOnN0cmluZztcclxuICAgIHdpZmlTdHJvbmc6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tXaWZpUmVjb3JkTGlzdChudW06bnVtYmVyKTpBcnJheTxNb2NrV2lmaVJlY29yZD57XHJcbiAgICBsZXQgYXJyID0gW10gYXMgQXJyYXk8TW9ja1dpZmlSZWNvcmQ+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGk8PW51bTtpKyspe1xyXG4gICAgICAgIGFyci5wdXNoKHtcclxuICAgICAgICAgICAgbWFjOiBcIjAwLWUwLWZjLTEyLTM0LTU2XCIsXHJcbiAgICAgICAgICAgIHRpbWU6IFwiMjAxNy4wNi4wNiAxMjowMDowMVwiLFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBcIua1t+a7qOWkp+mBkzI457Gz5ZCR6KW/Mui9pumBk1wiLFxyXG4gICAgICAgICAgICBkZXZpY2U6IFwiV2ktRmnmjqLpkogxXCIsXHJcbiAgICAgICAgICAgIHNzaWQ6IFwi54Ot54K55ZCN56ewXCIsXHJcbiAgICAgICAgICAgIGhvdE1hYzogXCIzNTUwNjU2NTUxMjIxMTUxMTIxNTVcIixcclxuICAgICAgICAgICAgd2lmaVN0cm9uZzogXCItNjNkQlwiXHJcbiAgICAgICAgfSBhcyBNb2NrV2lmaVJlY29yZClcclxuICAgIH1cclxuICAgIHJldHVybiBhcnJcclxufVxyXG5cclxuLy8g6L2m6L6G6L+H6L2m6K6w5b2VXHJcbmV4cG9ydCBjbGFzcyBDYXJMaWVuY2V7XHJcbiAgICB0YWtlUGljdHVyZTogc3RyaW5nOy8vIOi9pui+huWbvueJh1xyXG4gICAgY2FyTGljZW5zZTogc3RyaW5nOy8vIOi9pueJjFxyXG4gICAgdHlwZTogc3RyaW5nOy8vIOi9pui+huexu+Wei1xyXG4gICAgc3BlZWQ6IHN0cmluZzsvLyDovabpgJ9cclxuICAgIHRpbWU6c3RyaW5nOy8vIOmAmuihjOaXtumXtFxyXG4gICAgZGlyZWN0aW9uOnN0cmluZzsvLyDooYzpqbbmlrnlkJFcclxuICAgIGRldmljZTogc3RyaW5nOy8vIOmHh+mbhuiuvuWkh1xyXG4gICAgYnJhbmQ6IHN0cmluZzsvLyDlk4HniYxcclxuICAgIHN1Yjogc3RyaW5nOy8vIOWtkOWTgeeJjFxyXG4gICAgY29sb3I6IHN0cmluZzsvLyDovabovobpopzoibJcclxuICAgIGZlYXRydWVzOiBzdHJpbmc7Ly8g54m55b6BXHJcbiAgICB0ZXN0OiBzdHJpbmc7Ly8g6L+d56ug6K6w5b2VXHJcbn1cclxuXHJcbi8vIOi9pui+huaho+ahiFxyXG5leHBvcnQgY2xhc3MgQ2FyQXJjaGl2ZXN7XHJcbiAgICBjYXJMaWNlbnNlOiBzdHJpbmc7Ly8g6L2m54mMXHJcbiAgICBsaWNlbnNlVHlwZTogc3RyaW5nOy8vIOi9pueJjOexu+Wei1xyXG4gICAgY29kZTogc3RyaW5nOy8vIOivhuWIq+S7o+eggVxyXG4gICAgdHlwZTogc3RyaW5nOy8vIOi9puWei1xyXG4gICAgY29sb3I6IHN0cmluZzsvLyDovabouqvpopzoibJcclxuICAgIGVuZ2luZU51bTpzdHJpbmc7Ly8g5Y+R5Yqo5py65Y+3XHJcbiAgICBsb2dpblRpbWU6c3RyaW5nOy8vIOWIneasoeeZu+iusFxyXG4gICAgdmlvbGF0aW9uOiBzdHJpbmc7Ly8g5Y+R6L+d56ug5oOF5Ya1XHJcbiAgICBvd25lcjogc3RyaW5nOy8vIOacuuWKqOi9puS4u1xyXG4gICAgcGVyc29uSUQ6IHN0cmluZzsvLyDouqvku73or4Hlj7dcclxuICAgIHBob25lOiBzdHJpbmc7Ly8g6IGU57O755S16K+dXHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7Ly8g55m76K6w5L2P5Z2AXHJcbn1cclxuXHJcbi8vIOi9pui+huaho+ahiOivpuaDhVxyXG5leHBvcnQgY2xhc3MgQ2FyRGV0YWlsQXJjaGl2ZXN7XHJcbiAgICBjYXJMaWNlbnNlOiBzdHJpbmc7Ly8g6L2m54mMXHJcbiAgICBjYXJQaWN0dXJlOiBzdHJpbmc7Ly8g6L2m6L6G5Zu+54mHXHJcbiAgICB0eXBlOiBzdHJpbmc7Ly8g6L2m6L6G57G75Z6LXHJcbiAgICBicmFuZDogc3RyaW5nOy8vIOi9pui+huWTgeeJjFxyXG4gICAgY29sb3I6IHN0cmluZzsvLyDovabouqvpopzoibJcclxuICAgIHVzZU5hdHVyZTogc3RyaW5nOy8vIOS9v+eUqOaAp+i0qFxyXG4gICAgZW5naW5lTnVtOnN0cmluZzsvLyDlj5HliqjmnLrlj7dcclxuICAgIHJlbGVhc2VEYXRlOnN0cmluZzsvLyDlh7rljoLml6XmnJ9cclxuICAgIGxpY2Vuc2VDb2xvcjogc3RyaW5nOy8vIOi9pueJjOminOiJslxyXG4gICAgbGljZW5zZVR5cGU6IHN0cmluZzsvLyDovabniYznsbvlnotcclxuICAgIGNvZGU6IHN0cmluZzsvLyDor4bliKvku6PnoIFcclxuICAgIG93bmVyOiBzdHJpbmc7Ly8g5py65Yqo6L2m5Li7XHJcbiAgICBvd25lclBpY3R1cmU6IHN0cmluZzsvLyDovabkuLvlm77niYdcclxuICAgIHNleDogc3RyaW5nOy8vIOaAp+WIq1xyXG4gICAgbmF0aW9uYWxpdHk6IHN0cmluZzsvLyDlkI3ml49cclxuICAgIGJpcnRoZGF5OiBzdHJpbmc7Ly8g5Ye655Sf5pel5pyfXHJcbiAgICBwZXJzb25JRDogc3RyaW5nOy8vIOi6q+S7veivgeWPt1xyXG4gICAgcGhvbmU6IHN0cmluZzsvLyDogZTns7vnlLXor51cclxuICAgIGRyaXZlckxpY2Vuc2VJbmZvOiBzdHJpbmc7Ly8g6am+54Wn5L+h5oGvXHJcbiAgICB2aW9sYXRpb246IHN0cmluZzsvLyDlj5Hov53nq6Dmg4XlhrVcclxuICAgIGxvZ2luVGltZTpzdHJpbmc7Ly8g5Yid5qyh55m76K6wXHJcbiAgICBhZGRyZXNzOiBzdHJpbmc7Ly8g55m76K6w5L2P5Z2AXHJcbn1cclxuXHJcbi8vIOS6uuWRmOmAmuihjOiusOW9lVxyXG5leHBvcnQgY2xhc3MgUGVyc29uTGllbmNle1xyXG4gICAgc2ltRGVncmVlPzogc3RyaW5nO1xyXG4gICAgYWdlVGltZTogc3RyaW5nO1xyXG4gICAgaGFpcjogc3RyaW5nO1xyXG4gICAgZ2xhc3Nlczogc3RyaW5nO1xyXG4gICAgcGFzc1RpbWU6IHN0cmluZztcclxuICAgIGdldERldmljZTogc3RyaW5nO1xyXG4gICAgZmVhdHJ1ZXM6c3RyaW5nO1xyXG4gICAgaGF0OiBzdHJpbmc7XHJcbiAgICBtYXNrOiBzdHJpbmc7XHJcbiAgICBjYXJyeTogc3RyaW5nO1xyXG4gICAgc2hlZXQ6IHN0cmluZztcclxuICAgIGNvbGxlY3RTdGF0dXM6IGJvb2xlYW47XHJcbiAgICBzdXJ2ZWlsbGFuY2VTdGF0dXM6IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIOS6uuWRmOmAmuihjOiusOW9lVxyXG5leHBvcnQgY2xhc3MgUGVyc29uRGV0YWlsQXJjaGl2ZXN7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBwaG9uZTogc3RyaW5nO1xyXG4gICAgc2ltRGVncmVlOiBzdHJpbmc7XHJcbiAgICBtYXJyaWFnZTogc3RyaW5nO1xyXG4gICAgZmFtaWx5TmFtZTogc3RyaW5nO1xyXG4gICAgcGxhY2VPZk9yaWdpbjpzdHJpbmc7XHJcbiAgICBiaXJ0aDogc3RyaW5nO1xyXG4gICAgcGVyc29uSUQ6IHN0cmluZztcclxuICAgIGFkZHJlc3M6IHN0cmluZztcclxuICAgIHNlcnZlckNvbXBhbnk6IHN0cmluZztcclxuICAgIGVzY2FwZTogc3RyaW5nO1xyXG59XHJcblxyXG5cclxuXHJcbiJdfQ==
