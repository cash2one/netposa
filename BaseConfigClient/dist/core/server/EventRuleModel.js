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
    var EventRuleModel = (function () {
        function EventRuleModel() {
        }
        return EventRuleModel;
    }());
    exports.EventRuleModel = EventRuleModel;
    var EventRuleModelEx = (function (_super) {
        __extends(EventRuleModelEx, _super);
        function EventRuleModelEx() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventRuleModelEx;
    }(EventRuleModel));
    exports.EventRuleModelEx = EventRuleModelEx;
    var EventRuleTriggerModel = (function () {
        function EventRuleTriggerModel() {
        }
        return EventRuleTriggerModel;
    }());
    exports.EventRuleTriggerModel = EventRuleTriggerModel;
    var EventRuleTriggerModelEx = (function (_super) {
        __extends(EventRuleTriggerModelEx, _super);
        function EventRuleTriggerModelEx() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EventRuleTriggerModelEx;
    }(EventRuleTriggerModel));
    exports.EventRuleTriggerModelEx = EventRuleTriggerModelEx;
    var EventRuleActionModel = (function () {
        function EventRuleActionModel() {
        }
        return EventRuleActionModel;
    }());
    exports.EventRuleActionModel = EventRuleActionModel;
    var CommandSoundLightAlarmActionExt = (function (_super) {
        __extends(CommandSoundLightAlarmActionExt, _super);
        function CommandSoundLightAlarmActionExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CommandSoundLightAlarmActionExt;
    }(EventRuleActionModel));
    exports.CommandSoundLightAlarmActionExt = CommandSoundLightAlarmActionExt;
    var SendAlarmToClientActionExt = (function (_super) {
        __extends(SendAlarmToClientActionExt, _super);
        function SendAlarmToClientActionExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SendAlarmToClientActionExt;
    }(EventRuleActionModel));
    exports.SendAlarmToClientActionExt = SendAlarmToClientActionExt;
    var SendSmsMessageActionExt = (function (_super) {
        __extends(SendSmsMessageActionExt, _super);
        function SendSmsMessageActionExt() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SendSmsMessageActionExt;
    }(EventRuleActionModel));
    exports.SendSmsMessageActionExt = SendSmsMessageActionExt;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9FdmVudFJ1bGVNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBTUE7UUFPSTtRQUVBLENBQUM7UUFDTCxxQkFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksd0NBQWM7SUFZM0I7UUFBc0Msb0NBQWM7UUFBcEQ7O1FBSUEsQ0FBQztRQUFELHVCQUFDO0lBQUQsQ0FKQSxBQUlDLENBSnFDLGNBQWMsR0FJbkQ7SUFKWSw0Q0FBZ0I7SUFNN0I7UUFzQkk7UUFFQSxDQUFDO1FBQ0wsNEJBQUM7SUFBRCxDQXpCQSxBQXlCQyxJQUFBO0lBekJZLHNEQUFxQjtJQTJCbEM7UUFBNkMsMkNBQXFCO1FBQWxFOztRQUlBLENBQUM7UUFBRCw4QkFBQztJQUFELENBSkEsQUFJQyxDQUo0QyxxQkFBcUIsR0FJakU7SUFKWSwwREFBdUI7SUFNcEM7UUEyQkk7UUFFQSxDQUFDO1FBQ0wsMkJBQUM7SUFBRCxDQTlCQSxBQThCQyxJQUFBO0lBOUJZLG9EQUFvQjtJQWtDakM7UUFBcUQsbURBQW9CO1FBQXpFOztRQUtBLENBQUM7UUFBRCxzQ0FBQztJQUFELENBTEEsQUFLQyxDQUxvRCxvQkFBb0IsR0FLeEU7SUFMWSwwRUFBK0I7SUFTNUM7UUFBZ0QsOENBQW9CO1FBQXBFOztRQVNBLENBQUM7UUFBRCxpQ0FBQztJQUFELENBVEEsQUFTQyxDQVQrQyxvQkFBb0IsR0FTbkU7SUFUWSxnRUFBMEI7SUFjdkM7UUFBNkMsMkNBQW9CO1FBQWpFOztRQWNBLENBQUM7UUFBRCw4QkFBQztJQUFELENBZEEsQUFjQyxDQWQ0QyxvQkFBb0IsR0FjaEU7SUFkWSwwREFBdUIiLCJmaWxlIjoiY29yZS9zZXJ2ZXIvRXZlbnRSdWxlTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogY3JlYXRlIGJ5IHp4cVxyXG4gKiAg5LqL5Lu26IGU5Yqo6KeE5YiZ55u45YWzXHJcbiAqIEB0aW1lOiAyMDE3LTA2LTIxIDE0OjUwOjE4XHJcbiAqL1xyXG5cclxuLy8g5LqL5Lu26KeE5YiZXHJcbmV4cG9ydCBjbGFzcyBFdmVudFJ1bGVNb2RlbHtcclxuICAgIElEOnN0cmluZztcclxuICAgIE5hbWU6c3RyaW5nO1xyXG4gICAgRGVzY3JpcHRpb246c3RyaW5nO1xyXG4gICAgRGlzYWJsZWQ6Ym9vbGVhbjtcclxuICAgIFRpbWVUZW1wbGF0ZUlEOnN0cmluZztcclxuICAgIEV4dDpzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50UnVsZU1vZGVsRXggZXh0ZW5kcyBFdmVudFJ1bGVNb2RlbHtcclxuICAgIEpzb25Vc2VyRGF0YTp7XHJcbiAgICAgICAgTGlzdEV2ZW50VHJpZ2dlcjpBcnJheTxFdmVudFJ1bGVUcmlnZ2VyTW9kZWw+O1xyXG4gICAgfTtcclxufVxyXG4vLyDkuovku7bop4TliJkg5a+55bqUIOinpuWPkeWZqFxyXG5leHBvcnQgY2xhc3MgRXZlbnRSdWxlVHJpZ2dlck1vZGVse1xyXG4gICAgSUQ6c3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPogZQg5LqL5Lu26KeE5YiZIOexu+Wei0lEXHJcbiAgICAgKi9cclxuICAgIE9iamVjdElEOnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5YWz6IGUIOS6i+S7tuinhOWImSDnsbvlnosg77yIT2JqZWN0VHlwZSDmnprkuL7vvIlcclxuICAgICAqL1xyXG4gICAgT2JqZWN0VHlwZTpzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tuinhOWImUlEXHJcbiAgICAgKi9cclxuICAgIEV2ZW50UnVsZUlEOnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5LqL5Lu26KeE5YiZ57G75Z6LXHJcbiAgICAgKi9cclxuICAgIEV2ZW50VHlwZTpzdHJpbmc7XHJcbiAgICAvLyDpgLvovpFcclxuICAgIExvZ2ljOnN0cmluZztcclxuXHJcbiAgICBFeHQ6c3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudFJ1bGVUcmlnZ2VyTW9kZWxFeCBleHRlbmRzIEV2ZW50UnVsZVRyaWdnZXJNb2RlbHtcclxuICAgIEpzb25Vc2VyRGF0YTp7XHJcbiAgICAgICAgTGlzdEV2ZW50UnVsZUFjdGlvbjpBcnJheTxFdmVudFJ1bGVBY3Rpb25Nb2RlbD47XHJcbiAgICB9O1xyXG59XHJcbi8vIOS6i+S7tua0u+WKqOWGheWuuVxyXG5leHBvcnQgY2xhc3MgRXZlbnRSdWxlQWN0aW9uTW9kZWx7XHJcbiAgICBJRDpzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIOS6i+S7tuinhOWImSDmtLvliqjnsbvlnovvvIhBY3Rpb25UeXBlIOaemuS4vu+8iVxyXG4gICAgICovXHJcbiAgICBBY3Rpb25UeXBlOnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5LqL5Lu26KeE5YiZSURcclxuICAgICAqL1xyXG4gICAgRXZlbnRSdWxlSUQ6c3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuovku7bop4TliJnop6blj5HlmahJRFxyXG4gICAgICovXHJcbiAgICBFdmVudFJ1bGVUcmlnZ2VySUQ6c3RyaW5nO1xyXG4gICAgLyoqVE9ETyDmnKrnn6XvvIjlop7mlLnku7vliqHogZTliqjkuovku7Yg5YmN56uv5pyq55So5Yiw77yJIGJ5IHp4cVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgT2JqZWN0SUQ6c3RyaW5nO1xyXG4gICAgLyoqVE9ETyDmnKrnn6XvvIjlop7mlLnku7vliqHogZTliqjkuovku7Yg5YmN56uv5pyq55So5Yiw77yJIGJ5IHp4cVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgT2JqZWN0VHlwZTpzdHJpbmc7XHJcblxyXG4gICAgT3JkZXJObzogbnVtYmVyO1xyXG5cclxuICAgIEV4dDpzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIOWjsOWFieaKpeitpuiBlOWKqOS6i+S7tuWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENvbW1hbmRTb3VuZExpZ2h0QWxhcm1BY3Rpb25FeHQgZXh0ZW5kcyBFdmVudFJ1bGVBY3Rpb25Nb2RlbHtcclxuICAgIC8qKlxyXG4gICAgICog5oql6K2m6YCa6YGT5Y+35L+h5oGv6ZuGXHJcbiAgICAgKi9cclxuICAgIENoYW5uZWxOb0xpc3Q6QXJyYXk8bnVtYmVyPjtcclxufVxyXG4vKipcclxuICog5Y+R6YCB5oql6K2m5Yiw5a6i5oi356uvIOiBlOWKqOS6i+S7tuWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbmRBbGFybVRvQ2xpZW50QWN0aW9uRXh0IGV4dGVuZHMgRXZlbnRSdWxlQWN0aW9uTW9kZWx7XHJcbiAgICAvKipcclxuICAgICAqIOaOpeaUtueUqOaIt0lE5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIFJlY2lldmVVc2VySURMaXN0OkFycmF5PHN0cmluZz47XHJcbiAgICAvKipUT0RPIOacquefpe+8iOWinuaUueS7u+WKoeiBlOWKqOS6i+S7tiDliY3nq6/mnKrnlKjliLDvvIkgYnkgenhxXHJcbiAgICAgKiDmjqXmlLbmnLrmnoRJROWIl+ihqFxyXG4gICAgICovXHJcbiAgICBSZWNpZXZlVW5pdElETGlzdDpBcnJheTxzdHJpbmc+O1xyXG59XHJcblxyXG4vKipcclxuICog5Y+R6YCB55+t5L+h5omp5bGV5Y+C5pWwIOiBlOWKqOS6i+S7tuWPguaVsFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFNlbmRTbXNNZXNzYWdlQWN0aW9uRXh0IGV4dGVuZHMgRXZlbnRSdWxlQWN0aW9uTW9kZWx7XHJcbiAgICAvKipcclxuICAgICAqIOefreS/oeWGheWuuVxyXG4gICAgICovXHJcbiAgICBUZXh0OnN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICog5o6l5pS25Lq65ZGYSUTliJfooahcclxuICAgICAqL1xyXG4gICAgUmVjaWV2ZVBlcnNvbklETGlzdDpBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIC8qKiAgVE9ETyDmnKrnn6XvvIjlop7mlLnku7vliqHogZTliqjkuovku7Yg5YmN56uv5pyq55So5Yiw77yJIGJ5IHp4cVxyXG4gICAgICog5o6l5pS25py65p6ESUTliJfooahcclxuICAgICAqL1xyXG4gICAgUmVjaWV2ZVVuaXRJRExpc3Q6QXJyYXk8c3RyaW5nPjtcclxufSJdfQ==
