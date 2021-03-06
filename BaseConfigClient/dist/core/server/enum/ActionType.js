define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ActionType = {
        Unknow: { value: "Unknow", text: "未知" },
        SendAlarmToClient: { value: "SendAlarmToClient", text: "客户端接收报警" },
        SendSms: { value: "SendSms", text: "发送短信" },
        CommandSoundLightAlarm: { value: "CommandSoundLightAlarm", text: "声光报警器" },
        SendAlarmToMsgServer: { value: "SendAlarmToMsgServer", text: "推送给消息服务" },
        SendAlarmToWebChat: { value: "SendAlarmToWebChat", text: "微信推送" },
    };
    var EnumCheckEx = (function () {
        function EnumCheckEx(treeID) {
            this.treeId = treeID ? treeID : null;
            this.isShrink = false;
            this.isCheck = false;
        }
        return EnumCheckEx;
    }());
    exports.EnumCheckEx = EnumCheckEx;
    exports.ActionTypeMap = {
        Unknow: new EnumCheckEx(),
        SendAlarmToClient: new EnumCheckEx(),
        SendSms: new EnumCheckEx(),
        CommandSoundLightAlarm: new EnumCheckEx(),
        SendAlarmToMsgServer: new EnumCheckEx(),
        SendAlarmToWebChat: new EnumCheckEx()
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL3NlcnZlci9lbnVtL0FjdGlvblR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBb0JhLFFBQUEsVUFBVSxHQUFxRTtRQUV4RixNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7UUFDckMsaUJBQWlCLEVBQUUsRUFBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUNoRSxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUM7UUFDekMsc0JBQXNCLEVBQUUsRUFBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztRQUN4RSxvQkFBb0IsRUFBRSxFQUFDLEtBQUssRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQ3RFLGtCQUFrQixFQUFFLEVBQUMsS0FBSyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUM7S0FDbEUsQ0FBQztJQUVGO1FBT0kscUJBQVksTUFBZTtZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FaQSxBQVlDLElBQUE7SUFaWSxrQ0FBVztJQXVCWCxRQUFBLGFBQWEsR0FBb0Q7UUFDMUUsTUFBTSxFQUFFLElBQUksV0FBVyxFQUFFO1FBQ3pCLGlCQUFpQixFQUFFLElBQUksV0FBVyxFQUFFO1FBQ3BDLE9BQU8sRUFBRSxJQUFJLFdBQVcsRUFBRTtRQUMxQixzQkFBc0IsRUFBRSxJQUFJLFdBQVcsRUFBRTtRQUN6QyxvQkFBb0IsRUFBRSxJQUFJLFdBQVcsRUFBRTtRQUN2QyxrQkFBa0IsRUFBRSxJQUFJLFdBQVcsRUFBRTtLQUN4QyxDQUFDIiwiZmlsZSI6ImNvcmUvc2VydmVyL2VudW0vQWN0aW9uVHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RW51bX0gZnJvbSBcIi4uLy4uL2VudW0vRW51bVwiO1xyXG5cclxuLyoqXHJcbiAqIOS7u+WKoeadg+mZkOaemuS4vlxyXG4gKiBAdGltZTogMjAxNy0wNi0wNSAxMTo1MzoxN1xyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuXHJcblxyXG5pbnRlcmZhY2UgSUFjdGlvblR5cGUge1xyXG4gICAgVW5rbm93OiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9O1xyXG4gICAgU2VuZEFsYXJtVG9DbGllbnQ6IHsgdmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nIH07XHJcbiAgICBTZW5kU21zOiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9O1xyXG4gICAgQ29tbWFuZFNvdW5kTGlnaHRBbGFybTogeyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfTtcclxuICAgIFNlbmRBbGFybVRvTXNnU2VydmVyOiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9O1xyXG4gICAgU2VuZEFsYXJtVG9XZWJDaGF0OiB7IHZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyB9O1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEFjdGlvblR5cGU6IHsgW2tleTogc3RyaW5nXTogeyB2YWx1ZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcgfSB9ICYgSUFjdGlvblR5cGUgPSB7XHJcblxyXG4gICAgVW5rbm93OiB7dmFsdWU6IFwiVW5rbm93XCIsIHRleHQ6IFwi5pyq55+lXCJ9LFxyXG4gICAgU2VuZEFsYXJtVG9DbGllbnQ6IHt2YWx1ZTogXCJTZW5kQWxhcm1Ub0NsaWVudFwiLCB0ZXh0OiBcIuWuouaIt+err+aOpeaUtuaKpeitplwifSxcclxuICAgIFNlbmRTbXM6IHt2YWx1ZTogXCJTZW5kU21zXCIsIHRleHQ6IFwi5Y+R6YCB55+t5L+hXCJ9LFxyXG4gICAgQ29tbWFuZFNvdW5kTGlnaHRBbGFybToge3ZhbHVlOiBcIkNvbW1hbmRTb3VuZExpZ2h0QWxhcm1cIiwgdGV4dDogXCLlo7DlhYnmiqXorablmahcIn0sXHJcbiAgICBTZW5kQWxhcm1Ub01zZ1NlcnZlcjoge3ZhbHVlOiBcIlNlbmRBbGFybVRvTXNnU2VydmVyXCIsIHRleHQ6IFwi5o6o6YCB57uZ5raI5oGv5pyN5YqhXCJ9LFxyXG4gICAgU2VuZEFsYXJtVG9XZWJDaGF0OiB7dmFsdWU6IFwiU2VuZEFsYXJtVG9XZWJDaGF0XCIsIHRleHQ6IFwi5b6u5L+h5o6o6YCBXCJ9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIEVudW1DaGVja0V4IGltcGxlbWVudHMgRW51bSB7XHJcbiAgICB2YWx1ZTogYW55O1xyXG4gICAgdGV4dDogc3RyaW5nO1xyXG4gICAgaXNDaGVjazogYm9vbGVhbjtcclxuICAgIGlzU2hyaW5rOiBib29sZWFuO1xyXG4gICAgdHJlZUlkOiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRyZWVJRD86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudHJlZUlkID0gdHJlZUlEID8gdHJlZUlEIDogbnVsbDtcclxuICAgICAgICB0aGlzLmlzU2hyaW5rID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0NoZWNrID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvblR5cGVNYXAge1xyXG4gICAgVW5rbm93OiBFbnVtQ2hlY2tFeFxyXG4gICAgU2VuZEFsYXJtVG9DbGllbnQ6IEVudW1DaGVja0V4XHJcbiAgICBTZW5kU21zOiBFbnVtQ2hlY2tFeFxyXG4gICAgQ29tbWFuZFNvdW5kTGlnaHRBbGFybTogRW51bUNoZWNrRXhcclxuICAgIFNlbmRBbGFybVRvTXNnU2VydmVyOiBFbnVtQ2hlY2tFeFxyXG4gICAgU2VuZEFsYXJtVG9XZWJDaGF0OiBFbnVtQ2hlY2tFeFxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQWN0aW9uVHlwZU1hcDogeyBba2V5OiBzdHJpbmddOiBFbnVtQ2hlY2tFeCB9ICYgSUFjdGlvblR5cGVNYXAgPSB7XHJcbiAgICBVbmtub3c6IG5ldyBFbnVtQ2hlY2tFeCgpLFxyXG4gICAgU2VuZEFsYXJtVG9DbGllbnQ6IG5ldyBFbnVtQ2hlY2tFeCgpLFxyXG4gICAgU2VuZFNtczogbmV3IEVudW1DaGVja0V4KCksXHJcbiAgICBDb21tYW5kU291bmRMaWdodEFsYXJtOiBuZXcgRW51bUNoZWNrRXgoKSxcclxuICAgIFNlbmRBbGFybVRvTXNnU2VydmVyOiBuZXcgRW51bUNoZWNrRXgoKSxcclxuICAgIFNlbmRBbGFybVRvV2ViQ2hhdDogbmV3IEVudW1DaGVja0V4KClcclxufTsiXX0=
