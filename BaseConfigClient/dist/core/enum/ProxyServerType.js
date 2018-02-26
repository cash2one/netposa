define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProxyServerType = {
        PCC: {
            value: "PCC",
            text: "PCC接入服务",
            index: 20016
        },
        SoundLightAlarm: {
            value: "SoundLightAlarm",
            text: "声光报警接入服务",
            index: 20026
        },
        SMS: {
            value: "SMS",
            text: "短信猫接入服务",
            index: 20036
        },
        MSG: {
            value: "MSG",
            text: "消息接入服务",
            index: 20046
        },
        VideoServer: {
            value: "VideoServer",
            text: "视频接入服务",
            index: 20056
        },
        IOD: {
            value: "IOD",
            text: "数据服务器",
            index: 20066
        }
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudW0vUHJveHlTZXJ2ZXJUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQWtCYSxRQUFBLGVBQWUsR0FBNEQ7UUFDcEYsR0FBRyxFQUFDO1lBQ0EsS0FBSyxFQUFDLEtBQUs7WUFDWCxJQUFJLEVBQUMsU0FBUztZQUNkLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxlQUFlLEVBQUM7WUFDWixLQUFLLEVBQUMsaUJBQWlCO1lBQ3ZCLElBQUksRUFBQyxVQUFVO1lBQ2YsS0FBSyxFQUFDLEtBQUs7U0FDZDtRQUNELEdBQUcsRUFBQztZQUNBLEtBQUssRUFBQyxLQUFLO1lBQ1gsSUFBSSxFQUFDLFNBQVM7WUFDZCxLQUFLLEVBQUMsS0FBSztTQUNkO1FBQ0QsR0FBRyxFQUFDO1lBQ0EsS0FBSyxFQUFDLEtBQUs7WUFDWCxJQUFJLEVBQUMsUUFBUTtZQUNiLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxXQUFXLEVBQUM7WUFDUixLQUFLLEVBQUMsYUFBYTtZQUNuQixJQUFJLEVBQUMsUUFBUTtZQUNiLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxHQUFHLEVBQUM7WUFDQSxLQUFLLEVBQUMsS0FBSztZQUNYLElBQUksRUFBQyxPQUFPO1lBQ1osS0FBSyxFQUFDLEtBQUs7U0FDZDtLQUNKLENBQUMiLCJmaWxlIjoiY29yZS9lbnVtL1Byb3h5U2VydmVyVHlwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiAg5Luj55CG5pyN5Yqh5Zmo57G75Z6LXHJcbiAqIEB0aW1lOiAyMDE3LTA1LTA0IDE1OjM0OjE3XHJcbiAqIEBwYXJhbXM6XHJcbiAqIEByZXR1cm46XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElQcm94eVNlcnZlclR5cGVFbnVtIHtcclxuICAgIHZhbHVlOnN0cmluZyxcclxuICAgIHRleHQ6c3RyaW5nLFxyXG4gICAgaW5kZXg6bnVtYmVyXHJcbn1cclxuaW50ZXJmYWNlIElQcm94eVNlcnZlclR5cGV7XHJcbiAgICBQQ0M6SVByb3h5U2VydmVyVHlwZUVudW07XHJcbiAgICBTb3VuZExpZ2h0QWxhcm06SVByb3h5U2VydmVyVHlwZUVudW07XHJcbiAgICBTTVM6SVByb3h5U2VydmVyVHlwZUVudW07XHJcbiAgICBNU0c6SVByb3h5U2VydmVyVHlwZUVudW07XHJcbiAgICBWaWRlb1NlcnZlcjpJUHJveHlTZXJ2ZXJUeXBlRW51bTtcclxufVxyXG5leHBvcnQgY29uc3QgUHJveHlTZXJ2ZXJUeXBlOntba2V5OiBzdHJpbmddOiBJUHJveHlTZXJ2ZXJUeXBlRW51bX0gJiBJUHJveHlTZXJ2ZXJUeXBlID0ge1xyXG4gICAgUENDOntcclxuICAgICAgICB2YWx1ZTpcIlBDQ1wiLFxyXG4gICAgICAgIHRleHQ6XCJQQ0PmjqXlhaXmnI3liqFcIixcclxuICAgICAgICBpbmRleDoyMDAxNlxyXG4gICAgfSxcclxuICAgIFNvdW5kTGlnaHRBbGFybTp7XHJcbiAgICAgICAgdmFsdWU6XCJTb3VuZExpZ2h0QWxhcm1cIixcclxuICAgICAgICB0ZXh0Olwi5aOw5YWJ5oql6K2m5o6l5YWl5pyN5YqhXCIsXHJcbiAgICAgICAgaW5kZXg6MjAwMjZcclxuICAgIH0sXHJcbiAgICBTTVM6e1xyXG4gICAgICAgIHZhbHVlOlwiU01TXCIsXHJcbiAgICAgICAgdGV4dDpcIuefreS/oeeMq+aOpeWFpeacjeWKoVwiLFxyXG4gICAgICAgIGluZGV4OjIwMDM2XHJcbiAgICB9LFxyXG4gICAgTVNHOntcclxuICAgICAgICB2YWx1ZTpcIk1TR1wiLFxyXG4gICAgICAgIHRleHQ6XCLmtojmga/mjqXlhaXmnI3liqFcIixcclxuICAgICAgICBpbmRleDoyMDA0NlxyXG4gICAgfSxcclxuICAgIFZpZGVvU2VydmVyOntcclxuICAgICAgICB2YWx1ZTpcIlZpZGVvU2VydmVyXCIsXHJcbiAgICAgICAgdGV4dDpcIuinhumikeaOpeWFpeacjeWKoVwiLFxyXG4gICAgICAgIGluZGV4OjIwMDU2XHJcbiAgICB9LFxyXG4gICAgSU9EOntcclxuICAgICAgICB2YWx1ZTpcIklPRFwiLFxyXG4gICAgICAgIHRleHQ6XCLmlbDmja7mnI3liqHlmahcIixcclxuICAgICAgICBpbmRleDoyMDA2NlxyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbiJdfQ==
