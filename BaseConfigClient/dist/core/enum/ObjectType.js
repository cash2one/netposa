define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ;
    exports.ObjectType = {
        Unknown: { value: "Unknown", text: "未知" },
        Area: { value: "Area", text: "区域" },
        Camera: { value: "Camera", text: "摄像机" },
        Wifi: { value: "WiFi", text: "Wi-Fi" },
        RmpGate: { value: "RmpGate", text: "卡口" },
        ElectronicFence: { value: "EFENCE", text: "电子围栏" },
        Person: { value: "Person", text: "人员" },
        SystemPoint: { value: "SystemPoint", text: "点位" },
        StructTask: { value: "StructTask", text: "结构化任务" },
        LampPost: { value: "LampPost", text: "立杆" },
        Vehicle: { value: "Vehicle", text: "车辆" },
        Module: { value: "Module", text: "功能权限" },
        BusinessLib: { value: "BusinessLib", text: "人脸库" },
        IvsTaskGroup: { value: "IvsTaskGroup", text: "布控/抓拍 任务组" },
        WebSocketServer: { value: "WebSocketServer", text: "客户端接收报警服务" },
        SmsServer: { value: "SmsServer", text: "发送短信服务" },
        SoundLightAlarmServer: { value: "SoundLightAlarmServer", text: "声光报警器服务" },
        MsgServer: { value: "MsgServer", text: "推送给消息服务服务" },
        WebChatServer: { value: "WebChatServer", text: "推送给消息服务服务" },
    };
    var _IsMacType = (function () {
        var macType = {};
        macType[exports.ObjectType.Wifi.value] = true;
        macType[exports.ObjectType.ElectronicFence.value] = true;
        return function (type) {
            return (macType[type]);
        };
    })();
    exports.IsMacType = _IsMacType;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudW0vT2JqZWN0VHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUE4QkMsQ0FBQztJQUVXLFFBQUEsVUFBVSxHQUFxQztRQUV4RCxPQUFPLEVBQUUsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7UUFDdkMsSUFBSSxFQUFHLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ2xDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQztRQUN0QyxJQUFJLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUM7UUFDcEMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQ3ZDLGVBQWUsRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQztRQUNoRCxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7UUFDckMsV0FBVyxFQUFFLEVBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBQy9DLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztRQUNuRCxRQUFRLEVBQUUsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUM7UUFFdEMsT0FBTyxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO1FBRXZDLE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQztRQUt2QyxXQUFXLEVBQUUsRUFBQyxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUM7UUFFaEQsWUFBWSxFQUFFLEVBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO1FBTXhELGVBQWUsRUFBRSxFQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFDO1FBQzlELFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQztRQUMvQyxxQkFBcUIsRUFBRSxFQUFDLEtBQUssRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQ3hFLFNBQVMsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztRQUNsRCxhQUFhLEVBQUUsRUFBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUM7S0FDN0QsQ0FBQztJQUNGLElBQUksVUFBVSxHQUFHLENBQUM7UUFDZCxJQUFJLE9BQU8sR0FBRyxFQUE2QixDQUFDO1FBRzVDLE9BQU8sQ0FBQyxrQkFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEMsT0FBTyxDQUFDLGtCQUFVLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUlqRCxNQUFNLENBQUMsVUFBUyxJQUFZO1lBQ3hCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQTtJQUNMLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFTSxRQUFBLFNBQVMsR0FBRyxVQUFvQyxDQUFDIiwiZmlsZSI6ImNvcmUvZW51bS9PYmplY3RUeXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgZGVsbCBvbiAyMDE3LzUvMy5cclxuICovXHJcblxyXG5cclxuaW50ZXJmYWNlIEVudW0ge1xyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIHRleHQ6IHN0cmluZ1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSU9iamVjdFR5cGUge1xyXG4gICAgVW5rbm93bjogRW51bSxcclxuICAgIEFyZWEgOiBFbnVtLFxyXG4gICAgQ2FtZXJhOiBFbnVtLFxyXG4gICAgV2lmaTogRW51bSxcclxuICAgIFJtcEdhdGU6IEVudW0sXHJcbiAgICBFbGVjdHJvbmljRmVuY2U6RW51bSxcclxuICAgIFZlaGljbGU6RW51bSxcclxuICAgIFBlcnNvbjogRW51bSxcclxuICAgIFN5c3RlbVBvaW50OiBFbnVtLFxyXG4gICAgU3RydWN0VGFzazogRW51bSxcclxuICAgIE1vZHVsZTpFbnVtLFxyXG4gICAgQnVzaW5lc3NMaWI6RW51bSxcclxuICAgIEl2c1Rhc2tHcm91cDogRW51bSxcclxuICAgIFdlYlNvY2tldFNlcnZlcjpFbnVtLFxyXG4gICAgU21zU2VydmVyOiBFbnVtLFxyXG4gICAgU291bmRMaWdodEFsYXJtU2VydmVyOiBFbnVtLFxyXG4gICAgTXNnU2VydmVyOkVudW0sXHJcbiAgICBXZWJDaGF0U2VydmVyOiBFbnVtLFxyXG5cdExhbXBQb3N0OiBFbnVtLFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IE9iamVjdFR5cGUgOntba2V5OnN0cmluZ106RW51bX0gJiBJT2JqZWN0VHlwZT0ge1xyXG5cclxuICAgIFVua25vd246IHt2YWx1ZTogXCJVbmtub3duXCIsIHRleHQ6IFwi5pyq55+lXCJ9LFxyXG4gICAgQXJlYSA6IHt2YWx1ZTogXCJBcmVhXCIsIHRleHQ6IFwi5Yy65Z+fXCJ9LFxyXG4gICAgQ2FtZXJhOiB7dmFsdWU6IFwiQ2FtZXJhXCIsIHRleHQ6IFwi5pGE5YOP5py6XCJ9LFxyXG4gICAgV2lmaToge3ZhbHVlOiBcIldpRmlcIiwgdGV4dDogXCJXaS1GaVwifSxcclxuICAgIFJtcEdhdGU6IHt2YWx1ZTogXCJSbXBHYXRlXCIsIHRleHQ6IFwi5Y2h5Y+jXCJ9LFxyXG4gICAgRWxlY3Ryb25pY0ZlbmNlOiB7dmFsdWU6IFwiRUZFTkNFXCIsIHRleHQ6IFwi55S15a2Q5Zu05qCPXCJ9LFxyXG4gICAgUGVyc29uOiB7dmFsdWU6IFwiUGVyc29uXCIsIHRleHQ6IFwi5Lq65ZGYXCJ9LFxyXG4gICAgU3lzdGVtUG9pbnQ6IHt2YWx1ZTogXCJTeXN0ZW1Qb2ludFwiLCB0ZXh0OiBcIueCueS9jVwifSxcclxuICAgIFN0cnVjdFRhc2s6IHt2YWx1ZTogXCJTdHJ1Y3RUYXNrXCIsIHRleHQ6IFwi57uT5p6E5YyW5Lu75YqhXCJ9LFxyXG5cdExhbXBQb3N0OiB7dmFsdWU6IFwiTGFtcFBvc3RcIiwgdGV4dDogXCLnq4vmnYZcIn0sXHJcblxyXG4gICAgVmVoaWNsZToge3ZhbHVlOiBcIlZlaGljbGVcIiwgdGV4dDogXCLovabovoZcIn0sXHJcbiAgICBcclxuICAgIE1vZHVsZToge3ZhbHVlOiBcIk1vZHVsZVwiLCB0ZXh0OiBcIuWKn+iDveadg+mZkFwifSxcclxuICAgIC8qKiBjcmVhdGUgYnkgenhxXHJcbiAgICAgKiAg5Lq66IS45bqTIOadg+mZkOexu+Wei+aYr+eUqFxyXG4gICAgICogQHRpbWU6IDIwMTctMDYtMDggMDk6NTI6MDBcclxuICAgICAqL1xyXG4gICAgQnVzaW5lc3NMaWI6IHt2YWx1ZTogXCJCdXNpbmVzc0xpYlwiLCB0ZXh0OiBcIuS6uuiEuOW6k1wifSxcclxuXHJcbiAgICBJdnNUYXNrR3JvdXA6IHt2YWx1ZTogXCJJdnNUYXNrR3JvdXBcIiwgdGV4dDogXCLluIPmjqcv5oqT5ouNIOS7u+WKoee7hFwifSxcclxuXHJcbiAgICAvKiogY3JlYXRlIGJ5IHp4cVxyXG4gICAgICogIOeUqOaItyB0X2V2ZW50X3JvbGVfYWN0aW9uIOS4reeahCBPYmplY3RfVHlwZVxyXG4gICAgICogQHRpbWU6IDIwMTctMDctMDcgMTI6MDE6NDVcclxuICAgICAqL1xyXG4gICAgV2ViU29ja2V0U2VydmVyOiB7dmFsdWU6IFwiV2ViU29ja2V0U2VydmVyXCIsIHRleHQ6IFwi5a6i5oi356uv5o6l5pS25oql6K2m5pyN5YqhXCJ9LFxyXG4gICAgU21zU2VydmVyOiB7dmFsdWU6IFwiU21zU2VydmVyXCIsIHRleHQ6IFwi5Y+R6YCB55+t5L+h5pyN5YqhXCJ9LFxyXG4gICAgU291bmRMaWdodEFsYXJtU2VydmVyOiB7dmFsdWU6IFwiU291bmRMaWdodEFsYXJtU2VydmVyXCIsIHRleHQ6IFwi5aOw5YWJ5oql6K2m5Zmo5pyN5YqhXCJ9LFxyXG4gICAgTXNnU2VydmVyOiB7dmFsdWU6IFwiTXNnU2VydmVyXCIsIHRleHQ6IFwi5o6o6YCB57uZ5raI5oGv5pyN5Yqh5pyN5YqhXCJ9LFxyXG4gICAgV2ViQ2hhdFNlcnZlcjoge3ZhbHVlOiBcIldlYkNoYXRTZXJ2ZXJcIiwgdGV4dDogXCLmjqjpgIHnu5nmtojmga/mnI3liqHmnI3liqFcIn0sXHJcbn07XHJcbmxldCBfSXNNYWNUeXBlID0gKGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgbWFjVHlwZSA9IHt9IGFzIHtba2V5OnN0cmluZ106IGJvb2xlYW59O1xyXG5cclxuICAgIC8vIHdpZmkg5ZKMIOeUteWtkOWbtOagj+aYr21hY+exu+Wei1xyXG4gICAgbWFjVHlwZVtPYmplY3RUeXBlLldpZmkudmFsdWVdID0gdHJ1ZTtcclxuICAgIG1hY1R5cGVbT2JqZWN0VHlwZS5FbGVjdHJvbmljRmVuY2UudmFsdWVdID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgLy8g6Zet5YyFLOacgOe7iOS9nOS4uuWHveaVsOi/lOWbnlxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHR5cGU6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICAgICAgcmV0dXJuIChtYWNUeXBlW3R5cGVdKTtcclxuICAgIH1cclxufSkoKTtcclxuXHJcbmV4cG9ydCBsZXQgSXNNYWNUeXBlID0gX0lzTWFjVHlwZSBhcyAodHlwZTpzdHJpbmcpPT5ib29sZWFuOyJdfQ==