define(["require", "exports", "../common/app/main.app"], function (require, exports, main_app_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    var DynamicControlCacheFactory = (function () {
        function DynamicControlCacheFactory() {
            var _this = this;
            this.updateBtnParams = function (result) {
                if (result) {
                    _this.btnParams = { isOpen: true };
                }
                else {
                    _this.btnParams.isOpen = !_this.btnParams.isOpen;
                }
            };
            this.getBtnParams = function () {
                return _this.btnParams;
            };
            this.updateAlarmDatas = function (dataArray) {
                _this.alarmDatas = dataArray;
            };
            this.getAlarmDatas = function () {
                return _this.alarmDatas;
            };
            this.setCameraLocate = function (data) {
                _this.locateOnMap = data;
            };
            this.getCameraLocate = function (data) {
                _this.locateOnMap(data);
            };
        }
        return DynamicControlCacheFactory;
    }());
    main_app_1.app.service('dynamicControlCacheFactory', DynamicControlCacheFactory);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvZHluYW1pY0NvbnRyb2wvZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFzQkMsQ0FBQztJQUVGO1FBQUE7WUFBQSxpQkF5REM7WUE3Q0csb0JBQWUsR0FBRyxVQUFDLE1BQWdCO2dCQUMvQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDO29CQUNQLEtBQUksQ0FBQyxTQUFTLEdBQUcsRUFBQyxNQUFNLEVBQUcsSUFBSSxFQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQUEsSUFBSSxDQUFDLENBQUM7b0JBQ0gsS0FBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFDbkQsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLGlCQUFZLEdBQUc7Z0JBQ1gsTUFBTSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQyxDQUFBO1lBUUQscUJBQWdCLEdBQUcsVUFBQyxTQUFzQjtnQkFDdEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7WUFDL0IsQ0FBQyxDQUFDO1lBR0Ysa0JBQWEsR0FBRztnQkFDWixNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDLENBQUM7WUFRRixvQkFBZSxHQUFHLFVBQUMsSUFBZTtnQkFDOUIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1lBR0Ysb0JBQWUsR0FBRyxVQUFDLElBQVU7Z0JBQ3hCLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDO1FBS04sQ0FBQztRQUFELGlDQUFDO0lBQUQsQ0F6REEsQUF5REMsSUFBQTtJQUVELGNBQUcsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQyIsImZpbGUiOiJtb2R1bGUvZHluYW1pY0NvbnRyb2wvZHluYW1pY0NvbnRyb2wuY2FjaGUuZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKiBjcmVhdGUgYnkgenhxXHJcbiAqICBAdGltZTogMjAxNy0wNi0yMlxyXG4gKi9cclxuaW1wb3J0IHthcHB9IGZyb20gXCIuLi9jb21tb24vYXBwL21haW4uYXBwXCI7XHJcblxyXG5kZWNsYXJlIGxldCBhbmd1bGFyIDogYW55O1xyXG5kZWNsYXJlIGxldCB3aW5kb3cgOiBhbnk7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3Rvcnl7XHJcbiAgICAvL+WcsOWbvuW3peWFt+adoVxyXG4gICAgdXBkYXRlQnRuUGFyYW1zIDogKHJlc3VsdCA6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgICBnZXRCdG5QYXJhbXMgOiAoKSA9PiBhbnk7XHJcblxyXG4gICAgLyrmiqXorabmtojmga8qL1xyXG4gICAgZ2V0QWxhcm1EYXRhcyA6ICgpID0+IGFueTtcclxuICAgIHVwZGF0ZUFsYXJtRGF0YXMgOiAoZGF0YUFycmF5IDogQXJyYXk8YW55PikgPT4gdm9pZDtcclxuXHJcbiAgICAvL+WcsOWbvuaRhOWDj+acuuWumuS9jVxyXG4gICAgc2V0Q2FtZXJhTG9jYXRlIDogKGRhdGEgOiBGdW5jdGlvbikgPT4gdm9pZDtcclxuICAgIGdldENhbWVyYUxvY2F0ZSA6IChkYXRhIDogYW55KSA9PiBhbnk7XHJcblxyXG59O1xyXG5cclxuY2xhc3MgRHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnkgaW1wbGVtZW50cyBJRHluYW1pY0NvbnRyb2xDYWNoZUZhY3Rvcnl7XHJcblxyXG4gICAgLyrlnLDlm77lt6XlhbfmnaEqL1xyXG4gICAgLy8g5Y+M5ZCR57uR5a6a5Li6ICBvYmpcclxuICAgIHByaXZhdGUgYnRuUGFyYW1zIDoge1xyXG4gICAgICAgIGlzT3BlbiA6IGJvb2xlYW5cclxuICAgIH07XHJcblxyXG4gICAgLy/mkYTlg4/mnLrlrprkvY1cclxuICAgIHByaXZhdGUgbG9jYXRlT25NYXAgOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvL+eUqOS6juWIneWni+WMluWKqOaAgeabtOaWsOWAvFxyXG4gICAgdXBkYXRlQnRuUGFyYW1zID0gKHJlc3VsdCA6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICBpZihyZXN1bHQpe1xyXG4gICAgICAgICAgICB0aGlzLmJ0blBhcmFtcyA9IHtpc09wZW4gOiB0cnVlfTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUGFyYW1zLmlzT3BlbiA9ICF0aGlzLmJ0blBhcmFtcy5pc09wZW47XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8v5a+55aSW5o+Q5L6b5YC8XHJcbiAgICBnZXRCdG5QYXJhbXMgPSAoKTphbnkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJ0blBhcmFtcztcclxuICAgIH1cclxuICAgIC8q5Zyw5Zu+5bel5YW35p2hKi9cclxuXHJcblxyXG4gICAgLyoqIOaKpeitpua2iOaBryAqKi9cclxuICAgIHByaXZhdGUgYWxhcm1EYXRhcyA6IGFueTtcclxuXHJcbiAgICAvL+WtmOWCqOaKpeitpuaVsOaNrlxyXG4gICAgdXBkYXRlQWxhcm1EYXRhcyA9IChkYXRhQXJyYXkgOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgdGhpcy5hbGFybURhdGFzID0gZGF0YUFycmF5XHJcbiAgICB9O1xyXG5cclxuICAgIC8v6I635Y+W5oql6K2m5pWw5o2uXHJcbiAgICBnZXRBbGFybURhdGFzID0gKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFsYXJtRGF0YXM7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKiDmiqXorabmtojmga8gKiovXHJcblxyXG5cclxuICAgIC8qKioqKiDlnLDlm77mk43kvZwgKioqKi9cclxuXHJcbiAgICAvL+WIneWni+iuvue9ruaRhOWDj+acuuWumuS9jeWcsOWbvueCueS9jeaWueazlVxyXG4gICAgc2V0Q2FtZXJhTG9jYXRlID0gKGRhdGEgOiBGdW5jdGlvbikgPT4ge1xyXG4gICAgICAgIHRoaXMubG9jYXRlT25NYXAgPSBkYXRhO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL+mAmui/h3RyZWXlm57kvKDmlbDmja7osIPnlKjmkYTlg4/mnLrlrprkvY3lnLDlm77mlrnms5VcclxuICAgIGdldENhbWVyYUxvY2F0ZSA9IChkYXRhIDogYW55KSA9PiB7XHJcbiAgICAgICAgIHRoaXMubG9jYXRlT25NYXAoZGF0YSk7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKioqKiog5Zyw5Zu+5pON5L2cICoqKiovXHJcblxyXG59XHJcblxyXG5hcHAuc2VydmljZSgnZHluYW1pY0NvbnRyb2xDYWNoZUZhY3RvcnknLCBEeW5hbWljQ29udHJvbENhY2hlRmFjdG9yeSk7XHJcbiJdfQ==
