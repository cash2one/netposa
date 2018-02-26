define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EngineServerType = {
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb3JlL2VudW0vRW5naW5lU2VydmVyVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFrQmEsUUFBQSxnQkFBZ0IsR0FBOEQ7UUFDdkYsR0FBRyxFQUFDO1lBQ0EsS0FBSyxFQUFDLEtBQUs7WUFDWCxJQUFJLEVBQUMsU0FBUztZQUNkLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxlQUFlLEVBQUM7WUFDWixLQUFLLEVBQUMsaUJBQWlCO1lBQ3ZCLElBQUksRUFBQyxVQUFVO1lBQ2YsS0FBSyxFQUFDLEtBQUs7U0FDZDtRQUNELEdBQUcsRUFBQztZQUNBLEtBQUssRUFBQyxLQUFLO1lBQ1gsSUFBSSxFQUFDLFNBQVM7WUFDZCxLQUFLLEVBQUMsS0FBSztTQUNkO1FBQ0QsR0FBRyxFQUFDO1lBQ0EsS0FBSyxFQUFDLEtBQUs7WUFDWCxJQUFJLEVBQUMsUUFBUTtZQUNiLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxXQUFXLEVBQUM7WUFDUixLQUFLLEVBQUMsYUFBYTtZQUNuQixJQUFJLEVBQUMsUUFBUTtZQUNiLEtBQUssRUFBQyxLQUFLO1NBQ2Q7UUFDRCxHQUFHLEVBQUM7WUFDQSxLQUFLLEVBQUMsS0FBSztZQUNYLElBQUksRUFBQyxPQUFPO1lBQ1osS0FBSyxFQUFDLEtBQUs7U0FDZDtLQUNKLENBQUMiLCJmaWxlIjoiY29yZS9lbnVtL0VuZ2luZVNlcnZlclR5cGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogIOS7o+eQhuacjeWKoeWZqOexu+Wei1xyXG4gKiBAdGltZTogMjAxNy0wNS0wNCAxNTozNDoxN1xyXG4gKiBAcGFyYW1zOlxyXG4gKiBAcmV0dXJuOlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRW5naW5lU2VydmVyVHlwZUVudW0ge1xyXG4gICAgdmFsdWU6c3RyaW5nLFxyXG4gICAgdGV4dDpzdHJpbmcsXHJcbiAgICBpbmRleDpudW1iZXJcclxufVxyXG5pbnRlcmZhY2UgSUVuZ2luZVNlcnZlclR5cGV7XHJcbiAgICBQQ0M6SUVuZ2luZVNlcnZlclR5cGVFbnVtO1xyXG4gICAgU291bmRMaWdodEFsYXJtOklFbmdpbmVTZXJ2ZXJUeXBlRW51bTtcclxuICAgIFNNUzpJRW5naW5lU2VydmVyVHlwZUVudW07XHJcbiAgICBNU0c6SUVuZ2luZVNlcnZlclR5cGVFbnVtO1xyXG4gICAgVmlkZW9TZXJ2ZXI6SUVuZ2luZVNlcnZlclR5cGVFbnVtO1xyXG59XHJcbmV4cG9ydCBjb25zdCBFbmdpbmVTZXJ2ZXJUeXBlOntba2V5OiBzdHJpbmddOiBJRW5naW5lU2VydmVyVHlwZUVudW19ICYgSUVuZ2luZVNlcnZlclR5cGUgPSB7XHJcbiAgICBQQ0M6e1xyXG4gICAgICAgIHZhbHVlOlwiUENDXCIsXHJcbiAgICAgICAgdGV4dDpcIlBDQ+aOpeWFpeacjeWKoVwiLFxyXG4gICAgICAgIGluZGV4OjIwMDE2XHJcbiAgICB9LFxyXG4gICAgU291bmRMaWdodEFsYXJtOntcclxuICAgICAgICB2YWx1ZTpcIlNvdW5kTGlnaHRBbGFybVwiLFxyXG4gICAgICAgIHRleHQ6XCLlo7DlhYnmiqXorabmjqXlhaXmnI3liqFcIixcclxuICAgICAgICBpbmRleDoyMDAyNlxyXG4gICAgfSxcclxuICAgIFNNUzp7XHJcbiAgICAgICAgdmFsdWU6XCJTTVNcIixcclxuICAgICAgICB0ZXh0Olwi55+t5L+h54yr5o6l5YWl5pyN5YqhXCIsXHJcbiAgICAgICAgaW5kZXg6MjAwMzZcclxuICAgIH0sXHJcbiAgICBNU0c6e1xyXG4gICAgICAgIHZhbHVlOlwiTVNHXCIsXHJcbiAgICAgICAgdGV4dDpcIua2iOaBr+aOpeWFpeacjeWKoVwiLFxyXG4gICAgICAgIGluZGV4OjIwMDQ2XHJcbiAgICB9LFxyXG4gICAgVmlkZW9TZXJ2ZXI6e1xyXG4gICAgICAgIHZhbHVlOlwiVmlkZW9TZXJ2ZXJcIixcclxuICAgICAgICB0ZXh0Olwi6KeG6aKR5o6l5YWl5pyN5YqhXCIsXHJcbiAgICAgICAgaW5kZXg6MjAwNTZcclxuICAgIH0sXHJcbiAgICBJT0Q6e1xyXG4gICAgICAgIHZhbHVlOlwiSU9EXCIsXHJcbiAgICAgICAgdGV4dDpcIuaVsOaNruacjeWKoeWZqFwiLFxyXG4gICAgICAgIGluZGV4OjIwMDY2XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuIl19
