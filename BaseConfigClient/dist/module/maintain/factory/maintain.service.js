define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CameraResponse = (function () {
        function CameraResponse() {
        }
        return CameraResponse;
    }());
    exports.CameraResponse = CameraResponse;
    var CameraNum = (function () {
        function CameraNum() {
        }
        return CameraNum;
    }());
    exports.CameraNum = CameraNum;
    var CameraMsg = (function () {
        function CameraMsg() {
        }
        return CameraMsg;
    }());
    exports.CameraMsg = CameraMsg;
    var CameraJsonUserData = (function () {
        function CameraJsonUserData() {
        }
        return CameraJsonUserData;
    }());
    var exportResponse = (function () {
        function exportResponse() {
        }
        return exportResponse;
    }());
    exports.exportResponse = exportResponse;
    var ServerResponse = (function () {
        function ServerResponse() {
        }
        return ServerResponse;
    }());
    exports.ServerResponse = ServerResponse;
    var UserResponse = (function () {
        function UserResponse() {
        }
        return UserResponse;
    }());
    exports.UserResponse = UserResponse;
    var UserJsonUserData = (function () {
        function UserJsonUserData() {
        }
        return UserJsonUserData;
    }());
    exports.UserJsonUserData = UserJsonUserData;
    var ActionLogResponse = (function () {
        function ActionLogResponse() {
        }
        return ActionLogResponse;
    }());
    exports.ActionLogResponse = ActionLogResponse;
    var ActionLogJsonUserData = (function () {
        function ActionLogJsonUserData() {
        }
        return ActionLogJsonUserData;
    }());
    exports.ActionLogJsonUserData = ActionLogJsonUserData;
    var RunLogResponse = (function () {
        function RunLogResponse() {
        }
        return RunLogResponse;
    }());
    exports.RunLogResponse = RunLogResponse;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGUvbWFpbnRhaW4vZmFjdG9yeS9tYWludGFpbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUtBO1FBQUE7UUFXQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQVhZLHdDQUFjO0lBYTNCO1FBQUE7UUFHQSxDQUFDO1FBQUQsZ0JBQUM7SUFBRCxDQUhBLEFBR0MsSUFBQTtJQUhZLDhCQUFTO0lBS3RCO1FBQUE7UUFVQSxDQUFDO1FBQUQsZ0JBQUM7SUFBRCxDQVZBLEFBVUMsSUFBQTtJQVZZLDhCQUFTO0lBWXRCO1FBQUE7UUFPQSxDQUFDO1FBQUQseUJBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQUtEO1FBQUE7UUFFQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQUZBLEFBRUMsSUFBQTtJQUZZLHdDQUFjO0lBTzNCO1FBQUE7UUFpQkEsQ0FBQztRQUFELHFCQUFDO0lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtJQWpCWSx3Q0FBYztJQXNCM0I7UUFBQTtRQVNBLENBQUM7UUFBRCxtQkFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksb0NBQVk7SUFZekI7UUFBQTtRQWVBLENBQUM7UUFBRCx1QkFBQztJQUFELENBZkEsQUFlQyxJQUFBO0lBZlksNENBQWdCO0lBb0I3QjtRQUFBO1FBVUEsQ0FBQztRQUFELHdCQUFDO0lBQUQsQ0FWQSxBQVVDLElBQUE7SUFWWSw4Q0FBaUI7SUFhOUI7UUFBQTtRQUtBLENBQUM7UUFBRCw0QkFBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksc0RBQXFCO0lBU2xDO1FBQUE7UUFTQSxDQUFDO1FBQUQscUJBQUM7SUFBRCxDQVRBLEFBU0MsSUFBQTtJQVRZLHdDQUFjIiwiZmlsZSI6Im1vZHVsZS9tYWludGFpbi9mYWN0b3J5L21haW50YWluLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSB0aiBvbiAyMDE3LzYvMjguXHJcbiAqL1xyXG5cclxuLy/mkYTlg4/mnLrorr7lpIfov5Tlm57lgLxcclxuZXhwb3J0IGNsYXNzIENhbWVyYVJlc3BvbnNlIHtcclxuICAgIC8v5pGE5YOP57G75Z6LXHJcbiAgICBjYW1lcmFUeXBlOiBBcnJheTxDYW1lcmFOdW0+O1xyXG4gICAgLy/mgLvmlbBcclxuICAgIHRvdGFsOm51bWJlcjtcclxuICAgIC8v56a757q/XHJcbiAgICBvZmZUb3RhbDogbnVtYmVyO1xyXG4gICAgLy/lnKjnur9cclxuICAgIG9ubGluZVRvdGFsOm51bWJlcjtcclxuICAgIC8v6K6+5aSH5omA5Zyo5Yy65Z+f6K+m5oOFXHJcbiAgICBkYXRhOkFycmF5PENhbWVyYU1zZz47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYW1lcmFOdW0ge1xyXG4gICAgdHlwZU5hbWU6c3RyaW5nO1xyXG4gICAgY291bnQ6bnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FtZXJhTXNnIHtcclxuICAgIC8v5Yy65Z+faWRcclxuICAgIEFyZWFJRDpzdHJpbmc7XHJcbiAgICAvL+aRhOWDj+exu+Wei1xyXG4gICAgQ2FtZXJhVHlwZTpzdHJpbmc7XHJcbiAgICAvL+iuvuWkh+WQjVxyXG4gICAgTmFtZTpzdHJpbmc7XHJcbiAgICAvL+mAmumBk1xyXG4gICAgUGxheU5hbWU6c3RyaW5nO1xyXG4gICAgSnNvblVzZXJEYXRhOkNhbWVyYUpzb25Vc2VyRGF0YTtcclxufVxyXG5cclxuY2xhc3MgQ2FtZXJhSnNvblVzZXJEYXRhe1xyXG4gICAgLy/ljLrln5/lkI1cclxuICAgIEFyZWFOYW1lOnN0cmluZztcclxuICAgIC8v54q25oCBXHJcbiAgICBJc09uTGluZTpzdHJpbmc7XHJcbiAgICAvL+inhumikeacjeWKoeWZqGlwXHJcbiAgICBWaWRlb1NlcnZlcklwOnN0cmluZztcclxufVxyXG5cclxuLyo9PT09PT09PT09PT09PSovXHJcblxyXG4vL+WvvOWHuui/lOWbnuWAvFxyXG5leHBvcnQgY2xhc3MgZXhwb3J0UmVzcG9uc2V7XHJcbiAgICBmaWxlUGF0aDpzdHJpbmc7XHJcbn1cclxuXHJcbi8qPT09PT09PT09PT09PT0qL1xyXG5cclxuLy/mnI3liqHlmajov5Tlm57lgLxcclxuZXhwb3J0IGNsYXNzIFNlcnZlclJlc3BvbnNlIHtcclxuICAgIC8v5pyN5Yqh5Zmo5ZCNXHJcbiAgICBOYW1lOnN0cmluZztcclxuICAgIC8v5pyN5Yqh5Zmo57G75Z6LXHJcbiAgICBTZXJ2ZXJUeXBlOnN0cmluZztcclxuICAgIC8v5pyN5Yqh5ZmoaXBcclxuICAgIElwQWRkcmVzczpzdHJpbmc7XHJcbiAgICAvL+WMuuWfn+WQjVxyXG4gICAgQXJlYU5hbWU6c3RyaW5nO1xyXG4gICAgLy9jcHVcclxuICAgIENwdTpzdHJpbmc7XHJcbiAgICAvL+WGheWtmFxyXG4gICAgTWVtb3J5OnN0cmluZztcclxuICAgIC8v572R57uc5L2/55So5oOF5Ya1XHJcbiAgICBOZXRXb3JrU3BlZWQ6c3RyaW5nO1xyXG4gICAgLy/nirbmgIFcclxuICAgIElzT25MaW5lOnN0cmluZztcclxufVxyXG5cclxuLyo9PT09PT09PT09PT09PSovXHJcblxyXG4vL+eUqOaIt+i/lOWbnuWAvFxyXG5leHBvcnQgY2xhc3MgVXNlclJlc3BvbnNlIHtcclxuICAgIC8v55So5oi357G75Z6LXHJcbiAgICBVc2VyVHlwZTogc3RyaW5nO1xyXG4gICAgLy/mnIDov5HnmbvlvZXml7bpl7RcclxuICAgIExhc3RMb2dpblRpbWU6c3RyaW5nO1xyXG4gICAgLy/ljLrln59pZFxyXG4gICAgSUQ6c3RyaW5nO1xyXG4gICAgLy/nlKjmiLfor6bmg4VcclxuICAgIEpzb25Vc2VyRGF0YTpVc2VySnNvblVzZXJEYXRhO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJKc29uVXNlckRhdGF7XHJcbiAgICAvL+WMuuWfn+WQjVxyXG4gICAgQXJlYU5hbWU6c3RyaW5nO1xyXG4gICAgLy/nlKjmiLflkI1cclxuICAgIFBlcnNvbk5hbWU6c3RyaW5nO1xyXG4gICAgLy/ljZXkvY3lkI1cclxuICAgIFVuaXROYW1lOnN0cmluZztcclxuICAgIC8v55m75b2VSVBcclxuICAgIExvZ2luSXA6c3RyaW5nO1xyXG4gICAgLy/nirbmgIFcclxuICAgIElzT25MaW5lOnN0cmluZztcclxuICAgIC8v5pyA6L+R5p+l55yL5qih5Z2XXHJcbiAgICBMb29rTW9kdWxlOnN0cmluZztcclxuICAgIC8v55m75b2V54q25oCBXHJcbiAgICBJc09ubGluZTpzdHJpbmc7XHJcbn1cclxuXHJcbi8qPT09PT09PT09PT09PT0qL1xyXG5cclxuLy/mk43kvZzml6Xlv5fov5Tlm57lgLxcclxuZXhwb3J0IGNsYXNzIEFjdGlvbkxvZ1Jlc3BvbnNlIHtcclxuICAgIC8v6K6w5b2V5pe26Ze0XHJcbiAgICBPcGVyYXRvclRpbWU6IHN0cmluZztcclxuICAgIC8vSVDlnLDlnYBcclxuICAgIE9wZXJhdG9ySVA6c3RyaW5nO1xyXG4gICAgLy/mk43kvZzmqKHlnZdcclxuICAgIE9wZXJhdG9yTW9kdWxlOnN0cmluZztcclxuICAgIC8v5pON5L2c6K+m5oOFXHJcbiAgICBEZXNjcnB0aW9uOnN0cmluZztcclxuICAgIEpzb25Vc2VyRGF0YTpBY3Rpb25Mb2dKc29uVXNlckRhdGE7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQWN0aW9uTG9nSnNvblVzZXJEYXRhe1xyXG4gICAgLy/mk43kvZzkurpcclxuICAgIE9wZXJhdG9yVXNlck5hbWU6c3RyaW5nO1xyXG4gICAgLy/ljZXkvY3lkI1cclxuICAgIFVuaXROYW1lOnN0cmluZztcclxufVxyXG4vKj09PT09PT09PT09PT09Ki9cclxuXHJcbi8v5pON5L2c5pel5b+X6L+U5Zue5YC8XHJcbmV4cG9ydCBjbGFzcyBSdW5Mb2dSZXNwb25zZSB7XHJcbiAgICAvL+iusOW9leaXtumXtFxyXG4gICAgRXhjZXB0aW9uVGltZTogc3RyaW5nO1xyXG4gICAgLy9JUOWcsOWdgFxyXG4gICAgRXhjZXB0aW9uU2VydmVySVA6c3RyaW5nO1xyXG4gICAgLy/lvILluLjmqKHlnZdcclxuICAgIEV4Y2VwdGlvbk1vZHVsZTpzdHJpbmc7XHJcbiAgICAvL+ivpuaDhVxyXG4gICAgRXhjZXB0aW9uTWVzc2FnZTpzdHJpbmc7XHJcbn1cclxuIl19
