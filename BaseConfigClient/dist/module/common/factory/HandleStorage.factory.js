define(["require", "exports", "../../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MsgCenter = (function () {
        function MsgCenter() {
            this.taskMsgNum = 0;
            this.feedbackMsgNum = 0;
            this.msgTotalNum = 0;
        }
        return MsgCenter;
    }());
    exports.MsgCenter = MsgCenter;
    var HandleStorage = (function () {
        function HandleStorage() {
        }
        HandleStorage.prototype.setSessionStorageData = function (key, data) {
            window.sessionStorage.setItem(key, JSON.stringify(data));
        };
        HandleStorage.prototype.setLocalStorageData = function (key, data) {
            window.localStorage.setItem(key, JSON.stringify(data));
        };
        HandleStorage.prototype.getSessionStorageData = function (key) {
            var data = window.sessionStorage.getItem(key);
            if (data) {
                return JSON.parse(window.sessionStorage.getItem(key));
            }
            else {
                return null;
            }
        };
        HandleStorage.prototype.getLocalStorageData = function (key) {
            return JSON.parse(window.localStorage.getItem(key));
        };
        HandleStorage.prototype.removeSessionStorageData = function (key) {
            window.sessionStorage.removeItem(key);
        };
        HandleStorage.prototype.removeLocalStorageData = function (key) {
            window.localStorage.removeItem(key);
        };
        return HandleStorage;
    }());
    main_app_1.app
        .service('handleStorage', HandleStorage);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvY29tbW9uL2ZhY3RvcnkvSGFuZGxlU3RvcmFnZS5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7WUFDSSxlQUFVLEdBQVUsQ0FBQyxDQUFDO1lBQ3RCLG1CQUFjLEdBQVUsQ0FBQyxDQUFDO1lBQzFCLGdCQUFXLEdBQVUsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBRCxnQkFBQztJQUFELENBSkEsQUFJQyxJQUFBO0lBSlksOEJBQVM7SUFnQnRCO1FBQUE7UUFvQ0EsQ0FBQztRQWpDRyw2Q0FBcUIsR0FBckIsVUFBc0IsR0FBVyxFQUFFLElBQVM7WUFDeEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBR0QsMkNBQW1CLEdBQW5CLFVBQW9CLEdBQVcsRUFBRSxJQUFTO1lBQ3RDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUdELDZDQUFxQixHQUFyQixVQUFzQixHQUFXO1lBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQixDQUFDO1FBQ0wsQ0FBQztRQUdELDJDQUFtQixHQUFuQixVQUFvQixHQUFXO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUdELGdEQUF3QixHQUF4QixVQUF5QixHQUFXO1lBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFHRCw4Q0FBc0IsR0FBdEIsVUFBdUIsR0FBVztZQUM5QixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQXBDQSxBQW9DQyxJQUFBO0lBRUQsY0FBRztTQUNFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoibW9kdWxlL2NvbW1vbi9mYWN0b3J5L0hhbmRsZVN0b3JhZ2UuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHRqIG9uIDIwMTcvOC8yLlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi8uLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTXNnQ2VudGVye1xyXG4gICAgdGFza01zZ051bTpudW1iZXIgPSAwO1xyXG4gICAgZmVlZGJhY2tNc2dOdW06bnVtYmVyID0gMDtcclxuICAgIG1zZ1RvdGFsTnVtOm51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUhhbmRsZVN0b3JhZ2Uge1xyXG4gICAgc2V0U2Vzc2lvblN0b3JhZ2VEYXRhOiBGdW5jdGlvbjtcclxuICAgIGdldFNlc3Npb25TdG9yYWdlRGF0YTogRnVuY3Rpb247XHJcbiAgICByZW1vdmVTZXNzaW9uU3RvcmFnZURhdGE6IEZ1bmN0aW9uO1xyXG5cclxuICAgIHNldExvY2FsU3RvcmFnZURhdGE6RnVuY3Rpb247XHJcbiAgICBnZXRMb2NhbFN0b3JhZ2VEYXRhOkZ1bmN0aW9uO1xyXG4gICAgcmVtb3ZlTG9jYWxTdG9yYWdlRGF0YTpGdW5jdGlvbjtcclxufVxyXG5cclxuY2xhc3MgSGFuZGxlU3RvcmFnZSBpbXBsZW1lbnRzIElIYW5kbGVTdG9yYWdlIHtcclxuXHJcbiAgICAvL+WtmOWCqOWIsFNlc3Npb25TdG9yYWdlXHJcbiAgICBzZXRTZXNzaW9uU3RvcmFnZURhdGEoa2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a2Y5YKo5YiwTG9jYWxTdG9yYWdlXHJcbiAgICBzZXRMb2NhbFN0b3JhZ2VEYXRhKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ojrflj5ZTZXNzaW9uU3RvcmFnZVxyXG4gICAgZ2V0U2Vzc2lvblN0b3JhZ2VEYXRhKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+iOt+WPlkxvY2FsU3RvcmFnZVxyXG4gICAgZ2V0TG9jYWxTdG9yYWdlRGF0YShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpFNlc3Npb25TdG9yYWdlXHJcbiAgICByZW1vdmVTZXNzaW9uU3RvcmFnZURhdGEoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6ZmkTG9jYWxTdG9yYWdlXHJcbiAgICByZW1vdmVMb2NhbFN0b3JhZ2VEYXRhKGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFwcFxyXG4gICAgLnNlcnZpY2UoJ2hhbmRsZVN0b3JhZ2UnLCBIYW5kbGVTdG9yYWdlKTtcclxuIl19
