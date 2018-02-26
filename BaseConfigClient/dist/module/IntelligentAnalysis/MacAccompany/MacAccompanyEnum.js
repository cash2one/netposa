define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MacAccompanyingAnalysis = (function () {
        function MacAccompanyingAnalysis() {
        }
        return MacAccompanyingAnalysis;
    }());
    exports.MacAccompanyingAnalysis = MacAccompanyingAnalysis;
    var MacAccompanyParams = (function () {
        function MacAccompanyParams() {
        }
        return MacAccompanyParams;
    }());
    exports.MacAccompanyParams = MacAccompanyParams;
    var MacResult = (function () {
        function MacResult() {
        }
        return MacResult;
    }());
    exports.MacResult = MacResult;
    function MockMacResultData(num) {
        var arr = [];
        for (var i = 1; i <= num; i++) {
            arr.push({ id: 'mac-' + i, macAddr: '00-E0-FI-09-88-25', time: '2017-07-18 10:18:55', address: '武昌区关山大道保利国际', collectStatus: i % 2 == 1 });
        }
        return arr;
    }
    exports.MockMacResultData = MockMacResultData;
    var alarmDetailParam = (function () {
        function alarmDetailParam() {
        }
        return alarmDetailParam;
    }());
    exports.alarmDetailParam = alarmDetailParam;
    function getAlarmList(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push({
                macAddress: '123-345-12-' + Math.round(Math.random() * 50),
                ip: '00-' + Math.round(Math.random() * 30),
                collectTime: '2017-09-' + Math.round(Math.random() * 30),
                collectLocate: '关山大道太阳城'
            });
        }
        return arr;
    }
    exports.getAlarmList = getAlarmList;
    var FaceMacCrashParams = (function () {
        function FaceMacCrashParams() {
        }
        return FaceMacCrashParams;
    }());
    exports.FaceMacCrashParams = FaceMacCrashParams;
    var analysisResultParams = (function () {
        function analysisResultParams() {
        }
        return analysisResultParams;
    }());
    exports.analysisResultParams = analysisResultParams;
    var analysisResultList = (function () {
        function analysisResultList() {
        }
        return analysisResultList;
    }());
    exports.analysisResultList = analysisResultList;
    var sortType = (function () {
        function sortType() {
        }
        return sortType;
    }());
    exports.sortType = sortType;
    var singleMacDetailParam = (function () {
        function singleMacDetailParam() {
        }
        return singleMacDetailParam;
    }());
    exports.singleMacDetailParam = singleMacDetailParam;
    var macCrashRecordParam = (function () {
        function macCrashRecordParam() {
        }
        return macCrashRecordParam;
    }());
    exports.macCrashRecordParam = macCrashRecordParam;
    function getMacCrashData(mac, detail) {
        var macArr = [];
        var detailArr = [];
        for (var j = 0; j < detail; j++) {
            detailArr.push({
                ischeck: false,
                ip: Math.round(Math.random() * 100).toString(),
                macAddress: '127-234-' + Math.round(Math.random() * 100),
                collectTime: '2017-09-' + Math.round(Math.random() * 30),
                collectLocate: '关山大道太阳城'
            });
        }
        for (var i = 0; i < mac; i++) {
            macArr.push({
                macAddress: '127-234-' + Math.round(Math.random() * 100),
                fold: true,
                accompanyTime: Math.round(Math.random() * 10),
                showDetail: detailArr
            });
        }
        return macArr;
    }
    exports.getMacCrashData = getMacCrashData;
    function getAnasisResult(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push({
                missionName: '人脸碰MAC任务' + Math.round(Math.random() * 10),
                createTime: '2017-09-13',
                missionStatus: Math.round(Math.random())
            });
        }
        return arr;
    }
    exports.getAnasisResult = getAnasisResult;
    function getAnalysisList(num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
            arr.push({
                similiarity: Math.round(Math.random() * 100),
                url: '',
                time: '2017-09-13',
                location: '武汉市保利广场'
            });
        }
        return arr;
    }
    exports.getAnalysisList = getAnalysisList;
    var MacAccompOffLine = (function () {
        function MacAccompOffLine() {
        }
        return MacAccompOffLine;
    }());
    exports.MacAccompOffLine = MacAccompOffLine;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvSW50ZWxsaWdlbnRBbmFseXNpcy9NYWNBY2NvbXBhbnkvTWFjQWNjb21wYW55RW51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBYUEsQ0FBQztRQUFELDhCQUFDO0lBQUQsQ0FiQSxBQWFDLElBQUE7SUFiWSwwREFBdUI7SUFlcEM7UUFBQTtRQVFBLENBQUM7UUFBRCx5QkFBQztJQUFELENBUkEsQUFRQyxJQUFBO0lBUlksZ0RBQWtCO0lBVS9CO1FBQUE7UUFNQSxDQUFDO1FBQUQsZ0JBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLDhCQUFTO0lBUXRCLDJCQUFrQyxHQUFXO1FBQ3pDLElBQUksR0FBRyxHQUFHLEVBQXNCLENBQUM7UUFDakMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLE1BQU0sR0FBRyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFDLGFBQWEsRUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDeEksQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBTkQsOENBTUM7SUFHRDtRQUFBO1FBS0EsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FMQSxBQUtDLElBQUE7SUFMWSw0Q0FBZ0I7SUFNN0Isc0JBQTZCLEdBQVU7UUFDdEMsSUFBSSxHQUFHLEdBQUcsRUFBNkIsQ0FBQztRQUN4QyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUM7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VyxFQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxFQUFFLENBQUM7Z0JBQ25ELFVBQVUsRUFBQyxZQUFZO2dCQUN2QixhQUFhLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDMUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBVkQsMENBVUM7SUFFRCx5QkFBZ0MsR0FBVTtRQUN0QyxJQUFJLEdBQUcsR0FBRyxFQUErQixDQUFDO1FBQzFDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUFDLENBQUM7WUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDTCxXQUFXLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO2dCQUN6QyxHQUFHLEVBQUMsRUFBRTtnQkFDTixJQUFJLEVBQUMsWUFBWTtnQkFDakIsUUFBUSxFQUFDLFNBQVM7YUFDckIsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDZixDQUFDO0lBWEQsMENBV0M7SUFFRDtRQUFBO1FBZ0JBLENBQUM7UUFBRCx1QkFBQztJQUFELENBaEJBLEFBZ0JDLElBQUE7SUFoQlksNENBQWdCIiwiZmlsZSI6Im1vZHVsZS9JbnRlbGxpZ2VudEFuYWx5c2lzL01hY0FjY29tcGFueS9NYWNBY2NvbXBhbnlFbnVtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIE1hY0FjY29tcGFueWluZ0FuYWx5c2lze1xyXG4gICAgdGFza05hbWU6IHN0cmluZztcclxuICAgIHRhc2tUeXBlOiBzdHJpbmc7XHJcbiAgICBtYWNBZGRyZXNzOiBzdHJpbmc7XHJcbiAgICBzdGFydFRpbWU6IHN0cmluZztcclxuICAgIGVuZFRpbWU6IHN0cmluZztcclxuICAgIGFyckNhbWVyYUlkOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgZm9sbG93TnVtOiBudW1iZXI7XHJcbiAgICBhZ29mb2xsb3dUaW1lOiBudW1iZXI7XHJcbiAgICBhZnRlcmZvbGxvd1RpbWU6IG51bWJlcjtcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHZhbHVlOiBzdHJpbmc7XHJcbiAgICB0YXNrSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hY0FjY29tcGFueVBhcmFtcyB7XHJcbiAgICBtYWM6IHN0cmluZzsgLy8gbWFj5Zyw5Z2AXHJcbiAgICBzdGFydFRpbWU6IHN0cmluZzsgLy8g5byA5aeL5pe26Ze0XHJcbiAgICBlbmRUaW1lOiBzdHJpbmc7IC8vIOe7k+adn+aXtumXtFxyXG4gICAgLy8gdGltZUlkOiBudW1iZXI7IC8vIOmAieS4reaXtumXtOautWlkXHJcbiAgICB0aHJlc2hvbGQ6IG51bWJlcjsgLy8g5Ly06ZqP5qyh5pWwXHJcbiAgICBhbG9uZ1RpbWVCZWZvcmU6IG51bWJlcjsgLy8g5Ly06ZqP5YmN5pe26Ze0XHJcbiAgICBhbG9uZ1RpbWVBZnRlcjogbnVtYmVyOyAvLyDkvLTpmo/liY3ml7bpl7RcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hY1Jlc3VsdCB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgbWFjQWRkcjogc3RyaW5nO1xyXG4gICAgdGltZTogc3RyaW5nO1xyXG4gICAgYWRkcmVzczogc3RyaW5nO1xyXG4gICAgY29sbGVjdFN0YXR1czogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1vY2tNYWNSZXN1bHREYXRhKG51bTogbnVtYmVyKTpBcnJheTxNYWNSZXN1bHQ+IHtcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxNYWNSZXN1bHQ+O1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gbnVtOyBpKyspIHtcclxuICAgICAgICBhcnIucHVzaCh7aWQ6ICdtYWMtJyArIGksIG1hY0FkZHI6ICcwMC1FMC1GSS0wOS04OC0yNScsIHRpbWU6ICcyMDE3LTA3LTE4IDEwOjE4OjU1JywgYWRkcmVzczogJ+atpuaYjOWMuuWFs+WxseWkp+mBk+S/neWIqeWbvemZhScsY29sbGVjdFN0YXR1czogaSUyPT0xfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIGFsYXJtRGV0YWlsUGFyYW17XHJcbiAgICBtYWNBZGRyZXNzOnN0cmluZztcclxuICAgIGlwOnN0cmluZztcclxuICAgIGNvbGxlY3RUaW1lOnN0cmluZztcclxuICAgIGNvbGxlY3RMb2NhdGU6c3RyaW5nXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFsYXJtTGlzdChudW06bnVtYmVyKTpBcnJheTxhbGFybURldGFpbFBhcmFtPntcclxuIGxldCBhcnIgPSBbXSBhcyBBcnJheTxhbGFybURldGFpbFBhcmFtPjtcclxuIGZvcihsZXQgaT0wO2k8bnVtO2krKyl7XHJcbiAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgbWFjQWRkcmVzczonMTIzLTM0NS0xMi0nKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqNTApLFxyXG4gICAgICAgIGlwOicwMC0nK01hdGgucm91bmQoTWF0aC5yYW5kb20oKSozMCksXHJcbiAgICAgICAgY29sbGVjdFRpbWU6JzIwMTctMDktJytNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMzApLFxyXG4gICAgICAgIGNvbGxlY3RMb2NhdGU6J+WFs+WxseWkp+mBk+WkqumYs+WfjidcclxuICAgIH0pXHJcbiB9XHJcbiByZXR1cm4gYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBGYWNlTWFjQ3Jhc2hQYXJhbXMge1xyXG4gICAgaW1hZ2VQYXRoOiBBcnJheTxzdHJpbmc+O1xyXG4gICAgbWFjOiBzdHJpbmc7IC8vIG1hY+WcsOWdgFxyXG4gICAgc3RhcnRUaW1lOiBzdHJpbmc7IC8vIOW8gOWni+aXtumXtFxyXG4gICAgZW5kVGltZTogc3RyaW5nOyAvLyDnu5PmnZ/ml7bpl7RcclxuICAgIHRpbWVJZDogbnVtYmVyOyAvLyDpgInkuK3ml7bpl7TmrrVpZFxyXG4gICAgdGhyZXNob2xkOiBudW1iZXI7IC8vIOS8tOmaj+asoeaVsFxyXG4gICAgYWxvbmdUaW1lQmVmb3JlOiBudW1iZXI7IC8vIOS8tOmaj+WJjeaXtumXtFxyXG4gICAgYWxvbmdUaW1lQWZ0ZXI6IG51bWJlcjsgLy8g5Ly06ZqP5YmN5pe26Ze0XHJcbiAgICBzaW1pbGFyaXR5OiBudW1iZXI7XHJcbiAgICBzZXg6IG51bWJlcjtcclxuICAgIGFnZTogbnVtYmVyO1xyXG4gICAgaGFpcjogbnVtYmVyO1xyXG4gICAgc2hvZTogbnVtYmVyO1xyXG4gICAgZ2xhc3NlczogbnVtYmVyO1xyXG4gICAgbWFzazogbnVtYmVyO1xyXG4gICAgY2FwOiBudW1iZXI7XHJcbiAgICBnb29kczogbnVtYmVyO1xyXG4gICAgY2xvdGhpbmc6IG51bWJlcjtcclxufVxyXG5leHBvcnQgY2xhc3MgYW5hbHlzaXNSZXN1bHRQYXJhbXN7XHJcbiAgICBtaXNzaW9uTmFtZTpzdHJpbmc7XHJcbiAgICBjcmVhdGVUaW1lOnN0cmluZztcclxuICAgIG1pc3Npb25TdGF0dXM6bnVtYmVyOy8vMOi/kOihjOS4re+8jDHov5DooYzlrozmiJBcclxufVxyXG4vL+afpeeci+ivpuaDheWPguaVsFxyXG5leHBvcnQgY2xhc3MgYW5hbHlzaXNSZXN1bHRMaXN0e1xyXG4gICAgc2ltaWxpYXJpdHk6bnVtYmVyO1xyXG4gICAgdXJsOnN0cmluZztcclxuICAgIHRpbWU6c3RyaW5nO1xyXG4gICAgbG9jYXRpb246c3RyaW5nXHJcbn1cclxuZXhwb3J0IGNsYXNzIHNvcnRUeXBle1xyXG4gICAga2V5OnN0cmluZztcclxuICAgIHRleHQ6c3RyaW5nO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBzaW5nbGVNYWNEZXRhaWxQYXJhbXtcclxuICAgIGlwOnN0cmluZztcclxuICAgIG1hY0FkZHJlc3M6c3RyaW5nO1xyXG4gICAgY29sbGVjdFRpbWU6c3RyaW5nO1xyXG4gICAgY29sbGVjdExvY2F0ZTpzdHJpbmc7XHJcbiAgICBpc2NoZWNrOmJvb2xlYW47XHJcbn1cclxuZXhwb3J0IGNsYXNzIG1hY0NyYXNoUmVjb3JkUGFyYW17XHJcbiAgICBtYWNBZGRyZXNzOnN0cmluZztcclxuICAgIGFjY29tcGFueVRpbWU6bnVtYmVyO1xyXG4gICAgZm9sZDpib29sZWFuO1xyXG4gICAgc2hvd0RldGFpbDpBcnJheTxzaW5nbGVNYWNEZXRhaWxQYXJhbT5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldE1hY0NyYXNoRGF0YShtYWM6bnVtYmVyLGRldGFpbDpudW1iZXIpOkFycmF5PG1hY0NyYXNoUmVjb3JkUGFyYW0+e1xyXG4gICAgbGV0IG1hY0FyciA9IFtdIGFzIEFycmF5PG1hY0NyYXNoUmVjb3JkUGFyYW0+O1xyXG4gICAgbGV0IGRldGFpbEFyciA9IFtdIGFzIEFycmF5PHNpbmdsZU1hY0RldGFpbFBhcmFtPjtcclxuICAgIGZvcihsZXQgaj0wO2o8ZGV0YWlsO2orKyl7XHJcbiAgICAgICAgZGV0YWlsQXJyLnB1c2goe1xyXG4gICAgICAgICAgICBpc2NoZWNrOmZhbHNlLFxyXG4gICAgICAgICAgICBpcDpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTAwKS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBtYWNBZGRyZXNzOicxMjctMjM0LScgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTAwKSxcclxuICAgICAgICAgICAgY29sbGVjdFRpbWU6JzIwMTctMDktJysgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjMwKSxcclxuICAgICAgICAgICAgY29sbGVjdExvY2F0ZTon5YWz5bGx5aSn6YGT5aSq6Ziz5Z+OJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGk9MDtpPG1hYztpKyspe1xyXG4gICAgICAgIG1hY0Fyci5wdXNoKHtcclxuICAgICAgICAgICAgbWFjQWRkcmVzczonMTI3LTIzNC0nK01hdGgucm91bmQoTWF0aC5yYW5kb20oKSoxMDApLFxyXG4gICAgICAgICAgICBmb2xkOnRydWUsXHJcbiAgICAgICAgICAgIGFjY29tcGFueVRpbWU6TWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjEwKSxcclxuICAgICAgICAgICAgc2hvd0RldGFpbDpkZXRhaWxBcnJcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hY0FyclxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmFzaXNSZXN1bHQobnVtOm51bWJlcik6QXJyYXk8YW5hbHlzaXNSZXN1bHRQYXJhbXM+e1xyXG4gICAgbGV0IGFyciA9IFtdIGFzIEFycmF5PGFuYWx5c2lzUmVzdWx0UGFyYW1zPjtcclxuICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKyl7XHJcbiAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICBtaXNzaW9uTmFtZTon5Lq66IS456KwTUFD5Lu75YqhJytNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkqMTApLFxyXG4gICAgICAgICAgICBjcmVhdGVUaW1lOicyMDE3LTA5LTEzJyxcclxuICAgICAgICAgICAgbWlzc2lvblN0YXR1czpNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJldHVybiBhcnI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmFseXNpc0xpc3QobnVtOm51bWJlcik6QXJyYXk8YW5hbHlzaXNSZXN1bHRMaXN0PntcclxuICAgIGxldCBhcnIgPSBbXSBhcyBBcnJheTxhbmFseXNpc1Jlc3VsdExpc3Q+O1xyXG4gICAgZm9yKGxldCBpPTA7aTxudW07aSsrKXtcclxuICAgICAgICBhcnIucHVzaCh7XHJcbiAgICAgICAgICAgIHNpbWlsaWFyaXR5Ok1hdGgucm91bmQoTWF0aC5yYW5kb20oKSoxMDApLFxyXG4gICAgICAgICAgICB1cmw6JycsXHJcbiAgICAgICAgICAgIHRpbWU6JzIwMTctMDktMTMnLFxyXG4gICAgICAgICAgICBsb2NhdGlvbjon5q2m5rGJ5biC5L+d5Yip5bm/5Zy6J1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFjQWNjb21wT2ZmTGluZSB7XHJcbiAgICBDb21wbGV0ZVBlcmNlbnQ6IHN0cmluZztcclxuICAgIENyZWF0ZVRpbWU6IHN0cmluZztcclxuICAgIENyZWF0ZVVzZXI6IHN0cmluZztcclxuICAgIEVuZFRpbWU6IHN0cmluZztcclxuICAgIEV4dDogYW55O1xyXG4gICAgSUQ6IHN0cmluZztcclxuICAgIEpzb25FeHREYXRhOiBhbnk7XHJcbiAgICBKc29uVXNlckRhdGE6IGFueTtcclxuICAgIE1lc3NhZ2U6IHN0cmluZztcclxuICAgIFN0YXJ0VGltZTogc3RyaW5nO1xyXG4gICAgU3RySnNvblVzZXJEYXRhOiBzdHJpbmc7XHJcbiAgICBUYXNrSWQ6IHN0cmluZztcclxuICAgIFRhc2tOYW1lOiBzdHJpbmc7XHJcbiAgICBUYXNrU3RhdHVzOiBzdHJpbmc7XHJcbiAgICBUYXNrVHlwZTogc3RyaW5nO1xyXG59XHJcbiJdfQ==
